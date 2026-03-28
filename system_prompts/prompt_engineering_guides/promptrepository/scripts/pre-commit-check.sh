#!/bin/bash
# Pre-commit hook to verify main branch doesn't have linked packages
# This can be used as a git pre-commit hook or run manually

BRANCH=$(git branch --show-current 2>/dev/null || echo "")

if [ -z "$BRANCH" ]; then
    # Not in git repo, skip check
    exit 0
fi

# Only enforce on main/master branches
if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "master" ]; then
    if [ -L "node_modules/@jonverrier/assistant-common" ]; then
        echo ""
        echo "❌ PRE-COMMIT CHECK FAILED"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "Cannot commit to '$BRANCH' branch with linked packages!"
        echo ""
        echo "Main branch must use GitHub Packages only (not local links)."
        echo ""
        echo "To fix:"
        echo "  1. Run: npm run unlink-local"
        echo "  2. Verify: npm run link-status"
        echo "  3. Then commit again"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        exit 1
    fi
fi

exit 0

