"""
AI Workspace Archive - Auto-Sync Bot (Disk-Safe Edition v2)
=========================================================
Pterodactyl Python 3.12 compatible.

Fixes for Pterodactyl daemon limits:
1. Cleans up the old 9GB folder from the first attempt.
2. Fixes symlink errors (Errno 2) which crashed Trigger.dev by enabling symlinks=True.
3. Wraps repo syncing in try-except so an error on one repo doesn't cancel the others.
"""

import json, os, shutil, subprocess, time
from datetime import datetime, timezone

GIT_NAME     = "YOUR_GITHUB_USERNAME"
GIT_EMAIL    = "YOUR_GITHUB_EMAIL"
GITHUB_TOKEN = "ghp_YOUR_PERSONAL_ACCESS_TOKEN"
REPO_OWNER   = "YOUR_GITHUB_USERNAME"
REPO_NAME    = "ai-workspace-archive"
SYNC_HOURS   = 6

WORK_DIR  = "/home/container"
MANIFEST  = os.path.join(WORK_DIR, "sync_manifest.json")
ARCHIVE   = os.path.join(WORK_DIR, "_archive")
TMP       = os.path.join(WORK_DIR, "_tmp")

def log(msg):
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    print(f"[{ts}] {msg}", flush=True)

def sh(cmd, cwd=None):
    r = subprocess.run(cmd, shell=True, cwd=cwd, capture_output=True, text=True, timeout=600)
    return r.returncode, r.stdout.strip(), r.stderr.strip()

def wipe_tmp():
    shutil.rmtree(TMP, ignore_errors=True)

def archive_url():
    return f"https://{GIT_NAME}:{GITHUB_TOKEN}@github.com/{REPO_OWNER}/{REPO_NAME}.git"

def prepare_archive():
    git_dir = os.path.join(ARCHIVE, ".git")
    if os.path.isdir(git_dir):
        log("  Pulling latest archive state...")
        sh(f'git remote set-url origin "{archive_url()}"', cwd=ARCHIVE)
        sh("git fetch --depth 1 origin main", cwd=ARCHIVE)
        sh("git reset --hard origin/main", cwd=ARCHIVE)
        sh("git clean -fd", cwd=ARCHIVE)
        return True
    
    shutil.rmtree(ARCHIVE, ignore_errors=True)
    log("  Cloning archive (sparse blobless - zero disk footprint)...")
    rc, _, err = sh(f'git clone --depth 1 --filter=blob:none --sparse "{archive_url()}" "{ARCHIVE}"')
    if rc != 0:
        log(f"  Clone failed: {err[:200]}")
        return False
    
    sh(f'git config user.name "{GIT_NAME}"', cwd=ARCHIVE)
    sh(f'git config user.email "{GIT_EMAIL}"', cwd=ARCHIVE)
    log("  Archive ready.")
    return True

def fingerprint(directory):
    if not os.path.isdir(directory): return "MISSING"
    items = []
    for root, dirs, files in os.walk(directory):
        dirs[:] = sorted(d for d in dirs if not d.startswith('.'))
        for f in sorted(files):
            try:
                fp = os.path.join(root, f)
                if not os.path.islink(fp):
                    items.append(f"{os.path.relpath(fp, directory)}:{os.path.getsize(fp)}")
            except OSError: pass
            if len(items) >= 500: break
        if len(items) >= 500: break
    return "|".join(items)

def sync_repo(entry, idx, total):
    name, upstream, dest = entry["name"], entry["upstream"], entry["dest"]
    log(f"[{idx}/{total}] {name}")
    try:
        sh(f'git sparse-checkout set "{dest}"', cwd=ARCHIVE)
        
        wipe_tmp()
        tmp_repo = os.path.join(TMP, "repo")
        rc, _, err = sh(f'git clone --depth 1 --single-branch "{upstream}" "{tmp_repo}"')
        if rc != 0:
            log(f"  FAIL: {err.split(chr(10))[0][:120]}")
            wipe_tmp()
            return "failed"
        
        shutil.rmtree(os.path.join(tmp_repo, ".git"), ignore_errors=True)
        archive_dest = os.path.join(ARCHIVE, dest)
        if fingerprint(archive_dest) == fingerprint(tmp_repo) and fingerprint(archive_dest) != "MISSING":
            log("  No changes.")
            wipe_tmp()
            return "unchanged"

        shutil.rmtree(archive_dest, ignore_errors=True)
        os.makedirs(os.path.dirname(archive_dest), exist_ok=True)
        shutil.copytree(tmp_repo, archive_dest, symlinks=True, ignore_dangling_symlinks=True, dirs_exist_ok=True)
        sh(f'git add "{dest}"', cwd=ARCHIVE)
        
        rc, status, _ = sh("git status --porcelain", cwd=ARCHIVE)
        if status.strip():
            ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
            sh(f'git commit -m "chore(sync): Update {name} [{ts}]"', cwd=ARCHIVE)
            log("  Updated & Committed!")
            wipe_tmp()
            return "updated"
        else:
            log("  Updated files matched history exactly.")
            wipe_tmp()
            return "unchanged"
    except Exception as e:
        log(f"  ERROR: {str(e)[:150]}")
        wipe_tmp()
        return "failed"

