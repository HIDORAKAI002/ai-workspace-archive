# Lage en klient med LLM

Så langt har du sett hvordan du kan lage en server og en klient. Klienten har kunnet kalle serveren eksplisitt for å liste opp verktøy, ressurser og prompt. Dette er imidlertid ikke en veldig praktisk tilnærming. Brukerne dine lever i den agentiske æra og forventer å bruke prompts og kommunisere med en LLM i stedet. De bryr seg ikke om du bruker MCP for å lagre dine kapabiliteter; de forventer bare å kunne samhandle via naturlig språk. Så hvordan løser vi dette? Løsningen er å legge til en LLM i klienten.

## Oversikt

I denne leksjonen fokuserer vi på å legge til en LLM i klienten og viser hvordan dette gir en mye bedre opplevelse for brukeren din.

## Læringsmål

Ved slutten av denne leksjonen vil du kunne:

- Lage en klient med en LLM.
- Sømløst samhandle med en MCP-server ved hjelp av en LLM.
- Gi en bedre sluttbrukeropplevelse på klientsiden.

## Tilnærming

La oss prøve å forstå tilnærmingen vi må ta. Det høres enkelt ut å legge til en LLM, men kommer vi faktisk til å gjøre dette?

Slik vil klienten samhandle med serveren:

1. Etablere forbindelse med serveren.

1. Liste kapabiliteter, prompts, ressurser og verktøy, og lagre deres skjema.

1. Legge til en LLM og sende de lagrede kapabilitetene og skjemaene i et format som LLM forstår.

1. Håndtere en brukerprompt ved å sende den til LLM sammen med verktøyene listet av klienten.

Flott, nå som vi forstår hvordan vi kan gjøre dette på et overordnet nivå, la oss prøve dette i øvelsen under.

## Øvelse: Lage en klient med en LLM

I denne øvelsen skal vi lære å legge til en LLM til klienten vår.

### Autentisering med GitHub Personal Access Token

Å lage et GitHub-token er en enkel prosess. Slik gjør du det:

- Gå til GitHub-innstillinger – Klikk på profilbildet ditt øverst til høyre og velg Innstillinger.
- Naviger til Developer Settings – Bla nedover og klikk på Developer Settings.
- Velg Personal Access Tokens – Klikk på Fine-grained tokens og deretter Generate new token.
- Konfigurer tokenet – Legg til en merknad for referanse, sett en utløpsdato, og velg nødvendige scopes (tillatelser). I dette tilfellet må du sørge for å legge til Models-tillatelsen.
- Generer og kopier tokenet – Klikk Generate token, og sørg for å kopiere det umiddelbart, da du ikke vil kunne se det igjen.

### -1- Koble til serveren

La oss først lage klienten vår:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Importer zod for skjema validering

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

I koden ovenfor har vi:

- Importert nødvendige biblioteker
- Laget en klasse med to medlemmer, `client` og `openai`, som vil hjelpe oss å administrere en klient og samhandle med en LLM respektivt.
- Konfigurert vår LLM-instans til å bruke GitHub Models ved å sette `baseUrl` til å peke på inferanse-APIet.

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# Opprett serverparametere for stdio-tilkobling
server_params = StdioServerParameters(
    command="mcp",  # Kjørbar fil
    args=["run", "server.py"],  # Valgfrie kommandolinjeargumenter
    env=None,  # Valgfrie miljøvariabler
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # Initialiser tilkoblingen
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

I koden ovenfor har vi:

- Importert nødvendige biblioteker for MCP
- Opprettet en klient

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

Først må du legge til LangChain4j-avhengighetene i `pom.xml`-filen din. Legg til disse avhengighetene for å aktivere MCP-integrasjon og støtte for GitHub Models:

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

Lag deretter din Java-klientklasse:

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
    
    public static void main(String[] args) throws Exception {        // Konfigurer LLM for å bruke GitHub-modeller
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // Opprett MCP-transport for å koble til server
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // Opprett MCP-klient
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

I koden ovenfor har vi:

- **Lagt til LangChain4j-avhengigheter**: Nødvendig for MCP-integrasjon, OpenAI offisiell klient og GitHub Models-støtte
- **Importert LangChain4j-biblioteker**: For MCP-integrasjon og OpenAI chatmodell-funksjonalitet
- **Laget en `ChatLanguageModel`**: Konfigurert til å bruke GitHub Models med ditt GitHub-token
- **Satt opp HTTP-transport**: Ved bruk av Server-Sent Events (SSE) for å koble til MCP-serveren
- **Opprettet en MCP-klient**: Som håndterer kommunikasjon med serveren
- **Brukt LangChain4js innebygde MCP-støtte**: Som forenkler integrasjon mellom LLMer og MCP-servere

#### Rust

Dette eksemplet forutsetter at du har en Rust-basert MCP-server kjørende. Hvis du ikke har det, gå tilbake til [01-first-server](../01-first-server/README.md) leksjonen for å lage serveren.

Når du har din Rust MCP-server, åpne et terminalvindu og naviger til samme katalog som serveren. Kjør deretter følgende kommando for å lage et nytt LLM-klientprosjekt:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

Legg til følgende avhengigheter i `Cargo.toml`-filen din:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> Det finnes ikke et offisielt Rust-bibliotek for OpenAI, men `async-openai` crate er et [community-maintained bibliotek](https://platform.openai.com/docs/libraries/rust#rust) som ofte brukes.

Åpne `src/main.rs`-filen og erstatt innholdet med følgende kode:

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
    // Startmelding
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // Sett opp OpenAI-klient
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // Sett opp MCP-klient
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

    // TODO: Hent MCP verktøyliste

    // TODO: LLM-samtale med verktøysamtaler

    Ok(())
}
```

Denne koden setter opp en grunnleggende Rust-applikasjon som vil koble til en MCP-server og GitHub Models for LLM-interaksjoner.

> [!IMPORTANT]
> Sørg for å sette miljøvariabelen `OPENAI_API_KEY` med ditt GitHub-token før du kjører applikasjonen.

Flott, neste steg er at vi skal liste kapabilitetene på serveren.

### -2- Liste serverkapabiliteter

Nå skal vi koble til serveren og be om kapabilitetene dens:

#### TypeScript

I samme klasse, legg til følgende metoder:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // liste over verktøy
    const toolsResult = await this.client.listTools();
}
```

I koden ovenfor har vi:

- Lagt til kode for å koble til serveren, `connectToServer`.
- Laget en `run`-metode som håndterer applikasjonsflyten vår. Så langt lister den bare verktøy, men vi vil legge til mer snart.

#### Python

```python
# List opp tilgjengelige ressurser
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# List opp tilgjengelige verktøy
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

Her er hva vi har lagt til:

- Liste opp ressurser og verktøy og skrevet dem ut. For verktøy lister vi også `inputSchema` som vi bruker senere.

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

I koden ovenfor har vi:

- Listet verktøyene som er tilgjengelig på MCP Server
- For hvert verktøy listet navn, beskrivelse og deres skjema. Sistnevnte bruker vi for å kalle verktøyene snart.

#### Java

```java
// Lag en verktøyleverandør som automatisk oppdager MCP-verktøy
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP-verktøyleverandøren håndterer automatisk:
// - Listing tilgjengelige verktøy fra MCP-serveren
// - Konvertering av MCP-verktøy-skjemaer til LangChain4j-formatet
// - Håndtering av verktøykjøring og svar
```

I koden ovenfor har vi:

- Opprettet en `McpToolProvider` som automatisk oppdager og registrerer alle verktøy fra MCP-serveren
- Verktøyleverandøren håndterer konverteringen mellom MCP-verktøyskjemaer og LangChain4js verktøyformat internt
- Denne tilnærmingen abstraherer bort manuell opplisting og konvertering av verktøy

#### Rust

Å hente verktøy fra MCP-serveren gjøres ved `list_tools`-metoden. I din `main`-funksjon, etter å ha satt opp MCP-klienten, legg til følgende kode:

```rust
// Hent MCP verktøyliste
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- Konverter serverkapabiliteter til LLM-verktøy

Neste steg etter å ha listet serverkapabiliteter er å konvertere dem til et format som LLM forstår. Når vi gjør det, kan vi tilby disse kapabilitetene som verktøy til LLMen vår.

#### TypeScript

1. Legg til følgende kode for å konvertere respons fra MCP-serveren til et verktøyformat LLM kan bruke:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // Opprett et zod-skjema basert på input_schema
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // Sett eksplisitt type til "function"
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

    Koden over tar responsen fra MCP-serveren og konverterer den til et verktøydefinisjonsformat som LLM kan forstå.

2. La oss oppdatere `run`-metoden for å liste serverkapabiliteter:

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

    I koden ovenfor oppdaterte vi `run`-metoden til å gå gjennom resultatet og for hver oppføring kalle `openAiToolAdapter`.

#### Python

1. Først lager vi følgende konverteringsfunksjon

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

    I funksjonen `convert_to_llm_tools` tar vi et MCP-verktøyrespons og konverterer det til et format som LLM kan forstå.

2. Deretter oppdaterer vi klientkoden vår for å bruke denne funksjonen slik:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    Her kaller vi `convert_to_llm_tool` for å konvertere MCP-verktøyresponsen til noe vi kan mate til LLM senere.

#### .NET

1. La oss legge til kode for å konvertere MCP-verktøyrespons til noe LLM kan forstå

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

I koden ovenfor har vi:

- Laget funksjonen `ConvertFrom` som tar navnet, beskrivelse og inputskjema.
- Definert funksjonalitet som lager en FunctionDefinition som sendes til en ChatCompletionsDefinition. Sistnevnte er noe LLM kan forstå.

2. La oss oppdatere noe eksisterende kode for å bruke denne funksjonen:

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
// Opprett et Bot-grensesnitt for naturlig språkinteraksjon
public interface Bot {
    String chat(String prompt);
}

// Konfigurer AI-tjenesten med LLM- og MCP-verktøy
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

I koden ovenfor har vi:

- Definert et enkelt `Bot`-interface for naturlig språk-interaksjoner
- Brukt LangChain4js `AiServices` for å automatisk binde LLM med MCP-verktøyleverandøren
- Rammeverket håndterer automatisk verktøyskjema-konvertering og funksjonskall bak kulissene
- Denne tilnærmingen eliminerer manuell konvertering av verktøy – LangChain4j håndterer all kompleksitet med å konvertere MCP-verktøy til LLM-kompatibelt format

#### Rust

For å konvertere MCP-verktøyresponsen til et format LLM kan forstå, legger vi til en hjelpefunksjon som formaterer verktøylisten. Legg til følgende kode i `main.rs` under `main`-funksjonen. Denne funksjonen blir kalt når forespørsler sendes til LLM:

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

Flott, nå er vi klare til å håndtere brukerforespørsler, så la oss gå videre til det.

### -4- Håndtere brukerprompt-forespørsel

I denne delen av koden skal vi håndtere brukerforespørsler.

#### TypeScript

1. Legg til en metode som brukes til å kalle vår LLM:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. Kall serverens verktøy
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Gjør noe med resultatet
        // TODO

        }
    }
    ```

    I koden ovenfor:

    - La vi til metoden `callTools`.
    - Metoden tar inn et LLM-svar og sjekker om noen verktøy skal kalles:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // kall verktøy
        }
        ```

    - Kaller et verktøy hvis LLM indikerer at det skal kalles:

        ```typescript
        // 2. Kall serverens verktøy
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Gjør noe med resultatet
        // TODO
        ```

