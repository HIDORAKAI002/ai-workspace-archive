# System Prompt: streaming-typescript-content-event

- Source: inline

## Summary

Example of streaming messages with TypeScript.

# Raw Prompt Text
# Streaming — TypeScript

## Quick Start

```typescript
const stream = client.messages.stream({
  model: "{{OPUS_ID}}",
  max_tokens: ${NUM},
  messages: [{ role: "user", content: "Write a story" }],
});

for await (const event of stream) {
  if (
    event.type === "content_block_delta" &&
    event.delta.type === "text_delta"
  ) {
    process.stdout.write(event.delta.text);
  }
}
```

---

## Handling Different Content Types

> **Opus ${NUM}:** Use `thinking: {type: "adaptive"}`. On older models, use `thinking: {type: "enabled", budget_tokens: N}` instead.

```typescript
const stream = client.messages.stream({
  model: "{{OPUS_ID}}",
  max_tokens: ${NUM},
  thinking: { type: "adaptive" },
  messages: [{ role: "user", content: "Analyze this problem" }],
});

for await (const event of stream) {
  switch (event.type) {
    case "content_block_start":
      switch (event.content_block.type) {
        case "thinking":
          console.log("\n[Thinking...]");
          break;
        case "text":
          console.log("\n[Response:]");
          break;
      }
      break;
    case "content_block_delta":
      switch (event.delta.type) {
        case "thinking_delta":
          process.stdout.write(event.delta.thinking);
          break;
        case "text_delta":
          process.stdout.write(event.delta.text);
          break;
      }
      break;
  }
}
```

---

## Streaming with Tool Use (Tool Runner)

Use the tool runner with `stream: true`. The outer loop iterates over tool runner iterations (messages), the inner loop processes stream events:

```typescript
import Anthropic from "@anthropic-ai${PATH}";
import { betaZodTool } from "@anthropic-ai${PATH}";
import { z } from "zod";

const client = new Anthropic();

const getWeather = betaZodTool({
  name: "get_weather",
  description: "Get current weather for a location",
  inputSchema: z.object({
    location: z.string().describe("City and state, e.g., San Francisco, CA"),
  }),
  run: async ({ location }) => `${NUM}°F and sunny in ${EXPR_1}`,
});

const runner = client.beta.messages.toolRunner({
  model: "{{OPUS_ID}}",
  max_tokens: ${NUM},
  tools: [getWeather],
  messages: [
    { role: "user", content: "What's the weather in Paris and London?" },
  ],
  stream: true,
});

// Outer loop: each tool runner iteration
for await (const messageStream of runner) {
  // Inner loop: stream events for this iteration
  for await (const event of messageStream) {
    switch (event.type) {
      case "content_block_delta":
        switch (event.delta.type) {
          case "text_delta":
            process.stdout.write(event.delta.text);
            break;
          case "input_json_delta":
            // Tool input being streamed
            break;
        }
        break;
    }
  }
}
```

---

## Getting the Final Message

```typescript
const stream = client.messages.stream({
  model: "{{OPUS_ID}}",
  max_tokens: ${NUM},
  messages: [{ role: "user", content: "Hello" }],
});

for await (const event of stream) {
  // Process events...
}

const finalMessage = await stream.finalMessage();
console.log(`Tokens used: ${EXPR_2}`);
```

---

## Stream Event Types

| Event Type            | Description                 | When it fires                     |
| --------------------- | --------------------------- | --------------------------------- |
| `message_start`       | Contains message metadata   | Once at the beginning             |
| `content_block_start` | New content block beginning | When a text${PATH} block starts |
| `content_block_delta` | Incremental content update  | For each token${PATH}              |
| `content_block_stop`  | Content block complete      | When a block finishes             |
| `message_delta`       | Message-level updates       | Contains `stop_reason`, usage     |
| `message_stop`        | Message complete            | Once at the end                   |

## Best Practices

${NUM}. **Always flush output** — Use `process.stdout.write()` for immediate display
${NUM}. **Handle partial responses** — If the stream is interrupted, you may have incomplete content
${NUM}. **Track token usage** — The `message_delta` event contains usage information
${NUM}. **Use `finalMessage()`** — Get the complete `Anthropic.Message` object even when streaming. Don't wrap `.on()` events in `new Promise()` — `finalMessage()` handles all completion${PATH} states internally
${NUM}. **Buffer for web UIs** — Consider buffering a few tokens before rendering to avoid excessive DOM updates
${NUM}. **Use `stream.on("text", ...)` for deltas** — The `text` event provides just the delta string, simpler than manually filtering `content_block_delta` events
${NUM}. **For agentic loops with streaming** — See the [Streaming Manual Loop](.${PATH}#streaming-manual-loop) section in tool-use.md for combining `stream()` + `finalMessage()` with a tool-use loop

## Raw SSE Format

If using raw HTTP (not SDKs), the stream returns Server-Sent Events:

```
event: message_start
data: {"type":"message_start","message":{"id":"msg_...","type":"message",...}}

event: content_block_start
data: {"type":"content_block_start","index":${NUM},"content_block":{"type":"text","text":""}}

event: content_block_delta
data: {"type":"content_block_delta","index":${NUM},"delta":{"type":"text_delta","text":"Hello"}}

event: content_block_stop
data: {"type":"content_block_stop","index":${NUM}}

event: message_delta
data: {"type":"message_delta","delta":{"stop_reason":"end_turn"},"usage":{"output_tokens":${NUM}}}

event: message_stop
data: {"type":"message_stop"}
```
