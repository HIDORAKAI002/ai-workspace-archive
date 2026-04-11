# Pažangus serverio naudojimas

MCP SDK yra du skirtingi serverių tipai – įprastasis serveris ir žemo lygio serveris. Paprastai naudotumėte įprastą serverį norėdami pridėti funkcijų. Tačiau kai kuriais atvejais norite pasinaudoti žemo lygio serveriu, pvz.:

- Geresnė architektūra. Galima sukurti švarią architektūrą tiek su įprastu serveriu, tiek su žemo lygio serveriu, tačiau galima teigti, kad su žemo lygio serveriu tai padaryti šiek tiek lengviau.
- Funkcijų prieinamumas. Kai kurios pažangios funkcijos galimos tik su žemo lygio serveriu. Tai matysite vėlesniuose skyriuose, kai pridėsime mėginių ėmimą ir išgavimą.

## Įprastasis serveris vs žemo lygio serveris

Taip atrodo MCP serverio kūrimas naudojant įprastą serverį

**Python**

```python
mcp = FastMCP("Demo")

# Pridėti pridėjimo įrankį
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

// Pridėti papildymo įrankį
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

Mintis ta, kad aiškiai pridedate kiekvieną įrankį, išteklių ar prašymą, kurį norite, kad serveris turėtų. Nėra nieko blogo.

### Žemo lygio serverio požiūris

Tačiau naudodami žemo lygio serverio požiūrį turite mąstyti kitaip. Vietoj to, kad registruotumėte kiekvieną įrankį, turite sukurti du apdorotojus kiekvienam funkcijų tipui (įrankiams, ištekliams ar prašymams). Pavyzdžiui, įrankiams būna tik dvi funkcijos:

- Visų įrankių surašymas. Viena funkcija yra atsakinga už visus bandymus pateikti įrankių sąrašą.
- Įrankių iškvietimas. Čia taip pat yra viena funkcija, kuri tvarko įrankio iškvietimus.

Skamba kaip mažesnis darbas, tiesa? Taigi vietoj įrankio registravimo tiesiog reikia užtikrinti, kad įrankis būtų įtrauktas į visų įrankių sąrašą, o kai atkeliauja užklausa iškviesti įrankį, jis būtų iškviestas.

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
  // Grąžina užregistruotų įrankių sąrašą
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

Čia dabar turime funkciją, kuri grąžina funkcijų sąrašą. Kiekviename įrankių sąrašo įraše dabar yra laukai kaip `name`, `description` ir `inputSchema`, kad atitiktų grąžinimo tipą. Tai leidžia mums laikyti įrankius ir funkcijų apibrėžimus kitur. Dabar galime kurti visus savo įrankius įrankių kataloge, tas pats galioja visoms funkcijoms, tad jūsų projektas gali staiga būti organizuotas taip:

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

Puiku, mūsų architektūrą galima padaryti gana švarią.

O kaip iškviesti įrankius, ar tai ta pati idėja, vienas apdorotojas iškviečia bet kurį įrankį? Taip, tiksliai, štai kodas tam:

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

Kaip matote iš aukščiau pateikto kodo, turime išskirti įrankį, kurį reikia iškviesti, ir su kokiais argumentais, tada turime tęsti įrankio iškvietimą.

## Požiūrio patobulinimas su validacija

Iki šiol matėte, kaip visus registravimus pridėti įrankiams, ištekliams ir prašymams galima pakeisti šiomis dviem apdorotojomis kiekvienam funkcijų tipui. Ką dar turime padaryti? Reikia pridėti tam tikrą validaciją, kad būtų užtikrinta, jog įrankiai kviečiami su teisingais argumentais. Kiekviena vykdymo aplinka turi savo sprendimą, pavyzdžiui, Python naudoja Pydantic, o TypeScript – Zod. Idėja yra tokia:

- Perkelti logiką kurti funkciją (įrankį, išteklius ar prašymą) į atskirą skaidrų katalogą.
- Pridėti būdą validuoti gaunamą prašymą, pavyzdžiui, įrankio iškvietimui.

### Sukurti funkciją

Norėdami sukurti funkciją, turime sukurti failą šiai funkcijai ir užtikrinti, kad jis turėtų privalomus laukus, reikalingus šiai funkcijai. Laukai šiek tiek skiriasi tarp įrankių, išteklių ir prašymų.

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

čia matote, kaip darome šiuos veiksmus:

- Sukuriame Pydantic schemą `AddInputModel` su laukais `a` ir `b` faile *schema.py*.
- Bandome išskirti gaunamą prašymą kaip tipą `AddInputModel`, jei parametrai nesutampa, tai sukels klaidą:

   ```python
   # add.py
    try:
        # Patikrinkite įvestį naudodami Pydantic modelį
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Galite pasirinkti, ar šią analizės logiką dėti į patį įrankio iškvietimą, ar į apdorotojo funkciją.

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

- Apdorotoje funkcijoje, kuri tvarko visus įrankių iškvietimus, dabar bandome išskaidyti gaunamą prašymą pagal įrankio apibrėžtą schemą:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

 jei tai pavyksta, tęsiame tikrą įrankio iškvietimą:

    ```typescript
    const result = await tool.callback(input);
    ```

Kaip matote, šis požiūris sukuria puikią architektūrą, nes viskas turi savo vietą, *server.ts* yra labai mažas failas, kuris tik sujungia prašymų apdorotojus, o kiekviena funkcija yra atitinkamame kataloge, pvz., tools/, resources/ arba /prompts.

