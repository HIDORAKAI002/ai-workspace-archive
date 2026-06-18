# MCP സെർവർ stdio ട്രാൻസ്പോർട്ടുമായി

> **⚠️ പ്രധാന പുതുക്കൽ**: MCP സ്പെസിഫിക്കേഷൻ 2025-06-18 മുതൽ, സ്വതന്ത്ര SSE (Server-Sent Events) ട്രാൻസ്പോർട്ട് **ഡിപ്രീകേറ്റ്** ചെയ്ത് "Streamable HTTP" ട്രാൻസ്പോർട്ട്ചെയ്തിട്ടുണ്ട്. നിലവിലെ MCP സ്പെസിഫിക്കേഷൻ രണ്ട് പ്രധാന ട്രാൻസ്പോർട്ട് മെക്കാനിസങ്ങൾ നിർവചിക്കുന്നു:  
> 1. **stdio** - സ്റ്റാൻഡേർഡ് ഇൻപുട്ട്/ഔട്ട്പുട്ട് (ലൊക്കൽ സെർവറുകള്‍ക്കായി ശുപാർശ ചെയ്തിരിക്കുന്നു)  
> 2. **Streamable HTTP** - SSE ഇൻറേണലായി ഉപയോഗിക്കുന്ന റിമോട്ട് സെർവർസിനായി  
>  
> ഈ പാഠം **stdio ട്രാൻസ്പോർട്ട്**-ൽ കേന്ദ്രീകരിച്ചിരിക്കുന്നു, ഇത് MCP സെർവർ അന്വയത്തിലെ ശുപാർശ ചെയ്ത രീതിയാണ്.

stdio ട്രാൻസ്പോർട്ട് MCP സെർവറുകൾ ക്ലയന്റുകളുമായി സ്റ്റാൻഡേർഡ് ഇൻപുട്ട്, ഔട്ട്പുട്ട് സ്റ്റ്രീമുകൾ മുഖേന സംവദിക്കാൻ അനുവദിക്കുന്നു. ഇത് ഇപ്പോഴത്തെ MCP സ്പെസിഫിക്കേഷൻ പ്രകാരം ഏറ്റവും സാധാരണവും ശുപാർശചെയ്തും ആയ ട്രാൻസ്പോർട്ട് രീതിയാണ്, ഇത് വിവിധ ക്ലയന്റ് ആപ്ലിക്കേഷനുകളുമായി എളുപ്പത്തിൽ സംയോജിപ്പിക്കാവുന്ന ഒരു ലളിതവും കാര്യക്ഷമവുമായ MCP സെർവർ നിർമ്മാണ മാർഗം നൽകുന്നു.

## അവലോകനം

stdio ട്രാൻസ്പോർട്ട് ഉപയോഗിച്ച് MCP സെർവർ നിർമ്മിക്കുകയും ഉപയോഗിക്കുകയുമെച്ചുള്ള മാർഗ്ഗങ്ങൾ ഈ പാഠത്തിൽ ഉൾക്കൊള്ളുന്നു.

## പഠന ലക്ഷ്യങ്ങൾ

ഈ പാഠം അവസാനിപ്പിച്ചതിനു ശേഷം നിങ്ങൾക്ക് കഴിയും:

- stdio ട്രാൻസ്പോർട്ട് ഉപയോഗിച്ച് MCP സെർവർ നിർമ്മിക്കുക.
- MCP സെർവർ ഇൻസ്പെക്റ്റർ ഉപയോഗിച്ച് ഡീബഗ് ചെയ്യുക.
- Visual Studio Code ഉപയോഗിച്ച് MCP സെർവർ ഉപഭോഗം നടത്തുക.
- MCP ട്രാൻസ്പോർട്ട് മാർഗ്ഗങ്ങൾ അറിയുക; stdio ശുപാർശ ചെയ്യപ്പെടുന്ന കാരണം മനസിലാക്കുക.

## stdio ട്രാൻസ്പോർട്ട് - ഇത് എങ്ങനെയാണ് പ്രവർത്തിക്കുന്നത്

stdio ട്രാൻസ്പോർട്ട് 2025-11-25 MCP സ്പെസിഫിക്കേഷനിലെ രണ്ട് പിന്തുണയ്ക്കപ്പെട്ട ട്രാൻസ്പോർട്ട് തരംകളിൽ ഒന്നാണ്. പ്രവര്‍ത്തനം ഇങ്ങനെ:

