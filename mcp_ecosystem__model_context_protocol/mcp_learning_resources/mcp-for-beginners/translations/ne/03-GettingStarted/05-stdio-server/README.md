# MCP सर्भर stdio ट्रान्सपोर्टसहित

> **⚠️ महत्वपूर्ण अपडेट**: MCP स्पेसिफिकेशन 2025-06-18 देखि, स्वतन्त्र SSE (सर्भर-सेन्ट इभेण्ट्स) ट्रान्सपोर्टलाई **डिप्रिकेटेड** गरिएको छ र यसलाई "Streamable HTTP" ट्रान्सपोर्टले प्रतिस्थापन गरेको छ। वर्तमान MCP स्पेसिफिकेशनले दुई प्रमुख ट्रान्सपोर्ट मेकानिजमहरू परिभाषित गर्दछ:
> 1. **stdio** - स्ट्यान्डर्ड इनपुट/आउटपुट (स्थानीय सर्भरहरूका लागि सिफारिस गरिएको)
> 2. **Streamable HTTP** - रिमोट सर्भरहरू जसले आन्तरिक रूपमा SSE प्रयोग गर्न सक्छन्
>
> यो पाठ stdio ट्रान्सपोर्टमा केन्द्रित गरि अद्यावधिक गरिएको छ, जुन अधिकांश MCP सर्भर कार्यान्वयनहरूका लागि सिफारिस गरिएको तरिका हो।

stdio ट्रान्सपोर्टले MCP सर्भरहरूलाई ग्राहकहरूसँग स्ट्यान्डर्ड इनपुट र आउटपुट स्ट्रिमहरू मार्फत संवाद गर्न अनुमति दिन्छ। यो हालको MCP स्पेसिफिकेशनमा सबैभन्दा धेरै प्रयोग हुने र सिफारिस गरिएको ट्रान्सपोर्ट मेकानिजम हो, जसले विभिन्न ग्राहक अनुप्रयोगहरूसँग सजिलै एकीकृत गर्न मिल्ने साधारण र कुशल तरिका प्रदान गर्दछ।

## अवलोकन

यस पाठले stdio ट्रान्सपोर्ट प्रयोग गरी MCP सर्भर कसरी बनाउन र प्रयोग गर्ने सिकाउँछ।

## अध्ययनका उद्देश्यहरू

यस पाठको अन्त्यसम्म, तपाईं सक्षम हुनुहुनेछ:

- stdio ट्रान्सपोर्ट प्रयोग गरी MCP सर्भर बनाउन।
- Inspector प्रयोग गरी MCP सर्भर डिबग गर्न।
- Visual Studio Code प्रयोग गरी MCP सर्भर उपभोग गर्न।
- वर्तमान MCP ट्रान्सपोर्ट मेकानिजमहरू बुझ्न र किन stdio सिफारिस गरिएको छ बुझ्न।

## stdio ट्रान्सपोर्ट - कसरी काम गर्छ

stdio ट्रान्सपोर्ट वर्तमान MCP स्पेसिफिकेशन (2025-11-25) मा समर्थन गरिएको दुई ट्रान्सपोर्ट प्रकारहरू मध्ये एक हो। यसले यसरी काम गर्दछ:

- **सरल संवाद**: सर्भरले JSON-RPC सन्देशहरू स्ट्यान्डर्ड इनपुट (`stdin`) बाट पढ्छ र स्ट्यान्डर्ड आउटपुट (`stdout`) मा सन्देश पठाउँछ।
- **प्रोसेस-आधारित**: ग्राहकले MCP सर्भरलाई एक सबप्रोसेसको रूपमा उद्घाटन गर्छ।
- **सन्देश ढाँचा**: सन्देशहरू व्यक्तिगत JSON-RPC अनुरोधहरू, सूचनाहरू, वा प्रतिक्रिया हुन्छन्, जुन नयाँ लाइनद्वारा सीमित हुन्छन्।
- **लगिङ**: सर्भरले लगिङको लागि आवश्यकता अनुसार UTF-8 स्ट्रिङहरू स्ट्यान्डर्ड एरर (`stderr`) मा लेख्न सक्छ।

