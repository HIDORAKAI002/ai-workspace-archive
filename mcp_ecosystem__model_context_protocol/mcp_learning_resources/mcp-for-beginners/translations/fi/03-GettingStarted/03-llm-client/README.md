# Asiakkaan luominen LLM:llä

Tähän asti olet nähnyt, miten luodaan palvelin ja asiakas. Asiakas on voinut kutsua palvelinta eksplisiittisesti listatakseen sen työkalut, resurssit ja kehotteet. Tämä ei kuitenkaan ole kovin käytännöllinen lähestymistapa. Käyttäjäsi elävät agenttimaisessa aikakaudessa ja odottavat käyttävänsä kehotteita ja kommunikoivansa LLM:n kanssa sen sijaan. Heitä ei kiinnosta, käytätkö MCP:tä mahdollisuuksiesi tallentamiseen; he odottavat yksinkertaisesti vuorovaikuttavansa luonnollisella kielellä. Miten ratkaistaan tämä? Ratkaisu on lisätä LLM asiakkaaseen.

## Yleiskatsaus

Tässä oppitunnissa keskitymme lisäämään LLM:n asiakkaaseesi ja näytämme, miten tämä tarjoaa paljon paremman käyttökokemuksen käyttäjälle.

## Oppimistavoitteet

Tämän oppitunnin lopuksi osaat:

- Luoda asiakkaan, jossa on LLM.
- Vuorovaikuttaa saumattomasti MCP-palvelimen kanssa käyttäen LLM:ää.
- Tarjota parempaa loppukäyttäjän käyttökokemusta asiakkaan puolella.

## Lähestymistapa

Yritetään ymmärtää, mitä lähestymistapaa meidän tulee käyttää. LLM:n lisääminen kuulostaa yksinkertaiselta, mutta toteutammeko sen oikeasti?

Tässä, miten asiakas vuorovaikuttaa palvelimen kanssa:

1. Yhdistä palvelimeen.

1. Listaa ominaisuudet, kehotteet, resurssit ja työkalut ja tallenna niiden skeema.

1. Lisää LLM ja anna tallennetut ominaisuudet ja niiden skeema muodossa, jonka LLM ymmärtää.

1. Käsittele käyttäjän kehotteita välittämällä ne LLM:lle yhdessä asiakkaan listaamien työkalujen kanssa.

Hienoa, nyt kun ymmärrämme tämän korkean tason prosessin, kokeillaan se käytännössä alla olevassa harjoituksessa.

## Harjoitus: Asiakkaan luominen LLM:llä

Tässä harjoituksessa opimme lisäämään LLM:n asiakkaaseemme.

### Todennus GitHubin henkilökohtaisella pääsytunnuksella

GitHub-tunnuksen luominen on suoraviivainen prosessi. Näin teet sen:

- Mene GitHubin asetuksiin – Klikkaa profiilikuvakettasi oikeassa yläkulmassa ja valitse Settings.
- Siirry kehittäjäasetuksiin – Selaa alas ja klikkaa Developer Settings.
- Valitse Personal Access Tokens – Klikkaa Fine-grained tokens ja sitten Generate new token.
- Määritä tunnuksesi – Lisää muistiinpano, aseta vanhentumispäivä ja valitse tarvittavat oikeudet. Tässä tapauksessa varmista, että Models-oikeus on mukana.
- Luo ja kopioi tunnus – Klikkaa Generate token ja kopioi se heti, koska et näe sitä uudelleen.

### -1- Yhdistä palvelimeen

Luodaan ensin asiakkaamme:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Tuo zod skeeman validointia varten

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

Edellisessä koodissa olemme:

