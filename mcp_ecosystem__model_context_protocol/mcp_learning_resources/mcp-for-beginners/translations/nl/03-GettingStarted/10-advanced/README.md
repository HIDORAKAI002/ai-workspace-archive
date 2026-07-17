# Geavanceerd servergebruik

Er zijn twee verschillende typen servers beschikbaar in de MCP SDK, je normale server en de low-level server. Normaal gesproken zou je de reguliere server gebruiken om er functies aan toe te voegen. In sommige gevallen wil je echter vertrouwen op de low-level server, zoals:

- Betere architectuur. Het is mogelijk om een schone architectuur te creëren met zowel de reguliere server als een low-level server, maar er valt te beargumenteren dat het iets makkelijker is met een low-level server.
- Beschikbaarheid van functies. Sommige geavanceerde functies kunnen alleen worden gebruikt met een low-level server. Dit zul je in latere hoofdstukken zien wanneer we sampling toevoegen (deprecated in releasestatus `2026-07-28`) en elicitation.

## Reguliere server vs low-level server

Zo ziet het aanmaken van een MCP Server eruit met de reguliere server

**Python**

```python
mcp = FastMCP("Demo")

# Voeg een toevoegingshulpmiddel toe
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

// Voeg een toevoeginstrument toe
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

Het punt is dat je expliciet elk hulpmiddel, resource of prompt toevoegt dat je wilt dat de server heeft. Daar is niks mis mee.  

### Low-level serverbenadering

Echter, wanneer je de low-level serverbenadering gebruikt, moet je er anders over nadenken. In plaats van elk hulpmiddel te registreren, maak je twee handlers per type functie (hulpmiddelen, resources of prompts). Zo hebben hulpmiddelen bijvoorbeeld maar twee functies zoals hieronder:

- Alle hulpmiddelen vermelden. Eén functie is verantwoordelijk voor alle pogingen om hulpmiddelen te vermelden.
- Het aanroepen van hulpmiddelen afhandelen. Hier is ook maar één functie die het aanroepen van een hulpmiddel afhandelt.

Dat klinkt als mogelijk minder werk toch? Dus in plaats van een hulpmiddel te registreren hoef ik alleen maar te zorgen dat het hulpmiddel wordt vermeld wanneer ik alle hulpmiddelen opsom en dat het wordt aangeroepen als er een binnenkomend verzoek is om een hulpmiddel aan te roepen. 

Laten we eens kijken hoe de code er nu uitziet:

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
  // Geef de lijst van geregistreerde hulpmiddelen terug
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

Hier hebben we nu een functie die een lijst met functies retourneert. Elk item in de hulmiddelenlijst heeft nu velden zoals `naam`, `beschrijving` en `inputSchema` om te voldoen aan het retourneertype. Dit stelt ons in staat om onze hulpmiddelen en functiedefinities elders te plaatsen. We kunnen nu al onze hulpmiddelen maken in een tools-map en hetzelfde geldt voor al je functies zodat je project er plotseling zo uit kan zien:

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

Dat is geweldig, onze architectuur kan er behoorlijk netjes uitzien.

En het aanroepen van hulpmiddelen, is dat dan hetzelfde idee, één handler om een hulpmiddel aan te roepen, om welk hulpmiddel dan ook? Ja, precies, hier is de code daarvoor:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools is een woordenboek met gereedschapsnamen als sleutels
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
    // TODO roep het hulpmiddel aan,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Zoals je kunt zien in bovenstaande code, moeten we het hulpmiddel identificeren dat moet worden aangeroepen en met welke argumenten, en dan moeten we doorgaan met het aanroepen van het hulpmiddel.

## De benadering verbeteren met validatie

Tot nu toe heb je gezien hoe al je registraties om hulpmiddelen, resources en prompts toe te voegen, kunnen worden vervangen door deze twee handlers per type functie. Wat moeten we nog meer doen? Nou, we moeten een vorm van validatie toevoegen om ervoor te zorgen dat het hulpmiddel wordt aangeroepen met de juiste argumenten. Iedere runtime heeft hier zijn eigen oplossing voor, bijvoorbeeld gebruikt Python Pydantic en TypeScript gebruikt Zod. Het idee is dat we het volgende doen:

- Verplaats de logica voor het maken van een functie (hulpmiddel, resource of prompt) naar de dedicated map ervan.
- Voeg een manier toe om een binnenkomend verzoek te valideren dat bijvoorbeeld vraagt om een hulpmiddel aan te roepen.

### Maak een functie aan

Om een functie aan te maken, moeten we een bestand voor die functie maken en ervoor zorgen dat het de verplichte velden bevat die voor die functie nodig zijn. Welke velden verschillen enigszins tussen hulpmiddelen, resources en prompts.

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
        # Valideer invoer met behulp van Pydantic-model
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: voeg Pydantic toe, zodat we een AddInputModel kunnen maken en argumenten kunnen valideren

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

hier zie je hoe we het volgende doen:

- Maak een schema aan met Pydantic `AddInputModel` met velden `a` en `b` in bestand *schema.py*.
- Probeer het binnenkomende verzoek te parsen als type `AddInputModel`, als er een mismatch in parameters is, zal dit crashen:

   ```python
   # add.py
    try:
        # Valideer invoer met behulp van het Pydantic-model
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Je kunt kiezen of je deze parseerlogica in de tool-aanroep zelf zet of in de handlerfunctie.

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

