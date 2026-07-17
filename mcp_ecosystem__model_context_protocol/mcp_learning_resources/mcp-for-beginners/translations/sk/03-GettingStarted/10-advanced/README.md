# Pokročilé používanie servera

V MCP SDK sú vystavené dva rôzne typy serverov, váš bežný server a nízkoúrovňový server. Obvykle by ste použili bežný server na pridávanie funkcií. V niektorých prípadoch však chcete spoľahnúť sa na nízkoúrovňový server, napríklad:

- Lepšia architektúra. Je možné vytvoriť čistú architektúru s bežným serverom aj s nízkoúrovňovým serverom, ale dá sa tvrdiť, že je to o niečo jednoduchšie s nízkoúrovňovým serverom.
- Dostupnosť funkcií. Niektoré pokročilé funkcie je možné použiť iba s nízkoúrovňovým serverom. Uvidíte to v nasledujúcich kapitolách, kde pridáme sampling (zastarané v kandidatúre vydania `2026-07-28`) a elicitation.

## Bežný server vs nízkoúrovňový server

Takto vyzerá vytvorenie MCP Servera s bežným serverom

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

Keď však používate prístup nízkoúrovňového servera, musíte na to myslieť inak. Namiesto registrácie každého nástroja vytvoríte dve funkcie na každý typ funkcie (nástroje, zdroje alebo prompty). Napríklad nástroje majú len dve funkcie:

- Vypisovanie všetkých nástrojov. Jedna funkcia by bola zodpovedná za všetky pokusy o výpis nástrojov.
- Spracovanie volaní všetkých nástrojov. Aj tu je len jedna funkcia na spracovanie volaní nástroja.

Znie to potenciálne ako menej práce, nie? Namiesto registrácie nástroja len musím zabezpečiť, aby bol nástroj uvedený v zozname všetkých nástrojov a aby sa zavolal pri prichádzajúcej požiadavke na jeho volanie. 

Pozrime sa teraz, ako vyzerá kód:

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
  // Vrátiť zoznam registrovaných nástrojov
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

Tu teraz máme funkciu, ktorá vracia zoznam funkcií. Každý záznam v zozname nástrojov má polia ako `name`, `description` a `inputSchema`, aby vyhovoval návratovému typu. To nám umožňuje umiestniť definíciu nástrojov a funkcií inde. Môžeme teraz vytvoriť všetky naše nástroje v priečinku tools a rovnako to platí pre všetky vaše funkcie, takže váš projekt môže byť náhle usporiadaný takto:

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

To je skvelé, naša architektúra môže byť dosť čistá.

A čo volanie nástrojov, je to rovnaký princíp, jedna funkcia na volanie nástroja, ktoréhokoľvek nástroja? Áno, presne tak, tu je kód na to:

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
    
    // argumenty: request.params.arguments
    // TODO zavolať nástroj,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Ako vidíte z uvedeného kódu, potrebujeme rozparsovať, ktorý nástroj volať a s akými argumentmi, a potom pokračovať vo volaní nástroja.

## Zlepšenie prístupu s validáciou

Doteraz ste videli, ako všetky vaše registrácie na pridávanie nástrojov, zdrojov a promptov môžu byť nahradené týmito dvoma funkciami na každý typ funkcie. Čo ešte potrebujeme urobiť? Mali by sme pridať nejakú formu validácie, aby sme zabezpečili, že nástroj je volaný s správnymi argumentmi. Každé runtime má na to svoje riešenie, napríklad Python používa Pydantic a TypeScript používa Zod. Myšlienka je, že urobíme nasledovné:

- Presunúť logiku vytvárania funkcie (nástroj, zdroj alebo prompt) do jej vlastného priečinka.
- Pridať spôsob, ako validovať prichádzajúcu požiadavku, ktorá napríklad žiada o volanie nástroja.

### Vytvorenie funkcie

Na vytvorenie funkcie je potrebné vytvoriť súbor pre danú funkciu a zabezpečiť, aby mal povinné polia požadované pre danú funkciu. Ktoré polia sa trochu líšia medzi nástrojmi, zdrojmi a promptami.

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
        # Overiť vstup pomocou Pydantic modelu
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
- Pokúsime sa rozparsovať prichádzajúcu požiadavku na typ `AddInputModel`, ak dôjde k nesúladu v parametroch, toto zlyhá:

   ```python
   # add.py
    try:
        # Overiť vstup pomocou Pydantic modelu
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Môžete si vybrať, či túto logiku parsovania umiestnite priamo do volania nástroja alebo do handler funkcie.

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

- V handleri, ktorý spracováva všetky volania nástrojov, sa teraz snažíme rozparsovať prichádzajúcu požiadavku do definovanej schémy nástroja:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ak to funguje, pokračujeme vo volaní samotného nástroja:

    ```typescript
    const result = await tool.callback(input);
    ```

Ako vidíte, tento prístup vytvára skvelú architektúru, pretože všetko má svoje miesto, súbor *server.ts* je veľmi malý – iba prepája request handlery a každá funkcia je vo svojom príslušnom priečinku, t.j. tools/, resources/ alebo /prompts.

Skvelé, poďme to teraz vyskúšať zostavať. 

## Cvičenie: Vytvorenie nízkoúrovňového servera

V tomto cvičení urobíme nasledovné:

1. Vytvoríme nízkoúrovňový server, ktorý bude spracovávať výpis nástrojov a ich volanie.
1. Implementujeme architektúru, na ktorú sa môžete ďalej stavať.
1. Pridáme validáciu, aby boli volania vašich nástrojov správne overené.

### -1- Vytvorenie architektúry

Prvá vec, ktorú musíme vyriešiť, je architektúra, ktorá nám pomôže škálovať sa ako pridávame viac funkcií, vyzerá takto:

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

Teraz sme nastavili architektúru, ktorá zabezpečuje jednoduché pridávanie nových nástrojov do priečinka tools. Môžete si vytvoriť aj podadresáre pre resources a prompts.

### -2- Vytvorenie nástroja

Pozrime sa teraz, ako vyzerá vytvorenie nástroja. Najprv musí byť vytvorený v jeho vlastnom podadresári *tool* takto:

**Python**

```python
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

