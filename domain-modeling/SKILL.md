---
name: domain-modeling
description: Use when pinning down domain terms or a ubiquitous language, before adding to or editing a durable doc (ADR, GLOSSARY.md, README, AGENTS.md or CLAUDE.md, docs/ pages, runbooks), when asked where a decision record or a term belongs, or when another skill needs the domain model.
---

# Domain Modeling

Actively build and sharpen the project's domain model as you design. This is the *active* discipline - challenging terms, inventing edge-case scenarios, and writing the glossary and decisions down once they survive the contest (see Durable docs). (Merely *reading* `GLOSSARY.md` for vocabulary is not this skill - that's a one-line habit any skill can do. This skill is for when you're changing the model, not just consuming it.)

## File structure

Most repos have a single context:

```
/
├── GLOSSARY.md
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/
```

If a `GLOSSARY-MAP.md` exists at the root, the repo has multiple contexts. The map points to where each one lives:

```
/
├── GLOSSARY-MAP.md
├── docs/
│   └── adr/                          ← system-wide decisions
├── src/
│   ├── ordering/
│   │   ├── GLOSSARY.md
│   │   └── docs/adr/                 ← context-specific decisions
│   └── billing/
│       ├── GLOSSARY.md
│       └── docs/adr/
```

A legacy `CONTEXT.md` or `CONTEXT-MAP.md` is the same file under its old name: `git mv` it to `GLOSSARY.md` or `GLOSSARY-MAP.md` before the first edit. Create files lazily: `GLOSSARY.md` when the first term survives the contest, `docs/adr/` when the first ADR does.

## Durable docs

Durable docs = ADRs, `GLOSSARY.md`, READMEs, `AGENTS.md` or `CLAUDE.md`, `docs/` pages, runbooks: anything meant to outlive the work. Implementation detail lives in the code.

**Contest** = argue against a change before you make it. Contest every add or edit to a durable doc, plus the existing text in the section you touch. Keep only what survives:

1. **True now?** Read every claim about what the code does today (behavior, states) from the code in this session. Code does not show it → drop it. Decisions, constraints, and terms the user stated are intent; they pass this step.
2. **Drift-proof?** Would a change that keeps behavior (a rename, or a new type, field, file, column or setting) make the claim false? Yes → the code owns it: cut it, and name the module or concept instead. Lists of types, files, columns or endpoints, counts, entry points, config defaults, and descriptions of what a method does all fail. Names a reader types or sets to run or operate the system stay: commands, env vars, ports, config keys. No line numbers; paths only where the reader needs them to act, as in runbooks and commands.
3. **Owner?** One owner per fact: term → `GLOSSARY.md`, decision and why → ADR, agent rule and the commands agents run → `AGENTS.md`, human setup → README, operating steps → runbook. An invariant types cannot carry, or an external-system behavior the code relies on → a comment at the one place that relies on it, or an ADR when several places do. Grep every durable doc in the touched context for the fact first. Found → edit it there or link to it.
4. **Enforced?** Each "must" or "never" in an ADR, README, or runbook names an automated check (test, lint, CI, hook) or a person or team who answers for it. None → cut it, or restate it as a decision with its reason. Agent rules in `AGENTS.md` are enforced by the agent reading them.
5. **History?** Keep the decision and its constraint. A rejected option gets one line: the constraint that ruled it out.
6. **Useful?** Who reads this, and what do they do differently? No answer, or an agent does it by default → cut.
7. **Shrink.** Edit, merge, or delete before adding. A `GLOSSARY.md`, README, `docs/` page, runbook or module guide (an `AGENTS.md` below the repo root) that this edit takes past 50 lines gets a split or a cut; a glossary splits by subheading. ADR length is governed by [ADR-FORMAT.md](./ADR-FORMAT.md). The repo-root `AGENTS.md` or `CLAUDE.md` and the agent rule files it routes harnesses to are exempt: harnesses load them by path or trigger, and splitting them changes loading.

Voice: `no-ai-slop`.

Done when every changed block has one line in your reply or commit message: the doc, what was added, and what was cut or merged, or why nothing could go.

## During the session

### Challenge against the glossary

When the user uses a term that conflicts with the existing language in `GLOSSARY.md`, call it out immediately. "Your glossary defines 'cancellation' as X, but you seem to mean Y - which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account' - do you mean the Customer or the User? Those are different things."

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible - which is right?"

### Update GLOSSARY.md inline

When a term is resolved and survives the contest, update `GLOSSARY.md` right there. Use the format in [GLOSSARY-FORMAT.md](./GLOSSARY-FORMAT.md).

`GLOSSARY.md` is a glossary and nothing else.

### Write ADRs sparingly

Read [ADR-FORMAT.md](./ADR-FORMAT.md) before writing or editing an ADR. Apply its decision test, lifecycle and format, and the durable-doc contest.
