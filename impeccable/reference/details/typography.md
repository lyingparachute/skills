# Typography

Typography rendering details that make interfaces feel better.

## Text Wrapping

### text-wrap: balance

Distributes text evenly across lines, preventing orphaned words on headings and short text blocks. **Only works on blocks of 6 lines or fewer** (Chromium) or 10 lines or fewer (Firefox) - the balancing algorithm is computationally expensive, so browsers limit it to short text.

```css
/* Good - even line lengths on short text */
h1, h2, h3 {
  text-wrap: balance;
}
```

```css
/* Bad - default wrapping leaves orphans */
h1 {
  /* no text-wrap rule → "Read our
     blog" instead of balanced lines */
}
```

```css
/* Bad - balance on long paragraphs (silently ignored, wastes intent) */
.article-body p {
  text-wrap: balance;
}
```

**Tailwind:** `text-balance`

### text-wrap: pretty

Prevents orphaned words (a single word dangling on the last line) by adjusting line breaks throughout the paragraph. Unlike `balance`, it doesn't try to equalize line lengths - it just ensures the last line isn't embarrassingly short. Works on text of any length with no line-count limit.

This should be your **default for short-to-medium text** - paragraphs, descriptions, captions, list items, card text. For very long text (10+ lines), skip both `pretty` and `balance` - the browser's default wrapping is fine and you avoid unnecessary layout cost.

```css
/* Good - descriptions, captions, short paragraphs */
p, li, figcaption, blockquote {
  text-wrap: pretty;
}
```

```tsx
// Tailwind
<p className="text-pretty">
  A short paragraph that won't leave an orphan on the last line.
</p>
```

**Tailwind:** `text-pretty`

### When to Use Which

| Scenario | Use |
| --- | --- |
| Headings, titles where even distribution matters | `text-wrap: balance` |
| Short-to-medium text - paragraphs, descriptions, captions, UI text | `text-wrap: pretty` |
| Long text (10+ lines), code blocks, pre-formatted text | Neither - leave default |

## Font Smoothing (macOS)

On macOS, text renders heavier than intended by default. Apply antialiased smoothing to the root layout so all text renders crisper and thinner.

```css
/* CSS */
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

```tsx
// Tailwind - apply to root layout
<html className="antialiased">
```

### Good vs. Bad

```css
/* Good - applied once at the root */
html {
  -webkit-font-smoothing: antialiased;
}

/* Bad - applied per-element, inconsistent */
.heading {
  -webkit-font-smoothing: antialiased;
}
.body {
  /* no smoothing → heavier than heading */
}
```

**Note:** This only affects macOS rendering. Other platforms ignore these properties, so it's safe to apply universally.

## Tabular Numbers

When numbers update dynamically (counters, prices, timers, table columns), use tabular-nums to make all digits equal width. This prevents layout shift as values change.

```css
/* CSS */
.counter {
  font-variant-numeric: tabular-nums;
}
```

```tsx
// Tailwind
<span className="tabular-nums">{count}</span>
```

### When to Use

| Use tabular-nums | Don't use tabular-nums |
| --- | --- |
| Counters and timers | Static display numbers |
| Prices that update | Decorative large numbers |
| Table columns with numbers | Phone numbers, zip codes |
| Animated number transitions | Version numbers (v2.1.0) |
| Scoreboards, dashboards | |

### Caveat

Some fonts (like Inter) change the visual appearance of numerals with this property - specifically, the digit `1` becomes wider and centered. This is expected behavior and usually desirable for alignment, but verify it looks right in your specific font.

```css
/* With Inter font:
   Default:  1234  → proportional, "1" is narrow
   Tabular:  1234  → all digits equal width, "1" centered */
```

## Numeric Alignment

- Right-align numbers that readers compare, in table columns and data cards, so digits line up by place value.

## Links in Text

- Body links keep an underline in the link color. Color alone does not mark a link (WCAG 1.4.1).

## Font Count and Roles

- One family by default. Add a second only when it has a fixed job (NN/g).
- A serif with a sans is allowed. Name the reason before you pick the second family.
- A third family only when each family has a fixed job: a display face for headlines, a UI sans, and a mono face for code and measurements.
- Never use four families. Cut to three or fewer.
- A serif suits long-form, print-like text.

## Display and Script Faces

- Use display and handwritten faces for headlines and decorative labels. Never set body text in them.
- A distinctive display face earns a role on a hero headline. It does not set body text.
- A quirky display face can set a decorative badge or sticker label. It never sets body text.
- Never set text in Comic Sans. Pick a face from the committed world instead.

## Font Licensing

- Check the font license before any commercial use, including web embedding.

## Type Scale

- Product UI uses a ratio of 1.125 to 1.2 between steps, with 3 to 4 working sizes (see operate.md).
- Marketing pages use a ratio of 1.25 to 1.333 between steps. (Art of Style Frame)
- The golden ratio (1.62) is too large for a type scale.
- A full landing page starts at no more than 6 sizes, then tune. A simple page uses about 3. (NN/g)
- Start dashboard text at a 24px maximum, then tune.
- A landing page can step up by 1.27 from a 16px base, inside the 1.25 to 1.333 range.

## Line Height

- Body copy starts at a line height of 1.45 to 1.6. Tune it to the face, measure, and language.
- Headings start at 1.1 to 1.3. Check diacritic clipping at the tightest value.
- Increase line height as size gets smaller or the measure gets longer. Decrease it as size grows.
- Layout must hold when a user sets line height to 1.5. (WCAG 1.4.12)

## Tracking

- Loosen tracking on small text. Tighten it as size grows, to no tighter than -0.04em.
- Above 70 to 80px, tighten tracking. Start near -0.01em (Carbon display text at 60 to 90px), then tune no tighter than -0.04em.

## Weight and Tone

- Set hierarchy between same-size lines with tone, not size.
- Two lines at the same size: primary at full text color, secondary label at the muted token. The muted token is a solid color that passes 4.5:1.
- Avoid ultra-bold and ultra-thin weights on body copy.
- At small sizes, a lighter weight and a lower tone look almost alike. Use size or a clear step in tone for small-text hierarchy, not weight alone.

## Section Hierarchy

- Main headings can use regular weight at full text tone. Size alone can set their dominance.
- Subheadings use a medium size and a bold weight, so they stand out when scanning.
- Body copy uses the base size, regular weight, and full text tone.
- Set secondary metadata, such as a time or date, one step below the title.

## Fluid Type

- Fluid sizing applies to Persuade and Read surfaces only. Product UI stays on a fixed rem scale.
- Bound each clamp() with a rem minimum and maximum. Keep the maximum at 2 to 2.5 times the minimum.
- Never size text in vw alone. Test fluid text at 200% zoom.
