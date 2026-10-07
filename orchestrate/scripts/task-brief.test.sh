#!/usr/bin/env bash
# Fixture tests for task-brief. Exit 1 on the first failing case.
set -uo pipefail
here=$(cd "$(dirname "$0")" && pwd)
tb="$here/task-brief"
work=$(mktemp -d "${TMPDIR:-/tmp}/task-brief-test.XXXXXX")
trap 'rm -rf -- "$work"' EXIT
fail=0

plan() { cat > "$work/$1.md"; }
expect() {
  local name=$1 file=$2 id=$3 want_rc=$4 must=$5 must_not=$6
  local out="$work/out-$name" rc
  "$tb" "$work/$file.md" "$id" "$out" >/dev/null 2>&1; rc=$?
  if [ "$rc" != "$want_rc" ]; then echo "FAIL $name: exit $rc, want $want_rc"; fail=1; return; fi
  [ "$rc" = 0 ] || { echo "ok   $name"; return; }
  if [ -n "$must" ] && ! grep -qF -- "$must" "$out"; then echo "FAIL $name: missing '$must'"; fail=1; return; fi
  if [ -n "$must_not" ] && grep -qF -- "$must_not" "$out"; then echo "FAIL $name: has '$must_not'"; fail=1; return; fi
  echo "ok   $name"
}
expect_list() {
  local name=$1 file=$2 want=$3 got
  got=$("$tb" "$work/$file.md" --list 2>/dev/null | tr '\n' ' ')
  if [ "$got" = "$want" ]; then echo "ok   $name"; else echo "FAIL $name: got '$got', want '$want'"; fail=1; fi
}

plan pinned <<'EOF'
# Plan
## Locked decisions
D1 keep it.
## Milestones
### Milestone 1 - First
Body one.
1. step
2. step two
### Acceptance
still part of one
#### Sub
also part of one
### Milestone 2 - Second
Body two.
```
### Milestone 3 - inside a fence
```
## Progress
- [ ] Milestone 1: done
EOF
expect pinned-heading pinned 1 0 "still part of one" "Body two."
expect pinned-subheading pinned 1 0 "also part of one" "Body two."
expect pinned-binding pinned 2 0 "D1 keep it." "- [ ] Milestone 1"
expect pinned-fence pinned 3 3 "" ""
expect pinned-no-list-false-start pinned 4 3 "" ""
expect_list pinned-list pinned "1 2 "

plan dup <<'EOF'
### Milestone 1 - A
first
### Milestone 1 - dup
second
EOF
expect dup-first-wins dup 1 0 "first" "second"

plan para <<'EOF'
## Decision Log
Some text.
## Milestones
Milestone 1: routing. Goal one.

**M2. Bold form.** Goal two.

M3, comma form. Goal three.

Milestone B adds the page.
## Progress
EOF
expect para-colon para 1 0 "Goal one." "Goal two."
expect para-bold para 2 0 "Goal two." "Goal three."
expect para-comma para 3 0 "Goal three." "Progress"
expect para-letter para B 0 "adds the page" ""

plan legacy <<'EOF'
## Milestones
### M1a - Lock it
lock body
### Step 2 - Generate
step body
EOF
expect legacy-suffix legacy 1a 0 "lock body" "step body"
expect legacy-step legacy 2 0 "step body" "lock body"

plan list <<'EOF'
## Milestones and Definition of Done
- [ ] **M1 - Token.**
  - check one
- [ ] **M2 - Emails.**
  - check two
## Progress
EOF
expect list-checkbox list 2 0 "check two" "check one"
expect_list list-ids list "1 2 "
got=$("$tb" "$work/list.md" --titles 2>/dev/null | head -1)
want=$(printf '1\t- [ ] **M1 - Token.**')
if [ "$got" = "$want" ]; then echo "ok   list-titles"; else echo "FAIL list-titles: got '$got'"; fail=1; fi

plan none <<'EOF'
## Plan of work
The first part does X. The second part does Y.
EOF
expect none-missing none 1 3 "" ""
expect_list none-list none ""

[ $fail -eq 0 ] && echo "task-brief: all cases pass"
exit $fail
