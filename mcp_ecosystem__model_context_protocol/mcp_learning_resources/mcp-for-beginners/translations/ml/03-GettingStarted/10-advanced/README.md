# പ്രഗത്ഭ സേർവർ ഉപയോഗം

MCP SDK-യിൽ രണ്ടു വ്യത്യസ്ത തരം സേർവറുകൾ പ്രകാശനം ചെയ്യപ്പെട്ടിരിക്കുന്നു, നിങ്ങളുടെ സാധാരണ സേർവർയും ലോ-ലവൽ സേർവറുമാണ്. സാധാരണയായി, സേർവറിൽ ഫീച്ചറുകൾ ചേർക്കാൻ സാധാരണ സേർവർ ഉപയോഗിക്കാറുണ്ട്. എന്നാൽ ചില കേസുകളിൽ, താഴ്ന്ന നിലയിലെ സേർവർ ആശ്രയിക്കാൻ നിങ്ങൾക്ക് ആഗ്രഹമുണ്ടാകും, ഉദാഹരണത്തിന്:

- കൂടുതൽ നല്ല ആർക്കിടെക്ചർ. സാധാരണ സേർവർ കൂടാതെ ഒരു ലോ-ലവൽ സേർവർ ഉപയോഗിച്ച് ഒരു ശുദ്ധമായ ആർക്കിടെക്ചർ സൃഷ്ടിക്കാൻ സാധിക്കും, എന്നാൽ ചിലപക്ഷങ്ങളിൽ ലോ-ലവൽ സേർവറൊപ്പം അത് എളുപ്പമെന്നു വാദിക്കാം.
- ഫീച്ചർ ലഭ്യത. ചില പ്രഗത്ഭ ഫീച്ചറുകൾ ലോ-ലവൽ സേർവറിനോട് മാത്രം ഉപയോഗിക്കാം. തുടർന്ന് എളുപ്പമാക്കല്‍ (sampling)യും ഉന്നമനവും (elicitation) ചേർക്കുമ്പോൾ ഇത് കാണാം.

## സാധാരണ സേർവർ vs ലോ-ലവൽ സേർവർ

സാധാരണ സേർവർ ഉപയോഗിച്ച് MCP സേർവർ സൃഷ്ടിക്കുമ്പോൾ ഇങ്ങനെ കാണാം

**Python**

