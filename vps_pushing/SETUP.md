# 🚀 Pterodactyl Python Egg — Setup Guide

Upload `app.py`, `requirements.txt`, and `sync_manifest.json` to your server.

---

## Step 1 — Edit `app.py`

Open `app.py` and fill in your details at the top:

```python
GIT_NAME      = "HIDORAKAI002"           # Your GitHub username
GIT_EMAIL     = "your@email.com"         # Your GitHub account email
GITHUB_TOKEN  = "ghp_xxxxxxxxxxxx"       # Your GitHub Personal Access Token
SYNC_INTERVAL = 6 * 60 * 60             # How often to sync (default: every 6 hours)
```

**To get a GitHub Personal Access Token:**
1. GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Generate new token → give it `repo` scope only → copy it

---

## Step 2 — Pterodactyl Egg Settings

In your Pterodactyl panel for this server:

| Setting | Value |
|---|---|
| **Egg** | Generic Python |
| **Startup Command** | `python app.py` |
| **Python Version** | 3.10+ |

---

## Step 3 — Make Sure `git` Is Installed

Add this to your server's **Install Script** in Pterodactyl (or run once via console):
```bash
apt update && apt install git -y
```

---

## Step 4 — Start the Server

Hit **Start** in Pterodactyl. You'll see output like:

```
[2026-03-29 02:00 UTC] 🚀 AI Workspace Archive — VPS Sync Bot Started
[2026-03-29 02:00 UTC] 📥 Cloning archive repo for the first time...
[2026-03-29 02:00 UTC] 📦 Syncing 44 repos...
[2026-03-29 02:00 UTC] [1/44] Public APIs Directory
[2026-03-29 02:00 UTC]   ✅ Updated!
...
[2026-03-29 02:08 UTC] ✅ Pushed! 3 repos updated → 🟩 contribution counted!
[2026-03-29 02:08 UTC] ⏰ Next sync in 6 hours...
```

The bot runs forever — syncing every 6 hours, pushing real commits to your GitHub.

---

## 🟩 Contribution Graph

Every push counts as a real GitHub contribution because the commits are authored with your `GIT_NAME` and `GIT_EMAIL`. As long as these match your GitHub account, the green squares appear automatically.

---

## What the Bot Does Every 6 Hours

1. Pulls your archive repo to get latest state  
2. For each of the 44+ upstream repos in `sync_manifest.json`:
   - Re-clones it fresh (`--depth 1`)
   - Strips the `.git` folder
   - Replaces the old copy in your archive
   - Checks if anything actually changed
3. If changes exist → commits with timestamp → pushes → 🟩
4. Sleeps 6 hours → repeats
