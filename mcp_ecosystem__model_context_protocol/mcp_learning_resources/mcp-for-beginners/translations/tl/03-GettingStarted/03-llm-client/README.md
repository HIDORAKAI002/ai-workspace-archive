# Paglikha ng kliyente gamit ang LLM

Sa ngayon, nakita mo na kung paano gumawa ng server at kliyente. Ang kliyente ay nakakapag-tawag ng server nang hayagan upang ilista ang mga kasangkapan, mga mapagkukunan, at mga prompt nito. Gayunpaman, hindi ito napaka-praktikal na paraan. Ang iyong mga gumagamit ay nabubuhay sa agentic era at inaasahan na gumamit ng mga prompt at makipag-usap sa isang LLM sa halip. Hindi sila nag-aalala kung gumagamit ka ng MCP upang i-imbak ang iyong mga kakayahan; inaasahan lang nila na makipag-ugnayan gamit ang natural na wika. Kaya paano natin ito sosolusyunan? Ang solusyon ay magdagdag ng LLM sa kliyente.

## Pangkalahatang-ideya

Sa araling ito tututukan natin ang pagdagdag ng isang LLM upang gawin ang iyong kliyente at ipakita kung paano ito nagbibigay ng mas magandang karanasan para sa iyong gumagamit.

## Mga Layunin sa Pagkatuto

Sa pagtatapos ng araling ito, magagawa mo na:

- Lumikha ng kliyente na may kasamang LLM.
- Makipag-ugnayan nang walang patid sa MCP server gamit ang isang LLM.
- Magbigay ng mas mahusay na karanasan sa end user sa panig ng kliyente.

## Paraan

Subukan nating unawain ang paraan na kailangan nating gawin. Ang pagdagdag ng LLM ay tila simple, ngunit gagawin ba talaga natin ito?

Ganito makikipag-ugnayan ang kliyente sa server:

1. Magtatag ng koneksyon sa server.

1. Ililista ang mga kakayahan, mga prompt, mga mapagkukunan at mga kasangkapan, at itatabi ang kanilang schema.

1. Magdagdag ng LLM at ipapasa ang mga naitalang kakayahan at kanilang schema sa format na naiintindihan ng LLM.

1. Pangasiwaan ang user prompt sa pamamagitan ng pagpasa nito sa LLM kalakip ang mga kasangkapan na nilista ng kliyente.

Maganda, ngayon na naiintindihan natin kung paano natin ito gagawin sa mataas na antas, subukan natin ito sa pagsasanay sa ibaba.

## Pagsasanay: Paglikha ng kliyente gamit ang isang LLM

Sa pagsasanay na ito, matututuhan nating magdagdag ng isang LLM sa ating kliyente.

### Pagpapatunay gamit ang Personal Access Token sa GitHub

Ang paggawa ng GitHub token ay isang diretso na proseso. Narito kung paano mo ito gagawin:

- Pumunta sa GitHub Settings – I-click ang iyong larawan sa profile sa itaas na kanang sulok at piliin ang Settings.
- Mag-navigate sa Developer Settings – Mag-scroll pababa at i-click ang Developer Settings.
- Piliin ang Personal Access Tokens – I-click ang Fine-grained tokens at pagkatapos ay Generate new token.
- I-configure ang Iyong Token – Magdagdag ng tala para sa sanggunian, itakda ang petsa ng pag-expire, at piliin ang kinakailangang mga saklaw (mga permiso). Sa kasong ito siguraduhing idagdag ang Models permission.
- I-generate at Kopyahin ang Token – I-click ang Generate token, at siguraduhing kopyahin agad ito, dahil hindi mo na ito muling makikita.

### -1- Kumonekta sa server

Gumawa muna tayo ng ating kliyente:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // I-import ang zod para sa pagsuri ng schema

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

Sa naunang code ay:

- Nag-import ng mga kinakailangang library
- Lumikhang isang klase na may dalawang miyembro, `client` at `openai` na tutulong sa atin pamahalaan ang kliyente at makipag-ugnayan sa LLM nang magkahiwalay.
- Kinonpigura ang ating LLM instance upang gamitin ang GitHub Models sa pamamagitan ng pagtatakda ng `baseUrl` na tumutukoy sa inference API.

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# Gumawa ng mga parameter ng server para sa koneksyon ng stdio
server_params = StdioServerParameters(
    command="mcp",  # Naa-execute
    args=["run", "server.py"],  # Opsyonal na mga argumento sa command line
    env=None,  # Opsyonal na mga variable ng kapaligiran
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # I-initialize ang koneksyon
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

Sa naunang code ay:

- Nag-import ng mga kinakailangang library para sa MCP
- Nilikha ang isang kliyente

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

Una, kailangan mong idagdag ang LangChain4j dependencies sa iyong `pom.xml` file. Idagdag ang mga dependencies na ito upang paganahin ang MCP integration at suporta para sa GitHub Models:

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

Pagkatapos ay gawin ang iyong Java client class:

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
    
    public static void main(String[] args) throws Exception {        // I-configure ang LLM upang gamitin ang mga Modelo ng GitHub
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // Gumawa ng MCP transport para kumonekta sa server
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // Gumawa ng MCP client
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

Sa naunang code ay:

- **Idinagdag ang LangChain4j dependencies**: Kailangan para sa MCP integration, opisyal na OpenAI client, at suporta sa GitHub Models
- **Nag-import ng mga LangChain4j libraries**: Para sa MCP integration at OpenAI chat model functionality
- **Nilikha ang `ChatLanguageModel`**: Na kinonpigura upang gamitin ang GitHub Models gamit ang iyong GitHub token
- **Nagtakda ng HTTP transport**: Gamit ang Server-Sent Events (SSE) upang kumonekta sa MCP server
- **Nilikha ang MCP client**: Na siyang mangangasiwa ng komunikasyon sa server
- **Gumamit ng built-in na suporta ng LangChain4j para sa MCP**: Na nagpapadali sa integrasyon sa pagitan ng LLMs at MCP servers

#### Rust

Ang halimbawa na ito ay nag-aakala na mayroong MCP server na nakabase sa Rust na tumatakbo na. Kung wala ka pa nito, bumalik sa leksyon na [01-first-server](../01-first-server/README.md) upang gumawa ng server.

Kapag mayroon ka nang Rust MCP server, buksan ang terminal at pumunta sa parehong direktoryo ng server. Pagkatapos ay patakbuhin ang sumusunod na utos upang gumawa ng bagong proyekto para sa LLM client:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

Idagdag ang mga sumusunod na dependencies sa iyong `Cargo.toml` file:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> Walang opisyal na Rust library para sa OpenAI, Ngunit ang `async-openai` crate ay isang [community maintained library](https://platform.openai.com/docs/libraries/rust#rust) na karaniwang ginagamit.

Buksan ang `src/main.rs` file at palitan ang nilalaman nito ng sumusunod na code:

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
    // Paunang mensahe
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // I-set up ang OpenAI client
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // I-set up ang MCP client
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

    // Gagawin: Kunin ang listahan ng MCP tool

    // Gagawin: Usapan sa LLM kasama ang mga tawag sa tool

    Ok(())
}
```

Itinakda ng code na ito ang isang simpleng Rust application na kokonekta sa isang MCP server at GitHub Models para sa pakikipag-ugnayan sa LLM.

> [!IMPORTANT]
> Siguraduhing itakda ang `OPENAI_API_KEY` environment variable gamit ang iyong GitHub token bago patakbuhin ang aplikasyon.

Maganda, para sa susunod na hakbang, ilista natin ang mga kakayahan sa server.

### -2- Ilista ang mga kakayahan ng server

Ngayon ay kokonekta tayo sa server at hihingin ang mga kakayahan nito:

#### Typescript

Sa parehong klase, idagdag ang mga sumusunod na metodo:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // pagpapatala ng mga kasangkapan
    const toolsResult = await this.client.listTools();
}
```

Sa naunang code ay:

- Idinagdag ang code para kumonekta sa server, `connectToServer`.
- Nilikha ang `run` method na responsable sa paghawak ng daloy ng app. Sa ngayon, inililista lang nito ang mga kasangkapan pero magdadagdag tayo ng iba pa rito.

#### Python

```python
# Ilahad ang mga available na resources
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# Ilahad ang mga available na tools
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

Narito ang idinagdag natin:

- Paglilista ng mga resources at mga kasangkapan at ipinrint ang mga ito. Para sa mga kasangkapan, inilista din natin ang `inputSchema` na gagamitin natin mamaya.

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

Sa naunang code ay:

- Inilista ang mga kasangkapan na available sa MCP Server
- Para sa bawat kasangkapan, inilista ang pangalan, paglalarawan at ang schema nito. Ito ay gagamitin natin para tawagan ang mga kasangkapan.

#### Java

```java
// Gumawa ng isang tagapagbigay ng tool na awtomatikong naghahanap ng mga MCP tool
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// Ang tagapagbigay ng tool ng MCP ay awtomatikong humahawak ng:
// - Paglilista ng mga available na tool mula sa MCP server
// - Pagko-convert ng mga schema ng MCP tool sa format ng LangChain4j
// - Pamamahala ng pagpapatupad ng tool at mga tugon
```

Sa naunang code ay:

- Nilikha ang `McpToolProvider` na awtomatikong naghahanap at nagrerehistro ng lahat ng kasangkapan mula sa MCP server
- Pinangangasiwaan ng tool provider ang pag-convert sa pagitan ng MCP tool schemas at format ng LangChain4j na mga kasangkapan sa loob
- Ang paraan na ito ay nag-aalis ng manual na listing at conversion ng mga kasangkapan

#### Rust

Ang pagkuha ng mga kasangkapan mula sa MCP server ay ginagawa gamit ang `list_tools` method. Sa iyong `main` function, pagkatapos i-setup ang MCP client, idagdag ang sumusunod na code:

```rust
// Kunin ang listahan ng MCP tool
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- I-convert ang mga kakayahan ng server sa mga kasangkapan ng LLM

Susunod na hakbang pagkatapos ilista ang mga kakayahan ng server ay i-convert ang mga ito sa format na naiintindihan ng LLM. Kapag nagawa na natin iyon, maibibigay natin ang mga kakayahan bilang mga kasangkapan sa ating LLM.

#### TypeScript

1. Idagdag ang sumusunod na code para i-convert ang tugon mula sa MCP Server papunta sa format ng kasangkapan na magagamit ng LLM:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // Gumawa ng zod schema batay sa input_schema
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // Eksplitong itakda ang uri sa "function"
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

    Ang code sa itaas ay kumukuha ng tugon mula sa MCP Server at kino-convert ito sa format ng depinisyon ng kasangkapan na naiintindihan ng LLM.

2. I-update natin ang `run` method upang ilista ang mga kakayahan ng server:

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

    Sa naunang code, inupdate natin ang `run` method upang dumaan sa resulta at para sa bawat entry tawagin ang `openAiToolAdapter`.

#### Python

1. Una, gumawa tayo ng sumusunod na converter function

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

    Sa function na `convert_to_llm_tools` ay kinokonvert natin ang MCP tool response sa format na naiintindihan ng LLM.

2. Susunod, i-update natin ang client code upang gamitin ang function na ito gaya nito:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    Dito, nagdadagdag tayo ng tawag sa `convert_to_llm_tool` para i-convert ang MCP tool response sa isang bagay na maaari nating ipasa sa LLM mamaya.

#### .NET

1. Idagdag natin ang code para i-convert ang MCP tool response sa isang bagay na naiintindihan ng LLM

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

Sa naunang code ay:

- Nilikha ang function `ConvertFrom` na tumatanggap ng pangalan, paglalarawan at input schema.
- Nagdeklara ng functionality na lumilikha ng FunctionDefinition na ipinapasa sa ChatCompletionsDefinition. Ito ay naiintindihan ng LLM.

2. Tingnan natin paano natin i-uupdate ang ilang umiiral na code para gamitin ang function na ito:

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
// Lumikha ng interface ng Bot para sa natural na pakikipag-ugnayan gamit ang wika
public interface Bot {
    String chat(String prompt);
}

// I-configure ang serbisyo ng AI gamit ang LLM at mga tool ng MCP
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

Sa naunang code ay:

- Nagdeklara ng simpleng `Bot` interface para sa natural language interactions
- Ginamit ang LangChain4j's `AiServices` upang awtomatikong i-bind ang LLM sa MCP tool provider
- Awtomatikong pinangangasiwaan ng framework ang pag-convert ng tool schema at pagtawag ng function sa likod ng mga eksena
- Nilalaktawan ng paraan na ito ang manual na conversion ng tool - ang LangChain4j ang humahawak ng lahat ng kumplikasyon sa pag-convert ng MCP tools sa LLM-compatible format

#### Rust

Para i-convert ang MCP tool response sa format na naiintindihan ng LLM, magdadagdag tayo ng helper function na magfo-format ng listahan ng mga kasangkapan. Idagdag ang sumusunod na code sa iyong `main.rs` file sa ibaba ng `main` function. Tatawagin ito kapag gumagawa ng mga request sa LLM:

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

Maganda, handa na tayo para pangasiwaan ang mga user request, kaya gawin natin iyon sa susunod.

### -4- Pangasiwaan ang user prompt request

Sa bahaging ito ng code, pangangasiwaan natin ang mga user request.

#### TypeScript

1. Magdagdag ng method na gagamitin upang tawagin ang LLM:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. Tawagan ang tool ng server
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Gawin ang isang bagay gamit ang resulta
        // TODO

        }
    }
    ```

    Sa naunang code natin:

    - Nagdagdag ng method na `callTools`.
    - Tinitingnan ng method kung anong mga kasangkapan ang tinawag batay sa sagot ng LLM:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // tawagan ang kasangkapan
        }
        ```

    - Tinatawag ang isang kasangkapan kung ipinapakita ng LLM na dapat ito tawagin:

        ```typescript
        // 2. Tawagan ang tool ng server
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Gawin ang isang bagay gamit ang resulta
        // GAGAWIN PA
        ```

