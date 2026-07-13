# skills

My agent skills + global rules. **Single source of truth** for every coding harness — each harness's skill dir holds only symlinks back here.

> **Edit here, never in a harness.** Every harness (`~/.agents`, Claude Code, Codex, Cursor, Grok, OpenCode) sees these skills through symlinks into this repo. Change, rename, or delete a skill *in this repo* — editing it inside a harness's own skill dir just writes through the symlink and desyncs the rest, or leaves a dangling link. When writing or editing any skill, follow the `writing-great-skills` skill.

## Install

```sh
./install.sh
```

Symlinks every skill into each harness's skill dir (`~/.agents`, Claude Code, Codex, Cursor, Grok, OpenCode) and `AGENTS.md` into each harness's global-rules path. Idempotent — re-run on a new machine and after **adding, renaming, or removing** a skill: it relinks and prunes stale symlinks (a rename/removal leaves dangling links in every harness) so all harnesses stay validated.

## Rules

`AGENTS.md` — global agent rules. `install.sh` links it into `~/.agents/AGENTS.md`, `~/.codex/AGENTS.md`, `~/.claude/CLAUDE.md`, `~/.config/opencode/AGENTS.md`, `~/.grok/AGENTS.md`.

## Skills

`/flow` is the router — the map of every skill and the chains they form. Start there.

- **Align & plan** — `zoom-out`, `grill-with-docs`, `grilling`, `exec-plan`, `wayfinder`
- **Build** — `implement` (light), `orchestrate` (heavy, subagent-per-milestone), `tdd`, `prototype`, `diagnosing-bugs`
- **Design quality** — `codebase-design`, `domain-modeling`, `improve-codebase-architecture`, `impeccable` (owns FE detail refs + Web Interface Guidelines), `shadcn-ui`
- **Verify** — `code-review`, `check-work`
- **Knowledge** — `research`, `graphify`, `nlm-skill`
- **Integrations** — `sentry-cli`, `stripe-best-practices`, `stripe-projects`
- **Output & comms** — `caveman`, `caveman-commit`, `no-ai-slop`, `handoff`
- **Meta** — `create-skill`, `writing-great-skills`, `plan-retire`, `flow`
