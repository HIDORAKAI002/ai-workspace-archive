# stdio போக்குவரத்துடன் MCP சர்வர்

> **⚠️ முக்கிய புதுப்பிப்பு**: MCP விவரக்குறிப்பு 2025-06-18 முதல், தனிப்பட்ட SSE (சர்வர்-வழங்கிய நிகழ்வுகள்) போக்குவரத்து **இறக்குமதி செய்யப்பட்டுள்ளது** மற்றும் "Streamable HTTP" போக்குவரத்தால் மாற்றப்பட்டுள்ளது. தற்போதைய MCP விவரக்குறிப்பு இரண்டு முக்கிய போக்குவரத்து முறைகளை வரையறுக்கிறது:
> 1. **stdio** - நிலையான உள்ளீடு/வெளியீடு (உள்ளூர்ச் சர்வர்களுக்கு பரிந்துரைக்கப்படுகிறது)
> 2. **Streamable HTTP** - SSE ஐ உள்ளகமாக பயன்படுத்தக்கூடிய தொலைநிலைய சர்வர்களுக்கு
>
> இந்த பாடம் பெரும்பாலான MCP சர்வர் நடைமுறைகளிற்கு பரிந்துரைக்கப்படும் **stdio போக்குவரத்தைக்** கவனமாக எடுத்துக்கொள்ள புதியவிதமாக்கப்பட்டுள்ளது.

stdio போக்குவரத்து MCP சர்வர்களுக்கும் கிளையன்களுக்கும் நிலையான உள்ளீடு மற்றும் வெளியீடு ஸ்திரங்கள் மூலம் தொடர்பு கொள்ள அனுமதிக்கிறது. இது தற்போதைய MCP விவரக்குறிப்பில் மிகவும் பொதுவாகப் பயன்படுத்தப்படும் மற்றும் பரிந்துரைக்கப்பட்ட போக்குவரத்து நடைமுறை ஆகும், இது பல்வேறு கிளையன்ட் செயலிகளுடன் எளிதில் ஒருங்கிணைக்கக்கூடிய MCP சர்வர்களை எளிதாகவும் திறம்படவும் உருவாக்குவதற்கு ஒரு எளிய மற்றும் பயனுள்ள வழியை வழங்குகிறது.

## கண்ணோட்டம்

இந்த பாடம் stdio போக்குவரத்தைப் பயன்படுத்தி MCP சர்வர்களை எவ்வாறு கட்டி பயன்படுத்துவது என்பதை எடுத்துக்காட்டுகிறது.

## கற்றல் நோக்குக்கள்

இந்த பாடத்தின் முடிவில், நீங்கள் திறன்பட முடியும்:

- stdio போக்குவரத்தைப் பயன்படுத்தி MCP சர்வரை உருவாக்க
- Inspector ஐப் பயன்படுத்தி MCP சர்வரை பிழைத்திருத்தவும்
- Visual Studio Code ஐப் பயன்படுத்தி MCP சர்வரை பயன்படுத்தவும்
- தற்போதைய MCP போக்குவரத்து முறைமைகளை மற்றும் stdio ஏன் பரிந்துரைக்கப்படுகிறது என்பதை புரிந்து கொள்.

## stdio போக்குவரத்து - அது எவ்வாறு இயங்குகிறது

stdio போக்குவரத்து தற்போது MCP விவரக்குறிப்பு (2025-11-25) இல் ஆதரிக்கப்படும் இரண்டு போக்குவரத்து வகைகளில் ஒன்றாகும். இது எவ்வாறு இயங்குகிறதென கீழே கூறப்பட்டுள்ளது:

- **எளிய தொடர்பு**: சர்வர் நிலையான உள்ளீடு (`stdin`) இலிருந்து JSON-RPC செய்திகளை வாசித்து, நிலையான வெளியீடு (`stdout`) க்கு செய்திகள் அனுப்புகிறது.
- **செயல்முறை அடிப்படையில்**: கிளையன் MCP சர்வரை ஒரு துணை செயலாகத் தொடங்கு.
- **செய்தி வடிவம்**: செய்திகள் தனித்த JSON-RPC கோரிக்கைகள், அறிவிப்புகள் அல்லது பதில்கள் ஆகும், அவை வரிசையால் பிரிக்கப்பட்டவை.
- **பதிவேடு**: பதிவு நோக்கங்களுக்காக சர்வர் நிலையான பிழை (`stderr`) க்கு UTF-8 சரங்களை எழுதலாம்.

### முக்கிய தேவைகள்:
- செய்திகள் வரிசையால் பிரிக்கப்பட வேண்டும் மற்றும் உட்பட புதிய வரிசைகள் இருக்கக்கூடாது
- சர்வர் செல்லுபடியாகும் MCP செய்தியல்லாத எந்தவையும் `stdout` க்கு எழுத கூடாது
- கிளையன் செல்லுபடியாகும் MCP செய்தியல்லாத எந்தவையும் சர்வரின் `stdin` க்கு எழுத கூடாது

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

மேலே உள்ள கோடில்:

- MCP SDK இலிருந்து `Server` வகுப்பையும் `StdioServerTransport` ஐ இறக்குமதி செய்கிறோம்
- அடிப்படை அமைப்புகளுடன் ஒரு சர்வர் உருவாக்குகிறோம்
- ஒரு `StdioServerTransport` உருவாக்கி, சர்வரை அதனுடன் இணைத்து stdin/stdout வழியாக தொடர்பு ஏற்படுத்துவோம்

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# சேவையக உதாரணத்தை உருவாக்கு
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

மேலே உள்ள கோடில்:

- MCP SDK ஐ பயன்படுத்தி ஒரு சர்வர் உருவாக்குகிறோம்
- அலங்காரங்கள் மூலம் கருவிகளை வரையறுக்கிறோம்
- போக்குவரத்தை கையாள stdio_server context மேலாளரை பயன்படுத்துகிறோம்

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

SSE என்று இருந்தவற்றுடன் stdio சர்வர்களின் முக்கிய வேறுபாடு:

- வெப் சர்வர் அமைப்பு அல்லது HTTP முனைகள் தேவையில்லை
- கிளையன் துணை செயலாக சர்வரை தொடங்கும்
- stdin/stdout ஸ்திரங்கள் மூலம் தொடர்பு கொள்ளும்
- எளிதில் இயக்கு மற்றும் பிழைத்திருத்தம் செய்யக்கூடியவை

## பயிற்சி: stdio சர்வர் உருவாக்குதல்

எங்கள் சர்வரை உருவாக்க, இரண்டு விஷயங்கள் முக்கியமாக கவனிக்க வேண்டியவை:

- இணைப்புக்கு மற்றும் செய்திகளுக்கு வெப் சர்வரை பயன்படுத்தி முனைகள் வெளிப்படுத்த வேண்டும்.

## பயிற்சி ஆய்வு: எளிய MCP stdio சர்வர் உருவாக்குதல்

இந்த ஆய்வில், பரிந்துரைக்கப்படும் stdio போக்குவரத்தைப் பயன்படுத்தி ஒரு எளிய MCP சர்வரை உருவாக்குவோம். இந்த சர்வர் கிளையன்கள் பயன் படுத்தக்கூடிய கருவிகளை வெளியிடும்.

### தேவைகள்

- Python 3.8 அல்லது பின்னர்
- MCP Python SDK: `pip install mcp`
- அசிங்க் திட்டமிடலின் அடிப்படை புரிதல்

நாம் எங்கள் முதல் MCP stdio சர்வரை உருவாக்குவோம்:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# பதிவு செயலைச் சேர்க்கவும்
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# சேவையகத்தை உருவாக்கு
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
    # stdio போக்குவரத்தை பயன்படுத்துங்கள்
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## தவிர்க்கப்பட்ட SSE பாணியுடன் ஒப்பிடும் முக்கிய வேறுபாடுகள்

