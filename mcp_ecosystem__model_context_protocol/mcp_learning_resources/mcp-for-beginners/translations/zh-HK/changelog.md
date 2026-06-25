# 版本紀錄：MCP 初學者課程

此文件記錄了對初學者版 Model Context Protocol (MCP) 課程所做的所有重大更改。更改以反向時間順序紀錄（最新更改在前）。

## 2026年6月24日

### 新課程：在 Copilot 應用程式中使用 MCP

- [工具部分](./12-tooling/README.md) 新增工具部分。
- [Copilot 應用中的 MCP](./12-tooling/01-copilot-app/README.md)

## 2026年6月16日

### MCP 規範對齊與樣本驗證

已依據最新的 **MCP 規範 2025-11-25** 及官方最新版 SDK 驗證課程，修正殘留陳舊的規範引用，並確認核心範例仍可成功建置與執行。

#### 規範版本修正（2025-06-18 / 2025-03-26 → 2025-11-25）

更新英文內容中仍宣稱較舊規範版本為<em>現行/最新</em>標準的部分，並重新指向正規的 `modelcontextprotocol.io` 規範網址：
- **05-AdvancedTopics/mcp-security/README.md**：更新「現行標準」標示、介紹、核心安全原則標題、強制性要求標題、Microsoft Entra ID 部分、參考資料連結及安全結語通知（8個參考）至 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**：更新附加資源規範連結及「現行標準」標示至 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**：將老舊的 `2025-03-26` 安全與信任連結替換為當前的 2025-11-25 安全最佳實務頁面
- **03-GettingStarted/14-sampling/README.md**：更新官方採樣文件連結至 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**：更新現用語態的「目前 MCP 規範」引用及附加資源規範連結至 2025-11-25（歷史 SSE 廢止說明維持不變以保持準確性）

#### 樣本對現行 SDK 驗證

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**：`npm install` 解決 `@modelcontextprotocol/sdk@1.29.0`；`tsc --noEmit` 無型別錯誤 — 現有 `McpServer` / `StdioServerTransport` API 仍有效
- **Python (03-GettingStarted/01-first-server/solution/python)**：在獨立 `.venv` 中以 `mcp[cli]` (1.27.2) 驗證；`py_compile` 通過且 `FastMCP.list_tools()` 正確回傳 `add` 和 `subtract` 工具
- 確認所有範例中 `@modelcontextprotocol/sdk` 版本區間（`>=1.26.0` / `^1.26.0` / `^1.27.0`）均順利解析到現行 `1.29.0` 且無破壞性 API 變更

#### 依賴版本一致性調整（填補版本差距）

