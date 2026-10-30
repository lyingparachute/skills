---
name: implement
description: "Use when the user asks to implement, execute, or build an execution plan in this session."
---

Before writing any code, pre-flight the plan: call the Skill tool with `exec-plan`, then check: is it **ready** as that skill defines ready (critic gate passed, `Status: ready`)? A plan without that gate is a **draft**, however confident it reads, and a `ready` stamp you didn't witness still deserves a spot-check. If it's a draft, or the `ready` claim doesn't hold up, STOP. Do not implement it. Tell the user plainly what is missing, ask the questions the plan should have answered, and route them to /exec-plan to run the critic gate or /grilling to stress-test it. A draft only because findings stayed open after the critic's last round gets one question instead: list each open finding and ask the user to dismiss it, recorded with its reason in the Decision Log, or to revise the plan. A user who already said to implement anyway, or to dismiss them, has answered: record their words as the reason, set `Status: ready`, and start. Implementing a draft faithfully just ships a bad plan, so a silent "looks fine" here is the failure, not the delay.

Once the plan is ready, implement the work it describes. Re-check every cited `file:line` against the current repo before acting on it. Follow its Scope, Non-goals, and Definition of Done literally, with no drift. Every DoD bullet is a binary check the implementation must satisfy before you call it done.

Keep the plan current as you go: it is the cross-session source of truth, so tick its Progress boxes as work lands. `Status` stays `ready` while work runs, becomes `landed` in the last milestone's commit, and becomes `blocked - <reason>` when the run stops short. A milestone that needs another plan that has not landed is blocked; every other milestone still runs, in plan order. When that other plan is `ready`, implement it first and say so. A plan in a feature folder: its index row's "starts after" names those other plans, and its row follows its `Status` (see /exec-plan); when the plan and the index disagree on what waits, say so and ask once. A plan's "do NOT remove X" premise can be invalidated by a later-landed change, so verify such premises against committed code before enforcing them.

Before milestone 1, run the repo's lint, type check, and the tests of the area the plan touches. A red check you did not cause is still yours: fix it now, in its own commit, before milestone 1.

Call the Skill tool with `tdd` and use it where possible, at pre-agreed seams.

Run typechecking and single test files regularly. When the full suite runs is set by the global rules file's focused-tests rule.

Hand independent slices to parallel subagents, all dispatched in one message; you keep the seams between them. When the repo requires it, each parallel writer works in its own worktree; read-only helpers share the checkout.

A milestone that changes UI follows [UI.md](UI.md); read it before the first UI edit.

After each milestone, dispatch a fresh critic subagent that loads `judo-review` to review it; you never review your own code: it hunts the code-judo moves that leave the codebase more enterprise-level than before. Handle its findings by calling the Skill tool with `receiving-code-review`, which sets what you fix now and what becomes a followup plan. Accept no weak code.

Commit to the current branch once per milestone; worktrees only for parallel writers when the repo requires them, or when the user asks. Write the message with `caveman-commit`: exactly one commit after the milestone is complete and verified, holding its slices, tests, docs and review fixes; amend it until work on the next milestone begins. In the last milestone's commit, also tick the plan's DoD boxes.

After the last milestone, a fresh critic subagent runs `judo-review` on the whole branch diff, from the parent of milestone 1's commit; its fixes amend the last milestone's commit. When it returns `APPROVE`, call the Skill tool with `plan-retire` to close out the plan - extract durable decisions, delete the rest. Merge is not required.

Run until the plan is landed or blocked. When blocked, name each open milestone and its blocker.

Report: what changed, every DoD command with its actual output, the final screenshots of every changed UI state, shown as [UI.md](UI.md) says, deviations from the plan, and follow-ups that belong to other plans.
