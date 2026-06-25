# 變更記錄：MCP 初學者課程

本文件用作記錄 Model Context Protocol (MCP) 初學者課程所有重大更改。變更以逆時間順序記錄（最新變更優先）。

## 2026年6月24日

### 新課程：在 Copilot 應用中使用 MCP

- [工具部分](./12-tooling/README.md) 新增工具部分。
- [在 Copilot 應用中使用 MCP](./12-tooling/01-copilot-app/README.md)

## 2026年6月16日

### MCP 規範對齊與範例校驗

根據當前 **MCP 規範 2025-11-25** 與最新官方 SDK 校驗課程，然後更正剩餘的過期規範引用，並確認核心範例仍能編譯與運行。

#### 規範版本更正（2025-06-18 / 2025-03-26 → 2025-11-25）

更新英文內容中仍聲稱較舊規範版本為<em>當前/最新</em>標準的部分，並將連結重新指向權威的 `modelcontextprotocol.io` 規範路徑：
- **05-AdvancedTopics/mcp-security/README.md**：更新「當前標準」橫幅、介紹、核心安全原則標題、強制性需求標題、Microsoft Entra ID 部分、參考與資源連結，以及結尾安全通知（8處引用）為 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**：更新附加資源規範連結與「當前標準」橫幅為 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**：將過期的 `2025-03-26` 安全與信任連結替換為當前 2025-11-25 的安全最佳實踐頁面
- **03-GettingStarted/14-sampling/README.md**：更新官方採樣文件連結為 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**：更新現在式「當前 MCP 規範」引用和附加資源規範連結為 2025-11-25（保留歷史 SSE 棄用註記以保證準確）

#### 依照當前 SDK 校驗範例

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**：`npm install` 解決 `@modelcontextprotocol/sdk@1.29.0`；`tsc --noEmit` 通過無型別錯誤 — 現有 `McpServer`/`StdioServerTransport` API 仍有效
- **Python (03-GettingStarted/01-first-server/solution/python)**：在隔離 `.venv` 中使用 `mcp[cli]` (1.27.2) 校驗；`py_compile` 通過且 `FastMCP.list_tools()` 正確返回 `add` 與 `subtract` 工具
- 確認所有範例中 `@modelcontextprotocol/sdk` 版本範圍（`>=1.26.0` / `^1.26.0` / `^1.27.0`）均能乾淨解析到當前的 `1.29.0` 且不破壞 API

#### 依賴範圍對齊（收攏版本差距）

提升過期的 SDK 依賴，使每個範例追蹤當前 MCP 釋出，符合倉庫整體慣例：
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**：將 `@modelcontextprotocol/sdk` 從 `^1.8.0` → `>=1.26.0`，並更新過期的「為 MCP 2025-06-18 更新」包描述為「對齊 MCP 規範 2025-11-25」
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** 和 **lab4/code/github_mcp_server/pyproject.toml**：將精確鎖定 `mcp==1.23.0` → `mcp>=1.26.0`；重生成兩個 `uv.lock` 文件，使鎖檔解析到當前 `mcp 1.27.2` 並與清單保持同步

#### 課程內容缺口分析 — 最新規範功能覆蓋

確認課程已涵蓋 MCP 2025-11-25 中引入/擴展的所有基元，因此無內容缺口：
- <strong>採樣</strong>：課程 03-GettingStarted/14-sampling 及 05-AdvancedTopics/mcp-sampling
- **引導（含 URL 模式）**：於 01-CoreConcepts 與 05-AdvancedTopics/mcp-protocol-features 記錄
- <strong>根上下文</strong>：於 00-Introduction、01-CoreConcepts 與 05-AdvancedTopics/mcp-root-contexts 記錄
- **任務（實驗性、長時運行操作）**：於 01-CoreConcepts 與 05-AdvancedTopics/mcp-protocol-features 記錄
- <strong>工具註解</strong>（`readOnlyHint` / `destructiveHint`）：於 01-CoreConcepts 與 05-AdvancedTopics/mcp-protocol-features 記錄

### 安全強化與依賴漏洞修復

對所有依賴清單和範例源碼進行完整安全檢視，修正報告的所有 npm 警告及一處程式碼層級發現。修復後，`npm audit` 在所有掃描目錄均報告 **0 漏洞**。

#### npm 依賴漏洞（傳遞性）— 已修復

審核所有 15 個提交的 `package-lock.json` 文件。漏洞僅限 MCP Inspector 開發工具、OpenAI 客戶端與 MCP SDK 的傳遞依賴；現均已修復且不破壞範例：
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** 和 **lab3/code/weather_mcp/inspector**：將 `@modelcontextprotocol/inspector` 從 `0.16.6` / `0.14.1` 提升至 `0.22.0`，清除綁定的 `ajv`、`brace-expansion`、`diff`、`path-to-regexp` 與 `ws` 警告。新增 npm `overrides` 條目，強制使用修補版 `shell-quote@1.8.4` 消除 `concurrently` 提供的關鍵警告；重生成兩個鎖檔（現 0 漏洞）
- **03-GettingStarted/samples/typescript**：`npm audit fix` 更新傳遞性 `qs`（中風險）至修補版
- **03-GettingStarted/samples/javascript**：`npm audit fix` 更新傳遞性 `hono`（中風險）至修補版
- **03-GettingStarted/03-llm-client/solution/typescript**：`npm audit fix` 更新傳遞性 `form-data`（高風險）至修補版
- **03-GettingStarted/11-simple-auth/solution/typescript**：生成缺失的 `package-lock.json` 以保證專案可重現及可稽核（0 漏洞）

