# Choreography

For two or more elements that move on the same event: a staggered list, a hero entrance, a view swap in a container, an item leaving while its siblings close the gap, a multi-step flow. [motion.md](motion.md) owns one animation's gate, easing, duration, and origin. This file owns the relationships between animations: order, overlap, and stillness. The project's motion tokens and DESIGN.md win over the values here.

Agents choreograph by adding: every child gets `delay: i * 0.1`, the panel slides and then its items trickle in, the old view waits politely for the new one. Each piece is smooth. Together, the user waits for the interface to finish performing. Good choreography cuts moving parts and runs the rest in parallel. Sequence only when order carries meaning. A good sequence reads as one gesture, a wave; a bad one reads as a queue.

## Hard rules

1. **One entrance per container.** If the panel slides in, its content is already there. Never animate a parent's entrance and also stagger its children.
2. **No stagger on high-frequency or keyboard-triggered UI.** Dropdown items, menu rows, command palettes, tab content, and list rows appear together or not animated. A stagger charms once and slows every use after.
3. **No uniform stagger.** Equal delay, distance, duration, and easing on every item moves like a metronome, the way `linear` does for one element. Vary the treatment by importance.
4. **Never block interaction.** Everything visible is clickable now. A delayed item must not hold back a button the user is reaching for.
5. **Survive interruption.** A sequence that breaks or replays out of order when fired mid-flight is not finished.

## 1. Cast the elements

List every element that moves on the event and give each a role before writing any timing.

| Role | What it is | Treatment |
| --- | --- | --- |
| Lead | The one thing the user must notice | Moves first, travels most, stays longest |
| Support | Content that follows the lead | Shorter, smaller motion |
| Decoration | Pills, badges, accents, dividers | Fade only, or nothing |
| Static | Everything else, including containers whose content animates | Does not animate |

Two competing leads are a hierarchy problem, and motion cannot fix it. Most groups shrink at this step: a side panel with eight menu items becomes one move, the panel slides and the items are just there.

## 2. Pick a relationship for each pair

- **Together** when both belong to the same visual object or moment, or when their order carries no meaning. Order without meaning is only delay.
- **Sequence** when order carries meaning and showing both at once would look broken: two dense views that change a container in both dimensions (old content leaves, then new enters), an item that would pass through a surface drawn above it, or a cause and effect such as a checkbox square drawing before its check. Start the second move just before the first ends, and use `fill-mode: both` so each holds its end state. The handoff overlap is what turns a queue into one gesture.
- **Overlap (stagger)** when order carries meaning and both can be visible: the second starts while the first still moves.
- **Carry** when a child's motion cannot be controlled directly (shared layout, `layoutId`): animate the parent and let the children come along.

### Together, by default

- **A leaving element stops taking space at once.** Take it out of layout at the moment of removal so siblings slide into the gap while it fades. Otherwise the gap closes only after the exit and the pause makes the interaction feel slow. In Motion that is `AnimatePresence mode="popLayout"`; without a library, set the exiting element to `position: absolute` at its current position first.
- **A view swap in one container is a crossfade**: the old view exits while the new one enters (`popLayout`, not the default `sync`, which keeps both stacked until the exit ends).
- **Sub-animations of one component share a timing family.** A drawer that opens in 500ms and resizes in 200ms reads as two objects. Inner animations may use a lighter curve (a slower content fade so the swap is visible) but stay in one easing family: an ease-in-out body inside an ease-out container feels out of sync. Set the family once, with `MotionConfig` or one shared CSS custom property.

### Stagger

- **Product UI: 30-80ms between items, the whole group done by about 300ms.** In a long list, stagger only the first handful and let the rest land with the last one. Item 20 never waits 20 steps.
- **Persuade moments get more room.** A hero or first-run moment may use 100-150ms steps on 500-600ms entrances. It is seen once, and the motion is part of the message.
- **Order follows importance, not DOM order.** Group a title and its first paragraph into one beat when they read as one unit.
- **Vary the treatment as well as the delay.** The lead travels furthest, support less, decoration fades in place. Delays that shrink along the group (or a stagger with easing on the delays) read as organic; equal gaps read as mechanical.
- **Direction follows reading order or cause.** Top to bottom for content, outward from the point of interaction for things the user triggered.

## 3. Sync secondary motion to the moment that matters

