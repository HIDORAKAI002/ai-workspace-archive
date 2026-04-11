# ម៉ាស៊ីនមេ MCP ជាមួយការដឹកជញ្ជូន stdio

> **⚠️ ព័ត៌មានប្រកាសសំខាន់**៖ តាម MCP Specification 2025-06-18 ការ​ដឹកជញ្ជូន SSE (Server-Sent Events) ដែលមានឯករាជ្យត្រូវ​បាន**លុបចោល** ហើយបានប្ដូរទៅជាការដឹកជញ្ជូន "Streamable HTTP"។ បច្ចុប្បន្ន MCP កំណត់ពីរប្រភេទការដឹកជញ្ជូនសំខាន់ៗ៖
> 1. **stdio** - ការបញ្ចូល/ចេញស្តង់ដារ (ផ្តល់អនុសាសន៍សម្រាប់ម៉ាស៊ីនមេក្នុងស្រុក)
> 2. **Streamable HTTP** - សម្រាប់ម៉ាស៊ីនមេចម្ងាយដែលអាចប្រើ SSE ខាងក្នុង
>
> មេរៀននេះត្រូវបានធ្វើបច្ចុប្បន្នភាពដើម្បីផ្តោតលើ **ការដឹកជញ្ជូន stdio** ដែលជាវិធីសាស្ត្រផ្តល់អនុសាសន៍សម្រាប់ការអនុវត្តម៉ាស៊ីនមេ MCP ភាគច្រើន។

ការដឹកជញ្ជូន stdio អនុញ្ញាតឱ្យម៉ាស៊ីនមេ MCP សម្របសម្រួលជាមួយអតិថិជនតាមរយៈខ្សែបញ្ចូល និងបញ្ចេញស្តង់ដារ។ វាជាវិធីសាស្ត្រដឹកជញ្ជូនដែលប្រើប្រាស់សម្បូរពោលនិងផ្តល់អនុសាសន៍ក្នុងលក្ខណៈ MCP បច្ចុប្បន្ន ដោយផ្តល់វិធីសាមញ្ញនិងមានប្រសិទ្ធភាពក្នុងការបង្កើតម៉ាស៊ីនមេ MCP ដែលអាចបញ្ចូលបានយ៉ាងងាយស្រួលជាមួយកម្មវិធីអតិថិជនផ្សេងៗ។

## ទិដ្ឋភាពទូទៅ

មេរៀននេះគ្របដណ្តប់ពីរបៀបបង្កើតនិងប្រើប្រាស់ម៉ាស៊ីនមេ MCP ដោយប្រើការដឹកជញ្ជូន stdio ។

## គោលបំណងរៀន

នៅចុងបញ្ចប់មេរៀននេះ អ្នកនឹងអាច៖

- បង្កើតម៉ាស៊ីនមេ MCP ដោយប្រើការដឹកជញ្ជូន stdio។
- ប្រើ Inspector ដើម្បីដោះស្រាយបញ្ហាមួយម៉ាស៊ីនមេ MCP។
- ប្រើម៉ាស៊ីនមេ MCP ដោយប្រើ Visual Studio Code។
- យល់ដឹងពីប្រព័ន្ធដឹកជញ្ជូន MCP បច្ចុប្បន្ន និងមូលហេតុដែល stdio ត្រូវបានផ្តល់អនុសាសន៍។

## ការដឹកជញ្ជូន stdio - វាធ្វើការយ៉ាងដូចម្តេច

ការដឹកជញ្ជូន stdio គឺជាការដឹកជញ្ជូនមួយក្នុងចំណោមពីរការដឹកជញ្ជូនដែលគាំទ្រ តាម MCP Specification បច្ចុប្បន្ន (2025-06-18)៖

- **ការប្រាស្រ័យធម្មតា**៖ ម៉ាស៊ីនមេអានសារជា JSON-RPC ពីបញ្ចូលស្តង់ដារ (`stdin`) ហើយផ្ញើសារទៅបញ្ចេញស្តង់ដារ (`stdout`)។
- **អាស្រ័យលើដំណើរការ**៖ អតិថិជនបើកម៉ាស៊ីនមេ MCP ជាដំណើរការលំនៅក្នុង។
- **ទ្រង់ទ្រាយសារ**៖ សារជាការស្នើរសុំ JSON-RPC ផ្ទាល់ខ្លួន សេចក្តីជូនដំណឹង ឬការឆ្លើយតប ដែលបំបែកដោយខ្សែបន្ទាត់ថ្មី។
- **កំណត់ហេតុ**៖ ម៉ាស៊ីនមេអាចសរសេរខ្សែអក្សរ UTF-8 ទៅកាន់កំហុសស្តង់ដារ (`stderr`) សម្រាប់គោលបំណងកំណត់ហេតុ។