- **ലളിതമായ സംവാദം**: സെർവർ JSON-RPC സന്ദേശങ്ങൾ സ്റ്റാൻഡേർഡ് ഇൻപുട്ട് (`stdin`)-ൽ നിന്നു വായിക്കുകയും സ്റ്റാൻഡേർഡ് ഔട്ട്പുട്ട് (`stdout`) വഴി സന്ദേശങ്ങൾ അയയ്ക്കുകയും ചെയ്യുന്നു.
- **പ്രോസസ്-ഭാഷ്യം**: ക്ലയന്റ് MCP സെർവർ subprocess ആയി ആരംഭിക്കുന്നു.
- **സന്ദേശ ഫോർമാറ്റ്**: സന്ദേശങ്ങൾ ഒരൊറ്റ JSON-RPC അഭ്യർത്ഥനകൾ, അറിയിപ്പുകൾ, അല്ലെങ്കിൽ പ്രതികരണങ്ങൾ, ന്യൂലൈൻ ലഭിക്കുന്ന delimiter ഉപയോഗിച്ച് ലഭ്യമാണ്.
- **ലോഗിംഗ്**: സെർവർ UTF-8 സ്ട്രിംഗുകൾ സ്റ്റാൻഡേർഡ് എറർ (`stderr`) ൽ ലോഗുകൾക്കായി എഴുതാം.

### പ്രധാന ആവശ്യങ്ങൾ:
- സന്ദേശങ്ങൾ newline ഉപയോഗിച്ച് വേര്‍തിരിക്കണം, അതിനകം embedded newline ഉണ്ടായിരിക്കരുത്
- സെർവർ `stdout` ലേക്ക് സാധുവായ MCP സന്ദേശമല്ലാത്തതെന്തും എഴുതരുത്
- ക്ലയന്റ് സെർവറിന്റെ `stdin` ലേക്ക് സാധുവായ MCP സന്ദേശമല്ലാത്തതെന്തും എഴുതരുത്

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

മുകളിലുള്ള കോഡിൽ:

- MCP SDK-യിൽ നിന്നു `Server` ക്ലാസ്, `StdioServerTransport` ഇറക്കുമതി ചെയ്യുന്നു
- അടിസ്ഥാന കോൺഫിഗറേഷനുവരെ ശേഷിക്കുന്നത് കൊണ്ട് സെർവർ ഉദാഹരണം സൃഷ്ടിക്കുന്നു
- `StdioServerTransport` ഉദാഹരണം സൃഷ്ടിക്കുകയും സെർവർ stdin/stdout മുഖേന ബന്ധിപ്പിക്കുകയും ചെയ്യുന്നു

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# സെർവർ ഇൻസ്റ്റൻസ്സ് സൃഷ്‌ടിക്കുക
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

മുകളിലെ കോഡിൽ:

- MCP SDK ഉപയോഗിച്ച് സെർവർ ഉദാഹരണം സൃഷ്ടിക്കുന്നു
- ഡെകറേറ്ററുകൾ ഉപയോഗിച്ച് ടൂൾസ് നിർവചിക്കുന്നു
- stdio_server context manager ഉപയോഗിച്ചു ട്രാൻസ്പോർട്ട് കൈകാര്യം ചെയ്യുന്നു

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

SSE-നോടുള്ള പ്രധാന വ്യത്യാസങ്ങൾ stdio സെർവറുകൾ താഴെപ്പറയുന്നതാണ്:

- വെബ് സെർവർ സെറ്റപ്പ് അല്ലെങ്കിൽ HTTP എൻഡ്‌പോയിന്റുകൾ ആവശ്യമില്ല
- ക്ലയന്റ് കേസ്ദ്വారా subprocess ആയി ആരംഭിക്കുന്നു
- stdin/stdout സ്ട്രീംസ് മുഖേന സംവദിക്കുന്നു
- നടപ്പിലാക്കാനും ഡീബഗ് ചെയ്യാനും ലളിതം

## എക്സർസൈസ്: stdio സെർവർ സൃഷ്ടിക്കൽ

സെർവർ സൃഷ്ടിക്കുന്നതിൽ രണ്ട് കാര്യങ്ങൾ ശ്രദ്ധിക്കാൻ:

