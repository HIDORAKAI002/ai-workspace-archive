# Geavanceerd servergebruik

Er zijn twee verschillende soorten servers beschikbaar in de MCP SDK: je normale server en de low-level server. Normaal gesproken gebruik je de reguliere server om er functies aan toe te voegen. In sommige gevallen wil je echter vertrouwen op de low-level server, zoals:

- Betere architectuur. Het is mogelijk om een schone architectuur te creëren met zowel de reguliere server als een low-level server, maar het valt te betogen dat het iets eenvoudiger is met een low-level server.
- Beschikbaarheid van functies. Sommige geavanceerde functies kunnen alleen worden gebruikt met een low-level server. Dit zie je in latere hoofdstukken als we sampling en elicitation toevoegen.

## Reguliere server versus low-level server

Zo ziet het maken van een MCP Server eruit met de reguliere server

**Python**

```python
mcp = FastMCP("Demo")

# Voeg een optelling gereedschap toe
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

// Voeg een toevoegingsgereedschap toe
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

Het punt is dat je expliciet elke tool, bron of prompt toevoegt die je wil dat de server heeft. Niets mis mee.

### Low-level server aanpak

Echter, wanneer je de low-level server aanpak gebruikt, moet je er anders over nadenken. In plaats van elke tool te registreren, maak je twee handlers per functietype (tools, bronnen of prompts). Dus bijvoorbeeld heeft een tool dan alleen twee functies:

- Alle tools opsommen. Eén functie is verantwoordelijk voor alle pogingen om tools op te sommen.
- Het aanroepen van alle tools afhandelen. Hier is ook maar één functie voor die het aanroepen van een tool afhandelt.

Dat klinkt als mogelijk minder werk toch? Dus in plaats van een tool te registreren, hoef ik alleen maar te zorgen dat de tool wordt vermeld bij het opsommen van alle tools en dat hij wordt aangeroepen als er een binnenkomend verzoek is om een tool aan te roepen.  

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
  // Geef de lijst van geregistreerde gereedschappen terug
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

Hier hebben we nu een functie die een lijst van functies teruggeeft. Elke vermelding in de toolslijst heeft nu velden zoals `name`, `description` en `inputSchema` om aan het returntype te voldoen. Dit stelt ons in staat om onze tools en functiedefinitie ergens anders neer te zetten. We kunnen nu al onze tools maken in een tools map en hetzelfde geldt voor al je functies zodat je project plotseling zo georganiseerd kan worden:

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

Dat is geweldig, onze architectuur kan behoorlijk schoon worden gemaakt.

Hoe zit het met tools aanroepen, is het dan hetzelfde idee, één handler om een tool aan te roepen, welke tool dan ook? Ja, precies, hier is de code daarvoor:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools is een woordenboek met toolnamen als sleutels
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

Zoals je uit bovenstaande code ziet, moeten we de tool die aangeroepen moet worden en met welke argumenten ontleden, en vervolgens moeten we verdergaan met het aanroepen van de tool.

## De aanpak verbeteren met validatie

Tot nu toe heb je gezien hoe al je registraties om tools, bronnen en prompts toe te voegen kunnen worden vervangen door deze twee handlers per functietype. Wat moeten we verder nog doen? Nou, we zouden een vorm van validatie moeten toevoegen om ervoor te zorgen dat de tool wordt aangeroepen met de juiste argumenten. Elke runtime heeft hiervoor zijn eigen oplossing, bijvoorbeeld Python gebruikt Pydantic en TypeScript gebruikt Zod. Het idee is dat we het volgende doen:

- De logica voor het maken van een functie (tool, bron of prompt) verplaatsen naar de daarvoor bestemde map.
- Een manier toevoegen om een binnenkomend verzoek te valideren dat bijvoorbeeld vraagt om een tool aan te roepen.

### Een functie aanmaken

Om een functie aan te maken, moeten we een bestand maken voor die functie en ervoor zorgen dat het de verplichte velden heeft die voor die functie vereist zijn. Welke velden verschillen enigszins tussen tools, bronnen en prompts.

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

Hier zie je hoe we het volgende doen:

- Een schema maken met Pydantic `AddInputModel` met velden `a` en `b` in het bestand *schema.py*.
- Proberen het binnenkomende verzoek te parseren naar het type `AddInputModel`, als er een mismatch in parameters is zal dit crashen:

   ```python
   # add.py
    try:
        # Valideer invoer met behulp van Pydantic-model
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Je kunt ervoor kiezen om deze parseringslogica in de tool-aanroep zelf te plaatsen of in de handlerfunctie.

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

- In de handler die alle tool-aanroepen afhandelt, proberen we nu het binnenkomende verzoek te parsen naar het gedefinieerde schema van de tool:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    als dat lukt, dan gaan we over tot het aanroepen van de daadwerkelijke tool:

    ```typescript
    const result = await tool.callback(input);
    ```

Zoals je ziet creëert deze aanpak een mooie architectuur omdat alles zijn plek heeft, de *server.ts* is een heel klein bestand dat alleen de request handlers koppelt en elke functie in hun respectievelijke map staat, dus tools/, resources/ of /prompts.

Geweldig, laten we dit nu proberen te bouwen.

## Oefening: Een low-level server maken

In deze oefening zullen we het volgende doen:

