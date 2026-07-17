# استفاده پیشرفته از سرور

دو نوع مختلف از سرورها در MCP SDK ارائه شده است، سرور معمولی شما و سرور سطح پایین. معمولاً شما از سرور معمولی برای افزودن ویژگی‌ها استفاده می‌کنید. اما در برخی موارد، می‌خواهید به سرور سطح پایین تکیه کنید مانند:

- معماری بهتر. امکان ایجاد معماری تمیز با هر دو سرور معمولی و سرور سطح پایین وجود دارد، اما می‌توان گفت کمی کار با سرور سطح پایین آسان‌تر است.
- در دسترس بودن ویژگی. برخی ویژگی‌های پیشرفته فقط با سرور سطح پایین قابل استفاده‌اند. این را در فصل‌های بعدی خواهید دید که نمونه‌گیری (که در نسخه آزمایشی `2026-07-28` منسوخ شده) و استخراج افزوده می‌شوند.

## سرور معمولی در مقابل سرور سطح پایین

ساخت سرور MCP با سرور معمولی به این صورت است:

**پایتون**

```python
mcp = FastMCP("Demo")

# افزودن ابزار جمع کردن
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b
```

**تایپ‌اسکریپت**

```typescript
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});

// افزودن یک ابزار جمع
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

نکته این است که هر ابزار، منبع یا prompt که می‌خواهید سرور داشته باشد را به‌صراحت اضافه می‌کنید. مشکلی در این نیست.  

### رویکرد سرور سطح پایین

با این حال، وقتی رویکرد سرور سطح پایین را استفاده می‌کنید باید به شکل متفاوتی به آن فکر کنید. به جای ثبت هر ابزار، در عوض دو هندلر برای هر نوع ویژگی (ابزارها، منابع یا prompt ها) ایجاد می‌کنید. بنابراین به‌طور مثال ابزارها فقط دو تابع دارند به این شکل:

- فهرست کردن تمام ابزارها. یک تابع مسئول همه تلاش‌ها برای فهرست ابزارها است.
- هندلر فراخوانی تمام ابزارها. اینجا نیز، فقط یک تابع مسئول فراخوانی به ابزار است.

این به نظر کمتر کار می‌رسد، درست است؟ بنابراین به جای ثبت یک ابزار، فقط باید مطمئن شوم وقتی همه ابزارها را فهرست می‌کنم، ابزار وجود داشته باشد و هنگامی که درخواستی برای فراخوانی ابزار می‌آید، آن فراخوانده شود.

بیایید ببینیم کد الان چگونه به نظر می‌رسد:

**پایتون**

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

**تایپ‌اسکریپت**

```typescript
server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // بازگرداندن فهرست ابزارهای ثبت‌شده
  return {
    tools: [{
        name: "add",
        description: "Add two numbers",
        inputSchema: {
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

اکنون تابعی داریم که لیستی از ویژگی‌ها را بازمی‌گرداند. هر ورودی در لیست ابزارها اکنون شامل فیلدهایی مثل `name`، `description` و `inputSchema` است تا با نوع بازگردانده شده مطابقت داشته باشد. این امکان را به ما می‌دهد که تعریف ابزارها و ویژگی‌ها را در جای دیگری قرار دهیم. اکنون می‌توانیم همه ابزارها را در پوشه tools و همین‌طور همه ویژگی‌های شما به این شکل سازماندهی کنیم:

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

درباره فراخوانی ابزارها چه؟ آیا همان ایده است، یک هندلر برای فراخوانی هر ابزاری؟ بله، دقیقاً، این کد آن است:

**پایتون**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools یک دیکشنری است که نام‌های ابزار به عنوان کلید در آن قرار دارند
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

**تایپ‌اسکریپت**

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
    
    // آرگومنت‌ها: request.params.arguments
    // کار برای انجام: تماس با ابزار،

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

همانطور که از کد بالا می‌بینید، باید ابزار را که باید فراخوانی شود استخراج کنیم، و با چه آرگومان‌هایی، و سپس به فراخوانی ابزار ادامه دهیم.

## بهبود رویکرد با اعتبارسنجی

تا اینجا دیده‌اید که چگونه همه ثبت‌های شما برای افزودن ابزارها، منابع و prompt ها می‌تواند با این دو هندلر برای هر نوع ویژگی جایگزین شود. حالا چه کار دیگری باید کنیم؟ خوب، باید نوعی اعتبارسنجی اضافه کنیم تا اطمینان یابیم که ابزار با آرگومان‌های درست فراخوانی می‌شود. هر زمان اجرا راه‌حل مخصوص خودش را برای این دارد، مثلاً پایتون از پایدانتیک و تایپ‌اسکریپت از Zod استفاده می‌کند. ایده این است که موارد زیر را انجام دهیم:

- منطق ایجاد یک ویژگی (ابزار، منبع یا prompt) را به پوشه اختصاصی آن منتقل کنیم.
- روش اعتبارسنجی درخواست ورودی برای مثال درخواست فراخوانی یک ابزار را اضافه کنیم.

### ایجاد یک ویژگی

برای ایجاد یک ویژگی، باید فایلی برای آن ویژگی بسازیم و مطمئن شویم که فیلدهای اجباری مورد نیاز آن ویژگی را دارد. اینکه کدام فیلدها مورد نیازند بین ابزارها، منابع و prompt ها کمی متفاوت است.

**پایتون**

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
        # اعتبارسنجی ورودی با استفاده از مدل Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # کار باقی‌مانده: افزودن Pydantic، تا بتوانیم یک AddInputModel ایجاد کرده و آرگومان‌ها را اعتبارسنجی کنیم

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

اینجا می‌بینید که چگونه انجام می‌دهیم:

- با استفاده از پایدانتیک کلاسی به نام `AddInputModel` با فیلدهای `a` و `b` در فایل *schema.py* ایجاد کنید.
- تلاش می‌کنیم درخواست ورودی را به نوع `AddInputModel` تبدیل کنیم، اگر پارامترها مطابق نباشند این باعث خطا خواهد شد:

   ```python
   # add.py
    try:
        # اعتبارسنجی ورودی با استفاده از مدل Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

می‌توانید انتخاب کنید که این منطق پارس کردن را در خود فراخوانی ابزار یا در تابع هندلر قرار دهید.

**تایپ‌اسکریپت**

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

// شِما.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// اضافه کن.ts
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

- در هندلری که همه فراخوانی‌های ابزار را مدیریت می‌کند، اکنون تلاش می‌کنیم درخواست ورودی را به اسکیمای تعریف شده برای ابزار تبدیل کنیم:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    اگر این موفق بود، سپس به فراخوانی ابزار واقعی می‌پردازیم:

    ```typescript
    const result = await tool.callback(input);
    ```

همانطور که می‌بینید، این رویکرد معماری بسیار خوبی ایجاد می‌کند چون هر چیزی جای خودش را دارد، *server.ts* فایلی بسیار کوچک است که فقط هندلرهای درخواست را وصل می‌کند و هر ویژگی در پوشه مربوط خود یعنی tools/، resources/ یا prompts/ قرار دارد.

عالی است، بیایید این را بعدی بسازیم.

## تمرین: ساختن یک سرور سطح پایین

در این تمرین، ما موارد زیر را انجام خواهیم داد:

1. ساخت یک سرور سطح پایین که فهرست ابزارها و فراخوانی ابزارها را مدیریت کند.
1. پیاده‌سازی معماری که بتوانید روی آن بسازید.
1. افزودن اعتبارسنجی برای اطمینان از اینکه فراخوانی‌های ابزار به درستی اعتبارسنجی شده‌اند.

### -1- ایجاد معماری

اولین چیزی که باید حل کنیم معماری‌ای است که به ما کمک می‌کند وقتی ویژگی‌های بیشتری اضافه می‌کنیم مقیاس‌پذیر باشد، اینچنین به نظر می‌رسد:

**پایتون**

```text
server.py
--| tools
----| __init__.py
----| add.py
----| schema.py
client.py
```

**تایپ‌اسکریپت**

```text
server.ts
--| tools
----| add.ts
----| schema.ts
client.ts
```

اکنون معماری‌ای را تنظیم کرده‌ایم که تضمین می‌کند می‌توانیم به راحتی ابزارهای جدید را در پوشه tools اضافه کنیم. می‌توانید برای منابع و prompt ها نیز زیرپوشه‌هایی اضافه کنید.

### -2- ایجاد یک ابزار

بیایید ببینیم ایجاد یک ابزار چگونه است. اول باید در زیردایرکتوری *tool* آن ایجاد شود به این صورت:

**پایتون**

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

اینجا می‌بینیم که چگونه نام، توضیح و اسکیمای ورودی را با پایدانتیک تعریف می‌کنیم و هندلری که هنگام فراخوانی این ابزار اجرا می‌شود را داریم. در نهایت، `tool_add` را ارائه می‌دهیم که دیکشنری شامل همه این ویژگی‌ها است.

همچنین فایلی به نام *schema.py* وجود دارد که برای تعریف اسکیمای ورودی ابزار استفاده می‌شود:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

همچنین باید *__init__.py* را پر کنیم تا پوشه tools به عنوان یک ماژول در نظر گرفته شود. همچنین باید ماژول‌های موجود در آن را اینگونه منتشر کنیم:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

هرچه ابزار بیشتری اضافه کنیم، می‌توانیم به این فایل اضافه کنیم.

**تایپ‌اسکریپت**

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

در اینجا دیکشنری شامل خصوصیات زیر ایجاد می‌کنیم:

- name، این نام ابزار است.
- rawSchema، این اسکیمای Zod است که برای اعتبارسنجی درخواست‌های ورودی به کار می‌رود.
- inputSchema، این اسکیمای مورد استفاده هندلر است.
- callback، این برای اجرا کردن ابزار به کار می‌رود.

همچنین `Tool` وجود دارد که این دیکشنری را به نوعی تبدیل می‌کند که هندلر سرور MCP آن را قبول کند و به این صورت است:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

همچنین فایل *schema.ts* جایی است که اسکیمای ورودی برای هر ابزار را نگهداری می‌کنیم و فعلاً فقط یک اسکیمای واحد دارد، اما هرچه ابزار اضافه کنیم می‌توانیم ورودی‌های بیشتری به آن اضافه کنیم:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

عالی، بیایید به سراغ مدیریت فهرست ابزارها برویم.

### -3- مدیریت فهرست ابزارها

بعد، برای مدیریت فهرست ابزارها باید یک هندلر درخواست برای این منظور تنظیم کنیم. موارد زیر را به فایل سرور اضافه می‌کنیم:

**پایتون**

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

اینجا، دکوراتور `@server.list_tools` و تابع پیاده‌سازی `handle_list_tools` را اضافه می‌کنیم. در این تابع باید لیستی از ابزارها تولید کنیم. توجه کنید هر ابزار باید نام، توضیح و inputSchema داشته باشد.   

**تایپ‌اسکریپت**

برای تنظیم هندلر درخواست برای فهرست ابزارها باید `setRequestHandler` را روی سرور با اسکیمایی متناسب با کاری که قصد انجامش را داریم فراخوانی کنیم، در اینجا `ListToolsRequestSchema`.

```typescript
// ایندکس.ts
import addTool from "./add.js";
import subtractTool from "./subtract.js";
import {server} from "../server.js";
import { Tool } from "./tool.js";

export let tools: Array<Tool> = [];
tools.push(addTool);
tools.push(subtractTool);

// سرور.ts
// کد برای اختصار حذف شده است
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // بازگرداندن لیست ابزارهای ثبت شده
  return {
    tools: tools
  };
});
```

عالی، حالا کار فهرست ابزارها حل شده، بیایید ببینیم چگونه می‌توانیم ابزارها را فراخوانی کنیم.

### -4- مدیریت فراخوانی یک ابزار

برای فراخوانی یک ابزار باید هندلر درخواست دیگری تنظیم کنیم، این بار روی درخواستی متمرکز که مشخص کند کدام ویژگی فراخوانی شود و با چه آرگومان‌هایی.

**پایتون**

از دکوراتور `@server.call_tool` استفاده کرده و با تابعی مانند `handle_call_tool` آن را پیاده‌سازی می‌کنیم. درون آن باید نام ابزار، آرگومان‌های آن را استخراج کرده و اطمینان حاصل کنیم که آرگومان‌ها برای آن ابزار معتبر هستند. می‌توانیم اعتبارسنجی را در این تابع یا در انتها در خود ابزار انجام دهیم.

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
        # فراخوانی ابزار
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

روند کار به شرح زیر است:

- نام ابزار قبلاً به عنوان پارامتر ورودی `name` وجود دارد که برای آرگومان‌های ما به شکل دیکشنری `arguments` درست است.

- ابزار با `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` فراخوانی می‌شود. اعتبارسنجی آرگومان‌ها در خصیصه `handler` که به تابعی اشاره دارد انجام می‌شود، اگر ناموفق باشد استثنا ایجاد می‌کند.

به این ترتیب، اکنون کاملاً نحوه فهرست و فراخوانی ابزارها با استفاده از سرور سطح پایین را فهمیده‌ایم.

نمونه کامل را در [اینجا](./code/README.md) ببینید

## تمرین

کد ارائه شده را با تعداد ابزار، منبع و prompt افزایش دهید و به این موضوع فکر کنید که چطور فقط نیاز است فایل‌ها را در پوشه tools اضافه کنید و جای دیگری نیازی به تغییر نیست.

*هیچ راه حلی ارائه نشده است*

## خلاصه

در این فصل، دیدیم که رویکرد سرور سطح پایین چگونه کار می‌کند و چگونه می‌تواند به ما کمک کند معماری خوبی بسازیم که بتوان روی آن ساخت. همچنین درباره اعتبارسنجی صحبت کردیم و نشان داده شد چگونه با کتابخانه‌های اعتبارسنجی کار کنیم تا اسکیمایی برای اعتبارسنجی ورودی بسازیم.

## گام بعدی

- بعدی: [احراز هویت ساده](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->