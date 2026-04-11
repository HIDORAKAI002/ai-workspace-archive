# Napredno korištenje servera

U MCP SDK-u postoje dvije različite vrste servera, vaš normalni server i niskorazinski server. Obično biste koristili obični server za dodavanje značajki. Međutim, u nekim slučajevima želite se osloniti na niskorazinski server, poput:

- Bolje arhitekture. Moguće je stvoriti čistu arhitekturu s oba, običnim i niskorazinskim serverom, ali može se tvrditi da je malo lakše s niskorazinskim serverom.
- Dostupnost značajki. Neke napredne značajke mogu se koristiti samo s niskorazinskim serverom. To ćete vidjeti u kasnijim poglavljima kad dodajemo uzorkovanje i poticanje.

## Obični server vs niskorazinski server

Evo kako izgleda kreiranje MCP Servera s običnim serverom

**Python**

```python
mcp = FastMCP("Demo")

# Dodajte alat za zbrajanje
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

// Dodajte alat za zbrajanje
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

Poanta je da eksplicitno dodate svaki alat, resurs ili prompt koji želite da server ima. Nema ništa loše u tome.

### Pristup niskorazinskog servera

Međutim, kada koristite pristup niskorazinskog servera, morate o tome razmišljati drugačije. Umjesto registracije svakog alata, vi zapravo kreirate dva handlera po tipu značajke (alat, resurs ili prompt). Na primjer, alati imaju samo dvije funkcije:

- Prikaz svih alata. Jedna funkcija bi bila odgovorna za sve pokušaje popisa alata.
- Obrada pozivanja svih alata. Ovdje također postoji samo jedna funkcija koja obrađuje pozive na alat.

To zvuči kao potencijalno manje posla, zar ne? Dakle, umjesto registracije alata, samo trebam osigurati da je alat naveden kad listam sve alate i da se pozove kada stigne zahtjev za pozivanje alata.

Pogledajmo kako sada izgleda kod:

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
  // Vrati popis registriranih alata
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

Ovdje sada imamo funkciju koja vraća popis značajki. Svaki unos u listi alata sada ima polja poput `name`, `description` i `inputSchema` koja slijede tip povratka. To nam omogućuje da stavimo naše alate i definiciju značajki negdje drugdje. Sada možemo kreirati sve naše alate u mapi tools, i isto vrijedi za sve vaše značajke, tako da vaš projekt iznenada može biti organiziran ovako:

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

To je sjajno, naša arhitektura može izgledati prilično čisto.

A što je s pozivanjem alata, je li to ista ideja onda, jedan handler da pozove bilo koji alat? Da, upravo tako, evo koda za to:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools je rječnik s imenima alata kao ključevima
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
    // TODO pozvati alat,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Kao što vidite iz gornjeg koda, trebamo izdvojiti alat kojeg treba pozvati i s kojim argumentima, a zatim nastaviti s pozivanjem alata.

## Poboljšanje pristupa s validacijom

Do sada ste vidjeli kako se sve vaše registracije za dodavanje alata, resursa i prompta mogu zamijeniti s ova dva handlera po tipu značajke. Što još trebamo napraviti? Pa, trebamo dodati neki oblik validacije kako bismo osigurali da se alat poziva s pravim argumentima. Svako runtime okruženje ima svoje rješenje za to, primjerice Python koristi Pydantic, a TypeScript koristi Zod. Ideja je da napravimo sljedeće:

- Premjestimo logiku za kreiranje značajke (alat, resurs ili prompt) u njezin posvećeni direktorij.
- Dodamo način za validaciju dolaznog zahtjeva koji traži, na primjer, pozivanje alata.

### Kreiranje značajke

Za kreiranje značajke morat ćemo stvoriti datoteku za tu značajku i osigurati da ima obavezna polja koja ta značajka zahtijeva. Koja se polja razlikuju malo između alata, resursa i prompta.

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
        # Validiraj unos koristeći Pydantic model
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: dodaj Pydantic, kako bismo mogli kreirati AddInputModel i validirati argumente

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Ovdje možete vidjeti kako radimo sljedeće:

- Kreiramo shemu koristeći Pydantic `AddInputModel` s poljima `a` i `b` u datoteci *schema.py*.
- Pokušavamo parsirati dolazni zahtjev kao tip `AddInputModel`, ako postoji neslaganje u parametrima, dohvat će se greška:

   ```python
   # add.py
    try:
        # Validirajte unos pomoću Pydantic modela
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Možete odlučiti hoćete li ovu logiku parsiranja staviti u sam poziv alata ili u handler funkciju.

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

- U handleru koji obrađuje sve pozive alata, sada pokušavamo parsirati dolazni zahtjev u alatima definiranu shemu:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    Ako to uspije, nastavljamo s pozivanjem stvarnog alata:

    ```typescript
    const result = await tool.callback(input);
    ```

Kao što vidite, ovaj pristup stvara izvrsnu arhitekturu jer sve ima svoje mjesto, *server.ts* je vrlo mala datoteka koja samo povezuje handler-e zahtjeva, a svaka značajka je u svom direktoriju, npr. tools/, resources/ ili /prompts.

Super, pokušajmo to sljedeće izgraditi.

## Vježba: Kreiranje niskorazinskog servera

