# Refactoring

A refactor changes structure and keeps behavior. It is not part of the red-green loop.

1. **Split bugs out.** A real bug or missing feature found on the way is its own change. Ship the structural change first, against the pinned behavior.
2. **Pin current behavior.** Write a characterization test, snapshot, or equivalence harness before structure moves. A type check and lint are not a pin.
3. **Subtract first.** Delete dead code, collapse one-caller wrappers, and drop redundant validators before you add the new shape. Revert a cleanup that "might help".
4. **Move in small steps**, each keeping the pin green. When you reshape an API, migrate every caller and delete the old one in the same change or plan, with no lasting shim. Spot-check every rename against the files, because renames miss strings and prose.
5. **Prove behavior is unchanged** where feasible: diff old and new outputs, or replay a recorded baseline against the new code.
6. **Keep it only if it lowers reader load.** Revert a refactor that does not.
7. **Commit in order:** subtractions, then the reshape, then follow-on cleanup. Each commit stays green.
