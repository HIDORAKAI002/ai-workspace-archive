# جدید سرور کا استعمال

MCP SDK میں دو مختلف قسم کے سرورز دستیاب ہیں، آپ کا عام سرور اور کم سطح کا سرور۔ عام طور پر، آپ عام سرور کو فیچرز شامل کرنے کے لیے استعمال کریں گے۔ تاہم بعض معاملات میں، آپ کم سطح کے سرور پر انحصار کرنا چاہتے ہیں جیسے:

- بہتر فن تعمیر۔ دونوں عام سرور اور کم سطح کے سرور کے ساتھ صاف ستھری فن تعمیر بنائی جا سکتی ہے، لیکن یہ کہا جا سکتا ہے کہ کم سطح کے سرور کے ساتھ یہ تھوڑا آسان ہے۔
- فیچر کی دستیابی۔ کچھ جدید فیچرز صرف کم سطح کے سرور کے ساتھ استعمال کیے جا سکتے ہیں۔ آپ بعد کے ابواب میں دیکھیں گے جیسے سیمپلنگ (جو `2026-07-28` ریلیز کینڈیڈیٹ میں ختم کی جا چکی ہے) اور ایلیسیٹیشن۔

## عام سرور بمقابلہ کم سطح کا سرور

یہ ہے کہ ایک MCP سرور عام سرور کے ساتھ کیسا نظر آتا ہے

**Python**

```python
mcp = FastMCP("Demo")

# ایک جمع کرنے کا آلہ شامل کریں
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

// اضافی آلہ شامل کریں
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

نکتہ یہ ہے کہ آپ واضح طور پر ہر ٹول، ریسورس یا پرامٹ کو شامل کرتے ہیں جو آپ چاہتے ہیں کہ سرور میں ہو۔ اس میں کوئی نقص نہیں ہے۔  

### کم سطح کے سرور کا طریقہ

تاہم، جب آپ کم سطح کے سرور کا طریقہ استعمال کرتے ہیں تو آپ کو اسے مختلف انداز میں سوچنا ہوتا ہے۔ ہر ٹول کو رجسٹر کرنے کے بجائے آپ فیچر ٹائپ (ٹولز، ریسورسز یا پرامٹس) کے لیے دو ہینڈلرز تخلیق کرتے ہیں۔ مثال کے طور پر ٹولز کے لیے صرف دو فنکشن ہوتے ہیں:

- تمام ٹولز کی فہرست بنانا۔ ایک فنکشن تمام کوششوں کے لیے ذمہ دار ہوگا کہ ٹولز کی فہرست نکالی جائے۔
- تمام ٹول کالز کو سنبھالنا۔ یہاں بھی ایک ہی فنکشن ہے جو ٹول کو کال کرنے کے لیے سنبھالتا ہے۔

یہ شاید کم کام لگتا ہے، ہے نا؟ تو ٹول رجسٹر کرنے کے بجائے، مجھے بس یہ یقینی بنانا ہے کہ جب میں تمام ٹولز کی فہرست نکالوں تو وہ لسٹ میں شامل ہو اور جب ٹول کال کرنے کی درخواست آئے تو اسے کال کیا جائے۔

آئیے دیکھیں اب کوڈ کیسا دکھتا ہے:

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
  // رجسٹرڈ آلات کی فہرست واپس کریں
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

یہاں ہمارے پاس ایک فنکشن ہے جو فیچرز کی فہرست واپس کرتا ہے۔ ہر ٹول کی فہرست میں اب `name`, `description` اور `inputSchema` جیسے فیلڈز ہوتے ہیں تاکہ ریٹرن ٹائپ پر پورا اترے۔ اس سے ہمیں ہمارے ٹولز اور فیچر کی تعریف کہیں اور رکھنے کی سہولت ملتی ہے۔ ہم اب اپنے تمام ٹولز کو tools فولڈر میں بنا سکتے ہیں اور اسی طرح تمام فیچرز بھی، تاکہ آپ کا پروجیکٹ اچانک اس طرح منظم ہو جائے:

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

یہ بہت اچھا ہے، ہماری فن تعمیر کافی صاف ستھری بن سکتی ہے۔

ٹولز کال کرنے کی بات ہے، کیا یہ وہی خیال ہے، ایک ہینڈلر جو کسی بھی ٹول کو کال کرے؟ ہاں، بالکل، یہاں اس کا کوڈ ہے:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ایک لغت ہے جس میں آلے کے نام چابیاں ہیں
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
    
    // دلائل: request.params.arguments
    // کرنے کے لیے کال کریں،

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

اوپر کے کوڈ سے آپ دیکھ سکتے ہیں کہ ہمیں کال کرنے والے ٹول اور اس کے آرگیومنٹس کو پارس کرنا پڑتا ہے، اور پھر ٹول کو کال کرنا ہوتا ہے۔

## طریقہ کو بہتر بنانا ویلیڈیشن کے ساتھ

اب تک، آپ نے دیکھا کہ آپ کی تمام رجسٹریشنز جن میں ٹولز، ریسورسز اور پرامٹس شامل ہیں، انہیں فیچر ٹائپ کے لیے ان دو ہینڈلرز سے بدل دیا جا سکتا ہے۔ اور کیا کرنا چاہیے؟ ہمیں کچھ ویلیڈیشن شامل کرنی چاہیے تاکہ یقین ہو کہ ٹول صحیح آرگیومنٹس کے ساتھ کال ہو رہا ہے۔ ہر رن ٹائم کے پاس اس کا اپنا حل ہے، مثال کے طور پر Python میں Pydantic اور TypeScript میں Zod استعمال ہوتی ہے۔ خیال یہ ہے کہ ہم درج ذیل کریں:

- فیچر بنانے کی منطق کو اس کے متعلقہ فولڈر میں منتقل کریں۔
- ایک طریقہ شامل کریں تاکہ آنے والی درخواست کی ویلیڈیشن کی جا سکے، جیسے ٹول کال کی درخواست۔

### فیچر بنائیں

فیچر بنانے کے لیے، ہمیں اُس فیچر کے لیے ایک فائل بنانی ہوگی اور یقینی بنانا ہوگا کہ اس میں اس فیچر کے لیے ضروری فیلڈز موجود ہوں۔ جو فیلڈز ٹولز، ریسورسز اور پرامٹس کے درمیان مختلف ہوتی ہیں۔

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
        # Pydantic ماڈل استعمال کرتے ہوئے ان پٹ کی توثیق کریں
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic شامل کریں، تاکہ ہم AddInputModel بنا سکیں اور آرگس کی توثیق کر سکیں

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

یہاں آپ دیکھ سکتے ہیں کہ ہم درج ذیل کرتے ہیں:

- Pydantic `AddInputModel` کا اسکیمہ بنائیں جس میں فیلڈز `a` اور `b` شامل ہوں، فائل *schema.py* میں۔
- آنے والی درخواست کو `AddInputModel` ٹائپ میں پارس کرنے کی کوشش کریں، اگر پیرامیٹرز میں فرق ہو تو یہ کریش کر جائے گا:

   ```python
   # add.py
    try:
        # ان پُٹ کی تصدیق کے لیے Pydantic ماڈل استعمال کریں
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