### मुख्य आवश्यकताहरू:
- सन्देशहरू नयाँ लाइनद्वारा सीमित हुनुपर्छ र कुनै प्रवेश गरिएको नयाँ लाइनहरू हुनुहुँदैन
- सर्भरले `stdout` मा वैध MCP सन्देशवाट बाहिर केही लेख्नु हुँदैन
- ग्राहकले सर्भरको `stdin` मा वैध MCP सन्देशवाट बाहिर केही लेख्नु हुँदैन

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

अघिल्लो कोडमा:

- हामीले MCP SDK बाट `Server` वर्ग र `StdioServerTransport` आयात गरेका छौं
- हामीले आधारभूत कन्फिगरेसन र क्यापेबिलिटीका साथ सर्भर उदाहरण बनाएका छौं
- हामीले `StdioServerTransport` को उदाहरण सिर्जना गरी सर्भरलाई जडान गरेका छौं, जसले stdin/stdout मा सञ्चार सक्षम पार्छ

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# सर्भर उदाहरण सिर्जना गर्नुहोस्
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

अघिल्लो कोडमा हामीले:

- MCP SDK प्रयोग गरी सर्भर उदाहरण सिर्जना गरेका छौं
- डेकोरेटरहरू प्रयोग गरी उपकरणहरू परिभाषित गरेका छौं
- stdio_server सन्दर्भ व्यवस्थापकलाई ट्रान्सपोर्ट ह्यान्डल गर्न प्रयोग गरेका छौं

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

SSE बाट मुख्य भिन्नता stdio सर्भरहरूमा:

- वेब सर्भर सेटअप वा HTTP अन्तबिन्दु आवश्यक पर्दैन
- ग्राहकद्वारा subprocess को रूपमा सुरु गरिन्छ
- stdin/stdout स्ट्रिममार्फत सञ्चार गर्छ
- कार्यान्वयन र डिबगिंगमा सजिलो

## अभ्यास: stdio सर्भर निर्माण

हामीले हाम्रो सर्भर बनाउन, दुई कुराहरू ध्यानमा राख्न आवश्यक छ:

- हामीले जडान र सन्देशहरूको लागि अन्तबिन्दुहरू प्रदर्शन गर्न वेब सर्भर प्रयोग गर्नुपर्छ।

## प्रयोगशाला: साधारण MCP stdio सर्भर निर्माण

यस प्रयोगशालामा, हामी सामान्य stdio ट्रान्सपोर्ट प्रयोग गरी साधारण MCP सर्भर बनाउनेछौं। यो सर्भर ग्राहकहरूले मानक मोडल कन्टेक्स्ट प्रोटोकल प्रयोग गरी कल गर्न सक्ने उपकरणहरू प्रदर्शन गर्नेछ।

### पूर्वापेक्षाहरू

- Python 3.8 वा पछि
- MCP Python SDK: `pip install mcp`
- असिंक्रोनस प्रोग्रामिङको आधारभूत बुझाइ

