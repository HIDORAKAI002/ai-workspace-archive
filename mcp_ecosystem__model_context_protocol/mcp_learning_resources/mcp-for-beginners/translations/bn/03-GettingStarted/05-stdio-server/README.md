# MCP সার্ভার stdio পরিবহন নিয়ে

> **⚠️ গুরুত্বপূর্ণ আপডেট**: MCP স্পেসিফিকেশন 2025-06-18 থেকে, স্বতন্ত্র SSE (Server-Sent Events) পরিবহন **অবলুপ্ত** হয়েছে এবং তার পরিবর্তে "Streamable HTTP" পরিবহন এসেছে। বর্তমান MCP স্পেসিফিকেশন দুইটি প্রধান পরিবহন পদ্ধতি সংজ্ঞায়িত করে:
> 1. **stdio** - স্ট্যান্ডার্ড ইনপুট/আউটপুট (স্থানীয় সার্ভারের জন্য প্রস্তাবিত)
> 2. **Streamable HTTP** - দূরবর্তী সার্ভারের জন্য, যা অভ্যন্তরীণভাবে SSE ব্যবহার করতে পারে
>
> এই পাঠে stdio পরিবহনের ওপর ফোকাস করা হয়েছে, যা অধিকাংশ MCP সার্ভার বাস্তবায়নের জন্য সুপারিশকৃত পদ্ধতি।

stdio পরিবহন MCP সার্ভারকে ক্লায়েন্টদের সাথে স্ট্যান্ডার্ড ইনপুট এবং আউটপুট স্ট্রিম ব্যবহার করে যোগাযোগ করতে সক্ষম করে। বর্তমান MCP স্পেসিফিকেশনে এটি সবচেয়ে বেশি ব্যবহৃত এবং সুপারিশকৃত পরিবহন পদ্ধতি, যা সহজ এবং দক্ষ উপায়ে MCP সার্ভার তৈরি করতে দেয় যা বিভিন্ন ক্লায়েন্ট অ্যাপ্লিকেশনের সাথে সহজেই সংযুক্ত হতে পারে।

## ওভারভিউ

এই পাঠে stdio পরিবহন ব্যবহার করে কিভাবে MCP সার্ভার তৈরি এবং ব্যবহার করতে হয় তা আলোচনা করা হয়েছে।

## শেখার লক্ষ্যসমূহ

এই পাঠ শেষে আপনি পারবেন:

- stdio পরিবহন ব্যবহার করে MCP সার্ভার তৈরি করতে।
- Inspector ব্যবহার করে MCP সার্ভার ডিবাগ করতে।
- Visual Studio Code ব্যবহার করে MCP সার্ভার ব্যবহার করতে।
- বর্তমান MCP পরিবহন পদ্ধতিগুলি বুঝতে এবং কেন stdio প্রস্তাবিত তা জানতে।

## stdio পরিবহন - এটা কিভাবে কাজ করে

stdio পরিবহন বর্তমান MCP স্পেসিফিকেশন (2025-11-25) অনুযায়ী সমর্থিত দুইটি পরিবহনের একটি। এর কাজ করার পদ্ধতি হলো:

- **সরাসরি যোগাযোগ**: সার্ভার স্ট্যান্ডার্ড ইনপুট (`stdin`) থেকে JSON-RPC বার্তা পড়ে এবং স্ট্যান্ডার্ড আউটপুট (`stdout`) এ বার্তা প্রেরণ করে।
- **প্রক্রিয়া-ভিত্তিক**: ক্লায়েন্ট MCP সার্ভারকে সাবপ্রসেস হিসেবে চালু করে।
- **বার্তার ফরম্যাট**: বার্তাগুলো পৃথক JSON-RPC অনুরোধ, বিজ্ঞপ্তি অথবা প্রতিক্রিয়া, প্রতিটি নতুন লাইনে সীমাবদ্ধ।
- **লগিং**: সার্ভার লগিং উদ্দেশ্যে স্ট্যান্ডার্ড এরর (`stderr`) এ UTF-8 স্ট্রিং লিখতে পারে।

