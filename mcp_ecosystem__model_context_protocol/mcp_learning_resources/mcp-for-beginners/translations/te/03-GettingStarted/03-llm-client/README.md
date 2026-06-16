# LLMతో క్లయింట్ సృష్టించడం

ఇంతవరకు, మీరు సర్వర్ మరియు క్లయింట్ ఎలా సృష్టించాలో చూశారు. క్లయింట్ స్పష్టంగా సర్వర్‌ను పిలిచి దాని టూల్స్, వనరులు, ప్రాంప్ట్‌లను జాబితా చేయగలిగింది. అయితే, ఇది చాలా ప్రాయోగికమైన పద్ధతి కాదు. మీ వినియోగదారులు ఏజెంటిక్ యుగంలో నివసిస్తున్నారు మరియు LLMతో మాట్లాడి ప్రాంప్ట్‌లను ఉపయోగించమని ఆశిస్తున్నారు. వారు మీరు MCP ఉపయోగించి మీ సామర్థ్యాలను నిల్వ చేస్తున్నారా అనేది పట్టించుకోరు; వారు సహజ భాషలో ఇంటరాక్ట్ చేయాలని అనుకుంటున్నారు. మరి దీన్ని ఎలా పరిష్కరిద్దాము? పరిష్కారం క్లయింట్‌లో LLMని జోడించడం.

## అవలోకనం

ఈ పాఠంలో మేము క్లయింట్‌లో LLMని ఎలా జోడించాలో మరియు ఇది మీ వినియోగదారునికి చాలా మెరుగైన అనుభవాన్ని ఎలా ఇస్తుందో తెలుసుకుంటాము.

## నేర్చుకోలేని లక్ష్యాలు

ఈ పాఠం చివరికి మీరు చేయగలరు:

- LLMతో ఒక క్లయింట్‌ని సృష్టించండి.
- LLM ఉపయోగించి MCP సర్వర్‌తో సజావుగా ఇంటరాక్ట్ చేయండి.
- క్లయింట్ వైపు మెరుగైన చివరి వినియోగదారుని అనుభవం అందించండి.

## దృష్టి కోణం

మన దృష్టిలోకి తీసుకుని అర్థం చేసుకోదాం. LLM జోడించడం సులభంగా అనిపించవచ్చు, కానీ మేమెప్పుడైతే నిజంగా దీన్ని చేయగలమో చూద్దాం.

క్లయింట్ సర్వర్‌తో ఎలా ఇంటరాక్ట్ చేస్తుంది:

1. సర్వర్‌తో కనెక్షన్ స్థాపించండి.

1. సామర్థ్యాలు, ప్రాంప్ట్‌లు, వనరులు మరియు టూల్స్ జాబితాను పొందండి, వాటి స్కీమాను సేవ్ చేసుకోండి.

1. LLMని జోడించి సేవ్ చేసిన సామర్థ్యాలు మరియు వాటి స్కీమాను LLM అనువగించే ఫార్మాట్‌లో అందించండి.

1. యూజర్ ప్రాంప్ట్‌ను LLMకి పాస్ చేయండి మరియు క్లయింట్ జాబితా చేసిన టూల్స్‌తో అందించండి.

చాలా బాగుంది, ఇప్పుడు మనం మందడిగా ఎలా చేయాలో అర్థం చేసుకున్నాము, క్రింది వ్యాయామంలో దీన్ని ప్రయత్నిద్దాం.

## వ్యాయామం: LLMతో క్లయింట్ సృష్టించడం

ఈ వ్యాయామంలో మేము మన క్లయింట్‌కు LLMను జోడించడం నేర్చుకుంటాము.

### GitHub వ్యక్తిగత యాక్సెస్ టోకెన్ ఉపయోగించి ప్రామాణీకరణ

GitHub టోకెన్ సృష్టించడం సులభమైన ప్రక్రియ. ఇలా చేయండి:

