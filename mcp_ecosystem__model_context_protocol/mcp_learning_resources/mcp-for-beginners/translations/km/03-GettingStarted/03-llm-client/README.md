# បង្កើត client ជាមួយ LLM

រហូតមកដល់ពេលនេះ អ្នកបានមើលឃើញវិធីបង្កើតម៉ាស៊ីនបម្រើ និង client។ Client អាចហៅម៉ាស៊ីនបម្រើដោយច្បាស់លាស់ ដើម្បីបញ្ជីឧបករណ៍ធ្វើការ អធិការ និងការចាប់ផ្តើមសារ។ ទោះជាយ៉ាងណា វាមិនមែនជាវិធីប្រើប្រាស់ដែលមានប្រសិទ្ធភាពខ្ពស់ទេ។ អ្នកប្រើប្រាស់របស់អ្នករស់នៅក្នុងយុគសម័យ agentic ហើយរំពឹងថានឹងប្រើប្រាស់ការចាប់ផ្តើមសារ និងទំនាក់ទំនងជាមួយ LLM ជំនួស។ ពួកគេមិនបារម្ភថាតើអ្នកប្រើ MCP ដើម្បីផ្ទុកសមត្ថភាពរបស់អ្នកទេ ប៉ុន្តែពួកគេចង់អន្តរកម្មដោយប្រើភាសាប្រពៃណី។ តើយ៉ាងដូចម្តេចដែលយើងអាចដោះស្រាយបញ្ហានេះ? ដំណោះស្រាយគឺបន្ថែម LLM ទៅ client។

## ទិដ្ឋភាពទូទៅ

ក្នុងមេរៀននេះ យើងផ្តោតលើការបន្ថែម LLM ទៅ client និងបង្ហាញពីរបៀបធ្វើអោយបទពិសោធន៍សម្រាប់អ្នកប្រើប្រាស់របស់អ្នកកាន់តែប្រសើរឡើង។

## គោលបំណងការរៀន

នៅចុងមេរៀននេះ អ្នកនឹងអាច:

- បង្កើត client ជាមួយ LLM។
- អន្តរកម្មជាមួយម៉ាស៊ីនបម្រើ MCP តាមរយៈ LLM ជាស្រួលលឿន។
- ផ្តល់បទពិសោធន៍ប្រើប្រាស់ល្អសម្រាប់អ្នកប្រើនៅ client។

## វិធីសាស្ត្រ

តោះចង់យល់ពីវិធីសាស្ត្រដែលយើងត្រូវអនុវត្ត។ ការបន្ថែម LLM សម្រាប់ client មើលទៅងាយស្រួល ប៉ុន្តារូបមន្តក្នុងពិតប្រាកដយើងធ្វើប្រាកដមែនទេ?

នេះជារបៀបដែល client នឹងអន្តរកម្មជាមួយម៉ាស៊ីនបម្រើ:

1. បង្កើតការតភ្ជាប់ជាមួយម៉ាស៊ីនបម្រើ។

1. បញ្ជីសមត្ថភាព ចាប់ផ្តើមសារ អធិការ និងឧបករណ៍ ហើយរក្សាទុកschema របស់ពួកវា។

1. បន្ថែម LLM ហើយផ្ទេរសមត្ថភាពដែលបានរក្សាទុក និងschema របស់ពួកវា ទៅក្នុងទ្រង់ទ្រាយដែល LLM អាចយល់បាន។

1. ដោះស្រាយការចាប់ផ្តើមសារពីអ្នកប្រើ ដោយផ្ទេរវាទៅ LLM រួមជាមួយឧបករណ៍ដែលបានបញ្ជីដោយ client។

ល្អហើយ ឥឡូវយើងបានយល់ថាអាចធ្វើដូចម្តេចបានក្នុងកម្រិតខ្ពស់ តោះសាកល្បងក្នុងលំហាត់ខាងក្រោម។

## លំហាត់៖ បង្កើត client ជាមួយ LLM

ក្នុងលំហាត់នេះ យើងនឹងរៀនបន្ថែម LLM ទៅ client របស់យើង។

### ការផ្ទៀងផ្ទាត់ប្រើប្រាស់ GitHub Personal Access Token

ការបង្កើត token GitHub គឺជាដំណើរការសាមញ្ញ។ វិធីធ្វើមានដូចខាងក្រោម៖

