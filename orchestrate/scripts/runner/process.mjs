import { spawn } from 'node:child_process'

const PIPE_GRACE_MS = 2000

function killGroup(child) {
  if (!child.pid) return
  try {
    process.kill(-child.pid, 'SIGKILL')
  } catch (error) {
    if (error.code !== 'ESRCH') throw error
  }
}

const CAUSES = { none: '', timeout: 'timeout', stall: 'stall', interrupted: 'interrupted' }

// Runs in its own process group so a timeout also kills what the command
// started; a leftover grandchild holding the pipe would otherwise block forever.
export function runBounded(command, args, { cwd, timeoutMs, idleMs, onOutput, onSpawn = () => {}, signal }) {
  return new Promise(resolve => {
    const child = spawn(command, args, { cwd, stdio: ['ignore', 'pipe', 'pipe'], detached: true })
    child.stdout.setEncoding('utf8')
    child.stderr.setEncoding('utf8')
    if (child.pid) onSpawn(child.pid)
    let stdout = ''
    let cause = CAUSES.none
    let settled = false
    const stop = reason => { if (cause === CAUSES.none) cause = reason; killGroup(child) }
    const interrupt = () => stop(CAUSES.interrupted)
    if (signal?.aborted) interrupt()
    signal?.addEventListener('abort', interrupt, { once: true })
    const settle = result => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      clearTimeout(idle)
      signal?.removeEventListener('abort', interrupt)
      killGroup(child)
      resolve({ stdout, ...result })
    }
    const timer = setTimeout(() => stop(CAUSES.timeout), timeoutMs)
    let idle
    const stillWorking = () => {
      if (idleMs === undefined) return
      clearTimeout(idle)
      idle = setTimeout(() => stop(CAUSES.stall), idleMs)
    }
    stillWorking()
    child.stdout.on('data', chunk => { stillWorking(); stdout += chunk; onOutput(chunk, 'stdout') })
    child.stderr.on('data', chunk => { stillWorking(); onOutput(chunk, 'stderr') })
    child.on('error', error => settle({ code: -1, problem: `cannot start ${command}: ${error.message}` }))
    child.on('exit', code => {
      const problems = {
        [CAUSES.none]: '',
        [CAUSES.timeout]: `${command} timed out after ${timeoutMs} ms`,
        [CAUSES.stall]: `${command} gave no output for ${idleMs} ms`,
        [CAUSES.interrupted]: `${command} was killed: the runner was interrupted`,
      }
      const result = { code: code ?? -1, problem: problems[cause], stalled: cause === CAUSES.stall }
      child.on('close', () => settle(result))
      setTimeout(() => settle(result), PIPE_GRACE_MS)
    })
  })
}