### ការទាមទារសំខាន់៖
- សារត្រូវតែបំបែកដោយខ្សែបន្ទាត់ថ្មី ហើយមិនត្រូវមានខ្សែបន្ទាត់ថ្មីនៅក្នុងសារ
- ម៉ាស៊ីនមេមិនត្រូវសរសេរអ្វីទៅ `stdout` លើសពីសារខាង MCP ដែលមានតែលេខសម្គាល់ត្រឹមត្រូវ
- អតិថិជនមិនត្រូវសរសេរអ្វីទៅ `stdin` របស់ម៉ាស៊ីនមេដែលមិនមែនជាសារខាង MCP ត្រឹមត្រូវ

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
```

នៅក្នុងកូដខាងលើ៖

- យើងនាំចូលថ្នាក់ `Server` និង `StdioServerTransport` ពី MCP SDK
- យើងបង្កើតម៉ាស៊ីនមេជាមួយកំណត់រចនាសម្ព័ន្ធមូលដ្ឋាន និងសមត្ថភាព

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# បង្កើតឧទាហរណ៍ម៉ាស៊ីនបម្រើ
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

នៅក្នុងកូដខាងលើ យើងមាន៖

- បង្កើតម៉ាស៊ីនមេដោយប្រើ MCP SDK
- កំណត់ឧបករណ៍ដោយប្រើជម្រើស
- ប្រើ stdio_server ជា context manager ដើម្បីគ្រប់គ្រងការដឹកជញ្ជូន

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

ភាពខុសគ្នាសំខាន់ពី SSE គឺម៉ាស៊ីនមេ stdio:

- មិនត្រូវការកំណត់ម៉ាស៊ីនបណ្ដាញ ឬចំណុចបញ្ចូល HTTP
- ត្រូវបានបើកជាដំណើរការលំនៅក្នុងដោយអតិថិជន
- ធ្វើប្រាស្រ័យតាមខ្សែបញ្ចូល/ចេញ stdin/stdout
- លspersសំរាប់អនុវត្តន៍និងដោះស្រាយបញ្ហា

## ហាត់ប្រាណ៖ បង្កើតម៉ាស៊ីនមេ stdio

ដើម្បីបង្កើតម៉ាស៊ីនមេរបស់យើង អ្នកត្រូវតែចងចាំរឿងពីរនេះ៖

- អ្នកត្រូវការប្រើម៉ាស៊ីនបណ្ដាញដើម្បីបង្ហាញចំណុចបញ្ចូលសម្រាប់ការតភ្ជាប់ និងសារ។

## ព្រឹត្តិការណ៍: បង្កើតម៉ាស៊ីនមេ MCP stdio សាមញ្ញ

ក្នុងព្រឹត្តិការណ៍នេះ យើងនឹងបង្កើតម៉ាស៊ីនមេ MCP សាមញ្ញដោយប្រើការដឹកជញ្ជូន stdio ដែលផ្តល់អនុសាសន៍។ ម៉ាស៊ីនមេនេះនឹងបង្ហាញឧបករណ៍ដែលអតិថិជនអាចហៅដោយប្រើ Model Context Protocol។

### លក្ខខណ្ឌនិងនិយមន័យជាមុន

- Python 3.8 ឬក្រោយ
- MCP Python SDK៖ `pip install mcp`
- ការយល់ដឹងមូលដ្ឋានពីកម្មវិធី async

ចាប់ផ្តើមបង្កើតម៉ាស៊ីនមេ MCP stdio ជាលើកដំបូង៖

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# កំណត់ការចុះបញ្ជី
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# បង្កើតម៉ាស៊ីនមេ
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
    # ប្រើការដឹកជញ្ជូន stdio
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## ភាពខុសគ្នាសំខាន់ពីវិធីសាស្ត្រ SSE ដែលបានលុបចោល

**Stdio Transport (ស្តង់ដារបច្ចុប្បន្ន):**
- ម៉ូឌែល subprocess ងាយស្រួល - អតិថិជនបើកម៉ាស៊ីនមេជាដំណើរការលំនៅក្នុង
- ប្រាស្រ័យតាម stdin/stdout ដោយប្រើសារជា JSON-RPC
- មិនត្រូវការតំឡើងម៉ាស៊ីនបណ្ដាញ HTTP
- ប្រសិទ្ធភាពខ្ពស់ និងសុវត្ថិភាពល្អប្រសើរ
- ងាយស្រួលដោះស្រាយកំហុស និងអភិវឌ្ឍ

**SSE Transport (បានលុបចោល ចាប់ពី MCP 2025-06-18):**
- តម្រូវម៉ាស៊ីនបណ្ដាញ HTTP ជាមួយចំណុចបញ្ចូល SSE
- ការតំឡើងស្មុគស្មាញជាមួយសំណង់ម៉ាស៊ីនបណ្ដាញ
- មានការពិចារណាសុវត្ថិភាពបន្ថែមសម្រាប់ចំណុចបញ្ចូល HTTP
- ឥឡូវបានប្ដូរជា Streamable HTTP សម្រាប់សេណារីយ៉ូមូលដ្ឋានបណ្ដាញ

### បង្កើតម៉ាស៊ីនមេជាមួយការដឹកជញ្ជូន stdio

ដើម្បីបង្កើតម៉ាស៊ីនមេ stdio របស់យើង អ្នកត្រូវធ្វើ៖

1. **នាំចូលបណ្ណាល័យដែលត្រូវការ** - អ្នកត្រូវការផ្នែកម៉ាស៊ីនមេ MCP និង stdio transport
2. **បង្កើតម៉ាស៊ីនមែនស្តង់​ដា** - កំណត់ម៉ាស៊ីនមេខាងការសមត្ថភាព
3. **កំណត់ឧបករណ៌** - បន្ថែមមុខងារដែលចង់បង្ហាញ
4. **កំណត់ការដឹកជញ្ជូន** - កំណត់ការប្រាស្រ័យ stdio
5. **ដំណើរការម៉ាស៊ីនមេ** - ចាប់ផ្តើមម៉ាស៊ីនមេ និងគ្រប់គ្រងសារ

ចាំបាច់ត្រូវតែនាំដំណាក់កាលជា​ជំហាន៖

### ជំហានទី 1: បង្កើតម៉ាស៊ីនមែ stdio មូលដ្ឋាន

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# កំណត់ការចុះហត្ថលេខា
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# បង្កើតម៉ាស៊ីនបម្រើ
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

### ជំហានទី 2: បន្ថែមឧបករណ៌បន្ថែម

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

### ជំហានទី 3: រត់ម៉ាស៊ីនមេ

រក្សាទុកកូដជាឯកសារ `server.py` ហើយរត់ជាមួយបញ្ជារបស់ command line៖

```bash
python server.py
```

ម៉ាស៊ីនមេនឹងចាប់ផ្តើម ហើយរង់ចាំការបញ្ចូលពី stdin។ វាប្រាស្រ័យទាក់ទងដោយប្រើសារជា JSON-RPC តាមរយៈ stdio transport។

### ជំហានទី 4: សាកល្បងជាមួយ Inspector

អ្នកអាចសាកល្បងម៉ាស៊ីនមេដោយប្រើ MCP Inspector៖

1. ចាក់ដំឡើង Inspector៖ `npx @modelcontextprotocol/inspector`
2. រត់ Inspector ហើយបង្ហាញទៅម៉ាស៊ីនមេរបស់អ្នក
3. សាកល្បងឧបករណ៌ដែលអ្នកបានបង្កើត

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## ដោះស្រាយកំហុសម៉ាស៊ីនមេ stdio របស់អ្នក

### ប្រើ MCP Inspector

MCP Inspector គឺជាឧបករណ៍ដ៏មានតម្លៃសម្រាប់ដោះស្រាយកំហុស និងសាកល្បងម៉ាស៊ីនមេ MCP។ វាជាការប្រើប្រាស់ជាមួយម៉ាស៊ីនមេ stdio របស់អ្នក៖

1. **ដំឡើង Inspector**៖
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **រត់ Inspector**៖
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **សាកល្បងម៉ាស៊ីនមេរបស់អ្នក**៖ Inspector ផ្តល់ជួននូវចំណុចប្ដូរអ៊ីនធឺហ្វេស្ថ្មង ដែលអ្នកអាច៖
   - មើលសមត្ថភាពម៉ាស៊ីនមេ
   - សាកល្បងឧបករណ៌ជាមួយប៉ារ៉ាម៉ែត្រផ្សេងៗ
   - តាមដានសារជា JSON-RPC
   - ដោះស្រាយបញ្ហាការតភ្ជាប់

### ប្រើ VS Code

អ្នកក៏អាចដោះស្រាយកំហុសម៉ាស៊ីនមេ MCP របស់អ្នកដោយផ្ទាល់ក្នុង VS Code៖

1. បង្កើតការកំណត់ចាប់ផ្តើមនៅ `.vscode/launch.json`:
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

2. កំណត់លំនៅខ្នាតចំណុចព្រួញ (breakpoints) នៅក្នុងកូដម៉ាស៊ីនមេរបស់អ្នក
3. រត់ debugger ហើយសាកល្បងជាមួយ Inspector

### រូបមន្តដោះស្រាយកំហុសទូទៅ

- ប្រើ `stderr` សម្រាប់កំណត់ហេតុ - មិនដែលសរសេរទៅ `stdout` ពីព្រោះវាសម្រាប់សារគម្រោង MCP
- ប្រាកដថាសារជា JSON-RPC ទាំងអស់បានបំបែកដោយខ្សែបន្ទាត់ថ្មី
- សាកល្បងឧបករណ៌សាមញ្ញមុនពេលបន្ថែមមុខងារស្មុគស្មាញ
- ប្រើ Inspector ដើម្បីពិនិត្យទ្រង់ទ្រាយសារ

## ប្រើម៉ាស៊ីនមេ stdio របស់អ្នកក្នុង VS Code

ពេលដែលអ្នកបានបង្កើតម៉ាស៊ីនមេ MCP stdio អ្នកអាចបញ្ចូលវាជាមួយ VS Code ដើម្បីប្រើជាមួយ Claude ឬអតិថិជន MCP ផ្សេងទៀត។

### ការកំណត់

1. **បង្កើតឯកសារកំណត់ MCP នៅ `%APPDATA%\Claude\claude_desktop_config.json` (Windows) សៀវភៅឯកសារ `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):**

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

