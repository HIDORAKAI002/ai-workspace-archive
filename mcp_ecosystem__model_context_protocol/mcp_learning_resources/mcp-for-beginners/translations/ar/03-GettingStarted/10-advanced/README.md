# الاستخدام المتقدم للخادم  

هناك نوعان مختلفان من الخوادم المعروضة في حزمة تطوير MCP، الخادم العادي والخادم منخفض المستوى. عادةً، ستستخدم الخادم العادي لإضافة ميزات إليه. لكن في بعض الحالات، قد ترغب في الاعتماد على الخادم منخفض المستوى مثل:  

- بنية أفضل. من الممكن إنشاء بنية نظيفة باستخدام كل من الخادم العادي والخادم منخفض المستوى، لكن يمكن الجدل بأنه من الأسهل قليلاً باستخدام خادم منخفض المستوى.  
- توفر الميزات. بعض الميزات المتقدمة يمكن استخدامها فقط مع خادم منخفض المستوى. سترى هذا في الفصول اللاحقة عندما نضيف العينات (التي تم إيقافها في إصدار المرشح `2026-07-28`) والاستدعاء.  

## الخادم العادي مقابل الخادم منخفض المستوى  

إليك كيف يبدو إنشاء خادم MCP بالخادم العادي  

**بايثون**  

```python
mcp = FastMCP("Demo")

# أضف أداة الجمع
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b
```
  
**تايب سكريبت**  

```typescript
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});

// أضف أداة الجمع
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
  
النقطة هنا هي أنك تضيف صراحةً كل أداة، مورد أو موجه تريد أن يحتوي عليها الخادم. لا مشكلة في ذلك.  

### منهج الخادم منخفض المستوى  

مع ذلك، عند استخدام نهج الخادم منخفض المستوى، عليك التفكير فيه بطريقة مختلفة. بدلاً من تسجيل كل أداة، تنشئ اثنين من المعالجات لكل نوع ميزة (أدوات، موارد أو موجهات). فمثلاً، الأدوات لديها وظيفتان فقط كما يلي:  

- عرض قائمة كل الأدوات. تكون وظيفة واحدة مسؤولة عن جميع المحاولات لعرض الأدوات.  
- التعامل مع استدعاء الأدوات. هنا أيضاً، هناك وظيفة واحدة فقط تتعامل مع استدعاءات الأداة.  

يبدو هذا وكأنه عمل أقل محتمل، أليس كذلك؟ لذا بدلاً من تسجيل أداة، فقط أحتاج للتأكد من أن الأداة مدرجة عند عرض كل الأدوات وأن يتم استدعاؤها عندما يوجد طلب وارد لاستدعاء أداة.  

دعونا نلقي نظرة على كيف يبدو الكود الآن:  

**بايثون**  

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
  
**تايب سكريبت**  

```typescript
server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // إرجاع قائمة الأدوات المسجلة
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
  
هنا لدينا الآن وظيفة تعيد قائمة بالميزات. كل إدخال في قائمة الأدوات يحتوي الآن على حقول مثل `name`، `description` و `inputSchema` لتتوافق مع نوع الإرجاع. هذا يمكننا من وضع أدواتنا وتعريف الميزات في مكان آخر. يمكننا الآن إنشاء كل أدواتنا في مجلد tools والأمر نفسه لكل الميزات لذا يمكن لمشروعك أن يصبح منظمًا هكذا:  

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
  
هذا رائع، يمكننا جعل بنية مشروعنا نظيفة للغاية.  

ماذا عن استدعاء الأدوات، هل هي نفس الفكرة إذن، معالج واحد لاستدعاء أي أداة؟ نعم، بالضبط، إليك الكود لذلك:  

**بايثون**  

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
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```
  
**تايب سكريبت**  

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
    // TODO استدعاء الأداة،

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```
  
كما ترى من الكود أعلاه، نحتاج إلى تحليل الأداة المطلوب استدعاؤها، وبأي معطيات، ثم نتابع لاستدعاء الأداة.  

## تحسين النهج باستخدام التحقق  

حتى الآن، رأيت كيف يمكن استبدال كل تسجيلاتك لإضافة الأدوات والموارد والموجهات بهذين المعالجين لكل نوع ميزة. ما الذي نحتاج لفعله أيضاً؟ حسناً، يجب علينا إضافة شكل من أشكال التحقق لضمان أن الأداة تُستدعى بالمعطيات الصحيحة. لكل بيئة تشغيل حلها الخاص لهذا، مثلاً بايثون يستخدم Pydantic وتايب سكريبت يستخدم Zod. الفكرة هي أن نفعل الآتي:  

