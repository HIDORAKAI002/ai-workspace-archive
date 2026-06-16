# Crearea unui client cu LLM

Până acum, ați văzut cum să creați un server și un client. Clientul a putut apela explicit serverul pentru a lista uneltele, resursele și solicitările sale. Totuși, aceasta nu este o abordare foarte practică. Utilizatorii dumneavoastră trăiesc în era agentică și se așteaptă să folosească solicitări și să comunice cu un LLM în schimb. Nu îi interesează dacă folosiți MCP pentru a stoca capabilitățile; ei se așteaptă pur și simplu să interacționeze folosind limbaj natural. Deci, cum rezolvăm asta? Soluția este să adăugăm un LLM clientului.

## Prezentare generală

În această lecție ne concentrăm pe adăugarea unui LLM pentru client și arătăm cum acest lucru oferă o experiență mult mai bună utilizatorului.

## Obiective de învățare

La sfârșitul acestei lecții, veți putea:

- Crea un client cu un LLM.
- Interacționa fără probleme cu un server MCP folosind un LLM.
- Oferi o experiență mai bună utilizatorului pe partea clientului.

## Abordare

Să încercăm să înțelegem abordarea pe care trebuie să o urmăm. Adăugarea unui LLM pare simplă, dar chiar o vom face?

Iată cum va interacționa clientul cu serverul:

1. Stabilește o conexiune cu serverul.

1. Listează capabilitățile, solicitările, resursele și uneltele, și salvează schema acestora.

1. Adaugă un LLM și transmite capabilitățile salvate și schema acestora într-un format pe care LLM-ul îl înțelege.

1. Gestionează o solicitare a utilizatorului trimițând-o către LLM împreună cu uneltele listate de client.

Groaznic, acum că înțelegem cum putem face asta la un nivel înalt, să încercăm în exercițiul de mai jos.

## Exercițiu: Crearea unui client cu un LLM

În acest exercițiu, vom învăța să adăugăm un LLM clientului nostru.

### Autentificare folosind GitHub Personal Access Token

Crearea unui token GitHub este un proces simplu. Iată cum puteți face acest lucru:

- Mergi la Setările GitHub – Click pe poza ta de profil din colțul dreapta sus și selectează Setări.
- Navighează la Setările pentru Dezvoltatori – Derulează în jos și click pe Setări dezvoltator.
- Selectează Token-uri de acces personal – Click pe Token-uri detaliate și apoi Generează un token nou.
- Configurează tokenul – Adaugă o notă pentru referință, stabilește o dată de expirare și selectează permisiunile necesare. În acest caz, asigură-te că adaugi permisiunea pentru Modele.
- Generează și copiază tokenul – Click pe Generează token și asigură-te că îl copiezi imediat, deoarece nu vei mai putea să-l vezi din nou.

### -1- Conectarea la server

Să creăm mai întâi clientul nostru:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Importați zod pentru validarea schemei

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

În codul precedent am:

- Importat bibliotecile necesare
- Creat o clasă cu doi membri, `client` și `openai`, care ne vor ajuta să gestionăm un client și să interacționăm cu un LLM.
- Configurat instanța LLM pentru a folosi Modelele GitHub setând `baseUrl` către API-ul de inferență.

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# Creează parametrii serverului pentru conexiunea stdio
server_params = StdioServerParameters(
    command="mcp",  # Executabil
    args=["run", "server.py"],  # Argumente opționale din linia de comandă
    env=None,  # Variabile de mediu opționale
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # Inițializează conexiunea
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

În codul precedent am:

- Importat bibliotecile necesare pentru MCP
- Creat un client

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

Mai întâi, va trebui să adăugați dependențele LangChain4j în fișierul `pom.xml`. Adăugați aceste dependențe pentru a permite integrarea MCP și suportul pentru Modelele GitHub:

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

Apoi creați clasa client Java:

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
    
    public static void main(String[] args) throws Exception {        // Configurează LLM să folosească modelele GitHub
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // Creează un transport MCP pentru conectarea la server
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // Creează un client MCP
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

În codul precedent am:

- **Adăugat dependențele LangChain4j**: Necesare pentru integrarea MCP, clientul oficial OpenAI și suport pentru Modelele GitHub
- **Importat bibliotecile LangChain4j**: Pentru integrarea MCP și funcționalitatea modelului de chat OpenAI
- **Creat un `ChatLanguageModel`**: Configurat să utilizeze Modelele GitHub cu token-ul tău GitHub
- **Setat transportul HTTP**: Folosind Server-Sent Events (SSE) pentru a conecta la serverul MCP
- **Creat un client MCP**: Care va gestiona comunicarea cu serverul
- **Folosind suportul integrat MCP din LangChain4j**: Care simplifică integrarea între LLM-uri și serverele MCP

#### Rust

Acest exemplu presupune că aveți un server MCP bazat pe Rust funcțional. Dacă nu aveți unul, consultați lecția [01-first-server](../01-first-server/README.md) pentru a crea serverul.

Odată ce aveți serverul MCP Rust, deschideți un terminal și navigați în aceeași directoare cu serverul. Apoi rulați comanda următoare pentru a crea un nou proiect client LLM:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

Adăugați următoarele dependențe în fișierul `Cargo.toml`:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> Nu există o bibliotecă oficială Rust pentru OpenAI, însă pachetul `async-openai` este o [bibliotecă administrată de comunitate](https://platform.openai.com/docs/libraries/rust#rust) care este folosită frecvent.

Deschideți fișierul `src/main.rs` și înlocuiți conținutul său cu următorul cod:

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
    // Mesaj inițial
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // Configurare client OpenAI
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // Configurare client MCP
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

    // TODO: Obține lista de unelte MCP

    // TODO: Conversație LLM cu apeluri către unelte

    Ok(())
}
```

Acest cod configurează o aplicație Rust de bază care se va conecta la un server MCP și la Modelele GitHub pentru interacțiuni LLM.

> [!IMPORTANT]
> Asigurați-vă că setați variabila de mediu `OPENAI_API_KEY` cu token-ul GitHub înainte de a rula aplicația.

Bine, pentru următorul pas, să listăm capabilitățile de pe server.

### -2- Listarea capabilităților serverului

Acum ne vom conecta la server și îi vom cere capabilitățile:

#### Typescript

În aceeași clasă, adăugați următoarele metode:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // listare unelte
    const toolsResult = await this.client.listTools();
}
```

În codul precedent am:

- Adăugat cod pentru conectarea la server, `connectToServer`.
- Creat o metodă `run` responsabilă de gestionarea fluxului aplicației noastre. Până acum doar listează uneltele, dar vom adăuga mai mult în curând.

#### Python

```python
# Listează resursele disponibile
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# Listează uneltele disponibile
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

Iată ce am adăugat:

- Listarea resurselor și uneltelor și afișarea lor. Pentru unelte am listat și `inputSchema` pe care îl folosim mai târziu.

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

În codul precedent am:

- Listat uneltele disponibile pe serverul MCP
- Pentru fiecare unealtă, am listat numele, descrierea și schema acesteia. Schema este ceva ce vom folosi pentru a apela uneltele în curând.

#### Java

```java
// Creează un furnizor de unelte care descoperă automat uneltele MCP
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// Furnizorul de unelte MCP gestionează automat:
// - Listarea uneltelor disponibile de pe serverul MCP
// - Convertirea schemelor uneltelor MCP în format LangChain4j
// - Gestionarea execuției uneltelor și a răspunsurilor
```

În codul precedent am:

- Creat un `McpToolProvider` care descoperă și înregistrează automat toate uneltele de pe serverul MCP
- Furnizorul de unelte gestionează conversia între schemele uneltelor MCP și formatul uneltelor LangChain4j intern
- Această abordare ascunde procesul manual de listare și conversie a uneltelor

#### Rust

Recuperarea uneltelor de pe serverul MCP se face folosind metoda `list_tools`. În funcția `main`, după configurarea clientului MCP, adăugați următorul cod:

```rust
// Obține lista de unelte MCP
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- Conversia capabilităților serverului în unelte LLM

Următorul pas după listarea capabilităților serverului este să le convertim într-un format pe care LLM îl poate înțelege. Odată ce facem asta, putem oferi aceste capabilități ca unelte LLM-ului nostru.

#### TypeScript

1. Adăugați următorul cod pentru a converti răspunsul de la serverul MCP într-un format de unealtă pe care LLM îl poate folosi:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // Creează un schemă zod bazată pe input_schema
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // Setează explicit tipul la "funcție"
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

    Codul de mai sus ia un răspuns de la serverul MCP și îl convertește într-un format de definiție a unuieltei pe care LLM îl poate înțelege.

2. Să actualizăm metoda `run` pentru a lista capabilitățile serverului:

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

    În codul precedent, am actualizat metoda `run` să parcurgă rezultatul și pentru fiecare intrare să apeleze `openAiToolAdapter`.

#### Python

1. Mai întâi, să creăm următoarea funcție convertor

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

    În funcția de mai sus `convert_to_llm_tools` luăm un răspuns MCP al uneltei și îl convertim într-un format pe care LLM îl poate înțelege.

2. Apoi, să actualizăm codul clientului nostru să folosească această funcție astfel:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    Aici, adăugăm un apel către `convert_to_llm_tool` pentru a converti răspunsul MCP al uneltei în ceva ce putem folosi ulterior cu LLM.

#### .NET

1. Să adăugăm cod pentru a converti răspunsul MCP al uneltei în ceva ce LLM-ul poate înțelege

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

În codul precedent am:

- Creat o funcție `ConvertFrom` care primește numele, descrierea și schema de intrare.
- Definit funcționalitatea care creează o `FunctionDefinition` care este transmisă unui `ChatCompletionsDefinition`. Acesta din urmă este ceva ce LLM-ul poate înțelege.

2. Să vedem cum putem actualiza niște cod existent pentru a folosi această funcție:

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
// Creează o interfață Bot pentru interacțiune în limbaj natural
public interface Bot {
    String chat(String prompt);
}

// Configurează serviciul AI cu instrumente LLM și MCP
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

În codul precedent am:

- Definit o interfață simplă `Bot` pentru interacțiuni în limbaj natural
- Folosit `AiServices` din LangChain4j pentru a lega automat LLM cu furnizorul de unelte MCP
- Framework-ul gestionează automat conversia schemei uneltelor și apelarea funcțiilor în spate
- Această abordare elimină conversia manuală a uneltelor - LangChain4j gestionează toată complexitatea conversiei uneltelor MCP în format compatibil cu LLM

#### Rust

Pentru a converti răspunsul MCP al uneltei într-un format pe care LLM îl poate înțelege, vom adăuga o funcție auxiliară care formatează lista uneltelor. Adăugați următorul cod în fișierul `main.rs` dedesubtul funcției `main`. Aceasta va fi apelată când facem cereri către LLM:

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

Groaznic, acum suntem gata să gestionăm orice solicitare a utilizatorului, să vedem asta în continuare.

### -4- Gestionarea solicitării promptului utilizatorului

În această parte a codului vom gestiona solicitările utilizatorului.

#### TypeScript

1. Adăugați o metodă care va fi folosită pentru a apela LLM-ul nostru:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. Sunați instrumentul serverului
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Faceți ceva cu rezultatul
        // DE FACUT

        }
    }
    ```

    În codul precedent am:

    - Adăugat o metodă `callTools`.
    - Metoda primește un răspuns LLM și verifică ce unelte au fost apelate, dacă există:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // apelare unealtă
        }
        ```

    - Apelează o unealtă, dacă LLM indică că trebuie apelată:

        ```typescript
        // 2. Apelează unealta serverului
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Fă ceva cu rezultatul
        // DE FĂCUT
        ```

