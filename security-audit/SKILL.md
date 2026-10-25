---
name: security-audit
description: Audit a repository or named scope for security issues using local tests, and fix verified findings in batches when requested.
disable-model-invocation: true
---

# Security Audit

Find vulnerabilities that violate a real trust boundary, then give owners the source evidence, safe reproduction, priority, and smallest effective fix. This is a defensive, source-first workflow. A candidate without a concrete affected principal, resource, or security outcome is not a confirmed finding.

## Operating modes

This skill is guidance by default. Loading it does not authorize the complete audit workflow or file creation.

- **Guidance mode**: For security questions, focused reviews, methodology, triage, or investigation of specific findings, use only the relevant parts of this skill. Do not automatically run all six phases, create an output directory, or write audit artifacts. You may launch focused agents when useful; they return results to the current task.
- **Full audit mode**: Use the complete workflow when the user explicitly asks to audit or pen-test a codebase, asks for a full, comprehensive, or end-to-end security review, or requests report artifacts. Run all six phases and write the files defined below.

An explicit audit request selects full audit mode. A question about named code selects guidance mode. Fix verified batches during the audit only when the user asks to fix issues. Editing this skill alone does not start an audit.

A change review of a PR or uncommitted diff is `judo-review`'s job. A security hunt over a named scope is this skill's job, even when that scope is a PR's diff.

## Platform terminology

This skill is agent-neutral:

- **Parent** is the agent that coordinates the run and owns shared state.
- **Task tool** is the platform's delegation or sub-agent mechanism.
- **`research` agent** is a delegated agent for focused source exploration and factual verification.
- **`general` agent** is a delegated agent for broad investigation and bounded local execution.
- **`subagent_type:`** in a heading names which of these two delegated agent roles runs that work.

Use equivalent platform capabilities while preserving role, write-isolation, prompt, and independence boundaries.

### Use agents where independence matters

The lead can perform reconnaissance and hunting directly. Delegate exploration only when size or distinct subsystems justify it. Keep the same structured evidence and producer ownership whether the lead or a worker performs the work; use canonical IDs such as `lead-hunt` for lead-owned checks.

Use fresh agents to challenge candidate findings, critique coverage, and review fixes. A reviewer must not have authored any finding or fix it reviews. One reviewer may cover a related batch when that independence holds for every item. In `standard` and `quick`, combine candidate and final-record checks in that independent review; `deep` adds a separate final-record review. Keep review decisions per fingerprint. If independent review is unavailable, keep the work unresolved rather than self-approve.

Every launch uses the harness's default subagent model. Delegated agents are leaves: only the parent launches agents. The parent appends this block verbatim to every delegated prompt, after the upstream prompt contract:

```text
Launch no agents. Return any further split of your assigned work to the parent as part of your result.
Name a secret, credential, token, connection string, or personal data by location and type, never by value. Write <REDACTED> where the value would go, including in observed_result and any copied output. Dummy fixture values stay as they are.
```

## Local execution policy

Use the owner's normal local development stack. Builds, tests, browsers, local HTTP clients, database fixtures, and bounded fuzzing may run directly on the machine. An OS sandbox, network namespace, empty environment, read-only checkout, or resource-control tool is not a prerequisite.

Before execution:

1. Read the target's agent instructions and discover its setup, security, testing, and verification rules. Follow its documented commands and any port, database, or runtime reservation procedure before servers or tests. Use the target's verification workflow when one exists; infer focused checks from its build/test configuration otherwise.
2. Verify effective runtime destinations without printing secret values. Confirm databases and storage contain test-owned data only. A local address alone is insufficient. Confirm email, payment, identity, webhook, analytics, and other outbound effects use local substitutes or disabled test adapters.
3. Use synthetic users, tenants, records, uploads, and test credentials. Existing local services may be reused after checking ownership, test data, configuration, and runtime ownership. The parent owns service startup, fixture resets, and cleanup; preserve services that predate the run.
4. Parallelize source inspection. Serialize builds and tests that share databases, fixtures, caches, generated output, or ports. Parallel execution needs independently isolated resources and explicit parent assignments.
5. Use normal repository environment loading without dumping the environment or reading unrelated host credentials. Repository-prescribed dependency setup, public documentation reads, and advisory lookups are allowed. New dependencies follow repository approval rules. Target requests go only to verified local test services; redirect, SSRF, callback, and webhook checks use local receivers.
6. Bound checks by input size, request count, concurrency, and timeout appropriate to the test. Stop at the smallest observable boundary violation. Availability tests use a dedicated disposable local process and small growth points, never host-wide stress.

