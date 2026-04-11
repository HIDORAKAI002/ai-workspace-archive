# Advanced na paggamit ng server

May dalawang magkaibang uri ng server na inilalantad sa MCP SDK, ang iyong karaniwang server at ang low-level na server. Karaniwan, gagamitin mo ang regular na server para magdagdag ng mga tampok dito. Para sa ilang kaso, gusto mong umasa sa low-level na server tulad ng:

- Mas mahusay na arkitektura. Posibleng lumikha ng malinis na arkitektura gamit ang parehong regular na server at low-level na server ngunit maaring mas madaling gawin ito gamit ang low-level na server.
- Availability ng tampok. Ang ilang mga advanced na tampok ay maaari lamang gamitin gamit ang low-level na server. Makikita mo ito sa mga susunod na kabanata habang nagdaragdag tayo ng sampling at elicitation.

## Regular na server kumpara sa low-level na server

Ganito ang hitsura ng paglikha ng MCP Server gamit ang regular na server

**Python**

```python
mcp = FastMCP("Demo")

# Magdagdag ng isang kasangkapan para sa pagdaragdag
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

// Magdagdag ng isang pandagdag na kasangkapan
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

Ang punto ay nagdadagdag ka ng bawat tool, resource o prompt na nais mong magkaroon ang server nang hayagan. Walang mali doon.

### Paraan ng low-level na server

Gayunpaman, kapag ginamit mo ang low-level na paraan ng server, kailangan mong isipin ito nang iba. Sa halip na magrehistro ng bawat tool, lumikha ka ng dalawang handler kada uri ng tampok (tools, resources o prompts). Halimbawa, sa mga tool ay may dalawang function lamang tulad ng:

- Paglista ng lahat ng tools. Isang function ang responsable sa lahat ng pagsubok na maglista ng mga tool.
- Pamahalaan ang pagtawag sa lahat ng tools. Dito rin, isang function lang ang humahawak sa pagtawag sa tool.

Mukhang mas kaunti ang trabaho, di ba? Kaya sa halip na magrehistro ng tool, kailangan ko lang siguraduhin na nakalista ang tool kapag nililista ko ang lahat ng tools at tinatawag ito kapag may papasok na kahilingan na tumawag ng tool.

Tingnan natin kung paano ngayon ang hitsura ng code:

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
  // Ibalik ang listahan ng mga nakarehistrong kagamitan
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

Dito ay may isang function tayo na nagbabalik ng listahan ng mga tampok. Bawat entry sa listahan ng tools ay may mga field tulad ng `name`, `description` at `inputSchema` para sumunod sa return type. Pinapayagan tayo nitong ilagay ang ating mga tool at depinisyon ng tampok sa ibang lugar. Maaari na nating likhain ang lahat ng tools sa isang tools folder at ganoon din sa lahat ng iyong mga tampok kaya ang iyong proyekto ay maaaring maging maayos na nakaayos tulad ng:

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

Maganda, ang ating arkitektura ay maaaring gawing malinis ang itsura.

Paano naman ang pagtawag sa tools, pareho lang ba ang ideya, isang handler lang para tawagin ang anumang tool? Oo, eksakto, ito ang code para doon:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # ang tools ay isang diksyunaryo na may mga pangalan ng kasangkapan bilang mga susi
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
    // TODO tawagan ang tool,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Makikita mo sa code sa itaas, kailangan nating i-parse ang tool na tatawagin, at kung anong mga argumento, tapos kailangan nating ipagpatuloy ang pagtawag sa tool.

## Pagpapahusay ng paraan gamit ang validation

Hanggang ngayon, nakita mo kung paano mapapalitan ang lahat ng iyong rehistrasyon upang magdagdag ng tools, resources at prompts gamit ang dalawang handlers na ito kada uri ng tampok. Ano pa ang kailangan nating gawin? Dapat tayong magdagdag ng anumang uri ng validation upang matiyak na tinatawag ang tool gamit ang tamang mga argumento. Bawat runtime ay may sariling solusyon para dito, halimbawa Python ay gumagamit ng Pydantic at TypeScript ay gumagamit ng Zod. Ang ideya ay gawin natin ang mga sumusunod:

- Ilipat ang lohika sa paglikha ng tampok (tool, resource o prompt) sa sariling dedikadong folder nito.
- Magdagdag ng paraan upang i-validate ang papasok na request na, halimbawa, tumatawag ng tool.

### Gumawa ng tampok

Para gumawa ng tampok, kailangan nating gumawa ng file para sa tampok na iyon at siguraduhin na mayroon itong mga mandatory na field na kinakailangan ng tampok. Ang mga field ay bahagyang nagkakaiba sa tools, resources at prompts.

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
        # Suriin ang input gamit ang Pydantic model
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: magdagdag ng Pydantic, para makagawa tayo ng AddInputModel at masuri ang mga argumento

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

dito makikita mo kung paano namin ginagawa ang mga sumusunod:

- Gumawa ng schema gamit ang Pydantic `AddInputModel` na may mga field na `a` at `b` sa file na *schema.py*.
- Subukan i-parse ang papasok na request bilang uri na `AddInputModel`, kung may mismatch sa mga parameter ay magka-crash ito:

   ```python
   # add.py
    try:
        # Patunayan ang input gamit ang Pydantic na modelo
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Maaari mong piliing ilagay ang parsing logic na ito mismo sa pagtawag ng tool o sa handler function.

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

