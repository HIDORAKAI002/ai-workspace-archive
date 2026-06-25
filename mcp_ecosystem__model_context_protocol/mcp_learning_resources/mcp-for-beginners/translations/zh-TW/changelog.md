# 變更紀錄：MCP 初學者課程

此文件記錄了 Model Context Protocol (MCP) 初學者課程的所有重大變更。變更依逆時間順序（最新變更在前）記錄。

## 2026 年 6 月 24 日

### 新課程：在 Copilot 應用中使用 MCP

- [工具部分](./12-tooling/README.md) 新增工具部分。
- [Copilot 應用中的 MCP](./12-tooling/01-copilot-app/README.md)

## 2026 年 6 月 16 日

### MCP 規範對齊與範例驗證

根據當前<strong>MCP 規範 2025-11-25</strong>及最新官方 SDK 驗證課程，並修正仍存在的過期規範參考，確認核心範例依然可建置與執行。

#### 規範版本修正（2025-06-18 / 2025-03-26 → 2025-11-25）

更新英文內容中仍聲稱較舊規範版本為<em>現行/最新</em>標準的地方，並將連結指向正規的 `modelcontextprotocol.io` 規範路徑：
- **05-AdvancedTopics/mcp-security/README.md**：更新「目前標準」標示、介紹、核心安全原則標題、必須要求標題、Microsoft Entra ID 部分、參考與資源連結、以及結尾的安全通知（共 8 處參考）至 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**：更新附加資源規範連結與「目前標準」標示為 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**：將過時的 `2025-03-26` security-and-trust 連結替換為當前 2025-11-25 的安全最佳實踐頁面
- **03-GettingStarted/14-sampling/README.md**：更新官方抽樣文件連結為 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**：更新現在式「現行 MCP 規範」引用與附加資源規範連結為 2025-11-25（保留歷史 SSE 廢止註解以保持準確性）

#### 範例驗證與現有 SDK

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**：`npm install` 成功解析 `@modelcontextprotocol/sdk@1.29.0`；執行 `tsc --noEmit` 無型別錯誤 — 現有 `McpServer`/`StdioServerTransport` API 繼續有效
- **Python (03-GettingStarted/01-first-server/solution/python)**：使用隔離環境 `.venv`，搭配 `mcp[cli]`（1.27.2）驗證；`py_compile` 成功，`FastMCP.list_tools()` 正確回傳 `add` 與 `subtract` 工具
- 確認所有範例 `@modelcontextprotocol/sdk` 版本範圍（`>=1.26.0` / `^1.26.0` / `^1.27.0`）皆可清楚解析至當前 `1.29.0`，且無破壞性 API 變更

#### 依賴版本同步（消除版本落差）

