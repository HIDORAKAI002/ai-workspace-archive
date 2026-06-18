# 變更記錄：MCP 入門課程

本文件記錄了「Model Context Protocol (MCP) 入門課程」的所有重要變更。變更以逆時間順序記錄（較新變更在前）。

## 2026 年 6 月 16 日

### MCP 規範對齊與樣本驗證

根據最新 **MCP Specification 2025-11-25** 及官方 SDK 進行課程驗證，修正過時的規範引用，並確認核心範例仍可編譯並執行。

#### 規範版本修正（2025-06-18 / 2025-03-26 → 2025-11-25）

更新仍標示舊版規範為<em>當前/最新</em>標準的英文內容，並將連結改指至正規的 `modelcontextprotocol.io` 規範路徑：
- **05-AdvancedTopics/mcp-security/README.md**：更新「Current Standard」橫幅、介紹、核心安全原則標題、強制性要求標題、Microsoft Entra ID 區段、參考資源連結與結尾安全公告（8 處）為 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**：更新額外資源規範連結與「Current Standard」橫幅為 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**：將過時的 `2025-03-26` 安全與信任連結替換為目前 2025-11-25 安全最佳實務頁面
- **03-GettingStarted/14-sampling/README.md**：更新官方抽樣文件連結為 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**：更新現在式「目前 MCP 規範」引用及額外資源規範連結為 2025-11-25（保留 SSE 停用歷史註解以維持準確性）

#### 現有 SDK 下的樣本驗證

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**：`npm install` 安裝 `@modelcontextprotocol/sdk@1.29.0`；`tsc --noEmit` 無型別錯誤通過 —— 現有的 `McpServer` / `StdioServerTransport` API 繼續有效
- **Python (03-GettingStarted/01-first-server/solution/python)**：透過隔離 `.venv` 並使用 `mcp[cli]` (1.27.2) 驗證；`py_compile` 通過，`FastMCP.list_tools()` 正確返回 `add` 與 `subtract` 工具
- 確認所有樣本的 `@modelcontextprotocol/sdk` 版本範圍 (`>=1.26.0` / `^1.26.0` / `^1.27.0`) 均成功解析到最新 `1.29.0`，且無重大 API 破壞

#### 相依性版本對齊（彌合版本差距）

將過時的 SDK 固定版本調升，使各範例都追蹤最新 MCP 發行版，遵循整個專案約定：
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**：將 `@modelcontextprotocol/sdk` 從 `^1.8.0` 提升至 `>=1.26.0`，並將過時的「updated for MCP 2025-06-18」套件描述更新為「aligned with MCP Specification 2025-11-25」
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** 與 **lab4/code/github_mcp_server/pyproject.toml**：將精確版本 `mcp==1.23.0` 提升為 `mcp>=1.26.0`；重新生成 `uv.lock` 文件（`uv lock`）以使鎖定檔解析到最新 `mcp 1.27.2` 並與清單同步

#### 課程差距分析 — 最新規範功能涵蓋

確認課程已涵蓋 MCP 2025-11-25 新增/擴展的所有原語，無內容缺口：
- <strong>抽樣</strong>：課程 03-GettingStarted/14-sampling 及 05-AdvancedTopics/mcp-sampling
- **引導（含 URL 模式）**：記錄於 01-CoreConcepts 與 05-AdvancedTopics/mcp-protocol-features
- <strong>根範疇</strong>：記錄於 00-Introduction、01-CoreConcepts 及 05-AdvancedTopics/mcp-root-contexts
- **任務（實驗性、長時間運作）**：記錄於 01-CoreConcepts 與 05-AdvancedTopics/mcp-protocol-features
- <strong>工具註解</strong>（`readOnlyHint` / `destructiveHint`）：記錄於 01-CoreConcepts 與 05-AdvancedTopics/mcp-protocol-features

### 安全強化與相依性漏洞修補

對所有相依性清單和範例原始碼進行全面安全掃描，修復所有 npm 安全通知及一項程式碼層級的漏洞。修復後，`npm audit` 在所有掃描目錄中報告 <strong>無漏洞</strong>。

#### npm 相依性漏洞（間接）— 已修復

審查全部 15 個已提交的 `package-lock.json` 文件。漏洞僅限於 MCP Inspector 開發工具、OpenAI 客戶端以及 MCP SDK 引入的間接相依，現在已修復且不破壞範例：
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** 與 **lab3/code/weather_mcp/inspector**：提升 `@modelcontextprotocol/inspector` 版本（`0.16.6` / `0.14.1` → `0.22.0`），已排除包裝的 `ajv`、`brace-expansion`、`diff`、`path-to-regexp` 和 `ws` 等安全通告。新增 npm `overrides` 條目強制採用修補後的 `shell-quote@1.8.4` 以消除由 `concurrently` 帶來的重大安全通告；重新生成鎖定檔（現 0 漏洞）
- **03-GettingStarted/samples/typescript**：執行 `npm audit fix` 更新間接相依 `qs`（中等）至修補版
- **03-GettingStarted/samples/javascript**：執行 `npm audit fix` 更新間接相依 `hono`（中等）至修補版
- **03-GettingStarted/03-llm-client/solution/typescript**：執行 `npm audit fix` 更新間接相依 `form-data`（高）至修補版
- **03-GettingStarted/11-simple-auth/solution/typescript**：生成缺失的 `package-lock.json` 以便專案可重現與審核（0 漏洞）