```python
mcp = FastMCP("Demo")

# ഒരു കൂട്ടിച്ചേർക്കൽ ഉപകരണം ചേർക്കുക
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

// ഒരു ചേർക്കൽ ഉപകരണം ചേർക്കുക
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

ഇവിടെ ഉയർന്നത് എന്തെന്നാൽ നിങ്ങൾ സേർവറിൽ ആഗ്രഹിക്കുന്ന ഓരോ ടൂൾ, റിസോഴ്സ്, പ്രോപ്റ്റ് എന്നിവ പുത്തൻ വീക്ഷണത്തോടെ ചേർക്കുകയാണ്. ഇതിൽ യാതൊരു തകരാറുമില്ല.

### ലോ-ലവൽ സേർവർ സമീപനം

എങ്കിലും, ലോ-ലവൽ സേർവർ സമീപനം ഉപയോഗിക്കുമ്പോൾ ഇതിനെ പകാസം വ്യത്യസ്തമായി ചിന്തിക്കേണ്ടതുണ്ട്. ഓരോ ടൂൾ രജിസ്റ്റർ ചെയ്യുന്നതിന് പകരം ഫീച്ചർ തരം (ടൂളുകൾ, റിസോഴ്സുകൾ, പ്രോപ്റ്റുകൾ) അനുസരിച്ച് രണ്ട് ഹാൻഡ്ലറുകൾ സൃഷ്ടിക്കണം. ഉദാഹരണത്തിന് ടൂളുകൾക്കായി രണ്ട് ഫങ്ഷനുകൾ മാത്രമേ ഉള്ളൂ:

- എല്ലാ ടൂളുകളും ലിസ്റ്റ് ചെയ്യുക. ഒരു ഫംഗ്ഷൻ എല്ലായ്പ്പോഴും ടൂൾ ലിസ്റ്റ് ചെയ്യാനുള്ള ശ്രമങ്ങൾ കൈകാര്യം ചെയ്യും.
- എല്ലാ ടൂളുകളുടെ കോളുകൾ കൈകാര്യം ചെയ്യുന്നത്. ഇവിടെ ഓരോ ടൂളും വിളിക്കപ്പെടുമ്പോഴും ഒരു ഫംഗ്ഷൻ മാത്രമേ അതിന്റെ കോളുകൾ കൈകാര്യം ചെയ്യൂ.

ഇത് കുറച്ചുകൂടി കുറവ് ജോലിയായി തോന്നുമല്ലോ? അതായത്, ടൂൾ രജിസ്റ്റർ ചെയ്യുന്നതിനു പകരം, എല്ലാവരും ടൂൾ ലിസ്റ്റിൽ ഉണ്ടെന്നുണ്ടെന്ന് ഉറപ്പാക്കുകയും ടൂൾ വിളിക്കാൻ വരുമ്പോൾ അതിനെ വിളിക്കുകയും ചെയ്യണം.

ഇപ്പോൾ കോഡ് എങ്ങിനെയാണെന്ന് നോക്കാം:

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
  // രജിസ്റ്റർ ചെയ്ത ഉപകരണങ്ങളുടെ പട്ടിക തിരികെ നൽകുക
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

ഇവിടെ ഒരു ഫംഗ്ഷൻ ഫീച്ചറുകളുടെ ലിസ്റ്റ് റിട്ടേൺ ചെയ്യുന്നു. ടൂളുകൾ ലിസ്റ്റിലുള്ള ഓരോ എൻട്രിക്കിലും `name`, `description`, `inputSchema` പോലുള്ള ഫീൽഡുകൾ ഉണ്ടെന്ന് കാണുന്നു. ഇത് നമ്മുടെ ടൂളുകളും ഫീച്ചർ നിർവചനങ്ങളും വേറെ സ്ഥലം വെയ്ക്കാൻ അനുവദിക്കുന്നു. ഇപ്പൊഴത് എല്ലാ ടൂളുകളും tools ഫോൾഡറിൽ സൃഷ്ടിക്കാം, അതുപോലെ എല്ലാ ഫീച്ചറുകളും സൃഷ്ടിച്ച് പ്രോജക്ട് ഇങ്ങനെ ക്രമീകരിക്കാം:

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

ഇത് വളരെ നല്ലതാണ്, നമ്മുടെ ആർക്കിടെക്ചർ നന്നായി ശുദ്ധമായി കാണാൻ കഴിയും.

ടൂളുകൾ വിളിക്കുന്നത് എങ്ങിനെയാണ്? ഒരേ ഹാൻഡ്ലർ എല്ലാം ടൂളുകളും വിളിക്കുന്നത്? യഥാർത്ഥം, അതാണ്, ഇതാ കോഡ്:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools എന്നത് ടൂൾ നാമങ്ങളെ കീകൾ ആക്കി ഉള്ള ഒരു ഡിക്ഷണറിയാണ്
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
    // ചെയ്യാനുള്ളത് ടൂൾ വിളിക്കുക,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

മുകളിലുള്ള കോഡിൽ നിന്ന് ശരിക്കും കാണാമെന്നു പോലെ, നമ്മുക്ക് കോളുചെയ്യേണ്ട ടൂൾ പാഴ്‌സുചെയ്യേണ്ടതും its arguments പാഴ്‌സുചെയ്യുകയും പിന്നീട് ടൂൾ വിളിക്കുക കൂടാതെ മറ്റ് പ്രവർത്തനങ്ങളുമായി മുന്നോട്ട് പോവേണ്ടതുമുണ്ട്.

## സംവരണവുമായി സമീപനം മെച്ചപ്പെടുത്തൽ

ഇതുവരെ, എല്ലാം ടൂളുകൾ, റിസോഴ്സുകൾ, പ്രോപ്റ്റുകൾ ചേർക്കുന്നതിനുള്ള നിങ്ങളുടെ രജിസ്ട്രേഷനുകൾ ഈ രണ്ട് ഹാൻഡ്ലറുകൾ ഉപയോഗിച്ച് മാറ്റാം എന്ന് നിങ്ങൾ കണ്ടു. ഇനി എന്താണ് ചെയ്യേണ്ടത്? നമ്മുടെ ടൂൾ ശരിയായ arguments ഉപയോഗിച്ച് വിളിക്കപ്പെടുന്നുവെന്ന് ഉറപ്പാക്കാൻ ഏതെങ്കിലും തരത്തിലുള്ള സംവരണം (വാലിഡേഷൻ) പതിപ്പിക്കണം. ഓരോ റUNTIME-ഉം ഇതിനായി സ്വന്തമായൊരു മാർഗ്ഗം ഉണ്ട്, ഉദാഹരണത്തിന് Python Pydantic ഉപയോഗിക്കുന്നു, TypeScript Zod ഉപയോഗിക്കുന്നു. ആശയം:

- ഒരു ഫീച്ചർ (ടൂൾ, റിസോഴ്സ്, പ്രോപ്റ്റ്) സൃഷ്ടിക്കുന്ന ലജിക് അതിന്റെ അതിര വെളിപ്പെടുത്തിയിരിക്കുന്ന ഫോൾഡറിലേക്ക് മാറ്റുക.
- ടൂൾ വിളിക്കാൻ വരുന്ന റിക്വസ്റ്റ് ഒരു രീതിയിൽ സാധുവാണെന്ന് സ്ഥിരീകരിക്കാൻ വഴിക്ക് ഉപയോഗിക്കുക.

### ഒരു ഫീച്ചർ സൃഷ്ടിക്കുക

ഫീച്ചർ സൃഷ്ടിക്കാൻ, അതിന് ഒരു ഫൈൽ സൃഷ്ടിച്ച് അതിലെ നിർബന്ധമായ ഫീൽഡുകൾ ഉൾക്കൊള്ളണം. ടൂളുകൾ, റിസോഴ്സ്, പ്രോപ്റ്റുകൾ തമ്മിൽ ഫീൽഡുകൾക്ക് ചെറിയ വ്യത്യാസമുണ്ടാകാം.

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
        # പൈഡാന്റിക് മോഡൽ ഉപയോഗിച്ച് ഇൻപുട്ട് സ്ഥിരീകരിക്കുക
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: പൈഡാന്റിക് ചേർക്കുക, zodat ഞമുക്ക് AddInputModel സൃഷ്ടിച്ച് ആർക്കുകൾ സ്ഥിരീകരിക്കാനാകും

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ഇവിടെ കാണുന്നത്:

- Pydantic ഉപയോഗിച്ച് `AddInputModel` എന്ന സ്കീമ സൃഷ്ടിക്കുന്നു, അതില് `a` , `b` എന്നിവയുടെ ഫീൽഡുകളുണ്ട് *schema.py* ഫൈലിൽ.
- വന്ന റിക്വസ്റ്റ് `AddInputModel` ആക്കാൻ ശ്രമിക്കുന്നു, പരാമീറ്ററുകളിൽ പൊരുത്തക്കേടുണ്ടെങ്കിൽ കെടുതിവരും:

   ```python
   # add.py
    try:
        # Pydantic മോഡൽ ഉപയോഗിച്ച് ഇൻപുട്ട് സ്ഥിരീകരിക്കുക
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

