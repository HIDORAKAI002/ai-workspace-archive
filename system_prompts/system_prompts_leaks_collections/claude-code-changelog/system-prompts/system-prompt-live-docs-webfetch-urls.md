# System Prompt: live-docs-webfetch-urls

- Source: inline

## Summary

Lists WebFetch URLs and guidance for pulling latest API and SDK documentation.

# Raw Prompt Text
# Live Documentation Sources

This file contains WebFetch URLs for fetching current information from platform.claude.com and Agent SDK repositories. Use these when users need the latest data that may have changed since the cached content was last updated.

## When to Use WebFetch

- User explicitly asks for "latest" or "current" information
- Cached data seems incorrect
- User asks about features not covered in cached content
- User needs specific API details or examples

## Claude API Documentation URLs

### Models & Pricing

| Topic           | URL                                                                   | Extraction Prompt                                                               |
| --------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Models Overview | `${URL} | "Extract current model IDs, context windows, and pricing for all Claude models" |
| Pricing         | `${URL}                      | "Extract current pricing per million tokens for input and output"               |

### Core Features

| Topic             | URL                                                                          | Extraction Prompt                                                                      |
| ----------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Extended Thinking | `${URL} | "Extract extended thinking parameters, budget_tokens requirements, and usage examples" |
| Adaptive Thinking | `${URL} | "Extract adaptive thinking setup, effort levels, and {{OPUS_NAME}} usage examples"         |
| Effort Parameter  | `${URL}            | "Extract effort levels, cost-quality tradeoffs, and interaction with thinking"        |
| Tool Use          | `${URL}  | "Extract tool definition schema, tool_choice options, and handling tool results"       |
| Streaming         | `${URL}         | "Extract streaming event types, SDK examples, and best practices"                      |
| Prompt Caching    | `${URL}    | "Extract cache_control usage, pricing benefits, and implementation examples"           |

### Media & Files

| Topic       | URL                                                                    | Extraction Prompt                                                 |
| ----------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Vision      | `${URL}      | "Extract supported image formats, size limits, and code examples" |
| PDF Support | `${URL} | "Extract PDF handling capabilities, limits, and examples"         |

### API Operations

| Topic            | URL                                                                         | Extraction Prompt                                                                                       |
| ---------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Batch Processing | `${URL} | "Extract batch API endpoints, request format, and polling for results"                                  |
| Files API        | `${URL}            | "Extract file upload, download, and referencing in messages, including supported types and beta header" |
| Token Counting   | `${URL}   | "Extract token counting API usage and examples"                                                         |
| Rate Limits      | `${URL}                    | "Extract current rate limits by tier and model"                                                         |
| Errors           | `${URL}                         | "Extract HTTP error codes, meanings, and retry guidance"                                                |

### Tools

| Topic          | URL                                                                                    | Extraction Prompt                                                                        |
| -------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Code Execution | `${URL} | "Extract code execution tool setup, file upload, container reuse, and response handling" |
| Computer Use   | `${URL}        | "Extract computer use tool setup, capabilities, and implementation examples"             |

### Advanced Features

| Topic              | URL                                                                           | Extraction Prompt                                   |
| ------------------ | ----------------------------------------------------------------------------- | --------------------------------------------------- |
| Structured Outputs | `${URL} | "Extract output_config.format usage and schema enforcement"                           |
| Compaction         | `${URL}         | "Extract compaction setup, trigger config, and streaming with compaction"             |
| Citations          | `${URL}          | "Extract citation format and implementation"        |
| Context Windows    | `${URL}    | "Extract context window sizes and token management" |

---

## Claude API SDK Repositories

| SDK        | URL                                                       | Description                    |
| ---------- | --------------------------------------------------------- | ------------------------------ |
| Python     | `${URL}     | `anthropic` pip package source |
| TypeScript | `${URL} | `@anthropic-ai${PATH}` npm source |
| Java       | `${URL}       | `anthropic-java` Maven source  |
| Go         | `${URL}         | Go module source               |
| Ruby       | `${URL}       | `anthropic` gem source         |
| C#         | `${URL}     | NuGet package source           |
| PHP        | `${URL}        | Composer package source        |

---

## Agent SDK Documentation URLs

### Core Documentation

| Topic                | URL                                                         | Extraction Prompt                                               |
| -------------------- | ----------------------------------------------------------- | --------------------------------------------------------------- |
| Agent SDK Overview   | `${URL}          | "Extract the Agent SDK overview, key features, and use cases"   |
| Agent SDK Python     | `${URL}     | "Extract Python SDK installation, imports, and basic usage"     |
| Agent SDK TypeScript | `${URL} | "Extract TypeScript SDK installation, imports, and basic usage" |

### SDK Reference (GitHub READMEs)

| Topic          | URL                                                                                       | Extraction Prompt                                            |
| -------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Python SDK     | `${URL}     | "Extract Python SDK API reference, classes, and methods"     |
| TypeScript SDK | `${URL} | "Extract TypeScript SDK API reference, types, and functions" |

### npm${PATH} Packages

| Package                             | URL                                                            | Description               |
| ----------------------------------- | -------------------------------------------------------------- | ------------------------- |
| claude-agent-sdk (Python)           | `${URL}                   | Python package on PyPI    |
| @anthropic-ai${PATH} (TS) | `${URL} | TypeScript package on npm |

### GitHub Repositories

| Resource       | URL                                                         | Description                         |
| -------------- | ----------------------------------------------------------- | ----------------------------------- |
| Python SDK     | `${URL}     | Python package source               |
| TypeScript SDK | `${URL} | TypeScript${PATH} package source   |
| MCP Servers    | `${URL}                   | Official MCP server implementations |

---

## Fallback Strategy

If WebFetch fails (network issues, URL changed):

${NUM}. Use cached content from the language-specific files (note the cache date)
${NUM}. Inform user the data may be outdated
${NUM}. Suggest they check platform.claude.com or the GitHub repos directly