#### 程式碼層級安全修正（OWASP A03: 注入攻擊）

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**：移除 `open_in_vscode` 工具中的 `shell=True`。之前的 `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` 會使資料夾路徑中的 shell 巨集字元被 `cmd.exe` 解譯（命令注入漏洞）。現在改為直接啟動解析後的 `Code.exe` 並以資料夾參數執行，無需 shell，功能相同且安全

#### Python 相依性審查

- 以 `pip-audit` 審核所有 Python 需求集。`05-AdvancedTopics` 和 `03-GettingStarted/samples/python` 無已知漏洞（其 `mcp` / `httpx` / `pydantic` / `python-dotenv` 範圍可解析為最新修補版本）
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**：`pip-audit` 發現間接相依的 **`werkzeug` 3.1.1** 存在三個 `safe_join` Windows 裝置名稱 DoS 漏洞通告 — `CVE-2025-66221`、`CVE-2026-21860` 和 `CVE-2026-27199`（均已於 3.1.6 修復）。加入明確安全釘選 `werkzeug>=3.1.6` 以解析修補版；並確認此限制可與 `chainlit` / `mcp` / `semantic-kernel` 堆疊正常解析

### 產品名稱重塑

更新所有課程內容以反映 Microsoft 的產品重新命名：

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**：更新 Discord 社群連結
- **AGENTS.md**：更新 Discord 伺服器參考
- **README.md**：更新技術生態系統引用
- **study_guide.md**：更新案例研究引用
- **05-AdvancedTopics/README.md**：更新模組 5.13 標題及描述
- **05-AdvancedTopics/mcp-integration/README.md**：更新章節標題及描述
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**：整個模組標題與內容更新
- **05-AdvancedTopics/mcp-security-entra/README.md**：更新交叉參考連結
- **07-LessonsfromEarlyAdoption/README.md**：更新案例研究引用
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**：更新第 9 章標題、徽章與能力描述
- **08-BestPractices/README.md**：更新 Discord 社群連結
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**：更新 Discord 頻道參考
- **09-CaseStudy/docs-mcp/solution/python/README.md**：更新模型部署引用
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**：更新 AI 服務表格
- **11-MCPServerHandsOnLabs/03-Setup/README.md**：更新資源引用

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**：更新主課程引用
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**：更新模組標題、概要以及所有模組章節標題
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**：更新標題、學習目標、安裝步驟與資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**：更新標題、學習目標、MCP 主機表與交叉引用
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**：更新標題、徽章、先決條件與資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**：更新 Agent Builder 參考與反饋連結
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**：更新先決條件與擴充套件參考

---

## 2026 年 4 月 11 日

### 新課程、文件修正與相依性更新

#### 新增課程內容

**模組 05 - 進階主題**
- **課程 5.17：MCP 的對抗性多代理推理**（`05-AdvancedTopics/mcp-adversarial-agents/README.md`）：全新完整指南，涵蓋多代理系統中的對抗辯論模式
  - Mermaid 架構圖：兩個代理 → 共享 MCP 伺服器 → 辯論稿 → 裁判 → 判決
  - 以 Python 與 TypeScript 實作共享 MCP 工具伺服器（`web_search` + `run_python`）
  - 對立系統提示（支持 / 反對 / 裁判）並明確要求工具使用
  - 以 Python、TypeScript 和 C# 實作的辯論協調者，負責回合管理與路由論點
  - MCP `ClientSession` 為協調者接線到真實工具呼叫
  - 用例表（幻覺檢測、威脅建模、API 設計審查、事實驗證、技術篩選）
  - 安全考量：沙箱執行、工具呼叫驗證、速率限制、稽核紀錄
  - 結構化練習包括三個實務情境（程式碼審查、架構決策、內容審核）

#### 文件修正

**模組 03 - 入門**
- **05-stdio-server/README.md**：修正不完整的 TypeScript stdio 伺服器範例 —— 新增遺漏的傳輸層實例化 (`new StdioServerTransport()`) 和 `server.connect(transport)` 呼叫，以符合同節中 Python 與 .NET 範例
- **14-sampling/README.md**：修正拼字錯誤——由 `"Sampling is an davanced features"` 改為 `"Sampling is an advanced feature"`

#### 課程更新

**主 README.md**
- 課程表新增條目 5.17（MCP 的對抗性多代理推理）並連結新課程

**05-AdvancedTopics/README.md**
- 在課程表新增課程 5.17 行

**study_guide.md**
- 在心智圖與進階主題文字描述中新增對抗性多代理推理主題

#### 程式碼與安全修正

**模組 05 - 對抗代理 (`mcp-adversarial-agents`)**
- **安全修正 — 命令注入**：在 TypeScript 的 `run_python` 工具中，用 `execFile` + `promisify` 取代 `execSync` 的 shell 插值，以消除命令注入風險（LLM 控制的程式碼現以字面 argv 元素形式提供，無 shell 參與）
- **MCP 工具循環連線**：更新 Python 辯論協調器，改用 `AsyncAnthropic` 用戶端（取代阻塞同步的 `Anthropic`），直接將一個活躍的 `ClientSession` 傳遞給每個代理的回合，每回合透過 `session.list_tools()` 獲取工具定義，並在循環中使用 `session.call_tool()` 發送 `tool_use` 區塊，直到模型輸出最終文字回應

#### 依賴更新

- 在多個套件中將 `hono` 升級至 4.12.12（03-GettingStarted、04-PracticalImplementation、10-StreamliningAIWorkflows）
- 在 TypeScript 套件中將 `@hono/node-server` 從 1.19.11 提升到 1.19.13
- 在 Python 套件（10-StreamliningAIWorkflows 實驗室 3 和 4）中將 `cryptography` 從 46.0.5 升級到 46.0.7
- 在 10-StreamliningAIWorkflows inspector 中將 `lodash` 從 4.17.23 升級到 4.18.1

