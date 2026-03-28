#!/bin/bash
# Check if local packages are linked
# This script calls the shared script from AssistantBuild

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SHARED_SCRIPT="$SCRIPT_DIR/../../AssistantBuild/scripts/git-hooks/link-status.sh"

# Pass package dependencies to check
exec "$SHARED_SCRIPT" "@jonverrier/assistant-common"