- GitHub సెట్టింగ్స్ కు వెళ్లండి – పైవైపున మీ ప్రొఫైల్ చిత్రాన్ని క్లిక్ చేసి సెట్టింగ్స్ ఎంచుకోండి.
- డెవელపర్ సెట్టింగ్స్ కు నావిగేట్ అవ్వండి – క్రిందకు స్క్రోల్ చేసి డెవలపర్ సెట్టింగ్స్ క్లిక్ చేయండి.
- వ్యక్తిగత యాక్సెస్ టోకెన్లను ఎంచుకోండి – ఫైన్-గ్రెయిన్ టోకెన్లపై క్లిక్ చేసి కొత్త టోకెన్ సృష్టించండి.
- మీ టోకెన్‌ను సెట్టప్ చేయండి – రిఫరెన్స్ కోసం ఒక నోట్ జోడించి, గడువు ముగింపు తేదీని సెట్ చేసి, అవసరమైన స్కోప్స్ (అనుమతులు) ఎంచుకోండి. ఈ సందర్భంలో Models అనుమతిని తప్పక జోడించండి.
- టోకెన్‌ను సృష్టించి కాపీ చేసుకోండి – జెనరేట్ టోకెన్ క్లిక్ చేసి వెంటనే కాపీ చేసుకోండి, ఇది మళ్లీ చూడలేరు.

### -1- సర్వర్‌కి కనెక్ట్ అవ్వండి

ముందుగా మన క్లయింట్‌ను సృష్టిద్దాం:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // స్కీమా ప్రమాణీకరణకు zodని దిగుమతి చేసుకోండి

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

ముందు కోడ్లో మేము:

- అవసరమైన లైబ్రరీలను ఇంపోర్ట్ చేశాము.
- `client` మరియు `openai` అనే రెండు సభ్యులతో ఒక క్లాస్ సృష్టించాము, ఇవి క్లయింట్‌ను నిర్వహించటానికి మరియు LLMతో ఇంటరాక్ట్ చేయటానికి సహాయపడతాయి.
- GitHub Models ఉపయోగించడానికి `baseUrl`ను `inference API`కు పాయింట్ చేయటం ద్వారా LLM ఇన్స్టెన్స్‌ను కాన్ఫిగర్ చేశాము.

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# stdio కనెక్షన్ కోసం సర్వర్ పారామితులు సృష్టించండి
server_params = StdioServerParameters(
    command="mcp",  # అమలు చేయదగిన
    args=["run", "server.py"],  # ఐచ్ఛిక కమాండ్ లైన్ ఆర్గ్యుమెంట్లు
    env=None,  # ఐచ్ఛిక వాతావరణ మార్పిడులు
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # కనెక్షన్ ప్రారంభించండి
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

ముందు కోడ్లో మేము:

- MCP కోసం అవసరమైన లైబ్రరీలను ఇంపోర్ట్ చేశాము
- ఒక క్లయింట్‌ను సృష్టించాము

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

ముందుగా, MCP ఇంటిగ్రేషన్ మరియు GitHub Models మద్దతు కోసం `pom.xml` ఫైల్‌లో LangChain4j డిపెండెన్సీలను జోడించాలి:

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

తదుపరి మీ Java క్లయింట్ క్లాస్ సృష్టించండి:

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
    
    public static void main(String[] args) throws Exception {        // LLM ను GitHub మోడల్స్ ఉపయోగించేటట్లు కాంఫిగర్ చేయండి
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // సర్వర్‌కు కనెక్ట్ వెయ్యడానికి MCP ట్రాన్స్పోర్ట్ సృష్టించండి
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // MCP క్లయింట్ సృష్టించండి
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

ముందు కోడ్లో మేము:

- **LangChain4j డిపెండెసీలను జోడించాము**: MCP ఇంటిగ్రేషన్, OpenAI అధికారిక క్లయింట్, GitHub Models మద్దతు కోసం
- **LangChain4j లైబ్రరీలను ఇంపోర్ట్ చేసాము**: MCP ఇంటిగ్రేషన్ మరియు OpenAI చాట్ మోడల్ ఫంక్షనాలిటీ కోసం
- **`ChatLanguageModel` సృష్టించాము**: GitHub Modelsతో GitHub టోకెన్తో పనిచేస్తుంది
- **HTTP ట్రాన్స్పోర్ట్ సెటప్ చేసాము**: సర్వర్-సెంట్ ఈవెంట్స్ (SSE) ఉపయోగించి MCP సర్వర్‌కి కనెక్ట్ అవ్వటానికి
- **MCP క్లయింట్ సృష్టించాము**: ఇది సర్వర్‌తో కమ్యూనికేషన్ నిర్వహిస్తుంది
- **LangChain4j యొక్క ఇంటిగ్రేట్ MCP మద్దతు ఉపయోగించాము**: ఇది LLMs మరియు MCP సర్వర్ల మధ్య ఇంటిగ్రేషన్ సులభతరం చేస్తుంది

#### Rust

ఈ ఉదాహరణలో మీరు Rust ఆధారిత MCP సర్వర్ నడుపుతున్నారని భావించబడుతుంది. మీకు లేదు అయితే, [01-first-server](../01-first-server/README.md) పాఠానికి తిరిగి వెళ్లి సర్వర్ సృష్టించుకోండి.

మీ Rust MCP సర్వర్ ఉన్న తర్వాత, టెర్మినల్ ఓపెన్ చేసి సర్వర్ ఉన్న అదే డైరెక్టరీకి జారండి. తరువాత కొత్త LLM క్లయింట్ ప్రాజెక్టును సృష్టించడానికి క్రింది కమాండ్‌ను రన్ చేయండి:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

మీ `Cargo.toml` ఫైల్‌కు ఈ డిపెండెన్సీలను జోడించండి:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> OpenAI కోసం అధికారిక Rust లైబ్రరీ లేదు, అయితే `async-openai` క్రేట్ ఒక [సామాజికంగా నిర్వహింపబడే లైబ్రరీ](https://platform.openai.com/docs/libraries/rust#rust) ఇది తరచుగా ఉపయోగిస్తారు.

`src/main.rs` ఫైల్‌ను ఓపెన్ చేసి దాని కంటెంట్‌ను ఈ క్రింది కోడ్‌తో మార్చండి:

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
    // ప్రారంభ సందేశం
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // OpenAI క్లయింట్ సెటప్ చేయండి
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // MCP క్లయింట్ సెటప్ చేయండి
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

    // చేయవలసినది: MCP టూల్ జాబితాను పొందండి

    // చేయవలసినది: టూల్ కాల్స్‌తో LLM సంభాషణ

    Ok(())
}
```

ఈ కోడ్ ఒక ప్రాథమిక Rust అప్లికేషన్‌ను సెట్ చేస్తుంది, ఇది MCP సర్వర్ మరియు GitHub Modelsతో LLM ఇంటరాక్షన్ కోసం కనెక్ట్ అవుతుంది.

> [!IMPORTANT]
> మీ అప్లికేషన్ నడుపేముందు `OPENAI_API_KEY` ఎన్విరాన్‌మెంట్ వేరియబుల్‌ను మీ GitHub టోకెన్తో సెట్ చేయండి.

బాగుంది, తదుపరి దశకి, సర్వర్ పై సామర్థ్యాలను జాబితా చేద్దాం.

### -2- సర్వర్ సామర్థ్యాలను జాబితా చేయండి

ఇప్పుడు సర్వర్‌కు కనెక్ట్ అయి దాని సామర్థ్యాలను అడుగుతాము:

#### TypeScript

అదే క్లాస్‌లో క్రింది మెథడ్‌లను జోడించండి:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // పరికరాలను జాబితా చేయడం
    const toolsResult = await this.client.listTools();
}
```

ముందు కోడ్లో మేము:

- సర్వర్‌కు కనెక్ట్ కావడము కోసం `connectToServer` కోడ్ జోడించాము.
- మన యాప్ ఫ్లో నిర్వహించే `run` మెథడ్ సృష్టించాము. ఇప్పటి వరకు ఇది టూల్స్ జాబితా చేస్తుంది కానీ ఇంకా జోడించబోతున్నాం.

#### Python

```python
# లభ్యమయ్యే వనరులను జాబితా చేయండి
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# లభ్యమయ్యే సాధనాలను జాబితా చేయండి
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

మేము చేసినది:

- వనరులు, టూల్స్ జాబితా చేసి ప్రింట్ చేశాము. టూల్స్‌కు `inputSchema` కూడా జాబితా చేశాము, దీన్ని తరువాత ఉపయోగిస్తాము.

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

ముందు కోడ్లో మేము:

- MCP సర్వర్‌లో లభ్యత ఉన్న టూల్స్‌ను జాబితా చేశాము
- ప్రతి టూల్‌కు పేరు, వివరణ మరియు స్కీమా చూపితాము. ఇది టూల్స్ పిలవటం కోసం ఉపయోగిస్తాం.

#### Java

```java
// MCP టూల్లను ఆటోమాటిక్‌గా కనుగొనే టూల్ ప్రొవైడర్‌ను సృష్టించండి
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP టూల్ ప్రొవైడర్ స్వయంచాలకంగా నిర్వహిస్తుంది:
// - MCP సర్వర్ నుండి అందుబాటులో ఉన్న టూల్లను జాబితా చేయడం
// - MCP టూల్ స్కీమాలను LangChain4j ఫార్మాట్‌కు మార్చడం
// - టూల్ అమలు మరియు ప్రతిస్పందనలను నిర్వహించడం
```

ముందు కోడ్లో మేము:

- MCP సర్వర్ నుండి అన్ని టూల్స్ ఆటోమేటిక్‌గా కనుగొని రిజిస్టర్ చేసే `McpToolProvider` సృష్టించాము
- టూల్ ప్రొవైడర్ MCP టూల్ స్కీమాల్ని LangChain4j టూల్ ఫార్మాట్‌కు అంతర్గతంగా మారుస్తుంది
- ఇది మాన్యువల్ టూల్ జాబితా మరియు మార్పిడిని తొలగిస్తుంది

#### Rust

MCP సర్వర్ నుండి టూల్స్ పొందడానికి `list_tools` మెథడ్ వాడండి. మీ `main` ఫంక్షన్‌లో MCP క్లయింట్ సెటప్ చేసిన తరువాత క్రింది కోడ్ జోడించండి:

```rust
// MCP టూల్ జాబితాను పొందండి
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- సర్వర్ సామర్థ్యాలను LLM టూల్స్‌గా మార్చండి

సర్వర్ సామర్థ్యాలు జాబితా చేసిన తర్వాత వాటిని LLM అర్థం చేసుకునే ఫార్మాట్‌కి మార్చాలి. ఆ తర్వాత వాటిని మా LLMకు టూల్స్‌గా అందించవచ్చు.

#### TypeScript

1. MCP సర్వర్ నుండి వచ్చిన రెస్పాన్స్‌ను LLM ఉపయోగించగల టూల్ ఫార్మాట్‌కు మళ్లించే క్రింది కోడ్ జోడించండి:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // ఇన్‌పుట్_స్కీమా ఆధారంగా ఒక జడ్ స్కీమాను సృష్టించండి
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // స్పష్టంగా టైపు "function" గా సెట్ చేయండి
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

    పై కోడ్ MCP సర్వర్ రెస్పాన్స్ తీసుకుని LLM అర్థం చేసుకునే టూల్ నిర్వచన ఫార్మాట్‌కు మార్చుతుంది.

2. తరువాత, `run` మెథడ్‌ను సవరించి సర్వర్ సామర్థ్యాలను జాబితా చేయండి:

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

    ఇక్కడ `run` మెథడ్‌ను అప్డేట్ చేసి ప్రతీ ఎంట్రీకి `openAiToolAdapter` పిలవడం జోడించాము.

#### Python

1. ముందుగా ఈ కన్వర్టర్ ఫంక్షన్‌ను సృష్టిద్దాం

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

    `convert_to_llm_tools` ఫంక్షన్‌లో MCP టూల్ రెస్పాన్స్‌ను LLM అర్థం చేసుకునే ఫార్మాట్‌కి మార్చుతాము.

2. తర్వాత, మా క్లయింట్ కోడ్‌లో దీన్ని ఇలా ఉపయోగిద్దాం:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    ఇక్కడ `convert_to_llm_tool` ను కాల్ చేసి MCP టూల్ రెస్పాన్స్‌ను LLMకి అందించదగిన దానికి మార్చుతాము.

#### .NET

1. MCP టూల్ రెస్పాన్స్‌ను LLMకి అర్థమయ్యేలా మార్చే కోడ్ జోడిద్దాం:

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

ముందు కోడ్లో మేము:

- పేరు, వివరణ, ఇన్‌పుట్ స్కీమాను తీసుకునే `ConvertFrom` ఫంక్షన్ తయారు చేసాము.
- ఇది `FunctionDefinition` సృష్టిస్తుంది, ఇది `ChatCompletionsDefinition`కు పాస్ అవుతుంది. ఇది LLM అర్థం చేసుకునేది.

2. దీన్ని ఉపయోగించడానికి మునుపటి కోడ్ ఎలా మార్చాలో చూద్దాం:

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
// సహజ భాష అనుసంధానానికి బాట్ ఇంటర్‌ఫేస్ సృష్టించండి
public interface Bot {
    String chat(String prompt);
}

// LLM మరియు MCP టూల్‌లతో AI సేవను కాన్ఫిగర్ చేయండి
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

ముందు కోడ్లో మేము:

- సహజ భాష ఇంటరాక్షన్ కోసం సరళమైన `Bot` ఇంటర్‌ఫేస్ డిఫైన్ చేసాము.
- LangChain4j యొక్క `AiServices` ఉపయోగించి LLMను MCP టూల్ ప్రొవైడర్‌తో ఆటోమేటీక్గా బైండ్ చేయించాము.
- ఫ్రేమ్‌వర్క్ ఆటోమేటిగ్గా టూల్ స్కీమా మార్పిడి మరియు ఫంక్షన్ కాలింగ్ నిర్వహిస్తుంది.
- ఈ పద్ధతి మాన్యువల్ టూల్ మార్పిడి అవసరాన్ని తొలగిస్తుంది - MCP టూల్స్‌ను LLM అనుకూలమైన ఫార్మాట్‌కి మార్చడం అందరివారు LangChain4j చేస్తుంది.

#### Rust

MCP టూల్ రెస్పాన్స్‌ను LLM అర్థం చేసుకునే ఫార్మాట్‌కి మార్చేందుకు సహాయ ఫంక్షన్‌ని జోడిస్తాము, ఇది టూల్స్ జాబితాను ఫార్మాట్ చేస్తుంది. క్రింది కోడ్‌ను `main.rs` లో `main` ఫంక్షన్ కింద జోడించండి. ఇది LLMకు రిక్వెస్ట్ చేయడంలో సహాయం చేస్తుంది:

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

సరే, యూజర్ అభ్యర్థనలను హ్యాండిల్ చేయడానికి సిద్ధంగా ఉన్నాం, ఇక దాన్ని చూద్దాం.

### -4- యూజర్ ప్రాంప్ట్ అభ్యర్థనను హ్యాండిల్ చేయండి

ఇక్కడ మేము యూజర్ అభ్యర్థనలను హ్యాండిల్ చేస్తాము.

#### TypeScript

1. LLMని పిలవడానికి ఉపయోగించే ఒక మెథడ్ జోడించండి:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. సర్వర్ టూల్‌ను పిలవండి
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. ఫలితంతో ఏదైనా చేయండి
        // చేయాల్సింది

        }
    }
    ```

    ఇంతకు ముందు కోడ్లో:

    - `callTools` అనే మెథడ్ జోడించాము.
    - ఈ మెథడ్ LLM రెస్పాన్స్ తీసుకుని ఏ టూల్స్ పిలవబడ్డాయో చెక్ చేస్తుంది:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // పరికరాన్ని పిలుచుకోండి
        }
        ```

    - LLM పలకరించినట్లయితే టూల్‌ను పిలుస్తుంది:

        ```typescript
        // 2. సర్వర్ యొక్క సాధనాన్ని కాల్ చేయండి
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. نتیجہ के साथ कुछ करें
        // TODO
        ```