- In de handler die alle tool-aanspraken afhandelt, proberen we nu het binnenkomende verzoek te parsen naar het door het hulpmiddel gedefinieerde schema:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    als dat lukt dan gaan we door met het aanroepen van het daadwerkelijke hulpmiddel:

    ```typescript
    const result = await tool.callback(input);
    ```

Zoals je ziet, creëert deze benadering een mooie architectuur omdat alles een plek heeft, het *server.ts* is een heel klein bestand dat alleen de verzoekhandlers aansluit en elke functie bevindt zich in hun respectievelijke map, dat wil zeggen tools/, resources/ of /prompts.

Geweldig, laten we dit als volgende proberen te bouwen.

## Oefening: Een low-level server maken

In deze oefening doen we het volgende:

1. Maak een low-level server die het vermelden en aanroepen van hulpmiddelen afhandelt.
1. Implementeer een architectuur waarop je kunt voortbouwen.
1. Voeg validatie toe om ervoor te zorgen dat je tool-aanroepen correct worden gevalideerd.

### -1- Maak een architectuur

Het eerste wat we moeten aanpakken is een architectuur die ons helpt schaalbaar te zijn als we meer functies toevoegen, zo ziet het eruit:

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

Nu hebben we een architectuur opgezet die ervoor zorgt dat we gemakkelijk nieuwe hulpmiddelen kunnen toevoegen in een tools-map. Voel je vrij om deze te volgen om submappen voor resources en prompts toe te voegen.

### -2- Een hulpmiddel creëren

Laten we eens kijken hoe het creëren van een hulpmiddel eruitziet. Eerst moet het gemaakt worden in zijn *tool* submap zoals volgt:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Valideer invoer met behulp van het Pydantic-model
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: voeg Pydantic toe, zodat we een AddInputModel kunnen maken en args kunnen valideren

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Wat we hier zien is hoe we naam, beschrijving en input schema definiëren met Pydantic en een handler die wordt aangeroepen zodra dit hulpmiddel wordt opgeroepen. Ten slotte exposeren we `tool_add` wat een dictionary is met al deze eigenschappen.

Er is ook *schema.py* dat wordt gebruikt om het input schema te definiëren dat door ons hulpmiddel wordt gebruikt:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

We moeten ook *__init__.py* vullen om ervoor te zorgen dat de tools map als module wordt behandeld. Daarnaast moeten we de modules binnenin zoals volgt exposeren:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

We kunnen dit bestand blijven uitbreiden naarmate we meer hulpmiddelen toevoegen.

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

