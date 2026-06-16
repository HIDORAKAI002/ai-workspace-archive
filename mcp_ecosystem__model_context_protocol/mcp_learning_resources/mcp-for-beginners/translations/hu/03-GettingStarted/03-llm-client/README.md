# Ügyfél létrehozása LLM-mel

Eddig láthattad, hogyan lehet szervert és klienst létrehozni. A kliens eddig képes volt explicit módon hívni a szervert, hogy listázza az eszközeit, erőforrásait és promptjait. Ez azonban nem túl praktikus megközelítés. A felhasználóid az ügynöki korszakban élnek, és azt várják, hogy promtokat használjanak és kommunikáljanak egy LLM-mel. Nem érdekli őket, hogy MCP-t használsz-e a képességeid tárolására; egyszerűen azt várják, hogy természetes nyelven kommunikáljanak. Hogyan oldjuk meg ezt? A megoldás, hogy egy LLM-et adunk hozzá az ügyfélhez.

## Áttekintés

Ebben a leckében az LLM hozzáadására fókuszálunk az ügyfélhez, és bemutatjuk, hogy ez hogyan biztosít sokkal jobb élményt a felhasználód számára.

## Tanulási célok

Ennek a leckének a végére képes leszel:

- Létrehozni egy ügyfelet LLM-mel.
- Zökkenőmentesen kommunikálni egy MCP szerverrel LLM használatával.
- Jobb végfelhasználói élményt nyújtani az ügyfél oldalon.

## Megközelítés

Próbáljuk megérteni, milyen megközelítést kell alkalmaznunk. Egy LLM hozzáadása egyszerűnek hangzik, de tényleg meg is fogjuk ezt valósítani?

Így fog a kliens a szerverrel kommunikálni:

1. Kapcsolat kialakítása a szerverrel.

1. Képességek, promtok, erőforrások és eszközök listázása, majd a séma elmentése.

1. LLM hozzáadása és a mentett képességek és sémáik átadása oly módon, hogy az LLM megértse azt.

1. Felhasználói prompt kezelés, amit az LLM-nek átadunk az ügyfél által listázott eszközökkel együtt.

Remek, most hogy nagy vonalakban értjük, hogyan tehetjük ezt, próbáljuk ki a következő gyakorlatban.

## Gyakorlat: Ügyfél létrehozása LLM-mel

Ebben a gyakorlatban megtanuljuk, hogyan adjunk hozzá LLM-et az ügyfelünkhöz.

### Hitelesítés GitHub személyes hozzáférési tokennel

Egy GitHub token létrehozása egyszerű folyamat. Íme, hogyan teheted meg:

- Menj a GitHub beállításokhoz – Kattints a profilképedre a jobb felső sarokban, majd válaszd a Beállítások menüpontot.
- Navigálj a Fejlesztői beállításokhoz – Görgess le és kattints a Fejlesztői beállításokra.
- Válaszd a Személyes hozzáférési tokeneket – Kattints a Finoman szabályozott tokenekre, majd az Új token generálása gombra.
- Konfiguráld a tokened – Adj egy megjegyzést hivatkozásként, állítsd be a lejárati dátumot, és válaszd ki a szükséges jogosultságokat. Ebben az esetben győződj meg arról, hogy a Modellek engedélyt is megadod.
- Generálás és másolás – Kattints a Token generálása gombra, és azonnal másold ki, mert később már nem látod újra.

### -1- Kapcsolódás a szerverhez

Először hozzuk létre ügyfelünket:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Zod importálása séma érvényesítéshez

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

A fenti kódban:

