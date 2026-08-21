#!/usr/bin/env bash
# Mechanical checks for the things critics kept catching by hand.
# Hard failures exit 1. Warnings are printed for a human to judge.
set -uo pipefail
cd "$(dirname "$0")"

fail=0
skills=$(find . -mindepth 2 -maxdepth 2 -name SKILL.md | cut -d/ -f2 | sort)

# Slash commands that belong to a harness, not to this repo.
harness_commands="clear compact check verify help init config fast skills plugin exit resume"

# Path and url segments that read like an invocation but are not. Add to this
# list when a new false positive shows up, so the check can stay a hard failure.
not_skills="tmp api users read sources exit-codes headroom"

# Backticked labels in routing docs that are not skill references. Filenames,
# paths, and flags do not match the bare-name pattern below.
not_skill_refs="user model"

echo "== every skill dir has a SKILL.md whose name matches the dir"
for d in */; do
  d=${d%/}
  [ -f "$d/SKILL.md" ] || { echo "FAIL $d has no SKILL.md"; fail=1; continue; }
  declared=$(sed -n 's/^name: *//p' "$d/SKILL.md" | head -1)
  [ "$declared" = "$d" ] || { echo "FAIL $d declares name: $declared"; fail=1; }
done

echo "== every skill is listed in README.md"
for s in $skills; do
  grep -q "\`$s\`" README.md || { echo "FAIL $s is in no README category"; fail=1; }
done

echo "== README and flow name only skills that exist"
for ref in $(grep -hoE '`[a-z][a-z0-9-]*`' README.md flow/SKILL.md | tr -d '`' | sort -u); do
  echo "$skills" | grep -qx "$ref" && continue
  echo "$not_skill_refs" | tr ' ' '\n' | grep -qx "$ref" && continue
  echo "FAIL \`$ref\` names no skill, in: $(grep -l "\`$ref\`" README.md flow/SKILL.md | tr '\n' ' ')"
  fail=1
done

# Only the invocation form counts: a slash name at the start of a token, so
# paths (docs/adr), urls, and prose (and/or) are out. Vendored reference trees
# are skipped; they are somebody else's prose, not routing.
echo "== no pointer names a skill that does not exist"
routing_files="AGENTS.md README.md $(printf '%s/SKILL.md ' $skills)"
for ref in $(grep -hoE '(^|[[:space:]`(])/[a-z][a-z0-9-]{2,}' $routing_files | grep -oE '/[a-z][a-z0-9-]*' | sed 's|^/||' | sort -u); do
  echo "$skills" | grep -qx "$ref" && continue
  echo "$harness_commands" | tr ' ' '\n' | grep -qx "$ref" && continue
  echo "$not_skills" | tr ' ' '\n' | grep -qx "$ref" && continue
  echo "FAIL /$ref names no skill, in: $(grep -lE "(^|[[:space:]\`(])/$ref\b" $routing_files | tr '\n' ' ')"
  fail=1
done

echo "== user-invoked skills reaching other user-invoked skills (warnings)"
user_invoked=$(grep -l "disable-model-invocation: true" */SKILL.md | cut -d/ -f1 | sort)
for a in $user_invoked; do
  for b in $user_invoked; do
    [ "$a" = "$b" ] && continue
    grep -q "/$b\b" "$a/SKILL.md" && echo "WARN $a names /$b, both user-invoked"
  done
done

echo "== vendored skills have a provenance row (warnings)"
for s in $(grep -lE '^version:' */SKILL.md | cut -d/ -f1); do
  grep -q "\`$s\`" VENDORED.md 2>/dev/null || echo "WARN $s carries a version but has no VENDORED.md row"
done

[ $fail -eq 0 ] && echo "OK" || echo "FAILURES above"
exit $fail
