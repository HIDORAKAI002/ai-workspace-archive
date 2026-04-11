# Haladó szerverhasználat

Az MCP SDK-ban két különböző típusú szervert találunk, a szokásos szerveredet és az alacsony szintű szervert. Általában a hagyományos szervert használod arra, hogy funkciókat adj hozzá. Bizonyos esetekben azonban az alacsony szintű szerverre szeretnél támaszkodni, például:

- Jobb architektúra. Lehetséges tiszta architektúrát létrehozni mind a hagyományos, mind az alacsony szintű szerverrel, de elmondható, hogy az alacsony szintű szerverrel ez valamivel egyszerűbb.
- Funkciók elérhetősége. Egyes fejlett funkciók csak alacsony szintű szerverrel használhatók. Ezt a későbbi fejezetekben látni fogod, amikor mintavételt és kiváltást adunk hozzá.

## Hagyományos szerver vs alacsony szintű szerver

Így néz ki egy MCP szerver létrehozása a hagyományos szerverrel

**Python**

```python
mcp = FastMCP("Demo")

# Adj hozzá egy összeadó eszközt
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

// Adj hozzá egy összeadó eszközt
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

A lényeg az, hogy explicit módon adod hozzá az összes eszközt, forrást vagy üzenetküldést, amit a szervernek meg akarsz adni. Ezzel nincs semmi gond.

### Alacsony szintű szerver megközelítés

Azonban az alacsony szintű szerver használatakor másképpen kell gondolkodni. Az eszközök regisztrálása helyett inkább két kezelőt hozol létre minden funkciótípushoz (eszközök, források vagy üzenetküldések). Például az eszközöknek akkor csak két funkciója van:

- Az összes eszköz listázása. Egy funkció felel az összes eszköz lista lekéréséért.
- Az eszközök meghívásának kezelése. Itt is csak egy funkció kezeli az eszköz meghívásait.

Ez potenciálisan kevesebb munkának hangzik, igaz? Tehát az eszköz regisztrálása helyett csak annyi a dolgom, hogy az eszköz szerepeljen az eszközök listájában, és meghívásnál ezt az eszközt hívja meg a rendszer.

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
  // Visszaadja a regisztrált eszközök listáját
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

Itt most egy olyan függvényünk van, ami funkciók listáját adja vissza. Az eszközök listájában lévő minden bejegyzés tartalmaz olyan mezőket, mint `name`, `description` és `inputSchema`, hogy megfeleljen a visszatérési típusnak. Ez lehetővé teszi, hogy az eszközök és funkciódefiníció máshol legyen. Most már minden eszközünket egy *tools* mappában hozhatjuk létre, és ugyanez vonatkozik az összes funkcióra, így a projekted hirtelen így nézhet ki:

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

Ez nagyszerű, az architektúránk elég tisztának nézhet ki.

Az eszközök hívásáról mi a helyzet? Ugyanez az elv, egy kezelő, ami meghív minden eszközt, bármelyiket? Igen, pontosan, itt a kód erre:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # a tools egy szótár, amelyben az eszközök nevei a kulcsok
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

Ahogy a fenti kódból látható, meg kell határoznunk, melyik eszközt hívjuk meg, milyen argumentumokkal, majd folytatni kell az eszköz meghívásával.

## Megközelítés fejlesztése validációval

Eddig láttad, hogy hogyan váltható ki minden eszköz, forrás és üzenet regisztrálása ezekkel a két kezelővel funkciónként. Mi mást kell még csinálnunk? Nos, hozzá kell adnunk valamilyen validációt annak biztosítására, hogy az eszköz megfelelő argumentumokkal legyen meghívva. Minden futtatókörnyezetnek megvan a saját megoldása erre, például Pythonban Pydanticet használunk, TypeScriptben pedig a Zodot. Az ötlet a következő:

- Áthelyezni a funkció (eszköz, forrás vagy üzenet) létrehozásának logikáját a dedikált mappájába.
- Olyan módot adni arra, hogy ellenőrizni tudjuk az érkező kérést, például egy eszköz meghívását.

### Egy funkció létrehozása

Egy funkció létrehozásához létre kell hozni egy fájlt ehhez a funkcióhoz, és gondoskodni arról, hogy megfeleljen a kötelező mezőknek, amelyek eltérnek eszközök, források és üzenetek között.

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
        # A bemenet érvényesítése Pydantic modell segítségével
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: adjuk hozzá a Pydantic-et, hogy létrehozhassunk egy AddInputModel-t és érvényesíthessük a paramétereket

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Itt láthatod, hogy hogyan csináljuk a következőt:

- Egy Pydantic `AddInputModel` séma létrehozása a `schema.py` fájlban, amely mezőként az `a` és `b` típusokat tartalmazza.
- Az érkező kérés megpróbálása `AddInputModel` típusúvá parszerként, ha hiba van a paraméterekben, a program leáll:

   ```python
   # add.py
    try:
        # Érvényesítsük a bemenetet Pydantic modellel
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Dönthetsz, hogy ezt a parszer logikát az eszköz meghívásánál helyezed el vagy a kezelő függvényben.