- Importáltuk a szükséges könyvtárakat.
- Létrehoztunk egy osztályt két taggal, `client` és `openai`, amelyek segítenek az ügyfél menedzselésében és az LLM-mel való interakcióban.
- Beállítottuk az LLM példányunkat, hogy a GitHub Modelleket használja azzal, hogy az `baseUrl`-t az inferencia API-ra irányítottuk.

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# Szerverparaméterek létrehozása stdio kapcsolat számára
server_params = StdioServerParameters(
    command="mcp",  # Futtatható állomány
    args=["run", "server.py"],  # Opcionális parancssori argumentumok
    env=None,  # Opcionális környezeti változók
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # A kapcsolat inicializálása
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

A fenti kódban:

- Importáltuk az MCP használatához szükséges könyvtárakat.
- Létrehoztunk egy ügyfelet.

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

Először add hozzá a LangChain4j függőségeket a `pom.xml` fájlodhoz. Add hozzá ezeket a függőségeket az MCP integráció és GitHub Modellek támogatás engedélyezéséhez:

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

Ezután hozd létre a Java kliens osztályod:

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
    
    public static void main(String[] args) throws Exception {        // Állítsa be az LLM-et GitHub Modellek használatára
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // Hozzon létre MCP átvitelt a szerverhez való kapcsolódáshoz
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // Hozzon létre MCP klienst
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

A fenti kódban:

- **Hozzáadtuk a LangChain4j függőségeket**: amelyek szükségesek az MCP integrációhoz, az OpenAI hivatalos klienshez és a GitHub Modellek támogatásához
- **Importáltuk a LangChain4j könyvtárakat**: az MCP integrációhoz és az OpenAI chat modell funkciókhoz
- **Létrehoztunk egy `ChatLanguageModel`-t**: konfigurálva a GitHub Modellek használatára a GitHub tokeneddel
- **Beállítottuk az HTTP transzportot**: Server-Sent Events (SSE) használatával a MCP szerverhez való kapcsolódáshoz
- **Létrehoztunk egy MCP klienst**: amely kezeli a kommunikációt a szerverrel
- **Használtuk a LangChain4j beépített MCP támogatását**: amely egyszerűsíti az LLM-ek és MCP szerverek közötti integrációt

#### Rust

Ez a példa feltételezi, hogy van egy Rust alapú MCP szervered futtatva. Ha nincs, nézd meg az [01-first-server](../01-first-server/README.md) leckét a szerver létrehozásához.

Miután megvan a Rust MCP szerver, nyiss meg egy terminált és navigálj arra a könyvtárra, ahol a szerver található. Futtasd a következő parancsot, hogy létrehozz egy új LLM kliens projektet:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

Add hozzá a következő függőségeket a `Cargo.toml` fájlodhoz:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> Nincs hivatalos Rust könyvtár az OpenAI-hoz, azonban az `async-openai` crate egy [közösség által karbantartott könyvtár](https://platform.openai.com/docs/libraries/rust#rust), amit gyakran használnak.

Nyisd meg a `src/main.rs` fájlt és cseréld le a tartalmát az alábbi kódra:

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
    // Kezdő üzenet
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // OpenAI kliens beállítása
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // MCP kliens beállítása
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

    // TEENDŐ: Szerezze be az MCP eszközlistát

    // TEENDŐ: LLM beszélgetés eszközhívásokkal

    Ok(())
}
```

Ez a kód beállít egy alapvető Rust alkalmazást, ami kapcsolódik az MCP szerverhez és a GitHub Modellekhez az LLM-interakciókhoz.

> [!IMPORTANT]
> Győződj meg róla, hogy az `OPENAI_API_KEY` környezeti változó a GitHub tokenedre van állítva, mielőtt futtatod az alkalmazást.

Szuper, a következő lépésünk, hogy listázzuk a szerver képességeit.

### -2- A szerver képességeinek listázása

Most kapcsolódunk a szerverhez és kérjük le a képességeket:

#### TypeScript

Ugyanabban az osztályban add hozzá a következő metódusokat:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // eszközök listázása
    const toolsResult = await this.client.listTools();
}
```

A fenti kódban:

- Hozzáadtuk a szerverhez történő kapcsolódás kódját, `connectToServer`.
- Létrehoztunk egy `run` metódust, amely kezeli az alkalmazásunk folyamatát. Egyelőre csak az eszközöket listázza, de hamarosan többet fogunk hozzáadni.

#### Python

```python
# Elérhető erőforrások listázása
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# Elérhető eszközök listázása
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

Ezt adtuk hozzá:

- Listáztuk az erőforrásokat és eszközöket, majd kiírtuk őket. Az eszközöknél listázzuk az `inputSchema`-t is, amit később használunk.

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

A fenti kódban:

- Listáztuk a MCP szerveren elérhető eszközöket.
- Minden eszközhöz listáztuk a nevét, leírását és a sémáját. Ezt fogjuk használni az eszközök hívásához hamarosan.

#### Java

```java
// Hozzon létre egy eszközszolgáltatót, amely automatikusan felfedezi az MCP eszközöket
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// Az MCP eszközszolgáltató automatikusan kezeli:
// - Az MCP szerverről elérhető eszközök listázását
// - Az MCP eszköz sémák LangChain4j formátumba történő átalakítását
// - Az eszköz végrehajtásának és válaszainak kezelését
```

A fenti kódban:

- Létrehoztunk egy `McpToolProvider`-t, ami automatikusan felfedezi és regisztrál minden eszközt az MCP szerverről.
- Az eszközszolgáltató kezeli az MCP eszköz sémák és a LangChain4j eszköz formátuma közti átalakítást belsőleg.
- Ez a megközelítés elrejti az eszközök manuális listázásának és átalakításának folyamatát.

#### Rust

Az eszközök lekérése az MCP szerverről az `list_tools` metódussal történik. A `main` függvényedben, miután beállítottad az MCP klienst, add hozzá a következő kódot:

```rust
// MCP eszközlistázás lekérése
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- A szerver képességeinek konvertálása LLM eszközökké

A következő lépés a szerver képességeinek listázása után az, hogy átalakítsuk őket az LLM által érthető formátumba. Ha ez megvan, ezeket az eszközöket tudjuk az LLM-nek átadni.

#### TypeScript

1. Add hozzá a következő kódot, amely az MCP szerver válaszát átalakítja olyan eszköz formátummá, amit az LLM tud használni:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // Hozzon létre egy zod sémát az input_schema alapján
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // Különösen állítsa be a típust "function"-re
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

    A fenti kód az MCP szerver válaszát eszközdefinícióvá konvertálja, amit az LLM ért.

2. Frissítsük a `run` metódust, hogy listázza a szerver képességeit:

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

    A fenti kódban a `run` metódust frissítettük, hogy végigiteráljon az eredményen, és minden bejegyzésen meghívja az `openAiToolAdapter`-t.

#### Python

1. Először hozzuk létre a következő konvertáló függvényt:

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

    A `convert_to_llm_tools` függvény átvesz egy MCP eszköz válaszát és konvertálja olyan formátumba, amit az LLM megért.

2. Ezután frissítjük az ügyfél kódját, hogy használja ezt a függvényt, így:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    Itt hozzáadtunk egy hívást a `convert_to_llm_tool`-ra, hogy az MCP eszköz választ át tudjuk adni az LLM-nek később.

#### .NET

1. Adjunk hozzá kódot, hogy az MCP eszköz válaszát konvertáljuk olyan formátumba, amit az LLM megért:

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

A fenti kódban:

- Létrehoztunk egy `ConvertFrom` függvényt, ami átveszi a nevet, leírást és input sémát.
- Meghatároztuk a funkcionalitást, ami egy FunctionDefinition-t hoz létre, ami átadódik egy ChatCompletionsDefinition-nek. Ez utóbbit ért az LLM.

2. Nézzük meg, hogyan frissíthetünk meglévő kódot, hogy kihasználjuk ezt a fenti függvényt:

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
// Bot felület létrehozása természetes nyelvű interakcióhoz
public interface Bot {
    String chat(String prompt);
}

// AI szolgáltatás konfigurálása LLM és MCP eszközökkel
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

A fenti kódban:

- Létrehoztunk egy egyszerű `Bot` interfészt a természetes nyelvű interakciókhoz
- Használtuk a LangChain4j `AiServices`-ét, hogy automatikusan kötse össze az LLM-et az MCP eszköz szolgáltatóval
- A keretrendszer automatikusan kezeli az eszköz séma konverziót és a függvényhívásokat a háttérben
- Ez a megközelítés kiküszöböli a manuális eszköz konvertálást – a LangChain4j kezeli az összes összetett MCP eszköz LLM-kompatibilissé alakítását

#### Rust

Az MCP eszköz válaszának konvertálásához olyan formátumba, amit az LLM megért, hozzáadunk egy segédfüggvényt, ami formázza az eszközlistát. Add hozzá a következő kódot a `main.rs` fájlba a `main` függvény alatt. Ezt fogjuk hívni, amikor kérést teszünk az LLM-nek:

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

Remek, most már készen állunk a felhasználói kérések kezelésére, foglalkozzunk ezzel a következő lépésként.

### -4- Felhasználói prompt kezelés

Ebben a kódrészletben kezeljük a felhasználói kéréseket.

#### TypeScript

1. Adj hozzá egy metódust, ami az LLM hívására szolgál:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. Hívja meg a szerver eszközét
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Tegyen valamit az eredménnyel
        // TEENDŐ

        }
    }
    ```

    A fenti kódban:

    - Hozzáadtunk egy `callTools` metódust.
    - Ez a metódus megvizsgálja az LLM választ, hogy mely eszközöket kell meghívni, ha vannak ilyenek:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // eszköz hívása
        }
        ```

    - Meghívja az eszközt, ha az LLM jelzi, hogy meg kell hívni:

        ```typescript
        // 2. Hívja meg a szerver eszközét
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Tegyen valamit az eredménnyel
        // TEENDŐ
        ```