2. **ចាប់ផ្តើមឡើងវិញ Claude**៖ បិទ និងបើកឡើង Claude ដើម្បីផ្ទុកការកំណត់ម៉ាស៊ីនមេថ្មី។

3. **សាកល្បងការតភ្ជាប់**៖ ចាប់ផ្តើមការសន្ទនាជាមួយ Claude ហើយព្យាយាមប្រើឧបករណ៌ម៉ាស៊ីនមេរបស់អ្នក៖
   - "តើអ្នកអាចអបអរសាទរខ្ញុំដោយប្រើឧបករណ៌ស្វាគមន៍បានទេ?"
   - "គណនាអាណិតទាំងមូលរបស់ 15 និង 27"
   - "តើព័ត៌មានម៉ាស៊ីនមេជាអ្វី?"

### ឧទាហរណ៍ម៉ាស៊ីនមេ stdio TypeScript

នេះជាឧទាហរណ៍ TypeScript ជាច្រើនសម្រាប់យោង៖

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

// បន្ថែមឧបករណ៍
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

### ឧទាហរណ៍ម៉ាស៊ីនមេ stdio .NET

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

## សង្ខេប

ក្នុងមេរៀននេះ អ្នកបានរៀនរបៀប៖

- បង្កើតម៉ាស៊ីនមេ MCP ដោយប្រើការដឹកជញ្ជូន **stdio** បច្ចុប្បន្ន (វិធីសាស្ត្រផ្តល់អនុសាសន៍)
- យល់ថាហេតុអ្វីបានជាការដឹកជញ្ជូន SSE ត្រូវបានលុបចោលមក stdio និង Streamable HTTP
- បង្កើតឧបករណ៌ដែលអាចហៅដោយអតិថិជន MCP
- ដោះស្រាយកំហុសម៉ាស៊ីនមេរបស់អ្នកដោយប្រើ MCP Inspector
- បញ្ចូលម៉ាស៊ីនមេ stdio របស់អ្នកជាមួយ VS Code និង Claude

