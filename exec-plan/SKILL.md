---
name: exec-plan
description: Use when authoring, folding into, or revising an execution plan, or deciding whether a plan is ready to execute - including writing acceptance criteria, scoping milestones, and running plan-critic review rounds.
---

# Exec Plan

Author plans as self-contained briefs, alone or in a feature folder (see Feature folder), then gate them through **1–2 fresh-context critic rounds** (min 1, hard cap 2) before execution. A plan with zero critic rounds is a draft, not a plan.

`<plans-dir>` is wherever the project keeps plans (e.g. `.agents/plans/`, `docs/plans/`).

Start every new plan from [`TEMPLATE.md`](TEMPLATE.md): it is the skeleton, and each section's placeholder says what belongs there. Run `scripts/check-plan-format <plan>` before any critic round: a plan that fails it is not ready for review. A repo may add its own plan rules (for example a `PLANS.md` in its plans dir); they apply on top of this skill.

## Plan Shape (contract)

A plan is a brief for a senior dev with zero background. Required sections:

- **Status:** line (`draft` → `ready` → `landed - <sha>` / `blocked - <reason>`)
- **Tier** line, when the product sells plans: the plan or capability key that gates this work (or "all plans") and why it belongs there, by the repo's placement rule. No `ready` without it
- **Background / why now** - problem, evidence, what happens if deferred
- **User stories** - the feature from the user's perspective, as `As an <actor>, I want <capability>, so that <benefit>`. The scope-completeness check: a capability with no story is out of scope until one exists. Internal/refactor work with no external actor → say so and skip
- **Scope + Non-goals** - explicit exclusions kill drift
- **Locked decisions** - module boundaries, patterns, public API shape, data model, dependency direction, security sources. All architecture locks HERE; the implementer gets tactics only (naming, control flow, test layout)
- **Alternatives considered** - and why rejected
- **Invariants / risks / open questions**
- **Milestones** - vertical tracer-bullet slices: each cuts a narrow but complete path through every layer (schema, API, UI, tests), is demoable on its own, and fits one fresh context window. One concern, one verifiable outcome; no code, no pseudo-code, no step-by-step. All sit under one `## Milestones` section; each opens with the heading `### Milestone N - <title>` (numbered from 1, plain hyphen, short sentence-case title), with sub-parts under `####`, so `orchestrate` can extract it. No other milestone form; `scripts/check-plan-format` enforces it
- **Progress** - mandatory checkbox list (`- [ ]` / `- [x] (timestamp)`) tracking granular work. This is the tracker: the assistant ticks boxes as it goes, splits a half-done item into "done / remaining" at every stopping point, and the plan file stays the single source of truth. No external issue tracker
- **DoD** - binary checkboxes, each with an exact verification command + expected output

