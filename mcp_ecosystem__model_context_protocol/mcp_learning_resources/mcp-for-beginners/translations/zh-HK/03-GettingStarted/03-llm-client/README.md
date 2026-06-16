# 使用 LLM 創建用戶端

到目前為止，你已經看到如何創建伺服器和用戶端。用戶端能夠明確呼叫伺服器以列出其工具、資源和提示。然而，這不是一個非常實用的方法。你的使用者生活在智能代理時代，期待使用提示詞並與 LLM 通訊。他們不關心你是否使用 MCP 來儲存你的能力；他們只期望使用自然語言進行互動。那我們要怎麼解決？解決方案是將 LLM 加入用戶端。

## 概述

本課程中，我們專注於為用戶端添加 LLM，並展示這如何為使用者提供更好的體驗。

## 學習目標

結束本課程時，你將能夠：

- 創建帶有 LLM 的用戶端。
- 使用 LLM 無縫地與 MCP 伺服器互動。
- 在用戶端提供更佳的終端使用者體驗。

## 方法

讓我們嘗試了解我們需要採取的方法。添加 LLM 聽起來簡單，但我們真會這麼做嗎？

以下是用戶端與伺服器互動的方式：

1. 與伺服器建立連接。

1. 列出能力、提示、資源和工具，並保存它們的架構。

1. 添加 LLM 並將保存的能力及其架構以 LLM 可理解的格式傳遞。

1. 處理使用者提示，將其連同用戶端列出的工具一起傳遞給 LLM。

很好，現在我們了解了如何高層次地完成此操作，讓我們在下面的練習中嘗試一下。

## 練習：使用 LLM 創建用戶端

在本練習中，我們將學習如何為用戶端添加 LLM。

### 使用 GitHub 個人存取權杖進行認證

創建 GitHub 權杖是一個簡單的過程。以下是步驟：

- 前往 GitHub 設定 — 點擊右上角你的頭像並選擇設定（Settings）。
- 轉到開發者設定 — 向下捲動並點擊開發者設定（Developer Settings）。
- 選擇個人存取權杖 — 點擊精細權限權杖（Fine-grained tokens），然後產生新權杖（Generate new token）。
- 設定你的權杖 — 加入備註以便參考，設定過期日期，並選擇所需的範圍（權限）。在此案例中，務必新增 Models 權限。
- 產生並複製權杖 — 點擊產生權杖（Generate token），並確保立即複製，之後將無法再看到。

### -1- 連接伺服器

首先，讓我們創建用戶端：

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // 導入 zod 用於模式驗證

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

在上述程式碼中，我們：

