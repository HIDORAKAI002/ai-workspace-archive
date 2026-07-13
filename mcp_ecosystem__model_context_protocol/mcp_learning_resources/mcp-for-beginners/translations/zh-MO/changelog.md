# 變更紀錄：MCP 初學者課程

本文件作為 Model Context Protocol (MCP) 初學者課程所有重大變更的紀錄。變更按時間逆序排列（最新變更優先）。

## 2026 年 7 月 2 日

### 新課程：2026-07-28 MCP 規範發行候選版

新增即將發佈的 `2026-07-28` MCP 規範發行候選版（2026 年 5 月 21 日公告；最終發佈計劃於 2026 年 7 月 28 日）內容，摘要自 [官方公告部落格文章](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)。課程基線持續為 **MCP 規範 2025-11-25**，直到新版公布，因此此處呈現為前瞻指引，而非既有課程的重寫。

- <strong>新增</strong>：[01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — 完整課程涵蓋無狀態協定核心（移除 `initialize` 握手及 `Mcp-Session-Id`）、新的 `Mcp-Method`/`Mcp-Name` 路由標頭、`ttlMs`/`cacheScope` 快取元資料、_meta 中的 W3C 跟蹤上下文、正式擴展框架（MCP 應用程式及新任務擴展）、六項授權加強 SEP、Roots/Sampling/Logging 功能棄用，及工具架構改為全面採用 JSON Schema 2020-12。
- <strong>更新</strong>：加入前瞻性呼叫鏈結至新課程：
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md)：協定版本註記、Sampling/Roots/Logging/Tasks 章節與「下一步」說明
  - [02-Security/README.md](./02-Security/README.md)：授權強化標註
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md)：無狀態傳輸注解
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md)：Sampling 棄用呼叫
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md)：Logging 棄用及任務擴展呼叫
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md)：無狀態/會話路由呼叫
  - [README.md](./README.md)：規範章節中「展望未來」註記與課程模組表新增 `1.1` 條目
  - [study_guide.md](./study_guide.md)：核心概念總覽中的前瞻性要點及日期附錄
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md)：關於 `mcp-session-id` 傳輸映射，於無狀態請求模型前的注解
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md)：模組總覽中對 Root Contexts/Sampling 棄用及任務擴展的呼叫
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md)：授權加強呼叫

## 2026 年 6 月 24 日

### 新課程：在 Copilot 應用中使用 MCP

- [工具章節](./12-tooling/README.md) 新增工具章節。
- [Copilot 應用中的 MCP](./12-tooling/01-copilot-app/README.md)

## 2026 年 6 月 16 日

### MCP 規範對齊及範例驗證

對照目前的 **MCP 規範 2025-11-25** 及最新官方 SDK 驗證課程內容，修正所有過時的規範參考，並確認核心範例仍可構建及執行。

#### 規範版本修正（2025-06-18 / 2025-03-26 → 2025-11-25）

更新英文內容中仍宣稱較舊版本為 *目前/最新* 標準的部分，並將鏈結重新指向正規的 `modelcontextprotocol.io` 規範路徑：
- **05-AdvancedTopics/mcp-security/README.md**：更新「目前標準」橫幅、介紹、核心安全原則標題、強制性要求標題、Microsoft Entra ID 章節、參考文獻與資源連結，以及結尾的安全通知（共 8 項參考）至 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**：更新額外資源規範鏈結及「目前標準」橫幅至 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**：替換過時的 `2025-03-26` 安全與信任鏈結為 2025-11-25 安全最佳實務頁面
- **03-GettingStarted/14-sampling/README.md**：更新官方 Sampling 文件鏈結為 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**：更新現行式「目前 MCP 規範」引用及額外資源規範鏈結至 2025-11-25（保留歷史 SSE 棄用註解以確保準確性）

#### 範例對新 SDK 驗證

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**：`npm install` 解決為 `@modelcontextprotocol/sdk@1.29.0`；`tsc --noEmit` 通過無型別錯誤 — 現有的 `McpServer`/`StdioServerTransport` API 仍有效
- **Python (03-GettingStarted/01-first-server/solution/python)**：在獨立 `.venv` 使用 `mcp[cli]` (1.27.2) 驗證；`py_compile` 通過，`FastMCP.list_tools()` 正確回傳 `add` 和 `subtract` 工具
- 確認所有範例中 `@modelcontextprotocol/sdk` 版本範圍（`>=1.26.0`／`^1.26.0`／`^1.27.0`）皆能順利解決成當前的 `1.29.0`，且無破壞性 API 變更

#### 依賴鎖版本對齊（彌補版本差異）

升級過時 SDK 鎖版本，使所有範例均追蹤最新 MCP 發布版，符合整個倉庫慣例：
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**：將 `@modelcontextprotocol/sdk` 版本從 `^1.8.0` 升級至 `>=1.26.0`，並更新過時之「為 MCP 2025-06-18 更新」套件描述為「與 MCP 規範 2025-11-25 對齊」
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** 與 **lab4/code/github_mcp_server/pyproject.toml**：將精確鎖版本 `mcp==1.23.0` 升級至 `mcp>=1.26.0`；重新生成兩個 `uv.lock` 鎖定檔（`uv lock`），使鎖檔解決為當前 `mcp 1.27.2` 並與模組清單保持同步

#### 課程缺口分析 — 最新規範功能涵蓋

驗證課程已覆蓋 MCP 2025-11-25 新增或擴展的所有原始功能，內容無缺口：
- **Sampling**：課程 03-GettingStarted/14-sampling 及 05-AdvancedTopics/mcp-sampling
- **誘導 (含 URL 模式)**：紀錄於 01-CoreConcepts 和 05-AdvancedTopics/mcp-protocol-features
- **Roots**：紀錄於 00-Introduction、01-CoreConcepts 及 05-AdvancedTopics/mcp-root-contexts
- **Tasks（實驗性、長期運行作業）**：紀錄於 01-CoreConcepts 和 05-AdvancedTopics/mcp-protocol-features
- <strong>工具註解</strong>（`readOnlyHint`／`destructiveHint`）：紀錄於 01-CoreConcepts 和 05-AdvancedTopics/mcp-protocol-features

