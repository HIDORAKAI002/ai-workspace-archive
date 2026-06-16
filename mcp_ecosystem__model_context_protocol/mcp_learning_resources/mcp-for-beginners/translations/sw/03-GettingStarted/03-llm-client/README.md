# Kuunda mteja na LLM

Hadi sasa, umeona jinsi ya kuunda seva na mteja. Mteja ameweza kuita seva waziwazi ili kuorodhesha zana zake, rasilimali, na maelekezo. Hata hivyo, hii siyo njia yenye matumizi mengi. Watumiaji wako wanaishi katika enzi ya mawakala na wanatarajia kutumia maelekezo na kuwasiliana na LLM badala yake. Hawajali kama unatumia MCP kuhifadhi uwezo wako; wanatarajia tu kuingiliana kwa kutumia lugha ya asili. Kwa hiyo, tunawezaje kutatua hili? Suluhisho ni kuongeza LLM kwa mteja.

## Muhtasari

Katika somo hili tunazingatia kuongeza LLM kufanya kazi kwa mteja wetu na kuonyesha jinsi hii inavyotoa uzoefu bora zaidi kwa mtumiaji wako.

## Malengo ya Kujifunza

Mwisho wa somo hili, utaweza:

- Kuunda mteja mwenye LLM.
- Kuingiliana kwa urahisi na seva ya MCP kwa kutumia LLM.
- Kutoa uzoefu bora zaidi kwa mtumiaji upande wa mteja.

## Njia

Tujaribu kuelewa njia tunayotakiwa kuchukua. Kuongeza LLM inaonekana rahisi, lakini je, tutafanya hivi kweli?

Hivi ndivyo mteja atavyowasiliana na seva:

1. Kuweka muunganisho na seva.

1. Orodhesha uwezo, maelekezo, rasilimali na zana, na hifadhi muundo wao.

1. Ongeza LLM na pita uwezo ulihifadhiwa pamoja na muundo wao kwa muundo ambao LLM inaufahamu.

1. Shughulikia maelekezo ya mtumiaji kwa kuyapita kwa LLM pamoja na zana zilizoorodheshwa na mteja.

Nzuri, sasa tunaelewa jinsi ya kufanya hivi kwa kiwango cha juu, tujaribu hili katika zoezi hapa chini.

## Zoezi: Kuunda mteja na LLM

Katika zoezi hili, tutajifunza kuongeza LLM kwa mteja wetu.

### Uthibitishaji kwa kutumia Token ya Kufikia ya Binafsi ya GitHub

Kuunda token ya GitHub ni mchakato rahisi. Hivi ndivyo unavyoweza kufanya:

- Nenda kwenye Mipangilio ya GitHub – Bonyeza picha yako ya profaili upande wa juu kulia na chagua Mipangilio.
- Elekea kwenye Mipangilio ya Mtaalamu wa Maendeleo – Sogeza chini na bonyeza Mipangilio ya Mtaalamu wa Maendeleo.
- Chagua Tokeni za Kufikia za Binafsi – Bonyeza kwenye Tokeni zenye viwango vidogo kisha Tengeneza tokeni mpya.
- Sanidi Tokeni Yako – Ongeza maelezo kwa kumbukumbu, weka tarehe ya kumalizika, na chagua maeneo muhimu ya ruhusa (idhinisho). Katika kesi hii hakikisha kuongeza ruhusa ya Models.
- Tengeneza na Nakili Tokeni – Bonyeza Tengeneza tokeni, na hakikisha kuikopa mara moja, kwani hautaweza kuona tena.

### -1- Unganisha na seva

Tuanze kwa kuunda mteja wetu:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Ingiza zod kwa ajili ya uthibitishaji wa muundo

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

Katika msimbo uliotangulia tume:

