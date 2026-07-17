# Napredna raba strežnika

V SDK MCP so na voljo dva različna tipa strežnikov: običajni strežnik in nizkonivojski strežnik. Običajno bi uporabili običajni strežnik za dodajanje funkcij. V nekaterih primerih pa želite uporabiti nizkonivojski strežnik, na primer:

- Boljša arhitektura. Možno je ustvariti čisto arhitekturo z običajnim strežnikom in nizkonivojskim strežnikom, vendar lahko trdimo, da je to nekoliko lažje z nizkonivojskim strežnikom.
- Razpoložljivost funkcij. Nekatere napredne funkcije je mogoče uporabiti le z nizkonivojskim strežnikom. To boste videli v kasnejših poglavjih, ko bomo dodali vzorčenje (opravilo v izdaji kandidata `2026-07-28`) in izzivanje.

## Običajni strežnik proti nizkonivojskemu strežniku

Tako zgleda ustvarjanje MCP strežnika z običajnim strežnikom

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

// Dodaj orodje za seštevanje
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

Namen je, da eksplicitno dodamo vsako orodje, vir ali poziv, ki ga želimo, da ga strežnik vsebuje. Ni nič narobe s tem.  

### Pristop nizkonivojskega strežnika

Ko uporabljate pristop nizkonivojskega strežnika, morate razmišljati drugače. Namesto, da registrirate vsako orodje posebej, ustvarite dva upravljavca na tip funkcije (orodja, viri ali pozivi). Na primer, orodja imajo le dve funkciji, kot sledi:

- Seznam vseh orodij. Ena funkcija je odgovorna za vse poskuse seznama orodij.
- upravljanje klicev vseh orodij. Tudi tukaj je samo ena funkcija, ki upravlja klice na orodje

Zveni kot potencialno manj dela, kajne? Namesto registracije orodja moram le poskrbeti, da je orodje na seznamu, ko naštejem vsa orodja, in da se kliče, ko pride zahteva za klic orodja.

Oglejmo si, kako zdaj izgleda koda:

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

Zdaj imamo funkcijo, ki vrne seznam funkcij. Vsak vnos na seznamu orodij ima sedaj polja, kot so `name`, `description` in `inputSchema`, da ustreza tipu vrnitve. To nam omogoča, da svoje orodje in definicijo funkcije postavimo drugam. Sedaj lahko v mapi tools ustvarimo vsa orodja in enako velja za vse funkcije, tako da je vaš projekt lahko organiziran takole:

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

Super, naša arhitektura je lahko zelo čista.

Kaj pa klic orodij, je potem ista ideja, en upravljalec za klic orodja, ne glede katero orodje? Da, točno tako, tukaj je koda za to:

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

Kot lahko vidite iz zgornje kode, moramo razčleniti, katero orodje klicati in s kakšnimi argumenti, nato pa moramo nadaljevati s klicem orodja.

## Izboljšanje pristopa z validacijo

Do sedaj ste videli, da lahko vse registracije za dodajanje orodij, virov in pozivov zamenjate s tema dvema upravljalcema na tip funkcije. Kaj še moramo narediti? Dodajmo nek obliko validacije, da zagotovimo, da se orodje kliče z ustreznimi argumenti. Vsako izvajalno okolje ima svojo rešitev za to, na primer Python uporablja Pydantic, TypeScript pa Zod. Ideja je, da naredimo naslednje:

- Premaknemo logiko ustvarjanja funkcije (orodje, vir ali poziv) v namensko mapo.
- Dodamo način preverjanja dohodne zahteve, na primer za klic orodja.

### Ustvarjanje funkcije

Za ustvarjanje funkcije moramo ustvariti datoteko za to funkcijo in zagotoviti, da vsebuje obvezna polja, zahtevana za to funkcijo. Polja se nekoliko razlikujejo med orodji, viri in pozivi.

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

tukaj vidite, da naredimo naslednje:

- Ustvarimo shemo z uporabo Pydantic `AddInputModel` s polji `a` in `b` v datoteki *schema.py*.
- Poskušamo razčleniti dohodno zahtevo, da je tipa `AddInputModel`, če so parametri napačni, bo to zrušilo program:

   ```python
   # add.py
    try:
        # Preveri vhodne podatke z uporabo Pydantic modela
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

To logiko razčlenjevanja lahko postavite bodisi v sam klic orodja bodisi v funkcijo upravljalca.

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

- V upravljalcu, ki upravlja vse klice orodij, poskušamo razčleniti dohodno zahtevo v definirano shemo orodja:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    če to uspe, nato nadaljujemo s klicem dejanskega orodja:

    ```typescript
    const result = await tool.callback(input);
    ```

Kot lahko vidite, ta pristop ustvari odlično arhitekturo, saj ima vse svoje mesto, *server.ts* je zelo majhna datoteka, ki samo poveže upravljavce zahtev, vsaka funkcija pa je v svoji mapi, torej tools/, resources/ ali /prompts.

Super, poskusimo to zdaj sestaviti. 

## Vaja: Ustvarjanje nizkonivojskega strežnika

V tej vaji bomo naredili naslednje:

1. Ustvarili nizkonivojski strežnik, ki upravlja seznam orodij in klice orodij.
1. Implementirali arhitekturo, na katero lahko gradite.
1. Dodali validacijo, da zagotovite pravilno preverjanje klicev orodij.

### -1- Ustvarjanje arhitekture

Prvi korak je narediti arhitekturo, ki nam pomaga pri širjenju, ko dodajamo več funkcij, tako zgleda:

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

Sedaj smo postavili arhitekturo, ki zagotavlja, da lahko zlahka dodamo nova orodja v mapo tools. Lahko dodate tudi podmape za vire in pozive.

### -2- Ustvarjanje orodja

Oglejmo si, kako izgleda ustvarjanje orodja. Najprej mora biti ustvarjeno v svoji podmapi *tool*, takole:

**Python**

```python
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

Tukaj vidimo, kako definiramo ime, opis in vhodno shemo z uporabo Pydantic ter upravljalca, ki bo priklican, ko se orodje kliče. Na koncu izpostavimo `tool_add`, ki je slovar s temi lastnostmi.

Prav tako imamo *schema.py*, ki definira vhodno shemo, ki jo uporablja naše orodje:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Moramo tudi napolniti *__init__.py*, da zagotovimo, da je mapa tools obravnavana kot modul. Poleg tega moramo izpostaviti module v njem, takole:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

To datoteko lahko nadaljujemo polniti, ko dodajamo več orodij.

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
- rawSchema, to je Zod shema, ki bo uporabljena za validacijo dohodnih zahtev za klic orodja.
- inputSchema, to shemo bo uporabljal upravljalec.
- callback, to se uporablja za priklic orodja.

Prav tako obstaja `Tool`, ki se uporablja za pretvorbo tega slovarja v tip, ki ga lahko sprejme upravljalec MCP strežnika, in izgleda takole:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

In imamo *schema.ts*, kjer shranjujemo vhodne sheme za vsako orodje, trenutno samo ena shema, a ko dodajamo orodja lahko dodamo še več vnosov:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Super, nadaljujmo z obravnavo seznama orodij.

### -3- Upravljanje seznama orodij

Za upravljanje seznama orodij moramo nastaviti upravljalca zahtev za to. Tukaj je, kar moramo dodati v datoteko strežnika:

**Python**

```python
# koda izpuščena v kratkost
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

Tu dodamo dekorator `@server.list_tools` in implementiramo funkcijo `handle_list_tools`. V slednji moramo ustvariti seznam orodij. Opazite, da mora imeti vsako orodje ime, opis in inputSchema.   

**TypeScript**

Da nastavimo upravljalca zahtev za seznam orodij, moramo na strežniku poklicati `setRequestHandler` s shemo, ki ustreza temu, kar želimo narediti, v tem primeru `ListToolsRequestSchema`. 

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

Super, sedaj smo rešili del s seznamom orodij, poglejmo, kako bi klicali orodja.

### -4- Upravljanje klica orodja

Za klic orodja moramo nastaviti še enega upravljalca zahtev, tokrat za obravnavo zahteve, ki specificira, katero funkcijo klicati in s kakšnimi argumenti.

**Python**

Uporabimo dekorator `@server.call_tool` in ga implementiramo s funkcijo, kot je `handle_call_tool`. V tej funkciji moramo razbrati ime orodja, njegove argumente in zagotoviti, da so argumenti veljavni za izbrano orodje. Argumente lahko validiramo tukaj ali kasneje v samem orodju.

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

Tukaj se dogaja:

- Ime orodja je že podano kot vhodni parameter `name`, kar velja tudi za argumente v obliki slovarja `arguments`.

- Orodje se kliče z `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Validacija argumentov se izvaja v lastnosti `handler`, ki kaže na funkcijo, če to ne uspe, bo sprožila izjemo. 

Sedaj razumemo, kako seznam in klic orodij delujeta s pomočjo nizkonivojskega strežnika.

Poglejte [celoten primer](./code/README.md) tukaj

## Naloga

Razširite dano kodo z več orodji, viri in pozivi in opazujte, kako morate dodajati datoteke samo v mapo tools in nikjer drugje.

*Rešitev ni dana*

## Povzetek

V tem poglavju smo videli, kako deluje pristop nizkonivojskega strežnika in kako lahko pomaga ustvariti lepo arhitekturo, na kateri lahko gradimo. Prav tako smo govorili o validaciji in pokazali, kako delati z validacijskimi knjižnicami za ustvarjanje shem za preverjanje vhodov.

## Kaj sledi

- Naslednje: [Preprosta avtentikacija](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->