調升過時 SDK 版本固定，使每個範例均追蹤當前 MCP 發行版本，符合整個 repo 慣例：
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**：`@modelcontextprotocol/sdk` 從 `^1.8.0` 提升至 `>=1.26.0`，並將過時的 `"updated for MCP 2025-06-18"` 套件描述更新為 `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** 與 **lab4/code/github_mcp_server/pyproject.toml**：版本從精確釘定 `mcp==1.23.0` 提升為 `mcp>=1.26.0`；重新產生兩個 `uv.lock` 檔（`uv lock`），使鎖檔解析到當前 `mcp 1.27.2` 並與清單保持同步

#### 課程內容缺口分析 — 最新規範功能覆蓋

確認課程已涵蓋 MCP 2025-11-25 引入或擴展的所有原語，無內容缺漏：
- <strong>抽樣</strong>：課程 03-GettingStarted/14-sampling 加上 05-AdvancedTopics/mcp-sampling
- **引導（包含 URL 模式）**：記錄於 01-CoreConcepts 及 05-AdvancedTopics/mcp-protocol-features
- **根（Roots）**：記錄於 00-Introduction、01-CoreConcepts 和 05-AdvancedTopics/mcp-root-contexts
- **任務（實驗性、長時間運行操作）**：記錄於 01-CoreConcepts 及 05-AdvancedTopics/mcp-protocol-features
- <strong>工具註解</strong>（`readOnlyHint` / `destructiveHint`）：記錄於 01-CoreConcepts 及 05-AdvancedTopics/mcp-protocol-features

### 安全強化與依賴脆弱性修補

對每個依賴清單及範例原始碼執行完整安全掃描，並修正全部報告的 npm 通告及一項程式碼層級發現。修補後，`npm audit` 在每個受檢目錄皆顯示 **0 個脆弱性**。

#### npm 依賴脆弱性（遞移性）— 已解決

分析所有 15 個務必提交的 `package-lock.json`，脆弱性皆限於 MCP Inspector 開發工具、OpenAI 用戶端與 MCP SDK 引入的遞移依賴；全部均在不破壞範例前提下解決：
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** 與 **lab3/code/weather_mcp/inspector**：將 `@modelcontextprotocol/inspector` 版本從 (`0.16.6` / `0.14.1`) 提升至 `0.22.0`，清除套入的 `ajv`、`brace-expansion`、`diff`、`path-to-regexp` 與 `ws` 安全提示。加入 npm `overrides`，強制使用修補的 `shell-quote@1.8.4`，消除 `concurrently` 中帶來的重大安全問題；重生兩個鎖檔（現皆無脆弱性）
- **03-GettingStarted/samples/typescript**：執行 `npm audit fix`，更新遞移性 `qs`（中度風險）為修補版
- **03-GettingStarted/samples/javascript**：執行 `npm audit fix`，更新遞移性 `hono`（中度風險）為修補版
- **03-GettingStarted/03-llm-client/solution/typescript**：執行 `npm audit fix`，更新遞移性 `form-data`（高風險）為修補版
- **03-GettingStarted/11-simple-auth/solution/typescript**：生成缺失的 `package-lock.json`，確保專案可重現與可審計（無脆弱性）

#### 程式碼層級安全修正（OWASP A03: 注入漏洞）

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**：移除 `open_in_vscode` 工具中的 `shell=True`。先前的 `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` 允許資料夾路徑中的 shell 特殊字元被 `cmd.exe` 解釋（命令注入風險）。改為直接啟動解析後的 `Code.exe`，參數帶入資料夾路徑 — 無經過 shell，功能等效且安全

#### Python 依賴稽核

- 使用 `pip-audit` 檢查所有 Python 需求套件集。`05-AdvancedTopics` 與 `03-GettingStarted/samples/python` 均回報 <strong>無已知脆弱性</strong>（其 `mcp` / `httpx` / `pydantic` / `python-dotenv` 範圍皆解析至現有修補版本）
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**：`pip-audit` 偵測遞移依賴 **`werkzeug` 3.1.1** 存有三項 `safe_join` Windows 裝置名稱 DoS 漏洞 — `CVE-2025-66221`、`CVE-2026-21860` 與 `CVE-2026-27199`（皆於 3.1.6 修復）。加入明確安全版本釘定 `werkzeug>=3.1.6`，確保解析至修補版；含 `chainlit` / `mcp` / `semantic-kernel` 堆疊測試均通過

### 產品名稱重塑

更新所有課程內容，以反映微軟產品重塑：

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**：更新 Discord 社群連結
- **AGENTS.md**：更新 Discord 伺服器引用
- **README.md**：更新技術生態系引用
- **study_guide.md**：更新案例研究引用
- **05-AdvancedTopics/README.md**：更新第 5.13 單元標題與描述
- **05-AdvancedTopics/mcp-integration/README.md**：更新章節標題與描述
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**：完整模組標題與內容更新
- **05-AdvancedTopics/mcp-security-entra/README.md**：更新交叉引用連結
- **07-LessonsfromEarlyAdoption/README.md**：更新案例研究引用
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**：更新第 9 節標題、徽章與能力
- **08-BestPractices/README.md**：更新 Discord 社群連結
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**：更新 Discord 頻道引用
- **09-CaseStudy/docs-mcp/solution/python/README.md**：更新模型部署引用
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**：更新 AI 服務表格
- **11-MCPServerHandsOnLabs/03-Setup/README.md**：更新資源引用

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**：更新課程主參考
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**：更新模組標題、概述與所有模組章節標題
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**：更新標題、學習目標、設定指示與資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**：更新標題、學習目標、MCP 主機表格與交叉引用
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**：更新標題、徽章、先決條件與資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**：更新代理建置者引用與回饋連結
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**：更新先決條件與擴充引用

---

## 2026 年 4 月 11 日

### 新課程、文件修正與依賴更新

#### 新增課程內容

**模組 05 - 進階議題**
- **課程 5.17：使用 MCP 進行對抗式多代理推理** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`)：新全面指南涵蓋多代理系統的對抗辯論模式
  - Mermaid 架構圖：兩代理 → 共享 MCP 伺服器 → 辯論稿 → 裁判 → 裁決
  - 以 Python 和 TypeScript 實作的共享 MCP 工具伺服器（`web_search` + `run_python`）
  - 對立系統提示（支持 / 反對 / 裁判）並明確要求工具使用
  - Python、TypeScript 與 C# 的辯論協調者，管理回合與路由參數
  - MCP `ClientSession` 連接辯論協調者與真實工具呼叫
  - 使用案例表（幻覺偵測、威脅模型、API 設計審查、事實驗證、技術選型）
  - 安全考量：沙箱執行、工具調用驗證、速率限制、稽核日誌
  - 三個實作情境的結構化練習（程式碼審查、架構決策、內容審核）

#### 文件修正

**模組 03 - 入門**
- **05-stdio-server/README.md**：修正不完整的 TypeScript stdio 伺服器範例 — 新增漏失的傳輸執行個體化 (`new StdioServerTransport()`) 及 `server.connect(transport)` 呼叫，使其與同節的 Python 與 .NET 範例相符
- **14-sampling/README.md**：修正錯別字 — 將 `"Sampling is an davanced features"` 改為 `"Sampling is an advanced feature"`

#### 課程更新

**主 README.md**
- 在課程表中新增 5.17 節（使用 MCP 進行對抗式多代理推理），含新課程直接連結

**05-AdvancedTopics/README.md**
- 在課程表增加 5.17 節列

**study_guide.md**
- 在思維導圖與進階議題文字描述中新增對抗式多代理推理主題

#### 程式碼與安全修復

**模組 05 - 對抗代理（`mcp-adversarial-agents`）**
- **安全修復 — 命令注入**：在 TypeScript 的 `run_python` 工具中，用 `execFile` + `promisify` 取代 `execSync` 的 shell 字串插入，消除命令注入風險（由 LLM 控制的程式碼現在以純文字 argv 元素傳遞，不涉及 shell）
- **MCP 工具回圈連接**：更新 Python 辯論協調器，改用 `AsyncAnthropic` 客戶端（取代阻塞同步的 `Anthropic`），將活躍的 `ClientSession` 直接傳給每個代理回合，每回合通過 `session.list_tools()` 取得工具定義，並在迴圈中透過 `session.call_tool()` 派發 `tool_use` 模組，直到模型輸出最終文字回應

