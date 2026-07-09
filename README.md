# skills

My Claude skills + global agent rules. Sync across machines.

## Rules

`AGENTS.md` — one source of truth for global agent rules. Symlink it into each harness:

```sh
for dest in ~/.agents/AGENTS.md ~/.codex/AGENTS.md ~/.claude/CLAUDE.md; do
  mkdir -p "$(dirname "$dest")"
  ln -sfn "$PWD/AGENTS.md" "$dest"
done
```

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
