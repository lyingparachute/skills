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

## Skills

`/flow` is the router — the map of every skill and the chains they form. Start there.

- **Align & plan** — `zoom-out`, `grill-with-docs`, `grilling`, `exec-plan`, `to-spec`, `to-tickets`, `wayfinder`
- **Build** — `implement` (light), `orchestrate` (heavy, subagent-per-milestone), `tdd`, `prototype`, `diagnosing-bugs`
- **Design quality** — `codebase-design`, `domain-modeling`, `improve-codebase-architecture`, `impeccable` (owns FE detail refs + Web Interface Guidelines), `shadcn-ui`
- **Verify** — `code-review`, `check-work`
- **Knowledge** — `research`, `graphify`, `nlm-skill`
- **Integrations** — `sentry-cli`, `stripe-best-practices`, `stripe-projects`
- **Output & comms** — `caveman`, `caveman-commit`, `no-ai-slop`, `handoff`
- **Meta** — `create-skill`, `writing-great-skills`, `plan-retire`, `flow`

## Install

Symlink each skill into every harness's skill dir (Claude Code, Codex, Cursor, Grok, OpenCode):

```sh
for d in ~/.claude/skills ~/.codex/skills ~/.cursor/skills ~/.grok/skills ~/.config/opencode/skills; do
  mkdir -p "$d"
  for s in */; do ln -sfn "$PWD/${s%/}" "$d/${s%/}"; done
done
```
