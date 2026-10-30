# Landing

Persuade rules for landing and marketing pages: hero, navbar, social proof, features, CTA, and section pacing. Load when building or reviewing a landing page.

## Hero zones and spacing

A hero has four zones: navbar, main text block, hero image, and stats block. Add the stats block only when its numbers are real and specific. Refuse the hero-metric template (craft-floor.md).

Design desktop heroes at real screen size. Do not design on canvases about 50% larger than the screen.

Full-screen desktop heroes start at 1920px wide and about 1000px tall. The height leaves room for browser chrome. Starting values, then tune.

Pair the hero headline with concise subtext. Put a primary and a secondary CTA below it.

Starting values. Tune them on the rendered page.

- Heading to subtext: 8px, the tightest group.
- Subtext to CTA: 32px.
- Between major hero blocks: 32px.

Keep the main heading to about 7 words. Keep the subtext to about 14 words. Starting values, then tune.

## Hero layouts

Choose one layout per brief. A split hero is the default that a committed world replaces (mode-persuade.md).

- Text left, image right.
- Full-screen background image under the text.
- Text top, image bottom is the modern standard for a stacked hero.
- Headline and CTA above a full-width dashboard preview, with generous whitespace around them.
- Ultrawide: a full-height image with overlaid value copy on the left, and an interactive product showcase on the right.

## Hero imagery

### Anchor photo

- Light or dark comes from the use scene (craft-floor.md). Cropping and darkening an anchor photo is a technique, not a default.
- Crop and darken the anchor photo for text contrast. Do not add a noise layer, since craft-floor.md bans grain.
- Sample the primary tones from the anchor photo. Pair them with a high-contrast accent.

### Focal point and scattered objects

- Keep the focal point of the hero image clear. Place UI above, below, or left of it.
- Put the actionable copy at the center, with domain objects scattered around it.
- Place larger floating objects low and smaller ones high.
- Keep generous empty whitespace around the central text block, so floating objects add context, not clutter.
- Angle and scale outer objects so they trail toward the edges. The eye then returns to the center headline.
- Darken the outer edges of the hero background to pull focus to the center copy.

### Full-bleed background

- A full-width bleed image works behind a hero or a CTA.
- Text over a full-bleed image follows the scrim rules in color-values.md.

### Product UI in the hero

- Put the actual product UI above the fold.
- Use the real product dashboard UI in the hero, not stock imagery.
- Crop the product UI to its high-signal part, not the whole raw screen.
- Build a custom vignette for the story when a crop cannot carry it.
- Replace generic feature icons with cropped, edited vignettes of the real UI.
- Make product screenshots dominant in the clean section.
- Put an inline diagram above the hero dashboard only when it shows real data (craft-floor.md).
- Make the hero dashboard interactive with working controls.

## Navbar

- Put the nav in a header on a landing page (NN/g).
- Place the brand wordmark front and center, or left, in the navbar.
- Keep the hero and header free of social links, text testimonials, and page outlines. A short landing page needs no page outline.
- When product names do not say what the product is, show a clear photo of each product in the nav menu.
- Keep nav links small and plain. Make only the primary conversion CTA visually prominent.
- Outline important nav buttons, such as Log in, so they stand apart from plain links.
- Center the primary nav links. Keep the nav balanced, not stacked on the right.
- Open a small dropdown for a primary item on hover, and on click or keyboard focus too.
- Use the same label for the navbar CTA and the hero CTA, so both lead to one destination.
- Use a mega menu for core links to signal product depth. Put visuals in the panels, and open them on click and focus as well as hover.

## Social proof

- Never invent testimonials, customers, or logos. Use only the ones the user supplied (init.md).
- Place a client logo strip directly under the hero, as one static row of the most recognizable clients.
- A rotating logo ribbon counts as the page's authored moment when it is the one chosen. Give it a visible pause control (WCAG 2.2.2). Stop it offscreen and under reduced motion.
- Add one button from the logo strip to the customer stories page.
- Strip grid lines and header text from testimonial blocks.

## Feature sections

