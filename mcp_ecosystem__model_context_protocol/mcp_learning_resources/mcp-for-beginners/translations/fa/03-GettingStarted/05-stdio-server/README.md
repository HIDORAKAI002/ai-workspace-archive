# سرور MCP با انتقال stdio

> **⚠️ به‌روزرسانی مهم**: از نسخه مشخصات MCP مورخ ۱۸-۰۶-۲۰۲۵، انتقال SSE مستقل (Server-Sent Events) **منسوخ شده** و جایگزین آن انتقال "HTTP قابل استریم" شده است. مشخصات فعلی MCP دو مکانیزم اصلی انتقال را تعریف می‌کند:
> ۱. **stdio** - ورودی/خروجی استاندارد (توصیه شده برای سرورهای محلی)
> ۲. **HTTP قابل استریم** - برای سرورهای راه دور که ممکن است به صورت داخلی از SSE استفاده کنند
>
> این درس برای تمرکز بر روی **انتقال stdio** به‌روزرسانی شده است که رویکرد توصیه شده برای بیشتر پیاده‌سازی‌های سرور MCP است.

انتقال stdio به سرورهای MCP اجازه می‌دهد از طریق جریان‌های ورودی و خروجی استاندارد با کلاینت‌ها ارتباط برقرار کنند. این رایج‌ترین و توصیه‌شده‌ترین مکانیزم انتقال در مشخصات فعلی MCP است که روشی ساده و کارآمد برای ساخت سرورهای MCP فراهم می‌کند که به آسانی با برنامه‌های مختلف کلاینت یکپارچه می‌شوند.

## نمای کلی

در این درس توضیح داده می‌شود چگونه سرورهای MCP را با استفاده از انتقال stdio بسازید و مصرف کنید.

## اهداف یادگیری

در پایان این درس، شما خواهید توانست:

- یک سرور MCP با انتقال stdio بسازید.
- سرور MCP را با Inspektor اشکال‌زدایی کنید.
- یک سرور MCP را با Visual Studio Code مصرف کنید.
- مکانیزم‌های فعلی انتقال MCP را بفهمید و دلیل توصیه به stdio را دریابید.

## انتقال stdio - چگونه کار می‌کند

انتقال stdio یکی از دو نوع انتقال پشتیبانی‌شده در مشخصات MCP فعلی (۲۵-۱۱-۲۰۲۵) است. نحوه کار آن به شرح زیر است:

- **ارتباط ساده**: سرور پیام‌های JSON-RPC را از ورودی استاندارد (`stdin`) می‌خواند و پیام‌ها را به خروجی استاندارد (`stdout`) می‌فرستد.
- **مبتنی بر فرایند**: کلاینت سرور MCP را به عنوان یک زیرفرایند (subprocess) اجرا می‌کند.
- **فرمت پیام**: پیام‌ها درخواست‌ها، اطلاع‌رسانی‌ها یا پاسخ‌های JSON-RPC منفرد هستند که با خط جدید جدا شده‌اند.
- **لاگ‌گیری**: سرور می‌تواند رشته‌های UTF-8 را برای لاگ‌گیری به خطای استاندارد (`stderr`) بنویسد.

### الزامات کلیدی:
- پیام‌ها باید با خط جدید جدا شوند و نباید دارای خط جدید درون‌متنی باشند
- سرور نباید چیزی به `stdout` بنویسد که پیام معتبر MCP نباشد
- کلاینت نباید چیزی به `stdin` سرور بنویسد که پیام معتبر MCP نباشد

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

در کد بالا:

- کلاس `Server` و `StdioServerTransport` را از SDK MCP وارد می‌کنیم
- نمونه سروری با پیکربندی و قابلیت‌های پایه ایجاد می‌کنیم
- نمونه ای از `StdioServerTransport` می‌سازیم و سرور را به آن متصل می‌کنیم تا ارتباط روی stdin/stdout فعال شود

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# ایجاد نمونه سرور
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

در کد بالا:

- یک نمونه سرور با استفاده از SDK MCP ایجاد می‌کنیم
- ابزارها را با دکوراتورها تعریف می‌کنیم
- از مدیر زمینه stdio_server برای مدیریت انتقال استفاده می‌کنیم

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

