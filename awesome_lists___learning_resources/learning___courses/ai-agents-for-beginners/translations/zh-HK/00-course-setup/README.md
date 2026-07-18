# 課程設置

## 介紹

本課程將說明如何執行本課程的程式範例。

## 加入其他學習者並獲得協助

在開始克隆你的代碼庫之前，請加入 [AI Agents For Beginners Discord 頻道](https://aka.ms/ai-agents/discord) 以獲得任何設置協助、課程相關問題，或與其他學習者交流。

## 克隆或分叉此代碼庫

請先克隆或分叉 GitHub 代碼庫。這將建立你自己的課程材料版本，以便你可以執行、測試和調整程式碼！

你可以透過點擊<a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">分叉代碼庫的連結</a>來完成。

你現在應該在以下連結擁有此課程的自己的分叉版本：

![Forked Repo](../../../translated_images/zh-HK/forked-repo.33f27ca1901baa6a.webp)

### 淺層克隆（建議用於工作坊 / Codespaces）

  >當你下載完整歷史和所有檔案時，整個代碼庫可能會很大（約3GB）。如果你只參加工作坊或只需要少數課程資料夾，淺層克隆（或稀疏克隆）可以透過截斷歷史和/或跳過blob來避免大多數下載。

#### 快速淺層克隆 — 最小歷史，所有檔案

在以下指令中，將 `<your-username>` 換成你的分叉 URL（或如果你喜歡，也可使用上游 URL）。

只克隆最新提交歷史（較小下載）：

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

克隆特定分支：

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### 部分（稀疏）克隆 — 最少blob + 只選擇需要的資料夾

這使用部分克隆與稀疏檢出（需要 Git 2.25+ 且建議使用支援部分克隆的現代 Git）：

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

進入代碼庫資料夾：

```bash|powershell
cd ai-agents-for-beginners
```

然後指定你需要的資料夾（以下示例示兩個資料夾）：

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

克隆並驗證檔案後，如果你只需要檔案且想釋放空間（無需 git 歷史），請刪除代碼庫元資料（💀不可回復——你將失去所有 Git 功能：無提交、拉取、推送或歷史記錄存取）。

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### 使用 GitHub Codespaces（建議避免本地大量下載）

- 透過 [GitHub UI](https://github.com/codespaces) 為此代碼庫建立新的 Codespace。  

- 在新建立的 Codespace 終端機中，執行上述其中一個淺層／稀疏克隆指令，只將你需要的課程資料夾帶入 Codespace 工作區。
- 選擇性：在 Codespaces 裡克隆後，移除 .git 以回收額外空間（參見上述移除指令）。
- 注意：如果你偏好直接在 Codespaces 開啟此代碼庫（不額外克隆），請注意 Codespaces 將建立 devcontainer 環境，可能仍會提供超出需求的資源。於新 Codespace 中淺層克隆，能讓你更好控管硬碟使用量。

#### 小貼士

- 如要編輯／提交，務必將克隆的 URL 換成你的分叉倉庫。
- 若之後需要更多歷史或檔案，可拉取它們或調整稀疏檢出以包含額外資料夾。

## 執行程式碼

本課程提供一系列 Jupyter Notebook，讓你透過實作體驗構建 AI Agent。

程式範例使用 **Microsoft Agent Framework (MAF)** 的 `FoundryChatClient`，連接至通過 **Microsoft Foundry** 的 **Microsoft Foundry Agent Service V2**（Responses API）。

所有 Python 筆記本皆標記為 `*-python-agent-framework.ipynb`。

## 需求條件

- Python 3.12+
  - <strong>注意</strong>：如果尚未安裝 Python3.12，請務必安裝。然後使用 python3.12 建立虛擬環境以確保可從 requirements.txt 安裝正確版本的套件。
  
    >範例

    建立 Python 虛擬環境目錄：

    ```bash|powershell
    python -m venv venv
    ```

    接著啟動虛擬環境：

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+：針對使用 .NET 的範例代碼，請確保安裝了 [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) 或更新版本。然後，檢查已安裝的 .NET SDK 版本：

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — 認證所需。請從 [aka.ms/installazurecli](https://aka.ms/installazurecli) 安裝。
- **Azure 訂閱** — 以便存取 Microsoft Foundry 與 Microsoft Foundry Agent Service。
- **Microsoft Foundry 專案** — 需有已部署模型的專案（例如 `gpt-4.1-mini`）。詳見下方[步驟 1](#步驟-1：建立-microsoft-foundry-專案)。

本代碼庫根目錄已包含 `requirements.txt` 檔案，其中列出所有執行程式範例所需的 Python 套件。

你可於代碼庫根目錄的終端機輸入以下指令安裝：

```bash|powershell
pip install -r requirements.txt
```

建議建立 Python 虛擬環境以避免衝突和問題。

## 設定 VSCode

請確保你在 VSCode 中使用正確版本的 Python。

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## 設定 Microsoft Foundry 與 Microsoft Foundry Agent Service

### 步驟 1：建立 Microsoft Foundry 專案

你需要一個具已部署模型的 Microsoft Foundry **集線器(hub)** 與 **專案(project)** 以執行筆記本。

1. 前往 [ai.azure.com](https://ai.azure.com) 並以你的 Azure 帳戶登入。
2. 建立一個 <strong>集線器</strong>（或使用現有的），參見：[Hub 資源概覽](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources)。
3. 在集線器內建立 <strong>專案</strong>。
4. 從 **模型 + 端點** → <strong>部署模型</strong> 部署一個模型（例如 `gpt-4.1-mini`）。

### 步驟 2：取得專案端點及模型部署名稱

在 Microsoft Foundry 入口網站中的專案內：

- <strong>專案端點</strong> — 前往 <strong>概覽</strong> 頁面並複製端點 URL。

![Project Connection String](../../../translated_images/zh-HK/project-endpoint.8cf04c9975bbfbf1.webp)

- <strong>模型部署名稱</strong> — 前往 **模型 + 端點**，選取你已部署的模型，並記下 <strong>部署名稱</strong>（例如 `gpt-4.1-mini`）。

### 步驟 3：使用 `az login` 登入 Azure

所有筆記本皆使用 **`AzureCliCredential`** 進行認證 — 不需管理 API 金鑰。這需要你透過 Azure CLI 登入。

1. 如果尚未安裝，請先安裝 **Azure CLI**：[aka.ms/installazurecli](https://aka.ms/installazurecli)

2. 執行以下指令登入：

    ```bash|powershell
    az login
    ```

    若你位於無瀏覽器的遠端或 Codespace 環境，請執行：

    ```bash|powershell
    az login --use-device-code
    ```

3. 若系統提示，請選擇包含 Foundry 專案的訂閱。

4. 驗證你已登入：

    ```bash|powershell
    az account show
    ```

> **為什麼要用 `az login`？** 筆記本使用 `azure-identity` 套件的 `AzureCliCredential` 認證方式。這表示你的 Azure CLI 工作階段提供憑證 — 不需要在 `.env` 檔案內放置 API 金鑰或秘密。這是一項 [安全最佳實踐](https://learn.microsoft.com/azure/developer/ai/keyless-connections)。

### 步驟 4：建立你的 `.env` 檔案

複製範例檔案：

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

開啟 `.env` 並填入以下兩個值：

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| 變數名稱 | 取得位置 |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry 入口網站 → 你的專案 → <strong>概覽</strong> 頁面 |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry 入口網站 → **模型 + 端點** → 你的已部署模型名稱 |

大部分課程就到此結束！筆記本會自動透過你的 `az login` 工作階段進行認證。

### 步驟 5：安裝 Python 依賴套件

```bash|powershell
pip install -r requirements.txt
```

建議在你先前建立的虛擬環境裡執行此命令。

## Lesson 5（Agentic RAG）額外設定

Lesson 5 使用 **Azure AI Search** 進行檢索增強生成。如果你打算執行這節課，請在 `.env` 加入以下變數：

| 變數名稱 | 取得位置 |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure 入口網站 → 你的 **Azure AI Search** 資源 → <strong>概覽</strong> → URL |
| `AZURE_SEARCH_API_KEY` | Azure 入口網站 → 你的 **Azure AI Search** 資源 → <strong>設定</strong> → <strong>金鑰</strong> → 主要管理金鑰 |

## 直接呼叫 Azure OpenAI（Lesson 6 和 8）的額外設定

Lesson 6 與 8 的部分筆記本會直接呼叫 **Azure OpenAI**（使用 **Responses API**），不透過 Microsoft Foundry 專案。這些範例以前使用 GitHub Models，該服務已棄用（2026 年 7 月退休）且不支援 Responses API。如果你打算執行這些範例，請在 `.env` 加入以下變數：

| 變數名稱 | 取得位置 |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Azure 入口網站 → 你的 **Azure OpenAI** 資源 → <strong>金鑰及端點</strong> → 端點 URL（例如 `https://<your-resource>.openai.azure.com`） |
| `AZURE_OPENAI_DEPLOYMENT` | 你的已部署模型名稱（例如 `gpt-4.1-mini`），支援 Responses API |
| `AZURE_OPENAI_API_KEY` | 選用 — 僅在你使用金鑰認證而非 `az login` / Entra ID 時需要 |

> Responses API 使用穩定的 `/openai/v1/` 端點，不需 `api-version`。使用 `az login` 登入，即可使用無金鑰的 Entra ID 認證。

## 替代供應商：MiniMax（OpenAI 相容）

[MiniMax](https://platform.minimaxi.com/) 提供大上下文模型（最高支援 204K 令牌）透過相容於 OpenAI 的 API。由於 Microsoft Agent Framework 的 `OpenAIChatClient` 可用於任何 OpenAI 相容端點，你可以使用 MiniMax 作為 Azure OpenAI 或 OpenAI 的替代方案。

請在你的 `.env` 加入以下變數：

| 變數名稱 | 取得位置 |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax 平台](https://platform.minimaxi.com/) → API 金鑰 |
| `MINIMAX_BASE_URL` | 使用 `https://api.minimax.io/v1`（預設值） |
| `MINIMAX_MODEL_ID` | 使用的模型名稱（例如 `MiniMax-M3`） |

<strong>範例模型</strong>：`MiniMax-M3`（推薦）、`MiniMax-M2.7`、`MiniMax-M2.7-highspeed`（回應更快）。模型名稱及可用性可能隨時間變動，且存取權限可能依帳戶或地區不同而有所差異 — 請查看 [MiniMax 平台](https://platform.minimaxi.com/) 了解當前清單。如果你的帳戶無法使用 `MiniMax-M3`，請設定 `MINIMAX_MODEL_ID` 為你可用的模型（例如 `MiniMax-M2.7`）。

使用 `OpenAIChatClient` 的程式範例（如 Lesson 14 飯店預訂工作流程）會在設定了 `MINIMAX_API_KEY` 時自動偵測並使用你的 MiniMax 配置。

## 替代供應商：Foundry Local（本地運行模型）

[Foundry Local](https://foundrylocal.ai) 是輕量級執行環境，可在<strong>完全於你自己的機器上</strong>下載、管理並提供語言模型的服務，且透過相容 OpenAI 的 API 操作 — 無需雲端、無需 Azure 訂閱、無需 API 金鑰。非常適合離線開發、無需承擔雲端成本的實驗，或保留資料於本機。

因 Microsoft Agent Framework 的 `OpenAIChatClient` 支援任何相容 OpenAI 的端點，Foundry Local 是 Azure OpenAI 的本地替代方案。

**1. 安裝 Foundry Local**

```bash
# Windows 作業系統
winget install Microsoft.FoundryLocal

# macOS 作業系統
brew install foundrylocal
```

**2. 下載並執行模型**（同時啟動本地服務）：

```bash
foundry model list          # 查看可用模型
foundry model run phi-4-mini
```

**3. 安裝用以發現本地端點的 Python SDK：**

```bash
pip install foundry-local-sdk
```

**4. 指向 Microsoft Agent Framework 使用你的本地模型：**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# 下載（如有需要）並在本地提供模型，然後發現端點/埠。
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # 例如 http://localhost:<port>/v1
    api_key=manager.api_key,        # Foundry Local 永遠是「不需要」
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **注意：** Foundry Local 暴露相容 OpenAI 的 **Chat Completions** 端點。適用於本地開發與離線場景。若要完整使用 **Responses API** 功能（有狀態對話、深度工具編排與 agent 類型開發），請使用 **Azure OpenAI** 或 **Microsoft Foundry** 專案，就像課程說明的那樣。詳見 [Foundry Local 文件](https://foundrylocal.ai) 了解當前模型目錄和平台支援。


## 課堂 8 額外設定（Bing 對接工作流程）

課堂 8 的條件工作流程筆記本使用 Microsoft Foundry 的 **Bing 對接**。如果你打算執行該示例，請將此變數添加到你的 `.env` 文件中：

| 變數 | 位置 |
|----------|-----------------|
| `BING_CONNECTION_ID` | Microsoft Foundry 入口網站 → 你的專案 → <strong>管理</strong> → <strong>已連接的資源</strong> → 你的 Bing 連接 → 複製連接 ID |

## 疑難排解

### macOS 的 SSL 證書驗證錯誤

如果你在 macOS 上遇到類似以下的錯誤：

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

這是 macOS 上 Python 的已知問題，系統 SSL 證書未自動被信任。請依序嘗試以下解決方案：

**選項一：執行 Python 的安裝證書腳本（推薦）**

```bash
# 將 3.XX 換成你安裝的 Python 版本（例如 3.12 或 3.13）：
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**選項二：在筆記本中使用 `connection_verify=False`（僅限 GitHub Models 筆記本）**

在第 6 課的筆記本（`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`）中，已包含一個被註解掉的變通方法。創建用戶端時取消註解 `connection_verify=False`：

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # 如果遇到證書錯誤，請禁用 SSL 驗證
)
```

> **⚠️ 警告：** 停用 SSL 驗證 (`connection_verify=False`) 會跳過證書驗證，降低安全性。此方法只建議作為開發環境的臨時變通方案，切勿在生產環境中使用。

**選項三：安裝並使用 `truststore`**

```bash
pip install truststore
```

接著在你的筆記本或腳本頂端，任何網絡呼叫前加入以下內容：

```python
import truststore
truststore.inject_into_ssl()
```

## 卡住了嗎？

如果你在執行此設定時有任何問題，歡迎加入我們的<a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI 社群 Discord</a>或<a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">建立問題回報</a>。

## 下一課程

你現在已準備好執行本課程的代碼。祝你快樂學習 AI 代理人的世界！

[AI 代理人介紹與代理人應用案例](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->