# Avanceret serverbrug

Der findes to forskellige typer servere eksponeret i MCP SDK, din normale server og den lavniveau server. Normalt ville du bruge den almindelige server til at tilføje funktioner til den. Men i nogle tilfælde ønsker du at stole på lavniveau-serveren, såsom:

- Bedre arkitektur. Det er muligt at skabe en ren arkitektur med både den almindelige server og en lavniveau server, men det kan argumenteres for, at det er lidt nemmere med en lavniveau server.
- Funktionsmuligheder. Nogle avancerede funktioner kan kun bruges med en lavniveau server. Det vil du se i senere kapitler, når vi tilføjer sampling (udfaset i `2026-07-28` release candidate) og elicitation.

## Almindelig server vs lavniveau server

Sådan ser oprettelsen af en MCP Server ud med den almindelige server

**Python**

```python
mcp = FastMCP("Demo")

# Tilføj et additionsværktøj
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

// Tilføj et additionsværktøj
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

Pointen er, at du eksplicit tilføjer hvert værktøj, ressource eller prompt, som du ønsker serveren skal have. Der er ikke noget galt i det.  

### Lavniveau server tilgang

Når du dog bruger lavniveau server-tilgangen, skal du tænke på det anderledes. I stedet for at registrere hvert værktøj, opretter du i stedet to handlers pr. funktionstype (værktøjer, ressourcer eller prompts). Så for eksempel har værktøjer kun to funktioner som sådan:

- List alle værktøjer. En funktion vil være ansvarlig for alle forsøg på at liste værktøjer.
- Håndter kald til alle værktøjer. Her er der kun én funktion, der håndterer kald til et værktøj.

Det lyder som potentielt mindre arbejde, ikke? Så i stedet for at registrere et værktøj, skal jeg bare sikre mig, at værktøjet listes, når jeg lister alle værktøjer, og at det kaldes, når der kommer en indgående anmodning om at kalde et værktøj. 

Lad os se på, hvordan koden ser ud nu:

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
  // Returner listen over registrerede værktøjer
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

Her har vi nu en funktion, der returnerer en liste over funktioner. Hvert element i værktøjslisten har nu felter som `name`, `description` og `inputSchema` for at overholde returtypen. Dette gør det muligt for os at placere vores værktøjer og funktionsdefinitioner et andet sted. Vi kan nu oprette alle vores værktøjer i en tools-mappe, og det samme gælder for alle dine funktioner, så dit projekt pludselig kan organiseres sådan her:

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

Det er godt, vores arkitektur kan gøres ret ren.

Hvad med at kalde værktøjer, er det samme idé så, én handler til at kalde et værktøj, uanset hvilket værktøj? Ja, præcis, her er koden til det:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools er en ordbog med værktøjsnavne som nøgler
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
    // TODO kald værktøjet,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Som du kan se fra koden ovenfor, skal vi udtrække hvilket værktøj, der skal kaldes, og med hvilke argumenter, og derefter skal vi fortsætte med at kalde værktøjet.

## Forbedring af tilgangen med validering

Indtil videre har du set, hvordan alle dine registreringer til at tilføje værktøjer, ressourcer og prompts kan erstattes med disse to handlers pr. funktionstype. Hvad mere skal vi gøre? Vi bør tilføje en form for validering for at sikre, at værktøjet kaldes med de rigtige argumenter. Hver runtime har deres egen løsning til dette, for eksempel bruger Python Pydantic og TypeScript bruger Zod. Ideen er, at vi gør følgende:

- Flyt logikken for at oprette en funktion (værktøj, ressource eller prompt) til dens dedikerede mappe.
- Tilføj en måde at validere en indkommende anmodning, der for eksempel spørger om at kalde et værktøj.

### Opret en funktion

For at oprette en funktion, skal vi lave en fil til den funktion og sikre, at den har de obligatoriske felter, der kræves af den funktion. Hvilke felter, der adskiller sig lidt mellem værktøjer, ressourcer og prompts.

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
        # Valider input ved hjælp af Pydantic-model
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: tilføj Pydantic, så vi kan oprette en AddInputModel og validere args

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

her kan du se, hvordan vi gør følgende:

- Opret et schema med Pydantic `AddInputModel` med felterne `a` og `b` i filen *schema.py*.
- Forsøg at parse den indkommende anmodning til at være af typen `AddInputModel`, hvis der er fejl i parametrene, vil dette crashe:

   ```python
   # add.py
    try:
        # Valider input ved hjælp af Pydantic-model
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Du kan vælge, om du vil placere denne parsinglogik i selve værktøjskaldet eller i handlerfunktionen.

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

- I handleren, der håndterer alle værktøjskald, prøver vi nu at parse den indkommende anmodning til værktøjets definerede schema:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    hvis det lykkes, fortsætter vi med at kalde det egentlige værktøj:

    ```typescript
    const result = await tool.callback(input);
    ```

Som du kan se, skaber denne tilgang en god arkitektur, da alt har sin plads, *server.ts* er en meget lille fil, der kun forbinder anmodningshandlerne, og hver funktion er i deres respektive mapper, dvs. tools/, resources/ eller /prompts.

Fantastisk, lad os prøve at bygge dette næste.

## Øvelse: Oprettelse af lavniveau server

I denne øvelse skal vi gøre følgende:

1. Oprette en lavniveau server, der håndterer listing af værktøjer og kald af værktøjer.
1. Implementere en arkitektur, du kan bygge videre på.
1. Tilføje validering for at sikre, at dine værktøjskald valideres korrekt.

### -1- Opret en arkitektur

Det første vi skal adressere, er en arkitektur, der hjælper os med at skalere, når vi tilføjer flere funktioner, sådan her ser det ud:

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

Nu har vi sat en arkitektur op, der sikrer, at vi nemt kan tilføje nye værktøjer i en tools-mappe. Føl dig fri til at følge dette for at tilføje undermapper til resources og prompts.

### -2- Opret et værktøj

Lad os se, hvordan det ser ud at oprette et værktøj næste. Først skal det oprettes i dets *tool* undermappe sådan her:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Valider input ved hjælp af Pydantic-model
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: tilføj Pydantic, så vi kan oprette en AddInputModel og validere argumenter

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Det vi ser her, er hvordan vi definerer navn, beskrivelse og inputschema ved brug af Pydantic og en handler, der bliver kaldt, når dette værktøj kaldes. Til sidst eksponerer vi `tool_add`, som er en dictionary, der indeholder alle disse egenskaber.

Der er også *schema.py*, som bruges til at definere inputschemat, der bruges af vores værktøj:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Vi skal også udfylde *__init__.py* for at sikre, at tools-mappen behandles som et modul. Derudover skal vi eksponere modulerne indeni sådan her:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Vi kan blive ved med at tilføje til denne fil, efterhånden som vi tilføjer flere værktøjer.

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

Her opretter vi en dictionary bestående af egenskaber:

- name, dette er navnet på værktøjet.
- rawSchema, dette er Zod-schemat, det vil blive brugt til at validere indkommende anmodninger om at kalde dette værktøj.
- inputSchema, dette schema vil blive brugt af handleren.
- callback, dette bruges til at påkalde værktøjet.

Der er også `Tool`, der bruges til at konvertere denne dictionary til en type, som MCP server handleren kan acceptere, og det ser sådan her ud:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Og der er *schema.ts*, hvor vi gemmer inputschemata for hvert værktøj, som ser sådan her ud med kun ét schema på nuværende tidspunkt, men efterhånden som vi tilføjer værktøjer, kan vi tilføje flere poster:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Fantastisk, lad os gå videre til at håndtere listen over vores værktøjer næste.

### -3- Håndter værktøjsliste

Næste, for at håndtere at liste vores værktøjer, skal vi oprette en anmodningshandler til det. Her er, hvad vi skal tilføje til vores serverfil:

**Python**

```python
# kode udeladt for kortfattethed
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

Her tilføjer vi dekoratøren `@server.list_tools` og implementeringsfunktionen `handle_list_tools`. I sidstnævnte skal vi producere en liste over værktøjer. Bemærk hvordan hvert værktøj skal have navn, beskrivelse og inputSchema.   

**TypeScript**

For at sætte anmodningshandleren op til at liste værktøjer, skal vi kalde `setRequestHandler` på serveren med et schema, der passer til det, vi prøver at gøre, i dette tilfælde `ListToolsRequestSchema`. 

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
// kode udeladt for kortfattethed
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Returner listen over registrerede værktøjer
  return {
    tools: tools
  };
});
```

Fantastisk, nu har vi løst delen med at liste værktøjer, lad os se på, hvordan vi kunne kalde værktøjer næste.

### -4- Håndter kald af værktøj

For at kalde et værktøj, skal vi sætte en anden anmodningshandler op, denne gang fokuseret på at håndtere en anmodning, der angiver, hvilken funktion der skal kaldes og med hvilke argumenter.

**Python**

Lad os bruge dekoratøren `@server.call_tool` og implementere den med en funktion som `handle_call_tool`. Inden i den funktion skal vi udtrække værktøjsnavnet, dets argument og sikre, at argumenterne er gyldige for det pågældende værktøj. Vi kan enten validere argumenterne i denne funktion eller længere nede i selve værktøjet.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools er en ordbog med værktøjsnavne som nøgler
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # kald værktøjet
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Her sker følgende:

- Vores værktøjsnavn er allerede til stede som inputparameteren `name`, hvilket også gælder for vores argumenter i form af `arguments` dictionary.

- Værktøjet bliver kaldt med `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Valideringen af argumenterne foregår i `handler`-egenskaben, som peger på en funktion, hvis det fejler, vil den rejse en undtagelse. 

Så nu har vi en fuld forståelse af at liste og kalde værktøjer ved brug af en lavniveau server.

Se [det komplette eksempel](./code/README.md) her

## Opgave

Udvid den kode, du har fået, med et antal værktøjer, ressourcer og prompts og reflekter over, hvordan du bemærker, at du kun skal tilføje filer i tools-mappen og ingen andre steder. 

*Ingen løsning givet*

## Resumé

I dette kapitel så vi, hvordan lavniveau-server-tilgangen fungerede, og hvordan det kan hjælpe os med at skabe en flot arkitektur, som vi kan fortsætte med at bygge videre på. Vi diskuterede også validering, og du blev vist, hvordan man arbejder med valideringsbiblioteker til at skabe schemas til inputvalidering.

## Hvad kommer nu

- Næste: [Simple Authentication](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->