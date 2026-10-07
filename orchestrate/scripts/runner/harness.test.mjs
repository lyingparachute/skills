import assert from 'node:assert/strict'
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, test } from 'node:test'
import { schemaErrors, TRIAGE } from './contract.mjs'
import { createAgent } from './harness.mjs'

const ANSWER = { type: 'object', properties: { answer: { type: 'integer' } }, required: ['answer'], additionalProperties: false }
const CLAUDE_REPLY = { type: 'result', subtype: 'success', is_error: false, result: '{"answer":5}', structured_output: { answer: 5 } }
const GROK_REPLY = { type: 'end', stopReason: 'end_turn', structuredOutput: { answer: 5 } }
const opencodeEvents = text => [
  { type: 'step_start', sessionID: 'ses_1', part: { type: 'step-start' } },
  { type: 'text', sessionID: 'ses_1', part: { type: 'text', text } },
  { type: 'step_finish', sessionID: 'ses_1', part: { type: 'step-finish', reason: 'stop' } },
].map(event => JSON.stringify(event)).join('\n')

const CALL_MARK = '--- call ---'
let dir
let savedPath
let replies = 0

function fakeCli(name, body) {
  const file = join(dir, 'bin', name)
  writeFileSync(file, `#!/bin/sh\nprintf '%s\\n%s\\n' "${CALL_MARK}" "$*" >> "${dir}/${name}.args"\n${body}\n`)
  chmodSync(file, 0o755)
}

function printing(text) {
  const file = join(dir, `reply-${replies++}.txt`)
  writeFileSync(file, `${text}\n`)
  return `cat '${file}'`
}
let waits = []
const agentFor = (harness, options = {}) => createAgent({
  harness, models: { critic: 'model-x' }, cwd: dir, workspace: dir, sleep: async ms => { waits.push(ms) }, ...options,
})
const ask = (harness, timeoutMs, role = 'critic') => agentFor(harness, { timeoutMs, models: { [role]: 'model-x' } })(role, 'What is 2+3?', ANSWER)
const rateLimitEvent = JSON.stringify({ type: 'error', sessionID: 'ses_1', error: { name: 'APIError', data: { message: 'Rate limit exceeded.', statusCode: 429, isRetryable: true } } })
const failure = reply => ({ ...reply, error: reply.error.replace(/, log: \S+$/, '') })
const callsTo = name => readFileSync(join(dir, `${name}.args`), 'utf8').split(`${CALL_MARK}\n`).slice(1)

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'harness-test-'))
  mkdirSync(join(dir, 'bin'))
  waits = []
  savedPath = process.env.PATH
  process.env.PATH = `${join(dir, 'bin')}:${savedPath}`
})

afterEach(() => {
  process.env.PATH = savedPath
  rmSync(dir, { recursive: true, force: true })
})

test('claude: structured_output is the reply, with the model and schema passed', async () => {
  fakeCli('claude', printing(JSON.stringify(CLAUDE_REPLY)))
  assert.deepEqual(await ask('claude'), { ok: true, value: { answer: 5 } })
  assert.match(callsTo('claude')[0], /--output-format stream-json --verbose --json-schema .*"answer".* --model model-x --dangerously-skip-permissions/)
})

test('claude: an error result fails with its message', async () => {
  fakeCli('claude', printing(JSON.stringify({ ...CLAUDE_REPLY, is_error: true, result: 'rate limited' })))
  assert.deepEqual(failure(await ask('claude')), { ok: false, error: 'rate limited', kind: 'process' })
})

test('grok: structuredOutput is the reply', async () => {
  fakeCli('grok', printing(JSON.stringify(GROK_REPLY)))
  assert.deepEqual(await ask('grok'), { ok: true, value: { answer: 5 } })
  assert.match(callsTo('grok')[0], /--output-format streaming-json --json-schema .* -m model-x --always-approve/)
})

