# LLM உடன் கிளையண்ட் உருவாக்கல்

இன்னுமொரு கட்டமாக, நீங்கள் எப்படி சர்வர் மற்றும் கிளையண்ட் உருவாக்குவது என்பதை பார்த்தீர்கள். கிளையண்ட் திறன்கள், வளங்கள் மற்றும் ப்ராம்ப்ட்களை பட்டியலிட சர்வரை வெளிப்படையாக அழைக்க முடிந்தது. இருப்பினும், இது மிகவும் நடைமுறையில் பயனுள்ள அணுகுமுறை அல்ல. உங்கள் பயனர்கள் ஏஜென்டிக் காலத்தில் வாழ்கிறார்கள் மற்றும் அவர்கள் ப்ராம்ப்ட்களை பயன்படுத்தி மற்றும் LLM உடன் தொடர்பு கொள்ள எதிர்பார்க்கின்றனர். அவர்கள் நீங்கள் MCP மூலம் உங்கள் திறன்களை சேமிக்கிறீர்களா என்பதில் கவலைப்படுவதில்லை; அவர்கள் இயற்கை மொழி மூலம் தொடர்பு கொள்ள வேண்டும் என எதிர்பார்க்கின்றனர். எனவே இதை எப்படி தீர்க்கலாம்? தீர்வு கிளையண்டில் ஒரு LLM ஐ சேர்ப்பது.

## அவலோகு

இந்த பாடத்தில் நாம் உங்கள் கிளையண்டில் ஒரு LLM ஐச் சேர்க்க கவனம் செலுத்துவோம் மற்றும் இது உங்கள் பயனருக்கு ஒரு மிகவும் சிறந்த அனுபவத்தை எப்படி வழங்குகிறது என்பதை காண்போம்.

## கற்றல் குறிக்கோள்கள்

இந்த பாட முடிவில், நீங்கள் செய்யக் கூடியவை:

- LLM உடன் ஒரு கிளையண்டை உருவாக்குதல்.
- LLM ஐ பயன்படுத்தி MCP சர்வருடன் சரளமாக தொடர்பு கொள்ளுதல்.
- கிளையண்ட் பக்கத்தில் சிறந்த இறுதி பயனர் அனுபவத்தை வழங்குதல்.

## அணுகுமுறை

நாம் எடுக்க வேண்டிய அணுகுமுறையை புரிந்து கொள்வோம். ஒரு LLM ஐ சேர்ப்பது எளிதாக தோன்றுகிறது, ஆனால் நிஜமாக இதை செய்வோமா?

கிளையண்ட் சர்வருடன் இதுபோல் தொடர்பு கொள்வோம்:

1. சர்வருடன் இணைப்பு அமைத்தல்.

1. திறன்கள், ப்ராம்ப்ட்கள், வளங்கள் மற்றும் கருவிகள் பட்டியலிடுதல் மற்றும் அவற்றின் திட்டக்கோவையை சேமித்தல்.

1. ஒரு LLM ஐ சேர்த்து சேமிக்கப்பட்ட திறன்கள் மற்றும் அவற்றின் திட்டக்கோவை LLM புரிந்துகொள்ளும் வடிவத்தில் அனுப்புதல்.

1. பயனர் ப்ராம்ப்டை LLM க்கு அனுப்பி, கிளையண்ட் பட்டியலிடும் கருவிகளுடன் சேர்த்து கையாளுதல்.

அடுக்குமுறை மேலோட்டமாக புரிந்துகொண்டோம், கீழ்க்காணும் பயிற்சியில் இதை முயற்சிக்கலாம்.

## பயிற்சி: LLM உடன் கிளையண்ட் உருவாக்கல்

இந்த பயிற்சியில், நாங்கள் எங்கள் கிளையண்டில் LLM ஐச் சேர்க்க கற்றுக்கொள்வோம்.

### GitHub தனிநபர் அணுகல் குறியீடு மூலம் நிர்வாகம்

GitHub குறியீட்டை உருவாக்குவது எளிய செயல்முறை. இதை செய்யும் முறைகள்:

