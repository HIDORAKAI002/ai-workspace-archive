# MCP stdio Server Solutions

> **⚠️ Important**: These solutions have been updated to use the **stdio transport** as recommended by MCP Specification 2025-06-18. The original SSE (Server-Sent Events) transport has been deprecated.

Here are the complete solutions for building MCP servers using the stdio transport in each runtime:

- [TypeScript](./typescript/) - Complete stdio server implementation
- [Python](./python/) - Python stdio server with asyncio
- [.NET](./dotnet/) - .NET stdio server with dependency injection

Each solution demonstrates:
- Setting up stdio transport
- Defining server tools
- Proper JSON-RPC message handling
- Integration with MCP clients like Claude

All solutions follow the current MCP specification and use the recommended stdio transport for optimal performance and security.