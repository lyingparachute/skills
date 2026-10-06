#!/usr/bin/env bash
# Fixture tests for check-plan-format. Exit 1 when a case fails.
set -uo pipefail
here=$(cd "$(dirname "$0")" && pwd)
check="$here/check-plan-format"
work=$(mktemp -d "${TMPDIR:-/tmp}/check-plan-format-test.XXXXXX")
trap 'rm -rf -- "$work"' EXIT
fail=0

expect() {
  local name=$1 want=$2 file=$3
  "$check" "$file" >/dev/null 2>&1
  local rc=$?
  if [ "$rc" = "$want" ]; then echo "ok   $name"; else echo "FAIL $name: exit $rc, want $want"; fail=1; fi
}
plan() { cat > "$work/$1.md"; }

expect template-passes 0 "$here/../TEMPLATE.md"

plan paragraph <<'EOF'
## Milestones
Milestone 1: do it.
EOF
expect paragraph-form-fails 1 "$work/paragraph.md"

plan gap <<'EOF'
## Milestones
### Milestone 1 - A
### Milestone 3 - C
EOF
expect numbering-gap-fails 1 "$work/gap.md"

plan outside <<'EOF'
## Plan of Work
### Milestone 1 - A
EOF
expect outside-section-fails 1 "$work/outside.md"

plan oldheading <<'EOF'
## Milestones
### Milestone 1 - A
### M2 - B
EOF
expect old-heading-fails 1 "$work/oldheading.md"

plan twosections <<'EOF'
## Milestones
### Milestone 1 - A
## Milestones and notes
EOF
expect two-sections-fail 1 "$work/twosections.md"

plan prose <<'EOF'
## Milestones
### Milestone 1 - A
Body.
## Concrete Steps
Milestone 2 commit: `docs: x`
```
### Milestone 9 - inside a fence
```
EOF
expect prose-and-fence-pass 0 "$work/prose.md"

[ $fail -eq 0 ] && echo "check-plan-format: all cases pass"
exit $fail