تفاوت کلیدی با SSE این است که سرورهای stdio:

- نیازی به راه‌اندازی وب‌سرور یا نقطه پایان HTTP ندارند
- توسط کلاینت به عنوان زیرفرایند اجرا می‌شوند
- از طریق جریان‌های stdin/stdout ارتباط برقرار می‌کنند
- پیاده‌سازی و اشکال‌زدایی آسان‌تری دارند

## تمرین: ساخت سرور stdio

برای ساخت سرورمان باید دو نکته را در نظر بگیریم:

- نیاز به استفاده از وب‌سرور برای افشای نقطه‌های اتصال و پیام‌ها داریم.

## آزمایشگاه: ساخت یک سرور ساده MCP با stdio

در این آزمایشگاه، یک سرور MCP ساده با استفاده از انتقال stdio توصیه‌شده می‌سازیم. این سرور ابزارهایی را در دسترس قرار می‌دهد که کلاینت‌ها می‌توانند با استفاده از پروتکل Model Context استاندارد با آن‌ها تماس بگیرند.

### پیش‌نیازها

- پایتون نسخه ۳.۸ یا بالاتر
- SDK پایتون MCP: `pip install mcp`
- فهم پایه از برنامه‌نویسی ناهمگام

بیایید اولین سرور MCP stdio خود را ایجاد کنیم:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# پیکربندی ثبت وقایع
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# سرور را ایجاد کنید
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
    # از انتقال stdio استفاده کنید
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## تفاوت‌های کلیدی با روش منسوخ‌شده SSE

**انتقال stdio (استاندارد فعلی):**
- مدل ساده زیرفرایندی - کلاینت سرور را به عنوان فرزند اجرا می‌کند
- ارتباط از طریق stdin/stdout با پیام‌های JSON-RPC
- نیازی به راه‌اندازی وب سرور HTTP نیست
- عملکرد و امنیت بهتر
- اشکال‌زدایی و توسعه آسان‌تر

**انتقال SSE (منسوخ شده از MCP مورخ ۱۸-۰۶-۲۰۲۵):**
- نیاز به وب سرور HTTP با نقاط انتهایی SSE
- راه‌اندازی پیچیده‌تر با زیرساخت وب سرور
- ملاحظات امنیتی اضافی برای نقاط انتهایی HTTP
- جایگزین شده توسط HTTP قابل استریم در سناریوهای مبتنی بر وب

### ساخت سرور با انتقال stdio

برای ساخت سرور stdio باید:

1. **کتابخانه‌های لازم را وارد کنیم** - نیاز به کامپوننت‌های سرور MCP و انتقال stdio داریم
2. **نمونه سرور بسازیم** - تعریف سرور با قابلیت‌هایش
3. **ابزارها را تعریف کنیم** - عملکردی که می‌خواهیم را اضافه کنیم
4. **انتقال را تنظیم کنیم** - پیکربندی ارتباط stdio
5. **سرور را اجرا کنیم** - شروع سرور و مدیریت پیام‌ها

گام به گام پیش می‌رویم:

### گام ۱: ساخت یک سرور stdio پایه

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# پیکربندی ثبت وقایع
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ایجاد سرور
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

### گام ۲: افزودن ابزارهای بیشتر

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

### گام ۳: اجرای سرور

کد را به نام `server.py` ذخیره کرده و از خط فرمان اجرا کنید:

```bash
python server.py
```

سرور شروع به کار کرده و منتظر ورودی از stdin می‌ماند. ارتباط با پیام‌های JSON-RPC روی انتقال stdio برقرار می‌شود.

### گام ۴: آزمایش با Inspektor

می‌توانید سرورتان را با MCP Inspector تست کنید:

۱. نصب Inspector: `npx @modelcontextprotocol/inspector`
۲. اجرای Inspector و اشاره به سرور خود
۳. آزمایش ابزارهایی که ساخته‌اید

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## اشکال‌زدایی سرور stdio شما

### با استفاده از MCP Inspector

MCP Inspector ابزاری ارزشمند برای اشکال‌زدایی و تست سرورهای MCP است. نحوه استفاده آن با سرور stdio شما:

۱. **نصب Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

۲. **اجرای Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

۳. **تست سرور**: Inspector یک رابط وب ارائه می‌دهد که می‌توانید:
   - قابلیت‌های سرور را ببینید
   - ابزارها را با پارامترهای متفاوت تست کنید
   - پیام‌های JSON-RPC را مشاهده کنید
   - مشکلات اتصال را اشکال‌زدایی کنید

### استفاده از VS Code

می‌توانید MCP سرور خود را مستقیماً در VS Code اشکال‌زدایی کنید:

۱. یک پیکربندی لانچ در `.vscode/launch.json` بسازید:
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

۲. نقاط توقف در کد سرور قرار دهید
۳. دیباگر را اجرا کنید و با Inspector تست کنید

### نکات رایج اشکال‌زدایی

- برای لاگ‌گیری از `stderr` استفاده کنید - هرگز به `stdout` چیزی ننویسید چون مختص پیام‌های MCP است
- اطمینان حاصل کنید همه پیام‌های JSON-RPC با خط جدید جدا شده‌اند
- ابتدا با ابزارهای ساده تست کنید قبل از افزودن عملکرد پیچیده
- از Inspector برای بررسی قالب پیام‌ها استفاده کنید

## مصرف سرور stdio خود در VS Code

وقتی سرور MCP با انتقال stdio ساختید، می‌توانید آن را با VS Code یکپارچه کنید تا با Claude یا کلاینت‌های سازگار MCP استفاده شود.

### پیکربندی

۱. **یک فایل پیکربندی MCP بسازید** در مسیر `%APPDATA%\Claude\claude_desktop_config.json` (ویندوز) یا `~/Library/Application Support/Claude/claude_desktop_config.json` (مک):

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

۲. **راه‌اندازی مجدد Claude**: Claude را ببندید و باز کنید تا پیکربندی سرور جدید بارگذاری شود.

۳. **تست اتصال**: با Claude مکالمه را شروع کرده و ابزارهای سرور خود را امتحان کنید:
   - "می‌توانی با ابزار خوش‌آمدگویی به من سلام کنی؟"
   - "جمع ۱۵ و ۲۷ را حساب کن"
   - "اطلاعات سرور چیست؟"

### مثال سرور stdio در TypeScript

مثال کامل TypeScript برای مرجع:

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

// افزودن ابزارها
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

### مثال سرور stdio در .NET

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

## خلاصه

در این درس به‌روزشده، یاد گرفتید چگونه:

- سرورهای MCP را با انتقال **stdio** فعلی بسازید (رویکرد توصیه‌شده)
- بفهمید چرا انتقال SSE به نفع stdio و HTTP قابل استریم منسوخ شد
- ابزارهایی ایجاد کنید که کلاینت‌های MCP بتوانند فراخوانی کنند
- سرور خود را با MCP Inspector اشکال‌زدایی کنید
- سرور stdio خود را با VS Code و Claude یکپارچه کنید

انتقال stdio روشی ساده‌تر، امن‌تر و با کارایی بالاتر برای ساخت سرورهای MCP نسبت به روش منسوخ SSE ارائه می‌دهد. این انتقال در بیشتر پیاده‌سازی‌های سرور MCP توصیه می‌شود طبق مشخصات نسخه ۱۸-۰۶-۲۰۲۵.

### .NET

۱. ابتدا بیایید چند ابزار بسازیم، برای این کار یک فایل *Tools.cs* با محتوای زیر ایجاد می‌کنیم:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## تمرین: تست سرور stdio شما

حالا که سرور stdio خود را ساختید، بیایید آن را تست کنیم تا مطمئن شویم درست کار می‌کند.

### پیش‌نیازها

۱. اطمینان حاصل کنید MCP Inspector نصب شده است:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

۲. کد سرور شما ذخیره شده باشد (مثلاً به نام `server.py`)

### تست با Inspector

۱. **Inspector را با سرورتان اجرا کنید**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

۲. **رابط وب را باز کنید**: Inspector یک پنجره مرورگر باز می‌کند که قابلیت‌های سرور شما را نشان می‌دهد.