हामी हाम्रो पहिलो MCP stdio सर्भर सिर्जना गरौं:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# लगिङ कन्फिगर गर्नुहोस्
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# सर्भर बनाउनुहोस्
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
    # stdio ट्रान्सपोर्ट प्रयोग गर्नुहोस्
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```


## डिप्रिकेटेड SSE विधिबाट मुख्य फरक

**Stdio ट्रान्सपोर्ट (हालको मानक):**
- सरल subprocess मोडेल – ग्राहकले सर्भरलाई बच्चा प्रक्रिया रूपमा सुरु गर्छ
- stdin/stdout मार्फत JSON-RPC सन्देशहरूमा सञ्चार
- HTTP सर्भर सेटअप आवश्यक छैन
- राम्रो प्रदर्शन र सुरक्षा
- सजिलो डिबगिंग र विकास

**SSE ट्रान्सपोर्ट (MCP 2025-06-18 बाट डिप्रिकेटेड):**
- SSE अन्तबिन्दुहरूसँग HTTP सर्भर आवश्यक थियो
- वेब सर्भर पूर्वाधारसहित बढी जटिल सेटअप
- HTTP अन्तबिन्दुहरूको लागि थप सुरक्षा विचारहरू
- वेब-आधारित अवस्थाहरूको लागि अहिले Streamable HTTP ले प्रतिस्थापन गरेको छ

### stdio ट्रान्सपोर्ट सहित सर्भर बनाउने

हामीले stdio सर्भर बनाउनका लागि:

1. **आवश्यक पुस्तकालयहरू आयात गर्ने** - MCP सर्भर कम्पोनेन्ट र stdio ट्रान्सपोर्ट चाहिन्छ
2. **सर्भर उदाहरण बनाउने** - क्षमतासहित सर्भर परिभाषित गर्ने
3. **उपकरणहरू परिभाषित गर्ने** - हामी जसलाई प्रदर्शन गर्न चाहन्छौं त्यो फंक्शनालिटी थप्ने
4. **ट्रान्सपोर्ट सेटअप गर्ने** - stdio सञ्चार कन्फिगर गर्ने
5. **सर्भर चलाउने** - सर्भर सुरु गर्ने र सन्देशहरू ह्यान्डल गर्ने

यहाँ हामी क्रमशः बनाउँछौं:

### कदम १: आधारभूत stdio सर्भर सिर्जना गर्ने

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# लगिङ कन्फिगर गर्नुहोस्
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# सर्भर सिर्जना गर्नुहोस्
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


### कदम २: थप उपकरणहरू थप्ने

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


### कदम ३: सर्भर चलाउने

`server.py` भनेर कोड बचत गरी कमाण्ड लाइनबाट यो चलाउनुहोस्:

```bash
python server.py
```

सर्भर सुरु हुनेछ र stdin बाट इनपुटको लागि प्रतिक्षा गर्नेछ। यसले stdio ट्रान्सपोर्टमा JSON-RPC सन्देश प्रयोग गरी सञ्चार गर्छ।

### कदम ४: Inspector सँग परीक्षण गर्ने

तपाईंले आफ्नो सर्भर एमसीपी Inspector प्रयोग गरी परीक्षण गर्न सक्नुहुन्छ:

1. Inspector स्थापना गर्नुहोस्: `npx @modelcontextprotocol/inspector`
2. Inspector चलाउनुहोस् र आफ्नो सर्भरलाई पोइन्ट गर्नुहोस्
3. तपाईंले सिर्जना गरेका उपकरणहरूको परीक्षण गर्नुहोस्

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```


## तपाईंको stdio सर्भरलाई डिबग गर्ने

### MCP Inspector प्रयोग गर्ने

MCP Inspector MCP सर्भरहरू डिबग र परीक्षणका लागि उपयोगी उपकरण हो। यो तपाईंको stdio सर्भरसँग यसरी प्रयोग गर्न सकिन्छ:

1. **Inspector स्थापना गर्नुहोस्**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Inspector चलाउनुहोस्**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **सर्भर परीक्षण गर्नुहोस्**: Inspector ले वेब इन्टरफेस प्रदान गर्दछ जहाँ तपाईंले:
   - सर्भर क्यापेबिलिटीहरू हेर्न सक्नुहुन्छ
   - विभिन्न प्यारामिटरहरूसँग उपकरणहरू परीक्षण गर्न सक्नुहुन्छ
   - JSON-RPC सन्देशहरू मापन गर्न सक्नुहुन्छ
   - जडान समस्याहरू डिबग गर्न सक्नुहुन्छ

### VS Code प्रयोग गर्ने

तपाईंले VS Code मा पनि आफ्नो MCP सर्भर सिधै डिबग गर्न सक्नुहुन्छ:

1. `.vscode/launch.json` मा एउटा लन्च कन्फिगरेसन बनाउनुहोस्:
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

2. सर्भर कोडमा ब्रेकपॉइन्ट सेट गर्नुहोस्
3. डिबगर चलाउनुहोस् र Inspector सँग परीक्षण गर्नुहोस्

### सामान्य डिबगिङ सुझावहरू

- लगिङका लागि `stderr` प्रयोग गर्नुहोस् – `stdout` मा कहिले पनि लेख्नु हुँदैन किनकि त्यो MCP सन्देशको लागि छुट्टाइएको छ
- सबै JSON-RPC सन्देशहरू नयाँ लाइनद्वारा सीमित छन् भनी सुनिश्चित गर्नुहोस्
- पहिले सरल उपकरणहरूसँग परीक्षण गर्नुहोस् त्यसपछि जटिल फंक्शनालिटी थप्नुहोस्
- सन्देश ढाँचाहरू पुष्टि गर्न Inspector प्रयोग गर्नुहोस्

## VS Code मा तपाईंको stdio सर्भर उपभोग गर्ने

तपाईंले MCP stdio सर्भर बनाइसकेपछि, तपाईं यसलाई VS Code सँग एकीकरण गर्न सक्नुहुन्छ Claude वा अन्य MCP-समर्थित ग्राहकहरूसँग प्रयोग गर्न।

