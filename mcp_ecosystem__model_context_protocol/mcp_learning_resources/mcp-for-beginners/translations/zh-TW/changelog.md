# 版本更新紀錄：MCP 初學者課程

此文件作為 Model Context Protocol (MCP) 初學者課程所有重大變更的紀錄。變更依時間倒序排列（最新變更在前）。

## 2026 年 6 月 16 日

### MCP 規格對齊與範例驗證

根據目前的 **MCP 規格 2025-11-25** 以及最新官方 SDK 驗證課程，修正剩餘過時的規格引用，並確認核心範例仍能成功編譯與執行。

#### 規格版本修正（2025-06-18 / 2025-03-26 → 2025-11-25）

更新仍聲稱較老版本為 *目前/最新* 標準的英文內容，並重新指向標準的 `modelcontextprotocol.io` 規格路徑：
- **05-AdvancedTopics/mcp-security/README.md**：更新「目前標準」橫幅、簡介、核心安全原則標題、必需要求標題、Microsoft Entra ID 區段、參考與資源連結，及安全結語通知（8 個引用）至 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**：更新額外資源規格連結及「目前標準」橫幅至 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**：用目前的 2025-11-25 安全最佳實踐頁面替換過時的 `2025-03-26 security-and-trust` 連結
- **03-GettingStarted/14-sampling/README.md**：更新官方取樣文件連結至 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**：更新現在時態的「目前 MCP 規格」引用及額外資源規格連結至 2025-11-25（歷史 SSE 廢止註記保持準確）

#### 依目前 SDK 驗證範例

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**：`npm install` 解析出 `@modelcontextprotocol/sdk@1.29.0`；`tsc --noEmit` 無類型錯誤 — 現有的 `McpServer`/`StdioServerTransport` API 仍有效
- **Python (03-GettingStarted/01-first-server/solution/python)**：在隔離 `.venv` 使用 `mcp[cli]` 1.27.2 驗證；`py_compile` 通過且 `FastMCP.list_tools()` 正確回傳 `add` 和 `subtract` 工具
- 確認所有範例 `@modelcontextprotocol/sdk` 版本範圍（`>=1.26.0`／`^1.26.0`／`^1.27.0`）均能順利解析到目前的 `1.29.0`，沒有破壞 API 變更

#### 依賴版本調整（修補版本差距）