- GitHub அமைப்புகளுக்கு செல்லவும் – மேல் வலது மூலையில் உங்கள் சுயவிவர படம் மீது கிளிக் செய்து அமைப்புகளைத் தேர்ந்தெடுக்கவும்.
- Developer Settings க்கு செல்லவும் – கீழே ஸ்க்ரோல் செய்து Developer Settings கிளிக் செய்யவும்.
- Personal Access Tokens தேர்வு செய்யவும் – Fine-grained tokens கிளிக் செய்து புதிய குறியீடு உருவாக்கவும்.
- உங்கள் குறியீட்டை அமைக்கவும் – குறிப்புக்காக ஒரு குறிப்பு சேர்க்கவும், காலாவதியை அமைக்கவும், தேவையான அனுமதிகளைத் தேர்ந்தெடுக்கவும் (இந்தப் படிக்கைக்கு Models அனுமதியைச் சேர்க்க வேண்டும்).
- குறியீட்டினை உருவாக்கி நகலெடுக்கவும் – Generate token கிளிக் செய்து உடனே நகலெடுக்கவும், பின்னர் மீண்டும் பார்க்க முடியாது.

### -1- சர்வருடன் இணைப்பு

முதலில் எங்கள் கிளையண்டை உருவாக்குவோம்:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // ஸ்கீமா சரிபார்ப்பிற்காக zod ஐ இறக்குமதி செய்க

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

மேலே உள்ள குறியீட்டில்:

- தேவையான நூலகங்களை இறக்குமதி செய்தோம்
- `client` மற்றும் `openai` என்ற இரண்டு உறுப்பினர்களுடன் ஒரு வகுப்பை உருவாக்கினோம், இது முறையில் கிளையண்டை நிர்வகிக்கவும் LLM உடன் தொடர்பு கொள்ளவும் உதவும்.
- GitHub Models ஐப் பயன்படுத்த LLM உதாரணத்தை `baseUrl` ஐ inference API க்கு குறிவைக்கும் வகையில் அமைத்தோம்.

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# stdio இணைப்பிற்கு சேவையக அளவுருக்களை உருவாக்கவும்
server_params = StdioServerParameters(
    command="mcp",  # செயலிழக்கக்கூடியது
    args=["run", "server.py"],  # விருப்பமான கட்டளை வரி ஆதாரங்கள்
    env=None,  # விருப்பமான சூழல் மாறிகள்
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # இணைப்பை ஆரம்பிக்கவும்
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

மேலே உள்ள குறியீட்டில்:

- MCP க்கான தேவையான நூலகங்களை இறக்குமதி செய்தோம்
- ஒரு கிளையண்டை உருவாக்கினோம்

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

முதலில், உங்கள் `pom.xml` கோப்பில் LangChain4j சார்புகளைச் சேர்க்க வேண்டும். MCP ஒன்றிணைப்பு மற்றும் GitHub Models ஆதரவை செயல்படுத்த இதைச் சேர்க்கவும்:

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

பின்னர் உங்கள் Java கிளையண்ட் வகுப்பை உருவாக்கவும்:

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
    
    public static void main(String[] args) throws Exception {        // LLM ஐ GitHub மாதிரிகளைப் பயன்படுத்த அமைக்கவும்
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // சேவையகத்துடன் இணைக்க MCP போக்குவரத்தை உருவாக்கவும்
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // MCP கிளையண்டை உருவாக்கவும்
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

மேலே உள்ள குறியீட்டில்:

- **LangChain4j சார்புகளைச் சேர்த்தோம்**: MCP, OpenAI அதிகாரபூர்வ கிளையண்ட் மற்றும் GitHub Models ஆதரவு
- **LangChain4j நூலகங்களை இறக்குமதி செய்தோம்**: MCP மற்றும் OpenAI உரையாடல் மாதிரி செயல்பாடு
- **`ChatLanguageModel` உருவாக்கினோம்**: GitHub குறியீடு கொண்டு GitHub Models ஐ பயன்படுத்த சீரமைத்தது
- **HTTP போக்குவரத்தை அமைத்தோம்**: Server-Sent Events (SSE) பயன்படுத்தி MCP சர்வருடன் இணைக்க
- **MCP கிளையண்ட் உருவாக்கினோம்**: சர்வருடன் தொடர்புகொள்வதில் உதவ
- **LangChain4j உடன் MCP ஆதரவு பயன்படுத்தினோம்**: LLM மற்றும் MCP சர்வர்களுக்கிடையிலான ஒருங்கிணைப்பை எளிமையாக்குகிறது

#### Rust

இந்த உதாரணம் Rust அடிப்படையிலான MCP சர்வர் நடப்பதாக கற்பனை செய்கிறது. ஒன்று இல்லையெனில், [01-first-server](../01-first-server/README.md) பாடத்திற்கு திரும்பி சர்வரை உருவாக்கவும்.

Rust MCP சர்வர் கிடைக்கும் பிறகு, டெர்மினலை திறந்து சர்வர் இருப்பிடமுள்ள கோப்புறைக்கு செல்க. பின்னர் புதிய LLM கிளையண்ட் திட்டத்தை உருவாக்க கீழ்க்காணும் கட்டளை இயக்கவும்:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

`Cargo.toml` கோப்பில் பின்வரும் சார்புகளைச் சேர்க்கவும்:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> OpenAI க்கான அதிகாரபூர்வ Rust நூலகம் இல்லை. இருப்பினும், `async-openai` கிரேட் ஒரு [சமூக பராமரிப்புள்ள நூலகமாகவுள்ளது](https://platform.openai.com/docs/libraries/rust#rust) மற்றும் அதிகமாக பயன்படுத்தப்படுகிறது.

`src/main.rs` கோப்பை திறந்து உள்ளடக்கம் பின்வரும் குறியீட்டின் மூலம் மாற்றவும்:

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
    // ஆரம்ப செய்தி
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // OpenAI கிளையன்டை அமைக்கவும்
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // MCP கிளையன்டை அமைக்கவும்
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

    // செய்ய வேண்டியது: MCP கருவி பட்டியலை பெறவும்

    // செய்ய வேண்டியது: கருவி அழைப்புகளுடன் LLM உரையாடல்

    Ok(())
}
```

இந்த குறியீடு ஒரு அடிப்படை Rust செயலியை அமைக்கிறது, அது MCP சர்வருடன் மற்றும் GitHub Models உடன் LLM தொடர்புக்காக இணைக்கப்படும்.

> [!IMPORTANT]
> செயலியை இயக்குவதற்கு முன் உங்கள் GitHub குறியீட்டை `OPENAI_API_KEY` சுற்றுப்பாதை மாறியாக அமைக்கவும்.

சரி, அடுத்த படியாக சர்வரில் திறன்களை பட்டியலிடுவோம்.

### -2- சர்வர் திறன்களை பட்டியலிடுதல்

இப்போது சர்வருடன் இணைந்து அதன் திறன்களை கேட்டுக்கொள்ளலாம்:

#### Typescript

அதே வகுப்பில் பின்வரும் முறைகளைச் சேர்க்கவும்:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // கருவிகளை பட்டியலிடுதல்
    const toolsResult = await this.client.listTools();
}
```

மேலே உள்ள குறியீட்டில்:

- சர்வருடன் இணைக்க `connectToServer` குறியீட்டைச் சேர்த்தோம்.
- நமது செயலியின் ஓட்டத்தை கையாளும் `run` முறையை உருவாக்கினோம். இதுவரை அது கருவிகளை மட்டுமே பட்டியலிடுகிறது, விரைவில் அதில் மேலும் சேர்க்க போகிறோம்.

#### Python

```python
# கிடைக்கும் வளங்களை பட்டியலிடு
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# கிடைக்கும் கருவிகளை பட்டியலிடு
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

இதோ நாம் சேர்த்தது:

- வளங்கள் மற்றும் கருவிகளை பட்டியலிட்டு அச்சிடப்பட்டது. கருவிகளைப் பயன்படுத்த `inputSchema` கூட பட்டியலிடப்பட்டது.

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

மேலே உள்ள குறியீட்டில்:

- MCP சர்வரில் கிடைக்கும் கருவிகள் பட்டியலிடப்பட்டன
- ஒவ்வொரு கருவிக்கும் பெயர், விளக்கம் மற்றும் அதன் திட்டக்கோவை பட்டியலிடப்பட்டது. அவற்றை விரைவில் கருவிகள் அழைக்க பயன்படுத்துவோம்.

#### Java

```java
// MCP கருவிகளை தானாக கண்டுபிடிக்கும் ஒரு கருவி வழங்குபவரைப் படையுங்கள்
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP கருவி வழங்குபவர் தானாக கையாள்கிறது:
// - MCP சர்வரிலிருந்து கிடைக்கும் கருவிகளlisting்
// - MCP கருவி திட்டவட்டங்களை LangChain4j வடிவத்திற்கு மாற்றல்
// - கருவி செயல்பாடுகள் மற்றும் பதில்களை நிர்வகித்தல்
```

மேலே உள்ள குறியீட்டில்:

- MCP சர்வரிலிருந்து அனைத்து கருவிகளையும் தானாய் கண்டுபிடிக்கும் மற்றும் பதிவு செய்யும் `McpToolProvider` உருவாக்கப்பட்டது
- கருவி வழங்குநர் MCP கருவி திட்டக்கோவைகளையும் LangChain4j கருவி வடிவத்துக்கும் உள்ளகமாக மாற்றுகிறது
- இது கருவிகள் பட்டியலும் மாற்றமும் கைமுறையாக செய்ய வேண்டிய அவசியத்தை அகற்றுகிறது

#### Rust

MCP சர்வரிலிருந்து கருவிகளை `list_tools` முறையால் பெறலாம். உங்கள் `main` செயல்பாட்டில் MCP கிளையண்ட் அமைக்கும் பின் கீழ்காணும் குறியீட்டைச் சேர்க்கவும்:

```rust
// MCP கருவி பட்டியலை பெறுக
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- சர்வர் திறன்களை LLM கருவிகளாக மாற்றுதல்

அடுத்து சர்வர் திறன்களை பட்டியலிட்ட பிறகு அவற்றை LLM புரிந்துகொள்ளும் வடிவத்திற்கு மாற்றவேண்டும். அதன்பிறகு இவற்றை LLM க்கு கருவிகளாக வழங்க முடியும்.

#### TypeScript

1. MCP சர்வர் பதிலை LLM பயன்பாட்டிற்குரிய கருவி வடிவத்திற்கு மாற்றும் பின்வரும் குறியீட்டைச் சேர்க்கவும்:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // உள்ளீடு_வட்டாரத்தைப் பொறுத்து ஒரு zod விசாரிப்பை உருவாக்கவும்
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // வகையை தெளிவாக "function" ஆக அமைக்கவும்
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

    மேலே உள்ள குறியீடு MCP சர்வர் பதிலை எடுத்துக் கொண்டு அதனை LLM புரிந்துகொள்ளும் கருவி வரையறை வடிவத்திற்கு மாற்றுகிறது.

2. அடுத்து `run` முறையை புதுப்பித்து சர்வர் திறன்களை பட்டியலிடுவோம்:

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

    முன் குறியீட்டில் `run` முறையை புதுப்பித்து, முடிவு வழியாக ஒவ்வொரு பதிவையும் `openAiToolAdapter` க்கு அழைக்கச் செய்துள்ளோம்.

#### Python

1. முதலில் கீழ்க்காணும் மாற்றுநர் முறையை உருவாக்குவோம்:

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

    மேலே உள்ள `convert_to_llm_tools` செயல்பாட்டில் MCP கருவி பதிலை எடுத்துக் கொண்டு LLM புரிந்துகொள்ளும் வடிவத்திற்கு மாற்றுகிறது.

2. அடுத்து இந்த முறையை பயன் படுத்தும்படி கிளையண்ட் குறியீட்டை இப்படி புதுப்பிக்கலாம்:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    இங்கு, MCP கருவி பதில்களை LLMக்கு வழங்குவதற்கு `convert_to_llm_tool` அழைப்பைப் பயன்படுத்தியுள்ளோம்.

#### .NET

1. MCP கருவி பதிலை LLM புரிந்துகொள்ளும் வடிவத்திற்கு மாற்றும் குறியீட்டை சேர்ப்போம்:

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

மேலே உள்ள குறியீட்டில்:

- பெயர், விளக்கம் மற்றும் உள்ளீட்டுத் திட்டக்கோவை பெறும் `ConvertFrom` செயல்பாடு உருவாக்கப்பட்டது.
- அது `FunctionDefinition` உருவாக்கி அதனை `ChatCompletionsDefinition` க்கு அனுப்புகிறது, இது LLM புரிந்துகொள்ளும் வடிவம்.

2. இப்போது மேலே உள்ள செயல்பாட்டின் பயன்பாட்டிற்கு ஏற்ற குறியீட்டை புதுப்பிப்போம்:

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
// இயற்கை மொழி தொடர்புக்கான ஒரு பாட்டை உருவாக்கவும்
public interface Bot {
    String chat(String prompt);
}

// LLM மற்றும் MCP கருவிகளுடன் AI சேவையை அமைக்கவும்
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

மேலே உள்ள குறியீட்டில்:

- இயற்கை மொழி தொடர்புக்கு எளிய `Bot` இடைமுகம் வரையறுக்கப்பட்டது
- LangChain4j இன் `AiServices` மூலம் LLM மற்றும் MCP கருவி வழங்குநரை தானாக இணைக்கப்பட்டது
- கருவி திட்டக்கோவைகள் மாற்றம் மற்றும் செயல்பாடு அழைப்பு பின்னணியில் தானாக கையாளப்படுகிறது
- கைமுறையற்ற கருவி மாற்றம் குறைக்கப்படுகிறது; LangChain4j MCP கருவிகளை LLM- பொருந்தும் வடிவத்திற்கு மாற்றுவதில் முழு சிக்கலை கையாளுகிறது

#### Rust

MCP கருவி பதிலை LLM புரிந்துகொள்ளும் வடிவத்திற்கு மாற்ற, கருவிகளின் பட்டியலை வடிவமைக்கும் துணை செயல்பாட்டை `main` செயல்பாட்டுக்கு கீழே `main.rs` கோப்பில் சேர்க்கவும். இது LLM க்கு கோரிக்கைகள் செய்யும்போது அழைக்கப்படும்:

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

சரி, பயனர் கோரிக்கைகள் கையாளப்படவில்லை, அடுத்ததாக அதை பார்க்கலாம்.

### -4- பயனர் ப்ராம்ப்ட் கோரிக்கையை கையாளுதல்

இந்த பகுதியில் பயனர் கோரிக்கைகளை கையாளுவோம்.

#### TypeScript

1. எங்கள் LLM ஐ அழைக்க பயன்படும் ஒரு முறையை சேர்க்கவும்:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. சேவையகத்தின் கருவியைக் கூப்பிடு
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. முடிவுடன் ஏதாவது செய்
        // செய்வது

        }
    }
    ```

    மேலே உள்ள குறியீட்டில்:

    - `callTools` என்ற முறையை சேர்த்தோம்.
    - இந்த முறை LLM பதிலை எடுத்து எந்த கருவிகள் அழைக்கப்பட்டுள்ளன எனப் பார்க்கும்:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // கருவியை அழைக்கவும்
        }
        ```

    - LLM கருவி அழைக்கப்பட வேண்டும் என்றால் அதை அழைக்கும்:

        ```typescript
        // 2. சர்வரின் கருவியை அழைக்கவும்
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. முடிவுடன் ஏதாவது செய்க
        // செய்ய வேண்டியது
        ```

