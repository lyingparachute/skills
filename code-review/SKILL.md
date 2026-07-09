---
name: code-review
description: Code-judo review for PRs, branch diffs, committed local changes, uncommitted changes, or named code. Use when reviewing code for correctness, requirements, structural simplification, spaghetti growth, boundaries, tests, security, or over-engineering.
---

# Code Review

Run a code-judo review of the requested change: preserve behavior, but hunt for the structure that makes the implementation simpler, more inevitable, and easier to maintain.

## Stance

Attack the change, do not validate it. Ask "what is wrong here?", not "is this right?". Behavior can be correct and still fail review if the change makes the codebase harder to understand, extend, or safely modify.

Treat every implementer summary, PR description, prior agent claim, and design rationale as a hypothesis until source proves it. Verify findings against source before reporting them.

If running as a reviewer subagent, stay readonly and leaf-only: do not edit files, mutate git state, or spawn another agent.

## Workflow

1. **Determine scope and base.**
   - PR / branch review: review current branch changes against the PR base or merge-base with the default base branch. Include committed, staged, and unstaged changes unless the user narrows scope.
   - Local committed changes: review current branch commits against their base. Do not assume "local" means only uncommitted.
   - Uncommitted review: review only staged and unstaged changes.
   - Specific commit, range, file, or pasted diff: review exactly that scope.
   - If the wrong base would change the review, ask one question before reviewing.

2. **Load governing context.**
   - Read repo instructions and rule files relevant to touched code before judging style, architecture, tests, security, or domain constraints.
   - When a plan, issue, or PR description governs the change, use it as intent and acceptance context.
   - Do not review plan/admin/doc hygiene unless explicitly asked, or unless it makes a false claim about shipped code or verification.

3. **Read the diff and source.**
   - Read the full diff and enough surrounding code to understand the changed flow.
   - Check focused call sites or contracts only when a concrete risk requires it.
   - Do not trust summaries, test claims, or author rationale without evidence.

4. **Apply the review passes below.**
   - Prioritize structural findings over local polish.
   - Prefer high-conviction blockers over long nit lists.

## Baseline

> Perform a deep code quality audit of the current branch's changes.
> Rethink how to structure / implement the changes to meaningfully improve code quality without impacting behavior.
> Work to improve abstractions, modularity, reduce Spaghetti code, improve succinctness and legibility.
> Be ambitious, if there is a clear path to improving the implementation that involves restructuring some of the codebase, go for it.
> Be extremely thorough and rigorous. Measure twice, cut once.

## Review Passes

Apply these passes in order:

1. **Requirement fit**: when a task, plan, issue, or PR description exists, compare the diff to it. Flag missing requirements, extra unrequested work, and misunderstood requirements.
2. **Correctness and regressions**: logic errors, missing edge cases, race conditions, broken error handling, test gaps, behavior that contradicts the request.
3. **Structural simplification**: look for a code-judo move that deletes concepts, branches, helpers, modes, conditionals, layers, or state rather than polishing them. Prefer the structure that feels inevitable in hindsight.
4. **Spaghetti growth**: flag ad-hoc conditionals, one-off booleans, nullable modes, scattered feature checks, repeated conditionals, and special cases bolted into unrelated flows.
5. **Boundaries and types**: flag feature logic in shared paths, implementation details leaking through APIs, unnecessary `any` / `unknown` / casts / optionality, and silent fallback hiding unclear invariants.
6. **Canonical ownership**: prefer existing utilities, helpers, packages, services, and domain concepts over bespoke near-duplicates or logic in the wrong layer.
7. **Over-engineering**: hunt thin wrappers, identity abstractions, pass-through helpers, speculative flexibility, generic magic, unnecessary dependencies, and hand-rolled standard-library/native behavior.
8. **Orchestration and atomicity**: flag independent async work serialized for no reason, or related updates that can leave half-applied state when a cleaner atomic structure is obvious.
9. **File size and decomposition**: if a change pushes a file from below 400 lines to above 400 lines, or from below 400 lines toward an 800-line sprawl, treat it as a presumptive blocker and ask whether it should be decomposed first. Waive only for a compelling structural reason and a still-scannable file.

## Approval Bar

Do not approve merely because tests pass or behavior seems correct. Treat these as presumptive blockers unless clearly justified:

- A plausible simplification would delete a meaningful category of complexity.
- The change misses, exceeds, or misunderstands a stated requirement.
- The diff preserves incidental complexity while only moving it around.
- A file crosses from below 400 lines to above 400 lines due to the change.
- New branching makes an existing flow more tangled.
- Feature checks leak across shared/general-purpose code.
- A wrapper, abstraction, dependency, generic mechanism, cast, or optional contract adds indirection without making the model clearer.
- Logic duplicates a canonical helper or lives outside the layer that owns the concept.
- Tests are missing, circular, over-mocked, or fail to cover the behavior being changed.

Use `followup-execplan` instead of blocking when the best fix is real but too large for the current change. Do not let broad architectural opportunities disappear; report them as plan candidates.

## Disposition

Every finding gets one disposition:

- `merge-blocking`: local enough to fix in this change; blocks approval.
- `followup-execplan`: real structural issue, but too large for this change. Describe the move, why, and rough blast radius. Does not block approval by itself.

Do not let big architectural ideas silently block a well-scoped PR. Do not let them vanish either.

## Preferred Remedies

Push for remedies that reduce the number of concepts a reader must hold:

- Delete an unnecessary layer instead of polishing it.
- Reframe the state model so conditionals disappear instead of getting centralized.
- Move ownership so the feature becomes a natural extension of an existing abstraction.
- Turn special cases into a simpler default flow with fewer exceptions.
- Extract a focused helper, pure function, module, or component.
- Replace condition chains with an explicit typed model or dispatcher.
- Separate orchestration from business logic.
- Collapse duplicate branches into one clearer flow.
- Reuse the canonical helper.
- Make type boundaries explicit so control flow gets simpler.
- Parallelize independent work when it also simplifies orchestration.
- Make related updates atomic when partial state would be hard to reason about.

Do not settle for rename-level feedback when the real problem is structural. Do not settle for a cleaner version of the same messy idea when a much simpler model is visible.

## Output

Lead with findings, ordered by severity and review priority:

1. Requirement misses, extras, or misunderstandings
2. Structural code-quality regressions
3. Missed code-judo simplifications
4. Spaghetti / branching complexity
5. Boundary, abstraction, and type-contract problems
6. File-size and decomposition concerns
7. Correctness, security, test, and maintainability issues

For each finding include:

- Severity: `BLOCKER`, `MAJOR`, or `MINOR`
- Disposition: `merge-blocking` or `followup-execplan`
- Location: `path:line` or the smallest accurate range
- Problem: direct statement of what is wrong and why it matters
- Evidence: source, diff, rule, test output, or command result that proves the issue
- Remedy: concrete shape of the fix, favoring simplification over rearrangement

When a plan governs the change, include `PASS | FAIL | UNCLEAR — <Scope/DoD item> — <evidence>` for each relevant item.

Include commands run with actual output, not assumptions. End with `APPROVE`, `CHANGES REQUESTED`, or `BLOCKED`; decide from `merge-blocking` findings only.

Prefer a small number of high-conviction findings over a long nit list. If no issues meet the bar, say that clearly and mention any residual test or scope risk.

Tone: direct, serious, demanding. Do not soften structural regressions into style suggestions.
