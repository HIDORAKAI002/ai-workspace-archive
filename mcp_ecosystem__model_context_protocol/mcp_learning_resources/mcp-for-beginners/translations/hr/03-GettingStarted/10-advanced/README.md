# Napredna upotreba servera

U MCP SDK-u izložena su dvije različite vrste servera, vaš uobičajeni server i niskorazinski server. Obično biste koristili uobičajeni server za dodavanje funkcionalnosti. Međutim, u nekim slučajevima želite se osloniti na niskorazinski server, poput:

- Bolja arhitektura. Moguće je stvoriti čistu arhitekturu s oba servera, i uobičajenim i niskorazinskim, ali može se tvrditi da je malo lakše s niskorazinskim serverom.
- Dostupnost značajki. Neke napredne značajke mogu se koristiti samo s niskorazinskim serverom. To ćete vidjeti u kasnijim poglavljima kada dodajemo uzorkovanje (zastarjelo u izlaznom kandidatu `2026-07-28`) i elicitation.

## Uobičajeni server vs niskorazinski server

Evo kako izgleda stvaranje MCP Servera s uobičajenim serverom

**Python**

```python
mcp = FastMCP("Demo")

# Dodajte alat za sabiranje
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

Poanta je da eksplicitno dodajete svaki alat, resurs ili prompt koji želite da server ima. Nema problema s tim.  

### Pristup niskorazinskog servera

Međutim, kada koristite pristup niskorazinskog servera, morate razmišljati drugačije. Umjesto da registrirate svaki alat, umjesto toga kreirate dva upravitelja po vrsti značajke (alatima, resursima ili promptovima). Na primjer, alati tada imaju samo dvije funkcije na sljedeći način:

- Popisivanje svih alata. Jedna funkcija bi bila odgovorna za sve pokušaje popisivanja alata.
- rukovanje pozivima svih alata. Tu također postoji samo jedna funkcija koja rukuje pozivima alata.

To zvuči kao potencijalno manje posla, zar ne? Dakle, umjesto registracije alata, samo trebam osigurati da je alat naveden kada popisujem sve alate i da se poziva kada postoji dolazni zahtjev za pozivanjem alata. 

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

Ovdje sada imamo funkciju koja vraća popis značajki. Svaki unos u popisu alata sada ima polja poput `name`, `description` i `inputSchema` kako bi odgovarali tipu povratka. Ovo nam omogućuje da smjestimo naše alate i definicije značajki negdje drugdje. Sada možemo kreirati sve naše alate u mapi tools i isto vrijedi za sve vaše značajke kako bi vaš projekt mogao biti organiziran na sljedeći način:

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

To je sjajno, naša arhitektura može biti prilično čista.

A što je s pozivanjem alata, je li to ista ideja, jedan upravitelj za pozivanje bilo kojeg alata? Da, upravo tako, evo koda za to:

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

Kao što vidite iz gornjeg koda, trebamo izdvojiti alat koji se poziva i s kojim argumentima, a zatim trebamo nastaviti s pozivanjem alata.

## Unaprjeđenje pristupa s validacijom

Do sada ste vidjeli kako se sve vaše registracije za dodavanje alata, resursa i promptova mogu zamijeniti s ova dva upravitelja po vrsti značajke. Što još trebamo učiniti? Pa, trebali bismo dodati neku vrstu validacije kako bismo osigurali da se alat poziva s ispravnim argumentima. Svaka runtime okolina ima svoje rješenje za to, na primjer Python koristi Pydantic, a TypeScript koristi Zod. Ideja je da napravimo sljedeće:

- Premjestimo logiku za stvaranje značajke (alat, resurs ili prompt) u njezinu posebnu mapu.
- Dodajemo način za validaciju dolaznog zahtjeva za, na primjer, poziv alata.

### Kreiranje značajke

Za kreiranje značajke, trebamo napraviti datoteku za tu značajku i osigurati da ima obavezna polja koja ta značajka zahtijeva. Koja se polja razlikuju malo između alata, resursa i promptova.

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
        # Validiraj ulaz koristeći Pydantic model
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: dodaj Pydantic kako bismo mogli kreirati AddInputModel i validirati argumenate

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
- Pokušavamo parsirati dolazni zahtjev da bude tipa `AddInputModel`, ako postoji neslaganje u parametrima, to će izazvati pad:

   ```python
   # add.py
    try:
        # Provjerite unos pomoću Pydantic modela
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Možete odlučiti hoćete li ovu logiku parsiranja staviti u sam poziv alata ili u funkciju upravitelja.

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

- U upravitelju koji obrađuje sve pozive alata, sada pokušavamo parsirati dolazni zahtjev u definiranu shemu alata:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ako to uspije, zatim nastavljamo s pozivanjem stvarnog alata:

    ```typescript
    const result = await tool.callback(input);
    ```

Kao što vidite, ovaj pristup stvara izvrsnu arhitekturu jer sve ima svoje mjesto, *server.ts* je vrlo mala datoteka koja samo povezuje upravitelje zahtjeva, a svaka značajka je u svojoj odgovarajućoj mapi, npr. tools/, resources/ ili prompts/.

