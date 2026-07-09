---
name: implement
description: "Implement a piece of work based on a spec or set of tickets."
disable-model-invocation: true
---

Implement the work described by the user in the spec or tickets.

Use /tdd where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Once done, use /code-review to review the work. Fix its findings before committing.

Commit your work to the current branch.

When the work has landed and the review is clean, use /plan-retire to close out the plan — extract durable decisions, delete the rest.
