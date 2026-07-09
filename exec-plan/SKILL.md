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
- **Tracker:** line — issue/ticket link (`Tracker: #<n>` or URL). Every non-trivial plan → one tracker issue. See **Tracker Correlation**
- **Background / why now** — problem, evidence, what happens if deferred
- **Scope + Non-goals** — explicit exclusions kill drift
- **Locked decisions** — module boundaries, patterns, public API shape, data model, dependency direction, security sources. All architecture locks HERE; the implementer gets tactics only (naming, control flow, test layout)
- **Alternatives considered** — and why rejected
- **Invariants / risks / open questions**
- **Milestones** — one concern, one verifiable outcome each; no code, no pseudo-code, no step-by-step
- **DoD** — binary checkboxes, each with an exact verification command + expected output

Rules:
- **Claim strength = proof strength.** "Exact"/"complete"/"durable" claims need a check that distinguishes a real implementation from a partial one that still exits 0.
- Every cited `file:line` verified against current repo state at write time AND again at execution time.
- Vague AC ("should work correctly") is not an AC.
- Acceptance greps: use `git grep -P`, not `-E "\b"` (silently matches nothing here).

## Tracker Correlation (plan ↔ issue)

Every non-trivial plan → one tracker issue (GitHub or other). Keeps work discoverable outside the plans dir.

- Parent spec issue + child sub-issues. Milestones map 1:1 to children.
- Make them with `/to-spec` (parent spec/PRD), then `/to-tickets` (children). User-invoked slash commands (`disable-model-invocation`) — model can't call them. Plan hits `ready` → tell user to run `/to-spec` then `/to-tickets` on the plan file.
- Link both ways: issue # in plan `Tracker:` line; plan path in issue Further Notes.
- Native GitHub sub-issues (real hierarchy, not "Part of #" text) → link via `gh api`.
- `landed` → close parent + children. `blocked` → say so on the issue.

## Critic Gate (mandatory: min 1, max 2 rounds)

1. Dispatch a skeptical fresh-context plan-critic (never the writer). Brief: **attack, don't validate** — verify every claim against the repo (`git grep`/read source), check AC are binary, flag scope creep, false completeness claims, premature abstraction, dangling citations, vague steps. Typed findings only: `{location, issue, severity, suggested fix}`.
2. Fix findings. Dismissals require an explicit written reason.
3. Round 1 had BLOCKER/MAJOR findings → dispatch a SECOND fresh critic to verify the fixes. Round 1 clean → done after one round.
4. **Hard cap: 2 rounds.** Findings still open after round 2 → list them in the plan's Status/notes for the owner and stop; no endless review loops. Set `Status: ready` when open BLOCKER/MAJOR = zero OR the leftovers are explicitly owner-dismissed.

Why min 1 fresh round: single self-review has approved BLOCKERs (a DoD "last duplicate" completeness claim that grep-refuted with 9 hits). Why max 2: unbounded iterate-to-zero loops stall agents.

## Execution & Lifecycle

- Plan = contract during execution: Scope/Non-goals/DoD literal, no drift. Hit a dependency on another plan → STOP and report.
- A plan's "deferred / do NOT remove X" premise can be invalidated by a later-landed dependency — verify the premise against committed code before enforcing it.
- Plan is a living document: update Status and decisions as they change; it is the cross-session source of truth.
- On completion: `Status: landed — <sha>`, tick DoD boxes, close the tracker issue. Then invoke `plan-retire`.

## Red Flags

- "The plan is simple, one critic pass is enough" — two rounds, no exception.
- Writing implementation code/pseudo-code into milestones — that's the implementer's job.
- A DoD bullet with no command — untestable = not done-able.
