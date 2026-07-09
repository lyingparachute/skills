#!/usr/bin/env bash
# Sync this repo into every coding harness: symlink each skill into each
# harness's skill dir, and AGENTS.md into each harness's global-rules path.
# This repo is the single source of truth. Idempotent — re-run anytime.
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

n=0
for dir in "${SKILL_DIRS[@]}"; do
  mkdir -p "$dir"
  for skill in "$REPO"/*/; do
    name="$(basename "$skill")"
    ln -sfn "${skill%/}" "$dir/$name"
    n=$((n + 1))
  done
done

for dest in "${RULES_DESTS[@]}"; do
  mkdir -p "$(dirname "$dest")"
  ln -sfn "$REPO/AGENTS.md" "$dest"
done

echo "linked $(ls -d "$REPO"/*/ | wc -l | tr -d ' ') skills into ${#SKILL_DIRS[@]} harnesses; AGENTS.md into ${#RULES_DESTS[@]} rules paths"
