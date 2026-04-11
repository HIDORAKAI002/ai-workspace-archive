# Pokročilé použitie servera

V MCP SDK sú vystavené dva rôzne typy serverov, bežný server a nízkoúrovňový server. Normálne by ste použili bežný server na pridávanie funkcií. V niektorých prípadoch však chcete využiť nízkoúrovňový server, napríklad:

- Lepšia architektúra. Je možné vytvoriť čistú architektúru s bežným serverom aj nízkoúrovňovým serverom, ale dá sa povedať, že s nízkoúrovňovým serverom je to o niečo jednoduchšie.
- Dostupnosť funkcií. Niektoré pokročilé funkcie je možné použiť len s nízkoúrovňovým serverom. Ukážeme si to v ďalších kapitolách, keď pridáme vzorkovanie a vyvolanie.

## Bežný server verzus nízkoúrovňový server

Takto vyzerá vytvorenie MCP servera s bežným serverom:

**Python**

```python
mcp = FastMCP("Demo")

# Pridajte nástroj na sčítanie
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

// Pridajte nástroj na sčítanie
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

Pointa je, že explicitne pridávate každý nástroj, zdroj alebo prompt, ktorý chcete, aby server mal. Na tom nie je nič zlé.

### Prístup nízkoúrovňového servera

Pri nízkoúrovňovom serveri je potrebné na to myslieť inak. Namiesto registrácie každého nástroja vytvoríte dva handlery na typ funkcie (nástroje, zdroje alebo prompt). Napríklad nástroje majú len dve funkcie ako napríklad:

- Výpis všetkých nástrojov. Jedna funkcia je zodpovedná za všetky pokusy o výpis nástrojov.
- Spracovanie volania nástrojov. Tu je tiež len jedna funkcia, ktorá spracováva volania nástroja.

To znie ako potenciálne menej práce, však? Namiesto registrácie nástroja stačí zabezpečiť, aby bol nástroj vo výpise nástrojov a aby bol zavolaný, keď príde požiadavka na jeho volanie.

Pozrime sa, ako teraz vyzerá kód:

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
  // Vrátiť zoznam zaregistrovaných nástrojov
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

Tu máme funkciu, ktorá vracia zoznam funkcií. Každá položka v zozname nástrojov má polia ako `name`, `description` a `inputSchema`, aby sme spĺňali návratový typ. To nám umožňuje umiestniť definície nástrojov a funkcií inde. Môžeme vytvoriť všetky nástroje vo priečinku tools a podobne pre všetky funkcie, takže projekt môže byť zrazu usporiadaný takto:

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

To je skvelé, naša architektúra môže vyzerať celkom čisto.

A čo volanie nástrojov, platí rovnaký princíp - jeden handler na volanie nástroja, akýkoľvek nástroj? Áno, presne tak, tu je kód:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools je slovník s názvami nástrojov ako kľúčmi
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
    // TODO zavolať nástroj,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Ako vidíte z kódu vyše, musíme rozparsovať nástroj na volanie a s akými argumentmi, a potom pokračovať vo volaní nástroja.

## Vylepšenie prístupu validáciou

Doteraz ste videli, ako môžete všetky registrácie na pridávanie nástrojov, zdrojov a prompt nahradiť týmito dvoma handlermi na každý typ funkcie. Čo ešte treba urobiť? Mali by sme pridať formu validácie, aby sme zaistili, že nástroj sa volá so správnymi argumentmi. Každé runtime má na to vlastné riešenie, napríklad Python používa Pydantic a TypeScript používa Zod. Idea je:

- Presunúť logiku vytvárania funkcie (nástroja, zdroja alebo promptu) do jej vlastného priečinka.
- Pridať spôsob validácie prichádzajúcej požiadavky, napríklad na volanie nástroja.

### Vytvorenie funkcie

Na vytvorenie funkcie potrebujeme vytvoriť pre ňu súbor a zabezpečiť, aby mal povinné polia požadované pre túto funkciu. Polia sa mierne líšia medzi nástrojmi, zdrojmi a promptmi.

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
        # Overiť vstup pomocou modelu Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: pridať Pydantic, aby sme mohli vytvoriť AddInputModel a overiť argumenty

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Tu vidíte, ako robíme nasledovné:

- Vytvoríme schému pomocou Pydantic `AddInputModel` s poliami `a` a `b` v súbore *schema.py*.
- Pokúsime sa rozparsovať prichádzajúcu požiadavku na typ `AddInputModel`, ak sú parametre nezhodné, vyhodí sa chyba:

   ```python
   # add.py
    try:
        # Overiť vstup pomocou modelu Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Môžete si vybrať, či túto logiku parsovania dať priamo do volania nástroja alebo do handlera.

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

- V handleri spracovávajúcom všetky volania nástrojov sa teraz pokúsime rozparsovať prichádzajúcu požiadavku podľa definovanej schémy nástroja:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

Ak to vyjde, pokračujeme s volaním samotného nástroja:

    ```typescript
    const result = await tool.callback(input);
    ```

Ako vidíte, tento prístup vytvára skvelú architektúru, kde má všetko svoje miesto, *server.ts* je veľmi malý súbor, ktorý len prepája request handlery a každá funkcia je vo svojom príslušnom priečinku, teda tools/, resources/ alebo /prompts.

Skvelé, poďme to teraz postaviť.

## Cvičenie: Vytvorenie nízkoúrovňového servera

