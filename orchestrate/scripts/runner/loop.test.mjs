import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, beforeEach, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { createJournal, readEvents } from './journal.mjs'
import { runPlan } from './loop.mjs'
import { createPlanReader, createRepo } from './repo.mjs'

const scriptsDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const PLAN = 'plan.md'
const planText = title => `# ${title}

## Scope and non-goals

Greeting files only.

## Milestones

### Milestone 1 - First file

Write one.txt.

### Milestone 2 - Second file

Write two.txt.
`

let root
let workspace
let printed
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()
const write = (file, text = file) => () => writeFileSync(join(root, file), text)
const report = (commitMessage, testCommands) => ({ status: 'done', summary: 'done', testCommands, concerns: [], commitMessage })
const finding = issue => ({ location: 'one.txt:1', issue, severity: 'MAJOR', fix: 'rewrite it' })
const clean = { standards: [], spec: [] }

const step = (role, value, effect = () => {}) => ({ role, value, effect })
const build = (file, message, tests = [`test -f ${file}`]) => step('implementer', report(message, tests), write(file))
const critic = (value = clean) => step('critic', value)
const reviewer = (value = clean) => step('reviewer', value)
const verdict = (verdict, index = 0) => step('triage', { verdicts: [{ index, verdict, reason: `${verdict} because one.txt:1 says so` }] })

function scriptedAgent(steps) {
  const calls = []
  const agent = async (role, prompt) => {
    const next = steps.shift()
    assert.ok(next, `unexpected ${role} call`)
    assert.equal(role, next.role, `call ${calls.length + 1}`)
    calls.push({ role, prompt })
    next.effect(prompt)
    if (next.value instanceof Error) throw next.value
    return next.value.failure ? { ok: false, error: next.value.failure, kind: next.value.kind ?? 'process' } : { ok: true, value: next.value }
  }
  return { agent, calls, left: steps }
}

async function run(steps, options = {}) {
  const scripted = scriptedAgent(steps)
  const status = await runPlan({
    planReader: createPlanReader(options.plan ?? PLAN, scriptsDir, root),
    repo: createRepo(root, workspace),
    journal: createJournal(workspace, { print: line => printed.push(line) }),
    agent: scripted.agent,
    cap: 50,
    gates: ['true'],
    humanGates: [],
    accepted: [],
    reviewDocs: false,
    ...options,
  })
  return { status, ...scripted }
}

const ledger = () => readFileSync(join(workspace, 'progress.md'), 'utf8')
const subjects = () => git('log', '--format=%s').split('\n')
const pathOf = (prompt, pattern) => prompt.match(new RegExp(`\\S+${pattern}`))[0]
const roles = calls => calls.map(call => call.role)
const stateOnDisk = () => JSON.parse(readFileSync(join(workspace, 'run-state.json'), 'utf8'))

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'run-plan-test-'))
  git('init', '--quiet')
  git('config', 'user.email', 'test@example.com')
  git('config', 'user.name', 'Test')
  writeFileSync(join(root, PLAN), planText('Plan'))
  git('add', PLAN)
  git('commit', '--quiet', '-m', 'plan')
  workspace = execFileSync(join(scriptsDir, 'workspace'), { cwd: root, encoding: 'utf8' }).trim()
  printed = []
})

afterEach(() => rmSync(root, { recursive: true, force: true }))

test('clean milestones commit once each, then the close-out review runs', async () => {
  const { status, left } = await run([
    build('one.txt', 'feat: one'), critic(),
    build('two.txt', 'feat: two'), critic(),
    reviewer(),
  ])
  assert.deepEqual(status, { state: 'completed' })
  assert.equal(left.length, 0)
  assert.deepEqual(subjects(), ['feat: two', 'feat: one', 'plan'])
  assert.match(ledger(), /plan\.md Milestone 1: complete \(commits \w{7}\.\.\w{7}, review clean, gate green, agents used 2\)/)
  assert.match(ledger(), /plan\.md close-out: whole-branch review done/)
})

