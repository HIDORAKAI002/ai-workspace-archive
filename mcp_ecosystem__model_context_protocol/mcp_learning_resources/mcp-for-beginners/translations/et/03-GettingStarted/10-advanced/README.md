# Täiustatud serveri kasutamine

MCP SDK-s on kaks erinevat serveritüüpi, tavaline server ja madala taseme server. Tavaliselt kasutate funktsioonide lisamiseks tavalist serverit. Mõnel juhul aga tahate tugineda madala taseme serverile, näiteks:

- Parem arhitektuur. On võimalik luua puhast arhitektuuri nii tavalise kui madala taseme serveri abil, kuid võib väita, et madala taseme serveriga on see veidi lihtsam.
- Funktsionaalsuse kättesaadavus. Mõnda täiustatud funktsiooni saab kasutada ainult madala taseme serveriga. Hiljem peatükkides näete seda proovide võtmise (oskustera himmumisel `2026-07-28` väljaandel) ja küsitlemise lisamisel.

## Tavaline server vs madala taseme server

Siin on, kuidas MCP server tavalise serveriga luuakse

**Python**

```python
mcp = FastMCP("Demo")

# Lisa liitmiskomponent
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

Oluline on see, et te lisate ekspliciitselt igale tööriistale, ressursile või julgustusele, mida soovite serverisse lisada. Sellega ei ole midagi valesti.  

### Madala taseme serveri lähenemine

Kuid madala taseme serveri puhul mõtlete sellele teisiti. Selle asemel, et registreerida iga tööriist eraldi, loote iga funktsioonitüübi jaoks (tööriistad, ressursid või julgustused) kaks käsitlejat. Näiteks on tööriistadel ainult kaks funktsiooni:

- Kõigi tööriistade loetlemine. Üks funktsioon vastutab kõigi tööriistade loendamise eest.
- Kutsumise haldamine. Samuti on vaid üks funktsioon, mis haldab tööriista kutseid.

See kõlab nagu potentsiaalselt vähem tööd, eks? Nii et tööriista registreerimise asemel pean ma lihtsalt tagama, et tööriist oleks olemas tööriistade loendis ja et see kutsutakse, kui tuleb tööriista kutse päring. 

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

Nüüd on meil funktsioon, mis tagastab funktsioonide nimekirja. Iga kirje tööriistade nimekirjas sisaldab väljasid nagu `name`, `description` ja `inputSchema`, et vastata tagastustüübile. See võimaldab paigutada tööriistad ja funktsiooni definitsioonid mujale. Me võime nüüd luua kõik oma tööriistad kaustas tools ja sama kehtib kõigi funktsioonide kohta, nii et teie projekt saab järsku välja näha selline:

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

See on suurepärane, meie arhitektuur võib välja näha üsna puhas.

Aga kuidas tööriistu kutsutakse, kas see on sama mõte, üks käsitleja tööriista kutsumiseks, ükskõik millise tööriista jaoks? Jah, täpselt, siin on selle kood:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tööriistad on sõnastik, kus võtmeks on tööriistade nimed
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
    
    // argumendid: request.params.arguments
    // TEE KÕNE tööriistale,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Nagu ülalolevast koodist näha, peame eraldama, millist tööriista kutsutakse ja milliste argumentidega, seejärel kutsume tööriista üles.

## Lähenemise parandamine valideerimise abil

Senini nägite, kuidas kõik teie registreerimised tööriistade, ressursside ja julgustuste lisamiseks saavad asenduda nende kahe käsitlejaga iga funktsioonitüübi kohta. Mida veel vaja teha on? Me peaksime lisama mingi valideerimise, et tagada tööriista kutse õigete argumentidega. Igal käitusajad on selleks oma lahendus, näiteks Python kasutab Pydanticut ja TypeScript Zod'i. Mõte on järgmine:

- Liigutada funktsiooni loomise loogika (tööriist, ressurss või julgustus) selle pühendatud kausta.
- Lisada viis valideerida sissetulev päring, mis näiteks kutsub tööriista.

### Funktsiooni loomine

Funktsiooni loomiseks peame looma selle funktsiooni jaoks faili ja veenduma, et sellel on funktsiooni nõutavad kohustuslikud väljad. Millised väljad need on, võib tööriistade, ressursside ja julgustuste vahel veidi erineda.

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
        # Sisendi valideerimine Pydantic mudeli abil
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: lisa Pydantic, et saaksime luua AddInputModel ja valideerida argumente

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

siin näete, kuidas me teeme järgmist:

- Loome skeemi kasutades Pydanticut `AddInputModel` välja pandud väljadega `a` ja `b` failis *schema.py*.
- Püüdleme sissetuleva päringu parsimiseks tüübiks `AddInputModel`, kui parameetrites on mittevastavus, siis see põhjustab vea:

   ```python
   # add.py
    try:
        # Sisendi valideerimine Pydantic malli abil
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Võite valida, kas panna see parsimise loogika tööriista kutse sisse või käsitleja funktsiooni.

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

- Tööriistade kutsetega toime tulevas käsitlejas proovime nüüd püüda sissetuleva päringu tööriista määratletud skeemi alusel:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    kui see õnnestub, siis jätkame tööriista reaalset kutset:

    ```typescript
    const result = await tool.callback(input);
    ```

