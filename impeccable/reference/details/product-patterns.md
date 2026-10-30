# Product patterns

Patterns for Operate surfaces: app navigation, actions, lists, cards, forms, search, empty states, onboarding, dashboards, and the pricing, footer, and 404 blocks. Load when building or reviewing an app screen, a pricing table, or a footer.

## Sidebar and app navigation

- Put app navigation on the left side. Marketing pages keep the header nav (NN/g).
- Give every nav item a visible text label (NN/g). Do not build an icon-only rail.
- Open the sidebar with the user's avatar, name, and an account switcher arrow as the sidebar header, then team avatars with a Manage Team action, then the main add action.
- Left-align all nav items, with tight vertical spacing between them.
- Style sidebar links as ghost buttons: transparent at rest, with a background fill on hover.
- Pin Settings and Help to the bottom of the sidebar.
- Nest expanding link lists in dropdowns or collapsible groups, not one long flat list.
- Delete redundant section headers in the sidebar, such as Menu or Other.
- Fill empty sidebar space with a compact notification box.
- Show a right-aligned count or a New chip on a nav item that has news.
- When nav links overflow, move the extra links into one menu.
- Use tabs to switch related table views in place. Do not add sidebar links for them.
- Put separate areas of one page, such as Billing and Usage, into tabs.
- Give a dedicated page a back button or breadcrumbs.
- Make the sidebar slightly darker than the canvas, or tint it as color-values.md describes for the app frame.

## Header actions

- Reserve the top header for page actions, such as a filter and one primary Create action.
- Do not spend header height on a large title or banner. Move global controls to the sidebar.
- Collapse secondary utilities, such as favorites and notifications, into one menu button.
- For header actions such as the cart, use icon plus text, or icon plus count plus accessible name.
- Show a labeled Sign In action to signed-out visitors, not a bare profile icon.
- Add a search field to the header to balance the right-side actions.
- Remove header icons that do nothing for the task, such as a voice-dictation mic in a field with no voice input.

## Account menu

- Put Settings, Billing, and Usage inside an account card popover, not a gradient letter-circle avatar.
- Keep a permanent shortcut cheat sheet in the settings menu.

## Icon-only controls and labels

- Every icon-only control has an accessible name and a tooltip.
- Give ambiguous column headers and labels a tooltip too.

## Actions and buttons

- Rank each action by how often it runs. Keep frequent actions visible. Put rare ones in a menu or a hover reveal. Reveal rare actions on tap and on keyboard focus too. Never on hover alone.
- Dim secondary button fills so they stay below the primary action.
- Give the primary color only to the safe, non-destructive action in a dialog.
- When one action has several scopes (slide, chapter, whole), use one Share button that opens a popover with each scope.

## Menus

- Set clickable menu items apart from headers with type weight and alignment.
- Right-align keyboard shortcuts in menus.

## Lists and tables

### Row content

- Show only the fields a user scans. For a link list: favicon, short link, destination URL, date, click count, and a short description. Move the rest to the detail view.
- Show avatars for people in lists and activity logs, so ownership reads at a glance.
- Mark a cell that holds a comment with a small corner triangle.
- Show a time-ordered log as a vertical timeline in a side panel or a second column, not as table rows.
- In a dense table, reveal a cell's copy chip on hover and on keyboard focus.
- When a full-width list feels too dense, do not add vertical space. Keep the density and differentiate rows with avatars and groups.
- Group rows by category or due date.
- Test a dense list with a find task. Users should locate any item in about 1 second (a starting target).

### Alignment

- Align primary labels hard left and secondary values, such as prices, hard right.
- On Operate surfaces, keep text left or right aligned. Center only non-essential metadata.
- In compact UI (cards, chat inputs, kanban cards, sidebars), lock every internal element to at least two edges.
- Before hiding actions in a corner menu, or stretching a button across empty space, align avatars and actions in one row. Content stacks against that row's edge.

### Row states and separators

- Dim inactive or deactivated rows, so active rows read first.
- Separate rows with whitespace while the list has room. When rows are packed, add dividers (starting choice) or a subtle alternating row fill (zebra striping, NN/g).

### Table tools

- Give a data table search, filter, and sort controls, and one control that clears them.
- Selecting items with checkboxes reveals a Bulk Actions control.

### Long lists

- Use a Load More button for long lists, not infinite scroll (NN/g).
- Load More keeps the footer reachable.

## Chips and status values

- Show a fixed set of values, such as status or department, as chips.
- Keep default chips gray. A non-default chip takes color, so it stands out without a heavier font.
- Let users swap a category chip's value in place, without opening a menu.
- Shorten a status chip to an icon and one word, not a sentence.
- Reserve the strongest color for urgent data states only, such as a red status icon.

## Cards