2. `run` முறையை புதுப்பித்து LLM அழைப்புகளையும் `callTools` அழைப்புகளையும் சேர்க்கவும்:

    ```typescript

    // 1. LLM க்கு உள்ளீடாக 사용할 செய்திகளை உருவாக்கவும்
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. LLM ஐ அழைக்கிறோம்
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. LLM பதிலை ஒவ்வொரு தெரிவையும் சரிபார்க்க, அதில் கருவி அழைப்புகள் உள்ளதா என்று பாருங்கள்
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

சரி, முழு குறியீட்டை பட்டியலிடுவோம்:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // வடிகட்டல் சரிபார்ப்புக்காக zod ஐ இறக்குமதி செய்யவும்

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // எதிர்காலத்தில் இந்த url ஐ மாற்ற வேண்டியிருக்கலாம்: https://models.github.ai/inference
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
          // உள்ளீடு_schema அடிப்படையில் zod திட்டத்தை உருவாக்கவும்
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // வகையைத் தெளிவாக "function" என்று அமைக்கவும்
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
    
    
          // 2. சர்வரின் கருவியை அழைக்கவும்
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. முடிவுடன் ஏதாவது செய்க
          // செய்ய வேண்டியது
    
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
    
        // 3. LLM பதிலைப் பார்க்கவும், ஒவ்வொரு தேர்விற்கும், அதன் கருவி அழைப்புகள் உள்ளதா என்று சரிபார்க்கவும்
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

1. LLM அழைக்க தேவையான இறக்குமதிகளைச் சேர்க்கவும்:

    ```python
    # எல்.எல்.எம்
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. LLM அழைக்கும் செயல்பாட்டை சேர்க்கவும்:

    ```python
    # எல்.எல்.எம்

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
            # விருப்பமான பராமரிப்புகள்
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

    மேலே உள்ள குறியீட்டில்:

    - MCP சர்வரில் நாம் கண்டுபிடித்த, மாற்றிய செயல்பாடுகளை LLM க்கு கொடுத்திருக்கிறோம்.
    - பிறகு அந்த செயல்பாடுகளுடன் LLM ஐ அழைத்தோம்.
    - பதிலில் எந்த செயல்பாடுகளை அழைக்க வேண்டும் என பார்வையிடுகிறோம்.
    - இறுதியில் அழைக்க வேண்டிய செயல்பாடுகள் வரிசையை கடந்துள்ளோம்.

3. இறுதி படி, முக்கிய குறியீட்டை புதுப்பிக்கவும்:

    ```python
    prompt = "Add 2 to 20"

    # எல்.எல்.எம்.க்கு எந்த கருவிகள் அனைத்தையும், ஏதேனும் இருக்கும் என கேளுங்கள்
    functions_to_call = call_llm(prompt, functions)

    # பரிந்துரைக்கப்பட்ட செயல்பாடுகளை அழைக்கவும்
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    மேலே உள்ள குறியீட்டில்:

    - LLM கோரிக்கைக்கு ஏற்ப MCP கருவி `call_tool` மூலம் அழைக்கப்படுகிறது.
    - கருவி அழைப்பின் முடிவை MCP சர்வர் திருத்திகளுக்கு அச்சிடுகிறோம்.

