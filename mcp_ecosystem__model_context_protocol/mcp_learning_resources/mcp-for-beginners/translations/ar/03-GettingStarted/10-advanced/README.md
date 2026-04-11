# الاستخدام المتقدم للخادم

هناك نوعان مختلفان من الخوادم المعروضة في MCP SDK، خادمك العادي وخادم منخفض المستوى. عادةً، ستستخدم الخادم العادي لإضافة الميزات إليه. في بعض الحالات مع ذلك، قد ترغب في الاعتماد على الخادم منخفض المستوى مثل:

- هندسة أفضل. من الممكن إنشاء هندسة نظيفة باستخدام كل من الخادم العادي وخادم منخفض المستوى ولكن يمكن القول إنه من الأسهل قليلاً مع خادم منخفض المستوى.
- توفر الميزات. بعض الميزات المتقدمة يمكن استخدامها فقط مع خادم منخفض المستوى. سترى ذلك في الفصول القادمة حيث نضيف المعاينة والاستدعاء.

## الخادم العادي مقابل الخادم منخفض المستوى

هكذا يبدو إنشاء خادم MCP باستخدام الخادم العادي

**Python**

```python
mcp = FastMCP("Demo")

# أضف أداة جمع
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

// أضف أداة جمع
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

النقطة هي أنك تضيف صراحةً كل أداة، مورد أو موجه تريد أن يحتوي عليه الخادم. لا توجد مشكلة في ذلك.

### نهج الخادم منخفض المستوى

ولكن، عند استخدام نهج الخادم منخفض المستوى يجب أن تفكر فيه بطريقة مختلفة. بدلاً من تسجيل كل أداة، تنشئ بدلاً من ذلك معالجين لكل نوع من الميزات (أدوات، موارد أو موجهات). لذلك على سبيل المثال الأدوات لها وظيفتان فقط مثل:

- سرد كل الأدوات. وظيفة واحدة ستكون مسؤولة عن كل المحاولات لسرد الأدوات.
- التعامل مع استدعاء كل الأدوات. هنا أيضًا، هناك وظيفة واحدة فقط تتعامل مع استدعاء أداة

يبدو هذا كعمل أقل محتمل، أليس كذلك؟ لذا بدلاً من تسجيل أداة، تحتاج فقط إلى التأكد من أن الأداة مدرجة عندما أسرد كل الأدوات وأنه يتم استدعاؤها عند وجود طلب وارد لاستدعاء أداة.

لنتفقد كيف يبدو الكود الآن:

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
  // إعادة قائمة الأدوات المسجلة
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

هنا لدينا الآن وظيفة تُرجع قائمة بالميزات. كل إدخال في قائمة الأدوات يحتوي الآن على حقول مثل `name` و `description` و`inputSchema` للالتزام بنوع الإرجاع. هذا يمكننا من وضع أدواتنا وتعريف الميزة في مكان آخر. يمكننا الآن إنشاء كل أدواتنا في مجلد أدوات ويحدث نفس الشيء لكل الميزات الخاصة بك بحيث يمكن لمشروعك أن يُنظم فجأة كما يلي:

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

هذا رائع، يمكننا جعل هندستنا تبدو نظيفة جدًا.

ماذا عن استدعاء الأدوات، هل هي نفس الفكرة إذًا، معالج واحد لاستدعاء أداة، أي أداة؟ نعم، بالضبط، إليك الكود لذلك:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # الأدوات هي قاموس يحتوي على أسماء الأدوات كمفاتيح
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
    
    // الوسائط: request.params.arguments
    // للقيام باستدعاء الأداة،

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

كما ترى من الكود أعلاه، نحتاج إلى تحليل الأداة للاستدعاء، وبأي وسائط، ثم نحتاج للمتابعة لاستدعاء الأداة.

## تحسين النهج مع التحقق من الصحة

حتى الآن، رأيت كيف يمكن استبدال كل تسجيلاتك لإضافة أدوات وموارد وموجهات بهذه المعالجات الاثنين لكل نوع ميزة. ماذا نحتاج أيضًا للقيام به؟ حسنًا، يجب أن نضيف نوعًا من التحقق من الصحة لضمان استدعاء الأداة بالوسائط الصحيحة. لكل بيئة تشغيل حل خاص بها لهذا، على سبيل المثال، تستخدم Python Pydantic وTypeScript تستخدم Zod. الفكرة هي أننا نفعل التالي:

- ننقل المنطق الخاص بإنشاء ميزة (أداة، مورد أو موجه) إلى مجلدها المخصص.
- نضيف طريقة للتحقق من صحة الطلب الوارد الذي يطلب على سبيل المثال استدعاء أداة.

### إنشاء ميزة

لإنشاء ميزة، سنحتاج إلى إنشاء ملف لتلك الميزة والتأكد من أنه يحتوي على الحقول الإلزامية المطلوبة لتلك الميزة. وتختلف الحقول قليلاً بين الأدوات والموارد والموجهات.

**Python**

```python
# سكيمة.py
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float