### 安全加強與依賴漏洞修復

對所有依賴清單及範例原始碼做過全面安全檢查，修復所有 npm 安全警告及一個程式碼層級的問題。修復後，每個審核目錄中的 `npm audit` 報告皆為 **0 漏洞**。

#### npm 依賴漏洞（傳遞性）— 已解決

審核全部 15 個提交的 `package-lock.json` 檔案。漏洞限定於 MCP Inspector 開發工具、OpenAI 客戶端及 MCP SDK 所攜帶的傳遞依賴；皆已解決，範例功能不受影響：
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** 和 **lab3/code/weather_mcp/inspector**：將 `@modelcontextprotocol/inspector` 由 `0.16.6` / `0.14.1` 升至 `0.22.0`，消除了內嵌 `ajv`、`brace-expansion`、`diff`、`path-to-regexp` 和 `ws` 的警告。新增 npm `overrides` 條目，強制使用補丁版本 `shell-quote@1.8.4`，以排除由 `concurrently` 帶來的剩餘關鍵警告；重新生成兩份鎖檔（目前皆無漏洞）
- **03-GettingStarted/samples/typescript**：執行 `npm audit fix`，更新傳遞性 `qs`（中度）為補丁版本
- **03-GettingStarted/samples/javascript**：執行 `npm audit fix`，更新傳遞性 `hono`（中度）為補丁版本
- **03-GettingStarted/03-llm-client/solution/typescript**：執行 `npm audit fix`，更新傳遞性 `form-data`（高危）為補丁版本
- **03-GettingStarted/11-simple-auth/solution/typescript**：產生缺失的 `package-lock.json`，使專案可重現並可審核（無漏洞）

#### 程式碼層級安全修正（OWASP A03：注入漏洞）

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**：移除 `open_in_vscode` 工具中對 `subprocess.run` 採用的 `shell=True`。先前 `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` 允許資料夾路徑中含有的命令列元字符被 `cmd.exe` 解譯（命令注入向量）。現改直接執行解析後的 `Code.exe` 並帶入資料夾參數 — 無 shell — 功能等效且安全。

#### Python 依賴安全檢查

- 使用 `pip-audit` 審核所有 Python 需求集。`05-AdvancedTopics` 與 `03-GettingStarted/samples/python` 均報告 <strong>無已知漏洞</strong>（其 `mcp` / `httpx` / `pydantic` / `python-dotenv` 版本範圍解決到目前安全版本）
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**：`pip-audit` 探測到傳遞依賴 **`werkzeug` 3.1.1** 存在三個 Windows 裝置名拒服務 (DoS) 漏洞 `safe_join`，即 `CVE-2025-66221`、`CVE-2026-21860` 與 `CVE-2026-27199`（均已於 3.1.6 修復）。新增安全腳本限制 `werkzeug>=3.1.6`，確保解析無誤；並驗證與 `chainlit` / `mcp` / `semantic-kernel` 堆疊相容。

### 產品名稱改品牌

更新所有課程內容以反映微軟產品品牌調整：

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**：更新 Discord 社群連結
- **AGENTS.md**：更新 Discord 伺服器引用
- **README.md**：更新技術生態系引用
- **study_guide.md**：更新案例研究引用
- **05-AdvancedTopics/README.md**：更新模組 5.13 標題及說明
- **05-AdvancedTopics/mcp-integration/README.md**：更新章節標頭及說明
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**：全面更新模組標題及內容
- **05-AdvancedTopics/mcp-security-entra/README.md**：更新跨引用鏈結
- **07-LessonsfromEarlyAdoption/README.md**：更新案例研究引用
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**：更新第 9 節標頭、標章及能力
- **08-BestPractices/README.md**：更新 Discord 社群鏈結
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**：更新 Discord 頻道引用
- **09-CaseStudy/docs-mcp/solution/python/README.md**：更新模型部署引用
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**：更新 AI 服務表
- **11-MCPServerHandsOnLabs/03-Setup/README.md**：更新資源引用

#### AI 工具包 / AITK → Microsoft Foundry Toolkit Extension for VS Code

- **README.md**: 更新主要課程參考資料
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: 更新模組標題、概述及所有模組標頭
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: 更新標題、學習目標、設定說明與資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: 更新標題、學習目標、MCP 主機表格及交叉參考
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: 更新標題、徽章、前置條件及資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: 更新代理建構器參考和反饋連結
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: 更新前置條件及擴展參考

---

## 2026年4月11日

### 新課程、文件修正及依賴更新

#### 新增課程內容

**模組 05 - 進階主題**
- **第 5.17 課：利用 MCP 進行對抗性多代理推理** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): 新增完整指南，涵蓋多代理系統的對抗辯論模式
  - Mermaid 架構圖：兩個代理 → 共享 MCP 伺服器 → 辯論記錄 → 評審 → 判決
  - 以 Python 和 TypeScript 實作的共享 MCP 工具伺服器（`web_search` + `run_python`）
  - 對立系統提示語（贊成／反對／評審），明確規定工具使用要求
  - 以 Python、TypeScript 和 C# 實作的辯論協調器，負責管理回合與路由論點
  - MCP `ClientSession` 為協調器連接實際工具調用的接線
  - 使用案例表（幻覺偵測、威脅建模、API 設計審查、事實驗證、技術選擇）
  - 安全考量：沙箱執行、工具調用驗證、速率限制、審計記錄
  - 結構化練習包含三種實際場景（程式碼審查、架構決策、內容審核）

