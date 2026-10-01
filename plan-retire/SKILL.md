---
name: plan-retire
description: Use when a plan is done with - feature merged, abandoned, superseded, or invalidated - or when the plans dir accumulates stale entries, to preserve durable decisions and delete the plan per retention policy.
---

# Plan Retire

Done-with plans are NOT memory archives. Retire them: keep anything durable, delete the rest. The common case is that nothing durable came out of the plan - then you write nothing and go straight to deleting it. Writing a doc is the exception, not a required step.

## Checklist (per plan)

1. **Confirm it's retirable.** A plan retires when it's done with - most often the feature merged to `main` (verify by file content on main, not branch commit count; squash-merge repos show "N commits ahead" for already-landed work), but also when abandoned, superseded, or its premise was invalidated by a later change. Merge is the common case, not a precondition - the user can retire an unmerged plan and that's fine.
2. **Capture durable decisions - only if the plan produced any.** Source them from the plan's `Decision Log`, and from `Outcomes & Retrospective` only for a decision made late; lessons learned and incident stories stay out. When it did, load and follow the `domain-modeling` skill: it owns the ADR format and where ADRs live. The ADR test and the contest live there; **ADR Or Garbage?** below lists plan exhaust that never earns one. Terse prose; NEVER embed plan-file paths (plans get deleted, links rot). Nothing durable → write nothing.
3. **Capture operational facts** (how to run, operate, or recover) through the `domain-modeling` contest - update where the project already keeps them, create only if needed, skip if nothing survives.
4. **Delete the plan file.** Keep blocked/deferred follow-up plans only while actionable; a deferred plan whose premise a later change invalidated gets deleted too (verify premise vs committed code first).
5. **Update the plans-dir index** (a project-kept list of plans, if any) if it references the deleted plan.
6. **Feature folder** (see `exec-plan`): run step 2 also on the `00-INDEX.md` feature decisions that name this plan. Remove the plan from every index section that names it. Clear it from other rows' "starts after" only if it landed; otherwise flag each dependent plan to the user. Update the index Status per `exec-plan` Status sync, and delete the folder together with its last plan.
7. **Rebuild the knowledge graph - only if graphify is set up in this repo** (a committed `graph.json` exists). Deleting a plan changes docs the graph covers: `graphify extract . --out . --token-budget 24000 --max-concurrency 2 && graphify cluster-only . --no-viz`; the rebuilt tracked files (`graph.json`, `GRAPH_REPORT.md`, `manifest.json`, `.graphify_labels.json`) go into step 8's commit. Rebuild deliberately (LLM tokens), not per edit. No graphify → skip.
8. **Commit the retirement.** Was the plan file tracked in git? Then its deletion is a change the team needs, and leaving it uncommitted means the next session finds a dirty tree and a plan that is neither alive nor gone. One commit carries the whole retirement: the deleted plan, the ADR/doc writes from steps 2-3, the plans-dir index and feature folder index changes or folder deletion, and any rebuilt graph files. Message per `caveman-commit`, and the *why* is the retirement reason from step 1 (merged, abandoned, superseded, invalidated). Push only if the user asked. Untracked plan → delete it and say in the report there was nothing to commit.

## ADR Or Garbage?

Plan exhaust never earns an ADR:

- implementation notes already obvious from code/tests/migrations
- one-off bugfix mechanics or cleanup details
- follow-up lists, rollout chores, or go-live reminders
- local refactor shape with no lasting policy
- duplicate restatement of an existing ADR

## Red Flags

- "Keep the plan for history" - git remembers; delete it.
- "Every landed plan needs an ADR" - false; only durable decisions earn one, and many plans earn none.
- Writing a doc just to have written something - if nothing is durable, delete the plan and stop.
- ADR linking to a plan path - forbidden, links rot.
