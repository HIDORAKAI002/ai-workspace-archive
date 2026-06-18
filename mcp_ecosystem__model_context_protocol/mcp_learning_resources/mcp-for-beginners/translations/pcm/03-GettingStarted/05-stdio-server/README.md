# MCP Server wit stdio Transport

> **⚠️ Important Update**: As of MCP Specification 2025-06-18, di standalone SSE (Server-Sent Events) transport don **deprecated** and dem don change am to "Streamable HTTP" transport. Di current MCP specification get two main transport methods:
> 1. **stdio** - Standard input/output (wey recommend for local servers)
> 2. **Streamable HTTP** - For remote servers way fit use SSE inside
>
> Dis lesson don update to focus on di **stdio transport**, way na di recommend approach for most MCP server implementations.

Di stdio transport dey allow MCP servers to yan with clients through standard input and output streams. Na di most common and recommended transport method for di current MCP specification, e dey give simple and efficient way to build MCP servers wey fit easy to connect with different client applications.

## Overview

Dis lesson go show how to build and use MCP Servers using di stdio transport.

## Learning Objectives

By di time you finish dis lesson, you go fit:

- Build MCP Server using stdio transport.
- Debug MCP Server using di Inspector.
- Use MCP Server inside Visual Studio Code.
- Understand di current MCP transport methods and why stdio na di recommend.

## stdio Transport - How e Dey Work

Di stdio transport na one of two transport types wey MCP support now (2025-11-25). Dis na how e dey work:

- **Simple Communication**: Di server dey read JSON-RPC messages from standard input (`stdin`) and e dey send messages to standard output (`stdout`).
- **Process-based**: Di client go launch di MCP server as subprocess.
- **Message Format**: Messages na individual JSON-RPC requests, notifications, or responses, dem dey separate with newlines.
- **Logging**: Di server fit write UTF-8 strings to standard error (`stderr`) for logging.

### Key Requirements:
- Messages MUST be separate with newlines and NO embedded newlines inside
- Di server NO suppose write anything for `stdout` wey no be valid MCP message
- Di client NO suppose write anything for server `stdin` wey no be valid MCP message

### TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

For di code wey show before:

- We import `Server` class and `StdioServerTransport` from MCP SDK
- We create server instance with basic setup and capabilities
- We create `StdioServerTransport` instance and link am to server, make dem fit yan via stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Make server instance
server = Server("example-server")

@server.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

For di code wey show before we:

- Create server instance using MCP SDK
- Define tools using decorators
- Use di stdio_server context manager to handle di transport

### .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

builder.Services.AddLogging(logging => logging.AddConsole());

var app = builder.Build();
await app.RunAsync();
```

Di main difference wit SSE na say stdio servers:

- No need web server setup or HTTP endpoints
- Client go launch server as subprocess
- Dem go communicate through stdin/stdout streams
- Dem simple pass to build and debug

## Exercise: Create stdio Server

To create our server, make we remember two tins:

- We no go need web server to expose endpoints for connection and messages.
## Lab: Create simple MCP stdio server

For dis lab, we go create simple MCP server using di recommend stdio transport. Dis server go expose tools wey clients fit call using di normal Model Context Protocol.

### Prerequisites

- Python 3.8 or later
- MCP Python SDK: `pip install mcp`
- Basic async programming understanding

Make we start to create our first MCP stdio server:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Setup how we go dey log tins
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Make the server
server = Server("example-stdio-server")

@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool() 
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    # Use stdio transport
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Key differences from the deprecated SSE approach

**Stdio Transport (Current Standard):**
- Simple subprocess model - client dey launch server as child process
- Communication dey happen via stdin/stdout using JSON-RPC messages
- No HTTP server setup needed
- Better performance and security
- Easy to debug and develop

**SSE Transport (Deprecated as of MCP 2025-06-18):**
- Required HTTP server with SSE endpoints
- More complex setup wit web server stuff
- Extra security considerations for HTTP endpoints
- Na Streamable HTTP dem replace am wit for web scenarios

### Create server with stdio transport

To create our stdio server, we need to:

1. **Import libraries we need** - MCP server parts plus stdio transport
2. **Create server instance** - Define server and its capabilities
3. **Define tools** - Add wetin we wan expose
4. **Setup transport** - Configure stdio communication
5. **Run server** - Start am and handle messages

Make we build am step by step:

### Step 1: Create basic stdio server

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Arrange logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Make the server
server = Server("example-stdio-server")

@server.tool()
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

### Step 2: Add more tools

```python
@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool()
def calculate_product(a: int, b: int) -> int:
    """Calculate the product of two numbers"""
    return a * b

@server.tool()
def get_server_info() -> dict:
    """Get information about this MCP server"""
    return {
        "server_name": "example-stdio-server",
        "version": "1.0.0",
        "transport": "stdio",
        "capabilities": ["tools"]
    }
