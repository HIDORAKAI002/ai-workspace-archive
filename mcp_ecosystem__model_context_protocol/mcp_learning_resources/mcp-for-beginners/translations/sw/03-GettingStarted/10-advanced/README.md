# Matumizi ya juu ya seva

Kuna aina mbili tofauti za seva zilizowekwa wazi katika MCP SDK, seva yako ya kawaida na seva ya ngazi ya chini. Kawaida, ungeweza kutumia seva ya kawaida kuongeza vipengele kwake. Hata hivyo, kwa baadhi ya kesi, unataka kutegemea seva ya ngazi ya chini kama vile:

- Miundo bora. Inawezekana kuunda usanifu safi kwa kutumia seva ya kawaida na seva ya ngazi ya chini lakini inaweza kudaiwa kuwa ni rahisi kidogo kutumia seva ya ngazi ya chini.
- Upatikanaji wa vipengele. Vipengele vingine vya juu vinaweza kutumika tu kwa seva ya ngazi ya chini. Utaona hili katika sura za baadaye tunapoongeza sampuli (imepitwa na wakati katika mguso wa utoaji `2026-07-28`) na utambuzi.

## Seva ya kawaida vs seva ya ngazi ya chini

Hivi ndivyo muundo wa kuunda Seva ya MCP kwa seva ya kawaida

**Python**

```python
mcp = FastMCP("Demo")

# Ongeza chombo cha kuongeza
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

// Ongeza chombo cha kuongeza
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

Hii ina maana kwamba unaongeza wazi zana, rasilimali au maonesho yoyote unayotaka seva iwe nayo. Hakuna kosa kwa hilo.  

### Mbinu ya seva ya ngazi ya chini

Hata hivyo, unapojumuisha seva ya ngazi ya chini unahitaji kuifikiria tofauti. Badala ya kusajili kila chombo, unaunda wataalamu wawili kwa kila aina ya kipengele (zana, rasilimali au maonesho). Kwa mfano, zana zina kazi mbili tu kama ifuatavyo:

- Kupanga zana zote. Kazi moja itahusika na jitihada zote za kuorodhesha zana.
- Kusimamia kuita zana zote. Hapa pia kuna kazi moja tu inayosimamia miito ya chombo.

Hiyo inahisi kama kazi kidogo sivyo? Kwa hivyo badala ya kusajili chombo, ninahitaji tu kuhakikisha kuwa chombo kimeorodheshwa ninaporodhesha zana zote na kinapoitwa wakati kuna ombi linalokuja la kuitwa chombo. 

Tuchunguze sasa jinsi msimbo unavyoonekana:

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
  // Rudisha orodha ya zana zilizosajiliwa
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

Sasa tuna kazi inayorudisha orodha ya vipengele. Kila ingizo katika orodha ya zana sasa lina sehemu kama `name`, `description` na `inputSchema` kuhakikisha aina ya kurudisha. Hii inaturuhusu kuweka zana zetu na ufafanuzi wa kipengele mahali pengine. Tunaweza sasa kuunda zana zetu zote katika jalada la zana na hivyo hivyo kwa vipengele vyako vyote ili mradi wako uandaliwe kama ifuatavyo:

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

Hiyo ni nzuri, usanifu wetu unaweza kuonekana safi sana.

Je kuhusu kuitwa zana, ni wazo moja vile basi, mtoaji mmoja wa matukio kuita chombo, chombo chochote? Ndiyo, kabisa, haya ni msimbo wa hiyo:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # zana ni kamusi yenye majina ya zana kama funguo
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
    
    // hoja: request.params.arguments
    // TODO ita simu chombo hicho,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Kama unaweza kuona kutoka kwenye msimbo ulio juu, tunahitaji kuchambua zana itakayoitwa, na kwa hoja gani, kisha tunaendelea kuitwa kwa chombo hicho.

## Kuboresha mbinu na uthibitishaji

Hadi sasa, umeona jinsi usajili wako wote wa kuongeza zana, rasilimali na maonesho unaweza kubadilishwa na wataalamu hawa wawili kwa kila aina ya kipengele. Je, tunahitaji kufanya nini zaidi? Naam, tunapaswa kuongeza aina fulani ya uthibitishaji kuhakikisha kuwa chombo kinaitwa kwa hoja sahihi. Kila runtime ina suluhisho lake, kwa mfano Python hutumia Pydantic na TypeScript hutumia Zod. Dhana ni kufanya yafuatayo:

- Hamisha mantiki ya kuunda kipengele (chombo, rasilimali au maonesho) kwenye jalada lake la kujitolea.
- Ongeza njia ya kuthibitisha ombi linalokuja kuomba kwa mfano kuita chombo.

### Unda kipengele

Kuunda kipengele, tutahitaji kuunda faili kwa kipengele hicho na kuhakikisha kina sehemu za lazima zinazohitajika kwa kipengele hicho. Sehemu hizi hubadilika kidogo kati ya zana, rasilimali na maonesho.

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
        # Thibitisha ingizo kwa kutumia modeli ya Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: ongeza Pydantic, ili tuweze kuunda AddInputModel na kuthibitisha hoja

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

hapa unaweza kuona jinsi tunavyofanya yafuatayo:

- Tengeneza skema kutumia Pydantic `AddInputModel` yenye sehemu `a` na `b` katika faili *schema.py*.
- Jaribu kuchambua ombi linalokuja kuwa la aina `AddInputModel`, kama kuna tofauti katika vigezo hii itasababisha hitilafu:

   ```python
   # add.py
    try:
        # Thibitisha ingizo kwa kutumia mfano wa Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Unaweza kuchagua kuweka mantiki hii ya kuchambua katika wito la zana yenyewe au katika kazi ya mtoaji.

