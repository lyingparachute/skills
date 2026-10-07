import { appendFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { schemaErrors } from './contract.mjs'
import { runBounded } from './process.mjs'
import { fail, ok } from './result.mjs'

export const DEFAULT_AGENT_TIMEOUT_MS = 90 * 60 * 1000
export const DEFAULT_IDLE_TIMEOUT_MS = 15 * 60 * 1000
export const MAX_TRANSIENT_RETRIES = 5
export const FIRST_BACKOFF_MS = 30 * 1000
const RATE_LIMITED = 429
const FIRST_SERVER_ERROR = 500
const EDITING_ROLES = ['implementer', 'fixer']
const RETRY_NOTE = 'An earlier attempt at this task was cut off by a provider error. Its uncommitted changes may be in the tree; check them and continue from there.'

const isTransientStatus = status => status === RATE_LIMITED || status >= FIRST_SERVER_ERROR
const option = (flag, value) => (value ? [flag, value] : [])
const sleepFor = ms => new Promise(resolve => setTimeout(resolve, ms))

function parseJson(text) {
  try {
    return ok(JSON.parse(text))
  } catch (error) {
    return fail(`not JSON: ${error.message}`, 'reply')
  }
}

const parseObject = text => {
  const parsed = parseJson(text)
  if (!parsed.ok) return parsed
  return typeof parsed.value === 'object' && parsed.value !== null ? parsed : fail('reply is not a JSON object', 'reply')
}

export function jsonFromText(text) {
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  return start === -1 || end < start ? fail('no JSON object in the reply', 'reply') : parseObject(text.slice(start, end + 1))
}

function lastOpencodeText(stdout) {
  const events = stdout.split('\n').map(parseObject).filter(line => line.ok).map(line => line.value)
  const session = events.find(event => event.sessionID)?.sessionID ?? ''
  const error = events.find(event => event.type === 'error')
  if (error) {
    const data = error.error?.data ?? {}
    const kind = data.isRetryable === true || isTransientStatus(data.statusCode) ? 'transient' : 'process'
    return { session, ...fail(data.message ?? JSON.stringify(error.error ?? error), kind) }
  }
  const texts = events.filter(event => event.type === 'text').map(event => event.part?.text ?? '')
  return texts.length ? { session, ...ok(texts.at(-1)) } : { session, ...fail('no text in the reply', 'reply') }
}

function field(reply, name) {
  if (!reply.ok) return reply
  return name in reply.value ? ok(reply.value[name]) : fail(`reply has no ${name}`, 'reply')
}

const ADAPTERS = {
  claude: {
    args: ({ prompt, schema, model, effort }) => [
      '-p', prompt, '--output-format', 'json', '--json-schema', JSON.stringify(schema),
      '--model', model, ...option('--effort', effort), '--dangerously-skip-permissions',
    ],
    extract: ({ stdout }) => {
      const reply = parseObject(stdout)
      if (reply.ok && reply.value.is_error) {
        return fail(String(reply.value.result), isTransientStatus(reply.value.api_error_status) ? 'transient' : 'process')
      }
      return field(reply, 'structured_output')
    },
  },
  grok: {
    args: ({ prompt, schema, model, effort }) => [
      '-p', prompt, '--json-schema', JSON.stringify(schema), '-m', model, ...option('--reasoning-effort', effort), '--always-approve',
    ],
    extract: ({ stdout }) => field(parseObject(stdout), 'structuredOutput'),
  },
  codex: {
    args: ({ prompt, model, effort, schemaFile, lastFile }) => [
      'exec', '--output-schema', schemaFile, '-o', lastFile, '-m', model,
      ...option('-c', effort && `model_reasoning_effort=${effort}`), '--sandbox', 'workspace-write', prompt,
    ],
    extract: ({ lastFile }) => (existsSync(lastFile) ? parseObject(readFileSync(lastFile, 'utf8')) : fail('codex wrote no final message')),
  },
  opencode: {
    streams: true,
    args: ({ prompt, schema, model, effort, session }) => [
      'run', '--format', 'json', '--auto', '-m', model, ...option('--variant', effort), ...option('-s', session),
      session ? prompt : `${prompt}\n\nYour final message must be one JSON object that matches this JSON Schema, with no other text:\n${JSON.stringify(schema)}`,
    ],
    extract: ({ stdout }) => {
      const reply = lastOpencodeText(stdout)
      return reply.ok ? { session: reply.session, ...jsonFromText(reply.value) } : reply
    },
  },
}

export const HARNESSES = Object.keys(ADAPTERS)

function checked(schema, reply) {
  if (!reply.ok) return reply
  const errors = schemaErrors(schema, reply.value)
  return errors.length ? { ...reply, ...fail(`reply breaks the schema: ${errors.join('; ')}`, 'reply') } : reply
}

export function createAgent({
  harness, models, efforts = {}, cwd, workspace, timeoutMs = DEFAULT_AGENT_TIMEOUT_MS, idleMs = DEFAULT_IDLE_TIMEOUT_MS, sleep = sleepFor,
}) {
  const adapter = ADAPTERS[harness]
  let calls = 0

  async function attempt(role, request) {
    calls += 1
    const stem = join(workspace, `agent-${process.pid}-${calls}-${role}`)
    const files = { schemaFile: `${stem}.schema.json`, lastFile: `${stem}.last.json`, logFile: `${stem}.log` }
    writeFileSync(files.schemaFile, JSON.stringify(request.schema))
    writeFileSync(files.logFile, '')
    const run = await runBounded(harness, adapter.args({ ...request, ...files, model: models[role], effort: efforts[role] }), {
      cwd, timeoutMs, idleMs: adapter.streams ? idleMs : undefined, onOutput: chunk => appendFileSync(files.logFile, chunk),
    })
    const where = `log: ${files.logFile}`
    if (run.problem) return fail(`${run.problem}, ${where}`, run.stalled ? 'transient' : 'process')
    const reply = checked(request.schema, adapter.extract({ stdout: run.stdout, lastFile: files.lastFile }))
    if (run.code !== 0) {
      const kind = !reply.ok && reply.kind === 'transient' ? 'transient' : 'process'
      return fail(`${harness} exited ${run.code}${reply.ok ? '' : `: ${reply.error}`}, ${where}`, kind)
    }
    return reply.ok ? reply : { ...reply, error: `${reply.error}, ${where}` }
  }

  async function repaired(role, prompt, schema) {
    const first = await attempt(role, { prompt, schema })
    if (first.ok || first.kind !== 'reply' || !first.session) return first
    return attempt(role, {
      schema,
      session: first.session,
      prompt: `Your last reply was rejected: ${first.error}. Reply again with only the JSON object that matches the schema.`,
    })
  }

  return async function agent(role, prompt, schema) {
    let reply = await repaired(role, prompt, schema)
    for (let retry = 1; !reply.ok && reply.kind === 'transient' && retry <= MAX_TRANSIENT_RETRIES; retry += 1) {
      await sleep(FIRST_BACKOFF_MS * 2 ** (retry - 1))
      reply = await repaired(role, EDITING_ROLES.includes(role) ? `${prompt}\n\n${RETRY_NOTE}` : prompt, schema)
    }
    if (reply.ok) return ok(reply.value)
    return reply.kind === 'transient' ? fail(`${reply.error} (still failing after ${MAX_TRANSIENT_RETRIES} retries)`, reply.kind) : fail(reply.error, reply.kind)
  }
}
