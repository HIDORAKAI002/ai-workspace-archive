# ایجاد کلاینت با LLM

تاکنون، دیده‌اید چگونه یک سرور و یک کلاینت ایجاد کنید. کلاینت توانسته است به صورت صریح با سرور تماس بگیرد تا ابزارها، منابع و پرامپت‌های آن را لیست کند. با این حال، این رویکرد چندان عملی نیست. کاربران شما در عصر عاملانه زندگی می‌کنند و انتظار دارند از طریق پرامپت‌ها و گفت‌وگو با یک LLM ارتباط برقرار کنند. آن‌ها اهمیت نمی‌دهند که شما برای ذخیره قابلیت‌هایتان از MCP استفاده می‌کنید یا نه؛ آن‌ها صرفاً انتظار دارند با زبان طبیعی تعامل داشته باشند. پس چگونه این مشکل را حل کنیم؟ راه‌حل این است که یک LLM به کلاینت اضافه کنیم.

## مرور کلی

در این درس، ما بر اضافه کردن یک LLM به کلاینت تمرکز می‌کنیم و نشان می‌دهیم چگونه این کار تجربه بهتری برای کاربر شما فراهم می‌کند.

## اهداف یادگیری

تا پایان این درس، شما قادر خواهید بود:

- ایجاد کلاینت با یک LLM.
- تعامل بدون درز با یک سرور MCP با استفاده از LLM.
- ارائه تجربه بهتر برای کاربر نهایی در سمت کلاینت.

## رویکرد

بیایید درک کنیم که چه رویکردی باید اتخاذ کنیم. اضافه کردن یک LLM ساده به نظر می‌رسد، اما آیا واقعاً این کار را انجام می‌دهیم؟

نحوه تعامل کلاینت با سرور به این صورت خواهد بود:

1. برقراری اتصال با سرور.

1. لیست کردن قابلیت‌ها، پرامپت‌ها، منابع و ابزارها و ذخیره طرح‌واره (schema) آنها.

1. اضافه کردن یک LLM و ارسال قابلیت‌ها و طرح‌واره‌های ذخیره شده به شکلی که LLM بفهمد.

1. رسیدگی به پرامپت کاربر با ارسال آن به LLM همراه با ابزارهایی که کلاینت فهرست کرده است.

عالی، حالا که در سطح بالا می‌فهمیم چگونه این کار را انجام دهیم، بیایید این را در تمرین زیر امتحان کنیم.

## تمرین: ایجاد کلاینت با یک LLM

در این تمرین، یاد می‌گیریم چگونه یک LLM به کلاینت خود اضافه کنیم.

### احراز هویت با استفاده از توکن دسترسی شخصی GitHub

ایجاد یک توکن GitHub فرآیندی ساده است. روش انجام آن به شرح زیر است:

- به تنظیمات GitHub بروید – روی عکس پروفایل خود در گوشه بالا سمت راست کلیک کنید و تنظیمات را انتخاب کنید.
- به تنظیمات توسعه‌دهنده بروید – به پایین صفحه بروید و روی Developer Settings کلیک کنید.
- انتخاب توکن‌های دسترسی شخصی – روی Fine-grained tokens کلیک کنید و سپس Generate new token را انتخاب کنید.
- پیکربندی توکن خود – یک یادداشت برای مرجع اضافه کنید، تاریخ انقضا تعیین کنید و دسترسی‌های لازم را انتخاب کنید. در این مورد مطمئن شوید دسترسی Models را اضافه کرده‌اید.
- تولید و کپی توکن – روی Generate token کلیک کنید و بلافاصله آن را کپی کنید، چون دوباره نمی‌توانید آن را مشاهده کنید.

### -1- اتصال به سرور

بیایید ابتدا کلاینت خود را ایجاد کنیم:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // وارد کردن zod برای اعتبارسنجی طرحواره

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

در کد قبلی ما:

- کتابخانه‌های لازم را وارد کردیم
- کلاسی با دو عضو، `client` و `openai` ایجاد کردیم که به ترتیب به ما در مدیریت یک کلاینت و تعامل با یک LLM کمک می‌کند.
- نمونه LLM خود را برای استفاده از GitHub Models با تنظیم `baseUrl` به سمت API استنتاج پیکربندی کردیم.

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# ایجاد پارامترهای سرور برای اتصال stdio
server_params = StdioServerParameters(
    command="mcp",  # قابل اجرا
    args=["run", "server.py"],  # آرگومان‌های اختیاری خط فرمان
    env=None,  # متغیرهای محیطی اختیاری
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # مقداردهی اولیه اتصال
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

در کد قبلی ما:

- کتابخانه‌های مورد نیاز برای MCP را وارد کردیم
- یک کلاینت ساختیم

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

ابتدا باید وابستگی‌های LangChain4j را به فایل `pom.xml` خود اضافه کنید. این وابستگی‌ها را برای فعال‌سازی ادغام MCP و پشتیبانی از GitHub Models اضافه کنید:

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

سپس کلاس کلاینت جاوای خود را ایجاد کنید:

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
    
    public static void main(String[] args) throws Exception {        // پیکربندی LLM برای استفاده از مدل‌های گیت‌هاب
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // ایجاد انتقال MCP برای اتصال به سرور
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // ایجاد کلاینت MCP
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

در کد قبلی ما:

- **وابستگی‌های LangChain4j را اضافه کرده‌ایم**: که برای ادغام MCP، کلاینت رسمی OpenAI و پشتیبانی از GitHub Models لازم است
- **کتابخانه‌های LangChain4j را وارد کرده‌ایم**: برای ادغام MCP و عملکرد مدل چت OpenAI
- **یک `ChatLanguageModel` ایجاد کرده‌ایم**: که با توکن GitHub شما برای GitHub Models پیکربندی شده است
- **تنظیم حمل‌ونقل HTTP**: با استفاده از Server-Sent Events (SSE) برای اتصال به سرور MCP
- **یک کلاینت MCP ایجاد کرده‌ایم**: که ارتباط با سرور را مدیریت می‌کند
- **از پشتیبانی داخلی MCP LangChain4j استفاده کرده‌ایم**: که ادغام بین LLMها و سرورهای MCP را ساده می‌کند

#### Rust

این مثال فرض می‌کند که یک سرور MCP مبتنی بر Rust در حال اجرا دارید. اگر ندارید، به درس [01-first-server](../01-first-server/README.md) مراجعه کنید تا سرور را ایجاد کنید.

وقتی سرور Rust MCP خود را دارید، یک ترمینال باز کنید و به همان دایرکتوری سرور بروید. سپس دستور زیر را برای ایجاد یک پروژه کلاینت LLM جدید اجرا کنید:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

وابستگی‌های زیر را به فایل `Cargo.toml` خود اضافه کنید:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> هیچ کتابخانه رسمی Rust برای OpenAI وجود ندارد، اما crate `async-openai` یک [کتابخانه جامعه‌محور](https://platform.openai.com/docs/libraries/rust#rust) است که معمولاً استفاده می‌شود.

فایل `src/main.rs` را باز کنید و محتوای آن را با کد زیر جایگزین کنید:

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
    // پیام اولیه
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // راه‌اندازی کلاینت OpenAI
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // راه‌اندازی کلاینت MCP
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

    // انجام شود: دریافت لیست ابزارهای MCP

    // انجام شود: مکالمه LLM با فراخوانی ابزارها

    Ok(())
}
```

این کد یک برنامه ساده Rust راه‌اندازی می‌کند که به سرور MCP و GitHub Models برای تعاملات LLM متصل می‌شود.

> [!IMPORTANT]
> مطمئن شوید متغیر محیطی `OPENAI_API_KEY` را با توکن GitHub خود قبل از اجرای برنامه تنظیم کرده‌اید.

عالی، برای گام بعدی، بیایید قابلیت‌های سرور را لیست کنیم.

### -2- لیست کردن قابلیت‌های سرور

حال به سرور متصل می‌شویم و از آن قابلیت‌هایش را می‌پرسیم:

#### Typescript

در همان کلاس، متدهای زیر را اضافه کنید:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // فهرست ابزارها
    const toolsResult = await this.client.listTools();
}
```

در کد قبلی ما:

- کد اتصال به سرور، `connectToServer` را اضافه کرده‌ایم.
- متد `run` را ساخته‌ایم که مسئول مدیریت جریان برنامه است. تا کنون فقط ابزارها را لیست می‌کند اما به زودی موارد بیشتری به آن اضافه می‌کنیم.

#### Python

```python
# فهرست منابع موجود
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# فهرست ابزارهای موجود
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

موارد اضافه شده:

- منابع و ابزارها را لیست کرده و چاپ کردیم. برای ابزارها همچنین `inputSchema` را لیست کردیم که بعداً استفاده می‌کنیم.

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

در کد قبلی ما:

- ابزارهای موجود در سرور MCP را لیست کردیم
- برای هر ابزار، نام، توضیحات و طرح‌واره آن را لیست کردیم. مورد اخیر برای تماس با ابزارها استفاده خواهد شد.

#### جاوا

```java
// یک ارائه‌دهنده ابزار ایجاد کنید که به‌طور خودکار ابزارهای MCP را کشف کند
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// ارائه‌دهنده ابزار MCP به‌طور خودکار موارد زیر را مدیریت می‌کند:
// - فهرست ابزارهای موجود از سرور MCP
// - تبدیل الگوهای ابزار MCP به فرمت LangChain4j
// - مدیریت اجرای ابزار و پاسخ‌ها
```

در کد قبلی ما:

- یک `McpToolProvider` ایجاد کردیم که به صورت خودکار همه ابزارهای سرور MCP را کشف و ثبت می‌کند
- این تامین‌کننده ابزار، تبدیل بین طرح‌واره‌های ابزار MCP و فرمت ابزار LangChain4j را به صورت داخلی مدیریت می‌کند
- این رویکرد فرآیند لیست کردن و تبدیل دستی ابزارها را انتزاع می‌کند

#### Rust

دریافت ابزار از سرور MCP با استفاده از متد `list_tools` انجام می‌شود. در تابع `main` خود، پس از تنظیم کلاینت MCP، کد زیر را اضافه کنید:

```rust
// دریافت فهرست ابزار MCP
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- تبدیل قابلیت‌های سرور به ابزارهای LLM

گام بعدی پس از لیست کردن قابلیت‌های سرور، تبدیل آن‌ها به فرمتی است که LLM بتواند بفهمد. وقتی این کار را انجام دادیم، می‌توانیم این قابلیت‌ها را به عنوان ابزار به LLM ارائه کنیم.

#### TypeScript

1. کد زیر را برای تبدیل پاسخ سرور MCP به فرمتی که LLM بتواند استفاده کند اضافه کنید:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // یک اسکیمای زاد بر اساس input_schema ایجاد کنید
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // نوع را به صورت صریح به "function" تنظیم کنید
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

    کد بالا پاسخی از سرور MCP را گرفته و آن را به قالب تعریف ابزار تبدیل می‌کند که LLM آن را می‌فهمد.

2. بعد، متد `run` را طوری به‌روزرسانی کنیم که قابلیت‌های سرور را لیست کند:

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

    در کد بالا، متد `run` را بروزرسانی کردیم تا بر روی نتایج پیمایش کند و برای هر ورودی `openAiToolAdapter` را فراخوانی کند.

#### Python

1. ابتدا تابع مبدل زیر را ایجاد کنیم

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

    در تابع `convert_to_llm_tools`، پاسخ ابزار MCP را گرفته و به فرمتی تبدیل می‌کنیم که LLM بفهمد.

2. بعد، کد کلاینت را طوری به‌روزرسانی کنیم که از این تابع بهره بگیرد:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    اینجا، فراخوانی `convert_to_llm_tool` را اضافه کرده‌ایم تا پاسخ ابزار MCP را به شکلی تبدیل کنیم که بعداً بتوانیم به LLM بدهیم.

#### .NET

1. اضافه کردن کدی برای تبدیل پاسخ ابزار MCP به فرمتی که LLM بفهمد:

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

در کد بالا:

- تابعی به نام `ConvertFrom` ساخته‌ایم که نام، توضیحات و طرح‌واره ورودی را می‌گیرد.
- عملکردی تعریف کردیم که یک تعریف تابع (FunctionDefinition) ایجاد می‌کند که به ChatCompletionsDefinition داده می‌شود. مورد آخر چیزی است که LLM می‌تواند بفهمد.

2. حالا بیایید ببینیم چگونه می‌توانیم برخی کدهای موجود را برای استفاده از این تابع بروزرسانی کنیم:

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
// ایجاد رابط کاربری ربات برای تعامل زبان طبیعی
public interface Bot {
    String chat(String prompt);
}

// پیکربندی سرویس هوش مصنوعی با ابزارهای LLM و MCP
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

در کد بالا:

- یک اینترفیس ساده `Bot` برای تعاملات زبان طبیعی تعریف کرده‌ایم
- از `AiServices` در LangChain4j استفاده کرده‌ایم تا LLM را به‌طور خودکار با تامین‌کننده ابزار MCP متصل کند
- فریم‌ورک به صورت خودکار تبدیل طرح‌واره ابزار و فراخوانی توابع را مدیریت می‌کند
- این رویکرد تبدیل دستی ابزار را حذف می‌کند – LangChain4j همه پیچیدگی‌های تبدیل ابزار MCP به فرمت سازگار با LLM را مدیریت می‌کند

#### Rust

برای تبدیل پاسخ ابزار MCP به فرمتی که LLM بفهمد، یک تابع کمکی اضافه می‌کنیم که لیست ابزارها را قالب‌بندی کند. کد زیر را به فایل `main.rs` خود زیر تابع `main` اضافه کنید. این کد هنگام ارسال درخواست به LLM فراخوانی خواهد شد:

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

عالی، اکنون ما آماده هستیم درخواست‌های کاربر را مدیریت کنیم، پس این را در مرحله بعد انجام می‌دهیم.

### -4- مدیریت درخواست پرامپت کاربر

در بخش کد زیر، درخواست‌های کاربر را مدیریت خواهیم کرد.

#### TypeScript

1. متدی اضافه کنید که برای فراخوانی LLM استفاده می‌شود:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // ۲. ابزار سرور را فراخوانی کنید
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // ۳. با نتیجه کاری انجام دهید
        // انجام شود

        }
    }
    ```

    در کد بالا:

    - متدی به نام `callTools` اضافه کردیم.
    - این متد پاسخ LLM را بررسی می‌کند تا ببیند اگر ابزاری باید فراخوانی شود یا نه:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // فراخوانی ابزار
        }
        ```

    - ابزاری را فراخوانی می‌کند اگر LLM نشان دهد باید فراخوانی شود:

        ```typescript
        // ۲. ابزار سرور را فراخوانی کنید
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // ۳. کاری با نتیجه انجام دهید
        // انجام شود
        ```

