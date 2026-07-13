# 變更紀錄：初學者 MCP 課程

此文件作為 Model Context Protocol (MCP) 初學者課程所有重大變更的記錄。變更按時間倒序記錄（最新變更優先）。

## 2026 年 7 月 2 日

### 新課程：2026-07-28 MCP 規格發佈候選版本

新增了即將發布的 `2026-07-28` MCP 規格發佈候選版本（2026 年 5 月 21 日公布；最終發布計劃於 2026 年 7 月 28 日），摘要自[官方公告部落格文章](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)。課程基線仍維持 **MCP 規格 2025-11-25** 直至新版本發布，因此這部分作為前瞻指引呈現，並非對現有課程的重寫。

- <strong>新增</strong>：[01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — 一整堂課涵蓋無狀態協議核心（移除 `initialize` 握手與 `Mcp-Session-Id`）、新增的 `Mcp-Method`/`Mcp-Name` 路由標頭、`ttlMs`/`cacheScope` 快取元資料、_meta 中的 W3C Trace Context、正式的擴展框架（MCP Apps 及新 Tasks 擴展）、六個授權強化的 SEP、Roots/Sampling/Logging 逐步淘汰，以及工具模式全面轉向 JSON Schema 2020-12。
- <strong>更新</strong> 帶有前瞻呼叫點，連結至新課程：
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md)：協議版本說明、Sampling/Roots/Logging/Tasks 節點，及「接下來會是什麼」
  - [02-Security/README.md](./02-Security/README.md)：授權強化呼叫點
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md)：無狀態傳輸呼叫點
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md)：Sampling 淘汰呼叫點
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md)：Logging 淘汰與 Tasks 擴展呼叫點
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md)：無狀態/會話路由呼叫點
  - [README.md](./README.md)：規格區段中的「前瞻」說明及課程模塊表中新增的 `1.1` 條目
  - [study_guide.md](./study_guide.md)：核心概念總覽底下的前瞻項目與日期附錄說明
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md)：關於 `mcp-session-id` 傳輸映射的提示，作為無狀態請求模型之前的介紹
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md)：模塊總覽中 Root Contexts/Sampling 淘汰與 Tasks 擴展的呼叫點
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md)：授權強化呼叫點

## 2026 年 6 月 24 日

### 新課程：在 Copilot 應用中使用 MCP

- 新增 [工具部分](./12-tooling/README.md)。
- [Copilot 應用中的 MCP](./12-tooling/01-copilot-app/README.md)

## 2026 年 6 月 16 日

### MCP 規格對齊與範例驗證

根據目前的 **MCP 規格 2025-11-25** 與最新官方 SDK 驗證課程，並修正剩餘過時的規格引用，確認核心範例能正常編譯與執行。

#### 規格版本修正（2025-06-18 / 2025-03-26 → 2025-11-25）

更新還稱舊版本為<em>當前/最新</em>標準的英文內容，並將連結指向正式的 `modelcontextprotocol.io` 規格路徑：
- **05-AdvancedTopics/mcp-security/README.md**：更新「當前標準」橫幅、介紹、核心安全原則標題、必須要求標題、Microsoft Entra ID 部分、參考資源連結與安全通知結尾（共 8 個引用）為 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**：更新附加資源的規格連結與「當前標準」橫幅為 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**：將過時的 `2025-03-26` 安全與信任鏈接替換為 2025-11-25 的安全最佳實踐頁面
- **03-GettingStarted/14-sampling/README.md**：更新官方 Sampling 文件的連結到 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**：更新現時態「當前 MCP 規格」引用及附加資源規格連結至 2025-11-25（保留歷史 SSE 淘汰註釋以保持準確）

#### 範例驗證與現行 SDK

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**：`npm install` 安裝了 `@modelcontextprotocol/sdk@1.29.0`，`tsc --noEmit` 無型別錯誤 — 現行 `McpServer`/`StdioServerTransport` API 仍有效
- **Python (03-GettingStarted/01-first-server/solution/python)**：於隔離 `.venv` 並使用 `mcp[cli]` (1.27.2) 驗證；`py_compile` 通過，`FastMCP.list_tools()` 正確返回 `add` 和 `subtract` 工具
- 確認所有範例的 `@modelcontextprotocol/sdk` 版本範圍（`>=1.26.0` / `^1.26.0` / `^1.27.0`）均清晰解析至當前 `1.29.0`，無破壞性 API 變更

#### 依賴版本對齊（填補版本間隙）

將過時的 SDK 依賴版本升級，使每個範例都跟蹤當前 MCP 發布版，符合整個代碼庫慣例：
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**：將 `@modelcontextprotocol/sdk` 從 `^1.8.0` 升級為 `>=1.26.0`，並更新過時的「已依 MCP 2025-06-18 更新」套件描述為「與 MCP 規格 2025-11-25 對齊」
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** 與 **lab4/code/github_mcp_server/pyproject.toml**：將精確版本固定 `mcp==1.23.0` 升級為 `mcp>=1.26.0`；重新生成兩個 `uv.lock` 檔（使用 `uv lock`）使鎖定檔解析至當前 `mcp 1.27.2`，並與清單保持同步

#### 課程差距分析 — 最新規格功能涵蓋

確認課程已涵蓋 MCP 2025-11-25 引入或擴展的所有基本功能，無內容缺口：
- **Sampling**：課程 03-GettingStarted/14-sampling 及 05-AdvancedTopics/mcp-sampling
- **Elicitation（含 URL 模式）**：記錄於 01-CoreConcepts 與 05-AdvancedTopics/mcp-protocol-features
- **Roots**：記錄於 00-Introduction、01-CoreConcepts 及 05-AdvancedTopics/mcp-root-contexts
- **Tasks（實驗性，長時間運作）**：記錄於 01-CoreConcepts 與 05-AdvancedTopics/mcp-protocol-features
- <strong>工具註解</strong> (`readOnlyHint` / `destructiveHint`)：記錄於 01-CoreConcepts 與 05-AdvancedTopics/mcp-protocol-features

