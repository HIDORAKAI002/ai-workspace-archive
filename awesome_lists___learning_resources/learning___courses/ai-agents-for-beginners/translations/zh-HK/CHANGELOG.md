# 更新日誌

所有對 **AI 新手代理人** 課程的重要變動都已記錄在此檔案中。

## [已發布] — 2026-07-13

此版本新增兩個完成佈署主題的新課程單元 — 將代理人擴展至 Microsoft Foundry 與縮減至單一工作站 — 以及一個煙霧測試流程、更新的課程導航、新增的學員技能和更新的品牌設計。

### 新增

- **第16課 — 使用 Microsoft Foundry 部署可擴展代理人。** 新課程 [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) 與可執行筆記本 [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb)，構建生產用客服代理人（工具、RAG、記憶、模型路由、回應快取、人類核准、評估門檻與 OpenTelemetry 追蹤），包含開發/部署/運行時的 Mermaid 圖、知識檢測、作業與挑戰。
- **第17課 — 使用 Foundry Local 與 Qwen 建立本地 AI 代理。** 新課程 [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) 與筆記本 [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb)，建置完全在裝置端運行的工程師助理（透過 Foundry Local 呼叫 Qwen 函式，沙盒檔案工具，使用 Chroma 的本地 RAG，可選本地 MCP），附本地專用 / 本地 RAG / 工具呼叫流程圖、知識檢測、作業與挑戰。
- **煙霧測試流程。** 新增 [AI 煙霧測試](https://github.com/marketplace/actions/ai-smoke-test) 工作流程 [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml)，以及課程 01、04、05 和 16 的部署代理人測試目錄，位於 [tests/](./tests/README.md)，附索引 README，對應每個目錄的課程與代理人名稱。第16課新增「使用煙霧測試驗證已佈署代理」章節；第01/04/05課新增可選的煙霧測試指向說明。
- **學習者技能。** 在 `.agents/skills/` 新增代理人技能：[deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md)、[local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md)（整理第16和17課指導內容）及 [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md)（如何根據 Microsoft Foundry / Azure OpenAI 實際環境驗證筆記本範例）。
- **筆記本驗證執行器。** 新增 [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1)，利用 `nbconvert` 無頭模式執行所有 Python 筆記本並印出通過/失敗矩陣（外加 `results.json`）。自動偵測倉庫根目錄與 Python，預設排除非課程筆記本（`.venv`、`site-packages`、`translations`、技能範本資產）與 `.NET` 筆記本，支援 `-Filter`、`-Timeout`、`-List`、`-IncludeDotnet`、`-Python` 等參數。
- **課程導航。** 為第11至15課新增上下課程連結（先前缺少），使整套課程可雙向串接 00 → 18。
- **新縮圖。** 為第16和17課新增縮圖，且更新倉庫社交圖片 [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png)（現宣傳兩個新課及 `aka.ms/ai-agents-beginners` 網址）。
- <strong>相依套件</strong> ([requirements.txt](../../requirements.txt))：新增 `foundry-local-sdk` 與 `chromadb` 支援第17課。

### 變更

- **主 README.md** 課程列表：第16和17課新增連結至內容（先前為「即將推出」）；倉庫圖像更新為 `repo-thumbnailv3.png`。
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**：新增第16和17課於逐課導覽與學習路徑，並加入「使用煙霧測試驗證已部署代理」章節。
- **[AGENTS.md](./AGENTS.md)**：更新課程數量與敘述（00–18），新增煙霧測試驗證小節，並增補第16/17課範例命名。
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**：「上一課」調整為指向第17課（先前為第15課），完成鏈結。
- **模型引用標準化（非廢止版本）。** 全課程中所有 `gpt-4o` / `gpt-4o-mini` 改為 `gpt-4.1-mini`（`gpt-4o` 各版本將於 2026 年退役）。第16課模型路由範例持續區分大小模型，採用 `gpt-4.1-mini`（小）與 `gpt-4.1`（大）。Python 筆記本改從環境變數(`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`)選取模型，不再硬編模型名稱。

### 注意事項與已知限制

- **未對實體 Azure 執行。** 新課程筆記本為教學範例，請自行在 Microsoft Foundry / Foundry Local 環境下執行與驗證。煙霧測試工作流程需先佈署課程代理且於 Foundry 專案範圍設定 Azure OIDC 機密 (`AZURE_CLIENT_ID`、`AZURE_TENANT_ID`、`AZURE_SUBSCRIPTION_ID`)，並賦予 **Azure AI User** 角色。
- **第17課僅為本地執行。** 因無 Foundry Responses 端點，故煙霧測試流程不適用；請透過執行筆記本於工作站驗證。

## [已發布] — 2026-07-06

本版本將課程遷移至 **Azure OpenAI Responses API**，並標準化產品命名為 **Microsoft Foundry** 與 **Microsoft Agent Framework (MAF)**，退役 GitHub Models，更新 SDK 版本，並新增關於本地模型與在 Foundry 上代管其它框架的新內容。

### 新增

- <strong>遷移技能</strong> — 安裝 [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) 代理技能（來源於 [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)），置於 `.agents/skills/`，包含相關引用及掃描腳本。
- **Foundry Local（裝置端執行模型）** — [00-course-setup/README.md](./00-course-setup/README.md) 新增「替代供應商：Foundry Local」章節，涵蓋安裝（`winget` / `brew`）、`foundry model run`、`foundry-local-sdk` 及透過 `OpenAIChatClient` 將 `FoundryLocalManager` 接入 Microsoft Agent Framework。
- **在 Microsoft Foundry 上代管 LangChain / LangGraph 代理** — [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) 新增章節，並提供可執行範例 [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py)，使用 `langchain-azure-ai[hosting]` 與 `ResponsesHostServer`（`/responses` 協定），依據 [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents)。
- **Microsoft Project Opal** — [15-browser-use/README.md](./15-browser-use/README.md) 新增「真實案例：Microsoft Project Opal」章節，將 Opal 定義為企業使用電腦的代理人，並連結至課程概念（人機互動、信任/安全、規劃、技能）。
- **新增第二個第02課 Python 範例** — 新增 [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb)（參見「變更」— 從 Semantic Kernel 筆記本遷移），並在課程 README 連結。
- **新增 "Models and Providers"** 章節於 [STUDY_GUIDE.md](./STUDY_GUIDE.md)。

### 變更

- **對話完成 → Responses API（Python）。** 直接呼叫模型的範本已從對話完成移轉至 Responses API（`client.responses.create(input=..., store=False)`、`resp.output_text`），利用 `OpenAI` 用戶端接 Azure OpenAI 穩定版 `/openai/v1/` 端點（無 `api_version`）。受影響範例如下：
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — 完整的函式呼叫演練（工具結構展平到 Responses 格式，工具結果以 `function_call_output`、`max_output_tokens` 等方式返回）。
- **GitHub Models → Azure OpenAI。** GitHub Models 已廢止（2026 年 7 月退役），不支援 Responses API。所有 GitHub Models 程式路徑已轉換為 Azure OpenAI / Microsoft Foundry，涵蓋 Python 與 .NET 範例：
  - Python：第08課工作流筆記 (`01`–`03`)、第14課（`14-handoff`、`14-human-loop`、`hotel_booking_workflow_sample.py`）。
  - .NET：`01`–`04`、`07`、`08` 版 `*-dotnet-agent-framework.cs` 及相關 `.md` 文件，與第08課 dotNET 工作流筆記本/`.md`（`01`–`03`）改用 `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` 搭配 `AzureCliCredential`。
- **Semantic Kernel → Microsoft Agent Framework。** 原 `02-semantic-kernel.ipynb` 重寫為使用 Microsoft Agent Framework 搭配 Azure OpenAI (Responses API)，並重新命名為 `02-python-agent-framework-azure-openai.ipynb`。
- **統一使用 `FoundryChatClient` + `as_agent`。** README 與筆記本程式碼中引用 `AzureAIProjectAgentProvider` 改為採用第01課及框架範例慣用模式：`FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())`，並用 `provider.as_agent(...)`。此更改遍及第02–14課 README 和筆記本（如第13課記憶、第14課所有筆記本、`11-agentic-protocols/code_samples/github-mcp/app.py`）。
- **產品命名。** 英文內容中全面改名：
  -「Azure AI Foundry」/「Azure AI Studio」→ **Microsoft Foundry**
  -「Azure AI Agent Service」→ **Microsoft Foundry Agent Service**
  -（未變更：「Azure OpenAI」、「Azure AI Search」、「Azure AI Inference」及環境變數名稱。）
- <strong>相依套件</strong> ([requirements.txt](../../requirements.txt))：
  - 鎖定 `agent-framework>=1.10.0`、`agent-framework-foundry>=1.10.0`、`agent-framework-openai>=1.10.0`。
  - 鎖定 `openai>=1.108.1`（Responses API 最低版本）。
  - 移除 `azure-ai-inference`（僅 GitHub Models 範例使用）。
- <strong>環境設定</strong> ([.env.example](../../.env.example))：移除 GitHub Models 變數 (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); 新增 `AZURE_OPENAI_ENDPOINT`、`AZURE_OPENAI_DEPLOYMENT` 及選用 `AZURE_OPENAI_API_KEY`；命名改用 Microsoft Foundry。
- <strong>文件</strong> — 更新 [00-course-setup/README.md](./00-course-setup/README.md)、[AGENTS.md](./AGENTS.md)、[README.md](./README.md) 與 [STUDY_GUIDE.md](./STUDY_GUIDE.md) 對應上述變更（設定環境變數、驗證片段、供應商指導、命名）。

### 移除

- 移除 GitHub Models 登入流程及環境變數設定說明（改以 Azure OpenAI / Microsoft Foundry 取代）。

### 安全 / 隱私（公共分享清理）

- 清除 Jupyter 筆記本執行輸出，避免洩漏真實 **Azure 訂閱 ID**、資源群組 / 資源名稱及 Bing 連線 ID，並移除開發者 <strong>本地檔案路徑與用戶名稱</strong>，在：
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- 已確認追蹤的英文內容中未遺留任何 API 金鑰、令牌、訂閱 ID 或個人路徑（剩餘的 `GITHUB_TOKEN` 參考是工作流程中的 GitHub Actions 令牌及第 11 課設置中的 GitHub MCP 伺服器 PAT——兩者皆屬合法且與 GitHub 模型無關）。

### 注意事項與已知限制

- **未執行/未編譯。** 這些為依 API/命名正確性更新的教學範例；並未針對實際 Azure 資源執行，且 .NET 範例未在此環境編譯。請依自身 Microsoft Foundry / Azure OpenAI 部署進行驗證。
- **模型部署必須支援 Responses API。** 請使用如 `gpt-4.1-mini`、`gpt-4.1` 或 `gpt-5.x` 型號的部署。舊型號支援基本 Responses 功能，但不包含所有功能。
- **Agent-framework 版本。** 範例以最新版 MAF（`>=1.10.0`）為目標。標準的代理建立呼叫為 `client.as_agent(...)`；API 已依據框架公開的文件與已安裝版本驗證。若鎖定不同版本，請確認方法是否可用（`as_agent` 與 `create_agent`）。
- **第 08 課工作流程筆記本 04** 特意保留 `AzureAIAgentClient`（來自 `agent-framework-azure-ai`），因其使用 Microsoft Foundry Agent Service 託管工具（Bing grounding、程式碼解譯器）；其本身即基於 Responses。
- **.NET 預設部署。** 先前 08 課的兩個 dotNET 工作流程範例硬編碼指定型號；現已預設為 `AZURE_OPENAI_DEPLOYMENT`（`gpt-4.1-mini`）。若範例需多模態/視覺輸入，請將 `AZURE_OPENAI_DEPLOYMENT` 設為合適模型。
- **Foundry Local** 提供一個 OpenAI 相容的 **Chat Completions** 端點，並供本地開發使用；完整 Responses API 功能請使用 Azure OpenAI / Microsoft Foundry。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->