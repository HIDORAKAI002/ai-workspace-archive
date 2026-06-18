# 變更記錄：初學者 MCP 課程

本文檔記錄了對初學者模型上下文協議（MCP）課程所作的所有重要更改。更改以逆序時間排列（最新更改優先）。

## 2026 年 6 月 16 日

### MCP 規範對齊及範例驗證

根據當前 **MCP Specification 2025-11-25** 與最新官方 SDK 驗證課程，修正了剩餘的過時規範引用，並確認核心範例仍可編譯及執行。

#### 規範版本更正 (2025-06-18 / 2025-03-26 → 2025-11-25)

更新英語內容中仍標示舊版本規範為<em>當前/最新</em>標準之處，並將連結指向正規 `modelcontextprotocol.io` 規範路徑：
- **05-AdvancedTopics/mcp-security/README.md**：更新「當前標準」橫幅、介紹、核心安全原則標題、強制要求標題、Microsoft Entra ID 部分、參考與資源連結，以及結尾安全通知（8 處引用）為 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**：更新額外資源規範連結與「當前標準」橫幅為 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**：將過時的 `2025-03-26` 安全信任鏈接替換成現行 2025-11-25 安全最佳實踐頁面
- **03-GettingStarted/14-sampling/README.md**：更新官方抽樣文件連結為 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**：將現在時的「當前 MCP 規範」引用和額外資源規範連結更新為 2025-11-25（保留歷史 SSE 廢止說明以求準確）

#### 範例驗證與當前 SDK

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**：透過 `npm install` 解析 `@modelcontextprotocol/sdk@1.29.0`；執行 `tsc --noEmit` 無類型錯誤 — 現有 `McpServer`/`StdioServerTransport` API 仍有效
- **Python (03-GettingStarted/01-first-server/solution/python)**：在孤立 `.venv` 內使用 `mcp[cli]` (1.27.2) 驗證； `py_compile` 通過，`FastMCP.list_tools()` 正確返回 `add` 和 `subtract` 工具
- 確認所有範例中 `@modelcontextprotocol/sdk` 版本範圍（`>=1.26.0` / `^1.26.0` / `^1.27.0`）皆清晰解析到當前 `1.29.0`，且 API 無破壞性變更

#### 依賴版本對齊（填補版本缺口）

