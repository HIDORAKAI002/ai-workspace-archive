# ഉയർന്ന നിലയിലെ സർവർ ഉപയോഗം

MCP SDKയിൽ രണ്ട് വ്യത്യസ്ത തരം സർവർമാർക കാണാം, നിങ്ങളുടെ സാധാരണ സർവർ ಮತ್ತು ലോ-ലവൽ സർവർ. സാധാരണയായി, നിങ്ങൾ ഒരു സാധാരണ സർവറെ ഉപയോഗിച്ച് അതിനുള്ള സവിശേഷതകൾ ചേർക്കും. എന്നാൽ ചില സാഹചര്യങ്ങളിൽ നിങ്ങൾ ലോ-ലവൽ സർവറിനെ ആശ്രയിക്കണം, ഉദാഹരണത്തിന്:

- മികച്ച വാസ്തുവിദ്യ. സാധാരണ സർവർക്കും ലോ-ലവൽ സർവർക്കും ഉപയോഗിച്ച് ശുദ്ധവും ക്രമീകരിച്ചവുമായ വാസ്തുവനിർമാണം സൃഷ്ടിക്കാനാകും, എന്നാൽ ലോ-ലവൽ സർവർ ഉപയോഗിക്കുന്നതിൽ ചെറിയ ആസാന്യം പ്രകടമാകാം.
- സവിശേഷത ലഭ്യത. ചില മുന്നേറ്റ സവിശേഷതകൾക്ക് ലോ-ലവൽ സർവർ മാത്രം ഉപയോഗിക്കാമെന്ന് സാധിക്കും. `2026-07-28` റിലീസ് കാന്പിഡേറ്റിൽ അപസമർപ്പിതമായ സാമ്പ്ലിങ് (sampling)യും elicitationയും പിന്നീട് അധ്യായങ്ങളിൽ കാണാം.

## സാധാരണ സർവറും ലോ-ലവൽ സർവറും തമ്മിലുള്ള വ്യത്യാസം

സാധാരണ സർവർ ഉപയോഗിച്ച് MCP സർവർ സൃഷ്ടിക്കുന്നത് എന്തുതന്നെയാണ്:

**Python**

