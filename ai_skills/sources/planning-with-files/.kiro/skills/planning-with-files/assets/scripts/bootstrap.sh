#!/usr/bin/env sh
# Bootstrap planning-with-files into the current workspace (idempotent).
# Run from the workspace root: sh .kiro/skills/planning-with-files/assets/scripts/bootstrap.sh

set -e

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname "$0")" && pwd)"
SKILL_DIR="$(CDPATH= cd -- "$SCRIPT_DIR/../.." && pwd)"
TEMPLATES_SRC="$SKILL_DIR/assets/templates"
PROJECT_DIR="${PLANNING_PROJECT_ROOT:-$(pwd)}"
PLAN_DEST="$PROJECT_DIR/.kiro/plan"
STEERING_DEST="$PROJECT_DIR/.kiro/steering"

echo ""
echo "planning-with-files (Kiro) — bootstrap"
echo "Project: $PROJECT_DIR"
echo ""

echo "[ Planning files → $PLAN_DEST ]"
mkdir -p "$PLAN_DEST"

installed_files=0
skipped_files=0
for tpl in task_plan.md findings.md progress.md; do
  dest="$PLAN_DEST/$tpl"
  if [ -f "$dest" ]; then
    echo "  SKIP  $tpl"
    skipped_files=$((skipped_files + 1))
  else
    cp "$TEMPLATES_SRC/$tpl" "$dest"
    echo "  OK    $tpl"
    installed_files=$((installed_files + 1))
  fi
done

echo ""
echo "[ Steering → $STEERING_DEST ]"
mkdir -p "$STEERING_DEST"

CONTEXT_SRC="$TEMPLATES_SRC/planning-context.md"
CONTEXT_DEST="$STEERING_DEST/planning-context.md"
if [ -f "$CONTEXT_DEST" ]; then
  echo "  SKIP  planning-context.md"
else
  cp "$CONTEXT_SRC" "$CONTEXT_DEST"
  echo "  OK    planning-context.md (auto inclusion + #[[file:]] references)"
fi

echo ""
echo "Done. Planning files: .kiro/plan/"
echo "Optional: import this folder as a Kiro workspace skill (Agent Steering & Skills → Import)."
echo ""
