---
name: implement
description: "Implement a piece of work based on a spec or set of tickets."
disable-model-invocation: true
---

Implement the work described by the user in the spec or tickets.

Use /tdd where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Once done, use /code-review to review the work — it hunts the code-judo moves that leave the codebase more enterprise-level than before. Fix **every** finding before committing, nice-to-haves included; accept no weak code.

The only findings you don't fix now are ones too big for this change. Never drop them: for each, author a new ExecPlan per PLANS.md (see /exec-plan), reviewed by a critic subagent at least once. A `followup-execplan` finding lands as a tracked plan, never as "clean up later".

Commit your work to the current branch.

When the work has landed and the review is clean, use /plan-retire to close out the plan — extract durable decisions, delete the rest.