2. `run` మెథడ్ నవీకరించి LLMకి కాల్‌లు, `callTools`ని పిలవడం జోడించండి:

    ```typescript

    // 1. LLM కోసం ఇన్‌పుట్‌గా ఉండే సందేశాలను తయారుచేయండి
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. LLM ని పిలవడం
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. LLM ప్రతిస్పందనలో ప్రతి ఎంపిక కోసం, ఇది టూల్ కాల్స్‌ను కలిగి ఉందా చూడండి
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

బాగుంది, మొత్తం కోడ్ ఇక్కడ:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // స్కీమా ధ్రువీకరణ కోసం zod ను దిగుమతి చేయండి

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // భవిష్యత్తులో ఈ URL కి మార్పు చేయవలసి ఉండవచ్చు: https://models.github.ai/inference
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
          // input_schema ఆధారంగా ఒక zod స్కీమా సృష్టించండి
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // టైప్ ను స్పష్టంగా "function" గా సెట్ చేయండి
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
    
    
          // 2. సర్వర్ యొక్క టూల్ ని కాల్ చేయండి
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. ఫలితంతో ఏదైనా చేయండి
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
    
        // 3. LLM ప్రతిస్పందనలో ప్రతి ఎంపికను పరిశీలించి, దానిలో టూల్ కాల్స్ ఉన్నాయా అని చెక్ చేయండి
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

1. LLM పిలవటానికి కావలసిన కొన్ని ఇంపోర్ట్స్ జోడిద్దాం

    ```python
    # LLM
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. LLMను పిలవడానికి ఫంక్షన్ జోడిద్దాం:

    ```python
    # ఎల్ఎల్పీ

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
            # ఐచ్ఛిక పారామితులు
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

    ఇంతకు ముందే:

    - మా ఫంక్షన్లు MCP సర్వర్ నుండి తీసుకుని మార్చి LLMకి పాస్ చేశాం.
    - ఆపై ఆ ఫంక్షన్లతో LLMను పిలవడం చేశాం.
    - ఫలితాన్ని పరీక్షించి ఏ ఫంక్షన్లను పిలవాలో అర్థం చేసుకున్నాం.
    - చివరగా పిలవాల్సిన ఫంక్షన్ల శ్రేణిని పాస్ చేసాం.

3. తుది దశ, మా ప్రధాన కోడ్‌ను నవీకరించండి:

    ```python
    prompt = "Add 2 to 20"

    # LLM ను అడుగు ఏ పరికరాలు అందుబాటులో ఉన్నాయో, ఉంటే ఏవి అని
    functions_to_call = call_llm(prompt, functions)

    # సూచించబడిన ఫంక్షన్లను పిలవండి
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    ఇక్కడ చివరి దశలో:

    - `call_tool` ద్వారా MCP టూల్ పిలుస్తున్నాము, LLM సూచించిన విధంగా.
    - టూల్ కాల్ ఫలితాన్ని MCP సర్వర్‌కు ప్రింట్ చేస్తున్నాము.