2. Frissítsd a `run` metódust, hogy tartalmazza az LLM hívást és a `callTools` meghívását:

    ```typescript

    // 1. Üzenetek létrehozása, amelyek a LLM bemenetei
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. A LLM meghívása
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. Végigmegyünk a LLM válaszán, minden választásnál ellenőrizzük, van-e eszközhívás
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

Szuper, nézzük meg az egész kódot:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Importáld a zod-ot séma validáláshoz

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // Lehet, hogy a jövőben át kell váltani erre az URL-re: https://models.github.ai/inference
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
          // Hozz létre egy zod sémát az input_schema alapján
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // Explicit módon állítsd be a típust "function"-re
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
    
    
          // 2. Hívd meg a szerver eszközét
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. Tegyél valamit az eredménnyel
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
    
        // 3. Menj végig az LLM válaszon, minden választásnál ellenőrizd, hogy vannak-e eszköz hívások
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

1. Adjunk hozzá néhány importot, ami szükséges az LLM hívásához:

    ```python
    # llm
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. Ezután adjuk hozzá a függvényt, ami hívja az LLM-et:

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
            # Választható paraméterek
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

    A fenti kódban:

    - Átadtuk az MCP szerveren talált és konvertált funkciókat az LLM-nek.
    - Ezután meghívtuk az LLM-et ezekkel a funkciókkal.
    - Megvizsgáljuk az eredményt, hogy mely funkciókat kell meghívni, ha vannak ilyenek.
    - Végül átadjuk a meghívandó funkciók tömbjét.

