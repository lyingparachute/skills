import assert from 'node:assert/strict'
import { test } from 'node:test'
import { renderLive } from './live.mjs'
import { project } from './view.mjs'

const WORKSPACE = '/repo/.orchestrate'
const START = Date.parse('2026-10-07T10:00:00Z')
const at = minutes => new Date(START + minutes * 60 * 1000).toISOString()
const milestones = [{ id: '1', title: 'First' }, { id: '2', title: 'Second' }]
const runStart = (minutes, completed = []) => ({
  at: at(minutes), type: 'run-start', fresh: !completed.length, plan: 'plans/p.md', cap: 10, agentsUsed: 0, completed, milestones, command: 'node run-plan.mjs --plan plans/p.md', idleMs: 15 * 60 * 1000,
})
const working = [
  runStart(0),
  { at: at(0), type: 'milestone-start', id: '1', title: 'First', index: 1, total: 2 },
  { at: at(1), type: 'agent-start', role: 'implementer', step: 'm1', agentsUsed: 1, cap: 10 },
  { at: at(1), type: 'attempt', role: 'implementer', harness: 'opencode', model: 'free', pid: 7, log: `${WORKSPACE}/agent-1.log` },
  { at: at(2), type: 'activity', role: 'implementer', text: 'edit src/a.ts' },
]
const page = (events, minutes) => renderLive(project(events), { workspace: WORKSPACE, now: new Date(START + minutes * 60 * 1000) })

test('a worker quiet for minutes gets a visible warning that names the stall limit', () => {
  const quiet = page(working, 7)
  assert.match(quiet, /class="quiet-clock warn" data-at="[^"]+">last output 5m00s ago/)
  assert.match(quiet, /<p class="note quiet-note">No output for a while\. On a free model this is usually a provider rate limit.* silent for 15m00s\./)
  assert.match(page(working, 2.5), /<p class="note quiet-note" hidden>/)
})

test('a retry shows on the working panel until the next attempt starts', () => {
  const retry = { at: at(3), type: 'retry', role: 'implementer', waitMs: 30000, error: 'opencode gave no output for 900000 ms' }
  assert.match(page([...working, retry], 3), /Retrying after opencode gave no output for 900000 ms/)
  const next = { at: at(4), type: 'attempt', role: 'implementer', harness: 'opencode', model: 'free', pid: 8, log: `${WORKSPACE}/agent-2.log` }
  assert.doesNotMatch(page([...working, retry, next], 4), /Retrying after/)
})

test('the timeline groups by milestone, keeps a resumed milestone in one group, and opens the latest', () => {
  const events = [
    ...working,
    { at: at(5), type: 'end', state: 'stopped', reason: 'cap', detail: 'cap' },
    runStart(6),
    { at: at(6), type: 'milestone-start', id: '1', title: 'First', index: 1, total: 2 },
    { at: at(7), type: 'milestone-done', id: '1', review: 'clean' },
    { at: at(7), type: 'milestone-start', id: '2', title: 'Second', index: 2, total: 2 },
  ]
  const html = page(events, 8)
  assert.equal(html.match(/data-key="g-1"/g).length, 1)
  assert.match(html, /<details class="group" data-key="g-1">[\s\S]*STOPPED cap[\s\S]*run started[\s\S]*milestone 1 complete/)
  assert.match(html, /<details class="group" data-key="g-2" open>/)
  assert.match(html, /<title>▶ M2 · p\.md<\/title>/)
})

test('a stopped run marks its milestone as stopped and offers the exact accept command', () => {
  const html = page([...working, { at: at(5), type: 'end', state: 'stopped', reason: 'human-gate', detail: 'check it' }], 6)
  assert.match(html, /<li class="m-stopped"><span class="mark">⚠<\/span><span class="id">1<\/span>/)
  assert.match(html, /Once checked, accept it:<\/p><div class="command"><code id="accept">node run-plan\.mjs --plan plans\/p\.md --accept 1<\/code>/)
  assert.doesNotMatch(html, /id="rerun"/)
  assert.match(html, /location\.reload\(\) \}, 10000\)/)
})

test('while the gate runs and no agent works, the page says so', () => {
  const gating = [...working, { at: at(3), type: 'agent-end', role: 'implementer', step: 'm1', ok: true, ms: 1 }, { at: at(3), type: 'gate-start', label: 'm1-r1' }]
  assert.match(page(gating, 5), /Running the gate: m1-r1<\/h2><p class="facts"><span>lint, type check and focused tests, for <span class="since" data-at="[^"]+">2m00s<\/span>/)
  assert.doesNotMatch(page([...gating, { at: at(6), type: 'gate', label: 'm1-r1', green: true, failed: [], file: 'g' }], 6), /Running the gate/)
})

test('the accept command matches the milestone id exactly, not as a prefix', () => {
  const events = working.map(e => (e.type === 'run-start' ? { ...e, command: 'node run-plan.mjs --accept 12' } : e))
  const html = page([...events, { at: at(5), type: 'end', state: 'stopped', reason: 'open-findings', detail: 'left' }], 6)
  assert.match(html, /<code id="accept">node run-plan\.mjs --accept 12 --accept 1<\/code>/)
})