- Kuleta maktaba zinazohitajika
- Kuunda darasa lenye wanachama wawili, `client` na `openai` ambao watatusaidia kudhibiti mteja na kuingiliana na LLM kwa mtiririko.
- Kusanidi mfano wetu wa LLM kutumia Modeli za GitHub kwa kuweka `baseUrl` kuelekeza kwenye API ya inference.

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# Unda vigezo vya seva kwa muunganisho wa stdio
server_params = StdioServerParameters(
    command="mcp",  # Inayotekelezeka
    args=["run", "server.py"],  # Hoja za chaguo za mstari wa amri
    env=None,  # Vigezo vya chaguo vya mazingira
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # Anzisha muunganisho
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

Katika msimbo uliotangulia tume:

- Kuleta maktaba muhimu kwa MCP
- Kuunda mteja

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

Kwanza, utahitaji kuongeza utegemezi wa LangChain4j kwenye faili yako ya `pom.xml`. Ongeza utegemezi huu kuwezesha muingiliano wa MCP na msaada wa Modeli za GitHub:

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

Kisha unda darasa lako la mteja la Java:

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
    
    public static void main(String[] args) throws Exception {        // Sanidi LLM kutumia Modeli za GitHub
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // Tengeneza usafirishaji wa MCP kwa kuunganishwa na seva
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // Tengeneza mteja wa MCP
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

Katika msimbo uliotangulia tume:

- **Kuongeza utegemezi wa LangChain4j**: Unaohitajika kwa muingiliano wa MCP, mteja rasmi wa OpenAI, na msaada wa Modeli za GitHub
- **Kuleta maktaba za LangChain4j**: Kwa muingiliano wa MCP na utendaji wa mfano wa mazungumzo wa OpenAI
- **Kuunda `ChatLanguageModel`**: Iliyosanidiwa kutumia Modeli za GitHub na tokeni yako ya GitHub
- **Kusanidi usafirishaji wa HTTP**: Kutumia Matukio Yanayotumwa kwa Mteja (Server-Sent Events, SSE) kuungana na seva ya MCP
- **Kuunda mteja wa MCP**: Ambao atashughulikia mawasiliano na seva
- **Kutumia msaada uliojengwa wa MCP wa LangChain4j**: Ambayo hurahisisha muingiliano kati ya LLMs na seva za MCP

#### Rust

Mfano huu unadhani una seva ya MCP iliyoandikwa kwa Rust inayoendeshwa. Ukikosa moja, rejea somo la [01-first-server](../01-first-server/README.md) kuunda seva hiyo.

Mara unapokuwa na seva yako ya MCP ya Rust, fungua terminal na uelekee kwenye saraka ile ile kama seva. Kisha endesha amri ifuatayo kuunda mradi mpya wa mteja wa LLM:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

Ongeza utegemezi ufuatao kwenye faili yako `Cargo.toml`:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> Hakuna maktaba rasmi ya Rust kwa OpenAI, hata hivyo, `async-openai` ni [maktaba inayotunzwa na jamii](https://platform.openai.com/docs/libraries/rust#rust) ambayo hutumiwa sana.

Fungua faili `src/main.rs` na badilisha yaliyomo na msimbo ufuatao:

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
    // Ujumbe wa mwanzo
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // Tengeneza mteja wa OpenAI
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // Tengeneza mteja wa MCP
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

    // KUFANYA: Pata orodha ya zana za MCP

    // KUFANYA: Mazungumzo ya LLM na miito ya zana

    Ok(())
}
```

Msimbo huu unasanidi programu msingi ya Rust itakayounganisha na seva ya MCP na Modeli za GitHub kwa maingiliano ya LLM.

> [!IMPORTANT]
> Hakikisha umeweka thamani ya mazingira `OPENAI_API_KEY` na tokeni yako ya GitHub kabla ya kuendesha programu.

Nzuri, kwa hatua yetu inayofuata, tutaorodhesha uwezo kwenye seva.

### -2- Orodhesha uwezo wa seva

Sasa tutaungana na seva na kuomba uwezo wake:

#### Typescript

Katika darasa lile lile, ongeza njia zifuatazo:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // orodha ya zana
    const toolsResult = await this.client.listTools();
}
```

Katika msimbo uliotangulia tume:

- Kuongeza msimbo wa kuungana na seva, `connectToServer`.
- Kuunda njia `run` inayosimamia mtiririko wa programu yetu. Hadi sasa inaorodhesha tu zana lakini tutongeza zaidi hivi karibuni.

#### Python

```python
# Orodhesha rasilimali zinazopatikana
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# Orodhesha zana zinazopatikana
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

Hivi ndivyo tulivyoongeza:

- Kuorodhesha rasilimali na zana na kuzichapisha. Kwa zana pia tunataja `inputSchema` tunayotumia baadaye.

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

Katika msimbo uliotangulia tume:

- Kuoonyesha zana zilizopo kwenye seva ya MCP
- Kwa kila zana, kuorodhesha jina, maelezo na muundo wake. Ambayo ni muhimu tutakayoiita hivi karibuni.

#### Java

```java
// Unda mtoaji wa zana unaogundua zana za MCP kiotomatiki
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// Mtoaji wa zana wa MCP huendesha kwa kiotomatiki:
// - Kuweka orodha ya zana zilizopo kutoka kwa seva ya MCP
// - Kubadilisha miundo ya zana za MCP kuwa muundo wa LangChain4j
// - Kusimamia utekelezaji wa zana na majibu
```

Katika msimbo uliotangulia tume:

- Kuunda `McpToolProvider` inayogundua nakujiandikisha moja kwa moja zana zote kutoka kwa seva ya MCP
- Mtoa zana huyu hushughulikia uongozaji kati ya mipangilio ya zana za MCP na muundo wa zana wa LangChain4j ndani yake
- Njia hii huondoa hitaji la orodha ya zana kwa mkono na mchakato wa uongozaji

#### Rust

Kupata zana kutoka kwa seva ya MCP hufanyika kwa kutumia njia ya `list_tools`. Katika kazi yako ya `main`, baada ya kuanzisha mteja wa MCP, ongeza msimbo ufuatao:

```rust
// Pata orodha ya zana za MCP
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- Badilisha uwezo wa seva kuwa zana za LLM

Hatua inayofuata baada ya kuorodhesha uwezo wa seva ni kuyabadilisha kuwa muundo ambao LLM inaelewa. Tukifanya hivyo, tunaweza kutoa uwezo huu kama zana kwa LLM yetu.

#### TypeScript

1. Ongeza msimbo ufuatao kubadilisha majibu kutoka Seva ya MCP kuwa muundo wa zana LLM inayotumia:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // Unda schema ya zod msingi wa input_schema
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // Weka aina kwa uwazi kuwa "kazi"
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

    Msimbo ulio juu unachukua jibu kutoka Seva ya MCP na kubadilisha kuwa muundo wa zana ambao LLM inaweza kuelewa.

2. Sasa tutaongeza msimbo wa `run` ili kuorodhesha uwezo wa seva:

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

    Katika msimbo uliotangulia, tumeongeza mzunguko kupitia matokeo na kwa kila kipengee tumeita `openAiToolAdapter`.

#### Python

1. Kwanza, tuunde kazi ifuatayo ya kubadilishia:

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

    Katika kazi iliyo juu `convert_to_llm_tools` tunachukua jibu la zana ya MCP na kulibadilisha kuwa muundo unaofaa kwa LLM kuelewa.

2. Kisha, tutaongeza msimbo kwenye mteja wetu kutumia kazi hii kama ifuatavyo:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    Hapa, tunaongeza wito wa `convert_to_llm_tool` kubadilisha jibu la zana ya MCP kuwa kitu ambacho tunaweza kumpa LLM baadaye.

#### .NET

1. Tuweke msimbo kubadilisha jibu la zana ya MCP kuwa kitu LLM inaelewa

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

Katika msimbo uliotangulia tume:

- Kuunda kazi `ConvertFrom` inayopokea jina, maelezo na muundo wa ingizo.
- Kueleza utendaji unaounda `FunctionDefinition` inayopitishwa kwa `ChatCompletionsDefinition`. Hiyo ni kitu LLM inaelewa.

2. Tutaona jinsi tunavyoweza kusasisha msimbo uliopo ili kutumia kazi hii:

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
// Unda kiolesura cha Bot kwa maingiliano ya lugha asilia
public interface Bot {
    String chat(String prompt);
}

// Sanidi huduma ya AI pamoja na zana za LLM na MCP
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

Katika msimbo uliotangulia tume:

- Kueleza na interface rahisi `Bot` kwa maingiliano ya lugha asilia
- Kutumia `AiServices` ya LangChain4j kufunga moja kwa moja LLM na mtoa zana wa MCP
- Mfumo huu huandaa mchakato wa mabadiliko ya schema ya zana na simu za kazi previusheni moja kwa moja
- Njia hii huondoa hitaji la kubadilisha zana kwa mkono - LangChain4j hushughulikia ugumu wote wa kubadilisha zana za MCP kuwa muundo unaolingana na LLM

#### Rust

Kuwa kubadilisha jibu la zana ya MCP kuwa muundo unaoeleweka na LLM, tutaongeza kazi ndogo inayopanga orodha ya zana. Ongeza msimbo ufuatao kwenye faili yako `main.rs` chini ya kazi `main`. Hii itaitwa wakati wa kuomba kwa LLM:

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

Nzuri, sasa tumejiandaa kushughulikia maombi ya watumiaji, basi tuanze hilo sasa.

### -4- Shughulikia ombi la maelekezo ya mtumiaji

Katika sehemu hii ya msimbo, tutashughulikia maombi ya watumiaji.

#### TypeScript

1. Ongeza njia itakayotumika kuitisha LLM yetu:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. Piga zana ya seva
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Fanya kitu na matokeo
        // KUFANYA

        }
    }
    ```

    Katika msimbo uliotangulia tume:

    - Kuongeza njia `callTools`.
    - Njia hii hupokea majibu ya LLM na kuangalia ni zana gani zimeitwa, kama zipo:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // piga simu zana
        }
        ```

    - Inaita zana ikiwa LLM inaonyesha inapaswa kuitwa:

        ```typescript
        // 2. Piga zana ya seva
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Fanya kitu na matokeo
        // KUFANYA
        ```

