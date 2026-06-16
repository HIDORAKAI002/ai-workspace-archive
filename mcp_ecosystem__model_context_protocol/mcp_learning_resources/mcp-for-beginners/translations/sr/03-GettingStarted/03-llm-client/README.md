# Креирање клијента са LLM-ом

До сада сте видели како се креира сервер и клијент. Клијент је могао да директно позове сервер да би добио листу његових алата, ресурса и упита. Међутим, ово није баш практичан приступ. Ваша публика живи у агенцијској ери и очекује да користи упите и комуницира са LLM-ом. Њих не занима да ли користите MCP за чување ваших могућности; они једноставно очекују интеракцију у природном језику. Како то да решимо? Решење је да додамо LLM клијенту.

## Преглед

У овој лекцији се фокусирамо на додавање LLM-а вашем клијенту и показујемо како то пружа много боље корисничко искуство.

## Циљеви учења

До краја ове лекције ћете моћи да:

- Креирате клијента са LLM-ом.
- Безпрекиодно комуницирате са MCP сервером користећи LLM.
- Понудите боље корисничко искуство на страни клијента.

## Приступ

Хајде да разумемо приступ који треба да применимо. Додавање LLM-а звучи једноставно, али да ли ћемо то заиста и урадити?

Ево како ће клијент комуницирати са сервером:

1. Успостави конекцију са сервером.

1. Листати могућности, упите, ресурсе и алате, и сачувати њихову шему.

1. Додати LLM и проследити сачуване могућности и њихову шему у формату који LLM разуме.

1. Обрадити кориснички упит тако што ће се проследити LLM-у заједно са алатима које је клијент набројао.

Одлично, сада када разумемо високонајбољи приступ, покушајмо то у наредном задатку.

## Вежба: Креирање клијента са LLM-ом

У овој вежби ћемо научити како да додамо LLM нашем клијенту.

### Аутентификација коришћењем GitHub Personal Access Token

Креирање GitHub токена је једноставан процес. Ево како то можете урадити:

- Идите на GitHub Settings – Кликните на вашу слику профила у горњем десном углу и одаберите Settings.
- Навигација до Developer Settings – Померите се доле и кликните на Developer Settings.
- Изаберите Personal Access Tokens – Кликните на Fine-grained tokens, па онда Generate new token.
- Конфигуришите свој токен – Додајте напомену за референцу, подесите датум истека и изаберите неопходне опсеге (дозволе). У овом случају обавезно додајте Models дозволу.
- Генеришите и копирајте токен – Кликните Generate token и након тога копирајте токен одмах, јер га касније нећете моћи видети поново.

### -1- Повезивање са сервером

Прво креирајмо наш клијент:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Увези зод за валидацију шеме

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

У претходном коду смо:

- Увезли потребне библиотеке
- Креирали класу са два члана, `client` и `openai`, који ће нам помоћи да управљамо клијентом и комуницирамо са LLM-ом
- Конфигурисали инстанцу LLM-а да користи GitHub Models подешавањем `baseUrl` да указује на inference API

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# Креирајте параметре сервера за стдио везу
server_params = StdioServerParameters(
    command="mcp",  # Извршни фајл
    args=["run", "server.py"],  # Опциони аргументи командне линије
    env=None,  # Опционе системске променљиве
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # Иницијализујте везу
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

У претходном коду смо:

- Увезли потребне библиотеке за MCP
- Креирали клијента

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

Прво, потребно је да додате зависности LangChain4j у ваш `pom.xml` фајл. Додајте ове зависности за омогућавање MCP интеграције и подршке за GitHub Models:

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

Затим креирајте вашу Java класа клијента:

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
    
    public static void main(String[] args) throws Exception {        // Конфигуришите ЛЛМ да користи ГитХаб моделе
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // Креирајте МЦП транспорт за повезивање са сервером
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // Креирајте МЦП клијента
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

У претходном коду смо:

- **Додали LangChain4j зависности**: Потребне за MCP интеграцију, званични OpenAI клијент и подршку GitHub Models
- **Увезли LangChain4j библиотеке**: За MCP интеграцију и функционалност OpenAI chat модела
- **Креирали `ChatLanguageModel`**: Конфигурисаног да користи GitHub Models са вашим GitHub токеном
- **Подесили HTTP транспорт**: Користећи Server-Sent Events (SSE) за повезивање са MCP сервером
- **Креирали MCP клијента**: Који ће управљати комуникацијом са сервером
- **Користили уграђену MCP подршку LangChain4j-а**: Која поједностављује интеграцију између LLM-а и MCP сервера

#### Rust

Овај пример претпоставља да имате Rust заснован MCP сервер у раду. Ако га немате, вратите се на лекцију [01-first-server](../01-first-server/README.md) да бисте направили сервер.

Када имате свој Rust MCP сервер, отворите терминал и идите у исти директоријум као и сервер. Онда покрените следећу команду да бисте креирали нови LLM клијент пројекат:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

Додајте следеће зависности у ваш `Cargo.toml` фајл:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> Не постоји званична Rust библиотека за OpenAI, али `async-openai` crate је [једна библиотека коју одржава заједница](https://platform.openai.com/docs/libraries/rust#rust) и често се користи.

Отворите фајл `src/main.rs` и замените његов садржај следећим кодом:

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
    // Почетна порука
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // Подешавање OpenAI клијента
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // Подешавање MCP клијента
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

    // TODO: Преузети листу алата MCP

    // TODO: Разговор LLM-а са позивима алата

    Ok(())
}
```

Овај код подешава основну Rust апликацију која ће се повезати на MCP сервер и GitHub Models за LLM интеракцију.

> [!IMPORTANT]
> Обавезно поставите `OPENAI_API_KEY` окружење променљиву са вашим GitHub токеном пре покретања апликације.

Одлично, следећи корак је да набројимо могућности на серверу.

### -2- Листирање могућности сервера

Сада ћемо се повезати на сервер и затражити његове могућности:

#### TypeScript

У истој класи додајте следеће методе:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // преглед алата
    const toolsResult = await this.client.listTools();
}
```

У претходном коду смо:

- Додали код за повезивање на сервер, `connectToServer`.
- Креирали метод `run` који управља током апликације. Засад само листа алате, али ћемо додати још функција ускоро.

#### Python

```python
# Прикажи доступне ресурсе
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# Прикажи доступне алате
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

Ево шта смо додали:

- Листирање ресурса и алата и штампање тих резултата. За алате смо такође набројали `inputSchema` који ћемо касније користити.

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

У претходном коду смо:

- Листали алате доступне на MCP Серверу
- За сваки алат приказали име, опис и његову шему. Ово последње ћемо користити за позив алата ускоро.

#### Java

```java
// Креирајте провајдера алата који аутоматски открива MCP алате
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// Провајдер MCP алата аутоматски обрађује:
// - Листинг доступних алата са MCP сервера
// - Конвертовање шема MCP алата у LangChain4j формат
// - Управљање извршењем алата и одговорима
```

У претходном коду смо:

- Креирали `McpToolProvider` који аутоматски открива и региструје све алате са MCP сервера
- Пружаоцу алата се интерно обрађује конверзија из MCP шема алата у LangChain4j формат
- Овај приступ апстрахује ручно листирање и конверзију алата

#### Rust

Преузимање алата са MCP сервера се врши методом `list_tools`. У вашој `main` функцији, након подешавања MCP клијента, додајте следећи код:

```rust
// Добиј листу МЦП алата
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- Конверзија могућности сервера у LLM алате

Наредни корак након листирања могућности сервера је да их конвертујемо у формат који LLM разуме. Кад то урадимо, можемо те могућности пружити као алате нашем LLM-у.

#### TypeScript

1. Додајте следећи код који конвертује одговор са MCP сервера у формат алата који LLM може да користи:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // Креирајте зод шему засновану на улазној шеми
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // Јасно подесите тип на "функција"
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

    Код изнад узима одговор са MCP сервера и конвертује га у дефиницију алата коју LLM разуме.

2. Ажурирајмо сада `run` методу да листа могућности сервера:

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

    У претходном коду смо ажурирали `run` методу да мапира кроз резултат и за сваки унос позива `openAiToolAdapter`.

#### Python

1. Прво, креирајмо следећу конверзиону функцију

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

    У функцији `convert_to_llm_tools` узимамо одговор MCP алата и претварамо у формат који LLM може да разуме.

2. Затим, ажурирајмо наш клиентски код да користи ову функцију овако:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    Овде додајемо позив `convert_to_llm_tool` да конвертујемо одговор MCP алата у нешто што касније можемо проследити LLM-у.

#### .NET

1. Додајмо код за конверзију одговора MCP алата у нешто што LLM разуме:

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

У претходном коду смо:

- Креирали функцију `ConvertFrom` која узима име, опис и улазну шему.
- Дефинисали функционалност која креира `FunctionDefinition` који се прослеђује `ChatCompletionsDefinition`. Ово последње је нешто што LLM може да разуме.

2. Погледајмо како можемо ажурирати постојећи код да искористи ову функцију:

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
// Креирајте Бот интерфејс за интеракцију природним језиком
public interface Bot {
    String chat(String prompt);
}

// Поставите АИ сервис са ЛЛМ и МЦП алатима
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

У претходном коду смо:

- Дефинисали једноставан `Bot` интерфејс за интеракцију на природном језику
- Користили LangChain4j `AiServices` да аутоматски вежу LLM са MCP добављачем алата
- Оквир аутоматски управља конверзијом шема алата и позивима функција иза сцене
- Овај приступ елиминише ручну конверзију алата - LangChain4j управља свом сложеношћу претварања MCP алата у LLM-компатибилан формат

#### Rust

Да бисмо конвертовали одговор MCP алата у формат који LLM разуме, додаћемо помоћну функцију која форматира листинг алата. Додајте следећи код у `main.rs` датотеку испод `main` функције. Ово ће се користити приликом захтева ка LLM-у:

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

Одлично, сада смо подесили да обрађујемо корисничке захтеве, па хајде да то урадимо следеће.

### -4- Обрада корисничког упита

У овом делу кода ћемо обрађивати корисничке захтеве.

#### TypeScript

1. Додајте метод који ће се користити за позив нашег LLM-а:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. Позови алатку сервера
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Уради нешто са резултатом
        // ЗА УРАДИТИ

        }
    }
    ```

    У претходном коду смо:

    - Додали метод `callTools`.
    - Метод прима LLM одговор и проверава који су алати позвани, ако је неко:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // позови алат
        }
        ```

    - Позива алат ако LLM индикдује да треба да буде позван:

        ```typescript
        // 2. Позови алат сервера
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Уради нешто са резултатом
        // ЗА УРАДИТИ
        ```