將過時的 SDK 版本釘選提升，使每個範例均跟蹤當前 MCP 版本，依據庫存約定：
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**：將 `@modelcontextprotocol/sdk` 從 `^1.8.0` 升級為 `>=1.26.0`，並將陳舊的 `"updated for MCP 2025-06-18"` 描述更新為 `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** 和 **lab4/code/github_mcp_server/pyproject.toml**：將準確釘選 `mcp==1.23.0` 升級為 `mcp>=1.26.0`；重新生成兩個 lockfile (`uv.lock`) 以讓鎖定檔解析到當前 `mcp 1.27.2` 且與清單保持同步

#### 課程差距分析 — 覆蓋最新規範特性

確認課程已涵蓋 MCP 2025-11-25 中新增及擴展的所有原語，無遺漏內容：
- <strong>抽樣</strong>：課程 03-GettingStarted/14-sampling 與 05-AdvancedTopics/mcp-sampling
- **引導（含 URL 模式）**：記錄於 01-CoreConcepts 和 05-AdvancedTopics/mcp-protocol-features
- <strong>根上下文</strong>：記錄於 00-Introduction、01-CoreConcepts 及 05-AdvancedTopics/mcp-root-contexts
- **任務（實驗性、長時操作）**：記錄於 01-CoreConcepts 和 05-AdvancedTopics/mcp-protocol-features
- <strong>工具註解</strong>（`readOnlyHint` / `destructiveHint`）：記錄於 01-CoreConcepts 和 05-AdvancedTopics/mcp-protocol-features

### 安全加固及依賴漏洞修補

對每個依賴清單及範例原始碼進行全面安全檢查，修復所有 npm 安全警告與一項程式碼層級問題。修復後，各檢查目錄皆報告 **0 漏洞**。

#### npm 依賴漏洞（傳遞）— 已修復

審計所有 15 個提交的 `package-lock.json` 檔案。漏洞僅限 MCP Inspector 開發工具、OpenAI 客戶端和 MCP SDK 的傳遞依賴；均已修復且未破壞範例：
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** 和 **lab3/code/weather_mcp/inspector**：將 `@modelcontextprotocol/inspector` 從 (`0.16.6` / `0.14.1`) 升級至 `0.22.0`，隨帶修復 `ajv`、`brace-expansion`、`diff`、`path-to-regexp` 和 `ws` 漏洞。新增 npm `overrides` 強制修補 `shell-quote@1.8.4`，消除由 `concurrently` 帶來的危急漏洞；重新生成鎖定檔（現 0 漏洞）
- **03-GettingStarted/samples/typescript**：`npm audit fix` 更新傳遞依賴 `qs`（中級漏洞）到修補版本
- **03-GettingStarted/samples/javascript**：`npm audit fix` 更新傳遞依賴 `hono`（中級漏洞）到修補版本
- **03-GettingStarted/03-llm-client/solution/typescript**：`npm audit fix` 更新傳遞依賴 `form-data`（高級漏洞）到修補版本
- **03-GettingStarted/11-simple-auth/solution/typescript**：生成缺失的 `package-lock.json`，使項目可重現和安全審計（0 漏洞）

#### 程式碼層級安全修復（OWASP A03：注入）

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**：移除 `open_in_vscode` 工具中的 `shell=True`。先前 `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` 允許資料夾路徑中的 shell 元字元被 `cmd.exe` 解譯（命令注入向量）。現改為直接啟動解析的 `Code.exe`，以資料夾作為參數 — 無 shell — 功能相同且安全

#### Python 依賴審計

- 使用 `pip-audit` 審計所有 Python 需求集。`05-AdvancedTopics` 和 `03-GettingStarted/samples/python` 報告 <strong>無已知漏洞</strong>（其 `mcp` / `httpx` / `pydantic` / `python-dotenv` 範圍解析至當前修補版本）
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**：`pip-audit` 標示傳遞依賴 **`werkzeug` 3.1.1** 具有三個 `safe_join` Windows 裝置名 DoS 漏洞 — `CVE-2025-66221`、`CVE-2026-21860`、`CVE-2026-27199`（皆於 3.1.6 修復）。新增明確安全釘選 `werkzeug>=3.1.6`，已確認該限制與 `chainlit` / `mcp` / `semantic-kernel` 堆疊順利解析

### 產品命名重塑

將所有課程內容更新為 Microsoft 產品重新命名：

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**：更新 Discord 社區連結
- **AGENTS.md**：更新 Discord 伺服器引用
- **README.md**：更新技術生態系引用
- **study_guide.md**：更新案例研究引用
- **05-AdvancedTopics/README.md**：更新第 5.13 單元標題與描述
- **05-AdvancedTopics/mcp-integration/README.md**：更新段落標題及描述
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**：全文模組標題及內容更新
- **05-AdvancedTopics/mcp-security-entra/README.md**：更新交叉參照連結
- **07-LessonsfromEarlyAdoption/README.md**：更新案例研究引用
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**：更新第 9 節標題、徽章及能力
- **08-BestPractices/README.md**：更新 Discord 社區連結
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**：更新 Discord 頻道引用
- **09-CaseStudy/docs-mcp/solution/python/README.md**：更新模型部署引用
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**：更新 AI 服務表格
- **11-MCPServerHandsOnLabs/03-Setup/README.md**：更新資源引用

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**：更新主課程引用
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**：更新模組標題、概述與所有模組標頭
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**：更新標題、學習目標、設置說明及資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**：更新標題、學習目標、MCP 主機表及交叉參考
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**：更新標題、徽章、先決條件及資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**：更新代理構建器引用及反饋連結
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**：更新先決條件及擴展引用

---

## 2026 年 4 月 11 日

### 新課程、文件修正和依賴更新

#### 新增課程內容

**第 05 單元 - 進階主題**
- **第 5.17 課：MCP 的對抗式多代理推理** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`)：全新綜合指南，涵蓋多代理系統的對抗辯論模式
  - Mermaid 架構圖：兩個代理 → 共享 MCP 伺服器 → 辯論記錄 → 評審 → 判決
  - 共享 MCP 工具伺服器 (`web_search` + `run_python`) 以 Python 和 TypeScript 實作
  - 對立系統提示（支持 / 反對 / 評審），具體工具使用要求
  - 辯論協調器以 Python、TypeScript 與 C# 管理回合和路由論點
  - MCP `ClientSession` 連結協調器與真實工具調用
  - 使用案例表（幻覺偵測、威脅建模、API 設計審查、事實驗證、技術選擇）
  - 安全考量：沙箱執行、工具調用驗證、速率限制、審計日誌
  - 結構化練習，包含三個實作場景（程式碼審查、架構決策、內容管理）

#### 文件修正

**第 03 單元 - 入門指南**
- **05-stdio-server/README.md**：修正不完整的 TypeScript stdio 伺服器範例 — 新增缺失的傳輸實例化 (`new StdioServerTransport()`) 和 `server.connect(transport)` 呼叫，以匹配同段的 Python 與 .NET 範例
- **14-sampling/README.md**：修正錯字 — 將 `"Sampling is an davanced features"` 更正為 `"Sampling is an advanced feature"`

#### 課程更新

**主 README.md**
- 於課程表中新增條目 5.17（MCP 對抗式多代理推理）並附新課程直接連結

**05-AdvancedTopics/README.md**
- 在課程表中新增第 5.17 課行

**study_guide.md**
- 在進階主題的思維導圖與文字描述中新增對抗式多代理推理主題

#### 程式碼與安全修復

**第 05 單元 - 對抗式代理（`mcp-adversarial-agents`）**
- **安全修復 — 命令注入**：在 TypeScript `run_python` 工具中用 `execFile` + `promisify` 替代 `execSync` 的 shell 插值，消除命令注入漏洞（LLM 控制的程式碼現在作為字串參數傳遞，無 shell 介入）
- **MCP 工具循環連線**：更新 Python 辯論協調器以使用 `AsyncAnthropic` 用戶端（取代阻塞同步的 `Anthropic`），將即時 `ClientSession` 直接傳遞到每個代理回合，通過 `session.list_tools()` 每回合獲取工具定義，並通過循環內的 `session.call_tool()` 調度 `tool_use` 區塊，直到模型發出最終文本回應

#### 依賴更新

