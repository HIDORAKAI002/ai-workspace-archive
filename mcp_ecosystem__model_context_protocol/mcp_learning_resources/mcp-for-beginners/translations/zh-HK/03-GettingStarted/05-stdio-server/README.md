# MCP 伺服器與 stdio 傳輸

> **⚠️ 重要更新**：自 MCP 規範 2025-06-18 起，獨立 SSE（Server-Sent Events）傳輸已被<strong>棄用</strong>，取而代之為「可串流 HTTP」傳輸。當前的 MCP 規範定義了兩種主要的傳輸機制：
> 1. **stdio** - 標準輸入/輸出（建議用於本地伺服器）
> 2. **可串流 HTTP** - 用於可能內部使用 SSE 的遠端伺服器
>
> 本課程已更新，重點放在<strong>stdio 傳輸</strong>，這是大多數 MCP 伺服器實作的推薦方式。

stdio 傳輸允許 MCP 伺服器透過標準輸入與輸出串流與客戶端通訊。這是在現行 MCP 規範中最常使用且推薦的傳輸機制，提供了一種簡單且有效的方法來構建 MCP 伺服器，便於與各種客戶端應用程式整合。

## 概述

本課程涵蓋如何使用 stdio 傳輸建立及使用 MCP 伺服器。

## 學習目標

完成此課程後，您將能夠：

- 使用 stdio 傳輸建立 MCP 伺服器。
- 使用 Inspector 除錯 MCP 伺服器。
- 使用 Visual Studio Code 使用 MCP 伺服器。
- 理解當前 MCP 傳輸機制及為何推薦 stdio。

## stdio 傳輸 - 運作方式

stdio 傳輸是當前 MCP 規範（2025-11-25）支持的兩種傳輸類型之一。其工作方式如下：

- <strong>簡單通訊</strong>：伺服器從標準輸入（`stdin`）讀取 JSON-RPC 訊息，並向標準輸出（`stdout`）發送訊息。
- <strong>基於程序</strong>：客戶端將 MCP 伺服器作為子程序啟動。
- <strong>訊息格式</strong>：訊息為獨立 JSON-RPC 請求、通知或回應，以換行符分隔。
- <strong>日誌記錄</strong>：伺服器可將 UTF-8 字串寫入標準錯誤（`stderr`）以供日誌使用。

### 主要要求：
- 訊息必須以換行符分隔，且不得包含嵌入換行符
- 伺服器不得向 `stdout` 寫入非有效 MCP 訊息的內容
- 客戶端不得向伺服器的 `stdin` 寫入非有效 MCP 訊息的內容

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

前述程式碼中：

- 引入 MCP SDK 的 `Server` 類別與 `StdioServerTransport`
- 使用基本設定與功能建立伺服器實例
- 建立 `StdioServerTransport` 實例並將伺服器連接，使其透過 stdin/stdout 通訊

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

在前述程式碼中我們：

- 使用 MCP SDK 建立伺服器實例
- 透過裝飾器定義工具
- 使用 stdio_server 佔用管理員處理傳輸

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

與 SSE 不同的關鍵是 stdio 伺服器：

- 不需設定網頁伺服器或 HTTP 端點
- 由客戶端啟動為子程序
- 透過 stdin/stdout 串流通訊
- 實作與除錯更簡單

## 練習：建立 stdio 伺服器

建立伺服器需記住兩件事：

- 我們需要使用網頁伺服器來曝光連線與訊息的端點。

## 實驗室：建立簡單 MCP stdio 伺服器

在本實驗室中，我們將使用推薦的 stdio 傳輸建立一個簡單的 MCP 伺服器。此伺服器會曝露工具，供客戶端透過標準 Model Context Protocol 呼叫。

### 先決條件

- Python 3.8 或以上版本
- MCP Python SDK：`pip install mcp`
- 基本非同步程式設計理解

我們先建立第一個 MCP stdio 伺服器：

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# 配置日誌記錄
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
    # 使用 stdio 傳輸
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## 與已棄用 SSE 方法的主要差異

