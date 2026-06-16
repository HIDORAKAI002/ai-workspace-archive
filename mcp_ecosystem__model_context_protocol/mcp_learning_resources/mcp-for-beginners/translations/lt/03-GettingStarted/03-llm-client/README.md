# Kliento kūrimas su LLM

Iki šiol matėte, kaip sukurti serverį ir klientą. Klientas galėjo aiškiai iškviesti serverį, kad gautų jo įrankių, išteklių ir raginimų sąrašą. Tačiau tai nėra labai praktiškas požiūris. Jūsų vartotojai gyvena agentų eroje ir tikisi naudoti raginimus bei bendrauti su LLM. Jiems nesvarbu, ar naudojate MCP savo galimybėms saugoti; jie tiesiog tikisi bendrauti naudojant natūralią kalbą. Taigi, kaip tai išspręsti? Sprendimas – į klientą pridėti LLM.

## Apžvalga

Šiame pamokoje mes sutelkiame dėmesį į LLM pridėjimą į jūsų klientą ir parodome, kaip tai suteikia daug geresnę patirtį jūsų vartotojui.

## Mokymosi tikslai

Pamokos pabaigoje jūs sugebėsite:

- Sukurti klientą su LLM.
- Sklandžiai bendrauti su MCP serveriu naudojant LLM.
- Užtikrinti geresnę galutinio vartotojo patirtį kliento pusėje.

## Požiūris

Pabandykime suprasti, kokio požiūrio reikia laikytis. LLM pridėjimas atrodo paprastas, bet ar tikrai tai padarysime?

Štai kaip klientas bendraus su serveriu:

1. Užmegzti ryšį su serveriu.

1. Išvardinti galimybes, raginimus, išteklius ir įrankius ir išsaugoti jų schemą.

1. Pridėti LLM ir perduoti išsaugotas galimybes bei jų schemą formatu, kurį supranta LLM.

1. Tvarkyti vartotojo raginimą perduodant jį LLM kartu su įrankiais, kuriuos išvardino klientas.

Puiku, dabar mes suprantame bendrą požiūrį, pabandykime tai išbandyti žemiau pateiktame uždavinyje.

## Užduotis: Kliento kūrimas su LLM

Šioje užduotyje mes išmoksime pridėti LLM prie mūsų kliento.

### Autentifikacija naudojant GitHub asmeninį prieigos tokeną

GitHub tokeno sukūrimas yra nesudėtingas procesas. Štai kaip tai padaryti:

- Eikite į GitHub nustatymus – spauskite savo profilio nuotrauką viršutiniame dešiniajame kampe ir pasirinkite Nustatymai.
- Eikite į kūrėjų nustatymus – slinkite žemyn ir spauskite Kūrėjų nustatymai.
- Pasirinkite Asmeninius prieigos tokenus – spauskite Fine-grained tokens ir tada Generate new token.
- Konfigūruokite savo tokeną – pridėkite užrašą atminčiai, nustatykite galiojimo datą ir pasirinkite reikiamus leidimus (scopes). Šiuo atveju būtinai pridėkite Models leidimą.
- Sugeneruokite ir nukopijuokite tokeną – spauskite Generate token ir būtinai iškart nukopijuokite, nes vėliau jo nematysite.

### -1- Prisijungimas prie serverio

Pirmiausia sukurkime savo klientą:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Importuokite zod schemai tikrinti

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

Aukščiau nurodytame kode mes:

- Importavome reikalingas bibliotekas
- Sukūrėme klasę su dviem nariais, `client` ir `openai`, kurie padės valdyti klientą ir bendrauti su LLM atitinkamai.
- Konfigūravome savo LLM instanciją naudoti GitHub Models, nustatydami `baseUrl`, kuris nurodo inference API.

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# Sukurkite serverio parametrus stdio ryšiui
server_params = StdioServerParameters(
    command="mcp",  # Vykdomasis failas
    args=["run", "server.py"],  # Pasirinktiniai komandinės eilutės argumentai
    env=None,  # Pasirinktiniai aplinkos kintamieji
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # Inicializuokite ryšį
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

Aukščiau nurodytame kode mes:

- Importavome reikalingas MCP bibliotekas
- Sukūrėme klientą

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

Pirmiausia turite pridėti LangChain4j priklausomybes į savo `pom.xml` failą. Pridėkite šias priklausomybes, kad įgalintumėte MCP integraciją ir GitHub Models palaikymą:

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

Tada sukurkite savo Java kliento klasę:

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
    
    public static void main(String[] args) throws Exception {        // Konfigūruokite LLM naudoti GitHub modelius
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // Sukurkite MCP transportą prisijungimui prie serverio
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // Sukurkite MCP klientą
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

Aukščiau nurodytame kode mes:

- **Pridėjome LangChain4j priklausomybes**: reikalingas MCP integracijai, oficialiam OpenAI klientui ir GitHub Models palaikymui
- **Importavome LangChain4j bibliotekas**: MCP integracijai ir OpenAI pokalbių modeliui
- **Sukūrėme `ChatLanguageModel`**: konfigūruotą naudoti GitHub Models su jūsų GitHub tokenu
- **Nustatėme HTTP transportą**: naudojant Server-Sent Events (SSE) ryšiui su MCP serveriu
- **Sukūrėme MCP klientą**: kuris valdys ryšį su serveriu
- **Naudojome LangChain4j integruotą MCP palaikymą**: kuris palengvina integraciją tarp LLM ir MCP serverių

#### Rust

Šis pavyzdys prielaida, kad turite Rust pagrindu veikiantį MCP serverį. Jeigu jo neturite, grįžkite į [01-first-server](../01-first-server/README.md) pamoką, kad serverį sukurtumėte.

Kai turėsite savo Rust MCP serverį, atidarykite terminalą ir pereikite į tą patį katalogą, kuriame yra serveris. Tada vykdykite šią komandą, kad sukurtumėte naują LLM kliento projektą:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

Pridėkite šias priklausomybes į savo `Cargo.toml` failą:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> Nėra oficialios Rust bibliotekos OpenAI, tačiau `async-openai` crate yra [bendruomenės palaikoma biblioteka](https://platform.openai.com/docs/libraries/rust#rust), kuri dažnai naudojama.

Atidarykite `src/main.rs` failą ir pakeiskite jo turinį šiuo kodu:

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
    // Pradinė žinutė
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // Nustatyti OpenAI klientą
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // Nustatyti MCP klientą
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

    // TODO: Gauti MCP įrankių sąrašą

    // TODO: LLM pokalbis su įrankių iškvietimais

    Ok(())
}
```

Šis kodas sukuria pagrindinę Rust programą, kuri jungiasi prie MCP serverio ir GitHub Models LLM sąveikoms.

> [!IMPORTANT]
> Prieš paleisdami programą būtinai nustatykite aplinkos kintamąjį `OPENAI_API_KEY` su savo GitHub tokenu.

Puiku, kitame žingsnyje išvardinsime serverio galimybes.

### -2- Serverio galimybių išvardinimas

Dabar prisijungsime prie serverio ir paprašysime jo galimybių:

#### Typescript

Toje pačioje klasėje pridėkite šiuos metodus:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // įrankių sąrašas
    const toolsResult = await this.client.listTools();
}
```

Aukščiau nurodytame kode mes:

- Pridėjome metodą serverio prisijungimui `connectToServer`.
- Sukūrėme `run` metodą, kuris yra atsakingas už programos srauto valdymą. Kol kas jis tik išvardina įrankius, bet netrukus pridėsime daugiau.

#### Python

```python
# Išvardinti prieinamus išteklius
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# Išvardinti prieinamus įrankius
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

Mes pridėjome:

- Išvardinome išteklius ir įrankius bei atspausdinome juos. Įrankiams taip pat išvardinome `inputSchema`, kurio vėliau naudosime.

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

Aukščiau nurodytame kode mes:

- Išvardinome įrankius, esančius MCP serveryje
- Kiekvienam įrankiui išvardinome pavadinimą, aprašymą ir jo schemą. Pastaroji bus naudojama kviečiant įrankius netrukus.

#### Java

```java
// Sukurkite įrankių tiekėją, kuris automatiškai atranda MCP įrankius
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP įrankių tiekėjas automatiškai tvarko:
// - Galimų įrankių sąrašą iš MCP serverio
// - MCP įrankių schemų konvertavimą į LangChain4j formatą
// - Įrankių vykdymo ir atsakymų valdymą
```

Aukščiau nurodytame kode mes:

- Sukūrėme `McpToolProvider`, kuris automatiškai atranda ir užregistruoja visus įrankius iš MCP serverio
- Įrankių tiekėjas viduje konvertuoja MCP įrankių schemas į LangChain4j įrankių formatą
- Šis požiūris abstrahuoja rankinį įrankių išvardinimą ir konvertavimą

#### Rust

Įrankių gavimas iš MCP serverio atliekamas naudojant `list_tools` metodą. Jūsų `main` funkcijoje, po MCP kliento sukūrimo, pridėkite šį kodą:

```rust
// Gauti MCP įrankių sąrašą
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- Serverio galimybių konvertavimas į LLM įrankius

Kitas žingsnis po serverio galimybių išvardinimo – konvertuoti jas į formatą, kuris suprantamas LLM. Kai tai padarysime, galėsime suteikti šias galimybes kaip įrankius mūsų LLM.

#### TypeScript

1. Pridėkite šį kodą, konvertuojantį MCP serverio atsakymą į įrankio formatą, kurį gali naudoti LLM:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // Sukurkite zod schemą pagal input_schema
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // Aiškiai nustatykite tipą kaip "function"
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

    Aukščiau pateiktas kodas priima MCP serverio atsakymą ir konvertuoja jį į įrankio apibrėžimo formatą, kurį LLM gali suprasti.

2. Atnaujinkime `run` metodą, kad jis išvardintų serverio galimybes:

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

    Aukščiau nurodytame kode atnaujinome `run` metodą, kad pereitų per rezultatą ir kiekvienam įrašui iškvietė `openAiToolAdapter`.

#### Python

1. Pirmiausia sukurkime šią konvertavimo funkciją

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

    Funkcijoje `convert_to_llm_tools` priimame MCP įrankio atsakymą ir konvertuojame jį į formatą, kurį gali suprasti LLM.

2. Tada atnaujinkime kliento kodą, kad naudotume šią funkciją taip:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    Čia pridedame kvietimą `convert_to_llm_tool`, kuris konvertuoja MCP įrankio atsakymą į tai, ką vėliau galime perduoti LLM.

#### .NET

1. Pridėkime kodą, kuris konvertuoja MCP įrankio atsakymą į formatą, kurį LLM gali suprasti:

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

Aukščiau nurodytame kode mes:

- Sukūrėme funkciją `ConvertFrom`, kuri priima pavadinimą, aprašymą ir įvesties schemą.
- Apibrėžėme funkcionalumą, kuris sukuria `FunctionDefinition`, perduodamą į `ChatCompletionsDefinition`. Pastarasis yra tai, ką gali suprasti LLM.

2. Pažiūrėkime, kaip galime atnaujinti esamą kodą, kad naudotume šią funkciją:

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
// Sukurkite botų sąsają natūralios kalbos sąveikai
public interface Bot {
    String chat(String prompt);
}

// Konfigūruokite AI paslaugą su LLM ir MCP įrankiais
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

Aukščiau nurodytame kode mes:

- Apibrėžėme paprastą `Bot` sąsają natūralios kalbos sąveikoms
- Naudojome LangChain4j `AiServices`, kad automatiškai sujungtume LLM su MCP įrankių tiekėju
- Frameworkas automatiškai tvarko įrankių schemų konvertavimą ir funkcijų kvietimą užkulisiuose
- Šis požiūris eliminuoja rankinį įrankių konvertavimą – LangChain4j tvarko visą MCP įrankių konvertavimo į LLM suderinamą formatą sudėtingumą

#### Rust

Kad konvertuotume MCP įrankio atsakymą į LLM suprantamą formatą, pridėsime pagalbinę funkciją, kuri formatuos įrankių sąrašą. Pridėkite šį kodą į `main.rs` failą, po `main` funkcijos. Jis bus naudojamas, siunčiant užklausas LLM:

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

Puiku, dabar esame pasiruošę tvarkyti vartotojo užklausas, tad imkimės to.

### -4- Vartotojo raginimo užklausos tvarkymas

Šioje kodo dalyje tvarkysime vartotojo užklausas.

#### TypeScript

1. Pridėkite metodą, kuris bus naudojamas kviesti mūsų LLM:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. Iškvieskite serverio įrankį
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Atlikite kažką su rezultatu
        // ATLIKTI

        }
    }
    ```

    Aukščiau nurodytame kode mes:

    - Pridėjome metodą `callTools`.
    - Metodas priima LLM atsakymą ir tikrina, kokius įrankius reikėjo kviesti, jei tokių yra:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // iškvietimo priemonė
        }
        ```

    - Iškviečia įrankį, jei LLM nurodo jį iškviesti:

        ```typescript
        // 2. Iškvieskite serverio įrankį
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Atlikite veiksmą su rezultatu
        // TODO
        ```

