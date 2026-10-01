---
name: plan-feature
description: Use only when the user says the model should decide a whole feature end to end ("plan feature X, you decide"), or when improve-codebase hands off a confirmed pick.
---

# Plan Feature

First, the **consent gate**. Consent comes from the user's own words saying the model decides, from typing `/plan-feature`, or from a handoff the user confirmed in `improve-codebase`. Without one of these, ask one question: "Should I plan this whole feature and decide product behavior and scope myself?" Start only on a yes.

Consent means the model will **decide everything**: product behavior, UX, public API shape, data model, scope, and plan split. For this run it replaces the rule to ask about choices that are the user's. What stays mandatory: every choice is recorded with its options and reasons. Scope beyond the user's words is itself a recorded decision.

Facts only the user knows, like budget, deadlines, business rules, and customer commitments, become **assumptions** with ids (`A1`, `A2`, …). Pick the most likely value, record it, and keep going.

Input: the feature, in the user's words; or a **handoff** from `improve-codebase`, which carries its findings, its sweep report, and the plans dir; or an existing feature folder plus the user's answers (see Update run).

## The feature folder

Everything lives in `<plans-dir>/<YYYY-MM-DD>-<feature>/`. `README.md` there is the **single source** for the design, written as each step completes, and handed to subagents by path. It holds these sections:

- **Capabilities, stories, and walkthroughs**: story ids (`S1`, …), each story's step-by-step walkthrough, and a story-to-plan table.
- **Decisions**: one row per decision (`D1`, …) with the choice, the options with one line on why each lost, prior art where required, what would change it (naming assumption ids), and the plans that carry it.
- **Roadmap fit**: each related plan, its relation, and what was done about it.
- **Prep candidates**: each prep sweep finding copied with every field, with the decision that took it or turned it down.
- **New terms and ADR candidates**: domain terms and decisions that pass the ADR test in `domain-modeling`. The plans that introduce them write them to the project's glossary and ADR home, as `domain-modeling` defines.
- **Build order**: plans by title, each with the plans it needs.
- **Questions for you**: every assumption with its chosen value and the decisions it drives, every open question, and every critic finding left open.

Plans are referenced by title, never by path. Write the README and the decision page with `no-ai-slop` loaded. The run commits nothing.

## Steps

### 1. Ground

Create the folder. Dispatch read-only subagents in parallel:
- **Code map**: the `zoom-out` skill, plus the rule files, and the `CONTEXT.md` and ADRs that govern the touched parts.
- **Roadmap**: one subagent per 20 plans in the plans dir, including plans in other feature folders. Plans marked `landed`, abandoned, or superseded count as `unrelated`. Each plan returns one line with its relation: `conflicts` (both cannot hold), `needs` (this feature needs it first), `needed-by` (it needs this feature first), `overlaps` (same code or capability), or `unrelated`.

**Early exit**, at this step or after any critic round: when the feature is already covered by a plan, or should wait or not be built, record that as a decision, write the README and the decision page, and end the run.

Then get the **prep candidates**, once per feature folder. In a handoff, the handed-off findings are the feature itself, and the candidates are the report's other kept findings in the feature's path. A run that began from a handoff never starts a prep sweep. Otherwise, when the code map found existing modules in the feature's path, run the **prep sweep**: the `improve-codebase` skill on those modules, with the code map as its map and friction the code map found as suspects. It costs dozens of subagents. A feature with no existing modules in its path has no candidates. Copy every kept finding into Prep candidates. Later reworks and Update runs reuse these candidates.

Done when every existing plan has a relation line, the code map lists the modules and ADRs in the feature's path, and Prep candidates holds every candidate or says why there are none.

### 2. Stories and walkthroughs

List the capabilities first. Then write one story per capability as `As an <actor>, I want <capability>, so that <benefit>`, and a walkthrough per story from the user's side: every step, what the user sees, and at each step the errors, empty states, and first-use states. A feature with a UI runs the `impeccable` skill in critique mode over its walkthroughs.

Done when every capability has a story, and every walkthrough step lists its error and empty states or says it has none.

### 3. Decide