നിങ്ങൾക്ക് ഈ പാഴ്‌സിംഗ് ലജിക് ടൂൾ കോളിൽ կամ ഹാൻഡ്ലർ ഫംഗ്ഷനിൽ വെക്കാമെന്ന് തിരഞ്ഞെടുക്കാം.

**TypeScript**

```typescript
// സെർവർ.tsv
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

       // @ts-അന്ഗനിക്കുക
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

// സ്കീമ.tsv
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// ചേർക്കുക.tsv
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

- എല്ലാ ടൂൾ കോൾസ് കൈകാര്യം ചെയ്യുന്ന ഹാൻഡ്ലറിൽ, ഇനി ടൂൾ നിർവചിച്ച സ്കീമയിൽ വരുന്ന റിക്വസ്റ്റ് പാഴ്‌സ് ചെയ്യാൻ ശ്രമിക്കുന്നു:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    അത് സഫലമായാൽ, യഥാർത്ഥ ടൂൾ വിളിക്കാൻ മുന്നോട്ട് പോകും:

    ```typescript
    const result = await tool.callback(input);
    ```

ഇതിൽ നിന്ന് കാണാം, എല്ലാ ഫീച്ചറുകളും സ്വന്തം സ്ഥിതി ലഭിക്കുകയും *server.ts* ഫൈൽ വളരെ ചെറുതായി അപേക്ഷ സമർപ്പണ ഹാൻഡ്ലറുകൾ രീതിയിലാക്കുകയും എല്ലാ ഫീച്ചറുകളും സ്വന്തം ഫോൾഡറിലാണ് (tools/, resources/, prompts/).

സൂപ്പർ, അടുത്തതായി ഇത് ഉണ്ടാക്കാൻ ശ്രമിക്കാം.

## അഭ്യാസം: ലോ-ലവൽ സേർവർ സൃഷ്ടിക്കൽ

ഈ അഭ്യാസത്തിൽ, നാം ചെയ്യും:

1. ടൂളുകൾ ലിസ്റ്റുചെയ്യലും ടൂളുകൾ വിളിക്കലും കൈകാര്യം ചെയ്യുന്ന ലോ-ലവൽ സേർവർ സൃഷ്ടിക്കുക.
2. നിങ്ങൾക്ക് പണി നിർമ്മിക്കാൻ കഴിയുന്ന ആർക്കിടെക്ചർ നടപ്പിലാക്കുക.
3. നിങ്ങളുടെ ടൂൾ കോളുകൾ ശരിയായവിധം സ്ഥിരീകരിക്കുന്നതിനായി വാലിഡേഷൻ ചേർക്കുക.

### -1- ഒരു ആർക്കിടെക്ചർ സൃഷ്ടിക്കുക

ആദ്യമായി പരിഗണിക്കേണ്ടത് വിപുലീകരിക്കാൻ സഹായിക്കുന്ന ഒരു ആർക്കിടെക്ചർ ആണ്, ഇത് ഇങ്ങനെ ആണ്:

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

ഇപ്പോൾ tool ഫോൾഡറിൽ പുതിയ ടൂളുകൾ എളുപ്പത്തിൽ ചേർക്കാനുള്ള ആർക്കിടെക്ചർ സജ്ജമാക്കി. resources / prompts ഫോള‍ഡറുകൾക്കും സെബ്ഡിരക്ടറികൾ ചേർക്കാൻ ഈ മാതൃക പിന്തുടരുക.

### -2- ഒരു ടൂൾ നിർമ്മിക്കുക

അടുത്തതായി ടൂൾ ഒരു ടൂൾ അടിയന്തര ഫോൾഡറിൽ എങ്ങനെ സൃഷ്ടിക്കാമെന്ന് നോക്കാം:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic മോഡൽ ഉപയോഗിച്ച് ഇൻപുട്ട് പരിശോധിക്കുക
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic ചേർക്കുക, അപ്പോഴേക്കിൽ നാം AddInputModel സൃഷ്ടിച്ച് ആർഗ്യൂമെന്റ്‌ങ്ങൾ പരിശോധിക്കാം

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ഇവിടെ ഞങ്ങൾ പേരു, വിവരണം, ഇൻപുട്ട് സ്കീമ പിഡാന്റിക് ഉപയോഗിച്ച് നിർവചിക്കുന്നു കൂടാതെ ടൂൾ വിളിക്കുമ്പോൾ പ്രവർത്തിക്കുന്ന ഹാൻഡ്ലർ സൃഷ്ടിക്കുന്നു. ഒടുക്കം, `tool_add` എന്ന ഡിക്ഷണറി ഈ ഗുണഗണങ്ങൾ 모두 ഉൾക്കൊള്ളുന്നു.

നിരവധി ടൂളുകൾക്ക് ഉപയോഗിക്കുന്ന ഇൻപുട്ട് സ്കീമ നിർവചിക്കാൻ *schema.py* ഉണ്ട്:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

`__init__.py` പൂരിപ്പിച്ച് tools ഡയറക്ടറിയെ മാഡ്യൂളായി നിർവചിക്കണം. കൂടാതെ എല്ലാ മോഡ്യൂളുകളും പുറത്തുവിടണം ഇങ്ങനെ:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

കൂടുതൽ ടൂളുകൾ ചേർക്കുമ്പോൾ ഇത് നാം പുതുക്കാം.

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

ഇവിടെ ഞങ്ങൾ തരാം ഒരു ഡിക്ഷണറി:

- name, ടൂളിന്റെ പേര്.
- rawSchema, Zod സ്കീമ ആയി, ഈ ടൂൾ വിളിക്കാനുള്ള റിക്വെസ്റ്റുകൾ സാധുവാണെന്ന് പരിശോധിക്കാൻ.
- inputSchema, ഹാൻഡ്ലർ ഉപയോഗിക്കുന്നത്.
- callback, ടൂൾ വിളിക്കാൻ ഉപയോഗിക്കുന്നു.

ഇവയ്ക്ക് ശേഷം `Tool` എന്ന ടൈപ്പ് MCP സേർവർ ഹാൻഡ്ലർ സ്വീകരിക്കാൻ പരിഷ്ക്കരിക്കുന്നു ഇതു ഇങ്ങനെ:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

*schema.ts* ൽ ടൂൾ എല്ലാ ഇൻപുട്ട് സ്കീമകളും സൂക്ഷിക്കുന്നു, ഇപ്പോൾ ഒന്ന് മാത്രം ഉള്ളുവെങ്കിലും പുതിയ ടൂളുകൾ ചേർക്കുമ്പോൾ സ്കീമകൾ കൂട്ടിക്കും:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

പറഞ്ഞവൻ പോലെ, ടൂളുകൾ ലിസ്റ്റ് ചെയ്യാനുള്ള ഹാൻഡ്ലർ സൃഷ്ടിക്കാൻ നമുക്ക് സാധ്യതയുണ്ട്.

### -3- ടൂൾ ലിസ്റ്റിംഗ് കൈകാര്യം ചെയ്യുക

ടൂൾ ലിസ്റ്റിംഗ് കൈകാര്യം ചെയ്യാൻ, അതിനുള്ള റിക്വസ്റ്റ് ഹാൻഡ്ലർ സെർവർ ഫൈലിൽ ചേർക്കണം:

**Python**

```python
# ലഘుత్వത്തിനായി കോഡ് ഒഴിവാക്കി
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

