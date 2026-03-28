#!/bin/bash
# Pre-push hook to verify main branch doesn't have linked packages
# This script calls the shared script from AssistantBuild

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SHARED_SCRIPT="$SCRIPT_DIR/../../AssistantBuild/scripts/git-hooks/pre-push-check.sh"

# Pass package dependencies to check
exec "$SHARED_SCRIPT" "@jonverrier/assistant-common"
