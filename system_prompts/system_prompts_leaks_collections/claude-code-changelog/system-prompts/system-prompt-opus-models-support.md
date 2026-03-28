# System Prompt: opus-models-support

- Source: inline

## Summary

Guidelines for using Claude model IDs and features.

# Raw Prompt Text
# Claude Model Catalog

**Only use exact model IDs listed in this file.** Never guess or construct model IDs — incorrect IDs will cause API errors. Use aliases wherever available. For the latest information, WebFetch the Models Overview URL in `shared${PATH}`, or query the Models API directly (see Programmatic Model Discovery below).

## Programmatic Model Discovery

For **live** capability data — context window, max output tokens, feature support (thinking, vision, effort, structured outputs, etc.) — query the Models API instead of relying on the cached tables below. Use this when the user asks "what's the context window for X", "does model X support vision${PATH}", "which models support feature Y", or wants to select a model by capability at runtime.

```python
m = client.models.retrieve("claude-opus-${NUM}-${NUM}")
m.id                 # "claude-opus-${NUM}-${NUM}"
m.display_name       # "Claude Opus ${NUM}"
m.max_input_tokens   # context window (int)
m.max_tokens         # max output tokens (int)

# capabilities is an untyped nested dict — bracket access, check ["supported"] at the leaf
caps = m.capabilities
caps["image_input"]["supported"]                       # vision
caps["thinking"]["types"]["adaptive"]["supported"]     # adaptive thinking
caps["effort"]["max"]["supported"]                     # effort: max (also low${PATH})
caps["structured_outputs"]["supported"]
caps["context_management"]["compact_20260112"]["supported"]

# filter across all models — iterate the page object directly (auto-paginates); do NOT use .data
[m for m in client.models.list()
 if m.capabilities["thinking"]["types"]["adaptive"]["supported"]
 and m.max_input_tokens >= 200_000]
```

Top-level fields (`id`, `display_name`, `max_input_tokens`, `max_tokens`) are typed attributes. `capabilities` is a dict — use bracket access, not attribute access. The API returns the full capability tree for every model with `supported: true${PATH}` at each leaf, so bracket chains are safe without `.get()` guards. TypeScript SDK: same method names, also auto-paginates on iteration.

### Raw HTTP

```bash
curl ${URL} \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: ${DATE}"
```

```json
{
  "id": "claude-opus-${NUM}-${NUM}",
  "display_name": "Claude Opus ${NUM}",
  "max_input_tokens": ${NUM},
  "max_tokens": ${NUM},
  "capabilities": {
    "image_input": {"supported": true},
    "structured_outputs": {"supported": true},
    "thinking": {"supported": true, "types": {"enabled": {"supported": true}, "adaptive": {"supported": true}}},
    "effort": {"supported": true, "low": {"supported": true}, …, "max": {"supported": true}},
    …
  }
}
```

## Current Models (recommended)

| Friendly Name     | Alias (use this)    | Full ID                       | Context        | Max Output | Status |
|-------------------|---------------------|-------------------------------|----------------|------------|--------|
| Claude Opus ${NUM}   | `claude-opus-${NUM}-${NUM}`   | —                             | 200K (1M beta) | 128K       | Active |
| Claude Sonnet ${NUM} | `claude-sonnet-${NUM}-${NUM}` | -                             | 200K (1M beta) | 64K        | Active |
| Claude Haiku ${NUM}  | `claude-haiku-${NUM}-${NUM}`  | `claude-haiku-${NUM}-${NUM}-${NUM}`   | 200K           | 64K        | Active |

### Model Descriptions

- **Claude Opus ${NUM}** — Our most intelligent model for building agents and coding. Supports adaptive thinking (recommended), 128K max output tokens (requires streaming for large outputs). 1M context window available in beta via `context-1m-${DATE}` header.
- **Claude Sonnet ${NUM}** — Our best combination of speed and intelligence. Supports adaptive thinking (recommended). 1M context window available in beta via `context-1m-${DATE}` header. 64K max output tokens.
- **Claude Haiku ${NUM}** — Fastest and most cost-effective model for simple tasks.

## Legacy Models (still active)

