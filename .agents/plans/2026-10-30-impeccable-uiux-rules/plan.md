# Land the video UI/UX rules in impeccable

Status: ready - critic gate ran 2 rounds; round 2 findings fixed in revision 3, not re-reviewed (cap reached)

This ExecPlan is a living document. Progress, Surprises & Discoveries, Decision Log and Outcomes & Retrospective are kept current as work proceeds. Repo plan rules: none. Starts after: nothing. The vendored `impeccable` skill was already upgraded to upstream 4.8.0 in commit `4280335` on branch `impeccable-uiux-rules`. That commit is the baseline every diff below compares against.

## Progress

- [x] (2026-10-30) Gap map of all 818 source lines against `impeccable` (four tables in `data/gap-*.md`).
- [x] (2026-10-30) Web verification of the contested and numeric rules (three tables in `data/research-*.md`).
- [x] (2026-10-30) Upstream `impeccable` 4.8.0 pulled, custom delta proven identical, committed as `4280335`.
- [x] (2026-10-30) Critic round 1: 4 BLOCKER, 17 MAJOR, 7 MINOR. All fixed or dismissed in this revision (see Decision Log).
- [x] (2026-10-30) Critic round 2: 1 BLOCKER, 10 MAJOR, 12 MINOR. All fixed in revision 3 (see Decision Log).
- [x] (2026-10-30) Milestone 1 - ledger tooling. `build-ledger` prints `parsed 894 rows, 781 non-covered, wrote ledger.md`; a rerun exits 1 with `ledger.md exists`; a tampered ledger reports the duplicate and missing ids.
- [ ] Milestone 2 - ledger assignment.
- [ ] Milestone 3 - color and surface values.
- [ ] Milestone 4 - interaction, gestures, and motion.
- [ ] Milestone 5 - product patterns, charts, and typography.
- [ ] Milestone 6 - landing, mobile, macOS, and AI-interface patterns.
- [ ] Milestone 7 - provenance and final checks.

Updated at every stopping point. This list, not memory, says where the work is.

## Background / why now

After this plan, an agent running the `impeccable` design skill finds every actionable rule from the user's video notes, with its concrete numbers, when it builds or reviews UI. Today it does not.

The user extracted rules from 35 YouTube videos into `data/source.md`, a copy of `~/Downloads/Actionable UI_UX Design Rules Extraction.md` (818 lines). Four read-only agents split the file into 894 atomic rules and mapped each one against `impeccable`. The result: 113 COVERED, 250 PARTIAL, 353 MISSING, 64 CONFLICT, and 114 OUT-OF-SCOPE, so 781 rows are not covered. The biggest holes are charts, AI-interface patterns, interaction timing, exact color values, dashboard and sidebar patterns, pricing cards, macOS, and gesture motion.

The tables are `data/gap-001-139.md`, `data/gap-140-340.md`, `data/gap-341-575.md`, and `data/gap-576-818.md`. Each data row is `| src line | rule | status | evidence | note |`. The note column proposes a destination file. Source line ids come in three forms: a bare number (`41`), an `L` prefix (`L142`, only in `gap-140-340.md`), or a number plus a letter (`594a`, mostly in `gap-576-818.md`). One source line can hold several rows.

The user asked for every rule to land in the skills, and for each change to be checked against the internet first. Three research agents checked the contested and numeric claims against primary sources (NN/g, WCAG, Apple HIG, Material, Carbon, Atlassian, Datawrapper, shapeof.ai). Their verdicts are in `data/research-color-type-surface.md` (ids C1-C22), `data/research-interaction-nav-motion.md` (I1-I28), and `data/research-charts-ai.md` (D1-D14 and A1-A10). Until this plan lands, the rules stay in a Downloads file the agent never reads.

## User stories

1. As a developer building UI with an agent, I want the agent to apply the video rules, numbers included, without my pasting them, so that the UI it ships avoids the mistakes the videos name.
2. As the skill owner, I want a ledger that shows where each source rule landed or why it was rejected, so that I can trust nothing was dropped.
3. As the skill owner, I want the additions kept apart from upstream files, so that the next `impeccable` upgrade stays a clean diff.

## Scope and non-goals

In scope: all 781 non-covered gap rows each get exactly one ledger outcome. New files under `impeccable/reference/details/`. Additions to our own `details/` files. The rename of our `details/mobile-web.md` to `details/mobile.md`. The pointer lines listed in Locked decision 4. `details/README.md` rows. The `VENDORED.md` update.

Non-goals: OUT-OF-SCOPE rows (Figma steps, the resource list, portfolio and client presentation, Spline and Blender, platform statistics) land nowhere. The ledger marks them `out-of-scope` so the owner can see them. No upstream rule text changes. No changes to the `dataviz` skill, which the harness provides and which is not in this repo. No new skill.