### 安全強化與依賴漏洞修復

對所有依賴清單與範例程式碼進行完整安全掃描，並修復所有 npm 警示與一項程式碼層面發現。修復後，`npm audit` 在所有掃描目錄中報告 **0 漏洞**。

#### npm 依賴漏洞（傳遞性）— 已修復

審核所有 15 個提交的 `package-lock.json`，漏洞僅限於 MCP Inspector 開發工具、OpenAI 用戶端與 MCP SDK 的傳遞性依賴；均已解決且不影響範例：
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** 與 **lab3/code/weather_mcp/inspector**：將 `@modelcontextprotocol/inspector` 從 `0.16.6` / `0.14.1` 升級為 `0.22.0`，清除其綁定的 `ajv`、`brace-expansion`、`diff`、`path-to-regexp` 和 `ws` 警示。新增 npm `overrides` 強制使用補丁版 `shell-quote@1.8.4`，消除 `concurrently` 帶來的剩餘嚴重警示；並重新生成兩個鎖定文件（現 0 漏洞）
- **03-GettingStarted/samples/typescript**：執行 `npm audit fix` 更新傳遞性 `qs`（中等嚴重）至已補丁版本
- **03-GettingStarted/samples/javascript**：執行 `npm audit fix` 更新傳遞性 `hono`（中等嚴重）至已補丁版本
- **03-GettingStarted/03-llm-client/solution/typescript**：執行 `npm audit fix` 更新傳遞性 `form-data`（高嚴重）至已補丁版本
- **03-GettingStarted/11-simple-auth/solution/typescript**：生成缺失的 `package-lock.json`，確保專案可重現且可檢核（0 漏洞）

#### 程式碼層級安全修正（OWASP A03：注入）

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**：從 `open_in_vscode` 工具移除 `shell=True`。先前 `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` 允許資料夾路徑中的 shell 元字元被 `cmd.exe` 解讀（命令注入向量）。現改為直接啟動解析後的 `Code.exe` 並以資料夾作為引數 — 無 shell，功能等效且安全

#### Python 依賴稽核

- 使用 `pip-audit` 檢查所有 Python 需求集合。`05-AdvancedTopics` 與 `03-GettingStarted/samples/python` 報告 <strong>無已知漏洞</strong>（其 `mcp` / `httpx` / `pydantic` / `python-dotenv` 範圍解析到目前補丁版）
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**：`pip-audit` 標示傳遞依賴 **`werkzeug` 3.1.1** 有三個 `safe_join` Windows 裝置名稱拒絕服務警告 — `CVE-2025-66221`、`CVE-2026-21860` 與 `CVE-2026-27199`（全部於 3.1.6 修復）。新增明確安全版本鎖定 `werkzeug>=3.1.6` 以解析補丁版本；確認與 `chainlit` / `mcp` / `semantic-kernel` 堆疊能順利解析約束

### 產品名稱改名

更新所有課程內容以反映微軟產品改名：

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**：更新 Discord 社群連結
- **AGENTS.md**：更新 Discord 伺服器參考
- **README.md**：更新技術生態系參考
- **study_guide.md**：更新案例研究參考
- **05-AdvancedTopics/README.md**：更新模組 5.13 標題與描述
- **05-AdvancedTopics/mcp-integration/README.md**：更新段落標題與描述
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**：完整模組標題與內容更新
- **05-AdvancedTopics/mcp-security-entra/README.md**：更新交叉引用連結
- **07-LessonsfromEarlyAdoption/README.md**：更新案例研究參考
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**：更新第 9 段標題、徽章與功能
- **08-BestPractices/README.md**：更新 Discord 社群連結
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**：更新 Discord 頻道參考
- **09-CaseStudy/docs-mcp/solution/python/README.md**：更新模型部署參考
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**：更新 AI 服務表格
- **11-MCPServerHandsOnLabs/03-Setup/README.md**：更新資源參考

#### AI 工具包 / AITK → Microsoft Foundry Toolkit Extension for VS Code

- **README.md**: 更新主要課程參考
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: 更新模組標題、概述及所有模組標題
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: 更新標題、學習目標、設置說明及資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: 更新標題、學習目標、MCP 主機表格及交叉參考
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: 更新標題、徽章、先決條件及資源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: 更新 Agent Builder 參考及回饋連結
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: 更新先決條件及擴展參考

---

## 2026年4月11日

### 新課程內容、文件修正及依賴更新

#### 新增課程內容

**模組 05 - 進階主題**
- **第 5.17 課：使用 MCP 的對抗性多代理推理** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): 新的綜合指導，涵蓋多代理系統的對抗性辯論模式
  - Mermaid 架構圖：兩個代理 → 共享 MCP 伺服器 → 辯論紀錄 → 評判 → 判決
  - 共享 MCP 工具伺服器（`web_search` + `run_python`）以 Python 和 TypeScript 實現
  - 對立系統提示（支持 / 反對 / 評判）包含明確的工具使用要求
  - 以 Python、TypeScript 和 C# 編寫的辯論協調器，管理回合及論點路由
  - MCP `ClientSession` 連接協調器與真實工具調用
  - 用例表（幻覺檢測、威脅建模、API 設計審查、事實驗證、技術選擇）
  - 安全考量：沙盒執行、工具調用驗證、速率限制、審計日誌
  - 結構化練習含三個實作情境（代碼審查、架構決策、內容審核）

#### 文件修正

