#!/bin/bash
# Verify that main branch is properly configured (unlinked, uses GitHub Packages)
# This script calls the shared script from AssistantBuild

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SHARED_SCRIPT="$SCRIPT_DIR/../../AssistantBuild/scripts/git-hooks/verify-main.sh"

# Pass package dependencies to check
exec "$SHARED_SCRIPT" "@jonverrier/assistant-common"
