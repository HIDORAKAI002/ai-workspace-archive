# استفاده پیشرفته از سرور

دو نوع سرور مختلف در MCP SDK ارائه شده است، سرور معمولی شما و سرور سطح پایین. معمولاً شما از سرور معمولی برای افزودن ویژگی‌ها به آن استفاده می‌کنید. اما در برخی موارد، می‌خواهید به سرور سطح پایین تکیه کنید، مانند:

- معماری بهتر. ممکن است با هر دو سرور معمولی و سرور سطح پایین معماری تمیزی ایجاد کرد اما می‌توان ادعا کرد که با سرور سطح پایین کمی آسان‌تر است.
- دسترسی به ویژگی‌ها. برخی ویژگی‌های پیشرفته فقط با سرور سطح پایین قابل استفاده هستند. این موضوع را در فصل‌های بعدی می‌بینید وقتی که نمونه‌برداری و استخراج را اضافه می‌کنیم.

## سرور معمولی در مقابل سرور سطح پایین

در اینجا شکل ایجاد یک سرور MCP با سرور معمولی را می‌بینید

**Python**

```python
mcp = FastMCP("Demo")

# افزودن ابزار جمع
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b
```

**TypeScript**

```typescript
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});

// افزودن یک ابزار جمع کردن
server.registerTool("add",
  {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number(), b: z.number() }
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);
```

موضوع این است که شما به صراحت هر ابزار، منبع یا پرامپتی که می‌خواهید سرور داشته باشد را اضافه می‌کنید. ایرادی در این نیست.

### روش سرور سطح پایین

با این حال، وقتی از روش سرور سطح پایین استفاده می‌کنید باید آن را به شکل متفاوتی ببینید. به جای ثبت هر ابزار، شما برای هر نوع ویژگی (ابزارها، منابع یا پرامپت‌ها) دو هندلر ایجاد می‌کنید. بنابراین برای مثال ابزارها فقط دو تابع دارند، به این صورت:

- فهرست کردن همه ابزارها. یک تابع مسئول تمام تلاش‌ها برای فهرست‌بندی ابزارها خواهد بود.
- هندل کردن فراخوانی تمام ابزارها. در این جا هم فقط یک تابع مسئول هندل کردن فراخوانی یک ابزار است.

این فرض می‌کند کار کمتری است، درست است؟ بنابراین به جای ثبت یک ابزار، فقط باید مطمئن شوم که ابزار هنگام فهرست کردن همه ابزارها فهرست می‌شود و زمانی که درخواست فراخوانی یک ابزار می‌آید فراخوانی می‌شود.

بیایید ببینیم کد اکنون چگونه به نظر می‌رسد:

**Python**

```python
@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    """List available tools."""
    return [
        types.Tool(
            name="add",
            description="Add two numbers",
            inputSchema={
                "type": "object",
                "properties": {
                    "a": {"type": "number", "description": "number to add"}, 
                    "b": {"type": "number", "description": "number to add"}
                },
                "required": ["query"],
            },
        )
    ]
```

**TypeScript**

```typescript
server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // بازگرداندن فهرست ابزارهای ثبت‌ شده
  return {
    tools: [{
        name="add",
        description="Add two numbers",
        inputSchema={
            "type": "object",
            "properties": {
                "a": {"type": "number", "description": "number to add"}, 
                "b": {"type": "number", "description": "number to add"}
            },
            "required": ["query"],
        }
    }]
  };
});
```

اینجا اکنون تابعی داریم که یک لیست از ویژگی‌ها را برمی‌گرداند. هر ورودی در لیست ابزارها اکنون فیلدهایی مثل `name`، `description` و `inputSchema` دارد تا با نوع بازگشتی مطابقت داشته باشد. این امکان را می‌دهد که تعریف ابزارها و ویژگی‌ها را جای دیگری قرار دهیم. حالا می‌توانیم تمام ابزارهایمان را در یک پوشه tools بسازیم و همین طور برای تمام ویژگی‌ها اینگونه باشد، بنابراین پروژه شما ناگهان به شکل زیر سازماندهی می‌شود:

```text
app
--| tools
----| add
----| substract
--| resources
----| products
----| schemas
--| prompts
----| product-description
```

این عالی است، معماری ما می‌تواند بسیار تمیز به نظر برسد.

