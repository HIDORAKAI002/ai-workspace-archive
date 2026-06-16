# បង្កើត client ជាមួយ LLM

មកដល់ឡើងនេះ អ្នកបានឃើញពីវិធីបង្កើតម៉ាស៊ីនបម្រើ និង client។ Client អាចហៅម៉ាស៊ីនបម្រើដោយច្បាស់ដើម្បីបង្ហាញបញ្ជីឧបករណ៍ ប្រាក់ធនធាន និងការបញ្ចូលបញ្ជា។ ទោះបីជាយ៉ាងណា វាមិនមែនជាវិធីសាស្រ្តដែលមានប្រយោជន៍ខ្លាំងទេ។ អ្នកប្រើប្រាស់របស់អ្នករស់នៅក្នុងយុគសម័យភ្នាក់ងារនិងរំពឹងថានឹងប្រើប្រាស់ការបញ្ចូលបញ្ជានិងទំនាក់ទំនងជាមួយ LLM។ ពួកគេចង់បានត្រឹមតែការប្រាស្រ័យប្រយោលតាមភាសាធម្មជាតិ ដោយមិនព្រួយថាតើអ្នកប្រើ MCP ដើម្បីរក្សាទុកសមត្ថភាពរបស់អ្នកឬក៏ទេ។ ដូច្នេះ តើយើងដោះស្រាយវាដូចម្តេច? ដំណោះស្រាយគឺបន្ថែម LLM ទៅ client។

## ទិដ្ឋភាពទូទៅ

នៅមេរៀននេះ យើងផ្តោតលើការបន្ថែម LLM ទៅ client របស់អ្នក ហើយបង្ហាញពីរបៀបដែលវាបង្កើតបទពិសោធន៍ល្អជាងសម្រាប់អ្នកប្រើរបស់អ្នក។

## គោលបំណងការសិក្សា

នៅចុងបញ្ចប់មេរៀននេះ អ្នកនឹងអាច:

- បង្កើត client ជាមួយ LLM។
- ទំនាក់ទំនងជាស្ទើរតែមិនមានបញ្ហាជាមួយម៉ាស៊ីនបម្រើ MCP ដោយប្រើ LLM។
- ផ្តល់បទពិសោធន៍ល្អជាងសម្រាប់អ្នកប្រើចុងក្រោយនៅផ្នែក client។

## វិធីសាស្រ្ត

មកយល់ដឹងពីវិធីសាស្រ្តដែលយើងត្រូវអនុវត្ត។ ការ​បន្ថែម LLM តាមបែបសាមញ្ញ ប៉ុន្តែតើយើងពិតជានឹងធ្វើវាទេ?

នេះជារបៀបដែល client នឹងនៅក្នុងទំនាក់ទំនងជាមួយម៉ាស៊ីនបម្រើ៖

1. បង្កើតការតភ្ជាប់ជាមួយម៉ាស៊ីនបម្រើ។

1. បង្ហាញបញ្ជីសមត្ថភាព បញ្ចូលបញ្ជា ប្រាក់ធនធាន និងឧបករណ៍ និងរក្សាទុកស្ពេក្រមរបស់ពួកវា។

1. បន្ថែម LLM ហើយផ្ញើសមត្ថភាព និងស្ពេខ្រមដែលបានរក្សាទុកទៅ LLM ក្នុងទ្រង់ទ្រាយដែល LLM អាចយល់បាន។

1. កែលម្អការបញ្ចូលបញ្ជារបស់អ្នកប្រើដោយផ្ញើវាទៅ LLM រួមជាមួយឧបករណ៍ដែលបានបញ្ជីដោយ client។

អស្ចារ្យ ទទួលយល់រួចរាល់ពីរបៀបធ្វើការលើកនេះដូចម្តេច នៅពេលនេះមកសាកល្បងវានៅលំហាត់ខាងក្រោម។

## លំហាត់៖ បង្កើត client ជាមួយ LLM

នៅលំហាត់នេះ យើងនឹងរៀនបន្ថែម LLM ទៅ client របស់យើង។

### ការផ្ទៀងផ្ទាត់ដោយប្រើ GitHub Personal Access Token

ការបង្កើត token GitHub គឺជាដំណើរការងាយស្រួល។ នេះជាវិធីដែលអ្នកអាចធ្វើបាន៖