```python
mcp = FastMCP("Demo")

# ഒരു കൂട്ടിച്ചേർക്കൽ ഉപകരണം ചേർക്കൂ
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

// ഒരു കൂട്ടിച്ചേർത്തൽ ടൂൾ ചേർക്കുക
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

ലക്ഷ്യം എന്നതാണ് നിങ്ങൾ സർവറിൽ ഉൾപ്പെടുത്താൻ ആഗ്രഹിക്കുന്ന ഓരോ ഉപകരണം, വനം ആവർ, പ്രോംപ്റ്റ് എന്നിവയ്ക്കും പ്രത്യേകം ചേർക്കുക. ഇതിൽ എന്തെങ്കിലും തെറ്റ് ഇല്ല.  

### ലോ-ലവൽ സർവർ സമീപനം

എന്നാൽ, ലോ-ലവൽ സർവർ സമീപനം ഉപയോഗിക്കുമ്പോൾ നിങ്ങൾ ഈ കാര്യങ്ങളെ വ്യത്യസ്തമായി കാണണം. ഓരോ സവിശേഷത തരം (ഉപകരണങ്ങൾ, വിഭവങ്ങൾ, പ്രോംപ്റ്റുകൾ) വേണ്ടി രണ്ടു കൈകാര്യം ചെയ്യലുകൾ (handlers) സൃഷ്ടിക്കണം. ഉദാഹരണത്തിന് ഉപകരണങ്ങൾക്കായി ഇങ്ങനെ രണ്ട് ഫങ്ഷനുകൾ മാത്രമുണ്ട്:

- എല്ലാ ഉപകരണങ്ങളും ലിസ്റ്റ് ചെയ്യൽ. ഒരു ഫങ്ഷൻ എല്ലാ ഉപകരണങ്ങൾ ലിസ്റ്റ് ചെയ്യുന്നതിനും ഉത്തരവാദിയാണ്.
- എല്ലാ ഉപകരണങ്ങളിലേക്കുള്ള കോളുകൾ കൈകാര്യം ചെയ്യൽ. ഇവിടെ ഒരു ഫങ്ഷൻ മാത്രം ഒരു ഉപകരണത്തേക്കുള്ള കോളുകൾ കൈകാര്യം ചെയ്യുന്നു.

ഇത് കുറവുള്ള ജോലി പോലെയാണോ ഇത്? അതിനാൽ ഒരു ഉപകരണം രജിസ്ട്രർ ചെയ്യുന്നതിന് പകരം, ഉപകരണങ്ങൾ എല്ലാം ലിസ്റ്റ് ചെയ്യുമ്പോൾ അവ ലിസ്റ്റിൽ വരണം എന്നും ഉപകരണത്തിന് ഒരു കോളിംഗ് വരുമ്പോൾ അത് വിളിക്കണം എന്നുമാത്രം ഉറപ്പാക്കണം.

ഇപ്പോൾ കോഡ് എങ്ങനെ തോന്നുന്നുവെന്ന് നോക്കാം:

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
  // രജിസ്റ്റർ ചെയ്ത ടൂളുകളുടെ പട്ടിക തിരിച്ചുകിട്ടുക
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

ഞങ്ങൾക്ക് ഇപ്പോൾ ഒരു ഫങ്ഷൻ ഉണ്ട്, അത് സവിശേഷതകളുടെ പട്ടിക തിരികെ നൽകുന്നു. ഉപകരണങ്ങളുടെ ലിസ്റ്റിലെ ഓരോ എൻട്രിയും `name`, `description`, `inputSchema` പോലുള്ള ഫീൽഡുകൾ ഇപ്പോൾ ഉണ്ടാകണം, തിരിച്ചുവളരുന്ന ടൈപ്പിൽ അനുസരിക്കാനായി. ഇതു വഴിയായി ഞങ്ങൾ ഉപകരണങ്ങളും സവിശേഷത നിർവചനങ്ങളും വേറെ ഇടങ്ങളിൽ സൂക്ഷിക്കാം. ഇപ്പോൾ ഒരു tools ഫോളഡറിൽ എല്ലാ ഉപകരണങ്ങളും സൃഷ്ടിക്കാം, അതുപോലെ വളരെ സവിശേഷതകൾക്കും, പ്രോജക്ട് ഈരുപയോഗ വ്യവസ്ഥയിൽ ക്രമീകരിക്കാം:

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

അത്ഭുതം, നമ്മുടെ വാസ്തുവിദ്യ വളരെ ശുദ്ധമായി രൂപകൽപന ചെയ്യാൻ കഴിയുന്നു.

ഉപകരണങ്ങൾ വിളിക്കുന്നത് എന്ത് തീർച്ചയായ ആശയമാണോ? ഒരു ഹാൻഡ്ലർ ഒരു ഉപകരണം വിളിക്കാൻ, ഏത് ഉപകരണമെങ്കിലും? അതെ, ശരിയാണ്, ഇതാ അവയ്ക്കുള്ള കോഡ്:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools എന്നത് ടൂൾ നാമങ്ങൾ key ആയി ഉള്ള ഒരു dictionary ആണ്
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
    // TODO ഉപകരണം വിളിക്കുക,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

മുകളിലുള്ള കോഡിൽ കാണുന്നതുപോലെ, നമ്മുടെ സ്റ്റൂൾ കോളിനുള്ള ഉപകരണം എങ്ങനെ വിശകലനം ചെയ്യിക്കണം, ഏത് arguments ഉപയോഗിച്ച് എന്നതും, ശേഷം ഉപകരണം വിളിക്കേണ്ടതും വേണ്ടിവരും.

## സാധുത ഉറപ്പാക്കലോടെയുള്ള സമീപനം മെച്ചപ്പെടുത്തൽ

ഇതുവരെ, ഉപകരണങ്ങൾ, വിഭവങ്ങൾ, പ്രോംപ്റ്റുകൾ ചേർക്കുന്നതിന് നിങ്ങൾ ചെയ്ത ഓരോ രജിസ്ട്രേഷനും ഈ രണ്ട് ഹാൻഡ്ലറുകൾ കൊണ്ട് മാറ്റം സാധ്യമാണ്. എന്തെല്ലാം വേണം ഇനി? ഉപകരണം ശരിയായ arguments-ഉടെ വിളിക്കപ്പെടുന്നുണ്ടെന്ന് ഉറപ്പാക്കാൻ ഏതെങ്കിലും സാധുത പരിശോധന ഉൾപ്പെടുത്തണം. ഓരോ റൺടൈംക്കും ഇതിന് തങ്ങളുടെ പരിഹാരങ്ങൾ ഉണ്ട്, ഉദാഹരണത്തിന് Python-ൽ Pydantic ഉപയോഗിക്കുന്നു, TypeScript-ൽ Zod. ആശയം ഇതാണ്:

- ഒരു സവിശേഷത (ഉപകരണം, വിഭവം, പ്രോംപ്റ്റ്) സൃഷ്ടിക്കുന്ന ലോജിക് അതിന്റെ സർക്കാർ ഫോളഡറിലേക്ക് മാറ്റുക.
- ഉടനടി ഉള്ള അപേക്ഷ സാധുത പരിശോധന നടത്തുക, ഉദാഹരണത്തിന് ഒരു ഉപകരണം വിളിക്കാനായി അറിയിക്കുന്ന അപേക്ഷ.

### ഒരു സവിശേഷത സൃഷ്ടിക്കാം

ഒരു സവിശേഷത സൃഷ്ടിക്കാൻ, അതിന്റെ ഫയൽ സൃഷ്ടിക്കണം അതിൽ ആ സവിശേഷതക്ക് ആവശ്യമായ നിർബന്ധിത ഫീൽഡുകൾ ശരിയാക്കിയിട്ടുണ്ടെന്ന് ഉറപ്പാക്കണം. ഫീൽഡുകൾ ഉപകരണങ്ങൾ, വിഭവങ്ങൾ, പ്രോംപ്റ്റുകൾ എന്നിവയിൽ വ്യത്യാസപ്പെടും.

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
        # പിഡാൻറിക് മോഡൽ ഉപയോഗിച്ച് ഇൻപുട്ട് പ്രമാണീകരിക്കുക
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: പിഡാൻറിക് ചേർക്കുക, അതിലൂടെ AddInputModel സൃഷ്ടിച്ച് args പ്രമാണീകരിക്കാൻ കഴിയും

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ഇവിടെ കാണിക്കുന്നതാണ് നാം ചേർക്കുന്നത്:

- Pydantic ഉപയോഗിച്ച് *schema.py* ഫയലിൽ `AddInputModel` എന്ന സ്കീമ സൃഷ്ടിക്കുക, രണ്ട് ഫീൽഡുകൾ `a`-യും `b`-യും ചേർത്ത്.
- അടിയന്തര അപേക്ഷയെ `AddInputModel` എന്നാണ് ഫോർമാറ്റ് പാഴ്‌സ് ചെയ്യാൻ ശ്രമിക്കുക, പാരാമീറ്ററുകളിൽ പൊരുത്തക്കേട് ഉണ്ടെങ്കിൽ ക്രാഷ് ആകും:

   ```python
   # add.py
    try:
        # പൈഡാന്റിക് മോഡൽ ഉപയോഗിച്ച് ഇൻപുട്ട് പരിശോധന നടത്തുക
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

