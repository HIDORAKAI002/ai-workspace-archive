#!/usr/bin/env sh
# Report phase completion status for task_plan.md (stdout only, always exit 0).
# Default plan path: .kiro/plan/task_plan.md (relative to current directory).

PLAN_FILE="${1:-.kiro/plan/task_plan.md}"

if [ ! -f "$PLAN_FILE" ]; then
  echo "[planning-with-files] No task plan at $PLAN_FILE — run bootstrap or specify path."
  exit 0
fi

TOTAL=$(grep -c "### Phase" "$PLAN_FILE" 2>/dev/null || echo 0)
COMPLETE=$(grep -cF "**Status:** complete" "$PLAN_FILE" 2>/dev/null || echo 0)
IN_PROGRESS=$(grep -cF "**Status:** in_progress" "$PLAN_FILE" 2>/dev/null || echo 0)
PENDING=$(grep -cF "**Status:** pending" "$PLAN_FILE" 2>/dev/null || echo 0)

if [ "$COMPLETE" -eq 0 ] && [ "$IN_PROGRESS" -eq 0 ] && [ "$PENDING" -eq 0 ]; then
  COMPLETE=$(grep -c "\[complete\]" "$PLAN_FILE" 2>/dev/null || echo 0)
  IN_PROGRESS=$(grep -c "\[in_progress\]" "$PLAN_FILE" 2>/dev/null || echo 0)
  PENDING=$(grep -c "\[pending\]" "$PLAN_FILE" 2>/dev/null || echo 0)
fi

: "${TOTAL:=0}"
: "${COMPLETE:=0}"
: "${IN_PROGRESS:=0}"
: "${PENDING:=0}"

if [ "$COMPLETE" -eq "$TOTAL" ] && [ "$TOTAL" -gt 0 ]; then
  echo "[planning-with-files] ALL PHASES COMPLETE ($COMPLETE/$TOTAL)."
else
  echo "[planning-with-files] In progress ($COMPLETE/$TOTAL phases complete)."
  if [ "$IN_PROGRESS" -gt 0 ]; then
    echo "[planning-with-files] $IN_PROGRESS phase(s) in_progress."
  fi
  if [ "$PENDING" -gt 0 ]; then
    echo "[planning-with-files] $PENDING phase(s) pending."
  fi
fi
exit 0
