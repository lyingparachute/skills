import { spawnSync } from 'node:child_process'
import { appendFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { runBounded } from './process.mjs'
import { fail, ok } from './result.mjs'

const OUTPUT_LIMIT = 256 * 1024 * 1024
const GATE_COMMAND_TIMEOUT_MS = 30 * 60 * 1000
const SHORT_SHA_LENGTH = 7

async function sh(command, cwd) {
  let output = ''
  const run = await runBounded('sh', ['-c', command], { cwd, timeoutMs: GATE_COMMAND_TIMEOUT_MS, onOutput: chunk => { output += chunk } })
  return { code: run.code, output: run.problem ? `${output}\n${run.problem}` : output }
}

function git(cwd, args) {
  const run = spawnSync('git', args, { cwd, encoding: 'utf8', maxBuffer: OUTPUT_LIMIT })
  if (run.status !== 0) throw new Error(`git ${args.join(' ')} failed: ${run.stderr}`)
  return run.stdout.trim()
}

export function createPlanReader(plan, scriptsDir, cwd) {
  const taskBrief = join(scriptsDir, 'task-brief')
  return {
    plan,
    milestones() {
      const run = spawnSync(taskBrief, [plan, '--list'], { cwd, encoding: 'utf8' })
      return run.status === 0
        ? ok(run.stdout.split('\n').filter(Boolean))
        : fail(`task-brief --list exited ${run.status}: ${run.stderr.trim()}`)
    },
    brief(id) {
      const run = spawnSync(taskBrief, [plan, id], { cwd, encoding: 'utf8' })
      if (run.status !== 0) throw new Error(`task-brief ${id} exited ${run.status}: ${run.stderr}`)
      return run.stdout.replace(/^wrote (.*): \d+ lines\n$/, '$1')
    },
  }
}

export function createRepo(cwd, workspace) {
  const stateFile = join(workspace, 'run-state.json')
  const ledgerFile = join(workspace, 'progress.md')

  return {
    cwd,
    workspace,
    head: () => git(cwd, ['rev-parse', 'HEAD']),
    parent: () => git(cwd, ['rev-parse', 'HEAD^']),
    subject: () => git(cwd, ['log', '-1', '--format=%s']),
    short: sha => sha.slice(0, SHORT_SHA_LENGTH),
    isClean: () => git(cwd, ['status', '--porcelain']) === '',
    stageAll: () => git(cwd, ['add', '-A']),
    stagedPaths: base => git(cwd, ['diff', '--cached', '--name-only', base]).split('\n').filter(Boolean),
    commit: message => git(cwd, ['commit', '--quiet', '-m', message]),

    writePackage(base, label) {
      const file = join(workspace, `review-${label}.diff`)
      writeFileSync(file, [
        `# Review package: ${base} to the staged tree`,
        '## Commits', git(cwd, ['log', '--oneline', `${base}..HEAD`]),
        '## Files changed', git(cwd, ['diff', '--cached', '--stat', base]),
        '## Diff', git(cwd, ['diff', '--cached', '-U10', base]),
      ].join('\n\n'))
      return file
    },

    async runGate(commands, label) {
      const file = join(workspace, `gate-${label}.log`)
      const runs = []
      for (const command of commands) runs.push({ command, ...(await sh(command, cwd)) })
      writeFileSync(file, runs.map(r => `$ ${r.command}\nexit ${r.code}\n${r.output}`).join('\n'))
      return { green: runs.every(r => r.code === 0), file, failed: runs.filter(r => r.code !== 0).map(r => r.command) }
    },

    writeJson(name, value) {
      const file = join(workspace, name)
      writeFileSync(file, JSON.stringify(value, null, 2))
      return file
    },

    loadState: fresh => (existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, 'utf8')) : fresh),
    saveState: state => writeFileSync(stateFile, JSON.stringify(state, null, 2)),
    stateFile,
    ledger: line => appendFileSync(ledgerFile, `${line}\n`),
  }
}