#### .NET

1. LLM ப்ராம்ப்ட் கோரிக்கைக்கான குறியீட்டை காண்பிப்போம்:

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

    மேலே உள்ள குறியீட்டில்:

    - MCP சர்வரிலிருந்து கருவிகளை பெற்றுக் கொண்டோம், `var tools = await GetMcpTools()`.
    - பயனர் ப்ராம்ப்ட் `userMessage` உருவாக்கப்பட்டது.
    - மாதிரி மற்றும் கருவிகளை குறிப்பிடும் விருப்பங்களை அமைத்தோம்.
    - LLM க்கு கோரிக்கையினை செய்தோம்.

2. கடைசி படி, LLM ஒரு செயல்பாடு அழைக்க வேண்டுமா என பார்ப்போம்:

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

    மேலே உள்ள குறியீட்டில்:

    - செயல்பாடு அழைப்புகளை பட்டியலிடவும்
    - ஒவ்வொரு கருவி அழைக்க, பெயர் மற்றும் வாதங்களைப் பகுக்கி MCP சர்வரில் அழைக்கவும்; முடிவுகளை அச்சிடவும்

முழு குறியீடு இதோ:

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
    // இயல்புநிலை மொழி கோரிக்கைகளை இயக்கு, அவை தானாகவே MCP கருவிகளைக் பயன்படுத்தும்
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

