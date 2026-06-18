# MCP ಸರ್ವರ್ stdio ಸಾರಿಗೆ ಮೂಲಕ

> **⚠️ ಮಹತ್ವದ ನವೀಕರಣ**: MCP ನಿರ್ದಿಷ್ಟಿಕೆ 2025-06-18 ರಿಂದ, ಸ್ವತಂತ್ರ SSE (ಸರ್ವರ್-ಸೆಂಟ್ ಇವೆಂಟ್ಸ್) ಸಾರಿಗೆ **ನಿರಾಕರಿಸಲಾಗಿದೆ** ಮತ್ತು ಅದನ್ನು "ಸ್ಟ್ರೀಮಬಲ್ HTTP" ಸಾರಿಗೆ ಮೂಲಕ ಬದಲಿಸಲಾಗಿದೆ. ಪ್ರಸ್ತುತ MCP ನಿರ್ದಿಷ್ಟಿಕೆ ಎರಡು ಪ್ರಮುಖ ಸಾರಿಗೆ ವಿಧಾನಗಳನ್ನು ವ್ಯಾಖ್ಯಾನಿಸುತ್ತದೆ:
> 1. **stdio** - ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಇನ್‌ಪುಟ್/ಆಟ್ಪುಟ್ (ಸ್ಥಳೀಯ ಸರ್ವರ್‌ಗಳಿಗೆ ಶಿಫಾರಸು ಮಾಡಲಾಗುವುದು)
> 2. **Streamable HTTP** - ಸರ್ವರ್‌ಗಳಿಗಾಗಿ, ಇವರಿಗೆ ಆಂತರಿಕವಾಗಿ SSE ಬಳಸಬಹುದು
>
> ಈ ಪಾಠ stdio ಸಾರಿಗೆ ಮೇಲೆ ಗಮನ ನೀಡಲು ನವೀಕರಿಸಲಾಗಿದೆ, ಇದು ಬಹುತೇಕ MCP ಸರ್ವರ್ ಅನುಷ್ಠಾನಗಳಿಗೆ ಶಿಫಾರಸು ಮಾಡಲಾದ ವಿಧಾನವಾಗಿದೆ.

stdio ಸಾರಿಗೆ MCP ಸರ್ವರ್‌ಗಳಿಗೆ ಕ್ಲೈಂಟ್‌ಗಳೊಂದಿಗೆ ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಇನ್‌ಪುಟ್ ಮತ್ತು ಔಟ್‌ಪುಟ್ ಸ್ಟ್ರೀಮ್‌ಗಳ ಮೂಲಕ ಸಂವಹನ ಮಾಡಲು ಅವಕಾಶ ನೀಡುತ್ತದೆ. ಇದು ಪ್ರಸ್ತುತ MCP ನಿರ್ದಿಷ್ಟಿಕೆಯಲ್ಲಿ ಹೆಚ್ಚಾಗಿ ಬಳಸಲ್ಪಡುವ ಮತ್ತು ಶಿಫಾರಸು ಮಾಡಲ್ಪಡುವ ಸಂಪರ್ಕ ವಿಧಾನವಾಗಿದ್ದು, ವಿವಿಧ ಕ್ಲೈಂಟ್ ಅಪ್ಲಿಕೇಶನ್‌ಗಳೊಂದಿಗೆ ಸುಲಭವಾಗಿ ಏಕೀಕರಿಸಬಹುದಾದ ಸರಳ ಮತ್ತು ಪರಿಣಾಮಕಾರಿ ರೀತಿಯಲ್ಲಿ MCP ಸರ್ವರ್‌ಗಳನ್ನು ನಿರ್ಮಿಸಲು ಅನುಕೂಲವಾಗುತ್ತದೆ.

## ಹೋಲಿಕೆ

ಈ ಪಾಠವು stdio ಸಾರಿಗೆ ಬಳಸಿ MCP ಸರ್ವರ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುವ ಮತ್ತು ಬಳಸುವ ರೀತಿಯನ್ನು ವರ್ಣಿಸುತ್ತದೆ.

## ಕಲಿಕಾ ಗುರಿಗಳು

ಈ ಪಾಠದ ಅಂತ್ಯಕ್ಕೆ, ನೀವು ಈ ಕೆಳಗಿನಾಗಿರುವುದರಲ್ಲಿ ಕೌಶಲ್ಯ ಸಾಮರ್ಥ್ಯ ಪಡೆಯುತ್ತೀರಿ:

- stdio ಸಾರಿಗೆ ಬಳಸಿ MCP ಸರ್ವರ್ ನಿರ್ಮಿಸುವುದು.
- ಇನ್ಸ್ಪೆಕ್ಟರ್ ಬಳಸಿ MCP ಸರ್ವರ್ ಡೀಬಗ್ ಮಾಡುವುದು.
- Visual Studio Code ಬಳಸಿ MCP ಸರ್ವರ್ ಬಳಸದನ್ನು.
- ಪ್ರಸ್ತುತ MCP ಸಾರಿಗೆ ವಿಧಾನಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು ಮತ್ತು stdioಯನ್ನು ಶಿಫಾರಸು ಮಾಡುವ ಕಾರಣ.

## stdio ಸಾರಿಗೆ - ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ

