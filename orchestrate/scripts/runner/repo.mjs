import { spawnSync } from 'node:child_process'
import { appendFileSync, existsSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { runBounded } from './process.mjs'
import { fail, ok } from './result.mjs'

const OUTPUT_LIMIT = 256 * 1024 * 1024
const GATE_COMMAND_TIMEOUT_MS = 30 * 60 * 1000
const SHORT_SHA_LENGTH = 7
const FILES_PLACEHOLDER = '{files}'
const shellQuote = path => `'./${path.replaceAll("'", "'\\''")}'`

const scopedTo = (command, files) => (command.includes(FILES_PLACEHOLDER) ? command.replaceAll(FILES_PLACEHOLDER, files.map(shellQuote).join(' ')) : command)
const isScoped = command => command.includes(FILES_PLACEHOLDER)

async function sh(command, cwd) {
  let output = ''
  const run = await runBounded('sh', ['-c', command], { cwd, timeoutMs: GATE_COMMAND_TIMEOUT_MS, onOutput: chunk => { output += chunk } })
  return { code: run.code, output: run.problem ? `${output}\n${run.problem}` : output }
}

function gitOutput(cwd, args) {
  const run = spawnSync('git', args, { cwd, encoding: 'utf8', maxBuffer: OUTPUT_LIMIT })
  if (run.status !== 0) throw new Error(`git ${args.join(' ')} failed: ${run.stderr}`)
  return run.stdout
}

const git = (cwd, args) => gitOutput(cwd, args).trim()

const gitPaths = (cwd, [command, ...options]) =>
  gitOutput(cwd, ['-c', 'core.quotepath=false', command, '-z', ...options]).split('\0').filter(Boolean)

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
    stagedPaths: base => gitPaths(cwd, ['diff', '--cached', '--name-only', base]),
    changedFiles: base => gitPaths(cwd, ['diff', '--cached', '--name-only', '--diff-filter=d', base]),
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

    async runGate(commands, label, { advisory = [], files = [] } = {}) {
      const file = join(workspace, `gate-${label}.log`)
      const runs = []
      for (const command of commands) {
        const skipped = isScoped(command) && !files.length
        const run = skipped ? { code: 0, output: '(skipped: no changed files)' } : await sh(scopedTo(command, files), cwd)
        runs.push({ command, advisory: advisory.includes(command), ...run })
      }
      const heading = r => `$ ${scopedTo(r.command, files)}${r.advisory ? '  (advisory: red before this change)' : ''}\nexit ${r.code}`
      writeFileSync(file, runs.map(r => `${heading(r)}\n${r.output}`).join('\n'))
      const failed = runs.filter(r => r.code !== 0 && !r.advisory).map(r => r.command)
      return { green: failed.length === 0, file, failed, anyRed: runs.filter(r => r.code !== 0).map(r => r.command) }
    },

    writeJson(name, value) {
      const file = join(workspace, name)
      writeFileSync(file, JSON.stringify(value, null, 2))
      return file
    },

    loadState: fresh => (existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, 'utf8')) : fresh),
    saveState: state => {
      writeFileSync(`${stateFile}.tmp`, JSON.stringify(state, null, 2))
      renameSync(`${stateFile}.tmp`, stateFile)
    },
    stateFile,
    ledger: line => appendFileSync(ledgerFile, `${line}\n`),
  }
}
