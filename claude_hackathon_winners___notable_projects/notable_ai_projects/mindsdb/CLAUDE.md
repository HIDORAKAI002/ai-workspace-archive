# Minds Platform

## Submodules

This repo has 4 submodules:

| Path | Repo | Tracking |
|---|---|---|
| `frontend` | `mindsdb/cowork` | tag-pinned |
| `backend/core_api` | `mindsdb/cowork-server` | tag-pinned |
| `backend/core_agent` | `mindsdb/anton` | tag-pinned |
| `backend/data-vault` | `mindsdb/data-vault` | `main` branch |

### Clone (fresh)

```bash
git clone --recurse-submodules https://github.com/mindsdb/minds-platform
```

### Initialize after cloning without submodules

```bash
git submodule update --init --recursive
```

### Pull — sync to what the parent repo pins (default)

```bash
git submodule update --recursive
```

### Pull — advance all submodules to latest `main`

Only do this if you intend to develop across all repos. You'll need to commit the updated pointers in the parent repo afterward.

```bash
git submodule foreach 'git checkout main && git pull origin main'
```

### Make changes and push inside a submodule

1. Go into the submodule and get on a real branch first (all submodules start in detached HEAD):

```bash
cd backend/data-vault   # or whichever submodule
git checkout main       # or: git checkout -b your-feature-branch
```

2. Make your changes, commit, and push:

```bash
git add .
git commit -m "your message"
git push origin main
```

3. Back in the parent repo, stage and commit the updated submodule pointer:

```bash
cd ../..
git add backend/data-vault
git commit -m "bump data-vault to latest"
git push
```

> The parent repo stores a commit SHA pointer to each submodule, not the code itself. Always push from inside the submodule first, then update the pointer in the parent.

## Running locally (web browser mode)

After initializing submodules, start the full stack with:

```bash
cd frontend
npm install
npm run dev:web
```

Open `http://localhost:5173/`. The FastAPI backend starts automatically on `http://127.0.0.1:26866`.

### Skip Keycloak auth (required for local dev)

By default the web app redirects to MindsHub SSO on first load. To bypass this locally, create `frontend/src/renderer/.env` (Vite's root is `src/renderer`, not `frontend/`):

```bash
echo "VITE_SKIP_AUTH=true" > frontend/src/renderer/.env
```

Then restart `npm run dev:web`. The Keycloak redirect will be skipped and the app loads the onboarding screen directly where you can enter a BYOK API key.

### First-time symlink fix

The `dev:web` script expects the `uv`-installed tool at `~/.local/share/uv/tools/anton/`, but it may be installed as `anton-agent`. If you see "Anton Python interpreter not found", run:

```bash
ln -s ~/.local/share/uv/tools/anton-agent ~/.local/share/uv/tools/anton
```

## Flushing local installs (fresh start)

`make flush` wipes every local install **and** all app state, returning the machine to a pre-install condition. Use it to test the from-scratch install flow or to recover from a broken/half-installed environment.

```bash
make flush          # prompts before deleting
make flush FORCE=1  # skip the prompt (CI / scripts)
```

It removes:

| Removed | What it is |
|---|---|
| `cowork-server` uv tool (+ legacy `anton-agent`) | the runtime the **Electron app** installs via `uv tool install` |
| `backend/core_api/.venv`, `backend/core_agent/.venv` | the venvs the **Makefile** dev flow builds via `uv sync` |
| `~/.anton` | provider keys / `.env` |
| `~/.cowork` | database, `hermes`, `projects` |

> ⚠️ Destructive — deletes conversations and saved provider keys, no undo. After flushing, the next `make setup` (or app launch) reinstalls everything from scratch.

> It deliberately leaves `uv` itself and uv-managed Python runtimes alone (shared infrastructure, not part of the anton/cowork install).