2. Actualizați metoda `run` să includă apelarea LLM și apelarea `callTools`:

    ```typescript

    // 1. Creează mesaje care sunt input pentru LLM
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. Apelează LLM-ul
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. Parcurge răspunsul LLM, pentru fiecare opțiune, verifică dacă conține apeluri către unelte
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

Groaznic, iată codul complet:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Importă zod pentru validarea schemei

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // s-ar putea să fie nevoie să schimbăm această adresă URL în viitor: https://models.github.ai/inference
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
          // Creează o schemă zod bazată pe input_schema
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // Setează explicit tipul la "function"
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
    
    
          // 2. Apelează instrumentul serverului
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. Fă ceva cu rezultatul
          // DE FACUT
    
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
    
        // 3. Parcurge răspunsul LLM, pentru fiecare opțiune, verifică dacă conține apeluri către instrumente
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

1. Hai să adăugăm câteva importuri necesare pentru a apela un LLM

    ```python
    # llm
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. Apoi, să adăugăm funcția care va apela LLM-ul:

    ```python
    # llm

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
            # Parametri opționali
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

    În codul precedent am:

    - Transmis funcțiile găsite pe serverul MCP și convertite către LLM.
    - Apoi am apelat LLM-ul cu aceste funcții.
    - Apoi inspectăm rezultatul pentru a vedea ce funcții ar trebui apelate, dacă există.
    - În final, transmitem un array de funcții care trebuie apelate.

3. Pasul final, să actualizăm codul nostru principal:

    ```python
    prompt = "Add 2 to 20"

    # întreabă LLM ce instrumente să folosească toate, dacă este cazul
    functions_to_call = call_llm(prompt, functions)

    # apelează funcțiile sugerate
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    Asta a fost pasul final, în codul de mai sus:

    - Apelăm o unealtă MCP prin `call_tool` folosind o funcție pe care LLM a decis că trebuie să o apelăm pe baza solicitării noastre.
    - Afișăm rezultatul apelului uneltei către serverul MCP.

#### .NET

1. Hai să arătăm un cod pentru realizarea unei cereri de prompt LLM:

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

    În codul precedent am:

    - Obținut uneltele de pe serverul MCP, `var tools = await GetMcpTools()`.
    - Definit un prompt al utilizatorului `userMessage`.
    - Construit un obiect de opțiuni specificând modelul și uneltele.
    - Realizat o cerere către LLM.