#### 文件修正

**模組 03 - 入門指南**
- **05-stdio-server/README.md**: 修正不完整的 TypeScript stdio 伺服器範例 — 新增遺漏的傳輸實例化（`new StdioServerTransport()`）及 `server.connect(transport)` 調用，與同段 Python 和 .NET 範例保持一致
- **14-sampling/README.md**: 修正錯字 — 將 `"Sampling is an davanced features"`更正為 `"Sampling is an advanced feature"`

#### 課程更新

**主要 README.md**
- 在課程表中新增條目 5.17（利用 MCP 進行對抗性多代理推理）並附直接鏈接至新課程

**05-AdvancedTopics/README.md**
- 新增第 5.17 課表列至課程清單

**study_guide.md**
- 在心智圖和進階主題的文字描述中添加對抗性多代理推理主題

#### 程式碼與安全修正

**模組 05 - 對抗代理（`mcp-adversarial-agents`）**
- **安全修正 — 命令注入**：在 TypeScript `run_python` 工具中，用 `execFile` + `promisify` 取代 `execSync` 的 Shell 插值方式，消除命令注入風險（現由 LLM 控制的程式碼作為字面 argv 元素傳遞，不會透過 Shell）
- **MCP 工具循環接線**：更新 Python 辯論協調器，使用非阻塞 `AsyncAnthropic` 客戶端，直接將即時 `ClientSession` 傳遞給每個代理回合，每回合通過 `session.list_tools()` 取得工具定義，並在循環中以 `session.call_tool()` 分派工具使用區塊直至模型輸出最終文字響應

#### 依賴更新

- 多個套件（03-GettingStarted、04-PracticalImplementation、10-StreamliningAIWorkflows）中 `hono` 升級至 4.12.12
- TypeScript 套件中 `@hono/node-server` 由 1.19.11 升級至 1.19.13
- Python 套件（10-StreamliningAIWorkflows 實驗室3及4）中 `cryptography` 由 46.0.5 升級至 46.0.7
- 10-StreamliningAIWorkflows inspector 中 `lodash` 由 4.17.23 升級至 4.18.1

#### 翻譯同步

- 與最新原始碼變更同步 48+ 語言翻譯（i18n 更新）

---

## 2026年2月5日

### 倉庫層級驗證與導航提升

#### 新增課程內容

**模組 03 - 入門指南**
- **12-mcp-hosts/README.md**: 新增 MCP 主機設定完整指南
  - Claude Desktop、VS Code、Cursor、Cline、Windsurf 設定範例
  - 主要主機的 JSON 配置範本
  - 傳輸類型比較表（stdio、SSE/HTTP、WebSocket）
  - 常見連接問題排解
  - 主機設定的安全最佳實踐

- **13-mcp-inspector/README.md**: 新增 MCP Inspector 除錯指南
  - 安裝方式（npx、npm 全域、原始碼安裝）
  - 透過 stdio 與 HTTP/SSE 連接伺服器
  - 測試工具、資源及提示工作流程
  - VS Code 與 MCP Inspector 整合
  - 常見除錯情境與解決方案

**模組 04 - 實務實作**
- **pagination/README.md**: 新增分頁實作指南
  - Python、TypeScript、Java 中基於游標的分頁模式
  - 用戶端分頁處理
  - 游標設計策略（不透明 vs 結構化）
  - 性能優化建議

**模組 05 - 進階主題**
- **mcp-protocol-features/README.md**: 新增協議功能深度解析
  - 進度通知實作
  - 請求取消模式
  - 資源範本與 URI 模式
  - 伺服器生命週期管理
  - 記錄等級控制
  - JSON-RPC 編碼的錯誤處理模式

#### 導航修正（更新 24+ 文件）

**主要模組 README**
 現在同時連結到第一課與下一模組

**02-Security 子文件**
- 五份輔助安全文件皆新增「接下來做什麼」導航：

**09-CaseStudy 文件**
- 所有個案研究文件均新增按順序的導覽：

**10-StreamliningAI 實驗室**
在模組 10 概述及模組 11 新增「接下來做什麼」區塊

#### 程式碼與內容修正

**SDK 與依賴更新**
修正空白的 openai 版本為 `^4.95.0`
SDK 版本由 `^1.8.0` 更新至 `>=1.26.0`
MCP 版本鎖定更新為 `>=1.26.0`

<strong>程式碼修正</strong>
將無效模型 `gpt-4o-mini` 修正為 `gpt-4.1-mini`

<strong>內容修正</strong>
修正斷開連結 `READMEmd` → `README.md`，修正課程標頭 `Module 1-3` → `Module 0-3`，修正大小寫敏感路徑
移除損壞的重複個案研究 5 內容

<strong>初學者引導改進</strong>
新增適當的介紹、學習目標及前置條件

#### 課程更新

**主要 README.md**
- 新增 3.12 (MCP 主機)、3.13 (MCP Inspector)、4.1 (分頁)、5.16 (協議功能) 條目至課程表

**模組 README**
新增第 12 與 13 課至課程列表
新增實務指南區塊並附分頁連結
新增第 5.15 課（自訂傳輸）及 5.16 課（協議功能）

**study_guide.md**
- 更新心智圖，加入所有新主題：MCP 主機設定、MCP Inspector、分頁策略、協議功能深度解析

## 2026年1月28日

### MCP 規範 2025-11-25 合規審查

