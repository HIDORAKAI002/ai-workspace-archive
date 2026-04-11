# Erweiterte Servernutzung

Es gibt zwei verschiedene Arten von Servern, die im MCP SDK bereitgestellt werden: Ihren normalen Server und den Low-Level-Server. Normalerweise würden Sie den regulären Server verwenden, um Features hinzuzufügen. In einigen Fällen möchten Sie jedoch auf den Low-Level-Server zurückgreifen, wie zum Beispiel:

- Bessere Architektur. Es ist möglich, eine saubere Architektur sowohl mit dem regulären Server als auch mit einem Low-Level-Server zu erstellen, aber es kann argumentiert werden, dass es mit einem Low-Level-Server etwas einfacher ist.
- Verfügbare Features. Einige erweiterte Funktionen können nur mit einem Low-Level-Server genutzt werden. Dies werden Sie in späteren Kapiteln sehen, wenn wir Sampling und Elikation hinzufügen.

## Regulärer Server vs Low-Level-Server

So sieht die Erstellung eines MCP Servers mit dem regulären Server aus

**Python**

```python
mcp = FastMCP("Demo")

# Ein Werkzeug zum Addieren hinzufügen
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

// Ein Additionstool hinzufügen
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

Der Punkt ist, dass Sie explizit jedes Tool, jede Ressource oder jeden Prompt hinzufügen, den der Server haben soll. Daran ist nichts falsch.  

### Low-Level-Server-Ansatz

Wenn Sie jedoch den Low-Level-Server-Ansatz verwenden, müssen Sie anders darüber nachdenken. Anstatt jedes Tool zu registrieren, erstellen Sie stattdessen zwei Handler pro Feature-Typ (Tools, Ressourcen oder Prompts). Zum Beispiel haben Tools dann nur zwei Funktionen wie folgt:

- Auflisten aller Tools. Eine Funktion ist für alle Versuche verantwortlich, Tools aufzulisten.
- Aufrufen aller Tools behandeln. Auch hier gibt es nur eine Funktion, die Anrufe an ein Tool bearbeitet.

Das klingt nach potenziell weniger Arbeit, oder? Also anstatt ein Tool zu registrieren, muss ich nur sicherstellen, dass das Tool bei einer Auflistung aller Tools aufgeführt wird und dass es aufgerufen wird, wenn eine eingehende Anfrage einen Tool-Aufruf fordert. 

Werfen wir einen Blick darauf, wie der Code jetzt aussieht:

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

Hier haben wir nun eine Funktion, die eine Liste von Features zurückgibt. Jeder Eintrag in der Tool-Liste hat jetzt Felder wie `name`, `description` und `inputSchema`, um dem Rückgabetyp zu entsprechen. Dies ermöglicht es uns, unsere Tools und Feature-Definitionen anderswo zu platzieren. Wir können jetzt alle unsere Tools in einem Tools-Ordner erstellen, und das Gleiche gilt für alle Ihre Features, so dass Ihr Projekt plötzlich so organisiert sein kann:

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

Das ist großartig, unsere Architektur kann ziemlich sauber gestaltet werden.

Und wie ist es mit dem Aufrufen von Tools, ist das dann die gleiche Idee, ein Handler, um ein Tool aufzurufen, egal welches Tool? Ja, genau, hier ist der Code dafür:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ist ein Wörterbuch mit Werkzeugnamen als Schlüsseln
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
    // TODO rufe das Tool auf,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Wie Sie im obigen Code sehen, müssen wir das aufzurufende Tool und dessen Argumente parsen und dann mit dem Aufruf des Tools fortfahren.

## Verbesserung des Ansatzes mit Validierung

Bis jetzt haben Sie gesehen, wie all Ihre Registrierung zum Hinzufügen von Tools, Ressourcen und Prompts durch diese zwei Handler pro Feature-Typ ersetzt werden können. Was müssen wir sonst noch tun? Nun, wir sollten eine Form der Validierung hinzufügen, um sicherzustellen, dass das Tool mit den richtigen Argumenten aufgerufen wird. Jede Laufzeitumgebung hat dafür ihre eigene Lösung, zum Beispiel verwendet Python Pydantic und TypeScript nutzt Zod. Die Idee ist, dass wir Folgendes tun:

- Die Logik zur Erstellung eines Features (Tool, Ressource oder Prompt) in dessen eigenen Ordner verschieben.
- Eine Möglichkeit hinzufügen, eine eingehende Anfrage zu validieren, die zum Beispiel das Aufrufen eines Tools fordert.

### Ein Feature erstellen

Um ein Feature zu erstellen, müssen wir eine Datei für dieses Feature anlegen und sicherstellen, dass sie die obligatorischen Felder enthält, die dieses Feature erfordert. Welche Felder unterschiedlich zwischen Tools, Ressourcen und Prompts sind.

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

    # TODO: Pydantic hinzufügen, damit wir ein AddInputModel erstellen und die Argumente validieren können

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Hier sehen Sie, wie wir Folgendes tun:

- Ein Schema mit Pydantic `AddInputModel` mit den Feldern `a` und `b` in der Datei *schema.py* erstellen.
- Versuchen, die eingehende Anfrage als Typ `AddInputModel` zu parsen; wenn es eine Parameterabweichung gibt, stürzt dies ab:

   ```python
   # add.py
    try:
        # Eingaben mit Pydantic-Modell validieren
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Sie können wählen, ob Sie diese Parsing-Logik im eigentlichen Tool-Aufruf oder in der Handler-Funktion unterbringen.

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

