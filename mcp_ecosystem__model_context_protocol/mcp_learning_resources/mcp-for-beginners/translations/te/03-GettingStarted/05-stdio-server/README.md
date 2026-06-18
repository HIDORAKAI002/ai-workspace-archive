# stdio ట్రాన్స్‌పోర్ట్‌తో MCP సర్వర్

> **⚠️ ముఖ్యమైన అప్డేట్**: MCP స్పెసిఫికేషన్ 2025-06-18 నుండి, స్టాండ్‌అలోన్ SSE (సర్వర్-సెంట్స్ ఈవెంట్‌లు) ట్రాన్స్‌పోర్ట్ **నిరုတ်ితమైంది** మరియు దాని స్థానంలో "స్ట్రీమీబుల్ HTTP" ట్రాన్స్‌పోర్ట్ ప్రతిష్టాపించబడింది. గత MCP స్పెసిఫికేషన్ రెండు ప్రాథమిక ట్రాన్స్‌పోర్ట్ యంత్రాంగాలను నిర్వచిస్తుంది:
> 1. **stdio** - స్టాండర్డ్ ఇన్‌పుట్/ఆవుట్‌పుట్ (స్థానిక సర్వర్‌లకు సిఫార్సు చేయబడింది)
> 2. **స్ట్రీమీబుల్ HTTP** - అంతర్గతంగా SSE వాడే రిమోట్ సర్వర్‌లకు
>
> ఈ పాఠం ప్రాధాన్యత stdio ట్రాన్స్‌పోర్ట్ మీద మార్పు చేయబడింది, ఇది ఎక్కువమందికి MCP సర్వర్ అమలుకై సిఫార్సు చేయబడిన ప్రయోగ మార్గం.

stdio ట్రాన్స్‌పోర్ట్ MCP సర్వర్‌లు వినియోగదారులతో స్టాండర్డ్ ఇన్‌పుట్ మరియు అవుట్‌పుట్ స్ట్రీమ్‌ల ద్వారా కమ్యూనికేట్ చేయడానికి అనుమతిస్తుంది. ఇది ప్రస్తుత MCP స్పెసిఫికేషన్‌లో అత్యంత ఉపయోగించబడే, సులభం మరియు సమర్థవంతమైన మార్గం, వివిధ క్లయింట్ అప్లికేషన్‌లతో సులభంగా ఇంటిగ్రేట్ చేయగల MCP సర్వర్‌లను నిర్మించడానికి.

## అవలోకనం

ఈ పాఠం stdio ట్రాన్స్‌పోర్ట్ ఉపయోగించి MCP సర్వర్‌లను ఎలా నిర్మించాలో మరియు వినవాలో కవరుచేస్తుంది.

## అభ్యసన లక్ష్యాలు

ఈ పాఠం చివరికి మీరు:

- stdio ట్రాన్స్‌పోర్ట్ ఉపయోగించి MCP సర్వర్‌ను నిర్మించగలుగుతారు.
- Inspector ఉపయోగించి MCP సర్వర్‌ను డీబగ్ చేయగలుగుతారు.
- Visual Studio Code ఉపయోగించి MCP సర్వర్‌ను వినగలుగుతారు.
- ప్రస్తుత MCP ట్రాన్స్‌పోర్ట్ పద్ధతుల గురించి, stdio ఎందుకు సిఫార్సు చేయబడుతుందో అర్థం చేసుకోగలుగుతారు.

## stdio ట్రాన్స్‌పోర్ట్ — ఎలా పని చేస్తుంది

stdio ట్రాన్స్‌పోర్ట్ ప్రస్తుత MCP స్పెసిఫికేషన్ (2025-11-25) లో రెండు మద్దతు పొందిన ట్రాన్స్‌పోర్ట్ రకాలలో ఒకటి. ఇది ఇలా పని చేస్తుంది:

