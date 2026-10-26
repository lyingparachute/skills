---
name: zoom-out
description: "Use when the user says \"zoom out\" or asks for the bigger picture or how the code fits together, when working in code you don't know, or when another skill needs an architectural map first."
---

Go up a layer of abstraction. Map the relevant modules and their callers, using the project's domain glossary vocabulary, so the area is understood as a whole before it is judged or changed.

Use `graphify-out/` as the map when the graph was built after the last commit touching the area: compare the graph's `manifest.json` modification time with `git log -1 --format=%ct -- <area>`. Otherwise read the code.