**Stdio 傳輸（現行標準）：**
- 簡單的子程序模型 — 客戶端啟動伺服器為子程序
- 使用 stdin/stdout 透過 JSON-RPC 訊息通訊
- 無需 HTTP 伺服器設置
- 性能及安全性更佳
- 除錯與開發更易

**SSE 傳輸（於 MCP 2025-06-18 起棄用）：**
- 需要具備 SSE 端點的 HTTP 伺服器
- 網頁伺服器架構較複雜
- HTTP 端點有額外的安全考量
- 現由可串流 HTTP 取代，適用網頁場景

### 使用 stdio 傳輸建立伺服器

我們的步驟如下：

1. <strong>匯入必要函式庫</strong> — 取得 MCP 伺服器元件與 stdio 傳輸
2. <strong>建立伺服器實例</strong> — 定義伺服器及其功能
3. <strong>定義工具</strong> — 加入想曝光的功能
4. <strong>設定傳輸</strong> — 配置 stdio 通訊
5. <strong>執行伺服器</strong> — 啟動伺服器並處理訊息

逐步建構如下：

### 步驟 1：建立基本的 stdio 伺服器

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# 設定日誌紀錄
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

### 步驟 2：增加更多工具

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

### 步驟 3：執行伺服器

將程式碼儲存為 `server.py`，並從命令列執行：

```bash
python server.py
```

伺服器啟動後會等待從 stdin 輸入，並使用 JSON-RPC 訊息透過 stdio 傳輸通信。

### 步驟 4：使用 Inspector 測試

您可以使用 MCP Inspector 測試伺服器：

1. 安裝 Inspector：`npx @modelcontextprotocol/inspector`
2. 執行 Inspector，指向您的伺服器
3. 測試您建立的工具

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## 除錯您的 stdio 伺服器

### 使用 MCP Inspector

MCP Inspector 是除錯和測試 MCP 伺服器的實用工具。如何搭配 stdio 伺服器使用：

1. **安裝 Inspector**：
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **啟動 Inspector**：
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. <strong>測試伺服器</strong>：Inspector 提供一個網頁介面，您可以：
   - 查看伺服器功能
   - 使用不同參數測試工具
   - 監控 JSON-RPC 訊息
   - 除錯連線問題

### 使用 VS Code

您也可以直接在 VS Code 除錯 MCP 伺服器：

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

2. 在伺服器程式碼中設定斷點
3. 啟動除錯器並用 Inspector 測試

### 常見除錯提示

- 使用 `stderr` 來記錄日誌 - 切勿向 `stdout` 寫入，該保留給 MCP 訊息
- 確保所有 JSON-RPC 訊息皆以換行符分隔
- 先用簡單工具測試，再加入複雜功能
- 使用 Inspector 驗證訊息格式

## 在 VS Code 中使用您的 stdio 伺服器

完成 MCP stdio 伺服器後，您可以將其與 VS Code 整合，與 Claude 或其他相容 MCP 的客戶端搭配使用。

### 配置

1. **建立 MCP 配置檔**，路徑為 `%APPDATA%\Claude\claude_desktop_config.json`（Windows）或 `~/Library/Application Support/Claude/claude_desktop_config.json`（Mac）：

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

2. **重新啟動 Claude**：關閉並重新開啟 Claude，載入新的伺服器配置。

3. <strong>測試連線</strong>：與 Claude 開啟對話，嘗試使用您的伺服器工具：
   - 「可以用問候工具向我問好嗎？」
   - 「計算 15 和 27 的和」
   - 「伺服器資訊是什麼？」

### TypeScript stdio 伺服器範例

以下為完整的 TypeScript 範例供參考：

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

## 總結

在這堂更新的課程中，您學會了如何：

- 使用現行的 **stdio 傳輸** 建立 MCP 伺服器（推薦方法）
- 理解 SSE 傳輸被棄用並由 stdio 與可串流 HTTP 取代的原因
- 建立可供 MCP 客戶端呼叫的工具
- 使用 MCP Inspector 除錯伺服器
- 將您的 stdio 伺服器與 VS Code 及 Claude 整合

