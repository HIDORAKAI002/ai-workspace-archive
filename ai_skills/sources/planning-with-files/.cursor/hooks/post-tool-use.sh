#!/bin/bash
# planning-with-files: Post-tool-use hook for Cursor
# Reminds the agent to update task_plan.md after file modifications.

if [ -f task_plan.md ]; then
    echo "[planning-with-files] Update progress.md with what you just did. If a phase is now complete, update task_plan.md status."
fi
exit 0