- نقل منطق إنشاء ميزة (أداة، مورد أو موجه) إلى مجلد مخصص لها.  
- إضافة طريقة للتحقق من الطلب الوارد، على سبيل المثال طلب استدعاء أداة.  

### إنشاء ميزة  

لإنشاء ميزة، سنحتاج لإنشاء ملف لتلك الميزة مع التأكد من احتوائه على الحقول الإلزامية المطلوبة للميزة. الحقول تختلف قليلاً بين الأدوات، الموارد والموجهات.  

**بايثون**  

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
        # التحقق من صحة الإدخال باستخدام نموذج Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # مهمة: إضافة Pydantic، حتى نتمكن من إنشاء نموذج AddInputModel والتحقق من صحة الوسائط

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

- إنشاء مخطط باستخدام Pydantic `AddInputModel` مع الحقول `a` و `b` في ملف *schema.py*.  
- محاولة تحليل الطلب الوارد ليكون من نوع `AddInputModel`، إذا كان هناك عدم تطابق في المعطيات سيؤدي ذلك إلى تعطل البرنامج:  

   ```python
   # add.py
    try:
        # التحقق من صحة الإدخال باستخدام نموذج Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```
  
يمكنك اختيار وضع منطق التحليل هذا داخل استدعاء الأداة نفسه أو في دالة المعالج.  

**تايب سكريبت**  

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

       // @تجاهل-ts
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
  
- في المعالج الذي يتعامل مع جميع استدعاءات الأدوات، نحاول الآن تحليل الطلب الوارد إلى مخطط الأداة المحدد:  

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```
  
    إذا كان ذلك ناجحًا، نتابع استدعاء الأداة الفعلية:  

    ```typescript
    const result = await tool.callback(input);
    ```
  
كما ترى، هذا النهج يخلق بنية رائعة حيث لكل شيء مكانه، ملف *server.ts* صغير جداً يحتوي فقط على ربط معالجات الطلبات وكل ميزة في مجلدها الخاص مثل tools/، resources/ أو /prompts.  

عظيم، دعنا نحاول بناء هذا الآن.  

## تمرين: إنشاء خادم منخفض المستوى  

في هذا التمرين، سنفعل الآتي:  

1. إنشاء خادم منخفض المستوى للتعامل مع عرض الأدوات واستدعاء الأدوات.  
2. تنفيذ بنية يمكنك البناء عليها.  
3. إضافة تحقق لضمان صحة استدعاءات أدواتك.  

### -1- إنشاء بنية  

أول شيء نحتاج لمعرفته هو بنية تساعدنا على التوسع مع إضافة المزيد من الميزات، هكذا تبدو:  

**بايثون**  

```text
server.py
--| tools
----| __init__.py
----| add.py
----| schema.py
client.py
```
  
**تايب سكريبت**  

```text
server.ts
--| tools
----| add.ts
----| schema.ts
client.ts
```
  
الآن قمنا بإعداد بنية تضمن إمكانية إضافة أدوات جديدة بسهولة في مجلد tools. لا تتردد في اتباع هذا لإضافة مجلدات فرعية للموارد والموجهات.  

### -2- إنشاء أداة  

دعنا نرى كيف يبدو إنشاء أداة. أولاً، يجب إنشاءها في مجلد فرعي *tool* هكذا:  

**بايثون**  

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # التحقق من صحة الإدخال باستخدام نموذج Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: إضافة Pydantic، حتى نتمكن من إنشاء AddInputModel والتحقق من صحة الوسائط

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```
  
ما نراه هنا هو كيفية تعريف الاسم، الوصف، ومخطط الإدخال باستخدام Pydantic ومعالج سيتم استدعاؤه عند استخدام هذه الأداة. أخيراً، نعرض `tool_add` وهو قاموس يحتوي كل هذه الخصائص.  

هناك أيضاً *schema.py* يُستخدم لتعريف مخطط الإدخال المستخدم في أداتنا:  

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```
  
نحتاج أيضًا لتعبئة *__init__.py* لضمان اعتبار مجلد الأدوات كوحدة Msodule، بالإضافة إلى كشف الوحدات داخله هكذا:  

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```
  
يمكننا الاستمرار في إضافة الأدوات إلى هذا الملف مع إضافة المزيد.  

