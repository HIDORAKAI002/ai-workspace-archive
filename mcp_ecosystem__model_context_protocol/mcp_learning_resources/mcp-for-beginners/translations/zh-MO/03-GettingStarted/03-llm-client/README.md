# 使用 LLM 創建客戶端

到目前為止，你已經看到如何創建伺服器和客戶端。客戶端能夠明確呼叫伺服器來列出其工具、資源和提示。然而，這並不是一個非常實用的方法。你的用戶生活在智能代理時代，期望使用提示並與 LLM 交流。他們不在乎你是否使用 MCP 來存儲你的能力；他們只是希望透過自然語言進行互動。那么我們如何解決這個問題呢？解決方案是將 LLM 添加到客戶端。

## 概述

在本課程中，我們專注於添加一個 LLM 到你的客戶端，並展示這如何為你的用戶提供更好的體驗。

## 學習目標

完成本課程後，你將能夠：

- 創建帶有 LLM 的客戶端。
- 使用 LLM 無縫與 MCP 伺服器互動。
- 為客戶端提供更好的終端用戶體驗。

## 方法

讓我們嘗試理解我們需要採取的方法。添加 LLM 聽起來很簡單，但我們實際上會怎麼做呢？

以下是客戶端與伺服器互動的方式：

1. 建立與伺服器的連接。

1. 列出能力、提示、資源和工具，並保存它們的結構。

1. 添加 LLM，並以 LLM 能理解的格式傳遞保存的能力及其結構。

1. 通過將用戶提示和客戶端列出的工具一起傳遞給 LLM 來處理用戶提示。

很好，現在我們已經在高層次上了解如何做到這點，讓我們在下面的練習中嘗試。

## 練習：使用 LLM 創建客戶端

在本練習中，我們將學習如何將 LLM 添加到我們的客戶端。

### 使用 GitHub 個人訪問令牌進行身份驗證

創建 GitHub 令牌是一個簡單的過程。以下是操作步驟：

- 前往 GitHub 設定 – 點擊右上角的個人頭像，選擇設定（Settings）。
- 前往開發者設定 – 往下滾動並點擊開發者設定（Developer Settings）。
- 選擇個人訪問令牌 – 點擊細粒度令牌（Fine-grained tokens），然後生成新令牌。
- 配置你的令牌 – 添加備註以便參考，設定過期日期，並選擇必要的權限。此處請確保添加 Models 權限。
- 生成並複製令牌 – 點擊生成令牌，並確保立即複製，因為之後將無法再次查看。

### -1- 連接至伺服器

讓我們先創建客戶端：

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // 引入 zod 用作架構驗證

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

在上述代碼中我們：

