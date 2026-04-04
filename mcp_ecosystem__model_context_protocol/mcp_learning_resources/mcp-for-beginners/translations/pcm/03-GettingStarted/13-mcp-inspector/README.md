# Debugging wit MCP Inspector

Di **MCP Inspector** na important debugging tool wey dey allow you test an troubleshoot your MCP servers gidigba without di need for full AI host application. E be like "Postman for MCP" - e get visual interface to send request, see response, an sabi how your server dey behave.

## Why You Go Use MCP Inspector?

When you dey build MCP servers, you go dey face dis kind wahala:

- **"My server dey run at all?"** - Inspector dey show connection status
- **"My tools don register correct?"** - Inspector dey list all di available tools
- **"Wetin be di response format?"** - Inspector dey show full JSON responses
- **"Why dis tool no dey work?"** - Inspector dey show detailed error messages

## Wetin You Need

- Node.js 18+ installed
- npm (e dey come wit Node.js)
- MCP server wey you fit test (see [Module 3.1 - First Server](../01-first-server/README.md))

## Installation

### Option 1: Run wit npx (Recommended for Quick Testing)

```bash
npx @modelcontextprotocol/inspector
```

### Option 2: Install Globally

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Option 3: Add to Your Project

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Add am for `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## How To Connect To Your Server

### stdio Servers (Local Process)

For servers wey dey communicate via standard input/output:

```bash
# Python server
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js server
npx @modelcontextprotocol/inspector node ./build/index.js

# Wit environment variables dem
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP Servers (Network)

For servers wey dey run as HTTP services:

1. Start your server first:
   ```bash
   python server.py  # Server dey run for http://localhost:8080
   ```

2. Launch Inspector an connect:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Inspector Interface Overview

When Inspector open, you go see web interface (normally at `http://localhost:5173`):

```
┌─────────────────────────────────────────────────────────────┐
│  MCP Inspector                              [Connected ✅]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   🔧 Tools  │  │ 📄 Resources│  │ 💬 Prompts  │         │
│  │    (3)      │  │    (2)      │  │    (1)      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📋 Message Log                                       │ │
│  │  ─────────────────────────────────────────────────── │ │
│  │  → initialize                                         │ │
│  │  ← initialized (server info)                          │ │
│  │  → tools/list                                         │ │
│  │  ← tools (3 tools)                                    │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Testing Tools

### How To List Available Tools

1. Click di **Tools** tab
2. Inspector go automatically call `tools/list`
3. You go see all di registered tools wit:
   - Tool name
   - Description
   - Input schema (parameters)

### How To Use A Tool

1. Select one tool from di list
2. Fill di required parameters for di form
3. Click **Run Tool**
4. See di response for di results panel

**Example: Testing calculator tool**

```
Tool: add
Parameters:
  a: 25
  b: 17

Response:
{
  "content": [
    {
      "type": "text",
      "text": "42"
    }
  ]
}
```

### Debugging Tool Errors

When tool no work, Inspector go show:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Common error codes:
| Code | Meaning |
|------|---------|
| -32700 | Parse error (invalid JSON) |
| -32600 | Invalid request |
| -32601 | Method not found |
| -32602 | Invalid params |
| -32603 | Internal error |

---

## Testing Resources

### How To List Resources

1. Click di **Resources** tab
2. Inspector go call `resources/list`
3. You go see:
   - Resource URIs
   - Names an descriptions
   - MIME types

### How To Read Resource

1. Select one resource
2. Click **Read Resource**
3. See di content wey e return

**Example output:**

```
Resource: file:///config/settings.json
Content-Type: application/json

{
  "config": {
    "debug": true,
    "maxConnections": 10
  }
}
```

---

## Testing Prompts

### How To List Prompts

1. Click di **Prompts** tab
2. Inspector go call `prompts/list`
3. You go see available prompt templates

### How To Get Prompt

1. Select one prompt
2. Fill any required arguments
3. Click **Get Prompt**
4. See di rendered prompt messages

---

## Message Log Analysis

Di message log dey show all MCP protocol messages:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Wetin To Look For

- **Request/Response pairs**: Each `→` suppose get matching `←`
- **Error messages**: Look for `"error"` inside responses
- **Timing**: Big gaps fit mean say performance get wahala
- **Protocol version**: Make sure server an client dey agree on version

---

## VS Code Integration

You fit run Inspector direct from VS Code:

### Using launch.json

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug with MCP Inspector",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npx",
      "runtimeArgs": [
        "@modelcontextprotocol/inspector",
        "python",
        "${workspaceFolder}/server.py"
      ],
      "console": "integratedTerminal"
    },
    {
      "name": "Debug SSE Server with Inspector",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "preLaunchTask": "Start MCP Inspector"
    }
  ]
}
```

### Using Tasks

Add to `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npx @modelcontextprotocol/inspector node ${workspaceFolder}/build/index.js",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^$"
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Inspector",
          "endsPattern": "listening"
        }
      }
    }
  ]
}
```

---

## Common Debugging Scenarios

### Scenario 1: Server No Fit Connect

**Symptoms:** Inspector show "Disconnected" or e just hang for "Connecting..."

**Checklist:**
1. ✅ Server command correct?
2. ✅ All dependencies don install?
3. ✅ Server path na absolute or e correct relative path to current directory?
4. ✅ Required environment variables don set?

**Debug steps:**
```bash
# Test di server by hand first
python -c "import your_server_module; print('OK')"

# Check for import wahala
python -m your_server_module 2>&1 | head -20

# Make sure say MCP SDK don install
pip show mcp
```

### Scenario 2: Tools No Show

**Symptoms:** Tools tab empty list

**Possible causes:**
1. Tools no register when server start
2. Server crash after e start
3. `tools/list` handler dey return empty array

**Debug steps:**
1. Check message log for `tools/list` response
2. Add logging to your tool registration code
3. Verify `@mcp.tool()` decorators dey (for Python)

### Scenario 3: Tool Returns Error

**Symptoms:** Tool call return error response

**Debug approach:**
1. Read the error message well well
2. Check say parameter types match schema
3. Add try/catch with detailed error messages
4. Check server logs for stack traces

**Example improved error handling:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Tool kain tin wey dey happen for here
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Scenario 4: Resource Content Empty

**Symptoms:** Resource return but content na empty or null

**Checklist:**
1. ✅ File path or URI correct?
2. ✅ Server get permission to read di resource?
3. ✅ Resource content dey return correctly?

---

## Advanced Inspector Features

### Custom Headers (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Verbose Logging

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Recording Sessions

Inspector fit export message logs for later check:
1. Click **Export Log** for the message panel
2. Save the JSON file
3. Share am with team members to help debug

---

## Best Practices

1. **Test early an often** - Use Inspector as you dey develop, no wait make thing break
2. **Start simple** - Test basic connectivity before you do complex tool calls
3. **Check di schema** - Many error dey come from parameters wey no match type
4. **Read di error messages** - MCP errors usually dey descriptive
5. **Keep Inspector open** - E go help catch problems as you dey develop

---

## Wetin Next

You don complete Module 3: Getting Started! Continue your learning:

- [Module 4: Practical Implementation](../../04-PracticalImplementation/README.md)

---

## Extra Resources

- [MCP Inspector GitHub Repository](https://github.com/modelcontextprotocol/inspector)
- [MCP Specification - Protocol Messages](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even though we dey try make am correct, abeg sabi say automated translation fit get small errors or mistakes. Di original document wey dey dia for im correct language na di real authority. For important mata, e beta make professional human translation take do am. We no go take responsibility for any kind misunderstanding or wrong interpretation wey fit happen from using dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->