2. I-update ang `run` method para isama ang mga tawag sa LLM at sa `callTools`:

    ```typescript

    // 1. Gumawa ng mga mensahe na input para sa LLM
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. Tawagin ang LLM
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. Suriin ang sagot ng LLM, para sa bawat pagpipilian, tingnan kung may mga tawag sa tool
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

Maganda, ilista natin nang buo ang code:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Mag-import ng zod para sa schema validation

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // maaaring kailanganin baguhin sa url na ito sa hinaharap: https://models.github.ai/inference
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
          // Gumawa ng zod schema base sa input_schema
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // Malinaw na itakda ang type bilang "function"
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
    
    
          // 2. Tawagan ang tool ng server
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. Gawin ang isang bagay gamit ang resulta
          // GAGAWIN PA
    
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
    
        // 3. Suriin ang sagot ng LLM, para sa bawat pagpipilian, tingnan kung mayroon itong mga tawag sa tool
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

1. Magdagdag tayo ng mga import na kailangan upang tawagan ang LLM

    ```python
    # llm
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. Susunod, idagdag ang function na tatawag sa LLM:

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
            # Mga opsyonal na parameter
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

    Sa naunang code:

    - Ipinasa natin ang mga function, na nakuha sa MCP server at na-convert, sa LLM.
    - Tinawag natin ang LLM gamit ang mga function na iyon.
    - Sinisiyasat natin ang resulta para malaman kung anong mga function ang dapat tawagin.
    - Sa huli, ipinapasa natin ang isang array ng mga function para tawagan.

