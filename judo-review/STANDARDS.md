# Standards baseline

Reference for the Standards axis. Two rules govern every entry below:

- **The repo overrides.** A convention in the repo's rule files, or an established pattern in the touched code, beats anything here.
- **Always a judgement call.** These name shapes worth a second look, never violations to count. A smell reported without the cost it imposes on a reader or a future change is a nit.
- **The judo move outranks the catalogue.** A named smell is the floor, not the goal. When a restructure would delete a whole category of complexity, that move is the finding, and whether it maps onto a catalogue entry does not matter. A review that returns twelve named smells and no judo move has failed.

## Smell baseline

Twelve shapes from Fowler's catalogue, each with the move that resolves it. Where a move here overlaps Preferred Remedies in `SKILL.md`, that section is authoritative on the remedy; this list is what you scan the diff for.

- **Mysterious name** - a name that needs the body read to be understood. Rename until the call site reads on its own.
- **Duplicated code** - the same logic in two places. Extract it, or move it to the layer that owns the concept.
- **Feature envy** - a function reaching repeatedly into another object's data. Move it next to the data it uses.
- **Data clumps** - the same group of parameters or fields travelling together. Give the group a type.
- **Primitive obsession** - domain concepts carried as raw strings and ints. Wrap them in a value object, validated at construction.
- **Repeated switches** - the same discriminator branched on in several places. Replace with polymorphism or one dispatch table.
- **Shotgun surgery** - one behaviour change forcing edits across many files. Gather the behaviour into one module.
- **Divergent change** - one module edited for unrelated reasons. Split it along those reasons.
- **Speculative generality** - a hook, parameter, or abstraction with one caller and an imagined second. Delete it until the second arrives.
- **Message chains** - `a.b().c().d()`. Ask the first object for what you actually want.
- **Middle man** - a class or module that only delegates. Let callers talk to the real thing.
- **Refused bequest** - a subtype inheriting what it does not want. Prefer delegation to inheritance.

## Comments

The repo's own rule ("comment only what naming can't carry") sets the bar. Two shapes it does not name:

- **A long inline justification is a confession.** When a comment argues for why the code is shaped the way it is, the finding is the shape, not the comment. Ask for the reshape.
- **A suppression is a claim, so check it.** `eslint-disable`, `@ts-ignore`, `@ts-expect-error` and their kin: read the rule being silenced. If it was protecting real correctness, the suppression is the finding.
