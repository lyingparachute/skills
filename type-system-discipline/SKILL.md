---
name: type-system-discipline
description: 'Use when shaping or reviewing types in Java or TypeScript: modelling domain state, reaching for a boolean flag or an optional field, casting, parsing data from outside the process, switching over a union, or holding React state. Also use when a "should never happen" throw or a `!` shows up.'
---

# Type System Discipline

The type checker is a proof assistant. Every state it rules out at compile time is a test you never write and a postmortem you never hold. The work is choosing shapes it can check.

## Make illegal states unrepresentable

`{ completed: boolean; completedAt?: Date }` admits `completed: true` with no date, and `completed: false` with one. Both are meaningless, and every reader has to work out which one happens.

Model the states, not the flags:

```ts
type Task = { status: "open" } | { status: "done"; completedAt: Date };
```

```java
sealed interface Task {}
record Open() implements Task {}
record Done(Instant completedAt) implements Task {}
```

The tell that you skipped this: a second boolean kept in sync with a first, or a new feature that grows an if-else chain by one branch.

## Types are constructions, not restrictions

Build the type up from the values you want rather than carving it out of a looser one. A non-empty list is a head plus a rest, `[T, ...T[]]` in TypeScript, not a list with a length check. Java has no type-level equivalent, so the constraint lives in a private constructor with a factory that rejects the empty case.

## Brand the primitives, validate once

A `String` customer id and a `String` order id are one type to the compiler and two concepts to the business.

```java
record CustomerId(String value) { /* check in the compact constructor */ }
```

```ts
type CustomerId = string & { readonly __brand: "CustomerId" };
```

In TypeScript the brand is reachable only through a parse function, and that function holds the one cast this file permits, because that is where the check actually happens. Comment it. Everywhere else a `CustomerId` parameter cannot be handed an order id.

## Outside data is untyped until parsed

Wire payloads, config, env vars, query results, and third-party responses are `unknown` until something checks them at the boundary. Parse there, into the domain type, and let the inside trust its own types.

- TypeScript: use the project's existing schema or parser at the edge. Derive the type from the schema when the library supports it. In a project that uses Zod, use `z.infer`. Otherwise, make the parser's checked return type authoritative.
- Java: a DTO at the edge, mapped to the domain type. The wire type never reaches the core.

## Do not lie to the checker

A cast is a claim with no proof. `as`, an unchecked cast, `!`, and `@SuppressWarnings("unchecked")` all move a compile error to runtime and hide where it came from.

- `unknown` over `any`, then narrow.
- `satisfies` over `as` when you want a literal checked against a type without widening it.
- Narrow in this order: switch on the discriminant, then `in`, then `typeof` or `instanceof`, then a user-defined guard. A cast is not on the list, apart from the branding case above.
- A type guard must verify what it claims, and reads as `isX` or `hasX`. A guard that lies is worse than the cast it replaced.

## Exhaustive matching is the compiler's job

Adding a variant should break the build everywhere the old set was handled.

- TypeScript: `const _exhaustive: never = x;` in the default arm.
- Java 21 and up: a switch expression over a sealed type with no default arm. Below 21 there is no compiler check, so the fallback is a test that fails on an unhandled variant.

## Strengthen only where partiality appears

Prefer total functions. `sum` takes any list. `head` demands a non-empty one. A runtime "should never happen" throw marks a type that is too weak at that point, so strengthen it there and stop. Do not thread `NonEmpty` through a whole call graph to save one check.

## Generics carry intent or they get renamed

A type parameter that needs a comment to explain it has the wrong name. `T` is fine for a container. `TResponse` beats `T2`. A parameter that appears once in a signature is usually not a parameter at all.

## React

Model reducer actions as a discriminated union and exhaust them in the reducer, so a new action breaks the build instead of falling through:

```ts
type Action = { type: "loaded"; rows: Row[] } | { type: "failed"; error: Error };
```

In the default arm, the `never` check from above. State follows the same rule as any domain state: one union, not `isLoading` and `isError` and `data` kept in step by hand.