ഇവിടെ dekorator ആയ `@server.list_tools` ചേർത്തു, ഫംഗ്ഷൻ `handle_list_tools` നടപ്പിലാക്കി. അതിൽ ടൂളുകളുടെ ലിസ്റ്റ് നിർമ്മിക്കണം. ഓരോ ടൂളിനും name, description, inputSchema ഫീൽഡുകൾ ഉണ്ടാകണം.

**TypeScript**

റിക്വസ്റ്റ് ഹാൻഡ്ലർ സെർവറിൽ സജ്ജമാക്കാൻ, `setRequestHandler` വിളിച്ചിരുന്നു, ഇവിടെ നിലവിലെ ആവശ്യത്തിന് അനുയോജ്യമായ സ്കീമ ഉപയോഗിക്കുന്നു, ഉദാഹരണത്തിന് `ListToolsRequestSchema`.

```typescript
// ഇൻഡക്സ്.ts
import addTool from "./add.js";
import subtractTool from "./subtract.js";
import {server} from "../server.js";
import { Tool } from "./tool.js";

export let tools: Array<Tool> = [];
tools.push(addTool);
tools.push(subtractTool);

// സെർവർ.ts
// ലഘൂീകരണത്തിന് കോഡ് ഒഴിവാക്കിയിരിക്കുന്നു
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // രജിസ്റ്റർ ചെയ്ത ഉപകരണങ്ങളുടെ ലിസ്റ്റ് തിരിച്ചു നൽകുക
  return {
    tools: tools
  };
});
```