- Tuoneet tarvittavat kirjastot
- Luoneet luokan, jolla on kaksi jäsentä, `client` ja `openai`, jotka auttavat hallitsemaan asiakasta ja vuorovaikuttamaan LLM:n kanssa.
- Konfiguroineet LLM-instanssimme käyttämään GitHub-malleja asettamalla `baseUrl` osoittamaan inference API:iin.

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# Luo palvelinparametrit stdio-yhteydelle
server_params = StdioServerParameters(
    command="mcp",  # Suoritettava tiedosto
    args=["run", "server.py"],  # Valinnaiset komentoriviparametrit
    env=None,  # Valinnaiset ympäristömuuttujat
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # Alusta yhteys
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

Edellisessä koodissa olemme:

- Tuoneet MCP-kirjaston tarvitsemat kirjastot
- Luoneet asiakkaan

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

Ensiksi sinun tulee lisätä LangChain4j-riippuvuudet `pom.xml`-tiedostoosi. Lisää nämä riippuvuudet mahdollistamaan MCP-integraation ja GitHub-mallien tuen:

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

Luo sitten Java-asiakasluokkasi:

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
    
    public static void main(String[] args) throws Exception {        // Määritä LLM käyttämään GitHub-malleja
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // Luo MCP-yhteys palvelimeen yhdistämistä varten
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // Luo MCP-asiakas
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

Edellisessä koodissa olemme:

- **Lisänneet LangChain4j-riippuvuudet**: MCP-integraatiota, OpenAI:n virallista asiakasta ja GitHub-mallien tukea varten
- **Tuoneet LangChain4j-kirjastot**: MCP-integraatiota ja OpenAI-chat-mallin toiminnallisuutta varten
- **Luoneet `ChatLanguageModel`-olion**: Konfiguroitu käyttämään GitHub-malleja GitHub-tunnuksellasi
- **Määrittäneet HTTP-siirron**: Käyttämällä Server-Sent Events (SSE) MCP-palvelimeen yhdistämiseen
- **Luoneet MCP-asiakkaan**: Joka hoitaa kommunikoinnin palvelimen kanssa
- **Käyttäneet LangChain4j:n sisäänrakennettua MCP-tukea**: Joka yksinkertaistaa LLM:n ja MCP-palvelimen integraatiota

#### Rust

Tässä esimerkissä oletetaan, että sinulla on Rust-pohjainen MCP-palvelin käynnissä. Jos sinulla ei ole sellaista, palaa takaisin [01-first-server](../01-first-server/README.md) -oppitunnille palvelimen luomiseksi.

Kun sinulla on Rust MCP -palvelin, avaa terminaali ja siirry samaan hakemistoon kuin palvelin. Suorita sitten seuraava komento luodaksesi uuden LLM-asiakasprojektin:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

Lisää seuraavat riippuvuudet `Cargo.toml`-tiedostoosi:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> Virallista OpenAI-kirjastoa Rustille ei ole, mutta `async-openai` crate on [yhteisön ylläpitämä kirjasto](https://platform.openai.com/docs/libraries/rust#rust), jota käytetään yleisesti.

Avaa `src/main.rs`-tiedosto ja korvaa sen sisältö seuraavalla koodilla:

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
    // Alkuviesti
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // Aseta OpenAI-asiakas
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // Aseta MCP-asiakas
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

    // TEHTÄVÄ: Hanki MCP-työkaluluettelo

    // TEHTÄVÄ: LLM-keskustelu työkalupyyntöjen kanssa

    Ok(())
}
```

Tämä koodi määrittää yksinkertaisen Rust-sovelluksen, joka yhdistää MCP-palvelimeen ja GitHub-malleihin LLM-vuorovaikutuksia varten.

> [!IMPORTANT]
> Muista asettaa ympäristömuuttuja `OPENAI_API_KEY` GitHub-tunnuksellasi ennen sovelluksen käynnistämistä.

Hienoa, seuraavassa vaiheessa listaamme palvelimen ominaisuudet.

### -2- Listaa palvelimen ominaisuudet

Nyt yhdistämme palvelimeen ja pyydämme sen ominaisuuksia:

#### Typescript

Lisää samassa luokassa seuraavat metodit:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // työkalujen listaaminen
    const toolsResult = await this.client.listTools();
}
```

Edellisessä koodissa olemme:

- Lisänneet koodin, jolla yhdistetään palvelimeen, `connectToServer`.
- Luoneet `run`-metodin, joka vastaa sovelluksen työnkulusta. Tähän asti se listaa vain työkalut, mutta lisäämme siihen pian lisää.

#### Python

```python
# Listaa saatavilla olevat resurssit
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# Listaa saatavilla olevat työkalut
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

Tässä mitä lisäsimme:

- Listattiin resurssit ja työkalut ja tulostimme ne. Työkaluista listattiin myös `inputSchema`, jota käytämme myöhemmin.

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

Edellisessä koodissa olemme:

- Listanneet MCP-palvelimen saatavilla olevat työkalut
- Listanneet kullekin työkalulle nimen, kuvauksen ja skeeman. Viimeksi mainittua käytämme myöhemmin työkalujen kutsumisessa.

#### Java

```java
// Luo työkaluntarjoaja, joka löytää MCP-työkalut automaattisesti
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP-työkaluntarjoaja käsittelee automaattisesti:
// - Saatavilla olevien työkalujen listaaminen MCP-palvelimelta
// - MCP-työkalujen kaavioiden muuntaminen LangChain4j-muotoon
// - Työkalujen suorituksen ja vastausten hallinta
```

Edellisessä koodissa olemme:

- Luoneet `McpToolProvider`-luokan, joka automaattisesti löytää ja rekisteröi kaikki MCP-palvelimen työkalut
- Työkaluntarjoaja hoitaa LTC-työkalujen ja LangChain4j:n työkalumuodon muunnoksen sisäisesti
- Tämä lähestymistapa piilottaa manuaalisen työkalulistan ja muunnosprosessin

#### Rust

Työkalujen hakeminen MCP-palvelimelta tehdään `list_tools`-metodilla. Lisää `main`-funktiossa MCP-asiakkaan määrittelyn jälkeen seuraava koodi:

```rust
// Hae MCP-työkaluluettelo
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- Muunna palvelimen ominaisuudet LLM-työkaluiksi

Seuraava vaihe palvelimen ominaisuuksien listaamisen jälkeen on muuntaa ne LLM:n ymmärtämään muotoon. Kun olemme tehneet tämän, voimme tarjota nämä ominaisuudet LLM:lle työkaluina.

#### TypeScript

1. Lisää seuraava koodi, jolla muunnetaan MCP-palvelimen vastaus formattiin, jota LLM voi käyttää:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // Luo zod-skeema perustuen input_schemaan
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // Aseta tyyppi nimenomaisesti arvoksi "function"
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

    Yllä oleva koodi ottaa MCP-palvelimen vastauksen ja muuntaa sen työkalumäärittelyksi, jonka LLM ymmärtää.

2. Päivitetään seuraavaksi `run`-metodi listaamaan palvelimen ominaisuudet:

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

    Edellisessä koodissa päivitimme `run`-metodin käymään tuloksen läpi ja kutsumaan jokaiselle merkinnälle `openAiToolAdapter`-funktiota.

#### Python

1. Luodaan ensin seuraava muunnosfunktio:

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

    Yllä olevassa `convert_to_llm_tools`-funktiossa otetaan MCP-työkaluvastaus ja muunnetaan se muotoon, jonka LLM ymmärtää.

2. Päivitetään seuraavaksi asiakaskoodimme käyttämään tätä funktiota näin:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    Tässä lisäämme kutsun `convert_to_llm_tool` -funktiolle muuntaaksemme MCP-työkaluvastauksen muotoon, jonka voimme syöttää LLM:lle myöhemmin.

#### .NET

1. Lisätään koodi, jolla muunnetaan MCP-työkaluvastaus muotoon, jonka LLM ymmärtää:

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

Edellisessä koodissa olemme:

- Luoneet funktion `ConvertFrom`, joka ottaa nimen, kuvauksen ja syöteskeeman.
- Määrittäneet toiminnallisuuden, joka luo `FunctionDefinition`-olion, joka välitetään `ChatCompletionsDefinition`-olioon, jonka LLM ymmärtää.

2. Katsotaan, miten voimme päivittää olemassa olevaa koodia hyödyntämään tätä funktiota:

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
// Luo bottirajapinta luonnollisen kielen vuorovaikutukseen
public interface Bot {
    String chat(String prompt);
}

// Määritä tekoälypalvelu LLM- ja MCP-työkaluilla
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

Edellisessä koodissa olemme:

- Määritelleet yksinkertaisen `Bot`-rajapinnan luonnollisen kielen vuorovaikutukseen
- Käyttäneet LangChain4j:n `AiServices`-luokkaa sitomaan LLM:n automaattisesti MCP-työkaluntarjoajaan
- Kehys hoitaa automaattisesti työkaluskeeman muunnokset ja funktiokutsut taustalla
- Tämä lähestymistapa poistaa manuaalisen työkalumuunnoksen tarpeen – LangChain4j hoitaa koko MCP-työkalujen muunnosprosessin LLM-yhteensopivaan muotoon

#### Rust

Muuntaaksemme MCP-työkaluvastauksen LLM:n ymmärtämään muotoon, lisäämme apufunktion, joka muotoilee työkalulistan. Lisää seuraava koodi `main.rs`-tiedostoon `main`-funktion alle. Tätä kutsutaan, kun teemme pyyntöjä LLM:lle:

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

Hienoa, nyt olemme valmiita käsittelemään käyttäjän pyyntöjä, joten siirrytään siihen.

### -4- Käsittele käyttäjän kehotteet

Tässä osiossa käsittelemme käyttäjän pyyntöjä.

#### TypeScript

1. Lisää metodi, joka kutsuu LLM:ää:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. Kutsu palvelimen työkalua
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Tee jotain tuloksella
        // TEE

        }
    }
    ```

    Edellisessä koodissa olemme:

    - Lisänneet metodin `callTools`.
    - Metodi ottaa LLM-vastauksen ja tarkistaa, mitä työkaluja on mahdollisesti kutsuttu:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // kutsu työkalu
        }
        ```

    - Kutsuu työkalua, jos LLM osoittaa, että sitä pitäisi kutsua:

        ```typescript
        // 2. Kutsu palvelimen työkalua
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Tee jotain tuloksella
        // TEHTÄVÄ
        ```