#### 翻譯

- 已同步 48 種以上語言的翻譯，配合最新源碼變更（i18n 更新）

---

## 2026 年 2 月 5 日

### 全儲存庫驗證及導航改進

#### 新增課程內容

**模組 03 - 入門指南**  
- **12-mcp-hosts/README.md**：新增 MCP 主機設定完整指南  
  - Claude Desktop、VS Code、Cursor、Cline、Windsurf 配置範例  
  - 主要主機的 JSON 配置範本  
  - 傳輸類型比較表（stdio、SSE/HTTP、WebSocket）  
  - 常見連線問題排解  
  - 主機設定的安全最佳實踐  

- **13-mcp-inspector/README.md**：新增 MCP Inspector 除錯指南  
  - 安裝方式（npx、npm 全域、原始碼）  
  - 透過 stdio 和 HTTP/SSE 連接伺服器  
  - 測試工具、資源與提示詞工作流程  
  - VS Code 與 MCP Inspector 整合  
  - 常見除錯情境與解決方法  

**模組 04 - 實務實作**  
- **pagination/README.md**：新增分頁實作指南  
  - Python、TypeScript、Java 的基於游標的分頁模式  
  - 客戶端分頁處理  
  - 游標設計策略（不透明 vs. 結構化）  
  - 性能優化建議  

**模組 05 - 進階主題**  
- **mcp-protocol-features/README.md**：新增協定功能深入介紹  
  - 進度通知實作  
  - 請求取消模式  
  - 帶 URI 模式的資源範本  
  - 伺服器生命週期管理  
  - 日誌等級控制  
  - 帶 JSON-RPC 錯誤代碼的錯誤處理模式  

#### 導航修正（更新 24+ 文件）

<strong>主要模組說明文件</strong>  
 現在同時連結至第一課及下一個模組  

**02-Security 子文件**  
- 所有 5 份補充安全文件新增「下一步」導航  

**09-CaseStudy 檔案**  
- 所有案例研究文件新增連續導航  

**10-StreamliningAI 實驗室**  
在模組 10 總覽及模組 11 新增「下一步」部分  

#### 程式碼及內容修正

**SDK 及依賴更新**  
修正空白 openai 版本為 `^4.95.0`  
SDK 從 `^1.8.0` 更新至 `>=1.26.0`  
mcp 版本鎖定改為 `>=1.26.0`  

<strong>程式碼修正</strong>  
修正無效模型 `gpt-4o-mini` 為 `gpt-4.1-mini`  

<strong>內容修正</strong>  
修正斷裂連結 `READMEmd` → `README.md`，修正課程標題 `Module 1-3` → `Module 0-3`，修正大小寫敏感路徑  
移除損毀的重複 Case Study 5 內容  

<strong>初學者指引改進</strong>  
為初學者新增適當介紹、學習目標及先備條件  

#### 課程更新

**主 README.md**  
- 新增課程項目 3.12（MCP Hosts）、3.13（MCP Inspector）、4.1（分頁）、5.16（協定功能）  

**模組 README**  
新增第 12 與 13 課至課程列表  
新增「實務指南」區段並含分頁連結  
新增課程 5.15（自訂傳輸）及 5.16（協定功能）  

**study_guide.md**  
- 更新心智圖加入所有新主題：MCP Hosts 設定、MCP Inspector、分頁策略、協定功能深度探討  

## 2026 年 1 月 28 日

### MCP 規範 2025-11-25 合規審查

#### 核心概念增強 (01-CoreConcepts/)  
- **新增用戶端原語 - Roots**：補充了 Roots 用戶端原語的完整文件，使伺服器能理解檔案系統邊界及存取權限  
- <strong>工具註釋</strong>：新增工具行為註釋 (`readOnlyHint`, `destructiveHint`) 文件，以利更好工具執行決策  
- <strong>取樣中工具呼叫</strong>：更新 Sampling 文件，加入模型驅動工具調用的 `tools` 及 `toolChoice` 參數  
- **URL 模式引導**：新增 URL 基礎引導文件，用於伺服器發起的外部網頁互動  
- **任務(實驗性)**：新增實驗性任務功能區段，說明可持久執行封裝及延後結果取得  
- <strong>圖示支持</strong>：註明工具、資源、資源範本及提示詞現可包含圖示作為附加的元數據  

#### 文件更新  
- **README.md**：新增 MCP 規範 2025-11-25 版本參考及基於日期的版本說明  
- **study_guide.md**：將任務與工具註釋加入核心概念區段的課程地圖；更新文件時間戳  

#### 規範合規驗證  
- <strong>協議版本</strong>：確認所有文件均參考當前 MCP 規範 2025-11-25  
- <strong>架構對齊</strong>：確認雙層架構（資料層 + 傳輸層）文件準確無誤  
- <strong>原語文件</strong>：驗證伺服器原語（資源、提示詞、工具）及用戶端原語（取樣、引導、紀錄、Roots）文件  
- <strong>傳輸機制</strong>：驗證 STDIO 與 Streamable HTTP 傳輸文件準確性  
- <strong>安全指導</strong>：確認與當前 MCP 安全最佳實踐文件相符  

