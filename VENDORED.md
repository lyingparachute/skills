# Provenance

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
| `pr` | Taken 2026-10-05. Voice moved to `no-ai-slop`. A repo PR template wins over ours. Mermaid only on GitHub and GitLab, since Bitbucket renders it as code. Evidence accepts runs from the session or output in the plan, ticket, or PR, and covers changes with nothing to run. One-way door widened to contracts others depend on. State-diff and code-block samples trimmed. `CREDITS.md` carries the `show-me` attribution. |
| `retro` | Taken 2026-10-05. Points at `writing-great-skills` by file (user-invoked), names harness log paths, reads the log in a subagent, sends judgement calls to `CODING_STANDARDS.md` or `judo-review/STANDARDS.md`, and merges steering and no-op checks into one category. |
| `writing-great-skills` | His `writing-for-agents`, renamed and reworked, with our `GLOSSARY.md`. |
| `judo-review` | His `code-review`, renamed, then rewritten: two axes, `STANDARDS.md`, severity and disposition tags. |
| `flow` | His `ask-matt`, renamed and rebuilt around our chains. |
| `exec-plan` | Ours, replacing his `to-spec` and `to-tickets`. Its rules and `TEMPLATE.md` absorb what was kept from OpenAI's ExecPlan spec (`PLANS.md`, removed). |

Selected skills deliberately not taken: `prototype`, `triage`, `teach`, `to-questionnaire`, `loop-me`, `implement-spec` (`orchestrate` covers it), `chief-of-staff`, the `writing-*` trio, and his setup skills. This list is not exhaustive.

## Third-party skills

Vendored whole. Upstream is what I could not verify from the files, so fill it in when you next touch one.

| Skill | Version declared | Upstream |
|---|---|---|
| `impeccable` | 3.9.1 | unknown |
| `nlm-skill` | 0.5.5 | unknown, wraps <https://github.com/jacob-bd/notebooklm-cli> |
| `sentry-cli` | 0.31.0 | unknown |
| `graphify` | see `.graphify_version` | unknown |
| `stripe-best-practices` | none | unknown |
| `stripe-projects` | none | unknown |

## Ideas borrowed without the file

Compared Cursor's `pstack` (<https://github.com/cursor/plugins>, `pstack/skills`) on 2026-08-21 at commit `46125561306434d8a1d7745d540d8932ab0cd2a2`.

We borrowed the slop-tell catalogue for `no-ai-slop`.
The Fowler smell baseline and comment rules informed `judo-review/STANDARDS.md`.
The decision-trail discipline informed `orchestrate`. No skill was copied.
