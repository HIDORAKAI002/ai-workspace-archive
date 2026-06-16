# LLM सहित क्लाइन्ट सिर्जना गर्दै

अहिलेसम्म, तपाईंले कसरी सर्भर र क्लाइन्ट सिर्जना गर्ने देख्नुभएको छ। क्लाइन्टले स्पष्ट रूपमा सर्भरलाई कल गर्न सकेको छ ताकि यसको उपकरणहरू, स्रोतहरू, र प्रम्प्टहरू सूचीबद्ध गर्न सकियोस्। तर यो धेरै व्यवहारिक तरिका होइन। तपाईंका प्रयोगकर्ताहरू एजेन्टिक युगमा बाँचिरहेका छन् र प्रम्प्टहरू प्रयोग गर्न र LLM सँग संवाद गर्न अपेक्षा गर्दछन्। उनीहरूलाई तपाईंले MCP मार्फत आफ्नो क्षमता स्टोर गर्नु भएको छ कि छैन भन्ने कुरा रोचक छैन; उनीहरू केवल प्राकृतिक भाषामा अन्तरक्रिया गर्ने अपेक्षा गर्दछन्। त्यसैले यसलाई कसरी समाधान गर्ने? समाधान भनेको क्लाइन्टमा LLM थप गर्नु हो।

## अवलोकन

यस पाठमूख्यमा हामी क्लाइन्टमा LLM थप गर्ने कुरामा केन्द्रित भइरहेका छौं र प्रयोगकर्ताका लागि यसले कसरी राम्रो अनुभव प्रदान गर्छ भन्ने देखाउँछौं।

## सिकाइ उद्देश्यहरू

यस पाठको अन्त्यमा, तपाईं सक्षम हुनुहुनेछ:

- LLM सहित क्लाइन्ट सिर्जना गर्न।
- LLM प्रयोग गरी MCP सर्भरसँग सहज रूपमा अन्तरक्रिया गर्न।
- क्लाइंट पक्षमा प्रयोगकर्ताका लागि राम्रो अन्तिम अनुभव प्रदान गर्न।

## दृष्टिकोण

हामीले लिनुपर्ने दृष्टिकोण बुझ्न प्रयास गरौं। LLM थप गर्नु सरल लाग्छ, तर के हामी साँच्चै यसलाई गर्नेछौं?

यहाँ क्लाइन्ट सर्भरसँग कसरी अन्तरक्रिया गर्ने छ:

1. सर्भरसँग जडान स्थापना गर्नुहोस्।

1. क्षमताहरू, प्रम्प्टहरू, स्रोतहरू र उपकरणहरू सूचीबद्ध गर्नुहोस् र तिनीहरूको स्किमालाई सुरक्षित गर्नुहोस्।

1. LLM थप्नुहोस् र सुरक्षित क्षमताहरू र स्किमालाई LLM बुझेको ढाँचामा पास गर्नुहोस्।

1. प्रयोगकर्ताको प्रम्प्टलाई क्लाइन्टले सूचीबद्ध गरेको उपकरणहरू सहित LLM लाई पास गरेर व्यवस्थापन गर्नुहोस्।

सुनौलो, अब हामी उच्च स्तरमा यसलाई कसरी गर्ने बुझ्यौं, तलको अभ्यासमा यसलाई प्रयास गरौं।

## अभ्यास: LLM सहित क्लाइन्ट सिर्जना गर्दै

यस अभ्यासमा, हामी हाम्रो क्लाइन्टमा LLM थप्न सिक्नेछौं।

### GitHub Personal Access Token प्रयोग गरेर प्रमाणीकरण

GitHub टोकन सिर्जना गरिनु सिधा प्रक्रिया हो। यसरी गर्न सकिन्छ:

