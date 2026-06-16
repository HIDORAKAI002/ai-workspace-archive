# Erstellen eines Clients mit LLM

Bisher haben Sie gesehen, wie man einen Server und einen Client erstellt. Der Client konnte den Server explizit aufrufen, um dessen Werkzeuge, Ressourcen und Aufforderungen aufzulisten. Das ist jedoch kein besonders praktischer Ansatz. Ihre Benutzer leben in der agentischen Ära und erwarten, Aufforderungen zu verwenden und mit einem LLM zu kommunizieren. Sie kümmern sich nicht darum, ob Sie MCP verwenden, um Ihre Fähigkeiten zu speichern; sie erwarten einfach, in natürlicher Sprache zu interagieren. Wie lösen wir das? Die Lösung besteht darin, dem Client ein LLM hinzuzufügen.

## Überblick

In dieser Lektion konzentrieren wir uns darauf, dem Client ein LLM hinzuzufügen und zeigen, wie dies ein viel besseres Erlebnis für den Benutzer bietet.

## Lernziele

Am Ende dieser Lektion werden Sie in der Lage sein:

- Einen Client mit einem LLM zu erstellen.
- Nahtlos mit einem MCP-Server unter Verwendung eines LLM zu interagieren.
- Eine bessere Benutzererfahrung auf der Client-Seite zu bieten.

## Vorgehensweise

Lassen Sie uns den Ansatz verstehen, den wir verfolgen müssen. Ein LLM hinzuzufügen klingt einfach, aber tun wir das wirklich?

So wird der Client mit dem Server interagieren:

1. Verbindung mit dem Server herstellen.

1. Fähigkeiten, Aufforderungen, Ressourcen und Werkzeuge auflisten und deren Schema speichern.

1. Ein LLM hinzufügen und die gespeicherten Fähigkeiten und deren Schema in einem Format übergeben, das das LLM versteht.

1. Eine Benutzeraufforderung verarbeiten, indem sie dem LLM zusammen mit den vom Client aufgelisteten Werkzeugen übergeben wird.

Super, jetzt verstehen wir auf hoher Ebene, wie wir das machen können, versuchen wir es im folgenden Übungsteil.

## Übung: Einen Client mit einem LLM erstellen

In dieser Übung lernen wir, ein LLM zu unserem Client hinzuzufügen.

### Authentifizierung mit GitHub Personal Access Token

Die Erstellung eines GitHub-Tokens ist ein einfacher Prozess. So geht’s:

- Gehen Sie zu GitHub-Einstellungen – Klicken Sie auf Ihr Profilbild in der oberen rechten Ecke und wählen Sie Einstellungen.
- Navigieren Sie zu Entwickler-Einstellungen – Scrollen Sie nach unten und klicken Sie auf Entwickler-Einstellungen.
- Wählen Sie Personal Access Tokens – Klicken Sie auf Fine-grained tokens und dann auf Generate new token.
- Konfigurieren Sie Ihr Token – Fügen Sie eine Notiz als Referenz hinzu, legen Sie ein Ablaufdatum fest und wählen Sie die erforderlichen Bereiche (Berechtigungen) aus. Fügen Sie in diesem Fall unbedingt die Berechtigung Models hinzu.
- Erzeugen und kopieren Sie das Token – Klicken Sie auf Generate token und kopieren Sie es direkt, da Sie es später nicht mehr sehen können.

### -1- Verbindung zum Server herstellen

Erstellen wir zuerst unseren Client:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Importiere zod für die Schema-Validierung

class MCPClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", 
            apiKey: process.env.GITHUB_TOKEN,
        });

        this.client = new Client(
            {
                name: "example-client",
                version: "1.0.0"
            },
            {
                capabilities: {
                prompts: {},
                resources: {},
                tools: {}
                }
            }
            );    
    }
}
```

Im vorangehenden Code haben wir:

- Die nötigen Bibliotheken importiert
- Eine Klasse mit zwei Mitgliedern `client` und `openai` erstellt, die uns helfen, einen Client zu verwalten und mit einem LLM zu interagieren
- Unsere LLM-Instanz so konfiguriert, dass GitHub-Modelle verwendet werden, indem `baseUrl` auf die Inference-API verweist

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# Erstelle Serverparameter für die stdio-Verbindung
server_params = StdioServerParameters(
    command="mcp",  # Ausführbare Datei
    args=["run", "server.py"],  # Optionale Befehlszeilenargumente
    env=None,  # Optionale Umgebungsvariablen
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # Initialisiere die Verbindung
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

Im vorangehenden Code haben wir:

- Die benötigten MCP-Bibliotheken importiert
- Einen Client erstellt

#### .NET

```csharp
using Azure;
using Azure.AI.Inference;
using Azure.Identity;
using System.Text.Json;
using ModelContextProtocol.Client;
using System.Text.Json;

var clientTransport = new StdioClientTransport(new()
{
    Name = "Demo Server",
    Command = "/workspaces/mcp-for-beginners/03-GettingStarted/02-client/solution/server/bin/Debug/net8.0/server",
    Arguments = [],
});

