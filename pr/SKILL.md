---
name: pr
description: Use when writing or editing a PR description, on any host (GitHub, GitLab, Bitbucket).
---

This skill owns the **structure** of a PR body. `no-ai-slop` owns the **voice**: call the Skill tool with `no-ai-slop` before you write.

The reader did not see the work and has not seen the ticket. Write for that **cold** reader. Read the spec, plan, or ticket as well as the diff, so you know what a revert does not undo.

The repo's own PR template wins (`.github/pull_request_template.md`, `.gitlab/merge_request_templates/`, `docs/pull_request_template.md`, `PULL_REQUEST_TEMPLATE.md`). Fill every section and checkbox it has. Put Why, What changed, and Risk below into its closest sections, and add a section only for what it has no place for.

## Template

```markdown
## Why

<ticket or plan link, or "No ticket">

<what went wrong or what was missing, as the user or caller saw it>

<the fix, in one sentence>

## What changed

### Behavior

<optional visual>

- <what a user or caller now sees>

### Code

- <where the change lives, for the reviewer who opens it>

### Not changed

- <what you left alone on purpose>

## Risk

- Undo: <"revert is enough", or what a revert does not undo>
- If this is wrong: <who notices, and what they see>
- Look closely at: <the one place a reviewer should read slowly, or "nothing special">
```

Start the body at the Why heading.

## Why

Open on what the user or caller saw: an error text, a status code, a screen. Use the words they would use, and terms from the repo's `GLOSSARY.md` where it has one. Code names wait for the Code sub-heading.

## What changed

Three sub-headings. Drop any that would be empty.

- Behavior: what now happens, in words a user of the system knows: "an outage now returns 503". When a picture shows it faster than bullets, read [`VISUALS.md`](VISUALS.md) and put one visual above the bullets. A table of cases with Before and After columns fits most behavior changes.
- Code: where the change lives. This is the only place for class and method names, and only for code the reviewer must open.
- Not changed: a choice to leave something alone, only when a reviewer would otherwise ask.

## Risk

- Undo: most changes are undone by a revert. A revert does not undo dropped data, sent emails or events, or a deleted resource. It does not undo a published API, package version, or data format that others already use. Name the one that applies.
- If this is wrong: on one line, name each group whose behavior changes and what they would see. Examples: one button, one endpoint, every caller of a library, layout on mobile.
- Look closely at: the one file or decision where a mistake would hide.

## Example

```markdown
## Why

https://tracker.example.com/browse/PROJ-123

Order imports failed with `400 Currency EUR is unknown`, but EUR is valid. The currency service was down, and we reported every failure from it as "unknown currency". Callers saw a client error and did not retry.

Now an outage returns 503 so callers retry, and an unknown currency still returns 400.

## What changed

### Behavior

| Currency service answers | Before | After |
|---|---|---|
| 404 | 400 "Currency X is unknown" | same |
| 5xx or timeout | 400 "Currency X is unknown" | 503 "Could not check currency X", plus a WARN log |

- A caller without channel access now gets 403 before any currency check.

### Code

- `CurrencyClient` maps 5xx and timeouts to 503 and logs a WARN.
- Control characters are removed from the currency code before it is logged.

### Not changed

- Background jobs. They run after the import is accepted.

## Risk

- Undo: revert is enough.
- If this is wrong: callers without channel access get 403 instead of a currency error. During a currency outage, import callers get 503 instead of 400.
- Look closely at: the order of the access and currency checks in `ImportService`.
```

Done when each check holds:

- The body is under 300 words, not counting a visual.
- After the ticket link, Why opens on what the user or caller saw, names no class or method, and stays under 80 words.
- What changed has at most 5 bullets across its sub-headings, at most one visual, and class or method names only under Code.
- Risk has its three lines, and "Look closely at" names one place or says "nothing special".
- You ran the `no-ai-slop` pre-send checklist on the body.
