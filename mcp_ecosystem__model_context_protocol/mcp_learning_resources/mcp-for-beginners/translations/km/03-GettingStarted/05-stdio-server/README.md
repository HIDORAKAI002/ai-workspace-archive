# MCP ម៉ាស៊ីនមេជាមួយការដឹកជញ្ជូន stdio

> **⚠️ កំណែទម្រង់សំខាន់**៖ ចាប់ពីការបញ្ជាក់ MCP 2025-06-18 ការដឹកជញ្ជូន SSE ដាច់ដោយឡែក (Server-Sent Events) ត្រូវបាន **បញ្ឈប់** ហើយបានប្ដូរជាការដឹកជញ្ជូន "Streamable HTTP"។ ការបញ្ជាក់ MCP បច្ចុប្បន្នកំណត់វិធីដឹកជញ្ជូនចម្បងពីរប្រភេទ៖
> 1. **stdio** - អង់ព្វែងស្តាតដង់/បញ្ចេញស្តង់ដា (បានណែនាំសម្រាប់ម៉ាស៊ីនមេក្នុងស្រុក)
> 2. **Streamable HTTP** - សម្រាប់ម៉ាស៊ីនមេចម្ងាយដែលអាចប្រើ SSE នៅផ្នែកខាងក្នុង
>
> មេរៀននេះត្រូវបានបច្ចុប្បន្នភាពដើម្បីផ្តោតលើ **stdio transport** ដែលជាវិធីដែលបានណែនាំសម្រាប់ការអនុវត្តម៉ាស៊ីនមេ MCP ជាច្រើន។

ការដឹកជញ្ជូន stdio អនុញ្ញាតឲ្យម៉ាស៊ីនមេ MCP ទំនាក់ទំនងជាមួយក្រាដែលតាមរយៈអង់ព្វែង និងបញ្ចេញស្តង់ដា។ នេះគឺជាវិធីដឹកជញ្ជូនដែលត្រូវបានប្រើប្រាស់ និងណែនាំជាទូទៅក្នុងការបញ្ជាក់ MCP បច្ចុប្បន្ន ដែលផ្តល់មុខងារងាយស្រួល និងមានប្រសិទ្ធភាពក្នុងការបង្កើតម៉ាស៊ីនមេ MCP ដែលអាចសម្របសម្រួលបានយ៉ាងងាយស្រួលជាមួយកម្មវិធីគ្រប់ប្រភេទ។

## សង្ខេប

មេរៀននេះគ្របដណ្តប់ពីរបៀបបង្កើត និងប្រើប្រាស់ម៉ាស៊ីនមេ MCP ដោយប្រើការដឹកជញ្ជូន stdio។

## គោលបំណងរៀន

នៅចុងបញ្ចប់មេរៀននេះ អ្នកនឹងអាច៖

- បង្កើតម៉ាស៊ីនមេ MCP ដោយប្រើការដឹកជញ្ជូន stdio។
- ពិនិត្យកូដម៉ាស៊ីនមេ MCP ដោយប្រើ Inspector។
- ប្រើប្រាស់ម៉ាស៊ីនមេ MCP ដោយប្រើ Visual Studio Code។
- យល់ដឹងអំពីវិធីដឹកជញ្ជូន MCP បច្ចុប្បន្ន និងមូលហេតុដែល stdio ត្រូវបានណែនាំ។

## stdio Transport - វាធ្វើការយ៉ាងដូចម្តេច

stdio transport គឺជាផ្នែកមួយក្នុងចំណោមពីរប្រភេទការដឹកជញ្ជូនដែលគាំទ្រនៅក្នុងការបញ្ជាក់ MCP បច្ចុប្បន្ន (2025-11-25)។ វាធ្វើការយ៉ាងដូចខាងក្រោម៖

