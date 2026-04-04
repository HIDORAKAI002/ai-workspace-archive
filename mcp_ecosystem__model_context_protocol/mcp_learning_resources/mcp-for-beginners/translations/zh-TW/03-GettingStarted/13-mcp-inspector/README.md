# 使用 MCP Inspector 進行除錯

**MCP Inspector** 是一個重要的除錯工具，讓您能以互動方式測試和排解 MCP 伺服器的問題，而不需完整的 AI 主機應用程式。您可以將它想像成「MCP 的 Postman」－ 提供視覺化介面來送出請求、查看回應，並理解伺服器的行為。

## 為何使用 MCP Inspector？

在建置 MCP 伺服器時，您常會遇到這些挑戰：

- **「伺服器有在運行嗎？」** - Inspector 顯示連線狀態
- **「工具是否註冊正確？」** - Inspector 列出所有可用工具
- **「回應格式是什麼？」** - Inspector 顯示完整 JSON 回應
- **「為什麼這個工具不工作？」** - Inspector 顯示詳細錯誤訊息

## 先決條件

- 已安裝 Node.js 18+
- npm（隨 Node.js 一同安裝）
- 一個可測試的 MCP 伺服器（參見 [模組 3.1 - 第一個伺服器](../01-first-server/README.md)）

## 安裝

### 選項 1：使用 npx 執行（推薦快速測試）

```bash
npx @modelcontextprotocol/inspector
```

### 選項 2：全域安裝

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### 選項 3：加入您的專案中

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

加入到 `package.json`：
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## 連線到您的伺服器

### stdio 伺服器（本地程序）

針對透過標準輸入/輸出通訊的伺服器：

```bash
# Python 伺服器
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js 伺服器
npx @modelcontextprotocol/inspector node ./build/index.js

# 使用環境變數
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP 伺服器（網路）

針對作為 HTTP 服務執行的伺服器：

1. 先啟動您的伺服器：
   ```bash
   python server.py  # 伺服器正在 http://localhost:8080 運行
   ```

2. 啟動 Inspector 並連線：
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Inspector 介面總覽

啟動 Inspector 後，您會看到一個網頁介面（通常位於 `http://localhost:5173`）：

```
┌─────────────────────────────────────────────────────────────┐
│  MCP Inspector                              [Connected ✅]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   🔧 Tools  │  │ 📄 Resources│  │ 💬 Prompts  │         │
│  │    (3)      │  │    (2)      │  │    (1)      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📋 Message Log                                       │ │
│  │  ─────────────────────────────────────────────────── │ │
│  │  → initialize                                         │ │
│  │  ← initialized (server info)                          │ │
│  │  → tools/list                                         │ │
│  │  ← tools (3 tools)                                    │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 測試工具

### 列出可用工具

1. 點選 **Tools** 分頁
2. Inspector 自動呼叫 `tools/list`
3. 您將看到所有註冊工具，包括：
   - 工具名稱
   - 描述
   - 輸入結構（參數）

### 呼叫工具

1. 從清單中選擇一個工具
2. 填寫表單中的必要參數
3. 點選 **Run Tool**
4. 在結果面板查看回應

**範例：測試一個計算機工具**

```
Tool: add
Parameters:
  a: 25
  b: 17

Response:
{
  "content": [
    {
      "type": "text",
      "text": "42"
    }
  ]
}
```

### 除錯工具錯誤

當工具失敗時，Inspector 顯示：

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

常見錯誤碼：
| 代碼 | 含義 |
|------|------|
| -32700 | 解析錯誤（無效 JSON） |
| -32600 | 請求無效 |
| -32601 | 找不到方法 |
| -32602 | 參數無效 |
| -32603 | 內部錯誤 |

---

## 測試資源

### 列出資源

1. 點選 **Resources** 分頁
2. Inspector 呼叫 `resources/list`
3. 您將看到：
   - 資源 URI
   - 名稱與描述
   - MIME 類型

### 讀取資源

1. 選擇一個資源
2. 點選 **Read Resource**
3. 查看回傳的內容

**範例輸出：**

```
Resource: file:///config/settings.json
Content-Type: application/json

