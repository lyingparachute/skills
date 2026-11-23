---
name: self-verify
description: "Use when the user says 'check your work', 'verify changes', or 'self-verify', or asks to verify work done without a plan."
---

# Self-verify

Covers sessions with no plan: an ad-hoc fix, an operational task, a question answered. Plan-based work goes to the "Review the implementation" trigger in the global rules file, which runs `judo-review`.

1. Dispatch a fresh verifier subagent. The agent that did the work never verifies it.
2. The verifier restates every ask as a checklist, including the non-code ones (operational, research, Q&A). It accounts for each with evidence it gathered itself, not from the transcript's claims.
3. The verifier probes operational claims against the live system: curl the endpoint, invoke the CLI, query the API, check the job status. Reading the code that would do it is not evidence.
4. The verifier outputs `PASS` or `FAIL` for each checklist item, then one overall `PASS` or `FAIL`. On FAIL it gives the exact error output and what must change, with `file:line` where it is code.
5. On FAIL, fix the issue. Start round 2 with a new verifier in a fresh context. Give it the same brief the first verifier got. Never give it the previous verdict, findings, fixes, or a list of what changed. It checks every ask again. Max 2 rounds. Then report what is left standing.

Done when every ask on the checklist has a `PASS` backed by the verifier's own evidence, or the report names what is left standing after round 2.
