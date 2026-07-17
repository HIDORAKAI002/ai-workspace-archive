# Pokročilé použití serveru

V MCP SDK jsou vystaveny dva různé typy serverů, váš běžný server a nízkoúrovňový server. Normálně byste používali běžný server k přidávání funkcí. V některých případech však chcete spoléhat na nízkoúrovňový server, například:

- Lepší architektura. Je možné vytvořit čistou architekturu s běžným i nízkoúrovňovým serverem, ale dá se říci, že je to trochu jednodušší s nízkoúrovňovým serverem.
- Dostupnost funkcí. Některé pokročilé funkce lze použít pouze s nízkoúrovňovým serverem. Uvidíte to v pozdějších kapitolách, když přidáme sampling (deprecated v kandidátském vydání `2026-07-28`) a elicitation.

## Běžný server vs nízkoúrovňový server

Takto vypadá vytvoření MCP serveru s běžným serverem

**Python**

```python
mcp = FastMCP("Demo")

# Přidejte nástroj pro sčítání
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

// Přidat nástroj pro sčítání
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

Pointa je, že explicitně přidáváte každý nástroj, zdroj nebo prompt, který chcete, aby server měl. Na tom není nic špatného.  

### Přístup nízkoúrovňového serveru

Nicméně, pokud používáte přístup nízkoúrovňového serveru, musíte o tom uvažovat jinak. Místo registrace každého nástroje vytvoříte dvě zpracovatelské funkce pro každý typ funkce (nástroje, zdroje nebo prompty). Například nástroje pak mají pouze dvě funkce takto:

- Výpis všech nástrojů. Jedna funkce by měla být zodpovědná za všechny pokusy o výpis nástrojů.
- Zpracování volání všech nástrojů. Opět zde je pouze jedna funkce, která zpracovává volání konkrétního nástroje.

Zdá se, že je to potenciálně méně práce, že? Místo registrace nástroje musím jen zajistit, že je nástroj uveden při výpisu všech nástrojů a je volán, když přijde požadavek na zavolání nástroje.

Podívejme se, jak kód nyní vypadá:

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
  // Vrátit seznam registrovaných nástrojů
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

Nyní máme funkci, která vrací seznam funkcí. Každý záznam v seznamu nástrojů má nyní pole jako `name`, `description` a `inputSchema`, aby odpovídal návratovému typu. To nám umožňuje umístit naše nástroje a definici funkcí jinam. Nyní můžeme vytvářet všechny naše nástroje ve složce tools a totéž platí pro všechny vaše funkce, takže váš projekt může být najednou uspořádán takto:

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

To je skvělé, naše architektura může vypadat opravdu čistě.

A co volání nástrojů, je to stejný princip, jedna funkce pro volání nástroje, ať už jakýkoliv? Ano, přesně tak, tady je kód pro to:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools je slovník s názvy nástrojů jako klíči
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
    // TODO zavolat nástroj,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Jak vidíte z výše uvedeného kódu, musíme rozparsovat nástroj, který se má zavolat, a s jakými argumenty, a pak pokračovat ve volání nástroje.

## Vylepšení přístupu pomocí validace

Doposud jste viděli, jak všechna vaše registrace k přidávání nástrojů, zdrojů a promptů lze nahradit těmito dvěma zpracovatelskými funkcemi pro každý typ funkce. Co dalšího musíme udělat? Měli bychom přidat nějakou formu validace, abychom zajistili, že nástroj je volán se správnými argumenty. Každé runtime má na to své vlastní řešení, například Python používá Pydantic a TypeScript používá Zod. Myšlenka je následující:

- Přemístit logiku pro vytvoření funkce (nástroj, zdroj nebo prompt) do její vyhrazené složky.
- Přidat způsob validace příchozího požadavku, například při volání nástroje.

### Vytvoření funkce

Pro vytvoření funkce budeme muset vytvořit soubor pro tuto funkci a zajistit, že obsahuje povinná pole požadovaná pro tuto funkci. Která pole se mírně liší mezi nástroji, zdroji a prompty.

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
        # Ověřte vstup pomocí modelu Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: přidat Pydantic, abychom mohli vytvořit AddInputModel a ověřit argumenty

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

zde můžete vidět, že děláme následující:

- Vytvořit schéma pomocí Pydantic `AddInputModel` s poli `a` a `b` v souboru *schema.py*.
- Pokusit se rozparsovat příchozí požadavek jako typ `AddInputModel`, pokud jsou parametry v nesouladu, dojde ke zhroucení:

   ```python
   # add.py
    try:
        # Ověřte vstup pomocí modelu Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Můžete zvolit, zda tuto logiku zpracování dáte do samotného volání nástroje, nebo do zpracovatelské funkce.

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

- Ve zpracovatelské funkci, která řeší všechna volání nástrojů, nyní zkoušíme rozparsovat příchozí požadavek do schématu definovaného nástrojem:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    pokud to funguje, pokračujeme ve volání skutečného nástroje:

    ```typescript
    const result = await tool.callback(input);
    ```

Jak vidíte, tento přístup vytváří skvělou architekturu, protože vše má své místo, *server.ts* je velmi malý soubor, který pouze propojuje zpracovatele požadavků a každá funkce je ve svém příslušném adresáři, tj. tools/, resources/ nebo prompts/.