stdio ಸಾರಿಗೆ ಪ್ರಸ್ತುತ MCP ನಿರ್ದಿಷ್ಟಿಕೆಯ (2025-11-25) ಎರಡು ಬೆಂಬಲಿತ ಸಾರಿಗೆ ವಿಧಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ. ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ ಎಂಬುದು ಹೀಗಿದೆ:

- **ಸರಳ ಸಂವಹನ**: ಸರ್ವರ್ ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಇನ್‌ಪುಟ್ (`stdin`) ನಿಂದ JSON-RPC ಸಂದೇಶಗಳನ್ನು ಓದುತ್ತದೆ ಮತ್ತು ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಔಟ್‌ಪುಟ್ (`stdout`) ಗೆ ಸಂದೇಶಗಳನ್ನು ಕಳುಹಿಸುತ್ತದೆ.
- **ಪ್ರಕ್ರಿಯೆ ಆಧಾರಿತ**: ಕ್ಲೈಂಟ್ MCP ಸರ್ವರ್ ಅನ್ನು ಉಪಪ್ರಕ್ರಿಯೆಯಾಗಿ ಪ್ರಾರಂಭ ಮಾಡುತ್ತದೆ.
- **ಸಂದೇಶ ಸ್ವರೂಪ**: ಸಂದೇಶಗಳು ವೈಯಕ್ತಿಕ JSON-RPC ವಿನಂತಿಗಳು, ಅಧಿಸೂಚನೆಗಳು ಅಥವಾ ಪ್ರತಿಕ್ರಿಯೆಗಳು ಆಗಿದ್ದು, ನೂತನ ಸಾಲಿನ ಮೂಲಕ ಪ್ರತ್ಯೇಕಿಸಲಾಗುತ್ತದೆ.
- **ಲಾಗಿಂಗ್**: ಸರ್ವರ್ ಲಾಗಿಂಗ್ ಉದ್ದೇಶಕ್ಕಾಗಿ UTF-8 ಸ್ಟ್ರಿಂಗ್‌ಗಳನ್ನು ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಎರರ್ (`stderr`) ಗೆ ಬರೆಯಬಹುದು.

### ಪ್ರಮುಖ ಅವಶ್ಯಕತೆಗಳು:
- ಸಂದೇಶಗಳು ನೂತನ ಸಾಲಿನಿಂದ ಪ್ರತ್ಯೇಕಿತವಾಗಿರಬೇಕು ಮತ್ತು ಒಳಗೊಂಡ ನೂತನ ಸಾಲುಗಳನ್ನೊಳಗೊಂಡಿರಕೂಡದು
- ಸರ್ವರ್ ಮಾನ್ಯ MCP ಸಂದೇಶವಲ್ಲದ ಯಾವುದನ್ನೂ `stdout` ಗೆ ಬರೆಯಬಾರದು
- ಕ್ಲೈಂಟ್ ಮಾನ್ಯ MCP ಸಂದೇಶವಲ್ಲದ ಯಾವುದನ್ನೂ ಸರ್ವರ್ನ `stdin` ಗೆ ಬರೆಯಬಾರದು

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

ಈ ಪೂರ್ವೋಕ್ತ ಕೋಡ್‌ನಲ್ಲಿ:

- ನಾವು MCP SDKನಿಂದ `Server` ಶ್ರೇಣಿಯನ್ನು ಮತ್ತು `StdioServerTransport` ಅನ್ನು ಆಮದು ಮಾಡಿಕೊಳ್ಳುತ್ತೇವೆ
- ಮೂಲಭೂತ ಕಾನ್ಫಿಗರೇಶನ್ ಮತ್ತು ಸಾಮರ್ಥ್ಯಗಳೊಂದಿಗೆ ಸರ್ವರ್ ಉದಾಹರಣೆ ರಚಿಸುತ್ತೇವೆ
- `StdioServerTransport` ಉದಾಹರಣೆಯನ್ನು ರಚಿಸಿ, ಸರ್ವರ್ ಅನ್ನು ಅದಕ್ಕೆ ಸಂಪರ್ಕಿಸಿ stdin/stdout ಮುಖಾಂತರ ಸಂವಹನ ಸಕ್ರಿಯಗೊಳಿಸುತ್ತೇವೆ

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# ಸರ್ವರ್ ಉದಾಹರಣೆ ರಚಿಸಿ
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

ಈ ಪೂರ್ವೋಕ್ತ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- MCP SDK ಉಪಯೋಗಿಸಿ ಸರ್ವರ್ ಉದಾಹರಣೆ ರಚಿಸುತ್ತೇವೆ
- ಡೆಕೊರೇಟರ್‌ಗಳ ಬಳಕೆ ಮೂಲಕ ಉಪಕರಣಗಳನ್ನು ವ್ಯಾಖ್ಯಾನಿಸುತ್ತೇವೆ
- stdio_server ಕಾಂಟೆಕ್ಸ್ಟ್ ಮ್ಯಾನೇಜರ್ ಬಳಸಿ ಸಾರಿಗೆಯನ್ನು ನಿರ್ವಹಿಸುತ್ತೇವೆ

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

SSEಯಿಂದ ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯ ಹೀಗಿದೆ:

- ಒಳ್ಳೆಯ http ಸರ್ವರ್ ಸೆಟ್ ಅಪ್ ಅಥವಾ HTTP ಎಂಡ್ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಅಗತ್ಯವಿಲ್ಲ
- ಕ್ಲೈಂಟ್ ಉಪಪ್ರಕ್ರಿಯೆಯಾಗಿ ಸರ್ವರ್ ಅನ್ನು ಪ್ರಾರಂಭಿಸುತ್ತದೆ
- stdin/stdout ಸ್ಟ್ರೀಮ್‌ಗಳ ಮೂಲಕ ಸಂವಹನ
- ಅನುಷ್ಠಾನ ಮತ್ತು ಡೀಬಗ್ ಮಾಡಲು ಸರಳ

## ಅಭ್ಯಾಸ: stdio ಸರ್ವರ್ ರಚನೆ

ನಮ್ಮ ಸರ್ವರ್ ರಚಿಸಲು, ಎರಡು ವಿಷಯಗಳನ್ನು ಗಮನದಲ್ಲಿರಿಸಬೇಕು:

- ಸಂಪರ್ಕ ಮತ್ತು ಸಂದೇಶಗಳಿಗಾಗಿ ಎಂಡ್ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಅನಾವರಣ ಮಾಡಲು ವೆಬ್ ಸರ್ವರ್ ಬೇಕಾಗುತ್ತದೆ.

## ಪ್ರಯೋಗ: ಸರಳ MCP stdio ಸರ್ವರ್ ರಚನೆ

ಈ ಪ್ರಯೋಗದಲ್ಲಿ, ನಾವು ಶಿಫಾರಸು ಮಾಡಲಾದ stdio ಸಾರಿಗೆಯನ್ನು ಉಪಯೋಗಿಸಿ ಸರಳ MCP ಸರ್ವರ್ ರಚಿಸೋಣ. ಈ ಸರ್ವರ್ ಸಾಮಾನ್ಯ ಮಾದರಿ ಪ್ರೋಟೋಕಾಲ್ ಮುಖಾಂತರ ಕ್ಲೈಂಟ್‌ಗಳು ಕರೆ ಮಾಡುವ ಉಪಕರಣಗಳನ್ನು ಅನಾವರಣ ಮಾಡುತ್ತದೆ.

### ಪೂರ್ವಾಪೇಕ್ಷಿತಗಳು

- Python 3.8 ಅಥವಾ ನಂತರದ ಆವೃತ್ತಿ
- MCP Python SDK: `pip install mcp`
- ಅಸಿಂಕ್ರೋನಸ್ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಮೂಲಭೂತ ಅರಿವು

ನಾವಿನ ಮೊದಲನೆಯ MCP stdio ಸರ್ವರ್ ಅನ್ನು ರಚಿಸೋಣ:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# ಲಾಗ್ ಹೊಂದಿಸಿ
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ಸರ್ವರ್ ರಚಿಸಿ
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
    # stdio ಸಾರಿಗೆ ಬಳಸಿ
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## ನಿವಾರಣೆಯಾದ SSE ವಿಧಾನದಿಂದ ಪ್ರಾಥಮಿಕ ವ್ಯತ್ಯಾಸಗಳು

**Stdio ಸಾರಿಗೆ (ಪ್ರಸ್ತುತ ಮಾನಕ):**
- ಸರಳ ಉಪಪ್ರಕ್ರಿಯೆ ಮಾದರಿ - ಕ್ಲೈಂಟ್ ಸರ್ವರ್ ಅನ್ನು ಚೈಲ್ಡ್ ಪ್ರಕ್ರಿಯೆಯಾಗಿ ಪ್ರಾರಂಭಿಸುತ್ತದೆ
- JSON-RPC ಸಂದೇಶಗಳ ಮೂಲಕ stdin/stdout ಮೂಲಕ ಸಂವಹನ
- ಯಾವುದೇ HTTP ಸರ್ವರ್ ಸೆಟ್ ಅಪ್ ಅಗತ್ಯವಿಲ್ಲ
- ಉತ್ತಮ ಕಾರ್ಯಕ್ಷಮತೆ ಮತ್ತು ಭದ್ರತೆ
- ಸುಲಭ ಡೀಬಗ್ ಮತ್ತು ಅಭಿವೃದ್ಧಿ

**SSE ಸಾರಿಗೆ (MCP 2025-06-18 ರಿಂದ ನಿರಾಕರಿಸಲಾಗಿದೆ):**
- SSE ಎಂಡ್ಪಾಯಿಂಟ್‌ಗಳೊಂದಿಗೆ HTTP ಸರ್ವರ್ ಅಗತ್ಯವಿತ್ತು
- ವೆಬ್ ಸರ್ವರ್ ಮೂಲಸೌಕರ್ಯದಿಂದ ಜಟಿಲ ಸೆಟ್ ಅಪ್
- HTTP ಎಂಡ್ಪಾಯಿಂಟ್‌ಗಳ ಭದ್ರತೆಗಾಗಿ ಹೆಚ್ಚುವರಿ ಗಮನ
- ಈಗ Streamable HTTP ಮೂಲಕ ಬದಲಿಸಲಾಗಿದೆ ವೆಬ್‌ ಆಧಾರಿತ ಸಂದರ್ಭಗಳಿಗಾಗಿ

