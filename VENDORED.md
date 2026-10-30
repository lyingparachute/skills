# Provenance

`domain-modeling/scripts/check-adr-format` is vendored by stacjo at `scripts/vendor/check-adr-format`, with a SHA-256 pin maintained by that consumer.

Not everything here was written here. Without this file, "what changed upstream since I took this?" is an investigation. With it, it is a diff.

**Rule:** a skill copied or adapted from someone else gets a row before it lands. A row with an unknown upstream is fine. A skill with no row is not.

## Adapted from mattpocock/skills

Upstream: <https://github.com/mattpocock/skills>. Last compared: 2026-10-05, against commit `4588b32` (v1.3.1 plus docs).

These started as his and have since diverged, some heavily. Diff against that commit before pulling anything new.

| Skill | Notes on the divergence |
|---|---|
| `codebase-design` | Pruned: dropped duplicated seam rules, the Relationships recap, and generic testability samples. `DEEPENING.md` and `DESIGN-IT-TWICE.md` close to upstream. |
| `diagnosing-bugs` | Plus Phase 0, redaction. |
| `domain-modeling` | Diverged: durable-doc contest, tighter ADR and GLOSSARY rules, ADR examples cut to three. |
| `grilling` | Round format taken from upstream. Silence-adopts-the-recommendation rule is ours. |
| `grill-with-docs` | Same composition as upstream. |
| `handoff` | Close to upstream. |
| `implement` | Ours drives `judo-review` and `plan-retire`. |
| `plan-retire` | Ours; his repo has no equivalent. Built on his ADR test. |
| `research` | Close to upstream. |
| `tdd` | Close to upstream, plus `tests.md` and `mocking.md`. |
| `wait-what` | Taken 2026-08-21. |
| `pr` | Taken 2026-10-05. Voice moved to `no-ai-slop`. A repo PR template wins over ours. Sections are Why, What changed (one paragraph, plus a Before/After table when cases differ), and Risk, for a cold reader, with word caps in Done. Evidence section dropped. Door and blast radius replaced by Risk bullets: each says what goes wrong, who notices, and what they see, and only adds a consequence the table does not show. A revert bullet appears only when a revert leaves damage behind. The show-me visual menu (pseudocode, call trees, component trees, file trees, Mermaid, diffs) and `CREDITS.md` were removed. That menu came from [Dex Horthy](https://github.com/dexhorthy)'s [`show-me`](https://github.com/humanlayer/skills/blob/main/plugins/show-me/skills/show-me/SKILL.md) via Matt Pocock. Worked example kept. |
| `retro` | Taken 2026-10-05. Points at `writing-great-skills` by file (user-invoked), names harness log paths, reads the log in a subagent, sends judgement calls to `CODING_STANDARDS.md` or `judo-review/STANDARDS.md`, and merges steering and no-op checks into one category. |
| `writing-great-skills` | His `writing-for-agents`, renamed and reworked, with our `GLOSSARY.md`. |
| `judo-review` | His `code-review`, renamed, then rewritten: two axes, `STANDARDS.md`, severity and disposition tags. |
| `flow` | His `ask-matt`, renamed and rebuilt around our chains. |
| `exec-plan` | Ours, replacing his `to-spec` and `to-tickets`. Its rules and `TEMPLATE.md` absorb what was kept from OpenAI's ExecPlan spec (`PLANS.md`, removed). |

Selected skills deliberately not taken: `prototype`, `triage`, `teach`, `to-questionnaire`, `loop-me`, `implement-spec` (`implement` covers it), `chief-of-staff`, the `writing-*` trio, and his setup skills. This list is not exhaustive.

## Third-party skills

Vendored whole. Upstream is what I could not verify from the files, so fill it in when you next touch one.

Every `description` below was rewritten to say when to use the skill, not what it does. An upgrade keeps our description.

| Skill | Version declared | Upstream |
|---|---|---|
| `impeccable` | 4.8.0 | <https://github.com/pbakaus/impeccable>, Apache-2.0. The `.agents/skills/impeccable` build at tag `skill-v4.8.0` (commit `414603b`), taken 2026-10-30. Our files, kept whole on upgrade: `reference/details/` (UI/UX rules from the owner's video notes, checked against web research; `details/sources.md` holds the sources and each deliberate override), `reference/web-interface-guidelines.md`, and the `scripts/local-delta*` tooling. Our edits to upstream files (pointer lines and the SKILL.md description) live in `scripts/local-delta.patch`, and `scripts/local-delta.base` records a hash of every upstream file in the pinned build. To upgrade: check out the new upstream tag and run `impeccable/scripts/local-delta apply <checkout>/.agents/skills/impeccable`. It refuses to start when the tree holds an edit the patch does not capture. It builds the new tree in a staging folder and swaps it in only when the build succeeds. When upstream changed lines next to our edits, it leaves `<<<<<<<` markers: resolve them, then run `local-delta refresh` on the same path. When upstream removed or renamed a file we edit, it stops with nothing changed: undo that edit, run `local-delta refresh` against the old upstream checkout, run `apply` again, re-add the edit in its new home, and refresh against the new checkout. Then run `./check.sh` and update this row. `./check.sh` runs `local-delta check`, which fails on an edit the patch does not capture, a lost edit, a broken reference link, or a details file missing from `details/README.md`. `web-interface-guidelines.md` fetches <https://github.com/vercel-labs/web-interface-guidelines> `main` at run time, on purpose, to stay current. |
| `nlm-skill` | 0.5.5 | unknown, wraps <https://github.com/jacob-bd/notebooklm-cli> |
| `sentry-cli` | 0.31.0 | unknown |
| `graphify` | see `.graphify_version` | unknown |
| `stripe-best-practices` | none | unknown |
| `stripe-projects` | none | unknown |
| `security-audit` | none | <https://github.com/cloudflare/security-audit-skill>, MIT (`LICENSE` copied in). `skills/security-audit` at commit `c1c8a8c`, taken 2026-10-24. Everything but `SKILL.md` is upstream as-is. Our `SKILL.md` changes, which an upgrade must carry over: user-invoked with a human-facing description; pre-merge PR and uncommitted-change review routed to `judo-review` (a diff between refs stays an audit scope); delegated agents use the default model and are leaves; a delegated-prompt block appended to every prompt (launch no agents, which overrides the agent split in `ATTACK-CLASSES.md`; redact secrets and personal data, covering `observed_result`); a Redact evidence principle pointing at that block; the user accepts the full-audit profile, scope, and agent budget before any agent launches, and again when the wave-1 estimate exceeds it; `no-ai-slop` loaded before Phase 6 prose; confirmed findings handed to `exec-plan`. |

## Folded into impeccable from emilkowalski/skills

Upstream: <https://github.com/emilkowalski/skills>, MIT, Copyright (c) 2026 Emil Kowalski. Compared 2026-10-23 at commit `2d22863`.

Rewritten, not copied whole, into `impeccable/reference/details/`:

| Upstream skill | Lands in | Notes |
|---|---|---|
| `emil-design-eng`, `animate` (+ `RECIPES.md`), `review-animations` (+ `STANDARDS.md`) | `motion.md` | One gate, easing, duration, physical rules, recipes, and review table. Merged with our earlier `details/animations.md`. Exits use ease-out per Emil, not ease-in. The 0.25 icon-swap scale stays as a scoped exception. Stagger is Emil's 30-80ms per item, replacing the old 100ms between content groups. Review keeps the fix order and Block/Approve decision. |
| `animation-performance` | `motion-performance.md` | Merged with our earlier `details/performance.md`. |
| `break-ui` (+ `CATALOG.md`) | `worst-case.md`, `worst-case-catalog.md` | Catalog kept close to upstream. |
| `mobile-native` | `mobile.md` | Only what `adapt.md` lacks; safe areas and touch targets stay in `adapt.md`. The phone app patterns in the same file come from the UI/UX video notes. |

Deliberately not taken: `prototype` (impeccable `generate` covers it), `apple-design`, `find-animation-opportunities`, `improve-animations`, `animation-vocabulary`, `pick-ui-library`, `ask-sonner`, `animate-expo`, `write-swift`.

## Ideas borrowed without the file

Compared Cursor's `pstack` (<https://github.com/cursor/plugins>, `pstack/skills`) on 2026-08-21 at commit `46125561306434d8a1d7745d540d8932ab0cd2a2`.

We borrowed the slop-tell catalogue for `no-ai-slop`.
The Fowler smell baseline and comment rules informed `judo-review/STANDARDS.md`.