#### 程式碼層級安全修復（OWASP A03: 注入）

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**：移除 `open_in_vscode` 工具中的 `shell=True`。之前的 `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` 允許路徑中的 shell 元字元被 `cmd.exe` 解釋（命令注入風險）。現直接以解析後的 `Code.exe` 並帶參數啟動無 shell，功能等價且安全

#### Python 依賴審核

- 使用 `pip-audit` 檢視每組 Python 需求。`05-AdvancedTopics` 與 `03-GettingStarted/samples/python` 報告 <strong>無已知漏洞</strong>（其 `mcp` / `httpx` / `pydantic` / `python-dotenv` 範圍解析到當前修補版）
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**：`pip-audit` 指出傳遞依賴 **`werkzeug` 3.1.1** 存在三個 `safe_join` Windows 設備名稱拒絕服務漏洞 — `CVE-2025-66221`、`CVE-2026-21860`、`CVE-2026-27199`（均於 3.1.6 修復）。新增明確安全鎖定 `werkzeug>=3.1.6` 確保使用修補版；並驗證該約束與 `chainlit` / `mcp` / `semantic-kernel` 堆疊乾淨解析

### 產品名稱重新品牌化

更新所有課程內容以反映微軟產品重新品牌化：

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**：更新 Discord 社群連結
- **AGENTS.md**：更新 Discord 伺服器參考
- **README.md**：更新技術生態參考
- **study_guide.md**：更新案例研究參考
- **05-AdvancedTopics/README.md**：更新第 5.13 單元標題與描述
- **05-AdvancedTopics/mcp-integration/README.md**：更新章節標題與描述
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**：完整模組標題與內容更新
- **05-AdvancedTopics/mcp-security-entra/README.md**：更新跨參考連結
- **07-LessonsfromEarlyAdoption/README.md**：更新案例研究參考
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**：更新第 9 節標題、徽章與功能
- **08-BestPractices/README.md**：更新 Discord 社群連結
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**：更新 Discord 頻道參考
- **09-CaseStudy/docs-mcp/solution/python/README.md**：更新模型部署參考
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**：更新 AI 服務表格
- **11-MCPServerHandsOnLabs/03-Setup/README.md**：更新資源參考

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**：更新主課程參考
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**：更新模組標題、概要及所有模組標題
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**：更新標題、學習目標、設置說明與資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**：更新標題、學習目標、MCP 主機列表及交叉參考
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**：更新標題、徽章、先決條件及資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**：更新代理建立者參考與反饋連結
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**：更新先決條件與擴展參考

---

## 2026年4月11日

### 新課程、文件修正與依賴更新

#### 新增課程內容

**模組 05 - 進階主題**
- **課程 5.17：利用 MCP 進行對抗式多代理推理**（`05-AdvancedTopics/mcp-adversarial-agents/README.md`）：全面指南，涵蓋多代理系統的對抗辯論模式
  - Mermaid 架構圖：兩個代理 → 共享 MCP 伺服器 → 辯論筆錄 → 評審 → 判決
  - 共享 MCP 工具伺服器（`web_search` + `run_python`）以 Python 與 TypeScript 實作
  - 對立系統提示（支持 / 反對 / 評審），明確要求工具使用
  - 辯論協調器以 Python、TypeScript 和 C# 實作，管理輪次及路由論點
  - MCP `ClientSession` 連接至協調器的實際工具調用
  - 用例列表（幻覺檢測、威脅建模、API 設計審查、事實驗證、技術選擇）
  - 安全考量：沙箱執行、工具調用驗證、速率限制、審計日誌
  - 結構化練習含三個實務場景（程式碼審查、架構決策、內容審核）

#### 文件修正

**模組 03 - 入門**
- **05-stdio-server/README.md**：修正不完整的 TypeScript stdio 伺服器範例 — 新增缺少的運輸實例化 (`new StdioServerTransport()`) 及 `server.connect(transport)` 調用，以與相同章節中的 Python 與 .NET 範例相符
- **14-sampling/README.md**：修正錯字 — 將 `"Sampling is an davanced features"` 更正為 `"Sampling is an advanced feature"`

#### 課程更新

**主 README.md**
- 將課程 5.17（利用 MCP 進行對抗式多代理推理）新增至課程表，並提供新課程的直接連結

**05-AdvancedTopics/README.md**
- 新增課程 5.17 行至課程表

**study_guide.md**
- 在進階主題心智圖及文字描述中新增對抗式多代理推理主題

#### 程式碼與安全修正

**模組 05 - 對抗代理（`mcp-adversarial-agents`）**
- **安全修正 — 命令注入**：在 TypeScript 的 `run_python` 工具中，將 `execSync` 的 shell 插值替換為 `execFile` + `promisify`，消除命令注入漏洞（現由 LLM 控制的程式碼以文字型式作為 argv 元素傳入，不再涉及 shell）
- **MCP 工具迴圈連接**：更新 Python 辯論調度器以使用非同步的 `AsyncAnthropic` 用戶端（取代阻塞同步的 `Anthropic`），直接傳遞現場 `ClientSession` 給各代理輪次，每輪通過 `session.list_tools()` 抓取工具定義，並在迴圈中用 `session.call_tool()` 觸發 `tool_use` 區塊，直到模型輸出最終文字回應

#### 依賴性更新