def count_files(p):
    total = 0
    if not os.path.exists(p): return 0
    for root, dirs, files in os.walk(p):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        total += len([f for f in files if not f.startswith('.')])
    return total

def write_post_cycle_data(repos, updated_names):
    stats = {
        "mcp_repos": sum(1 for r in repos if r.get("dest", "").startswith("mcps/")),
        "nocode_repos": sum(1 for r in repos if r.get("dest", "").startswith("nocode_platforms/")),
        "system_prompt_repos": sum(1 for r in repos if r.get("dest", "").startswith("system_prompts/")),
        "ai_skills_repos": sum(1 for r in repos if r.get("dest", "").startswith("ai_skills/")),
        "public_apis_repos": sum(1 for r in repos if r.get("dest", "").startswith("public_apis/")),
        "total_repos": len(repos),
        "total_files": count_files(ARCHIVE),
        "ai_skills_files": count_files(os.path.join(ARCHIVE, "ai_skills")),
        "ide_rules_files": count_files(os.path.join(ARCHIVE, "ide_rules"))
    }
    with open(os.path.join(ARCHIVE, "file_counts.json"), "w") as f:
        json.dump(stats, f, indent=2)
    
    changelog_path = os.path.join(ARCHIVE, "CHANGELOG.md")
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    
    entry = f"## [{ts}] Auto-Sync\n"
    if updated_names:
        entry += f"- **{len(updated_names)} Repositories Updated:** {', '.join(updated_names)}\n"
    else:
        entry += "- **No updates** across all tracked repositories.\n"
    entry += "\n"
    
    existing = ""
    if os.path.exists(changelog_path):
        with open(changelog_path, "r") as f: existing = f.read()
    
    with open(changelog_path, "w") as f:
        f.write("# Archive Sync Changelog\n\n" + entry + existing.replace("# Archive Sync Changelog\n\n", ""))
        
    sh('git add file_counts.json CHANGELOG.md', cwd=ARCHIVE)
    rc, status, _ = sh("git status --porcelain", cwd=ARCHIVE)
    if status.strip():
        sh(f'git commit -m "docs(sync): generate automated log and stats [{ts}]"', cwd=ARCHIVE)
        return True
    return False

def push(n_updated):
    if n_updated <= 0: return
    log("Pushing to GitHub...")
    rc, _, err = sh("git push origin main", cwd=ARCHIVE)
    if rc != 0: log(f"PUSH FAILED!\nError: {err[:200]}")
    else: log(f"PUSHED! {n_updated} repo updates -> GitHub contribution counted!")

def cycle(repos):
    log("\n" + "=" * 48 + f"\nSync cycle starting... Repos: {len(repos)}\n" + "=" * 48)
    if not prepare_archive(): return
    counts = {"updated": 0, "unchanged": 0, "failed": 0, "skipped": 0}
    updated_names = []
    
    for i, entry in enumerate(repos, 1):
        r = sync_repo(entry, i, len(repos))
        counts[r] = counts.get(r, 0) + 1
        if r == "updated": updated_names.append(entry["name"])
        
    stats_committed = write_post_cycle_data(repos, updated_names)
    
    log(f"Results: {counts['updated']} up | {counts['unchanged']} unch | {counts['failed']} fail")
    if counts["updated"] > 0 or stats_committed: 
        push(counts["updated"] + (1 if stats_committed else 0))
        
    wipe_tmp()
    sh("git gc --prune=all", cwd=ARCHIVE)

def preflight():
    old = os.path.join(WORK_DIR, "ai-workspace-archive")
    if os.path.exists(old):
        log("  [Cleanup] Removing old bloated ai-workspace-archive folder to free up 9+ GB...")
        shutil.rmtree(old, ignore_errors=True)

    with open(MANIFEST) as f: repos = json.load(f)
    return repos

def main():
    repos = preflight()
    while True:
        try: cycle(repos)
        except Exception as e: log(f"Cycle error: {e}")
        log(f"Sleeping {SYNC_HOURS}h...\n" + "-" * 48)
        time.sleep(SYNC_HOURS * 3600)

if __name__ == "__main__": main()
