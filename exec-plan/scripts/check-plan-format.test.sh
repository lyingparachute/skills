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

plan bodyprose <<'EOF2'
## Milestones
### Milestone 1 - A
Milestone 1 needs the schema from plan 03.
### Milestone 2 - B
Step 2 runs after the import.
EOF2
expect milestone-body-prose-passes 0 "$work/bodyprose.md"

plan barenumber <<'EOF2'
## Milestones
Milestone 1 Schema
EOF2
expect bare-milestone-line-before-headings-fails 1 "$work/barenumber.md"

plan boldafter <<'EOF2'
## Milestones
### Milestone 1 - A
**Milestone 2 Import the data**
EOF2
expect bold-milestone-line-after-heading-fails 1 "$work/boldafter.md"

plan bareafter <<'EOF2'
## Milestones
### Milestone 1 - A
Milestone 2 Import the data
EOF2
expect bare-unopened-milestone-after-heading-fails 1 "$work/bareafter.md"

plan backref <<'EOF2'
## Milestones
### Milestone 1 - A
### Milestone 2 - B
Milestone 1 needs the schema from plan 03.
EOF2
expect back-reference-prose-passes 0 "$work/backref.md"


plan readyopen <<'EOF'
Status: ready - this file has no critic round yet
## Milestones
### Milestone 1 - A
EOF
expect ready-with-open-gate-fails 1 "$work/readyopen.md"

plan readypending <<'EOF'
Status: ready - critic round 1 pending
## Milestones
### Milestone 1 - A
EOF
expect ready-with-pending-review-fails 1 "$work/readypending.md"

plan readycap <<'EOF'
Status: ready - critic rounds 1 and 2 applied; round 2 fixes not re-reviewed (two-round cap)
## Milestones
### Milestone 1 - A
EOF
expect ready-at-round-cap-passes 0 "$work/readycap.md"

plan draftpending <<'EOF'
Status: draft - critic round 1 pending
## Milestones
### Milestone 1 - A
EOF
expect draft-with-pending-review-passes 0 "$work/draftpending.md"


plan readyround2 <<'EOF'
Status: ready - round 1 found a BLOCKER, fixed; round 2 pending
## Milestones
### Milestone 1 - A
EOF
expect ready-with-round-pending-fails 1 "$work/readyround2.md"

plan readyawaitcritic <<'EOF'
Status: ready - awaiting round 2 critic
## Milestones
### Milestone 1 - A
EOF
expect ready-awaiting-critic-fails 1 "$work/readyawaitcritic.md"

plan readyzero <<'EOF'
Status: ready - zero critic rounds
## Milestones
### Milestone 1 - A
EOF
expect ready-zero-rounds-fails 1 "$work/readyzero.md"

plan readyunreviewed <<'EOF'
Status: ready - unreviewed
## Milestones
### Milestone 1 - A
EOF
expect ready-unreviewed-fails 1 "$work/readyunreviewed.md"

plan readytodo <<'EOF'
Status: ready - TODO critic
## Milestones
### Milestone 1 - A
EOF
expect ready-todo-fails 1 "$work/readytodo.md"

plan readyowner <<'EOF'
Status: ready - critic round 1 applied, pending owner migration approval
## Milestones
### Milestone 1 - A
EOF
expect ready-with-owner-gate-passes 0 "$work/readyowner.md"

plan readyownerreview <<'EOF'
Status: ready - critic round 1 applied; owner review of the migration pending
## Milestones
### Milestone 1 - A
EOF
expect ready-with-owner-review-passes 0 "$work/readyownerreview.md"

plan readynofindings <<'EOF'
Status: ready - critic round 1: no critic findings left open
## Milestones
### Milestone 1 - A
EOF
expect ready-no-findings-passes 0 "$work/readynofindings.md"

plan fencedstatus <<'EOF'
```
Status: ready - no critic round
```
## Milestones
### Milestone 1 - A
EOF
expect fenced-status-is-ignored 0 "$work/fencedstatus.md"


plan readyroundnum <<'EOF'
Status: ready - critic round 1 not yet run
## Milestones
### Milestone 1 - A
EOF
expect ready-round-not-run-fails 1 "$work/readyroundnum.md"

plan readysecond <<'EOF'
Status: ready - second critic round pending
## Milestones
### Milestone 1 - A
EOF
expect ready-second-round-pending-fails 1 "$work/readysecond.md"

plan readyownerpending <<'EOF'
Status: ready - owner review pending
## Milestones
### Milestone 1 - A
EOF
expect ready-owner-review-pending-passes 0 "$work/readyownerpending.md"

plan readyoverride <<'EOF'
Status: ready - set ready as the owner instructed; no critic round yet
## Milestones
### Milestone 1 - A
EOF
expect ready-owner-override-passes 0 "$work/readyoverride.md"

[ $fail -eq 0 ] && echo "check-plan-format: all cases pass"
exit $fail