調整過時的 SDK 版本別，使每個範例都追蹤目前 MCP 發行版，符合整個倉庫的慣例：
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**：將 `@modelcontextprotocol/sdk` 從 `^1.8.0` 調升至 `>=1.26.0`，並將過時的 `"updated for MCP 2025-06-18"` 套件描述更新為 `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** 及 **lab4/code/github_mcp_server/pyproject.toml**：將精確依賴 `mcp==1.23.0` 調整為 `mcp>=1.26.0`；重新生成兩個 `uv.lock` 鎖定檔（`uv lock`），使鎖定檔解析至目前的 `mcp 1.27.2`，並與清單保持同步

#### 課程差距分析 — 最新規格功能覆蓋

確認課程已涵蓋 MCP 2025-11-25 中所有新增／擴充的原語，無內容遺漏：
- **取樣 (Sampling)**：課程 03-GettingStarted/14-sampling 以及 05-AdvancedTopics/mcp-sampling
- **誘導 (含 URL 模式)**：文件在 01-CoreConcepts 及 05-AdvancedTopics/mcp-protocol-features 中說明
- **根 (Roots)**：文件在 00-Introduction、01-CoreConcepts 與 05-AdvancedTopics/mcp-root-contexts 中說明
- **任務 (Tasks，實驗性、長時間執行操作)**：文件在 01-CoreConcepts 及 05-AdvancedTopics/mcp-protocol-features 中說明
- <strong>工具註解</strong> (`readOnlyHint` / `destructiveHint`)：文件在 01-CoreConcepts 與 05-AdvancedTopics/mcp-protocol-features 中說明

### 安全強化與依賴漏洞修復

針對所有依賴清單及範例原始程式碼執行完整安全掃描，修復所有報告的 npm 警示及一處程式碼層級問題。修復完成後，所有掃描目錄中的 `npm audit` 報告都為 **0 個漏洞**。

#### npm 依賴漏洞（間接依賴）— 已修正

審核所有 15 個提交中的 `package-lock.json`。漏洞限於 MCP Inspector 開發工具、OpenAI 用戶端及 MCP SDK 拉入的間接依賴；現已完全解決且未破壞範例：
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** 及 **lab3/code/weather_mcp/inspector**：將 `@modelcontextprotocol/inspector` 從 (`0.16.6` / `0.14.1`) 調升至 `0.22.0`，清除綁定的 `ajv`、`brace-expansion`、`diff`、`path-to-regexp` 與 `ws` 警示。新增 npm `overrides` 條目強制使用修補版 `shell-quote@1.8.4`，消除由 `concurrently` 拉入的最後一個關鍵警示；重新生成兩個鎖定檔（目前 0 漏洞）
- **03-GettingStarted/samples/typescript**：執行 `npm audit fix` 更新中介 `qs`（中度）為修補版本
- **03-GettingStarted/samples/javascript**：執行 `npm audit fix` 更新中介 `hono`（中度）為修補版本
- **03-GettingStarted/03-llm-client/solution/typescript**：執行 `npm audit fix` 更新中介 `form-data`（高風險）為修補版本
- **03-GettingStarted/11-simple-auth/solution/typescript**：產生缺失的 `package-lock.json`，使專案可重現且可審核（0 漏洞）

#### 程式碼層級安全修復（OWASP A03：注入）

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**：移除 `open_in_vscode` 工具中的 `shell=True`。先前的 `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` 允許資料夾路徑中的 shell 元字元經由 `cmd.exe` 解譯（命令注入向量）。現改為直接啟動解析後的 `Code.exe` 並以資料夾作為參數 — 無 shell，功能等效且安全

#### Python 依賴審查

- 使用 `pip-audit` 審核所有 Python 需求集。`05-AdvancedTopics` 與 `03-GettingStarted/samples/python` 報告 <strong>無已知漏洞</strong>（其 `mcp` / `httpx` / `pydantic` / `python-dotenv` 範圍解析至目前修補版）
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**：`pip-audit` 標示間接依賴 **`werkzeug` 3.1.1** 含三個 `safe_join` Windows 裝置名稱 DoS 警示 — `CVE-2025-66221`、`CVE-2026-21860` 和 `CVE-2026-27199`（均於 3.1.6 修復）。新增明確安全版本限制 `werkzeug>=3.1.6`，確保解析出修補版；並驗證此限制與 `chainlit` / `mcp` / `semantic-kernel` 堆疊乾淨相容

### 產品名稱重塑

更新所有課程內容反映微軟產品重新命名：

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**：更新 Discord 社群連結
- **AGENTS.md**：更新 Discord 伺服器參考
- **README.md**：更新技術生態系參考
- **study_guide.md**：更新案例研究參考
- **05-AdvancedTopics/README.md**：更新模組 5.13 標題與描述
- **05-AdvancedTopics/mcp-integration/README.md**：更新章節標題與描述
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**：全面更新模組標題與內容
- **05-AdvancedTopics/mcp-security-entra/README.md**：更新交叉參考連結
- **07-LessonsfromEarlyAdoption/README.md**：更新案例研究參考
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**：更新第 9 節標題、徽章與能力
- **08-BestPractices/README.md**：更新 Discord 社群連結
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**：更新 Discord 頻道參考
- **09-CaseStudy/docs-mcp/solution/python/README.md**：更新模型部署參考
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**：更新 AI 服務表格
- **11-MCPServerHandsOnLabs/03-Setup/README.md**：更新資源參考

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**：更新主要課程參考
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**：更新模組標題、概覽及所有模組標頭
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**：更新標題、學習目標、設定說明及資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**：更新標題、學習目標、MCP 主機清單及交叉參考
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**：更新標題、徽章、前置條件及資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**：更新 Agent Builder 參考及回饋連結
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**：更新前置條件及擴充套件參考

---

## 2026 年 4 月 11 日

### 新課程、文件修正與依賴更新

#### 新增課程內容

**模組 05 - 進階主題**
- **課程 5.17：使用 MCP 的敵對多代理推理** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`)：新增全面指南，涵蓋多代理系統的敵對辯論模式
  - Mermaid 架構圖：兩個代理 → 共用 MCP 伺服器 → 辯論記錄 → 裁判 → 判決
  - 使用 Python 與 TypeScript 實作的共用 MCP 工具伺服器（`web_search` + `run_python`）
  - 對立系統提示（支持／反對／裁判），明確工具使用要求
  - 輪次管理與論點路由的辯論組織者，以 Python、TypeScript 及 C# 實作
  - 辯論組織者中 MCP `ClientSession` 與實際工具呼叫之連接
  - 使用案例表（幻覺偵測、威脅建模、API 設計審查、事實驗證、技術選擇）
  - 安全考量：沙盒執行、工具調用驗證、速率限制、稽核日誌
  - 結構化練習三個實際場景（程式碼審查、架構決策、內容審核）

#### 文件修正

**模組 03 - 入門**
- **05-stdio-server/README.md**：修正不完整的 TypeScript stdio 伺服器範例 — 補足缺失的傳輸項目化（`new StdioServerTransport()`）及 `server.connect(transport)` 呼叫，與同段落的 Python 及 .NET 範例對應
- **14-sampling/README.md**：修正錯字 — `"Sampling is an davanced features"` 改為 `"Sampling is an advanced feature"`

#### 課程更新

**主 README.md**
- 在課程表新增 5.17 條目（使用 MCP 的敵對多代理推理），提供新課程直接連結

**05-AdvancedTopics/README.md**
- 在課程表列新增課程 5.17 的一行

**study_guide.md**
- 在心智圖與進階主題的散文描述中新增敵對多代理推理主題

#### 程式碼與安全修復

**模組 05 - 敵對代理 (`mcp-adversarial-agents`)**
- **安全修復 — 命令注入**：在 TypeScript 的 `run_python` 工具中，以 `execFile` + `promisify` 取代 `execSync` 的 shell 字串插入，消除命令注入風險（LLM 控制的代碼改作為字面 argv 元素傳遞，無 shell 參與）
- **MCP 工具迴圈接線**：更新 Python 討論調度器改用 `AsyncAnthropic` 用戶端（取代阻塞同步的 `Anthropic`），直接在每個代理回合傳遞活動的 `ClientSession`，每回合透過 `session.list_tools()` 獲取工具定義，並在迴圈中使用 `session.call_tool()` 派送 `tool_use` 區塊，直到模型發出最終文字回應

#### 依賴更新

