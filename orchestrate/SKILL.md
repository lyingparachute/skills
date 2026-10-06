---
name: orchestrate
description: Execute an accepted ExecPlan, or a feature folder of them, to enterprise level by dispatching a fresh implementer subagent per milestone, a code-judo critic per code milestone, a green gate before every commit, and a whole-branch review at the end. Use for hard/high-token plans where single-agent implement isn't enough.
disable-model-invocation: true
---

# Orchestrate

Execute already-accepted plans, milestone by milestone, to enterprise level. Each milestone: a **fresh implementer subagent** builds it; for a code milestone **one code-judo critic subagent** reviews it on both axes, Standards and Spec, reported as separate lists, and you fix every surviving finding; the **gate** goes green; commit; update the plan. Close out each plan with a whole-branch review and `plan-retire`.

**vs `implement`:** `implement` is the light path - single agent, drives `tdd`/`judo-review` itself. `orchestrate` is the heavy path - a fresh subagent per milestone with a critic loop, for hard plans where you're spending the tokens to get it right. Bulk artifacts move as files, never pasted context, so the controller's window stays clean across a long plan.

Run scripts from this skill's `scripts/` dir. After pre-flight, execute without checking in between milestones; stop only on an unresolvable blocker, genuine ambiguity, a human-gated milestone, the agent cap, or completion.

## Non-negotiables

- Work on the **current branch** - no worktree unless the user asks.
- The plan is the contract: follow **Scope, Out-of-scope, Definition of Done literally**. No drift.
- `AGENTS.md` + `.agents/rules/*.md` override any default behavior. Where the repo names a notes location, a worker-dispatch skill (implementer and fixer models and invocation), or a verification skill (the gate), use it in place of the defaults below.
- The plan is declarative - apply idiomatic code against the **current repo state**. Verify every cited `file:line` before acting.
- Hit a dependency on **another plan** that has not landed → STOP and report; do not implement the other plan's work.
- **No "done" without evidence:** run every DoD verification command and paste its output. No green, no claim.
- Let subagents finish - don't interrupt a dispatched agent.

## Pre-flight

Read every plan in scope once before milestone 1. A feature folder is in scope plan by plan, in its index's build order; every plan's "starts after" must have landed or be earlier in this run, else that plan waits. Then ask the user **one** batched question, always, because it carries the agent cap:

1. **Contradictions** - internal ones, and anything the plan mandates that a review rubric would flag as a defect (finding beside the plan text, asking which governs).
2. **Budget** - `scripts/task-brief PLAN --list` prints each plan's milestone ids. State the expected agent count (implementer + critic per code milestone, plus one per plan close-out) and the worst case (add a fixer and a second critic per code milestone). The user approves a cap; the run stops and reports when the next dispatch would exceed it.
3. **Human gates** - milestones that need a person: a browser check, a real credential or production account, a manual deploy step, an owner decision. List them with when they fall in the run.
4. **Environment** - the services the DoD commands need (local database stack, env files, running app). Probe each with one cheap command; list what is down.

## Per-milestone loop

1. **Record BASE** = current HEAD (`git rev-parse HEAD`), unless `progress.md` holds a `pending-base` from a light milestone: then BASE is that commit.
2. **Brief:** `scripts/task-brief PLAN_FILE ID` → writes the milestone's text plus the plan's binding sections (locked decisions, scope and non-goals, contracts, invariants, definition of done) to a file and prints `wrote <path>: <n> lines`. Exit 3 means the plan has no milestone markers: write the brief yourself in `.orchestrate/task-<ID>-brief.md` with the same two parts, the milestone's text and every binding section.
3. **Dispatch implementer** (fresh subagent, model set explicitly). Dispatch carries: one line on where the milestone fits; the brief path ("read first - your requirements, exact values verbatim"); interfaces/decisions from earlier milestones the brief can't know; your resolution of any ambiguity; the report-file path. The implementer drives `tdd` (red-green-refactor) and `diagnosing-bugs` when something breaks. Never paste prior-milestone history.
4. **Package the diff:** `scripts/review-package BASE HEAD` → prints a file with commit list + stat + `git diff -U10`. **Use the recorded BASE, never `HEAD~1`** - `HEAD~1` silently drops all but the last commit of a multi-commit milestone.
5. **Size the review.** A **code milestone** (any change to code, schema, config, or tests) gets its own critic. A **light milestone** (only docs, glossary, ADR, or plan text) gets none: write `pending-base: <BASE>` to `progress.md` so its diff joins the next code milestone's review package, skip to step 9, and clear the line when that review runs. The close-out review covers a light milestone that is last.
6. **Dispatch one critic** for a code milestone - tell it explicitly to call the Skill tool with `judo-review` and to return **code-judo moves** (concrete rewrite suggestions, not just complaints) on both axes: Standards = clean-code/enterprise quality, Spec = plan compliance. It is a subagent, so it runs both itself and reports them as separate lists, never merged. Give it the brief, report, and review-package paths plus the plan's binding constraints copied verbatim.
7. **Triage the findings yourself**: call the Skill tool with `receiving-code-review` - every finding is a hypothesis, not an order. Confirm each against the code before it reaches the fixer; drop or reframe the wrong ones with a reason. Judge from your own context when you can; only dispatch an explorer subagent when a finding genuinely needs code you haven't read.
8. **Fix every surviving finding** via one fix subagent with the complete list (not one fixer per finding) and that skill's Boy Scout sweep over every file it touches; that skill decides which land in this milestone and which become followup plans. Re-review. Loop until the critic is clean, **max 2 rounds** per `AGENTS.md`; leftovers after round 2 → record in the plan and report, don't loop forever.
9. **Gate** - you run it, no subagent: lint, type check, and the milestone's focused tests. Record the commands and their result in the ledger line. Red → back to step 8 with the failure as the finding.
10. **Commit** the milestone: call the Skill tool with `caveman-commit` (one commit per milestone).
11. **Update the plan:** tick the milestone's checkbox, write its progress; append a ledger line and a decision row.