U ovoj vježbi učinit ćemo sljedeće:

1. Kreirati niskorazinski server koji obrađuje prikaz alata i pozivanje alata.
2. Implementirati arhitekturu na kojoj možete graditi.
3. Dodati validaciju kako biste osigurali da su vaši pozivi alatu ispravno validirani.

### -1- Kreiranje arhitekture

Prvo što trebamo napraviti je arhitektura koja nam pomaže proširivati se kako dodajemo više značajki, evo kako to izgleda:

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

Sada smo postavili arhitekturu koja osigurava da lako možemo dodavati nove alate u mapi tools. Slobodno nastavite i za resurse i prompty dodajte poddirektorije.

### -2- Kreiranje alata

Pogledajmo kako izgleda kreiranje alata sljedeće. Prvo, mora biti kreiran u svom *tool* poddirektoriju ovako:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Validiraj unos korištenjem Pydantic modela
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: dodaj Pydantic, kako bismo mogli napraviti AddInputModel i validirati argumente

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Ovdje vidimo kako definiramo ime, opis i shemu ulaza koristeći Pydantic te handler koji će biti pozvan jednom kad se alat pozove. Na kraju izlažemo `tool_add` koji je rječnik koji drži sva ta svojstva.

Postoji i *schema.py* koji se koristi za definiranje sheme ulaza koju koristi naš alat:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Također trebamo popuniti *__init__.py* kako bi katalog tools bio tretiran kao modul. Osim toga, trebamo izložiti module unutar njega ovako:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Možemo nastaviti dodavati u ovu datoteku kako dodajemo više alata.

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

Ovdje kreiramo rječnik koji sadrži svojstva:

- name, ime alata.
- rawSchema, Zod shema koja će se koristiti za validaciju dolaznih zahtjeva za pozivanje ovog alata.
- inputSchema, ova shema će se koristiti u handleru.
- callback, koristi se za pozivanje alata.

Postoji i `Tool` koji se koristi za pretvaranje ovog rječnika u tip koji mcp server handler može prihvatiti, i izgleda ovako:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

I tu je *schema.ts* gdje držimo sheme ulaza za svaki alat, trenutno s jednom shemom, ali kako dodajemo alate možemo dodavati više unosa:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Super, sada nastavljamo s obradom prikaza naših alata.

### -3- Obrada prikaza alata

Za obradu prikaza naših alata, treba nam postaviti request handler za to. Evo što trebamo dodati u našu serversku datoteku:

**Python**

```python
# kod izostavljen radi sažetosti
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

Ovdje dodajemo dekorator `@server.list_tools` i funkciju `handle_list_tools`. U zadnjoj moramo proizvesti listu alata. Primijetite da svaki alat mora imati ime, opis i inputSchema.

**TypeScript**

Da postavimo request handler za prikaz alata, moramo pozvati `setRequestHandler` na serveru s odgovarajućom shemom onome što želimo, u ovom slučaju `ListToolsRequestSchema`.

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
// kod izostavljen radi sažetka
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Vrati popis registriranih alata
  return {
    tools: tools
  };
});
```

Super, sada smo riješili dio prikaza alata, pogledajmo kako bismo mogli pozivati alate sljedeće.

### -4- Obrada pozivanja alata

Za pozivanje alata, trebamo postaviti još jedan request handler, ovaj put fokusiran na zahtjev koji specificira koju značajku pozvati i s kojim argumentima.

**Python**

Koristimo dekorator `@server.call_tool` i implementiramo ga funkcijom poput `handle_call_tool`. U toj funkciji trebamo izdvojiti ime alata, njegove argumente i osigurati da su argumenti valjani za taj alat. Argumente možemo validirati u ovoj funkciji ili u samom alatu.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools je rječnik s imenima alata kao ključevima
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # pozvati alat
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Evo što se događa:

- Ime našeg alata već je prisutno kao ulazni parametar `name`, a njegovi argumenti su u obliku rječnika `arguments`.

- Alat se poziva s `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Validacija argumenata se događa u `handler` svojstvu koje pokazuje na funkciju, ako to zakaže, baca iznimku.

Eto, sada imamo potpuni uvid u prikaz i pozivanje alata koristeći niskorazinski server.

Pogledajte [cijeli primjer](./code/README.md) ovdje

## Zadatak

Proširite kod koji ste dobili s većim brojem alata, resursa i prompta i razmislite kako primjećujete da trebate dodavati samo datoteke u direktorij tools i nigdje drugdje.

*Rješenje nije dano*

## Sažetak

U ovom poglavlju vidjeli smo kako funkcionira pristup niskorazinskog servera i kako nam to može pomoći stvoriti lijepu arhitekturu na kojoj možemo nastaviti graditi. Također smo razgovarali o validaciji i pokazano vam je kako raditi s bibliotekama za validaciju za kreiranje shema za validaciju ulaza.

## Što je sljedeće

- Sljedeće: [Jednostavna autentifikacija](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Odricanje od odgovornosti**:
Ovaj je dokument preveden korištenjem AI usluge za prijevod [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, molimo imajte na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za kritične informacije preporučuje se profesionalni ljudski prijevod. Ne snosimo odgovornost za bilo kakve nesporazume ili kriva tumačenja nastala upotrebom ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->