#### .NET

1. LLM ప్రాంప్ట్ అభ్యర్థన కొరకు కొన్ని కోడ్ చూపుదాం:

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

    ఇంతకు ముందు మేము:

    - MCP సర్వర్ నుండి టూల్స్ పొందాము, `var tools = await GetMcpTools()`.
    - ఒక యూజర్ ప్రాంప్ట్ `userMessage` సృష్టించాము.
    - మోడల్ మరియు టూల్స్‌తో ఆప్షన్ల ఆబ్జెక్టు తయారు చేసాము.
    - LLMకి అభ్యర్థన పంపాము.

2. చివరిగా, LLM కావాల్సిన ఫంక్షన్ పిలవాలి అనుకుంటే:

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

    ఇంతకు ముందు మేము:

    - ఫంక్షన్ కాల్స్ జాబితా ద్వారా లూప్ చేశాము.
    - ప్రతి టూల్ కాల్ కోసం పేరు, ఆర్గ్యుమెంట్లు పక్కకు పిలిచి MCP సర్వర్‌తో కమ్యూనికేట్ చేశాము. చివరగా ఫలితాలు ప్రింట్ చేశాము.

ఇది మొత్తం కోడ్:

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
    // MCP టూల్స్‌ను స్వయంచాలకంగా ఉపయోగించే సహజ భాషా అభ్యర్థనలను అమలు చేయండి
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

