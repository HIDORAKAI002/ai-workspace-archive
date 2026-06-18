# MCP Server with stdio Transport

> **⚠️ အရေးကြီးသတင်း**: MCP Specification 2025-06-18 မှစ၍ standalone SSE (Server-Sent Events) ပို့ဆောင်ပေးမှုသည် **ကျန်ရှိသူမဟုတ်တော့ပဲ** "Streamable HTTP" ပို့ဆောင်မှုဖြင့် အစားထိုးပြီးဖြစ်သည်။ ပစ္စည်း MCP specification မှာ transport များအနက်တော့ အဓိကနှစ်မျိုးရှိသည်။
> 1. **stdio** - အဆင့်မြင့်စနစ် အတွင်းထားသော standard input/output ( ဒေသတွင်း server များအတွက် အကြံပြု )
> 2. **Streamable HTTP** - SSE ကို အတွင်းပိုင်းအသုံးပြုနိုင်သည့် remote servers များအတွက်
>
> ဤသင်ခန်းစာကို stdio transport အပေါ်တွင် အာရုံစိုက်ရန် အပ်ဒိတ်လုပ်ထားပြီး MCP server အများစုအတွက် အကြံပြုထားသောနည်းလမ်း ဖြစ်သည်။

stdio transport သည် MCP server များအား client များနှင့် standard input/output stream များမှတဆင့် ဆက်သွယ်နိုင်စေသည်။ ယခု MCP specification တွင် အများဆုံးအသုံးပြုကြပြီး အကြံပြုသော ပို့ဆောင်ရေးစနစ်ဖြစ်ပြီး ပေါင်းစည်းမှုလွယ်ကူသော MCP server များကို ဖန်တီးရန် လွယ်ကူစေသည်။

## အကျဉ်းချုပ်

ဤသင်ခန်းစာသည် stdio transport ကို အသုံးပြု၍ MCP Server များ ပြုလုပ်ခြင်းနှင့် အသုံးပြုခြင်းကို ဖေါ်ပြသည်။

## သင်ယူရန်ရည်ရွယ်ချက်များ

ဤသင်ခန်းစာအဆုံးတွင်၊ သင်သည်

- stdio transport ကို အသုံးပြု၍ MCP Server တည်ဆောက်နိုင်မည်။
- Inspector ကို အသုံးပြု၍ MCP Server ကို ညှိနှိုင်းစစ်ဆေးနိုင်မည်။
- Visual Studio Code ဖြင့် MCP Server ကို အသုံးပြုနိုင်မည်။
- MCP ပို့ဆောင်စနစ်များကို နားလည်ပြီး stdio ကို အကြံပြုခြင်းရဲ့ အကြောင်းအရာကို သိရှိနိုင်မည်။

## stdio Transport - ၎င်းပြုလုပ်ပုံ

stdio transport သည် ယနေ့ MCP specification (2025-11-25) တွင် ထောက်ခံသည့် transport အမျိုးအစားနှစ်မျိုးထဲမှ တစ်ခုဖြစ်သည်။ ၎င်းသည် အောက်ပါအတိုင်း လည်ပတ်သည်။

- **ရိုးရှင်းသော ဆက်သွယ်မှု** - Server သည် standard input (`stdin`) မှ JSON-RPC စာတိုများကို ဖတ်ပြီး standard output (`stdout`) သို့ စာတိုများ ပို့ပေးသည်။
- **လုပ်ငန်းစဉ်အခြေပြု** - Client အနေဖြင့် MCP server ကို subprocess အဖြစ် စတင်လှုပ်ရှားသည်။
- **စာတိုဖောင်မြူလာ** - စာတိုများမှာ ကွဲပြားသော JSON-RPC တောင်းခံချက်များ၊ ပြောကြားချက်များ သို့မဟုတ် ပြန်ကြားချက်များဖြစ်ပြီး လိုင်းသစ်ဖြင့် ခွဲခြားထားသည်။
- **မှတ်တမ်းပြုခြင်း** - Server သည် မှတ်တမ်းများအတွက် UTF-8 စာသားများကို standard error (`stderr`) သို့ တင်သည်။

### အဓိကလိုအပ်ချက်များ
- စာတိုများသည် လိုင်းသစ်ဖြင့် ခွဲခြားရမည်။ ထိုစာတိုတစ်ခုတွင် လိုင်းသစ်အတွင်း မပါဝင်ရ။
- Server သည် `stdout` တွင် မမှန်ကန်သော MCP စာတို မဟုတ်သော ဘာမှ မရေးရ။
- Client သည် Server ၏ `stdin` သို့ မမှန်ကန်သော MCP စာတို မဟုတ်သော ဘာမှ မရေးရ။

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

