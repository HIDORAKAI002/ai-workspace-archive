# System Prompt: load-schema-before-call

- Source: inline

## Summary

Ensure tool schema is sent before API call.

# Raw Prompt Text
This tool's schema was not sent to the API — it was not in the discovered-tool set derived from message history. Without the schema in your prompt, typed parameters (arrays, numbers, booleans) get emitted as strings and the client-side parser rejects them. Load the tool first: call ToolSearch with query "select:${EXPR_1}", then retry this call.
