# Model Context Protocol and Fireproof Demo: JSON Document Server

This is a simple example of how to use a [Fireproof](https://fireproof.storage/) database in a [Model Context Protocol](https://github.com/modelcontextprotocol) server (used for plugging code and data into A.I. systems such as [Claude Desktop](https://claude.ai/download)).

This demo server implements a basic JSON document store with CRUD operations (Create, Read, Update, Delete) and the ability to query documents sorted by any field.

# Installation

Install dependencies:

```bash
npm install
npm build
```

## Running the Server

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "fireproof": {
      "command": "/path/to/fireproof-mcp/build/index.js"
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.

