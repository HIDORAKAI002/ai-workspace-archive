# LLM सह क्लायंट तयार करणे

आत्तापर्यंत, तुम्ही पाहिले आहे की सर्व्हर आणि क्लायंट कसे तयार करायचे. क्लायंटने स्पष्टपणे सर्व्हरला कॉल करून त्याचे टूल्स, संसाधने आणि प्रॉम्प्ट्स यादी केली आहे. मात्र, हा एक फार प्रायोगिक दृष्टिकोन नाही. तुमचे वापरकर्ते एजंटिक युगात राहतात आणि प्रॉम्प्ट्स वापरण्याची आणि LLM शी संवाद साधण्याची अपेक्षा करतात. त्यांना काळजी नाही की तुम्ही तुमच्या क्षमता साठवण्यासाठी MCP वापरता का; ते फक्त नैसर्गिक भाषेत संवाद साधण्याची अपेक्षा करतात. तर आपण हे कसे सोडवू? उत्तर म्हणजे क्लायंटमध्ये LLM जोडणे.

## आढावा

या धड्यात आपण क्लायंटमध्ये LLM जोडण्यावर लक्ष केंद्रित करणार आहोत आणि दर्शवणार आहोत की हे कसे तुमच्या वापरकर्त्यास चांगला अनुभव देते.

## शिकण्याचे उद्दिष्ट

या धड्याच्या शेवटी, तुम्ही सक्षम असाल:

- LLM सह क्लायंट तयार करणे.
- LLM वापरून सहजपणे MCP सर्व्हरशी संवाद साधणे.
- क्लायंट बाजूस वापरकर्त्याचा चांगला अनुभव प्रदान करणे.

## पद्धत

आपण कोणती पद्धत वापरायची हे समजून घेऊया. LLM जोडणे सोपे वाटते, पण आपण प्रत्यक्षात हे करू का?

क्लायंट सर्व्हरशी असे संवाद साधेल:

1. सर्व्हरशी कनेक्शन स्थापित करा.

2. क्षमतांची, प्रॉम्प्ट्स, संसाधने व टूल्सची यादी करा आणि त्यांचा स्कीमा जतन करा.

3. LLM जोडा आणि जतन केलेल्या क्षमतांबरोबर त्यांचा स्कीमा LLM समजेल अशा स्वरूपात पास करा.

4. वापरकर्त्याचा प्रॉम्प्ट LLMकडे टूल्ससह पाठवा जी क्लायंटने यादी केली आहेत.

चांगले, आता आपण उच्च स्तरावर हे कसे करायचे समजले, तर खालील व्यायामात हे प्रयत्न करूया.

## व्यायाम: LLM सह क्लायंट तयार करणे

या व्यायामात आपण आपल्या क्लायंटमध्ये LLM कसे जोडायचे ते शिकू.

### GitHub Personal Access Token वापरून प्रमाणीकरण

GitHub टोकन तयार करणे सोपे आहे. ते कसे करायचे ते येथे आहे:

- GitHub सेटिंग्ज वर जा – वर उजव्या कोपर्‍यातील तुमच्या प्रोफाईल चित्रावर क्लिक करा आणि सेटिंग्ज निवडा.
- Developer Settings कडे जा – खाली स्क्रोल करा आणि Developer Settings वर क्लिक करा.
- Personal Access Tokens निवडा – Fine-grained tokens वर क्लिक करा आणि नंतर Generate new token क्लिक करा.
- तुमच्या टोकनची कॉन्फिगर करा – संदर्भासाठी नोट जोडा, समाप्ती तारीख सेट करा आणि आवश्यक स्कोप्स (परवानग्या) निवडा. या प्रकरणात Models परवानगी निश्चित करा.
- टोकन तयार करा व कॉपी करा – Generate token क्लिक करा आणि लगेचच कॉपी करा कारण नंतर बघू शकणार नाही.

### -1- सर्व्हरशी कनेक्ट करा

आता प्रथम आपला क्लायंट तयार करूया:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // स्कीमा प्रमाणीकरणासाठी zod आयात करा

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
  
आधीच्या कोडमध्ये आपण:

- आवश्यक लायब्ररी इम्पोर्ट केल्या आहेत  
- दोन मेंबर्स असलेली वर्ग तयार केली आहे, `client` आणि `openai`, ज्यामुळे क्लायंट मॅनेज करण्यास आणि LLM शी संवाद साधण्यास मदत होईल.  
- GitHub Models वापरण्यासाठी `baseUrl` सेट करून आपला LLM इंस्टन्स कॉन्फिगर केला आहे.

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# stdio कनेक्शनसाठी सर्व्हर पॅरामीटर्स तयार करा
server_params = StdioServerParameters(
    command="mcp",  # कार्यान्वित करण्यायोग्य
    args=["run", "server.py"],  # ऐच्छिक कमांड लाईन आर्ग्युमेंट्स
    env=None,  # ऐच्छिक पर्यावरण चल
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # कनेक्शन प्रारंभ करा
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```
  
आधीच्या कोडमध्ये आपण:

- MCP साठी आवश्यक लायब्ररी इम्पोर्ट केल्या आहेत  
- क्लायंट तयार केला आहे

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

सुरूवातीला, तुमच्या `pom.xml` फाइलमध्ये LangChain4j डिपेंडन्सी जोडा. MCP इंटिग्रेशन आणि GitHub Models समर्थनासाठी खालील डिपेंडन्सी जोडा:

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
  
त्यानंतर तुमचा Java क्लायंट वर्ग तयार करा:

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
    
    public static void main(String[] args) throws Exception {        // GitHub मॉडेल्स वापरण्यासाठी LLM सेट करा
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // सर्व्हरशी कनेक्ट होण्यासाठी MCP ट्रान्सपोर्ट तयार करा
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // MCP क्लायंट तयार करा
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```
  
आधीच्या कोडमध्ये आपण:

- **LangChain4j डिपेंडन्सी जोडल्या**: MCP इंटिग्रेशन, OpenAI अधिकृत क्लायंट आणि GitHub Models समर्थनासाठी  
- **LangChain4j लायब्ररी इम्पोर्ट केल्या**: MCP इंटिग्रेशन आणि OpenAI चॅट मॉडेलसाठी  
- **`ChatLanguageModel` तयार केले**: GitHub टोकनसह GitHub Models वापरण्यासाठी कॉन्फिगर केले  
- **HTTP ट्रान्सपोर्ट सेट केला**: Server-Sent Events (SSE) वापरून MCP सर्व्हरशी कनेक्ट करणे  
- **MCP क्लायंट तयार केला**: जो सर्व्हरशी संवाद हाताळेल  
- **LangChain4j चा MCP समर्थन वापरला**: ज्याने LLMs आणि MCP सर्व्हरमधील इंटिग्रेशन सुलभ केला

#### Rust

हा उदाहरण तुम्ही Rust आधारित MCP सर्व्हर चालवत असल्याचा गृहित धरतो. जर तुमच्याकडे नसेल, तर [01-first-server](../01-first-server/README.md) धडा पुन्हा पहा आणि सर्व्हर तयार करा.

Rust MCP सर्व्हर झाल्यानंतर, टर्मिनल उघडा आणि सर्व्हरच्या त्याच फोल्डरमध्ये जा. खालील कमांड चालवा आणि नवीन LLM क्लायंट प्रोजेक्ट तयार करा:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```
  
`Cargo.toml` फाइलमध्ये खालील डिपेंडन्सी जोडा:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```
  
> [!NOTE]  
> OpenAI साठी अधिकृत Rust लायब्ररी नाही, पण `async-openai` क्रेट ही एक [समुदायाने राखलेली लायब्ररी](https://platform.openai.com/docs/libraries/rust#rust) आहे जी सामान्यतः वापरली जाते.

`src/main.rs` फाइल उघडा आणि त्यातील सामग्री खालील कोडने बदलाः

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

    // OpenAI क्लायंट सेटअप करा
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // MCP क्लायंट सेटअप करा
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

    // TODO: MCP टूल यादी मिळवा

    // TODO: टूल कॉल्ससह LLM संभाषण

    Ok(())
}
```
  
हा कोड एक मूलभूत Rust अॅप्लिकेशन तयार करतो जे MCP सर्व्हर आणि GitHub Models शी LLM संवादासाठी कनेक्ट होईल.

> [!IMPORTANT]  
> अॅप्लिकेशन चालवण्यापूर्वी `OPENAI_API_KEY` पर्यावरण चल मध्ये तुमचा GitHub टोकन सेट करा.

चांगले, पुढील पायरीसाठी सर्व्हरवरील क्षमता यादी करूया.

### -2- सर्व्हर क्षमतांची यादी करा

आता आपण सर्व्हरशी कनेक्ट होऊन त्याच्या क्षमतांची विचारणा करू:

#### TypeScript

त्याच वर्गात खालील पद्धती जोडा:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // उपकरणे यादी करीत आहे
    const toolsResult = await this.client.listTools();
}
```
  
आधीच्या कोडमध्ये आपण:

- सर्व्हरशी कनेक्ट होण्यासाठी `connectToServer` पद्धत जोडली  
- `run` पद्धत तयार केली जी आमच्या अॅप प्रवाहाचे नियंत्रण करते. आतापर्यंत फक्त टूल्स यादी केली आहेत पण लवकरच अधिक जोडणार आहोत.

#### Python

```python
# उपलब्ध संसाधने यादी करा
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# उपलब्ध साधने यादी करा
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```
  
येथे आपण दिले आहे:

- संसाधने आणि टूल्सची यादी केली आणि मुद्रित केली. टूल्ससाठी आम्ही `inputSchema` देखील यादी करतो जे पुढे वापरू.

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
  
आधीच्या कोडमध्ये आपण:

- MCP सर्व्हरवरील उपलब्ध टूल्सची यादी केली  
- प्रत्येक टूलसाठी नाव, वर्णन आणि त्याचा स्कीमा यादी केला जो नंतर टूल कॉलमध्ये वापरू.

#### Java

```java
// एक टूल प्रदाता तयार करा जो आपोआप MCP टूल्स शोधतो
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP टूल प्रदाता आपोआप हाताळतो:
// - MCP सर्व्हरवरून उपलब्ध टूल्सची यादी तयार करणे
// - MCP टूल स्कीमांना LangChain4j फॉरमॅटमध्ये रूपांतरित करणे
// - टूलचे कार्यान्वयन आणि प्रतिसाद यांचे व्यवस्थापन करणे
```
  
आधीच्या कोडमध्ये आपण:

- सर्व टूल्स MCP सर्व्हरवरून आपोआप शोधून नोंदणी करणारा `McpToolProvider` तयार केला  
- टूल प्रोव्हायडर MCP टूल स्कीम्स आणि LangChain4j च्या टूल स्वरूपामधील रूपांतर हाताळतो  
- हा दृष्टिकोन मॅन्युअल टूल यादी व रूपांतर प्रक्रियेपासून मुक्त करतो

#### Rust

MCP सर्व्हरकडून टूल्स घेण्यासाठी `list_tools` पद्धत वापरली जाते. `main` फंक्शनमध्ये, MCP क्लायंटसेटअप नंतर खालील कोड जोडा:

```rust
// MCP टूल सूची मिळवा
let tools = mcp_client.list_tools(Default::default()).await?;
```
  
### -3- सर्व्हर क्षमता LLM टूल्समध्ये रूपांतर करा

सर्व्हर क्षमतांची यादी केल्यानंतर पुढचा टप्पा म्हणजे त्यांना LLM समजेल अशा स्वरूपात रूपांतर करणे. जेव्हा हे होईल, तेव्हा आपण ही क्षमता LLM च्या टूल्ससाठी प्रदान करू शकता.

#### TypeScript

1. MCP सर्व्हरमधून आलेल्या प्रतिसादाला LLM वापरू शकतील अशा टूल स्वरूपात रूपांतर करण्यासाठी खालील कोड जोडा:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // इनपुट_स्कीमाच्या आधारावर झोड स्कीमा तयार करा
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // प्रकार स्पष्टपणे "function" असा सेट करा
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
  
वरील कोड MCP सर्व्हरचा प्रतिसाद घेऊन LLM समजेल अशा टूल परिभाषा स्वरूपात रूपांतरित करतो.

2. `run` पद्धती अपडेट करा आणि सर्व्हरच्या क्षमतांची यादी करा:

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
  
आधीच्या कोडमध्ये, आपण `run` पद्धत अपडेट केली आहे ज्यात प्रत्येक एन्ट्रीवर `openAiToolAdapter` कॉल केला आहे.

#### Python

1. प्रथम, पुढील कन्व्हर्टर फंक्शन तयार करा:

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
  
`convert_to_llm_tools` फंक्शनमध्ये आम्ही MCP टूल प्रतिसाद घेऊन LLM समजणाऱ्या स्वरूपात रूपांतरित करतो.

2. नंतर क्लायंट कोड या फंक्शनचा उपयोग करेल असे अपडेट करा:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```
  
इथे आम्ही MCP टूल प्रतिसाद रूपांतरासाठी `convert_to_llm_tool` कॉल जोडतो ज्याला नंतर LLM कडे पाठवू.

#### .NET

1. MCP टूल प्रतिसाद रूपांतर करण्यासाठी खालील कोड जोडा:

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
  
आधीच्या कोडमध्ये आपण:

- `ConvertFrom` फंक्शन तयार केले ज्यात नाव, वर्णन आणि इनपुट स्कीमा घेतली आहे  
- एक `FunctionDefinition` तयार केले ज्याला `ChatCompletionsDefinition` कडे पास केले जाते. हे LLM ला समजते.

2. या फंक्शनचा वापर कसा करायचा ते पहा:

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
// निसर्गभाषेतील संवादासाठी बॉट इंटरफेस तयार करा
public interface Bot {
    String chat(String prompt);
}

// LLM आणि MCP साधनांसह AI सेवा कॉन्फिगर करा
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```
  
आधीच्या कोडमध्ये आपण:

- नैसर्गिक भाषेत संवादासाठी साधी `Bot` इंटरफेस परिभाषित केली आहे  
- LangChain4j चा `AiServices` वापरून LLM आणि MCP टूल प्रोव्हायडर आपोआप जोडले  
- फ्रेमवर्क स्वयंचलितपणे टूल स्कीमा रूपांतरण आणि फंक्शन कॉलिंग हाताळतो  
- मॅन्युअल टूल रूपांतरण टाळले - LangChain4j सर्व जटिलता हाताळतो

#### Rust

MCP टूल प्रतिसाद LLM समजेल अशा स्वरूपात रूपांतर करण्यासाठी सहाय्यक फंक्शन जोडा जे टूल्सची यादी योग्य स्वरूपात बनवेल. `main` फंक्शनखालोखाल या कोडला `main.rs` मध्ये जोडा:

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
  
चांगले, आम्ही आता वापरकर्त्याच्या विनंती हाताळण्यासाठी तयार आहोत.

### -4- वापरकर्त्याचा प्रॉम्प्ट विनंती हाताळा

या भागात, आपण वापरकर्त्यांच्या विनंत्या हाताळणार आहोत.

#### TypeScript

1. LLM कॉल करण्यासाठी एक पद्धत जोडा:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // २. सर्व्हरचे टूल कॉल करा
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // ३. निकालासह काहीतरी करा
        // करायचे आहे

        }
    }
    ```
  
आधीच्या कोडमध्ये आम्ही:

- `callTools` नावाची पद्धत जोडली  
- ही पद्धत LLM प्रतिसाद तपासते की कोणती टूल्स कॉल झाल्या आहेत:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // साधन कॉल करा
        }
        ```
  