**TypeScript**

```typescript
// seva.ts
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

// mpango.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// ongeza.ts
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

- Katika kazi inayosimamia miito yote ya zana, sasa tunajaribu kuchambua ombi linalokuja kwenye skema iliyofafanuliwa ya zana:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ikiwa hiyo itafanya kazi basi tunaendelea kuita chombo halisi:

    ```typescript
    const result = await tool.callback(input);
    ```

Kama unavyoona, njia hii huunda usanifu mzuri kwani kila kitu kiko mahali pake, *server.ts* ni faili ndogo sana inayounganisha mtoaji wa maombi na kila kipengele kiko kwenye jalada lake yaani tools/, resources/ au /prompts.

Nzuri, tujaribu kuunda hii ipi ifuatayo. 

## Mazoezi: Kuunda seva ya ngazi ya chini

Katika zoezi hili, tutafanya yafuatayo:

1. Unda seva ya ngazi ya chini inayosimamia orodha ya zana na kuitwa kwa zana.
1. Tekeleza usanifu ambao unaweza kuutumia baadaye.
1. Ongeza uthibitishaji kuhakikisha miito yako ya zana imethibitishwa vizuri.

### -1- Unda usanifu

Kitu cha kwanza tunachohitaji ni usanifu unaotuwezesha kupanua tunapoendelea kuongeza vipengele, hivi ndivyo inavyoonekana:

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

Sasa tumeshaunda usanifu unaoeleza jinsi rahisi kuongezea zana mpya kwenye jalada la tools. Haya unaweza kufuata kuongeza saraka ndogo kwa rasilimali na maonesho.

### -2- Kuma zana

Tuchunguze sasa jinsi kuongeza zana inavyoonekana. Kwanza, inahitaji kuundwa katika saraka yake *tool* kama ifuatavyo:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Thibitisha ingizo kwa kutumia mfano wa Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # KUFANYA: ongeza Pydantic, ili tuweze kuunda AddInputModel na kuthibitisha argimenti

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Kile tunachoona hapa ni jinsi tunavyofafanua jina, maelezo, na skema ya pembejeo kwa kutumia Pydantic na mtoaji atakaeitwa mara chombo hiki kitakapotumiwa. Mwisho, tunaonyeshwa `tool_add` ambayo ni kamusi inayoshikilia sifa hizi zote.

Pia kuna *schema.py* ambayo hutumiwa kufafanua skema ya pembejeo inayotumika na chombo chetu:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Pia tunahitaji kujaza *__init__.py* ili kuhakikisha saraka ya tools inatambuliwa kama moduli. Zaidi yake, tunahitaji kuonyeshwa moduli ndani yake kama ifuatavyo:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Tunaweza kuendelea kuongeza kwenye faili hii tunapoendelea kuongeza zana zaidi.

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

Hapa tunaunda kamusi inayoonekana kama sifa hizi:

- jina, hili ni jina la chombo.
- rawSchema, hii ni skema ya Zod, itatumika kuthibitisha maombi yanayoingia ya kuitwa chombo hiki.
- inputSchema, skema hii itatumika na mtoaji.
- callback, hii hutumiwa kuitisha chombo.

Pia kuna `Tool` inayotumika kubadilisha kamusi hii kuwa aina inayokubaliwa na mtoaji wa seva ya mcp na inaonekana kama ifuatavyo:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Na kuna *schema.ts* ambapo tunahifadhi skema za pembejeo kwa kila chombo ambacho kinaonekana hivi kwa sasa na skema moja tu lakini tunapoongeza zana tunaweza kuongeza mikoa zaidi:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Nzuri, twendelee kushughulikia orodha ya zana zetu ifuatayo.

### -3- Shughulikia orodha ya zana

Ifuatayo, kushughulikia orodha ya zana zetu, tunahitaji kuanzisha mtoaji wa ombi kwa hiyo. Hivi ndivyo tunavyohitaji kuongeza kwenye faili yetu ya seva:

**Python**

```python
# msimbo umeondolewa kwa ufupisho
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

