import { basename } from 'node:path'
import { clock, describe, duration } from './view.mjs'

const REFRESH_MS = 3000
const SCROLL_KEY = 'orchestrate-live-scroll'

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const escape = text => String(text).replace(/[&<>"']/g, char => ESCAPES[char])
const escapeRegExp = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function linker(workspace) {
  const workspacePath = new RegExp(`(${escapeRegExp(workspace)}/[^\\s,;:)]*[^\\s,;:).])`)
  const anchor = path => `<a href="${encodeURIComponent(basename(path))}">${escape(basename(path))}</a>`
  return text => String(text).split(workspacePath).map((piece, index) => (index % 2 ? anchor(piece) : escape(piece))).join('')
}

const STATE_LABEL = { running: 'running', completed: 'completed', stopped: 'stopped', 'not-started': 'not started' }
const MILESTONE_MARK = { done: '✓', active: '▶', pending: '·' }

function milestoneList(view) {
  const items = view.milestones.map(m => `<li class="m-${m.state}"><span class="mark">${MILESTONE_MARK[m.state]}</span><span class="id">${escape(m.id)}</span>${escape(m.title)}</li>`)
  const closeOut = view.milestoneId === 'close-out' ? 'active' : view.state === 'completed' ? 'done' : 'pending'
  return `<ol class="milestones">${items.join('')}<li class="m-${closeOut}"><span class="mark">${MILESTONE_MARK[closeOut]}</span><span class="id">∎</span>close-out review</li></ol>`
}

function agentPanel(view, link, now) {
  const { agent } = view
  if (!agent.role || view.state !== 'running') return ''
  const running = !agent.endedAt
  const since = duration(now - new Date(agent.startedAt))
  const activity = agent.activity.map(a => `<li><time>${clock(a.at)}</time>${escape(a.text)}</li>`).join('') || '<li class="quiet">no output yet</li>'
  return `<section class="agent">
  <h2>${running ? 'Working now' : 'Last agent'}: ${escape(agent.step)} ${escape(agent.role)} <small>${escape(agent.model)}${running ? ` · ${since}` : ''}</small></h2>
  ${agent.log ? `<p class="log">log: ${link(agent.log)}</p>` : ''}
  <ul class="activity">${activity}</ul>
</section>`
}

function stopPanel(view, link) {
  if (view.state !== 'stopped') return ''
  return `<section class="stop"><h2>Stopped: ${escape(view.reason)}</h2><p>${link(view.detail)}</p><p class="hint">See the orchestrate skill's stop table for what to do, then rerun the same command.</p></section>`
}

const timelineRow = (event, link) => `<li class="t-${escape(event.type)}${event.ok === false || event.green === false ? ' bad' : ''}"><time>${clock(event.at)}</time>${link(describe(event))}</li>`

export function renderLive(view, { workspace, now }) {
  const link = linker(workspace)
  const running = view.state === 'running'
  const elapsed = view.startedAt ? duration(now - new Date(view.startedAt)) : ''
  const done = view.milestones.filter(m => m.state === 'done').length
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${running ? '▶' : view.state === 'completed' ? '✓' : '■'} orchestrate · ${escape(basename(view.plan || 'run'))}</title>
<style>
:root { color-scheme: light dark; --fg: #1d1d1f; --muted: #6e6e73; --line: #e5e5ea; --bg: #fff; --panel: #f5f5f7; --ok: #1a7f37; --bad: #c62828; --run: #0a66c2; }
@media (prefers-color-scheme: dark) { :root { --fg: #f2f2f7; --muted: #98989f; --line: #2c2c2e; --bg: #111113; --panel: #1c1c1e; --ok: #3fb950; --bad: #ff6b6b; --run: #58a6ff; } }
* { box-sizing: border-box; }
body { margin: 0 auto; max-width: 980px; padding: 24px; background: var(--bg); color: var(--fg); font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
header { display: flex; flex-wrap: wrap; align-items: baseline; gap: 12px; border-bottom: 1px solid var(--line); padding-bottom: 12px; }
h1 { font-size: 18px; margin: 0; word-break: break-all; }
h2 { font-size: 15px; margin: 0 0 8px; }
small, .quiet, .hint, time, .meta { color: var(--muted); }
.badge { border-radius: 999px; padding: 2px 10px; font-weight: 600; color: #fff; }
.badge.running { background: var(--run); } .badge.completed { background: var(--ok); } .badge.stopped, .badge.not-started { background: var(--bad); }
.meta { display: flex; gap: 16px; flex-wrap: wrap; }
.grid { display: grid; grid-template-columns: minmax(220px, 1fr) 2fr; gap: 24px; margin-top: 20px; }
@media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
section { background: var(--panel); border-radius: 10px; padding: 14px 16px; margin-bottom: 16px; }
ol, ul { list-style: none; margin: 0; padding: 0; }
.milestones li { display: flex; gap: 8px; padding: 3px 0; }
.mark { width: 1em; text-align: center; } .id { min-width: 2em; color: var(--muted); font-variant-numeric: tabular-nums; }
.m-done .mark { color: var(--ok); } .m-active { font-weight: 600; } .m-active .mark { color: var(--run); } .m-pending { color: var(--muted); }
.activity, .timeline { font: 12.5px/1.6 ui-monospace, SFMono-Regular, Menlo, monospace; }
.activity li, .timeline li { display: flex; gap: 10px; overflow-wrap: anywhere; }
.activity time, .timeline time { flex: none; font-variant-numeric: tabular-nums; }
.timeline li.bad, .t-end.bad { color: var(--bad); }
.t-commit, .t-milestone-done { color: var(--ok); } .t-milestone-start, .t-close-out-start, .t-run-start, .t-end { font-weight: 600; }
.stop { border-left: 4px solid var(--bad); } .agent { border-left: 4px solid var(--run); }
.log { margin: 0 0 8px; }
a { color: var(--run); }
</style>
</head>
<body>
<header>
  <h1>${escape(view.plan || 'orchestrate')}</h1>
  <span class="badge ${escape(view.state)}">${STATE_LABEL[view.state]}</span>
  <div class="meta">
    <span>milestones ${done}/${view.milestones.length}</span>
    <span>agents ${view.agentsUsed}/${view.cap}</span>
    ${elapsed ? `<span>elapsed ${elapsed}</span>` : ''}
    <span>last event <span id="age" data-at="${escape(view.updatedAt)}">${view.updatedAt ? clock(view.updatedAt) : 'none'}</span></span>
  </div>
</header>
<div class="grid">
  <aside><section><h2>Milestones</h2>${milestoneList(view)}</section></aside>
  <main>
    ${stopPanel(view, link)}
    ${agentPanel(view, link, now)}
    <section><h2>Timeline</h2><ol class="timeline">${view.timeline.map(event => timelineRow(event, link)).join('\n')}</ol></section>
  </main>
</div>
<script>
const saved = sessionStorage.getItem('${SCROLL_KEY}')
if (saved) scrollTo(0, Number(saved))
const age = document.getElementById('age')
const tick = () => { if (age.dataset.at) age.textContent = Math.round((Date.now() - Date.parse(age.dataset.at)) / 1000) + 's ago' }
tick()
setInterval(tick, 1000)
${running ? `setTimeout(() => { sessionStorage.setItem('${SCROLL_KEY}', String(scrollY)); location.reload() }, ${REFRESH_MS})` : `sessionStorage.removeItem('${SCROLL_KEY}')`}
</script>
</body>
</html>
`
}