- GitHub सेटिङ्हरूमा जानुहोस् – माथिल्लो दायाँ कुनामा तपाईंको प्रोफाइल तस्बिरमा क्लिक गर्नुहोस् र सेटिङ्हरू चयन गर्नुहोस्।
- Developer Settings मा जानुहोस् – तल स्क्रोल गरेर Developer Settings मा क्लिक गर्नुहोस्।
- Personal Access Tokens चयन गर्नुहोस् – Fine-grained tokens मा क्लिक गरेर नयाँ टोकन निर्माण गर्नुहोस्।
- तपाईंको टोकन कन्फिगर गर्नुहोस् – सन्दर्भका लागि नोट थप्नुहोस्, समाप्ति मिति सेट गर्नुहोस्, र आवश्यक स्कोपहरू (अनुमतिहरू) चयन गर्नुहोस्। यस अवस्थामा Models अनुमति थप्न निश्चित हुनुहोस्।
- टोकन निर्माण गर्नुहोस् र कपी गर्नुहोस् – Generate token मा क्लिक गर्नुहोस्, र तुरुन्तै कपी गर्नुहोस्, किनकि तपाईं यसलाई पुनः देख्न सक्नुहुने छैन।

### -१- सर्भरसँग जडान गर्नुहोस्

पहिला हाम्रो क्लाइन्ट सिर्जना गरौं:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // स्कीमा प्रमाणीकरणको लागि zod आयात गर्नुहोस्

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

अघिल्लो कोडमा हामीले:

- आवश्यक लाइब्रेरीहरू आयात गरेका छौं
- दुई सदस्य `client` र `openai` सहित वर्ग सिर्जना गरेका छौं जसले क्रमशः क्लाइन्ट व्यवस्थापन र LLM सँग अन्तरक्रिया गर्न मद्दत गर्छ।
- हाम्रो LLM उदाहरणलाई GitHub Models प्रयोग गर्न `baseUrl` लाई inference API मा सेट गरेर कन्फिगर गरेका छौं।

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# stdio जडानका लागि सर्भर प्यारामिटरहरू सिर्जना गर्नुहोस्
server_params = StdioServerParameters(
    command="mcp",  # कार्यान्वयन योग्य
    args=["run", "server.py"],  # वैकल्पिक कमाण्ड लाइन तर्कहरू
    env=None,  # वैकल्पिक वातावरण चरहरू
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # जडान सुरु गर्नुहोस्
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

अघिल्लो कोडमा हामीले:

- MCP का लागि आवश्यक लाइब्रेरीहरू आयात गरेका छौं
- क्लाइन्ट सिर्जना गरेका छौं

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

पहिला, तपाईंले आफ्नो `pom.xml` फाइलमा LangChain4j निर्भरता थप्नुपर्नेछ। MCP एकीकरण र GitHub Models समर्थन सक्षम पार्न यी निर्भरता थप्नुहोस्:

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

पछि आफ्नो Java क्लाइन्ट कक्षा सिर्जना गर्नुहोस्:

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
    
    public static void main(String[] args) throws Exception {        // LLM लाई GitHub मोडेलहरू प्रयोग गर्नका लागि कन्फिगर गर्नुहोस्
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // सर्भरसँग जडान गर्न MCP ट्रान्सपोर्ट सिर्जना गर्नुहोस्
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // MCP क्लाइन्ट सिर्जना गर्नुहोस्
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

अघिल्लो कोडमा हामीले:

- **LangChain4j निर्भरता थप्यौं**: MCP एकीकरण, OpenAI आधिकारिक क्लाइन्ट, र GitHub Models समर्थनका लागि आवश्यक
- **LangChain4j लाइब्रेरीहरू आयात गर्यौं**: MCP एकीकरण र OpenAI च्याट मोडेल कार्यक्षमता को लागी
- **`ChatLanguageModel` सिर्जना गर्यौं**: GitHub Models प्रयोग गर्न तपाईंको GitHub टोकन सहित कन्फिगर गरिएको
- **HTTP ट्रान्सपोर्ट सेटअप गर्यौं**: Server-Sent Events (SSE) प्रयोग गरी MCP सर्भरसँग जडान गर्न
- **MCP क्लाइन्ट सिर्जना गर्यौं**: जसले सर्भरसँग सञ्चार व्यवस्थापन गर्नेछ
- **LangChain4j को निर्मित MCP समर्थन प्रयोग गर्यौं**: जसले LLM र MCP सर्भरहरू बीचको एकीकरण सरल बनाउँछ

#### Rust

यस उदाहरणले Rust आधारित MCP सर्भर चलिरहेको मानिन्छ। यदि तपाईं सर्भर छैन भने, [01-first-server](../01-first-server/README.md) पाठमूख्यमा फर्केर सर्भर सिर्जना गर्न हेर्नुहोस्।

एकपटक तपाईंसँग Rust MCP सर्भर भएपछि, टर्मिनल खोल्नुहोस् र सर्भरको उही डाइरेक्टरीमा जानुहोस्। त्यसपछि नयाँ LLM क्लाइन्ट प्रोजेक्ट सिर्जना गर्न तलको आदेश चलाउनुहोस्:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

तपाईंको `Cargo.toml` फाइलमा तलका निर्भरता थप्नुहोस्:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> OpenAI को लागि आधिकारिक Rust लाइब्रेरी छैन, तथापि, `async-openai` क्रेट [समुदाय द्वारा व्यवस्थापन गरिएको लाइब्रेरी](https://platform.openai.com/docs/libraries/rust#rust) हो जुन सामान्य रूपमा प्रयोग गरिन्छ।

`src/main.rs` फाइल खोल्नुहोस् र त्यसको सामग्री तलको कोडले प्रतिस्थापन गर्नुहोस्:

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
    // प्रारम्भिक सन्देश
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // OpenAI क्लाइंट स्थापना गर्नुहोस्
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // MCP क्लाइंट स्थापना गर्नुहोस्
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

    // TODO: MCP उपकरण सूची प्राप्त गर्नुहोस्

    // TODO: उपकरण कलहरूसँग LLM कुराकानी

    Ok(())
}
```

यो कोडले एक आधारभूत Rust अनुप्रयोग सेटअप गर्छ जुन MCP सर्भर र GitHub Models सँग LLM अन्तरक्रियाका लागि जडान हुनेछ।

> [!IMPORTANT]
> अनुप्रयोग चलाउनु अघि कृपया `OPENAI_API_KEY` वातावरण चरमा तपाईंको GitHub टोकन सेट गर्न निश्चित गर्नुहोस्।

सुनौलो, हाम्रो अर्को चरणका लागि, सर्भरमा क्षमताहरू सूचीबद्ध गरौं।

### -२- सर्भर क्षमताहरू सूचीबद्ध गर्नुहोस्

अब हामी सर्भरसँग जडान हुन्छौं र यसको क्षमताहरू सोध्छौं:

#### Typescript

उही कक्षामा तलका विधिहरू थप्नुहोस्:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // उपकरणहरू सूचीबद्ध गर्दै
    const toolsResult = await this.client.listTools();
}
```

अघिल्लो कोडमा हामीले:

- सर्भरसँग जडान गर्ने कोड `connectToServer` थप्यौं।
- हाम्रो एप फ्लो व्यवस्थापन गर्ने `run` विधि सिर्जना गर्यौं। अहिलेसम्म यो केवल उपकरणहरू सूचीबद्ध गर्छ तर छिट्टै हामी यसमा थप गर्नेछौं।

#### Python

```python
# उपलब्ध स्रोतहरूको सूची बनाउनुहोस्
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# उपलब्ध उपकरणहरूको सूची बनाउनुहोस्
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

यहाँ हामीले थप्यौं:

- स्रोतहरू र उपकरणहरू सूचीबद्ध गर्यौं र प्रिन्ट गर्यौं। उपकरणहरूको लागि हामीले `inputSchema` पनि सूचीबद्ध गर्यौं जुन पछि प्रयोग गर्नेछौं।

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

अघिल्लो कोडमा हामीले:

- MCP सर्भरमा उपलब्ध उपकरणहरू सूचीबद्ध गर्यौं
- प्रत्येक उपकरणको नाम, विवरण र यसको स्किमा सूचीबद्ध गर्यौं। पछिल्लो कुरा हामी छिट्टै उपकरणहरू कल गर्न प्रयोग गर्नेछौं।

#### Java

```java
// यस्तो टुल प्रदायक बनाउनुहोस् जसले स्वतः MCP टुलहरू पत्ता लगाउँछ
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP टुल प्रदायकले स्वतः निम्न कुराहरू सम्हाल्दछ:
// - MCP सर्भरबाट उपलब्ध टुलहरूको सूची बनाउने
// - MCP टुल स्किमाहरूलाई LangChain4j स्वरूपमा रूपान्तरण गर्ने
// - टुल कार्यान्वयन र प्रतिक्रिया व्यवस्थापन गर्ने
```

अघिल्लो कोडमा हामीले:

- `McpToolProvider` सिर्जना गर्यौं जसले स्वचालित रूपमा सबै उपकरणहरू पत्ता लगाएर MCP सर्भरबाट दर्ता गर्छ
- उपकरण प्रदायकले MCP उपकरण स्किमा र LangChain4j को उपकरण ढाँचाबीच रूपान्तरण आन्तरिक रूपमा व्यवस्थापन गर्छ
- यस दृष्टिकोणले म्यानुअल उपकरण सूचीकरण र रूपान्तरण प्रक्रियालाई abstract गर्छ

#### Rust

MCP सर्भरबाट उपकरणहरू प्राप्त गर्न `list_tools` विधि प्रयोग गरिन्छ। तपाईंको `main` फन्क्शनमा, MCP क्लाइन्ट सेटअप पछि, तलको कोड थप्नुहोस्:

```rust
// MCP उपकरणको सूची प्राप्त गर्नुहोस्
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -३- सर्भर क्षमतालाई LLM उपकरणमा रूपान्तरण गर्नुहोस्

सर्भर क्षमताहरू सूचीबद्ध गरेपछि, अर्को चरण भनेको तिनीहरूलाई LLM ले बुझ्ने ढाँचामा रूपान्तरण गर्नु हो। यसपछि हामी यी क्षमताहरूलाई हाम्रो LLM का लागि उपकरणहरूसँग प्रदान गर्न सक्छौं।

#### TypeScript

1. MCP सर्भरबाट प्राप्त प्रतिक्रियालाई LLM ले प्रयोग गर्न सक्ने उपकरण ढाँचामा रूपान्तरण गर्न तलको कोड थप्नुहोस्:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // इनपुट_स्कीमा आधारमा एक जोड स्कीमा बनाउनुहोस्
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // स्पष्ट रूपमा प्रकार "function" मा सेट गर्नुहोस्
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

    माथिको कोडले MCP सर्भरबाट प्रतिक्रिया लिएर LLM ले बुझ्ने उपकरण परिभाषा ढाँचामा रूपान्तरण गर्छ।

2. `run` विधि अपडेट गरौं ताकि सर्भर क्षमताहरू सूचीबद्ध होस्:

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

    अघिल्लो कोडमा हामीले `run` विधि अपडेट गरेर परिणाममा नक्सा लगायौं र प्रत्येक प्रविष्टिमा `openAiToolAdapter` कल गर्यौं।

#### Python

1. पहिले तलको रूपान्तरण फंक्शन सिर्जना गरौं

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

    माथिको `convert_to_llm_tools` फंक्शनमा हामीले MCP उपकरण प्रतिक्रिया लिएर LLM ले बुझ्ने ढाँचामा रूपान्तरण गर्छौं।

2. अर्को, हाम्रो क्लाइन्ट कोड अपडेट गरौं ताकि यो फंक्शन उपयोग गर्न सकियोस्:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    यहाँ, हामीले `convert_to_llm_tools` कल थपेका छौं जुन MCP उपकरण प्रतिक्रियालाई हामी LLM लाई दिन सक्ने फारममा रूपान्तरण गर्छ।

#### .NET

1. MCP उपकरण प्रतिक्रियालाई LLM ले बुझ्ने गरी रूपान्तरण गर्न कोड थपौं

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

अघिल्लो कोडमा हामीले:

- `ConvertFrom` नामक फंक्शन बनायौं जसले नाम, विवरण र इनपुट स्किमा लिन्छ।
- कार्यक्षमता परिभाषित गर्यौं जसले FunctionDefinition सिर्जना गरी ChatCompletionsDefinition लाई पास गर्छ। पछिल्लो LLM ले बुझ्न सक्ने कुरा हो।

2. हाम्रो केही अवस्थित कोड यस फंक्शनको प्रयोग गर्ने गरी अपडेट गरौं:

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
// प्राकृतिक भाषा अन्तरक्रिया को लागि बोट अन्तराफल बनाउनुहोस्
public interface Bot {
    String chat(String prompt);
}

// LLM र MCP उपकरणहरूसँग AI सेवा कन्फिगर गर्नुहोस्
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

अघिल्लो कोडमा हामीले:

- प्राकृतिक भाषा अन्तर्क्रियाका लागि सरल `Bot` इन्टरफेस परिभाषित गर्यौं
- LangChain4j को `AiServices` प्रयोग गर्यौं जसले स्वतः LLM लाई MCP उपकरण प्रदायकसँग बाँध्छ
- फ्रेमवर्कले उपकरण स्किमा रूपान्तरण र फंक्शन कललाई पृष्ठभूमिमा स्वचालित रूपमा व्यवस्थापन गर्छ
- यस दृष्टिकोणले म्यानुअल उपकरण रूपान्तरणलाई हटाउँछ - LangChain4j ले MCP उपकरणहरूलाई LLM उपयुक्त ढाँचामा रूपान्तरण गर्ने सबै जटिलता सम्हाल्छ

#### Rust

MCP उपकरण प्रतिक्रियालाई LLM ले बुझ्ने ढाँचामा रूपान्तरण गर्न हामी एक हेल्पर फंक्शन थप्नेछौं जसले उपकरणहरूको सूची अनुकुल बनाउँछ। तल दिइएको कोड `main` फंक्शन मुनि थप्नुहोस्। यो LLM को अनुरोध गर्दा प्रयोग गरिनेछ:

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

सुनौलो, अब हामी कुनै प्रयोगकर्ता अनुरोधहरू व्यवस्थापनका लागि सेटअप भएका छैनौं, त्यसैले त्यो भाग अगाडि बढाऔं।

### -४- प्रयोगकर्ता प्रम्प्ट अनुरोध व्यवस्थापन गर्नुहोस्

यो भागमा हामी प्रयोगकर्ता अनुरोधहरू व्यवस्थापन गर्नेछौं।

#### TypeScript

1. LLM लाई कल गर्न प्रयोग हुने विधि थपौं:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // २. सर्भरको उपकरण कल गर्नुहोस्
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // ३. परिणामसँग केहि गर्नुहोस्
        // गर्न बाँकी छ

        }
    }
    ```

    अघिल्लो कोडमा हामीले:

    - `callTools` विधि थप्यौं।
    - विधिले LLM प्रतिक्रिया लिन्छ र हेर्छ कुन उपकरणहरू कल भएका छन्, यदि कुनै छ भने:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // उपकरण कल गर्नुहोस्
        }
        ```

    - यदि LLM ले उपकरण कल गर्न भन्यो भने उपकरण कल गर्छौं:

        ```typescript
        // २. सर्भरको उपकरणलाई कल गर्नुहोस्
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // ३. नतिजासँग केही गर्नुहोस्
        // गर्ने भन्ने कुरा (TODO)
        ```

