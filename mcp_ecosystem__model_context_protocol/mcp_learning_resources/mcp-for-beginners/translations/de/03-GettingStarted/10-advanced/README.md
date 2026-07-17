# Erweiterte Server-Nutzung

Im MCP SDK gibt es zwei verschiedene Arten von Servern, deinen normalen Server und den Low-Level-Server. Normalerweise würdest du den regulären Server verwenden, um ihm Funktionen hinzuzufügen. In einigen Fällen möchtest du jedoch auf den Low-Level-Server zurückgreifen, zum Beispiel bei:

- Bessere Architektur. Es ist möglich, eine saubere Architektur sowohl mit dem regulären Server als auch mit einem Low-Level-Server zu erstellen, aber es kann argumentiert werden, dass es mit einem Low-Level-Server etwas einfacher ist.
- Funktionsverfügbarkeit. Einige erweiterte Funktionen können nur mit einem Low-Level-Server verwendet werden. Das wirst du in späteren Kapiteln sehen, wenn wir Sampling hinzufügen (veraltet in der `2026-07-28` Release-Kandidaten-Version) und Elicitation.

## Regulärer Server vs Low-Level-Server

So sieht die Erstellung eines MCP Servers mit dem regulären Server aus

**Python**

```python
mcp = FastMCP("Demo")

# Fügen Sie ein Additionswerkzeug hinzu
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

// Fügen Sie ein Additionstool hinzu
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

Die Idee ist, dass du explizit jedes Werkzeug, jede Ressource oder Eingabe hinzufügst, die der Server haben soll. Daran ist nichts auszusetzen.  

### Low-Level-Server-Ansatz

Wenn du jedoch den Low-Level-Server-Ansatz verwendest, musst du anders denken. Anstatt jedes Werkzeug zu registrieren, erstellst du stattdessen zwei Handler pro Funktionstyp (Tools, Ressourcen oder Prompts). Werkzeuge haben also zum Beispiel nur zwei Funktionen wie folgt:

- Auflisten aller Werkzeuge. Eine Funktion ist für alle Versuche, Werkzeuge aufzulisten, zuständig.
- Aufrufen aller Werkzeuge. Hier gibt es ebenfalls nur eine Funktion, die Aufrufe an ein Werkzeug verarbeitet.

Das klingt nach möglicherweise weniger Aufwand, oder? Also statt ein Werkzeug zu registrieren, muss ich nur sicherstellen, dass das Werkzeug bei der Auflistung aller Werkzeuge erscheint und dass es aufgerufen wird, wenn eine eingehende Anfrage zum Aufrufen eines Werkzeugs besteht. 

Schauen wir uns an, wie der Code jetzt aussieht:

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
  // Gibt die Liste der registrierten Werkzeuge zurück
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

Hier haben wir nun eine Funktion, die eine Liste von Funktionen zurückgibt. Jeder Eintrag in der Werkzeugliste hat jetzt Felder wie `name`, `description` und `inputSchema`, um dem Rückgabetyp zu entsprechen. Dadurch können wir unsere Werkzeuge und Funktionsdefinitionen an anderer Stelle ablegen. Wir können jetzt alle unsere Werkzeuge in einem Werkzeuge-Ordner erstellen und das Gleiche gilt für alle deine Funktionen, sodass dein Projekt plötzlich so organisiert sein kann:

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

Das ist großartig, unsere Architektur kann dadurch sehr sauber aussehen.

Wie sieht es mit dem Aufrufen von Werkzeugen aus, ist es dann die gleiche Idee, ein Handler zum Aufrufen eines Werkzeugs, egal welches? Ja, genau, hier ist der Code dafür:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ist ein Wörterbuch mit Werkzeugnamen als Schlüssel
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
    // TODO rufe das Werkzeug auf,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Wie du am obigen Code sehen kannst, müssen wir das Werkzeug, das aufgerufen werden soll, und seine Argumente parsen und dann das Werkzeug aufrufen.

## Verbesserung des Ansatzes mit Validierung

Bis jetzt hast du gesehen, wie alle deine Registrierungen zum Hinzufügen von Werkzeugen, Ressourcen und Prompts durch diese zwei Handler pro Funktionstyp ersetzt werden können. Was müssen wir sonst noch tun? Nun, wir sollten eine Form der Validierung hinzufügen, um sicherzustellen, dass das Werkzeug mit den richtigen Argumenten aufgerufen wird. Jede Laufzeitumgebung hat dafür ihre eigene Lösung, zum Beispiel verwendet Python Pydantic und TypeScript Zod. Die Idee ist Folgende:

- Die Logik zum Erstellen einer Funktion (Werkzeug, Ressource oder Prompt) in ihren eigenen Ordner verschieben.
- Eine Möglichkeit hinzufügen, eingehende Anfragen zu validieren, die zum Beispiel den Aufruf eines Werkzeugs betreffen.

### Eine Funktion erstellen

Um eine Funktion zu erstellen, müssen wir eine Datei für diese Funktion anlegen und sicherstellen, dass sie die Pflichtfelder enthält, die für diese Funktion erforderlich sind. Welche Felder das sind, unterscheidet sich etwas zwischen Werkzeugen, Ressourcen und Prompts.

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
        # Eingabe mit Pydantic-Modell validieren
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic hinzufügen, damit wir ein AddInputModel erstellen und Argumente validieren können

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Hier siehst du, wie wir Folgendes machen:

- Ein Schema mit Pydantic `AddInputModel` erstellen mit den Feldern `a` und `b` in der Datei *schema.py*.
- Versuch, die eingehende Anfrage als `AddInputModel` zu parsen; bei einem Parameter-Mismatch wird dies abstürzen:

   ```python
   # add.py
    try:
        # Eingabe mit Pydantic-Modell validieren
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Du kannst entscheiden, ob du diese Parsing-Logik im eigentlichen Werkzeugaufruf oder in der Handler-Funktion platzierst.

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