#### 依賴項更新

- 在多個套件（03-GettingStarted、04-PracticalImplementation、10-StreamliningAIWorkflows）中將 `hono` 升級至 4.12.12
- 在 TypeScript 套件中將 `@hono/node-server` 從 1.19.11 升級至 1.19.13
- 在 Python 套件（10-StreamliningAIWorkflows 第 3 和第 4 實驗）中將 `cryptography` 從 46.0.5 升級至 46.0.7
- 在 10-StreamliningAIWorkflows 檢視器中將 `lodash` 從 4.17.23 升級至 4.18.1

#### 翻譯

- 同步更新 48 種以上語言的翻譯以配合最新原始碼變更（i18n 更新）

---

## 2026 年 2 月 5 日

### 全倉庫驗證及導覽改進

#### 新增課程內容

**模組 03 - 入門指南**
- **12-mcp-hosts/README.md**：新增完整 MCP hosts 設置指南
  - Claude Desktop、VS Code、Cursor、Cline、Windsurf 設置範例
  - 各主流 hosts 的 JSON 配置範本
  - 傳輸類型比較表（stdio、SSE/HTTP、WebSocket）
  - 常見連線問題排除方法
  - 主機配置的安全最佳實踐

- **13-mcp-inspector/README.md**：新增 MCP Inspector 除錯指南
  - 安裝方式（npx、npm 全域、原始碼）
  - 通過 stdio 及 HTTP/SSE 連接伺服器
  - 測試工具、資源及提示詞工作流程
  - MCP Inspector 與 VS Code 集成
  - 常見除錯場景及解決方案

**模組 04 - 實做入門**
- **pagination/README.md**：新增分頁實作指南
  - Python、TypeScript、Java 的游標分頁模式
  - 用戶端分頁處理
  - 游標設計策略（不透明 vs 結構化）
  - 效能優化建議

**模組 05 - 高階主題**
- **mcp-protocol-features/README.md**：新增協議特性深入介紹
  - 進度通知實作
  - 請求取消模式
  - 帶 URI 模式的資源範本
  - 伺服器生命週期管理
  - 日誌等級控制
  - 搭配 JSON-RPC 錯誤碼的錯誤處理模式

#### 導覽修正（24 多個檔案更新）

**主要模組 README**
 現在同時連結到首堂課及下一模組

**02-Security 子檔案**
- 所有 5 份補充安全文件均新增「接下來？」導覽：

**09-CaseStudy 檔案**
- 所有案例研究檔案現具備順序導覽：

**10-StreamliningAI 實驗室**
新增「接下來？」章節於模組 10 總覽和模組 11

#### 程式碼與內容修正

**SDK 與依賴更新**
修正空白 openai 版本為 `^4.95.0`
將 SDK 從 `^1.8.0` 更新為 `>=1.26.0`
將 mcp 版本腳本升級為 `>=1.26.0`

<strong>程式碼修正</strong>
修正無效模型名稱 `gpt-4o-mini` 為 `gpt-4.1-mini`

<strong>內容修正</strong>
修正壞掉的連結 `READMEmd` → `README.md`，修正課程標題 `Module 1-3` → `Module 0-3`，修正大小寫敏感路徑
移除損壞重複的案例研究 5 內容

<strong>初學者指引改進</strong>
新增恰當的介紹、學習目標及先修條件給初學者

#### 課程更新

**主要 README.md**
- 新增 3.12（MCP Hosts）、3.13（MCP Inspector）、4.1（分頁）、5.16（協議特性）項目於課程表

**模組 README**
新增 12 與 13 課程至課程清單
新增實作指南區塊含分頁連結
新增 5.15（自訂傳輸）及 5.16（協議特性）課程

**study_guide.md**
- 更新心智圖包含所有新主題：MCP Hosts 設置、MCP Inspector、分頁策略、協議特性深度解析

## 2026 年 1 月 28 日

### MCP 規範 2025-11-25 合規回顧

#### 核心概念強化（01-CoreConcepts/）
- **新增客戶端原語 - Roots**：新增完整 Roots 客戶端原語文件，幫助伺服器理解檔案系統界限與存取權限
- <strong>工具註解</strong>：新增工具行為註解 (`readOnlyHint`, `destructiveHint`) 文件，輔助工具執行決策
- <strong>採樣呼叫工具</strong>：更新採樣文件，包含 `tools` 與 `toolChoice` 參數，支援模型驅動的採樣期間工具呼叫
- **URL 模式提示**：新增 URL 模式引導文件，支援伺服器發起對外網頁互動
- **工作任務（實驗中）**：新增工作任務部分，解說耐久性執行包裝器及延遲結果擷取
- <strong>圖標支援</strong>：指出工具、資源、資源範本及提示詞均可包含作為附加元資料的圖標

#### 文件更新
- **README.md**：新增 MCP 規範 2025-11-25 版本標示及日期版本控制說明
- **study_guide.md**：課程地圖更新，將工作任務與工具註解納入核心概念，更新文件時間戳記

#### 規範合規驗證
- <strong>協議版本</strong>：確認所有文件均使用最新 MCP 規範 2025-11-25 引用
- <strong>架構對齊</strong>：確認兩層架構（資料層 + 傳輸層）文件準確無誤
- <strong>原語文件</strong>：驗證伺服器原語（資源、提示詞、工具）及客戶端原語（採樣、引導、日誌、Roots）文件
- <strong>傳輸機制</strong>：核實 STDIO 及可串流 HTTP 傳輸文件準確
- <strong>安全指導</strong>：驗證與最新 MCP 安全最佳實踐文件對齊

