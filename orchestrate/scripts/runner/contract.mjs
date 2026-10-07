const stringList = { type: 'array', items: { type: 'string' } }

export const SEVERITIES = ['BLOCKER', 'MAJOR', 'MINOR', 'NIT']
export const VERDICTS = ['fix-now', 'followup', 'reject', 'owner-call']

export const WORKER_REPORT = {
  type: 'object',
  properties: {
    status: { type: 'string', enum: ['done', 'blocked'] },
    summary: { type: 'string' },
    testCommands: stringList,
    concerns: stringList,
    commitMessage: { type: 'string' },
  },
  required: ['status', 'summary', 'testCommands', 'concerns', 'commitMessage'],
  additionalProperties: false,
}

const finding = {
  type: 'object',
  properties: {
    location: { type: 'string' },
    issue: { type: 'string' },
    severity: { type: 'string', enum: SEVERITIES },
    fix: { type: 'string' },
  },
  required: ['location', 'issue', 'severity', 'fix'],
  additionalProperties: false,
}

export const REVIEW = {
  type: 'object',
  properties: {
    standards: { type: 'array', items: finding },
    spec: { type: 'array', items: finding },
  },
  required: ['standards', 'spec'],
  additionalProperties: false,
}

export const TRIAGE = {
  type: 'object',
  properties: {
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          index: { type: 'integer' },
          verdict: { type: 'string', enum: VERDICTS },
          reason: { type: 'string' },
        },
        required: ['index', 'verdict', 'reason'],
        additionalProperties: false,
      },
    },
  },
  required: ['verdicts'],
  additionalProperties: false,
}

const TYPE_CHECKS = {
  object: v => typeof v === 'object' && v !== null && !Array.isArray(v),
  array: Array.isArray,
  string: v => typeof v === 'string',
  integer: Number.isInteger,
  boolean: v => typeof v === 'boolean',
}

const KNOWN_KEYWORDS = new Set(['type', 'properties', 'required', 'additionalProperties', 'items', 'enum'])

export function schemaErrors(schema, value, path = '$') {
  const unknown = Object.keys(schema).filter(keyword => !KNOWN_KEYWORDS.has(keyword))
  if (unknown.length) throw new Error(`schemaErrors cannot check ${unknown.join(', ')} at ${path}`)
  if (!TYPE_CHECKS[schema.type](value)) return [`${path}: expected ${schema.type}`]
  if (schema.enum && !schema.enum.includes(value)) return [`${path}: ${JSON.stringify(value)} is not one of ${schema.enum.join(', ')}`]
  if (schema.type === 'array') return value.flatMap((item, i) => schemaErrors(schema.items, item, `${path}[${i}]`))
  if (schema.type !== 'object') return []
  const missing = schema.required.filter(key => !(key in value)).map(key => `${path}.${key}: missing`)
  const extra = Object.keys(value).filter(key => !(key in schema.properties)).map(key => `${path}.${key}: not allowed`)
  const nested = Object.entries(schema.properties)
    .filter(([key]) => key in value)
    .flatMap(([key, sub]) => schemaErrors(sub, value[key], `${path}.${key}`))
  return [...missing, ...extra, ...nested]
}
