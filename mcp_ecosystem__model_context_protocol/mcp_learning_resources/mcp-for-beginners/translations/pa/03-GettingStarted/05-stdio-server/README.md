# MCP ਸਰਵਰ stdio ਟ੍ਰਾਂਸਪੋਰਟ ਨਾਲ

> **⚠️ ਮਹੱਤਵਪੂਰਨ ਅੱਪਡੇਟ**: MCP ਨਿਰਧਾਰਨ 2025-06-18 ਅਨੁਸਾਰ, ਸ੍ਵਤੰਤਰ SSE (ਸਰਵਰ-ਭੇਜੇ ਗਏ ਇਵੈਂਟਸ) ਟ੍ਰਾਂਸਪੋਰਟ ਨੂੰ **ਅਪ੍ਰਚੀਨਤ** ਕਰ ਦਿੱਤਾ ਗਿਆ ਹੈ ਅਤੇ ਇਸ ਦੀ ਜਗ੍ਹਾ "Streamable HTTP" ਟ੍ਰਾਂਸਪੋਰਟ ਲੈ ਲਈ ਹੈ। ਮੌਜੂਦਾ MCP ਨਿਰਧਾਰਨ ਵਿੱਚ ਦੋ ਮੁੱਖ ਟ੍ਰਾਂਸਪੋਰਟ ਮਕੈਨਿਜਮ ਹਨ:
> 1. **stdio** - ਸਟੈਂਡਰਡ ਇੰਪੁੱਟ/ਆਉਟਪੁੱਟ (ਸਥਾਨਕ ਸਰਵਰਾਂ ਲਈ ਸਿਫਾਰਸ਼ੀ)
> 2. **Streamable HTTP** - ਦੂਰੇ ਸਰਵਰਾਂ ਲਈ ਜੋ ਅੰਦਰੂਨੀ ਤੌਰ ਤੇ SSE ਵਰਤ ਸਕਦੇ ਹਨ
>
> ਇਹ ਪਾਠ stdio ਟ੍ਰਾਂਸਪੋਰਟ 'ਤੇ ਧਿਆਨ ਕੇਂਦਰਿਤ ਕਰਨ ਲਈ ਅੱਪਡੇਟ ਕੀਤਾ ਗਿਆ ਹੈ, ਜੋ ਕਿ ਬਹੁਤ ਸਾਰੀਆਂ MCP ਸਰਵਰ ਕਾਰਜਕਾਰੀਕਰਨਾਂ ਲਈ ਸਿਫਾਰਸ਼ੀ ਯੁਕਤੀ ਹੈ।

stdio ਟ੍ਰਾਂਸਪੋਰਟ MCP ਸਰਵਰਾਂ ਨੂੰ ਮਰੀਜ਼ਾਂ ਨਾਲ ਸਟੈਂਡਰਡ ਇੰਪੁੱਟ ਅਤੇ ਆਉਟਪੁੱਟ ਸਟ੍ਰੀਮਾਂ ਰਾਹੀਂ ਗੱਲਬਾਤ ਕਰਨ ਦੇ ਯੋਗ ਬਣਾਉਂਦਾ ਹੈ। ਇਹ ਮੌਜੂਦਾ MCP ਨਿਰਧਾਰਨ ਵਿੱਚ ਸਭ ਤੋਂ ਆਮ ਅਤੇ ਸਿਫਾਰਸ਼ੀ ਟ੍ਰਾਂਸਪੋਰਟ ਮਕੈਨਿਜ਼ਮ ਹੈ, ਜੋ ਸਧਾਰਨ ਅਤੇ ਪ੍ਰਭਾਵਸ਼ালী ਢੰਗ ਨਾਲ MCP ਸਰਵਰ ਬਣਾਉਣ ਦੇ ਲਈ ਹੈ ਜੋ ਵੱਖ-ਵੱਖ ਕਲਾਇੰਟ ਐਪਲੀਕੇਸ਼ਨਾਂ ਨਾਲ ਆਸਾਨੀ ਨਾਲ ਇੰਟੀਗ੍ਰੇਟ ਹੋ ਸਕਦਾ ਹੈ।

## ਸੰਖੇਪ ਜਾਣਕਾਰੀ

ਇਸ ਪਾਠ ਵਿੱਚ ਅਸੀਂ stdio ਟ੍ਰਾਂਸਪੋਰਟ ਵਰਤੀ MCP ਸਰਵਰ ਬਣਾਉਣ ਅਤੇ ਉਪਭੋਗ ਕਰਨ ਦੇ ਢੰਗ ਨੂੰ ਕਵਰ ਕਰਾਂਗੇ।

## ਲਰਨਿੰਗ ਉਦੇਸ਼

ਇਸ ਪਾਠ ਦੇ ਅੰਤ ਵਿੱਚ, ਤੁਸੀਂ ਸਮਰੱਥ ਹੋਵੋਗੇ:

- stdio ਟ੍ਰਾਂਸਪੋਰਟ ਦੀ ਵਰਤੋਂ ਕਰਕੇ MCP ਸਰਵਰ ਬਣਾਉਣਾ।
- MCP ਇੰਸਪੈਕਟਰ ਦੀ ਵਰਤੋਂ ਕਰਕੇ MCP ਸਰਵਰ ਨੂੰ ਡਿਬੱਗ ਕਰਨਾ।
- Visual Studio Code ਦੀ ਵਰਤੋਂ ਕਰਕੇ MCP ਸਰਵਰ ਨੂੰ ਉਪਭੋਗ ਕਰਨਾ।
- ਮੌਜੂਦਾ MCP ਟ੍ਰਾਂਸਪੋਰਟ ਮਕੈਨਿਜ਼ਮ ਨੂੰ ਸਮਝਣਾ ਅਤੇ ਕਿਉਂ stdio ਸਿਫਾਰਸ਼ੀ ਹੈ।