آپ منتخب کر سکتے ہیں کہ یہ پارسنگ منطق ٹول کال میں رکھنی ہے یا ہینڈلر فنکشن میں۔

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

// اسکیمہ.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// شامل کریں.ts
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

- تمام ٹول کالز کو سنبھالنے والے ہینڈلر میں، ہم اب آنے والی درخواست کو ٹول کے ڈیفائن کردہ اسکیمہ میں پارس کرنے کی کوشش کرتے ہیں:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    اگر یہ کامیاب ہوتا ہے تو پھر ہم اصلی ٹول کو کال کرتے ہیں:

    ```typescript
    const result = await tool.callback(input);
    ```

جیسا کہ آپ دیکھ سکتے ہیں، یہ طریقہ ایک بہترین فن تعمیر پیدا کرتا ہے کیونکہ ہر چیز کی اپنی جگہ ہے، *server.ts* ایک بہت چھوٹا فائل ہے جو صرف درخواست ہینڈلرز کو جوڑتا ہے اور ہر فیچر اپنے متعلقہ فولڈر میں ہوتا ہے، مثلاً tools/, resources/ یا /prompts۔

بہترین، آئیے اگلا حصہ بنائیں۔

## مشق: ایک کم سطح کا سرور بنانا

اس مشق میں، ہم درج ذیل کریں گے:

1. ایک کم سطح کا سرور بنائیں جو ٹولز کی فہرست اور ٹولز کی کال کو سنبھالے۔
1. ایک ایسی فن تعمیر نافذ کریں جس پر آپ مزید تعمیر کر سکیں۔
1. ویلیڈیشن شامل کریں تاکہ آپ کی ٹول کالز مناسب طریقے سے ویلیڈیٹ ہوں۔

### -1- ایک فن تعمیر بنائیں

سب سے پہلی چیز جس پر توجہ دینی ہے وہ ایک ایسی فن تعمیر ہے جو ہم جب مزید فیچرز شامل کریں تو ہمیں اسکیل میں مدد دے، یہاں یہ دکھایا گیا ہے:

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

اب ہم نے ایسی فن تعمیر قائم کر لی ہے جو آسانی سے ٹولز فولڈر میں نئے ٹولز شامل کرنے کی ضمانت دیتی ہے۔ آپ ریسورسز اور پرامٹس کے لیے سب ڈائریکٹریز شامل کرنے کے لیے اس کی پیروی کر سکتے ہیں۔

### -2- ایک ٹول بنانا

اگلا دیکھتے ہیں کہ ٹول بنانا کیسے ہوتا ہے۔ سب سے پہلے، اسے اس کے *tool* سب ڈائریکٹری میں بنانا ہوگا، کچھ اس طرح:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # ان پٹ کی درستگی پائیڈینٹک ماڈل کا استعمال کرتے ہوئے کریں
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: پائیڈینٹک شامل کریں، تاکہ ہم AddInputModel بنا سکیں اور دلائل کی توثیق کر سکیں

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

یہاں ہم دیکھ سکتے ہیں کہ ہم نام، تفصیل، اور انپٹ اسکیمہ Pydantic کے ذریعے کیسے ڈیفائن کرتے ہیں اور ایک ہینڈلر جو اس ٹول کو کال ہونے پر چلے گا۔ آخر میں، ہم `tool_add` کو ظاہر کرتے ہیں جو تمام پراپرٹیز کا لغت (ڈکشنری) ہے۔

یہاں *schema.py* بھی ہے جو ہمارے ٹول کے انپٹ اسکیمہ کو ڈیفائن کرنے کے لیے استعمال ہوتا ہے:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

ہمیں *__init__.py* میں مواد بھرنا ہوتا ہے تاکہ tools ڈائریکٹری کو ماڈیول سمجھا جائے۔ اضافی طور پر، ہمیں اس کے اندر موجود ماڈیولز کو ظاہر کرنا ہوتا ہے جیسا کہ:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

جب ہم مزید ٹولز شامل کریں گے تو ہم اس فائل میں مزید مواد شامل کر سکتے ہیں۔

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

یہاں ہم خصوصیات پر مشتمل لغت بناتے ہیں:

- name، یہ ٹول کا نام ہے۔
- rawSchema، یہ Zod اسکیمہ ہے جو اس ٹول کو کال کرنے والی درخواستوں کی ویلیڈیشن کے لیے استعمال ہوگی۔
- inputSchema، یہ اسکیمہ ہینڈلر کے لیے استعمال ہوگا۔
- callback، یہ ٹول کو بلا کرانے کے لیے استعمال ہوتا ہے۔

یہاں `Tool` بھی ہے جو اس لغت کو mcp سرور ہینڈلر کے قابل قبول ٹائپ میں تبدیل کرتا ہے اور یہ کچھ یوں دکھائی دیتا ہے:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

اور *schema.ts* ہے جہاں ہم ہر ٹول کے انپٹ اسکیمہ رکھ رہے ہیں، فی الحال صرف ایک اسکیمہ ہے لیکن جب ہم مزید ٹولز شامل کریں گے تو مزید اندراجات شامل کر سکتے ہیں:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

بہترین، اب آئیں ہمارے ٹولز کی فہرست کے انتظام پر کام کریں۔

### -3- ٹول لسٹنگ کا انتظام کریں

ہمارے ٹولز کی فہرست کو سنبھالنے کے لیے، ہمیں اس کے لیے ایک درخواست ہینڈلر بنانا ہوگا۔ اس کے لیے ہمیں اپنے سرور کی فائل میں یہ شامل کرنا ہوگا:

**Python**

