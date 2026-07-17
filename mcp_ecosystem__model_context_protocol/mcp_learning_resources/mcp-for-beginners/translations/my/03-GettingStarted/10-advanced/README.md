# ကြိုတင်တိုးတက်သောဆာဗာအသုံးပြုမှု

MCP SDK တွင် ပြသသော ဆာဗာနှစ်မျိုးရှိပါသည်၊ သင့်ရဲ့ ပုံမှန်ဆာဗာနှင့် နည်းပညာအနိမ့်ဆာဗာ။ ပုံမှန်အားဖြင့် သင်သည် ပုံမှန်ဆာဗာကို လုပ်ဆောင်ချက်များထည့်ရန် အသုံးပြုသည်။ သို့သော် အချို့တွင် နည်းပညာအနိမ့်ဆာဗာအပေါ် မှီခိုလိုလျှင် ဥပမာ -

- ပိုမိုကောင်းသော معماری။ ပုံမှန်ဆာဗာနှင့် နည်းပညာအနိမ့်ဆာဗာ နှစ်မျိုးလုံးဖြင့် သန့်ရှင်းသော معماری ဖန်တီးနိုင်သော်လည်း နည်းပညာအနိမ့်ဆာဗာဖြင့် ပိုမိုလွယ်ကူစွာ ဖန်တီးနိုင်သည်ဟု ဆင်ခြင်နိုင်သည်။
- လုပ်ဆောင်ချက်ရရှိနိုင်မှု။ တချို့ တိုးတက်သော လုပ်ဆောင်ချက်များကို နည်းပညာအနိမ့်ဆာဗာဖြင့်ပင်သာ အသုံးပြုနိုင်သည်။ ဤအချက်ကို နောက်ပိုင်းအခန်းများတွင် sampling ( `2026-07-28` ထွက်ရှိမည့် candidate မှ သင်ခွင့်ထုတ်ထား) နှင့် elicitation ပေါင်းထည့်သည့်အခါ တွေ့ရှိမည်ဖြစ်သည်။

## ပုံမှန်ဆာဗာနှင့် နည်းပညာအနိမ့်ဆာဗာ

ပုံမှန်ဆာဗာဖြင့် MCP ဆာဗာ တစ်ခု ဖန်တီးခြင်းသည် အောက်ပါအတိုင်းဖြစ်သည်

**Python**

