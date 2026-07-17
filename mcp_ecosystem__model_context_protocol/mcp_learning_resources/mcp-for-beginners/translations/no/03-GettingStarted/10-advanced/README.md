# Avansert serverbruk

Det finnes to forskjellige typer servere eksponert i MCP SDK, din normale server og lavnivåserveren. Vanligvis vil du bruke den vanlige serveren for å legge til funksjoner på den. I noen tilfeller ønsker du imidlertid å stole på lavnivåserveren, for eksempel:

- Bedre arkitektur. Det er mulig å lage en ren arkitektur med både den vanlige serveren og en lavnivåserver, men det kan hevdes at det er litt lettere med en lavnivåserver.
- Tilgjengelighet av funksjoner. Noen avanserte funksjoner kan bare brukes med en lavnivåserver. Dette vil du se i senere kapitler når vi legger til sampling (utdatert i `2026-07-28` release candidate) og elicitation.

## Vanlig server vs lavnivåserver

Slik ser opprettelsen av en MCP Server ut med den vanlige serveren

**Python**

```python
mcp = FastMCP("Demo")

# Legg til et tilleggverktøy
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

Poenget er at du eksplisitt legger til hvert verktøy, ressurs eller prompt som du ønsker at serveren skal ha. Det er ingenting galt med det.  

### Lavnivåserver-tilnærming

Når du imidlertid bruker lavnivåserver-tilnærmingen må du tenke annerledes. I stedet for å registrere hvert verktøy lager du to behandlere per funksjonstype (verktøy, ressurser eller prompts). Så for eksempel har verktøy kun to funksjoner slik:

- Liste opp alle verktøy. Én funksjon vil være ansvarlig for alle forsøk på å liste verktøy.
- håndtere kall til alle verktøy. Her er det også bare én funksjon som håndterer kall til et verktøy.

Det høres kanskje ut som mindre arbeid, ikke sant? Så i stedet for å registrere et verktøy trenger jeg bare å sørge for at verktøyet listes når jeg lister alle verktøy, og at det kalles når det kommer en forespørsel om å kalle et verktøy. 

La oss se på hvordan koden ser ut nå:

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

Her har vi nå en funksjon som returnerer en liste med funksjoner. Hver oppføring i verktøyslisten har nå felt som `name`, `description` og `inputSchema` for å oppfylle returtypen. Dette gjør at vi kan plassere verktøy og funksjonsdefinisjon andre steder. Vi kan nå lage alle våre verktøy i en tools-mappe og det samme gjelder for alle dine funksjoner, slik at prosjektet ditt plutselig kan organiseres slik:

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

Det er flott, arkitekturen vår kan gjøres ganske ryddig.

Hva med å kalle verktøy, er det samme idéen, én handler for å kalle et verktøy, uansett hvilket verktøy? Ja, akkurat, her er koden for det:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools er et ordbok med verktøynavn som nøkler
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

Som du kan se fra koden ovenfor, må vi hente ut hvilket verktøy som skal kalles og med hvilke argumenter, og deretter må vi gå videre med å kalle verktøyet.

## Forbedring av tilnærmingen med validering

Så langt har du sett hvordan alle registreringene dine for å legge til verktøy, ressurser og prompts kan erstattes med disse to behandlerne per funksjonstype. Hva mer må vi gjøre? Vel, vi bør legge til en form for validering for å sikre at verktøyet kalles med riktige argumenter. Hver runtime har sin egen løsning for dette, for eksempel bruker Python Pydantic og TypeScript bruker Zod. Tanken er at vi gjør følgende:

- Flytt logikken for å opprette en funksjon (verktøy, ressurs eller prompt) til sin dedikerte mappe.
- Legg til en måte å validere en innkommende forespørsel om for eksempel å kalle et verktøy.

### Opprett en funksjon

For å opprette en funksjon, må vi lage en fil for den funksjonen og sørge for at den har de obligatoriske feltene som kreves for den funksjonen. Hvilke felter som kreves varierer litt mellom verktøy, ressurser og prompts.

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
        # Valider input ved hjelp av Pydantic-modell
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: legg til Pydantic, slik at vi kan lage en AddInputModel og validere args

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Her kan du se hvordan vi gjør følgende:

- Opprett et skjema ved hjelp av Pydantic `AddInputModel` med feltene `a` og `b` i filen *schema.py*.
- Forsøk å parse den innkommende forespørselen til typen `AddInputModel`, hvis det er en feil i parametrene vil dette krasje:

   ```python
   # add.py
    try:
        # Valider input ved hjelp av Pydantic-modell
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Du kan velge om du vil plassere denne parsingslogikken i selve verktøykallet eller i handler-funksjonen.

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

// skjema.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// legg_til.ts
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

- I handleren som håndterer alle verktøykall, prøver vi nå å parse den innkommende forespørselen i verktøyets definerte skjema:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    hvis det fungerer fortsetter vi med å kalle det faktiske verktøyet:

    ```typescript
    const result = await tool.callback(input);
    ```

