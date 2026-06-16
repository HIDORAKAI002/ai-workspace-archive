# LLM के साथ क्लाइंट बनाना

अब तक, आपने देखा है कि कैसे एक सर्वर और एक क्लाइंट बनाया जाता है। क्लाइंट स्पष्ट रूप से सर्वर को कॉल करने में सक्षम रहा है ताकि उसके टूल, संसाधन और प्रॉम्प्ट की सूची प्राप्त की जा सके। हालांकि, यह एक बहुत व्यावहारिक तरीका नहीं है। आपके उपयोगकर्ता एजेंटिक युग में रहते हैं और प्रॉम्प्ट्स का उपयोग करने और LLM के साथ संवाद करने की उम्मीद करते हैं। उन्हें यह परवाह नहीं है कि आप अपने क्षमताओं को स्टोर करने के लिए MCP का उपयोग करते हैं; वे बस प्राकृतिक भाषा में इंटरैक्ट करने की उम्मीद करते हैं। तो हम इसे कैसे सुलझाएं? समाधान है क्लाइंट में एक LLM जोड़ना।

## अवलोकन

इस पाठ में हम अपने क्लाइंट में LLM जोड़ने पर ध्यान केंद्रित करेंगे और दिखाएंगे कि यह आपके उपयोगकर्ता के लिए कैसा बेहतर अनुभव प्रदान करता है।

## सीखने के उद्देश्य

इस पाठ के अंत तक, आप सक्षम होंगे:

- एक LLM के साथ क्लाइंट बनाना।
- MCP सर्वर के साथ LLM का उपयोग करके सहजता से बातचीत करना।
- क्लाइंट पक्ष पर बेहतर अंत उपयोगकर्ता अनुभव प्रदान करना।

## तरीका

आइए समझने की कोशिश करें कि हमें किस तरीके को अपनाना होगा। एक LLM जोड़ना सरल लगता है, लेकिन क्या हम वास्तव में ऐसा करेंगे?

यहाँ बताया गया है कि क्लाइंट सर्वर के साथ कैसे बातचीत करेगा:

1. सर्वर के साथ कनेक्शन स्थापित करें।

1. क्षमताओं, प्रॉम्प्ट, संसाधनों और टूल्स की सूची बनाएं, और उनकी स्कीमा को सहेजें।

1. एक LLM जोड़ें और सहेजी गई क्षमताओं और उनकी स्कीमा को LLM द्वारा समझे जाने वाले फॉर्मेट में पास करें।

1. उपयोगकर्ता के प्रॉम्प्ट को LLM को पास करते हुए, क्लाइंट द्वारा सूचीबद्ध टूल्स के साथ संभालें।

बहुत अच्छा, अब हमने उच्च स्तर पर समझ लिया कि हम इसे कैसे कर सकते हैं, आइए नीचे दिए गए अभ्यास में इसे आज़माएं।

## अभ्यास: LLM के साथ क्लाइंट बनाना

इस अभ्यास में, हम अपने क्लाइंट में एक LLM जोड़ना सीखेंगे।

### GitHub Personal Access Token का उपयोग कर प्रमाणीकरण

GitHub टोकन बनाना एक सरल प्रक्रिया है। इसे आप इस तरह कर सकते हैं:

- GitHub सेटिंग्स पर जाएं – ऊपर दाएं कोने में अपनी प्रोफ़ाइल चित्र पर क्लिक करें और सेटिंग्स चुनें।
- Developer Settings पर जाएं – नीचे स्क्रॉल करें और Developer Settings पर क्लिक करें।
- Personal Access Tokens चुनें – Fine-grained tokens पर क्लिक करें और फिर नया टोकन जनरेट करें।
- अपना टोकन कॉन्फ़िगर करें – संदर्भ के लिए नोट जोड़ें, समाप्ति तिथि सेट करें, और आवश्यक स्कोप (अनुमतियाँ) चुनें। इस मामले में Models अनुमति जोड़ना सुनिश्चित करें।
- टोकन जनरेट करें और कॉपी करें – Generate token पर क्लिक करें, और तुरंत कॉपी करें क्योंकि आप इसे फिर नहीं देख पाएंगे।

