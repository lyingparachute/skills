---
name: plan-retire
description: Use after a plan's feature lands (merged) — or when the plans dir accumulates stale entries — to preserve durable decisions and delete the plan per retention policy.
---

# Plan Retire

Landed plans are NOT memory archives. Retire them: extract what's durable, delete the rest.

## Checklist (per landed plan)

1. **Confirm landed.** Feature merged to `main` — verify by file content on main, not branch commit count (squash-merge repos show "N commits ahead" for already-landed work).
2. **Extract durable decisions → an ADR** (e.g. `docs/adr/*.md`) only when the plan changed a durable decision. Terse prose; NEVER embed plan-file paths (plans get deleted, links rot).
3. **Extract reusable non-decision findings** (operational context, discoveries) → wherever the project keeps them.
4. **Delete the plan file.** Keep blocked/deferred follow-up plans only while actionable; a deferred plan whose premise a later change invalidated gets deleted too (verify premise vs committed code first).
5. **Update the plans index** if it references the deleted plan.
6. **Rebuild the knowledge graph — only if graphify is set up in this repo** (a committed `graph.json` exists). Deleting a plan changes docs the graph covers: `graphify extract . --out . --token-budget 24000 --max-concurrency 2 && graphify cluster-only . --no-viz`; commit the tracked files (`graph.json`, `GRAPH_REPORT.md`, `manifest.json`, `.graphify_labels.json`). Rebuild deliberately (LLM tokens), not per edit. No graphify → skip.

## ADR Or Garbage?

Create an ADR when the plan locked a decision future work must treat as precedent:

- architecture or module boundary changed
- long-lived domain rule / invariant changed
- cross-app or public contract changed
- vendor / protocol / storage / security model choice made with real trade-off
- future deviation should require a superseding decision, not a casual refactor

Do NOT create an ADR for plan exhaust:

- implementation notes already obvious from code/tests/migrations
- one-off bugfix mechanics or cleanup details
- follow-up lists, rollout chores, or go-live reminders
- local refactor shape with no lasting policy
- duplicate restatement of an existing ADR

Lazy test: if future you would not search the ADR dir to avoid re-litigating this decision, skip the ADR.

## Red Flags

- "Keep the plan for history" — git remembers; delete it.
- "Every landed plan needs an ADR" — false; only durable decisions earn one.
- ADR linking to a plan path — forbidden, links rot.
