#!/usr/bin/env bash
# Fixture tests for local-delta, plus a check of the real skill. Exit 1 when a case fails.
set -uo pipefail
here=$(cd "$(dirname "$0")" && pwd)
tool="$here/local-delta"
work=$(mktemp -d "${TMPDIR:-/tmp}/local-delta-test.XXXXXX")
trap 'rm -rf -- "$work"' EXIT
fail=0

expect() {
  local name=$1 want=$2; shift 2
  "$@" >"$work/out" 2>&1
  local rc=$?
  if [ "$rc" = "$want" ]; then echo "ok   $name"; else echo "FAIL $name: exit $rc, want $want"; cat "$work/out"; fail=1; fi
}
snapshot() { (cd "$work/skill" && find . -type f -o -type l | sort | xargs shasum) > "$work/$1"; }
unchanged_since() { snapshot now && cmp -s "$work/$1" "$work/now"; }

mkdir -p "$work/v1/reference" "$work/v1/scripts"
printf 'name: impeccable\n\nSee [colorize.md](reference/colorize.md).\n' > "$work/v1/SKILL.md"
printf '# Colorize\n\nRule one.\nRule two.\nRule three.\nRule four.\n' > "$work/v1/reference/colorize.md"
printf '# Gone\n' > "$work/v1/reference/old.md"
printf 'upstream tool\n' > "$work/v1/scripts/impeccable"
printf '@echo off\r\nREM one\r\nREM two\r\nREM three\r\nnode impeccable\r\n' > "$work/v1/scripts/impeccable.cmd"
printf 'PNG\0data' > "$work/v1/scripts/logo.png"
ln -s impeccable "$work/v1/scripts/latest"

cp -R "$work/v1" "$work/skill"
mkdir -p "$work/skill/reference/details"
cp "$tool" "$work/skill/scripts/local-delta"
touch "$work/skill/scripts/local-delta.test.sh" "$work/skill/reference/web-interface-guidelines.md"
printf '# Details\n\n[values.md](values.md)\n' > "$work/skill/reference/details/README.md"
printf '# Values\n' > "$work/skill/reference/details/values.md"
printf '\nValues live in [details/values.md](details/values.md).\n' >> "$work/skill/reference/colorize.md"
printf '@echo off\r\nset LOCAL=1\r\nREM one\r\nREM two\r\nREM three\r\nnode impeccable\r\n' > "$work/skill/scripts/impeccable.cmd"
skill() { "$tool" --skill "$work/skill" "$@"; }

expect refresh-writes-patch 0 skill refresh "$work/v1"
expect check-passes 0 skill check
expect crlf-kept-in-patch 0 grep -q $'set LOCAL=1\r' "$work/skill/scripts/local-delta.patch"

printf 'Unrecorded rule.\n' >> "$work/skill/reference/colorize.md"
expect check-catches-uncaptured-edit 1 skill check
snapshot before
expect apply-refuses-uncaptured-edit 1 skill apply "$work/v1"
expect tree-untouched-after-refusal 0 unchanged_since before
expect refresh-captures-edit 0 skill refresh "$work/v1"
expect check-passes-after-capture 0 skill check

mkdir -p "$work/notskill/reference" && printf 'name: other\n' > "$work/notskill/SKILL.md"
snapshot before
expect apply-rejects-foreign-folder 1 skill apply "$work/notskill"
expect tree-untouched-after-foreign 0 unchanged_since before

cp -R "$work/v1" "$work/v2"
printf '# Colorize\n\nRule one, reworded.\nRule two.\nRule three.\nRule four.\n' > "$work/v2/reference/colorize.md"
rm "$work/v2/reference/old.md"
printf 'upstream tool v2\n' > "$work/v2/scripts/impeccable"
printf '@echo off\r\nREM one\r\nREM two\r\nREM three\r\nnode impeccable --v2\r\n' > "$work/v2/scripts/impeccable.cmd"
expect apply-merges-into-new-upstream 0 skill apply "$work/v2"
expect check-passes-after-upgrade 0 skill check
expect pointer-survives 0 grep -q 'details/values.md' "$work/skill/reference/colorize.md"
expect crlf-edit-survives 0 grep -q $'set LOCAL=1\r' "$work/skill/scripts/impeccable.cmd"
expect upstream-deletion-follows 1 test -e "$work/skill/reference/old.md"
expect symlink-kept 0 test -L "$work/skill/scripts/latest"
expect no-stage-left 1 sh -c "ls -a '$work' | grep -q local-delta-stage"

cp -R "$work/v2" "$work/v3"
printf '# Colour\n' > "$work/v3/reference/colorize.md"
expect apply-reports-conflict 1 skill apply "$work/v3"
expect conflict-markers-left 0 grep -q '<<<<<<< ours' "$work/skill/reference/colorize.md"
expect check-fails-on-unmerged-file 1 skill check
printf '# Colour\n\nValues live in [details/values.md](details/values.md).\n' > "$work/skill/reference/colorize.md"
expect refresh-after-manual-merge 0 skill refresh "$work/v3"
expect check-passes-after-manual-merge 0 skill check

cp -R "$work/v3" "$work/v4" && rm "$work/v4/reference/colorize.md"
snapshot before
expect apply-stops-when-edited-file-removed 1 skill apply "$work/v4"
expect tree-untouched-after-removal 0 unchanged_since before

cp -R "$work/v3" "$work/v5"
printf 'outside\n' > "$work/outside.md"
rm "$work/v5/reference/colorize.md" && ln -s "$work/outside.md" "$work/v5/reference/colorize.md"
snapshot before
expect apply-rejects-symlinked-edit-target 1 skill apply "$work/v5"
expect outside-file-untouched 0 grep -qx 'outside' "$work/outside.md"
expect tree-untouched-after-symlink 0 unchanged_since before

mkdir "$work/skill.before-upgrade"
expect apply-stops-after-interrupted-upgrade 1 skill apply "$work/v3"
rmdir "$work/skill.before-upgrade"

printf 'PNG\0edited' > "$work/skill/scripts/logo.png"
expect refresh-rejects-binary-edit 1 skill refresh "$work/v3"
cp "$work/v3/scripts/logo.png" "$work/skill/scripts/logo.png"

printf 'stray\n' > "$work/skill/reference/stray.md"
expect check-catches-unlisted-file 1 skill check
rm "$work/skill/reference/stray.md"

printf '# Details\n' > "$work/skill/reference/details/README.md"
expect check-catches-missing-index-row 1 skill check
printf '# Details\n\n[values.md](values.md)\n' > "$work/skill/reference/details/README.md"

printf 'See [missing.md](missing.md).\n' >> "$work/skill/reference/details/values.md"
expect check-catches-broken-link 1 skill check

cp -R "$work/v1" "$work/plain"
mkdir -p "$work/plain/reference/details"
cp "$tool" "$work/plain/scripts/local-delta"
touch "$work/plain/scripts/local-delta.test.sh" "$work/plain/reference/web-interface-guidelines.md"
printf '# Details\n' > "$work/plain/reference/details/README.md"
expect empty-delta-refresh 0 "$tool" --skill "$work/plain" refresh "$work/v1"
expect empty-delta-apply 0 "$tool" --skill "$work/plain" apply "$work/v2"

expect real-skill-delta-intact 0 "$tool" check

exit $fail