#### MCP 2025-11-25 重要功能記錄  
- **OpenID Connect 發現**：透過 OIDC 進行驗證伺服器發現  
- **OAuth 用戶端 ID元資料文件**：推薦的用戶端註冊機制  
- **JSON Schema 2020-12**：MCP 架構定義的預設方言  
- **SDK 層級系統**：正式化 SDK 功能支援及維護要求  
- <strong>治理結構</strong>：MCP 治理中正式化工作組及利益團體  

### 安全文件重大更新 (02-Security/)

#### MCP 安全峰會工作坊（Sherpa）整合  
- <strong>新增實作訓練資源</strong>：新增與 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 的全面整合於所有安全文件  
- <strong>遠征路線記錄</strong>：涵蓋從基地營到峰頂的完整營地進展  
- **OWASP 對應**：所有安全指導對應至 OWASP MCP Azure 安全指南風險  

#### OWASP MCP 前十大整合  
- <strong>新增章節</strong>：在主要安全 README 中新增 OWASP MCP 前十大安全風險表，含 Azure 緩解措施  
- <strong>風險導向文件</strong>：在 mcp-security-controls-2025.md 中加入每個安全領域對應 OWASP MCP 風險參考  
- <strong>參考架構</strong>：連結至 OWASP MCP Azure 安全指南架構及實作模式  

#### 更新安全文件  
- **README.md**：新增 Sherpa 工作坊概述、遠征路線表、OWASP MCP 前十大風險摘要及實作訓練區段  
- **mcp-security-controls-2025.md**：標題更新至 2026 年 2 月，新增 OWASP 風險參考（MCP01-MCP08），修正規範版本不一致  
- **mcp-security-best-practices-2025.md**：新增 Sherpa 與 OWASP 資源區塊，更新時間戳  
- **mcp-best-practices.md**：新增實作訓練區，含 Sherpa 及 OWASP 連結  
- **azure-content-safety-implementation.md**：新增 OWASP MCP06 參考、Sherpa 營地 3 對齊及其他資源區段  

#### 新增資源連結  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- 個別 OWASP MCP 風險頁面（MCP01-MCP10）  

### 全課程符合 MCP 規範 2025-11-25

#### 模組 03 - 入門指南  
- **SDK 文件**：新增 Go SDK 至官方 SDK 名單；更新所有 SDK 參考，符合 MCP 規範 2025-11-25  
- <strong>傳輸說明</strong>：更新 STDIO 及 HTTP 流式傳輸描述，加入明確規範參考  

#### 模組 04 - 實務實作  
- **SDK 更新**：新增 Go SDK；在 SDK 列表加入規範版本參考  
- <strong>授權規範</strong>：更新 MCP 授權規範至目前 2025-11-25 版本  

#### 模組 05 - 進階主題  
- <strong>新增功能</strong>：新增關於 MCP 規範 2025-11-25 功能的說明（任務、工具註釋、URL 模式引導、Roots）  
- <strong>安全資源</strong>：新增 OWASP MCP 前十大與 Sherpa 工作坊連結至附加參考  

#### 模組 06 - 社群貢獻  
- **SDK 名單**：新增 Swift 與 Rust SDK；更新規範連結至 2025-11-25  
- <strong>規範參考</strong>：更新 MCP 規範連結至官方直接規範網址  

#### 模組 07 - 早期採用課程  
- <strong>資源更新</strong>：新增 MCP 規範 2025-11-25 連結及 OWASP MCP 前十大至附加資源  

#### 模組 08 - 最佳實踐  
- <strong>規範版本</strong>：更新 MCP 規範參考至 2025-11-25  
- <strong>安全資源</strong>：新增 OWASP MCP 前十大及 Sherpa 工作坊至附加參考  

#### 模組 10 - 精簡 AI 工作流程  
- <strong>徽章更新</strong>：將 MCP 版本徽章由 SDK 版本（1.9.3）改為規範版本（2025-11-25）  
- <strong>資源連結</strong>：更新 MCP 規範連結；新增 OWASP MCP 前十大  

#### 模組 11 - MCP 伺服器實作實驗室  
- <strong>規範參考</strong>：更新 MCP 規範連結至 2025-11-25 版本  
- <strong>安全資源</strong>：新增 OWASP MCP 前十大至官方資源  

## 2025 年 12 月 18 日

### 安全文件更新 - MCP 規範 2025-11-25

#### MCP 安全最佳實踐 (02-Security/mcp-best-practices.md) - 規範版本更新  
- <strong>協議版本更新</strong>：更新引用至最新 MCP 規範 2025-11-25（於 2025 年 11 月 25 日發布）  
  - 將所有規範版本參考從 2025-06-18 更新為 2025-11-25  
  - 文件日期參考從 2025 年 8 月 18 日更新為 2025 年 12 月 18 日  
  - 確認所有規範 URL 指向最新文件  
- <strong>內容驗證</strong>：全面驗證安全最佳實踐符合最新標準  
  - <strong>微軟安全解決方案</strong>：驗證提示盾牌（前稱「越獄風險偵測」）、Azure 內容安全、Microsoft Entra ID 與 Azure Key Vault 用詞及連結  
  - **OAuth 2.1 安全**：確認與最新 OAuth 安全最佳實踐一致  
  - **OWASP 標準**：驗證針對大型語言模型的 OWASP 前十大仍然有效  
  - **Azure 服務**：確認所有 Microsoft Azure 文件連結及最佳實踐有效  
- <strong>標準對齊</strong>：確認所有引用的安全標準有效  
  - NIST AI 風險管理框架  
  - ISO 27001:2022  
  - OAuth 2.1 安全最佳實踐  
  - Azure 安全與合規框架  