- **ការទំនាក់ទំនងសាមញ្ញ**៖ ម៉ាស៊ីនមេអានសារម៉ាស៊ីន JSON-RPC ពីអង់ព្វែងស្តង់ដា (`stdin`) និងផ្ញើសារទៅបញ្ចេញស្តង់ដា (`stdout`)។
- **ផ្អែកលើដំណើរការ**៖ អ្នកប្រើផ្តើមម៉ាស៊ីនមេ MCP ជាដំណើរការកូន។
- **ទម្រង់សារ**៖ សារជាការស្នើសុំ JSON-RPC ផ្ទាល់ខ្លួន សារជូនដំណឹង ឬការឆ្លើយតប ដែលមានខ្ទង់បន្ទាត់ថ្មី។
- **កំណត់ហេតុ**៖ ម៉ាស៊ីនមេអាចសរសេរខ្សែអក្សរ UTF-8 ទៅកាន់កំហុសស្តង់ដា (`stderr`) សម្រាប់គោលបំណងកំណត់ហេតុ។

### តម្រូវការសំខាន់៖
- សារត្រូវបានបំបែកជាមួយខ្ទង់បន្ទាត់ថ្មី និងមិនត្រូវមានខ្ទង់បន្ទាត់ថ្មីនៅក្នុងសារ
- ម៉ាស៊ីនមេមិនមានសិទ្ធិសរសេរអ្វីទៅ `stdout` ដែលមិនមែនជាសារម៉ាស៊ីន MCP ត្រឹមត្រូវ
- អ្នកប្រើមិនត្រូវសរសេរអ្វីទៅ `stdin` របស់ម៉ាស៊ីនមេ ដែលមិនមែនជាសារម៉ាស៊ីន MCP ត្រឹមត្រូវ

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
  
ក្នុងកូដខាងលើ៖

- យើងនាំចូលថ្នាក់ `Server` និង `StdioServerTransport` ពី MCP SDK
- យើងបង្កើតឧទាហរណ៍ម៉ាស៊ីនមេជាមួយការកំណត់មូលដ្ឋាន និងសមត្ថភាព
- យើងបង្កើតឧទាហរណ៍ `StdioServerTransport` ហើយភ្ជាប់ម៉ាស៊ីនមេជាមួយវា ដើម្បីអនុញ្ញាតទំនាក់ទំនងតាម stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# បង្កើតវត្ថុម៉ាស៊ីនបម្រើ
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
  
ក្នុងកូដខាងលើ យើង៖

- បង្កើតឧទាហរណ៍ម៉ាស៊ីនមេដោយប្រើ MCP SDK
- កំណត់ឧបករណ៍ដោយប្រើ decorators
- ប្រើ context manager stdio_server ដើម្បីគ្រប់គ្រងការដឹកជញ្ជូន

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
  
ភាពខុសគ្នាសំខាន់ពី SSE គឺម៉ាស៊ីនមេ stdio៖

- មិនតម្រូវការការកំណត់ម៉ាស៊ីនមេវេបឬច្រក HTTP
- ត្រូវបានចាប់ផ្តើមជាដំណើរការកូនដោយអ្នកប្រើ
- ទំនាក់ទំនងតាមអង់ព្វែង stdin/stdout
- ងាយស្រួលក្នុងការអនុវត្តន៍ និងពិនិត្យកូដ

## លំហាត់៖ បង្កើតម៉ាស៊ីនមេ stdio

ដើម្បីបង្កើតម៉ាស៊ីនមេរបស់យើង អ្នកត្រូវគិតពីររឿង៖

- យើងត្រូវប្រើម៉ាស៊ីនមេវេបដើម្បីបង្ហាញច្រកសម្រាប់ការតភ្ជាប់ និងសារ។

## លំហាត់ប្រតិបត្តិការណ៍៖ បង្កើតម៉ាស៊ីនមេ stdio MCP សាមញ្ញ

ក្នុងលំហាត់នេះ យើងនឹងបង្កើតម៉ាស៊ីនមេ MCP សាមញ្ញដោយប្រើ stdio transport ដែលបានណែនាំ។ ម៉ាស៊ីនមេនេះនឹងបង្ហាញឧបករណ៍ដែលអតិថិជនអាចហៅបានដោយប្រើ Model Context Protocol ស្តង់ដា។

### តម្រូវការ

- Python 3.8 ឬកាន់តែថ្មី
- MCP Python SDK: `pip install mcp`
- ការយល់ដឹងមូលដ្ឋានអំពីកម្មវិធី async

ចាប់ផ្តើមដោយបង្កើតម៉ាស៊ីនមេ stdio MCP ជាលើកដំបូងរបស់យើង៖

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
  
