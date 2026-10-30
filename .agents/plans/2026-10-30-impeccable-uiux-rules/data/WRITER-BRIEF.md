# Writer brief

You write one slice of new reference text for the vendored `impeccable` design skill at `/Users/igby/Work/personal/skills/impeccable/`. You are a leaf agent: launch no agents. Do not run any git command that writes (no add, commit, mv, checkout, stash). Edit only the files your task names.

## Read first

1. `.agents/plans/2026-10-30-impeccable-uiux-rules/plan.md`: Locked decisions 1-7. Decision 3 is the conflict table (rows `D3#n`). Decision 5 says how to cite. Decision 6 lists research numbers that override video numbers.
2. Call the Skill tool with `writing-great-skills`, then with `no-ai-slop`. Both bind every line you write.
3. `impeccable/SKILL.md`, `impeccable/reference/craft-floor.md`, and `impeccable/reference/details/README.md`. Then read two of our existing detail files for tone and format: `details/surfaces.md` and `details/motion.md`.
4. Your ledger rows: `grep -F '| details/<your-file>' data/ledger.md` from the plan folder. Each row has an id, status, short rule, and destination. The full row, with its evidence and notes, is in `data/gap-<table>.md`: the id prefix names the table, and the part after `:` is the source line (look it up with an `L` prefix in `gap-140-340.md`). The original wording is in `data/source.md` at that line number. Read the source line for every row you own. The paraphrase can drop numbers.
5. Research verdicts: `data/research-color-type-surface.md` (C ids), `data/research-interaction-nav-motion.md` (I ids), and `data/research-charts-ai.md` (D and A ids).

## How to write

- Generalize: write the general rule behind the video example. Keep every concrete number. Keep a short example only where the general rule would be vague. Merge duplicate rows into one rule.
- Before writing a rule, grep `impeccable/` for it. If an existing line already says the same thing, do not repeat it: mark the row `merged` and point at that line's heading. Our own detail files (`details/*.md`) may be extended; upstream files (everything else) must not be edited.
- Cite a researched rule briefly in parentheses: (NN/g), (WCAG 2.5.8), (Apple HIG), (Material), (Carbon), (Datawrapper), (shapeof.ai). No links. A video number with no outside source and no conflict is a starting value ("start at 32px, then tune"), never a hard rule.
- Where research disagrees with the video, research wins (decision 6). Where a row is CONFLICT, follow its `D3#n` row exactly.
- Mode matters. Say when a rule is for Persuade (landing, marketing), Operate (app UI), Read, or all surfaces.
- Positive phrasing first: state the target behavior. Keep a prohibition only as a hard guardrail, paired with what to do instead.
- Plain English a non-native reader gets in one pass. Short sentences. No em dashes (use `-`). No filler, no hedging, no praise. Rules as terse bullets or short paragraphs under clear `##`/`###` headings. Tables are fine for values.
- No product-specific stories ("Spotify Wrapped", "TikTok"). The rule stands alone.
- Nothing may contradict a craft-floor line that says it is a ban (eyebrows, `feTurbulence` grain, sketch-style SVG pictures, decorative glass and blur, hard offset shadows outside neobrutalism, gradient text, side stripes).
- Each file you own stays at or under 300 lines in total, existing lines included. Count with `wc -l`.
- A new file starts with a `# Title` and one sentence saying what it holds and when to load it, matching the style of `details/surfaces.md`. No front matter.

## Ledger outcomes

Write one line per row you own to `data/updates/<your-slice>.tsv` (tab-separated, no header):

`<id>\t<outcome>\t<destination>\t<anchor>`

- `landed`: you wrote the rule. Destination `details/<file>.md#<Heading text exactly as written, without the #s>`. Anchor: a phrase copied exactly from the line you wrote that holds this rule, at least 3 words, or 2 words when one contains a digit. Pick a phrase specific to this rule, not a phrase shared by every rule in the section.
- `merged`: an existing line already holds the rule. Destination is that file and heading (`colorize.md#Heading` or `details/x.md#Heading`, relative to `impeccable/reference/`). Anchor copied from that existing line. For rules the `dataviz` skill already gives, destination is `dataviz` and the anchor is blank.
- `rejected`: destination is the reason with a research id or `file:line`. Anchor blank. Use this only when research or a craft-floor ban contradicts the rule, or the rule is not actionable in code.
- If the row's current destination ends with ` D3#n`, keep that suffix at the end of your destination, after the heading.
- You may re-route a row to another file only if it clearly belongs there. Then report it in your final message instead of writing it, so the owner of that file can take it.

Every row you own appears exactly once in your `.tsv`. Before finishing, check each `landed` anchor with `grep -F` against your file.

## Finish

Final message: files written, line counts, rows by outcome, re-routed rows with reasons, and any rule you could not place.