- <strong>實作資源</strong>：確認所有實作指南與資源連結有效  
  - Azure API 管理驗證模式  
  - Microsoft Entra ID 整合指南  
  - Azure Key Vault 秘密管理  
  - DevSecOps 流水線與監控解決方案  

### 文件品質保證  
- <strong>規範合規</strong>：確保所有強制性 MCP 安全需求（MUST/MUST NOT）符合最新規範  
- <strong>資源時效</strong>：確認所有對 Microsoft 文件、安全標準及實作指南的外部連結有效  
- <strong>最佳實踐覆蓋</strong>：確認涵蓋身分驗證、授權、AI 特有威脅、供應鏈安全及企業模式  

## 2025 年 10 月 6 日

### 入門章節擴展 – 進階伺服器用法與簡易認證

#### 進階伺服器用法 (03-GettingStarted/10-advanced)  
- <strong>新增章節</strong>：介紹完整進階 MCP 伺服器用法指南，涵蓋一般及低階伺服器架構。  
  - **一般 vs. 低階伺服器**：詳述兩者比較及 Python、TypeScript 實例代碼。  
  - <strong>基於處理函式設計</strong>：說明基於處理函式的工具/資源/提示詞管理，實現可擴充且彈性的伺服器架構。  
  - <strong>實務模式</strong>：真實案例說明低階伺服器模式在進階功能與架構中的優勢。  
#### 簡易認證 (03-GettingStarted/11-simple-auth)
- <strong>新增章節</strong>：分步指南，示範如何在 MCP 伺服器中實作簡易認證。
  - <strong>認證概念</strong>：清楚解釋認證與授權，以及憑證處理。
  - <strong>基本認證實作</strong>：Python (Starlette) 與 TypeScript (Express) 中基於中介軟體的認證範例與程式碼示例。
  - <strong>進階安全性演進</strong>：指引從簡易認證開始，逐步升級至 OAuth 2.1 及 RBAC，並參考進階安全模組。

這些新增內容提供實務、操作性指引，有助於構建更健全、安全且具彈性的 MCP 伺服器實作，橋接基礎概念與進階生產模式。

## 2025 年 9 月 29 日

### MCP 伺服器資料庫整合實驗室 - 全面實戰學習路徑

#### 11-MCPServerHandsOnLabs - 全新完整資料庫整合課程
- **完整 13 個實驗室學習路徑**：新增全面的實作課程，指導如何使用 PostgreSQL 進行生產就緒 MCP 伺服器建置
  - <strong>真實案例實作</strong>：Zava Retail 分析案例，展示企業級架構模式
  - <strong>結構化學習進程</strong>：
    - **實驗室 00-03：基礎** - 介紹、核心架構、安全性與多租戶、環境建置
    - **實驗室 04-06：構建 MCP 伺服器** - 資料庫設計與模式、MCP 伺服器實作、工具開發
    - **實驗室 07-09：進階功能** - 語義搜尋整合、測試與除錯、VS Code 整合
    - **實驗室 10-12：生產與最佳實務** - 部署策略、監控與觀察、最佳實務與優化
  - <strong>企業技術</strong>：FastMCP 框架、使用 pgvector 的 PostgreSQL、Azure OpenAI 向量嵌入、Azure Container Apps、Application Insights
  - <strong>進階功能</strong>：列級安全 (RLS)、語義搜尋、多租戶資料存取、向量嵌入、實時監控

#### 術語標準化 - 模組轉換為實驗室
- <strong>全面文件更新</strong>：系統性將 11-MCPServerHandsOnLabs 中所有 README 文件中「Module」術語改為「Lab」
  - <strong>章節標題</strong>：「本模組涵蓋內容」改為「本實驗室涵蓋內容」，涵蓋全部 13 個實驗室
  - <strong>內容描述</strong>：「本模組提供……」改為「本實驗室提供……」
  - <strong>學習目標</strong>：「完成本模組後……」改為「完成本實驗室後……」
  - <strong>導覽連結</strong>：「Module XX:」改為「Lab XX:」在交叉參考與導覽中
  - <strong>完成追蹤</strong>：「完成本模組後……」改為「完成本實驗室後……」
  - <strong>技術參考保留</strong>：配置檔中 Python 模組參考保持不變 (例："module": "mcp_server.main")

#### 學習指南強化 (study_guide.md)
- <strong>視覺課程地圖</strong>：新增「11. 資料庫整合實驗室」章節，搭配完整實驗室結構視覺化
- <strong>儲存庫結構</strong>：主結構從十個增至十一個主要章節，詳述 11-MCPServerHandsOnLabs
- <strong>學習路徑指引</strong>：增強導航說明，涵蓋 00-11 章節
- <strong>技術涵蓋</strong>：新增 FastMCP、PostgreSQL、Azure 服務整合細節
- <strong>學習成果</strong>：強調生產就緒伺服器開發、資料庫整合模式及企業安全性

#### 主 README 結構增強
- <strong>基於實驗室的術語</strong>：更新 11-MCPServerHandsOnLabs 主 README.md 統一使用「Lab」結構
- <strong>學習路徑組織</strong>：明確從基礎概念、進階實作到生產部署的流程
- <strong>現實案例聚焦</strong>：強調實務操作與企業級模式和技術

### 文件品質及一致性提升
- <strong>強調實作學習</strong>：全文件貫穿實務、實驗室導向方法
- <strong>企業模式集中</strong>：突出生產就緒實作及企業安全考量
- <strong>技術整合</strong>：全面涵蓋現代 Azure 服務與 AI 整合模式
- <strong>學習進程</strong>：明確、結構化路徑，從基礎概念至生產部署