## ភាពខុសគ្នាសំខាន់ពីវីធីសាស្ត្រដែលបានបញ្ឈប់ SSE

**Stdio Transport (ស្តង់ដារបច្ចុប្បន្ន):**  
- ម៉ូដែល subprocess សាមញ្ញ - អ្នកប្រើផ្តើមម៉ាស៊ីនមេជាដំណើរការកូន  
- ទំនាក់ទំនងតាម stdin/stdout ប្រើសារនៅ JSON-RPC  
- មិនតម្រូវការកំណត់ម៉ាស៊ីនមេ HTTP  
- មានសមត្ថភាព និងសុវត្ថិភាពល្អប្រសើរ  
- ងាយស្រួលក្នុងការពិនិត្យកូដ និងអភិវឌ្ឍន៍  

**SSE Transport (បានបញ្ឈប់ចាប់ពី MCP 2025-06-18):**  
- តម្រូវម៉ាស៊ីនមេ HTTP ជាមួយច្រក SSE  
- ការកំណត់ស្មុគស្មាញជាមួយហេដ្ឋារចនាសម្ព័ន្ធម៉ាស៊ីនមេវេប  
- ការពិចារណាសុវត្ថិភាពបន្ថែមសម្រាប់ច្រក HTTP  
- ឥឡូវត្រូវបានជំនួសដោយ Streamable HTTP សម្រាប់ស្ថានភាពវេប

### បង្កើតម៉ាស៊ីនមេជាមួយ stdio transport

ដើម្បីបង្កើតម៉ាស៊ីនមេ stdio យើងត្រូវ៖

1. **នាំចូលបណ្ណាល័យដែលត្រូវការ** - ពិសេសផ្នែកម៉ាស៊ីនមេ MCP និងការដឹកជញ្ជូន stdio  
2. **បង្កើតឧទាហរណ៍ម៉ាស៊ីនមេ** - កំណត់ម៉ាស៊ីនមេជាមួយសមត្ថភាព  
3. **កំណត់ឧបករណ៍** - បន្ថែមមុខងារដែលចង់បង្ហាញ  
4. **កំណត់ការដឹកជញ្ជូន** - កំណត់ការទំនាក់ទំនង stdio  
5. **ដំណើរការម៉ាស៊ីនមេ** - ចាប់ផ្តើមម៉ាស៊ីនមេ និងគ្រប់គ្រងសារ

មករួចរាល់បង្កើតបាន៖

### ជំហានទី ១៖ បង្កើតម៉ាស៊ីនមេ stdio មូលដ្ឋាន

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# កំណត់រចនាសម្ព័ន្ធកំណត់ហេតុ
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# បង្កើតម៉ាស៊ីនមេ
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
  
### ជំហានទី ២៖ បន្ថែមឧបករណ៍បន្ថែម

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
  
### ជំហានទី ៣៖ រត់ម៉ាស៊ីនមេ

រក្សាទុកកូដជា `server.py` ហើយបើកវាពីបន្ទាត់ពាក្យបញ្ជា៖

```bash
python server.py
```
  
ម៉ាស៊ីនមេនឹងចាប់ផ្តើម និងរង់ចាំទទួលអង់ព្វែង `stdin`។ វាទំនាក់ទំនងដោយប្រើសារនៅ JSON-RPC តាម stdio transport។

### ជំហានទី ៤៖ សាកល្បងជាមួយ Inspector

អ្នកអាចសាកល្បងម៉ាស៊ីនមេរបស់អ្នកដោយប្រើ MCP Inspector៖

1. ដំឡើង Inspector៖ `npx @modelcontextprotocol/inspector`  
2. រត់ Inspector ហើយភ្ជាប់ទៅម៉ាស៊ីនមេរបស់អ្នក  
3. សាកល្បងឧបករណ៍ដែលអ្នកបានបង្កើត  

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
  
## ពិនិត្យកូដម៉ាស៊ីនមេ stdio របស់អ្នក

### ប្រើ MCP Inspector

MCP Inspector គឺជាឧបករណ៍មានតម្លៃសម្រាប់ពិនិត្យកូដ និងសាកល្បងម៉ាស៊ីនមេ MCP។ នេះជាវិធីប្រើវាជាមួយម៉ាស៊ីនមេ stdio របស់អ្នក៖