အထက်ဖော်ပြခဲ့သည့် ကုဒ်တွင် -

- MCP SDK မှ `Server` class နှင့် `StdioServerTransport` ကို မိတ္တူယူသည်။
- အခြေခံ ဖွဲ့စည်းမှုနှင့် သတ်မှတ်ချက်များဖြင့် server instance တစ်ခု ဖန်တီးသည်။
- `StdioServerTransport` instance တစ်ခု ဖန်တီးပြီး server ကို တိုင်ကြားထား၍ stdin/stdout မှတဆင့် ဆက်သွယ် နိုင်စေရမည်။

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# ဆာဗာ အဖြစ် ပုံစံတစ်ခု ဖန်တီးပါ။
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

အထက်ဖော်ပြသည့် ကုဒ်တွင် -

- MCP SDK တစ်ခုအသုံးပြု၍ server instance တည်ဆောက်သည်။
- decorator များဖြင့် tools များ ထားရှိသည်။
- stdio_server context manager ကို အသုံးပြုပြီး transport ကို ကိုင်တွယ်သည်။

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

SSE နှင့် မတူကွဲပြားချက်မှာ stdio servers တွင် -

- web server သို့ HTTP endpoints တတ်ရန် မလိုအပ်သည်။
- client မှ subprocess အဖြစ် စတင်လှုပ်ရှားသည်။
- stdin/stdout stream များမှတဆင့် ဆက်သွယ်သည်။
- ပေါ့ပါး၍ debug လုပ်ရန်လွယ်ကူသည်။

## လေ့ကျင့်ခန်း - stdio Server ဖန်တီးခြင်း

Server ဖန်တီးချိန်တွင် အောက်ပါအချက်များကို သတိပြုရပါမည် -

- ဆက်သွယ်မှုနှင့် စာတိုများအတွက် endpoint များဖေါ်ပြရန် web server တစ်ခု လိုအပ်သည်။
## အသုံးပြုခြင်း - ရိုးရှင်းသော MCP stdio server ဖန်တီးခြင်း

ဤ လေ့ကျင့်ခန်းတွင် ကျွန်ုပ်တို့ အကြံပြုထားသော stdio transport ကို အသုံးပြုသော ရိုးရှင်းသော MCP server တစ်ခု ဖန်တီးမည်။ ဤ server သည် Model Context Protocol အတိုင်း client များက ခေါ်ဆိုနိုင်သော tools များ ထုတ်ပြန်မည်ဖြစ်သည်။

### လိုအပ်ချက်များ

- Python 3.8 သို့ မက်လွန်ပြီး
- MCP Python SDK: `pip install mcp`
- async programming အခြေခံ နားလည်မှု

အခု ကျွန်တော်တို့ရဲ့ ပထမဆုံး MCP stdio server ကို တည်ဆောက်ကြရအောင် -

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# မှတ်တမ်းတင်ခြင်းကို စီမံခန့်ခွဲပါ
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ဆာဗာကို ဖန်တီးပါ
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
    # stdio သယ်ယူပို့ဆောင်မှုကို အသုံးပြုပါ
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## SSE ရှေ့က API နှင့် ကွဲပြားချက်အဓိက

**Stdio Transport (လက်ရှိ စံ)**
- ရိုးရှင်းသော subprocess နမူနာ - client သည် server ကို ကလောင်လုပ်ထားသည့် child process အဖြစ်လှုပ်ရှား
- stdin/stdout ဖြင့် JSON-RPC စာတိုများ ဆက်သွယ်
- HTTP server setup မလိုအပ်
- ပိုမိုမြန်ဆန်ပြီး လုံခြုံရေးကောင်းမွန်
- debugging နှင့် ဖွံ့ဖြိုးတိုးတက်မှု လွယ်ကူစေသည်

**SSE Transport (MCP 2025-06-18 မှ ပြင်ဆင်ထားသော)**
- HTTP server နှင့် SSE endpoint များ လိုအပ်
- web server infrastructure နဲ့ setup ဆင်ခြေချုပ်တာ ပိုရှုပ်ထွေး
- HTTP endpoint များအတွက် လုံခြုံရေးပိုင်း အာရုံစိုက်ရန်ပို၍လိုအပ်
- ယခု Streamable HTTP ဖြင့် အစားထိုးပြီး

### stdio transport ဖြင့် server ဖန်တီးခြင်း

