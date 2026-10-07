import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, beforeEach, test } from 'node:test'
import { fileURLToPath } from 'node:url'

const runPlan = join(dirname(fileURLToPath(import.meta.url)), '..', 'run-plan.mjs')
const PLAN = '# Plan\n\n## Milestones\n\n### Milestone 1 - Only\n\nDo it.\n'
let root

const cli = (...args) => spawnSync('node', [runPlan, ...args], {
  cwd: root, encoding: 'utf8', env: { ...process.env, PATH: `${join(root, 'bin')}:${process.env.PATH}` },
})
const argsSeen = () => readFileSync(join(root, 'claude.args'), 'utf8')

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'run-plan-cli-'))
  const git = (...args) => execFileSync('git', args, { cwd: root })
  git('init', '--quiet')
  git('config', 'user.email', 'test@example.com')
  git('config', 'user.name', 'Test')
  writeFileSync(join(root, 'plan.md'), PLAN)
  writeFileSync(join(root, '.gitignore'), 'bin/\nclaude.args\n')
  git('add', '-A')
  git('commit', '--quiet', '-m', 'plan')
  mkdirSync(join(root, 'bin'))
  const reply = JSON.stringify({ is_error: true, result: 'stop here', api_error_status: 400 })
  writeFileSync(join(root, 'bin', 'claude'), `#!/bin/sh\nprintf '%s\\n' "$*" >> "${root}/claude.args"\necho '${reply}'\n`)
  chmodSync(join(root, 'bin', 'claude'), 0o755)
})

afterEach(() => rmSync(root, { recursive: true, force: true }))

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
  assert.match(JSON.parse(run.stdout.trim()).detail, /implementer: stop here/)
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
  assert.match(cli('--watch').stderr, /--watch works only with --status/)
})

test('--status reports a stopped run with its reason', () => {
  cli('--plan', 'plan.md', '--harness', 'claude', '--cap', '3', '--model', 'm')
  const status = JSON.parse(cli('--status').stdout)
  assert.equal(status.state, 'stopped')
  assert.equal(status.reason, 'agent-failed')
})