await using var mcpClient = await McpClient.CreateAsync(clientTransport);
```

#### Java

Zuerst müssen Sie die LangChain4j-Abhängigkeiten zu Ihrer `pom.xml` hinzufügen. Fügen Sie diese Abhängigkeiten hinzu, um die MCP-Integration und GitHub Models Unterstützung zu ermöglichen:

```xml
<properties>
    <langchain4j.version>1.0.0-beta3</langchain4j.version>
</properties>

<dependencies>
    <!-- LangChain4j MCP Integration -->
    <dependency>
        <groupId>dev.langchain4j</groupId>
        <artifactId>langchain4j-mcp</artifactId>
        <version>${langchain4j.version}</version>
    </dependency>
    
    <!-- OpenAI Official API Client -->
    <dependency>
        <groupId>dev.langchain4j</groupId>
        <artifactId>langchain4j-open-ai-official</artifactId>
        <version>${langchain4j.version}</version>
    </dependency>
    
    <!-- GitHub Models Support -->
    <dependency>
        <groupId>dev.langchain4j</groupId>
        <artifactId>langchain4j-github-models</artifactId>
        <version>${langchain4j.version}</version>
    </dependency>
    
    <!-- Spring Boot Starter (optional, for production apps) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
</dependencies>
```

Dann erstellen Sie Ihre Java-Client-Klasse:

```java
import dev.langchain4j.mcp.McpToolProvider;
import dev.langchain4j.mcp.client.DefaultMcpClient;
import dev.langchain4j.mcp.client.McpClient;
import dev.langchain4j.mcp.client.transport.McpTransport;
import dev.langchain4j.mcp.client.transport.http.HttpMcpTransport;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.openaiofficial.OpenAiOfficialChatModel;
import dev.langchain4j.service.AiServices;
import dev.langchain4j.service.tool.ToolProvider;

import java.time.Duration;
import java.util.List;

public class LangChain4jClient {
    
