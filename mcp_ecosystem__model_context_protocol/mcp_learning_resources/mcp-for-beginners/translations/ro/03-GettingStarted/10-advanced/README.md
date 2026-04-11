# Utilizarea avansată a serverului

Există două tipuri diferite de servere expuse în MCP SDK, serverul normal și serverul de nivel scăzut. În mod normal, ați folosi serverul regulat pentru a-i adăuga funcționalități. Totuși, pentru unele cazuri, veți dori să vă bazați pe serverul de nivel scăzut, cum ar fi:

- Arhitectură mai bună. Este posibil să creați o arhitectură curată atât cu serverul regulat cât și cu serverul de nivel scăzut, dar se poate susține că este puțin mai ușor cu un server de nivel scăzut.
- Disponibilitatea funcționalităților. Unele funcționalități avansate pot fi folosite doar cu un server de nivel scăzut. Veți vedea acest lucru în capitolele următoare când vom adăuga eșantionare și elicitație.

## Server regulat vs server de nivel scăzut

Iată cum arată crearea unui MCP Server cu serverul regulat

**Python**

```python
mcp = FastMCP("Demo")

# Adaugă un instrument de adunare
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

// Adăugați un instrument de adunare
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

Ideea este că adăugați explicit fiecare unealtă, resursă sau prompt pe care doriți ca serverul să le aibă. Nu este nimic în neregulă cu asta.

### Abordarea serverului de nivel scăzut

Totuși, când folosiți abordarea serverului de nivel scăzut, trebuie să gândiți diferit. În loc să înregistrați fiecare unealtă, creați două handler-e per tip de element (unelte, resurse sau prompturi). De exemplu, uneltele au doar două funcții astfel:

- Listarea tuturor uneltelor. O funcție va fi responsabilă pentru toate cererile de listare a uneltelor.
- Gestionarea apelării tuturor uneltelor. De asemenea, există doar o funcție care gestionează apelurile către o unealtă.

Pare a fi mai puțină muncă, nu? Așadar, în loc să înregistrez o unealtă, trebuie doar să mă asigur că unealta este listată atunci când listăm toate uneltele și să fie apelată atunci când există o cerere de apel a unei unelte.

Să vedem cum arată acum codul:

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
  // Returnează lista uneltelor înregistrate
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

Aici avem o funcție care returnează o listă de funcționalități. Fiecare intrare din lista uneltelor are acum câmpuri ca `name`, `description` și `inputSchema` pentru a respecta tipul de returnare. Acest lucru ne permite să punem definiția uneltelor și a funcționalităților în altă parte. Putem acum crea toate uneltele în un dosar tools iar același lucru se aplică tuturor funcționalităților, astfel proiectul poate fi organizat astfel:

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

Minunat, arhitectura noastră poate arăta foarte curată.

Dar cum rămâne cu apelarea uneltelor, este aceeași idee, un handler care apelează o unealtă, oricare unealtă? Da, exact, iată codul pentru asta:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools este un dicționar cu numele uneltelor ca și chei
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
    // TODO apelează instrumentul,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

După cum vedeți în codul de mai sus, trebuie să extragem unealta care trebuie apelată și cu ce argumente, apoi să procedăm la apelarea uneltei.

## Îmbunătățirea abordării cu validare

Până acum, ați văzut cum toate înregistrările pentru a adăuga unelte, resurse și prompturi pot fi înlocuite cu acești doi handleri per tip de funcționalitate. Ce altceva trebuie să facem? Ar trebui să adăugăm o formă de validare pentru a ne asigura că unealta este apelată cu argumentele corecte. Fiecare runtime are propria soluție pentru asta, de exemplu Python folosește Pydantic iar TypeScript folosește Zod. Ideea este să facem următoarele:

- Mutăm logica creării unei funcționalități (unealtă, resursă sau prompt) în folderul dedicat acesteia.
- Adăugăm o modalitate de a valida o cerere care ajunge care cere, de exemplu, să apeleze o unealtă.

### Crearea unei funcționalități

Pentru a crea o funcționalitate, va trebui să creăm un fișier pentru acea funcționalitate și să ne asigurăm că are câmpurile obligatorii cerute de respectiva funcționalitate. Care câmpuri diferă puțin între unelte, resurse și prompturi.

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
        # Validează intrarea folosind modelul Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: adaugă Pydantic, pentru a putea crea un AddInputModel și a valida argumentele

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

aici puteți vedea cum facem următoarele:

- Creăm un schema folosind Pydantic `AddInputModel` cu câmpurile `a` și `b` în fișierul *schema.py*.
- Încercăm să parcurgem cererea primită pentru a fi de tipul `AddInputModel`, dacă există o nepotrivire de parametri, va cauza o eroare:

   ```python
   # add.py
    try:
        # Validează intrarea folosind modelul Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Puteți alege dacă puneți logica de parsing în apelul uneltei sau în funcția handler.

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

- În handler-ul care gestionează toate apelurile de unelte, încercăm acum să parcurgem cererea primită în schema definită pentru unealtă:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    dacă asta funcționează atunci procedăm la apelarea propriu-zisă a uneltei:

    ```typescript
    const result = await tool.callback(input);
    ```

După cum vedeți, această abordare creează o arhitectură grozavă deoarece totul are locul său, *server.ts* este un fișier foarte mic care doar conectează handler-ele cererilor și fiecare funcționalitate este în folder-ul său respectiv, adică tools/, resources/ sau /prompts.