V tomto cvičení urobíme nasledovné:

1. Vytvoríme nízkoúrovňový server, ktorý spracováva výpis nástrojov a ich volanie.
2. Implementujeme architektúru, na ktorú sa môžete stavať.
3. Pridáme validáciu, aby sa volania nástrojov správne overovali.

### -1- Vytvorenie architektúry

Prvá vec, ktorú musíme riešiť, je architektúra, ktorá nám pomôže škálovať, keď pridáme ďalšie funkcie, vyzerá takto:

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

Teraz máme nastavenú architektúru, ktorá zabezpečuje, že môžeme ľahko pridávať nové nástroje vo priečinku tools. Kludne pridajte podobné podsložky pre resources a prompts.

### -2- Vytvorenie nástroja

Pozrime sa, ako vyzerá vytvorenie nástroja. Najskôr sa vytvorí v jeho podsložke *tool* takto:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Overte vstup pomocou Pydantic modelu
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: pridajte Pydantic, aby sme mohli vytvoriť AddInputModel a overiť argumenty

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Vidíme tu, ako definujeme názov, popis a vstupnú schému pomocou Pydantic a handler, ktorý sa zavolá, keď sa tento nástroj bude volať. Nakoniec exponujeme `tool_add`, čo je slovník s týmito vlastnosťami.

Je tu tiež *schema.py*, ktorý definuje vstupnú schému používanú našim nástrojom:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Taktiež musíme vyplniť *__init__.py*, aby sa adresár tools považoval za modul. Navyše je potrebné exponovať moduly v ňom takto:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Tento súbor môžeme rozširovať, keď pridávame ďalšie nástroje.

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

Tu vytvárame slovník pozostávajúci z vlastností:

- name, názov nástroja.
- rawSchema, Zod schéma, ktorá sa použije na validáciu prichádzajúcich požiadaviek na volanie tohto nástroja.
- inputSchema, túto schému použije handler.
- callback, ktorý sa použije na vyvolanie nástroja.

Je tu aj `Tool`, ktorý prevádza tento slovník na typ, ktorý MCP server handler dokáže prijať, a vyzerá takto:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

A je tu *schema.ts*, kde uchovávame vstupné schémy každej funkcie, vyzerá takto, momentálne len s jednou schémou, ale pri pridávaní nástrojov pridáme ďalšie:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Skvelé, pokračujme teraz s handlerom na výpis nástrojov.

### -3- Spracovanie výpisu nástrojov

Ďalej na spracovanie výpisu nástrojov potrebujeme nastaviť request handler na to. Toto pridáme do nášho serverového súboru:

**Python**

```python
# kód vynechaný pre stručnosť
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

Tu pridávame dekorátor `@server.list_tools` a implementačnú funkciu `handle_list_tools`. V nej musíme vytvoriť zoznam nástrojov. Všimnite si, že každý nástroj musí mať názov, popis a inputSchema.

**TypeScript**

Na nastavenie request handlera na výpis nástrojov zavoláme `setRequestHandler` na serveri so schémou zodpovedajúcou tomu, čo chceme robiť, v tomto prípade `ListToolsRequestSchema`.

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
// kód vynechaný pre stručnosť
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Vrátiť zoznam registrovaných nástrojov
  return {
    tools: tools
  };
});
```

Skvelé, vyriešili sme výpis nástrojov, poďme sa pozrieť, ako voláme nástroje.

### -4- Spracovanie volania nástroja

Na volanie nástroja nastavíme ďalší request handler, ktorý sa zameria na požiadavky určujúce, ktorú funkciu volať a s akými argumentmi.

**Python**

Použijeme dekorátor `@server.call_tool` a implementujeme funkciu `handle_call_tool`. V nej musíme rozparsovať názov nástroja, jeho argumenty a zabezpečiť, že argumenty sú platné pre daný nástroj. Môžeme validovať argumenty buď tu, alebo priamo v nástroji.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools je slovník s názvami nástrojov ako kľúčmi
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # vyvolať nástroj
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Tu sa deje toto:

- Názov nástroja už máme ako vstupný parameter `name` a argumenty generálne ako slovník `arguments`.
- Nástroj sa volá cez `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Validácia argumentov sa deje v `handler`, ktorý je funkciou, ak zlyhá, vyhodí výnimku.

Teraz už máme plné pochopenie výpisu a volania nástrojov pomocou nízkoúrovňového servera.

Pozrite si [úplný príklad](./code/README.md) tu.

## Zadanie

Rozšírte daný kód o niekoľko nástrojov, zdrojov a promptov a všimnite si, že potrebujete pridávať súbory len do priečinka tools a nikde inde.

*Riešenie nie je k dispozícii*

## Zhrnutie

V tejto kapitole sme si ukázali, ako funguje nízkoúrovňový server a ako nám pomáha vytvoriť peknú architektúru, na ktorú môžeme stavať. Diskutovali sme aj o validácii a ukázali sme si, ako pracovať s validačnými knižnicami na tvorbu schém na validáciu vstupov.

## Čo bude ďalej

- Ďalej: [Jednoduchá autentifikácia](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Upozornenie**:  
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Aj keď sa snažíme o presnosť, majte na pamäti, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Originálny dokument v jeho pôvodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pri kritických informáciách sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za akékoľvek nedorozumenia alebo zlé interpretácie vzniknuté použitím tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->