## stdio ਟ੍ਰਾਂਸਪੋਰਟ - ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ

stdio ਟ੍ਰਾਂਸਪੋਰਟ ਮੌਜੂਦਾ MCP ਨਿਰਧਾਰਨ (2025-11-25) ਵਿੱਚ ਦੋ ਸਮਰਥਿਤ ਟ੍ਰਾਂਸਪੋਰਟ ਕਿਸਮਾਂ ਵਿੱਚੋਂ ਇੱਕ ਹੈ। ਇਹ ਦੇਖੋ ਕਿ ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ:

- **ਸਧਾਰਨ ਸੰਚਾਰ**: ਸਰਵਰ ਸਟੈਂਡਰਡ ਇੰਪੁੱਟ (`stdin`) ਤੋਂ JSON-RPC ਸੁਨੇਹੇ ਪੜ੍ਹਦਾ ਹੈ ਅਤੇ ਸਟੈਂਡਰਡ ਆਉਟਪੁੱਟ (`stdout`) ਨੂੰ ਸੁਨੇਹੇ ਭੇਜਦਾ ਹੈ।
- **ਪ੍ਰੋਸੈਸ-ਆਧਾਰਿਤ**: ਕਲਾਇੰਟ MCP ਸਰਵਰ ਨੂੰ ਇੱਕ ਸਬ-ਪ੍ਰੋਸੈਸ ਵਜੋਂ ਚਲਾਉਂਦਾ ਹੈ।
- **ਸੁਨੇਹਾ ਫਾਰਮੈਟ**: ਸੁਨੇਹੇ ਵਿਅਕਤਿਗਤ JSON-RPC ਬੇਨਤੀ, ਸੂਚਨਾ ਜਾਂ ਜਵਾਬ ਹੁੰਦੇ ਹਨ, ਜੋ ਨਵੀਂ ਲਾਈਨਾਂ ਨਾਲ ਵੱਖਰੇ ਹੁੰਦੇ ਹਨ।
- **ਲੌਗਿੰਗ**: ਸਰਵਰ ਲੌਗਿੰਗ ਲਈ ਸਟੈਡਰਰ (`stderr`) 'ਤੇ UTF-8 ਸਤਰਾਂ ਲਿਖ ਸਕਦਾ ਹੈ।

### ਮੁੱਖ ਲੋੜਾਂ:
- ਸੁਨੇਹੇ ਨਵੀਂ ਲਾਈਨਾਂ ਨਾਲ ਵੱਖਰੇ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ ਅਤੇ ਵਿੱਚਲੀ ਨਵੀਂ ਲਾਈਨਾਂ ਨਹੀਂ ਹੋਣੀਆਂ ਚਾਹੀਦੀਆਂ
- ਸਰਵਰ ਨੂੰ `stdout` ਤੇ ਕੋਈ ਐਸਾ ਡਾਟਾ ਨਹੀਂ ਲਿਖਣਾ ਚਾਹੀਦਾ ਜੋ ਵੈਧ MCP ਸੁਨੇਹਾ ਨਾ ਹੋਵੇ
- ਕਲਾਇੰਟ ਸਰਵਰ ਦੇ `stdin` 'ਤੇ ਕੋਈ ਐਸਾ ਡਾਟਾ ਨਹੀਂ ਲਿਖਣਾ ਚਾਹੀਦਾ ਜੋ ਵੈਧ MCP ਸੁਨੇਹਾ ਨਾ ਹੋਵੇ

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

ਉਪਰੋਕਤ ਕੋਡ ਵਿੱਚ:

- ਅਸੀਂ MCP SDK ਤੋਂ `Server` ਕਲਾਸ ਅਤੇ `StdioServerTransport` ਨੂੰ ਇੰਪੋਰਟ ਕਰਦੇ ਹਾਂ
- ਸਧਾਰਨ ਵਿਵਰਣ ਅਤੇ ਸਮਰੱਥਾਵਾਂ ਨਾਲ ਇੱਕ ਸਰਵਰ ਇੰਸਟੈਂਸ ਬਣਾਉਂਦੇ ਹਾਂ
- `StdioServerTransport` ਇੰਸਟੈਂਸ ਬਣਾਦੇ ਹਾਂ ਅਤੇ ਸਰਵਰ ਨੂੰ ਇਸ ਨਾਲ ਜੁੜਦੇ ਹਾਂ, ਜੋ stdin/stdout ਰਾਹੀਂ ਸੰਚਾਰ ਨੂੰ ਯਕੀਨੀ ਬਣਾਉਂਦਾ ਹੈ

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# ਸਰਵਰ ਇੰਸਟੈਂਸ ਬਣਾਓ
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

ਉਪਰੋਕਤ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- MCP SDK ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹੋਏ ਇੱਕ ਸਰਵਰ ਇੰਸਟੈਂਸ ਬਣਾਉਂਦੇ ਹਾਂ
- డెకੋਰੇਟਰਾਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਟੂਲਜ਼ ਪਰਿਭਾਸ਼ਿਤ ਕਰਦੇ ਹਾਂ
- stdio_server context ਮੈਨੇਜਰ ਦੀ ਸਹਾਇਤਾ ਨਾਲ ਟ੍ਰਾਂਸਪੋਰਟ ਨੂੰ ਸੰਭਾਲਦੇ ਹਾਂ

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