```

### Step 3: Run the server

Save di code as `server.py` and run am from command line:

```bash
python server.py
```

Di server go start and dey wait for input from stdin. E dey talk using JSON-RPC messages over stdio transport.

### Step 4: Test with Inspector

You fit test your server using MCP Inspector:

1. Install Inspector: `npx @modelcontextprotocol/inspector`
2. Run Inspector and point am to your server
3. Test di tools wey you create

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Debug your stdio server

### Using MCP Inspector

MCP Inspector na beta tool to debug and test MCP servers. Dis na how to use am wit your stdio server:

1. **Install Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Run Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Test your server**: Inspector get web interface wey you fit:
   - See server capabilities
   - Test tools with different parameters
   - Watch JSON-RPC messages
   - Debug connection wahala

### Using VS Code

You fit debug your MCP server directly inside VS Code too:

1. Create launch config inside `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug MCP Server",
         "type": "python",
         "request": "launch",
         "program": "server.py",
         "console": "integratedTerminal"
       }
     ]
   }
   ```

2. Set breakpoints for your server code
3. Run debugger and test with Inspector

### Common debugging tips

- Use `stderr` for logging - no write to `stdout` because e reserved for MCP messages
- Make sure all JSON-RPC messages dey newline-separated
- Test simple tools first before you add complex ones
- Use Inspector to check message formats

## Use your stdio server inside VS Code

Once you build your MCP stdio server, you fit connect am with VS Code to use am with Claude or other MCP-compatible clients.

### Configuration

1. **Create MCP config file** at `%APPDATA%\Claude\claude_desktop_config.json` (Windows) or `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

   ```json
   {
     "mcpServers": {
       "example-stdio-server": {
         "command": "python",
         "args": ["path/to/your/server.py"]
       }
     }
   }
   ```

2. **Restart Claude**: Close, then open Claude again to load new config

3. **Test connection**: Start talk with Claude and try your server tools:
   - "Fit greet me using di greeting tool?"
   - "Calculate di sum of 15 and 27"
   - "What be di server info?"

### TypeScript stdio server example

See complete TypeScript example for reference:

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-stdio-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Add tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_greeting",
        description: "Get a personalized greeting",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_greeting") {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${request.params.arguments?.name}! Welcome to MCP stdio server.`,
        },
      ],
    };
  } else {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

### .NET stdio server example

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

var app = builder.Build();
await app.RunAsync();

[McpServerToolType]
public class Tools
{
    [McpServerTool, Description("Get a personalized greeting")]
    public string GetGreeting(string name)
    {
        return $"Hello, {name}! Welcome to MCP stdio server.";
    }

    [McpServerTool, Description("Calculate the sum of two numbers")]
    public int CalculateSum(int a, int b)
    {
        return a + b;
    }
}
```

## Summary

For dis updated lesson, you don learn how to:

- Build MCP servers using current **stdio transport** (di recommend way)
- Understand why SSE transport deprecated and make way for stdio and Streamable HTTP
- Create tools wey MCP clients fit call
- Debug your server wit MCP Inspector
- Integrate your stdio server with VS Code and Claude

Di stdio transport dey provide simpler, more secure, and beta performance way to build MCP servers compared to di deprecated SSE method. E be di recommend transport for most MCP servers as per 2025-06-18 spec.

### .NET

1. Make we create some tools first, for dis we go create file *Tools.cs* wit dis content:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Exercise: Test your stdio server

Now wey you don build your stdio server, make we test am to sure say e dey work well.

### Prerequisites

1. Make sure you get MCP Inspector installed:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Your server code don save (e.g., as `server.py`)

### Test with Inspector

1. **Start Inspector with your server**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Open web interface**: Inspector go open browser window to show your server capabilities.

3. **Test tools**: 
   - Try `get_greeting` tool with different names
   - Test `calculate_sum` tool with different numbers
   - Call `get_server_info` tool to see server metadata

4. **Watch communication**: Inspector dey show JSON-RPC messages wey dey waka between client and server.

### Wetin you suppose see

When your server start well, you go see:
- Server capabilities inside Inspector
- Tools wey you fit test
- JSON-RPC message exchanges wey successful
- Tool responses show for interface

### Common problems and how to fix

**Server no go start:**
- Check say all dependencies install: `pip install mcp`
- Check Python syntax and indentation
- Look error messages for console

**Tools no show:**
- Make sure `@server.tool()` decorators dey
- Check say tool functions dey defined before `main()`
- Make sure server setup correct

**Connection problems:**
- Make sure server dey use stdio transport correct
- Check say no other process dey disturb
- Verify Inspector command syntax

## Assignment

Try build your server wit more capabilities. See [dis page](https://api.chucknorris.io/) to, for example, add tool wey go call API. You fit decide how your server go look. Enjoy :)

## Solution

[Solution](./solution/README.md) Here na possible solution with working code.

## Key Takeaways

Di key things to remember for dis chapter be:

- Stdio transport na di recommended method for local MCP servers.
- Stdio transport dey allow smooth communication between MCP servers and clients using standard input and output streams.
- You fit use Inspector and Visual Studio Code to consume stdio servers directly, wey go make debugging and integration easy.

## Samples 

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python) 

## Additional Resources

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## What's Next

## Next Steps

Now wey you don learn how to build MCP servers wit stdio transport, you fit explore beta topics:

- **Next**: [HTTP Streaming with MCP (Streamable HTTP)](../06-http-streaming/README.md) - Learn about di other transport wey MCP support for remote servers
- **Advanced**: [MCP Security Best Practices](../../02-Security/README.md) - How to add security for your MCP servers
- **Production**: [Deployment Strategies](../09-deployment/README.md) - How to deploy servers for production use

## Additional Resources

- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Official spec
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk) - SDK references for all languages
- [Community Examples](../../06-CommunityContributions/README.md) - More server examples from community

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->