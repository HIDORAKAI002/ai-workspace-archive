# LLM ဖြင့် client တစ်ခု ဖန်တီးခြင်း

အထိသွားခဲ့သည်အထိ သင်သည် server နှင့် client တို့ကို ဘယ်လိုဖန်တီးရမည်ကို ကြည့်ရှုခဲ့ပြီးဖြစ်သည်။ client သည် server ကို တိုက်ရိုက် ခေါ်ယူပြီး ၎င်း၏ကိရိယာများ၊ စွမ်းရည်များနှင့် ကျဉ်းတမ်းများကို စုစည်းနိုင်ခဲ့သည်။ သို့သော် ၎င်းသည် တကယ့်အသုံးဝင်သောနည်းလမ်း မဟုတ်ပါ။ သင့်အသုံးပြုသူများသည် agentic ယာဉ်အတွင်းတွင်ရှိပြီး prompt များကို အသုံးပြုရန်နှင့် LLM နှင့် ဆက်သွယ်ရန် ကို မျှော်လင့်ကြသည်။ သူတို့သည် သင့်စွမ်းရည်များကို MCP တွင်သိမ်းဆည်းမှုကိုစိတ်မပူပါဘူး။ သူတို့သည် သဘာဝဘာသာစကားကို အသုံးပြု၍ ဆက်သွယ်ချင်ကြသည်။ ထိုကဲ့သို့ ပြဿနာကို ဘယ်လိုဖြေရှင်းမည်နည်း? ဖြေရှင်းချက်မှာ client တွင် LLM တစ်ခု ထည့်သွင်းပေးခြင်းဖြစ်သည်။

## အကြောင်းအနှစ်ချုပ်

ဤသင်ခန်းစာတွင် client အတွက် LLM တစ်ခုကို ထည့်သွင်းခြင်းကို အထူးပြု၍ သင့်အသုံးပြုသူများအတွက် ပိုမိုကောင်းမွန်သော အတှေ့အကွုံကို မည်သို့ ပေးတတ်သည်ကို ပြသပါမည်။

## သင်ယူရမည့် ရည်မှန်းချက်များ

ဤသင်ခန်းစာပြီးဆုံးချိန်တွင် သင်မှာ:

- LLMပါရှိသော client တစ်ခု ဖန်တီးနိင်ပါမည်။
- LLM ကို အသုံးပြုပြီး MCP server နှင့် မဖြစ်မနေ ဆက်သွယ်နိုင်ပါမည်။
- အသုံးပြုသူအတွေ့အကြုံကို client နာမည်ပေါ်ပိုမိုကောင်းမွန်စေပါမည်။

## နည်းလမ်း

လိုအပ်သော နည်းလမ်းကို နားလည်ကြည့်ကြရအောင်။ LLM တစ်ခု ထည့်သွင်းရခြင်းသည် ရိုးရှင်းသော်လည်း သင်သည် တကယ်ပြုလုပ်မလား?

client သည် server နှင့် လိုအပ်သလို ဆက်သွယ်ပါမည် -

1. Server နှင့် ချိတ်ဆက်ခြင်း ဖြည့်ဆည်းပါ။

1. စွမ်းရည်များ၊ prompt များ၊ ရင်းမြစ်များနှင့် ကိရိယာများအသေးစိတ် စာရင်းပြုလုပ်ပြီး ၎င်းတို့၏ schema များကို သိမ်းဆည်းပါ။

1. LLM တစ်ခု ထည့်သွင်းပြီး သိမ်းဆည်းထားသော စွမ်းရည်များနှင့် schema များကို LLM နားလည်နိုင်သည့် ပုံစံဖြင့် ပေးပို့ပါ။

1. အသုံးပြုသူ prompt ကို LLM သို့ ပေးပို့ပြီး client မှ စာရင်းပြုထားသော ကိရိယာများနှင့်အတူ ကိုင်တွယ်ပါ။

ကောင်းပြီ၊ အခု high level တွင် နားလည်သွားပါပြီ။ အောက်တွင်ရှိသော လေ့ကျင့်ခန်းတွင် စမ်းသပ်ကြည့်ကြရအောင်။

## လေ့ကျင့်ခန်း- LLM နှင့် client တစ်ခု ဖန်တီးခြင်း

ဤလေ့ကျင့်ခန်းတွင် LLM တစ်ခုကို client တွင် ထည့်သွင်းတာကို သင်ယူပါမည်။

### GitHub Personal Access Token ဖြင့် အတည်ပြုခြင်း

GitHub token တစ်ခု ဖန်တီးခြင်းသည် ရိုးရှင်းသောလုပ်ဦးတည်းဖြစ်သည်။ ဒီလိုပြုလုပ်နိုင်သည် -

