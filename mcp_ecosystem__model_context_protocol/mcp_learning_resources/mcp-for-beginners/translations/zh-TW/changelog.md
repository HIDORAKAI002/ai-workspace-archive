# 變更紀錄：MCP 初學者課程

本文件作為 Model Context Protocol (MCP) 初學者課程所有重大變更的紀錄。變更以逆時間順序記錄（最新變更優先）。

## 2026 年 7 月 2 日

### 新課程：2026-07-28 MCP 規範候選版本

新增涵蓋即將發布的 `2026-07-28` MCP 規範候選版本（於 2026 年 5 月 21 日宣布；正式發布預計於 2026 年 7 月 28 日），內容綜合自[官方公告部落格文章](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)。課程基線仍維持為 **MCP Specification 2025-11-25**，直至新版發佈，因此此處呈現為前瞻指引，而非現有課程的重寫。

- <strong>新增</strong>: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — 完整課程涵蓋無狀態協定核心（移除 `initialize` 握手與 `Mcp-Session-Id`）、新的 `Mcp-Method`/`Mcp-Name` 路由標頭、`ttlMs`/`cacheScope` 快取元資料、_meta 中的 W3C Trace Context、正式的擴展框架（MCP 應用與全新 Tasks 擴展）、六項授權強化的 SEP、Roots/Sampling/Logging 的棄用，以及全面改用 JSON Schema 2020-12 作為工具結構描述。
- <strong>更新</strong> 並附前瞻提示，連結至新課程：
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md)：協定版本註記、Sampling/Roots/Logging/Tasks 章節，以及「未來展望」
  - [02-Security/README.md](./02-Security/README.md)：授權強化提示
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md)：無狀態傳輸提示
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md)：Sampling 棄用提示
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md)：Logging 棄用與 Tasks 擴展提示
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md)：無狀態/會話路由提示
  - [README.md](./README.md)：規範章節中的「展望未來」說明，及課程模組列表新增 `1.1` 項目
  - [study_guide.md](./study_guide.md)：核心概念概覽下的前瞻要點和加註的日期附錄
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md)：在無狀態請求模型之前的 `mcp-session-id` 傳輸映射提示
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md)：模組概覽對 Root Contexts/Sampling 棄用及 Tasks 擴展的提示
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md)：授權強化提示

## 2026 年 6 月 24 日

### 新課程：在 Copilot 應用中使用 MCP

- [Tooling 章節](./12-tooling/README.md) 新增工具環節。
- [Copilot 應用中的 MCP](./12-tooling/01-copilot-app/README.md)

## 2026 年 6 月 16 日

### MCP 規範對齊與範例驗證

對照當前 **MCP Specification 2025-11-25** 及最新官方 SDK，驗證課程內容，修正所有過時之規範引用，並確認核心範例程式碼仍能編譯及執行。

#### 規範版本更正 (2025-06-18 / 2025-03-26 → 2025-11-25)

更新所有仍聲稱舊版規範為<em>目前/最新</em>標準的英文內容，並將連結指定至正規 `modelcontextprotocol.io` 規範路徑：
- **05-AdvancedTopics/mcp-security/README.md**: 更新「目前標準」橫幅、介紹、核心安全原則標題、必須要求標題、Microsoft Entra ID 章節、參考與資源連結，以及結尾安全公告（8項參考）至 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: 更新額外資源規範連結與「目前標準」橫幅至 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: 將過時的 `2025-03-26` 安全與信任連結替換為現行 2025-11-25 安全最佳實踐頁面
- **03-GettingStarted/14-sampling/README.md**: 更新官方 Sampling 文件連結至 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: 更新現時態「目前 MCP 規範」說明及額外資源規範連結至 2025-11-25（為準確保留歷史 SSE 棄用註記）

#### 與現行 SDK 的範例驗證

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` 解析至 `@modelcontextprotocol/sdk@1.29.0`；`tsc --noEmit` 無型別錯誤，現有 `McpServer`/`StdioServerTransport` API 依然有效
- **Python (03-GettingStarted/01-first-server/solution/python)**: 在隔離 `.venv` 中驗證，使用 `mcp[cli]` (1.27.2)；`py_compile` 通過，`FastMCP.list_tools()` 正確返回 `add` 和 `subtract` 工具
- 確認所有範例中 `@modelcontextprotocol/sdk` 版本範圍（`>=1.26.0` / `^1.26.0` / `^1.27.0`）皆能無誤解析至目前 `1.29.0`，無破壞性 API 變更

#### 相依性鎖定調整（消除版本落差）

提升過時的 SDK 鎖定，使所有範例追蹤當前 MCP 版本，符合整個倉庫慣例：
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: 將 `@modelcontextprotocol/sdk` 由 `^1.8.0` 升級為 `>=1.26.0`，並將過時的 `"updated for MCP 2025-06-18"` 套件說明改為 `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** 與 **lab4/code/github_mcp_server/pyproject.toml**: 將精確鎖定 `mcp==1.23.0` 升級為 `mcp>=1.26.0`；重新產生兩個 `uv.lock` 檔案（`uv lock`）以確保鎖檔解析至當前 `mcp 1.27.2` 並與清單同步

#### 課程缺口分析 — 最新規範功能涵蓋

確認課程已涵蓋 MCP 2025-11-25 引入/擴展的所有原語，無內容缺口：
- **Sampling**：涵蓋於 03-GettingStarted/14-sampling 與 05-AdvancedTopics/mcp-sampling 課程中
- **誘導（含 URL 模式）**：記錄於 01-CoreConcepts 與 05-AdvancedTopics/mcp-protocol-features
- **Roots**：記錄於 00-Introduction、01-CoreConcepts 與 05-AdvancedTopics/mcp-root-contexts
- **Tasks（實驗性，長時間運作）**：記錄於 01-CoreConcepts 與 05-AdvancedTopics/mcp-protocol-features
- <strong>工具註解</strong> (`readOnlyHint` / `destructiveHint`)：記錄於 01-CoreConcepts 與 05-AdvancedTopics/mcp-protocol-features