    public static void main(String[] args) throws Exception {        // Konfigurieren Sie das LLM zur Verwendung von GitHub-Modellen
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // Erstellen Sie den MCP-Transport für die Verbindung zum Server
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // MCP-Client erstellen
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

Im vorangehenden Code haben wir:

- **LangChain4j-Abhängigkeiten hinzugefügt**: Erforderlich für MCP-Integration, offiziellen OpenAI-Client und GitHub Models Unterstützung
- **Die LangChain4j-Bibliotheken importiert**: Für MCP-Integration und OpenAI Chatmodell-Funktionalität
- **Ein `ChatLanguageModel` erstellt**: Konfiguriert, um GitHub Models mit Ihrem GitHub-Token zu verwenden
- **HTTP-Transport eingerichtet**: Verwendung von Server-Sent Events (SSE) zur Verbindung mit dem MCP-Server
- **Einen MCP-Client erstellt**: Der die Kommunikation mit dem Server übernimmt
- **LangChain4js integrierte MCP-Unterstützung genutzt**: Das vereinfacht die Integration zwischen LLMs und MCP-Servern

#### Rust

Dieses Beispiel setzt voraus, dass Sie einen Rust-basierten MCP-Server betreiben. Wenn Sie keinen haben, sehen Sie sich die Lektion [01-first-server](../01-first-server/README.md) an, um den Server zu erstellen.

Nachdem Sie Ihren Rust MCP-Server haben, öffnen Sie ein Terminal und navigieren zum gleichen Verzeichnis wie der Server. Führen Sie dann folgenden Befehl aus, um ein neues LLM-Client-Projekt zu erstellen:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

Fügen Sie Ihrem `Cargo.toml` folgende Abhängigkeiten hinzu:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> Es gibt keine offizielle Rust-Bibliothek für OpenAI, aber die Crate `async-openai` ist eine [gemeinschaftlich gepflegte Bibliothek](https://platform.openai.com/docs/libraries/rust#rust), die häufig verwendet wird.

Öffnen Sie die Datei `src/main.rs` und ersetzen Sie deren Inhalt durch den folgenden Code:

```rust
use async_openai::{Client, config::OpenAIConfig};
use rmcp::{
    RmcpError,
    model::{CallToolRequestParam, ListToolsResult},
    service::{RoleClient, RunningService, ServiceExt},
    transport::{ConfigureCommandExt, TokioChildProcess},
};
use serde_json::{Value, json};
use std::error::Error;
use tokio::process::Command;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    // Anfangsnachricht
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // OpenAI-Client einrichten
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // MCP-Client einrichten
    let server_dir = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .unwrap()
        .join("calculator-server");

    let mcp_client = ()
        .serve(
            TokioChildProcess::new(Command::new("cargo").configure(|cmd| {
                cmd.arg("run").current_dir(server_dir);
            }))
            .map_err(RmcpError::transport_creation::<TokioChildProcess>)?,
        )
        .await?;

    // TODO: MCP-Werkzeugliste abrufen

    // TODO: LLM-Gespräch mit Werkzeugaufrufen

    Ok(())
}
```

Dieser Code richtet eine einfache Rust-Anwendung ein, die eine Verbindung zu einem MCP-Server und GitHub Models für LLM-Interaktionen herstellt.

> [!IMPORTANT]
> Stellen Sie sicher, dass Sie vor dem Ausführen der Anwendung die Umgebungsvariable `OPENAI_API_KEY` mit Ihrem GitHub-Token setzen.

Super, im nächsten Schritt listen wir die Fähigkeiten des Servers auf.

### -2- Serverfähigkeiten auflisten

Jetzt verbinden wir uns mit dem Server und fragen seine Fähigkeiten ab:

#### Typescript

Fügen Sie in derselben Klasse die folgenden Methoden hinzu:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // Auflistung von Werkzeugen
    const toolsResult = await this.client.listTools();
}
```

Im vorangehenden Code haben wir:

- Den Code zum Verbinden mit dem Server, `connectToServer`, hinzugefügt.
- Eine `run`-Methode erstellt, die den Ablauf unserer App steuert. Bisher listet sie nur die Werkzeuge auf, aber bald fügen wir mehr hinzu.

#### Python

```python
# Verfügbare Ressourcen auflisten
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# Verfügbare Werkzeuge auflisten
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

Folgendes haben wir hinzugefügt:

- Auflistung von Ressourcen und Werkzeugen und Ausgabe dieser. Für Werkzeuge listen wir auch das `inputSchema` auf, das wir später verwenden.

#### .NET

```csharp
async Task<List<ChatCompletionsToolDefinition>> GetMcpTools()
{
    Console.WriteLine("Listing tools");
    var tools = await mcpClient.ListToolsAsync();

    List<ChatCompletionsToolDefinition> toolDefinitions = new List<ChatCompletionsToolDefinition>();

    foreach (var tool in tools)
    {
        Console.WriteLine($"Connected to server with tools: {tool.Name}");
        Console.WriteLine($"Tool description: {tool.Description}");
        Console.WriteLine($"Tool parameters: {tool.JsonSchema}");

        // TODO: convert tool definition from MCP tool to LLm tool     
    }

    return toolDefinitions;
}
```

Im vorangehenden Code haben wir:

- Die auf dem MCP Server verfügbaren Werkzeuge aufgelistet
- Für jedes Werkzeug Name, Beschreibung und dessen Schema aufgelistet. Letzteres werden wir bald zur Werkzeugaufruf verwenden.

#### Java

```java
// Erstellen Sie einen Tool-Anbieter, der MCP-Tools automatisch erkennt
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// Der MCP-Tool-Anbieter übernimmt automatisch:
// - Auflisten verfügbarer Tools vom MCP-Server
// - Konvertieren von MCP-Tool-Schemata ins LangChain4j-Format
// - Verwaltung der Tool-Ausführung und -Antworten
```

Im vorangehenden Code haben wir:

- Einen `McpToolProvider` erstellt, der automatisch alle Werkzeuge vom MCP-Server entdeckt und registriert
- Der Tool-Provider übernimmt intern die Konvertierung zwischen MCP-Werkzeugschemata und dem LangChain4j-Werkzeugformat
- Dieser Ansatz abstrahiert die manuelle Werkzeugauflistung und Konvertierung

#### Rust

Das Abrufen von Werkzeugen vom MCP-Server erfolgt mit der Methode `list_tools`. Fügen Sie in Ihrer `main`-Funktion nach der Einrichtung des MCP-Clients folgenden Code hinzu:

```rust
// MCP Werkzeugliste abrufen
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- Serverfähigkeiten in LLM-Werkzeuge umwandeln

Der nächste Schritt nach der Auflistung der Serverfähigkeiten ist, diese in ein Format umzuwandeln, das das LLM versteht. Sobald wir das gemacht haben, können wir diese Fähigkeiten als Werkzeuge unserem LLM bereitstellen.

#### TypeScript

1. Fügen Sie folgenden Code hinzu, um die Antwort vom MCP-Server in ein Werkzeugformat zu konvertieren, das das LLM verwenden kann:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // Erstellen Sie ein Zod-Schema basierend auf dem input_schema
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // Typ explizit auf "Funktion" setzen
            function: {
            name: tool.name,
            description: tool.description,
            parameters: {
            type: "object",
            properties: tool.input_schema.properties,
            required: tool.input_schema.required,
            },
            },
        };
    }

    ```

    Der obige Code nimmt eine Antwort vom MCP-Server und wandelt sie in ein Werkzeugdefinitionsformat um, das das LLM versteht.

2. Aktualisieren wir als nächstes die `run`-Methode, um die Serverfähigkeiten aufzulisten:

    ```typescript
    async run() {
        console.log("Asking server for available tools");
        const toolsResult = await this.client.listTools();
        const tools = toolsResult.tools.map((tool) => {
            return this.openAiToolAdapter({
            name: tool.name,
            description: tool.description,
            input_schema: tool.inputSchema,
            });
        });
    }
    ```

    Im vorangehenden Code haben wir die `run`-Methode aktualisiert, um das Ergebnis zu durchlaufen und für jeden Eintrag `openAiToolAdapter` aufzurufen.

#### Python

1. Erstellen wir zunächst folgende Konverterfunktion

    ```python
    def convert_to_llm_tool(tool):
        tool_schema = {
            "type": "function",
            "function": {
                "name": tool.name,
                "description": tool.description,
                "type": "function",
                "parameters": {
                    "type": "object",
                    "properties": tool.inputSchema["properties"]
                }
            }
        }

        return tool_schema
    ```

    In der Funktion `convert_to_llm_tools` oben nehmen wir eine MCP-Werkzeugantwort und wandeln sie in ein Format um, das das LLM versteht.

2. Aktualisieren wir jetzt unseren Client-Code, um diese Funktion zu nutzen:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    Hier fügen wir einen Aufruf von `convert_to_llm_tool` hinzu, um die MCP-Werkzeugantwort in etwas zu konvertieren, das wir später dem LLM übergeben können.

#### .NET

1. Fügen wir Code hinzu, um die MCP-Werkzeugantwort in etwas umzuwandeln, das das LLM versteht:

```csharp
ChatCompletionsToolDefinition ConvertFrom(string name, string description, JsonElement jsonElement)
{ 
    // convert the tool to a function definition
    FunctionDefinition functionDefinition = new FunctionDefinition(name)
    {
        Description = description,
        Parameters = BinaryData.FromObjectAsJson(new
        {
            Type = "object",
            Properties = jsonElement
        },
        new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase })
    };

    // create a tool definition
    ChatCompletionsToolDefinition toolDefinition = new ChatCompletionsToolDefinition(functionDefinition);
    return toolDefinition;
}
```

Im vorangehenden Code haben wir:

- Eine Funktion `ConvertFrom` erstellt, die Namen, Beschreibung und Eingabeschema entgegennimmt.
- Funktionalität definiert, die ein `FunctionDefinition` erzeugt, das einem `ChatCompletionsDefinition` übergeben wird. Letzteres versteht das LLM.

2. Sehen wir uns an, wie wir vorhandenen Code aktualisieren können, um diese Funktion zu nutzen:

    ```csharp
    async Task<List<ChatCompletionsToolDefinition>> GetMcpTools()
    {
        Console.WriteLine("Listing tools");
        var tools = await mcpClient.ListToolsAsync();

        List<ChatCompletionsToolDefinition> toolDefinitions = new List<ChatCompletionsToolDefinition>();

        foreach (var tool in tools)
        {
            Console.WriteLine($"Connected to server with tools: {tool.Name}");
            Console.WriteLine($"Tool description: {tool.Description}");
            Console.WriteLine($"Tool parameters: {tool.JsonSchema}");

            JsonElement propertiesElement;
            tool.JsonSchema.TryGetProperty("properties", out propertiesElement);

            var def = ConvertFrom(tool.Name, tool.Description, propertiesElement);
            Console.WriteLine($"Tool definition: {def}");
            toolDefinitions.Add(def);

            Console.WriteLine($"Properties: {propertiesElement}");        
        }

        return toolDefinitions;
    }
    ```    In the preceding code, we've:

    - Update the function to convert the MCP tool response to an LLm tool. Let's highlight the code we added:

        ```csharp
        JsonElement propertiesElement;
        tool.JsonSchema.TryGetProperty("properties", out propertiesElement);

        var def = ConvertFrom(tool.Name, tool.Description, propertiesElement);
        Console.WriteLine($"Tool definition: {def}");
        toolDefinitions.Add(def);
        ```

        The input schema is part of the tool response but on the "properties" attribute, so we need to extract. Furthermore, we now call `ConvertFrom` with the tool details. Now we've done the heavy lifting, let's see how it call comes together as we handle a user prompt next.


#### Java

```java
// Erstellen Sie eine Bot-Schnittstelle für die Interaktion in natürlicher Sprache
public interface Bot {
    String chat(String prompt);
}

// Konfigurieren Sie den KI-Dienst mit LLM- und MCP-Tools
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

Im vorangehenden Code haben wir:

- Ein einfaches `Bot`-Interface für natürliche Sprachinteraktion definiert
- LangChain4js `AiServices` verwendet, um das LLM automatisch mit dem MCP-Tool-Provider zu verbinden
- Das Framework übernimmt automatisch Werkzeugschemakonvertierung und Funktionsaufrufe im Hintergrund
- Dieser Ansatz eliminiert manuelle Werkzeugkonvertierung – LangChain4j kümmert sich um die ganze Komplexität der Konvertierung von MCP-Werkzeugen in ein LLM-kompatibles Format

#### Rust

Um die MCP-Werkzeugantwort in ein Format umzuwandeln, das das LLM versteht, fügen wir eine Hilfsfunktion hinzu, die die Werkzeugauflistung formatiert. Fügen Sie folgenden Code unterhalb der `main`-Funktion in Ihrer `main.rs` Datei hinzu. Diese wird beim Aufruf des LLM verwendet:

```rust
async fn format_tools(tools: &ListToolsResult) -> Result<Vec<Value>, Box<dyn Error>> {
    let tools_json = serde_json::to_value(tools)?;
    let Some(tools_array) = tools_json.get("tools").and_then(|t| t.as_array()) else {
        return Ok(vec![]);
    };

    let formatted_tools = tools_array
        .iter()
        .filter_map(|tool| {
            let name = tool.get("name")?.as_str()?;
            let description = tool.get("description")?.as_str()?;
            let schema = tool.get("inputSchema")?;

            Some(json!({
                "type": "function",
                "function": {
                    "name": name,
                    "description": description,
                    "parameters": {
                        "type": "object",
                        "properties": schema.get("properties").unwrap_or(&json!({})),
                        "required": schema.get("required").unwrap_or(&json!([]))
                    }
                }
            }))
        })
        .collect();

    Ok(formatted_tools)
}
```

Super, wir sind bereit, Benutzeranfragen zu verarbeiten – widmen wir uns nun diesem Schritt.

### -4- Benutzeraufforderung verarbeiten

In diesem Teil des Codes verarbeiten wir Benutzeranfragen.

#### TypeScript

1. Fügen Sie eine Methode hinzu, die unseren LLM aufrufen wird:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. Rufen Sie das Werkzeug des Servers auf
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Machen Sie etwas mit dem Ergebnis
        // TODO

        }
    }
    ```

    Im vorangehenden Code haben wir:

    - Eine Methode `callTools` hinzugefügt.
    - Die Methode nimmt eine LLM-Antwort und prüft, welche Werkzeuge aufgerufen wurden, falls welche:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // Werkzeug aufrufen
        }
        ```

    - Ruft ein Werkzeug auf, wenn das LLM zeigt, dass es aufgerufen werden soll:

        ```typescript
        // 2. Rufen Sie das Werkzeug des Servers auf
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Machen Sie etwas mit dem Ergebnis
        // TODO
        ```

2. Aktualisieren Sie die `run`-Methode, um ebenso den LLM aufzurufen und `callTools` zu verwenden:

    ```typescript

