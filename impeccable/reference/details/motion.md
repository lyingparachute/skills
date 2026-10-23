# Motion details

Concrete values for building and reviewing web motion. [animate.md](../animate.md) decides what earns motion; this file decides how it is built. Its values are narrower than animate.md's ranges and replace its example curve; when both apply, use these. They are still defaults: the project's DESIGN.md, its motion tokens, and a pinned brief win over them. A product register limited to opacity and transform stays limited, even where a recipe below uses clip-path or blur.

## The gate

Decide in this order. Stop at the first step that says no, and give the non-motion alternative (an instant state change, a static affordance) instead.

1. **Frequency.**

   | How often the user sees it | Decision |
   | --- | --- |
   | 100+ times a day (keyboard shortcuts, command palette toggle) | No animation |
   | Tens of times a day (hover, list navigation) | Near-imperceptible or none |
   | Occasional (modals, drawers, toasts) | Standard animation |
   | Rare or first-time (onboarding, success, celebration) | Delight lives here |

   Keyboard-initiated actions get no animation. They repeat hundreds of times a day, and motion makes them feel slow.

2. **Purpose.** Name it in one word: feedback, spatial consistency, state indication, preventing a jarring change, explanation, or delight (rare tier only). No name, no animation. Data the user reads or acts on stays still.

3. **Tool.** The cheapest one that works.

   | Need | Tool |
   | --- | --- |
   | Hover, press, color, a class or attribute toggle | CSS transition |
   | Entry on mount, no JS state | CSS `@starting-style` |
   | Predetermined motion that must stay smooth while the page loads | CSS animation |
   | Programmatic control at CSS performance, no library | WAAPI (`element.animate()`) |
   | Springs, layout animation, exit of unmounted nodes, gesture values | The project's motion library |

## Easing

| Situation | Easing |
| --- | --- |
| Entering or exiting | ease-out |
| Moving or morphing on screen | ease-in-out |
| Hover or color change | ease |
| Constant motion (marquee, progress fill) | linear |
| Anything else | ease-out |

UI motion uses ease-out at the start: the first frames are the ones the user watches, and ease-in spends them standing still. A 200ms ease-out feels faster than a 200ms ease-in. This holds for exits too.

The built-in keywords are weak. With no project tokens, use these:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

