#!/usr/bin/env bash
# Run the run-plan.mjs tests so check.sh picks them up with the other script tests.
set -euo pipefail
cd "$(dirname "$0")"
node --test runner/*.test.mjs