Rules:
- **Novice reader.** The implementer has only the working tree and this one file: no memory, no earlier plans, no chat. Repeat every assumption, define every term that is not ordinary English where it first appears, and embed needed outside knowledge in your own words, never as a link. A checked-in plan it builds on is named by title; an unchecked one is summarized in Background.
- **Outcome first, decided, in prose.** Lead with what a user can do afterwards and how to see it. Resolve every ambiguity in the plan and say why; leave the implementer tactics only. Write prose; lists only where they are the content (Progress, DoD, user stories).
- **Living document.** Progress is updated at every stopping point, with partly done items split into done and remaining. Every decision goes to the Decision Log with its rationale, every surprise to Surprises & Discoveries with short evidence, and the Outcomes & Retrospective is written at completion. Each revision updates every section it touches and adds a dated note at the bottom saying what changed and why. Restarting from only the plan must always work.
- **Prototype the unknowns.** A risky unknown (a library's behavior, feasibility, performance) gets its own milestone labeled prototyping, with how to run it and the criteria to promote or discard it, before the milestones that depend on it.
- **Test at the fewest, highest seams.** Prefer an existing seam to a new one; the ideal count across the change is one. Name the seam(s) and any prior art (similar tests in the codebase) so the implementer tests external behavior, not internals.
- **Claim strength = proof strength.** "Exact"/"complete"/"durable" claims need a check that distinguishes a real implementation from a partial one that still exits 0.
- Every cited `file:line` verified against current repo state at write time AND again at execution time.
- Vague AC ("should work correctly") is not an AC.
- Acceptance greps: use `git grep -P`, not `-E "\b"` (silently matches nothing here).
- **Wide refactors break vertical slicing.** A mechanical change with cross-codebase blast radius (rename a column, retype a shared symbol) can't land green as one tracer bullet. Sequence expand–contract: first a milestone that adds the new form beside the old (nothing breaks); then migrate call sites in batches sized to the blast radius (per package/dir), each its own milestone, CI green throughout because the old form stays; finally a contract milestone that removes the old form once no caller remains.

## Fold before you write

**Fold** = add work to an existing plan as new milestones. Check before any new plan. Caller already named a target or said "new plan" → use that, skip the search. Writer subagents never make the fold call or ask the user.

- **Find:** `grep -r` (not `git grep`; plans may be untracked) `Status:` in every plan under `<plans-dir>`, feature folders too, skipping `00-INDEX.md`. Candidate = `draft` or `ready`, no ticked Progress box, Scope or Purpose names a file, module, or capability the work touches.
- **Fit = all:** plan stays one outcome that can land alone, said in one sentence; not a Non-goal; every Locked decision still holds; each new milestone fits one context window. New milestones go last unless they must go first.
- **Pick:** two fit → the one covering more work. `ready` target → user agrees first (accepted, maybe running). Parallel writers → top agent decides. Inside `plan-feature` → its index decides, skip this.
- **Fold:** update every touched section, add a Decision Log entry and a revision note. Target in a feature folder → update every index section that names it. `Status: draft`, critic gate from round 1, critics attack new milestones, seams, and any section that still reads as before the fold. Tell user which plan changed.
- **No fit:** new plan, candidates read + reason under Alternatives considered, or "none found".

Depends on another plan → name it by title while checked in, else say in Background what it changed.

Done when work sits in exactly one plan, the gate ran on it, and it records the fold in its Decision Log or the candidates (or "none found") in Alternatives considered.

## Feature folder

**Feature folder** = related plans for one feature; each plan lands on its own. Order: fold first; no fit and a folder exists → new plan goes in it.

- **When:** a second plan for the same user outcome is written → make the folder, move the first plan in as `01-<topic>.md` with its Status kept, and write the index from both. Every `plan-feature` run makes one. In parallel runs the top agent makes the folder, the index, and each `NN` before dispatching writers.
- **Layout:** `<plans-dir>/<feature>/00-INDEX.md`, plus `NN-<topic>.md` per plan. `NN` = creation sequence (highest + 1), set once, never renumbered, gaps fine. Order lives in "starts after", not in `NN`.
- **Index (minimum):** Status; why the feature exists; plans table (`NN` + title, delivers, status, starts after); feature decisions; roadmap fit (related plans outside the folder); feature DoD (checklist for the whole set, each item with a command and expected output). Index adds no work of its own; plans stay self-contained. `plan-feature` adds its sections on top.
- **Status sync:** the plan's `Status:` line is the source; the index status column copies it. Whoever changes a plan's Status updates its row and the index Status, a one-line summary of the rows (`active - 01, 02 ready; 03 blocked`), and ticks feature DoD items it proved.

One plan, no feature folder → `<plans-dir>/<date>-<topic>.md`.

## Critic Gate (mandatory: min 1, max 2 rounds)

1. Dispatch a skeptical fresh-context plan-critic (never the writer). Brief: **attack, don't validate**, across two passes.
   - **Rigor pass:** verify every claim against the repo (`git grep`/read source), check AC are binary, flag scope creep, false completeness claims, premature abstraction, dangling citations, vague steps.
   - **Architecture pass:** first call the Skill tool with `zoom-out` to map the planned change against existing modules, callers, and domain concepts, then call it with `judo-review` and apply the code-judo lens to the plan's Locked decisions and boundaries. Hunt the design-judo move to make before code exists: a layer or abstraction the plan invents that could be deleted, a concern the plan puts in the wrong module, bespoke logic duplicating a canonical domain concept, or a state model that will spawn conditionals. Prefer the design that feels inevitable in hindsight and holds the fewest concepts (deep-module vocabulary: /codebase-design).

   Typed findings only: `{location, issue, severity, suggested fix}`.
2. Fix findings. Dismissals require an explicit written reason.
3. Round 1 had BLOCKER/MAJOR findings → dispatch a SECOND fresh critic to verify the fixes. Round 1 clean → done after one round.
4. **Hard cap: 2 rounds.** Findings still open after round 2 → list them in the plan's Status/notes for the owner and stop; no endless review loops. Set `Status: ready` when open BLOCKER/MAJOR = zero OR the leftovers are explicitly owner-dismissed.

Why min 1 fresh round: single self-review has approved BLOCKERs (a DoD "last duplicate" completeness claim that grep-refuted with 9 hits). Why max 2: unbounded iterate-to-zero loops stall agents.

## On-demand critique

When the user asks to review or critique an existing plan (rather than author one), be a skeptical senior engineer: every claim is a hypothesis, verified against code before you agree. No preamble, no restating the plan. Three sections, in order:

1. **Should this be done?** Verdict (do / defer / drop), the single strongest reason, and the alternative being given up.
2. **What we get.** Concrete outcomes, user-visible behavior, debt removed. Separate real value from nice-to-have; quantify or flag as unmeasurable.
3. **What to improve.** Ordered by impact: Gaps (unstated assumptions, missing AC, hand-waved steps), Risks (failure modes, rollback, blast radius, dependencies), Scope (cut/split/premature), Verification (how each step is proven).

Quote the plan on disagreement; cite `file:line` for reality. If the plan is fine, say so plainly; don't invent problems.

## Execution & Lifecycle

Once `Status: ready`, the baton passes out of this skill (a fold sends it back to `draft`): /implement executes the plan as a contract and keeps its Status, Progress, and DoD current; /plan-retire closes it out. This skill's job ends at `ready`.

## Red Flags

- "The plan is simple, one critic pass is enough" - two rounds, no exception.
- Writing implementation code/pseudo-code into milestones - that's the implementer's job.
- A DoD bullet with no command - untestable = not done-able.
- "This is new work, it needs its own plan" - search for a fold target first.