- 將多個套件中的 `hono` 升級至 4.12.12（03-GettingStarted、04-PracticalImplementation、10-StreamliningAIWorkflows）
- 在 TypeScript 套件中將 `@hono/node-server` 從 1.19.11 升至 1.19.13
- 在 Python 套件（10-StreamliningAIWorkflows 第 3 與第 4 實驗室）中將 `cryptography` 從 46.0.5 升至 46.0.7
- 在 10-StreamliningAIWorkflows 檢視器中將 `lodash` 從 4.17.23 升至 4.18.1

#### 翻譯

- 同步超過 48 種語言的翻譯以配合最新原始碼變更（i18n 更新）

---

## 2026 年 2 月 5 日

### 全倉儲驗證與導覽改進

#### 新課程內容新增

**模組 03 - 入門指南**
- **12-mcp-hosts/README.md**：新增 MCP 主機設定詳細指南
  - Claude Desktop、VS Code、Cursor、Cline、Windsurf 配置範例
  - 各主要主機的 JSON 配置範本
  - 傳輸類型比較表（stdio、SSE/HTTP、WebSocket）
  - 常見連線問題排錯
  - 主機設定安全最佳實踐

- **13-mcp-inspector/README.md**：新增 MCP Inspector 除錯指引
  - 安裝方式（npx、npm global、原始碼）
  - 透過 stdio 及 HTTP/SSE 連接伺服器
  - 測試工具、資源及提示流程
  - VS Code 與 MCP Inspector 整合
  - 常見除錯情境與解決方案

**模組 04 - 實務實作**
- **pagination/README.md**：新增分頁實作指南
  - Python、TypeScript、Java 中的基於游標分頁模式
  - 用戶端分頁處理
  - 游標設計策略（不透明與結構化）
  - 效能優化建議

**模組 05 - 進階主題**
- **mcp-protocol-features/README.md**：新增協議功能深度剖析
  - 進度通知實作
  - 請求取消模式
  - 使用 URI 範本的資源
  - 伺服器生命週期管理
  - 日誌等級控制
  - 使用 JSON-RPC 程式碼的錯誤處理模式

#### 導覽修正（更新 24+ 檔案）

**主模組 README**
 同時新增指向第一課與下個模組的連結

**02-Security 子檔案**
- 5 個補充安全文件均新增「接下來的內容」導覽：

**09-案例研究檔案**
- 所有案例研究檔案新增順序導航：

**10-StreamliningAI 實驗室**
在模組 10 總覽與模組 11 新增「接下來的內容」區塊

#### 代碼與內容修正

**SDK 與依賴更新**
修正空白的 openai 版本為 `^4.95.0`
SDK 從 `^1.8.0` 更新至 `>=1.26.0`
mcp 版本限制更新至 `>=1.26.0`

<strong>代碼修正</strong>
將無效的模型 `gpt-4o-mini` 改為 `gpt-4.1-mini`

<strong>內容修正</strong>
修正損壞連結 `READMEmd` → `README.md` ，修正課程標題 `Module 1-3` → `Module 0-3`，修正大小寫敏感路徑
移除損壞的重複案例研究 5 內容

<strong>初學者指引改進</strong>
增加適當的介紹、學習目標和前置條件說明

#### 課程更新

**主 README.md**
- 新增課程表條目 3.12（MCP 主機）、3.13（MCP Inspector）、4.1（分頁）、5.16（協議功能）

**模組 README**
新增第 12 與 13 課
新增實務指引區，包含分頁連結
新增第 5.15（自訂傳輸）與 5.16（協議功能）

**study_guide.md**
- 更新心智圖，包含 MCP 主機設定、MCP Inspector、分頁策略、協議功能深度剖析等新主題

## 2026 年 1 月 28 日

### MCP 規範 2025-11-25 合規審查

#### 核心概念強化 (01-CoreConcepts/)
- **新客戶端原語 - Roots**：新增關於 Roots 客戶端原語的完整文件，支援伺服器理解檔案系統邊界與存取權限
- <strong>工具註解</strong>：新增工具行為注解文檔（`readOnlyHint`，`destructiveHint`），協助執行決策
- <strong>取樣階段工具呼叫</strong>：更新取樣文件以納入 `tools` 與 `toolChoice` 參數，支持模型驅動的取樣請求中工具調用
- **URL 模式引導**：新增伺服器端啟動外部網站互動的 URL 基礎引導文檔
- **任務（實驗性）**：新增有關持久化執行包裝與延遲結果取回的實驗性任務功能文件
- <strong>圖示支援</strong>：註記工具、資源、資源範本與提示可包含圖示作為附加元資料

#### 文件更新
- **README.md**：新增 MCP 規範 2025-11-25 版本參考與基於日期的版本說明
- **study_guide.md**：更新課程大綱，核心概念新增任務與工具註解章節；文件時間戳更新

#### 規範合規驗證
- <strong>協議版本</strong>：確認所有文件均符合最新 MCP 規範 2025-11-25
- <strong>架構對齊</strong>：確認雙層架構（資料層 + 傳輸層）文件正確
- <strong>原語文件</strong>：驗證伺服器端原語（資源、提示、工具）及客戶端原語（取樣、引導、日誌、Roots）
- <strong>傳輸機制</strong>：確認 STDIO 與可串流 HTTP 傳輸文件準確
- <strong>安全指引</strong>：確認與目前 MCP 安全最佳實踐文件相符