{
  "config": {
    "debug": true,
    "maxConnections": 10
  }
}
```

---

## 測試提示詞

### 列出提示詞

1. 點選 **Prompts** 分頁
2. Inspector 呼叫 `prompts/list`
3. 查看可用的提示詞範本

### 取得提示詞

1. 選擇一個提示詞
2. 填寫任何必要的參數
3. 點選 **Get Prompt**
4. 查看渲染出的提示詞訊息

---

## 訊息日誌分析

訊息日誌顯示所有 MCP 協議訊息：

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### 注意事項

- **請求/回應對**：每個 `→` 應有對應的 `←`
- **錯誤訊息**：查看回應中的 `"error"`
- **時間差**：較大的時間間隔可能表示效能問題
- **協議版本**：確保伺服器與客戶端版本一致

---

## VS Code 整合

您可以直接從 VS Code 執行 Inspector：

### 使用 launch.json

加入至 `.vscode/launch.json`：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug with MCP Inspector",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npx",
      "runtimeArgs": [
        "@modelcontextprotocol/inspector",
        "python",
        "${workspaceFolder}/server.py"
      ],
      "console": "integratedTerminal"
    },
    {
      "name": "Debug SSE Server with Inspector",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "preLaunchTask": "Start MCP Inspector"
    }
  ]
}
```

### 使用 Tasks

加入至 `.vscode/tasks.json`：

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npx @modelcontextprotocol/inspector node ${workspaceFolder}/build/index.js",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^$"
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Inspector",
          "endsPattern": "listening"
        }
      }
    }
  ]
}
```

---

## 常見的除錯情境

### 情境 1：伺服器無法連線

**症狀：** Inspector 顯示「Disconnected」或停在「Connecting...」

**檢查清單：**
1. ✅ 伺服器命令是否正確？
2. ✅ 是否安裝所有依賴？
3. ✅ 伺服器路徑是絕對還是相對於目前目錄？
4. ✅ 是否設置了必要的環境變數？

**除錯步驟：**
```bash
# 手動先測試伺服器
python -c "import your_server_module; print('OK')"

# 檢查匯入錯誤
python -m your_server_module 2>&1 | head -20

# 確認已安裝 MCP SDK
pip show mcp
```

### 情境 2：工具未顯示

**症狀：** Tools 分頁顯示空清單

**可能原因：**
1. 伺服器初始化時未註冊工具
2. 伺服器啟動後崩潰
3. `tools/list` 處理器回傳空陣列

**除錯步驟：**
1. 檢查訊息日誌中 `tools/list` 回應
2. 在工具註冊程式碼中加入日誌
3. 確認有使用 `@mcp.tool()` 裝飾器（Python）

### 情境 3：工具回傳錯誤

**症狀：** 呼叫工具回傳錯誤回應

**除錯方法：**
1. 仔細閱讀錯誤訊息
2. 檢查參數類型是否與結構相符
3. 新增 try/catch 並回傳詳細錯誤
4. 查看伺服器日誌中的堆疊追蹤

**範例改良錯誤處理：**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # 工具邏輯在此處
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### 情境 4：資源內容為空

**症狀：** 資源回傳但內容為空或 null

**檢查清單：**
1. ✅ 檔案路徑或 URI 是否正確
2. ✅ 伺服器有讀取資源的權限
3. ✅ 正確回傳了資源內容

---

## 高階 Inspector 功能

### 自訂表頭（SSE）

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### 詳細日誌記錄

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### 錄製工作階段

Inspector 可以匯出訊息日誌供後續分析：
1. 在訊息面板點擊 **Export Log**
2. 儲存 JSON 檔案
3. 與團隊成員共享以便除錯

---

## 最佳實踐

1. **早測試、常測試** - 在開發時使用 Inspector，而非等問題發生後才用
2. **從簡單開始** - 先測試基本連線，再做複雜的工具呼叫
3. **檢查結構** - 很多錯誤來自參數型別不符
4. **閱讀錯誤訊息** - MCP 錯誤通常描述清楚原因
5. **保持 Inspector 開啟** - 幫助您在開發時即時抓到問題

---

## 接下來要做什麼

您已完成模組 3：入門！繼續您的學習：

- [模組 4：實作範例](../../04-PracticalImplementation/README.md)

---

## 其他資源

- [MCP Inspector GitHub 倉庫](https://github.com/modelcontextprotocol/inspector)
- [MCP 規格 - 協議訊息](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 規格](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件係使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的原文版本應視為具權威性的依據。對於重要資訊，建議採用專業人工翻譯。我們對於因使用本翻譯所引起的任何誤解或誤譯概不負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->