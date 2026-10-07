import { REVIEW, SEVERITIES, TRIAGE, WORKER_REPORT } from './contract.mjs'
import { criticPrompt, fixerPrompt, implementerPrompt, triagePrompt } from './prompts.mjs'

export const MAX_REVIEW_ROUNDS = 2
export const ROLES = ['implementer', 'critic', 'triage', 'fixer', 'reviewer']
export const CLOSE_OUT = 'close-out'
const CLOSE_OUT_MESSAGE = 'fix: close-out review findings'
const DOC_FILE = /\.md$/
const IDLE = { id: '', base: '', startHead: '', brief: '', message: '', tests: [], redBefore: [], review: '', committing: false }

const stopped = (reason, detail) => ({ stop: { reason, detail } })
const unique = list => [...new Set(list)]
const bySeverity = findings => Object.fromEntries(SEVERITIES.map(severity => [severity, findings.filter(f => f.severity === severity).length]).filter(([, count]) => count))
const tally = list => list.reduce((counts, key) => ({ ...counts, [key]: (counts[key] ?? 0) + 1 }), {})
const cell = text => String(text).replace(/\s+/g, ' ').replace(/\|/g, '\\|')
const subject = message => message.split('\n')[0]

const freshState = (plan, head) => ({
  plan,
  base0: head,
  agentsUsed: 0,
  completed: [],
  testCommands: [],
  knownRed: [],
  pendingBase: '',
  handChanged: [],
  inProgress: IDLE,
  closedOut: false,
  status: { state: 'running' },
})

export async function runPlan(ctx) {
  const { repo, planReader } = ctx
  const fresh = freshState(planReader.plan, repo.head())
  const stored = repo.loadState(fresh)
  const loaded = { ...fresh, ...stored, inProgress: { ...IDLE, ...stored.inProgress } }
  const state = loaded.plan === planReader.plan || loaded.status.state !== 'completed' ? loaded : fresh
  const isNew = stored === fresh || state === fresh
  let outcome
  try {
    outcome = await guarded(ctx, state, isNew)
  } catch (error) {
    outcome = stopped('runner-error', error.message)
  }
  state.status = outcome.stop ? { state: 'stopped', ...outcome.stop } : { state: 'completed' }
  ctx.journal.emit({ type: 'end', ...state.status })
  repo.saveState(state)
  return state.status
}

async function guarded(ctx, state, isNew) {
  if (state.plan !== ctx.planReader.plan) return stopped('plan-mismatch', `${ctx.repo.stateFile} holds the unfinished plan ${state.plan}`)
  state.status = { state: 'running', pid: process.pid }
  ctx.repo.saveState(state)
  const milestones = ctx.planReader.milestones()
  if (!milestones.ok) return stopped('plan-format', milestones.error)
  ctx.journal.emit({
    type: 'run-start', fresh: isNew, plan: state.plan, cap: ctx.cap, agentsUsed: state.agentsUsed, completed: state.completed, milestones: milestones.value,
    command: ctx.runInfo.command, idleMs: ctx.runInfo.idleMs,
  })
  const ids = milestones.value.map(m => m.id)
  noteHandChanges(ctx, state, !state.closedOut && ids.every(id => state.completed.includes(id)))
  const unknown = ctx.accepted.filter(id => id !== state.inProgress.id && id !== CLOSE_OUT && !state.completed.includes(id))
  if (unknown.length) return stopped('bad-accept', `nothing in progress to accept for: ${unknown.join(', ')}`)
  const strangers = ctx.humanGates.filter(id => !ids.includes(id))
  if (strangers.length) return stopped('unknown-milestone', `--human-gate names no milestone of the plan: ${strangers.join(', ')}; see task-brief --titles`)
  for (const [index, { id, title }] of milestones.value.entries()) {
    if (state.completed.includes(id)) continue
    ctx.journal.emit({ type: 'milestone-start', id, title, index: index + 1, total: ids.length })
    const outcome = await advance(ctx, state, id)
    if (outcome.stop) return outcome
  }
  return state.closedOut ? {} : closeOut(ctx, state)
}

// Once a milestone is built (or at close-out) every runner check stages the whole tree, so unstaged work
// changed after the last check. Before that, the tree is an implementer's partial work or a dirty-tree stop.
function noteHandChanges(ctx, state, closing) {
  if (!state.inProgress.message && !closing) return
  const files = ctx.repo.unstagedPaths().filter(file => !state.handChanged.includes(file))
  if (!files.length) return
  const list = ctx.repo.writeJson(`hand-changes-${new Date().toISOString().replace(/[:.]/g, '-')}.json`, files)
  const unit = `${ctx.planReader.plan}#${state.inProgress.id || CLOSE_OUT}`
  ctx.journal.emit({ type: 'hand-changes', files, file: list })
  ctx.repo.ledger(`| ${cell(unit)} | ${files.length} file(s) changed outside the runner since its last check | by hand, or by a worker that was cut off | ${list} | joins the next commit |`)
  state.handChanged = unique([...state.handChanged, ...files])
  ctx.repo.saveState(state)
}

