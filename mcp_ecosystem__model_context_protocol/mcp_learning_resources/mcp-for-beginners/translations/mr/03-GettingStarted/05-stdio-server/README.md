# stdio ट्रान्सपोर्टसह MCP सर्व्हर

> **⚠️ महत्वाची अद्ययावत माहिती**: MCP स्पेसिफिकेशन 2025-06-18 नुसार, स्वतंत्र SSE (सर्व्हर-सेंट इव्हेंट्स) ट्रान्सपोर्टला **डिप्रिकेलेट** केले गेले आहे आणि "Streamable HTTP" ट्रान्सपोर्टने त्याची जागा घेतली आहे. चालू MCP स्पेसिफिकेशन दोन मुख्य ट्रान्सपोर्ट यंत्रणा परिभाषित करते:
> 1. **stdio** - स्टँडर्ड इनपुट/आउटपुट (स्थानिक सर्व्हर्ससाठी शिफारस केलेले)
> 2. **Streamable HTTP** - रिमोट सर्व्हर्ससाठी जे SSE अंतर्गत वापरू शकतात
>
> हा धडा **stdio ट्रान्सपोर्ट** वर लक्ष केंद्रित करण्यासाठी अद्ययावत केला गेला आहे, जो बहुतेक MCP सर्व्हर अंमलबजावणींसाठी शिफारस केलेली पद्धत आहे.

stdio ट्रान्सपोर्ट MCP सर्व्हर्सना क्लायंटसोबत स्टँडर्ड इनपुट आणि आउटपुट स्ट्रीम्सद्वारे संवाद साधण्याची परवानगी देतो. हे चालू MCP स्पेसिफिकेशनमध्ये सर्वाधिक वापरले जाणारे आणि शिफारस केलेले ट्रान्सपोर्ट यंत्रणा असून, विविध क्लायंट अनुप्रयोगांसह सहजपणे एकत्रीकरण करता येईल अशा MCP सर्व्हर्स तयार करण्याचा सोपा आणि कार्यक्षम मार्ग प्रदान करतो.

## आढावा

हा धडा stdio ट्रान्सपोर्ट वापरून MCP सर्व्हर कसे तयार करायचे आणि वापरायचे हे शिकवतो.

## शिकण्याचे उद्दिष्टे

या धड्याच्या शेवटी, तुम्ही सक्षम असाल:

- stdio ट्रान्सपोर्ट वापरून MCP सर्व्हर तयार करण्यासाठी.
- Inspector वापरून MCP सर्व्हरचे डीबगिंग करण्यासाठी.
- Visual Studio Code वापरून MCP सर्व्हरचा वापर करण्यासाठी.
- चालू MCP ट्रान्सपोर्ट यंत्रणा समजून घेण्यासाठी आणि stdio का शिफारस केले जाते हे जाणून घेण्यासाठी.


## stdio ट्रान्सपोर्ट - ते कसे कार्य करते

stdio ट्रान्सपोर्ट चालू MCP स्पेसिफिकेशन (2025-11-25) मधील दोन समर्थित ट्रान्सपोर्ट प्रकारांपैकी एक आहे. याचा कार्यप्रकार:

- **सोपे संवाद**: सर्व्हर JSON-RPC संदेश स्टँडर्ड इनपुट (`stdin`) वरून वाचतो आणि संदेश स्टँडर्ड आउटपुट (`stdout`) वर पाठवतो.
- **प्रक्रिया-आधारित**: क्लायंट MCP सर्व्हर उपप्रक्रिया म्हणून सुरू करतो.
- **संदेश स्वरूप**: संदेश वेगवेगळे JSON-RPC विनंत्या, सूचना किंवा प्रतिसाद असतात, जे नवीन ओळीने विभाजित केलेले असतात.
- **लॉगिंग**: सर्व्हर लॉगिंगसाठी स्टँडर्ड एरर (`stderr`) ला UTF-8 स्ट्रिंग्ज लिहू शकतो.

### मुख्य आवश्यकता:
- संदेश नवीन ओळीने विभाजित असणे आवश्यक आहे आणि त्यात एम्बेड केलेली नवीन ओळी असू नयेत.
- सर्व्हर `stdout` वर वैध MCP संदेशाशिवाय काही लिहू नये.
- क्लायंट सर्व्हरच्या `stdin` मध्ये वैध MCP संदेशाशिवाय काहीही लिहू नये.

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

वरील कोडमध्ये:

- MCP SDK मधून `Server` वर्ग आणि `StdioServerTransport` आयात केले आहेत
- बेसिक कॉन्फिगरेशन आणि क्षमता सह सर्व्हर उदाहरण तयार केले आहे
- `StdioServerTransport` उदाहरण तयार करून सर्व्हरला त्याच्याशी जोडले आहे, ज्यामुळे stdin/stdout वर संवाद शक्य होतो

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# सर्व्हर उदाहरण तयार करा
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