## Context and orientation

This repo (`/Users/igby/Work/personal/skills`) is the single source of truth for the user's agent skills. `install.sh` symlinks each skill into every harness. `check.sh` runs mechanical checks, and its last line must be `OK`.

`impeccable/` is a vendored third-party skill from `pbakaus/impeccable`, now at 4.8.0. Vendored means copied whole from upstream. `VENDORED.md` records which files are ours, so an upgrade can carry them across. Ours are `impeccable/reference/details/` (the whole folder), `impeccable/reference/web-interface-guidelines.md`, and pointer lines in upstream references. A pointer line is a single sentence in an upstream file that says when to load one of our files and links it. Today there are pointer lines in `adapt.md`, `animate.md`, `audit.md` (two), `craft-floor.md`, `harden.md`, `optimize.md`, `polish.md`, and `typeset.md`.

How `impeccable` loads material: `SKILL.md` routes a request to a command reference, `reference/<command>.md`. Before any UI edit the agent reads `reference/craft-floor.md`, the quality floor. Since 4.8.0 its intro says a pinned brief or committed visual world overrides anything there "except a line marked as a ban". The surface mode is set in `SKILL.md`: Persuade for landing and marketing pages, Operate for app UI, Read for docs, and Experience for portfolios. The mode decides which rules apply. The mode files `mode-persuade.md` and `mode-operate.md` are printed by the `impeccable concept-seed` binary, so a pointer added there may never reach the agent. `reference/details/README.md` indexes our detail files as a table of file and "Load when".

Our current detail files are `motion.md` (194 lines: easing, durations, recipes, review table), `motion-performance.md`, `surfaces.md` (256 lines: nested radii, optical alignment, shadows versus borders, hit areas), `typography.md` (135 lines), `worst-case.md`, `worst-case-catalog.md`, and `mobile-web.md` (62 lines: phone web fixes).

Writing rules for any skill text: follow `writing-great-skills` (single source of truth, no no-ops, positive phrasing, leading words) and `no-ai-slop` for prose. No em dashes; use `-`. Plain English that a non-native reader understands in one pass.

The `dataviz` skill is available to agents in this harness through the Skill tool, but it is not on disk in this repo. It covers chart form choice, palettes, and mark specs. Load it with the Skill tool before writing `charts.md`.

## Locked decisions

1. **File set.** New files under `impeccable/reference/details/`, each named for what it holds:
   - `interaction.md`: click and press timing, menus, tooltips, undo versus confirm, autosave, commit on release, drag edge scroll, and choosing popover, modal, toast, or page.
   - `gestures.md`: swipe, drag, sheet, long-press, and carousel recipes. This keeps `motion.md` within budget.
   - `color-values.md`: surface steps, text levels, ramps, state colors, semantic colors, dark mode, and overlays on images.
   - `product-patterns.md`: Operate surfaces. Sidebar, navigation, lists and tables, cards, forms and inputs, search and empty states, onboarding sequencing, bulk actions, pricing cards, footers, and account menu.
   - `charts.md`: chart and KPI rules that `dataviz` does not already give.
   - `landing.md`: Persuade surfaces. Hero layouts and spacing, navbar, social proof, feature sections, bento, CTA, and section pacing.
   - `macos.md`: macOS app layout and utilities. It mirrors upstream's per-platform `ios.md` and `android.md`.
   - `ai-interface.md`: prompt entry, streaming, sources and reasoning, confidence, inline refine, memory, history, and cost.

   Phone app patterns go into our `mobile-web.md`, renamed `mobile.md`, under a new heading. Its scope widens to "a web or native app built for a phone". Each concept has one home. `gestures.md` owns how a gesture moves and commits: swipe, drag, sheet motion, long-press, carousel, and pull-to-refresh mechanics. `mobile.md` owns phone structure: bottom nav, which flows use a sheet, one-job screens, feeds, story formats, and thumb reach, and it links to `gestures.md` for the motion. Micro-interaction recipes extend `motion.md`. Type scale, tracking, line-height, and font-count rules extend `typography.md`. Shadow, button and chip padding, pill radius, icon size, and overlay-icon rules extend `surfaces.md`. Each detail file stays at or under 300 lines. Reason: the owner chose new `details/` files so upstream upgrades stay clean. Each file maps to one load condition, and the critic showed a separate mobile file would duplicate `adapt.md` and `mobile-web.md`.
2. **Generalize, keep numbers.** Write each rule as the general rule behind the video example, keep every concrete number, and keep a short example only where the general rule would be vague. Merge duplicates across videos into one rule. Reason: the owner chose this.
3. **Conflict resolutions.** Each row gives the substance of the rule text, not its wording. A row tagged "video-sourced" has no outside source and lands as a starting value under decision 5.

