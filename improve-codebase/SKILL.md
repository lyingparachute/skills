---
name: improve-codebase
description: Use when the user asks to audit a whole codebase or path for smells and friction, or when plan-feature needs a prep sweep of a feature's path. Heavy: dozens of subagents.
---

# Improve Codebase

A **sweep**: explore everything in scope, report only what clears the **cut line**.

Input: an optional path (default: the whole repo), optional **suspects**, known problems the user or another skill already named, and an optional map from the caller.

A sweep run by `plan-feature` is a **prep sweep**. It talks only to `plan-feature`: steps 1 and 4 say what changes, and it returns the report path after step 4. A prep sweep never hands off to `plan-feature`.

## The cut line

A finding clears the cut line on one of two lenses:

- **Code quality**: a smell or a code-judo move, judged by the `judo-review` skill.
- **Impact**: a task a user or developer feels: a user workflow with extra steps, the dev loop (setup, build and test time, flaky tests), the release path (CI, deploy, versioning), or reliability and speed a user notices. A finding that fits both lenses is one finding under Impact.

A finding names one concrete task or change that the problem makes worse, and the evidence that shows it. A finding that goes against an ADR governing its area clears the cut line only when the friction is enough to reopen that ADR. The finding says so.

Every finding carries these fields:

- **Title** and **lens**.
- **Who and when**: who is affected, the trigger, and what happens today.
- **Observed**: `path:line` as it reads now, callers, state, and any reproduction or measurement.
- **Inferred**: behavior and benefits that follow from the observed facts but were not seen or measured.
- **Change**: the smallest change that fixes it, named as a structural move where one exists.
- **Cost**: the main trade-off.
- **Scores**, each 1-3: frequency (how often the task or the code path is hit), severity (how much worse it is today), effort (size of the change).

## Steps

### 1. Map

Dispatch one read-only mapper subagent. Given a map from the caller, it skips the `zoom-out` run and the rule-file reading, and still does the rest of this step. Otherwise it runs the `zoom-out` skill and reads the rule files plus the `CONTEXT.md` and ADRs that govern each part.

The mapper cuts the scope into **areas** of about 5,000 lines each. Tests belong to the area of the code they test. In a monorepo, an area never spans two packages. When the scope is the repo root, add one **repo area** for everything outside source: root config, CI, build and release scripts, docs. List the **cross-area calls**: calls from one area into another through its public interface or shared state, with the files on both sides.

More than 12 areas → ask the user to narrow the scope or approve hunting in waves of 12. A prep sweep hunts in waves of 12 without asking.

Done when every file in scope belongs to exactly one area, and generated, vendored, and build-output paths are listed as excluded.

### 2. Hunt

Dispatch in parallel:
- one hunter per area
- one cross-area hunter per 20 cross-area calls, in the last wave
- one hunter per suspect, which turns the suspect into a full finding or reports it not found

Area hunters leave cross-area calls to the cross-area hunters. The brief for every hunter:

- Both lenses, the cut line, and the finding fields, copied verbatim from above.
- Run the full `judo-review` workflow on the scope as named code, with four changes: skip the Spec axis, report in the finding fields above in place of its Output, name the structural move from its Preferred Remedies in the finding itself, and return findings only, since step 5 owns handoffs to other skills.
- At most 10 findings, ranked by frequency times severity. A smell with no concrete task behind it goes to the candidates list.
- Read-only on the repo: no file edits, no agents. Commands that only read, and tests or benchmarks that write only to a temp dir, are allowed.
- Return the findings, a one-line list of candidates below the cut line, and the list of files read.

Done when every hunter has returned all three lists, and every file of each area is listed as read or named as skipped with a reason.

### 3. Verify twice

Two fresh verifier subagents check each finding, in order. Neither of them raised it. Give each verifier at most 8 findings, plus the cut line and the finding fields. Verifiers are read-only, like hunters.

1. **Truth check**: re-read the cited source and try to disprove the finding. Confirm that everything under Observed was actually seen, and mark each Inferred item as supported or unsupported. Verdict: `CONFIRMED`, `CORRECTED` with fixed fields, or `REFUTED`. A refuted finding stops here.
2. **Worth check**, on confirmed and corrected findings: does it clear the cut line, and does the change pay for itself and its upkeep? Verdict: `KEEP` or `BELOW CUT` with the reason.

Done when every finding has a truth verdict, and every finding that was not refuted has a worth verdict.

### 4. Rank and report

Merge kept findings that share a root cause into one; this is the only place findings merge. Rank by frequency times severity, highest first, then by effort, lowest first, then by risk of the change.

Write the report to `${TMPDIR:-/tmp}/improve-codebase-<YYYYMMDD-HHMM>.md`. It holds:
- every kept finding in full, in rank order
- below-cut items, with one line each: hunter candidates plus worth-check rejects
- refuted findings, with one line each
- the area list, so coverage is visible

Show the top 10 in the conversation with the report path and the number of kept findings past rank 10. A prep sweep returns the report path to `plan-feature` instead.

Done when every finding from steps 2 and 3 appears exactly once in the report: kept, below cut, refuted, or named as merged into another. No kept findings → show coverage and the below-cut list, and end the sweep. A prep sweep with no kept findings still returns the report path.

### 5. Plan the picks

A prep sweep never reaches this step.

Ask which findings to plan, and stop until the user answers. Ask where plans live if the repo has no plans dir. Each picked finding gets its own plan, unless the user groups some. A group's plans share a feature folder, per `exec-plan`; you name it, write its index, and assign each `NN` before dispatching writers.

A **user-facing pick** is one whose Change alters a user-visible flow, or an API or data format that people or systems outside this repo depend on. Ask the user which user-facing picks go to the `plan-feature` skill, which decides product behavior and scope itself, and stop until they answer. Each confirmed group the user names, otherwise each confirmed pick, gets one `plan-feature` run with its findings, this report, and the plans dir as a handoff.

For each other pick, unconfirmed user-facing picks included, first make the fold call from the `exec-plan` skill yourself, asking the user once about all `ready` targets. Picks that share a target go to one writer. A writer subagent then drafts the new plan or the fold, with the target or "new plan" named in its brief. The plan copies its findings' evidence in, because the report lives in a temp dir. Each plan names the other plans it depends on. You run the `exec-plan` critic gate on each draft, with critics that did not write it, and send the findings back to the writer to fix.

Done when every picked finding maps to exactly one plan or one finished `plan-feature` run, and every plan written or folded here has passed the critic gate. Then name `implement` or `orchestrate` as the next command for the user to type; for `plan-feature` plans, only after the user confirms the assumptions the first plan rests on.