**Stdio போக்குவரத்து (தற்போதைய நடைமுறை):**
- எளிய துணை செயல்முறை மாதிரி - கிளையன் சர்வரை குழந்தை செயலாக ஆரம்பிக்கும்
- JSON-RPC செய்திகளைப் பயன்படுத்தி stdin/stdout வழியாக தொடர்பு
- HTTP சர்வர் அமைப்பு தேவையில்லை
- சிறந்த செயல்திறன் மற்றும் பாதுகாப்பு
- எளிதில் பிழைத்திருத்தலும் வளர்ச்சியும்

**SSE போக்குவரத்து (MCP 2025-06-18 முதல் தவிர்க்கப்பட்டது):**
- HTTP சர்வர் மற்றும் SSE முனைகள் அவசியம்
- வலை சர்வர் கட்டமைப்புடன் கூடுதல் சிக்கல்கள்
- HTTP முனைகளுக்கான கூடுதல் பாதுகாப்பு பரிசீலனைகள்
- தற்போது வலை அடிப்படையிலான காட்சிகளுக்கு Streamable HTTP கொண்டு மாறியுள்ளது

### stdio போக்குவரத்துடன் சர்வர் உருவாக்குதல்

stdio சர்வர் உருவாக்க:

1. **தேவைப்படும் நூலகங்களை இறக்குமதி செய்** - MCP சர்வர் கூறுகள் மற்றும் stdio போக்குவரத்தை எடுத்துக்கொள்.
2. **ஒரு சர்வர் உருவாக்கு** - அதன் திறன்கள் உடன் நிலைநிறுத்து.
3. **கருவிகளை வரையறு** - வெளிப்படுத்த விரும்பும் செயல்பாட்டையும் சேர்க்க.
4. **போக்குவரத்தை அமைக்கவும்** - stdio தொடர்பை கட்டமைக்கவும்.
5. **சர்வரை இயக்கவும்** - சர்வரை தொடங்கி, மூலம் வரும் செய்திகளை கையாளவும்.

இதனை படிப்படியாக கட்டமைப்போம்:

### படி 1: அடிப்படைக் stdio சர்வர் உருவாக்கும்

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# பதிவு செய்வதற்கு அமைவுகளை அமைக்கவும்
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# சர்வரை உருவாக்கவும்
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

### படி 2: மேலும் கருவிகள் சேர்க்கவும்

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

### படி 3: சர்வரை இயக்குதல்

கோப்பை `server.py` எனச் சேமித்து, கட்டளைப் பிரதிநிதியில் இயக்கவும்:

```bash
python server.py
```

சர்வர் துவங்கி, stdin இலிருந்து உள்ளீட்டை எதிர்பார்க்கும். stdio போக்குவரத்திலான JSON-RPC செய்திகளில் தொடர்பு கொள்ளும்.

### படி 4: Inspector மூலம் சோதனை செய்தல்

உங்கள் சர்வரை MCP Inspector கொண்டு சோதிக்கலாம்:

1. Inspector ஐ நிறுவவும்: `npx @modelcontextprotocol/inspector`
2. Inspector ஐ இயக்கி உங்கள் சர்வரை குறிக்கவும்
3. உருவாக்கிய கருவிகளை சோதிக்கவும்

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## உங்கள் stdio சர்வரை படி படியாக பிழைத்திருத்துதல்

### MCP Inspector ஐப் பயன்படுத்துதல்

MCP Inspector MCP சர்வர்களை பிழைத்திருத்தவும் சோதிக்கவும் சிறந்த கருவியாக இருக்கிறது. stdio சர்வருடன் இதைப் பயன்படுத்தும் முறை:

1. **Inspector ஐ நிறுவவும்**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Inspector ஐ இயக்கவும்**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **உங்கள் சர்வரை சோதிக்கவும்**: Inspector வெப் இடைமுகத்தை வழங்குகிறது, இதில் நீங்கள்:
   - சர்வர் திறன்களை பார்க்க
   - வேறு வேறு அளவுகள் கொண்டு கருவிகளை சோதிக்க
   - JSON-RPC செய்திகளை கண்காணிக்க
   - இணைப்பு பிரச்சனைகளை பிழைத்திருத்த

### VS Code பயன்படுத்துதல்

நேரடியாக VS Code இல் உங்கள் MCP சர்வரை பிழைத்திருத்தலாம்:

1. `.vscode/launch.json` இல் ஒரு லாஞ்ச் அமைப்பை உருவாக்குக:
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

2. சர்வர் கோடுகளில் இடம்கொள்ளும்குறியிடங்களை அமைக்கவும்
3. பிழைத்திருத்தியை இயக்கி Inspector உடன் சோதனை செய்யவும்

### பொதுவான பிழைத்திருத்த குறிப்புகள்

- பதிவு நோக்கங்களுக்காக `stderr` ஐ பயன்படுத்தவும் - MCP செய்திகளுக்கு மட்டும் பயன்படுத்தப்படும் `stdout` க்கு எழுத வேண்டாம்
- அனைத்து JSON-RPC செய்திகள் வரிசையால் பிரிக்கப்பட்டிருப்பதை உறுதிப்படுத்துக
- முதலில் எளிய கருவிகளை சோதித்து பின்னர் சிக்கலான செயல்பாடுகளைச் சேர்க்கவும்
- செய்தி வடிவங்களை சரிபார்க்க Inspector ஐ பயன்படுத்தவும்

## VS Code இல் உங்கள் stdio சர்வரை பயன்படுத்துதல்

MCP stdio சர்வரை கட்டி விட்ட பின், அதை Claude அல்லது பிற MCP-ஒத்துழைக்கும் கிளையன்களுடன் பயன்படுத்த VS Code உடன் ஒருங்கிணைக்கலாம்.

### அமைப்புகள்

