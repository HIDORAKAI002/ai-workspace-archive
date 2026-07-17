# Utilizarea avansată a serverului

Există două tipuri diferite de servere expuse în MCP SDK, serverul obișnuit și serverul la nivel scăzut. De obicei, ai folosi serverul obișnuit pentru a adăuga funcționalități. Totuși, în anumite cazuri, vrei să te bazezi pe serverul la nivel scăzut, cum ar fi:

- Arhitectură mai bună. Este posibil să creezi o arhitectură curată atât cu serverul obișnuit, cât și cu unul la nivel scăzut, dar se poate argumenta că este puțin mai ușor cu un server la nivel scăzut.
- Disponibilitatea funcționalităților. Unele funcționalități avansate pot fi folosite doar cu un server la nivel scăzut. Vei vedea acest lucru în capitolele următoare când vom adăuga sampling (depreciat în candidatul de lansare `2026-07-28`) și elicitation.

## Server obișnuit vs server la nivel scăzut

Iată cum arată crearea unui server MCP cu serverul obișnuit

**Python**

```python
mcp = FastMCP("Demo")

# Adaugă un instrument de adiție
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

// Adaugă un instrument de adunare
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

Ideea este că adaugi explicit fiecare unealtă, resursă sau prompt pe care vrei să îl aibă serverul. Nimic greșit în asta.  

### Abordarea serverului la nivel scăzut

Totuși, când folosești abordarea serverului la nivel scăzut, trebuie să te gândești diferit. În loc să înregistrezi fiecare unealtă, creezi două funcții handler pentru fiecare tip de funcționalitate (unelte, resurse sau prompturi). Deci, de exemplu, uneltele vor avea doar două funcții astfel:

- Listarea tuturor uneltelor. O funcție va fi responsabilă pentru toate încercările de listare a uneltelor.
- gestionarea apelurilor către uneltele respective. Și aici există o singură funcție care gestionează apelurile către o unealtă.

Pare că este mai puțin de lucru, nu? În loc să înregistrez o unealtă, trebuie doar să mă asigur că unealta este listată când listez toate uneltele și că este apelată când există o cerere de apelare a unui instrument.

Hai să vedem cum arată acum codul:

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
  // Returnează lista de unelte înregistrate
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

Aici avem acum o funcție care returnează o listă de funcționalități. Fiecare intrare din lista de unelte are acum câmpuri precum `name`, `description` și `inputSchema` pentru a respecta tipul de returnare. Acest lucru ne permite să plasăm uneltele și definițiile caracteristicilor în altă parte. Putem acum să creăm toate uneltele în dosarul tools și același lucru se aplică pentru toate funcționalitățile, astfel proiectul tău poate fi organizat astfel:

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

Este grozav, arhitectura noastră poate fi făcută să arate foarte curat.

Dar apelarea uneltelor, e aceeași idee, un singur handler pentru a apela o unealtă, indiferent care? Da, exact, iată codul pentru asta:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools este un dicționar cu numele instrumentelor ca și chei
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
    // TODO să apeleze instrumentul,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

După cum vezi din codul de mai sus, trebuie să extragem unealta ce trebuie apelată, cu ce argumente, iar apoi trebuie să continuăm cu apelarea uneltei.

## Îmbunătățirea abordării cu validare

Până acum, ai văzut cum toate înregistrările tale pentru a adăuga unelte, resurse și prompturi pot fi înlocuite cu aceste două handler-e pentru fiecare tip de funcționalitate. Ce altceva mai trebuie să facem? Ei bine, ar trebui să adăugăm o formă de validare pentru a ne asigura că unealta este apelată cu argumentele corecte. Fiecare runtime are propria soluție pentru asta, de exemplu Python folosește Pydantic, iar TypeScript folosește Zod. Ideea este să facem următoarele:

- Mutăm logica pentru crearea unei funcționalități (unealtă, resursă sau prompt) în dosarul dedicat ei.
- Adăugăm o metodă de validare pentru o cerere de apelare a unui instrument.

### Crearea unei funcționalități

Pentru a crea o funcționalitate, va trebui să creăm un fișier pentru aceea funcționalitate și să ne asigurăm că are câmpurile obligatorii pentru acea funcționalitate. Care câmpuri diferă puțin între unelte, resurse și prompturi.

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

aici poți vedea cum facem următoarele:

- Creăm un schema folosind Pydantic `AddInputModel` cu câmpurile `a` și `b` în fișierul *schema.py*.
- Încercăm să parse-ăm cererea de intrare să fie de tip `AddInputModel`, dacă există o nepotrivire a parametrilor, aceasta va arunca o eroare:

   ```python
   # add.py
    try:
        # Validează intrarea folosind modelul Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Poți alege dacă să pui logica de parsare în apelul uneltei sau în funcția handler.

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

- În handler-ul care gestionează toate apelurile către unelte, încercăm acum să parse-ăm cererea în schema definită de unealtă:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    dacă asta merge, atunci continuăm să apelăm unealta efectivă:

    ```typescript
    const result = await tool.callback(input);
    ```