2. Ажурирајте `run` методу да укључи позиве LLM-у и `callTools`:

    ```typescript

    // 1. Креирај поруке које су улаз за ЛЛМ
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. Позивање ЛЛМ-а
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. Прођи кроз одговор ЛЛМ-а, за сваки избор провери да ли има позиве алата
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

Одлично, ево комплетног кода:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Увези зод за валидацију шеме

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // можда ће бити потребно променити на овај УРЛ у будућности: https://models.github.ai/inference
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
          // Креирај зод шему засновану на input_schema
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // Јасно подеси тип на "function"
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
    
    
          // 2. Позови алатку сервера
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. Уради нешто са резултатом
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
    
        // 3. Прођи кроз ЛЛМ одговор, провери сваки избор да ли има позиве алата
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

1. Додајмо потребне увозе за позив LLM-а

    ```python
    # llm
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. Следеће, додајмо функцију која ће позвати LLM:

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
            # Опционални параметри
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

    У претходном коду смо:

    - Проследили функције које смо пронашли на MCP серверу и конвертовали LLM-у.
    - Позвали затим LLM са тим функцијама.
    - Инспектовали резултат да видимо које функције треба позвати, ако их има.
    - На крају, проследили низ функција које треба позвати.

3. Последњи корак, ажурирајмо главни код:

    ```python
    prompt = "Add 2 to 20"

    # питај LLM које алате користити, ако их има
    functions_to_call = call_llm(prompt, functions)

    # позови предложене функције
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    Ето то је био последњи корак, у горе наведеном коду ми:

    - Позивамо MCP алат преко `call_tool` користећи функцију коју је LLM сматрао да треба позвати на основу нашег упита.
    - Штампамо резултат позива алата на MCP сервер.

#### .NET

1. Показујемо пример кода за LLM упит:

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

    У претходном коду смо:

    - Преузели алате са MCP сервера, `var tools = await GetMcpTools()`.
    - Дефинисали кориснички упит `userMessage`.
    - Конструисали опције са подешеним моделом и алатима.
    - Упит упутили ка LLM-у.

2. Још један корак, погледајмо да ли LLM мисли да треба позвати неку функцију:

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

    У претходном коду смо:

    - Прошли кроз листу позива функција.
    - За сваки позив алата, анализирали име и аргументе и позвали алат на MCP серверу помоћу MCP клијента. На крају штампамо резултате.

Комплетан код:

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
    // Извршите захтеве на природном језику који аутоматски користе МЦП алате
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

У претходном коду смо:

- Користили једноставне природне језичке упите за интеракцију са MCP алатима
- LangChain4j оквир аутоматски управља:
  - Претварањем корисничких упита у позиве алата када је то потребно
  - Позивом одговарајућих MCP алата на основу одлука LLM-а
  - Управљањем током конверзације између LLM-а и MCP сервера
- `bot.chat()` метода враћа одговоре на природном језику који могу укључивати резултате извршавања MCP алата
- Овај приступ обезбеђује беспрекорно корисничко искуство где корисници не морају знати за унутрашњу MCP имплементацију

Комплетан пример кода:

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

Овде се одвија већина рада. Позваћемо LLM са почетним корисничким упитом, па обрадити одговор да видимо да ли треба позвати неке алате. Ако треба, позваћемо их и наставити конверзацију са LLM-ом док не буде више потребе за позивима и не добијемо коначни одговор.

Правићемо више позива LLM-у, па дефинишемо функцију која ће управљати позивом LLM-а. Додајте следећу функцију у ваш `main.rs` фајл:

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

Ова функција прима LLM клијента, листу порука (укључујући кориснички упит), алате са MCP сервера и шаље захтев LLM-у, враћајући одговор.
Одговор од LLM ће садржати низ `choices`. Мораћемо да обрадимо резултат како бисмо видели да ли постоје `tool_calls`. Ово нам говори да LLM тражи да се позове одређени алат са аргументима. Додајте следећи код на дно вашег `main.rs` фајла да дефинишете функцију која обрађује LLM одговор:

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

    // Испиши садржај ако је доступан
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // Обради позиве алата
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // Додај поруку асистента

        // Изврши сваки позив алата
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // Додај резултат алата у поруке
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // Настави разговор са резултатима алата
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

Ако су `tool_calls` присутни, извлачи информације о алату, позива MCP сервер са захтевом за алат и додаје резултате у поруке конверзације. Затим наставља конверзацију са LLM и поруке се ажурирају са одговором асистента и резултатима позива алата.

Да бисмо извукли информације о позиву алата које LLM враћа за MCP позиве, додаћемо још једну помоћну функцију која извлачи све што је потребно за извршење позива. Додајте следећи код на дно вашег `main.rs` фајла:

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

Са свим деловима на месту, сада можемо да обрадимо почетни кориснички упит и позовемо LLM. Ажурирајте вашу `main` функцију да укључи следећи код:

```rust
// ЛЛМ разговор са позивима алата
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