در مورد فراخوانی ابزارها چطور، آیا ایده یکسان است، یک هندلر برای فراخوانی هر ابزاری؟ بله، دقیقاً، این هم کد آن:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools یک دیکشنری است که نام ابزارها کلیدهای آن می‌باشند
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

**TypeScript**

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { params: { name } } = request;
    let tool = tools.find(t => t.name === name);
    if(!tool) {
        return {
            error: {
                code: "tool_not_found",
                message: `Tool ${name} not found.`
            }
       };
    }
    
    // آرگ: request.params.arguments
    // TODO فراخوانی ابزار،

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

همانطور که از کد بالا می‌بینید، باید ابزار را برای فراخوانی و آرگومان‌های آن تجزیه کنیم و سپس به فراخوانی ابزار بپردازیم.

## بهبود روش با اعتبارسنجی

تا اینجا دیدید چگونه تمام ثبت‌های شما برای افزودن ابزارها، منابع و پرامپت‌ها می‌تواند با این دو هندلر برای هر نوع ویژگی جایگزین شود. چه چیز دیگری باید انجام دهیم؟ خب، باید شکلی از اعتبارسنجی را اضافه کنیم تا اطمینان حاصل کنیم که ابزار با آرگومان‌های درست فراخوانی می‌شود. هر محیط اجرا راه‌حل خاص خود را برای این دارد، برای مثال در Python از Pydantic و در TypeScript از Zod استفاده می‌شود. ایده این است که کارهای زیر را انجام دهیم:

- منطق ایجاد یک ویژگی (ابزار، منبع یا پرامپت) را به پوشه اختصاصی خودش منتقل کنیم.
- راهی برای اعتبارسنجی درخواست ورودی که می‌خواهد مثلاً یک ابزار را فراخوانی کند، اضافه کنیم.

### ایجاد یک ویژگی

برای ایجاد یک ویژگی، باید یک فایل برای آن ویژگی بسازیم و مطمئن شویم که دارای فیلدهای اجباری مورد نیاز آن ویژگی است. فیلدها بین ابزارها، منابع و پرامپت‌ها کمی متفاوت‌اند.

**Python**

```python
# schema.py
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float

# add.py

from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # ورودی را با استفاده از مدل Pydantic اعتبارسنجی کنید
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # کارهای انجام‌نشده: اضافه کردن Pydantic تا بتوانیم یک AddInputModel ایجاد کرده و آرگومان‌ها را اعتبارسنجی کنیم

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

در اینجا می‌بینید که کارهای زیر را انجام می‌دهیم:

- یک اسکما با استفاده از Pydantic به نام `AddInputModel` با فیلدهای `a` و `b` در فایل *schema.py* ایجاد می‌کنیم.
- سعی می‌کنیم درخواست ورودی را از نوع `AddInputModel` تجزیه کنیم، اگر پارامترها منطبق نباشند این کرش می‌دهد:

   ```python
   # add.py
    try:
        # صحت‌سنجی ورودی با استفاده از مدل Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

می‌توانید انتخاب کنید که منطق تجزیه را در فراخوانی ابزار قرار دهید یا در تابع هندلر.

**TypeScript**

```typescript
// سرور.ts
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { params: { name } } = request;
    let tool = tools.find(t => t.name === name);
    if (!tool) {
       return {
        error: {
            code: "tool_not_found",
            message: `Tool ${name} not found.`
        }
       };
    }
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);

       // @ts-ignore
       const result = await tool.callback(input);

       return {
          content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
      };
    } catch (error) {
       return {
          error: {
             code: "invalid_arguments",
             message: `Invalid arguments for tool ${name}: ${error instanceof Error ? error.message : String(error)}`
          }
    };
   }

});

// طرحواره.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// افزودن.ts
import { Tool } from "./tool.js";
import { MathInputSchema } from "./schema.js";
import { zodToJsonSchema } from "zod-to-json-schema";

export default {
    name: "add",
    rawSchema: MathInputSchema,
    inputSchema: zodToJsonSchema(MathInputSchema),
    callback: async ({ a, b }) => {
        return {
            content: [{ type: "text", text: String(a + b) }]
        };
    }
} as Tool;
```

- در هندلری که با تمامی فراخوانی‌های ابزار سروکار دارد، اکنون سعی داریم درخواست ورودی را به اسکمای تعریف شده ابزار تبدیل کنیم:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    اگر این موفق بود، سپس به فراخوانی ابزار واقعی می‌پردازیم:

    ```typescript
    const result = await tool.callback(input);
    ```

