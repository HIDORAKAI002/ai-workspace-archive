# Advanced na paggamit ng server

Mayroong dalawang iba't ibang uri ng mga server na inilalantad sa MCP SDK, ang iyong normal na server at ang low-level na server. Karaniwan, gagamitin mo ang regular na server para magdagdag ng mga tampok dito. Sa ilang mga kaso, nais mong umasa sa low-level na server tulad ng:

- Mas magandang arkitektura. Posible na gumawa ng malinis na arkitektura gamit ang parehong regular na server at low-level na server ngunit maaring mas madaling gawin ito gamit ang low-level na server.
- Availability ng tampok. Ang ilang mga advanced na tampok ay maaari lamang gamitin sa low-level na server. Makikita mo ito sa mga susunod na kabanata habang nagdadagdag tayo ng sampling (deprecated sa `2026-07-28` na release candidate) at elicitation.

## Regular na server vs low-level na server

Ganito ang hitsura ng paggawa ng MCP Server gamit ang regular na server

**Python**

```python
mcp = FastMCP("Demo")

# Magdagdag ng isang kasangkapang pandagdag
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

// Magdagdag ng isang karagdagang kagamitan
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

Ang punto ay ikaw ay malinaw na nagdadagdag ng bawat tool, resource o prompt na nais mong magkaroon ang server. Walang mali dito.  

### Low-level na paraan ng server

Gayunpaman, kapag ginamit mo ang low-level na paraan ng server kailangan mong isipin ito nang iba. Sa halip na irehistro ang bawat tool, gumagawa ka ng dalawang handler kada uri ng tampok (tools, resources o prompts). Halimbawa, ang mga tool ay may dalawang function lamang tulad nito:

- Paglilista ng lahat ng mga tool. Isang function ang responsable para sa lahat ng pagtatangka para ilista ang mga tool.
- pamahalaan ang pagtawag sa lahat ng mga tool. Dito rin, isang function lang ang humahawak ng pagtawag sa isang tool.

Parang mas kaunti ang trabaho diba? Kaya sa halip na magrehistro ng tool, kailangang tiyakin ko lang na ang tool ay naka-lista kapag inililista ko lahat ng mga tool at tinatawag ito kapag may papasok na kahilingan na tawagan ang tool. 

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
  // Ibalik ang listahan ng mga rehistradong kasangkapan
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

Dito ay may function tayo na nagbabalik ng listahan ng mga tampok. Bawat entry sa listahan ng tools ngayon ay may mga field tulad ng `name`, `description` at `inputSchema` upang sumunod sa uri ng return. Pinapayagan tayo nito na ilagay ang ating mga tool at depinisyon ng tampok sa ibang lugar. Maaari na nating likhain lahat ng ating mga tool sa isang tools folder at ganoon din ang lahat ng iyong mga feature kaya biglaang magiging maayos ang iyong proyekto na ganito:

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

Mahusay, ang ating arkitektura ay maaaring gawin na mukhang malinis.

Paano naman ang pagtawag ng mga tool, pareho ba ang ideya, isang handler lang para tawagan ang tool, alin mang tool? Oo, eksakto, narito ang code para dito:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # ang tools ay isang diksyunaryo na may mga pangalan ng tool bilang mga susi
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

Tulad ng makikita mula sa itaas na code, kailangan nating hatiin kung aling tool ang tatawagin, at sa anong mga argumento, at pagkatapos ay kailangan nating ituloy ang pagtawag sa tool.

## Pagpapabuti ng paraan gamit ang pag-validate

Sa ngayon, nakita mo kung paano ang lahat ng iyong mga rehistrasyon upang magdagdag ng mga tools, resources at prompts ay maaaring palitan ng dalawang handler para sa bawat uri ng tampok. Ano pa ang kailangan nating gawin? Dapat tayong magdagdag ng ilang anyo ng pag-validate upang matiyak na ang tool ay tinatawag na may tamang mga argumento. Bawat runtime ay may kanya-kanyang solusyon para dito, halimbawa gumagamit ang Python ng Pydantic at gumagamit ang TypeScript ng Zod. Ang ideya ay ganito:

- Ilipat ang lohika para sa paggawa ng tampok (tool, resource o prompt) sa nakalaang folder nito.
- Magdagdag ng paraan para i-validate ang papasok na kahilingan na humihiling na halimbawa tawagan ang isang tool.

### Gumawa ng tampok

Para gumawa ng tampok, kailangan nating gumawa ng isang file para sa tampok na iyon at tiyakin na mayroon itong mga mahahalagang field na kinakailangan ng tampok na iyon. Nagkakaiba ng kaunti ang mga field sa pagitan ng tools, resources at prompts.

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
        # Suriin ang input gamit ang modelong Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: idagdag ang Pydantic, upang makagawa tayo ng AddInputModel at masuri ang mga args

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

dito makikita mo kung paano natin ginagawa ang mga sumusunod:

- Gumawa ng schema gamit ang Pydantic `AddInputModel` na may mga field na `a` at `b` sa file na *schema.py*.
- Subukan i-parse ang papasok na kahilingan na maging uri ng `AddInputModel`, kung mayroong hindi pagtutugma sa mga parameter ito ay mag-ca-crash:

   ```python
   # add.py
    try:
        # Suriin ang input gamit ang modelong Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Maaari mong piliin kung ilalagay ang parsing logic na ito sa mismong pagtawag ng tool o sa handler function.

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

