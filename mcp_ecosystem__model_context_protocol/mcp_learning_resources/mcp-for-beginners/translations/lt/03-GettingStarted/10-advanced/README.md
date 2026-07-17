# Išplėstinis serverio naudojimas

MCP SDK yra du skirtingi serverių tipai – įprastas serveris ir žemo lygio serveris. Paprastai naudojate įprastą serverį, kad pridėtumėte funkcijas. Tačiau kai kuriais atvejais norite naudoti žemo lygio serverį, pavyzdžiui:

- Geresnė architektūra. Įmanoma sukurti švarią architektūrą tiek su įprastu, tiek su žemo lygio serveriu, bet galima teigti, kad su žemo lygio serveriu tai šiek tiek paprasčiau.
- Funkcijų prieinamumas. Kai kurios pažangios funkcijos yra prieinamos tik su žemo lygio serveriu. Tai pamatysite vėlesniuose skyriuose, kai pridėsime ėmimą (deprecated `2026-07-28` leidimo kandidatas) ir išgavimą.

## Įprastas serveris prieš žemo lygio serverį

Štai kaip atrodo MCP serverio kūrimas su įprastu serveriu

**Python**

```python
mcp = FastMCP("Demo")

# Pridėti papildomą įrankį
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

// Pridėti priedų įrankį
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

Svarbiausia, kad jūs aiškiai pridedate kiekvieną įrankį, išteklių ar užklausą, kurią norite, kad serveris turėtų. Tai visiškai normalu.  

### Žemo lygio serverio požiūris

Tačiau naudodami žemo lygio serverio požiūrį turite galvoti kitaip. Vietoj to, kad užregistruotumėte kiekvieną įrankį, sukuriate du valdiklius kiekvienam funkcijos tipui (įrankiai, ištekliai ar užklausos). Pavyzdžiui, įrankiai turi tik dvi funkcijas taip:

- Įrankių sąrašo pateikimas. Viena funkcija atsakinga už visus bandymus pateikti įrankių sąrašą.
- Visi įrankių kvietimai. Čia taip pat viena funkcija tvarko įrankio kvietimus.

Skamba kaip tik galbūt mažiau darbo? Taigi vietoj įrankio registravimo tiesiog turiu užtikrinti, kad įrankis būtų įtrauktas į įrankių sąrašą ir kad jis būtų iškviestas, kai ateina užklausa iškviesti įrankį.

Pažiūrėkime, kaip dabar atrodo kodas:

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
  // Grąžinti registruotų įrankių sąrašą
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

Čia dabar turime funkciją, kuri grąžina funkcijų sąrašą. Kiekvienas įrankių sąrašo įrašas turi laukus kaip `name`, `description` ir `inputSchema` pagal grąžinimo tipą. Tai leidžia mūsų įrankius ir funkcijų apibrėžimus laikyti kitur. Dabar visus savo įrankius galime kurti *tools* kataloge ir taip pat visiems savo funkcijoms, todėl projektas gali staiga tapti tvarkingas taip:

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

Tai puiku, mūsų architektūrą galima padaryti labai švarią.

O kaip su įrankių kvietimu, ar ta pati idėja, viena funkcija kviečia bet kurį įrankį? Taip, tiksliai, štai kodas tam:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools yra žodynas, kuriame raktai yra įrankių pavadinimai
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
    // TODO iškviesti įrankį,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Kaip matote iš aukščiau pateikto kodo, turime išskirti, kurį įrankį reikia kviesti ir su kokiais argumentais, tada tęsti įrankio kvietimą.

## Požiūrio tobulinimas su validacija

Iki šiol matėte, kaip visi užregistravimai pridedant įrankius, išteklius ir užklausas gali būti pakeisti šiomis dviem funkcijomis kiekvienam funkcijos tipui. Ką dar turime padaryti? Reikia pridėti validaciją, kad būtų užtikrinta, jog įrankis kviečiamas su tinkamais argumentais. Kiekviena vykdymo aplinka naudoja savo sprendimą: pavyzdžiui, Python naudoja Pydantic, o TypeScript – Zod. Idėja tokia:

- Perkelti funkcijos (įrankio, ištekliaus ar užklausos) kūrimo logiką į jos skirtą katalogą.
- Pridėti būdą patvirtinti įeinančią užklausą, pavyzdžiui, kvietimą įrankiui.

### Sukurti funkciją

Norėdami sukurti funkciją, turime sukurti failą tam funkcijos tipui ir įsitikinti, kad jame yra privalomi tos funkcijos laukai. Laukai šiek tiek skiriasi tarp įrankių, išteklių ir užklausų.

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
        # Patikrinkite įvestį naudodami Pydantic modelį
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: pridėti Pydantic, kad galėtume sukurti AddInputModel ir patikrinti argumentus

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Čia matote, kaip darome taip:

- Sukuriame schemą naudodami Pydantic `AddInputModel` su laukais `a` ir `b` faile *schema.py*.
- Bandome išanalizuoti įeinančią užklausą kaip `AddInputModel` tipą, jei parametrai nesutampa, tai kels klaidą:

   ```python
   # add.py
    try:
        # Patikrinkite įvestį naudodami Pydantic modelį
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Galite pasirinkti, ar šią analizės logiką naudoti įrankio kvietime, ar valdiklio funkcijoje.

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