#### 核心概念強化（01-CoreConcepts/）
- **新增客戶端原語 - Roots**：新增完整文件說明 Roots 客戶端原語，讓伺服器能理解檔案系統邊界與存取權限
- <strong>工具註解</strong>：新增有關工具行為註解（`readOnlyHint`、`destructiveHint`）的文件，以優化工具執行決策
- <strong>抽樣中的工具調用</strong>：更新抽樣文件，新增 `tools` 和 `toolChoice` 參數，用於模型驅動的抽樣工具調用
- **URL 模式引導**：新增一節描述 URL 模式引導，用於伺服器發起的外部網頁互動
- **工作（實驗性）**：新增實驗性工作功能文檔，提供持久執行包裝與延後結果擷取
- <strong>圖示支援</strong>：指明工具、資源、資源範本及提示現在可包含圖示作為額外元資料

#### 文件更新
- **README.md**：新增 MCP 規範 2025-11-25 版本參考及基於日期的版本說明
- **study_guide.md**：更新課程地圖，將工作和工具註解納入核心概念章節；更新文檔時間戳

#### 規範合規驗證
- <strong>協議版本</strong>：確認所有文件皆參考最新 MCP 規範 2025-11-25
- <strong>架構對齊</strong>：確認雙層架構（資料層 + 傳輸層）文件的準確性
- <strong>原語文件</strong>：驗證伺服器原語（資源、提示、工具）及客戶端原語（抽樣、引導、日誌、Roots）的文件內容
- <strong>傳輸機制</strong>：確認 STDIO 及可串流 HTTP 傳輸文件的準確性
- <strong>安全指導</strong>：確認與現行 MCP 安全最佳實踐文件的一致性

#### 重要 MCP 2025-11-25 功能文件化
- **OpenID Connect 探索**：OIDC 認證伺服器探索
- **OAuth 客戶端 ID 元資料文件**：推薦用戶端註冊機制
- **JSON Schema 2020-12**：MCP 架構定義的預設方言
- **SDK 分層系統**：規範 SDK 功能支援與維護要求
- <strong>治理架構</strong>：正式化 MCP 治理中的工作組與利益團體

### 安全文件重大更新（02-Security/）

#### MCP 安全峰會研討會（Sherpa）整合
- <strong>新增實作訓練資源</strong>：在所有安全文檔中整合並詳述 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 的內容
- <strong>探險路線覆蓋</strong>：完整記錄從基地營到峰會的營地進程
- **OWASP 對應**：所有安全指導現已映射至 OWASP MCP Azure 安全指南風險

#### OWASP MCP Top 10 整合
- <strong>新增章節</strong>：新增 OWASP MCP Top 10 安全風險表格，含 Azure 緩解方案，於主要安全 README
- <strong>風險導向文件</strong>：更新 mcp-security-controls-2025.md，針對每個安全領域加入 OWASP MCP 風險參考
- <strong>參考架構</strong>：鏈接 OWASP MCP Azure 安全指南架構與實施模式

#### 安全文件更新
- **README.md**：新增 Sherpa 研討會概述、探險路線表格、OWASP MCP Top 10 風險摘要及實作訓練區塊
- **mcp-security-controls-2025.md**：更新標題為 2026年2月，新增 OWASP 風險參考（MCP01-MCP08），修正規範版本不一致
- **mcp-security-best-practices-2025.md**：新增 Sherpa 與 OWASP 資源區塊，更新時間戳
- **mcp-best-practices.md**：新增實作訓練區塊，附 Sherpa 與 OWASP 連結
- **azure-content-safety-implementation.md**：新增 OWASP MCP06 參考，Sherpa 第 3 營地對齊，及附加資源區塊

#### 新增資源連結
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- 個別 OWASP MCP 風險頁面（MCP01-MCP10）

### 課程全面 MCP 規範 2025-11-25 對齊

#### 模組 03 - 入門指南
- **SDK 文件**：將 Go SDK 新增至官方 SDK 列表；更新所有 SDK 參考以符合 MCP 規範 2025-11-25
- <strong>傳輸澄清</strong>：更新 STDIO 與 HTTP 串流傳輸說明，明確加入規範引用

#### 模組 04 - 實務實作
- **SDK 更新**：新增 Go SDK；在 SDK 列表中加入規範版本參考
- <strong>授權規範</strong>：更新 MCP 授權規範連結為最新 2025-11-25 版本

#### 模組 05 - 進階主題
- <strong>新功能</strong>：新增有關 MCP 規範 2025-11-25 新功能（工作、工具註解、URL 模式引導、Roots）的說明
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 及 Sherpa 研討會連結於附加參考

#### 模組 06 - 社群貢獻
- **SDK 列表**：新增 Swift 和 Rust SDK；更新規範連結為 2025-11-25
- <strong>規範參考</strong>：更新 MCP 規範連結為直接規範網址

#### 模組 07 - 早期採用教訓

- <strong>資源更新</strong>: 新增 MCP 規範 2025-11-25 連結及 OWASP MCP 十大至額外資源

#### 模組 08 - 最佳實務
- <strong>規範版本</strong>: 更新 MCP 規範參考至 2025-11-25
- <strong>安全資源</strong>: 新增 OWASP MCP 十大及 Sherpa 工作坊至額外參考資料

#### 模組 10 - 簡化 AI 工作流程
- <strong>徽章更新</strong>: 將 MCP 版本徽章由 SDK 版本 (1.9.3) 改為規範版本 (2025-11-25)
- <strong>資源連結</strong>: 更新 MCP 規範連結；新增 OWASP MCP 十大

#### 模組 11 - MCP 伺服器動手實驗室
- <strong>規範參考</strong>: 更新 MCP 規範連結至 2025-11-25 版本
- <strong>安全資源</strong>: 新增 OWASP MCP 十大至官方資源

## 2025年12月18日

### 安全文件更新 - MCP 規範 2025-11-25

#### MCP 安全最佳實務 (02-Security/mcp-best-practices.md) - 規範版本更新
- <strong>協議版本更新</strong>: 更新至最新 MCP 規範 2025-11-25 (發布於 2025年11月25日)
  - 將所有規範版本參考從 2025-06-18 更新為 2025-11-25
  - 將文件日期參考從 2025年8月18日 更新為 2025年12月18日
  - 確認所有規範 URL 指向當前文件