- Sa handler na humahawak ng lahat ng pagtawag sa tool, ngayon sinusubukan nating i-parse ang papasok na kahilingan sa schema na tinukoy ng tool:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    kung matagumpay iyon ay itutuloy natin ang pagtawag sa aktwal na tool:

    ```typescript
    const result = await tool.callback(input);
    ```

Tulad ng makikita, ang paraang ito ay lumilikha ng magandang arkitektura dahil bawat bagay ay may sariling lugar, ang *server.ts* ay isang maliit na file lamang na nag-uugnay sa mga handler ng request at bawat tampok ay nasa kani-kanilang folder tulad ng tools/, resources/ o /prompts.

Mahusay, subukan nating buuin ito susunod.

## Ehersisyo: Paggawa ng low-level na server

Sa ehersisyong ito, gagawin natin ang mga sumusunod:

1. Gumawa ng low-level na server na humahawak ng paglilista ng mga tool at pagtawag ng mga tool.
1. Magpatupad ng arkitektura na maaari mong gamitin bilang pundasyon.
1. Magdagdag ng pag-validate upang matiyak na tama ang pag-validate ng iyong mga tawag sa tool.

### -1- Gumawa ng arkitektura

Ang unang bagay na kailangang tugunan ay isang arkitektura na tumutulong sa atin na mag-scale habang nagdadagdag tayo ng mas maraming tampok, ganito ang itsura nito:

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

Ngayon ay nakapagtakda tayo ng arkitektura na tinitiyak na madali tayo makakapagdagdag ng mga bagong tools sa isang tools folder. Malaya kang sundan ito para magdagdag ng mga subdirectory para sa resources at prompts.

### -2- Gumawa ng tool

Tingnan natin kung paano gumawa ng tool. Una, kailangang gawin ito sa sariling subdirectory nito sa *tool* tulad nito:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # I-validate ang input gamit ang Pydantic na modelo
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: idagdag ang Pydantic, upang makagawa tayo ng AddInputModel at i-validate ang mga argumento

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Ang nakikita natin dito ay kung paano natin tinutukoy ang pangalan, paglalarawan, at input schema gamit ang Pydantic at isang handler na tatawagin kapag tinawag ang tool na ito. Sa huli, inilalantad natin ang `tool_add` na isang dictionary na naglalaman ng lahat ng mga property na ito.

Meron ding *schema.py* na ginagamit para tukuyin ang input schema ng tool:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Kailangan din nating punan ang *__init__.py* upang matiyak na ang tools directory ay itinuturing bilang isang module. Bukod dito, kailangang ilantad ang mga module sa loob nito tulad nito:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Maaari nating patuloy na dagdagan ang file na ito habang nagdaragdag tayo ng mas marami pang mga tools.

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

Dito gumawa tayo ng isang dictionary na binubuo ng mga property:

- name, ito ang pangalan ng tool.
- rawSchema, ito ang schema ng Zod, gagamitin ito para i-validate ang mga papasok na kahilingan para tawagan ang tool na ito.
- inputSchema, gagamitin ng handler ang schema na ito.
- callback, ito ay ginagamit para tawagin ang tool.

Meron ding `Tool` na ginagamit upang i-convert ang dictionary na ito sa uri na maaaring tanggapin ng mcp server handler at ganito ang itsura nito:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

At mayroon tayong *schema.ts* kung saan iniimbak natin ang mga input schema para sa bawat tool, ganito ang hitsura nito na may iisang schema sa ngayon ngunit habang nagdaragdag tayo ng mga tools maaari tayong magdagdag ng mas marami pang entry:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Mahusay, magpatuloy tayo upang hawakan ang paglilista ng ating mga tool susunod.

### -3- Hawakan ang paglilista ng mga tool

Susunod, para hawakan ang paglilista ng ating mga tool, kailangan nating mag-set up ng request handler para dito. Ganito ang kailangan nating idagdag sa ating server file:

**Python**

```python
# ang code ay nilaktawan para sa pagiging maikli
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

Dito, idinagdag natin ang decorator na `@server.list_tools` at ang implementation function na `handle_list_tools`. Sa huli, kailangan nating mag-produce ng listahan ng mga tool. Pansinin na bawat tool ay kailangang may pangalan, paglalarawan at inputSchema.   

**TypeScript**

Para mag-set up ng request handler para sa paglilista ng mga tool, kailangan nating tawagin ang `setRequestHandler` sa server na may schema na angkop sa gusto nating gawin, sa kasong ito `ListToolsRequestSchema`. 

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
// Inalis ang code para sa pagiging maikli
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Ibabalik ang listahan ng mga nakarehistrong kasangkapan
  return {
    tools: tools
  };
});
```

Mahusay, ngayon ay nalutas na natin ang bahagi ng paglilista ng mga tool, tingnan natin kung paano tayo tatawag ng mga tool susunod.

### -4- Hawakan ang pagtawag ng tool

Para tawagan ang isang tool, kailangan nating mag-set up ng isa pang request handler, sa pagkakataong ito nakatuon sa paghawak ng kahilingan na nagtutukoy kung aling tampok ang tatawagin at sa anong mga argumento.

**Python**

Gamitin natin ang decorator na `@server.call_tool` at ipatupad ito gamit ang function na tulad ng `handle_call_tool`. Sa loob ng function na iyon, kailangan nating i-parse ang pangalan ng tool, ang argumento nito at tiyakin na ang mga argumento ay wasto para sa tool na iyon. Maaari nating i-validate ang mga argumento sa function na ito o sa mismong tool sa ibaba.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # ang tools ay isang diksyunaryo na may mga pangalan ng tool bilang mga susi
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # tawagin ang tool
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Ganito ang nangyayari:

- Ang pangalan ng tool ay naroroon na bilang input parameter `name` na totoo para sa ating mga argumento sa anyo ng `arguments` na dictionary.

- Tinatawag ang tool gamit ang `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Ang pag-validate ng mga argumento ay nagaganap sa `handler` property na tumutukoy sa isang function, kung mabigo ito ay magtataas ng exception. 

Ayan, ngayon ay may buong pag-unawa na tayo sa paglilista at pagtawag ng mga tool gamit ang low-level na server.

Tingnan ang [buong halimbawa](./code/README.md) dito

## Takdang-Aralin

Palawakin ang code na ibinigay sa iyo ng maraming mga tools, resources at prompt at pagnilayan kung paano mo mapapansin na kailangan mo lamang magdagdag ng mga files sa tools directory at wala nang iba pa. 

*Walang ibinigay na solusyon*

## Buod

Sa kabanatang ito, nakita natin kung paano gumana ang low-level na paraan ng server at kung paano nito matutulungan tayong gumawa ng magandang arkitektura na maaari nating patuloy na buuin. Tinalakay din natin ang pag-validate at ipinakita kung paano gumamit ng mga validation library upang gumawa ng mga schema para sa pag-validate ng input.

## Ano ang Susunod

- Susunod: [Simple Authentication](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->