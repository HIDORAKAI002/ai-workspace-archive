import os
import json
import shutil
import subprocess
import sys
import time
from datetime import datetime, timezone

# ─────────────────────────────────────────────────────────
# CONFIG — Fill these in before uploading to Pterodactyl!
# ─────────────────────────────────────────────────────────
GIT_NAME       = "HIDORAKAI002"
GIT_EMAIL      = "YOUR_GITHUB_EMAIL_HERE"
GITHUB_TOKEN   = "YOUR_GITHUB_PAT_HERE"    # ghp_xxxx (needs 'repo' scope)
ARCHIVE_REPO   = "https://github.com/HIDORAKAI002/ai-workspace-archive.git"
SYNC_INTERVAL  = 6 * 60 * 60               # seconds between syncs (6 hours)
# ─────────────────────────────────────────────────────────

# Paths — works automatically in Pterodactyl /home/container/
BASE_DIR      = os.path.dirname(os.path.abspath(__file__))  # /home/container
ARCHIVE_DIR   = os.path.join(BASE_DIR, "ai-workspace-archive")
MANIFEST_PATH = os.path.join(BASE_DIR, "sync_manifest.json")
TEMP_DIR      = "/tmp/ai_sync_temp"


def log(msg: str):
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    print(f"[{ts}] {msg}", flush=True)


def run(cmd, cwd=None, timeout=300) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=timeout)


def check_git():
    result = run(["git", "--version"])
    if result.returncode != 0:
        log("❌ ERROR: git is not installed in this container!")
        log("   Add 'apt install git -y' to your Pterodactyl install script and reinstall.")
        sys.exit(1)
    log(f"✅ {result.stdout.strip()}")


def check_manifest():
    if not os.path.exists(MANIFEST_PATH):
        log(f"❌ ERROR: sync_manifest.json not found at {MANIFEST_PATH}")
        log("   Upload sync_manifest.json to /home/container/ on your server.")
        sys.exit(1)
    with open(MANIFEST_PATH) as f:
        manifest = json.load(f)
    count = len(manifest.get("sync_targets", []))
    log(f"✅ Manifest loaded — {count} repos tracked")
    return manifest


def setup_archive():
    """Clone the archive repo if it doesn't exist yet."""
    if not os.path.exists(ARCHIVE_DIR):
        log("📥 First run — cloning your archive repo...")
        auth_url = ARCHIVE_REPO.replace("https://", f"https://{GIT_NAME}:{GITHUB_TOKEN}@")
        result = subprocess.run(["git", "clone", "--depth", "1", auth_url, ARCHIVE_DIR])
        if result.returncode != 0:
            log("❌ Failed to clone archive repo. Check your GITHUB_TOKEN and ARCHIVE_REPO settings.")
            sys.exit(1)
        log("✅ Archive cloned successfully.")
    else:
        log("✅ Archive repo already exists locally.")

    # Set identity for this repo
    run(["git", "config", "user.name", GIT_NAME], cwd=ARCHIVE_DIR)
    run(["git", "config", "user.email", GIT_EMAIL], cwd=ARCHIVE_DIR)


def pull_archive():
    log("🔄 Pulling latest archive state from GitHub...")
    auth_url = ARCHIVE_REPO.replace("https://", f"https://{GIT_NAME}:{GITHUB_TOKEN}@")
    run(["git", "remote", "set-url", "origin", auth_url], cwd=ARCHIVE_DIR)
    run(["git", "pull", "--rebase", "origin", "main"], cwd=ARCHIVE_DIR)


