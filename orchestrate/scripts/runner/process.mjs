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

// Runs in its own process group so a timeout also kills what the command
// started; a leftover grandchild holding the pipe would otherwise block forever.
export function runBounded(command, args, { cwd, timeoutMs, onOutput }) {
  return new Promise(resolve => {
    const child = spawn(command, args, { cwd, stdio: ['ignore', 'pipe', 'pipe'], detached: true })
    let stdout = ''
    let timedOut = false
    let settled = false
    const settle = result => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      killGroup(child)
      resolve({ stdout, ...result })
    }
    const timer = setTimeout(() => { timedOut = true; killGroup(child) }, timeoutMs)
    child.stdout.on('data', chunk => { stdout += chunk; onOutput(chunk) })
    child.stderr.on('data', chunk => onOutput(chunk))
    child.on('error', error => settle({ code: -1, problem: `cannot start ${command}: ${error.message}` }))
    child.on('exit', code => {
      const result = { code: code ?? -1, problem: timedOut ? `${command} timed out after ${timeoutMs} ms` : '' }
      child.on('close', () => settle(result))
      setTimeout(() => settle(result), PIPE_GRACE_MS)
    })
  })
}