### -1- सर्वर से कनेक्ट करें

आइए सबसे पहले अपना क्लाइंट बनाएं:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // स्कीमा सत्यापन के लिए zod आयात करें

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

पिछले कोड में हमने:

- आवश्यक लाइब्रेरीज़ को इम्पोर्ट किया
- एक क्लास बनाया जिसमें दो सदस्य हैं, `client` और `openai`, जो क्रमशः एक क्लाइंट प्रबंधित करने और LLM के साथ इंटरैक्ट करने में मदद करेंगे।
- हमारे LLM इंस्टेंस को GitHub Models का उपयोग करने के लिए कॉन्फ़िगर किया, `baseUrl` को inference API की ओर सेट करते हुए।

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# stdio कनेक्शन के लिए सर्वर पैरामीटर बनाएँ
server_params = StdioServerParameters(
    command="mcp",  # निष्पादन योग्य
    args=["run", "server.py"],  # वैकल्पिक कमांड लाइन तर्क
    env=None,  # वैकल्पिक वातावरण चर
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # कनेक्शन आरंभ करें
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

पिछले कोड में हमने:

- MCP के लिए आवश्यक लाइब्रेरीज़ को इम्पोर्ट किया
- एक क्लाइंट बनाया

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

सबसे पहले, आपको LangChain4j निर्भरताओं को अपने `pom.xml` फ़ाइल में जोड़ना होगा। MCP इंटीग्रेशन और GitHub Models सपोर्ट को सक्षम करने के लिए ये निर्भरताएँ जोड़ें:

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

फिर अपनी Java क्लाइंट क्लास बनाएं:

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
    
    public static void main(String[] args) throws Exception {        // LLM को GitHub मॉडल्स का उपयोग करने के लिए कॉन्फ़िगर करें
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // सर्वर से जुड़ने के लिए MCP ट्रांसपोर्ट बनाएं
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // MCP क्लाइंट बनाएं
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

पिछले कोड में हमने:

- **LangChain4j निर्भरताएँ जोड़ीं**: MCP इंटीग्रेशन, OpenAI आधिकारिक क्लाइंट, और GitHub Models सपोर्ट के लिए आवश्यक
- **LangChain4j लाइब्रेरीज़ इम्पोर्ट कीं**: MCP इंटीग्रेशन और OpenAI चैट मॉडल कार्यक्षमता के लिए
- **एक `ChatLanguageModel` बनाया**: जिसे आपके GitHub टोकन के साथ GitHub Models उपयोग के लिए कॉन्फ़िगर किया गया है
- **HTTP ट्रांसपोर्ट सेटअप किया**: Server-Sent Events (SSE) का उपयोग करते हुए MCP सर्वर से कनेक्ट करने के लिए
- **MCP क्लाइंट बनाया**: जो सर्वर के साथ संवाद संभालेगा
- **LangChain4j के बिल्ट-इन MCP सपोर्ट का उपयोग किया**: जो LLMs और MCP सर्वर के बीच इंटीग्रेशन को सरल बनाता है

#### Rust

यह उदाहरण मानता है कि आपके पास Rust आधारित MCP सर्वर चल रहा है। यदि आपके पास नहीं है, तो सर्वर बनाने के लिए [01-first-server](../01-first-server/README.md) पाठ को देखें।

एक बार जब आपके पास Rust MCP सर्वर हो, तो एक टर्मिनल खोलें और सर्वर की उसी निर्देशिका में जाएं। फिर नया LLM क्लाइंट प्रोजेक्ट बनाने के लिए निम्नलिखित कमांड चलाएं:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

`Cargo.toml` फ़ाइल में निम्नलिखित निर्भरताएँ जोड़ें:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> OpenAI के लिए कोई आधिकारिक Rust लाइब्रेरी नहीं है, हालांकि, `async-openai` क्रेट एक [समुदाय द्वारा संचालित लाइब्रेरी](https://platform.openai.com/docs/libraries/rust#rust) है जो सामान्यतः उपयोग की जाती है।

`src/main.rs` फ़ाइल खोलें और इसका कंटेंट निम्नलिखित कोड से बदल दें:

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
    // प्रारंभिक संदेश
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // OpenAI क्लाइंट सेटअप करें
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // MCP क्लाइंट सेटअप करें
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

    // TODO: MCP टूल सूची प्राप्त करें

    // TODO: टूल कॉल के साथ LLM संवाद

    Ok(())
}
```

यह कोड एक मूल Rust एप्लिकेशन सेटअप करता है जो MCP सर्वर और GitHub Models से LLM इंटरैक्शन के लिए कनेक्ट होगा।

> [!IMPORTANT]
> एप्लीकेशन चलाने से पहले अपने GitHub टोकन से `OPENAI_API_KEY` एनवायरनमेंट वेरिएबल सेट करना सुनिश्चित करें।

बहुत बढ़िया, अगले चरण के लिए चलिए सर्वर पर क्षमताओं की सूची बनाते हैं।

### -2- सर्वर की क्षमताएं सूचीबद्ध करें

अब हम सर्वर से कनेक्ट करेंगे और उसकी क्षमताओं के बारे में पूछेंगे:

#### Typescript

उसी क्लास में निम्नलिखित मेथड जोड़ें:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // उपकरण सूचीबद्ध करना
    const toolsResult = await this.client.listTools();
}
```

पिछले कोड में हमने:

- सर्वर से कनेक्ट करने के लिए कोड जोड़ा, `connectToServer`।
- एक `run` मेथड बनाया जो हमारे ऐप के फ्लो को संभालता है। अभी तक यह केवल टूल्स की सूची बनाता है, लेकिन हम इसे जल्दी ही बढ़ाएंगे।

#### Python

```python
# उपलब्ध संसाधनों की सूची बनाएं
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# उपलब्ध उपकरणों की सूची बनाएं
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

यहाँ हमने जोड़ा:

- संसाधनों और टूल्स को सूचीबद्ध किया और उन्हें प्रिंट किया। टूल्स के लिए हमने `inputSchema` भी सूचीबद्ध किया है जिसका उपयोग बाद में करेंगे।

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

पिछले कोड में हमने:

- MCP सर्वर पर उपलब्ध टूल्स की सूची बनाई।
- प्रत्येक टूल के लिए नाम, विवरण और उसकी स्कीमा सूचीबद्ध की। बाद में हम इस स्कीमा का उपयोग टूल्स को कॉल करने के लिए करेंगे।

#### Java

```java
// एक टूल प्रदाता बनाएं जो स्वचालित रूप से MCP टूल्स खोजता है
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP टूल प्रदाता स्वचालित रूप से संभालता है:
// - MCP सर्वर से उपलब्ध टूल्स की सूची बनाना
// - MCP टूल स्कीमाओं को LangChain4j फॉर्मेट में परिवर्तित करना
// - टूल निष्पादन और प्रतिक्रियाओं का प्रबंधन करना
```

पिछले कोड में हमने:

- एक `McpToolProvider` बनाया जो स्वयं सर्वर से सभी टूल्स की खोज करता है और उन्हें पंजीकृत करता है।
- टूल प्रोवाइडर MCP टूल स्कीमास को LangChain4j के टूल फॉर्मेट में आंतरिक रूप से परिवर्तित करता है।
- इस दृष्टिकोण से मैन्युअल टूल सूची और रूपांतरण प्रक्रिया से छुटकारा मिलता है।

#### Rust

MCP सर्वर से टूल्स प्राप्त करना `list_tools` मेथड का उपयोग करके किया जाता है। अपने `main` फ़ंक्शन में, MCP क्लाइंट सेटअप करने के बाद निम्नलिखित कोड जोड़ें:

```rust
// एमसीपी टूल सूची प्राप्त करें
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- सर्वर क्षमताओं को LLM टूल्स में परिवर्तित करें

सर्वर की क्षमताओं की सूची बनाने के बाद अगला कदम उन्हें LLM समझने योग्य फॉर्मेट में बदलना है। एक बार ऐसा हो जाने पर, हम इन क्षमताओं को अपने LLM को टूल्स के रूप में प्रदान कर सकते हैं।

#### TypeScript

1. MCP सर्वर की प्रतिक्रिया को LLM के उपयोग योग्य टूल फॉर्मेट में बदलने के लिए निम्न कोड जोड़ें:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // इनपुट_स्कीमा के आधार पर एक ज़ॉड स्कीमा बनाएं
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // प्रकार को स्पष्ट रूप से "फंक्शन" सेट करें
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

    ऊपर दिए गए कोड में MCP सर्वर से प्रतिक्रिया लेकर उसे एक टूल डेफ़िनिशन फॉर्मेट में बदला गया है जिसे LLM समझ सकता है।

2. अब `run` मेथड को अपडेट करें ताकि सर्वर क्षमताओं की सूची बनाई जा सके:

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

    पिछले कोड में, हमने `run` मेथड को अपडेट किया है ताकि परिणाम के प्रत्येक एंट्री के लिए `openAiToolAdapter` को कॉल किया जा सके।

#### Python

1. सबसे पहले, निम्न कन्वर्टर फ़ंक्शन बनाएं:

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

    ऊपर दिए गए `convert_to_llm_tools` फ़ंक्शन में हम MCP टूल प्रतिक्रिया लेकर उसे LLM समझ में आने वाले फॉर्मेट में परिवर्तित करते हैं।

2. अब अपने क्लाइंट कोड में इस फ़ंक्शन का उपयोग करने के लिए अपडेट करें:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    यहाँ, हम MCP टूल प्रतिक्रिया को LLM को फ़ीड करने योग्य रूप में बदलने के लिए `convert_to_llm_tool` को कॉल कर रहे हैं।

#### .NET

1. MCP टूल प्रतिक्रिया को LLM समझने योग्य बनाने के लिए कोड जोड़ें:

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

पिछले कोड में हमने:

- एक `ConvertFrom` फ़ंक्शन बनाया जो नाम, विवरण और इनपुट स्कीमा लेता है।
- ऐसा फ़ंक्शन डेफ़िनिशन बनाया जो `ChatCompletionsDefinition` को पास किया जाता है। यह LLM के लिए समझने योग्य होता है।

2. अब देखें कि किस तरह मौजूदा कोड को इस फ़ंक्शन का लाभ उठाने के लिए अपडेट किया जा सकता है:

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
// प्राकृतिक भाषा संवाद के लिए एक बोट इंटरफ़ेस बनाएं
public interface Bot {
    String chat(String prompt);
}

// LLM और MCP उपकरणों के साथ AI सेवा कॉन्फ़िगर करें
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

पिछले कोड में हमने:

- प्राकृतिक भाषा इंटरैक्शन के लिए एक सरल `Bot` इंटरफ़ेस बनाया
- LangChain4j के `AiServices` का उपयोग करके LLM को MCP टूल प्रोवाइडर के साथ स्वचालित रूप से बाइंड किया
- फ्रेमवर्क टूल स्कीमा रूपांतरण और फ़ंक्शन कॉलिंग को स्वचालित रूप से संभालता है
- इस दृष्टिकोण से मैन्युअल टूल रूपांतरण की आवश्यकता समाप्त हो जाती है — LangChain4j MCP टूल्स को LLM के अनुकूल फॉर्मेट में कन्वर्ट करने की सारी जटिलता संभालता है

#### Rust

MCP टूल प्रतिक्रिया को LLM समझने योग्य फॉर्मेट में बदलने के लिए, हम एक हेल्पर फ़ंक्शन जोड़ेंगे जो टूल्स की लिस्टिंग को फॉर्मेट करता है। अपने `main.rs` फ़ाइल में `main` फ़ंक्शन के नीचे निम्न कोड जोड़ें। इसे LLM को अनुरोध करते समय कॉल किया जाएगा:

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

बहुत अच्छा, अब हम उपयोगकर्ता अनुरोधों को संभालने के लिए तैयार हैं, तो इसे आगे बढ़ाते हैं।

### -4- उपयोगकर्ता प्रॉम्प्ट अनुरोध संभालना

इस भाग में, हम उपयोगकर्ता अनुरोधों को संभालेंगे।

#### TypeScript

1. एक मेथड जोड़ें जिसका उपयोग हम अपने LLM को कॉल करने के लिए करेंगे:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. सर्वर के टूल को कॉल करें
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. परिणाम के साथ कुछ करें
        // करने के लिए

        }
    }
    ```

    पिछले कोड में हमने:

    - `callTools` नामक एक मेथड जोड़ा।
    - यह मेथड LLM प्रतिक्रिया लेता है और देखता है कि कौन से टूल्स कॉल किए गए हैं, यदि कोई हैं:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // उपकरण कॉल करें
        }
        ```

    - यदि LLM संकेत करता है कि टूल कॉल किया जाना चाहिए तो टूल कॉल करता है:

        ```typescript
        // 2. सर्वर के टूल को कॉल करें
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. परिणाम के साथ कुछ करें
        // करना है
        ```

