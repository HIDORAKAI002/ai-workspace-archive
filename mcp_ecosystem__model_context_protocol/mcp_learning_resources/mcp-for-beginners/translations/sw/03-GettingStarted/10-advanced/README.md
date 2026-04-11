# Matumizi ya hali ya juu ya seva

Kuna aina mbili tofauti za seva zilizo wazi katika MCP SDK, seva yako ya kawaida na seva ya ngazi ya chini. Kawaida, ungetumia seva ya kawaida kuongeza vipengele kwake. Hata hivyo, katika baadhi ya kesi, unataka kutegemea seva ya ngazi ya chini kama vile:

- Mimarisha bora. Inawezekana kuunda miundo safi na seva ya kawaida na seva ya ngazi ya chini lakini inaweza kudaiwa kwamba ni rahisi kidogo na seva ya ngazi ya chini.
- Upatikanaji wa vipengele. Baadhi ya vipengele vya hali ya juu vinaweza kutumika tu na seva ya ngazi ya chini. Hii utaiona katika sura za baadaye tunapoongeza sampuli na uhalifu.

## Seva ya kawaida vs seva ya ngazi ya chini

Hivi ndivyo muundaji wa MCP Server unavyoonekana na seva ya kawaida

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

Nakala hapa ni kwamba unaongeza kila chombo, rasilimali au onyo unayotaka seva iwe nayo kwa wazi. Hakuna kosa hilo.

### Njia ya seva ya ngazi ya chini

Hata hivyo, unapotumia njia ya seva ya ngazi ya chini unahitaji kufikiria tofauti. Badala ya kusajili kila chombo, unaunda wasimamizi wawili kwa kila aina ya kipengele (vyombo, rasilimali au vionyo). Kwa mfano, vyombo vina kazi mbili tu kama ifuatavyo:

- Orodhesha vyombo vyote. Kazi moja itahusika na majaribio yote ya kuorodhesha vyombo.
- Semelea kupiga simu kwa vyombo vyote. Hapa pia, kuna kazi moja tu inayoshughulikia simu kwa chombo

Hii inasikika kama kazi ndogo labda sawa? Kwa hivyo badala ya kusajili chombo, nahitaji tu kuhakikisha chombo kimeorodheshwa ninaporodhesha vyombo vyote na kwamba kinapoitwa pale ambapo kuna ombi linalokuja la kuitwa chombo.

Tuangalie sasa jinsi msimbo unavyoonekana:

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
  // Rejesha orodha ya zana zilizosajiliwa
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

Hapa sasa tuna kazi inayorudisha orodha ya vipengele. Kila kipengele katika orodha ya vyombo sasa kina mashamba kama `name`, `description` na `inputSchema` kufuata aina ya kurudisha. Hii inatua kuweka vyombo vyetu na ufafanuzi wa kipengele mahali pengine. Sasa tunaweza kuunda vyombo vyetu vyote katika folda ya vyombo na hivyo vile vile kwa vipengele vyote hivyo mradi wako utaweza kupanga kama ifuatavyo:

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

Hiyo ni nzuri, usanifu wetu unaweza kuonekana safi kabisa.

Je, kuhusu kupiga simu kwa vyombo, ni wazo hilo basi, msimamizi mmoja kupiga simu kwa chombo, chombo chochote? Ndiyo, hasa hivyo, hapa ni msimbo huo:

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
    // TODO piga simu kwa chombo,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Kama unavyoona katika msimbo hapo juu, tunahitaji kutambua chombo cha kupigia simu, na na hoja zipi, na kisha tunahitaji kuendelea kupiga simu kwa chombo hicho.

## Kuboresha njia kwa uthibitisho

Mpaka sasa, umeona jinsi usajili wako wote wa kuongeza vyombo, rasilimali na vionyo unavyoweza kubadilishwa na wasimamizi hawa wawili kwa kila aina ya kipengele. Je, tunahitaji kufanya nini pia? Naam, tunapaswa kuongeza aina fulani ya uthibitisho kuhakikisha kuwa chombo kinapigiwa pasipo makosa ya hoja. Kila runtime ina suluhisho lake la hili, kwa mfano Python hutumia Pydantic na TypeScript hutumia Zod. Wazo ni kufanya yafuatayo:

- Hamisha mantiki ya kuunda kipengele (chombo, rasilimali au onyo) hadi folder yake maalum.
- Ongeza njia ya kuthibitisha ombi linapokuja kuomba kupigia simu chombo kwa mfano.

### Tengeneza kipengele

Kuumba kipengele, tutahitaji kuunda faili kwa kipengele hicho na kuhakikisha kina mashamba muhimu yanayohitajika kwa kipengele hicho. Mashamba gani yanatofautiana kidogo kati ya vyombo, rasilimali na vionyo.

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
        # Thibitisha ingizo ukitumia mfano wa Pydantic
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

- Unda schema kwa kutumia Pydantic `AddInputModel` na mashamba `a` na `b` katika faili *schema.py*.
- Jaribu kufasiri ombi lililoingia kuwa aina ya `AddInputModel`, kama kuna tofauti ya vigezo hii itasababisha hitilafu:

   ```python
   # add.py
    try:
        # Thibitisha ingizo kwa kutumia mfano wa Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Unaweza kuchagua kuweka mantiki hii ya tafsiri ndani ya lugha ya chombo yenyewe au katika kazi ya msimamizi.

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

       // @ts-sahau
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

// mpangilio.ts
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

- Katika msimamizi anayeshughulikia simu zote za vyombo, sasa tunajaribu kufasiri ombi lililoingia kwenye schema iliyochaguliwa ya chombo:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    kama hiyo itafanya kazi basi tunaendelea kupiga simu chombo halisi:

    ```typescript
    const result = await tool.callback(input);
    ```

Kama unavyoona, njia hii huunda usanifu bora kwani kila kitu kina mahali pake, *server.ts* ni faili ndogo sana tu inayounganisha wasimamizi wa ombi na kila kipengele kiko katika folda yake ya muhimu yaani tools/, resources/ au /prompts.

Nzuri, tujaribu kujenga hili sasa.

## Zoeezi: Kuunda seva ya ngazi ya chini

Katika zoeezi hili, tutafanya yafuatayo:

1. Unda seva ya ngazi ya chini inayoshughulikia kuorodhesha vyombo na kupiga simu kwa vyombo.
1. Tekeleza usanifu unaoweza kujenga juu yake.
1. Ongeza uthibitisho ili kuhakikisha simu zako za vyombo zinathibitishwa ipasavyo.

### -1- Unda usanifu

Jambo la kwanza tunalohitaji kushughulikia ni usanifu unaotusaidia kupanua tunapoongeza vipengele zaidi, hivi ndivyo inavyoonekana:

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

Sasa tumetenga usanifu unaohakikisha tunaweza kuongeza vyombo vipya kwa urahisi katika folda ya vyombo. Jisikie huru kufuata hili kuongeza saraka ndogo kwa rasilimali na vionyo.

### -2- Kuunda chombo

Tuchunguze jinsi kuunda chombo kunavyoonekana sasa. Kwanza, kinatakiwa kuundwa katika saraka ndogo yake ya *tool* kama ifuatavyo:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Thibitisha ingizo kwa kutumia mfano wa Pydantic
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

Tunachoona hapa ni jinsi tunavyofafanua jina, maelezo, na input schema kwa kutumia Pydantic na msimamizi atakayetekelezwa mara chombo hiki kitakapoitwa. Mwisho, tunaweka wazi `tool_add` ambayo ni kamusi inayoshikilia mali zote hizi.

Kuna pia *schema.py* inayotumika kufafanua input schema inayotumiwa na chombo chetu:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Pia tunahitaji kujaza *__init__.py* ili kuhakikisha saraka ya vyombo inatambuliwa kama moduli. Zaidi ya hayo, tunapaswa kuwasha moduli zilizo ndani yake hivi:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Tunaweza kuendelea kuongeza kwenye faili hii tunavyoongeza vyombo zaidi.

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

Hapa tunaunda kamusi yenye mali:

- name, hili ndilo jina la chombo.
- rawSchema, hii ni schema ya Zod, itatumika kuthibitisha maombi yanayoingia ya kupiga simu kwa chombo hiki.
- inputSchema, schema hii itatumika na msimamizi.
- callback, hii hutumika kuitisha chombo.

Kuna pia `Tool` inayotumiwa kubadilisha kamusi hii kuwa aina ambayo msimamizi wa seva ya mcp anaweza kukubali na inavyoonekana hivi:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Na kuna *schema.ts* ambapo tunaweka input schemas za kila chombo zinazofanana hivi sasa na schema moja tu lakini tunapoongeza vyombo tunaweza kuongeza maingizo zaidi:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Nzuri, tuendelee kuanzisha usimamizi wa kuorodhesha vyombo sasa.

### -3- Simamia kuorodhesha vyombo

Ifuatayo, kusimamia kuorodhesha vyombo vyetu, tunahitaji kuweka msimamizi wa ombi kwa ajili hiyo. Hapa tunatakiwa kuongeza kwenye faili yetu ya seva:

**Python**

```python
# msimbo umeachwa kwa ufupi
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

