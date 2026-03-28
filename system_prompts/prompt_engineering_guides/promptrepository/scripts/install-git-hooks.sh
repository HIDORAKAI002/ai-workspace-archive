#!/bin/bash
# Configure this repo to use versioned hooks from .githooks/
# Run once after clone. Uses Git's core.hooksPath (no copying into .git/hooks).

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if [ ! -d "$REPO_ROOT/.git" ]; then
    echo "❌ Error: Not a git repository. Run from a package directory."
    exit 1
fi

if [ ! -d "$REPO_ROOT/.githooks" ]; then
    echo "❌ Error: .githooks/ not found in this repo."
    exit 1
fi

cd "$REPO_ROOT"
git config core.hooksPath .githooks
chmod +x .githooks/* 2>/dev/null || true

echo "✅ Git hooks configured: core.hooksPath = .githooks"
echo "   Hooks in .githooks/ are now active (e.g. commit-msg, pre-commit, pre-push)."