### stdio ಸಾರಿಗೆಯಿಂದ ಸರ್ವರ್ ರಚನೆ

stdio ಸರ್ವರ್ ರಚಿಸಲು, ನಾವು:

1. **ಆವಶ್ಯಕ ಗ್ರಂಥಾಲಯಗಳನ್ನು ಆಮದುಮಾಡಿ** - MCP ಸರ್ವರ್ ಘಟಕಗಳು ಮತ್ತು stdio ಸಾರಿಗೆಯನ್ನು ಬಳಕೆ ಮಾಡಬೇಕು
2. **ಸರ್ವರ್ ಉದಾಹರಣೆ ರಚಿಸಿ** - ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಹೊಂದಿರುವ ಸರ್ವರ್ ವ್ಯಾಖ್ಯಾನ
3. **ಉಪಕರಣಗಳನ್ನು ವ್ಯಾಖ್ಯಾನಿಸಿ** - ಹೊರತರುವ ಕಾರ್ಯತಂತ್ರ ಸೇರಿಸಿ
4. **ಸಾರಿಗೆ ವ್ಯವಸ್ಥೆ ಮಾಡಿಕೊಳ್ಳಿ** - stdio ಸಂಪರ್ಕವನ್ನು ಸಂರಚಿಸಿ
5. **ಸರ್ವರ್ ಚಾಲನೆ** - ಸರ್ವರ್ ಪ್ರಾರಂಭಿಸಿ ಸಂದೇಶಗಳನ್ನು ನಿರ್ವಹಿಸು

ಹಾಗಾಗಿ ಹಂತ ಹಂತವಾಗಿ ನಿರ್ಮಿಸೋಣ:

### ಹಂತ 1: ಸರಳ stdio ಸರ್ವರ್ ರಚನೆ

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# ಲಾಗಿಂಗ್ ಅನ್ನು ಸಂರಚಿಸಿ
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ಸರ್ವರ್ ರಚಿಸಿ
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

### ಹಂತ 2: ಇನ್ನಷ್ಟು ಉಪಕರಣಗಳನ್ನು ಸೇರಿಸುವುದು

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

### ಹಂತ 3: ಸರ್ವರ್ ಅನ್ನು ಚಾಲನೆ ಮಾಡುವುದು

ಕೋಡ್ ಅನ್ನು `server.py` ಎನ್‌ಶಿಕೆ ಮಾಡಿ ಮತ್ತು ಕಮಾಂಡ್ ಲೈನ್ ಮೂಲಕ ಚಾಲನೆ ಮಾಡಿ:

```bash
python server.py
```

ಸರ್ವರ್ ಆರಂಭಗೊಂಡು stdin ನಿಂದ ಇನ್‌ಪುಟ್ ಬರುವುದನ್ನು ಕಾಯುತ್ತದೆ. stdio ಸಾರಿಗೆಯಲ್ಲಿ JSON-RPC ಸಂದೇಶಗಳ ಮೂಲಕ ಸಂವಹನ ನಡೆಸುತ್ತದೆ.

### ಹಂತ 4: ಇನ್ಸ್ಪೆಕ್ಟರ್ ಮೂಲಕ ಪರೀಕ್ಷೆ

ನೀವು ನಿಮ್ಮ ಸರ್ವರ್ ಅನ್ನು MCP ಇನ್ಸ್ಪೆಕ್ಟರ್ ಬಳಸಿ ಪರೀಕ್ಷೆ ಮಾಡಬಹುದು:

1. ಇನ್ಸ್ಪೆಕ್ಟರ್ ಸ್ಥಾಪಿಸಿ: `npx @modelcontextprotocol/inspector`
2. ಇನ್ಸ್ಪೆಕ್ಟರ್ ಚಾಲನೆ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಸರ್ವರ್ ಗೆ ಪಾಯಿಂಟ್ ಮಾಡಿ
3. ರಚಿಸಿದ ಉಪಕರಣಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```


## ನಿಮ್ಮ stdio ಸರ್ವರ್ ಡೀಬಗಿಂಗ್

### MCP ಇನ್ಸ್ಪೆಕ್ಟರ್ ಬಳಕೆ

MCP ಇನ್ಸ್ಪೆಕ್ಟರ್ MCP ಸರ್ವರ್‌ಗಳನ್ನು ಡೀಬಗ್ ಮತ್ತು ಪರೀಕ್ಷೆ ಮಾಡಲು ಬಹುಮುಖ ಉಪಕರಣ. ಇಲ್ಲಿದೆ stdio ಸರ್ವರ್ ಜೊತೆಗೆ ಬಳಸುವ ವಿಧಾನ:

1. **ಇನ್ಸ್ಪೆಕ್ಟರ್ ಸ್ಥಾಪನೆ**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **ಇನ್ಸ್ಪೆಕ್ಟರ್ ಚಾಲನೆ**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **ನಿಮ್ಮ ಸರ್ವರ್ ಪರೀಕ್ಷೆ**: ಇನ್ಸ್ಪೆಕ್ಟರ್ ವೆಬ್ ಇಂಟರ್ಫೇಸ್ ಒದಗಿಸುತ್ತದೆ, где ನೀವು:
   - ಸರ್ವರ್ ಸಾಮರ್ಥ್ಯಗಳನ್ನು ವೀಕ್ಷಿಸಬಹುದು
   - ವಿವಿಧ ಪರಿಮಾಣಗಳಿಂದ ಉಪಕರಣಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ
   - JSON-RPC ಸಂದೇಶಗಳನ್ನು ನಿಗಾ ವಹಿಸಿ
   - ಸಂಪರ್ಕ ಸಮಸ್ಯೆಗಳನ್ನು ಡೀಬಗ್ ಮಾಡಬಹುದು

### VS Code ಬಳಕೆ

ನೀವು ನಿಮ್ಮ MCP ಸರ್ವರ್ ನ್ನು ನೇರವಾಗಿ VS Code ನಲ್ಲಿ ಡೀಬಗ್ ಮಾಡಬಹುದು:

1. `.vscode/launch.json` ನಲ್ಲಿ ಲಾಂಚ್ ಕಾನ್ಫಿಗರೇಶನ್ ರಚಿಸಿ:
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

2. ಸರ್ವರ್ ಕೋಡ್‌ನಲ್ಲಿ ನಟೆಸ್ಥಾನಸ್ಥಳ (breakpoints) ಸಲಹಿಸಿರಿ
3. ಡೀಬಗರನ್ನು ಚಾಲನೆ ಮಾಡಿ ಮತ್ತು ಇನ್ಸ್ಪೆಕ್ಟರ್ ಮೂಲಕ ಪರೀಕ್ಷಿಸಿ

### ಸಾಮಾನ್ಯ ಡೀಬಗ್ ಸಲಹೆಗಳು

- ಲಾಗಿಂಗ್‌ಗಾಗಿ `stderr` ಉಪಯೋಗಿಸಿ - MCP ಸಂದೇಶಗಳಿಗೆ ಮೀಸಲಾದ `stdout` ಗೆ ಬರೆಯಬೇಡಿ
- ಎಲ್ಲ JSON-RPC ಸಂದೇಶಗಳು ನೂತನ ಸಾಲಿನಿಂದ ವಿಭಜಿಸಿರಬೇಕು
- ಸರಳ ಉಪಕರಣಗಳಿಂದ ಪರೀಕ್ಷೆ ಮಾಡಿ, ನಂತರ ಜಟಿಲ ಕಾರ್ಯಗಳನ್ನು ಸೇರಿಸಿ
- ಸಂದೇಶ ಸ್ವರೂಪಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಇನ್ಸ್ಪೆಕ್ಟರ್ ಉಪಯೋಗಿಸಿ

## VS Code ನಲ್ಲಿ ನಿಮ್ಮ stdio ಸರ್ವರ್ ಬಳಕೆ

MCP stdio ಸರ್ವರ್ ನಿರ್ಮಿಸಿದ ನಂತರ, ನೀವು ಅದನ್ನು VS Code ಗೆ Claude ಅಥವಾ ಇತರೆ MCP-ಸಂಬಂಧಿತ ಕ್ಲೈಂಟ್‌ಗಳ ಜೊತೆಗೆ ಏಕೀಕರಿಸಬಹುದು.

### ಸಂರಚನೆ

1. Windows ನಲ್ಲಿ `%APPDATA%\Claude\claude_desktop_config.json` ಅಥವಾ Mac ನಲ್ಲಿ `~/Library/Application Support/Claude/claude_desktop_config.json` ನಲ್ಲಿ MCP ಸಂರಚನಾ ಫೈಲ್ ರಚಿಸಿ:

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
  
2. Claude ನ್ನು ಮುಚ್ಚಿ ಮತ್ತೆ ತೆರೆಯಿರಿ, ಹೊಸ ಸರ್ವರ್ ಸಂರಚನೆಯನ್ನು ಒಳಗೂಡಿ.

3. ಸಂಪರ್ಕವನ್ನು ಪರೀಕ್ಷಿಸಿ: Claudeೊಂದಿಗೆ ಸಂಭಾಷಣೆ ಪ್ರಾರಂಭಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಸರ್ವರ್ ಉಪಕರಣಗಳನ್ನು ಪ್ರಯೋಗಿಸಿ:
   - "ನನಗೆ ಸ್ವಾಗತ ಉಪಕರಣವನ್ನು ಬಳಸಿಕೊಂಡು ವಂದನೆ ನೀಡಬಹುದೇ?"
   - "15 ಮತ್ತು 27 ನ ಮೊತ್ತವನ್ನು ಲೆಕ್ಕಿಸಿ"
   - "ಸರ್ವರ್ ಮಾಹಿತಿ ಏನು?"

### TypeScript stdio ಸರ್ವರ್ ಉದಾಹರಣೆ

ಉದಾಹರಣೆಗೆ ಸಂಪೂರ್ಣ TypeScript ಕೋಡ್ ಇಲ್ಲಿ ಇದೆ:

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

// ಸಾಧನಗಳನ್ನು ಸೇರಿಸಿ
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

### .NET stdio ಸರ್ವರ್ ಉದಾಹರಣೆ

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


## ಸಾರಾಂಶ

ಈ ನವೀಕೃತ ಪಾಠದಲ್ಲಿ ನೀವು ಕಲಿತದ್ದು:

- ಪ್ರಸ್ತುತ **stdio ಸಾರಿಗೆ** ಬಳಸಿ MCP ಸರ್ವರ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುವುದು (ಶಿಫಾರಸು ಮಾಡಲಾದ ವಿಧಾನ)
- SSE ಸಾರಿಗೆ ಸ್ಥಗಿತವಾಗಿದ್ದು stdio ಮತ್ತು Streamable HTTP ಶಿಫಾರಸು ಆಗಿರುವುದು ಯಾಕೆಂದು ತಿಳಿದುಕೊಳ್ಳುವುದು
- MCP ಕ್ಲೈಂಟ್‌ಗಳಿಂದ ಕರೆ ಮಾಡುವ ಉಪಕರಣಗಳನ್ನು ರಚಿಸುವುದು
- MCP ಇನ್ಸ್ಪೆಕ್ಟರ್ ಬಳಸಿ ಸರ್ವರ್ ಡೀಬಗ್ ಮಾಡುವುದು
- VS Code ಮತ್ತು Claude ಜೊತೆಗೆ stdio ಸರ್ವರ್ ಏಕೀಕರಿಸುವುದು

stdio ಸಾರಿಗೆ, ಸ್ಥಗಿತಗೊಂಡ SSE ಪದ್ಧತಿಯಿಗಿಂತ ಸರಳ, ಸುರಕ್ಷಿತ ಮತ್ತು ಹೆಚ್ಚು ಕಾರ್ಯಕ್ಷಮ ವಾಗಿದೆ. 2025-06-18 ನಿರ್ದಿಷ್ಟಿಕೆಗೆ ಅನ್ವಯಿಸುವಂತೆ, ಬಹುತೇಕ MCP ಸರ್ವರ್ ಅನುಷ್ಠಾನಗಳಿಗೆ ಇದು ಶಿಫಾರಸು ಮಾಡಲಾದ ಸಾರಿಗೆ ವಿಧಾನವಾಗಿದೆ.

### .NET

1. ಮೊದಲು ಕೆಲವು ಉಪಕರಣಗಳನ್ನು ರಚಿಸೋಣ, daarvoor ನಾವು *Tools.cs* ಫೈಲ್‌ನ ಈ ಕೆಳಗಿನ ವಿಷಯವನ್ನು ಸೃಷ್ಟಿಸುವೆವು:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```