ഈ പാഴ്സ് ലാജിക് ഉപകരണം വിളിക്കൽക്കൊപ്പം തന്നെ നടത്തണമോ അല്ലെങ്കിൽ ഹാൻഡ്ലർ ഫങ്ഷനിൽ തന്നെ നടത്തണമോ തിരഞ്ഞെടുക്കാം.

**TypeScript**

```typescript
// സെർവർ.ts
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

       // @ts-അവഗണിക്കുക
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

// സ്കീമ.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// ചേർക്കുക.ts
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

- എല്ലാ ഉപകരണം വിളിക്കൽ ബ്രാഞ്ചിൽ, വരും അപേക്ഷ ഉപകരണത്തിന്റെ നിർവചിച്ച സ്കീമയിൽ പാഴ്‌സ് ചെയ്യാൻ ശ്രമിക്കുന്നു:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ഇത് സഫലമായി നടത്തുകയാണെങ്കിൽ, ഞങ്ങൾ യഥാർത്ഥ ഉപകരണം വിളിക്കൽ തുടരുന്നു:

    ```typescript
    const result = await tool.callback(input);
    ```

കാണുന്നതുപോലെ, ഈ സമീപനം വലിയൊരു വാസ്തുവിദ്യം സൃഷ്ടിക്കുന്നു, చాలా അങ്ങിനെ *server.ts* വളരെ ചെറുതായ ഒരു ഫയലാണ്, അത് അഭ്യർത്ഥന ഹാൻഡ്ലറുകളെ ബന്ധിപ്പിക്കുന്നു മാത്രമേ ചെയ്യൂ, ഓരോ സവിശേഷത ഇതിന്റെ സ്വന്തം ഫോളഡറിൽ ഉണ്ട് - tools/, resources/, prompts/.

വല്ലാതെ നല്ലതാണ്, അടുത്തത് ഇത് നിർമ്മിക്കാൻ ശ്രമിക്കാം.

## വ്യായാമം: ലോ-ലവൽ സർവർ സൃഷ്ടിക്കൽ

ഈ വ്യായാമത്തിൽ, അങ്ങനെ ചെയ്യാൻ പോവുകയാണ്:

1. ഉപകരണം ലിസ്റ്റിങ്, ഉപകരണങ്ങൾ വിളിക്കൽ എന്നിവ കൈകാര്യം ചെയ്യുന്ന ലോ-ലവൽ സർവർ സൃഷ്ടിക്കുക.
1. നിങ്ങൾ നിർമ്മിക്കാൻ കഴിയും വാസ്തുവിദ്യം നടപ്പാക്കുക.
1. ഉപകരണങ്ങൾ വിളിക്കുന്നപ്പോൾ ശരിയായ പരിശോധന ഉറപ്പാക്കുക.

### -1- ഒരു വാസ്തുവിദ്യം സൃഷ്ടിക്കുക

കൂടുതൽ സവിശേഷതകൾ ചേർത്തുകൊണ്ട് വളരാൻ സഹായിക്കുന്ന ഒരു വാസ്തുവിദ്യം എന്നതാണു പരിഹരിക്കേണ്ടത്, അങ്ങനെ ഇത് കാണാം:

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

ഇപ്പോൾ ഞങ്ങൾ ഒരു വാസ്തുവിദ്യം സജ്ജമാക്കി, tools ഫോളഡറിൽ പുതിയ ഉപകരണങ്ങൾ ചേർക്കൽ വളരെ ലളിതമാണ്. വിഭവങ്ങൾക്കും പ്രോംപ്റ്റുകൾക്കും സബ്ഡയറക്ടറികൾ കൂട്ടിച്ചേർക്കാൻ സ്വതന്ത്രമായി തുടരൂ.

### -2- ഒരു ഉപകരണം സൃഷ്ടിക്കുക

അടുത്തതായി, ഒരു ഉപകരണം എങ്ങനെ സൃഷ്ടിക്കാമെന്ന് നോക്കാം. ആദ്യം, ഇത് *tools* സബ്ഡയറക്ടറിയിൽ സൃഷ്ടിക്കണം:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # പൈഡാന്റ്റിക് മോഡൽ ഉപയോഗിച്ച് ഇൻപുട്ട് പരിശോധന ചെയ്യുക
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: പൈഡാന്റ്റിക് ചേർക്കുക, അതുവഴി നാം ഒരു AddInputModel സൃഷ്ടിച്ച് аргുകൾ പരിശോധന ചെയ്യാം

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ഇവിടെ എന്താണ് കാണുന്നത് എന്ന് നോക്കാം: Pydantic ഉപയോഗിച്ച് name, description, input schema നിർവചിക്കുന്നു, കൈകാര്യം ചെയ്യുന്ന ഹാൻഡ്ലർ ഒരു ഫങ്ഷനായി ഉണ്ട്, ഈ ഉപകരണം വിളിക്കുമ്പോൾ ഹാൻഡ്ലർ പ്രവർത്തിക്കണം. അവസാനം, ഈ സവിശേഷതകൾ വഹിക്കുന്ന `tool_add` എന്ന ഡിക്ഷണറി പുറംപ്രദേശ് ആയി നൽകുന്നു.

*schema.py* ഉപയോഗിച്ച് ഉപകരണത്തിന് ഉപയോഗിക്കുന്ന ഇൻപുട്ട് സ്കീമ നിർവചിച്ചിരിക്കുന്നു:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

*__init__.py* ഫയൽ tools ഡയറക്ടറിയുടെ ഒരു മോഡ്യൂളായി പരിഗണിക്കപ്പെടുന്നുവെന്ന് ഉറപ്പാക്കുന്നതിന് അനുയോജ്യമായി തുറക്കണം. കൂടാതെ ഇതിൽ ഉള്ള മോഡ്യൂളുകൾ പ്രസ്താവിക്കണം ഇങ്ങനെ:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

കൂടുതൽ ഉപകരണങ്ങൾ ചേർക്കുമ്പോൾ ഈ ഫയലിൽ തുടക്കം ചെയ്യാം.

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

ഇവിടെ നമ്മുടെ ഡിക്ഷണറിയിൽ ഉള്ള ഗുണങ്ങൾ സൃഷ്ടിക്കുന്നു:

- name, ഉപകരണത്തിന്റെ പേര്.
- rawSchema, Zod സ്കീമ, ഇത് ഉപകരണം വിളിക്കുന്നതിനുള്ള വരവു അപേക്ഷകൾ പരിശോധിക്കാൻ ഉപയോഗിക്കുന്നു.
- inputSchema, ഹാൻഡ്ലർ ഉപയോഗിക്കുന്ന സ്കീമ.
- callback, ഉപകരണം പ്രവർത്തിപ്പിക്കാൻ ഉപയോഗിക്കുന്നു.

ഇതിനെ ഒരു തരം ആയി മാറിക്കുന്ന `Tool` ഉണ്ട്, ഇത് mcp server ഹാൻഡ്ലർ സ്വീകരിക്കാവുന്ന തരത്തിലാണ്, ഇപ്രകാരം:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

ഒരു ferramenta-ts* ഫയൽ ഉണ്ട്, ഇവിടെ ഓരോ ഉപകരണത്തിനുമുള്ള ഇൻപുട്ട് സ്കീമ സൂക്ഷിക്കുന്നു, ഇപ്പോൾ ഒരു സ്കീമ മാത്രമേ ഉള്ളു, എന്നാൽ ഉപകരണങ്ങൾ കൂടുതൽ ചേർക്കുമ്പോളും കൂടുതൽ എൻട്രിയാകാം:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

നന്ന്, ഇനി ഉപകരണങ്ങളുടെ ലിസ്റ്റിങ് കൈകാര്യമാക്കാം.

### -3- ഉപകരണങ്ങളുടെ ലിസ്റ്റിങ് കൈകാര്യം ചെയ്യുക

അടുത്തതായി, ഉപകരണങ്ങൾ ലിസ്റ്റ് ചെയ്യാൻ അഭ്യർത്ഥന കൈകാര്യം ചെയ്യലുകൾ സജ്ജമാക്കണം. ഇത് സർവർ ഫയലിൽ ചേർക്കേണ്ടതാണു:

**Python**

```python
# സംക്ഷിപ്തതക്ക് കോഡ് ഒഴിവാക്കിയിരിക്കുന്നു
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