1. **ដំឡើង Inspector**:  
   ```bash
   npx @modelcontextprotocol/inspector
   ```
  
2. **រត់ Inspector**:  
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```
  
3. **សាកល្បងម៉ាស៊ីនមេរបស់អ្នក**: Inspector ផ្តល់អ៊ីនធឺហ្វេសវេបដែលអ្នកអាច៖  
   - មើលសមត្ថភាពម៉ាស៊ីនមេ  
   - សាកល្បងឧបករណ៍ជាមួយប៉ារ៉ាម៉ែត្រផ្សេងៗ  
   - ត្រួតពិនិត្យសារជា JSON-RPC  
   - ពិនិត្យបញ្ហាការតភ្ជាប់  

### ប្រើ VS Code

អ្នកក៏អាចពិនិត្យកូដម៉ាស៊ីនមេ MCP តាមផ្ទាល់ក្នុង VS Code៖

1. បង្កើតការកំណត់លោញនៅ `.vscode/launch.json`:  
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
  
2. កំណត់ចំណុចបញ្ជ្រាបក្នុងកូដម៉ាស៊ីនមេ  
3. រត់ debugger ហើយសាកល្បងជាមួយ Inspector  

### ដំណឹងវិនិច្ឆ័យជាទូទៅ

- ប្រើ `stderr` សម្រាប់កំណត់ហេតុ - មិនសរសេរទៅ `stdout` ព្រោះវាអាចមានសេចក្តីសារក្នុង MCP  
- ប្រាកដថាសារទាំងអស់ JSON-RPC ត្រូវបានបំបែកដោយខ្ទង់បន្ទាត់ថ្មី  
- សាកល្បងជាមួយឧបករណ៍សាមញ្ញមុនពេលបន្ថែមមុខងារស្មុគស្មាញ  
- ប្រើ Inspector ដើម្បីផ្ទៀងផ្ទាត់ទម្រង់សារ  

## ប្រើម៉ាស៊ីនមេ stdio របស់អ្នកក្នុង VS Code

បន្ទាប់ពីអ្នកបានបង្កើតម៉ាស៊ីនមេ MCP stdio រួច អ្នកអាចសម្របសម្រួលវាជាមួយ VS Code ដើម្បីប្រើជាមួយ Claude ឬអតិថិជន MCP ផ្សេងទៀត។

### ការកំណត់រចនាសម្ព័ន្ធ

1. **បង្កើតឯកសារកំណត់រចនាសម្ព័ន្ធ MCP** នៅ `%APPDATA%\Claude\claude_desktop_config.json` (Windows) ឬ `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):  

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
  
2. **ចាប់ផ្តើមជាថ្មី Claude**: បិទ ហើយបើកម្លើម Claude ដើម្បីផ្ទុកកំណត់ម៉ាស៊ីនមេថ្មី។  

3. **សាកល្បងការតភ្ជាប់**: ចាប់ផ្តើមការពិភាក្សាជាមួយ Claude ហើយព្យាយាមប្រើឧបករណ៍ម៉ាស៊ីនមេចរបស់អ្នក៖  
   - "តើអ្នកអាចស្វាគមន៍ខ្ញុំដោយប្រើឧបករណ៍ស្វាគមน์ទេ?"  
   - "គណនាផលបូករបស់ 15 និង 27"  
   - "ព័ត៌មានម៉ាស៊ីនមេជាអ្វី?"

### ឧទាហរណ៍ម៉ាស៊ីនមេ stdio TypeScript

នេះជាឧទាហរណ៍ TypeScript ពេញលេញសម្រាប់យោង៖

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

នៅក្នុងមេរៀនដែលបានបច្ចុប្បន្នភាពនេះ អ្នកបានរៀនពីរបៀប៖

- បង្កើតម៉ាស៊ីនមេ MCP ដោយប្រើ **stdio transport** បច្ចុប្បន្ន (វិធីដែលបានណែនាំ)  
- យល់ដឹងពីមូលហេតុដែលបានបញ្ឈប់ការប្រើ SSE ហើយប្ដូរជា stdio និង Streamable HTTP  
- បង្កើតឧបករណ៍ដែលអាចហៅដោយអតិថិជន MCP  
- ពិនិត្យកូដម៉ាស៊ីនមេរបស់អ្នកដោយប្រើ MCP Inspector  
- សម្របសម្រួលម៉ាស៊ីនមេ stdio ជាមួយ VS Code និង Claude  