def sync_one(target: dict) -> bool:
    """Clone upstream, strip .git, replace dest. Returns True if changes found."""
    label    = target["label"]
    upstream = target["upstream"]
    dest_rel = target["dest"]
    dest_abs = os.path.join(ARCHIVE_DIR, dest_rel)
    temp     = os.path.join(TEMP_DIR, dest_rel.replace("/", "_").replace("\\", "_"))

    if os.path.exists(temp):
        shutil.rmtree(temp, ignore_errors=True)

    result = run(["git", "clone", "--depth", "1", "--quiet", upstream, temp], timeout=300)
    if result.returncode != 0:
        log(f"  ❌ Clone failed: {result.stderr.strip()[:100]}")
        return False

    # Strip .git
    git_dir = os.path.join(temp, ".git")
    if os.path.exists(git_dir):
        shutil.rmtree(git_dir, ignore_errors=True)

    # Replace destination
    if os.path.exists(dest_abs):
        shutil.rmtree(dest_abs, ignore_errors=True)
    os.makedirs(os.path.dirname(dest_abs), exist_ok=True)
    shutil.copytree(temp, dest_abs)
    shutil.rmtree(temp, ignore_errors=True)

    # Stage and check diff
    run(["git", "add", dest_rel], cwd=ARCHIVE_DIR)
    diff = run(["git", "diff", "--staged", "--stat", dest_rel], cwd=ARCHIVE_DIR)
    if diff.stdout.strip():
        log(f"  ✅ Updated!")
        return True
    else:
        run(["git", "reset", "HEAD", dest_rel], cwd=ARCHIVE_DIR)
        log(f"  ⏭  No changes.")
        return False


def sync_all(manifest: dict):
    targets = manifest["sync_targets"]
    updated, failed = [], []
    os.makedirs(TEMP_DIR, exist_ok=True)

    for i, target in enumerate(targets, 1):
        log(f"[{i}/{len(targets)}] {target['label']}")
        try:
            if sync_one(target):
                updated.append(target["label"])
        except subprocess.TimeoutExpired:
            log(f"  ⚠️  Timed out — skipping.")
            failed.append(target["label"])
        except Exception as e:
            log(f"  💥 Error: {e}")
            failed.append(target["label"])

    shutil.rmtree(TEMP_DIR, ignore_errors=True)
    return updated, failed


def push(updated_count: int):
    ts  = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    msg = f"chore(sync): Auto-sync {updated_count} repos [{ts}]"

    commit = run(
        ["git", "commit", "-m", msg, f"--author={GIT_NAME} <{GIT_EMAIL}>"],
        cwd=ARCHIVE_DIR
    )
    if commit.returncode != 0:
        log(f"  ⚠️  Commit issue: {commit.stderr.strip()[:100]}")
        return

    auth_url = ARCHIVE_REPO.replace("https://", f"https://{GIT_NAME}:{GITHUB_TOKEN}@")
    push_result = run(["git", "push", auth_url, "main"], cwd=ARCHIVE_DIR)
    if push_result.returncode == 0:
        log(f"🟩 Pushed! {updated_count} changes → GitHub contribution counted!")
    else:
        log(f"❌ Push failed: {push_result.stderr.strip()[:200]}")


def main():
    log("=" * 55)
    log("🚀 AI Workspace Archive — Auto-Sync Bot")
    log(f"   Interval : every {SYNC_INTERVAL // 3600} hours")
    log(f"   Tracking : see sync_manifest.json")
    log("=" * 55)

    check_git()
    manifest = check_manifest()
    setup_archive()

    while True:
        log("")
        log("━" * 55)
        log("🔁 Sync cycle starting...")
        pull_archive()

        updated, failed = sync_all(manifest)

        log("")
        log(f"📊 {len(updated)} updated | {len(manifest['sync_targets']) - len(updated) - len(failed)} unchanged | {len(failed)} failed")

        if updated:
            push(len(updated))
        else:
            log("😴 Nothing changed upstream. No push needed.")

        if failed:
            log(f"⚠️  Failed: {', '.join(failed)}")

        log(f"⏰ Sleeping {SYNC_INTERVAL // 3600}h until next sync...")
        log("━" * 55)
        time.sleep(SYNC_INTERVAL)


if __name__ == "__main__":
    main()
