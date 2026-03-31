# 設定熱門 MCP Host 用戶端

本指南涵蓋如何使用熱門的 AI host 應用程式配置和使用 MCP 伺服器。每個 host 都有自己的配置方式，但設定完成後，皆會使用標準化協議與 MCP 伺服器通訊。

## 什麼是 MCP Host？

**MCP Host** 是可以連接 MCP 伺服器以擴充功能的 AI 應用程式。可將其視為用戶互動的「前端」，而 MCP 伺服器則提供「後端」工具和資料。

```mermaid
flowchart LR
    User[👤 用戶] --> Host[🖥️ MCP 主機]
    Host --> S1[MCP 伺服器 A]
    Host --> S2[MCP 伺服器 B]
    Host --> S3[MCP 伺服器 C]
    
    subgraph "熱門主機"
        H1[Claude 桌面版]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## 先決條件

- 一個可連接的 MCP 伺服器（參見 [Module 3.1 - First Server](../01-first-server/README.md)）
- Host 應用程式安裝於您的系統
- 對 JSON 配置檔案具備基本認識

---

## 1. Claude Desktop

**Claude Desktop** 是 Anthropic 官方桌面應用程式，原生支援 MCP。

### 安裝

1. 從 [claude.ai/download](https://claude.ai/download) 下載 Claude Desktop  
2. 安裝並使用您的 Anthropic 帳戶登入

### 配置

Claude Desktop 使用 JSON 配置檔來定義 MCP 伺服器。

**配置檔位置：**  
- **macOS**：`~/Library/Application Support/Claude/claude_desktop_config.json`  
- **Windows**：`%APPDATA%\Claude\claude_desktop_config.json`  
- **Linux**：`~/.config/Claude/claude_desktop_config.json`  

**配置範例：**

```json
{
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"],
      "env": {
        "PYTHONPATH": "/path/to/your/server"
      }
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-server/build/index.js"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

### 配置選項

| 欄位 | 說明 | 範例 |
|-------|-------------|---------|
| `command` | 執行的可執行檔 | `"python"`、`"node"`、`"npx"` |
| `args` | 命令列參數 | `["-m", "my_server"]` |
| `env` | 環境變數 | `{"API_KEY": "xxx"}` |
| `cwd` | 工作目錄 | `"/path/to/server"` |

### 測試您的設定

1. 儲存配置檔  
2. 完全重新啟動 Claude Desktop（退出再重新開啟）  
3. 開啟新對話  
4. 查看顯示已連接伺服器的 🔌 圖示  
5. 嘗試要求 Claude 使用您的某個工具

### Claude Desktop 疑難排解

**伺服器未出現：**  
- 使用 JSON 驗證器檢查配置檔語法  
- 確認 command 路徑正確  
- 檢查 Claude Desktop 日誌：Help → Show Logs  

**伺服器啟動時當機：**  
- 先於終端機手動測試伺服器  
- 確認環境變數設定正確  
- 確保所有依賴都已安裝

---

## 2. VS Code 與 GitHub Copilot

VS Code 透過 GitHub Copilot Chat 擴充套件支援 MCP。

### 先決條件

1. 安裝 VS Code 1.99+  
2. 安裝 GitHub Copilot 擴充套件  
3. 安裝 GitHub Copilot Chat 擴充套件

### 配置

VS Code 透過工作區或使用者設定的 `.vscode/mcp.json` 使用 MCP。

**工作區配置** (`.vscode/mcp.json`)：

```json
{
  "servers": {
    "my-calculator": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    },
    "my-database": {
      "type": "sse",
      "url": "http://localhost:8080/sse"
    }
  }
}
```

**使用者設定** (`settings.json`)：

```json
{
  "mcp.servers": {
    "global-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-memory"]
    }
  },
  "mcp.enableLogging": true
}
```

### 在 VS Code 使用 MCP

1. 開啟 Copilot Chat 面板（Ctrl+Shift+I / Cmd+Shift+I）  
2. 輸入 `@` 查看可用 MCP 工具  
3. 使用自然語言呼叫工具：「使用計算器計算 25 * 48」

### VS Code 疑難排解

**MCP 伺服器未加載：**  
- 檢查「輸出」面板 → "MCP" 的錯誤日誌  
- 重新載入視窗：Ctrl+Shift+P → "Developer: Reload Window"  
- 先確認伺服器能獨立運作

---

## 3. Cursor

**Cursor** 是強調 AI 的程式碼編輯器，內建 MCP 支援。

### 安裝

1. 從 [cursor.sh](https://cursor.sh) 下載 Cursor  
2. 安裝並登入

### 配置

Cursor 使用與 Claude Desktop 類似的配置格式。

**配置檔位置：**  
- **macOS**：`~/.cursor/mcp.json`  
- **Windows**：`%USERPROFILE%\.cursor\mcp.json`  
- **Linux**：`~/.cursor/mcp.json`  

**配置範例：**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### 在 Cursor 使用 MCP

1. 開啟 Cursor 的 AI 聊天（Ctrl+L / Cmd+L）  
2. MCP 工具會自動顯示於建議中  
3. 請 AI 使用連接的伺服器完成任務

---

## 4. Cline (終端機版)

**Cline** 是終端機環境下的 MCP 用戶端，非常適合指令列工作流程。

### 安裝

```bash
npm install -g @anthropic/cline
```

### 配置

Cline 透過環境變數及命令列參數設定。

**使用環境變數：**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**使用命令列參數：**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**配置檔** (`~/.clinerc`)：

```json
{
  "apiKey": "your-api-key",
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    }
  }
}
```

### 使用 Cline

```bash
# 開始互動式會話
cline

# 使用 MCP 的單一查詢
cline "Calculate the square root of 144 using the calculator"

# 列出可用的工具
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** 是另一款具備 MCP 功能的 AI 程式碼編輯器。

### 安裝

1. 從 [codeium.com/windsurf](https://codeium.com/windsurf) 下載 Windsurf  
2. 安裝並建立帳戶

### 配置

Windsurf 配置透過設定介面管理：

1. 開啟設定（Ctrl+, / Cmd+,）  
2. 搜尋「MCP」  
3. 點擊「在 settings.json 編輯」

**配置範例：**

```json
{
  "windsurf.mcp.servers": {
    "my-tools": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {}
    }
  },
  "windsurf.mcp.enabled": true
}
```

---

## 傳輸類型比較

不同 host 支援不同的傳輸機制：

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio**（標準輸入/輸出）：適合 host 啟動的本地伺服器  
**SSE/HTTP**：適合遠端伺服器或多客戶端共用的伺服器

---

## 常見疑難排解

### 伺服器無法啟動

1. **先手動測試伺服器：**  
   ```bash
   # 適用於 Python
   python -m your_server_module
   
   # 適用於 Node.js
   node /path/to/server/index.js
   ```

2. **檢查命令路徑：**  
   - 盡可能使用絕對路徑  
   - 確認可執行檔存在於 PATH 中

3. **驗證依賴項：**  
   ```bash
   # Python（蟒蛇程式語言）
   pip list | grep mcp
   
   # Node.js（節點.js）
   npm list @modelcontextprotocol/sdk
   ```

### 伺服器已連線但工具無法使用

1. **檢查伺服器日誌** - 多數 host 有日誌選項  
2. **驗證工具註冊** - 使用 MCP Inspector 測試  
3. **檢查權限** - 部分工具需檔案或網路存取權限

### 環境變數未傳遞

- 部分 host 會清理環境變數  
- 明確使用 `env` 配置欄位  
- 避免在配置檔中放敏感資料（請使用秘密管理）

---

## 安全最佳實踐

1. **切勿將 API 金鑰提交至配置檔**  
2. **以環境變數管理敏感資料**  
3. **限制伺服器權限至必要範圍**  
4. **授權系統存取前請審查伺服器程式碼**  
5. **使用允許清單管理檔案系統和網路存取**

---

## 接下來閱讀

- [3.13 - 使用 MCP Inspector 除錯](../13-mcp-inspector/README.md)  
- [3.1 - 創建您的第一個 MCP 伺服器](../01-first-server/README.md)  
- [Module 5 - 進階主題](../../05-AdvancedTopics/README.md)

---

## 額外資源

- [Claude Desktop MCP 文件](https://docs.anthropic.com/en/docs/claude-desktop/mcp)  
- [VS Code MCP 擴充套件](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)  
- [MCP 規範 - 傳輸](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)  
- [官方 MCP 伺服器註冊庫](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們力求準確，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們對因使用本翻譯而引致的任何誤解或誤釋概不負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->