- <strong>內容驗證</strong>: 全面驗證安全最佳實務符合最新標準
  - **Microsoft 安全方案**: 驗證 Prompt Shields (前稱「越獄風險檢測」)、Azure Content Safety、Microsoft Entra ID 及 Azure Key Vault 當前術語與連結
  - **OAuth 2.1 安全**: 確認符合最新 OAuth 安全最佳實務
  - **OWASP 標準**: 驗證 LLM 相關 OWASP 十大參考保持最新
  - **Azure 服務**: 驗證所有 Microsoft Azure 文件連結及最佳實務
- <strong>標準對齊</strong>: 所有引用的安全標準已確認為最新
  - NIST AI 風險管理架構
  - ISO 27001:2022
  - OAuth 2.1 安全最佳實務
  - Azure 安全與合規架構
- <strong>實作資源</strong>: 驗證所有實作指南連結及資源完整
  - Azure API 管理身份驗證模式
  - Microsoft Entra ID 整合指南
  - Azure Key Vault 秘密管理
  - DevSecOps 管線及監控方案

### 文件品質保證
- <strong>規範合規</strong>: 確保所有 MCP 安全要求 (必須/禁止) 與最新規範對齊
- <strong>資源時效</strong>: 驗證所有外部連結指向 Microsoft 文件、安全標準及實作指南
- <strong>最佳實務覆蓋率</strong>: 確認完整涵蓋身份驗證、授權、AI 特定威脅、供應鏈安全及企業模式

## 2025年10月6日

### 入門章節擴充 – 進階伺服器使用與簡易驗證

#### 進階伺服器使用 (03-GettingStarted/10-advanced)
- <strong>新增章節</strong>: 介紹全面性的進階 MCP 伺服器使用指南，涵蓋一般及低階伺服器架構。
  - **一般伺服器 vs 低階伺服器**: 詳細比較及 Python 與 TypeScript 範例說明兩種方式。
  - <strong>基於處理器設計</strong>: 說明基於 handler 的工具/資源/提示管理，適用於可擴展且靈活的伺服器實作。
  - <strong>實務模式</strong>: 實際情境中低階伺服器模式對於進階功能和架構的效益。

#### 簡易驗證 (03-GettingStarted/11-simple-auth)
- <strong>新增章節</strong>: 逐步指導如何在 MCP 伺服器中實作簡易驗證。
  - <strong>認證概念</strong>: 清晰解釋身份驗證與授權及憑證管理。
  - <strong>基礎驗證實作</strong>: Python (Starlette) 與 TypeScript (Express) 的中介軟件驗證模式及範例程式碼。
  - <strong>進階安全推進</strong>: 引導從簡易驗證過渡至 OAuth 2.1 及 RBAC，並參考進階安全模組。

這些新增內容提供實務操作指引，協助構建更強健、安全及靈活的 MCP 伺服器實作，橋接基礎概念與進階生產模式。

## 2025年9月29日

### MCP 伺服器資料庫整合實驗室 - 全面動手學習路徑

#### 11-MCPServerHandsOnLabs - 新增完整資料庫整合課程
- **完整 13 實驗路徑**: 新增全面性的動手課程，建置具生產等級的 MCP 伺服器並整合 PostgreSQL 資料庫
  - <strong>實務案例</strong>: Zava Retail 分析案例展示企業級模式
  - <strong>結構化學習進程</strong>:
    - **實驗 00-03: 基礎** - 介紹、核心架構、安全與多租戶、環境設定
    - **實驗 04-06: 建立 MCP 伺服器** - 資料庫設計與結構、MCP 伺服器實作、工具開發  
    - **實驗 07-09: 進階功能** - 語義搜尋整合、測試與除錯、VS Code 整合
    - **實驗 10-12: 生產與最佳實務** - 部署策略、監控與可觀察性、最佳實務與優化
  - <strong>企業技術</strong>: FastMCP 框架、帶 pgvector 的 PostgreSQL、Azure OpenAI 嵌入、Azure Container Apps、Application Insights
  - <strong>進階功能</strong>: 列級安全 (RLS)、語義搜尋、多租戶資料存取、向量嵌入、實時監控

#### 術語標準化 - 模組改為實驗室
- <strong>全面文件更新</strong>: 系統性更新 11-MCPServerHandsOnLabs 內所有 README 檔案，將「Module」改為「Lab」
  - <strong>章節標題</strong>: 將所有 13 個實驗的「本模組涵蓋」更新為「本實驗涵蓋」
  - <strong>內容描述</strong>: 將所有「本模組提供」改為「本實驗提供」
  - <strong>學習目標</strong>: 將「本模組結束時」改為「本實驗結束時」
  - <strong>導航連結</strong>: 將所有「Module XX:」參考於跨章節與導航中改為「Lab XX:」
  - <strong>完成追蹤</strong>: 將「完成本模組後」更新為「完成本實驗後」
  - <strong>保留技術參考</strong>: 配置檔中 Python 模組參考仍維持不變 (例如 `"module": "mcp_server.main"`)

#### 學習指南強化 (study_guide.md)
- <strong>視覺課程地圖</strong>: 增加新「11. 資料庫整合實驗室」章節及詳細的實驗結構視覺化
- <strong>倉庫結構</strong>: 從十個主要章節擴充至十一個，補充 11-MCPServerHandsOnLabs 詳細描述
- <strong>學習路徑指引</strong>: 強化導航指示以涵蓋 00-11 章節
- <strong>技術涵蓋範圍</strong>: 新增 FastMCP、PostgreSQL 及 Azure 服務整合說明
- <strong>學習成果</strong>: 強調生產就緒的伺服器開發、資料庫整合模式和企業安全