1. **MCP அமைப்பு கோப்பை உருவாக்குக** `%APPDATA%\Claude\claude_desktop_config.json` (Windows) அல்லது `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Claude ஐ மீண்டும் துவக்கவும்**: புதிய சர்வர் அமைப்பை ஏற்ற Claude ஐ மூடி மீண்டும் தொடங்கவும்.

3. **இணைப்பை சோதிக்கவும்**: Claude உடன் உரையாடலைத் தொடங்கி உங்கள் சர்வர் கருவிகளை பயன்படுத்த முயற்சிக்கவும்:
   - "வணக்கம் கருவியைக் கொண்டு எனக்கு வணக்கம் கூற முடியுமா?"
   - "15 மற்றும் 27 இன் கூட்டுத்தொகையை கணக்கிடு"
   - "சர்வர் தகவல் என்ன?"

### TypeScript stdio சர்வர் எடுத்துக்காட்டு

இங்கே முழுமையான TypeScript எடுத்துக்காட்டு குறிப்பிடப்பட்டுள்ளது:

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

// பயிற்சிகளை சேர்க்கவும்
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

### .NET stdio சர்வர் எடுத்துக்காட்டு

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

## சுருக்கம்

இந்த புதுப்பிக்கப்பட்ட பாடத்தில் நீங்கள் கற்றது:

- தற்போதைய **stdio போக்குவரத்தை** (பரிந்துரைக்கப்படும் முறை) பயன்படுத்தி MCP சர்வர்களை உருவாக்குவது
- SSE போக்குவரத்தை தவிர்த்து stdio மற்றும் Streamable HTTP ஏன் பரிந்துரைக்கப்படுகிறது என்பதை புரிந்து கொள்வது
- MCP கிளையன்கள் மூலம் அழைக்கக்கூடிய கருவிகளை உருவாக்கல்
- MCP Inspector கொண்டு உங்கள் சர்வரை பிழைத்திருத்தல்
- VS Code மற்றும் Claude உடன் உங்கள் stdio சர்வரை ஒருங்கிணைத்தல்

stdio போக்குவரத்து தவிர்க்கப்பட்ட SSE முறையைவிட எளிமையானது, அதிக பாதுகாப்பானது மற்றும் செயல்திறன் மேம்பட்டதாக MCP சர்வர்கள் உருவாக்குவதற்கு வழிகாட்டுகிறது. 2025-06-18 குறிப்பிடப்பட்ட MCP விவரக்குறிப்புக்கு இது பெரும்பான்மையான MCP சர்வர் நடைமுறைகளுக்கான பரிந்துரைக்கப்பட்ட போக்குவரத்து ஆகும்.

### .NET

1. முதலில் சில கருவிகளைக் கற்போம், இதற்காக *Tools.cs* என்ற கோப்பை பின்வரும் உள்ளடக்கத்துடன் உருவாக்குவோம்:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## பயிற்சி: உங்கள் stdio சர்வரை சோதனை செய்தல்

இப்போது உங்கள் stdio சர்வரை கட்டியுள்ளதால், அது சரியாக இயங்குகிறதா என்று சோதிக்கலாம்.

### தேவைகள்

1. MCP Inspector நிறுவியுள்ளதை உறுதி செய்யவும்:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. உங்கள் சர்வர் கோடு சேமிக்கப்பட்டது (எ.கா., `server.py`)

### Inspector உடன் சோதனை செய்யும் முறை

1. **உங்கள் சர்வருடன் Inspector தொடங்கு**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **வெபு இடைமுகத்தைத் திறக்கவும்**: Inspector உங்களின் சர்வர் திறன்களை காட்டும் உலாவி சாளரத்தை திறக்கும்.

3. **கருவிகளை சோதிக்கவும்**:
   - `get_greeting` கருவியை வெவ்வேறு பெயர்களுடன் முயற்சி செய்யவும்
   - `calculate_sum` கருவியை பல எண்களுடன் சோதிக்கவும்
   - சர்வர் விவரங்களை காண `get_server_info` கருவியை அழைக்கவும்

4. **தொடர்பை கண்காணிக்கவும்**: Inspector கிளையனும் சர்வருமான JSON-RPC செய்தி பரிமாற்றத்தை காட்டுகிறது.

### நீங்கள் காண வேண்டியது

சர்வர் சரியாக துவங்கும்போது, நீங்கள் காண வேண்டும்:
- Inspector இல் சர்வர் திறன்கள் பட்டியலாக இருக்கும்
- சோதிக்க கருவிகள் கிடைக்கும்
- வெற்றிகரமாக JSON-RPC செய்திகள் பரிமாறப்படும்
- கருவி பதில்கள் இடைமுகத்தில் காணப்படும்

### பொதுவான பிரச்சனைகள் மற்றும் தீர்வுகள்

**சர்வர் துவங்காது:**
- அனைத்து சார்புகளும் நிறுவப்பட்டுள்ளதா சரிபார்க்கவும்: `pip install mcp`
- Python நியமங்கள் மற்றும் இடைமுகம் சரி என்பதை உறுதி செய்ய
- கான்சோலில் பிழை செய்திகளை காண

**கருவிகள் தெரியவில்லை:**
- `@server.tool()` அலங்காரங்கள் இருப்பதை உறுதிசெய்யவும்
- `main()` முன் கருவி செயலிகள் வரையறுக்கப்பட்டுள்ளதா பாராட்டு
- சர்வர் சரியாக ஒழுங்கமைக்கப்பட்டுள்ளதா பரிசீலனை செய்

**இணைப்பு பிரச்சனைகள்:**
- சர்வர் stdio போக்குவரத்தை சரியாகப் பயன்படுத்துவதை உறுதிசெய்யவும்
- பிற செயல்முறைகள் தடையில்லாமல் இருக்க இருப்பதை சரிபார்க்கவும்
- Inspector கட்டளை தொகுப்பை சரிபார்க்கவும்

## பணியிடம்

உங்கள் சர்வரில் மேலும் திறன்களை உருவாக்க முயற்சிக்கவும். உதாரணமாக, [இந்தப் பக்கம்](https://api.chucknorris.io/) பார்த்து ஒரு API அழைக்கும் கருவியை சேர்க்கவும். சர்வர் எப்படி இருக்கும் என்பது உங்கள் தீர்மானம். மகிழுங்கள் :)

## தீர்வு

[தீர்வு](./solution/README.md) இது செயல்படும் குறியீடு உடன் ஒரு சாத்தியமான தீர்வு.

## முக்கிய கருத்துகள்

இந்த அத்தியாயத்தின் முக்கிய கருத்துக்கள்:

- stdio போக்குவரத்து உள்ளூர் MCP சர்வர்களுக்கான பரிந்துரைக்கப்படும் முறை
- stdio போக்குவரத்து MCP சர்வர் மற்றும் கிளையன்களுக்கு நிலையான உள்ளீடு மற்றும் வெளியீடு ஸ்திரங்கள் மூலம் தெளிவான தொடர்பை வழங்குகிறது
- Inspector மற்றும் Visual Studio Code இரண்டும் நேரடியாக stdio சர்வர்களை பயன்படுத்த முடியும், இது பிழைத்திருத்தம் மற்றும் ஒருங்கிணைப்பை எளிதாக்குகிறது

## எடுத்துக்காட்டுகள்

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)

## கூடுதல் வளங்கள்

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## அடுத்து என்ன

## அடுத்த படிகள்

stdio போக்குவரத்துடன் MCP சர்வர்கள் கட்டுவது எப்படி என்பதை கற்றுக்கொண்ட பிறகு, மேலதிக தலைப்புகளை ஆராயலாம்:

- **அடுத்து**: [MCP உடன் HTTP ஸ்ட்ரீமிங் (Streamable HTTP)](../06-http-streaming/README.md) - தொலைநிலை சர்வர்க்கான மற்ற ஆதரவு போக்குவரத்து முறையை கற்றுக்கொள்ளவும்
- **மேம்பட்டது**: [MCP பாதுகாப்பு சிறந்த நடைமுறைகள்](../../02-Security/README.md) - உங்கள் MCP சர்வர்களில் பாதுகாப்பை நடைமுறைப்படுத்தவும்
- **உற்பத்தி**: [வழங்கல் stratégiகள்](../09-deployment/README.md) - உற்பத்திக்கு உங்கள் சர்வர்களை மீட்டமைக்கவும்

## கூடுதல் வளங்கள்

- [MCP விவரக்குறிப்பு 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - அதிகாரப்பூர்வ விவரக்குறிப்பு
- [MCP SDK ஆவணங்கள்](https://github.com/modelcontextprotocol/sdk) - அனைத்து மொழிகளுக்குமான SDK குறிப்புகள்
- [சமூக எடுத்துக்காட்டுகள்](../../06-CommunityContributions/README.md) - சமூகத்தினர் வழங்கிய கூடுதல் சர்வர் எடுத்துக்காட்டுகள்

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**மறுப்பு**:
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயற்சி செய்துள்ளோம், ஆனால் தானாக செய்யப்படும் மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கலாம் என்பதை கவனத்தில் கொள்ளவும். அசல் ஆவணம் அதன் தாய்மொழியில் அதிகாரப்பூர்வ ஆதாரமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்நுட்பமான மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பைப் பயன்படுத்துவதால் ஏற்படும் எந்த தவறான புரிதல்கள் அல்லது தவறான விளக்கத்திற்கும் நாங்கள் பொறுப்பில்வில்லை.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->