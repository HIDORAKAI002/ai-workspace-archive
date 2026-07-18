# 更新日誌

本檔案記錄了 **AI 初學者代理課程** 的所有重大變更。

## [已發布] — 2026-07-13

本版本新增兩堂完成部署主題的新課程 —— 將代理擴展至 Microsoft Foundry 與縮小至單一工作站 —— 另有煙霧測試管線、更新的課程導航、新學習者技能和更新品牌。

### 新增

- **第16課 — 使用 Microsoft Foundry 部署可擴展代理。** 新課程 [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) 及可執行筆記本 [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb)，建置生產客戶支援代理（工具、RAG、記憶、模型路由、回應快取、人類批准、評估閘門及 OpenTelemetry 追蹤），含開發/部署/執行時 Mermaid 圖、知識檢核、作業與挑戰。
- **第17課 — 使用 Foundry Local 與 Qwen 創建本地 AI 代理。** 新課程 [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) 及筆記本 [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb)，建置完全在裝置端的工程助理（經由 Foundry Local 呼叫 Qwen 函數、沙盒檔案工具、本地 RAG 與 Chroma、可選本地 MCP），含本地專用 / 本地 RAG / 工具呼叫結構圖、知識檢核、作業及挑戰。
- **煙霧測試管線。** 新增 [AI 煙霧測試](https://github.com/marketplace/actions/ai-smoke-test) 工作流程 [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml)，以及 Lessons 01、04、05、16 中可部署代理的每課目錄 [tests/](./tests/README.md)，並有索引 README 映射目錄到課堂及代理名稱。第16課新增「以煙霧測試驗證已部署代理」章節；第01/04/05課新增可選煙霧測試指標。
- **學習者技能。** 在 `.agents/skills/` 加入新的代理技能：[deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md)、[local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md)（包含第16及17課指引），及[testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md)（如何針對 Microsoft Foundry / Azure OpenAI 實時環境驗證筆記本範例）。
- **筆記本驗證執行器。** 新增 [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1)，使用 `nbconvert` 頭尾無介面執行每個 Python 筆記本，並輸出 PASS/FAIL 矩陣（與 `results.json`）。自動偵測 repo 根目錄與 Python，預設排除非課程筆記本（`.venv`、`site-packages`、`translations`、技能模板資產）和 `.NET` 筆記本，支援 `-Filter`、`-Timeout`、`-List`、`-IncludeDotnet`、`-Python` 參數。
- **課程導航。** 為第11至15課新增前一課/下一課連結（先前缺少），使整個課程雙向串接從 00 → 18。
- **新縮圖。** 新增第16和17課的課程縮圖，更新的社群庫縮圖 [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png)（現在展示兩堂新課及 `aka.ms/ai-agents-beginners` URL）。
- <strong>依賴</strong>（[requirements.txt](../../requirements.txt)）：第17課新增 `foundry-local-sdk` 和 `chromadb`。

### 變更

- **主 [README.md](./README.md)** 教學表：第16和17課現在連結到其內容（先前為「即將推出」）；倉庫圖像升級至 `repo-thumbnailv3.png`。
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**：新增第16和17課的逐課學習指南與學習路徑，以及「以煙霧測試驗證已部署代理」章節。
- **[AGENTS.md](./AGENTS.md)**：更新課程數量/描述（00–18），新增煙霧測試驗證段落，與新增第16/17課樣本命名範例。
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**：將「前一課」指向第17課（先前為第15課），完整鏈結。
- **非棄用模型的模型參考標準化。** 全課程（文件、`.env.example`、Python/.NET 筆記本和範例）將 `gpt-4o` / `gpt-4o-mini` 全部替換成 `gpt-4.1-mini` —— `gpt-4o`（所有版本）將於2026年退役。第16課的模型路由範例保持小/大差異，使用 `gpt-4.1-mini`（小版）與 `gpt-4.1`（大版）。Python 筆記本改為從環境變數 (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) 選模型，避免硬編模型名稱。

### 注意事項與已知限制

- **未在實際 Azure 上執行。** 新課程的筆記本為教學範例；請在您自己的 Microsoft Foundry / Foundry Local 環境運行及驗證。煙霧測試流程需要您部署該課代理並設定 Azure OIDC 密鑰 (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`)，且在 Foundry 專案範圍擁有 **Azure AI 使用者** 角色。
- **第17課為本地專用。** 沒有 Foundry Responses 端點，故煙霧測試動作不適用；請運行筆記本在工作站上驗證。

## [已發布] — 2026-07-06

本版本將課程遷移至 **Azure OpenAI Responses API**，產品命名標準化為 **Microsoft Foundry** 及 **Microsoft Agent Framework (MAF)**，停用 GitHub Models，更新 SDK 版本，新增本地模型與在 Foundry 上主辦其他框架的新內容。

### 新增

- <strong>遷移技能</strong> — 安裝來自 [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses) 的 [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) 代理技能於 `.agents/skills/`，含其引用與掃描器腳本。
- **Foundry Local（於裝置端執行模型）** — 在 [00-course-setup/README.md](./00-course-setup/README.md) 新增「替代提供者：Foundry Local」章節，說明安裝方式（`winget` / `brew`）、`foundry model run`、`foundry-local-sdk`，與如何透過 `OpenAIChatClient` 將 `FoundryLocalManager` 線接到 Microsoft Agent Framework。
- **在 Microsoft Foundry 上主辦 LangChain / LangGraph 代理** — [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) 新增章節，並附可執行範例 [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) ，使用 `langchain-azure-ai[hosting]` 及 `ResponsesHostServer`（`/responses` 協定），依據 [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents)。
- **Microsoft Project Opal** — 在 [15-browser-use/README.md](./15-browser-use/README.md) 新增「真實案例：Microsoft Project Opal」章節，將 Opal 框架為企業電腦使用代理，並映射到課程概念（人類參與回圈、信任/安全、規劃、技能）。
- **第二個第02課 Python 範例** — 新增 [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb)（詳「變更」中 —— 從先前的 Semantic Kernel 筆記本遷移），並於課堂 README 加入連結。
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md) 新增「模型與提供者」章節。**

### 變更

- **聊天補全 → Responses API（Python）。** 直接呼叫模型的範例從聊天補全遷移至 Responses API（`client.responses.create(input=..., store=False)`，`resp.output_text`），使用對穩定 Azure OpenAI `/openai/v1/` 端點（無 `api_version`）的 `OpenAI` 用戶端。影響範例如下：
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — 整個函式調用導覽（工具綱要展平成 Responses 格式，工具結果以 `function_call_output`、`max_output_tokens` 等返回）。
- **GitHub Models → Azure OpenAI。** GitHub Models 已棄用（將於 <strong>2026 年 7 月</strong>退休），不支援 Responses API。Python 與 .NET 範例的所有 GitHub Models 代碼路徑已轉換至 Azure OpenAI / Microsoft Foundry：
  - Python：第08課工作流程筆記本（`01`–`03`）、第14課（`14-handoff`、`14-human-loop`、`hotel_booking_workflow_sample.py`）。
  - .NET：`01`–`04`、`07`、`08` `*-dotnet-agent-framework.cs` 與對應 `.md` 文件，及第08課的 dotNET 工作流程筆記本/`.md`（`01`–`03`），改用 `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` 搭配 `AzureCliCredential`。
- **Semantic Kernel → Microsoft Agent Framework。** 原 `02-semantic-kernel.ipynb` 重寫為使用搭配 Azure OpenAI（Responses API）的 Microsoft Agent Framework，並改名為 `02-python-agent-framework-azure-openai.ipynb`。
- **統一使用 `FoundryChatClient` + `as_agent`。** README 與筆記本中提及 `AzureAIProjectAgentProvider` 部分統一採用第01課及框架自身範例的慣用模式：`FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` 配合 `provider.as_agent(...)`。已更新第02至14課 README 與筆記本（例如第13課記憶、所有第14課筆記本、`11-agentic-protocols/code_samples/github-mcp/app.py`）。
- **產品命名。** 將英文內容中名稱統一更改：
  - 「Azure AI Foundry」/「Azure AI Studio」→ **Microsoft Foundry**
  - 「Azure AI Agent Service」→ **Microsoft Foundry Agent Service**
  - （不變：Azure OpenAI、Azure AI Search、Azure AI Inference 及環境變數名稱。）
- <strong>依賴</strong>（[requirements.txt](../../requirements.txt)）：
  - 鎖定版本 `agent-framework>=1.10.0`、`agent-framework-foundry>=1.10.0`、`agent-framework-openai>=1.10.0`。
  - 鎖定 `openai>=1.108.1`（為 Responses API 最低版本）。
  - 移除 `azure-ai-inference`（先前只用於遷移的 GitHub Models 範例）。
- <strong>環境配置</strong>（[.env.example](../../.env.example)）：移除 GitHub Models 變數（`GITHUB_TOKEN`、`GITHUB_ENDPOINT`、`GITHUB_MODEL_ID`）；新增 `AZURE_OPENAI_ENDPOINT`、`AZURE_OPENAI_DEPLOYMENT` 與可選 `AZURE_OPENAI_API_KEY`；名稱更新為 Microsoft Foundry。
- <strong>文件</strong> — 更新 [00-course-setup/README.md](./00-course-setup/README.md)、[AGENTS.md](./AGENTS.md)、[README.md](./README.md) 與 [STUDY_GUIDE.md](./STUDY_GUIDE.md) 以反映上述更動（環境變數配置、驗證程式碼片段、提供者指南、命名）。

### 移除

- 移除 GitHub Models 入門步驟與環境變數設定（由 Azure OpenAI / Microsoft Foundry 取代）。

### 安全 / 隱私（公開分享清理）

- 清理露出真實 **Azure 訂閱 ID**、資源群組/資源名稱及 Bing 連線 ID，以及開發者 <strong>本地檔案路徑與使用者名稱</strong> 的 Jupyter 筆記本執行輸出，包含：
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- 已確認所追蹤的英文內容中沒有遺留任何 API 密鑰、令牌、訂閱 ID 或個人路徑（剩餘的 `GITHUB_TOKEN` 參考是工作流程中的 GitHub Actions 令牌及第 11 課設置中的 GitHub MCP 伺服器 PAT——兩者皆合法且與 GitHub Models 無關）。

### 註解及已知限制

- **未執行/編譯。** 這些是為 API/命名正確性而更新的教學樣本；它們未在實際的 Azure 資源上執行，且 .NET 樣本未在此環境編譯。請在您自己的 Microsoft Foundry / Azure OpenAI 部署上驗證。
- **模型部署必須支援 Responses API。** 請使用如 `gpt-4.1-mini`、`gpt-4.1` 或 `gpt-5.x` 模型的部署。較舊模型支援基本的 Responses 功能，但不包含所有特性。
- **Agent-framework 版本。** 樣本針對最新 MAF（`>=1.10.0`）。標準的代理建立呼叫是 `client.as_agent(...)`；API 須依據框架公佈文件以及已安裝的建置驗證。若指定不同版本，請確認方法是否存在（`as_agent` 對比 `create_agent`）。
- **第 08 課工作流程筆記本 04** 特意保留 `AzureAIAgentClient`（來自 `agent-framework-azure-ai`）因為該課使用 Microsoft Foundry Agent Service 托管的工具（Bing 地基、程式碼解譯器）；它已是基於 Responses。
- **.NET 預設部署。** 兩個第 08 課 dotNET 工作流程樣本先前硬編碼指定某個模型；現在預設為 `AZURE_OPENAI_DEPLOYMENT`（`gpt-4.1-mini`）。若樣本依賴多模態/視覺輸入，請將 `AZURE_OPENAI_DEPLOYMENT` 設為合適模型。
- **Foundry Local** 提供與 OpenAI 相容的<strong>聊天完成</strong>端點，供本地開發使用；完整的 Responses API 功能請使用 Azure OpenAI / Microsoft Foundry。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->