2. Sasisha njia `run` kuingiza simu kwa LLM na kuitisha `callTools`:

    ```typescript

    // 1. Tengeneza ujumbe ambao ni ingizo kwa LLM
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. Piga simu LLM
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. Pitia jibu la LLM, kwa kila uchaguzi, angalia kama lina simu za zana
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

Nzuri, tutaonyesha msimbo mzima sasa:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Ingiza zod kwa kuthibitisha mwonekano wa schema

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // huenda ukahitaji kubadilisha kuwa url hii baadaye: https://models.github.ai/inference
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
          // Unda schema ya zod kulingana na input_schema
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // Weka aina wazi kuwa "function"
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
    
    
          // 2. Piga simu kwa chombo cha seva
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. Fanya kitu na matokeo
          // KUFANYA
    
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
    
        // 3. Pitia majibu ya LLM, kwa kila uchaguzi, angalia kama kuna simu za zana
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

1. Tuweke baadhi ya import zinazohitajika kwa kuitisha LLM

    ```python
    # llm
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. Kisha, tuchague kazi itakayoita LLM:

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
            # Vigezo vya hiari
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

    Katika msimbo uliotangulia tume:

    - Kupitisha kazi zetu, tulizopata kwenye seva ya MCP na kuzibadilisha, kwa LLM.
    - Kisha tumelia LLM na kazi hizi.
    - Kisha tunachambua matokeo kuona ni kazi gani tunapaswa kuita, kama zipo.
    - Mwisho, tunapita safu ya kazi za kuita.