- 將多個套件（03-GettingStarted、04-PracticalImplementation、10-StreamliningAIWorkflows）中的 `hono` 升級至 4.12.12
- 將 TypeScript 套件中的 `@hono/node-server` 從 1.19.11 升級至 1.19.13
- 將 Python 套件中（10-StreamliningAIWorkflows 實驗室 3 和 4）的 `cryptography` 從 46.0.5 升級至 46.0.7
- 將 10-StreamliningAIWorkflows inspector 的 `lodash` 從 4.17.23 升級至 4.18.1

#### 翻譯

- 同步 48 種以上語言的翻譯，跟上最新原始碼變更（i18n 更新）

---

## 2026 年 2 月 5 日

### 全存儲庫驗證與導覽改進

#### 新增課程內容

**模組 03 - 入門指南**
- **12-mcp-hosts/README.md**：新增 MCP 主機設置綜合指南
  - Claude Desktop、VS Code、Cursor、Cline、Windsurf 配置範例
  - 所有主要主機的 JSON 配置範本
  - 傳輸類型比較表（stdio、SSE/HTTP、WebSocket）
  - 常見連線問題故障排除
  - 主機配置安全最佳實踐

- **13-mcp-inspector/README.md**：新增 MCP Inspector 除錯指南
  - 安裝方法（npx、npm 全域安裝、從原始碼）
  - 透過 stdio 和 HTTP/SSE 連結伺服器
  - 測試工具、資源與提示工作流程
  - MCP Inspector 在 VS Code 的整合
  - 常見除錯情境與解決方案

**模組 04 - 實務應用**
- **pagination/README.md**：新增分頁實作指南
  - Python、TypeScript、Java 的游標分頁模式
  - 用戶端分頁處理
  - 游標設計策略（不透明與結構化）
  - 性能優化建議

**模組 05 - 進階主題**
- **mcp-protocol-features/README.md**：新增協議功能深入介紹
  - 進度通知實作
  - 請求取消模式
  - 含 URI 範本的資源模板
  - 伺服器生命週期管理
  - 日誌等級控管
  - 搭配 JSON-RPC 代碼的錯誤處理模式

#### 導覽修正（更新超過 24 個檔案）

**主要模組 README**
 現在同時連結到首堂與下一模組

**02-Security 子檔案**
- 所有 5 個補充安全文件皆新增「下一步」導覽：

**09-案例研究檔案**
- 所有案例研究檔案均新增順序導覽：

**10-StreamliningAI 實驗室**
在模組 10 總覽與模組 11 新增「下一步」區段

#### 程式碼與內容修正

**SDK 與依賴更新**
修正空白的 openai 版本為 `^4.95.0`
SDK 從 `^1.8.0` 更新至 `>=1.26.0`
mcp 版本釘選更新至 `>=1.26.0`

<strong>程式碼修正</strong>
修正錯誤模型名稱 `gpt-4o-mini` 改為 `gpt-4.1-mini`

<strong>內容修正</strong>
修正破損連結 `READMEmd` → `README.md`，修正課程標題 `Module 1-3` → `Module 0-3`，修正大小寫路徑
移除損壞的重複案例研究 5 內容

<strong>初學者指引改良</strong>
新增適當的介紹、學習目標與先決條件給初學者

#### 課程更新

**主要 README.md**
- 新增課程表條目 3.12（MCP Hosts）、3.13（MCP Inspector）、4.1（Pagination）、5.16（Protocol Features）

**模組 README**
新增課程 12 與 13 至課程清單
新增分頁連結到實務指南區段
新增課程 5.15（自訂傳輸）與 5.16（協議功能）

**study_guide.md**
- 更新心智圖，加入所有新主題：MCP 主機設置、MCP Inspector、分頁策略、協議功能深入

## 2026 年 1 月 28 日

### MCP 規範 2025-11-25 遵循審查

#### 核心概念增強（01-CoreConcepts/）
- **新增客戶端原語 - Roots**：新增完整文件說明 Roots 客戶端原語，使伺服器能理解檔案系統邊界和存取權限
- <strong>工具註解</strong>：新增工具行為註解文件（`readOnlyHint`、`destructiveHint`），促進更佳的工具執行判斷
- <strong>取樣中工具調用</strong>：更新取樣說明，包含 `tools` 和 `toolChoice` 參數，以便在取樣請求中模型驅動調用工具
- **URL 模式誘發**：新增伺服器啟動外部網頁互動的 URL 誘發文件
- **任務（實驗性）**：新增實驗性任務功能說明，用於持久化執行包裝器與延遲結果檢索
- <strong>圖示支援</strong>：說明工具、資源、資源模板及提示可包含圖示作為額外元資料

#### 文件更新
- **README.md**：新增 MCP 規範 2025-11-25 版本參考與日期版本說明
- **study_guide.md**：更新課程圖，涵蓋任務與工具註解於核心概念區；更新文件時間戳

#### 規範遵循驗證
- <strong>協議版本</strong>：確認所有文件皆參考最新 MCP 規範 2025-11-25
- <strong>架構一致</strong>：確認雙層架構（資料層 + 傳輸層）文件正確
- <strong>原語文件</strong>：驗證伺服器原語（資源、提示、工具）及客戶端原語（取樣、誘發、日誌、Roots）文件準確
- <strong>傳輸機制</strong>：確認 STDIO 和可串流 HTTP 傳輸文件正確
- <strong>安全指引</strong>：確認與最新 MCP 安全最佳實踐文件一致