## ಅಭ್ಯಾಸ: ನಿಮ್ಮ stdio ಸರ್ವರ್ ಪರೀಕ್ಷೆ

ನೀವು stdio ಸರ್ವರ್ ರಚಿಸಿದ್ದೀರಿ, ಈಗ ಅದನ್ನು ಸರಿಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುವುದನ್ನು ಪರೀಕ್ಷಿಸೋಣ.

### ಪೂರ್ವಾಪೇಕ್ಷಿತಗಳು

1. MCP ಇನ್ಸ್ಪೆಕ್ಟರ್ ಯಥಾವತ್ತಾದಂತೆ ಸ್ಥಾಪನೆಯಾಗಿರಬೇಕು:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. ನಿಮ್ಮ ಸರ್ವರ್ ಕೋಡ್ ಉಳಿಸಲ್ಪಟ್ಟಿರಬೇಕು (ಉದಾ: `server.py`)

### ಇನ್ಸ್ಪೆಕ್ಟರ್ ಬಳಸಿ ಪರೀಕ್ಷೆ

1. **ನಿಮ್ಮ ಸರ್ವರ್ ಜೊತೆಗೆ ಇನ್ಸ್ಪೆಕ್ಟರ್ ಪ್ರಾರಂಭಿಸಿ**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **ವೆಬ್ ಇಂಟರ್ಫೇಸ್ ತೆರೆಯಿರಿ**: ಇನ್ಸ್ಪೆಕ್ಟರ್ ನಿಮ್ಮ ಸರ್ವರ್ ಸಾಮರ್ಥ್ಯಗಳನ್ನು ತೋರಿಸುವ ಬ್ರೌಸರ್ ವಿಂಡೋವನ್ನು ತೆರೆಯುತ್ತದೆ.

3. **ಉಪಕರಣಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ**: 
   - ವಿಭಿನ್ನ ಹೆಸರುಗಳೊಂದಿಗೆ `get_greeting` ಉಪಕರಣ ಪ್ರಯತ್ನಿಸಿ
   - ವಿವಿಧ ಸಂಖ್ಯೆಗಳೊಂದಿಗೆ `calculate_sum` ಉಪಕರಣ ಪರೀಕ್ಷಿಸಿ
   - `get_server_info` ಉಪಕರಣಕ್ಕೆ ಕರೆ ಮಾಡಿ ಮತ್ತು ಸರ್ವರ್ ಮೆಟಾಡೇಟಾ ವೀಕ್ಷಿಸಿ

4. **ಸಂದेश ವಿನಿಮಯವನ್ನು ನಿಗಾ ವಹಿಸಿ**: ಇನ್ಸ್ಪೆಕ್ಟರ್ ಕ್ಲೈಂಟ್ ಮತ್ತು ಸರ್ವರ್ ನಡುವೆ ವಿನಿಮಯವಾಗುತ್ತಿರುವ JSON-RPC ಸಂದೇಶಗಳನ್ನು ತೋರಿಸುತ್ತದೆ.