| # | Topic | Resolution | Evidence |
|---|---|---|---|
| 1 | Moody dark anchor photo | Light or dark comes from the use scene. Cropping and darkening an anchor photo is a technique, not a default | gap 41 |
| 2 | Grain and noise | Banned (craft-floor.md:46 names `feTurbulence` grain inside a ban) | craft-floor.md:46 |
| 3 | Serif plus sans pairing | Allowed, with the existing "name a reason" check | gap 43 |
| 4 | Graph-paper backgrounds | Banned without a real canvas, map, or blueprint | craft-floor.md:47 |
| 5 | Structural 1px frame lines | Allowed when lines sit on real layout columns or section edges, because they are dividers. Decorative two-axis grids stay banned | gap 127, 622, 689; surfaces.md divider rule |
| 6 | Signature motion | One signature motion may recur at meaningful moments. Identical entrances on every section stay banned | gap 58; craft-floor.md:13 |
| 7 | Eyebrow text | Ban stands. The 12px eyebrow rule is rejected | craft-floor.md:27 |
| 8 | Corner radius | 12-16px cards stay the default. A committed world flavor (warm: large, modern: sharp) sets the radius. Small controls sit below the card radius | gap 82, 83, 476; craft-floor.md:45 |
| 9 | Container as grouping signal | Proximity first. Add a container only when proximity fails | layout.md:47 |
| 10 | Icons replacing text | Icon plus text, or icon plus count plus accessible name | I7 |
| 11 | Unlabelled "universal" icons | Rejected. Every navigation icon has a visible text label. Any icon-only control has an accessible name and a tooltip | I7 |
| 12 | Icon styles per zone | Rejected. One icon family, one stroke and terminal style | C14 |
| 13 | Icon-only collapsed sidebar rail | Rejected. The sidebar keeps visible labels | I7 |
| 14 | Font count | One family preferred. A second family needs a role only it can do. Script or display faces never set body text (C11). Video-sourced: a third family only with a fixed job, never four | C11 |
| 15 | Font sizes and ratio | Operate: ratio 1.125-1.2 (operate.md:15; C8 puts dense UI at 1.2, the shared value). 3-4 working sizes. Video-sourced: display text rarely above 24px. Persuade: ratio 1.25-1.333 (C8). A simple page uses about 3 sizes (NN/g via C8); video-sourced: a full landing page starts at no more than 6. Golden ratio is too large for UI | C8, operate.md:15 |
| 16 | Line-height | Starting values to tune: body 1.45-1.6, headings 1.1-1.3, tighter as size grows. Layout survives a user line-height of 1.5. Check diacritic clipping at tight values | C9 |
| 17 | Fluid type | Persuade and Read only: `clamp()` with rem bounds, a max no more than 2-2.5x the min, no vw-only sizes, tested at 200% zoom. Operate stays fixed | C12, operate.md:14 |
| 18 | Semantic hues | Red for error or danger, amber for warning, green for success, blue for info. Never color alone. "Blue means trust" is rejected | C4 |
| 19 | 60-30-10 | A hierarchy guide, not a pie chart: dominant and secondary roles neutral, accent on primary actions and state. Product UI runs more neutral than 60%. No upstream edit | C3 |
| 20 | Text over photos | A bottom gradient scrim. A flat overlay must pass 4.5:1 against the brightest pixel behind the text (C16). Video-sourced, no research support: progressive blur only on top of a scrim that already passes | C16 |
| 21 | Dark glass panels and hover blur | Glass only when the committed world is glass: contrast tested over the worst background, blur below 20px, `prefers-reduced-transparency` honored. Hover-triggered blur reveals stay banned as decorative blur | C17, craft-floor.md:34 |
| 22 | Doodles and scribbles | Banned. craft-floor.md:46 is a ban ("This bans SVG imitating pictures") and survives a pinned brief | craft-floor.md:46 |
| 23 | Micro-charts and progress diagrams | Allowed when they carry real data. Decorative stand-ins stay banned | craft-floor.md:37 |
| 24 | Bounce and springs | A low-bounce spring only on gesture release. Clicks, tooltips, and UI chrome stay at bounce 0 | I13, motion.md:87 |
| 25 | Idle loops and parallax | No scrolljacking anywhere. No parallax on Operate or Read: I14's "content pages" are reading and task pages. On a Persuade landing page, parallax or an idle loop only as the one authored moment, stopped offscreen and off under reduced motion | I14 |
| 26 | Particle bursts | Only for rare, earned milestones, never routine actions | overdrive.md:10 |
| 27 | Card edges and shadow color | One declared elevation per card: a border, or a shadow token whose first layer is the 1px ring (surfaces.md:125). A CSS border plus a separate wide shadow is the ghost card (craft-floor.md:45). Shadow color is tinted toward the surface hue (C7) or transparent black at low alpha as in surfaces.md:130, never opaque and never an opaque gray. Video-sourced: start alpha at 4-10%. Rows 368, L221, L323, 533: covered by this row | C7, surfaces.md:130 |
| 28 | Modal for a short create form | Rejected. Modals are for critical warnings, data loss, or irreversible actions. A create form goes inline or in a non-modal side panel | I9 |
| 29 | Toasts | A toast without an action carries a transient outcome and auto-dismisses in about 4-10s (I8). An error the user must act on stays inline or in a dialog (I8). An undo toast is the one actionable toast: it stays for the whole undo window (5s default, I4), pauses while hovered or focused, and the item stays recoverable after it closes, for example in Trash. Material says actionable snackbars should not auto-dismiss (I8); Gmail's undo does (I4). This rule takes the Gmail behavior plus the recoverable-after-close guard | I4, I8 |
| 30 | Alpha text and borders | Secondary text and input borders use solid tokens that pass 4.5:1 and 3:1 | C1, C2 |
| 31 | Check-mark bullets | SVG check icons from the icon set, not glyphs | craft-floor.md:40 |
| 32 | 100%-opacity offset sticker shadow | Only in a world that is actually neobrutalist | craft-floor.md:36 |
| 33 | Brand-tinted backgrounds | Tint neutrals only when the brand hue adds cohesion. Neutral gray stays valid | colorize.md:44 |
| 34 | HSB color shifts | Build ramps in OKLCH: vary L, keep C and H. HSB steps are rejected | C20 |
| 35 | Nav position | Header nav on Persuade, left nav on Operate | I23 |
| 36 | Dividers between rows | Whitespace first. Video-sourced: dividers or zebra striping when rows are dense (striping is optional per I24) | I24 |
| 37 | Playful 404 copy | A 404 page may be warm, but it names the way back. Error copy elsewhere follows clarify.md:53 | clarify.md:53 |
| 38 | Loading indicators | Skeleton for full-page loads (NN/g via I16) and for content regions, keeping operate.md:34. Spinner for a button or single small module wait (I16). Streamed AI text shows status text, not a fake layout (A9). NN/g limits skeletons to full pages; upstream operate.md:34 uses them for content too, and upstream text stays, so the rule keeps both and records the gap | I16, A9, operate.md:34 |
| 39 | Bold numbers in copy | Allowed inside text. The hero-metric template stays banned | craft-floor.md:26 |
| 40 | Glow made by a blurred duplicate | Banned as a zero-offset halo | craft-floor.md:10 |
| 41 | Ambient shimmer on borders or strokes | Banned as a scattered effect. A loading shimmer on a skeleton is allowed and stops under reduced motion | craft-floor.md:13 |

