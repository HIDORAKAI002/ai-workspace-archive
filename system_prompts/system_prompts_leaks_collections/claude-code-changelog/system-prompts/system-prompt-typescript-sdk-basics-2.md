# System Prompt: typescript-sdk-basics-2

- Source: inline

## Summary

Example of a basic agent using TypeScript.

# Raw Prompt Text
# Agent SDK Patterns — TypeScript

## Basic Agent

```typescript
import { query } from "@anthropic-ai${PATH}";

async function main() {
  for await (const message of query({
    prompt: "Explain what this repository does",
    options: {
      cwd: "${PATH}",
      allowedTools: ["Read", "Glob", "Grep"],
    },
  })) {
    if ("result" in message) {
      console.log(message.result);
    }
  }
}

main();
```

---

## Hooks

### After Tool Use Hook

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

---

## Subagents

```typescript
import { query } from "@anthropic-ai${PATH}";

for await (const message of query({
  prompt: "Use the code-reviewer agent to review this codebase",
  options: {
    allowedTools: ["Read", "Glob", "Grep", "Agent"],
    agents: {
      "code-reviewer": {
        description: "Expert code reviewer for quality and security reviews.",
        prompt: "Analyze code quality and suggest improvements.",
        tools: ["Read", "Glob", "Grep"],
      },
    },
  },
})) {
  if ("result" in message) console.log(message.result);
}
```

---

## MCP Server Integration

### Browser Automation (Playwright)

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

---

## Session Resumption

```typescript
import { query } from "@anthropic-ai${PATH}";

let sessionId: string | undefined;

// First query: capture the session ID
for await (const message of query({
  prompt: "Read the authentication module",
  options: { allowedTools: ["Read", "Glob"] },
})) {
  if (message.type === "system" && message.subtype === "init") {
    sessionId = message.session_id;
  }
}

// Resume with full context from the first query
for await (const message of query({
  prompt: "Now find all places that call it",
  options: { resume: sessionId },
})) {
  if ("result" in message) console.log(message.result);
}
```

---

## Session History

```typescript
import { listSessions, getSessionMessages, getSessionInfo } from "@anthropic-ai${PATH}";

async function main() {
  // List past sessions (supports pagination via limit${PATH})
  const sessions = await listSessions();
  for (const session of sessions) {
    console.log(`Session ${EXPR_3} in ${EXPR_4} (tag: ${EXPR_5})`);
  }

  // Get metadata for a single session
  if (sessions.length > ${NUM}) {
    const info = await getSessionInfo(sessions[${NUM}].sessionId);
    console.log(`Created: ${EXPR_6}, Tag: ${EXPR_7}`);
  }

  // Retrieve messages from the most recent session
  if (sessions.length > ${NUM}) {
    const messages = await getSessionMessages(sessions[${NUM}].sessionId, { limit: ${NUM} });
    for (const msg of messages) {
      console.log(msg);
    }
  }
}

main();
```

---

## Session Mutations

```typescript
import { renameSession, tagSession, forkSession } from "@anthropic-ai${PATH}";

async function main() {
  const sessionId = "your-session-id";

  // Rename a session
  await renameSession(sessionId, "Refactoring auth module");

  // Tag a session for filtering
  await tagSession(sessionId, "experiment-v2");

  // Clear a tag
  await tagSession(sessionId, null);

  // Fork a conversation to branch from a point
  const { sessionId: forkedId } = await forkSession(sessionId);
  console.log(`Forked session: ${EXPR_8}`);
}

main();
```

---

## Custom System Prompt

```typescript
import { query } from "@anthropic-ai${PATH}";

for await (const message of query({
  prompt: "Review this code",
  options: {
    allowedTools: ["Read", "Glob", "Grep"],
    systemPrompt: `You are a senior code reviewer focused on:
${NUM}. Security vulnerabilities
${NUM}. Performance issues
${NUM}. Code maintainability

Always provide specific line numbers and suggestions for improvement.`,
  },
})) {
  if ("result" in message) console.log(message.result);
}
```
