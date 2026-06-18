# MCP 伺服器與 stdio 傳輸

> **⚠️ 重要更新**：自 MCP 規範 2025-06-18 起，獨立的 SSE（Server-Sent Events）傳輸已被<strong>棄用</strong>，並由「可串流 HTTP」（Streamable HTTP）傳輸取代。目前 MCP 規範定義了兩種主要的傳輸機制：
> 1. **stdio** - 標準輸入/輸出（建議用於本地伺服器）
> 2. **可串流 HTTP** - 用於可能在內部使用 SSE 的遠端伺服器
>
> 本課程已更新，專注於使用 **stdio 傳輸**，它是大多數 MCP 伺服器實作推薦的方法。

stdio 傳輸允許 MCP 伺服器透過標準輸入和標準輸出串流，與客戶端進行通訊。這是目前 MCP 規範中最常用且推薦的傳輸機制，提供一種簡單且高效的方式來建構 MCP 伺服器，能輕鬆整合多種客戶端應用。

## 概覽

本課程說明如何使用 stdio 傳輸建構並使用 MCP 伺服器。

## 學習目標

在本課程結束時，你將能夠：

- 使用 stdio 傳輸建構 MCP 伺服器。
- 使用 Inspector 進行 MCP 伺服器的除錯。
- 使用 Visual Studio Code 使用 MCP 伺服器。
- 理解目前 MCP 傳輸機制以及 stdio 傳輸的推薦原因。

## stdio 傳輸 - 運作原理

stdio 傳輸是目前 MCP 規範（2025-11-25）中支援的兩種傳輸類型之一。其運作方式如下：

- <strong>簡單通訊</strong>：伺服器從標準輸入（`stdin`）讀取 JSON-RPC 訊息，並將訊息發送到標準輸出（`stdout`）。
- <strong>進程基礎</strong>：客戶端將 MCP 伺服器作為子進程啟動。
- <strong>訊息格式</strong>：訊息是個別的 JSON-RPC 請求、通知或回應，以換行符分隔。
- <strong>日誌記錄</strong>：伺服器可以將 UTF-8 字串寫入標準錯誤（`stderr`）作為日誌用途。

### 主要要求：
- 訊息必須以換行符分隔，且不得包含內嵌換行符
- 伺服器不得向 `stdout` 輸出非有效的 MCP 訊息
- 客戶端不得向伺服器的 `stdin` 輸入非有效的 MCP 訊息

### TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

在上述程式碼中：

- 我們從 MCP SDK 匯入 `Server` 類別與 `StdioServerTransport`
- 建立伺服器實例，指定基本設定與功能
- 建立 `StdioServerTransport` 實例，並將伺服器連接，使其透過 stdin/stdout 進行通訊

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# 建立伺服器實例
server = Server("example-server")

@server.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

上述程式碼中，我們：

- 使用 MCP SDK 建立伺服器實例
- 使用裝飾器定義工具
- 使用 stdio_server 上下文管理器處理傳輸

### .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

builder.Services.AddLogging(logging => logging.AddConsole());

var app = builder.Build();
await app.RunAsync();
```

與 SSE 不同的主要點在於，stdio 伺服器：

- 不需要設定網頁伺服器或 HTTP 端點
- 由客戶端作為子進程啟動
- 透過 stdin/stdout 串流通訊
- 實作與除錯較為簡單

## 練習：建立 stdio 伺服器

建立伺服器時需注意兩件事：

- 我們需使用網頁伺服器以公開連線與訊息端點。

## 實作實驗：建立簡單 MCP stdio 伺服器

本實驗將使用建議的 stdio 傳輸建立一個簡單 MCP 伺服器。該伺服器會公開工具，供客戶端使用標準 Model Context Protocol 呼叫。

### 先決條件

- Python 3.8 或以上版本
- MCP Python SDK：`pip install mcp`
- 基本非同步程式設計知識

我們先建立第一個 MCP stdio 伺服器：

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# 設定日誌記錄
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 創建伺服器
server = Server("example-stdio-server")

@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool() 
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    # 使用標準輸入輸出傳輸
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## 與已棄用 SSE 方的主要差異

**Stdio 傳輸（現行標準）：**
- 簡單的子進程模型－客戶端啟動伺服器作為子程序
- 透過 stdin/stdout 使用 JSON-RPC 訊息通訊
- 不需設定 HTTP 伺服器
- 具更佳效能與安全性
- 容易除錯與開發

**SSE 傳輸（自 MCP 2025-06-18 起已棄用）：**
- 需搭配 HTTP 伺服器與 SSE 端點
- 需要較複雜的網頁伺服器基礎架構
- HTTP 端點安控需額外考量
- 現由可串流 HTTP 取代用於網頁情境

### 使用 stdio 傳輸建立伺服器

建立 stdio 伺服器步驟：

1. <strong>匯入所需函式庫</strong>－需要 MCP 伺服器組件及 stdio 傳輸
2. <strong>建立伺服器實例</strong>－定義伺服器及其功能
3. <strong>定義工具</strong>－新增想公開的功能
4. <strong>設定傳輸</strong>－配置 stdio 通訊
5. <strong>啟動伺服器</strong>－啟動並處理訊息

逐步建立：

### 第一步：建立基本 stdio 伺服器

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# 配置日誌記錄
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 建立伺服器
server = Server("example-stdio-server")

@server.tool()
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

### 第二步：新增更多工具

```python
@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool()
def calculate_product(a: int, b: int) -> int:
    """Calculate the product of two numbers"""
    return a * b