സൂപ്പർ, ടൂൾ ലിസ്റ്റിംഗ് ഭാഗം തീർന്നു, ഇനി ടൂളുകൾ എങ്ങനെ വിളിക്കാമെന്ന് നോക്കാം.

### -4- ടൂൾ വിളിക്കൽ കൈകാര്യം ചെയ്യുക

ടൂൾ വിളിക്കാൻ, മറ്റൊരു റിക്വസ്റ്റ് ഹാൻഡ്ലർ സജ്ജമാക്കണം, ഇത് വിളിക്കേണ്ട ഫീച്ചർ ഏത് ആണെന്നും, ഏതെല്ലാ arguments ഉം വ്യക്തമാക്കണം.

**Python**

`@server.call_tool` ഡെക്കറേറ്റർ ഉപയോഗിച്ച് ഫംഗ്ഷൻ `handle_call_tool` നടപ്പിലാക്കാം. അതിൽ ടൂൾ നാമം, arguments പാഴ്‌സ് ചെയ്യുകയും അവർ ശരിയായ ആശയത്തിൽ ആണെന്ന് ഉറപ്പാക്കണം. വാലിഡേഷൻ ഈ ഫംഗ്ഷനിൽ അല്ലെങ്കിൽ യാഥാർത്ഥ്യ ടൂളിൽ ഇരുവരിലും ശരിയാകാം.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools എന്നത് ഉപകരണങ്ങളുടെ പേരുകൾ കീകളായി ഉള്ള ഒരു ഡിക്ഷണറിയാണ്
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # ഉപകരണം പ്രവർത്തിപ്പിക്കുക
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