- **సరళమైన కమ్యూనికేషన్**: సర్వర్ స్టాండర్డ్ ఇన్‌పుట్ (`stdin`) నుండి JSON-RPC సందేశాలు చదివి, స్టాండర్డ్ అవుట్‌పుట్ (`stdout`)కి సందేశాలు పంపుతుంది.
- **ప్రాసెస్ ఆధారితమైంది**: క్లయింట్ MCP సర్వర్‌ను ఒక సబ్ప్రాసెస్‌గా ప్రారంభిస్తోంది.
- **సందేశ ఫార్మాట్**: సందేశాలు వేర్వేరు JSON-RPC అభ్యర్థనలు, నోటిఫికేషన్లు లేదా ప్రతిస్పందనలు; కొత్త లైన్లతో విభజించబడ్డవి.
- **లాగింగ్**: సర్వర్ లాగింగ్ కోసం UTF-8 స్ట్రింగ్స్‌ను స్టాండర్డ్ ఎర్రర్ (`stderr`)కి రాయవచ్చు.

### ప్రధాన అవసరాలు:
- సందేశాలు కొత్త లైన్ల తర్వాత విభజించబడాలి మరియు లోపల ఎటువంటి కొత్త లైన్ ఉండకూడదు
- సర్వర్ `stdout`కి చెల్లని MCP సందేశాలను రాయకూడదు
- క్లయింట్ సర్వర్ `stdin`కి చెల్లని MCP సందేశాలను రాయకూడదు

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
  
పై కోడ్‌లో:  
- MCP SDK నుండి `Server` క్లాస్ మరియు `StdioServerTransport` దిగుమతి చేస్తున్నాము  
- ప్రాథమిక కాన్ఫిగరేషన్ మరియు సామర్థ్యాలతో సర్వర్ ఇన్స్టాన్స్ సృష్టిస్తున్నాము  
- `StdioServerTransport` ఇన్స్టాన్స్ సృష్టించి, సర్వర్‌ను stdin/stdout మీద కమ్యూనికేషన్ చేయడానికి కలుపుచేస్తున్నాము  

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# సర్వర్ ఉదాహరణను సృష్టించండి
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
  
పై కోడ్‌లో:  
- MCP SDK ఉపయోగించి సర్వర్ ఇన్స్టాన్స్ సృష్టించడం  
- డికరేటర్స్ ఉపయోగించి టూల్స్ నిర్వచించడం  
- ట్రాన్స్‌పోర్ట్ కోసం stdio_server కాన్టెక్స్్ట్ మేనేజర్ ఉపయోగించడం  

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
  
SSEతో ప్రధాన తేడా stdio సర్వర్‌లలో ఉంటుంది:  
- వెబ్ సర్వర్ సెటప్ లేదా HTTP ఎండ్‌పాయింట్లు అవసరం లేదు  
- క్లయింట్ చేత సబ్‌ప్రాసెస్‌లుగా ప్రారంభించబడతాయి  
- stdin/stdout స్ట్రీమ్‌ల ద్వారా కమ్యూనికేట్ చేస్తాయి  
- అమలు మరియు డీబగ్ చేయడం సులభం  

## ప్రాక్టీస్: stdio సర్వర్ సృష్టించడం

మన సర్వర్ సృష్టించడానికి రెండు విషయాలు గుర్తుంచుకోవాలి:

- కనెక్షన్ & సందేశాల ఎండ్‌పాయింట్లు ఎక్స్‌పోజ్ చేయడానికి వెబ్ సర్వర్ అవసరం.

## ప్రయోగశాల: సులభమైన MCP stdio సర్వర్ సృష్టించడం

ఈ ప్రయోగశాలలో, మేము సిఫార్సు చేయబడిన stdio ట్రాన్స్‌పోర్ట్ ఉపయోగించి ఒక సులభమైన MCP సర్వర్ సృష్టిస్తాము. ఈ సర్వర్ క్లయింట్లు మోడల్ కాంటెక్స్ట్ ప్రోటోకాల్ ఉపయోగించి కాల్ చేయగల టూల్స్‌ను ఎక్స్‌పోజ్ చేస్తుంది.

### మొదటివిధంగా కావలసినవారు

- Python 3.8 లేదా తరువాత  
- MCP Python SDK: `pip install mcp`  
- అసింక్ ప్రోగ్రామింగ్ యొక్క ప్రాథమిక అవగాహన  