#### 重要 MCP 2025-11-25 功能文件化
- **OpenID Connect 探勘**：認證伺服器透過 OIDC 探勘
- **OAuth 客戶端 ID 元文件**：建議的客戶端註冊機制
- **JSON Schema 2020-12**：MCP 架構定義的預設方言
- **SDK 分層機制**：正式化 SDK 特性支援與維護需求
- <strong>治理結構</strong>：正式化 MCP 的工作小組與利益小組治理體系

### 安全文件大更新（02-Security/）

#### MCP 安全峰會工作坊（Sherpa）整合
- <strong>新增實作訓練資源</strong>：於所有安全文檔中加入與 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 的完整整合
- <strong>遠征路線覆蓋</strong>：紀錄從基地營到峰頂的全部營地進展
- **OWASP 對齊**：所有安全指導對應 OWASP MCP Azure Security Guide 風險

#### OWASP MCP Top 10 整合
- <strong>新增章節</strong>：在主安全 README 中加入 OWASP MCP Top 10 風險表及 Azure 緩解措施
- <strong>風險導向文件</strong>：更新 mcp-security-controls-2025.md，於各安全領域加入 OWASP MCP 風險標記
- <strong>參考架構</strong>：鏈接到 OWASP MCP Azure Security Guide 參考架構與實作模式

#### 已更新安全檔案
- **README.md**：新增 Sherpa 工作坊總覽、遠征路線表、OWASP MCP Top10 風險摘要及實作訓練章節
- **mcp-security-controls-2025.md**：更新標頭至 2026 年 2 月，增加 OWASP 風險標記 (MCP01-MCP08)，修正規範版本不一致問題
- **mcp-security-best-practices-2025.md**：新增 Sherpa 與 OWASP 資源部分，更新時間戳
- **mcp-best-practices.md**：新增實作訓練章節及 Sherpa/OWASP 連結
- **azure-content-safety-implementation.md**：新增 OWASP MCP06 參照、Sherpa 3 營地對齊及額外資源區塊

#### 新增資源連結
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- 各個別 OWASP MCP 風險頁面 (MCP01-MCP10)

### 全課程 MCP 規範 2025-11-25 對齊

#### 模組 03 - 入門指南
- **SDK 文件**：將 Go SDK 加入官方 SDK 清單；更新所有 SDK 參考以符合 MCP 規範 2025-11-25
- <strong>傳輸說明</strong>：更新 STDIO 與 HTTP 串流傳輸描述，增加明確規範引用

#### 模組 04 - 實做入門
- **SDK 更新**：加入 Go SDK，SDK 清單標示規範版本
- <strong>授權規範</strong>：將 MCP 授權規範連結更新為 2025-11-25 最新版本

#### 模組 05 - 高階主題
- <strong>新增特性</strong>：新增 MCP 規範 2025-11-25 特性說明（工作任務、工具註解、URL 模式提示、Roots）
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 及 Sherpa 工作坊連結於額外參考資料

#### 模組 06 - 社區貢獻
- **SDK 清單**：新增 Swift 與 Rust SDK；更新規範連結至 2025-11-25
- <strong>規範連結</strong>：更新 MCP 規範直達 URL

#### 模組 07 - 早期採用經驗
- <strong>資源更新</strong>：新增 MCP 規範 2025-11-25 及 OWASP MCP Top 10 到附加資源

#### 模組 08 - 最佳實踐
- <strong>規範版本</strong>：更新 MCP 規範參考至 2025-11-25
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 與 Sherpa 工作坊參考連結

#### 模組 10 - 優化 AI 工作流程
- <strong>徽章更新</strong>：將 MCP 版本徽章由 SDK 版本 (1.9.3) 改為規範版本 (2025-11-25)
- <strong>資源連結</strong>：更新 MCP 規範連結；新增 OWASP MCP Top 10

#### 模組 11 - MCP 伺服器動手實驗
- <strong>規範連結</strong>：更新 MCP 規範連結到 2025-11-25 版本
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 至官方資源

## 2025 年 12 月 18 日

### 安全文件更新 – MCP 規範 2025-11-25

#### MCP 安全最佳實踐（02-Security/mcp-best-practices.md）- 規範版本更新
- <strong>協議版本更新</strong>：改為參照最新 MCP 規範 2025-11-25（2025 年 11 月 25 日發布）
  - 所有規範版本參考從 2025-06-18 更新至 2025-11-25
  - 文件日期標記從 2025 年 8 月 18 日更新至 2025 年 12 月 18 日
  - 驗證所有規範 URL 指向最新文檔
- <strong>內容驗證</strong>：全面驗證安全最佳實踐符合最新標準
  - <strong>微軟安全方案</strong>：驗證 Prompt Shields（前稱「越獄風險檢測」）、Azure Content Safety、Microsoft Entra ID 與 Azure Key Vault 的最新術語與連結
  - **OAuth 2.1 安全**：確認符合最新 OAuth 安全最佳實踐
  - **OWASP 標準**：確認 OWASP Top 10 針對大語言模型參考仍然適用
  - **Azure 服務**：核實所有 Microsoft Azure 文件連結及最佳實踐
- <strong>標準符合性</strong>：所有引用的安全標準皆為最新版
  - NIST AI 風險管理框架
  - ISO 27001:2022
  - OAuth 2.1 安全最佳實踐
  - Azure 安全合規框架
