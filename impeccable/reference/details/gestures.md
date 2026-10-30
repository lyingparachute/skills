# Gesture details

How swipe, drag, sheet, long-press, carousel, pull-to-refresh, and slide-to-confirm gestures move content and commit actions. Load it when a gesture moves content or commits an action. Phone structure lives in [mobile.md](mobile.md), and curves and thresholds live in [motion.md](motion.md).

## Pair every gesture with a tap target

- **Every gesture has a visible control.** Each swipe, drag, or long-press does the same job as a button or link. A user who never finds the gesture is never stuck.
- **Size the control to the minimum.** Target 44 pt on iOS (Apple HIG) or 48 dp on Android (Material). On web, never go below the 24 CSS px floor (WCAG 2.5.8).
- **Pairs in practice.** Swipe-to-delete plus a delete button. Swipe-up search plus a search button. Swipe-to-add plus a long-press menu. Swipe-down dismissal plus a close button. Swipe to leave a full-screen view plus a tap on the backdrop.

## Commit feedback

- **Show progress toward the commit.** Pull-to-refresh and swipe-to-delete fill or move with the drag, so the user sees how close the commit is.
- **Commit past the threshold or a flick.** Commit when the drag passes a distance or a fast flick. Otherwise return to rest. Thresholds and the flick velocity are in [motion.md](motion.md#recipes).

## Swipe

- **Swipe release uses a spring.** Never use a linear curve on a swipe. On a dismiss or a playful release, use a spring with bounce between 0.1 and 0.3 (see [motion.md](motion.md#interruption)). Product UI releases stay at bounce 0.
- **Expansion moves together.** When a swipe-up opens a card, expand the card and its container to full screen at once. Fade the body content up along the swipe direction.
- **Settle, do not overshoot.** At the top of an expansion, settle with a low-bounce spring on release. Do not use an elastic snap.
- **Swipe-back offset.** On a swipe back, offset the page underneath to the left, starting at 35%, then tune. Move it in sync with the page. Operate apps keep the platform back gesture (see [adapt.native.md](../adapt.native.md)).
- **Swipe-up opens search.** A vertical swipe-up on a main view opens global search. A visible search control sits beside it.
- **Swipe actions hide utilities.** Secondary row actions (archive, pin, snooze) sit behind a left or right swipe. The row's tap keeps its primary action.
- **Swipe-to-add.** A horizontal swipe on a row stretches a magnetic indicator to confirm the add. A long-press menu offers the same action.
- **Wide swipe target.** The primary swipe target spans nearly the full screen width, with snapping to the nearest item on release.
- **Stacked cards.** On a swipe of the front notification card, rotate it away until it leaves the screen, and fade it to 0% opacity. Scale the back cards up and shift them down to fill its slot.
- **Swipe effects keep a tap path.** A tools tray that slides up with a horizontal page swipe keeps the same tools reachable by tap.
- **Curved swipe paths.** A circular thumb path, or items that shrink toward the screen edge, needs a tap control beside it.
- **Onboarding Next works by tap and swipe.** On a swipe, a background shape expands to fill the viewport and swaps colour at full size. The next shape shrinks in while the next content slides in. Onboarding structure lives in [onboard.md](../onboard.md).

## Sheets

- **Sheet anatomy.** A title, an optional search field, a confirm check, a close X, and the option list. Size the sheet to its content, at any height.
- **Plus button opens the input.** A "+" button can open the sheet with the keyboard up and an input bar.
- **Dismiss by swipe or close.** A bottom sheet closes on a swipe down and on its close button.
- **Scale the background.** Scale the background view down as the sheet rises. Restore it to 100% as the sheet closes, in sync with the sheet.

## Long-press

- **Dim, do not blur, the background.** Put a scrim behind the pressed item.
- **Enlarge the pressed element slightly.** Start at scale 1.03, then tune.
- **Open a menu or a preview.** A long-press opens a contextual action menu or a preview. The same actions also appear in a visible control (see the pairing rule above).

## Carousels

- **Keep the arrows.** A swipe is not keyboard operable, so keep arrow buttons for keyboard and mouse users (WCAG 2.1.1). Remove only decorative arrows.
- **Prefer manual carousels.** Users should move the carousel when they ask (NN/g).
- **Auto-rotate with a visible pause control.** A carousel or showcase that moves on its own needs a visible pause or stop control. The rule applies once it runs for more than five seconds (WCAG 2.2.2). Slow-rotating image carousels follow the same rule.
- **Pagination dots follow the swipe.** The active dot stretches with the swipe position, then settles on the new item.
- **3D ring decoration.** Skew cards as they near the screen edges. Decoration only.

## Slide to confirm

- **Replace the tap with a track.** For a high-stakes, irreversible action, use a full-width slide track instead of a tap button. Examples: sending a bulk email, buying crypto.
- **Return on release.** The track returns to its start unless the slide reaches the end.
- **Keep a keyboard path.** The same action stays reachable by keyboard (see the pairing rule above). A hold-to-confirm alternative is in [motion.md](motion.md#recipes).
