# အဆင့်မြင့် ဆာဗာ အသုံးပြုမှု

MCP SDK မှာ နှစ်မျိုးရှိတဲ့ ဆာဗာတွေရှိပြီး အဲဒါတွေက သင့်ရဲ့ ပုံမှန်ဆာဗာနဲ့ အနိမ့်အဆင့်ဆာဗာ ဖြစ်တယ်။ ပုံမှန်အားဖြင့် ဂိုဏ်းအနေဖြင့် ပုံမှန်ဆာဗာကို အသုံးပြုပြီး စွမ်းဆောင်ချက်တွေ ထည့်ပေးလေ့ရှိတယ်။ သို့သော် အချို့အကြောင်းအရာတွေမှာ အနိမ့်အဆင့် ဆာဗာကို တွံ့ကြုံလိုချင်တာတွေ ရှိတတ်ပြီး ဥပမာတွေမှာ -

- ပိုမိုကောင်းမွန်တဲ့ စည်းမျဉ်းပုံသဏ္ဍာန်။ ပုံမှန်ဆာဗာနဲ့ အနိမ့်အဆင့် ဆာဗာနဲ့ ပေါင်းပြီး သန့်ရှင်းတဲ့ စည်းမျဉ်းပုံသဏ္ဍာန် တည်ဆောက်နိုင်ပေမဲ့ အနိမ့်အဆင့် ဆာဗာနဲ့ ပိုမိုလွယ်ကူတယ် ဆိုတာ ပြောနိုင်တယ်။
- စွမ်းဆောင်ချက်ရရှိနိုင်မှု။ အခြား အဆင့်မြင့် စွမ်းဆောင်ချက်အချို့က အနိမ့်အဆင့် ဆာဗာနဲ့ သာ အသုံးပြုနိုင်တယ်။ ကျွန်တော်တို့ sample နဲ့ elicitation တွေ ထည့်တဲ့ နောက်ပိုင်းပုံစံတွင် ဒီအကြောင်း တွေ့မြင်ရပါမယ်။

## ပုံမှန်ဆာဗာ vs အနိမ့်အဆင့် ဆာဗာ

ဤမှာ MCP Server ကို ပုံမှန်ဆာဗာနဲ့ ပြုလုပ်တာ ဘယ်လိုမြင်ရမှာလဲ။

**Python**