- 將多個套件（03-GettingStarted、04-PracticalImplementation、10-StreamliningAIWorkflows）中的 `hono` 提升至 4.12.12
- 將 TypeScript 套件中的 `@hono/node-server` 從 1.19.11 更新至 1.19.13
- 將 Python 套件（10-StreamliningAIWorkflows 實驗室 3 和 4）中的 `cryptography` 從 46.0.5 更新至 46.0.7
- 將 10-StreamliningAIWorkflows 檢視器中的 `lodash` 從 4.17.23 更新至 4.18.1

#### 翻譯

- 同步 48 種以上語言的翻譯，與最新源碼變更保持一致（i18n 更新）

---

## 2026 年 2 月 5 日

### 倉庫級驗證與導航改進

#### 新增課程內容

**模組 03 - 起步**
- **12-mcp-hosts/README.md**：新增完整的 MCP 主機設置指南
  - Claude Desktop、VS Code、Cursor、Cline、Windsurf 配置示例
  - 所有主要主機的 JSON 配置範本
  - 傳輸類型比較表（stdio、SSE/HTTP、WebSocket）
  - 常見連線問題排解
  - 主機配置安全最佳實踐

- **13-mcp-inspector/README.md**：新增 MCP Inspector 偵錯指南
  - 安裝方式（npx、npm 全域、原始碼方式）
  - 透過 stdio 和 HTTP/SSE 連線伺服器
  - 測試工具、資源與提示工作流程
  - VS Code 與 MCP Inspector 整合
  - 常見偵錯情境與解決方案

**模組 04 - 實務應用**
- **pagination/README.md**：新增分頁實作指南
  - Python、TypeScript、Java 的基於指標的分頁模式
  - 客戶端分頁處理
  - 指標設計策略（不透明 vs. 結構化）
  - 性能優化建議

**模組 05 - 進階主題**
- **mcp-protocol-features/README.md**：新增協定功能深度介紹
  - 進度通知的實作
  - 請求取消模式
  - 帶 URI 模式的資源範本
  - 伺服器生命週期管理
  - 日誌層級控制
  - JSON-RPC 錯誤處理模式

#### 導航修正（更新 24+ 檔案）

**主要模組 README**
 現已連結至第一課與下一模組

**02-Security 子文件**
- 所有 5 份安全輔助文件皆新增「接下來做什麼」導航：

**09-CaseStudy 文件**
- 所有案例研究文件均加入連續導航：

**10-StreamliningAI 實驗室**
為模組 10 概覽及模組 11 新增「接下來做什麼」區塊

#### 程式碼與內容修正

**SDK 與依賴更新**
修正空白的 openai 版本為 `^4.95.0`
將 SDK 從 `^1.8.0` 更新為 `>=1.26.0`
將 mcp 版本釘選更新為 `>=1.26.0`

<strong>程式碼修復</strong>
修正無效模型 `gpt-4o-mini` 為 `gpt-4.1-mini`

<strong>內容修正</strong>
修正錯誤連結 `READMEmd` → `README.md`，修正課程標題 `Module 1-3` → `Module 0-3`，修正大小寫敏感路徑
移除損壞的重複案例研究 5 內容

<strong>初學者指引改進</strong>
新增正確的入門介紹、學習目標與先備條件

#### 課程更新

**主 README.md**
- 新增課程表條目 3.12（MCP 主機）、3.13（MCP Inspector）、4.1（分頁）、5.16（協定功能）

**模組 README**
新增第 12 與 13 課程列表
新增包含分頁連結的實務指南區段
新增第 5.15（自訂傳輸）與 5.16（協定功能）課程

**study_guide.md**
- 更新心智圖，涵蓋所有新主題：MCP 主機設定、MCP Inspector、分頁策略、協定功能深度介紹

## 2026 年 1 月 28 日

### MCP 規範 2025-11-25 遵循性審查

#### 核心概念加強（01-CoreConcepts/）
- **新增客戶端原語—Roots**：新增全面文件，說明 Roots 客戶端原語，讓伺服器理解檔案系統邊界與存取權限
- <strong>工具註解</strong>：新增工具行為註解文件（`readOnlyHint`、`destructiveHint`），支援更佳的工具執行決策
- <strong>取樣中呼叫工具</strong>：更新取樣文件，加入 `tools` 與 `toolChoice` 參數，支援模型主導的工具呼叫
- **URL 模式引導**：新增文件說明基於 URL 的外部網頁互動伺服器啟動
- **任務（實驗性）**：新增實驗性任務功能文件，描述持久化執行封裝與延遲結果檢索
- <strong>圖標支援</strong>：說明工具、資源、資源範本與提示現在可包含圖標作為額外元資料

#### 文件更新
- **README.md**：新增 MCP 規範 2025-11-25 版本參考與以日期為版本說明
- **study_guide.md**：更新課程地圖，包含任務與工具註解於核心概念節；更新文件時間戳記

#### 規範遵循驗證
- <strong>協定版本</strong>：確認所有文件均引用最新 MCP 規範 2025-11-25
- <strong>架構一致</strong>：確認兩層架構（資料層與傳輸層）文件準確
- <strong>原語文件</strong>：驗證伺服器原語（資源、提示、工具）與客戶端原語（取樣、引導、日誌、Roots）
- <strong>傳輸機制</strong>：驗證 STDIO 與可串流 HTTP 傳輸文檔正確
- <strong>安全指導</strong>：確認符合最新 MCP 安全最佳實踐文件

