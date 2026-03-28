# Streaming Support Guide

This guide explains how to use real-time streaming with mcp-agent to display LLM responses as they're generated.

## Overview

Streaming allows you to receive LLM responses incrementally rather than waiting for the entire response to complete. This creates a better user experience and enables real-time monitoring of agent activity.

### Benefits

- ✅ **Better UX**: Users see responses as they're generated (like ChatGPT)
- ✅ **Real-Time Feedback**: Monitor what the agent is doing during multi-step operations
- ✅ **Responsive UIs**: Build applications that feel fast and responsive
- ✅ **Debugging**: See exactly when tools are called and what they return
- ✅ **Progress Tracking**: Show progress indicators during long operations
- ✅ **Backward Compatible**: Existing `generate()` method still works
- ✅ **Opt-In**: Use streaming only when you need it

## Quick Start

### Basic Text Streaming

```python
from mcp_agent import Agent
from mcp_agent.workflows.llm.streaming_events import StreamEventType

agent = Agent(name="my_agent")

# Stream text as it's generated
async for event in agent.llm.generate_stream("Tell me a story"):
    if event.type == StreamEventType.TEXT_DELTA:
        print(event.content, end="", flush=True)
```

### Convenience Method

For simple text-only streaming, use `generate_str_stream()`:

```python
# Only yields text content, filtering out other events
async for text_chunk in agent.llm.generate_str_stream("Tell me a story"):
    print(text_chunk, end="", flush=True)
```

## Stream Event Types

The streaming API emits structured events that represent different stages of generation:

| Event Type | Description | Content Type |
|------------|-------------|--------------|
| `ITERATION_START` | Start of an agentic iteration | None |
| `TEXT_DELTA` | Incremental text content | `str` |
| `THINKING` | Extended thinking content | `str` |
| `TOOL_USE_START` | Tool call initiated by LLM | `dict` |
| `TOOL_RESULT` | Result from tool execution | `dict` |
| `TOOL_USE_END` | Tool call completed | None |
| `ITERATION_END` | End of iteration (includes token usage) | None |
| `COMPLETE` | Generation fully complete | None |
| `ERROR` | Error occurred during generation | `dict` |

## Event Structure

Each `StreamEvent` has the following fields:

```python
class StreamEvent:
    type: StreamEventType           # Event type
    content: str | dict | None      # Event-specific content
    iteration: int                  # Current iteration number
    metadata: dict                  # Additional metadata
    timestamp: float                # Unix timestamp
    model: str | None              # Model identifier
    stop_reason: str | None        # Reason generation stopped
    usage: dict | None             # Token usage information
```

## Usage Examples

### Example 1: Real-Time Display

Display text as it streams in, like ChatGPT:

```python
async def stream_response(agent, prompt):
    full_text = ""

    async for event in agent.llm.generate_stream(prompt):
        if event.type == StreamEventType.TEXT_DELTA:
            full_text += event.content
            print(event.content, end="", flush=True)

        elif event.type == StreamEventType.COMPLETE:
            print(f"\n\nTokens used: {event.usage}")
```

### Example 2: Monitoring Tool Calls

Track tool execution in multi-iteration agentic loops:

```python
async def monitor_agent_activity(agent, prompt):
    async for event in agent.llm.generate_stream(prompt):
        if event.type == StreamEventType.ITERATION_START:
            print(f"\n→ Iteration {event.iteration + 1}")

        elif event.type == StreamEventType.TEXT_DELTA:
            print(event.content, end="", flush=True)

        elif event.type == StreamEventType.TOOL_USE_START:
            tool_name = event.content['name']
            tool_input = event.content['input']
            print(f"\n⚙ Calling {tool_name}({tool_input})")

        elif event.type == StreamEventType.TOOL_RESULT:
            is_error = event.content['is_error']
            status = "✗ Error" if is_error else "✓ Success"
            print(f"  {status}")

        elif event.type == StreamEventType.ITERATION_END:
            tokens = event.usage
            print(f"  Tokens: in={tokens['input_tokens']}, out={tokens['output_tokens']}")
```