ఇంతకు ముందు మేము:

- MCP సర్వర్ టూల్స్‌తో సహజ భాష ప్రాంప్ట్‌లను ఉపయోగించాము
- LangChain4j ఫ్రేమ్‌వర్క్ ఆటోమేటిగ్గా నిర్వహిస్తుంది:
  - అవసరమైతే యూజర్ ప్రాంప్ట్‌లను టూల్ కాల్స్‌గా మార్చడం
  - LLM నిర్ణయం ప్రకారం సరైన MCP టూల్స్ పిలవడం
  - LLM మరియు MCP సర్వర్ మధ్య సంభాషణ నిర్వహణ
- `bot.chat()` సహజ భాషన్ ప్రతిస్పందనలు ఇస్తుంది, ఇవి MCP టూల్ ఎగ్జిక్యూషన్ ఫలితాలను కూడా కలిగి ఉండవచ్చు
- ఇది వినియోగదారులకు MCP అమర్చిన విధానాన్ని తెలియజేయకుండా సజావుగా పని చేసే అనుభవాన్ని అందిస్తుంది

మూసిన కోడ్ ఉదాహరణ:

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

ఇక్కడ ఎక్కువ పని జరుగుతుంది. మొదట యూజర్ ప్రాంప్ట్‌తో LLMని పిలవబడుతుంది, ఆ తర్వాత రెస్పాన్స్ పరిశీలించి ఏవైనా టూల్స్ పిలవాల్సిన అవసరం ఉందా చూడండి. ఉంటే, ఆ టూల్స్ పిలవబడతాయి మరియు సంతృప్తికరమైన రెస్పాన్స్ వస్తుండ వరకు LLMతో సంభాషణ కొనసాగుతుంది.

