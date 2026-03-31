# 設定熱門的 MCP Host 用戶端

本指南介紹如何在熱門 AI Host 應用程式中設定並使用 MCP 伺服器。每個 Host 都有自己的設定方式，但設定完成後，他們都使用標準化的協定與 MCP 伺服器通訊。

## 什麼是 MCP Host？

**MCP Host** 是一種可以連接 MCP 伺服器以擴展其功能的 AI 應用程式。可以把它視為使用者互動的「前端」，而 MCP 伺服器則提供「後端」工具和資料。

```mermaid
flowchart LR
    User[👤 使用者] --> Host[🖥️ MCP 主機]
    Host --> S1[MCP 伺服器 A]
    Host --> S2[MCP 伺服器 B]
    Host --> S3[MCP 伺服器 C]
    
    subgraph "熱門主機"
        H1[Claude 桌面]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## 前置條件

- 一個可連接的 MCP 伺服器（請參考 [Module 3.1 - 第一台伺服器](../01-first-server/README.md)）
- Host 應用程式已安裝於您的系統
- 對 JSON 配置文件有基本認識

---

## 1. Claude Desktop

**Claude Desktop** 是 Anthropic 官方桌面應用程式，原生支援 MCP。

### 安裝

1. 從 [claude.ai/download](https://claude.ai/download) 下載 Claude Desktop
2. 安裝並使用 Anthropic 帳號登入

### 設定

Claude Desktop 使用 JSON 配置文件定義 MCP 伺服器。

**配置文件位置：**
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

### 測試您的設定

1. 儲存配置文件
2. 完全重新啟動 Claude Desktop（退出並重新開啟）
3. 開啟新的對話
4. 找尋顯示已連接伺服器的 🔌 圖示
5. 嘗試讓 Claude 使用其中一個工具

### Claude Desktop 除錯

**伺服器未出現：**
- 使用 JSON 驗證工具檢查配置文件語法
- 確認 command 路徑正確
- 查看 Claude Desktop 日誌：幫助 → 顯示日誌

**伺服器啟動時崩潰：**
- 先在終端手動測試您的伺服器
- 確認環境變數設定正確
- 確定所有相依套件已安裝

---

## 2. VS Code 搭配 GitHub Copilot

VS Code 透過 GitHub Copilot Chat 擴充功能支援 MCP。

### 前置條件

1. 安裝 VS Code 1.99 以上版本
2. 安裝 GitHub Copilot 擴充功能
3. 安裝 GitHub Copilot Chat 擴充功能

### 設定

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
2. 輸入 `@` 以看到可用的 MCP 工具
3. 使用自然語言調用工具：「用計算器計算 25 * 48」

### VS Code 除錯

**MCP 伺服器未載入：**
- 查看輸出面板 → 「MCP」錯誤日誌
- 重新載入視窗：Ctrl+Shift+P →「開發者：重新載入視窗」
- 先驗證伺服器能獨立執行

---

## 3. Cursor

**Cursor** 是一款以 AI 為主的程式碼編輯器，內建 MCP 支援。

### 安裝

1. 從 [cursor.sh](https://cursor.sh) 下載 Cursor
2. 安裝並登入

### 設定

Cursor 使用與 Claude Desktop 類似的配置格式。

**配置文件位置：**
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
2. MCP 工具會自動出現在建議清單
3. 向 AI 請求使用連接的伺服器執行任務

---

## 4. Cline（終端機介面）

**Cline** 是一款終端機介面的 MCP 用戶端，適合命令列工作流程。

### 安裝

```bash
npm install -g @anthropic/cline
```

### 設定

Cline 使用環境變數與命令列參數設定。

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

**配置文件** (`~/.clinerc`)：

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
# 啟動互動式會話
cline

# 使用MCP的單一查詢
cline "Calculate the square root of 144 using the calculator"

# 列出可用工具
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** 是另一款具 MCP 支援的 AI 動力程式碼編輯器。

### 安裝

1. 從 [codeium.com/windsurf](https://codeium.com/windsurf) 下載 Windsurf
2. 安裝並創建帳號

### 設定

Windsurf 的設定透過 UI 管理：

1. 開啟設定（Ctrl+, / Cmd+,）
2. 搜尋「MCP」
3. 點擊「在 settings.json 中編輯」

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

不同 Host 支援不同的傳輸機制：

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio**（標準輸入/輸出）：適用於由 Host 啟動的本地伺服器  
**SSE/HTTP**：適合遠端伺服器或多個客戶端共用的伺服器

---

## 常見除錯問題

### 伺服器無法啟動

1. **先手動測試伺服器：**
   ```bash
   # 適用於 Python
   python -m your_server_module
   
   # 適用於 Node.js
   node /path/to/server/index.js
   ```

2. **檢查命令路徑：**
   - 儘可能使用絕對路徑
   - 確保執行檔在您的 PATH 中

3. **驗證相依套件：**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### 伺服器連線成功但工具無法使用

1. **檢查伺服器日誌** — 多數 Host 支援日誌功能  
2. **確認工具已註冊** — 使用 MCP Inspector 測試  
3. **檢查權限** — 有些工具需要檔案或網路存取權限  

### 環境變數未傳遞

- 部分 Host 會過濾環境變數  
- 請在 `env` 配置欄位明確指定  
- 避免在配置檔存放敏感資料（使用秘密管理）

---

## 安全最佳實踐

1. **切勿將 API 金鑰提交至配置檔案**  
2. **使用環境變數存放敏感資料**  
3. **限制伺服器權限至必要範圍**  
4. **授權存取系統前仔細審核伺服器程式碼**  
5. **使用允許清單管控檔案系統及網路存取**

---

## 接下來的內容

- [3.13 - 使用 MCP Inspector 進行除錯](../13-mcp-inspector/README.md)
- [3.1 - 建立您的第一台 MCP 伺服器](../01-first-server/README.md)
- [模組 5 - 進階主題](../../05-AdvancedTopics/README.md)

---

## 其他資源

- [Claude Desktop MCP 文件](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [VS Code MCP 擴充功能](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [MCP 規範 - 傳輸層](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [官方 MCP 伺服器註冊表](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件係由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 所翻譯而成。雖然我們力求準確，但請注意自動翻譯可能包含錯誤或不準確之處。文件原文的母語版本應被視為權威來源。對於重要資訊，建議採用專業人工翻譯。對於因使用本翻譯而引起的任何誤解或誤釋，我們不承擔任何責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->