### Example 3: Collecting Events for Analysis

Store all events for later analysis or debugging:

```python
async def collect_and_analyze(agent, prompt):
    events = []

    async for event in agent.llm.generate_stream(prompt):
        events.append(event)

    # Analyze collected events
    text_deltas = [e for e in events if e.type == StreamEventType.TEXT_DELTA]
    tool_calls = [e for e in events if e.type == StreamEventType.TOOL_USE_START]
    iterations = [e for e in events if e.type == StreamEventType.ITERATION_START]

    print(f"Total text chunks: {len(text_deltas)}")
    print(f"Total tool calls: {len(tool_calls)}")
    print(f"Total iterations: {len(iterations)}")

    # Reconstruct full text
    full_text = "".join(e.content for e in text_deltas)
    return full_text
```

### Example 4: Server-Sent Events (SSE)

Stream responses to web clients:

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

app = FastAPI()

@app.get("/chat/stream")
async def chat_stream(query: str):
    agent = Agent(name="chat_agent")

    async def event_generator():
        async for event in agent.llm.generate_stream(query):
            # Send as Server-Sent Event
            yield f"data: {event.model_dump_json()}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream"
    )
```

### Example 5: Progress Indicators

Show progress during generation:

```python
from rich.progress import Progress, SpinnerColumn, TextColumn

async def generate_with_progress(agent, prompt):
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
    ) as progress:
        task = progress.add_task("Generating...", total=None)

        async for event in agent.llm.generate_stream(prompt):
            if event.type == StreamEventType.TEXT_DELTA:
                progress.update(task, description="Generating response...")

            elif event.type == StreamEventType.TOOL_USE_START:
                progress.update(
                    task,
                    description=f"Calling tool: {event.content['name']}..."
                )

            elif event.type == StreamEventType.COMPLETE:
                progress.update(task, description="✓ Complete")
```

## Provider Support

Streaming is currently supported for:

| Provider | Status | Method |
|----------|--------|--------|
| **Anthropic** | ✅ Supported | `client.messages.stream()` |
| **Bedrock** | ✅ Supported | `converse_stream()` |
| OpenAI | ⏳ Future | Not yet implemented |
| Azure | ⏳ Future | Not yet implemented |
| Google | ⏳ Future | Not yet implemented |

## Advanced Topics

### History Management

Streaming respects the `use_history` parameter:

```python
# History is automatically maintained across streaming calls
async for event in agent.llm.generate_stream(
    "What did I just ask?",
    request_params=RequestParams(use_history=True)
):
    # Process events...
```

### Error Handling

Always handle errors in streaming:

```python
try:
    async for event in agent.llm.generate_stream(prompt):
        if event.type == StreamEventType.ERROR:
            error_msg = event.content['error']
            print(f"Error: {error_msg}")
            break
        # Process other events...
except Exception as e:
    print(f"Streaming failed: {e}")
```

### Token Tracking

Token usage is reported per iteration:

```python
total_input = 0
total_output = 0

async for event in agent.llm.generate_stream(prompt):
    if event.type == StreamEventType.ITERATION_END:
        total_input += event.usage['input_tokens']
        total_output += event.usage['output_tokens']

print(f"Total tokens: in={total_input}, out={total_output}")
```

### Final Iteration Validation

The streaming implementation automatically handles final iteration validation to prevent infinite loops:

```python
# When max_iterations is reached and the last response was a tool call,
# the system automatically injects a prompt to force a final answer
request_params = RequestParams(max_iterations=3)

async for event in agent.llm.generate_stream(prompt, request_params):
    # The agent will gracefully conclude after 3 iterations
    pass
