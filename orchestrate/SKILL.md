---
name: orchestrate
description: Execute an accepted ExecPlan, or a feature folder of them, to enterprise level through a deterministic runner that works in any harness - a fresh implementer agent per milestone, a code-judo critic per code milestone, a green gate before every commit, and a whole-branch review at the end. Use for hard/high-token plans where single-agent implement isn't enough.
disable-model-invocation: true
---

# Orchestrate

Execute already-accepted plans, milestone by milestone, to enterprise level. The **runner** (`scripts/run-plan.mjs`) owns the milestone loop as code, so it runs the same way in Claude Code, OpenCode, Grok, and Codex. You own what needs judgment: pre-flight, every stop, syncing plans in a feature folder, and close-out.

**vs `implement`:** `implement` is the light path - single agent, drives `tdd`/`judo-review` itself. `orchestrate` is the heavy path - a fresh agent per milestone with a critic loop, for hard plans where you're spending the tokens to get it right.

Run scripts from this skill's `scripts/` dir. After pre-flight, let the runner go; act only when it stops.

## What the runner does

Per milestone, in plan order: a fresh **implementer** builds it from the brief that `scripts/task-brief` cuts from the plan. A milestone that changed only `.md` files is **light**: gate, commit, and its diff joins the next code milestone's review. A code milestone gets up to two review rounds. Each round runs the **gate** (your gate commands plus the focused tests the agents named), then one **critic** that loads `judo-review` and returns Standards and Spec findings as separate lists. Then one **triage** agent loads `receiving-code-review` and marks each finding fix-now, followup, reject, or owner-call (real, but the plan mandates it). Only fix-now findings get fixed; the rest become decision rows. Then one **fixer** gets every fix-now finding, plus a red gate or a missing focused test as findings of their own. A round with nothing to fix ends the loop. Findings left after round 2 stop the run. Agents never commit; the runner commits once per milestone with the implementer's message. After the last milestone it runs the same review loop on the whole branch with the **reviewer** role.

Every worker is a fresh headless process of the harness you name, so subagent rules hold: fresh context, never the writer, attack not validate. Workers run with permission prompts off, so they can run any command in the repo. Each reply is JSON checked against a schema. OpenCode gets one repair turn in the same session when its reply is not valid JSON for the schema; the repair turn is the same agent, not a new one.

## Non-negotiables

- Work on the **current branch** - no worktree unless the user asks.
- The plan is the contract: follow **Scope, Out-of-scope, Definition of Done literally**. No drift.
- `AGENTS.md` + `.agents/rules/*.md` override any default behavior. Where the repo names a notes location or a verification skill (the gate), use it in place of the defaults below.
- Hit a dependency on **another plan** that has not landed → STOP and report; do not implement the other plan's work.
- **No "done" without evidence:** run every DoD verification command and paste its output. No green, no claim.

## Pre-flight

Read every plan in scope once. A feature folder is in scope plan by plan, in its index's build order; every plan's "starts after" must have landed or be earlier in this run, else that plan waits. Then ask the user **one** batched question, always, because it carries the agent cap:

1. **Contradictions** - internal ones, and anything the plan mandates that a review rubric would flag as a defect (finding beside the plan text, asking which governs).
2. **Budget** - `scripts/task-brief PLAN --list` prints each plan's milestone ids. Expected agents: 2 per code milestone (implementer, critic), 1 per light milestone, 1 for the close-out. Worst case: 6 per code milestone and 5 for the close-out (critic, triage, fixer, critic, triage). The user approves a cap per plan; the runner stops before the dispatch that would pass it.
3. **Human gates** - milestones that need a person: a browser check, a real credential or production account, a manual deploy step, an owner decision. List them with when they fall in the run.
4. **Environment** - the services the DoD commands need (local database stack, env files, running app). Probe each with one cheap command; list what is down.
5. **Harness and models** - the harness that runs the workers (the one you are in, unless the user says otherwise) and one model per role: implementer, critic, triage, fixer, reviewer. Least powerful model that can do the role: cheapest tier only for transcription or single-file mechanical work; mid-tier floor for critic, triage, and prose-spec implementers; most capable for the reviewer.
6. **Gate commands** - lint and type check for the repo, from its rules file or build config. The runner adds each milestone's focused tests.
7. **Docs as code** - in a repo where `.md` files are the product (a skills repo, a docs site), pass `--review-docs` so no milestone counts as light.

Pre-flight is done when the user has answered every item and the tree is clean.

## Run

Start the runner detached from the repo root, one plan per run:

```
mkdir -p .orchestrate && nohup node <skill>/scripts/run-plan.mjs --plan PLAN \
  --harness opencode|claude|grok|codex --cap N \
  --model implementer=ID --model critic=ID --model triage=ID --model fixer=ID --model reviewer=ID \
  --gate "LINT CMD" --gate "TYPECHECK CMD" [--human-gate ID]... [--accept ID]... \
  [--review-docs] [--agent-timeout-min N] > .orchestrate/run.log 2>&1 &
```