- Valdiklyje, tvarkančiame įrankių kvietimus, dabar bandome išanalizuoti įeinančią užklausą pagal įrankio apibrėžtą schemą:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    jei pavyksta, tęsiame kviečiant tikrąjį įrankį:

    ```typescript
    const result = await tool.callback(input);
    ```

Kaip matote, šis požiūris kuria puikią architektūrą, nes viskas turi savo vietą, *server.ts* yra labai mažas failas, tik sujungiantis užklausų valdiklius, o kiekviena funkcija yra atitinkamame kataloge, pvz. tools/, resources/ arba prompts/.

Puiku, pabandykime tai toliau sukurti. 

## Užduotis: Sukurti žemo lygio serverį

Šioje užduotyje darysime taip:

1. Sukurkite žemo lygio serverį, kuris tvarkytų įrankių sąrašą ir kvietimus.
1. Įgyvendinkite architektūrą, ant kurios galėsite toliau kurti.
1. Pridėkite validaciją, kad užtikrintumėte tinkamą įrankių kvietimų patikrinimą.

### -1- Sukurkite architektūrą

Pirmiausia turime sukurti architektūrą, kuri padėtų mums augti, kai pridėsime daugiau funkcijų, štai kaip ji atrodo:

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

Dabar turime architektūrą, kuri užtikrina, kad galime lengvai pridėti naujus įrankius į katalogą tools. Galite taip pat pridėti poskyrius ištekliams ir užklausoms.

### -2- Įrankio kūrimas

Pažiūrėkime, kaip atrodo įrankio kūrimas. Pirmiausia jis turi būti sukurtas savo *tool* poskyryje taip:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Patvirtinkite įvestį naudodami Pydantic modelį
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: pridėti Pydantic, kad galėtume sukurti AddInputModel ir patvirtinti argumentus

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Čia matome, kaip apibrėžiame pavadinimą, aprašymą ir įvesties schemą naudodami Pydantic bei valdiklį, kuris bus kviečiamas, kai įrankis bus iškviestas. Galiausiai eksponuojame `tool_add` — žodyną, turintį visas šias savybes.

Taip pat yra *schema.py*, kuri skirta apibrėžti mūsų įrankio įvesties schemą:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Taip pat reikia papildyti *__init__.py*, kad tools katalogas būtų traktuojamas kaip modulis. Be to, reikia išeksponuoti modulius taip:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Galima laisvai papildyti šį failą, kai pridėsite daugiau įrankių.

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

