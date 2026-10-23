# Motion performance

For web animation that stutters, drops frames, or will run while the page is busy. The question is never "does it look right?" ([motion.md](motion.md) owns that) but "does each frame finish in time?".

The bar is a mid-range phone on a 120Hz screen: an 8ms frame budget, not the 16.7ms of 60Hz. A fast laptop hides almost every problem below, so say which findings were verified from code and which need a recording on a device.

## Symptoms

| What the user sees | Fix |
| --- | --- |
| Animation stutters | Animate `transform` and `opacity`, not `width`, `height`, `top`, `margin` |
| Shadow animation is choppy | Animate `filter: drop-shadow()`, or fade a pseudo-element that holds the shadow |
| Jank only during navigation or loading | Move the animation to CSS or WAAPI so it runs off the main thread |
| Motion `x` / `y` drops frames under load | Animate the full `transform` string |
| Hand-rolled animation drops frames in React | Write to `ref.current.style` or a motion value, not state |
| Drag gets slower as the list grows | Stop animating an inherited CSS variable; set `transform` on the element |
| Blur transition lags, especially in Safari | Animated `blur()` under 20px; 2-5px is enough to soften a crossfade |
| Properties nobody meant to animate are animating | Replace `transition: all` with named properties |
| Element shifts 1px when motion starts or ends | `will-change: transform`, only after seeing the shift |

## What you animate

| Tier | Properties | Cost |
| --- | --- | --- |
| Composite only | `transform`, `opacity`; in current Chrome and Firefox also `filter`, `clip-path`, `background-color`, with uneven support, so test them | Cheapest |
| Paint and composite | `box-shadow`, `border-radius`, `color` | Redraws every frame |
| Layout, paint, composite | `width`, `height`, `padding`, `margin`, `top`, `left`, `border-width` | Re-measures the page; one growing element moves its neighbours |

Swap down a tier: `scale()` for size, `translate()` for position, `opacity` for `display` and `visibility`, `drop-shadow()` for `box-shadow`. A layout animation sometimes looks fine on an isolated element, but `scale()` produces the same picture and cannot regress on a slower device. A sidebar opening by `margin-left` re-lays out the whole page beside it every frame; `translateX` does not.

## Where it runs

| Driver | Thread |
| --- | --- |
| `requestAnimationFrame` loops, GSAP, Motion components animating shorthand props (`x`, `y`, `scale`) | Main thread, always |
| WAAPI, Motion's `animate()`, Motion components animating a full `transform` string | Can run off the main thread |
| CSS transitions and keyframes | Can run off the main thread |

Main-thread animation only suffers when the page is busy during it: route changes, tab indicators during navigation, motion that plays alongside fetching or hydration. A shared-layout tab indicator dropped frames at Vercel for exactly this reason, and a CSS animation fixed it.

Motion's `x`, `y`, `scale`, and `rotate` shorthands go through CSS variables, which are not accelerated. Keep them by default for readability, and switch to the string form when the animation must survive a busy main thread:

```jsx
<motion.div animate={{ x: 100 }} />
<motion.div animate={{ transform: "translateX(100px)" }} />
```

Acceleration is a best-effort grant from the browser and changes between versions. Which properties you animate is under your control; spend effort there. Percentage transforms (`translateY(100%)`) stay correct for elements of unknown size even where a browser declines to accelerate them.

The working split: CSS for simple motion and anything that plays while the page is busy; the motion library for springs, shared layout, exit of unmounted nodes, and gestures.

## Two traps that look correct

**State per frame.** A `setState` inside `requestAnimationFrame`, `pointermove`, `scroll`, or a drag handler re-renders every frame, and the render alone spends the budget.

```jsx
ref.current.style.transform = `translateY(${nextY}px)`;
y.set(nextY);
```

**Inherited CSS variables.** A variable changed on a parent recalculates style for every descendant. Vaul's drag slowed past about 20 items because the drag distance lived in `--swipe-amount`. Suspect this whenever a `transform` animation degrades as content grows.

## `will-change`

It is the last step, not the first. Browsers already promote elements animating `transform` or `opacity`, and each extra layer costs GPU memory. Add `will-change: transform` (or `opacity`, `filter`) only to the element that animates, only after a visible first-frame shift or measured dropped frames, and never `will-change: all` or a layout property. It earns its place on a large blurred or filtered element; keep that layer small.

## Diagnose

1. List every animation in scope with its driver, its real properties (expand `transition: all` and Motion shorthands), and what else happens while it plays.
2. Work down the causes in order of frequency: layout properties, then paint properties; a busy main thread; per-frame React state; cost that grows with content; animated CSS variables; blur over 20px; only then `will-change`.
3. Confirm with a recording: the DevTools Performance panel for dropped frames and long tasks, the Animations panel to slow motion down, a real mid-range phone over remote debugging. Desktop CPU throttling models a slow CPU, not a weak GPU.

Report each finding as element and `file:line`, cause, before, after, and "verified from code" or "needs a device recording". Order by cost: layout before paint, busy main thread before idle.