#### 主要 MCP 2025-11-25 功能說明
- **OpenID Connect 探索**：認證伺服器透過 OIDC 探索
- **OAuth Client ID 元資料文件**：推薦的客戶端註冊機制
- **JSON Schema 2020-12**：MCP 架構定義的預設語法
- **SDK 分層系統**：正式規範 SDK 功能支援與維護需求
- <strong>治理架構</strong>：正式化 MCP 工作群組與利益群組治理

### 安全文件重大更新（02-Security/）

#### MCP 安全峰會工作坊（Sherpa）整合
- <strong>新增實戰訓練資源</strong>：在所有安全文件中新增與 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 的完整整合
- <strong>探險路線涵蓋</strong>：記錄從基地營到峰會全路線的營地進展
- **OWASP 一致性**：所有安全指導現在對應到 OWASP MCP Azure 安全指南風險

#### OWASP MCP Top 10 整合
- <strong>新增區段</strong>：在主安全 README 中新增 OWASP MCP Top 10 安全風險表與 Azure 緩解措施
- <strong>風險導向文件</strong>：更新 mcp-security-controls-2025.md，針對各安全領域加上 OWASP MCP 風險參考
- <strong>參考架構</strong>：連結 OWASP MCP Azure 安全指南的參考架構與實作範例

#### 更新安全檔案
- **README.md**：新增 Sherpa 工作坊概覽、探險路線表、OWASP MCP Top 10 風險摘要及實戰訓練區段
- **mcp-security-controls-2025.md**：更新至 2026 年 2 月，加上 OWASP 風險（MCP01-MCP08）參考，修正規範版本不一致
- **mcp-security-best-practices-2025.md**：新增 Sherpa 與 OWASP 資源區段，更新時間戳
- **mcp-best-practices.md**：新增 Sherpa 與 OWASP 連結實戰訓練區段
- **azure-content-safety-implementation.md**：新增 OWASP MCP06 參考、Sherpa 營地 3 一致性與額外資源區段

#### 新增資源連結
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- 個別 OWASP MCP 風險頁面（MCP01-MCP10）

### 課程全域 MCP 規範 2025-11-25 一致性

#### 模組 03 - 入門指南
- **SDK 文件**：將 Go SDK 加入官方 SDK 清單；更新所有 SDK 參考以符合 MCP 規範 2025-11-25
- <strong>傳輸說明</strong>：更新 STDIO 與 HTTP 串流傳輸描述，附加明確規範引用

#### 模組 04 - 實務應用
- **SDK 更新**：新增 Go SDK；SDK 清單加上規範版本參考
- <strong>授權規範</strong>：更新 MCP 授權規範連結至最新 2025-11-25 版本

#### 模組 05 - 進階主題
- <strong>新功能</strong>：新增關於 MCP 規範 2025-11-25 新功能（任務、工具註解、URL 模式誘發、Roots）的說明
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 與 Sherpa 工作坊連結至附加參考

#### 模組 06 - 社群貢獻
- **SDK 清單**：新增 Swift 與 Rust SDK；更新規範連結至 2025-11-25
- <strong>規範參考</strong>：更新 MCP 規範連結指向正式規範 URL

#### 模組 07 - 早期採用經驗
- <strong>資源更新</strong>：新增 MCP 規範 2025-11-25 連結與 OWASP MCP Top 10 至附加資源

#### 模組 08 - 最佳實踐
- <strong>規範版本</strong>：更新 MCP 規範參考至 2025-11-25
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 與 Sherpa 工作坊至附加參考

#### 模組 10 - 精簡 AI 工作流程
- <strong>徽章更新</strong>：將 MCP 版本徽章由 SDK 版本（1.9.3）改為規範版本（2025-11-25）
- <strong>資源連結</strong>：更新 MCP 規範連結；新增 OWASP MCP Top 10

#### 模組 11 - MCP 伺服器實作實驗室
- <strong>規範參考</strong>：更新 MCP 規範連結至 2025-11-25 版本
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 至官方資源

## 2025 年 12 月 18 日

### 安全文件更新 - MCP 規範 2025-11-25

#### MCP 安全最佳實踐（02-Security/mcp-best-practices.md）- 規範版本更新
- <strong>協議版本更新</strong>：更新為最新 MCP 規範 2025-11-25（2025 年 11 月 25 日發佈）
  - 將所有規範版本參考從 2025-06-18 改為 2025-11-25
  - 文件日期參考從 2025 年 8 月 18 日改為 2025 年 12 月 18 日
  - 驗證所有規範 URL 指向最新文件
- <strong>內容驗證</strong>：全面檢視安全最佳實踐是否符合最新標準
  - <strong>微軟安全方案</strong>：確認 Prompt Shields（先前稱「Jailbreak 風險偵測」）、Azure Content Safety、Microsoft Entra ID 與 Azure Key Vault 的術語及連結更新
  - **OAuth 2.1 安全性**：確保與最新 OAuth 安全最佳實踐一致
  - **OWASP 標準**：確認 LLMs OWASP Top 10 參考仍然有效
  - **Azure 服務**：核驗所有 Microsoft Azure 文件連結及最佳實踐
- <strong>標準符合度</strong>：所有引用的安全標準均為最新
  - NIST 人工智慧風險管理框架
  - ISO 27001:2022
  - OAuth 2.1 安全最佳實踐
  - Azure 安全與合規框架