A **human-gated milestone** runs at its place in the order. Steps 1-8 cover any code it has. Then stop and hand the user the exact check to run. When they report the result, write it into the plan's Surprises & Discoveries, then run steps 9-11 with ledger value `human-checked`.

## Between plans

When a plan in a feature folder lands (after its close-out), sync the **embedded contracts**: find every later plan in the folder that names the landed plan by title, compare each contract it embeds (names, signatures, files, table and column names) with what actually landed, update the later plan where they differ with a Decision Log entry, and commit those plan edits on their own. Contradictions were settled in pre-flight; a sync that changes a decision the user made is a blocker, so stop and ask.

## File handoffs

Anything pasted into a dispatch - or returned by a subagent - stays resident and is re-read every later turn. So: milestone text → brief file; implementer report → report file (returns only status + commits + one-line test summary + concerns); review diff → review-package file. The controller sees paths, not payloads.

## Durable progress

Conversation memory does not survive compaction; a controller that lost its place has re-dispatched entire completed milestones. Track a ledger, not just todos:

- At start, read `.orchestrate/progress.md`. Milestones marked complete are DONE - resume at the first that isn't, in build order.
- After the gate is green, append `<plan file> Milestone <ID>: complete (commits <base7>..<head7>, review clean|light|human-checked, gate green, agents used <total so far>)`. A light line names the milestone whose review covered it once that review runs.
- After compaction, trust the ledger + `git log` over recollection.

Keep running notes for context that is not a decision: repo-state surprises, dead ends, anything the next reader would want and nobody would think to ask about, in `.orchestrate/implementation-notes.md` unless the repo names a notes location.

The `.orchestrate/` files are scaffolding, not history, and are never committed (the workspace script ignores them). The durable record is the plan, its ADRs, `git log`, and any notes file the repo itself tracks.

### The decision row

Every call you make that the plan did not make gets one row in `progress.md`:

```
| plan#milestone | decision | why | evidence | result |
|---|---|---|---|---|
```

**Evidence is a pointer**, never a paragraph: a commit sha, a `file:line`, a review-package path, a test name. Rows are append-only, so a call you later reverse gets a new row superseding the old one and the trail shows the turn instead of hiding it.

Three places can hold a decision, so the order is fixed. The row is the running log during the run. The plan's `Decision Log` is where anything durable lands, and it is the only one that survives close-out. The notes hold context, never decisions.

## Model per role

Least powerful model that can do the role; **always specify it explicitly** (an omitted model inherits the session's - usually the most expensive). Turn count beats token price: cheapest tier only when the plan contains the literal code (transcription) or a single-file mechanical fix; mid-tier floor for critics and prose-spec implementers; most capable for design judgment and the final whole-branch review.

## Critic discipline

- **Fresh context, never the writer.** The subagent that built a milestone never reviews it.
- **Attack, don't validate.** Brief the critic to find what's wrong, not to bless it.
- **Never pre-judge.** No "treat as Minor", "don't flag X", "the plan chose this" in the dispatch - that spoils the gate to skip a loop.
- A **plan-mandated defect is still a finding.** Plan-vs-rubric conflicts are the human's call - present both, ask which governs.

## Close-out (per plan)

1. Whole-branch `judo-review` on the most capable model: `scripts/review-package <plan's first BASE> HEAD`. Triage the findings: call the Skill tool with `receiving-code-review` (self-judge; explorer subagent only when a finding needs unread code), then fix every survivor via one fix subagent with the full list and the Boy Scout sweep. Gate again.
2. Audit the trail: read every decision row back against what happened and cut any row you cannot tie to a real commit, file, or command. A row nobody can trace is worse than a missing one.
3. Fold the surviving rows and any notes worth keeping into the plan's `Decision Log`. The scratch files die with the working tree, so anything not in the plan by now is lost.
4. Set the plan's `Status:` line to `landed - <short sha>`; tick all remaining checkboxes; sync its feature folder index row (see `exec-plan`).
5. Call the Skill tool with `plan-retire` - extract durable decisions, delete the rest.
6. Commit plan progress and update any index that still names the plan (plans-dir index, feature folder `00-INDEX.md`).
7. **Report:** what changed, what tests ran (with output), agents used against the approved cap, any deviation from the plan, any follow-up findings.
8. Follow-up work → write a plan or fold it into a draft or unstarted plan, per `exec-plan`, reviewed by a critic subagent at least once. If a milestone kept bumping into architecture debt - shallow modules, tangled callers, no test seam - offer to run the `improve-codebase` skill on the affected path, with that debt as a suspect, rather than a vague "clean up later". Run it only after the user agrees.

## Red flags

Implementing on main/master without consent · skipping the critic on a code milestone · committing with open findings or a red gate · exceeding the approved agent cap · dispatching parallel implementers (conflicts) · making a subagent read the whole plan (hand it the brief) · re-running a milestone the ledger marks complete · starting a later plan without syncing its embedded contracts · claiming done without pasted DoD output.