- Sa handler na humahawak sa lahat ng pagtawag sa tool, sinusubukan nating i-parse ang papasok na request sa schema na tinukoy ng tool:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    kung gumana ito, ipagpapatuloy natin ang pagtawag sa aktwal na tool:

    ```typescript
    const result = await tool.callback(input);
    ```

Makikita mo, ang paraang ito ay lumilikha ng maganda at maayos na arkitektura dahil lahat ay may lugar, ang *server.ts* ay isang napakaliit na file na nag-uugnay lamang sa mga request handler at bawat tampok ay nasa kani-kanilang folder gaya ng tools/, resources/ o /prompts.

Maganda, subukan natin itong buuin na.

## Ehersisyo: Paglikha ng low-level na server

Sa ehersisyong ito, gagawin natin ang mga sumusunod:

1. Lumikha ng low-level na server na humahawak sa paglista ng tools at pagtawag ng tools.
1. Ipatupad ang arkitekturang maaari mong pagbuunan ng karagdagang mga tampok.
1. Magdagdag ng validation upang matiyak na wastong na-validate ang mga pagtawag sa iyong tool.

### -1- Gumawa ng arkitektura

Ang unang bagay na kailangan nating tugunan ay isang arkitekturang tumutulong sa pag-scale habang nagdaragdag tayo ng mas maraming tampok, ganito ang hitsura nito:

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

Ngayon ay nakagawa na tayo ng arkitekturang nagsisiguro na madali tayong makakadagdag ng mga bagong tools sa isang tools folder. Malayang sundan ito upang magdagdag ng mga subdirectory para sa resources at prompts.

### -2- Paggawa ng tool

Tingnan natin kung ano ang hitsura ng paggawa ng tool. Una, kailangan itong gawin sa ilalim ng *tool* na subdirectory tulad ng:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # I-validate ang input gamit ang Pydantic na modelo
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: magdagdag ng Pydantic, para makagawa tayo ng AddInputModel at ma-validate ang mga args

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Dito makikita kung paano namin dine-define ang pangalan, paglalarawan, at input schema gamit ang Pydantic at isang handler na tatawagin sa oras na tawagin ang tool na ito. Sa huli, inia-expose namin ang `tool_add` na isang dictionary na naglalaman ng lahat ng mga propertie na ito.

Mayroon ding *schema.py* na ginagamit para i-define ang input schema na ginagamit ng ating tool:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Kailangan din nating lagyan ng laman ang *__init__.py* upang matiyak na ang tools directory ay tinitingnan bilang module. Bukod pa rito, kailangan nating i-expose ang mga module sa loob nito tulad nito:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Patuloy natin itong madadagdagan habang nagdadagdag tayo ng mas maraming tools.

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

Dito gumawa tayo ng dictionary na binubuo ng mga properties:

- name, ito ang pangalan ng tool.
- rawSchema, ito ang Zod schema, gagamitin ito para i-validate ang mga papasok na kahilingan na tumawag sa tool na ito.
- inputSchema, ang schema na ito ay gagamitin ng handler.
- callback, ito ang ginagamit para ipatawag ang tool.