- <strong>實作資源</strong>：核實所有實作指南連結與資源
  - Azure API 管理解決方案認證模式
  - Microsoft Entra ID 整合指南
  - Azure Key Vault 秘密管理
  - DevSecOps 管線與監控方案

### 文件品質保證
- <strong>規範合規</strong>：確保所有 MCP 安全必須/必須不做規範要求符合最新規範
- <strong>資源更新性</strong>：確認所有外部連結至微軟文件、安全標準及實作指南皆為最新
- <strong>最佳實踐涵蓋</strong>：全面涵蓋身份驗證、授權、AI 相關威脅、供應鏈安全及企業模式

## 2025 年 10 月 6 日

### 入門章節擴充 – 進階伺服器使用與簡易認證

#### 進階伺服器使用（03-GettingStarted/10-advanced）
- <strong>新增章節</strong>：引入全面的進階 MCP 伺服器使用指南，涵蓋一般及底層伺服器架構。
  - <strong>常規伺服器與低階伺服器比較</strong>：針對兩種方法提供 Python 與 TypeScript 的詳細比較與程式碼範例。
  - <strong>基於處理器的設計</strong>：說明基於處理器的工具/資源/提示管理，以實現可擴展且靈活的伺服器實作。
  - <strong>實用模式</strong>：實際應用情境說明低階伺服器模式如何對進階功能與架構有利。

#### 簡易驗證 (03-GettingStarted/11-simple-auth)
- <strong>新增章節</strong>：分步指南說明在 MCP 伺服器中實作簡易驗證。
  - <strong>驗證概念</strong>：清楚解釋身份驗證與授權之差異，以及憑證處理方式。
  - <strong>基本驗證實作</strong>：Python（Starlette）及 TypeScript（Express）中基於中介軟體的驗證模式與程式碼範例。
  - <strong>進階安全演進</strong>：指導如何從簡易驗證開始，進階至 OAuth 2.1 與 RBAC，並提供進階安全模組參考。

這些新增內容提供實務操作指導，助您建置更穩健、安全且彈性的 MCP 伺服器實作，串連基礎概念與進階生產模式。

## 2025 年 9 月 29 日

### MCP 伺服器資料庫整合實驗室 - 全方位實務學習路徑

#### 11-MCPServerHandsOnLabs - 新完整資料庫整合課程
- **完整 13 個實驗室學習路徑**：新增涵蓋 Postgres 資料庫整合之生產準備 MCP 伺服器建置的全面實務課程
  - <strong>實務案例</strong>：Zava 零售分析案例示範企業級模式
  - <strong>結構化學習進度</strong>：
    - **00-03 實驗室：基礎入門** - 介紹、核心架構、安全與多租戶、環境設定
    - **04-06 實驗室：建置 MCP 伺服器** - 資料庫設計與架構、MCP 伺服器實作、工具開發
    - **07-09 實驗室：進階功能** - 語意搜尋整合、測試與除錯、VS Code 整合
    - **10-12 實驗室：生產與最佳實務** - 部署策略、監控與可觀察性、最佳實務與效能優化
  - <strong>企業技術</strong>：FastMCP 框架、PostgreSQL + pgvector、Azure OpenAI 向量嵌入、Azure Container Apps、Application Insights
  - <strong>進階功能</strong>：資料列層級安全（RLS）、語意搜尋、多租戶資料存取、向量嵌入、即時監控

#### 術語標準化 - 模組改稱為實驗室
- <strong>系統性文件更新</strong>：將 11-MCPServerHandsOnLabs 所有 README 文件中「Module」改為「Lab」
  - <strong>章節標題</strong>：所有 13 個實驗室中，將「What This Module Covers」改為「What This Lab Covers」
  - <strong>內容描述</strong>：「This module provides...」改為「This lab provides...」
  - <strong>學習目標</strong>：將「By the end of this module...」改為「By the end of this lab...」
  - <strong>導覽連結</strong>：所有「Module XX:」改為「Lab XX:」於交叉參考與導覽中
  - <strong>完成追蹤</strong>：將「After completing this module...」改為「After completing this lab...」
  - <strong>技術參考保留</strong>：於設定檔中維持 Python 模組參考（例如 `"module": "mcp_server.main"`）

#### 學習指南強化 (study_guide.md)
- <strong>課程地圖視覺化</strong>：新增「11. Database Integration Labs」區段，詳列全面實驗室架構視圖
- <strong>倉庫結構</strong>：自十個主區塊更新為十一個，新增 11-MCPServerHandsOnLabs 詳細介紹
- <strong>學習路徑指引</strong>：加強導覽以涵蓋 00-11 區段
- <strong>技術覆蓋</strong>：新增 FastMCP、PostgreSQL、Azure 服務整合細節
- <strong>學習成果</strong>：強調生產準備伺服器開發、資料庫整合模式及企業級安全

#### 主 README 結構增強
- <strong>以實驗室為主體術語</strong>：將 11-MCPServerHandsOnLabs 主 README.md 統一更新為「Lab」結構
- <strong>學習路徑組織</strong>：清楚呈現從基礎概念到進階實作，再至生產部署的階段性流程
- <strong>實務為重點</strong>：強調帶有企業級模式與技術的實務操作學習

### 文件品質與一致性改進
- <strong>強調實務操作學習</strong>：全文件統一以實驗室為核心的實務導向
- <strong>突出企業模式</strong>：著重生產準備與企業安全實作
- <strong>技術整合</strong>：全面涵蓋現代 Azure 服務與 AI 整合模式
- <strong>學習進程</strong>：明確且有結構的學習路徑，自基礎至生產部署