### कन्फिगरेसन

1. Windows मा `%APPDATA%\Claude\claude_desktop_config.json` वा Mac मा `~/Library/Application Support/Claude/claude_desktop_config.json` मा MCP कन्फिगरेसन फाइल बनाएर:

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

2. Claude पुनः सुरु गर्नुहोस्: नयाँ सर्भर कन्फिगरेसन लोड गर्न Claude बन्द गरी फेरि खोल्नुहोस्।

3. जडान परीक्षण गर्नुहोस्: Claude सँग कुरा सुरु गरेर तपाईंको सर्भरका उपकरणहरू प्रयास गर्नुहोस्:
   - "Greeting उपकरण प्रयोग गरेर मलाई स्वागत गर्न सकिन्छ?"
   - "१५ र २७ को योग गणना गर"
   - "सर्भर जानकारी के छ?"

### TypeScript stdio सर्भर उदाहरण

सन्दर्भका लागि पूर्ण TypeScript उदाहरण:

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

// उपकरणहरू थप्नुहोस्
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


### .NET stdio सर्भर उदाहरण

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


## सारांश

यस अद्यावधिक पाठमा, तपाईंले सिक्नुभयो:

- वर्तमान **stdio ट्रान्सपोर्ट** प्रयोग गरी MCP सर्भर बनाउने (सिफारिस गरिएको तरिका)
- किन SSE ट्रान्सपोर्ट डिप्रिकेटेड गरियो र stdio तथा Streamable HTTP लाई सट्टा मानियो
- MCP ग्राहकहरूले कल गर्न सक्ने उपकरणहरू सिर्जना गर्ने
- MCP Inspector प्रयोग गरेर सर्भर डिबग गर्ने
- VS Code र Claude सँग stdio सर्भर एकीकृत गर्ने

stdio ट्रान्सपोर्टले डिप्रिकेटेड SSE विधिको तुलनामा MCP सर्भरहरू बनाउने सरल, सुरक्षित र अधिक प्रदर्शनशील तरिका प्रदान गर्दछ। 2025-06-18 स्पेसिफिकेशन अनुसार यो अधिकांश MCP सर्भर कार्यान्वयनहरूको लागि सिफारिस गरिएको ट्रान्सपोर्ट हो।

### .NET

