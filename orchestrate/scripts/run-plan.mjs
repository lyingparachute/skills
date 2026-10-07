#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { closeSync, existsSync, openSync, readdirSync, readFileSync, readSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { setTimeout as wait } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { createAgent, DEFAULT_AGENT_TIMEOUT_MS, DEFAULT_IDLE_TIMEOUT_MS, HARNESSES, jsonFromText } from './runner/harness.mjs'
import { CLOSE_OUT, ROLES, runPlan } from './runner/loop.mjs'
import { createPlanReader, createRepo } from './runner/repo.mjs'

const MS_PER_MINUTE = 60 * 1000
const MS_PER_SECOND = 1000
const WATCH_INTERVAL_MS = 30 * 1000
const LAST_LINE_LENGTH = 160
const LOG_TAIL_BYTES = 64 * 1024
const OPENCODE_FREE_MODEL = 'opencode/muse-spark-1.3-contributor-free'
const OPENCODE_FREE_PROVIDER = 'opencode/'
const USAGE = `usage: run-plan.mjs --plan PLAN --harness ${HARNESSES.join('|')} --cap N [options]
       run-plan.mjs --status [--watch]

  --model ID | ROLE=ID       model for every role, or for one role (${ROLES.join(', ')});
                             opencode defaults to ${OPENCODE_FREE_MODEL}
  --effort LEVEL | ROLE=LEVEL
  --variant ...              reasoning effort, for every role or one role (same as --effort)
  --gate CMD                 gate command; {files} becomes the changed files, quoted
  --human-gate ID            stop after this milestone's review for a person to check it
  --accept ID|${CLOSE_OUT}     commit the checked tree of the milestone in progress
  --review-docs              review docs-only milestones too
  --agent-timeout-min N      hard limit per worker (default ${DEFAULT_AGENT_TIMEOUT_MS / MS_PER_MINUTE})
  --idle-timeout-min N       kill and retry a worker silent this long (default ${DEFAULT_IDLE_TIMEOUT_MS / MS_PER_MINUTE})
  --any-provider             allow opencode models outside ${OPENCODE_FREE_PROVIDER}
  --status [--watch]         print the run status; --watch repeats it until the run ends`
const EXIT = { completed: 0, usage: 2, stopped: 3 }

function usage(problem) {
  console.error(`${problem}\n${USAGE}`)
  process.exit(EXIT.usage)
}

function parseCommandLine() {
  try {
    return parseArgs({
      options: {
        plan: { type: 'string' },
        harness: { type: 'string' },
        cap: { type: 'string' },
        model: { type: 'string', multiple: true, default: [] },
        effort: { type: 'string', multiple: true, default: [] },
        variant: { type: 'string', multiple: true, default: [] },
        'any-provider': { type: 'boolean', default: false },
        gate: { type: 'string', multiple: true, default: [] },
        'human-gate': { type: 'string', multiple: true, default: [] },
        accept: { type: 'string', multiple: true, default: [] },
        'review-docs': { type: 'boolean', default: false },
        'agent-timeout-min': { type: 'string', default: String(DEFAULT_AGENT_TIMEOUT_MS / MS_PER_MINUTE) },
        'idle-timeout-min': { type: 'string', default: String(DEFAULT_IDLE_TIMEOUT_MS / MS_PER_MINUTE) },
        status: { type: 'boolean', default: false },
        watch: { type: 'boolean', default: false },
        help: { type: 'boolean', short: 'h', default: false },
      },
    }).values
  } catch (error) {
    return usage(error.message)
  }
}

const values = parseCommandLine()
if (values.help) {
  console.log(USAGE)
  process.exit(EXIT.completed)
}

const scriptsDir = dirname(fileURLToPath(import.meta.url))
const workspace = execFileSync(join(scriptsDir, 'workspace'), { encoding: 'utf8' }).trim()
const root = dirname(workspace)
const stateFile = join(workspace, 'run-state.json')

function isAlive(pid) {
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    return error.code === 'EPERM'
  }
}

const storedState = () => (existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, 'utf8')) : { status: { state: 'not-started' } })
const isRunning = status => status.state === 'running' && isAlive(status.pid)

function lastActivity(pid) {
  const logs = readdirSync(workspace).filter(name => name.startsWith(`agent-${pid}-`) && name.endsWith('.log')).map(name => join(workspace, name))
  if (!logs.length) return { activeLog: '(no agent started yet)' }
  const activeLog = logs.reduce((newest, log) => (statSync(log).mtimeMs > statSync(newest).mtimeMs ? log : newest))
  const lines = tail(activeLog).split('\n').filter(line => line.trim())
  const lastLine = lines.length ? summarize(lines.at(-1)) : '(no output yet)'
  return { activeLog, idleSeconds: Math.round((Date.now() - statSync(activeLog).mtimeMs) / MS_PER_SECOND), lastLine: lastLine.slice(0, LAST_LINE_LENGTH) }
}

