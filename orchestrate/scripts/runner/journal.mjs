import { appendFileSync, existsSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { renderLive } from './live.mjs'
import { apply, clock, describe, emptyView, project } from './view.mjs'

export const EVENTS_FILE = 'events.jsonl'
export const LIVE_FILE = 'live.html'

export const logLine = event => `${clock(event.at)}  ${describe(event)}`

// A runner killed mid-append leaves a torn last line; the journal is a view of the run, not its state, so it is skipped.
export const parsed = line => {
  try {
    return [JSON.parse(line)]
  } catch {
    return []
  }
}

const eventsIn = text => text.split('\n').filter(Boolean).flatMap(parsed)
const journalText = file => (existsSync(file) ? readFileSync(file, 'utf8') : '')

export const readEvents = workspace => eventsIn(journalText(join(workspace, EVENTS_FILE)))

export function createJournal(workspace, { print, now = () => new Date() }) {
  const file = join(workspace, EVENTS_FILE)
  const liveFile = join(workspace, LIVE_FILE)
  const existing = journalText(file)
  let view = project(eventsIn(existing))
  if (existing && !existing.endsWith('\n')) appendFileSync(file, '\n')

  const writeLive = () => {
    writeFileSync(`${liveFile}.tmp`, renderLive(view, { workspace, now: now() }))
    renameSync(`${liveFile}.tmp`, liveFile)
  }

  return {
    emit(event) {
      if (event.type === 'run-start' && event.fresh) {
        view = emptyView()
        writeFileSync(file, '')
      }
      const stamped = { at: now().toISOString(), ...event }
      view = apply(view, stamped)
      appendFileSync(file, `${JSON.stringify(stamped)}\n`)
      print(logLine(stamped))
      writeLive()
    },
  }
}