Som du ser, skaper denne tilnærmingen en god arkitektur ettersom alt har sin plass, *server.ts* er en veldig liten fil som bare kobler opp forespørselsbehandlere, og hver funksjon er i sin respektive mappe, dvs. tools/, resources/ eller prompts/.

Flott, la oss prøve å bygge dette neste.

## Øvelse: Opprette en lavnivåserver

I denne øvelsen skal vi gjøre følgende:

1. Lage en lavnivåserver som håndterer listing av verktøy og kall til verktøy.
1. Implementere en arkitektur du kan bygge videre på.
1. Legge til validering for å sikre at verktøykallene dine blir riktig validert.

### -1- Lag en arkitektur

Det første vi må ta tak i er en arkitektur som hjelper oss å skalere etter hvert som vi legger til flere funksjoner, slik ser den ut:

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

Nå har vi satt opp en arkitektur som sikrer at vi enkelt kan legge til nye verktøy i en tools-mappe. Føl deg fri til å følge denne for å legge til undermapper for resources og prompts.

### -2- Opprette et verktøy

La oss se hvordan det ser ut å opprette et verktøy. Først må det opprettes i sin *tool*-undermappe slik:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Valider input ved hjelp av Pydantic-modell
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

Det vi ser her er hvordan vi definerer navn, beskrivelse og input-skjema ved hjelp av Pydantic og en handler som blir kalt når dette verktøyet kalles. Til slutt eksponerer vi `tool_add` som er en ordbok som holder alle disse egenskapene.

Det finnes også *schema.py* som brukes til å definere input-skjemaet verktøyet vårt bruker:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Vi må også fylle ut *__init__.py* for å sikre at verktøymappen behandles som en modul. I tillegg må vi eksponere modulene inni den slik:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Vi kan fortsette å legge til i denne filen etter hvert som vi legger til flere verktøy.

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

Her lager vi en ordbok som består av egenskaper:

- name, dette er navnet på verktøyet.
- rawSchema, dette er Zod-skjemaet, det brukes til å validere innkommende forespørsler om å kalle dette verktøyet.
- inputSchema, dette skjemaet brukes av handleren.
- callback, dette brukes for å kalle verktøyet.

Det finnes også `Tool` som brukes for å konvertere denne ordboken til en type som mcp server handler kan akseptere, og det ser slik ut:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Og det finnes *schema.ts* der vi lagrer input skjema for hvert verktøy, som ser slik ut med kun ett skjema per nå, men etter hvert som vi legger til flere verktøy kan vi legge til flere oppføringer:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Flott, la oss gå videre til å håndtere listing av våre verktøy.

### -3- Håndtere listing av verktøy

Neste steg for å håndtere listing av verktøy, må vi sette opp en forespørselsbehandler for det. Slik må vi legge det til i serverfilen:

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

Her legger vi til dekoratøren `@server.list_tools` og implementerer funksjonen `handle_list_tools`. I den sistnevnte må vi produsere en liste med verktøy. Merk at hvert verktøy må ha navn, beskrivelse og inputSchema.   

**TypeScript**

For å sette opp forespørselsbehandler for listing av verktøy, må vi kalle `setRequestHandler` på serveren med et skjema som passer til det vi prøver å gjøre, i dette tilfelle `ListToolsRequestSchema`. 

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

Flott, nå har vi løst stykket som handler om listing av verktøy. La oss se på hvordan vi kan kalle verktøy videre.

### -4- Håndtere kall til verktøy

For å kalle et verktøy må vi sette opp en annen forespørselsbehandler, denne gangen fokusert på å håndtere en forespørsel som spesifiserer hvilken funksjon som skal kalles og med hvilke argumenter.

**Python**

Vi bruker dekoratøren `@server.call_tool` og implementerer den med en funksjon som `handle_call_tool`. Inni denne funksjonen må vi hente ut verktøynavnet, argumentene dens og sikre at argumentene er gyldige for det aktuelle verktøyet. Vi kan enten validere argumentene i denne funksjonen eller videre nedstrøms i selve verktøyet.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # verktøy er en ordbok med verktøynavn som nøkler
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

Slik fungerer det:

- Verktøynavnet vårt er allerede tilstede som inngangsparameteren `name` som også gjelder for våre argumenter i form av `arguments`-ordboken.

- Verktøyet kalles med `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Valideringen av argumentene skjer i `handler`-egenskapen som peker til en funksjon, hvis det feiler vil det kaste en unntak.

Der har du det, nå har vi full forståelse for listing og kall av verktøy ved bruk av en lavnivåserver.

Se [fullt eksempel](./code/README.md) her

## Oppgave

Utvid koden du har fått med flere verktøy, ressurser og prompt, og reflekter over hvordan du legger merke til at du bare trenger å legge til filer i tools-mappen og ikke noe annet sted. 

*Ingen løsning gitt*

## Oppsummering

I dette kapittelet så vi hvordan lavnivåserver-tilnærmingen fungerte og hvordan det kan hjelpe oss å skape en fin arkitektur vi kan fortsette å bygge på. Vi diskuterte også validering, og du ble vist hvordan man jobber med valideringsbiblioteker for å lage skjemaer for input-validering.

## Hva skjer videre

- Neste: [Enkel autentisering](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->