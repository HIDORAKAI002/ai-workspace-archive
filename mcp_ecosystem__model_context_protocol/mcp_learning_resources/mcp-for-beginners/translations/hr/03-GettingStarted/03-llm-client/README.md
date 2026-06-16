# Izrada klijenta s LLM-om

Dosad ste vidjeli kako stvoriti server i klijenta. Klijent je mogao eksplicitno pozvati server kako bi nabrojio njegove alate, resurse i upite. Međutim, to nije vrlo praktičan pristup. Vaši korisnici žive u eri agenata i očekuju koristiti upite i komunicirati s LLM-om. Nisu im važni tehnički detalji kao što je korištenje MCP-a za pohranu vaših mogućnosti; oni jednostavno očekuju interakciju putem prirodnog jezika. Kako to onda riješiti? Rješenje je dodati LLM klijentu.

## Pregled

U ovom ćemo se poglavlju usredotočiti na dodavanje LLM-a u klijenta i pokazati kako to pruža puno bolje korisničko iskustvo.

## Ciljevi učenja

Do kraja ovog poglavlja moći ćete:

- Kreirati klijenta s LLM-om.
- Besprijekorno komunicirati s MCP serverom koristeći LLM.
- Pružiti bolje krajnje korisničko iskustvo na strani klijenta.

## Pristup

Pokušajmo razumjeti pristup koji trebamo poduzeti. Dodavanje LLM-a zvuči jednostavno, ali hoćemo li to stvarno napraviti?

Evo kako će klijent komunicirati sa serverom:

1. Uspostavi vezu sa serverom.

1. Navedite mogućnosti, upite, resurse i alate, te spremite njihovu shemu.

1. Dodajte LLM i proslijedite spremljene mogućnosti i njihove sheme u formatu koji LLM razumije.

1. Obradite korisnički upit prosljeđujući ga LLM-u zajedno s alatima koje je klijent naveo.

Super, sada kad razumijemo kako to učiniti na visokoj razini, isprobajmo to u donjem zadatku.

## Zadatak: Izrada klijenta s LLM-om

U ovom zadatku naučit ćemo kako dodati LLM u naš klijent.

### Autentifikacija pomoću GitHub Personal Access Token

Stvaranje GitHub tokena je jednostavan proces. Evo kako to možete napraviti:

- Idite na GitHub Settings – Kliknite na svoju profilnu sliku u gornjem desnom kutu i odaberite Settings.
- Navigirajte do Developer Settings – Pomaknite se dolje i kliknite na Developer Settings.
- Odaberite Personal Access Tokens – Kliknite na Fine-grained tokens, a zatim Generate new token.
- Konfigurirajte svoj token – Dodajte bilješku za referencu, odredite datum isteka i odaberite potrebne ovlasti (permissions). U ovom slučaju svakako dodajte Models dopuštenje.
- Generirajte i kopirajte token – Kliknite Generate token, i odmah ga kopirajte jer ga nećete ponovno moći vidjeti.

### -1- Povezivanje s serverom

Prvo ćemo kreirati naš klijent:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Uvezi zod za validaciju sheme

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

U prethodnom smo kodu:

- Uvezli potrebne biblioteke
- Kreirali klasu s dva člana, `client` i `openai` koji će nam pomoći u upravljanju klijentom i interakciji s LLM-om.
- Konfigurirali naš LLM primjerak da koristi GitHub Models postavljanjem `baseUrl` na endpoint inference API-ja.

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# Kreiraj parametre poslužitelja za stdio vezu
server_params = StdioServerParameters(
    command="mcp",  # Izvršna datoteka
    args=["run", "server.py"],  # Neobavezni argumenti naredbenog retka
    env=None,  # Neobavezne varijable okoline
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # Inicijaliziraj vezu
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

U prethodnom smo kodu:

- Uvezli potrebne biblioteke za MCP
- Kreirali klijenta

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

Prvo, trebate dodati LangChain4j ovisnosti u svoj `pom.xml` datoteku. Dodajte ove ovisnosti za omogućavanje MCP integracije i podrške za GitHub Models:

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

Zatim kreirajte vašu Java klijentsku klasu:

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
    
    public static void main(String[] args) throws Exception {        // Konfigurirajte LLM za korištenje GitHub modela
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // Kreirajte MCP transport za povezivanje sa serverom
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // Kreirajte MCP klijenta
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

U prethodnom kodu smo:

- **Dodali LangChain4j ovisnosti**: Potrebne za MCP integraciju, službeni OpenAI klijent i podršku za GitHub Models
- **Uvezli LangChain4j biblioteke**: Za MCP integraciju i funkcionalnost OpenAI chat modela
- **Kreirali `ChatLanguageModel`**: Konfiguriran za korištenje GitHub Models s vašim GitHub tokenom
- **Postavili HTTP transport**: Koristeći Server-Sent Events (SSE) za povezivanje s MCP serverom
- **Kreirali MCP klijenta**: Koji će upravljati komunikacijom sa serverom
- **Koristili ugrađenu MCP podršku LangChain4j-a**: Koja pojednostavljuje integraciju između LLM-a i MCP servera

#### Rust

Ovaj primjer pretpostavlja da imate Rust bazirani MCP server u radu. Ako ga nemate, vratite se na [01-first-server](../01-first-server/README.md) lekciju za izradu servera.

Kada imate svoj Rust MCP server, otvorite terminal i navigirajte do istog direktorija kao i server. Zatim pokrenite sljedeću naredbu za kreiranje novog LLM klijentskog projekta:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

Dodajte sljedeće ovisnosti u vašu `Cargo.toml` datoteku:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> Ne postoji službena Rust biblioteka za OpenAI, ali `async-openai` crate je [zajednički održavana biblioteka](https://platform.openai.com/docs/libraries/rust#rust) koja se često koristi.

Otvorite `src/main.rs` datoteku i zamijenite njezin sadržaj sljedećim kodom:

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
    // Početna poruka
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // Podesi OpenAI klijenta
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // Podesi MCP klijenta
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

    // ZA URADITI: Dohvati popis MCP alata

    // ZA URADITI: LLM razgovor s pozivima alata

    Ok(())
}
```

Ovaj kod postavlja osnovnu Rust aplikaciju koja će se povezivati s MCP serverom i GitHub Models za LLM interakcije.

> [!IMPORTANT]
> Obavezno postavite `OPENAI_API_KEY` kao varijablu okruženja s vašim GitHub tokenom prije pokretanja aplikacije.

Super, za sljedeći korak, popisat ćemo mogućnosti servera.

### -2- Popis mogućnosti servera

Sada ćemo se povezati s serverom i zatražiti njegove mogućnosti:

#### Typescript

U istoj klasi dodajte sljedeće metode:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // popis alata
    const toolsResult = await this.client.listTools();
}
```

U prethodnom kodu smo:

- Dodali kod za povezivanje sa serverom, `connectToServer`.
- Kreirali `run` metodu odgovornu za upravljanje našim aplikacijskim tokom. Do sada samo navodi alate, ali uskoro ćemo dodati još.

#### Python

```python
# Navedi dostupne resurse
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# Navedi dostupne alate
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

Evo što smo dodali:

- Nabrajanje resursa i alata i ispis istih. Za alate također navodimo `inputSchema` koju ćemo kasnije koristiti.

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

U prethodnom kodu smo:

- Nabrojali alate dostupne na MCP Serveru
- Za svaki alat naveli ime, opis i njegovu shemu. Ova se shema koristi za pozivanje alata.

#### Java

```java
// Kreirajte davatelja alata koji automatski otkriva MCP alate
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP davatelj alata automatski upravlja:
// - Popis dostupnih alata s MCP poslužitelja
// - Pretvaranje MCP shema alata u LangChain4j format
// - Upravljanje izvršavanjem alata i odgovorima
```

U prethodnom kodu smo:

- Kreirali `McpToolProvider` koji automatski pronalazi i registrira sve alate s MCP servera
- Provider alata upravlja konverzijom između MCP alata i LangChain4j formata alata interno
- Ovaj pristup skriva ručno nabrajanje alata i konverziju

#### Rust

Dohvaćanje alata s MCP servera radi se pomoću metode `list_tools`. U vašoj `main` funkciji, nakon postavljanja MCP klijenta, dodajte sljedeći kod:

```rust
// Dohvati popis MCP alata
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- Pretvaranje mogućnosti servera u LLM alate

Nakon nabrajanja mogućnosti servera sljedeći je korak pretvoriti ih u format koji LLM razumije. Kad to učinimo, možemo te mogućnosti predati kao alate našem LLM-u.

#### TypeScript

1. Dodajte sljedeći kod za pretvaranje odgovora s MCP servera u format alata koji LLM može koristiti:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // Kreirajte zod shemu temeljenu na input_schema
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // Izričito postavite tip na "function"
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

    Gornji kod uzima odgovor s MCP servera i prevodi ga u format definicije alata koji LLM razumije.

2. Zatim ažurirajmo `run` metodu da nabroji mogućnosti servera:

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

    U prethodnom smo kodu ažurirali `run` metodu kako bismo mapirali kroz rezultat i za svaki unos pozvali `openAiToolAdapter`.

#### Python

1. Prvo, kreirajmo sljedeću funkciju za pretvaranje

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

    U funkciji iznad `convert_to_llm_tools` uzimamo MCP alat kao odgovor i pretvaramo ga u format koji LLM može razumjeti.

2. Zatim, ažurirajmo naš kod klijenta da koristi ovu funkciju ovako:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    Ovdje dodajemo poziv `convert_to_llm_tool` da pretvorimo MCP alat u nešto što možemo proslijediti LLM-u kasnije.

#### .NET

1. Dodajmo kod koji pretvara MCP alat u format koji LLM može razumjeti

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

U prethodnom kodu smo:

- Kreirali funkciju `ConvertFrom` koja prima ime, opis i ulaznu shemu.
- Definirali funkcionalnost koja kreira `FunctionDefinition` koji se prosljeđuje `ChatCompletionsDefinition`. Ovo potonje LLM razumije.

2. Pogledajmo kako možemo ažurirati postojeći kod da iskoristimo ovu funkciju:

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
// Napravite Bot sučelje za interakciju prirodnim jezikom
public interface Bot {
    String chat(String prompt);
}

// Konfigurirajte AI uslugu s LLM i MCP alatima
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

U prethodnom kodu smo:

- Definirali jednostavan `Bot` interfejs za interakcije prirodnim jezikom
- Koristili LangChain4j-ev `AiServices` za automatsko povezivanje LLM-a s MCP providerom alata
- Okvir automatski upravlja konverzijom shema alata i pozivanjem funkcija iza kulisa
- Ovaj pristup ukida ručnu konverziju alata – LangChain4j rješava cjelokupnu složenost pretvaranja MCP alata u format kompatibilan s LLM-om

#### Rust

Da bismo pretvorili MCP alat u format koji LLM može razumjeti, dodati ćemo pomoćnu funkciju koja formatira popis alata. Dodajte sljedeći kod u datoteku `main.rs` ispod funkcije `main`. Ovo će se pozivati pri slanju zahtjeva LLM-u:

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

Super, sada smo postavljeni za obradu korisničkih zahtjeva, pa to odmah riješimo.

### -4- Obrada korisničkog upita

U ovom dijelu koda, obrađivat ćemo korisničke zahtjeve.

#### TypeScript

1. Dodajte metodu koja će pozivati naš LLM:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. Pozovi alat servera
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Napravi nešto s rezultatom
        // ZA URADITI

        }
    }
    ```

    U prethodnom kodu smo:

    - Dodali metodu `callTools`.
    - Metoda prima LLM odgovor i provjerava koje su alate, ako ih ima, LLM naznačio da treba pozvati:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // pozovi alat
        }
        ```

    - Poziva alat ako LLM pokazuje da ga treba upotrijebiti:

        ```typescript
        // 2. Pozvati alat servera
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Neka se nešto napravi s rezultatom
        // ZA URADITI
        ```