Mayroon din `Tool` na ginagamit para i-convert ang dictionary na ito sa uri na matatanggap ng mcp server handler at ganito ang hitsura nito:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

At mayroon ding *schema.ts* kung saan ini-store natin ang mga input schemas para sa bawat tool na ganito ang itsura kahit isa pa lang ang schema ngayon pero habang nagdadagdag tayo ng tools ay madadaganan natin ng mga entry:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Maganda, magpatuloy tayo sa paghawak ng paglista ng tools.

### -3- Pangasiwaan ang paglista ng tool

Sunod, para hawakan ang paglista ng tools, kailangan nating gumawa ng request handler para dito. Ito ang kailangan nating idagdag sa ating server file:

**Python**

```python
# inalis ang code para sa ikinababawas ng haba
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

Dito, idinagdag natin ang decorator na `@server.list_tools` at ang implementing function na `handle_list_tools`. Sa huli, kailangan nating gumawa ng listahan ng mga tool. Pansinin na ang bawat tool ay kailangang may pangalan, paglalarawan at inputSchema.

**TypeScript**

Para i-set up ang request handler para maglista ng tools, kailangan nating tawagan ang `setRequestHandler` sa server gamit ang schema na angkop sa ginagawa natin, sa kasong ito ay `ListToolsRequestSchema`.

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
// code tinanggal para sa maigsiang paliwanag
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Ibalik ang listahan ng mga rehistradong kasangkapan
  return {
    tools: tools
  };
});
```

Maganda, naresolba na natin ang bahagi ng paglista ng tools, tingnan natin paano naman tayo tatawag ng tools.

### -4- Pangasiwaan ang pagtawag sa isang tool

Para tumawag ng tool, kailangan nating gumawa ng isa pang request handler, na nakatuon sa paghawak ng request na nagsasaad kung aling tampok ang tatawagin at kung anong mga argumento.

**Python**

Gamitin natin ang decorator na `@server.call_tool` at ipatupad ito gamit ang function gaya ng `handle_call_tool`. Sa loob ng function na iyon, kailangan nating i-parse ang pangalan ng tool, ang kanyang argumento at tiyakin na ang mga argumento ay valid para sa tool na tinutukoy. Maaari nating i-validate ang mga argumento dito o sa mas downstream sa aktwal na tool.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # ang tools ay isang diksyunaryo na may mga pangalan ng kasangkapan bilang mga susi
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # tawagin ang kasangkapan
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Ganito ang nangyayari:

- Ang pangalan ng tool ay naroon na bilang input parameter `name` na totoo para sa ating mga argumento sa anyo ng `arguments` dictionary.

- Ang tool ay tinatawag gamit ang `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Nangyayari ang validation ng mga argumento sa `handler` property na tumutukoy sa isang function, kung mabigo ito ay magtataas ng exception.

Ayan, ngayon ay may buong pag-unawa na tayo sa paglista at pagtawag ng tools gamit ang low-level na server.

Tingnan ang [buong halimbawa](./code/README.md) dito

## Takdang Aralin

Palawakin ang code na ibinigay sa iyo gamit ang ilang mga tools, resources at prompt at pagnilayan kung paano mo mapapansin na kailangan mo lang magdagdag ng mga files sa tools directory at wala nang iba pa.

*Walang ibinigay na solusyon*

## Buod

Sa kabanatang ito, nakita natin kung paano gumagana ang low-level na paraan ng server at kung paano nito matutulungan tayong lumikha ng maganda at maayos na arkitektura na maaari nating ipagpatuloy na pagbuo. Tinalakay din natin ang validation at ipinakita kung paano gamitin ang mga validation libraries para gumawa ng mga schema para sa input validation.

## Ano ang Susunod

- Susunod: [Simple Authentication](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:  
Ang dokumentong ito ay isinalin gamit ang serbisyong AI na pagsasalin na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagamat nagsusumikap kami para sa katumpakan, pakitandaan na ang mga awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi tumpak na impormasyon. Ang orihinal na dokumento sa kanyang likas na wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasaling-tao. Hindi kami mananagot para sa anumang hindi pagkakaintindihan o maling pagpapakahulugan na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->