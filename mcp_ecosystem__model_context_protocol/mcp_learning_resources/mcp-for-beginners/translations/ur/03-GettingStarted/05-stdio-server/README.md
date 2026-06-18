# MCP سرور اور stdio ٹرانسپورٹ

> **⚠️ اہم اپ ڈیٹ**: MCP وضاحت 2025-06-18 کے مطابق، اسٹینڈ الون SSE (سرور سینٹ ایونٹس) ٹرانسپورٹ کو **ختم** کر دیا گیا ہے اور اسے "Streamable HTTP" ٹرانسپورٹ سے تبدیل کر دیا گیا ہے۔ موجودہ MCP وضاحت دو بنیادی ٹرانسپورٹ میکانزم متعین کرتی ہے:
> 1. **stdio** - معیاری ان پٹ/آؤٹ پٹ (مقامی سرورز کے لئے تجویز شدہ)
> 2. **Streamable HTTP** - دور دراز سرورز کے لئے جو اندرونی طور پر SSE استعمال کر سکتے ہیں
>
> اس سبق کو اپ ڈیٹ کر کے **stdio ٹرانسپورٹ** پر توجہ دی گئی ہے، جو زیادہ تر MCP سرور کی تنصیبات کے لئے تجویز کردہ طریقہ ہے۔

stdio ٹرانسپورٹ MCP سرورز کو کلائنٹس کے ساتھ معیاری ان پٹ اور آؤٹ پٹ اسٹریمز کے ذریعے بات چیت کرنے کی اجازت دیتا ہے۔ موجودہ MCP وضاحت میں یہ سب سے عام اور تجویز کردہ ٹرانسپورٹ میکانزم ہے، جو MCP سرورز کو آسان اور مؤثر انداز میں بنانے کا ذریعہ فراہم کرتا ہے، جو مختلف کلائنٹ ایپلیکیشنز کے ساتھ آسانی سے مربوط ہو سکتے ہیں۔

## جائزہ

یہ سبق stdio ٹرانسپورٹ استعمال کرتے ہوئے MCP سرورز بنانے اور استعمال کرنے کا طریقہ بیان کرتا ہے۔

## سیکھنے کے مقاصد

اس سبق کے آخر تک، آپ قابل ہوں گے:

- stdio ٹرانسپورٹ استعمال کرتے ہوئے MCP سرور بنانا۔
- انسپیکٹر استعمال کرتے ہوئے MCP سرور کو ڈی بگ کرنا۔
- Visual Studio Code استعمال کرتے ہوئے MCP سرور کو استعمال کرنا۔
- موجودہ MCP ٹرانسپورٹ میکانزم کو سمجھنا اور جاننا کہ stdio کیوں تجویز کیا جاتا ہے۔

## stdio ٹرانسپورٹ - یہ کیسے کام کرتا ہے

stdio ٹرانسپورٹ موجودہ MCP وضاحت (2025-11-25) میں دو سپورٹڈ ٹرانسپورٹ اقسام میں سے ایک ہے۔ یہ طریقہ کار کچھ یوں ہے:

- **سادہ مواصلات**: سرور JSON-RPC پیغامات کو معیاری ان پٹ (`stdin`) سے پڑھتا ہے اور پیغامات معیاری آؤٹ پٹ (`stdout`) پر بھیجتا ہے۔
- **پراسس کی بنیاد پر**: کلائنٹ MCP سرور کو ایک سب پراسس کے طور پر لانچ کرتا ہے۔
- **پیغام کیسا ہوتا ہے**: پیغامات انفرادی JSON-RPC درخواستیں، نوٹیفیکیشنز، یا جوابات ہوتے ہیں، جو نئی لائن سے جدا کیے جاتے ہیں۔
- **لاگنگ**: سرور لاگنگ کے مقصد کے لیے معیاری ایرر (`stderr`) پر UTF-8 سٹرنگز لکھ سکتا ہے۔

### اہم ضروریات:
- پیغامات کو نئی لائن سے جدا ہونا چاہیے، اور ان میں امبیڈڈ نئی لائن نہیں ہونی چاہیے
- سرور کو `stdout` میں صرف درست MCP پیغام لکھنے چاہئیں
- کلائنٹ کو سرور کے `stdin` میں صرف درست MCP پیغام لکھنا چاہیے

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