## 2025 年 9 月 26 日

### 案例研究強化 - GitHub MCP Registry 整合

#### 案例研究 (09-CaseStudy/) - 生態系開發重點
- **README.md**：大幅擴充，新增完整 GitHub MCP Registry 案例研究
  - **GitHub MCP Registry 案例研究**：新完整專案，探討 GitHub 2025 年 9 月自行發表 MCP Registry
    - <strong>問題分析</strong>：深入剖析 MCP 伺服器發現與部署分散問題
    - <strong>解決架構</strong>：GitHub 統一註冊中心方案，配合一鍵 VS Code 安裝
    - <strong>商業影響</strong>：顯著改善開發者入門與生產力
    - <strong>策略價值</strong>：聚焦模組化代理部署與跨工具互通
    - <strong>生態系開發</strong>：定位為代理系統整合的基礎平台
  - <strong>案例研究結構增強</strong>：更新所有七個案例，統一格式與完整描述
    - Azure AI 旅行代理：多代理協同重點
    - Azure DevOps 整合：工作流程自動化關注
    - 即時文件檢索：Python 控制台客戶端實作
    - 互動學習計畫產生器：Chainlit 對話式網頁應用
    - 編輯器內文件：VS Code 與 GitHub Copilot 整合
    - Azure API 管理：企業 API 整合模式
    - GitHub MCP Registry：生態系開發與社群平台
  - <strong>全面結論</strong>：重寫結論段，涵蓋跨多 MCP 實作維度的七大案例
    - 企業整合、多代理協同、開發者生產力
    - 生態系開發、教育應用分類
    - 詳盡解析架構模式、實作策略與最佳實務
    - 強調 MCP 作為成熟且生產就緒協議

#### 學習指南更新 (study_guide.md)
- <strong>視覺課程地圖</strong>：更新心智圖，包含 GitHub MCP Registry 於案例研究區段
- <strong>案例描述</strong>：由通用描述增為七個完整案例的詳細分解
- <strong>倉庫結構</strong>：更新第 10 區段，反映全面案例研究涵蓋與實作細節
- <strong>變更日誌整合</strong>：加入 2025 年 9 月 26 日條目，說明 GitHub MCP Registry 新增及案例研究增強
- <strong>日期更新</strong>：更新頁尾時間戳，顯示最新修訂（2025 年 9 月 26 日）

### 文件品質改進
- <strong>一致性加強</strong>：統一七個案例研究範例的格式與結構
- <strong>全面覆蓋</strong>：案例涵蓋企業、開發者生產力與生態系開發場景
- <strong>策略定位</strong>：強調 MCP 作為代理系統部署基礎平台
- <strong>資源整合</strong>：更新補充資源包含 GitHub MCP Registry 連結

## 2025 年 9 月 15 日

### 進階主題擴充 - 自訂傳輸與上下文工程

#### MCP 自訂傳輸 (05-AdvancedTopics/mcp-transport/) - 新進階實作指南
- **README.md**：自訂 MCP 傳輸機制完整實作指南
  - **Azure Event Grid 傳輸**：完整無伺服器事件驅動傳輸實作
    - C#、TypeScript 與 Python 範例，整合 Azure Functions
    - 可擴展 MCP 解決方案的事件驅動架構模式
    - Webhook 接收與推送式訊息處理
  - **Azure Event Hubs 傳輸**：高吞吐量串流傳輸實作
    - 低延遲即時串流能力
    - 分區策略與檢查點管理
    - 訊息批次與效能優化
  - <strong>企業整合模式</strong>：生產準備的架構範例
    - 多 Azure Functions 的分散式 MCP 處理
    - 混合傳輸架構結合多種傳輸類型
    - 訊息耐久性、可靠性與錯誤處理策略
  - <strong>安全與監控</strong>：Azure Key Vault 整合與可觀察性模式
    - 托管身分驗證與最小權限存取
    - Application Insights 遙測與效能監控
    - 電路斷路器與容錯模式
  - <strong>測試框架</strong>：自訂傳輸的全面測試策略
    - 單元測試結合測試替身與模擬框架
    - Azure Test Containers 之整合測試
    - 效能與負載測試考量

#### 上下文工程 (05-AdvancedTopics/mcp-contextengineering/) - 新興 AI 領域
- **README.md**：深入探討上下文工程的新興領域
  - <strong>核心原則</strong>：完整上下文分享、行動決策感知及上下文視窗管理
  - **MCP 協議配合**：MCP 設計如何面對上下文工程挑戰
    - 上下文視窗限制與逐步加載策略
    - 關聯性判斷與動態上下文檢索
    - 多模態上下文處理與安全性考量
  - <strong>實作方法</strong>：單線程 vs 多代理架構
    - 上下文切片與優先排序技術
    - 逐步加載與壓縮策略
    - 層級上下文方案與檢索優化
  - <strong>衡量框架</strong>：新興的上下文效益評估指標
    - 輸入效率、效能、品質與用戶體驗
    - 試驗性上下文優化方法
    - 失效分析與改進途徑

#### 課程導覽更新 (README.md)
- <strong>模組結構增強</strong>：新增上下文工程 (5.14) 與自訂傳輸 (5.15) 條目
- <strong>統一格式與導覽鏈結</strong>：所有模組說明一致性更新
- <strong>內容更新</strong>：反映當前內容範圍變動

### 目錄結構改進
- <strong>名稱標準化</strong>：將「mcp transport」重命名為「mcp-transport」，與其他進階主題資料夾一致
- <strong>內容組織</strong>：所有 05-AdvancedTopics 子資料夾均依「mcp-[topic]」命名模式