2. `run` विधि अपडेट गरौं जसमा LLM कलहरू र `callTools` कलहरू समावेश गरियोस्:

    ```typescript

    // 1. LLM को लागि इनपुट सन्देशहरू सिर्जना गर्नुहोस्
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. LLM कॉल गर्दैछ
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. LLM प्रतिक्रिया मार्फत जानुहोस्, प्रत्येक विकल्पका लागि, जाँच गर्नुहोस् कि यसले टूल कलहरू समावेश गर्छ कि गर्दैन
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

सुनौलो, सम्पूर्ण कोड सूची गरौं:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // स्कीमा प्रमाणीकरणका लागि zod आयात गर्नुहोस्

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // भविष्यमा यो URL मा परिवर्तन गर्नु आवश्यक हुन सक्छ: https://models.github.ai/inference
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
          // input_schema मा आधारित zod स्कीमा सिर्जना गर्नुहोस्
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // प्रकारलाई स्पष्ट रूपमा "function" सेट गर्नुहोस्
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
    
    
          // 2. सर्भरको उपकरण कल गर्नुहोस्
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. परिणामसँग केही गर्नुहोस्
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
    
        // 3. LLM प्रतिक्रियामा जानुहोस्, प्रत्येक विकल्पका लागि, जाँच गर्नुहोस् कि यसमा उपकरण कलहरू छन् कि छैनन्
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

1. LLM कल गर्न आवश्यक केही आयात थपौं

    ```python
    # llm
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. LLM कल गर्ने फंक्शन थपौं:

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
            # वैकल्पिक प्यारामिटरहरू
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

    अघिल्लो कोडमा हामीले:

    - हाम्रो फंक्शनहरू, जुन MCP सर्भरमा पायौं र रूपान्तरण गर्यौं, LLM लाई पास गर्यौं।
    - त्यसपछि LLM लाई ती फंक्शनहरूसँग कल गर्यौं।
    - परिणाम जाँच्दै छौं कुन फंक्शन कल गर्नुपर्नेछ, यदि कुनै छ भने।
    - अन्तमा, कल गर्नुपर्ने फंक्शनहरूको सूची पास गर्यौं।

