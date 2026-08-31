---
name: judo-review
description: Code-judo review for PRs, branch diffs, committed local changes, uncommitted changes, or named code. Use when reviewing code for correctness, requirements, structural simplification, spaghetti growth, boundaries, tests, security, or over-engineering.
---

# Code Review

Run a code-judo review of the requested change: preserve behavior, but hunt for the structure that makes the implementation simpler, more inevitable, and easier to maintain.

## Stance

Attack the change, do not validate it. Ask "what is wrong here?", not "is this right?". Behavior can be correct and still fail review if the change makes the codebase harder to understand, extend, or safely modify.

The bar is **code purism**: the best solution available, not an acceptable one. Judge the diff against the shape an expert would build knowing the whole codebase and carrying no deadline, then report the gap. Keep hunting for the judo move even when the diff already passes every named check - the review's job is the better shape, not a clean scorecard.

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
   - Done when every rule file governing a touched path has been read, and the governing intent for each task cluster is named or recorded as absent.

3. **Read the diff and source.**
   - Read the full diff and enough surrounding code to understand the changed flow.
   - Check focused call sites or contracts only when a concrete risk requires it.
   - Do not trust summaries, test claims, or author rationale without evidence.
   - Done when every changed hunk is accounted for: each one either produced a finding or you can say in one sentence why it is clean.

4. **Review on both axes**, keeping their findings apart.
   - Prioritize structural findings over local polish.
   - Prefer high-conviction blockers over long nit lists.
   - Done when every pass has run against every changed hunk, and both axes hold their own list, each list either carrying findings or stating that none met the bar. A diff that passed every pass still owes the purism question: is the better shape visible from here?

## Two axes

Every review is two independent reviews, reported side by side.

- **Standards**: does the change meet the bar? Sources are the repo's own rule files and the review passes below. Reviewing this axis, and only this axis, also read [`STANDARDS.md`](STANDARDS.md) for the smell and comment baseline.
- **Spec**: does the change do what was asked? Sources, in order: the current user's request, then a governing plan, then a ticket or issue, then the PR description, then issue refs in the commit messages. Report "No spec available" only when none of these sources states requirements; it is a finding, not a skipped axis.

A branch is a **batch**: it usually carries several unrelated small tasks the author chose to ship together, and that packaging decision is already made. Split the diff into coherent task clusters, match each cluster to its own spec source, and answer the spec question per cluster. Where a cluster has no spec source, report that gap for the cluster and judge its code on Standards. Recommending a different branch, PR, or commit split is out of scope for both axes; say what the code gets wrong instead.

A diff can be clean code that builds the wrong thing, or the right feature built badly. Merging the two lists, or re-ranking one against the other, hides exactly that. Each axis keeps its own findings.

Three ways this runs. As the top agent reviewing directly, dispatch one subagent per axis in parallel, each with its own scope and sources. As the top agent handing the whole review to one critic, that critic becomes the reviewer subagent and splits the axes itself, which is how `orchestrate` uses it. Already a reviewer subagent: run both axes yourself, in sequence, outputs still separate. A subagent never spawns.

## Baseline

> Perform a deep code quality audit of the current branch's changes.
> Rethink how to structure / implement the changes to meaningfully improve code quality without impacting behavior.
> Work to improve abstractions, modularity, reduce Spaghetti code, improve succinctness and legibility.
> Be ambitious, if there is a clear path to improving the implementation that involves restructuring some of the codebase, go for it.
> Be extremely thorough and rigorous. Measure twice, cut once.

## Review Passes

The Standards axis applies these passes in order. Requirement fit belongs to the Spec axis: compare each task cluster to what was asked for it, and flag missing requirements, misunderstood requirements, and behavior that goes beyond what any task in the batch asked for.