- <strong>實作資源</strong>：核驗所有實作指南連結與資源
  - Azure API 管理身份驗證模式
  - Microsoft Entra ID 整合指南
  - Azure Key Vault 秘密管理
  - DevSecOps 管線與監控解決方案

### 文件品質保證
- <strong>規範遵行</strong>：確保所有 MCP 安全要求（必須/禁止）與最新規範一致
- <strong>資源新鮮度</strong>：核對所有外部連結指向 Microsoft 文件、安全標準及實作指南
- <strong>最佳實踐涵蓋</strong>：確認全面涵蓋身份驗證、授權、人工智慧專屬威脅、供應鏈安全及企業模式

## 2025 年 10 月 6 日

### 入門區新增章節 – 進階伺服器使用與簡易驗證

#### 進階伺服器使用（03-GettingStarted/10-advanced）
- <strong>新增章節</strong>：推出全面 MCP 進階伺服器使用指南，涵蓋規則與低階伺服器架構。
  - <strong>規則伺服器與低階伺服器</strong>：詳細比較並提供 Python 與 TypeScript 範例程式碼
  - <strong>基於處理器設計</strong>：說明以 handler 為核心的工具/資源/提示管理，促進具擴展性與彈性的伺服器實作
  - <strong>實務模式</strong>：探討低階伺服器模式在進階功能與架構中的實際應用場合
#### 簡易認證 (03-GettingStarted/11-simple-auth)
- <strong>新增章節</strong>：逐步指導在 MCP 伺服器中實作簡易認證。
  - <strong>認證概念</strong>：清楚說明身份驗證與授權，以及憑證處理。
  - <strong>基本認證實作</strong>：Python (Starlette) 與 TypeScript (Express) 中基於中介軟體的認證模式，附程式碼範例。
  - <strong>進階安全性導引</strong>：從簡易認證啟動，逐步進階至 OAuth 2.1 與 RBAC，並附有進階安全模組參考。

這些新增內容提供實務操作指引，幫助打造更健全、安全且彈性的 MCP 伺服器實作，銜接基礎概念與進階生產模式。

## 2025年9月29日

### MCP 伺服器資料庫整合實驗室 - 完整實務學習路徑

#### 11-MCPServerHandsOnLabs - 全新完整資料庫整合課程
- **13堂完整實務課程**：新增以 PostgreSQL 資料庫整合的生產等級 MCP 伺服器建構全套實務課程
  - <strong>實務案例</strong>：Zava Retail 分析用例展示企業級樣板
  - <strong>結構化學習進程</strong>：
    - **課程 00-03：基礎** — 介紹、核心架構、安全性與多租戶、環境設置
    - **課程 04-06：MCP 伺服器建置** — 資料庫設計與結構、MCP 伺服器實作、工具開發  
    - **課程 07-09：進階功能** — 語意搜尋整合、測試與除錯、VS Code 整合
    - **課程 10-12：生產與最佳實務** — 部署策略、監控與可觀測性、最佳實務與優化
  - <strong>企業技術</strong>：FastMCP 框架、PostgreSQL 搭配 pgvector、Azure OpenAI 向量嵌入、Azure Container Apps、Application Insights
  - <strong>進階功能</strong>：列級安全 (RLS)、語意搜尋、多租戶資料存取、向量嵌入、即時監控

#### 術語標準化 - 模組改為實驗室
- <strong>全面文件更新</strong>：系統性更新 11-MCPServerHandsOnLabs 所有 README 檔，改用「Lab」術語替代「Module」
  - <strong>章節標題</strong>：將「本模組涵蓋內容」更新為「本實驗涵蓋內容」於全部13堂課
  - <strong>內容描述</strong>：將「本模組提供...」改成「本實驗提供...」於文件全文
  - <strong>學習目標</strong>：將「本模組結束時...」改為「本實驗結束時...」 
  - <strong>導覽連結</strong>：將所有「Module XX:」引用改為「Lab XX:」於交叉參考與導航
  - <strong>完成追蹤</strong>：將「完成本模組後...」改稱「完成本實驗後...」
  - <strong>保留技術參考</strong>：維持 Python 模組名稱於設定檔（例如 `"module": "mcp_server.main"`）

#### 學習指南增強 (study_guide.md)
- <strong>視覺課程地圖</strong>：新增「11. 資料庫整合實驗室」章節，附完整實驗結構視覺化
- <strong>儲存庫結構</strong>：由十個主要區塊增為十一個，詳述 11-MCPServerHandsOnLabs
- <strong>學習路徑指引</strong>：增強導覽指示涵蓋 00-11 區塊
- <strong>技術涵蓋</strong>：新增 FastMCP、PostgreSQL、Azure 服務整合細節
- <strong>學習成果</strong>：強調生產就緒伺服器開發、資料庫整合範式與企業安全

#### 主要 README 結構強化
- <strong>實驗室術語統一</strong>：更新 11-MCPServerHandsOnLabs 主 README.md 持續使用「Lab」結構
- <strong>學習路徑組織</strong>：自基礎概念至進階實作再到生產部署的清楚進程
- <strong>實務聚焦</strong>：強調實務操作與企業級樣板與技術

### 文件品質與一致性改進
- <strong>實作導向強化</strong>：全線文件突顯手把手實驗路線
- <strong>企業模式聚焦</strong>：展示生產就緒實作與企業安全考量
- <strong>技術整合</strong>：完整涵蓋現代 Azure 服務與 AI 整合範式
- <strong>學習進程</strong>：基礎到生產部署明確、結構化路徑

