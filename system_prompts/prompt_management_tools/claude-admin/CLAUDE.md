# ClaudeAdmin

Central admin console for managing Claude Code configuration: Skills, Rules, Memory, CLAUDE.md, Settings, MCP-Servers, Plans.

## Stack

- **Backend**: Rust + Axum 0.7, Port 9022
- **Frontend**: Leptos 0.6 CSR (WASM), Port 9023 (Dev), embedded in Production
- **Build**: Trunk for WASM, rust-embed for Production bundle

## Architecture

- 3-crate workspace: `claude-admin-backend`, `claude-admin-frontend`, `claude-admin-shared`
- No database - all data read from/written to filesystem (~/.claude/)
- Backups created before every write operation in ~/.claude/backups/
- Claude API optional - works without ANTHROPIC_API_KEY

## Development

```bash
# Backend
cargo run -p claude-admin-backend

# Frontend (separate terminal)
cd claude-admin-frontend && trunk serve --port 9023

# Build all
cargo build --workspace
```

## Key Paths

- `~/.claude.json` - Project registry, MCP servers
- `~/.claude/settings.json` - Global settings, hooks
- `~/.claude/skills/` - Global skills (YAML frontmatter + markdown)
- `~/.claude/rules/` - Global rules
- `~/.claude/plans/` - Plan files
- `~/.claude/projects/<encoded>/memory/` - Per-project memory