Sweep for decisions twice: along every walkthrough step, and across the areas data model, public API, errors, security, migration and rollout, observability, test seams, and UI. Every step and every area ends with its decisions or a "none needed" line.

For each decision, fill its row. Prior art, meaning a production open-source project, a standard, or a known pattern with a link, is required for decisions that are hard to reverse or shared across plans.

For the interface of each new module that other plans use or that is hard to reverse, run design-it-twice from the `codebase-design` skill once, with 3 agents, and skip its presentation steps. The comparison and recommendation become that decision's options and choice.

Each prep candidate gets a decision: take it if it makes a walkthrough step or a chosen interface easier to build. A taken one becomes a prep plan, placed before the plans it eases in Build order.

Every roadmap relation other than `unrelated` gets a decision or a build-order line. A `conflicts` plan gets a decision: change this design, or record what the other plan must change in Roadmap fit. A decision that goes against an ADR says why the ADR should reopen.

Done when every walkthrough step and every area has its line, every row is complete except the plan column, every related plan has its decision or build-order line, and every prep candidate has its decision.

### 4. Attack the design

Dispatch a fresh design critic with the README path. Its brief: verify claims against the code, and find missing decisions, weak option sets, hidden assumptions, scope creep, premature abstraction, roadmap relations that changed once the data model and API were chosen, and ADR conflicts. It returns typed findings with severity.

Triage the findings yourself with the `receiving-code-review` skill. In every triage of this run, each point where that skill asks, stops, or offers another skill becomes an entry in Questions for you, and a finding that needs its own plan becomes a Build order entry. Rework steps 1-3 for what they touch, re-mapping any new module and re-checking any new plan relation. A round with open BLOCKER or MAJOR findings gets a second, fresh critic. Stop after two rounds; leftovers go to Questions for you.

Done when a round ends with zero open BLOCKER or MAJOR findings, or after the second round.

### 5. Write the plans

One plan is one outcome that can land on its own. Its milestones are the slices inside it. Each plan is `<feature-folder>/<topic>.md` with its title as the H1. For each plan, a writer subagent drafts it from the README with the `exec-plan` skill's plan shape; the writer drafts only, and you run the gate. The plan copies its own stories and walkthroughs verbatim, and its decisions into Locked decisions, so the implementer needs only that file. A plan that needs another plan's work embeds the contract it relies on, marked as existing after that plan lands. It lists the assumption ids it rests on under risks, and has a milestone for any glossary or ADR writes it carries. A prep plan has no story; it copies its finding from Prep candidates in full instead.

Run the `exec-plan` critic gate on each draft, with critics that did not write it. Tell them embedded contracts from earlier plans are expected. Triage the findings with `receiving-code-review`, and dispatch a fresh writer to fix the ones that survive.

Then check the set: every Locked decision matches its README row, every decision names the plan that carries it or the other plan's change in Roadmap fit, shared contracts agree across plans, and the build order has no cycle. Update the README where a gate changed a decision.

A plan with critic findings left open after the gate stays `Status: draft`, and those findings go to Questions for you. A plan that rests on an unconfirmed assumption names it on its Status line.

Done when every story maps to a plan in the story-to-plan table, every taken prep candidate has its prep plan, every plan went through the gate, and the set check is clean.

### 6. Decision page

Render every README section as one self-contained HTML page for a person: one card per decision, the stories with their walkthroughs, the build order as an inline SVG or HTML diagram, and Questions for you at the end. Inline CSS with a `prefers-color-scheme` block, and no external requests. Write it to `${TMPDIR:-/tmp}/plan-feature-<feature>-<YYYYMMDD-HHMM>.html` and open it (`open` on macOS, `xdg-open` on Linux, `start ""` in a Windows shell).

Done when the page shows the same decision ids, assumption ids, stories, roadmap rows, prep candidates, and questions as the README. Show the user the page path, the README path, and the question count. Then name `implement` or `orchestrate` as the next command, after the user confirms the assumptions the first plan rests on.

## Update run

Invoked on an existing feature folder with the user's answers: record each answer against its assumption or question, find the decisions they drive, and re-run from the earliest step an answer touches, for those decisions and the plans that carry them. Plans already landed stay as they are. The later steps run again over what changed.