Puiku, dabar pabandykime tai sukurti.

## Užduotis: Žemo lygio serverio kūrimas

Šioje užduotyje darysime:

1. Sukursime žemo lygio serverį, kuris tvarkys įrankių sąrašą ir iškvietimus.
1. Įgyvendinsime architektūrą, kurią galėsite plėtoti.
1. Pridėsime validaciją, kad įrankio iškvietimai būtų tinkamai patikrinti.

### -1- Sukurkite architektūrą

Pirmiausia turime paruošti architektūrą, kuri padės plečiant funkcijas. Štai kaip ji atrodo:

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

Dabar paruošėme architektūrą, kuri užtikrina, kad galime lengvai pridėti naujus įrankius į tools katalogą. Galite taip pat pridėti poskyrius ištekliams ir prašymams.

### -2- Įrankio kūrimas

Pažiūrėkime, kaip atrodo įrankio kūrimas. Pirmiausia jis turi būti sukurtas savo *tool* poskyryje taip:

**Python**

```python
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

Čia matote, kaip apibrėžiame pavadinimą, aprašymą ir įvesties schemą naudojant Pydantic, bei apdorotoją, kuris bus iškviečiamas įrankiui naudojant. Galiausiai atskleidžiame `tool_add`, kuris yra žodynas su šiomis savybėmis.

Taip pat yra *schema.py*, kuris apibrėžia įvesties schemą mūsų įrankiui:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Taip pat reikia užpildyti *__init__.py*, kad įrankių katalogas būtų laikomas moduliu. Be to, turime atskleisti modulius jame taip:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Galime pridėti daugiau įrankių toliau į šį failą.

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

Čia kuriame žodyną su savybėmis:

- name, įrankio pavadinimas.
- rawSchema, tai Zod schema, naudojama tikrinti gaunamus prašymus iškviesti įrankį.
- inputSchema, ši schema naudojama apdorotojo funkcijoje.
- callback, funkcija, kuri iškviečia įrankį.

Yra ir `Tool` tipas, kuris paverčia šį žodyną tipu, kurį priima mcp serverio apdorotojas, jis atrodo taip:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Taip pat yra *schema.ts*, kur saugome įrankių įvesties schemas, dabar su viena schema, bet pridėjus įrankius, galime pridėti dar įrašų:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Puiku, dabar pereikime prie įrankių sąrašo valdymo.

### -3- Tvarkyti įrankių sąrašą

Norėdami tvarkyti įrankių sąrašą, turime sukurti užklausos apdorotoją. Tai reikia pridėti prie serverio failo:

**Python**

```python
# kodas sutrumpintas dėl glaustumo
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

Čia pridedame dekoratorių `@server.list_tools` ir įgyvendiname funkciją `handle_list_tools`. Joje reikia sukurti įrankių sąrašą. Atkreipkite dėmesį, kad kiekvienas įrankis turi turėti pavadinimą, aprašymą ir inputSchema.

**TypeScript**

Norėdami nustatyti užklausos apdorotoją įrankių sąrašui, serveriui perduodame `setRequestHandler` su schema, tinkama mūsų veiksmui, šiuo atveju `ListToolsRequestSchema`.

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
// Dėl glaustumo kodas praleistas
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Grąžina įregistruotų įrankių sąrašą
  return {
    tools: tools
  };
});
```

Puiku, dabar išsprendėme įrankių sąrašo dalį, pažiūrėkime, kaip galime iškviesti įrankius.

### -4- Tvarkyti įrankio iškvietimą

Norint iškviesti įrankį, reikia nustatyti kitą užklausos apdorotoją, kuris tvarkys prašymus nurodyti, kurią funkciją iškviesti ir su kokiais argumentais.

**Python**

Naudosime dekoratorių `@server.call_tool` ir įgyvendinsime funkciją kaip `handle_call_tool`. Joje turime išskirti įrankio pavadinimą, argumentus ir užtikrinti jų galiojimą. Galime validuoti argumentus čia arba jau pačiame įrankyje.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools yra žodynas, kuriame įrankių pavadinimai yra raktai
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # iškviesti įrankį
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Štai kas vyksta:

- Įrankio pavadinimas jau yra įvesties parametre `name`, o argumentai yra `arguments` žodyne.

- Įrankis kviečiamas su `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Argumentų validacija vyksta apdorotojo funkcijoje (`handler`), jei argumentai netinkami, iškyla klaida.

Štai dabar turime pilną supratimą, kaip su žemo lygio serveriu pateikiami ir iškviečiami įrankiai.

Pilną pavyzdį rasite [čia](./code/README.md).

## Užduotis

Išplėskite pateiktą kodą pridėdami keletą įrankių, išteklių ir prašymų ir pastebėkite, kad reikia pridėti failus tik tools kataloge ir niekur kitur.

*Nėra pateikto sprendimo*

## Santrauka

Šiame skyriuje pamatėme, kaip veikia žemo lygio serverio požiūris ir kaip jis gali padėti sukurti tvarkingą architektūrą, kurią galime toliau plėtoti. Taip pat aptarėme validaciją ir parodėme, kaip naudotis validavimo bibliotekomis kuriant įvesties validavimo schemas.

## Kas toliau

- Toliau: [Paprastas autentifikavimas](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant DI vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, atkreipkite dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas natūralia kalba turėtų būti laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama profesionali žmogiška vertimo paslauga. Mes neprisiimame atsakomybės už bet kokius nesusipratimus ar neteisingus aiškinimus, kylančius naudojant šį vertimą.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->