#!/usr/bin/env node
import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { constants } from 'node:os'
import { basename, dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { createAgent, DEFAULT_AGENT_TIMEOUT_MS, DEFAULT_IDLE_TIMEOUT_MS, HARNESSES } from './runner/harness.mjs'
import { createJournal } from './runner/journal.mjs'
import { CLOSE_OUT, ROLES, runPlan } from './runner/loop.mjs'
import { createPlanReader, createRepo } from './runner/repo.mjs'
import { follow, readStatus, statusLine, storedState } from './runner/status.mjs'

const MS_PER_MINUTE = 60 * 1000
const OPENCODE_FREE_MODEL = 'opencode/muse-spark-1.3-contributor-free'
const OPENCODE_FREE_PROVIDER = 'opencode/'
const USAGE = `usage: run-plan.mjs --plan PLAN --harness ${HARNESSES.join('|')} --cap N [options]
       run-plan.mjs --status [--json] | --follow

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
  --notify                   desktop notification when the run stops or completes
  --status [--json]          print the run status as one line, or as JSON
  --follow                   print the run's timeline as it happens, until the run ends
                             (--status --watch is the old name for it)`
const EXIT = { completed: 0, crashed: 1, usage: 2, stopped: 3 }
const SIGNAL_EXIT_BASE = 128

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
        notify: { type: 'boolean', default: false },
        status: { type: 'boolean', default: false },
        json: { type: 'boolean', default: false },
        follow: { type: 'boolean', default: false },
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

const print = line => console.log(line)

function notify(status) {
  if (!values.notify) return
  const text = status.state === 'completed' ? `completed ${basename(values.plan)}` : `stopped (${status.reason}): ${basename(values.plan)}`
  const run = process.platform === 'darwin'
    ? spawnSync('osascript', ['-e', 'on run argv', '-e', 'display notification (item 1 of argv) with title "orchestrate"', '-e', 'end run', text])
    : spawnSync('notify-send', ['orchestrate', text])
  if (run.status !== 0) console.error(`--notify failed: ${run.error?.message ?? run.stderr}`)
}

function killWorkerOnExit(repo, journal, interrupt) {
  const onSignal = signal => {
    interrupt.abort()
    const status = { state: 'stopped', reason: 'interrupted', detail: `the runner got ${signal}; rerun the same command to resume` }
    journal.emit({ type: 'end', ...status })
    repo.saveState({ ...storedState(workspace), status })
    notify(status)
    process.exit(SIGNAL_EXIT_BASE + constants.signals[signal])
  }
  const onCrash = error => {
    interrupt.abort()
    const reason = error instanceof Error ? error.stack : String(error)
    console.error(reason)
    const status = { state: 'stopped', reason: 'runner-error', detail: `the runner crashed: ${reason.split('\n')[0]}` }
    try {
      journal.emit({ type: 'end', ...status })
    } catch (journalError) {
      console.error(`could not record the crash in the journal: ${journalError.message}`)
    }
    notify(status)
    process.exit(EXIT.crashed)
  }
  const handlers = [['SIGINT', onSignal], ['SIGTERM', onSignal], ['uncaughtException', onCrash], ['unhandledRejection', onCrash]]
  handlers.forEach(([event, handler]) => process.on(event, handler))
  return () => handlers.forEach(([event, handler]) => process.off(event, handler))
}

if (values.json && !values.status) usage('--json works only with --status')
if (values.watch && !values.status) usage('--watch works only with --status; use --follow')
if (values.follow || values.watch) {
  console.log(statusLine(await follow(workspace, print)))
  process.exit(EXIT.completed)
}
if (values.status) {
  const status = readStatus(workspace)
  console.log(values.json ? JSON.stringify(status) : statusLine(status))
  process.exit(EXIT.completed)
}
if (!values.plan || !existsSync(values.plan)) usage(`no such plan: ${values.plan ?? '(none)'}`)
if (!HARNESSES.includes(values.harness)) usage(`unknown harness: ${values.harness ?? '(none)'}`)
const previous = readStatus(workspace)
if (previous.state === 'running') usage(`a runner is already working in this repo (pid ${previous.pid})`)
if (previous.orphanWorker) usage(`a worker from the last run is still running (pid ${previous.orphanWorker}): kill it with kill -9 -${previous.orphanWorker}, then rerun`)

const interrupt = new AbortController()
const repo = createRepo(root, workspace, { signal: interrupt.signal })
const journal = createJournal(workspace, { print })
const releaseExitHandlers = killWorkerOnExit(repo, journal, interrupt)
const status = await runPlan({
  planReader: createPlanReader(relative(root, resolve(values.plan)), scriptsDir, root),
  repo,
  journal,
  agent: createAgent({
    harness: values.harness,
    models: parseModels(values.harness, values.model, values['any-provider']),
    efforts: perRole('--effort', [...values.effort, ...values.variant]),
    cwd: root,
    workspace,
    timeoutMs: positiveInteger('--agent-timeout-min', values['agent-timeout-min']) * MS_PER_MINUTE,
    idleMs: positiveInteger('--idle-timeout-min', values['idle-timeout-min']) * MS_PER_MINUTE,
    onEvent: event => journal.emit(event),
    signal: interrupt.signal,
  }),
  cap: positiveInteger('--cap', values.cap),
  gates: values.gate,
  humanGates: values['human-gate'],
  accepted: values.accept,
  reviewDocs: values['review-docs'],
})
releaseExitHandlers()
notify(status)
process.exit(status.state === 'completed' ? EXIT.completed : EXIT.stopped)