ഇവിടെ `@server.list_tools` ഡെക്കറേറ്റർ ചേർക്കുകയും `handle_list_tools` ഫങ്ഷൻ നടപ്പാക്കുകയും ചെയ്യുന്നു. അത് ഒരു ഉപകരണങ്ങളുടെ പട്ടിക നൽകണം. ഓരോ ഉപകരണത്തിനും name, description, inputSchema ആവശ്യമാണ്.   

**TypeScript**

ഉപകരണങ്ങൾ ലിസ്റ്റ് ചെയ്യുന്നതിനുള്ള അഭ്യർത്ഥന ഹാൻഡ്ലർ സജ്ജമാക്കാൻ, `setRequestHandler` സർവറിൽ വിളിക്കേണ്ടതാണ്, ഇത് `ListToolsRequestSchema` സ്കീമ ഉപയോഗിക്കും. 

```typescript
// ഇൻഡക്‌സ്.ts
import addTool from "./add.js";
import subtractTool from "./subtract.js";
import {server} from "../server.js";
import { Tool } from "./tool.js";

export let tools: Array<Tool> = [];
tools.push(addTool);
tools.push(subtractTool);

// സർവർ.ts
// സാരാംശത്തിനായി കോഡ് ഒഴിവാക്കി
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // രജിസ്റ്റർ ചെയ്ത ഉപകരണങ്ങളുടെ പട്ടിക മടക്കി നൽകുക
  return {
    tools: tools
  };
});
```