2. Päivitä `run`-metodi sisällyttämään LLM:n kutsut ja `callTools`-metodin kutsu:

    ```typescript

    // 1. Luo viestit, jotka ovat syötteitä LLM:lle
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. Kutsu LLM:ää
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. Käy läpi LLM:n vastaus, tarkista jokaisesta valinnasta, sisältääkö se työkalukutsuja
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

Hienoa, katsotaan koko koodi kokonaisuudessaan:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Tuo zod skeeman validointia varten

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // voi olla tarve vaihtaa tähän URL-osoitteeseen tulevaisuudessa: https://models.github.ai/inference
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
          // Luo zod-skeema input_schema:n perusteella
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // Aseta tyyppi selkeästi "function"
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
    
    
          // 2. Kutsu palvelimen työkalua
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. Tee jotain tuloksella
          // TEHTÄVÄ TÄHÄN
    
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
    
        // 3. Käy LLM-vastaus läpi, tarkista kunkin valinnan osalta onko siinä työkalukutsuja
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

1. Lisätään ensin tarvittavat importit LLM:n kutsua varten:

    ```python
    # suuri kielimalli
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. Seuraavaksi lisätään funktio, joka kutsuu LLM:ää:

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
            # Valinnaiset parametrit
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

    Edellisessä koodissa olemme:

    - Välittäneet funktiomme, jotka löysimme MCP-palvelimelta ja jotka muunsimme, LLM:lle.
    - Sitten kutsuneet LLM:ää näillä funktioilla.
    - Tarkastelleet tulosta nähdäkseni, mitä funktioita tulisi kutsua, jos mitään.
    - Lopuksi välittäneet listan kutsuttavista funktioista.