### ನೀವು ಕಾಣಬೇಕಾದುದು

ನಿಮ್ಮ ಸರ್ವರ್ ಸರಿಯಾಗಿ ಪ್ರಾರಂಭವಾದಾಗ, ಇವುಗಳನ್ನು ನೋಡಿ:
- ಇನ್ಸ್ಪೆಕ್ಟರ್‌ನಲ್ಲಿ ಸರ್ವರ್ ಸಾಮರ್ಥ್ಯಗಳು
- ಪರೀಕ್ಷೆಗೆ ಲಭ್ಯವಿರುವ ಉಪಕರಣಗಳು
- ಯಶಸ್ವಿ JSON-RPC ಸಂದೇಶ ವಿನಿಮಯಗಳು
- ಉಪಕರಣ ಪ್ರತಿಕ್ರಿಯೆಗಳು ಇಂಟರ್ಫೇಸ್ನಲ್ಲಿ ತೋರಿಸಲಾಗುವುದು

### ಸಾಮಾನ್ಯ ಸಮಸ್ಯೆಗಳು ಮತ್ತು ಪರಿಹಾರಗಳು

**ಸರ್ವರ್ ಪ್ರಾರಂಭವಾಗುತ್ತಿಲ್ಲ:**
- ಎಲ್ಲಾ ಅವಲಂಬನೆಗಳು ಸ್ಥಾಪಿತವಾಗಿವೆ ಎಂದು ಪರಿಶೀಲಿಸಿ: `pip install mcp`
- Python ವಾಕ್ಯರಚನೆ ಮತ್ತು ಇನ್‌ಡೆಂಟೇಷನ್ ಪರಿಶೀಲಿಸಿ
- ಕಾನ್ಸೋಲ್‌ನಲ್ಲಿ ದೋಷ ಸಂದೇಶಗಳಿಗಾಗಿ ನೋಡಿರಿ

**ಉಪಕರಣಗಳು ಕಾಣೆಯಾಗುತ್ತಿಲ್ಲ:**
- `@server.tool()` ಡೆಕೊರೇಟರ್‌ಗಳಿದ್ದರೆ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ
- `main()` ಮೊದಲು ಉಪಕರಣ ಫಂಕ್ಷನ್‌ಗಳು ವ್ಯಾಖ್ಯಾನಗೊಂಡಿರಲಿ
- ಸರ್ವರ್ ಸರಿಯಾಗಿ ಸಂರಚಿಸಲಾಗಿದೆ ಎಂದು ಪರಿಶೀಲಿಸಿ

**ಸಂಪರ್ಕ ಸಮಸ್ಯೆಗಳು:**
- ಸರ್ವರ್ stdio ಸಾರಿಗೆಯನ್ನು ಸರಿಯಾಗಿ ಬಳಸಿಕೊಂಡಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ
- ಇತರೆ ಪ್ರಕ್ರಿಯೆಗಳು ಹಸ್ತಕ್ಷೇಪ ಮಾಡುತ್ತಿಲ್ಲ ಎಂದು ಪರಿಶೀಲಿಸಿ
- ಇನ್ಸ್ಪೆಕ್ಟರ್ ಕಮಾಂಡ್ ಸಂರಚನೆಯ ಪರಿಶೀಲಿಸಿ

## ಅಸೈನ್ಮೆಂಟ್