- 匯入所需的函式庫
- 創建一個含有兩個成員的類別，分別是 `client` 和 `openai`，用來幫助我們管理用戶端並分別與 LLM 互動。
- 配置我們的 LLM 實例使之使用 GitHub Models，透過設定 `baseUrl` 指向推論 API。

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# 建立標準輸入輸出連線的伺服器參數
server_params = StdioServerParameters(
    command="mcp",  # 可執行檔
    args=["run", "server.py"],  # 選擇性命令行參數
    env=None,  # 選擇性環境變數
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # 初始化連線
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

在上述程式碼中，我們：

- 匯入 MCP 所需的函式庫
- 創建用戶端

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

首先，你需要將 LangChain4j 的相依性加入到你的 `pom.xml` 文件中。新增這些相依性以啟用 MCP 整合以及支援 GitHub Models：

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

然後創建你的 Java 用戶端類別：

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
    
    public static void main(String[] args) throws Exception {        // 配置 LLM 以使用 GitHub 模型
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // 創建 MCP 傳輸以連接伺服器
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // 創建 MCP 客戶端
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

在上述程式碼中，我們：

- **新增 LangChain4j 相依性**：這是 MCP 整合、OpenAI 官方用戶端和 GitHub Models 支援所必需的
- **匯入 LangChain4j 函式庫**：用於 MCP 整合及 OpenAI 聊天模型功能
- **創建 `ChatLanguageModel`**：設定使用 GitHub Models 並使用你的 GitHub 權杖
- **設置 HTTP 傳輸**：使用伺服器發送事件（SSE）連接 MCP 伺服器
- **創建 MCP 用戶端**：負責處理與伺服器的通訊
- **使用 LangChain4j 內建的 MCP 支援**：簡化 LLM 與 MCP 伺服器之間的整合

#### Rust

此示例假設你已有一個基於 Rust 的 MCP 伺服器運行中。如果沒有，請參考[01-first-server](../01-first-server/README.md)課程來創建伺服器。

當你擁有 Rust MCP 伺服器後，開啟終端機並切換到與伺服器相同的目錄。然後執行以下命令來建立一個新的 LLM 用戶端專案：

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

將以下相依性加入你的 `Cargo.toml` 文件中：

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> 雖然沒有官方的 Rust OpenAI 函式庫，但 `async-openai` crate 是一個[社群維護的函式庫](https://platform.openai.com/docs/libraries/rust#rust)，並被廣泛使用。

打開 `src/main.rs` 文件，並將內容替換為以下程式碼：

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

    // 待辦事項：取得 MCP 工具清單

    // 待辦事項：與大型語言模型進行包含工具呼叫的對話

    Ok(())
}
```

這段代碼設定一個基本的 Rust 應用程式，用來連接 MCP 伺服器及 GitHub Models 以進行 LLM 互動。

> [!IMPORTANT]
> 請確保在運行應用程式前，設定環境變數 `OPENAI_API_KEY` 為你的 GitHub 權杖。

很好，下一步讓我們列出伺服器的能力。

### -2- 列出伺服器能力

現在我們將連接伺服器並請求其能力清單：

#### Typescript

在同一個類別中，加入以下方法：

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

在上述程式碼中，我們：

- 添加連接伺服器的程式碼 `connectToServer`。
- 創建 `run` 方法，負責處理應用程式流程。到目前為止，它僅列出工具，但我們接下來會繼續擴充。

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

新增內容包括：

- 列出資源和工具並將其印出。對於工具，我們還列出 `inputSchema`，稍後會用到。

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

在上述程式碼中，我們：

- 列出 MCP 伺服器上的可用工具
- 對每個工具，列出名稱、描述及其架構。後者將用於稍後呼叫工具。

#### Java

```java
// 建立一個自動發現 MCP 工具的工具提供者
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP 工具提供者自動處理：
// - 從 MCP 伺服器列出可用工具
// - 將 MCP 工具架構轉換為 LangChain4j 格式
// - 管理工具執行和回應
```

在上述程式碼中，我們：

- 創建 `McpToolProvider`，自動偵測並註冊所有來自 MCP 伺服器的工具
- 該工具提供者會在內部處理 MCP 工具架構與 LangChain4j 工具格式之間的轉換
- 這種方式抽象掉了手動列出與轉換工具的流程

#### Rust

從 MCP 伺服器檢索工具使用 `list_tools` 方法。在你的 `main` 函數中，設定好 MCP 用戶端後，加入以下程式碼：

```rust
// 獲取 MCP 工具清單
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- 將伺服器能力轉換為 LLM 工具

列出伺服器能力後的下一步是將其轉換為 LLM 可理解的格式。完成後，我們便可以將這些能力作為工具提供給 LLM。

#### TypeScript

1. 新增以下程式碼，將 MCP 伺服器回應轉換為 LLM 可用的工具格式：

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // 根據 input_schema 建立一個 zod schema
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // 明確設定類型為「function」
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

    上述程式碼將 MCP 伺服器的回應轉換成 LLM 能理解的工具定義格式。

2. 接著更新 `run` 方法以列出伺服器能力：

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

    在上述程式碼中，我們更新了 `run` 方法，透過解構結果並對每個項目呼叫 `openAiToolAdapter`。

#### Python

1. 首先，我們創建以下轉換函式

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

    在 `convert_to_llm_tools` 函式中，我們將 MCP 工具回應轉成 LLM 可理解的格式。

2. 接著，更新用戶端程式碼以使用該函式：

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    這裡，我們新增了調用 `convert_to_llm_tool`，將 MCP 工具回應轉換為稍後可餵入 LLM 的格式。

#### .NET

1. 新增程式碼來轉換 MCP 工具回應為 LLM 能理解格式：

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

在上述程式碼中，我們：

- 創建 `ConvertFrom` 函式，接收名稱、描述與輸入架構。
- 定義功能，建立 `FunctionDefinition`，再傳入 `ChatCompletionsDefinition`。後者是 LLM 可理解的格式。

2. 接著看看如何更新現有程式碼來使用此函式：

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

// 使用大型語言模型和多模態處理工具來配置人工智能服務
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

在上述程式碼中，我們：

- 定義簡單的 `Bot` 介面用於自然語言互動
- 使用 LangChain4j 的 `AiServices` 自動將 LLM 與 MCP 工具提供者綁定
- 框架自動處理工具架構轉換與函式調用
- 此方法免去了手動工具轉換，LangChain4j 處理所有將 MCP 工具轉為 LLM 相容格式的複雜性

#### Rust

為將 MCP 工具回應轉換為 LLM 理解的格式，我們新增一個輔助函式，格式化工具清單。將以下程式碼加入到你的 `main.rs` 文件中，`main` 函式下方。此函式會在向 LLM 發出請求時呼叫：

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

很好，我們已準備好處理使用者請求，接下來解決這部分。

### -4- 處理使用者提示請求

此部分程式碼將處理使用者請求。

#### TypeScript

1. 新增用於呼叫 LLM 的方法：

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. 調用伺服器嘅工具
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. 使用結果做啲嘢
        // 待辦事項

        }
    }
    ```

    在上述程式碼中，我們：

    - 新增方法 `callTools`。
    - 該方法接收 LLM 回應，並檢查是否有需要呼叫的工具：

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // 調用工具
        }
        ```

    - 若 LLM 指示呼叫工具，則呼叫該工具：

        ```typescript
        // 2. 呼叫伺服器的工具
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. 用結果做某些事情
        // 待辦事項
        ```