#### MCP 2025-11-25 主要功能記錄
- **OpenID Connect 發現**：透過 OIDC 進行授權伺服器發現
- **OAuth 用戶端 ID 元資料文件**：建議用戶端註冊機制
- **JSON Schema 2020-12**：MCP 架構定義的預設方言
- **SDK 分級系統**：正式化 SDK 功能支援與維護需求
- <strong>治理結構</strong>：正式化 MCP 工作群組與利害關係群組治理結構

### 安全文件重大更新（02-Security/）

#### MCP 安全高峰工作坊（Sherpa）整合
- <strong>新增實作訓練資源</strong>：於所有安全文件新增完整的 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 整合
- <strong>行程路徑完整記錄</strong>：記錄從基地營到高峰營的完整行程進度
- **OWASP 對應**：所有安全指導均映射至 OWASP MCP Azure Security Guide 風險

#### OWASP MCP Top 10 整合
- <strong>新增區塊</strong>：主安全 README 內新增 OWASP MCP Top 10 安全風險表和 Azure 緩解措施
- <strong>風險導向文件</strong>：更新 mcp-security-controls-2025.md，附上 OWASP MCP 各風險對應於安全領域
- <strong>參考架構</strong>：連結 OWASP MCP Azure Security Guide 參考架構與實作範例

#### 更新安全文件
- **README.md**：新增 Sherpa 工作坊概覽、行程路徑表、OWASP MCP Top 10 風險摘要與實作訓練區塊
- **mcp-security-controls-2025.md**：更新標頭為 2026 年 2 月，新增 OWASP 風險參考（MCP01-MCP08），修正版本不一致問題
- **mcp-security-best-practices-2025.md**：新增 Sherpa 與 OWASP 資源區塊，更新時間戳記
- **mcp-best-practices.md**：新增 Sherpa 與 OWASP 連結的實作訓練區塊
- **azure-content-safety-implementation.md**：新增 OWASP MCP06 參考，與 Sherpa Camp 3 對齊，並新增資源區塊

#### 新增資源連結
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- 各 OWASP MCP 風險頁面（MCP01-MCP10）

### 課程全面配合 MCP 規範 2025-11-25

#### 模組 03 - 起步
- **SDK 文件**：新增 Go SDK 至官方 SDK 清單；更新所有 SDK 參照以符合 MCP 規範 2025-11-25
- <strong>傳輸說明</strong>：更新 STDIO 與 HTTP 串流傳輸描述，明確附上規範參考

#### 模組 04 - 實務應用
- **SDK 更新**：新增 Go SDK；於 SDK 清單附加規範版本參考
- <strong>授權規範</strong>：更新 MCP 授權規範連結至最新 2025-11-25 版本

#### 模組 05 - 進階主題
- <strong>新功能</strong>：新增 MCP 規範 2025-11-25 新增功能說明（任務、工具註解、URL 模式引導、Roots）
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 與 Sherpa 工作坊連結於附加參考資料

#### 模組 06 - 社群貢獻
- **SDK 清單**：新增 Swift 與 Rust SDK；更新規範連結至 2025-11-25
- <strong>規範連結</strong>：更新 MCP 規範至直接規範網址

#### 模組 07 - 早期採用經驗
- <strong>資源更新</strong>：新增 MCP 規範 2025-11-25 連結與 OWASP MCP Top 10 於附加資源

#### 模組 08 - 最佳實踐
- <strong>規範版本</strong>：更新 MCP 規範參考至 2025-11-25
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 與 Sherpa 工作坊於附加參考

#### 模組 10 - 精簡 AI 工作流程
- <strong>徽章更新</strong>：將 MCP 版本徽章由 SDK 版本（1.9.3）改為規範版本（2025-11-25）
- <strong>資源連結</strong>：更新 MCP 規範連結；新增 OWASP MCP Top 10

#### 模組 11 - MCP 伺服器動手實驗
- <strong>規範參考</strong>：更新 MCP 規範連結至 2025-11-25 版本
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 至官方資源

## 2025 年 12 月 18 日

### 安全文件更新 - MCP 規範 2025-11-25

#### MCP 安全最佳實務（02-Security/mcp-best-practices.md）—規範版本更新
- <strong>協定版本更新</strong>：更新至最新 MCP 規範 2025-11-25（發布於 2025 年 11 月 25 日）
  - 將所有規範版本參考由 2025-06-18 更新為 2025-11-25
  - 文件日期參考由 2025 年 8 月 18 日改為 2025 年 12 月 18 日
  - 確認所有規範網址指向最新文件
- <strong>內容驗證</strong>：全面驗證安全最佳實務符合最新標準
  - **Microsoft 安全方案**：確認 Prompt Shields（前稱「越獄風險偵測」）、Azure Content Safety、Microsoft Entra ID、Azure Key Vault 的現行術語與連結
  - **OAuth 2.1 安全**：確認符合最新 OAuth 安全最佳實務
  - **OWASP 標準**：驗證 LLM OWASP Top 10 參考依然有效
  - **Azure 服務**：確認所有 Microsoft Azure 文件連結與最佳實務
- <strong>標準一致性</strong>：確認所有引用的安全標準皆為最新
  - NIST AI 風險管理架構
  - ISO 27001:2022
  - OAuth 2.1 安全最佳實務
  - Azure 安全與合規框架
- <strong>實作資源</strong>：驗證所有實作指南連結與資源
  - Azure API 管理認證模式
  - Microsoft Entra ID 整合指南
  - Azure Key Vault 秘密管理
  - DevSecOps 流水線與監控方案

