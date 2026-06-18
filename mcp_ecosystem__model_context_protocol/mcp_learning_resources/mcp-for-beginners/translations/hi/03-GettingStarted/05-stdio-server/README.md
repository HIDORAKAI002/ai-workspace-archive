# stdio ट्रांसपोर्ट के साथ MCP सर्वर

> **⚠️ महत्वपूर्ण अपडेट**: MCP विनिर्देशन 2025-06-18 के अनुसार, स्वतंत्र SSE (सर्वर-सेंट इवेंट्स) ट्रांसपोर्ट को **अवमूल्यित** कर दिया गया है और इसे "Streamable HTTP" ट्रांसपोर्ट से प्रतिस्थापित किया गया है। वर्तमान MCP विनिर्देशन दो प्राथमिक ट्रांसपोर्ट तंत्र परिभाषित करता है:
> 1. **stdio** - स्टैंडर्ड इनपुट/आउटपुट (स्थानीय सर्वरों के लिए अनुशंसित)
> 2. **Streamable HTTP** - दूरस्थ सर्वरों के लिए जो आंतरिक रूप से SSE का उपयोग कर सकते हैं
>
> यह पाठ stdio ट्रांसपोर्ट पर केंद्रित करने के लिए अपडेट किया गया है, जो अधिकांश MCP सर्वर कार्यान्वयन के लिए अनुशंसित तरीका है।

stdio ट्रांसपोर्ट MCP सर्वरों को क्लाइंट्स के साथ स्टैंडर्ड इनपुट और आउटपुट स्ट्रीम्स के माध्यम से संचार करने की अनुमति देता है। यह वर्तमान MCP विनिर्देशन में सबसे सामान्य और अनुशंसित ट्रांसपोर्ट तंत्र है, जो सरल और प्रभावी तरीका प्रदान करता है ताकि विभिन्न क्लाइंट एप्लिकेशनों के साथ आसानी से एकीकृत किया जा सके।

## अवलोकन

यह पाठ समझाता है कि stdio ट्रांसपोर्ट का उपयोग करके MCP सर्वर कैसे बनाया और उपयोग किया जाए।

## सीखने के उद्देश्य

इस पाठ के अंत तक, आप सक्षम होंगे:

- stdio ट्रांसपोर्ट का उपयोग करके एक MCP सर्वर बनाना।
- Inspector का उपयोग करके MCP सर्वर को डीबग करना।
- Visual Studio Code का उपयोग करके MCP सर्वर को उपयोग करना।
- वर्तमान MCP ट्रांसपोर्ट तंत्र को समझना और क्यों stdio अनुशंसित है।

## stdio ट्रांसपोर्ट - यह कैसे काम करता है

stdio ट्रांसपोर्ट वर्तमान MCP विनिर्देशन (2025-11-25) में दो समर्थित ट्रांसपोर्ट प्रकारों में से एक है। यह इस प्रकार काम करता है:

- **सरल संचार**: सर्वर JSON-RPC संदेशों को स्टैंडर्ड इनपुट (`stdin`) से पढ़ता है और संदेश स्टैंडर्ड आउटपुट (`stdout`) पर भेजता है।
- **प्रक्रिया-आधारित**: क्लाइंट MCP सर्वर को एक subprocess के रूप में लॉन्च करता है।
- **संदेश प्रारूप**: संदेश व्यक्तिगत JSON-RPC अनुरोध, सूचनाएं, या प्रतिक्रियाएं होती हैं, जो नई लाइन से सीमांकित होती हैं।
- **लॉगिंग**: सर्वर आवश्यकतानुसार UTF-8 स्ट्रिंग्स को स्टैंडर्ड त्रुटि (`stderr`) में लॉगिंग के लिए लिख सकता है।

### मुख्य आवश्यकताएँ:
- संदेश नई लाइनों से सीमांकित होने चाहिए और उनमें अंतर्निहित नई लकीरें नहीं होनी चाहिए
- सर्वर को `stdout` पर केवल वैध MCP संदेश ही लिखना चाहिए
- क्लाइंट को सर्वर के `stdin` पर केवल वैध MCP संदेश ही लिखना चाहिए

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

उपरोक्त कोड में:

- हम MCP SDK से `Server` क्लास और `StdioServerTransport` को इम्पोर्ट करते हैं
- एक बेसिक कॉन्फ़िगरेशन और क्षमताओं के साथ सर्वर उदाहरण बनाते हैं
- `StdioServerTransport` का उदाहरण बनाकर सर्वर को इससे जोड़ते हैं, जिससे stdin/stdout के माध्यम से संचार सक्षम होता है

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# सर्वर उदाहरण बनाएँ
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

उपरोक्त कोड में हम:

- MCP SDK का उपयोग करके एक सर्वर उदाहरण बनाते हैं
- डेकोरेटर्स का उपयोग करके टूल्स को परिभाषित करते हैं
- stdio_server context manager का उपयोग करके ट्रांसपोर्ट को मैनेज करते हैं

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

SSE से मुख्य अंतर यह है कि stdio सर्वर:

- वेब सर्वर सेटअप या HTTP एंडपॉइंट की आवश्यकता नहीं होती
- क्लाइंट द्वारा subprocess के रूप में लॉन्च किए जाते हैं
- stdin/stdout स्ट्रीम के माध्यम से संवाद करते हैं
- लागू करना और डीबग करना आसान होता है

## अभ्यास: stdio सर्वर बनाना

अपने सर्वर को बनाने के लिए हमें दो बातें ध्यान में रखनी होंगी:

- कनेक्शन और संदेशों के लिए एंडपॉइंट्स को एक्सपोज़ करने के लिए वेब सर्वर की आवश्यकता होती है।

## लैब: एक सरल MCP stdio सर्वर बनाना

इस लैब में, हम अनुशंसित stdio ट्रांसपोर्ट का उपयोग करके एक सरल MCP सर्वर बनाएंगे। यह सर्वर ऐसे टूल्स एक्सपोज़ करेगा जिन्हें क्लाइंट स्टैंडर्ड Model Context Protocol का उपयोग कर कॉल कर सकते हैं।

### आवश्यकताएँ

- Python 3.8 या उससे नया
- MCP Python SDK: `pip install mcp`
- असिंक्रोनस प्रोग्रामिंग की बुनियादी समझ

आइए अपना पहला MCP stdio सर्वर बनाते हैं:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# लॉगिंग कॉन्फ़िगर करें
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# सर्वर बनाएं
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
    # stdio ट्रांसपोर्ट का उपयोग करें
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## अवमूल्यित SSE विधि से मुख्य अंतर

**Stdio ट्रांसपोर्ट (वर्तमान मानक):**
- सरल subprocess मॉडल - क्लाइंट सर्वर को चाइल्ड प्रोसेस के रूप में लॉन्च करता है
- stdin/stdout के माध्यम से JSON-RPC संदेशों के साथ संचार
- HTTP सर्वर सेटअप की आवश्यकता नहीं
- बेहतर प्रदर्शन और सुरक्षा
- डीबगिंग और विकास में आसान

**SSE ट्रांसपोर्ट (MCP 2025-06-18 से अवमूल्यित):**
- SSE एंडपॉइंट के साथ HTTP सर्वर की आवश्यकता
- वेब सर्वर बुनियादी ढांचे के साथ जटिल सेटअप
- HTTP एंडपॉइंट के लिए अतिरिक्त सुरक्षा विचार
- अब वेब-आधारित परिदृश्यों के लिए Streamable HTTP से प्रतिस्थापित

### stdio ट्रांसपोर्ट के साथ सर्वर बनाना

अपना stdio सर्वर बनाने के लिए हमें:

1. **आवश्यक लाइब्रेरी इम्पोर्ट करें** - MCP सर्वर घटक और stdio ट्रांसपोर्ट
2. **सर्वर उदाहरण बनाएँ** - क्षमताओं के साथ सर्वर को परिभाषित करें
3. **टूल्स परिभाषित करें** - वह कार्यक्षमता जोड़ें जो आप एक्सपोज़ करना चाहते हैं
4. **ट्रांसपोर्ट सेटअप करें** - stdio संचार को कॉन्फ़िगर करें
5. **सर्वर चलाएँ** - सर्वर शुरू करें और संदेशों को संभालें

आइए इसे चरण दर चरण बनाएं:

### चरण 1: एक बेसिक stdio सर्वर बनाएँ

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# लॉगिंग कॉन्फ़िगर करें
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# सर्वर बनाएं
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

### चरण 2: और अधिक टूल जोड़ें

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

### चरण 3: सर्वर चलाना

कोड को `server.py` के रूप में सेव करें और कमांड लाइन से चलाएँ:

```bash
python server.py
```

सर्वर शुरू हो जाएगा और stdin से इनपुट के लिए प्रतीक्षा करेगा। यह stdio ट्रांसपोर्ट पर JSON-RPC संदेशों का उपयोग करके संचार करता है।

### चरण 4: Inspector के साथ परीक्षण

आप MCP Inspector का उपयोग करके अपने सर्वर का परीक्षण कर सकते हैं:

1. Inspector इंस्टॉल करें: `npx @modelcontextprotocol/inspector`
2. Inspector चलाएँ और इसे अपने सर्वर पर पॉइंट करें
3. आपने जो टूल बनाए हैं उनका परीक्षण करें

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## अपने stdio सर्वर को डीबग करना

