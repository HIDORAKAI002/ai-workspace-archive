# Haladó szerverhasználat

Az MCP SDK-ban kétféle szerver érhető el: a normál szerver és az alacsony szintű szerver. Általában a normál szervert használjuk a funkciók hozzáadására. Bizonyos esetekben azonban az alacsony szintű szerverre kell támaszkodnunk, például:

- Jobb architektúra. Lehetséges tiszta architektúrát létrehozni mind a normál szerverrel, mind az alacsony szintű szerverrel, de vitatható, hogy egy alacsony szintű szerverrel ez kissé könnyebb.
- Funkció elérhetősége. Egyes haladó funkciók csak alacsony szintű szerverrel használhatók. Ezt a későbbi fejezetekben látni fogod, amikor mintavételezést (elavult a `2026-07-28`-i kiadás-jelöltben) és kinyerést adunk hozzá.

## Normál szerver vs alacsony szintű szerver

Így néz ki egy MCP szerver létrehozása normál szerverrel

**Python**

```python
mcp = FastMCP("Demo")

# Adj hozzá egy összeadási eszközt
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

// Adj hozzá egy összeadási eszközt
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

A lényeg az, hogy kifejezetten hozzáadunk minden eszközt, erőforrást vagy promptot, amit a szervernek tudnia kell. Ebben nincs semmi rossz.  

### Alacsony szintű szerver megközelítés

Azonban, ha alacsony szintű szerveres megközelítést használunk, másképp kell gondolkodnunk. Minden funkciótípushoz (eszközök, erőforrások vagy promptok) két kezelőt kell létrehozni. Például az eszközöknek csak két funkciójuk van így:

- Az összes eszköz listázása. Egy funkció felel az összes eszköz listázásának megkísérléséért.
- Az eszköz hívásának kezelése. Itt is csak egy funkció kezeli az eszköz hívását.

Ez potenciálisan kevesebb munkának hangzik, igaz? Tehát eszköz regisztrálása helyett csak gondoskodom róla, hogy az eszköz szerepeljen az összes eszköz listázásakor, és hogy meghívásra kerüljön, amikor eszközhívás érkezik. 

Nézzük meg, hogyan néz ki most a kód:

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
  // Adja vissza a regisztrált eszközök listáját
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

Most van egy funkciónk, amely egy funkciólista elemeként visszaad egy eszközök listáját. Az egyes eszközök most olyan mezőket tartalmaznak, mint a `name`, `description` és `inputSchema`, hogy megfeleljenek a visszatérési típusnak. Ez lehetővé teszi, hogy az eszközöket és a funkciódefiníciót máshol tároljuk. Most már létrehozhatjuk az összes eszközünket egy tools mappában, és ugyanez igaz minden egyes funkcióra, így a projekted hirtelen így szerveződhet:

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

Ez nagyszerű, az architektúránk elég tisztán nézhet ki.

Az eszközök hívása vajon ugyanez az elképzelés, egy kezelő, ami bármelyik eszközt meghívja? Igen, pontosan, itt a kód ehhez:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # a tools egy szótár, amelynek kulcsai a szerszámok nevei
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
    // TODO hívd meg az eszközt,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Ahogy a fenti kódból látható, ki kell elemeznünk, melyik eszközt kell meghívni, milyen argumentumokkal, majd tovább kell lépnünk az eszköz meghívásához.

## A megközelítés javítása validációval

Eddig láttad, hogyan helyettesíthetik az eszközök, erőforrások és promptok hozzáadásának regisztrációját ezek a két kezelő funkciók funkciótípusonként. Mit kell még tennünk? Valamilyen validációt kell hozzáadnunk, hogy az eszközt helyes argumentumokkal hívják meg. Minden futtatókörnyezetnek megvan a saját megoldása erre, például Pythonban a Pydantic, TypeScriptben a Zod. Az ötlet a következő:

- A funkció (eszköz, erőforrás vagy prompt) létrehozásának logikáját áthelyezni a dedikált mappába.
- Módot adni a bejövő kérés validálására, például az eszköz hívásának érvényességének ellenőrzésére.

### Funkció létrehozása

Funkció létrehozásához olyan fájlt kell készítenünk az adott funkció számára, amely tartalmazza az adott funkció kötelező mezőit. Ezek a mezők kissé eltérnek az eszközök, erőforrások és promptok között.

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
        # Ellenőrizze a bemenetet Pydantic modell használatával
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: adjuk hozzá a Pydanticet, hogy létrehozhassunk egy AddInputModelt és ellenőrizhessük az argumentumokat

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

itt láthatod, miként csináljuk az alábbiakat:

- Pydantic `AddInputModel` séma létrehozása `a` és `b` mezőkkel *schema.py* fájlban.
- A bejövő kérés próbálkozásának elemzése `AddInputModel` típusra. Ha eltérés van az argumentumokban, ez összeomlik:

   ```python
   # add.py
    try:
        # Érvényesítse a bemenetet Pydantic modell segítségével
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Eldöntheted, hogy ezt az elemzési logikát az eszköz hívásában vagy a kezelő függvényben helyezed el.

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

- A minden eszköz hívását kezelő függvényben most megpróbáljuk az érkező kérést az eszköz definiált sémájára elemezni:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ha ez működik, akkor áttérhetünk az eszköz tényleges hívására:

    ```typescript
    const result = await tool.callback(input);
    ```

Amint látod, ez a megközelítés nagyszerű architektúrát teremt, mert mindennek megvan a maga helye, a *server.ts* nagyon kicsi fájl, amely csak a kéréskezelőket vezeti össze, és minden funkció a saját mappájában van, mint például tools/, resources/ vagy prompts/.

Nagyszerű, nézzük meg, hogyan építhetjük ezt tovább.