वरील कोडमध्ये:

- MCP SDK वापरून सर्व्हर उदाहरण तयार केले आहे
- डेकॉरेटर वापरून टूल्स परिभाषित केले आहेत
- ट्रान्सपोर्ट हाताळण्यासाठी stdio_server context manager वापरला आहे

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

SSE पासून मुख्य फरक असा आहे की stdio सर्व्हर्स:

- वेब सर्व्हर सेटअप किंवा HTTP एंडपॉइंट्सची गरज नसते
- क्लायंटद्वारे उपप्रक्रिया म्हणून सुरू होतात
- stdin/stdout स्ट्रीम्सद्वारे संवाद साधतात
- यांची अंमलबजावणी आणि डीबगिंग सोपी आहे

## सराव: stdio सर्व्हर तयार करणे

सर्व्हर तयार करताना खालील बाबी लक्षात ठेवाव्या लागतील:

- कनेक्शन आणि संदेशांसाठी एंडपॉइंट्स उघडण्यासाठी वेब सर्व्हर वापरावा लागेल.

## प्रयोगशाळा: एक सोपा MCP stdio सर्व्हर तयार करणे

या प्रयोगशाळेत, आपण शिफारस केलेल्या stdio ट्रान्सपोर्ट वापरून सोपा MCP सर्व्हर तयार करू. हा सर्व्हर क्लायंटसाठी मानक Model Context Protocol वापरून कॉल करण्यायोग्य टूल्स उघडेल.

### आवश्यकताः

- Python 3.8 किंवा नंतरचे
- MCP Python SDK: `pip install mcp`
- async प्रोग्रामिंगची मूलभूत समज

चला आमचा पहिला MCP stdio सर्व्हर तयार करूया:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# लॉगिंग कॉन्फिगर करा
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# सर्व्हर तयार करा
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
    # stdio ट्रान्सपोर्ट वापरा
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```


## डिप्रिकेलेट केलेल्या SSE पद्धतीपासून मुख्य फरक

**Stdio ट्रान्सपोर्ट (चालू मानक):**
- सोपा उपप्रक्रिया मॉडेल - क्लायंट सर्व्हर ला चाइल्ड प्रक्रिया म्हणून सुरू करतो
- stdin/stdout वापरून JSON-RPC संदेशांनी संवाद
- HTTP सर्व्हर सेटअपची गरज नाही
- चांगली कार्यक्षमता आणि सुरक्षा
- सोपे डीबगिंग आणि विकास

**SSE ट्रान्सपोर्ट (MCP 2025-06-18 पासून डिप्रिकेलेट):**
- SSE एंडपॉइंटसह HTTP सर्व्हर आवश्यक
- वेब सर्व्हर इन्फ्रास्ट्रक्चरसह अधिक जटिल सेटअप
- HTTP एंडपॉइंटससाठी अतिरिक्त सुरक्षा विचार
- आता वेब-आधारित परिस्थितीसाठी Streamable HTTP ने बदललेले

### stdio ट्रान्सपोर्टसह सर्व्हर तयार करणे

सर्व्हर तयार करण्यासाठी आम्हाला:

1. **आवश्यक लायब्ररी आयात करा** - MCP सर्व्हर घटक आणि stdio ट्रान्सपोर्ट आवश्यक आहेत.
2. **सर्व्हर उदाहरण तयार करा** - त्याची क्षमता परिभाषित करा.
3. **टूल्स परिभाषित करा** - जी कार्यक्षमता तुम्हाला उघडायची आहे ती लिहा.
4. **ट्रान्सपोर्ट सेट करा** - stdio संवाद कॉन्फिगर करा.
5. **सर्व्हर चालवा** - सर्व्हर सुरू करा आणि संदेश हाताळा.

चला हळूहळू हे तयार करूया:

### चरण 1: एक मूलभूत stdio सर्व्हर तयार करा

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# लॉगिंग कॉन्फिगर करा
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# सर्व्हर तयार करा
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

### चरण 2: आणखी टूल्स जोडा

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

### चरण 3: सर्व्हर चालवा

कोड `server.py` नावाने जतन करा आणि कमांड लाइनवरुन चालवा:

```bash
python server.py
```

सर्व्हर सुरू होईल आणि stdin कडून इनपुटची वाट पाहेल. तो stdio ट्रान्सपोर्ट वापरून JSON-RPC संदेशांद्वारे संवाद साधतो.

### चरण 4: Inspector वापरून चाचणी

आपण आपला सर्व्हर MCP Inspector वापरून तपासू शकता:

1. Inspector इन्स्टॉल करा: `npx @modelcontextprotocol/inspector`
2. Inspector चालवा आणि आपला सर्व्हर ट्रॅक करा
3. तयार केलेले टूल्स तपासा

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```