۳. **آزمایش ابزارها**:
   - ابزار `get_greeting` را با اسامی مختلف امتحان کنید
   - ابزار `calculate_sum` را با اعداد مختلف تست کنید
   - ابزار `get_server_info` را فراخوانی کنید و متادیتای سرور را ببینید

۴. **نظارت بر ارتباط**: Inspector پیام‌های JSON-RPC مبادله‌شده بین کلاینت و سرور را نشان می‌دهد.

### آنچه باید ببینید

وقتی سرور شما به درستی شروع شود باید نمایش داده شود:
- قابلیت‌های سرور در Inspector
- ابزارهایی که برای تست در دسترس هستند
- مبادلات موفق پیام JSON-RPC
- پاسخ ابزارها در رابط

### مشکلات رایج و راه‌حل‌ها

**سرور شروع نمی‌شود:**
- اطمینان از نصب همه وابستگی‌ها: `pip install mcp`
- بررسی سینتکس و تورفتگی پایتون
- جستجوی پیام‌های خطا در کنسول

**ابزارها نمایش داده نمی‌شوند:**
- اطمینان از وجود دکوراتور `@server.tool()`
- بررسی اینکه توابع ابزار قبل از `main()` تعریف شده‌اند
- تأیید پیکربندی درست سرور

**مشکلات اتصال:**
- اطمینان از استفاده صحیح از انتقال stdio
- بررسی اینکه فرایندهای دیگر مزاحم نیستند
- اطمینان از صحت سینتکس دستور Inspector

## تمرین

سعی کنید سرورتان را با قابلیت‌های بیشتری بسازید. به [این صفحه](https://api.chucknorris.io/) نگاه کنید تا مثلاً ابزاری بسازید که یک API فراخوانی کند. خودتان تصمیم بگیرید سرور چگونه باشد. خوش بگذرد :)

## راه‌حل

[راه‌حل](./solution/README.md) اینجا یک راه‌حل ممکن با کد کارآمد است.

## نکات کلیدی

نکات کلیدی این فصل عبارتند از:

- انتقال stdio مکانیزم توصیه‌شده برای سرورهای محلی MCP است.
- انتقال stdio ارتباط بدون درز بین سرورهای MCP و کلاینت‌ها با استفاده از جریان‌های ورودی و خروجی استاندارد را فراهم می‌کند.
- می‌توانید از Inspector و Visual Studio Code برای مصرف مستقیم سرورهای stdio استفاده کنید که اشکال‌زدایی و یکپارچه‌سازی را ساده می‌کند.

## نمونه‌ها

- [ماشین حساب جاوا](../samples/java/calculator/README.md)
- [ماشین حساب .Net](../../../../03-GettingStarted/samples/csharp)
- [ماشین حساب جاوااسکریپت](../samples/javascript/README.md)
- [ماشین حساب تایپ‌اسکریپت](../samples/typescript/README.md)
- [ماشین حساب پایتون](../../../../03-GettingStarted/samples/python)

## منابع اضافی

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## مرحله بعدی

## قدم‌های بعدی

حالا که یاد گرفتید چگونه سرورهای MCP با انتقال stdio بسازید، می‌توانید موضوعات پیشرفته‌تر را بررسی کنید:

- **مرحله بعد**: [استریم HTTP با MCP (HTTP قابل استریم)](../06-http-streaming/README.md) - درباره دیگر مکانیزم انتقال پشتیبانی‌شده برای سرورهای راه دور بیاموزید
- **پیشرفته**: [بهترین روش‌های امنیتی MCP](../../02-Security/README.md) - پیاده‌سازی امنیت در سرورهای MCP
- **تولید**: [استراتژی‌های استقرار](../09-deployment/README.md) - آماده‌سازی سرورها برای استفاده در تولید

## منابع بیشتر

- [مشخصات MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - مشخصات رسمی
- [مستندات SDK MCP](https://github.com/modelcontextprotocol/sdk) - مراجع SDK برای همه زبان‌ها
- [نمونه‌های جامعه](../../06-CommunityContributions/README.md) - نمونه‌های بیشتر سرور از جامعه

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->