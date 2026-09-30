---
name: zoom-out
description: Go up a layer of abstraction and map the relevant modules, callers, and domain concepts before judging or changing unfamiliar code. Use when the user says "zoom out" or asks for the bigger picture, a higher-level view, or how the code fits together; when working in an area you don't know well; or when another skill needs an architectural map before a design or review pass.
---

Go up a layer of abstraction. Map the relevant modules and their callers, using the project's domain glossary vocabulary, so the area is understood as a whole before it is judged or changed.

Use `graphify-out/` as the map when the graph was built after the last commit touching the area: compare the graph's `manifest.json` modification time with `git log -1 --format=%ct -- <area>`. Otherwise read the code.
