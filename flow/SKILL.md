---
name: flow
description: Router over my skill set — pick the right skill and the chain it belongs to.
disable-model-invocation: true
---

# Flow

The map of my skills and how they chain. `[user]` = orchestrator, invoked by typing it; `[model]` = discipline, invoked by me or reached for automatically. Orchestrators drive disciplines; never chain two orchestrators.

## Chains

**Ship a feature**
`grill-with-docs` [user] → `exec-plan` [model] → `implement` [user] (drives `tdd`, `judo-review`) → `caveman-commit` [model] → `plan-retire` [model]

**Execute a hard plan (heavy / high-token)**
`orchestrate` [user] — fresh implementer + one code-judo critic per milestone, whole-branch review, then `plan-retire`. The multi-agent alternative to `implement` for plans too big or risky for one agent.

**Big / multi-session work**
`wayfinder` [user] → per investigation ticket: `grill-with-docs` → `implement` …

**Fix a bug**
`diagnosing-bugs` [model] (drives `tdd` for the regression test) → `judo-review` [model]

**Design / build frontend**
`impeccable` [model] (drives `shadcn-ui` for components; owns the detail refs + Web Interface Guidelines audit)

**Rescue architecture**
`graphify` [model] (map the codebase) → `improve-codebase-architecture` [user] (drives `codebase-design`, `domain-modeling`)

**Research a question**
`research` [model] (web primary sources) · `nlm-skill` [model] (NotebookLM) · `graphify` [model] (this codebase)

**Author a new skill**
`writing-great-skills` [user] (the bar every skill here meets)

**Hand off / step back**
`zoom-out` [model] (see the big picture) · `handoff` [user] (compact for the next agent)

## Catalog by purpose

`README.md` owns the category list. It is the same set of skills, so read it there rather than keeping a second copy in step.

## Rules of the graph

Model-invoked skills fire from their descriptions. User-invoked skills, including `wait-what`, run only when typed. This file is the map.

- Frontend detail work lives inside `impeccable` (see `impeccable/reference/details/`), not a separate skill.
