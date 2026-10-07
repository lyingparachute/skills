import { basename, dirname } from 'node:path'
import { clock, describe, duration, MS_PER_SECOND } from './view.mjs'

const REFRESH_MS = 3000
const STOPPED_REFRESH_MS = 10000
const TICK_MS = 1000
const QUIET_WARNING_MS = 3 * 60 * MS_PER_SECOND
const PERCENT = 100
const BUDGET_WARNING_SHARE = 0.8
const CLOSE_OUT = 'close-out'
const STORE_KEY = 'orchestrate-live'

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const escape = text => String(text).replace(/[&<>"']/g, char => ESCAPES[char])
const escapeRegExp = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const since = (now, at, ticking = true) => (ticking ? `<span class="since" data-at="${escape(at)}">${duration(now - new Date(at))}</span>` : duration(now - new Date(at)))

function linker(workspace) {
  const workspacePath = new RegExp(`(${escapeRegExp(workspace)}/[^\\s,;:)]*[^\\s,;:).])`)
  const anchor = path => `<a href="${encodeURIComponent(basename(path))}">${escape(basename(path))}</a>`
  return text => String(text).split(workspacePath).map((piece, index) => (index % 2 ? anchor(piece) : escape(piece))).join('')
}

const WHAT_NOW = {
  'human-gate': 'A person has to check this milestone. Do the check, then rerun with --accept and the milestone id.',
  'open-findings': 'Review findings were still open after two rounds. Read the fixes file: fix them, or accept them as they are.',
  'committed-by-hand': 'Someone committed in the middle of this milestone. Check those commits, then accept them.',
  'gate-red': 'A gate command failed. Read the gate log, fix the cause, then rerun.',
  blocked: 'An agent could not do its brief. Read why below and decide how to go on.',
  'dirty-tree': 'The tree has uncommitted changes that no milestone owns. Discard them, then rerun.',
  cap: 'The agent budget is used up. Rerun with a higher --cap if you approve the spend.',
  interrupted: 'Someone stopped the runner. Rerun to go on; the work so far is kept.',
  'rate-limited': 'The model provider kept refusing. Wait for the limit to lift or switch the model, then rerun.',
}
const FALLBACK_WHAT_NOW = 'Something failed. Read the detail and the log it names, fix the cause, then rerun.'

const STATE_LABEL = { running: 'running', completed: 'completed', stopped: 'needs attention', 'not-started': 'not started' }
const MARK = { done: '✓', active: '▶', stopped: '⚠', pending: '○' }
const ACCEPT_ONLY_REASONS = ['human-gate', 'committed-by-hand']
const ACCEPT_TOO_REASONS = ['open-findings']

function bar(label, value, total, warn = false) {
  const share = total ? Math.min(1, value / total) : 0
  return `<div class="bar${warn ? ' warn' : ''}"><span>${escape(label)} <b>${value}/${total}</b></span><i style="width:${Math.round(share * PERCENT)}%"></i></div>`
}

function currentStep(view) {
  if (view.milestoneId === CLOSE_OUT) return 'close-out'
  const index = view.milestones.findIndex(m => m.id === view.milestoneId)
  return index < 0 ? '' : `milestone ${view.milestoneId} (${index + 1} of ${view.milestones.length})`
}

function gatePanel(view, now) {
  if (view.state !== 'running' || !view.gate.label) return ''
  return `<section class="panel working"><h2>Running the gate: ${escape(view.gate.label)}</h2><p class="facts"><span>lint, type check and focused tests, for ${since(now, view.gate.at)}</span></p></section>`
}

function workingPanel(view, link, now) {
  const { agent } = view
  if (view.state !== 'running' || !agent.role || agent.endedAt) return gatePanel(view, now)
  const quietMs = now - new Date(agent.lastOutputAt || agent.startedAt)
  const stallAt = view.idleMs ? ` The runner kills and retries a worker silent for ${duration(view.idleMs)}.` : ''
  const retrying = agent.retry.at
    ? `<p class="note warn">Retrying after ${escape(agent.retry.error)} - next attempt at ${clock(new Date(agent.retry.at).getTime() + agent.retry.waitMs)}</p>`
    : ''
  const activity = agent.activity.map(a => `<li><time>${clock(a.at)}</time><span>${escape(a.text)}</span></li>`).join('')
  return `<section class="panel working">
  <h2>Working now: ${escape(agent.step)} ${escape(agent.role)}</h2>
  <p class="facts"><span>${escape(agent.model)}</span><span>running for ${since(now, agent.startedAt)}</span>
    <span class="quiet-clock${quietMs > QUIET_WARNING_MS ? ' warn' : ''}" data-at="${escape(agent.lastOutputAt || agent.startedAt)}">last output ${duration(quietMs)} ago</span>
    ${agent.log ? `<span>log: ${link(agent.log)}</span>` : ''}</p>
  <p class="note quiet-note"${quietMs > QUIET_WARNING_MS ? '' : ' hidden'}>No output for a while. On a free model this is usually a provider rate limit; tests that run quietly look the same.${stallAt}</p>
  ${retrying}
  <ol class="activity" data-keep-bottom>${activity || '<li class="muted">no output yet</li>'}</ol>
</section>`
}

const commandBlock = (id, label, command) => `<p class="muted">${escape(label)}</p><div class="command"><code id="${escape(id)}">${escape(command)}</code><button type="button" data-copy="${escape(id)}">Copy</button></div>`

function rerunCommands(view) {
  if (!view.command) return ''
  const id = view.milestoneId === CLOSE_OUT ? CLOSE_OUT : view.milestoneId
  const words = view.command.split(/\s+/)
  const accepted = words.some((word, index) => (word === '--accept' && words[index + 1] === id) || word === `--accept=${id}`)
  const acceptCommand = accepted ? view.command : `${view.command} --accept ${id}`
  if (ACCEPT_ONLY_REASONS.includes(view.reason)) return commandBlock('accept', 'Once checked, accept it:', acceptCommand)
  const rerun = commandBlock('rerun', 'Rerun the same command to go on:', view.command)
  return ACCEPT_TOO_REASONS.includes(view.reason) ? `${rerun}${commandBlock('accept', 'Or take the rest as it is:', acceptCommand)}` : rerun
}

function stopPanel(view, link) {
  if (view.state !== 'stopped') return ''
  return `<section class="panel attention">
  <h2>Needs attention: ${escape(view.reason)}</h2>
  <p class="what-now">${escape(WHAT_NOW[view.reason] ?? FALLBACK_WHAT_NOW)}</p>
  <p class="detail">${link(view.detail)}</p>
  ${rerunCommands(view)}
</section>`
}

function donePanel(view, now) {
  if (view.state !== 'completed') return ''
  return `<section class="panel done"><h2>Completed</h2><p>All ${view.milestones.length} milestones and the close-out review are done, in ${since(new Date(view.updatedAt), view.startedAt, false)} with ${view.agentsUsed} agents.</p></section>`
}

const chip = (kind, text) => `<span class="chip ${escape(kind)}">${escape(text)}</span>`

function findingsList(items) {
  const rows = items.map(item => `<li>${chip(item.severity, item.severity)}${item.verdict ? chip(item.verdict, item.verdict) : ''}<div><p>${escape(item.issue)}</p><code>${escape(item.location)}</code>${item.reason ? `<p class="muted">${escape(item.reason)}</p>` : ''}</div></li>`)
  return `<ul class="findings">${rows.join('')}</ul>`
}

function timelineRow(event, key, link) {
  const bad = event.ok === false || event.green === false || (event.type === 'end' && event.state !== 'completed')
  const text = `<time>${clock(event.at)}</time><span>${link(describe(event))}</span>`
  const row = event.items?.length
    ? `<details data-key="${escape(key)}"><summary>${text}</summary>${findingsList(event.items)}</details>`
    : `<div class="line">${text}</div>`
  return `<li class="t-${escape(event.type)}${bad ? ' bad' : ''}">${row}</li>`
}

function groupsOf(view) {
  const groups = []
  const leading = []
  for (const event of view.timeline) {
    const id = event.type === 'milestone-start' ? event.id : event.type === 'close-out-start' ? CLOSE_OUT : ''
    const existing = id && groups.find(group => group.id === id)
    if (existing) groups.push(groups.splice(groups.indexOf(existing), 1)[0])
    else if (id) groups.push({ id, events: leading.splice(0) })
    if (groups.length) groups.at(-1).events.push(event)
    else leading.push(event)
  }
  return groups.length ? groups : [{ id: '', events: leading }].filter(group => group.events.length)
}

const shownState = (view, state) => (state === 'active' && view.state !== 'running' ? 'stopped' : state)

function groupTitle(view, id) {
  if (id === CLOSE_OUT) return { mark: MARK[view.state === 'completed' ? 'done' : shownState(view, 'active')], title: 'Close-out review' }
  const milestone = view.milestones.find(m => m.id === id)
  if (!milestone) return { mark: '', title: 'Run' }
  return { mark: MARK[shownState(view, milestone.state)], title: `Milestone ${milestone.id}: ${milestone.title}` }
}

function timeline(view, link) {
  const groups = groupsOf(view)
  return groups.map((group, index) => {
    const { mark, title } = groupTitle(view, group.id)
    const agents = group.events.filter(e => e.type === 'agent-start').length
    const span = duration(new Date(group.events.at(-1).at) - new Date(group.events[0].at))
    const open = index === groups.length - 1
    const rows = group.events.map((event, row) => timelineRow(event, `e-${group.id}-${row}`, link)).join('')
    return `<details class="group" data-key="g-${escape(group.id)}"${open ? ' open' : ''}>
  <summary><span class="mark">${mark}</span><b>${escape(title)}</b><small>${agents} agent${agents === 1 ? '' : 's'} · ${span}</small></summary>
  <ol class="timeline">${rows}</ol>
</details>`
  }).join('\n')
}

function milestoneList(view) {
  const closeOut = view.milestoneId === CLOSE_OUT ? 'active' : view.state === 'completed' ? 'done' : 'pending'
  const items = [...view.milestones, { id: '∎', title: 'close-out review', state: closeOut }].map(m => ({ ...m, state: shownState(view, m.state) }))
  return `<ol class="milestones">${items.map(m => `<li class="m-${escape(m.state)}"><span class="mark">${MARK[m.state]}</span><span class="id">${escape(m.id)}</span><span>${escape(m.title)}</span></li>`).join('')}</ol>`
}

function tabTitle(view) {
  const plan = basename(view.plan || 'run')
  if (view.state === 'running') {
    const where = view.milestoneId === CLOSE_OUT ? 'close-out' : view.milestoneId && `M${view.milestoneId}`
    return `${['▶', where, !view.agent.endedAt && view.agent.role].filter(Boolean).join(' ')} · ${plan}`
  }
  if (view.state === 'stopped') return `⚠ ${view.reason} · ${plan}`
  return `${view.state === 'completed' ? '✓' : '○'} ${plan}`
}

export function renderLive(view, { workspace, now }) {
  const link = linker(workspace)
  const running = view.state === 'running'
  const done = view.milestones.filter(m => m.state === 'done').length
  const step = currentStep(view)
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(tabTitle(view))}</title>
<style>
:root { color-scheme: light dark; --fg: #1d1d1f; --muted: #6e6e73; --line: #e3e3e8; --bg: #fbfbfd; --panel: #fff; --ok: #1a7f37; --bad: #c62828; --warn: #b26a00; --run: #0a66c2; --chip: #eef0f3; }
@media (prefers-color-scheme: dark) { :root { --fg: #f2f2f7; --muted: #9a9aa1; --line: #2c2c30; --bg: #111113; --panel: #1b1b1e; --ok: #3fb950; --bad: #ff6b6b; --warn: #f0a33a; --run: #58a6ff; --chip: #2a2a2e; } }
* { box-sizing: border-box; }
body { margin: 0 auto; max-width: 1100px; padding: 24px; background: var(--bg); color: var(--fg); font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
header { display: grid; gap: 10px; padding-bottom: 16px; border-bottom: 1px solid var(--line); }
.title { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
h1 { font-size: 20px; margin: 0; } h1 small { font-weight: 400; }
h2 { font-size: 15px; margin: 0 0 6px; }
small, .muted, time { color: var(--muted); }
.badge { border-radius: 999px; padding: 2px 10px; font-size: 12px; font-weight: 600; color: #fff; }
.badge.running { background: var(--run); } .badge.completed { background: var(--ok); } .badge.stopped { background: var(--bad); } .badge.not-started { background: var(--muted); }
.meta { display: flex; flex-wrap: wrap; gap: 6px 18px; color: var(--muted); }
.bars { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; }
.bar { position: relative; height: 26px; border-radius: 6px; background: var(--chip); overflow: hidden; }
.bar i { position: absolute; inset: 0 auto 0 0; background: color-mix(in srgb, var(--run) 28%, transparent); }
.bar.warn i { background: color-mix(in srgb, var(--warn) 35%, transparent); }
.bar span { position: relative; z-index: 1; display: block; padding: 3px 10px; font-size: 13px; }
.grid { display: grid; grid-template-columns: minmax(230px, 1fr) 3fr; gap: 20px; margin-top: 20px; align-items: start; }
@media (max-width: 760px) { .grid { grid-template-columns: 1fr; } }
aside { position: sticky; top: 16px; max-height: calc(100vh - 32px); overflow-y: auto; }
.panel, aside section, .group { background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 14px 16px; margin-bottom: 14px; }
.working { border-left: 4px solid var(--run); } .attention { border-left: 4px solid var(--bad); } .done { border-left: 4px solid var(--ok); }
.facts { display: flex; flex-wrap: wrap; gap: 4px 16px; margin: 0 0 8px; color: var(--muted); }
.warn { color: var(--warn); font-weight: 600; }
.note { margin: 0 0 8px; padding: 8px 10px; border-radius: 6px; background: color-mix(in srgb, var(--warn) 12%, transparent); }
.what-now { font-size: 15px; margin: 0 0 6px; }
.detail { margin: 0 0 10px; overflow-wrap: anywhere; }
.command { display: flex; gap: 8px; align-items: flex-start; margin-bottom: 10px; }
.command code { flex: 1; padding: 8px 10px; border-radius: 6px; background: var(--chip); font-size: 12px; overflow-wrap: anywhere; }
button { font: inherit; padding: 6px 12px; border-radius: 6px; border: 1px solid var(--line); background: var(--panel); color: var(--fg); cursor: pointer; }
ol, ul { list-style: none; margin: 0; padding: 0; }
.milestones li { display: flex; gap: 8px; padding: 4px 0; }
.mark { width: 1.1em; text-align: center; flex: none; } .id { min-width: 1.8em; color: var(--muted); font-variant-numeric: tabular-nums; flex: none; }
.m-done .mark { color: var(--ok); } .m-active, .m-stopped { font-weight: 600; } .m-active .mark { color: var(--run); } .m-stopped .mark { color: var(--warn); } .m-pending { color: var(--muted); }
.activity { max-height: 340px; overflow-y: auto; }
.activity, .timeline { font: 12.5px/1.6 ui-monospace, SFMono-Regular, Menlo, monospace; }
.activity li, .line, .timeline summary { display: flex; gap: 10px; overflow-wrap: anywhere; }
time { flex: none; font-variant-numeric: tabular-nums; }
.group > summary { display: flex; gap: 8px; align-items: baseline; cursor: pointer; list-style: none; }
.group > summary small { margin-left: auto; }
.group[open] > summary { margin-bottom: 8px; }
.timeline details > summary { cursor: pointer; list-style: none; }
.timeline details > summary span::after { content: '  ▸ details'; color: var(--run); }
.timeline details[open] > summary span::after { content: '  ▾'; }
.timeline .bad { color: var(--bad); }
.t-commit, .t-milestone-done { color: var(--ok); } .t-milestone-start, .t-close-out-start, .t-run-start, .t-end { font-weight: 600; }
.t-hand-changes { color: var(--warn); }
.findings { margin: 6px 0 8px 70px; display: grid; gap: 8px; font: 13px/1.45 -apple-system, BlinkMacSystemFont, sans-serif; }
.findings li { display: flex; gap: 6px; align-items: flex-start; }
.findings li > div { min-width: 0; overflow-wrap: anywhere; }
@media (max-width: 760px) { .findings { margin-left: 0; } }
.findings p { margin: 0; } .findings code { font-size: 12px; color: var(--muted); }
.chip { flex: none; font-size: 11px; font-weight: 600; padding: 1px 7px; border-radius: 999px; background: var(--chip); }
.chip.BLOCKER { background: var(--bad); color: #fff; } .chip.MAJOR { background: var(--warn); color: #fff; }
.chip.fix-now { color: var(--run); } .chip.reject { color: var(--muted); text-decoration: line-through; }
a { color: var(--run); }
</style>
</head>
<body>
<header>
  <div class="title">
    <h1>${escape(basename(view.plan || 'orchestrate'))} <small>${escape(dirname(view.plan || '.'))}</small></h1>
    <span class="badge ${escape(view.state)}">${STATE_LABEL[view.state]}</span>
  </div>
  <div class="meta">
    ${step ? `<span>${escape(step)}</span>` : ''}
    ${view.startedAt ? `<span>elapsed ${since(running ? now : new Date(view.updatedAt), view.startedAt, running)}</span>` : ''}
    <span>last event <span class="age" data-at="${escape(view.updatedAt)}">${view.updatedAt ? clock(view.updatedAt) : 'none'}</span></span>
  </div>
  <div class="bars">
    ${bar('milestones', done, view.milestones.length)}
    ${bar('agents', view.agentsUsed, view.cap, view.cap > 0 && view.agentsUsed >= view.cap * BUDGET_WARNING_SHARE)}
  </div>
</header>
<div class="grid">
  <aside><section><h2>Milestones</h2>${milestoneList(view)}</section></aside>
  <main>
    ${stopPanel(view, link)}
    ${donePanel(view, now)}
    ${workingPanel(view, link, now)}
    ${timeline(view, link)}
  </main>
</div>
<script>
const MINUTE = 60, HOUR = 3600, SCROLL_SLACK_PX = 4
const ago = at => {
  const s = Math.max(0, Math.round((Date.now() - Date.parse(at)) / 1000))
  const pad = n => String(n).padStart(2, '0')
  if (s >= HOUR) return Math.floor(s / HOUR) + 'h' + pad(Math.floor(s / MINUTE) % MINUTE) + 'm'
  return s >= MINUTE ? Math.floor(s / MINUTE) + 'm' + pad(s % MINUTE) + 's' : s + 's'
}
const tick = () => {
  document.querySelectorAll('.age[data-at]').forEach(el => { if (el.dataset.at) el.textContent = ago(el.dataset.at) + ' ago' })
  document.querySelectorAll('.since[data-at]').forEach(el => { el.textContent = ago(el.dataset.at) })
  const clockEl = document.querySelector('.quiet-clock')
  const note = document.querySelector('.quiet-note')
  if (!clockEl || !note) return
  const quiet = Date.now() - Date.parse(clockEl.dataset.at) > ${QUIET_WARNING_MS}
  clockEl.textContent = 'last output ' + ago(clockEl.dataset.at) + ' ago'
  clockEl.classList.toggle('warn', quiet)
  note.hidden = !quiet
}
tick()
setInterval(tick, ${TICK_MS})
const readStore = () => { try { return JSON.parse(sessionStorage.getItem('${STORE_KEY}')) ?? { open: {} } } catch { return { open: {} } } }
const stored = readStore()
const save = () => { try { sessionStorage.setItem('${STORE_KEY}', JSON.stringify(stored)) } catch { document.title = '(state not saved) ' + document.title } }
${view.state === 'completed' ? '' : `setTimeout(() => { stored.scrollY = scrollY; save(); location.reload() }, ${running ? REFRESH_MS : STOPPED_REFRESH_MS})`}
document.querySelectorAll('details[data-key]').forEach(el => {
  if (el.dataset.key in stored.open) el.open = stored.open[el.dataset.key]
  el.addEventListener('toggle', () => { stored.open[el.dataset.key] = el.open; save() })
})
const activity = document.querySelector('[data-keep-bottom]')
if (activity) {
  activity.scrollTop = stored.activityAtBottom === false ? stored.activityTop : activity.scrollHeight
  activity.addEventListener('scroll', () => {
    stored.activityAtBottom = activity.scrollTop + activity.clientHeight >= activity.scrollHeight - SCROLL_SLACK_PX
    stored.activityTop = activity.scrollTop
    save()
  })
}
if (stored.scrollY) scrollTo(0, stored.scrollY)
document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', () => {
  const code = document.getElementById(button.dataset.copy)
  const selectByHand = () => { getSelection().selectAllChildren(code); button.textContent = 'Press ⌘C' }
  if (!navigator.clipboard) return selectByHand()
  navigator.clipboard.writeText(code.textContent).then(() => { button.textContent = 'Copied' }, selectByHand)
}))
</script>
</body>
</html>
`
}