    // 1. Erstellen Sie Nachrichten, die Eingaben für das LLM sind
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. Aufrufen des LLM
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. Durchgehen der LLM-Antwort, für jede Auswahl prüfen, ob Werkzeugaufrufe enthalten sind
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

Super, hier ist der vollständige Code:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Importiere zod für Schema-Validierung

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // könnte in Zukunft auf diese URL geändert werden müssen: https://models.github.ai/inference
            apiKey: process.env.GITHUB_TOKEN,
        });

        this.client = new Client(
            {
                name: "example-client",
                version: "1.0.0"
            },
            {
                capabilities: {
                prompts: {},
                resources: {},
                tools: {}
                }
            }
            );    
    }

    async connectToServer(transport: Transport) {
        await this.client.connect(transport);
        this.run();
        console.error("MCPClient started on stdin/stdout");
    }

    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
          }) {
          // Erstelle ein zod-Schema basierend auf dem input_schema
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // Typ explizit auf "function" setzen
            function: {
              name: tool.name,
              description: tool.description,
              parameters: {
              type: "object",
              properties: tool.input_schema.properties,
              required: tool.input_schema.required,
              },
            },
          };
    }
    
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
      ) {
        for (const tool_call of tool_calls) {
          const toolName = tool_call.function.name;
          const args = tool_call.function.arguments;
    
          console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);
    
    
          // 2. Rufe das Werkzeug des Servers auf
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. Etwas mit dem Ergebnis machen
          // TODO
    
         }
    }

    async run() {
        console.log("Asking server for available tools");
        const toolsResult = await this.client.listTools();
        const tools = toolsResult.tools.map((tool) => {
            return this.openAiToolAdapter({
              name: tool.name,
              description: tool.description,
              input_schema: tool.inputSchema,
            });
        });

        const prompt = "What is the sum of 2 and 3?";
    
        const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

        console.log("Querying LLM: ", messages[0].content);
        let response = this.openai.chat.completions.create({
            model: "gpt-4.1-mini",
            max_tokens: 1000,
            messages,
            tools: tools,
        });    

        let results: any[] = [];
    
        // 3. Gehe durch die LLM-Antwort, überprüfe für jede Wahl, ob sie Werkzeugaufrufe enthält
        (await response).choices.map(async (choice: { message: any; }) => {
          const message = choice.message;
          if (message.tool_calls) {
              console.log("Making tool call")
              await this.callTools(message.tool_calls, results);
          }
        });
    }
    
}

