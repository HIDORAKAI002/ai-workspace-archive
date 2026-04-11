# Pokročilé použití serveru

V MCP SDK jsou k dispozici dva různé typy serverů, váš běžný server a nízkoúrovňový server. Obvykle byste použili běžný server pro přidání funkcí. Pro některé případy ale chcete spoléhat na nízkoúrovňový server, například:

- Lepší architektura. Je možné vytvořit čistou architekturu s běžným i nízkoúrovňovým serverem, ale dá se argumentovat, že s nízkoúrovňovým serverem je to o něco jednodušší.
- Dostupnost funkcí. Některé pokročilé funkce lze použít pouze s nízkoúrovňovým serverem. Ukážeme si to v pozdějších kapitolách, kdy přidáme sampling a elicitation.

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

Podstatou je, že explicitně přidáváte každý nástroj, zdroj nebo prompt, který chcete, aby server měl. Na tom není nic špatného.  

### Přístup nízkoúrovňového serveru

Při použití nízkoúrovňového serveru však musíte uvažovat jinak. Místo registrace každého nástroje vytvoříte dvě funkce pro každou kategorii funkcí (nástroje, zdroje nebo prompty). Například nástroje mají jen dvě funkce:

- Výpis všech nástrojů. Jedna funkce bude odpovědná za všechny pokusy o získání seznamu nástrojů.
- Vyřízení volání všech nástrojů. I zde je pouze jedna funkce, která zpracovává volání konkrétního nástroje.

To zní jako potenciálně méně práce, že? Místo registrace nástroje je potřeba jen zajistit, aby byl tento nástroj uveden při výpisu všech nástrojů a aby byl zavolán při příchozím požadavku na jeho vyvolání.

Podívejme se, jak teď kód vypadá:

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

Máme nyní funkci, která vrací seznam funkcí. Každý záznam v seznamu nástrojů má pole jako `name`, `description` a `inputSchema`, aby odpovídal návratovému typu. To nám umožňuje umístit definice nástrojů a funkcí jinam. Teď můžeme vytvořit všechny nástroje ve složce tools a totéž platí pro všechny funkce, takže váš projekt může vypadat třeba takto:

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

To je skvělé, naše architektura může být velmi přehledná.

A co volání nástrojů, platí stejná představa, jeden handler pro volání nástroje, jakýkoliv nástroj? Ano, přesně tak, zde je kód pro to:

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

Jak vidíte z výše uvedeného kódu, musíme rozparsovat, který nástroj volat a s jakými argumenty, a pak pokračovat ve volání nástroje.

## Vylepšení přístupu validací

Zatím jste viděli, jak lze všechny vaše registrace pro přidání nástrojů, zdrojů a promptů nahradit těmito dvěma handlery na typ funkcí. Co ještě musíme udělat? Měli bychom přidat nějakou formu validace, aby bylo zajištěno, že nástroj je volán se správnými argumenty. Každý runtime má pro to vlastní řešení, například Python používá Pydantic a TypeScript používá Zod. Myšlenka je následující:

- Přesunout logiku pro vytvoření funkce (nástroj, zdroj nebo prompt) do samostatné složky.
- Přidat způsob validace příchozího požadavku, například volání nástroje.

### Vytvoření funkce

Pro vytvoření funkce musíme vytvořit soubor pro tuto funkci a zajistit, aby obsahoval povinná pole, která se mírně liší mezi nástroji, zdroji a promptami.

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
        # Validujte vstup pomocí modelu Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: přidat Pydantic, abychom mohli vytvořit AddInputModel a validovat argumenty

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Zde vidíte, jak:

- Vytváříme schéma pomocí Pydantic `AddInputModel` s poli `a` a `b` v souboru *schema.py*.
- Pokoušíme se zpracovat příchozí požadavek jako typ `AddInputModel`, pokud jsou parametry nesprávné, dojde k chybě:

   ```python
   # add.py
    try:
        # Ověřte vstup pomocí modelu Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Můžete si zvolit, zda tuto logiku rozparsování vložíte do volání nástroje samotného nebo do handleru.

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

- V handleru, který zpracovává všechna volání nástrojů, se nyní snažíme příchozí požadavek rozparsovat podle schématu nástroje:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    Pokud to funguje, pokračujeme ve volání samotného nástroje:

    ```typescript
    const result = await tool.callback(input);
    ```

Jak vidíte, tento přístup vytváří skvělou architekturu, protože vše má své místo, *server.ts* je velmi malý soubor, který jen propojuje handlery požadavků a každá funkce je ve své vlastní složce – například tools/, resources/ nebo /prompts.

Skvěle, teď to zkuste vytvořit.

## Cvičení: Vytvoření nízkoúrovňového serveru

V tomto cvičení uděláme následující:

1. Vytvoříme nízkoúrovňový server, který bude zpracovávat výpis a volání nástrojů.
1. Implementujeme architekturu, na kterou se dá stavět.
1. Přidáme validaci, aby volání vašich nástrojů bylo správně validováno.

### -1- Vytvoření architektury

První věc, kterou potřebujeme, je architektura, která nám pomůže škálovat, když přidáme další funkce, vypadá takto:

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

Nyní máme nastavenou architekturu, která nám umožní snadno přidávat nové nástroje ve složce tools. Klidně přidejte podadresáře pro resources a prompts.

### -2- Vytvoření nástroje

Podívejme se, jak vypadá tvorba nástroje. Nejprve musí být vytvořen ve své podadresáři *tool* takto:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Ověřte vstup pomocí Pydantic modelu
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

Vidíme zde definici názvu, popisu a vstupního schématu pomocí Pydantic a handler, který se spustí, když je tento nástroj volán. Nakonec exponujeme `tool_add`, což je slovník obsahující všechny tyto vlastnosti.

Dále je tu *schema.py*, který definuje vstupní schéma používané naším nástrojem:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Také musíme naplnit *__init__.py*, aby bylo zajištěno, že složka tools je považována za modul. Navíc musíme exponovat moduly v ní takto:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Do tohoto souboru můžeme přidávat další, jak budeme přidávat více nástrojů.

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

Tady vytváříme slovník s vlastnostmi:

- name, což je název nástroje.
- rawSchema, což je Zod schéma, používané k ověření příchozích požadavků na volání tohoto nástroje.
- inputSchema, toto schéma bude použito handlerem.
- callback, což je funkce, která nástroj spustí.

Dále je zde `Tool`, typ, který převede tento slovník na typ, který zvládne mcp server handler, vypadá takto:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

A je tu *schema.ts*, kde ukládáme vstupní schémata pro každý nástroj, momentálně jen jedno schéma, ale jak přidáme nástroje, bude jich tam více:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Skvěle, pokračujme dalším krokem – zpracování výpisu nástrojů.

### -3- Zpracování výpisu nástrojů

Pro výpis nástrojů potřebujeme nastavit request handler. Přidáme ho do serverového souboru:

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

Přidáváme dekorátor `@server.list_tools` a implementační funkci `handle_list_tools`. Ta musí vracet seznam nástrojů, přičemž každý nástroj musí mít `name`, `description` a `inputSchema`.

**TypeScript**

Pro nastavení request handleru pro výpis nástrojů zavoláme `setRequestHandler` na serveru se schématem odpovídajícím našemu požadavku, v tomto případě `ListToolsRequestSchema`.

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

Skvělé, výpis nástrojů máme hotový, podíváme se, jak by se nástroje volaly.

### -4- Zpracování volání nástroje

Pro volání nástroje nastavíme další request handler, který bude řešit požadavek určující, který nástroj volat a s jakými argumenty.

**Python**

Použijeme dekorátor `@server.call_tool` a implementujeme ho funkcí `handle_call_tool`. V této funkci musíme rozparsovat název nástroje, jeho argumenty a ověřit platnost argumentů pro daný nástroj. Validace může proběhnout tady nebo později v samotném nástroji.

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
        # vyvolat nástroj
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Co se děje:

- Název nástroje už máme jako vstupní parametr `name` a argumenty jako slovník `arguments`.

- Nástroj je volán `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Validace argumentů probíhá v `handler`, což je funkce, pokud validace selže, vyhodí se výjimka.

Takže máme kompletní představu o výpisu a volání nástrojů pomocí nízkoúrovňového serveru.

Podívejte se na [plný příklad](./code/README.md)

## Zadání

Rozšiřte zadaný kód o několik nástrojů, zdrojů a promptů a zamyslete se, jak zjistíte, že stačí přidávat soubory pouze do složky tools a nikde jinde.

*Řešení není poskytováno*

## Shrnutí

V této kapitole jsme viděli, jak funguje přístup nízkoúrovňového serveru a jak nám může pomoci vytvořit pěknou architekturu, na kterou můžeme dál stavět. Diskutovali jsme také o validaci a ukázalo se, jak pracovat s validačními knihovnami pro tvorbu schémat vstupů.

## Co dál

- Další: [Jednoduchá autentifikace](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:  
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho původním jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoliv nedorozumění nebo nesprávné výklady vyplývající z použití tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->