### 安全強化與依賴漏洞修復

對所有依賴項清單及範例原始碼進行全面安全審查，修復所有報告的 npm 警告及一項代碼層級問題。修復後，`npm audit` 對所有審核目錄皆回報 **0 漏洞**。

#### npm 相依漏洞（間接）— 修復完成

審核所有 15 份提交的 `package-lock.json`，漏洞皆限於由 MCP Inspector 開發工具、OpenAI 用戶端與 MCP SDK 引入的間接依賴，皆已修復且未破壞範例：
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** 與 **lab3/code/weather_mcp/inspector**：升級 `@modelcontextprotocol/inspector`（`0.16.6` / `0.14.1` → `0.22.0`），清除其中附帶的 `ajv`、`brace-expansion`、`diff`、`path-to-regexp` 與 `ws` 漏洞。新增 npm `overrides` 項目強制使用修補後的 `shell-quote@1.8.4`，消除由 `concurrently` 帶入的剩餘高危漏洞；重新產生兩個鎖檔（現在 0 漏洞）
- **03-GettingStarted/samples/typescript**：`npm audit fix` 更新了間接依賴 `qs`（中等風險）到修補版
- **03-GettingStarted/samples/javascript**：`npm audit fix` 更新了間接依賴 `hono`（中等風險）到修補版
- **03-GettingStarted/03-llm-client/solution/typescript**：`npm audit fix` 更新了間接依賴 `form-data`（高風險）到修補版
- **03-GettingStarted/11-simple-auth/solution/typescript**：產出缺失的 `package-lock.json`，使專案可復現且可審核（0 漏洞）

#### 代碼層級安全修正（OWASP A03：注入）

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**：移除 `open_in_vscode` 工具中 `shell=True`。之前的 `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` 允許資料夾路徑中出現 shell 元字元供 `cmd.exe` 解譯（命令注入漏洞）。現改為直接啟動解析後的 `Code.exe` 並以資料夾路徑為參數——無 shell ——功能等效且安全

#### Python 依賴安全審核

- 使用 `pip-audit` 審核所有 Python 需求套件集。`05-AdvancedTopics` 與 `03-GettingStarted/samples/python` 均回報 <strong>無已知漏洞</strong>（其 `mcp` / `httpx` / `pydantic` / `python-dotenv` 範圍均指向已修補版本）
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**：`pip-audit` 報告間接依賴 **`werkzeug` 3.1.1** 含三項 `safe_join` Windows 裝置名稱型 DoS 漏洞 — `CVE-2025-66221`、`CVE-2026-21860`、`CVE-2026-27199`（皆於 3.1.6 修復）。新增明確安全鎖定 `werkzeug>=3.1.6`，使解析至修補釋出；並確認該約束與 `chainlit` / `mcp` / `semantic-kernel` 堆疊乾淨解析

### 產品名稱重新品牌化

更新所有課程內容以反映微軟產品重新命名：

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**：更新 Discord 社群連結
- **AGENTS.md**：更新 Discord 伺服器參考
- **README.md**：更新技術生態系統參考
- **study_guide.md**：更新案例研究參考
- **05-AdvancedTopics/README.md**：更新模組 5.13 標題與描述
- **05-AdvancedTopics/mcp-integration/README.md**：更新章節標題與描述
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**：完整模組標題與內容更新
- **05-AdvancedTopics/mcp-security-entra/README.md**：更新交叉引用連結
- **07-LessonsfromEarlyAdoption/README.md**：更新案例研究參考
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**：更新第 9 節標題、徽章以及能力
- **08-BestPractices/README.md**：更新 Discord 社群連結
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**：更新 Discord 頻道參考
- **09-CaseStudy/docs-mcp/solution/python/README.md**：更新模型部署參考
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**：更新 AI 服務表格
- **11-MCPServerHandsOnLabs/03-Setup/README.md**：更新資源參考

#### AI 開發工具包 / AITK → Microsoft Foundry Toolkit Extension for VS Code

- **README.md**：更新主要課程參考
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**：更新模組標題、概述及所有模組標頭
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**：更新標題、學習目標、設定指示及資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**：更新標題、學習目標、MCP 主機表及交叉參考
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**：更新標題、徽章、先決條件及資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**：更新 Agent Builder 參考與回饋連結
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**：更新先決條件與擴充參考

---

## 2026年4月11日

### 新課程、文件修正及相依更新

#### 新增課程內容