async function advance(ctx, state, id) {
  const { repo } = ctx
  const work = state.inProgress
  if (work.id !== id) return repo.isClean() ? startMilestone(ctx, state, id) : dirtyTree(id)
  if (!work.message) return startMilestone(ctx, state, id)
  if (work.committing && repo.isClean() && landed(repo, work)) return record(ctx, state, id)
  if (ctx.accepted.includes(id)) return acceptMilestone(ctx, state, id)
  if (repo.isClean()) return repo.head() === work.startHead ? startMilestone(ctx, state, id) : committedByHand(id)
  if (!work.review) return reviewMilestone(ctx, state, id)
  return ctx.humanGates.includes(id) ? awaitHuman(id) : finish(ctx, state, id)
}

const landed = (repo, work) => repo.parent() === work.startHead && repo.subject() === subject(work.message)

const dirtyTree = id => stopped('dirty-tree', `uncommitted changes that belong to no milestone in progress, before milestone ${id}: discard them`)
const committedByHand = id => stopped('committed-by-hand', `milestone ${id} has commits the runner did not make: check them, then rerun with --accept ${id}`)
const awaitHuman = id => stopped('human-gate', `milestone ${id} is built and reviewed; a person must check it, then rerun with --accept ${id}`)

async function startMilestone(ctx, state, id) {
  const { repo } = ctx
  const resuming = state.inProgress.id === id && !repo.isClean()
  if (!resuming) {
    const startHead = repo.head()
    ctx.journal.emit({ type: 'gate-start', label: `m${id}-baseline` })
    const baseline = await repo.runGate(ctx.gates, `m${id}-baseline`)
    const redBefore = baseline.anyRed
    ctx.journal.emit({ type: 'baseline', label: `m${id}-baseline`, red: redBefore, file: baseline.file })
    state.knownRed = redBefore
    state.inProgress = { ...IDLE, id, base: state.pendingBase || startHead, startHead, brief: ctx.planReader.brief(id), redBefore }
    repo.saveState(state)
  }
  const prompt = implementerPrompt({ plan: ctx.planReader.plan, id, brief: state.inProgress.brief, resuming })
  const built = await work(ctx, state, 'implementer', prompt, `m${id}`)
  if (built.stop) return built
  const { commitMessage, testCommands: tests } = built.value
  state.inProgress = { ...state.inProgress, message: commitMessage.trim(), tests }
  state.testCommands = unique([...state.testCommands, ...tests])
  repo.saveState(state)
  return reviewMilestone(ctx, state, id)
}

async function reviewMilestone(ctx, state, id) {
  const { repo } = ctx
  const { base, tests, brief } = state.inProgress
  repo.stageAll()
  if (!repo.stagedPaths('HEAD').length) return stopped('blocked', `milestone ${id}: the implementer changed nothing`)
  const changed = repo.stagedPaths(base)
  const light = !ctx.reviewDocs && changed.every(path => DOC_FILE.test(path))
  const checked = light
    ? await gateOnly(ctx, `m${id}-light`, tests, { advisory: state.inProgress.redBefore, base })
    : await reviewRounds(ctx, state, { base, role: 'critic', label: `m${id}`, unit: `${ctx.planReader.plan}#${id}`, tests, brief, advisory: state.inProgress.redBefore })
  if (checked.stop) return checked
  state.inProgress = { ...state.inProgress, review: light ? 'light' : 'clean' }
  repo.saveState(state)
  return ctx.humanGates.includes(id) ? awaitHuman(id) : finish(ctx, state, id)
}

async function acceptMilestone(ctx, state, id) {
  const { redBefore: advisory, base } = state.inProgress
  const checked = await gateOnly(ctx, `m${id}-accepted`, unique([...state.testCommands, ...state.inProgress.tests]), { advisory, base })
  if (checked.stop) return checked
  const review = state.inProgress.review === 'clean' ? 'human-checked' : 'accepted'
  state.inProgress = { ...state.inProgress, review }
  noteUnreviewed(ctx, state, id)
  return finish(ctx, state, id)
}