Perfect, să încercăm să construim asta în continuare.

## Exercițiu: Crearea unui server de nivel scăzut

În acest exercițiu, vom face următoarele:

1. Creăm un server de nivel scăzut care să gestioneze listarea și apelarea uneltelor.
2. Implementăm o arhitectură pe care o puteți extinde.
3. Adăugăm validare pentru a ne asigura că apelurile uneltelor sunt validate corect.

### -1- Crearea unei arhitecturi

Primul lucru pe care trebuie să îl rezolvăm este o arhitectură care să ne ajute să scalăm pe măsură ce adăugăm mai multe funcționalități, arată astfel:

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

Acum am configurat o arhitectură care ne asigură că putem adăuga ușor unelte noi în folderul tools. Nu ezitați să urmați acest model pentru a adăuga subdirectoare pentru resources și prompts.

### -2- Crearea unei unelte

Să vedem cum arată crearea unei unelte. În primul rând, trebuie creată în subdirectorul său *tool* astfel:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Validează intrarea folosind modelul Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: adaugă Pydantic, astfel încât să putem crea un AddInputModel și să validăm argumentele

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Ce vedem aici este cum definim numele, descrierea și schema de intrare folosind Pydantic și un handler care va fi invocat odată ce această unealtă este apelată. În final, expunem `tool_add` care este un dicționar care conține toate aceste proprietăți.

Există și *schema.py* care este folosit să definească schema de intrare folosită de unealtă:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

De asemenea, trebuie să completăm *__init__.py* pentru a ne asigura că directorul tools este tratat ca un modul. În plus, trebuie să expunem modulele din el astfel:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Putem continua să adăugăm în acest fișier pe măsură ce adăugăm mai multe unelte.

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

Aici creăm un dicționar format din proprietăți:

- name, acesta este numele uneltei.
- rawSchema, aceasta este schema Zod, care va fi folosită pentru validarea cererilor primite de apelare a acestei unelte.
- inputSchema, această schemă va fi folosită de handler.
- callback, aceasta este folosită pentru a invoca unealta.

Există și `Tool` care este folosit pentru a converti acest dicționar într-un tip acceptat de handler-ul serverului mcp și arată astfel:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Și există *schema.ts* unde stocăm schemele de intrare pentru fiecare unealtă, arată astfel cu o singură schemă momentan, dar pe măsură ce adăugăm unelte, putem adăuga mai multe intrări:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Perfect, să trecem acum la gestionarea listării uneltelor.

### -3- Gestionarea listării uneltelor

În continuare, pentru a gestiona listarea uneltelor, trebuie să configurăm un handler pentru acea cerere. Iată ce trebuie să adăugăm în fișierul serverului:

**Python**

```python
# cod omis pentru concizie
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

Aici adăugăm decoratorul `@server.list_tools` și funcția implementată `handle_list_tools`. În această funcție, trebuie să producem o listă de unelte. Observați că fiecare unealtă trebuie să aibă un nume, o descriere și un inputSchema.

**TypeScript**

Pentru a configura handler-ul cererii pentru listarea uneltelor, trebuie să apelăm `setRequestHandler` pe server cu o schemă care se potrivește cu ceea ce vrem să facem, în acest caz `ListToolsRequestSchema`.

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
// cod omis pentru concizie
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Returnează lista uneltelor înregistrate
  return {
    tools: tools
  };
});
```

Perfect, acum am rezolvat partea de listare a uneltelor, să vedem cum putem apela uneltele în continuare.

### -4- Gestionarea apelării unei unelte

Pentru a apela o unealtă, trebuie să configurăm un alt handler de cereri, de data aceasta axat pe gestionarea cererilor care specifică ce funcționalitate să fie apelată și cu ce argumente.

**Python**

Să folosim decoratorul `@server.call_tool` și să îl implementăm cu o funcție precum `handle_call_tool`. În această funcție, trebuie să extragem numele uneltei, argumentul acesteia și să ne asigurăm că argumentele sunt valide pentru unealta în cauză. Putem valida argumentele fie în această funcție fie în unealta propriu-zisă.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools este un dicționar cu numele uneltelor ca și chei
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # apelează unealta
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Iată ce se întâmplă:

- Numele uneltei este deja prezent ca parametru de intrare `name` și argumentele noastre sunt în dicționarul `arguments`.

- Unealta este apelată cu `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Validarea argumentelor are loc în proprietatea `handler` care corespunde unei funcții, dacă aceasta eșuează va arunca o excepție.

Iată, acum avem o înțelegere completă despre listarea și apelarea uneltelor folosind un server de nivel scăzut.

Vezi [exemplul complet](./code/README.md) aici

## Temă

Extinde codul primit cu un număr de unelte, resurse și prompturi și observă cum trebuie să adaugi doar fișiere în directorul tools și nicăieri altundeva.

*Fără soluție oferită*

## Rezumat

În acest capitol, am văzut cum funcționează abordarea serverului de nivel scăzut și cum ne poate ajuta să creăm o arhitectură frumoasă pe care să construim în continuare. De asemenea, am discutat despre validare și ați fost arătat cum să lucrați cu biblioteci de validare pentru a crea scheme pentru validarea intrărilor.

## Ce urmează

- Următorul: [Autentificare simplă](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, este recomandată traducerea profesională realizată de un traducător uman. Nu ne asumăm responsabilitatea pentru orice neînțelegeri sau interpretări greșite care pot apărea în urma utilizării acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->