2. Atnaujinkime `run` metodą, kad įtrauktume kvietimus LLM ir `callTools` metodą:

    ```typescript

    // 1. Sukurkite žinutes, kurios yra įvestys LLM
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. Kvieskite LLM
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. Peržiūrėkite LLM atsakymą, kiekvienam pasirinkimui patikrinkite, ar jame yra įrankių kvietimų
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

Puiku, pateikiame visą kodą:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Importuoti zod schemai tikrinti

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // ateityje gali prireikti pakeisti į šį URL: https://models.github.ai/inference
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
          // Sukurti zod schemą pagal input_schema
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // Aiškiai nustatyti tipą kaip "function"
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
    
    
          // 2. Iškvieti serverio įrankį
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. Atlikti veiksmus su rezultatu
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
    
        // 3. Peržvelgti LLM atsakymą, kiekvienam pasirinkimui patikrinti ar yra įrankio kvietimų
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

1. Pridėkime kai kuriuos importus, reikalingus LLM kvietimui:

    ```python
    # llm
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. Toliau įtraukiame funkciją, kuri kvies LLM:

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
            # Pasirenkami parametrai
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

    Aukščiau nurodytame kode mes:

    - Perdavėme mūsų funkcijas, rastas MCP serveryje ir konvertuotas, LLM.
    - Tada iškvietėme LLM su šiomis funkcijomis.
    - Tada tikriname rezultatą, norėdami sužinoti, kokias funkcijas reikia iškviesti, jei tokių yra.
    - Galiausiai perduodame funkcijų masyvą iškvietimui.

