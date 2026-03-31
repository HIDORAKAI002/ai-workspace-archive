# 設定熱門 MCP Host 用戶端

本指南涵蓋如何配置和使用 MCP 伺服器與熱門 AI Host 應用程式。每個 Host 都有自己的配置方式，但設置完成後，它們皆使用標準化協議與 MCP 伺服器通信。

## 甚麼是 MCP Host？

**MCP Host** 是能連接到 MCP 伺服器以擴展功能的 AI 應用程式。可視之為使用者互動的「前端」，而 MCP 伺服器則提供「後端」工具與資料。

```mermaid
flowchart LR
    User[👤 使用者] --> Host[🖥️ MCP 主機]
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
## 前置條件

- 一個 MCP 伺服器可連接（參見 [Module 3.1 - 第一台伺服器](../01-first-server/README.md)）
- 已在系統安裝 Host 應用程式
- 對 JSON 配置檔案有基本了解

---

## 1. Claude Desktop

**Claude Desktop** 是 Anthropic 官方的桌面應用程式，原生支援 MCP。

### 安裝

1. 從 [claude.ai/download](https://claude.ai/download) 下載 Claude Desktop
2. 安裝並使用 Anthropic 帳號登入

### 配置

Claude Desktop 使用 JSON 配置檔定義 MCP 伺服器。

**配置檔位置：**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**範例配置：**

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
| `command` | 執行檔 | `"python"`, `"node"`, `"npx"` |
| `args` | 命令列參數 | `["-m", "my_server"]` |
| `env` | 環境變數 | `{"API_KEY": "xxx"}` |
| `cwd` | 工作目錄 | `"/path/to/server"` |

### 測試設定

1. 儲存配置檔
2. 完全重啟 Claude Desktop（退出後重新開啟）
3. 開啟新對話視窗
4. 尋找表示已連線伺服器的 🔌 圖示
5. 嘗試指令 Claude 使用你其中一個工具

### Claude Desktop 故障排除

**伺服器未出現：**
- 使用 JSON 驗證器檢查配置檔語法
- 確認命令路徑正確
- 查看 Claude Desktop 日誌：幫助 → 顯示日誌

**伺服器啟動崩潰：**
- 先在終端手動測試伺服器
- 確認環境變數設定無誤
- 確保所有依賴已安裝

---

## 2. VS Code 搭配 GitHub Copilot

VS Code 透過 GitHub Copilot Chat 擴充套件支援 MCP。

### 前置條件

1. 已安裝 VS Code 1.99+
2. 安裝 GitHub Copilot 擴充套件
3. 安裝 GitHub Copilot Chat 擴充套件

### 配置

VS Code 使用工作區或使用者設定中的 `.vscode/mcp.json`。

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
3. 使用自然語言呼叫工具：「用計算機計算 25 * 48」

### VS Code 故障排除

**MCP 伺服器無法載入：**
- 查看輸出面板 → 「MCP」的錯誤日誌
- 重新載入視窗：Ctrl+Shift+P → 「開發者：重新載入視窗」
- 確認伺服器本身能獨立運行

---

## 3. Cursor

**Cursor** 是一款以 AI 為核心的程式碼編輯器，內建 MCP 支援。

### 安裝

1. 從 [cursor.sh](https://cursor.sh) 下載 Cursor
2. 安裝並登入

### 配置

Cursor 使用與 Claude Desktop 類似的配置格式。

**配置檔位置：**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**範例配置：**

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
2. MCP 工具會自動出現在建議中
3. 請 AI 使用連線伺服器執行任務

---

## 4. Cline（終端機版本）

**Cline** 是終端機基礎的 MCP 用戶端，適合指令列工作流程。

### 安裝

```bash
npm install -g @anthropic/cline
```

### 配置

Cline 使用環境變數和命令列參數。

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

# 列出可用工具
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** 是另一款支援 MCP 的 AI 程式碼編輯器。

### 安裝

1. 從 [codeium.com/windsurf](https://codeium.com/windsurf) 下載 Windsurf
2. 安裝並建立帳號

### 配置

Windsurf 配置透過設定介面管理：

1. 開啟設定（Ctrl+, / Cmd+,）
2. 搜尋「MCP」
3. 點選「在 settings.json 編輯」

**範例配置：**

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

不同 Host 支援不同傳輸機制：

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio**（標準輸入/輸出）：適合 Host 啟動的本地伺服器  
**SSE/HTTP**：適合遠端伺服器或多用戶共用伺服器

---

## 常見故障排除

### 伺服器無法啟動

1. **先手動測試伺服器：**
   ```bash
   # 適用於 Python
   python -m your_server_module
   
   # 適用於 Node.js
   node /path/to/server/index.js
   ```

2. **檢查命令路徑：**
   - 盡量使用絕對路徑
   - 確保執行檔在 PATH 中

3. **確認依賴關係：**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### 伺服器已連線但工具無法運作

1. **查看伺服器日誌** - 多數 Host 有日誌功能
2. **確認工具註冊** - 使用 MCP Inspector 測試
3. **檢查權限** - 部分工具需文件或網路權限

### 環境變數未傳遞

- 部份 Host 會清理環境變數
- 明確使用 `env` 配置欄位
- 避免在配置檔放敏感資料（改用秘密管理）

---

## 安全最佳實踐

1. **絕不將 API 金鑰提交入配置檔**
2. **敏感資料使用環境變數存放**
3. **限制伺服器權限至必要範圍**
4. **授權前檢閱伺服器程式碼**
5. **使用允許清單控制文件系統和網路存取**

---

## 下一步

- [3.13 - 使用 MCP Inspector 偵錯](../13-mcp-inspector/README.md)
- [3.1 - 建立你的第一台 MCP 伺服器](../01-first-server/README.md)
- [模組 5 - 進階主題](../../05-AdvancedTopics/README.md)

---

## 其他資源

- [Claude Desktop MCP 文件](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [VS Code MCP 擴充套件](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [MCP 規範 - 傳輸](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [官方 MCP 伺服器登錄庫](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。儘管我們致力於確保準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議聘請專業人工翻譯。我們對因使用本翻譯而引起的任何誤解或誤譯不承擔任何責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->