function tail(file) {
  const size = statSync(file).size
  const length = Math.min(size, LOG_TAIL_BYTES)
  const buffer = Buffer.alloc(length)
  const fd = openSync(file, 'r')
  readSync(fd, buffer, 0, length, size - length)
  closeSync(fd)
  return buffer.toString('utf8')
}

function summarize(line) {
  if (!line.startsWith('{')) return line
  const event = jsonFromText(line)
  if (!event.ok) return `(not a complete JSON event: ${line})`
  const part = event.value.part ?? {}
  return [event.value.type, part.tool, part.state?.status, part.text].filter(Boolean).join(' ')
}

function currentStatus() {
  const { status, agentsUsed, completed, plan } = storedState()
  if (status.state === 'running' && !isRunning(status)) {
    return { state: 'crashed', detail: `runner ${status.pid} died; see .orchestrate/run.log`, plan, agentsUsed, completed }
  }
  return { ...status, plan, agentsUsed, completed, ...(status.state === 'running' ? lastActivity(status.pid) : {}) }
}

async function printStatus(watch) {
  for (;;) {
    const status = currentStatus()
    console.log(JSON.stringify(status))
    if (!watch || status.state !== 'running') return
    await wait(WATCH_INTERVAL_MS)
  }
}

function perRole(flag, entries) {
  const empty = entries.filter(entry => entry === '' || entry.endsWith('='))
  if (empty.length) usage(`${flag} needs a value: ${empty.join(', ')}`)
  const bareRoles = entries.filter(entry => ROLES.includes(entry))
  if (bareRoles.length) usage(`${flag} ${bareRoles.join(', ')} names a role with no value; use ROLE=VALUE`)
  const everyRole = entries.filter(entry => !entry.includes('='))
  const oneRole = entries.filter(entry => entry.includes('=')).map(entry => entry.split(/=(.*)/s))
  const unknown = oneRole.filter(([role]) => !ROLES.includes(role)).map(([role]) => role)
  if (unknown.length) usage(`unknown ${flag} role: ${unknown.join(', ')}`)
  return { ...Object.fromEntries(everyRole.flatMap(value => ROLES.map(role => [role, value]))), ...Object.fromEntries(oneRole) }
}

function parseModels(harness, entries, anyProvider) {
  const given = perRole('--model', entries)
  const fallback = harness === 'opencode' ? OPENCODE_FREE_MODEL : ''
  const models = Object.fromEntries(ROLES.map(role => [role, given[role] || fallback]))
  const missing = ROLES.filter(role => !models[role])
  if (missing.length) usage(`missing --model for: ${missing.join(', ')}`)
  const paid = harness === 'opencode' && !anyProvider ? ROLES.filter(role => !models[role].startsWith(OPENCODE_FREE_PROVIDER)) : []
  if (paid.length) usage(`opencode models outside ${OPENCODE_FREE_PROVIDER} need --any-provider: ${paid.map(role => `${role}=${models[role]}`).join(', ')}`)
  return models
}

function positiveInteger(flag, value) {
  const number = Number(value)
  if (!Number.isInteger(number) || number < 1) usage(`${flag} must be a positive integer: ${value ?? '(none)'}`)
  return number
}

if (values.watch && !values.status) usage('--watch works only with --status')
if (values.status) {
  await printStatus(values.watch)
  process.exit(EXIT.completed)
}
if (!values.plan || !existsSync(values.plan)) usage(`no such plan: ${values.plan ?? '(none)'}`)
if (!HARNESSES.includes(values.harness)) usage(`unknown harness: ${values.harness ?? '(none)'}`)
if (isRunning(storedState().status)) usage(`a runner is already working in this repo (pid ${storedState().status.pid})`)

const status = await runPlan({
  planReader: createPlanReader(relative(root, resolve(values.plan)), scriptsDir, root),
  repo: createRepo(root, workspace),
  agent: createAgent({
    harness: values.harness,
    models: parseModels(values.harness, values.model, values['any-provider']),
    efforts: perRole('--effort', [...values.effort, ...values.variant]),
    cwd: root,
    workspace,
    timeoutMs: positiveInteger('--agent-timeout-min', values['agent-timeout-min']) * MS_PER_MINUTE,
    idleMs: positiveInteger('--idle-timeout-min', values['idle-timeout-min']) * MS_PER_MINUTE,
  }),
  cap: positiveInteger('--cap', values.cap),
  gates: values.gate,
  humanGates: values['human-gate'],
  accepted: values.accept,
  reviewDocs: values['review-docs'],
})
console.log(JSON.stringify(status))
process.exit(status.state === 'completed' ? EXIT.completed : EXIT.stopped)
