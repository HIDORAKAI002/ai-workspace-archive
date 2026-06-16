# ایل ایل ایم کے ساتھ کلائنٹ بنانا

اب تک، آپ نے دیکھا ہے کہ کس طرح سرور اور کلائنٹ بنایا جاتا ہے۔ کلائنٹ سرور کو واضح طور پر کال کر سکتا ہے تاکہ اس کے ٹولز، وسائل، اور پرامپٹس کی فہرست دی جا سکے۔ تاہم، یہ ایک بہت عملی طریقہ کار نہیں ہے۔ آپ کے صارفین آج کے دور میں ہوتے ہیں جہاں وہ پرامپٹس استعمال کرنے اور ایل ایل ایم کے ساتھ بات چیت کرنے کی توقع رکھتے ہیں۔ انہیں اس بات سے فرق نہیں پڑتا کہ آپ اپنی صلاحیتوں کو ذخیرہ کرنے کے لیے MCP استعمال کرتے ہیں یا نہیں؛ وہ صرف قدرتی زبان کے ذریعے بات چیت کرنے کی توقع رکھتے ہیں۔ تو ہم اسے کیسے حل کریں؟ حل یہ ہے کہ کلائنٹ میں ایک ایل ایل ایم شامل کیا جائے۔

## جائزہ

اس سبق میں ہم اپنے کلائنٹ میں ایل ایل ایم شامل کرنے پر توجہ دیں گے اور دیکھائیں گے کہ یہ آپ کے صارف کے لیے بہت بہتر تجربہ کیسے فراہم کرتا ہے۔

## سیکھنے کے نتائج

اس سبق کے اختتام تک، آپ کر سکیں گے:

- ایل ایل ایم کے ساتھ ایک کلائنٹ بنائیں۔
- ایل ایل ایم کا استعمال کرتے ہوئے MCP سرور کے ساتھ بلا تعطل بات چیت کریں۔
- کلائنٹ کی جانب بہتر اختتامی صارف کا تجربہ فراہم کریں۔

## طریقہ کار

آئیے سمجھتے ہیں کہ ہمیں کون سا طریقہ اختیار کرنا ہے۔ ایل ایل ایم شامل کرنا آسان لگتا ہے، لیکن کیا ہم واقعی ایسا کریں گے؟

کلائنٹ سرور کے ساتھ اس طرح بات چیت کرے گا:

1. سرور کے ساتھ کنکشن قائم کریں۔

2. صلاحیتیں، پرامپٹس، وسائل اور ٹولز کی فہرست بنائیں، اور ان کا سکیمہ محفوظ کریں۔

3. ایک ایل ایل ایم شامل کریں اور محفوظ کردہ صلاحیتوں اور ان کے سکیمے کو ایک ایسے فارمیٹ میں منتقل کریں جسے ایل ایل ایم سمجھ سکے۔

4. صارف کے پرامپٹ کو ایل ایل ایم کو بھیج کر، کلائنٹ کی جانب سے فہرست کردہ ٹولز کے ساتھ ہینڈل کریں۔

زبردست، اب جب کہ ہم سمجھ گئے کہ ہم اسے اعلی سطح پر کیسے کر سکتے ہیں، آئیے نیچے مشق میں اسے آزمائیں۔

## مشق: ایل ایل ایم کے ساتھ کلائنٹ بنانا

اس مشق میں، ہم اپنے کلائنٹ میں ایل ایل ایم شامل کرنا سیکھیں گے۔

### گٹ ہب پرسنل ایکسیس ٹوکن کے ذریعے تصدیق

گٹ ہب ٹوکن بنانا ایک آسان عمل ہے۔ آپ ایسا کر سکتے ہیں:

- گٹ ہب کی ترتیبات پر جائیں – اوپر دائیں کونے میں اپنی پروفائل تصویر پر کلک کریں اور Settings منتخب کریں۔
- Developer Settings پر جائیں – نیچے سکرول کریں اور Developer Settings پر کلک کریں۔
- Personal Access Tokens منتخب کریں – Fine-grained tokens پر کلک کریں اور پھر Generate new token کو منتخب کریں۔
- اپنا ٹوکن ترتیب دیں – ریفرنس کے لیے ایک نوٹ شامل کریں، میعاد ختم ہونے کی تاریخ مقرر کریں، اور ضروری اسکوبز (اجازتیں) منتخب کریں۔ اس صورت میں Models اجازت شامل کرنا یقینی بنائیں۔
- ٹوکن جنریٹ اور کاپی کریں – Generate token پر کلک کریں، اور اسے فوراً کاپی کر لیں، کیونکہ آپ اسے دوبارہ نہیں دیکھ پائیں گے۔