നന്നായിരിക്കുന്നു, ഇനി ഉപകരണങ്ങൾ വിളിക്കുന്ന ഭാഗം നോക്കാം.

### -4- ഒരു ഉപകരണം വിളിക്കൽ കൈകാര്യം ചെയ്യുക

ഉപകരണം വിളിക്കാൻ മറ്റൊരു അഭ്യർത്ഥന ഹാൻഡ്ലർ സജ്ജമാക്കണം, ഇത് പറയുന്ന സവിശേഷത ഏത് കോൾ ചെയ്യണമെന്നാണ് അറിയിക്കേണ്ടത്, കൂടാതെ.Arguments എന്തെല്ലാമാണ് എന്നതും ഉൾക്കൊള്ളണം.

**Python**

`@server.call_tool` ഡെക്കറേറ്റർ ഉപയോഗിച്ച് `handle_call_tool` എന്ന ഫങ്ഷൻ നടപ്പാക്കാം. ഈ ഫങ്ഷനിൽ ഉപകരണം പേരും അതിന്റെ argument-കളും പാഴ്‌സ് ചെയ്യണം, ശരിയാണെങ്കിൽ തുടരണം. arguments പരിശോധിക്കൽ ഈ ഫങ്ഷനിൽ അല്ലെങ്കിൽ ഉപകരണത്തിലും നടത്താവുന്നതാണ്.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools എന്നത് ടൂൾ നാമങ്ങൾ കീകൾ ആയി ഉള്ള ഒരു ഡിക്ഷണറിയാണ്
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # ടൂൾ പ്രവർത്തിപ്പിക്കുക
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

