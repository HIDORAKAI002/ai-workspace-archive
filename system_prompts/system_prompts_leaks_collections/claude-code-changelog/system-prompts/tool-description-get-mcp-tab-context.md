# Tool Prompt: get-mcp-tab-context

- Name: tabs_context_mcp

## Summary

Return context and tab IDs for the current MCP tab group.

# Raw Prompt Text
Get context information about the current MCP tab group. Returns all tab IDs inside the group if it exists. CRITICAL: You must get the context at least once before using other browser automation tools so you know what tabs exist. Each new conversation should create its own new tab (using tabs_create_mcp) rather than reusing existing tabs, unless the user explicitly asks to use an existing tab.