Hapa, tunaongeza kiviringisho `@server.list_tools` na kazi inayotekeleza `handle_list_tools`. Hapo tunapaswa kutoa orodha ya zana. Angalia kila chombo kinapaswa kuwa na jina, maelezo na inputSchema.   

**TypeScript**

Kuweka mtoaji wa ombi kwa ajili ya kuorodhesha zana, tunahitaji kuitisha `setRequestHandler` kwenye seva na skema inayofaa kwa kile tunachojaribu kufanya, katika kesi hii `ListToolsRequestSchema`. 

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
// msimbo umeachwa kwa ufupi
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Rudisha orodha ya zana zilizosajiliwa
  return {
    tools: tools
  };
});
```

Nzuri, sasa tumesuluhisha sehemu ya orodha ya zana, tuchunguze jinsi tunavyoita zana ifuatayo.

### -4- Shughulikia kuitwa kwa chombo

Kuitisha chombo, tunahitaji kuanzisha mtoaji mwingine wa ombi, wakati huu ukilenga kushughulikia ombi linalobainisha kipengele cha kuitwa na kwa hoja gani.

**Python**

Tuitumie kiviringisho `@server.call_tool` na tuitenzee kazi kama `handle_call_tool`. Ndani ya kazi hiyo, tunahitaji kuchambua jina la chombo, hoja zake na kuhakikisha hoja ni halali kwa chombo husika. Tunaweza kuhakiki hoja ndani ya kazi hii au baadaye katika chombo halisi.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # zana ni kamusi yenye majina ya zana kama funguo
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # itaje zana
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Hii ndiyo inayoendelea:

- Jina la chombo lipo tayari kama parameter ya ingizo `name` ambayo ni kweli kwa hoja zetu katika aina ya kamusi `arguments`.

- Chombo kinatelekezwa kwa `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Uthibitisho wa hoja hutokea katika mali ya `handler` inayolenga kazi, ikiwa itashindwa itatoa makosa. 

Hapo, sasa tuna uelewa kamili wa orodha na kuitwa kwa zana kwa kutumia seva ya ngazi ya chini.

Angalia [kielelezo kamili](./code/README.md) hapa

## Kazi ya nyumbani

Panua msimbo uliotolewa kwa idadi ya zana, rasilimali na maonesho na tafakari jinsi unavyogundua kuwa unahitaji kuongeza faili tu kwenye saraka ya tools na si mahali pengine.

*Hakuna suluhisho lililotolewa*

## Muhtasari

Katika sura hii, tuliona jinsi mbinu ya seva ya ngazi ya chini ilivyofanya kazi na jinsi ilivyotusaidia kuunda usanifu mzuri tunaoweza kuendelea kujenga juu yake. Pia tulijadiliana uthibitishaji na uliendelea kuonyeshwa jinsi ya kutumia maktaba za uthibitishaji kuunda skema za uthibitishaji wa pembejeo.

## Nini Kifuatacho

- Ifuatayo: [Uthibitishaji Rahisi](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->