అన్నింటికంటే ముఖ్యంగా, LLM పిలవడం కోసం ఫంక్షన్ నిర్వచిద్దాం. మీ `main.rs` ఫైల్‌లో క్రింది ఫంక్షన్ జోడించండి:

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

ఈ ఫంక్షన్ LLM క్లయింట్, సందేశాల జాబితా (యూజర్ ప్రాంప్ట్ సహా), MCP సర్వర్ నుండి టూల్స్ తీసుకొని LLMకు అభ్యర్థన పంపి రెస్పాన్స్‌ను తిరిగి ఇస్తుంది.
LLM నుండి వచ్చిన ప్రతిస్పందన `choices` అనే అర్రేను కలిగి ఉంటుంది. ఏమైనా `tool_calls` ఉండాలా అనేది అర్థం చేసుకోవడానికి ఫలితాన్ని ప్రాసెస్ చేయాలి. LLM ఏదైనా ప్రత్యేక టూల్‌ను ఆర్గ్యుమెంట్స్‌తో పిలవాలని అడుగుతుందని మనకి ఇది తెలియజేస్తుంది. LLM ప్రతిస్పందనను హ్యాండిల్ చేయడానికి క్రింది కోడ్‌ను మీ `main.rs` ఫైల్ కిందభాగంలో జోడించండి:

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

    // ఉన్నట్లయితే విషయం ముద్రించండి
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // టూల్ కాల్‌లను నిర్వహించండి
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // సహాయక సందేశాన్ని జోడించండి

        // ప్రతి టూల్ కాల్‌ను అమలు చేయండి
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // సందేశాలకు టూల్ ఫలితాన్ని జోడించండి
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // టూల్ ఫలితాలతో సంభాషణను కొనసాగించండి
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