**模組 03 - 入門**
- **05-stdio-server/README.md**: 修正不完整的 TypeScript stdio 伺服器範例 — 新增缺少的傳輸實例化 (`new StdioServerTransport()`) 和 `server.connect(transport)` 調用，以符合同節 Python 和 .NET 範例
- **14-sampling/README.md**: 修正錯別字 — `“Sampling is an davanced features”` 改為 `“Sampling is an advanced feature”`

#### 課程更新

**主 README.md**
- 在課程表中新增 5.17 項（使用 MCP 的對抗性多代理推理），並直連新課程

**05-AdvancedTopics/README.md**
- 新增第 5.17 課列於課程清單

**study_guide.md**
- 在進階主題的心智圖與文字說明中新增對抗性多代理推理主題

#### 程式碼與安全修正

**模組 05 - 對抗性代理 (`mcp-adversarial-agents`)**
- **安全修正 — 命令注入**: 將 TypeScript `run_python` 工具中的 `execSync` 指令插入改為 `execFile` + `promisify`，消除命令注入漏洞（LLM 控制的程式碼現在作為純字串 argv 元素傳遞，無 shell 參與）
- **MCP 工具循環連線**: 更新 Python 辯論協調器，改用非同步 `AsyncAnthropic` 客戶端（取代同步阻塞 `Anthropic`），將活躍的 `ClientSession` 直接傳給每個代理回合，透過 `session.list_tools()` 每回合抓取工具定義，並在循環中使用 `session.call_tool()` 發送 `tool_use` 區塊，直到模型輸出最終文本回應

#### 依賴更新

- 多個套件（03-GettingStarted、04-PracticalImplementation、10-StreamliningAIWorkflows）中將 `hono` 版本升級至 4.12.12
- TypeScript 套件中的 `@hono/node-server` 從 1.19.11 升級到 1.19.13
- Python 套件（10-StreamliningAIWorkflows 實驗3及4）中將 `cryptography` 從 46.0.5 升級至 46.0.7
- 10-StreamliningAIWorkflows 的 inspector 中將 `lodash` 從 4.17.23 升級至 4.18.1

#### 翻譯

- 同步 48 種以上語言的最新原始碼變更翻譯（i18n 更新）

---

## 2026年2月5日

### 全倉庫驗證與導航改進

#### 新增課程內容

**模組 03 - 入門**
- **12-mcp-hosts/README.md**: 新增完整的 MCP 主機設置指南
  - Claude Desktop、VS Code、Cursor、Cline、Windsurf 設定範例
  - 所有主要主機的 JSON 配置模版
  - 傳輸類型比較表（stdio、SSE/HTTP、WebSocket）
  - 常見連線問題排錯
  - 主機設定安全最佳實踐

- **13-mcp-inspector/README.md**: 新增 MCP Inspector 除錯指南
  - 安裝方法（npx、npm 全域、源碼）
  - 透過 stdio 和 HTTP/SSE 連線伺服器
  - 測試工具、資源及提示工作流程
  - VS Code 與 MCP Inspector 整合
  - 常見除錯情境與解決方案

**模組 04 - 實作指南**
- **pagination/README.md**: 新增分頁實作指南
  - Python、TypeScript、Java 中光標分頁模式
  - 用戶端分頁處理
  - 光標設計策略（不透明與結構化）
  - 效能優化建議

**模組 05 - 進階主題**
- **mcp-protocol-features/README.md**: 新增協議功能深度解析
  - 進度通知的實作
  - 請求取消模式
  - URI 模板的資源樣板
  - 伺服器生命週期管理
  - 記錄等級控制
  - 使用 JSON-RPC 錯誤碼的錯誤處理模式

#### 導航修正（更新超過 24 個檔案）

**主模組 README**
  現在同時連結至第一課及下一模組

**02-Security 子檔案**
- 五份補充安全文件均新增「下一步」導航：

**09-CaseStudy 檔案**
- 所有案例研究檔案新增序列式導航：

**10-StreamliningAI 實驗室**
  在模組 10 概述及模組 11 新增「下一步」區塊

#### 程式碼與內容修正

**SDK 與依賴更新**
將空白 openai 版本修正為 `^4.95.0`
SDK 從 `^1.8.0` 更新至 `>=1.26.0`
MCP 版本標記更新為 `>=1.26.0`

<strong>程式碼修正</strong>
將無效模型 `gpt-4o-mini` 修正為 `gpt-4.1-mini`

<strong>內容修正</strong>
修正損壞連結 `READMEmd` → `README.md`，修正課程表標題 `Module 1-3` → `Module 0-3`，修正大小寫敏感路徑
移除損壞的重複案例研究 5 內容

<strong>初學者指導改進</strong>
新增適當的引言、學習目標及初學者先決條件

#### 課程更新

**主 README.md**
- 新增 3.12（MCP Hosts）、3.13（MCP Inspector）、4.1（分頁）、5.16（協議功能）項目至課程表

**模組 README**
新增第 12 與 13 課於課程清單
新增實用指南區，包含分頁相關連結
新增第 5.15（自訂傳輸）與 5.16（協議功能）兩課

**study_guide.md**
- 更新心智圖，新增所有新主題：MCP 主機設定、MCP Inspector、分頁策略、協議功能深度解析

## 2026年1月28日

### MCP 規格 2025-11-25 符合性檢視

#### 核心概念增強 (01-CoreConcepts/)
- **新增客戶端原語 - Roots**: 新增詳盡文件介紹 Roots 客戶端原語，協助伺服器理解檔案系統邊界及存取權限
- <strong>工具註解</strong>: 新增工具行為註釋文件（`readOnlyHint`、`destructiveHint`），以輔助工具執行決策
- <strong>抽樣中的工具呼叫</strong>: 更新抽樣文件，包含模型驅動工具調用參數 `tools` 與 `toolChoice`
- **URL 模式出誘**: 新增基於 URL 的出誘文件，說明伺服器啟動的外部網頁互動
- **任務（實驗性）**: 新增實驗性任務功能章節，涵蓋持久執行包裝器及延遲結果取回
- <strong>圖示支持</strong>: 註明工具、資源、資源範本及提示可包含圖示作為額外元資料

