# UI milestones

A milestone that changes UI is done when it looks right in the running app, not when its code lands. The user wrote this file to ask for browser checks on every UI milestone, so a UI milestone is always a request for browser work.

## Call impeccable with a command

Call the Skill tool with `impeccable` and args that name the job and the target files. A call with no args shows a menu and waits, so always pass them:

| Job | Args |
|---|---|
| Build or change UI | the task in plain words, then the target files |
| Break it | `harden <target> + fix - stress-test it with worst-case data` |
| Add or fix motion | `animate <target>` |
| Fit other screen sizes | `adapt <target>` |
| Final pass before review | `polish <target>` |
| Technical checks of a complete surface | `audit <surface>` (UI critic subagent) |
| Design review of a complete surface | `critique <surface>` (you) |

Run impeccable's Setup steps in order on the first call: `<impeccable base dir>/scripts/impeccable context`, then the command's reference, then its `reference/craft-floor.md` before any edit. The base dir is the folder that holds impeccable's `SKILL.md`. When it routes to `init` because the project has no PRODUCT.md, ask the user first: run `init` now, or build on the existing code.

## Drive the app

When T3 Code's `preview_*` tools are available, drive the app with them, not with your own browser tooling. Without them, use the browser tools the harness has.

- Open the dev server: `preview_open`, then `preview_navigate` with `target: {kind: "environment-port", port}`.
- Widths: `preview_resize`, `freeform` with a width, or a device `preset`.
- Themes: `preview_set_appearance` with `light` and `dark`.
- Interact: `preview_snapshot` for element refs, then `preview_act` to click, type, scroll, and press keys; `preview_wait_for` until the state shows.
- Screenshot: `preview_snapshot` with `save: true` returns a `screenshotPath`.
- Motion and multi-step flows: `preview_recording_start`, then `preview_recording_stop`.
- Native apps: `device_open`, then `device_screenshot`.
- Parallel subagents each open their own tab with `reuseExistingTab: false` and use its `tabId`.

## Check each milestone

Run the app, or Storybook only when the app cannot reach the state. Screenshot every changed state at every width the project's breakpoints or the plan name. Then break it with the `harden` call above: it maps every rendered value and loads impeccable's worst-case catalog. `+ fix` applies every clear fix without stopping. For each decision it lists with more than one right answer, take its recommendation and record it in the plan's Decision Log; ask the user only when the choice changes product behavior. Its worst-case fixture joins the milestone's tests or stories; a dev-only toggle it adds is removed before commit. On top of that, check this **break list**:

- empty, loading, error and overflow states
- long text
- narrow viewport
- keyboard only
- every theme

Fix what you find and look again. The milestone's UI is done when every changed state has a screenshot at each of those widths, every break-list case was tried, and the last look found nothing to fix.

## Show the result

Show each final screenshot in chat as an image with its absolute path: `![<state> at <width>px](/absolute/path.png)`. For a component smaller than the viewport, add a close-up of the component, so its details read clearly. Show a recording the same way when motion is part of the change.

## Review a complete surface

A surface is complete when a user can use it end to end: a screen, a flow, or a component. A surface still waiting on a later milestone waits for its review; at the latest, the review runs after the last milestone. Start both reviews in the same step, except for a surface in a single app window (Electron, Tauri, native): there the audit runs first and the critique after it, since both drive that window.

- A fresh UI critic subagent calls the Skill tool with `impeccable` and args `audit <surface>`, runs it against the running app, and runs the break list with the worst-case values from `reference/details/worst-case-catalog.md` in impeccable's base dir, changing no code. Its brief carries the surface, how to start the app, the break list, and the path to this file.
- You call the Skill tool with `impeccable` and args `critique <surface>`. Its two assessors are fresh sub-agents, so it is not self-review. Its design questions go to the user.

Findings from both go through `receiving-code-review`, and their fixes land in the current milestone's commit.