SSE ਤੋਂ ਮੁੱਖ ਅੰਤਰ ਇਹ ਹੈ ਕਿ stdio ਸਰਵਰ:

- ਵੈੱਬ ਸਰਵਰ ਸੈਟਅਪ ਜਾਂ HTTP ਅੰਤਬਿੰਦੂਆਂ ਦੀ ਲੋੜ ਨਹੀਂ ਰੱਖਦੇ
- ਕਲਾਇੰਟ ਵੱਲੋਂ ਸਬ-ਪ੍ਰੋਸੈਸ ਵਜੋਂ ਚਲਾਏ ਜਾਂਦੇ ਹਨ
- stdin/stdout ਸਟ੍ਰੀਮਾਂ ਰਾਹੀਂ ਗੱਲਬਾਤ ਕਰਦੇ ਹਨ
- ਇਕ ਸਰਲ ਅਤੇ ਡਿਬੱਗ ਕਰਨ ਵਿੱਚ ਆਸਾਨ ਹੁੰਦੇ ਹਨ

## ਅਭਿਆਸ: stdio ਸਰਵਰ ਬਣਾਉਣਾ

ਸਰਵਰ ਬਣਾਉਣ ਲਈ ਸਾਨੂੰ ਦੋ ਚੀਜ਼ਾਂ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖਣਾ ਹੈ:

- ਸਾਡੇ ਕੋਲ ਕਨੈਕਸ਼ਨ ਅਤੇ ਸੁਨੇਹਿਆਂ ਲਈ ਅੰਤਬਿੰਦੂਆਂ ਨੂੰ ਖੁਲ੍ਹਾ ਰੱਖਣ ਲਈ ਵੈੱਬ ਸਰਵਰ ਦੀ ਲੋੜ ਹੈ।

## ਲੈਬ: ਇੱਕ ਸਧਾਰਣ MCP stdio ਸਰਵਰ ਬਣਾਉਣਾ

ਇਸ ਲੈਬ ਵਿੱਚ ਅਸੀਂ ਸਿਫਾਰਸ਼ੀ stdio ਟ੍ਰਾਂਸਪੋਰਟ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਇੱਕ ਸਧਾਰਣ MCP ਸਰਵਰ ਬਣਾਵਾਂਗੇ। ਇਹ ਸਰਵਰ ਉਹ ਟੂਲਜ਼ ਉਪਲਬਧ ਕਰਵਾਏਗਾ ਜੋ ਮਰੀਜ਼ ਮਾਡਲ ਕੰਟੈਕਸਟ ਪ੍ਰੋਟੋਕੋਲ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕਾਲ ਕਰ ਸਕਦੇ ਹਨ।

### ਜ਼ਰੂਰੀ ਚੀਜ਼ਾਂ

- Python 3.8 ਜਾਂ ਰਿਪਲੇਟ
- MCP Python SDK: `pip install mcp`
- ਐਸਿੰਕ ਪ੍ਰੋਗ੍ਰਾਮਿੰਗ ਦੀ ਬੁਨਿਆਦੀ ਸਮਝ

ਆਓ ਆਪਣਾ ਪਹਿਲਾ MCP stdio ਸਰਵਰ ਬਣਾਉਣੀ ਸ਼ੁਰੂ ਕਰੀਏ:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# ਲੌਗਿੰਗ ਸੰਰਚਿਤ ਕਰੋ
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ਸਰਵਰ ਬਣਾਓ
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
    # stdio ਟ੍ਰਾਂਸਪੋਰਟ ਦੀ ਵਰਤੋਂ ਕਰੋ
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## ਅਪ੍ਰਚੀਨਤ SSE ਤਰੀਕੇ ਨਾਲ ਮੁੱਖ ਅੰਤਰ

**Stdio ਟ੍ਰਾਂਸਪੋਰਟ (ਮੌਜੂਦਾ ਮਿਆਰ):**
- ਸਧਾਰਨ ਸਬ-ਪ੍ਰੋਸੈਸ ਮਾਡਲ - ਕਲਾਇੰਟ ਸਰਵਰ ਨੂੰ ਚਾਈਲਡ ਪ੍ਰੋਸੈਸ ਵਜੋਂ ਚਲਾਉਂਦਾ ਹੈ
- stdin/stdout ਰਾਹੀਂ JSON-RPC ਸੁਨੇਹਿਆਂ ਨਾਲ ਸੰਚਾਰ
- HTTP ਸਰਵਰ ਸੈਟਅਪ ਦੀ ਲੋੜ ਨਹੀਂ
- ਬਿਹਤਰ ਪ੍ਰਦਰਸ਼ਨ ਅਤੇ ਸੁਰੱਖਿਆ
- ਆਸਾਨ ਡਿਬੱਗਿੰਗ ਅਤੇ ਵਿਕਾਸ

**SSE ਟ੍ਰਾਂਸਪੋਰਟ (MCP 2025-06-18 ਤੋਂ ਅਪ੍ਰਚੀਨਤ):**
- SSE ਅੰਤਬਿੰਦੂਆਂ ਵਾਲਾ HTTP ਸਰਵਰ ਲੋੜੀਂਦਾ
- ਵੈੱਬ ਸਰਵਰ ਇੰਫਰਾਸਟਰੱਕਚਰ ਨਾਲ ਜਟਿਲ ਸੈਟਅਪ
- HTTP ਅੰਤਬਿੰਦੂਆਂ ਲਈ ਵਾਧੂ ਸੁਰੱਖਿਆ ਗੱਲ-ਬਾਤ
- ਹੁਣ ਵੈੱਬ-ਆਧਾਰਿਤ ਘਟਨਾਵਾਂ ਲਈ Streamable HTTP ਨਾਲ ਬਦਲਿਆ ਗਿਆ

