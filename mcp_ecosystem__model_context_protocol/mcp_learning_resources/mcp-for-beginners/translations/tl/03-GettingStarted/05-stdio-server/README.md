# MCP Server gamit ang stdio Transport

> **⚠️ Mahalagang Update**: Simula sa MCP Specification 2025-06-18, ang standalone SSE (Server-Sent Events) transport ay **deprecated** na at pinalitan ng "Streamable HTTP" transport. Ang kasalukuyang MCP specification ay nagtatakda ng dalawang pangunahing mekanismo ng transport:
> 1. **stdio** - Standard input/output (inirerekomenda para sa lokal na mga server)
> 2. **Streamable HTTP** - Para sa mga remote server na maaaring gumamit ng SSE internally
>
> Ang leksyong ito ay na-update upang tutukan ang **stdio transport**, na inirerekomendang paraan para sa karamihan ng MCP server implementations.

Pinahihintulutan ng stdio transport ang mga MCP server na makipag-usap sa mga kliyente sa pamamagitan ng mga standard input at output streams. Ito ang pinaka-karaniwang ginagamit at inirerekomendang mekanismo ng transport sa kasalukuyang MCP specification, na nag-aalok ng isang simple at epektibong paraan upang makabuo ng MCP server na madaling ma-integrate sa iba't ibang aplikasyon ng kliyente.

## Pangkalahatang-ideya

Tinatalakay ng leksyon na ito kung paano gumawa at gumamit ng MCP Servers gamit ang stdio transport.

## Mga Layunin sa Pag-aaral

Sa pagtatapos ng leksyon na ito, magagawa mong:

- Bumuo ng MCP Server gamit ang stdio transport.
- Mag-debug ng MCP Server gamit ang Inspector.
- Gumamit ng MCP Server gamit ang Visual Studio Code.
- Maunawaan ang kasalukuyang mekanismo ng MCP transport at kung bakit inirerekomenda ang stdio.


## stdio Transport - Paano ito Gumagana

Ang stdio transport ay isa sa dalawang suportadong uri ng transport sa kasalukuyang MCP specification (2025-11-25). Ganito ang paraan ng pag-andar nito:

- **Simple na Komunikasyon**: Binabasa ng server ang mga mensaheng JSON-RPC mula sa standard input (`stdin`) at nagpapadala ng mga mensahe sa standard output (`stdout`).
- **Process-based**: Pinapalabas ng client ang MCP server bilang isang subprocess.
- **Format ng Mensahe**: Ang mga mensahe ay indibidwal na mga kahilingan, notifications, o tugon ng JSON-RPC, na pinaghihiwalay ng mga bagong linya.
- **Logging**: Maaaring magsulat ang server ng mga UTF-8 strings sa standard error (`stderr`) para sa layunin ng pag-log.

### Mga Pangunahing Kinakailangan:
- Ang mga mensahe ay DAPAT paghiwalayin ng mga bagong linya at HINDI DAPAT maglaman ng nakatagong mga bagong linya
- HUWAG magsulat ang server ng anumang bagay sa `stdout` na hindi wastong mensahe ng MCP
- HUWAG magsulat ang client ng anumang bagay sa `stdin` ng server na hindi wastong mensahe ng MCP

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

Sa code na nasa itaas:

- Ina-import natin ang `Server` class at `StdioServerTransport` mula sa MCP SDK
- Gumagawa tayo ng server instance na may basic na configuration at kakayahan
- Gumagawa tayo ng `StdioServerTransport` instance at ikinokonekta ang server dito, pinapayagan ang komunikasyon sa stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Lumikha ng server instance
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

Sa code na nasa itaas ay:

- Gumagawa ng server instance gamit ang MCP SDK
- Nagde-define ng mga tools gamit ang mga decorators
- Ginagamit ang stdio_server context manager para hawakan ang transport

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

Ang pangunahing pagkakaiba mula sa SSE ay ang mga stdio server:

- Hindi nangangailangan ng setup ng web server o HTTP endpoints
- Pinapalabas bilang subprocesses ng client
- Nakikipag-ugnayan sa pamamagitan ng stdin/stdout streams
- Mas simple i-implement at i-debug

## Ehersisyo: Paglikha ng stdio Server

Para gumawa ng aming server, kailangan naming tandaan ang dalawang bagay:

- Kailangan naming gumamit ng web server upang ipakita ang mga endpoints para sa koneksyon at mga mensahe.
## Lab: Paglikha ng simpleng MCP stdio server

Sa lab na ito, gagawa tayo ng simpleng MCP server gamit ang inirerekomendang stdio transport. Ang server na ito ay magbibigay ng mga tools na maaaring tawagin ng mga kliyente gamit ang standard Model Context Protocol.

### Mga Kinakailangan

- Python 3.8 pataas
- MCP Python SDK: `pip install mcp`
- Pangunahing kaalaman sa async na programming