1. पहिले उपकरणहरू सिर्जना गरौं, यसका लागि हामी *Tools.cs* नामक फाइल निम्न सामग्रीसहित सिर्जना गर्नेछौं:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```


## अभ्यास: तपाईंको stdio सर्भर परीक्षण गर्नुहोस्

अब तपाईंले stdio सर्भर निर्माण गर्नुभयो, यसलाई ठीक ढंगले काम गर्दछ कि छैन परीक्षण गरौं।

### पूर्वापेक्षाहरू

1. MCP Inspector स्थापना गरेको सुनिश्चित गर्नुहोस्:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. तपाईंको सर्भर कोड सुरक्षित गरिएको हुनुपर्छ (जस्तै, `server.py` नाममा)

### Inspector सँग परीक्षण गर्ने

1. **तपाईंको सर्भरसँग Inspector सुरु गर्नुहोस्**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **वेब इन्टरफेस खोल्नुहोस्**: Inspector ले ब्राउजर विन्डो खोल्छ जहाँ तपाईंले सर्भरका क्यापेबिलिटीहरू देख्नुहुनेछ।

3. **उपकरणहरू परीक्षण गर्नुहोस्**: 
   - `get_greeting` उपकरणलाई विभिन्न नामहरू सहित प्रयास गर्नुहोस्
   - `calculate_sum` उपकरणलाई विभिन्न संख्याहरू सहित परीक्षण गर्नुहोस्
   - `get_server_info` उपकरण कल गरी सर्भर मेटाडाटा हेर्नुहोस्

4. **सञ्चार अनुगमन गर्नुहोस्**: Inspector ले ग्राहक र सर्भरबीच आदान-प्रदान हुने JSON-RPC सन्देशहरू देखाउँछ।

### तपाईंले के देख्नुपर्ने हो

जब तपाईंको सर्भर सहि ढंगले सुरु हुन्छ, तपाईंले निम्न देख्नुहुनेछ:
- Inspector मा सर्भर क्यापेबिलिटीहरू सूचीबद्ध
- परीक्षणका लागि उपकरणहरू उपलब्ध
- सफल JSON-RPC सन्देश आदानप्रदान
- इन्टरफेसमा उपकरण प्रतिक्रियाहरू प्रदर्शन

### सामान्य समस्याहरू र समाधानहरू

**सर्भर सुरु हुँदैन:**
- सबै निर्भरता स्थापना गरिएको छ कि छैन जाँच गर्नुहोस्: `pip install mcp`
- Python को सिन्ट्याक्स र इनडेन्टेसन जाँच गर्नुहोस्
- कन्सोलमा त्रुटि सन्देशहरूको खोजी गर्नुहोस्

**उपकरणहरू देखिँदैनन्:**
- `@server.tool()` डेकोरेटरहरू छन् कि छैनन् सुनिश्चित गर्नुहोस्
- उपकरण कार्यहरू `main()` अघि परिभाषित छन् कि छैनन् जाँच गर्नुहोस्
- सर्भर ठीकसँग कन्फिगर गरिएको छ कि छैन जाँच गर्नुहोस्

**जडान समस्याहरू:**
- सुनिश्चित गर्नुहोस् सर्भर stdio ट्रान्सपोर्ट सही रूपमा प्रयोग गर्दैछ
- अन्य कुनै प्रक्रियाले अवरोध पुर्‍याइरहेको छैन कि छैन जाँच गर्नुहोस्
- Inspector आदेश सिन्ट्याक्स जाँच गर्नुहोस्

## असाइन्मेन्ट

आफ्नो सर्भरलाई थप क्षमताहरू थप्दै बनाउने प्रयास गर्नुहोस्। उदाहरणका लागि, [यो पृष्ठ](https://api.chucknorris.io/) हेर्नुहोस् र एपीआई कल गर्ने उपकरण थप्न सक्नुहुन्छ। तपाईंले सर्भर कस्तो देखिनु पर्छ निर्णय गर्नुहोस्। रमाइलो गर्नुहोस् :)

## समाधान

[Solution](./solution/README.md) यहाँ सम्भावित समाधान कार्यान्वयन सहित उपलब्ध छ।

## मुख्य सिक्ने कुरा

यस अध्यायबाट मुख्य कुरा निम्न छन्:

- stdio ट्रान्सपोर्ट स्थानीय MCP सर्भरहरूको लागि सिफारिस गरिएको मेकानिजम हो।
- stdio ट्रान्सपोर्टले MCP सर्भर र ग्राहकबीच स्ट्यान्डर्ड इनपुट र आउटपुट स्ट्रिममार्फत सहज सञ्चार अनुमति दिन्छ।
- आपूर्तिकर्ता र Visual Studio Code दुबैले stdio सर्भरहरूलाई सिधै उपभोग गर्न सक्ने भएकाले डिबगिङ र एकीकरण सजिलो हुन्छ।

## नमुना परियोजनाहरू

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python) 

## अतिरिक्त स्रोतहरू

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## के छ अर्को

## आगामी कदमहरू

अब तपाईंले stdio ट्रान्सपोर्टसहित MCP सर्भर बनाउने तरिका सिक्नुभयो, तपाईं थप उन्नत विषयहरू अन्वेषण गर्न सक्नुहुन्छ:

- **अर्को**: [HTTP Streaming with MCP (Streamable HTTP)](../06-http-streaming/README.md) - रिमोट सर्भरहरूको लागि अर्को समर्थित ट्रान्सपोर्ट मेकानिजम सिक्नुहोस्
- **उन्नत**: [MCP सुरक्षा उत्तम अभ्यासहरू](../../02-Security/README.md) - तपाईंका MCP सर्भरहरूमा सुरक्षा लागू गर्नुहोस्
- **उत्पादन**: [डिप्लोयमेन्ट रणनीतिहरू](../09-deployment/README.md) - उत्पादनका लागि सर्भरहरू डिप्लोय गर्नुहोस्

## अतिरिक्त स्रोतहरू

- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - आधिकारिक स्पेसिफिकेशन
- [MCP SDK डकुमेन्टेसन](https://github.com/modelcontextprotocol/sdk) - सबै भाषाहरूका लागि SDK सन्दर्भहरू
- [समुदायका उदाहरणहरू](../../06-CommunityContributions/README.md) - समुदायबाट थप सर्भर उदाहरणहरू

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->