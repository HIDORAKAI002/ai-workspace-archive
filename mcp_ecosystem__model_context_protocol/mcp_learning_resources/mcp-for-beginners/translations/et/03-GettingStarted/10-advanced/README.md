# Täiustatud serveri kasutamine

MCP SDK-s on kahte tüüpi servereid: tavapärane server ja madala taseme server. Tavaliselt kasutate funktsioonide lisamiseks tavapärasest serverist. Kuid mõnel juhul soovite tugineda madala taseme serverile, näiteks:

- Parem arhitektuur. Võimalik on luua puhas arhitektuur nii tavapärase kui ka madala taseme serveriga, kuid võib väita, et see on veidi lihtsam madala taseme serveriga.
- Funktsioonide saadavus. Mõnda täiustatud funktsiooni saab kasutada ainult madala taseme serveriga. Näete seda hiljem peatükkides, kui lisame proovivõtmist ja väljavõtmist.

## Tavapärane server vs madala taseme server

Nii näeb välja MCP serveri loomine tavapärase serveriga:

**Python**

```python
mcp = FastMCP("Demo")

# Lisa lisamise tööriist
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

// Lisa liitmistööriist
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

Oluline on, et te lisate otseselt iga tööriista, ressursi või käsu, mida soovite serverile lisada. Sellega pole midagi valesti.

### Madala taseme serveri lähenemine

Kui kasutate madala taseme serveri lähenemist, peate mõtlema teisiti. Selle asemel, et registreerida iga tööriist, loote iga funktsioonitüübi (tööriistad, ressursid või käsud) jaoks kaks töötlejat. Näiteks tööriistade puhul on ainult kaks funktsiooni:

- Kõikide tööriistade kuvamine. Üks funktsioon vastutab kõigi tööriistade kuvamise katsete eest.
- Kõikide tööriistade kutsumine. Siin on samuti ainult üks funktsioon, mis töötleb tööriista kutseid.

See tundub ilmselt vähem tööd, eks? Nii et tööriista registreerimise asemel pean lihtsalt tagama, et tööriist on tööriistade nimekirjas, kui ma neid kõiki loetlen, ja et see kutsutakse, kui saabub tööriista kutse päring.

Vaatame, kuidas kood nüüd välja näeb:

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
  // Tagasta registreeritud tööriistade nimekiri
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

Siin on meil nüüd funktsioon, mis tagastab nimekirja funktsioonidest. Iga tööriistade nimekirja kirje sisaldab väljasid nagu `name`, `description` ja `inputSchema`, et vastata tagastustüübile. See võimaldab meil paigutada meie tööriistade ja funktsioonide määratluse mujale. Nüüd võime luua kõik meie tööriistad kaustas tools ja sama kehtib kõigi teie funktsioonide kohta, nii et teie projekt saab korrektselt organiseeritud näiteks nii:

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

See on suurepärane, meie arhitektuur saab olla üsna puhas.

Aga mis saab tööriistade kutsumisest, kas see on sama idee siis, üks töötleja tööriista kutsumiseks, ükskõik millist tööriista? Jah, täpselt, siin on selle jaoks kood:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools on tööriistade nimedega võtmetega sõnastik
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
    // TODO kutsuge tööriist,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Nagu ülal koodist näha, peame välja lugema, millist tööriista kutsuda ja milliste argumentidega, ning seejärel kutsega edasi minema.

## Lähenemise täiustamine valideerimisega

Nii kaugele olete näinud, kuidas kõik teie registratsioonid tööriistade, ressursside ja käskude lisamiseks saab asendada nende kahe töötlejaga iga funktsioonitüübi kohta. Mida veel peame tegema? Tuleb lisada mingi valideerimise vorm, et tagada tööriista kutsumine õigete argumentidega. Igal runtime'il on selleks oma lahendus, näiteks Pythonis kasutatakse Pydanticu ja TypeScriptis Zodi. Idee on järgmine:

- Viia funktsiooni (tööriist, ressurss või käsk) loomise loogika selle pühendatud kausta.
- Lisada viis valideerida sissetulevat päringut, mis näiteks kutsub tööriista.

### Looge funktsioon

Funktsiooni loomiseks peame looma selle funktsiooni faili ja tagama, et sellel on kohustuslikud väljad, mida funktsioon nõuab. Väljad erinevad mõnevõrra tööriistade, ressursside ja käskude vahel.

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
        # Kontrolli sisendit Pydantic mudeli abil
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: lisa Pydantic, et saaksime luua AddInputModeli ja valideerida argumente

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Siin näete, kuidas me teeme järgmist:

- Loome skeemi Pydanticu abil `AddInputModel` koos väljadega `a` ja `b` failis *schema.py*.
- Püüame analüüsida sissetulevat päringut kui `AddInputModel` tüüpi, kui parameetrites on lahknevus, põhjustab see tõrke:

   ```python
   # add.py
    try:
        # Sisendi valideerimine Pydantic mudeli abil
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Saate valida, kas panna see analüüsiloogika tööriista kutsele endale või töötleja funktsiooni.

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

- Tööriistade kutsete töötlejas proovime nüüd sissetuleva päringu analüüsida tööriista määratletud skeemiks:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

   Kui see õnnestub, siis jätkame tööriista kutsega:

    ```typescript
    const result = await tool.callback(input);
    ```

Nagu näete, loob see lähenemine suurepärase arhitektuuri, sest kõik on oma kohas, *server.ts* on väga väike fail, mis lihtsalt ühendab päringute töötlejad ja iga funktsioon on oma vastavas kaustas, nt tools/, resources/ või prompts/.

Suurepärane, proovime seda nüüd ehitada.

## Harjutus: madala taseme serveri loomine

Selles harjutuses teeme järgmist:

1. Loome madala taseme serveri, mis käsitleb tööriistade kuvamist ja kutsumist.
2. Rakendame arhitektuuri, millele saab ehitada.
3. Lisame valideerimise, et tagada, et teie tööriistade kutsed on korrektselt valideeritud.

### -1- Looge arhitektuur

Esimene asi, mida peate lahendama, on arhitektuur, mis aitab meil skaleerida, kui lisame uusi funktsioone, see näeb välja järgmine:

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

Nüüd oleme seadistanud arhitektuuri, mis tagab, et saame hõlpsasti lisada uusi tööriistu tools-kaustas. Võite vabalt järgida sama lähenemist subkaustade lisamiseks ressursside ja käskude jaoks.

### -2- Tööriista loomine

Vaatame, kuidas tööriista loomine välja näeb. Esiteks tuleb see luua oma *tool* alamkaustas nii:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Kontrolli sisendit Pydantic mudeli abil
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: lisa Pydantic, et saaksime luua AddInputModeli ja kontrollida argumente

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Siin näeme, kuidas määratleme nime, kirjelduse ja sisendi skeemi, kasutades Pydanticut, ning töötlejat, mis kutsutakse välja, kui seda tööriista kutsutakse. Lõpuks avaldame `tool_add`, mis on sõnastik, mis hoiab kõiki neid atribuute.

Samuti on olemas *schema.py*, mida kasutatakse tööriista sisendi skeemi määratlemiseks:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Peame samuti täitma *__init__.py*, et kaust tools oleks moodulina käsitletud. Lisaks vajame moodulite avalikustamist nii:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Seda faili võime täita, kui lisame rohkem tööriistu.

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

Siin loome omadusest koosneva sõnastiku:

- name, tööriista nimi.
- rawSchema, see on Zodi skeem, seda kasutatakse sissetulevate tööriistakutsete valideerimiseks.
- inputSchema, seda skeemi kasutab töötleja.
- callback, seda kasutatakse tööriista käivitamiseks.

Samuti on olemas `Tool`, mis teisendab selle sõnastiku selliseks tüübiks, mida MCP serveri töötleja saab vastu võtta, see näeb välja nii:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Ja on olemas *schema.ts*, kus hoiame iga tööriista sisendi skeeme, praegu on ainult üks skeem, kuid lisades tööriistu, saame lisada rohkem kirjeid:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Suurepärane, siis liigume edasi tööriistade kuvamise käsitlemise juurde.

### -3- Tööriistade kuvamise töötleja

Järgmine samm on seadistada päringute töötleja tööriistade kuvamiseks. Siin on, mida peate oma serverifailile lisama:

**Python**

```python
# kood lühendatud lihtsustamiseks
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

Siin lisame dekoratsiooni `@server.list_tools` ja selle funktsiooniks on `handle_list_tools`. Viimases peame tootma tööriistade nimekirja. Pange tähele, et igal tööriistal peab olema nimi, kirjeldus ja inputSchema.

**TypeScript**

Tööriistade kuvamise päringu töötleja seadistamiseks kutsume serveril `setRequestHandler` sobiva skeemiga, antud juhul `ListToolsRequestSchema`.

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
// Kood on lühendatud
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Tagasta registreeritud tööriistade nimekiri
  return {
    tools: tools
  };
});
```

Suurepärane, nüüd lahendasime tööriistade kuvamise osa, vaatame, kuidas saaksime järgmise sammuna tööriistu kutsuda.

### -4- Tööriista kutsumise käsitlemine

Tööriista kutsumiseks peame seadistama teise päringute töötleja, mis tegeleb päringutega, mis määravad, millist funktsiooni kutsuda ja milliste argumentidega.

**Python**

Kasutame dekoratsiooni `@server.call_tool` ja implementeerime selle funktsiooniga `handle_call_tool`. Selle funktsiooni sees peame parsimiseks välja lugema tööriista nime, argumente ja veenduma, et argumendid sobivad vastava tööriista jaoks. Saame neid argumente valideerida kas siin või allpool, tegelikus tööriistas.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools on sõnastik tööriistade nimedega võtmetena
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # kutsuge tööriist esile
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Siin toimub:

- Meie tööriista nimi on juba sisendparameetrina `name` ja argumendid sõnastikus `arguments`.

- Tööriista kutsutakse nii: `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Argumendivalideerimine toimub `handler` atribuudis, mis viitab funktsioonile; kui see ebaõnnestub, viskab vea.

Nii et nüüd on meil täielik arusaam tööriistade kuvamisest ja kutsumisest madala taseme serveri abil.

Vaata [täisnäidet](./code/README.md) siit

## Ülesanne

Lisa antud koodi hulk tööriistu, ressursse ja käske ning mõtiskle, kuidas märkad, et pead vaid lisama faile kausta tools ja mujal midagi lisada ei ole vaja.

*Lahendust ei anta*

## Kokkuvõte

Selles peatükis nägime, kuidas madala taseme serveri lähenemine toimib ja kuidas see aitab meil luua kena arhitektuuri, millele saab edaspidi ehitada. Arutasime ka valideerimist ning nägime, kuidas töötada valideerimisteekidega, et luua sisendvalideerimiseks skeeme.

## Mis järgmiseks

- Järgmine: [Lihtne autentimine](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest loobumine**:
See dokument on tõlgitud tehisintellekti tõlketeenuse [Co-op Translator](https://github.com/Azure/co-op-translator) abil. Kuigi püüame tagada täpsust, võib automatiseeritud tõlkes esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles on autoriteetne allikas. Olulise teabe puhul on soovitatav kasutada professionaalset inimtõlget. Me ei vastuta mis tahes arusaamatuste või väärtõlgenduste eest, mis võivad tekkida selle tõlke kasutamisest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->