- കണക്ഷനും സന്ദേശങ്ങൾക്കും വെബ് സെർവർ എൻഡ്‌പോയിന്റുകൾ ക്ഷണിക്കുന്നതുണ്ട്.

## ലാബ്: ലളിതമായ MCP stdio സെർവർ സൃഷ്ടിക്കൽ

ഈ ലാബിൽ, ശുപാർശ ചെയ്ത stdio ട്രാൻസ്പോർട്ട് ഉപയോഗിച്ച് ലളിതമായ MCP സെർവർ സൃഷ്ടിക്കുന്നു. ഈ സെർവർ നിശ്ചിത ടൂളുകൾ പ്രദാനം ചെയ്യും, മനുഷ്യർ സാധാരണ MCP പ്രോട്ടോക്കോൾ വഴി ആവിഷ്‌കരിക്കാവുന്നതാണ്.

### മുൻ‌റെക്കുറിപ്പുകൾ

- Python 3.8 അല്ലെങ്കിൽ അതിനു മുകളിലേക്ക്
- MCP Python SDK: `pip install mcp`
- അസിങ്ക്രോൺ പ്രോഗ്രാമിങ്ങ് അടിസ്ഥാന അറിവ്

നമുക്ക് ആദ്യ MCP stdio സെർവർ നിർമിക്കാൻ തുടങ്ങിയിടാം:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# ലോഗിംഗ് ക്രമീകരിക്കുക
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# സെർവർ സൃഷ്‌ടിക്കുക
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
    # സ്റ്റിഡിയോ ട്രാൻസ്പോർട്ട് ഉപയോഗിക്കുക
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## ഡിപ്രീകേറ്റ് ചെയ്ത SSE അവതൃത്യത്തിലുള്ള പ്രധാന വ്യത്യാസങ്ങൾ

**stdio ട്രാൻസ്പോർട്ട് (നിലവിലെ സ്റ്റാൻഡേർഡ്):**
- ലളിതമായ subprocess മോഡൽ - ക്ലയന്റ് subprocess ആയി സെർവർ ആരംഭിക്കുന്നു
- stdin/stdout വഴി JSON-RPC സന്ദേശങ്ങൾ കൈമാറുന്നു
- HTTP സെർവർ സെറ്റപ്പ് ആവശ്യമില്ല
- മികച്ച പ്രകടനം, സുരക്ഷ
- എളുപ്പത്തിൽ ഡീബഗ് ചെയ്യാനും വികസിപ്പിക്കാനും കഴിയും

**SSE ട്രാൻസ്പോർട്ട് (MCP 2025-06-18 മുതൽ ഡിപ്രീകേറ്റ്):**
- SSE എൻഡ്‌പോയിന്റുകൾ ഉള്ള HTTP സെർവർ ആവശ്യപ്പെട്ടിരുന്നു
- വെബ് സെർവർ ഇൻഫ്രാസ്ട്രക്ചർ കൊണ്ട് കൂടുതൽ സങ്കീർണമായ സെറ്റപ്പ്
- HTTP-യുടെ സുരക്ഷാ പരിഗണനകൾ കൂടി ആയിരുന്നു
- ഇപ്പോൾ Streamable HTTP കൊണ്ട് മാറ്റിസ്ഥാപിച്ചു

### stdio ട്രാൻസ്പോർട്ട് ഉപയോഗിച്ച് സെർവർ സൃഷ്ടിക്കൽ

stdio സെർവർ സൃഷ്ടിക്കാൻ:

1. **ആവശ്യമായ ലൈബ്രറികൾ ഇറക്കുമതി ചെയ്യുക** - MCP സെർവർ ഘടകങ്ങൾ, stdio ട്രാൻസ്പോർട്ട്
2. **സെർവർ ഉദാഹരണം സൃഷ്ടിക്കുക** - സെർവർ കഴിവുകൾ നിർവചിക്കുക
3. **ടൂൾസ് നിർവ്വചിക്കുക** - നൽകേണ്ട ഫംഗ്ഷനാലിറ്റി ചേർക്കുക
4. **ട്രാൻസ്പോർട്ട് സജ്ജമാക്കുക** - stdio സംവാദം ക്രമപ്പെടുത്തുക
5. **സെർവർ ഓടിക്കുക** - സെർവർ ആരംഭിച്ച് സന്ദേശങ്ങൾ കൈകാര്യം ചെയ്യുക