2. Ažurirajte `run` metodu da uključi pozive prema LLM-u i pozivanje `callTools`:

    ```typescript

    // 1. Kreirajte poruke koje su unos za LLM
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. Pozivanje LLM-a
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. Prođite kroz odgovor LLM-a, za svaki odabir provjerite ima li pozive alata
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

Super, pogledajmo kompletan kod:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Uvezi zod za validaciju sheme

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // možda će biti potrebno promijeniti na ovaj URL u budućnosti: https://models.github.ai/inference
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
          // Kreiraj zod shemu temeljenu na input_schema
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // Izričito postavi tip na "function"
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
    
    
          // 2. Pozovi alat na serveru
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. Napravi nešto s rezultatom
          // ZA URADITI
    
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
    
        // 3. Prođi kroz odgovor LLM-a, za svaki izbor provjeri ima li pozive alata
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

1. Dodajmo potrebne importe za pozivanje LLM-a

    ```python
    # llm
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. Zatim dodajmo funkciju koja će pozivati LLM:

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
            # Neobavezni parametri
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

    U prethodnom kodu smo:

    - Proslijedili naše funkcije koje smo našli na MCP serveru i konvertirali LLM-u.
    - Pozvali LLM s tim funkcijama.
    - Inspektirali rezultat da vidimo koje funkcije treba pozvati, ako ih ima.
    - Na kraju, proslijedili niz funkcija koje treba pozvati.