- ទៅកាន់ GitHub Settings – ចុចលើរូបប្រវត្តិរូបអ្នកនៅខាងស្តាំលើ និងជ្រើស Settings។
- ទៅកាន់ Developer Settings – ធ្វើការរុករកចុះក្រោម ហើយចុចលើ Developer Settings។
- ជ្រើស Personal Access Tokens – ចុចលើ Fine-grained tokens បន្ទាប់មក Generate new token។
- កំណត់ token របស់អ្នក – បន្ថែមកំណត់សំគាល់សម្រាប់យោង កំណត់កាលបរិច្ឆេទផុٹ និងជ្រើស scope (សិទ្ធិ) ដែលត្រូវការ។ ក្នុងករណីនេះ សូមប្រាកដថាបន្ថែមសិទ្ធិ Models។
- បង្កើតនិងចម្លង token – ចុច Generate token ហើយផ្ទៀងផ្ទាត់ចម្លងវាបន្ទាប់ពីបង្កើត ព្រោះអ្នកនឹងមិនអាចមើលវិញទេ។

### -1- តភ្ជាប់ទៅម៉ាស៊ីនបម្រើ

មកបង្កើត client របស់យើងជាដំបូង៖

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // នាំចូល zod សម្រាប់ផ្ទៀងផ្ទាត់ schema

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

ក្នុងកូដខាងលើ យើងបាន៖