### stdio ਟ੍ਰਾਂਸਪੋਰਟ ਨਾਲ ਸਰਵਰ ਬਣਾਉਣਾ

ਸਰਵਰ ਬਣਾਉਣ ਲਈ ਸਾਨੂੰ:

1. **ਲੋੜੀਂਦੇ ਲਾਇਬ੍ਰੇਰੀਜ਼ ਇੰਪੋਰਟ ਕਰਨੀ** - MCP ਸਰਵਰ ਕਾਂਪੋਨੈਂਟ ਅਤੇ stdio ਟ੍ਰਾਂਸਪੋਰਟ ਦੀ ਲੋੜ ਹੈ
2. **ਸਰਵਰ ਇੰਸਟੈਂਸ ਤਿਆਰ ਕਰਨਾ** - ਸਮਰੱਥਾਵਾਂ ਨਾਲ ਸਰਵਰ ਨੂੰ ਪਰਿਭਾਸ਼ਿਤ ਕਰਨਾ
3. **ਟੂਲਜ਼ ਪਰਿਭਾਸ਼ਿਤ ਕਰਨਾ** - ਉਨ੍ਹਾਂ ਫੰਕਸ਼ਨਜ਼ ਨੂੰ ਜੋੜਨਾ ਜਿਹੜੇ ਅਸੀਂ ਖੁਲ੍ਹਾ ਕਰਵਾਉਣਾ ਚਾਹੁੰਦੇ ਹਾਂ
4. **ਟ੍ਰਾਂਸਪੋਰਟ ਸੈਟਅਪ ਕਰਨਾ** - stdio ਸੰਚਾਰ ਨੂੰ ਸੰਰਚਿਤ ਕਰਨਾ
5. **ਸਰਵਰ ਚਲਾਉਣਾ** - ਸਰਵਰ ਸ਼ੁਰੂ ਕਰਨਾ ਅਤੇ ਸੁਨੇਹੇ ਸੰਭਾਲਣਾ

ਆਓ ਇਹ ਕਦਮ-ਦਰ-কਦਮ ਕਰੀਏ:

### ਕਦਮ 1: ਬੇਸਿਕ stdio ਸਰਵਰ ਬਣਾਓ

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# ਲੌਗਿੰਗ ਨੂੰ ਸੰਰਚਿਤ ਕਰੋ
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ਸਰਵਰ ਬਣਾਓ
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

### ਕਦਮ 2: ਹੋਰ ਟੂਲਜ਼ ਜੋੜੋ

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

### ਕਦਮ 3: ਸਰਵਰ ਚਲਾਉਣਾ

ਕੋਡ ਨੂੰ `server.py` ਵਜੋਂ ਸੇਵ ਕਰੋ ਅਤੇ ਕਮਾਂਡ ਲਾਈਨ ਤੋਂ ਚਲਾਓ:

```bash
python server.py
```

ਸਰਵਰ ਸ਼ੁਰੂ ਹੋ ਜਾਏਗਾ ਅਤੇ stdin ਤੋਂ ਇਨਪੁੱਟ ਦੀ ਉਡੀਕ ਕਰੇਗਾ। ਇਹ stdio ਟ੍ਰਾਂਸਪੋਰਟ ਰਾਹੀਂ JSON-RPC ਸੁਨੇਹਿਆਂ ਨਾਲ ਸੰਚਾਰ ਕਰਦਾ ਹੈ।

### ਕਦਮ 4: ਇੰਸਪੈਕਟਰ ਨਾਲ ਟੈਸਟ ਕਰਨਾ

ਤੁਸੀਂ MCP ਇੰਸਪੈਕਟਰ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਆਪਣੇ ਸਰਵਰ ਦਾ ਟੈਸਟ ਕਰ ਸਕਦੇ ਹੋ:

1. ਇੰਸਪੈਕਟਰ ਇੰਸਟਾਲ ਕਰੋ: `npx @modelcontextprotocol/inspector`
2. ਇੰਸਪੈਕਟਰ ਚਲਾਓ ਅਤੇ ਆਪਣੇ ਸਰਵਰ ਨੂੰ ਦਰਸਾਓ
3. ਬਣਾਏ ਗਏ ਟੂਲਜ਼ ਦੀ ਜਾਂਚ ਕਰੋ

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```


## ਆਪਣੇ stdio ਸਰਵਰ ਨੂੰ ਡਿਬੱਗ ਕਰਨਾ

### MCP ਇੰਸਪੈਕਟਰ ਦੀ ਵਰਤੋਂ

MCP ਇੰਸਪੈਕਟਰ MCP ਸਰਵਰਾਂ ਲਈ ਡਿਬੱਗ ਅਤੇ ਟੈਸਟਿੰਗ ਦਾ ਇੱਕ ਕਦਰਯੋਗ ਸਾਧਨ ਹੈ। ਇਨ੍ਹਾਂ ਕਦਮਾਂ ਨਾਲ ਇਸਦਾ stdio ਸਰਵਰ ਨਾਲ ਸਹੀ ਉਪਯੋਗ ਕਰੋ:

1. **ਇੰਸਪੈਕਟਰ ਇੰਸਟਾਲ ਕਰੋ**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **ਇੰਸਪੈਕਟਰ ਚਲਾਓ**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **ਆਪਣੇ ਸਰਵਰ ਦੀ ਜਾਂਚ ਕਰੋ**: ਇੰਸਪੈਕਟਰ ਇੱਕ ਵੈੱਬ ਇੰਟਰਫੇਸ ਦਿੰਦਾ ਹੈ ਜਿੱਥੇ ਤੁਸੀਂ:
   - ਸਰਵਰ ਸਮਰੱਥਾਵਾਂ ਵੇਖ ਸਕਦੇ ਹੋ
   - ਵੱਖਰੇ ਪੈਰਾਮੀਟਰਾਂ ਨਾਲ ਟੂਲਜ਼ ਦਾ ਟੈਸਟ ਕਰ ਸਕਦੇ ਹੋ
   - JSON-RPC ਸੁਨੇਹਿਆਂ ਦੀ ਨਿਗਰਾਨੀ ਕਰ ਸਕਦੇ ਹੋ
   - ਕਨੈਕਸ਼ਨ ਸਮੱਸਿਆਵਾਂ ਨੂੰ ਡਿਬੱਗ ਕਰ ਸਕਦੇ ਹੋ

### VS Code ਦੀ ਵਰਤੋਂ

ਤੁਸੀਂ ਆਪਣੇ MCP ਸਰਵਰ ਨੂੰ ਸੀਧਾ VS Code ਵਿਚ ਵੀ ਡਿਬੱਗ ਕਰ ਸਕਦੇ ਹੋ:

1. `.vscode/launch.json` ਵਿੱਚ ਲਾਂਚ ਸੰਰਚਨਾ ਬਣਾਓ:
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

2. ਸਰਵਰ ਕੋਡ ਵਿੱਚ ਬ੍ਰੇਕਪੌਇੰਟ ਸੈੱਟ ਕਰੋ
3. ਡਿਬੱਗਰ ਚਲਾਓ ਅਤੇ ਇੰਸਪੈਕਟਰ ਨਾਲ ਟੈਸਟ ਕਰੋ

### ਆਮ ਡਿਬੱਗਿੰਗ ਸੁਝਾਅ

- ਲੌਗਿੰਗ ਲਈ `stderr` ਦੀ ਵਰਤੋਂ ਕਰੋ - ਕਦੇ ਵੀ `stdout` ਤੇ ਨਾ ਲਿਖੋ ਕਿਉਂਕਿ ਇਹ MCP ਸੁਨੇਹਿਆਂ ਲਈ ਰਿਜ਼ਰਵ ਹੈ
- ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਸਾਰੇ JSON-RPC ਸੁਨੇਹੇ ਨਵੀਂ ਲਾਈਨਾਂ ਨਾਲ ਵੱਖਰੇ ਹੋਣ
- ਪਹਿਲਾਂ ਸਧਾਰਨ ਟੂਲਜ਼ ਨਾਲ ਟੈਸਟ ਕਰੋ, ਫਿਰ ਜਟਿਲ ਫੰਕਸ਼ਨਾਲਿਟੀ ਸ਼ਾਮਲ ਕਰੋ
- ਸੁਨੇਹਾ ਫਾਰਮੈਟ ਤਸਦੀਕ ਕਰਨ ਲਈ ਇੰਸਪੈਕਟਰ ਦੀ ਵਰਤੋਂ ਕਰੋ

## ਆਪਣੇ stdio ਸਰਵਰ ਨੂੰ VS Code ਵਿੱਚ ਉਪਭੋਗ ਕਰਨਾ

ਜਦੋਂ ਤੁਸੀਂ MCP stdio ਸਰਵਰ ਬਣਾ ਲੈਂਦੇ ਹੋ, ਤਾਂ ਤੁਸੀਂ ਇਸ ਨੂੰ VS Code ਨਾਲ ਇੰਟੀਗ੍ਰੇਟ ਕਰ ਸਕਦੇ ਹੋ ਤਾਂ ਜੋ Claude ਜਾਂ ਹੋਰ MCP-ਅਨੁਕੂਲ ਕਲਾਇੰਟਾਂ ਨਾਲ ਵਰਤੋਂ ਕਰ ਸਕੋ।

### ਸੰਰਚਨਾ

1. ਇੱਕ MCP ਸੰਰਚਨਾ ਫਾਈਲ ਬਣਾਓ `%APPDATA%\Claude\claude_desktop_config.json` (ਵਿੰਡੋਜ਼) ਜਾਂ `~/Library/Application Support/Claude/claude_desktop_config.json` (ਮੈਕ):

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

2. **Claude ਨੂੰ ਰੀਸਟਾਰਟ ਕਰੋ**: ਨਵੀਂ ਸਰਵਰ ਸੰਰਚਨਾ ਲੋਡ ਕਰਨ ਲਈ Claude ਬੰਦ ਅਤੇ ਫੇਰ ਖੋਲ੍ਹੋ।

3. **ਕਨੈਕਸ਼ਨ ਦੀ ਜਾਂਚ ਕਰੋ**: Claude ਨਾਲ ਗੱਲਬਾਤ ਸ਼ੁਰੂ ਕਰੋ ਅਤੇ ਆਪਣੇ ਸਰਵਰ ਦੇ ਟੂਲਜ਼ ਦੀ ਵਰਤੋਂ ਕਰ ਦੇਖੋ:
   - "ਕੀ ਤੁਸੀਂ ਮੁਝੇ ਗ੍ਰੀਟਿੰਗ ਟੂਲ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਮਿਲਾ ਸਕਦੇ ਹੋ?"
   - "15 ਅਤੇ 27 ਦਾ ਜੋੜ ਕਿਵੇਂ ਕੱਢਣਾ ਹੈ?"
   - "ਸਰਵਰ ਜਾਣਕਾਰੀ ਕੀ ਹੈ?"

### TypeScript stdio ਸਰਵਰ ਉਦਾਹਰਨ

ਇੱਥੇ ਇੱਕ ਪੂਰਾ TypeScript ਉਦਾਹਰਨ ਦਿੱਤਾ ਗਿਆ ਹੈ:

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

// ਟੂਲਜ਼ ਸ਼ਾਮਲ ਕਰੋ
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

### .NET stdio ਸਰਵਰ ਉਦਾਹਰਨ

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

## ਸੰਖੇਪ

ਇਸ ਅੱਪਡੇਟ ਕੀਤੇ ਪਾਠ ਵਿੱਚ, ਤੁਸੀਂ ਸਿੱਖਿਆ ਕਿ:

- ਮੌਜੂਦਾ **stdio ਟ੍ਰਾਂਸਪੋਰਟ** ਦੀ ਵਰਤੋਂ ਕਰਕੇ MCP ਸਰਵਰ ਬਣਾਉਣਾ (ਸਿਫਾਰਸ਼ੀ ਢੰਗ)
- ਕਿਉਂ SSE ਟ੍ਰਾਂਸਪੋਰਟ ਨੂੰ stdio ਅਤੇ Streamable HTTP ਲਈ ਅਪ੍ਰਚੀਨਤ ਕਰ ਦਿੱਤਾ ਗਿਆ
- ਉਹ ਟੂਲ ਬਣਾਉਣਾ ਜੋ MCP ਕਲਾਇੰਟ ਕਾਲ ਕਰ ਸਕਦੇ ਹਨ
- MCP ਇੰਸਪੈਕਟਰ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਆਪਣੇ ਸਰਵਰ ਨੂੰ ਡਿਬੱਗ ਕਰਨਾ
- VS Code ਅਤੇ Claude ਨਾਲ ਆਪਣੇ stdio ਸਰਵਰ ਦਾ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਕਰਨਾ

stdio ਟ੍ਰਾਂਸਪੋਰਟ ਥੋੜਾ ਜਿਆਦਾ ਸਰਲ, ਜ਼ਿਆਦਾ ਸੁਰੱਖਿਅਤ ਅਤੇ ਬਿਹਤਰ ਪਰਫਾਰਮੈਂਸ ਦੇ ਨਾਲ MCP ਸਰਵਰ ਬਣਾਉਣ ਦਾ ਢੰਗ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ, ਤੁਲਨਾਤਮਕ ਤੌਰ 'ਤੇ ਅਪ੍ਰਚੀਨਤ SSE ਢੰਗ ਨਾਲ। ਇਹ ਜ਼ਿਆਦਾਤਰ MCP ਸਰਵਰ ਕਾਰਜਕਾਰੀਕਰਨਾਂ ਲਈ 2025-06-18 ਨਿਰਧਾਰਨ ਅਨੁਸਾਰ ਸਿਫਾਰਸ਼ੀ ਟ੍ਰਾਂਸਪੋਰਟ ਹੈ।

### .NET

1. ਆਓ ਪਹਿਲਾਂ ਕੁਝ ਟੂਲ ਬਣਾਈਏ, ਇਸ ਲਈ ਅਸੀਂ ਇੱਕ ਫਾਈਲ *Tools.cs* ਬਣਾਵਾਂਗੇ ਜਿਸ ਵਿੱਚ ਹੇਠਾਂ ਦਿੱਤੀ ਸਮੱਗਰੀ ਹੋਵੇਗੀ:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## ਅਭਿਆਸ: ਆਪਣੇ stdio ਸਰਵਰ ਦਾ ਟੈਸਟ ਕਰਨਾ

ਹੁਣ ਜਦੋਂ ਤੁਸੀਂ ਆਪਣੇ stdio ਸਰਵਰ ਨੂੰ ਬਣਾ ਲਿਆ ਹੈ, ਆਓ ਟੈਸਟ ਕਰੀਏ ਇਹ ਯਕੀਨੀ ਬਣਾਉਣ ਲਈ ਕਿ ਇਹ ਸਹੀ ਤਰ੍ਹਾਂ ਕੰਮ ਕਰਦਾ ਹੈ।

### ਜ਼ਰੂਰੀ ਚੀਜ਼ਾਂ

1. ਯਕੀਨੀ ਬਣਾਓ ਕਿ MCP ਇੰਸਪੈਕਟਰ ਇੰਸਟਾਲ ਹੈ:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. ਆਪਣਾ ਸਰਵਰ ਕੋਡ ਸੰਭਾਲ ਕੇ ਰੱਖੋ (ਉਦਾਹਰਨ ਵਜੋਂ `server.py` ਵਜੋਂ)

### ਇੰਸਪੈਕਟਰ ਨਾਲ ਟੈਸਟ ਕਰਨਾ

1. **ਆਪਣੇ ਸਰਵਰ ਨਾਲ ਇੰਸਪੈਕਟਰ ਸ਼ੁਰੂ ਕਰੋ**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **ਵੈੱਬ ਇੰਟਰਫੇਸ ਖੋਲ੍ਹੋ**: ਇੰਸਪੈਕਟਰ ਬਰਾਊਜ਼ਰ ਵਿੱਚ ਇੱਕ ਵਿੰਡੋ ਖੋਲ੍ਹੇਗਾ ਜੋ ਤੁਹਾਡੇ ਸਰਵਰ ਦੀਆਂ ਸਮਰੱਥਾਵਾਂ ਦਿਖਾਏਗਾ।

3. **ਟੂਲਜ਼ ਦੀ ਜਾਂਚ ਕਰੋ**:
   - ਵੱਖਰੇ ਨਾਮਾਂ ਨਾਲ `get_greeting` ਟੂਲ ਕੋ ਲਓ
   - ਵੱਖਰੇ ਅੰਕਾਂ ਨਾਲ `calculate_sum` ਟੈਸਟ ਕਰੋ
   - `get_server_info` ਟੂਲ ਨੂੰ ਕਾਲ ਕਰੋ ਅਤੇ ਸਰਵਰ ਦੀ ਮੈਟਾਡੇਟਾ ਦੇਖੋ

4. **ਸੰਚਾਰ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ**: ਇੰਸਪੈਕਟਰ ਕਲਾਇੰਟ ਅਤੇ ਸਰਵਰ ਵਿਚਕਾਰ ਬਦਲੇ ਜਾ ਰਹੇ JSON-RPC ਸੁਨੇਹਿਆਂ ਨੂੰ ਦਿਖਾਉਂਦਾ ਹੈ।

### ਜੋ ਤੁਸੀਂ ਵੇਖਨਾ ਚਾਹੀਦਾ ਹੈ

ਜਦੋਂ ਤੁਹਾਡਾ ਸਰਵਰ ਸਹੀ ਤਰੀਕੇ ਨਾਲ ਸ਼ੁਰੂ ਹੁੰਦਾ ਹੈ, ਤੁਸੀਂ ਦੇਖੋਗੇ:
- ਇੰਸਪੈਕਟਰ ਵਿੱਚ ਸਰਵਰ ਸਮਰੱਥਾਵਾਂ ਦੀ ਸੂਚੀ
- ਟੈਸਟਿੰਗ ਲਈ ਮਨਜੂਰਸ਼ੁਦਾ ਟੂਲਜ਼
- ਸਫਲ JSON-RPC ਸੁਨੇਹਾ ਲੇਂਦਾਂਦੈਂ
- ਇੰਟਰਫੇਸ ਵਿੱਚ ਟੂਲਾਂ ਦੇ ਜਵਾਬ

### ਆਮ ਸਮੱਸਿਆਵਾਂ ਅਤੇ ਹੱਲ

**ਸਰਵਰ ਸ਼ੁਰੂ ਨਹੀਂ ਹੋ ਰਿਹਾ:**
- ਯਕੀਨੀ ਬਣਾਓ ਸਾਰੀਆਂ ਡਿਪੈਂਡੈਂਸੀਆਂ ਇੰਸਟਾਲ ਹਨ: `pip install mcp`
- Python ਵਾਕਰਚਨਾ ਅਤੇ ਇੰਡੈਂਟੇਸ਼ਨ ਚੈੱਕ ਕਰੋ
- ਕਨਸੋਲ ਵਿੱਚ ਕੋਈ ਗ਼ਲਤੀ ਸੁਨੇਹੇ ਖੋਜੋ

**ਟੂਲਜ਼ ਦਿਖਾਈ ਨਹੀਂ ਦੇ ਰਹੇ:**
- ਯਕੀਨੀ ਬਣਾਓ ਕਿ `@server.tool()` ਡੇਕੋਰੇਟਰ ਮੌਜੂਦ ਹਨ
- ਟੂਲ ਫੰਕਸ਼ਨਾਂ ਨੂੰ `main()` ਤੋਂ ਪਹਿਲਾਂ ਪਰਿਭਾਸ਼ਿਤ ਕੀਤਾ ਗਿਆ ਹੈ
- ਸਰਵਰ ਸਹੀ ਤਰੀਕੇ ਨਾਲ ਸੰਰਚਿਤ ਹੈ

**ਕਨੈਕਸ਼ਨ ਸਮੱਸਿਆਵਾਂ:**
- ਸਰਵਰ stdio ਟ੍ਰਾਂਸਪੋਰਟ ਸਹੀ ਤਰੀਕੇ ਨਾਲ ਵਰਤ ਰਿਹਾ ਹੈ ਇਹ ਚੈੱਕ ਕਰੋ
- ਹੋਰ ਕੋਈ ਪ੍ਰੋਸੈਸ ਹਸਤਖੇਪ ਨਹੀਂ ਕਰ ਰਹੇ
- ਇੰਸਪੈਕਟਰ ਕਮਾਂਡ ਵਾਕਰਚਨਾ ਜਾਂਚ ਕਰੋ

## ਅਸਾਈਨਮੈਂਟ

ਆਪਣੇ ਸਰਵਰ ਵਿੱਚ ਹੋਰ ਸਮਰੱਥਾਵਾਂ ਜੋੜਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ। ਉਦਾਹਰਨ ਲਈ, [ਇਸ ਸਫ਼ੇ](https://api.chucknorris.io/) ਤੇ ਜਾਂ ਕੇ ਕੋਈ ਐਸਾ ਟੂਲ ਜੋ ਏਪੀਅਈ ਕਾਲ ਕਰਦਾ ਹੈ, ਬਣਾਓ। ਤੁਸੀਂ ਨਿਰਧਾਰਤ ਕਰੋ ਕਿ ਸਰਵਰ ਕਿਵੇਂ ਦਿਖਣਾ ਚਾਹੀਦਾ ਹੈ। ਮਜ਼ੇ ਕਰੋ :)

## ਹੱਲ

[ਹੱਲ](./solution/README.md) - ਇੱਥੇ ਇੱਕ ਸੰਭਾਵਿਤ ਹੱਲ ਹੈ ਜਿਸ ਵਿੱਚ ਕੰਮ ਕਰਦਾ ਕੋਡ ਦਿੱਤਾ ਗਿਆ ਹੈ।

## ਮੁੱਖ ਸਿੱਖਣ ਵਾਲੀਆਂ ਗੱਲਾਂ

ਇਸ ਅਧਿਆਇ ਤੋਂ ਮੁੱਖ ਸਿੱਖਣ ਵਾਲੀਆਂ ਗੱਲਾਂ ਇਹ ਹਨ:

- stdio ਟ੍ਰਾਂਸਪੋਰਟ ਸਥਾਨਕ MCP ਸਰਵਰਾਂ ਲਈ ਸਿਫਾਰਸ਼ੀ ਮਕੈਨਿਜ਼ਮ ਹੈ।
- stdio ਟ੍ਰਾਂਸਪੋਰਟ MCP ਸਰਵਰਾਂ ਅਤੇ ਕਲਾਇੰਟਾਂ ਵਿਚਕਾਰ ਸਟੈਂਡਰਡ ਇੰਪੁੱਟ ਅਤੇ ਆਉਟਪੁੱਟ ਸਟ੍ਰੀਮਾਂ ਰਾਹੀਂ ਨਿਰੰਤਰ ਸੰਚਾਰ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।
- ਤੁਸੀਂ ਇੰਸਪੈਕਟਰ ਅਤੇ Visual Studio Code ਦੋਹਾਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਸੀਧਾ stdio ਸਰਵਰਾਂ ਨੂੰ ਉਪਭੋਗ ਕਰ ਸਕਦੇ ਹੋ, ਜਿਸ ਨਾਲ ਡਿਬੱਗ ਅਤੇ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਆਸਾਨ ਹੁੰਦਾ ਹੈ।

## ਨਮੂਨੇ

- [Java ਕੈਲਕੁਲੇਟਰ](../samples/java/calculator/README.md)
- [.Net ਕੈਲਕੁਲੇਟਰ](../../../../03-GettingStarted/samples/csharp)
- [JavaScript ਕੈਲਕੁਲੇਟਰ](../samples/javascript/README.md)
- [TypeScript ਕੈਲਕੁਲੇਟਰ](../samples/typescript/README.md)
- [Python ਕੈਲਕੁਲੇਟਰ](../../../../03-GettingStarted/samples/python)

## ਵਾਧੂ ਸਰੋਤ

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## ਅਗਲਾ ਕੀ ਹੈ

## ਅਗਲੇ ਕਦਮ

ਹੁਣ ਜਦੋਂ ਤੁਸੀਂ stdio ਟ੍ਰਾਂਸਪੋਰਟ ਨਾਲ MCP ਸਰਵਰ ਬਣਾਉਣਾ ਸਿੱਖ ਲਿਆ ਹੈ, ਤੁਸੀਂ ਵਧੀਆ ਵਿਸ਼ਿਆਂ ਦੀ ਖੋਜ ਕਰ ਸਕਦੇ ਹੋ:

- **ਅਗਲਾ**: [MCP ਨਾਲ HTTP ਸਟ੍ਰੀਮਿੰਗ (Streamable HTTP)](../06-http-streaming/README.md) - ਦੂਰੇ ਸਰਵਰਾਂ ਲਈ ਹੋਰ ਸਮਰਥਿਤ ਟ੍ਰਾਂਸਪੋਰਟ ਮਕੈਨਿਜ਼ਮ ਬਾਰੇ ਸਿੱਖੋ
- **ਅਗਾਂਹ ਵਧਦਿਆਂ**: [MCP ਸੁਰੱਖਿਆ ਦੀਆਂ ਚੰਗੀਆਂ ਅਭਿਆਸਾਂ](../../02-Security/README.md) - MCP ਸਰਵਰਾਂ ਵਿੱਚ ਸੁਰੱਖਿਆ ਲਾਗੂ ਕਰੋ
- **ਉਤਪਾਦਨ**: [ਡਿਪਲੋਇਮੈਂਟ ਸਟ੍ਰੈਟਜੀਆਂ](../09-deployment/README.md) - ਉਤਪਾਦਨ ਲਈ ਆਪਣੇ ਸਰਵਰਾਂ ਨੂੰ ਤਿਆਰ ਕਰੋ

## ਵਾਧੂ ਸਰੋਤ

- [MCP ਨਿਰਧਾਰਨ 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - ਅਧਿਕਾਰਤ ਨਿਰਧਾਰਨ
- [MCP SDK ਡੌਕਯੂਮੈਂਟੇਸ਼ਨ](https://github.com/modelcontextprotocol/sdk) - ਸਾਰੀਆਂ ਭਾਸ਼ਾਵਾਂ ਲਈ SDK ਰੈਫਰੈਂਸ
- [ਕਮਿਊਨਿਟੀ ਉਦਾਹਰਨਾਂ](../../06-CommunityContributions/README.md) - ਕਮਿਊਨਿਟੀ ਵੱਲੋਂ ਹੋਰ ਸਰਵਰ ਉਦਾਹਰਨਾਂ

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->