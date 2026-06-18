# MCP 伺服器與 stdio 傳輸

> **⚠️ 重要更新**：自 MCP 規範 2025-06-18 起，獨立的 SSE（Server-Sent Events）傳輸已 <strong>停用</strong>，並由「可串流 HTTP」傳輸取代。目前 MCP 規範定義兩種主要傳輸機制：
> 1. **stdio** - 標準輸入/輸出（建議用於本地伺服器）
> 2. **可串流 HTTP** - 適用於可能內部使用 SSE 的遠端伺服器
>
> 本課程已更新為聚焦於 **stdio 傳輸**，這是大多數 MCP 伺服器實作推薦的方式。

stdio 傳輸允許 MCP 伺服器透過標準輸入與輸出流與客戶端通訊。這是目前 MCP 規範中最常用且推薦的傳輸機制，提供簡單且高效的方式來構建可輕鬆整合各種客戶端應用的 MCP 伺服器。

## 概覽

本課程涵蓋如何使用 stdio 傳輸建立與消費 MCP 伺服器。

## 學習目標

完成本課程後，你將能：

- 使用 stdio 傳輸建立 MCP 伺服器。
- 使用 Inspector 進行 MCP 伺服器除錯。
- 使用 Visual Studio Code 消費 MCP 伺服器。
- 了解目前 MCP 傳輸機制及為何推薦使用 stdio。

## stdio 傳輸 - 運作原理

stdio 傳輸是目前 MCP 規範（2025-11-25）支持的兩種傳輸類型之一。運作方式如下：

- <strong>簡單通訊</strong>：伺服器從標準輸入 (`stdin`) 讀取 JSON-RPC 訊息，並將訊息傳送到標準輸出 (`stdout`)。
- <strong>進程基礎</strong>：客戶端將 MCP 伺服器當作子程序啟動。
- <strong>訊息格式</strong>：訊息為獨立的 JSON-RPC 請求、通知或回應，由換行符號分隔。
- <strong>日誌記錄</strong>：伺服器<strong>可以</strong>將 UTF-8 字串寫入標準錯誤輸出 (`stderr`) 作為日誌用途。

### 主要規範：
- 訊息<strong>必須</strong>以換行符號分隔，且<strong>不得</strong>包含內嵌換行符號
- 伺服器<strong>不得</strong>向 `stdout` 寫入非有效 MCP 訊息的內容
- 客戶端<strong>不得</strong>向伺服器 `stdin` 寫入非有效 MCP 訊息的內容

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
- 建立帶有基本設定與能力的伺服器實例
- 建立 `StdioServerTransport` 實例，並將伺服器連接至它，使其可透過 stdin/stdout 進行通信

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

在上述程式碼中，我們：

- 使用 MCP SDK 建立伺服器實例
- 利用裝飾器定義工具
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

與 SSE 的主要差異在於 stdio 伺服器：

- 不需要設置網頁伺服器或 HTTP 端點
- 由客戶端作為子程序啟動
- 透過 stdin/stdout 流進行通訊
- 實作及除錯較為簡單

## 練習：建立 stdio 伺服器

建立伺服器時需記住兩件事：

- 我們需要使用網頁伺服器來暴露連接與訊息端點。

## 實驗室：建立簡易 MCP stdio 伺服器

在此實驗室中，我們將使用推薦的 stdio 傳輸建立簡易 MCP 伺服器。此伺服器將暴露供客戶端透過標準 Model Context Protocol 調用的工具。

### 先決條件

- Python 3.8 或以上版本
- MCP Python SDK：`pip install mcp`
- 對非同步程式設計有基本理解

我們開始建立第一個 MCP stdio 伺服器：

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


## 與已停用 SSE 方案的主要差異

**Stdio 傳輸（目前標準）**：
- 簡單子程序模型 - 客戶端啟動伺服器為子程序
- 透過 stdin/stdout 使用 JSON-RPC 訊息通訊
- 不需設定 HTTP 伺服器
- 更佳效能與安全性
- 容易調試與開發

**SSE 傳輸（自 MCP 2025-06-18 起停用）**：
- 需要 HTTP 伺服器及 SSE 端點
- 設定較複雜，需網頁伺服器架構
- HTTP 端點需額外安全性考量
- 現已由「可串流 HTTP」取代用於網頁場合

### 使用 stdio 傳輸建立伺服器

建立 stdio 伺服器需：

1. <strong>匯入必要函式庫</strong> - 需 MCP 伺服器元件與 stdio 傳輸
2. <strong>建立伺服器實例</strong> - 定義伺服器能力
3. <strong>定義工具</strong> - 加入想要曝光的功能
4. <strong>設定傳輸</strong> - 配置 stdio 通信
5. <strong>啟動伺服器</strong> - 啟動伺服器並處理訊息

我們一步步來建立：

### 步驟 1：建立基本 stdio 伺服器

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

### 步驟 2：新增更多工具

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

### 步驟 3：啟動伺服器

將程式碼保存為 `server.py`，並從命令列執行：

```bash
python server.py
```

伺服器將啟動並等待來自 stdin 的輸入。它使用 JSON-RPC 訊息透過 stdio 傳輸通信。

### 步驟 4：使用 Inspector 測試

你可以使用 MCP Inspector 測試伺服器：

