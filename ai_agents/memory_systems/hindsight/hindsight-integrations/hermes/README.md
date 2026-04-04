# hindsight-hermes

Persistent long-term memory for [Hermes Agent](https://github.com/NousResearch/hermes-agent) using [Hindsight](https://vectorize.io/hindsight). Automatically recalls relevant context before every LLM call and retains conversations for future sessions.

## Quick Start

```bash
# 1. Install into Hermes's Python environment
uv pip install hindsight-hermes --python $HOME/.hermes/hermes-agent/venv/bin/python

# 2. Configure
mkdir -p ~/.hindsight
cat > ~/.hindsight/hermes.json << 'EOF'
{
  "hindsightApiUrl": "http://localhost:9077",
  "bankId": "hermes"
}
EOF

# 3. Start Hermes — the plugin activates automatically
hermes
```

## What it does

**Automatic memory on every turn** (via Hermes lifecycle hooks):

- **`pre_llm_call`** — Recalls relevant memories and injects them into the system prompt. The model sees cross-session context automatically, no tool call needed.
- **`post_llm_call`** — Retains the user/assistant exchange so it can be recalled in future sessions.

**Three explicit tools** (via Hermes plugin system):

- **`hindsight_retain`** — Store information to long-term memory
- **`hindsight_recall`** — Search long-term memory for relevant information
- **`hindsight_reflect`** — Synthesize a reasoned answer from stored memories

> The lifecycle hooks require hermes-agent with [PR #2823](https://github.com/NousResearch/hermes-agent/pull/2823) or later. On older versions, only the tools are registered — hooks are silently skipped.

## Configuration

All settings live in `~/.hindsight/hermes.json`. Environment variables override file values.

Same field names as the [openclaw](https://github.com/vectorize-io/hindsight/tree/main/hindsight-integrations/openclaw) and [claude-code](https://github.com/vectorize-io/hindsight/tree/main/hindsight-integrations/claude-code) integrations.

### Example config

```json
{
  "hindsightApiUrl": "http://localhost:9077",
  "bankId": "hermes",
  "autoRecall": true,
  "autoRetain": true,
  "recallBudget": "mid",
  "recallMaxTokens": 4096,
  "bankMission": "Focus on user preferences, project context, and technical decisions."
}
```

### Connection

| Setting | Env Var | Default | Description |
|---------|---------|---------|-------------|
| `hindsightApiUrl` | `HINDSIGHT_API_URL` | — | Hindsight API URL |
| `hindsightApiToken` | `HINDSIGHT_API_TOKEN` / `HINDSIGHT_API_KEY` | — | Auth token |
| `apiPort` | `HINDSIGHT_API_PORT` | `9077` | Local daemon port |
| `daemonIdleTimeout` | `HINDSIGHT_DAEMON_IDLE_TIMEOUT` | `0` | Idle shutdown (seconds, 0 = never) |
| `embedVersion` | `HINDSIGHT_EMBED_VERSION` | `"latest"` | `hindsight-embed` version |

### Memory Bank

| Setting | Env Var | Default | Description |
|---------|---------|---------|-------------|
| `bankId` | `HINDSIGHT_BANK_ID` | — | Memory bank ID |
| `bankMission` | `HINDSIGHT_BANK_MISSION` | `""` | Agent purpose for the bank |
| `retainMission` | — | — | Custom extraction prompt |
| `bankIdPrefix` | — | `""` | Prefix for bank IDs |

### Auto-Recall

| Setting | Env Var | Default | Description |
|---------|---------|---------|-------------|
| `autoRecall` | `HINDSIGHT_AUTO_RECALL` | `true` | Enable `pre_llm_call` recall |
| `recallBudget` | `HINDSIGHT_RECALL_BUDGET` | `"mid"` | Effort: `low`/`mid`/`high` |
| `recallMaxTokens` | `HINDSIGHT_RECALL_MAX_TOKENS` | `4096` | Max tokens in response |
| `recallMaxQueryChars` | `HINDSIGHT_RECALL_MAX_QUERY_CHARS` | `800` | Max query chars |
| `recallPromptPreamble` | — | see below | Header before recalled memories |

### Auto-Retain

| Setting | Env Var | Default | Description |
|---------|---------|---------|-------------|
| `autoRetain` | `HINDSIGHT_AUTO_RETAIN` | `true` | Enable `post_llm_call` retain |
| `retainEveryNTurns` | — | `1` | Retain every Nth turn |
| `retainOverlapTurns` | — | `2` | Overlap turns for continuity |
| `retainRoles` | — | `["user", "assistant"]` | Roles to retain |

### LLM (daemon mode)

| Setting | Env Var | Default | Description |
|---------|---------|---------|-------------|
| `llmProvider` | `HINDSIGHT_LLM_PROVIDER` | auto-detect | `openai`/`anthropic`/`gemini`/`groq`/`ollama` |
| `llmModel` | `HINDSIGHT_LLM_MODEL` | provider default | Model override |

### Misc

| Setting | Env Var | Default | Description |
|---------|---------|---------|-------------|
| `debug` | `HINDSIGHT_DEBUG` | `false` | Debug logging |

## Disabling Hermes's built-in memory

Hermes has a built-in `memory` tool that saves to local files. Disable it so the LLM uses Hindsight instead:

```bash
hermes tools disable memory
```

## Troubleshooting

**Plugin not loading** — verify the entry point:
```bash
python -c "
import importlib.metadata
eps = importlib.metadata.entry_points(group='hermes_agent.plugins')
print(list(eps))
"
```

**Tools missing from `/tools`** — the plugin skips registration when `hindsightApiUrl` is not configured. Check `~/.hindsight/hermes.json` or env vars.

**Connection refused** — verify the API is running: `curl http://localhost:9077/health`

**No memories recalled** — memories need at least one retain cycle. Store a fact, start a new session, then ask about it.