- ចូលទៅកាន់ GitHub Settings – ចុចលើរូបភាពគណនីរបស់អ្នកនៅជ្រុងខាងលើស្តាំ ហើយជ្រើស Settings។
- បញ្ជូលទៅ Developer Settings – រអិលចុះក្រោម ហើយចុចលើ Developer Settings។
- ជ្រើស Personal Access Tokens – ចុចលើ Fine-grained tokens បន្ទាប់មកចុច Generate new token។
- កំណត់ Token របស់អ្នក – បន្ថែមកំណត់ចំណាំសម្រាប់យោង កំណត់ថ្ងៃផុតកំណត់ ហើយជ្រើស scopes (សិទ្ធិ) ដែលចាំបាច់។ សម្រាប់ករណីនេះ សូមប្រាកដថាបង្កើតសិទ្ធិ Models។
- បង្កើតនិងចម្លង token – ចុច Generate token ហើយចាប់អារម្មណ៍ចម្លងវាបន្ទាន់ ព្រោះអ្នកនឹងមិនអាចមើលវាថ្មីបានទេ។

### -1- តភ្ជាប់ទៅម៉ាស៊ីនបម្រើ

តោះបង្កើត client របស់យើងជាមុនសិន៖

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // នាំចូល zod សម្រាប់ផ្ទៀងផ្ទាត់ស្កีម៉ា

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

ក្នុងកូដខាងលើ ពួកយើងបាន៖