மேலே உள்ள குறியீட்டில்:

- MCP சர்வர் கருவிகளுடன் எளிய இயற்கை மொழி ப்ராம்ப்ட்களைப் பயன்படுத்தினோம்
- LangChain4j கட்டமைப்பு தானாக:
  - பயனர் ப்ராம்ப்டுகளை தேவையான போது கருவி அழைப்புகளாக மாற்றுகிறது
  - LLM முடிவின்படி MCP கருவிகளை அழைக்கிறது
  - LLM மற்றும் MCP சர்வர் இடையேயான உரையாடல் ஓட்டத்தை நிர்வகிக்கிறது
- `bot.chat()` முறை MCP கருவிகளின் முடிவுகளோடு இயற்கை மொழி பதில்களைத் தருகிறது
- பயன்பாட்டாளர்கள் அடிப்படை MCP செயல்பாட்டைப் பற்றிய கவலை இல்லாமல் தொடர் அனுபவம் பெறுகிறார்கள்

முழு குறியீடின் உதாரணம்:

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

இங்கு பெரும்பாலான வேலை நடைபெறும். முதலில் ப்ராரம்ப பயனர் ப்ராம்ப்டுடன் LLM ஐ அழைப்போம், பின்னர் பதில்தொகுப்பை பகுப்பாய்வு செய்து எந்த கருவிகள் அழைக்க வேண்டும் என பார்க்கிறோம். தேவையெனில், அவை கருவிகள் அழைக்கப்படும் மற்றும் LLM உடன் உரையாடலும் தொடரும், மேலும் கருவி அழைப்புகள் தேவையில்லாமல் இறுதி பதில் வரும் வரை.

