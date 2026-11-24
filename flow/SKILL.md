---
name: flow
description: "Use when you are not sure which skill fits a task, or which chain of skills to run."
disable-model-invocation: true
---

# Flow

Before stating what a skill does or recommending a step be skipped, read that skill's SKILL.md: the summaries here are for orientation only.

The map of my skills and how they chain. `[user]` = invoked by typing it; `[model]` = invoked by me or reached for automatically.

## Chains

**Ship a feature**
`grill-with-docs` [user] → `exec-plan` [model] → `implement` [model] (drives `tdd`, `impeccable` for UI, `judo-review`, `receiving-code-review`) → `caveman-commit` [model] → `pr` [model] (when it goes up as a PR) → `plan-retire` [model]

**Plan a feature, model decides**
`plan-feature` [model] (drives `zoom-out`, `improve-codebase` as prep sweep, `impeccable`, `codebase-design`, `domain-modeling`, `receiving-code-review`, `exec-plan`), then hand its plans to `implement`

**Fix a bug**
`diagnosing-bugs` [model] (drives `tdd` for the regression test, `benchmark-checklist` for a perf number) → `judo-review` [model]

**Understand a PR before reviewing it**
`explain-pr` [model] (drives `zoom-out`) - one briefing page: goal, merge danger, before/after, risks, where to read first. Folds in `judo-review` findings when they exist.

**Verify work done without a plan**
`self-verify` [model] - fresh verifier subagent, PASS or FAIL per ask. Plan-based work goes to `judo-review`.

**Audit security**
`security-audit` [user] - hunt vulnerabilities in a repo or named scope. Confirmed findings → `exec-plan`.

**Design / build frontend**
`impeccable` [model] (owns the detail refs + Web Interface Guidelines audit)

**Clean up a codebase**
`improve-codebase` [model] (drives `graphify` output or `zoom-out`, `judo-review`, `exec-plan`, `plan-feature` for user-facing picks), then hand its plans to `implement`

**Research a question**
`research` [model] (web primary sources) · `nlm-skill` [model] (NotebookLM) · `graphify` [model] (this codebase)

**Improve the agent's environment**
`retro` [user] - after a session that went sideways, before you clear it.

**Stop a repeated mistake**
`correct` [model] - on the second correction of the same mistake. A mistake in a repo's code: it changes the repo (drives `codebase-design`, `type-system-discipline`, `tdd`, `domain-modeling`, `exec-plan` for a fix that needs a plan). A mistake in how the agent works: it asks whether the fix is a skill or a rule. `retro` reads session logs and changes the agent's setup; run it first when the repo's history shows too few corrections.

**Author a new skill**
`writing-great-skills` [user] (the bar every skill here meets)

**Hand off / step back**
`zoom-out` [model] (see the big picture) · `handoff` [user] (compact for the next agent)

## Catalog by purpose

`README.md` owns the category list. It is the same set of skills, so read it there rather than keeping a second copy in step.

## Rules of the graph

Model-invoked skills fire from their descriptions. User-invoked skills, including `wait-what`, run only when typed. This file is the map.

- One orchestrator (`implement`, `plan-feature`, `improve-codebase`, `security-audit`) never runs inside another, with two exceptions: `plan-feature` and `improve-codebase` call each other, and their bodies stop the loop; any skill may run `improve-codebase` once the user agrees.

- Frontend detail work lives inside `impeccable` (see `impeccable/reference/details/`), not a separate skill.