مذکورہ کوڈ میں:

- ہم MCP SDK سے `Server` کلاس اور `StdioServerTransport` درآمد کرتے ہیں
- ایک سرور انسٹینس بناتے ہیں جس میں بنیادی کنفیگریشن اور صلاحیتیں شامل ہوں
- ایک `StdioServerTransport` انسٹینس بناتے ہیں اور سرور کو اس سے جوڑتے ہیں، تاکہ stdin/stdout کے ذریعے مواصلات فعال ہو

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# سرور کا مثالی بنائیں
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

پچھلے کوڈ میں ہم:

- MCP SDK استعمال کرتے ہوئے سرور کا ایک انسٹینس بناتے ہیں
- ٹولز کی تعریف کرتے ہیں جو ڈی کوریٹرز کے ذریعے ہوتی ہے
- stdio_server کانٹیکسٹ مینیجر کا استعمال کرتے ہوئے ٹرانسپورٹ کو سنبھالتے ہیں

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

SSE سے اہم فرق یہ ہے کہ stdio سرورز:

- ویب سرور کی سیٹ اپ یا HTTP اینڈ پوائنٹس کی ضرورت نہیں رکھتے
- کلائنٹ کے ذریعہ سب پراسس کے طور پر چلائے جاتے ہیں
- stdin/stdout اسٹریمز کے ذریعے بات چیت کرتے ہیں
- آسانی سے نافذ کرنے اور ڈی بگ کرنے میں سہولت رکھتے ہیں

## مشق: stdio سرور بنانا

سرور بنانے کے لیے، ہمیں دو باتیں ذہن میں رکھنی ہوں گی:

- ہمیں کنکشن اور پیغامات کے لئے اینڈ پوائنٹس ظاہر کرنے کے لیے ویب سرور استعمال کرنا ہوگا۔
## لیب: ایک سادہ MCP stdio سرور بنانا

اس لیب میں، ہم تجویز کردہ stdio ٹرانسپورٹ استعمال کرتے ہوئے ایک سادہ MCP سرور بنائیں گے۔ یہ سرور وہ ٹولز فراہم کرے گا جنہیں کلائنٹس Model Context Protocol کے ذریعے کال کر سکتے ہیں۔

### ضروریات

- Python 3.8 یا بعد کا ورژن
- MCP Python SDK: `pip install mcp`
- اسنک پروگرامنگ کی بنیادی سمجھ

چلیں اپنا پہلا MCP stdio سرور بناتے ہیں:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# لاگنگ تشکیل دیں
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# سرور بنائیں
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
    # stdio ٹرانسپورٹ کا استعمال کریں
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## منسوخ شدہ SSE طریقہ سے اہم اختلافات

**Stdio ٹرانسپورٹ (موجودہ معیار):**
- سادہ سب پراسس ماڈل - کلائنٹ سرور کو چائلڈ پراسس کے طور پر لانچ کرتا ہے
- stdin/stdout کے ذریعے JSON-RPC پیغامات سے مواصلات
- HTTP سرور سیٹ اپ کی ضرورت نہیں
- بہتر کارکردگی اور سیکیورٹی
- آسانی سے ڈی بگ اور ترقی

**SSE ٹرانسپورٹ (MCP 2025-06-18 کے بعد منسوخ شدہ):**
- HTTP سرور کی ضرورت SSE اینڈ پوائنٹس کے ساتھ
- ویب سرور انفراسٹرکچر کے ساتھ پیچیدہ سیٹ اپ
- HTTP اینڈ پوائنٹس کے لیے اضافی سیکیورٹی کے پہلو
- اب Streamable HTTP سے تبدیل ہو چکا ہے جو ویب بیسڈ صورتوں کے لیے ہے

### stdio ٹرانسپورٹ سے سرور بنانا

اپنا stdio سرور بنانے کے لیے ہمیں یہ کرنا ہوگا:

1. **ضروری لائبریریز درآمد کریں** - MCP سرور اجزاء اور stdio ٹرانسپورٹ چاہیے
2. **سرور کا انسٹینس بنائیں** - صلاحیتوں کے ساتھ سرور کی تعریف کریں
3. **ٹولز کی تعریف کریں** - وہ فعالیت شامل کریں جو آپ ظاہر کرنا چاہتے ہیں
4. **ٹرانسپورٹ سیٹ اپ کریں** - stdio کمیونیکیشن کا کنفیگر کریں
5. **سرور چلائیں** - سرور شروع کریں اور پیغامات سنبھالیں

آئیے اسے قدم بہ قدم بنائیں:

### مرحلہ 1: ایک بنیادی stdio سرور بنائیں

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# لاگنگ کو تشکیل دیں
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# سرور بنائیں
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

### مرحلہ 2: مزید ٹولز شامل کریں

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

### مرحلہ 3: سرور چلائیں

کوڈ کو `server.py` کے طور پر محفوظ کریں اور کمانڈ لائن سے چلائیں:

```bash
python server.py
```

سرور شروع ہوگا اور stdin سے ان پٹ کے لیے انتظار کرے گا۔ یہ stdio ٹرانسپورٹ کے ذریعے JSON-RPC پیغامات کا استعمال کرتا ہے۔

### مرحلہ 4: انسپیکٹر کے ساتھ ٹیسٹنگ

آپ اپنے سرور کو MCP Inspector کے ذریعے ٹیسٹ کر سکتے ہیں:

1. انسپیکٹر انسٹال کریں: `npx @modelcontextprotocol/inspector`
2. انسپیکٹر چلائیں اور اسے اپنے سرور کی جانب پوائنٹ کریں
3. بنائے گئے ٹولز کو ٹیسٹ کریں

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```

## اپنے stdio سرور کو ڈی بگ کرنا

### MCP Inspector استعمال کرنا

MCP Inspector MCP سرورز کے ڈی بگ اور ٹیسٹنگ کے لیے ایک قیمتی ٹول ہے۔ اسے اپنے stdio سرور کے ساتھ استعمال کرنے کا طریقہ یہ ہے:

1. **انسپیکٹر انسٹال کریں**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **انسپیکٹر چلائیں**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **سرور ٹیسٹ کریں**: انسپیکٹر ایک ویب انٹرفیس فراہم کرتا ہے جہاں آپ:
   - سرور کی صلاحیتیں دیکھ سکتے ہیں
   - مختلف پیرامیٹرز کے ساتھ ٹولز ٹیسٹ کر سکتے ہیں
   - JSON-RPC پیغامات مانیٹر کر سکتے ہیں
   - کنکشن کے مسائل ڈی بگ کر سکتے ہیں

### VS Code استعمال کرتے ہوئے

آپ اپنا MCP سرور براہ راست VS Code میں ڈی بگ بھی کر سکتے ہیں:

1. `.vscode/launch.json` میں ایک لانچ کنفیگریشن بنائیں:
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

2. سرور کوڈ میں بریک پوائنٹس سیٹ کریں
3. ڈی بگر چلائیں اور انسپیکٹر کے ساتھ ٹیسٹ کریں

### عام ڈی بگنگ نکات

- لاگنگ کے لئے `stderr` استعمال کریں - کبھی بھی `stdout` پر کچھ نہیں لکھیں کیونکہ یہ MCP پیغامات کے لیے مخصوص ہے
- تمام JSON-RPC پیغامات کو نئی لائن سے جدا رکھیں
- سب سے پہلے سادہ ٹولز کے ساتھ ٹیسٹ کریں پھر پیچیدہ فعالیت شامل کریں
- پیغام فارمیٹس کی توثیق کے لیے انسپیکٹر استعمال کریں

## VS Code میں اپنے stdio سرور کو استعمال کرنا

جب آپ نے MCP stdio سرور بنا لیا، تو آپ اسے VS Code کے ساتھ ملا سکتے ہیں تاکہ آپ کلاؤڈ یا دوسرے MCP کمپٹیبل کلائنٹس کے ساتھ استعمال کر سکیں۔

### کنفیگریشن

1. **MCP کنفیگریشن فائل بنائیں** `%APPDATA%\Claude\claude_desktop_config.json` (Windows) یا `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Claude کو ری سٹارٹ کریں**: Claude کو بند کر کے دوبارہ کھولیں تاکہ نئے سرور کی کنفیگریشن لوڈ ہو جائے۔