ပထမဦးဆုံး -

1. **လိုအပ်သည့် library များကို import လုပ်ခြင်း** - MCP server components နှင့် stdio transport လိုအပ်သည်။
2. **server instance တည်ဆောက်ခြင်း** - server ၏ လုပ်ဆောင်နိုင်စွမ်းများ သတ်မှတ်ပါ။
3. **tools သတ်မှတ်ခြင်း** - ထုတ်ပြန်လိုသည့် function များ သတ်မှတ်ပါ။
4. **transport ကို set up လုပ်ခြင်း** - stdio ဆက်သွယ်မှု ပြင်ဆင်ပါ။
5. **server ကို run ဆောင်ရွက်ခြင်း** - စတင်ပြီး စာတိုများကို ကိုင်တွယ်ပါ။

အဆင့်ဆင့် ဖန်တီးကြမည်-

### အဆင့် ၁ - ရိုးရှင်းသော stdio server တစ်ခု ဖန်တီးခြင်း

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# မှတ်တမ်းတင်ခြင်းကိုသတ်မှတ်ပါ
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ဆာဗာကိုဖန်တီးပါ
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

### အဆင့် ၂ - tools များ ပိုမိုထည့်သွင်းခြင်း

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

### အဆင့် ၃ - server run လုပ်ခြင်း

`server.py` အဖြစ် သိမ်းပြီး command line မှ run လုပ်ပါ -

```bash
python server.py
```

server သည် stdin တွင် မှတ်တမ်းတင်ရန် စောင့်ဆိုင်းပြီး JSON-RPC စာတိုများဖြင့် stdio transport မှတဆင့် ဆက်သွယ်နေပါသည်။

### အဆင့် ၄ - Inspector ဖြင့် စမ်းသပ်ခြင်း

MCP Inspector ကို အသုံးပြုပြီး server ကို စမ်းသပ်နိုင်သည် -

1. Inspector ကို install လုပ်ပါ: `npx @modelcontextprotocol/inspector`
2. Inspector ကို ရှင်္ေ့ run လုပ်ပြီး သင့် server ကို ချိတ်ဆက်ပါ။
3. သင့်တည်ဆောက်ထားသော tools များ စမ်းသပ်ပါ။

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## stdio server ကို debug လုပ်ခြင်း

### MCP Inspector ကို အသုံးပြုခြင်း

MCP Inspector သည် MCP server များအတွက် အရေးကြီးသော debug နည်းလမ်းကို ပေးသည်။ stdio server ဖြင့် ပြုလုပ်ပုံ-

1. **Inspector ကို install လုပ်ရန်**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Inspector ကို run ပြုလုပ်ရန်**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **server ကိုစမ်းသပ်ရန်**: Inspector မှာ web interface ပါရှိပြီး -

   - server ၏ လုပ်ဆောင်နိုင်စွမ်းများ ကြည့်ရှုနိုင်သည်။
   - ကွဲပြားသော parameter များဖြင့် tools များ စမ်းသပ်နိုင်သည်။
   - JSON-RPC စာတိုများ ကြည့်ရှုနိုင်သည်။
   - ချိတ်ဆက်မှု ပြဿနာများကို debug လုပ်နိုင်သည်။

### VS Code ဖြင့် debug လုပ်ခြင်း

MCP server ကို Visual Studio Code မှတဆင့် တိုက်ရိုက် debugging ပြုလုပ်နိုင်သည် -

1. `.vscode/launch.json` တွင် launch configuration ဖန်တီးပါ -
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

2. server code တွင် breakpoint များ သတ်မှတ်ပါ။
3. debugger run ပြီး Inspector ဖြင့် စမ်းသပ်ပါ။

### debugging အကြံပြုချက်များ

- `stderr` ကို log များအတွက် သီးသန့်သုံးပါ။ `stdout` သည် MCP message များ အတွက် သီးသန့် အဖြစ်ထားရှိသည်။
- JSON-RPC စာတိုများကို လိုင်းသစ်ဖြင့် ခွဲခြားပေးပါ။
- ရိုးရှင်းသော tools များနဲ့ စမ်းသပ်ပြီးမှ ခက်ခဲသော function များ ထည့်ပါ။
- Inspector ဖြင့် စာတို ဖောင်မြူလာစစ်ဆေးပါ။

## VS Code မှ stdio server ကို အသုံးပြုခြင်း

MCP stdio server ကို တည်ဆောက်ပြီးသောအချိန်တွင် VS Code နှင့် Claude သို့မဟုတ် MCP client များနှင့် ပေါင်းစည်း အသုံးပြုနိုင်သည်။