همانطور که می‌بینید، این روش معماری عالی ایجاد می‌کند چون هر چیز جای خودش را دارد، *server.ts* یک فایل بسیار کوچک است که فقط هندلرهای درخواست را وصل می‌کند و هر ویژگی در پوشه مربوط به خود مانند tools/، resources/ یا /prompts قرار دارد.

عالی است، اجازه دهید این را بعداً بسازیم.

## تمرین: ایجاد یک سرور سطح پایین

در این تمرین انجام می‌دهیم:

1. ایجاد یک سرور سطح پایین که فهرست ابزارها و فراخوانی ابزارها را هندل کند.
2. پیاده‌سازی معماری برای توسعه‌ای که بتوانید بر آن بنا کنید.
3. افزودن اعتبارسنجی برای اطمینان از اینکه فراخوانی ابزارهای شما به درستی اعتبارسنجی می‌شوند.

### -1- ساخت معماری

اولین چیزی که باید به آن پرداخته شود معماری‌ای است که به ما کمک کند هنگام افزودن ویژگی‌های بیشتر، مقیاس‌پذیری داشته باشیم، اینجا شکلش را می‌بینید:

**Python**

```text
server.py
--| tools
----| __init__.py
----| add.py
----| schema.py
client.py
```

**TypeScript**

```text
server.ts
--| tools
----| add.ts
----| schema.ts
client.ts
```

حالا معماری‌ای راه‌اندازی کرده‌ایم که به ما این اطمینان را می‌دهد بتوانیم به راحتی ابزارهای جدیدی در پوشه tools اضافه کنیم. آزادید این کار را برای زیرشاخه‌های resources و prompts نیز انجام دهید.

### -2- ایجاد یک ابزار

بیایید ببینیم ایجاد یک ابزار چگونه است. اول، باید در زیرشاخه *tool* خود ساخته شود به این صورت:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # اعتبارسنجی ورودی با استفاده از مدل Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: افزودن Pydantic، تا بتوانیم یک AddInputModel ایجاد کنیم و آرگومان‌ها را اعتبارسنجی کنیم

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

اینجا می‌بینیم که چگونه نام، توضیح و اسکمای ورودی را با استفاده از Pydantic تعریف می‌کنیم و یک هندلر که زمانی که این ابزار فراخوانی شود اجرا می‌شود. در انتها، `tool_add` که دیکشنری شامل این ویژگی‌ها است، ارائه می‌دهیم.

همچنین *schema.py* وجود دارد که برای تعریف اسکمای ورودی این ابزار استفاده می‌شود:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

همچنین باید *__init__.py* را پر کنیم تا پوشه tools به عنوان یک ماژول شناخته شود. همچنین باید ماژول‌های درون آن را به این شکل ارائه دهیم:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

می‌توانیم با افزودن ابزارهای بیشتر به این فایل اضافه کنیم.

**TypeScript**

```typescript
import { Tool } from "./tool.js";
import { MathInputSchema } from "./schema.js";
import { zodToJsonSchema } from "zod-to-json-schema";

export default {
    name: "add",
    rawSchema: MathInputSchema,
    inputSchema: zodToJsonSchema(MathInputSchema),
    callback: async ({ a, b }) => {
        return {
            content: [{ type: "text", text: String(a + b) }]
        };
    }
} as Tool;
```

اینجا یک دیکشنری با ویژگی‌ها ایجاد می‌کنیم:

- name، نام ابزار است.
- rawSchema، اسکمای Zod است که برای اعتبارسنجی درخواست‌های وارده برای فراخوانی این ابزار استفاده می‌شود.
- inputSchema، این اسکما توسط هندلر استفاده می‌شود.
- callback، برای فراخوانی ابزار استفاده می‌شود.

همچنین `Tool` وجود دارد که این دیکشنری را به نوعی تبدیل می‌کند که هندلر سرور mcp می‌تواند قبول کند و به این صورت است:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

و فایل *schema.ts* که اسکمای ورودی هر ابزار را ذخیره می‌کند به این صورت با یک اسکما در حال حاضر اما با افزودن ابزارهای دیگر می‌توان موارد بیشتری اضافه کرد:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

عالی، اجازه دهید به هندل کردن فهرست ابزارهای ما بپردازیم.