### -1- سرور سے کنیکٹ کریں

سب سے پہلے اپنے کلائنٹ کو بنائیں:

#### ٹائپ اسکرپٹ

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // سکیمہ کی توثیق کے لیے zod درآمد کریں

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
  
پچھلے کوڈ میں ہم نے:

- ضروری لائبریریز امپورٹ کیں
- ایک کلاس بنائی جس کے دو ممبرز ہیں، `client` اور `openai`، جو بالترتیب کلائنٹ کو منظم کرنے اور ایل ایل ایم کے ساتھ بات چیت کرنے میں ہماری مدد کریں گے۔
- اپنے ایل ایل ایم انسٹینس کو GitHub ماڈلز استعمال کرنے کے لیے کنفیگر کیا، `baseUrl` کو inference API کی طرف سیٹ کرکے۔

#### پائتھون

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# اسٹڈییو کنکشن کے لیے سرور کے پیرامیٹرز بنائیں
server_params = StdioServerParameters(
    command="mcp",  # قابلِ عمل
    args=["run", "server.py"],  # اختیاری کمانڈ لائن دلائل
    env=None,  # اختیاری ماحولیاتی متغیرات
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # کنکشن کو شروع کریں
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```
  
پچھلے کوڈ میں ہم نے:

- MCP کے لیے ضروری لائبریریز امپورٹ کیں
- ایک کلائنٹ بنایا

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
  
#### جاوا

سب سے پہلے، آپ کو اپنے `pom.xml` فائل میں LangChain4j کی dependencies شامل کرنی ہوں گی۔ MCP انٹیگریشن اور GitHub ماڈلز کی حمایت کے لیے یہ dependencies شامل کریں:

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
  
پھر اپنی جاوا کلائنٹ کلاس بنائیں:

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
    
    public static void main(String[] args) throws Exception {        // GitHub ماڈلز استعمال کرنے کے لئے LLM کی ترتیب دیں
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // سرور سے جڑنے کے لئے MCP ٹرانسپورٹ بنائیں
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // MCP کلائنٹ بنائیں
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```
  
پچھلے کوڈ میں ہم نے:

- **LangChain4j dependencies شامل کیں**: MCP انٹیگریشن، OpenAI آفیشل کلائنٹ، اور GitHub ماڈلز کی حمایت کے لیے ضروری  
- **LangChain4j لائبریریز امپورٹ کیں**: MCP انٹیگریشن اور OpenAI چیٹ ماڈل کی فعالیت کے لیے  
- **`ChatLanguageModel` بنایا**: GitHub ماڈلز کو آپ کے گٹ ہب ٹوکن کے ساتھ استعمال کرنے کے لیے کنفیگر کیا  
- **HTTP ٹرانسپورٹ سیٹ اپ کیا**: Server-Sent Events (SSE) استعمال کرتے ہوئے MCP سرور سے کنیکٹ کرنے کے لیے  
- **MCP کلائنٹ بنایا**: جو سرور کے ساتھ کمیونیکیشن سنبھالے گا  
- **LangChain4j کا بلٹ ان MCP سپورٹ استعمال کیا**: جو ایل ایل ایمز اور MCP سرورز کے درمیان انٹیگریشن کو آسان بناتا ہے  

#### رسٹ

یہ مثال فرض کرتی ہے کہ آپ کے پاس رسٹ پر مبنی MCP سرور چل رہا ہے۔ اگر آپ کے پاس نہیں ہے، تو [01-first-server](../01-first-server/README.md) سبق دیکھیں تاکہ سرور بنائیں۔

ایک بار جب آپ کا رسٹ MCP سرور تیار ہو جائے، ایک ٹرمینل کھولیں اور سرور کی ڈائریکٹری میں جائیں۔ پھر نیا LLM کلائنٹ پروجیکٹ بنانے کے لیے یہ کمانڈ چلائیں:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```
  
اپنی `Cargo.toml` فائل میں درج ذیل dependencies شامل کریں:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```
  
> [!NOTE]  
> OpenAI کے لیے کوئی آفیشل رسٹ لائبریری نہیں ہے، تاہم، `async-openai` crate ایک [کمیونٹی کے ذریعے معاونت یافتہ لائبریری](https://platform.openai.com/docs/libraries/rust#rust) ہے جو عام طور پر استعمال ہوتی ہے۔

`src/main.rs` فائل کھولیں اور اس کا مواد مندرجہ ذیل کوڈ سے بدل دیں:

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
    // ابتدائی پیغام
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // OpenAI کلائنٹ ترتیب دیں
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // MCP کلائنٹ ترتیب دیں
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

    // TODO: MCP ٹول کی فہرست حاصل کریں

    // TODO: ٹول کالز کے ساتھ LLM کی گفتگو

    Ok(())
}
```
  
یہ کوڈ ایک بنیادی رسٹ ایپلیکیشن تیار کرتا ہے جو MCP سرور اور ایل ایل ایم تعاملات کے لیے GitHub ماڈلز سے جُڑتا ہے۔

> [!IMPORTANT]  
> درخواست چلانے سے پہلے اپنے گٹ ہب ٹوکن کے ساتھ `OPENAI_API_KEY` انوائرنمنٹ ویریبل سیٹ کرنا یقینی بنائیں۔

زبردست، اگلے مرحلے کے لیے، آئیے سرور کی صلاحیتوں کی فہرست بنائیں۔

### -2- سرور کی صلاحیتیں فہرست بنائیں

اب ہم سرور سے کنیکٹ کریں گے اور اس کی صلاحیتوں کے بارے میں پوچھیں گے:

#### ٹائپ اسکرپٹ

اسی کلاس میں درج ذیل طریقے شامل کریں:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // آلات کی فہرست بندی
    const toolsResult = await this.client.listTools();
}
```
  
پچھلے کوڈ میں ہم نے:

- سرور سے کنیکٹ کرنے کے لیے کوڈ شامل کیا، `connectToServer`۔  
- ایک `run` میتھڈ بنایا جو ایپ کے فلو کو ہینڈل کرتا ہے۔ اب تک یہ صرف ٹولز کی فہرست دیتا ہے، لیکن ہم جلد مزید شامل کریں گے۔  

#### پائتھون

```python
# دستیاب وسائل کی فہرست بنائیں
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# دستیاب آلات کی فہرست بنائیں
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```
  
ہم نے یہ شامل کیا:

- وسائل اور ٹولز کی فہرست نکالی اور پرنٹ کی۔ ٹولز کے لیے ہم `inputSchema` بھی فہرست کرتے ہیں جو بعد میں استعمال کریں گے۔

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
  
پچھلے کوڈ میں ہم نے:

- MCP سرور پر دستیاب ٹولز کی فہرست بنائی  
- ہر ٹول کے نام، تفصیل، اور اس کا سکیمہ لیا۔ سکیمہ وہ چیز ہے جسے ہم جلد ٹولز کو کال کرنے کے لیے استعمال کریں گے۔  

#### جاوا

```java
// ایک ٹول فراہم کنندہ بنائیں جو خودکار طریقے سے MCP ٹولز کو دریافت کرے
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP ٹول فراہم کنندہ خود بخود سنبھالتا ہے:
// - MCP سرور سے دستیاب ٹولز کی فہرست تیار کرنا
// - MCP ٹول اسکیموں کو LangChain4j فارمیٹ میں تبدیل کرنا
// - ٹول کی عمل درآمد اور جوابات کا انتظام کرنا
```
  
پچھلے کوڈ میں ہم نے:

- `McpToolProvider` بنایا جو خودکار طور پر MCP سرور سے تمام ٹولز دریافت اور رجسٹر کرتا ہے  
- ٹول پرووائیڈر اندرونی طور پر MCP ٹول سکیموں کو LangChain4j کے ٹول فارمیٹ میں تبدیل کرتا ہے  
- اس طریقہ کار سے دستی ٹول فہرست سازی اور تبدیلی کا عمل ختم ہو جاتا ہے  

#### رسٹ

MCP سرور سے ٹولز حاصل کرنا `list_tools` طریقہ استعمال کرتے ہوئے کیا جاتا ہے۔ `main` فنکشن میں، MCP کلائنٹ سیٹ اپ کرنے کے بعد، درج ذیل کوڈ شامل کریں:

```rust
// MCP ٹول کی فہرست حاصل کریں
let tools = mcp_client.list_tools(Default::default()).await?;
```
  
### -3- سرور کی صلاحیتوں کو ایل ایل ایم ٹولز میں تبدیل کریں

سرور کی صلاحیتوں کی فہرست بنانے کے بعد اگلا قدم انہیں ایسے فارمیٹ میں تبدیل کرنا ہے جو ایل ایل ایم سمجھتا ہو۔ ایک بار ایسا کر لیا تو ہم یہ صلاحیتیں اپنے ایل ایل ایم کے ٹولز کے طور پر فراہم کر سکتے ہیں۔

#### ٹائپ اسکرپٹ

1. MCP سرور سے حاصل ردعمل کو ایل ایل ایم استعمال کر سکنے والے ٹول فارمیٹ میں تبدیل کرنے کے لیے درج ذیل کوڈ شامل کریں:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // ان پٹ_سکیما کی بنیاد پر ایک زوڈ اسکیمہ بنائیں
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // ٹائپ کو واضح طور پر "فنکشن" مقرر کریں
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
  
اوپر والا کوڈ MCP سرور سے جواب لیتا ہے اور اسے ایسے ٹول کی تعریف میں بدلتا ہے جو ایل ایل ایم سمجھ سکتا ہے۔

2. اب `run` میتھڈ کو اپ ڈیٹ کریں تاکہ سرور کی صلاحیتوں کی فہرست شامل کی جا سکے:

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
  
پچھلے کوڈ میں، ہم نے `run` میتھڈ کو اپ ڈیٹ کیا جو نتیجے میں سے ہر انٹری پر `openAiToolAdapter` کال کرتا ہے۔

#### پائتھون

1. پہلے، درج ذیل کنورٹر فنکشن بنائیں:

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
  
اس فنکشن `convert_to_llm_tools` میں ہم MCP ٹول کا جواب لیتے ہیں اور اسے ایسے فارمیٹ میں تبدیل کرتے ہیں جو ایل ایل ایم سمجھ سکے۔

2. اب اپنے کلائنٹ کوڈ کو اس فنکشن کے استعمال کے لیے اپ ڈیٹ کریں جیسا کہ:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```
  
یہاں ہم `convert_to_llm_tool` کو کال کر رہے ہیں تاکہ MCP ٹول کے جواب کو بعد میں ایل ایل ایم کو دیا جا سکے۔

#### .NET

1. MCP ٹول کے جواب کو ایل ایل ایم سمجھنے کے قابل بنانے کے لیے درج ذیل کوڈ شامل کریں:

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
  
پچھلے کوڈ میں ہم نے:

- ایک `ConvertFrom` فنکشن بنایا جو نام، تفصیل اور انپٹ سکیمہ لیتا ہے۔  
- فنکشن ڈیفینیشن بنائی جو ChatCompletionsDefinition میں پاس ہوتی ہے، جو ایل ایل ایم سمجھتا ہے۔  

2. آئیے دیکھتے ہیں کہ ہم موجودہ کوڈ کو اس فنکشن کے فائدے کے لیے کیسے اپ ڈیٹ کر سکتے ہیں:

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

  
#### جاوا

```java
// قدرتی زبان کے تعامل کے لیے بوٹ انٹرفیس بنائیں
public interface Bot {
    String chat(String prompt);
}

// AI سروس کو LLM اور MCP ٹولز کے ساتھ ترتیب دیں
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```
  
پچھلے کوڈ میں ہم نے:

- نیچرل لینگویج بات چیت کے لیے سادہ `Bot` انٹرفیس بنایا  
- LangChain4j کے `AiServices` استعمال کیے تاکہ ایل ایل ایم خودکار طور پر MCP ٹول پرووائیڈر کے ساتھ جُڑ جائے  
- فریم ورک خودکار طور پر ٹول سکیمہ کنورژن اور فنکشن کالنگ کو ہینڈل کرتا ہے  
- اس طریقہ کار سے دستی ٹول کنورژن کی ضرورت ختم ہو جاتی ہے – LangChain4j MCP ٹولز کو ایل ایل ایم-مطابق فارمیٹ میں تبدیل کرنے کی تمام پیچیدگیاں سنبھالتا ہے  

#### رسٹ

MCP ٹول کے جواب کو ایسے فارمیٹ میں تبدیل کرنے کے لیے جسے ایل ایل ایم سمجھ سکے، ہم ایک ہیلپر فنکشن شامل کریں گے جو ٹولز کی فہرست کو فارمیٹ کرے گا۔ `main.rs` میں `main` فنکشن کے نیچے یہ کوڈ شامل کریں۔ یہ ایل ایل ایم کو درخواست بھیجتے وقت کال ہوگا:

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
  
زبردست، اب ہم صارف کی درخواستیں ہینڈل کرنے کے لیے تیار ہیں، تو آئیے اگلے حصے پر چلتے ہیں۔

### -4- صارف کے پرامپٹ کی درخواست ہینڈل کریں

اس حصے میں ہم صارف کی درخواستیں سنبھالیں گے۔

#### ٹائپ اسکرپٹ

1. ایک میتھڈ شامل کریں جو ہمارے ایل ایل ایم کو کال کرے گا:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2۔ سرور کے آلے کو کال کریں
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3۔ نتیجہ کے ساتھ کچھ کریں
        // کرنے والا

        }
    }
    ```
  
پچھلے کوڈ میں ہم نے:

- `callTools` میتھڈ شامل کیا۔  
- یہ میتھڈ ایل ایل ایم کے جواب کو لیتا ہے اور چیک کرتا ہے کہ کون سے ٹولز کال کیے گئے ہیں، اگر کوئی ہیں:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // آلے کو کال کریں
        }
        ```
  
- اگر ایل ایل ایم نے کوئی ٹول کال کرنے کا اشارہ دیا تو وہ ٹول کال کی جاتی ہے:

        ```typescript
        // ۲۔ سرور کے آلے کو کال کریں
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // ۳۔ نتیجہ کے ساتھ کچھ کریں
        // کرنے والا کام
        ```
  
2. `run` میتھڈ کو اپ ڈیٹ کریں تاکہ ایل ایل ایم کو کال کیا جا سکے اور `callTools` کو چلایا جا سکے:

    ```typescript

    // 1۔ پیغامات بنائیں جو LLM کے لیے ان پٹ ہوں
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2۔ LLM کو کال کرنا
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3۔ LLM کے جواب کا جائزہ لیں، ہر انتخاب کے لیے چیک کریں کہ آیا اس میں ٹول کالز ہیں یا نہیں
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```
  
زبردست، پورا کوڈ دیکھیں:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // اسکیمہ ویلیڈیشن کے لیے زوڈ درآمد کریں

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // مستقبل میں اس یو آر ایل کو تبدیل کرنے کی ضرورت پڑ سکتی ہے: https://models.github.ai/inference
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
          // ان پٹ_اسکیمہ کی بنیاد پر زوڈ اسکیمہ بنائیں
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // قسم کو واضح طور پر "فنکشن" پر سیٹ کریں
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
    
    
          // 2۔ سرور کے ٹول کو کال کریں
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3۔ نتیجے کے ساتھ کچھ کریں
          // کرنا ہے
    
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
    
        // 3۔ LLM جواب کے ذریعے جائیں، ہر انتخاب کے لیے چیک کریں کہ آیا اس میں ٹول کالز ہیں یا نہیں
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
  
#### پائتھون

1. ایل ایل ایم کو کال کرنے کے لیے ضروری امپورٹس شامل کریں:

    ```python
    # ایل ایل ایم
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```
  
2. پھر وہ فنکشن شامل کریں جو ایل ایل ایم کو کال کرے گا:

    ```python
    # ایل ایل ایم

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
            # اختیاری پیرامیٹرز
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
  
