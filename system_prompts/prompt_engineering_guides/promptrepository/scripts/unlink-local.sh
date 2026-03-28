#!/bin/bash
# Unlink local packages and restore GitHub packages
# This script calls the shared script from AssistantBuild

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SHARED_SCRIPT="$SCRIPT_DIR/../../AssistantBuild/scripts/git-hooks/unlink-local.sh"

# Pass package dependencies to unlink
exec "$SHARED_SCRIPT" "@jonverrier/assistant-common"