test('grok: an error event fails with its message', async () => {
  fakeCli('grok', `${printing(JSON.stringify({ type: 'error', message: "Couldn't set model 'x': unknown model id" }))}; exit 1`)
  assert.deepEqual(failure(await ask('grok')), { ok: false, error: "grok exited 1: Couldn't set model 'x': unknown model id", kind: 'process' })
})

test('codex: the -o file is the reply', async () => {
  fakeCli('codex', `while [ "$1" != "-o" ]; do shift; done; echo '{"answer":5}' > "$2"`)
  assert.deepEqual(await ask('codex'), { ok: true, value: { answer: 5 } })
  assert.match(callsTo('codex')[0], /^exec --json --output-schema \S+\.schema\.json -o \S+ -m model-x --sandbox workspace-write/)
})

test('opencode: JSON inside a fenced reply is extracted', async () => {
  fakeCli('opencode', printing(opencodeEvents('Here:\n```json\n{"answer": 5}\n```')))
  assert.deepEqual(await ask('opencode'), { ok: true, value: { answer: 5 } })
  assert.match(callsTo('opencode')[0], /^run --format json --auto -m model-x What is 2\+3\?/)
})

test('opencode: a reply that breaks the schema gets one repair turn in the same session', async () => {
  fakeCli('opencode', `if [ -f "${dir}/tried" ]; then ${printing(opencodeEvents('{"answer": 5}'))}; else touch "${dir}/tried"; ${printing(opencodeEvents('{"answer": "five"}'))}; fi`)
  assert.deepEqual(await ask('opencode'), { ok: true, value: { answer: 5 } })
  const calls = callsTo('opencode')
  assert.equal(calls.length, 2)
  assert.match(calls[1], /-s ses_1 Your last reply was rejected: reply breaks the schema: \$\.answer: expected integer/)
})

test('opencode: a second bad reply fails instead of looping', async () => {
  fakeCli('opencode', printing(opencodeEvents('no json here')))
  assert.deepEqual(failure(await ask('opencode')), { ok: false, error: 'no JSON object in the reply', kind: 'reply' })
  assert.equal(callsTo('opencode').length, 2)
})

test('opencode: a provider error fails with its message and gets no repair turn', async () => {
  const rateLimited = JSON.stringify({ type: 'error', sessionID: 'ses_1', error: { name: 'APIError', data: { message: 'Rate limit exceeded.' } } })
  fakeCli('opencode', `${printing(rateLimited)}; exit 1`)
  assert.deepEqual(failure(await ask('opencode')), { ok: false, error: 'opencode exited 1: Rate limit exceeded.', kind: 'process' })
  assert.equal(callsTo('opencode').length, 1)
})

test('opencode: a non-JSON line in the event stream is skipped', async () => {
  fakeCli('opencode', printing(`warning: plugin slow\n${opencodeEvents('{"answer": 5}')}`))
  assert.deepEqual(await ask('opencode'), { ok: true, value: { answer: 5 } })
})

test('codex: an exit without the -o file fails instead of throwing', async () => {
  fakeCli('codex', 'true')
  assert.deepEqual(failure(await ask('codex')), { ok: false, error: 'codex wrote no final message', kind: 'process' })
})

test('a hung worker and what it started are killed at the timeout', async () => {
  fakeCli('grok', 'sleep 30 & sleep 30')
  const started = Date.now()
  assert.deepEqual(failure(await ask('grok', 200)), { ok: false, error: 'grok timed out after 200 ms', kind: 'process' })
  assert.ok(Date.now() - started < 5000)
})

test('opencode: a rate limit is retried with growing waits, and the retry is told to continue', async () => {
  fakeCli('opencode', `if [ -f "${dir}/limited" ]; then ${printing(opencodeEvents('{"answer": 5}'))}; else touch "${dir}/limited"; ${printing(rateLimitEvent)}; exit 1; fi`)
  assert.deepEqual(await ask('opencode', undefined, 'implementer'), { ok: true, value: { answer: 5 } })
  assert.deepEqual(waits, [30000])
  assert.match(callsTo('opencode')[1], /cut off by a provider error/)
})