- LLMने सूचविल्यास टूल कॉल करते:

        ```typescript
        // 2. सर्व्हरच्या साधनाला कॉल करा
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. निकालासोबत काहीतरी करा
        // करायचे आहे
        ```
  
2. `run` पद्धत अपडेट करा ज्यात LLM कॉल आणि `callTools` वापर समाविष्ट आहे:

    ```typescript

    // 1. LLM साठी इनपुट असलेले संदेश तयार करा
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. LLM ला कॉल करणे
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. LLM प्रतिसाद पाहा, प्रत्येक पर्यायासाठी तपासा की त्यात टूल कॉल्स आहेत का
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```
  
चांगले, संपूर्ण कोड बघूया:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // स्कीमा पडताळणीसाठी zod आयात करा

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // भविष्यात या URL मध्ये बदल करावा लागू शकतो: https://models.github.ai/inference
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
          // input_schema वर आधारित zod स्कीमा तयार करा
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // स्पष्टपणे प्रकार "function" सेट करा
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
    
    
          // 2. सर्व्हरचे टूल कॉल करा
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. निकालासह काहीतरी करा
          // करायचे आहे
    
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
    
        // 3. LLM प्रतिसादावर जा, प्रत्येक पर्यायासाठी तपासा की त्यात टूल कॉल आहेत का
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