相比棄用的 SSE 方法，stdio 傳輸提供了更簡單、更安全且性能更好的 MCP 伺服器建立方式。依照 2025-06-18 的規範，stdio 是多數 MCP 伺服器實作的推薦傳輸機制。

### .NET

1. 先建立一些工具，為此我們會建立文件 *Tools.cs*，內容如下：

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## 練習：測試您的 stdio 伺服器

建立完 stdio 伺服器後，讓我們測試它是否運作正常。

### 先決條件

1. 確認您已安裝 MCP Inspector：
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. 您的伺服器程式已儲存（例如 `server.py`）

### 使用 Inspector 測試

1. **啟動 Inspector 並搭配您的伺服器**：
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. <strong>開啟網頁介面</strong>：Inspector 將開啟瀏覽器視窗，顯示您的伺服器功能。

3. <strong>測試工具</strong>：
   - 嘗試 `get_greeting` 工具並使用不同名稱
   - 測試 `calculate_sum` 工具與各種數字
   - 呼叫 `get_server_info` 工具查看伺服器元資料

4. <strong>監控通訊</strong>：Inspector 顯示客戶端與伺服器之間交換的 JSON-RPC 訊息。

### 您應看到的畫面

伺服器正常啟動時，您應看到：
- Inspector 中列出的伺服器功能
- 可用於測試的工具
- 成功交換的 JSON-RPC 訊息
- 介面顯示工具回應

### 常見問題及解決方案

**伺服器無法啟動：**
- 檢查是否安裝所有相依套件：`pip install mcp`
- 驗證 Python 語法與縮排
- 檢查控制台錯誤訊息

**工具未出現：**
- 確認是否有 `@server.tool()` 裝飾器
- 確保工具函式在 `main()` 前已定義
- 驗證伺服器設定正確

**連線問題：**
- 確認伺服器是否正確使用 stdio 傳輸
- 檢查是否有其他程序干擾
- 驗證 Inspector 命令語法正確

## 作業

試著擴充您的伺服器功能。參考[此頁](https://api.chucknorris.io/)，例如加入呼叫 API 的工具。伺服器應該長成什麼樣子由您決定，祝您玩得愉快 :)

## 解答

[解答](./solution/README.md) 這裡有一個可用的程式碼範例解答。

## 重要重點整理

本章節的重點如下：

- stdio 傳輸是本地 MCP 伺服器推薦的通訊機制。
- stdio 傳輸允許 MCP 伺服器與客戶端透過標準輸入和輸出無縫通訊。
- 您可以直接用 Inspector 與 Visual Studio Code 使用 stdio 伺服器，使除錯與整合更容易。

## 範例

- [Java 計算機](../samples/java/calculator/README.md)
- [.Net 計算機](../../../../03-GettingStarted/samples/csharp)
- [JavaScript 計算機](../samples/javascript/README.md)
- [TypeScript 計算機](../samples/typescript/README.md)
- [Python 計算機](../../../../03-GettingStarted/samples/python)

## 額外資源

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## 下一步

## 後續步驟

既然您已學會如何使用 stdio 傳輸建立 MCP 伺服器，可以探索進階主題：

- <strong>下一步</strong>：[MCP 的 HTTP 串流（可串流 HTTP）](../06-http-streaming/README.md) — 瞭解遠端伺服器支持的另一傳輸機制
- <strong>進階</strong>：[MCP 安全最佳實踐](../../02-Security/README.md) — 在您的 MCP 伺服器實現安全性
- <strong>生產環境</strong>：[部署策略](../09-deployment/README.md) — 將您的伺服器部署到生產環境

## 額外資源

- [MCP 規範 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) — 官方規範
- [MCP SDK 文件](https://github.com/modelcontextprotocol/sdk) — 各語言的 SDK 參考
- [社群範例](../../06-CommunityContributions/README.md) — 更多社群伺服器範例

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->