Magsimula tayo sa paggawa ng unang MCP stdio server:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# I-configure ang pag-log
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Lumikha ng server
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
    # Gamitin ang stdio transport
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Pangunahing mga pagkakaiba mula sa deprecated na SSE approach

**Stdio Transport (Kasalukuyang Standard):**
- Simpleng subprocess model - pina-palabas ng client ang server bilang child process
- Komunikasyon sa pamamagitan ng stdin/stdout gamit ang mga mensahe ng JSON-RPC
- Hindi kailangan ng HTTP server setup
- Mas mahusay na performance at seguridad
- Mas madali sa pag-debug at pag-develop

**SSE Transport (Deprecated simula MCP 2025-06-18):**
- Nangangailangan ng HTTP server na may SSE endpoints
- Mas komplikadong setup na may web server infrastructure
- Karagdagang mga isyu sa seguridad para sa HTTP endpoints
- Pinalitan na ng Streamable HTTP para sa web-based na mga senaryo

### Paglikha ng server gamit ang stdio transport

Para gawin ang stdio server natin, kailangan nating:

1. **I-import ang mga kinakailangang library** - Kailangan natin ang MCP server components at stdio transport
2. **Gumawa ng server instance** - I-define ang server kasama ang mga kakayahan nito
3. **I-define ang mga tools** - Idagdag ang mga nais nating functionality na i-expose
4. **I-set up ang transport** - I-configure ang stdio communication
5. **Patakbuhin ang server** - Simulan ang server at hawakan ang mga mensahe

Gawin natin ito step by step:

### Hakbang 1: Gumawa ng basic na stdio server

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# I-configure ang pag-log
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Gawin ang server
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

### Hakbang 2: Magdagdag ng mga tools

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

### Hakbang 3: Patakbuhin ang server

I-save ang code bilang `server.py` at patakbuhin ito mula sa command line:

```bash
python server.py
```

Magsisimula ang server at maghihintay ng input mula sa stdin. Nakikipag-ugnayan ito gamit ang mga JSON-RPC message sa stdio transport.

### Hakbang 4: Pagsubok gamit ang Inspector

Maaari mong subukan ang iyo server gamit ang MCP Inspector:

1. I-install ang Inspector: `npx @modelcontextprotocol/inspector`
2. Patakbuhin ang Inspector at ituro ito sa iyong server
3. Subukan ang mga tools na iyong ginawa

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Pag-de-debug ng iyong stdio server

### Paggamit ng MCP Inspector

Ang MCP Inspector ay mahalagang tool para sa pag-de-debug at pagsubok ng MCP server. Narito kung paano ito gamitin kasama ang iyong stdio server:

1. **I-install ang Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Patakbuhin ang Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Subukan ang iyong server**: Nagbibigay ang Inspector ng web interface kung saan maaari kang:
   - Tingnan ang kakayahan ng server
   - Subukan ang mga tools gamit ang iba't ibang parameters
   - I-monitor ang mga JSON-RPC message
   - Mag-debug ng connection issues

### Paggamit ng VS Code

Maaari mo ring i-debug ang MCP server diretso sa VS Code:

1. Gumawa ng launch configuration sa `.vscode/launch.json`:
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

2. Mag-set ng breakpoints sa iyong server code
3. Patakbuhin ang debugger at subukan gamit ang Inspector

### Mga karaniwang tips sa pag-debug

- Gamitin ang `stderr` para sa pag-log - huwag magsulat sa `stdout` dahil ito ay nakalaan para sa mga MCP messages
- Siguraduhing lahat ng JSON-RPC messages ay pinaghiwalay ng bagong linya
- Subukan muna gamit ang mga simpleng tools bago magdagdag ng komplikadong functionality
- Gamitin ang Inspector para beripikahin ang format ng mga mensahe

## Paggamit ng iyong stdio server sa VS Code

Kapag nagawa mo na ang MCP stdio server, maaari mo itong i-integrate sa VS Code upang magamit kasama ang Claude o iba pang MCP-compatible na kliyente.

### Configuration