4. **Pointer lines.** Each upstream file gets at most one new line. No upstream rule text changes, except that our own line at `adapt.md:203` changes its link from `mobile-web.md` to `mobile.md`. The pointers:
   - `craft-floor.md`: a new last line that sends the agent to `details/README.md` for exact patterns and values by surface and topic, before building that surface. This is the route every UI edit takes.
   - `colorize.md` to `color-values.md`.
   - `operate.md` to `product-patterns.md`, `interaction.md`, and `charts.md`, in one line.
   - `onboard.md` to `product-patterns.md`.
   - `layout.md` to `landing.md`.
   - `adapt.native.md` to `macos.md`.
   - `shape.md` to `ai-interface.md`.

   `gestures.md` is linked from our `motion.md`. `animate.md` and `typeset.md` already point at `motion.md` and `typography.md`. Reason: decision 1 and the vendoring rule. `craft-floor.md` is the one file read before every UI edit, so it carries the general route.
5. **Sources are cited in the rule, briefly.** A rule backed by research names its source in parentheses, for example "(NN/g)", "(WCAG 2.5.2)", or "(Datawrapper)". No links, so the files stay stable. A video number with no outside source and no conflict lands as a starting value ("start at 8px, then tune"), never as a hard rule.
6. **Research overrides video numbers.** Tooltip delay about 500ms, not 1000ms. Neighbour tooltips open instantly within about 300ms. Undo window 5s by default. Bottom nav holds 3-5 items. Touch targets are 44pt (Apple) or 48dp (Material), with a 24px CSS minimum (WCAG 2.5.8). Pie charts aim for 4 slices, 5 at most: Datawrapper's academy says four, its blog says five, so the rule states both. Categorical palettes cover about 7 categories. Line charts show 4 lines or fewer. Bar charts start at zero. Long lists use Load More, not infinite scroll. A clickable card puts its link on the title and extends the hit area, rather than wrapping the card in a link (Inclusive Components).
7. **The ledger is the proof of completeness.** Three files in `data/`:
   - `build-ledger` parses the four gap tables and writes `ledger.md` once. It refuses to run when `ledger.md` exists, so hand edits are never overwritten.
   - `ledger.md` has one row per non-covered gap row, `| id | status | rule | outcome | destination | anchor |`. It is the single place outcomes live.
   - `check-ledger` re-parses the gap tables on every run and checks `ledger.md` against them.

   Parsing a gap row: split on `|`. The first cell is the source id. The status is the first later cell that equals one of `COVERED`, `PARTIAL`, `MISSING`, `CONFLICT`, or `OUT-OF-SCOPE`. The rule is the cells between the id and the status, joined with `|`. The note is the last cell. Everything between the status and the note is evidence. This handles the nine rows with `|` inside the evidence cell. A table row that yields no status fails the parse. Header and separator rows are skipped.

   The `id` is `<table>:<src>`, plus `#<k>` when the same source id repeats within one table, with k counting from 1 in table order. `<table>` is the file's line range, for example `140-340`. `<src>` is the source id with any `L` prefix removed and any letter suffix kept.

   `outcome` is one of `pending`, `landed`, `merged`, `rejected`, or `out-of-scope`:
   - `landed`: the rule was written by this plan. `destination` is `path#Heading` relative to `impeccable/reference/`. `anchor` is a phrase copied from the new rule text: at least 3 words, or at least 2 words when one contains a digit ("500ms tooltip delay").
   - `merged`: the substance already sits in an existing rule. `destination` is that rule's `path#Heading`, or `dataviz` for rules the `dataviz` skill already gives. `anchor` is a phrase from the existing rule, with the same length rule.
   - `rejected`: `destination` gives the reason, with a research id, a `file:line`, or a decision 3 row as `D3#n`. `anchor` is blank.
   - `out-of-scope`: `destination` and `anchor` are blank.
   - `pending`: the row is assigned to a file in `destination` but not written yet.

   Every CONFLICT row's destination or reason includes its decision 3 row as `D3#n`.

   `check-ledger` modes, each printing one summary line and exiting 0 only when every check passes:
   - `--assignment` checks four things. The parsed count is 894, the non-covered count is 781, and the ledger id set equals the parsed non-covered id set, with no duplicates and no extras. No `destination` reads `unassigned`. Every CONFLICT row names a `D3#n` that exists in plan.md. Every `pending` row names a destination file from decision 1. It prints `assignment ok: 781 rows, 0 unassigned, 0 conflicts without D3`.
   - `--dest <file>` (repeatable) checks only rows whose destination is in one of the named files. None is `pending`. Every `landed` anchor appears inside the named heading's section, on a line that is new since commit `4280335`: a line in a file that did not exist at `4280335`, or an added line in `git diff 4280335 -- <file>` (working tree included). Every `merged` anchor appears inside the named section, old or new. It prints `dest ok: <n> rows, 0 pending, all anchors found`.
   - No flag runs `--assignment`, then the `--dest` checks across every destination file, then confirms that no row anywhere is `pending`. It prints `ledger ok: parsed 894, ledger 781, 0 pending, all anchors found`.

   A section runs from its heading to the next heading of the same or higher level. Matching is case-insensitive.