let client = new MyClient();
 const transport = new StdioClientTransport({
            command: "node",
            args: ["./build/index.js"]
        });

client.connectToServer(transport);
```

#### Python

1. Fügen wir einige Importe hinzu, die zum Aufrufen eines LLM nötig sind:

    ```python
    # llm
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. Dann fügen wir die Funktion hinzu, die den LLM aufrufen wird:

    ```python
    # LLM

    def call_llm(prompt, functions):
        token = os.environ["GITHUB_TOKEN"]
        endpoint = "https://models.inference.ai.azure.com"

        model_name = "gpt-4o"

        client = ChatCompletionsClient(
            endpoint=endpoint,
            credential=AzureKeyCredential(token),
        )

        print("CALLING LLM")
        response = client.complete(
            messages=[
                {
                "role": "system",
                "content": "You are a helpful assistant.",
                },
                {
                "role": "user",
                "content": prompt,
                },
            ],
            model=model_name,
            tools = functions,
            # Optionale Parameter
            temperature=1.,
            max_tokens=1000,
            top_p=1.    
        )

        response_message = response.choices[0].message
        
        functions_to_call = []

        if response_message.tool_calls:
            for tool_call in response_message.tool_calls:
                print("TOOL: ", tool_call)
                name = tool_call.function.name
                args = json.loads(tool_call.function.arguments)
                functions_to_call.append({ "name": name, "args": args })

        return functions_to_call
    ```

Im vorangehenden Code haben wir:

- Unsere Funktionen, die wir auf dem MCP-Server gefunden und konvertiert haben, an das LLM übergeben.
- Das LLM mit diesen Funktionen aufgerufen.
- Das Ergebnis untersucht, um zu sehen, welche Funktionen aufgerufen werden sollen.
- Schließlich ein Array von Funktionen zum Aufruf weitergereicht.

3. Zuletzt aktualisieren wir unseren Hauptcode:

    ```python
    prompt = "Add 2 to 20"

    # frage das LLM, welche Werkzeuge es hat, falls vorhanden
    functions_to_call = call_llm(prompt, functions)

    # rufe vorgeschlagene Funktionen auf
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

Das war der letzte Schritt, im obigen Code:

- Rufen wir ein MCP-Werkzeug mit `call_tool` auf, basierend auf einer Funktion, die das LLM aufgrund unserer Aufforderung als notwendig ansieht.
- Geben wir das Ergebnis des Werkzeugaufrufs an den MCP Server aus.

#### .NET

1. Hier ein Codebeispiel für einen LLM-Prompt-Aufruf:

    ```csharp
    var tools = await GetMcpTools();

    for (int i = 0; i < tools.Count; i++)
    {
        var tool = tools[i];
        Console.WriteLine($"MCP Tools def: {i}: {tool}");
    }

    // 0. Define the chat history and the user message
    var userMessage = "add 2 and 4";

    chatHistory.Add(new ChatRequestUserMessage(userMessage));

    // 1. Define tools
    ChatCompletionsToolDefinition def = CreateToolDefinition();


    // 2. Define options, including the tools
    var options = new ChatCompletionsOptions(chatHistory)
    {
        Model = "gpt-4.1-mini",
        Tools = { tools[0] }
    };

    // 3. Call the model  

    ChatCompletions? response = await client.CompleteAsync(options);
    var content = response.Content;

    ```

Im vorangehenden Code haben wir:

- Werkzeuge vom MCP-Server abgerufen, `var tools = await GetMcpTools()`.
- Einen Benutzer-Prompt definiert `userMessage`.
- Ein Optionsobjekt mit Modell und Werkzeugen erstellt.
- Eine Anfrage an das LLM gestellt.

2. Ein letzter Schritt, schauen wir, ob das LLM denkt, dass eine Funktion aufgerufen werden soll:

    ```csharp
    // 4. Check if the response contains a function call
    ChatCompletionsToolCall? calls = response.ToolCalls.FirstOrDefault();
    for (int i = 0; i < response.ToolCalls.Count; i++)
    {
        var call = response.ToolCalls[i];
        Console.WriteLine($"Tool call {i}: {call.Name} with arguments {call.Arguments}");
        //Tool call 0: add with arguments {"a":2,"b":4}

        var dict = JsonSerializer.Deserialize<Dictionary<string, object>>(call.Arguments);
        var result = await mcpClient.CallToolAsync(
            call.Name,
            dict!,
            cancellationToken: CancellationToken.None
        );

        Console.WriteLine(result.Content.First(c => c.Type == "text").Text);

    }
    ```

Im vorangehenden Code haben wir:

- Eine Liste von Funktionsaufrufen durchlaufen.
- Für jeden Werkzeugaufruf Name und Argumente geparst und das Werkzeug über den MCP-Client aufgerufen. Anschließend die Ergebnisse ausgegeben.

Hier der vollständige Code:

```csharp
using Azure;
using Azure.AI.Inference;
using Azure.Identity;
using System.Text.Json;
using ModelContextProtocol.Client;
using ModelContextProtocol.Protocol;

var endpoint = "https://models.inference.ai.azure.com";
var token = Environment.GetEnvironmentVariable("GITHUB_TOKEN"); // Your GitHub Access Token
var client = new ChatCompletionsClient(new Uri(endpoint), new AzureKeyCredential(token));
var chatHistory = new List<ChatRequestMessage>
{
    new ChatRequestSystemMessage("You are a helpful assistant that knows about AI")
};

var clientTransport = new StdioClientTransport(new()
{
    Name = "Demo Server",
    Command = "/workspaces/mcp-for-beginners/03-GettingStarted/02-client/solution/server/bin/Debug/net8.0/server",
    Arguments = [],
});

Console.WriteLine("Setting up stdio transport");

await using var mcpClient = await McpClient.CreateAsync(clientTransport);

ChatCompletionsToolDefinition ConvertFrom(string name, string description, JsonElement jsonElement)
{ 
    // convert the tool to a function definition
    FunctionDefinition functionDefinition = new FunctionDefinition(name)
    {
        Description = description,
        Parameters = BinaryData.FromObjectAsJson(new
        {
            Type = "object",
            Properties = jsonElement
        },
        new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase })
    };

    // create a tool definition
    ChatCompletionsToolDefinition toolDefinition = new ChatCompletionsToolDefinition(functionDefinition);
    return toolDefinition;
}



async Task<List<ChatCompletionsToolDefinition>> GetMcpTools()
{
    Console.WriteLine("Listing tools");
    var tools = await mcpClient.ListToolsAsync();

    List<ChatCompletionsToolDefinition> toolDefinitions = new List<ChatCompletionsToolDefinition>();

    foreach (var tool in tools)
    {
        Console.WriteLine($"Connected to server with tools: {tool.Name}");
        Console.WriteLine($"Tool description: {tool.Description}");
        Console.WriteLine($"Tool parameters: {tool.JsonSchema}");

        JsonElement propertiesElement;
        tool.JsonSchema.TryGetProperty("properties", out propertiesElement);

        var def = ConvertFrom(tool.Name, tool.Description, propertiesElement);
        Console.WriteLine($"Tool definition: {def}");
        toolDefinitions.Add(def);

        Console.WriteLine($"Properties: {propertiesElement}");        
    }

    return toolDefinitions;
}