#### 主 README 結構強化
- <strong>基於實驗室的術語</strong>: 更新 11-MCPServerHandsOnLabs 主 README.md，統一使用「Lab」結構
- <strong>學習路徑組織</strong>: 明確由基礎概念到進階實作再到生產部署的進程
- <strong>實務導向</strong>: 強調具企業級模式與技術的實務動手學習

### 文件品質與一致性改進
- <strong>實作學習強調</strong>: 全文強化實務、基於實驗室的學習方法
- <strong>企業模式焦點</strong>: 凸顯生產就緒實作及企業安全考量
- <strong>技術整合</strong>: 全面涵蓋現代 Azure 服務與 AI 整合模式
- <strong>學習進展</strong>: 清晰、結構化的基礎至生產部署路徑

## 2025年9月26日

### 案例研究擴充 - GitHub MCP Registry 整合

#### 案例研究 (09-CaseStudy/) - 生態系統發展焦點
- **README.md**: 重大擴充，包含全面的 GitHub MCP Registry 案例研究
  - **GitHub MCP Registry 案例研究**: 新增全面研究，探討 2025年9月 GitHub 的 MCP Registry 推出
    - <strong>問題分析</strong>: 詳細檢視分散的 MCP 伺服器發現與部署挑戰
    - <strong>解決架構</strong>: GitHub 集中式註冊表方法及一鍵 VS Code 安裝
    - <strong>商業影響</strong>: 可衡量的開發者入門與生產力提升
    - <strong>策略價值</strong>: 聚焦模組化代理部署與跨工具互操作性
    - <strong>生態系統發展</strong>: 定位為代理系統整合的基礎平台
  - <strong>強化案例研究結構</strong>: 更新所有七個案例研究，統一格式與完整描述
    - Azure AI 旅行代理：多代理編排強調
    - Azure DevOps 整合：工作流程自動化焦點
    - 實時文件檢索：Python 主控台客戶端實作
    - 互動式學習計畫生成器：Chainlit 對話式網頁應用
    - 編輯器內文件：VS Code 與 GitHub Copilot 整合
    - Azure API 管理：企業 API 整合模式
    - GitHub MCP Registry：生態系統發展與社群平台
  - <strong>全面結論</strong>: 重寫結論章節，涵蓋七個案例研究，涵蓋多個 MCP 實作面向
    - 企業整合、多代理編排、開發者生產力
    - 生態系統發展、教育應用分類
    - 強化了架構模式、實作策略與最佳實務的洞察
    - 強調 MCP 為成熟、生產就緒協議

#### 學習指南更新 (study_guide.md)
- <strong>視覺課程地圖</strong>: 更新心智圖，將 GitHub MCP Registry 納入案例研究章節
- <strong>案例研究描述</strong>: 從通用描述擴充為七個全面案例研究的詳細拆解
- <strong>倉庫結構</strong>: 更新第 10 章以反映全面性的案例研究覆蓋及具體實作細節
- <strong>更新紀錄整合</strong>: 新增 2025年9月26日條目，紀錄 GitHub MCP Registry 新增及案例研究強化
- <strong>日期更新</strong>: 更新頁尾時間戳記為最新版本 (2025年9月26日)

### 文件品質改進
- <strong>一致性強化</strong>: 七個案例研究均標準化格式和結構
- <strong>全面覆蓋</strong>: 案例研究涵蓋企業、開發者生產力及生態系統發展情境
- <strong>策略定位</strong>: 強化 MCP 作為代理系統部署基礎平台的定位
- <strong>資源整合</strong>: 更新額外資源以包含 GitHub MCP Registry 連結

## 2025年9月15日

### 進階主題擴充 - 自訂傳輸與上下文工程

#### MCP 自訂傳輸 (05-AdvancedTopics/mcp-transport/) - 新進階實作指南
- **README.md**: 完整自訂 MCP 傳輸機制實作指南
  - **Azure Event Grid 傳輸**: 全面無伺服器事件驅動傳輸實作
    - C#、TypeScript 及 Python 範例，含 Azure Functions 整合
    - 事件驅動架構模式以實現可擴展 MCP 解決方案
    - Webhook 接收器及推播訊息處理
  - **Azure Event Hubs 傳輸**: 高吞吐量串流傳輸實作
    - 適用低延遲場景的即時串流功能
    - 分區策略與檢查點管理
    - 訊息批次處理與效能優化
  - <strong>企業整合模式</strong>: 生產就緒架構範例
    - 多個 Azure Functions 分散式 MCP 處理
    - 混合傳輸架構整合多種傳輸類型
    - 訊息持久性、可靠性與錯誤處理策略
  - <strong>安全與監控</strong>: Azure Key Vault 整合及可觀察性模式
    - 受管理身分驗證與最小權限存取
    - Application Insights 遙測與效能監控
    - 斷路器與容錯模式
  - <strong>測試框架</strong>: 自訂傳輸的全面測試策略
    - 單元測試搭配測試替身與模擬框架
    - Azure 測試容器的整合測試
    - 效能與負載測試考量

#### 上下文工程 (05-AdvancedTopics/mcp-contextengineering/) - 新興 AI 領域
- **README.md**: 全面探討上下文工程作為新興領域
  - <strong>核心原則</strong>: 完整上下文共享、行動決策感知及上下文視窗管理
  - **MCP 協議對齊**: MCP 設計如何解決上下文工程挑戰
    - 上下文視窗限制及漸進式載入策略
    - 相關性判斷及動態上下文檢索
    - 多模態上下文處理及安全考量
  - <strong>實作方式</strong>: 單緒 vs 多代理架構
    - 上下文切塊與優先排序技術
    - 漸進式上下文載入與壓縮策略
    - 分層上下文方法與檢索優化
  - <strong>衡量框架</strong>: 新興的上下文效能評估指標
    - 輸入效率、效能、品質及用戶體驗考量
    - 上下文優化的實驗性方法
    - 失敗分析與改進方法