## Alternatives considered

Merging rules straight into upstream `colorize.md`, `operate.md`, and the rest reads more smoothly, but every upgrade then becomes a manual merge. The owner rejected it.

A single `details/video-rules.md` would be one file to find, but it mixes load conditions: an agent styling a chart would load sidebar rules. Rejected for sprawl.

A new standalone skill adds context load and splits UI guidance across two skills that fire on the same requests. Rejected.

Pointers from `mode-persuade.md` and `mode-operate.md` were considered. The `concept-seed` binary prints those files as MODE RULES blocks, so an added line may never reach the agent. `craft-floor.md` is read before every edit. Rejected in favour of decision 4.

A separate `mobile-patterns.md` would duplicate `adapt.md` (bottom nav, sheets, swipe) and `mobile-web.md`. Rejected; the rules go into the renamed `mobile.md`.

Putting macOS inside an upstream native file would break the vendoring rule. A sibling `macos.md` mirrors upstream's `ios.md` and `android.md`.

A hand-written ledger keyed by source line was the first draft. The critic showed it cannot prove completeness. Replaced by the generated, id-keyed, anchor-checked ledger in decision 7, which checks id sets, not counts, and accepts only new lines as anchors for `landed` rows.

Fold check: the repo has no plans directory and no other plan, so there was no fold target.

## Invariants, risks and open questions

Invariants: `check.sh` ends with `OK` after every milestone. Against baseline `4280335`, upstream files change only by the pointer lines in decision 4. No new rule contradicts a craft-floor line that is a ban. Every detail file stays at or under 300 lines.