பல முறை LLM அழைப்போம், எனவே LLM அழைப்பை கையாளும் ஒரு செயல்பாட்டை வரையறுத்து `main.rs` கோப்பில் சேர்க்கவும்:

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

இந்த செயல்பாடு LLM கிளையண்டை, செய்திகளின் பட்டியலை (பயனர் ப்ராம்ப்ட் உட்பட), MCP சர்வர் கருவிகளை எடுத்து LLM க்கு கோரிக்கையை அனுப்பி பதிலை வழங்கும்.
LLM இன் பதில் `choices` என்ற வரிசையைக் கொண்டிருக்கும். எதாவது `tool_calls` இருக்கிறதா என்று பார்க்க முடிவு செய்ய நாம் முடிவு செய்வோம. இதனால் LLM ஒரு குறிப்பிட்ட கருவி அழைக்கப்பட வேண்டுமென கோருகிறது என்று நமக்கு தெரியும். LLM பதிலை கையாளும் ஒரு செயல்பாட்டை வரையறுக்க கீழே உள்ள குறியீட்டை உங்கள் `main.rs` கோப்பின் தாழ்த்துப் பகுதியில் சேர்க்கவும்:

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

    // உள்ளடக்கம் இருந்தால் அச்சிடுக
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // கருவி அழைப்புகளை கையாள்க
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // உதவியாளர் செய்தியைச் சேர்க்கவும்

        // ஒவ்வொரு கருவி அழிப்பையும் செயல்படுத்தவும்
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // கருவி முடிவை செய்திகளுக்கு சேர்க்கவும்
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // கருவி முடிவுகளுடன் உரையாடலை தொடரவும்
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


`tool_calls` இருந்தால், அது கருவி தகவலை எடுத்துக்கொள்கிறது, MCP சர்வரை கருவி கோரிக்கையுடன் அழைக்கிறது, மற்றும் முடிவுகளை உரையாடல் செய்திகள் சேர்க்கிறது. பின்னர், LLM உடன் உரையாடலை தொடர்கிறது மற்றும் செய்திகள் உதவியாளர் பதில் மற்றும் கருவி அழைப்பு முடிவுகளுடன் புதுப்பிக்கப்படுகின்றன.

