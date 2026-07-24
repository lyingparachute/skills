---
name: implement
description: "Implement a piece of work described by an execution plan."
disable-model-invocation: true
---

Before writing any code, pre-flight the plan: is it **ready** as /exec-plan defines ready (critic gate passed, `Status: ready`)? A plan without that gate is a **draft**, however confident it reads, and a `ready` stamp you didn't witness still deserves a spot-check. If it's a draft, or the `ready` claim doesn't hold up, STOP. Do not implement it. Tell the user plainly what is missing, ask the questions the plan should have answered, and route them to /exec-plan to run the critic gate or /grilling to stress-test it. Implementing a draft faithfully just ships a bad plan, so a silent "looks fine" here is the failure, not the delay.

Once the plan is ready, implement the work it describes. Follow its Scope, Non-goals, and Definition of Done literally, with no drift. Every DoD bullet is a binary check the implementation must satisfy before you call it done.

Use /tdd where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Once done, use /judo-review to review the work — it hunts the code-judo moves that leave the codebase more enterprise-level than before. Fix **every** finding before committing, nice-to-haves included; accept no weak code.

The only findings you don't fix now are ones too big for this change. Never drop them: for each, author a new ExecPlan per PLANS.md (see /exec-plan), reviewed by a critic subagent at least once. A `followup-execplan` finding lands as a tracked plan, never as "clean up later".

Commit your work to the current branch.

When the work has landed and the review is clean, use /plan-retire to close out the plan — extract durable decisions, delete the rest.
