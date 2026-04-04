---
sidebar_position: 16
---

# Hermes Agent + Hindsight Memory

:::info Complete Application
This is a complete, runnable application demonstrating Hindsight integration.
[**View source on GitHub →**](https://github.com/vectorize-io/hindsight/tree/main/hindsight-integrations/hermes)
:::

Give your [Hermes Agent](https://github.com/NousResearch/hermes-agent) persistent long-term memory. The plugin registers retain, recall, and reflect as native Hermes tools via the `hermes_agent.plugins` entry point.

## What This Demonstrates

- **Native plugin registration** — tools appear under `[hindsight]` in Hermes's `/tools` list
- **Three memory tools** — `hindsight_retain`, `hindsight_recall`, `hindsight_reflect`
- **Environment-based configuration** — set `HINDSIGHT_API_URL` and `HINDSIGHT_BANK_ID`, launch Hermes
- **Memory instructions** — pre-recall context for system prompt injection
- **Graceful degradation** — plugin silently skips if Hindsight is not configured

## Architecture

```
Hermes Session:
    User: "Remember that my favourite colour is red"
    │
    ├─ Hermes routes to hindsight_retain ──► stores the fact
    └─ Response shows ⚡ hindsight confirmation

    User: "What's my favourite colour?"
    │
    ├─ Hermes routes to hindsight_recall ──► searches stored memories
    └─ Response: "Your favourite colour is red"

    User: "Suggest a colour scheme for my IDE"
    │
    ├─ Hermes routes to hindsight_reflect ──► synthesizes from memories
    └─ Response: personalized recommendation based on stored preferences
```

## Prerequisites

1. **Hindsight running**

   ```bash
   export OPENAI_API_KEY=your-key

   docker run --rm -it --pull always -p 8888:8888 -p 9999:9999 \
     -e HINDSIGHT_API_LLM_API_KEY=$OPENAI_API_KEY \
     -e HINDSIGHT_API_LLM_MODEL=o3-mini \
     -v $HOME/.hindsight-docker:/home/hindsight/.pg0 \
     ghcr.io/vectorize-io/hindsight:latest
   ```

2. **Hermes Agent installed**

   Follow the [Hermes Agent setup guide](https://github.com/NousResearch/hermes-agent).

3. **Install the plugin** into the Hermes venv

   ```bash
   # Activate the same venv Hermes runs in
   source /path/to/hermes-agent/.venv/bin/activate
   pip install hindsight-hermes
   ```

## Quick Start

### 1. Set Environment Variables

```bash
export HINDSIGHT_API_URL=http://localhost:8888
export HINDSIGHT_BANK_ID=my-agent
```

### 2. Disable Hermes's Built-In Memory

Hermes has its own `memory` tool that saves to local files. Disable it so the LLM uses Hindsight instead:

```bash
hermes tools disable memory
```

### 3. Launch Hermes

```bash
hermes
```

Verify the plugin loaded by typing `/tools`:

```
[hindsight]
  * hindsight_recall     - Search long-term memory for relevant information.
  * hindsight_reflect    - Synthesize a thoughtful answer from long-term memories.
  * hindsight_retain     - Store information to long-term memory for later retrieval.
```

### 4. Test It

**Store a memory:**
> Remember that my favourite colour is red

**Recall a memory:**
> What's my favourite colour?

**Reflect on memories:**
> Based on what you know about me, suggest a colour scheme for my IDE

## How It Works

### Plugin Entry Point

The package registers via `hermes_agent.plugins` entry point in `pyproject.toml`:

```toml
[project.entry-points."hermes_agent.plugins"]
hindsight = "hindsight_hermes"
```

When Hermes starts, it discovers and loads the plugin automatically.

### Manual Registration

For more control, register tools directly in a startup script:

```python
from hindsight_hermes import register_tools

register_tools(
    bank_id="my-agent",
    hindsight_api_url="http://localhost:8888",
    budget="mid",
    tags=["hermes"],
    recall_tags=["hermes"],
)
```

### Memory Instructions

Pre-recall memories at startup and inject them into the system prompt:

```python
from hindsight_hermes import memory_instructions

context = memory_instructions(
    bank_id="my-agent",
    hindsight_api_url="http://localhost:8888",
    query="user preferences and important context",
    budget="low",
    max_results=5,
)
# Returns:
# Relevant memories:
# 1. User's favourite colour is red
# 2. User prefers dark mode
```

This never raises — if the API is down or no memories exist, it returns an empty string.

### Global Configuration

Configure once instead of passing parameters to every call:

```python
from hindsight_hermes import configure

configure(
    hindsight_api_url="http://localhost:8888",
    api_key="your-key",
    budget="mid",
    tags=["hermes"],
)
```

## Configuration Reference

| Parameter | Env Var | Default | Description |
|-----------|---------|---------|-------------|
| `hindsight_api_url` | `HINDSIGHT_API_URL` | `https://api.hindsight.vectorize.io` | Hindsight API URL |
| `api_key` | `HINDSIGHT_API_KEY` | — | API key for authentication |
| `bank_id` | `HINDSIGHT_BANK_ID` | — | Memory bank ID |
| `budget` | `HINDSIGHT_BUDGET` | `mid` | Recall budget (low/mid/high) |
| `max_tokens` | — | `4096` | Max tokens for recall results |
| `tags` | — | — | Tags applied when storing memories |
| `recall_tags` | — | — | Tags to filter recall results |
| `recall_tags_match` | — | `any` | Tag matching mode (any/all/any_strict/all_strict) |
| `toolset` | — | `hindsight` | Hermes toolset group name |

## MCP Alternative

Hermes also supports MCP servers natively. You can use Hindsight's MCP server directly instead of this plugin:

```yaml
# In your Hermes config
mcp_servers:
  - name: hindsight
    url: http://localhost:8888/mcp
```

The tradeoff is that MCP tools may have different naming and the LLM needs to discover them, whereas the plugin registers tools with Hermes-native schemas.

## Common Issues

**Tools don't appear in `/tools`**
- Check the plugin is installed in the correct venv: `python -c "from hindsight_hermes import register; print('OK')"`
- Check `HINDSIGHT_API_URL` is set — the plugin skips registration silently if unconfigured

**Hermes uses built-in memory instead of Hindsight**
- Run `hermes tools disable memory` and restart

**Connection refused**
- Make sure Hindsight is running: `curl http://localhost:8888/health`

---

**Built with:**
- [Hermes Agent](https://github.com/NousResearch/hermes-agent) - Open-source AI agent by Nous Research
- [hindsight-hermes](https://github.com/vectorize-io/hindsight/tree/main/hindsight-integrations/hermes) - Hindsight memory plugin for Hermes
- [Hindsight](https://github.com/vectorize-io/hindsight) - Long-term memory for AI agents
