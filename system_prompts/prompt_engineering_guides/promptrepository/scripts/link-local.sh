#!/bin/bash
# Link local AssistantCommon for development
# This script calls the shared script from AssistantBuild

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SHARED_SCRIPT="$SCRIPT_DIR/../../AssistantBuild/scripts/git-hooks/link-local.sh"

# Pass package dependencies in format: <package-name>:<directory>
exec "$SHARED_SCRIPT" "@jonverrier/assistant-common:AssistantCommon"
