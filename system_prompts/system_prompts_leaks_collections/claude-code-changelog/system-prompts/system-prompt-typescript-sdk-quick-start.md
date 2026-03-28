# System Prompt: typescript-sdk-quick-start

- Source: inline

## Summary

Guide for using the Claude Agent SDK in TypeScript.

# Raw Prompt Text
# Agent SDK — TypeScript

The Claude Agent SDK provides a higher-level interface for building AI agents with built-in tools, safety features, and agentic capabilities.

## Installation

```bash
npm install @anthropic-ai${PATH}
```

---

## Quick Start

```typescript
import { query } from "@anthropic-ai${PATH}";

for await (const message of query({
  prompt: "Explain this codebase",
  options: { allowedTools: ["Read", "Glob", "Grep"] },
})) {
  if ("result" in message) {
    console.log(message.result);
  }
}
```

---

## Built-in Tools

| Tool      | Description                          |
| --------- | ------------------------------------ |
| Read      | Read files in the workspace          |
| Write     | Create new files                     |
| Edit      | Make precise edits to existing files |
| Bash      | Execute shell commands               |
| Glob      | Find files by pattern                |
| Grep      | Search files by content              |
| WebSearch | Search the web for information       |
| WebFetch        | Fetch and analyze web pages          |
| AskUserQuestion | Ask user clarifying questions         |
| Agent           | Spawn subagents                      |

---

## Permission System

```typescript
for await (const message of query({
  prompt: "Refactor the authentication module",
  options: {
    allowedTools: ["Read", "Edit", "Write"],
    permissionMode: "acceptEdits",
  },
})) {
  if ("result" in message) console.log(message.result);
}
```

Permission modes:

- `"default"`: Prompt for dangerous operations
- `"plan"`: Planning only, no execution
- `"acceptEdits"`: Auto-accept file edits
- `"dontAsk"`: Don't prompt — **denies** anything not pre-approved (not an auto-approve mode)
- `"bypassPermissions"`: Skip all prompts (requires `allowDangerouslySkipPermissions: true` in options)

---

## MCP (Model Context Protocol) Support

```typescript
for await (const message of query({
  prompt: "Open example.com and describe what you see",
  options: {
    mcpServers: {
      playwright: { command: "npx", args: ["@playwright${PATH}@latest"] },
    },
  },
})) {
  if ("result" in message) console.log(message.result);
}
```

### In-Process MCP Tools

You can define custom tools that run in-process using `tool()` and `createSdkMcpServer`:

```typescript
import { query, tool, createSdkMcpServer } from "@anthropic-ai${PATH}";
import { z } from "zod";

const myTool = tool("my-tool", "Description", { input: z.string() }, async (args) => {
  return { content: [{ type: "text", text: "result" }] };
});

const server = createSdkMcpServer({ name: "my-server", tools: [myTool] });

// Pass to query
for await (const message of query({
  prompt: "Use my-tool to do something",
  options: { mcpServers: { myServer: server } },
})) {
  if ("result" in message) console.log(message.result);
}
```

---

## Hooks

```typescript
import { query, HookCallback } from "@anthropic-ai${PATH}";
import { appendFileSync } from "fs";

const logFileChange: HookCallback = async (input) => {
  const filePath = (input as any).tool_input?.file_path ?? "unknown";
  appendFileSync(
    ".${PATH}",
    `${EXPR_1}: modified ${EXPR_2}\n`,
  );
  return {};
};

for await (const message of query({
  prompt: "Refactor utils.py to improve readability",
  options: {
    allowedTools: ["Read", "Edit", "Write"],
    permissionMode: "acceptEdits",
    hooks: {
      PostToolUse: [{ matcher: "Edit|Write", hooks: [logFileChange] }],
    },
  },
})) {
  if ("result" in message) console.log(message.result);
}
```

Hook event inputs for tool-lifecycle events (`PreToolUse`, `PostToolUse`, `PostToolUseFailure`) include `agent_id` and `agent_type` fields, allowing hooks to identify which agent (main or subagent) triggered the tool call.