#### MCP 2025-11-25 重要功能紀錄
- **OpenID Connect 探索**：OIDC 認證伺服器探索
- **OAuth 客戶端 ID 元資料文件**：推薦客戶端註冊機制
- **JSON Schema 2020-12**：MCP 架構的預設方言
- **SDK 分層制度**：正式化 SDK 功能支援與維護要求
- <strong>治理結構</strong>：正式化 MCP 工作組與興趣小組

### 安全文檔重大更新 (02-Security/)

#### MCP 安全峰會工作坊（Sherpa）整合
- <strong>全新實操訓練資源</strong>：將 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 全面納入所有安全文檔中
- <strong>行程攻略詳載</strong>：記錄從大本營至峰頂的完整營地進程
- **OWASP 對齊**：所有安全指引均映射為 OWASP MCP Azure Security Guide 風險項目

#### OWASP MCP Top 10 整合
- <strong>新增章節</strong>：在主安全 README 中加入 OWASP MCP Top 10 風險表並附 Azure 緩解措施
- <strong>風險導向文檔</strong>：在 mcp-security-controls-2025.md 中加入 OWASP MCP 各領域風險參考
- <strong>參考架構</strong>：連結至 OWASP MCP Azure Security Guide 參考架構及實作範例

#### 更新安全文件
- **README.md**：新增 Sherpa 工作坊總覽、行程表、OWASP MCP Top 10 風險摘要與實操訓練區
- **mcp-security-controls-2025.md**：更新為 2026 年 2 月，新增 OWASP 風險參考（MCP01-MCP08），修正規範版本不一致問題
- **mcp-security-best-practices-2025.md**：新增 Sherpa 與 OWASP 資源區，更新時間戳
- **mcp-best-practices.md**：新增 Sherpa 與 OWASP 實操訓練區
- **azure-content-safety-implementation.md**：新增 OWASP MCP06 參考、Sherpa 營地 3 對齊及補充資源區

#### 新增資源連結
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- 各 OWASP MCP 風險頁面（MCP01-MCP10）

### 全課程 MCP 規範 2025-11-25 對齊

#### 模組 03 - 入門
- **SDK 文件**：新增 Go SDK 至官方 SDK 清單；更新所有 SDK 參考符合 MCP 規範 2025-11-25
- <strong>傳輸說明</strong>：更新 STDIO 與 HTTP 串流傳輸描述並明確規範引用

#### 模組 04 - 實務
- **SDK 更新**：新增 Go SDK，SDK 清單更新並標明規範版本
- <strong>授權規範</strong>：更新 MCP 授權規範連結至 2025-11-25 版本

#### 模組 05 - 進階
- <strong>新功能</strong>：新增 MCP 規範 2025-11-25 功能註記（任務、工具註解、URL 模式引導、Roots）
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 與 Sherpa 工作坊連結

#### 模組 06 - 社群貢獻
- **SDK 清單**：新增 Swift 與 Rust SDK，更新規範連結至 2025-11-25
- <strong>規範參考</strong>：更新 MCP 規範連結為直接規範 URL

#### 模組 07 - 早期採用經驗
- <strong>資源更新</strong>：新增 MCP 規範 2025-11-25 與 OWASP MCP Top 10 於補充資源

#### 模組 08 - 最佳實踐
- <strong>規範版本</strong>：更新 MCP 規範參考至 2025-11-25
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 與 Sherpa 工作坊至補充資源

#### 模組 10 - 精簡 AI 工作流程
- <strong>徽章更新</strong>：將 MCP 版本徽章從 SDK 版本（1.9.3）改為規範版本（2025-11-25）
- <strong>資源連結</strong>：更新 MCP 規範連結並新增 OWASP MCP Top 10

#### 模組 11 - MCP 伺服器實作
- <strong>規範參考</strong>：更新 MCP 規範連結至 2025-11-25 版本
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 官方資源

## 2025 年 12 月 18 日

### 安全文檔更新 - MCP 規範 2025-11-25

#### MCP 安全最佳實踐（02-Security/mcp-best-practices.md）- 規範版本更新
- <strong>協議版本更新</strong>：更新為最新 MCP 規範 2025-11-25（2025 年 11 月 25 日發佈）
  - 將所有規範版本參考從 2025-06-18 改為 2025-11-25
  - 將文件日期參考從 2025 年 8 月 18 日改為 2025 年 12 月 18 日
  - 確認所有規範 URL 指向最新文件
- <strong>內容驗證</strong>：全面檢驗安全最佳實踐是否符合最新標準
  - **Microsoft 安全解決方案**：確認提示盾牌（前稱「越獄風險檢測」）、Azure 內容安全、Microsoft Entra ID 與 Azure Key Vault 用詞與連結均更新
  - **OAuth 2.1 安全**：確認符合最新 OAuth 安全最佳實踐
  - **OWASP 標準**：驗證 OWASP LLM Top 10 引用依然有效
  - **Azure 服務**：確認所有 Microsoft Azure 文件與最佳實踐有效
- <strong>標準對齊</strong>：所有參考安全標準確認最新
  - NIST AI 風險管理框架
  - ISO 27001:2022
  - OAuth 2.1 安全最佳實踐
  - Azure 安全與合規框架
- <strong>實作資源</strong>：驗證所有實作指南連結與資源有效
  - Azure API 管理身份驗證模式
  - Microsoft Entra ID 整合指南
  - Azure Key Vault 秘密管理
  - DevSecOps 流水線與監控解決方案