Risks: sprawl, since 781 rows could bloat files past usefulness. Mitigation: decision 2's generalize-and-merge, the 300-line budget, and `merged` outcomes for rows already covered in substance. A second risk is new text that quietly contradicts an upstream rule. Mitigation: every CONFLICT row resolves through decision 3, and the code critic checks each new file against craft-floor bans. A third risk is anchors that are too generic to prove anything, such as "8px". Mitigation: an anchor must be at least 3 words, or a number plus its unit and noun ("500ms tooltip"). The checker enforces that rule. Every edit is plain text in git, so a bad milestone reverts with `git revert`.

Open questions: none. The owner accepted the conflict recommendations and asked for the research check, which is done. Rows where research overrode the owner-accepted recommendation are listed in the Decision Log for the final report.

## Milestones

### Milestone 1 - Ledger tooling

Goal: `data/build-ledger` and `data/check-ledger` exist and work as decision 7 defines, and `data/ledger.md` is generated.

Work: write both scripts in Python 3, standard library only, run with `python3 -I`. `build-ledger` sets each row's default destination from its note column with the mapping table below. It reads only the first path in the note: the text after `dest:` or `Dest` when present, else the first `*.md` name. When that path matches no key, or the row's rule text matches a gesture word (`swipe`, `drag`, `long-press`, `sheet`, `carousel`, `pull-to-refresh`) while the path maps to `motion.md` or `mobile.md`, the destination becomes `details/gestures.md` for gesture matches, and `unassigned` otherwise. OUT-OF-SCOPE rows get outcome `out-of-scope`. All other rows get `pending`.

| First path in note | Destination |
|---|---|
| `interaction.md` | `details/interaction.md` |
| `operate.md`, `product-patterns.md`, `components.md`, `pricing.md`, `onboard.md`, `distill.md`, `clarify.md`, `shape.md`, `document.md` | `details/product-patterns.md` |
| `mode-persuade.md`, `new-work.md`, `layout.md` | `details/landing.md` |
| `colorize.md`, `quieter.md` | `details/color-values.md` |
| `surfaces.md`, `craft-floor.md` | `details/surfaces.md` |
| `typography.md`, `typeset.md` | `details/typography.md` |
| `motion.md`, `animate.md`, `motion-performance.md`, `overdrive.md`, `delight.md` | `details/motion.md` |
| `adapt.md`, `mobile-web.md` | `details/mobile.md` |
| `macos.md` | `details/macos.md` |
| `charts.md` | `details/charts.md` |
| `ai-interface.md` | `details/ai-interface.md` |

Seam: the gap tables are the fixed input. `build-ledger` exits non-zero when the parsed count is not 894 or the non-covered count is not 781.

Proof: from the plan folder, `python3 -I data/build-ledger` prints `parsed 894 rows, 781 non-covered, wrote ledger.md` and exits 0. A second run exits non-zero with `ledger.md exists`.

### Milestone 2 - Ledger assignment

Goal: every row has a destination file or a final outcome, and every CONFLICT row is resolved.

Work: assign each `unassigned` row to a decision 1 file by hand. Set each CONFLICT row to its decision 3 outcome: `rejected` with `D3#n` for a rejection, or `pending` with a destination file plus `D3#n` for a rule that lands. A milestone may later re-route a row to a better file; the final check still applies.

Seam: `check-ledger --assignment`.

Proof: from the plan folder, `python3 -I data/check-ledger --assignment` prints `assignment ok: 781 rows, 0 unassigned, 0 conflicts without D3` and exits 0.

### Milestone 3 - Color and surface values

Goal: an agent styling any surface finds exact color, surface, shadow, padding, and icon-size values.

Work: write `details/color-values.md`. Extend `details/surfaces.md`. Add the `colorize.md` pointer, the `craft-floor.md` pointer, and the README rows. Set each row this covers to `landed`, `merged`, or `rejected`.

Seam: the ledger and `check-ledger`.

Proof: from the plan folder, `python3 -I data/check-ledger --dest details/color-values.md --dest details/surfaces.md` prints `dest ok: <n> rows, 0 pending, all anchors found` and exits 0.

### Milestone 4 - Interaction, gestures, and motion

Goal: an agent wiring clicks, menus, tooltips, deletes, saves, and gestures finds the timing and commit rules.

Work: write `details/interaction.md` and `details/gestures.md`. Extend `details/motion.md` with the micro-interaction recipes and a link to `gestures.md`. Add the README rows. Update the ledger.

Seam and proof: as in Milestone 3, with `--dest details/interaction.md --dest details/gestures.md --dest details/motion.md`.

### Milestone 5 - Product patterns, charts, and typography