### প্রধান শর্তসমূহ:
- বার্তাগুলো নতুন লাইনে বিভাজিত হতে হবে এবং এর ভিতরে নতুন লাইন থাকতে পারবে না
- সার্ভার `stdout` এ শুধুমাত্র বৈধ MCP বার্তা লিখবে, অন্য কিছু নয়
- ক্লায়েন্ট সার্ভারের `stdin` এ শুধুমাত্র বৈধ MCP বার্তা পাঠাবে, অন্য কিছু নয়

### টাইপস্ক্রিপ্ট

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

আগের কোডে:

- MCP SDK থেকে `Server` ক্লাস এবং `StdioServerTransport` আমদানি করা হয়
- মৌলিক কনফিগারেশন এবং ক্ষমতা সহ সার্ভার ইন্সট্যান্স তৈরি করা হয়
- একটি `StdioServerTransport` ইন্সট্যান্স তৈরি করে সার্ভারটির সাথে সংযোগ করা হয়, stdin/stdout মাধ্যমে যোগাযোগ সক্ষম করার জন্য

### পাইথন

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# সার্ভার ইনস্ট্যান্স তৈরি করুন
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

আগের কোডে আমরা:

- MCP SDK ব্যবহার করে সার্ভার ইন্সট্যান্স তৈরি করছি
- ডেকোরেটর ব্যবহার করে টুল ডিফাইন করছি
- stdio_server কনটেক্সট ম্যানেজার ব্যবহার করে পরিবহন পরিচালনা করছি

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

SSE থেকে প্রধান পার্থক্য হলো stdio সার্ভারগুলো:

- ওয়েব সার্ভার সেটআপ বা HTTP এন্ডপয়েন্ট প্রয়োজন হয় না
- ক্লায়েন্ট সাবপ্রসেস হিসেবে সার্ভার চালায়
- stdin/stdout স্ট্রিম মাধ্যমে যোগাযোগ করে
- সহজে বাস্তবায়ন এবং ডিবাগ করা যায়

## অভ্যাস: stdio সার্ভার তৈরি করা

আমাদের সার্ভার তৈরির জন্য দুটো বিষয় মাথায় রাখতে হবে:

- সংযোগ এবং বার্তা গ্রহণের জন্য একটি ওয়েব সার্ভার ব্যবহার করতে হবে।
## ল্যাব: একটি সহজ MCP stdio সার্ভার তৈরি করা

এই ল্যাবে, আমরা প্রস্তাবিত stdio পরিবহন ব্যবহার করে একটি সহজ MCP সার্ভার তৈরি করব। এই সার্ভারটি ক্লায়েন্টরা স্ট্যান্ডার্ড Model Context Protocol ব্যবহার করে কল করতে পারবে এমন টুলস এক্সপোজ করবে।

### প্রস্তুতিমূলক শর্ত

- Python 3.8 বা তার পরের সংস্করণ
- MCP Python SDK: `pip install mcp`
- অ্যাসিনক প্রোগ্রামিংয়ের মৌলিক ধারণা

চলুন প্রথম MCP stdio সার্ভার তৈরি করি:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# লগিং কনফিগার করুন
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# সার্ভার তৈরি করুন
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
    # স্ট্ডিও ট্রান্সপোর্ট ব্যবহার করুন
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## অবলুপ্ত SSE পদ্ধতির তুলনায় প্রধান পার্থক্য

**Stdio পরিবহন (বর্তমান স্ট্যান্ডার্ড):**
- সরল সাবপ্রসেস মডেল - ক্লায়েন্ট সার্ভারকে চাইল্ড প্রসেস হিসেবে চালায়
- JSON-RPC বার্তা ব্যবহার করে stdin/stdout মাধ্যমে যোগাযোগ
- HTTP সার্ভার সেটআপের প্রয়োজন নেই
- উন্নত পারফরম্যান্স ও নিরাপত্তা
- সহজ ডিবাগিং ও ডেভেলপমেন্ট

**SSE পরিবহন (MCP 2025-06-18 থেকে অবলুপ্ত):**
- SSE এন্ডপয়েন্টসহ HTTP সার্ভারের প্রয়োজন ছিল
- ওয়েব সার্ভার অবকাঠামো নিয়ে জটিল সেটআপ
- HTTP এন্ডপয়েন্টের জন্য অতিরিক্ত নিরাপত্তা বিষয়াবলী
- এখন ওয়েব-ভিত্তিক পরিস্থিতির জন্য Streamable HTTP দ্বারা প্রতিস্থাপিত

