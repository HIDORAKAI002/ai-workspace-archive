# اعلی درجے کا سرور استعمال

MCP SDK میں دو مختلف اقسام کے سرورز موجود ہیں، آپ کا معمول کا سرور اور کم سطح کا سرور۔ عام طور پر، آپ خصوصیات شامل کرنے کے لیے معمول کے سرور کا استعمال کرتے ہیں۔ لیکن بعض صورتوں میں آپ کم سطح کے سرور پر انحصار کرنا چاہیں گے جیسے کہ:

- بہتر فن تعمیر۔ صاف ستھرا فن تعمیر بنانے کے لیے دونوں معمول کے سرور اور کم سطح کے سرور کا استعمال ممکن ہے لیکن بحث کی جا سکتی ہے کہ کم سطح کے سرور کے ساتھ یہ تھوڑا آسان ہوتا ہے۔
- فیچر کی دستیابی۔ کچھ جدید فیچرز صرف کم سطح کے سرور کے ساتھ ہی استعمال کیے جا سکتے ہیں۔ آپ اسے آگے والے ابواب میں دیکھیں گے جب ہم سیمپلنگ اور ایلیسیٹیشن شامل کریں گے۔

## معمول کا سرور بمقابلہ کم سطح کا سرور

یہاں ایک MCP سرور بنانے کا طریقہ معمول کے سرور کے ساتھ درج ہے

**Python**

```python
mcp = FastMCP("Demo")

# ایک اضافہ کرنے کا آلہ شامل کریں
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

// ایک جمع کرنے کا آلہ شامل کریں
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

بات یہ ہے کہ آپ واضح طور پر ہر ٹول، ریسورس یا پرامپٹ کو شامل کرتے ہیں جسے آپ سرور پر چاہتے ہیں۔ اس میں کوئی غلطی نہیں ہے۔

### کم سطح کے سرور کا طریقہ کار

تاہم، جب آپ کم سطح کے سرور کا طریقہ استعمال کرتے ہیں تو اسے مختلف طریقے سے سوچنا پڑتا ہے۔ ہر ٹول کو رجسٹر کرنے کے بجائے، آپ فیچر ٹائپ (ٹولز، ریسورسز یا پرامپٹس) کے لیے دو ہینڈلرز بناتے ہیں۔ مثلاً، ٹولز کے لیے صرف دو فنکشنز ہوتے ہیں:

- تمام ٹولز کی فہرست دینا۔ ایک فنکشن تمام کوششوں کے لیے ذمہ دار ہوگا کہ ٹولز کو لسٹ کیا جائے۔
- تمام ٹولز کو کال کرنا۔ یہاں بھی، صرف ایک فنکشن ٹول کو کال کرنے کی بات سنبھالتا ہے۔

یہ ممکنہ طور پر کم کام معلوم ہوتا ہے، ہے نا؟ تو ہر ٹول کو رجسٹر کرنے کے بجائے، مجھے صرف یہ یقینی بنانا ہے کہ جب میں تمام ٹولز لسٹ کروں تو ٹول شامل ہو اور جب کوئی درخواست آئے تو اس ٹول کو کال کیا جائے۔

آئیے دیکھتے ہیں کوڈ اب کیسا دکھائی دیتا ہے:

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
  // رجسٹرڈ ٹولز کی فہرست واپس کریں
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

یہاں اب ہمارے پاس ایک فنکشن ہے جو فیچرز کی فہرست واپس کرتا ہے۔ ٹولز فہرست میں ہر اینٹری کے پاس ایسے فیلڈز ہیں جیسے `name`، `description` اور `inputSchema` تاکہ ریٹرن ٹائپ کی پابندی ہو۔ یہ ہمیں اپنے ٹولز اور فیچر کی تعریف کہیں اور رکھنے کی سہولت دیتا ہے۔ ہم اب اپنے تمام ٹولز کو tools فولڈر میں بنا سکتے ہیں اور یہی بات آپ کے تمام فیچرز کے لیے بھی ہوتی ہے تاکہ آپ کا پروجیکٹ اچانک یوں منظم ہو جائے:

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

یہ زبردست ہے، ہمارا فن تعمیر کافی صاف ستھرا بنایا جا سکتا ہے۔

ٹولز کو کال کرنے کے بارے میں کیا خیال ہے، کیا یہی سوچ ہے، ایک ہینڈلر جو کسی بھی ٹول کو کال کرے؟ جی ہاں، بالکل، یہاں اس کا کوڈ ہے:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ایک لغت ہے جس میں ٹول کے نام چابیاں ہیں
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
    // TODO آلے کو کال کریں،

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

جیسا کہ آپ اوپر کے کوڈ سے دیکھ سکتے ہیں، ہمیں یہ پتہ لگانا ہوگا کہ کون سا ٹول کال کرنا ہے اور کس آرگیومنٹس کے ساتھ، اور پھر ہمیں ٹول کو کال کرنا ہوگا۔

## توثیق کے ساتھ طریقہ کار کو بہتر بنانا

اب تک، آپ نے دیکھا کہ تمام رجسٹریشنز — ٹولز، ریسورسز اور پرامپٹس شامل کرنے کے لیے — ان دو ہینڈلرز سے ہر فیچر ٹائپ کے لیے تبدیل ہو سکتی ہیں۔ اور کیا کرنا ہے؟ ہمیں کچھ ایسی توثیق شامل کرنی چاہیے تاکہ یہ یقینی بنایا جا سکے کہ ٹول کو صحیح آرگیومنٹس کے ساتھ کال کیا جا رہا ہے۔ ہر رن ٹائم کا اپنا حل ہے، مثال کے طور پر Python میں Pydantic اور TypeScript میں Zod استعمال ہوتا ہے۔ خیال یہ ہے کہ ہم یہ کریں:

- فیچر (ٹول، ریسورس یا پرامپٹ) بنانے کی منطق کو اس کے مخصوص فولڈر میں منتقل کریں۔
- ایسی تصدیق کا طریقہ شامل کریں کہ کوئی آنے والی درخواست صحیح طریقے سے ٹول کال کرنے کے لیے ہو۔

### فیچر بنانا

فیچر بنانے کے لیے، ہمیں اس فیچر کے لیے ایک فائل بنانی ہو گی اور یقین دہانی کرانی ہوگی کہ اس میں ضروری فیلڈز موجود ہیں جو اس فیچر کے لیے لازمی ہیں۔ کون سے فیلڈز ٹولز، ریسورسز اور پرامپٹس میں تھوڑے مختلف ہوتے ہیں۔

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
        # پائڈانٹک ماڈل استعمال کرتے ہوئے ان پٹ کی تصدیق کریں
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: پائڈانٹک شامل کریں، تاکہ ہم AddInputModel بنا سکیں اور دلائل کی تصدیق کر سکیں

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

یہاں آپ دیکھ سکتے ہیں کہ ہم درج ذیل کام کرتے ہیں:

- Pydantic `AddInputModel` استعمال کرتے ہوئے فیلڈز `a` اور `b` کے ساتھ ایک اسکیمہ بنائیں فائل *schema.py* میں۔
- آنے والی درخواست کو `AddInputModel` کی قسم میں پارس کرنے کی کوشش کریں، اگر پیرامیٹرز میں میل نہیں ہوتا تو یہ کریش کرے گا:

   ```python
   # add.py
    try:
        # ان پٹ کی تصدیق کے لیے پائیڈینٹک ماڈل استعمال کریں
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