@server.tool()
def get_server_info() -> dict:
    """Get information about this MCP server"""
    return {
        "server_name": "example-stdio-server",
        "version": "1.0.0",
        "transport": "stdio",
        "capabilities": ["tools"]
    }
```

### 第三步：執行伺服器

將程式碼儲存為 `server.py`，並從指令列執行：

```bash
python server.py
```

伺服器會啟動並等待從 stdin 輸入。它透過 stdio 傳輸使用 JSON-RPC 訊息進行通訊。

### 第四步：使用 Inspector 測試

你可以使用 MCP Inspector 測試伺服器：

1. 安裝 Inspector：`npx @modelcontextprotocol/inspector`
2. 執行 Inspector，並指向你的伺服器
3. 測試你建立的工具

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```

## 除錯你的 stdio 伺服器

### 使用 MCP Inspector

MCP Inspector 是除錯與測試 MCP 伺服器的強大工具。以下為 stdio 伺服器使用方式：

1. **安裝 Inspector**：
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **執行 Inspector**：
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. <strong>測試伺服器</strong>：Inspector 提供一個網頁介面，你可以：
   - 查看伺服器的能力描述
   - 用不同參數測試工具
   - 監控 JSON-RPC 訊息
   - 除錯連線問題

### 使用 VS Code

你也可以直接在 VS Code 除錯 MCP 伺服器：

