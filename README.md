# skills

My Claude skills. Sync across machines.

## Skills

- `code-review/` — review code
- `exec-plan/` — author execution plans
- `plan-retire/` — retire landed plans, keep durable decisions
- `implement/` — build from spec or tickets

## Install

Symlink each skill into every harness's skill dir (Claude Code, Codex, Cursor, Grok, OpenCode):

```sh
for d in ~/.claude/skills ~/.codex/skills ~/.cursor/skills ~/.grok/skills ~/.config/opencode/skills; do
  mkdir -p "$d"
  for s in */; do ln -sfn "$PWD/${s%/}" "$d/${s%/}"; done
done
```