- Put the image at the top of a listing card.
- Set the primary title large and bold at the top left of a card.
- Put the price at the top right, in the accent color, not a fixed blue.
- On a data card, move the date to the center.
- On a listing card, stack name and location at the top left, and cost and rating at the top right. Put the specs in one middle row, as icons.
- Give card content generous inner padding, so it does not feel cramped.
- On a hard-to-parse card, replace extra labels and tooltips with a diagram or an icon.
- Hide grid item metadata until the user clicks the item.
- Put the card's one link on its title, and extend that link's hit area over the card (Inclusive Components). Do not wrap the card in a link or button.
- A hover arrow shows the link. Keyboard focus shows the same cue.
- Repeated cards carry no CTA button.
- Add a button only for a separate action, such as Try it out.
- Pin card action buttons to a corner of the card.
- Start the image at 3/4 of the card height, then tune.
- Drop explicit field labels such as "Name:" and "Price:" from cards. Show the value with an icon.
- Keep a label only on dates, so they are not confused with other values.
- Show only the decision data on a browse card: location, rating, and price. Leave long descriptions for the detail page.
- In a narrow column, turn a multi-product grid into a horizontal slider.
- Put a short label chip above a slider that names its set, such as New Arrivals.
- Group Prev and Next arrows beside the pagination dots.
- An arrow button with no text links to the catalog. It needs an accessible name and a tooltip.

## Forms and inputs

- Give each input four states: default, focus, error (red border and a message), and an optional warning.
- Place each label above its field. Keep it visible while the user types.
- Placeholders show a realistic example value. A placeholder never replaces the label.
- Fill inputs with a subtle off-white background.
- Gray out disabled text.
- Show the active option of a segmented toggle as an inner pill.
- Put a form inline in the surface that holds its data: a settings list, a table card, or a non-modal side panel.
- Put a Log in link on the first sign-up screen for returning users.

## Search

- When a user knows what they want, split the search bar into its key parameters, such as destination, travelers, and dates.
- While a query is active, show the result count and a clear control inside the search field.
- While a search is active, show the query with a Back to browse control at the top left.
- When browsing matters more than searching, show a compact search pill that opens to full size on click.

## Empty and no-results states

- On a first visit, show a clean full-screen empty state. Do not fill the home screen with placeholder cards.
- Hide filters and secondary controls when a list has no saved items. Show only the empty state.
- A no-results state names the searched term, such as: No items match "quarterly report".
- Offer a spelling or typo suggestion when the query looks misspelled.
- A no-results state has a clear button that resets the search and filters.

## Onboarding and contextual tips

- Show one tip at a time. Trigger the next tip only after the user completes the first action.
- Or show a compact corner checklist of setup steps.
- On the first visit, point one popover at the primary action, such as the + button.
- Dismiss a tip by performing the real action, such as the keyboard shortcut.
- Skip the upfront tour. Show each hint at first use, and make every hint dismissable (NN/g).
- Decide whether an unverified email blocks use or only shows a reminder.
- Ask for team size when a workspace is created. Route managers to an invite step, and let solo users skip it.
- Explain an ambiguous icon with a tooltip at its first use.
- Keep onboarding to a few broad choices, one short tutorial, then the main screen.
- Offer a search field for options outside a fixed list, and a Skip button for users with none.

## Flows and next steps

- Map each screen by asking how the user arrived and what they need next.
- After a creation step, chain to the next step, such as adding members, with a Skip option.
- Chain related decisions into one flow, in order. For example: reach out, choose a template, then decide on batch sends.
- Before building a flow, list its micro-utilities: a filter in the search bar, a top Save button, nav links, and hidden states.
- An Explore button unfolds the view in place rather than navigating away.
- When an action changes another part of the screen, update that part too. Fill the Save icon and place a notification dot on the Saved tab.

## Loading states

- Shape each skeleton to the layout slots the final content fills.
- Use a skeleton for full-page loads (NN/g). A content region with a known layout may use one too (operate.md), though NN/g backs skeletons for full pages only.
- Under 1 second, show no indicator. From 1 second on, show a spinner in a button or on one module (NN/g). Past 10 seconds, show percent done (NN/g).

## Dashboards

- Start a dashboard on a 2-column, 2-row grid, then tune it to the content.
- Place the primary job at the top, and supporting metrics below it.
- Rank each widget High, Mid, or Low before laying out the canvas. Put High widgets at the top left, Mid in the middle, and Low on the bottom row.
- Use one wide, thin container for two reminder cards only when spacing cannot group them. Keep it inside the outer grid margins.
- Put a summary chart for time trends above the log.
- Delete placeholder cards that show no data.
- Show a KPI as a number, such as a percentage, not a status word such as In Progress.
- Show a key task as an always-visible widget, not behind a header button.
- Show only the actions an item supports. A credit card has no send or direct-deposit action.
- Put a card's lock control inside the card widget.
- Use a carousel switcher when several cards share one widget.
- Label an expand control with its destination, such as All Activities, not a minimize icon.
- Show an alert card with its type icon, the amount, the date, and the location.

## Pricing cards

- Start at 3 to 4 plans (starting value).
- Make the monthly price the largest text on a pricing card. Shrink the plan title.
- Show the discount amount next to the price, so a discounted tier does not look cheaper than the tier below.
- List only the features a tier adds over the tier below it.
- Put the CTA above the feature list.
- Use a stroke-only button when a solid fill breaks the top-to-bottom hierarchy.
- Give each card a plan name and a short description.
- Show billing terms under the price, including the renewal rate.
- List excluded features too, so tier limits are visible.

## Footers

- Three to five links fit one row. Do not copy a five-column footer for them.
- Use a centered single row: logo, three to five links, and social icons.
- Put copyright bottom-left and design credits bottom-right.

## 404 page

- A 404 page may be warm. It names the way back, such as a home link or a search field. Other error copy follows clarify.md.
