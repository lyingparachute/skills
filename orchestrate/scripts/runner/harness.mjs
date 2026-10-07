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

const events = stdout => stdout.split('\n').map(parseObject).filter(line => line.ok).map(line => line.value)

function lastOfType(stdout, type) {
  const found = events(stdout).filter(event => event.type === type).at(-1)
  return found ? ok(found) : fail(`no ${type} event in the reply`, 'reply')
}

function lastOpencodeText(stdout) {
  const all = events(stdout)
  const session = all.find(event => event.sessionID)?.sessionID ?? ''
  const error = all.find(event => event.type === 'error')
  if (error) {
    const data = error.error?.data ?? {}
    const kind = data.isRetryable === true || isTransientStatus(data.statusCode) ? 'transient' : 'process'
    return { session, ...fail(data.message ?? JSON.stringify(error.error ?? error), kind) }
  }
  const texts = all.filter(event => event.type === 'text').map(event => event.part?.text ?? '')
  return texts.length ? { session, ...ok(texts.at(-1)) } : { session, ...fail('no text in the reply', 'reply') }
}

function field(reply, name) {
  if (!reply.ok) return reply
  return name in reply.value ? ok(reply.value[name]) : fail(`reply has no ${name}`, 'reply')
}

const ACTIVITY_LENGTH = 160
const CLAUDE_REPLY_TOOL = 'StructuredOutput'
const INPUT_KEYS = ['command', 'skill', 'file_path', 'filePath', 'path', 'pattern', 'url', 'query', 'description']

const oneLine = text => String(text).replace(/\s+/g, ' ').trim().slice(0, ACTIVITY_LENGTH)
const firstLine = text => oneLine(String(text).split('\n').find(line => line.trim()) ?? '')

function brief(input) {
  if (typeof input !== 'object' || input === null) return oneLine(input ?? '')
  const key = INPUT_KEYS.find(name => typeof input[name] === 'string')
  return oneLine(key ? input[key] : JSON.stringify(input))
}

const tool = (name, input) => oneLine(`${name} ${brief(input)}`)

const CODEX_ACTIVITY = {
  command_execution: item => `$ ${oneLine(item.command)}`,
  agent_message: item => firstLine(item.text),
  file_change: item => oneLine(`edit ${(item.changes ?? []).map(change => change.path).join(' ')}`),
  mcp_tool_call: item => tool(`${item.server}.${item.tool}`, item.arguments),
  error: item => oneLine(`error: ${item.message}`),
}

const ADAPTERS = {
  claude: {
    args: ({ prompt, schema, model, effort }) => [
      '-p', prompt, '--output-format', 'stream-json', '--verbose', '--json-schema', JSON.stringify(schema),
      '--model', model, ...option('--effort', effort), '--dangerously-skip-permissions',
    ],
    extract: ({ stdout }) => {
      const reply = lastOfType(stdout, 'result')
      if (reply.ok && reply.value.is_error) {
        return fail(String(reply.value.result), isTransientStatus(reply.value.api_error_status) ? 'transient' : 'process')
      }
      return field(reply, 'structured_output')
    },
    activity: event => (event.type === 'assistant' ? event.message?.content ?? [] : []).flatMap(part => {
      if (part.type === 'tool_use') return part.name === CLAUDE_REPLY_TOOL ? [] : [tool(part.name, part.input)]
      return part.type === 'text' ? [firstLine(part.text)] : []
    }),
  },
  grok: {
    args: ({ prompt, schema, model, effort }) => [
      '-p', prompt, '--output-format', 'streaming-json', '--json-schema', JSON.stringify(schema),
      '-m', model, ...option('--reasoning-effort', effort), '--always-approve',
    ],
    extract: ({ stdout }) => {
      const error = lastOfType(stdout, 'error')
      return error.ok ? fail(String(error.value.message), 'process') : field(lastOfType(stdout, 'end'), 'structuredOutput')
    },
    activity: event => (event.type === 'tool_call' ? [tool(event.toolName ?? event.title, event.rawInput)] : []),
  },
  codex: {
    args: ({ prompt, model, effort, schemaFile, lastFile }) => [
      'exec', '--json', '--output-schema', schemaFile, '-o', lastFile, '-m', model,
      ...option('-c', effort && `model_reasoning_effort=${effort}`), '--sandbox', 'workspace-write', prompt,
    ],
    extract: ({ lastFile }) => (existsSync(lastFile) ? parseObject(readFileSync(lastFile, 'utf8')) : fail('codex wrote no final message')),
    activity: event => {
      const describe = CODEX_ACTIVITY[event.item?.type]
      const shown = event.item?.type === 'command_execution' ? event.type === 'item.started' : event.type === 'item.completed'
      return describe && shown ? [describe(event.item)] : []
    },
  },
  opencode: {
    args: ({ prompt, schema, model, effort, session }) => [
      'run', '--format', 'json', '--auto', '-m', model, ...option('--variant', effort), ...option('-s', session),
      session ? prompt : `${prompt}\n\nYour final message must be one JSON object that matches this JSON Schema, with no other text:\n${JSON.stringify(schema)}`,
    ],
    extract: ({ stdout }) => {
      const reply = lastOpencodeText(stdout)
      return reply.ok ? { session: reply.session, ...jsonFromText(reply.value) } : reply
    },
    activity: event => {
      if (event.type === 'tool_use') return [tool(event.part?.tool, event.part?.state?.input)]
      return event.type === 'text' ? [firstLine(event.part?.text ?? '')] : []
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
  onEvent = () => {}, signal,
}) {
  const adapter = ADAPTERS[harness]
  let calls = 0

  function activityReader(role) {
    let partial = ''
    return chunk => {
      const lines = (partial + chunk).split('\n')
      partial = lines.pop()
      lines.map(parseObject).filter(line => line.ok)
        .flatMap(line => adapter.activity(line.value))
        .filter(Boolean)
        .forEach(text => onEvent({ type: 'activity', role, text }))
    }
  }

  async function attempt(role, request) {
    calls += 1
    const stem = join(workspace, `agent-${process.pid}-${calls}-${role}`)
    const files = { schemaFile: `${stem}.schema.json`, lastFile: `${stem}.last.json`, logFile: `${stem}.log` }
    writeFileSync(files.schemaFile, JSON.stringify(request.schema))
    writeFileSync(files.logFile, '')
    const readActivity = activityReader(role)
    const run = await runBounded(harness, adapter.args({ ...request, ...files, model: models[role], effort: efforts[role] }), {
      cwd,
      timeoutMs,
      idleMs,
      signal,
      onSpawn: pid => onEvent({ type: 'attempt', role, harness, model: models[role], pid, log: files.logFile }),
      onOutput: (chunk, source) => {
        appendFileSync(files.logFile, chunk)
        if (source === 'stdout') readActivity(chunk)
      },
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
      const waitMs = FIRST_BACKOFF_MS * 2 ** (retry - 1)
      onEvent({ type: 'retry', role, waitMs, error: reply.error })
      await sleep(waitMs)
      reply = await repaired(role, EDITING_ROLES.includes(role) ? `${prompt}\n\n${RETRY_NOTE}` : prompt, schema)
    }
    if (reply.ok) return ok(reply.value)
    return reply.kind === 'transient' ? fail(`${reply.error} (still failing after ${MAX_TRANSIENT_RETRIES} retries)`, reply.kind) : fail(reply.error, reply.kind)
  }
}