- GitHub Settings သို့ သွားရန် – အပေါ်ညာထောင့်ရှိ သင့်ပရိုဖိုင်းပုံကိုနှိပ်ပြီး Settings ကိုရွေးချယ်ပါ။
- Developer Settings သို့ သွားရန် – အောက်သို့ ဆင်းပြီး Developer Settings ကိုနှိပ်ပါ။
- Personal Access Tokens ကိုရွေးရန် – Fine-grained tokens ကိုနှိပ်ပြီး Generate new token ကိုရွေးပါ။
- သင့် Token ကို ဖွဲ့စည်းရန် – မှတ်ချက်တစ်ခုထည့်သွင်းပြီး သက်တမ်းကုန်ဆုံးမည့်ရက်စွဲကို သတ်မှတ်ကာ လိုအပ်သော scopes (ခွင့်များ) ကို ရွေးချယ်ပါ။ ဒီကိစ္စမှာ Models ခွင့်ပြုချက်အားထည့်သွင်းထားရန် သေချာပါစေ။
- Generate နှိပ်ပြီး Token ကို ကူးယူရန် – Generate token ကိုနှိပ်ပြီး မှတ်ုတ်ထားပြီးမရသောကြောင့် ချက်ချင်းကူးယူလိုက်ပါ။

### -1- Server သို့ ချိတ်ဆက်ခြင်း

ရင်းနှီးသော client ကို ဖန်တီးကြရအောင်-

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // ဆကီမား အတည်ပြုမှုအတွက် zod ကို သွင်းကုဒ်ပြုလုပ်ပါ

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

အထက်ဖော်ပြထားသော ကုဒ်တွင် -

