# Provenance

Not everything here was written here. Without this file, "what changed upstream since I took this?" is an investigation. With it, it is a diff.

**Rule:** a skill copied or adapted from someone else gets a row before it lands. A row with an unknown upstream is fine. A skill with no row is not.

## Adapted from mattpocock/skills

Upstream: <https://github.com/mattpocock/skills>. Last compared: 2026-08-21, against commit `5b15a47`.

These started as his and have since diverged, some heavily. Diff against that commit before pulling anything new.

| Skill | Notes on the divergence |
|---|---|
| `codebase-design` | Close to upstream, including `DEEPENING.md` and `DESIGN-IT-TWICE.md`. |
| `diagnosing-bugs` | Plus Phase 0, redaction. |
| `domain-modeling` | Close to upstream. |
| `grilling` | Round format taken from upstream. Silence-adopts-the-recommendation rule is ours. |
| `grill-with-docs` | Same composition as upstream. |
| `handoff` | Close to upstream. |
| `implement` | Ours drives `judo-review` and `plan-retire`. |
| `improve-codebase-architecture` | Adapted from upstream, then rebuilt around our `codebase-design` and grilling workflow. |
| `plan-retire` | Ours; his repo has no equivalent. Built on his ADR test. |
| `research` | Close to upstream. |
| `tdd` | Close to upstream, plus `tests.md` and `mocking.md`. |
| `wayfinder` | Close to upstream. |
| `wait-what` | Taken 2026-08-21. |
| `writing-great-skills` | His `writing-for-agents`, renamed and reworked, with our `GLOSSARY.md`. |
| `judo-review` | His `code-review`, renamed, then rewritten: two axes, `STANDARDS.md`, severity and disposition tags. |
| `flow` | His `ask-matt`, renamed and rebuilt around our chains. |
| `exec-plan` | Ours, replacing his `to-spec` and `to-tickets`. `PLANS.md` is OpenAI's ExecPlan spec. |

Selected skills deliberately not taken: `prototype`, `triage`, `teach`, `to-questionnaire`, `loop-me`, `implement-spec`, the `writing-*` trio, and his setup skills. This list is not exhaustive.

## Third-party skills

Vendored whole. Upstream is what I could not verify from the files, so fill it in when you next touch one.

| Skill | Version declared | Upstream |
|---|---|---|
| `impeccable` | 3.9.1 | unknown |
| `nlm-skill` | 0.5.5 | unknown, wraps <https://github.com/jacob-bd/notebooklm-cli> |
| `sentry-cli` | 0.31.0 | unknown |
| `graphify` | see `.graphify_version` | unknown |
| `shadcn-ui` | none | unknown |
| `stripe-best-practices` | none | unknown |
| `stripe-projects` | none | unknown |

## Ideas borrowed without the file

Compared Cursor's `pstack` (<https://github.com/cursor/plugins>, `pstack/skills`) on 2026-08-21 at commit `46125561306434d8a1d7745d540d8932ab0cd2a2`.

We borrowed the slop-tell catalogue for `no-ai-slop`.
The Fowler smell baseline and comment rules informed `judo-review/STANDARDS.md`.
The decision-trail discipline informed `orchestrate`. No skill was copied.
