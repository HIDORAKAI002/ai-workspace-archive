#!/bin/bash
# planning-with-files: User prompt submit hook for Cursor
# Injects plan context on every user message.
# Critical for session recovery after /clear — dumps actual content, not just advice.

if [ -f task_plan.md ]; then
    echo "[planning-with-files] ACTIVE PLAN — current state:"
    head -50 task_plan.md
    echo ""
    echo "=== recent progress ==="
    tail -20 progress.md 2>/dev/null
    echo ""
    echo "[planning-with-files] Read findings.md for research context. Continue from the current phase."
fi
exit 0