3. **کنکشن ٹیسٹ کریں**: Claude کے ساتھ بات چیت شروع کریں اور اپنے سرور کے ٹولز استعمال کریں:
   - "کیا آپ greeting tool سے مجھے سلام کر سکتے ہیں؟"
   - "15 اور 27 کا مجموعہ حساب کریں"
   - "سرور کی معلومات کیا ہے؟"

### TypeScript stdio سرور کی مثال

یہاں ریفرنس کے لیے مکمل TypeScript مثال ہے:

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

// اوزار شامل کریں
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

### .NET stdio سرور کی مثال

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

## خلاصہ

اس اپ ڈیٹ کردہ سبق میں آپ نے سیکھا کہ:

- موجودہ **stdio ٹرانسپورٹ** (تجویز کردہ طریقہ) استعمال کرتے ہوئے MCP سرورز کیسے بنائیں
- SSE ٹرانسپورٹ کو کیوں ختم کیا گیا اور stdio اور Streamable HTTP کو کیوں ترجیح دی گئی
- ایسے ٹولز بنائیں جو MCP کلائنٹس کال کر سکیں
- MCP Inspector سے سرور کو ڈی بگ کریں
- اپنے stdio سرور کو VS Code اور Claude کے ساتھ مربوط کریں

stdio ٹرانسپورٹ SSE کے منسوخ شدہ طریقے کے مقابلے میں MCP سرورز بنانے کا ایک آسان، زیادہ محفوظ اور بہتر کارکردگی والا طریقہ فراہم کرتا ہے۔ یہ زیادہ تر MCP سرور کی تنصیبات کے لیے 2025-06-18 کی وضاحت کے مطابق تجویز کردہ ٹرانسپورٹ ہے۔

### .NET

1. پہلے کچھ ٹولز بناتے ہیں، اس کے لیے ایک فائل *Tools.cs* بنائیں جس میں درج ذیل مواد ہو:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## مشق: اپنے stdio سرور کی ٹیسٹنگ

اب جب کہ آپ نے اپنا stdio سرور بنا لیا ہے، آئیں اسے ٹیسٹ کریں تاکہ یقینی بنایا جا سکے کہ یہ درست کام کر رہا ہے۔

### ضروریات

1. یقینی بنائیں کہ MCP Inspector انسٹال ہے:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. آپ کا سرور کوڈ محفوظ ہونا چاہیے (مثلاً `server.py`)

### انسپیکٹر کے ساتھ ٹیسٹنگ

1. **اپنے سرور کے ساتھ انسپیکٹر شروع کریں:**
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **ویب انٹرفیس کھولیں**: انسپیکٹر براؤزر میں آپ کے سرور کی صلاحیتیں دکھائے گا۔

3. **ٹولز ٹیسٹ کریں**: 
   - مختلف ناموں کے ساتھ `get_greeting` ٹول آزمائیں
   - مختلف نمبروں کے ساتھ `calculate_sum` ٹول ٹیسٹ کریں
   - `get_server_info` ٹول کال کریں تاکہ سرور میٹاڈیٹا دیکھ سکیں

4. **مواصلات مانیٹر کریں**: انسپیکٹر JSON-RPC پیغامات جو کلائنٹ اور سرور کے درمیان بھیجے جا رہے ہیں دکھاتا ہے۔

### آپ کو کیا دیکھنا چاہیے

جب آپ کا سرور صحیح طریقے سے شروع ہو گا، آپ دیکھیں گے:
- انسپیکٹر میں سرور کی صلاحیتیں درج ہوں گی
- ٹیسٹ کرنے کے لیے ٹولز دستیاب ہوں گے
- JSON-RPC پیغامات کامیابی سے تبادلہ کیے جائیں گے
- انٹرفیس میں ٹول کے جوابات دکھائے جائیں گے

### عام مسائل اور حل