MCP அழைப்புகளுக்காக LLM திருப்பும் கருவி அழைப்பு தகவலை எடுக்க மற்றொரு உதவி செயல்பாட்டை சேர்ப்போம். தேவையான அனைத்தையும் எடுக்க கீழே உள்ள குறியீட்டை உங்கள் `main.rs` கோப்பின் தாழ்த்துப் பகுதியில் சேர்க்கவும்:

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


முழு கூறுகளும் தயாரானதால், ஆரம்ப பயனர் குறிப்பு மற்றும் LLM அழைப்பை தற்போது கையாளலாம். உங்கள் `main` செயல்பாட்டை கீழ்க்காணும் குறியீடு சேர்க்க மாற்றவும்:

```rust
// கருவி அழைப்புகளுடன் LLM உரையாடல்
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


இது இரண்டு எண்களின் கூட்டத்தை கேட்டு LLM ஆய்வை நடைமுறைப்படுத்துகிறது, மற்றும் கருவி அழைப்புகளை தானாக கையாளும் வகையில் பதிலை செயலாக்குகிறது.

அற்புதம், நீங்கள் செய்துவிட்டீர்கள்!

## பணிகள்

பயிற்சியில் உள்ள குறியீட்டை எடுத்துக் கொண்டு பல கருவிகளுடனான சர்வரை உருவாக்கவும். பிறகு பழகு போன்று LLM உடன் ஒரு கிளையண்டைப் படைத்துப் பயன்படுத்தி பலவகை குறிப்பு கோரிக்கைகள் மூலம் பரிசோதிக்கவும், உங்கள் சர்வர் கருவிகளின் அனைத்தும் தானாக அழைக்கப்படுவதை உறுதிப்படுத்தவும். இத்தகைய கிளையண்ட் உருவாக்குவது, இறுதி பயனருக்கு சிறந்த அனுபவம் தரும், ஏனென்றால் அவர்கள் சரியான கிளையண்ட் கட்டளைகள் பதிலாக prompts ஐ பயன்படுத்தி, எந்த MCP சர்வர் அழைகள் நடைபெறுவதை கவனிக்காத வகையில் அனுமதிக்கிறது.

## தீர்வு

[தீர்வு](./solution/README.md)

## முக்கியக் குறிப்புகள்

- உங்கள் கிளையண்டுக்கு LLM சேர்ப்பது MCP சர்வர்களுடன் தொடர்பு கொள்ள சிறந்த வழியைக் கொடுக்கும்.
- MCP சர்வர் பதிலை LLM புரிந்துகொள்ளக்கூடிய வடிவமாக மாற்ற வேண்டும்.

## உதாரணங்கள்

- [ஜாவா கணக்காளி](../samples/java/calculator/README.md)
- [.Net கணக்காளி](../../../../03-GettingStarted/samples/csharp)
- [ஜாவாஸ்கிரியைப் கணக்காளி](../samples/javascript/README.md)
- [TypeScript கணக்காளி](../samples/typescript/README.md)
- [Python கணக்காளி](../../../../03-GettingStarted/samples/python)
- [Rust கணக்காளி](../../../../03-GettingStarted/samples/rust)

## மேலதிக வளங்கள்

## அடுத்தது என்ன

- அடுத்து: [Visual Studio Code மூலம் ஒரு சர்வரைப் பயன்படுத்துவது](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**மறுப்பு**:
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயற்சி செய்துள்ளோம், ஆனால் தானாக செய்யப்படும் மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கலாம் என்பதை கவனத்தில் கொள்ளவும். அசல் ஆவணம் அதன் தாய்மொழியில் அதிகாரப்பூர்வ ஆதாரமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்நுட்பமான மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பைப் பயன்படுத்துவதால் ஏற்படும் எந்த தவறான புரிதல்கள் அல்லது தவறான விளக்கத்திற்கும் நாங்கள் பொறுப்பில்வில்லை.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->