ನಿಮ್ಮ ಸರ್ವರ್ ಸಾಮರ್ಥ್ಯಗಳನ್ನು ವಿಸ್ತರಿಸುವ ಪ್ರಯತ್ನಿಸಿ. ಉದಾಹರಣೆಗೆ, [ಈ ಪುಟ](https://api.chucknorris.io/) ನೋಡಿ, ಅಲ್ಲಿ API ಅನ್ನು ಕರೆ ಮಾಡುವುದು ಮೀಸಲಾಗಿರುವ ಉಪಕರಣ ಸೇರಿಸಬಹುದು. ನಿಮ್ಮ ಸರ್ವರ್ ಹೇಗಿರಬೇಕು ಎಂಬುದನ್ನು ನೀವು ನಿರ್ಧರಿಸಿ. ಸುಗಮವಾಗಿರಿ :)

## ಪರಿಹಾರ

[ಪರಿಹಾರ](./solution/README.md) ಇಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಕೋಡ್ ಸಹಿತ ಒಂದು ಸಾಧ್ಯತೆ ಪರಿಹಾರ ಇದೆ.

## ಪ್ರಮುಖ ಧಾರಣೆಗಳು

ಈ ಅಧ್ಯಾಯದಿಂದ ಪ್ರಮುಖವಾಗಿ ನೆನಪಿನಲ್ಲಿಡಬೇಕಾದವು:

- stdio ಸಾರಿಗೆ ಸ್ಥಳೀಯ MCP ಸರ್ವರ್‌ಗಳಿಗೆ ಶಿಫಾರಸು ಮಾಡಲಾದ ವಿಧಾನ.
- stdio ಸಾರಿಗೆ MCP ಸರ್ವರ್ ಮತ್ತು ಕ್ಲೈಂಟ್‌ಗಳ ನಡುವೆ ಸುಗಮ ಸಂಪರ್ಕವನ್ನು ಬಿಡದೆ ಸುದ್ದಿ ಸಂವಹನ ಮಾಡಲು ಅವಕಾಶ ಕೊಡುತ್ತದೆ.
- ನೀವು ಇನ್ಸ್ಪೆಕ್ಟರ್ ಮತ್ತು VS Code ಎರಡನ್ನು ಬಳಸಿ stdio ಸರ್ವರ್‌ಗಳನ್ನು ನೇರವಾಗಿ ಬಳಸಬಹುದು, ಇದು ಡೀಬಗಿಂಗ್ ಮತ್ತು ಏಕೀಕರಣ ಸೌಕರ್ಯವನ್ನು ಸುಗಮಗೊಳಿಸುತ್ತದೆ.

## ಉದಾಹರಣೆಗಳು

- [ಜಾವಾ ಕ್ಯಾಲ್ಕ್ಯುಲೇಟರ್](../samples/java/calculator/README.md)
- [.Net ಕ್ಯಾಲ್ಕ್ಯುಲೇಟರ್](../../../../03-GettingStarted/samples/csharp)
- [ಜಾವಾಸ್ಕ್ರಿಪ್ಟ್ ಕ್ಯಾಲ್ಕ್ಯುಲೇಟರ್](../samples/javascript/README.md)
- [ಟೈಪ್‌ಸ್ಕ್ರಿಪ್ಟ್ ಕ್ಯಾಲ್ಕ್ಯುಲೇಟರ್](../samples/typescript/README.md)
- [ಪೈಥಾನ್ ಕ್ಯಾಲ್ಕ್ಯುಲೇಟರ್](../../../../03-GettingStarted/samples/python)

## ಹೆಚ್ಚುವರಿ ಸಂಪನ್ಮೂಲಗಳು

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## ಮುಂದಿನ ಹಂತಗಳು

## ಮುಂದಿನ ಹಂತಗಳು

ನೀವು stdio ಸಾರಿಗೆಯೊಂದಿಗೆ MCP ಸರ್ವರ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುವುದನ್ನು ಕಲಿತಿದ್ದೀರಿ, ಇನ್ನು ಹೆಚ್ಚು ಅಭಿವೃದ್ಧಿಶೀಲ ವಿಷಯಗಳನ್ನು ಅನ್ವೇಷಿಸಬಹುದು:

- **ಮುಂದಿನದು**: [MCP HTTP ಸ್ಟ್ರೀಮಿಂಗ್ (Streamable HTTP)](../06-http-streaming/README.md) - ದೂರದ ಸರ್ವರ್‌ಗಳಿಗೆ ಬೆಂಬಲಿತ ಇತರೆ ಸಾರಿಗೆ ವಿಧಾನವನ್ನು ತಿಳಿದುಕೊಳ್ಳಿ
- **ಆಧುನಿಕ**: [MCP ಭದ್ರತಾ ಉತ್ತಮ நடைமுறೆಗಳು](../../02-Security/README.md) - ನಿಮ್ಮ MCP ಸರ್ವರ್‌ಗಳಲ್ಲಿ ಭದ್ರತೆ ಜಾರಿ ಮಾಡಿ
- **ಉತ್ಪಾದನಾ**: [ವಿತರಣಾ ತಂತ್ರಗಳು](../09-deployment/README.md) - ಉತ್ಪಾದನಾ ಬಳಕೆಗೆ ಸರ್ವರ್‌ಗಳನ್ನು ತಯಾರಿಸಿ

## ಹೆಚ್ಚುವರಿ ಸಂಪನ್ಮೂಲಗಳು

- [MCP ನಿರ್ದಿಷ್ಟಿಕೆ 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - ಅಧಿಕೃತ ನಿರ್ದಿಷ್ಟಿಕೆ
- [MCP SDK ಡಾಕ್ಯುಮೆಂಟೇಶನ್](https://github.com/modelcontextprotocol/sdk) - ಎಲ್ಲಾ ಭಾಷೆಗಳಿಗಾಗಿ SDK ಸೂಚನೆಗಳು
- [ಸಮುದಾಯ ಉದಾಹರಣೆಗಳು](../../06-CommunityContributions/README.md) - ಸಮುದಾಯಕಿಂದ ಇನ್ನಷ್ಟು ಸರ್ವರ್ ಉದಾಹರಣೆಗಳು

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಅಸ್ವೀಕಾರ**:
ಈ ದಸ್ತಾವೇಜು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದರೂ, ದಯವಿಟ್ಟು ಗಮನಿಸಿ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ದೋಷಗಳು ಅಥವಾ ಅಸಡ್ಡೆಗಳು ಇರಬಹುದು. ಮೂಲ ಭಾಷೆಯಲ್ಲಿರುವ ಮೂಲ ದಸ್ತಾವೇಜು ಪ್ರಾಮಾಣಿಕ ಮೂಲವೆಂದು ಪರಿಗಣಿಸಬೇಕು. ಪ್ರಮುಖ ಮಾಹಿತಿಗಾಗಿ, ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದವನ್ನು ಬಳಸುವ ಮೂಲಕ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಅರ್ಥಗಳ ಅಥವಾ ತಪ್ಪು ವ್ಯಾಖ್ಯಾನಗಳ ಬಗ್ಗೆ ನಾವು ಹೊಣೆಗಾರರಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->