2. `run` मेथड को अपडेट करें ताकि LLM को कॉल किया जा सके और `callTools` को कॉल किया जा सके:

    ```typescript

    // 1. संदेश बनाएँ जो LLM के लिए इनपुट हों
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. LLM को कॉल करना
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. LLM प्रतिक्रिया को देखें, प्रत्येक विकल्प के लिए जांचें कि क्या उसमें टूल कॉल हैं
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

बहुत बढ़िया, सम्पूर्ण कोड सूचीबद्ध करते हैं:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // स्कीमा सत्यापन के लिए zod आयात करें

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // भविष्य में इसे इस url में बदलने की आवश्यकता हो सकती है: https://models.github.ai/inference
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
          // input_schema के आधार पर एक zod स्कीमा बनाएं
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // स्पष्ट रूप से प्रकार "function" सेट करें
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
    
    
          // 2. सर्वर के टूल को कॉल करें
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. परिणाम के साथ कुछ करें
          // करने के लिए
    
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
    
        // 3. LLM प्रतिक्रिया के माध्यम से जाएं, प्रत्येक विकल्प के लिए, जांचें कि क्या इसमें टूल कॉल हैं
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

1. LLM को कॉल करने के लिए आवश्यक कुछ इम्पोर्ट्स जोड़ें:

    ```python
    # एलएलएम
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. अब वह फ़ंक्शन जोड़ें जो LLM को कॉल करेगा:

    ```python
    # एलएलएम

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
            # वैकल्पिक पैरामीटर
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

    पिछले कोड में हमने:

    - हमारे द्वारा MCP सर्वर पर पाए और कन्वर्ट किए गए फ़ंक्शंस को LLM को पास किया।
    - फिर LLM को बताया गया फ़ंक्शंस के साथ कॉल किया।
    - परिणाम की जांच की कि क्या कोई फ़ंक्शन कॉल करनी है।
    - अंत में, फ़ंक्शन कॉल करने के लिए एक फ़ंक्शंस की सूची पास की।

3. अंतिम कदम, मुख्य कोड को अपडेट करें:

    ```python
    prompt = "Add 2 to 20"

    # सभी उपकरणों के लिए LLM से पूछें, यदि कोई हो
    functions_to_call = call_llm(prompt, functions)

    # सुझाए गए फ़ंक्शन कॉल करें
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    ऊपर के कोड में हमने:

    - `call_tool` के माध्यम से MCP टूल को कॉल किया जो LLM ने सुझाव दिया कि कॉल किया जाए।
    - टूल कॉल के परिणाम को MCP सर्वर पर प्रिंट किया।