### MCP Inspector का उपयोग करना

MCP Inspector MCP सर्वरों के डीबगिंग और परीक्षण के लिए एक मूल्यवान उपकरण है। इसे अपने stdio सर्वर के साथ उपयोग करने का तरीका:

1. **Inspector इंस्टॉल करें**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Inspector चलाएँ**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **अपने सर्वर का परीक्षण करें**: Inspector एक वेब इंटरफेस प्रदान करता है जहां आप:
   - सर्वर क्षमताओं को देख सकते हैं
   - विभिन्न पैरामीटर के साथ टूल्स का परीक्षण कर सकते हैं
   - JSON-RPC संदेशों की निगरानी कर सकते हैं
   - कनेक्शन समस्याओं का डीबग कर सकते हैं

### VS Code का उपयोग करना

आप सीधे VS Code में भी अपने MCP सर्वर को डीबग कर सकते हैं:

1. `.vscode/launch.json` में लॉन्च कॉन्फ़िगरेशन बनाएँ:
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

2. अपने सर्वर कोड में ब्रेकपॉइंट सेट करें
3. डीबगर चलाएँ और Inspector के साथ परीक्षण करें

### सामान्य डीबगिंग सुझाव

- लॉगिंग के लिए `stderr` का उपयोग करें - कभी भी `stdout` पर न लिखें क्योंकि यह MCP संदेशों के लिए आरक्षित है
- सभी JSON-RPC संदेशों को नई लाइन द्वारा सीमांकित होना चाहिए
- पहले सरल टूल्स के साथ परीक्षण करें फिर जटिल कार्यक्षमता जोड़ें
- संदेश प्रारूप जांचने के लिए Inspector का उपयोग करें

## VS Code में अपने stdio सर्वर का उपयोग

जब आप अपने MCP stdio सर्वर बना लेते हैं, तो आप इसे VS Code के साथ एकीकृत कर सकते हैं ताकि इसे Claude या अन्य MCP-संगत क्लाइंट्स के साथ उपयोग किया जा सके।

### कॉन्फ़िगरेशन