// 1. List tools on mcp server

var tools = await GetMcpTools();
for (int i = 0; i < tools.Count; i++)
{
    var tool = tools[i];
    Console.WriteLine($"MCP Tools def: {i}: {tool}");
}

// 2. Define the chat history and the user message
var userMessage = "add 2 and 4";

chatHistory.Add(new ChatRequestUserMessage(userMessage));


// 3. Define options, including the tools
var options = new ChatCompletionsOptions(chatHistory)
{
    Model = "gpt-4.1-mini",
    Tools = { tools[0] }
};

// 4. Call the model  

ChatCompletions? response = await client.CompleteAsync(options);
var content = response.Content;

// 5. Check if the response contains a function call
ChatCompletionsToolCall? calls = response.ToolCalls.FirstOrDefault();
for (int i = 0; i < response.ToolCalls.Count; i++)
{
    var call = response.ToolCalls[i];
    Console.WriteLine($"Tool call {i}: {call.Name} with arguments {call.Arguments}");
    //Tool call 0: add with arguments {"a":2,"b":4}

    var dict = JsonSerializer.Deserialize<Dictionary<string, object>>(call.Arguments);
    var result = await mcpClient.CallToolAsync(
        call.Name,
        dict!,
        cancellationToken: CancellationToken.None
    );

    Console.WriteLine(result.Content.OfType<TextContentBlock>().First().Text);

}

// 6. Print the generic response
Console.WriteLine($"Assistant response: {content}");
```

#### Java

```java
try {
    // Führen Sie natürlichsprachliche Anfragen aus, die automatisch MCP-Tools verwenden
    String response = bot.chat("Calculate the sum of 24.5 and 17.3 using the calculator service");
    System.out.println(response);

    response = bot.chat("What's the square root of 144?");
    System.out.println(response);

    response = bot.chat("Show me the help for the calculator service");
    System.out.println(response);
} finally {
    mcpClient.close();
}
```

Im vorangehenden Code haben wir:

- Einfache natürliche Sprachaufforderungen genutzt, um mit den MCP-Server-Werkzeugen zu interagieren
- Das LangChain4j-Framework bearbeitet automatisch:
  - Die Umwandlung von Benutzeraufforderungen in Werkzeugaufrufe bei Bedarf
  - Den Aufruf der passenden MCP-Werkzeuge basierend auf der LLM-Entscheidung
  - Die Steuerung des Gesprächsverlaufs zwischen LLM und MCP-Server
- Die Methode `bot.chat()` liefert natürliche Sprachantworten, die Ergebnisse von MCP-Werkzeugausführungen enthalten können
- Dieser Ansatz bietet ein nahtloses Benutzererlebnis, bei dem Benutzer nichts von der zugrundeliegenden MCP-Implementierung wissen müssen

Gesamtes Codebeispiel:

```java
public class LangChain4jClient {
    