- 導入所需的庫。
- 創建了一個包含兩個成員 `client` 和 `openai` 的類，分別幫助我們管理客戶端和與 LLM 互動。
- 配置了我們的 LLM 實例以使用 GitHub Models，通過設置 `baseUrl` 指向推理 API。

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# 建立標準輸入輸出連接的服務器參數
server_params = StdioServerParameters(
    command="mcp",  # 可執行檔
    args=["run", "server.py"],  # 可選擇的命令行參數
    env=None,  # 可選擇的環境變數
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # 初始化連接
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

在上述代碼中我們：

- 導入 MCP 所需的庫。
- 創建了一個客戶端。

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

首先，你需要將 LangChain4j 依賴添加到你的 `pom.xml` 文件中。添加這些依賴以啟用 MCP 集成和 GitHub Models 支持：

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

然後創建你的 Java 客戶端類：

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
    
    public static void main(String[] args) throws Exception {        // 配置LLM以使用GitHub模型
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // 創建MCP傳輸以連接伺服器
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // 創建MCP客戶端
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

在上述代碼中，我們：

- **添加了 LangChain4j 依賴**：用於 MCP 集成、OpenAI 官方客戶端和 GitHub Models 支持。
- **導入 LangChain4j 庫**： 用於 MCP 集成和 OpenAI 聊天模型功能。
- **創建了 `ChatLanguageModel`**：配置為使用帶有你的 GitHub 令牌的 GitHub Models。
- **設置 HTTP 傳輸**：使用 Server-Sent Events (SSE) 連接 MCP 伺服器。
- **創建了 MCP 客戶端**：用於處理與伺服器的通訊。
- **使用 LangChain4j 內建的 MCP 支持**：簡化了 LLM 與 MCP 伺服器之間的集成。

#### Rust

此範例假設你有一個運行中的 Rust 基於 MCP 的伺服器。如果沒有，可以參考 [01-first-server](../01-first-server/README.md) 課程來創建伺服器。

擁有 Rust MCP 伺服器後，打開終端並導航到伺服器的相同目錄，然後執行以下命令來創建新的 LLM 客戶端項目：

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

將以下依賴添加到你的 `Cargo.toml` 文件：

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> 雖然沒有官方的 Rust OpenAI 庫，但 `async-openai` crate 是一個[社群維護的庫](https://platform.openai.com/docs/libraries/rust#rust)，廣泛被使用。

打開 `src/main.rs` 文件，並用以下代碼替換內容：

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
    // 初始訊息
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // 設定 OpenAI 用戶端
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // 設定 MCP 用戶端
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

    // 待辦事項：取得 MCP 工具列表

    // 待辦事項：與大型語言模型對話並呼叫工具

    Ok(())
}
```

此代碼設置了一個基本的 Rust 應用程序，將連接到 MCP 伺服器和 GitHub Models 以進行 LLM 互動。

> [!IMPORTANT]
> 確保在運行應用程序前設置 `OPENAI_API_KEY` 環境變量為你的 GitHub 令牌。

很好，下一步，我們來列出伺服器的能力。

### -2- 列出伺服器能力

現在我們將連接伺服器並請求其能力：

#### TypeScript

在同一類中，添加以下方法：

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // 列出工具
    const toolsResult = await this.client.listTools();
}
```

在上述代碼中我們：

- 添加了連接伺服器的代碼 `connectToServer`。
- 創建了 `run` 方法，負責處理應用流程。目前僅列出工具，但稍後會添加更多功能。

#### Python

```python
# 列出可用資源
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# 列出可用工具
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

以下是我們所添加的：

- 列出了資源和工具並打印出來。對工具我們還列出了 `inputSchema`，稍後會使用。

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

在上述代碼中我們：

- 列出了 MCP 伺服器上可用的工具。
- 對每個工具列出名稱、描述及其結構。後者我們將用於稍後調用工具。

#### Java

```java
// 創建一個自動發現MCP工具的工具提供者
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP工具提供者自動處理：
// - 列出MCP伺服器上的可用工具
// - 將MCP工具架構轉換為LangChain4j格式
// - 管理工具執行和回應
```

在上述代碼中我們：

- 創建了一個 `McpToolProvider`，自動發現並註冊 MCP 伺服器的所有工具。
- 工具提供者內部處理 MCP 工具結構與 LangChain4j 工具格式之間的轉換。
- 這種方法抽象掉了手動列出與轉換工具的過程。

#### Rust

從 MCP 伺服器檢索工具使用 `list_tools` 方法。在你的 `main` 函數中，設置 MCP 客戶端後，新增如下代碼：

```rust
// 獲取 MCP 工具列表
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- 將伺服器能力轉換為 LLM 工具

列出伺服器能力後的下一步是將它們轉換為 LLM 能理解的格式。一旦完成，我們可以將這些能力作為工具提供給 LLM。

#### TypeScript

1. 添加以下代碼將 MCP 伺服器的響應轉換為 LLM 可使用的工具格式：

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // 根據 input_schema 建立 zod 結構
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // 明確設定類型為 "function"
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

    上述代碼將 MCP 伺服器的響應轉換為 LLM 能理解的工具定義格式。

2. 接著更新 `run` 方法，列出伺服器能力：

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

    在上述代碼中，我們更新了 `run` 方法，對結果進行映射，並對每條記錄調用 `openAiToolAdapter`。

#### Python

1. 首先，創建以下轉換函數：

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

    在上方函數 `convert_to_llm_tools` 中，我們將 MCP 工具響應轉換為 LLM 可理解的格式。

2. 接著，更新客戶端代碼以利用該函數，如下：

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    這裡我們調用 `convert_to_llm_tool` 將 MCP 工具響應轉換為稍後可提供給 LLM 的格式。

#### .NET

1. 添加代碼將 MCP 工具響應轉換為 LLM 可理解的格式：

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

在上述代碼中我們：

- 創建了 `ConvertFrom` 函數，接收名稱、描述和輸入結構。
- 定義了創建 FunctionDefinition 的功能，此定義會傳遞給 ChatCompletionsDefinition，後者為 LLM 可理解格式。

2. 接下來看看如何更新現有代碼以利用此函數：

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
// 建立一個用於自然語言互動的機械人介面
public interface Bot {
    String chat(String prompt);
}

// 使用 LLM 及 MCP 工具配置 AI 服務
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

在上述代碼中我們：

- 定義了簡單的 `Bot` 介面，用於自然語言交互。
- 使用 LangChain4j 的 `AiServices` 自動綁定 LLM 與 MCP 工具提供者。
- 框架自動處理工具結構轉換與函式呼叫。
- 這種方式消除手動轉換工具的需要 — LangChain4j 處理所有 MCP 工具轉為 LLM 兼容格式的複雜性。

#### Rust

為將 MCP 工具響應轉換為 LLM 可理解格式，我們將添加一個助手函數來格式化工具列表。在 `main` 函數下方的 `main.rs` 文件中添加以下代碼。這會在向 LLM 發送請求時被調用：

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

很好，我們已準備好處理用戶請求，接下來開始處理。

### -4- 處理用戶提示請求

在此部分代碼中，我們將處理用戶請求。

#### TypeScript

1. 添加一個方法用於呼叫我們的 LLM：

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. 調用伺服器的工具
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. 使用結果做些事情
        // 待辦事項

        }
    }
    ```

    在上述代碼中，我們：

    - 添加了 `callTools` 方法。
    - 該方法接收 LLM 響應並檢查是否呼叫了任何工具：

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // 呼叫工具
        }
        ```

    - 如果 LLM 指示應呼叫，則呼叫工具：

        ```typescript
        // 2. 呼叫伺服器的工具
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. 使用結果做某事
        // 待辦
        ```