- Never ship a landing page that only describes steps in plain text. Pair each value heading with real imagery from the user's world.
- For how-it-works sections, use oversized imagery, not rigid step boxes. Textures come only from the product's world (craft-floor.md).

### Bento grid

- For a feature list that would run off-screen, use a bento grid so every item stays visible.
- Replace a row of four equal cards with a bento grid.
- Use 2 to 4 asymmetric cards per row. Skip dense grids of tiny cells.

### Tabs and visuals

- Use full-screen colored tabs with oversized product visuals.
- Cut the body text by about 90%. Start there, then tune.
- Replace a static row of three cards with tabs or a slider the visitor clicks through.
- Group several product workflows in one section, with clickable horizontal or vertical tabs.

## Product reveal

A landing page carries one authored moment (craft-floor.md). Candidates: a rotating logo ribbon, a scroll-stepped diagram, or a scroll-linked product reveal. Pick one per page.

- Never delay the product reveal for a scroll effect.
- Scroll can carry the hero into the product: fade the hero text out while the product fades in.
- Do not pin or hijack the scroll. Keep the page scroll native (NN/g).
- A single section can hold a hover-triggered product demo. Play the same demo on tap and keyboard focus, since touch has no hover.
- Fade out the dashboard chrome and slide feature text beside the isolated UI as the page scrolls.
- A scroll-stepped diagram, such as a pipeline that advances as the page scrolls, counts as the page's authored moment when it is the one chosen. Its steps follow scroll position, and under reduced motion all steps show at once. Do not pin the page to step through it.

## Edge alignment and reading flow

- Center short hero copy. Left-align copy longer than about three lines. Starting value, then tune.
- Split: heading on the left, body copy and CTA on the right.
- For a brand statement, center the text, enlarge the type, and surround it with generous whitespace.
- Do not stack centered text under centered text when the side margins look awkward. Anchor asymmetric type with a horizontal divider.
- Place the nav at the top and the primary CTA early in the top-to-bottom, left-to-right read order.
- Use full-height vertical frame lines only where they sit on real layout columns or section edges. Decorative two-axis grids stay banned.
- Repeating layouts use 12 columns on desktop, 8 on tablet, and 4 on phones. On phones most blocks span all 4, so they read as one column (adapt.md). A custom landing page may break the grid freely.

## Section pacing

- Do not repeat image-left, text-right sections down the whole page. Vary the layout from section to section.
- Start each feature section with one heading, about two lines of body, and one visual. Starting value, then tune.

## Committed world flavor

Flavor comes from the committed world. Pick it from the brief, not by default.

- Warm worlds use warm background tones.
- Warm worlds use colorful graphics. Real illustration or none, never sketch-style SVG (craft-floor.md).
- Warm worlds use larger button radii. Pills stay for small controls (craft-floor.md).
- Modern worlds use desaturated imagery.
- Match illustration playfulness to brand tone: playful characters for a warm world, realistic floating product objects for a modern one. Doodle styles stay out (craft-floor.md).

## Color restraint

- Pull the page's accent colors from the product UI.
- On a dark hero, set the primary CTA in high-contrast white.
- Do not apply the accent to text and buttons at random. Put it on the primary action and on state (color-values.md).

## CTA sections

- Use left-aligned, heavy headline type over a full-bleed background image.
- Start the CTA button at least 2x the heading-to-subtext distance. Count the baseline gap of large display type. Start there, then tune.

## Copy and numbers

- Consolidate copy into a few text blocks, not scattered micro-boxes, overlapping pop-ups, or decorative shapes. Bold numbers are allowed inside text. The hero-metric template stays banned (craft-floor.md).
- Write feature copy as the outcome the user gets, not the action the feature performs. Say "turn data into decisions", not "collect and analyze data quickly". Do not add claims the product cannot back (craft-floor.md).
- Replace corporate phrases with plain, conversational copy. "We take pride in our attention to detail" becomes "We sweat the details".

## Clarity test

- Run the five-second usability test, a standard UX check: a visitor scrolling for 5 seconds should name the core offer.
- Name the product in the headline. Do not hide the category in a 12px corner label over a photo.