2. متد `run` را به‌روزرسانی کنید تا شامل فراخوانی‌های LLM و فراخوانی `callTools` باشد:

    ```typescript

    // ۱. ایجاد پیام‌هایی که ورودی برای مدل زبان بزرگ (LLM) هستند
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // ۲. فراخوانی مدل زبان بزرگ (LLM)
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // ۳. مرور پاسخ مدل زبان بزرگ، برای هر انتخاب، بررسی کنید که آیا فراخوانی ابزار دارد یا خیر
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

عالی، حالا کل کد را کامل می‌کنیم:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // وارد کردن zod برای اعتبارسنجی طرح‌واره

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // ممکن است در آینده نیاز باشد به این آدرس تغییر یابد: https://models.github.ai/inference
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
          // ایجاد یک طرح‌واره zod براساس input_schema
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // به طور صریح نوع را به "function" تنظیم کنید
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
    
    
          // ۲. فراخوانی ابزار سرور
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // ۳. انجام کاری با نتیجه
          // باید انجام شود
    
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
    
        // ۳. پاسخ LLM را مرور کنید، برای هر گزینه بررسی کنید که آیا فراخوانی ابزار دارد یا خیر
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

1. برخی واردات مورد نیاز برای فراخوانی LLM را اضافه کنیم

    ```python
    # ال‌ال‌ام
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. حال تابعی که LLM را فرا می‌خواند اضافه کنیم:

    ```python
    # مدل زبانی بزرگ

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
            # پارامترهای اختیاری
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

    در کد بالایی:

    - توابعی که از سرور MCP یافتیم و تبدیل کردیم را به LLM داده‌ایم.
    - سپس LLM را با این توابع فراخوانی کردیم.
    - سپس نتیجه را بررسی می‌کنیم تا ببینیم چه توابعی باید فراخوانی شوند، اگر وجود داشته باشند.
    - در نهایت آرایه‌ای از توابع برای فراخوانی می‌فرستیم.

3. گام نهایی، کد اصلی را به‌روزرسانی کنیم:

    ```python
    prompt = "Add 2 to 20"

    # از LLM بپرسید چه ابزارهایی موجود است، اگر وجود دارد
    functions_to_call = call_llm(prompt, functions)

    # فراخوانی توابع پیشنهادی
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    این گام نهایی است، در کد بالا:

    - یک ابزار MCP را از طریق `call_tool` با استفاده از تابعی که LLM فکر می‌کند باید بر اساس پرامپت فراخوانی شود، صدا می‌زنیم.
    - نتیجه فراخوانی ابزار به سرور MCP را چاپ می‌کنیم.