test('a reviewing role retries with its prompt unchanged', async () => {
  fakeCli('opencode', `if [ -f "${dir}/limited" ]; then ${printing(opencodeEvents('{"answer": 5}'))}; else touch "${dir}/limited"; ${printing(rateLimitEvent)}; exit 1; fi`)
  assert.deepEqual(await ask('opencode'), { ok: true, value: { answer: 5 } })
  assert.doesNotMatch(callsTo('opencode')[1], /cut off by a provider error/)
})

const stallOnce = (harness, reply) => {
  fakeCli(harness, `if [ -f "${dir}/stalled" ]; then ${printing(reply)}; else sleep 30; fi`)
  const marked = async ms => { waits.push(ms); writeFileSync(join(dir, 'stalled'), '') }
  return agentFor(harness, { idleMs: 3000, sleep: marked })('critic', 'go', ANSWER)
}

test('claude: a silent worker is killed as a stall and retried', async () => {
  assert.deepEqual(await stallOnce('claude', JSON.stringify(CLAUDE_REPLY)), { ok: true, value: { answer: 5 } })
  assert.deepEqual(waits, [30000])
})

const streamOf = (...events) => events.map(event => JSON.stringify(event)).join('\n')
const activityOf = async (harness, stream, body = printing(stream)) => {
  const seen = []
  fakeCli(harness, body)
  const reply = await agentFor(harness, { onEvent: event => seen.push(event) })('critic', 'go', ANSWER)
  assert.equal(reply.ok, true, reply.error)
  return seen
}
const texts = seen => seen.filter(event => event.type === 'activity').map(event => event.text)

test('claude: tool calls and text in the stream become activity, after an attempt event with the log', async () => {
  const seen = await activityOf('claude', streamOf(
    { type: 'system', subtype: 'init' },
    { type: 'assistant', message: { content: [{ type: 'text', text: '\nReading the brief.\nMore.' }, { type: 'tool_use', name: 'Bash', input: { command: 'npm test -- retry' } }, { type: 'tool_use', name: 'StructuredOutput', input: { answer: 5 } }] } },
    CLAUDE_REPLY,
  ))
  assert.deepEqual(texts(seen), ['Reading the brief.', 'Bash npm test -- retry'])
  const [attempt] = seen
  assert.equal(attempt.type, 'attempt')
  assert.equal(attempt.harness, 'claude')
  assert.ok(attempt.pid > 0)
  assert.match(attempt.log, /agent-\d+-\d+-critic\.log$/)
})

test('grok, codex and opencode streams become activity too', async () => {
  assert.deepEqual(texts(await activityOf('grok', streamOf(
    { type: 'tool_call', toolName: 'run_terminal_command', rawInput: { command: 'ls src' } },
    { type: 'text', data: '{"' },
    GROK_REPLY,
  ))), ['run_terminal_command ls src'])
  const codexEvents = streamOf(
    { type: 'item.started', item: { type: 'command_execution', command: 'npm test' } },
    { type: 'item.completed', item: { type: 'command_execution', command: 'npm test' } },
    { type: 'item.completed', item: { type: 'file_change', changes: [{ path: 'src/a.ts' }] } },
  )
  assert.deepEqual(texts(await activityOf('codex', codexEvents, `${printing(codexEvents)}; while [ "$1" != "-o" ]; do shift; done; echo '{"answer":5}' > "$2"`)), ['$ npm test', 'edit src/a.ts'])
  const opencodeTool = JSON.stringify({ type: 'tool_use', part: { tool: 'read', state: { input: { filePath: 'a.ts' } } } })
  assert.deepEqual(texts(await activityOf('opencode', `${opencodeTool}\n${opencodeEvents('{"answer": 5}')}`)), ['read a.ts', '{"answer": 5}'])
})

test('a retry is reported with its wait and cause', async () => {
  const seen = []
  fakeCli('opencode', `if [ -f "${dir}/limited" ]; then ${printing(opencodeEvents('{"answer": 5}'))}; else touch "${dir}/limited"; ${printing(rateLimitEvent)}; exit 1; fi`)
  await agentFor('opencode', { onEvent: event => seen.push(event) })('critic', 'go', ANSWER)
  const retry = seen.find(event => event.type === 'retry')
  assert.equal(retry.waitMs, 30000)
  assert.match(retry.error, /Rate limit exceeded/)
})