If test ownership or outbound containment is unknown, block only the affected execution and continue source review and other checks. Record the exact missing fact as `needs_validation` when decisive. Missing sandbox features alone are never a blocker.

Production traffic, customer data, shared remote infrastructure, real provider side effects, paid API calls, publishing, and deployments require separate explicit authorization. This local workflow does not grant it.

### External exposure first

Map external and lower-trust entry points appropriate to the product: network APIs, browser input, authentication and recovery, uploads, callbacks, file parsers, CLI input, plugins, messages, and local IPC. Trace them through identity, authorization, validation, state, derived copies, and output. Then test low-privilege paths that reach more trusted authority. Select only surfaces actually present in source.

Prioritize exploitable external paths without excluding internal controls they depend on. Check applicable attack classes and sibling paths, including failed, stale, concurrent, replayed, and cross-tenant requests. Track every discovered surface in the coverage ledger, including explicit exclusions and blockers. Local evidence does not establish deployed proxy, provider, or identity settings; report those gaps. No finite audit proves every possible issue absent.

## Full audit setup

In full audit mode, resolve these values before reconnaissance:

- **Skill directory**: the absolute directory containing this `SKILL.md`.
- **Target**: the absolute repository root under review.
- **Repo name**: a stable repository identifier from the directory or local Git remote.
- **Output directory**: a new writable directory outside the target, defaulting to `~/security-audit-skill/<repo-name>/run-<N>`, where `<N>` is the next unused integer. Use a directory inside the target only when the user explicitly selects it and the parent verifies that version control ignores the whole directory. Otherwise stop and request an external path.
- **Source ref**: the reviewed commit, dirty status, and a content manifest of reviewed source paths and hashes, including relevant untracked source. Keep configuration and secret files out of retained source artifacts. Before repairs, preserve reviewed non-secret dirty source under `<output-dir>/baseline-source/` and link its manifest in run metadata. If required source contains secrets, retain a redacted copy and its content identity, record the reconstruction limit, and never copy raw values. Do not treat generated files or post-fix edits as the reviewed revision.

### Write isolation

The parent creates and is the only writer of shared run files:

- `run-metadata.json`
- `architecture.md`
- `coverage-ledger.json`
- `findings.json`
- `REPORT.md`
- `FINDINGS-DETAIL.md`
- `NEEDS-VALIDATION.md`
- `source-index.json`
- `REMEDIATION.md` when fixes are requested

Each hunter or verifier receives a unique root under `<output-dir>/agents/<agent-id>/`, with `scratch/` for temporary work and parent-owned `artifacts/` for retained evidence. Canonical agent IDs match `^[a-z0-9][a-z0-9_-]{0,63}$` and exclude Windows device names (`con`, `prn`, `aux`, `nul`, `com1` through `com9`, `lpt1` through `lpt9`). Hunters and verifiers do not edit source or shared run files. Normal build/test output may use repository-prescribed locations under the parent's execution assignment.

For every delegated prompt, include the complete Local execution policy above and this evidence contract:

```text
Write temporary fixtures and captured results to your assigned scratch directory.
Return exact commands, test inputs, reviewed source paths, expected and observed
results, and proposed evidence files. Redact secrets and personal data before output.
The parent retains only reviewed, redacted regular files under the producing agent's
artifacts directory. Reject links, special files, unrelated dumps and oversized logs.
Ordinary file inspection and copying are sufficient; descriptor-based promotion is
not required. A local ledger check links agents/<check.agent_id>/artifacts/<file>.
Never edit another agent's files or shared run records. Normal repository build/test
writes require the parent's execution assignment. Source edits belong to remediation.
```

Record each reproduction's exact command, synthetic input, runtime configuration names, safe test values, bounds, and observed result. Never copy the ambient environment, real credential values, session state, or customer records. Retain only evidence needed to assess the finding.

Before delegation, the parent writes `run-metadata.json` with at least `run_id`, `repo`, `target`, `source_ref`, `profile`, `scope_paths`, `budget` (null if unset), `execution_policy: "owner-local"`, selected companion files, prior-run paths, shared-file owners, and `run_status: "in_progress"`. Update metadata only when those facts change; candidate state belongs in the coverage ledger and `findings.json`.

## Full audit planning

The coverage, prior-run, profile, and budget requirements in this section apply only in full audit mode.

### Coverage and prior runs