#### 文件更新
- **README.md**: 新增 MCP 規格 2025-11-25 版本參考及日期版本控制說明
- **study_guide.md**: 更新課程地圖，將任務及工具註釋納入核心概念區段，更新文件時間戳記

#### 規格符合性檢查
- <strong>協議版本</strong>: 確認所有文件均參考當前 MCP 規格 2025-11-25
- <strong>架構對齊</strong>: 確認雙層架構（資料層 + 傳輸層）文件準確度
- <strong>原語文件</strong>: 驗證伺服器原語（資源、提示、工具）與客戶端原語（抽樣、出誘、日誌、Roots）
- <strong>傳輸機制</strong>: 驗證 STDIO 與可串流 HTTP 傳輸文件正確
- <strong>安全指導</strong>: 確認符合當前 MCP 安全最佳實踐文件

#### MCP 2025-11-25 重要功能記錄
- **OpenID Connect 探索**: 透過 OIDC 實現認證伺服器探索
- **OAuth 客戶端 ID 元資料文件**: 推薦的客戶端註冊機制
- **JSON Schema 2020-12**: MCP 架構定義的預設方言
- **SDK 分級系統**: 正式化 SDK 功能支持與維護要求
- <strong>治理結構</strong>: 正式化 MCP 中的工作組與利益群組治理架構

### 主要安全文件更新 (02-Security/)