## 2025 年 9 月 26 日

### 案例研究強化 - GitHub MCP 註冊庫整合

#### 案例研究 (09-CaseStudy/) - 生態系統發展聚焦
- **README.md**：大幅擴充，新增全面 GitHub MCP 註冊庫案例研究
  - **GitHub MCP 註冊庫案例**：深入探討 2025 年 9 月 GitHub MCP 註冊庫推出
    - <strong>問題分析</strong>：細緻檢視 MCP 伺服器分散發現與部署挑戰
    - <strong>解決架構</strong>：GitHub 集中式註冊庫及一鍵 VS Code 安裝方案
    - <strong>商業影響</strong>：顯著提升開發者入門及生產力
    - <strong>策略價值</strong>：凸顯模組化代理部署與跨工具互通性
    - <strong>生態系統發展</strong>：定位為代理集成基礎平臺
  - <strong>案例結構優化</strong>：七個案例研究格式統一並完善說明
    - Azure AI 旅遊代理：多代理編排側重
    - Azure DevOps 整合：工作流自動化聚焦
    - 實時文件檢索：Python 控制台客戶端實作
    - 互動學習計畫產生器：Chainlit 對話式網頁應用
    - 編輯器內文件：VS Code 與 GitHub Copilot 整合
    - Azure API 管理：企業 API 整合模式
    - GitHub MCP 註冊庫：生態系統發展與社群平臺
  - <strong>綜合結論</strong>：重寫結論段，聚焦跨多維度 MCP 實作的七個案例
    - 企業整合、多代理編排、開發者生產力
    - 生態系統發展、教育應用分類
    - 深化架構模式、實作策略及最佳實務見解
    - 強調 MCP 作為成熟生產就緒協定的重要性

#### 學習指南更新 (study_guide.md)
- <strong>視覺課程地圖</strong>：更新思維導圖，納入 GitHub MCP 註冊庫於案例研究章節
- <strong>案例描述改善</strong>：由泛泛轉為詳盡七個全面案例拆解
- <strong>儲存庫結構</strong>：更新第 10 章節，反映完整案例研究範圍與具體實作詳情
- <strong>變更日誌整合</strong>：增添 2025 年 9 月 26 日紀錄條目，記錄 GitHub MCP 註冊庫新增與案例強化
- <strong>日期更新</strong>：更新頁尾時間戳為最新修訂日（2025 年 9 月 26 日）

### 文件品質提升
- <strong>一致性優化</strong>：七個案例格式與架構標準化
- <strong>綜合涵蓋</strong>：涵蓋企業、開發者生產力與生態系統發展場景
- <strong>策略定位</strong>：加強 MCP 作為代理系統部署基礎平台的戰略聚焦
- <strong>資源整合</strong>：補充 GitHub MCP 註冊庫資源連結

## 2025 年 9 月 15 日

### 進階主題擴展 - 自訂傳輸與上下文工程

#### MCP 自訂傳輸 (05-AdvancedTopics/mcp-transport/) - 全新進階實作指南
- **README.md**：完整自訂 MCP 傳輸機制實作指南
  - **Azure 事件網格傳輸**：無伺服器事件驅動傳輸全面實作
    - C#、TypeScript 與 Python 範例，搭配 Azure Functions 整合
    - 事件驅動架構模式，支援可擴展 MCP 解決方案
    - Webhook 接收器與推送訊息處理
  - **Azure 事件中樞傳輸**：高吞吐量串流傳輸實作
    - 低延遲場景的實時串流功能
    - 分區策略與檢查點管理
    - 訊息批次處理與效能優化
  - <strong>企業整合模式</strong>：生產就緒架構範例
    - 分散式 MCP 處理跨多 Azure Functions
    - 混合傳輸架構結合多種傳輸類型
    - 訊息耐久性、可靠性與錯誤處理策略
  - <strong>安全與監控</strong>：Azure Key Vault 整合與可觀察性模式
    - 託管身份驗證及最小權限原則
    - Application Insights 遙測與效能監控
    - 電路斷路器與容錯模式
  - <strong>測試框架</strong>：全方位自訂傳輸測試策略
    - 單元測試涵蓋測試替身與模擬框架
    - Azure 測試容器的整合測試
    - 效能與負載測試考量

#### 上下文工程 (05-AdvancedTopics/mcp-contextengineering/) - 新興 AI 學科
- **README.md**：全面探討上下文工程作為新興領域
  - <strong>核心原則</strong>：完整上下文共享、動作決策感知及上下文視窗管理
  - **MCP 協定對齊**：MCP 如何應對上下文工程挑戰
    - 上下文視窗限制與漸進載入策略
    - 相關性判斷與動態上下文檢索
    - 多模態上下文處理與安全性考量
  - <strong>實作方式</strong>：單線程 vs. 多代理架構
    - 上下文分塊與優先排序技巧
    - 漸進載入與壓縮策略
    - 分層上下文方法與檢索優化
  - <strong>衡量框架</strong>：新興上下文效能評估指標
    - 輸入效率、效能、質量與用戶體驗
    - 上下文優化實驗方法
    - 失敗分析與改進方法論

#### 課程導覽更新 (README.md)
- <strong>模組結構強化</strong>：課程表新增進階主題
  - 新增上下文工程 (5.14) 與自訂傳輸 (5.15)
  - 全模組格式與導覽連結一致
  - 描述更新，符合當前內容範圍