Ово ће упитати LLM са почетним корисничким упитом за суму два броја, и обрадиће одговор да динамички рукује позивима алата.

Сјајно, успели сте!

## Задатак

Узмите код из вежбе и изградите сервер са још алата. Затим креирајте клијента са LLM, као у вежби, и тестирајте га са различитим упитима да бисте били сигурни да се сви ваши серверски алати позивају динамички. Оваквим приступом изградње клијента, крајњи корисник има одлично корисничко искуство јер може да користи упите уместо тачних команди клијента, а да при томе не буде свестан MCP сервера који се позива.

## Решење

[Решење](./solution/README.md)

## Кључне поуке

- Додавање LLM у ваш клијент пружа бољи начин за интеракцију корисника са MCP серверима.
- Потребно је претворити одговор MCP сервера у нешто што LLM може да разуме.

## Примери

- [Java калкулатор](../samples/java/calculator/README.md)
- [.Net калкулатор](../../../../03-GettingStarted/samples/csharp)
- [JavaScript калкулатор](../samples/javascript/README.md)
- [TypeScript калкулатор](../samples/typescript/README.md)
- [Python калкулатор](../../../../03-GettingStarted/samples/python)
- [Rust калкулатор](../../../../03-GettingStarted/samples/rust)

## Додатни ресурси

## Следеће

- Следеће: [Конзумирање сервера помоћу Visual Studio Code](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->