### -3- هندل کردن فهرست ابزارها

برای هندل کردن فهرست ابزارها، باید یک هندلر درخواست تنظیم کنیم. این چیزی است که باید به فایل سرور خود اضافه کنیم:

**Python**

```python
# کد برای اختصار حذف شد
from tools import tools

@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    tool_list = []
    print(tools)

    for tool in tools.values():
        tool_list.append(
            types.Tool(
                name=tool["name"],
                description=tool["description"],
                inputSchema=pydantic_to_json(tool["input_schema"]),
            )
        )
    return tool_list
```

در اینجا، دکوراتور `@server.list_tools` و تابع پیاده‌سازی `handle_list_tools` را اضافه می‌کنیم. در دومی باید یک لیست از ابزارها تولید کنیم. توجه کنید هر ابزار باید `name`، `description` و `inputSchema` داشته باشد.

**TypeScript**

برای راه‌اندازی هندلر درخواست برای فهرست ابزارها، باید `setRequestHandler` را روی سرور با اسکمای متناسب با کاری که می‌خواهیم انجام دهیم صدا بزنیم، در این مورد `ListToolsRequestSchema`.

```typescript
// index.ts
import addTool from "./add.js";
import subtractTool from "./subtract.js";
import {server} from "../server.js";
import { Tool } from "./tool.js";

export let tools: Array<Tool> = [];
tools.push(addTool);
tools.push(subtractTool);

// server.ts
// کد برای اختصار حذف شده است
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // بازگرداندن لیست ابزارهای ثبت‌شده
  return {
    tools: tools
  };
});
```

عالی است، حالا بخش فهرست ابزارها را حل کردیم، بیایید ببینیم چگونه می‌توان ابزارها را فراخوانی کرد.

### -4- هندل کردن فراخوانی ابزار

برای فراخوانی یک ابزار، باید هندلر درخواست دیگری تنظیم کنیم، این بار متمرکز بر پردازش درخواستی که مشخص می‌کند کدام ویژگی فراخوانی شود و با چه آرگومان‌هایی.

**Python**

بیایید از دکوراتور `@server.call_tool` استفاده کنیم و با تابعی مانند `handle_call_tool` پیاده‌سازی کنیم. در این تابع، باید نام ابزار، آرگومان‌های آن را تجزیه کنیم و مطمئن شویم آرگومان‌ها برای آن ابزار معتبر هستند. می‌توانیم اعتبارسنجی آرگومان‌ها را در این تابع یا در خود ابزار انجام دهیم.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # ابزارها یک دیکشنری با نام ابزارها به عنوان کلید هستند
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # ابزار را فراخوانی کن
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

در اینجا چه اتفاقی می‌افتد:

- نام ابزار به عنوان پارامتر ورودی `name` حاضر است که برای آرگومان‌ها در قالب دیکشنری `arguments` صحیح است.

- ابزار با `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` فراخوانی می‌شود. اعتبارسنجی آرگومان‌ها در ویژگی `handler` که به یک تابع اشاره دارد انجام می‌شود، اگر ناموفق باشد استثنا ایجاد می‌کند.

حالا ما درک کاملی از فهرست و فراخوانی ابزارها با استفاده از سرور سطح پایین داریم.

نمونه کامل را اینجا ببینید [full example](./code/README.md)

## وظیفه

کدی که به شما داده شده را با چند ابزار، منابع و پرامپت گسترش دهید و تأمل کنید که فقط باید فایل‌ها را در دایرکتوری tools اضافه کنید و در جایی دیگر نیازی به تغییر نیست.

*هیچ راه‌حلی ارائه نشده است*

## خلاصه

در این فصل دیدیم که روش سرور سطح پایین چگونه کار می‌کند و چگونه می‌تواند به ما کمک کند تا معماری خوبی ایجاد کنیم که بتوانیم روی آن بسازیم. همچنین درباره اعتبارسنجی صحبت کردیم و به شما نشان داده شد چگونه با کتابخانه‌های اعتبارسنجی کار کنید تا اسکماهایی برای اعتبارسنجی ورودی بسازید.

## قدم بعدی

- بعدی: [احراز هویت ساده](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:  
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما برای دقت تلاش می‌کنیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است حاوی خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان اصلی خود به عنوان منبع معتبر باید در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در برابر هرگونه سوء تفاهم یا تفسیر نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->