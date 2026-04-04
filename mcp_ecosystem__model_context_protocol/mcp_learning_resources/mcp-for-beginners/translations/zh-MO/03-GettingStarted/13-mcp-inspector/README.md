# 使用 MCP Inspector 進行除錯

**MCP Inspector** 是一款重要的除錯工具，讓你在不需要完整 AI 主機應用程式的情況下，能夠互動式地測試和排除 MCP 伺服器的問題。可以將它視為「MCP 的 Postman」：它提供視覺化介面來傳送請求、查看回應，並了解你的伺服器如何運作。

## 為何使用 MCP Inspector？

在構建 MCP 伺服器時，你經常會遇到以下挑戰：

- **「我的伺服器到底有沒有在運行？」** - Inspector 顯示連線狀態
- **「我的工具是否註冊正確？」** - Inspector 列出所有可用的工具
- **「回應格式是什麼？」** - Inspector 顯示完整的 JSON 回應
- **「為什麼這個工具不工作？」** - Inspector 顯示詳細錯誤訊息

## 前置條件

- 安裝 Node.js 18+ 
- npm（隨 Node.js 附帶）
- 一個可測試的 MCP 伺服器（參見 [Module 3.1 - First Server](../01-first-server/README.md)）

## 安裝

### 選項 1：使用 npx 執行（快速測試推薦）

```bash
npx @modelcontextprotocol/inspector
```

### 選項 2：全域安裝

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### 選項 3：加入你的專案

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

加入 `package.json`：
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## 連接到你的伺服器

### stdio 伺服器（本地進程）

對於通過標準輸入/輸出通訊的伺服器：

```bash
# Python 伺服器
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js 伺服器
npx @modelcontextprotocol/inspector node ./build/index.js

# 使用環境變數
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP 伺服器（網絡）

對於以 HTTP 服務運行的伺服器：

1. 先啟動你的伺服器：
   ```bash
   python server.py  # 伺服器正在 http://localhost:8080 運行
   ```

2. 啟動 Inspector 並連接：
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Inspector 介面總覽

啟動 Inspector 後，你會看到網頁介面（通常是 `http://localhost:5173`）：

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

1. 點擊 **Tools** 分頁
2. Inspector 自動呼叫 `tools/list`
3. 你會看到所有註冊的工具，包括：
   - 工具名稱
   - 描述
   - 輸入規範（參數）

### 呼叫工具

1. 從清單中選擇工具
2. 在表單中填寫所需參數
3. 按下 **Run Tool**
4. 在結果面板查看回應

**範例：測試計算機工具**

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

當工具調用失敗，Inspector 顯示：

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

常見錯誤代碼：
| 代碼 | 含義 |
|------|---------|
| -32700 | 解析錯誤（無效 JSON） |
| -32600 | 無效請求 |
| -32601 | 找不到方法 |
| -32602 | 參數無效 |
| -32603 | 內部錯誤 |

---

## 測試資源

### 列出資源

1. 點擊 **Resources** 分頁
2. Inspector 呼叫 `resources/list`
3. 你會看到：
   - 資源 URI
   - 名稱和描述
   - MIME 類型

### 讀取資源

1. 選擇資源
2. 點擊 **Read Resource**
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

1. 點擊 **Prompts** 分頁
2. Inspector 呼叫 `prompts/list`
3. 查看可用的提示詞模板

### 取得提示詞

1. 選擇提示詞
2. 填寫任何所需參數
3. 點擊 **Get Prompt**
4. 查看呈現的提示訊息

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

### 需要注意的事項

- **請求/回應對**：每個 `→` 應該有對應的 `←`
- **錯誤訊息**：查找回應中的 `"error"`
- **時間點**：較大的間隔可能代表效能問題
- **協議版本**：確保伺服器與用戶端版本一致

---

## VS Code 整合

你可以直接從 VS Code 執行 Inspector：

### 使用 launch.json

加入 `.vscode/launch.json`：

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

加入 `.vscode/tasks.json`：

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

## 常見除錯情境

### 情境 1：伺服器無法連接

**症狀：** Inspector 顯示「Disconnected」或停留在「Connecting...」

**檢查清單：**
1. ✅ 伺服器指令是否正確？
2. ✅ 所有相依套件是否已安裝？
3. ✅ 伺服器路徑是絕對路徑還是相對於當前目錄？
4. ✅ 必要的環境變數是否設置？

**除錯步驟：**
```bash
# 先手動測試伺服器
python -c "import your_server_module; print('OK')"

# 檢查有無導入錯誤
python -m your_server_module 2>&1 | head -20

# 確認已安裝 MCP SDK
pip show mcp
```

### 情境 2：工具未出現

**症狀：** Tools 分頁顯示空清單

**可能原因：**
1. 伺服器初始化時未註冊工具
2. 伺服器啟動後崩潰
3. `tools/list` 處理器回傳空陣列

**除錯步驟：**
1. 查看訊息日誌中的 `tools/list` 回應
2. 在工具註冊程式碼中加入日誌
3. 確認有無 `@mcp.tool()` 裝飾器（Python）

### 情境 3：工具回傳錯誤

**症狀：** 工具呼叫回傳錯誤訊息

**除錯方式：**
1. 仔細閱讀錯誤訊息
2. 檢查參數型別是否符合規範
3. 加入 try/catch 取得詳細錯誤訊息
4. 查看伺服器日誌的堆疊追蹤

**範例改進的錯誤處理：**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # 工具邏輯在此
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
2. ✅ 伺服器是否有權限讀取資源
3. ✅ 資源內容是否正確回傳

---

## 進階 Inspector 功能

### 自訂標頭（SSE）

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### 詳細日誌

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### 紀錄會話

Inspector 可匯出訊息日誌供日後分析：
1. 在訊息面板點擊 **Export Log**
2. 儲存 JSON 檔案
3. 與團隊成員分享以協助除錯

---

## 最佳實踐

1. **及早且經常測試** — 於開發階段就使用 Inspector，不只是出錯時
2. **從簡單開始** — 先測試基本連線，再進行複雜工具調用
3. **檢查規範** — 許多錯誤來自參數型別不符
4. **閱讀錯誤訊息** — MCP 的錯誤訊息通常描述明確
5. **持續開啟 Inspector** — 它能幫助你在開發時及早發現問題

---

## 接下來做什麼

你已完成 Module 3：入門！繼續學習：

- [Module 4：實務應用](../../04-PracticalImplementation/README.md)

---

## 額外資源

- [MCP Inspector GitHub 倉庫](https://github.com/modelcontextprotocol/inspector)
- [MCP 規範 - 協議訊息](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 規範](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件由人工智能翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯。儘管我們盡力確保準確性，但請注意，自動翻譯可能包含錯誤或不準確之處。原文件的母語版本應視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們對因使用本翻譯而引起的任何誤解或曲解不承擔任何責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->