**سرور شروع نہیں ہوتا:**
- تصدیق کریں کہ تمام ڈیپینڈینسیز انسٹال ہیں: `pip install mcp`
- Python سینٹیکس اور انڈینٹیشن چیک کریں
- کنسول میں ایرر میسجز دیکھیں

**ٹولز نظر نہیں آ رہے:**
- یقینی بنائیں کہ `@server.tool()` ڈی کوریٹرز موجود ہیں
- چیک کریں کہ ٹول فنکشنز `main()` سے پہلے ڈیفائن کیے گئے ہیں
- سرور کی صحیح کنفیگریشن کی تصدیق کریں

**کنکشن کے مسائل:**
- یقینی بنائیں کہ سرور stdio ٹرانسپورٹ کو صحیح استعمال کر رہا ہے
- چیک کریں کہ کوئی دوسرا پراسس مداخلت نہیں کر رہا
- انسپیکٹر کمانڈ سینٹیکس کی تصدیق کریں

## اسائنمنٹ

اپنے سرور کو مزید صلاحیتوں کے ساتھ بنانے کی کوشش کریں۔ [اس صفحے](https://api.chucknorris.io/) کو دیکھیں تاکہ، مثلاً، ایک ایسا ٹول ڈالیں جو کوئی API کال کرے۔ یہ آپ پر منحصر ہے کہ سرور کیسا نظر آئے۔ مزے کریں :)
## حل

[حل](./solution/README.md) یہاں ایک ممکنہ حل کے ساتھ کام کرنے والا کوڈ موجود ہے۔

## کلیدی نکات

اس باب کے کلیدی نکات درج ذیل ہیں:

- stdio ٹرانسپورٹ مقامی MCP سرورز کے لیے تجویز شدہ میکانزم ہے۔
- stdio ٹرانسپورٹ MCP سرورز اور کلائنٹس کے درمیان معیاری ان پٹ اور آؤٹ پٹ اسٹریمز کے ذریعے بغیر کسی رکاوٹ کے کمیونیکیشن کی سہولت دیتا ہے۔
- آپ انسپیکٹر اور Visual Studio Code دونوں کا استعمال کرتے ہوئے stdio سرورز کو براہ راست استعمال کر سکتے ہیں، جس سے ڈی بگنگ اور انٹیگریشن آسان ہو جاتی ہے۔

## نمونے

- [Java کیلکولیٹر](../samples/java/calculator/README.md)
- [.Net کیلکولیٹر](../../../../03-GettingStarted/samples/csharp)
- [JavaScript کیلکولیٹر](../samples/javascript/README.md)
- [TypeScript کیلکولیٹر](../samples/typescript/README.md)
- [Python کیلکولیٹر](../../../../03-GettingStarted/samples/python)

## اضافی وسائل

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## آگے کیا ہے

## اگلے اقدامات

اب جب کہ آپ نے stdio ٹرانسپورٹ کے ساتھ MCP سرورز بنانا سیکھ لیا ہے، آپ مزید جدید موضوعات تلاش کر سکتے ہیں:

- **اگلا**: [MCP کے ساتھ HTTP سٹریمنگ (Streamable HTTP)](../06-http-streaming/README.md) - دور دراز سرورز کے لیے دوسرے معاون ٹرانسپورٹ میکانزم کے بارے میں جانیں
- **ایڈوانسڈ**: [MCP سیکیورٹی بہترین طریقے](../../02-Security/README.md) - اپنے MCP سرورز میں سیکیورٹی نافذ کریں
- **پروڈکشن**: [ڈیوپلائمنٹ حکمت عملیاں](../09-deployment/README.md) - اپنے سرورز کو پروڈکشن کے لیے تعینات کریں

## اضافی وسائل

- [MCP وضاحت 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - آفیشل وضاحت
- [MCP SDK ڈاکیومنٹیشن](https://github.com/modelcontextprotocol/sdk) - تمام زبانوں کے لیے SDK حوالہ جات
- [کمیونٹی کی مثالیں](../../06-CommunityContributions/README.md) - کمیونٹی کی جانب سے مزید سرور کی مثالیں

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->