ការដឹកជញ្ជូន stdio ផ្តល់វិធីសាមញ្ញ, មានសុវត្ថិភាពខ្ពស់ និងប្រសិទ្ធភាពល្អក្នុងការបង្កើតម៉ាស៊ីនមេខាង MCP ប្រៀបធៀបនឹងវិធីសាស្តរ SSE ដែលបានលុបចោល។ វាជាការដឹកជញ្ជូនផ្តល់អនុសាសន៍សម្រាប់ការអនុវត្តម៉ាស៊ីនមេខាង MCP ភាគច្រើនតាម MCP Specification ថ្ងៃទី 2025-06-18។

### .NET

1. យើងនឹងបង្កើតឧបករណ៌ជាមួយគ្នាមុនសិន សម្រាប់នេះយើងនឹងបង្កើតឯកសារ *Tools.cs* ដោយមានមាតិកាដូចខាងក្រោម៖

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## ហាត់ប្រាណ៖ សាកល្បងម៉ាស៊ីនមេ stdio របស់អ្នក

ឥឡូវនេះអ្នកបានបង្កើតម៉ាស៊ីនមេ stdio រួចហើយ យើងត្រូវសាកល្បងដើម្បីប្រាកដថាវាដំណើរការទៅតាមរូបមន្ត។