2. 更新 `run` 方法以加入呼叫 LLM 及 `callTools`：

    ```typescript

    // 1. 創建作為 LLM 輸入的訊息
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. 呼叫 LLM
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. 瀏覽 LLM 回應，對每個選項檢查是否有工具呼叫
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

非常好，這是完整程式碼：

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // 載入 zod 以進行結構驗證

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // 未來可能需要改用此 URL：https://models.github.ai/inference
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
          // 根據 input_schema 建立 zod 結構
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // 明確設定類型為「function」
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
    
    
          // 2. 呼叫伺服器的工具
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. 對結果進行處理
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
    
        // 3. 遍歷 LLM 回應，對每個選項檢查是否有工具呼叫
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

1. 新增呼叫 LLM 需要的匯入：

    ```python
    # 大型語言模型
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. 新增將呼叫 LLM 的函式：

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

    在上述程式碼中，我們：

    - 傳遞先前取得並轉換的函式至 LLM。
    - 用上述函式呼叫 LLM。
    - 檢查結果以確定需呼叫哪些函式（若有）。
    - 最終傳遞需呼叫的函式陣列。

3. 最後一步，更新主要程式碼：

    ```python
    prompt = "Add 2 to 20"

    # 問LLM有甚麼工具可用，如果有的話
    functions_to_call = call_llm(prompt, functions)

    # 呼叫建議的函數
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    這是最終步驟，我們：

    - 根據提示，透過 `call_tool` 呼叫 LLM 認為需要呼叫的 MCP 工具函式。
    - 印出呼叫 MCP 伺服器工具的結果。

#### .NET

1. 示範如何呼叫 LLM 提示請求程式碼：

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

    在上述程式碼中，我們：

    - 從 MCP 伺服器獲取工具，`var tools = await GetMcpTools()`。
    - 定義使用者提示 `userMessage`。
    - 建構選項物件，指定模型與工具。
    - 向 LLM 發送請求。

2. 最後一步，看看 LLM 是否要呼叫任意函式：

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

    在上述程式碼中，我們：

    - 遍歷函式呼叫清單。
    - 對每個工具呼叫，解析名稱與引數，並利用 MCP 用戶端呼叫 MCP 伺服器的工具，最後印出結果。

完整程式碼如下：

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

在上述程式碼中，我們：

- 使用簡單的自然語言提示詞與 MCP 伺服器工具互動
- LangChain4j 框架自動處理：
  - 必要時將用戶提示轉換為工具呼叫
  - 依 LLM 判斷呼叫相應 MCP 工具
  - 管理 LLM 與 MCP 伺服器之間的對話流程
- `bot.chat()` 方法回傳自然語言回應，其中可能包含 MCP 工具執行結果
- 此方法提供無縫使用者體驗，用戶無需了解底層 MCP 實作

完整代碼示例：

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

這是主要工作部分。我們會以初始使用者提示呼叫 LLM，然後處理回應以判斷是否需呼叫任何工具。若需要，我們會呼叫這些工具並與 LLM 繼續對話，直到無需再呼叫工具並獲得最終回應。

我們將對 LLM 進行多次呼叫，因此定義一函式來處理 LLM 呼叫。將以下函式新增到你的 `main.rs` 文件：

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

此函式接收 LLM 用戶端、訊息列表（包含使用者提示）、MCP 伺服器工具，並向 LLM 發出請求，回傳回應。
LLM 的回應會包含一個 `choices` 陣列。我們需要處理這個結果來檢查是否有任何 `tool_calls` 出現。這會讓我們知道 LLM 請求某個特定工具並附帶參數。將以下程式碼加入你的 `main.rs` 檔案底部來定義一個用於處理 LLM 回應的函式：

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

    // 處理工具調用
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // 新增助理訊息

        // 執行每個工具調用
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // 將工具結果新增到訊息中
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

如果存在 `tool_calls`，它會提取工具資訊，使用該工具請求呼叫 MCP 伺服器，並將結果新增到對話訊息中。接著繼續與 LLM 的對話，並更新訊息內容，包含助理的回應和工具呼叫結果。

為了抽取 LLM 回傳用於 MCP 呼叫的工具呼叫資訊，我們將新增另一個輔助函式來提取所有呼叫所需的資料。將以下程式碼加入你的 `main.rs` 檔案底部：

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

在所有元件到位後，我們現在能處理最初的使用者提示並呼叫 LLM。更新你的 `main` 函式，加入以下程式碼：

```rust
// 帶有工具調用的語言模型對話
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

