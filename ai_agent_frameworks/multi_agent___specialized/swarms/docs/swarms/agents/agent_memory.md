# Agent Memory

Swarms agents have a built-in persistent memory system that survives across process restarts. Every agent gets its own folder on disk under the workspace directory, with a `MEMORY.md` file that records every user task and agent response. When the agent is instantiated again with the same `agent_name`, the prior memory is automatically loaded back into its working context.

This document covers the full memory stack:

- `MEMORY.md` persistent memory
- `Conversation.compact()` for collapsing history into a summary
- `ContextCompressor` for automatic compression during autonomous runs
- The archive system that preserves raw chat logs forever

## Overview

Agent memory lives at a predictable path under `$WORKSPACE_DIR`:

```
$WORKSPACE_DIR/agents/{agent_name}/
├── MEMORY.md                          # active, append-updated
└── archive/
    ├── history_2026-04-20_14-30-45.md # prior MEMORY.md before last compaction
    ├── history_2026-04-20_16-12-08.md
    └── ...
```

**Key design points**

- The folder is keyed on `agent_name` only (not `id`), so running the same agent across multiple processes resumes the same memory.
- `MEMORY.md` is append-only during normal operation. Every `conversation.add(role, content)` call writes through to disk.
- When compression fires, the current `MEMORY.md` is archived to `archive/history_<timestamp>.md` before being wiped. Raw chat logs are never destroyed.
- Only user messages, agent responses, and tool results hit `MEMORY.md`. The static `system_prompt` and `rules` are kept out of the file (they come from the `Agent` constructor on each run).

## How It Works

### 1. File creation

On first instantiation of an agent with a given `agent_name`, the Conversation creates:

```
$WORKSPACE_DIR/agents/{agent_name}/MEMORY.md
```

seeded with a small header:

```markdown
# Agent Memory

**Conversation:** QuantAgent_id_<uuid>_conversation
**Created:** 2026-04-20T18:33:12

---

## Interaction Log
```

If the file already exists, it is left untouched.

### 2. Preload on construction

During `Conversation.__init__`, after the header is ensured, the file contents are read and injected as a single `System`-role message at the top of `conversation_history`:

```
[0] System : <system_prompt>
[1] User   : <rules>                      (if set)
[2] User   : <custom_rules_prompt>        (if set)
[3] System : [Persistent Memory — MEMORY.md]
             ... full MEMORY.md contents ...
```

The preload bypasses `add_in_memory` (direct append to `conversation_history`) so the preloaded content is not re-written back to disk. When the LLM is prompted, `return_history_as_string()` concatenates everything, so the model sees system prompt → rules → persistent memory → current turn.

Messages carry an ISO-8601 `timestamp` field (from `time_enabled=True`), and the string serializer emits them as `[<timestamp>] Role: content`. The agent can answer questions like "what time did I ask you this?" using the timestamps in its own history.

### 3. Write-through on new messages

Every `conversation.add(role, content)` call:

1. Appends the message to `conversation_history` (in-memory)
2. Appends a `### {role} — <timestamp>` block to `MEMORY.md` (on-disk)

Disk writes are serialized with a per-Conversation `threading.Lock`. Construction-time messages (system_prompt, rules) are suppressed from disk via an internal `_suppress_memory_md` flag so static identity isn't re-written on every run.

## Context Compression

Unbounded append would eventually blow past the context window. The `ContextCompressor` watches token usage and collapses history into a summary when usage crosses a configurable threshold.

Compression is controlled by the agent-level boolean `context_compression` (default `True`). It works identically for `max_loops="auto"` and integer `max_loops` runs — the flag is the only gate.

```python
from swarms import Agent

# Enabled (default)
agent = Agent(
    agent_name="ResearchAgent",
    model_name="claude-sonnet-4-6",
    max_loops=5,
    context_compression=True,
)

# Disabled — MEMORY.md still persists, but is never auto-compacted
agent = Agent(
    agent_name="StaticAgent",
    model_name="claude-sonnet-4-6",
    max_loops="auto",
    context_compression=False,
)
```

### When it fires

- `context_compression=True` on the Agent
- Token usage of `short_memory.return_history_as_string()` ≥ `threshold * context_length` (default `0.9`, i.e. 90%)

