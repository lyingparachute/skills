---
name: implement
description: "Implement a piece of work described by an execution plan."
disable-model-invocation: true
---

Before writing any code, pre-flight the plan: is it **ready** as /exec-plan defines ready (critic gate passed, `Status: ready`)? A plan without that gate is a **draft**, however confident it reads, and a `ready` stamp you didn't witness still deserves a spot-check. If it's a draft, or the `ready` claim doesn't hold up, STOP. Do not implement it. Tell the user plainly what is missing, ask the questions the plan should have answered, and route them to /exec-plan to run the critic gate or /grilling to stress-test it. Implementing a draft faithfully just ships a bad plan, so a silent "looks fine" here is the failure, not the delay.

Once the plan is ready, implement the work it describes. Follow its Scope, Non-goals, and Definition of Done literally, with no drift. Every DoD bullet is a binary check the implementation must satisfy before you call it done.

Keep the plan current as you go: it is the cross-session source of truth, so tick its Progress boxes and update `Status` as work lands. If you hit a dependency on another plan, STOP and report it; do not implement that other plan. A plan's "do NOT remove X" premise can be invalidated by a later-landed change, so verify such premises against committed code before enforcing them.

Use /tdd where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Once done, use /judo-review to review the work: it hunts the code-judo moves that leave the codebase more enterprise-level than before. Handle its findings via /receiving-code-review, which sets what you fix now and what becomes a followup plan. Accept no weak code.

Commit your work to the current branch, then set the plan's `Status` to landed with the commit sha and tick its DoD boxes.

When the work has landed and the review is clean, use /plan-retire to close out the plan - extract durable decisions, delete the rest.