3. Završni korak, ažurirajmo naš glavni kod:

    ```python
    prompt = "Add 2 to 20"

    # pitaj LLM koje alate koristiti, ako ih uopće ima
    functions_to_call = call_llm(prompt, functions)

    # pozovi predložene funkcije
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    Eto, to je zadnji korak, u gornjem kodu:

    - Pozivamo MCP alat preko `call_tool` koristeći funkciju koju je LLM odlučio da treba pozvati na temelju našeg upita.
    - Ispisujemo rezultat poziva alata prema MCP serveru.

#### .NET

1. Evo primjera koda za slanje upita LLM-u:

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

    U prethodnom kodu smo:

    - Dohvatili alate s MCP servera, `var tools = await GetMcpTools()`.
    - Definirali korisnički upit `userMessage`.
    - Kreirali opcijski objekt specificirajući model i alate.
    - Poslali zahtjev prema LLM-u.

2. Još jedan korak, provjerimo misli li LLM da trebamo pozvati neku funkciju:

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

    U prethodnom kodu smo:

    - Prošli kroz popis poziva funkcija.
    - Za svaki poziv alata izdvojili ime i argumente te pozvali alat na MCP serveru koristeći MCP klijenta. Na kraju ispisali rezultate.

Evo potpuni kod:

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
    // Izvršavajte zahtjeve na prirodnom jeziku koji automatski koriste MCP alate
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

U prethodnom kodu smo:

- Koristili jednostavne prirodne jezične upite za interakciju s MCP server alatima
- LangChain4j okvir automatski upravlja:
  - Pretvaranjem korisničkih upita u pozive alata kada je potrebno
  - Pozivanjem odgovarajućih MCP alata na temelju odluke LLM-a
  - Upravljanjem tijekom razgovora između LLM-a i MCP servera
- Metoda `bot.chat()` vraća odgovore prirodnim jezikom koji mogu uključivati rezultate izvođenja MCP alata
- Ovaj pristup pruža neprimjetno korisničko iskustvo gdje korisnici ne moraju znati o podlozi MCP implementacije

Kompletan primjer koda:

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

Ovdje se odvija većina posla. Pozvat ćemo LLM s početnim korisničkim upitom, zatim obraditi odgovor da vidimo treba li pozvati neki alat. Ako treba, pozvat ćemo te alate i nastaviti razgovor s LLM-om sve dok više nema potrebe za pozivima alata i dok ne dobijemo konačni odgovor.

Bavit ćemo se višestrukim pozivima LLM-u, stoga definirajmo funkciju koja će obrađivati LLM pozive. Dodajte sljedeću funkciju u vašu `main.rs` datoteku:

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

Ova funkcija prima LLM klijenta, popis poruka (uključujući korisnički upit), alate s MCP servera i šalje zahtjev LLM-u, vraćajući odgovor.
Odgovor od LLM-a sadržavat će niz `choices`. Trebat ćemo obraditi rezultat da vidimo ima li prisutnih `tool_calls`. To nam govori da LLM traži da se pozove određeni alat s argumentima. Dodajte sljedeći kod na dno vaše datoteke `main.rs` kako biste definirali funkciju za rukovanje LLM odgovorom:

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

    // Ispiši sadržaj ako je dostupan
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // Obradi pozive alata
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // Dodaj poruku asistenta

        // Izvrši svaki poziv alata
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // Dodaj rezultat alata u poruke
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // Nastavi razgovor s rezultatima alata
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

Ako su prisutni `tool_calls`, izdvajaju se informacije o alatu, poziva MCP poslužitelj s zahtjevom za alat i dodaju se rezultati u poruke razgovora. Zatim se nastavlja razgovor s LLM-om, a poruke se ažuriraju odgovorom asistenta i rezultatima poziva alata.

Da bismo izdvojili informacije o pozivu alata koje LLM vraća za MCP pozive, dodati ćemo još jednu pomoćnu funkciju koja će izdvojiti sve što je potrebno za izvršenje poziva. Dodajte sljedeći kod na dno vaše datoteke `main.rs`:

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

Sada kada su svi dijelovi na mjestu, možemo obraditi početni korisnički upit i pozvati LLM. Ažurirajte svoju funkciju `main` da uključuje sljedeći kod:

```rust
// Razgovor LLM-a s pozivima alata
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