1. Een low-level server maken die listing van tools en aanroepen van tools afhandelt.
1. Een architectuur implementeren waarop je kunt voortbouwen.
1. Validatie toevoegen om ervoor te zorgen dat je tool-aanroepen correct gevalideerd worden.

### -1- Een architectuur maken

Het eerste wat we moeten aanpakken is een architectuur die ons helpt te schalen naarmate we meer functies toevoegen, zo ziet dat eruit:

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

Nu hebben we een architectuur opgezet die ervoor zorgt dat we gemakkelijk nieuwe tools kunnen toevoegen in een tools map. Voel je vrij om dit te volgen om submappen toe te voegen voor resources en prompts.

### -2- Een tool maken

Laten we zien hoe een tool maken er daarna uitziet. Eerst moet hij worden aangemaakt in zijn *tool* subdirectory, zo:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Valideer invoer met behulp van het Pydantic-model
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: voeg Pydantic toe, zodat we een AddInputModel kunnen maken en arguments kunnen valideren

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Wat we hier zien is hoe we naam, beschrijving en input schema definiëren met Pydantic en een handler die wordt aangeroepen zodra deze tool wordt aangeroepen. Tot slot maken we `tool_add` zichtbaar, een dictionary die al deze eigenschappen bevat.

Er is ook *schema.py* dat wordt gebruikt om het input schema te definiëren dat onze tool gebruikt:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

We moeten ook *__init__.py* vullen om ervoor te zorgen dat de tools directory als een module wordt behandeld. Daarnaast moeten we de modules erin publiceren zoals dit:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

We kunnen blijven toevoegen aan dit bestand naarmate we meer tools toevoegen.

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

- name, dit is de naam van de tool.
- rawSchema, dit is het Zod-schema, het wordt gebruikt om binnenkomende verzoeken om deze tool aan te roepen te valideren.
- inputSchema, dit schema wordt door de handler gebruikt.
- callback, dit wordt gebruikt om de tool aan te roepen.

Er is ook `Tool` dat wordt gebruikt om deze dictionary te converteren naar een type dat de mcp server handler accepteert, en dat ziet er zo uit:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

En er is *schema.ts* waar we de input schemas voor elke tool opslaan, die er zo uitziet met momenteel slechts één schema, maar naarmate we tools toevoegen kunnen we meer entries toevoegen:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Geweldig, laten we nu verdergaan met het afhandelen van het opsommen van onze tools.

### -3- Tools opsommen afhandelen

Om het opsommen van onze tools af te handelen, moeten we een request handler instellen daarvoor. Dit moeten we toevoegen aan ons server bestand:

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

Hier voegen we de decorator `@server.list_tools` toe en de implementerende functie `handle_list_tools`. In die laatste moeten we een lijst met tools produceren. Let erop dat elke tool een naam, beschrijving en inputSchema moet hebben.

**TypeScript**

Om de request handler voor het oplijsten van tools in te stellen, moeten we `setRequestHandler` op de server aanroepen met een schema dat past bij wat we proberen te doen, in dit geval `ListToolsRequestSchema`.

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
// code weggelaten voor de beknoptheid
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Retourneer de lijst van geregistreerde gereedschappen
  return {
    tools: tools
  };
});
```

Geweldig, nu hebben we het stukje over tools opsommen opgelost, laten we kijken hoe we tools aan kunnen roepen.

### -4- Een tool aanroepen afhandelen

Om een tool aan te roepen, moeten we een andere request handler instellen, dit keer gericht op het afhandelen van een verzoek waarin staat welke functie moet worden aangeroepen en met welke argumenten.

**Python**

Laten we de decorator `@server.call_tool` gebruiken en deze implementeren met een functie zoals `handle_call_tool`. In die functie moeten we de toolnaam en de argumenten ontleden en ervoor zorgen dat de argumenten geldig zijn voor de betreffende tool. We kunnen de argumenten validatie in deze functie doen of verderop in de daadwerkelijke tool.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools is een woordenboek met toolnamen als sleutels
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # roep de tool aan
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Dit gebeurt er:

- Onze toolnaam is al aanwezig als het invoerparameter `name`, dat geldt ook voor onze argumenten in de vorm van de `arguments` dictionary.

- De tool wordt aangeroepen met `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. De validatie van de argumenten gebeurt in de `handler` eigenschap die naar een functie wijst, als dat faalt zal er een uitzondering worden opgegooid.

Zo, nu hebben we een volledig begrip van het oplijsten en aanroepen van tools met een low-level server.

Zie het [volledige voorbeeld](./code/README.md) hier

## Opdracht

Breid de code die je hebt gekregen uit met een aantal tools, resources en prompt en reflecteer erop hoe je alleen bestanden hoeft toe te voegen in de tools directory en nergens anders.

*Geen oplossing gegeven*

## Samenvatting

In dit hoofdstuk hebben we gezien hoe de low-level server aanpak werkt en hoe die ons kan helpen een mooie architectuur op te zetten waarop we kunnen blijven bouwen. We hebben ook validatie besproken en je hebt gezien hoe je met validatiebibliotheken schemas kunt maken voor invoervalidatie.

## Wat nu

- Volgend: [Eenvoudige authenticatie](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u zich ervan bewust te zijn dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet als de gezaghebbende bron worden beschouwd. Voor cruciale informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->