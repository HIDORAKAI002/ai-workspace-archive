import os
import json
import shutil
import subprocess
import time
from datetime import datetime, timezone

# ─────────────────────────────────────────
# CONFIG — update these before running!
# ─────────────────────────────────────────
ARCHIVE_REPO   = "https://github.com/HIDORAKAI002/ai-workspace-archive.git"
GIT_NAME       = "HIDORAKAI002"
GIT_EMAIL      = "YOUR_GITHUB_EMAIL_HERE"
GITHUB_TOKEN   = "YOUR_GITHUB_PAT_HERE"   # ghp_xxxx from GitHub Settings
SYNC_INTERVAL  = 6 * 60 * 60              # 6 hours in seconds
TEMP_DIR       = "/tmp/ai_sync_temp"

# ─────────────────────────────────────────


def log(msg):
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    print(f"[{ts}] {msg}", flush=True)


def run(cmd, cwd=None, timeout=300):
    result = subprocess.run(
        cmd, cwd=cwd, capture_output=True, text=True, timeout=timeout
    )
    return result


def setup_git(archive_dir):
    run(["git", "config", "user.name", GIT_NAME], cwd=archive_dir)
    run(["git", "config", "user.email", GIT_EMAIL], cwd=archive_dir)


def get_archive_dir():
    """Clone archive repo if not present, or return existing path."""
    archive_dir = os.path.expanduser("~/ai-workspace-archive")
    if not os.path.exists(archive_dir):
        log("📥 Cloning archive repo for the first time...")
        auth_url = ARCHIVE_REPO.replace(
            "https://", f"https://{GIT_NAME}:{GITHUB_TOKEN}@"
        )
        subprocess.run(
            ["git", "clone", auth_url, archive_dir],
            check=True
        )
        log("✅ Archive cloned.")
    return archive_dir


def pull_archive(archive_dir):
    log("🔄 Pulling latest from archive...")
    run(["git", "pull", "--rebase", "origin", "main"], cwd=archive_dir)


def sync_repo(target, archive_dir):
    label    = target["label"]
    upstream = target["upstream"]
    dest_rel = target["dest"]
    dest_abs = os.path.join(archive_dir, dest_rel)
    temp     = os.path.join(TEMP_DIR, dest_rel.replace("/", "_"))

    # Clean up old temp
    if os.path.exists(temp):
        shutil.rmtree(temp, ignore_errors=True)

    # Clone fresh copy
    result = run(["git", "clone", "--depth", "1", "--quiet", upstream, temp])
    if result.returncode != 0:
        log(f"  ❌ Clone failed: {result.stderr.strip()[:120]}")
        return False

    # Strip .git folder
    git_dir = os.path.join(temp, ".git")
    if os.path.exists(git_dir):
        shutil.rmtree(git_dir, ignore_errors=True)

    # Replace destination
    if os.path.exists(dest_abs):
        shutil.rmtree(dest_abs, ignore_errors=True)
    os.makedirs(os.path.dirname(dest_abs), exist_ok=True)
    shutil.copytree(temp, dest_abs)
    shutil.rmtree(temp, ignore_errors=True)

    # Stage it
    run(["git", "add", dest_rel], cwd=archive_dir)

    # Check if anything actually changed
    diff = run(["git", "diff", "--staged", "--stat", dest_rel], cwd=archive_dir)
    if diff.stdout.strip():
        log(f"  ✅ {label} — updated!")
        return True
    else:
        run(["git", "reset", "HEAD", dest_rel], cwd=archive_dir)
        log(f"  ⏭  {label} — no changes.")
        return False


def sync_all(archive_dir, manifest_path):
    with open(manifest_path) as f:
        manifest = json.load(f)

    targets = manifest["sync_targets"]
    log(f"📦 Syncing {len(targets)} repos...")

    os.makedirs(TEMP_DIR, exist_ok=True)
    updated = []
    failed  = []

    for i, target in enumerate(targets, 1):
        log(f"[{i}/{len(targets)}] {target['label']}")
        try:
            changed = sync_repo(target, archive_dir)
            if changed:
                updated.append(target["label"])
        except Exception as e:
            log(f"  💥 Error: {e}")
            failed.append(target["label"])

    # Clean temp dir
    shutil.rmtree(TEMP_DIR, ignore_errors=True)

    return updated, failed


def commit_and_push(archive_dir, updated_count):
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    msg = f"chore(sync): Auto-sync {updated_count} repos [{ts}]"

    result = run(
        ["git", "commit", "-m", msg,
         f"--author={GIT_NAME} <{GIT_EMAIL}>"],
        cwd=archive_dir
    )
    if result.returncode != 0:
        log(f"  Commit failed: {result.stderr.strip()}")
        return

    # Push with token auth
    auth_url = ARCHIVE_REPO.replace(
        "https://", f"https://{GIT_NAME}:{GITHUB_TOKEN}@"
    )
    push = run(["git", "push", auth_url, "main"], cwd=archive_dir)
    if push.returncode == 0:
        log(f"✅ Pushed! {updated_count} repos updated → 🟩 contribution counted!")
    else:
        log(f"❌ Push failed: {push.stderr.strip()[:200]}")


def main_loop():
    log("=" * 50)
    log("🚀 AI Workspace Archive — VPS Sync Bot Started")
    log("=" * 50)

    archive_dir   = get_archive_dir()
    manifest_path = os.path.join(archive_dir, "sync_manifest.json")
    setup_git(archive_dir)

    while True:
        log("")
        log("━" * 50)
        log("🔁 Starting sync cycle...")

        pull_archive(archive_dir)
        updated, failed = sync_all(archive_dir, manifest_path)

        log("")
        log(f"📊 {len(updated)} updated | {len(failed)} failed")

        if updated:
            commit_and_push(archive_dir, len(updated))
        else:
            log("😴 Nothing changed upstream. Skipping push.")

        if failed:
            log(f"⚠️  Failed repos: {', '.join(failed)}")

        log(f"⏰ Next sync in {SYNC_INTERVAL // 3600} hours...")
        log("━" * 50)
        time.sleep(SYNC_INTERVAL)


if __name__ == "__main__":
    main_loop()