پچھلے کوڈ میں ہم نے:

- MCP سرور سے ملے فنکشنز کو ایل ایل ایم کو پاس کیا جو ہم نے کنورٹ کیے ہیں۔  
- پھر ایل ایل ایم کو ان فنکشنز کے ساتھ کال کیا۔  
- نتیجہ کا معائنہ کیا کہ کون سے فنکشنز کال ہونے چاہئیں۔  
- آخر میں، کال کرنے کے لیے فنکشنز کی ایک اررے پاس کی۔  

3. آخری مرحلہ، اپنے مین کوڈ کو اپ ڈیٹ کریں:

    ```python
    prompt = "Add 2 to 20"

    # اگر کوئی ہو تو، LLM سے پوچھیں کہ کون سے ٹولز فراہم کرنے ہیں
    functions_to_call = call_llm(prompt, functions)

    # تجویز کردہ فنکشنز کو کال کریں
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```
  
یہی آخری قدم تھا، اوپر کے کوڈ میں ہم:

- ایک MCP ٹول کو `call_tool` کے ذریعے کال کر رہے ہیں، جو ایل ایل ایم نے ہماری پرامپٹ کی بنیاد پر کال کرنے کا فیصلہ کیا۔  
- ٹول کال کا نتیجہ MCP سرور کو پرنٹ کر رہے ہیں۔  