### 文件品質提升
- **MCP 規範對齊**：新內容參考 MCP 規範 2025-06-18
- <strong>多語言範例</strong>：C#、TypeScript 與 Python 多語言程式範例豐富
- <strong>企業導向</strong>：生產準備模式和 Azure 雲端整合貫穿全文
- <strong>視覺文件</strong>：使用 Mermaid 圖表呈現架構與流程

## 2025 年 8 月 18 日

### 文件全面更新 - MCP 2025-06-18 標準對應

#### MCP 安全最佳實務 (02-Security/) - 完整現代化
- **MCP-SECURITY-BEST-PRACTICES-2025.md**：重新撰寫，符合 MCP 規範 2025-06-18
  - <strong>強制性要求</strong>：新增官方規範 MUST/MUST NOT 規定，搭配明確視覺標示
  - **12 項核心安全實務**：從 15 項列表重構為全面安全範疇
    - 令牌安全與驗證，整合外部身分識別提供者
    - 工作階段管理與傳輸安全，包含密碼學要求
    - AI 專屬威脅防護，整合 Microsoft Prompt Shields
    - 訪問控制與權限，守護最小權限原則
    - 內容安全與監控，整合 Azure Content Safety
    - 供應鏈安全，全面元件驗證
    - OAuth 安全與困惑代表攻擊防範，採用 PKCE
    - 事件響應與復原，具備自動化能力
    - 法規遵循與治理，符合監管標準
    - 先進安全控管，零信任架構
    - 微軟安全生態系整合，全面解決方案
    - 持續安全演進，採用動態實務
  - <strong>微軟安全方案</strong>：強化 Prompt Shields、Azure Content Safety、Entra ID 與 GitHub Advanced Security 整合指導
  - <strong>實作資源</strong>：按官方 MCP 文件、微軟安全方案、安全標準與實施指南分類綜整資源連結

#### 先進安全控管 (02-Security/) - 企業級實作
- **MCP-SECURITY-CONTROLS-2025.md**：全面重構建置企業安全架構
  - **9 大完整安全範疇**：由基礎控管拓展為企業框架
    - 先進身份驗證與授權，整合 Microsoft Entra ID
    - 令牌安全與防傳遞控管，涵蓋全面驗證
    - 工作階段安全控管，防範劫持
    - AI 專屬安全控管，防止提示注入與工具污染
    - 困惑代表攻擊防護，OAuth 代理安全
    - 工具執行安全，沙箱與隔離技術
    - 供應鏈安全控管，依賴關係驗證
    - 監控與檢測控管，SIEM 整合
    - 事件響應與復原，自動化能力
  - <strong>實施範例</strong>：新增詳盡 YAML 配置片段與程式碼示範
  - <strong>微軟方案整合</strong>：涵蓋 Azure 安全服務、GitHub Advanced Security 與企業身分管理

#### 進階安全主題 (05-AdvancedTopics/mcp-security/) - 生產準備實作
- **README.md**：企業安全實作全面重寫
  - <strong>符合最新規範</strong>：更新至 MCP 規範 2025-06-18 強制安全要求
  - <strong>強化驗證</strong>：結合 Microsoft Entra ID 與 .NET 及 Java Spring Security 範例
  - **AI 安全整合**：Microsoft Prompt Shields 與 Azure Content Safety 實作，提供詳盡 Python 範例
  - <strong>先進威脅防範</strong>：完整示範
    - 困惑代表攻擊防護，包含 PKCE 及使用者同意驗證
    - 令牌傳遞防護，結合受眾驗證與安全令牌管理
- 使用密碼學綁定與行為分析防止會話劫持  
- <strong>企業安全整合</strong>：Azure Application Insights 監控、威脅偵測管線及供應鏈安全  
- <strong>實作檢查清單</strong>：明確區分強制與建議的安全控管，並介紹 Microsoft 安全生態系統的優勢  

### 文件品質與標準對齊  
- <strong>規範參考</strong>：所有參考更新至最新 MCP 規範 2025-06-18  
- **Microsoft 安全生態系統**：全方位強化安全文件的整合指導  
- <strong>實務實作</strong>：新增 .NET、Java 與 Python 詳細程式碼範例，涵蓋企業模式  
- <strong>資源組織</strong>：全面分類官方文件、安全標準與實作指南  
- <strong>視覺標示</strong>：清楚標明強制需求與建議實踐  

#### 核心概念 (01-CoreConcepts/) - 完整現代化  
- <strong>協議版本更新</strong>：更新以符合 MCP 規範 2025-06-18，採用日期版本控制 (YYYY-MM-DD 格式)  
- <strong>架構精練</strong>：強化對 Hosts、Clients 與 Servers 的描述，反映最新 MCP 架構模式  
  - Hosts 現明確定義為協調多個 MCP 用戶端連線的 AI 應用  
  - Clients 敘述為維持與 Server 一對一關係的協議連接器  
  - Servers 加強區分本地與遠端部署場景  
- <strong>原語結構調整</strong>：Server 與 Client 原語全面重構  
  - Server 原語：資源（資料來源）、提示（範本）、工具（可執行函數）含詳細說明與範例  
  - Client 原語：取樣（LLM 完成）、誘導（使用者輸入）、日誌（除錯/監控）  
  - 更新現行的發現 (`*/list`)、檢索 (`*/get`) 與執行 (`*/call`) 方法模式  