സംഭവിക്കുന്നത് ഇപ്രകാരമാണ്:

- `name` എന്ന ഇൻപുട്ട് പാരാമീറ്റർ നമ്മുടെ ഉപകരണത്തിന്റെ പേര് ദ്രുഷ്ടത്തിലുണ്ട്, `arguments` ഡിക്ഷണറിയിലുമാണ് കോൺഫിഗർ ചെയ്തത്.

- `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` എന്ന രീതിയിൽ ഉപകരണം വിളിക്കുന്നു. arguments പരിശോധിക്കൽ `handler` ഫങ്ഷനിൽ നടക്കും, പരാജയം സംഭവിച്ചാൽ exception ഉയരും.

ഇതുവഴി ലോ-ലവൽ സർവർ ഉപയോഗിച്ച് ഉപകരണങ്ങൾ ലിസ്റ്റ് ചെയ്യലും വിളിക്കലും പൂർണ്ണമായി മനസ്സിലാക്കി.

[സമ്പൂർണ്ണ ഉദാഹരണം കാണുക](./code/README.md)

## ചുമതല

നിങ്ങൾ ലഭിച്ച കോഡിന് പല ഉപകരണങ്ങളും, വിഭവങ്ങളും, പ്രോംപ്റ്റുകളും ചേർത്ത് നോക്കുക, നിങ്ങൾ ഇവിടെ ശ്രദ്ധിക്കും എന്നതാണ് tools ഡയറക്ടറിയിൽ ഫയലുകൾ മാത്രം ചേർക്കേണ്ടതാണെന്നും മറ്റെവിടെയും ആവശ്യം ഇല്ലെന്നും. 

*ഉത്തരം നൽകിയിട്ടില്ല*

## സംക്ഷേപം

ഈ അധ്യായത്തിൽ, ലോ-ലവൽ സർവർ സമീപനം എങ്ങനെ പ്രവർത്തിക്കുന്നുവെന്നും അതിലൂടെ നന്മയുള്ള ഒരു വാസ്തുവിദ്യം സൃഷ്ടിക്കാനാവുമെന്നും കണ്ട്. കൂടാതെ സാധുത പരിശോധനയും പിന്നീട് ഉൾപ്പെടുത്തിയിട്ടുണ്ട്, ഇൻപുട്ട് സാധുതയിലേക്കുള്ള സ്കീമകൾ നിർമ്മിക്കാൻ സാധുത ലൈബ്രറികൾ എങ്ങനെ ഉപയോഗിക്കാമെന്നിലൂം കാണിച്ചു.

## അടുത്തത് എന്ത്

- അടുത്തത്: [സാധാരണ പ്രാമാണീകരണം](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അറിയിപ്പ്**:
ഈ രേഖ AI പരിഭാഷാ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിക്കുന്നുവെങ്കിലും, ഓട്ടോമേറ്റഡ് പരിഭാഷകളിൽ പിഴവുകൾ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്. അതിന്റെ സ്വാഭാവിക ഭാഷയിലുള്ള അസൽ രേഖയാണ് പ്രാമാണികമായ ഉറവിടമായി പരിഗണിക്കേണ്ടത്. നിർണായകമായ വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർശ ചെയ്യുന്നു. ഈ പരിഭാഷ ഉപയോഗിച്ച് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾ അല്ലെങ്കിൽ തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കായി ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->