നാം ഘട്ടം ഘട്ടമായി നിർമ്മിക്കാം:

### ഘട്ടം 1: ലളിതമായ stdio സെർവർ സൃഷ്ടിക്കുക

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# ലോഗിംഗ് ക്രമീകരിക്കുക
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# സെർവർ സൃഷ്ടിക്കുക
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

### ഘട്ടം 2: കൂടുതൽ ടൂൾസ് ചേർക്കുക

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

### ഘട്ടം 3: സെർവർ ഓടിക്കുക

കോടി `server.py` എന്ന ഫയലായി സേവ് ചെയ്ത് കമാൻഡ് ലൈൻ വഴി ഓടിക്കുക:

```bash
python server.py
```

സെർവർ ആരംഭിച്ച് stdin-യിൽ നിന്ന് ഇൻപുട്ട് കാത്തിരിക്കും. stdio ട്രാൻസ്പോർട്ട് വഴി JSON-RPC സന്ദേശങ്ങൾ ഉപയോഗിച്ച് സംവദിക്കുന്നു.

### ഘട്ടം 4: ഇൻസ്പെക്ടർ ഉപയോഗിച്ചുള്ള പരിശോധന

നിങ്ങളുടെ MCP സെർവർ ഇൻസ്പെക്ടർ ഉപയോഗിച്ച് പരിശോധിക്കാം:

1. ഇൻസ്പെക്ടർ ഇൻസ്റ്റാൾ ചെയ്യുക: `npx @modelcontextprotocol/inspector`
2. ഇൻസ്പെക്ടർ റൺ ചെയ്യുകയും സെർവറിലേക്ക് പോയിന്റുചെയ്യുകയും ചെയ്യുക
3. നിങ്ങൾ സൃഷ്ടിച്ച ടൂളുകൾ പരീക്ഷിക്കുക

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## stdio സെർവർ ഡീബഗിംഗ്

### MCP ഇൻസ്പെക്ടർ ഉപയോഗിച്ച്

MCP ഇൻസ്പെക്ടർ MCP സെർവറുകൾ ഡീബഗ് ചെയ്യാനും പരീക്ഷിക്കാനും-valuables ആയ ഉപകരണം ആണ്. stdio സെർവറിനോട് ഇത് എങ്ങിനെയാണ് ഉപയോഗിക്കുന്നത്:

1. **ഇൻസ്പെക്ടർ ഇൻസ്റ്റാൾ ചെയ്യുക**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **ഇൻസ്പെക്ടർ ഓടിക്കുക**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **സെർവർ പരീക്ഷിക്കുക**: ഇൻസ്പെക്ടർ ഒരു വെബ് ഇന്റർഫേസ് നൽകുന്നു, ഇവിടെ നിങ്ങൾക്ക്:  
   - സെർവർ കഴിവുകൾ കാണാം  
   - വിവിധ പാരാമീറ്ററുകളിൽ ടൂൾസ് പരീക്ഷിയ്ക്കാം  
   - JSON-RPC സന്ദേശങ്ങൾ നിരീക്ഷിയ്ക്കാം  
   - കണക്ഷൻ പ്രശ്നങ്ങൾ ഡീബഗ് ചെയ്യാം  

### VS Code ഉപയോഗിച്ച്

MCP സെർവർ നേരിട്ട് VS Code-ൽ ഡീബഗ് ചെയ്യാം:

1. `.vscode/launch.json`-ൽ ഒരു ലോഞ്ച് കോൺഫിഗറേഷൻ സൃഷ്ടിക്കുക:
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

2. സെർവർ കോഡിൽ ബ്രേക്ക്പോയിന്റുകൾ സജ്ജമാക്കുക
3. ഡീബഗർ ഓടിച്ചു ഇൻസ്പെക്ടർ ഉപയോഗിച്ച് പരീക്ഷിക്കുക

### പൊതു ഡീബഗ് ടിപ്പുകൾ