Each supporting animation hooks onto a moment of the lead (start, impact, or settle). It does not get a delay that happens to look right.

- Sync to the cause, not the earlier trigger. In hover-then-click, the background pulses on the click with the press, not on hover.
- Land accents with the lead. Sparks or lines around an icon finish as the main shape finishes: a short burst in the last 20% of the timeline, the most important line first and the others about 40ms behind.
- A repeat action skips the buildup. Once hover has set the state, a click plays at once. Keep the internal proportions and move the whole thing earlier.

## 4. Adapt timing to what changed

- **Scale duration by distance.** A container that resizes between views needs the full fade for a big jump; the same fade on a tiny jump flickers. Derive the duration from the delta and clamp it, for example `clamp(0.15s, Δheight / 500, 0.27s)`.
- **Scale bounce by size.** Small elements need more bounce to read as alive. A large view with the same bounce settles slowly and looks heavier. Product UI keeps bounce 0 ([motion.md](motion.md#interruption)).
- **Few states: hardcode per transition.** A dozen hand-tuned transitions beat a formula you cannot fine-tune. Use a formula only when there are too many states to tune.

## 5. Direction and exits

- **Direction follows the mental model.** Forward moves content left (new content enters from the right), back moves it right. Next and Back sliding the same way contradicts the action. Sibling menus enter from the side of the trigger the user came from.
- **Exits read state when they start.** Pass the direction through `custom` on both `AnimatePresence` and the child, or the leaving element uses the old direction.
- **Exits are simultaneous, shorter, and simpler.** Never reverse-stagger items out. The user already decided to leave.
- **An exit matches its entry.** What slid in from the right leaves toward the right.

## Interruption

- **Re-trigger mid-sequence.** Hover out halfway, click Next twice fast, switch menus while the first still opens. Each run stops the in-flight animations before starting new ones. Never stack them.
- **Wait for completion before chaining.** An idle loop that resumes after a hover-out starts only after every reset animation finishes (`await Promise.all(...)`), or it fights the reset.
- **Rapid view switching** can leave two children mounted with `AnimatePresence`. Test it, and give each child a stable, unique `key`.

## Attention loops

An idle animation that invites interaction (a tapping hand, a wiggling icon) waits about 2.5s before the first run and repeats rarely (about 6s apart). It stops while the user interacts and resumes after the reset finishes. It follows the idle-loop rules in [motion.md](motion.md#marquee-and-loops): pause control, off under reduced motion.

## Reduced motion

Collapse the choreography, do not just shorten it. Drop delays and movement, keep opacity, and let the group appear together. If the sequence is the explanation (a step-by-step illustration), jump between its frames.

## Build

Use the lightest tool that holds the relationships.

- **CSS.** A per-item `--delay` custom property with shrinking gaps, on a keyframe with `animation-fill-mode: both` so delayed items do not flash their end state first. Best for one-shot entrances.
- **Motion, declarative.** Variants with `delayChildren: stagger(...)` on the parent. `stagger` takes `from` and `ease`, which give non-uniform delays for free. Use it for groups that enter and exit with React state.
- **Motion, imperative (`useAnimate`).** Only when several elements coordinate across several events (hover, click, idle timer) and you must await completion. It is powerful and hard to maintain; never use it for a simple stagger.

## Workflow

1. Inventory every element that moves on the event, with `file:line`.
2. Cast roles. Remove movement from everything that is not Lead or Support.
3. Choose a relationship for each pair, and record why.
4. Write the timeline before coding, one row per moving element in start order, and check it against the budgets (product groups done by about 300ms, no stagger on high-frequency surfaces).

   | Element | Role | Starts | Duration | Motion | Relationship |
   | --- | --- | --- | --- | --- | --- |
   | Title | Lead | 0ms | 600ms | fade + 12px rise | none |
   | Subtitle | Support | 80ms | 500ms | fade + 8px rise | Overlaps title |
   | Pill | Decoration | 0ms | 400ms | fade only | Together with title |

5. Build it.
6. Verify on a recording, stepped frame by frame: a wave and a queue look the same in your head and different on screen. Run the interruption checks. Then picture the 50th use of the day; if you would skip it, cut it.

Report the timeline, up to five elements you removed motion from with the reason (for example "menu items: one entrance per container, the panel carries them"), and what code cannot settle, such as whether the stagger reads as a wave. Name the moment to scrub.