## Gyakorlat: Alacsony szintű szerver készítése

Ebben a gyakorlatban a következőket tesszük:

1. Létrehozunk egy alacsony szintű szervert, amely kezeli az eszközök listázását és hívását.
1. Megvalósítunk egy olyan architektúrát, amelyre építhetünk.
1. Hozzáadunk egy validációt, hogy az eszköz hívása megfelelően legyen érvényesítve.

### -1- Architektúra létrehozása

Az első dolog, amire szükségünk van, egy olyan architektúra, amely segít nekünk skálázni, amikor több funkciót adunk hozzá. Így néz ki:

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

Most olyan architektúrát alakítottunk ki, amely biztosítja, hogy könnyedén adhassunk új eszközöket egy tools mappában. Nyugodtan kövesd ezt az erőforrásokhoz és promptokhoz is alkönyvtárakként.

### -2- Eszköz létrehozása

Nézzük meg, hogyan néz ki egy eszköz létrehozása. Először is, a *tool* alkönyvtárban kell létrehozni ezt a fájlt így:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Érvényesítse a bemenetet Pydantic modellel
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: adjunk hozzá Pydantic-et, hogy létrehozhassunk egy AddInputModel-t és érvényesíthessük az argumentumokat

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Itt azt látjuk, hogyan definiáljuk az eszköz nevét, leírását és input sémáját Pydantic segítségével, valamint egy kezelőt, amely akkor hívódik meg, amikor az eszköz használatára kerül sor. Végül kiteszünk egy `tool_add` nevű szótárat, amely tartalmazza ezeket a tulajdonságokat.

Van továbbá egy *schema.py* is, amely meghatározza az eszköz által használt input sémát:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Ki kell egészítenünk a *__init__.py* fájlt is, hogy a tools könyvtárat modulnak tekintse. Emellett úgy kell kitenni a modulokat, hogy így nézzen ki:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Ahogy több eszközt adunk hozzá, bővíthetjük ezt a fájlt.

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

Itt egy szótárt hozunk létre tulajdonságokból:

- name, ez az eszköz neve.
- rawSchema, ez a Zod séma, amely az eszköz hívását kérő bejövő kérések validálására szolgál.
- inputSchema, ezt a sémát használja a kezelő.
- callback, ez az eszköz meghívására szolgál.

Van egy `Tool` típus is, amely ezt a szótárt egy olyan típussá alakítja, amelyet az mcp szerver kezelő elfogad, így néz ki:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Van egy *schema.ts* is, ahová az egyes eszközök input sémái kerülnek, jelenleg csak egy de amint több eszközt adunk hozzá, bővíthetjük:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Szuper, folytassuk az eszközök listázásának kezelésével.

### -3- Az eszközök listázásának kezelése

Ezután be kell állítanunk egy kéréskezelőt az eszközök listázásához. Ezt kell hozzáadni a szerver fájlunkhoz:

**Python**

```python
# a kód a rövidség kedvéért elhagyva
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

Itt hozzáadjuk a `@server.list_tools` dekorátort és a `handle_list_tools` megvalósító funkciót. Utóbbiban eszközlistát kell előállítanunk. Figyeld meg, hogy az egyes eszközöknek nevük, leírásuk és inputSchema-juk kell, hogy legyen.   

**TypeScript**

Hogy beállítsuk az eszközök listázásának kéréskezelőjét, a szerveren meghívjuk a `setRequestHandler`-t egy a te célodnak megfelelő sémával, jelen esetben `ListToolsRequestSchema`-val. 

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
// a kód egyszerűsítve
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Visszaadja a regisztrált eszközök listáját
  return {
    tools: tools
  };
});
```

Szuper, megoldottuk az eszközök listázását, most nézzük meg, hogyan hívhatjuk meg azokat.

### -4- Az eszközök hívásának kezelése

Egy eszköz meghívásához egy másik kéréskezelőt kell beállítanunk, amely egy olyan kérés kezelésére szolgál, amely megadja, melyik funkciót és milyen argumentumokkal kell meghívni.

**Python**

Használjuk a `@server.call_tool` dekorátort, amelyet egy `handle_call_tool` nevű függvénnyel valósítunk meg. Ebben a függvényben elemezni kell az eszköz nevét, argumentumait, és meg kell győződni arról, hogy az argumentumok érvényesek az adott eszköz számára. Ez a validáció történhet a függvényben vagy az eszközben.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # a tools egy szótár, amelyben az eszközök nevei kulcsok
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # meghívja az eszközt
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Íme, mi történik:

- Az eszköz neve már jelen van az input paraméterként `name`-ként, az argumentumaink pedig az `arguments` szótárban vannak.

- Az eszköz meghívása `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`-szel történik. Az argumentumok validációja a `handler` tulajdonságban lévő függvényben történik, ha az nem sikerül, kivételt dob.

Így most teljes egészében értjük, hogyan lehet eszközöket listázni és hívni alacsony szintű szerver használatával.

Lásd a [teljes példát](./code/README.md) itt

## Feladat

Egészítsd ki a megadott kódot több eszközzel, erőforrással és promp-tal, és figyeld meg, hogy csak a tools könyvtárba kell fájlokat hozzáadni, máshol nem. 

*Nincs megoldás megadva*

## Összegzés

Ebben a fejezetben megismertük az alacsony szintű szerver megközelítést és azt, hogyan segíthet olyan architektúrát létrehozni, amelyre tovább építhetünk. Megbeszéltük a validációt, és bemutattuk, hogyan dolgozhatsz validációs könyvtárakkal, hogy séma alapú bemeneti validációt hozz létre.

## Mi következik

- Következő: [Egyszerű hitelesítés](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->