```python
mcp = FastMCP("Demo")

# ထပ်မံဖြည့်စွက်သည့်ကိရိယာတစ်ခု ထည့်ပါ
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

// ပေါင်းခြင်းကိရိယာတစ်ခု ထည့်သွင်းပါ
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

အဓိကမှာ သင် ကြားနိုင်သည် ယင်းဆာဗာတွင် ရှိစေလိုသော ကိရိယာတစ်ခုချင်းစီ၊ ရင်းမြစ် သို့မဟုတ် prompt တစ်ခုချင်းစီကို ထည့်သွင်းရသည်။ ထို့အပြင် အဲဒီမှာ ဘာမှ မှားယွင်းသည့်အရာမရှိပါ။  

### နည်းပညာအနိမ့်ဆာဗာနည်းလမ်း

သို့သော် နည်းပညာအနိမ့်ဆာဗာနည်းလမ်းကို အသုံးပြုတဲ့အခါ သင့်ရဲ့စဉ်းစားမှု တစ်မျိုးဖြစ်စေပါမည်။ ကိရိယာတစ်ခုချင်းစီကို မှတ်ပုံတင်ခြင်းအစား အစား တစ်မျိုးအတွင်း လုပ်ဆောင်ချက်အလွှာ နှစ်ခု ဖန်တီးရမည်ဖြစ်သည် (tools, resources သို့မဟုတ် prompts)။ ဥပမာအားဖြင့် tools အတွက် ဖန်တီးရမည့် function နှစ်ခုသာ ရှိသည် -

- အားလုံး tool များစာရင်းပေးပြခြင်း။ function တစ်ခုသည် tool များစာရင်းသွင်းရန် အားလုံး ကြိုးပမ်းချက်များကို တာဝန်ယူပါသည်။
- tool များကို ခေါ်ဆိုမှု ကို တာဝန်ယူခြင်း။ ဒီမှာလည်း tool ကို ခေါ်ဆိုရာ function တစ်ခုရှိသည်

၎င်းသည် အနည်းငယ် လုပ်ငန်းလျှော့နည်းသလို ထင်ပါသလား? ထို့ကြောင့် တစ်ခုတည်း ကိရိယာကို မှတ်ပုံတင်ခြင်းမပြုဘဲ ကိရိယာအားလုံး စာရင်းသွင်းရန် စဉ်းစားကြည့်ပြီး တောင်းဆိုမှုရှိလျှင် လက်ခံခေါ်ဆိုပေးရမည်ဖြစ်ပါသည်။

ယခု ကုဒ်သည် အောက်ပါအတိုင်းဖြစ်သည်ကို ကြည့်ကြရအောင်။

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
  // မှတ်ပုံတင်ထားသောကိရိယာများစာရင်းကိုပြန်ပေးပါ
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

ယခုမှာ ဖန်တီးထားသော function တစ်ခုသည် လုပ်ဆောင်ချက်များစာရင်းကို ပြန်သွားပေးသည်။ tools စာရင်းရှိ entry တစ်ခုချင်းစီတွင် `name`, `description` နှင့် `inputSchema` ကဲ့သို့သော field များပါတာကြောင့် ပြန်အေ့ရန်အမျိုးအစားနှင့် ကိုက်ညီစေသည်။ ဤသည်က ကိရိယာများနှင့် feature သတ်မှတ်ချက်များကို အခြားနေရာတွင်ထားနိုင်စေသည်။ ယခု tools folder အတွင်း၌ သင့် tools အားလုံးကို ဖန်တီးနိုင်ပြီး သင့် feature အားလုံးကိုလည်း ထည့်သွင်းနိုင်သောကြောင့် project ကို အောက်ပါအတိုင်း စီမံခန့်ခွဲနိုင်သည်။

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

အဲဒါကောင်းပါတယ်၊ ကျွန်ုပ်တို့၏ معماری သန့်ရှင်းရမည့်အတိုင်း ဖြစ်လာနိုင်ပါတယ်။

ကိရိယာများကို ခေါ်ဆိုရာမှာလည်း တူညီသည်နည်း၊ ကိရိယာ ခေါ်ဆိုရန် handler တစ်ခုပဲ ရှိရမည်၊ ကိရိယာ မည်ကိရိယာဖြစ်မဖြစ်။ ဟုတ်ကဲ့၊ အောက်ပါကုဒ်သည် အဲဒီအတွက်ဖြစ်ပါသည် -

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools သည် ကိရိယာအမည်များကို key များအဖြစ်ပါရှိသည့် စာအုပ်တစ်ခုဖြစ်သည်။
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
    
    // args: request.params.arguments
    // TODO ကိရိယာကိုခေါ်ရန်,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

အထက်ပါကုဒ်မှမြင်ရသလို၊ ခေါ်ဆိုရန် ကိရိယာနာမည်နှင့် အချက်အလက်များကို ဖြုတ်ထုတ်ရန်လိုအပ်ပြီး ပြီးနောက် ကိရိယာကို ခေါ်ဆိုရန် ဆက်လက်လုပ်ဆောင်ရမည်ဖြစ်သည်။

## စနစ်တကျပိုမိုကောင်းမွန်အောင် အတည်ပြုခြင်းဖြင့် တိုးတက်ပြောင်းလဲမှု

ယခုအထိ သင်ကိရိယာများ၊ ရင်းမြစ်များနှင့် prompts များကို ထည့်သွင်းရာတွင် လုပ်ဆောင်ချက်အမျိုးအစားတစ်ခုစီအတွက် handlers နှစ်ခုဖြင့် အစားထိုးနိုင်သည်ကို မြင်ခဲ့သည်။ နှင့်မဟုတ်ခြင်း၊ စစ်ဆေးမှုထည့်သွင်းရန်လိုအပ်သည်။ ထိုကိရိယာကို မှန်ကန်သော argument များဖြင့် ခေါ်ဆိုနေကြောင်း သေချာစေရန် validation တစ်မျိုး ထည့်သွင်းရမည်ဖြစ်သည်။ runtime တစ်ခုချင်းစီတွင် ၎င်းအတွက်ခြယ်နင်းချက် ရှိသည်၊ ဥပမာ Python တွင် Pydantic ကို အသုံးပြုသည့်အတူ TypeScript တွင် Zod ကိုအသုံးပြုသည်။ ရည်ရွယ်ချက်မှာ အောက်ပါအတိုင်းဖြစ်သည်။

- လုပ်ဆောင်ချက် (tool, resource သို့မဟုတ် prompt) ဖန်တီးခြင်းအတွက် လိုက်ဖက်သော folder ထဲသို့ အတိုင်းအတာလည်ပြောင်းရန်။
- ဥပမာအားဖြင့် tool ခေါ်ဆိုမှုများအား စစ်ဆေးရန် မတည့်သော တောင်းဆိုမှုရှိလျှင် အသိပေးပေးနိုင်သော validation ချိတ်ဆက်ရန်။

### လုပ်ဆောင်ချက်တစ်ခု ဖန်တီးခြင်း

လုပ်ဆောင်ချက်တစ်ခု ဖန်တီးရန်အတွက် ရိုက်ထည့်ရန် ဖိုင်တစ်ခု ဖန်တီးပြီး ၎င်းလုပ်ဆောင်ချက်အတွက် မရှိမဖြစ်လိုအပ်သည့် fields များပါရှိသည်စေပါမည်။ fields များသည် tools, resources နှင့် prompts ကြား ကွဲပြားမှု ရှိနိုင်သည်။

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
        # Pydantic မော်ဒယ်ကို အသုံးပြု၍ အထိန်းသိမ်းမှု ပြုလုပ်ပါ
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic ကို ထည့်သွင်းပါ၊ ဒါမှ မျှ AddInputModel ဖန်တီးပြီး args များကို အတည်ပြုနိုင်မည်ဖြစ်သည်။

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ဤနေရာတွင် ကျွန်ုပ်တို့ အောက်ပါကို မျက်မှောက်သည်။

- Pydantic `AddInputModel` ဖြင့် schema တစ်ခု ဖန်တီး၍ *schema.py* ဖိုင်တွင် `a` နှင့် `b` fields ပါရှိသည်။
- တောင်းဆိုမှုမှတ်တမ်းကို `AddInputModel` အမျိုးအစားအတိုင်း ဖတ်ရန် ကြိုးပမ်းသည်၊ parameter မတည့်ပါက အချက်ပေးခြင်း ဖြစ်သည်။

   ```python
   # add.py
    try:
        # Pydantic မော်ဒယ်ကိုအသုံးပြု၍ ထည့်သွင်းသောအချက်အလက်ကို သေချာစစ်ဆေးပါ
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