### 目錄結構優化
- <strong>命名標準化</strong>：「mcp transport」改名為「mcp-transport」，與其他進階主題資料夾統一
- <strong>內容組織</strong>：所有 05-AdvancedTopics 資料夾統一 mcp-[主題] 命名模式

### 文件品質提升
- **MCP 規範對齊**：所有新內容均引用 MCP Specification 2025-06-18
- <strong>多語言範例</strong>：C#、TypeScript 與 Python 全面程式碼示例
- <strong>企業聚焦</strong>：全程涵蓋生產就緒模式及 Azure 雲整合
- <strong>視覺文件</strong>：透過 Mermaid 圖表展示架構與流程

## 2025 年 8 月 18 日

### 文件全面更新 - MCP 2025-06-18 標準

#### MCP 安全最佳實務 (02-Security/) - 完整現代化
- **MCP-SECURITY-BEST-PRACTICES-2025.md**：重寫對齊 MCP Specification 2025-06-18
  - <strong>強制要求</strong>：新增明確 MUST/MUST NOT 規定與明顯視覺標示
  - **12 項核心安全實務**：從 15 項列表重構為全面安全領域
    - 令牌安全與認證，含外部身分提供者整合
    - 會話管理與傳輸安全，含密碼學要求
    - AI 特殊威脅防護，整合 Microsoft Prompt Shields
    - 存取控制與權限，遵循最小權限原則
    - 內容安全與監控，搭配 Azure Content Safety
    - 供應鏈安全，全面元件驗證
    - OAuth 安全與混淆受害者防護，含 PKCE 實作
    - 事件響應與恢復，自動化能力
    - 合規與治理，法規對齊
    - 先進安全控管，零信任架構
    - 微軟安全生態系統整合，全面方案
    - 持續安全演進，自適應實務
  - <strong>微軟安全解決方案</strong>：強化 Prompt Shields、Azure Content Safety、Entra ID 及 GitHub Advanced Security 整合指導
  - <strong>實作資源</strong>：官方 MCP 文件、微軟安全方案、安全標準與實作指南分類鏈結

#### 進階安全控管 (02-Security/) - 企業實作架構
- **MCP-SECURITY-CONTROLS-2025.md**：全面重構為企業級安全框架
  - **9 大安全領域**：從基本控管擴充為詳細企業架構
    - 進階認證與授權，含 Microsoft Entra ID 整合
    - 令牌安全與防中繼控管，全面驗證
    - 會話安全控管，防止會話劫持
    - AI 特殊安全控管，防止提示注入與工具中毒
    - 混淆受害者攻擊防護，OAuth 代理安全
    - 工具執行安全，包含沙盒與隔離
    - 供應鏈安全控管，依賴驗證
    - 監控與偵測控管，SIEM 整合
    - 事件響應與恢復，自動化能力
  - <strong>實作範例</strong>：新增詳細 YAML 配置區塊與程式碼示例
  - <strong>微軟方案整合</strong>：全面涵蓋 Azure 安全服務、GitHub Advanced Security 與企業身分管理

#### 進階主題安全 (05-AdvancedTopics/mcp-security/) - 生產就緒實作
- **README.md**：重寫企業安全實作指南
  - <strong>規範對齊</strong>：更新至 MCP Specification 2025-06-18，包含強制安全要求
  - <strong>強化認證</strong>：Microsoft Entra ID 整合與 .NET、Java Spring Security 全面範例
  - **AI 安全整合**：Microsoft Prompt Shields 與 Azure Content Safety 實作，以及詳細 Python 範例
  - <strong>先進威脅緩解</strong>：
    - 混淆受害者攻擊防護，含 PKCE 與用戶同意驗證
    - 令牌中繼防止，含受眾驗證與安全令牌管理
    - 會話劫持防止，含密碼學綁定與行為分析
  - <strong>企業安全整合</strong>：Azure Application Insights 監控、威脅偵測流程與供應鏈安全
  - <strong>實作檢查表</strong>：明確區分強制與建議安全控管，並強調微軟安全生態優勢

### 文件品質與標準對齊
- <strong>規範參考</strong>：更新所有參考至最新 MCP 規範 2025-06-18  
- **Microsoft 安全集成生態系統**：加強所有安全文檔中的整合指引  
- <strong>實踐實作</strong>：新增 .NET、Java 與 Python 的詳細程式碼範例及企業模式  
- <strong>資源組織</strong>：全面分類官方文件、安全標準及實作指南  
- <strong>視覺標示</strong>：明確標記強制要求與建議實務  

#### 核心概念 (01-CoreConcepts/) - 全面現代化  
- <strong>協議版本更新</strong>：更新參考現行 MCP 規範 2025-06-18，採用日期為基礎版本控制（YYYY-MM-DD 格式）  
- <strong>架構精煉</strong>：強化主機、用戶端及服務器描述，以符合現行 MCP 架構模式  
  - 主機明確定義為協調多個 MCP 用戶端連線的 AI 應用  
  - 用戶端描述為維持一對一服務器關係的協議連接器  
  - 服務器強化包含本地與遠端部署場景  
- <strong>原始元件重構</strong>：全面改造服務器及用戶端原始元件  
  - 服務器原始元件：資源（資料來源）、提示（範本）、工具（可執行函式），附詳細說明與範例  
  - 用戶端原始元件：抽樣（LLM 補全）、引導（用戶輸入）、日誌（除錯與監控）  
  - 更新符合現行探索（`*/list`）、檢索（`*/get`）及執行（`*/call`）的方法模式  