**تايب سكريبت**  

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
  
هنا ننشئ قاموسًا يتكون من الخصائص:  

- name، وهو اسم الأداة.  
- rawSchema، وهو مخطط Zod، سيتم استخدامه للتحقق من صحة الطلبات الواردة لاستدعاء هذه الأداة.  
- inputSchema، يستخدم هذا المخطط بواسطة المعالج.  
- callback، تُستخدم لاستدعاء الأداة.  

هناك أيضاً `Tool` تُستخدم لتحويل هذا القاموس إلى نوع يمكن لمعالج خادم mcp قبوله ويبدو كالتالي:  

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```
  
وهناك *schema.ts* حيث نخزن مخططات الإدخال لكل أداة، وهو يبدو هكذا مع وجود مخطط واحد فقط حالياً ولكن مع إضافة أدوات يمكننا إضافة المزيد:  

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```
  
عظيم، دعنا ننتقل الآن إلى التعامل مع عرض أدواتنا.  

### -3- التعامل مع عرض الأدوات  

لتعامل مع عرض الأدوات، نحتاج إلى إعداد معالج طلب لهذا. إليك ما نحتاج إضافته إلى ملف الخادم:  

**بايثون**  

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
  
هنا، نضيف المزين `@server.list_tools` والدالة المنفذة `handle_list_tools`. في الأخيرة، نحتاج إلى إنتاج قائمة بالأدوات. لاحظ كيف يحتاج كل أداة أن يكون لها اسم، وصف و inputSchema.  

**تايب سكريبت**  

لإعداد معالج الطلب لعرض الأدوات، نحتاج لاستدعاء `setRequestHandler` على الخادم مع مخطط ملائم لما نحاول القيام به، في هذه الحالة `ListToolsRequestSchema`.  

```typescript
// إندكس.ts
import addTool from "./add.js";
import subtractTool from "./subtract.js";
import {server} from "../server.js";
import { Tool } from "./tool.js";

export let tools: Array<Tool> = [];
tools.push(addTool);
tools.push(subtractTool);

// خادم.ts
// تم حذف الكود للاختصار
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // إرجاع قائمة الأدوات المسجلة
  return {
    tools: tools
  };
});
```
  
عظيم، الآن حللنا مشكلة عرض الأدوات، دعونا نرى كيف يمكننا استدعاء الأدوات لاحقاً.  

### -4- التعامل مع استدعاء أداة  

لاستدعاء أداة، نحتاج إلى إعداد معالج طلب آخر، هذه المرة يركز على التعامل مع طلب يحدد أي ميزة يتم استدعاؤها وبأي معطيات.  

**بايثون**  

لنستخدم المزين `@server.call_tool` ونطبقه بدالة مثل `handle_call_tool`. داخل هذه الدالة، نحتاج إلى تحليل اسم الأداة، حججها والتأكد من أن الحجج صالحة للأداة المعنية. يمكننا التحقق من الحجج في هذه الدالة أو لاحقاً في الأداة نفسها.  

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

- اسم أداتنا موجود بالفعل كمعامل إدخال `name` وكذلك حججنا في شكل قاموس `arguments`.  

- الأداة تُستدعى باستخدام `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. يتم التحقق من الحجج في خاصية `handler` التي تشير إلى دالة، إذا فشل ذلك سيحدث استثناء.  

هكذا، لدينا الآن فهم كامل لكيفية عرض واستدعاء الأدوات باستخدام خادم منخفض المستوى.  

راجع [المثال الكامل](./code/README.md) هنا  

## التكليف  

قم بتمديد الكود المعطى لك بعدد من الأدوات والموارد والموجهات وفكّر كيف لاحظت أنه عليك فقط إضافة الملفات في مجلد الأدوات وليس في مكان آخر.  

*لا يوجد حل مقدم*  

## الملخص  

في هذا الفصل، رأينا كيف يعمل نهج الخادم منخفض المستوى وكيف يساعدنا ذلك في إنشاء بنية جيدة نستطيع البناء عليها. ناقشنا أيضاً التحقق وتم إطلاعك على كيفية العمل مع مكتبات التحقق لإنشاء مخططات للتحقق من الإدخال.  

## ماذا بعد  

- التالي: [المصادقة البسيطة](../11-simple-auth/README.md)  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة بالذكاء الاصطناعي [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى للدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة، يُنصح بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->