---
name: tdd
description: Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.
---

# Test-Driven Development

TDD is the red → green loop. This skill is the reference that makes that loop produce tests worth keeping: what a good test is, where tests go, the anti-patterns, and the rules of the loop. Every section applies on every cycle - consult them before and during the loop, not after.

When exploring the codebase, read `CONTEXT.md` (if it exists) so test names and interface vocabulary match the project's domain language, and respect ADRs in the area you're touching.

## What a good test is

Tests verify behavior through public interfaces, not implementation details. Code can change entirely; tests shouldn't. A good test reads like a specification - "user can checkout with valid cart" tells you exactly what capability exists - and survives refactors because it doesn't care about internal structure.

A good test is **falsifiable**: you can name the exact change to the implementation that would turn it red. Before accepting green, say it out loud: "this test fails if the code does X instead." Can't name that change? The test passes by construction. It's aimed at the wrong code, or it restates what it tests, so it proves nothing and only costs maintenance. Delete it.

See [tests.md](tests.md) for examples and [mocking.md](mocking.md) for mocking guidelines.

## What deserves a test

Before writing a test, name the branch, calculation, validation, or state transition it protects. Can name one? Test it. Can't? The unit is logic-free and the test only adds maintenance, so skip it. Behavior breaks at branches, loops, calculations, validation, state transitions, and money/auth/security paths; that's where tests earn their keep.

Logic-free code (trivial CRUD passthroughs, getters/setters, DTO/field mapping, config, framework glue) has nothing that can break, so a test over it is pure cost. YAGNI applies to tests too.

## Cover every case in the story, not every line

Drive test cases from the user story's paths, not a line-coverage target. Per seam, cover the happy path plus each meaningful branch - error, empty, boundary, rejected input. One test per case, named for the case it proves (`checkout rejects an empty cart`). Coverage = every case in the story has a test that fails when that case regresses - not every line executed.

## Seams - where tests go

A **seam** is the public boundary you test at: the interface where you observe behavior without reaching inside. Tests live at seams, never against internals.

**Test only at pre-agreed seams.** Before writing any test, write down the seams under test and confirm them with the user. No test is written at an unconfirmed seam. You can't test everything - agreeing the seams up front is how testing effort lands on the critical paths and complex logic instead of every edge case.

Ask: "What's the public interface, and which seams should we test?"

## Anti-patterns

- **Implementation-coupled** - mocks internal collaborators, tests private methods, or verifies through a side channel (querying the database instead of using the interface). The tell: the test breaks when you refactor but behavior hasn't changed.
- **Tautological** - the assertion recomputes the expected value the way the code does (`expect(add(a, b)).toBe(a + b)`, a snapshot derived by hand the same way, a constant asserted equal to itself), so it passes by construction and can never disagree with the code. Expected values must come from an independent source of truth - a known-good literal, a worked example, the spec.
- **Horizontal slicing** - writing all tests first, then all implementation. Bulk tests verify _imagined_ behavior: you test the _shape_ of things rather than user-facing behavior, the tests go insensitive to real changes, and you commit to test structure before understanding the implementation. Work in **vertical slices** instead - one test → one implementation → repeat, each test a **tracer bullet** that responds to what the last cycle taught you.

## Rules of the loop

- **Red before green.** Write the failing test first, then only enough code to pass it. Don't anticipate future tests or add speculative features.
- **One slice at a time.** One seam, one test, one minimal implementation per cycle.
- **Refactoring is not part of the loop.** It belongs to the review stage (see the `judo-review` skill), not the red → green implementation cycle.
