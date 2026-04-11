# Avansert serverbruk

Det finnes to forskjellige typer servere eksponert i MCP SDK, din vanlige server og lavnivåserveren. Normalt vil du bruke den vanlige serveren for å legge til funksjoner til den. I noen tilfeller derimot, ønsker man å stole på lavnivåserveren slik som:

- Bedre arkitektur. Det er mulig å lage en ren arkitektur med både den vanlige serveren og en lavnivåserver, men det kan argumenteres for at det er litt enklere med en lavnivåserver.
- Funksjons tilgjengelighet. Noen avanserte funksjoner kan kun brukes med en lavnivåserver. Dette vil du se i senere kapitler når vi legger til sampling og elicitation.

## Vanlig server vs lavnivåserver

Slik ser opprettelsen av en MCP Server ut med den vanlige serveren

**Python**

```python
mcp = FastMCP("Demo")

# Legg til et tillegg verktøy
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

// Legg til et tillegg verktøy
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

Poenget er at du eksplisitt legger til hvert verktøy, ressurs eller prompt som du ønsker at serveren skal ha. Ingenting galt med det.  

### Lavnivåserver-tilnærming

Men når du bruker lavnivåserver-tilnærmingen må du tenke det annerledes. I stedet for å registrere hvert verktøy, lager du i stedet to handlerfunksjoner per funksjonstype (verktøy, ressurser eller prompts). Så for eksempel har verktøy da kun to funksjoner som slik:

- Liste opp alle verktøy. Én funksjon vil være ansvarlig for alle forsøk på å liste opp verktøy.
- Håndtere å kalle alle verktøy. Her er det også bare én funksjon som håndterer kall til et verktøy.

Det høres ut som potensielt mindre arbeid ikke sant? Så i stedet for å registrere et verktøy, trenger jeg bare å sikre at verktøyet listes når jeg lister opp alle verktøy og at det kalles når det kommer en forespørsel om å kalle et verktøy.

La oss se hvordan koden nå ser ut:

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
  // Returner listen over registrerte verktøy
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

Her har vi nå en funksjon som returnerer en liste over funksjoner. Hver oppføring i verktøyliste har nå felter som `name`, `description` og `inputSchema` for å oppfylle returtypen. Dette gjør at vi kan legge verktøyene og funksjonsdefinisjonen et annet sted. Vi kan nå lage alle våre verktøy i en verktøymappe, og det samme gjelder for alle dine funksjoner, slik at prosjektet plutselig kan organiseres slik:

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

Det er flott, vår arkitektur kan gjøres ganske ryddig.

Hva med å kalle verktøy, er det samme idéen da, én handler for å kalle et verktøy, hvilket som helst verktøy? Ja, akkurat, her er koden for det:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # verktøy er et ordbok med verktøynavn som nøkler
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
    // TODO kall verktøyet,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Som du kan se fra koden over, må vi hente ut hvilket verktøy som skal kalles, og med hvilke argumenter, og så må vi gå videre til å kalle verktøyet.

## Forbedre tilnærmingen med validering

Så langt har du sett hvordan alle registreringene for å legge til verktøy, ressurser og prompts kan erstattes med disse to handlerne per funksjonstype. Hva mer må vi gjøre? Vel, vi bør legge til en form for validering for å sikre at verktøyet kalles med riktige argumenter. Hver runtime har sin egen løsning for dette, for eksempel bruker Python Pydantic og TypeScript bruker Zod. Ideen er at vi gjør følgende:

- Flytt logikken for å lage en funksjon (verktøy, ressurs eller prompt) til sin dedikerte mappe.
- Legg til en måte å validere en innkommende forespørsel som for eksempel ber om å kalle et verktøy.

### Opprette en funksjon

For å opprette en funksjon, må vi lage en fil for den funksjonen og sørge for at den har de obligatoriske feltene som kreves for den funksjonen. Hvilke felter varierer litt mellom verktøy, ressurser og prompts.

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
        # Valider input ved hjelp av Pydantic-modellen
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: legg til Pydantic, så vi kan lage en AddInputModel og validere argumenter

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Her ser du hvordan vi gjør følgende:

- Lager et skjema med Pydantic `AddInputModel` med feltene `a` og `b` i filen *schema.py*.
- Forsøker å analysere den innkommende forespørselen til typen `AddInputModel`, hvis det er en uoverensstemmelse i parametrene vil dette krasje:

   ```python
   # add.py
    try:
        # Valider input ved bruk av Pydantic-modell
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Du kan velge om du vil legge denne parsing-logikken i selve verktøykallet eller i handler-funksjonen.

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

- I handleren som håndterer alle verktøykall, prøver vi nå å analysere den innkommende forespørselen i verktøyets definerte skjema:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    Hvis det fungerer, går vi videre til å kalle det faktiske verktøyet:

    ```typescript
    const result = await tool.callback(input);
    ```

Som du kan se, skaper denne tilnærmingen en god arkitektur ettersom alt har sin plass, *server.ts* er en veldig liten fil som bare kobler opp forespørsels-handlere, og hver funksjon er i sin respektive mappe, f.eks tools/, resources/ eller /prompts.

Flott, la oss prøve å bygge dette neste.