### 文件品質保證
- <strong>規範合規性</strong>：確保所有 MCP 安全要求（必須/禁止）符合最新規範
- <strong>資源新穎性</strong>：確認所有外部連結指向 Microsoft 文件、安全標準及實作指南
- <strong>最佳實踐涵蓋</strong>：確認涵蓋身份驗證、授權、AI 專屬威脅、供應鏈安全與企業範例完整

## 2025 年 10 月 6 日

### 入門章節擴充 — 進階伺服器使用與簡易驗證

#### 進階伺服器使用（03-GettingStarted/10-advanced）
- <strong>新增章節</strong>：介紹 MCP 進階伺服器使用方法，涵蓋常規與底層伺服器架構。
  - **一般伺服器 vs. 低階伺服器**：詳細比較及 Python 與 TypeScript 兩種方法的程式碼範例。
  - **基於 Handler 的設計**：說明基於 handler 的工具/資源/提示管理，以實現可擴展且靈活的伺服器實作。
  - <strong>實務模式</strong>：實際情境中低階伺服器模式對於進階功能與架構之益處。

#### 簡易驗證 (03-GettingStarted/11-simple-auth)
- <strong>新增章節</strong>：分步驟指導在 MCP 伺服器中實作簡易驗證。
  - <strong>驗證概念</strong>：清晰說明身份驗證與授權的差異，及憑證處理。
  - <strong>基礎驗證實作</strong>：基於中介軟體的驗證模式，含 Python (Starlette) 與 TypeScript (Express) 程式碼範例。
  - <strong>進階安全性升級</strong>：引導如何由簡易驗證進階至 OAuth 2.1 與 RBAC，並包含進階安全模組參考。

這些新增內容提供實務、動手操作的指引，助力打造更健壯、安全且具彈性的 MCP 伺服器實作，銜接基礎概念與生產階段的進階模式。

## 2025 年 9 月 29 日

### MCP 伺服器資料庫整合實驗室 - 全面動手學習路線

#### 11-MCPServerHandsOnLabs - 全新完整資料庫整合課程
- **完整 13 個實驗室學習路線**：新增涵蓋 PostgreSQL 資料庫整合的生產級 MCP 伺服器全面動手課程
  - <strong>實務案例實作</strong>：Zava Retail 分析用例，展示企業級架構模式
  - <strong>結構化學習進程</strong>：
    - **實驗室 00-03：基礎** — 介紹、核心架構、安全性與多租戶、環境設置
    - **實驗室 04-06：打造 MCP 伺服器** — 資料庫設計與結構、MCP 伺服器實作、工具開發  
    - **實驗室 07-09：進階功能** — 語意搜尋整合、測試與除錯、VS Code 整合
    - **實驗室 10-12：生產與最佳實踐** — 部署策略、監控與可觀察性、最佳實踐與優化
  - <strong>企業級技術</strong>：FastMCP 框架、帶 pgvector 的 PostgreSQL、Azure OpenAI 嵌入式、Azure Container Apps、Application Insights
  - <strong>進階功能</strong>：行級安全 (RLS)、語意搜尋、多租戶資料存取、向量嵌入、實時監控

#### 術語標準化 - 模組轉換為實驗室
- <strong>全面文件更新</strong>：系統性更新 11-MCPServerHandsOnLabs 所有 README 文件，以「實驗室」術語取代「模組」
  - <strong>章節標題</strong>：所有 13 個實驗室中「本模組涵蓋的內容」改為「本實驗室涵蓋的內容」
  - <strong>內容描述</strong>：全文將「本模組提供…」改為「本實驗室提供…」
  - <strong>學習目標</strong>：「在本模組結束時…」改為「在本實驗室結束時…」
  - <strong>導覽連結</strong>：跨參照與導航內所有「模組 XX」改為「實驗室 XX」
  - <strong>完成追蹤</strong>：「完成本模組後…」更新為「完成本實驗室後…」
  - <strong>保留技術參考</strong>：維持 Python 配置檔中的模組引用（例如 `"module": "mcp_server.main"`）

#### 學習指南強化 (study_guide.md)
- <strong>視覺課程地圖</strong>：新增「11. 資料庫整合實驗室」章節，完整實驗室結構可視化
- <strong>倉庫結構</strong>：由十大主章節更新為十一大主章節，詳列 11-MCPServerHandsOnLabs 描述
- <strong>學習路徑指引</strong>：強化 00-11 章節的導航指示
- <strong>技術涵蓋</strong>：新增 FastMCP、PostgreSQL、Azure 服務整合細節
- <strong>學習成果</strong>：強調生產就緒伺服器開發、資料庫整合模式與企業安全

#### 主 README 結構強化
- <strong>基於實驗室術語</strong>：更新 11-MCPServerHandsOnLabs 目錄內 main README.md，統一採用「實驗室」結構
- <strong>學習路徑組織</strong>：清楚呈現從基礎概念到進階實作，再到生產部署的進階循序
- <strong>實務聚焦</strong>：強調實務、動手操作學習，輔以企業級架構與技術

### 文件品質與一致性提升
- <strong>強化動手學習</strong>：整份文件強調實驗室式實務學習方式
- <strong>企業架構模式</strong>：突顯生產就緒實作與企業安全考量
- <strong>技術整合</strong>：完整涵蓋現代 Azure 服務與 AI 整合模式
- <strong>學習進程明確</strong>：由基礎概念至生產部署，路徑結構清晰

## 2025 年 9 月 26 日

### 案例研究強化 - GitHub MCP 登記冊整合

