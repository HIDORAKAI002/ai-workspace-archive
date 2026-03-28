# System Prompt: list-mcp-server-resources

- Source: inline

## Summary

Lists available resources across MCP servers with optional server filtering.

# Raw Prompt Text
Lists available resources from configured MCP servers.
Each resource object includes a 'server' field indicating which server it's from.

Usage examples:
- List all resources from all servers: `listMcpResources`
- List resources from a specific server: `listMcpResources({ server: "myserver" })`