Odlično, pokušajmo sada to izgraditi. 

## Vježba: Kreiranje niskorazinskog servera

U ovoj vježbi, učinit ćemo sljedeće:

1. Kreirajte niskorazinski server koji upravlja popisivanjem alata i pozivanjem alata.
1. Implementirajte arhitekturu na koju se možete nadograđivati.
1. Dodajte validaciju kako biste osigurali da su pozivi vaših alata ispravno validirani.

### -1- Kreiranje arhitekture

Prva stvar koju trebamo riješiti je arhitektura koja nam pomaže da skaliramo dok dodajemo više značajki, evo kako to izgleda:

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

Sada smo postavili arhitekturu koja osigurava da lako možemo dodavati nove alate u mapu tools. Slobodno slijedite ovo za dodavanje poddirektorija za resources i prompts.

### -2- Kreiranje alata

Pogledajmo kako izgleda kreiranje alata. Prvo, treba ga kreirati u njegovu *tool* poddirektoriju na sljedeći način:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Validiraj unos koristeći Pydantic model
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

Ovdje vidimo kako definiramo ime, opis i ulaznu shemu koristeći Pydantic i upravitelja koji će se pozvati kada se ovaj alat pozove. Na kraju izlažemo `tool_add` koji je rječnik koji drži sva ta svojstva.

Također postoji *schema.py* koji se koristi za definiranje ulazne sheme koju koristi naš alat:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Također trebamo popuniti *__init__.py* kako bismo osigurali da se mapa tools tretira kao modul. Osim toga, trebamo izložiti module unutar nje na sljedeći način:

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

Ovdje stvaramo rječnik koji se sastoji od svojstava:

- name, ovo je ime alata.
- rawSchema, ovo je Zod shema, koristi se za validaciju dolaznih zahtjeva za pozivanje ovog alata.
- inputSchema, ovu shemu koristi upravitelj.
- callback, koristi se za pozivanje alata.

Također postoji `Tool` koji se koristi za pretvaranje ovog rječnika u tip koji mcp server upravitelj može prihvatiti i izgleda ovako:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

I postoji *schema.ts* gdje pohranjujemo ulazne sheme za svaki alat koje izgledaju ovako s trenutno samo jednom shemom, ali kako dodajemo alate možemo dodavati još unosa:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Odlično, nastavimo s upravljanjem popisom naših alata.

### -3- Upravljanje popisom alata

Dalje, za upravljanje popisom naših alata, trebamo postaviti upravitelja zahtjeva za to. Evo što trebamo dodati u datoteku servera:

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

Ovdje dodajemo dekorator `@server.list_tools` i funkciju implementacije `handle_list_tools`. U potonjoj treba proizvesti popis alata. Primijetite kako svaki alat treba imati ime, opis i inputSchema.   

**TypeScript**

Za postavljanje upravitelja zahtjeva za popisivanje alata, trebamo pozvati `setRequestHandler` na serveru s shemom koja odgovara onome što želimo napraviti, u ovom slučaju `ListToolsRequestSchema`. 

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
// kod izostavljen radi sažetosti
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Vraća popis registriranih alata
  return {
    tools: tools
  };
});
```

Odlično, sada smo riješili dio s popisivanjem alata, pogledajmo kako bismo mogli pozivati alate.

### -4- Upravljanje pozivanjem alata

Za pozivanje alata, trebamo postaviti još jednog upravitelja zahtjeva, ovaj put fokusiranog na obradu zahtjeva koji specificira koju značajku pozvati i s kojim argumentima.

**Python**

Koristimo dekorator `@server.call_tool` i implementiramo ga funkcijom poput `handle_call_tool`. U toj funkciji trebamo izdvojiti ime alata, njegove argumente i osigurati da su argumenti valjani za dotični alat. Argumente možemo validirati ili u ovoj funkciji ili u stvarnom alatu.

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
        # pozovi alat
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Evo što se događa:

- Ime našeg alata već je prisutno kao ulazni parametar `name`, što vrijedi i za naše argumente u obliku rječnika `arguments`.

- Alat se poziva sa `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Validacija argumenata događa se u svojstvu `handler` koje pokazuje na funkciju, ako to zakaže, podiže se iznimka. 

Eto, sada imamo potpuno razumijevanje kako funkcionira popisivanje i pozivanje alata koristeći niskorazinski server.

Pogledajte [puni primjer](./code/README.md) ovdje

## Zadatak

Proširite kod koji ste dobili s nekoliko alata, resursa i promptova i razmislite kako primjećujete da je potrebno samo dodavati datoteke u direktorij tools i nigdje drugdje. 

*Rješenje nije dano*

## Sažetak

U ovom poglavlju vidjeli smo kako pristup niskorazinskog servera funkcionira i kako nam može pomoći da kreiramo lijepu arhitekturu na kojoj možemo nastaviti graditi. Također smo razgovarali o validaciji i pokazano vam je kako raditi s bibliotekama za validaciju kako biste kreirali sheme za validaciju unosa.

## Što slijedi

- Sljedeće: [Jednostavna autentikacija](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->