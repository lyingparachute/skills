---
name: exec-plan
description: Use when authoring a new execution plan, revising a plan, or deciding whether a plan is ready to execute — including writing acceptance criteria, scoping milestones, and running plan-critic review rounds.
---

# Exec Plan

Author `<plans-dir>/<date>-<topic>.md` plans as self-contained briefs, then gate them through **1–2 fresh-context critic rounds** (min 1, hard cap 2) before execution. A plan with zero critic rounds is a draft, not a plan.

`<plans-dir>` is wherever the project keeps plans (e.g. `.agents/plans/`, `docs/plans/`).

The full ExecPlan spec — envelope, required sections, skeleton, self-containment rules — lives in [`PLANS.md`](PLANS.md). Read it before authoring; the shape below is the quick contract.

## Plan Shape (contract)

A plan is a brief for a senior dev with zero background. Required sections:

- **Status:** line (`draft` → `ready` → `landed — <sha>` / `blocked — <reason>`)
- **Background / why now** — problem, evidence, what happens if deferred
- **User stories** — the feature from the user's perspective, as `As an <actor>, I want <capability>, so that <benefit>`. The scope-completeness check: a capability with no story is out of scope until one exists. Internal/refactor work with no external actor → say so and skip
- **Scope + Non-goals** — explicit exclusions kill drift
- **Locked decisions** — module boundaries, patterns, public API shape, data model, dependency direction, security sources. All architecture locks HERE; the implementer gets tactics only (naming, control flow, test layout)
- **Alternatives considered** — and why rejected
- **Invariants / risks / open questions**
- **Milestones** — vertical tracer-bullet slices: each cuts a narrow but complete path through every layer (schema, API, UI, tests), is demoable on its own, and fits one fresh context window. One concern, one verifiable outcome; no code, no pseudo-code, no step-by-step
- **Progress** — mandatory checkbox list (`- [ ]` / `- [x] (timestamp)`) tracking granular work. This is the tracker: the assistant ticks boxes as it goes, splits a half-done item into "done / remaining" at every stopping point, and the plan file stays the single source of truth. No external issue tracker
- **DoD** — binary checkboxes, each with an exact verification command + expected output

Rules:
- **Test at the fewest, highest seams.** Prefer an existing seam to a new one; the ideal count across the change is one. Name the seam(s) and any prior art (similar tests in the codebase) so the implementer tests external behavior, not internals.
- **Claim strength = proof strength.** "Exact"/"complete"/"durable" claims need a check that distinguishes a real implementation from a partial one that still exits 0.
- Every cited `file:line` verified against current repo state at write time AND again at execution time.
- Vague AC ("should work correctly") is not an AC.
- Acceptance greps: use `git grep -P`, not `-E "\b"` (silently matches nothing here).
- **Wide refactors break vertical slicing.** A mechanical change with cross-codebase blast radius (rename a column, retype a shared symbol) can't land green as one tracer bullet. Sequence expand–contract: first a milestone that adds the new form beside the old (nothing breaks); then migrate call sites in batches sized to the blast radius (per package/dir), each its own milestone, CI green throughout because the old form stays; finally a contract milestone that removes the old form once no caller remains.

## Critic Gate (mandatory: min 1, max 2 rounds)

1. Dispatch a skeptical fresh-context plan-critic (never the writer). Brief: **attack, don't validate** — verify every claim against the repo (`git grep`/read source), check AC are binary, flag scope creep, false completeness claims, premature abstraction, dangling citations, vague steps. Typed findings only: `{location, issue, severity, suggested fix}`.
2. Fix findings. Dismissals require an explicit written reason.
3. Round 1 had BLOCKER/MAJOR findings → dispatch a SECOND fresh critic to verify the fixes. Round 1 clean → done after one round.
4. **Hard cap: 2 rounds.** Findings still open after round 2 → list them in the plan's Status/notes for the owner and stop; no endless review loops. Set `Status: ready` when open BLOCKER/MAJOR = zero OR the leftovers are explicitly owner-dismissed.

Why min 1 fresh round: single self-review has approved BLOCKERs (a DoD "last duplicate" completeness claim that grep-refuted with 9 hits). Why max 2: unbounded iterate-to-zero loops stall agents.

## Execution & Lifecycle

- Plan = contract during execution: Scope/Non-goals/DoD literal, no drift. Hit a dependency on another plan → STOP and report.
- A plan's "deferred / do NOT remove X" premise can be invalidated by a later-landed dependency — verify the premise against committed code before enforcing it.
- Plan is a living document: update Status, tick Progress boxes as work lands, and record decisions as they change; it is the cross-session source of truth and the only tracker.
- On completion: `Status: landed — <sha>`, tick DoD boxes. Then invoke `plan-retire`.

## Red Flags

- "The plan is simple, one critic pass is enough" — two rounds, no exception.
- Writing implementation code/pseudo-code into milestones — that's the implementer's job.
- A DoD bullet with no command — untestable = not done-able.