మొదటి MCP stdio సర్వర్ సృష్టించడం మొదలుపెట్టండి:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# లాగింగ్‌ని సవరించండి
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# సర్వర్‌ను సృష్టించండి
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
    # stdio ట్రాన్స్‌పోర్ట్‌ను ఉపయోగించండి
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```
  
## నిరోధించిన SSE దృష్టి నుంచి కీ తేడాలు

**stdio ట్రాన్స్‌పోర్ట్ (ప్రస్తుత ప్రమాణం):**  
- క్లయింట్ సర్వర్‌ను సబ్‌ప్రాసెస్‌గా ప్రారంభించే సాదా subprocess మోడల్  
- JSON-RPC సందేశాలు ద్వారా stdin/stdout కమ్యూనికేషన్  
- HTTP సర్వర్ సెటప్ అవసరం లేదు  
- మెరుగైన పనితీరు మరియు భద్రత  
- సులభమైన డీబగ్ మరియు అభివృద్ధి  

**SSE ట్రాన్స్‌పోర్ట్ (MCP 2025-06-18 న నిరోధించబడింది):**  
- SSE ఎండ్‌పాయింట్లు ఉన్న HTTP సర్వర్ అవసరం  
- వెబ్ సర్వర్ మౌలిక సదుపాయాలతో చాలా క్లిష్టమైన సెటప్  
- HTTP ఎండ్‌పాయింట్లకు అదనపు భద్రతా ఆలోచనలు  
- ఇప్పుడు వెబ్ ఆధారిత పరిస్థుల్లో స్ట్రీమీబుల్ HTTPతో మార్చబడి ఉంది  

### stdio ట్రాన్స్‌పోర్ట్‌తో సర్వర్ సృష్టించడం

stdio సర్వర్ సృష్టించడానికి:

1. **కావలసిన లైబ్రరీలు దిగుమతి చేసుకోండి** — MCP సర్వర్ భాగాలు మరియు stdio ట్రాన్స్‌పోర్ట్ అవసరం  
2. **సర్వర్ ఇన్స్టాన్స్ సృష్టించండి** — సామర్థ్యాలతో సర్వర్ నిర్వచించండి  
3. **టూల్స్ నిర్వచించండి** — ఎక్స్‌పోజ్ చేయాల్సిన ఫంక్షనాలిటీ జతచేయండి  
4. **ట్రాన్స్‌పోర్ట్ సెటప్ చేయండి** — stdio కమ్యూనికేషన్ కాన్ఫిగర్ చేయండి  
5. **సర్వర్ నడపండి** — సర్వర్ ప్రారంభించి సందేశాలను హ్యాండిల్ చేయండి  

దశలవారీగా ఈ విధంగా నిర్మిద్దాం:

### దశ 1: ప్రాథమిక stdio సర్వర్ సృష్టించండి

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# లాగ్‌ చేసేందుకు సెట్ చేయండి
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# సర్వర్‌ని సృష్టించండి
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
  
### దశ 2: ఎక్కువ టూల్స్ జతచేయండి

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
  
### దశ 3: సర్వర్ నడపడం

కోడ్‌ను `server.py` గా సేవ్ చేసి కమాండ్ లైన్ నుండి నడపండి:

```bash
python server.py
```
  
సర్వర్ ప్రారంభమవుతుంది మరియు stdin నుండి ఇన్పుట్ కోసం వేచి ఉంటుంది. ఇది stdio ట్రాన్స్‌పోర్ట్ మీద JSON-RPC సందేశాలు వాడి కమ్యూనికేట్ చేస్తుంది.

### దశ 4: Inspectorతో పరీక్షించడం

మీ సర్వర్‌ను MCP Inspector ద్వారా పరీక్షించవచ్చు:

1. Inspectorను ఇన్‌స్టాల్ చేయండి: `npx @modelcontextprotocol/inspector`  
2. Inspector నడుపుతూ మీ సర్వర్‌ను పాయింట్ చేయండి  
3. మీరు సృష్టించిన టూల్స్‌ను పరీక్షించండి  

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
  
## మీ stdio సర్వర్ డీబగ్ చేయడం

### MCP Inspector ఉపయోగించడం

MCP Inspector MCP సర్వర్‌ల డీబగ్ మరియు పరీక్ష కోసం విలువైన సాధనం. మీ stdio సర్వర్‌తో దాన్ని ఎలా ఉపయోగించాలో:

1. **Inspector ఇన్‌స్టాల్ చేయండి**:  
   ```bash
   npx @modelcontextprotocol/inspector
   ```
  
2. **Inspector నడపండి**:  
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```
  
