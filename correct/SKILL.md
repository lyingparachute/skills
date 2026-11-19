---
name: correct
description: "Use when the user corrects a mistake that was corrected before, says agents keep repeating a mistake, or asks to mistake-proof a repo."
---

The user keeps correcting agents for the same mistakes. Where the mistake lives decides the fix:

- **In a repo's code** (a wrong import, a copied old pattern, a hand-synced list): the repo can reject it. Run the steps below.
- **In how the agent works** (communication, a skipped process, the wrong tool): no repo change stops it. Follow Agent mistakes, at the end.

## Repo mistakes

**Mistake-proof** the repo: change it so the next agent cannot make the mistake.

Design for this contributor: an agent that sees only the files it opened, copies the nearest example, and takes the shortest path that compiles. A change that looks right from one file must be right for the whole repo.

### Steps

1. **Find the classes.** Read the repo's record: recent commits, reverts, review comments, the agent rules files, comments that explain a workaround, and every correction the user made in this conversation. Group the mistakes into **classes**. A **mechanical** class, one a check can catch, counts on its first occurrence. A judgement call counts once it has happened twice. Earlier sessions hold corrections too. When the harness can search its threads, ask the user, and on a yes search them for corrections made in this repo. With no thread search, those corrections are `retro`'s to find: when the record is thin, tell the user to run it first. Done when every class names its occurrences (one or more for a mechanical class, two or more for a judgement call), each with its commit, comment, thread, or `file:line`, and every one-off judgement call is listed as dropped.

2. **Pick the rung.** Each class gets the highest rung of the ladder that works. Done when every class has a rung and, for each rung above it, one line on why that rung fails here.

3. **Fix and prove**, most frequent class first, one commit per class. A fix that needs a plan goes to `exec-plan`, with the class and its evidence as the problem statement. Every new check goes **red** on a real past mistake, replayed from its commit, and green on the fix. Wire it into the repo's own check command, the one CI runs, so local and CI run the same command. Done when every class is fixed with its red and green output, or sits in a plan.

4. **Update the enforcement table** (below). Done when every fixed class has a row, and every row whose mistake can no longer be written is deleted.

5. **Report** each class: its evidence, its rung, why no higher rung worked, and the red and green output.

### The ladder

1. **Architecture**: the mistake has nowhere to live. Give each piece of state one owner and each task one supported way. Hide internals so the wrong import fails. Wrap an API that takes nuance to use well (an effect hook, a timer, a raw query) in one owner module, and ban it everywhere else. Put a file's role in its path, as a suffix or a directory, and key checks on that path (code that runs every frame lives in `*.hot.ts`, and a check bans allocation there). A path adds restrictions only. Rights come from a closed, named list, so a rename cannot make a check pass. Replace hand-synced lists with a single source of truth. Delete the old ways and the dead code an agent would copy. For a new seam, call the Skill tool with `codebase-design`.
2. **Types**: the bad state does not compile. Call the Skill tool with `type-system-discipline`.
3. **Check**: bad code still compiles, so a lint rule or CI check fails it, and its error message names the file, type, or function to use instead. Where the pattern is already common, make the check a **ratchet**: it fails only when a change adds more. A ratchet ships with a plan, per `exec-plan`, that takes its count to zero, because agents copy every case still standing.
4. **Test**: the behavior is pinned. Fix or delete any test that still passes when its behavior breaks, or that fails when only the internals change. New tests follow `tdd`.
5. **Rule**: a line in a durable doc, for judgement calls only, because nothing fails when an agent skips it. Call the Skill tool with `domain-modeling` and run its contest.

An exception to a check goes on the offending line, with a reason, an expiry date, and the user's approval.

### The enforcement table

One table that pairs each rule with what enforces it: the module boundary, the type, the check, or the test. It lives in the repo's `CODING_STANDARDS.md`, or in the agent rules file when the repo has none. A row with an empty enforcer is a rung-5 rule.

For the rest of the session, each correction from the user is a table lookup. No row, mechanical mistake: fix it, add its check, and add the row, all in the same change. No row, judgement call: fix it and add the row with an empty enforcer. A row with an empty enforcer: the class has repeated, so fix it at the highest rung in the same change.

## Agent mistakes

When the harness can search its threads, ask the user, and on a yes search them for the earlier corrections on this topic: they show how wide the fix must reach.

Then stop and ask the user where the fix goes: a skill, or a line in the global or repo rules file, whichever scopes best. Recommend the skill. A rules file stays thin: one line that names the skill, with the detail inside the skill.

- A skill edit lands in the `skills` repo and meets the bar in [`writing-great-skills`](../writing-great-skills/SKILL.md). Read it before the first skill edit.
- A rules-file edit: call the Skill tool with `domain-modeling` and run its contest.

Done when the edit the user picked is in place, and the report quotes both corrections beside it.
