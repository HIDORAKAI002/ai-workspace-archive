# Streaming Demo

This example demonstrates the **real-time streaming capabilities** of mcp-agent, showing how to stream LLM responses as they're generated.

## Features Demonstrated

### 1. **Basic Text Streaming**
Stream text as it's generated with real-time display:
```python
async for event in llm.generate_stream("Tell me a story"):
    if event.type == StreamEventType.TEXT_DELTA:
        if event.content:
            print(event.content, end="", flush=True)
```

### 2. **Streaming with Tool Calls**
Monitor tool execution in real-time during multi-iteration agentic loops:
```python
async for event in llm.generate_stream("List files and read README"):
    if event.type == StreamEventType.TOOL_USE_START:
        if event.content:
            print(f"Calling tool: {event.content.get('name', 'unknown')}")
```

### 3. **Convenience Method**
Use `generate_str_stream()` for text-only streaming:
```python
async for text in llm.generate_str_stream("Write a poem"):
    print(text, end="", flush=True)
```

### 4. **Event Monitoring**
Track all events for debugging and analysis:
```python
events = []
async for event in llm.generate_stream("Count to 5"):
    events.append(event)

# Analyze collected events
text_events = [e for e in events if e.type == StreamEventType.TEXT_DELTA]
tool_events = [e for e in events if e.type == StreamEventType.TOOL_USE_START]
```

### 5. **Progress Tracking**
Show progress indicators during generation:
```python
with Progress() as progress:
    task = progress.add_task("Generating...", total=None)
    async for event in llm.generate_stream(message):
        if event.type == StreamEventType.TEXT_DELTA:
            progress.update(task, advance=1)
```

## Stream Event Types

The streaming API emits the following event types:

| Event Type | Description |
|------------|-------------|
| `ITERATION_START` | Start of an agentic iteration |
| `TEXT_DELTA` | Incremental text content |
| `THINKING` | Extended thinking content (for thinking models) |
| `TOOL_USE_START` | Tool call initiated |
| `TOOL_RESULT` | Tool execution result |
| `TOOL_USE_END` | Tool call completed |
| `ITERATION_END` | End of iteration (includes token usage) |
| `COMPLETE` | Generation fully complete |
| `ERROR` | Error occurred during generation |

## Requirements

- Python 3.10+
- Anthropic API key (or AWS credentials for Bedrock)
- Optional: MCP servers for tool calling demos

## Setup

1. Install dependencies:
   ```bash
   uv pip install -r requirements.txt
   ```

2. Configure your API keys:
   ```bash
   cp mcp_agent.secrets.yaml.example mcp_agent.secrets.yaml
   # Edit mcp_agent.secrets.yaml with your API key
   ```

3. Run the demo:
   ```bash
   uv run main.py
   ```

## Configuration

The example uses `mcp_agent.config.yaml` to configure:
- LLM provider (Anthropic by default)
- Model selection
- MCP servers (optional, for tool calling demos)

## Use Cases

**Real-time streaming is useful for:**

- **Interactive Chat**: Display text as it's generated (like ChatGPT)
- **Progress Monitoring**: Show what the agent is doing during long operations
- **Debugging**: See exactly when tools are called and what they return
- **WebSocket/SSE APIs**: Stream responses to web clients
- **Responsive UIs**: Build applications that feel fast and responsive

## Output Example

```
Demo 1: Basic Text Streaming
Asking: 'Tell me a short story about a robot learning to paint'

Once upon a time, in a bustling city of gleaming towers...
[Text streams in real-time]
✓ Complete (Tokens: in=45, out=247)

Demo 2: Streaming with Tool Calls

→ Iteration 1
⚙ Calling tool: list_directory
  Input: {'path': '.'}
  ✓ Success
  Tokens: in=156, out=23

→ Iteration 2
[Agent response streams...]
✓ All iterations complete
```

## API Reference

### `generate_stream(message, request_params=None)`

Stream LLM generation events as they occur.

**Returns:** `AsyncIterator[StreamEvent]`

**Example:**
```python
async for event in llm.generate_stream("Your prompt"):
    if event.type == StreamEventType.TEXT_DELTA:
        if event.content:
            # Handle text delta
            pass
    elif event.type == StreamEventType.TOOL_USE_START:
        if event.content:
            # Handle tool call
            pass
```

### `generate_str_stream(message, request_params=None)`

Convenience method that yields only text content.

**Returns:** `AsyncIterator[str]`

**Example:**
```python
async for text_chunk in llm.generate_str_stream("Your prompt"):
    print(text_chunk, end="", flush=True)
```

## Benefits of Streaming

✅ **Better UX**: Users see responses as they're generated
✅ **Real-Time Feedback**: Show what the agent is doing
✅ **Responsive UIs**: Build ChatGPT-like interfaces
✅ **Debugging**: See agent activity in real-time
✅ **Backward Compatible**: Existing `generate()` still works
✅ **Opt-In**: Use streaming only when needed

## Learn More

- [Streaming Support Proposal](../../../docs/streaming_support_proposal.md)
- [AugmentedLLM Documentation](../../../docs/mcp-agent-sdk/core-components/augmented-llm.mdx)
- [MCP Agent SDK](https://github.com/lastmile-ai/mcp-agent)
