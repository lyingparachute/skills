---
name: caveman-commit
description: "Use when writing a commit message, when staging changes to commit, or when the user says \"commit\" or \"/commit\"."
---

A commit message is one line: one plain sentence that says what the code does now. No body, no trailers. Details belong in the PR description.

## Rules

- Shape: `<Verb> <what changes>`, e.g. `Read Excel error cells as empty cells`.
- Ticket key is a prefix only when the work has one - in the branch name, the task, or the repo's recent `git log`: `ABC-123 Read Excel error cells as empty cells`. No ticket → no prefix, no placeholder.
- Start with a capital imperative verb: Add, Remove, Read, Refuse, Move, Rename, Upgrade.
- Name the behavior, not the activity. A reader of `git log --oneline` learns what changed without opening the diff.
- No type prefixes (`feat:`, `fix(api):`), no trailing period, no file names.
- ≤60 chars for the sentence when possible, hard cap 72 for the whole line.

## Examples

- ❌ `resolve review findings` - says work happened, not what changed
- ✅ `Remove Javadoc that restates the code`
- ❌ `feat(mapping): add approval time check`
- ✅ `Refuse mapping approval when its transaction lacks time`
- ❌ `ABC-123 Fix ExcelCellReader`
- ✅ `ABC-123 Read Excel error cells as empty cells`
- ✅ `Allow only one-line commit messages`

## Boundaries

Only generates the commit message. Does not run `git commit`, does not stage files, does not amend. Output the message as a code block ready to paste. "stop caveman-commit" or "normal mode": revert to verbose commit style.