`tool_calls` ఉంటే, ఇది టూల్ సమాచారాన్ని ఎక్స్‌ట్రాక్ట్ చేసి, టూల్ రిక్వెస్ట్‌తో MCP సర్వర్‌ను పిలుస్తుంది మరియు ఫలితాలను సంభాషణ మెసేజులలో జోడిస్తుంది. తరువాత LLMతో సంభాషణ కొనసాగించి, మెసేజులు సహాయకుడి ప్రతిస్పందన మరియు టూల్ కాల్ ఫలితాలతో నవీకరించబడతాయి.

LLM MCP కాల్స్ కోసం టూల్ కాల్ సమాచారం రిటర్న్ చేసినది ఎక్స్‌ట్రాక్ట్ చేయడానికి మేము మరొక హెల్పర్ ఫంక్షన్‌ను జోడిస్తాము. దీన్ని చేయడానికి క్రింది కోడ్‌ను మీ `main.rs` ఫైల్ కింద భాగంలో చేర్చండి:

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

అన్ని భాగాలు సిద్ధంగా ఉన్నందున, ఇప్పుడు ఆరంభ యూజర్ ప్రాంప్ట్‌ని హ్యాండిల్ చేయించి LLMని పిలవొచ్చు. మీ `main` ఫంక్షన్‌ను క్రింది కోడ్‌తో అప్డేట్ చేయండి:

```rust
// టూల్ కాల్స్‌తో LLM సంభాషణ
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

ఇదువల్ల LLMకు రెండు సంఖ్యల యోగం గురించి అర్ధం అయ్యే ప్రాంప్ట్ పంపబడుతుంది మరియు టూల్ కాల్స్‌ను డైనమిక్‌గా ప్రాసెస్ చేస్తుంది.

అద్భుతం, మీరు చేసేశారు!

## అసైన్‌మెంట్

వ్యాయామం నుండి కోడ్ తీసుకుని, మరికొందరు టూల్స్‌తో సర్వర్‌ను అభివృద్ధి చేయండి. ఆపై LLM కలిగిన క్లయింట్‌ను సృష్టించి వివిధ ప్రాంప్ట్‌లతో పరీక్షించి మీ సర్వర్ టూల్స్ అన్ని డైనమిక్‌గా పిలవబడుతున్నట్లుగా చూసుకోండి. ఇలాంటి క్లయింట్ నిర్మాణం వలన ఎండ్ యూజర్‌కు గొప్ప అనుభవం లభిస్తుంది, ఎందుకంటే వారు ఖచ్చిత క్లయింట్ కమాండ్ల కాకుండా ప్రాంప్ట్‌ల ద్వారా ఉపయోగించగలుగుతారు మరియు MCP సర్వర్ గురించి తెలియకుండానే పని చేయగలుగుతారు.

## పరిష్కారం

[Solution](./solution/README.md)

## ముఖ్యమైన అంశాలు

- మీ క్లయింట్‌లో LLMను కలపడం వల్ల వినియోగదారులు MCP సర్వర్లతో మరింత మెరుగ్గా వ్యవహరించగలుగుతారు.
- MCP సర్వర్ స్పందనని LLM అర్థం చేసుకునే విధంగా మార్చాలి.

## నమూనాలు

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)
- [Rust Calculator](../../../../03-GettingStarted/samples/rust)

## అదనపు వనరులు

## తదుపరి ఏమిటి

- తదుపరి: [Visual Studio Code ద్వారా సర్వర్‌ను వినియోగించడం](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్వీకరణ**:
ఈ పత్రం AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తున్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలు తప్పులు లేదా అసమగ్రతలను కలిగి ఉండవచ్చు. దాని స్వదేశ భాషలో ఉన్న అసలు పత్రాన్ని అధికారం కలిగిన మూలంగా పరిగణించాలి. కీలకమైన సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదాన్ని సిఫారసు చేస్తాము. ఈ అనువాదం ఉపయోగం వల్ల కలిగే ఏవైనా అపార్థాలు లేదా తప్పుదారులు కోసం మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->