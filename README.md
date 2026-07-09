# skills

My Claude skills + global agent rules. Sync across machines.

## Rules

`AGENTS.md` — one source of truth for global agent rules. Symlink it into each harness:

```sh
for dest in ~/.agents/AGENTS.md ~/.codex/AGENTS.md ~/.claude/CLAUDE.md ~/.config/opencode/AGENTS.md ~/.grok/AGENTS.md; do
  mkdir -p "$(dirname "$dest")"
  ln -sfn "$PWD/AGENTS.md" "$dest"
done
```

Harness global-rules paths: Codex `~/.codex/AGENTS.md`, Claude `~/.claude/CLAUDE.md`, OpenCode `~/.config/opencode/AGENTS.md`, Grok `~/.grok/AGENTS.md`.

Cursor has no global rules *file* — the IDE keeps user rules in Settings → Rules, and the CLI only reads a project-root `AGENTS.md`. For per-project coverage, symlink into a repo root: `ln -sfn "$PWD/AGENTS.md" <project>/AGENTS.md`.

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
