const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60
export const MS_PER_SECOND = 1000
const ACTIVITY_KEPT = 20

export const clock = at => new Date(at).toLocaleTimeString('en-GB', { hour12: false })

const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`
const counted = counts => Object.entries(counts).map(([name, count]) => `${count} ${name}`).join(', ')

export function duration(ms) {
  const seconds = Math.max(0, Math.round(ms / MS_PER_SECOND))
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE)
  const hours = Math.floor(minutes / MINUTES_PER_HOUR)
  if (hours) return `${hours}h${String(minutes % MINUTES_PER_HOUR).padStart(2, '0')}m`
  if (minutes) return `${minutes}m${String(seconds % SECONDS_PER_MINUTE).padStart(2, '0')}s`
  return `${seconds}s`
}

const DESCRIBE = {
  'run-start': e => `run ${e.fresh ? 'started' : 'resumed'}: ${e.plan}, ${e.completed.length}/${e.milestones.length} milestones done, agents ${e.agentsUsed}/${e.cap}`,
  'milestone-start': e => `milestone ${e.id} (${e.index}/${e.total}): ${e.title}`,
  'close-out-start': () => 'close-out: whole-branch review',
  baseline: e => (e.red.length ? `${e.label}: red before this milestone, advisory: ${e.red.join(', ')}` : `${e.label}: gate green`),
  gate: e => (e.green ? `${e.label}: gate green` : `${e.label}: gate red: ${e.failed.join(', ')}, see ${e.file}`),
  'agent-start': e => `${e.step} ${e.role} started (agent ${e.agentsUsed}/${e.cap})`,
  attempt: e => `  ${e.role} ${e.model} log: ${e.log}`,
  activity: e => `    · ${e.text}`,
  retry: e => `  ${e.role} retry in ${duration(e.waitMs)}: ${e.error}`,
  'agent-end': e => (e.ok ? `${e.step} ${e.role} done in ${duration(e.ms)}` : `${e.step} ${e.role} failed after ${duration(e.ms)}: ${e.error}`),
  findings: e => `${e.step} ${e.role} found ${e.total ? counted(e.severities) : 'nothing'}`,
  triage: e => `${e.step} triage: ${counted(e.verdicts)}`,
  fixes: e => `${e.step} ${plural(e.count, 'finding')} to fix, see ${e.file}`,
  commit: e => `commit ${e.sha} ${e.subject}`,
  'milestone-done': e => `milestone ${e.id} complete (review ${e.review})`,
  end: e => (e.state === 'completed' ? 'COMPLETED' : `STOPPED ${e.reason}: ${e.detail}`),
}

export const describe = event => DESCRIBE[event.type]?.(event) ?? `${event.type}: ${JSON.stringify(event)}`

const NO_AGENT = { role: '', step: '', harness: '', model: '', log: '', pid: 0, startedAt: '', endedAt: '', activity: [] }

export const emptyView = () => ({
  plan: '', cap: 0, agentsUsed: 0, state: 'not-started', reason: '', detail: '',
  startedAt: '', updatedAt: '', milestones: [], milestoneId: '', agent: NO_AGENT, timeline: [],
})

const mark = (view, id, state) => ({ ...view, milestones: view.milestones.map(m => (m.id === id ? { ...m, state } : m)) })
const withAgent = (view, change) => ({ ...view, agent: { ...view.agent, ...change } })

const APPLY = {
  'run-start': (view, e) => ({
    ...view,
    plan: e.plan, cap: e.cap, agentsUsed: e.agentsUsed, state: 'running', reason: '', detail: '',
    startedAt: view.startedAt || e.at,
    milestones: e.milestones.map(m => ({ ...m, state: e.completed.includes(m.id) ? 'done' : 'pending' })),
  }),
  'milestone-start': (view, e) => ({ ...mark(view, e.id, 'active'), milestoneId: e.id }),
  'close-out-start': view => ({ ...view, milestoneId: 'close-out' }),
  'milestone-done': (view, e) => mark(view, e.id, 'done'),
  'agent-start': (view, e) => ({ ...view, agentsUsed: e.agentsUsed, agent: { ...NO_AGENT, role: e.role, step: e.step, startedAt: e.at } }),
  attempt: (view, e) => withAgent(view, { harness: e.harness, model: e.model, log: e.log, pid: e.pid }),
  activity: (view, e) => withAgent(view, { activity: [...view.agent.activity, { at: e.at, text: e.text }].slice(-ACTIVITY_KEPT) }),
  'agent-end': (view, e) => withAgent(view, { endedAt: e.at }),
  end: (view, e) => ({ ...withAgent(view, { endedAt: view.agent.endedAt || e.at }), state: e.state, reason: e.reason ?? '', detail: e.detail ?? '' }),
}

const TIMELINE_SKIPS = new Set(['activity', 'attempt'])

export function apply(view, event) {
  const applied = (APPLY[event.type] ?? (v => v))(view, event)
  const timeline = TIMELINE_SKIPS.has(event.type) ? applied.timeline : [...applied.timeline, event]
  return { ...applied, timeline, updatedAt: event.at }
}

export const project = events => events.reduce(apply, emptyView())