După cum vezi, această abordare creează o arhitectură excelentă pentru că totul are locul său, fișierul *server.ts* este un fișier foarte mic care doar conectează handler-ele pentru cereri, iar fiecare funcționalitate este în dosarul său respectiv, adică tools/, resources/ sau /prompts.

Grozav, să încercăm să construim asta următorul pas. 

## Exercițiu: Crearea unui server la nivel scăzut

În acest exercițiu, vom face următoarele:

1. Creăm un server la nivel scăzut care gestionează listarea uneltelor și apelarea uneltelor.
1. Implementăm o arhitectură pe care poți construi.
1. Adăugăm validare pentru a ne asigura că apelurile uneltei sunt validate corect.

### -1- Crearea unei arhitecturi

Primul lucru pe care trebuie să-l abordăm este o arhitectură care ne ajută să scalăm pe măsură ce adăugăm mai multe caracteristici, iată cum arată:

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

Acum am stabilit o arhitectură care ne asigură că putem adăuga ușor unelte noi într-un dosar tools. Simte-te liber să faci același lucru pentru subdirectoare pentru resurse și prompturi.

### -2- Crearea unei unelte

Să vedem cum arată crearea unei unelte. Mai întâi, trebuie creată în subdirectorul său *tool* astfel:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Validează inputul folosind modelul Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: adăugați Pydantic, astfel încât să putem crea un AddInputModel și să validăm argumentele

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Ceea ce vedem aici este cum definim numele, descrierea și schema de input folosind Pydantic și un handler care va fi invocat atunci când această unealtă este apelată. În cele din urmă, expunem `tool_add`, care este un dicționar ce conține toate aceste proprietăți.

Există și *schema.py* care este folosit pentru a defini schema de input utilizată de unealtă:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

De asemenea, trebuie să umplem *__init__.py* pentru a asigura că directorul tools este tratat ca un modul. În plus, trebuie să expunem modulele din el astfel:

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
- rawSchema, aceasta este schema Zod, va fi folosită pentru a valida cererile de apelare a uneltei.
- inputSchema, această schemă va fi folosită de handler.
- callback, este folosit pentru a invoca unealta.

Există și `Tool` care este folosit pentru a converti acest dicționar într-un tip ce poate fi acceptat de handler-ul serverului mcp și arată astfel:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Și există *schema.ts* unde stocăm schemele de input pentru fiecare unealtă, care arată astfel, momentan doar cu o schemă, dar pe măsură ce adăugăm unelte putem adăuga mai multe intrări:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Grozav, să trecem la gestionarea listării uneltelor noastre.

### -3- Gestionarea listării uneltelor

În continuare, pentru a gestiona listarea uneltelor, trebuie să configurăm un handler de cerere pentru acest lucru. Iată ce trebuie să adăugăm în fișierul serverului:

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

Aici adăugăm decoratorul `@server.list_tools` și funcția de implementare `handle_list_tools`. În aceasta din urmă trebuie să producem o listă de unelte. Observă că fiecare unealtă trebuie să aibă un nume, o descriere și un inputSchema.   

**TypeScript**

Pentru a configura handler-ul de cerere pentru listarea uneltelor, trebuie să apelăm `setRequestHandler` pe server cu o schemă care se potrivește cu ce încercăm să facem, în acest caz `ListToolsRequestSchema`. 

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

Grozav, acum am rezolvat partea cu listarea uneltelor, să vedem cum am putea apela uneltele.

### -4- Gestionarea apelării unei unelte

Pentru a apela o unealtă, trebuie să configurăm un alt handler de cereri, de data aceasta concentrat pe a trata o cerere care specifică ce funcționalitate să se apeleze și cu ce argumente.

**Python**

Folosim decoratorul `@server.call_tool` și îl implementăm cu o funcție cum ar fi `handle_call_tool`. În acea funcție, trebuie să extragem numele uneltei, argumentele sale și să ne asigurăm că argumentele sunt valide pentru unealta în cauză. Putem fie să validăm argumentele în această funcție, fie mai jos, în unealta propriu-zisă.

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

- Numele uneltei este deja prezent ca parametru de intrare `name` care este adevărat și pentru argumentele noastre sub forma dicționarului `arguments`.

- Unealta este apelată cu `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Validarea argumentelor se face în proprietatea `handler` care indică o funcție, dacă aceasta eșuează va ridica o excepție. 

Acum avem o înțelegere completă despre listarea și apelarea uneltelor folosind un server la nivel scăzut.

Vezi [exemplul complet](./code/README.md) aici

## Tema

Extinde codul primit cu mai multe unelte, resurse și prompturi și reflectă asupra modului în care observi că trebuie să adaugi doar fișiere în directorul tools și nicăieri altundeva. 

*Nu se oferă soluție*

## Rezumat

În acest capitol, am văzut cum funcționează abordarea serverului la nivel scăzut și cum ne poate ajuta să creăm o arhitectură frumoasă pe care să continuăm să construim. Am discutat de asemenea despre validare și ți s-a arătat cum să lucrezi cu biblioteci de validare pentru a crea scheme pentru validarea inputului.

## Ce urmează

- Următorul: [Autentificare simplă](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->