### 文件品質保證
- <strong>規範遵循</strong>：確保所有 MCP 安全要求（MUST/MUST NOT）符合最新規範
- <strong>資源現況</strong>：確認所有外部連結指向 Microsoft 文件、安全標準與實作指南
- <strong>最佳實務涵蓋</strong>：確認認證、授權、AI 相關威脅、供應鏈安全與企業模式完整涵蓋

## 2025 年 10 月 6 日

### 起步章節擴充 — 進階伺服器使用與簡易驗證

#### 進階伺服器使用（03-GettingStarted/10-advanced）
- <strong>新增章節</strong>：引入完整進階 MCP 伺服器使用指南，涵蓋一般與低階伺服器架構
  - <strong>一般伺服器與低階伺服器</strong>：提供兩種架構的詳細比較，及 Python 與 TypeScript 範例
  - <strong>基於處理器設計</strong>：說明基於處理器管理工具／資源／提示的模式，支援可擴充與靈活伺服器實作
  - <strong>實務模式</strong>：說明低階伺服器模式如何在進階功能與架構中發揮優勢的真實場景
#### 簡易身份驗證 (03-GettingStarted/11-simple-auth)
- <strong>新增章節</strong>：逐步說明如何在 MCP 伺服器中實作簡易身份驗證。
  - <strong>身份驗證概念</strong>：清楚解釋身份驗證與授權，以及憑證處理方式。
  - <strong>基本身份驗證實作</strong>：基於中介軟體的身份驗證模式示範，涵蓋 Python (Starlette) 和 TypeScript (Express) 的程式碼範例。
  - <strong>進階安全性引導</strong>：從簡易身份驗證邁向 OAuth 2.1 及 RBAC 的指導，並提供進階安全模組參考。

這些新增內容提供實務操作指導，助力打造更健全、安全且彈性的 MCP 伺服器實作，將基礎概念與進階生產模式連結起來。

## 2025年9月29日

### MCP 伺服器資料庫整合實驗室 - 全面實務學習路徑

#### 11-MCPServerHandsOnLabs - 新增完整資料庫整合課程
- **完整13個實驗室學習路徑**：增加生產級 MCP 伺服器與 PostgreSQL 資料庫整合的全面實作課程
  - <strong>實務案例</strong>：Zava Retail 分析用例，展示企業級模式
  - <strong>結構化學習進程</strong>：
    - **實驗室 00-03：基礎** — 介紹、核心架構、安全與多租戶、環境設定
    - **實驗室 04-06：建置 MCP 伺服器** — 資料庫設計與架構、MCP 伺服器實作、工具開發
    - **實驗室 07-09：進階功能** — 語意搜尋整合、測試與除錯、VS Code 整合
    - **實驗室 10-12：生產與最佳實務** — 部署策略、監控與觀測、最佳實踐與優化
  - <strong>企業技術</strong>：FastMCP 框架、結合 pgvector 的 PostgreSQL、Azure OpenAI embeddings、Azure Container Apps、Application Insights
  - <strong>進階功能</strong>：資料列級安全 (RLS)、語意搜尋、多租戶資料訪問、向量嵌入、即時監控

#### 術語標準化 - 模組改稱為實驗室
- <strong>全面文件更新</strong>：系統化將 11-MCPServerHandsOnLabs 裡所有 README 檔案內「模組」改為「實驗室」
  - <strong>章節標題</strong>：將所有「本模組涵蓋內容」改為「本實驗室涵蓋內容」
  - <strong>內容描述</strong>：文件中「本模組提供……」改寫為「本實驗室提供……」
  - <strong>學習目標</strong>：將「完成本模組後……」改為「完成本實驗室後……」
  - <strong>導覽連結</strong>：跨參考及目錄中所有「模組 XX：」轉換成「實驗室 XX：」
  - <strong>完成追蹤</strong>：將「完成本模組後……」改為「完成本實驗室後……」
  - <strong>保留技術引用</strong>：維持設定檔如「module": "mcp_server.main" 的 Python 模組參考

#### 學習指南強化 (study_guide.md)
- <strong>視覺課程地圖</strong>：新增「11. 資料庫整合實驗室」章節，內含完整實驗室結構視覺化
- <strong>檔案結構</strong>：從十個主要章節更新為十一個，詳述 11-MCPServerHandsOnLabs
- <strong>學習路徑指引</strong>：增強導覽說明，涵蓋 00-11 章節
- <strong>技術涵蓋</strong>：新增 FastMCP、PostgreSQL、Azure 服務整合細節
- <strong>學習成果</strong>：強調生產準備伺服器開發、資料庫整合模式及企業安全

#### 主 README 構架強化
- <strong>實驗室制術語</strong>：11-MCPServerHandsOnLabs 主要 README.md 均改用「實驗室」架構
- <strong>學習路徑組織</strong>：清晰呈現從基礎概念至進階實作與生產部署之進階
- <strong>實務導向</strong>：重點突顯企業級實務操作與技術模式

### 文件品質與一致性改進
- <strong>強化實務學習</strong>：整份文件內均強調以實驗室為基礎的實務取向
- <strong>企業模式聚焦</strong>：聚焦生產就緒及企業安全實作
- <strong>技術整合</strong>：全面涵蓋現代 Azure 服務與 AI 整合模式
- <strong>學習進階</strong>：明確且系統化的學習途徑，從概念到生產

## 2025年9月26日