Vidíme tu, ako definujeme názov, popis a vstupnú schému pomocou Pydantic a handler, ktorý sa zavolá, keď sa tento nástroj zavolá. Nakoniec vystavujeme `tool_add`, čo je slovník obsahujúci všetky tieto vlastnosti.

Je tu aj *schema.py*, ktorý slúži na definovanie vstupnej schémy používanú naším nástrojom:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Tiež musíme vyplniť *__init__.py*, aby sa priečinok tools považoval za modul. Navyše je potrebné vystaviť moduly v ňom takto:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Tomuto súboru môžeme postupne pridávať ďalšie nástroje.

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

Tu vytvárame slovník skladajúci sa z vlastností:

- name, to je názov nástroja.
- rawSchema, to je Zod schéma, ktorá sa použije na validáciu prichádzajúcich požiadaviek na volanie tohto nástroja.
- inputSchema, táto schéma sa použije vo handleri.
- callback, používa sa na vyvolanie nástroja.

Je tu aj `Tool`, ktorý slúži na prevod tohto slovníka na typ, ktorý handler mcp servera dokáže prijať, vyzerá takto:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

A je tu *schema.ts*, kde uchovávame vstupné schémy pre jednotlivé nástroje, teraz je tam len jedna schéma, ale ako budeme pridávať nástroje, pridáme ďalšie záznamy:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Skvelé, pokračujme teraz v spracovaní výpisu našich nástrojov.

### -3- Spracovanie výpisu nástrojov

Na spracovanie výpisu nástrojov je potrebné nastaviť request handler. Tu je, čo potrebujeme pridať do našich serverových súborov:

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

Tu pridávame dekorátor `@server.list_tools` a implementujúcu funkciu `handle_list_tools`. V nej je potrebné vytvoriť zoznam nástrojov. Všimnite si, že každý nástroj musí mať názov, popis a inputSchema.   

**TypeScript**

Na nastavenie request handlera na výpis nástrojov zavoláme `setRequestHandler` so schémou, ktorá sedí na to, čo chceme robiť, v tomto prípade `ListToolsRequestSchema`. 

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
// kód vynechaný kvôli stručnosti
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Vrátiť zoznam registrovaných nástrojov
  return {
    tools: tools
  };
});
```

Skvelé, vyriešili sme časť výpisu nástrojov, pozrime sa teraz, ako môžeme volať nástroje.

### -4- Spracovanie volania nástroja

Na volanie nástroja potrebujeme nastaviť ďalší request handler, ktorý sa zameria na spracovanie požiadavky špecifikujúcej, ktorú funkciu volať a s akými argumentmi.

**Python**

Použime dekorátor `@server.call_tool` a implementujme ho funkciou `handle_call_tool`. V tejto funkcii musíme rozparsovať názov nástroja, jeho argument a zabezpečiť, že argumenty sú platné pre daný nástroj. Môžeme validovať argumenty buď tu, alebo neskôr v samotnom nástroji.

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

Tu sa deje nasledovné:

- Názov nástroja už máme ako vstupný parameter `name`, čo platí aj pre naše argumenty vo forme slovníka `arguments`.

- Nástroj sa volá cez `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Validácia argumentov prebieha v `handler` vlastnosti, ktorá ukazuje na funkciu, ak zlyhá, vyhodí výnimku. 

Takže teraz máme kompletné pochopenie výpisu a volania nástrojov pomocou nízkoúrovňového servera.

Pozrite si [celý príklad](./code/README.md) tu

## Zadanie

Rozšírte kód, ktorý ste dostali, o viacero nástrojov, zdrojov a promptov a všimnite si, že stačí pridávať len súbory do priečinka tools a nikde inde. 

*Riešenie nie je poskytnuté*

## Zhrnutie

V tejto kapitole sme videli, ako funguje prístup nízkoúrovňového servera a ako nám môže pomôcť vytvoriť peknú architektúru, na ktorú môžeme ďalej stavať. Tiež sme diskutovali o validácii a ukázalo sa vám, ako pracovať s validačnými knižnicami na vytváranie schém pre validáciu vstupov.

## Čo ďalej

- Ďalej: [Jednoduchá autentifikácia](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->