#### .NET

1. کدی برای درخواست پرامپت LLM نشان دهیم:

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

    در کد بالا:

    - ابزارها را از سرور MCP گرفته‌ایم، `var tools = await GetMcpTools()`.
    - پرامپت کاربر را تعریف کرده‌ایم `userMessage`.
    - شیء گزینه‌ها را ساخته‌ایم با تعیین مدل و ابزارها.
    - یک درخواست به سمت LLM ارسال کرده‌ایم.

2. یک گام دیگر، ببینیم آیا LLM فکر می‌کند باید تابعی را فراخوانی کنیم یا نه:

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

    در کد بالا:

    - در لیست فراخوانی توابع پیمایش کردیم.
    - برای هر فراخوانی ابزار، نام و آرگومان‌ها را استخراج کردیم و ابزار را با استفاده از کلاینت MCP روی سرور MCP صدا زدیم. در نهایت نتایج را چاپ کردیم.

کد کامل به شرح زیر است:

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
    // درخواست‌های زبان طبیعی را اجرا کنید که به‌طور خودکار از ابزارهای MCP استفاده می‌کنند
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

در کد بالا:

- از پرامپت‌های ساده زبان طبیعی برای تعامل با ابزارهای سرور MCP استفاده کردیم
- فریم‌ورک LangChain4j به صورت خودکار:
  - تبدیل پرامپت‌های کاربر به فراخوانی ابزار هنگام نیاز
  - فراخوانی ابزارهای مناسب MCP بر اساس تصمیم LLM
  - مدیریت جریان گفتگو بین LLM و سرور MCP