### ဖွဲ့စည်းခြင်း

1. Windows တွင် `%APPDATA%\Claude\claude_desktop_config.json` သို့မဟုတ် MacOS တွင် `~/Library/Application Support/Claude/claude_desktop_config.json` တွင် MCP configuration ဖိုင် တည်ဆောက်ပါ -

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

2. Claude ကို ပြန်လည်စတင်ပါ - Claude ကို ပိတ်ပြီး ထပ်ဖွင့်ပါ။

3. ချိတ်ဆက်မှု စမ်းသပ်ပါ - Claude နှင့် စကားပြောပြီး သင့် server tools များကို အသုံးပြုပါ -
   - "Can you greet me using the greeting tool?"
   - "Calculate the sum of 15 and 27"
   - "What's the server info?"

### TypeScript stdio server နမူနာ

အောက်က TypeScript ကုဒ် နမူနာအား ပြန်လည်သုံးသပ်နိုင်သည် -

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

// ကိရိယာများ ထည့်ရန်
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

### .NET stdio server နမူနာ

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

## အနှစ်ချုပ်

ဒီနောက်ဆုံးထားသင်ခန်းစာမှာ သင်သည်:

- လက်ရှိ **stdio transport** (အကြံပြုထားသည့်နည်းလမ်းဖြင့်) MCP server များ ဖန်တီးနိုင်ခြင်း
- SSE transport သည် stdio နှင့် Streamable HTTP နဲ့ အစားထိုးခံရခြင်းကို နားလည်ခြင်း
- MCP client များက ခေါ်ဆိုနိုင်မည့် tools များ ဖန်တီးခြင်း
- MCP Inspector အသုံးပြုပြီး server ကို debug ခြင်း
- VS Code နှင့် Claude တွင် stdio server ပေါင်းစည်းအသုံးပြုခြင်း

stdio transport သည် ကျန်ရှိသော SSE နည်းလမ်းထက် ပိုမို ရိုးရှင်း၍ လုံခြုံ၊ မြန်ဆန်သော MCP server ဖန်တီးရန် နည်းလမ်းဖြစ်သည်။ 2025-06-18 စံသတ်မှတ်ချက်အတိုင်း MCP server အများအတွက် အကြံပြုထားသော transport ဖြစ်သည်။

### .NET

1. tool များ တည်ဆောက်ရန် စပြီး *Tools.cs* ဖိုင်သစ် ထားပြုလုပ်မည် -

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## လေ့ကျင့်ခန်း - stdio server ကို စမ်းသပ်ခြင်း

stdio server ကို ဖန်တီးပြီးနောက် အသုံးပြုနိုင်မှုပwürdစမ်းသပ်မှုပြုလုပ်ပါ။

### လိုအပ်ချက်များ

1. MCP Inspector ကိရိယာ ထည့်သွင်းထားသည်စစ်ဆေးပါ -
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. သင့် server ကုဒ် သိမ်းဆည်းပြီးပြီ(ဥပမာ `server.py`) ဖြစ်ရပါမည်။

### Inspector နဲ့ စမ်းသပ်ခြင်း

1. **Inspector ကို သင့် server ဖြင့် စတင်ပါ** -
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Web interface ကို ဖွင့်ရန်** - Inspector မှ server ၏ လုပ်ဆောင်ချက်များ အပြည့်အစုံ ပြသသော browser window ကို ဖွင့်ပြမည်။

3. **tools များ စမ်းသပ်ပါ** -
   - `get_greeting` tool ကို အမည် အမျိုးမျိုးဖြင့် စမ်းသပ်ပါ။
   - `calculate_sum` tool ကို အမျိုးမျိုးသော နံပါတ်များဖြင့် စမ်းသပ်ပါ။
   - `get_server_info` tool ကို ခေါ်ပြီး server metadata ကြည့်ပါ။

4. **ဆက်သွယ်မှု ကို ကြည့်ရှုခြင်း** - Inspector သည် client နှင့် server များအကြား JSON-RPC စာတိုများ ပြန်လည်ပြသသည်။

### ကြည့်ရမည့် အချက်များ

server သေချာစွာ စတင်ပါက သင္မြင်ရမည့် အချက်များမှာ -

- Server ၏ လုပ်ဆောင်နိုင်စွမ်းများ Inspector တွင် ဖော်ပြမှု
- စမ်းသပ်ရန် tools များရရှိ
- JSON-RPC စာတို များအပြန်အလှန်အောင်မြင်မှု
- Interface တွင် tool များ ဖြင့် ပြန်ကြားချက်များ ဖြစ်ပေါ်မှု