آپ منتخب کر سکتے ہیں کہ یہ پارسنگ لوجک خود ٹول کال میں ڈالیں یا ہینڈلر فنکشن میں۔

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

       // @ts-نظرانداز
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

- تمام ٹول کالز کو ہینڈل کرنے والی ہینڈلر میں، ہم اب کوشش کرتے ہیں کہ آنے والی درخواست کو ٹول کے متعین کردہ اسکیمہ میں پارس کریں:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    اگر یہ کامیاب رہے تو ہم اصل ٹول کو کال کرنے کے عمل میں جاتے ہیں:

    ```typescript
    const result = await tool.callback(input);
    ```

جیسا کہ آپ دیکھ سکتے ہیں، یہ طریقہ ایک زبردست فن تعمیر بناتا ہے کیونکہ ہر چیز کی اپنی جگہ ہوتی ہے، *server.ts* ایک بہت چھوٹی فائل ہے جو صرف درخواست ہینڈلرز کو وائر کرتی ہے اور ہر فیچر اپنی متعلقہ فولڈر میں ہوتا ہے مثلاً tools/، resources/ یا prompts/۔

زبردست، آئیں اگلے مرحلے میں اسے بنائیں۔

## مشق: کم سطح کا سرور بنانا

اس مشق میں، ہم یہ کریں گے:

1. ایک کم سطح کا سرور بنائیں جو ٹولز کی فہرست اور ٹولز کی کال کو ہینڈل کرے۔
2. ایک ایسی فن تعمیر نافذ کریں جس پر آپ آگے تعمیر کر سکیں۔
3. توثیق شامل کریں تاکہ یہ یقینی بن سکے کہ آپ کی ٹول کالز مناسب طریقے سے توثیق شدہ ہیں۔

### -1- فن تعمیر بنانا

ہمیں سب سے پہلے ایسا فن تعمیر درکار ہے جو ہمیں زیادہ فیچرز شامل کرنے پر اسکیل کرنے میں مدد دے، یہ کچھ یوں دکھتا ہے:

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

اب ہم نے ایسا فن تعمیر سیٹ اپ کر لیا ہے جو اس بات کو یقینی بناتا ہے کہ ہم آسانی سے tools فولڈر میں نئے ٹولز شامل کر سکیں۔ آپ ریسورسز اور پرامپٹس کے لیے ذیلی ڈائریکٹریز بنانے کے لیے آزاد ہیں۔

### -2- ٹول بنانا

آئیے دیکھیے کہ ٹول بنانا کیسا لگتا ہے۔ سب سے پہلے، اسے اپنے *tool* ذیلی فولڈر میں بنانا ہوتا ہے یوں:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # پیڈانٹک ماڈل کا استعمال کرتے ہوئے ان پٹ کی تصدیق کریں
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: پیڈانٹک شامل کریں، تاکہ ہم AddInputModel بنا سکیں اور آرگس کی تصدیق کر سکیں

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

یہاں ہم دیکھتے ہیں کہ Pydantic استعمال کرتے ہوئے نام، تفصیل، اور انپٹ اسکیمہ کیسے ڈیفائن کیا جاتا ہے اور ایک ہینڈلر ہے جو اس ٹول کو کال کیے جانے پر چلایا جائے گا۔ آخر میں، ہم `tool_add` کو ایک ڈکشنری کے طور پر ظاہر کرتے ہیں جو ان تمام پراپرٹیز کو رکھتی ہے۔

اسی طرح *schema.py* بھی ہے جو ہمارے ٹول کے لیے استعمال ہونے والا انپٹ اسکیمہ ڈیفائن کرتا ہے:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

ہمیں *__init__.py* بھی بھرنا چاہیے تاکہ tools ڈائریکٹری کو ایک ماڈیول کی طرح تسلیم کیا جائے۔ مزید برآں، ہم اس میں موجود ماڈیولز کو بھی ظاہر کرتے ہیں یوں:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

ہم جیسے جیسے مزید ٹولز شامل کریں گے، اس فائل میں اضافہ کر سکتے ہیں۔

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

یہاں ہم ایک ڈکشنری بناتے ہیں جس میں پراپرٹیز شامل ہیں:

- name، یہ ٹول کا نام ہے۔
- rawSchema، یہ Zod اسکیمہ ہے جو اس ٹول کی کال کی درخواستوں کی توثیق کے لیے استعمال ہوگا۔
- inputSchema، یہ اسکیمہ ہینڈلر کے ذریعے استعمال کیا جائے گا۔
- callback، یہ ٹول کو چلانے کے لیے استعمال ہوتا ہے۔

اسی طرح `Tool` ہے جو اس ڈکشنری کو ایسے ٹائپ میں تبدیل کرتا ہے جسے MCP سرور ہینڈلر قبول کر سکے، یہ کچھ یوں دکھتا ہے:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

اور `schema.ts` ہے جہاں ہم ہر ٹول کے انپٹ اسکیمہ کو ذخیرہ کرتے ہیں، ابھی اس میں صرف ایک اسکیمہ ہے لیکن جیسے جیسے ہم ٹولز شامل کریں گے یہاں مزید اینٹریز بھی شامل ہوں گی:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

زبردست، اب آئیے اگلے مرحلے کی طرف بڑھیں اور اپنے ٹولز کی فہرست کو ہینڈل کریں۔

### -3- ٹولز کی لسٹنگ کو ہینڈل کرنا

اگلا، ٹولز کی فہرست ہینڈل کرنے کے لیے، ہمیں اس کے لیے ایک درخواست ہینڈلر سیٹ اپ کرنا ہوگا۔ یہ وہ چیز ہے جو ہم اپنے سرور فائل میں شامل کریں گے:

**Python**