### 案例研究強化 - GitHub MCP Registry 整合

#### 案例研究 (09-CaseStudy/) - 生態系發展重點
- **README.md**：大幅擴展，新增全面的 GitHub MCP Registry 案例研究
  - **GitHub MCP Registry 案例研究**：深入探討 2025 年 9 月 GitHub MCP Registry 啟用
    - <strong>問題分析</strong>：深度剖析分散 MCP 伺服器發現與部署難題
    - <strong>解決架構</strong>：GitHub 集中式註冊表與一鍵安裝 VS Code 擴充
    - <strong>商業影響</strong>：明顯提升開發者上手與產能
    - <strong>策略價值</strong>：聚焦模組化代理部署與跨工具互通性
    - <strong>生態系發展</strong>：定位為代理系統整合基礎平台
  - <strong>強化案例結構</strong>：調整七個案例研究格式與說明一致性
    - Azure AI 旅遊代理：多代理協作重點
    - Azure DevOps 整合：工作流程自動化焦點
    - 即時文件檢索：Python 控制台客戶端實作
    - 互動式學習計劃生成器：Chainlit 對話式 Web 應用
    - 編輯器內文件：VS Code 與 GitHub Copilot 整合
    - Azure API 管理：企業 API 整合模式
    - GitHub MCP Registry：生態系發展與社群平台
  - <strong>全面結論</strong>：重寫結論，統整跨多維度 MCP 實作的七大案例
    - 企業整合、多代理調度、開發者產能
    - 生態系發展、教育應用分類
    - 加強對架構模式、策略實作及最佳實務的見解
    - 強調 MCP 作為成熟且生產就緒協定

#### 學習指南更新 (study_guide.md)
- <strong>視覺課程地圖</strong>：更新心智圖，納入 GitHub MCP Registry 於案例研究區
- <strong>案例研究說明</strong>：從泛泛描述轉為七個全面案例詳細拆解
- <strong>檔案結構</strong>：更新第 10 章展現全面案例研究及具體實作細節
- <strong>變更日誌整合</strong>：新增 2025 年 9 月 26 日，記錄 GitHub MCP Registry 新增與案例強化
- <strong>日期更新</strong>：更新頁腳時間戳為最新修訂 (2025年9月26日)

### 文件品質改進
- <strong>一致性強化</strong>：七個案例研究範例均統一格式與結構
- <strong>涵蓋範圍廣泛</strong>：涵蓋企業、開發者產能及生態系發展場景
- <strong>策略定位</strong>：強化 MCP 作為代理系統部署基礎平台
- <strong>資源整合</strong>：附加資源包含 GitHub MCP Registry 連結

## 2025年9月15日

### 進階主題擴充 - 自訂傳輸與脈絡工程

#### MCP 自訂傳輸 (05-AdvancedTopics/mcp-transport/) - 最新進階實作指南
- **README.md**：完整自訂 MCP 傳輸機制實作指南
  - **Azure Event Grid 傳輸**：全面無伺服器事件驅動傳輸實作
    - C#、TypeScript 與 Python 範例，搭配 Azure Functions 整合
    - 事件驅動架構模式，支援可擴展 MCP 解決方案
    - Webhook 接收器與推送訊息處理
  - **Azure Event Hubs 傳輸**：高吞吐量串流傳輸實作
    - 支援即時串流與低延遲情境
    - 分區策略與檢查點管理
    - 訊息批次處理與效能優化
  - <strong>企業整合模式</strong>：生產就緒架構範例
    - 多 Azure Functions 分散式 MCP 處理
    - 混合傳輸架構結合多種傳輸類型
    - 訊息耐久性、可靠性與錯誤處理策略
  - <strong>安全與監控</strong>：Azure Key Vault 整合與觀測模式
    - 管理身分驗證與最小權限存取
    - Application Insights 遙測與效能監控
    - 電路斷路器與容錯模式
  - <strong>測試架構</strong>：自訂傳輸完整測試策略
    - 單元測試結合測試替身與模擬框架
    - Azure 測試容器整合測試
    - 效能與負載測試考量

#### 脈絡工程 (05-AdvancedTopics/mcp-contextengineering/) - 新興 AI 領域
- **README.md**：全面探討脈絡工程作為新興領域
  - <strong>核心原則</strong>：完整脈絡分享、行動決策意識、脈絡窗口管理
  - **MCP 協定對應**：MCP 設計如何解決脈絡工程挑戰
    - 脈絡窗口限制與漸進載入策略
    - 相關性判定與動態脈絡擷取
    - 多模態脈絡處理與安全考量
  - <strong>實作途徑</strong>：單執行緒與多代理架構
    - 脈絡切塊與優先排序技巧
    - 漸進式脈絡載入與壓縮策略
    - 分層脈絡方法與取用優化
  - <strong>衡量架構</strong>：脈絡效能評估新型指標
    - 輸入效率、效能、品質與使用者體驗
    - 脈絡優化實驗方法
    - 失效分析與改進方式

#### 課程導覽更新 (README.md)
- <strong>模組結構強化</strong>：更新課程表納入最新進階主題
  - 新增脈絡工程 (5.14) 與自訂傳輸 (5.15)
  - 全模組的格式與導覽連結統一
  - 更新描述以反映當前內容範圍

### 目錄結構改進
- <strong>命名標準化</strong>：將「mcp transport」改為「mcp-transport」，與其他進階主題資料夾一致
- <strong>內容組織</strong>：05-AdvancedTopics 下所有資料夾皆遵循一致命名模式 (mcp-[topic])

