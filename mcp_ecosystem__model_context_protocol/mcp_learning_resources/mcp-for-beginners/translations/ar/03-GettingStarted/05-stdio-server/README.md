# خادم MCP مع ناقل stdio

> **⚠️ تحديث مهم**: اعتبارًا من مواصفة MCP 2025-06-18، تم **إهمال** ناقل SSE المستقل (Server-Sent Events) واستبداله بناقل "HTTP قابل للبث". تحدد مواصفة MCP الحالية آليتين رئيسيتين للنقل:
> 1. **stdio** - الإدخال/الإخراج القياسي (موصى به للخوادم المحلية)
> 2. **HTTP قابل للبث** - للخوادم البعيدة التي قد تستخدم SSE داخليًا
>
> تم تحديث هذا الدرس للتركيز على **ناقل stdio**، وهو النهج الموصى به لمعظم تطبيقات خوادم MCP.

يتيح ناقل stdio لخوادم MCP التواصل مع العملاء عبر تدفقات الإدخال والإخراج القياسية. هذا هو آلية النقل الأكثر استخدامًا وتوصية في مواصفة MCP الحالية، حيث يوفر طريقة بسيطة وفعالة لبناء خوادم MCP يمكن دمجها بسهولة مع تطبيقات العملاء المختلفة.

## نظرة عامة

يغطي هذا الدرس كيفية بناء واستهلاك خوادم MCP باستخدام ناقل stdio.

## أهداف التعلم

بنهاية هذا الدرس، ستكون قادرًا على:

- بناء خادم MCP باستخدام ناقل stdio.
- تصحيح أخطاء خادم MCP باستخدام Inspector.
- استهلاك خادم MCP باستخدام Visual Studio Code.
- فهم آليات النقل الحالية لـ MCP ولماذا يُنصح باستخدام stdio.

## ناقل stdio - كيف يعمل

ناقل stdio هو أحد نوعي الناقل المدعومين في مواصفة MCP الحالية (2025-11-25). إليك كيف يعمل:

- **اتصال بسيط**: يقرأ الخادم رسائل JSON-RPC من الإدخال القياسي (`stdin`) ويرسل الرسائل إلى الإخراج القياسي (`stdout`).
- **معتمد على العمليات**: يقوم العميل بتشغيل خادم MCP كعملية فرعية.
- **تنسيق الرسائل**: الرسائل هي طلبات JSON-RPC فردية أو إشعارات أو ردود، مفصولة بأسطر جديدة.
- **التسجيل**: يجوز للخادم كتابة سلاسل UTF-8 إلى الخطأ القياسي (`stderr`) لأغراض التسجيل.

### المتطلبات الأساسية:
- يجب أن تكون الرسائل مفصولة بأسطر جديدة وألا تحتوي على أسطر جديدة مدمجة
- يجب ألا يكتب الخادم أي شيء في `stdout` ليس رسالة MCP صالحة
- يجب ألا يكتب العميل أي شيء إلى `stdin` للخادم ليس رسالة MCP صالحة

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

في الكود السابق:

- نستورد الصنف `Server` و `StdioServerTransport` من MCP SDK
- ننشئ مثيل خادم مع إعدادات وقدرات أساسية
- ننشئ مثيل `StdioServerTransport` ونربط الخادم به، مما يمكن من التواصل عبر stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# إنشاء نسخة الخادم
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

في الكود السابق نحن:

- ننشئ مثيل خادم باستخدام MCP SDK
- نحدد الأدوات باستخدام الديكوريترات
- نستخدم مدير السياق stdio_server للتعامل مع الناقل

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

الفرق الرئيسي عن SSE هو أن خوادم stdio:

- لا تتطلب إعداد خادم ويب أو نقاط نهاية HTTP
- يتم تشغيلها كعمليات فرعية بواسطة العميل
- تتواصل عبر تدفقات stdin/stdout
- أبسط في التنفيذ وتصحيح الأخطاء

## تمرين: إنشاء خادم stdio

لإنشاء خادمنا، نحتاج إلى وضع أمرين في الاعتبار:

- نحتاج إلى استخدام خادم ويب لعرض نقاط النهاية للاتصال والرسائل.

## مختبر: إنشاء خادم MCP بسيط باستخدام stdio

في هذا المختبر، سننشئ خادم MCP بسيط باستخدام ناقل stdio الموصى به. سيُعرّض هذا الخادم أدوات يمكن للعملاء استدعاؤها باستخدام بروتوكول سياق النموذج القياسي.

### المتطلبات

- بايثون 3.8 أو أحدث
- MCP Python SDK: `pip install mcp`
- فهم أساسي للبرمجة غير المتزامنة (async)

لنبدأ بإنشاء أول خادم MCP stdio لدينا:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# تكوين السجل
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# إنشاء الخادم
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
    # استخدام النقل stdio
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## الفروقات الرئيسية عن منهج SSE المهجور