3. अन्तिम चरण, हाम्रो मुख्य कोड अपडेट गरौं:

    ```python
    prompt = "Add 2 to 20"

    # LLM लाई सोध्नुहोस् कि सबैका लागि के उपकरणहरू, यदि कुनै छन् भने
    functions_to_call = call_llm(prompt, functions)

    # सुझाएका कार्यहरू कल गर्नुहोस्
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    माथिको कोडमा हामीले:

    - `call_tool` मार्फत MCP उपकरण कल गर्यौं जुन LLM ले हाम्रो प्रम्प्ट आधारमा कल गर्नुपर्ने ठानेको थियो।
    - उपकरण कलको नतिजा MCP सर्भरमा प्रिन्ट गर्यौं।

#### .NET

1. LLM प्रम्प्ट अनुरोध गर्ने केही कोड देखाऔं:

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

    अघिल्लो कोडमा हामीले:

    - MCP सर्भरबाट उपकरणहरू ल्यायौं, `var tools = await GetMcpTools()`।
    - प्रयोगकर्ता प्रम्प्ट `userMessage` परिभाषित गर्यौं।
    - मोडेल र उपकरणहरू निर्दिष्ट गर्दै अप्सन्स वस्तु बनायौं।
    - LLM तर्फ अनुरोध गर्यौं।

2. अन्तिम कदम, LLM ले फंक्शन कल गर्नुपर्ने ठानेको छ कसरि हेर्नुहोस्:

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

    अघिल्लो कोडमा हामीले:

    - फंक्शन कलहरूको सूचीमा लूप गर्यौं।
    - प्रत्येक उपकरण कलका लागि नाम र तर्कहरू पार्स गरी MCP क्लाइन्ट प्रयोग गरी MCP सर्भरमा कल गर्यौं। अन्तमा परिणाम प्रिन्ट गर्यौं।

पूरा कोड यहाँ छ:

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
    // स्वचालित रूपमा MCP उपकरणहरू प्रयोग गर्ने प्राकृतिक भाषा अनुरोधहरू कार्यान्वयन गर्नुहोस्
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

अघिल्लो कोडमा हामीले:

- MCP सर्भर उपकरणहरूसँग अन्तरक्रिया गर्न सरल प्राकृतिक भाषा प्रम्प्टहरूको प्रयोग गर्यौं
- LangChain4j फ्रेमवर्कले स्वचालित रूपमा व्यवस्थापन गर्दछ:
  - आवश्यक पर्दा प्रयोगकर्ता प्रम्प्टलाई उपकरण कलमा रूपान्तरण
  - LLM को निर्णय अनुसार उपयुक्त MCP उपकरणहरू कल गर्ने
  - LLM र MCP सर्भर बीच संवाद प्रवाह व्यवस्थापन गर्ने
- `bot.chat()` विधिले प्राकृतिक भाषा प्रतिक्रिया फर्काउँछ जसमा MCP उपकरण कार्यान्वयनका नतिजा समावेश हुन सक्छ
- यस दृष्टिकोणले प्रयोगकर्तालाई MCP को अवस्थितिको ज्ञान बिना नै सहज अनुभव प्रदान गर्छ

पूरा कोड उदाहरण:

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

यहाँ सबैभन्दा धेरै काम हुन्छ। हामीले सुरुमा LLM लाई प्रयोगकर्ताको प्रम्प्ट सहित कल गर्नेछौं, त्यसपछि प्रतिक्रियालाई प्रशोधन गर्नेछौं कुन उपकरणहरू कल गर्नु पर्छ हेर्न। यदि छ भने, ती उपकरणहरू कल गरेर संवाद जारी राख्नेछौं जबसम्म थप उपकरण कल आवश्यक नपरोस् र अन्तिम प्रतिक्रिया प्राप्त नहोस्।

हामी धेरै पटक LLM कल गर्नेछौं, त्यसैले LLM कल ह्यान्डल गर्ने फंक्शन परिभाषित गरौं। तलको फंक्शन `main.rs` फाइलमा थप्नुहोस्:

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

यो फंक्शनले LLM क्लाइन्ट, सन्देशहरूको सूची (प्रयोगकर्ता प्रम्प्ट सहित), MCP सर्भरका उपकरणहरू लिन्छ र LLM लाई अनुरोध पठाएर प्रतिक्रिया फर्काउँछ।
LLM बाट आएको प्रतिक्रियाले `choices` को एउटा एरे समावेश गर्नेछ। हामीलाई परिणामलाई प्रक्रिया गर्न आवश्यक पर्छ कि कुनै `tool_calls` छन् कि छैनन् हेर्न। यसले हामीलाई थाहा हुन्छ कि LLM ले कुनै विशेष उपकरणलाई आर्गुमेन्टहरूसँग कल गर्न चाहन्छ। LLM प्रतिक्रिया व्यवस्थापन गर्न तलको कोडलाई तपाईंको `main.rs` फाइलको तल थप्नुहोस्:

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

    // सामग्री उपलब्ध भएमा प्रिन्ट गर्नुहोस्
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // उपकरण कलहरू व्यवस्थापन गर्नुहोस्
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // सहायक सन्देश थप्नुहोस्

        // प्रत्येक उपकरण कल कार्यान्वयन गर्नुहोस्
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // उपकरण नतिजा सन्देशहरूमा थप्नुहोस्
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // उपकरण नतीजाहरू सहित संवाद जारी राख्नुहोस्
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

यदि `tool_calls` उपस्थित छन् भने, यसले उपकरणको जानकारी निकाल्छ, उपकरण अनुरोधसँग MCP सर्भरलाई कल गर्छ, र परिणामहरूलाई संवाद सन्देशहरूमा थप्छ। त्यसपछि यो LLM सँग संवाद जारी राख्छ र सन्देशहरू सहायकको प्रतिक्रिया र उपकरण कल परिणामहरूसँग अद्यावधिक हुन्छन्।

LLM ले MCP कलहरूको लागि फर्काउनु भएको उपकरण कल जानकारी निकाल्नको लागि, हामी अर्को सहायक फंक्शन थप्नेछौं जुन सबै आवश्यक कुरा निकाल्छ। तलको कोडलाई तपाईंको `main.rs` फाइलको तल थप्नुहोस्:

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

सबै कम्पोनेन्टहरू तयार भएपछि, हामीले प्रारम्भिक प्रयोगकर्ता प्रॉम्प्ट व्यवस्थापन गर्न र LLM कल गर्न सक्छौं। तपाईंको `main` फंक्शनलाई निम्न कोड समावेश गर्न अद्यावधिक गर्नुहोस्:

```rust
// उपकरण कलहरूसँग LLM संवाद
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