- Im Handler, der alle Werkzeugaufrufe behandelt, versuchen wir jetzt, die eingehende Anfrage in das vom Werkzeug definierte Schema zu parsen:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    wenn das funktioniert, fahren wir mit dem eigentlichen Aufruf des Werkzeugs fort:

    ```typescript
    const result = await tool.callback(input);
    ```

Wie du siehst, schafft dieser Ansatz eine großartige Architektur, da alles seinen Platz hat, die *server.ts* eine sehr kleine Datei ist, die nur die Request-Handler verknüpft, und jede Funktion sich in ihrem jeweiligen Ordner befindet, also tools/, resources/ oder /prompts.

Großartig, lass uns das als Nächstes bauen. 

## Übung: Einen Low-Level-Server erstellen

In dieser Übung werden wir Folgendes tun:

1. Einen Low-Level-Server erstellen, der das Auflisten von Werkzeugen und das Aufrufen von Werkzeugen behandelt.
1. Eine Architektur implementieren, auf die du aufbauen kannst.
1. Validierung hinzufügen, um sicherzustellen, dass deine Werkzeugaufrufe ordnungsgemäß validiert werden.

### -1- Eine Architektur erstellen

Das Erste, was wir angehen müssen, ist eine Architektur, die uns beim Skalieren unterstützt, wenn wir mehr Funktionen hinzufügen, so sieht sie aus:

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

Nun haben wir eine Architektur eingerichtet, die sicherstellt, dass wir problemlos neue Werkzeuge in einem tools-Ordner hinzufügen können. Folge gerne diesem Beispiel, um Unterverzeichnisse für Ressourcen und Prompts hinzuzufügen.

### -2- Ein Werkzeug erstellen

Schauen wir uns als Nächstes an, wie das Erstellen eines Werkzeugs aussieht. Zuerst muss es in seinem *tool*-Unterverzeichnis erstellt werden, so:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Validieren Sie die Eingabe mit dem Pydantic-Modell
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Fügen Sie Pydantic hinzu, damit wir ein AddInputModel erstellen und die Argumente validieren können

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Hier siehst du, wie wir Name, Beschreibung und Input-Schema mit Pydantic definieren und einen Handler angeben, der aufgerufen wird, sobald dieses Werkzeug genutzt wird. Schließlich exponieren wir `tool_add`, das ein Dictionary mit all diesen Eigenschaften enthält.

Es gibt auch *schema.py*, das verwendet wird, um das Input-Schema unseres Werkzeugs zu definieren:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Wir müssen auch *__init__.py* befüllen, damit der Werkzeuge-Ordner als Modul behandelt wird. Zusätzlich müssen wir die darin enthaltenen Module so exponieren:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Wir können diese Datei erweitern, sobald wir weitere Werkzeuge hinzufügen.

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

