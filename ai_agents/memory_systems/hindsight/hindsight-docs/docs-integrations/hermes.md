---
sidebar_position: 10
title: "Hermes Agent Persistent Memory with Hindsight | Integration"
description: "Add long-term memory to Hermes Agent with Hindsight. Automatically recalls context before every LLM call and retains conversations for future sessions."
---

# Hermes Agent

Persistent long-term memory for [Hermes Agent](https://github.com/NousResearch/hermes-agent) using [Hindsight](https://vectorize.io/hindsight). Automatically recalls relevant context before every LLM call and retains conversations for future sessions — plus explicit retain/recall/reflect tools.

## Quick Start

```bash
# 1. Install the plugin into Hermes's Python environment
uv pip install hindsight-hermes --python $HOME/.hermes/hermes-agent/venv/bin/python

# 2. Configure (choose one)
# Option A: Config file (recommended)
mkdir -p ~/.hindsight
cat > ~/.hindsight/hermes.json << 'EOF'
{
  "hindsightApiUrl": "http://localhost:9077",
  "bankId": "hermes"
}
EOF

# Option B: Environment variables
export HINDSIGHT_API_URL=http://localhost:9077
export HINDSIGHT_BANK_ID=hermes

# 3. Start Hermes — the plugin activates automatically
hermes
```

## Features

- **Auto-recall** — on every turn, queries Hindsight for relevant memories and injects them into the system prompt (via `pre_llm_call` hook)
- **Auto-retain** — after every response, retains the user/assistant exchange to Hindsight (via `post_llm_call` hook)
- **Explicit tools** — `hindsight_retain`, `hindsight_recall`, `hindsight_reflect` for direct model control
- **Config file** — `~/.hindsight/hermes.json` with the same field names as openclaw and claude-code integrations
- **Zero config overhead** — env vars still work as overrides for CI/automation

:::note
The lifecycle hooks (`pre_llm_call`/`post_llm_call`) require hermes-agent with [PR #2823](https://github.com/NousResearch/hermes-agent/pull/2823) or later. On older versions, only the three tools are registered — hooks are silently skipped.
:::

## Architecture

The plugin registers via Hermes's `hermes_agent.plugins` entry point system:

| Component | Purpose |
|-----------|---------|
| `pre_llm_call` hook | **Auto-recall** — query memories, inject as ephemeral system prompt context |
| `post_llm_call` hook | **Auto-retain** — store user/assistant exchange to Hindsight |
| `hindsight_retain` tool | Explicit memory storage (model-initiated) |
| `hindsight_recall` tool | Explicit memory search (model-initiated) |
| `hindsight_reflect` tool | LLM-synthesized answer from stored memories |

## Connection Modes

### 1. External API (recommended for production)

Connect to a running Hindsight server (cloud or self-hosted). No local LLM needed — the server handles fact extraction.

```json
{
  "hindsightApiUrl": "https://your-hindsight-server.com",
  "hindsightApiToken": "your-token",
  "bankId": "hermes"
}
```

### 2. Local Daemon

If you're running `hindsight-embed` locally, point to it:

```json
{
  "hindsightApiUrl": "http://localhost:9077",
  "bankId": "hermes"
}
```

Follow the [Quick Start](/developer/api/quickstart) guide to get the Hindsight API running.

## Configuration

All settings are in `~/.hindsight/hermes.json`. Every setting can also be overridden via environment variables (env vars take priority).

### Connection & Daemon

| Setting | Default | Env Var | Description |
|---------|---------|---------|-------------|
| `hindsightApiUrl` | — | `HINDSIGHT_API_URL` | Hindsight API URL |
| `hindsightApiToken` | `null` | `HINDSIGHT_API_TOKEN` / `HINDSIGHT_API_KEY` | Auth token for API |
| `apiPort` | `9077` | `HINDSIGHT_API_PORT` | Port for local Hindsight daemon |
| `daemonIdleTimeout` | `0` | `HINDSIGHT_DAEMON_IDLE_TIMEOUT` | Seconds before idle daemon shuts down (0 = never) |
| `embedVersion` | `"latest"` | `HINDSIGHT_EMBED_VERSION` | `hindsight-embed` version for `uvx` |

### LLM Provider (daemon mode only)

| Setting | Default | Env Var | Description |
|---------|---------|---------|-------------|
| `llmProvider` | auto-detect | `HINDSIGHT_LLM_PROVIDER` | LLM provider: `openai`, `anthropic`, `gemini`, `groq`, `ollama` |
| `llmModel` | provider default | `HINDSIGHT_LLM_MODEL` | Model override |

### Memory Bank

| Setting | Default | Env Var | Description |
|---------|---------|---------|-------------|
| `bankId` | — | `HINDSIGHT_BANK_ID` | Memory bank ID |
| `bankMission` | `""` | `HINDSIGHT_BANK_MISSION` | Agent identity/purpose for the memory bank |
| `retainMission` | `null` | — | Custom retain mission (what to extract from conversations) |
| `bankIdPrefix` | `""` | — | Prefix for all bank IDs |

### Auto-Recall

| Setting | Default | Env Var | Description |
|---------|---------|---------|-------------|
| `autoRecall` | `true` | `HINDSIGHT_AUTO_RECALL` | Enable automatic memory recall via `pre_llm_call` hook |
| `recallBudget` | `"mid"` | `HINDSIGHT_RECALL_BUDGET` | Recall effort: `low`, `mid`, `high` |
| `recallMaxTokens` | `4096` | `HINDSIGHT_RECALL_MAX_TOKENS` | Max tokens in recall response |
| `recallMaxQueryChars` | `800` | `HINDSIGHT_RECALL_MAX_QUERY_CHARS` | Max chars of user message used as query |
| `recallPromptPreamble` | see below | — | Header text injected before recalled memories |

Default preamble:
> Relevant memories from past conversations (prioritize recent when conflicting). Only use memories that are directly useful to continue this conversation; ignore the rest:

### Auto-Retain

| Setting | Default | Env Var | Description |
|---------|---------|---------|-------------|
| `autoRetain` | `true` | `HINDSIGHT_AUTO_RETAIN` | Enable automatic retention via `post_llm_call` hook |
| `retainEveryNTurns` | `1` | — | Retain every Nth turn |
| `retainOverlapTurns` | `2` | — | Extra overlap turns for continuity |
| `retainRoles` | `["user", "assistant"]` | — | Which message roles to retain |

### Miscellaneous

| Setting | Default | Env Var | Description |
|---------|---------|---------|-------------|
| `debug` | `false` | `HINDSIGHT_DEBUG` | Enable debug logging to stderr |

## Hermes Gateway (Telegram, Discord, Slack)

When using Hermes in gateway mode (multi-platform messaging), the plugin works across all platforms. Hermes creates a fresh `AIAgent` per message, and the plugin's `pre_llm_call` hook ensures relevant memories are recalled for each turn regardless of platform.

## Disabling Hermes's Built-in Memory

Hermes has a built-in `memory` tool that saves to local markdown files. If both are active, the LLM may prefer the built-in one. Disable it:

```bash
hermes tools disable memory
```

Re-enable later with `hermes tools enable memory`.

## Troubleshooting

**Plugin not loading**: Verify the entry point is registered:
```bash
python -c "
import importlib.metadata
eps = importlib.metadata.entry_points(group='hermes_agent.plugins')
print(list(eps))
"
```
You should see `EntryPoint(name='hindsight', value='hindsight_hermes', ...)`.

**Tools don't appear in `/tools`**: Check that `hindsightApiUrl` (or `HINDSIGHT_API_URL`) is set. The plugin silently skips registration when unconfigured.

**Connection refused**: Verify the Hindsight API is running:
```bash
curl http://localhost:9077/health
```

**Recall returning no memories**: Memories need at least one retain cycle. Try storing a fact first, then asking about it in a new session.
