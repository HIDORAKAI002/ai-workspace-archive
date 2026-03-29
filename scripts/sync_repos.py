#!/usr/bin/env python3
"""
sync_repos.py — Master sync script for ai-workspace-archive
Reads _manifest.json and re-clones every repo, stripping .git folders.
Usage:
  python scripts/sync_repos.py --mode light   # sync lightweight repos only
  python scripts/sync_repos.py --mode heavy   # sync all repos including heavy ones
  python scripts/sync_repos.py --mode all     # sync everything
"""

import os
import sys
import json
import shutil
import subprocess
import argparse

MANIFEST_PATH = os.path.join(os.path.dirname(__file__), "..", "_manifest.json")
REPO_ROOT = os.path.join(os.path.dirname(__file__), "..")

def load_manifest():
    with open(MANIFEST_PATH, "r") as f:
        return json.load(f)

def remove_git_dir(path):
    git_dir = os.path.join(path, ".git")
    if os.path.exists(git_dir):
        shutil.rmtree(git_dir, ignore_errors=True)

def sync_repo(url, rel_path):
    dest = os.path.normpath(os.path.join(REPO_ROOT, rel_path))
    name = url.split("github.com/")[-1]

    print(f"  📥 Syncing {name}...")

    # Remove old copy if exists
    if os.path.exists(dest):
        shutil.rmtree(dest, ignore_errors=True)

    # Create parent dirs
    os.makedirs(os.path.dirname(dest), exist_ok=True)

    # Shallow clone
    result = subprocess.run(
        ["git", "clone", "--depth", "1", "--quiet", url, dest],
        capture_output=True, text=True
    )

    if result.returncode != 0:
        print(f"  ❌ Failed: {name} — {result.stderr.strip()[:100]}")
        return False

    # Strip nested .git
    remove_git_dir(dest)
    print(f"  ✅ {name}")
    return True

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["light", "heavy", "all"], default="light")
    args = parser.parse_args()

    manifest = load_manifest()
    repos = []

    if args.mode in ("light", "all"):
        repos += manifest.get("light", [])
    if args.mode in ("heavy", "all"):
        repos += manifest.get("heavy", [])

    print(f"\n🚀 Starting sync in [{args.mode}] mode — {len(repos)} repos\n")

    cloned, failed = 0, 0
    for entry in repos:
        success = sync_repo(entry["url"], entry["path"])
        if success:
            cloned += 1
        else:
            failed += 1

    print(f"\n{'='*50}")
    print(f"✅ Synced: {cloned} | ❌ Failed: {failed}")

if __name__ == "__main__":
    main()
