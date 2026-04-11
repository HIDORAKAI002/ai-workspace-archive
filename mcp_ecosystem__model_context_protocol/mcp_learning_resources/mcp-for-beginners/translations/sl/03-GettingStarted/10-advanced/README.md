# Napredna uporaba strežnika

V MCP SDK so izpostavljeni dva različna tipa strežnikov, vaš običajni strežnik in nizkonivojski strežnik. Običajno uporabite običajni strežnik za dodajanje funkcij. V nekaterih primerih pa želite uporabiti nizkonivojski strežnik, na primer:

- Boljša arhitektura. Možno je ustvariti čisto arhitekturo z običajnim strežnikom in nizkonivojskim strežnikom, vendar bi lahko rekli, da je nekoliko lažje z nizkonivojskim strežnikom.
- Razpoložljivost funkcij. Nekatere napredne funkcije je mogoče uporabiti le z nizkonivojskim strežnikom. To boste videli v kasnejših poglavjih, ko bomo dodajali vzorčenje in izzivanje.

## Običajni strežnik v primerjavi z nizkonivojskim strežnikom

Tako izgleda ustvarjanje MCP strežnika z običajnim strežnikom

**Python**

```python
mcp = FastMCP("Demo")

# Dodajte orodje za seštevanje
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

// Dodajte orodje za seštevanje
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

Poanta je, da eksplicitno dodate vsako orodje, vir ali poziv, ki ga želite, da ga strežnik ima. V tem ni nič narobe.

### Pristop nizkonivojskega strežnika

Vendar, ko uporabljate pristop nizkonivojskega strežnika, morate o tem razmišljati drugače. Namesto, da registrirate vsako orodje, ustvarite dva upravljavca za vsak tip funkcije (orodja, viri ali pozivi). Na primer orodja imajo potem samo dve funkciji:

- Če želite našteti vsa orodja. Ena funkcija bi bila odgovorna za vse poskuse seznanjanja orodij.
- Obdelavo klicev do vseh orodij. Tudi tukaj obstaja samo ena funkcija, ki obdeluje klice do orodja.

Zveni kot potencialno manj dela, kajne? Namesto registracije orodja moram samo zagotoviti, da je orodje na seznamu, ko navajam vsa orodja, in da je klicano, ko pride zahteva za klic orodja.

Poglejmo, kako sedaj izgleda koda:

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
  // Vrni seznam registriranih orodij
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

Zdaj imamo funkcijo, ki vrne seznam funkcij. Vsak vnos na seznamu orodij ima polja, kot so `name`, `description` in `inputSchema`, da ustreza tipu vračila. To nam omogoča, da orodja in definicijo funkcij postavimo drugam. Zdaj lahko ustvarimo vsa orodja v mapi tools in enako velja za vse vaše funkcije, tako da je vaš projekt lahko organiziran takole:

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

Odlično, naša arhitektura je lahko zelo čista.

Kaj pa klic orodij, je potem ista ideja, en upravljalec za klic orodja, katerokoli orodje? Da, natančno, tukaj je koda za to:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools je slovar z imeni orodij kot ključi
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
    // TODO pokliči orodje,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Kot vidite iz zgornje kode, moramo razčleniti orodje, ki ga je treba klicati, in z katerimi argumenti, nato pa nadaljujemo s klicem orodja.

## Izboljšanje pristopa z validacijo

Zaenkrat ste videli, kako lahko vse registracije za dodajanje orodij, virov in pozivov nadomestite s tema dvema upravljalcema za vsak tip funkcije. Kaj še moramo storiti? Dodati bi morali neko obliko validacije, da zagotovimo, da je orodje klicano s pravimi argumenti. Vsak runtime ima svojo rešitev za to, na primer Python uporablja Pydantic, TypeScript pa Zod. Ideja je, da naredimo naslednje:

- Logiko za ustvarjanje funkcije (orodje, vir ali poziv) premaknemo v njeno namensko mapo.
- Dodamo način za validacijo dohodne zahteve, ki na primer kliče orodje.

### Ustvarjanje funkcije

Za ustvarjanje funkcije bomo morali ustvariti datoteko za to funkcijo in poskrbeti, da ima obvezna polja, ki jih zahteva ta funkcija. Polja se nekoliko razlikujejo med orodji, viri in pozivi.

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
        # Preveri vhod z uporabo Pydantic modela
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: dodaj Pydantic, da lahko ustvarimo AddInputModel in preverimo argumente

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

tukaj lahko vidite, kako naredimo naslednje:

- Ustvarimo shemo s Pydantic `AddInputModel` s polji `a` in `b` v datoteki *schema.py*.
- Poskusimo razčleniti dohodno zahtevo, da ustreza tipu `AddInputModel`, če obstaja neskladje v parametrih, se bo to sesulo:

   ```python
   # add.py
    try:
        # Preveri vhodne podatke z uporabo Pydantic modela
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Lahko se odločite, ali boste to logiko razčlenjevanja dali v sam klic orodja ali v funkcijo upravljavca.

**TypeScript**

