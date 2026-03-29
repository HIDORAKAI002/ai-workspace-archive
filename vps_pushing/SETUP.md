# 🚀 Pterodactyl Setup — Git Auto-Sync Bot

## Upload These 3 Files via SFTP

Connect to: `sftp://panel.flagsbot.in:2022`  
Username: `admin.aac51ff6`  
Password: your panel password

Upload to `/home/container/`:
```
app.py
requirements.txt
sync_manifest.json
```

---

## Step 1 — Edit `app.py` (fill in your details)

Open `app.py` and update the top section:

```python
GIT_NAME      = "HIDORAKAI002"           # your GitHub username
GIT_EMAIL     = "your@email.com"         # your GitHub account email  ← CHANGE THIS
GITHUB_TOKEN  = "ghp_xxxxxxxxxxxx"       # your PAT token             ← CHANGE THIS
```

**To get your GitHub Personal Access Token (PAT):**
1. GitHub.com → **Settings** → **Developer Settings** → **Personal Access Tokens** → **Tokens (classic)**
2. Click **Generate new token (classic)**
3. Name it `vps-sync`, check only the **`repo`** scope
4. Copy the token (starts with `ghp_...`) → paste into `app.py`

---

## Step 2 — Install Script (run once)

In Pterodactyl, go to **Startup** tab and make sure the install script includes:
```bash
apt update && apt install git -y
```

Or run in the console manually before first start:
```bash
apt install git -y
```

---

## Step 3 — Start the Server

Hit **Start** in Pterodactyl. The console will show:

```
[2026-03-29 02:00 UTC] 🚀 AI Workspace Archive — Auto-Sync Bot
[2026-03-29 02:00 UTC]    Interval : every 6 hours
[2026-03-29 02:00 UTC] ✅ git version 2.x.x
[2026-03-29 02:00 UTC] ✅ Manifest loaded — 44 repos tracked
[2026-03-29 02:00 UTC] 📥 First run — cloning your archive repo...
[2026-03-29 02:00 UTC] ✅ Archive cloned successfully.
[2026-03-29 02:00 UTC] 🔁 Sync cycle starting...
[2026-03-29 02:00 UTC] [1/44] Public APIs Directory
[2026-03-29 02:00 UTC]   ✅ Updated!
...
[2026-03-29 02:10 UTC] 🟩 Pushed! 3 changes → GitHub contribution counted!
[2026-03-29 02:10 UTC] ⏰ Sleeping 6h until next sync...
```

---

## That's It! ✅

The bot runs **forever** inside Pterodactyl. Every 6 hours it checks all 44 repos for updates, and if anything changed upstream it pushes a commit to your GitHub — which **counts as a green square on your contribution graph**.