Nagu näha, loob see lähenemine suurepärast arhitektuuri, sest kõigil on oma koht, *server.ts* on väga väike fail, mis ainult ühendab päringukäsitlejad ja iga funktsioon on oma vastavas kaustas nt tools/, resources/ või /prompts.

Suurepärane, proovime seda järgmiseks ehitada. 

## Harjutus: madala taseme serveri loomine

Selles harjutuses teeme järgmist:

1. Loome madala taseme serveri, mis haldab tööriistade loendamist ja kutsumist.
1. Rakendame arhitektuuri, millele saab ehitada.
1. Lisame valideerimise, et tagada tööriista kutsete õige valideerimine.

### -1- Arhitektuuri loomine

Esimene asi on arhitektuur, mis aitab meil skaleerida, kui lisame rohkem funktsioone, siin on see välja näha:

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

Nüüd oleme seadistanud arhitektuuri, mis tagab, et saame hõlpsasti lisada uusi tööriistu kausta tools. Võite lisada kausta alamkaustu ressursside ja julgustuste jaoks.

### -2- Tööriista loomine

Vaatame, kuidas tööriista loomine välja näeb. Esiteks tuleb see luua *tool* alamkaustas nii:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Sisendi valideerimine, kasutades Pydantic mudelit
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: lisa Pydantic, et saaksime luua AddInputModeli ja valideerida argumendid

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Siin näeme, kuidas määratleme nime, kirjelduse ja sisendi skeemi Pydanticuga ning käsitleja, mis käivitatakse tööriista kutsumisel. Lõpuks ekspordime `tool_add`, mis on sõnastik kõigi nende omadustega.

On ka *schema.py*, mis määrab tööriista kasutatava sisendi skeemi:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Peame ka täitma *__init__.py*, et tööriistade kaust käsitataks moodulina. Lisaks peame moodulid seal ekspordima nii:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Sellesse faili võime lisada juurde uusi tööriistu.

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

Siin loome sõnastiku omadustega:

- name, see on tööriista nimi.
- rawSchema, see on Zod skeem, mida kasutatakse sissetulevate tööriistakutsete valideerimiseks.
- inputSchema, seda skeemi kasutab käsitleja.
- callback, seda kasutatakse tööriista käivitamiseks.

On ka `Tool`, mis teisendab selle sõnastiku tüübi, mida mcp serveri käsitleja aktsepteerib ja see näeb välja nii:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Ja on *schema.ts*, kus hoiame iga tööriista sisendi skeeme, praegu ainult ühe skeemiga aga kui lisame tööriistu, lisame ka rohkem kirjeid:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Suurepärane, jätkame tööriistade loendamise käsitlemisega.

### -3- Tööriistade loendi käsitlemine

Järgmiseks, tööriistade loendamise käsitlemiseks, peame seadistama päringu käsitleja. Serveri faili peame lisama järgmist:

**Python**

```python
# kood on lühendatud
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

Siin lisame dekoratsiooni `@server.list_tools` ja implementeerime funktsiooni `handle_list_tools`. Viimases tuleb toota tööriistade nimekiri. Pange tähele, et iga tööriist vajab nime, kirjeldust ja inputSchema-d.   

**TypeScript**

Tööriistade loendi päringukäsitleja seadistamiseks peame serveril kutsuma `setRequestHandler` ja kasutama skeemi sobivalt sellele, mida soovime teha, antud juhul `ListToolsRequestSchema`. 

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

Väga hea, nüüd oleme suutnud tööriistade loendamise osa ära lahendada, vaatame järgmise sammuna, kuidas tööriistu kutsuda.

### -4- Tööriista kutsumise käsitlemine

Tööriista kutsumiseks peame seadistama teise päringu käsitleja, mis keskendub päringute lahendamisele selle kohta, millist funktsiooni kutsuda ja milliste argumentidega.

**Python**

Kasutame dekoratsiooni `@server.call_tool` ja implementeerime selle funktsiooniga `handle_call_tool`. Sel funktsioonil tuleb parsimise kaudu saada tööriista nimi, selle argument ja tagada argumentide kehtivus. Argumentide valideerimise võime teha kas siin või tegelikus tööriistas.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tööriistad on sõnastik, kus võtmeteks on tööriistade nimed
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # kutsu tööriista esile
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Siin toimub:

- Meie tööriista nimi on sisseastuv parameeter `name` ja argumendid on sõnastikuna `arguments`.

- Tööriista kutsutakse `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` abil. Valideerimine toimub `handler` atribuudis, mis viitab funktsioonile; kui see ebaõnnestub, tõstetakse erind.

Nüüd on meil täielik ülevaade tööriistade loendamisest ja kutsumisest madala taseme serveri abil.

Vaadake [täispikka näidet](./code/README.md)

## Ülesanne

Laiendage antud koodi mitme tööriista, ressursi ja julgustusega ning mõelge, kuidas märkate, et peate lisama vaid faile kausta tools, mitte kuhugi mujale. 

*Lahendust ei ole antud*

## Kokkuvõte

Selles peatükis nägime, kuidas madala taseme serveri lähenemine töötab ja kuidas see aitab luua head arhitektuuri, millele saab edasi ehitada. Samuti rääkisime valideerimisest ja näidati, kuidas kasutada valideerimiskogusid sisendi valideerimiseks skeemide loomisel.

## Järgmine samm

- Järgmine: [Lihtne autentimine](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->