Available hook events: `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `Notification`, `UserPromptSubmit`, `SessionStart`, `SessionEnd`, `Stop`, `SubagentStart`, `SubagentStop`, `PreCompact`, `PermissionRequest`, `Setup`, `TeammateIdle`, `TaskCompleted`, `ConfigChange`, `Elicitation`, `ElicitationResult`, `WorktreeCreate`, `WorktreeRemove`, `InstructionsLoaded`

---

## Common Options

`query()` takes a top-level `prompt` (string) and an `options` object:

```typescript
query({ prompt: "...", options: { ... } })
```

| Option                              | Type   | Description                                                                |
| ----------------------------------- | ------ | -------------------------------------------------------------------------- |
| `cwd`                               | string | Working directory for file operations                                      |
| `allowedTools`                      | array  | Tools the agent can use (e.g., `["Read", "Edit", "Bash"]`)                |
| `tools`                             | array \| preset | Built-in tools to make available (`string[]` or `{type:'preset', preset:'claude_code'}`) |
| `disallowedTools`                   | array  | Tools to explicitly disallow                                               |
| `permissionMode`                    | string | How to handle permission prompts                                           |
| `allowDangerouslySkipPermissions`   | bool   | Must be `true` to use `permissionMode: "bypassPermissions"`                |
| `mcpServers`                        | object | MCP servers to connect to                                                  |
| `hooks`                             | object | Hooks for customizing behavior                                             |
| `systemPrompt`                      | string \| preset | Custom system prompt (`string` or `{type:'preset', preset:'claude_code', append?:string}`) |
| `maxTurns`                          | number | Maximum agent turns before stopping                                        |
| `maxBudgetUsd`                      | number | Maximum budget in USD for the query                                        |
| `model`                             | string | Model ID (default: determined by CLI)                                      |
| `agents`                            | object | Subagent definitions (`Record<string, AgentDefinition>`)                   |
| `outputFormat`                      | object | Structured output schema                                                   |
| `thinking`                          | object | Thinking${PATH} control                                                 |
| `betas`                             | array  | Beta features to enable (e.g., `["context-1m-${DATE}"]`)               |
| `settingSources`                    | array  | Settings to load (e.g., `["project"]`). Default: none (no CLAUDE.md files) |
| `env`                               | object | Environment variables to set for the session                               |
| `agentProgressSummaries`            | bool   | Enable periodic AI-generated progress summaries on `task_progress` events  |

---

## Subagents

```typescript
for await (const message of query({
  prompt: "Use the code-reviewer agent to review this codebase",
  options: {
    allowedTools: ["Read", "Glob", "Grep", "Agent"],
    agents: {
      "code-reviewer": {
        description: "Expert code reviewer for quality and security reviews.",
        prompt: "Analyze code quality and suggest improvements.",
        tools: ["Read", "Glob", "Grep"],
        // Optional: skills, mcpServers for subagent customization
      },
    },
  },
})) {
  if ("result" in message) console.log(message.result);
}
```

---

## Message Types

```typescript
for await (const message of query({
  prompt: "Find TODO comments",
  options: { allowedTools: ["Read", "Glob", "Grep"] },
})) {
  if ("result" in message) {
    console.log(message.result);
    console.log(`Stop reason: ${EXPR_3}`); // e.g., "end_turn", "tool_use", "max_tokens"
  } else if (message.type === "system" && message.subtype === "init") {
    const sessionId = message.session_id; // Capture for resuming later
  }
}
```

Task-related system messages are also emitted for subagent operations:
- `task_started` — emitted when a subagent task is registered
- `task_progress` — real-time progress updates with cumulative usage metrics, tool counts, and duration (enable `agentProgressSummaries` option for periodic AI-generated summaries via the `summary` field)
- `task_notification` — task completion notifications (includes `tool_use_id` for correlating with originating tool calls)

---

## Session History

Retrieve past session data:

```typescript
import { listSessions, getSessionMessages, getSessionInfo } from "@anthropic-ai${PATH}";

// List all past sessions (supports pagination via limit${PATH})
const sessions = await listSessions({ limit: ${NUM}, offset: ${NUM} });
for (const session of sessions) {
  console.log(`${EXPR_4}: ${EXPR_5} (tag: ${EXPR_6})`);
}

// Get metadata for a single session
const sessionId = sessions[${NUM}]?.sessionId;
const info = await getSessionInfo(sessionId);
console.log(info.tag, info.createdAt);

// Get messages from a specific session (supports pagination via limit${PATH})
const messages = await getSessionMessages(sessionId, { limit: ${NUM}, offset: ${NUM} });
for (const msg of messages) {
  console.log(msg);
}
```

### Session Mutations

Rename, tag, or fork sessions:

```typescript
import { renameSession, tagSession, forkSession } from "@anthropic-ai${PATH}";

// Rename a session
await renameSession(sessionId, "My refactoring session");

// Tag a session
await tagSession(sessionId, "experiment");

// Clear a tag
await tagSession(sessionId, null);

// Fork a session — branch a conversation from a specific point
const { sessionId: forkedId } = await forkSession(sessionId);
```

---

## MCP Server Management

Manage MCP servers at runtime on a running query:

```typescript
// Reconnect a disconnected MCP server
await queryHandle.reconnectMcpServer("my-server");

// Toggle an MCP server on${PATH}
await queryHandle.toggleMcpServer("my-server", false);  // (name, enabled) — both required

// Get status of ALL configured MCP servers — returns an ARRAY
const statuses: McpServerStatus[] = await queryHandle.mcpServerStatus();
for (const s of statuses) {
  console.log(s.name, s.scope, s.tools.length, s.error);
}
```

---

## Best Practices

${NUM}. **Always specify allowedTools** — Explicitly list which tools the agent can use
${NUM}. **Set working directory** — Always specify `cwd` for file operations
${NUM}. **Use appropriate permission modes** — Start with `"default"` and only escalate when needed
${NUM}. **Handle all message types** — Check for `result` property to get agent output
${NUM}. **Limit maxTurns** — Prevent runaway agents with reasonable limits