## 2025年9月26日

### 案例研究強化 - GitHub MCP 登錄整合

#### 案例研究 (09-CaseStudy/) - 生態系統發展聚焦
- **README.md**：大幅擴充，增添全面 GitHub MCP 登錄案例研究
  - **GitHub MCP 登錄案例研究**：全新詳盡研究，檢視 GitHub 2025年9月 MCP 登錄啟動
    - <strong>問題分析</strong>：細緻探討分散 MCP 伺服器發現與部署挑戰
    - <strong>解決架構</strong>：GitHub 集中式登錄，與一鍵 VS Code 安裝方案
    - <strong>商業影響</strong>：提升開發者入門與生產力的量化成效
    - <strong>策略價值</strong>：模組化代理部署與跨工具互操作重點
    - <strong>生態系統發展</strong>：定位為代理系統整合基礎平台
  - <strong>案例研究結構強化</strong>：更新七個案例研究，統一格式並全面敘述
    - Azure AI 旅遊代理：多代理協同重點
    - Azure DevOps 整合：工作流程自動化聚焦
    - 即時文件擷取：Python 主控台用戶端實作
    - 互動式學習計畫產生器：Chainlit 交談式網頁應用
    - 編輯器內文件：VS Code 與 GitHub Copilot 整合
    - Azure API 管理：企業 API 整合範式
    - GitHub MCP 登錄：生態系統及社群平台建設
  - <strong>全面結論</strong>：重寫結論段落，展現涵蓋七個案例多維度 MCP 實作
    - 企業整合、多代理協同、開發者生產力
    - 生態系統發展、教育應用分類
    - 深入架構樣式、實作策略與最佳實務
    - 強調 MCP 為成熟、可生產使用協定

#### 學習指南更新 (study_guide.md)
- <strong>視覺課程地圖</strong>：更新心智圖，新增 GitHub MCP 登錄於案例研究區塊
- <strong>案例研究描述</strong>：由泛泛之論增補為七個完整案例如實打實細節
- <strong>儲存庫結構</strong>：修訂第10區塊，反映全面案例研究及具體實作細節
- <strong>變更日誌整合</strong>：新增 2025年9月26日條目，記錄 GitHub MCP 登錄新增與案例強化
- <strong>日期更新</strong>：更新頁尾時間戳，為最新修訂(2025年9月26日)

### 文件品質改進
- <strong>一致性增強</strong>：七個案例格式與結構標準化
- <strong>全面涵蓋</strong>：案例涵括企業整合、開發者生產力及生態系統發展場景
- <strong>策略定位</strong>：強化 MCP 作為代理系統部署基礎平台
- <strong>資源整合</strong>：額外資源新增 GitHub MCP 登錄連結

## 2025年9月15日

### 進階主題擴充 - 自訂傳輸與上下文工程

#### MCP 自訂傳輸 (05-AdvancedTopics/mcp-transport/) - 全新進階實作指南
- **README.md**：自訂 MCP 傳輸機制完整實作指引
  - **Azure Event Grid 傳輸**：詳盡無伺服器事件驅動傳輸實作
    - C#、TypeScript 與 Python 範例，整合 Azure Functions
    - 可擴展 MCP 解決方案的事件驅動架構模式
    - Webhook 接收器及推送訊息機制
  - **Azure Event Hubs 傳輸**：高吞吐串流傳輸實作
    - 低延遲即時串流能力
    - 分區策略與檢查點管理
    - 訊息批次處理與效能優化
  - <strong>企業整合範式</strong>：生產就緒架構範例
    - 多 Azure Functions 分散式 MCP 處理
    - 混合傳輸架構結合多種傳輸型態
    - 訊息持久性、可靠性與錯誤處理策略
  - <strong>安全與監控</strong>：Azure Key Vault 整合與可觀測性
    - 託管身分驗證與最小權限存取
    - Application Insights 遙測與效能監控
    - 斷路器與容錯模式
  - <strong>測試框架</strong>：自訂傳輸全面測試策略
    - 使用測試替身與模擬框架的單元測試
    - Azure 測試容器整合測試
    - 效能與負載測試考量

#### 上下文工程 (05-AdvancedTopics/mcp-contextengineering/) - 新興 AI 領域
- **README.md**：徹底探討上下文工程作為新興領域
  - <strong>核心原則</strong>：完整上下文共享、行為決策覺察、上下文視窗管理
  - **MCP 協定對齊**：MCP 設計如何應對上下文工程挑戰
    - 上下文視窗限制與漸進加載策略
    - 關聯性判斷與動態上下文擷取
    - 多模態上下文處理與安全考量
  - <strong>實作方法</strong>：單執行緒與多代理架構
    - 上下文切片與優先排序技巧
    - 漸進式上下文加載與壓縮策略
    - 分層上下文方法與擷取優化
  - <strong>衡量框架</strong>：評估上下文有效性的新興指標
    - 輸入效率、效能、品質與使用者體驗考量
    - 上下文優化的實驗性方法
    - 故障分析與改進方法論

#### 課程導覽更新 (README.md)
- <strong>模組結構增強</strong>：課程表新增進階主題
  - 新增上下文工程 (5.14) 與自訂傳輸 (5.15)
  - 各模組統一格式與導覽連結
  - 描述更新反映當前內容範圍

