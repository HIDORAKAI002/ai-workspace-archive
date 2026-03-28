#!/usr/bin/env bash
# Validate Flare AI skills: structure, SKILL.md frontmatter, and optional marketplace sync.
set -e

REPO_ROOT="${REPO_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$REPO_ROOT"
FAILED=0

echo "Validating skills in $REPO_ROOT..."

# 1. Each skill directory must have SKILL.md with valid frontmatter (name, description)
echo ""
echo "── Checking skill structure ─────────────────────────────"
for dir in skills/*-skill; do
  [ -d "$dir" ] || continue
  name=$(basename "$dir" -skill)
  skill_md="$dir/SKILL.md"
  skill_failed=0

  echo ""
  echo "  skill: $name"

  if [ ! -f "$skill_md" ]; then
    echo "    [FAIL] SKILL.md is missing"
    FAILED=1
    continue
  fi
  echo "    [OK]   SKILL.md exists"

  if [ ! -s "$skill_md" ]; then
    echo "    [FAIL] SKILL.md is empty"
    FAILED=1
    continue
  fi
  echo "    [OK]   SKILL.md is non-empty"

  first_line=$(head -1 "$skill_md")
  if [ "$first_line" != "---" ]; then
    echo "    [FAIL] SKILL.md must start with --- (frontmatter)"
    FAILED=1
    skill_failed=1
  else
    echo "    [OK]   frontmatter opens with ---"
  fi

  closing=$(awk 'NR>1 && /^---$/ {found=1; exit} END {print found+0}' "$skill_md")
  if [ "$closing" != "1" ]; then
    echo "    [FAIL] frontmatter is not closed with ---"
    FAILED=1
    skill_failed=1
  else
    echo "    [OK]   frontmatter closes with ---"
  fi

  if ! grep -q '^name:' "$skill_md"; then
    echo "    [FAIL] frontmatter missing 'name:'"
    FAILED=1
    skill_failed=1
  else
    echo "    [OK]   frontmatter has 'name:'"
  fi

  if ! grep -q '^description:' "$skill_md"; then
    echo "    [FAIL] frontmatter missing 'description:'"
    FAILED=1
    skill_failed=1
  else
    echo "    [OK]   frontmatter has 'description:'"
  fi

  frontmatter_name=$(sed -n '/^---$/,/^---$/p' "$skill_md" | grep '^name:' | head -1 | sed 's/^name:[[:space:]]*//;s/[[:space:]]*$//')
  if [ -n "$frontmatter_name" ] && [ "$frontmatter_name" != "$name" ]; then
    echo "    [FAIL] frontmatter name '$frontmatter_name' does not match directory name '$name'"
    FAILED=1
    skill_failed=1
  elif [ -n "$frontmatter_name" ]; then
    echo "    [OK]   frontmatter name matches directory ('$name')"
  fi

  if [ ! -f "$dir/reference.md" ]; then
    echo "    [FAIL] reference.md is missing"
    FAILED=1
    skill_failed=1
  else
    echo "    [OK]   reference.md exists"
  fi

  if [ "$skill_failed" -eq 0 ]; then
    echo "    => passed"
  else
    echo "    => FAILED"
  fi
done

# 2. Validate marketplace.json and that each plugin source exists and SKILL name matches
MARKETPLACE=".claude-plugin/marketplace.json"
echo ""
echo "── Checking marketplace.json → skills ───────────────────"
if [ -f "$MARKETPLACE" ]; then
  python3 - "$MARKETPLACE" "$REPO_ROOT" << 'PY'
import json
import sys
import os

path = sys.argv[1]
root = sys.argv[2]
failed = False
with open(path) as f:
    data = json.load(f)

for plugin in data.get("plugins", []):
    name = plugin.get("name")
    source = plugin.get("source", "").lstrip("./")
    skill_dir = os.path.join(root, source)
    skill_md = os.path.join(skill_dir, "SKILL.md")
    print(f"\n  plugin: {name}")
    if not os.path.isdir(skill_dir):
        print(f"    [FAIL] source '{source}' is not a directory")
        failed = True
        continue
    print(f"    [OK]   source directory exists ({source})")
    if not os.path.isfile(skill_md):
        print(f"    [FAIL] SKILL.md missing in {source}")
        failed = True
        continue
    print(f"    [OK]   SKILL.md found")
    with open(skill_md) as f:
        content = f.read()
    if not content.startswith("---"):
        print(f"    [FAIL] SKILL.md must start with ---")
        failed = True
        continue
    in_front = False
    fm_name = None
    for line in content.splitlines():
        if line.strip() == "---":
            in_front = not in_front
            if not in_front:
                break
            continue
        if in_front and line.startswith("name:"):
            fm_name = line.split(":", 1)[1].strip()
            break
    if fm_name != name:
        print(f"    [FAIL] SKILL.md name '{fm_name}' does not match marketplace name '{name}'")
        failed = True
    else:
        print(f"    [OK]   SKILL.md name matches marketplace ('{name}')")
        print(f"    => passed")

if failed:
    sys.exit(1)
PY
  [ $? -eq 0 ] || FAILED=1
else
  echo "  [SKIP] $MARKETPLACE not found"
fi

# 3. Reverse marketplace check: every skill directory must have a marketplace.json entry
echo ""
echo "── Checking skills → marketplace.json ───────────────────"
if [ -f "$MARKETPLACE" ]; then
  for dir in skills/*-skill; do
    [ -d "$dir" ] || continue
    name=$(basename "$dir" -skill)
    echo ""
    echo "  skill: $name"
    if ! python3 -c "
import json, sys
with open('$MARKETPLACE') as f:
    data = json.load(f)
names = [p.get('name') for p in data.get('plugins', [])]
sys.exit(0 if '$name' in names else 1)
" 2>/dev/null; then
      echo "    [FAIL] no entry in $MARKETPLACE"
      FAILED=1
    else
      echo "    [OK]   entry found in marketplace.json"
      echo "    => passed"
    fi
  done
else
  echo "  [SKIP] $MARKETPLACE not found"
fi

if [ $FAILED -eq 1 ]; then
  echo "Validation failed."
  exit 1
fi

echo "All skills validated successfully."