#### 案例研究 (09-CaseStudy/) - 生態系統開發聚焦
- **README.md**：大幅擴充，新增 GitHub MCP 登記冊完整案例研究
  - **GitHub MCP 登記冊案例研究**：全方位檢視 2025 年 9 月 GitHub MCP 登記冊發布
    - <strong>問題分析</strong>：深入剖析 MCP 伺服器發現與部署的碎片化挑戰
    - <strong>解決架構</strong>：GitHub 採用集中式登記冊並一鍵 VS Code 安裝方案
    - <strong>商業影響</strong>：顯著提升開發者入門與生產力
    - <strong>策略價值</strong>：聚焦模組化代理部署與跨工具互操作性
    - <strong>生態系統發展</strong>：定位為智能代理整合的基礎平台
  - <strong>強化案例結構</strong>：統一七個案例研究的格式與完整描述
    - Azure AI 旅遊代理：多代理調度重點
    - Azure DevOps 整合：工作流程自動化聚焦
    - 即時文件檢索：Python 控制台客戶端實作
    - 互動式學習計劃產生器：Chainlit 聊天式網頁應用
    - 內嵌編輯器文件：VS Code 與 GitHub Copilot 整合
    - Azure API 管理：企業級 API 整合模式
    - GitHub MCP 登記冊：生態系統發展與社群平台
  - <strong>全面結論</strong>：重寫結論章節，強調涵蓋多維 MCP 實作的七大案例
    - 企業整合、多代理調度、開發者生產力
    - 生態系統發展、教育應用分類
    - 深入架構模式、實作策略與最佳實踐
    - 強調 MCP 作為成熟生產協定的重要性

#### 學習指南更新 (study_guide.md)
- <strong>視覺課程地圖</strong>：更新思維導圖，新增 GitHub MCP 登記冊於案例研究章節
- <strong>案例描述強化</strong>：從通用描述提升為詳細七大案例分解
- <strong>倉庫結構</strong>：更新第 10 章以反映全面案例研究及具體實作細節
- <strong>變更日誌整合</strong>：新增 2025 年 9 月 26 日項，記錄 GitHub MCP 登記冊增補與案例研究增強
- <strong>日期更新</strong>：更新頁尾時間戳，反映最新修訂（2025 年 9 月 26 日）

### 文件品質改進
- <strong>一致性強化</strong>：七個案例全數格式及結構標準化
- <strong>全面涵蓋</strong>：案例橫跨企業、開發者生產力與生態系統發展場景
- <strong>策略定位</strong>：強調 MCP 作為智能系統部署基石平台
- <strong>資源整合</strong>：更新附加資源，包含 GitHub MCP 登記冊連結

## 2025 年 9 月 15 日

### 進階主題擴充 - 客製傳輸與上下文工程

#### MCP 客製傳輸 (05-AdvancedTopics/mcp-transport/) - 新進階實作指南
- **README.md**：完整客製 MCP 傳輸機制實作指南
  - **Azure Event Grid 傳輸**：全面無伺服器事件驅動傳輸實作
    - C#、TypeScript 與 Python 範例，含 Azure Functions 整合
    - 事件驅動架構模式，支持可擴展 MCP 解決方案
    - Webhook 接收器及推送訊息處理
  - **Azure Event Hubs 傳輸**：高吞吐量串流傳輸實作
    - 低延遲場景之即時串流能力
    - 分區策略與檢查點管理
    - 訊息批次與效能優化
  - <strong>企業整合模式</strong>：生產就緒架構示例
    - 跨多個 Azure Functions 的分散式 MCP 處理
    - 複合傳輸架構結合多種傳輸類型
    - 訊息耐久性、可靠性與錯誤處理策略
  - <strong>安全與監控</strong>：Azure Key Vault 整合與可觀察性模式
    - 託管身分驗證與最低權限存取
    - Application Insights 遙測與效能監控
    - 電路斷路器與容錯模式
  - <strong>測試框架</strong>：針對客製傳輸的完整測試策略
    - 單元測試結合替身與模擬框架
    - 與 Azure Test Containers 之整合測試
    - 效能與壓力測試考量

#### 上下文工程 (05-AdvancedTopics/mcp-contextengineering/) - 新興 AI 領域
- **README.md**：深入探討上下文工程作為新興領域
  - <strong>核心原則</strong>：完整上下文共享、動作決策感知與上下文視窗管理
  - **MCP 協定對應**：MCP 如何解決上下文工程挑戰
    - 上下文視窗限制與漸進式載入策略
    - 相關性判斷與動態上下文擷取
    - 多模態上下文處理與安全性考量
  - <strong>實作方法</strong>：單線程與多代理架構比較
    - 上下文分塊與優先排序技巧
    - 漸進式上下文載入與壓縮策略
    - 分層上下文方法與檢索優化
  - <strong>衡量框架</strong>：新興的上下文效能評估指標
    - 輸入效率、效能、品質與使用者體驗
    - 上下文優化的實驗性方法
    - 失敗分析與改進方法

#### 課程導航更新 (README.md)
- <strong>強化模組結構</strong>：更新課程表，納入新進階主題
  - 增加上下文工程 (5.14) 及客製傳輸 (5.15)
  - 各模組格式與導航連結一致化
  - 更新描述以反映當前內容範疇

### 目錄結構改進
- <strong>命名標準化</strong>：將 "mcp transport" 改名為 "mcp-transport"，與其他進階主題資料夾一致
- <strong>內容組織</strong>：所有 05-AdvancedTopics 資料夾採統一命名樣式 (mcp-[topic])