#### MCP 安全高峰研討會 (Sherpa) 整合
- <strong>新實作訓練資源</strong>: 在所有安全文件中新增與 [MCP 安全高峰研討會 (Sherpa)](https://azure-samples.github.io/sherpa/) 的全面整合
- <strong>遠征路線涵蓋</strong>: 詳述從基地營至峰會的完整營間進展
- **OWASP 對照**: 所有安全指導均映射至 OWASP MCP Azure 安全指南風險

#### OWASP MCP 十大整合
- <strong>新增章節</strong>: 在主要安全 README 新增 OWASP MCP 十大安全風險表與 Azure 緩解措施
- <strong>風險導向文件</strong>: 在 mcp-security-controls-2025.md 中更新 OWASP MCP 風險參考，涵蓋各安全領域
- <strong>參考架構</strong>: 連結至 OWASP MCP Azure 安全指南參考架構與實作範例

#### 更新安全文件
- **README.md**: 加入 Sherpa 研討會概述、遠征路線表、OWASP MCP 十大風險摘要與實作訓練章節
- **mcp-security-controls-2025.md**: 更新標題為 2026 年 2 月，新增 OWASP 風險參考（MCP01-MCP08），修正規格版本不一致問題
- **mcp-security-best-practices-2025.md**: 新增 Sherpa 與 OWASP 資源章節，更新時間戳記
- **mcp-best-practices.md**: 新增實作訓練章節，連結 Sherpa 與 OWASP
- **azure-content-safety-implementation.md**: 新增 OWASP MCP06 參考、Sherpa 營地 3 對齊及附加資源章節

#### 新增資源連結
- [MCP 安全高峰研討會 (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP 十大](https://owasp.org/www-project-mcp-top-10/)
- 個別 OWASP MCP 風險頁（MCP01-MCP10）

### 全課程 MCP 規格 2025-11-25 對齊

#### 模組 03 - 入門
- **SDK 文件**: 加入 Go SDK 至官方 SDK 列表；更新所有 SDK 參考以符合 MCP 規格 2025-11-25
- <strong>傳輸說明</strong>: 更新 STDIO 與 HTTP 串流傳輸描述，加入明確規格參考

#### 模組 04 - 實作指南
- **SDK 更新**: 新增 Go SDK，並在 SDK 清單中加入規格版本參考
- <strong>授權規格</strong>: 將 MCP 授權規格連結更新為當前 2025-11-25 版本

#### 模組 05 - 進階主題
- <strong>新功能</strong>: 新增 MCP 規格 2025-11-25 的新功能說明（任務、工具註解、URL 模式誘發、Roots）
- <strong>安全資源</strong>: 新增 OWASP MCP 十大及 Sherpa 研討會連結至補充參考

#### 模組 06 - 社群貢獻
- **SDK 列表**: 新增 Swift 及 Rust SDK；更新規格連結至 2025-11-25
- <strong>規格參考</strong>: 更新 MCP 規格連結為直達公式文件 URL

#### 模組 07 - 早期採用課題

- <strong>資源更新</strong>：新增 MCP 規範 2025-11-25 鏈接及 OWASP MCP Top 10 至其他資源

#### 模組 08 - 最佳實踐
- <strong>規範版本</strong>：更新 MCP 規範參考至 2025-11-25
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 和 Sherpa 工作坊至額外參考資料

#### 模組 10 - 精簡 AI 工作流程
- <strong>徽章更新</strong>：將 MCP 版本徽章由 SDK 版本 (1.9.3) 改為規範版本 (2025-11-25)
- <strong>資源連結</strong>：更新 MCP 規範連結；新增 OWASP MCP Top 10

#### 模組 11 - MCP Server 實作實驗室
- <strong>規範參考</strong>：更新 MCP 規範鏈接到 2025-11-25 版本
- <strong>安全資源</strong>：新增 OWASP MCP Top 10 至官方資源

## 2025年12月18日

### 安全文件更新 - MCP 規範 2025-11-25

#### MCP 安全最佳實踐 (02-Security/mcp-best-practices.md) - 規範版本更新
- <strong>協議版本更新</strong>：更新為引用最新 MCP 規範 2025-11-25（發布於 2025年11月25日）
  - 將所有規範版本參考由 2025-06-18 更新至 2025-11-25
  - 文件日期參考由 2025年8月18日 改為 2025年12月18日
  - 驗證所有規範網址皆指向最新文件
- <strong>內容驗證</strong>：全面驗證安全最佳實踐是否符合最新標準
  - <strong>微軟安全解決方案</strong>：核實 Prompt Shields（前稱「越獄風險偵測」）、Azure 內容安全、Microsoft Entra ID 及 Azure Key Vault 的最新術語與連結
  - **OAuth 2.1 安全性**：確認與最新 OAuth 安全最佳實踐的一致性
  - **OWASP 標準**：核實 OWASP LLMs Top 10 參考資料依然有效
  - **Azure 服務**：驗證所有 Microsoft Azure 文件連結及最佳實踐
- <strong>標準對齊</strong>：所有引用的安全標準均確認為最新
  - NIST AI 風險管理框架
  - ISO 27001:2022
  - OAuth 2.1 安全最佳實踐
  - Azure 安全與合規框架
- <strong>實作資源</strong>：驗證所有實作指南連結與資源
  - Azure API 管理認證模式
  - Microsoft Entra ID 整合指南
  - Azure Key Vault 秘密管理
  - DevSecOps 管線與監控解決方案

### 文件品質保證
- <strong>規範遵循性</strong>：確保所有 MCP 安全必須條件（MUST/MUST NOT）符合最新規範
- <strong>資源時效性</strong>：驗證所有對 Microsoft 文件、安全標準及實作指南的外部連結
- <strong>最佳實踐涵蓋範圍</strong>：確認涵蓋認證、授權、AI 特殊威脅、供應鏈安全及企業模式的全面性

## 2025年10月6日

### 入門章節擴充 – 進階伺服器用法與簡易認證

#### 進階伺服器用法 (03-GettingStarted/10-advanced)
- <strong>新增章節</strong>：新增全面性指南涵蓋進階 MCP 伺服器用法，包含一般與低階伺服器架構
  - <strong>一般與低階伺服器比較</strong>：詳細比較及 Python 和 TypeScript 範例程式碼
  - **基於 Handler 設計**：說明基於 handler 的工具/資源/提示管理，實現可擴展、彈性伺服器實作
  - <strong>實務模式</strong>：真實場景中低階伺服器模式對進階功能與架構的效益

#### 簡易認證 (03-GettingStarted/11-simple-auth)
- <strong>新增章節</strong>：MCP 伺服器中實作簡易認證的分步指南
  - <strong>認證概念</strong>：清楚說明認證與授權的差異及憑證處理
  - <strong>基本認證實作</strong>：Python（Starlette）與 TypeScript（Express）中基於中介軟體的認證範例程式碼
  - <strong>進階安全指引</strong>：從簡易認證過渡到 OAuth 2.1 和 RBAC，並參考進階安全模組

這些新增內容提供實務操作指引，協助建構更穩健、安全及彈性的 MCP 伺服器實作，連結基礎概念與進階生產模式。

## 2025年9月29日

### MCP Server 資料庫整合實驗室 - 全面實作學習路徑

#### 11-MCPServerHandsOnLabs - 全新完整資料庫整合課程
- **完整 13 實驗室學習路徑**：新增全面實作課程，涵蓋使用 PostgreSQL 資料庫整合的生產級 MCP 伺服器建置
  - <strong>真實案例實作</strong>：Zava Retail 分析案例展示企業級模式
  - <strong>結構化學習進程</strong>：
    - **實驗室 00-03：基礎** - 介紹、核心架構、安全性與多租戶、環境設置
    - **實驗室 04-06：建置 MCP 伺服器** - 資料庫設計與架構、MCP 伺服器實作、工具開發  
    - **實驗室 07-09：進階功能** - 語義搜尋整合、測試與除錯、VS Code 整合
    - **實驗室 10-12：生產與最佳實踐** - 部署策略、監控與觀察性、最佳實踐與優化
  - <strong>企業技術</strong>：FastMCP 框架、採用 pgvector 的 PostgreSQL、Azure OpenAI 嵌入、Azure 容器應用、應用洞察
  - <strong>進階功能</strong>：行層安全（RLS）、語義搜尋、多租戶資料存取、向量嵌入、即時監控

#### 術語標準化 - 從模組轉為實驗室
- <strong>全面文件更新</strong>：系統性更新 11-MCPServerHandsOnLabs 用語，改用「實驗室」取代「模組」
  - <strong>章節標題</strong>：「本模組涵蓋」更新為「本實驗室涵蓋」於所有 13 個實驗室
  - <strong>內容描述</strong>：「本模組提供…」改為「本實驗室提供…」遍及文件
  - <strong>學習目標</strong>：「完成本模組後…」更新為「完成本實驗室後…」 
  - <strong>導覽連結</strong>：所有「模組 XX：」參考改為「實驗室 XX：」於交叉參考與導覽
  - <strong>完成追蹤</strong>：「完成本模組後…」改為「完成本實驗室後…」
  - <strong>保留技術引用</strong>：維持 Python 模組於配置文件中引用（例如 `"module": "mcp_server.main"`）

#### 學習指南增強 (study_guide.md)
- <strong>視覺課程地圖</strong>：新增「11. 資料庫整合實驗室」章節，附詳盡實驗室結構視覺化圖
- <strong>倉庫結構</strong>：由十個更新為十一個主要章節，詳細描述 11-MCPServerHandsOnLabs
- <strong>學習路徑指引</strong>：增強導覽指令，包含章節 00-11
- <strong>技術涵蓋</strong>：新增 FastMCP、PostgreSQL、Azure 服務整合細節
- <strong>學習成果</strong>：強調生產就緒伺服器開發、資料庫整合模式及企業安全

#### 主要 README 結構增強
- <strong>改用實驗室術語</strong>：11-MCPServerHandsOnLabs 主 README.md 一致使用「實驗室」結構
- <strong>學習路徑組織</strong>：清楚從基礎概念至進階實作再到生產部署的演進
- <strong>真實案例聚焦</strong>：突出強調實務操作，結合企業級模式與技術

### 文件品質與一致性提升
- <strong>實務操作強調</strong>：全文件貫徹實驗室導向的實務學習方法
- <strong>企業模式聚焦</strong>：強調生產就緒實作與企業安全考量
- <strong>技術整合</strong>：涵蓋現代 Azure 服務與 AI 整合模式
- <strong>學習進程</strong>：從基礎到生產部署的清晰結構化路徑

## 2025年9月26日

### 案例研究增強 - GitHub MCP Registry 整合

#### 案例研究 (09-CaseStudy/) - 生態系統發展聚焦
- **README.md**：大幅擴充，包含全面 GitHub MCP Registry 案例研究
  - **GitHub MCP Registry 案例研究**：新增全面性案例，探討 2025年9月 GitHub MCP Registry 上線
    - <strong>問題分析</strong>：詳細檢視 MCP 伺服器發現與部署碎片化挑戰
    - <strong>解決方案架構</strong>：GitHub 中央註冊表方案，及一鍵 VS Code 安裝
    - <strong>商業影響</strong>：開發者入門與生產力的可衡量提升
    - <strong>策略價值</strong>：聚焦模組化代理部署與跨工具互通性
    - <strong>生態系統發展</strong>：定位為代理系統整合的基礎平台
  - <strong>案例研究結構優化</strong>：更新所有七個案例研究，統一格式並附詳細描述
    - Azure AI 旅遊代理：多代理協同重點
    - Azure DevOps 整合：工作流自動化聚焦
    - 即時文件擷取：Python 控制台客戶端實作
    - 互動式學習計劃生成器：Chainlit 會話式 Web 應用
    - 編輯器內文件：VS Code 與 GitHub Copilot 整合
    - Azure API 管理：企業 API 整合模式
    - GitHub MCP Registry：生態系統發展與社群平台
  - <strong>全面結論</strong>：重寫結論部分，強調七個案例研究涵蓋多項 MCP 實作維度
    - 企業整合、多代理編排、開發者生產力
    - 生態系統發展、教育應用分類
    - 強化對架構模式、實作策略及最佳實踐的洞見
    - 強調 MCP 作為成熟、生產就緒協議的重要性

#### 學習指南更新 (study_guide.md)
- <strong>視覺課程地圖</strong>：更新心智圖，將 GitHub MCP Registry 納入案例研究章節
- <strong>案例研究描述</strong>：由通用描述擴充為七個詳盡完整案例分析
- <strong>倉庫結構</strong>：更新第10章以反映全面案例研究涵蓋及具體實作細節
- <strong>更新紀錄集成</strong>：新增 2025年9月26日 紀錄，記錄 GitHub MCP Registry 新增及案例研究增強
- <strong>日期更新</strong>：更新頁腳時間戳為最新修訂（2025年9月26日）

### 文件質量提升
- <strong>一致性強化</strong>：標準化所有七個案例研究的格式與結構
- <strong>全面涵蓋</strong>：案例研究現涵蓋企業、開發者生產力及生態系統發展場景
- <strong>策略定位</strong>：強化 MCP 作為代理系統部署基礎平台的定位
- <strong>資源整合</strong>：更新額外資源包括 GitHub MCP Registry 連結

## 2025年9月15日

### 進階主題擴充 - 自訂傳輸與上下文工程

#### MCP 自訂傳輸 (05-AdvancedTopics/mcp-transport/) - 新進階實作指南
- **README.md**：自訂 MCP 傳輸機制完整實作指南
  - **Azure Event Grid 傳輸**：全面無伺服器事件驅動傳輸實作
    - 具備 Azure Functions 整合的 C#、TypeScript 及 Python 範例
    - 可擴展 MCP 解決方案的事件驅動架構模式
    - Webhook 接收者與推送式訊息處理
  - **Azure Event Hubs 傳輸**：高吞吐量串流傳輸實作
    - 用於低延遲場景的即時串流能力
    - 分區策略與檢查點管理
    - 訊息批次處理及效能優化
  - <strong>企業整合模式</strong>：生產就緒架構範例
    - 跨多個 Azure Functions 的分佈式 MCP 處理
    - 混合傳輸架構結合多種傳輸類型
    - 訊息持久性、可靠性及錯誤處理策略
  - <strong>安全與監控</strong>：Azure Key Vault 整合及可觀察性模式
    - 託管身份驗證與最小權限存取
    - 應用洞察遙測與效能監控
    - 電路斷路器與容錯模式
  - <strong>測試架構</strong>：自訂傳輸全面測試策略
    - 使用測試替身與模擬框架進行單元測試
    - 使用 Azure Test Containers 進行整合測試
    - 效能與負載測試考量

#### 上下文工程 (05-AdvancedTopics/mcp-contextengineering/) - 新興 AI 領域
- **README.md**：全面探討上下文工程作為新興領域
  - <strong>核心原則</strong>：完整上下文共享、行動決策感知及上下文視窗管理
  - **MCP 協議對齊**：MCP 設計如何解決上下文工程挑戰
    - 上下文視窗限制與漸進式載入策略
    - 相關性判定與動態上下文提取
    - 多模態上下文處理與安全考量
  - <strong>實作方法</strong>：單線程與多代理架構
    - 上下文區塊切分與優先級技巧
    - 漸進式上下文載入與壓縮策略
    - 分層上下文方法與檢索優化
  - <strong>衡量框架</strong>：新興上下文效能指標評估
    - 輸入效率、效能、品質與使用者體驗考量
    - 上下文優化的實驗方法
    - 失效分析與改進方法論

#### 課程導覽更新 (README.md)
- <strong>增強模組結構</strong>：更新課程表，包括新進階主題
  - 新增上下文工程 (5.14) 和自訂傳輸 (5.15) 項目
  - 全模組格式與導覽連結一致性
  - 更新描述以反映當前內容範圍

### 目錄結構改進
- <strong>命名標準化</strong>：將 "mcp transport" 改名為 "mcp-transport"，與其他進階主題資料夾一致
- <strong>內容組織</strong>：所有 05-AdvancedTopics 資料夾遵循統一命名規則（mcp-[topic]）

### 文件質量增強
- **MCP 規範對齊**：所有新內容引用最新 MCP 規範 2025-06-18
- <strong>多語言範例</strong>：涵蓋完整 C#、TypeScript 與 Python 程式碼範例

- <strong>企業專注</strong>：整體採用生產就緒的模式及 Azure 雲端整合
- <strong>視覺化文件</strong>：使用 Mermaid 圖表進行架構及流程視覺化

## 2025 年 8 月 18 日

### 文件全面更新 - MCP 2025-06-18 標準

#### MCP 安全最佳實踐 (02-Security/) - 完整現代化改造
- **MCP-SECURITY-BEST-PRACTICES-2025.md**：完全重寫，符合 MCP 規範 2025-06-18
  - <strong>強制要求</strong>：新增官方規範中明確的 MUST/MUST NOT 要求，並以清晰視覺指示標示
  - **12 個核心安全實踐**：由 15 項清單重組為全面安全領域
    - 令牌安全性與身份驗證，整合外部身份提供者
    - 會話管理與傳輸安全，包含加密要求
    - AI 專用威脅防護，整合 Microsoft Prompt Shields
    - 訪問控制與權限，遵循最小權限原則
    - 內容安全與監控，整合 Azure Content Safety
    - 供應鏈安全，全面組件驗證
    - OAuth 安全與困惑代理防護，實施 PKCE
    - 事件響應與復原，具自動化功能
    - 合規與治理，符合監管要求
    - 進階安全控制，採用零信任架構
    - Microsoft 安全生態系整合，全方位方案
    - 持續安全演進，採用適應性實踐
  - **Microsoft 安全方案**：加強 Prompt Shields、Azure Content Safety、Entra ID 及 GitHub 進階安全整合指導
  - <strong>實作資源</strong>：依官方 MCP 文件、Microsoft 安全方案、安全標準及實作指南分類的全面資源連結

#### 進階安全控制 (02-Security/) - 企業級實作
- **MCP-SECURITY-CONTROLS-2025.md**：全面改造為企業級安全框架
  - **9 大全面安全領域**：從基礎控制擴展到詳細企業框架
    - 進階身份驗證與授權，整合 Microsoft Entra ID
    - 令牌安全與防止繞過控制，具全面驗證
    - 會話安全控制，防止劫持
    - AI 專用安全控制，防止提示注入與工具污染
    - 防止困惑代理攻擊，OAuth 代理安全
    - 工具執行安全，採用沙盒與隔離
    - 供應鏈安全控制，依賴驗證
    - 監控與偵測控制，整合 SIEM
    - 事件響應與復原，具自動化能力
  - <strong>實作範例</strong>：新增詳細 YAML 配置區塊及代碼示例
  - **Microsoft 方案整合**：涵蓋 Azure 安全服務、GitHub 進階安全及企業身分管理

#### 進階主題安全 (05-AdvancedTopics/mcp-security/) - 生產就緒實作
- **README.md**：完全改寫以符合企業安全實作
  - <strong>現行規範對齊</strong>：更新為 MCP 規範 2025-06-18，涵蓋強制性安全要求
  - <strong>強化身份驗證</strong>：整合 Microsoft Entra ID，提供全面 .NET 與 Java Spring Security 示例
  - **AI 安全整合**：Microsoft Prompt Shields 及 Azure Content Safety 實作，包含詳細 Python 範例
  - <strong>進階威脅緩解</strong>：全面實作範例包含
    - 用 PKCE 與用戶同意驗證防止困惑代理攻擊
    - 令牌繞過預防，具有受眾驗證及安全令牌管理
    - 會話劫持預防，運用加密綁定與行為分析
  - <strong>企業安全整合</strong>：Azure Application Insights 監控、威脅偵測管線與供應鏈安全
  - <strong>實作檢查表</strong>：明確區分強制與建議安全控制，並說明 Microsoft 安全生態系利益

### 文件品質與標準對齊
- <strong>規範參考</strong>：所有引用均更新為 MCP 規範 2025-06-18
- **Microsoft 安全生態系**：加強所有安全文件中的整合指導
- <strong>實作實務</strong>：添加 .NET、Java 與 Python 詳細代碼範例與企業模式
- <strong>資源組織</strong>：全面分類官方文件、安全標準及實作指南
- <strong>視覺指示</strong>：清晰標示強制要求與建議實踐


#### 核心概念 (01-CoreConcepts/) - 完整現代化
- <strong>協議版本更新</strong>：升級為 MCP 規範 2025-06-18，採用基於日期的版本格式 (YYYY-MM-DD)
- <strong>架構細化</strong>：強化 Hosts、Clients 與 Servers 描述，以反映當前 MCP 架構模式
  - Hosts 現明確定義為協調多個 MCP 客戶端連結的 AI 應用
  - Clients 被描述為維持一對一伺服器關係的協議連接器
  - Servers 增強描述本地與遠端部署場景
- <strong>原語重構</strong>：徹底改造伺服器與客戶端原語
  - 伺服器原語：資源（資料來源）、提示（模板）、工具（可執行功能），附詳細說明與範例
  - 客戶端原語：取樣（LLM 完成）、引導（用戶輸入）、日誌（調試/監控）
  - 更新現行發現 (`*/list`)、檢索 (`*/get`) 與執行 (`*/call`) 方法模式
- <strong>協議架構</strong>：引入雙層架構模型
  - 資料層：以 JSON-RPC 2.0 為基礎，包含生命週期管理與原語
  - 傳輸層：本地 STDIO 和遠端 Streamable HTTP 含 SSE 傳輸機制
- <strong>安全框架</strong>：全面安全原則，涵蓋明確用戶同意、資料隱私保護、工具執行安全及傳輸層安全
- <strong>通訊模式</strong>：更新協議訊息，展示初始化、發現、執行及通知流程
- <strong>代碼範例</strong>：刷新多語言範例（.NET、Java、Python、JavaScript），反映當前 MCP SDK 模式

#### 安全 (02-Security/) - 全面安全大改造  
- <strong>標準對齊</strong>：完全符合 MCP 規範 2025-06-18 的安全要求
- <strong>身份驗證演進</strong>：記錄從自訂 OAuth 伺服器到外部身份提供者委派（Microsoft Entra ID）的演進
- **AI 專用威脅分析**：加強現代 AI 攻擊向量覆蓋
  - 詳細提示注入攻擊場景與真實案例
  - 工具中毒機制與「抽地毯」攻擊模式
  - 上下文窗口中毒與模型混淆攻擊
- **Microsoft AI 安全方案**：全面涵蓋 Microsoft 安全生態系
  - AI Prompt Shields，含先進偵測、聚焦及界定技術
  - Azure Content Safety 整合模式
  - GitHub 進階安全應對供應鏈保護
- <strong>進階威脅緩解</strong>：詳細安全控制包括
  - 會話劫持，含 MCP 特定攻擊場景與加密會話 ID 要求
  - MCP 代理中的困惑代理問題，含明確同意要求
  - 令牌繞過漏洞，具強制驗證控制
- <strong>供應鏈安全</strong>：擴大 AI 供應鏈覆蓋，包括基礎模型、嵌入服務、上下文提供者及第三方 API
- <strong>基礎安全</strong>：加強與企業安全模式整合，包括零信任架構與 Microsoft 安全生態系
- <strong>資源組織</strong>：依類型分類全面資源鏈接（官方文件、標準、研究、Microsoft 方案、實作指南）

### 文件品質改進
- <strong>結構化學習目標</strong>：增強學習目標，具體、可行的成果
- <strong>交叉參考</strong>：新增安全與核心概念主題間的連結
- <strong>最新資訊</strong>：更新所有日期參考與規範連結為現行標準
- <strong>實作指導</strong>：於兩大部分中增添具體可行的實作指南

## 2025 年 7 月 16 日

### README 及導覽改進
- 徹底重新設計 README.md 中的課程導覽
- 使用表格格式取代 `<details>` 標籤以增加可及性
- 在新建立的 "alternative_layouts" 資料夾中創建替代布局選項
- 新增卡片式、分頁式及手風琴式導覽範例
- 更新版本庫結構章節，包含所有最新檔案
- 強化「如何使用此課程」章節，提供明確建議
- 更新 MCP 規範連結，指向正確 URL
- 新增上下文工程章節 (5.14) 至課程結構中

### 學習指南更新
- 完全修訂學習指南，對齊現行版本庫結構
- 新增 MCP 客戶端與工具及熱門 MCP 伺服器章節
- 更新視覺課程地圖，準確反映所有主題
- 加強進階主題說明，涵蓋所有專業領域
- 更新案例研究章節，以反映實際範例
- 新增此全面變更記錄

### 社群貢獻 (06-CommunityContributions/)
- 新增有關影像生成 MCP 伺服器的詳細資訊
- 新增在 VSCode 中使用 Claude 的全面章節
- 新增 Cline 終端客戶端設置與使用說明
- 更新 MCP 客戶端章節，包含所有熱門客戶端選項
- 加強貢獻範例，提供更準確的代碼範例

### 進階主題 (05-AdvancedTopics/)
- 統一命名規則，整理所有專業主題資料夾
- 新增上下文工程材料與範例
- 新增 Foundry 代理整合文件
- 加強 Entra ID 安全整合文件

## 2025 年 6 月 11 日

### 初始建立
- 發佈 MCP 初學者課程首個版本
- 創建 10 大主要章節的基本架構
- 實作視覺課程地圖以便導航
- 添加多種程式語言的初始範例專案

### 入門 (03-GettingStarted/)
- 創建首次伺服器實作範例
- 新增客戶端開發指導
- 包含 LLM 客戶端整合指示
- 新增 VS Code 整合文件
- 實作伺服器事件（SSE）伺服器範例

### 核心概念 (01-CoreConcepts/)
- 新增客戶端-伺服器架構詳細說明
- 創建關鍵協議元件文件
- 記錄 MCP 的訊息模式

## 2025 年 5 月 23 日

### 版本庫架構
- 建立基礎資料夾結構初始化版本庫
- 為每個主要章節創建 README 文件
- 建立翻譯基礎設施
- 新增圖片資產與圖表

### 文件
- 創建包含課程概覽的初始 README.md
- 新增行為準則文件 CODE_OF_CONDUCT.md 及安全文件 SECURITY.md
- 設立 SUPPORT.md，提供求助指引
- 創建初步學習指南結構

## 2025 年 4 月 15 日

### 規劃與架構
- 啟動 MCP 初學者課程的初步規劃
- 定義學習目標與目標受眾
- 概述課程 10 章節結構
- 建立範例與案例研究的概念框架
- 創建關鍵概念的初始原型範例

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->