3. Paskutinis žingsnis – atnaujiname pagrindinį kodą:

    ```python
    prompt = "Add 2 to 20"

    # paklauskite LLM, kokie įrankiai visiškai, jei tokių yra
    functions_to_call = call_llm(prompt, functions)

    # kvieskite siūlomas funkcijas
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

Čia yra galutinis žingsnis, aukščiau esančiame kode mes:

- Kviečiame MCP įrankį per `call_tool`, naudodami funkciją, kurią LLM manė, kad turime iškviesti pagal mūsų raginimą.
- Spaudiname įrankio kvietimo rezultatą MCP serveryje.

#### .NET

1. Parodysime kodą, kaip atlikti LLM raginimo užklausą:

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

Aukščiau nurodytame kode mes:

- Gautas įrankis iš MCP serverio, `var tools = await GetMcpTools()`.
- Apibrėžtas vartotojo raginimas `userMessage`.
- Konstrukcijos objektas, nurodantis modelį ir įrankius.
- Atlikta užklausa LLM.

2. Paskutinis žingsnis, pažiūrėkime, ar LLM mano, kad turime kviesti funkciją:

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

Aukščiau nurodytame kode mes:

- Perėjome per funkcijų kvietimų sąrašą.
- Kiekvienam įrankio kvietimui išskyrėme pavadinimą ir argumentus, tada iškvietėme įrankį MCP serveryje, naudodami MCP klientą. Galiausiai spausdiname rezultatus.

Štai visas kodas:

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
    // Vykdyti natūralios kalbos užklausas, kurios automatiškai naudoja MCP įrankius
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

Aukščiau nurodytame kode mes:

- Naudojome paprastus natūralios kalbos raginimus, kad bendrautume su MCP serverio įrankiais
- LangChain4j frameworkas automatiškai tvarko:
  - Vartotojo raginimų konvertavimą į įrankių kvietimus, kai to reikia
  - Tinkamų MCP įrankių kvietimą, remiantis LLM sprendimu
  - Pokalbio eigos valdymą tarp LLM ir MCP serverio
- `bot.chat()` metodas grąžina natūralios kalbos atsakymus, kurie gali apimti rezultatus iš MCP įrankių vykdymo
- Šis požiūris suteikia sklandžią vartotojo patirtį, kai vartotojai neturi žinoti apie MCP vidinę įgyvendinimą

Visas pavyzdinio kodo pavyzdys:

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

Čia vyksta dauguma darbo. Pirmiausia iškviesime LLM su pradiniu vartotojo raginimu, tada apdorosime atsakymą, kad sužinotume, ar reikia kviesti kokius nors įrankius. Jei taip, kviesime tuos įrankius ir tęsisime pokalbį su LLM tol, kol nebeliks įrankių kvietimų ir turėsime galutinį atsakymą.

Mes ketiname atlikti kelis LLM kvietimus, todėl apibrėžkime funkciją, kuri tai darys. Pridėkite šią funkciją į savo `main.rs` failą:

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

Ši funkcija priima LLM klientą, žinučių sąrašą (įskaitant vartotojo raginimą), įrankius iš MCP serverio ir siunčia užklausą LLM, grąžindama atsakymą.
LLM atsakyme bus masyvas `choices`. Turėsime apdoroti rezultatą, kad pamatytume, ar yra `tool_calls`. Tai leidžia mums žinoti, kad LLM prašo iškviesti konkretų įrankį su argumentais. Pridėkite šį kodą prie savo `main.rs` failo pabaigos, kad apibrėžtumėte funkciją LLM atsakymui apdoroti:

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

    // Atspausdinkite turinį, jei jis yra
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // Tvarkykite įrankių kvietimus
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // Pridėti asistento pranešimą

        // Vykdykite kiekvieną įrankio kvietimą
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // Pridėti įrankio rezultatą prie pranešimų
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // Tęsti pokalbį su įrankių rezultatais
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

Jei yra `tool_calls`, ji ištraukia įrankio informaciją, iškviečia MCP serverį su įrankio užklausa, ir prideda rezultatus prie pokalbio žinučių. Tada tęsia pokalbį su LLM, o žinutės atnaujinamos su asistento atsakymu ir įrankio kvietimo rezultatais.

Kad ištrauktume įrankio kvietimo informaciją, kurią LLM grąžina MCP kvietimams, pridėsime dar vieną pagalbinę funkciją, kuri ištraukia viską, ko reikia kvietimui atlikti. Pridėkite šį kodą prie savo `main.rs` failo pabaigos:

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

Kai turėsime visus komponentus, galėsime apdoroti pradinį vartotojo prašymą ir iškviesti LLM. Atnaujinkite savo `main` funkciją, kad ji apimtų šį kodą:

```rust
// Pokalbis su dideliu kalbos modeliu su įrankių kvietimais
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