```

## Comparison: Streaming vs Non-Streaming

| Feature | `generate()` | `generate_stream()` |
|---------|--------------|---------------------|
| **Returns** | Complete response | Event stream |
| **Display** | All at once | Real-time incremental |
| **Tool visibility** | Hidden | Visible as they happen |
| **Token usage** | Total at end | Per-iteration |
| **Progress** | No indication | Real-time updates |
| **Debugging** | Limited | Full visibility |
| **Use case** | Batch processing | Interactive UIs |

### Migration Example

**Before (Non-Streaming):**
```python
responses = await agent.llm.generate("Tell me a story")
final_text = responses[-1].content[0].text
print(final_text)
```

**After (Streaming):**
```python
async for event in agent.llm.generate_stream("Tell me a story"):
    if event.type == StreamEventType.TEXT_DELTA:
        print(event.content, end="", flush=True)
```

## Best Practices

### 1. Use Appropriate Methods

- **`generate_stream()`**: When you need full control and visibility
- **`generate_str_stream()`**: When you only need text content
- **`generate()`**: When you don't need real-time updates

### 2. Handle All Event Types

Always handle at least `TEXT_DELTA` and `ERROR` events:

```python
async for event in agent.llm.generate_stream(prompt):
    if event.type == StreamEventType.TEXT_DELTA:
        # Handle text
        pass
    elif event.type == StreamEventType.ERROR:
        # Handle errors
        break
```

### 3. Flush Output for Real-Time Display

```python
# Good: Flushes immediately
print(event.content, end="", flush=True)

# Bad: Buffers output
print(event.content, end="")
```

### 4. Consider Rate Limiting

For web applications, consider rate limiting streaming responses:

```python
import asyncio

async for text in agent.llm.generate_str_stream(prompt):
    print(text, end="", flush=True)
    await asyncio.sleep(0.01)  # Throttle output
```

### 5. Store Events for Debugging

In development, collect all events for analysis:

```python
if DEBUG:
    events = []
    async for event in agent.llm.generate_stream(prompt):
        events.append(event)
        # Process event...

    # Save events for debugging
    with open("debug_events.json", "w") as f:
        json.dump([e.model_dump() for e in events], f)
```

## Troubleshooting

### Streaming Not Working

**Problem**: No events are emitted or streaming hangs.

**Solution**: Ensure you're using `async for` and the provider supports streaming:

```python
# Correct
async for event in agent.llm.generate_stream(prompt):
    pass

# Incorrect
for event in agent.llm.generate_stream(prompt):  # Missing 'async'
    pass
```

### Text Not Appearing in Real-Time

**Problem**: Text appears all at once instead of incrementally.

**Solution**: Use `flush=True` in print statements:

```python
print(event.content, end="", flush=True)  # Correct
```

### Missing Events

**Problem**: Not seeing TOOL_USE events.

**Solution**: Ensure tools are configured and check for TOOL_USE_START events:

```python
async for event in agent.llm.generate_stream(prompt):
    if event.type == StreamEventType.TOOL_USE_START:
        print(f"Tool: {event.content['name']}")
```

## Performance Considerations

- **Latency**: First token appears faster with streaming (<100ms)
- **Memory**: Streaming uses slightly more memory for event objects
- **Network**: Same total bandwidth, but distributed over time
- **Throughput**: No significant difference in total generation time

## Examples

See [`examples/basic/streaming_demo/`](../examples/basic/streaming_demo/) for complete working examples including:

- Basic text streaming
- Tool call monitoring
- Event collection and analysis
- Progress tracking
- Web API integration

## API Reference

### `generate_stream(message, request_params=None) -> AsyncIterator[StreamEvent]`

Stream LLM generation events as they occur.

**Parameters:**
- `message`: Input message(s) to process
- `request_params`: Optional request configuration

**Yields:** `StreamEvent` objects as generation progresses

### `generate_str_stream(message, request_params=None) -> AsyncIterator[str]`

Convenience method that yields only text content.

**Parameters:**
- `message`: Input message(s) to process
- `request_params`: Optional request configuration

**Yields:** Text strings as they're generated

## Further Reading

- [Streaming Support Proposal](streaming_support_proposal.md) - Technical design document
- [AugmentedLLM Documentation](mcp-agent-sdk/core-components/augmented-llm.mdx) - Core API reference
- [Examples](../examples/basic/streaming_demo/) - Complete working examples