- នាំចូលបណ្ណាល័យដែលចាំបាច់
- បង្កើត class មួយដែលមានសមាជិកពីរគឺ `client` និង `openai` ដែលជួយគ្រប់គ្រង client និងអន្តរកម្មជាមួយ LLM តាមលំដាប់។
- កំណត់មុខងារ LLM របស់យើង ដើម្បីប្រើ GitHub Models ដោយកំណត់ `baseUrl` ទៅ API inference ។

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# បង្កើតប៉ារ៉ាម៉ែត្រប្រព័ន្ធម៉ាស៊ីនមេសម្រាប់ការតភ្ជាប់ stdio
server_params = StdioServerParameters(
    command="mcp",  # ឯកសារប្រតិបត្តិការ
    args=["run", "server.py"],  # អាគុយម៉ង់បន្ទាត់បញ្ជាផ្នែកជម្រើស
    env=None,  # អថេរពិសេសបរិស្ថានជម្រើស
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

ក្នុងកូដខាងលើ ពួកយើងបាន៖

- នាំចូលបណ្ណាល័យដែលចាំបាច់សម្រាប់ MCP
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

ដំបូង អ្នកត្រូវបន្ថែមឯកសារ dependency របស់ LangChain4j ទៅក្នុង `pom.xml` របស់អ្នក។ បន្ថែមនេះដើម្បីបើកការរួមបញ្ចូល MCP និងគាំទ្រ GitHub Models៖

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

បន្ទាប់បង្កើត class client Java របស់អ្នក៖

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
    
    public static void main(String[] args) throws Exception {        // កំណត់រចនាសម្ព័ន LLM ដើម្បីប្រើម៉ូដែល GitHub
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // បង្កើតការដឹកជញ្ជូន MCP សម្រាប់ភ្ជាប់ទៅម៉ាស៊ីនមេ
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

ក្នុងកូដខាងលើ ពួកយើងបាន៖

- **បន្ថែម dependencies របស់ LangChain4j**: ត្រូវការ​សម្រាប់រួមបញ្ចូល MCP, client ផ្លូវការរបស់ OpenAI និងគាំទ្រ GitHub Models
- **នាំចូលបណ្ណាល័យ LangChain4j**: សម្រាប់រួមបញ្ចូល MCP និងមុខងារ openAI chat model
- **បង្កើត `ChatLanguageModel`**: កំណត់ប្រើ GitHub Models ជាមួយ token GitHub របស់អ្នក
- **កំណត់ការដឹកជញ្ជូន HTTP**: ប្រើ Server-Sent Events (SSE) ក្នុងការតភ្ជាប់ទៅ MCP server
- **បង្កើត MCP client**: ដែលនឹងដោះស្រាយទំនាក់ទំនងជាមួយម៉ាស៊ីនបម្រើ
- **ប្រើ LangChain4j ដើម្បីគាំទ្រការរួមបញ្ចូល MCP ស្រាប់**: ដែលធ្វើឲ្យការរួមបញ្ចូលពី LLM ទៅ MCP server សាមញ្ញឡើង

#### Rust

ឧទាហរណ៍នេះសន្មតថាអ្នកមានម៉ាស៊ីនបម្រើ MCP ដែលផ្អែកលើ Rust ដំណើរការហើយ។ ប្រសិនបើអ្នកមិនមានទេ សូមយោងត្រឡប់ទៅមេរៀន [01-first-server](../01-first-server/README.md) ដើម្បីបង្កើតម៉ាស៊ីនបម្រើ។

បន្ទាប់ពីអ្នកមានម៉ាស៊ីនបម្រើ Rust MCP បើក terminal ហើយទៅកាន់ថតដដែលគ្នានឹងម៉ាស៊ីនបម្រើ។ បន្ទាប់បញ្ចូលពាក្យបញ្ជារ​ខាងក្រោមដើម្បីបង្កើតគម្រោង client LLM ថ្មីមួយ៖

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

បន្ថែម dependency ខាងក្រោមទៅក្នុងឯកសារ `Cargo.toml` របស់អ្នក៖

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> មិនមានបណ្ណាល័យរបស់ Rust ផ្លូវការសម្រាប់ OpenAI ទេ ប៉ុន្តែ `async-openai` គឺជាបណ្ណាល័យដែលក្រុមហ៊ុនសហគមន៍ថែរក្សា ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។

បើកឯកសារ `src/main.rs` ហើយជំនួសមាតិកាវាដោយកូដខាងក្រោម៖

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

    // កំណត់រចនាសម្ព័ន្ធអតិថិជន OpenAI
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // កំណត់រចនាសម្ព័ន្ធអតិថិជន MCP
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

    // TODO: ការសន្ទនាវាលភាសាធំជាមួយការហៅឧបករណ៍

    Ok(())
}
```

កូដនេះកំណត់កម្មវិធី Rust មូលមួយដែលនឹងតភ្ជាប់ទៅម៉ាស៊ីនបម្រើ MCP និង GitHub Models សម្រាប់អន្តរកម្ម LLM។

> [!IMPORTANT]
> សូមប្រាកដថាដាក់អថេរ​បរិយាកាស `OPENAI_API_KEY` ជាមួយ token GitHub របស់អ្នក មុនពេលរត់កម្មវិធី។

ល្អហើយ ជំហានបន្ទាប់យើងត្រូវបញ្ជីសមត្ថភាពនៅលើម៉ាស៊ីនបម្រើ។

### -2- បញ្ជីសមត្ថភាពម៉ាស៊ីនបម្រើ

ឥឡូវនេះយើងនឹងតភ្ជាប់ទៅម៉ាស៊ីនបម្រើ ហើយសួរសំណូមពរដើម្បីបញ្ជីសមត្ថភាពរបស់វា៖

#### Typescript

នៅក្នុង class ដដែល បន្ថែមវិធីសាស្ត្រខាងក្រោម៖

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

ក្នុងកូដខាងលើ ពួកយើងបាន៖

- បន្ថែមកូដសម្រាប់តភ្ជាប់ទៅម៉ាស៊ីនបម្រើ មានឈ្មោះ `connectToServer`។
- បង្កើតវិធីសាស្ត្រ `run` ដែលមានតួនាទីគ្រប់គ្រងលំហូរតាមកម្មវិធី។ ដល់ពេលនេះ វាបញ្ជីតែឧបករណ៍តែប៉ុណ្ណោះ ប៉ុន្តាយើងនឹងបន្ថែមផ្សេងទៀតជាយូរហើយ។

#### Python

```python
# បញ្ជីធនធានដែលមាន
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# បញ្ជីឧបករណ៍ដែលមាន
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

នេះគឺជាអ្វីដែលយើងបានបន្ថែម៖

- បញ្ជីធនធាន និងឧបករណ៍ ហើយបោះពុម្ពពួកវា។ សម្រាប់ឧបករណ៍ យើងបញ្ជី `inputSchema` ដែលយើងនឹងប្រើក្រោយ។

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

ក្នុងកូដខាងលើ ពួកយើងបាន៖

- បញ្ជីឧបករណ៍ដែលមាននៅលើម៉ាស៊ីនបម្រើ MCP
- សម្រាប់ឧបករណ៍នីមួយៗ បញ្ជីឈ្មោះ ការពិពណ៌នា និងschema របស់វា។ អ្វីដែល​ទីបំផុតនេះគឺមុខងារ​ដែល​យើងនឹង​ប្រើ​ហៅ​ឧបករណ៍​ត្រង់​ពេល​ខាងមុខ។

#### Java

```java
// បង្កើតអ្នកផ្គត់ផ្គង់ឧបករណ៍ដែលស្វ័យប្រវត្តិនិចឧបករណ៍ MCP
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// អ្នកផ្គត់ផ្គង់ឧបករណ៍ MCP ដំណើរការដោយស្វ័យប្រវត្តិ៖
// - បញ្ជីឧបករណ៍ដែលមានពីម៉ាស៊ីនមេ MCP
// - បម្លែងស្កីមឧបករណ៍ MCP ទៅទ្រង់ទ្រាយ LangChain4j
// - គ្រប់គ្រងការប្រតិបត្ដិឧបករណ៍ និងការឆ្លើយតប
```

ក្នុងកូដខាងលើ ពួកយើងបាន៖

- បង្កើត `McpToolProvider` ដែលរកឃើញ និងចុះឈ្មោះឧបករណ៍ទាំងអស់ពីម៉ាស៊ីនបម្រើ MCP ស្វ័យប្រវត្តិ
- `ToolProvider` គ្រប់គ្រងការបម្លែងរវាង schema ឧបករណ៍ MCP និងទ្រង់ទ្រាយឧបករណ៍ LangChain4j ក្នុងខាងក្នុង
- វិធីសាស្ត្រនេះជួយបំបាត់ការបញ្ជីឧបករណ៍ និងការបម្លែងដោយដៃ

#### Rust

ការទាញយកឧបករណ៍ពីម៉ាស៊ីនបម្រើ MCP ធ្វើបានតាមរយៈវិធីសាស្ត្រ `list_tools`។ នៅក្នុងមុខងារ `main` របស់អ្នក បន្ទាប់ពីកំណត់ MCP client សូមបន្ថែមកូដខាងក្រោម៖

```rust
// ទទួលបានបញ្ជីឧបករណ៍ MCP
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- បម្លែងសមត្ថភាពម៉ាស៊ីនបម្រើទៅឧបករណ៍ LLM

ជំហានបន្ទាប់បន្ទាប់ពីបញ្ជីសមត្ថភាពម៉ាស៊ីនបម្រើ គឺបម្លែងវាទៅទ្រង់ទ្រាយដែល LLM អាចយល់បាន។ បន្ទាប់មកយើងអាចផ្តល់សមត្ថភាពទាំងនេះជាឧបករណ៍សម្រាប់ LLM របស់យើង។

#### TypeScript

1. បន្ថែមកូដខាងក្រោមដើម្បីបម្លែងចម្លើយពីម៉ាស៊ីនបម្រើ MCP ទៅទ្រង់ទ្រាយឧបករណ៍ដែល LLM អាចប្រើបាន៖

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // បង្កើតស្គីម៉ាដែលមានមូលដ្ឋានលើ input_schema
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // កំណត់ប្រភេទទៅ "function" อย่างច្បាស់លាស់
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

    កូដខាងលើយកចម្លើយពីម៉ាស៊ីនបម្រើ MCP ហើយបម្លែងវា ទៅទ្រង់ទ្រាយកំណត់ឧបករណ៍ដែល LLM អាចយល់បាន។

1. តោះធ្វើបច្ចុប្បន្នភាពវិធីសាស្ត្រ `run` ដើម្បីបញ្ជីសមត្ថភាពម៉ាស៊ីនបម្រើបន្ថែះ៖

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

    ក្នុងកូដខាងលើ ពួកយើងធ្វើបច្ចុប្បន្នភាពវិធីសាស្ត្រ `run` ដើម្បីរៀបតាមលទ្ធផល ហើយសម្រាប់ចំណូលមួយចំនួនហៅ `openAiToolAdapter`។

#### Python

1. ជាមុនសិន យើងបង្កើតមុខងារបម្លែងខាងក្រោម

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

    ក្នុងមុខងារ `convert_to_llm_tools` ខាងលើ យើងយកចម្លើយឧបករណ៍ MCP ហើយបម្លែងវាទៅទ្រង់ទ្រាយដែល LLM អាចយល់បាន។

1. បន្ទាប់ គាំទ្រ client របស់យើង ដើម្បីប្រើមុខងារនេះ ដូចខាងក្រោម៖

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    នៅទីនេះ យើងបន្ថែមការហៅទៅ `convert_to_llm_tool` ដើម្បីបម្លែងចម្លើយឧបករណ៍ MCP ទៅអ្វីដែលយើងអាចផ្គត់ផ្គង់ទៅ LLM បន្ទាប់។

#### .NET

1. យើងបន្ថែមកូដបម្លែងចម្លើយឧបករណ៍ MCP ទៅអ្វីដែល LLM អាចយល់បាន

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

ក្នុងកូដខាងលើ ពួកយើងបាន៖

- បង្កើតមុខងារ `ConvertFrom` ដែលទទួលឈ្មោះ ការពិពណ៌នា និង input schema។
- កំណត់មុខងារដែលបង្កើត FunctionDefinition ដែលត្រូវផ្ញើទៅ ChatCompletionsDefinition។ ចុងក្រោយនេះគឺអ្វីដែល LLM អាចយល់បាន។

1. តោះមើលនិយមន័យកូដដែលអាចប្រើប្រាស់មុខងារនេះ៖

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
// បង្កើតចំណុចប្រទាក់ Bot សម្រាប់ការប្រាស្រ័យទាក់ទងជាភាសាធម្មជាតិ
public interface Bot {
    String chat(String prompt);
}

// កំណត់តម្លៃសេវាកម្ម AI ជាមួយឧបករណ៍ LLM និង MCP
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

ក្នុងកូដខាងលើ ពួកយើងបាន៖

- កំណត់ចំណុចចូលសាមញ្ញ `Bot` សម្រាប់អន្តរកម្មភាសាប្រពៃណី
- ប្រើ LangChain4j `AiServices` ដើម្បីភ្ជាប់ LLM ជាមួយ MCP tool provider ជាស្វ័យប្រវត្តិ
- ស៊ុមបន្ទាប់គ្រប់គ្រងការបម្លែងschema ឧបករណ៍ និងហៅមុខងារដោយស្វ័យប្រវត្តិ
- វិធីនេះបំបាត់ការបម្លែងដោយដៃ - LangChain4j គ្រប់គ្រងគ្រប់កម្រិតនៃការបម្លែងឧបករណ៍ MCP ទៅទ្រង់ទ្រាយដែល LLM អាចប្រើបាន

#### Rust

ដើម្បីបម្លែងចម្លើយឧបករណ៍ MCP ទៅទ្រង់ទ្រាយដែល LLM អាចយល់បាន យើងនឹងបន្ថែមមុខងារជំនួយមួយដែលរៀបចំបញ្ជីឧបករណ៍។ បន្ថែមកូដខាងក្រោមក្នុងឯកសារ `main.rs` របស់អ្នកក្រោមមុខងារ `main`។ វានឹងហៅនៅពេលធ្វើសំណើទៅ LLM៖

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

ល្អហើយ យើងបានរៀបចំសម្រាប់ដោះស្រាយសំណើអ្នកប្រើ ដូច្នេះតោះទៅដោះស្រាយវាថ្មី។

### -4- ដោះស្រាយសំណើចាប់ផ្តើមសារ​អ្នកប្រើ

នៅផ្នែកនេះនៃកូដ យើងនឹងដោះស្រាយសំណើពីអ្នកប្រើ។

#### TypeScript

1. បន្ថែមមុខងារមួយដែលនឹងប្រើហៅ LLM របស់យើង៖

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. ហៅឧបករណ៍របស់ម៉ាស៊ីនបម្រើ
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. ធ្វើអ្វីមួយជាមួយលទ្ធផល
        // TODO

        }
    }
    ```

    ក្នុងកូដខាងលើ ពួកយើងបាន៖

    - បន្ថែមមុខងារ `callTools`។
    - មុខងារនេះទទួលបានចម្លើយពី LLM ហើយពិនិត្យមើលថាតើមានឧបករណ៍ណាដែលត្រូវបានហៅឬទេ៖

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // ហៅឧបករណ៍
        }
        ```

    - ហៅឧបករណ៍ ប្រសិនបើ LLM សូមហៅ៖

        ```typescript
        // ២។ ហៅឧបករណ៏ម៉ាស៊ីនបម្រើ
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // ៣។ ធ្វើអ្វីមួយជាមួយលទ្ធផល
        // ត្រូវធ្វើនៅក្រោយ
        ```

1. បច្ចុប្បន្នភាពវិធីសាស្ត្រ `run` ដើម្បីរួមបញ្ចូលការហៅទៅ LLM និងហៅ `callTools`៖

    ```typescript

    // ១. បង្កើតសារដែលជាផ្គត់ផ្គង់សម្រាប់ LLM
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // ២. ហៅ LLM
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // ៣. ឆែកចូលទៅក្នុងចម្លើយរបស់ LLM សម្រាប់ជម្រើសទាំងអស់ ពិនិត្យមើលថាវាមានការហៅឧបករណ៍ឬទេ
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