- Im Handler, der alle Tool-Aufrufe verarbeitet, versuchen wir nun, die eingehende Anfrage in das vom Tool definierte Schema zu parsen:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    Wenn das funktioniert, fahren wir fort, das eigentliche Tool aufzurufen:

    ```typescript
    const result = await tool.callback(input);
    ```

Wie Sie sehen, schafft dieser Ansatz eine großartige Architektur, da alles seinen Platz hat. Die *server.ts* ist eine sehr kleine Datei, die nur die Request-Handler verbindet, und jedes Feature befindet sich in dem entsprechenden Ordner, also tools/, resources/ oder /prompts.

Großartig, versuchen wir als Nächstes, dies zu bauen. 

## Übung: Einen Low-Level-Server erstellen

In dieser Übung werden wir Folgendes tun:

1. Einen Low-Level-Server erstellen, der das Auflisten und Aufrufen von Tools handhabt.
1. Eine Architektur implementieren, auf der Sie aufbauen können.
1. Eine Validierung hinzufügen, um sicherzustellen, dass Ihre Tool-Aufrufe korrekt validiert werden.

### -1- Eine Architektur erstellen

Das Erste, was wir angehen müssen, ist eine Architektur, die uns beim Skalieren hilft, wenn wir mehr Features hinzufügen, so sieht sie aus:

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

Jetzt haben wir eine Architektur eingerichtet, die gewährleistet, dass wir leicht neue Tools in einem Tools-Ordner hinzufügen können. Sie können gerne ähnlich Subverzeichnisse für Ressourcen und Prompts anlegen.

### -2- Ein Tool erstellen

Sehen wir uns als Nächstes an, wie man ein Tool erstellt. Zuerst muss es in seinem *tool*-Unterverzeichnis so erstellt werden:

**Python**