3. **మీ సర్వర్‌ని పరీక్షించండి**: Inspector వెబ్ ఇంటర్‌ఫేస్ అందిస్తుంది, ఇక్కడ మీరు:  
   - సర్వర్ సామర్థ్యాలు చూడండి  
   - వివిధ పారామితులతో టూల్స్‌ను పరీక్షించండి  
   - JSON-RPC సందేశాల మానిటరింగ్ చేయండి  
   - కనెక్షన్ సమస్యలను డీబగ్ చేయండి  

### VS Code ఉపయోగించడం

MCP సర్వర్‌ను ప్రత్యక్షం గా VS Codeలో కూడా డీబగ్ చేయవచ్చు:

1. `.vscode/launch.json` లో లాంచ్ కాన్ఫిగరేషన్ సృష్టించండి:  
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
  
2. సర్వర్ కోడ్‌లో బ్రేక్ పాయింట్లు సెట్ చేయండి  
3. డీబగ్గర్ నడపండి మరియు Inspector తో పరీక్షించండి  

### సాధారణ డీబగింగ్ చిట్కాలు

- లాగింగ్ కోసం `stderr` వాడండి — MCP సందేశాలకు `stdout` వాడకండి  
- అన్ని JSON-RPC సందేశాలు న్యూ లైన్‌లతో విడగొట్టండి  
- మునుపు సులభ టూల్స్‌తో పరీక్షించి, తరువాత క్లిష్టమైన ఫంక్షనాలిటీ జత చేయండి  
- సందేశ ఫార్మాట్ సరిచూడటానికి Inspector వాడండి  

## VS Codeలో మీ stdio సర్వర్ వినడం

మీ MCP stdio సర్వర్ తయారైన వెంటనే, మీరు దానిని VS Codeలో Claude లేదా ఇతర MCP-సమర్థ క్లయింట్‌లతో ఉపయోగించడానికి ఇంటిగ్రేట్ చేయవచ్చు.

### కాన్ఫిగరేషన్

1. MCP కాన్ఫిగరేషన్ ఫైల్ సృష్టించండి `%APPDATA%\Claude\claude_desktop_config.json` (విండోస్) లేదా `~/Library/Application Support/Claude/claude_desktop_config.json` (మాక్):  

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
  
2. Claudeని రీస్టార్ట్ చేయండి: కొత్త సర్వర్ కాన్ఫిగరేషన్ లోడ్ అవడానికి Claude ను మూసి మళ్లీ తెరవండి.  

3. కనెక్షన్ ను పరీక్షించండి: Claude తో సంభాషణ మొదలుపెట్టి మీ సర్వర్ టూల్స్ వాడి చూడండి:  
   - "Can you greet me using the greeting tool?"  
   - "Calculate the sum of 15 and 27"  
   - "What's the server info?"  

### TypeScript stdio సర్వర్ ఉదాహరణ

మరింత స్పష్టత కోసం పూర్తి TypeScript ఉదాహరణ ఇక్కడ ఉంది:

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

// పరికరాలను జోడించండి
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
  
### .NET stdio సర్వర్ ఉదాహరణ

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
  
## సంగ్రహం

ఈ నవీకరించిన పాఠంలో మీరు నేర్చుకున్న విషయాలు:

- ప్రస్తుత **stdio ట్రాన్స్‌పోర్ట్** (సిఫార్సు చేయబడిన పద్ధతి) ఉపయోగించి MCP సర్వర్‌లను నిర్మించడం  
- SSE ట్రాన్స్‌పోర్ట్ ఎందుకు నిరోధించబడిందో మరియు stdio, Streamable HTTP ఎందుకు మెరుగైనవి వైపు తెలుసుకోవడం  
- MCP క్లయింట్‌ల ద్వారా కాల్ చేయగల టూల్స్ సృష్టించడం  
- MCP Inspector ద్వారా సర్వర్ డీబగ్ చేయడం  
- stdio సర్వర్‌ను VS Code మరియు Claudeతో ఎలా ఇంటిగ్రేట్ చేయాలో తెలుసుకోవడం  