Ovo će poslati upit LLM-u s početnim korisničkim pitanjem za zbroj dvije brojke te će obraditi odgovor kako bi dinamički rukovao pozivima alata.

Sjajno, uspjeli ste!

## Zadatak

Uzmite kod iz vježbe i razvijte poslužitelj s još nekoliko alata. Zatim kreirajte klijenta s LLM-om, kao u vježbi, i testirajte ga s različitim upitima kako biste bili sigurni da se svi alati na poslužitelju pozivaju dinamički. Ovakav način izgradnje klijenta znači da krajnji korisnik ima izvrsno korisničko iskustvo jer može koristiti upite umjesto točnih naredbi klijenta, a pritom neće biti ni svjestan da se poziva neki MCP poslužitelj.

## Rješenje

[Rješenje](./solution/README.md)

## Ključne lekcije

- Dodavanje LLM-a u vaš klijent pruža bolji način za korisnike da komuniciraju s MCP poslužiteljima.
- Trebate pretvoriti odgovor MCP poslužitelja u format koji LLM može razumjeti.

## Primjeri

- [Java Kalkulator](../samples/java/calculator/README.md)
- [.Net Kalkulator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Kalkulator](../samples/javascript/README.md)
- [TypeScript Kalkulator](../samples/typescript/README.md)
- [Python Kalkulator](../../../../03-GettingStarted/samples/python)
- [Rust Kalkulator](../../../../03-GettingStarted/samples/rust)

## Dodatni resursi

## Što slijedi

- Sljedeće: [Korištenje poslužitelja u Visual Studio Code](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->