test('a fix-now finding goes to one fixer, then a second review round passes', async () => {
  const { status, calls } = await run([
    build('one.txt', 'feat: one'),
    critic({ standards: [finding('bad name')], spec: [] }), verdict('fix-now'),
    step('fixer', report('fix: name', ['test -f fixed.txt']), write('fixed.txt')),
    critic(),
    build('two.txt', 'feat: two'), critic(),
    reviewer(),
  ])
  assert.equal(status.state, 'completed')
  assert.match(calls[3].prompt, /fixes-m1-r1\.json/)
  assert.deepEqual(git('show', '--name-only', '--format=', 'HEAD~1').split('\n').sort(), ['fixed.txt', 'one.txt'])
  assert.match(readFileSync(join(workspace, 'gate-m1-r2.log'), 'utf8'), /\$ test -f fixed\.txt\nexit 0/)
})

test('a rejected finding is logged as a decision row and not fixed', async () => {
  const { status } = await run([
    build('one.txt', 'feat: one'),
    critic({ standards: [], spec: [finding('wrong | thing')] }), verdict('reject'),
    build('two.txt', 'feat: two'), critic(),
    reviewer(),
  ])
  assert.equal(status.state, 'completed')
  assert.match(ledger(), /\| plan\.md#1 \| reject spec finding: wrong \\\| thing \| reject because .* \| \S+findings-m1-r1\.json#0 \| dropped \|/)
})

test('an owner-call finding is logged for the plan owner and the run goes on unfixed', async () => {
  const { status, calls } = await run([
    build('one.txt', 'feat: one'), critic({ standards: [], spec: [finding('plan demands a global')] }), verdict('owner-call'),
    build('two.txt', 'feat: two'), critic(),
    reviewer(),
  ])
  assert.equal(status.state, 'completed')
  assert.ok(!roles(calls).includes('fixer'))
  assert.match(ledger(), /owner-call spec finding: plan demands a global .* \| owner-call \|/)
})

test('a triage reply that skips a finding stops the run', async () => {
  const { status } = await run([build('one.txt', 'feat: one'), critic({ standards: [finding('a'), finding('b')], spec: [] }), verdict('reject', 1)])
  assert.equal(status.reason, 'agent-failed')
  assert.match(status.detail, /exactly one verdict per finding .* got indexes 1/)
})

test('a rerun after a failed implementer resumes its partial work', async () => {
  const first = await run([step('implementer', { failure: 'rate limited' }, write('one.txt', 'half'))])
  assert.deepEqual(first.status, { state: 'stopped', reason: 'agent-failed', detail: 'implementer: rate limited' })
  const second = await run([build('one.txt', 'feat: one'), critic(), build('two.txt', 'feat: two'), critic(), reviewer()])
  assert.equal(second.status.state, 'completed')
  assert.match(second.calls[0].prompt, /An earlier implementer stopped partway/)
})

test('a worker that stays rate-limited stops the run as rate-limited, ready for a rerun', async () => {
  const { status } = await run([step('implementer', { failure: 'Rate limit exceeded. (still failing after 5 retries)', kind: 'transient' })])
  assert.equal(status.reason, 'rate-limited')
})

test('a {files} gate runs only on the changed files and blocks on old errors in them', async () => {
  writeFileSync(join(root, 'one.txt'), 'lint-error')
  writeFileSync(join(root, 'elsewhere.txt'), 'lint-error')
  git('add', '-A')
  git('commit', '--quiet', '-m', 'old lint debt')
  const scoped = '! grep -qs lint-error {files}'
  const { status, calls } = await run([
    step('implementer', report('feat: one', ['test -f one.txt']), write('one.txt', 'lint-error, edited')), critic(),
    step('fixer', report('fix: lint', ['test -f one.txt']), write('one.txt', 'clean')), critic(),
    build('two.txt', 'feat: two'), critic(),
    reviewer(),
  ], { gates: [scoped] })
  assert.equal(status.state, 'completed')
  assert.match(readFileSync(pathOf(calls[2].prompt, 'fixes-m1-r1\\.json'), 'utf8'), /gate red: ! grep -qs lint-error \{files\}/)
  const gateLog = readFileSync(join(workspace, 'gate-m2-r1.log'), 'utf8')
  assert.match(gateLog, /\$ ! grep -qs lint-error '\.\/two\.txt'\nexit 0/)
  assert.doesNotMatch(gateLog, /elsewhere/)
})

test('a {files} gate gets odd file names intact and logs a skip when nothing changed', async () => {
  const odd = ["-dash.txt", "café's.txt"]
  const { status } = await run([
    step('implementer', report('feat: odd', ['true']), () => odd.forEach(name => writeFileSync(join(root, name), 'x'))), critic(),
    build('two.txt', 'feat: two'), critic(),
    reviewer(),
  ], { gates: ['for f in {files}; do test -f "$f" || exit 1; done'] })
  assert.equal(status.state, 'completed')
  assert.match(readFileSync(join(workspace, 'gate-m1-r1.log'), 'utf8'), /for f in '\.\/-dash\.txt' '\.\/café'\\''s\.txt'; do .*\nexit 0/)
  assert.match(readFileSync(join(workspace, 'gate-m1-baseline.log'), 'utf8'), /\(skipped: no changed files\)/)
})

test('a state file from an older runner still loads and resumes', async () => {
  await run([build('one.txt', 'feat: one')], { cap: 1 })
  const { knownRed, ...older } = stateOnDisk()
  const { redBefore, ...olderWork } = older.inProgress
  writeFileSync(join(workspace, 'run-state.json'), JSON.stringify({ ...older, inProgress: olderWork }))
  const resumed = await run([critic(), build('two.txt', 'feat: two'), critic(), reviewer()])
  assert.equal(resumed.status.state, 'completed')
})

test('--human-gate with an id the plan does not have is refused', async () => {
  const { status } = await run([], { humanGates: ['9'] })
  assert.equal(status.reason, 'unknown-milestone')
})

test('rerunning the same command with --accept for a milestone already done is fine', async () => {
  await run([build('one.txt', 'feat: one'), critic()], { humanGates: ['1'] })
  const options = { humanGates: ['1'], accepted: ['1'], cap: 3 }
  assert.equal((await run([build('two.txt', 'feat: two')], options)).status.reason, 'cap')
  assert.equal((await run([critic(), reviewer()], { ...options, cap: 6 })).status.state, 'completed')
})

test('a milestone committed by hand is recorded only through --accept', async () => {
  await run([build('one.txt', 'feat: one'), critic()], { humanGates: ['1'] })
  git('add', '-A')
  git('commit', '--quiet', '-m', 'feat: one, by hand')
  const blocked = await run([], { humanGates: ['1'] })
  assert.equal(blocked.status.reason, 'blocked')
  assert.match(blocked.status.detail, /commits the runner did not make.*--accept 1/)
  const accepted = await run([build('two.txt', 'feat: two'), critic(), reviewer()], { humanGates: ['1'], accepted: ['1'] })
  assert.equal(accepted.status.state, 'completed')
  assert.deepEqual(subjects(), ['feat: two', 'feat: one, by hand', 'plan'])
})

test('findings left after two rounds stop the run; a rerun resumes the review on the same tree', async () => {
  const stuck = () => critic({ standards: [finding('still bad')], spec: [] })
  const first = await run([build('one.txt', 'feat: one'), stuck(), verdict('fix-now'), step('fixer', report('fix: try', [])), stuck(), verdict('fix-now')])
  assert.equal(first.status.reason, 'open-findings')
  assert.match(first.status.detail, /fixes-m1-r2\.json/)
  assert.deepEqual(subjects(), ['plan'])

  const resumed = await run([critic(), build('two.txt', 'feat: two'), critic(), reviewer()])
  assert.equal(resumed.status.state, 'completed')
  assert.deepEqual(roles(resumed.calls), ['critic', 'implementer', 'critic', 'reviewer'])
  assert.deepEqual(subjects(), ['feat: two', 'feat: one', 'plan'])
})

test('--accept commits a stopped milestone without review, and the next code review covers it', async () => {
  const first = await run([build('one.txt', 'feat: one')], { cap: 1 })
  assert.equal(first.status.reason, 'cap')
  const second = await run([build('two.txt', 'feat: two'), critic(), reviewer()], { accepted: ['1'] })
  assert.equal(second.status.state, 'completed')
  assert.match(ledger(), /Milestone 1: complete .*review accepted/)
  assert.match(ledger(), /Milestone 2: its review covered the unreviewed milestones since \w{7}/)
  assert.match(readFileSync(pathOf(second.calls[1].prompt, 'review-m2-r1\\.diff'), 'utf8'), /one\.txt/)
})

const LINT = '! grep -qs lint-error one.txt two.txt'

test('a gate command this change turned red becomes a finding for the fixer', async () => {
  const { status, calls } = await run([
    step('implementer', report('feat: one', ['test -f one.txt']), write('one.txt', 'lint-error')), critic(),
    step('fixer', report('fix: lint', ['test -f one.txt']), write('one.txt', 'clean')), critic(),
    build('two.txt', 'feat: two'), critic(),
    reviewer(),
  ], { gates: [LINT] })
  assert.equal(status.state, 'completed')
  assert.ok(!roles(calls).includes('triage'))
  assert.match(readFileSync(pathOf(calls[2].prompt, 'fixes-m1-r1\\.json'), 'utf8'), /gate red: ! grep -qs lint-error/)
})

test('a gate command that was red before the milestone is advisory and never blocks', async () => {
  writeFileSync(join(root, 'two.txt'), 'lint-error')
  git('add', 'two.txt')
  git('commit', '--quiet', '-m', 'old lint debt')
  const { status, calls } = await run([
    build('one.txt', 'feat: one'), critic(),
    step('implementer', report('feat: two', ['test -f two.txt']), write('two.txt', 'lint-error, still')), critic(),
    reviewer(),
  ], { gates: [LINT] })
  assert.equal(status.state, 'completed')
  assert.ok(!roles(calls).includes('fixer'))
  const gateLog = readFileSync(pathOf(calls[1].prompt, 'gate-m1-r1\\.log'), 'utf8')
  assert.match(gateLog, /\(advisory: red before this change\)\nexit 1/)
  assert.match(calls[1].prompt, /advisory there was already red before this change/)
})

test('an implementer that names no test gets a finding for the fixer', async () => {
  const { calls } = await run([
    build('one.txt', 'feat: one', []), critic(),
    step('fixer', report('test: one', ['test -f one.txt'])), critic(),
    build('two.txt', 'feat: two'), critic(),
    reviewer(),
  ])
  assert.match(readFileSync(pathOf(calls[2].prompt, 'fixes-m1-r1\\.json'), 'utf8'), /no focused test command proves this change/)
})

test('files the gate writes are committed with the milestone', async () => {
  const { status } = await run([
    build('one.txt', 'feat: one'), critic(),
    build('two.txt', 'feat: two'), critic(),
    reviewer(),
  ], { gates: ['date > gate-output.txt'] })
  assert.equal(status.state, 'completed')
  assert.equal(git('status', '--porcelain'), '')
})

test('the run stops before a dispatch that would pass the cap, and a rerun goes on from there', async () => {
  const first = await run([build('one.txt', 'feat: one')], { cap: 1 })
  assert.deepEqual(first.status, { state: 'stopped', reason: 'cap', detail: 'the next critic would exceed the agent cap of 1' })
  assert.equal(stateOnDisk().agentsUsed, 1)
  const second = await run([critic(), build('two.txt', 'feat: two'), critic(), reviewer()], { cap: 5 })
  assert.equal(second.status.state, 'completed')
  assert.deepEqual(roles(second.calls), ['critic', 'implementer', 'critic', 'reviewer'])
})

test('a docs-only milestone skips the critic and joins the next review package', async () => {
  const { status, calls } = await run([
    build('notes.md', 'docs: notes'),
    build('two.txt', 'feat: two'), critic(),
    reviewer(),
  ])
  assert.equal(status.state, 'completed')
  const review = readFileSync(pathOf(calls[2].prompt, 'review-m2-r1\\.diff'), 'utf8')
  assert.match(review, /notes\.md/)
  assert.match(review, /two\.txt/)
})

test('--review-docs sends a docs-only milestone to the critic', async () => {
  const { calls } = await run([build('notes.md', 'docs: notes'), critic(), build('two.txt', 'feat: two'), critic(), reviewer()], { reviewDocs: true })
  assert.deepEqual(roles(calls), ['implementer', 'critic', 'implementer', 'critic', 'reviewer'])
})

test('a human-gated milestone stops after review and commits on --accept', async () => {
  const first = await run([build('one.txt', 'feat: one'), critic()], { humanGates: ['1'] })
  assert.equal(first.status.reason, 'human-gate')
  assert.equal((await run([], { humanGates: ['1'] })).status.reason, 'human-gate')
  const second = await run([build('two.txt', 'feat: two'), critic(), reviewer()], { humanGates: ['1'], accepted: ['1'] })
  assert.equal(second.status.state, 'completed')
  assert.deepEqual(subjects(), ['feat: two', 'feat: one', 'plan'])
  assert.match(ledger(), /Milestone 1: complete .*review human-checked/)
})

test('a commit that landed before the state was saved is recorded, not rebuilt', async () => {
  await run([build('one.txt', 'feat: one'), critic()], { humanGates: ['1'] })
  const state = stateOnDisk()
  writeFileSync(join(workspace, 'run-state.json'), JSON.stringify({ ...state, inProgress: { ...state.inProgress, committing: true } }))
  git('add', '-A')
  git('commit', '--quiet', '-m', 'feat: one')
  const { status, calls } = await run([build('two.txt', 'feat: two'), critic(), reviewer()])
  assert.equal(status.state, 'completed')
  assert.deepEqual(roles(calls), ['implementer', 'critic', 'reviewer'])
  assert.deepEqual(subjects(), ['feat: two', 'feat: one', 'plan'])
})

test('close-out findings left after two rounds resolve with --accept close-out', async () => {
  const stuck = () => reviewer({ standards: [], spec: [finding('branch-wide smell')] })
  const first = await run([
    build('one.txt', 'feat: one'), critic(), build('two.txt', 'feat: two'), critic(),
    stuck(), verdict('fix-now'), step('fixer', report('fix: smell', []), write('three.txt')), stuck(), verdict('fix-now'),
  ])
  assert.equal(first.status.reason, 'open-findings')
  const second = await run([], { accepted: ['close-out'] })
  assert.equal(second.status.state, 'completed')
  assert.equal(subjects()[0], 'fix: close-out review findings')
})

test('a blocked implementer stops the run with its reason', async () => {
  const blocked = { ...report('unused', []), status: 'blocked', summary: 'needs the auth plan first' }
  const { status } = await run([step('implementer', blocked)])
  assert.deepEqual(status, { state: 'stopped', reason: 'blocked', detail: 'implementer: needs the auth plan first' })
})

test('an unexpected error is saved as a stop instead of leaving the run marked running', async () => {
  const { status } = await run([step('implementer', new Error('disk full'))])
  assert.deepEqual(status, { state: 'stopped', reason: 'runner-error', detail: 'disk full' })
  assert.equal(stateOnDisk().status.reason, 'runner-error')
})

test('--accept for a milestone that is not in progress is refused', async () => {
  const { status } = await run([], { accepted: ['2'] })
  assert.deepEqual(status, { state: 'stopped', reason: 'bad-accept', detail: 'nothing in progress to accept for: 2' })
})

test('a finished plan gives way to the next one; an unfinished one does not', async () => {
  writeFileSync(join(root, 'next.md'), planText('Next'))
  git('add', 'next.md')
  git('commit', '--quiet', '-m', 'next plan')
  await run([build('one.txt', 'feat: one')], { cap: 1 })
  assert.equal((await run([], { plan: 'next.md' })).status.reason, 'plan-mismatch')
  await run([critic(), build('two.txt', 'feat: two'), critic(), reviewer()])
  const next = await run([build('a.txt', 'feat: a'), critic(), build('b.txt', 'feat: b'), critic(), reviewer()], { plan: 'next.md' })
  assert.equal(next.status.state, 'completed')
})

const livePage = () => readFileSync(join(workspace, 'live.html'), 'utf8')
const eventTypes = () => readEvents(workspace).map(event => event.type)

test('the run prints a readable timeline and records the same steps as events', async () => {
  const { status } = await run([
    build('one.txt', 'feat: one'),
    critic({ standards: [{ ...finding('nit'), severity: 'NIT' }, finding('bad name')], spec: [{ ...finding('scope'), severity: 'BLOCKER' }] }),
    step('triage', { verdicts: [0, 1, 2].map(index => ({ index, verdict: index ? 'fix-now' : 'reject', reason: 'see one.txt:1' })) }),
    step('fixer', report('fix: name', ['test -f one.txt'])), critic(),
    build('two.txt', 'feat: two'), critic(),
    reviewer(),
  ])
  assert.equal(status.state, 'completed')
  const log = printed.join('\n')
  for (const line of [
    /^\d\d:\d\d:\d\d {2}run started: plan\.md, 0\/2 milestones done, agents 0\/50$/m,
    /milestone 1 \(1\/2\): First file$/m,
    /m1-baseline: gate green$/m,
    /m1 implementer started \(agent 1\/50\)$/m,
    /m1-r1 critic found 1 BLOCKER, 1 MAJOR, 1 NIT$/m,
    /m1-r1 triage: 1 reject, 2 fix-now$/m,
    /m1-r1 2 findings to fix, see \S+fixes-m1-r1\.json$/m,
    /m1-r2 critic found nothing$/m,
    /commit \w{7} feat: one$/m,
    /milestone 1 complete \(review clean\)$/m,
    /close-out: whole-branch review$/m,
    /COMPLETED$/m,
  ]) assert.match(log, line)
  assert.equal(eventTypes().at(-1), 'end')
  assert.equal(readEvents(workspace).length, printed.length)
})

test('the live page refreshes while running and shows the working agent', async () => {
  let duringRun = ''
  await run([
    step('implementer', report('feat: one', ['test -f one.txt']), () => { write('one.txt')(); duringRun = livePage() }),
    critic(), build('two.txt', 'feat: two'), critic(), reviewer(),
  ])
  assert.match(duringRun, /class="badge running"/)
  assert.match(duringRun, /Working now: m1 implementer/)
  assert.match(duringRun, /location\.reload\(\)/)
  assert.match(duringRun, /<li class="m-active">.*First file/)
  const finished = livePage()
  assert.match(finished, /class="badge completed"/)
  assert.doesNotMatch(finished, /location\.reload\(\)/)
  assert.doesNotMatch(finished, /Working now/)
})

test('a stop shows on the live page with links to the files it names', async () => {
  const stuck = () => critic({ standards: [finding('still bad')], spec: [] })
  await run([build('one.txt', 'feat: one'), stuck(), verdict('fix-now'), step('fixer', report('fix: try', [])), stuck(), verdict('fix-now')])
  const page = livePage()
  assert.match(page, /Stopped: open-findings/)
  assert.match(page, /<a href="fixes-m1-r2\.json">fixes-m1-r2\.json<\/a>/)
  assert.match(printed.at(-1), /STOPPED open-findings: plan\.md#1: 1 finding\(s\) left/)
})

test('plan text on the live page is escaped', async () => {
  writeFileSync(join(root, PLAN), planText('Plan').replace('First file', 'Use <script>alert(1)</script> & co'))
  git('commit', '--quiet', '-am', 'odd title')
  await run([build('one.txt', 'feat: one')], { cap: 1 })
  assert.match(livePage(), /Use &lt;script&gt;alert\(1\)&lt;\/script&gt; &amp; co/)
  assert.doesNotMatch(livePage(), /<script>alert/)
})

test('a rerun resumes the same timeline; the next plan starts a new one', async () => {
  writeFileSync(join(root, 'next.md'), planText('Next'))
  git('add', 'next.md')
  git('commit', '--quiet', '-m', 'next plan')
  await run([build('one.txt', 'feat: one')], { cap: 1 })
  await run([critic(), build('two.txt', 'feat: two'), critic(), reviewer()])
  const starts = readEvents(workspace).filter(event => event.type === 'run-start')
  assert.deepEqual(starts.map(event => event.fresh), [true, false])
  await run([build('a.txt', 'feat: a'), critic(), build('b.txt', 'feat: b'), critic(), reviewer()], { plan: 'next.md' })
  const [first] = readEvents(workspace)
  assert.equal(first.plan, 'next.md')
  assert.equal(first.fresh, true)
})