- လိုအပ်သော library များကို import ပြုလုပ်ထားသည်
- client နှင့် openai ဆိုသော member နှစ်ဦးပါရှိသော class တစ်ခု ဖန်တီးထားသည်။ client ကို စီမံခန့်ခွဲရန်နှင့် LLM နှင့် လုပ်ဆောင်မှုများပိုင်းတွင် ကူညီရန်ဖြစ်သည်။
- LLM instance ကို GitHub Models သုံးရန်အတွက် `baseUrl` ကို inference API သို့ နေရာပြုလုပ်ထားသည်။

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# stdio ချိတ်ဆက်မှုအတွက် ဆာဗာ ပရမီတာများ ဖန်တီးပါ
server_params = StdioServerParameters(
    command="mcp",  # အကောင်အထည်ဖော်နိုင်သော
    args=["run", "server.py"],  # ရွေးချယ်စရာ command line အကြောင်းအရာများ
    env=None,  # ရွေးချယ်နိုင်သည့် ပတ်ဝန်းကျင်မူလတန်းများ
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # ချိတ်ဆက်မှုကို စတင်ပါ
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

အထက်ဖော်ပြထားသော ကုဒ်တွင် -

- MCP အတွက် လိုအပ်သော libraries ကို import ပြုလုပ်ထားသည်
- client တစ်ခု ဖန်တီးထားသည်

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

ပထမဆုံး သင့်အား LangChain4j dependencies ကို `pom.xml` ဖိုင်တွင် ထည့်သွင်းရန်လိုအပ်သည်။ MCP စနစ်ပေါင်းစည်းမှုနှင့် GitHub Models ထောက်ပံ့မှုများ ဖွင့်နိုင်ရန် အောက်ပါ dependencies များထည့်ပါ -

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

ပြီးနောက် Java client class ကို ဖန်တီးပါ -

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
    
    public static void main(String[] args) throws Exception {        // LLM ကို GitHub မော်ဒယ်များ အသုံးပြုရန် ဆက်တင်ပြုလုပ်ပါ
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // ဆာဗာနှင့် ချိတ်ဆက်ရန် MCP သယ်ယူပို့ဆောင်မှု တည်ဆောက်ပါ
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // MCP ချိုင့်နှင့် ဖန်တီးပါ
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

အထက်ဖော်ပြထားသောကုဒ်တွင် -

- MCP ပေါင်းစည်းမှု၊ OpenAI အတည်ပြု client နှင့် GitHub Models ထောက်ပံ့မှုတို့အတွက် LangChain4j dependencies များ ထည့်သွင်းထားသည်။
- MCP ပေါင်းစည်းမှုနှင့် OpenAI chat model လုပ်ဆောင်မှုကို အသုံးပြုရန် LangChain4j libraries များကို import ပြုလုပ်ထားသည်။
- GitHub Token ဖြင့် GitHub Models သုံးရန် `ChatLanguageModel` တစ်ခု ဖန်တီးထားသည်။
- MCP Server နှင့် ချိတ်ဆက်ရန် Server-Sent Events (SSE) အသုံးပြုပြီး HTTP သယ်ယူပို့ဆောင်မှု စနစ်တစ်ခု ပြုလုပ်ထားသည်။
- Server နှင့် ဆက်သွယ်မှုကို ကိုင်တွယ်မည့် MCP client တစ်ခု ဖန်တီးထားသည်။
- LangChain4j သည် MCP စနစ်နှင့် LLM များ ပေါင်းစည်းမှု စနစ်ကို ချဲ့ထွင်ပေးသော MCP built-in support ကို အသုံးပြုထားသည်။

#### Rust

ဤနမူနာတွင် Rust ဖြစ်သော MCP server တစ်ခု ရှိနေကြောင်း သတ်မှတ်ထားသည်။ သင့်တွင် မရှိပါက [01-first-server](../01-first-server/README.md) သင်ခန်းစာကို ပြန်ဆက်သွယ်ပြီး server ဖန်တီးပါ။

Rust MCP server ရှိသည့်အခါ terminal ကိုဖွင့်ပြီး server တည်ရှိရာ folder သို့ သွားပါ။ ထို့နောက် မိမိ LLM client project အသစ် ဖန်တီးရန် အောက်ပါ command ကို လည်ပတ်ပါ -

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

`Cargo.toml` ဖိုင်တွင် အောက်ပါ dependencies များ ထည့်သွင်းပါ -

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> Official Rust OpenAI library မရှိသော်လည်း `async-openai` crate သည် [အသုံးပြုသူ ရေးသားစောင့်ရှောက်သော library](https://platform.openai.com/docs/libraries/rust#rust) ဖြစ်ပြီး သာမန်အားဖြင့် အသုံးပြုကြသည်။

`src/main.rs` ဖိုင်ကို ဖွင့်ပြီး ၎င်း၏ အကြောင်းအရာအား အောက်ပါကုဒ်ဖြင့် အစားထိုးပါ -

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
    // စတင်စကားပေ
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // OpenAI client ကိုပြင်ဆင်ပါ
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // MCP client ကိုပြင်ဆင်ပါ
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

    // TODO: MCP ကိရိယာစာရင်းရယူရန်

    // TODO: ကိရိယာခေါ်ဆိုမှုနှင့်အတူ LLM စကားပြောမှု

    Ok(())
}
```

ဤကုဒ်သည် Rust แอปပလီကေးရှင်း အခြေခံတစ်ခုကို ပြုလုပ်ပေးသည်။ MCP server နှင့် GitHub Models နှင့် LLM ဆက်သွယ်မှုများ ပြုလုပ်ရန် ဖြစ်သည်။

> [!IMPORTANT]
> အပ်ပလီကေးရှင်း စလိုက်မည်မဟုတ်မီ `OPENAI_API_KEY` environment variable တွင် သင့် GitHub token ထည့်သွင်းထားရန် သေချာပါစေ။

အရမ်းကောင်းပြီ၊ နောက်ဆုံးအဆင့်အနေဖြင့် server ၏ စွမ်းရည်များ စာရင်းပြုစုကြစို့။

### -2- Server စွမ်းရည်များ စာရင်းပြုစုခြင်း

ယခု server သို့ ချိတ်ဆက်ပီး ၎င်း၏ စွမ်းရည်များကို မေးမြန်းကြမည် -

#### Typescript

တစ်ခုလုံး class ထဲတွင် အောက်ပါ method များ ထည့်သွင်းပါ -

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // ကိရိယာများကို စာရင်းပြုစုခြင်း
    const toolsResult = await this.client.listTools();
}
```

အထက်ပါကုဒ်တွင် -

- server နှင့် ချိတ်ဆက်ခြင်းအတွက် `connectToServer` method ကို ထည့်သွင်းထားသည်။
- app လည်ပတ်မှုကို ကိုင်တွယ်မည့် `run` method တစ်ခု ဖန်တီးထားသည်။ လောလောဆယ်ကိရိယာများ စာရင်းပြုလုပ်ခြင်းသာ ပါရှိပြီး နောက်ပိုင်းပိုများ ထည့်သွင်းမည်ဖြစ်သည်။

#### Python

```python
# ရရှိနိုင်သော အရင်းအမြစ်များကို စာရင်းပြုစုပါ
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# ရရှိနိုင်သော ကိရိယာများကို စာရင်းပြုစုပါ
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

ပြီးခဲ့သည့် အပိုင်းတွင် -

- ရင်းမြစ်များနှင့် ကိရိယာများကို စာရင်းပြုလုပ်ပြီး ပုံနှိပ်ပြထားသည်။ ကိရိယာများအတွက်တော့ `inputSchema` ကိုလည်း စာရင်းပြုလုပ်ထားသည်။

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

အထက်ဖော်ပြထားသော ကုဒ်တွင် -

- MCP Server တွင်ရနိုင်သော ကိရိယာများ စာရင်းပြုစုထားသည်။
- ကိရိယာတစ်ခုချင်းစီအတွက် အမည်၊ ဖော်ပြချက်နှင့် schema ကို စာရင်းပြုစုထားသည်။ schema ကို ကျွန်ုပ်တို့ စာရင်းပြုစုရေး နှင့် ကိရိယာခေါ်ယူရေးတွင် အသုံးပြုမည်ဖြစ်ပါသည်။

#### Java

```java
// MCP ကိရိယာများကို အလိုအလျောက် ရှာဖွေတွေ့ရှိပေးသည့် ကိရိယာ ပံ့ပိုးသူ တစ်ဦး ဖန်တီးပါ
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP ကိရိယာ ပံ့ပိုးသူသည် အလိုအလျောက် စီမံခန့်ခွဲပေးသည် -
// - MCP ဆာဗာမှ ရနိုင်သော ကိရိယာများ စာရင်းပြုစုခြင်း
// - MCP ကိရိယာ schema များကို LangChain4j ဖော်မတ်သို့ ပြောင်းလဲခြင်း
// - ကိရိယာ လုပ်ဆောင်ခြင်းနှင့် ပြန်ကြားချက်များ စီမံခန့်ခွဲခြင်း
```

အထက်ဖော်ပြထားသော ကုဒ်တွင် -

- MCP server မှ ကိရိယာအားလုံးကို အလိုအလျောက် ရှာဖွေမှတ်ပုံတင်ပေးသော `McpToolProvider` တစ်ခု ဖန်တီးထားသည်။
- tool provider သည် MCP tool schema များနှင့် LangChain4j tool ပုံစံရှိ ပြောင်းလဲမှုများကို ကိုယ်ပိုင်အတွင်းစနစ်ဖြင့် ဖြေရှင်းထားသည်။
- ဤနည်းလမ်းသည် ကိရိယာ စာရင်းပြုစုခြင်းနှင့် ပြောင်းလဲခြင်းကို လက်ယာသတိမရှိဘဲ လွယ်ကူစွာ ဆောင်ရွက်နိုင်စေနိုင်သည်။

#### Rust

MCP server မှ Tools များ ရယူရန် `list_tools` method ကို အသုံးပြုသည်။ သင့်၏ `main` function ထဲတွင် MCP client တည်ဆောက်သည့်နောက် အောက်ပါကုဒ်ကို ထည့်ပါ -

```rust
// MCP ကိရိယာစာရင်းကို ရယူပါ
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- Server စွမ်းရည်များကို LLM Tools အဖြစ် ပြောင်းလဲခြင်း

အရင်ဆုံး server စွမ်းရည်များစာရင်း၍ပါပြီးနောက် LLM နားလည်နိုင်သော ပုံစံသို့ ပြောင်းလဲပေးရမည်။ ထို့နောက် ၎င်းတို့ကို LLM အတွက် tool များအဖြစ် ပေးနိုင်ပါသည်။

#### TypeScript

1. MCP Server မှ တွေ့ရှိချက်ကို LLM သုံးနိုင်သော tool ပုံစံသို့ ပြောင်းရန် အောက်ပါကုဒ် ထည့်ပါ -

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // input_schema အပေါ်အခြေခံပြီး zod schema တစ်ခု ဖန်တီးပါ
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // type ကို "function" အဖြစ် တိတိကျကျ သတ်မှတ်ပါ
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

    အထက်ပါကုဒ်သည် MCP Server မှ ပြန်လာသော တုံ့ပြန်ချက်ကို LLM နားလည်နိုင်သော tool အဓိပ္ပာယ်ပြုသော ပုံစံသို့ ပြောင်းပေးသည်။

2. ၎င်းကို `run` method တွင် အောက်ပါအတိုင်း ပြင်ဆင်ပါ -

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

    အထက်ဖော်ပြသော ကုဒ်၌ `run` method ကို ပြန်လည်ပြင်ဆင်ပြီး ရလဒ်အား ဒလ်မြောက် ချိန်မကွက်အတိုင်း openAiToolAdapter ကို ခေါ်ယူထားသည်။

#### Python

1. ပထမဦးစွာ အောက်ပါ converter function ကို ဖန်တီးပါ -

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

    အထက်ဖော်ပြထားသော `convert_to_llm_tools` function တွင် MCP tool ပြန်တမ်းကို LLM နားလည်နိုင်သော ပုံစံသို့ ပြောင်းလဲထားသည်။

2. ၎င်း function ကို အသုံးပြုရန် client code ကို အောက်ပါအတိုင်း ပြင်ဆင်ပါ -

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    ဒီနေရာတွင် MCP tool ပြန်တမ်းကို LLM ထံ ပေးရန် `convert_to_llm_tool` ကို ခေါ်ယူထားသည်။

#### .NET

1. MCP tool တုံ့ပြန်ချက်ကို LLM နားလည်နိုင်သည့် ပုံစံသို့ ပြောင်းရန် ကုဒ် ထည့်သွင်းပါ -

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

အထက်ဖော်ပြထားသော ကုဒ်တွင် -

- အမည်၊ ဖော်ပြချက်နှင့် input schema ကို လက်ခံပြီး `ConvertFrom` function ကို ဖန်တီးထားသည်။
- ၎င်း function သည် FunctionDefinition တစ်ခုကို ဖန်တီးပြီး ChatCompletionsDefinition အတွင်းထည့်သည်။ နောက်တစ်ခုက LLM နားလည်နိုင်သော ပုံစံဖြစ်သည်။

2. ယခု function ကို အသုံးပြုရန် ရှိပြီးသားကုဒ်တွင် ပြင်ဆင်မှု -

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
// သဘာဝဘာသာစကားဆက်သွယ်မှုအတွက် Bot အင်တာဖေ့စ်တစ်ခုဖန်တီးပါ
public interface Bot {
    String chat(String prompt);
}

// LLM နှင့် MCP ကိရိယာများနှင့်အတူ AI ၀န်ဆောင်မှုကို ဖွဲ့စည်းပါ
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

အထက်ဖော်ပြထားသော ကုဒ်တွင် -

- သဘာဝဘာသာ စကားဖြင့် ဆက်သွယ်ရန် ရိုးရှင်းသော `Bot` interface ကို သတ်မှတ်ထားသည်။
- LangChain4j ရဲ့ `AiServices` ကို အသုံးပြု၍ LLM နှင့် MCP tool provider ကို အလိုအလျောက် ဆက်သွယ်မှု အသစ်များ ချိတ်ဆက်ထားသည်။
- framework သည် လုပ်ထုံးလုပ်နည်းများအားလုံးကို ကျောကြောင်းထောက်ပံ့ခြင်းဖြင့် MCP tool schema ပြောင်းခြင်းနှင့် function ခေါ်သေမှုကို ကိုင်တွယ်ပေးသည်။
- ဤနည်းလမ်းသည် လက်လွတ် tool ပြောင်းခြင်း မရှိဘဲ LangChain4j မှ MCP tools များကို LLM နှင့် ကိုက်ညီသည့် ပုံစံသို့ ပြောင်းပေးခြင်းအားအပြည့်အစုံ ကိုင်တွယ်ပေးသည်။

#### Rust

MCP tool response ကို LLM နားလည်သည့် ပုံစံသို့ ပြောင်းနိုင်ရေးအတွက် helper function ကို `main` function အောက်တွင် ထည့်သွင်းပါ။ LLM သို့ တောင်းဆိုမှုများ ပြုလုပ်ရာ၌ အသုံးပြုမည်ဖြစ်သည် -

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

ကောင်းပြီ၊ မည်သည့် user request မဆို ကိုင်တွယ်ရန် ပြင်ဆင်ထားသောကြောင့် အခု အောက်တွင် ဆက်လုပ်ကြရအောင်။

### -4- အသုံးပြုသူ prompt တောင်းဆိုမှု ကိုင်တွယ်ခြင်း

ဒီအပိုင်းတွင် အသုံးပြုသူ တောင်းဆိုမှုများ ကို ကိုင်တွယ်ပါမည်။

#### TypeScript

1. LLM ခေါ်ယူရန် အသုံးပြုမည့် method တစ်ခု ထည့်ပါ -

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // ၂။ ဆာဗာရဲ့ စက်ကိရိယာကို ခေါ်ပါ
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // ၃။ ရလဒ်နဲ့ ဘာလိုလုပ်မလဲ
        // လုပ်ဆောင်ရန်

        }
    }
    ```

    အထက်ပါကုဒ်တွင် -

    - `callTools` method တစ်ခု ထည့်သွင်းထားသည်။
    - LLM သုံးစွဲပြီး ကိရိယာများ ခေါ်စဉ် တောင်းဆိုမှုများ ရှိသလား စစ်ဆေးသော logic ပါဝင်သည်။

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // ကိရိယာခေါ်ရန်
        }
        ```

    - LLM မှ ကိရိယာတိုက်ရိုက်ခေါ်ရန် သတ်မှတ်သည့် ကိရိယာကို ခေါ်ယူသည် -

        ```typescript
        // ၂။ ဆာဗာ၏ tool ကိုခေါ်ပါ
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // ၃။ ရလဒ်နှင့်အတူတစ်စုံတစ်ရာ ပြုလုပ်ပါ
        // ကျန်ရှိသည်
        ```