1. **Gumawa ng MCP configuration file** sa `%APPDATA%\Claude\claude_desktop_config.json` (Windows) o `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **I-restart ang Claude**: Isara at buksan muli ang Claude upang ma-load ang bagong server configuration.

3. **Subukan ang koneksyon**: Magsimula ng pag-uusap kay Claude at subukang gamitin ang mga tool ng iyong server:
   - "Can you greet me using the greeting tool?"
   - "Calculate the sum of 15 and 27"
   - "What's the server info?"

### Halimbawa ng TypeScript stdio server

Narito ang kumpletong halimbawa ng TypeScript para sa sanggunian:

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

// Magdagdag ng mga kagamitan
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

### Halimbawa ng .NET stdio server

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

## Buod

Sa na-update na leksyong ito, natutunan mo kung paano:

- Bumuo ng MCP servers gamit ang kasalukuyang **stdio transport** (inirerekomenda na paraan)
- Maunawaan kung bakit na-deprecate ang SSE transport pinalitan ng stdio at Streamable HTTP
- Gumawa ng mga tools na maaaring tawagin ng MCP clients
- Mag-debug ng server gamit ang MCP Inspector
- I-integrate ang stdio server mo sa VS Code at Claude

Ang stdio transport ay nagbibigay ng mas simple, mas ligtas, at mas mahusay na paraan sa pagbuo ng MCP server kumpara sa deprecated na SSE approach. Ito ang inirerekomendang transport para sa karamihan ng MCP server implementations simula sa 2025-06-18 specification.


### .NET

1. Gumawa muna tayo ng ilang tools, para dito gagawa tayo ng file na *Tools.cs* na may sumusunod na nilalaman:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Ehersisyo: Pagsubok ng iyong stdio server

Ngayon na nagawa mo na ang iyong stdio server, subukan natin ito upang matiyak na gumagana ito ng tama.

### Mga Kinakailangan

1. Siguraduhing naka-install ang MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Ang iyong server code ay dapat naka-save (halimbawa, bilang `server.py`)

### Pagsubok gamit ang Inspector

1. **Simulan ang Inspector kasama ang iyong server**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Buksan ang web interface**: Magbubukas ang Inspector ng browser window na nagpapakita ng kakayahan ng iyong server.

3. **Subukan ang mga tools**:
   - Subukan ang `get_greeting` tool gamit ang iba't ibang pangalan
   - Subukan ang `calculate_sum` tool gamit ang iba't ibang numero
   - Tawagin ang `get_server_info` tool para makita ang metadata ng server

4. **I-monitor ang komunikasyon**: Ipinapakita ng Inspector ang mga JSON-RPC message na nagpapalitan sa pagitan ng client at server.

### Ano ang dapat mong makita

Kapag tama ang pagsisimula ng iyong server, dapat mong makita:
- Nakalista ang kakayahan ng server sa Inspector
- Mga tools na available para subukan
- Matagumpay na pagpapalitan ng mga JSON-RPC message
- Output ng mga tool na ipinapakita sa interface

### Mga karaniwang isyu at solusyon

**Hindi nagsisimula ang server:**
- Siguraduhing naka-install ang lahat ng dependencies: `pip install mcp`
- I-verify ang Python syntax at indentation
- Hanapin ang mga error message sa console

**Hindi lumalabas ang mga tools:**
- Siguraduhing nandito ang `@server.tool()` decorators
- Tiyaking nakadefine ang mga functions ng tool bago ang `main()`
- I-verify na tama ang configuration ng server

**Mga isyu sa koneksyon:**
- Siguraduhing tama ang paggamit ng stdio transport ng server
- Tingnan kung may ibang proseso na nakakahadlang
- Beripikahin ang syntax ng Inspector command

## Assignment

Subukan mong palawakin ang server mo ng mas maraming kakayahan. Tingnan ang [pahinang ito](https://api.chucknorris.io/) para, halimbawa, gumawa ng tool na tumatawag ng API. Ikaw ang magdedesisyon kung paano dapat ang itsura ng iyong server. Mag-enjoy :)

## Solusyon

[Solusyon](./solution/README.md) Narito ang isang posibleng solusyon na may gumaganang code.

## Mga Mahahalagang Punto

Ang mga mahahalagang punto mula sa kabanatang ito ay:

- Ang stdio transport ang inirerekomendang mekanismo para sa lokal na MCP servers.
- Pinahihintulutan ng stdio transport ang tuloy-tuloy na komunikasyon sa pagitan ng MCP servers at mga kliyente gamit ang standard input at output streams.
- Maaari mong gamitin ang parehong Inspector at Visual Studio Code upang direktang gamitin ang stdio servers, na nagpapadali sa pag-debug at integration.

## Mga Halimbawa

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python) 

## Karagdagang Mga Mapagkukunan

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Ano ang Susunod

## Mga Susunod na Hakbang

Ngayon na natutunan mo na kung paano gumawa ng MCP servers gamit ang stdio transport, maaari kang mag-explore ng mas advanced na mga paksa:

- **Susunod**: [HTTP Streaming gamit ang MCP (Streamable HTTP)](../06-http-streaming/README.md) - Alamin ang isa pang suportadong mekanismo ng transport para sa remote servers
- **Advanced**: [MCP Security Best Practices](../../02-Security/README.md) - Magpatupad ng seguridad sa iyong MCP servers
- **Production**: [Deployment Strategies](../09-deployment/README.md) - I-deploy ang iyong mga server para sa production use

## Karagdagang Mga Mapagkukunan

- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Opisyal na specification
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk) - SDK references para sa lahat ng mga wika
- [Mga Halimbawa mula sa Komunidad](../../06-CommunityContributions/README.md) - Karagdagang mga halimbawa ng server mula sa komunidad

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->