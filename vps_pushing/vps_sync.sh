#!/bin/bash
# =============================================================
# AI Workspace Archive — VPS Auto-Sync Script
# Runs on your VPS via cron to keep every upstream repo fresh.
# Every commit this makes shows on YOUR GitHub contribution graph.
#
# SETUP INSTRUCTIONS (run once on your VPS):
# 1. Install dependencies:      sudo apt install git python3 -y
# 2. Clone the archive:         git clone https://github.com/HIDORAKAI002/ai-workspace-archive.git ~/ai-workspace-archive
# 3. Copy this script:          cp vps_sync.sh ~/vps_sync.sh && chmod +x ~/vps_sync.sh
# 4. Copy sync_manifest.json:   cp sync_manifest.json ~/sync_manifest.json
# 5. Set your git identity:
#       git config --global user.name "HIDORAKAI002"
#       git config --global user.email "YOUR_GITHUB_EMAIL"
# 6. Set up a GitHub Personal Access Token (PAT):
#       Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Classic
#       Create token with "repo" scope → copy it
#       Store it: echo "https://HIDORAKAI002:YOUR_PAT@github.com" > ~/.git-credentials
#                 git config --global credential.helper store
# 7. Add cron job (runs every 6 hours):
#       crontab -e
#       Add this line:  0 */6 * * * /bin/bash ~/vps_sync.sh >> ~/sync.log 2>&1
# =============================================================

set -e

ARCHIVE_DIR="$HOME/ai-workspace-archive"
MANIFEST="$ARCHIVE_DIR/sync_manifest.json"
TEMP_DIR="/tmp/mcp_sync_temp"
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")
CHANGES_MADE=0

echo "============================================"
echo "🚀 AI Workspace Archive Sync — $TIMESTAMP"
echo "============================================"

# Pull latest state of our own archive repo
echo "📥 Pulling latest from archive repo..."
cd "$ARCHIVE_DIR"
git pull origin main --rebase

# Parse manifest and sync each repo
TOTAL=$(python3 -c "import json; d=json.load(open('$MANIFEST')); print(len(d['sync_targets']))")
echo "📦 Found $TOTAL repos to sync..."
echo ""

python3 - <<'PYEOF'
import json, subprocess, os, sys, shutil

manifest_path = os.path.expanduser("~/ai-workspace-archive/sync_manifest.json")
archive_dir   = os.path.expanduser("~/ai-workspace-archive")
temp_dir      = "/tmp/mcp_sync_temp"

with open(manifest_path) as f:
    manifest = json.load(f)

targets  = manifest["sync_targets"]
updated  = []
failed   = []
skipped  = []

for i, target in enumerate(targets, 1):
    label    = target["label"]
    upstream = target["upstream"]
    dest_rel = target["dest"]
    dest_abs = os.path.join(archive_dir, dest_rel)

    print(f"[{i}/{len(targets)}] {label}...")

    # Fresh clone to temp location
    temp_clone = os.path.join(temp_dir, f"clone_{i}")
    if os.path.exists(temp_clone):
        shutil.rmtree(temp_clone, ignore_errors=True)

    try:
        result = subprocess.run(
            ["git", "clone", "--depth", "1", "--quiet", upstream, temp_clone],
            capture_output=True, text=True, timeout=300
        )
        if result.returncode != 0:
            print(f"  ❌ Clone failed: {result.stderr.strip()[:100]}")
            failed.append(label)
            continue

        # Strip .git from the freshly cloned copy
        git_dir = os.path.join(temp_clone, ".git")
        if os.path.exists(git_dir):
            shutil.rmtree(git_dir, ignore_errors=True)

        # Compare old vs new using a simple file count + size check
        old_exists = os.path.exists(dest_abs)

        # Replace destination with fresh clone
        if old_exists:
            shutil.rmtree(dest_abs, ignore_errors=True)

        # Ensure parent dir exists
        os.makedirs(os.path.dirname(dest_abs), exist_ok=True)
        shutil.copytree(temp_clone, dest_abs)

        # Stage the changes
        subprocess.run(["git", "add", dest_rel], cwd=archive_dir, capture_output=True)

        # Check if there's actually a diff
        diff = subprocess.run(
            ["git", "diff", "--staged", "--stat", dest_rel],
            cwd=archive_dir, capture_output=True, text=True
        )
        if diff.stdout.strip():
            print(f"  ✅ Updated!")
            updated.append(label)
        else:
            # Unstage if nothing changed
            subprocess.run(["git", "reset", "HEAD", dest_rel], cwd=archive_dir, capture_output=True)
            print(f"  ⏭  No changes.")
            skipped.append(label)

        shutil.rmtree(temp_clone, ignore_errors=True)

    except subprocess.TimeoutExpired:
        print(f"  ⚠️  Timeout (>5 min). Skipping.")
        failed.append(label)
    except Exception as e:
        print(f"  💥 Error: {e}")
        failed.append(label)

# Cleanup temp
if os.path.exists(temp_dir):
    shutil.rmtree(temp_dir, ignore_errors=True)

print("")
print(f"📊 Results: {len(updated)} updated | {len(skipped)} unchanged | {len(failed)} failed")

# Write summary to a file for the bash script to read
with open("/tmp/sync_updated_count.txt", "w") as f:
    f.write(str(len(updated)))

if updated:
    print(f"\n📝 Updated repos: {', '.join(updated)}")
PYEOF

# Read how many repos were actually updated
UPDATED_COUNT=$(cat /tmp/sync_updated_count.txt 2>/dev/null || echo "0")

# Only commit and push if something actually changed
if [ "$UPDATED_COUNT" -gt "0" ]; then
    echo ""
    echo "📤 Committing and pushing $UPDATED_COUNT updates..."
    cd "$ARCHIVE_DIR"
    git commit -m "chore(sync): Auto-sync $UPDATED_COUNT repos [$TIMESTAMP]" \
               --author="HIDORAKAI002 <YOUR_GITHUB_EMAIL>"
    git push origin main
    echo "✅ Pushed to GitHub! ($UPDATED_COUNT green squares incoming 🟩)"
else
    echo ""
    echo "😴 No upstream changes detected. Nothing to push."
fi

echo ""
echo "✅ Sync complete — $TIMESTAMP"
echo "============================================"