3. Panghuling hakbang, i-update ang ating main code:

    ```python
    prompt = "Add 2 to 20"

    # itanong sa LLM kung ano ang mga kasangkapan, kung mayroon man
    functions_to_call = call_llm(prompt, functions)

    # tawagan ang mga iminungkahing function
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    Narito ang huling hakbang, sa code sa itaas ay:

    - Tumatawag ng MCP tool gamit ang `call_tool` sa pamamagitan ng function na naisip ng LLM na dapat tawagin base sa prompt.
    - Ipiniprint ang resulta ng tawag sa MCP Server.

#### .NET

1. Ipakita natin ang code para sa LLM prompt request:

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

    Sa naunang code:

    - Kinuha ang mga kasangkapan mula sa MCP server, `var tools = await GetMcpTools()`.
    - Ideklara ang user prompt `userMessage`.
    - Gumawa ng object ng options na nagtatakda ng model at tools.
    - Gumawa ng request sa LLM.

2. Huling hakbang, tingnan natin kung sa tingin ng LLM ay dapat tayong tumawag ng function:

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

    Sa naunang code:

    - Nilakbay ang listahan ng function calls.
    - Para sa bawat tawag sa kasangkapan, binasa ang pangalan at mga argumento at tinawag ang kasangkapan sa MCP server gamit ang MCP client. Ipiniprint ang resulta.

Narito ang buong code:

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
    // Isagawa ang mga kahilingan sa likas na wika na awtomatikong gumagamit ng mga tool ng MCP
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

Sa naunang code:

- Gumamit ng simpleng natural language prompts upang makipag-ugnayan sa mga kasangkapan ng MCP server
- Awtomatikong pinangangasiwaan ng LangChain4j framework ang:
  - Pag-convert ng mga user prompt sa mga tawag sa kasangkapan kapag kailangan
  - Pagtawag sa mga naaangkop na MCP tools batay sa desisyon ng LLM
  - Pamamahala sa daloy ng pag-uusap sa pagitan ng LLM at MCP server
- Ang `bot.chat()` method ay nagbabalik ng mga natural language response na maaaring kabilang ang resulta mula sa pagpapatupad ng MCP tool
- Nagbibigay ito ng seamless user experience kung saan hindi na kailangang malaman ng mga user ang likod na implementasyon ng MCP

Halimbawang kumpletong code:

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

Dito nagaganap ang karamihan sa trabaho. Tatawagin natin ang LLM gamit ang unang user prompt, pagkatapos ay ipoproseso ang tugon upang malaman kung kailangang tumawag ng mga kasangkapan. Kung oo, tatawagin natin ang mga kasangkapan at ipagpapatuloy ang pag-uusap sa LLM hanggang wala nang kailangang tawaging kasangkapan at mayroon na tayong pinal na tugon.

Gagawa tayo ng maraming tawag sa LLM, kaya gumawa tayo ng function na maghahawak ng tawag sa LLM. Idagdag ang sumusunod na function sa iyong `main.rs` file:

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

Tumatanggap ang function na ito ng LLM client, listahan ng mga mensahe (kasama ang user prompt), mga kasangkapan mula sa MCP server, at nagpapadala ng request sa LLM, na nagbabalik ng tugon.
Ang tugon mula sa LLM ay maglalaman ng isang array ng `choices`. Kailangan nating iproseso ang resulta upang makita kung mayroong anumang `tool_calls`. Ipinapahiwatig nito na ang LLM ay humihiling na tawagan ang isang partikular na tool gamit ang mga argumento. Idagdag ang sumusunod na code sa ilalim ng iyong `main.rs` file upang tukuyin ang isang function na hahawak sa tugon ng LLM:

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

    // I-print ang nilalaman kung mayroon
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // Pangasiwaan ang mga tawag ng tool
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // Magdagdag ng mensahe ng katulong

        // Isagawa ang bawat tawag ng tool
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // Idagdag ang resulta ng tool sa mga mensahe
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // Ipagpatuloy ang pag-uusap gamit ang mga resulta ng tool
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
  
Kung mayroon `tool_calls`, kinukuha nito ang impormasyon ng tool, tinatawag ang MCP server gamit ang kahilingan para sa tool, at idinadagdag ang mga resulta sa mga mensahe ng pag-uusap. Pagkatapos ay ipinagpapatuloy ang pag-uusap sa LLM at ina-update ang mga mensahe gamit ang tugon ng assistant at mga resulta ng tawag sa tool.

Upang kunin ang impormasyon ng tawag sa tool na ibinabalik ng LLM para sa mga tawag sa MCP, magdadagdag tayo ng isa pang helper function upang kunin ang lahat ng kailangan upang gawin ang tawag. Idagdag ang sumusunod na code sa ilalim ng iyong `main.rs` file:

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
  
Sa lahat ng bahagi nang nakaayos, maaari na nating hawakan ang paunang user prompt at tawagan ang LLM. I-update ang iyong `main` function upang isama ang sumusunod na code:

```rust
// Usapan ng LLM na may tawag sa tool
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
  
