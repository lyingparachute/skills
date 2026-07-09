---
name: orchestrate
description: Execute an accepted ExecPlan to enterprise level by dispatching a fresh implementer subagent per milestone, a single code-judo critic per milestone, and a whole-branch review at the end. Use for hard/high-token plans where single-agent implement isn't enough.
disable-model-invocation: true
---

# Orchestrate

Execute an already-accepted plan, milestone by milestone, to enterprise level. Each milestone: a **fresh implementer subagent** builds it, **one code-judo critic subagent** reviews it (spec + quality in one pass), you fix every finding, commit, update the plan. Close out with a whole-branch review and `plan-retire`.

**vs `implement`:** `implement` is the light path — single agent, drives `tdd`/`code-review` itself. `orchestrate` is the heavy path — a fresh subagent per milestone with a critic loop, for hard plans where you're spending the tokens to get it right. Bulk artifacts move as files, never pasted context, so the controller's window stays clean across a long plan.

Run scripts from this skill's `scripts/` dir. Execute the whole plan without checking in between milestones; stop only on an unresolvable blocker, genuine ambiguity, or completion.

## Non-negotiables

- Work on the **current branch** — no worktree unless the user asks.
- The plan is the contract: follow **Scope, Out-of-scope, Definition of Done literally**. No drift.
- `AGENTS.md` + `.agents/rules/*.md` override any default behavior.
- The plan is declarative — apply idiomatic code against the **current repo state**. Verify every cited `file:line` before acting.
- Hit a dependency on **another plan** → STOP and report; do not implement the other plan's work.
- **No "done" without evidence:** run every DoD verification command and paste its output. No green, no claim.
- Let subagents finish — don't interrupt a dispatched agent.

## Pre-flight

Scan the plan once before milestone 1 for internal contradictions and for anything the plan mandates that a review rubric would flag as a defect. Batch every finding into one question to the user (finding beside the plan text, asking which governs). Clean scan → proceed silently.

## Per-milestone loop

1. **Record BASE** = current HEAD (`git rev-parse HEAD`).
2. **Brief:** `scripts/task-brief PLAN_FILE N` → writes the milestone's full text to a file, prints the path.
3. **Dispatch implementer** (fresh subagent, model set explicitly). Dispatch carries: one line on where the milestone fits; the brief path ("read first — your requirements, exact values verbatim"); interfaces/decisions from earlier milestones the brief can't know; your resolution of any ambiguity; the report-file path. The implementer drives `tdd` (red-green-refactor) and `diagnosing-bugs` when something breaks. Never paste prior-milestone history.
4. **Package the diff:** `scripts/review-package BASE HEAD` → prints a file with commit list + stat + `git diff -U10`. **Use the recorded BASE, never `HEAD~1`** — `HEAD~1` silently drops all but the last commit of a multi-commit milestone.
5. **Dispatch one critic** — the `code-review` skill (code-judo: Standards axis = clean-code/enterprise quality, Spec axis = plan compliance, in one pass). Give it the brief, report, and review-package paths plus the plan's binding constraints copied verbatim.
6. **Fix every finding** — including nice-to-haves — via one fix subagent with the complete list (not one fixer per finding). Fixer re-runs covering tests, reports command + output. Re-review. Loop until the critic is clean, **max 3 rounds**; leftovers after round 3 → record in the plan and report, don't loop forever.
7. **Commit** the milestone with `caveman-commit` (one commit per milestone).
8. **Update the plan:** tick the milestone's checkbox, write its progress; append a ledger line.

## File handoffs

Anything pasted into a dispatch — or returned by a subagent — stays resident and is re-read every later turn. So: milestone text → brief file; implementer report → report file (returns only status + commits + one-line test summary + concerns); review diff → review-package file. The controller sees paths, not payloads.

## Durable progress

Conversation memory does not survive compaction; a controller that lost its place has re-dispatched entire completed milestones. Track a ledger, not just todos:

- At start, read `.orchestrate/progress.md`. Milestones marked complete are DONE — resume at the first that isn't.
- On a clean review, append `Milestone N: complete (commits <base7>..<head7>, review clean)`.
- After compaction, trust the ledger + `git log` over recollection.

Keep a running `implementation-notes.md` at the repo root (tracked): decisions you made that weren't in the plan, changes forced by repo state, tradeoffs — anything the reader should know.

## Model per role

Least powerful model that can do the role; **always specify it explicitly** (an omitted model inherits the session's — usually the most expensive). Turn count beats token price: cheapest tier only when the plan contains the literal code (transcription) or a single-file mechanical fix; mid-tier floor for critics and prose-spec implementers; most capable for design judgment and the final whole-branch review.

## Critic discipline

- **Fresh context, never the writer.** The subagent that built a milestone never reviews it.
- **Attack, don't validate.** Brief the critic to find what's wrong, not to bless it.
- **Never pre-judge.** No "treat as Minor", "don't flag X", "the plan chose this" in the dispatch — that spoils the gate to skip a loop.
- A **plan-mandated defect is still a finding.** Plan-vs-rubric conflicts are the human's call — present both, ask which governs.

## Close-out

1. Whole-branch `code-review` on the most capable model: `scripts/review-package $(git merge-base main HEAD) HEAD`. Fix every finding (even nice-to-haves) via one fix subagent with the full list.
2. Set the plan's `Status:` line to `landed — <short sha>`; tick all remaining checkboxes.
3. `plan-retire` — extract durable decisions, delete the rest.
4. Commit plan progress and update the plans index if there is one.
5. **Report:** what changed, what tests ran (with output), any deviation from the plan, any follow-up findings.
6. Follow-up work → author a new ExecPlan per `PLANS.md` (see `exec-plan`), reviewed by a critic subagent at least once. If a milestone kept bumping into architecture debt — shallow modules, tangled callers, no test seam — make that follow-up an `improve-codebase-architecture` pass rather than a vague "clean up later".

## Red flags

Implementing on main/master without consent · skipping the milestone critic · committing with open findings · dispatching parallel implementers (conflicts) · making a subagent read the whole plan (hand it the brief) · re-running a milestone the ledger marks complete · claiming done without pasted DoD output.