2. Oppdater `run`-metoden for å inkludere kall til LLM og kalle `callTools`:

    ```typescript

    // 1. Lag meldinger som er input for LLM
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. Kalle LLM
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. Gå gjennom LLM-responsen, for hvert valg, sjekk om det har verktøysamtaler
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

Flott, her er fullstendig kode:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Importer zod for skjema-validering

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // kan hende vi må endre til denne URL-en i fremtiden: https://models.github.ai/inference
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
          // Lag et zod-skjema basert på input_schema
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // Sett eksplisitt type til "function"
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
    
    
          // 2. Kall serverens verktøy
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. Gjør noe med resultatet
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
    
        // 3. Gå gjennom LLM-responsen, for hvert valg, sjekk om det har verktøykall
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

1. La oss legge til nødvendige imports for å kalle en LLM

    ```python
    # llm
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. Deretter legger vi til funksjonen som kaller LLM:

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
            # Valgfrie parametere
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

    I koden ovenfor har vi:

    - Sendt inn funksjonene vi har funnet på MCP-serveren og konvertert, til LLM.
    - Deretter kalt LLM med disse funksjonene.
    - Sjekket resultatet for å se hvilke funksjoner som bør kalles, om noen.
    - Til slutt sender vi en liste med funksjoner som kan kalles.

