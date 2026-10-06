---
name: flow
description: Router over my skill set - pick the right skill and the chain it belongs to.
disable-model-invocation: true
---

# Flow

The map of my skills and how they chain. `[user]` = invoked by typing it; `[model]` = invoked by me or reached for automatically.

## Chains

**Ship a feature**
`grill-with-docs` [user] → `exec-plan` [model] → `implement` [user] (drives `tdd`, `judo-review`) → `caveman-commit` [model] → `pr` [model] (when it goes up as a PR) → `plan-retire` [model]

**Plan a feature, model decides**
`plan-feature` [model] (drives `zoom-out`, `improve-codebase` as prep sweep, `impeccable`, `codebase-design`, `domain-modeling`, `receiving-code-review`, `exec-plan`), then hand its plans to `implement` or `orchestrate`

**Execute a hard plan (heavy / high-token)**
`orchestrate` [user] - fresh implementer per milestone + a code-judo critic per code milestone, a green gate before each commit, whole-branch review, then `plan-retire`; walks a feature folder in build order. The multi-agent alternative to `implement` for plans too big or risky for one agent.

**Fix a bug**
`diagnosing-bugs` [model] (drives `tdd` for the regression test) → `judo-review` [model]

**Design / build frontend**
`impeccable` [model] (owns the detail refs + Web Interface Guidelines audit)

**Clean up a codebase**
`improve-codebase` [model] (drives `graphify` output or `zoom-out`, `judo-review`, `exec-plan`, `plan-feature` for user-facing picks), then hand its plans to `implement` or `orchestrate`

**Research a question**
`research` [model] (web primary sources) · `nlm-skill` [model] (NotebookLM) · `graphify` [model] (this codebase)

**Improve the agent's environment**
`retro` [user] - after a session that went sideways, before you clear it.

**Author a new skill**
`writing-great-skills` [user] (the bar every skill here meets)

**Hand off / step back**
`zoom-out` [model] (see the big picture) · `handoff` [user] (compact for the next agent)

## Catalog by purpose

`README.md` owns the category list. It is the same set of skills, so read it there rather than keeping a second copy in step.

## Rules of the graph

Model-invoked skills fire from their descriptions. User-invoked skills, including `wait-what`, run only when typed. This file is the map.

- One orchestrator (`implement`, `orchestrate`, `plan-feature`, `improve-codebase`) never runs inside another, with two exceptions: `plan-feature` and `improve-codebase` call each other, and their bodies stop the loop; any skill may run `improve-codebase` once the user agrees.

- Frontend detail work lives inside `impeccable` (see `impeccable/reference/details/`), not a separate skill.
