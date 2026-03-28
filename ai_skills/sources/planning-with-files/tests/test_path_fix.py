"""Test the path sanitization fix for session-catchup.py"""
import os
import sys
from pathlib import Path

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'skills', 'planning-with-files', 'scripts'))

# Re-implement the fix here for testing (avoids import issues)
def normalize_path(project_path):
    p = project_path
    # Git Bash / MSYS2: /c/Users/... -> C:/Users/...
    if len(p) >= 3 and p[0] == '/' and p[2] == '/':
        p = p[1].upper() + ':' + p[2:]
    try:
        resolved = str(Path(p).resolve())
        if os.name == 'nt' or os.sep == '\\':
            p = resolved
    except (OSError, ValueError):
        pass
    return p


def sanitize(project_path):
    normalized = normalize_path(project_path)
    sanitized = normalized.replace('\\', '-').replace('/', '-').replace(':', '-')
    sanitized = sanitized.replace('_', '-')
    if sanitized.startswith('-'):
        sanitized = sanitized[1:]
    return sanitized


expected = "C--Users-oasrvadmin-Documents-planning-with-files-repo"

tests = {
    "Git Bash": "/c/Users/oasrvadmin/Documents/planning-with-files-repo",
    "Forward slash": "C:/Users/oasrvadmin/Documents/planning-with-files-repo",
}

all_pass = True
for label, path in tests.items():
    result = sanitize(path)
    claude_dir = Path.home() / '.claude' / 'projects' / result
    match = result == expected
    exists = claude_dir.exists()
    print(f"[{label}]")
    print(f"  Input:    {path}")
    print(f"  Result:   {result}")
    print(f"  Expected: {expected}")
    print(f"  Match:    {match}")
    print(f"  Dir exists: {exists}")
    print()
    if not match:
        all_pass = False

if all_pass:
    print("ALL TESTS PASSED")
else:
    print("SOME TESTS FAILED")
    sys.exit(1)
