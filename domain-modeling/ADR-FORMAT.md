# ADR Format

ADRs live in `docs/adr/` and use sequential numbering: `0001-slug.md`, `0002-slug.md`, etc.

Create the `docs/adr/` directory lazily - only when the first ADR is needed.

## Template

```md
# {Short title of the decision}

{1-3 sentences: the constraint, what we decided, and why.}
```

That's it. An ADR can be a single paragraph. The value is in recording *that* a decision was made and *why* - not in filling out sections.

An ADR is a decision record, not a cookbook, contract, or implementation spec. Every write passes the contest in `domain-modeling/SKILL.md`, Durable docs.

Example:

```md
# Pods are disposable

The platform can kill any pod at any time, so the app keeps no state in memory between requests. It persists state or rebuilds it.
```

Too much - a history lesson, not a decision:

```md
We first ran serverless. Cold starts broke the scheduler and billing grew, so in 2024 we moved to pods, which...
```

## Optional sections

Only include these when they add genuine value. Most ADRs won't need them.

- **Status** frontmatter (`proposed | accepted | deprecated | superseded by ADR-NNNN`) - useful when decisions are revisited
- **Considered Options** - one line each: the option and the constraint that ruled it out

## Numbering

A new ADR takes the highest number plus one.

## When to write an ADR

All three of these must be true:

1. **Hard to reverse** - the cost of changing your mind later is meaningful
2. **Surprising without context** - a future reader will look at the code and wonder "why on earth did they do it this way?"
3. **The result of a real trade-off** - there were genuine alternatives and you picked one for specific reasons

Then scan `docs/adr/` for an ADR on the same topic. Same decision, stale words → edit it. Changed decision → supersede it.

If a decision is easy to reverse, skip it - you'll just reverse it. If it's not surprising, nobody will wonder why. If there was no real alternative, there's nothing to record beyond "we did the obvious thing."

### What qualifies

- **Architectural shape.** "The write model is event-sourced, the read model is projected into Postgres."
- **Deliberate deviation from the obvious path.** "Manual SQL instead of an ORM, because X." It stops the next engineer from "fixing" it.
- **Constraint not visible in the code.** "No AWS, because of compliance requirements."