#### .NET

1. LLM प्रॉम्प्ट अनुरोध करने का कोड देखें:

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

    पिछले कोड में हमने:

    - MCP सर्वर से टूल्स प्राप्त किए, `var tools = await GetMcpTools()`।
    - एक उपयोगकर्ता प्रॉम्प्ट `userMessage` बनाया।
    - मॉडल और टूल्स को निर्दिष्ट करते हुए एक विकल्प वस्तु बनाया।
    - LLM को एक अनुरोध भेजा।

2. अंतिम कदम, देखें कि क्या LLM सोचता है कि हमें कोई फ़ंक्शन कॉल करना चाहिए:

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

    पिछले कोड में हमने:

    - फ़ंक्शन कॉल की सूची में लूप किया।
    - प्रत्येक टूल कॉल के लिए नाम और तर्क पार्स किए और MCP क्लाइंट के माध्यम से MCP सर्वर पर टूल को कॉल किया। अंत में परिणाम प्रिंट किया।

पूरा कोड यहाँ है:

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
    // प्राकृतिक भाषा अनुरोधों को निष्पादित करें जो स्वचालित रूप से MCP उपकरणों का उपयोग करते हैं
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

पिछले कोड में हमने:

- सरल प्राकृतिक भाषा प्रॉम्प्ट्स का उपयोग कर MCP सर्वर टूल्स के साथ इंटरैक्ट किया
- LangChain4j फ्रेमवर्क स्वचालित रूप से संभालता है:
  - आवश्यक होने पर उपयोगकर्ता प्रॉम्प्ट्स को टूल कॉल में कन्वर्ट करना
  - LLM के निर्णय के आधार पर उचित MCP टूल्स को कॉल करना
  - LLM और MCP सर्वर के बीच संवाद प्रवाह प्रबंधित करना