ဤ parsing logic ကို tool ခေါ်ဆိုမှုတွင် သို့မဟုတ် handler function တွင် ထည့်နိုင်သည်။

**TypeScript**

```typescript
// server.ts
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

// schema.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// add.ts
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

- တစ်ခုချင်း tool ခေါ်ဆိုမှု handler တွင် တောင်းဆိုမှုကို tool ၏ သတ်မှတ်ထားသော schema ဖြင့် စမ်းသပ်ရန် ကြိုးစားသည်။

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    စမ်းသပ်မှုအောင်မြင်လျှင် လက်တွေ့ tool ကို ခေါ်ဆိုသည်။

    ```typescript
    const result = await tool.callback(input);
    ```

မြင်ရသည့်အတိုင်း၊ ဤနည်းလမ်းက သင့်ကို ကျစ်လစ်ပြီး သီးခြားထားသော architecture တစ်ခု ဖန်တီးပေးခဲ့ပြီး *server.ts* သည် အလွန်သေးငယ်သော ဖိုင်ဖြစ်ပြီး  request handlers များကိုသာ ချိတ်ဆက်ထားသည်။ တစ်ခုချင်းစီသော လုပ်ဆောင်ချက်သည် tools/, resources/ သို့မဟုတ် /prompts တွင် ရှိသည်။

ကောင်းပါပြီ၊ နောက်တစ်ခုဆောက်ကြည့်ကြပါစို့။

## လေ့ကျင့်ခန်း: နည်းပညာအနိမ့်ဆာဗာ ဖန်တီးခြင်း

ဤလေ့ကျင့်ခန်းတွင် ကျွန်ုပ်တို့သည် အောက်ပါများ ဆောင်ရွက်ပါမည်-

1. ကိရိယာများ စာရင်းဖော်ခြင်းနှင့် ကိရိယာများ ခေါ်ဆိုမှုကို စီမံခန့်ခွဲသော နည်းပညာအနိမ့်ဆာဗာ တစ်ခု ဖန်တီးရန်။
1. တည်ဆောက်နိုင်သော architecture တစ်ခု ထူထောင်ရန်။
1. ကိရိယာများခေါ်ဆိုမှုများမှန်ကန်စွာ အတည်ပြုမှု ထည့်သွင်းရန်။

### -1- Architecture တစ်ခု ဖန်တီးခြင်း

ပထမဆုံး သေချာစေချင်သည်မှာ အသစ်ထည့်သွင်းမည့် လုပ်ဆောင်ချက်များကို အလွယ်တကူ ပိုမိုချဲ့ထွင်နိုင်ရန် architecture ဖြစ်သည်၊ အောက်ပါအတိုင်း ဖြစ်သည်။

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

ယခုကျွန်ုပ်တို့ လုပ်ဆောင်ချက်အသစ်များကို tools folder တွင် လွယ်ကူစွာ ထည့်သွင်းနိုင်သည့် architecture တစ်ခု တည်ဆောက်ပြီးဖြစ်ပါသည်။ resources နှင့် prompts များအတွက် subdirectory များဖန်တီးရန်လည်း လိုက်နာနိုင်ပါသည်။

### -2- ကိရိယာတစ်ခု ဖန်တီးခြင်း

နောက်တစ်ခုက ကိရိယာတစ်ခု ဖန်တီးခြင်းကို ကြည့်ရအောင်။ ပထမဆုံး *tool* subdirectory အတွင်း ဖန်တီးရမည်ဖြစ်သည်။

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic မော်ဒယ်ကို အသုံးပြု၍ ထည့်သွင်းချက်များကို စစ်ဆေးပါ
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic ကို ထည့်သွင်းပါ၊ ထို့ကြောင့် AddInputModel တစ်ခုကို ဖန်တီးပြီး args များကို စစ်ဆေးနိုင်ပါသည်

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ဤနေရာတွင် ကြည့်ရှုနိုင်သည်မှာ Pydantic ကို အသုံးပြု၍ name, description, input schema ကို သတ်မှတ်ပြီး ကိရိယာခေါ်စဉ် invoke ဖြစ်မည့် handler တစ်ခု ဖန်တီးထားသည့် နည်းလမ်းဖြစ်သည်။ နောက်ဆုံးတွင် `tool_add` ဆိုသော dictionary ပြေးလာပြီး ဒီ property အားလုံးကို ဖမ်းယူထားသည်။

ထို့အပြင် *schema.py* တွင် ကိရိယာ၏ input schema ကိုသတ်မှတ်ထားသည်။

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

tools directory ကို Python module အဖြစ် အသုံးပြုနိုင်ရန် *__init__.py* ဖိုင်အတွက်လည်း သိပ်သည်းထားရန် လိုအပ်သည်။ ထို့အပြင် အောက်ပါအတိုင်း modules များကို ပြသရမည်။

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

နောက်ထပ် tools များထည့်သွင်းစဉ်တွင် ဤဖိုင်တွင်လည်း ဆက်ဖြိုးနိုင်ပါသည်။

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

အဲဒီမှာ property များပါသော dictionary တစ်ခု ဖန်တီးထားသည်။

- name, ကိရိယာ၏နာမည်ဖြစ်သည်။
- rawSchema, Zod schema သည် tool ခေါ်ဆိုမှုများစနစ်တကျ စစ်ဆေးရန် အသုံးပြုမည်။
- inputSchema, သည် schema ကို handler က သုံးမည်။
- callback, ကိရိယာကို invoke ဖို့ အသုံးပြုသည်။

MCP ဆာဗာ handler မှလက်ခံနိုင်သောအမျိုးအစားသို့ တည်းဖြတ်ရန် `Tool` ကိုအသုံးပြုသည်။

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

နောက်ပြီး *schema.ts* တွင် tools တစ်ခုချင်း၏ input schemas များ သိမ်းဆည်းထားပြီး ယခုတွင် schema တစ်ခုသာ ရှိသော်လည်း ထပ်မံထည့်သွင်းနိုင်သည်။

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

ကောင်းပါပြီ၊ လုပ်ဆောင်ချက်အားလုံး စာရင်းဖော်ရန် ဆက်လက် ဆောင်ရွက်ကြရအောင်။

### -3- ကိရိယာစာရင်းကို စီမံခန့်ခွဲခြင်း

ကိရိယာများစာရင်း စီမံရန် တောင်းဆိုမှု handler တစ်ခု ဖန်တီးရမည်။ ဆာဗာဖိုင်တွင် ထည့်ရမည့် နမူနာ -

**Python**

```python
# အတိုချုံးဖော်ပြရန်ကုဒ်ကိုဖယ်ရှားထားသည်
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