test('an aborted signal kills the worker and what it started', async () => {
  fakeCli('grok', 'sleep 30 & sleep 30')
  const interrupt = new AbortController()
  setTimeout(() => interrupt.abort(), 200)
  const started = Date.now()
  const reply = await agentFor('grok', { signal: interrupt.signal })('critic', 'go', ANSWER)
  assert.equal(reply.ok, false)
  assert.match(reply.error, /grok was killed: the runner was interrupted/)
  assert.ok(Date.now() - started < 5000)
})

test('opencode: a rate limit that never clears fails after five retries', async () => {
  fakeCli('opencode', `${printing(rateLimitEvent)}; exit 1`)
  const reply = failure(await ask('opencode'))
  assert.equal(reply.kind, 'transient')
  assert.match(reply.error, /Rate limit exceeded\..*still failing after 5 retries/)
  assert.deepEqual(waits, [30000, 60000, 120000, 240000, 480000])
  assert.equal(callsTo('opencode').length, 6)
})

test('claude: an overloaded API error is retried', async () => {
  fakeCli('claude', `if [ -f "${dir}/busy" ]; then ${printing(JSON.stringify(CLAUDE_REPLY))}; else touch "${dir}/busy"; ${printing(JSON.stringify({ ...CLAUDE_REPLY, is_error: true, result: 'Overloaded', api_error_status: 529 }))}; fi`)
  assert.deepEqual(await ask('claude'), { ok: true, value: { answer: 5 } })
  assert.deepEqual(waits, [30000])
})

test('--effort reaches each harness under its own flag', async () => {
  const efforts = { critic: 'xhigh' }
  fakeCli('opencode', printing(opencodeEvents('{"answer": 5}')))
  fakeCli('claude', printing(JSON.stringify(CLAUDE_REPLY)))
  fakeCli('grok', printing(JSON.stringify(GROK_REPLY)))
  fakeCli('codex', `while [ "$1" != "-o" ]; do shift; done; echo '{"answer":5}' > "$2"`)
  for (const harness of ['opencode', 'claude', 'grok', 'codex']) await agentFor(harness, { efforts })('critic', 'go', ANSWER)
  assert.match(callsTo('opencode')[0], /-m model-x --variant xhigh /)
  assert.match(callsTo('claude')[0], /--model model-x --effort xhigh /)
  assert.match(callsTo('grok')[0], /-m model-x --reasoning-effort xhigh /)
  assert.match(callsTo('codex')[0], /-m model-x -c model_reasoning_effort=xhigh /)
})

test('a worker that goes silent is killed and retried as a stall', async () => {
  assert.deepEqual(await stallOnce('opencode', opencodeEvents('{"answer": 5}')), { ok: true, value: { answer: 5 } })
  assert.deepEqual(waits, [30000])
})

test('a non-zero exit fails and names the log file', async () => {
  fakeCli('grok', 'echo boom >&2; exit 7')
  const reply = await ask('grok')
  assert.equal(reply.ok, false)
  const log = reply.error.match(/log: (\S+)/)[1]
  assert.match(readFileSync(log, 'utf8'), /boom/)
})

test('schemaErrors reports every broken field by path', () => {
  const bad = { verdicts: [{ index: 1.5, verdict: 'maybe', extra: true }] }
  assert.deepEqual(schemaErrors(TRIAGE, bad), [
    '$.verdicts[0].reason: missing',
    '$.verdicts[0].extra: not allowed',
    '$.verdicts[0].index: expected integer',
    '$.verdicts[0].verdict: "maybe" is not one of fix-now, followup, reject, owner-call',
  ])
  assert.deepEqual(schemaErrors(TRIAGE, { verdicts: [] }), [])
  assert.throws(() => schemaErrors({ type: 'string', minLength: 1 }, 'x'), /cannot check minLength/)
})