Goal: an agent building app UI or a dashboard finds the sidebar, list, table, card, form, search, empty-state, pricing, chart, and type rules.

Work: load `dataviz` with the Skill tool, then write `details/charts.md` scoped to what `dataviz` does not already give. Rows `dataviz` already covers become `merged` with destination `dataviz`, which the checker accepts without an anchor search. Write `details/product-patterns.md`. Extend `details/typography.md`. Add the `operate.md` and `onboard.md` pointers and the README rows. Update the ledger.

Seam and proof: as in Milestone 3, with `--dest details/product-patterns.md --dest details/charts.md --dest details/typography.md`.

### Milestone 6 - Landing, mobile, macOS, and AI-interface patterns

Goal: Persuade pages, phone apps, macOS apps, and AI products each have their rules.

Work: write `details/landing.md`, `details/macos.md`, and `details/ai-interface.md`. Rename `details/mobile-web.md` to `details/mobile.md` with `git mv`, add the phone app patterns, and widen its scope. Update every link to the old name in `adapt.md:203`, `details/README.md`, and `VENDORED.md`. Add the `layout.md`, `adapt.native.md`, and `shape.md` pointers and the README rows. Update the ledger.

Seam and proof: as in Milestone 3, with the four files. In addition, `grep -rn 'mobile-web' ../../../impeccable ../../../VENDORED.md` (from the plan folder) prints nothing.

### Milestone 7 - Provenance and final checks

Goal: the whole set is recorded and verified.

Work: update the `VENDORED.md` impeccable row: list the new files, the rename, and the new pointer lines. Write `data/banned-allowlist.txt`, one line per expected hit of the banned-pattern grep in the DoD, in `file:text` form. Every listed hit is a line that states a ban, a rejection, or a limit. Run every DoD check.

Proof: the DoD below.

## Surprises & Discoveries

- Observation: research contradicted three owner-accepted recommendations (unlabelled universal icons, the icon-only rail, the modal create form) and qualified a fourth (60-30-10).
  Evidence: I7 "a text label must be present alongside an icon"; I9 "modal dialogs become problematic when used for noncritical activities"; C3 NN/g "Use the 60-30-10 rule."
- Observation: the gap tables use three source-id forms (`41`, `L142`, `594a`), and one source line can hold several rows.
  Evidence: critic round 1. `gap-140-340.md` has 227 `L` rows, 206 of them non-covered. `gap-576-818.md` has 154 non-covered lettered rows. Nine rows carry `|` inside the evidence cell.
- Observation: NN/g limits skeleton screens to full-page loads, and upstream operate.md:34 uses them for content regions.
  Evidence: I16 "used exclusively for full-page loads"; operate.md:34 "Skeleton states for loading, not spinners in the middle of content."
- Observation: the mode files are printed by the `concept-seed` binary.
  Evidence: `mode-persuade.md:3` "`impeccable concept-seed --mode persuade` ... prints the two sections below as its MODE RULES block".

## Decision Log

- Decision: critic round 2 findings fixed without a third round. Finding 1 (BLOCKER) fixed by scoping `pending` per `--dest` and defining every checker mode. Findings 2-4 fixed by id-set equality, new-line anchors for `landed`, and a build-once ledger. Finding 5 fixed by rows 39-41 plus the D3 requirement on every CONFLICT row. Findings 6-8 fixed in rows 27, 38, and 29. Finding 9 fixed by the single-home rule and gesture routing. Findings 10-11 fixed by the allowlist and provenance loop in the DoD. Minors 12-23 fixed in place, including the split of Milestone 1.
  Rationale: the critic gate caps at two rounds. The fixes are mechanical and the code critic reviews each milestone.
  Date/Author: 2026-10-30, agent.

- Decision: research wins over the earlier recommendation on rows 11, 13, 19, and 28.
  Rationale: the owner asked for each change to be checked against the internet first.
  Date/Author: 2026-10-30, agent.
- Decision: upgrade to upstream 4.8.0 before adding rules, as its own commit.
  Rationale: the owner asked to compare with the newest version, and the additions should sit on the current base.
  Date/Author: 2026-10-30, agent.
- Decision: round 1 findings 1-3, 15, and 16 are fixed by the generated, id-keyed, anchor-checked ledger and the mapping table (decision 7, Milestone 1).
  Rationale: a hand-written, line-keyed ledger cannot prove completeness.
  Date/Author: 2026-10-30, agent.
- Decision: round 1 findings 4-10 are fixed in decision 3 (rows 2, 13, 15, 20, 21, 22, 23, 27, and 30-37 split out).
  Rationale: each now matches its cited source, or is tagged video-sourced.
  Date/Author: 2026-10-30, agent.
