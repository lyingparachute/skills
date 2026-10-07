#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { createAgent, DEFAULT_AGENT_TIMEOUT_MS, HARNESSES } from './runner/harness.mjs'
import { CLOSE_OUT, ROLES, runPlan } from './runner/loop.mjs'
import { createPlanReader, createRepo } from './runner/repo.mjs'

const MS_PER_MINUTE = 60 * 1000
const USAGE = `usage: run-plan.mjs --plan PLAN --harness ${HARNESSES.join('|')} --cap N
         --model ROLE=ID for each role (${ROLES.join(', ')})
         [--gate CMD]... [--human-gate ID]... [--accept ID|${CLOSE_OUT}]...
         [--review-docs] [--agent-timeout-min N]
       run-plan.mjs --status`
const EXIT = { completed: 0, usage: 2, stopped: 3 }

const scriptsDir = dirname(fileURLToPath(import.meta.url))
const workspace = execFileSync(join(scriptsDir, 'workspace'), { encoding: 'utf8' }).trim()
const root = dirname(workspace)
const stateFile = join(workspace, 'run-state.json')

function usage(problem) {
  console.error(`${problem}\n${USAGE}`)
  process.exit(EXIT.usage)
}

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

function printStatus() {
  const { status, agentsUsed, completed, plan } = storedState()
  const crashed = status.state === 'running' && !isRunning(status)
  const shown = crashed ? { state: 'crashed', detail: `runner ${status.pid} died; see .orchestrate/run.log` } : status
  console.log(JSON.stringify({ ...shown, plan, agentsUsed, completed }))
}

function parseModels(entries) {
  const pairs = entries.map(entry => entry.split(/=(.*)/s).slice(0, 2))
  const unknown = pairs.filter(([role]) => !ROLES.includes(role)).map(([role]) => role)
  if (unknown.length) usage(`unknown --model role: ${unknown.join(', ')}`)
  const models = Object.fromEntries(pairs)
  const missing = ROLES.filter(role => !models[role])
  if (missing.length) usage(`missing --model for: ${missing.join(', ')}`)
  return models
}

function positiveInteger(flag, value) {
  const number = Number(value)
  if (!Number.isInteger(number) || number < 1) usage(`${flag} must be a positive integer: ${value ?? '(none)'}`)
  return number
}

const { values } = parseArgs({
  options: {
    plan: { type: 'string' },
    harness: { type: 'string' },
    cap: { type: 'string' },
    model: { type: 'string', multiple: true, default: [] },
    gate: { type: 'string', multiple: true, default: [] },
    'human-gate': { type: 'string', multiple: true, default: [] },
    accept: { type: 'string', multiple: true, default: [] },
    'review-docs': { type: 'boolean', default: false },
    'agent-timeout-min': { type: 'string', default: String(DEFAULT_AGENT_TIMEOUT_MS / MS_PER_MINUTE) },
    status: { type: 'boolean', default: false },
  },
})

if (values.status) {
  printStatus()
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
    models: parseModels(values.model),
    cwd: root,
    workspace,
    timeoutMs: positiveInteger('--agent-timeout-min', values['agent-timeout-min']) * MS_PER_MINUTE,
  }),
  cap: positiveInteger('--cap', values.cap),
  gates: values.gate,
  humanGates: values['human-gate'],
  accepted: values.accept,
  reviewDocs: values['review-docs'],
})
console.log(JSON.stringify(status))
process.exit(status.state === 'completed' ? EXIT.completed : EXIT.stopped)