## Øvelse: Lage en lavnivåserver

I denne øvelsen skal vi gjøre følgende:

1. Lage en lavnivåserver som håndterer oppramsing av verktøy og kall av verktøy.
1. Implementere en arkitektur du kan bygge videre på.
1. Legge til validering for å sikre at verktøykall valideres riktig.

### -1- Lage en arkitektur

Det første vi må ta tak i er en arkitektur som hjelper oss å skalere etterhvert som vi legger til flere funksjoner, slik ser det ut:

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

Nå har vi satt opp en arkitektur som sikrer at vi enkelt kan legge til nye verktøy i en tools-mappe. Føl deg fri til å følge dette for å legge til undermapper for resources og prompts.

### -2- Lage et verktøy

La oss se hvordan det ser ut å lage et verktøy. Først må det opprettes i sin *tool*-undermappe slik:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Valider input ved hjelp av Pydantic-modellen
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: legg til Pydantic, slik at vi kan lage en AddInputModel og validere argumenter

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Her ser vi hvordan vi definerer navn, beskrivelse og inputskjema ved bruk av Pydantic og en handler som vil bli kalt når dette verktøyet kalles. Til slutt eksponerer vi `tool_add` som er en ordbok som holder alle disse egenskapene.

Det finnes også *schema.py* som brukes til å definere inndataskjemaet brukt av verktøyet vårt:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Vi må også fylle *__init__.py* for å sikre at verktøymappen behandles som en modul. I tillegg må vi eksponere modulene i den slik:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Vi kan fortsette å legge til i denne filen når vi legger til flere verktøy.

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

Her lager vi en ordbok bestående av egenskaper:

- name, dette er navnet på verktøyet.
- rawSchema, dette er Zod-skjemat, det brukes til å validere innkommende forespørsler for å kalle dette verktøyet.
- inputSchema, dette skjemaet brukes av handleren.
- callback, dette brukes til å kalle verktøyet.

Det finnes også `Tool` som brukes til å konvertere denne ordboken til en type som MCP serverhandler kan akseptere, det ser slik ut:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Og det finnes *schema.ts* hvor vi lagrer inputskjemaer for hvert verktøy, det ser slik ut med kun ett skjema nå, men når vi legger til verktøy kan vi legge til flere oppføringer:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Flott, la oss gå videre til å håndtere oppramsing av verktøy neste.

### -3- Håndtere oppramsing av verktøy

Neste steg for å håndtere oppramsing av verktøy, må vi sette opp en forespørsels-handler for det. Her er hva vi må legge til i serverfilen:

**Python**

```python
# kode utelatt for korthet
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

Her legger vi til dekoratøren `@server.list_tools` og implementerende funksjon `handle_list_tools`. I sistnevnte må vi produsere en liste over verktøy. Legg merke til at hvert verktøy må ha name, description og inputSchema.   

**TypeScript**

For å sette opp forespørsels-handler for oppramsing av verktøy, må vi kalle `setRequestHandler` på serveren med et skjema som passer det vi prøver å gjøre, i dette tilfellet `ListToolsRequestSchema`.

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
// kode utelatt for korthet
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Returner listen over registrerte verktøy
  return {
    tools: tools
  };
});
```

Flott, nå har vi løst delen med oppramsing av verktøy, la oss se på hvordan vi kan kalle verktøy neste.

### -4- Håndtere kall til verktøy

For å kalle et verktøy, må vi sette opp en annen forespørsels-handler, denne gangen fokusert på å håndtere en forespørsel som spesifiserer hvilken funksjon som skal kalles og med hvilke argumenter.

**Python**

La oss bruke dekoratøren `@server.call_tool` og implementere den med en funksjon som `handle_call_tool`. Inni den funksjonen må vi hente ut verktøynavnet, argumentet og sikre at argumentene er gyldige for verktøyet det gjelder. Vi kan validere argumentene enten i denne funksjonen eller i selve verktøyet.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools er en ordbok med verktøynavn som nøkler
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # kall verktøyet
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Slik foregår det:

- Verktøynavnet vårt er allerede til stede som input-parameter `name` som gjelder for argumentene våre i form av `arguments`-ordboken.

- Verktøyet kalles med `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Valideringen av argumentene skjer i `handler`-egenskapen som peker til en funksjon, hvis det feiler vil det kaste en unntak.

Der har du det, nå har vi en full forståelse av oppramsing og kall av verktøy ved bruk av lavnivåserver.

Se [fullt eksempel](./code/README.md) her

## Oppgave

Utvid koden du har fått med en rekke verktøy, ressurser og prompts og reflekter over hvordan du merker at du kun trenger å legge til filer i tools-mappen og ingen andre steder.

*Ingen løsning gitt*

## Oppsummering

I dette kapittelet så vi hvordan lavnivåservertilnærmingen fungerer og hvordan det kan hjelpe oss å lage en fin arkitektur vi kan fortsette å bygge på. Vi diskuterte også validering og du ble vist hvordan du kan jobbe med valideringsbiblioteker for å lage skjemaer for inndatavalidering.

## Hva kommer nå

- Neste: [Enkel autentisering](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:  
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vennligst vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket bør betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->