- Decision: round 1 findings 18, 22, and 23 (routing) are fixed by the `craft-floor.md` pointer to the README index (decision 4).
  Rationale: mode files are binary-printed, and craft-floor is read before every UI edit.
  Date/Author: 2026-10-30, agent.
- Decision: round 1 finding 19 is fixed by dropping `mobile-patterns.md` and renaming `mobile-web.md` to `mobile.md`. Finding 24 is fixed by the 300-line budget and the new `gestures.md`. Finding 21 is fixed by loading `dataviz` before `charts.md` (Milestone 4). Finding 14 is fixed by landing the `operate.md` pointer in Milestone 4.
  Rationale: removes duplication and keeps each milestone independently landable.
  Date/Author: 2026-10-30, agent.
- Decision: round 1 finding 20 (fold `macos.md` into a native file) is dismissed.
  Rationale: the only native files are upstream files, which take pointer lines only. A sibling `macos.md` mirrors upstream's per-platform `ios.md` and `android.md`.
  Date/Author: 2026-10-30, agent.
- Decision: round 1 finding 17's `install.sh` point is accepted. The DoD drops `install.sh`, because no skill is added, renamed, or removed.
  Rationale: the repo rule ties `install.sh` to skill-set changes only.
  Date/Author: 2026-10-30, agent.

## Outcomes & Retrospective

Filled at completion.

## Definition of done

Run every command from the repo root.

- [ ] Ledger complete: `(cd .agents/plans/2026-10-30-impeccable-uiux-rules && python3 -I data/check-ledger)` prints `ledger ok: parsed 894, ledger 781, 0 pending, all anchors found` and exits 0.
- [ ] Repo checks pass: `./check.sh | tail -1` prints `OK`.
- [ ] Upstream text untouched: `git diff 4280335 -- impeccable ':(exclude)impeccable/reference/details' | grep -cE '^-[^-]'` prints `1`, and that one removed line is the old `adapt.md` pointer to `mobile-web.md`.
- [ ] At most one new line per upstream file: `git diff --numstat 4280335 -- impeccable ':(exclude)impeccable/reference/details'` lists exactly these eight files, each with an added count of `1`: `adapt.md`, `adapt.native.md`, `colorize.md`, `craft-floor.md`, `layout.md`, `onboard.md`, `operate.md`, and `shape.md`.
- [ ] Pointers resolve: `for pair in craft-floor.md:README.md colorize.md:color-values.md operate.md:product-patterns.md operate.md:interaction.md operate.md:charts.md onboard.md:product-patterns.md layout.md:landing.md adapt.native.md:macos.md shape.md:ai-interface.md adapt.md:mobile.md; do f=${pair%%:*}; t=${pair##*:}; test -f impeccable/reference/details/$t && test "$(grep -c "details/$t" impeccable/reference/$f)" = 1 || echo "FAIL $pair"; done; grep -c '](gestures.md)' impeccable/reference/details/motion.md` prints no `FAIL` line, and its last line is `1`.
- [ ] Every new or renamed file is indexed: `for f in interaction gestures color-values product-patterns charts landing macos ai-interface mobile; do test "$(grep -c "]($f.md)" impeccable/reference/details/README.md)" = 1 || echo "FAIL $f"; done` prints nothing.
- [ ] Size budget: `wc -l impeccable/reference/details/*.md | awk '$2 != "total" && $1 > 300'` prints nothing.
- [ ] No rejected pattern is recommended: `diff <(grep -rniP 'eyebrow|icon-only (rail|sidebar)|universal icon|golden ratio|60-30-10|feTurbulence|doodle|scribble' impeccable/reference/details | sed -E 's/^([^:]+):[0-9]+:/\1:/' | sort) <(sort .agents/plans/2026-10-30-impeccable-uiux-rules/data/banned-allowlist.txt)` prints nothing, and every allowlist line states a ban, a rejection, or a limit.
- [ ] Provenance updated: `for f in interaction gestures color-values product-patterns charts landing macos ai-interface mobile adapt.native.md colorize.md craft-floor.md layout.md onboard.md operate.md shape.md; do grep -q "$f" VENDORED.md || echo "FAIL $f"; done; grep -c 'mobile-web' VENDORED.md` prints no `FAIL` line, and its last line is `0`.

Revision notes: 2026-10-30 first draft. 2026-10-30 revision 2: fixed critic round 1 (ledger redesign, conflict rows corrected and split, routing via craft-floor, mobile file dropped, gestures file added, size budget, binary DoD with a repo baseline). 2026-10-30 revision 3: fixed critic round 2 (checker modes, id-set equality, new-line anchors, build-once ledger, rows 39-41, rows 15/25/27/29/38 corrected, gesture single home, Milestone 1 split, binary DoD with allowlist and provenance loop).