1. LLM कॉल करण्यासाठी आवश्यक आयात जोडा:

    ```python
    # ललम
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```
  
2. नंतर LLM कॉल करेल असा फंक्शन जोडा:

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
            # ऐच्छिक पॅरामीटर्स
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
  
आधीच्या कोडमध्ये:

- MCP सर्व्हरवरील फंक्शन्स जे रूपांतरित केलेत ते LLM कडे दिले  
- LLM कॉल केला  
- निकाल तपासला की कोणते फंक्शन्स कॉल करायचे  
- कॉल करावयाच्या फंक्शन्सची यादी दिली

3. शेवटचा टप्पा, मुख्य कोड अपडेट करा:

    ```python
    prompt = "Add 2 to 20"

    # कोणते उपकरणे असल्यास विचारण्यासाठी LLM ला विचारा, जर कोणतीही असतील तर
    functions_to_call = call_llm(prompt, functions)

    # सुचवलेल्या फंक्शन्सना कॉल करा
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```
  
कोडमध्ये, आम्ही:

- LLM प्रॉम्प्टवरून LLMने सूचवलेली MCP टूल कॉल करतो (`call_tool` वापरून)  
- टूल कॉलचा निकाल MCP सर्व्हरवर मुद्रित करतो

#### .NET

1. LLM प्रॉम्प्ट विनंतीसाठी कोड:

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
  