#### 課程導航更新 (README.md)
- <strong>增強模組結構</strong>: 更新課程表以加入新進階主題
  - 新增上下文工程 (5.14) 與自訂傳輸 (5.15)
  - 所有模組格式與導航連結一致
  - 更新描述以反映當前內容範圍

### 目錄結構改進
- <strong>命名標準化</strong>: 將「mcp transport」重命名為「mcp-transport」，與其他進階主題資料夾一致
- <strong>內容組織</strong>: 所有 05-AdvancedTopics 資料夾採用一致命名模式 (mcp-[topic])

### 文件品質強化
- **MCP 規範對齊**: 所有新內容均引用現行 MCP 規範 2025-06-18
- <strong>多語言範例</strong>: 提供完整 C#、TypeScript 及 Python 程式碼範例

- <strong>企業焦點</strong>：整個過程中的生產就緒模式和 Azure 雲端整合
- <strong>視覺化文件</strong>：用於架構和流程視覺化的 Mermaid 圖表

## 2025年8月18日

### 文件全面更新 - MCP 2025-06-18 標準

#### MCP 安全最佳實踐 (02-Security/) - 完整現代化
- **MCP-SECURITY-BEST-PRACTICES-2025.md**：根據 MCP 規範 2025-06-18 完全重寫
  - <strong>強制性要求</strong>：新增來自官方規範的明確 MUST/MUST NOT 要求，並配有清晰視覺指示器
  - **12 個核心安全實踐**：從 15 項清單重組為全面安全領域
    - 令牌安全與外部身份提供者整合的驗證
    - 會話管理與傳輸安全及加密要求
    - AI 特定威脅防護與 Microsoft 提示盾整合
    - 存取控制與權限，遵循最小權限原則
    - 內容安全與監控，整合 Azure 内容安全
    - 供應鏈安全，含全面元件驗證
    - OAuth 安全及 Confused Deputy 防護，實施 PKCE
    - 事件響應與復原，具備自動化功能
    - 合規與治理，與監管規範對齊
    - 先進安全控制，採用零信任架構
    - Microsoft 安全生態系統整合，含全面解決方案
    - 持續安全演進，採用適應性實踐
  - **Microsoft 安全解決方案**：加強提示盾、Azure 內容安全、Entra ID 和 GitHub 高級安全的整合指南
  - <strong>實作資源</strong>：根據官方 MCP 文件、Microsoft 安全解決方案、安全標準及實作指南分類全面資源鏈接

#### 先進安全控制 (02-Security/) - 企業實作
- **MCP-SECURITY-CONTROLS-2025.md**：企業級安全框架的全面改造
  - **9 大安全領域**：從基本控制擴展至詳細企業框架
    - 先進身份驗證與授權，整合 Microsoft Entra ID
    - 令牌安全與防止傳遞控制，具備全面性驗證
    - 會話安全控制，防止劫持
    - AI 特定安全控制，防範提示注入和工具中毒
    - Confused Deputy 攻擊防護與 OAuth 代理安全
    - 工具執行安全，包括沙箱及隔離
    - 供應鏈安全控制，驗證依賴性
    - 監控與偵測控制，結合 SIEM 整合
    - 事件響應與復原，自動化能力
  - <strong>實作範例</strong>：新增詳細 YAML 配置區塊及程式碼範例
  - **Microsoft 解決方案整合**：涵蓋 Azure 安全服務、GitHub 高級安全和企業身份管理

#### 進階主題安全 (05-AdvancedTopics/mcp-security/) - 生產就緒實作
- **README.md**：為企業安全實作完整重寫
  - <strong>符合當前規範</strong>：更新至 MCP 規範 2025-06-18 及強制性安全要求
  - <strong>增強身份驗證</strong>：整合 Microsoft Entra ID，含完整 .NET 與 Java Spring Security 範例
  - **AI 安全集成**：實施 Microsoft 提示盾和 Azure 內容安全，附詳細 Python 範例
  - <strong>先進威脅緩解</strong>：包含
    - PKCE 與用戶同意驗證的 Confused Deputy 攻擊防範
    - 受眾驗證與安全令牌管理的令牌傳遞防範
    - 加密綁定與行為分析的會話劫持預防
  - <strong>企業安全整合</strong>：Azure Application Insights 監控、威脅偵測流水線及供應鏈安全
  - <strong>實作核對清單</strong>：明確區分強制與推薦安全控制，並說明 Microsoft 安全生態系優勢

### 文件品質與標準對齊
- <strong>規範參考</strong>：更新所有引用至當前 MCP 規範 2025-06-18
- **Microsoft 安全生態系**：在所有安全文件中加強整合指南
- <strong>實用實作</strong>：新增 .NET、Java 與 Python 的詳細程式碼範例，搭配企業模式
- <strong>資源組織</strong>：官方文件、安全標準及實作指南的全面分類
- <strong>視覺指示器</strong>：清楚標示強制需求與推薦做法


#### 核心概念 (01-CoreConcepts/) - 全面現代化
- <strong>協議版本更新</strong>：更新引用現行 MCP 規範 2025-06-18，使用日期版號（YYYY-MM-DD 格式）
- <strong>架構精煉</strong>：加強對 Hosts、Clients 和 Servers 的描述，以符合現行 MCP 架構模式
  - Hosts 現在明確定義為協調多個 MCP 用戶端連接的 AI 應用
  - Clients 描述為維持一對一定義伺服器連結的協議連接器
  - Servers 增加本地與遠端部署場景描述