2. 更新 `run` 方法，包含對 LLM 的呼叫及 `callTools`：

    ```typescript

    // 1. 建立作為大型語言模型輸入的訊息
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. 呼叫大型語言模型
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. 檢查大型語言模型回應，對每個選項，查看是否有工具呼叫
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

很好，以下是完整代碼：

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // 導入 zod 作為架構驗證

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // 將來可能需要改用此網址：https://models.github.ai/inference
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
          // 根據 input_schema 建立 zod 架構
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // 明確設置類型為 "function"
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
    
    
          // 2. 調用伺服器的工具
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. 處理結果
          // 待辦事項
    
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
    
        // 3. 遍歷 LLM 回應，對每個選項檢查是否有工具調用
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

1. 添加調用 LLM 所需的導入：

    ```python
    # 大型語言模型
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. 接著添加呼叫 LLM 的函數：

    ```python
    # 大型語言模型

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
            # 可選參數
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

    在上述代碼中，我們：

    - 將從 MCP 伺服器獲取並轉換的函數傳遞給 LLM。
    - 使用這些函數呼叫 LLM。
    - 檢查結果確定應呼叫哪些函數（如有）。
    - 最終傳遞函數陣列以呼叫。

3. 最後，更新我們的主代碼：

    ```python
    prompt = "Add 2 to 20"

    # 問大型語言模型有哪些工具可用（如果有的話）
    functions_to_call = call_llm(prompt, functions)

    # 調用建議的函數
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    這是最終步驟，上述代碼：

    - 根據 LLM 認為應呼叫的函數，通過 `call_tool` 呼叫 MCP 工具。
    - 打印 MCP 伺服器工具呼叫結果。

#### .NET

1. 顯示執行 LLM 提示請求的代碼：

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

    在上述代碼中，我們：

    - 從 MCP 伺服器獲取工具，`var tools = await GetMcpTools()`。
    - 定義用戶提示 `userMessage`。
    - 構造指定模型與工具的選項對象。
    - 向 LLM 發出請求。