आधीच्या कोडमध्ये:

- MCP सर्व्हरवरून टूल्स घेतली (`var tools = await GetMcpTools()`)  
- वापरकर्त्याचा प्रॉम्प्ट `userMessage` परिभाषित केला  
- मॉडेल आणि टूल्ससाठी पर्याय ऑब्जेक्ट तयार केले  
- LLM कडे विनंती पाठवली

2. शेवटचा टप्पा, LLM कडून फंक्शन कॉल तपासा:

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
  
आधीच्या कोडमध्ये:

- फंक्शन कॉल्स लूप केली
- प्रत्येक टूल कॉलसाठी नाव व आर्ग्युमेंट्स पार्स करुन MCP सर्व्हरवर कॉल केला, निकाल मुद्रित केला

संपूर्ण कोड:

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
    // नैसर्गिक भाषा विनंत्या चालवा ज्या स्वयंचलितपणे MCP साधने वापरतात
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
  
आधीच्या कोडमध्ये आपण:

- सोप्या नैसर्गिक भाषेतील प्रॉम्प्ट वापरून MCP टूल्सशी संवाद साधला  
- LangChain4j फ्रेमवर्क स्वयंचलितपणे हाताळतो:  
  - आवश्यकतेनुसार वापरकर्त्याचे प्रॉम्प्ट टूल कॉलमध्ये रूपांतर  
  - LLM निर्णयानुसार योग्य MCP टूल्स कॉल करणे  
  - LLM आणि MCP सर्व्हरमधील संवाद व्यवस्थापन  
- `bot.chat()` मेथड वापरकर्त्याला नैसर्गिक भाषेत प्रतिसाद देते ज्यात MCP टूल्स चा निकाल समाविष्ट असू शकतो  
- यामुळे वापरकर्त्याला MCP अंतर्गत रचना माहित नसतानाही सहज अनुभव मिळतो

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

इथे बहुतेक काम होते. आम्ही पहिल्यांदा वापरकर्त्याचा प्रॉम्प्ट घेऊन LLM कॉल करू, नंतर प्रतिसाद तपासू की कोणते टूल्स कॉल करायचे आहेत का. असल्यास, ती टूल्स कॉल करू आणि पुन्हा LLM बरोबर संवाद सुरू ठेवू जोपर्यंत टूल कॉल्स संपत नाहीत आणि अंतिम प्रतिसाद मिळत नाही.