### 目錄結構改善
- <strong>命名標準化</strong>：將「mcp transport」更名為「mcp-transport」，與其他進階主題資料夾保持一致
- <strong>內容組織</strong>：所有 05-AdvancedTopics 資料夾採用一致命名規則 (mcp-[topic])

### 文件品質強化
- **MCP 規格對齊**：所有新內容參照 MCP Specification 2025-06-18
- <strong>多語言範例</strong>：提供 C#、TypeScript 與 Python 全面程式碼範例
- <strong>企業聚焦</strong>：整體貫穿生產就緒模式與 Azure 雲端整合
- <strong>視覺文件化</strong>：使用 Mermaid 圖示架構與流程視覺化

## 2025年8月18日

### 文件全面更新 - MCP 2025-06-18 規範

#### MCP 安全最佳實務 (02-Security/) - 完全現代化
- **MCP-SECURITY-BEST-PRACTICES-2025.md**：依 MCP Specification 2025-06-18 重寫
  - <strong>強制要求</strong>：加入官方規範明確 MUST/MUST NOT 規定，附清楚視覺標示
  - **12 大核心安全實務**：從15點條列重組為全面安全領域
    - 令牌安全與身份驗證（含外部身份提供商整合）
    - 會話管理與傳輸安全（含密碼學需求）
    - AI 特定威脅防護（整合 Microsoft Prompt Shields）
    - 存取控制與權限（最小權限原則）
    - 內容安全與監控（Azure Content Safety 整合）
    - 供應鏈安全（全面元件驗證）
    - OAuth 安全與錯誤代理防範（PKCE 實作）
    - 事件應變與復原（自動化能力）
    - 合規性與治理（符合法規對齊）
    - 進階安全控管（零信任架構）
    - 微軟安全生態系統整合（全面解決方案）
    - 持續安全演進（自適應實務）
  - <strong>微軟安全解決方案</strong>：加強 Prompt Shields、Azure Content Safety、Entra ID 與 GitHub Advanced Security 整合指引
  - <strong>實作資源</strong>：依官方 MCP 文件、微軟解決方案、安全標準與實作指南分類完整資源連結

#### 進階安全控管 (02-Security/) - 企業實作
- **MCP-SECURITY-CONTROLS-2025.md**：全面改版，企業級安全框架
  - **9 大安全領域**：由基本控管擴展成詳盡企業框架
    - 進階驗證與授權（整合 Microsoft Entra ID）
    - 令牌安全與反透傳控管（全面驗證）
    - 會話安全控管（防劫持）
    - AI 專用安全控管（防範提示注入與工具中毒）
    - 錯誤代理攻擊防範（OAuth 代理安全）
    - 工具執行安全（沙箱與隔離）
    - 供應鏈安全控管（依賴驗證）
    - 監控與偵測控管（SIEM 整合）
    - 事件應變與復原（自動化能力）
  - <strong>實作範例</strong>：加入詳細 YAML 設定區段與程式碼範例
  - <strong>微軟方案整合</strong>：Azure 安全服務、GitHub Advanced Security 與企業身份管理全面涵蓋

#### 進階主題安全 (05-AdvancedTopics/mcp-security/) - 生產就緒實作
- **README.md**：企業安全實作全新改寫
  - <strong>規範對齊</strong>：更新為 MCP Specification 2025-06-18，含強制安全要求
  - <strong>強化認證</strong>：微軟 Entra ID 整合，附 .NET 與 Java Spring Security 全面範例
  - **AI 安全整合**：Microsoft Prompt Shields 與 Azure Content Safety 實作，含詳細 Python 範例
  - <strong>進階威脅緩解</strong>：包含
    - 錯誤代理攻擊防範（PKCE 與使用者同意驗證）
    - 令牌透傳防範（受眾驗證與安全令牌管理）
    - 會話劫持防範（密碼學綁定與行為分析）
  - <strong>企業安全整合</strong>：Azure Application Insights 監控、威脅偵測管線與供應鏈安全
  - <strong>實作檢查清單</strong>：清楚劃分強制與建議安全控管及微軟安全生態系統優勢

### 文件品質與標準對齊
- <strong>規範參考</strong>：更新所有參考至當前 MCP 規範 2025-06-18
- <strong>微軟安全生態系統</strong>：強化所有安全文件中的整合指引
- <strong>實務實作</strong>：新增詳細的 .NET、Java 及 Python 程式範例，包含企業範式
- <strong>資源組織</strong>：全面分類官方文件、安全標準與實作指南
- <strong>視覺指示</strong>：清楚標示強制需求與建議作法


#### 核心概念 (01-CoreConcepts/) - 完整現代化
- <strong>協定版本更新</strong>：更新為引用當前 MCP 規範 2025-06-18，採用基於日期的版本控制（YYYY-MM-DD 格式）
- <strong>架構優化</strong>：強化 Hosts、Clients 與 Servers 的描述，以反映當前 MCP 架構範式
  - Hosts 現已明確定義為協調多個 MCP 用戶端連線的 AI 應用程式
  - Clients 描述為維持一對一伺服器連結的協定連接器
  - Servers 強化在本地與遠端部署情境的說明
- <strong>原語重整</strong>：全面改造伺服器與用戶端原語
  - 伺服器原語：資源（資料來源）、提示（範本）、工具（可執行函式），附詳細說明與範例
  - 用戶端原語：採樣（LLM 完成）、引導（使用者輸入）、記錄（除錯/監控）
  - 依當前發現（`*/list`）、檢索（`*/get`）與執行（`*/call`）方法模式更新
