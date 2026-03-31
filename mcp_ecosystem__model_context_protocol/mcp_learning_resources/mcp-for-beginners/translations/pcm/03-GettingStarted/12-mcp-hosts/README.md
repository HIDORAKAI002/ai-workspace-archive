# Setting Up Popular MCP Host Clients

Dis guide dey cover how to set up and use MCP servers with popular AI host apps dem. Every host get im own way to configure, but once dem set am, all of dem go dey yarn with MCP servers using the standard protocol.

## Wetin be MCP Host?

An **MCP Host** na AI app wey fit connect to MCP servers to increase im power. Think am as the "front end" wey users dey use, while MCP servers dey provide the "back end" tools and data.

```mermaid
flowchart LR
    User[👤 User] --> Host[🖥️ MCP Host]
    Host --> S1[MCP Server A]
    Host --> S2[MCP Server B]
    Host --> S3[MCP Server C]
    
    subgraph "Popular Hosts"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Prerequisites

- MCP server wey you go connect to (see [Module 3.1 - First Server](../01-first-server/README.md))
- Host app wey you don install for your system
- Basic sabi for JSON configuration files

---

## 1. Claude Desktop

**Claude Desktop** na Anthropic official desktop app wey get native MCP support.

### Installation

1. Download Claude Desktop from [claude.ai/download](https://claude.ai/download)
2. Install am and sign in with your Anthropic account

### Configuration

Claude Desktop dey use JSON configuration file to define MCP servers.

**Where configuration file dey:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Example configuration:**

```json
{
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"],
      "env": {
        "PYTHONPATH": "/path/to/your/server"
      }
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-server/build/index.js"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

### Configuration Options

| Field | Description | Example |
|-------|-------------|---------|
| `command` | The executable to run | `"python"`, `"node"`, `"npx"` |
| `args` | Command line arguments | `["-m", "my_server"]` |
| `env` | Environment variables | `{"API_KEY": "xxx"}` |
| `cwd` | Working directory | `"/path/to/server"` |

### How to Test Your Setup

1. Save the configuration file
2. Restart Claude Desktop fully (quit and open am again)
3. Open new conversation
4. Look the 🔌 icon wey show say server connect don happen
5. Try ask Claude make e use any of your tools

### Troubleshooting Claude Desktop

**If server no dey show:**
- Check configuration file syntax with JSON validator
- Confirm say command path dey correct
- Look Claude Desktop logs: Help → Show Logs

**If server dey crash when e just start:**
- Test your server manually for terminal first
- Check environment variables say dem dey set well
- Make sure all dependencies don install

---

## 2. VS Code with GitHub Copilot

VS Code dey support MCP through GitHub Copilot Chat extensions.

### Prerequisites

1. VS Code 1.99+ don install
2. GitHub Copilot extension don install
3. GitHub Copilot Chat extension don install

### Configuration

VS Code dey use `.vscode/mcp.json` for your workspace or user settings.

**Workspace configuration** (`.vscode/mcp.json`):

```json
{
  "servers": {
    "my-calculator": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    },
    "my-database": {
      "type": "sse",
      "url": "http://localhost:8080/sse"
    }
  }
}
```

**User settings** (`settings.json`):

```json
{
  "mcp.servers": {
    "global-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-memory"]
    }
  },
  "mcp.enableLogging": true
}
```

### How to Use MCP for VS Code

1. Open Copilot Chat panel (Ctrl+Shift+I / Cmd+Shift+I)
2. Type `@` to see available MCP tools
3. Use natural language call tools: "Calculate 25 * 48 using the calculator"

### Troubleshooting VS Code

**If MCP servers no dey load:**
- Check Output panel → "MCP" for error logs
- Reload window: Ctrl+Shift+P → "Developer: Reload Window"
- Confirm say server fit run on im own first

---

## 3. Cursor

**Cursor** na AI-first code editor wey get MCP built-in support.

### Installation

1. Download Cursor from [cursor.sh](https://cursor.sh)
2. Install and sign in

### Configuration

Cursor dey use configuration format similar to Claude Desktop.

**Where config file dey:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Example configuration:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### How to Use MCP for Cursor

1. Open Cursor AI chat (Ctrl+L / Cmd+L)
2. MCP tools go show automatically for suggestions
3. Ask AI make e do tasks with connected servers

---

## 4. Cline (Terminal-Based)

**Cline** na terminal-based MCP client, perfect for command-line workflow.

### Installation

```bash
npm install -g @anthropic/cline
```

### Configuration

Cline dey use environment variables and command-line arguments.

**Using environment variables:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Using command-line arguments:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Configuration file** (`~/.clinerc`):

```json
{
  "apiKey": "your-api-key",
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    }
  }
}
```

### How to Use Cline

```bash
# Begin di interactive session
cline

# One query wit MCP
cline "Calculate the square root of 144 using the calculator"

# Show di tools wey dey available
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** na another AI-powered code editor wey get MCP support.

### Installation

1. Download Windsurf from [codeium.com/windsurf](https://codeium.com/windsurf)
2. Install and create account

### Configuration

Windsurf configuration na through settings UI:

1. Open Settings (Ctrl+, / Cmd+,)
2. Search for "MCP"
3. Click "Edit in settings.json"

**Example configuration:**

```json
{
  "windsurf.mcp.servers": {
    "my-tools": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {}
    }
  },
  "windsurf.mcp.enabled": true
}
```

---

## Transport Types Comparison

Different hosts dey support different transport types:

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (standard input/output): Best for local servers wey host start
**SSE/HTTP**: Best for remote servers or servers wey multiple clients dey share

---

## Common Troubleshooting

### Server no go start

1. **Test the server manually first:**
   ```bash
   # For Python
   python -m your_server_module
   
   # For Node.js
   node /path/to/server/index.js
   ```

2. **Check the command path:**
   - Use absolute path if fit
   - Confirm say executable dey your PATH

3. **Verify dependencies:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Server don connect but tools no dey work

1. **Check server logs** - Most hosts get logging options
2. **Verify tool registration** - Use MCP Inspector to test
3. **Check permissions** - Some tools need access to file/network

### Environment variables no passthrough

- Some hosts dey sanitize environment variables
- Explicitly use `env` field for configuration
- No put sensitive info inside config files (use secrets management)

---

## Security Best Practices

1. **No ever commit API keys** inside configuration files
2. **Use environment variables** for sensitive info
3. **Limit server permissions** to only wetin e need
4. **Review server code** before you allow access to your system
5. **Use allowlists** for file system and network access

---

## Wetin Next

- [3.13 - Debugging with MCP Inspector](../13-mcp-inspector/README.md)
- [3.1 - Create your first MCP server](../01-first-server/README.md)
- [Module 5 - Advanced Topics](../../05-AdvancedTopics/README.md)

---

## Additional Resources

- [Claude Desktop MCP Documentation](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [VS Code MCP Extension](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [MCP Specification - Transports](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Official MCP Servers Registry](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even though we try make e correct, abeg sabi say automated translations fit get errors or mistakes. Di original document wey e dey come from for im own language na di main correct source. If na important info, make person wey sabi do human translation handle am. We no go hold ourselves responsible if person misunderstand or misinterpret tins because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->