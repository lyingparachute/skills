---
name: grilling
description: Grill the user relentlessly about a plan or design. Use when the user wants to stress-test a plan before building, or uses any 'grill' trigger phrases.
---

Interview the user relentlessly about every aspect of this plan until you reach a shared understanding. Map it as a **design tree**: every decision branches into the decisions that hang off it. Walk the whole tree — surface every decision that needs their input; leave nothing silently assumed.

## Rounds on the frontier

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled — the questions you can ask now without guessing at answers you haven't heard yet.

Ask the whole frontier in one round: number each question so the user can respond point by point, and give your recommended answer for each. Then wait for their answers before continuing. Put the frontier to them all at once — never drip one question at a time.

Each round of answers reshapes the tree — settled decisions push the frontier outward and unblock questions that depended on them (including new decisions the answers open). Recompute the frontier and ask the next round the same way. A question whose answer depends on another question still open in this round belongs to a later round, not this one.

## Facts vs decisions

Finding **facts** is your job, never the user's. When a frontier question needs a fact from the environment (codebase, filesystem, tools, etc.), look it up — dispatch a sub-agent to find it — rather than asking the user for anything you could find yourself. Don't block the round on it: a running exploration is an **unsettled prerequisite**, so only questions downstream of it wait for the report; ask the rest of the frontier now.

The **decisions** are the user's — put each one to them and wait for their answer.

## Done

The session is done when the frontier is empty: every branch of the design tree visited, every decision that needed input surfaced. Do not enact the plan until the user confirms you have reached a shared understanding.
