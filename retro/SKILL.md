---
name: retro
description: "Find what in the agent's setup (rules, skills, hooks) should change, from one session or many, not the code."
disable-model-invocation: true
---

The user wants a **retrospective**. You suggest changes to the coding agent's **environment** so the next run goes better. The code from the session is out of scope.

## Steps

1. Read the primary sources. The user names the sessions; default to the current one.
   - The session log, never your memory of it. When the harness can list and read its threads, read the sessions through it: it spans every provider the user ran. Otherwise logs live at:
     - Claude Code: `~/.claude/projects/<cwd, every non-alphanumeric char as ->/<session-id>.jsonl`
     - Codex: `~/.codex/sessions/YYYY/MM/DD/rollout-*.jsonl`, filed by date; match `session_meta.payload.cwd` in the first line
     - Grok: `~/.grok/sessions/<url-encoded cwd>/<session-id>/chat_history.jsonl`, with tool steps in `events.jsonl`. Other providers' models run through the Grok CLI via a proxy land here too; the model id carries the proxy prefix (`cpa-gui/gemini-...`)
     - OpenCode: `~/.local/share/opencode/opencode.db`, SQLite: tables `session` (match `directory`), `message`, `part` (`data` holds the content)
     - Cursor: `~/.cursor/chats/<hash>/<session-id>/store.db`, SQLite; `meta.json` beside it names the session
     - Antigravity: `~/.gemini/antigravity/conversations/<id>.db`, SQLite; text sits in protobuf blobs in `steps.step_payload`, readable with `strings`. `~/.gemini/antigravity/conversation_summaries.db` maps each `conversation_id` to its `workspace_uris`. The CLI keeps the same layout under `~/.gemini/antigravity-cli/`

     The current session is the most recently modified entry for this cwd. The cwd is the worktree path, so a repo's sessions spread over one entry per worktree: search them all.
   - The steering files: the repo's `AGENTS.md`/`CLAUDE.md` and the user's global `AGENTS.md`/`CLAUDE.md`.

   A log is large, so dispatch one read-only subagent to read it; for many sessions, one per batch, all in one message. When the complaint is about one model ("Codex over-plans"), add a **control group**: a batch of the same repo's sessions run on another model, so the report shows which rule one model reads loosely and the other literally. It reports where the agent stalled, retried, guessed, was corrected by the user, or pushed past an error. Trust the log over the agent's final summary: agents push past problems without saying so. Secrets and customer data in the report become `<REDACTED>`. Done when the report lists every user correction and every failed tool call, each with its log line or timestamp.

2. Find candidates in these categories:
   - **Navigation**: did the agent take long to find the right file? Are there hidden dependencies between files? Would a **navigation pointer** help? _Use when_ the agent searched a long time for one fact.
   - **Automated checks**: could a lint rule, type check, test, hook, or filesystem check have caught a mistake? Read the repo's own check command first (`package.json` scripts, build-tool `lint`/`check` tasks, a `check.sh`, the CI workflow). A check that exists but is unwired or silently broken is the finding, not a new one. A repo with no **guardrail** (no pre-commit hook and no CI job running its lint/typecheck/test) is a finding of its own. _Use when_ the agent made a mistake a check could catch, or the repo has no guardrail.
   - **Coding standards**: should the **reviewer agent** get a new rule, or should an existing rule be removed or clarified? Classify each violation first. A **mechanical** one (fixed syntax pattern, banned API, import shape, file location) gets a deterministic check, full stop: a custom rule in the repo's linter, a pre-commit hook, or a CI job, whichever is cheapest there. Default to building the check over writing the rule. A **judgement call** (cross-file consistency, matching the surrounding style) goes to the repo's `CODING_STANDARDS.md`, or to [`judo-review/STANDARDS.md`](../judo-review/STANDARDS.md) when it holds in every repo. _Use when_ `judo-review` missed a mistake.
   - **Steering files**: a line that should move to a check or to coding standards, and a **no-op** line that changes nothing versus the default ("write clean code"), which gets deleted. Also a line a **literal reader** turns into extra process or questions: an undefined threshold ("non-trivial"), a hard stop ("STOP", "no exception") with no way out, an exact phrase to match instead of an intent; fix it with an observable test and a named path for the other case. Run on every retro.
   - **User prompts**: a habit in the user's own prompts that caused the problem, such as boilerplate that asks for full process on every task. Report it with the session evidence; never edit it. _Use when_ the same prompt text sits at the start of the sessions that went wrong.
   - **Tool economy**: a tool call, CLI, or MCP that burned tokens and could be cheaper or narrower. _Use when_ the agent made an expensive call.
   - **Information access**: a fact the agent needed and could not reach - dev server logs, read-only access to a third-party service. _Use when_ a crucial fact was missing.

   Done when every item in the step 1 report sits in a category or is dropped with a one-line reason, and every steering file has been checked line by line.

3. Present the candidates as one numbered list, most severe first. Severity: a mistake that reached the user or a commit, then one the agent caught late, then wasted tokens, then steering-file cleanups. Missing information ranks by the effect it had. Within a level, the one that can happen more often first. Change nothing yet. Done when each item names its session evidence, category, target file, and exact change.

4. Apply only the items the user picks.
   - A skill edit lands in the `skills` repo, never in a harness skill dir, and meets the bar in [`writing-great-skills`](../writing-great-skills/SKILL.md). Read it before the first skill edit. Re-run `install.sh` after adding, renaming, or removing a skill.
   - A durable-doc edit (`AGENTS.md`, `CODING_STANDARDS.md`, docs): call the Skill tool with `domain-modeling` and run its contest.
   - A new check ships with proof that it goes red on the session's mistake and green on the fix.

   Done when every picked item is applied, and each new check shows its red and green output.

## Reference

### Implementation vs review

All work goes through implementation, then review. The implementer carries the most **context pressure**: it explores, writes code, and debugs. The reviewer gets a diff and carries the least. So the reviewer enforces coding standards, and the implementer's steering files stay short.

### Where each fix lives

- `AGENTS.md`/`CLAUDE.md`: pushed into every agent's window. Use it very sparingly, mostly for **navigation pointers**.
- `CODING_STANDARDS.md`: read during review, not implementation. Past 1,000 lines, split it into docs and point to them.
- Docs: reference files reached through pointers. Look for an existing doc before writing a new one.
- Skills: for reference whose description belongs in the window, or for user-invoked commands.

### Human in the loop

Never automate a retro. An unattended retro acts on false positives and drifts the repo. Run it on a sample of sessions, or on one where the agent did something odd.