- <strong>協議架構</strong>：引入雙層架構模型  
  - 資料層：基於 JSON-RPC 2.0，含生命週期管理與原語  
  - 傳輸層：STDIO（本地）與串流式 HTTP 搭配 SSE（遠端）傳輸機制  
- <strong>安全架構</strong>：全面安全原則，包含明確用戶同意、資料隱私保護、工具執行安全與運輸層安全  
- <strong>通訊模式</strong>：更新協議訊息，展現初始化、發現、執行與通知流程  
- <strong>程式碼範例</strong>：更新多語言範例（.NET、Java、Python、JavaScript），反映現行 MCP SDK 樣式  

#### 安全 (02-Security/) - 全面安全改版  
- <strong>標準對齊</strong>：完美符合 MCP 規範 2025-06-18 的安全要求  
- <strong>認證演進</strong>：紀錄自訂 OAuth 伺服器演進至外部識別提供者委派（Microsoft Entra ID）  
- **AI 專屬威脅分析**：加強現代 AI 攻擊向量涵蓋  
  - 詳述提示注入攻擊情境及實例  
  - 工具中毒機制與「地毯式詐騙」攻擊模式  
  - 上下文視窗中毒與模型混淆攻擊  
- **Microsoft AI 安全方案**：全面介紹 Microsoft 安全生態系統  
  - AI 提示防護，含先進偵測、聚焦與界定技術  
  - Azure 內容安全整合模式  
  - GitHub 進階安全以保護供應鏈  
- <strong>進階威脅緩解</strong>：詳細安全控管  
  - 會話劫持含 MCP 專屬攻擊場景與密碼學會話 ID 規範  
  - MCP 代理場景混淆代理問題，含明確同意規範  
  - 令牌直通漏洞，要求強制驗證控制  
- <strong>供應鏈安全</strong>：擴充 AI 供應鏈涵蓋基礎模型、嵌入服務、上下文提供者與第三方 API  
- <strong>基礎安全</strong>：加強企業安全模式的整合，包含零信任架構與 Microsoft 安全生態系統  
- <strong>資源組織</strong>：按類型（官方文件、標準、研究、Microsoft 解決方案、實作指南）分類全面資源連結  

### 文件品質改進  
- <strong>結構化學習目標</strong>：強化具體、可行的學習成效  
- <strong>跨參考鏈結</strong>：新增相關安全與核心概念主題互鏈  
- <strong>最新資訊</strong>：更新所有日期與規範連結至最新標準  
- <strong>實作指導</strong>：全篇新增具體且可操作的實作準則  

## 2025年7月16日

### README 與導覽改進  
- 完全重新設計 README.md 中的課程導覽  
- 以表格格式取代 `<details>` 標籤，增進無障礙性  
- 新增 "alternative_layouts" 資料夾提供另類版面選項  
- 增加卡片式、分頁式與手風琴式導覽範例  
- 更新儲存庫結構章節，涵蓋最新檔案  
- 強化「如何使用本課程」章節，提供清晰建議  
- 更新 MCP 規範連結，指向正確 URL  
- 新增上下文工程章節（5.14）於課程結構  

### 學習指南更新  
- 完整修訂學習指南以符合最新儲存庫結構  
- 新增 MCP Clients 與 Tools 章節，以及熱門 MCP Servers  
- 更新視覺化課程地圖，準確反映所有主題  
- 加強進階主題說明，涵蓋所有專門領域  
- 更新案例研究章節，呈現實際範例  
- 補充此詳細變更日誌  

### 社群貢獻 (06-CommunityContributions/)  
- 新增關於圖像生成 MCP 伺服器的詳盡說明  
- 新增 VSCode 中使用 Claude 的完整章節  
- 新增 Cline 終端機客戶端設定與使用說明  
- 更新 MCP 客戶端章節，涵蓋所有熱門選項  
- 強化貢獻範例，包含更精準的程式碼範本  

### 進階主題 (05-AdvancedTopics/)  
- 統一命名整理所有專門主題資料夾  
- 新增上下文工程教材與範例  
- 新增 Foundry 代理整合文件  
- 強化 Entra ID 安全整合說明  

## 2025年6月11日

### 初次建立  
- 發布 MCP for Beginners 課程首版  
- 建構全部 10 個主要章節的基本架構  
- 實施視覺化課程地圖以利導覽  
- 新增多種程式語言的初始範例專案  

### 快速入門 (03-GettingStarted/)  
- 建立首批伺服器實作範例  
- 新增客戶端開發指導  
- 包含 LLM 客戶端整合說明  
- 新增 VS Code 整合文件  
- 實作 Server-Sent Events (SSE) 伺服器範例  

### 核心概念 (01-CoreConcepts/)  
- 詳述用戶端-伺服器架構  
- 建立主要協議元件文件  
- 記錄 MCP 中的訊息模式  

## 2025年5月23日

### 儲存庫結構  
- 初始化儲存庫，建立基本資料夾結構  
- 為每個主要章節建立 README 文件  
- 設立翻譯基礎架構  
- 新增圖片資源與圖表  

### 文件建立  
- 建立初版 README.md，含課程概覽  
- 新增行為守則 (CODE_OF_CONDUCT.md) 與安全性文件 (SECURITY.md)  
- 設立 SUPPORT.md，提供求助指導  
- 建置初期學習指南架構  

## 2025年4月15日

### 規劃與框架  
- MCP for Beginners 課程初步規劃  
- 定義學習目標與目標受眾  
- 大綱課程的 10 大章節結構  
- 制定範例與案例研究的概念框架  
- 創建重要核心概念的初期原型範例

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->