Skvěle, teď to zkusme postavit dál.

## Cvičení: Vytvoření nízkoúrovňového serveru

V tomto cvičení uděláme následující:

1. Vytvoříme nízkoúrovňový server, který bude zpracovávat výpis a volání nástrojů.
1. Implementujeme architekturu, na které můžeme stavět.
1. Přidáme validaci, abychom zajistili, že volání nástrojů jsou správně ověřena.

### -1- Vytvoření architektury

Prvním krokem je architektura, která nám pomůže škálovat, jak přidáváme další funkce, takto to vypadá:

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

Teď jsme nastavili architekturu, která zajistí, že můžeme snadno přidávat nové nástroje ve složce tools. Klidně přidejte podobné podsložky pro resources a prompts.

### -2- Vytvoření nástroje

Podívejme se, jak vypadá vytvoření nástroje. Nejprve musí být vytvořen ve své podsložce *tool* takto:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Ověřit vstup pomocí modelu Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: přidat Pydantic, abychom mohli vytvořit AddInputModel a ověřit argumenty

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Co zde vidíme, je definice názvu, popisu a vstupního schématu pomocí Pydantic a handleru, který bude vyvolán, jakmile bude tento nástroj volán. Nakonec vystavujeme `tool_add`, což je slovník obsahující všechny tyto vlastnosti.

Je zde také *schema.py*, který se používá k definici vstupního schématu používaného naším nástrojem:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Také musíme naplnit *__init__.py*, aby byla složka tools považována za modul. Navíc musíme vystavit moduly uvnitř ní takto:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Do tohoto souboru můžeme přidávat další nástroje.

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

Zde vytváříme slovník skládající se z vlastností:

- name, to je název nástroje.
- rawSchema, to je schema Zod, bude použito k validaci příchozích požadavků na volání tohoto nástroje.
- inputSchema, toto schéma bude použito handlerem.
- callback, toto se používá k vyvolání nástroje.

Je tu také `Tool`, který slouží k převedení tohoto slovníku na typ, který může přijmout zpracovatel mcp serveru, a vypadá takto:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

A je tu *schema.ts*, kde uchováváme vstupní schémata pro každý nástroj, které vypadá takto se zatím pouze jedním schématem, ale jak přidáme nástroje, můžeme přidat více položek:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Skvělé, pokračujme nyní zpracováním výpisu našich nástrojů.

### -3- Zpracování výpisu nástrojů

Dále k zpracování výpisu našich nástrojů musíme nastavit request handler pro to. Tady je, co musíme přidat do našeho souboru serveru:

**Python**

```python
# kód vynechán pro stručnost
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

Zde přidáváme dekorátor `@server.list_tools` a implementační funkci `handle_list_tools`. V této funkci musíme vytvořit seznam nástrojů. Všimněte si, že každý nástroj musí mít jméno, popis a inputSchema.   

**TypeScript**

Pro nastavení request handleru pro výpis nástrojů musíme na serveru zavolat `setRequestHandler` se schématem odpovídajícím tomu, co chceme dělat, v tomto případě `ListToolsRequestSchema`. 

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
// kód vynechán pro stručnost
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Vrátit seznam registrovaných nástrojů
  return {
    tools: tools
  };
});
```

Skvěle, teď jsme vyřešili výpis nástrojů, podívejme se, jak můžeme volat nástroje.

### -4- Zpracování volání nástroje

Pro volání nástroje musíme nastavit další request handler, tentokrát zaměřený na zpracování požadavku, který určuje, kterou funkci volat a s jakými argumenty.

**Python**

Použijme dekorátor `@server.call_tool` a implementujme ho funkcí jako `handle_call_tool`. V této funkci musíme rozparsovat název nástroje, jeho argumenty a zajistit, že argumenty jsou platné pro daný nástroj. Můžeme validovat argumenty buď v této funkci, nebo níže v samotném nástroji.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools je slovník s názvy nástrojů jako klíči
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # vyvolejte nástroj
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Tady se děje toto:

- Naše jméno nástroje už je přítomno jako vstupní parametr `name` a platí to i pro argumenty ve formě slovníku `arguments`.

- Nástroj je volán pomocí `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Validace argumentů probíhá v `handler` vlastnosti, která ukazuje na funkci a pokud selže, vyvolá chybu. 

Tím nyní plně chápeme výpis a volání nástrojů pomocí nízkoúrovňového serveru.

Viz [plný příklad](./code/README.md) zde

## Úkol

Rozšiřte kód, který jste dostali, o řadu nástrojů, zdrojů a promptů a zamyslete se, jak si všimnete, že potřebujete přidávat soubory pouze ve složce tools a nikde jinde. 

*Žádné řešení není poskytnuto*

## Shrnutí

V této kapitole jsme viděli, jak funguje přístup nízkoúrovňového serveru a jak nám může pomoci vytvořit pěknou architekturu, na které můžeme dál stavět. Povídali jsme si také o validaci a ukázali jsme vám, jak pracovat s validačními knihovnami pro tvorbu schémat pro validaci vstupů.

## Co bude dál

- Dále: [Jednoduchá autentizace](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->