2. 最後一步，判斷是否應呼叫函數：

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

    在上述代碼中，我們：

    - 遍歷函數呼叫清單。
    - 對每個工具呼叫，解析名稱和參數，使用 MCP 客戶端在 MCP 伺服器上呼叫工具。最後打印結果。

完整代碼如下：

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
    // 執行自然語言請求，自動使用MCP工具
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

在上述代碼中，我們：

- 使用簡單的自然語言提示與 MCP 伺服器工具互動。
- LangChain4j 框架自動處理：
  - 在需要時將用戶提示轉換為工具呼叫。
  - 根據 LLM 決定呼叫相應的 MCP 工具。
  - 管理 LLM 與 MCP 伺服器間的對話流程。
- `bot.chat()` 方法返回包含 MCP 工具執行結果的自然語言回應。
- 這種方法提供無縫用戶體驗，用戶不需要了解底層 MCP 實現。

完整代碼範例：

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

這裡是大部分工作發生的地方。我們會使用初始用戶提示呼叫 LLM，然後處理響應以判斷是否需要呼叫任何工具。如果需要，就呼叫這些工具並繼續與 LLM 進行對話，直到不再需要呼叫工具且獲得最終回應。

我們將多次呼叫 LLM，因此定義一個函數處理這些呼叫。在你的 `main.rs` 文件中添加以下函數：

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

該函數接受 LLM 客戶端、訊息列表（包含用戶提示）、來自 MCP 伺服器的工具，並發送請求給 LLM，返回響應。
LLM 的回應會包含一個 `choices` 陣列。我們需要處理結果，看看是否存在任何 `tool_calls`。這讓我們知道 LLM 正在請求以特定參數呼叫某個工具。將以下程式碼新增到你的 `main.rs` 檔案底部，以定義一個函式來處理 LLM 回應：

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

    // 如有內容則列印
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // 處理工具呼叫
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // 新增助理訊息

        // 執行每個工具呼叫
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // 將工具結果加入訊息
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // 使用工具結果繼續對話
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


如果存在 `tool_calls`，它會擷取工具資訊，以工具請求呼叫 MCP 伺服器，並將結果加入對話訊息。接著繼續與 LLM 的對話，訊息會隨助理的回應和工具呼叫結果而更新。

為了擷取 LLM 回傳用於 MCP 呼叫的工具呼叫資訊，我們將新增另一個輔助函式，提取所有進行呼叫所需的資料。將以下程式碼新增到你的 `main.rs` 檔案底部：

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


所有程式碼準備就緒後，我們現在可以處理初始使用者提示並呼叫 LLM。更新你的 `main` 函式，加入以下程式碼：

```rust
// 使用工具呼叫的 LLM 會話
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


此程式會使用初始使用者提示詢問兩個數字的加總，並會處理回應以動態處理工具呼叫。

太好了，你完成了！

## 作業

取用練習中的程式碼，擴充伺服器功能，加入更多工具。接著建立一個如同練習中一樣的 LLM 客戶端，並以不同提示測試，確保你的所有伺服器工具都能被動態呼叫。用這種方式建立客戶端，終端使用者將擁有更好的使用體驗，因為他們能使用自然文字提示，而無需精確的客戶端指令，也不需要知道 MCP 伺服器是否被呼叫。

## 解答

[解答](./solution/README.md)

## 重要收穫

- 在你的客戶端加入 LLM，能提供使用者與 MCP 伺服器互動的更佳方式。
- 你需要將 MCP 伺服器的回應轉換為 LLM 能理解的內容。

## 範例

- [Java 計算機](../samples/java/calculator/README.md)
- [.Net 計算機](../../../../03-GettingStarted/samples/csharp)
- [JavaScript 計算機](../samples/javascript/README.md)
- [TypeScript 計算機](../samples/typescript/README.md)
- [Python 計算機](../../../../03-GettingStarted/samples/python)
- [Rust 計算機](../../../../03-GettingStarted/samples/rust)

## 其他資源

## 下一步

- 下一步：[使用 Visual Studio Code 消費伺服器](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->