2. Un ultim pas, să vedem dacă LLM crede că trebuie să apelăm o funcție:

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

    În codul precedent am:

    - Iterat prin lista de apeluri de funcții.
    - Pentru fiecare apel de unealtă, am extras numele și argumentele și am apelat unealta pe serverul MCP folosind clientul MCP. În final, afișăm rezultatele.

Iată codul complet:

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
    // Execută cereri în limbaj natural care utilizează automat instrumentele MCP
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

În codul precedent am:

- Folosit prompturi simple în limbaj natural pentru a interacționa cu uneltele serverului MCP
- Framework-ul LangChain4j gestionează automat:
  - Conversia prompturilor utilizatorului în apeluri la unelte, când este necesar
  - Apelarea uneltelor MCP potrivite bazat pe decizia LLM
  - Gestionarea fluxului conversațional între LLM și serverul MCP
- Metoda `bot.chat()` returnează răspunsuri în limbaj natural care pot include rezultate din execuția uneltelor MCP
- Această abordare oferă o experiență utilizator fără cusur, unde utilizatorii nu trebuie să știe despre implementarea MCP de bază

Exemplul complet de cod:

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

Aici se întâmplă majoritatea muncii. Vom apela LLM cu promptul inițial al utilizatorului, apoi vom procesa răspunsul pentru a vedea dacă trebuie apelate unelte. Dacă da, le vom apela și vom continua conversația cu LLM până când nu mai sunt apeluri la unelte necesare și avem un răspuns final.

Vom face mai multe apeluri la LLM, așa că să definim o funcție care va gestiona apelul LLM. Adăugați următoarea funcție în fișierul `main.rs`:

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

Această funcție primește clientul LLM, o listă de mesaje (inclusiv promptul utilizatorului), uneltele de pe serverul MCP și trimite o cerere către LLM, returnând răspunsul acestuia.
Răspunsul de la LLM va conține un array de `choices`. Va trebui să procesăm rezultatul pentru a vedea dacă sunt prezente `tool_calls`. Acest lucru ne permite să știm că LLM solicită apelarea unui instrument specific cu argumente. Adaugă următorul cod la finalul fișierului tău `main.rs` pentru a defini o funcție care să gestioneze răspunsul LLM:

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

    // Afișează conținutul dacă este disponibil
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // Gestionează apelurile către instrumente
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // Adaugă mesajul asistentului

        // Execută fiecare apel către instrument
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // Adaugă rezultatul instrumentului la mesaje
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // Continuă conversația cu rezultatele instrumentelor
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

Dacă sunt prezente `tool_calls`, extrage informațiile despre instrument, apelează serverul MCP cu cererea instrumentului și adaugă rezultatele la mesajele conversației. Apoi continuă conversația cu LLM iar mesajele sunt actualizate cu răspunsul asistentului și rezultatele apelului instrumentului.

Pentru a extrage informațiile despre apelul instrumentului pe care LLM le returnează pentru apelurile MCP, vom adăuga o altă funcție ajutătoare pentru a extrage tot ce este necesar pentru efectuarea apelului. Adaugă următorul cod la finalul fișierului tău `main.rs`:

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

Cu toate piesele la locul lor, acum putem gestiona promptul inițial al utilizatorului și apela LLM. Actualizează funcția ta `main` pentru a include următorul cod:

```rust
// Conversație LLM cu apeluri de unelte
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

Aceasta va interoga LLM cu promptul inițial al utilizatorului solicitând suma a două numere și va procesa răspunsul pentru a gestiona dinamic apelurile instrumentelor.

Grozav, ai reușit!

## Exercițiu

Ia codul din exercițiu și construiește serverul cu câteva instrumente suplimentare. Apoi creează un client cu un LLM, ca în exercițiu, și testează-l cu diverse prompturi pentru a te asigura că toate instrumentele serverului tău sunt apelate dinamic. Acest mod de a construi un client înseamnă că utilizatorul final va avea o experiență grozavă deoarece poate folosi prompturi, în loc de comenzi exacte ale clientului, și va fi total oblivios la orice apel MCP la server.

## Soluție

[Soluție](./solution/README.md)

## Idei principale

- Adăugarea unui LLM clientului tău oferă o modalitate mai bună utilizatorilor de a interacționa cu serverele MCP.
- Trebuie să convertești răspunsul serverului MCP într-un format pe care LLM îl poate înțelege.

## Exemple

- [Calculator Java](../samples/java/calculator/README.md)
- [Calculator .Net](../../../../03-GettingStarted/samples/csharp)
- [Calculator JavaScript](../samples/javascript/README.md)
- [Calculator TypeScript](../samples/typescript/README.md)
- [Calculator Python](../../../../03-GettingStarted/samples/python)
- [Calculator Rust](../../../../03-GettingStarted/samples/rust)

## Resurse suplimentare

## Ce urmează

- Următorul: [Consumarea unui server folosind Visual Studio Code](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->