- `bot.chat()` मेथड प्राकृतिक भाषा प्रतिक्रियाएँ लौटाता है जिनमें MCP टूल निष्पादन के परिणाम भी हो सकते हैं
- यह दृष्टिकोण एक सहज उपयोगकर्ता अनुभव प्रदान करता है जहाँ उपयोगकर्ताओं को मूल MCP इम्प्लीमेंटेशन के बारे में जानने की आवश्यकता नहीं होती

पूर्ण कोड उदाहरण:

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

यहाँ अधिकांश कार्य होता है। हम प्रारंभिक उपयोगकर्ता प्रॉम्प्ट के साथ LLM को कॉल करेंगे, फिर प्रतिक्रिया को प्रक्रिया करेंगे कि क्या कोई टूल कॉल करनी है। यदि हाँ, तो हम उन टूल्स को कॉल करेंगे और तब तक LLM के साथ वार्तालाप जारी रखेंगे जब तक और टूल कॉल की आवश्यकता न हो और हमारे पास अंतिम प्रतिक्रिया न हो।

हम कई बार LLM को कॉल करेंगे, इसलिए आइए एक फ़ंक्शन परिभाषित करें जो LLM कॉल को संभालेगा। अपने `main.rs` फ़ाइल में निम्न फ़ंक्शन जोड़ें:

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