- `stderr` ലോഗിനായി ഉപയോഗിക്കുക — MCP സന്ദേശങ്ങൾക്കായി `stdout` പ്രദിഷ്ടം; അതിൽ എഴുതരുത്
- എല്ലാ JSON-RPC സന്ദേശങ്ങളും newline_DELIMITED ആണെന്ന് ഉറപ്പാക്കുക
- ലളിതമായ ടൂൾസ് ആദ്യം പരീക്ഷിച്ച് പിന്നീടങ്ങോട്ട് സങ്കീർണത ചേർക്കുക
- സന്ദേശ ഫോർമാറ്റുകൾ ഇൻസ്പെക്ടർ ഉപയോഗിച്ച് പരിശോധിക്കുക

## VS Code-ൽ stdio സെർവർ ഉപഭോഗം

നിങ്ങൾ MCP stdio സെർവർ ബിൽഡ് ചെയ്താൽ, അതിനെ Visual Studio Code വഴി Claude അല്ലെങ്കിൽ മറ്റ് MCP-അനുസൃത ക്ലയന്റുകളുമായി സംയോജിപ്പിക്കാം.

### കോൺഫിഗറേഷൻ

1. MCP കോൺഫിഗറേഷൻ ഫയൽ `%APPDATA%\Claude\claude_desktop_config.json` (Windows) അല്ലെങ്കിൽ `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac) സൃഷ്ടിക്കുക:

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

2. Claude റിസ്റ്റാർട്ട് ചെയ്യുക: Claude അടച്ചു വീണ്ടും തുറക്കുക, പുതിയ സെർവർ കോൺഫിഗറേഷൻ ലോഡ് ചെയ്യാൻ.

3. കണക്ഷൻ പരീക്ഷിക്കുക: Claude-വുമായുള്ള സംഭാഷണം ആരംഭിച്ച് നിങ്ങളുടെ സെർവറിന്റെ ടൂളുകൾ ഉപയോഗിച്ച് പരീക്ഷിക്കുക:  
   - "Can you greet me using the greeting tool?"  
   - "Calculate the sum of 15 and 27"  
   - "What's the server info?"

### TypeScript stdio സെർവർ ഉദാഹരണം

അന്വേഷണാർത്ഥം സമ്പൂർണ്ണ TypeScript ഉദാഹരണം:

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

// ടൂളുകൾ ചേർത്ത് ചേർക്കുക
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

### .NET stdio സെർവർ ഉദാഹരണം

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

## ചുരുക്കം

ഈ പുതുക്കിയ പാഠത്തിൽ നിങ്ങൾക്ക് പഠിച്ചത്:

- MCP സെർവർ stdio ട്രാൻസ്പോർട്ട് ഉപയോഗിച്ച് നിർമിക്കുക (ശുപാർശചെയ്ത മാർഗം)
- SSE ട്രാൻസ്പോർട്ട് എന്തുകൊണ്ട് ഡിപ്രീകേറ്റ് ചെയ്‌തു stdio, Streamable HTTP-ന് മുമ്പാകെ
- MCP ക്ലയന്റുകൾക്ക് വിളിക്കാവുന്ന ടൂളുകൾ സൃഷ്ടിക്കുക
- MCP ഇൻസ്പെക്ടർ ഉപയോഗിച്ച് സെർവർ ഡീബഗ് ചെയ്യുക
- stdio സെർവർ VS Code, Claude എന്നിവയിൽ എളുപ്പത്തിൽ സംയോജിപ്പിക്കുക

stdio ട്രാൻസ്പോർട്ട് ഡിപ്രീകേറ്റ് ചെയ്ത SSE വകഭേദങ്ങളിലേതും ലളിതവും സുരക്ഷിതവും കൂടുതൽ പ്രകടനക്ഷമവുമായ MCP സെർവർ നിർമ്മാണ മാർഗമാണ്. 2025-06-18 സ്പെസിഫിക്കേഷനു ശേഷം MCP സെർവർ നിർമാണത്തിന് ശുപാർശചെയ്ത ട്രാൻസ്പോർട്ട് ആയി തുടരുന്നു.

### .NET

1. ആദ്യം ചില ടൂളുകൾ സൃഷ്ടിക്കാം, ഇതിനായി *Tools.cs* എന്ന ഫയൽ താഴെപറയുന്ന ഉള്ളടക്കത്തോടെ സൃഷ്ടിക്കുക:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## എക്സർസൈസ്: stdio സെർവർ പരിശോധന

stdio സെർവർ നിർമ്മിച്ച ശേഷം, അത് ശരിയായി പ്രവർത്തിക്കുന്നുവെന്ന് ഉറപ്പാക്കാൻ ശ്രമിക്കാം.

### മുൻ‌റെക്കുറിപ്പുകൾ

1. MCP ഇൻസ്പെക്ടർ ഇൻസ്റ്റാൾ ചെയ്തിട്ടുണ്ടെന്ന് ഉറപ്പാക്കുക:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. നിങ്ങളുടെ സെർവർ കോഡ് (ഉദാഹരണത്തിന് `server.py`) സേവ് നടത്തിയിട്ടുണ്ടാകണം

### ഇൻസ്പെക്ടർ ഉപയോഗിച്ചുള്ള പരിശോധന

1. **സെർവറിൽ ഇൻസ്പെക്ടർ ആരംഭിക്കുക**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **വെബ് ഇന്റർഫേസ് തുറക്കുക**: ഇൻസ്പെക്ടർ ബ്രൗസറിൽ സെർവറിന്റെ കഴിവുകൾ കാണിക്കുന്നു

3. **ടൂൾസ് പരീക്ഷിക്കുക**:  
   - `get_greeting` ടൂൾ വ്യത്യസ്ത പേരുകളോടെ പരീക്ഷിക്കുക  
   - `calculate_sum` ടൂൾ വിവിധ സംഖ്യകളുമായി പരീക്ഷിക്കുക  
   - `get_server_info` ടൂൾ സെർവർ മെറ്റാഡാറ്റ കാണുക

4. **കമ്യൂണിക്കേഷൻ നിരീക്ഷിക്കുക**: ഇൻസ്പെക്ടർ JSON-RPC സന്ദേശങ്ങൾ ക്ലയന്റ്, സെർവർ අතර കൈമാറുന്നത് കാണിക്കുന്നു

### എന്ത് കാണണം

സെർവർ ശരിയായി ആരംഭിക്കുമ്പോൾ നിങ്ങൾ കാണും:  
- ഇൻസ്പെക്ടറിലുള്ള സെർവർ കഴിവുകൾ  
- ഉപയോഗത്തിനുള്ള ടൂൾസ്  
- വിജയകരമായ JSON-RPC സന്ദേശ എക്സ്ചേഞ്ചുകൾ  
- ഇന്റർഫേസിൽ ടൂൾ പ്രതികരണങ്ങൾ

### പൊതു പ്രശ്നങ്ങൾ, പരിഹാരങ്ങൾ

**സെർവർ ആരംഭിക്കുന്നില്ല:**
- എല്ലാ ഡിപ്പെൻഡൻസികളും ഇൻസ്റ്റാൾ ചെയ്തിട്ടുണ്ടോ പരിശോധിക്കുക: `pip install mcp`  
- Python ലിക്സിന്റാകിയുറപ്പാക്കുക  
- കോൺസോളിൽ പിഴവുകൾ പരിശോധിക്കുക

**ടൂളുകൾ കാണാനില്ല:**
- `@server.tool()` ഡെകറേറ്ററുകൾ ഉണ്ട് എന്നത് ഉറപ്പാക്കുക
- ടൂൾ ഫംഗ്ഷനുകൾ `main()` ന് മുൻപ് നിർവചിച്ചിട്ടുള്ളതായി പരിശോധിക്കുക
- സെർവർ ശരിയായി കോൺഫിഗറാക്കിയിട്ടുണ്ടെന്ന് ഉറപ്പാക്കുക

**കണക്ഷൻ പ്രശ്നങ്ങൾ:**
- stdio ട്രാൻസ്പോർട്ട് ശരിയായി ഉപയോഗിച്ചാണെന്ന് ഉറപ്പാക്കുക
- മറ്റ് പ്രോസസുകൾ തടസ്സം വരുത്തുന്നില്ല എന്നുറപ്പാക്കുക
- ഇൻസ്പെക്ടർ കമാൻഡ് സിന്റാക്സ് പരിശോധിക്കുക

## അസൈൻമെന്റ്

നിങ്ങളുടെ സെർവർ കൂടുതൽ കഴിവുകൾ ചേർത്ത് വികസിപ്പിക്കാൻ ശ്രമിക്കുക. ഉദാഹരണത്തിന് [ഈ പേജ്](https://api.chucknorris.io/) കാണാൻ; ഒരു API വിളിക്കുന്ന ടൂൾ ചേർക്കാം. സെർവർ എങ്ങിനെയാകണം നിങ്ങൾ തീരുമാനം ചെയ്യും. സുഖമായി പഠിക്കുക :)

## പരിഹാരം

[പരിഹാരം](./solution/README.md) പ്രവർത്തിക്കുന്ന കോഡുമായി ഒരു സാധ്യതയുള്ള പരിഹാരമാണ്.

## പ്രധാനപ്പെട്ട കാര്യങ്ങൾ

ഈ അദ്ധ്യായത്തിൽ നിന്ന് പ്രധാനപ്പെട്ട കാര്യങ്ങൾ:

- stdio ട്രാൻസ്പോർട്ട് ലോക്കൽ MCP സെർവറുകൾക്ക് ശുപാർശ ചെയ്‌തതിനുള്ള സംവിധാനമാണ്.
- stdio ട്രാൻസ്പോർട്ട് MCP സെർവറുകളും ക്ലയന്റുകളും സ്റ്റാൻഡേർഡ് ഇൻപുട്ട്/ഔട്ട്പുട്ട് സ്ട്രീമുകൾ ഉപയോഗിച്ച് സുഖപ്രദമായി സംവദിക്കുന്നു.
- stdio സെർവർ നേരിട്ട് ഉപഭോഗിക്കാൻ നിങ്ങൾക്ക് ഇൻസ്പെക്ടറും Visual Studio Code-ഉം ഉപയോഗിക്കാം, ഇത് ഡീബഗിംഗ്, സംയോജനം ലളിതമാക്കുന്നു.

## സാമ്പിളുകൾ

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)

## അധിക വിഭവങ്ങൾ

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## എങ്കിൽ അടുത്തത്

## അടുത്ത പടികൾ

stdio ട്രാൻസ്പോർട്ട് ഉപയോഗിച്ച് MCP സെർവർ നിർമ്മിക്കാൻ പഠിച്ചതിനു ശേഷം, കൂടുതൽ ആഴത്തിലുള്ള വിഷയങ്ങൾ പരിശോധിക്കാം:

- **അടുത്തത്**: [MCP-യുടെയുള്ള HTTP സ്ട്രീമിംഗ് (Streamable HTTP)](../06-http-streaming/README.md) - റിമോട്ട് സെർവർസിനായി പിന്തുണയ്‌ക്കുന്ന മറ്റൊരു ട്രാൻസ്പോർട്ട്
- **ഉയർന്ന തലത്തിലുള്ളത്**: [MCP സുരക്ഷാ മികച്ച പ്രവൃത്തികൾ](../../02-Security/README.md) - MCP സെർവറുകളിൽ സുരക്ഷ നടപ്പിലാക്കുക
- **ഉത്പാദനത്തിന്**: [ഡിപ്ലോയ്മെന്റ് തന്ത്രങ്ങൾ](../09-deployment/README.md) - ഉത്പാദന ഉപയോഗത്തിന് സെർവർ ഡിപ്ലോയ്ചെയ്യുക

## അധിക വിഭവങ്ങൾ

- [MCP സ്പെസിഫിക്കേഷൻ 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - ഔദ്യോഗിക സ്പെസിഫിക്കേഷൻ
- [MCP SDK ഡോക്കുമെന്റേഷൻ](https://github.com/modelcontextprotocol/sdk) - എല്ലാ ഭാഷകളുടെയും SDK റഫറൻസുകൾ
- [കമ്മ്യൂണിറ്റി ഉദാഹരണങ്ങൾ](../../06-CommunityContributions/README.md) - കമ്മ്യൂണിറ്റിയിൽ നിന്നുള്ള കൂടുതൽ സെർവർ ഉദാഹരണങ്ങൾ

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അറിയിപ്പ്**:
ഈ രേഖ AI പരിഭാഷാ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിക്കുന്നുവെങ്കിലും, ഓട്ടോമേറ്റഡ് പരിഭാഷകളിൽ പിഴവുകൾ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്. അതിന്റെ സ്വാഭാവിക ഭാഷയിലുള്ള അസൽ രേഖയാണ് പ്രാമാണികമായ ഉറവിടമായി പരിഗണിക്കേണ്ടത്. നിർണായകമായ വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർശ ചെയ്യുന്നു. ഈ പരിഭാഷ ഉപയോഗിച്ച് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾ അല്ലെങ്കിൽ തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കായി ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->