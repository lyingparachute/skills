# Ledger

| id | status | rule | outcome | destination | anchor |
|---|---|---|---|---|---|
| 001-139:5 | OUT-OF-SCOPE | Premise: four intent-resolution paradigms (waiting, inferring, acting first, user commitment) trade time, certainty, trust | out-of-scope |  |  |
| 001-139:7 | MISSING | Competing click actions: add artificial delay to detect a second click (700 ms vs 300 ms taps) | pending | details/interaction.md |  |
| 001-139:8 | MISSING | Non-competing actions (single-click highlight, double-click edit): no click delay | pending | details/interaction.md |  |
| 001-139:9 | MISSING | Moving secondary actions to a detail screen removes click delay, costs multi-level convenience | pending | details/interaction.md |  |
| 001-139:10#1 | MISSING | Diagonal submenu safe triangle: keep submenu open while cursor stays in triangle above minimum speed | pending | details/interaction.md |  |
| 001-139:10#2 | MISSING | Switch to adjacent menu items only when cursor moves slowly | pending | details/interaction.md |  |
| 001-139:12 | MISSING | Edge-hover: cursor must stay on screen edge a minimum time before collapsed sidebar expands | pending | details/interaction.md |  |
| 001-139:13#1 | MISSING | Drag-to-reorder near scroll edge: show drop-target preview | pending | details/interaction.md |  |
| 001-139:13#2 | MISSING | Edge scroll zone as velocity gradient (closer to edge, faster scroll) | pending | details/interaction.md |  |
| 001-139:14#2 | PARTIAL | Execute deletion immediately, remove item, show Undo toast | pending | details/interaction.md |  |
| 001-139:14#3 | MISSING | Or move item to "Recently Deleted", purged after 30 days | pending | details/interaction.md |  |
| 001-139:15#1 | PARTIAL | Report action complete immediately in UI | pending | details/interaction.md |  |
| 001-139:15#2 | MISSING | Hold real execution in delay buffer (Gmail: 5 s) so user can cancel | pending | details/interaction.md |  |
| 001-139:16#1 | PARTIAL | Replace manual Save/Cancel with instant auto-save | pending | details/interaction.md |  |
| 001-139:16#2 | MISSING | Pair auto-save with version history for rare rollbacks | pending | details/interaction.md |  |
| 001-139:17#1 | PARTIAL | Blocking warning modal only for novel, high-stakes, truly irreversible actions | pending | details/product-patterns.md |  |
| 001-139:17#2 | MISSING | Examples: bulk email to 10,000 recipients, money transfer | pending | details/interaction.md |  |
| 001-139:18 | MISSING | Standard buttons commit on mouseup so dragging away cancels | pending | details/interaction.md |  |
| 001-139:19 | MISSING | Popover/dropdown trigger commits on mousedown so press-drag-release selects | pending | details/interaction.md |  |
| 001-139:20#1 | PARTIAL | Pull-to-refresh and swipe-to-delete show progress toward commit | pending | details/gestures.md |  |
| 001-139:20#2 | MISSING | Keyboard commit on release, cancel on Esc (Cmd+Tab model) | pending | details/interaction.md |  |
| 001-139:24 | OUT-OF-SCOPE | Premise: receipt-style edge alignment and scannability | out-of-scope |  |  |
| 001-139:26#1 | MISSING | Primary labels hard-left, secondary values (prices) hard-right | pending | details/landing.md |  |
| 001-139:26#2 | MISSING | Avoid centered text except non-essential metadata | pending | details/landing.md |  |
| 001-139:27 | MISSING | Compact UIs: lock every internal element to at least two edges | pending | details/landing.md |  |
| 001-139:28 | MISSING | Manufacture an internal edge: align avatars/actions in one row for content to stack on | pending | details/landing.md |  |
| 001-139:29 | MISSING | Taller icon in stacked list: add subline to restore bottom edge | pending | details/surfaces.md |  |
| 001-139:30#1 | PARTIAL | Dense full-width list: differentiate before adding whitespace | pending | details/landing.md |  |
| 001-139:30#2 | MISSING | Avatars for people in lists | pending | details/product-patterns.md |  |
| 001-139:30#3 | PARTIAL | Group rows by category or due date | pending | details/landing.md |  |
| 001-139:30#4 | MISSING | Items locatable in about 1 second | pending | details/landing.md |  |
| 001-139:31#1 | PARTIAL | Replace extra labels/tooltips on hard-to-parse cards with visual primitives (diagrams, icons) | pending | details/product-patterns.md |  |
| 001-139:31#2 | PARTIAL | Blue underlined text for links | pending | details/typography.md |  |
| 001-139:31#3 | MISSING | Interactive category chips that swap tags in place without a menu | pending | details/product-patterns.md |  |
| 001-139:32#1 | PARTIAL | Mute default chips gray so the non-default item stands out without heavier font | pending | details/product-patterns.md |  |
| 001-139:33#2 | PARTIAL | Avoid border-on-border clutter and stacked border radii | pending | details/surfaces.md |  |
| 001-139:33#3 | PARTIAL | Replace card wrappers with one vertical column divider; rows and sections group | pending | details/surfaces.md |  |
| 001-139:37 | OUT-OF-SCOPE | Premise: vibe-coded sites lack domain identity, custom photography, cohesive scroll motion | out-of-scope |  |  |
| 001-139:39 | PARTIAL | Never ship text-only setup steps; pair value heading with real domain imagery | pending | details/landing.md |  |
| 001-139:41#1 | CONFLICT | Anchor: start from one moody domain photo, not sterile light or flat dark mode | pending | details/landing.md D3#1 |  |
| 001-139:41#2 | MISSING | Crop and darken the anchor photo | pending | details/landing.md |  |
| 001-139:41#3 | CONFLICT | Layer noise over the anchor photo | rejected | banned grain D3#2 |  |
| 001-139:42 | MISSING | Sample earthy primary tones from anchor photo; pair with high-contrast accent | pending | details/landing.md |  |
| 001-139:43#2 | CONFLICT | Pair expressive serif with clean sans-serif | pending | details/typography.md D3#3 |  |
| 001-139:44 | PARTIAL | Custom feature icons in brand accent colors | pending | details/surfaces.md |  |
| 001-139:45 | MISSING | Build layout skeleton from proven structural patterns before brand styling | pending | details/landing.md |  |
| 001-139:46 | MISSING | Hero: central actionable copy with domain objects scattered around | pending | details/landing.md |  |
| 001-139:47 | MISSING | Rotating client logo ribbon directly under hero | pending | details/landing.md |  |
| 001-139:48 | PARTIAL | How It Works: oversized imagery with domain textures, not rigid step boxes | pending | details/landing.md |  |
| 001-139:49 | MISSING | Features: full-screen colored tabs, oversized product visuals, body text cut about 90% | pending | details/landing.md |  |
| 001-139:50 | PARTIAL | Testimonials: cards stripped of grid lines and header text | pending | details/landing.md |  |
| 001-139:51 | MISSING | CTA: left-aligned heavy bold type over full-bleed background image | pending | details/landing.md |  |
| 001-139:53 | MISSING | CTA buttons at least 2x the heading-to-subtext vertical distance (baseline gap included) | pending | details/landing.md |  |
| 001-139:54 | MISSING | Scatter: larger floating assets low, smaller high, strict safety margin around center text | pending | details/landing.md |  |
| 001-139:55 | MISSING | Vignette: darken outer hero edges to focus center copy | pending | details/landing.md |  |
| 001-139:56#1 | PARTIAL | Alternate section treatments to pace the scroll | pending | details/landing.md |  |
| 001-139:56#2 | CONFLICT | Graph-paper grid texture on a cream section | rejected | graph paper needs a real canvas D3#4 |  |
| 001-139:56#3 | PARTIAL | Dominant product screenshots in the clean section | pending | details/landing.md |  |
| 001-139:58 | CONFLICT | 1-2 signature motion patterns repeated across the whole site | pending | details/motion.md D3#6 |  |
| 001-139:59 | MISSING | Hero-to-section scroll: slide assets off, blur hero text, slide section over hero; reverse at bottom CTA | pending | details/motion.md |  |
| 001-139:60#1 | PARTIAL | Multi-image showcase on automatic rotation timer | pending | details/motion.md |  |
| 001-139:60#2 | PARTIAL | Subtle zoom-in on cursor hover | pending | details/motion.md |  |
| 001-139:64 | OUT-OF-SCOPE | Premise: master UI/UX in 28 days by cloning, restyling, mapping flows | out-of-scope |  |  |
| 001-139:66 | MISSING | Four-zone hero skeleton: navbar, main text, hero image, stats block | pending | details/landing.md |  |
| 001-139:68 | MISSING | Heading-to-subtext gap 8 px | pending | details/landing.md |  |
| 001-139:69 | CONFLICT | Eyebrow text 12 px above heading | rejected | eyebrow ban, craft-floor.md:27 D3#7 |  |
| 001-139:70 | MISSING | Subtext-to-CTA gap 32 px | pending | details/landing.md |  |
| 001-139:71#1 | MISSING | Main heading about 7 words | pending | details/landing.md |  |
| 001-139:71#2 | MISSING | Subtext about 14 words | pending | details/landing.md |  |
| 001-139:72 | MISSING | Navbar links small; only primary conversion CTA is prominent | pending | details/landing.md |  |
| 001-139:73#1 | MISSING | Never obstruct hero focal point; place UI above, below, or left | pending | details/landing.md |  |
| 001-139:73#2 | PARTIAL | No busy background textures behind text | pending | details/landing.md |  |
| 001-139:74#1 | PARTIAL | Hierarchy between identical font sizes via opacity, not size | pending | details/typography.md |  |
| 001-139:74#2 | MISSING | Two stat lines at 15 px: primary 100% opacity, secondary label 55% | pending | details/typography.md |  |
| 001-139:75 | OUT-OF-SCOPE | Clone existing designs pixel-for-pixel to practice | out-of-scope |  |  |
| 001-139:77#1 | MISSING | Hero layout: text left, image right | pending | details/landing.md |  |
| 001-139:77#2 | MISSING | Hero layout: full-screen background image under text | pending | details/landing.md |  |
| 001-139:77#3 | MISSING | Hero layout: text top, image bottom (modern standard) | pending | details/landing.md |  |
| 001-139:77#4 | MISSING | Hero layout: image top, text bottom (rare) | pending | details/landing.md |  |
| 001-139:78#1 | MISSING | Centered text alignment (most common) | pending | details/landing.md |  |
| 001-139:78#2 | MISSING | Left-aligned text | pending | details/landing.md |  |
| 001-139:78#3 | MISSING | Split: heading left, body and CTA right | pending | details/landing.md |  |
| 001-139:79#2 | MISSING | Full-width background bleed image | pending | details/landing.md |  |
| 001-139:79#3 | MISSING | Slow-rotating image carousel | pending | details/gestures.md |  |
| 001-139:80#1 | PARTIAL | Brand statement: centered, larger type, generous whitespace | pending | details/landing.md |  |
| 001-139:80#2 | MISSING | Multi-item feature list: Bento grid so all items stay visible | pending | details/landing.md |  |
| 001-139:82#1 | MISSING | Warm flavor: warm background tones | pending | details/landing.md |  |
| 001-139:82#2 | MISSING | Warm flavor: colorful graphics | pending | details/landing.md |  |
| 001-139:82#3 | CONFLICT | Warm flavor: heavily rounded corners | pending | details/surfaces.md D3#8 |  |
| 001-139:82#4 | MISSING | Warm flavor: large bubbly buttons | pending | details/landing.md |  |
| 001-139:83#1 | CONFLICT | Modern flavor: sharp, minimal corner radii | pending | details/surfaces.md D3#8 |  |
| 001-139:83#2 | MISSING | Modern flavor: desaturated, premium imagery | pending | details/landing.md |  |
| 001-139:83#3 | CONFLICT | Modern flavor: subtle background noise | rejected | banned grain D3#2 |  |
| 001-139:84#1 | MISSING | Signup: login escape hatch on name/email screen for returning users | pending | details/product-patterns.md |  |
| 001-139:84#2 | MISSING | Email verification: decide hard-block vs gentle reminder intentionally | pending | details/product-patterns.md |  |
| 001-139:84#3 | MISSING | Ask team size at workspace creation: managers to invite screen, solo users skip it | pending | details/product-patterns.md |  |
| 001-139:85 | OUT-OF-SCOPE | Premise: delay portfolio creation until after 28-day learning | out-of-scope |  |  |
| 001-139:86 | OUT-OF-SCOPE | Week 1: collect about 20 hero/feature sections, annotate spacing and hierarchy | out-of-scope |  |  |
| 001-139:87 | OUT-OF-SCOPE | Week 2: pixel-clone two sites with different layouts | out-of-scope |  |  |
| 001-139:88 | OUT-OF-SCOPE | Week 3: restyle one clone in warm and modern flavors | out-of-scope |  |  |
| 001-139:89 | OUT-OF-SCOPE | Week 4: design branching onboarding screens (manager vs solo) | out-of-scope |  |  |
| 001-139:93 | OUT-OF-SCOPE | Premise: dashboards differ from mockups by data-driven form, progressive disclosure, invisible UI | out-of-scope |  |  |
| 001-139:96 | MISSING | Enumerated status/department columns become visual chips | pending | details/product-patterns.md |  |
| 001-139:97 | PARTIAL | Right-align numeric columns so digits align by place value | pending | details/typography.md |  |
| 001-139:98#2 | PARTIAL | Shade or dim inactive/deactivated table rows | pending | details/product-patterns.md |  |
| 001-139:99#1 | MISSING | Sequential time-sorted logs as vertical timeline (sidebar pop-out or second column) | pending | details/product-patterns.md |  |
| 001-139:99#2 | MISSING | Top summary chart for time trends | pending | details/product-patterns.md |  |
| 001-139:100#2 | PARTIAL | Reserve high-contrast color (red chip icon) for urgent data states only | pending | details/product-patterns.md |  |
| 001-139:100#3 | MISSING | User avatars on activity logs | pending | details/product-patterns.md |  |
| 001-139:102 | MISSING | Rank every action on explicitness spectrum (global Share button to hover-only copy) | pending | details/product-patterns.md |  |
| 001-139:103#1 | PARTIAL | Tuck infrequent secondary workflows into a popover instead of a page redirect | pending | details/product-patterns.md |  |
| 001-139:103#2 | MISSING | Anchor primary sub-action (search input) at top of popover | pending | details/product-patterns.md |  |
| 001-139:104 | PARTIAL | Swipe actions on mobile hide secondary list utilities | pending | details/gestures.md |  |
| 001-139:105#2 | PARTIAL | Sequence onboarding: one tooltip on #1 action, next only after completion | pending | details/product-patterns.md |  |
| 001-139:105#3 | MISSING | Or a compact corner checklist | pending | details/product-patterns.md |  |
| 001-139:107#1 | PARTIAL | Hidden micro-states: hover copy chips on cells as designed states | pending | details/mobile.md |  |
| 001-139:107#2 | MISSING | Corner triangle indicator on cells holding comments | pending | details/product-patterns.md |  |
| 001-139:107#3 | MISSING | Slide-over drawers and modals as designed hidden layers | pending | details/product-patterns.md |  |
| 001-139:109#1 | PARTIAL | Tooltips on every icon-only button | pending | details/product-patterns.md |  |
| 001-139:109#2 | MISSING | Tooltips on ambiguous column headers or labels | pending | details/product-patterns.md |  |
| 001-139:113 | OUT-OF-SCOPE | Premise: four craft tiers from $500 template to $10,000+ conversion engine | out-of-scope |  |  |
| 001-139:115 | OUT-OF-SCOPE | Level 1 tier label (2 of 10) | out-of-scope |  |  |
| 001-139:116#1 | MISSING | Avoid repetitive alternating zigzag sections | pending | details/landing.md |  |
| 001-139:116#2 | PARTIAL | Avoid disconnected corner radii (sharp image, rounded buttons) | pending | details/surfaces.md |  |
| 001-139:117#1 | PARTIAL | Avoid generic stock photos unrelated to the product | pending | details/landing.md |  |
| 001-139:117#2 | PARTIAL | Avoid primary blue applied haphazardly to text and buttons | pending | details/landing.md |  |
| 001-139:118#1 | PARTIAL | Fix weak hierarchy | pending | details/typography.md |  |
| 001-139:118#2 | PARTIAL | Avoid overly long or vague text blocks | pending | details/product-patterns.md |  |
| 001-139:119#1 | PARTIAL | Flat nav hierarchy where every link looks identical | pending | details/landing.md |  |
| 001-139:119#2 | MISSING | Nav weighted to the right side | pending | details/landing.md |  |
| 001-139:120 | PARTIAL | Zero motion beyond button hover | pending | details/motion.md |  |
| 001-139:121 | OUT-OF-SCOPE | Level 2 tier label (6 of 10) | out-of-scope |  |  |
| 001-139:122#1 | MISSING | Stacked (vertical) hero layout | pending | details/landing.md |  |
| 001-139:122#2 | PARTIAL | Use actual product dashboard UI in hero instead of stock imagery | pending | details/landing.md |  |
| 001-139:123#1 | MISSING | Pull vibrant accent pops from dashboard UI into page palette | pending | details/landing.md |  |
| 001-139:123#2 | MISSING | Primary CTA buttons shift to high-contrast white | pending | details/landing.md |  |
| 001-139:124#1 | MISSING | Center navigation links | pending | details/landing.md |  |
| 001-139:124#2 | MISSING | Small hover dropdowns for primary nav items | pending | details/landing.md |  |
| 001-139:124#3 | MISSING | Outline around important nav buttons | pending | details/landing.md |  |
| 001-139:125#1 | PARTIAL | Basic page-load animations on landing page | pending | details/motion.md |  |
| 001-139:126 | OUT-OF-SCOPE | Level 3 tier label (8 of 10) | out-of-scope |  |  |
| 001-139:127#1 | MISSING | Zoom into high-signal parts of dashboard, not the whole raw screen | pending | details/landing.md |  |
| 001-139:127#2 | MISSING | Frame content in full-height vertical grid lines that scale across viewports | pending | details/landing.md |  |
| 001-139:128#1 | PARTIAL | Replace 4-card rows with Bento grid | pending | details/landing.md |  |
| 001-139:128#2 | MISSING | Convert static 3-card rows into interactive multi-select tabs or sliders | pending | details/landing.md |  |
| 001-139:128#3 | PARTIAL | Keep sections shorter and more compact | pending | details/landing.md |  |
| 001-139:129#1 | MISSING | Hero announcement badge | pending | details/landing.md |  |
| 001-139:129#2 | MISSING | Client logo strip | pending | details/landing.md |  |
| 001-139:129#3 | MISSING | Button to social-proof or customer-stories page | pending | details/landing.md |  |
| 001-139:130 | MISSING | Mega menu for core links | pending | details/landing.md |  |
| 001-139:131 | MISSING | Fade hero bottom into logo strip and analytics (no hard break) | pending | details/motion.md |  |
| 001-139:132 | OUT-OF-SCOPE | Level 4 tier label (10 of 10) | out-of-scope |  |  |
| 001-139:133#1 | PARTIAL | Custom UI vignettes tailored to the narrative, not zoomed screenshots | pending | details/landing.md |  |
| 001-139:133#2 | MISSING | Flexible layouts where type widths lead lines into content | pending | details/landing.md |  |
| 001-139:134 | PARTIAL | Rewrite feature copy as outcomes ("turn data into decisions") | pending | details/product-patterns.md |  |
| 001-139:136 | PARTIAL | Blur transition when switching multi-select tabs | pending | details/motion.md |  |
| 001-139:137 | MISSING | Persistent mega menu: morph content instead of close and reopen | pending | details/motion.md |  |
| 001-139:138 | MISSING | Reveal social-proof CTA on hover over logo strip only | pending | details/landing.md |  |
| 140-340:142 | OUT-OF-SCOPE | Premise: mobile needs bigger base type, one-axis sections, single-purpose screens, bottom sheets, gesture nav | out-of-scope |  |  |
| 140-340:145#1 | PARTIAL | Floating bottom bar with 3-4 key icons | pending | details/mobile.md |  |
| 140-340:145#2 | MISSING | Max 5 bottom-bar links, absolute cap | pending | details/mobile.md |  |
| 140-340:145#3 | MISSING | Optional primary action breakout on right of bottom bar | pending | details/mobile.md |  |
| 140-340:147#1 | MISSING | Too many nav items: sidebar becomes homepage, recent items at top | pending | details/mobile.md |  |
| 140-340:147#2 | MISSING | Item counts and secondary actions aligned to right edge | pending | details/mobile.md |  |
| 140-340:147#3 | MISSING | Notification bell and "More" menu at top | pending | details/mobile.md |  |
| 140-340:147#4 | MISSING | Bottom edge reserved for large search or primary action | pending | details/mobile.md |  |
| 140-340:148#1 | PARTIAL | Never shrink desktop text to fit phone; mobile text larger | pending | details/mobile.md |  |
| 140-340:148#2 | PARTIAL | iOS base 17px vs macOS base 13px | pending | details/macos.md |  |
| 140-340:149 | PARTIAL | Mobile section moves in one direction only (stack OR horizontal scroll, never both) | pending | details/mobile.md |  |
| 140-340:150 | MISSING | Build mobile UI from four primitives: cards, text/links, images, inputs | pending | details/mobile.md |  |
| 140-340:153#1 | MISSING | One screen = one job (except home) | pending | details/mobile.md |  |
| 140-340:153#2 | MISSING | New feature gets a new screen, not crammed into existing one | pending | details/mobile.md |  |
| 140-340:154#1 | PARTIAL | Mid-task secondary selection uses bottom sheet, not a new page | pending | details/gestures.md |  |
| 140-340:154#2 | MISSING | Bottom sheet anatomy: title, search, confirm check, close X, option list; any height | pending | details/gestures.md |  |
| 140-340:154#3 | MISSING | "+" button opens sheet with keyboard up and input bar | pending | details/gestures.md |  |
| 140-340:156 | MISSING | Swipe-right back: underlying screen offset 35% left, moves in sync | pending | details/gestures.md |  |
| 140-340:157 | MISSING | Background zooms out as sheet rises, back to 100% on swipe-down | pending | details/gestures.md |  |
| 140-340:158 | MISSING | Vertical swipe-up on main views opens global search | pending | details/gestures.md |  |
| 140-340:159#1 | MISSING | Long-press blurs background | pending | details/gestures.md |  |
| 140-340:159#2 | MISSING | Long-press slightly zooms pressed element | pending | details/gestures.md |  |
| 140-340:159#3 | MISSING | Long-press shows contextual action menu or preview | pending | details/gestures.md |  |
| 140-340:160#1 | MISSING | Hide main nav bar when entering focused workflow | pending | details/mobile.md |  |
| 140-340:160#2 | MISSING | Editor swaps bottom nav for formatting/share controls | pending | details/mobile.md |  |
| 140-340:160#3 | MISSING | Template picker shows only Confirm and X | pending | details/mobile.md |  |
| 140-340:162#1 | PARTIAL | First-time empty state: full-screen, no instructional placeholder cards on home | pending | details/product-patterns.md |  |
| 140-340:162#2 | PARTIAL | Simple popover points at the primary "+" button | pending | details/product-patterns.md |  |
| 140-340:163#2 | PARTIAL | Explicitly acknowledge no items match the searched keyword | pending | details/product-patterns.md |  |
| 140-340:163#3 | PARTIAL | Spelling/typo suggestions on no results | pending | details/product-patterns.md |  |
| 140-340:163#4 | PARTIAL | Clear button to exit the empty state | pending | details/product-patterns.md |  |
| 140-340:167 | OUT-OF-SCOPE | Premise: ten foundational UI/UX pillars | out-of-scope |  |  |
| 140-340:169#1 | CONFLICT | Wrap related items in a shared container as signifier | pending | details/product-patterns.md D3#9 |  |
| 140-340:169#2 | MISSING | Wrap active toggle option in inner pill container | pending | details/product-patterns.md |  |
| 140-340:169#3 | PARTIAL | Gray out disabled text | pending | details/product-patterns.md |  |
| 140-340:169#5 | PARTIAL | Tooltip as signifier | pending | details/product-patterns.md |  |
| 140-340:170#1 | MISSING | Card: image at top | pending | details/landing.md |  |
| 140-340:170#2 | MISSING | Card: primary title large and bold, top-left | pending | details/landing.md |  |
| 140-340:170#3 | MISSING | Card: price top-right in blue | pending | details/landing.md |  |
| 140-340:170#4 | PARTIAL | Secondary metadata (time/date) shrinks below title | pending | details/typography.md |  |
| 140-340:170#5 | CONFLICT | Replace "From/To" text labels with directional icons joined by a line | rejected | icons never replace text, I7 D3#10 |  |
| 140-340:172#1 | MISSING | 12 columns desktop, 8 tablet, 4 mobile for repeating layouts | pending | details/landing.md |  |
| 140-340:173#2 | PARTIAL | Example: 32px vertical gap between major hero blocks | pending | details/landing.md |  |
| 140-340:175 | CONFLICT | One clean sans-serif font across the design | pending | details/typography.md D3#14 |  |
| 140-340:176#2 | CONFLICT | Large display headings: line-height 110-120% | pending | details/typography.md D3#16 |  |
| 140-340:177#1 | CONFLICT | Max 6 font sizes on landing pages/websites | pending | details/typography.md D3#15 |  |
| 140-340:177#2 | MISSING | Dashboard typography capped at 24px | pending | details/typography.md |  |
| 140-340:179 | PARTIAL | Build color ramp from one brand color: lighter for backgrounds, darker for text | pending | details/color-values.md |  |
| 140-340:180#1 | PARTIAL | Reserve semantic colors strictly for functional meaning | pending | details/color-values.md |  |
| 140-340:180#2 | CONFLICT | Fixed hues: blue=trust, red=danger, yellow=warning, green=success | pending | details/color-values.md D3#18 |  |
| 140-340:183 | PARTIAL | Dark mode depth: elevated surfaces lighter than background (shadows don't read) | pending | details/color-values.md |  |
| 140-340:184#1 | PARTIAL | Desaturate and dim bright status chip backgrounds | pending | details/color-values.md |  |
| 140-340:184#2 | MISSING | Flip chip text to a brighter tint | pending | details/color-values.md |  |
| 140-340:185#1 | PARTIAL | Light-mode shadows: lower opacity, higher blur, never the first thing noticed | pending | details/surfaces.md |  |
| 140-340:185#2 | PARTIAL | Subtle shadow on standard cards, stronger on floating popovers | pending | details/surfaces.md |  |
| 140-340:185#3 | PARTIAL | Inner + outer shadow combo for tactile raised buttons | pending | details/surfaces.md |  |
| 140-340:187 | MISSING | Icon pixel size equals adjacent text line-height | pending | details/typography.md |  |
| 140-340:188 | MISSING | Sidebar nav links as ghost buttons (transparent, fill on hover) | pending | details/product-patterns.md |  |
| 140-340:189 | MISSING | Button horizontal padding = 2x vertical height | pending | details/surfaces.md |  |
| 140-340:192 | PARTIAL | Inputs: default, focus, error (red border + message), optional warning | pending | details/product-patterns.md |  |
| 140-340:193 | PARTIAL | Click confirmation micro-interaction (e.g., "Copied" chip) | pending | details/motion.md |  |
| 140-340:194#1 | PARTIAL | Never place raw text over busy images | pending | details/color-values.md |  |
| 140-340:194#2 | MISSING | Never dull a photo with a flat full-screen dark overlay | pending | details/color-values.md |  |
| 140-340:194#3 | MISSING | Linear gradient transitioning into the text zone | pending | details/color-values.md |  |
| 140-340:194#4 | CONFLICT | Progressive blur over gradient for a "modern finish" | pending | details/color-values.md D3#20 |  |
| 140-340:198 | OUT-OF-SCOPE | Premise: AI-built SaaS shows five telltale flaws | out-of-scope |  |  |
| 140-340:201#1 | PARTIAL | Replace clashing bright AI button/icon fills with cohesive dark-tinted surfaces | pending | details/color-values.md |  |
| 140-340:201#2 | PARTIAL | Remove decorative card icons | pending | details/surfaces.md |  |
| 140-340:201#3 | CONFLICT | Inject color through functional micro-charts, not rainbow buttons | pending | details/charts.md D3#23 |  |
| 140-340:203#1 | MISSING | Eliminate redundant KPI rows repeated across tabs | pending | details/charts.md |  |
| 140-340:203#2 | MISSING | Confine metrics to Dashboard and dedicated Analytics tab | pending | details/charts.md |  |
| 140-340:204#1 | MISSING | Left-align sidebar items with tighter vertical spacing | pending | details/product-patterns.md |  |
| 140-340:204#2 | MISSING | Replace gradient letter-circle avatars with Account Card popover (Settings, Billing, Usage) | pending | details/product-patterns.md |  |
| 140-340:205#1 | MISSING | Collapse secondary action buttons into "..." menu | pending | details/product-patterns.md |  |
| 140-340:205#2 | MISSING | Move date to center of data card | pending | details/landing.md |  |
| 140-340:205#3 | MISSING | Reduce verbose status chips to simple icons | pending | details/product-patterns.md |  |
| 140-340:205#4 | PARTIAL | Right-align click counts | pending | details/typography.md |  |
| 140-340:207#1 | CONFLICT | Few-input creation form: centered modal instead of full-height side flyout | rejected | modal only for critical actions, I9 D3#28 |  |
| 140-340:207#3 | OUT-OF-SCOPE | Include domain/link-card switcher and description field | out-of-scope |  |  |
| 140-340:208#1 | PARTIAL | Delete non-functional placeholder cards | pending | details/product-patterns.md |  |
| 140-340:208#2 | PARTIAL | Organize Billing and Usage into tabs | pending | details/mobile.md |  |
| 140-340:208#3 | PARTIAL | Replace giant KPI boxes with 2-column layout of small donut charts | pending | details/charts.md |  |
| 140-340:209#1 | MISSING | Never display more than 4 pricing plans | pending | details/product-patterns.md |  |
| 140-340:209#2 | OUT-OF-SCOPE | Rename high-volume tier "Business" to "Enterprise" | out-of-scope |  |  |
| 140-340:209#3 | MISSING | Shrink plan title font, enlarge monthly price | pending | details/product-patterns.md |  |
| 140-340:209#4 | MISSING | Show discount amount explicitly so discounted tiers don't look cheaper | pending | details/product-patterns.md |  |
| 140-340:209#5 | MISSING | List only incremental features over previous tier | pending | details/product-patterns.md |  |
| 140-340:209#6 | OUT-OF-SCOPE | Append Billing Email and Payment Method fields below plans | out-of-scope |  |  |
| 140-340:210#1 | MISSING | Toggle to split aggregate charts into per-item comparisons | pending | details/charts.md |  |
| 140-340:210#2 | MISSING | Pack summary rows with icon-backed metrics | pending | details/charts.md |  |
| 140-340:210#3 | MISSING | Replace generic bar charts with shaded geographic map plus data table on left | pending | details/charts.md |  |
| 140-340:211#1 | PARTIAL | Replace generic feature icons with skewed interactive link cards on marketing page | pending | details/surfaces.md |  |
| 140-340:211#2 | PARTIAL | Use cropped, edited vignettes of the actual UI on marketing page | pending | details/landing.md |  |
| 140-340:215#2 | PARTIAL | Product UI mix about 90% neutral / 8% contrast / 2% accent | pending | details/color-values.md |  |
| 140-340:215#3 | PARTIAL | Enterprise needs 4-layer color architecture | pending | details/color-values.md |  |
| 140-340:218 | PARTIAL | Product UI: 4 background layers, 1-2 stroke colors, 3 text hierarchy variants | pending | details/color-values.md |  |
| 140-340:219#1 | MISSING | Base background near-white: 100% (Notion), 99% (Linear), 98% (Vercel) | pending | details/color-values.md |  |
| 140-340:219#2 | MISSING | Reserve 100% white for elevated cards on a slightly darker canvas | pending | details/color-values.md |  |
| 140-340:220#1 | PARTIAL | App frame / sidebar slightly darker than canvas | pending | details/product-patterns.md |  |
| 140-340:220#2 | PARTIAL | Tint app frame with ~2% brand hue | pending | details/color-values.md |  |
| 140-340:221 | CONFLICT | Light-mode card border: ~85% white (15% black), never pure black | pending | details/surfaces.md D3#27 |  |
| 140-340:222#1 | MISSING | Button importance scale: more important = darker, ghost to pure black | pending | details/color-values.md |  |
| 140-340:222#2 | MISSING | Utility buttons at 90-95% white | pending | details/color-values.md |  |
| 140-340:224 | MISSING | Heading text ~11% white, never 0% | pending | details/color-values.md |  |
| 140-340:225 | MISSING | Body text 15-20% white | pending | details/color-values.md |  |
| 140-340:226 | MISSING | Muted labels 30-40% white | pending | details/color-values.md |  |
| 140-340:228 | MISSING | Light ramp: 500/600 primary fill, 700 hover, 400/500 text links | pending | details/color-values.md |  |
| 140-340:229 | PARTIAL | Dark mode: adjacent surfaces 4-6% brightness apart (light mode ~2%) | pending | details/color-values.md |  |
| 140-340:230 | MISSING | Dark mode accent: primary 300/400, hover 400/500, dim text, brighten borders | pending | details/color-values.md |  |
| 140-340:231 | PARTIAL | Dark surfaces always get lighter as they elevate (or use subtle border) | pending | details/color-values.md |  |
| 140-340:233#1 | MISSING | Destructive actions must be red | pending | details/color-values.md |  |
| 140-340:233#2 | PARTIAL | Distinct colors for build success, failure, in-progress | pending | details/color-values.md |  |
| 140-340:234#1 | PARTIAL | OKLCH chart spectrum: lock L and C, step hue 25-30 degrees per series | pending | details/charts.md |  |
| 140-340:234#2 | MISSING | Monochrome brand ramps look too similar in multi-series charts | pending | details/charts.md |  |
| 140-340:236 | MISSING | Neutral-to-themed: per neutral, L -0.03, C +0.02, rotate H to brand | pending | details/color-values.md |  |
| 140-340:240 | OUT-OF-SCOPE | Premise: macOS apps act as keyboard-driven utilities | out-of-scope |  |  |
| 140-340:242 | MISSING | Utilities live outside main window (floating popover, drawer, hotkey overlay), appear on demand | pending | details/macos.md |  |
| 140-340:243#1 | MISSING | Strip traffic lights from transient quick-action panels | pending | details/macos.md |  |
| 140-340:243#2 | MISSING | Quick panel holds only drop zone, input, action buttons with shortcut hints, native blur | pending | details/macos.md |  |
| 140-340:244 | PARTIAL | On Enter, collapse panel into compact toast while save continues | pending | details/macos.md |  |
| 140-340:246 | MISSING | Three zones: top bar, left sidebar, center canvas | pending | details/macos.md |  |
| 140-340:247 | MISSING | Traffic-light controls integrated into top bar or sidebar | pending | details/macos.md |  |
| 140-340:248 | MISSING | Keep top ~50px of window free as drag zone | pending | details/macos.md |  |
| 140-340:250#1 | MISSING | Hide filters and secondary controls when app has no saved items | pending | details/product-patterns.md |  |
| 140-340:250#2 | PARTIAL | Hide image metadata until item is clicked | pending | details/product-patterns.md |  |
| 140-340:251#2 | MISSING | Light mode: compress surface differences (dark mode needs wider gaps) | pending | details/color-values.md |  |
| 140-340:252#1 | MISSING | Collapsible bottom floating search bar + right slide-out preview panel | pending | details/macos.md |  |
| 140-340:252#2 | MISSING | Search shows result count and clear X inside the bar | pending | details/product-patterns.md |  |
| 140-340:252#3 | MISSING | Active query plus "Back to Browse" arrow top-left | pending | details/product-patterns.md |  |
| 140-340:253 | PARTIAL | Every keyboard shortcut triggers immediate visual state change or micro-animation | pending | details/motion.md |  |
| 140-340:254#1 | PARTIAL | Drag files into quick-save drop zone | pending | details/macos.md |  |
| 140-340:254#2 | MISSING | Drag saved assets out into external apps | pending | details/macos.md |  |
| 140-340:254#3 | MISSING | Floating action bar (Copy, Find, Delete, Share) in preview panel | pending | details/macos.md |  |
| 140-340:255#1 | PARTIAL | Dismiss onboarding by requiring the real keyboard shortcut | pending | details/product-patterns.md |  |
| 140-340:255#2 | PARTIAL | Permanent shortcut cheat sheet inside settings popover | pending | details/product-patterns.md |  |
| 140-340:259 | OUT-OF-SCOPE | Premise: hacks to kill sterile web layouts | out-of-scope |  |  |
| 140-340:262 | CONFLICT | Center hero copy, surround with domain illustrations (coins, invoices, doodles, scribbles) | rejected | sketch SVG ban, craft-floor.md:46 D3#22 |  |
| 140-340:263 | PARTIAL | Generous empty whitespace around the central text block | pending | details/landing.md |  |
| 140-340:264 | MISSING | Angle and scale outer elements to trail toward edges, pointing eye to center | pending | details/landing.md |  |
| 140-340:265 | PARTIAL | Match illustration playfulness to brand tone (blobs, neo-brutalist doodles, realistic objects) | pending | details/motion.md |  |
| 140-340:267#1 | PARTIAL | Non-linear, physics-eased entrances on floating assets | pending | details/motion.md |  |
| 140-340:267#2 | CONFLICT | Balloon bobs up and down in place (perpetual idle motion) | pending | details/motion.md D3#25 |  |
| 140-340:268 | CONFLICT | Scroll parallax on margin elements for 3D depth | pending | details/motion.md D3#25 |  |
| 140-340:269 | PARTIAL | Animate words inside headline to illustrate meaning | pending | details/motion.md |  |
| 140-340:270 | OUT-OF-SCOPE | "~80% of websites are text" | out-of-scope |  |  |
| 140-340:271#1 | CONFLICT | Hover-triggered text blur reveals floating message bubbles | rejected | decorative blur ban, craft-floor.md:34 D3#21 |  |
| 140-340:271#2 | PARTIAL | Subtle hover interaction on every simple link | pending | details/color-values.md |  |
| 140-340:272#2 | PARTIAL | Conversational phrasing ("We sweat the details") | pending | details/product-patterns.md |  |
| 140-340:274#1 | MISSING | Interactive 404: mini-game, auto-redirect when finished | pending | details/motion.md |  |
| 140-340:274#2 | PARTIAL | Charming character illustration on 404 | pending | details/motion.md |  |
| 140-340:274#3 | CONFLICT | Playful conversational error copy on 404 | pending | details/product-patterns.md D3#37 |  |
| 140-340:278 | OUT-OF-SCOPE | Premise: three categories of swipe interaction | out-of-scope |  |  |
| 140-340:281#1 | CONFLICT | Never linear easing on swipe; add bounce for momentum | pending | details/gestures.md D3#24 |  |
| 140-340:281#2 | PARTIAL | Tune easing to tone: snappy, springy, or smooth | pending | details/motion.md |  |
| 140-340:282 | MISSING | 3D ring: skew carousel cards near screen edges | pending | details/gestures.md |  |
| 140-340:283 | MISSING | Magnetic fluid pagination dots that stretch during swipe | pending | details/gestures.md |  |
| 140-340:284 | MISSING | Screen-edge horizon shrinks items; circular thumb-swipe path | pending | details/gestures.md |  |
| 140-340:285 | PARTIAL | Pair every swipe with explicit tap target (swipe plus button) | pending | details/gestures.md |  |
| 140-340:287#1 | MISSING | Swipe-up expands card and container to full screen together | pending | details/gestures.md |  |
| 140-340:287#2 | MISSING | Body content fades up along swipe vector | pending | details/gestures.md |  |
| 140-340:287#3 | CONFLICT | Elastic snap at top of expansion | pending | details/gestures.md D3#24 |  |
| 140-340:288 | MISSING | Onboarding: expanding circle background transition; Next button clickable and swipeable | pending | details/gestures.md |  |
| 140-340:289 | PARTIAL | Hero zoom continuity: tapped card image zooms into next page hero | pending | details/motion.md |  |
| 140-340:291 | MISSING | Magnetic swipe-to-add row with long-press backup | pending | details/gestures.md |  |
| 140-340:292#1 | PARTIAL | Swipe-down dismissal of bottom popover alongside close button | pending | details/gestures.md |  |
| 140-340:292#2 | MISSING | Background zoom/shift synced with sheet open and dismiss | pending | details/gestures.md |  |
| 140-340:293 | PARTIAL | Full-width slide-to-confirm track for high-stakes irreversible actions | pending | details/motion.md |  |
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
| 140-340:317 | PARTIAL | Never use 5 bright accent fills on sibling cards | pending | details/color-values.md |  |
| 140-340:318#1 | CONFLICT | Follow 60-30-10 (60% neutral, 30% secondary, 10% accent) | pending | details/color-values.md D3#19 |  |
| 140-340:318#2 | MISSING | If brand color overpowers secondary cards, use soft-tint card fill and black text | pending | details/color-values.md |  |
| 140-340:319#1 | PARTIAL | Keep icons neutral; reserve color for status | pending | details/color-values.md |  |
| 140-340:321#1 | PARTIAL | No bright gradient app background; neutral gray canvas | pending | details/color-values.md |  |
| 140-340:321#2 | PARTIAL | Or white canvas with light-gray feature containers | pending | details/color-values.md |  |
| 140-340:323 | CONFLICT | Remove background fill when it clutters; define card with border | pending | details/surfaces.md D3#27 |  |
| 140-340:325#1 | PARTIAL | Analogous colors: rotate slightly on wheel for multi-segment components | pending | details/color-values.md |  |
| 140-340:325#2 | MISSING | Complementary accent across the wheel | pending | details/color-values.md |  |
| 140-340:326 | PARTIAL | Darken brand or pair with darker accessible shade when white text fails WCAG | pending | details/color-values.md |  |
| 140-340:328#1 | PARTIAL | Replace pure black/white with grays and dark brand tints for text and borders | pending | details/color-values.md |  |
| 140-340:328#2 | PARTIAL | Dark gray or dark purple for secondary metadata | pending | details/color-values.md |  |
| 140-340:328#3 | MISSING | Lighten borders around well-grouped elements | pending | details/color-values.md |  |
| 140-340:329#1 | MISSING | Dark mode: lower brightness of gray text to prevent eye strain | pending | details/color-values.md |  |
| 140-340:329#2 | MISSING | Pure white reserved for most important titles and primary actions | pending | details/color-values.md |  |
| 140-340:332#1 | PARTIAL | Dark mode: increase brightness difference between cards and borders | pending | details/color-values.md |  |
| 140-340:332#2 | MISSING | Dark mode body copy in neutral light grays | pending | details/color-values.md |  |
| 140-340:332#3 | MISSING | Dark mode headings pure white | pending | details/color-values.md |  |
| 140-340:332#4 | PARTIAL | Desaturate bright brand logos/accents in dark mode | pending | details/color-values.md |  |
| 140-340:334#1 | MISSING | Never style Delete with primary brand color | pending | details/color-values.md |  |
| 140-340:334#2 | PARTIAL | Always include semantic red and green regardless of brand | pending | details/color-values.md |  |
| 140-340:334#3 | MISSING | Non-destructive badges may use red or brand color | pending | details/color-values.md |  |
| 140-340:337 | MISSING | Hover (desktop): slightly lighter/brighter base color | pending | details/color-values.md |  |
| 140-340:338 | PARTIAL | Active/pressed: slightly darker base color (desktop and mobile tap) | pending | details/color-values.md |  |
| 140-340:339 | PARTIAL | Disabled: desaturate to low-contrast light gray fill with muted text | pending | details/color-values.md |  |
| 341-575:345 | MISSING | Sidebar top: profile avatar + dropdown instead of static logo | pending | details/product-patterns.md |  |
| 341-575:347#3 | CONFLICT | Sidebar collapses to icon-only rail | rejected | icon-only nav, I7 D3#13 |  |
| 341-575:347#4 | MISSING | Right-aligned count / "New" chips in nav items | pending | details/product-patterns.md |  |
| 341-575:348#2 | MISSING | Push Settings and Help to bottom of sidebar | pending | details/product-patterns.md |  |
| 341-575:348#3 | PARTIAL | Nest expanding link lists in dropdowns | pending | details/product-patterns.md |  |
| 341-575:349 | MISSING | Compact notification box in empty sidebar space | pending | details/product-patterns.md |  |
| 341-575:352#1 | MISSING | Strict 2-column, 2-row grid | pending | details/landing.md |  |
| 341-575:352#2 | PARTIAL | Primary user job at top | pending | details/landing.md |  |
| 341-575:352#3 | PARTIAL | Supporting metrics below the primary job | pending | details/landing.md |  |
| 341-575:352#4 | MISSING | Top header bar reserved for global page actions (filter, Create CTA) | pending | details/product-patterns.md |  |
| 341-575:354 | MISSING | Minimal list row fields (favicon, link, URL, date, count, description) | pending | details/product-patterns.md |  |
| 341-575:356 | PARTIAL | Checkbox multi-select reveals contextual Bulk Actions | pending | details/product-patterns.md |  |
| 341-575:358 | MISSING | Avoid abstract, unreadable custom chart shapes | pending | details/charts.md |  |
| 341-575:359#1 | MISSING | Line graph: background grid lines | pending | details/charts.md |  |
| 341-575:359#2 | MISSING | Line graph: axis numbers | pending | details/charts.md |  |
| 341-575:359#3 | MISSING | Line graph: top summary metric | pending | details/charts.md |  |
| 341-575:359#4 | MISSING | Line graph: date range selector | pending | details/charts.md |  |
| 341-575:360#1 | MISSING | Bar chart: item favicon beside each bar | pending | details/charts.md |  |
| 341-575:360#2 | MISSING | Bar chart: date range selector | pending | details/charts.md |  |
| 341-575:360#3 | MISSING | Bar chart: metric toggles | pending | details/charts.md |  |
| 341-575:362#1 | PARTIAL | Popover for simple non-blocking context | pending | details/product-patterns.md |  |
| 341-575:362#2 | MISSING | Popover dismisses on outside click | pending | details/product-patterns.md |  |
| 341-575:363#1 | PARTIAL | Modal for complex creation flows tied to screen data | pending | details/product-patterns.md |  |
| 341-575:363#2 | PARTIAL | Modal requires explicit Create or Cancel click | pending | details/product-patterns.md |  |
| 341-575:363#3 | MISSING | Toast after modal confirms the change | pending | details/product-patterns.md |  |
| 341-575:364#1 | PARTIAL | Toast for non-intrusive feedback without taking over screen | pending | details/product-patterns.md |  |
| 341-575:364#2 | CONFLICT | Toast for warnings and errors | pending | details/interaction.md D3#29 |  |
| 341-575:365#1 | MISSING | Dedicated page for permanent deep contexts | pending | details/product-patterns.md |  |
| 341-575:365#2 | PARTIAL | Back button or breadcrumbs on dedicated pages | pending | details/product-patterns.md |  |
| 341-575:367#3 | MISSING | Separate list items with alternating row background | pending | details/product-patterns.md |  |
| 341-575:367#4 | MISSING | Turn tables interactive with Search, Filter, Sort | pending | details/product-patterns.md |  |
| 341-575:368#1 | PARTIAL | Cards have generous internal padding | pending | details/product-patterns.md |  |
| 341-575:368#3 | CONFLICT | Light mode cards use surface fills, not outlines | pending | details/surfaces.md D3#27 |  |
| 341-575:369 | MISSING | Combine forms inside modals, settings lists, table cards | pending | details/product-patterns.md |  |
| 341-575:370 | PARTIAL | Tabs switch related views in place, not sidebar links | pending | details/product-patterns.md |  |
| 341-575:372#1 | MISSING | Line chart hover: exact value plus % change bubble | pending | details/charts.md |  |
| 341-575:372#2 | MISSING | Bar chart hover: dim non-hovered bars | pending | details/charts.md |  |
| 341-575:380 | MISSING | Drop users into a large prompt box, no marketing page | pending | details/ai-interface.md |  |
| 341-575:381#1 | MISSING | Render attachments as compact preview blocks | pending | details/ai-interface.md |  |
| 341-575:381#2 | MISSING | Auto-collapse long pasted code into collapsible block | pending | details/ai-interface.md |  |
| 341-575:382#1 | MISSING | Selectable mode chips | pending | details/ai-interface.md |  |
| 341-575:382#2 | MISSING | @ context-tagging pills | pending | details/ai-interface.md |  |
| 341-575:382#3 | OUT-OF-SCOPE | Deep integration buttons (Drive, GitHub, Figma) | out-of-scope |  |  |
| 341-575:383#2 | MISSING | Live token cost estimator above input | pending | details/ai-interface.md |  |
| 341-575:383#3 | PARTIAL | Compact looping loader (bouncing dots, rotating star) | pending | details/ai-interface.md |  |
| 341-575:385 | MISSING | History as vertical session list or anchored to originating block | pending | details/ai-interface.md |  |
| 341-575:386#1 | MISSING | Preview first line or snippet of each generation | pending | details/ai-interface.md |  |
| 341-575:386#2 | MISSING | Allow chat deletion | pending | details/ai-interface.md |  |
| 341-575:386#3 | MISSING | Search bar over generation history | pending | details/ai-interface.md |  |
| 341-575:388#1 | MISSING | Memory panel not buried in deep settings | pending | details/ai-interface.md |  |
| 341-575:388#2 | MISSING | Storage space meter for memory | pending | details/ai-interface.md |  |
| 341-575:388#3 | PARTIAL | Bulk deletion of memory entries | pending | details/ai-interface.md |  |
| 341-575:388#4 | MISSING | User manually adds key facts to memory | pending | details/ai-interface.md |  |
| 341-575:390#1 | MISSING | Highlight any sentence and type revision instructions | pending | details/ai-interface.md |  |
| 341-575:390#2 | MISSING | Quick-action buttons (Improve writing, Fix spelling) | pending | details/ai-interface.md |  |
| 341-575:390#3 | PARTIAL | Visible keyboard shortcuts beneath quick actions | pending | details/ai-interface.md |  |
| 341-575:390#4 | MISSING | Frame edits as revision, not full regeneration | pending | details/ai-interface.md |  |
| 341-575:392 | MISSING | Expose intermediate reasoning steps and sources | pending | details/ai-interface.md |  |
| 341-575:393#1 | PARTIAL | Trail steps fade in sequentially | pending | details/ai-interface.md |  |
| 341-575:393#2 | MISSING | Reasoning trail is collapsible | pending | details/ai-interface.md |  |
| 341-575:395 | MISSING | Stream text responses word-by-word | pending | details/ai-interface.md |  |
| 341-575:396#1 | PARTIAL | Skeleton placeholders in the exact layout slots of final output | pending | details/product-patterns.md |  |
| 341-575:396#2 | MISSING | Moving shimmer on skeleton placeholders | pending | details/motion.md |  |
| 341-575:398#1 | MISSING | Clickable confidence pill labelled High Confidence or Unverified | pending | details/ai-interface.md |  |
| 341-575:398#2 | MISSING | Click reveals exact numeric confidence % | pending | details/ai-interface.md |  |
| 341-575:399#1 | CONFLICT | Dark glass: semi-transparent dark fill | pending | details/surfaces.md D3#21 |  |
| 341-575:399#2 | CONFLICT | Dark glass: subtle fill gradient | pending | details/surfaces.md D3#21 |  |
| 341-575:399#3 | CONFLICT | Dark glass: background blur | pending | details/surfaces.md D3#21 |  |
| 341-575:399#5 | MISSING | Dark glass: soft inner shadow | pending | details/surfaces.md |  |
| 341-575:399#6 | CONFLICT | Dark glass: shimmer moving across the border | rejected | ambient border shimmer, craft-floor.md:13 D3#41 |  |
| 341-575:410 | PARTIAL | Map multi-screen flows: how user arrived, what they need next | pending | details/product-patterns.md |  |
| 341-575:411 | PARTIAL | After creation, chain to next prompt (add members) with Skip | pending | details/product-patterns.md |  |
| 341-575:412 | MISSING | Chain related decisions in one sequence (outreach, template, batch) | pending | details/product-patterns.md |  |
| 341-575:414 | PARTIAL | Primary color reserved for safe, non-destructive action in all dialogs | pending | details/product-patterns.md |  |
| 341-575:415#2 | OUT-OF-SCOPE | Example "Create Listing" modal layout | out-of-scope |  |  |
| 341-575:422 | PARTIAL | Eliminate scattered micro-boxes, overlapping popups, decorative shapes | pending | details/mobile.md |  |
| 341-575:423#1 | CONFLICT | Consolidated text blocks with bold numbers | pending | details/landing.md D3#39 |  |
| 341-575:423#3 | PARTIAL | 5-second clarity test | pending | details/landing.md |  |
| 341-575:424#1 | MISSING | Never hide the product category in a small corner label over a photo | pending | details/landing.md |  |
| 341-575:424#2 | PARTIAL | Bring the actual product UI above the fold | pending | details/landing.md |  |
| 341-575:426#1 | PARTIAL | Scroll motion must not delay the product reveal | pending | details/motion.md |  |
| 341-575:426#2 | MISSING | Scroll transitions morph hero into product UI | pending | details/landing.md |  |
| 341-575:427 | MISSING | Single-section hover-triggered product demo | pending | details/landing.md |  |
| 341-575:429 | MISSING | In-place feature reveal beside isolated UI on scroll | pending | details/landing.md |  |
| 341-575:430#1 | MISSING | Cursor-reactive background effects | pending | details/motion.md |  |
| 341-575:430#2 | PARTIAL | "Explore" button unfolds view in place | pending | details/product-patterns.md |  |
| 341-575:433#1 | MISSING | Menu typography and alignment distinguish clickable items from headers | pending | details/product-patterns.md |  |
| 341-575:433#2 | PARTIAL | Right-aligned keyboard shortcuts in menus | pending | details/product-patterns.md |  |
| 341-575:434 | MISSING | Clicking a menu item morphs it into a modal | pending | details/motion.md |  |
| 341-575:436 | PARTIAL | Mobile onboarding with a hyper-clean canvas | pending | details/product-patterns.md |  |
| 341-575:437 | MISSING | Horizontal swipe paired with tools sliding up from bottom | pending | details/gestures.md |  |
| 341-575:438#1 | PARTIAL | Bottom-up slide signals temporary or contextual actions | pending | details/motion.md |  |
| 341-575:438#2 | MISSING | Horizontal slide signals forward progress | pending | details/motion.md |  |
| 341-575:446 | MISSING | Primary intent first: search bar split into key parameters | pending | details/product-patterns.md |  |
| 341-575:449 | PARTIAL | Do not invent contrarian layouts unless demonstrably better | pending | details/product-patterns.md |  |
| 341-575:450#1 | PARTIAL | Information flows top-to-bottom and left-to-right | pending | details/landing.md |  |
| 341-575:450#2 | CONFLICT | Keep navigation at the top | pending | details/product-patterns.md D3#35 |  |
| 341-575:452 | PARTIAL | Browse cards omit long descriptions; show only location, rating, price | pending | details/product-patterns.md |  |
| 341-575:453#3 | MISSING | Solid circle behind overlay icons on bright photos | pending | details/surfaces.md |  |
| 341-575:455#1 | MISSING | Consolidate overflowing nav into animated menu | pending | details/product-patterns.md |  |
| 341-575:455#2 | MISSING | Compact search pill that animates open on click | pending | details/product-patterns.md |  |
| 341-575:456#1 | PARTIAL | Prefer explicit "Load More" over infinite scroll | pending | details/product-patterns.md |  |
| 341-575:456#2 | MISSING | Load More lets users reach the footer | pending | details/product-patterns.md |  |
| 341-575:457#2 | PARTIAL | Avoid scrolljacking | pending | details/motion.md |  |
| 341-575:459 | MISSING | Right-size system: lightweight for startups, rigid for enterprise | pending | details/product-patterns.md |  |
| 341-575:460#1 | PARTIAL | Design system as shared team language | pending | details/product-patterns.md |  |
| 341-575:460#2 | PARTIAL | Know when to break a system rule intentionally | pending | details/product-patterns.md |  |
| 341-575:467#1 | MISSING | Search bar for options not in a fixed list | pending | details/product-patterns.md |  |
| 341-575:468 | PARTIAL | Sketch flows on paper to catch missing micro-utilities | pending | details/product-patterns.md |  |
| 341-575:470#1 | PARTIAL | Avoid multi-hue gradients | pending | details/color-values.md |  |
| 341-575:470#2 | PARTIAL | Gradient must be monochrome or removed | pending | details/color-values.md |  |
| 341-575:471#1 | PARTIAL | Replace harsh default shadows | pending | details/surfaces.md |  |
| 341-575:471#2 | PARTIAL | Shadow color light gray, not black | pending | details/surfaces.md |  |
| 341-575:471#4 | PARTIAL | Or remove shadow entirely | pending | details/surfaces.md |  |
| 341-575:473#1 | PARTIAL | 3-column or 2-column grid on mobile | pending | details/landing.md |  |
| 341-575:473#3 | OUT-OF-SCOPE | Apply Auto Layout to cards and chips | out-of-scope |  |  |
| 341-575:473#4 | OUT-OF-SCOPE | Turn off Vertical Trim | out-of-scope |  |  |
| 341-575:476#1 | CONFLICT | Lock small component radius to 10px | pending | details/surfaces.md D3#8 |  |
| 341-575:478 | CONFLICT | Replace text-only actions with icons | rejected | icons never replace text, I7 D3#10 |  |
| 341-575:479#3 | OUT-OF-SCOPE | Named icon packs (Feather, Phosphor, Flaticon) | out-of-scope |  |  |
| 341-575:480#1 | CONFLICT | Universal icons (Home, Bookmark, User) need no text label | rejected | no universal-icon exemption, I7 D3#11 |  |
| 341-575:480#2 | PARTIAL | Ambiguous icons need an onboarding tooltip | pending | details/product-patterns.md |  |
| 341-575:480#3 | CONFLICT | Different icon styles allowed in separate functional zones | rejected | one icon family, C14 D3#12 |  |
| 341-575:482#1 | PARTIAL | Remove redundant carousel arrows where swipe is natural | pending | details/gestures.md |  |
| 341-575:482#2 | PARTIAL | Remove decorative arrows inside buttons | pending | details/surfaces.md |  |
| 341-575:482#3 | PARTIAL | Dim overpowering secondary button fills | pending | details/product-patterns.md |  |
| 341-575:484#2 | PARTIAL | Loading spinner for longer waits | pending | details/product-patterns.md |  |
| 341-575:485 | MISSING | Cross-component sync: fill Save icon and animate badge onto nav tab | pending | details/product-patterns.md |  |
| 341-575:487#1 | MISSING | Do not omit the vertical Y-axis | pending | details/charts.md |  |
| 341-575:487#2 | MISSING | No rounded bar tops | pending | details/charts.md |  |
| 341-575:487#3 | MISSING | Bar count matches the data (no 16 bars for 7 days) | pending | details/charts.md |  |
| 341-575:487#4 | MISSING | Flat-topped bars, labelled axes, exact data mapping | pending | details/charts.md |  |
| 341-575:494 | PARTIAL | Avoid overly complex Dribbble-style references | pending | details/landing.md |  |
| 341-575:495#1 | PARTIAL | Use clean screenshots from real production software | pending | details/landing.md |  |
| 341-575:495#2 | OUT-OF-SCOPE | Use pre-built component code from 21st.dev | out-of-scope |  |  |
| 341-575:497 | OUT-OF-SCOPE | Prompt: ask for single-file HTML and CSS for import | out-of-scope |  |  |
| 341-575:498 | OUT-OF-SCOPE | Prompt: state product category and user goal | out-of-scope |  |  |
| 341-575:499 | OUT-OF-SCOPE | Prompt: list required structural modules | out-of-scope |  |  |
| 341-575:502 | OUT-OF-SCOPE | html.to.design import workflow | out-of-scope |  |  |
| 341-575:504#1 | MISSING | Sidebar header: avatar, name, account switcher instead of generic label | pending | details/product-patterns.md |  |
| 341-575:504#2 | MISSING | Left-align all nav items | pending | details/product-patterns.md |  |
| 341-575:504#3 | PARTIAL | Delete redundant section headers ("Menu", "Other") | pending | details/surfaces.md |  |
| 341-575:504#4 | MISSING | Push Settings and Help to bottom of sidebar | pending | details/product-patterns.md |  |
| 341-575:505#1 | PARTIAL | Desaturate overly saturated purples toward blue | pending | details/color-values.md |  |
| 341-575:505#2 | PARTIAL | Darken bluish backgrounds into deep purple-gray | pending | details/color-values.md |  |
| 341-575:505#4 | CONFLICT | Subtle background grid pattern | rejected | grid overlay needs a real canvas D3#4 |  |
| 341-575:506#1 | PARTIAL | Gantt bars match the semantic legend | pending | details/color-values.md |  |
| 341-575:506#2 | PARTIAL | KPI cards use numeric percentage, not "In Progress" | pending | details/product-patterns.md |  |
| 341-575:512#1 | MISSING | Masked text slide on hover (two text copies in a clip mask) | pending | details/motion.md |  |
| 341-575:513 | MISSING | Keyboard shortcut caps animate pressed, then success badge | pending | details/motion.md |  |
| 341-575:514#1 | PARTIAL | Toast chains spinner then success state | pending | details/motion.md |  |
| 341-575:514#2 | CONFLICT | Particle burst on success | pending | details/motion.md D3#26 |  |
| 341-575:516 | OUT-OF-SCOPE | Avatar name tag: rounded pill, black fill, slight tilt | out-of-scope |  |  |
| 341-575:517#1 | PARTIAL | Name tag spring: 500ms, stiffness 636, damping 24 | pending | details/motion.md |  |
| 341-575:518#1 | CONFLICT | Rotating angular-gradient shimmer stroke | rejected | ambient border shimmer, craft-floor.md:13 D3#41 |  |
| 341-575:518#2 | OUT-OF-SCOPE | Build 1px border by boolean subtraction and masking | out-of-scope |  |  |
| 341-575:520 | PARTIAL | Pause/play toggle for continuous rotation | pending | details/motion.md |  |
| 341-575:521#1 | PARTIAL | 1000ms delay before icon tooltip | pending | details/motion.md |  |
| 341-575:521#2 | CONFLICT | Bouncy spring easing on tooltip | rejected | tooltips stay at bounce 0, motion.md:87 D3#24 |  |
| 341-575:521#3 | MISSING | Mouse leave resets tooltip immediately | pending | details/motion.md |  |
| 341-575:523 | MISSING | Inline keyword hover pops out preview without taking layout space | pending | details/motion.md |  |
| 341-575:524 | PARTIAL | Masked progress fill slides across track on step completion | pending | details/motion.md |  |
| 341-575:525 | PARTIAL | Stacked notification cards: swipe front away, scale back cards up | pending | details/gestures.md |  |
| 341-575:526 | MISSING | Magnifier icon morphs into expanding search input | pending | details/motion.md |  |
| 341-575:527 | PARTIAL | Old limit number slides out and new one slides in, in place | pending | details/motion.md |  |
| 341-575:533#1 | CONFLICT | Light card: 1px outline plus soft drop shadow | pending | details/surfaces.md D3#27 |  |
| 341-575:533#2 | CONFLICT | Shadow color very light gray, not transparent black | pending | details/surfaces.md D3#27 |  |
| 341-575:534 | OUT-OF-SCOPE | Hide via layer opacity, not fill opacity | out-of-scope |  |  |
| 341-575:536 | OUT-OF-SCOPE | Smart Animate matches by exact layer name | out-of-scope |  |  |
| 341-575:537#2 | PARTIAL | Icon background tints off-white on hover | pending | details/surfaces.md |  |
| 341-575:538#1 | PARTIAL | Focused app card: heavy bright yellow stroke | pending | details/surfaces.md |  |
| 341-575:538#2 | CONFLICT | Duplicate rectangle behind with 24px blur as glow | rejected | zero-offset halo, craft-floor.md:10 D3#40 |  |
| 341-575:539#2 | OUT-OF-SCOPE | Scale tool (K) shortcut | out-of-scope |  |  |
| 341-575:541 | PARTIAL | Five-frame loading spinner with 180-degree rotation steps | pending | details/motion.md |  |
| 341-575:543#1 | OUT-OF-SCOPE | Chain frames with After Delay 300ms | out-of-scope |  |  |
| 341-575:543#2 | PARTIAL | Spring stiffness 550, damping 40, mass 1 | pending | details/motion.md |  |
| 341-575:545 | OUT-OF-SCOPE | Success icon shares exact layer name with spinner | out-of-scope |  |  |
| 341-575:546#2 | PARTIAL | Mask checkmark inside a rounded square and slide it in | pending | details/motion.md |  |
| 341-575:546#3 | PARTIAL | Checkmark slides in after 300ms delay with ease-out | pending | details/motion.md |  |
| 341-575:552 | PARTIAL | Tighten tracking on text above 70-80px by -2% to -4% | pending | details/surfaces.md |  |
| 341-575:554#2 | PARTIAL | If gap exceeds outer radius, pick a smaller radius by eye | pending | details/surfaces.md |  |
| 341-575:554#3 | MISSING | Pill shapes need no concentric adjustment | pending | details/surfaces.md |  |
| 341-575:555 | MISSING | iOS corner smoothing at 100% | pending | details/surfaces.md |  |
| 341-575:556 | OUT-OF-SCOPE | Pick colors in HSB, not HEX | out-of-scope |  |  |
| 341-575:557 | CONFLICT | Companion layers: saturation +20, brightness -10 per layer | rejected | HSB steps, OKLCH instead, C20 D3#34 |  |
| 341-575:558 | CONFLICT | Shift hue 20 points toward darker spectrum (blue and purple darker) | rejected | HSB hue shift, OKLCH instead, C20 D3#34 |  |
| 341-575:560 | MISSING | Strip explicit labels ("Name:", "Price:") from cards | pending | details/product-patterns.md |  |
| 341-575:562#1 | PARTIAL | Stack name+location top-left, cost+rating top-right, icons in middle | pending | details/landing.md |  |
| 341-575:562#2 | MISSING | Keep labels only on dates | pending | details/product-patterns.md |  |
| 341-575:564#1 | CONFLICT | Delete horizontal divider lines between list items | pending | details/product-patterns.md D3#36 |  |
| 341-575:564#3 | MISSING | Subtle alternating row fill when rows are packed | pending | details/product-patterns.md |  |
| 341-575:567#1 | OUT-OF-SCOPE | Figma Nudge Amount set to 8px | out-of-scope |  |  |
| 341-575:567#2 | MISSING | Large distances: scale exponentially or round to 5 or 10 | pending | details/landing.md |  |
| 341-575:569 | CONFLICT | Replace pure white and pure black backgrounds with extreme brand tints | pending | details/color-values.md D3#33 |  |
| 341-575:571 | MISSING | Light mode: Tailwind 50 background, 500 accent | pending | details/color-values.md |  |
| 341-575:572 | MISSING | Dark mode: Tailwind 950 background, 300 accent | pending | details/color-values.md |  |
| 341-575:574#2 | PARTIAL | Dark elevation: raise brightness +4 to +6, lower saturation -10 to -20 per layer | pending | details/color-values.md |  |
| 341-575:574#3 | PARTIAL | Repeat step-up for nested dashboard layers | pending | details/color-values.md |  |
| 576-818:581 | PARTIAL | Strip social links, written testimonials, and side-of-page outline from hero/header; short pages get no page outline | pending | details/product-patterns.md |  |
| 576-818:582 | PARTIAL | Replace jagged stepped geometric cutouts with clean large rectangular imagery | pending | details/surfaces.md |  |
| 576-818:584 | OUT-OF-SCOPE | Source matching product bottle mockups instead of drawing 3D packaging | out-of-scope |  |  |
| 576-818:585 | OUT-OF-SCOPE | Keep luxury packaging minimal; avoid crowding labels with text | out-of-scope |  |  |
| 576-818:586 | MISSING | Don't stack centered lower text under centered upper text (awkward side margins); anchor asymmetric type with a horizontal divider | pending | details/landing.md |  |
| 576-818:588 | PARTIAL | Design desktop heroes at real screen size, not inflated Dribbble canvases | pending | details/mobile.md |  |
| 576-818:589 | MISSING | Desktop full-screen designs at 1920px x ~1000px to allow for browser chrome | pending | details/mobile.md |  |
| 576-818:591 | MISSING | Ultrawide hero split in two: left full-height image with overlaid copy, right interactive product showcase | pending | details/landing.md |  |
| 576-818:593 | MISSING | Place brand wordmark front and center/left in navbar | pending | details/product-patterns.md |  |
| 576-818:594a | PARTIAL | Collapse secondary utilities (Favorites, Notifications) into one Menu button | pending | details/product-patterns.md |  |
| 576-818:594b | CONFLICT | Convert Cart text link into an icon | pending | details/product-patterns.md D3#10 |  |
| 576-818:594c | PARTIAL | Replace Profile icon with an explicit Sign In action | pending | details/product-patterns.md |  |
| 576-818:594d | MISSING | Add a search bar to balance the top bar | pending | details/product-patterns.md |  |
| 576-818:596a | PARTIAL | Multi-product half-column becomes a horizontal slider | pending | details/product-patterns.md |  |
| 576-818:596b | MISSING | Top "New Arrivals" chip on the slider | pending | details/product-patterns.md |  |
| 576-818:597a | MISSING | Anchor card action buttons into the card corners | pending | details/product-patterns.md |  |
| 576-818:597b | PARTIAL | Standalone circular arrow button with no text, linking to catalog | pending | details/product-patterns.md |  |
| 576-818:599 | PARTIAL | Subtle darkening overlay over bright hero photo so white text passes contrast | pending | details/color-values.md |  |
| 576-818:600b | MISSING | Pair hero headline with concise subtext | pending | details/product-patterns.md |  |
| 576-818:607a | MISSING | Static single row of recognizable client logos | pending | details/product-patterns.md |  |
| 576-818:607b | PARTIAL | Or animate logos in a continuous left-to-right marquee | pending | details/motion.md |  |
| 576-818:608a | MISSING | Marquee edges: linear gradient mask | pending | details/motion.md |  |
| 576-818:608b | MISSING | Marquee edges: progressive blur | pending | details/motion.md |  |
| 576-818:609 | OUT-OF-SCOPE | Competitor-replacement messaging next to social proof | out-of-scope |  |  |
| 576-818:611a | MISSING | Headline and CTA above a full-width dashboard preview | pending | details/landing.md |  |
| 576-818:612a | PARTIAL | Distinctive display font for a SaaS hero | pending | details/typography.md |  |
| 576-818:612b | MISSING | Inline diagram above the hero dashboard | pending | details/product-patterns.md |  |
| 576-818:612c | MISSING | Make the hero dashboard interactive | pending | details/product-patterns.md |  |
| 576-818:612d | PARTIAL | Subtle background gradient behind the dashboard frame | pending | details/surfaces.md |  |
| 576-818:614 | MISSING | Group several workflows in one section with clickable horizontal or vertical tabs | pending | details/product-patterns.md |  |
| 576-818:615 | PARTIAL | Design the UI for every tab before handoff | pending | details/surfaces.md |  |
| 576-818:617a | PARTIAL | Lightweight, purposeful hover interactions instead of heavy GPU 3D renders | pending | details/motion.md |  |
| 576-818:617b | OUT-OF-SCOPE | Build hover animations with Figma Smart Animate | out-of-scope |  |  |
| 576-818:618 | MISSING | Build animations crisp and native; avoid blurry third-party Lottie/video exports | pending | details/motion.md |  |
| 576-818:620a | PARTIAL | Simple bento: 2 to 4 asymmetric cards per row | pending | details/landing.md |  |
| 576-818:620b | MISSING | Optional slight tilt on an interior card element | pending | details/surfaces.md |  |
| 576-818:622 | CONFLICT | Visible full-bleed 1px vertical and horizontal grid lines framing sections, bento cells, and hero | pending | details/surfaces.md D3#5 |  |
| 576-818:624 | MISSING | Visual mega-menus with thumbnails in nav dropdowns | pending | details/product-patterns.md |  |
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
| 576-818:656a | MISSING | Vertical scroll instead of tap-through story slides | pending | details/product-patterns.md |  |
| 576-818:656b | MISSING | Segmented progress bar on the right edge | pending | details/product-patterns.md |  |
| 576-818:657b | MISSING | Leave only the close X at the top | pending | details/mobile.md |  |
| 576-818:658a | MISSING | Delete explicit pause buttons on mobile story formats | pending | details/product-patterns.md |  |
| 576-818:658b | MISSING | Tap anywhere to pause | pending | details/product-patterns.md |  |
| 576-818:658c | MISSING | Auto-pause playback when Share is tapped | pending | details/product-patterns.md |  |
| 576-818:660 | MISSING | Chapter dropdown chip at the bottom to jump between sections | pending | details/product-patterns.md |  |
| 576-818:661a | MISSING | "View Summary" button at the end of each chapter | pending | details/product-patterns.md |  |
| 576-818:661b | MISSING | Single-screen stat dashboard for scanning and screenshotting | pending | details/product-patterns.md |  |
| 576-818:663 | OUT-OF-SCOPE | Surface behavioral extremes (most-skipped song, late-night listens) | out-of-scope |  |  |
| 576-818:665a | PARTIAL | Never show a raw number alone; append year-over-year context | pending | details/charts.md |  |
| 576-818:665b | OUT-OF-SCOPE | Contextual copy for a newly discovered artist | out-of-scope |  |  |
| 576-818:666a | OUT-OF-SCOPE | Rising Star slide | out-of-scope |  |  |
| 576-818:666b | OUT-OF-SCOPE | Single-track obsession slide with share percentage | out-of-scope |  |  |
| 576-818:668a | OUT-OF-SCOPE | Mood-to-color mesh gradient "aura" | out-of-scope |  |  |
| 576-818:668b | MISSING | Side-by-side comparison with previous years | pending | details/charts.md |  |
| 576-818:669 | MISSING | Pair genres with a recognizable visual metaphor (fruit pie) | pending | details/charts.md |  |
| 576-818:672a | OUT-OF-SCOPE | Highlight the most consistent artist | out-of-scope |  |  |
| 576-818:672b | MISSING | Interactive 12-month horizontal swipe timeline, every month inspectable | pending | details/charts.md |  |
| 576-818:675a | PARTIAL | Single Share button | pending | details/product-patterns.md |  |
| 576-818:675b | MISSING | Share popover with three scope options (slide, chapter, whole) | pending | details/product-patterns.md |  |
| 576-818:675c | OUT-OF-SCOPE | Stamp sender's name at the top of shared content | out-of-scope |  |  |
| 576-818:682a | PARTIAL | Two messages in one typographic slot that swap on hover or mask reveal | pending | details/motion.md |  |
| 576-818:682b | MISSING | Scroll-driven inline character animation that swaps text | pending | details/motion.md |  |
| 576-818:684a | CONFLICT | Pair sharp geometric headline with hand-drawn pencil scribbles, underlines, sketched arrows | rejected | sketch SVG ban, craft-floor.md:46 D3#22 |  |
| 576-818:684b | CONFLICT | Hover-triggered scribble animations | rejected | sketch SVG ban, craft-floor.md:46 D3#22 |  |
| 576-818:686 | PARTIAL | Stretch or animate display type per letter on scroll or load | pending | details/motion.md |  |
| 576-818:687a | OUT-OF-SCOPE | DevTools trick to identify fonts on a live site | out-of-scope |  |  |
| 576-818:687b | MISSING | Verify font licensing before commercial use | pending | details/typography.md |  |
| 576-818:689 | PARTIAL | Visible 1px border lines framing sections and multi-column blocks | pending | details/surfaces.md |  |
| 576-818:690 | MISSING | Rounded corners on the divider lines themselves | pending | details/surfaces.md |  |
| 576-818:692a | PARTIAL | Morph and scale media container shape on page load | pending | details/motion.md |  |
| 576-818:692b | PARTIAL | Morph media into oversized typography on scroll | pending | details/motion.md |  |
| 576-818:693 | PARTIAL | Keep container scale and shape transforms moderate; large resizes drop frames | pending | details/motion.md |  |
| 576-818:695a | MISSING | Scroll-stepped technical pipeline diagram | pending | details/product-patterns.md |  |
| 576-818:695b | MISSING | Circular node diagram that rotates and blurs non-active nodes on hover | pending | details/motion.md |  |
| 576-818:697a | MISSING | No text-only dropdown when product names are abstract | pending | details/product-patterns.md |  |
| 576-818:697b | MISSING | Show clear product photos inside the nav menu | pending | details/product-patterns.md |  |
| 576-818:703b | MISSING | Scrolling horizontal text marquee under a 3D centerpiece | pending | details/motion.md |  |
| 576-818:705a | OUT-OF-SCOPE | Spline: fast browser prototyping and web embeds | out-of-scope |  |  |
| 576-818:705b | OUT-OF-SCOPE | Spline video exports need a paid plan | out-of-scope |  |  |
| 576-818:706a | OUT-OF-SCOPE | Blender for custom metallic shaders | out-of-scope |  |  |
| 576-818:706b | OUT-OF-SCOPE | Blender free high-resolution video renders | out-of-scope |  |  |
| 576-818:708 | OUT-OF-SCOPE | Design flat logo in Figma and export SVG | out-of-scope |  |  |
| 576-818:709 | OUT-OF-SCOPE | Extrude 2D SVG paths into 3D | out-of-scope |  |  |
| 576-818:710 | OUT-OF-SCOPE | Configure camera, lights, metallic materials, rotation, export | out-of-scope |  |  |
| 576-818:711 | OUT-OF-SCOPE | Check 360° loop for dark shadow dead spots | out-of-scope |  |  |
| 576-818:712 | OUT-OF-SCOPE | Assemble in Figma and publish on Wix Studio | out-of-scope |  |  |
| 576-818:720 | PARTIAL | Replace multi-card collages with a full-screen feed where the only primary action is swipe | pending | details/product-patterns.md |  |
| 576-818:722 | MISSING | Keep onboarding friction minimal: broad interests, short tutorial, then the feed | pending | details/product-patterns.md |  |
| 576-818:723a | OUT-OF-SCOPE | Stat: 30–50% of a new user's first 1,000 videos come from onboarding inputs | out-of-scope |  |  |
| 576-818:723b | OUT-OF-SCOPE | Infer interests from content analysis (NLP and computer vision) | out-of-scope |  |  |
| 576-818:725a | OUT-OF-SCOPE | Stat: 37-second average video duration | out-of-scope |  |  |
| 576-818:725b | OUT-OF-SCOPE | Stat: 80+ videos per day, 53-minute session | out-of-scope |  |  |
| 576-818:727 | OUT-OF-SCOPE | Pair consumption app with a free creation tool (CapCut) | out-of-scope |  |  |
| 576-818:731a | MISSING | Primary swipe target spans almost 100% of the screen | pending | details/gestures.md |  |
| 576-818:731b | PARTIAL | Auto-snap the feed | pending | details/mobile.md |  |
| 576-818:731c | MISSING | Auto-play videos | pending | details/mobile.md |  |
| 576-818:732b | PARTIAL | Stack engagement icons on the lower-right edge (70–80% right-handed reach) | pending | details/mobile.md |  |
| 576-818:732c | OUT-OF-SCOPE | Stat: 70–80% of users are right-handed | out-of-scope |  |  |
| 576-818:739a | PARTIAL | Don't spend top-of-screen space on a massive header | pending | details/product-patterns.md |  |
| 576-818:739c | MISSING | Sidebar anatomy: logo, menu toggle, team avatars and Manage Team, Add Widget, Settings pinned at bottom | pending | details/product-patterns.md |  |
| 576-818:739d | CONFLICT | Designed collapsed icon-only sidebar state | rejected | icon-only nav, I7 D3#13 |  |
| 576-818:740c | PARTIAL | Strip useless voice-dictation mic icons | pending | details/product-patterns.md |  |
| 576-818:740d | PARTIAL | Turn a hidden "View Tasks" header button into an always-visible widget | pending | details/product-patterns.md |  |
| 576-818:742a | MISSING | Credit card widget omits send, receive, and direct-deposit actions | pending | details/product-patterns.md |  |
| 576-818:742b | MISSING | Merge the Lock Card control into the card widget | pending | details/product-patterns.md |  |
| 576-818:742c | PARTIAL | Brand-colored card with an oversized low-opacity watermark logo | pending | details/color-values.md |  |
| 576-818:742d | OUT-OF-SCOPE | Replace "Monthly Fee" with minimum payment and due date | out-of-scope |  |  |
| 576-818:742e | MISSING | Carousel switcher for multiple cards | pending | details/product-patterns.md |  |
| 576-818:743a | MISSING | Delete unlabelled and redundant secondary charts | pending | details/charts.md |  |
| 576-818:743b | MISSING | Merge growth-rate percentages into the card as percentage chips | pending | details/charts.md |  |
| 576-818:744a | MISSING | Never curve investment data lines | pending | details/charts.md |  |
| 576-818:744b | MISSING | Never fade the most recent data points | pending | details/charts.md |  |
| 576-818:744c | MISSING | Add grid lines to the investments chart | pending | details/charts.md |  |
| 576-818:744d | MISSING | Compact dropdown instead of bulky time-scale sliders | pending | details/charts.md |  |
| 576-818:744e | MISSING | Compare button to benchmark multiple portfolios | pending | details/charts.md |  |
| 576-818:744f | MISSING | Full-screen expand icon on chart | pending | details/charts.md |  |
| 576-818:745a | PARTIAL | Replace "Minimize" icon with labeled "All Activities" button | pending | details/product-patterns.md |  |
| 576-818:745b | PARTIAL | Delete tiny unclickable pagination dots | pending | details/surfaces.md |  |
| 576-818:745c | PARTIAL | Fraud alert card: warning icon, amount, date, location | pending | details/product-patterns.md |  |
| 576-818:745d | CONFLICT | Loan card with a 90°-rotated progress diagram | pending | details/charts.md D3#23 |  |
| 576-818:745e | OUT-OF-SCOPE | Loan card shows loan amount and repayment date | out-of-scope |  |  |
| 576-818:746a | MISSING | Wide thin container holding two reminder cards, respecting outer grid margins | pending | details/landing.md |  |
| 576-818:746c | PARTIAL | High-contrast red "All Tasks" button | pending | details/color-values.md |  |
| 576-818:746d | OUT-OF-SCOPE | "Add Reminder" button | out-of-scope |  |  |
| 576-818:747a | MISSING | Two-sided diverging bar chart (income up, expenses down) | pending | details/charts.md |  |
| 576-818:747b | MISSING | Dollar totals paired with the bars | pending | details/charts.md |  |
| 576-818:747c | MISSING | Full-screen expand icon on revenue chart | pending | details/charts.md |  |
| 576-818:748a | MISSING | Pie chart breakdown to fill grid gaps | pending | details/charts.md |  |
| 576-818:750b | PARTIAL | High priority top-left, Mid in the middle, Low on the bottom row | pending | details/landing.md |  |
| 576-818:757a | MISSING | Drop protruding center button so all tab-bar targets share one baseline | pending | details/product-patterns.md |  |
| 576-818:758c | MISSING | Replace generic user icon with the real profile picture | pending | details/product-patterns.md |  |
| 576-818:758e | PARTIAL | Add text labels only where icons are obscure | pending | details/product-patterns.md |  |
| 576-818:758f | PARTIAL | Optional blurred translucent dark-mode tab bar background | pending | details/surfaces.md |  |
| 576-818:760a | MISSING | Never curve line-chart data | pending | details/charts.md |  |
| 576-818:760b | MISSING | Never fade out the right end of the line | pending | details/charts.md |  |
| 576-818:761a | MISSING | Always include horizontal and vertical grid lines | pending | details/charts.md |  |
| 576-818:761b | MISSING | Value markers on line charts | pending | details/charts.md |  |
| 576-818:761c | MISSING | Time-frame buttons, or a dropdown when space is tight | pending | details/charts.md |  |
| 576-818:761d | PARTIAL | Muted gray comparison line for previous period, with legend | pending | details/charts.md |  |
| 576-818:763a | MISSING | Remove explicit CTA from repeated cards | pending | details/product-patterns.md |  |
| 576-818:763b | PARTIAL | Whole card clickable, with a hover arrow | pending | details/product-patterns.md |  |
| 576-818:763c | PARTIAL | Explicit button only for distinct actions (e.g., "Try it out") | pending | details/product-patterns.md |  |
| 576-818:764a | MISSING | Image fills 3/4 of card height | pending | details/product-patterns.md |  |
| 576-818:764b | PARTIAL | Linear gradient overlay from the bottom of the image upward | pending | details/color-values.md |  |
| 576-818:764c | PARTIAL | Layer card text over the image | pending | details/color-values.md |  |
| 576-818:766a | MISSING | Move pricing CTA above the feature list | pending | details/product-patterns.md |  |
| 576-818:766b | PARTIAL | Switch solid CTA to ghost stroke button when fill breaks hierarchy | pending | details/product-patterns.md |  |
| 576-818:767a | MISSING | Plan name and short description on pricing card | pending | details/product-patterns.md |  |
| 576-818:767b | PARTIAL | Billing terms and renewal rate below the price | pending | details/product-patterns.md |  |
| 576-818:768a | CONFLICT | Checkmark glyphs (✓) instead of bullets | pending | details/product-patterns.md D3#31 |  |
| 576-818:768b | MISSING | List excluded features explicitly | pending | details/product-patterns.md |  |
| 576-818:769 | PARTIAL | Tinted brand header instead of a divider between price and features | pending | details/color-values.md |  |
| 576-818:771 | OUT-OF-SCOPE | Figma star recipe: 12 points, rounded corners | out-of-scope |  |  |
| 576-818:772a | PARTIAL | Quirky display font for sticker badges (Gorditas, Barriecito) | pending | details/surfaces.md |  |
| 576-818:772b | OUT-OF-SCOPE | Inner outline or circular path text (To Path plugin) | out-of-scope |  |  |
| 576-818:772c | CONFLICT | Offset drop shadow at 100% opacity in a darker shade | rejected | offset sticker shadow outside neobrutalism, craft-floor.md:36 D3#32 |  |
| 576-818:772d | OUT-OF-SCOPE | Kaleidoscope effect on dark UIs | out-of-scope |  |  |
| 576-818:774b | PARTIAL | Permanent label above every input | pending | details/product-patterns.md |  |
| 576-818:774c | PARTIAL | Realistic example text in placeholder | pending | details/product-patterns.md |  |
| 576-818:775a | PARTIAL | Clear "Create account" subheading | pending | details/product-patterns.md |  |
| 576-818:775b | MISSING | "Log in" redirect link for existing users | pending | details/product-patterns.md |  |
| 576-818:776b | MISSING | Subtle off-white input background | pending | details/product-patterns.md |  |
| 576-818:776c | CONFLICT | Input border stroke at 40% opacity | pending | details/color-values.md D3#30 |  |
| 576-818:778a | PARTIAL | Don't copy a 5-column footer for only 3–5 links | pending | details/product-patterns.md |  |
| 576-818:779a | MISSING | Centered single-row footer: logo, 3–5 links, social icons | pending | details/product-patterns.md |  |
| 576-818:779b | MISSING | Copyright bottom-left, design credits bottom-right | pending | details/product-patterns.md |  |
| 576-818:781a | PARTIAL | Chips never use the primary CTA fill color | pending | details/color-values.md |  |
| 576-818:781b | MISSING | Chips vertically thinner than buttons | pending | details/surfaces.md |  |
| 576-818:782a | OUT-OF-SCOPE | Build with Auto Layout (Shift + A) | out-of-scope |  |  |
| 576-818:782b | MISSING | Chip vertical padding is 1/2 or 1/4 of horizontal (20px gives 10px or 5px) | pending | details/surfaces.md |  |
| 576-818:784a | PARTIAL | Carousel dots in a dark blurred pill, or below the image | pending | details/color-values.md |  |
| 576-818:784b | MISSING | Group Prev/Next arrows beside the dots | pending | details/product-patterns.md |  |
| 576-818:784c | MISSING | Active dot stretches into an animated progress-timer pill | pending | details/motion.md |  |
| 576-818:791 | MISSING | Serif: terminal ticks, authoritative, aids small-print legibility | pending | details/typography.md |  |
| 576-818:793a | PARTIAL | Display and handwritten faces only for oversized headlines | pending | details/typography.md |  |
| 576-818:793b | MISSING | Never display or handwritten faces for small body text | pending | details/typography.md |  |
| 576-818:793c | MISSING | Never Comic Sans | pending | details/surfaces.md |  |
| 576-818:794a | OUT-OF-SCOPE | Baseline, x-height, cap-height definitions | out-of-scope |  |  |
| 576-818:794b | PARTIAL | Tighten tracking on large text | pending | details/typography.md |  |
| 576-818:794c | MISSING | Loosen tracking on small text | pending | details/typography.md |  |
| 576-818:797 | PARTIAL | Two fonts as the ideal maximum (display + sans, or sans + serif) | pending | details/typography.md |  |
| 576-818:798a | PARTIAL | Three fonts only if each has a rigid job (display, UI sans, mono caption) | pending | details/typography.md |  |
| 576-818:798b | PARTIAL | Never use four fonts | pending | details/typography.md |  |
| 576-818:800 | MISSING | At small sizes, weight and opacity reduction look nearly identical | pending | details/typography.md |  |
| 576-818:801a | MISSING | Avoid ultra-bold and ultra-thin weights on body copy | pending | details/typography.md |  |
| 576-818:801b | PARTIAL | Primary text at 100% opacity | pending | details/color-values.md |  |
| 576-818:801c | CONFLICT | Secondary muted text at 40–70% opacity | pending | details/color-values.md D3#30 |  |
| 576-818:802a | PARTIAL | Don't make small body paragraphs light gray | pending | details/typography.md |  |
| 576-818:803 | PARTIAL | Main heading: large, regular weight, 100% opacity; size alone sets dominance | pending | details/typography.md |  |
| 576-818:804 | PARTIAL | Subheadings: medium size, bold weight | pending | details/typography.md |  |
| 576-818:805 | PARTIAL | Body: base size, regular weight, 100% opacity | pending | details/typography.md |  |
| 576-818:807 | MISSING | Golden ratio 1.62 across four heading levels balloons H1 to 110px | pending | details/typography.md |  |
| 576-818:808 | MISSING | Landing scale: sqrt(1.62) = 1.27, applied sequentially from 16px | pending | details/typography.md |  |
| 576-818:811 | CONFLICT | Fluid font size by linear interpolation between 320px and 1920px | pending | details/typography.md D3#17 |  |
| 576-818:813 | PARTIAL | Clamp fluid sizes with min() and max() bounds | pending | details/typography.md |  |
| 576-818:815a | MISSING | Increase line-height as font size gets smaller | pending | details/typography.md |  |
| 576-818:815c | MISSING | Decrease line-height as font size gets larger | pending | details/typography.md |  |
| 576-818:816 | CONFLICT | Body line-height ~1.5 (150%) | pending | details/typography.md D3#16 |  |
| 576-818:817 | MISSING | Heading line-height 1.1–1.3 | pending | details/typography.md |  |