### លក្ខខណ្ឌមុន

1. ចាប់ផ្តើមដោយផ្ទៀងផ្ទាត់ថាអ្នកមាន MCP Inspector ដំឡើងរួច៖
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. កូដម៉ាស៊ីនមេរបស់អ្នកត្រូវបានរក្សាទុក (ឧ. `server.py`)

### សាកល្បងជាមួយ Inspector

1. **ចាប់ផ្តើម Inspector ជាមួយម៉ាស៊ីនមេរបស់អ្នក**៖
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **បើកអ៊ីនធឺហ្វេសបណ្ដាញ**៖ Inspector នឹងបើកវីនដូនប្រើប្រាស់បង្ហាញសមត្ថភាពម៉ាស៊ីនមេរបស់អ្នក។

3. **សាកល្បងឧបករណ៌**៖
   - សាកល្បងឧបករណ៌ `get_greeting` ជាមួយឈ្មោះផ្សេងៗ
   - សាកល្បងឧបករណ៌ `calculate_sum` ជាមួយលេខផ្សេងៗ
   - ហៅឧបករណ៌ `get_server_info` ដើម្បីមើលព័ត៌មានម៉ាស៊ីនមេ

4. **តាមដានការប្រាស្រ័យ**៖ Inspector បង្ហាញសារជា JSON-RPC ដែលផ្លាស់ប្តូររវាងអតិថិជន និងម៉ាស៊ីនមេ។

### អ្វីដែលអ្នកគួរមើលឃើញ

ពេលម៉ាស៊ីនមេរបស់អ្នកចាប់ផ្តើមបានត្រឹមត្រូវ អ្នកគួរមើលឃើញ៖
- សមត្ថភាពម៉ាស៊ីនមេបង្ហាញនៅក្នុង Inspector
- ឧបករណ៌ដែលមានសម្រាប់សាកល្បង
- ការផ្លាស់ប្តូរសារជា JSON-RPC ដ៏ជោគជ័យ
- ឆ្លើយតបឧបករណ៌បង្ហាញក្នុងអ៊ីនធឺហ្វេស

### បញ្ហាទូទៅ និងដំណោះស្រាយ

**ម៉ាស៊ីនមេមិនចាប់ផ្តើមឡើង៖**
- ពិនិត្យថារួចហើយមានការតំឡើងទាំងអស់៖ `pip install mcp`
- ពិនិត្យវេលានៃ Python និងការវាយបញ្ចូល
- មើលសារកំហុសនៅក្នុង console

**ឧបករណ៌មិនបង្ហាញ៖**
- ប្រាកដថាតែង `@server.tool()` មាននៅ
- ពិនិត្យកម្មវិធីឧបករណ៌ត្រូវបានកំណត់មុន `main()`
- ពិនិត្យម៉ាស៊ីនមេចាប់ផ្តើមបានត្រឹមត្រូវ

**បញ្ហាការតភ្ជាប់៖**
- ប្រាកដថាម៉ាស៊ីនមេប្រើ stdio transport ត្រឹមត្រូវ
- ពិនិត្យមើលមិនមានដំណើរការផ្សេងរអិលជួញ
- ពិនិត្យ syntax ពាក្យបញ្ជា Inspector

## ការចាត់តាំងវិជ្ជាជីវៈ