```typescript
// strežnik.ts
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

// shema.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// dodaj.ts
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

- V upravljalcu, ki obravnava vse klice orodij, zdaj poskušamo razčleniti dohodno zahtevo v shemo orodja:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    če uspe, potem nadaljujemo s klicem dejanskega orodja:

    ```typescript
    const result = await tool.callback(input);
    ```

Kot vidite, ta pristop ustvari odlično arhitekturo, saj ima vse svoje mesto. *server.ts* je zelo majhna datoteka, ki samo poveže upravljalce zahtev, vsaka funkcija pa je v svoji mapi, npr. tools/, resources/ ali /prompts.

Odlično, poskusimo to naslednje zgraditi.

## Vaja: Ustvarjanje nizkonivojskega strežnika

V tej vaji bomo naredili naslednje:

1. Ustvarili nizkonivojski strežnik, ki obravnava seznam orodij in klic orodij.
1. Implementirali arhitekturo, na kateri lahko gradite.
1. Dodali validacijo, da zagotovimo pravilno validacijo vaših klicev orodij.

### -1- Ustvarimo arhitekturo

Prva stvar, ki jo moramo urediti, je arhitektura, ki nam pomaga skalirati, ko dodajamo več funkcij, tako izgleda:

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

Zdaj smo postavili arhitekturo, ki omogoča enostavno dodajanje novih orodij v mapo tools. Prosto dodajte podmape za vire in pozive.

### -2- Ustvarjanje orodja

Poglejmo, kako zgleda ustvarjanje orodja. Najprej mora biti ustvarjeno v svoji podmapi *tool* tako:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Preveri vhodne podatke z uporabo Pydantic modela
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: dodaj Pydantic, da lahko ustvarimo AddInputModel in preverimo argumente

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Tukaj vidimo, kako definiramo ime, opis in vhodno shemo s Pydantic, ter upravljalca, ki se bo poklical, ko bo to orodje klicano. Na koncu razkrijemo `tool_add`, ki je slovar z vsemi temi lastnostmi.

Prav tako je tu *schema.py*, ki se uporablja za definicijo vhodne sheme, ki jo uporablja naše orodje:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Prav tako moramo zapolniti *__init__.py*, da zagotovimo, da je imenik tools obravnavan kot modul. Poleg tega moramo razkriti module znotraj tega imenika takole:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

V to datoteko lahko še naprej dodajamo, ko dodajamo več orodij.

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

Tukaj ustvarimo slovar, ki vsebuje lastnosti:

- name, to je ime orodja.
- rawSchema, to je Zod shema, ki se bo uporabila za validacijo dohodnih zahtev za klic orodja.
- inputSchema, to shemo bo uporabil upravljalec.
- callback, to se uporablja za klic orodja.

Prav tako je `Tool`, ki se uporabi za pretvorbo tega slovarja v tip, ki ga lahko sprejme upravljalec MCP strežnika in izgleda tako:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

In tukaj je *schema.ts*, kjer shranjujemo vhodne sheme za vsako orodje, ki izgleda tako z trenutno samo eno shemo, vendar lahko s dodajanjem orodij dodamo več vnosov:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Odlično, nadaljujmo z obravnavo seznama orodij.

### -3- Obravnavanje seznama orodij

Nato, da obravnavamo seznam naših orodij, moramo nastaviti upravljalca zahtev za to. Tukaj je, kaj moramo dodati v našo datoteko strežnika:

**Python**

```python
# koda je izpuščena zaradi jedrnatosti
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

Tukaj dodamo dekorator `@server.list_tools` in implementiramo funkcijo `handle_list_tools`. V slednji moramo ustvariti seznam orodij. Opazite, da mora vsako orodje imeti ime, opis in inputSchema.

**TypeScript**

Za nastavitev upravljalca zahtev za seznam orodij pokličemo `setRequestHandler` na strežniku s shemo, ki ustreza temu, kar želimo narediti, v tem primeru `ListToolsRequestSchema`.

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
// koda izpuščena zaradi jedrnatosti
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Vrni seznam registriranih orodij
  return {
    tools: tools
  };
});
```

Odlično, zdaj smo rešili del seznanjanja orodij, poglejmo, kako lahko kličemo orodja.

### -4- Obravnavanje klica orodja

Za klic orodja moramo nastaviti še en upravljalec zahtev, tokrat osredotočen na obravnavo zahteve, ki določa, katero funkcijo poklicati in s katerimi argumenti.

**Python**

Uporabimo dekorator `@server.call_tool` in implementiramo funkcijo, kot je `handle_call_tool`. V tej funkciji moramo razčleniti ime orodja, njegove argumente in zagotoviti, da so argumenti veljavni za dano orodje. Arguments lahko validiramo bodisi tukaj ali kasneje v samem orodju.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools je slovar z imeni orodij kot ključi
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # pokliči orodje
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Tukaj poteka:

- Ime našega orodja je že prisotno kot vhodni parameter `name`, enako za argumente v slovarju `arguments`.

- Orodje se kliče z `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Validacija argumentov poteka v lastnosti `handler`, ki kaže na funkcijo; če ne uspe, bo sprožila izjemo.

Tako, zdaj imamo popolno razumevanje seznanjanja in klicanja orodij z nizkonivojskim strežnikom.

Oglejte si [poln primer](./code/README.md) tukaj

## Naloga

Razširite dano kodo z več orodji, viri in pozivi ter opazujte, kako morate datoteke dodajati samo v mapo tools in nikjer drugje.

*Rešitev ni dana*

## Povzetek

V tem poglavju smo videli, kako deluje pristop nizkonivojskega strežnika in kako nam lahko pomaga ustvariti lepo arhitekturo, na kateri lahko še nadalje razvijamo. Pogovorili smo se tudi o validaciji in pokazali, kako delati z validacijskimi knjižnicami za ustvarjanje shem za validacijo vhodov.

## Kaj sledi

- Naslednje: [Enostavna avtentikacija](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, upoštevajte, da lahko avtomatizirani prevodi vsebujejo napake ali netočnosti. Izvirni dokument v njegovem matičnem jeziku velja za avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Nismo odgovorni za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->