Hier erstellen wir ein Dictionary, das die Eigenschaften enthält:

- name, das ist der Name des Werkzeugs.
- rawSchema, das ist das Zod-Schema, es wird verwendet, um eingehende Anfragen zum Aufruf dieses Werkzeugs zu validieren.
- inputSchema, dieses Schema wird vom Handler verwendet.
- callback, das wird verwendet, um das Werkzeug auszuführen.

Es gibt auch `Tool`, das dieses Dictionary in einen Typ konvertiert, den der MCP-Server-Handler akzeptieren kann, und sieht so aus:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Und es gibt *schema.ts*, wo wir die Input-Schemas für jedes Werkzeug speichern; aktuell nur mit einem Schema, aber beim Hinzufügen weiterer Werkzeuge können wir mehr Einträge hinzufügen:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Großartig, schauen wir uns als Nächstes die Behandlung der Werkzeugauflistung an.

### -3- Werkzeugauflistung bearbeiten

Als Nächstes müssen wir einen Request-Handler zum Auflisten unserer Werkzeuge einrichten. So fügen wir ihn in unsere Serverdatei ein:

**Python**

```python
# Code aus Platzgründen weggelassen
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

Hier fügen wir den Decorator `@server.list_tools` und die Implementierungsfunktion `handle_list_tools` hinzu. In dieser müssen wir eine Liste von Werkzeugen zurückgeben. Beachte, dass jedes Werkzeug einen Namen, eine Beschreibung und ein inputSchema haben muss.   

**TypeScript**

Um den Request-Handler für die Werkzeugauflistung einzurichten, müssen wir `setRequestHandler` auf dem Server mit einem Schema aufrufen, das zu dem passt, was wir tun wollen, in diesem Fall `ListToolsRequestSchema`. 

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
// Code aus Platzgründen weggelassen
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Gibt die Liste der registrierten Werkzeuge zurück
  return {
    tools: tools
  };
});
```

Großartig, jetzt haben wir das Auflisten der Werkzeuge gelöst, schauen wir uns als Nächstes an, wie wir Werkzeuge aufrufen können.

### -4- Werkzeugaufruf bearbeiten

Um ein Werkzeug aufzurufen, müssen wir einen weiteren Request-Handler einrichten, der eine Anfrage behandelt, welches Feature mit welchen Argumenten aufgerufen werden soll.

**Python**

Verwenden wir den Decorator `@server.call_tool` und implementieren ihn mit einer Funktion wie `handle_call_tool`. Innerhalb dieser Funktion müssen wir den Werkzeugnamen, seine Argumente parsen und sicherstellen, dass die Argumente für das betreffende Werkzeug gültig sind. Wir können die Validierung entweder in dieser Funktion oder weiter unten im eigentlichen Werkzeug vornehmen.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ist ein Wörterbuch mit Werkzeugnamen als Schlüssel
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # das Werkzeug aufrufen
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

So läuft das ab:

- Unser Werkzeugname ist bereits als Eingabeparameter `name` vorhanden, ebenso die Argumente in Form des `arguments`-Dictionaries.

- Das Werkzeug wird mit `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` aufgerufen. Die Validierung der Argumente erfolgt in der `handler` Eigenschaft, die auf eine Funktion verweist; wenn diese fehlschlägt, wird eine Ausnahme ausgelöst.

Somit haben wir jetzt ein vollständiges Verständnis davon, wie man Werkzeuge anzeigt und aufruft, indem man einen Low-Level-Server verwendet.

Siehe das [vollständige Beispiel](./code/README.md) hier

## Aufgabe

Erweitere den dir gegebenen Code mit einer Reihe von Werkzeugen, Ressourcen und Prompts und überlege, wie dir auffällt, dass du nur Dateien im tools-Verzeichnis hinzufügen musst und nirgends sonst. 

*Keine Lösung gegeben*

## Zusammenfassung

In diesem Kapitel haben wir gesehen, wie der Low-Level-Server-Ansatz funktioniert und wie er uns helfen kann, eine schöne Architektur zu schaffen, auf der wir weiter aufbauen können. Wir haben auch die Validierung besprochen und dir gezeigt, wie du mit Validierungsbibliotheken Schemas zur Eingabevalidierung erstellst.

## Was kommt als Nächstes

- Nächstes: [Einfache Authentifizierung](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->