### 文件品質提升
- **符合 MCP 規範**：所有新內容參考 MCP 規範 2025-06-18
- <strong>多語言範例</strong>：包含 C#、TypeScript 與 Python 完整程式碼範例
- <strong>企業取向</strong>：貫穿生產就緒模式與 Azure 雲端整合
- <strong>視覺文件</strong>：架構與流程皆附 Mermaid 圖示

## 2025 年 8 月 18 日

### 文件全面更新 - MCP 2025-06-18 標準

#### MCP 安全最佳實務 (02-Security/) - 全面現代化
- **MCP-SECURITY-BEST-PRACTICES-2025.md**：完全重寫，對應 MCP 規範 2025-06-18
  - <strong>強制性要求</strong>：新增明確 MUST / MUST NOT 規定，並以直觀視覺標示
  - **12 項核心安全實務**：由 15 項列表重構為全面安全領域
    - 令牌安全與身份驗證，結合外部身份提供者整合
    - 會話管理與傳輸安全，含加密需求
    - AI 專屬威脅防護，集成 Microsoft Prompt Shields
    - 存取控制與權限，採最小權限原則
    - 內容安全與監控，結合 Azure Content Safety
    - 供應鏈安全，全面元件驗證
    - OAuth 安全與混淆代理防護，實作 PKCE
    - 事件應對與復原，自動化能力
    - 合規與治理，符合法規要求
    - 進階安全控管，零信任架構
    - Microsoft 安全生態系統整合，全面方案
    - 持續安全演進，適應性實務
  - **Microsoft 安全方案**：強化 Prompt Shields、Azure Content Safety、Entra ID 及 GitHub Advanced Security 整合指引
  - <strong>實作資源</strong>：分類豐富資源連結，涵蓋官方 MCP 文檔、Microsoft 安全方案、安全標準與實作指南

#### 進階安全控管 (02-Security/) - 企業實作
- **MCP-SECURITY-CONTROLS-2025.md**：全面改版，企業級安全框架
  - **9 大安全領域**：由基本控管擴充為詳細企業框架
    - 進階身份驗證與授權，含 Microsoft Entra ID 整合
    - 令牌安全與防穿透控管，全面驗證
    - 會話安全控管，阻擋劫持
    - AI 專屬安全控管，防範提示注入與工具中毒
    - 混淆代理攻擊防護，含 OAuth 代理安全
    - 工具執行安全，沙箱與隔離
    - 供應鏈安全控管，依賴元件驗證
    - 監控與偵測控管，含 SIEM 整合
    - 事件應對與復原，自動化能力
  - <strong>實作範例</strong>：添加詳細 YAML 配置段與程式碼範例
  - **Microsoft 方案整合**：涵蓋 Azure 安全服務、GitHub 高級安全與企業身份管理

#### 進階主題安全 (05-AdvancedTopics/mcp-security/) - 生產就緒實作
- **README.md**：企業安全實作之完整重寫
  - <strong>對應當前規範</strong>：更新為 MCP 規範 2025-06-18，含強制安全要求
  - <strong>加強身份驗證</strong>：Microsoft Entra ID 整合，包含完整 .NET 與 Java Spring Security 範例
  - **AI 安全整合**：Microsoft Prompt Shields 與 Azure Content Safety 實作，詳列 Python 範例
  - <strong>進階威脅緩解</strong>：全面實作範例涵蓋
    - 混淆代理攻擊防禦，包含 PKCE 與用戶同意驗證
    - 令牌穿透防護，含受眾驗證與安全令牌管理
- 使用加密綁定和行為分析防止會話劫持  
- <strong>企業安全整合</strong>：Azure Application Insights 監控、威脅檢測管線及供應鏈安全  
- <strong>實作清單</strong>：釐清必須與建議的安全控制，並具備 Microsoft 安全生態系優勢  

### 文件品質與標準對齊  
- <strong>規格參考</strong>：更新所有參考至最新 MCP 規格 2025-06-18  
- **Microsoft 安全生態系**：加強整合指引於所有安全文件中  
- <strong>實務實作</strong>：加入 .NET、Java 和 Python 企業模式的詳細程式範例  
- <strong>資源組織</strong>：官方文件、安全標準與實作指南的全面分類  
- <strong>視覺指示</strong>：清楚標示必須條件與建議方案  

#### 核心概念 (01-CoreConcepts/) - 全面現代化  
- <strong>協定版本更新</strong>：更新參考至目前 MCP 規格 2025-06-18，採用基於日期版本（YYYY-MM-DD 格式）  
- <strong>架構精進</strong>：強化對主機、用戶端及伺服器的描述，以符合現行 MCP 架構模式  
  - 主機定義為 AI 應用程序，協調多個 MCP 用戶端連線  
  - 用戶端描述為維持一對一伺服器關係的協定連接器  
  - 伺服器描述增補本地與遠端部署場景  
- <strong>原語重構</strong>：伺服器與用戶端原語的徹底改版  
  - 伺服器原語：資源（資料來源）、提示（範本）、工具（可執行函式），具詳細解說與範例  
  - 用戶端原語：取樣（LLM 完成）、誘導（使用者輸入）、記錄（除錯／監控）  
  - 更新至現行的發現（`*/list`）、擷取（`*/get`）及執行（`*/call`）方法模式  
- <strong>協定架構</strong>：導入雙層架構模型  
  - 資料層：以 JSON-RPC 2.0 為基礎，涵蓋生命週期管理與原語  
  - 傳輸層：STDIO（本地）及具 SSE 支援的串流 HTTP（遠端）傳輸機制  