សាកល្បងបន្ថែមសមត្ថភាពក្នុងម៉ាស៊ីនមេរបស់អ្នក។ មើល [ទំព័រនេះ](https://api.chucknorris.io/) ដើម្បីដាក់ឧបករណ៍មួយដែលហៅ API។ អ្នកជ្រើសរើសរបៀបដែលម៉ាស៊ីនមែរបស់អ្នកគួរមើល។ រីករាយ :)

## ដំណោះស្រាយ

[ដំណោះស្រាយ](./solution/README.md) នេះជាដំណោះស្រាយមួយដែលអាចប្រតិបត្តិការបានជាមួយកូដ។

## ចំណុចសង្ខេបសំខាន់ៗ

ចំណុចសំខាន់ៗក្នុងជំពូកនេះមាន៖

- ការដឹកជញ្ជូន stdio គឺជាវិធីសាស្ត្រផ្តល់អនុសាសន៍សម្រាប់ម៉ាស៊ីនមេនៅក្នុងស្រុក។
- ការដឹកជញ្ជូន stdio អនុញ្ញាតឱ្យមានការប្រាស្រ័យទាក់ទងរវាងម៉ាស៊ីនមេ MCP និងអតិថិជនដោយរលូនតាមខ្សែបញ្ចូល និងបញ្ចេញស្តង់ដារ។
- អ្នកអាចប្រើ Inspector និង Visual Studio Code ដើម្បីប្រើម៉ាស៊ីនមេ stdio ដោយផ្ទាល់ ធ្វើឱ្យការដោះស្រាយកំហុស និងការចងក្រងងាយស្រួល។

## ឧទាហរណ៍

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)

## ឯកសារបន្ថែម

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## វាអ្វីខ្លះបន្ទាប់ពីនេះ

## ជំហានបន្ទាប់

ឥឡូវនេះអ្នកបានរៀនរបៀបបង្កើតម៉ាស៊ីនមេ MCP ជាមួយការដឹកជញ្ជូន stdio អ្នកអាចស្វែងរកប្រធានបទកម្រិតខ្ពស់បន្ថែម៖

- **បន្ទាប់**: [HTTP Streaming ជាមួយ MCP (Streamable HTTP)](../06-http-streaming/README.md) - រៀនអំពីការដឹកជញ្ជូនគាំទ្រទីពីរ សម្រាប់ម៉ាស៊ីនមេចម្ងាយ
- **កម្រិតខ្ពស់**: [វិធានសុវត្ថិភាព MCP](../../02-Security/README.md) - អនុវត្តសុវត្ថិភាពនៅក្នុងម៉ាស៊ីនមេ MCP របស់អ្នក
- **ផលិតកម្ម**: [យុទ្ធសាស្ត្រផ្សព្វផ្សាយ](../09-deployment/README.md) - បង្ហោះម៉ាស៊ីនមេសម្រាប់ប្រើប្រាស់ផលិតកម្ម

## ឯកសារបន្ថែម

- [MCP Specification 2025-06-18](https://spec.modelcontextprotocol.io/specification/) - លក្ខណៈបច្ចេកទេសផ្លូវការដែលបានផ្ទៀងផ្ទាត់
- [ឯកសារ MCP SDK](https://github.com/modelcontextprotocol/sdk) - ឯកសារអំពី SDK សម្រាប់ភាសាដែលផ្សេងៗគ្នា
- [ឧទាហរណ៍ពីសហគមន៍](../../06-CommunityContributions/README.md) - ឧទាហរណ៍ម៉ាស៊ីនមែពីសហគមន៍ផ្សេងៗ

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**៖  
ឯកសារនេះត្រូវបានបកប្រែដោយប្រើសេវាបកប្រែAI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ខណៈពេលយើងខិតខំរកភាពត្រឹមត្រូវ សូមយល់ដឹងថាការបកប្រែដោយស្វ័យប្រវត្តិអាចមានកំហុស ឬការមិនត្រឹមត្រូវ។ ឯកសារដើមក្នុងភាសាកំណើតគួរត្រូវបានគេចាត់ទុកជាផ្លូវការជាមូលដ្ឋាន។ សម្រាប់ព័ត៌មានសំខាន់ៗ គួរពិចារណាបកប្រែដោយមនុស្សជំនាញវិជ្ជាជីវៈ។ យើងមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសប្លែកណាមួយដែលកើតឡើងពីការប្រើប្រាស់ការបកប្រែនេះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->