Čia kuriame žodyną, kuris susideda iš savybių:

- name, tai įrankio pavadinimas.
- rawSchema, tai Zod schema, skirtas tikrinti įeinančias užklausas, kviečiančias įrankį.
- inputSchema, šią schemą naudoja valdiklis.
- callback, tai kviečia įrankį.

Taip pat yra `Tool`, kuris konvertuoja šį žodyną į tipą, kurį gali priimti MCP serverio valdiklis, ir atrodo taip:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Ir yra *schema.ts*, kur saugome kiekvieno įrankio įvesties schemas, kurios atrodo taip su viena schema kol kas, bet pridėjus daugiau įrankių galime pridėti ir naujų įrašų:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Puiku, dabar pereikime prie įrankių sąrašo tvarkymo.

### -3- Tvarkyti įrankių sąrašą

Toliau, kad tvarkytume įrankių sąrašą, reikia sukurti užklausų valdiklį tam. Štai ką turime pridėti mūsų serverio faile:

**Python**

```python
# kodas santrumpos dėlei praleistas
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

Čia mes pridėjome dekoratorių `@server.list_tools` ir įgyvendinamą funkciją `handle_list_tools`. Pastarojoje turiu sukurti įrankių sąrašą. Atkreipkite dėmesį, kad kiekvienas įrankis turi turėti pavadinimą, aprašymą ir inputSchema.   

**TypeScript**

Norėdami nustatyti užklausų valdiklį įrankių sąrašui, turime iškviesti `setRequestHandler` serveriui su schema, atitinkančia mūsų užduotį, šiuo atveju `ListToolsRequestSchema`. 

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
// kodas sutrumpintas
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Grąžina įregistruotų įrankių sąrašą
  return {
    tools: tools
  };
});
```

Puiku, dabar išsprendėme įrankių sąrašo dalį, pažiūrėkime, kaip galime kvieti įrankius.

### -4- Tvarkyti įrankio kvietimą

Norėdami kviesti įrankį, turime nustatyti dar vieną užklausų valdiklį, šį kartą skirtą tvarkyti užklausą, kuri nurodo, kurią funkciją kviesime ir su kokiais argumentais.

**Python**

Naudosime dekoratorių `@server.call_tool` ir įgyvendinsime jį su funkcija kaip `handle_call_tool`. Šioje funkcijoje turime išskirti įrankio pavadinimą, argumentus ir patikrinti, ar argumentai galioja tam įrankiui. Galime patikrinti argumentus tiek šioje funkcijoje, tiek pačiame įrankyje.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools yra žodynas, kuriame raktai yra įrankių pavadinimai
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # iškvieskite įrankį
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Štai kas vyksta:

- Mūsų įrankio pavadinimas jau yra įvesties parametre `name`, o argumentai yra `arguments` žodyne.

- Įrankis kviečiamas su `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Argumentų validacija vyksta `handler` savybėje, kuri nurodo funkciją, jei nepavyksta, išmetama klaida. 

Štai dabar pilnai suprantame, kaip su žemo lygio serveriu galima tvarkyti įrankių sąrašą ir kvietimus.

Peržiūrėkite [visą pavyzdį](./code/README.md) čia

## Užduotis

Išplėskite pateiktą kodą su keliais įrankiais, ištekliais ir užklausomis ir pastebėkite, kad jums tereikia pridėti failus tik kataloge tools, niekur kitur. 

*Sprendimas nepateiktas*

## Santrauka

Šiame skyriuje matėme, kaip veikia žemo lygio serverio požiūris ir kaip tai padeda sukurti gražią architektūrą, kurią galime toliau plėtoti. Taip pat aptarėme validaciją ir pademonstravome, kaip naudotis validacijos bibliotekomis kuriant įvesties schemas.

## Kas toliau

- Toliau: [Paprastas autentifikavimas](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->