यह फ़ंक्शन LLM क्लाइंट, संदेशों की सूची (जिसमें उपयोगकर्ता प्रॉम्प्ट भी शामिल है), MCP सर्वर से टूल्स लेता है, और LLM को अनुरोध भेजता है, फिर प्रतिक्रिया लौटाता है।
LLM से प्रतिक्रिया में `choices` की एक सरणी होगी। हमें यह देखने के लिए परिणाम को प्रोसेस करना होगा कि कोई `tool_calls` मौजूद हैं या नहीं। इससे हमें पता चलता है कि LLM किसी विशिष्ट टूल को तर्कों के साथ कॉल करने का अनुरोध कर रहा है। LLM प्रतिक्रिया को संभालने के लिए एक फ़ंक्शन परिभाषित करने हेतु अपने `main.rs` फ़ाइल के नीचे दिए गए कोड को जोड़ें:

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

    // यदि उपलब्ध हो तो सामग्री प्रिंट करें
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // टूल कॉल को संभालें
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // सहायक संदेश जोड़ें

        // प्रत्येक टूल कॉल को निष्पादित करें
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // संदेशों में टूल परिणाम जोड़ें
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // टूल परिणामों के साथ बातचीत जारी रखें
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

यदि `tool_calls` मौजूद हैं, तो यह टूल जानकारी निकालता है, MCP सर्वर को टूल अनुरोध के साथ कॉल करता है, और परिणामों को वार्तालाप संदेशों में जोड़ता है। इसके बाद यह LLM के साथ वार्तालाप जारी रखता है और संदेश सहायक की प्रतिक्रिया और टूल कॉल परिणामों के साथ अपडेट किए जाते हैं।