### stdio পরিবহন দিয়ে সার্ভার তৈরি করা

আমাদের stdio সার্ভার তৈরি করতে হবে:

1. **প্রয়োজনীয় লাইব্রেরি আমদানি করা** - MCP সার্ভার কম্পোনেন্ট এবং stdio পরিবহন দরকার
2. **সার্ভার ইন্সট্যান্স তৈরি** - ক্ষমতার সঙ্গে সার্ভার সংজ্ঞায়িত করা
3. **টুল সংজ্ঞায়িত করা** - আমরা যে ফাংশনালিটি প্রকাশ করতে চাই তা যোগ করা
4. **পরিবহন সেটআপ করা** - stdio যোগাযোগ কনফিগার করা
5. **সার্ভার চালানো** - সার্ভার শুরু করে বার্তা নেয়া ও পাঠানো নিয়ন্ত্রণ করা

স্টেপ বাই স্টেপ এগিয়ে চলুন:

### ধাপ ১: একটি মৌলিক stdio সার্ভার তৈরি করুন

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# লগিং কনফিগার করুন
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# সার্ভার তৈরি করুন
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

### ধাপ ২: আরও টুল যোগ করুন

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

### ধাপ ৩: সার্ভার চালানো

কোডটি `server.py` নামে সেভ করে কমান্ড লাইনে চালান:

```bash
python server.py
```

সার্ভার শুরু হয়ে stdin থেকে ইনপুটের জন্য অপেক্ষা করবে। এটি stdio পরিবহন ব্যবহার করে JSON-RPC বার্তাগুলো নিয়ে যোগাযোগ করবে।

### ধাপ ৪: Inspector দিয়ে পরীক্ষা

আপনি MCP Inspector ব্যবহার করে আপনার সার্ভারটি পরীক্ষা করতে পারেন:

1. Inspector ইন্সটল করুন: `npx @modelcontextprotocol/inspector`
2. Inspector চালিয়ে সেটিকে আপনার সার্ভারের দিকে নির্দেশ করুন
3. আপনার তৈরি টুলস গুলো পরীক্ষা করুন

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## আপনার stdio সার্ভার ডিবাগিং

### MCP Inspector ব্যবহার

MCP Inspector হল MCP সার্ভার ডিবাগ এবং পরীক্ষা করার একটি গুরুত্বপূর্ণ টুল। stdio সার্ভারের ক্ষেত্রে এটি ব্যবহার করবেন যেভাবে:

1. **Inspector ইন্সটল করুন**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Inspector চালান**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **আপনার সার্ভার পরীক্ষা করুন**: Inspector একটি ওয়েব ইন্টারফেস প্রদান করে যেখানে আপনি পারেন:
   - সার্ভারের ক্ষমতা দেখা
   - বিভিন্ন প্যারামিটার নিয়ে টুলস পরীক্ষা করা
   - JSON-RPC বার্তা পর্যবেক্ষণ করা
   - কানেকশন সমস্যাগুলো ডিবাগ করা

### VS Code ব্যবহার

আপনি সরাসরি VS Code তেও MCP সার্ভার ডিবাগ করতে পারেন:

1. `.vscode/launch.json`-এ একটি লঞ্চ কনফিগারেশন তৈরি করুন:
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

2. সার্ভারের কোডে ব্রেকপয়েন্ট সেট করুন
3. ডিবাগার চালিয়ে Inspector দিয়ে পরীক্ষা করুন

### সাধারণ ডিবাগিং টিপস

- লগিং এর জন্য `stderr` ব্যবহার করুন - কখনোই `stdout` এ লেখা উচিত নয় কারণ এটি MCP বার্তার জন্য সংরক্ষিত
- সমস্ত JSON-RPC বার্তা অবশ্যই নতুন লাইন দ্বারা বিভাজিত থাকতে হবে
- প্রথমে সহজ টুল দিয়ে পরীক্ষা করুন, তারপর জটিল ফাংশনালিটি যোগ করুন
- বার্তার ফরম্যাট যাচাই করতে Inspector ব্যবহার করুন

## আপনার stdio সার্ভার VS Code এ ব্যবহার করা

