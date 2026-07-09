---
name: flow
description: Router over my skill set — pick the right skill and the chain it belongs to.
disable-model-invocation: true
---

# Flow

The map of my skills and how they chain. `[user]` = orchestrator, invoked by typing it; `[model]` = discipline, invoked by me or reached for automatically. Orchestrators drive disciplines; never chain two orchestrators.

## Chains

**Ship a feature**
`grill-with-docs` [user] → `exec-plan` [model] or `to-spec` [user] → `to-tickets` [user] → `implement` [user] (drives `tdd`, `code-review`) → `check-work` [model] → `caveman-commit` [model] → `plan-retire` [model]

**Big / multi-session work**
`wayfinder` [user] → per investigation ticket: `grill-with-docs` → `implement` …

**Fix a bug**
`diagnosing-bugs` [model] (drives `tdd` for the regression test) → `code-review` [model] → `check-work` [model]

**Design / build frontend**
`impeccable` [model] (drives `shadcn-ui` for components; owns the detail refs + Web Interface Guidelines audit)

**Rescue architecture**
`graphify` [model] (map the codebase) → `improve-codebase-architecture` [user] (drives `codebase-design`, `domain-modeling`)

**Research a question**
`research` [model] (web primary sources) · `nlm-skill` [model] (NotebookLM) · `graphify` [model] (this codebase)

**Author a new skill**
`create-skill` [model] (drives `writing-great-skills`)

**Hand off / step back**
`zoom-out` [user] (see the big picture) · `handoff` [user] (compact for the next agent)

## Catalog by purpose

| Purpose | Skills |
| --- | --- |
| Align & plan | `zoom-out`, `grill-with-docs`, `grilling`, `exec-plan`, `to-spec`, `to-tickets`, `wayfinder` |
| Build | `implement`, `tdd`, `prototype`, `diagnosing-bugs` |
| Design quality | `codebase-design`, `domain-modeling`, `improve-codebase-architecture`, `impeccable`, `shadcn-ui` |
| Verify | `code-review`, `check-work` |
| Knowledge | `research`, `graphify`, `nlm-skill` |
| Integrations | `sentry-cli`, `stripe-best-practices`, `stripe-projects` |
| Output & comms | `caveman`, `caveman-commit`, `no-ai-slop`, `handoff` |
| Meta | `create-skill`, `writing-great-skills`, `plan-retire`, `flow` |

## Rules of the graph

- Post anything to Jira / Confluence / Bitbucket → run `no-ai-slop` first.
- A landed `exec-plan` → `plan-retire` to keep durable decisions, delete the rest.
- Frontend detail work lives inside `impeccable` (see `impeccable/reference/details/`), not a separate skill.