Ito ay magtatanong sa LLM gamit ang paunang user prompt na humihiling ng suma ng dalawang numero, at ipoproseso ang tugon upang dynamic na hawakan ang mga tawag sa tool.

Magaling, nagawa mo na!

## Assignment

Kunin ang code mula sa ehersisyo at palawakin ang server gamit ang ilan pang mga tool. Pagkatapos ay gumawa ng client gamit ang LLM, tulad sa ehersisyo, at subukan ito gamit ang iba't ibang mga prompt upang matiyak na lahat ng iyong mga tool sa server ay natatawag nang dynamic. Ang ganitong paraan ng paggawa ng client ay nangangahulugan na magkakaroon ng mahusay na karanasan ang end user dahil maaari silang gumamit ng mga prompt, sa halip ng eksaktong mga client command, at hindi nila mapapansin kung tawagin man ang anumang MCP server.

## Solution

[Solution](./solution/README.md)

## Key Takeaways

- Ang pagdaragdag ng LLM sa iyong client ay nagbibigay ng mas mahusay na paraan para makipag-interact ang mga user sa MCP Servers.
- Kailangan mong i-convert ang tugon ng MCP Server sa isang bagay na maiintindihan ng LLM.

## Samples

- [Java Calculator](../samples/java/calculator/README.md)  
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)  
- [JavaScript Calculator](../samples/javascript/README.md)  
- [TypeScript Calculator](../samples/typescript/README.md)  
- [Python Calculator](../../../../03-GettingStarted/samples/python)  
- [Rust Calculator](../../../../03-GettingStarted/samples/rust)

## Additional Resources

## What's Next

- Susunod: [Consuming a server using Visual Studio Code](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->