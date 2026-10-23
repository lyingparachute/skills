# Mobile web feel

The platform-layer fixes that make a web app feel installed rather than embedded on a phone. [adapt.md](../adapt.md) owns layout, touch targets, input-method queries, and safe areas; this file holds what it leaves out. Almost every fix is one declaration: reach for a media query, a meta tag, or a CSS property before JavaScript, and gate by capability, never by user agent or screen width.

## Symptoms

| What the user sees | Fix |
| --- | --- |
| Hover state stuck after a tap | Hover styles inside `@media (hover: hover) and (pointer: fine)` |
| Gray or blue flash on tap | `-webkit-tap-highlight-color: transparent`, then an `:active` state on every tappable |
| Layout too tall, bottom button under the URL bar | `100dvh` for app shells, `100svh` for heroes |
| Page zooms into a focused input | Input font size at least 16px |
| Taps feel laggy | `touch-action: manipulation` and feedback on press |
| Pull-to-refresh or page bounce hijacks scroll | `overscroll-behavior` |
| Long-press selects a button label | `user-select: none` on controls only |
| Carousel drags the page vertically | `touch-action` naming the axes the browser keeps |
| Status bar color clashes with the page | `theme-color` per color scheme |

## Fixes

**Sticky hover.** Touch applies `:hover` on the first tap and keeps it. `(hover: hover)` alone lets through styluses and some Android devices; `(pointer: fine)` rules them out. Touch users get press feedback through `:active`.

**Tap highlight.** Set `-webkit-tap-highlight-color: transparent` once on `html`. That removes the only feedback the browser gave, so every tappable element needs its own `:active` state in the same change.

**Viewport height.** `100vh` on mobile is the largest viewport, with the browser chrome collapsed, so it overflows on load. `100dvh` tracks the visible area and suits app shells, drawers, and bottom-pinned UI. `100svh` is the smallest viewport and never shifts mid-scroll, which suits heroes and first screens. Add `interactive-widget=resizes-content` to the viewport meta so the Android keyboard shrinks the layout the way iOS does.

**Input zoom.** iOS Safari zooms into any focused input under 16px and does not zoom back. Fix the font size (`@media (pointer: coarse)` when desktop needs smaller inputs); zoom stays enabled, because `user-scalable=no` and `maximum-scale=1` fail accessibility. Set the keyboard while there: `inputmode="numeric"` for codes, `inputmode="decimal"` for amounts, `type="email"` and `type="tel"`, `autocapitalize="none"` and `autocorrect="off"` on usernames and codes, `enterkeyhint` naming what return does.

**Tap lag.** `touch-action: manipulation` on buttons, links, and `[role="button"]` removes the double-tap-zoom wait. Feedback lands on press: style `:active`, and in JavaScript listen to `pointerdown` for the visual response. A button that reacts on `click` reacts when the finger leaves, which reads as lag at 0ms.

**Overscroll.** `overscroll-behavior: none` on `html, body` for apps with their own scroll areas, drawers, or canvases; leave it off on a scrolling document where pull-to-refresh is welcome. Inner scrollables (sheet content, chat lists, sidebars) take `overscroll-behavior: contain`, which keeps their own bounce and stops the page behind them. A `touchmove` listener calling `preventDefault()` blocks scrolling and costs frames; the CSS property replaces it.

**Selectable controls.** Controls take `user-select: none`, `-webkit-user-select: none`, and `-webkit-touch-callout: none`: buttons, tabs, chips, drag handles. Content stays selectable, so never on `body`; users copy addresses, order numbers, and error messages.

**Gesture axes.** `touch-action` names what the browser may still do. A horizontal carousel takes `pan-y` (the browser keeps vertical scroll); a vertical sheet handle takes `pan-x`; a surface whose gesture owns every axis takes `none`, and only that surface. A native-scroll carousel needs none of this: `scroll-snap-type: x mandatory` on the track and `scroll-snap-align: start` on slides use the browser's own physics.

**Status bar.** One `theme-color` per scheme, matching the color at the very top of the page (the header, not the brand color), plus `<meta name="color-scheme" content="light dark">`. In Next.js, use the `viewport` export's `themeColor` array. A class-based theme switch updates the tag on toggle. A PWA makes the same decision in the manifest's `theme_color` and `background_color`.

## Baseline

For a mobile-facing app, before the first component. Add `overscroll-behavior: none` on `html` too when the app owns its scrolling (see Overscroll).

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content" />
```

```css
html {
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%;
}
input, textarea, select { font-size: 16px; }
button, a, [role="button"] { touch-action: manipulation; }
button, [role="button"] {
  user-select: none;
  -webkit-user-select: none;
}
```

## Verify on hardware

None of these reproduce in desktop device emulation: sticky hover, the tap highlight, the URL bar's effect on height, input zoom, tap delay, overscroll, safe areas, the software keyboard. Run the dev server on `0.0.0.0`, open it by LAN IP on a phone a few years old, and inspect with Safari Web Inspector (iOS) or `chrome://inspect` (Android). Test with the keyboard open, once in landscape, and as an installed PWA when that is a target. Report which fixes were verified from code and which the user must confirm on a device.