**TypeScript**

```typescript
// szerver.ts
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

// séma.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// hozzáad.ts
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

- Az összes eszköz meghívását kezelő handlerben most megpróbáljuk feldolgozni az érkező kérés a tool által definiált sémára:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ha ez sikerül, akkor folytatjuk az eszköz tényleges meghívását:

    ```typescript
    const result = await tool.callback(input);
    ```

Ahogy látod, ez a megközelítés remek architektúrát hoz létre, mivel minden megvan a maga helyén, a *server.ts* egy nagyon kicsi fájl, amely csak összeköti a kéréskezelőket, és minden funkció a megfelelő mappájában van, pl. tools/, resources/ vagy /prompts/.

Nagyszerű, próbáljuk meg ezt következőként megépíteni.

## Gyakorlat: Alacsony szintű szerver létrehozása

Ebben a gyakorlatban a következőket tesszük:

1. Létrehozunk egy alacsony szintű szervert, amely kezeli az eszközök listázását és meghívását.
2. Megvalósítunk egy olyan architektúrát, amelyre építhetsz tovább.
3. Hozzáadunk validációt, hogy az eszköz meghívások megfelelőek legyenek.

### -1- Architektúra létrehozása

Az első, amivel foglalkoznunk kell, egy olyan architektúra, ami skálázható, miközben új funkciókat adunk hozzá, így néz ki:

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

Most már beállítottunk egy olyan architektúrát, amely biztosítja, hogy könnyen adjunk hozzá új eszközöket a *tools* mappában. Nyugodtan hozz létre almappákat a forrásoknak és az üzenetküldéseknek is.

### -2- Egy eszköz létrehozása

Nézzük meg, hogyan néz ki egy eszköz létrehozása. Először is létre kell hozni a *tool* almappájában így:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Érvényesítse a bemenetet Pydantic modell használatával
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TEENDŐ: adjon hozzá Pydantic-et, hogy létrehozhassunk egy AddInputModel-t és érvényesíthessük az argumentumokat

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Itt látható, hogyan definiáljuk a nevet, leírást és a Pydantic input sémát, valamint egy kezelőt, amelyet akkor hív meg a rendszer, amikor ez az eszköz meghívásra kerül. Végül pedig kiteszünk egy `tool_add` szótárt, amely tartalmazza ezeket a tulajdonságokat.

Van még a *schema.py*, amely az eszköz input sémáját határozza meg:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Továbbá ki kell tölteni a *__init__.py* fájlt, hogy a tools könyvtár modulként legyen kezelve. Továbbá a benne lévő modulokat így ki kell tenni:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Ezt a fájlt bővíthetjük, miközben több eszközt adunk hozzá.

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

Itt létrehozunk egy objektumot, amely az alábbi tulajdonságokat tartalmazza:

- name, ez az eszköz neve.
- rawSchema, ez a Zod séma, amely az eszköz meghívására érkező kérések validálására szolgál.
- inputSchema, ezt a sémát használja a kezelő.
- callback, ezt használjuk az eszköz meghívására.

Van még egy `Tool` típus, amely átalakítja ezt az objektumot olyan típussá, amit az mcp szerver kezelője elfogad, így néz ki:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Létezik a *schema.ts* is, ahol az egyes eszközök input sémáit tároljuk, jelenleg csak egy séma van benne, de ahogy további eszközöket adunk hozzá, egyre több bejegyzés lehet:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Nagyszerű, folytassuk most egy eszközök listázását kezelő függvény írásával.

### -3- Eszközök listázásának kezelése

Az eszközök lista kezeléséhez be kell állítanunk egy kérés kezelőt. Itt az, amit a szerver fájlhoz hozzá kell adnunk:

**Python**

```python
# a kód a tömörség kedvéért el lett hagyva
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