這將以最初的使用者提示向 LLM 查詢兩數相加的結果，並且它會處理回應以動態處理工具呼叫。

太好了，你成功了！

## 作業

使用練習中的程式碼建立一個包含更多工具的伺服器。然後像練習中一樣建立一個 LLM 用戶端，並使用不同的提示來測試，確保所有伺服器工具能被動態呼叫。這種建立用戶端的方式可讓最終使用者擁有良好的使用體驗，因為他們能用提示取代精確的用戶端指令，且完全不需知道任何 MCP 伺服器正在被呼叫。

## 解答

[Solution](./solution/README.md)

## 主要重點

- 加入 LLM 到用戶端能提供更好的方式讓使用者和 MCP 伺服器互動。
- 你需要將 MCP 伺服器的回應轉換成 LLM 能理解的格式。

## 範例

- [Java 計算器](../samples/java/calculator/README.md)
- [.Net 計算器](../../../../03-GettingStarted/samples/csharp)
- [JavaScript 計算器](../samples/javascript/README.md)
- [TypeScript 計算器](../samples/typescript/README.md)
- [Python 計算器](../../../../03-GettingStarted/samples/python)
- [Rust 計算器](../../../../03-GettingStarted/samples/rust)

## 額外資源

## 接下來是

- 下一步：[使用 Visual Studio Code 消費伺服器](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->