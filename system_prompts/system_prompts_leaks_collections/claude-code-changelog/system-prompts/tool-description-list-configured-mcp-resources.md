# Tool Prompt: list-configured-mcp-resources

- Name: ListMcpResourcesTool

## Summary

Tool to list MCP resources from all or a specified server including server field.

# Raw Prompt Text
List available resources from configured MCP servers.
Each returned resource will include all standard MCP resource fields plus a 'server' field
indicating which server the resource belongs to.

Parameters:
- server (optional): The name of a specific MCP server to get resources from. If not provided,
  resources from all servers will be returned.