No one pass is complete. Build a deterministic coverage plan before hunting and update it after every agent result. [RECONNAISSANCE.md](RECONNAISSANCE.md) defines the stable coverage units and [HUNTING.md](HUNTING.md) defines coverage-critic waves. The parent alone updates the ledger.

If prior runs exist, read every compatible `coverage-ledger.json` and `findings.json` before planning the current run:

1. Compare the relevant current source with each prior record and unit. A prior source ref alone is not evidence that a path is unchanged.
2. Carry a prior `confirmed` record into the current candidate set only when its relevant source and conditions are unchanged and its evidence still meets the current contract. Link it to a current ledger unit seeded `planned`, preserve its fingerprint, exclude only that carried root cause from hunters, and send the carried record through the current final verification path; the Phase 3 verifier that re-checks it becomes that unit's assignment owner and moves it to `candidate`.
3. When relevant source for a prior `confirmed` record changed, create a current planned revalidation unit. Do not put that record on the hunter exclusion list. It remains confirmed only if current independent validation establishes the current path and result.
4. Make prior `needs_validation`, `deferred`, `blocked`, `out_of_scope`, and any changed-source unit current work. A still-external `needs_validation` record may be carried only after the current source trace is checked and linked by fingerprint to a current `planned` unit whose verifier re-check supplies its owner and evidence; the record keeps the unresolved blocker. These prior states never suppress a current unit.
5. A prior same-source covered unit may inform priority, but it remains visible in the current ledger. A prior `rejected` record suppresses only the unchanged failed claim, not coverage of its unit; changed evidence creates current work.
6. Read the prior profile and scope. A prior `quick` or scoped ledger contributes only its recorded evidence and gaps, never an implied "rest is fine."

If no prior ledger exists, say so in the final coverage statement. Never imply that one run exhausts the target.

### Run profiles and scope

During full audit setup, pick a profile from the user's request or propose one from the target's size and stakes. Record it in `run-metadata.json` (`profile`, `scope_paths`) and state it in the report. Default to `standard`. Select `deep` for high-stakes or large targets, or when requested.

- **`quick`** - a bounded pass for small targets, re-runs, or a fast first look. Coarsen ledger units to surface × boundary × attack class (subsystem uses the fixed canonical `profile/quick/all-in-scope-subsystems` identifier), run exactly one hunter wave followed by exactly one final coverage-critic pass, and combine candidate validation and final record verification in one independent review; related candidates may share a verifier. Do not launch a follow-up discovery wave: record the critic's accepted discoveries and reassignments as `deferred`. Requested repairs may still run separately budgeted regression checks, fresh-owner affected-unit rechecks, and independent affected-coverage reviews without expanding discovery scope.
- **`standard`** - coverage-led waves with one independent candidate/final-record review per related batch.
- **`deep`** - for high-stakes or large targets. Split ledger units per subsystem and lifecycle mode, run critic waves to a clean pass, keep candidate validation and final record verification as separate fresh agents, and give `prior_covered_same_source` units an independent second pass.

A **scoped run** audits a subset: named paths, one subsystem, one companion domain, or the diff between two source refs. Seed ledger units only for in-scope surfaces and record everything else as `out_of_scope` - never as `covered`. A scoped or `quick` run must present itself as partial coverage.

Profiles change breadth and redundancy, never the evidence bar. Do not scale away the candidate gate, the source/local execution boundary, `needs_validation` discipline, schema validation, or independent verification of `confirmed` records.

#### Cost budget

Before any agent launches, show the user the profile, scope, chosen staffing, and proposed invocation budget. Wait for them to accept, change, or remove it. Record `budget` in run metadata as the accepted maximum, or null when unset. Count every delegated exploration, hunter, coverage critic, finding verifier, fix reviewer, and repair-triggered coverage reviewer.

Reconnaissance has no fixed agent minimum. Reserve calls for the selected exploration, required coverage critics, and independent finding validation before hunting. `quick` reserves one final post-wave critic; `standard` and `deep` reserve the immediate post-wave critic plus the distinct final-clean critic. Estimate review calls by related batches: one candidate/final-record pass in `quick` and `standard`, two independent passes in `deep`. Add reservations when new candidates appear. Lead-owned source work consumes no agent invocation but remains subject to the evidence contract.

If a strict budget cannot fund these reserves, launch no agent that spends them. Propose a narrower scope, different profile, or larger budget. If unchanged, set `run_status: "incomplete"` with reason `budget_cannot_fund_reconnaissance_and_reserves` and disclose what did not run. Before wave 1, update the estimate from the actual ledger and seek acceptance again if it no longer fits.