ល្អហើយ តោះបញ្ជីកូដពេញលេញ៖

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // នាំចូល zod សម្រាប់ការផ្ទៀងផ្ទាត់ schema

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // ប្រហែលជាត្រូវប្ដូរទៅ url នេះនៅអនាគត: https://models.github.ai/inference
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
          // បង្កើត schema zod អោយផ្អែកលើ input_schema
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // កំណត់ប្រភេទជាក់លាក់ទៅជា "function"
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
    
    
          // 2. ហៅឧបករណ៍របស់ម៉ាស៊ីនបម្រើ
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. ធ្វើអ្វីមួយជាមួយលទ្ធផល
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
    
        // 1. ឆ្លងកាត់ចម្លើយ LLM សម្រាប់ជម្រើសនីមួយៗ ពិនិត្យមើលថាតើមានការហៅឧបករណ៍ទេ
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

1. បន្ថែមការនាំចូលដែលចាំបាច់សម្រាប់ហៅ LLM

    ```python
    # llm
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

1. បន្ទាប់ បន្ថែមមុខងារដែលនឹងហៅ LLM៖

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
            # ប៉ារ៉ាម៉ែត្រជាជម្រើស
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

    ក្នុងកូដខាងលើ ពួកយើងបាន៖

    - ផ្គត់ផ្គង់មុខងារ​ដែលយើងរកឃើញពីម៉ាស៊ីនបម្រើ MCP ហើយបម្លែងទៅ LLM។
    - បន្ទាប់ហៅ LLM ជាមួយមុខងារនេះ។
    - បន្ទាប់ពិនិត្យលទ្ធផលមើលថាតើយើងគួរហៅមុខងារណាមួយទេ។
    - ចុងក្រោយ បញ្ចូនអារោមមុខងារ ឲ្យហៅ។

1. ជំហានចុងក្រោយ បច្ចុប្បន្នភាពកូដមេរបស់យើង៖

    ```python
    prompt = "Add 2 to 20"

    # សួរជំនាញ LLM ថា មានឧបករណ៍អ្វីខ្លះ ប្រសិនបើមាន
    functions_to_call = call_llm(prompt, functions)

    # ហៅអនុវត្តន៍ដែលបានណែនាំ
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    នេះគឺជាជំហានចុងក្រោយ។ នៅក្នុងកូដខាងលើ យើងបាន៖

    - ហៅឧបករណ៍ MCP តាម `call_tool` ប្រើមុខងារដែល LLM ចាត់ទុកថាគួរត្រូវហៅដោយផ្អែកលើសំណើររបស់យើង។
    - បោះពុម្ពលទ្ធផលនៃការហៅឧបករណ៍ទៅម៉ាស៊ីនបម្រើ MCP។