2. `run` method ကို ပြင်ဆင်၍ LLM သို့ ခေါ်ဆိုခြင်းနှင့် `callTools` ကို ကိုင်တွယ်ပါ -

    ```typescript

    // ၁။ LLM အတွက်ထည့်သွင်းမည့်မက်ဆေ့ချ်များဖန်တီးပါ
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // ၂။ LLM ကိုခေါ်ယူခြင်း
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // ၃။ LLM အကြောင်းအရာကိုကြည့်ပါ၊ ရွေးချယ်မှုတိုင်းမှာ tool ခေါ်ဆိုမှုရှိမရှိစစ်ဆေးပါ
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

အမြဲတမ်းပြန့်ပါု -

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // schema စစ်ဆေးရန်အတွက် zod ကိုတင်သွင်းပါ

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // အနာဂတ်တွင် ဒီ url ကို ပြောင်းရန်လိုနိုင်သည်: https://models.github.ai/inference
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
          // input_schema အပေါ်မူတည်ပြီး zod schema တစ်ခု ဖန်တီးပါ
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // type ကိုအတိအကျ "function" ဟု သတ်မှတ်ပါ
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
    
    
          // 2. ဆာဗာ၏ ကိရိယာကို ခေါ်ပါ
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. ရလဒ်နှင့်အတူ တစ်စုံတစ်ခု လုပ်ဆောင်ပါ
          // ပြုလုပ်ရန်ရှိသည်
    
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
    
        // 3. LLM ဖြေကြားချက်အား စစ်ဆေး၍ ရွေးချယ်မှုတိုင်းအတွက် tool call များရှိမရှိ စစ်ဆေးပါ
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

1. LLM တွင် ခေါ်ရန် လိုအပ်သော imports များ ထည့်ပါ -

    ```python
    # llm
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. LLM ကို ခေါ်ဖို့ function ကို ထည့်ပါ -

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
            # ရွေးချယ်နိုင်သော ပါရာမီတာများ
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

    အထက်ဖော်ပြထားသော ကုဒ်၌ -

    - MCP server တွင် တွေ့ရှိထားသော functions များအား LLM သို့ ပေးပို့ထားသည်။
    - functions များဖြင့် LLM ကို ခေါ်ယူထားသည်။
    - ရလဒ်ကို စစ်ဆေးပြီး ဘယ် function များ ခေါ်မည်ဆိုသည်ကို ဖေါ်ထုတ်ထားသည်။
    - function များစဉ်ခေါ်ရန် စာရင်းကို လက်ခံပေးထားသည်။