1. **Correctness and regressions**: logic errors, missing edge cases, race conditions, broken error handling, behavior that contradicts the request, and tests that are missing, circular, over-mocked, or failing to cover the changed behavior.
2. **Structural simplification**: look for a code-judo move that deletes concepts, branches, helpers, modes, conditionals, layers, or state rather than polishing them. Prefer the structure that feels inevitable in hindsight.
3. **Spaghetti growth**: flag ad-hoc conditionals, one-off booleans, nullable modes, scattered feature checks, repeated conditionals, and special cases bolted into unrelated flows.
4. **Boundaries and types**: flag feature logic in shared paths, implementation details leaking through APIs, unnecessary `any` / `unknown` / casts / optionality, and silent fallback hiding unclear invariants.
5. **Canonical ownership**: prefer existing utilities, helpers, packages, services, and domain concepts over bespoke near-duplicates or logic in the wrong layer.
6. **Over-engineering**: hunt thin wrappers, identity abstractions, pass-through helpers, speculative flexibility, generic magic, unnecessary dependencies, and hand-rolled standard-library/native behavior.
7. **Orchestration and atomicity**: flag independent async work serialized for no reason, or related updates that can leave half-applied state when a cleaner atomic structure is obvious.
8. **File size and decomposition**: if a change pushes a file from below 400 lines to above 400 lines, or from below 400 lines toward an 800-line sprawl, treat it as a presumptive blocker and ask whether it should be decomposed first. Waive only for a compelling structural reason and a still-scannable file.

## Approval Bar

A green test run is not approval, and neither is behavior that seems correct. Treat every shape below as a presumptive blocker until a stated structural reason clears it. Purism decides what counts as a reason: a structural constraint in the codebase can clear a shape, while "it works", "good enough for now", "pragmatic", author deadline, and "we clean it up later" clear nothing.

- A plausible simplification would delete a meaningful category of complexity.
- A task in the batch misses its stated requirement, misunderstands it, or ships behavior beyond it.
- The diff preserves incidental complexity while only moving it around.
- A file crosses from below 400 lines to above 400 lines due to the change.
- New branching makes an existing flow more tangled.
- Feature checks leak across shared/general-purpose code.
- A wrapper, abstraction, dependency, generic mechanism, cast, or optional contract adds indirection without making the model clearer.
- Logic duplicates a canonical helper or lives outside the layer that owns the concept.
- Related updates can leave half-applied state where an atomic structure is obvious.
- Tests are missing, circular, over-mocked, or fail to cover the behavior being changed.
- The review found named smells but no judo move, on a diff where a better shape is visible.

Where the best fix is real but too large for this change, the finding becomes a `followup-execplan`, never a waiver.

## Disposition

Every finding gets one disposition:

- `merge-blocking`: local enough to fix in this change; blocks approval.
- `followup-execplan`: real structural issue, but too large for this change. Describe the move, why, and rough blast radius. Reported every time, and does not block approval by itself.

## Preferred Remedies

Push for remedies that reduce the number of concepts a reader must hold. Reach for `codebase-design` here: its deep-module vocabulary and its deletion test are what turn a vague "this feels tangled" into a named move.

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

When the structural problem is bigger than this diff - shallow modules, tangled callers, a missing seam across several files - the remedy is not a review comment. Raise it as a `followup-execplan` and recommend the user run `/improve-codebase-architecture`, which scans for the deepening opportunity and grills through the fix. It is user-invoked, so name it as the next move rather than trying to reach it from here.

## Output

Two headed sections, `## Standards` then `## Spec`, each leading with its own findings. Within Standards, structural findings lead - every pass but correctness - then correctness, security, test, and maintainability findings, ordered by severity inside each group. Within Spec: group findings by task cluster, then order requirement misses, extras, misunderstandings.

For each finding include:

- Severity: `BLOCKER`, `MAJOR`, or `MINOR`
- Disposition: `merge-blocking` or `followup-execplan`
- Location: `path:line` or the smallest accurate range
- Problem: direct statement of what is wrong and why it matters
- Evidence: source, diff, rule, test output, or command result that proves the issue
- Remedy: concrete shape of the fix, favoring simplification over rearrangement

When a plan governs the change, the Spec section includes `PASS | FAIL | UNCLEAR - <Scope/DoD item> - <evidence>` for each relevant item.

Include commands run with actual output, not assumptions. One verdict closes the review, after both sections: `APPROVE`, `CHANGES REQUESTED`, or `BLOCKED`, decided from `merge-blocking` findings on either axis.

Prefer a small number of high-conviction findings over a long nit list. If no issues meet the bar, say that clearly and mention any residual test or scope risk.

Tone: direct, serious, demanding. Do not soften structural regressions into style suggestions.