- متد `bot.chat()` پاسخ‌های زبان طبیعی ارائه می‌دهد که ممکن است شامل نتایج اجرای ابزارهای MCP باشد
- این رویکرد تجربه کاربری بدون درزی فراهم می‌کند که کاربران نیازی به دانستن پیاده‌سازی زیرساختی MCP ندارند

نمونه کد کامل:

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

در اینجا بخش عمده کار انجام می‌شود. ابتدا LLM را با پرامپت اولیه کاربر فرا می‌خوانیم، سپس پاسخ را پردازش می‌کنیم تا ببینیم آیا باید ابزاری صدا زده شود یا نه. اگر چنین باشد، آن ابزارها را صدا می‌زنیم و گفتگو را با LLM ادامه می‌دهیم تا دیگر نیازی به فراخوانی ابزار نباشد و پاسخ نهایی دریافت شود.

چندین بار LLM را فرا خواهیم خواند، پس تابعی تعریف کنیم که این کار را مدیریت کند. تابع زیر را به فایل `main.rs` خود اضافه کنید:

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

این تابع کلاینت LLM، لیست پیام‌ها (شامل پرامپت کاربر)، ابزارهای سرور MCP را می‌گیرد و یک درخواست به LLM ارسال می‌کند و پاسخ را برمی‌گرداند.
پاسخ از LLM شامل آرایه‌ای از `choices` خواهد بود. ما نیاز داریم نتیجه را پردازش کنیم تا ببینیم آیا `tool_calls` وجود دارد یا خیر. این به ما اعلام می‌کند که LLM درخواست فراخوانی ابزار خاصی را با آرگومان‌ها دارد. کد زیر را به انتهای فایل `main.rs` خود اضافه کنید تا تابعی برای مدیریت پاسخ LLM تعریف شود:

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

    // چاپ محتوا در صورت وجود
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // مدیریت تماس‌های ابزار
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // افزودن پیام دستیار

        // اجرای هر تماس ابزار
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // افزودن نتیجه ابزار به پیام‌ها
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // ادامه مکالمه با نتایج ابزار
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
  