    public static void main(String[] args) throws Exception {        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .timeout(Duration.ofSeconds(60))
                .build();

        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();

        ToolProvider toolProvider = McpToolProvider.builder()
                .mcpClients(List.of(mcpClient))
                .build();

        Bot bot = AiServices.builder(Bot.class)
                .chatLanguageModel(model)
                .toolProvider(toolProvider)
                .build();

        try {
            String response = bot.chat("Calculate the sum of 24.5 and 17.3 using the calculator service");
            System.out.println(response);

            response = bot.chat("What's the square root of 144?");
            System.out.println(response);

            response = bot.chat("Show me the help for the calculator service");
            System.out.println(response);
        } finally {
            mcpClient.close();
        }
    }
}
```

#### Rust

Hier geschieht der Großteil der Arbeit. Wir rufen das LLM mit dem initialen Benutzerprompt auf, verarbeiten die Antwort, um zu sehen, ob Werkzeuge aufgerufen werden müssen. Wenn ja, rufen wir diese Werkzeuge auf und führen das Gespräch mit dem LLM fort, bis keine Werkzeugaufrufe mehr nötig sind und wir eine abschließende Antwort haben.

Wir werden mehrere Aufrufe an das LLM machen, also definieren wir eine Funktion, die den LLM-Aufruf übernimmt. Fügen Sie folgende Funktion in Ihre `main.rs` Datei ein:

```rust
async fn call_llm(
    client: &Client<OpenAIConfig>,
    messages: &[Value],
    tools: &ListToolsResult,
) -> Result<Value, Box<dyn Error>> {
    let response = client
        .completions()
        .create_byot(json!({
            "messages": messages,
            "model": "openai/gpt-4.1",
            "tools": format_tools(tools).await?,
        }))
        .await?;
    Ok(response)
}
```

Diese Funktion nimmt den LLM-Client, eine Liste von Nachrichten (inklusive Benutzerprompt), Werkzeuge vom MCP-Server und sendet eine Anfrage an das LLM, wobei die Antwort zurückgegeben wird.
Die Antwort vom LLM wird ein Array von `choices` enthalten. Wir müssen das Ergebnis verarbeiten, um zu prüfen, ob `tool_calls` vorhanden sind. Dies zeigt uns, dass das LLM angefragt hat, ein bestimmtes Tool mit Argumenten aufzurufen. Fügen Sie den folgenden Code an das Ende Ihrer `main.rs`-Datei hinzu, um eine Funktion zur Verarbeitung der LLM-Antwort zu definieren:

```rust
async fn process_llm_response(
    llm_response: &Value,
    mcp_client: &RunningService<RoleClient, ()>,
    openai_client: &Client<OpenAIConfig>,
    mcp_tools: &ListToolsResult,
    messages: &mut Vec<Value>,
) -> Result<(), Box<dyn Error>> {
    let Some(message) = llm_response
        .get("choices")
        .and_then(|c| c.as_array())
        .and_then(|choices| choices.first())
        .and_then(|choice| choice.get("message"))
    else {
        return Ok(());
    };

    // Inhalt drucken, wenn verfügbar
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // Werkzeugaufrufe behandeln
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // Assistenten-Nachricht hinzufügen

        // Jeden Werkzeugaufruf ausführen
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // Werkzeugergebnis zu Nachrichten hinzufügen
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // Gespräch mit Werkzeugergebnissen fortsetzen
        let response = call_llm(openai_client, messages, mcp_tools).await?;
        Box::pin(process_llm_response(
            &response,
            mcp_client,
            openai_client,
            mcp_tools,
            messages,
        ))
        .await?;
    }
    Ok(())
}
```

Wenn `tool_calls` vorhanden sind, extrahiert es die Tool-Informationen, ruft den MCP-Server mit der Tool-Anfrage auf und fügt die Ergebnisse zu den Konversationsnachrichten hinzu. Anschließend wird die Konversation mit dem LLM fortgesetzt und die Nachrichten werden mit der Antwort des Assistenten und den Ergebnissen der Tool-Aufrufe aktualisiert.

Um die Tool-Aufruf-Informationen zu extrahieren, die das LLM für MCP-Aufrufe zurückgibt, fügen wir eine weitere Hilfsfunktion hinzu, die alles extrahiert, was für den Aufruf benötigt wird. Fügen Sie den folgenden Code an das Ende Ihrer `main.rs`-Datei hinzu:

```rust
fn extract_tool_call_info(tool_call: &Value) -> Result<(String, String, String), Box<dyn Error>> {
    let tool_id = tool_call
        .get("id")
        .and_then(|id| id.as_str())
        .unwrap_or("")
        .to_string();
    let function = tool_call.get("function").ok_or("Missing function")?;
    let name = function
        .get("name")
        .and_then(|n| n.as_str())
        .unwrap_or("")
        .to_string();
    let args = function
        .get("arguments")
        .and_then(|a| a.as_str())
        .unwrap_or("{}")
        .to_string();
    Ok((tool_id, name, args))
}
```

Mit allen Teilen an Ort und Stelle können wir nun den initialen Benutzer-Prompt verarbeiten und das LLM aufrufen. Aktualisieren Sie Ihre `main`-Funktion mit folgendem Code:

```rust
// LLM-Konversation mit Werkzeugaufrufen
let response = call_llm(&openai_client, &messages, &tools).await?;
process_llm_response(
    &response,
    &mcp_client,
    &openai_client,
    &tools,
    &mut messages,
)
.await?;
```

Dies wird das LLM mit dem initialen Benutzer-Prompt abfragen, der nach der Summe von zwei Zahlen fragt, und es wird die Antwort verarbeiten, um Tool-Aufrufe dynamisch zu handhaben.

Super, Sie haben es geschafft!

## Aufgabe

Nehmen Sie den Code aus der Übung und bauen Sie den Server mit weiteren Tools aus. Erstellen Sie dann einen Client mit einem LLM, wie in der Übung, und testen Sie ihn mit verschiedenen Prompts, um sicherzustellen, dass alle Ihre Server-Tools dynamisch aufgerufen werden. Diese Art, einen Client zu bauen, sorgt für eine großartige Benutzererfahrung, da Nutzer Prompts verwenden können statt exakter Client-Befehle und dabei nicht merken, dass ein MCP-Server aufgerufen wird.

## Lösung

[Lösung](./solution/README.md)

## Wichtige Erkenntnisse

- Die Integration eines LLM in Ihren Client bietet eine bessere Möglichkeit für Nutzer, mit MCP-Servern zu interagieren.
- Sie müssen die MCP-Server-Antwort in ein für das LLM verständliches Format umwandeln.

## Beispiele

- [Java Taschenrechner](../samples/java/calculator/README.md)
- [.Net Taschenrechner](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Taschenrechner](../samples/javascript/README.md)
- [TypeScript Taschenrechner](../samples/typescript/README.md)
- [Python Taschenrechner](../../../../03-GettingStarted/samples/python)
- [Rust Taschenrechner](../../../../03-GettingStarted/samples/rust)

## Zusätzliche Ressourcen

## Was kommt als Nächstes

- Weiter: [Verwendung eines Servers mit Visual Studio Code](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->