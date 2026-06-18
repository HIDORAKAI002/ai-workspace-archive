# 🔧 模組 3：使用 Microsoft Foundry Toolkit 進階 MCP 開發

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 學習目標

完成此實驗後，你將能夠：

- ✅ 使用 Microsoft Foundry Toolkit 創建自訂 MCP 伺服器
- ✅ 配置並使用最新的 MCP Python SDK (v1.9.3)
- ✅ 設置並使用 MCP Inspector 進行除錯
- ✅ 在 Agent Builder 與 Inspector 環境中除錯 MCP 伺服器
- ✅ 理解進階 MCP 伺服器開發工作流程

## 📋 前置條件

- 完成實驗 2（MCP 基礎）
- 安裝 Microsoft Foundry Toolkit 擴充功能的 VS Code
- Python 3.10+ 環境
- 用於 Inspector 設置的 Node.js 和 npm

## 🏗️ 你將構建的內容

在本實驗中，你將建立一個 **天氣 MCP 伺服器**，演示：

- 自訂 MCP 伺服器實作
- 與 Microsoft Foundry Toolkit Agent Builder 的整合
- 專業除錯工作流程
- 現代 MCP SDK 使用模式

---

## 🔧 核心元件概覽

### 🐍 MCP Python SDK
Model Context Protocol Python SDK 為建立自訂 MCP 伺服器的基礎。你將使用具有強化除錯功能的 1.9.3 版本。

### 🔍 MCP Inspector
一款強大的除錯工具，提供：

- 即時服務監控
- 工具執行視覺化
- 網路請求/回應檢視
- 互動式測試環境

---

## 📖 逐步實作流程

### 步驟 1：在 Agent Builder 創建 WeatherAgent

1. **在 VS Code 中透過 Microsoft Foundry Toolkit 擴充功能啟動 Agent Builder**
2. **建立新代理，設定如下：**
   - 代理名稱：`WeatherAgent`

![Agent Creation](../../../../translated_images/zh-HK/Agent.c9c33f6a412b4cde.webp)

### 步驟 2：初始化 MCP 伺服器專案

1. **在 Agent Builder 中點選 工具 → 新增工具**
2. **選擇「MCP Server」選項**
3. **選擇「建立新的 MCP 伺服器」**
4. **挑選 `python-weather` 範本**
5. **命名你的伺服器為：** `weather_mcp`

![Python Template Selection](../../../../translated_images/zh-HK/Pythontemplate.9d0a2913c6491500.webp)

### 步驟 3：開啟並檢查專案

1. **在 VS Code 中開啟所產生的專案**
2. **檢視專案結構：**
   ```
   weather_mcp/
   ├── src/
   │   ├── __init__.py
   │   └── server.py
   ├── inspector/
   │   ├── package.json
   │   └── package-lock.json
   ├── .vscode/
   │   ├── launch.json
   │   └── tasks.json
   ├── pyproject.toml
   └── README.md
   ```

### 步驟 4：升級至最新 MCP SDK

> **🔍 為何升級？** 我們想使用最新 MCP SDK (v1.9.3) 與 Inspector 服務 (0.14.0)，以獲得強化功能與更佳除錯能力。

#### 4a. 更新 Python 相依套件