- <strong>原語重組</strong>：伺服器與用戶端原語全面改造
  - 伺服器原語：資源（資料來源）、提示（模板）、工具（可執行功能），含詳細說明與範例
  - 用戶端原語：抽樣（LLM 補全）、引導（用戶輸入）、日誌記錄（偵錯/監控）
  - 更新現行發現（`*/list`）、檢索（`*/get`）與執行（`*/call`）方法模式
- <strong>協議架構</strong>：引入雙層架構模型
  - 資料層：基於 JSON-RPC 2.0，含生命週期管理與原語
  - 傳輸層：STDIO（本地）及可串流 HTTP 與 SSE（遠端）傳輸機制
- <strong>安全框架</strong>：全面安全原則，包括明確用戶同意、資料隱私保護、工具執行安全與傳輸層安全
- <strong>通訊模式</strong>：更新協議訊息，呈現初始化、發現、執行與通知流程
- <strong>程式碼範例</strong>：更新多語言範例（.NET、Java、Python、JavaScript）以反映當前 MCP SDK 模式

#### 安全 (02-Security/) - 全面安全大翻新  
- <strong>標準對齊</strong>：完全符合 MCP 規範 2025-06-18 的安全要求
- <strong>身份驗證演進</strong>：記錄從自訂 OAuth 伺服器到外部身份提供者委派（Microsoft Entra ID）的演變
- **AI 特定威脅分析**：加強現代 AI 攻擊向量的涵蓋
  - 詳細提示注入攻擊場景及實際範例
  - 工具中毒機制及「地毯式撤回」攻擊模式
  - 上下文視窗中毒與模型混淆攻擊
- **Microsoft AI 安全解決方案**：完整涵蓋 Microsoft 安全生態系
  - AI 提示盾，包含先進偵測、聚焦與分隔符技巧
  - Azure 內容安全整合模式
  - GitHub 高級安全用於供應鏈保護
- <strong>先進威脅緩解</strong>：詳細安全控制涵蓋
  - 含 MCP 特定攻擊場景的會話劫持及加密會話 ID 要求
  - MCP 代理場景中 Confused Deputy 問題及明確同意要求
  - 令牌傳遞漏洞及強制驗證控制
- <strong>供應鏈安全</strong>：擴展 AI 供應鏈涵蓋，包括基礎模型、嵌入服務、上下文提供者與第三方 API
- <strong>基礎安全</strong>：增強企業安全模式整合，包括零信任架構及 Microsoft 安全生態系
- <strong>資源組織</strong>：依類型（官方文件、標準、研究、Microsoft 解決方案、實作指南）分類全面資源鏈接

### 文件品質改進
- <strong>結構化學習目標</strong>：增強含具體可執行成果的學習目標 
- <strong>交叉參考</strong>：新增相關安全與核心概念主題間連結
- <strong>最新資訊</strong>：更新所有日期與規範鏈接至現行標準
- <strong>實作指導</strong>：在兩部分中新增具體且可執行的實作指南

## 2025年7月16日

### README 與導覽改進
- 完全重新設計 README.md 中的課程導覽
- 用更易使用的表格格式取代 `<details>` 標籤
- 在新 "alternative_layouts" 資料夾中創建替代版面選項
- 新增以卡片、分頁樣式及手風琴樣式為範例的導覽
- 更新儲存庫結構章節，納入最新所有檔案
- 加強「如何使用本課程」章節，含明確建議
- 更新 MCP 規範鏈接，指向正確網址
- 新增課程結構中的「上下文工程」章節（5.14）

### 學習指南更新
- 完全修訂學習指南以符合現有儲存庫結構
- 新增 MCP 客戶端與工具、熱門 MCP 伺服器的新章節
- 更新視覺課程地圖，準確反映所有主題
- 增強對進階主題的描述，涵蓋所有專門領域
- 更新案例研究章節，反映實際範例
- 新增此完整變更日誌

### 社群貢獻 (06-CommunityContributions/)
- 新增關於圖像生成 MCP 伺服器的詳細資訊
- 新增在 VSCode 中使用 Claude 的全面章節
- 新增 Cline 終端客戶端設定與使用指引
- 更新 MCP 客戶端章節，納入所有熱門客戶端選項
- 增強貢獻範例，含更精確的程式碼樣本

### 進階主題 (05-AdvancedTopics/)
- 以一致命名組織所有專門主題資料夾
- 新增上下文工程教材與範例
- 新增 Foundry 代理整合文件
- 增強 Entra ID 安全集成文件

## 2025年6月11日

### 初始建立
- 發布了 MCP 初學者課程的首個版本
- 建立了全部 10 個主要章節的基礎結構
- 實作視覺課程地圖以便導覽
- 新增多種程式語言的初始範例專案

### 入門 (03-GettingStarted/)
- 創建首批伺服器實作範例
- 添加入門用戶端開發指引
- 包含 LLM 用戶端整合說明
- 新增 VS Code 整合文件
- 實作 Server-Sent Events (SSE) 伺服器範例

### 核心概念 (01-CoreConcepts/)
- 新增客戶端-伺服器架構的詳細說明
- 建立關鍵協議元件的文件
- 紀錄 MCP 中的訊息模式

## 2025年5月23日

### 儲存庫結構
- 以基本資料夾結構初始化儲存庫
- 為每個主要章節建立 README 文件
- 設立翻譯基礎建設
- 新增圖片資產和圖表

### 文件
- 建立課程概述的初始 README.md
- 新增 CODE_OF_CONDUCT.md 和 SECURITY.md
- 設立 SUPPORT.md，提供求助指南
- 建立初步學習指南架構

## 2025年4月15日

### 規劃與框架
- 為 MCP 初學者課程進行初步規劃
- 定義學習目標與目標受眾
- 勾勒課程的十章結構
- 開發範例與案例研究的概念框架
- 創建關鍵概念的初始原型範例

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->