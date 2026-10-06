# <Short, action-oriented title>

Status: draft - <what is pending, e.g. "critic round 1 pending">

Tier: <capability key or "all plans"> - <why, by the repo's placement rule>. Delete this line when the product has no paid tiers.

This ExecPlan is a living document. Progress, Surprises & Discoveries, Decision Log and Outcomes & Retrospective are kept current as work proceeds. Repo plan rules: <path to the repo's own plan rules, or "none">. Starts after: <plan titles, or "nothing">.

## Progress

- [x] (2026-01-01 13:00Z) Example completed step.
- [ ] Example incomplete step.
- [ ] Example partly done step (done: X; remaining: Y).

Updated at every stopping point. This list, not memory, says where the work is.

## Background / why now

Start with the outcome: what someone can do after this plan that they cannot do today, and how they see it working. Then what is wrong today, with evidence (`file:line`, a measurement, a user report), and what happens if it waits.

## User stories

1. As an <actor>, I want <capability>, so that <benefit>.

Internal or refactor work with no external actor: say so here and leave the list out.

## Scope and non-goals

In scope: <every capability, each traceable to a story>.

Non-goals: <what a reader might expect here but must not build>.

## Context and orientation

The current state for a reader who knows nothing: key files and modules by repo-relative path and how they fit together, every term that is not ordinary English defined here, existing seams and prior-art tests.

## Locked decisions

Every architecture choice the implementer must not reopen: module boundaries, public API shape, data model, dependency direction, security sources, the interfaces that must exist at the end. One entry per decision, with its reason.

## Alternatives considered

Each option rejected, and why.

## Invariants, risks and open questions

Invariants that must hold throughout. Risks with their mitigation and a safe retry or rollback path; steps are safe to run twice. Open questions with the assumption the plan proceeds on.

## Milestones

### Milestone 1 - <Short sentence-case title>

Goal: what exists at the end of this milestone that did not exist before.

Work: the edits and additions, by module or file, without code.

Seam: the test seam and prior art.

Proof: the command to run, from which directory, and what it prints. Phrase it as behavior a person can check ("GET /health returns 200 OK"), or as a test that fails before and passes after, never as "added a class".

A milestone that settles a risky unknown is labeled prototyping and states how to promote or discard its result.

#### <Optional sub-part>

Detail that belongs to this milestone only.

### Milestone 2 - <Short sentence-case title>

Goal: ...

Work: ...

Seam: ...

Proof: ...

## Surprises & Discoveries

- Observation: ...
  Evidence: a short excerpt of test output, a log line or a measurement.

## Decision Log

- Decision: ...
  Rationale: ...
  Date/Author: ...

## Outcomes & Retrospective

Outcomes, gaps and lessons, compared with the purpose. Filled at major milestones and at completion.

## Definition of done

- [ ] <Binary check>: `<exact command>` prints `<expected output>`.

Revision notes: one dated line per revision, saying what changed and why.