### ပုံမှန် ပြဿနာများနှင့် ဖြေရှင်းနည်း

**Server မစတင်နိုင်မှု:**
- dependency များ ထည့်သွင်းပြီးကြောင်း စစ်ဆေးပါ။ `pip install mcp`
- Python syntax နှင့် indentation ပြဿနာများစစ်ဆေးပါ။
- console မှ error message များကို ကြည့်ပါ။

**Tools မပြသခြင်း:**
- `@server.tool()` decorator များ ရှိသေချာစောင့်ကြည့်ပါ။
- tools function များ `main()` မတိုင်မှီ သတ်မှတ်ထားပါ။
- server ဖွဲ့စည်းမှု မှန်ကန်ကြောင်း စစ်ဆေးပါ။

**ချိတ်ဆက်မှု ပြဿနာများ:**
- stdio transport ကို မှန်ကန်စွာ အသုံးပြုထားကြောင်း သေချာစေပါ။
- အခြား subprocess များတစ်မျိုးကို တားဆီးထားခြင်း မရှိကြောင်း စစ်ဆေးပါ။
- Inspector command syntax မှန်ကန်မှုကို ပြန်လည်စစ်ဆေးပါ။

## တာဝန်ပေးအပ်ချက်

သင့် server ကို ပိုမိုစွမ်းဆောင်ရည်များဖြင့် ဖန်တီးကြည့်ပါ။ ပရိုဂရမ်နည်းလမ်း တစ်ခုခု သို့မဟုတ် API ကို ခေါ်ယူသော tool တစ်ခု ဖန်တီးနိုင်ပါသည်။ [ဤစာမျက်နှာ](https://api.chucknorris.io/) ကို ကြည့်ပြီး စိတ်ကြိုက်ဖန်တီးပါ။ ပျော်ရွှင်စွာလုပ်ဆောင်ပါ :)

## ဖြေရှင်းနည်း

[Solution](./solution/README.md) ၎င်းတွင် လုပ်ဆောင်မှုပုံစံ သေချာသော ကုဒ် နမူနာ ပါရှိသည်။

## အဓိကယူဆချက်များ

ဤအခန်းမှ အဓိက ယူဆချက်များမှာ -

- stdio transport သည် ဒေသရှိ MCP server များအတွက် အကြံပြုထားသည့် ပို့ဆောင်ရေးနည်းလမ်းဖြစ်သည်။
- stdio transport သည် MCP server များနှင့် client များအကြား standard input/output stream များဖြင့် အဆင်ပြေစွာ ဆက်သွယ်နိုင်စေသည်။
- Inspector နှင့် Visual Studio Code ကို အသုံးပြု၍ stdio servers များကို တိုက်ရိုက် အသုံးပြု၍ debugging နှင့် ပေါင်းစည်းမှု လွယ်ကူစေသည်။

## နမူနာများ

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)

## နောက်ထပ် အရင်းအမြစ်များ

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## နောက်တစ်ဆင့်

## နောက်တစ်ဆင့်

stdio transport ဖြင့် MCP server များ ဖန်တီးသင်ယူပြီးနောက်၊ တိုးတက်ပြီး ခက်ခဲသောခေါင်းစဉ်များကို လေ့လာနိုင်ပါသည် -

- **နောက်တစ်ဆင့်**: [HTTP Streaming with MCP (Streamable HTTP)](../06-http-streaming/README.md) - remote server များအတွက် အခြားအထောက်ခံ transport နည်းလမ်းကို ရယူပါ
- **အဆင့်မြင့်**: [MCP Security Best Practices](../../02-Security/README.md) - MCP server များတွင် လုံခြုံရေး ကိုအကောင်အထည်ဖော်ခြင်း
- **ထုတ်လုပ်ရေး**: [Deployment Strategies](../09-deployment/README.md) - စက်ရုံအသုံးပြုမှုအတွက် server များ တပ်ဆင်ခြင်း

## နောက်ထပ် အရင်းအမြစ်များ

- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - တရားဝင် စံနှုန်းစာတမ်း
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk) - ဘာသာစကားအားလုံးအတွက် SDK ကိုးကားစာတမ်းများ
- [Community Examples](../../06-CommunityContributions/README.md) - လူထုမှ ပံ့ပိုးမှုများဖြင့် ထပ်မံထုတ်ထားသော server နမူနာများ

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->