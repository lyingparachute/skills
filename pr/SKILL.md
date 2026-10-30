---
name: pr
description: Use when writing or editing a PR description, opening a PR, or updating a PR branch (rebase, force push), on any host (GitHub, GitLab, Bitbucket).
---

This skill owns the **structure** of a PR body. `no-ai-slop` owns the **voice**: call the Skill tool with `no-ai-slop` before you write.

The reader did not see the work and has not seen the ticket. Write for that **cold** reader. Read the spec, plan, or ticket as well as the diff, so you know what a revert does not undo. The diff is where the code lives. The body is what a person sees.

The repo's own PR template wins (`.github/pull_request_template.md`, `.gitlab/merge_request_templates/`, `docs/pull_request_template.md`, `PULL_REQUEST_TEMPLATE.md`). Fill every section and checkbox it has. Put Why, What changed, and Risk below into its closest sections, and add a section only for what it has no place for.

## Template

```markdown
## Why

<ticket or plan link, or "No ticket">

<what went wrong or what was missing, as the user or caller saw it>

<the fix, in one sentence>

## What changed

<one paragraph: what a user or caller now sees>

| Case | Before | After |
|---|---|---|
| <case> | <what they saw> | <what they see now> |

## Risk

- <what goes wrong, who notices, and what they see>
```

Start the body at the Why heading.

## Why

Open on what the user or caller saw: an error text, a status code, a screen. Use the words they would use, and terms from the repo's `GLOSSARY.md` where it has one. End on the fix in one sentence.

## What changed

One paragraph on what a user or caller now sees. Use their words: an error text, a status code, a screen, a result.

When more than one case changes, add a table under the paragraph. Rows are cases. Columns are Before and After. Write `same` when a case stays as it was. The paragraph covers what the table does not.

## Risk

Each risk is its own bullet. Say what goes wrong, who notices, and what they see. Add a bullet for a consequence the reader cannot get from the table.

When a revert leaves damage behind, add one bullet for that damage: rows already written, a message already sent, something deleted, or a format others already use.

## Example

```markdown
## Why

https://tracker.example.com/browse/PROJ-123

Order imports failed with `400 Currency EUR is unknown`, but EUR is valid. The currency service was down, and we reported every failure from it as "unknown currency". Callers saw a client error and did not retry.

Now an outage returns 503 so callers retry, and an unknown currency still returns 400.

## What changed

A caller without channel access now gets 403 before any currency check.

| Currency service answers | Before | After |
|---|---|---|
| 404 | 400 "Currency X is unknown" | same |
| 5xx or timeout | 400 "Currency X is unknown" | 503 "Could not check currency X", plus a WARN log |

## Risk

- A caller that does not retry on 503 leaves the order unimported until someone sends it again.
- A client that only handled the currency error now shows an access error, so the user cannot tell the currency was valid.
```

Done when each check holds:

- The body is under 300 words, not counting the table.
- After the ticket link, Why opens on what the user or caller saw, stays in the caller's words, and stays under 80 words.
- What changed is one paragraph, plus a Before/After table when more than one case changes.
- Each Risk bullet says what goes wrong, who notices, and what they see. A reader cannot get that bullet from the table.
- A revert bullet appears only when a revert leaves damage behind.
- You ran the `no-ai-slop` pre-send checklist on the body.

## Opening the PR

Run the gate the repo's PR template or rules name (a `ci:local` script, a checklist command) before you open the PR, and tick only the boxes whose command you saw pass. A gate that is red or cannot finish here: fix it, or tell the user and leave the PR unopened. When the harness can link a PR to the thread, link every PR you open or push to. When it can watch a PR and the user asked you to monitor one, watch it instead of polling.

## Updating the branch

"Rebase and force push" means onto the PR's own base branch, which is often not `main`. Read the base from the host (`gh pr view --json baseRefName`, or the PR's destination branch on GitLab or Bitbucket), then:

1. `git fetch`, then rebase onto `origin/<base>` and resolve conflicts.
2. Run lint, type check, and the tests of the modules the rebase touched.
3. Push with `git push --force-with-lease=<branch>:<sha>`, where `<sha>` is `origin/<branch>` as it was before your rebase.
4. Check the branch is 0 commits behind `origin/<base>`. The base moved while you worked → repeat from step 1.

Done when the push landed and the branch is 0 behind its base.