**編輯 `pyproject.toml`：** 更新 [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4b. 更新 Inspector 配置

**編輯 `inspector/package.json`：** 更新 [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. 更新 Inspector 相依套件

**編輯 `inspector/package-lock.json`：** 更新 [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 注意：** 此檔案包含大量相依定義，下方為主要架構摘要 — 完整內容保證依賴解析正常。

> **⚡ 完整 Package Lock：** 整個 package-lock.json 約有 3000 行相依定義。上方只顯示關鍵結構 — 請使用提供的檔案以完整解析依賴。

### 步驟 5：設定 VS Code 除錯

*注意：請複製指定路徑中的檔案以替換相對應的本機檔案*

#### 5a. 更新啟動配置

**編輯 `.vscode/launch.json`：**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to Local MCP",
      "type": "debugpy",
      "request": "attach",
      "connect": {
        "host": "localhost",
        "port": 5678
      },
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen",
      "postDebugTask": "Terminate All Tasks"
    },
    {
      "name": "Launch Inspector (Edge)",
      "type": "msedge",
      "request": "launch",
      "url": "http://localhost:6274?timeout=60000&serverUrl=http://localhost:3001/sse#tools",
      "cascadeTerminateToConfigurations": [
        "Attach to Local MCP"
      ],
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Launch Inspector (Chrome)",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:6274?timeout=60000&serverUrl=http://localhost:3001/sse#tools",
      "cascadeTerminateToConfigurations": [
        "Attach to Local MCP"
      ],
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen"
    }
  ],
  "compounds": [
    {
      "name": "Debug in Agent Builder",
      "configurations": [
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Open Agent Builder",
    },
    {
      "name": "Debug in Inspector (Edge)",
      "configurations": [
        "Launch Inspector (Edge)",
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Start MCP Inspector",
      "stopAll": true
    },
    {
      "name": "Debug in Inspector (Chrome)",
      "configurations": [
        "Launch Inspector (Chrome)",
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Start MCP Inspector",
      "stopAll": true
    }
  ]
}
```

**編輯 `.vscode/tasks.json`：**

```
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Server",
      "type": "shell",
      "command": "python -m debugpy --listen 127.0.0.1:5678 src/__init__.py sse",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}",
        "env": {
          "PORT": "3001"
        }
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^.*$",
            "file": 0,
            "location": 1,
            "message": 2
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": ".*",
          "endsPattern": "Application startup complete|running"
        }
      }
    },
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npm run dev:inspector",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}/inspector",
        "env": {
          "CLIENT_PORT": "6274",
          "SERVER_PORT": "6277",
        }
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^.*$",
            "file": 0,
            "location": 1,
            "message": 2
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Starting MCP inspector",
          "endsPattern": "Proxy server listening on port"
        }
      },
      "dependsOn": [
        "Start MCP Server"
      ]
    },
    {
      "label": "Open Agent Builder",
      "type": "shell",
      "command": "echo ${input:openAgentBuilder}",
      "presentation": {
        "reveal": "never"
      },
      "dependsOn": [
        "Start MCP Server"
      ],
    },
    {
      "label": "Terminate All Tasks",
      "command": "echo ${input:terminate}",
      "type": "shell",
      "problemMatcher": []
    }
  ],
  "inputs": [
    {
      "id": "openAgentBuilder",
      "type": "command",
      "command": "ai-mlstudio.agentBuilder",
      "args": {
        "initialMCPs": [ "local-server-weather_mcp" ],
        "triggeredFrom": "vsc-tasks"
      }
    },
    {
      "id": "terminate",
      "type": "command",
      "command": "workbench.action.tasks.terminate",
      "args": "terminateAll"
    }
  ]
}
```


---

## 🚀 執行與測試你的 MCP 伺服器

### 步驟 6：安裝相依套件

完成設定後，執行以下指令：

**安裝 Python 相依：**
```bash
uv sync
```

**安裝 Inspector 相依：**
```bash
cd inspector
npm install
```

### 步驟 7：於 Agent Builder 除錯

1. **按 F5 或使用「在 Agent Builder 除錯」配置**
2. <strong>於除錯面板選擇複合配置</strong>
3. **等待伺服器啟動並開啟 Agent Builder**
4. **使用自然語言查詢測試你的天氣 MCP 伺服器**

輸入提示如下：

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/zh-HK/Result.6ac570f7d2b1d538.webp)

### 步驟 8：於 MCP Inspector 除錯

1. **使用「在 Inspector 除錯」配置 (Edge 或 Chrome)**
2. **造訪 `http://localhost:6274` 開啟 Inspector 介面**
3. **探索互動測試環境：**
   - 瀏覽可用工具
   - 測試工具執行
   - 監測網路請求
   - 除錯伺服器回應

![MCP Inspector Interface](../../../../translated_images/zh-HK/Inspector.5672415cd02fe873.webp)

---

## 🎯 主要學習成果

完成此實驗後，你已：

- [x] **使用 Microsoft Foundry Toolkit 範本建立自訂 MCP 伺服器**
- [x] **升級至最新 MCP SDK** (v1.9.3) 以增強功能
- [x] **配置 Agent Builder 與 Inspector 的專業除錯工作流程**
- [x] **設置 MCP Inspector 進行互動伺服器測試**
- [x] **掌握 VS Code 的 MCP 開發除錯配置**

## 🔧 探索的進階功能

| 功能 | 說明 | 使用案例 |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | 最新協定實作 | 現代伺服器開發 |
| **MCP Inspector 0.14.0** | 互動式除錯工具 | 即時伺服器測試 |
| **VS Code 除錯** | 整合開發環境 | 專業除錯工作流程 |
| **Agent Builder 整合** | 直接連接 Microsoft Foundry Toolkit | 端對端代理測試 |

## 📚 額外資源

- [MCP Python SDK 文件](https://modelcontextprotocol.io/docs/sdk/python)
- [Microsoft Foundry Toolkit 擴充指南](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code 除錯文件](https://code.visualstudio.com/docs/editor/debugging)
- [Model Context Protocol 規範](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 恭喜！** 你已成功完成實驗 3，現在能夠使用專業開發工作流程建立、除錯及部署自訂 MCP 伺服器。

### 🔜 前往下一模組

準備好將你的 MCP 技能應用於實務開發流程了嗎？前往 **[模組 4：實務 MCP 開發 - 自訂 GitHub 複製伺服器](../lab4/README.md)**，你將：

- 建立可生產環境使用、能自動化 GitHub 倉庫操作的 MCP 伺服器
- 實作透過 MCP 的 GitHub 倉庫複製功能
- 與 VS Code 及 GitHub Copilot Agent Mode 整合自訂 MCP 伺服器
- 在生產環境中測試與部署自訂 MCP 伺服器
- 學習給開發者的實務工作流程自動化

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->