---
name: receiving-code-review
description: Use when reacting to code-review feedback (a reviewer's comments, a PR review, inline thread replies, or a list of "fix these" items) before implementing any of it. Treats each comment as a hypothesis to verify against the codebase, not an order to obey. Trigger it when feedback arrives and you're about to act on it, especially if a comment seems unclear or technically questionable.
---

# Receiving Code Review

A review comment is a **hypothesis**, not an order. Verify it against the code before you touch anything, and let the fix (not agreement) be your acknowledgment. Technical correctness over social comfort.

## The loop

1. **Read all of it first.** Take in every comment before reacting to any one. Later items reframe earlier ones.
2. **Restate each item** in your own words. Can't restate it → you don't understand it → ask, don't guess.
3. **Assess the problem it raises.** No comment is accepted bluntly; every one is critically assessed before you agree. Is the problem real for *this* code? Does following it break something working? Is there a reason the current code is the way it is? "Implement it properly" for an endpoint means grep for callers first; if unused, propose removing it (YAGNI) rather than building it out.
4. **Assess the proposed fix separately.** A comment carries a problem *and* a suggested solution; agreeing the problem is real does not mean the suggestion is the best fix. Weigh it against alternatives: is there a simpler, more correct, or more robust option, or a way to improve on what was proposed? Implement the strongest solution, not the one that happened to be typed in the comment.
5. **Respond per item** (see below).
6. **Implement the verified items one at a time**, testing each: blocking issues (breakage, security) first, then trivial fixes (typos, imports), then complex ones. No batching untested changes.

## Clarify before you start

If *any* item is unclear, ask about those items before implementing *any* of them, since items are often related and a partial understanding produces a wrong fix. Don't implement the clear ones and defer the questions.

## Responding

- **The problem is real** → apply the strongest fix (yours or theirs) and state it: `Fixed: <what changed> in <file:line>`. The changed code is the acknowledgment. If you improved on the suggested solution, say how and why.
- **It's wrong** → push back with technical reasoning: cite the code, the tests, the build target, the compat constraint. Not defensiveness.
- **You can't verify it** → say so and ask for direction: `Can't confirm this without <X>; investigate, ask, or proceed?`
- **It conflicts with a decision the user already made** → stop and raise it with the user before implementing.

No performative agreement. Skip "You're absolutely right", "Great point", "Let me implement now", and every form of thanks; they're noise that signals reflex over evaluation. About to type "Thanks"? Delete it, state the fix instead.

## When you pushed back and were wrong

State the correction as a fact and move on: `Verified: you're right, <X> does <Y>. Fixing.` No long apology, no defending why you pushed back.

## Trust by source

- **From the user:** trusted; implement once understood. Still ask if scope is unclear.
- **From an external reviewer:** skeptical; run the full verification above before acting. They may not have the whole context.

## Posting a response

Any response that goes back to the reviewer on the remote (a thread reply, a PR/MR comment) is published content: run it through **no-ai-slop** first. That strips the em-dash and the performative filler before it lands where the team reads it.

Always reply to the specific comment being addressed, in its own thread, not as a top-level review comment. This holds whatever the host is (GitHub, GitLab, Bitbucket); use that host's inline-reply mechanism.