`nohup` and `&` keep it alive after your shell tool returns; in Claude Code the Bash tool's background mode does the same and tells you when it ends. Workers get 90 minutes each; raise it with `--agent-timeout-min N` for big milestones. Poll with `node <skill>/scripts/run-plan.mjs --status`, waiting between polls with a `sleep` shorter than your shell tool's timeout. The status is `running`, `completed`, `stopped` with a reason and detail, or `crashed`.

On a stop, act on the reason, then rerun the same command. The rerun skips completed milestones and picks up the one in progress where it stopped: a failed implementer's partial work goes to a new implementer, and a stop in review resumes the review on the current tree, so your manual fixes get reviewed too. An `--accept` for a milestone that is already done is ignored, so you can keep it in the command.

| Reason | What you do |
|---|---|
| `human-gate` | Hand the user the exact check. Write their result into the plan's Surprises & Discoveries, then rerun with `--accept ID`. |
| `open-findings` | Read the fixes file in the detail. Fix what survives your own `receiving-code-review` triage and rerun, or rerun with `--accept ID` (`--accept close-out` at close-out) when the user takes the rest as is. |
| `blocked` | An agent could not do the brief, it needs another plan first, or a milestone has commits the runner did not make. Settle it with the user; discard partial work or rerun with `--accept ID` as the detail says. |
| `gate-red` | Read the gate log in the detail, fix the cause, rerun. |
| `dirty-tree` | Uncommitted work that no milestone owns. Discard it, rerun. |
| `cap` | Report agents used against the cap; rerun with the cap the user approves. |
| `agent-failed`, `runner-error`, `crashed` | Read the agent log named in the detail, or `.orchestrate/run.log`. Fix the harness, credential, or rate-limit cause, then rerun. |
| `bad-accept` | `--accept` named a milestone that is not in progress; drop it. |
| `plan-format`, `plan-mismatch` | Fix the plan's milestone headings with `exec-plan`, or finish the unfinished plan named in the detail first. |

`--accept ID` tells the runner a person checked the current tree for milestone ID: it runs the gate and commits without another review. The ledger says `human-checked` when the critic had already passed it, else `accepted`, and the next code milestone's review covers an `accepted` diff.

## Between plans

When a plan in a feature folder lands (after its close-out), sync the **embedded contracts**: find every later plan in the folder that names the landed plan by title, compare each contract it embeds (names, signatures, files, table and column names) with what actually landed, update the later plan where they differ with a Decision Log entry, and commit those plan edits on their own. Contradictions were settled in pre-flight; a sync that changes a decision the user made is a blocker, so stop and ask.

## Durable progress

`.orchestrate/` is scaffolding, never committed (the workspace script ignores it). It holds:

- `run-state.json` - the runner's own state: completed milestones, agents used, the milestone in progress, the status. Trust it and `git log` over recollection after compaction. A new plan's run replaces it only once the old plan has completed.
- `progress.md` - one ledger line per completed milestone, and one decision row per finding triage rejected or deferred: `| plan#milestone | decision | why | evidence | result |`. Every call you make that the plan did not make gets a row here too, with evidence as a pointer (a commit sha, a `file:line`, a findings file, a test name), never a paragraph. Rows are append-only; a reversed call gets a new row.
- Briefs, review packages, gate logs, findings, and one log per agent.

Keep running notes for context that is not a decision - repo-state surprises, dead ends - in `.orchestrate/implementation-notes.md` unless the repo names a notes location. Decisions go to rows during the run and to the plan's `Decision Log` at close-out, the only place that survives.

## Close-out (per plan)

The runner has already run the whole-branch review when it reports `completed`.

1. Audit the trail: read every decision row back against what happened and cut any row you cannot tie to a real commit, file, or command. Show the user every `owner-call` row beside the plan text it conflicts with and ask which governs; a finding that governs becomes followup work in step 6.
2. Fold the surviving rows and any notes worth keeping into the plan's `Decision Log`. Followup rows become followup work in step 6.
3. Set the plan's `Status:` line to `landed - <short sha>`; tick all remaining checkboxes; sync its feature folder index row (see `exec-plan`).
4. Load the `plan-retire` skill - extract durable decisions, delete the rest.
5. Commit plan progress and update any index that still names the plan (plans-dir index, feature folder `00-INDEX.md`).
6. **Report:** what changed, every DoD command with its actual output, agents used against the approved cap, any deviation from the plan, any followup findings. Followup work → write a plan or fold it into a draft or unstarted plan, per `exec-plan`, reviewed by a critic subagent at least once. If milestones kept bumping into architecture debt - shallow modules, tangled callers, no test seam - offer to run the `improve-codebase` skill on the affected path, with that debt as a suspect. Run it only after the user agrees.

## Red flags

Implementing on main/master without consent · building a milestone yourself instead of through the runner · `--accept` on a tree nobody checked · raising the cap without the user · starting a later plan without syncing its embedded contracts · claiming done without pasted DoD output.
