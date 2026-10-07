import assert from 'node:assert/strict'
import { execFileSync, spawn, spawnSync } from 'node:child_process'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, beforeEach, test } from 'node:test'
import { fileURLToPath } from 'node:url'

const runPlan = join(dirname(fileURLToPath(import.meta.url)), '..', 'run-plan.mjs')
const PLAN = '# Plan\n\n## Milestones\n\n### Milestone 1 - Only\n\nDo it.\n'
let root
const strays = []

const cli = (...args) => spawnSync('node', [runPlan, ...args], {
  cwd: root, encoding: 'utf8', env: { ...process.env, PATH: `${join(root, 'bin')}:${process.env.PATH}` },
})
const argsSeen = () => readFileSync(join(root, 'claude.args'), 'utf8')
const RUN = ['--plan', 'plan.md', '--harness', 'claude', '--cap', '3', '--model', 'm']
const statusJson = () => JSON.parse(cli('--status', '--json').stdout)
const alive = pid => spawnSync('ps', ['-p', String(pid)]).status === 0
const workspaceFile = name => join(root, '.orchestrate', name)

async function until(check, timeoutMs = 10000) {
  const started = Date.now()
  while (!check()) {
    assert.ok(Date.now() - started < timeoutMs, 'timed out waiting')
    await new Promise(resolve => setTimeout(resolve, 100))
  }
}

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'run-plan-cli-'))
  const git = (...args) => execFileSync('git', args, { cwd: root })
  git('init', '--quiet')
  git('config', 'user.email', 'test@example.com')
  git('config', 'user.name', 'Test')
  writeFileSync(join(root, 'plan.md'), PLAN)
  writeFileSync(join(root, '.gitignore'), 'bin/\nclaude.args\nslow\n')
  git('add', '-A')
  git('commit', '--quiet', '-m', 'plan')
  mkdirSync(join(root, 'bin'))
  const reply = JSON.stringify({ type: 'result', is_error: true, result: 'stop here', api_error_status: 400 })
  writeFileSync(join(root, 'bin', 'claude'), `#!/bin/sh\nprintf '%s\\n' "$*" >> "${root}/claude.args"\n[ -f "${root}/slow" ] && { sleep 30; exit 0; }\necho '${reply}'\n`)
  chmodSync(join(root, 'bin', 'claude'), 0o755)
})

afterEach(() => {
  strays.splice(0).forEach(child => { try { process.kill(-child.pid, 'SIGKILL') } catch {} })
  rmSync(root, { recursive: true, force: true })
})

test('--help prints the usage and exits 0', () => {
  const run = cli('--help')
  assert.equal(run.status, 0)
  assert.match(run.stdout, /^usage: run-plan\.mjs/)
})

test('an unknown flag prints the problem and the usage, exit 2', () => {
  const run = cli('--bogus')
  assert.equal(run.status, 2)
  assert.match(run.stderr, /Unknown option '--bogus'[\s\S]*usage:/)
})

test('one --model and --effort cover every role, and a role override wins', () => {
  const run = cli('--plan', 'plan.md', '--harness', 'claude', '--cap', '3', '--model', 'base', '--model', 'implementer=strong', '--variant', 'xhigh')
  assert.equal(run.status, 3)
  assert.match(run.stdout, /STOPPED agent-failed: implementer: stop here/)
  assert.match(argsSeen(), /--model strong --effort xhigh /)
})

test('opencode refuses a model outside the free provider without --any-provider', () => {
  const run = cli('--plan', 'plan.md', '--harness', 'opencode', '--cap', '3', '--model', 'critic=amazon-bedrock/x')
  assert.equal(run.status, 2)
  assert.match(run.stderr, /need --any-provider: critic=amazon-bedrock\/x/)
})

test('ambiguous or empty flag values are refused', () => {
  const base = ['--plan', 'plan.md', '--harness', 'claude', '--cap', '3']
  assert.match(cli(...base, '--model', 'critic').stderr, /--model critic names a role with no value/)
  assert.match(cli(...base, '--model', 'm', '--effort', 'critic=').stderr, /--effort needs a value: critic=/)
  assert.match(cli('--json').stderr, /--json works only with --status/)
  assert.match(cli('--watch').stderr, /--watch works only with --status; use --follow/)
})

test('--status prints one line, or JSON with --json', () => {
  cli(...RUN)
  assert.match(cli('--status').stdout, /^stopped: agent-failed · plan\.md · agents 1\/3 · implementer: stop here.*\nlive view: \S+live\.html\n$/)
  const status = statusJson()
  assert.equal(status.state, 'stopped')
  assert.equal(status.reason, 'agent-failed')
  assert.equal(status.cap, 3)
})

test('--follow, or the old --status --watch, prints the timeline of a finished run, then its status', () => {
  cli(...RUN)
  for (const args of [['--follow'], ['--status', '--watch']]) {
    const run = cli(...args)
    assert.equal(run.status, 0)
    assert.match(run.stdout, /run started: plan\.md, 0\/1 milestones done[\s\S]*m1 implementer started[\s\S]*STOPPED agent-failed[\s\S]*\nstopped: agent-failed/)
  }
})