stdio transport ផ្តល់នូវវិធីសាស្ត្រងាយស្រួល សុវត្ថិភាពខ្ពស់ និងមានប្រសិទ្ធភាពល្អក្នុងការបង្កើតម៉ាស៊ីនមេ MCP ប្រៀបធៀបនឹងវិធីសាស្ត្រ SSE ដែលបានបញ្ឈប់។ វាជារបៀបដែលបានណែនាំសម្រាប់ការអនុវត្ត MCP ច្រើនបំផុតតាមការបញ្ជាក់ 2025-06-18។

### .NET

1. ការបង្កើតឧបករណ៍មួយចំនួន ជាចាំបាច់យើងនឹងបង្កើតឯកសារ *Tools.cs* ដែលមានមាតិកដូចខាងក្រោម៖

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```
  
## លំហាត់៖ សាកល្បងម៉ាស៊ីនមេ stdio របស់អ្នក

ឥឡូវនេះដែលអ្នកបានបង្កើតម៉ាស៊ីនមេ stdio រួច សូមសាកល្បងវាដើម្បីប្រាកដថាវាធ្វើការត្រឹមត្រូវ។

### តម្រូវការ

1. ថានៅ MCP Inspector ត្រូវបានដំឡើង:  
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```
  
2. កូដម៉ាស៊ីនមេរបស់អ្នកត្រូវបានរក្សាទុក (ឧទាហរណ៍ `server.py`)

### សាកល្បងជាមួយ Inspector

