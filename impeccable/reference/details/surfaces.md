# Surfaces

Border radius, optical alignment, shadows, and image outlines.

## Concentric Border Radius

When nesting rounded elements, the outer radius must equal the inner radius plus the padding between them:

```
outerRadius = innerRadius + padding
```

This rule is most useful when nested surfaces are close together. If padding is larger than `24px`, treat the layers as separate surfaces and choose each radius independently instead of forcing strict concentric math.

### Example

```css
/* Good - concentric radii */
.card {
  border-radius: 20px; /* 12 + 8 */
  padding: 8px;
}
.card-inner {
  border-radius: 12px;
}

/* Bad - same radius on both */
.card {
  border-radius: 12px;
  padding: 8px;
}
.card-inner {
  border-radius: 12px;
}
```

### Tailwind Example

```tsx
// Good - outer radius accounts for padding
<div className="rounded-2xl p-2">       {/* 16px radius, 8px padding */}
  <div className="rounded-lg">          {/* 8px radius = 16 - 8 ✓ */}
    ...
  </div>
</div>

// Bad - same radius on both
<div className="rounded-xl p-2">
  <div className="rounded-xl">          {/* same radius, looks off */}
    ...
  </div>
</div>
```

Mismatched border radii on nested elements is one of the most common things that makes interfaces feel off. Always calculate concentrically.

## Optical Alignment

When geometric centering looks off, align optically instead.

### Buttons with Text + Icon

Use slightly less padding on the icon side to make the button feel balanced. A reliable rule of thumb is:
`icon-side padding = text-side padding - 2px`.

```css
/* Good - less padding on icon side */
.button-with-icon {
  padding-left: 16px;
  padding-right: 14px; /* icon side = text side - 2px */
}

/* Bad - equal padding looks like icon is pushed too far right */
.button-with-icon {
  padding: 0 16px;
}
```

```tsx
// Tailwind
<button className="pl-4 pr-3.5 flex items-center gap-2">
  <span>Continue</span>
  <ArrowRightIcon />
</button>
```

### Play Button Triangles

Play icons are triangular and their geometric center is not their visual center. Shift slightly right:

```css
/* Good - optically centered */
.play-button svg {
  margin-left: 2px; /* shift right to account for triangle shape */
}

/* Bad - geometrically centered but looks off */
.play-button svg {
  /* no adjustment */
}
```

### Asymmetric Icons (Stars, Arrows, Carets)

Some icons have uneven visual weight. The best fix is adjusting the SVG directly so no extra margin/padding is needed in the component code.

```tsx
// Best - fix in the SVG itself
// Adjust the viewBox or path to visually center the icon

// Fallback - adjust with margin
<span className="ml-px">
  <StarIcon />
</span>
```

## Shadows Instead of Borders

For **buttons, cards, and containers** that use a border to show depth or elevation, prefer a `box-shadow` token instead, unless the card is flat and static (see Declared Elevation and Shadows). Shadows adapt to any background since they use transparency; solid borders don't. This also helps when using images or multiple colors as backgrounds - solid border colors don't work well on backgrounds other than the ones they were designed for.

**Do not apply this to dividers** (`border-b`, `border-t`, side borders) or any border whose purpose is layout separation rather than element depth. Those should stay as borders.

### Shadow as Border (Light Mode)

The shadow is comprised of three layers. The first acts as a 1px border ring, the second adds subtle lift, and the third provides ambient depth:

```css
:root {
  --shadow-border:
    0px 0px 0px 1px rgba(0, 0, 0, 0.06),
    0px 1px 2px -1px rgba(0, 0, 0, 0.06),
    0px 2px 4px 0px rgba(0, 0, 0, 0.04);
  --shadow-border-hover:
    0px 0px 0px 1px rgba(0, 0, 0, 0.08),
    0px 1px 2px -1px rgba(0, 0, 0, 0.08),
    0px 2px 4px 0px rgba(0, 0, 0, 0.06);
}
```

### Shadow as Border (Dark Mode)

In dark mode, simplify to a single white ring - layered depth shadows aren't visible on dark backgrounds:

```css
/* Dark mode - adapt to whatever setup the project uses
   (prefers-color-scheme, class, data attribute, etc.) */
--shadow-border: 0 0 0 1px rgba(255, 255, 255, 0.08);
--shadow-border-hover: 0 0 0 1px rgba(255, 255, 255, 0.13);
```

### Usage with Hover Transition

Apply the variable and add `transition-[box-shadow]` for a smooth hover:

```css
.card {
  box-shadow: var(--shadow-border);
  transition-property: box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}

.card:hover {
  box-shadow: var(--shadow-border-hover);
}
```

### When to Use Shadows vs. Borders

| Use shadows | Use borders |
| --- | --- |
| Cards, containers with depth | Dividers between list items |
| Buttons with bordered styles | Table cell boundaries |
| Elevated elements (dropdowns, modals) | Form input outlines (for accessibility) |
| Elements on varied backgrounds | Hairline separators in dense UI |
| Hover/focus states for lift effect | |

## Image Outlines

Add a subtle `1px` outline with low opacity to images. This creates consistent depth, especially in design systems where other elements use borders or shadows.

### Color rules (non-negotiable)

