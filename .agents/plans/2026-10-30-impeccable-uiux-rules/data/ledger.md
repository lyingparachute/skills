# Ledger

| id | status | rule | outcome | destination | anchor |
|---|---|---|---|---|---|
| 001-139:5 | OUT-OF-SCOPE | Premise: four intent-resolution paradigms (waiting, inferring, acting first, user commitment) trade time, certainty, trust | out-of-scope |  |  |
| 001-139:7 | MISSING | Competing click actions: add artificial delay to detect a second click (700 ms vs 300 ms taps) | landed | details/interaction.md#Clicks and presses | Wait the platform double-click time |
| 001-139:8 | MISSING | Non-competing actions (single-click highlight, double-click edit): no click delay | landed | details/interaction.md#Clicks and presses | Non-competing actions get no delay |
| 001-139:9 | MISSING | Moving secondary actions to a detail screen removes click delay, costs multi-level convenience | landed | details/interaction.md#Clicks and presses | Move a competing action off the target |
| 001-139:10#1 | MISSING | Diagonal submenu safe triangle: keep submenu open while cursor stays in triangle above minimum speed | landed | details/interaction.md#Menus and tooltips | Draw a triangle from the pointer |
| 001-139:10#2 | MISSING | Switch to adjacent menu items only when cursor moves slowly | landed | details/interaction.md#Menus and tooltips | Outside the triangle, switch to the new item at once |
| 001-139:12 | MISSING | Edge-hover: cursor must stay on screen edge a minimum time before collapsed sidebar expands | landed | details/interaction.md#Menus and tooltips | Expand a collapsed edge panel only after |
| 001-139:13#1 | MISSING | Drag-to-reorder near scroll edge: show drop-target preview | landed | details/interaction.md#Drag and edge scroll | show where the item will land |
| 001-139:13#2 | MISSING | Edge scroll zone as velocity gradient (closer to edge, faster scroll) | landed | details/interaction.md#Drag and edge scroll | Scroll speed rises as the pointer |
| 001-139:14#2 | PARTIAL | Execute deletion immediately, remove item, show Undo toast | landed | details/interaction.md#Undo, delay, and autosave | remove the item at once and show an Undo toast |
| 001-139:14#3 | MISSING | Or move item to "Recently Deleted", purged after 30 days | landed | details/interaction.md#Undo, delay, and autosave | A Recently Deleted area keeps items |
| 001-139:15#1 | PARTIAL | Report action complete immediately in UI | landed | details/interaction.md#Undo, delay, and autosave | Show the action as complete |
| 001-139:15#2 | MISSING | Hold real execution in delay buffer (Gmail: 5 s) so user can cancel | landed | details/interaction.md#Undo, delay, and autosave | Hold the real action in a buffer |
| 001-139:16#1 | PARTIAL | Replace manual Save/Cancel with instant auto-save | landed | details/interaction.md#Undo, delay, and autosave | autosave and show the saved state |
| 001-139:16#2 | MISSING | Pair auto-save with version history for rare rollbacks | landed | details/interaction.md#Undo, delay, and autosave | Pair autosave with version history |
| 001-139:17#1 | PARTIAL | Blocking warning modal only for novel, high-stakes, truly irreversible actions | merged | details/interaction.md#Choosing a surface | Modals are for critical warnings, data loss, and irreversible actions |
| 001-139:17#2 | MISSING | Examples: bulk email to 10,000 recipients, money transfer | landed | details/interaction.md#Choosing a surface | sending bulk email to 10,000 recipients |
| 001-139:18 | MISSING | Standard buttons commit on mouseup so dragging away cancels | landed | details/interaction.md#Clicks and presses | Standard buttons act on release |
| 001-139:19 | MISSING | Popover/dropdown trigger commits on mousedown so press-drag-release selects | landed | details/interaction.md#Clicks and presses D3#46 | Menu items commit on release |
| 001-139:20#1 | PARTIAL | Pull-to-refresh and swipe-to-delete show progress toward commit | landed | details/gestures.md#Commit feedback | Show progress toward the commit |
| 001-139:20#2 | MISSING | Keyboard commit on release, cancel on Esc (Cmd+Tab model) | landed | details/interaction.md#Clicks and presses | Hold-to-switch shortcuts commit on release |
| 001-139:24 | OUT-OF-SCOPE | Premise: receipt-style edge alignment and scannability | out-of-scope |  |  |
| 001-139:26#1 | MISSING | Primary labels hard-left, secondary values (prices) hard-right | landed | details/product-patterns.md#Alignment | Align primary labels hard left |
| 001-139:26#2 | MISSING | Avoid centered text except non-essential metadata | landed | details/product-patterns.md#Alignment | Center only non-essential metadata |
| 001-139:27 | MISSING | Compact UIs: lock every internal element to at least two edges | landed | details/product-patterns.md#Alignment | lock every internal element to at least two edges |
| 001-139:28 | MISSING | Manufacture an internal edge: align avatars/actions in one row for content to stack on | landed | details/product-patterns.md#Alignment | align avatars and actions in one row |
| 001-139:29 | MISSING | Taller icon in stacked list: add subline to restore bottom edge | landed | details/surfaces.md#Padding and Icon Size | add a subline so the bottom edge aligns |
| 001-139:30#1 | PARTIAL | Dense full-width list: differentiate before adding whitespace | landed | details/product-patterns.md#Row content | do not add vertical space |
| 001-139:30#2 | MISSING | Avatars for people in lists | landed | details/product-patterns.md#Row content | avatars for people in lists |
| 001-139:30#3 | PARTIAL | Group rows by category or due date | landed | details/product-patterns.md#Row content | Group rows by category or due date |
| 001-139:30#4 | MISSING | Items locatable in about 1 second | landed | details/product-patterns.md#Row content | locate any item in about 1 second |
| 001-139:31#1 | PARTIAL | Replace extra labels/tooltips on hard-to-parse cards with visual primitives (diagrams, icons) | landed | details/product-patterns.md#Cards | replace extra labels and tooltips |
| 001-139:31#2 | PARTIAL | Blue underlined text for links | landed | details/typography.md#Links in Text | Body links keep an underline |
| 001-139:31#3 | MISSING | Interactive category chips that swap tags in place without a menu | landed | details/product-patterns.md#Chips and status values | swap a category chip's value in place |
| 001-139:32#1 | PARTIAL | Mute default chips gray so the non-default item stands out without heavier font | landed | details/product-patterns.md#Chips and status values | Keep default chips gray |
| 001-139:33#2 | PARTIAL | Avoid border-on-border clutter and stacked border radii | merged | details/surfaces.md#Concentric Border Radius | Mismatched border radii on nested elements |
| 001-139:33#3 | PARTIAL | Replace card wrappers with one vertical column divider; rows and sections group | landed | details/surfaces.md#Structural Frame Lines | one vertical column divider |
| 001-139:37 | OUT-OF-SCOPE | Premise: vibe-coded sites lack domain identity, custom photography, cohesive scroll motion | out-of-scope |  |  |
| 001-139:39 | PARTIAL | Never ship text-only setup steps; pair value heading with real domain imagery | landed | details/landing.md#Feature sections | Never ship a landing page that only describes steps in plain text |
| 001-139:41#1 | CONFLICT | Anchor: start from one moody domain photo, not sterile light or flat dark mode | landed | details/landing.md#Anchor photo D3#1 | Light or dark comes from the use scene |
| 001-139:41#2 | MISSING | Crop and darken the anchor photo | landed | details/landing.md#Anchor photo | Crop and darken the anchor photo |
| 001-139:41#3 | CONFLICT | Layer noise over the anchor photo | rejected | banned grain D3#2 |  |
| 001-139:42 | MISSING | Sample earthy primary tones from anchor photo; pair with high-contrast accent | landed | details/landing.md#Anchor photo | Sample the primary tones from the anchor photo |
| 001-139:43#2 | CONFLICT | Pair expressive serif with clean sans-serif | landed | details/typography.md#Font Count and Roles D3#3 | A serif with a sans is allowed |
| 001-139:44 | PARTIAL | Custom feature icons in brand accent colors | landed | details/surfaces.md#Padding and Icon Size | feature icons may take the brand accent |
| 001-139:45 | MISSING | Build layout skeleton from proven structural patterns before brand styling | merged | new-work.md#6. Build with full commitment | The form supplies structure, reading order |
| 001-139:46 | MISSING | Hero: central actionable copy with domain objects scattered around | landed | details/landing.md#Focal point and scattered objects | Put the actionable copy at the center |
| 001-139:47 | MISSING | Rotating client logo ribbon directly under hero | landed | details/landing.md#Social proof | Stop it offscreen and under reduced motion |
| 001-139:48 | PARTIAL | How It Works: oversized imagery with domain textures, not rigid step boxes | landed | details/landing.md#Feature sections | use oversized imagery, not rigid step boxes |
| 001-139:49 | MISSING | Features: full-screen colored tabs, oversized product visuals, body text cut about 90% | landed | details/landing.md#Tabs and visuals | full-screen colored tabs with oversized product visuals |
| 001-139:50 | PARTIAL | Testimonials: cards stripped of grid lines and header text | landed | details/landing.md#Social proof | Strip grid lines and header text |
| 001-139:51 | MISSING | CTA: left-aligned heavy bold type over full-bleed background image | landed | details/landing.md#CTA sections | left-aligned, heavy headline type |
| 001-139:53 | MISSING | CTA buttons at least 2x the heading-to-subtext vertical distance (baseline gap included) | landed | details/landing.md#CTA sections | at least 2x the heading-to-subtext distance |
| 001-139:54 | MISSING | Scatter: larger floating assets low, smaller high, strict safety margin around center text | landed | details/landing.md#Focal point and scattered objects | Place larger floating objects low |
| 001-139:55 | MISSING | Vignette: darken outer hero edges to focus center copy | landed | details/landing.md#Focal point and scattered objects | Darken the outer edges of the hero background |
| 001-139:56#1 | PARTIAL | Alternate section treatments to pace the scroll | merged | new-work.md#Both paths | a dense passage earns a quiet one |
| 001-139:56#2 | CONFLICT | Graph-paper grid texture on a cream section | rejected | graph paper needs a real canvas D3#4 |  |
| 001-139:56#3 | PARTIAL | Dominant product screenshots in the clean section | landed | details/landing.md#Product UI in the hero | Make product screenshots dominant |
| 001-139:58 | CONFLICT | 1-2 signature motion patterns repeated across the whole site | landed | details/motion.md#Authored moments D3#6 | Pick one signature motion |
| 001-139:59 | MISSING | Hero-to-section scroll: slide assets off, blur hero text, slide section over hero; reverse at bottom CTA | landed | details/motion.md#Scroll transitions D3#44 | Slide the hero's floating assets off |
| 001-139:60#1 | PARTIAL | Multi-image showcase on automatic rotation timer | merged | details/gestures.md#Carousels | Auto-rotate with a visible pause control |
| 001-139:60#2 | PARTIAL | Subtle zoom-in on cursor hover | landed | details/motion.md#Hover and reveal | Zoom a hovered image in slightly |
| 001-139:64 | OUT-OF-SCOPE | Premise: master UI/UX in 28 days by cloning, restyling, mapping flows | out-of-scope |  |  |
| 001-139:66 | MISSING | Four-zone hero skeleton: navbar, main text, hero image, stats block | landed | details/landing.md#Hero zones and spacing | A hero has four zones |
| 001-139:68 | MISSING | Heading-to-subtext gap 8 px | landed | details/landing.md#Hero zones and spacing | Heading to subtext: 8px |
| 001-139:69 | CONFLICT | Eyebrow text 12 px above heading | rejected | eyebrow ban, craft-floor.md:27 D3#7 |  |
| 001-139:70 | MISSING | Subtext-to-CTA gap 32 px | landed | details/landing.md#Hero zones and spacing | Subtext to CTA: 32px |
| 001-139:71#1 | MISSING | Main heading about 7 words | landed | details/landing.md#Hero zones and spacing | main heading to about 7 words |
| 001-139:71#2 | MISSING | Subtext about 14 words | landed | details/landing.md#Hero zones and spacing | subtext to about 14 words |
| 001-139:72 | MISSING | Navbar links small; only primary conversion CTA is prominent | landed | details/landing.md#Navbar | Make only the primary conversion CTA visually prominent |
| 001-139:73#1 | MISSING | Never obstruct hero focal point; place UI above, below, or left | landed | details/landing.md#Focal point and scattered objects | Keep the focal point of the hero image clear |
| 001-139:73#2 | PARTIAL | No busy background textures behind text | merged | mode-persuade.md#Comps | text reads against whatever sits behind it |
| 001-139:74#1 | PARTIAL | Hierarchy between identical font sizes via opacity, not size | landed | details/typography.md#Weight and Tone | with tone, not size |
| 001-139:74#2 | MISSING | Two stat lines at 15 px: primary 100% opacity, secondary label 55% | landed | details/typography.md#Weight and Tone | secondary label at the muted token |
| 001-139:75 | OUT-OF-SCOPE | Clone existing designs pixel-for-pixel to practice | out-of-scope |  |  |
| 001-139:77#1 | MISSING | Hero layout: text left, image right | landed | details/landing.md#Hero layouts | Text left, image right |
| 001-139:77#2 | MISSING | Hero layout: full-screen background image under text | landed | details/landing.md#Hero layouts | Full-screen background image under the text |
| 001-139:77#3 | MISSING | Hero layout: text top, image bottom (modern standard) | landed | details/landing.md#Hero layouts | Text top, image bottom is the modern standard |
| 001-139:77#4 | MISSING | Hero layout: image top, text bottom (rare) | rejected | landing.md:25 no-op: the brief already picks one layout, so a rare-layout note adds nothing |  |
| 001-139:78#1 | MISSING | Centered text alignment (most common) | landed | details/landing.md#Edge alignment and reading flow | Center short hero copy |
| 001-139:78#2 | MISSING | Left-aligned text | merged | details/landing.md#Edge alignment and reading flow | Left-align copy longer than about three lines |
| 001-139:78#3 | MISSING | Split: heading left, body and CTA right | landed | details/landing.md#Edge alignment and reading flow | heading on the left, body copy and CTA on the right |
| 001-139:79#2 | MISSING | Full-width background bleed image | landed | details/landing.md#Full-bleed background | full-width bleed image works behind |
| 001-139:79#3 | MISSING | Slow-rotating image carousel | landed | details/gestures.md#Carousels | Slow-rotating image carousels follow the same rule |
| 001-139:80#1 | PARTIAL | Brand statement: centered, larger type, generous whitespace | landed | details/landing.md#Edge alignment and reading flow | surround it with generous whitespace |
| 001-139:80#2 | MISSING | Multi-item feature list: Bento grid so all items stay visible | landed | details/landing.md#Bento grid | use a bento grid so every item stays visible |
| 001-139:82#1 | MISSING | Warm flavor: warm background tones | landed | details/landing.md#Committed world flavor | Warm worlds use warm background tones |
| 001-139:82#2 | MISSING | Warm flavor: colorful graphics | landed | details/landing.md#Committed world flavor | Warm worlds use colorful graphics |
| 001-139:82#3 | CONFLICT | Warm flavor: heavily rounded corners | landed | details/surfaces.md#Radius Flavors D3#8 | warm worlds use large radii |
| 001-139:82#4 | MISSING | Warm flavor: large bubbly buttons | landed | details/landing.md#Committed world flavor | Warm worlds use larger button radii |
| 001-139:83#1 | CONFLICT | Modern flavor: sharp, minimal corner radii | landed | details/surfaces.md#Radius Flavors D3#8 | modern worlds use sharp radii |
| 001-139:83#2 | MISSING | Modern flavor: desaturated, premium imagery | landed | details/landing.md#Committed world flavor | Modern worlds use desaturated imagery |
| 001-139:83#3 | CONFLICT | Modern flavor: subtle background noise | rejected | banned grain D3#2 |  |
| 001-139:84#1 | MISSING | Signup: login escape hatch on name/email screen for returning users | landed | details/product-patterns.md#Forms and inputs | Log in link on the first sign-up screen |
| 001-139:84#2 | MISSING | Email verification: decide hard-block vs gentle reminder intentionally | landed | details/product-patterns.md#Onboarding and contextual tips | blocks use or only shows a reminder |
| 001-139:84#3 | MISSING | Ask team size at workspace creation: managers to invite screen, solo users skip it | landed | details/product-patterns.md#Onboarding and contextual tips | Route managers to an invite step |
| 001-139:85 | OUT-OF-SCOPE | Premise: delay portfolio creation until after 28-day learning | out-of-scope |  |  |
| 001-139:86 | OUT-OF-SCOPE | Week 1: collect about 20 hero/feature sections, annotate spacing and hierarchy | out-of-scope |  |  |
| 001-139:87 | OUT-OF-SCOPE | Week 2: pixel-clone two sites with different layouts | out-of-scope |  |  |
| 001-139:88 | OUT-OF-SCOPE | Week 3: restyle one clone in warm and modern flavors | out-of-scope |  |  |
| 001-139:89 | OUT-OF-SCOPE | Week 4: design branching onboarding screens (manager vs solo) | out-of-scope |  |  |
| 001-139:93 | OUT-OF-SCOPE | Premise: dashboards differ from mockups by data-driven form, progressive disclosure, invisible UI | out-of-scope |  |  |
| 001-139:96 | MISSING | Enumerated status/department columns become visual chips | landed | details/product-patterns.md#Chips and status values | Show a fixed set of values |
| 001-139:97 | PARTIAL | Right-align numeric columns so digits align by place value | landed | details/typography.md#Numeric Alignment | Right-align numbers that readers compare |
| 001-139:98#2 | PARTIAL | Shade or dim inactive/deactivated table rows | landed | details/product-patterns.md#Row states and separators | Dim inactive or deactivated rows |
| 001-139:99#1 | MISSING | Sequential time-sorted logs as vertical timeline (sidebar pop-out or second column) | landed | details/product-patterns.md#Row content | vertical timeline in a side panel |
| 001-139:99#2 | MISSING | Top summary chart for time trends | landed | details/product-patterns.md#Dashboards | summary chart for time trends |
| 001-139:100#2 | PARTIAL | Reserve high-contrast color (red chip icon) for urgent data states only | landed | details/product-patterns.md#Chips and status values | Reserve the strongest color for urgent data states |
| 001-139:100#3 | MISSING | User avatars on activity logs | landed | details/product-patterns.md#Row content | avatars for people in lists |
| 001-139:102 | MISSING | Rank every action on explicitness spectrum (global Share button to hover-only copy) | landed | details/product-patterns.md#Actions and buttons | Never on hover alone |
| 001-139:103#1 | PARTIAL | Tuck infrequent secondary workflows into a popover instead of a page redirect | landed | details/interaction.md#Choosing a surface | Put an infrequent secondary workflow |
| 001-139:103#2 | MISSING | Anchor primary sub-action (search input) at top of popover | landed | details/interaction.md#Choosing a surface | Anchor the primary sub-action |
| 001-139:104 | PARTIAL | Swipe actions on mobile hide secondary list utilities | landed | details/gestures.md#Swipe | Swipe actions hide utilities |
| 001-139:105#2 | PARTIAL | Sequence onboarding: one tooltip on #1 action, next only after completion | landed | details/product-patterns.md#Onboarding and contextual tips | Trigger the next tip only after |
| 001-139:105#3 | MISSING | Or a compact corner checklist | landed | details/product-patterns.md#Onboarding and contextual tips | compact corner checklist |
| 001-139:107#1 | PARTIAL | Hidden micro-states: hover copy chips on cells as designed states | landed | details/product-patterns.md#Row content | reveal a cell's copy chip on hover and on keyboard focus |
| 001-139:107#2 | MISSING | Corner triangle indicator on cells holding comments | landed | details/product-patterns.md#Row content | small corner triangle |
| 001-139:107#3 | MISSING | Slide-over drawers and modals as designed hidden layers | landed | details/interaction.md#Choosing a surface | Name its trigger, its close path |
| 001-139:109#1 | PARTIAL | Tooltips on every icon-only button | landed | details/product-patterns.md#Icon-only controls and labels | Every icon-only control has an accessible name |
| 001-139:109#2 | MISSING | Tooltips on ambiguous column headers or labels | landed | details/product-patterns.md#Icon-only controls and labels | ambiguous column headers and labels |
| 001-139:113 | OUT-OF-SCOPE | Premise: four craft tiers from $500 template to $10,000+ conversion engine | out-of-scope |  |  |
| 001-139:115 | OUT-OF-SCOPE | Level 1 tier label (2 of 10) | out-of-scope |  |  |
| 001-139:116#1 | MISSING | Avoid repetitive alternating zigzag sections | landed | details/landing.md#Section pacing | Do not repeat image-left, text-right sections down the whole page |
| 001-139:116#2 | PARTIAL | Avoid disconnected corner radii (sharp image, rounded buttons) | landed | details/surfaces.md#Radius Flavors | Match corner styles across a pair |
| 001-139:117#1 | PARTIAL | Avoid generic stock photos unrelated to the product | merged | new-work.md#Both paths | Search for the subject's physical object rather than the category |
| 001-139:117#2 | PARTIAL | Avoid primary blue applied haphazardly to text and buttons | landed | details/landing.md#Color restraint | Put it on the primary action and on state |
| 001-139:118#1 | PARTIAL | Fix weak hierarchy | merged | craft-floor.md#Verify | obvious scale and weight steps |
| 001-139:118#2 | PARTIAL | Avoid overly long or vague text blocks | merged | clarify.md#Verify | as short as it can be without removing meaning |
| 001-139:119#1 | PARTIAL | Flat nav hierarchy where every link looks identical | merged | details/landing.md#Navbar | Make only the primary conversion CTA visually prominent |
| 001-139:119#2 | MISSING | Nav weighted to the right side | merged | details/landing.md#Navbar | Center the primary nav links |
| 001-139:120 | PARTIAL | Zero motion beyond button hover | landed | details/motion.md#Feedback and state | Hover on a button alone is not enough |
| 001-139:121 | OUT-OF-SCOPE | Level 2 tier label (6 of 10) | out-of-scope |  |  |
| 001-139:122#1 | MISSING | Stacked (vertical) hero layout | merged | details/landing.md#Hero layouts | Text top, image bottom is the modern standard |
| 001-139:122#2 | PARTIAL | Use actual product dashboard UI in hero instead of stock imagery | landed | details/landing.md#Product UI in the hero | Use the real product dashboard UI |
| 001-139:123#1 | MISSING | Pull vibrant accent pops from dashboard UI into page palette | landed | details/landing.md#Color restraint | Pull the page's accent colors from the product UI |
| 001-139:123#2 | MISSING | Primary CTA buttons shift to high-contrast white | landed | details/landing.md#Color restraint | set the primary CTA in high-contrast white |
| 001-139:124#1 | MISSING | Center navigation links | landed | details/landing.md#Navbar | Center the primary nav links |
| 001-139:124#2 | MISSING | Small hover dropdowns for primary nav items | landed | details/landing.md#Navbar | Open a small dropdown for a primary item |
| 001-139:124#3 | MISSING | Outline around important nav buttons | landed | details/landing.md#Navbar | Outline important nav buttons |
| 001-139:125#1 | PARTIAL | Basic page-load animations on landing page | landed | details/motion.md#Feedback and state | One staggered group on a landing page |
| 001-139:126 | OUT-OF-SCOPE | Level 3 tier label (8 of 10) | out-of-scope |  |  |
| 001-139:127#1 | MISSING | Zoom into high-signal parts of dashboard, not the whole raw screen | landed | details/landing.md#Product UI in the hero | high-signal part, not the whole raw screen |
| 001-139:127#2 | MISSING | Frame content in full-height vertical grid lines that scale across viewports | landed | details/landing.md#Edge alignment and reading flow | sit on real layout columns or section edges |
| 001-139:128#1 | PARTIAL | Replace 4-card rows with Bento grid | landed | details/landing.md#Bento grid | Replace a row of four equal cards |
| 001-139:128#2 | MISSING | Convert static 3-card rows into interactive multi-select tabs or sliders | landed | details/landing.md#Tabs and visuals | tabs or a slider the visitor clicks through |
| 001-139:128#3 | PARTIAL | Keep sections shorter and more compact | landed | details/landing.md#Section pacing | one heading, about two lines of body, and one visual |
| 001-139:129#1 | MISSING | Hero announcement badge | rejected | craft-floor.md:27 eyebrow ban: kicker above a heading |  |
| 001-139:129#2 | MISSING | Client logo strip | landed | details/landing.md#Social proof | Place a client logo strip directly under the hero |
| 001-139:129#3 | MISSING | Button to social-proof or customer-stories page | landed | details/landing.md#Social proof | one button from the logo strip |
| 001-139:130 | MISSING | Mega menu for core links | landed | details/landing.md#Navbar | Use a mega menu for core links |
| 001-139:131 | MISSING | Fade hero bottom into logo strip and analytics (no hard break) | landed | details/motion.md#Scroll transitions | Fade the hero bottom into the next section |
| 001-139:132 | OUT-OF-SCOPE | Level 4 tier label (10 of 10) | out-of-scope |  |  |
| 001-139:133#1 | PARTIAL | Custom UI vignettes tailored to the narrative, not zoomed screenshots | landed | details/landing.md#Product UI in the hero | Build a custom vignette for the story |
| 001-139:133#2 | MISSING | Flexible layouts where type widths lead lines into content | rejected | landing.md:123 frame-line rule covers line structure; type-width lead lines are not testable |  |
| 001-139:134 | PARTIAL | Rewrite feature copy as outcomes ("turn data into decisions") | landed | details/landing.md#Copy and numbers | Write feature copy as the outcome the user gets |
| 001-139:136 | PARTIAL | Blur transition when switching multi-select tabs | merged | details/motion.md#Recipes | When two states visibly overlap |
| 001-139:137 | MISSING | Persistent mega menu: morph content instead of close and reopen | landed | details/motion.md#Feedback and state | Swap its content with a short ease-in-out slide |
| 001-139:138 | MISSING | Reveal social-proof CTA on hover over logo strip only | rejected | I7 (NN/g icon-usability): do not rely on hover to reveal text labels; the CTA must stay visible |  |
| 140-340:142 | OUT-OF-SCOPE | Premise: mobile needs bigger base type, one-axis sections, single-purpose screens, bottom sheets, gesture nav | out-of-scope |  |  |
| 140-340:145#1 | PARTIAL | Floating bottom bar with 3-4 key icons | landed | details/mobile.md#Bottom navigation | 3-5 destinations of equal importance |
| 140-340:145#2 | MISSING | Max 5 bottom-bar links, absolute cap | landed | details/mobile.md#Bottom navigation | keep a tab bar to five or fewer destinations |
| 140-340:145#3 | MISSING | Optional primary action breakout on right of bottom bar | landed | details/mobile.md#Bottom navigation | break one primary action out |
| 140-340:147#1 | MISSING | Too many nav items: sidebar becomes homepage, recent items at top | landed | details/mobile.md#Too many destinations | make the sidebar the home screen |
| 140-340:147#2 | MISSING | Item counts and secondary actions aligned to right edge | landed | details/mobile.md#Too many destinations | Align item counts and secondary actions to the right edge |
| 140-340:147#3 | MISSING | Notification bell and "More" menu at top | landed | details/mobile.md#Too many destinations | Put the notification bell and a More menu |
| 140-340:147#4 | MISSING | Bottom edge reserved for large search or primary action | landed | details/mobile.md#Too many destinations | Reserve the bottom edge for a large search field |
| 140-340:148#1 | PARTIAL | Never shrink desktop text to fit phone; mobile text larger | landed | details/mobile.md#Type and size | Never shrink desktop text to fit a phone |
| 140-340:148#2 | PARTIAL | iOS base 17px vs macOS base 13px | landed | details/macos.md#Text size | Set the base text at 13 pt |
| 140-340:149 | PARTIAL | Mobile section moves in one direction only (stack OR horizontal scroll, never both) | landed | details/mobile.md#One scroll axis | scrolls on one axis |
| 140-340:150 | MISSING | Build mobile UI from four primitives: cards, text/links, images, inputs | landed | details/mobile.md#Screen blocks | Compose a phone screen from four blocks |
| 140-340:153#1 | MISSING | One screen = one job (except home) | landed | details/mobile.md#One screen, one job | One screen does one job |
| 140-340:153#2 | MISSING | New feature gets a new screen, not crammed into existing one | landed | details/mobile.md#One screen, one job | A new feature gets a new screen |
| 140-340:154#1 | PARTIAL | Mid-task secondary selection uses bottom sheet, not a new page | merged | details/mobile.md#Mid-task choices | bottom sheet for a choice made mid-task |
| 140-340:154#2 | MISSING | Bottom sheet anatomy: title, search, confirm check, close X, option list; any height | landed | details/gestures.md#Sheets | A title, an optional search field |
| 140-340:154#3 | MISSING | "+" button opens sheet with keyboard up and input bar | landed | details/gestures.md#Sheets | Plus button opens the input |
| 140-340:156 | MISSING | Swipe-right back: underlying screen offset 35% left, moves in sync | landed | details/gestures.md#Swipe | offset the page underneath |
| 140-340:157 | MISSING | Background zooms out as sheet rises, back to 100% on swipe-down | landed | details/gestures.md#Sheets | Scale the background view down |
| 140-340:158 | MISSING | Vertical swipe-up on main views opens global search | landed | details/gestures.md#Swipe | A vertical swipe-up on a main view opens global search |
| 140-340:159#1 | MISSING | Long-press blurs background | landed | details/gestures.md#Long-press D3#44 | Dim, do not blur, the background |
| 140-340:159#2 | MISSING | Long-press slightly zooms pressed element | landed | details/gestures.md#Long-press | Enlarge the pressed element slightly |
| 140-340:159#3 | MISSING | Long-press shows contextual action menu or preview | landed | details/gestures.md#Long-press | Open a menu or a preview |
| 140-340:160#1 | MISSING | Hide main nav bar when entering focused workflow | landed | details/mobile.md#Focused flows | Hide the main navigation bar when |
| 140-340:160#2 | MISSING | Editor swaps bottom nav for formatting/share controls | landed | details/mobile.md#Focused flows | replace the bottom navigation with formatting |
| 140-340:160#3 | MISSING | Template picker shows only Confirm and X | landed | details/mobile.md#Focused flows | A template picker shows only Confirm |
| 140-340:162#1 | PARTIAL | First-time empty state: full-screen, no instructional placeholder cards on home | landed | details/product-patterns.md#Empty and no-results states | clean full-screen empty state |
| 140-340:162#2 | PARTIAL | Simple popover points at the primary "+" button | landed | details/product-patterns.md#Onboarding and contextual tips | point one popover at the primary action |
| 140-340:163#2 | PARTIAL | Explicitly acknowledge no items match the searched keyword | landed | details/product-patterns.md#Empty and no-results states | names the searched term |
| 140-340:163#3 | PARTIAL | Spelling/typo suggestions on no results | landed | details/product-patterns.md#Empty and no-results states | spelling or typo suggestion |
| 140-340:163#4 | PARTIAL | Clear button to exit the empty state | landed | details/product-patterns.md#Empty and no-results states | clear button that resets the search and filters |
| 140-340:167 | OUT-OF-SCOPE | Premise: ten foundational UI/UX pillars | out-of-scope |  |  |
| 140-340:169#1 | CONFLICT | Wrap related items in a shared container as signifier | merged | layout.md#Apply D3#9 | Use proximity before adding containers |
| 140-340:169#2 | MISSING | Wrap active toggle option in inner pill container | landed | details/product-patterns.md#Forms and inputs | active option of a segmented toggle |
| 140-340:169#3 | PARTIAL | Gray out disabled text | landed | details/product-patterns.md#Forms and inputs | Gray out disabled text |
| 140-340:169#5 | PARTIAL | Tooltip as signifier | landed | details/product-patterns.md#Icon-only controls and labels | Every icon-only control has an accessible name |
| 140-340:170#1 | MISSING | Card: image at top | landed | details/product-patterns.md#Cards | Put the image at the top |
| 140-340:170#2 | MISSING | Card: primary title large and bold, top-left | landed | details/product-patterns.md#Cards | primary title large and bold |
| 140-340:170#3 | MISSING | Card: price top-right in blue | landed | details/product-patterns.md#Cards | Put the price at the top right |
| 140-340:170#4 | PARTIAL | Secondary metadata (time/date) shrinks below title | landed | details/typography.md#Section Hierarchy | one step below the title |
| 140-340:170#5 | CONFLICT | Replace "From/To" text labels with directional icons joined by a line | rejected | icons never replace text, I7 D3#10 |  |
| 140-340:172#1 | MISSING | 12 columns desktop, 8 tablet, 4 mobile for repeating layouts | landed | details/landing.md#Edge alignment and reading flow | 12 columns on desktop, 8 on tablet, and 4 on phones |
| 140-340:173#2 | PARTIAL | Example: 32px vertical gap between major hero blocks | merged | layout.md#Apply | A 4-unit base usually |
| 140-340:175 | CONFLICT | One clean sans-serif font across the design | landed | details/typography.md#Font Count and Roles D3#14 | One family by default |
| 140-340:176#2 | CONFLICT | Large display headings: line-height 110-120% | landed | details/typography.md#Line Height D3#16 | Headings start at 1.1 to 1.3 |
| 140-340:177#1 | CONFLICT | Max 6 font sizes on landing pages/websites | landed | details/typography.md#Type Scale D3#15 | A full landing page starts at no more than 6 sizes |
| 140-340:177#2 | MISSING | Dashboard typography capped at 24px | landed | details/typography.md#Type Scale | Start dashboard text at a 24px maximum |
| 140-340:179 | PARTIAL | Build color ramp from one brand color: lighter for backgrounds, darker for text | landed | details/color-values.md#Ramps | Lighter steps for backgrounds |
| 140-340:180#1 | PARTIAL | Reserve semantic colors strictly for functional meaning | landed | details/color-values.md#Semantic and destructive colors | Reserve semantic hues for meaning |
| 140-340:180#2 | CONFLICT | Fixed hues: blue=trust, red=danger, yellow=warning, green=success | landed | details/color-values.md#Semantic and destructive colors D3#18 | warning is amber |
| 140-340:183 | PARTIAL | Dark mode depth: elevated surfaces lighter than background (shadows don't read) | landed | details/color-values.md#Surface steps | a higher surface is lighter |
| 140-340:184#1 | PARTIAL | Desaturate and dim bright status chip backgrounds | landed | details/color-values.md#Chips and badges | desaturate and dim the bright fill |
| 140-340:184#2 | MISSING | Flip chip text to a brighter tint | landed | details/color-values.md#Chips and badges | a brighter tint of the chip hue |
| 140-340:185#1 | PARTIAL | Light-mode shadows: lower opacity, higher blur, never the first thing noticed | landed | details/surfaces.md#Declared Elevation and Shadows | lower opacity and a larger blur |
| 140-340:185#2 | PARTIAL | Subtle shadow on standard cards, stronger on floating popovers | landed | details/surfaces.md#Declared Elevation and Shadows | Floating popovers get a stronger shadow token |
| 140-340:185#3 | PARTIAL | Inner + outer shadow combo for tactile raised buttons | landed | details/surfaces.md#Declared Elevation and Shadows | one inner shadow and one outer shadow |
| 140-340:187 | MISSING | Icon pixel size equals adjacent text line-height | landed | details/surfaces.md#Padding and Icon Size | match the line height of the adjacent text |
| 140-340:188 | MISSING | Sidebar nav links as ghost buttons (transparent, fill on hover) | landed | details/product-patterns.md#Sidebar and app navigation | Style sidebar links as ghost buttons |
| 140-340:189 | MISSING | Button horizontal padding = 2x vertical height | landed | details/surfaces.md#Padding and Icon Size | about 1.5-2x the vertical height |
| 140-340:192 | PARTIAL | Inputs: default, focus, error (red border + message), optional warning | landed | details/product-patterns.md#Forms and inputs | error (red border and a message) |
| 140-340:193 | PARTIAL | Click confirmation micro-interaction (e.g., "Copied" chip) | landed | details/motion.md#Text and labels | Swap the copy icon for a check |
| 140-340:194#1 | PARTIAL | Never place raw text over busy images | landed | details/color-values.md#Text over images | Never set raw text on a busy photo |
| 140-340:194#2 | MISSING | Never dull a photo with a flat full-screen dark overlay | rejected | C16: flat overlay is valid when it passes 4.5:1 |  |
| 140-340:194#3 | MISSING | Linear gradient transitioning into the text zone | landed | details/color-values.md#Text over images | a bottom gradient scrim |
| 140-340:194#4 | CONFLICT | Progressive blur over gradient for a "modern finish" | landed | details/color-values.md#Text over images D3#20 | Progressive blur is an option only |
| 140-340:198 | OUT-OF-SCOPE | Premise: AI-built SaaS shows five telltale flaws | out-of-scope |  |  |
| 140-340:201#1 | PARTIAL | Replace clashing bright AI button/icon fills with cohesive dark-tinted surfaces | landed | details/color-values.md#Color hierarchy | a bright fill that competes with the primary action |
| 140-340:201#2 | PARTIAL | Remove decorative card icons | landed | details/surfaces.md#Padding and Icon Size | carry no decorative icon |
| 140-340:201#3 | CONFLICT | Inject color through functional micro-charts, not rainbow buttons | landed | details/charts.md#Micro-charts and progress diagrams D3#23 | Carry color in micro-charts |
| 140-340:203#1 | MISSING | Eliminate redundant KPI rows repeated across tabs | landed | details/charts.md#KPI cards and dashboards | not on every tab |
| 140-340:203#2 | MISSING | Confine metrics to Dashboard and dedicated Analytics tab | merged | details/charts.md#KPI cards and dashboards | not on every tab |
| 140-340:204#1 | MISSING | Left-align sidebar items with tighter vertical spacing | landed | details/product-patterns.md#Sidebar and app navigation | Left-align all nav items |
| 140-340:204#2 | MISSING | Replace gradient letter-circle avatars with Account Card popover (Settings, Billing, Usage) | landed | details/product-patterns.md#Account menu | inside an account card popover |
| 140-340:205#1 | MISSING | Collapse secondary action buttons into "..." menu | merged | critique.md#The Working Memory Rule | group the rest in a menu |
| 140-340:205#2 | MISSING | Move date to center of data card | landed | details/product-patterns.md#Cards | move the date to the center |
| 140-340:205#3 | MISSING | Reduce verbose status chips to simple icons | landed | details/product-patterns.md#Chips and status values | an icon and one word, not a sentence |
| 140-340:205#4 | PARTIAL | Right-align click counts | landed | details/typography.md#Numeric Alignment | Right-align numbers that readers compare |
| 140-340:207#1 | CONFLICT | Few-input creation form: centered modal instead of full-height side flyout | rejected | modal only for critical actions, I9 D3#28 |  |
| 140-340:207#3 | OUT-OF-SCOPE | Include domain/link-card switcher and description field | out-of-scope |  |  |
| 140-340:208#1 | PARTIAL | Delete non-functional placeholder cards | landed | details/product-patterns.md#Dashboards | Delete placeholder cards that show no data |
| 140-340:208#2 | PARTIAL | Organize Billing and Usage into tabs | landed | details/product-patterns.md#Sidebar and app navigation | Put separate areas of one page |
| 140-340:208#3 | PARTIAL | Replace giant KPI boxes with 2-column layout of small donut charts | landed | details/charts.md#KPI cards and dashboards | Start KPI tiles at a 2-column grid |
| 140-340:209#1 | MISSING | Never display more than 4 pricing plans | landed | details/product-patterns.md#Pricing cards | Start at 3 to 4 plans |
| 140-340:209#2 | OUT-OF-SCOPE | Rename high-volume tier "Business" to "Enterprise" | out-of-scope |  |  |
| 140-340:209#3 | MISSING | Shrink plan title font, enlarge monthly price | landed | details/product-patterns.md#Pricing cards | Make the monthly price the largest text |
| 140-340:209#4 | MISSING | Show discount amount explicitly so discounted tiers don't look cheaper | landed | details/product-patterns.md#Pricing cards | Show the discount amount next to the price |
| 140-340:209#5 | MISSING | List only incremental features over previous tier | landed | details/product-patterns.md#Pricing cards | features a tier adds over the tier below |
| 140-340:209#6 | OUT-OF-SCOPE | Append Billing Email and Payment Method fields below plans | out-of-scope |  |  |
| 140-340:210#1 | MISSING | Toggle to split aggregate charts into per-item comparisons | landed | details/charts.md#Comparison series | Offer a toggle between one aggregate chart |
| 140-340:210#2 | MISSING | Pack summary rows with icon-backed metrics | landed | details/charts.md#KPI cards and dashboards | Add an icon only when it names the metric |
| 140-340:210#3 | MISSING | Replace generic bar charts with shaded geographic map plus data table on left | landed | details/charts.md#Maps | Pair every choropleth with a sortable table |
| 140-340:211#1 | PARTIAL | Replace generic feature icons with skewed interactive link cards on marketing page | merged | craft-floor.md#Refuse | Same-size cards of icon plus heading |
| 140-340:211#2 | PARTIAL | Use cropped, edited vignettes of the actual UI on marketing page | landed | details/landing.md#Product UI in the hero | cropped, edited vignettes of the real UI |
| 140-340:215#2 | PARTIAL | Product UI mix about 90% neutral / 8% contrast / 2% accent | landed | details/color-values.md#Color hierarchy | about 90% neutral, 8% contrast, and 2% accent |
| 140-340:215#3 | PARTIAL | Enterprise needs 4-layer color architecture | landed | details/color-values.md#Color hierarchy | Build color in four layers |
| 140-340:218 | PARTIAL | Product UI: 4 background layers, 1-2 stroke colors, 3 text hierarchy variants | landed | details/color-values.md#Color hierarchy | four background layers, one or two stroke colors |
| 140-340:219#1 | MISSING | Base background near-white: 100% (Notion), 99% (Linear), 98% (Vercel) | landed | details/color-values.md#Surface steps | near-white canvas, 98-99% lightness |
| 140-340:219#2 | MISSING | Reserve 100% white for elevated cards on a slightly darker canvas | landed | details/color-values.md#Surface steps | white cards on a slightly darker canvas |
| 140-340:220#1 | PARTIAL | App frame / sidebar slightly darker than canvas | landed | details/product-patterns.md#Sidebar and app navigation | slightly darker than the canvas |
| 140-340:220#2 | PARTIAL | Tint app frame with ~2% brand hue | landed | details/color-values.md#Surface steps | Tint the outer app frame |
| 140-340:221 | CONFLICT | Light-mode card border: ~85% white (15% black), never pure black | landed | details/surfaces.md#Declared Elevation and Shadows D3#27 | never pure black |
| 140-340:222#1 | MISSING | Button importance scale: more important = darker, ghost to pure black | landed | details/color-values.md#Interaction states | the more important the action |
| 140-340:222#2 | MISSING | Utility buttons at 90-95% white | landed | details/color-values.md#Interaction states | Utility buttons use a fill at 90-95% white |
| 140-340:224 | MISSING | Heading text ~11% white, never 0% | landed | details/color-values.md#Text levels | about 11% white |
| 140-340:225 | MISSING | Body text 15-20% white | landed | details/color-values.md#Text levels | Body: 15-20% white |
| 140-340:226 | MISSING | Muted labels 30-40% white | landed | details/color-values.md#Text levels | Muted labels: 30-40% white |
| 140-340:228 | MISSING | Light ramp: 500/600 primary fill, 700 hover, 400/500 text links | landed | details/color-values.md#Ramps | 500 or 600 for the primary fill |
| 140-340:229 | PARTIAL | Dark mode: adjacent surfaces 4-6% brightness apart (light mode ~2%) | landed | details/color-values.md#Surface steps | differ by about 4-6% lightness |
| 140-340:230 | MISSING | Dark mode accent: primary 300/400, hover 400/500, dim text, brighten borders | landed | details/color-values.md#Dark mode | primary at 300 or 400 |
| 140-340:231 | PARTIAL | Dark surfaces always get lighter as they elevate (or use subtle border) | landed | details/color-values.md#Surface steps | give it a border instead |
| 140-340:233#1 | MISSING | Destructive actions must be red | landed | details/color-values.md#Semantic and destructive colors | Destructive actions use the danger role |
| 140-340:233#2 | PARTIAL | Distinct colors for build success, failure, in-progress | landed | details/color-values.md#Semantic and destructive colors | each have their own color |
| 140-340:234#1 | PARTIAL | OKLCH chart spectrum: lock L and C, step hue 25-30 degrees per series | rejected | research-charts-ai.md D7 caps categorical series near 7, and dataviz forbids generated hues for extra series |  |
| 140-340:234#2 | MISSING | Monochrome brand ramps look too similar in multi-series charts | landed | details/charts.md#Comparison series | Shades of one brand hue look too alike |
| 140-340:236 | MISSING | Neutral-to-themed: per neutral, L -0.03, C +0.02, rotate H to brand | landed | details/color-values.md#Ramps | lower its L by 0.03 |
| 140-340:240 | OUT-OF-SCOPE | Premise: macOS apps act as keyboard-driven utilities | out-of-scope |  |  |
| 140-340:242 | MISSING | Utilities live outside main window (floating popover, drawer, hotkey overlay), appear on demand | landed | details/macos.md#Utilities outside the main window | Put an on-demand utility outside the main window |
| 140-340:243#1 | MISSING | Strip traffic lights from transient quick-action panels | landed | details/macos.md#Quick panels | Remove the traffic lights from a transient quick panel |
| 140-340:243#2 | MISSING | Quick panel holds only drop zone, input, action buttons with shortcut hints, native blur | landed | details/macos.md#Quick panels D3#48 | holds only a drop zone, one input |
| 140-340:244 | PARTIAL | On Enter, collapse panel into compact toast while save continues | landed | details/macos.md#Quick panels | collapse the panel into a compact toast |
| 140-340:246 | MISSING | Three zones: top bar, left sidebar, center canvas | landed | details/macos.md#Window layout | in three zones: a top bar |
| 140-340:247 | MISSING | Traffic-light controls integrated into top bar or sidebar | landed | details/macos.md#Window layout | Place the traffic lights in the top bar |
| 140-340:248 | MISSING | Keep top ~50px of window free as drag zone | landed | details/macos.md#Window layout | Keep the area around the traffic lights clear |
| 140-340:250#1 | MISSING | Hide filters and secondary controls when app has no saved items | landed | details/product-patterns.md#Empty and no-results states | Hide filters and secondary controls |
| 140-340:250#2 | PARTIAL | Hide image metadata until item is clicked | landed | details/product-patterns.md#Cards | Hide grid item metadata |
| 140-340:251#2 | MISSING | Light mode: compress surface differences (dark mode needs wider gaps) | landed | details/color-values.md#Surface steps | Light mode uses about 2% |
| 140-340:252#1 | MISSING | Collapsible bottom floating search bar + right slide-out preview panel | landed | details/macos.md#Single-screen utilities | Use a collapsible floating search bar |
| 140-340:252#2 | MISSING | Search shows result count and clear X inside the bar | landed | details/product-patterns.md#Search | result count and a clear control |
| 140-340:252#3 | MISSING | Active query plus "Back to Browse" arrow top-left | landed | details/product-patterns.md#Search | Back to browse control at the top left |
| 140-340:253 | PARTIAL | Every keyboard shortcut triggers immediate visual state change or micro-animation | landed | details/interaction.md#Clicks and presses D3#42 | Shortcuts show their result |
| 140-340:254#1 | PARTIAL | Drag files into quick-save drop zone | landed | details/macos.md#Drag in and out | Accept dragged files on the quick-save drop zone |
| 140-340:254#2 | MISSING | Drag saved assets out into external apps | landed | details/macos.md#Drag in and out | Let saved assets drag out of the canvas |
| 140-340:254#3 | MISSING | Floating action bar (Copy, Find, Delete, Share) in preview panel | landed | details/macos.md#Drag in and out | Put a floating action bar in the preview panel |
| 140-340:255#1 | PARTIAL | Dismiss onboarding by requiring the real keyboard shortcut | landed | details/product-patterns.md#Onboarding and contextual tips | Dismiss a tip by performing the real action |
| 140-340:255#2 | PARTIAL | Permanent shortcut cheat sheet inside settings popover | landed | details/product-patterns.md#Account menu | permanent shortcut cheat sheet |
| 140-340:259 | OUT-OF-SCOPE | Premise: hacks to kill sterile web layouts | out-of-scope |  |  |
| 140-340:262 | CONFLICT | Center hero copy, surround with domain illustrations (coins, invoices, doodles, scribbles) | rejected | sketch SVG ban, craft-floor.md:46 D3#22 |  |
| 140-340:263 | PARTIAL | Generous empty whitespace around the central text block | landed | details/landing.md#Focal point and scattered objects | generous empty whitespace around the central text block |
| 140-340:264 | MISSING | Angle and scale outer elements to trail toward edges, pointing eye to center | landed | details/landing.md#Focal point and scattered objects | trail toward the edges |
| 140-340:265 | PARTIAL | Match illustration playfulness to brand tone (blobs, neo-brutalist doodles, realistic objects) | landed | details/landing.md#Committed world flavor D3#22 | Match illustration playfulness to brand tone |
| 140-340:267#1 | PARTIAL | Non-linear, physics-eased entrances on floating assets | landed | details/motion.md#Scroll transitions | Floating margin assets enter on a spring or ease-out |
| 140-340:267#2 | CONFLICT | Balloon bobs up and down in place (perpetual idle motion) | landed | details/motion.md#Marquee and loops D3#25 | A floating asset may bob or rotate in place |
| 140-340:268 | CONFLICT | Scroll parallax on margin elements for 3D depth | landed | details/motion.md#Marquee and loops D3#25 | Parallax applies to margin assets only |
| 140-340:269 | PARTIAL | Animate words inside headline to illustrate meaning | landed | details/motion.md#Text and labels | Animate a headline word only when the motion shows its meaning |
| 140-340:270 | OUT-OF-SCOPE | "~80% of websites are text" | out-of-scope |  |  |
| 140-340:271#1 | CONFLICT | Hover-triggered text blur reveals floating message bubbles | rejected | decorative blur ban, craft-floor.md:34 D3#21 |  |
| 140-340:271#2 | PARTIAL | Subtle hover interaction on every simple link | landed | details/color-values.md#Interaction states | Every link has a hover state |
| 140-340:272#2 | PARTIAL | Conversational phrasing ("We sweat the details") | landed | details/landing.md#Copy and numbers | Replace corporate phrases with plain, conversational copy |
| 140-340:274#1 | MISSING | Interactive 404: mini-game, auto-redirect when finished | landed | details/motion.md#Authored moments | may hold a small interactive |
| 140-340:274#2 | PARTIAL | Charming character illustration on 404 | merged | details/motion.md#Authored moments | a real character illustration |
| 140-340:274#3 | CONFLICT | Playful conversational error copy on 404 | landed | details/product-patterns.md#404 page D3#37 | names the way back |
| 140-340:278 | OUT-OF-SCOPE | Premise: three categories of swipe interaction | out-of-scope |  |  |
| 140-340:281#1 | CONFLICT | Never linear easing on swipe; add bounce for momentum | landed | details/gestures.md#Swipe D3#24 | Swipe release uses a spring |
| 140-340:281#2 | PARTIAL | Tune easing to tone: snappy, springy, or smooth | landed | details/motion.md#Easing D3#24 | Persuade may tune the curve |
| 140-340:282 | MISSING | 3D ring: skew carousel cards near screen edges | landed | details/gestures.md#Carousels | Skew cards as they near the screen edges |
| 140-340:283 | MISSING | Magnetic fluid pagination dots that stretch during swipe | landed | details/gestures.md#Carousels | The active dot stretches with the swipe position |
| 140-340:284 | MISSING | Screen-edge horizon shrinks items; circular thumb-swipe path | landed | details/gestures.md#Swipe | A circular thumb path, or items that shrink |
| 140-340:285 | PARTIAL | Pair every swipe with explicit tap target (swipe plus button) | landed | details/gestures.md#Pair every gesture with a tap target | Every gesture has a visible control |
| 140-340:287#1 | MISSING | Swipe-up expands card and container to full screen together | landed | details/gestures.md#Swipe | expand the card and its container to full screen at once |
| 140-340:287#2 | MISSING | Body content fades up along swipe vector | landed | details/gestures.md#Swipe | Fade the body content up along the swipe direction |
| 140-340:287#3 | CONFLICT | Elastic snap at top of expansion | landed | details/gestures.md#Swipe D3#24 | settle with a low-bounce spring on release |
| 140-340:288 | MISSING | Onboarding: expanding circle background transition; Next button clickable and swipeable | landed | details/gestures.md#Swipe | Onboarding Next works by tap and swipe |
| 140-340:289 | PARTIAL | Hero zoom continuity: tapped card image zooms into next page hero | landed | details/motion.md#Feedback and state | A tapped card image zooms into the next page's hero |
| 140-340:291 | MISSING | Magnetic swipe-to-add row with long-press backup | landed | details/gestures.md#Swipe | stretches a magnetic indicator to confirm the add |
| 140-340:292#1 | PARTIAL | Swipe-down dismissal of bottom popover alongside close button | landed | details/gestures.md#Sheets | A bottom sheet closes on a swipe down |
| 140-340:292#2 | MISSING | Background zoom/shift synced with sheet open and dismiss | merged | details/gestures.md#Sheets | Restore it to 100% as the sheet closes |
| 140-340:293 | PARTIAL | Full-width slide-to-confirm track for high-stakes irreversible actions | landed | details/gestures.md#Slide to confirm | Replace the tap with a track |
| 140-340:297 | OUT-OF-SCOPE | Premise: portfolio showcase vs client presentation | out-of-scope |  |  |
| 140-340:300 | OUT-OF-SCOPE | Portfolio: light-mode ambient backdrop from darkened, desaturated accent with faint shadow | out-of-scope |  |  |
| 140-340:302#1 | OUT-OF-SCOPE | Portfolio: dark-mode blurred accent circles behind frame | out-of-scope |  |  |
| 140-340:302#2 | OUT-OF-SCOPE | Portfolio: glassy container with soft gradient stroke | out-of-scope |  |  |
| 140-340:303 | OUT-OF-SCOPE | Extend grid lines / bleed UI past device frame | out-of-scope |  |  |
| 140-340:304#1 | OUT-OF-SCOPE | Skew 2 degrees vertical, -14 degrees horizontal | out-of-scope |  |  |
| 140-340:304#2 | OUT-OF-SCOPE | Pop-out offset primary layer with drop shadow, placeholder in original slot | out-of-scope |  |  |
| 140-340:305#1 | OUT-OF-SCOPE | Diagonal, rotated, skewed multi-screen collages | out-of-scope |  |  |
| 140-340:305#2 | OUT-OF-SCOPE | Zoom into component cluster on dense dashboards with micro-animation | out-of-scope |  |  |
| 140-340:306 | OUT-OF-SCOPE | Pair physical-world businesses with photography that does not overpower UI | out-of-scope |  |  |
| 140-340:308 | OUT-OF-SCOPE | Client presentation: realistic hardware and lifestyle mockups | out-of-scope |  |  |
| 140-340:309 | OUT-OF-SCOPE | 2-minute AI mockup via green-screen prompt and keying | out-of-scope |  |  |
| 140-340:310 | OUT-OF-SCOPE | Pair mockups with clickable prototypes showing gestures and sequences | out-of-scope |  |  |
| 140-340:312 | OUT-OF-SCOPE | Premise: seven color mistakes | out-of-scope |  |  |
| 140-340:317 | PARTIAL | Never use 5 bright accent fills on sibling cards | landed | details/color-values.md#Color hierarchy | Never use five different bright accent fills |
| 140-340:318#1 | CONFLICT | Follow 60-30-10 (60% neutral, 30% secondary, 10% accent) | landed | details/color-values.md#Color hierarchy D3#19 | as a hierarchy guide, not a pie chart |
| 140-340:318#2 | MISSING | If brand color overpowers secondary cards, use soft-tint card fill and black text | landed | details/color-values.md#Color hierarchy | fill those cards with a soft tint |
| 140-340:319#1 | PARTIAL | Keep icons neutral; reserve color for status | landed | details/color-values.md#Semantic and destructive colors | Operate UI: icons stay neutral |
| 140-340:321#1 | PARTIAL | No bright gradient app background; neutral gray canvas | landed | details/color-values.md#Surface steps | a neutral gray canvas |
| 140-340:321#2 | PARTIAL | Or white canvas with light-gray feature containers | landed | details/color-values.md#Surface steps | a white canvas with light-gray containers |
| 140-340:323 | CONFLICT | Remove background fill when it clutters; define card with border | landed | details/surfaces.md#Declared Elevation and Shadows D3#27 | Declare one elevation per card |
| 140-340:325#1 | PARTIAL | Analogous colors: rotate slightly on wheel for multi-segment components | landed | details/color-values.md#Ramps | rotate slightly on the color wheel |
| 140-340:325#2 | MISSING | Complementary accent across the wheel | landed | details/color-values.md#Ramps | pair with its complement across the wheel |
| 140-340:326 | PARTIAL | Darken brand or pair with darker accessible shade when white text fails WCAG | landed | details/color-values.md#Ramps | fails 4.5:1 on the brand color |
| 140-340:328#1 | PARTIAL | Replace pure black/white with grays and dark brand tints for text and borders | merged | details/color-values.md#Text levels | Never 0% (pure black) |
| 140-340:328#2 | PARTIAL | Dark gray or dark purple for secondary metadata | landed | details/color-values.md#Text levels | dark gray on neutral surfaces |
| 140-340:328#3 | MISSING | Lighten borders around well-grouped elements | landed | details/color-values.md#Text levels | Lighten borders around well-grouped elements |
| 140-340:329#1 | MISSING | Dark mode: lower brightness of gray text to prevent eye strain | landed | details/color-values.md#Dark mode | Lower its brightness to reduce eye strain |
| 140-340:329#2 | MISSING | Pure white reserved for most important titles and primary actions | landed | details/color-values.md#Dark mode | Reserve pure white for the most important titles |
| 140-340:332#1 | PARTIAL | Dark mode: increase brightness difference between cards and borders | landed | details/color-values.md#Dark mode | Widen the lightness gap between cards and borders |
| 140-340:332#2 | MISSING | Dark mode body copy in neutral light grays | landed | details/color-values.md#Dark mode | body text: a neutral light gray |
| 140-340:332#3 | MISSING | Dark mode headings pure white | merged | details/color-values.md#Dark mode | pure white for the most important titles |
| 140-340:332#4 | PARTIAL | Desaturate bright brand logos/accents in dark mode | landed | details/color-values.md#Dark mode | Desaturate bright brand logos and accents |
| 140-340:334#1 | MISSING | Never style Delete with primary brand color | landed | details/color-values.md#Semantic and destructive colors | Never give a destructive action the brand primary color |
| 140-340:334#2 | PARTIAL | Always include semantic red and green regardless of brand | landed | details/color-values.md#Semantic and destructive colors | Keep red (danger) and green (success) |
| 140-340:334#3 | MISSING | Non-destructive badges may use red or brand color | landed | details/color-values.md#Semantic and destructive colors | may use red or the brand color |
| 140-340:337 | MISSING | Hover (desktop): slightly lighter/brighter base color | landed | details/color-values.md#Interaction states | one ramp step from the base |
| 140-340:338 | PARTIAL | Active/pressed: slightly darker base color (desktop and mobile tap) | landed | details/color-values.md#Interaction states | one step past hover |
| 140-340:339 | PARTIAL | Disabled: desaturate to low-contrast light gray fill with muted text | landed | details/color-values.md#Interaction states | a desaturated light-gray fill |
| 341-575:345 | MISSING | Sidebar top: profile avatar + dropdown instead of static logo | landed | details/product-patterns.md#Sidebar and app navigation | account switcher arrow as the sidebar header |
| 341-575:347#3 | CONFLICT | Sidebar collapses to icon-only rail | rejected | icon-only nav, I7 D3#13 |  |
| 341-575:347#4 | MISSING | Right-aligned count / "New" chips in nav items | landed | details/product-patterns.md#Sidebar and app navigation | right-aligned count or a New chip |
| 341-575:348#2 | MISSING | Push Settings and Help to bottom of sidebar | landed | details/product-patterns.md#Sidebar and app navigation | Pin Settings and Help |
| 341-575:348#3 | PARTIAL | Nest expanding link lists in dropdowns | landed | details/product-patterns.md#Sidebar and app navigation | Nest expanding link lists |
| 341-575:349 | MISSING | Compact notification box in empty sidebar space | landed | details/product-patterns.md#Sidebar and app navigation | compact notification box |
| 341-575:352#1 | MISSING | Strict 2-column, 2-row grid | landed | details/product-patterns.md#Dashboards | Start a dashboard on a 2-column, 2-row grid |
| 341-575:352#2 | PARTIAL | Primary user job at top | landed | details/product-patterns.md#Dashboards | Place the primary job at the top |
| 341-575:352#3 | PARTIAL | Supporting metrics below the primary job | landed | details/product-patterns.md#Dashboards | supporting metrics below it |
| 341-575:352#4 | MISSING | Top header bar reserved for global page actions (filter, Create CTA) | landed | details/product-patterns.md#Header actions | one primary Create action |
| 341-575:354 | MISSING | Minimal list row fields (favicon, link, URL, date, count, description) | landed | details/product-patterns.md#Row content | Move the rest to the detail view |
| 341-575:356 | PARTIAL | Checkbox multi-select reveals contextual Bulk Actions | landed | details/product-patterns.md#Table tools | reveals a Bulk Actions control |
| 341-575:358 | MISSING | Avoid abstract, unreadable custom chart shapes | landed | details/charts.md#Familiar forms | Default to line, bar, and table |
| 341-575:359#1 | MISSING | Line graph: background grid lines | landed | details/charts.md#Axes and gridlines | Draw gridlines faint gray |
| 341-575:359#2 | MISSING | Line graph: axis numbers | merged | details/charts.md#Axes and gridlines | Show a value axis |
| 341-575:359#3 | MISSING | Line graph: top summary metric | merged | details/charts.md#KPI cards and dashboards | Do not show a raw number alone |
| 341-575:359#4 | MISSING | Line graph: date range selector | merged | dataviz | Date range first |
| 341-575:360#1 | MISSING | Bar chart: item favicon beside each bar | landed | details/charts.md#Bar charts | Put an item's icon beside its label |
| 341-575:360#2 | MISSING | Bar chart: date range selector | merged | dataviz | Date range first |
| 341-575:360#3 | MISSING | Bar chart: metric toggles | landed | details/charts.md#Comparison series | Switch measures with a toggle |
| 341-575:362#1 | PARTIAL | Popover for simple non-blocking context | landed | details/interaction.md#Choosing a surface | Use a popover for simple, non-blocking context |
| 341-575:362#2 | MISSING | Popover dismisses on outside click | landed | details/interaction.md#Choosing a surface | Clicking outside dismisses it |
| 341-575:363#1 | PARTIAL | Modal for complex creation flows tied to screen data | rejected | research-interaction-nav-motion.md I9; D3#28: a create form goes inline or in a non-modal side panel |  |
| 341-575:363#2 | PARTIAL | Modal requires explicit Create or Cancel click | landed | details/interaction.md#Choosing a surface | A modal for a critical action waits for an explicit button click |
| 341-575:363#3 | MISSING | Toast after modal confirms the change | landed | details/interaction.md#Choosing a surface | After a modal confirms a change, show a toast |
| 341-575:364#1 | PARTIAL | Toast for non-intrusive feedback without taking over screen | merged | details/interaction.md#Choosing a surface | A toast with no action carries a transient outcome |
| 341-575:364#2 | CONFLICT | Toast for warnings and errors | landed | details/interaction.md#Choosing a surface D3#29 | Inline or dialog, never a toast |
| 341-575:365#1 | MISSING | Dedicated page for permanent deep contexts | landed | details/interaction.md#Choosing a surface | Deep context with its own URL |
| 341-575:365#2 | PARTIAL | Back button or breadcrumbs on dedicated pages | landed | details/product-patterns.md#Sidebar and app navigation | a back button or breadcrumbs |
| 341-575:367#3 | MISSING | Separate list items with alternating row background | landed | details/product-patterns.md#Row states and separators | subtle alternating row fill |
| 341-575:367#4 | MISSING | Turn tables interactive with Search, Filter, Sort | landed | details/product-patterns.md#Table tools | search, filter, and sort controls |
| 341-575:368#1 | PARTIAL | Cards have generous internal padding | landed | details/product-patterns.md#Cards | generous inner padding |
| 341-575:368#3 | CONFLICT | Light mode cards use surface fills, not outlines | landed | details/surfaces.md#Declared Elevation and Shadows D3#27 | by fill tone alone |
| 341-575:369 | MISSING | Combine forms inside modals, settings lists, table cards | landed | details/product-patterns.md#Forms and inputs | a settings list, a table card |
| 341-575:370 | PARTIAL | Tabs switch related views in place, not sidebar links | landed | details/product-patterns.md#Sidebar and app navigation | switch related table views in place |
| 341-575:372#1 | MISSING | Line chart hover: exact value plus % change bubble | landed | details/charts.md#Tooltips and hover | its percentage change from the previous point |
| 341-575:372#2 | MISSING | Bar chart hover: dim non-hovered bars | landed | details/charts.md#Tooltips and hover | dims the other bars |
| 341-575:380 | MISSING | Drop users into a large prompt box, no marketing page | landed | details/ai-interface.md#Entry | Make the prompt box the entry point |
| 341-575:381#1 | MISSING | Render attachments as compact preview blocks | landed | details/ai-interface.md#Attachments and pastes | Show each attachment as a compact preview block |
| 341-575:381#2 | MISSING | Auto-collapse long pasted code into collapsible block | landed | details/ai-interface.md#Attachments and pastes | Convert long pasted code into an attachment chip |
| 341-575:382#1 | MISSING | Selectable mode chips | landed | details/ai-interface.md#Suggestions and modes | Make mode chips selectable |
| 341-575:382#2 | MISSING | @ context-tagging pills | landed | details/ai-interface.md#Suggestions and modes | Add @ context pills only where |
| 341-575:382#3 | OUT-OF-SCOPE | Deep integration buttons (Drive, GitHub, Figma) | out-of-scope |  |  |
| 341-575:383#2 | MISSING | Live token cost estimator above input | landed | details/ai-interface.md#Cost | Show a live low-high cost estimate |
| 341-575:383#3 | PARTIAL | Compact looping loader (bouncing dots, rotating star) | landed | details/ai-interface.md#Waiting | Start with three bouncing dots |
| 341-575:385 | MISSING | History as vertical session list or anchored to originating block | landed | details/ai-interface.md#History | Show past sessions as a vertical list |
| 341-575:386#1 | MISSING | Preview first line or snippet of each generation | landed | details/ai-interface.md#History | Show the first line or snippet |
| 341-575:386#2 | MISSING | Allow chat deletion | landed | details/ai-interface.md#History | Let users delete any chat |
| 341-575:386#3 | MISSING | Search bar over generation history | landed | details/ai-interface.md#History | Put a search field over the history |
| 341-575:388#1 | MISSING | Memory panel not buried in deep settings | landed | details/ai-interface.md#Memory | Keep the memory panel one step from the chat |
| 341-575:388#2 | MISSING | Storage space meter for memory | landed | details/ai-interface.md#Memory | Show a storage meter for memory |
| 341-575:388#3 | PARTIAL | Bulk deletion of memory entries | landed | details/ai-interface.md#Memory | Let the user delete many entries at once |
| 341-575:388#4 | MISSING | User manually adds key facts to memory | landed | details/ai-interface.md#Memory | Let the user add a key fact by hand |
| 341-575:390#1 | MISSING | Highlight any sentence and type revision instructions | landed | details/ai-interface.md#Inline refine | select a sentence or paragraph and type |
| 341-575:390#2 | MISSING | Quick-action buttons (Improve writing, Fix spelling) | landed | details/ai-interface.md#Inline refine | Place quick actions such as Improve writing |
| 341-575:390#3 | PARTIAL | Visible keyboard shortcuts beneath quick actions | landed | details/ai-interface.md#Inline refine | Show the keyboard shortcut next to each quick action |
| 341-575:390#4 | MISSING | Frame edits as revision, not full regeneration | landed | details/ai-interface.md#Inline refine | Revise only the selected part |
| 341-575:392 | MISSING | Expose intermediate reasoning steps and sources | landed | details/ai-interface.md#Sources and reasoning | Show the steps the AI took |
| 341-575:393#1 | PARTIAL | Trail steps fade in sequentially | landed | details/ai-interface.md#Sources and reasoning | Reveal each step as it finishes, in order |
| 341-575:393#2 | MISSING | Reasoning trail is collapsible | landed | details/ai-interface.md#Sources and reasoning | Collapse reasoning by default |
| 341-575:395 | MISSING | Stream text responses word-by-word | landed | details/ai-interface.md#Waiting | Stream text as it generates |
| 341-575:396#1 | PARTIAL | Skeleton placeholders in the exact layout slots of final output | landed | details/product-patterns.md#Loading states | layout slots the final content fills |
| 341-575:396#2 | MISSING | Moving shimmer on skeleton placeholders | landed | details/motion.md#Loading and waiting | A skeleton may shimmer, slowly and continuously |
| 341-575:398#1 | MISSING | Clickable confidence pill labelled High Confidence or Unverified | landed | details/ai-interface.md#Confidence | a pill labelled High confidence or Unverified |
| 341-575:398#2 | MISSING | Click reveals exact numeric confidence % | landed | details/ai-interface.md#Confidence | Reveal the exact percentage on click |
| 341-575:399#1 | CONFLICT | Dark glass: semi-transparent dark fill | landed | details/surfaces.md#Glass Panels D3#21 | semi-transparent dark fill |
| 341-575:399#2 | CONFLICT | Dark glass: subtle fill gradient | rejected | quieter.md:66 removes decorative gradient fills. D3#21: this glass fill gradient has no stated hue or function. |  |
| 341-575:399#3 | CONFLICT | Dark glass: background blur | landed | details/surfaces.md#Glass Panels D3#21 | blur below 20px |
| 341-575:399#5 | MISSING | Dark glass: soft inner shadow | landed | details/surfaces.md#Glass Panels | A soft inner shadow |
| 341-575:399#6 | CONFLICT | Dark glass: shimmer moving across the border | rejected | ambient border shimmer, craft-floor.md:13 D3#41 |  |
| 341-575:410 | PARTIAL | Map multi-screen flows: how user arrived, what they need next | landed | details/product-patterns.md#Flows and next steps | how the user arrived and what they need next |
| 341-575:411 | PARTIAL | After creation, chain to next prompt (add members) with Skip | landed | details/product-patterns.md#Flows and next steps | chain to the next step |
| 341-575:412 | MISSING | Chain related decisions in one sequence (outreach, template, batch) | landed | details/product-patterns.md#Flows and next steps | Chain related decisions into one flow |
| 341-575:414 | PARTIAL | Primary color reserved for safe, non-destructive action in all dialogs | landed | details/product-patterns.md#Actions and buttons | non-destructive action in a dialog |
| 341-575:415#2 | OUT-OF-SCOPE | Example "Create Listing" modal layout | out-of-scope |  |  |
| 341-575:422 | PARTIAL | Eliminate scattered micro-boxes, overlapping popups, decorative shapes | merged | details/landing.md#Copy and numbers | Consolidate copy into a few text blocks |
| 341-575:423#1 | CONFLICT | Consolidated text blocks with bold numbers | landed | details/landing.md#Copy and numbers D3#39 | Bold numbers are allowed inside text |
| 341-575:423#3 | PARTIAL | 5-second clarity test | landed | details/landing.md#Clarity test | scrolling for 5 seconds should name the core offer |
| 341-575:424#1 | MISSING | Never hide the product category in a small corner label over a photo | landed | details/landing.md#Clarity test | Name the product in the headline |
| 341-575:424#2 | PARTIAL | Bring the actual product UI above the fold | landed | details/landing.md#Product UI in the hero | Put the actual product UI above the fold |
| 341-575:426#1 | PARTIAL | Scroll motion must not delay the product reveal | landed | details/motion.md#Scroll transitions | Never delay the product reveal with a scroll effect |
| 341-575:426#2 | MISSING | Scroll transitions morph hero into product UI | landed | details/landing.md#Product reveal | Never delay the product reveal for a scroll effect |
| 341-575:427 | MISSING | Single-section hover-triggered product demo | landed | details/landing.md#Product reveal | Play the same demo on tap and keyboard focus |
| 341-575:429 | MISSING | In-place feature reveal beside isolated UI on scroll | landed | details/landing.md#Product reveal | slide feature text beside the isolated UI |
| 341-575:430#1 | MISSING | Cursor-reactive background effects | landed | details/motion.md#Hover and reveal | Track the pointer through a spring |
| 341-575:430#2 | PARTIAL | "Explore" button unfolds view in place | landed | details/product-patterns.md#Flows and next steps | unfolds the view in place |
| 341-575:433#1 | MISSING | Menu typography and alignment distinguish clickable items from headers | landed | details/product-patterns.md#Menus | Set clickable menu items apart from headers |
| 341-575:433#2 | PARTIAL | Right-aligned keyboard shortcuts in menus | landed | details/product-patterns.md#Menus | Right-align keyboard shortcuts in menus |
| 341-575:434 | MISSING | Clicking a menu item morphs it into a modal | rejected | research-interaction-nav-motion.md I9 (modals only for critical warnings) |  |
| 341-575:436 | PARTIAL | Mobile onboarding with a hyper-clean canvas | merged | distill.md#Information Architecture | ONE primary action, few secondary actions |
| 341-575:437 | MISSING | Horizontal swipe paired with tools sliding up from bottom | landed | details/gestures.md#Swipe | A tools tray that slides up with a horizontal page swipe |
| 341-575:438#1 | PARTIAL | Bottom-up slide signals temporary or contextual actions | landed | details/motion.md#Feedback and state | Slide a temporary or contextual layer up |
| 341-575:438#2 | MISSING | Horizontal slide signals forward progress | landed | details/motion.md#Feedback and state | Slide a step forward through a flow |
| 341-575:446 | MISSING | Primary intent first: search bar split into key parameters | landed | details/product-patterns.md#Search | split the search bar into its key parameters |
| 341-575:449 | PARTIAL | Do not invent contrarian layouts unless demonstrably better | merged | operate.md#Product permissions | Consistency over surprise |
| 341-575:450#1 | PARTIAL | Information flows top-to-bottom and left-to-right | landed | details/landing.md#Edge alignment and reading flow | Place the nav at the top and the primary CTA early |
| 341-575:450#2 | CONFLICT | Keep navigation at the top | landed | details/product-patterns.md#Sidebar and app navigation D3#35 | Put app navigation on the left side |
| 341-575:452 | PARTIAL | Browse cards omit long descriptions; show only location, rating, price | landed | details/product-patterns.md#Cards | Leave long descriptions for the detail page |
| 341-575:453#3 | MISSING | Solid circle behind overlay icons on bright photos | landed | details/surfaces.md#Padding and Icon Size | a solid circle behind overlay icons |
| 341-575:455#1 | MISSING | Consolidate overflowing nav into animated menu | landed | details/product-patterns.md#Sidebar and app navigation | move the extra links into one menu |
| 341-575:455#2 | MISSING | Compact search pill that animates open on click | landed | details/product-patterns.md#Search | compact search pill |
| 341-575:456#1 | PARTIAL | Prefer explicit "Load More" over infinite scroll | landed | details/product-patterns.md#Long lists | Use a Load More button |
| 341-575:456#2 | MISSING | Load More lets users reach the footer | landed | details/product-patterns.md#Long lists | keeps the footer reachable |
| 341-575:457#2 | PARTIAL | Avoid scrolljacking | landed | details/motion.md#Scroll transitions | Scroll-linked motion never takes control |
| 341-575:459 | MISSING | Right-size system: lightweight for startups, rigid for enterprise | rejected | details/README.md:3 the project's DESIGN.md sets how strict its system is; no build rule to add |  |
| 341-575:460#1 | PARTIAL | Design system as shared team language | merged | details/README.md#Details | override every default here |
| 341-575:460#2 | PARTIAL | Know when to break a system rule intentionally | rejected | craft-floor.md:3 already lets a pinned brief or committed world override any non-ban line |  |
| 341-575:467#1 | MISSING | Search bar for options not in a fixed list | landed | details/product-patterns.md#Onboarding and contextual tips | a Skip button for users with none |
| 341-575:468 | PARTIAL | Sketch flows on paper to catch missing micro-utilities | landed | details/product-patterns.md#Flows and next steps | list its micro-utilities |
| 341-575:470#1 | PARTIAL | Avoid multi-hue gradients | landed | details/color-values.md#Gradients | Gradients use one hue only |
| 341-575:470#2 | PARTIAL | Gradient must be monochrome or removed | merged | details/color-values.md#Gradients | Gradients use one hue only |
| 341-575:471#1 | PARTIAL | Replace harsh default shadows | landed | details/surfaces.md#Declared Elevation and Shadows | Replace harsh default shadows |
| 341-575:471#2 | PARTIAL | Shadow color light gray, not black | rejected | C7 and D3#27: shadow is tinted or transparent black. An opaque gray is banned. |  |
| 341-575:471#4 | PARTIAL | Or remove shadow entirely | merged | details/surfaces.md#Declared Elevation and Shadows | a border for a flat, static card |
| 341-575:473#1 | PARTIAL | 3-column or 2-column grid on mobile | rejected | adapt.md:40 single column on mobile |  |
| 341-575:473#3 | OUT-OF-SCOPE | Apply Auto Layout to cards and chips | out-of-scope |  |  |
| 341-575:473#4 | OUT-OF-SCOPE | Turn off Vertical Trim | out-of-scope |  |  |
| 341-575:476#1 | CONFLICT | Lock small component radius to 10px | landed | details/surfaces.md#Radius Flavors D3#8 | Small controls: start at 10px |
| 341-575:478 | CONFLICT | Replace text-only actions with icons | rejected | icons never replace text, I7 D3#10 |  |
| 341-575:479#3 | OUT-OF-SCOPE | Named icon packs (Feather, Phosphor, Flaticon) | out-of-scope |  |  |
| 341-575:480#1 | CONFLICT | Universal icons (Home, Bookmark, User) need no text label | rejected | no universal-icon exemption, I7 D3#11 |  |
| 341-575:480#2 | PARTIAL | Ambiguous icons need an onboarding tooltip | landed | details/product-patterns.md#Onboarding and contextual tips | Explain an ambiguous icon with a tooltip |
| 341-575:480#3 | CONFLICT | Different icon styles allowed in separate functional zones | rejected | one icon family, C14 D3#12 |  |
| 341-575:482#1 | PARTIAL | Remove redundant carousel arrows where swipe is natural | landed | details/gestures.md#Carousels D3#43 | A swipe is not keyboard operable |
| 341-575:482#2 | PARTIAL | Remove decorative arrows inside buttons | landed | details/surfaces.md#Padding and Icon Size | No decorative arrow inside a button |
| 341-575:482#3 | PARTIAL | Dim overpowering secondary button fills | landed | details/product-patterns.md#Actions and buttons | Dim secondary button fills |
| 341-575:484#2 | PARTIAL | Loading spinner for longer waits | landed | details/product-patterns.md#Loading states | show a spinner in a button or on one module |
| 341-575:485 | MISSING | Cross-component sync: fill Save icon and animate badge onto nav tab | landed | details/product-patterns.md#Flows and next steps | place a notification dot on the Saved tab |
| 341-575:487#1 | MISSING | Do not omit the vertical Y-axis | landed | details/charts.md#Axes and gridlines | Show a value axis |
| 341-575:487#2 | MISSING | No rounded bar tops | landed | details/charts.md#Bar charts | Use square bar tops |
| 341-575:487#3 | MISSING | Bar count matches the data (no 16 bars for 7 days) | landed | details/charts.md#Bar charts | Every bar encodes one data value |
| 341-575:487#4 | MISSING | Flat-topped bars, labelled axes, exact data mapping | merged | details/charts.md#Bar charts | Use square bar tops |
| 341-575:494 | PARTIAL | Avoid overly complex Dribbble-style references | rejected | not actionable in code: reference-image advice, see visualize.md:14 |  |
| 341-575:495#1 | PARTIAL | Use clean screenshots from real production software | merged | visualize.md#Generate three compositional options | a picture wherever one exists |
| 341-575:495#2 | OUT-OF-SCOPE | Use pre-built component code from 21st.dev | out-of-scope |  |  |
| 341-575:497 | OUT-OF-SCOPE | Prompt: ask for single-file HTML and CSS for import | out-of-scope |  |  |
| 341-575:498 | OUT-OF-SCOPE | Prompt: state product category and user goal | out-of-scope |  |  |
| 341-575:499 | OUT-OF-SCOPE | Prompt: list required structural modules | out-of-scope |  |  |
| 341-575:502 | OUT-OF-SCOPE | html.to.design import workflow | out-of-scope |  |  |
| 341-575:504#1 | MISSING | Sidebar header: avatar, name, account switcher instead of generic label | landed | details/product-patterns.md#Sidebar and app navigation | account switcher arrow as the sidebar header |
| 341-575:504#2 | MISSING | Left-align all nav items | landed | details/product-patterns.md#Sidebar and app navigation | Left-align all nav items |
| 341-575:504#3 | PARTIAL | Delete redundant section headers ("Menu", "Other") | landed | details/product-patterns.md#Sidebar and app navigation | Delete redundant section headers |
| 341-575:504#4 | MISSING | Push Settings and Help to bottom of sidebar | landed | details/product-patterns.md#Sidebar and app navigation | Pin Settings and Help |
| 341-575:505#1 | PARTIAL | Desaturate overly saturated purples toward blue | landed | details/color-values.md#Color hierarchy | Pull a purple toward blue |
| 341-575:505#2 | PARTIAL | Darken bluish backgrounds into deep purple-gray | landed | details/color-values.md#Color hierarchy | Darken a bluish background into a deep purple-gray |
| 341-575:505#4 | CONFLICT | Subtle background grid pattern | rejected | grid overlay needs a real canvas D3#4 |  |
| 341-575:506#1 | PARTIAL | Gantt bars match the semantic legend | landed | details/charts.md#Comparison series | take the color of their legend key |
| 341-575:506#2 | PARTIAL | KPI cards use numeric percentage, not "In Progress" | landed | details/product-patterns.md#Dashboards | Show a KPI as a number |
| 341-575:512#1 | MISSING | Masked text slide on hover (two text copies in a clip mask) | landed | details/motion.md#Text and labels | Put two copies of the label in an |
| 341-575:513 | MISSING | Keyboard shortcut caps animate pressed, then success badge | landed | details/motion.md#Feedback and state D3#42 | Animate a key cap press only on a surface |
| 341-575:514#1 | PARTIAL | Toast chains spinner then success state | landed | details/motion.md#Feedback and state | Show a spinner, then a success state |
| 341-575:514#2 | CONFLICT | Particle burst on success | landed | details/motion.md#Feedback and state D3#26 | Only for rare, earned milestones |
| 341-575:516 | OUT-OF-SCOPE | Avatar name tag: rounded pill, black fill, slight tilt | out-of-scope |  |  |
| 341-575:517#1 | PARTIAL | Name tag spring: 500ms, stiffness 636, damping 24 | landed | details/motion.md#Hover and reveal D3#24 | Start with a spring at bounce 0 |
| 341-575:518#1 | CONFLICT | Rotating angular-gradient shimmer stroke | rejected | ambient border shimmer, craft-floor.md:13 D3#41 |  |
| 341-575:518#2 | OUT-OF-SCOPE | Build 1px border by boolean subtraction and masking | out-of-scope |  |  |
| 341-575:520 | PARTIAL | Pause/play toggle for continuous rotation | merged | details/gestures.md#Carousels | needs a visible pause or stop control |
| 341-575:521#1 | PARTIAL | 1000ms delay before icon tooltip | landed | details/interaction.md#Menus and tooltips | Show a tooltip after about 500 ms of hover |
| 341-575:521#2 | CONFLICT | Bouncy spring easing on tooltip | rejected | tooltips stay at bounce 0, motion.md:87 D3#24 |  |
| 341-575:521#3 | MISSING | Mouse leave resets tooltip immediately | landed | details/interaction.md#Menus and tooltips | Mouse leave hides the tooltip at once |
| 341-575:523 | MISSING | Inline keyword hover pops out preview without taking layout space | landed | details/motion.md#Hover and reveal | Position the preview absolutely so no text below moves |
| 341-575:524 | PARTIAL | Masked progress fill slides across track on step completion | landed | details/motion.md#Feedback and state | Mask a fill rectangle to the track |
| 341-575:525 | PARTIAL | Stacked notification cards: swipe front away, scale back cards up | landed | details/gestures.md#Swipe | On a swipe of the front notification card |
| 341-575:526 | MISSING | Magnifier icon morphs into expanding search input | landed | details/motion.md#Feedback and state | A collapsed search control shows a magnifier icon |
| 341-575:527 | PARTIAL | Old limit number slides out and new one slides in, in place | landed | details/motion.md#Text and labels | slide the old value out and the new value in |
| 341-575:533#1 | CONFLICT | Light card: 1px outline plus soft drop shadow | merged | details/surfaces.md#Shadow as Border (Light Mode) D3#27 | The first acts as a 1px border ring |
| 341-575:533#2 | CONFLICT | Shadow color very light gray, not transparent black | rejected | C7 and D3#27: shadow is tinted or transparent black. An opaque gray is banned. |  |
| 341-575:534 | OUT-OF-SCOPE | Hide via layer opacity, not fill opacity | out-of-scope |  |  |
| 341-575:536 | OUT-OF-SCOPE | Smart Animate matches by exact layer name | out-of-scope |  |  |
| 341-575:537#2 | PARTIAL | Icon background tints off-white on hover | landed | details/surfaces.md#Padding and Icon Size | Icon background tints slightly off-white |
| 341-575:538#1 | PARTIAL | Focused app card: heavy bright yellow stroke | landed | details/surfaces.md#Declared Elevation and Shadows | clearly heavier than the card's 1px border |
| 341-575:538#2 | CONFLICT | Duplicate rectangle behind with 24px blur as glow | rejected | zero-offset halo, craft-floor.md:10 D3#40 |  |
| 341-575:539#2 | OUT-OF-SCOPE | Scale tool (K) shortcut | out-of-scope |  |  |
| 341-575:541 | PARTIAL | Five-frame loading spinner with 180-degree rotation steps | landed | details/motion.md#Loading and waiting | Start with five frames |
| 341-575:543#1 | OUT-OF-SCOPE | Chain frames with After Delay 300ms | out-of-scope |  |  |
| 341-575:543#2 | PARTIAL | Spring stiffness 550, damping 40, mass 1 | landed | details/motion.md#Feedback and state | Step entrances 300 ms apart with a spring |
| 341-575:545 | OUT-OF-SCOPE | Success icon shares exact layer name with spinner | out-of-scope |  |  |
| 341-575:546#2 | PARTIAL | Mask checkmark inside a rounded square and slide it in | landed | details/motion.md#Text and labels | Mask the check inside its rounded square |
| 341-575:546#3 | PARTIAL | Checkmark slides in after 300ms delay with ease-out | landed | details/motion.md#Text and labels | Slide it in with ease-out |
| 341-575:552 | PARTIAL | Tighten tracking on text above 70-80px by -2% to -4% | landed | details/typography.md#Tracking | Above 70 to 80px, tighten tracking |
| 341-575:554#2 | PARTIAL | If gap exceeds outer radius, pick a smaller radius by eye | landed | details/surfaces.md#Radius Flavors | pick a smaller inner radius by eye |
| 341-575:554#3 | MISSING | Pill shapes need no concentric adjustment | landed | details/surfaces.md#Radius Flavors | needs no adjustment |
| 341-575:555 | MISSING | iOS corner smoothing at 100% | landed | details/surfaces.md#Radius Flavors | Smooth iOS-style corners |
| 341-575:556 | OUT-OF-SCOPE | Pick colors in HSB, not HEX | out-of-scope |  |  |
| 341-575:557 | CONFLICT | Companion layers: saturation +20, brightness -10 per layer | rejected | HSB steps, OKLCH instead, C20 D3#34 |  |
| 341-575:558 | CONFLICT | Shift hue 20 points toward darker spectrum (blue and purple darker) | rejected | HSB hue shift, OKLCH instead, C20 D3#34 |  |
| 341-575:560 | MISSING | Strip explicit labels ("Name:", "Price:") from cards | landed | details/product-patterns.md#Cards | Drop explicit field labels |
| 341-575:562#1 | PARTIAL | Stack name+location top-left, cost+rating top-right, icons in middle | landed | details/product-patterns.md#Cards | stack name and location at the top left |
| 341-575:562#2 | MISSING | Keep labels only on dates | landed | details/product-patterns.md#Cards | Keep a label only on dates |
| 341-575:564#1 | CONFLICT | Delete horizontal divider lines between list items | landed | details/product-patterns.md#Row states and separators D3#36 | Separate rows with whitespace while the list has room |
| 341-575:564#3 | MISSING | Subtle alternating row fill when rows are packed | landed | details/product-patterns.md#Row states and separators | subtle alternating row fill |
| 341-575:567#1 | OUT-OF-SCOPE | Figma Nudge Amount set to 8px | out-of-scope |  |  |
| 341-575:567#2 | MISSING | Large distances: scale exponentially or round to 5 or 10 | rejected | not actionable in code: Figma nudge setting; the 4-unit scale is layout.md:51 |  |
| 341-575:569 | CONFLICT | Replace pure white and pure black backgrounds with extreme brand tints | merged | colorize.md#Apply at system scale D3#33 | Tint neutrals only when the brand hue |
| 341-575:571 | MISSING | Light mode: Tailwind 50 background, 500 accent | landed | details/color-values.md#Surface steps | canvas from the 50 step |
| 341-575:572 | MISSING | Dark mode: Tailwind 950 background, 300 accent | landed | details/color-values.md#Surface steps | canvas from the 950 step |
| 341-575:574#2 | PARTIAL | Dark elevation: raise brightness +4 to +6, lower saturation -10 to -20 per layer | rejected | C20 and D3#34: build ramps in OKLCH, not HSB steps |  |
| 341-575:574#3 | PARTIAL | Repeat step-up for nested dashboard layers | landed | details/color-values.md#Surface steps | steps one level lighter |
| 576-818:581 | PARTIAL | Strip social links, written testimonials, and side-of-page outline from hero/header; short pages get no page outline | landed | details/landing.md#Navbar | Keep the hero and header free of social links |
| 576-818:582 | PARTIAL | Replace jagged stepped geometric cutouts with clean large rectangular imagery | merged | craft-floor.md#Refuse | Geometric masks standing in for organic contours |
| 576-818:584 | OUT-OF-SCOPE | Source matching product bottle mockups instead of drawing 3D packaging | out-of-scope |  |  |
| 576-818:585 | OUT-OF-SCOPE | Keep luxury packaging minimal; avoid crowding labels with text | out-of-scope |  |  |
| 576-818:586 | MISSING | Don't stack centered lower text under centered upper text (awkward side margins); anchor asymmetric type with a horizontal divider | landed | details/landing.md#Edge alignment and reading flow | Anchor asymmetric type with a horizontal divider |
| 576-818:588 | PARTIAL | Design desktop heroes at real screen size, not inflated Dribbble canvases | landed | details/landing.md#Hero zones and spacing | Design desktop heroes at real screen size |
| 576-818:589 | MISSING | Desktop full-screen designs at 1920px x ~1000px to allow for browser chrome | landed | details/landing.md#Hero zones and spacing | Full-screen desktop heroes start at 1920px |
| 576-818:591 | MISSING | Ultrawide hero split in two: left full-height image with overlaid copy, right interactive product showcase | landed | details/landing.md#Hero layouts | an interactive product showcase on the right |
| 576-818:593 | MISSING | Place brand wordmark front and center/left in navbar | landed | details/landing.md#Navbar | Place the brand wordmark front and center |
| 576-818:594a | PARTIAL | Collapse secondary utilities (Favorites, Notifications) into one Menu button | landed | details/product-patterns.md#Header actions | into one menu button |
| 576-818:594b | CONFLICT | Convert Cart text link into an icon | landed | details/product-patterns.md#Header actions D3#10 | icon plus count plus accessible name |
| 576-818:594c | PARTIAL | Replace Profile icon with an explicit Sign In action | landed | details/product-patterns.md#Header actions | labeled Sign In action |
| 576-818:594d | MISSING | Add a search bar to balance the top bar | landed | details/product-patterns.md#Header actions | balance the right-side actions |
| 576-818:596a | PARTIAL | Multi-product half-column becomes a horizontal slider | landed | details/product-patterns.md#Cards | into a horizontal slider |
| 576-818:596b | MISSING | Top "New Arrivals" chip on the slider | landed | details/product-patterns.md#Cards | label chip above a slider |
| 576-818:597a | MISSING | Anchor card action buttons into the card corners | landed | details/product-patterns.md#Cards | Pin card action buttons to a corner |
| 576-818:597b | PARTIAL | Standalone circular arrow button with no text, linking to catalog | landed | details/product-patterns.md#Cards | It needs an accessible name and a tooltip |
| 576-818:599 | PARTIAL | Subtle darkening overlay over bright hero photo so white text passes contrast | landed | details/color-values.md#Text over images | against the brightest pixel behind the text |
| 576-818:600b | MISSING | Pair hero headline with concise subtext | landed | details/landing.md#Hero zones and spacing | Put a primary and a secondary CTA below it |
| 576-818:607a | MISSING | Static single row of recognizable client logos | merged | details/landing.md#Social proof | as one static row of the most recognizable clients |
| 576-818:607b | PARTIAL | Or animate logos in a continuous left-to-right marquee | landed | details/motion.md#Marquee and loops | Use a marquee only in place of a static logo row |
| 576-818:608a | MISSING | Marquee edges: linear gradient mask | landed | details/motion.md#Marquee and loops | Mask the edges with a linear gradient |
| 576-818:608b | MISSING | Marquee edges: progressive blur | landed | details/motion.md#Marquee and loops | Add progressive blur on an edge only when the mask leaves a hard cut |
| 576-818:609 | OUT-OF-SCOPE | Competitor-replacement messaging next to social proof | out-of-scope |  |  |
| 576-818:611a | MISSING | Headline and CTA above a full-width dashboard preview | landed | details/landing.md#Hero layouts | Headline and CTA above a full-width dashboard preview |
| 576-818:612a | PARTIAL | Distinctive display font for a SaaS hero | landed | details/typography.md#Display and Script Faces | A distinctive display face earns |
| 576-818:612b | MISSING | Inline diagram above the hero dashboard | landed | details/landing.md#Product UI in the hero | Put an inline diagram above the hero dashboard |
| 576-818:612c | MISSING | Make the hero dashboard interactive | landed | details/landing.md#Product UI in the hero | Make the hero dashboard interactive |
| 576-818:612d | PARTIAL | Subtle background gradient behind the dashboard frame | rejected | craft-floor.md:47: a background is a surface, textured only from the subject's world. The source names no such world. |  |
| 576-818:614 | MISSING | Group several workflows in one section with clickable horizontal or vertical tabs | landed | details/landing.md#Tabs and visuals | Group several product workflows in one section |
| 576-818:615 | PARTIAL | Design the UI for every tab before handoff | merged | craft-floor.md#Verify | every brief requirement present and findable |
| 576-818:617a | PARTIAL | Lightweight, purposeful hover interactions instead of heavy GPU 3D renders | merged | details/motion.md#The gate | The cheapest one that works |
| 576-818:617b | OUT-OF-SCOPE | Build hover animations with Figma Smart Animate | out-of-scope |  |  |
| 576-818:618 | MISSING | Build animations crisp and native; avoid blurry third-party Lottie/video exports | landed | details/motion.md#Authored moments | Build the moment in CSS, SVG, or code |
| 576-818:620a | PARTIAL | Simple bento: 2 to 4 asymmetric cards per row | landed | details/landing.md#Bento grid | Use 2 to 4 asymmetric cards per row |
| 576-818:620b | MISSING | Optional slight tilt on an interior card element | rejected | craft-floor.md:13: one authored moment, not scattered effects |  |
| 576-818:622 | CONFLICT | Visible full-bleed 1px vertical and horizontal grid lines framing sections, bento cells, and hero | landed | details/surfaces.md#Structural Frame Lines D3#5 | sit on real column or section edges |
| 576-818:624 | MISSING | Visual mega-menus with thumbnails in nav dropdowns | merged | details/landing.md#Navbar | Put visuals in the panels |
| 576-818:630 | OUT-OF-SCOPE | Resource: UIverse coded UI library with Copy to Figma | out-of-scope |  |  |
| 576-818:631 | OUT-OF-SCOPE | Resource: Logo System gallery | out-of-scope |  |  |
| 576-818:632 | OUT-OF-SCOPE | Resource: Phase browser animation tool | out-of-scope |  |  |
| 576-818:633 | OUT-OF-SCOPE | Resource: Fontjoy font pairing engine | out-of-scope |  |  |
| 576-818:634 | OUT-OF-SCOPE | Resource: Trending X design curation feeds | out-of-scope |  |  |
| 576-818:635 | OUT-OF-SCOPE | Resource: Logoipsum placeholder logos | out-of-scope |  |  |
| 576-818:636 | OUT-OF-SCOPE | Resource: Shopify Burst stock photos | out-of-scope |  |  |
| 576-818:637 | OUT-OF-SCOPE | Resource: DeVoro wave and curve generators | out-of-scope |  |  |
| 576-818:638 | OUT-OF-SCOPE | Resource: Endless Tools 3D asset generator | out-of-scope |  |  |
| 576-818:639 | OUT-OF-SCOPE | Resource: Design Spells micro-interaction library | out-of-scope |  |  |
| 576-818:640 | OUT-OF-SCOPE | Resource: Designer Spotify playlists (LottieFiles) | out-of-scope |  |  |
| 576-818:641 | OUT-OF-SCOPE | Resource: Typefaces Today directory | out-of-scope |  |  |
| 576-818:642 | OUT-OF-SCOPE | Resource: Isocons isometric icon library | out-of-scope |  |  |
| 576-818:643 | OUT-OF-SCOPE | Resource: Shape of AI pattern library | out-of-scope |  |  |
| 576-818:644 | OUT-OF-SCOPE | Resource: Relume Figma wireframe kit | out-of-scope |  |  |
| 576-818:645 | OUT-OF-SCOPE | Resource: Photogradient mesh gradient generator | out-of-scope |  |  |
| 576-818:646 | OUT-OF-SCOPE | Resource: Unsection landing-page section library | out-of-scope |  |  |
| 576-818:647 | OUT-OF-SCOPE | Resource: Design Sphere and podcast | out-of-scope |  |  |
| 576-818:648 | OUT-OF-SCOPE | Resource: Handy Arrows vector library | out-of-scope |  |  |
| 576-818:649 | OUT-OF-SCOPE | Resource: Wall of Portfolios | out-of-scope |  |  |
| 576-818:656a | MISSING | Vertical scroll instead of tap-through story slides | landed | details/mobile.md#Feeds and story formats | Use vertical scroll instead of tap-through |
| 576-818:656b | MISSING | Segmented progress bar on the right edge | landed | details/mobile.md#Feeds and story formats | Show a segmented progress bar |
| 576-818:657b | MISSING | Leave only the close X at the top | landed | details/mobile.md#Thumb reach | Leave only the close X at the top |
| 576-818:658a | MISSING | Delete explicit pause buttons on mobile story formats | landed | details/mobile.md#Feeds and story formats | Keep a visible pause control on a story format |
| 576-818:658b | MISSING | Tap anywhere to pause | landed | details/mobile.md#Feeds and story formats | Tap anywhere on the media to pause and resume |
| 576-818:658c | MISSING | Auto-pause playback when Share is tapped | landed | details/mobile.md#Feeds and story formats | Pause playback when the user taps a share control |
| 576-818:660 | MISSING | Chapter dropdown chip at the bottom to jump between sections | landed | details/mobile.md#Feeds and story formats | Put a section jump at the bottom |
| 576-818:661a | MISSING | "View Summary" button at the end of each chapter | landed | details/mobile.md#Feeds and story formats | Offer a summary at the end of each section |
| 576-818:661b | MISSING | Single-screen stat dashboard for scanning and screenshotting | landed | details/mobile.md#Feeds and story formats | A summary fits on one screen |
| 576-818:663 | OUT-OF-SCOPE | Surface behavioral extremes (most-skipped song, late-night listens) | out-of-scope |  |  |
| 576-818:665a | PARTIAL | Never show a raw number alone; append year-over-year context | landed | details/charts.md#KPI cards and dashboards | Do not show a raw number alone |
| 576-818:665b | OUT-OF-SCOPE | Contextual copy for a newly discovered artist | out-of-scope |  |  |
| 576-818:666a | OUT-OF-SCOPE | Rising Star slide | out-of-scope |  |  |
| 576-818:666b | OUT-OF-SCOPE | Single-track obsession slide with share percentage | out-of-scope |  |  |
| 576-818:668a | OUT-OF-SCOPE | Mood-to-color mesh gradient "aura" | out-of-scope |  |  |
| 576-818:668b | MISSING | Side-by-side comparison with previous years | landed | details/charts.md#Comparison series | Compare earlier years on the same axes |
| 576-818:669 | MISSING | Pair genres with a recognizable visual metaphor (fruit pie) | rejected | research-charts-ai.md D5 (chart marks encode data only, no decoration) |  |
| 576-818:672a | OUT-OF-SCOPE | Highlight the most consistent artist | out-of-scope |  |  |
| 576-818:672b | MISSING | Interactive 12-month horizontal swipe timeline, every month inspectable | landed | details/charts.md#Time ranges | inspect every period in a range |
| 576-818:675a | PARTIAL | Single Share button | landed | details/product-patterns.md#Actions and buttons | one Share button that opens a popover |
| 576-818:675b | MISSING | Share popover with three scope options (slide, chapter, whole) | landed | details/product-patterns.md#Actions and buttons | one Share button that opens a popover |
| 576-818:675c | OUT-OF-SCOPE | Stamp sender's name at the top of shared content | out-of-scope |  |  |
| 576-818:682a | PARTIAL | Two messages in one typographic slot that swap on hover or mask reveal | merged | details/motion.md#Text and labels | On Persuade, the same mask swaps two messages |
| 576-818:682b | MISSING | Scroll-driven inline character animation that swaps text | merged | details/motion.md#Text and labels | A small character can cross the copy on scroll |
| 576-818:684a | CONFLICT | Pair sharp geometric headline with hand-drawn pencil scribbles, underlines, sketched arrows | rejected | sketch SVG ban, craft-floor.md:46 D3#22 |  |
| 576-818:684b | CONFLICT | Hover-triggered scribble animations | rejected | sketch SVG ban, craft-floor.md:46 D3#22 |  |
| 576-818:686 | PARTIAL | Stretch or animate display type per letter on scroll or load | landed | details/motion.md#Text and labels | Stretch or animate letters on load or scroll |
| 576-818:687a | OUT-OF-SCOPE | DevTools trick to identify fonts on a live site | out-of-scope |  |  |
| 576-818:687b | MISSING | Verify font licensing before commercial use | landed | details/typography.md#Font Licensing | Check the font license before |
| 576-818:689 | PARTIAL | Visible 1px border lines framing sections and multi-column blocks | landed | details/surfaces.md#Structural Frame Lines | frame sections and multi-column blocks |
| 576-818:690 | MISSING | Rounded corners on the divider lines themselves | landed | details/surfaces.md#Structural Frame Lines | Square junctions by default |
| 576-818:692a | PARTIAL | Morph and scale media container shape on page load | landed | details/motion.md#Scroll transitions | Morph a media container's shape on load |
| 576-818:692b | PARTIAL | Morph media into oversized typography on scroll | merged | details/motion.md#Scroll transitions | or into oversized type on scroll |
| 576-818:693 | PARTIAL | Keep container scale and shape transforms moderate; large resizes drop frames | landed | details/motion.md#Scroll transitions | Keep the scale moderate, because large resizes drop frames |
| 576-818:695a | MISSING | Scroll-stepped technical pipeline diagram | landed | details/landing.md#Product reveal | Do not pin the page to step through it |
| 576-818:695b | MISSING | Circular node diagram that rotates and blurs non-active nodes on hover | landed | details/motion.md#Hover and reveal D3#21 | On hover, dim the non-active nodes |
| 576-818:697a | MISSING | No text-only dropdown when product names are abstract | landed | details/landing.md#Navbar | show a clear photo of each product in the nav menu |
| 576-818:697b | MISSING | Show clear product photos inside the nav menu | merged | details/landing.md#Navbar | show a clear photo of each product in the nav menu |
| 576-818:703b | MISSING | Scrolling horizontal text marquee under a 3D centerpiece | landed | details/motion.md#Authored moments D3#45 | Pair a 3D centerpiece with a quiet surround |
| 576-818:705a | OUT-OF-SCOPE | Spline: fast browser prototyping and web embeds | out-of-scope |  |  |
| 576-818:705b | OUT-OF-SCOPE | Spline video exports need a paid plan | out-of-scope |  |  |
| 576-818:706a | OUT-OF-SCOPE | Blender for custom metallic shaders | out-of-scope |  |  |
| 576-818:706b | OUT-OF-SCOPE | Blender free high-resolution video renders | out-of-scope |  |  |
| 576-818:708 | OUT-OF-SCOPE | Design flat logo in Figma and export SVG | out-of-scope |  |  |
| 576-818:709 | OUT-OF-SCOPE | Extrude 2D SVG paths into 3D | out-of-scope |  |  |
| 576-818:710 | OUT-OF-SCOPE | Configure camera, lights, metallic materials, rotation, export | out-of-scope |  |  |
| 576-818:711 | OUT-OF-SCOPE | Check 360° loop for dark shadow dead spots | out-of-scope |  |  |
| 576-818:712 | OUT-OF-SCOPE | Assemble in Figma and publish on Wix Studio | out-of-scope |  |  |
| 576-818:720 | PARTIAL | Replace multi-card collages with a full-screen feed where the only primary action is swipe | landed | details/mobile.md#Feeds and story formats | Replace multi-card browsing collages |
| 576-818:722 | MISSING | Keep onboarding friction minimal: broad interests, short tutorial, then the feed | landed | details/product-patterns.md#Onboarding and contextual tips | one short tutorial, then the main screen |
| 576-818:723a | OUT-OF-SCOPE | Stat: 30–50% of a new user's first 1,000 videos come from onboarding inputs | out-of-scope |  |  |
| 576-818:723b | OUT-OF-SCOPE | Infer interests from content analysis (NLP and computer vision) | out-of-scope |  |  |
| 576-818:725a | OUT-OF-SCOPE | Stat: 37-second average video duration | out-of-scope |  |  |
| 576-818:725b | OUT-OF-SCOPE | Stat: 80+ videos per day, 53-minute session | out-of-scope |  |  |
| 576-818:727 | OUT-OF-SCOPE | Pair consumption app with a free creation tool (CapCut) | out-of-scope |  |  |
| 576-818:731a | MISSING | Primary swipe target spans almost 100% of the screen | landed | details/gestures.md#Swipe | The primary swipe target spans nearly the full screen width |
| 576-818:731b | PARTIAL | Auto-snap the feed | landed | details/mobile.md#Feeds and story formats | snaps to one item per swipe |
| 576-818:731c | MISSING | Auto-play videos | landed | details/mobile.md#Feeds and story formats | Autoplay video only with a visible pause control |
| 576-818:732b | PARTIAL | Stack engagement icons on the lower-right edge (70–80% right-handed reach) | landed | details/mobile.md#Thumb reach | Stack engagement icons on the lower-right edge |
| 576-818:732c | OUT-OF-SCOPE | Stat: 70–80% of users are right-handed | out-of-scope |  |  |
| 576-818:739a | PARTIAL | Don't spend top-of-screen space on a massive header | landed | details/product-patterns.md#Header actions | Do not spend header height |
| 576-818:739c | MISSING | Sidebar anatomy: logo, menu toggle, team avatars and Manage Team, Add Widget, Settings pinned at bottom | landed | details/product-patterns.md#Sidebar and app navigation | Pin Settings and Help to the bottom of the sidebar |
| 576-818:739d | CONFLICT | Designed collapsed icon-only sidebar state | rejected | icon-only nav, I7 D3#13 |  |
| 576-818:740c | PARTIAL | Strip useless voice-dictation mic icons | landed | details/product-patterns.md#Header actions | header icons that do nothing |
| 576-818:740d | PARTIAL | Turn a hidden "View Tasks" header button into an always-visible widget | landed | details/product-patterns.md#Dashboards | always-visible widget, not behind a header button |
| 576-818:742a | MISSING | Credit card widget omits send, receive, and direct-deposit actions | landed | details/product-patterns.md#Dashboards | Show only the actions an item supports |
| 576-818:742b | MISSING | Merge the Lock Card control into the card widget | landed | details/product-patterns.md#Dashboards | lock control inside the card widget |
| 576-818:742c | PARTIAL | Brand-colored card with an oversized low-opacity watermark logo | landed | details/color-values.md#Text over images | one oversized, low-opacity logo |
| 576-818:742d | OUT-OF-SCOPE | Replace "Monthly Fee" with minimum payment and due date | out-of-scope |  |  |
| 576-818:742e | MISSING | Carousel switcher for multiple cards | landed | details/product-patterns.md#Dashboards | carousel switcher when several cards |
| 576-818:743a | MISSING | Delete unlabelled and redundant secondary charts | landed | details/charts.md#KPI cards and dashboards | Delete a chart that has no labels |
| 576-818:743b | MISSING | Merge growth-rate percentages into the card as percentage chips | landed | details/charts.md#KPI cards and dashboards | Show each percentage change as a chip |
| 576-818:744a | MISSING | Never curve investment data lines | rejected | research-charts-ai.md D1: smooth only continuous quantities, so a blanket ban on curving investment lines is overridden |  |
| 576-818:744b | MISSING | Never fade the most recent data points | merged | details/charts.md#Actual and projected data | Do not fade actual data |
| 576-818:744c | MISSING | Add grid lines to the investments chart | merged | details/charts.md#Axes and gridlines | Draw gridlines faint gray |
| 576-818:744d | MISSING | Compact dropdown instead of bulky time-scale sliders | merged | details/charts.md#Time ranges | Use a compact dropdown when |
| 576-818:744e | MISSING | Compare button to benchmark multiple portfolios | landed | details/charts.md#Comparison series | Add a compare control that overlays |
| 576-818:744f | MISSING | Full-screen expand icon on chart | landed | details/charts.md#Chart controls | full-screen expand icon |
| 576-818:745a | PARTIAL | Replace "Minimize" icon with labeled "All Activities" button | landed | details/product-patterns.md#Dashboards | with its destination, such as All Activities |
| 576-818:745b | PARTIAL | Delete tiny unclickable pagination dots | landed | details/surfaces.md#Minimum Hit Area | Delete tiny decorative pagination dots |
| 576-818:745c | PARTIAL | Fraud alert card: warning icon, amount, date, location | landed | details/product-patterns.md#Dashboards | its type icon, the amount, the date |
| 576-818:745d | CONFLICT | Loan card with a 90°-rotated progress diagram | landed | details/charts.md#Micro-charts and progress diagrams D3#23 | A micro-chart or progress diagram shows real data |
| 576-818:745e | OUT-OF-SCOPE | Loan card shows loan amount and repayment date | out-of-scope |  |  |
| 576-818:746a | MISSING | Wide thin container holding two reminder cards, respecting outer grid margins | landed | details/product-patterns.md#Dashboards | Keep it inside the outer grid margins |
| 576-818:746c | PARTIAL | High-contrast red "All Tasks" button | rejected | D3#18 and C4: red means error or danger, not a primary action |  |
| 576-818:746d | OUT-OF-SCOPE | "Add Reminder" button | out-of-scope |  |  |
| 576-818:747a | MISSING | Two-sided diverging bar chart (income up, expenses down) | landed | details/charts.md#Diverging bars | Center one horizontal bar |
| 576-818:747b | MISSING | Dollar totals paired with the bars | landed | details/charts.md#Diverging bars | Print each bar's dollar total beside it |
| 576-818:747c | MISSING | Full-screen expand icon on revenue chart | merged | details/charts.md#Chart controls | full-screen expand icon |
| 576-818:748a | MISSING | Pie chart breakdown to fill grid gaps | landed | details/charts.md#Pie charts | Do not add a pie to fill |
| 576-818:750b | PARTIAL | High priority top-left, Mid in the middle, Low on the bottom row | landed | details/product-patterns.md#Dashboards | Put High widgets at the top left |
| 576-818:757a | MISSING | Drop protruding center button so all tab-bar targets share one baseline | landed | details/mobile.md#Bottom navigation | Keep every tab target on one baseline |
| 576-818:758c | MISSING | Replace generic user icon with the real profile picture | landed | details/mobile.md#Bottom navigation | Show the user's profile picture |
| 576-818:758e | PARTIAL | Add text labels only where icons are obscure | rejected | Icon-only controls need an accessible name and a tooltip; visible labels are required per D3#11 and I7. |  |
| 576-818:758f | PARTIAL | Optional blurred translucent dark-mode tab bar background | landed | details/surfaces.md#Glass Panels | translucent, blurred dark background |
| 576-818:760a | MISSING | Never curve line-chart data | rejected | research-charts-ai.md D1: smooth only continuous quantities, so a blanket ban on curving line data is overridden |  |
| 576-818:760b | MISSING | Never fade out the right end of the line | landed | details/charts.md#Actual and projected data | Do not fade actual data |
| 576-818:761a | MISSING | Always include horizontal and vertical grid lines | rejected | research-charts-ai.md D3: gridlines are faint, few, and dropped when every point is labelled, so always drawing both axes is rejected |  |
| 576-818:761b | MISSING | Value markers on line charts | merged | dataviz | Marker / end-dot |
| 576-818:761c | MISSING | Time-frame buttons, or a dropdown when space is tight | landed | details/charts.md#Time ranges | Use buttons when the ranges fit |
| 576-818:761d | PARTIAL | Muted gray comparison line for previous period, with legend | landed | details/charts.md#Comparison series | Draw the previous period in muted gray |
| 576-818:763a | MISSING | Remove explicit CTA from repeated cards | landed | details/product-patterns.md#Cards | carry no CTA button |
| 576-818:763b | PARTIAL | Whole card clickable, with a hover arrow | landed | details/product-patterns.md#Cards | Do not wrap the card in a link or button |
| 576-818:763c | PARTIAL | Explicit button only for distinct actions (e.g., "Try it out") | landed | details/product-patterns.md#Cards | Add a button only for a separate action |
| 576-818:764a | MISSING | Image fills 3/4 of card height | landed | details/product-patterns.md#Cards | 3/4 of the card height |
| 576-818:764b | PARTIAL | Linear gradient overlay from the bottom of the image upward | merged | details/color-values.md#Text over images | Use a bottom gradient scrim |
| 576-818:764c | PARTIAL | Layer card text over the image | merged | details/color-values.md#Text over images | Layer the text on top of it |
| 576-818:766a | MISSING | Move pricing CTA above the feature list | landed | details/product-patterns.md#Pricing cards | Put the CTA above the feature list |
| 576-818:766b | PARTIAL | Switch solid CTA to ghost stroke button when fill breaks hierarchy | landed | details/product-patterns.md#Pricing cards | stroke-only button when a solid fill |
| 576-818:767a | MISSING | Plan name and short description on pricing card | landed | details/product-patterns.md#Pricing cards | a plan name and a short description |
| 576-818:767b | PARTIAL | Billing terms and renewal rate below the price | landed | details/product-patterns.md#Pricing cards | Show billing terms under the price |
| 576-818:768a | CONFLICT | Checkmark glyphs (✓) instead of bullets | merged | craft-floor.md#Refuse D3#31 | Unicode glyphs or emoji standing in for an icon system |
| 576-818:768b | MISSING | List excluded features explicitly | landed | details/product-patterns.md#Pricing cards | List excluded features too |
| 576-818:769 | PARTIAL | Tinted brand header instead of a divider between price and features | landed | details/color-values.md#Surface steps | a tinted fill, not a divider |
| 576-818:771 | OUT-OF-SCOPE | Figma star recipe: 12 points, rounded corners | out-of-scope |  |  |
| 576-818:772a | PARTIAL | Quirky display font for sticker badges (Gorditas, Barriecito) | landed | details/typography.md#Display and Script Faces | A quirky display face can set |
| 576-818:772b | OUT-OF-SCOPE | Inner outline or circular path text (To Path plugin) | out-of-scope |  |  |
| 576-818:772c | CONFLICT | Offset drop shadow at 100% opacity in a darker shade | rejected | offset sticker shadow outside neobrutalism, craft-floor.md:36 D3#32 |  |
| 576-818:772d | OUT-OF-SCOPE | Kaleidoscope effect on dark UIs | out-of-scope |  |  |
| 576-818:774b | PARTIAL | Permanent label above every input | landed | details/product-patterns.md#Forms and inputs | Place each label above its field |
| 576-818:774c | PARTIAL | Realistic example text in placeholder | landed | details/product-patterns.md#Forms and inputs | realistic example value |
| 576-818:775a | PARTIAL | Clear "Create account" subheading | merged | clarify.md#Actions and navigation | Use a specific verb and object |
| 576-818:775b | MISSING | "Log in" redirect link for existing users | landed | details/product-patterns.md#Forms and inputs | Log in link on the first sign-up screen |
| 576-818:776b | MISSING | Subtle off-white input background | landed | details/product-patterns.md#Forms and inputs | subtle off-white background |
| 576-818:776c | CONFLICT | Input border stroke at 40% opacity | landed | details/color-values.md#Text levels D3#30 | Input borders use a solid token |
| 576-818:778a | PARTIAL | Don't copy a 5-column footer for only 3–5 links | landed | details/product-patterns.md#Footers | Do not copy a five-column footer |
| 576-818:779a | MISSING | Centered single-row footer: logo, 3–5 links, social icons | landed | details/product-patterns.md#Footers | Use a centered single row |
| 576-818:779b | MISSING | Copyright bottom-left, design credits bottom-right | landed | details/product-patterns.md#Footers | design credits bottom-right |
| 576-818:781a | PARTIAL | Chips never use the primary CTA fill color | landed | details/color-values.md#Chips and badges | Chips never use the primary CTA fill color |
| 576-818:781b | MISSING | Chips vertically thinner than buttons | landed | details/surfaces.md#Padding and Icon Size | vertically thinner than buttons |
| 576-818:782a | OUT-OF-SCOPE | Build with Auto Layout (Shift + A) | out-of-scope |  |  |
| 576-818:782b | MISSING | Chip vertical padding is 1/2 or 1/4 of horizontal (20px gives 10px or 5px) | landed | details/surfaces.md#Padding and Icon Size | 1/2 or 1/4 of horizontal |
| 576-818:784a | PARTIAL | Carousel dots in a dark blurred pill, or below the image | landed | details/color-values.md#Text over images | sit in a dark pill |
| 576-818:784b | MISSING | Group Prev/Next arrows beside the dots | landed | details/product-patterns.md#Cards | beside the pagination dots |
| 576-818:784c | MISSING | Active dot stretches into an animated progress-timer pill | landed | details/motion.md#Feedback and state | the active dot stretches into a pill that fills as the timer runs |
| 576-818:791 | MISSING | Serif: terminal ticks, authoritative, aids small-print legibility | landed | details/typography.md#Font Count and Roles | A serif suits long-form |
| 576-818:793a | PARTIAL | Display and handwritten faces only for oversized headlines | landed | details/typography.md#Display and Script Faces | Use display and handwritten faces |
| 576-818:793b | MISSING | Never display or handwritten faces for small body text | landed | details/typography.md#Display and Script Faces | Never set body text in them |
| 576-818:793c | MISSING | Never Comic Sans | landed | details/typography.md#Display and Script Faces | Never set text in Comic Sans |
| 576-818:794a | OUT-OF-SCOPE | Baseline, x-height, cap-height definitions | out-of-scope |  |  |
| 576-818:794b | PARTIAL | Tighten tracking on large text | merged | details/typography.md#Tracking | Above 70 to 80px, tighten tracking |
| 576-818:794c | MISSING | Loosen tracking on small text | landed | details/typography.md#Tracking | Loosen tracking on small text |
| 576-818:797 | PARTIAL | Two fonts as the ideal maximum (display + sans, or sans + serif) | landed | details/typography.md#Font Count and Roles | Add a second only when |
| 576-818:798a | PARTIAL | Three fonts only if each has a rigid job (display, UI sans, mono caption) | landed | details/typography.md#Font Count and Roles | A third family only when |
| 576-818:798b | PARTIAL | Never use four fonts | landed | details/typography.md#Font Count and Roles | Never use four families |
| 576-818:800 | MISSING | At small sizes, weight and opacity reduction look nearly identical | landed | details/typography.md#Weight and Tone | At small sizes, a lighter weight |
| 576-818:801a | MISSING | Avoid ultra-bold and ultra-thin weights on body copy | landed | details/typography.md#Weight and Tone | Avoid ultra-bold and ultra-thin |
| 576-818:801b | PARTIAL | Primary text at 100% opacity | landed | details/color-values.md#Text levels | Primary text is solid at 100% opacity |
| 576-818:801c | CONFLICT | Secondary muted text at 40–70% opacity | landed | details/color-values.md#Text levels D3#30 | Secondary text uses a solid token |
| 576-818:802a | PARTIAL | Don't make small body paragraphs light gray | merged | craft-floor.md#Verify | body and placeholder text |
| 576-818:803 | PARTIAL | Main heading: large, regular weight, 100% opacity; size alone sets dominance | landed | details/typography.md#Section Hierarchy | size alone can set their dominance |
| 576-818:804 | PARTIAL | Subheadings: medium size, bold weight | landed | details/typography.md#Section Hierarchy | Subheadings use a medium size |
| 576-818:805 | PARTIAL | Body: base size, regular weight, 100% opacity | landed | details/typography.md#Section Hierarchy | Body copy uses the base size |
| 576-818:807 | MISSING | Golden ratio 1.62 across four heading levels balloons H1 to 110px | landed | details/typography.md#Type Scale | golden ratio (1.62) is too large |
| 576-818:808 | MISSING | Landing scale: sqrt(1.62) = 1.27, applied sequentially from 16px | landed | details/typography.md#Type Scale | step up by 1.27 from a 16px base |
| 576-818:811 | CONFLICT | Fluid font size by linear interpolation between 320px and 1920px | landed | details/typography.md#Fluid Type D3#17 | Fluid sizing applies to Persuade |
| 576-818:813 | PARTIAL | Clamp fluid sizes with min() and max() bounds | landed | details/typography.md#Fluid Type | Bound each clamp() with a rem minimum |
| 576-818:815a | MISSING | Increase line-height as font size gets smaller | landed | details/typography.md#Line Height | Increase line height as size gets smaller |
| 576-818:815c | MISSING | Decrease line-height as font size gets larger | landed | details/typography.md#Line Height | Decrease it as size grows |
| 576-818:816 | CONFLICT | Body line-height ~1.5 (150%) | landed | details/typography.md#Line Height D3#16 | Body copy starts at a line height |
| 576-818:817 | MISSING | Heading line-height 1.1–1.3 | landed | details/typography.md#Line Height | Headings start at 1.1 to 1.3 |