अनेक LLM कॉल करायचे आहेत, म्हणून येथे एक फंक्शन तयार करा जे LLM कॉल हँडल करेल. खालील फंक्शन `main.rs` मध्ये जोडा:

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
  
हे फंक्शन LLM क्लायंट, मेसेजेसची यादी (वापरकर्त्याचा प्रॉम्प्टसहित), MCP सर्व्हरचे टूल्स घेते, LLM कडे विनंती पाठवते आणि प्रतिसाद परत करते.
LLM कडून मिळालेला प्रतिसाद `choices` या array मध्ये असेल. आपल्याला निकाल प्रक्रियेत पाहावे लागेल की कोणते `tool_calls` आहेत का. यामुळे आपल्याला समजेल की LLM विशिष्ट tool काही arguments सोबत कॉल करण्याचा आग्रह करत आहे. LLM प्रतिसाद हाताळण्यासाठी खालील कोड आपला `main.rs` फाइलच्या तळाशी जोडा:

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

    // सामग्री उपलब्ध असल्यास मुद्रित करा
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // टूल कॉल्स हाताळा
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // सहाय्यक संदेश जोडा

        // प्रत्येक टूल कॉल चालवा
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // संदेशांमध्ये टूल परिणाम जोडा
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // टूल परिणामांसह संभाषण सुरू ठेवा
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

जर `tool_calls` उपस्थित असतील, तर ते tool ची माहिती काढते, MCP सर्व्हरशी tool विनंतीसह कॉल करते, आणि निकाल संभाषण संदेशांमध्ये जोडते. त्यानंतर LLM सोबत संभाषण सुरू ठेवते आणि संदेश सहायकाच्या प्रतिसाद आणि tool call निकालांनी अपडेट होतात.

MCP कॉलसाठी LLM परत केलेल्या tool call माहिती मिळविण्यासाठी, आणखी एक हेल्पर फंक्शन जोडू जे कॉलसाठी आवश्यक सर्व काही काढेल. खालील कोड आपला `main.rs` फाइलच्या तळाशी जोडा:

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

सर्व भाग जागतिकरित्या ठेवलेत, आता आपण प्रारंभिक वापरकर्त्याचा प्रॉम्प्ट हाताळू आणि LLM कॉल करू. आपला `main` फंक्शन खालील कोडसह अपडेट करा:

```rust
// टूल कॉलसह LLM संभाषण
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

हे प्रारंभिक वापरकर्त्याच्या प्रॉम्प्टसह LLM ला क्वेरी करेल ज्यात दोन संख्यांचा बेरीज विचारला आहे, आणि प्रतिसाद प्रक्रियेत tool calls डायनामिकली हाताळेल.

छान, तुम्ही यशस्वी झाला!

## असाइनमेंट

सरावातील कोड घेऊन सर्व्हरमध्ये आणखी काही tools तयार करा. नंतर LLM सह client तयार करा, सरावातसारखेच, आणि वेगवेगळ्या प्रॉम्प्टसह तपासा की आपले सर्व्हर tools डायनामिकली कॉल होत आहेत की नाहीत. अशी client बांधणी वापरकर्त्यांना उत्कृष्ट अनुभव देते कारण ते अचूक client कमांड ऐवजी प्रॉम्प्ट वापरून सहज वापर करू शकतात आणि कोणताही MCP सर्व्हर कॉल होत असल्याचे लक्षात येत नाही.

## सोल्युशन

[Solution](./solution/README.md)

## मुख्य मुद्दे

- LLM आपल्या client मध्ये जोडल्यावर वापरकर्त्यांना MCP सर्व्हरशी संवाद साधण्याचा चांगला मार्ग मिळतो.
- MCP सर्व्हर प्रतिसाद LLM समजेल अशा स्वरूपात रूपांतरित करणे आवश्यक असते.

## नमुने

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)
- [Rust Calculator](../../../../03-GettingStarted/samples/rust)

## अतिरिक्त स्रोत

## पुढे काय

- पुढील: [Visual Studio Code वापरून सर्व्हर कसे वापरावे](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->