```python
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

Hier sehen wir, wie wir Name, Beschreibung und Eingabeschema mit Pydantic definieren und einen Handler, der aufgerufen wird, wenn dieses Tool verwendet wird. Schließlich exposen wir `tool_add`, ein Dictionary, das all diese Eigenschaften hält.

Es gibt auch *schema.py*, das das Eingabeschema definiert, das von unserem Tool verwendet wird:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Wir müssen auch *__init__.py* füllen, um sicherzustellen, dass das Tools-Verzeichnis als Modul behandelt wird. Zusätzlich müssen wir die darin enthaltenen Module wie folgt exposen:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Wir können diese Datei weiter ergänzen, wenn wir mehr Tools hinzufügen.

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

Hier erstellen wir ein Dictionary bestehend aus Eigenschaften:

- name: Der Name des Tools.
- rawSchema: Das Zod-Schema, es wird verwendet, um eingehende Anfragen zum Aufruf dieses Tools zu validieren.
- inputSchema: Dieses Schema wird vom Handler verwendet.
- callback: Wird genutzt, um das Tool aufzurufen.

Es gibt auch `Tool`, das verwendet wird, um dieses Dictionary in einen Typ umzuwandeln, den der MCP-Server-Handler akzeptieren kann, und es sieht so aus:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Und es gibt *schema.ts*, wo wir die Eingabeschemas für jedes Tool speichern, das derzeit nur ein Schema hat, aber während wir Tools hinzufügen, können wir weitere Einträge hinzufügen:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Großartig, machen wir als Nächstes mit dem Handling der Tool-Auflistung weiter.

### -3- Tool-Auflistung handhaben

Um die Auflistung unserer Tools zu verarbeiten, müssen wir einen Request-Handler dafür einrichten. Das hier müssen wir zu unserer Server-Datei hinzufügen:

**Python**

```python
# Code aus Platzgründen ausgelassen
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

Hier fügen wir den Dekorator `@server.list_tools` und die implementierende Funktion `handle_list_tools` hinzu. Letztere muss eine Liste von Tools erzeugen. Beachten Sie, dass jedes Tool einen Namen, eine Beschreibung und ein Eingabeschema haben muss.   

**TypeScript**

Um den Request-Handler für das Auflisten von Tools einzurichten, müssen wir `setRequestHandler` am Server mit einem Schema aufrufen, das zu dem passt, was wir tun wollen, in diesem Fall `ListToolsRequestSchema`. 

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

Super, jetzt haben wir den Teil des Auflistens von Tools gelöst. Schauen wir uns als Nächstes an, wie wir Tools aufrufen können.

### -4- Einen Tool-Aufruf handhaben

Um ein Tool aufzurufen, müssen wir einen weiteren Request-Handler einrichten, der sich darauf konzentriert zu verarbeiten, welche Funktion aufgerufen werden soll und mit welchen Argumenten.

**Python**

Verwenden wir den Dekorator `@server.call_tool` und implementieren ihn mit einer Funktion wie `handle_call_tool`. Innerhalb dieser Funktion müssen wir den Toolnamen, dessen Argumente parsen und sicherstellen, dass die Argumente für das Tool gültig sind. Wir können die Argumente entweder in dieser Funktion oder downstream im eigentlichen Tool validieren.

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

Folgendes passiert hier:

- Unser Tool-Name ist bereits als Eingabeparameter `name` vorhanden, was auch für unsere Argumente in Form des Dictionaries `arguments` gilt.

- Das Tool wird mit `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` aufgerufen. Die Validierung der Argumente erfolgt in der Eigenschaft `handler`, die auf eine Funktion zeigt; wenn das fehlschlägt, wird eine Ausnahme ausgelöst.

Da haben wir es, nun verstehen wir voll und ganz, wie das Auflisten und Aufrufen von Tools mit einem Low-Level-Server funktioniert.

Siehe das [vollständige Beispiel](./code/README.md) hier

## Aufgabe

Erweitern Sie den bereitgestellten Code mit einer Reihe von Tools, Ressourcen und Prompts und reflektieren Sie darüber, wie Sie bemerken, dass Sie nur Dateien im Tools-Verzeichnis hinzufügen müssen und sonst nirgendwo.

*Keine Lösung vorhanden*

## Zusammenfassung

In diesem Kapitel haben wir gesehen, wie der Low-Level-Server-Ansatz funktioniert und wie das uns hilft, eine schöne Architektur zu schaffen, auf der wir weiter aufbauen können. Wir haben auch Validierung besprochen und Ihnen gezeigt, wie Sie mit Validierungsbibliotheken arbeiten können, um Schemas für die Eingabevalidierung zu erstellen.

## Was kommt als Nächstes

- Nächstes: [Einfache Authentifizierung](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, können automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Für kritische Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die durch die Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->