Before every later wave, preserve the validation reserve, reserve its immediate critic, and retain the final-clean critic. Assign hunters by priority only within the remaining allowance. If those reserves do not fit, mark untouched planned work `deferred` with reason `budget_cannot_reserve_critics_and_validation`. If the required final critic cannot run, set the audit incomplete with reason `critic_budget_exhausted`; make no complete-coverage claim.

Before a repair batch starts, separately reserve its independent fix review and affected-coverage review. Preserve all mandatory audit reserves. If these repair reserves do not fit, leave the batch pending in `REMEDIATION.md` with the exact budget reason and continue fundable audit work. Never spend audit reserves on repairs or claim an unreviewed fix complete.

If a strict budget cannot validate every candidate, stop hunting and validate in fingerprint order while it permits. Set `run_status: "incomplete"` with reason `validation_budget_exhausted`. Keep unvalidated candidates only in the ledger, linked to their fingerprints and unresolved reason; never relabel them `needs_validation` or place them in `findings.json`. The partial report lists all affected fingerprints and units. Never exceed the accepted budget silently.

## Core principles

### Require a boundary and result

For every candidate, name the lower-trust principal, accepted input or action, intended control, crossed boundary, affected principal or resource, and concrete observed or owner-observable result. Do not elevate a missing best practice, guessed deployment behavior, generic parser crash, or self-impact into a security finding.

### Redact evidence

The parent applies the redaction line of the delegated-prompt block under Platform terminology to every record and report it writes.

### Use bounded local evidence

Static analysis establishes the source path. Tests on the verified local development stack resolve behavior: a minimal function harness, existing unit test, small parser fixture, dummy-tenant integration test, locally rendered configuration, or bounded local HTTP client. Stop at a wrong return value, unauthorized dummy record, sanitizer finding, policy difference, or other minimum effect. Do not extend the local check beyond the minimum boundary result or produce persistence, post-fault, or concealment material.

### Respect source visibility

Deployment controls, proxy behavior, provider settings, browser headers, identity policy, broker ACLs, packaging, and topology are real controls. If they are required and absent from the repository, do not assume either presence or absence. Use `needs_validation` with the exact missing fact and a safe owner-observed or local plan.

### Separate priority from certainty

Only `confirmed` records receive severity. Likelihood and impact must reflect the demonstrated conditions and result; overall severity cannot exceed demonstrated impact. `needs_validation` means a specific source-grounded boundary hypothesis is blocked, not a low-confidence confirmed vulnerability, and it has no severity.

Calibrate overall severity with these anchors:

- **critical** - an unauthenticated actor gains code execution, full data-store access, or takeover of arbitrary accounts.
- **high** - an actor fully defeats an explicit security control with real consequences: authentication bypass, cross-tenant read or write, stored script execution affecting other users, authenticated code execution, or an unauthenticated remote stop of a shared service.
- **medium** - a real boundary violation with limited blast radius, uncommon preconditions, or consequences confined to a narrow resource set.
- **low** - disclosure of non-secret internals, or an effect requiring sustained effort for minimal gain.
- **informational** - a confirmed but minimal-impact observation, useful mainly as a prerequisite inside a larger finding.

The high/medium discriminator: does the demonstrated result fully defeat an explicit control for an action with real consequences, or only weaken it? If you cannot state the concrete damage, the severity is lower than it feels.

### Recommend the smallest effective source fix

For each confirmed finding, identify the invariant the code must enforce and the narrowest source change that enforces it at the last trusted decision point. Prefer specific repository-relative changes and regression tests over generic hardening advice. Hunters and verifiers describe fixes without editing source. Each requested repair batch starts only after its independent validation and baseline checkpoint.

## Full audit workflow

In full audit mode, start with reconnaissance, then run the remaining phases as a pipeline. A ready candidate batch can pass validation, structured output, and independent record checks while other hunting continues. Report verified progress, then produce the final reports after coverage ends. Requested repairs may start at each verified batch checkpoint:

1. **Reconnaissance** - map the source, trust boundaries, local build paths, companion selections, prior evidence, and initial deterministic coverage ledger with [RECONNAISSANCE.md](RECONNAISSANCE.md).
2. **Coverage-led hunting waves** - investigate ledger units directly or assign bounded hunters and collect structured candidate results with [HUNTING.md](HUNTING.md), [ATTACK-CLASSES.md](ATTACK-CLASSES.md), and the selected domain companions.
3. **Candidate validation** - consolidate fingerprints and give related candidate batches to an independent source verifier as defined in [VALIDATION-AND-REPORTING.md](VALIDATION-AND-REPORTING.md).
4. **Structured output** - write all final `confirmed`, `needs_validation`, and `rejected` records to `findings.json`; validate it with `report-schema.json` and `validate-findings.cjs`, and validate the coverage claim with `validate-coverage-ledger.cjs`.
5. **Independent record verification** - verify final records against their recorded source; combine with candidate review in standard/quick and use a separate fresh reviewer in deep.
6. **Target-neutral report** - derive `REPORT.md`, `FINDINGS-DETAIL.md`, and `NEEDS-VALIDATION.md` from the final records, with no live-probe instructions. Before writing their prose, call the Skill tool with `no-ai-slop`.

Do not end the run before one of exactly two terminal states: (a) all Phase 6 artifacts are written and both validators pass, or (b) `run_status: "incomplete"` is recorded with its exact reason and the gap is disclosed in the report. Never stop mid-phase.

## Requested remediation

For audit-only requests, stop after the report without editing target source. When fixes are requested, fix verified findings in small batches ordered by severity, external reachability, and shared root cause. Do not wait for unrelated hunting to finish. Plan each batch with `exec-plan` and follow the target repository's implementation, security, and verification rules.

Before editing a batch, complete its candidate/final-record review and both schema checks. Freeze its verified records, ledger checkpoint, source manifest, dirty/untracked source snapshots, and reproduction artifacts under `<output-dir>/batches/<batch-id>/`. Exclude environment files, credentials, and unrelated data. Preserve confirmed baseline records after a fix; they describe the source where the defect was established.

Maintain `<output-dir>/source-index.json` outside the finding schema. Map every fingerprint and evidence check, every live coverage unit, and every archived attempt to an immutable source manifest. Retain associations for covered and blocked units that have no fingerprint. Record batch IDs, checkpoint paths, and before/after source refs. Unaffected coverage keeps its recorded revision; carrying its claim to a later revision requires explicit equivalence evidence for relevant source, configuration, and conditions.

Pause hunters and verifiers whose paths, dependencies, fixtures, or runtime state overlap the repair. If the overlap is unclear, pause execution until mapped. Unrelated source hunting may continue. Before source mutation, finish affected assignments on the old source or mark their evidence invalid and reassign them; never combine partial pre-fix and post-fix checks as one claim.

For each finding, reproduce the defect before the fix, enforce the invariant at the trusted boundary, and add a regression test that fails before and passes after. Check sibling paths sharing the root cause. Run focused tests and required repository lint/type checks, then obtain independent review of the coherent batch. A fix reviewer must not have implemented that batch. Serialize source edits and shared runtime tests. Resolve locally answerable blockers; keep unavailable deployment facts explicit. Hardening notes remain separate from confirmed vulnerabilities.

After changes, reopen affected evidence-bearing coverage using the ledger's archived-attempt procedure. Preserve old fingerprints and source associations in the archive and source index. Recheck affected paths on the new source with fresh ownership; do not transfer old evidence silently. A clean post-fix live unit is `covered` with no candidate fingerprint. If the same defect persists, link its current evidence to the existing fingerprint in the source index without overwriting its historical baseline record. A different root cause needs a new fingerprint and independent validation.

`findings.json` keeps one independently verified historical record per fingerprint, checked against its recorded source checkpoint. Post-fix outcomes belong in `REMEDIATION.md` and the source index, not as duplicate or replacement verdicts in that file. Map each fingerprint to its batch, fix, baseline and post-fix manifests, regression command/result, independent review, and remaining blockers. A batch is complete only when its regressions, required checks, independent fix review, and affected-coverage review pass. Record pending or failed repairs separately from audit completion. Final reports distinguish historical findings, current repair status, source revisions, and unfinished coverage. Follow repository gate requirements before any PR-ready claim. Commit, push, deploy, migration, and dependency approvals follow the user's request and target rules.

## Anti-patterns

1. Checklist deviations presented as vulnerabilities.
2. Defense-in-depth advice with no reachable boundary violation.
3. Live or shared-environment testing where bounded local evidence is insufficient.
4. Guessing provider, proxy, browser, identity, or deployment behavior not present in source.
5. Treating intended same-principal authority or self-impact as a cross-boundary result.
6. Reporting a parser or runtime effect stronger than the observed effect.
7. Emitting prose-only hunter results that cannot be deduplicated or verified.
8. Re-reporting carried same-source prior confirmed records or using them as exemplars that anchor the hunt.
9. Assigning severity to `needs_validation` records.
10. Writing the report before independent verification or letting prose and JSON disagree.