將過時的 SDK 版本調升，使每個範例都追蹤最新 MCP 版本，符合全倉庫慣例：
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**：`@modelcontextprotocol/sdk` 從 `^1.8.0` 提升至 `>=1.26.0`，同時更新過時的 `"updated for MCP 2025-06-18"` 套件描述為 `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** 及 **lab4/code/github_mcp_server/pyproject.toml**：將固定版本 `mcp==1.23.0` 提升為 `mcp>=1.26.0`；重新生成兩份 `uv.lock` 文件（使用 uv lock）使鎖檔解析到現行 `mcp 1.27.2`，並與規格清單保持同步

#### 課程差距分析 — 最新規範功能涵蓋

確認課程已涵蓋 MCP 2025-11-25 引入/擴充的所有原語，無內容遺漏：
- <strong>採樣</strong>：課程 03-GettingStarted/14-sampling 與 05-AdvancedTopics/mcp-sampling
- **引導（含 URL 模式）**：記錄於 01-CoreConcepts 與 05-AdvancedTopics/mcp-protocol-features
- <strong>根節點</strong>：記錄於 00-Introduction、01-CoreConcepts 與 05-AdvancedTopics/mcp-root-contexts
- **任務（實驗性、長時間運作）**：記錄於 01-CoreConcepts 與 05-AdvancedTopics/mcp-protocol-features
- <strong>工具標註</strong>（`readOnlyHint` / `destructiveHint`）：記錄於 01-CoreConcepts 與 05-AdvancedTopics/mcp-protocol-features

### 安全加固與依賴漏洞修復

對所有依賴清單及範例原始碼執行全面安全檢查，修復所有 npm 警示及一項程式碼安全問題。修復後，每個被審核目錄中 `npm audit` 報告<strong>無漏洞</strong>。

#### npm 依賴漏洞（傳遞性） — 修復完成

審核所有 15 份提交的 `package-lock.json`。漏洞皆限於由 MCP Inspector 開發工具、OpenAI 客戶端及 MCP SDK 引入的傳遞性依賴，均已修復且不破壞範例：
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** 及 **lab3/code/weather_mcp/inspector**：升級 `@modelcontextprotocol/inspector`（`0.16.6` / `0.14.1` → `0.22.0`），清除了綁定的 `ajv`、`brace-expansion`、`diff`、`path-to-regexp` 及 `ws` 警示。新增 npm `overrides` 條目強制 patched 版本 `shell-quote@1.8.4`，清除剩餘因 `concurrently` 引入的嚴重漏洞；重新生成兩份鎖檔（現零漏洞）
- **03-GettingStarted/samples/typescript**：執行 `npm audit fix` 升級中等風險的傳遞依賴 `qs` 至 patched 版本
- **03-GettingStarted/samples/javascript**：執行 `npm audit fix` 升級中等風險的傳遞依賴 `hono` 至 patched 版本
- **03-GettingStarted/03-llm-client/solution/typescript**：執行 `npm audit fix` 升級高風險的傳遞依賴 `form-data` 至 patched 版本
- **03-GettingStarted/11-simple-auth/solution/typescript**：產生缺失的 `package-lock.json`，確保專案可重現與可審核（零漏洞）

#### 程式碼層級安全修正（OWASP A03：注入漏洞）

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**：從 `open_in_vscode` 工具中移除 `shell=True`。先前的 `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` 允許資料夾路徑內的 shell 元字元被 `cmd.exe` 解釋（命令注入風險）。現改直接啟動解析後的 `Code.exe` 並以資料夾作為參數 — 無 shell 執行，功能等效且安全。

#### Python 依賴審核

- 使用 `pip-audit` 審核所有 Python 套件清單。`05-AdvancedTopics` 與 `03-GettingStarted/samples/python` 報告<strong>無已知漏洞</strong>（其 `mcp` / `httpx` / `pydantic` / `python-dotenv` 版本域均解析至現行補丁版本）
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**：`pip-audit` 檢出傳遞依賴 **`werkzeug` 3.1.1** 具有三項 `safe_join` Windows 裝置名稱 DoS 漏洞警示 — `CVE-2025-66221`、`CVE-2026-21860`、`CVE-2026-27199`（均已在 3.1.6 修復）。新增明確安全版本限制 `werkzeug>=3.1.6`，確保解析補丁版本；並核驗該約束可與 `chainlit` / `mcp` / `semantic-kernel` 堆疊順利解析。

### 產品名稱重命名

更新所有課程內容，以反映 Microsoft 產品品牌重塑：

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**：更新 Discord 社群鏈結
- **AGENTS.md**：更新 Discord 伺服器參照
- **README.md**：更新技術生態系統參照
- **study_guide.md**：更新案例研究參照
- **05-AdvancedTopics/README.md**：更新模組 5.13 標題與描述
- **05-AdvancedTopics/mcp-integration/README.md**：更新章節標題與描述
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**：完整模組標題及內容更新
- **05-AdvancedTopics/mcp-security-entra/README.md**：更新交叉參照鏈結
- **07-LessonsfromEarlyAdoption/README.md**：更新案例研究參照
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**：更新第 9 節標題、徽章及功能
- **08-BestPractices/README.md**：更新 Discord 社群鏈結
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**：更新 Discord 頻道參照
- **09-CaseStudy/docs-mcp/solution/python/README.md**：更新模型部署參照
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**：更新 AI 服務表格
- **11-MCPServerHandsOnLabs/03-Setup/README.md**：更新資源參照

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**：更新主要課程參照
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**：更新模組標題、概述及所有模組標題
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**：更新標題、學習目標、設定指示及資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**：更新標題、學習目標、MCP 主機表及交叉參照
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**：更新標題、徽章、先決條件及資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**：更新代理建構器參照與回饋鏈結
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**：更新先決條件及擴充參照

---

## 2026年4月11日

### 新課程、文件修正與依賴更新

#### 新增課程內容

**模組 05 - 進階主題**
- **課程 5.17：MCP 中的對抗式多代理推理**（`05-AdvancedTopics/mcp-adversarial-agents/README.md`）：全新詳盡指南，涵蓋多代理系統的對抗辯論模式
  - Mermaid 架構圖：兩個代理 → 共享 MCP 伺服器 → 辯論記錄 → 裁判 → 判決
  - 以 Python 和 TypeScript 實作的共享 MCP 工具伺服器（`web_search` + `run_python`）
  - 對立系統提示（贊成 / 反對 / 裁判）及明確工具使用要求
  - 使用 Python、TypeScript 與 C# 實作的辯論協調者，管理回合和訊息路由
  - 協調者中 MCP `ClientSession` 的連結至真實工具呼叫
  - 使用案例表（幻覺檢測、威脅建模、API 設計審查、事實驗證、技術選擇）
  - 安全考慮：沙箱執行、工具呼叫驗證、速率限制、審計日誌
  - 結構化練習含三個實務情境（程式碼審查、架構決策、內容審查）

#### 文件修正

**模組 03 - 入門**
- **05-stdio-server/README.md**：修正不完整的 TypeScript stdio 伺服器示例 — 補足傳輸物件實例化 (`new StdioServerTransport()`)、`server.connect(transport)` 呼叫，以符合同章節中 Python 與 .NET 範例
- **14-sampling/README.md**：修正錯字 — 將 `"Sampling is an davanced features"` 改為 `"Sampling is an advanced feature"`

#### 課程更新

**主 README.md**
- 新增課程 5.17（MCP 中的對抗式多代理推理）至課程表，並提供直接連結至新課程頁

**05-AdvancedTopics/README.md**
- 於課程列表中新增課程 5.17 行

**study_guide.md**
- 新增對抗式多代理推理主題至心智圖及進階主題的文字描述

#### 程式碼與安全修正

**模組 05 - 對抗代理（`mcp-adversarial-agents`）**
- **安全修復 — 命令注入**：在 TypeScript `run_python` 工具中，用 `execFile` + `promisify` 替換了 `execSync` 的 shell 插值，消除命令注入風險（LLM 控制的程式碼現在作為字面 argv 元素傳遞，無需 shell 介入）
- **MCP 工具循環線路**：更新 Python 辯論調度器，使用 `AsyncAnthropic` 客戶端（取代阻塞的同步 `Anthropic`），向每個代理輪次直接傳遞活躍的 `ClientSession`，每次輪迴通過 `session.list_tools()` 獲取工具定義，並通過 `session.call_tool()` 迴圈調用 `tool_use` 模塊直到模型產生最終文字回應

#### 依賴更新

- 將多個套件中 `hono` 提升至 4.12.12（03-GettingStarted、04-PracticalImplementation、10-StreamliningAIWorkflows）
- 將 TypeScript 套件中 `@hono/node-server` 從 1.19.11 提升至 1.19.13
- 將 Python 套件中 `cryptography` 從 46.0.5 提升至 46.0.7（10-StreamliningAIWorkflows 實驗室 3 與 4）
- 將 10-StreamliningAIWorkflows 檢查工具中的 `lodash` 從 4.17.23 升至 4.18.1

#### 翻譯更新

- 同步 48 種以上語言的翻譯，以配合最新的原始碼修改（i18n 更新）

---

## 2026 年 2 月 5 日

### 全倉庫驗證與導航改進

#### 新增課程內容

**模塊 03 - 入門**
- **12-mcp-hosts/README.md**：新增 MCP 主機設定完整指南
  - Claude Desktop、VS Code、Cursor、Cline、Windsurf 配置示例
  - 所有主要主機的 JSON 配置範本
  - 傳輸類型比較表（stdio、SSE/HTTP、WebSocket）
  - 常見連線問題故障排除
  - 主機設定安全最佳實踐

- **13-mcp-inspector/README.md**：新增 MCP Inspector 除錯指南
  - 安裝方式（npx、npm 全域安裝、原始碼安裝）
  - 透過 stdio 和 HTTP/SSE 連接伺服器
  - 工具、資源與提示流程測試
  - VS Code 與 MCP Inspector 整合
  - 常見除錯場景與解決方案

**模塊 04 - 實務實作**
- **pagination/README.md**：新增分頁實作指南
  - Python、TypeScript、Java 中的游標分頁範式
  - 用戶端分頁處理
  - 游標設計策略（不透明 vs 結構化）
  - 性能優化建議

**模塊 05 - 進階主題**
- **mcp-protocol-features/README.md**：新增協議特性深入探討
  - 進度通知的實作
  - 請求取消模式
  - 帶 URI 模式的資源範本
  - 伺服器生命週期管理
  - 日誌等級控制
  - 帶 JSON-RPC 錯誤碼的錯誤處理模式

#### 導航修正（更新超過 24 個檔案）

**主模塊 README**
 同時鏈結首課及下一模塊

**02-Security 子檔**
- 5 個支援安全文件皆新增「接下來做什麼」導航：

**09-CaseStudy 檔案**
- 所有個案研究檔案皆新增連續導航：

**10-StreamliningAI 實驗室**
於模塊 10 總覽與模塊 11 新增「接下來做什麼」區段

#### 程式碼與內容修正

**SDK 與依賴更新**
修正空白的 openai 版本為 `^4.95.0`
SDK 從 `^1.8.0` 升級到 `>=1.26.0`
mcp 版本鎖定升至 `>=1.26.0`

<strong>程式碼修正</strong>
將無效模型名稱 `gpt-4o-mini` 修正為 `gpt-4.1-mini`

<strong>內容修正</strong>
修正壞連結 `READMEmd` → `README.md`，課程標頭 `Module 1-3` → `Module 0-3`，大小寫路徑修正
刪除損壞的重複 Case Study 5 內容

<strong>初學者導引改善</strong>
新增正確的入門介紹、學習目標與先修條件

#### 課程更新

**主 README.md**
- 課程表新增 3.12（MCP 主機設定）、3.13（MCP Inspector）、4.1（分頁）、5.16（協議特性）

**模塊 README**
新增 12 與 13 課程列表
新增實務指南區塊含分頁連結
新增課程 5.15（自訂傳輸）與 5.16（協議特性）

**study_guide.md**
- 心智圖更新含所有新主題：MCP 主機設定、MCP Inspector、分頁策略、協議特性深入探討

## 2026 年 1 月 28 日

### MCP 規範 2025-11-25 合規審查

#### 核心概念增強 (01-CoreConcepts/)
- **新增客戶端原語 - Roots**：新增詳細文件介紹 Roots 客戶端原語，幫助伺服器了解檔案系統邊界與存取權限
- <strong>工具註解</strong>：新增工具行為註解文件（`readOnlyHint`、`destructiveHint`），提升工具執行決策
- **Sampling 中工具呼叫**：更新 Sampling 文件，納入 `tools` 與 `toolChoice` 參數，用於模型驅動的工具呼叫請求
- **URL 模式引導**：新增文件討論 URL 型態的引導，用於伺服器發起的外部網頁交互
- **任務（實驗性）**：新增文件記錄任務功能，實現持久執行包裝器與延後結果取得
- <strong>圖示支援</strong>：註明工具、資源、資源範本與提示現在可包含圖示作為額外元資料

#### 文件更新
- **README.md**：新增 MCP 規範 2025-11-25 版本參考與日期版本說明
- **study_guide.md**：課程地圖新增任務與工具註解於核心概念版塊；更新文件時間戳

#### 規範合規驗證
- <strong>協議版本</strong>：確認所有文檔參照的均為 MCP 規範 2025-11-25
- <strong>架構對齊</strong>：確認兩層架構（資料層＋傳輸層）文檔正確
- <strong>原語文件</strong>：驗證伺服器原語（資源、提示、工具）及客戶端原語（Sampling、Elicitation、Logging、Roots）文件
- <strong>傳輸機制</strong>：檢查 STDIO 與可串流 HTTP 傳輸文檔準確
- <strong>安全指導</strong>：確認符合最新 MCP 安全最佳實踐文檔

#### 重要 MCP 2025-11-25 新特性文件
- **OpenID Connect 探索**：OIDC 認證伺服器探索
- **OAuth 客戶端 ID 元資料文件**：推薦的客戶端註冊機制
- **JSON Schema 2020-12**： MCP 架構定義預設方言
- **SDK 分級系統**：定義 SDK 功能支援與維護要求
- <strong>治理結構</strong>：規範 MCP 工作群組與利益群組制度

### 安全文件重點更新 (02-Security/)

#### MCP 安全峰會研討會 (Sherpa) 整合
- <strong>新增實作訓練資源</strong>：於所有安全文檔中全面整合 [MCP 安全峰會研討會 (Sherpa)](https://azure-samples.github.io/sherpa/)
- <strong>登山路線完整覆蓋</strong>：記錄基地營至峰頂的完整進程
- **對齊 OWASP**：所有安全指導映射至 OWASP MCP Azure Security Guide 風險

#### OWASP MCP Top 10 整合
- <strong>新章節</strong>：主安全 README 新增 OWASP MCP Top 10 安全風險表與 Azure 緩解措施
- <strong>風險導向文檔</strong>：更新 mcp-security-controls-2025.md，加入 OWASP MCP 相關風險標記
- <strong>參考架構</strong>：鏈結至 OWASP MCP Azure Security Guide 參考架構與實作範式

#### 更新安全檔案
- **README.md**：新增 Sherpa 研討會總覽、行程表、OWASP MCP Top 10 風險摘要與實作訓練區塊
- **mcp-security-controls-2025.md**：更新標頭為 2026 年 2 月，新增 OWASP 風險參考（MCP01-MCP08），修正規範版本不一致問題
- **mcp-security-best-practices-2025.md**：新增 Sherpa 與 OWASP 資源區塊，更新時間戳
- **mcp-best-practices.md**：新增手把手訓練區塊，包含 Sherpa 與 OWASP 連結
- **azure-content-safety-implementation.md**：新增 OWASP MCP06 參考、Sherpa 露營 3 對應與額外資源區塊

#### 新增資源連結
- [MCP 安全峰會研討會 (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- 單項 OWASP MCP 風險頁面（MCP01-MCP10）

### 全課程 MCP 規範 2025-11-25 對齊

#### 模塊 03 - 入門
- **SDK 文檔**：新增 Go SDK 至官方 SDK 列表；更新所有 SDK 參考以符合 MCP 規範 2025-11-25
- <strong>傳輸說明</strong>：更新 STDIO 與 HTTP 串流傳輸描述，明確規範參照

#### 模塊 04 - 實務實作
- **SDK 更新**：新增 Go SDK，更新 SDK 列表與規範版本參考
- <strong>授權規範</strong>：更新 MCP 授權規格為最新 2025-11-25 版本

#### 模塊 05 - 進階主題
- <strong>新特性</strong>：新增 MCP 規範 2025-11-25 新功能說明（任務、工具註解、URL 模式引導、Roots）
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 與 Sherpa 研討會鏈結至擴充參考

#### 模塊 06 - 社群貢獻
- **SDK 列表**：新增 Swift 與 Rust SDK，更新規範鏈結為 2025-11-25 版本
- <strong>規範參考</strong>：更新 MCP 規範鏈結至正式規範網址

#### 模塊 07 - 早期採用經驗
- <strong>資源更新</strong>：新增 MCP 規範 2025-11-25 與 OWASP MCP Top 10 於擴充資源

#### 模塊 08 - 最佳實踐
- <strong>規範版本</strong>：更新 MCP 規範參考至 2025-11-25
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 與 Sherpa 研討會於擴充資源

#### 模塊 10 - 簡化 AI 工作流
- <strong>徽章更新</strong>：將 MCP 版本徽章由 SDK 版本（1.9.3）改為規範版本（2025-11-25）
- <strong>資源鏈結</strong>：更新 MCP 規範鏈結；新增 OWASP MCP Top 10

#### 模塊 11 - MCP 伺服器實作實驗室
- <strong>規範參考</strong>：更新 MCP 規範鏈結為 2025-11-25 版本
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 於官方資源

## 2025 年 12 月 18 日

### 安全文檔更新 - MCP 規範 2025-11-25

#### MCP 安全最佳實踐 (02-Security/mcp-best-practices.md) - 規範版本更新
- <strong>協議版本更新</strong>：更新為最新 MCP 規範 2025-11-25（2025 年 11 月 25 日發佈）
  - 將所有規範版本參考從 2025-06-18 更新為 2025-11-25
  - 將文件日期從 2025 年 8 月 18 日更換至 2025 年 12 月 18 日
  - 確認所有規範 URL 指向最新文檔
- <strong>內容驗證</strong>：全面驗證安全最佳實踐與最新標準符合度
  - <strong>微軟安全方案</strong>：核實 Prompt Shields（前身「Jailbreak 風險檢測」）、Azure Content Safety、Microsoft Entra ID 及 Azure Key Vault 之用詞與連結更新
  - **OAuth 2.1 安全**：確認與 OAuth 最新安全最佳實踐一致
  - **OWASP 標準**：驗證 LLM 專用 OWASP Top 10 仍現行有效
  - **Azure 服務**：核實所有 Azure 文件連結與最佳實踐更新
- <strong>標準規範一致性</strong>：驗證所有參照安全標準現行有效
  - NIST AI 風險管理框架
  - ISO 27001:2022
  - OAuth 2.1 安全最佳實踐
  - Azure 安全與合規架構
- <strong>實作資源驗證</strong>：確認所有實作指南連結與資源有效
  - Azure API 管理認證模式
  - Microsoft Entra ID 整合文檔
  - Azure Key Vault 密鑰管理
  - DevSecOps 管線與監控解決方案

### 文件品質保證
- <strong>規範合規性</strong>：確認所有 MCP 安全要求（必須/禁止）遵循最新規範
- <strong>資源更新</strong>：確認所有外部微軟文檔、安全標準及實作指南連結有效
- <strong>最佳實踐覆蓋</strong>：確認涵蓋驗證、授權、AI 特定威脅、供應鏈安全及企業流程完整

## 2025 年 10 月 6 日

### 入門章節擴展 — 進階伺服器使用與簡易驗證

#### 進階伺服器使用 (03-GettingStarted/10-advanced)
- <strong>新增章節</strong>：引入完整進階 MCP 伺服器使用指南，涵蓋一般與底層伺服器架構。
  - **一般伺服器 vs. 低階伺服器**：詳細比較與 Python 及 TypeScript 的程式碼範例說明兩種方法。
  - <strong>基於處理器的設計</strong>：說明基於處理器的工具／資源／提示管理，以實現可擴充且靈活的伺服器實作。
  - <strong>實用模式</strong>：低階伺服器模式在實際場景中對進階功能及架構的優勢。

#### 簡易認證 (03-GettingStarted/11-simple-auth)
- <strong>新增章節</strong>：逐步引導實作 MCP 伺服器的簡易認證。
  - <strong>認證概念</strong>：清楚解釋認證與授權，以及憑證處理。
  - <strong>基本認證實作</strong>：基於中介軟體的認證模式，含 Python（Starlette）及 TypeScript（Express）範例程式碼。
  - <strong>進階安全演進</strong>：指導從簡易認證推進至 OAuth 2.1 和 RBAC，並附進階安全模組參考。

這些新增內容提供實務、動手操作式指導，幫助打造更健壯、安全且靈活的 MCP 伺服器實作，串接基礎概念與進階生產模式。

## 2025 年 9 月 29 日

### MCP 伺服器資料庫整合實作實驗室－全方位動手學習路徑

#### 11-MCPServerHandsOnLabs - 全新完整資料庫整合課程
- **完整 13 個實驗室學習路徑**：新增完備的動手學習課程，涵蓋使用 PostgreSQL 整合打造生產等級 MCP 伺服器
  - <strong>真實案例實作</strong>：Zava Retail 分析使用案例演示企業級模式
  - <strong>結構化學習進程</strong>：
    - **實驗室 00-03：基礎篇**－介紹、核心架構、安全性與多租戶、環境部署
    - **實驗室 04-06：建置 MCP 伺服器**－資料庫設計與架構、MCP 伺服器實作、工具開發  
    - **實驗室 07-09：進階功能**－語意搜尋整合、測試與除錯、VS Code 整合
    - **實驗室 10-12：生產與最佳實務**－部署策略、監控與可觀察性、最佳實務與優化
  - <strong>企業級技術</strong>：FastMCP 框架、結合 pgvector 的 PostgreSQL、Azure OpenAI 嵌入、Azure Container Apps、Application Insights
  - <strong>進階功能</strong>：列級安全（RLS）、語意搜尋、多租戶資料存取、向量嵌入、即時監控

#### 術語標準化－模組改為實驗室
- <strong>全面文件更新</strong>：系統性將 11-MCPServerHandsOnLabs 中所有 README 檔案「模組」用詞改為「實驗室」
  - <strong>段落標題</strong>：「本模組涵蓋內容」更改為「本實驗室涵蓋內容」貫穿 13 個實驗室
  - <strong>內容描述</strong>：「本模組提供⋯⋯」變更為「本實驗室提供⋯⋯」於所有文檔
  - <strong>學習目標</strong>：「本模組結束時⋯⋯」更新為「本實驗室結束時⋯⋯」
  - <strong>導覽連結</strong>：所有「Module XX:」改為「Lab XX:」於交叉參考與導覽
  - <strong>完成回報</strong>：「完成本模組後⋯⋯」改為「完成本實驗室後⋯⋯」
  - <strong>技術參考保持</strong>：保留設定檔中 Python module 參考（例如 `"module": "mcp_server.main"`）

#### 學習指南增強 (study_guide.md)
- <strong>視覺課程結構圖</strong>：新增「11. 資料庫整合實驗室」節點與詳細實驗室結構視覺化
- <strong>倉儲結構更新</strong>：由十個主區段擴充至十一，詳細說明 11-MCPServerHandsOnLabs
- <strong>學習路徑指導強化</strong>：導覽指引覆蓋節點 00-11
- <strong>技術覆蓋</strong>：新增 FastMCP、PostgreSQL、Azure 服務整合資訊
- <strong>學習成效</strong>：強調生產就緒伺服器開發、資料庫整合模式及企業級安全

#### 主 README 結構調整
- <strong>實驗室詞彙化</strong>：11-MCPServerHandsOnLabs 主 README.md 統一使用「實驗室」結構
- <strong>學習路徑組織化</strong>：從基礎概念到進階實作及生產部署的清晰進展
- <strong>實務重點</strong>：強調企業級模式與技術的動手實作

### 文件品質與一致性提升
- <strong>動手學習強調</strong>：全文檔強化實務、實驗室取向
- <strong>企業模式聚焦</strong>：突出生產就緒與企業安全議題
- <strong>技術整合</strong>：完備涵蓋現代 Azure 服務與 AI 整合模式
- <strong>學習階段分明</strong>：明確、結構化由基礎至生產部署的路徑

## 2025 年 9 月 26 日

### 案例研究強化－GitHub MCP Registry 整合

#### 案例研究 (09-CaseStudy/)－生態系建設聚焦
- **README.md**：大幅擴充，新增 GitHub MCP Registry 完整案例研究
  - **GitHub MCP Registry 案例分析**：2025 年 9 月 GitHub MCP Registry 上線的全面探討
    - <strong>問題分析</strong>：細緻解剖 MCP 伺服器發現與部署分散挑戰
    - <strong>解決方案架構</strong>：GitHub 集中式登錄與一鍵 VS Code 安裝方案
    - <strong>商業影響</strong>：顯著提升開發者入門與生產力
    - <strong>策略價值</strong>：模組化代理部署與跨工具互通性聚焦
    - <strong>生態系建設</strong>：定位為代理系統整合基礎平台
  - <strong>案例結構強化</strong>：七個案例統一格式與完整描述更新
    - Azure AI 旅行代理：多代理協同強調
    - Azure DevOps 整合：工作流程自動化焦點
    - 即時文件擷取：Python 控制台客戶端實作
    - 互動學習計畫生成器：Chainlit 對話網頁應用
    - 編輯器內文件：VS Code 與 GitHub Copilot 整合
    - Azure API 管理：企業 API 整合模式
    - GitHub MCP Registry：生態系建設與社群平台
  - <strong>完整結論</strong>：重寫結論，涵蓋七個案例跨 MCP 各面向
    - 企業整合、多代理編排、開發者效率
    - 生態系建設、教育應用分類
    - 深入架構模式、實作策略與最佳實務
    - 強調 MCP 作為成熟生產協議

#### 學習指南更新 (study_guide.md)
- <strong>視覺課程圖</strong>：更新心智圖，包含 GitHub MCP Registry 於案例研究章節
- <strong>案例詳述</strong>：由泛泛描述擴展為七大完整案例詳解
- <strong>倉儲結構</strong>：更新第 10 節反映案例研究完整涵蓋與具體實作細節
- <strong>更新紀錄</strong>：新增 2025 年 9 月 26 日變更紀錄，記錄 GitHub MCP Registry 及案例增強
- <strong>時間戳修訂</strong>：更新底部標示為最新修訂時間（2025 年 9 月 26 日）

### 文件品質改進
- <strong>一致性增強</strong>：七個案例格式與結構標準化
- <strong>全面覆蓋</strong>：案例涵蓋企業、開發者效率與生態系建設
- <strong>策略定位</strong>：強化 MCP 作為代理系統基礎平台定位
- <strong>資源整合</strong>：更新附加資源包含 GitHub MCP Registry 連結

## 2025 年 9 月 15 日

### 進階議題擴充－自訂傳輸與上下文工程

#### MCP 自訂傳輸 (05-AdvancedTopics/mcp-transport/)－全新進階實作指南
- **README.md**：完整自訂 MCP 傳輸機制實作教學
  - **Azure Event Grid 傳輸**：無伺服器事件驅動傳輸詳細實作
    - C#、TypeScript 與 Python 範例，結合 Azure Functions
    - 可擴展 MCP 事件驅動架構模式
    - Webhook 接收器與推送訊息處理
  - **Azure Event Hubs 傳輸**：高吞吐流式傳輸實作
    - 即時串流與低延遲場景支持
    - 分區策略與檢查點管理
    - 訊息批次處理與效能優化
  - <strong>企業整合模式</strong>：生產就緒架構示例
    - 多 Azure Functions 分散式 MCP 處理
    - 混合傳輸架構結合多種傳輸型別
    - 訊息耐久性、可靠性及錯誤處理策略
  - <strong>安全與監控</strong>：Azure Key Vault 整合與可觀察性模式
    - 託管身份驗證與最小權限原則
    - Application Insights 遙測與效能監控
    - 電路斷路器與容錯模式
  - <strong>測試框架</strong>：自訂傳輸的全面測試策略
    - 單元測試搭配測試替身與模擬框架
    - Azure 測試容器的整合測試
    - 效能與負載測試考量

#### 上下文工程 (05-AdvancedTopics/mcp-contextengineering/)－新興 AI 領域
- **README.md**：全面探討上下文工程為新興領域
  - <strong>核心原則</strong>：完整上下文共享、行動決策意識、上下文視窗管理
  - **MCP 協議對齊**：MCP 如何應對上下文工程挑戰
    - 上下文視窗限制與漸進式載入策略
    - 關聯性決定與動態上下文檢索
    - 多模態上下文處理與安全性議題
  - <strong>實作路徑</strong>：單線程對比多代理架構
    - 上下文切塊與優先處理技術
    - 漸進上下文載入與壓縮策略
    - 層次化上下文方法與檢索優化
  - <strong>衡量框架</strong>：新興上下文效益評估指標
    - 輸入效率、效能、品質與使用者體驗考量
    - 上下文優化的實驗方法
    - 失效分析與改善方法論

#### 課程導覽更新 (README.md)
- <strong>模組結構強化</strong>：更新課程表加入新進階主題
  - 新增上下文工程 (5.14) 及自訂傳輸 (5.15)
  - 全模組一致格式與導覽連結
  - 更新描述反映當前內容範圍

### 目錄結構改進
- <strong>命名標準化</strong>：將「mcp transport」重新命名為「mcp-transport」，與其他進階主題資料夾一致
- <strong>內容組織</strong>：所有 05-AdvancedTopics 子資料夾皆採用 mcp-[topic] 命名模式

### 文件品質提升
- **MCP 規範對齊**：所有新內容引用 MCP 規範 2025-06-18
- <strong>多語言範例</strong>：提供 C#、TypeScript 與 Python 全面程式碼範例
- <strong>企業聚焦</strong>：生產就緒模式與 Azure 雲端整合貫穿全文
- <strong>視覺文件</strong>：使用 Mermaid 圖表呈現架構與流程

## 2025 年 8 月 18 日

### 文件全面更新－對應 MCP 2025-06-18 標準

#### MCP 安全最佳實務 (02-Security/)－現代化全新改寫
- **MCP-SECURITY-BEST-PRACTICES-2025.md**：完全重寫，符合 MCP 規範 2025-06-18
  - <strong>強制要求</strong>：新增官方規範的 MUST／MUST NOT 明確要求，附視覺指標
  - **12 大安全實務**：由 15 點調整為全面性安全領域
    - 權杖安全與身分驗證，含外部身份提供者整合
    - 會話管理與傳輸安全，具加密需求
    - AI 專屬威脅防護，整合 Microsoft Prompt Shields
    - 存取控制與權限，最小權限原則
    - 內容安全與監控，整合 Azure Content Safety
    - 供應鏈安全，全面元件驗證
    - OAuth 安全與混淆代理防護，含 PKCE 實作
    - 事故回應與復原，自動化能力
    - 合規與治理，符合法規要求
    - 進階安全控管，零信任架構
    - Microsoft 安全生態系整合，全面解決方案
    - 持續安全演進，自適應實務
  - **Microsoft 安全方案**：強化 Prompt Shields、Azure Content Safety、Entra ID、GitHub Advanced Security 整合指引
  - <strong>實作資源</strong>：依官方 MCP 文件、Microsoft 安全方案、安全標準、實作指南分類整理資源連結

#### 進階安全控管 (02-Security/)－企業級實作框架
- **MCP-SECURITY-CONTROLS-2025.md**：全新企業安全框架重構
  - **9 大安全領域**：由基礎控管延伸至詳細企業框架
    - 進階身分驗證與授權，含 Microsoft Entra ID 整合
    - 權杖安全與防透傳控管，全面驗證
    - 會話安全控管，防範劫持
    - AI 專屬安全控管，防止提示注入與工具污染
    - 混淆代理攻擊防護，OAuth 代理安全
    - 工具執行安全，沙盒與隔離
    - 供應鏈安全控管，依賴驗證
    - 監控與檢測控管，SIEM 整合
    - 事故回應與復原，自動能力
  - <strong>實作範例</strong>：新增詳細 YAML 設定區塊與程式碼示例
  - **Microsoft 方案整合**：全方位涵蓋 Azure 安全服務、GitHub Advanced Security 及企業身份管理

#### 進階主題安全 (05-AdvancedTopics/mcp-security/)－生產就緒實作
- **README.md**：全新改寫，聚焦企業安全實作
  - <strong>當前規範一致性</strong>：更新為 MCP 規範 2025-06-18，符合強制安全要求
  - <strong>加強身分驗證</strong>：整合 Microsoft Entra ID，提供 .NET 與 Java Spring Security 範例
  - **AI 安全整合**：Microsoft Prompt Shields 與 Azure Content Safety 的 Python 詳細實作
  - <strong>進階威脅緩解</strong>：全面實作範例涵蓋
    - 混淆代理攻擊防護，使用 PKCE 與用戶同意驗證
    - 權杖透傳防護，含接收者驗證與安全憑證管理
    - 以密碼學綁定與行為分析防止會話劫持
  - <strong>企業安全整合</strong>：Azure Application Insights 監控、威脅偵測管線與供應鏈安全
  - <strong>實作清單</strong>：明確區分強制與建議的安全控制及 Microsoft 安全生態系優勢

### 文件品質與標準對齊
- <strong>規格參考</strong>：更新所有參考至最新 MCP 規格 2025-06-18
- **Microsoft 安全生態系**：強化所有安全文件中的整合指導
- <strong>實務實作</strong>：新增 .NET、Java 與 Python 企業模式詳細程式碼範例
- <strong>資源組織</strong>：全面且分類明確的官方文件、安全標準及實作指南
- <strong>視覺指示</strong>：清楚標示必要要求與建議作法


#### 核心概念 (01-CoreConcepts/) - 全面現代化
- <strong>協定版本更新</strong>：更新為依日期版本控制的最新 MCP 規格 2025-06-18 (YYYY-MM-DD 格式)
- <strong>架構優化</strong>：加強 Hosts、Clients 與 Servers 描述以反映現行 MCP 架構模式
  - Hosts 現明確定義為協調多個 MCP 客戶端連線的 AI 應用程式
  - Clients 描述為維持一對一伺服器關係的協議連接器
  - Servers 強化本地與遠端部署情境
- <strong>基元重構</strong>：伺服器與客戶端基元完全重整
  - 伺服器基元：資源（資料來源）、提示（模板）、工具（可執行功能）並附詳細說明及範例
  - 客戶端基元：取樣（LLM 回應）、引導（用戶輸入）、記錄（除錯/監控）
  - 依照現行發現 (`*/list`)、檢索 (`*/get`)、執行 (`*/call`) 方法樣式更新
- <strong>協定架構</strong>：導入兩層架構模型
  - 資料層：基於 JSON-RPC 2.0 並包含生命週期管理及基元
  - 傳輸層：STDIO（本地）與支援 SSE 的可串流 HTTP（遠端）傳輸機制
- <strong>安全框架</strong>：涵蓋明確使用者同意、資料隱私保護、工具執行安全與傳輸層安全的完整安全原則
- <strong>通訊模式</strong>：更新協定訊息流程示意初始化、發現、執行與通知等階段
- <strong>程式碼範例</strong>：更新多語言範例（.NET、Java、Python、JavaScript）以配合現行 MCP SDK 模式

#### 安全 (02-Security/) - 全面安全大翻修  
- <strong>標準對齊</strong>：完全合規於 MCP 規格 2025-06-18 安全要求
- <strong>認證演進</strong>：記錄從自訂 OAuth 伺服器到外部身份提供者委派（Microsoft Entra ID）的演變
- **AI 專屬威脅分析**：加強現代 AI 攻擊向量的涵蓋
  - 詳述提示注入攻擊場景及真實案例
  - 工具污染機制與「拔毯子」攻擊模式
  - 上下文視窗污染與模型混淆攻擊
- **Microsoft AI 安全解決方案**：全面涵蓋 Microsoft 安全生態系
  - 具進階偵測、重點標示及分隔符技巧的 AI 提示防護
  - Azure 内容安全整合模式
  - GitHub 進階安全以保護供應鏈
- <strong>進階威脅緩解</strong>：詳細安全控制涵蓋
  - MCP 專有的會話劫持攻擊場景與密碼學會話 ID 要求
  - MCP 代理場境中的混淆代理問題與明確同意規範
  - 權杖通透漏洞及其強制驗證控制
- <strong>供應鏈安全</strong>：擴展 AI 供應鏈涵蓋基礎模型、嵌入式服務、上下文提供者及第三方 API
- <strong>基礎安全</strong>：加強與企業安全模式（含零信任架構）及 Microsoft 安全生態系整合
- <strong>資源組織</strong>：依類型分類全面資源連結（官方文件、標準、研究、Microsoft 解決方案、實作指南）

### 文件品質提升
- <strong>結構化學習目標</strong>：強化具體且可行的學習成果
- <strong>交叉參照</strong>：新增安全與核心概念主題間鏈結
- <strong>最新資訊</strong>：更新所有日期參考及規格連結至現行標準
- <strong>實作指導</strong>：在兩大章節中新增具體且可操作的實作指引

## 2025 年 7 月 16 日

### README 與導覽優化
- 在 README.md 中重新設計完整課程導航
- 用更無障礙的表格格式取代 `<details>` 標籤
- 於新建的 "alternative_layouts" 資料夾創建替代版面選項
- 添加卡片式、分頁式與手風琴式導覽範例
- 更新庫結構章節納入所有最新檔案
- 強化「如何使用本課程」章節並提出明確建議
- 更新 MCP 規格連結指向正確 URL
- 新增「Context Engineering」(5.14) 章節於課程結構中

### 學習指南更新
- 完全重構學習指南以配合現有庫結構
- 新增 MCP 客戶端與工具及熱門 MCP 伺服器區塊
- 更新視覺課程地圖以準確反映全部主題
- 增強進階主題說明涵蓋所有專門領域
- 更新案例研究章節以反映真實範例
- 新增此綜合變更日誌

### 社群貢獻 (06-CommunityContributions/)
- 新增關於圖像生成 MCP 伺服器的詳細資訊
- 新增在 VSCode 使用 Claude 的全方位章節
- 新增 Cline 終端客戶端設定與使用說明
- 更新 MCP 客戶端章節涵蓋所有熱門客戶端選項
- 強化貢獻範例，包含更精確的程式碼範例

### 進階主題 (05-AdvancedTopics/)
- 統一命名並整理所有專門主題資料夾
- 新增上下文工程教材與範例
- 新增 Foundry 代理整合文件
- 強化 Entra ID 安全整合文件

## 2025 年 6 月 11 日

### 初版建立
- 發布 MCP for Beginners 課程第一版
- 建立所有 10 個主要章節的基本架構
- 實作視覺課程地圖作為導覽工具
- 新增多語言範例專案

### 入門 (03-GettingStarted/)
- 建立首批伺服器實作範例
- 新增客戶端開發指導
- 包含 LLM 客戶端整合指引
- 新增 VS Code 整合文件
- 實作 SSE 伺服器範例

### 核心概念 (01-CoreConcepts/)
- 詳述客戶端－伺服器架構
- 編寫重要協定元件文件
- 記錄 MCP 訊息通訊模式

## 2025 年 5 月 23 日

### 庫結構
- 初始化庫並建立基本資料夾架構
- 每主要章節建立 README 文件
- 設置翻譯架構
- 新增圖像資產與示意圖

### 文件
- 建立首版 README.md 並提供課程總覽
- 新增 CODE_OF_CONDUCT.md 及 SECURITY.md
- 建立 SUPPORT.md 並提供求助指導
- 初步規劃學習指南結構

## 2025 年 4 月 15 日

### 規劃與架構
- 初步規劃 MCP for Beginners 課程
- 定義學習目標及目標受眾
- 劃分 10 大章節課程結構
- 制定範例與案例研究的概念框架
- 建立關鍵概念的初版範例

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->