1. **ចាប់ផ្តើម Inspector ជាមួយម៉ាស៊ីនមេរបស់អ្នក**:  
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```
  
2. **បើកផ្ទាំងវេប**: Inspector នឹងបើកប្រអប់កម្មវិធីអណ្តើកបង្ហាញសមត្ថភាពម៉ាស៊ីនមេរបស់អ្នក។

3. **សាកល្បងឧបករណ៍**:  
   - សាកល្បងឧបករណ៍ `get_greeting` ជាមួយឈ្មោះផ្សេងៗ  
   - សាកល្បងឧបករណ៍ `calculate_sum` ជាមួយលេខផ្សេងៗ  
   - ហៅឧបករណ៍ `get_server_info` ដើម្បីមើលព័ត៌មានម៉ាស៊ីនមេ

4. **ត្រួតពិនិត្យទំនាក់ទំនង**: Inspector បង្ហាញសារជា JSON-RPC ដែលត្រូវបានផ្លាស់ប្ដូរ រវាងអតិថិជន និងម៉ាស៊ីនមេ។

### អ្វីដែលអ្នកគួរមើលឃើញ

ពេលម៉ាស៊ីនមេរបស់អ្នកចាប់ផ្តើមបានត្រឹមត្រូវ អ្នកគួរមើលឃើញ៖  
- សមត្ថភាពម៉ាស៊ីនមេបង្ហាញក្នុង Inspector  
- ឧបករណ៍ដែលមានសម្រាប់សាកល្បង  
- ការផ្លាស់ប្ដូរសារល្អក្នុង JSON-RPC  
- ការឆ្លើយតបឧបករណ៍បង្ហាញនៅក្នុងផ្ទាំង

### បញ្ហាទូទៅ និងដំណោះស្រាយ

**ម៉ាស៊ីនមេមិនចាប់ផ្តើម**៖  
- ពិនិត្យថាការពឹងពាក់ទាំងអស់បានដំឡើង៖ `pip install mcp`  
- ពិនិត្យវ៉ារីយ៉ាប ជួរតាំង និងបន្ទាត់ចូលវា  
- ស្វែងរកសារកំហុសនៅក្នុងច្រកបញ្ជា  

**ឧបករណ៍មិនត្រូវបង្ហាញ**៖  
- ប្រាកដថាមាន decorators `@server.tool()`  
- ពិនិត្យថាឧបករណ៍ត្រូវបានកំណត់មុន `main()`  
- ធានាថាម៉ាស៊ីនមេបានកំណត់ត្រឹមត្រូវ  

**បញ្ហាការតភ្ជាប់**៖  
- ប្រាកដថាម៉ាស៊ីនមេបានប្រើ stdio transport ត្រឹមត្រូវ  
- ពិនិត្យថាមិនមានដំណើរការផ្សេងណាផ្ទៀងផ្ទាត់  
- ផ្ទៀងផ្ទាត់សំលេងពាក្យបញ្ជា Inspector  

## ភារកិច្ច

សូមព្យាយាមបង្កើតម៉ាស៊ីនមេលើកលែងពីនេះជាមួយសមត្ថភាពបន្ថែម។ មើលទំព័រនេះ [https://api.chucknorris.io/](https://api.chucknorris.io/) ដើម្បីថែមឧបករណ៍មួយដែលហៅ API។ អ្នកជ្រើសរើសរូបរាងម៉ាស៊ីនមេទ្រង់ត្រូវ។ សប្បាយចិត្ត :)

## ដំណោះស្រាយ

[ដំណោះស្រាយ](./solution/README.md) នេះជាដំណោះស្រាយមួយដែលមានកូដដំណើរការ។

## ចំណុចសំខាន់

ចំណុចសំខាន់ពីជំពូកនេះមានដូចខាងក្រោម៖

- stdio transport គឺជាវិធីដឹកជញ្ជូនដែលបានណែនាំសម្រាប់ម៉ាស៊ីនមេ MCP ក្នុងស្រុក។  
- stdio transport អនុញ្ញាតឲ្យមានការទំនាក់ទំនងរលូនរវាងម៉ាស៊ីនមេ និងអតិថិជន MCP តាមរយៈអង់ព្វែងបញ្ចូល និងបញ្ចេញស្តង់ដា។  
- អ្នកអាចប្រើ Inspector និង Visual Studio Code ដើម្បីប្រើក្រាដែល stdio ដោយផ្ទាល់ ដែលធ្វើឲ្យការពិនិត្យកូដ និងការសម្របសម្រួលកាន់តែងាយស្រួល។  

## ឧទាហរណ៍

- [Calculator Java](../samples/java/calculator/README.md)  
- [Calculator .Net](../../../../03-GettingStarted/samples/csharp)  
- [Calculator JavaScript](../samples/javascript/README.md)  
- [Calculator TypeScript](../samples/typescript/README.md)  
- [Calculator Python](../../../../03-GettingStarted/samples/python)  

## ធនធានបន្ថែម

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## តើអ្វីទៅជាជំហានបន្ទាប់

## ជំហានបន្ទាប់

ឥឡូវនេះដែលអ្នកបានរៀនពីរបៀបបង្កើតម៉ាស៊ីនមេ MCP ជាមួយ stdio transport អ្នកអាចស្វែងយល់ពីប្រធានបទកម្រិតខ្ពស់បន្ថែម៖

- **បន្ទាប់**: [HTTP Streaming ជាមួយ MCP (Streamable HTTP)](../06-http-streaming/README.md) - រៀនពីវិធីដឹកជញ្ជូនផ្សេងទៀតសម្រាប់ម៉ាស៊ីនមេខាងចម្ងាយ  
- **ខ្ពស់**: [បទបញ្ញត្តិសុវត្ថិភាព MCP](../../02-Security/README.md) - អនុវត្តសុវត្ថិភាពនៅក្នុងម៉ាស៊ីនមេ MCP របស់អ្នក  
- **ផលិតកម្ម**: [យុទ្ធសាស្រ្តចែកចាយ](../09-deployment/README.md) - ផ្សព្វផ្សាយម៉ាស៊ីនមេលើបរិស្ថានផលិតកម្ម  

## ធនធានបន្ថែម

- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - ការបញ្ជាក់ផ្លូវការជាផ្លូវការ  
- [ឯកសារលំអិត MCP SDK](https://github.com/modelcontextprotocol/sdk) - ឯកសារសម្រាប់ SDK ទាំងអស់  
- [ឧទាហរណ៍សហគមន៍](../../06-CommunityContributions/README.md) - ឧទាហរណ៍ម៉ាស៊ីនមេបន្ថែមពីសហគមន៍

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->