- <strong>安全框架</strong>：包含明確的使用者同意、資料隱私保護、工具執行安全及傳輸層安全原則  
- <strong>通訊模式</strong>：更新協定訊息以示初始化、發現、執行與通知流程  
- <strong>程式範例</strong>：更新多語言範例（.NET、Java、Python、JavaScript）以符合現行 MCP SDK 模式  

#### 安全性 (02-Security/) - 全面安全大改版  
- <strong>標準對齊</strong>：全面符合 MCP 規格 2025-06-18 的安全需求  
- <strong>認證演進</strong>：記錄從自訂 OAuth 伺服器到外部身份供應者委派（Microsoft Entra ID）之演變  
- **AI 相關威脅分析**：加強現代 AI 攻擊向量的說明  
  - 詳細描述提示注入攻擊場景與實際案例  
  - 工具毒害機制與「拉地毯」攻擊模式  
  - 上下文視窗毒害和模型混淆攻擊  
- **Microsoft AI 安全解決方案**：詳盡涵蓋 Microsoft 安全生態系  
  - AI 提示盾牌，具先進偵測、聚焦及分隔符技術  
  - Azure 內容安全整合模式  
  - GitHub 進階安全用於供應鏈保護  
- <strong>進階威脅緩解</strong>：詳列安全控管包括  
  - 會話劫持及 MCP 專屬攻擊場景和加密會話 ID 要求  
  - MCP 代理場景中的混淆代理問題與明確同意需求  
  - 令牌通透漏洞與強制驗證控制  
- <strong>供應鏈安全</strong>：擴充 AI 供應鏈涵蓋基礎模型、嵌入服務、上下文提供者及第三方 API  
- <strong>基礎安全</strong>：加強企業安全模式整合，含零信任架構及 Microsoft 安全生態系  
- <strong>資源組織</strong>：根據類型分類完整資源連結（官方文件、標準、研究、Microsoft 解決方案、實作指南）  

### 文件品質提升  
- <strong>結構化學習目標</strong>：增強具有具體可執行成果的學習目標  
- <strong>交叉參考</strong>：新增相關安全與核心概念主題的連結  
- <strong>資訊更新</strong>：更新所有日期與規格連結指向最新標準  
- <strong>實作指引</strong>：於兩部分內新增具體可執行的實作方針  

## 2025 年 7 月 16 日  

### README 與導航優化  
- 完全重新設計 README.md 中的課程導航  
- 用更易用的表格格式取代 `<details>` 標籤  
- 在新建的 "alternative_layouts" 資料夾中提供替代布局選項  
- 新增卡片式、分頁式及手風琴式導航範例  
- 更新倉庫結構章節，涵蓋所有最新檔案  
- 強化「如何使用此課程」章節，提供明確建議  
- 更新 MCP 規格連結至正確 URL  
- 於課程結構新增情境工程部分 (5.14)  

### 學習指南更新  
- 完全修訂學習指南，使其符合現有倉庫結構  
- 新增 MCP 用戶端與工具，以及熱門 MCP 伺服器章節  
- 更新視覺課程地圖，準確反映所有主題  
- 加強對進階主題的描述，涵蓋所有專業領域  
- 更新案例研究章節，反映真實範例  
- 新增這份全面變更清單  

### 社群貢獻 (06-CommunityContributions/)  
- 新增 MCP 影像生成伺服器詳細資訊  
- 新增使用 Claude 於 VSCode 之完整章節  
- 新增 Cline 終端用戶端設定與使用指引  
- 更新 MCP 用戶端章節，涵蓋所有熱門選項  
- 強化貢獻範例，提供更精準的程式碼範本  

### 進階主題 (05-AdvancedTopics/)  
- 統一專業主題資料夾命名與組織  
- 新增情境工程教材與範例  
- 新增 Foundry 代理整合文件  
- 強化 Entra ID 安全整合文件  

## 2025 年 6 月 11 日  

### 初次建立  
- 發布 MCP 入門課程第一版  
- 建立所有 10 個主要章節的基本架構  
- 實作視覺課程地圖以利導航  
- 加入多種程式語言的初始範例專案  

### 快速入門 (03-GettingStarted/)  
- 新增第一批伺服器實作範例  
- 增加用戶端開發指南  
- 包含 LLM 用戶端整合說明  
- 新增 VS Code 整合說明文件  
- 實作伺服器推送事件（SSE）伺服器範例  

### 核心概念 (01-CoreConcepts/)  
- 新增用戶端-伺服器架構詳細說明  
- 編寫關鍵協定元件文件  
- 紀錄 MCP 中的訊息傳遞模式  

## 2025 年 5 月 23 日  

### 倉庫結構  
- 初始化倉庫，建立基本資料夾架構  
- 為每個主要章節建立 README 文件  
- 建置翻譯架構  
- 新增圖片資源與圖解  

### 文件  
- 建立初版 README.md，含課程概覽  
- 新增行為準則（CODE_OF_CONDUCT.md）與安全政策（SECURITY.md）  
- 設置支援文件（SUPPORT.md）提供求助指導  
- 建立初步學習指南結構  

## 2025 年 4 月 15 日  

### 規劃與框架  
- MCP 入門課程的初步規劃  
- 定義學習目標與目標受眾  
- 大綱課程十個章節架構  
- 建構範例與案例研究的概念性框架  
- 製作關鍵概念的初始原型範例

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->