```python
# کوڈ برائے اختصار حذف کر دیا گیا ہے
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

یہاں، ہم `@server.list_tools` ڈیکوریٹر اور عمل درآمد کرنے والا فنکشن `handle_list_tools` شامل کرتے ہیں۔ اس میں ہمیں ٹولز کی فہرست پیدا کرنی ہوگی۔ نوٹ کریں کہ ہر ٹول کے پاس نام، تفصیل اور انپٹ اسکیمہ ہونا ضروری ہے۔

**TypeScript**

ٹولز کی لسٹنگ کے لیے درخواست ہینڈلر سیٹ اپ کرنے کے لیے، ہمیں سرور پر `setRequestHandler` کال کرنی ہے جس میں اسکیمہ ایسا ہو جو ہم کرنا چاہتے ہیں، اس کیس میں `ListToolsRequestSchema`۔

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
// کوڈ کو مختصر کرنے کے لیے حذف کیا گیا
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // رجسٹرڈ ٹولز کی فہرست واپس کریں
  return {
    tools: tools
  };
});
```

زبردست، اب ہم نے ٹولز کی لسٹنگ کا مسئلہ حل کر لیا ہے، آگے دیکھتے ہیں کہ ہم ٹولز کو کیسے کال کر سکتے ہیں۔

### -4- ٹول کال کو ہینڈل کرنا

ٹول کال کرنے کے لیے، ہمیں ایک اور درخواست ہینڈلر سیٹ اپ کرنا ہوگا، جو اس درخواست کو سنبھالے کہ کون سا فیچر کال کرنا ہے اور کس آرگیومنٹس کے ساتھ۔

**Python**

آئیں `@server.call_tool` ڈیکوریٹر استعمال کریں اور اسے `handle_call_tool` جیسے فنکشن سے عمل کریں۔ اس فنکشن کے اندر، ہمیں ٹول کا نام، اس کا آرگیومنٹ پارس کرنا ہوگا اور یہ یقینی بنانا ہوگا کہ آرگیومنٹس متعلقہ ٹول کے لیے درست ہیں۔ آرگیومنٹس کی تصدیق ہم اس فنکشن میں بھی کر سکتے ہیں یا اصلی ٹول میں بھی۔

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ایک لغت ہے جس میں کلیدوں کے طور پر ٹول کے نام ہوتے ہیں
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # ٹول کو کال کریں
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

یہاں کیا ہوتا ہے:

- ہمارا ٹول نام انپٹ پیرامیٹر `name` کی شکل میں پہلے سے موجود ہے، اور ہمارے آرگیومنٹس `arguments` ڈکشنری کے طور پر ہیں۔

- ٹول کو `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` کے ذریعے کال کیا جاتا ہے۔ آرگیومنٹس کی تصدیق `handler` پراپرٹی میں ہوتا ہے جو ایک فنکشن کی طرف اشارہ کرتا ہے، اگر یہ ناکام ہو جائے تو استثنا (exception) اٹھائے گا۔

اب ہمارے پاس کم سطح کے سرور کا استعمال کرتے ہوئے ٹولز کی لسٹنگ اور کال کرنے کی مکمل سمجھ ہے۔

یہاں [مکمل مثال](./code/README.md) دیکھیں

## اسائنمنٹ

آپ کو دیے گئے کوڈ کو کئی ٹولز، ریسورسز اور پرامپٹس کے ساتھ بڑھائیں اور غور کریں کہ آپ کو صرف tools ڈائریکٹری میں فائلیں شامل کرنی ہوتی ہیں اور کہیں اور نہیں۔

*کوئی حل فراہم نہیں کیا گیا*

## خلاصہ

اس باب میں، ہم نے دیکھا کہ کم سطح کے سرور کا طریقہ کار کیسے کام کرتا ہے اور یہ ہمیں ایک زبردست فن تعمیر بنانے میں کس طرح مدد دیتا ہے جس پر ہم آگے بھی تعمیر کر سکتے ہیں۔ ہم نے توثیق پر بھی بات کی اور آپ کو دکھایا گیا کہ انپٹ کی توثیق کے لیے اسکیمہ بنانے کے لیے چیکنا لائبریریز کے ساتھ کام کیسے کیا جاتا ہے۔

## آگے کیا ہے

- اگلا: [سادہ تصدیق](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**چھوٹ**:
اس دستاویز کا ترجمہ AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے کیا گیا ہے۔ اگرچہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم ذہن میں رکھیں کہ خودکار ترجموں میں غلطیاں یا غیر درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنی مادری زبان میں معتبر ماخذ سمجھی جانی چاہیے۔ اہم معلومات کے لیے پیشہ ورانہ انسانی ترجمہ تجویز کیا جاتا ہے۔ اس ترجمہ کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->