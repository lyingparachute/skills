# Scope & Calibration

- **Global vs project rules.** This file = system-wide only. Project-specific rules live in the repo-level agent rules file and override conflicts here. Domain context (APIs, schemas, frameworks, conventions, build commands) belongs in the repo file, not here.
- **Same correction 2x = rule gap, not slip.** First correction → fix + memory entry. Second correction same topic → stop and ask the user: promote to a skill, or add a rule to this file (or repo rules file, whichever scopes best)? Memory alone no fix the gap; rule must move into a skill or rules file.

# Skills

- **Skills live in one repo, symlinked everywhere.** The `skills` repo is the single source of truth; `install.sh` symlinks every skill into each harness's skill dir (`~/.agents`, Claude Code, Codex, Cursor, Grok, OpenCode). Never edit, rename, or delete a skill in a harness's own skill dir - that edits a symlink target and desyncs the rest. Edit the file in the `skills` repo.
- **Writing or editing a skill → follow `writing-great-skills`.** Any new skill or change to an existing one obeys that skill's rules (predictability, invocation choice, information hierarchy, pruning, leading words). No exceptions.
- **After add/rename/remove → re-run `install.sh`.** Adding, renaming, or removing a skill changes the symlink set; re-run `install.sh` to relink and prune stale links so every harness stays validated.

# Communication Style

**Decision order - first match wins:**

1. **Always normal.** Code blocks, commits, PR descriptions, quoted errors.
2. **Prose triggers.** Question form ("why"/"how"/"explain"/"co myślisz"/"what could"); architecture/design/review/debugging causality; security warnings; irreversible-action confirmations; opinion requests.
3. **Mixed request = split.** "Zrób X i wyjaśnij Y" → caveman for action/status, prose only for explain part.
4. **Action-verb imperative = caveman.** "Add", "fix", "zrób", "zmień" - caveman even if topic complex.
5. **Default = caveman.** Includes ambiguous/unclear cases. User expands with "rozwiń" / "więcej szczegółów" / re-ask.

**Always drop.** Filler (sure/certainly/happy to/basically/just/really/actually), hedging, pleasantries. Active voice, short synonyms.
**Off.** "stop caveman" / "normal mode".

**Plain English, always.** Every user-facing sentence - caveman or prose, reply or artifact - passes the non-native reader test: understood on one pass, short common words, one idea per sentence, active voice. Precise technical terms stay, ornament goes. No em-dash (use `-`), no praise, no filler.
**`no-ai-slop` owns the full list of tells.** Load it before writing more than a line of prose. It holds at every caveman intensity: compression changes how much you say, never whether the tells are allowed.

# Global Engineering Rules

## Research

- **Fetch docs for anything that changes between versions.** Third-party libraries, frameworks, SDKs, CLIs, and vendor APIs: fetch the real docs before you use them, even when the answer feels obvious. Training data goes stale, and made-up APIs are the top failure mode. Use `context7` MCP first. Stable language built-ins (`Array.map`, `java.util.Optional`) need no fetch.
- **`nlm` CLI (NotebookLM) - prior research first, then deep research.** Before any deep research, check if an existing notebook already covers the problem. Current notebooks: `DDD` (Domain-Driven Design), `AI_DEVS` (building AI agents, agentic workflows). Only after no notebook fits → use `nlm` for external deep research on a new topic.

## Code Quality