Hier maken we een dictionary bestaande uit eigenschappen:

- naam, dit is de naam van het hulpmiddel.
- rawSchema, dit is het Zod-schema, dit wordt gebruikt om binnenkomende verzoeken voor het aanroepen van dit hulpmiddel te valideren.
- inputSchema, dit schema wordt gebruikt door de handler.
- callback, dit wordt gebruikt om het hulpmiddel aan te roepen.

Er is ook `Tool` dat wordt gebruikt om deze dictionary om te zetten in een type dat door de mcp server handler geaccepteerd kan worden en ziet er zo uit:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

En er is *schema.ts* waar we de input schemas voor elk hulpmiddel opslaan, er is er op dit moment maar één maar naarmate we hulpmiddelen toevoegen kunnen we meer items toevoegen:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Geweldig, laten we doorgaan met het afhandelen van de lijst van onze hulpmiddelen.

### -3- Hulpmiddelenlijst afhandelen

Vervolgens moeten we een request handler opzetten om onze hulpmiddelen op te sommen. Dit moeten we toevoegen aan ons serverbestand:

**Python**

```python
# code weggelaten voor beknoptheid
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

Hier voegen we decorator `@server.list_tools` toe en de implementerende functie `handle_list_tools`. In die laatste moeten we een lijst met hulpmiddelen produceren. Let op hoe elk hulpmiddel een naam, beschrijving en inputSchema moet hebben.   

**TypeScript**

Om de request handler voor het opsommen van hulpmiddelen op te zetten, moeten we `setRequestHandler` aanroepen op de server met een schema dat past bij wat we willen doen, in dit geval `ListToolsRequestSchema`. 

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
// code weggelaten voor beknoptheid
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Geef de lijst van geregistreerde tools terug
  return {
    tools: tools
  };
});
```

Geweldig, nu hebben we het stuk over het opsommen van hulpmiddelen opgelost, laten we kijken hoe we hulpmiddelen kunnen aanroepen.

### -4- Het aanroepen van een hulpmiddel afhandelen

Om een hulpmiddel aan te roepen, moeten we een andere request handler opzetten, deze keer gericht op het verwerken van een verzoek dat specificeert welke functie moet worden aangeroepen en met welke argumenten.

**Python**

Laten we de decorator `@server.call_tool` gebruiken en deze implementeren met een functie zoals `handle_call_tool`. Binnen deze functie moeten we de naam van het hulpmiddel, de argumenten parsen en zeker stellen dat de argumenten geldig zijn voor het betreffende hulpmiddel. We kunnen de argumenten valideren in deze functie of downstream in het daadwerkelijke hulpmiddel.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools is een woordenboek met gereedschapsnamen als sleutels
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # activeer het gereedschap
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Dit is wat er gebeurt:

- Onze hulpmiddelnaam is al aanwezig als de invoerparameter `name` wat ook geldt voor onze argumenten in de vorm van de dictionary `arguments`.

- Het hulpmiddel wordt aangeroepen met `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. De validatie van de argumenten gebeurt in de `handler` eigenschap die verwijst naar een functie, als dat faalt zal het een exceptie werpen. 

Daar hebben we nu een volledig begrip van het opsommen en aanroepen van hulpmiddelen met een low-level server.

Zie het [volledige voorbeeld](./code/README.md) hier

## Opdracht

Breid de code die je hebt gekregen uit met een aantal hulpmiddelen, resources en prompts en reflecteer erop hoe je alleen bestanden hoeft toe te voegen in de tools-directory en nergens anders. 

*Geen oplossing gegeven*

## Samenvatting

In dit hoofdstuk hebben we gezien hoe de low-level serverbenadering werkte en hoe dat ons kan helpen om een nette architectuur te maken waarop we kunnen blijven bouwen. We hebben ook validatie besproken en je hebt gezien hoe je met validatiebibliotheken kunt werken om schema's te maken voor inputvalidatie.

## Wat volgt

- Volgende: [Eenvoudige authenticatie](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->