Hapa, tunaongeza dekoreta `@server.list_tools` na kazi inayotekelezwa `handle_list_tools`. Katika hii ya mwisho, tunapaswa kutoa orodha ya vyombo. Angalia jinsi kila chombo kinavyotakiwa kuwa na jina, maelezo na inputSchema.

**TypeScript**

Ili kuweka msimamizi wa ombi wa kuorodhesha vyombo, tunahitaji kupiga `setRequestHandler` kwenye seva na schema inayoendana na kile tunachotaka kufanya, katika kesi hii `ListToolsRequestSchema`.

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
// msimbo umeondolewa kwa ufupi
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Rudisha orodha ya zana zilizosajiliwa
  return {
    tools: tools
  };
});
```

Nzuri, sasa tumesuluhisha sehemu ya kuorodhesha vyombo, tuangalie jinsi tunavyoweza kupiga simu kwa vyombo ifuatayo.

### -4- Simamia kupiga simu kwa chombo

Kupiga simu kwa chombo, tunahitaji kuweka msimamizi mwingine wa ombi, wakati huu ukilenga kushughulikia ombi linaloeleza kipengele gani kiitwe na kwa hoja zipi.

**Python**

Tutumie dekoreta `@server.call_tool` na utekeleze na kazi kama `handle_call_tool`. Ndani ya kazi hii, tunahitaji kuchambua jina la chombo, hoja zake na kuhakikisha hoja ni halali kwa chombo kilichoombwa. Tunaweza kuthibitisha hoja ndani ya kazi hii au baadaye katika chombo halisi.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ni kamusi yenye majina ya zana kama funguo
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # itumie zana hiyo
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Hapa ni yanayotokea:

- Jina la chombo letu tayari lipo kama kigezo cha kuingiza `name` ambacho ni kweli kwa hoja zetu za aina ya kamusi `arguments`.

- Chombo kinaitwa kwa `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Uthibitisho wa hoja hutokea katika mali ya `handler` inayorejelea kazi, kama ikishindikana itatoa kosa.

Hapo, sasa tunaelewa kabisa orodha na kupiga simu kwa vyombo kwa kutumia seva ya ngazi ya chini.

Tazama [mfano kamili](./code/README.md) hapa

## Majukumu

Panua msimbo uliotolewa na idadi ya vyombo, rasilimali na vionyo na fahamu jinsi unavyotambua kuwa unahitaji tu kuongeza faili katika saraka ya vyombo na si mahali pengine.

*Hakuna suluhisho lililotolewa*

## Muhtasari

Katika sura hii, tumeona jinsi njia ya seva ya ngazi ya chini ilivyofanya kazi na jinsi inavyotusaidia kuunda usanifu mzuri tunaoweza kuendelea kuujenga. Pia tulijadili uthibitisho na ulionyeshwa jinsi ya kufanya kazi na maktaba za uthibitisho kuunda schema za uthibitisho wa ingizo.

## Nini Kifuatazo

- Ifuatayo: [Uthibitishaji Rahisi](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Angalizo**:  
Nyaraka hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kuhakikisha usahihi, tafadhali fahamu kwamba tafsiri zilizofanywa kwa njia ya otomatiki zinaweza kuwa na makosa au kasoro za usahihi. Nyaraka ya asili katika lugha yake ya asili inapaswa kuchukuliwa kuwa chanzo cha uthibitisho. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatubebei uwajibikaji wowote kwa kutoelewana au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->