यसले प्रारम्भिक प्रयोगकर्ता प्रॉम्प्टको साथ LLM लाई सोध्छ, दुई संख्याहरूको योगको लागि, र प्रतिक्रिया प्रक्रिया गरेर उपकरण कलहरूलाई गतिशील रूपमा व्यवस्थापन गर्नेछ।

शानदार, तपाईंले गरे!

## असाइनमेन्ट

व्यायामबाट कोड लिएर सर्भर थप उपकरणहरूसँग विस्तार गर्नुहोस्। त्यसपछि व्यायाममा जस्तो एक LLM सहित क्लाइन्ट सिर्जना गर्नुहोस् र विभिन्न प्रॉम्प्टहरूसँग परीक्षण गर्नुहोस् यस भनेर पक्का गर्न कि तपाईंको सबै सर्भर उपकरणहरू गतिशील रूपमा कल हुन्छन्। यस प्रकारको क्लाइन्ट निर्माणले अन्तिम प्रयोगकर्तालाई राम्रो अनुभव प्रदान गर्छ किनभने उनीहरू प्रॉम्प्टहरू प्रयोग गर्न सक्छन्, सटीक क्लाइन्ट कमाण्डहरूको सट्टा, र कुनै पनि MCP सर्भर कल भइरहेको कुरा थाहा नपाउनेछ।

## समाधान

[सोलुसन](./solution/README.md)

## मुख्य बिन्दुहरू

- क्लाइन्टमा LLM थप्नुले MCP सर्भरहरूसँग प्रयोगकर्ताहरूको अन्तरक्रिया गर्ने राम्रो तरिका प्रदान गर्छ।
- तपाईंलाई MCP सर्भर प्रतिक्रियालाई LLM ले बुझ्न सक्ने केहीमा रूपान्तरण गर्न आवश्यक छ।

## नमूनाहरू

- [Java क्याल्क्युलेटर](../samples/java/calculator/README.md)
- [.Net क्याल्क्युलेटर](../../../../03-GettingStarted/samples/csharp)
- [JavaScript क्याल्क्युलेटर](../samples/javascript/README.md)
- [TypeScript क्याल्क्युलेटर](../samples/typescript/README.md)
- [Python क्याल्क्युलेटर](../../../../03-GettingStarted/samples/python)
- [Rust क्याल्क्युलेटर](../../../../03-GettingStarted/samples/rust)

## अतिरिक्त स्रोतहरू

## के छ अर्को

- अर्को: [Visual Studio Code प्रयोग गरेर सर्भर उपभोग गर्ने](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->