একবার MCP stdio সার্ভার তৈরি হলে, আপনি এটিকে VS Code এর সাথে Claude বা অন্যান্য MCP-সঙ্গত ক্লায়েন্টের সঙ্গে সংযুক্ত করতে পারেন।

### কনফিগারেশন

1. **একটি MCP কনফিগারেশন ফাইল তৈরি করুন** `%APPDATA%\Claude\claude_desktop_config.json` (Windows) অথবা `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Claude পুনরায় চালু করুন**: Claude বন্ধ করে পুনরায় খুলুন নতুন সার্ভার কনফিগ লোড করার জন্য।

3. **সংযোগ পরীক্ষা করুন**: Claude এর সাথে কথোপকথন শুরু করে আপনার সার্ভারের টুলস ব্যবহার করার চেষ্টা করুন:
   - "Can you greet me using the greeting tool?"
   - "Calculate the sum of 15 and 27"
   - "What's the server info?"

### টাইপস্ক্রিপ্ট stdio সার্ভারের উদাহরণ

সাধারণ রেফারেন্সের জন্য একটি সম্পূর্ণ টাইপস্ক্রিপ্ট উদাহরণ:

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

// সরঞ্জাম যোগ করুন
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

### .NET stdio সার্ভারের উদাহরণ

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

## সারাংশ

এই হালনাগাদ পাঠে, আপনি শিখেছেন:

- বর্তমান **stdio পরিবহন** ব্যবহার করে MCP সার্ভার তৈরি করা (সুপারিশকৃত পদ্ধতি)
- কেন SSE পরিবহন অবলুপ্ত হয়েছে এবং stdio ও Streamable HTTP পছন্দ করা হয়
- MCP ক্লায়েন্ট কর্তৃক কলযোগ্য টুল তৈরি করা
- MCP Inspector ব্যবহার করে সার্ভার ডিবাগ করা
- stdio সার্ভার VS Code এবং Claude এর সঙ্গে মিলিয়ে ব্যবহার করা

stdio পরিবহন একটি সহজ, নিরাপদ এবং দ্রুত পারফর্মিং পদ্ধতি প্রদান করে MCP সার্ভার গঠনের জন্য, যা অবলুপ্ত SSE পদ্ধতির তুলনায় অধিক উন্নত। এটি MCP সার্ভারের বেশিরভাগ বাস্তবায়নের জন্য 2025-06-18 স্পেসিফিকেশন থেকে সুপারিশকৃত পরিবহন।

### .NET

1. চলুন প্রথমে কিছু টুল তৈরি করি, এজন্য *Tools.cs* নামে একটি ফাইল তৈরি করব নিম্নলিখিত বিষয়বস্তু সহ:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## অভ্যাস: আপনার stdio সার্ভার পরীক্ষা করা

আপনি stdio সার্ভার তৈরি করেছেন, এখন এটিকে সঠিকভাবে কাজ করছে কিনা পরীক্ষা করি।

### প্রস্তুতিমূলক শর্ত

1. নিশ্চিত করুন MCP Inspector ইন্সটল করা আছে:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. আপনার সার্ভারের কোড সংরক্ষিত (যেমন `server.py` নামে)

### Inspector দিয়ে পরীক্ষা

1. **Inspector এবং আপনার সার্ভার একসঙ্গে চালান**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **ওয়েব ইন্টারফেস খুলুন**: Inspector একটি ব্রাউজার উইন্ডো খুলবে যেখানে আপনার সার্ভারের ক্ষমতা দেখাবে।

3. **টুলগুলি পরীক্ষা করুন**: 
   - বিভিন্ন নাম দিয়ে `get_greeting` টুল ব্যবহার করুন
   - বিভিন্ন সংখ্যায় `calculate_sum` টুল পরীক্ষা করুন
   - সার্ভারের মেটাডাটা দেখতে `get_server_info` কল করুন

4. **যোগাযোগ পর্যবেক্ষণ করুন**: Inspector ক্লায়েন্ট-সার্ভারের মধ্যে JSON-RPC বার্তাগুলো প্রদর্শন করে।

### আপনি যা দেখতে পাবেন

যখন আপনার সার্ভার সঠিকভাবে শুরু হয়, আপনি দেখতে পাবেন:
- Inspector-এ সার্ভারের ক্ষমতাগুলোর তালিকা
- পরীক্ষার জন্য টুল উপলব্ধ
- সফল JSON-RPC বার্তা আদানপ্রদান
- ইউজার ইন্টারফেসে টুলের প্রতিক্রিয়া

### সাধারণ সমস্যা ও সমাধান

**সার্ভার শুরু হচ্ছে না:**
- নিশ্চিত করুন সব ডিপেনডেন্সি ইনস্টল করা হয়েছে: `pip install mcp`
- পাইথন সিনট্যাক্স এবং ইন্ডেন্টেশন চেক করুন
- কনসোলে ত্রুটি বার্তা দেখুন

**টুল দেখা যাচ্ছে না:**
- নিশ্চিত করুন `@server.tool()` ডেকোরেটর ব্যবহার করা হয়েছে
- `main()` এর আগে টুল ফাংশন সংজ্ঞায়িত আছে কিনা পরীক্ষা করুন
- সার্ভার সঠিকভাবে কনফিগার করা হয়েছে কিনা নিশ্চিত করুন

**কানেকশন সমস্যা:**
- নিশ্চিত করুন সার্ভার stdio পরিবহন সঠিকভাবে ব্যবহার করছে
- অন্য কোনো প্রসেস বাধা দিচ্ছে কিনা পরীক্ষা করুন
- Inspector কমান্ড সিনট্যাক্স সঠিক কিনা যাচাই করুন

## অ্যাসাইনমেন্ট

আপনার সার্ভার আরও সক্ষমতা নিয়ে তৈরি করুন। উদাহরণস্বরূপ, একটি টুল যুক্ত করুন যা কোনো API কল করে — [এই পেজটি দেখুন](https://api.chucknorris.io/)। সার্ভারের কাঠামো আপনি নিজেই নির্ধারণ করুন। মজা করুন :)

## সমাধান

[সমাধান](./solution/README.md) এখানে একটি কাজ করা কোডসহ সম্ভাব্য সমাধান দেওয়া হয়েছে।

## মূল ধারণা

এই অধ্যায় থেকে মূল ধারণাগুলো হলো:

- stdio পরিবহন স্থানীয় MCP সার্ভারের জন্য সবচেয়ে সুপারিশকৃত পদ্ধতি।
- stdio পরিবহন MCP সার্ভার ও ক্লায়েন্টের মধ্যে স্ট্যান্ডার্ড ইনপুট এবং আউটপুট স্ট্রিম ব্যবহার করে সাবলীল যোগাযোগ নিশ্চিত করে।
- Inspector এবং Visual Studio Code-বো যে কোনো stdio সার্ভারে সরাসরি সংযোগ স্থাপন করে ডিবাগ ও একীভূতকরণ সহজ করে।

## উদাহরণসমূহ

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)

## অতিরিক্ত রিসোর্স

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## পরবর্তী ধাপ

## পরবর্তী পদক্ষেপ

আপনি stdio পরিবহন দিয়ে MCP সার্ভার তৈরি করা শিখেছেন, এবার আরও উন্নত বিষয়গুলি অন্বেষণ করতে পারেন:

- **পরবর্তী**: [HTTP Streaming with MCP (Streamable HTTP)](../06-http-streaming/README.md) - দূরবর্তী সার্ভারের জন্য অন্য পরিবহন পদ্ধতি সম্পর্কে জানুন
- **উন্নত**: [MCP নিরাপত্তার সেরা অভ্যাস](../../02-Security/README.md) - MCP সার্ভারে নিরাপত্তা প্রয়োগ করুন
- **প্রোডাকশন**: [মোতায়েন কৌশল](../09-deployment/README.md) - প্রোডাকশনে সার্ভার মোতায়েন করুন

## অতিরিক্ত রিসোর্স

- [MCP স্পেসিফিকেশন 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - সরকারি স্পেসিফিকেশন
- [MCP SDK ডকুমেন্টেশন](https://github.com/modelcontextprotocol/sdk) - সব ভাষার SDK রেফারেন্স
- [কমিউনিটি উদাহরণ](../../06-CommunityContributions/README.md) - কমিউনিটির আরও সার্ভার উদাহরণসমূহ

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->