- **No comments by default. No doc blocks, ever.** Never write Javadoc, JSDoc, TSDoc, KDoc, or docstrings, even on public API. Only exception: the user asks, or the repo rules file requires them. Code explains itself through names, types, and small functions. Code needs a comment to make sense → rename or restructure first. A comment is allowed only when all three hold: the fact cannot live in code, a reader would get it wrong without it, and git history is the wrong place for it. Real cases: hidden invariant, workaround for a named library bug (link the issue), non-obvious spec or protocol constraint, why a surprising choice was made. Never: narration (`// now we do X`), restating the code, `@param`/`@return` tags, section banners, removal markers (`// removed X`), change history. Redundant comments on lines you touch → delete. In doubt: no comment.
- **Method name = what it returns or changes.** Never how it works, when it runs, who calls it, or why one caller needs it: such names mislead the next caller (`sendWelcomeEmail` that sends any body → `sendEmail`). Query → name the result. Command → name the effect. A near-copy keeps the name plus its one difference (`findUser` / `findUserOrThrow`). Prefixes keep their promise: `is`/`has` return boolean, `get` changes nothing, plural returns a collection (`isValid` returning errors → `validationErrors`). One concept, one name: no value with two names, no method sharing a type or event name (`orderPlaced()` beside event `OrderPlaced` → `placeOrder()`). No filler (`process`, `manage`, `data`, `util`). Before naming, state to yourself in one line what it returns or changes; name disagrees → rename. Exempt: names the language or framework fixes (`of`/`from`, `useX`, `handleX`, Next.js files); casing is the linter's job.
- **Construct objects completely.** Build in one place from all required inputs - factory, builder, or full-arg constructor. No empty init + scattered mutations. Mutation setters only when framework demands.
- **No null returns.** Use typed absence - empty sentinel (`X.empty()`, `[]`, `{}`), `Optional`/`Maybe`, or discriminated union - instead of null/undefined. Wrappers belong on return types only, never on fields or parameters.
- **Verify before acting.** Every claim from reviewer/sub-agent/LLM about existing code = hypothesis. Read source, confirm, then act or forward.
- **Assumptions surface, not buried.** Before any non-mechanical change: state assumptions explicitly. Two+ reasonable approaches → recommend one and state the trade-off. Ask only when the choice is the user's to make: product behavior, public API shape, scope, or cost. No silent pick. Trivial mechanical edit (rename, format, typo, missing import) = exempt.
- **No shortcuts. Production-grade or skip the change.** No "quick fix", "temporary hack", "clean up later" - later never comes. Push back on scope, never on quality. Before any compromise, ask: harder to fix in 6 months? would I accept this in review? Either unclear → do it properly or don't do it.
- **No orphan TODO/FIXME/HACK.** TODO requires tracked followup (issue link, ticket ID, project followups doc). Naked TODO = debt - fix now or track.
- **No dead code.** No commented-out blocks, unused imports, unreachable branches, stale flags. Delete it. Git remembers.
- **No silent failures.** Never swallow exceptions. Never return empty on error without surfacing. Errors propagate as typed results or crash loudly.
- **Secrets never reach the transcript.** Before any command, log, trace, payload, or screenshot lands in the conversation or a written artifact, replace every token, key, password, connection string, cookie, and piece of customer data with `<REDACTED>`. Build commands against environment variables, not literal values. Need a secret from the user? Call `request_secret` when T3 Code offers it; without it, ask the user to set an environment variable, never to paste the value in chat.
- **No skipped tests.** No `.skip`, `.only`, `xit`, "tests later". Failing tests block merge. Skip only when paired with a tracked followup (issue link, ticket ID) explaining why and when re-enable - naked `.skip` = debt.
- **No magic literals.** Every number/string with meaning gets a named constant in the right module.
- **Delete before add.** Best diff is negative.
- **4x = wrong approach.** Solution ~4x bigger than its core (200 lines for what fits in 50, 5 abstractions where 1 works) → approach wrong. Stop, rewrite from scratch. Patching no fix bad shape.
- **Boy Scout rule, bounded by file.** Leave every touched file cleaner than you found it, including lines the change did not need. Other files stay out of scope, except for red checks (see Done).

## Architecture

- **Deep modules, one concern.** Small interface, much behavior behind it. Functions do one thing. No god objects, no god services. Vocabulary and the deletion test: `codebase-design`.
- **Explicit over implicit.** Constructor injection / explicit parameters over hidden globals, inline singletons, magic framework injection that obscures data flow.
- **Boundaries are contracts.** Module/service boundary = public API. One validation layer at the boundary, no scattered guards inside business logic.
- **Dependencies point inward.** Infra and interface layers depend on domain core. Domain depends on nothing outside itself. Domain never imports infrastructure types.
- **Battle-tested patterns before inventing architecture.** Check production open-source first.
- **Understand framework before fighting it.** Feels wrong with framework → assumption wrong, not framework. Verify first.

## Design & Style

- **Clarity over cleverness.** Flat data over deep hierarchies. Indirection with no name that justifies it → remove.
- **Data structures over algorithms.** Right data layout makes algorithm obvious. Optimize shape first.
- **Refactor in small, safe steps.** Each step leaves code working. Rewrite and refactor never in the same commit.
- **Evolutionary design.** Design for next concrete requirement, not every hypothetical future. Extend when needed.
- **Screaming architecture.** Package/module = business purpose, not technical layer. Top-level: `Ordering`, `Billing`, `Inventory` - never `Controllers`, `Services`, `Repositories`.
- **Ubiquitous language.** Same terms in code, tests, domain conversations. Code says X, business says Y → code is wrong.

## API & Error Handling

- **Backward compatibility by default.** Additions safe; removals/renames break. Version or deprecate before removing.
- **Typed error models, not exceptions for control flow.** Exceptions = unexpected system failure. Business outcomes never live as exceptions.

## Planning

- **Plan before code.** Every non-trivial task starts with a written plan from the `exec-plan` skill. It owns what a plan contains, its template and format check, and its critic gate, which passes before any execution, no exception. Explore requirements and constraints before committing to a plan. One task = one concern = one verifiable outcome.

## Testing & Delivery