Checked at the top of every loop iteration.

### What happens

1. The current transcript is summarized via an LLM call (uses the agent's own `model_name` by default; a dedicated `summarizer_model` can be configured).
2. `Conversation.compact(summary=...)` is called:
    - **Archive:** the current `MEMORY.md` is copied to `archive/history_<timestamp>.md`
    - **Wipe:** `MEMORY.md` is deleted and re-seeded with a fresh header
    - **Re-seed in-memory:** `conversation_history` is cleared, then repopulated with `system_prompt` → `rules` → `custom_rules_prompt` (skills)
    - **Append summary:** the summary is added as a single `System` message, which lands in both `conversation_history` and the fresh `MEMORY.md`

Resulting state:

```
conversation_history:
  [0] System : <system_prompt>
  [1] User   : <rules>                     (if set)
  [2] User   : <custom_rules_prompt>       (skills, if set)
  [3] System : [Compressed Memory Summary] ...<summary>

MEMORY.md:
  # Agent Memory
  ...
  ## Interaction Log
  ### System — <timestamp>
  [Compressed Memory Summary] ...<summary>
  ---

archive/history_<prev-timestamp>.md:
  (full uncompressed transcript, preserved)
```

On the next run the preload injects the compact summary, not the raw transcript, so the agent resumes without immediately re-filling the context window.

## Working with Memory

### Programmatic access

The `Conversation` object on `agent.short_memory` exposes the memory helpers directly:

```python
from swarms import Agent

agent = Agent(
    agent_name="ResearchAgent",
    model_name="claude-sonnet-4-6",
)

# Read the on-disk memory
print(agent.short_memory.memory_md_path)
# -> /path/to/WORKSPACE_DIR/agents/ResearchAgent/MEMORY.md

# Manually compact at any time (not just on auto-loop threshold)
agent.short_memory.compact(
    summary="Researched cloud providers; user prefers GCP for latency reasons."
)
```

### Configuring the compressor

When `context_compression=True` (the default), the agent attaches a `ContextCompressor(threshold=0.9)`. To tune the threshold, swap the summarizer model, or cap summary tokens, overwrite the attribute after construction:

```python
from swarms import Agent
from swarms.agents.context_compressor import ContextCompressor

agent = Agent(
    agent_name="ResearchAgent",
    model_name="claude-sonnet-4-6",
    max_loops=5,
    context_compression=True,
)

agent._context_compressor = ContextCompressor(
    threshold=0.75,                              # compress at 75%
    summarizer_model="claude-haiku-4-5",         # cheaper summarizer
    summarizer_temperature=0.1,
    summarizer_max_tokens=3000,
)
```

### Disabling persistence

If you don't want any disk-backed memory for a given agent, override the path:

```python
agent = Agent(agent_name="EphemeralAgent", model_name="gpt-5.4")
agent.short_memory.memory_md_path = None
```

Subsequent `add()` calls will still update `conversation_history` in memory but won't write to disk.

## File Layout Summary

| Path | Purpose | Lifecycle |
|---|---|---|
| `$WORKSPACE_DIR/agents/{name}/MEMORY.md` | Active interaction log | Append on every turn; wiped + re-seeded on compaction |
| `$WORKSPACE_DIR/agents/{name}/archive/history_<ts>.md` | Immutable pre-compaction snapshot | Written once on each compaction; never modified or deleted |

## Design Notes

**Why one file per agent, not per session?** A single durable file means the agent has a stable handle on "what I know" regardless of how many times the process has been restarted. Session logs live in `archive/` for audit/recovery.

**Why `System`-role preamble instead of multiple replayed messages?** Replaying the raw message tree would balloon token counts and risks the LLM confusing past turns with current ones. A single `System`-tagged preamble is unambiguous and efficient.

**Why wipe `MEMORY.md` on compaction instead of appending a summary?** Without a wipe, the next run's preload would inject both the summary *and* the raw transcript it summarizes — doubling tokens and defeating the point. The archive keeps the raw log available without polluting active memory.

**Why `agent_name` and not `id` as the folder key?** `self.id` defaults to a fresh UUID each instantiation. Keying on it would create a new empty `MEMORY.md` on every process start, with no cross-run persistence. `agent_name` is user-controlled and stable.