3. နောက်ဆုံးအဆင့် အား client main code တွင် ပြင်ဆင်မှု -

    ```python
    prompt = "Add 2 to 20"

    # LLM ကိုကိရိယာအားလုံးအကြောင်း မေးမြန်းပါ၊ အကယ်၍ ရှိပါက
    functions_to_call = call_llm(prompt, functions)

    # အကြံပြုအသုံးပြုနိုင်သော function များကို ခေါ်ပါ
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    အပေါ်ဆုံးအဆင့်မှာ -

    - LLM ထံမှ ဖော်ထုတ်ထားသည့် function နှင့် စပ်ဆိုင်သည့် MCP tool ကို `call_tool` ဖြင့် ခေါ်ယူထားသည်။
    - MCP Server သို့ tool ခေါ်ယူမှု ရလဒ်ကို print ထုတ်ထားသည်။

#### .NET

1. LLM prompt တောင်းဆိုမှု ပြုလုပ်ရန် ကုဒ် -

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

    အထက်ဖော်ပြထားသော ကုဒ်၌ -

    - MCP Server မှ tool များ ရယူထားသည် (`var tools = await GetMcpTools()`).
    - အသုံးပြုသူ prompt ကို သတ်မှတ်ထားသည်။
    - တောင်းဆိုမှုအတွက် model နှင့် tools များကို ကြေညာထားသည်။
    - LLM အား တောင်းဆိုမှု ပြုလုပ်ထားသည်။

2. နောက်ဆုံးအဆင့်၊ LLM သည် function call အဆိုပြုလား ဟု စစ်ဆေးခြင်း -

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

    အထက်ဖော်ပြထားသော ကုဒ်၌ -

    - function call များကို မကြာခဏ လှည့်ကြည့်ထားသည်။
    - ကိရိယာ call များကို MCP client ဖြင့် ဖော်ထုတ်၍ MCP server ကိုခေါ်ဆောင်ပြီး ရလဒ်များကို print ထုတ်သည်။

အောက်တွင် အပြည့်အစုံ ကုဒ်ကို မြင်နိုင်ပါသည် -

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
    // MCP ကိရိယာများကို အလိုအလျောက် အသုံးပြုသော သဘာဝဘာသာစကား တောင်းဆိုမှုများကို အကောင်အထည်ဖော်ပါ။
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

အထက်ဖော်ပြထားသော ကုဒ်၌ -

- MCP server ကိရိယာများနှင့် ရိုးရှင်းသဘာဝဘာသာ prompt များကို ယောစွာဆက်သွယ်ထားသည်။
- LangChain4j framework သည် အလိုအလျောက် ကိုင်တွယ်သည် -
  - အသုံးပြုသူ prompt များကို လိုအပ်ပါက tool call များသို့ ပြောင်းလဲခြင်း
  - LLM ရွေးချယ်ချက်အရ MCP tool များကို ခေါ်ယူခြင်း
  - LLM နှင့် MCP server အကြား စကားပြောလမ်းကြောင်း စီမံခန့်ခွဲမှု
- `bot.chat()` method သည် MCP tool တိုက်ရိုက် လုပ်ဆောင်မှုရလဒ်ပါရှိသော သဘာဝဘာသာစကား ပြန်လည်ဖြေကြားချက်များ ပေးသည်။
- အသုံးပြုသူတို့သည် MCP implementation ရှိမှုကို သိရန် မလိုအပ်ဘဲ ချိတ်ဆက်မှု ကောင်းမွန်သော အတွေ့အကြုံ ရရှိသည်။

အပြည့်အစုံ ကုဒ် နမူနာ -

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

ဤနေရာမှာအလုပ်အများဆုံးဖြစ်သည်။ စတင်အသုံးပြုသူ prompt ဖြင့် LLM ကို ခေါ်ယူပြီး ပြန်လာသော တုံ့ပြန်ချက်ကို ချေးကြည့်ပါမည်။ tool တစ်ခုခု ခေါ်ရန်လိုပါက ခေါ်ယူထားပြီး LLM နှင့် ဆက်လက် စကားပြောစဉ်ဆက်သွယ်မှု ရရှိသည် အထိ ဆက်လုပ်ထားပါမည်။

LLM သို့ ခေါ်ယူမှုများ အများအပြား ပြုလုပ်မည်ဖြစ်သောကြောင့် LLM ခေါ်ယူမှု ကိုင်တွယ်သော function တစ်ခုကို သတ်မှတ်ပါ။ အောက်ပါ function ကို သင့် `main.rs` ဖိုင်တွင် ထည့်သွင်းပါ -

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

ဤ function သည် LLM client၊ message များ စာရင်း (အသုံးပြုသူ prompt ပါဝင်သည် )၊ MCP server ကိရိယာများအား လက်ခံပြီး LLM သို့ တောင်းဆိုချက် ပေးပို့ပြီး တုံ့ပြန်ချက် ပြန်လာစေပါသည်။
LLM ကနေလာတဲ့ တုံ့ပြန်ချက်မှာ `choices` ဆိုတဲ့ အစုအဝေး ပါရှိပါတယ်။ ငါတို့က ရလဒ်ကို စစ်ဆေးဖို့ လိုအပ်ပြီး `tool_calls` တစ်ခုခု ရှိမရှိ ပူစီပါမယ်။ ဒါက LLM က တိကျတဲ့ ကိရိယာတစ်ခုကို အချက်အလက်တွေနဲ့ ခေါ်ဆိုဖို့ တောင်းဆိုနေကြောင်း သိရှိနိုင်စေမှာဖြစ်တယ်။ သင့်ရဲ့ `main.rs` ဖိုင်အောက်ဆုံးမှာ နောက်ပါကုဒ်ကို သွင်းထည့်ပြီး LLM response ကို ကိုင်တွယ်မယ့် function တစ်ခု ဖေါ်ပြပါ။

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

    // အကြောင်းအရာရှိလျှင် ပုံနှိပ်ပါ
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // ကိရိယာခေါ်ဆိုမှုများကို ကိုင်တွယ်ပါ
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // အကူအညီပေး စာတန်းထည့်ပါ

        // ကိရိယာခေါ်ဆိုမှုတိုင်းကို အကောင်အထည်ဖော်ပါ
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // ကိရိယာရလဒ်ကို စာတန်းများထဲ သွင်းပါ
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // ကိရိယာရလဒ်များနှင့် စကားပြောမှု ဆက်လက် လုပ်ဆောင်ပါ
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


`tool_calls` ရှိခဲ့ရင် ကိရိယာအချက်အလက်တွေကို ဖယ်ထုတ်ပြီး MCP ဆာဗာကို ကိရိယာတောင်းဆိုမှုနဲ့ ခေါ်ဆိုပြီး ရလဒ်တွေရဲ့ စကားပြောပွဲစာတွေထဲ တင်ပြပါတယ်။ ထို့နောက် LLM နဲ့ စကားပြောပွဲကို ဆက်လက်လုပ်ဆောင်ပြီး စကားပြောပွဲစာတွေကို assistant ရဲ့ တုံ့ပြန်ချက်နဲ့ ကိရိယာခေါ်ဆိုမှုရလဒ်တွေနဲ့ ပြောင်းလဲ update လုပ်ပါတယ်။

MCP အတွက် LLM က ပြန်လာတဲ့ tool call အချက်အလက်တွေကို ဖယ်ထုတ်ဖို့ နောက်ထပ် helper function တစ်ခု ထည့်သွင်းမယ်။ သင့်ရဲ့ `main.rs` ဖိုင်အနောက်ဆုံးမှာ နောက်ပါကုဒ်ကို ထည့်သွင်းပါ။

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


အပိုင်းအားလုံး ပြီးဆုံးသွားပါက ပထမဆုံး အသုံးပြုသူ prompt ကို ကိုင်တွယ်ပြီး LLM ကို ခေါ်ဆိုနိုင်ပါပြီ။ `main` function ကို အောက်ပါကုဒ်အတိုင်း update လုပ်ပါ။

```rust
// ကိရိယာခေါ်ယူခြင်းနှင့်အတူ LLM စကားပြောဆိုမှု
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