3. Hatua ya mwisho, tutaongeza msimbo wetu mkuu:

    ```python
    prompt = "Add 2 to 20"

    # muulize LLM zana gani zote, ikiwa zipo
    functions_to_call = call_llm(prompt, functions)

    # piga simu kwa kazi zilizopendekezwa
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    Hiyo ilikuwa hatua ya mwisho, katika msimbo hapo juu tunafanya:

    - Kuita zana ya MCP kupitia `call_tool` kwa kutumia kazi ambayo LLM iliona inapaswa kuitwa kulingana na maelekezo yetu.
    - Kuchapisha matokeo ya simu ya zana kwa seva ya MCP.

#### .NET

1. Tuaonyeshe msimbo wa kufanya ombi la maelekezo kwa LLM:

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

    Katika msimbo uliotangulia tume:

    - Kupata zana kutoka kwa seva ya MCP, `var tools = await GetMcpTools()`.
    - Kuelezwa maelekezo ya mtumiaji `userMessage`.
    - Kujenga object ya chaguzi ikibainisha mfano na zana.
    - Kufanya ombi kwa LLM.

2. Hatua ya mwisho, tutaangalia kama LLM inadhani tunapaswa kuita kazi:

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

    Katika msimbo uliotangulia tume:

    - Kupitia orodha ya simu za kazi.
    - Kwa kila simu ya zana, tutekeleza jina na hoja na kuitisha zana kwenye seva ya MCP kwa kutumia mteja wa MCP. Mwisho tunachapisha matokeo.

Huu hapa msimbo mzima:

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
    // Tekeleza maombi ya lugha ya asili yanayotumia zana za MCP kiotomatiki
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

Katika msimbo uliotangulia tume:

- Kutumia maelekezo rahisi ya lugha asilia kuingiliana na zana za seva ya MCP
- Mfumo wa LangChain4j kwa kiotomatiki hushughulikia:
  - Kubadilisha maelekezo ya mtumiaji kuwa simu za zana inapohitajika
  - Kuitisha zana za MCP zinazofaa kulingana na uamuzi wa LLM
  - Kusimamia mtiririko wa mazungumzo kati ya LLM na seva ya MCP
- Njia hii hutoa uzoefu rahisi kwa mtumiaji ambapo hutaki kujua kuhusu utekelezwaji wa MCP nyuma

Mfano kamili wa msimbo:

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

Hapa ndipo kazi nyingi zinapofanyika. Tutaomba LLM na maelekezo ya awali ya mtumiaji, kisha tunachambua majibu kuona kama kuna zana yoyote inapaswa kuitwa. Ikiwa ipo, tutaapita zana hizo na kuendelea na mazungumzo na LLM hadi hakuna simu za zana zinazohitajika na tunapokeza jibu la mwisho.

Tutafanya simu nyingi kwa LLM, basi tutaeleza kazi itakayoshughulikia simu za LLM. Ongeza kazi ifuatayo kwenye faili yako `main.rs`:

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

Kazi hii hupokea mteja wa LLM, orodha ya ujumbe (pamoja na maelekezo ya mtumiaji), zana kutoka seva ya MCP, na kutuma ombi kwa LLM, ikirejesha jibu.
Jibu kutoka kwa LLM litakuwa na orodha ya `choices`. Tutahitaji kuchakata matokeo kuona kama kuna `tool_calls`. Hii inatuambia LLM inahitaji chombo maalum kiitwe na hoja. Ongeza nambari ifuatayo mwishoni mwa faili lako `main.rs` ili kufafanua kazi ya kushughulikia jibu la LLM:

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

    // Chapisha maudhui ikiwa yapo
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // Shughulikia miito ya zana
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // Ongeza ujumbe wa msaidizi

        // Tekeleza kila mwito wa zana
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // Ongeza matokeo ya zana kwenye ujumbe
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // Endelea mazungumzo kwa matokeo ya zana
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

Ikiwa `tool_calls` zipo, inachukua taarifa za chombo, kuitisha seva ya MCP na ombi la chombo, na kuongeza matokeo kwenye ujumbe wa mazungumzo. Kisha inaendelea na mazungumzo na LLM na ujumbe unasasishwa na jibu la msaidizi pamoja na matokeo ya kuitisha chombo.

Ili kuchukua taarifa za kuitisha chombo ambazo LLM inarudisha kwa simu za MCP, tutaongeza kazi nyingine ya msaidizi kuchukua kila kitu kinachohitajika kwa ajili ya simu. Ongeza nambari ifuatayo mwishoni mwa faili lako `main.rs`:

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

Kwa vipande vyote vikiwa mahali pake, sasa tunaweza kushughulikia agizo la mtumiaji mwanzo na kuitisha LLM. Sasisha kazi yako `main` kuongeza nambari ifuatayo:

```rust
// Mazungumzo ya LLM na wito wa zana
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

