import { spawnSync } from 'node:child_process'
import { closeSync, existsSync, openSync, readFileSync, readSync, statSync } from 'node:fs'
import { basename, join } from 'node:path'
import { StringDecoder } from 'node:string_decoder'
import { setTimeout as wait } from 'node:timers/promises'
import { EVENTS_FILE, LIVE_FILE, logLine, parsed, readEvents } from './journal.mjs'
import { duration, MS_PER_SECOND, project } from './view.mjs'

const FOLLOW_POLL_MS = 1000
const FOLLOW_START_GRACE_MS = 3000
const PS_NO_SUCH_PROCESS = 1

export const STATE_FILE = 'run-state.json'

function processField(pid, field) {
  if (!pid) return ''
  const run = spawnSync('ps', ['-o', `${field}=`, '-p', String(pid)], { encoding: 'utf8' })
  if (run.status === 0) return run.stdout.trim()
  if (run.status === PS_NO_SUCH_PROCESS && !run.stderr.trim()) return ''
  throw new Error(`ps cannot check pid ${pid}: ${run.error?.message ?? run.stderr.trim()}`)
}

export const runnerAlive = pid => basename(processField(pid, 'comm')) === 'node' && processField(pid, 'command').includes('run-plan.mjs')

export function storedState(workspace) {
  const file = join(workspace, STATE_FILE)
  return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : { status: { state: 'not-started' }, agentsUsed: 0, completed: [] }
}

function orphanWorker(agent) {
  if (!agent.pid || agent.endedAt) return 0
  return processField(agent.pid, 'command').includes(agent.harness) ? agent.pid : 0
}

function activity(agent) {
  if (!agent.log || !existsSync(agent.log)) return {}
  const last = agent.activity.at(-1)
  return {
    log: agent.log,
    idleSeconds: Math.round((Date.now() - statSync(agent.log).mtimeMs) / MS_PER_SECOND),
    lastActivity: last ? last.text : '',
  }
}

export function readStatus(workspace) {
  const { status, plan, agentsUsed, completed } = storedState(workspace)
  const view = project(readEvents(workspace))
  const running = status.state === 'running' && runnerAlive(status.pid)
  const live = join(workspace, LIVE_FILE)
  const base = { plan, agentsUsed, cap: view.cap, completed, ...(existsSync(live) ? { live } : {}) }
  if (running) {
    const index = view.milestones.findIndex(m => m.id === view.milestoneId)
    const agent = view.agent.endedAt || !view.agent.role ? {} : { role: view.agent.role, step: view.agent.step, agentSeconds: Math.round((Date.now() - Date.parse(view.agent.startedAt)) / MS_PER_SECOND), ...activity(view.agent) }
    const milestone = view.milestoneId === 'close-out'
      ? { milestone: 'close-out' }
      : { milestone: view.milestoneId, milestoneIndex: index + 1, milestoneTotal: view.milestones.length, title: view.milestones[index]?.title ?? '' }
    return { ...status, ...base, ...milestone, ...agent }
  }
  const orphan = orphanWorker(view.agent)
  const crashed = status.state === 'running'
    ? { state: 'crashed', detail: `runner ${status.pid} died; see .orchestrate/run.log` }
    : status
  return { ...crashed, ...base, ...(orphan ? { orphanWorker: orphan } : {}) }
}

const orphanNote = status => (status.orphanWorker ? ` · worker ${status.orphanWorker} still running: kill -9 -${status.orphanWorker}` : '')

function runningLine(status) {
  const where = { 'close-out': 'close-out', '': 'starting' }[status.milestone] ?? `milestone ${status.milestoneIndex}/${status.milestoneTotal} ${status.title}`
  const agent = status.role ? ` · ${status.step} ${status.role} ${duration(status.agentSeconds * MS_PER_SECOND)}` : ''
  const idle = status.idleSeconds === undefined ? '' : ` · idle ${duration(status.idleSeconds * MS_PER_SECOND)}`
  const last = status.lastActivity ? ` · last: ${status.lastActivity}` : ''
  return `running · ${status.plan} · ${where}${agent} · agents ${status.agentsUsed}/${status.cap}${idle}${last}`
}

export function statusLine(status) {
  const agents = `agents ${status.agentsUsed}/${status.cap}`
  const lines = {
    running: () => runningLine(status),
    completed: () => `completed · ${status.plan} · ${agents}`,
    stopped: () => `stopped: ${status.reason} · ${status.plan} · ${agents} · ${status.detail}${orphanNote(status)}`,
    crashed: () => `crashed · ${status.plan} · ${agents} · ${status.detail}${orphanNote(status)}`,
    'not-started': () => 'not started: no run in this repo yet',
  }
  return status.live ? `${lines[status.state]()}\nlive view: ${status.live}` : lines[status.state]()
}

function readFrom(file, offset) {
  const size = existsSync(file) ? statSync(file).size : 0
  const start = size < offset ? 0 : offset
  const buffer = Buffer.alloc(size - start)
  if (buffer.length) {
    const fd = openSync(file, 'r')
    readSync(fd, buffer, 0, buffer.length, start)
    closeSync(fd)
  }
  return { buffer, offset: size, restarted: start < offset }
}

export async function follow(workspace, print) {
  const file = join(workspace, EVENTS_FILE)
  const startedAt = Date.now()
  let offset = 0
  let decoder = new StringDecoder('utf8')
  let partial = ''
  const drain = () => {
    const read = readFrom(file, offset)
    if (read.restarted) [decoder, partial] = [new StringDecoder('utf8'), '']
    offset = read.offset
    const lines = (partial + decoder.write(read.buffer)).split('\n')
    partial = lines.pop()
    lines.flatMap(parsed).forEach(event => print(logLine(event)))
  }
  for (;;) {
    drain()
    const status = readStatus(workspace)
    const mayBeStarting = Date.now() - startedAt < FOLLOW_START_GRACE_MS
    if (status.state !== 'running' && !mayBeStarting) {
      drain()
      return status
    }
    await wait(FOLLOW_POLL_MS)
  }
}