## आपल्या stdio सर्व्हरचे डीबगिंग

### MCP Inspector वापरणे

MCP Inspector हे MCP सर्व्हर्सचे डीबगिंग आणि चाचणीसाठी उपयुक्त साधन आहे. खाली त्याचा stdio सर्व्हरसोबत उपयोग करण्याचा मार्ग:

1. **Inspector स्थापित करा**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Inspector चालवा**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **आपला सर्व्हर तपासा**: Inspector वेब इंटरफेस उपलब्ध करून देतो जिथे तुम्ही:
   - सर्व्हर क्षमतांचा आढावा घेऊ शकता
   - विविध पॅरामीटर्ससह टूल्सची चाचणी करू शकता
   - JSON-RPC संदेशांचे निरीक्षण करू शकता
   - कनेक्शन समस्या डीबग करू शकता

### VS Code वापरणे

तुम्ही थेट VS Code मध्ये देखील MCP सर्व्हर डीबग करू शकता:

1. `.vscode/launch.json` मध्ये लॉन्च कॉन्फिगरेशन तयार करा:
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

2. सर्व्हर कोडमध्ये ब्रेकपॉइंट्स सेट करा
3. डीबगर चालवा आणि Inspector सह तपासा

### सामान्य डीबगिंग टीपा

- लॉगिंगसाठी `stderr` वापरा - `stdout` काहीही लिहू नका कारण तो MCP संदेशांसाठी राखीव आहे
- सर्व JSON-RPC संदेश नवीन ओळीने विभाजित असावेत
- सुरुवातीला सोपे टूल्स वापरून तपासा, त्यानंतर जटिल कार्यक्षमता जोडा
- संदेश स्वरूपासाठी Inspector वापरा

## VS Code मध्ये stdio सर्व्हर वापरणे

एकदा आपण MCP stdio सर्व्हर तयार केला की, तुम्ही तो VS Code सोबत एकत्र करू शकता जेणेकरून तो Claude किंवा इतर MCP सुसंगत क्लायंटसह वापरता येईल.

### कॉन्फिगरेशन