ဤနေရာတွင် `@server.list_tools` decorator နှင့် အကောင်အထည်ဖော်ရန် `handle_list_tools` function ထည့်သည်။ ထို function တွင် tools စာရင်း ထုတ်လုပ်ရမည်ဖြစ်ပြီး အခြေခံအားဖြင့် tool တစ်ခုချင်းစီတွင် name, description နှင့် inputSchema ရှိရမည်။   

**TypeScript**

ကိရိယာစာရင်းတောင်းဆိုမှု handler တွဲဖက်ရန် server တွင် `setRequestHandler` ကို call ပြုလုပ်ပြီး schema ကို လိုက်ဖက်အောင် `ListToolsRequestSchema` ကို အသုံးပြုသည်။

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
// ဖော်ပြချက်အတိုချုံးအတွက်ကုဒ်ကိုဖြုတ်သည်
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // မှတ်ပုံတင်ထားသောကိရိယာများစာရင်းကိုပြန်ပေးသည်
  return {
    tools: tools
  };
});
```

ကောင်းပါပြီ၊ ယခု ကျွန်ုပ်တို့ ကိရိယာစာရင်း ကို ပြုပြင်ပြီး ပြီးနောက် ကိရိယာ ခေါ်ဆိုမှုကို ဘယ်လိုလုပ်မည်ဆိုတာ ကြည့်ရအောင်။

### -4- ကိရိယာခေါ်ဆိုမှု စီမံခြင်း

ကိရိယာတစ်ခုကို ခေါ်ဆိုရန် တောင်းဆိုမှု စီမံခန့်ခွဲရေး handler တစ်ခု ထပ်မံ ဖန်တီးရမည်ဖြစ်သည်၊ ယခုတစ်ချက်တွင် သတ်မှတ်ထားသော feature ကိုဘယ်လိုခေါ်သုံးမည်နှင့် argument များ ဘယ်လို ရှိကြောင်းကို တုံ့ပြန်စစ်ဆေးပါမည်။

**Python**

`@server.call_tool` decorator နှင့် `handle_call_tool` function ဖြင့် ဆောင်ရွက်ကြပါမည်။ စတင် function အတွင်းကိရိယာနာမည်၊ argument များကို ဖြုတ်ထုတ်ပြီး argument များသည် ကိရိယာသတ်မှတ်ချက်နှင့် ကိုက်ညီကြောင်းစစ်ဆေးပါမည်။ validation ကို function ထဲတွင် သို့မဟုတ် tool အတွင်း downstream တွင် ဆောင်ရွက်နိုင်သည်။

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools သည် ကိရိယာအမည်များကို key အဖြစ် သုံးထားသော dictionary ဖြစ်သည်
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # ကိရိယာကို ဖိတ်ခေါ်ပါ
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

အောက်ပါအချက်များဖြစ်ပေါ်သည်။

- ကိရိယာနာမည်သည် input parameter `name` အဖြစ် ရှိပြီး `arguments` dictionary မှာ အမှန်တစ်ကယ် argument များ ပါသည်။

- ကိရိယာကို `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` ဖြင့် ခေါ်ဆိုသည်။ argument validation သည် `handler` property တွင် လုပ်ဆောင်ခြင်းဖြင့် function လေး လုပ်ဆောင်သည်၊ validation မတည့်ပါက exception ဖြစ်ပေါ်မည်။

ဒါဖြင့် နည်းပညာအနိမ့်ဆာဗာကိုသုံးပြီး ကိရိယာ စာရင်းဖော်ခြင်းနှင့် ကိရိယာခေါ်ဆိုခြင်းကို စုံလင်စွာနားလည်နိုင်ပါပြီ။

အောက်ပါ [နမူနာအပြည့်အစုံ](./code/README.md) ကို ကြည့်ပါ

## အိမ်စာ

သင့်အား ဖော်ပြထားသောကုဒ်ထဲတွင် ကိရိယာ၊ ရင်းမြစ် နှင့် prompt အသုံးများစွာထည့်သွင်းပြီး tools directory အတွင်း ဖိုင်များကိုသာ ထည့်သွင်းရန်ကျဉ်းမြောင်းမှုကို ကြားနာပါ။

*ဖြေရှင်းချက် မရှိပါ*

## အနှစ်ချုပ်

ဤအခန်းတွင် နည်းပညာအနိမ့်ဆာဗာနည်းလမ်းကို မြင်တွေ့ခဲ့ပြီး ကျွန်ုပ်တို့ စေ့စပ်ကြည့်ရှုသော architecture သည် သင်တိုးတက်စေမည့် ဖန်တီးမှုအတွက် ချောမွေ့စွာဖြစ်ကြောင်း သိရှိခဲ့သည်။ validation အကြောင်းကိုလည်း ဆွေးနွေးခဲ့ပြီး input validation အတွက် schema ဖန်တီးရာတွင် validation libraries များနှင့် နည်းလမ်းများကို ပြသခဲ့သည်။

## မနက်ဖြန်မှာဘာလုပ်မလဲ

- နောက်နောက် ကျရေး: [ရိုးရှင်းသော အတည်ပြုမှု](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->