- <strong>協議架構</strong>：引入雙層架構模型  
  - 資料層：採用 JSON-RPC 2.0 為基礎，含生命週期管理及原始元件  
  - 傳輸層：STDIO（本地）與可串流 HTTP 搭配 SSE（遠端）傳輸機制  
- <strong>安全框架</strong>：全面安全原則，包括明確用戶同意、資料隱私保護、工具執行安全與傳輸層安全  
- <strong>通訊模式</strong>：更新協議訊息顯示初始化、探索、執行與通知流程  
- <strong>程式範例</strong>：刷新多語言範例（.NET、Java、Python、JavaScript），反映現行 MCP SDK 模式  

#### 安全 (02-Security/) - 全面安全大改版  
- <strong>標準對齊</strong>：完全符合 MCP 規範 2025-06-18 的安全要求  
- <strong>認證演進</strong>：紀錄從自訂 OAuth 伺服器至外部身份提供者代理（Microsoft Entra ID）的演變  
- **AI 特殊威脅分析**：強化現代 AI 攻擊向量涵蓋  
  - 詳細提示注入攻擊情境及實務範例  
  - 工具中毒機制與「地毯式攻擊」模式  
  - 上下文視窗中毒與模型混淆攻擊  
- **Microsoft AI 安全解決方案**：全面涵蓋 Microsoft 安全集成生態系  
  - AI 提示防禦盾，具先進偵測、聚焦及定界技術  
  - Azure 內容安全整合模式  
  - GitHub 先進安全用於供應鏈保護  
- <strong>先進威脅緩解</strong>：詳述安全控管  
  - MCP 特定攻擊情境的會話劫持及加密會話 ID 要求  
  - MCP 代理的混淆代理問題及明確同意要求  
  - 令牌直通漏洞及必要驗證控管  
- <strong>供應鏈安全</strong>：擴展 AI 供應鏈涵蓋基礎模型、嵌入服務、上下文供應商及第三方 API  
- <strong>基礎安全</strong>：強化企業安全模式整合，包括零信任架構與 Microsoft 安全集成生態系  
- <strong>資源組織</strong>：依類型分類全面資源連結（官方文件、標準、研究、Microsoft 解決方案、實務指南）  

### 文件品質改進  
- <strong>結構化學習目標</strong>：強化具體可行的學習目標  
- <strong>交叉參考</strong>：新增安全與核心概念主題間的連結  
- <strong>現行資訊</strong>：更新所有日期參考及規範連結至最新標準  
- <strong>實作指引</strong>：於兩大章節中新增明確可行的實作準則  

## 2025 年 7 月 16 日  

### README 與導覽改進  
- 完整重新設計 README.md 中的課程導覽  
- 以表格格式取代 `<details>` 標籤以提升無障礙  
- 新增「alternative_layouts」資料夾提供替代版面選擇  
- 增設卡片式、分頁式與手風琴式導覽範例  
- 更新儲存庫結構部分涵蓋最新所有檔案  
- 強化「如何使用本課程」段落，提供明確建議  
- 更新 MCP 規範連結指向正確網址  
- 新增上下文工程章節 (5.14) 於課程結構中  

### 學習指南更新  
- 完全修訂學習指南以符合目前儲存庫結構  
- 新增 MCP 用戶端與工具及熱門 MCP 伺服器章節  
- 更新視覺課程地圖，確實反映所有主題  
- 強化進階主題描述，涵蓋所有專門領域  
- 更新案例研究章節顯示實際示例  
- 新增此全面變更記錄  

### 社群貢獻 (06-CommunityContributions/)  
- 新增關於用於圖像生成的 MCP 伺服器詳細資訊  
- 新增完整使用 Claude 於 VSCode 的章節  
- 新增 Cline 終端用戶端設定與使用指南  
- 更新 MCP 用戶端章節，涵蓋所有熱門用戶端選項  
- 強化貢獻範例，提供更準確程式碼範本  

### 進階主題 (05-AdvancedTopics/)  
- 統一管理所有專門主題資料夾命名  
- 新增上下文工程資料與範例  
- 新增 Foundry 代理整合文件  
- 強化 Entra ID 安全集成文件  

## 2025 年 6 月 11 日  

### 初次發布  
- 發行 MCP for Beginners 課程第一版  
- 建立所有 10 大主要章節基本結構  
- 實作視覺課程地圖以利導覽  
- 新增多語言初始範例專案  

### 入門 (03-GettingStarted/)  
- 新增首批伺服器實作範例  
- 加入用戶端開發指引  
- 包括 LLM 用戶端整合說明  
- 新增 VS Code 整合文件  
- 實作 Server-Sent Events (SSE) 伺服器範例  

### 核心概念 (01-CoreConcepts/)  
- 清楚說明用戶端與伺服器架構  
- 撰寫重要協議元件文檔  
- 紀錄 MCP 的訊息模式  

## 2025 年 5 月 23 日  

### 儲存庫結構  
- 初始化儲存庫基本資料夾架構  
- 為每個主要章節創建 README 檔案  
- 設定翻譯基礎設施  
- 新增圖像資源與架構圖  

### 文件  
- 建立課程概覽的初始 README.md  
- 加入行為守則 (CODE_OF_CONDUCT.md) 及安全文件 (SECURITY.md)  
- 設定 SUPPORT.md 提供求助指引  
- 創建初步學習指南架構  

## 2025 年 4 月 15 日  

### 規劃與框架  
- MCP for Beginners 課程初步規劃  
- 定義學習目標及目標受眾  
- 列出課程 10 節結構  
- 發展範例與案例研究的概念框架  
- 製作核心概念的初期範例原型

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->