```python
mcp = FastMCP("Demo")

# ပေါင်းစွဲမှုကိရိယာတစ်ခုဖြည့်စွက်ပါ။
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

// ပေါင်းခြင်းကိရိယာတစ်ခုထည့်ပါ
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

ဤနေရာမှာ သင်ဟာ ဆာဗာမှာ လိုချင်တဲ့ tool, resource သို့ prompt များကို ထည့်သွင်းတဲ့အခါ မှတ်ပုံတင်တယ်။ ဒါက ပြဿနာမရှိဘူး။

### အနိမ့်အဆင့် ဆာဗာ နည်းလမ်း

သို့သော်၊ အနိမ့်အဆင့် ဆာဗာ နည်းလမ်းကို သုံးတဲ့အခါ မျက်နှာသာထက်ကွဲသွားတဲ့ အကြောင်းရပ်တွေရှိတယ်။ tool တစ်ခုချင်းစီကို မှတ်ပုံတင်ခြင်း မလုပ်ပဲ feature အမျိုးအစား (tools, resources, prompts) တစ်ခုစီအတွက် handler နှစ်ခု create လုပ်ရမယ်။ ဥပမာ tools ဆိုရင် အလုပ်လုပ်တဲ့ function နှစ်ခုရှိတယ်။

- tools အသုံးပြုရန် စာရင်းပြုစုခြင်း။ tools များ စာရင်းပေးရန် တာဝန်ယူသော function တစ်ခုရှိသည်။
- tools ကို ခေါ်သုံးခြင်းကို စီမံဆောင်ရွက်သော function တစ်ခုရှိသည်။

ဒီလိုနဲ့ လုပ်ရင် အလုပ်ပမာဏ လျော့နည်းနိုင်ပါတယ်။ tool များမှတ်ပုံတင်ခြင်းမလိုဘဲ tools စာရင်းထဲ tool တစ်ခု ပေါ်ရှိပြီး ခေါ်ဆိုမှု ရောက်လာတော့ အဲဒီ tool ကို ခေါ်သူကိုသေချာစေရုံပါပဲ။

ခုပြထားတဲ့ ကုဒ် ဘယ်လိုကွဲပြားနေတယ်ဆိုတာကြည့်ပါ။

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
  // မှတ်ပုံတင်ထားသောကိရိယာများစာရင်းကိုပြန်ပေးပို့ပါ။
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

ဒီမှာ function တစ်ခုရှိပြီး features ရဲ့ စာရင်း ပြန်ပေးတယ်။ tools စာရင်းထဲ entry တစ်ခုစီမှာ `name`, `description`, `inputSchema` ဆိုတဲ့ field တွေ ရှိပြီး return type နဲ့ ကိုက်ညီမှုရှိတယ်။ ဒါကြောင့် tools တွေကို တခြားနေရာမှာ စီစဉ်ထားလို့ရတယ်။ tools ဖိုလ်ဒါမှာ tools တို့ကို၊ feature တို့ကိုလည်း စီမံနိုင်လို့ project ကို ဒီလို စဉ်ဆက်မပြတ် စီမံခန့်ခွဲခွင့်ရရှိတာပါ။

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

အဲဒါက တကယ်လည်း ကောင်းတယ်၊ ကျွန်တော်တို့စည်းမျဉ်းပုံသဏ္ဍာန်က သန့်ရှင်းလာနိုင်တယ်။

tools ကို ခေါ်တဲ့အခါလည်း အညီ အတူ handler တစ်ခုနဲ့ ခေါ်တဲ့ အတွေးလား? ဟုတ်တယ်၊ code ကတော့ ဒီလိုပါ:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools သည် ကိရိယာနာမည်များကို key အဖြစ်ပါသော dictionary ဖြစ်သည်။
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
    // TODO ကိရိယာကိုခေါ်ပါ၊

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

အပေါ်က code က ပြသပေးတာကတော့ tool name နဲ့ arguments တွေ ထုတ်ဖော်တယ်၊ ပြီးတော့ tool ကို ခေါ်သွားဖို့ လုပ်ဆောင်တယ်။

## အတည်ပြုမှုနဲ့ နည်းလမ်း တိုးတက်စေခြင်း

အခုအထိ tools, resources, prompts မှတ်ပုံတင်မှုတွေအတွက် handler နှစ်ခုဖြင့် အစားထိုးနိုင်တယ်ဆိုတာမြင်ထားပြီ။ ဒါပေမဲ့ နောက်ထပ်ဘာလုပ်မလဲ? tool ကို မှန်ကန်တဲ့ argument တွေနဲ့ ခေါ်ထားတယ်ဆိုတဲ့ အတည်ပြုမှုကို ထည့်သွင်းသင့်တယ်။ runtime တစ်ခုချင်းစီဟာ အဖြေရှိပြီး Python က Pydantic ကိုအသုံးပြုပြီး၊ TypeScript မှာ Zod ကို အသုံးပြုပြီးတည်ဆောက်တယ်။ အကြောင်းအရာကတော့ -

- feature (tool, resource, prompt) တည်ဆောက်တဲ့ logic ကို dedicated folder တစ်ခုသို့ ရွှေ့ပါ။
- incoming request တစ်ခုကို validate လုပ်ဖို့ နည်းလမ်း ထည့်ပါ၊ ဥပမာ tool call တစ်ခုလိုချင်တဲ့အခါ။

### feature ဖန်တီးခြင်း

feature ဖန်တီးဖို့ file တစ်ခု ဖန်တီးပြီး အကယ်၍ ဤ feature တွေမှာ လိုအပ်တဲ့ field တွေ ပါဝင်ဖို့ သေချာစေခဲ့ရမယ်။

tools, resources, prompts အလိုက် field ကွာခြားမှုရှိတယ်။

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
        # Pydantic မော်ဒယ်ကို အသုံးပြု၍ အဝင်ကို စစ်ဆေးပါ
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic ထည့်ပါ၊ အဲဖြင့် AddInputModel ကို ဖန်တီးပြီး args များကို စစ်ဆေးနိုင်မည်ဖြစ်သည်။

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ဒီမှာ:

- Pydantic `AddInputModel` ကို schema ပုံစံ ချထားပြီး *schema.py* ထဲမှာ `a` နဲ့ `b` field တွေပါ။
- incoming request ကို `AddInputModel` နဲ့ parse လုပ်ကြည့်မယ်။ parameter မကိုက်ညီရင် crash တတ်တယ်။

   ```python
   # add.py
    try:
        # Pydantic မော်ဒယ်ကို အသုံးပြု၍ အချက်အလက်များကို တိုက်ဆိုင်စစ်ဆေးပါ။
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

tool call အတွင်းမှာ မဟုတ် handler function မှာ သတ်မှတ်ထည့်လို့ ရသည်။

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