test('a live pid that is not a runner counts as crashed, not running', () => {
  cli(...RUN)
  const state = JSON.parse(readFileSync(workspaceFile('run-state.json'), 'utf8'))
  writeFileSync(workspaceFile('run-state.json'), JSON.stringify({ ...state, status: { state: 'running', pid: process.pid } }))
  assert.equal(statusJson().state, 'crashed')
})

test('a worker left alive by a crashed runner blocks the next run until it is killed', async () => {
  cli(...RUN)
  const worker = spawn(join(root, 'bin', 'claude'), ['-p', 'x'], { detached: true, stdio: 'ignore' })
  strays.push(worker)
  writeFileSync(join(root, 'slow'), '')
  await until(() => alive(worker.pid))
  const at = new Date().toISOString()
  const crashedMidAgent = [
    { at, type: 'agent-start', role: 'implementer', step: 'm1', agentsUsed: 2, cap: 3 },
    { at, type: 'attempt', role: 'implementer', harness: 'claude', model: 'm', pid: worker.pid, log: workspaceFile('x.log') },
  ].map(event => `${JSON.stringify(event)}\n`).join('')
  writeFileSync(workspaceFile('events.jsonl'), `${readFileSync(workspaceFile('events.jsonl'), 'utf8')}${crashedMidAgent}`)
  const blocked = cli(...RUN)
  assert.equal(blocked.status, 2)
  assert.match(blocked.stderr, new RegExp(`still running \\(pid ${worker.pid}\\): kill it with kill -9 -${worker.pid}`))
})

for (const [signal, code] of [['SIGTERM', 143], ['SIGINT', 130]]) test(`${signal} kills the worker and saves the run as interrupted, ready to resume`, async () => {
  writeFileSync(join(root, 'slow'), '')
  const runner = spawn('node', [runPlan, ...RUN, '--agent-timeout-min', '5'], {
    cwd: root, stdio: 'ignore', env: { ...process.env, PATH: `${join(root, 'bin')}:${process.env.PATH}` },
  })
  strays.push(runner)
  const attempt = () => existsSync(workspaceFile('events.jsonl')) && readFileSync(workspaceFile('events.jsonl'), 'utf8').split('\n').filter(Boolean).map(JSON.parse).find(event => event.type === 'attempt')
  await until(attempt)
  const worker = attempt().pid
  await until(() => alive(worker))
  const exited = new Promise(resolve => runner.on('exit', resolve))
  runner.kill(signal)
  assert.equal(await exited, code)
  assert.equal(alive(worker), false)
  const status = statusJson()
  assert.equal(status.state, 'stopped')
  assert.equal(status.reason, 'interrupted')
  assert.equal(status.orphanWorker, undefined)
  assert.match(readFileSync(workspaceFile('live.html'), 'utf8'), /Stopped: interrupted/)
})

test('--follow started with the runner waits for the run instead of exiting at once', async () => {
  const runner = spawn('node', [runPlan, ...RUN], { cwd: root, stdio: 'ignore', env: { ...process.env, PATH: `${join(root, 'bin')}:${process.env.PATH}` } })
  strays.push(runner)
  const follow = await new Promise(resolve => {
    const child = spawn('node', [runPlan, '--follow'], { cwd: root })
    let out = ''
    child.stdout.on('data', chunk => { out += chunk })
    child.on('exit', () => resolve(out))
  })
  assert.match(follow, /run started: plan\.md[\s\S]*STOPPED agent-failed[\s\S]*\nstopped: agent-failed/)
})

test('a ps that cannot answer fails loudly instead of reporting the runner dead', () => {
  cli(...RUN)
  const state = JSON.parse(readFileSync(workspaceFile('run-state.json'), 'utf8'))
  writeFileSync(workspaceFile('run-state.json'), JSON.stringify({ ...state, status: { state: 'running', pid: process.pid } }))
  writeFileSync(join(root, 'bin', 'ps'), '#!/bin/sh\necho "ps: operation not permitted" >&2\nexit 1\n')
  chmodSync(join(root, 'bin', 'ps'), 0o755)
  const run = cli('--status')
  assert.notEqual(run.status, 0)
  assert.match(run.stderr, /ps cannot check pid \d+: ps: operation not permitted/)
})

test('a torn last journal line is skipped, and the next run starts on a new line', () => {
  cli(...RUN)
  writeFileSync(workspaceFile('events.jsonl'), `${readFileSync(workspaceFile('events.jsonl'), 'utf8')}{"at":"2026-01-01T00:00:00Z","type":"agent-st`)
  cli(...RUN)
  const run = cli('--follow')
  assert.equal(run.status, 0)
  assert.equal(run.stdout.match(/run (started|resumed)/g).length, 2)
  assert.doesNotMatch(run.stdout, /agent-st/)
})
