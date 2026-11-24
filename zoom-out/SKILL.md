---
name: zoom-out
description: "Use when the user says \"zoom out\" or asks for the bigger picture or how the code fits together, when working in code you don't know, or when another skill needs an architectural map first."
---

Go up a layer of abstraction. Map the relevant modules and their callers, using the project's domain glossary vocabulary, so the area is understood as a whole before it is judged or changed.

Use `graphify-out/` as the map when the graph was built after the last commit touching the area: compare the graph's `manifest.json` modification time with `git log -1 --format=%ct -- <area>`. Otherwise read the code.

When the map feeds a judgment of a diff, named code, or a plan, also trace every fact that scope adds, changes, or owns and that it stores, sends, exposes, or configures: a column, a field on a stored or wire type, an event, an endpoint, a port, a config key or flag. Types private to one module are out of scope. For each fact, name its writers, its readers, and every other carrier of the same fact with that carrier's readers. A search that finds nothing records its scope, as in "no reader in <repo>". Readers past a process or repo boundary you did not search are "unknown", not "none". Done when every such fact has one line: name, writers, readers, other carriers.