#### .NET

1. បង្ហាញកូដសម្រាប់ធ្វើសំណើចាប់ផ្តើម LLM៖

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

    ក្នុងកូដខាងលើ ពួកយើងបាន៖

    - ទាញយកឧបករណ៍ពីម៉ាស៊ីនបម្រើ MCP `var tools = await GetMcpTools()`
    - កំណត់សារ user prompt `userMessage`
    - បង្កើតវត្ថុ options ដែលបញ្ជាក់ម៉ូដែល និងឧបករណ៍
    - ធ្វើសំណើទៅ LLM

1. ជំហានចុងក្រោយ មើលថា LLM សន្និដ្ឋានថាគួរហៅមុខងារទេ៖

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

    ក្នុងកូដខាងលើ ពួកយើងបាន៖

    - សរសេរ for loop តាមបញ្ជីនៃការហៅមុខងារ
    - សម្រាប់កិច្ចហៅឧបករណ៍នីមួយៗ បំបែកឈ្មោះ និង arguments ហើយហៅឧបករណ៍នៅលើម៉ាស៊ីនបម្រើ MCP តាម client។ ចុងក្រោយបោះពុម្ពលទ្ឋផល។

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

// 5. Print the generic response
Console.WriteLine($"Assistant response: {content}");
```

#### Java

```java
try {
    // ដំណើរការសំណើភាសាតាមធម្មជាតិត្រូវប្រើឧបករណ៍ MCP អូតომាតិក
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

ក្នុងកូដខាងលើ ពួកយើងបាន៖

- ប្រើប្រាស់សារ​ចាប់ផ្តើមភាសាប្រពៃណីងាយស្រួល ដើម្បីអន្តរកម្មជាមួយឧបករណ៍ម៉ាស៊ីនបម្រើ MCP
- ស៊ុមបន្ទាប់ LangChain4j ដំណើរការស្វ័យប្រវត្តិ៖
  - បម្លែងសារ user prompt ទៅការហៅឧបករណ៍ពេលចាំបាច់
  - ហៅឧបករណ៍ MCP ត្រឹមត្រូវ ដោយផ្អែកលើការសម្រេចចិត្តរបស់ LLM
  - គ្រប់គ្រងលំហូរពិភាក្សារវាង LLM និងម៉ាស៊ីនបម្រើ MCP
- វិធី `bot.chat()` បញ្ចូនចម្លើយភាសាប្រពៃណី ដែលអាចរួមបញ្ចូលលទ្ធផលពីការប្រតិបត្ដិឧបករណ៍ MCP
- វិធីនេះផ្តល់បទពិសោធន៍សម្រួលសម្រាប់អ្នកប្រើ ដែលមិនចាំបាច់ដឹងពីការអនុវត្ត MCP នៅខាងក្រោម

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

នេះជាកន្លែងដែលការងារច្រើនកើតឡើង។ យើងនឹងហៅ LLM ជាមួយសារ user prompt ban đầu បន្ទាប់មកដំណើរការឆ្លើយតប ដើម្បីមើលថាតើមានឧបករណ៍ណាត្រូវបានហៅឬទេ។ ប្រសិនបើមាន យើងនឹងហៅឧបករណ៍ទាំងនោះ ហើយបន្តការពិភាក្សាជាមួយ LLM រហូតដល់ពេលមិនមានការហៅឧបករណ៍បន្ថែម ហើយទទួលបានចម្លើយចុងក្រោយ។

យើងនឹងហៅ LLM ជាច្រើនដង ដូច្នេះ ត្រូវកំណត់មុខងារមួយសម្រាប់គ្រប់គ្រងការហៅ LLM។ បន្ថែមមុខងារខាងក្រោមទៅឯកសារ `main.rs` របស់អ្នក៖

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

មុខងារនេះទទួល client LLM បញ្ជីសារ (រួមទាំង user prompt) ឧបករណ៍ពីម៉ាស៊ីនបម្រើ MCP ហើយផ្ញើសំណើទៅ LLM បញ្ចូនចម្លើយត្រឡប់មកវិញ។
ការឆ្លើយតបពី LLM នឹងមានអារេនៃ `choices`។ យើងត្រូវតែដំណើរការពីលទ្ធផលដើម្បីមើលថាតើមាន `tool_calls` ទេ។ វាថ្នាក់ឲ្យយើងដឹងថា LLM កំពុងស្នើឲ្យហៅឧបករណ៍ជាក់លាក់មួយដែលត្រូវបាន ហៅជាមួយអាគុយម៉ង់។ បញ្ចូលកូដខាងក្រោមនៅបន្ទាត់ចុងក្រោយនៃឯកសារ `main.rs` របស់អ្នក ដើម្បីកំណត់មុខងារដើម្បីគ្រប់គ្រងការឆ្លើយតបពី LLM៖

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

    // ជម្រុញការហៅឧបករណ៍
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // បន្ថែមសារជំនួយការ

        // ដំណើរការការហៅឧបករណ៍នីមួយៗ
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // បន្ថែមលទ្ធផលឧបករណ៍ទៅសារ
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // បន្តការសន្ទនាជាមួយលទ្ធផលឧបករណ៍
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
  
ប្រសិនបើមាន `tool_calls` វានឹងដកយកព័ត៌មានឧបករណ៍ ហៅម៉ាស៊ីន MCP ជាមួយសំណើឧបករណ៍ ហើយបញ្ចូលលទ្ធផលទៅក្នុងសារ សន្ទនាឡើងវិញ។ បន្ទាប់មកវានឹងបន្តសន្ទនា ជាមួយ LLM ហើយសារត្រូវបានបន្ទាន់សម័យជាមួយចម្លើយរបស់ជំនួយការនិងលទ្ធផលពីការហៅឧបករណ៍។

ដើម្បីដកយកព័ត៌មានហៅឧបករណ៍ដែល LLM បញ្ជូនមកសម្រាប់ការហៅ MCP យើងនឹងបន្ថែមមុខងារជំនួយមួយទៀត ដើម្បីដកយកអ្វីគ្រប់យ៉ាងដែលត្រូវការសម្រាប់ការហៅ។ បញ្ចូលកូដខាងក្រោមនៅបន្ទាត់ចុងក្រោយនៃឯកសារ `main.rs` របស់អ្នក៖

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
  
ជាមួយផ្នែកទាំងអស់នៅកន្លែង ឥឡូវនេះយើងអាចគ្រប់គ្រងការស្នើប្រាក់ផ្តើមចេញពីអ្នកប្រើ ហើយហៅ LLM។ បន្ទាន់សម័យមុខងារ `main` របស់អ្នក ដើម្បីរួមបញ្ចូលកូដដូចខាងក្រោម៖

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
  
នេះនឹងសួរសំណួរដល់ LLM ជាមួយសំណើប្រាក់ផ្តើមពីអ្នកប្រើ ស្នើសុំចំនួនសរុបរបស់ចំនួនពីរជាមួយវា ហើយវានឹងដំណើរការឆ្លើយតប ដើម្បីគ្រប់គ្រងការហៅឧបករណ៍យ៉ាងវិជ្ជាជីវៈ។

ល្អណាស់ អ្នកបានធ្វើវាល្អហើយ!

## កិច្ចការផ្ដល់

យកកូដពីហាត់ប្រាណ ហើយបង្កើតម៉ាស៊ីនបម្រើជាមួយឧបករណ៍ច្រើន ហើយបង្កើតម៉ាស៊ីនអតិថិជនជាមួយ LLM ដូចក្នុងហាត់ប្រាណ និងធ្វើតេស្តជាមួយការស្នើផ្សេងៗ ដើម្បីធានាថាឧបករណ៍ម៉ាស៊ីនបម្រើទាំងអស់របស់អ្នកត្រូវបានហៅយ៉ាងឌុយណាមិច។ វិធីសាស្ត្ររបស់ការបង្កើតអតិថិជននេះមានន័យថា អ្នកប្រើចុងបស់នឹងមានបទពិសោធន៍ប្រើប្រាស់ល្អ ពីព្រោះពួកគេអាចប្រើប្រាស់សំណើជាមួយវិធីសាស្ត្រផ្ទាល់ខ្លួន ជំនួសការបញ្ជាកម្មង់លម្អិតរបស់អតិថិជន ហើយមិនដឹងអំពីការហៅម៉ាស៊ីនបម្រើ MCP ទេ។

## ដំណោះស្រាយ

[ដំណោះស្រាយ](/03-GettingStarted/03-llm-client/solution/README.md)

## ចំណុចសំខាន់ៗ

- ការបន្ថែម LLM ទៅក្នុងអតិថិជនរបស់អ្នកផ្តល់ន័យថាអ្នកប្រើអាចបលោកទាក់ទងជាមួយម៉ាស៊ីនបម្រើ MCP បានល្អប្រសើរឡើង។
- អ្នកត្រូវបម្លែងការឆ្លើយតបពីម៉ាស៊ីនបម្រើ MCP ទៅជារបស់ដែល LLM អាចយល់។

## ឧទាហរណ៍

- [កាលិកូលាលិកា Java](../samples/java/calculator/README.md)  
- [កាលិកូលាលិកា .Net](../../../../03-GettingStarted/samples/csharp)  
- [កាលិកូលាលិកា JavaScript](../samples/javascript/README.md)  
- [កាលិកូលាលិកា TypeScript](../samples/typescript/README.md)  
- [កាលិកូលាលិកា Python](../../../../03-GettingStarted/samples/python)  
- [កាលិកូលាលិកា Rust](../../../../03-GettingStarted/samples/rust)

## ធនធានបន្ថែម

## បន្ទាប់ទៅ

- បន្ទាប់: [ការប្រើម៉ាស៊ីនបម្រើតាមរយៈ Visual Studio Code](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបំភ្លឺ**៖  
ឯកសារនេះត្រូវបានបកប្រែដោយប្រើសេវាកម្មបកប្រែ AI [Co-op Translator](https://github.com/Azure/co-op-translator) ។ ខណៈពេលយើងខិតខំប្រឹងប្រែងសម្រាប់ភាពណែនាំត្រឹមត្រូវ សូមយល់ឱ្យដឹងថាការបកប្រែដោយស្វ័យប្រវត្តិនោះអាចមានកំហុសឬការមិនត្រឹមត្រូវ។ ឯកសារដើមក្នុងភាសាបុរាណរបស់វាគួរត្រូវបានគេចាត់ទុកជាមូលដ្ឋានច្បាស់លាស់បំផុត។ សម្រាប់ព័ត៌មានសំខាន់ៗ អនុញ្ញាតអោយមានការបកប្រែដោយមនុស្សអ្នកជំនាញផ្នែកវិជ្ជាជីវៈត្រូវបានផ្ដល់អនុសាសន៍។ យើងមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំឬការបកស្រាយខុសដែលកើតមានពីការប្រើប្រាស់ការបកប្រែនេះឡើយ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->