#### .NET

1. ایل ایل ایم پرامپٹ درخواست کے کوڈ کا نمونہ دکھائیں:

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
  
پچھلے کوڈ میں ہم نے:

- MCP سرور سے ٹولز حاصل کیے، `var tools = await GetMcpTools()`۔  
- صارف کا پرامپٹ `userMessage` بنایا۔  
- ایک options آبجیکٹ تیار کیا جس میں ماڈل اور ٹولز کی تفصیل ہے۔  
- ایل ایل ایم کی طرف ایک درخواست کی۔  

2. آخری مرحلہ، چیک کریں کہ کیا ایل ایل ایم سوچتا ہے کہ ہمیں کوئی فنکشن کال کرنا چاہیے:

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
  
پچھلے کوڈ میں ہم نے:

- فنکشن کالز کی فہرست میں لوپ لگایا۔  
- ہر ٹول کال کے لیے نام اور دلائل نکالے اور MCP کلائنٹ کے ذریعے MCP سرور پر ٹول کال کی۔ آخر میں نتیجے پرنٹ کیے۔  

پورا کوڈ یہاں ہے:

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
  
#### جاوا

```java
try {
    // قدرتی زبان کی درخواستوں کو انجام دیں جو خود بخود MCP ٹولز کا استعمال کرتی ہیں
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
  
پچھلے کوڈ میں ہم نے:

- MCP سرور ٹولز کے ساتھ سادہ نیچرل لینگویج پرامپٹس استعمال کیے  
- LangChain4j فریم ورک خودکار طور پر ہینڈل کرتا ہے:  
  - ضرورت پڑنے پر صارف کے پرامپٹس کو ٹول کالز میں بدلنا  
  - ایل ایل ایم کے فیصلے کی بنیاد پر مناسب MCP ٹولز کو کال کرنا  
  - ایل ایل ایم اور MCP سرور کے درمیان بات چیت کے بہاؤ کو منظم کرنا  
- `bot.chat()` طریقہ نیچرل لینگویج جوابات دیتا ہے جس میں MCP ٹول کی ایگزیکوشنز کے نتائج شامل ہو سکتے ہیں  
- یہ طریقہ کار ایک ہموار صارف تجربہ فراہم کرتا ہے جہاں صارفین کو MCP کی بنیادی عمل کاری کے بارے میں جاننے کی ضرورت نہیں ہوتی  

مکمل کوڈ کی مثال:

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
  
#### رسٹ

یہاں زیادہ تر کام ہوتا ہے۔ ہم ابتدائی صارف پرامپٹ کے ساتھ ایل ایل ایم کو کال کریں گے، پھر اس کا جواب پروسیس کریں گے تاکہ دیکھیں کہ آیا کوئی ٹول کال کرنے کی ضرورت ہے۔ اگر ہاں، تو ہم وہ ٹولز کال کریں گے اور ایل ایل ایم کے ساتھ بات چیت جاری رکھیں گے جب تک کہ مزید ٹول کالز کی ضرورت نہ ہو اور ہمارے پاس حتمی جواب نہ آ جائے۔

ہم ایل ایل ایم کو متعدد بار کال کریں گے، اس لیے ایک فنکشن تعریف کرتے ہیں جو ایل ایل ایم کال کو ہینڈل کرے گا۔ درج ذیل فنکشن کو اپنے `main.rs` فائل میں شامل کریں:

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
  
یہ فنکشن ایل ایل ایم کلائنٹ، پیغامات کی فہرست (بشمول صارف پرامپٹ)، MCP سرور کے ٹولز لیتا ہے، اور ایل ایل ایم کو درخواست بھیج کر جواب لوٹاتا ہے۔
LLM کا جواب `choices` کی ایک صف پر مشتمل ہوگا۔ ہمیں نتیجہ اس بات کا جائزہ لینے کے لیے پروسیس کرنا ہوگا کہ آیا کوئی `tool_calls` موجود ہیں۔ اس سے ہمیں معلوم ہوتا ہے کہ LLM کسی مخصوص ٹول کو دلائل کے ساتھ کال کرنے کی درخواست کر رہا ہے۔ LLM کے جواب کو ہینڈل کرنے کے لیے اپنے `main.rs` فائل کے نیچے مندرجہ ذیل کوڈ شامل کریں:

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

    // مواد پرنٹ کریں اگر دستیاب ہو
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // ٹول کالز کو ہینڈل کریں
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // اسسٹنٹ کا پیغام شامل کریں

        // ہر ٹول کال کو انجام دیں
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // ٹول کے نتائج کو پیغامات میں شامل کریں
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // ٹول کے نتائج کے ساتھ گفتگو جاری رکھیں
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

اگر `tool_calls` موجود ہیں، تو یہ ٹول کی معلومات نکالتا ہے، ٹول کی درخواست کے ساتھ MCP سرور کو کال کرتا ہے، اور نتائج کو گفتگو کے پیغامات میں شامل کر دیتا ہے۔ پھر یہ LLM کے ساتھ گفتگو جاری رکھتا ہے اور پیغامات اسسٹنٹ کے جواب اور ٹول کال کے نتائج کے ساتھ اپ ڈیٹ ہوتے ہیں۔

MCP کالز کے لیے LLM کے ذریعہ واپس کیے گئے ٹول کال کی معلومات نکالنے کے لیے، ہم ایک اور مددگار فنکشن شامل کریں گے جو کال کرنے کے لیے درکار تمام معلومات نکالے گا۔ اپنے `main.rs` فائل کے نیچے مندرجہ ذیل کوڈ شامل کریں:

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

تمام حصے مکمل ہونے کے بعد، اب ہم ابتدائی یوزر پرامپٹ کو ہینڈل کر کے LLM کو کال کر سکتے ہیں۔ اپنے `main` فنکشن کو اپ ڈیٹ کریں تاکہ درج ذیل کوڈ شامل کیا جا سکے:

```rust
// ایل ایل ایم بات چیت ٹول کالز کے ساتھ
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

