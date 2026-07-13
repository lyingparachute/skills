#!/usr/bin/env bash
# Sync this repo into every coding harness: symlink each skill into each
# harness's skill dir, and AGENTS.md into each harness's global-rules path.
# This repo is the single source of truth. Idempotent — re-run anytime,
# including after adding, renaming, or removing a skill: stale symlinks left
# by a rename or deletion are pruned so every harness stays validated.
set -euo pipefail

REPO="$(cd "$(dirname "$0")" && pwd)"

SKILL_DIRS=(
  "$HOME/.agents/skills"
  "$HOME/.claude/skills"
  "$HOME/.codex/skills"
  "$HOME/.cursor/skills"
  "$HOME/.grok/skills"
  "$HOME/.config/opencode/skills"
)

RULES_DESTS=(
  "$HOME/.agents/AGENTS.md"
  "$HOME/.codex/AGENTS.md"
  "$HOME/.claude/CLAUDE.md"
  "$HOME/.config/opencode/AGENTS.md"
  "$HOME/.grok/AGENTS.md"
)

pruned=0
for dir in "${SKILL_DIRS[@]}"; do
  mkdir -p "$dir"
  for skill in "$REPO"/*/; do
    name="$(basename "$skill")"
    ln -sfn "${skill%/}" "$dir/$name"
  done
  # Validate: drop symlinks whose target no longer exists — a skill that was
  # renamed or removed here leaves a dangling link in every harness.
  while IFS= read -r link; do
    rm "$link"
    pruned=$((pruned + 1))
  done < <(find "$dir" -maxdepth 1 -type l ! -exec test -e {} \; -print)
done

for dest in "${RULES_DESTS[@]}"; do
  mkdir -p "$(dirname "$dest")"
  ln -sfn "$REPO/AGENTS.md" "$dest"
done

echo "linked $(ls -d "$REPO"/*/ | wc -l | tr -d ' ') skills into ${#SKILL_DIRS[@]} harnesses; pruned $pruned stale link(s); AGENTS.md into ${#RULES_DESTS[@]} rules paths"
