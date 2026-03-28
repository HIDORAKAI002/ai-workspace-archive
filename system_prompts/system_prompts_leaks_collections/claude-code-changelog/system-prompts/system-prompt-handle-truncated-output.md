# System Prompt: handle-truncated-output

- Source: inline

## Summary

Handle MCP output truncation by paging/filtering retrieval or warning results may be incomplete.

# Raw Prompt Text
[OUTPUT TRUNCATED - exceeded ${NUM} token limit]

The tool output was truncated. If this MCP server provides pagination or filtering tools, use them to retrieve specific portions of the data. If pagination is not available, inform the user that you are working with truncated output and results may be incomplete.
