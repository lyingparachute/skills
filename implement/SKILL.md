---
name: implement
description: "Use when the user asks to implement, execute, or build an execution plan in this session."
---

Before writing any code, pre-flight the plan: call the Skill tool with `exec-plan`, then check: is it **ready** as that skill defines ready (critic gate passed, `Status: ready`)? A plan without that gate is a **draft**, however confident it reads, and a `ready` stamp you didn't witness still deserves a spot-check. If it's a draft, or the `ready` claim doesn't hold up, STOP. Do not implement it. Tell the user plainly what is missing, ask the questions the plan should have answered, and route them to /exec-plan to run the critic gate or /grilling to stress-test it. Implementing a draft faithfully just ships a bad plan, so a silent "looks fine" here is the failure, not the delay.

Once the plan is ready, implement the work it describes. Re-check every cited `file:line` against the current repo before acting on it. Follow its Scope, Non-goals, and Definition of Done literally, with no drift. Every DoD bullet is a binary check the implementation must satisfy before you call it done.

Keep the plan current as you go: it is the cross-session source of truth, so tick its Progress boxes and update `Status` as work lands. If you hit a dependency on another plan, STOP and report it; do not implement that other plan. A plan in a feature folder: every plan in its index row's "starts after" must have landed, and its row follows its `Status` (see /exec-plan). A plan's "do NOT remove X" premise can be invalidated by a later-landed change, so verify such premises against committed code before enforcing them.

Call the Skill tool with `tdd` and use it where possible, at pre-agreed seams.

Run typechecking and single test files regularly. The full suite is CI's job.

Hand independent slices to parallel subagents, all dispatched in one message; you keep the seams between them.

A milestone that changes UI is done when it looks right in the running app, not when its code lands. Before the first UI edit, call the Skill tool with `impeccable`, passing the milestone's UI task and its target files as args. Run the app, or Storybook only when the app cannot reach the state, and screenshot every changed screen at the widths it ships at. Then try to break it: empty, loading, error and overflow states, long text, narrow viewport, keyboard only, every theme. Fix what you find and look again until it is pixel-perfect. Keep the final screenshots as files for the report.

When a UI surface is complete - a screen, flow, or component a user can use end to end - review it twice. Dispatch a fresh UI critic subagent that calls the Skill tool with `impeccable` and args `audit <surface>`, runs it against the running app, and tries to break the surface. Then call the Skill tool with `impeccable` and args `critique <surface>` yourself: its two assessors are fresh sub-agents, so it is not self-review, and the design questions it asks go to the user. A surface still waiting on a later milestone waits for its review too; at the latest, the review runs after the last milestone. Findings from both go through `receiving-code-review` like the code critic's, and its fixes land in the current milestone's commit.

Once done, dispatch a fresh critic subagent that loads `judo-review` to review the work; you never review your own code: it hunts the code-judo moves that leave the codebase more enterprise-level than before. Handle its findings by calling the Skill tool with `receiving-code-review`, which sets what you fix now and what becomes a followup plan. Accept no weak code.

Commit to the current branch, with no worktree unless the user asks, once per milestone, writing the message with `caveman-commit`: exactly one commit after the milestone is complete and verified, holding its slices, tests, docs and review fixes; amend it until work on the next milestone begins. When the last milestone is committed, set the plan's `Status` to landed with the commit sha and tick its DoD boxes.

When every milestone is committed and the critic subagent's `judo-review` verdict is `APPROVE`, call the Skill tool with `plan-retire` to close out the plan - extract durable decisions, delete the rest. Merge is not required.

Report: what changed, every DoD command with its actual output, the final screenshots of every changed UI state as image paths, deviations from the plan, and follow-ups that belong to other plans.