**ناقل stdio (المعيار الحالي):**
- نموذج عملية فرعية بسيط - العميل يشغل الخادم كعملية فرعية
- الاتصال عبر stdin/stdout باستخدام رسائل JSON-RPC
- لا حاجة لإعداد خادم HTTP
- أداء وأمان أفضل
- تصحيح أخطاء وتطوير أسهل

**ناقل SSE (مهجور اعتبارًا من MCP 2025-06-18):**
- يتطلب خادم HTTP مع نقاط نهاية SSE
- إعداد أكثر تعقيدًا مع بنية خادم ويب
- اعتبارات أمان إضافية لنقاط نهاية HTTP
- استبدل الآن بـ HTTP قابل للبث لسيناريوهات الويب

### إنشاء خادم باستخدام ناقل stdio

لإنشاء خادم stdio لدينا، نحتاج إلى:

1. **استيراد المكتبات المطلوبة** - نحتاج إلى مكونات خادم MCP وناقل stdio
2. **إنشاء مثيل الخادم** - تعريف الخادم مع قدراته
3. **تعريف الأدوات** - إضافة الوظائف التي نريد عرضها
4. **إعداد الناقل** - تكوين اتصال stdio
5. **تشغيل الخادم** - بدء الخادم والتعامل مع الرسائل

لننشئ هذا خطوة بخطوة:

### الخطوة 1: إنشاء خادم stdio أساسي

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# تكوين التسجيل
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# إنشاء الخادم
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

### الخطوة 2: إضافة المزيد من الأدوات

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

### الخطوة 3: تشغيل الخادم

احفظ الكود باسم `server.py` وشغّله من سطر الأوامر:

```bash
python server.py
```

سيبدأ الخادم وينتظر الإدخال من stdin. يتواصل عبر رسائل JSON-RPC عبر ناقل stdio.

### الخطوة 4: الاختبار باستخدام Inspector

يمكنك اختبار خادمك باستخدام MCP Inspector:

1. ثبّت Inspector: `npx @modelcontextprotocol/inspector`
2. شغّل Inspector ووجهه إلى خادمك
3. اختبر الأدوات التي أنشأتها

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## تصحيح أخطاء خادم stdio الخاص بك

### استخدام MCP Inspector

MCP Inspector أداة قيمة لتصحيح الأخطاء واختبار خوادم MCP. إليك كيفية استخدامها مع خادم stdio الخاص بك:

1. **تثبيت Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **تشغيل Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **اختبار الخادم**: يوفر Inspector واجهة ويب حيث يمكنك:
   - عرض قدرات الخادم
   - اختبار الأدوات بمعاملات مختلفة
   - مراقبة رسائل JSON-RPC
   - تصحيح مشكلات الاتصال

### استخدام VS Code

يمكنك أيضًا تصحيح خادم MCP الخاص بك مباشرة في VS Code:

1. أنشئ تكوين تشغيل في `.vscode/launch.json`:
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

2. ضع نقاط توقف في كود الخادم
3. شغّل المصحح واختبر مع Inspector

### نصائح شائعة لتصحيح الأخطاء

- استخدم `stderr` للتسجيل - لا تكتب أبدًا في `stdout` لأنه مخصص لرسائل MCP
- تأكد من أن جميع رسائل JSON-RPC مفصولة بأسطر جديدة
- اختبر بأدوات بسيطة أولاً قبل إضافة وظائف معقدة
- استخدم Inspector للتحقق من تنسيقات الرسائل

## استهلاك خادم stdio الخاص بك في VS Code

بعد أن بنيت خادم MCP stdio الخاص بك، يمكنك دمجه مع VS Code لاستخدامه مع Claude أو عملاء يدعمون MCP آخرين.

### التهيئة

1. **أنشئ ملف تكوين MCP** في `%APPDATA%\Claude\claude_desktop_config.json` (ويندوز) أو `~/Library/Application Support/Claude/claude_desktop_config.json` (ماك):

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

2. **أعد تشغيل Claude**: أغلق وافتح Claude لتحميل تكوين الخادم الجديد.

3. **اختبر الاتصال**: ابدأ محادثة مع Claude وجرب استخدام أدوات خادمك:
   - "هل يمكنك تحيتي باستخدام أداة التحية؟"
   - "احسب مجموع 15 و 27"
   - "ما معلومات الخادم؟"

### مثال خادم stdio بـ TypeScript

إليك مثال كامل بلغة TypeScript للرجوع إليه:

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

// أضف أدوات
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

### مثال خادم stdio بـ .NET

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

## الملخص

في هذا الدرس المحدّث، تعلمت كيف:

- تبني خوادم MCP باستخدام ناقل **stdio** الحالي (النهج الموصى به)
- تفهم لماذا تم إهمال ناقل SSE لصالح stdio وHTTP القابل للبث
- تنشئ أدوات يمكن للعملاء MCP استدعاؤها
- تصحح أخطاء خادمك باستخدام MCP Inspector
- تدمج خادم stdio الخاص بك مع VS Code وClaude