- នាំចូលបណ្ណាល័យដែលត្រូវការ
- បង្កើតថ្នាក់មួយ ដែលមានសមាសភាពពីរគឺ `client` និង `openai` ដែលជួយគ្រប់គ្រង client និងទំនាក់ទំនងជាមួយ LLM ដោយឡែក
- កំណត់ instance LLM របស់យើង ដើម្បីប្រើ GitHub Models ដោយកំណត់ `baseUrl` ទៅ API inference

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# បង្កើតប៉ារ៉ាម៉ែត្រម៉ាស៊ីនម៉ាស៊ីនសម្រាប់ការតភ្ជាប់ stdio
server_params = StdioServerParameters(
    command="mcp",  # អាចអនុវត្តបាន
    args=["run", "server.py"],  # អាគុយម៉ង់បន្ទាត់បញ្ជា​ជាជម្រើស
    env=None,  # អថេរស្ថាន(environment)ជាជម្រើស
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # ចាប់ផ្តើមការតភ្ជាប់
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

ក្នុងកូដខាងលើ យើងបាន៖

- នាំចូលបណ្ណាល័យដែលត្រូវការសម្រាប់ MCP
- បង្កើត client

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

ជាមុនសិន អ្នកត្រូវបន្ថែម dependencies LangChain4j ទៅឯកសារ `pom.xml` របស់អ្នក។ បន្ថែម dependencies ទាំងនេះ ដើម្បីអនុវិទ្យាសមាគម MCP និងគាំទ្រ GitHub Models៖

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

បន្ទាប់មកបង្កើតថ្នាក់ client Java របស់អ្នក៖

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
    
    public static void main(String[] args) throws Exception {        // កំណត់រចនាសម្ព័ន្ធ LLM ដើម្បីប្រើម៉ូដែល GitHub
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // បង្កើតការដឹកជញ្ជូន MCP សម្រាប់ភ្ជាប់ទៅម៉ាស៊ែរ
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // បង្កើតអតិថិជន MCP
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

ក្នុងកូដខាងលើ យើងបាន៖

- **បន្ថែម dependencies LangChain4j**៖ ដែលត្រូវការសម្រាប់ MCP សមាគម OpenAI និងគាំទ្រ GitHub Models
- **នាំចូលបណ្ណាល័យ LangChain4j**៖ សម្រាប់ MCP សមាគម និងមុខងារ OpenAI chat model
- **បង្កើត `ChatLanguageModel`**៖ កំណត់ប្រើ GitHub Models ជាមួយ token GitHub របស់អ្នក
- **កំណត់ HTTP transport**៖ ប្រើ Server-Sent Events (SSE) ដើម្បីតភ្ជាប់ទៅម៉ាស៊ីនបម្រើ MCP
- **បង្កើត client MCP**៖ ដើម្បីគ្រប់គ្រងការទំនាក់ទំនងជាមួយម៉ាស៊ីនបម្រើ
- **ប្រើការគាំទ្ររបស់ LangChain4j ជូន MCP**៖ ដែលធ្វើឲ្យការចូលរួមរវាង LLM និងម៉ាស៊ីនបម្រើ MCP ងាយស្រួល

#### Rust

ឧទាហរណ៍នេះសន្មតថា អ្នកមានម៉ាស៊ីនបម្រើ MCP បង្កើតពី Rust រួច។ ប្រសិនបើមិនមាន សូមតាមបទយកការណ៍ [01-first-server](../01-first-server/README.md) ដើម្បីបង្កើតម៉ាស៊ីនបម្រើ។

ពេលដែលអ្នកមានម៉ាស៊ីនបម្រើ MCP របស់ Rust រួច បើក terminal ហើយចូលទៅកាន់ថតដែលមានម៉ាស៊ីនបម្រើ។ បន្ទាប់មករត់បញ្ជា ខាងក្រោម ដើម្បីបង្កើត project client LLM ថ្មី៖

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

បន្ថែម dependencies ខាងក្រោមទៅឯកសារ `Cargo.toml` របស់អ្នក៖

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> មិនមានបណ្ណាល័យ Rust ផ្លូវការសម្រាប់ OpenAI ទេ ប៉ុន្ដែ `async-openai` គឺជាបណ្ណាល័យដែលសហគមន៍ថែរក្សា ([community maintained library](https://platform.openai.com/docs/libraries/rust#rust)) ដែលត្រូវបានប្រើប្រាស់ទូទៅ។

បើកឯកសារ `src/main.rs` ហើយជំនួសខ្លឹមសាររបស់វាជាមួយកូដខាងក្រោម៖

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
    // សារដំបូង
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // ការដាក់តម្លើងអតិថិជន OpenAI
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // ការដាក់តម្លើងអតិថិជន MCP
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

    // TODO: ទទួលបានបញ្ជីឧបករណ៍ MCP

    // TODO: ការសន្ទនាប្រព័ន្ធ LLM ជាមួយការហៅឧបករណ៍

    Ok(())
}
```

កូដនេះកំណត់កម្មវិធី Rust មូលដ្ឋាន ដែលនឹងភ្ជាប់ទៅម៉ាស៊ីនបម្រើ MCP និង GitHub Models សម្រាប់ការទំនាក់ទំនង LLM។

> [!IMPORTANT]
> សូមប្រាកដថា បានកំណត់អថេរ environment `OPENAI_API_KEY` ជាមួយ token GitHub របស់អ្នក មុនពេលដំណើរការ​កម្មវិធី។

អស្ចារ្យ សម្រាប់ជំហានបន្ទាប់ យើងមកបង្ហាញបញ្ជីសមត្ថភាពនៅម៉ាស៊ីនបម្រើ។

### -2- បង្ហាញបញ្ជីសមត្ថភាពម៉ាស៊ីនបម្រើ

ឥឡូវនេះ យើងនឹងភ្ជាប់ទៅម៉ាស៊ីនបម្រើ ហើយសួរអំពីសមត្ថភាពរបស់វា៖

#### Typescript

នៅក្នុងថ្នាក់ដូចគ្នា បន្ថែមមេធដ្ឋានខាងក្រោម៖

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // បញ្ជីឧបករណ៍
    const toolsResult = await this.client.listTools();
}
```

ក្នុងកូដខាងលើ យើងបាន៖

- បន្ថែមកូដសម្រាប់ភ្ជាប់ទៅម៉ាស៊ីនបម្រើ `connectToServer`។
- បង្កើតមេធដ្ឋាន `run` មួយ សម្រាប់គ្រប់គ្រងសំណើរអ៊ឹមភ្លឺមេរោងចក្រ។ បច្ចុប្បន្នវា បញ្ជីឧបករណ៍តែមួយ ប៉ុន្តែយើងនឹងបន្ថែមច្រើនទៀតពេលក្រោយ។

#### Python

```python
# បញ្ជីធនធានដែលមានស្រាប់
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# បញ្ជីឧបករណ៍ដែលមានស្រាប់
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

នេះជា​អ្វីដែលយើងបានបន្ថែម៖

- បង្ហាញប្រាក់ធនធាន និងឧបករណ៍ ហើយបង្ហាញវាចេញ។ សម្រាប់ឧបករណ៍ យើងក៏បង្ហាញ `inputSchema` ដែលយើងប្រើនៅពេលក្រោយ។

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

ក្នុងកូដខាងលើ យើងបាន៖

- បង្ហាញឧបករណ៍ដែលអាចប្រើបាននៅលើម៉ាស៊ីនបម្រើ MCP
- សម្រាប់ឧបករណ៍មួយៗ បង្ហាញឈ្មោះ ការពិពណ៌នា និងស្ពេក្រម input របស់វា។ វាអ្វីដែលយើងនឹងប្រើហៅឧបករណ៍នៅពេលក្រោយ។

#### Java

```java
// បង្កើតអ្នកផ្តល់ឧបករណ៍មួយដែលរកឃើញឧបករណ៍ MCP ដោយស្វ័យប្រវត្តិ
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// អ្នកផ្តល់ឧបករណ៍ MCP គឺដំណើរការដោយស្វ័យប្រវត្តិ:
// - បង្ហាញបញ្ជីឧបករណ៍ដែលមានពីម៉ាស៊ីនបម្រើ MCP
// - បម្លែងស្គីម៉ាឧបករណ៍ MCP ទៅជារូបមន្ត LangChain4j
// - គ្រប់គ្រងការប្រតិបត្តិឧបករណ៍ និងការឆ្លើយតប
```

ក្នុងកូដខាងលើ យើងបាន៖

- បង្កើត `McpToolProvider` មួយ ដែលស្វែងរក និងចុះបញ្ជីឧបករណ៍ទាំងអស់ពីម៉ាស៊ីនបម្រើ MCP ដោយស្វ័យប្រវត្តិ
- អ្នកផ្តល់ឧបករណ៍នេះ គ្រប់គ្រងការបំលាស់ប្តូររវាងស្ពេក្រមឧបករណ៍ MCP និងទ្រង់ទ្រាយឧបករណ៍ LangChain4j ខាងក្នុង
- វិធីសាស្រ្តនេះបំពានពីការបញ្ជីឧបករណ៍ និងបំលាស់ប្តូរដោយដៃ

#### Rust

ការទាញយកឧបករណ៍ពីម៉ាស៊ីនបម្រើ MCP ត្រូវបានអនុវត្តដោយមុខងារ `list_tools`។ នៅក្នុងមុខងារ `main` របស់អ្នក បន្ទាប់ពីកំណត់ client MCP សូមបន្ថែមកូដខាងក្រោម៖

```rust
// ទទួលបានបញ្ជីឧបករណ៍ MCP
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- បំលែងសមត្ថភាពម៉ាស៊ីនបម្រើទៅជា​ឧបករណ៍ LLM

ជំហានបន្ទាប់ បន្ទាប់ពីបង្ហាញបញ្ជីសមត្ថភាពម៉ាស៊ីនបម្រើ គឺបំលែងវាទៅក្នុងទ្រង់ទ្រាយដែល LLM អាចយល់បាន។ បន្ទាប់មកយើងអាចផ្តល់សមត្ថភាពទាំងនេះជាឧបករណ៍ទៅ LLM របស់យើង។

#### TypeScript

1. បន្ថែមកូដខាងក្រោម ដើម្បីបំលែងចម្លើយពីម៉ាស៊ីនបម្រើ MCP ទៅទ្រង់ទ្រាយឧបករណ៍ដែល LLM អាចប្រើបាន៖

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // បង្កើតស្កីម៉ា zod ដោយផ្អែកលើ input_schema
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // កំណត់ប្រភេទជាក់លាក់ទៅ "function"
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

    កូដខាងលើយកចម្លើយពីម៉ាស៊ីនបម្រើ MCP ហើយបំលែងវាទៅកំណត់អក្សរឧបករណ៍ដែល LLM អាចយល់បាន។

2. យើងមកផ្លាស់ប្ដូរ method `run` បន្ថែមដើម្បីបង្ហាញសមត្ថភាពម៉ាស៊ីនបម្រើ៖

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

    ក្នុងកូដខាងលើ យើងបានកែប្រែ method `run` ដើម្បីផ្លាស់ប្តូររង្វាស់នៃលទ្ធផល ហើយសម្រាប់ការចូលសម្តីនីមួយ ប្រើ `openAiToolAdapter`។

#### Python

1. ជាដំណាក់កាលដំបូង បង្កើតមុខងារបំលែងខាងក្រោម៖

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

    ក្នុងមុខងារ `convert_to_llm_tools` ខាងលើ យើងយកចម្លើយឧបករណ៍ MCP ហើយបំលែងវាទៅទ្រង់ទ្រាយដែល LLM អាចយល់បាន។

2. បន្ទាប់មក កែប្រែកូដ client របស់យើង ដូចខាងក្រោម៖

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    នៅទីនេះ យើងបន្ថែមការហៅទៅកាន់ `convert_to_llm_tool` ដើម្បីបំលែងចម្លើយឧបករណ៍ MCP ទៅជារបស់ដែលយើងអាចផ្តល់ទៅ LLM នៅពេលក្រោយ។

#### .NET

1. hãy thêm code để chuyển đổi phản hồi công cụ MCP sang định dạng LLM có thể hiểu được

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

Trong đoạn code trên chúng ta đã:

- Tạo một hàm `ConvertFrom` nhận tên, mô tả và schema đầu vào.
- Định nghĩa chức năng tạo `FunctionDefinition` được chuyền vào `ChatCompletionsDefinition`. Cái sau là thứ LLM có thể hiểu.

2. Hãy xem cách cập nhật một số đoạn mã hiện có để tận dụng hàm trên:

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
// បង្កើតចំណុចប្រទាក់បុតសម្រាប់អន្តរកម្មភាសាបានយ៉ាងធម្មជាតិ
public interface Bot {
    String chat(String prompt);
}

// កំណត់រចនាសម្ព័ន្ធសេវាកម្ម AI ជាមួយឧបករណ៍ LLM និង MCP
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

Trong đoạn mã trên chúng ta đã:

- Định nghĩa một interface `Bot` đơn giản cho tương tác ngôn ngữ tự nhiên
- Sử dụng `AiServices` của LangChain4j để tự động kết nối LLM với nhà cung cấp công cụ MCP
- Framework tự động xử lý chuyển đổi schema công cụ và gọi chức năng phía sau
- Cách tiếp cận này loại bỏ việc chuyển đổi công cụ thủ công — LangChain4j xử lý độ phức tạp chuyển đổi công cụ MCP sang định dạng tương thích LLM

#### Rust

Để chuyển đổi phản hồi công cụ MCP sang định dạng mà LLM có thể hiểu, chúng tôi sẽ thêm một hàm trợ giúp để định dạng danh sách công cụ. Thêm mã sau vào tập tin `main.rs` bên dưới hàm `main`. Hàm này sẽ được gọi khi thực hiện yêu cầu đến LLM:

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

អស្ចារ្យ ខណៈនេះយើងកំពុងតែកំណត់សម្ភារៈដើម្បីដោះសោនឹងសំណើរអ្នកប្រើ បើដូចនេះ យើងទៅកាន់ជំហានបន្ទាប់។

### -4- ដោះសោនឹងសំណើរបញ្ចូលពីអ្នកប្រើ

នៅផ្នែកនេះនៃកូដ យើងនឹងដោះសោនឹងសំណើរអ្នកប្រើ។

#### TypeScript

1. បន្ថែមមេធដ្ឋានមួយ ដែលនឹងប្រើសម្រាប់ហៅ LLM៖

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. ហៅឧបករណ៍ម៉ាស៊ីនមេ
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. ធ្វើអ្វីមួយជាមួយលទ្ធផល
        // ត្រូវធ្វើ

        }
    }
    ```

    ក្នុងកូដខាងលើ យើងបាន៖

    - បន្ថែមមេធដ្ឋាន `callTools`។
    - មេធដ្ឋាននេះទទួលបានចម្លើយ LLM ហើយពិនិត្យមើលថាតើឧបករណ៍ណាត្រូវបានហៅ ប្រសិនបើមាន៖

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // ហៅឧបករណ៍
        }
        ```

    - ហៅឧបករណ៍ ប្រសិនបើ LLM បង្ហាញថាត្រូវហៅ៖

        ```typescript
        // 2. ហៅឧបករណ៍របស់ម៉ាស៊ីនបម្រើ
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. ធ្វើអ្វីមួយជាមួយលទ្ធផល
        // TODO
        ```

2. កែប្រែ method `run` ដើម្បីរួមបញ្ចូលការហៅ LLM និងហៅ `callTools`៖

    ```typescript

    // 1. បង្កើតសារដើម្បីបញ្ចូលសម្រាប់ LLM
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. เรียกใช้ LLM
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. យកចម្លើយពី LLM, សម្រាប់ជម្រើសនីមួយៗ, ពិនិត្យមើលថាវាមានការហៅឧបករណ៍ឬទេ
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

អស្ចារ្យ អ្នកអាចមើលកូដទាំងមូល៖

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // នាំចូល zod សម្រាប់ការត្រួតពិនិត្យ schema

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // ប្រហែលជាត្រូវប្តូរទៅ url នេះក្នុងអនាគត: https://models.github.ai/inference
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
          // បង្កើត schema zod អ basé លើ input_schema
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // កំណត់ប្រភេទយ៉ាងច្បាស់ទៅ "function"
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
    
    
          // 2. ហៅឧបករណ៍ពីម៉ាស៊ីនបម្រើ
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. ធ្វើអ្វីមួយជាមួយលទ្ធផល
          // អញ្ជើញធ្វើ
    
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
    
        // 3. ឆ្លងកាត់ការឆ្លើយតប LLM, សម្រាប់ជម្រើសនីមួយៗ, ពិនិត្យមើលថាតើវាមានការហៅឧបករណ៍ឬអត់
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

1. បន្ថែមការនាំចូលខាងក្រោមដែលត្រូវការ ដើម្បីហៅ LLM

    ```python
    # llm
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. បន្ទាប់មក បន្ថែមមុខងារ ដែលនឹងហៅ LLM៖

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
            # ប៉ារ៉ាម៉ែត្រជាជ្រើស
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

    ក្នុងកូដខាងលើ យើងបាន៖

    - ផ្ញើមុខងារយើងបានរកឃើញលើម៉ាស៊ីនបម្រើ MCP និងបំលែងទៅ LLM។
    - បន្ទាប់ហៅ LLM ជាមួយមុខងារនោះ។
    - ពិនិត្យលទ្ធផលមើលថាត្រូវហៅមុខងារណា ប្រសិនបើមាន។
    - ចុងក្រោយ ផ្ញើវិធីហៅមុខងារច្រើន។

3. ជំហានចុងក្រោយ កែប្រែ​កូដ​មេផង៖

    ```python
    prompt = "Add 2 to 20"

    # សួរអំពីឧបករណ៍ដែល LLM អាចប្រើបាន ទាំងអស់ ប្រសិនបើមាន
    functions_to_call = call_llm(prompt, functions)

    # ហៅមុខងារដែលបានស្នើ​ណា
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

នៅទីនេះ ជំហានចុងក្រោយ ក្នុងកូដខាងលើយើងបាន៖

- ហៅឧបករណ៍ MCP ក្រោម function `call_tool` ដោយប្រើមុខងារដែល LLM គិតថាត្រូវហៅ ដោយផ្អែកលើបញ្ចូលរបស់យើង។
- បោះពុម្ពលទ្ធផលការហៅឧបករណ៍ទៅម៉ាស៊ីនបម្រើ MCP។

#### .NET

1. សូមបង្ហាញកូដសម្រាប់ធ្វើសំណើរបញ្ចូលទៅ LLM៖

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

ក្នុងកូដខាងលើ យើងបាន៖

- ទាញយកឧបករណ៍ពីម៉ាស៊ីនបម្រើ MCP `var tools = await GetMcpTools()`
- កំណត់បញ្ចូលអ្នកប្រើ `userMessage`
- បង្កើត object options ដែលបញ្ជាក់ម៉ូដែល និងឧបករណ៍
- ប្រើសំណើទៅ LLM

2. ជំហានចុងក្រោយ មកមើលថាតើ LLM សន្មតថាត្រូវហៅមុខងារឬអត់៖

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

ក្នុងកូដខាងលើ យើងបាន:

- តួរមួយសម្រាប់មុខងារហៅ
- សម្រាប់មុខងារប្រើប្រាស់នីមួយៗ វាពិនិត្យឈ្មោះ និង arguments ហើយហៅឧបករណ៍លើម៉ាស៊ីនបម្រើ MCP ដោយប្រើ client MCP។ ដោយសារចុងក្រោយ បោះពុម្ពលទ្ធផល។

នេះជាកូដពេញលេញ៖

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
    // អនុវត្តការស្នើសុំភាសាប្រពៃណីដែលប្រើឧបករណ៍ MCP ដោយស្វ័យប្រវត្តិ
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

ក្នុងកូដខាងលើ យើងបាន៖

- ប្រើបញ្ចូលភាសាធម្មជាតិគ្រឹះសម្រាប់ធ្វើទំនាក់ទំនងជាមួយឧបករណ៍ម៉ាស៊ីនបម្រើ MCP
- រចនាសម្ព័ន្ធ LangChain4j ដំណើរការជាស្វ័យប្រវត្តិ៖
  - បំលែងបញ្ចូលអ្នកប្រើទៅហៅឧបករណ៍ តាមការប្រើប្រាស់
  - ហៅឧបករណ៍ MCP ដែលសមរម្យដោយសារសេចក្តីសម្រេចពី LLM
  - គ្រប់គ្រងលំហូរការសន្ទនា រវាង LLM និងម៉ាស៊ីនបម្រើ MCP
- មេធដ្ឋាន `bot.chat()` ត្រឡប់មកនូវចម្លើយភាសាធម្មជាតិ ដែលអាចមានលទ្ធផលពីការប្រតិបត្ដិឧបករណ៍ MCP
- វិធីសាស្រ្តនេះផ្តល់ការបទពិសោធន៍ល្អ ដោយអ្នកប្រើមិនចាំបាច់ដឹងពីការអនុវត្ត MCP ខាងក្រោម

ឧទាហរណ៍កូដពេញលេញ៖

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

នេះជាកន្លែងដែលការងារចម្បងកើតឡើង។ យើងនឹងហៅ LLM ជាមួយបញ្ចូលជាលើកដំបូងពីអ្នកប្រើ បន្ទាប់មកដំណើរការឆ្លើយតប ដើម្បីមើលថាតើមានឧបករណ៍ណាត្រូវហៅទេ។ ប្រសិនបើមាន យើងនឹងហៅឧបករណ៍ទាំងនោះ ហើយបន្តជជែកជាមួយ LLM រហូតដល់មិនចាំបាច់ហៅឧបករណ៍បន្ថែម ហើយទទួលបានចម្លើយចុងក្រោយ។

យើងនឹងធ្វើការហៅជាច្រើនទៅ LLM ដូច្នេះ សូមកំណត់មុខងារមួយ ដែលនឹងគ្រប់គ្រងការហៅ LLM។ បន្ថែមមុខងារខាងក្រោមទៅឯកសារ `main.rs` របស់អ្នក៖

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

មុខងារនេះទទួល client LLM បញ្ជីសារ (រួមមានបញ្ចូលអ្នកប្រើ) ឧបករណ៍ពីម៉ាស៊ីនបម្រើ MCP ហើយផ្ញើសំណើទៅ LLM មកវិញ ត្រឡប់ចម្លើយ។
ការឆ្លើយតបពី LLM នឹងមានអារេ `choices`។ យើងត្រូវការប្រតិបត្តិលទ្ធផលដើម្បីមើលថាតើមាន `tool_calls` ណាមួយអត់។ វាធ្វើឲ្យយើងដឹងថា LLM កំពុងស្នើឲ្យហៅឧបករណ៍ជាក់លាក់មួយជាមួយអាគុយម៉ង់។ បន្ថែមកូដខាងក្រោមទៅចុងឯកសារ `main.rs` របស់អ្នកដើម្បីកំណត់មុខងារមួយសម្រាប់គ្រប់គ្រងការឆ្លើយតបរបស់ LLM៖

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

    // បោះពុម្ពមាតិកាបើមាន
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // ដោះស្រាយការហៅឧបករណ៍
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // បន្ថែមសារ​ជំនួយការ

        // ដឹកនាំការហៅឧបករណ៍រៀងរាល់ការហៅ
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // បន្ថែមលទ្ធផលឧបករណ៍ទៅសារហ្ស
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // បន្តការជជែកជាមួយលទ្ធផលឧបករណ៍
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

ប្រសិនបើមាន `tool_calls`, វានាំយកព័ត៌មានឧបករណ៍ ហៅម៉ាស៊ីនមេ MCP ជាមួយសំណើឧបករណ៍ ហើយបន្ថែមលទ្ធផលទៅសារសន្ទនាគ្នា។ បន្ទាប់មកវាបន្តសន្ទនាជាមួយ LLM ហើយសារត្រូវបានធ្វើបច្ចុប្បន្នភាពជាមួយការឆ្លើយតបរបស់ជំនួយករ និងលទ្ធផលហៅឧបករណ៍។

ដើម្បីយកព័ត៌មានហៅឧបករណ៍ដែល LLM បង្រួមសម្រាប់ការហៅ MCP យើងនឹងបន្ថែមមុខងារជួយមួយទៀតដើម្បីយកអ្វីគ្រប់យ៉ាងដែលចាំបាច់សម្រាប់ធ្វើការហៅ។ បន្ថែមកូដខាងក្រោមទៅចុងឯកសារ `main.rs` របស់អ្នក៖

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

ជាមួយនឹងគ្រប់ផ្នែកបានតំរូវទុកហើយ ឥឡូវនេះយើងអាចគ្រប់គ្រងស្នើរសុំដំបូងពីអ្នកប្រើ និងហៅ LLM។ ធ្វើបច្ចុប្បន្នភាពមុខងារ `main` របស់អ្នកដោយរួមបញ្ចូលកូដដូចខាងក្រោម៖

```rust
// ការសន្ទនារបស់ LLM ជាមួយការហៅឧបករណ៍
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

នេះនឹងស្វែងរក LLM ជាមួយស្នើរសុំដំបូងពីអ្នកប្រើដែលស្នើសុំផលបូកពីចំនួនពីរម៉ាត់ និងវានឹងដំណើរការឆ្លើយតបដើម្បីគ្រប់គ្រងករណីហៅឧបករណ៍បានឲ្យមានឥទ្ធិពលតាមកាល។

ល្អហើយ អ្នកបានធ្វើវា!

## កិច្ចការសម្ភាសន៍

យកកូដពីលំហាត់នេះ ហើយសាងសង់ម៉ាស៊ីនមេជាមួយឧបករណ៍បន្ថែមមួយចំនួនទៀត។ បន្ទាប់មកបង្កើតអតិថិជនមួយជាមួយ LLM ដូចក្នុងលំហាត់ ហើយសាកល្បងវាជាមួយសំណើរផ្សេងៗ ដើម្បីធ្វើឲ្យប្រាកដថាឧបករណ៍ម៉ាស៊ីនមេគ្រប់គ្រាន់ត្រូវបានហៅយ៉ាងឥទ្ធិពល។ វិធីសង្គ្រេបសាងសង់អតិថិជនមួយនេះមានន័យថាអ្នកប្រើលីចុងសាកសមនឹងមានបទពិសោធន៍ល្អព្រោះពួកគេអាចប្រើសំណើរប្រភេទ prompt មិនមែនបញ្ជាគ្រឿងចក្រ client ច្បាស់លាស់ទេ ហើយមិនត្រូវដឹងពីការហៅម៉ាស៊ីនមេ MCP ត្រូវបានធ្វើឡើយ។

## គម្រោងដំណោះស្រាយ

[ដំណោះស្រាយ](./solution/README.md)

## បទពិសោធន៍សំខាន់ៗ

- ការបន្ថែម LLM ទៅអតិថិជនរបស់អ្នកផ្តល់នូវវិធីល្អរហូតសម្រាប់អ្នកប្រើក្នុងការបញ្ចូលទៅ MCP Servers។
- អ្នកត្រូវបម្លែងការឆ្លើយតបរបស់ MCP Server អោយជារបស់ដែល LLM អាចយល់បាន។

## ឧទាហរណ៍

- [កម្មវិធីគណនា Java](../samples/java/calculator/README.md)
- [កម្មវិធីគណនា .Net](../../../../03-GettingStarted/samples/csharp)
- [កម្មវិធីគណនា JavaScript](../samples/javascript/README.md)
- [កម្មវិធីគណនា TypeScript](../samples/typescript/README.md)
- [កម្មវិធីគណនា Python](../../../../03-GettingStarted/samples/python)
- [កម្មវិធីគណនា Rust](../../../../03-GettingStarted/samples/rust)

## ធនធានបន្ថែម

## អ្វីទៅជាជំហ៊ានបន្ទាប់

- បន្ទាប់៖ [ប្រើម៉ាស៊ីនមេលើ Visual Studio Code](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->