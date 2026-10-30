# Color values

Exact surface steps, text levels, ramps, state, semantic, dark-mode, and image-overlay color values. Load when choosing or reviewing color on any surface.

## Surface steps

- Light mode layouts. Pick one per product. Do not mix them in one view:
  - Persuade pages: near-white canvas, 98-99% lightness (Material default surface tone 98). Pure 100% white also works, as in Notion.
  - Operate apps: a neutral gray canvas, never a bright gradient. Put white cards on a slightly darker canvas, and reserve 100% white for the elevated cards (starting value).
  - Operate alternative: a white canvas with light-gray containers.
- Tint the outer app frame with about 2% brand hue (starting value), or make it slightly darker than the canvas.
- Dark mode canvas: near-black gray, never #000 (Material).
- Dark mode: a higher surface is lighter than the layer below it, because shadows do not show on dark. If it cannot get lighter, give it a border instead.
- Adjacent dark surfaces differ by about 4-6% lightness. Light mode uses about 2%, so its surface steps stay closer (starting values).
- Each nested dark layer steps one level lighter than its parent.
- Light mode starting value from Tailwind: canvas from the 50 step, accent from 500.
- Dark mode starting value from Tailwind: canvas from the 950 step, accent from the 300 step.
- Separate a card header with a tinted fill, not a divider line. Use the brand color at reduced opacity.

## Gradients

- Gradients use one hue only: two steps of one ramp. Remove the gradient when no single hue fits.

## Text levels

- Light mode text levels, as the share of white mixed into black (0% is pure black):
  - Headings: about 11% white (starting value). Never 0% (pure black).
  - Body: 15-20% white (starting value).
  - Muted labels: 30-40% white (starting value).
- Primary text is solid at 100% opacity.
- Secondary text uses a solid token, not alpha, because alpha changes contrast with the background. Contrast ratios: colorize.md.
- Input borders use a solid token, not alpha (contrast ratios: colorize.md).
- Secondary metadata: dark gray on neutral surfaces, or a dark tint of the brand hue on colored ones.
- Lighten borders around well-grouped elements.

## Ramps

- Lighter steps for backgrounds, darker steps for text. Build ramps in OKLCH: L is lightness, C is chroma (colorfulness), and H is hue. Change L per step and keep H steady. Chroma near white and black: see colorize.md.
- Light mode ramp: 500 or 600 for the primary fill, 700 for hover, 400 or 500 for text links only if they pass 4.5:1 on the canvas; otherwise a darker step such as 600 (starting values).
- Theme a neutral: lower its L by 0.03, raise its C by 0.02, and rotate its H to the brand hue (starting values).
- If white text fails 4.5:1 on the brand color, darken the brand shade or pair it with a darker accessible shade.
- Analogous hues: rotate slightly on the color wheel for multi-segment components, such as a storage bar.
- Complement: pair with its complement across the wheel for one accent, such as yellow with purple.

## Interaction states

- Button importance: the more important the action, the darker the fill. A ghost button is lightest. A primary button can be near-black with white text.
- Utility buttons use a fill at 90-95% white (starting value).
- Hover: a slightly lighter base color (starting value). Keep it as a named state token, not an ad hoc tweak.
- Pressed: a slightly darker base color (starting value) on desktop and on a mobile tap, because a tap has no hover.
- Disabled: a desaturated light-gray fill with muted text. Keep the shape and label, so the control reads without color. Inactive controls are exempt from the 3:1 rule (WCAG 1.4.11).
- Every link has a hover state, such as a color shift or an underline.

## Semantic and destructive colors

- Reserve semantic hues for meaning. Do not use them for decoration.
- Error or danger is red, warning is amber, success is green, and info is blue (Carbon). Pair each status color with a non-color cue (colorize.md).
- Build states get distinct colors: success, failure, and in-progress each have their own color and label.
- Destructive actions use the danger role, red, with a verb label (Apple HIG). Use the primary danger style only when the step is required.
- Never give a destructive action the brand primary color. It pulls attention the wrong way.
- Keep red (danger) and green (success) in the palette, whatever the brand color is.
- Non-destructive badges, such as unread counts, may use red or the brand color (starting value).
- Operate UI: icons stay neutral. Use color on an icon only for status or the active state.

## Dark mode

- Dark mode body text: a neutral light gray. Off-white, not #fff (Material). Lower its brightness to reduce eye strain.
- Reserve pure white for the most important titles and primary actions, such as the app logo.
- Widen the lightness gap between cards and borders, so surfaces stay distinct.
- Desaturate bright brand logos and accents, but only after testing contrast.
- Dark mode accent: primary at 300 or 400 on the ramp (starting value), hover at 400 or 500 (starting value). Dim the body text, the primary text color, and brighten borders.

## Chips and badges

- Status chip backgrounds: desaturate and dim the bright fill.
- In dark mode, status chip text is a brighter tint of the chip hue.
- Chips never use the primary CTA fill color, so they never read as buttons.

## Text over images

- Never set raw text on a busy photo. Put it on a scrim or a solid area (NN/g).
- Use a bottom gradient scrim under the text, starting at the photo's lower edge (NN/g). Layer the text on top of it.
- A flat overlay also works, if it passes 4.5:1 against the brightest pixel behind the text.
- Progressive blur is an option only on top of a scrim that already passes 4.5:1 (starting value).
- Dots and arrows over a photo sit in a dark pill, or below the photo.
- A brand-colored card may carry one oversized, low-opacity logo. Its text still passes 4.5:1.

## Color hierarchy

- Use 60-30-10 (NN/g) as a hierarchy guide, not a pie chart (Jasmine Alley). Dominant and secondary roles stay neutral. The accent goes to primary actions and state.
- Product UI runs more neutral than 60%.
- Product UI often runs about 90% neutral, 8% contrast, and 2% accent. Use it as a starting point.
- Build color in four layers: neutrals, functional accent ramps, semantic hues, and theme mapping.
- Product UI: four background layers, one or two stroke colors, and three text levels (starting values).
- Never use five different bright accent fills on sibling cards.
- If a brand color overpowers secondary cards, fill those cards with a soft tint and use near-black text.
- Swap a bright fill that competes with the primary action for a cohesive tinted surface.
- Pull a purple toward blue when it is the most saturated color in view.
- Darken a bluish background into a deep purple-gray (starting value).