يوفر ناقل stdio طريقة أبسط وأكثر أمانًا وأداءً لبناء خوادم MCP مقارنة بمنهج SSE المهجور. إنه الناقل الموصى به لمعظم تطبيقات خوادم MCP اعتبارًا من مواصفة 2025-06-18.

### .NET

1. دعنا ننشئ بعض الأدوات أولاً، لهذا سننشئ ملف *Tools.cs* بالمحتوى التالي:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## تمرين: اختبار خادم stdio الخاص بك

الآن بعد أن بنيت خادم stdio الخاص بك، دعنا نختبره للتأكد من عمله بشكل صحيح.

### المتطلبات

1. تأكد من تثبيت MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. يجب حفظ كود الخادم (مثلاً باسم `server.py`)

### الاختبار باستخدام Inspector

1. **ابدأ Inspector مع خادمك**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **افتح واجهة الويب**: سيفتح Inspector نافذة متصفح تعرض قدرات خادمك.

3. **اختبر الأدوات**: 
   - جرب أداة `get_greeting` مع أسماء مختلفة
   - اختبر أداة `calculate_sum` بأرقام مختلفة
   - استدع أداة `get_server_info` لرؤية بيانات الخادم الوصفية

4. **راقب الاتصال**: يعرض Inspector رسائل JSON-RPC المتبادلة بين العميل والخادم.

### ما الذي يجب أن تراه

عندما يبدأ خادمك بشكل صحيح، يجب أن ترى:
- قدرات الخادم مدرجة في Inspector
- الأدوات المتاحة للاختبار
- تبادل ناجح لرسائل JSON-RPC
- ردود الأدوات معروضة في الواجهة

### المشاكل الشائعة والحلول

**الخادم لن يبدأ:**
- تحقق من تثبيت جميع التبعيات: `pip install mcp`
- تحقق من صحة بناء الجملة للمترجم والمسافات البادئة
- تفقد رسائل الخطأ في وحدة التحكم

**عدم ظهور الأدوات:**
- تأكد من وجود ديكوريترات `@server.tool()` 
- تحقق أن دوال الأدوات معرفة قبل `main()`
- تأكد من تكوين الخادم بشكل صحيح

**مشاكل الاتصال:**
- تأكد من أن الخادم يستخدم ناقل stdio بشكل صحيح
- تحقق من عدم وجود عمليات أخرى متداخلة
- تحقق من صحة صيغة أمر Inspector

## الواجب

حاول بناء خادمك مع المزيد من القدرات. راجع [هذه الصفحة](https://api.chucknorris.io/) لإضافة أداة تستدعي API على سبيل المثال. القرار لك بكيفية تصميم الخادم. استمتع :)

## الحل

[الحل](./solution/README.md) هنا حل ممكن بكود عملي.

## النقاط الرئيسية

النقاط الرئيسية من هذا الفصل هي:

- ناقل stdio هو الآلية الموصى بها لخوادم MCP المحلية.
- يسمح ناقل stdio بتواصل سلس بين خوادم MCP والعملاء باستخدام تدفقات الإدخال والإخراج القياسية.
- يمكنك استخدام كلٍ من Inspector وVisual Studio Code لاستهلاك خوادم stdio مباشرة، مما يجعل التصحيح والتكامل بسيطًا.

## عينات

- [آلة حاسبة جافا](../samples/java/calculator/README.md)
- [آلة حاسبة .Net](../../../../03-GettingStarted/samples/csharp)
- [آلة حاسبة جافا سكريبت](../samples/javascript/README.md)
- [آلة حاسبة TypeScript](../samples/typescript/README.md)
- [آلة حاسبة بايثون](../../../../03-GettingStarted/samples/python) 

## موارد إضافية

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## ما التالي

## الخطوات القادمة

بعد أن تعلّمت كيفية بناء خوادم MCP باستخدام ناقل stdio، يمكنك استكشاف مواضيع متقدمة أكثر:

- **التالي**: [البث عبر HTTP مع MCP (HTTP قابل للبث)](../06-http-streaming/README.md) - تعرف على آلية ناقل أخرى مدعومة للخوادم البعيدة
- **متقدم**: [أفضل ممارسات أمان MCP](../../02-Security/README.md) - تنفيذ الأمان في خوادم MCP الخاصة بك
- **الإنتاج**: [استراتيجيات النشر](../09-deployment/README.md) - نشر خوادمك للاستخدام الإنتاجي

## موارد إضافية

- [مواصفة MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - المواصفة الرسمية
- [توثيق MCP SDK](https://github.com/modelcontextprotocol/sdk) - مراجع SDK لكافة اللغات
- [أمثلة المجتمع](../../06-CommunityContributions/README.md) - المزيد من أمثلة الخوادم من المجتمع

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة بالذكاء الاصطناعي [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى للدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة، يُنصح بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->