MCP कॉल के लिए LLM द्वारा लौटाई गई टूल कॉल जानकारी को निकालने के लिए, हम एक और सहायक फ़ंक्शन जोड़ेंगे जो कॉल करने के लिए आवश्यक सभी चीजों को निकालेगा। अपने `main.rs` फ़ाइल के नीचे निम्नलिखित कोड जोड़ें:

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

सभी टुकड़ों के स्थान पर होने के साथ, अब हम प्रारंभिक उपयोगकर्ता प्रॉम्प्ट संभाल सकते हैं और LLM को कॉल कर सकते हैं। अपने `main` फ़ंक्शन को निम्नलिखित कोड शामिल करते हुए अपडेट करें:

```rust
// उपकरण कॉल के साथ LLM वार्तालाप
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

यह प्रारंभिक उपयोगकर्ता प्रॉम्प्ट के साथ LLM से क्वेरी करेगा जो दो संख्याओं के योग के लिए कहता है, और यह प्रतिक्रिया को प्रोसेस करेगा ताकि टूल कॉल्स को डायनेमिक रूप से संभाला जा सके।

बहुत बढ़िया, आपने इसे कर लिया!

## असाइनमेंट

व्यायाम से कोड लेकर सर्वर को और अधिक टूल्स के साथ विकसित करें। फिर व्यायाम की तरह एक LLM के साथ एक क्लाइंट बनाएं और विभिन्न प्रॉम्प्ट्स के साथ इसका परीक्षण करें ताकि यह सुनिश्चित हो सके कि आपके सभी सर्वर टूल डायनेमिक रूप से कॉल किए जा रहे हैं। इस तरह क्लाइंट बनाने का अर्थ है कि अंतिम उपयोगकर्ता को एक उत्कृष्ट उपयोगकर्ता अनुभव प्राप्त होगा क्योंकि वे सटीक क्लाइंट कमांड के बजाय प्रॉम्प्ट्स का उपयोग कर सकते हैं, और उन्हें किसी भी MCP सर्वर कॉल होने का ज्ञान नहीं होगा।

## समाधान

[Solution](./solution/README.md)

## महत्वपूर्ण निष्कर्ष

- अपने क्लाइंट में LLM जोड़ने से उपयोगकर्ताओं के लिए MCP सर्वरों के साथ इंटरैक्ट करने का बेहतर तरीका मिलता है।
- आपको MCP सर्वर प्रतिक्रिया को कुछ इस प्रकार परिवर्तित करना होगा जिसे LLM समझ सके।

## उदाहरण

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)
- [Rust Calculator](../../../../03-GettingStarted/samples/rust)

## अतिरिक्त संसाधन

## अगला कदम

- अगला: [Visual Studio Code का उपयोग करते हुए एक सर्वर को उपभोग करना](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->