stdio ట్రాన్స్‌పోర్ట్ విరామమైన SSE పద్ధతితో పోలిస్తే సులభమైనది, భద్రతగా మరియు మరింత పనివేలా MCP సర్వర్‌లను నిర్మించేందుకు అత్యుత్తమ మార్గం. ఇది 2025-06-18 స్పెసిఫికేషన్ ప్రకారం ఎక్కువమందికి సిఫార్సు చేయబడిన పద్ధతి.

### .NET

1. ముందుగా కొంతమంది టూల్స్ సృష్టిద్దాం, దానికి *Tools.cs* అనే ఫైల్ ఈ కింద తెలిపిన విషయంతో సృష్టిస్తాము:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```
  
## ప్రాక్టీస్: మీ stdio సర్వర్ పరీక్షించడం

మీరు stdio సర్వర్ సృష్టించిన తర్వాత, అది సరిగా పనిచేస్తున్నదో లేదో పరీక్షిద్దాం.

### ముందస్తు షరతులు

1. MCP Inspector ఇన్‌స్టాల్ చేశారో లేదో ధృవీకరించండి:  
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```
  
2. మీ సర్వర్ కోడ్ సేవ్ అయి ఉందని ఖచ్చితంగా ఉంచుకోండి (ఉదాహరణ: `server.py`)  

### Inspectorతో పరీక్షించడం