Itt hozzáadjuk a `@server.list_tools` dekorátort és a hozzá tartozó `handle_list_tools` implementáló függvényt. Ebben listáznunk kell az eszközöket. Vegyük észre, hogy minden eszköznek névvel, leírással és input sémával kell rendelkeznie.

**TypeScript**

Az eszközök listázását kezelő kéréskezelőt a szerveren a `setRequestHandler` hívásával állítjuk be a kérésnek megfelelő sémával, ebben az esetben a `ListToolsRequestSchema`-val.

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
// kód rövidítés miatt elhagyva
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Visszaadja a regisztrált eszközök listáját
  return {
    tools: tools
  };
});
```

Remek, most megoldottuk az eszközök listázásának részét, nézzük meg, hogyan kezelhetjük az eszközök meghívását.

### -4- Egy eszköz hívásának kezelése

Eszköz meghívásához egy másik kérés kezelőt kell beállítanunk, amely arra fókuszál, hogy megkapja, mely funkciót kell meghívni és milyen argumentumokkal.

**Python**

Használjuk a `@server.call_tool` dekorátort, és implementáljuk `handle_call_tool` függvénnyel. Ebben a függvényben ki kell olvasnunk az eszköz nevét, argumentumokat és biztosítani kell, hogy az argumentumok megfelelnek az adott eszköznek. Az argumentumokat ellenőrizhetjük ebben a függvényben vagy alacsonyabb szinten magában az eszközben.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # a tools egy szótár, amelynek kulcsai az eszközök nevei
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # az eszköz meghívása
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Itt történik:

- Az eszköz neve már megvan, mint bemeneti paraméter `name`, az argumentumok pedig az `arguments` szótárban találhatók.

- Az eszközt meghívjuk azzal, hogy `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Az argumentumok validálása a `handler` tulajdonságban (ami egy függvény) történik, ha ez sikertelen, kivétel keletkezik.

Ennyi, így most már teljesen értjük, hogyan történik az eszközök listázása és meghívása alacsony szintű szerverrel.

Lásd a [teljes példát](./code/README.md) itt

## Feladat

Bővítsd a megadott kódot több eszközzel, forrással és üzenetküldéssel, és figyeld meg, hogy csak a tools könyvtárban kell fájlokat hozzáadnod, máshol nem.

*Megoldás nem megadott*

## Összefoglalás

Ebben a fejezetben láttuk, hogyan működik az alacsony szintű szerver megközelítés, és hogyan segíthet nekünk tiszta architektúrát kialakítani, amire építhetünk tovább. Megbeszéltük a validációt is, és bemutattuk, hogyan használhatóak a validációs könyvtárak input sémák létrehozására.

## Mi következik

- Következő: [Egyszerű hitelesítés](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:  
Ez a dokumentum az [Co-op Translator](https://github.com/Azure/co-op-translator) AI fordító szolgáltatás segítségével készült. Bár a pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti, anyanyelvű dokumentum tekintendő hiteles forrásnak. Kritikus információk esetén javasolt a szakmai emberi fordítás igénybevétele. Nem vállalunk felelősséget semmilyen félreértésért vagy félreértelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->