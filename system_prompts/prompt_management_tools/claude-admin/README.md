🌍 **English** | [Deutsch](README.de.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [中文](README.zh.md) | [Polski](README.pl.md) | [Türkçe](README.tr.md)

# ClaudeAdmin

A web-based admin console for managing your [Claude Code](https://claude.com/claude-code) configuration.

Once you work with more than a handful of projects, keeping track of skills, rules, memory files, MCP servers, and settings across `~/.claude/` becomes painful. ClaudeAdmin gives you a single UI to manage it all — no more hand-editing JSON and YAML.

> **Note:** This is an independent community project. Not affiliated with or endorsed by Anthropic.

![ClaudeAdmin Dashboard](https://github.com/conradBruchmann/claude-admin/blob/master/docs/screenshot.png?raw=true)

## Features

- **Dashboard** — Overview with stats, recent changes, and project quick-access
- **Projects** — Browse projects, edit CLAUDE.md, manage rules, skills, memory, and permissions per project
- **Project Advisor** — AI-powered analysis with one-click actions (create CLAUDE.md, init memory, add rules)
- **Skills** — Create, edit, and browse global skills (YAML frontmatter + markdown)
- **Skill Browser** — Discover and install community skills with one click
- **Rules** — Manage global and project-level rules with conflict detection
- **Memory** — View and edit per-project memory files (MEMORY.md + topic files)
- **MCP Servers** — Full management with structured form (command/args/env) or raw JSON, health checks, and tool explorer
- **MCP Browser** — Discover and install popular MCP servers from a curated catalog
- **Agents** — Define custom Claude agents with specific prompts and tool configurations
- **Plugins** — Manage installed Claude Code plugins
- **Launch Profiles** — Reusable CLI configurations (model, effort, tools, budget)
- **System Prompts** — Create and manage reusable system prompts
- **Timeline** — Git-based version history of your `~/.claude/` configuration with diff viewer and restore
- **Settings** — Edit global settings, hooks, API key, storage overview
- **Permissions** — Review tool permissions, security warnings, and config health
- **Plans** — Manage plan files
- **Sessions** — Browse session history with search
- **Analytics** — Usage metrics, per-project insights, and CSV/JSON export
- **Worktrees** — View and manage git worktrees across projects
- **Search** — Full-text search across skills, rules, and configuration
- **Help Chat** — Context-aware AI assistant with conversation memory
- **Backups** — Browse, diff, and restore automatic backups
- **12 Languages** — Full i18n: English, German, Spanish, French, Italian, Japanese, Korean, Chinese, Dutch, Polish, Portuguese, Turkish

## Architecture

```
┌─────────────────────┐     ┌──────────────────────┐
│  claude-admin-       │     │  claude-admin-        │
│  backend             │◄────│  frontend             │
│  Rust + Axum 0.7     │     │  Leptos 0.6 CSR/WASM  │
│  Port 9022           │     │  Port 9023 (dev)       │
└──────────┬──────────┘     └──────────────────────┘
           │                         │
           │    claude-admin-shared  │
           │    (shared types)       │
           │                         │
           ▼                         │
   ~/.claude/  (filesystem)          │
                                     │
   In production, the WASM frontend  │
   is embedded into the backend      │
   binary via rust-embed.            │
```

- **No database** — reads from and writes to the filesystem (`~/.claude/`)
- **Automatic backups** — created in `~/.claude/backups/` before every write operation, timestamped per file
- **Claude API optional** — works fully without `ANTHROPIC_API_KEY`
- **Single binary** — production build embeds the frontend via `rust-embed`

## Security

ClaudeAdmin runs **locally on your machine**. It is designed for single-user use on a development workstation.

- Reads and writes only under `~/.claude/` and `~/.claude.json`
- No telemetry, no analytics, no remote calls (except optional Anthropic API if configured)
- **Optional authentication** — set `CLAUDE_ADMIN_TOKEN` to enable Bearer token auth with session management
- **RBAC** — optional role-based access control via `~/.claude/users.json` (Admin, Editor, Viewer)
- Security headers: CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff
- Rate limiting on all API endpoints
- Path traversal protection

## Getting Started

### Prerequisites

- [Rust](https://rustup.rs/) (stable)
- [Trunk](https://trunkrs.dev/) for WASM builds: `cargo install trunk`
- WASM target: `rustup target add wasm32-unknown-unknown`

### Development

```bash
# Clone and enter the project
git clone https://github.com/conradbruchmann/claude-admin.git
cd claude-admin

# Start the backend
cargo run -p claude-admin-backend

# In a separate terminal: start the frontend with hot-reload
cd claude-admin-frontend && trunk serve --port 9023
```

Backend: `http://localhost:9022` — Frontend: `http://localhost:9023`

### Production Build

```bash
# Build the WASM frontend
cd claude-admin-frontend && trunk build --release && cd ..

# Build the backend (embeds the frontend)
cargo build --release -p claude-admin-backend

# Run the single binary
./target/release/claude-admin-backend
```

Pre-built binaries for Linux, macOS, and Windows are available on the [Releases](https://github.com/conradBruchmann/claude-admin/releases) page.

### macOS Installation

Download the `.dmg` from the latest release, open it, and drag **ClaudeAdmin.app** into `/Applications`.

Since the app is not signed with an Apple Developer certificate, macOS Gatekeeper will block it on first launch. To allow it, run:

```bash
xattr -dr com.apple.quarantine /Applications/ClaudeAdmin.app
```

Then double-click the app — it starts the server and opens `http://localhost:9022` in your browser. The DMG contains a Universal Binary that runs natively on both Intel and Apple Silicon Macs.

### Windows Installation

Download the `ClaudeAdmin-*-Setup.exe` from the latest release and run the installer. It installs to your user profile (no admin rights needed), creates Start Menu and Desktop shortcuts, and registers in "Apps & Features" for clean uninstall.

After installation, launch ClaudeAdmin from the Start Menu or Desktop — it starts the server and opens `http://localhost:9022` in your browser.

## Configuration Paths

ClaudeAdmin reads and writes the standard Claude Code configuration:

| Path                                   | Description                     |
| -------------------------------------- | ------------------------------- |
| `~/.claude.json`                       | Project registry, MCP servers   |
| `~/.claude/settings.json`              | Global settings, hooks          |
| `~/.claude/skills/`                    | Global skills                   |
| `~/.claude/rules/`                     | Global rules                    |
| `~/.claude/plans/`                     | Plan files                      |
| `~/.claude/projects/<encoded>/memory/` | Per-project memory              |
| `~/.claude/projects/<encoded>/rules/`  | Per-project rules               |
| `~/.claude/system-prompts/`            | Reusable system prompts         |
| `~/.claude/agents/`                    | Custom agent definitions        |
| `~/.claude/launch-profiles/`           | CLI launch profiles             |
| `~/.claude/backups/`                   | Automatic backups (timestamped) |
| `~/.claude/users.json`                 | RBAC user roles (optional)      |

## License

[MIT](LICENSE) — Copyright (c) 2024-2026 Conrad Bruchmann, BRUCHMANN [TEC] INNOVATION GMBH