**模組 05 - 進階主題**
- **課程 5.17：使用 MCP 的對抗多代理推理** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`)：新增全面指南，涵蓋多代理系統的對抗辯論模式
  - Mermaid 架構圖：兩個代理 → 共享 MCP 伺服器 → 辯論文字記錄 → 裁判 → 判決
  - 共享 MCP 工具伺服器（`web_search` + `run_python`），以 Python 與 TypeScript 實作
  - 對立系統提示（支持/反對/裁判），有明確工具使用要求
  - 辯論調度器以 Python、TypeScript 和 C# 編寫，管理回合和引導論點
  - MCP `ClientSession` 與調度器至真實工具調用的連接
  - 使用案例表（錯覺偵測、威脅建模、API 設計審查、事實驗證、技術選擇）
  - 安全考量：沙盒執行、工具調用驗證、速率限制、稽核記錄
  - 有結構的練習，包括三個實務場景（程式碼審查、架構決策、內容審核）

#### 文件修正

**模組 03 - 入門指南**
- **05-stdio-server/README.md**：修正不完整的 TypeScript stdio 伺服器範例 — 補充缺失的傳輸實例化 (`new StdioServerTransport()`) 和 `server.connect(transport)` 呼叫，以符合同章節的 Python 及 .NET 範例
- **14-sampling/README.md**：修正錯字 — 將 `"Sampling is an davanced features"` 改為 `"Sampling is an advanced feature"`

#### 課程更新

**主 README.md**
- 在課程表中新增 5.17 條目（使用 MCP 的對抗多代理推理）並連結新課程

**05-AdvancedTopics/README.md**
- 在課程列表中新增課程 5.17 行項

**study_guide.md**
- 在思維導圖及進階主題的文述中加入對抗多代理推理主題

#### 程式碼與安全修正

**模組 05 - 對抗代理 (`mcp-adversarial-agents`)**
- **安全修正 — 命令注入**：將 TypeScript `run_python` 工具中的 `execSync` shell 內插替換為 `execFile` + `promisify`，消除命令注入的風險（由 LLM 控制的程式碼現以純文字 argv 元素傳入，不涉及 shell）
- **MCP 工具迴圈連接**：更新 Python 辯論調度器，改用 `AsyncAnthropic` 客戶端（取代同步阻塞的 `Anthropic`），每回合直接傳遞活躍 `ClientSession` 給代理，透過 `session.list_tools()` 獲取工具定義，並使用 `session.call_tool()` 持續呼叫 `tool_use` 區塊，直到模型輸出最終回應文字

#### 相依項目更新

- 多個套件（03-GettingStarted、04-PracticalImplementation、10-StreamliningAIWorkflows）將 `hono` 更新至 4.12.12
- TypeScript 套件中將 `@hono/node-server` 從 1.19.11 更新至 1.19.13
- Python 套件中（10-StreamliningAIWorkflows 第 3 與第 4 實驗室）將 `cryptography` 從 46.0.5 更新至 46.0.7
- 將 10-StreamliningAIWorkflows 檢查器中的 `lodash` 從 4.17.23 更新至 4.18.1

#### 翻譯更新

- 與最新原始碼變更同步更新 48+ 種語言的翻譯 (i18n 更新)

---

## 2026年2月5日

### 儲存庫全面驗證與導覽改進

#### 新增課程內容

**模組 03 - 入門指南**
- **12-mcp-hosts/README.md**：新增全面的 MCP 主機設定指南
  - Claude Desktop、VS Code、Cursor、Cline、Windsurf 配置範例
  - 所有主要主機的 JSON 配置範本
  - 傳輸類型比較表（stdio、SSE/HTTP、WebSocket）
  - 常見連線問題排解
  - 主機配置的安全最佳實踐

- **13-mcp-inspector/README.md**：新增 MCP Inspector 調試指南
  - 安裝方式（npx、npm 全域安裝、原始碼安裝）
  - 透過 stdio 及 HTTP/SSE 連接伺服器
  - 測試工具、資源與提示工作流程
  - VS Code 與 MCP Inspector 整合
  - 常見除錯情境及解決方案

**模組 04 - 實務實作**
- **pagination/README.md**：新增分頁實作指南
  - Python、TypeScript、Java 的游標分頁模式
  - 客戶端分頁處理
  - 游標設計策略（不透明與結構化）
  - 效能優化建議

**模組 05 - 進階主題**
- **mcp-protocol-features/README.md**：新增協議功能深度解析
  - 進度通知實作
  - 請求取消模式
  - 含 URI 模式的資源範本
  - 伺服器生命週期管理
  - 日誌等級控制
  - 以 JSON-RPC 錯誤碼實作錯誤處理模式

#### 導覽修正（更新 24+ 個檔案）

**主要模組 README**
 現在連結至第一課和下一模組

**02-Security 子檔案**
- 五份附屬安全文件均新增「接下來是」導覽區塊：

**09-CaseStudy 檔案**
- 所有案例研究檔案均加入連續導覽：

**10-StreamliningAI 實驗室**
新增「下一步」區段於模組 10 概覽及模組 11

#### 程式碼與內容修正

**SDK 與相依更新**
修正空白 openai 版本為 `^4.95.0`
將 SDK 由 `^1.8.0` 更新至 `>=1.26.0`
將 mcp 版本控制升級至 `>=1.26.0`

<strong>程式碼修正</strong>
修正無效模型 `gpt-4o-mini` 為 `gpt-4.1-mini`

<strong>內容修正</strong>
修正錯誤連結 `READMEmd` → `README.md`，修正課程標頭 `Module 1-3` 為 `Module 0-3`，修正大小寫敏感路徑
移除損毀的案例研究 5 重複內容

<strong>初學者指引改善</strong>
新增適當的介紹、學習目標與先決條件給初學者

#### 課程更新

**主 README.md**
- 新增 3.12（MCP 主機）、3.13（MCP Inspector）、4.1（分頁）、5.16（協議功能）條目至課程表

**模組 README**
新增課程 12 和 13 於課程列表
新增實務指南部分，包含分頁連結
新增課程 5.15（自訂傳輸）與 5.16（協議功能）

**study_guide.md**
- 更新思維導圖，包含所有新主題：MCP 主機設定、MCP Inspector、分頁策略、協議功能深度

## 2026年1月28日

### MCP 規範 2025-11-25 合規審查

#### 核心概念強化 (01-CoreConcepts/)
- **新增客戶端原語—Roots**：新增詳盡文件說明 Roots 客戶端原語，協助伺服器理解檔案系統邊界與存取權限
- <strong>工具註解</strong>：新增工具行為註解 (`readOnlyHint`、`destructiveHint`) 文件，用於改善工具執行判斷
- **Sampling 中的工具呼叫**：更新 Sampling 文件，加入 `tools` 與 `toolChoice` 參數，實現模型驅動的工具調用於抽樣請求
- **URL 模式引導**：新增 URL 基礎引導文件，用於伺服器啟動外部網路互動
- **任務（實驗性）**：新增實驗性任務功能的相關章節，說明持久執行包裝器與延遲結果擷取
- <strong>圖示支持</strong>：註明工具、資源、資源範本與提示現在可包含作為附加元資料的圖示

#### 文件更新
- **README.md**：新增 MCP 規範 2025-11-25 版本參考及日期版本控制說明
- **study_guide.md**：更新課程地圖，納入核心概念中任務與工具註解項；更新文件時間戳

#### 規範合規驗證
- <strong>協議版本</strong>：確認所有文件參照當前 MCP 規範 2025-11-25
- <strong>架構對齊</strong>：驗證雙層架構（資料層 + 傳輸層）文件準確性
- <strong>原語文件</strong>：驗證伺服器原語（資源、提示、工具）與客戶端原語（Sampling、Elicitation、Logging、Roots）
- <strong>傳輸機制</strong>：驗證 STDIO 與可串流 HTTP 傳輸文件準確性
- <strong>安全指引</strong>：確認符合現行 MCP 安全最佳實踐文件

#### 主要 MCP 2025-11-25 功能文件化
- **OpenID Connect 發現**：透過 OIDC 進行認證伺服器發現
- **OAuth 用戶端 ID 元資料文件**：推薦用戶端註冊機制
- **JSON Schema 2020-12**：MCP 架構定義的預設語法版本
- **SDK 分級系統**：正式化 SDK 功能支持與維護需求
- <strong>治理結構</strong>：正式化 MCP 工作小組與利益團體治理架構

### 安全文件重大更新 (02-Security/)

#### MCP 安全峰會工作坊 (Sherpa) 整合
- <strong>新增動手訓練資源</strong>：將 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 全面整合入所有安全文件
- <strong>遠征路線涵蓋</strong>：文件記錄從基地營到峰頂的完整營地進程
- **OWASP 對齊**：所有安全指引現對應 OWASP MCP Azure Security Guide 風險

#### OWASP MCP 十大安全風險整合
- <strong>新增章節</strong>：於主安全 README 加入 OWASP MCP 十大安全風險表與 Azure 對策
- <strong>風險導向文件</strong>：更新 mcp-security-controls-2025.md，為每安全領域加入 OWASP MCP 風險參考
- <strong>參考架構</strong>：連結 OWASP MCP Azure Security Guide 參考架構與實作範例

#### 更新安全文件
- **README.md**：新增 Sherpa 工作坊概覽、遠征路線表、OWASP MCP 十大風險摘要與動手訓練章節
- **mcp-security-controls-2025.md**：更新標頭至 2026 年 2 月，新增 OWASP 風險參考（MCP01-MCP08），修正規範版本不一致
- **mcp-security-best-practices-2025.md**：新增 Sherpa 與 OWASP 資源章節，更新時間戳
- **mcp-best-practices.md**：新增動手訓練章節，含 Sherpa 與 OWASP 連結
- **azure-content-safety-implementation.md**：新增 OWASP MCP06 參考，Sherpa 營地3對應，以及更多資源章節

#### 新增資源連結
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- 各 OWASP MCP 風險頁面（MCP01-MCP10）

### 全課程 MCP 規範 2025-11-25 對齊

#### 模組 03 - 入門指南
- **SDK 文件**：將 Go SDK 新增至官方 SDK 清單；更新全部 SDK 參考以符合 MCP 規範 2025-11-25
- <strong>傳輸說明</strong>：更新 STDIO 及 HTTP 串流傳輸描述，加入明確規範參考

#### 模組 04 - 實務實作
- **SDK 更新**：加入 Go SDK；更新 SDK 清單含規範版本參考
- <strong>授權規範</strong>：更新 MCP 授權規範鏈結至最新 2025-11-25 版本

#### 模組 05 - 進階主題
- <strong>新功能</strong>：新增 MCP 規範 2025-11-25 新功能說明（任務、工具註解、URL 模式引導、Roots）
- <strong>安全資源</strong>：新增 OWASP MCP 十大與 Sherpa 工作坊連結至附加參考

#### 模組 06 - 社群貢獻
- **SDK 清單**：新增 Swift 及 Rust SDK；更新規範鏈結到 2025-11-25
- <strong>規範參考</strong>：更新 MCP 規範鏈結為直接規範 URL

#### 模組 07 - 早期採用的經驗教訓

- <strong>資源更新</strong>：新增 MCP 規範 2025-11-25 連結及 OWASP MCP 十大至額外資源

#### 模組 08 - 最佳實踐
- <strong>規範版本</strong>：更新 MCP 規範參考為 2025-11-25
- <strong>安全資源</strong>：新增 OWASP MCP 十大與 Sherpa 工作坊至額外參考資料

#### 模組 10 - 精簡 AI 工作流程
- <strong>徽章更新</strong>：將 MCP 版本徽章由 SDK 版本 (1.9.3) 改為規範版本 (2025-11-25)
- <strong>資源連結</strong>：更新 MCP 規範連結；新增 OWASP MCP 十大

#### 模組 11 - MCP 伺服器實作實驗室
- <strong>規範參考</strong>：更新 MCP 規範連結為 2025-11-25 版本
- <strong>安全資源</strong>：新增 OWASP MCP 十大至官方資源

## 2025 年 12 月 18 日

### 安全文件更新 - MCP 規範 2025-11-25

#### MCP 安全最佳實踐 (02-Security/mcp-best-practices.md) - 規範版本更新
- <strong>協議版本更新</strong>：更新參考最新 MCP 規範 2025-11-25（發布於 2025 年 11 月 25 日）
  - 將所有規範版本參考從 2025-06-18 更新為 2025-11-25
  - 將文件日期參考從 2025 年 8 月 18 日更新為 2025 年 12 月 18 日
  - 確認所有規範 URL 指向最新文件
- <strong>內容驗證</strong>：全面驗證安全最佳實踐符合最新標準
  - **Microsoft 安全解決方案**：確認 Prompt Shields（前稱「越獄風險偵測」）、Azure 內容安全、Microsoft Entra ID 及 Azure Key Vault 的用語與連結
  - **OAuth 2.1 安全性**：確認與最新 OAuth 安全最佳實踐一致
  - **OWASP 標準**：驗證 LLM 的 OWASP 十大參考仍為最新
  - **Azure 服務**：確認所有 Microsoft Azure 文件連結及最佳實踐
- <strong>標準對齊</strong>：確認所有引用的安全標準皆為最新
  - NIST AI 風險管理框架
  - ISO 27001:2022
  - OAuth 2.1 安全最佳實踐
  - Azure 安全與合規框架
- <strong>實作資源</strong>：驗證所有實作指南連結及資源
  - Azure API 營運管理驗證模式
  - Microsoft Entra ID 整合指南
  - Azure Key Vault 秘密管理
  - DevSecOps 管線與監控解決方案

### 文件品質保證
- <strong>規範合規</strong>：確保所有 MCP 安全必須條件（MUST/MUST NOT）均符合最新規範
- <strong>資源更新頻率</strong>：確認所有外部連結指向 Microsoft 文件、安全標準及實作指引
- <strong>最佳實踐涵蓋</strong>：確認涵蓋廣泛認證、授權、AI 特定威脅、供應鏈安全及企業模式

## 2025 年 10 月 6 日

### 入門章節擴充 – 進階伺服器使用與簡易認證

#### 進階伺服器使用 (03-GettingStarted/10-advanced)
- <strong>新增章節</strong>：引入完整進階 MCP 伺服器使用指南，涵蓋一般與低階伺服器架構。
  - <strong>一般伺服器與低階伺服器比較</strong>：詳細比較及 Python 與 TypeScript 範例程式碼。
  - <strong>基於處理器的設計</strong>：說明基於 handler 的工具/資源/提示管理，實現可擴展且靈活的伺服器實作。
  - <strong>實務模式</strong>：實際情境中低階伺服器模式對進階功能與架構優化的益處。

#### 簡易認證 (03-GettingStarted/11-simple-auth)
- <strong>新增章節</strong>：逐步導覽 MCP 伺服器簡易認證的實作。
  - <strong>認證概念</strong>：清晰說明認證與授權區別，以及憑證處理。
  - <strong>基本認證實作</strong>：Python (Starlette) 與 TypeScript (Express) 中間件認證模式，附程式範例。
  - <strong>進階安全演進</strong>：如何從簡易認證起步，漸進至 OAuth 2.1 與 RBAC，並參考進階安全模組。

這些新增內容提供實務操作指引，有助打造更穩健、安全且彈性的 MCP 伺服器實作，銜接基礎概念與進階生產模式。

## 2025 年 9 月 29 日

### MCP 伺服器資料庫整合實驗室 - 全面實作學習路徑

#### 11-MCPServerHandsOnLabs - 全新完整資料庫整合課程
- **完整 13 個實驗室學習路徑**：新增完整實作課程，涵蓋使用 PostgreSQL 實現生產準備 MCP 伺服器整合
  - <strong>實務案例</strong>：Zava Retail 分析案例示範企業級模式
  - <strong>結構化學習進度</strong>：
    - **實驗室 00-03: 基礎** - 介紹、核心架構、安全與多租戶、環境設置
    - **實驗室 04-06: 建構 MCP 伺服器** - 資料庫設計與架構、MCP 伺服器實作、工具開發  
    - **實驗室 07-09: 進階功能** - 語意搜尋整合、測試與除錯、VS Code 整合
    - **實驗室 10-12: 生產與最佳實踐** - 部署策略、監控與可觀察性、最佳實踐與優化
  - <strong>企業技術</strong>：FastMCP 框架、使用 pgvector 的 PostgreSQL、Azure OpenAI 嵌入、Azure Container Apps、Application Insights
  - <strong>進階功能</strong>：列級安全 (RLS)、語意搜尋、多租戶資料存取、向量嵌入、即時監控

#### 術語標準化 - 模組改為實驗室
- <strong>全面文件更新</strong>：系統性更新 11-MCPServerHandsOnLabs 所有 README 文件，將術語由「模組」改為「實驗室」
  - <strong>章節標題</strong>：將「本模組涵蓋」改為「本實驗室涵蓋」，涵蓋 13 個實驗室
  - <strong>內容說明</strong>：將「本模組提供…」改為「本實驗室提供…」至文件內容
  - <strong>學習目標</strong>：更新「完成本模組後…」為「完成本實驗室後…」
  - <strong>導覽連結</strong>：將所有「模組 XX：」參考改為「實驗室 XX：」於交叉參考與導覽中
  - <strong>完成追蹤</strong>：更新「完成本模組後…」為「完成本實驗室後…」
  - <strong>保留技術參考</strong>：在設定檔中保持 Python 模組參考（例如 `"module": "mcp_server.main"`）

#### 學習指南強化 (study_guide.md)
- <strong>視覺課程地圖</strong>：新增「11. 資料庫整合實驗室」章節，全面展示實驗室結構
- <strong>庫結構</strong>：由十個主要章節更新為十一個，新增詳細 11-MCPServerHandsOnLabs 描述
- <strong>學習路徑指引</strong>：增強導覽說明，涵蓋章節 00 至 11
- <strong>技術涵蓋</strong>：新增 FastMCP、PostgreSQL、Azure 服務整合細節
- <strong>學習成果</strong>：強調生產準備伺服器開發、資料庫整合模式及企業安全

#### 主要 README 結構加強
- <strong>以實驗室為基礎的術語</strong>：更新 11-MCPServerHandsOnLabs 主 README.md 以一致採用「實驗室」結構
- <strong>學習路徑組織</strong>：清晰呈現從基礎概念到進階實作及生產部署的漸進
- <strong>實務導向</strong>：著重實務操作學習，配合企業級模式與技術

### 文件品質與一致性改善
- <strong>實作學習強調</strong>：全篇文件強調實作導向、實驗室方式教學
- <strong>企業模式聚焦</strong>：凸顯生產準備實作與企業安全考量
- <strong>技術整合</strong>：全面涵蓋現代 Azure 服務與 AI 整合模式
- <strong>學習進度</strong>：清晰、結構化的基礎到生產部署路徑

## 2025 年 9 月 26 日

### 案例研討擴充 - GitHub MCP Registry 整合

#### 案例研討 (09-CaseStudy/) - 生態系統發展重點
- **README.md**：大幅擴充，新增完整 GitHub MCP Registry 案例研討
  - **GitHub MCP Registry 案例研討**：全面分析 2025 年 9 月 GitHub MCP Registry 發布
    - <strong>問題分析</strong>：詳述 MCP 伺服器分散式發現與部署挑戰
    - <strong>解決架構</strong>：GitHub 的集中式註冊表與一鍵 VS Code 安裝方案
    - <strong>商業效果</strong>：開發者上手與生產力顯著提升
    - <strong>策略價值</strong>：聚焦模組化代理部署及跨工具互操作性
    - <strong>生態系統發展</strong>：定位為代理系統整合基礎平台
  - <strong>案例研究結構加強</strong>：更新七個案例研討，格式統一、描述完整
    - Azure AI 旅遊代理：多代理協同著重點
    - Azure DevOps 整合：工作流程自動化焦點
    - 即時文件檢索：Python 控制台用戶端實作
    - 互動式學習計畫產生器：Chainlit 聊天式網頁應用
    - 編輯器內文件：VS Code 與 GitHub Copilot 整合
    - Azure API 營運管理：企業 API 整合模式
    - GitHub MCP Registry：生態系統發展與社群平台
  - <strong>綜合結論重寫</strong>：結尾部分重新編寫，強調七個涵蓋多個 MCP 實作面向的案例
    - 企業整合、多代理協同、開發者生產力
    - 生態系統發展、教育應用分類
    - 強化架構模式、實作策略與最佳實踐洞見
    - 強調 MCP 為成熟且生產準備協議

#### 學習指南更新 (study_guide.md)
- <strong>視覺課程地圖</strong>：更新心智圖，包含 GitHub MCP Registry 於案例研討部分
- <strong>案例研討描述</strong>：由一般描述強化為七個全面性案例研討的詳細拆解
- <strong>庫結構</strong>：更新第 10 節，反映案例研討全面覆蓋與具體實作細節
- <strong>更新紀錄整合</strong>：新增 2025 年 9 月 26 日條目，記錄 GitHub MCP Registry 新增及案例研討強化
- <strong>日期更新</strong>：更新頁尾時間戳記為最新版本（2025 年 9 月 26 日）

### 文件品質提升
- <strong>一致性加強</strong>：所有七個案例的格式與結構標準化
- <strong>全面涵蓋</strong>：案例涵蓋企業、開發者生產力與生態系統發展場景
- <strong>策略定位</strong>：加強 MCP 作為代理系統部署基礎平台的角色
- <strong>資源整合</strong>：更新額外資源包括 GitHub MCP Registry 連結

## 2025 年 9 月 15 日

### 進階主題擴充 - 自訂傳輸與上下文工程

#### MCP 自訂傳輸 (05-AdvancedTopics/mcp-transport/) - 全新進階實作指南
- **README.md**：完整自訂 MCP 傳輸機制實作指南
  - **Azure 事件網格傳輸**：全面無伺服器事件驅動傳輸實作
    - C#、TypeScript 及 Python 範例，搭配 Azure Functions 整合
    - 可擴展 MCP 解決方案之事件驅動架構模式
    - Webhook 接收器與基於推送的訊息處理
  - **Azure 事件中樞傳輸**：高吞吐量串流傳輸實作
    - 低延遲場景的即時串流功能
    - 區塊劃分策略與檢查點管理
    - 訊息批次處理與效能優化
  - <strong>企業整合模式</strong>：生產準備架構範例
    - 跨多個 Azure Functions 的分散式 MCP 處理
    - 結合多種傳輸類型的混合傳輸架構
    - 訊息耐久性、可靠性與錯誤處理策略
  - <strong>安全與監控</strong>：Azure Key Vault 整合與可觀察模式
    - 管理身份驗證與最小權限存取
    - Application Insights 遙測與效能監控
    - 斷路器與容錯模式
  - <strong>測試框架</strong>：自訂傳輸的全面測試策略
    - 使用測試替身與模擬框架的單元測試
    - 搭配 Azure 測試容器的整合測試
    - 效能與負載測試考量

#### 上下文工程 (05-AdvancedTopics/mcp-contextengineering/) - 新興 AI 領域
- **README.md**：深入探討上下文工程作為新興領域
  - <strong>核心原則</strong>：完整上下文分享、行動決策認知與上下文視窗管理
  - **MCP 協議對齊**：MCP 設計如何對應上下文工程挑戰
    - 上下文視窗限制與漸進載入策略
    - 相關性判斷與動態上下文檢索
    - 多模態上下文處理與安全考量
  - <strong>實作方法</strong>：單執行緒與多代理架構
    - 上下文切塊與優先順序技術
    - 漸進式上下文載入與壓縮策略
    - 分層上下文方法與檢索優化
  - <strong>衡量框架</strong>：上下文有效性評估新興指標
    - 輸入效率、效能、品質與使用者體驗考量
    - 上下文優化的實驗方法
    - 失敗分析與改進方法論

#### 課程導覽更新 (README.md)
- <strong>強化模組結構</strong>：更新課程表，加入新進階主題
  - 新增上下文工程 (5.14) 與自訂傳輸 (5.15) 項目
  - 全模組格式與導覽鏈接一致性
  - 更新描述以反映當前內容範圍

### 目錄結構改善
- <strong>命名標準化</strong>：將「mcp transport」更名為「mcp-transport」，與其他進階主題資料夾保持一致
- <strong>內容組織</strong>：所有 05-AdvancedTopics 資料夾改用一致命名模式（mcp-[topic]）

### 文件品質提升
- **MCP 規範對齊**：所有新內容均引用最新 MCP 規範 2025-06-18
- <strong>多語言範例</strong>：包含 C#、TypeScript 與 Python 的完整程式範例

- <strong>企業級重點</strong>：涵蓋生產就緒範式與 Azure 雲端整合
- <strong>視覺化文件</strong>：使用 Mermaid 圖表進行架構與流程視覺化

## 2025年8月18日

### 文件全面更新 - MCP 2025-06-18 標準

#### MCP 安全最佳實踐 (02-Security/) - 全面現代化
- **MCP-SECURITY-BEST-PRACTICES-2025.md**：依據 MCP 規範 2025-06-18 完全重寫
  - <strong>強制性要求</strong>：新增明確的必須/禁止要求，符合官方規範並附具清晰視覺標示
  - **12 大核心安全實務**：從15項清單重組為全面安全領域
    - 令牌安全與身份驗證，整合外部身份提供者
    - 會話管理與傳輸安全，含密碼學需求
    - AI 專屬威脅保護，整合微軟 Prompt Shields
    - 存取控制與權限管理，遵循最小權限原則
    - 內容安全與監控，整合 Azure Content Safety
    - 供應鏈安全，涵蓋元件驗證
    - OAuth 安全與混淆副手防範，採用 PKCE 實作
    - 事件回應與復原，具自動化能力
    - 合規與治理，符合監管要求
    - 進階安全控管，採用零信任架構
    - 微軟安全生態系整合，提供全面解決方案
    - 持續安全演化，採用自適應實務
  - <strong>微軟安全解決方案</strong>：加強 Prompt Shields、Azure Content Safety、Entra ID 及 GitHub 高階安全的整合指引
  - <strong>實作資源</strong>：依官方 MCP 文件、微軟安全解決方案、安全標準與實作指南分類資源連結

#### 進階安全控管 (02-Security/) - 企業級實作
- **MCP-SECURITY-CONTROLS-2025.md**：全面改版企業級安全框架
  - **9 個安全領域**：從基礎控管擴充至詳細企業框架
    - 進階身份驗證與授權，整合微軟 Entra ID
    - 令牌安全與防穿透控管，完善驗證機制
    - 會話安全控管，防止劫持
    - AI 專屬安全控管，防範提示注入與工具中毒
    - 混淆副手攻擊防範，包含 OAuth 代理安全
    - 工具執行安全，包含沙盒封裝與隔離
    - 供應鏈安全控管，進行相依性驗證
    - 監控與偵測控管，整合 SIEM
    - 事件回應與復原，自動化能力
  - <strong>實作範例</strong>：新增詳細 YAML 配置與程式碼範例
  - <strong>微軟解決方案整合</strong>：完善涵蓋 Azure 安全服務、GitHub 高階安全與企業身分管理

#### 進階主題安全 (05-AdvancedTopics/mcp-security/) - 生產級實作
- **README.md**：企業級安全實作完整重寫
  - <strong>現行規範對齊</strong>：更新符合 MCP 規範 2025-06-18，具強制性安全要求
  - <strong>強化身份驗證</strong>：整合微軟 Entra ID，提供 .NET 與 Java Spring Security 範例
  - **AI 安全整合**：Microsoft Prompt Shields 與 Azure Content Safety 實作詳細 Python 範例
  - <strong>進階威脅緩解</strong>：完整實作範例涵蓋
    - 混淆副手攻擊防範，採用 PKCE 與用戶同意驗證
    - 令牌穿透防護，包含受眾驗證與安全令牌管理
    - 會話劫持防護，以密碼學綁定與行為分析
  - <strong>企業級安全整合</strong>：Azure Application Insights 監控、威脅偵測流程與供應鏈安全
  - <strong>實作清單</strong>：明確區分強制與建議安全控管，並說明微軟安全生態系優勢

### 文件品質與標準對齊
- <strong>規範參考</strong>：更新所有引用至現行 MCP 規範 2025-06-18
- <strong>微軟安全生態系</strong>：強化所有安全文件中之整合指引
- <strong>實務實作</strong>：新增詳細 .NET、Java 與 Python 範例，符合企業模式
- <strong>資源組織</strong>：全面分類官方文件、安全標準與實作指南
- <strong>視覺化標示</strong>：清楚標示強制要求與建議措施


#### 核心概念 (01-CoreConcepts/) - 完全現代化
- <strong>協定版本更新</strong>：更新引用至現行 MCP 規範 2025-06-18，採用日期版本 (YYYY-MM-DD 格式)
- <strong>架構優化</strong>：強化 Hosts、Clients 與 Servers 描述以反映現行 MCP 架構範式
  - Hosts 現明確定義為協調多個 MCP 客戶端連線的 AI 應用
  - 將 Clients 描述為協定連接器，維持一對一伺服器關係
  - 強化 Servers 描述包含本地與遠端部署場景
- <strong>原語重組</strong>：伺服器與客戶端原語全面改版
  - 伺服器原語：資源（資料來源）、提示（範本）、工具（可執行功能）並附詳細說明與範例
  - 客戶端原語：採樣（LLM 補全）、引導（用戶輸入）、記錄（除錯/監控）
  - 更新發現（`*/list`）、檢索（`*/get`）與執行（`*/call`）方法範式
- <strong>協定架構</strong>：導入兩層架構模型
  - 資料層：基於 JSON-RPC 2.0，包含生命週期管理與原語
  - 傳輸層：STDIO（本地）與 Streamable HTTP 含 SSE（遠端）傳輸機制
- <strong>安全框架</strong>：全面安全原則涵蓋明確用戶同意、資料隱私保護、工具執行安全與傳輸層安全
- <strong>通訊模式</strong>：更新協定訊息展現初始化、發現、執行與通知流程
- <strong>程式碼範例</strong>：更新多語言範例（.NET、Java、Python、JavaScript）以反映現行 MCP SDK 範式

#### 安全 (02-Security/) - 全面安全改版  
- <strong>標準對齊</strong>：完全符合 MCP 規範 2025-06-18 安全要求
- <strong>身份驗證演進</strong>：記錄自訂 OAuth 伺服器演進到外部身份提供者授權（微軟 Entra ID）
- **AI 專屬威脅分析**：增強涵蓋現代 AI 攻擊向量
  - 詳細提示注入攻擊場景與實例
  - 工具中毒機制與「地毯拉扯」攻擊模式
  - 上下文視窗中毒與模型混淆攻擊
- **微軟 AI 安全解決方案**：全面涵蓋微軟安全生態系
  - AI Prompt Shields，含先進偵測、聚焦與分隔符技術
  - Azure Content Safety 整合模式
  - GitHub 高階安全供應鏈防護
- <strong>進階威脅緩解</strong>：詳細安全控管針對
  - 會話劫持：MCP 專屬攻擊場景與密碼學會話ID需求
  - MCP 代理混淆副手問題，明確同意需求
  - 令牌穿透漏洞，強制驗證控管
- <strong>供應鏈安全</strong>：擴大 AI 供應鏈覆蓋，含基礎模型、嵌入服務、上下文提供者與第三方 API
- <strong>基礎安全</strong>：強化與企業安全模式整合，包括零信任架構與微軟安全生態系
- <strong>資源組織</strong>：按類型分類全面資源連結（官方文檔、標準、研究、微軟解決方案、實作指南）

### 文件品質提升
- <strong>結構化學習目標</strong>：增強具體且可執行的學習成果
- <strong>交叉參考</strong>：新增安全及核心概念相關主題連結
- <strong>現行資訊</strong>：更新所有日期參考與規範連結到最新標準
- <strong>實作指導</strong>：於兩大章節中新增具體可執行的實作指引

## 2025年7月16日

### README 及導覽改進
- 完全重新設計 README.md 中的課程導覽
- 將 `<details>` 標籤替換為更易用的表格格式
- 新增 alternative_layouts 資料夾中的替代版面選項
- 新增卡片式、分頁式與手風琴式導航範例
- 更新資料庫結構章節涵蓋所有最新檔案
- 強化「如何使用此課程」章節，提供清晰建議
- 更新 MCP 規範連結至正確 URL
- 新增 Context Engineering（5.14）章節至課程結構

### 學習指南更新
- 完全修訂學習指南以符合現有資料庫結構
- 新增 MCP 客戶端與工具、熱門 MCP 伺服器章節
- 更新視覺課程地圖準確反映所有主題
- 加強進階主題描述，涵蓋所有專業領域
- 更新案例研究章節以反映實例
- 新增本完整變更日誌

### 社群貢獻 (06-CommunityContributions/)
- 新增關於影像生成 MCP 伺服器的詳細資訊
- 新增在 VSCode 中使用 Claude 的完整章節
- 新增 Cline 終端客戶端設定及使用說明
- 更新 MCP 客戶端章節，涵蓋所有熱門客戶端選項
- 強化貢獻範例，提供更準確程式碼示範

### 進階主題 (05-AdvancedTopics/)
- 統一命名管理所有專業主題資料夾
- 新增情境工程相關教材與範例
- 新增 Foundry 代理整合文件
- 強化 Entra ID 安全整合文件

## 2025年6月11日

### 初版建立
- 發布 MCP 入門課程第一版
- 建立 10 大主題基本結構
- 實作視覺課程地圖以輔助導覽
- 新增多語言初始範例專案

### 初學入門 (03-GettingStarted/)
- 建立首批伺服器實作範例
- 新增客戶端開發指導
- 包含 LLM 客戶端整合說明
- 新增 VS Code 整合文件
- 實作 Server-Sent Events (SSE) 伺服器範例

### 核心概念 (01-CoreConcepts/)
- 新增客戶端-伺服器架構詳細說明
- 撰寫關鍵協定元件文件
- 記錄 MCP 訊息傳遞模式

## 2025年5月23日

### 資料庫結構
- 初始化資料庫與基本資料夾架構
- 為各大章節建立 README 文件
- 建立翻譯基礎架構
- 新增圖片資源與圖解

### 文件
- 撰寫初版 README.md 課程概覽
- 新增行為準則 CODE_OF_CONDUCT.md 及安全指南 SECURITY.md
- 建立支持文件 SUPPORT.md，提供求助指引
- 建立初步學習指南架構

## 2025年4月15日

### 規劃與框架
- MCP 入門課程初期規劃
- 制定學習目標與目標族群
- 規劃課程十章架構
- 發展案例與範例的概念框架
- 製作關鍵概念初期原型範例

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->