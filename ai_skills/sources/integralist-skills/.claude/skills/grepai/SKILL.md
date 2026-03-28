---
name: grepai
description: >-
  Semantic code search with grepai. Use when searching by intent
  or concept rather than exact text (e.g. "where is rate limiting
  implemented" when you don't know the naming conventions).
---

# grepai — semantic code search

## When to use

- Searching by concept or intent ("authentication flow",
  "error recovery logic") when you don't know the exact names
- Exploring unfamiliar codebases where naming conventions are unknown
- Tracing callers of a function across a large codebase

For exact text or regex pattern matching, use `rg` (ripgrep) instead.

## Install (if not present)

Check: `which grepai`

```bash
brew install yoanbernabeu/tap/grepai
```

Run `grepai -h` to learn available subcommands and options.

## Quick start

```bash
grepai init                        # Initialize in your project
grepai watch                       # Start indexing daemon
grepai search "error handling"     # Search semantically
grepai trace callers "Login"       # Find who calls a function
```