Tai užklaus LLM su pradiniu vartotojo prašymu, prašančiu sudėti du skaičius, ir apdoros atsakymą, dinamiškai valdydama įrankių kvietimus.

Puiku, jūs tai padarėte!

## Užduotis

Paimkite kodą iš pratimo ir sukurkite serverį su daugiau įrankių. Tada sukurkite klientą su LLM, kaip pratybose, ir išbandykite su skirtingais prašymais, kad įsitikintumėte, jog visi jūsų serverio įrankiai kviečiami dinamiškai. Tokiu būdu sukurtas klientas suteikia galutinio vartotojo puikią patirtį, nes jie gali naudoti natūralius prašymus, o ne specifinius klientų komandas, ir jiems nereikia žinoti apie bet kokius MCP serverio kvietimus.

## Sprendimas

[Sprendimas](./solution/README.md)

## Svarbiausios mintys

- LLM pridėjimas prie kliento suteikia geresnį būdą vartotojams bendrauti su MCP serveriais.
- Reikia konvertuoti MCP serverio atsakymą į formatą, suprantamą LLM.

## Pavyzdžiai

- [Java Skaičiuotuvas](../samples/java/calculator/README.md)
- [.Net Skaičiuotuvas](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Skaičiuotuvas](../samples/javascript/README.md)
- [TypeScript Skaičiuotuvas](../samples/typescript/README.md)
- [Python Skaičiuotuvas](../../../../03-GettingStarted/samples/python)
- [Rust Skaičiuotuvas](../../../../03-GettingStarted/samples/rust)

## Papildomi ištekliai

## Kas toliau

- Toliau: [Serverio naudojimas su Visual Studio Code](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->