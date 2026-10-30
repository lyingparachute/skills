# Interaction details

How a click, press, hover, or drag commits, how undo and autosave behave, and which surface a choice belongs in. Load it when designing menus, tooltips, deletes, saves, or the choice between popover, modal, toast, and page. Motion values for these live in [motion.md](motion.md).

## Clicks and presses

- **Wait for a second click only when needed.** Add a click delay only when one target has both a single-click and a double-click action. Wait the platform double-click time: Windows defaults to 500 ms (Microsoft). The 300 ms and 700 ms values from the source have no outside source. Do not use them.
- **Non-competing actions get no delay.** When a single click highlights and a double click edits, the first click does its job at once.
- **Move a competing action off the target.** A secondary action such as rename can move to a detail screen. The click delay goes away, but inline multi-level editing is lost. Ask the user before choosing this.
- **Standard buttons act on release.** Fire on the click (mouseup), not on mousedown, so dragging off the button cancels the action (WCAG 2.5.2).
- **Menu items commit on release.** Releasing outside every option cancels, and a press alone runs no action (WCAG 2.5.2).
- **Hold-to-switch shortcuts commit on release.** For a Cmd+Tab style switcher, commit on key release and cancel on Esc.
- **Shortcuts show their result at once.** Show the state change (selected, toggled, panel open) with no animation. Only a rare shortcut, or a surface that teaches shortcuts, may animate its result. Frequent shortcuts stay instant (motion.md).

## Menus and tooltips

- **Safe triangle.** Draw a triangle from the pointer to the top and bottom edges of an open submenu. Keep the submenu open while the pointer stays inside the triangle.
- **Switch items by speed.** Outside the triangle, switch to the new item at once. Inside it, a slow pointer switches to the adjacent item, and a fast pointer keeps the submenu open. No source gives a speed cutoff. Tune it by testing.
- **Edge-hover reveal.** Expand a collapsed edge panel only after the pointer holds on the edge for a set time. A fast pass across the edge does not open it. No source gives the hold time, so set it with the user.
- **Tooltip delay.** Show a tooltip after about 500 ms of hover, not 1000 ms (GitLab Pajamas, Microsoft).
- **Neighbour tooltips.** Once one tooltip is open, a neighbouring trigger opens its tooltip with no delay and no animation, if the pointer reaches it within about 300 ms of leaving the last one (Radix).
- **Keyboard focus shows at once.** A focused trigger shows its tooltip with no delay.
- **Leave hides at once.** Mouse leave hides the tooltip at once, unless the pointer moves onto the tooltip (WCAG 1.4.13).
- **Escape and focus loss hide.** Escape or focus loss hides the tooltip, with no auto-hide timer (WCAG 1.4.13).

## Drag and edge scroll

- **Show the drop target.** When a drag nears the edge of a scrollable area, show where the item will land.
- **Scroll by proximity.** Scroll speed rises as the pointer gets closer to the edge. The scroll zone is a gradient, not a fixed band.

## Undo, delay, and autosave

- **Remove first, then offer undo.** For a routine destructive action, remove the item at once and show an Undo toast. Do not open a confirmation dialog for routine actions (NN/g).
- **Keep the undo window whole.** The undo toast stays for the full window, 5 s by default. Gmail offers 5, 10, 20, or 30 s (Gmail). Pause the timer while the toast is hovered or focused. The item stays recoverable after the toast closes, for example in Trash.
- **Recently Deleted instead of undo.** A Recently Deleted area keeps items for a retention window. The source uses 30 days. The window is a product policy, so ask the user before setting it.
- **Report done at once.** Show the action as complete at once, even while the real action waits.
- **Hold the real action in a buffer.** For an action that leaves the system, such as sending mail, hold the real action so the user can cancel. Gmail holds sent mail for 5 s by default (Gmail). Use the same window as undo.
- **Autosave replaces Save and Cancel.** Where the system can save safely, autosave and show the saved state at all times (Fluent 2). Use an explicit Save for multi-select and for commits that must validate together (Primer).
- **Pair autosave with version history.** Version history lets a rare bad edit roll back in one step.

## Choosing a surface

| Need | Surface |
| --- | --- |
| Edit or create in place | Inline, or a non-modal side panel |
| A small choice tied to one control | Popover anchored to its trigger |
| Context must stay visible while the user works | Non-modal side panel or drawer (NN/g) |
| Critical warning, data loss, or irreversible action | Modal (NN/g) |
| Short input the user must give to continue a process they started | Modal (NN/g) |
| Outcome of an action, with an optional undo | Toast |
| Error the user must act on | Inline or dialog, never a toast |
| Deep context with its own URL, or a long task with steps | Page |

- **Modal scope.** Modals are for critical warnings, data loss, irreversible actions, and short input needed to continue a process the user started (NN/g). Examples: confirming bulk email to 10,000 recipients, or a transfer amount. Create and edit forms stay inline or in a non-modal side panel, so the page stays visible.
- **Modal waits for a choice.** A modal for a critical action waits for an explicit button click. Name the action on each button. Clicking outside does not dismiss it.
- **Hidden layers are designed states.** Design every drawer and modal as a state. Name its trigger, its close path, and the element that gets focus on close.
- **Popover scope.** Use a popover for simple, non-blocking context, such as display settings. Clicking outside dismisses it, but only when closing loses nothing. Otherwise keep it open, or use a modal.
- **Popover over redirect.** Put an infrequent secondary workflow, such as sharing permissions, in a popover instead of a separate page. Anchor the primary sub-action, such as a search input, at the top of the popover.
- **Toast scope.** A toast with no action carries a transient outcome. It auto-dismisses in about 4-10 s (Material).
- **Toast after a modal.** After a modal confirms a change, show a toast with the outcome. The modal hid the page, so the user needs the confirmation.