1. 安裝 Inspector：`npx @modelcontextprotocol/inspector`
2. 啟動 Inspector 並指向你的伺服器
3. 測試你建立的工具

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```


## 除錯你的 stdio 伺服器

### 使用 MCP Inspector

MCP Inspector 是調試及測試 MCP 伺服器的重要工具。使用 stdio 伺服器時可依此操作：

1. **安裝 Inspector**：
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **啟動 Inspector**：
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. <strong>測試你的伺服器</strong>：Inspector 提供網頁介面，可進行：
   - 檢視伺服器能力
   - 使用不同參數測試工具
   - 監控 JSON-RPC 訊息
   - 除錯連線問題

### 使用 VS Code

你也能直接在 VS Code 中調試 MCP 伺服器：

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

2. 在伺服器程式中設置斷點
3. 執行除錯器並使用 Inspector 測試

### 常見除錯技巧

- 使用 `stderr` 記錄日誌 - 千萬不要寫入 `stdout`，因其保留給 MCP 訊息
- 確保所有 JSON-RPC 訊息均以換行符分隔
- 先以簡單工具測試，再新增複雜功能
- 使用 Inspector 確認訊息格式正確

## 在 VS Code 中使用你的 stdio 伺服器

建立 MCP stdio 伺服器後，你可以整合進 VS Code，搭配 Claude 或其他相容 MCP 的客戶端使用。

### 設定

1. **建立 MCP 設定檔**，位置為 `%APPDATA%\Claude\claude_desktop_config.json`（Windows）或 `~/Library/Application Support/Claude/claude_desktop_config.json`（Mac）：

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

2. **重啟 Claude**：關閉並重新開啟 Claude 以載入新伺服器設定。

3. <strong>測試連線</strong>：與 Claude 開始對話並嘗試使用伺服器工具：
   - 「你可以用問候工具向我問好嗎？」
   - 「計算 15 和 27 的和」
   - 「伺服器資訊是什麼？」

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

// 添加工具
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

在本更新課程中，你學到了：

- 使用目前推薦的 **stdio 傳輸** 建立 MCP 伺服器
- 理解為何 SSE 傳輸被棄用，改用 stdio 與可串流 HTTP
- 建立可供 MCP 客戶端調用的工具
- 使用 MCP Inspector 除錯伺服器
- 與 VS Code 及 Claude 整合你的 stdio 伺服器

相比已停用的 SSE 方案，stdio 傳輸提供更簡單、安全與高效的 MCP 伺服器構建方式。根據 2025-06-18 規範，stdio 為大多數 MCP 伺服器實作推薦的傳輸機制。

### .NET

1. 讓我們先建立一些工具，為此創建檔案 *Tools.cs*，內容如下：

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## 練習：測試你的 stdio 伺服器

現在你已建立了 stdio 伺服器，接著讓我們測試確保它能正常運作。

### 先決條件

1. 確認你已安裝 MCP Inspector：
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. 伺服器程式碼已保存（例如 `server.py`）

### 使用 Inspector 測試

1. **啟動 Inspector 並搭配伺服器**：
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. <strong>開啟網頁介面</strong>：Inspector 將開啟瀏覽器視窗顯示伺服器能力。

3. <strong>測試工具</strong>：
   - 用不同名字嘗試 `get_greeting` 工具
   - 用各種數字測試 `calculate_sum` 工具
   - 呼叫 `get_server_info` 查看伺服器元資料

4. <strong>監控通訊</strong>：Inspector 顯示客戶端與伺服器間交換的 JSON-RPC 訊息。

### 你應該會看到

當伺服器正常啟動時，應看到：
- Inspector 顯示伺服器能力列表
- 可用工具供測試
- JSON-RPC 訊息成功交換
- 介面顯示工具回應

### 常見問題與解決方案

**伺服器無法啟動：**
- 檢查所有相依套件是否安裝：`pip install mcp`
- 驗證 Python 語法與縮排
- 查看主控台錯誤訊息

**工具不出現：**
- 確認存在 `@server.tool()` 裝飾器
- 確認工具函數在 `main()` 之前定義
- 確認伺服器正確設定

**連線問題：**
- 確保伺服器正確使用 stdio 傳輸
- 檢查無其他程序衝突
- 驗證 Inspector 命令語法

## 作業

嘗試為伺服器新增更多功能。參考 [這頁](https://api.chucknorris.io/) 來新增呼叫 API 的工具。由你決定伺服器長什麼樣子。祝玩得愉快 :)

## 解答

[解答](./solution/README.md) 這裡有一個可運行的範例解答。

## 主要重點

本章關鍵重點如下：

- stdio 傳輸是本地 MCP 伺服器推薦機制。
- stdio 傳輸允許 MCP 伺服器與客戶端透過標準輸入輸出流無縫通訊。
- 你可以使用 Inspector 與 Visual Studio Code 直接消費 stdio 伺服器，方便除錯與整合。

## 範例

- [Java 計算機](../samples/java/calculator/README.md)
- [.Net 計算機](../../../../03-GettingStarted/samples/csharp)
- [JavaScript 計算機](../samples/javascript/README.md)
- [TypeScript 計算機](../samples/typescript/README.md)
- [Python 計算機](../../../../03-GettingStarted/samples/python)

## 其他資源

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## 接下來的內容

## 下一步

學會如何使用 stdio 傳輸建立 MCP 伺服器後，你可以探索更進階的主題：

- <strong>後續</strong>：[MCP 的 HTTP 串流 (可串流 HTTP)](../06-http-streaming/README.md) - 瞭解遠端伺服器另一受支持的傳輸機制
- <strong>進階</strong>：[MCP 安全最佳實踐](../../02-Security/README.md) - 在你的 MCP 伺服器中實作安全性
- <strong>生產環境</strong>：[部署策略](../09-deployment/README.md) - 部署伺服器供生產環境使用

## 其他資源

- [MCP 規範 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - 官方規範
- [MCP SDK 文件](https://github.com/modelcontextprotocol/sdk) - 各語言 SDK 參考
- [社群示例](../../06-CommunityContributions/README.md) - 更多社群提供的伺服器範例

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->