```python
# کوڈ لمبائی کم کرنے کے لیے حذف کر دیا گیا ہے
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

یہاں، ہم `@server.list_tools` ڈیکوریٹر شامل کرتے ہیں اور `handle_list_tools` فنکشن نافذ کرتے ہیں۔ اس میں، ہمیں ٹولز کی فہرست تیار کرنی ہوتی ہے۔ دھیان دیں کہ ہر ٹول کا نام، تفصیل اور انپٹ اسکیمہ ہونا ضروری ہے۔   

**TypeScript**

ٹولز کی فہرست کے لیے درخواست ہینڈلر قائم کرنے کے لیے، ہمیں سرور پر `setRequestHandler` کال کرنا ہوتا ہے جو اس اسکیمہ کے مطابق ہو جو ہم کرنا چاہتے ہیں، اس معاملے میں `ListToolsRequestSchema`۔ 

```typescript
// انڈیکس.ts
import addTool from "./add.js";
import subtractTool from "./subtract.js";
import {server} from "../server.js";
import { Tool } from "./tool.js";

export let tools: Array<Tool> = [];
tools.push(addTool);
tools.push(subtractTool);

// سرور.ts
// کوڈ کو مختصر کرنے کے لیے حذف کر دیا گیا
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // رجسٹرڈ ٹولز کی فہرست واپس کریں
  return {
    tools: tools
  };
});
```

بہترین، اب ہم نے ٹولز کی فہرست کا مسئلہ حل کر لیا، آئیے دیکھیں کہ ہم ٹولز کو کال کیسے کر سکتے ہیں۔

### -4- ٹول کال کا انتظام کریں

ٹول کو کال کرنے کے لیے، ہمیں ایک اور درخواست ہینڈلر سیٹ کرنا ہوگا، جو اس بار اس بات پر مرکوز ہو کہ کون سا فیچر کال کرنا ہے اور کس آرگیومنٹس کے ساتھ۔

**Python**

ہم `@server.call_tool` ڈیکوریٹر استعمال کریں گے اور اسے `handle_call_tool` جیسے فنکشن سے نافذ کریں گے۔ اس فنکشن میں، ہمیں ٹول کا نام، اس کے آرگیومنٹس پارس کرنے ہوں گے اور یقینی بنانا ہوگا کہ آرگیومنٹس اس ٹول کے لیے درست ہیں۔ ہم ان آرگیومنٹس کی ویلیڈیشن اس فنکشن میں کر سکتے ہیں یا اصلی ٹول میں۔

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ایک لغت ہے جس کی چابیاں آلے کے نام ہیں
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # آلے کو چلائیں
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

یہاں کیا ہوتا ہے:

- ہمارا ٹول نام پہلے سے انپٹ پیرامیٹر `name` کے طور پر موجود ہے جو ہمارے آرگیومنٹس کے لئے `arguments` ڈکشنری کی شکل میں ہے۔

- ٹول کو کال کیا جاتا ہے `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` کے ساتھ۔ آرگیومنٹس کی ویلیڈیشن `handler` پراپرٹی میں ہوتی ہے جو ایک فنکشن کی طرف اشارہ کرتی ہے، اگر یہ ناکام ہو جائے تو ایک استثناء پھینک دے گا۔ 

اب، ہمارے پاس کم سطح کے سرور کے ذریعے ٹولز کی فہرست اور کال کا مکمل فہم ہے۔

مکمل مثال دیکھیں [یہاں](./code/README.md)

## اسائنمنٹ

آپ کو دیا گیا کوڈ مختلف ٹولز، ریسورسز اور پرامٹس کے ساتھ بڑھائیں اور غور کریں کہ آپ کو صرف tools ڈائریکٹری میں فائلیں شامل کرنا پڑتی ہے اور کہیں اور نہیں۔

*کوئی حل نہیں دیا گیا*

## خلاصہ

اس باب میں، ہم نے دیکھا کہ کم سطح کے سرور کا طریقہ کار کیسے کام کرتا ہے اور کیسے یہ ایک اچھی فن تعمیر بنانے میں مدد دیتا ہے جس پر ہم مزید تعمیر کر سکتے ہیں۔ ہم نے ویلیڈیشن پر بھی بات کی اور آپ کو دکھایا گیا کہ ویلیڈیشن لائبریریز کے ساتھ ان پٹ ویلیڈیشن کے لیے اسکیمے کیسے بنائے جاتے ہیں۔

## آگے کیا ہے

- اگلا: [سادہ توثیق](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->