function noteUnreviewed(ctx, state, id) {
  if (!state.handChanged.length) return
  ctx.repo.ledger(`| ${cell(`${ctx.planReader.plan}#${id}`)} | --accept commits ${state.handChanged.length} file(s) changed outside the runner, with no critic | a person checked the tree | ${cell(state.handChanged.join(' '))} | committed unreviewed |`)
}

async function gateOnly(ctx, label, tests, { advisory, base }) {
  ctx.repo.stageAll()
  const result = await gate(ctx, unique([...ctx.gates, ...tests]), label, { advisory, files: ctx.repo.changedFiles(base) })
  return result.green ? {} : stopped('gate-red', `${label}: ${result.failed.join(', ')} failed, see ${result.file}`)
}

async function gate(ctx, commands, label, options) {
  ctx.journal.emit({ type: 'gate-start', label })
  const result = await ctx.repo.runGate(commands, label, options)
  ctx.repo.stageAll()
  ctx.journal.emit({ type: 'gate', label, green: result.green, failed: result.failed, file: result.file })
  return result
}

function commit(ctx, fileCount, message) {
  ctx.repo.commit(message)
  ctx.journal.emit({ type: 'commit', sha: ctx.repo.short(ctx.repo.head()), subject: subject(message), fileCount })
}

function finish(ctx, state, id) {
  const { repo } = ctx
  repo.stageAll()
  const staged = repo.stagedPaths('HEAD').length
  if (!staged) {
    return repo.head() === state.inProgress.startHead ? stopped('blocked', `milestone ${id}: nothing to commit`) : record(ctx, state, id)
  }
  state.inProgress = { ...state.inProgress, committing: true }
  repo.saveState(state)
  commit(ctx, staged, state.inProgress.message)
  return record(ctx, state, id)
}

function record(ctx, state, id) {
  const { repo } = ctx
  const { base, review } = state.inProgress
  const plan = ctx.planReader.plan
  repo.ledger(`${plan} Milestone ${id}: complete (commits ${repo.short(base)}..${repo.short(repo.head())}, review ${review}, gate green, agents used ${state.agentsUsed})`)
  const reviewedByCritic = review === 'clean' || review === 'human-checked'
  if (reviewedByCritic && state.pendingBase) repo.ledger(`${plan} Milestone ${id}: its review covered the unreviewed milestones since ${repo.short(state.pendingBase)}`)
  state.pendingBase = reviewedByCritic ? '' : state.pendingBase || base
  state.completed.push(id)
  state.inProgress = IDLE
  state.handChanged = []
  repo.saveState(state)
  ctx.journal.emit({ type: 'milestone-done', id, review })
  return {}
}

async function closeOut(ctx, state) {
  const { repo } = ctx
  ctx.journal.emit({ type: 'close-out-start' })
  let message = CLOSE_OUT_MESSAGE
  if (ctx.accepted.includes(CLOSE_OUT)) {
    const checked = await gateOnly(ctx, `${CLOSE_OUT}-accepted`, state.testCommands, { advisory: state.knownRed, base: state.base0 })
    if (checked.stop) return checked
    noteUnreviewed(ctx, state, CLOSE_OUT)
  } else {
    const reviewed = await reviewRounds(ctx, state, {
      base: state.base0, role: 'reviewer', label: CLOSE_OUT, unit: `${ctx.planReader.plan}#${CLOSE_OUT}`,
      tests: state.testCommands, brief: ctx.planReader.plan, closing: true, advisory: state.knownRed,
    })
    if (reviewed.stop) return reviewed
    message = reviewed.fixMessage || CLOSE_OUT_MESSAGE
  }
  repo.stageAll()
  const staged = repo.stagedPaths('HEAD').length
  if (staged) commit(ctx, staged, message)
  state.handChanged = []
  repo.ledger(`${ctx.planReader.plan} close-out: whole-branch review done (commits ${repo.short(state.base0)}..${repo.short(repo.head())}, agents used ${state.agentsUsed})`)
  state.closedOut = true
  repo.saveState(state)
  return {}
}

async function reviewRounds(ctx, state, { base, role, label, unit, tests, brief, advisory, closing = false }) {
  const { repo } = ctx
  let named = tests
  let fixMessage = ''
  for (let round = 1; round <= MAX_REVIEW_ROUNDS; round += 1) {
    const tag = `${label}-r${round}`
    repo.stageAll()
    const review = repo.writePackage(base, tag, state.handChanged)
    const gated = await gate(ctx, unique([...ctx.gates, ...named]), tag, { advisory, files: repo.changedFiles(base) })
    const critique = await dispatch(ctx, state, role, criticPrompt({ brief, review, gate: gated }), REVIEW, tag)
    if (critique.stop) return critique
    const findings = [
      ...critique.value.standards.map(f => ({ axis: 'standards', ...f })),
      ...critique.value.spec.map(f => ({ axis: 'spec', ...f })),
    ]
    ctx.journal.emit({ type: 'findings', step: tag, role, total: findings.length, severities: bySeverity(findings) })
    const triaged = await triage(ctx, state, { brief, review, findings, tag, unit })
    if (triaged.stop) return triaged
    const fixes = [
      ...triaged.value,
      ...(gated.green ? [] : [gateFinding(gated)]),
      ...(named.length || closing ? [] : [NO_TESTS_FINDING]),
    ]
    if (!fixes.length) return { fixMessage }
    const fixFile = repo.writeJson(`fixes-${tag}.json`, fixes)
    ctx.journal.emit({ type: 'fixes', step: tag, count: fixes.length, file: fixFile, items: fixes.map(({ severity, issue, location }) => ({ severity, issue, location })) })
    if (round === MAX_REVIEW_ROUNDS) return stopped('open-findings', `${unit}: ${fixes.length} finding(s) left after ${MAX_REVIEW_ROUNDS} review rounds, see ${fixFile}`)
    const fixed = await work(ctx, state, 'fixer', fixerPrompt({ brief, review, fixes: fixFile }), tag)
    if (fixed.stop) return fixed
    named = unique([...named, ...fixed.value.testCommands])
    state.testCommands = unique([...state.testCommands, ...fixed.value.testCommands])
    if (state.inProgress.id) state.inProgress = { ...state.inProgress, tests: named }
    repo.saveState(state)
    fixMessage = fixed.value.commitMessage
  }
}

const gateFinding = gate => ({
  axis: 'gate', location: gate.file, issue: `gate red: ${gate.failed.join(', ')}`, severity: 'BLOCKER', fix: 'make every gate command pass',
})

const NO_TESTS_FINDING = {
  axis: 'gate', location: 'report', issue: 'no focused test command proves this change', severity: 'BLOCKER',
  fix: 'add or name the focused tests for this change and return their commands',
}

async function triage(ctx, state, { brief, review, findings, tag, unit }) {
  if (!findings.length) return { value: [] }
  const file = ctx.repo.writeJson(`findings-${tag}.json`, findings.map((finding, index) => ({ index, ...finding })))
  const judged = await dispatch(ctx, state, 'triage', triagePrompt({ brief, review, findings: file }), TRIAGE, tag)
  if (judged.stop) return judged
  const indexes = judged.value.verdicts.map(v => v.index).sort((a, b) => a - b)
  if (indexes.join() !== findings.map((_, index) => index).join()) {
    return stopped('agent-failed', `triage must give exactly one verdict per finding in ${file}, got indexes ${indexes.join(', ') || 'none'}`)
  }
  const verdicts = new Map(judged.value.verdicts.map(v => [v.index, v]))
  ctx.journal.emit({
    type: 'triage', step: tag, verdicts: tally(judged.value.verdicts.map(v => v.verdict)),
    items: findings.map((f, index) => ({ severity: f.severity, axis: f.axis, issue: f.issue, location: f.location, verdict: verdicts.get(index).verdict, reason: verdicts.get(index).reason })),
  })
  findings.forEach((finding, index) => {
    const { verdict, reason } = verdicts.get(index)
    if (verdict === 'fix-now') return
    ctx.repo.ledger(`| ${cell(unit)} | ${verdict} ${finding.axis} finding: ${cell(finding.issue)} | ${cell(reason)} | ${file}#${index} | ${verdict === 'reject' ? 'dropped' : verdict} |`)
  })
  return { value: findings.filter((_, index) => verdicts.get(index).verdict === 'fix-now') }
}

async function work(ctx, state, role, prompt, step) {
  const reply = await dispatch(ctx, state, role, prompt, WORKER_REPORT, step)
  if (reply.stop) return reply
  if (reply.value.status === 'blocked') return stopped('blocked', `${role}: ${reply.value.summary}`)
  return reply.value.commitMessage.trim() ? reply : stopped('agent-failed', `${role} returned no commit message`)
}

async function dispatch(ctx, state, role, prompt, schema, step) {
  if (state.agentsUsed >= ctx.cap) return stopped('cap', `the next ${role} would exceed the agent cap of ${ctx.cap}`)
  state.agentsUsed += 1
  ctx.repo.saveState(state)
  ctx.journal.emit({ type: 'agent-start', role, step, agentsUsed: state.agentsUsed, cap: ctx.cap })
  const started = Date.now()
  const reply = await ctx.agent(role, prompt, schema)
  ctx.journal.emit({ type: 'agent-end', role, step, ok: reply.ok, ms: Date.now() - started, ...(reply.ok ? {} : { error: reply.error }) })
  if (reply.ok) return { value: reply.value }
  return stopped(reply.kind === 'transient' ? 'rate-limited' : 'agent-failed', `${role}: ${reply.error}`)
}
