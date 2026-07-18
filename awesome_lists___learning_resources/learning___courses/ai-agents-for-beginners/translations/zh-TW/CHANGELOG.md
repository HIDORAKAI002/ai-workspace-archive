# 變更記錄

所有對 **AI 初學者代理人** 課程的重要變更都記錄在此檔案中。

## [發布] — 2026-07-13

此版本新增兩個新課程，完成部署章節 —— 將代理人擴展到 Microsoft Foundry 與縮減到單一工作站 —— 以及一個煙霧測試管線、更新課程導航、新的學習者技能與品牌更新。

### 新增

- **第16課 — 使用 Microsoft Foundry 部署可擴展代理人。** 新課程 [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) 與可執行筆記本 [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb)，建構一個生產用客戶支持代理人（工具、RAG、記憶、模型路由、回應快取、人為批准、評估閘門，以及 OpenTelemetry 追蹤），包含開發/部署/執行時 Mermaid 圖、知識檢測、作業與挑戰。
- **第17課 — 使用 Foundry Local 和 Qwen 創建本地 AI 代理人。** 新課程 [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) 與筆記本 [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb)，構建全端設備工程助理（透過 Foundry Local 進行 Qwen 函數調用，沙箱化檔案工具，本地 RAG 使用 Chroma，選用本地 MCP），包含本地專用 / 本地 RAG / 工具調用圖示、知識檢查、作業與挑戰。
- **煙霧測試管線。** 新增 [AI 煙霧測試](https://github.com/marketplace/actions/ai-smoke-test) 工作流程 [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) 以及課程 01、04、05 和 16 的可部署代理人測試目錄 [tests/](./tests/README.md)，並在索引 README 中將每個目錄對應到其課程及代理人名稱。第16課增加「使用煙霧測試驗證已部署代理人」章節；課程 01/04/05 新增選用的煙霧測試指示。
- **學習者技能。** 新增代理人技能於 `.agents/skills/`： [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md)、[local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md)（打包第16與17課指引）、及 [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md)（如何針對實際 Microsoft Foundry / Azure OpenAI 設定驗證筆記本範例）。
- **筆記本驗證執行器。** 新增 [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1)，使用 `nbconvert` 無頭執行 Python 筆記本並列印 PASS/FAIL 矩陣（與 `results.json`）。自動偵測倉庫根目錄與 Python，預設排除非課程筆記本（`.venv`、`site-packages`、`translations`、技能範本資源）及 `.NET` 筆記本，支援 `-Filter`、`-Timeout`、`-List`、`-IncludeDotnet`、`-Python` 參數。
- **課程導覽。** 為第11至15課新增上一課/下一課連結（之前缺少），使整個課程串連 00 → 18 兩方向。
- **新縮圖。** 第16與17課的縮圖，以及更新倉庫社群圖片 [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png)（現在廣告兩個新課程及 `aka.ms/ai-agents-beginners` 網址）。
- <strong>相依套件</strong> ([requirements.txt](../../requirements.txt))：新增第17課所需的 `foundry-local-sdk` 與 `chromadb`。

### 變更

- **主 README.md 課程表。** 第16與17課現已提供課程內容連結（之前為「即將推出」）；倉庫圖像更新為 `repo-thumbnailv3.png`。
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**：新增第16與17課至逐課指南與學習路徑，以及「使用煙霧測試驗證已部署代理人」章節。
- **[AGENTS.md](./AGENTS.md)**：更新課程數量與描述（00–18），新增煙霧測試驗證章節，以及第16與17課範例命名。
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**：「上一課」現指向第17課（原為第15課），完成課程串連。
- **非棄用模型標準化引用。** 全課程中（文件、`.env.example`、Python/.NET 筆記本與範例）替換所有 `gpt-4o` / `gpt-4o-mini` 為 `gpt-4.1-mini` — `gpt-4o`（所有版本）將於 2026 年退休。第16課模型路由範例依舊使用小尺寸 `gpt-4.1-mini` 與大尺寸 `gpt-4.1` 對比。Python 筆記本改從環境變數 (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) 選擇模型，不再硬編。

### 注意事項與已知限制

- **未在實際 Azure 環境執行。** 新筆記本為教學範例，請自行於 Microsoft Foundry / Foundry Local 環境中執行與驗證。煙霧測試工作流程需部署課程代理人並設定 Azure OIDC 機密（`AZURE_CLIENT_ID`、`AZURE_TENANT_ID`、`AZURE_SUBSCRIPTION_ID`），於 Foundry 專案範圍內賦予 **Azure AI 使用者** 角色。
- **第17課僅限本地。** 無 Foundry Responses 端點，煙霧測試動作不適用；請於工作站執行筆記本作驗證。

## [發布] — 2026-07-06

此版本將課程遷移至 **Azure OpenAI Responses API**，統一產品命名為 **Microsoft Foundry** 與 **Microsoft Agent Framework (MAF)**，棄用 GitHub Models，更新 SDK 版本，並新增本地模型及在 Foundry 上托管其他框架內容。

### 新增

- <strong>遷移技能</strong> — 安裝 [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) 代理人技能（來自 [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)）於 `.agents/skills/`，含其引用與掃描腳本。
- **Foundry Local（本地運行模型）** — 新增 [00-course-setup/README.md](./00-course-setup/README.md) 中「替代提供者：Foundry Local」章節，涵蓋安裝(`winget`/`brew`)、`foundry model run`、`foundry-local-sdk` 與如何透過 `OpenAIChatClient` 將 `FoundryLocalManager` 連接至 Microsoft Agent Framework。
- **在 Microsoft Foundry 上托管 LangChain / LangGraph 代理人** — 新增 [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) 中一節，以及可執行範例 [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py)，使用 `langchain-azure-ai[hosting]` 和 `ResponsesHostServer`（`/responses` 協定），基於 [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents)。
- **Microsoft Project Opal** — 新增[15-browser-use/README.md](./15-browser-use/README.md) 中「實務範例：Microsoft Project Opal」章節，將 Opal 定義為企業電腦使用代理人，並對應課程概念（人類介入、信任/安全、規劃、技能）。
- **第二個第02課 Python 範例** — 新增 [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb)（詳見「變更」— 從舊有 Semantic Kernel 筆記本遷移）並在課程 README 中連結。
- **新增「模型與提供者」章節** 於 [STUDY_GUIDE.md](./STUDY_GUIDE.md)。

### 變更

- **聊天補全→回應 API（Python）。** 直接呼叫模型的範例由聊天補全改為使用回應 API (`client.responses.create(input=..., store=False)`, `resp.output_text`)，使用無版本參數的穩定版 Azure OpenAI `/openai/v1/` 端點。受影響範例包含：
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — 函數調用完整示範（工具結構扁平化為回應格式，工具結果以 `function_call_output`、`max_output_tokens` 等方式返回）。
- **GitHub Models → Azure OpenAI。** GitHub Models 已停用（2026年7月退休），且不支援回應 API。所有 GitHub Models 代碼路徑已轉換為 Azure OpenAI / Microsoft Foundry，包含 Python 與 .NET 範例：
  - Python: 第08課流程筆記本 (`01`–`03`)、第14課 (`14-handoff`、`14-human-loop`、`hotel_booking_workflow_sample.py`)。
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` 與配套 `.md` 文件，及第08課 dotNET 流程筆記本/`.md` (`01`–`03`)、現使用 `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` 搭配 `AzureCliCredential`。
- **Semantic Kernel → Microsoft Agent Framework。** 原 `02-semantic-kernel.ipynb` 重寫為使用 Microsoft Agent Framework 與 Azure OpenAI （回應 API），並改名為 `02-python-agent-framework-azure-openai.ipynb`。
- **統一使用 `FoundryChatClient` + `as_agent`。** README 與筆記本中以往提及 `AzureAIProjectAgentProvider` 的代碼，統一改為第01課與框架範例所用的標準樣式：`FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` 並透過 `provider.as_agent(...)`。已在第02–14課 README 與筆記本中更新（例如第13課記憶、第14課所有筆記本、`11-agentic-protocols/code_samples/github-mcp/app.py`）。
- **產品命名。** 英文內容全面重命名：
  - 「Azure AI Foundry」/「Azure AI Studio」→ **Microsoft Foundry**
  - 「Azure AI Agent Service」→ **Microsoft Foundry Agent Service**
  - （未變動：Azure OpenAI、Azure AI Search、Azure AI Inference 與環境變數名稱）
- <strong>相依套件</strong> ([requirements.txt](../../requirements.txt))：
  - 固定 `agent-framework>=1.10.0`、`agent-framework-foundry>=1.10.0`、`agent-framework-openai>=1.10.0`。
  - 固定 `openai>=1.108.1`（回應 API 的最低版本）。
  - 移除 `azure-ai-inference`（僅舊有 GitHub Models 範例使用）。
- <strong>環境設定</strong> ([.env.example](../../.env.example))：移除 GitHub Models 相關變數 (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); 新增 `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT` 及選用 `AZURE_OPENAI_API_KEY`; 命名更新為 Microsoft Foundry。
- <strong>文件</strong> — 更新 [00-course-setup/README.md](./00-course-setup/README.md)、[AGENTS.md](./AGENTS.md)、[README.md](./README.md) 與 [STUDY_GUIDE.md](./STUDY_GUIDE.md)，包含上述設定環境變數、驗證程式碼、提供者指導、命名。

### 移除

- 移除 GitHub Models 新手上路步驟與環境變數說明（被 Azure OpenAI / Microsoft Foundry 取代）。

### 安全 / 隱私（公開分享清理）

- 清除洩漏實際 **Azure 訂閱 ID**、資源群組/資源名稱、Bing 連接 ID，及開發者 <strong>本地檔案路徑與使用者名稱</strong> 的 Jupyter 筆記本執行輸出，包含：
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- 已確認追蹤的英文內容中未遺留任何 API 密鑰、令牌、訂閱 ID 或個人路徑（剩餘的 `GITHUB_TOKEN` 引用是工作流程中的 GitHub Actions 令牌和第 11 課設置中的 GitHub MCP 伺服器 PAT — 均為合法且與 GitHub 模型無關）。

### 備註與已知限制

- **未執行/編譯。** 這些是為 API/命名正確性更新的教學範例；未在實際 Azure 資源上運行，且 .NET 範例也未在此環境編譯。請針對您自己的 Microsoft Foundry / Azure OpenAI 部署進行驗證。
- **模型部署必須支援 Responses API。** 請使用像 `gpt-4.1-mini`、`gpt-4.1` 或 `gpt-5.x` 模型的部署。舊版模型支援核心 Responses 功能，但不支援所有功能。
- **Agent-framework 版本。** 這些範例針對最新的 MAF（`>=1.10.0`）。標準的代理建立呼叫為 `client.as_agent(...)`；API 已依據框架公開的文件與安裝版本驗證。若您指定其他版本，請確認方法可用性（`as_agent` 與 `create_agent`）。
- **第 08 課工作流程筆記本 04** 故意保留 `AzureAIAgentClient`（來自 `agent-framework-azure-ai`），因為它使用 Microsoft Foundry Agent Service 所託管的工具（Bing 根據、程式碼解譯器）；已經是基於 Responses 的。
- **.NET 預設部署。** 先前兩個第 08 課 dotNET 工作流程範例硬編碼特定模型；現已改為預設使用 `AZURE_OPENAI_DEPLOYMENT`（`gpt-4.1-mini`）。若範例依賴多模態/視覺輸入，請設置適合的模型給 `AZURE_OPENAI_DEPLOYMENT`。
- **Foundry Local** 提供與 OpenAI 相容的 <strong>聊天完成</strong> 端點，並用於本地開發；完整的 Responses API 功能集請使用 Azure OpenAI / Microsoft Foundry。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->