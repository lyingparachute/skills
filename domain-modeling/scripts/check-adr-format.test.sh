#!/usr/bin/env bash
set -eu
checker="$(cd "$(dirname "$0")" && pwd)/check-adr-format"
example="$(cd "$(dirname "$0")/../adr/examples" && pwd)/0001-durable-state.md"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
mkdir -p "$tmp/records/shared"
record="$tmp/records/shared/0001-durable-state.md"
cp "$example" "$record"
"$checker" "$tmp/records"
reject() {
  if "$checker" "$tmp/records" >"$tmp/output" 2>&1; then
    echo "FAIL: $1 accepted" >&2
    exit 1
  fi
  if ! grep -q "$2" "$tmp/output"; then
    echo "FAIL: $1 did not report $2" >&2
    cat "$tmp/output" >&2
    exit 1
  fi
  cp "$example" "$record"
}
sed 's/status: accepted/status: invalid/' "$example" > "$record"; reject status 'invalid status'
sed '/^status:/d' "$example" > "$record"; reject missing-status 'invalid status'
sed 's/date: 2026-10-30/date: 2026-02-30/' "$example" > "$record"; reject date 'invalid date'
sed '/^date:/d' "$example" > "$record"; reject missing-date 'invalid date'
sed 's/^Accepted\./Proposed./' "$example" > "$record"; reject status-line 'status section'
sed 's/ADR 0001:/ADR 0002:/' "$example" > "$record"; reject title 'invalid title'
sed 's/## Context/## Other/' "$example" > "$record"; reject sections 'invalid sections'
sed -e 's/^## Context$/## Swap/' -e 's/^## Decision$/## Context/' -e 's/^## Swap$/## Decision/' "$example" > "$record"; reject section-order 'invalid sections'
sed 's/\*\*Store session state in durable storage\.\*\*/Store session state in durable storage./' "$example" > "$record"; reject decision 'bold sentence'
sed 's/Why not/Reason/' "$example" > "$record"; reject table 'alternatives table'
sed 's/status: accepted/status: archived/' "$example" > "$record"; reject archive 'archived status'
printf '\n`src/example.ts`\n' >> "$record"; reject path 'backticked source path'
cp "$record" "$tmp/records/shared/0001-copy.md"; reject duplicate 'already used'; rm "$tmp/records/shared/0001-copy.md"
printf 'Reserved numbers: 0001\n' > "$tmp/records/README.md"; reject reserved 'already used'; rm "$tmp/records/README.md"
mv "$record" "$tmp/records/shared/0001-Bad.md"; reject filename 'invalid filename'; rm "$tmp/records/shared/0001-Bad.md"
mv "$record" "$tmp/records/shared/bad.md"; reject unnumbered 'invalid filename'; rm "$tmp/records/shared/bad.md"
mkdir -p "$tmp/records/archived"
sed -e 's/status: accepted/status: archived/' -e 's/^Accepted\./Archived./' "$example" > "$tmp/records/archived/0002-old.md"
sed 's/ADR 0001:/ADR 0002:/' "$tmp/records/archived/0002-old.md" > "$tmp/archive"
mv "$tmp/archive" "$tmp/records/archived/0002-old.md"
"$checker" "$tmp/records"
sed 's/status: archived/status: accepted/' "$tmp/records/archived/0002-old.md" > "$tmp/archive"
mv "$tmp/archive" "$tmp/records/archived/0002-old.md"
reject archive-folder 'archived status'
rm "$tmp/records/archived/0002-old.md"
for line in {1..30}; do printf 'More context.\n' >> "$record"; done
"$checker" "$tmp/records" > "$tmp/output"
grep -q 'warning: more than 50 lines' "$tmp/output"
cp "$example" "$record"
for line in {1..30}; do printf 'Durable session continuity matters.\n' >> "$record"; done
cp "$record" "$tmp/baseline"
git -C "$tmp" init -q
git -C "$tmp" -c user.name=Test -c user.email=test@example.invalid add records
git -C "$tmp" -c user.name=Test -c user.email=test@example.invalid commit -qm initial
mkdir -p "$tmp/records/other"
mv "$record" "$tmp/records/other/0001-durable-state.md"
(cd "$tmp" && "$checker" --since HEAD records)
sed 's/Workers can stop between requests, but sessions must survive./Workers stop./' "$tmp/baseline" > "$tmp/records/other/0001-durable-state.md"
if (cd "$tmp" && "$checker" --since HEAD records) > "$tmp/output" 2>&1; then
  echo 'FAIL: word loss accepted' >&2
  exit 1
