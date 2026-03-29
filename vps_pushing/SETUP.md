# 🚀 VPS Auto-Sync Setup Guide
## For Pterodactyl Server

Everything you need is in this folder. Follow these steps once and the sync runs forever.

---

## Step 1 — Upload These Files to Your VPS

Upload this entire folder to your server. Recommended path:
```
/home/container/ai-sync/
```

So you end up with:
```
/home/container/ai-sync/
├── vps_sync.sh
├── sync_manifest.json
└── SETUP.md  (this file)
```

---

## Step 2 — Install Dependencies

Run once in your server console:
```bash
apt update && apt install git python3 -y
```

---

## Step 3 — Configure Your Git Identity

These need to match your GitHub account exactly so commits count as YOUR contributions:
```bash
git config --global user.name "HIDORAKAI002"
git config --global user.email "YOUR_GITHUB_EMAIL_HERE"
```

---

## Step 4 — Set Up GitHub Authentication

1. Go to: **GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)**
2. Click **"Generate new token (classic)"**
3. Give it a name like `vps-sync`
4. Check the **`repo`** scope only
5. Copy the token (starts with `ghp_...`)

Then run:
```bash
git config --global credential.helper store
echo "https://HIDORAKAI002:YOUR_TOKEN_HERE@github.com" > ~/.git-credentials
```

---

## Step 5 — Clone Your Archive Repo to the VPS

```bash
git clone https://github.com/HIDORAKAI002/ai-workspace-archive.git ~/ai-workspace-archive
```

---

## Step 6 — Copy the Sync Files Into the Archive

```bash
cp /home/container/ai-sync/vps_sync.sh ~/vps_sync.sh
cp /home/container/ai-sync/sync_manifest.json ~/ai-workspace-archive/sync_manifest.json
chmod +x ~/vps_sync.sh
```

---

## Step 7 — Update the Script With Your Email

Open `vps_sync.sh` and replace `YOUR_GITHUB_EMAIL` with your actual GitHub email (appears twice).

---

## Step 8 — Test It!

```bash
bash ~/vps_sync.sh
```

You should see it syncing all repos and pushing a commit to GitHub.

---

## Step 9 — Schedule It (Cron)

Run every 6 hours automatically:
```bash
crontab -e
```

Add this line at the bottom:
```
0 */6 * * * /bin/bash ~/vps_sync.sh >> ~/sync.log 2>&1
```

Save and exit. Done! ✅

---

## 🟩 Contribution Graph

Every time the script pushes a real change, it creates a commit **authored as you** → it shows as a green square on your GitHub profile contribution graph automatically.

---

## 🔍 Check Logs

```bash
tail -f ~/sync.log
```
