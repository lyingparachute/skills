---
name: domain-modeling
description: Use when pinning down domain terms or a ubiquitous language, before adding to or editing a durable doc (ADR, CONTEXT.md, README, AGENTS.md or CLAUDE.md, docs/ pages, runbooks), or when another skill needs the domain model.
---

# Domain Modeling

Actively build and sharpen the project's domain model as you design. This is the *active* discipline - challenging terms, inventing edge-case scenarios, and writing the glossary and decisions down once they survive the contest (see Durable docs). (Merely *reading* `CONTEXT.md` for vocabulary is not this skill - that's a one-line habit any skill can do. This skill is for when you're changing the model, not just consuming it.)

## File structure

Most repos have a single context:

```
/
├── CONTEXT.md
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/
```

If a `CONTEXT-MAP.md` exists at the root, the repo has multiple contexts. The map points to where each one lives:

```
/
├── CONTEXT-MAP.md
├── docs/
│   └── adr/                          ← system-wide decisions
├── src/
│   ├── ordering/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/                 ← context-specific decisions
│   └── billing/
│       ├── CONTEXT.md
│       └── docs/adr/
```

Create files lazily: `CONTEXT.md` when the first term survives the contest, `docs/adr/` when the first ADR does.

## Durable docs

Durable docs = ADRs, `CONTEXT.md`, READMEs, `AGENTS.md` or `CLAUDE.md`, `docs/` pages, runbooks: anything meant to outlive the work. Implementation detail lives in the code.

**Contest** = argue against a change before you make it. Contest every add or edit to a durable doc, plus the existing text in the section you touch. Keep only what survives:

1. **True now?** Read every claim about what the code does today (behavior, states, names) from the code in this session. Code does not show it → drop it. Decisions, constraints, and terms the user stated are intent; they pass this step.
2. **Code says it?** Name the module or concept instead of restating it. No line numbers; paths only where the reader needs them to act, as in runbooks and commands.
3. **Owner?** One owner per fact: term → `CONTEXT.md`, decision and why → ADR, agent rule and the commands agents run → `AGENTS.md`, human setup → README, operating steps → runbook. Grep every durable doc in the touched context for the fact first. Found → edit it there or link to it.
4. **Enforced?** Each "must" or "never" in an ADR, README, or runbook names an automated check (test, lint, CI, hook) or a person or team who answers for it. None → state what the code does today, or cut it. Agent rules in `AGENTS.md` are enforced by the agent reading them.
5. **History?** Keep the decision and its constraint. A rejected option gets one line: the constraint that ruled it out.
6. **Useful?** Who reads this, and what do they do differently? No answer, or an agent does it by default → cut.
7. **Shrink.** Edit, merge, or delete before adding. A doc this edit takes past 50 lines gets a split or a cut; a glossary splits by subheading.

Voice: `no-ai-slop`.

Done when every changed block has one line in your reply or commit message: the doc, what was added, and what was cut or merged, or why nothing could go.

## During the session

### Challenge against the glossary

When the user uses a term that conflicts with the existing language in `CONTEXT.md`, call it out immediately. "Your glossary defines 'cancellation' as X, but you seem to mean Y - which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account' - do you mean the Customer or the User? Those are different things."

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible - which is right?"

### Update CONTEXT.md inline

When a term is resolved and survives the contest, update `CONTEXT.md` right there. Use the format in [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md).

`CONTEXT.md` is a glossary and nothing else.

### Write ADRs sparingly

A new ADR passes the test in [ADR-FORMAT.md](./ADR-FORMAT.md) and the contest.