### 文件品質提升
- **MCP 規範對齊**：所有新內容引用最新 MCP Specification 2025-06-18
- <strong>多語言範例</strong>：C#、TypeScript 與 Python 完整程式碼示例
- <strong>企業聚焦</strong>：全篇涵蓋生產就緒模式與 Azure 雲端整合
- <strong>視覺文件</strong>：使用 Mermaid 圖表呈現架構與流程

## 2025年8月18日

### 文件全面更新 - MCP 2025-06-18 標準

#### MCP 安全最佳實踐 (02-Security/) - 全面現代化
- **MCP-SECURITY-BEST-PRACTICES-2025.md**：完全重寫，對齊 MCP Specification 2025-06-18
  - <strong>強制性規範</strong>：新增官方規範中的 MUST / MUST NOT 條件，並附明確視覺標示
  - **12 大核心安全實務**：由 15 項清單重構為完整安全領域
    - Token 安全與身份驗證，含外部身份提供者整合
    - 會話管理與傳輸安全，含密碼學要求
    - AI 專屬威脅防護，含 Microsoft Prompt Shields 整合
    - 存取控制與權限，強調最小權限原則
    - 內容安全與監控，整合 Azure Content Safety
    - 供應鏈安全，全面元件驗證
    - OAuth 安全與混淆代理防護，含 PKCE 實作
    - 事件應變與回復，自動化能力
    - 法規遵循與治理，與合規對齊
    - 進階安全控管，採用零信任架構
    - Microsoft 安全生態系統整合，包含多方案
    - 持續安全演進，適應性實務
  - **Microsoft 安全解決方案**：強化 Prompt Shields、Azure Content Safety、Entra ID 與 GitHub Advanced Security 整合指引
  - <strong>實作資源</strong>：依官方 MCP 文件、Microsoft 安全方案、安全標準與實作指南分類整理

#### 進階安全控管 (02-Security/) - 企業級實作
- **MCP-SECURITY-CONTROLS-2025.md**：完整 overhaul，企業級安全架構
  - **9 大安全領域**：從基礎控管升級至詳細企業框架
    - 進階身份驗證與授權，含 Microsoft Entra ID 整合
    - Token 安全與防止轉發控管，完整驗證
    - 會話安全控管，防止劫持
    - AI 專屬安全控管，防範提示注入與工具污染
    - 混淆代理攻擊防護，OAuth 代理安全
    - 工具執行安全，沙箱與隔離
    - 供應鏈安全控管，依賴驗證
    - 監控與偵測控管，整合 SIEM
    - 事件應變與回復，自動化能力
  - <strong>實作範例</strong>：新增詳細 YAML 配置範例與程式碼示例
  - **Microsoft 解決方案整合**：深度涵蓋 Azure 安全服務、GitHub Advanced Security 及企業身份管理

#### 進階主題安全 (05-AdvancedTopics/mcp-security/) - 生產就緒實作
- **README.md**：企業安全實作全面重寫
  - <strong>最新規範對齊</strong>：更新至 MCP Specification 2025-06-18 強制安全要求
  - <strong>強化身份驗證</strong>：Microsoft Entra ID 整合，含完整 .NET 與 Java Spring Security 範例
  - **AI 安全整合**：Microsoft Prompt Shields 及 Azure Content Safety 實作，含詳細 Python 範例
  - <strong>進階威脅防護實作</strong>：
    - 混淆代理攻擊防護，採用 PKCE 與使用者同意驗證
    - Token 轉發防護，含受眾驗證與安全 Token 管理
    - 會話劫持防範，含密碼綁定與行為分析
  - <strong>企業安全整合</strong>：Azure Application Insights 監控、威脅偵測管線與供應鏈安全
  - <strong>實作清單</strong>：明確安全控管的必須與推薦項目，強調 Microsoft 安全生態系優勢

### 文件品質與標準對齊
- <strong>規格參考</strong>：已更新至最新 MCP 規格 2025-06-18 的所有參考
- <strong>微軟安全生態系統</strong>：強化所有安全文件中的整合指引
- <strong>實務實作</strong>：新增 .NET、Java 和 Python 的詳細程式碼範例，附帶企業範式
- <strong>資源組織</strong>：完備官方文件、安全標準與實作指引的分類
- <strong>視覺指示</strong>：清楚標示強制性需求與建議做法


#### 核心概念 (01-CoreConcepts/) - 完全現代化
- <strong>協定版本更新</strong>：更新為引用最新 MCP 規格 2025-06-18，使用日期版本（YYYY-MM-DD 格式）
- <strong>架構優化</strong>：強化 Hosts、Clients 及 Servers 的描述，以反映現行 MCP 架構範式
  - Hosts 現在明確定義為協調多個 MCP 用戶端連接的 AI 應用程式
  - Clients 描述為保持一對一伺服器關係的協定連接器
  - Servers 加強區分本地與遠端部署情境
- <strong>原語重組</strong>：伺服器與用戶端原語全面改寫
  - 伺服器原語：資源（資料源）、提示（範本）、工具（可執行函式），附詳盡說明與範例
  - 用戶端原語：取樣（LLM 完成）、引出（用戶輸入）、日誌（除錯/監控）
  - 更新現行探索（`*/list`）、擷取（`*/get`）及執行（`*/call`）方法模式
