---
name: benchmark-checklist
description: "Use when checking a performance, latency, or eval number before you trust, report, or act on it."
---

# Benchmark Checklist

A number is a claim about work that ran. Answer each question below with evidence from a run, not a guess from reading the code.

## Before you run

- Write the claim in the words you would ship: "export is 30% faster at p50 on the 60k-row dataset". The questions test that sentence.
- Name the result that would change the decision. Stop when the run-to-run spread is larger than the effect.
- Read the measurement script. Note what it times, counts, and ignores.
- Check how busy the machine is and how many cores it has. If it is busy, find what is running. If you cannot stop it, interleave the sides so both see the same noise, and say so.

A quick ballpark the user asked for needs one run, plus questions 4 and 7. Say it is one run. A choice between options is never a ballpark.

## Questions

1. **Why not double?** Name the limiter with evidence, for example "bound by one core". Measure CPU per process, a runtime profiler, I/O wait, or syscall counts in a run you do not report, because profilers slow the work. Map the hot spot to source. Check the load generator too: if it saturates first, you measured the load generator. A change that did not move the number is explained by the limiter, so find it before you call the change useless.
2. **Was it tuned?** Run every side the way production runs it: release build, production flags, batching, pools, warm or cold caches, same versions and data. A limiter that is a setting (a commit per row, a debug build, a missing index) means that side is untuned. Tune it and measure again. If you cannot tune it, pick no winner from that run. When the user is choosing what to adopt, narrowing the claim to today's code does not fix this, because they adopt the option, not today's settings.
3. **Did it break limits?** Do the arithmetic against disk and network bandwidth, core count, and the share of the run the changed piece takes. Removing a piece that takes 10% of the run makes the run at most about 11% faster. A result past a limit measured a cache, a no-op, or a bug.
4. **Did it error?** Count failures and non-success responses, and check that outputs are correct, not only present. Rejections are fast. Timeouts and retries are slow.
5. **Does it reproduce?** Run each side at least 5 times, alternating A, B, A, B. Report the median and the range. A gap smaller than the run-to-run spread is no measurable difference. For a close call, use a rank-sum test.
6. **Does it matter?** Measure the end-to-end path a user waits on, with realistic data and concurrency. State a micro result as a share of the whole.
7. **Did it happen?** Confirm the work ran inside the timed region: the request reached the server, the rows were written, the result was used. Lazy code, discarded results, and timeouts give numbers for work that never ran.

## When the number is bad

Cut work in this order, cheapest first, and stop when an earlier step meets the target:

1. Don't do it. Drop work whose result nothing uses.
2. Do it once. Do not repeat work you already did.
3. Do less.
4. Do it later.
5. Do it when nobody is waiting.
6. Do it concurrently.
7. Do it cheaper.

Done when every question has an answer backed by output you saw, or is named as a gap.

## Report

Lead with the verdict: faster, slower, no measurable difference, or inconclusive. Then give the number with its unit, run count, range, and limiter: "p50 41 ms to 33 ms, median of 7 runs per side, range 32 to 35 ms, bound by JSON parsing on one core."

The verdict is inconclusive when you cannot name the limiter, a side ran untuned, or questions 4 or 7 went unchecked. Name the gap. Keep a PR body to one number, and put the runs and evidence in a linked note.

For an eval result, ask the same shape of questions: did every run do the task, does the gap hold across trials, does the scenario matter.