- <strong>協定架構</strong>：引入兩層架構模型
  - 資料層：以 JSON-RPC 2.0 為基礎，包含生命週期管理與原語
  - 傳輸層：STDIO（本地）與可串流 HTTP 含 SSE（遠端）傳輸機制
- <strong>安全框架</strong>：全面的安全原則，包括明確使用者同意、資料隱私保護、工具執行安全與傳輸層安全
- <strong>通訊模式</strong>：更新協定訊息以展現初始化、發現、執行與通知流程
- <strong>程式碼範例</strong>：刷新多語言範例（.NET、Java、Python、JavaScript），反映當前 MCP SDK 範式

#### 安全 (02-Security/) - 全面安全重構  
- <strong>標準一致</strong>：完整符合 MCP 規範 2025-06-18 安全要求
- <strong>認證演進</strong>：記錄從自訂 OAuth 伺服器到外部身份提供者委派（Microsoft Entra ID）的演進
- **AI 特有威脅分析**：增強現代 AI 攻擊向量覆蓋
  - 詳細提示注入攻擊場景與真實案例
  - 工具污染機制與「拔毯子」攻擊模式
  - 上下文視窗污染與模型混淆攻擊
- **微軟 AI 安全解決方案**：全面涵蓋微軟安全生態系統
  - AI 提示防護擋板，含進階檢測、聚焦與分隔符技術
  - Azure 內容安全整合範式
  - GitHub 先進安全供應鏈防護
- <strong>進階威脅緩解</strong>：詳細安全控管
  - MCP 特定攻擊場景的會話劫持及密碼學會話 ID 要求
  - MCP 代理場景中代理混淆問題，附明確同意需求
  - 令牌透傳弱點與強制驗證控管
- <strong>供應鏈安全</strong>：擴展 AI 供應鏈涵蓋基礎模型、嵌入服務、上下文提供者與第三方 API
- <strong>基礎安全</strong>：強化與企業安全範式、零信任架構及微軟安全生態系統整合
- <strong>資源組織</strong>：依類型分類完整資源連結（官方文件、標準、研究、微軟解決方案、實作指南）

### 文件品質改進
- <strong>結構化學習目標</strong>：強化具體且可行的學習成果
- <strong>跨參考</strong>：增設安全與核心概念主題間連結
- <strong>資訊更新</strong>：更新所有日期參考與規範連結至當前標準
- <strong>實作指導</strong>：於兩大章節中新增具體可行的實作指導

## 2025年7月16日

### README 與導覽改進
- 完全重新設計 README.md 中的課程導航
- 以表格格式取代 `<details>` 標籤，提升可及性
- 於新 "alternative_layouts" 資料夾中建立替代版面選項
- 新增卡片式、分頁式與手風琴式導航範例
- 更新儲存庫結構章節，涵蓋所有最新檔案
- 強化「如何使用此課程」章節，附清楚建議
- 更新 MCP 規範連結為正確網址
- 新增上下文工程章節（5.14）至課程結構

### 學習指南更新
- 完全重構學習指南以符合當前儲存庫結構
- 新增 MCP 用戶端與工具，以及熱門 MCP 伺服器章節
- 更新視覺課程地圖以正確反映所有主題
- 強化進階主題說明，覆蓋所有專門領域
- 更新案例研究章節，反映真實範例
- 新增本全面變更記錄

### 社群貢獻 (06-CommunityContributions/)
- 新增詳細 MCP 影像生成伺服器資訊
- 新增在 VSCode 中使用 Claude 的完整章節
- 新增 Cline 終端用戶端設定與使用說明
- 更新 MCP 用戶端章節，涵蓋所有熱門用戶端選項
- 強化貢獻範例，附更精確程式碼範本

### 進階主題 (05-AdvancedTopics/)
- 有系統地整理所有專門主題資料夾並統一命名
- 新增上下文工程教材與範例
- 新增 Foundry 代理整合文件
- 強化 Entra ID 安全整合文件

## 2025年6月11日

### 初版建立
- 發行 MCP 初學者課程的第一個版本
- 建立所有 10 個主要章節的基礎架構
- 實作視覺課程地圖以輔助導航
- 新增多種程式語言的初始範例專案

### 入門 (03-GettingStarted/)
- 實作首批伺服器範例
- 新增用戶端開發指導
- 包含 LLM 用戶端整合說明
- 新增 VS Code 整合文件
- 實作 Server-Sent Events (SSE) 伺服器範例

### 核心概念 (01-CoreConcepts/)
- 新增用戶端－伺服器架構詳細說明
- 製作文檔涵蓋協定主要元件
- 文件化 MCP 訊息模式

## 2025年5月23日

### 儲存庫結構
- 初始化儲存庫，建立基礎資料夾結構
- 為各主要章節建立 README 文件
- 設置翻譯基礎架構
- 新增圖像資產與圖表

### 文件
- 建立初始 README.md，提供課程總覽
- 新增行為守則 CODE_OF_CONDUCT.md 與安全性文件 SECURITY.md
- 設置 SUPPORT.md，提供求助指南
- 初步製作學習指南架構

## 2025年4月15日

### 規劃與架構
- MCP 初學者課程初期規劃
- 定義學習目標與目標受眾
- 制定 10 個章節的課程結構
- 開發範例與案例研究的概念架構
- 製作關鍵概念的初步原型範例

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->