یہ ابتدائی یوزر پرامپٹ کے ساتھ LLM سے پوچھے گا کہ دو نمبروں کا مجموعہ کیا ہے، اور یہ ردعمل کو پروسیس کرے گا تاکہ ٹول کالز کو متحرک طور پر ہینڈل کیا جا سکے۔

زبردست، آپ نے کر دکھایا!

## اسائنمنٹ

ایکسسرسائز کا کوڈ لے کر سرور میں مزید ٹولز شامل کریں۔ پھر ایک کلائنٹ بنائیں جس میں LLM ہو، جیسا کہ ایکسسرسائز میں تھا، اور مختلف پرامپٹس کے ساتھ اسے ٹیسٹ کریں تاکہ یقینی بنایا جا سکے کہ آپ کے تمام سرور ٹولز متحرک طور پر کال ہو رہے ہیں۔ کلائنٹ بنانے کا یہ طریقہ اس بات کو یقینی بناتا ہے کہ آخر صارف کو بہترین یوزر تجربہ ملے، کیونکہ وہ درست کلائنٹ کمانڈز کے بجائے پرامپٹس استعمال کر سکیں گے اور MCP سرور کی موجودگی کا پتہ بھی نہیں چلے گا۔

## حل

[حل](./solution/README.md)

## اہم نکات

- اپنے کلائنٹ میں LLM شامل کرنا صارفین کے لیے MCP سرورز کے ساتھ بہتر تعامل فراہم کرتا ہے۔
- آپ کو MCP سرور کے جواب کو ایسی شکل میں تبدیل کرنا ہوگا جو LLM سمجھ سکے۔

## نمونے

- [جاوا کیلکولیٹر](../samples/java/calculator/README.md)
- [.Net کیلکولیٹر](../../../../03-GettingStarted/samples/csharp)
- [جاوا اسکرپٹ کیلکولیٹر](../samples/javascript/README.md)
- [ٹائپ اسکرپٹ کیلکولیٹر](../samples/typescript/README.md)
- [پائتھون کیلکولیٹر](../../../../03-GettingStarted/samples/python)
- [رسٹ کیلکولیٹر](../../../../03-GettingStarted/samples/rust)

## اضافی وسائل

## آگے کیا ہے

- اگلا: [Visual Studio Code استعمال کرتے ہوئے سرور کا استعمال](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->