നടന്നത്:

- ടൂൾ നാമം `name` എന്ന ഇൻപുട്ട് പാരാമീറ്ററിൽ നേരത്തെഉണ്ട്; arguments `arguments` ഡിക്ഷണറിയിൽ ഉൾക്കൊള്ളുന്നു.

- ടൂൾ `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` ഉപയോഗിച്ച് വിളിക്കുന്നു. arguments വാലിഡേഷൻ `handler` ഫംഗ്ഷനിൽ നടക്കുന്നു; പരാജയപ്പെടുകയാണെങ്കിൽ_EXCEPTION ഉയരും.

ഇങ്ങ്, നമുക്ക് ലോ-ലവൽ സേർവറിൽ ടൂൾ ലിസ്റ്റിംഗും കോളിംഗും പോലെ സമഗ്രമായി മനസിലായിരിക്കുന്നു.

പൂർണ്ണ ഉദാഹരണം കാണുക [full example](./code/README.md)

## അസൈൻമെന്റ്

നൽകപ്പെട്ട കോഡിന് കൂടുതൽ ടൂളുകൾ, റിസോഴ്സുകൾ, പ്രോംപ്റ്റുകൾ ചേർക്കുക, കൊടുക്കപ്പെട്ട ടൂൾ ഡയറക്ടറിയിലും മറ്റുള്ളവിടത്തും മാറ്റം വേണ്ടെന്നു ശ്രദ്ധിക്കുക.

*സമാധാനമൊന്നും നൽകിയിട്ടില്ല*

## സംഗ്രഹം

ഈ അധ്യായത്തിൽ, ലോ-ലവൽ സേർവർ സമീപനം എങ്ങനെ പ്രവർത്തിക്കുന്നുവെന്നും നല്ല ആർക്കിടെക്ചർ നിർമ്മിക്കാൻ സഹായിക്കുന്നുവെന്നും കണ്ടു. വാലിഡേഷൻ പങ്കും ചർച്ച ചെയ്തു, ഇൻപുട്ട് സ്ഥിരീകരണത്തിനായി സ്കീമകൾ സൃഷ്ടിക്കാൻ വാലിഡേഷൻ ലൈബ്രറികളുമായി എങ്ങനെ പ്രവർത്തിക്കാമെന്നും കാണിച്ചു.

## അടുത്തത്

- അടുത്തത്: [സിമ്പിൾ ഓഥന്റിക്കേഷൻ](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അസാധാരണ തുകിൽ**:  
ഈ മൂലപത്രം AI വിവർത്തന സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് വിവർത്തനം ചെയ്തതാണ്. നാം ശരിതത്ത്വത്തിന് പരിശ്രമിക്കുമ്പോഴും, ഓട്ടോമാറ്റഡ് വിവർത്തനങ്ങളിൽ പിശകുകൾ അഥവാ തെറ്റായ വിവരങ്ങൾ ഉണ്ടായിരിക്കാം എന്ന് ദയവായി ശ്രദ്ധിക്കുക. അതിന്റെ മാതൃഭാഷയിലുള്ള യഥാർത്ഥ നയം മാത്രം അവകാശപ്രദമായ ഉറവിടമാകും. നിർണായക വിവരങ്ങൾക്ക്, പ്രത്യേക പരിചയമുള്ള മനുഷ്യ വിവർത്തനം ശുപാർശ ചെയ്യുന്നു. ഈ വിവർത്തനം ഉപയോഗിച്ചുണ്ടാകുന്ന ആരുംവിവാദങ്ങൾക്കും തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കും ഞങ്ങൾ ഉത്തരവാദികൾ അല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->