- **Done = plan met, reviewed, and verified output, not assertion.** "80% working" = 0% shipped. Before claiming complete/fixed/passing, and before every `git commit`: lint green, type check green, focused tests green. Actual output, not assumption. No green = no claim. A red check you did not cause is still yours: fix it when you meet it, in its own commit, even outside the files you touched.
- **Commit message = one line**, per `caveman-commit`. Details go in the PR description.
- **Verify the outcome, not the enabling change.** "Submit the eval job" is done when the job is submitted and accepted, not when the code that submits it looks right. Same for pushes, PRs, deploys, and answers to questions: check the thing itself.
- **Proxy signals are not proof.** A green build, a passing suite, or hours of effort count only where they cover every item the user asked for. Restate the asks as a checklist, including the non-code ones (operational, research, Q&A), and account for each.
- **Nothing gets deferred back that you could do.** Printing instructions for the user to run a command you have the tools to run is an unfinished task, not a handoff.
- **Test coverage is non-negotiable.** Every feature ships with tests. Untested code = unfinished code.
- **Integration tests at boundaries over unit tests with mocks.** Test service in isolation against real/stubbed ports. Over-mocked unit tests = false confidence, break on refactors.
- **Single focused tests over full-suite runs.** Narrowest test that covers the change. Run focused checks while working. If the repo defines a full local CI mirror and a moment for it, follow the repo; otherwise the full suite is CI's job.

## Types & Frontend

- **Strict types everywhere.** No `any`, no cast without a comment saying why. Discriminated unions over boolean flags. Domain concepts as value objects or branded types, validated at construction. Every error state in the type system, matched exhaustively. Details: `type-system-discipline`.

# T3 Code Tools

When T3 Code's tools are loaded, they replace your own for the same job:

- **Browser and app checks** → `preview_*` (open, navigate, resize, appearance, act, snapshot, recording); native apps → `device_*`. Details: `implement/UI.md`.
- **Secrets** → `request_secret`.
- **Waiting on background work** → `t3_background_wait`, never `sleep` or polling loops.
- **Charts and visuals in chat** → `html_preview`, then `html_render`.

# Workflow Triggers

User phrases below activate specific workflows. Follow the protocol literally.

## "Implement the plan" / "execute the plan"

- Use the `implement` skill. It owns the protocol.

## "Review the implementation" / "verify the implementation"

- Do NOT trust implementer's summary. Run `judo-review` with the plan as its Spec source: every Scope item and DoD bullet gets `PASS|FAIL|UNCLEAR` with its verify command's actual output.
- Findings → correction workflow: IMPLEMENT (one subagent per task) → VALIDATE (separate subagent per task) → REPORT.

## "Check your work" / "verify changes" / "self-verify"

- For plan-based work use the trigger above. This one covers sessions with no plan: an ad-hoc fix, an operational task, a question answered.
- Dispatch a fresh verifier subagent. The agent that did the work never verifies it.
- Verifier restates every ask as a checklist, including the non-code ones (operational, research, Q&A), then accounts for each with evidence it gathered itself, not from the transcript's claims.
- Operational claims get probed against the live system: curl the endpoint, invoke the CLI, query the API, check the job status. Reading the code that would do it is not evidence.
- Output: `PASS` or `FAIL`. On FAIL, the exact error output and what must change, with `file:line` where it is code.
- FAIL → fix, then re-verify. Max 2 rounds, then report what is left standing.

## "Review the plan" / "critique the plan"

- Use `exec-plan` (On-demand critique).

# Context Boundaries

- **Grilling through to a written plan stays in one window.** That chain reasons over what it just heard, so a compact costs it exactly the detail it needs.
- **At a phase boundary (grilling → building → verifying), keep going in the same window.** If it must break, write the artifact down first, then `/clear` or `/handoff`.

# Subagents

- **Subagent model = user default.** Never set `model` on Agent, Workflow `agent()`, or delegated tasks unless the user names a model for that work. Subagents never run on Opus: a PreToolUse hook denies an Opus model on Agent, Workflow and T3 tools, and denies `fork` (it inherits the Opus main model).
- **Subagent = leaf.** A subagent never spawns agents. Need more → return to top with what is missing and what to spawn next.

## When Top Agent Spawn

- **Broad exploration or large tool output → spawn.** Searches across many modules, long research, big logs. Top reads the summary, not the raw dump. A few targeted reads or greps stay in the top agent.
- **Large work = slices, one per subagent.** One slice = one concern, one verifiable outcome. No monolithic prompts. A medium feature that fits one context stays in one agent. Splitting it too fine loses shared context and breaks the seams.
- **Independent slices = parallel.** Multiple non-dependent tasks → one message, many `Agent` calls same block. Parallelize independent work; parallel writers follow the repo's worktree rule.
- **Non-trivial slice done → critic subagent review code before next slice.**

## Critic Subagent Rules

- **Critic = fresh context, never the writer.** Same agent self-approve = theatre. Brief = attack, not validate; a close call gets called out.
- **Each critic runs its skill.** Plan critic → `exec-plan` critic gate. Code critic → `judo-review`, plus every rule in `## Code Quality` and `## Architecture`. Acting on findings → `receiving-code-review`. The skill owns the brief and the output format.
- **Findings block progress.** Plan BLOCKER/MAJOR and code `merge-blocking` findings block until fixed. Dismissal is only for a finding that fails confirmation against the source, or one the user dismisses, each written with its reason; a confirmed finding is fixed, or deferred to a tracked plan when the user chooses. Quality bar: no code smell, no debt created, no debt left behind.
- **Review rounds: min 1, max 2.** Round 1 clean → done. Round 1 has BLOCKER/MAJOR → a second fresh critic verifies the fixes. Leftovers after round 2 → report to user, never a third loop.
