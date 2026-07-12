---
name: plan-retire
description: Use when a plan is done with — feature merged, abandoned, superseded, or invalidated — or when the plans dir accumulates stale entries, to preserve durable decisions and delete the plan per retention policy.
---

# Plan Retire

Done-with plans are NOT memory archives. Retire them: keep anything durable, delete the rest. The common case is that nothing durable came out of the plan — then you write nothing and go straight to deleting it. Writing a doc is the exception, not a required step.

## Checklist (per plan)

1. **Confirm it's retirable.** A plan retires when it's done with — most often the feature merged to `main` (verify by file content on main, not branch commit count; squash-merge repos show "N commits ahead" for already-landed work), but also when abandoned, superseded, or its premise was invalidated by a later change. Merge is the common case, not a precondition — the user can retire an unmerged plan and that's fine.
2. **Capture durable decisions — only if the plan produced any.** Source them from the plan's `Decision Log` and `Outcomes & Retrospective` sections (the exec-plan skill mandates both). When it did, prefer editing the existing ADR/doc that owns that area over creating a new file; write a new ADR (e.g. `docs/adr/*.md`) only when no home exists. Terse prose; NEVER embed plan-file paths (plans get deleted, links rot). Nothing durable → write nothing.
3. **Capture reusable non-decision findings** (operational context, discoveries) the same way — update where the project already keeps them, create only if needed, skip if there's nothing worth keeping.
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
- "Every landed plan needs an ADR" — false; only durable decisions earn one, and many plans earn none.
- Writing a doc just to have written something — if nothing is durable, delete the plan and stop.
- Creating a new ADR when an existing one should just be updated.
- ADR linking to a plan path — forbidden, links rot.