1. **MCP कॉन्फ़िगरेशन फ़ाइल बनाएँ** `%APPDATA%\Claude\claude_desktop_config.json` (Windows) या `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Claude को पुनः आरंभ करें**: Claude को बंद करें और पुनः खोलें ताकि नया सर्वर कॉन्फ़िगरेशन लोड हो जाए।

3. **कनेक्शन का परीक्षण करें**: Claude के साथ बातचीत शुरू करें और अपने सर्वर के टूल्स का उपयोग करें:
   - "क्या आप अभिवादन टूल का उपयोग करके मुझे अभिवादित कर सकते हैं?"
   - "15 और 27 का जोड़ निकालो"
   - "सर्वर जानकारी क्या है?"

### TypeScript stdio सर्वर उदाहरण

संदर्भ के लिए एक पूर्ण TypeScript उदाहरण:

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

// उपकरण जोड़ें
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

### .NET stdio सर्वर उदाहरण

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

इस अपडेट किए गए पाठ में, आपने सीखा कि कैसे:

- वर्तमान **stdio ट्रांसपोर्ट** (अनुशंसित तरीका) का उपयोग करके MCP सर्वर बनाएं
- क्यों SSE ट्रांसपोर्ट को stdio और Streamable HTTP के पक्ष में अवमूल्यित किया गया
- ऐसे टूल बनाएं जिन्हें MCP क्लाइंट कॉल कर सकते हैं
- MCP Inspector का उपयोग करके अपने सर्वर को डीबग करें
- VS Code और Claude के साथ अपने stdio सर्वर को एकीकृत करें

stdio ट्रांसपोर्ट एक सरल, अधिक सुरक्षित, और अधिक प्रदर्शनक्षम तरीका प्रदान करता है MCP सर्वर बनाने के लिए, जो अवमूल्यित SSE विधि की तुलना में बेहतर है। यह 2025-06-18 के विनिर्देशन के अनुसार अधिकांश MCP सर्वर कार्यान्वयन के लिए अनुशंसित ट्रांसपोर्ट है।

### .NET

1. पहले कुछ टूल्स बनाते हैं, इसके लिए हम *Tools.cs* नामक एक फ़ाइल बनाएंगे जिसमें निम्नलिखित सामग्री होगी:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## अभ्यास: अपने stdio सर्वर का परीक्षण

अब जब आपने अपना stdio सर्वर बना लिया है, तो आइए इसे टेस्ट करके सुनिश्चित करें कि यह सही काम कर रहा है।

### आवश्यकताएँ

1. सुनिश्चित करें कि MCP Inspector इंस्टॉल है:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. आपका सर्वर कोड सेव है (जैसे `server.py`)

### Inspector के साथ परीक्षण

1. **अपने सर्वर के साथ Inspector शुरू करें**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **वेब इंटरफेस खोलें**: Inspector ब्राउज़र विंडो खोलेगा जो आपके सर्वर की क्षमताएँ दिखाएगा।

3. **टूल्स का परीक्षण करें**: 
   - `get_greeting` टूल को विभिन्न नामों के साथ आजमाएं
   - `calculate_sum` टूल को विभिन्न नंबरों के साथ टेस्ट करें
   - `get_server_info` टूल को कॉल करें ताकि सर्वर मेटाडाटा देखें

4. **संचार की निगरानी करें**: Inspector JSON-RPC संदेशों को दिखाता है जो क्लाइंट और सर्वर के बीच आदान-प्रदान हो रहे हैं।

### आपको क्या देखना चाहिए

जब आपका सर्वर सही से शुरू होता है, तो आपको देखना चाहिए:
- Inspector में सर्वर क्षमताओं की सूची
- परीक्षण के लिए उपलब्ध टूल्स
- सफल JSON-RPC संदेश विनिमय
- इंटरफेस में टूल प्रतिक्रियाएं दिखना

### सामान्य मुद्दे और समाधान

**सर्वर शुरू नहीं होता:**
- सुनिश्चित करें सभी निर्भरताएँ स्थापित हैं: `pip install mcp`
- Python सिंटैक्स और इंडेंटेशन जांचें
- कंसोल में त्रुटि संदेशों को देखें

**टूल्स दिखाई नहीं दे रहे:**
- सुनिश्चित करें कि `@server.tool()` डेकोरेटर्स मौजूद हैं
- सुनिश्चित करें कि टूल फ़ंक्शन `main()` से पहले परिभाषित हैं
- सर्वर ठीक से कॉन्फ़िगर है या नहीं जांचें

**कनेक्शन समस्याएँ:**
- सुनिश्चित करें कि सर्वर stdio ट्रांसपोर्ट का सही उपयोग कर रहा है
- किसी अन्य प्रक्रिया के हस्तक्षेप की जांच करें
- Inspector कमांड सिंटैक्स सत्यापित करें

## असाइनमेंट

अपने सर्वर को अधिक क्षमताओं के साथ विस्तार करें। [यह पेज](https://api.chucknorris.io/) देखें ताकि उदाहरण के लिए एक ऐसा टूल जोड़ सकें जो API कॉल करता हो। आप तय करें कि सर्वर कैसा दिखना चाहिए। मज़े करें :)

## समाधान

[समाधान](./solution/README.md) यहाँ एक संभव समाधान है जिसके साथ काम करता हुआ कोड है।

## मुख्य निष्कर्ष

इस अध्याय के मुख्य निष्कर्ष हैं:

- stdio ट्रांसपोर्ट स्थानीय MCP सर्वरों के लिए अनुशंसित तंत्र है।
- stdio ट्रांसपोर्ट MCP सर्वरों और क्लाइंट्स के बीच स्टैंडर्ड इनपुट/आउटपुट स्ट्रीम्स के माध्यम से सहज संचार की अनुमति देता है।
- आप डायरेक्टली Inspector और Visual Studio Code दोनों का उपयोग करके stdio सर्वरों को उपयोग कर सकते हैं, जिससे डीबगिंग और एकीकरण सरल हो जाता है।

## नमूने

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)

## अतिरिक्त संसाधन

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## आगे क्या

## अगले कदम

अब जब आपने stdio ट्रांसपोर्ट के साथ MCP सर्वर बनाना सीख लिया है, तो आप अधिक उन्नत विषयों का अन्वेषण कर सकते हैं:

- **अगला**: [MCP के साथ HTTP स्ट्रीमिंग (Streamable HTTP)](../06-http-streaming/README.md) - दूरस्थ सर्वरों के लिए अन्य समर्थित ट्रांसपोर्ट तंत्र के बारे में जानें
- **उन्नत**: [MCP सुरक्षा सर्वोत्तम प्रथाएँ](../../02-Security/README.md) - अपने MCP सर्वरों में सुरक्षा लागू करना
- **प्रोडक्शन**: [डिप्लॉयमेंट रणनीतियाँ](../09-deployment/README.md) - अपने सर्वरों को प्रोडक्शन उपयोग के लिए तैनात करना

## अतिरिक्त संसाधन

- [MCP विनिर्देशन 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - आधिकारिक विनिर्देशन
- [MCP SDK डोक्यूमेंटेशन](https://github.com/modelcontextprotocol/sdk) - सभी भाषाओं के लिए SDK संदर्भ
- [कमीunity उदाहरण](../../06-CommunityContributions/README.md) - समुदाय से अधिक सर्वर उदाहरण

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->