Hii itauliza LLM kwa agizo la mtumiaji mwanzo likiomba jumla ya nambari mbili, na itachakata jibu kusimamia kwa nguvu kuitisha vyombo.

Nzuri, umefanya kazi!

## Kazi

Chukua nambari kutoka zoezi na jenga seva yenye vyombo vingi zaidi. Kisha unda mteja mwenye LLM, kama ilivyo kwenye zoezi, na itestie na maelezo tofauti kuhakikisha vyombo vyote vya seva yako vinaangaliwa kwa nguvu. Njia hii ya kujenga mteja inamaanisha mtumiaji wa mwisho atapata uzoefu mzuri kwa kutumia maelezo badala ya amri kamili za mteja, na hawatajua kama seva ya MCP inaitwa.

## Suluhisho

[Suluhisho](./solution/README.md)

## Muhimu Kusahau

- Kuongeza LLM kwenye mteja wako hutoa njia bora kwa watumiaji kuingiliana na seva za MCP.
- Unahitaji kubadilisha majibu ya seva ya MCP kuwa kitu ambacho LLM inaweza kuelewa.

## Sampuli

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)
- [Rust Calculator](../../../../03-GettingStarted/samples/rust)

## Rasilimali Zaidi

## Ifuatayo

- Inayofuata: [Kutumia seva kwa Visual Studio Code](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->