3. Végső lépésként frissítjük a fő kódot:

    ```python
    prompt = "Add 2 to 20"

    # kérdezd meg az LLM-et, milyen eszközöket használhat, ha van ilyen
    functions_to_call = call_llm(prompt, functions)

    # hívd meg a javasolt függvényeket
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

Itt végeztünk, a fenti kódban:

- Az MCP eszközt hívtuk `call_tool` segítségével egy olyan függvénnyel, amit az LLM úgy ítélt meg, hogy meg kell hívni a prompt alapján.
- Kiírtuk a MCP szerver eszközhívás eredményét.

#### .NET

1. Mutatunk kódot az LLM prompt kéréshez:

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

A fenti kódban:

- Lekértük az eszközöket az MCP szerverről, `var tools = await GetMcpTools()`.
- Definiáltunk egy felhasználói promptot `userMessage` néven.
- Konstruktor objektumot hoztunk létre, amely megadja a modellt és az eszközöket.
- Kérést küldtünk az LLM felé.

2. Egy utolsó lépés: ellenőrizzük, hogy az LLM szerint kell-e függvényt hívni:

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

A fenti kódban:

- Végigmentünk a függvényhívások listáján.
- Minden eszközhíváshoz kiolvastuk a nevet és az argumentumokat, majd meghívtuk az eszközt az MCP szerveren az MCP kliens segítségével. Végül kiírtuk az eredményt.

Íme a teljes kód:

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
    // Természetes nyelvű kérések végrehajtása, amelyek automatikusan használják az MCP eszközöket
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

A fenti kódban:

- Egyszerű természetes nyelvű promtokkal léptünk kapcsolatba az MCP szerver eszközeivel
- A LangChain4j keretrendszer automatikusan kezeli:
  - A felhasználói promptok átalakítását eszközhívásokká szükség esetén
  - A megfelelő MCP eszközök meghívását az LLM döntése alapján
  - A beszélgetési folyamat kezelését az LLM és az MCP szerver között
- A `bot.chat()` metódus természetes nyelvű válaszokat ad, amelyek tartalmazhatnak MCP eszköz végrehajtási eredményeket is
- Ez a megközelítés zökkenőmentes felhasználói élményt nyújt, ahol a felhasználóknak nem kell tudniuk az MCP háttérmegvalósításról

Teljes kód példa:

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

Itt történik az munka java része. Meghívjuk az LLM-et a kezdeti felhasználói prompttal, majd feldolgozzuk a választ, hogy lássuk, kell-e eszközt hívni. Ha igen, meghívjuk azokat az eszközöket, és folytatjuk a beszélgetést az LLM-mel, amíg nincs több eszközhívás és végleges választ kapunk.

Többször hívjuk meg az LLM-et, ezért definiáljunk egy függvényt, ami kezeli az LLM hívásokat. Add hozzá a következő függvényt a `main.rs` fájlodhoz:

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

Ez a függvény átveszi az LLM klienset, egy üzenetlistát (beleértve a felhasználói promptot), az MCP szerver eszközeit, és kérést küld az LLM-nek, majd visszaadja a választ.
Az LLM válasza egy `choices` tömböt tartalmaz. Feldolgoznunk kell az eredményt, hogy van-e benne `tool_calls`. Ez azt jelzi, hogy az LLM egy konkrét eszköz meghívását kéri argumentumokkal. Add hozzá a következő kódot a `main.rs` fájlod aljához, hogy definiálj egy függvényt az LLM válasz kezelésére:

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

    // Tartalom kiírása, ha elérhető
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // Eszközhívások kezelése
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // Asszisztens üzenet hozzáadása

        // Minden eszközhívás végrehajtása
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // Eszköz eredmény hozzáadása az üzenetekhez
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // A beszélgetés folytatása eszközeredményekkel
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
  
Ha vannak `tool_calls`, akkor kinyeri az eszközinformációkat, meghívja az MCP szervert az eszközkéréssel, és hozzáadja az eredményeket a beszélgetés üzeneteihez. Ezután folytatja a beszélgetést az LLM-mel, és az üzenetek frissülnek az asszisztens válaszával és az eszközhívás eredményeivel.

Ahhoz, hogy kinyerjük az eszközhívás információkat, amelyeket az LLM ad vissza MCP hívásokhoz, hozzáadunk egy másik segédfüggvényt, amely mindent kinyer, amire a híváshoz szükség van. Add hozzá a következő kódot a `main.rs` fájlod aljához:

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
  
Minden darab a helyén, most már kezelni tudjuk a kezdeti felhasználói parancsot és meghívhatjuk az LLM-et. Frissítsd a `main` függvényed a következő kód hozzáadásával:

```rust
// LLM beszélgetés eszközhívásokkal
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
  
