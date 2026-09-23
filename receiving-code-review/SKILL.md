---
name: receiving-code-review
description: "Use when code-review feedback arrives and you are about to act on it: a reviewer's comments, a PR review, inline thread replies, a critic subagent's findings, or a plain \"fix these\" list. Also use when a comment reads as unclear or technically questionable."
---

# Receiving Code Review

A review comment is a **hypothesis**, not an order. It stays **unconfirmed** until you can point at the code and name the defect, and unconfirmed findings do not get implemented.

Agreement is the cheapest reply available and the one most often wrong: a fluent finding reads as true, and fixing it feels like progress while it quietly makes the code worse. Confirming is the work.

The fix is the **receipt**. Acknowledge in diffs and verdicts, so every reply carries a `file:line`, a test result, or a technical counter-argument and nothing else. Technical correctness over social comfort.

## The loop

1. **Read all of it first.** Take in every comment before reacting to any one. Later items reframe earlier ones.
2. **Restate each item** in your own words. Can't restate it → you don't understand it → ask. Ask about *every* unclear item before implementing *any* item, since items are often related and a partial understanding produces a wrong fix; implementing the clear ones while questions hang is how the wrong fix ships.
3. **Confirm the problem against the code.** A finding is confirmed when you can state its defect in your own terms with a pointer: the input that breaks it, the call path that reaches it, the invariant or project rule it violates, or the test that goes red. A quality finding is confirmed when you can point at the cost it puts on a reader or the next change: the name that hides intent, the duplicated literal, the guard in the wrong layer. Plausibility is not confirmation, and the reviewer's confidence is not evidence. A finding fails this gate when source contradicts it: right about the code and wrong about the consequence, or describing a problem the callers already make impossible. Unconfirmed → dismiss it with the reason, or ask; never implement it to be agreeable. Confirmed → it lands (see Disposition). Before shaping the fix in step 4, check what it touches: does it break something working, and is there a reason the current code is the way it is? "Implement it properly" for an endpoint means grep for callers first; if unused, propose removing it (YAGNI) rather than building it out.
4. **Assess the proposed fix separately.** A comment carries a problem *and* a suggested solution; agreeing the problem is real does not mean the suggestion is the best fix. Weigh it against alternatives: is there a simpler, more correct, or more robust option, or a way to improve on what was proposed? Implement the strongest solution, not the one that happened to be typed in the comment.
5. **Reconcile the set.** This is what reading everything first bought you. Findings pull opposite ways (extract this helper / delete this indirection), and honouring them in sequence churns the same lines twice to land somewhere worse than either would. Where two collide, design the one target shape that serves both intents and implement that; where one finding subsumes another, fix the parent and note the child as covered.
6. **Assign a disposition** to each survivor (see below), then respond per item (see below).
7. **Implement one item at a time**, in the order of step 6's dispositions. Each item gets the narrowest test, lint, or type check that covers it, run before you start the next one; that actual output is what licenses `Fixed:`. No batching untested changes.
8. **Boy Scout sweep.** Leave every touched file cleaner than you found it, including lines no finding named. A touched file is one this change or one of its fixes edited. Read each touched file end to end and fix what the review would have flagged had it read those lines: the defect class of any finding in that file, and the smells in [`judo-review/STANDARDS.md`](../judo-review/STANDARDS.md). Each sweep fix preserves behavior and gets its own check, as in step 7. The sweep stays inside touched files; a defect whose fix reaches into other files becomes a `followup-execplan` that names those files. Done when every touched file has a sweep read-back (step 9) and each sweep fix carries its check output.
9. **Account for every finding.** Done means the list is closed, not that the easy items are done. Every finding the review raised reads back as exactly one of `fixed <file:line> + evidence`, `dismissed: <reason>`, `plan: <path>`, or `awaiting: <question>`, and the count going in equals the count coming out. Every touched file reads back as `swept <file>: <fix count>, <plan count>`, and every sweep fix as `scouted <file:line> + evidence`. A finding still carrying no disposition means the loop is running, not finished.

## Disposition

`judo-review` tags every finding with a severity (`BLOCKER`, `MAJOR`, `MINOR`) and a disposition (`merge-blocking`, `followup-execplan`). Feedback arriving without those tags (a human reviewer, a plain "fix these" list) gets them from you before you implement anything.

**Every confirmed finding lands.** Severity orders the work and decides nothing else. A confirmed `MINOR` or nitpick is work you do in this change: naming that reveals intent, a dead branch deleted, a type tightened, a duplicated literal named, a guard moved to the boundary. Severity describes blast radius, not worth. Where the suggested fix is weak, step 4 finds a stronger one; the finding still lands. Low severity, small gain, and "churn" are never dismissal reasons, because a confirmed finding has already shown the code is weaker than it could be.

- **`merge-blocking`** → fix in this change. Order within it: breakage and security first, then trivial fixes (typos, imports), then complex ones.
- **`followup-execplan`** → the remedy is bigger than this change, so it is a plan, not a patch. The size of the remedy decides this, never the severity: a fix that fits in this change lands in this change. Author a new ExecPlan per `/exec-plan`, critic-reviewed at least once, and point structural ones (shallow modules, tangled callers, a missing seam across files) at `improve-codebase-architecture`. A tracked plan, never "clean up later".

## Responding

- **Confirmed** → apply the strongest fix (yours or theirs) and state it: `Fixed: <what changed> in <file:line>`, with the verifying command's output. If you improved on the suggested solution, say how and why.
- **Fails confirmation** → push back with technical reasoning: cite the code, the tests, the build target, the compat constraint. Not defensiveness.
- **You can't confirm it either way** → say so and ask for direction: `Can't confirm this without <X>; investigate, ask, or proceed?`
- **It conflicts with a decision the user already made** → stop and raise it with the user before implementing.
- **You pushed back and were wrong** → state the correction as a fact and move on: `Verified: you're right, <X> does <Y>. Fixing.`

## Trust by source

- **From the user:** trusted; implement once understood. Still ask if scope is unclear.
- **From a critic subagent** (`judo-review`, a plan critic): high signal on structure, blind on context. Its fresh context cannot see decisions already settled in conversation, so what it reads as missing may be deliberate. Verify against the code and the governing plan before acting; its confidence is not evidence.
- **From an external reviewer:** skeptical; run the full loop above before acting. They may not have the whole context.

## Posting a response

Any response that goes back to the reviewer on the remote (a thread reply, a PR/MR comment) is published content: run it through **no-ai-slop** first. That strips the em-dash and the performative filler before it lands where the team reads it.

Always reply to the specific comment being addressed, in its own thread, not as a top-level review comment. This holds whatever the host is (GitHub, GitLab, Bitbucket); use that host's inline-reply mechanism.