اگر `tool_calls` وجود داشته باشد، اطلاعات ابزار استخراج می‌شود، با درخواست ابزار به سرور MCP فراخوانی می‌شود و نتایج به پیام‌های گفتگو افزوده می‌شود. سپس گفتگو با LLM ادامه می‌یابد و پیام‌ها با پاسخ دستیار و نتایج فراخوانی ابزار بروزرسانی می‌شوند.

برای استخراج اطلاعات فراخوانی ابزار که LLM برای تماس‌های MCP برمی‌گرداند، یک تابع کمکی دیگر اضافه خواهیم کرد تا همه موارد لازم برای انجام فراخوانی استخراج شود. کد زیر را به انتهای فایل `main.rs` خود اضافه کنید:

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
  
با داشتن همه اجزا در جای خود، اکنون می‌توانیم درخواست اولیه کاربر را مدیریت کرده و LLM را فراخوانی کنیم. تابع `main` خود را به شکل زیر بروزرسانی کنید:

```rust
// مکالمه LLM با فراخوانی ابزارها
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
  
این کد LLM را با درخواست اولیه کاربر برای جمع دو عدد پرس‌وجو می‌کند و پاسخ را پردازش می‌کند تا به صورت پویا فراخوانی ابزارها را مدیریت کند.

عالی است، شما انجامش دادید!

## تمرین

کدی که در این تمرین داشتید را بردارید و سرور را با ابزارهای بیشتری گسترش دهید. سپس یک کلاینت با LLM بسازید، مانند تمرین، و آن را با درخواست‌های مختلف آزمایش کنید تا مطمئن شوید همه ابزارهای سرور شما به صورت پویا فراخوانی می‌شوند. این روش ساخت کلاینت تجربه کاربری بسیار خوبی برای کاربر نهایی فراهم می‌کند زیرا آنها می‌توانند از طریق درخواست‌ها به جای دستورات دقیق کلاینت استفاده کنند و متوجه هیچ فراخوانی سرور MCP نشوند.

## راه‌حل

[راه‌حل](./solution/README.md)

## نکات کلیدی

- افزودن LLM به کلاینت شما راه بهتری برای تعامل کاربران با سرورهای MCP فراهم می‌کند.
- شما باید پاسخ سرور MCP را به چیزی تبدیل کنید که LLM بتواند آن را بفهمد.

## نمونه‌ها

- [ماشین حساب جاوا](../samples/java/calculator/README.md)  
- [ماشین حساب .Net](../../../../03-GettingStarted/samples/csharp)  
- [ماشین حساب جاوااسکریپت](../samples/javascript/README.md)  
- [ماشین حساب تایپ‌اسکریپت](../samples/typescript/README.md)  
- [ماشین حساب پایتون](../../../../03-GettingStarted/samples/python)  
- [ماشین حساب راست](../../../../03-GettingStarted/samples/rust)

## منابع بیشتر

## مرحله بعد

- مرحله بعد: [استفاده از سرور با ویرایشگر Visual Studio Code](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->