3. Siste steg, oppdaterer hovedkoden vår:

    ```python
    prompt = "Add 2 to 20"

    # spør LLM hvilke verktøy som skal brukes, hvis noen
    functions_to_call = call_llm(prompt, functions)

    # kall foreslåtte funksjoner
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    Der, det var siste steg. I koden over:

    - Kaller vi et MCP-verktøy via `call_tool` med en funksjon som LLM mente vi burde kalle basert på prompten.
    - Printer resultatet av verktøykallet til MCP-serveren.

#### .NET

1. Her er kodeeksempel for LLM-prompt-forespørsel:

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

    I koden ovenfor har vi:

    - Hentet verktøy fra MCP-serveren, `var tools = await GetMcpTools()`.
    - Definert en brukerprompt `userMessage`.
    - Opprettet et options-objekt som spesifiserer modell og verktøy.
    - Sendt en forespørsel til LLM.

2. Siste steg, sjekk om LLM synes vi skal kalle en funksjon:

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

    I koden ovenfor har vi:

    - Gått gjennom en liste med funksjonskall.
    - For hvert verktøyskall, hent navn og argumenter og kall verktøyet på MCP-serveren ved hjelp av MCP-klienten. Til slutt printer vi resultater.

Her er koden i sin helhet:

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
    // Utfør naturlige språkforespørsler som automatisk bruker MCP-verktøy
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

I koden ovenfor har vi:

- Brukt enkle naturlige språkprompts for å samhandle med MCP-serververktøy
- LangChain4j-rammeverket håndterer automatisk:
  - Konvertering av brukerprompts til verktøysamtaler når nødvendig
  - Kalling av passende MCP-verktøy basert på LLMs avgjørelse
  - Administrasjon av samtaleflyten mellom LLM og MCP-server
- Metoden `bot.chat()` returnerer naturlige språk-svar som kan inkludere resultater fra MCP-verktøykjøringer
- Denne tilnærmingen gir en sømløs brukeropplevelse hvor brukere ikke trenger å kjenne til den underliggende MCP-implementeringen

Fullstendig kodeeksempel:

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

Her skjer hoveddelen av arbeidet. Vi vil kalle LLM med den innledende brukerprompten, deretter bearbeide svaret for å se om noen verktøy må kalles. Hvis det trengs, kaller vi disse verktøyene og fortsetter samtalen med LLM til ingen flere verktøykall trengs og vi har et endelig svar.

Vi kommer til å gjøre flere kall til LLM, så la oss definere en funksjon som håndterer LLM-kallet. Legg til følgende funksjon i `main.rs`:

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

Denne funksjonen tar LLM-klienten, en liste meldinger (inkludert brukerprompt), verktøy fra MCP-serveren, og sender en forespørsel til LLM, og returnerer svaret.
Responsen fra LLM-en vil inneholde en array med `choices`. Vi må behandle resultatet for å se om noen `tool_calls` er til stede. Dette lar oss vite at LLM ønsker at et spesifikt verktøy skal kalles med argumenter. Legg til følgende kode nederst i `main.rs`-filen din for å definere en funksjon som håndterer LLM-responsen:

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

    // Skriv ut innhold hvis tilgjengelig
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // Håndter verktøyoppkall
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // Legg til assistentmelding

        // Utfør hvert verktøyoppkall
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // Legg til verktøyresultat i meldinger
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // Fortsett samtale med verktøyresultater
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
  
Hvis `tool_calls` er til stede, henter den ut verktøyinformasjonen, kaller MCP-serveren med verktøyforespørselen og legger resultatene til samtalemeldingene. Den fortsetter deretter samtalen med LLM, og meldingene oppdateres med assistentens svar og resultatene fra verktøykallet.

For å hente ut informasjon om verktøykall som LLM returnerer for MCP-kall, legger vi til en annen hjelpefunksjon som ekstraherer alt som trengs for å utføre kallet. Legg til følgende kode nederst i `main.rs`-filen din:

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
  
Med alle delene på plass kan vi nå håndtere den innledende brukerprompten og kalle LLM. Oppdater `main`-funksjonen din til å inkludere følgende kode:

```rust
// LLM-samtale med verktøysanrop
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
  
Dette vil spørre LLM med den innledende brukerprompten som ber om summen av to tall, og det vil behandle responsen for å dynamisk håndtere verktøykall.

Flott, du klarte det!

## Oppgave

Ta koden fra øvelsen og bygg ut serveren med flere verktøy. Lag deretter en klient med en LLM, som i øvelsen, og test den med forskjellige prompt for å sørge for at alle serververktøyene dine blir kalt dynamisk. Denne måten å bygge en klient på gir sluttbrukeren en flott brukeropplevelse, da de kan bruke prompt i stedet for nøyaktige klientkommandoer, og være uvitende om at en MCP-server kalles.

## Løsning

[Løsning](./solution/README.md)

## Viktige punkter

- Å legge til en LLM i klienten din gir en bedre måte for brukere å samhandle med MCP-servere på.  
- Du må konvertere MCP-serverens respons til noe LLM kan forstå.

## Eksempler

- [Java Calculator](../samples/java/calculator/README.md)  
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)  
- [JavaScript Calculator](../samples/javascript/README.md)  
- [TypeScript Calculator](../samples/typescript/README.md)  
- [Python Calculator](../../../../03-GettingStarted/samples/python)  
- [Rust Calculator](../../../../03-GettingStarted/samples/rust)

## Ytterligere ressurser

## Hva skjer videre

- Neste: [Konsumere en server med Visual Studio Code](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->