1. **MCP कॉन्फिगरेशन फाइल तयार करा** `%APPDATA%\Claude\claude_desktop_config.json` (Windows) किंवा `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Claude रीस्टार्ट करा**: नवीन सर्व्हर कॉन्फिगरेशन लोड करण्यासाठी Claude बंद करून पुन्हा उघडा.

3. **कनेक्शन चाचणी करा**: Claude सह संवाद सुरू करा आणि तुमचे सर्व्हर टूल्स वापरून बघा:
   - "Can you greet me using the greeting tool?"
   - "Calculate the sum of 15 and 27"
   - "What's the server info?"

### TypeScript stdio सर्व्हर उदाहरण

संदर्भासाठी पूर्ण TypeScript उदाहरण:

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

// साधने जोडा
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

### .NET stdio सर्व्हर उदाहरण

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

या अद्ययावत धड्यात, आपण शिकलात कसे:

- चालू **stdio ट्रान्सपोर्ट** वापरून MCP सर्व्हर्स तयार करायचे (शिफारस केलेली पद्धत)
- SSE ट्रान्सपोर्ट का कमी केला गेला आणि stdio व Streamable HTTP कसे पर्यायी झाले त्याची समज
- MCP क्लायंटद्वारे कॉल करता येणारी टूल्स तयार करा
- MCP Inspector वापरून आपला सर्व्हर डीबग करा
- VS Code आणि Claude सोबत stdio सर्व्हर एकत्र करा

stdio ट्रान्सपोर्ट डिप्रिकेलेट केलेल्या SSE पद्धतीच्या तुलनेत MCP सर्व्हर तयार करण्याचा सोपा, अधिक सुरक्षित आणि कार्यक्षम मार्ग प्रदान करतो. 2025-06-18 च्या स्पेसिफिकेशननुसार हा बहुतेक MCP सर्व्हर अंमलबजावणींसाठी शिफारस केलेला ट्रान्सपोर्ट आहे.


### .NET

1. आपण प्रथम काही टूल्स तयार करू या, यासाठी *Tools.cs* नावाची फाइल खालील सामग्रीसह तयार करू:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## सराव: आपल्या stdio सर्व्हरची चाचणी

आपण stdio सर्व्हर तयार केल्यावर, त्याची कार्यप्रणाली बघण्यासाठी चाचणी करू या.

### आवश्यकताः

1. तपासा की MCP Inspector इन्स्टॉल केलेला आहे:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. सर्व्हर कोड सेव्ह केले आहे (उदा. `server.py`)

### Inspector सह चाचणी

1. **आपल्या सर्व्हरसोबत Inspector सुरू करा**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **वेब इंटरफेस उघडा**: Inspector तुमच्या सर्व्हरची क्षमता दाखवणारा ब्राउझर विंडो उघडेल.

3. **टूल्स तपासा**:
   - विविध नावांसह `get_greeting` टूल वापरा
   - वेगवेगळ्या संख्यांसह `calculate_sum` टूल तपासा
   - सर्व्हर मेटाडेटासाठी `get_server_info` कॉल करा

4. **संवादाचे निरीक्षण करा**: Inspector क्लायंट आणि सर्व्हरमधील JSON-RPC संदेशांची देवाणघेवाण दाखवतो.

### तुम्हाला काय दिसेल

जेव्हा तुमचा सर्व्हर योग्यरित्या सुरू होईल, तेव्हा आपण पाहाल:
- Inspector मध्ये सर्व्हर क्षमता यादी
- तपासणीस टूल्स उपलब्ध
- यशस्वी JSON-RPC संदेश विनिमय
- टूल प्रतिसाद इंटरफेस मध्ये दिसणे

### सामान्य समस्या आणि उपाय

**सर्व्हर सुरू होत नाही:**
- सर्व अवलंबित्वे इन्स्टॉल आहेत का तपासा: `pip install mcp`
- Python सिंटॅक्स आणि इंडेंटेशन तपासा
- कन्सोलमधील त्रुटी संदेश पहा

**टूल्स दिसत नाहीत:**
- `@server.tool()` डेकॉरेटर आहेत का तपासा
- `main()` आधी टूल फंक्शन्स परिभाषित आहेत का तपासा
- सर्व्हर योग्यरित्या कॉन्फिगर आहे का पाहा

**कनेक्शन समस्या:**
- सर्व्हर stdio ट्रान्सपोर्टचा योग्य वापर करत आहे का पाहा
- इतर कोणतीही प्रक्रिया अडथळा आणत नाहीत याची खात्री करा
- Inspector कमांड सिंटॅक्स तपासा

## असाइनमेंट

तुमचा सर्व्हर अधिक क्षमतांनी निर्मित करा. उदाहरणार्थ, [या पेजवरून](https://api.chucknorris.io/) एपीआय कॉल करणारे टूल जोडा. तुम्ही ठरवा सर्व्हर कसा असावा. मजा करा :)

## सोल्यूशन

[सोल्यूशन](./solution/README.md) येथे एक संभाव्य सोल्यूशन कार्यरत कोडसह आहे.

## मुख्य गोष्टी लक्षात ठेवावयाच्या

या अध्यायातील मुख्य मुद्दे:

- stdio ट्रान्सपोर्ट हा स्थानिक MCP सर्व्हर्ससाठी शिफारस केलेला यंत्रणा आहे.
- stdio ट्रान्सपोर्ट MCP सर्व्हर्स आणि क्लायंट्समधील सहज संवादासाठी स्टँडर्ड इनपुट आणि आउटपुट स्ट्रीम्स वापरतो.
- तुम्ही थेट Inspector आणि Visual Studio Code वापरुन stdio सर्व्हर्सचा वापर करू शकता, ज्यामुळे डीबगिंग आणि एकत्रीकरण सोपे होते.

## नमुने

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)

## अतिरिक्त स्रोत

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## पुढे काय

## पुढील टप्पे

आता तुम्ही stdio ट्रान्सपोर्टसह MCP सर्व्हर कसे तयार करायचे शिकलात, पुढील प्रगत विषय एक्सप्लोर करा:

- **पुढे**: [HTTP Streaming with MCP (Streamable HTTP)](../06-http-streaming/README.md) - रिमोट सर्व्हर्ससाठी दुसऱ्या समर्थित ट्रान्सपोर्ट यंत्रणेबद्दल शिका
- **प्रगत**: [MCP Security Best Practices](../../02-Security/README.md) - MCP सर्व्हर्समध्ये सुरक्षा कशी अंमलात आणायची
- **प्रॉडक्शन**: [Deployment Strategies](../09-deployment/README.md) - उत्पादन वापरासाठी सर्व्हर कसे तैनात करायचे

## अतिरिक्त स्रोत

- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - अधिकृत स्पेसिफिकेशन
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk) - सर्व भाषांसाठी SDK संदर्भ
- [Community Examples](../../06-CommunityContributions/README.md) - समुदायाकडून आणखी सर्व्हर उदाहरणे

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->