Ez lekérdezi az LLM-et a kezdeti felhasználói feladattal, amely két szám összegét kéri, és feldolgozza a választ, hogy dinamikusan kezelje az eszközhívásokat.

Remek, kész vagy!

## Feladat

Vedd át a kódot a gyakorlatból, és építsd ki a szervert több eszközzel. Ezután hozz létre egy klienst LLM-mel, mint a gyakorlatban, és teszteld különféle parancsokkal, hogy megbizonyosodj róla, hogy a szervereszközeid dinamikusan meghívásra kerülnek. Ez a kliensépítési mód egy kiváló felhasználói élményt nyújt, mivel a végfelhasználó parancsszavak helyett szöveges utasításokat használhat, és nem kell tudnia arról, hogy az MCP szerver hívás folyik a háttérben.

## Megoldás

[Megoldás](./solution/README.md)

## Fontos tanulságok

- Az LLM hozzáadása a kliensedhez jobb interakciós lehetőséget biztosít az MCP szerverekkel.
- Konvertálnod kell az MCP szerver válaszát valami olyan formátumba, amit az LLM megért.

## Minták

- [Java Számológép](../samples/java/calculator/README.md)
- [.Net Számológép](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Számológép](../samples/javascript/README.md)
- [TypeScript Számológép](../samples/typescript/README.md)
- [Python Számológép](../../../../03-GettingStarted/samples/python)
- [Rust Számológép](../../../../03-GettingStarted/samples/rust)

## További források

## Mi jön ezután

- Következő: [Szerver használata Visual Studio Code-dal](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->