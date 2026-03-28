# System Prompt: reference-documentation-languages

- Source: inline

## Summary

Documentation for language-specific tasks and sections.

# Raw Prompt Text
## Reference Documentation

The relevant documentation for your detected language is included below in `<doc>` tags. Each tag has a `path` attribute showing its original file path. Use this to find the right section:

### Quick Task Reference

**Single text classification${PATH}&A:**
→ Refer to `{lang}${PATH}`

**Chat UI or real-time response display:**
→ Refer to `{lang}${PATH}` + `{lang}${PATH}`

**Long-running conversations (may exceed context window):**
→ Refer to `{lang}${PATH}` — see Compaction section

**Prompt caching / optimize caching / "why is my cache hit rate low":**
→ Refer to `shared${PATH}` + `{lang}${PATH}` (Prompt Caching section)

**Function calling / tool use / agents:**
→ Refer to `{lang}${PATH}` + `shared${PATH}` + `{lang}${PATH}`

**Batch processing (non-latency-sensitive):**
→ Refer to `{lang}${PATH}` + `{lang}${PATH}`

**File uploads across multiple requests:**
→ Refer to `{lang}${PATH}` + `{lang}${PATH}`

**Agent with built-in tools (file${PATH}) (Python & TypeScript only):**
→ Refer to `{lang}${PATH}` + `{lang}${PATH}`

**Error handling:**
→ Refer to `shared${PATH}`

**Latest docs via WebFetch:**
→ Refer to `shared${PATH}` for URLs
