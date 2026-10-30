# macOS utilities and windows

Window, utility, and quick panel rules for Mac apps. Load it when building or reviewing a macOS window, quick panel, or utility. These rules are Operate.

## Utilities outside the main window

- Put an on-demand utility outside the main window, as a floating popover, a drawer, or a hotkey overlay. It appears when called and gets out of the way after its action.

## Quick panels

- Remove the traffic lights from a transient quick panel.
- A quick panel holds only a drop zone, one input, and action buttons with shortcut hints. It may use the system window material (Apple HIG). Custom glass needs a glass world.
- On Enter, collapse the panel into a compact toast while the save keeps running. Toast timing follows [interaction.md](interaction.md). An error the user must act on stays inline in the panel (Material).

## Window layout

- Lay out a utility window in three zones: a top bar for global actions, a left sidebar for navigation, and a center canvas for content.
- Place the traffic lights in the top bar or the sidebar, as layout elements.
- Global actions sit in the top bar, right of the traffic lights. Keep the area around the traffic lights clear of controls. The bar is about 50 px tall (starting value: match the real title bar height).

## Text size

- Set the base text at 13 pt on macOS (Apple HIG). iOS body text is 17 pt, so do not copy phone sizes into a Mac window.

## Single-screen utilities

- Use a collapsible floating search bar at the bottom and a right-side slide-out preview. Do not navigate to a new page for a preview.

## Drag in and out

- Accept dragged files on the quick-save drop zone.
- Let saved assets drag out of the canvas into other apps, such as Finder or Figma.
- Put a floating action bar in the preview panel with Copy, Find, Delete, and Share.