3. Viimeinen vaihe, päivitetään pääkoodimme:

    ```python
    prompt = "Add 2 to 20"

    # kysy LLM:ltä, mitä työkaluja on käytettävissä, jos on
    functions_to_call = call_llm(prompt, functions)

    # kutsu ehdotettuja funktioita
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    Siinä se, yllä olevassa koodissa olemme:

    - Kutsuneet MCP-työkalua `call_tool`-metodilla käyttäen sitä funktiota, jonka LLM arvioi tarvitsevansa kehotteen perusteella.
    - Tulostaneet työkalukutsun tuloksen MCP-palvelimelle.

#### .NET

1. Näytetään koodi LLM-kehotteen käsittelyyn:

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

    Edellisessä koodissa olemme:

    - Hainet työkalut MCP-palvelimelta, `var tools = await GetMcpTools()`.
    - Määritelleet käyttäjän kehotteen `userMessage`.
    - Rakentaneet options-objektin, jossa määritellään malli ja työkalut.
    - Tehneet pyynnön LLM:lle.

2. Vielä yksi vaihe, tarkistetaan, pitäisikö LLM:n mukaan kutsua funktiota:

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

    Edellisessä koodissa olemme:

    - Käyneet läpi listan funktiokutsuja.
    - Jokaiselle työkalukutsulle otetaan nimi ja argumentit ja kutsutaan työkalua MCP-palvelimella MCP-asiakkaan kautta. Lopuksi tulostamme tulokset.

Tässä koko koodi:

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
    // Suorita luonnollisen kielen pyyntöjä, jotka käyttävät automaattisesti MCP-työkaluja
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

Edellisessä koodissa olemme:

- Käyttäneet yksinkertaisia luonnollisen kielen kehotteita MCP-palvelimen työkaluihin vuorovaikuttamiseen
- LangChain4j-kehys hoitaa automaattisesti:
  - Käyttäjäkehotteiden muuntamisen työkalukutsuiksi tarvittaessa
  - Sopivien MCP-työkalujen kutsumisen LLM:n päätöksen perusteella
  - Keskustelun hallinnan LLM:n ja MCP-palvelimen välillä
- `bot.chat()`-metodi palauttaa luonnollisen kielen vastauksia, jotka voivat sisältää tuloksia MCP-työkalujen suorittamisesta
- Tämä lähestymistapa tarjoaa saumattoman käyttäjäkokemuksen, jossa käyttäjien ei tarvitse tuntea MCP:n taustalla olevaa toteutusta

Täydellinen koodiesimerkki:

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

Tässä tapahtuu suurin osa työstä. Kutsumme LLM:ää alkuperäisellä käyttäjän kehotteella, sitten käsittelemme vastauksen tarkistaaksemme, pitääkö työkaluja kutsua. Jos pitää, kutsumme ne työkalut ja jatkamme keskustelua LLM:n kanssa, kunnes työkaluja ei enää tarvita ja saamme lopullisen vastauksen.

Teemme useita LLM-kutsuja, joten määritellään funktio, joka hoitaa LLM:n kutsun. Lisää seuraava funktio `main.rs`-tiedostoon:

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

Tämä funktio ottaa LLM-asiakkaan, viestilistan (sisältäen käyttäjän kehotteen), MCP-palvelimen työkalut ja lähettää pyynnön LLM:lle, palauttaen vastauksen.
LLM:n vastaus sisältää taulukon `choices`. Meidän täytyy käsitellä tulos nähdäksesi, onko `tool_calls` läsnä. Tämä kertoo meille, että LLM pyytää tietyn työkalun kutsumista argumenteilla. Lisää seuraava koodi `main.rs`-tiedostosi loppuun määrittääksesi funktion, joka käsittelee LLM-vastauksen:

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

    // Tulosta sisältö, jos saatavilla
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // Käsittele työkalukutsut
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // Lisää avustajan viesti

        // Suorita jokainen työkalukutsu
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // Lisää työkalun tulos viesteihin
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // Jatka keskustelua työkalutulosten kanssa
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

Jos `tool_calls` ovat läsnä, se poimii työkalutiedot, kutsuu MCP-palvelinta työkalupyynnöllä ja lisää tulokset keskustelun viesteihin. Sen jälkeen keskustelu jatkuu LLM:n kanssa ja viestit päivitetään avustajan vastauksella ja työkalukutsujen tuloksilla.

Poimiaksemme työkalukutsutiedot, joita LLM palauttaa MCP-kutsuille, lisäämme toisen apufunktion, joka hakee kaiken tarvittavan kutsun tekemiseen. Lisää seuraava koodi `main.rs`-tiedostosi loppuun:

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

Kun kaikki osat ovat paikallaan, voimme nyt käsitellä alkuperäisen käyttäjän kehotteen ja kutsua LLM:ää. Päivitä `main`-funktiosi sisältämään seuraava koodi:

```rust
// LLM-keskustelu työkalukutsuilla
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