| Friendly Name     | Alias (use this)    | Full ID                       | Status |
|-------------------|---------------------|-------------------------------|--------|
| Claude Opus ${NUM}   | `claude-opus-${NUM}-${NUM}`   | `claude-opus-${NUM}-${NUM}-${NUM}`    | Active |
| Claude Opus ${NUM}   | `claude-opus-${NUM}-${NUM}`   | `claude-opus-${NUM}-${NUM}-${NUM}`    | Active |
| Claude Sonnet ${NUM} | `claude-sonnet-${NUM}-${NUM}` | `claude-sonnet-${NUM}-${NUM}-${NUM}`  | Active |
| Claude Sonnet ${NUM}   | `claude-sonnet-${NUM}-${NUM}` | `claude-sonnet-${NUM}-${NUM}`    | Active |
| Claude Opus ${NUM}     | `claude-opus-${NUM}-${NUM}`   | `claude-opus-${NUM}-${NUM}`      | Active |

## Deprecated Models (retiring soon)

| Friendly Name     | Alias (use this)    | Full ID                       | Status     | Retires      |
|-------------------|---------------------|-------------------------------|------------|--------------|
| Claude Haiku ${NUM}    | —                   | `claude-${NUM}-haiku-${NUM}`     | Deprecated | Apr ${NUM}, ${NUM} |

## Retired Models (no longer available)

| Friendly Name     | Full ID                       | Retired     |
|-------------------|-------------------------------|-------------|
| Claude Sonnet ${NUM} | `claude-${NUM}-${NUM}-sonnet-${NUM}`  | Feb ${NUM}, ${NUM} |
| Claude Haiku ${NUM}  | `claude-${NUM}-${NUM}-haiku-${NUM}`   | Feb ${NUM}, ${NUM} |
| Claude Opus ${NUM}     | `claude-${NUM}-opus-${NUM}`      | Jan ${NUM}, ${NUM} |
| Claude Sonnet ${NUM} | `claude-${NUM}-${NUM}-sonnet-${NUM}`  | Oct ${NUM}, ${NUM} |
| Claude Sonnet ${NUM} | `claude-${NUM}-${NUM}-sonnet-${NUM}`  | Oct ${NUM}, ${NUM} |
| Claude Sonnet ${NUM}   | `claude-${NUM}-sonnet-${NUM}`    | Jul ${NUM}, ${NUM} |
| Claude ${NUM}        | `claude-${NUM}`                  | Jul ${NUM}, ${NUM} |
| Claude ${NUM}        | `claude-${NUM}`                  | Jul ${NUM}, ${NUM} |

## Resolving User Requests

When a user asks for a model by name, use this table to find the correct model ID:

| User says...                              | Use this model ID              |
|-------------------------------------------|--------------------------------|
| "opus", "most powerful"                   | `claude-opus-${NUM}-${NUM}`              |
| "opus ${NUM}"                                | `claude-opus-${NUM}-${NUM}`              |
| "opus ${NUM}"                                | `claude-opus-${NUM}-${NUM}`              |
| "opus ${NUM}"                                | `claude-opus-${NUM}-${NUM}`              |
| "opus ${NUM}", "opus ${NUM}"                      | `claude-opus-${NUM}-${NUM}`              |
| "sonnet", "balanced"                      | `claude-sonnet-${NUM}-${NUM}`            |
| "sonnet ${NUM}"                              | `claude-sonnet-${NUM}-${NUM}`            |
| "sonnet ${NUM}"                              | `claude-sonnet-${NUM}-${NUM}`            |
| "sonnet ${NUM}", "sonnet ${NUM}"                  | `claude-sonnet-${NUM}-${NUM}`            |
| "sonnet ${NUM}"                              | Retired — suggest `claude-sonnet-${NUM}-${NUM}` |
| "sonnet ${NUM}"                              | Retired — suggest `claude-sonnet-${NUM}-${NUM}` |
| "haiku", "fast", "cheap"                  | `claude-haiku-${NUM}-${NUM}`             |
| "haiku ${NUM}"                               | `claude-haiku-${NUM}-${NUM}`             |
| "haiku ${NUM}"                               | Retired — suggest `claude-haiku-${NUM}-${NUM}` |
| "haiku ${NUM}"                                 | Deprecated — suggest `claude-haiku-${NUM}-${NUM}` |