1. 在 `.vscode/launch.json` 建立啟動設定：
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug MCP Server",
         "type": "python",
         "request": "launch",
         "program": "server.py",
         "console": "integratedTerminal"
       }
     ]
   }
   ```

2. 在伺服器程式碼中設置斷點
3. 執行除錯器並搭配 Inspector 進行測試

### 常見除錯建議

- 使用 `stderr` 記錄日誌，切勿寫入保留給 MCP 訊息的 `stdout`
- 確保所有 JSON-RPC 訊息皆以換行符分隔
- 先用簡單工具測試，再新增複雜功能
- 用 Inspector 驗證訊息格式

## 在 VS Code 中使用 stdio 伺服器

建構完成 MCP stdio 伺服器後，可以將其整合至 VS Code，用於 Claude 或其他 MCP 相容客戶端。

### 配置方法

1. 在 `%APPDATA%\Claude\claude_desktop_config.json`（Windows）或 `~/Library/Application Support/Claude/claude_desktop_config.json`（Mac）建立 MCP 設定檔：

   ```json
   {
     "mcpServers": {
       "example-stdio-server": {
         "command": "python",
         "args": ["path/to/your/server.py"]
       }
     }
   }
   ```

2. **重新啟動 Claude**：關閉並重新開啟 Claude，以讀取新伺服器設定。

3. <strong>測試連線</strong>：開始跟 Claude 對話，嘗試使用你的伺服器工具：
   -「你能用 greeting 工具跟我打招呼嗎？」
   -「計算 15 和 27 的總和」
   -「伺服器資訊是什麼？」

### TypeScript stdio 伺服器範例

以下為完整 TypeScript 範例供參考：

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-stdio-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 新增工具
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_greeting",
        description: "Get a personalized greeting",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_greeting") {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${request.params.arguments?.name}! Welcome to MCP stdio server.`,
        },
      ],
    };
  } else {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

### .NET stdio 伺服器範例

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

var app = builder.Build();
await app.RunAsync();

[McpServerToolType]
public class Tools
{
    [McpServerTool, Description("Get a personalized greeting")]
    public string GetGreeting(string name)
    {
        return $"Hello, {name}! Welcome to MCP stdio server.";
    }

    [McpServerTool, Description("Calculate the sum of two numbers")]
    public int CalculateSum(int a, int b)
    {
        return a + b;
    }
}
```

## 小結

在這堂更新課程中，你學會了：

- 使用現行 **stdio 傳輸** 建構 MCP 伺服器（推薦方式）
- 理解為何 SSE 傳輸被棄用，改用 stdio 與 Streamable HTTP
- 建立可由 MCP 客戶端呼叫使用的工具
- 使用 MCP Inspector 除錯伺服器
- 將 stdio 伺服器整合於 VS Code 與 Claude

與已棄用的 SSE 方法相比，stdio 傳輸提供更簡單、更安全且效能更佳的 MCP 伺服器建構方式。根據 2025-06-18 規範，它是大多數 MCP 伺服器實作的推薦傳輸機制。

### .NET

1. 我們先建立一些工具，為此我們會建立一個 *Tools.cs* 檔案，內容如下：

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## 練習：測試你的 stdio 伺服器

建立了 stdio 伺服器後，接下來要測試它是否正常運作。

### 先決條件

1. 確保已安裝 MCP Inspector：
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. 伺服器程式碼已儲存（例如 `server.py`）

### 使用 Inspector 測試

1. **啟動 Inspector 並加載伺服器**：
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. <strong>開啟網頁介面</strong>：Inspector 會自動開啟瀏覽器視窗，顯示伺服器能力。

3. <strong>測試工具</strong>：
   - 嘗試呼叫 `get_greeting` 工具，傳入不同名稱
   - 測試 `calculate_sum` 工具，輸入不同數字
   - 呼叫 `get_server_info` 工具查看伺服器元資料

4. <strong>監控通訊</strong>：Inspector 顯示客戶端與伺服器間交換的 JSON-RPC 訊息。

### 你應該會看到

當伺服器成功啟動時，你會看到：
- Inspector 列出伺服器功能
- 可用工具供測試
- 成功的 JSON-RPC 訊息交換
- 工具回應顯示在介面中

### 常見問題與解決方法

**伺服器無法啟動：**
- 檢查所有相依套件是否安裝完成：`pip install mcp`
- 驗證 Python 語法與縮排正確
- 留意主控台錯誤訊息

**工具未顯示：**
- 確認使用 `@server.tool()` 裝飾器
- 確保工具函式定義在 `main()` 前
- 檢查伺服器配置是否正確

**連線問題：**
- 確保伺服器使用 stdio 傳輸正確
- 檢查是否有其他程式干擾
- 驗證 Inspector 指令語法

## 作業

試著為你的伺服器加入更多功能。參考 [此頁](https://api.chucknorris.io/) 來新增一個呼叫 API 的工具。你可以自由設計伺服器內容。玩得開心 :)

## 解答

[解答](./solution/README.md) 這裡有一個可用的工作範例代碼。

## 主要重點

本章節的主要重點如下：

- stdio 傳輸是本地 MCP 伺服器的推薦機制。
- stdio 傳輸允許 MCP 伺服器與客戶端透過標準輸入與輸出串流無縫溝通。
- 你可以直接使用 Inspector 與 Visual Studio Code 消費 stdio 伺服器，使除錯與整合更簡單。

## 範例

- [Java 計算器](../samples/java/calculator/README.md)
- [.Net 計算器](../../../../03-GettingStarted/samples/csharp)
- [JavaScript 計算器](../samples/javascript/README.md)
- [TypeScript 計算器](../samples/typescript/README.md)
- [Python 計算器](../../../../03-GettingStarted/samples/python) 

## 其他資源

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## 接下來做什麼

## 下一步

既然你已學會如何建構 stdio 傳輸的 MCP 伺服器，可以繼續探索更進階的主題：

- <strong>下一步</strong>：[使用 MCP 的 HTTP 串流（Streamable HTTP）](../06-http-streaming/README.md) – 了解遠端伺服器使用的另一種支援傳輸機制
- <strong>進階</strong>：[MCP 安全最佳實踐](../../02-Security/README.md) – 為你的 MCP 伺服器實作安全防護
- <strong>正式環境</strong>：[部署策略](../09-deployment/README.md) – 將伺服器部署至生產環境

## 其他資源

- [MCP 規範 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) – 官方規範
- [MCP SDK 文件](https://github.com/modelcontextprotocol/sdk) – 各語言的 SDK 參考文件
- [社群範例](../../06-CommunityContributions/README.md) – 來自社群的更多伺服器範例

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->