ဒါကတော့ စတင်အသုံးပြုသူ prompt နဲ့ LLM ကို စစ်တမ်းထုတ်တယ်၊ နှစ်ခုရဲ့ စုစုပေါင်းကို တွက်ချက်ဖို့ တောင်းဆိုပါတယ်၊ ပြီးတော့ tool call တွေကို dynamic အနေနဲ့ ကိုင်တွယ်ပါတယ်။

ကောင်းပြီ၊ သင်ပြုလုပ်နိုင်ပြီ!

## အလုပ်အပ်ထားတာ

လုပ်ပေးထားတဲ့ ကုဒ်ထဲကနေ စာရင်းယူပြီး ဆာဗာကို ကိရိယာပိုများဖြင့် တိုးချဲ့ဖန်တီးပါ။ အဲဒီနောက် LLM ပါတဲ့ client တစ်ခု ဖန်တီးပြီး လေ့လာမှုလိုက် prompt မျိုးမျိုးနဲ့ စမ်းသပ်ပါ၊ သင့် ဆာဗာကိရိယာတွေကို dynamic အနေနဲ့ ခေါ်ဆိုမှုဖြင့် အလုပ်လုပ်ပေးတာကို သေချာစေရန်။ ဤ client ဖန်တီးပုံနည်းက အသုံးပြုသူအတွက် လုပ်ငန်းအတွေ့အကြုံကောင်းမွန်စေပါမယ်၊ အကြောင်းက prompt တွေနဲ့ သုံးနိုင်ပြီး တိကျတဲ့ client command မလိုအပ်ဘဲ MCP ဆာဗာက ခေါ်ဆိုဖို့ ကြားဖြတ်မှုကို မသိသေးဘဲ သုံးနိုင်ခြင်း ဖြစ်ပါတယ်။

## ဖြေရှင်းချက်

[Solution](./solution/README.md)

## အဓိက အချက်များ

- LLM ကို client ထဲ ထည့်သွင်းခြင်းက MCP ဆာဗာတွေနဲ့ အသုံးပြုသူတွေ ဆက်ဆံရေးအောင်မြင်စေပါတယ်။
- MCP ဆာဗာရဲ့ တုံ့ပြန်ချက်ကို LLM နားလည်စေရမယ့် ပုံစံသို့ ပြောင်းလဲရပါတယ်။

## နမူနာများ

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)
- [Rust Calculator](../../../../03-GettingStarted/samples/rust)

## ထပ်ဆောင်း အရင်းအမြစ်များ

## နောက်တစ်ဆင့်

- နောက်တစ်ခု: [Visual Studio Code ကနေ ဆာဗာကို အသုံးပြုခြင်း](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->