- **Light mode**: pure black - `rgba(0, 0, 0, 0.1)`. Exact values: R=0, G=0, B=0.
- **Dark mode**: pure white - `rgba(255, 255, 255, 0.1)`. Exact values: R=255, G=255, B=255.
- Never use a near-black or near-white from the project palette (e.g. slate-900, zinc-900, `#0a0a0a`, `#111827`, `#f5f5f7`). Tinted outlines pick up the surrounding surface color and read as dirt on the image edge.
- Never match the outline to the project's accent or ink color. The outline is a neutral separator, not a themed element.

### Light Mode

```css
img {
  outline: 1px solid rgba(0, 0, 0, 0.1);
  outline-offset: -1px; /* inset so it doesn't add to layout */
}
```

### Dark Mode

```css
img {
  outline: 1px solid rgba(255, 255, 255, 0.1);
  outline-offset: -1px;
}
```

### Tailwind with Dark Mode

```tsx
<img
  className="outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
  src={src}
  alt={alt}
/>
```

Use `outline-black/10` and `outline-white/10` specifically - not `outline-slate-*`, `outline-zinc-*`, `outline-neutral-*`, or any tinted scale.

**Why outline instead of border?** `outline` doesn't affect layout (no added width/height), and `outline-offset: -1px` keeps it inset so images stay their intended size.

## Minimum Hit Area

Interactive elements need a hit area of at least 44×44px, the same floor adapt.md and audit.md use (WCAG 2.5.5 AAA; the AA floor in 2.5.8 is 24×24px). If the visible element is smaller (e.g., a 20×20 checkbox), extend the hit area with a pseudo-element.
Delete tiny decorative pagination dots that take no input, rather than extend their hit area.

### CSS Example

```css
/* Small checkbox with expanded hit area */
.checkbox {
  position: relative;
  width: 20px;
  height: 20px;
}

.checkbox::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
}
```

### Tailwind Example

```tsx
<button className="relative size-5 after:absolute after:top-1/2 after:left-1/2 after:size-11 after:-translate-1/2">
  <CheckIcon />
</button>
```

### Collision Rule

If the extended hit area overlaps another interactive element, shrink the pseudo-element - but make it as large as possible without colliding. Two interactive elements should never have overlapping hit areas.

## Declared Elevation and Shadows

- Declare one elevation per card: a border for a flat, static card, or one shadow token for a raised or interactive card. A shadow token may start with a 1px ring, which has zero offset and counts as the card's border. A flat card may skip both and separate from the canvas by fill tone alone. Never pair a CSS border with a separate wide shadow (the ghost card in craft-floor.md).
- Replace harsh default shadows: lower opacity and a larger blur, so the shadow is never the first thing seen. Floating popovers get a stronger shadow token than cards. In quieter mode, reduce or remove extra shadows (quieter.md).
- Shadow color: tinted toward the surface hue, or transparent black at low alpha, around 4-10%. Never an opaque gray (starting value).
- A light-mode card border is never pure black: use transparent black at about 15% alpha (starting value).
- Tactile raised buttons: one inner shadow and one outer shadow.
- A focused or selected card gets a heavy accent stroke, clearly heavier than the card's 1px border, not a blurred duplicate glow (craft-floor.md).

## Radius Flavors

- A committed world sets the flavor: warm worlds use large radii, and modern worlds use sharp radii.
- Small controls: start at 10px, below the card radius (starting value).
- Match corner styles across a pair: a sharp image beside a rounded button looks disconnected.
- Inner radius follows Concentric Border Radius. If the padding exceeds the outer radius, pick a smaller inner radius by eye. A pill-shaped element needs no adjustment.
- Smooth iOS-style corners: add `corner-shape: squircle` beside `border-radius` inside `@supports (corner-shape: squircle)`. Browsers without it keep the plain radius.

## Padding and Icon Size

- Label-only buttons: horizontal padding about 1.5-2x the vertical height (starting value; one source gives about 1.6x).
- Chips are vertically thinner than buttons. Vertical padding is 1/2 or 1/4 of horizontal: 20px horizontal gives 10px or 5px (starting value).
- Icon size: match the line height of the adjacent text, such as a 24px icon beside 24px line height (starting value). Some systems anchor to cap height instead.
- Stacked list with a taller icon: add a subline so the bottom edge aligns.
- No decorative arrow inside a button. Keep an arrow only when it shows direction.
- Cards carry no decorative icon. An icon stays only when it names the item.
- Persuade pages: feature icons may take the brand accent.
- Icon background tints slightly off-white on hover (starting value).
- Put a solid circle behind overlay icons on bright photos, so a save icon stays visible on a white listing photo.

## Glass Panels

- Use glass only when the committed world is glass. Test contrast over the worst background, and honor prefers-reduced-transparency.
- A glass panel uses a semi-transparent dark fill. Background blur below 20px. A soft inner shadow is optional.
- A tab bar may use a translucent, blurred dark background under the same conditions.
- Never use hover-triggered blur reveals; they are decorative blur.

## Structural Frame Lines

- Frame lines sit on real column or section edges, because they divide content. Two-axis decorative grids: see the background rule in craft-floor.md.
- Use visible 1px border lines to frame sections and multi-column blocks.
- Square junctions by default. Round them only when the committed world is soft.
- Replace card wrappers with one vertical column divider. Rows and sections group by spacing.
