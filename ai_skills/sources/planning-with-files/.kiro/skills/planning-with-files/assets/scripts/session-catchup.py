#!/usr/bin/env python3
"""
Session catchup for Kiro / planning-with-files.

Scans .kiro/plan/ for planning files and prints a short report (mtime + summary)
so the agent can re-orient after a context reset or long gap.

Usage:
  python3 session-catchup.py [project_dir]
"""

from __future__ import annotations

import datetime
import os
import sys


def read_file_safe(path: str) -> str | None:
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    except OSError:
        return None


def get_mtime_str(path: str) -> str:
    try:
        mtime = os.path.getmtime(path)
        return datetime.datetime.fromtimestamp(mtime).strftime("%Y-%m-%d %H:%M:%S")
    except OSError:
        return "unknown"


def extract_section(content: str, heading: str) -> str | None:
    lines = content.splitlines()
    in_section = False
    result: list[str] = []
    for line in lines:
        if line.startswith("## " + heading) or line.startswith("# " + heading):
            in_section = True
            continue
        if in_section:
            if line.startswith("## ") or line.startswith("# "):
                break
            result.append(line)
    text = "\n".join(result).strip()
    return text[:500] if text else None


def main() -> None:
    project_dir = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.getcwd())
    plan_dir = os.path.join(project_dir, ".kiro", "plan")
    plan_files = {
        "task_plan.md": os.path.join(plan_dir, "task_plan.md"),
        "findings.md": os.path.join(plan_dir, "findings.md"),
        "progress.md": os.path.join(plan_dir, "progress.md"),
    }

    found = {name: path for name, path in plan_files.items() if os.path.exists(path)}

    if not found:
        print("[planning-with-files] No planning files under .kiro/plan/. Run bootstrap first.")
        sys.exit(0)

    print("=" * 60)
    print("[planning-with-files] SESSION CATCHUP REPORT")
    print(f"Project: {project_dir}")
    print("=" * 60)

    for name, path in found.items():
        mtime = get_mtime_str(path)
        content = read_file_safe(path)
        print(f"\n--- {name} (last modified: {mtime}) ---")

        if not content:
            print("  (empty)")
            continue

        if name == "task_plan.md":
            goal = extract_section(content, "Goal")
            current_phase = extract_section(content, "Current Phase")
            if goal:
                print(f"  Goal: {goal[:200]}")
            if current_phase:
                print(f"  Current Phase: {current_phase[:100]}")
            for line in content.splitlines():
                if "Status:" in line:
                    print(f"  {line.strip()}")

        elif name == "findings.md":
            requirements = extract_section(content, "Requirements")
            if requirements:
                lines = [
                    l
                    for l in requirements.splitlines()
                    if l.strip() and not l.strip().startswith("<!--")
                ]
                preview = "\n  ".join(lines[:5])
                if preview:
                    print(f"  Requirements:\n  {preview}")

        elif name == "progress.md":
            lines = [
                l
                for l in content.splitlines()
                if l.strip() and not l.strip().startswith("<!--")
            ]
            last_lines = lines[-8:] if len(lines) >= 8 else lines
            if last_lines:
                print("  Recent entries:")
                for line in last_lines:
                    print(f"    {line}")

    print("\n" + "=" * 60)
    print("Next: read the full files under .kiro/plan/, then `git diff --stat` if repo drift is suspected.")
    print("=" * 60)


if __name__ == "__main__":
    main()