1. **మీ సర్వర్‌తో Inspector ప్రారంభించండి**:  
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```
  
2. **వెబ్ ఇంటర్‌ఫేస్ తెరవండి**: Inspector బ్రౌజర్ విండో ఓపెన్ చేసి మీ సర్వర్ సామర్థ్యాలు చూపుతుంది.  

3. **టూల్స్‌ను పరీక్షించండి**:  
   - వివిధ పేర్లతో `get_greeting` టూల్ ప్రయత్నించండి  
   - వేర్వేరు సంఖ్యలతో `calculate_sum` టూల్ పరీక్షించండి  
   - సర్వర్ మెటాడేటా కోసం `get_server_info` టూల్ కాల్ చేయండి  

4. **కమ్యూనికేషన్ పరిశీలించండి**: Inspector క్లయింట్ మరియు సర్వర్ మధ్య మార్పిడి అవుతున్న JSON-RPC సందేశాలను చూపిస్తుంది.  

### మీరు చూడవలసినవి

మీ సర్వర్ సరిగా ప్రారంభమైనప్పుడు మీరు చూడగలిగేది:  
- Inspectorలో సర్వర్ సామర్థ్యాలు జాబితా అవుతున్నాయి  
- పరీక్ష కోసం టూల్స్ అందుబాటులో ఉన్నాయి  
- JSON-RPC సందేశాలు విజయవంతంగా మార్పిడి అవుతున్నాయి  
- ఇంటర్‌ఫేస్‌లో టూల్ ప్రతిస్పందనలు చూపిస్తున్నాయి  

### సాధారణ సమస్యలు మరియు పరిష్కారాలు

**సర్వర్ ప్రారంభమవ్వట్లేదు:**  
- అన్ని డిపెండెన్సీలు ఇన్‌స్టాల్ అయ్యాయో చూడండి: `pip install mcp`  
- Python సింటాక్స్ మరియు ఇన్డెంటేషన్ తనిఖీ చేయండి  
- కన్సోల్‌లో ఎటువంటి ఎర్రర్ సందేశాలు ఉన్నాయో చూడండి  

**టూల్స్ కనిపించట్లేదు:**  
- `@server.tool()` డికరేటర్స్ ఉన్నాయని చూసుకోండి  
- `main()` ముందు టూల్ ఫంక్షన్లు నిర్వచించబడ్డాయో చూడండి  
- సర్వర్ సరిగ్గా కాన్ఫిగర్ అయ్యిందో పరిశీలించండి  

**కనెక్షన్ సమస్యలు:**  
- సర్వర్ stdio ట్రాన్స్‌పోర్ట్ సరిగ్గా వాడుతున్నదో చూసుకోండి  
- ఇతర ప్రాసెస్‌లు తప్పుడు రీతిలో అనుకూలించలేదో చూడండి  
- Inspector ఆదేశం సింటాక్స్ సరైనదో ధృవీకరించండి  

## అసైన్మెంట్

మీ సర్వర్‌కు మరిన్ని సామర్థ్యాలు జోడించి సృష్టించండి. ఉదాహరణకు, [ఈ పేజీ](https://api.chucknorris.io/) లోని APIని కాల్ చేసే టూల్ జోడించవచ్చు. మీరు సర్వర్ ఎలా ఉండాలంటే అదే నిర్ణయించండి. సరదాగా చేయండి :)

## పరిష్కారం

[పరిష్కారం](./solution/README.md) కింది లింకులో పని చేసే కోడ్‌తో కూడిన ఒక సాధ్యం పరిష్కారం ఉంది.

## కీలక అంశాలు

ఈ అధ్యాయం నుండి ముఖ్యంగా నేర్చుకోవాల్సిన విషయాలు:

- stdio ట్రాన్స్‌పోర్ట్ స్థానిక MCP సర్వర్‌లకు సిఫార్సు చేయబడిన విధానం.  
- stdio ట్రాన్స్‌పోర్ట్ స్టాండర్డ్ ఇన్‌పుట్, అవుట్‌పుట్ స్ట్రీమ్‌లతో MCP సర్వర్‌లు మరియు క్లయింట్‌ల మధ్య సజీవ కమ్యూనికేషన్ అందిస్తుంది.  
- మీరు Inspector మరియు Visual Studio Code రెండింటినీ ఉపయోగించి stdio సర్వర్‌లను ప్రత్యక్షంగా వినవచ్చు, ఇది డీబగ్గింగ్ మరియు ఇంటిగ్రేషన్‌ను సులభతరం చేస్తుంది.  

## నమూనాలు 

- [Java కలిక్యులేటర్](../samples/java/calculator/README.md)  
- [.Net కలిక్యులేటర్](../../../../03-GettingStarted/samples/csharp)  
- [JavaScript కలిక్యులేటర్](../samples/javascript/README.md)  
- [TypeScript కలిక్యులేటర్](../samples/typescript/README.md)  
- [Python కలిక్యులేటర్](../../../../03-GettingStarted/samples/python)  

## అదనపు వనరులు

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## తదుపరి ఏమిటి

## తదుపరి దశలు

ఇప్పుడు మీరు stdio ట్రాన్స్‌పోర్ట్‌తో MCP సర్వర్‌లను ఎలా నిర్మించాలో తెలుసుకున్నారనుకుంటూ, మీరు మరింత అభివృద్ధిగల అంశాలను పరిశీలించవచ్చు:

- **తదుపరి:** [MCPతో HTTP స్ట్రీమింగ్ (స్ట్రీమీబుల్ HTTP)](../06-http-streaming/README.md) - మరొక మద్దతు పొందిన ట్రాన్స్‌పోర్ట్ యంత్రాంగం గురించి తెలుసుకోండి  
- **అధునాతన:** [MCP భద్రత ఉత్తమ పద్ధతులు](../../02-Security/README.md) - MCP సర్వర్‌లలో భద్రతను అమలు చేయండి  
- **ఉత్పత్తి:** [డిప్లాయ్‌మెంట్ విధానాలు](../09-deployment/README.md) - మీ సర్వర్‌లను ఉత్పత్తి వాడుకకు సిద్ధం చేయండి  

## అదనపు వనరులు

- [MCP స్పెసిఫికేషన్ 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - అధికారిక స్పెసిఫికేషన్  
- [MCP SDK డాక్యుమెంటేషన్](https://github.com/modelcontextprotocol/sdk) - అన్ని భాషల కోసం SDK సూచనలు  
- [సమాజ ఉదాహరణలు](../../06-CommunityContributions/README.md) - సమాజం నుండి మరిన్ని సర్వర్ ఉదాహరణలు  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్వీకరణ**:
ఈ పత్రం AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తున్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలు తప్పులు లేదా అసమగ్రతలను కలిగి ఉండవచ్చు. దాని స్వదేశ భాషలో ఉన్న అసలు పత్రాన్ని అధికారం కలిగిన మూలంగా పరిగణించాలి. కీలకమైన సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదాన్ని సిఫారసు చేస్తాము. ఈ అనువాదం ఉపయోగం వల్ల కలిగే ఏవైనా అపార్థాలు లేదా తప్పుదారులు కోసం మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->