- <strong>協定架構</strong>：導入雙層架構模型
  - 資料層：基於 JSON-RPC 2.0，涵蓋生命週期管理與原語
  - 傳輸層：STDIO（本地）及可串流 HTTP 含 SSE（遠端）傳輸機制
- <strong>安全框架</strong>：全面的安全原則，包括明確用戶同意、資料隱私保護、工具執行安全與傳輸層安全性
- <strong>通訊模式</strong>：更新協定訊息以展示初始化、探索、執行與通知流程
- <strong>程式碼範例</strong>：刷新多語言範例（.NET、Java、Python、JavaScript）以符合現行 MCP SDK 範式

#### 安全 (02-Security/) - 全面安全改寫  
- <strong>標準對齊</strong>：完全對應 MCP 規格 2025-06-18 的安全需求
- <strong>認證演進</strong>：記錄自訂 OAuth 伺服器演進至外部身分提供者代理（Microsoft Entra ID）
- **AI 專屬威脅分析**：強化現代 AI 攻擊向量說明
  - 詳細提示注入攻擊情境與真實案例
  - 工具污染機制與「拉地毯」攻擊模式
  - 上下文視窗污染及模型混淆攻擊
- **微軟 AI 安全方案**：詳盡涵蓋微軟安全生態系統
  - AI 提示防護罩，具有進階偵測、聚焦與分隔符技術
  - Azure 內容安全整合樣式
  - GitHub 進階安全保護供應鏈
- <strong>進階威脅緩解</strong>：細緻安全控管
  - 會話劫持，包含 MCP 專屬攻擊場景與密碼學會話 ID 要求
  - MCP 代理中混淆代理問題，配合明確用戶同意規範
  - 令牌轉送漏洞，附必須驗證控管
- <strong>供應鏈安全</strong>：擴充 AI 供應鏈涵蓋基礎模型、嵌入服務、上下文提供者與第三方 API
- <strong>基礎安全</strong>：強化與企業安全範式整合，包括零信任架構與微軟安全生態圈
- <strong>資源組織</strong>：依類型分類豐富資源連結（官方文件、標準、研究、微軟方案、實作指引）

### 文件品質改進
- <strong>結構化學習目標</strong>：加強具體行動目標的學習目標
- <strong>交叉參考</strong>：新增安全與核心概念主題間的連結
- <strong>資訊更新</strong>：更新所有日期及規格連結至最新標準
- <strong>實作指引</strong>：於兩大章節加添具體且可行的實作建議

## 2025 年 7 月 16 日

### README 與導航改進
- 完全重新設計 README.md 中的課程導航
- 用更符合無障礙的表格格式取代 `<details>` 標籤
- 在新建的 "alternative_layouts" 資料夾中創建替代佈局選項
- 新增卡片式、分頁式與手風琴式導航範例
- 更新存放庫結構章節涵蓋所有最新檔案
- 強化「如何使用此課程」章節的明確建議
- 將 MCP 規格連結更新為正確 URL
- 在課程架構中新增 Context Engineering 章節（5.14）

### 學習指南更新
- 完整重寫學習指南以配合現行存放庫架構
- 新增 MCP 用戶端與工具、熱門 MCP 伺服器章節
- 更新視覺課程地圖以精確反映所有主題
- 強化進階主題說明涵蓋所有專門領域
- 更新案例研究章節以反映實際範例
- 新增這份詳盡變更日誌

### 社群貢獻 (06-CommunityContributions/)
- 新增有關影像生產用 MCP 伺服器的詳細資訊
- 新增在 VSCode 使用 Claude 的完整章節
- 新增 Cline 終端用戶端設定及使用說明
- 更新 MCP 用戶端章節，包含所有熱門用戶端選項
- 增強貢獻範例，附更精準程式碼示例

### 進階主題 (05-AdvancedTopics/)
- 以一致命名整理所有專門主題資料夾
- 新增上下文工程相關資料與範例
- 新增 Foundry 代理整合文件
- 強化 Entra ID 安全整合文件

## 2025 年 6 月 11 日

### 初始建立
- 發布 MCP 初學者課程第一版
- 建立所有 10 個主體章節的基本結構
- 實作視覺課程地圖以供導航
- 新增多種程式語言的初始範例專案

### 入門 (03-GettingStarted/)
- 建立首批伺服器實作範例
- 新增用戶端開發指導
- 包含 LLM 用戶端整合說明
- 新增 VS Code 整合文件
- 實作伺服器事件推送 (SSE) 伺服器範例

### 核心概念 (01-CoreConcepts/)
- 新增用戶端－伺服器架構詳細說明
- 建立關鍵協定元件說明文件
- 記錄 MCP 的訊息傳遞模式

## 2025 年 5 月 23 日

### 存放庫結構
- 初始化存放庫並建立基本資料夾結構
- 為各主要章節建立 README 文件
- 建立翻譯基礎設施
- 新增圖像資產與示意圖

### 文件
- 建立初版 README.md，含課程總覽
- 新增行為準則 CODE_OF_CONDUCT.md 與安全說明 SECURITY.md
- 設立 SUPPORT.md，提供支援指引
- 創建初步學習指南結構

## 2025 年 4 月 15 日

### 規劃與框架
- MCP 初學者課程初步規劃
- 確定學習目標與目標受眾
- 草擬課程的 10 個章節架構
- 制定範例與案例研究的概念框架
- 建立關鍵概念的初步範例原型

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->