- tool call စီမံရာ handler မှာ incoming request ကို tool ရဲ့ schema အတိုင်း parse လုပ်ကြည့်တယ် -

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    အကယ်၍ အဆင်ပြေခဲ့ရင် tool ကို ဆက်လက်ခေါ်ဆိုသည် -

    ```typescript
    const result = await tool.callback(input);
    ```

ဒီနည်းလမ်းကြောင့် စည်းမျဉ်းပုံသဏ္ဍာန်ကောင်းလွန်းပြီး *server.ts* က function ကျစဉ်ကို ချိတ်ဆက်ထားတယ်။ feature တစ်ခုစီကို ပိုင်းခြားထားတဲ့ folder တွေ (tools/, resources/, prompts/) မှာရှိတယ်။

ကောင်းပါပြီ၊ နောက်တစ်ခု တည်ဆောက်ကြမယ်။

## လေ့ကျင့်ခန်း: အနိမ့်အဆင့် ဆာဗာ ဖန်တီးခြင်း

ဒီလေ့ကျင့်ခန်းမှာ -

1. tools စာရင်းပါသော handler နဲ့ tool call handler ကို တည်ဆောက်မယ်။
2. ရိုးရှင်းပြီး တည်ဆောက်နိုင်တဲ့ architecture တည်ဆောက်မယ်။
3. tool call တွေ မှန်ကန်စွာ အတည်ပြုမယ့် validation ထည့်မယ်။

### -1- architecture တည်ဆောက်ခြင်း

ပထမဆုံး လုပ်မယ့်အကြောင်းကဆိုရင် အရမ်းပြောင်းလဲတာမလိုတော့ပဲ scalable ဖြစ်စေတဲ့ architecture ဖြစ်တယ် -

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

အခု tools ဖိုလ်ဒါထဲမှာ tool အသစ်တွေ လွယ်ကူမြန်ဆန်စွာ ထည့်နိုင်တယ်။ resources နဲ့ prompts အတွက်လည်း subdirectory တွေ ဖန်တီးနိုင်တယ်။

### -2- tool တစ်ခု ဖန်တီးခြင်း

tool တစ်ခု ဖန်တီးမယ်ဆိုတာ ဒီလို -

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic မော်ဒယ်ကို အသုံးပြုပြီး အဝင်ကိုအတည်ပြုပါ
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic ကို ထည့်ပါ၊ ဒါမှသာ AddInputModel ဖန်တီးပြီး args များကို အတည်ပြုနိုင်မယ်။

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ဒီမှာ name, description, input schema (Pydantic သုံး) နှင့် handler တစ်ခု ရှိတယ်၊ tool_add ဆိုတဲ့ dictionary တစ်ခုက အဲဒီ property တွေကို ထိန်းချုပ်ထားတယ်။

*schema.py* မှာ input schema သတ်မှတ်ထားတယ် -

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

*__init__.py* ကို ဖန်တီးပြီး tools directory ကို module လို့ သတ်မှတ်ပြီး module တွေကို ထုတ်ဖော်ထား။ 

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

tools များ တိုးလာတိုင်း ဒီ file ကို ဆက်လက်တိုးချဲ့နိုင်တယ်။

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

properties ပါဝင်သော dictionary တစ်ခု ဖန်တီးထား -

- name (tool နာမည်)
- rawSchema (Zod schema) - tool call request validation အတွက်
- inputSchema (handler အသုံးပြုသည်)
- callback (tool ခေါ်ဖို့)

`Tool` type က ဒီ dictionary ကို mcp server handler ရနိုင်စေရန် သိမ်းဆည်းထားသည်။

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

*schema.ts* မှာ tool input schemas များ သိမ်းဆည်းထားတယ်၊ စာရင်းထဲ schema တစ်ခုသာ ရှိသေးပေမယ့် အသစ်ထည့်သွင်းမှုရင် ဖြည့်စွက်သွားနိုင်တယ်။

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

ကောင်းတယ်၊ tools စာရင်းလုပ်ကိုင်တာကို ဆက်လက်ကြည့်မယ်။

### -3- tools စာရင်းကို စီမံမယ်

tools စာရင်းရယူဖို့ request handler တည်ဆောက်ရမယ်၊ server ဖိုင်မှာ ထည့်လိုက်မယ့်အရာ -

**Python**