Take any other curve from [easing.dev](https://easing.dev/) or [easings.co](https://easings.co/). Extend existing tokens; a second, parallel token set is a defect.

## Duration

| Element | Duration |
| --- | --- |
| Press feedback | 100-160ms |
| Tooltip, small popover | 125-200ms |
| Dropdown, select | 150-250ms |
| Modal, drawer | 200-500ms |
| Marketing, explanatory focal entrance | Up to 800ms |

UI motion stays under 300ms unless it moves something large. Exit is faster than entry. Slow where the user is deciding, fast where the system responds: a hold-to-confirm fill runs 2s linear, the release snaps back in 200ms ease-out.

Speed is perceived performance. A 180ms select feels more responsive than a 400ms one, and a faster spinner makes the same load feel shorter.

## Physical rules

- **Entries start from something.** `scale(0.95)` plus `opacity: 0`, never `scale(0)`. Range 0.9-0.97. The one exception is a contextual icon swap (below).
- **Popovers grow from their trigger.** `transform-origin: var(--transform-origin)` (Radix exposes `--radix-popover-content-transform-origin` and siblings; Base UI exposes `--transform-origin`). Modals are not anchored to a trigger and stay centered.
- **Presses answer on the way down.** `scale(0.96)` to `scale(0.97)` on `:active`, 100-160ms ease-out, never below 0.95. `scale()` shrinks the label and icon with it, which is what reads as a physical press. Give the button component a `static` opt-out for places where the motion distracts.
- **Exit the way it entered.** A toast that rises from the bottom leaves through the bottom; symmetric paths make swipe-to-dismiss obvious. An element with no spatial origin (a list item, a card swapped in place) exits with a fade and a short offset of about 8-12px in its direction of travel, not its full height.
- **Percent translates.** `translateY(100%)` moves an element by its own height whatever its content. Prefer it over pixel values for drawers and toasts.
- **Name the properties.** `transition: transform 200ms var(--ease-out)`, never `transition: all`. In Tailwind, `transition-all` is `all`, and plain `transition` is a long fixed list (colors, shadow, filter, transform, and more) that still animates properties nobody chose; use `transition-transform`, `transition-opacity`, or `transition-[scale,opacity]`.

## Interruption

- **Transitions for anything a user can fire twice in a second** (toasts, toggles, open and close). A transition retargets from the current value; a keyframe animation restarts from zero. Keep keyframes for one-shot sequences.
- **Springs for gestures.** They carry velocity through an interruption, so a reversed drag continues smoothly.

  ```js
  { type: "spring", duration: 0.5, bounce: 0.2 }          // easier to reason about
  { type: "spring", mass: 1, stiffness: 100, damping: 10 } // more control
  ```

  Bounce stays at 0.1-0.3, and only on drag-to-dismiss and playful surfaces. Product UI uses bounce 0.
- **Decorative pointer tracking** goes through a spring (`useSpring`) so it has momentum. Only on decoration; a functional chart follows the pointer exactly or not at all.
- **Skip the mount animation** for elements already in their default state: `initial={false}` on `AnimatePresence` for icon swaps, tabs, and toggles. Leave it off where the first entrance is the point (a staggered hero), and check a full page refresh after adding it.

## Stagger

Stagger a group entrance that the user sees occasionally, never a list they scroll past all day. 30-80ms between items, capped so the whole group lands within about 500ms. Stagger never blocks interaction.

```css
/* set style="--i: 0", "--i: 1", ... on each item */
.item { animation: enter 300ms var(--ease-out) both; animation-delay: calc(var(--i, 0) * 50ms); }
@keyframes enter { from { opacity: 0; transform: translateY(8px); } }
```

## Reduced motion and pointer gating

Both ship with the animation, in the same change.

```css
@media (prefers-reduced-motion: reduce) {
  .element { animation: fade 200ms ease; }
}

@media (hover: hover) and (pointer: fine) {
  .element:hover { transform: scale(1.02); }
}
```

Reduced motion keeps opacity and color changes that carry meaning and removes movement. Touch fires a hover on tap and leaves it stuck, so hover motion lives behind the capability query. Tailwind v4's `hover:` variant already compiles to `@media (hover: hover)`.

## Recipes

Start from the matching recipe rather than a blank file. Curves are the tokens above unless a recipe names its own.

**Dropdown, popover, menu, select**

```css
.popover {
  transform-origin: var(--transform-origin);
  transition: opacity 200ms var(--ease-out), transform 200ms var(--ease-out);
}
.popover[data-starting-style], .popover[data-ending-style] { opacity: 0; transform: scale(0.95); }
```

With Radix, the closed state is `[data-state="closed"]` and the open state `[data-state="open"]`.

**Tooltip.** The popover recipe at 125ms and `scale(0.97)`. The first tooltip waits for its delay; once one is open, neighbours open with no delay and no animation (`transition-duration: 0ms` on the instant state). That makes a toolbar feel fast without accidental tooltips.

**Modal.** `transform-origin: center`, 250ms, from `scale(0.96)` and `opacity: 0`. The backdrop fades on the same timing so the two read as one surface.

**Drawer or sheet.** `transform: translateY(100%)` when closed, `translateY(0)` open, `transition: transform 500ms var(--ease-drawer)`.

**Toast.** Enter through `@starting-style` from `translateY(100%)` and `opacity: 0`. Toasts are a named exception to the easing and duration tables: 400ms on `ease` reads calm rather than urgent, and the motion matches the component's personality. Without `@starting-style` support, set a `data-mounted` attribute after mount and transition from it. Pause dismiss timers while the tab is hidden, and fill the gaps between stacked toasts with a pseudo-element so hover holds while the pointer crosses them.

**Accordion.** Height is one of the few layout animations allowed, because no transform does the same job. Keep it at 200ms, animate to a measured height (or the primitive's `--radix-accordion-content-height`), never to `auto`.

**Contextual icon swap** (copy to check, play to pause). Cross-fade with exactly `scale` 0.25 to 1, `opacity` 0 to 1, `blur(4px)` to `blur(0px)`, `{ type: "spring", duration: 0.3, bounce: 0 }`. The small start scale is right here because the icon is tiny and blurred; it is not a licence for larger elements. Without a motion library, keep both icons in the DOM, stack one absolutely over the other, and cross-fade them with `transition: opacity 300ms, scale 300ms, filter 300ms` on `cubic-bezier(0.2, 0, 0, 1)`.

**Hold to confirm** (destructive actions). A colored overlay with `clip-path: inset(0 100% 0 0)` fills to `inset(0 0 0 0)` on `:active` over 2s linear and snaps back in 200ms ease-out. Linear is right because the fill is progress. The destructive action also needs a path that is not a pointer hold, such as a confirm step reachable by keyboard.

**Tab indicator with a color change.** Duplicate the tab list, style the copy as active, and clip the copy to the active tab. Animating the clip changes text and background in perfect sync.

**Scroll reveal.** Marketing surfaces only. Content stays visible without JS; the reveal fires once.

**Drag to dismiss.**

```js
const velocity = Math.abs(swipeAmount) / (Date.now() - dragStartTime);
if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > FLICK_VELOCITY) dismiss();
```

A flick dismisses (velocity around 0.11 px/ms), not only distance. Capture the pointer once the drag starts, ignore extra touch points mid-drag, damp the movement past the natural edge instead of stopping hard, set `transform` on the dragged element directly, and settle with a spring.

**A crossfade that will not settle.** When two states visibly overlap whatever the easing, blur the seam: `filter: blur(2px)` plus `opacity: 0.7` during the swap, under 20px always.

## Review

When reviewing motion, default to flagging; approval is earned. When unsure whether motion feels right, the strongest move is usually to delete it. Report every finding in one table:

| Before | After | Why |
| --- | --- | --- |
| `transition: all 300ms` | `transition: transform 200ms var(--ease-out)` | Name the properties |

Check every animation in scope against this list:

| Finding | Fix |
| --- | --- |
| Animation on a keyboard action or 100+/day element | Remove it |
| No nameable purpose | Remove it |
| `transition: all` or Tailwind `transition` | Name the properties |
| `scale(0)` entrance | `scale(0.95)` plus `opacity: 0` |
| ease-in on UI | ease-out or a strong custom curve |
| Built-in `ease-out` on deliberate motion | `--ease-out` token |
| UI duration over 300ms with no reason | 150-250ms |
| Exit as slow as or slower than entry | Faster exit |
| Popover scaling from center | Trigger-origin variable (modals exempt) |
| Keyframes on toasts, toggles, rapid triggers | Transitions |
| Layout properties animated (`width`, `height`, `margin`, `padding`, `top`, `left`), outside the accordion recipe | Transform or opacity ([motion-performance.md](motion-performance.md)) |
| Ungated `:hover` motion | `(hover: hover) and (pointer: fine)` |
| No reduced-motion path | Gentler variant, not zero |
| Whole group appears at once, or stagger over 80ms per item | 30-80ms stagger |
| Values outside the project's motion tokens | The tokens |

Propose fixes in this order, earlier before later: delete the animation; reduce it (shorter, smaller, fewer properties); fix the easing; fix origin and physicality; make it interruptible; move it to compositor properties; make timing asymmetric; polish (blur seam, stagger, `@starting-style`, springs); then reduced motion, hover gating, and fit to the product's personality.

Close with a decision. **Block** on any feel-breaking change, animation on a keyboard or 100+/day action, `scale(0)` or ease-in on UI, or a layout-property animation with an easy transform fix. **Approve** only when none of those remain, nothing obvious should be deleted, durations and easing sit inside the tables above, interruption is handled where it can happen, and reduced motion is respected.

Feel that code cannot settle (a crossfade, a spring's bounce, opacity against height in a growing list) gets a feel-check, not a guess: play it at 2-5x duration or in the DevTools Animations panel, step it frame by frame, try gestures on a real phone, and look again the next day.