Tämä lähettää LLM:lle alkuperäisen käyttäjän kehotteen, jossa pyydetään kahden luvun summaa, ja prosessoi vastauksen käsitelläkseen työkalukutsuja dynaamisesti.

Hienoa, onnistuit!

## Tehtävä

Ota harjoituksesta koodi ja rakennetaan palvelin, jossa on enemmän työkaluja. Luo sitten asiakas, jossa on LLM, kuten harjoituksessa, ja testaa erilaisilla kehotteilla varmistaaksesi, että kaikki palvelimesi työkalut kutsutaan dynaamisesti. Tämän tyyppinen asiakkaan rakentaminen tarjoaa loppukäyttäjälle erinomaisen käyttökokemuksen, koska he voivat käyttää kehotteita tarkkojen asiakaskomentojen sijaan eivätkä näe MCP-palvelimen kutsuja.

## Ratkaisu

[Ratkaisu](./solution/README.md)

## Tärkeimmät opit

- LLM:n lisääminen asiakkaaseesi tarjoaa paremman tavan käyttäjien vuorovaikutukseen MCP-palvelinten kanssa.
- MCP-palvelimen vastaus pitää muuntaa LLM:n ymmärtämään muotoon.

## Esimerkit

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)
- [Rust Calculator](../../../../03-GettingStarted/samples/rust)

## Lisäresurssit

## Seuraavaksi

- Seuraavaksi: [Palvelimen käyttäminen Visual Studio Codella](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->