# أضف.py

from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # التحقق من صحة الإدخال باستخدام نموذج Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # مهمة: أضف Pydantic، حتى نتمكن من إنشاء AddInputModel والتحقق من صحة الوسائط

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

هنا ترى كيف نفعل الآتي:

- إنشاء مخطط باستخدام Pydantic `AddInputModel` بالحقول `a` و`b` في ملف *schema.py*.
- محاولة تحليل الطلب الوارد ليكون من نوع `AddInputModel`، إذا كان هناك عدم تطابق في المعلمات ستحدث مشكلة:

   ```python
   # add.py
    try:
        # التحقق من صحة الإدخال باستخدام نموذج Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

يمكنك اختيار وضع هذا المنطق التحليلي في استدعاء الأداة نفسه أو في دالة المعالج.

**TypeScript**

```typescript
// سيرفر.ts
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

// مخطط.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// إضافة.ts
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

- في المعالج الذي يتعامل مع كل استدعاءات الأدوات، نحاول الآن تحليل الطلب الوارد إلى المخطط المحدد للأداة:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    إذا نجح ذلك نتابع لاستدعاء الأداة الفعلية:

    ```typescript
    const result = await tool.callback(input);
    ```

كما ترى، هذا النهج يخلق هندسة رائعة لأن لكل شيء مكانه، *server.ts* هو ملف صغير جدًا يربط فقط معالجات الطلب وكل ميزة في مجلدها الخاص أي tools/، resources/ أو /prompts.

رائع، لنحاول بناء هذا الآن.

## تمرين: إنشاء خادم منخفض المستوى

في هذا التمرين، سنفعل التالي:

1. إنشاء خادم منخفض المستوى يتعامل مع سرد الأدوات واستدعاء الأدوات.
1. تنفيذ هندسة يمكنك البناء عليها.
1. إضافة تحقق من الصحة لضمان صحة استدعاءات الأدوات الخاصة بك.

### -1- إنشاء هندسة

أول شيء نحتاج إلى معالجته هو هندسة تساعدنا على التوسع أثناء إضافة المزيد من الميزات، هكذا تبدو:

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

الآن قمنا بإعداد هندسة تضمن أننا يمكننا بسهولة إضافة أدوات جديدة في مجلد الأدوات. لا تتردد في اتباع هذا لإضافة مجلدات فرعية للموارد والموجهات.

### -2- إنشاء أداة

لنرى كيف يبدو إنشاء أداة بعد ذلك. أولًا، يجب إنشاؤها في مجلد فرعي *tool* هكذا:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # التحقق من صحة المدخلات باستخدام نموذج Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # ملاحظة: إضافة Pydantic، لكي نتمكن من إنشاء AddInputModel والتحقق من صحة المعطيات

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ما نراه هنا هو كيفية تعريف الاسم والوصف ومخطط الإدخال باستخدام Pydantic ومعالج سيتم استدعاؤه بمجرد استدعاء هذه الأداة. وأخيرًا، نكشف عن `tool_add` وهو قاموس يحمل كل هذه الخصائص.

هناك أيضًا *schema.py* الذي يُستخدم لتعريف مخطط الإدخال المستخدم في أداتنا:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

نحتاج أيضًا إلى تعبئة *__init__.py* لضمان التعامل مع مجلد الأدوات كوحدة. بالإضافة إلى ذلك، نحتاج إلى الكشف عن الوحدات بداخله هكذا:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

يمكننا الاستمرار في الإضافة إلى هذا الملف مع إضافة المزيد من الأدوات.

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

هنا ننشئ قاموسًا يتكون من خصائص:

- name، وهو اسم الأداة.
- rawSchema، وهو مخطط Zod، سيتم استخدامه للتحقق من صحة الطلبات الواردة لاستدعاء هذه الأداة.
- inputSchema، هذا المخطط سيستخدمه المعالج.
- callback، وهذا يستخدم لاستدعاء الأداة.

هناك أيضًا `Tool` الذي يُستخدم لتحويل هذا القاموس إلى نوع يمكن لمعالج خادم MCP قبوله ويبدو كالتالي:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

وهناك *schema.ts* حيث نخزن مخططات الإدخال لكل أداة التي تبدو هكذا مع وجود مخطط واحد فقط حاليًا ولكن عند إضافة أدوات يمكن إضافة المزيد من الإدخالات:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

رائع، دعنا نستمر في التعامل مع سرد أدواتنا بعد ذلك.

### -3- التعامل مع سرد الأدوات

للتعامل مع سرد أدواتنا، نحتاج إلى إعداد معالج طلب لذلك. إليك ما نحتاج لإضافته إلى ملف الخادم:

**Python**

```python
# تم حذف الكود للاختصار
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

هنا، نضيف الزخرفة `@server.list_tools` والدالة المنفذة `handle_list_tools`. في الأخيرة، نحتاج إلى إنتاج قائمة الأدوات. لاحظ كيف يحتاج كل أداة إلى أن يكون لها اسم، وصف وinputSchema.

**TypeScript**

لإعداد معالج الطلب لسرد الأدوات، نحتاج إلى استدعاء `setRequestHandler` على الخادم مع مخطط يتناسب مع ما نحاول فعله، في هذه الحالة `ListToolsRequestSchema`.

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
// تم حذف الكود للاختصار
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // إعادة قائمة الأدوات المسجلة
  return {
    tools: tools
  };
});
```

رائع، لقد حللنا الآن جزء سرد الأدوات، دعنا نرى كيف يمكننا استدعاء الأدوات بعد ذلك.

### -4- التعامل مع استدعاء أداة

لاستدعاء أداة، نحتاج إلى إعداد معالج طلب آخر، هذه المرة يركز على التعامل مع طلب يحدد ميزة لاستدعائها وبأي وسائط.

**Python**

لنستخدم الزخرفة `@server.call_tool` وننفذها بدالة مثل `handle_call_tool`. داخل تلك الدالة، نحتاج إلى تحليل اسم الأداة، وسيطاتها والتأكد من صحة الوسائط للأداة المعنية. يمكننا إما التحقق من الوسائط في هذه الدالة أو في الأداة الفعلية بالأسفل.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # الأدوات هي قاموس بأسماء الأدوات كمفاتيح
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # استدعاء الأداة
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

هذا ما يحدث:

- اسم أداتنا موجود بالفعل كمعامل إدخال `name` وهو صحيح لوسائطنا في شكل قاموس `arguments`.

- تُستدعى الأداة بـ `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. التحقق من صحة الوسائط يحدث في خاصية `handler` التي تشير إلى دالة، إذا فشل ذلك سيرفع استثناءً.

ها نحن الآن لدينا فهم كامل لسرد واستدعاء الأدوات باستخدام خادم منخفض المستوى.

شاهد [المثال الكامل](./code/README.md) هنا

## المهمة

قم بتوسيع الكود الذي لديك بعدد من الأدوات والموارد والموجهات وعاين كيف تلاحظ أنه يجب عليك فقط إضافة ملفات في مجلد الأدوات ولا مكان آخر.

*لا توجد حلول معطاة*

## الملخص

في هذا الفصل، شاهدنا كيف يعمل نهج الخادم منخفض المستوى وكيف يمكن أن يساعدنا في إنشاء هندسة جيدة يمكننا البناء عليها باستمرار. كما ناقشنا التحقق من الصحة وعُرض عليك كيفية العمل مع مكتبات التحقق لإنشاء مخططات للتحقق من صحة الإدخال.

## ما هو التالي

- التالي: [مصادقة بسيطة](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**إخلاء المسؤولية**:  
تمت ترجمة هذا المستند باستخدام خدمة الترجمة الآلية [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى للدقة، يرجى العلم بأن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الموثوق به. للمعلومات الحيوية، يُنصح بالترجمة المهنية البشرية. نحن غير مسؤولين عن أي سوء فهم أو تفسير خاطئ ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->