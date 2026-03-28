"""Validate skill directories: YAML frontmatter only.

Reference paths and markdown links are checked by lychee in CI and tessl skill lint.
"""

import os
import re
import sys
import yaml


def validate_skill(skill_dir):
    """
    Validates YAML frontmatter for each skill (skills.sh / Agent Skills compatibility).
    Returns True if no blocking errors were found.
    """
    skill_file = os.path.join(skill_dir, "SKILL.md")
    skill_name = os.path.basename(skill_dir)
    is_valid = True

    if not os.path.exists(skill_file):
        print(f"❌ {skill_name}: SKILL.md missing")
        return False

    with open(skill_file, "r", encoding="utf-8") as f:
        content = f.read()

    match = re.search(r"^---\s*\n(.*?)\n---\s*\n", content, re.DOTALL)
    if not match:
        print(f"❌ {skill_name}: Missing YAML frontmatter")
        is_valid = False
    else:
        try:
            data = yaml.safe_load(match.group(1))
            required_keys = ["name", "tags", "description"]
            for key in required_keys:
                if key not in data or not data[key]:
                    print(f"❌ {skill_name}: Missing or empty metadata '{key}'")
                    is_valid = False
        except yaml.YAMLError as exc:
            print(f"❌ {skill_name}: YAML syntax error: {exc}")
            is_valid = False

    if is_valid:
        print(f"✅ {skill_name}: Frontmatter OK")

    return is_valid


if __name__ == "__main__":
    BASE_DIR = "skills"

    if not os.path.exists(BASE_DIR):
        print(f"❌ Base directory '{BASE_DIR}' not found")
        sys.exit(1)

    all_valid = True
    for entry in os.scandir(BASE_DIR):
        if entry.is_dir():
            skill_result = validate_skill(entry.path)
            if not skill_result:
                all_valid = False

    if all_valid:
        print("\n🚀 All skills are valid and ready for the Agent Skills ecosystem!")
    else:
        print("\n❌ Validation failed. Please fix the errors listed above.")
        sys.exit(1)
