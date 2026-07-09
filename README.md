# skills

My agent skills + global rules. Single source of truth, synced across every coding harness.

## Install

```sh
./install.sh
```

Symlinks every skill into each harness's skill dir (`~/.agents`, Claude Code, Codex, Cursor, Grok, OpenCode) and `AGENTS.md` into each harness's global-rules path. Idempotent — re-run after adding a skill or on a new machine.

## Rules

`AGENTS.md` — global agent rules. `install.sh` links it into `~/.agents/AGENTS.md`, `~/.codex/AGENTS.md`, `~/.claude/CLAUDE.md`, `~/.config/opencode/AGENTS.md`, `~/.grok/AGENTS.md`.

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