fi
grep -q 'word loss exceeds 3%' "$tmp/output"
rm "$tmp/records/other/0001-durable-state.md"
for status in proposed archived; do
  destination="$tmp/records/other/0001-durable-state.md"
  if [ "$status" = archived ]; then
    destination="$tmp/records/archived/0001-durable-state.md"
  fi
  status_title="$(printf '%s' "$status" | tr '[:lower:]' '[:upper:]' | cut -c1)$(printf '%s' "$status" | cut -c2-)"
  sed -e "s/status: accepted/status: $status/" -e "s/^Accepted\./$status_title./" "$tmp/baseline" > "$destination"
  (cd "$tmp" && "$checker" --since HEAD records)
  sed 's/Workers can stop between requests, but sessions must survive./Workers stop./' "$destination" > "$tmp/changed"
  mv "$tmp/changed" "$destination"
  if (cd "$tmp" && "$checker" --since HEAD records) > "$tmp/output" 2>&1; then
    echo "FAIL: accepted to $status word loss accepted" >&2
    exit 1
  fi
  grep -q 'word loss exceeds 3%' "$tmp/output"
  rm "$destination"
done
cp "$tmp/baseline" "$tmp/records/other/0001-durable-state.md"
cp "$example" "$tmp/records/other/0003-new.md"
sed 's/ADR 0001:/ADR 0003:/' "$tmp/records/other/0003-new.md" > "$tmp/new"
mv "$tmp/new" "$tmp/records/other/0003-new.md"
if (cd "$tmp" && "$checker" --since HEAD records) > "$tmp/output" 2>&1; then
  echo 'FAIL: missing predecessor accepted' >&2
  exit 1
fi
grep -q 'no predecessor found at reference' "$tmp/output"
rm "$tmp/records/other/0003-new.md"
legacy="$tmp/legacy"
mkdir -p "$legacy/records"
printf '# 0004 - Keep sessions durable\n\n## Status\n\n**Accepted**, 2026-07-09\n\n## Context\n\nWorkers can stop between requests, but sessions must survive restarts and deploys.\n\n## Decision\n\nStore session state in durable storage.\n' > "$legacy/records/0004-legacy.md"
git -C "$legacy" init -q
git -C "$legacy" -c user.name=Test -c user.email=test@example.invalid add records
git -C "$legacy" -c user.name=Test -c user.email=test@example.invalid commit -qm initial
mkdir -p "$legacy/records/archived"
git -C "$legacy" mv records/0004-legacy.md records/archived/0004-legacy.md
sed -e 's/ADR 0001:/ADR 0004:/' -e 's/status: accepted/status: archived/' -e 's/^Accepted\./Archived./' "$example" > "$legacy/records/archived/0004-legacy.md"
if (cd "$legacy" && "$checker" --since HEAD records) > "$tmp/output" 2>&1; then
  echo 'FAIL: legacy accepted to archived word loss accepted' >&2
  exit 1
fi
grep -q 'word loss exceeds 3%' "$tmp/output"
readme_tree="$tmp/readme-tree"
mkdir -p "$readme_tree/shared"
cp "$example" "$readme_tree/shared/0001-durable-state.md"
printf '# Decisions\n' > "$readme_tree/README.md"
if "$checker" "$readme_tree" > "$tmp/output" 2>&1; then
  echo 'FAIL: README without reserved line accepted' >&2
  exit 1
fi
grep -q 'missing "Reserved numbers:" line or value' "$tmp/output"
printf 'Reserved numbers:\n\n| 0001 | x |\n' > "$readme_tree/README.md"
if "$checker" "$readme_tree" > "$tmp/output" 2>&1; then
  echo 'FAIL: README with empty reserved value accepted' >&2
  exit 1
fi
grep -q 'missing "Reserved numbers:" line or value' "$tmp/output"
if grep -q 'already used' "$tmp/output"; then
  echo 'FAIL: empty reserved value read the next line' >&2
  exit 1
fi
echo 'ADR format tests passed'