```python
# စာသားတိုတောင်းမှုအတွက် ကုဒ်ပယ်ဖျက်ထားသည်
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

`@server.list_tools` decorator နဲ့ `handle_list_tools` function ဆောက်ထားတယ်။ tools စာရင်း ပြသဖို့ function ဖြစ်ပြီး tool တစ်ခုစီ name, description, inputSchema ရှိရမယ်။

**TypeScript**

tools စာရင်း request handler ကနေနဲ့ server ပေါ်မှာ `setRequestHandler` ဖြင့် `ListToolsRequestSchema` ကို ပေးပြီး တည်ဆောက်တယ်။

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
// ရိုးရှင်းစွာရေးရန်အတွက် ကုဒ်မြောက်တင်ထားသည်
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // မှတ်ပုံတင်ထားသောကိရိယာများစာရင်း ပြန်လည်ပေးပို့သည်
  return {
    tools: tools
  };
});
```

ကောင်းပြီ၊ tools စာရင်း ထုတ်တာပြီးသွားပြီ၊ tool call ကို ဘယ်လိုလုပ်မလဲ ကြည့်ကြရအောင်။

### -4- tool ခေါ်ယူရန် စီမံခန့်ခွဲခြင်း

tool ကို ခေါ်ရန် request handler အသစ် တစ်ခု ဖန်တီးတာဖြစ်ပြီး feature name အဲ့ဒီမှာ ပါဝင်ပြီး arguments များဖြင့် ခေါ်တာ။

**Python**

decorator `@server.call_tool` သုံးပြီး `handle_call_tool` function တွင် tool name နဲ့ arguments ကို parse လုပ်ပြီး validation ပြုလုပ်မယ်။ validation ကို ဒီ function ထဲ သို့မဟုတ် tool မှာ ကျောသေကောင်းတယ်။

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools သည် ကိရိယာအမည်များကို key အဖြစ် သုံးထားသော dictionary တစ်ခုဖြစ်သည်
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # ကိရိယာကို အသုံးပြုပါ
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

ဖြစ်ပေါ်တာ -

- tool name ကို input parameter `name` ဖြင့် ရပြီး၊ arguments ကို ကြည့်လို့ရတယ်။
- tool ကို `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` ဖြင့် ခေါ်တယ်။ arguments validation ကို handler function မှာ ပြုလုပ်တယ်။ မအောင်မြင်ရင် exception တက်တယ်။

ဒီလိုနဲ့ အနိမ့်အဆင့်ဆာဗာ ကို သုံးပြီး tools စာရင်းပြခြင်းကနေ tool call လုပ်ခြင်း အထိ နားလည်တဲ့ အဆင့်ရောက်ပြီ။

[full example](./code/README.md) ကြည့်ပါ။

## လုပ်ငန်းတာဝန်

သင့်ရဲ့ code ကို tools, resources, prompts တွေပါ ကြည့်ပြီး tools ဖိုလ်ဒါထဲမှာ file လို့ပဲ ဖြည့်သွင်းရုံနဲ့ အလုပ်မြန်သွားတာကို မှတ်မိကြည့်ပါ။

*ဖြေရှင်းချက် မပေးပါ*

## အကျဉ်းချုပ်

ဒီအခန်းမှာ အနိမ့်အဆင့် ဆာဗာနည်းလမ်းက ဘယ်လို အလုပ်လုပ်သလဲ၊ architecture များ ပြုလုပ်ကြမယ်နဲ့၊ validation ကို ဘယ်လို library တွေသုံးပြီး schema ဖန်တီးမလဲဆိုတာတွေ လေ့လာသွားခဲ့တယ်။

## နောက်တစ်ဆင့်

- နောက်တစ်ခု: [Simple Authentication](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ဖော်ပြချက်** ။  
ဤစာတမ်းကို AI ဘာသာပြန်မှု ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) ဖြင့် ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့အနေဖြင့် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းသော်လည်း၊ စက်မှုဘာသာပြန်မှုများတွင် အမှားများ သို့မဟုတ် မှားယွင်းမှုများ ရှိနိုင်ပါကြောင်း ကျေးဇူးပြု၍ သိရှိထားပေးပါရန်။ မူရင်းစာတမ်းကို မိခင်ဘာသာဖြင့်သာ ထိရောက်သော အချက်အလက်အရင်းအမြစ်အဖြစ် တွက်ယူသင့်ပါသည်။ အရေးကြီးသော သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက် အသုံးပြုမှုကြောင့် ဖြစ်ပေါ်လာသော နားမလည်မှုများ သို့မဟုတ် မှားယွင်းဖတ်ရှုမှုများအတွက် ကျွန်ုပ်တို့ မတာဝန်ခံပါကြောင်း သိရှိပေးပါရန်။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->