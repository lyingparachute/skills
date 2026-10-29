# UI milestones

A milestone that changes UI is done when it looks right in the running app, not when its code lands.

## Build

Before the first UI edit, call the Skill tool with `impeccable`, passing the milestone's UI task and its target files as args. When it routes to `init` because the project has no PRODUCT.md, ask the user first: run `init` now, or build on the existing code.

Run the app, or Storybook only when the app cannot reach the state. Screenshot every changed state at every width the project's breakpoints or the plan name, then run the **break list**:

- empty, loading, error and overflow states
- long text
- narrow viewport
- keyboard only
- every theme

Fix what you find and look again. The milestone's UI is done when every changed state has a screenshot at each of those widths, every break-list case was tried, and the last look found nothing to fix. Keep the final screenshots as files for the report.

## Review a complete surface

A surface is complete when a user can use it end to end: a screen, a flow, or a component. A surface still waiting on a later milestone waits for its review; at the latest, the review runs after the last milestone. Start both reviews in the same step. When the surface lives in a single app window (Electron, Tauri, native), run the audit first and the critique after it, since both drive that window:

- A fresh UI critic subagent calls the Skill tool with `impeccable` and args `audit <surface>`, runs it against the running app, and runs the break list. Its brief carries the surface, how to start the app, and the break list.
- You call the Skill tool with `impeccable` and args `critique <surface>`. Its two assessors are fresh sub-agents, so it is not self-review. Its design questions go to the user.

Findings from both go through `receiving-code-review`, and their fixes land in the current milestone's commit.
