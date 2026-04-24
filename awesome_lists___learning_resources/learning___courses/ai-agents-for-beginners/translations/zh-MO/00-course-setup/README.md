# 課程設定

## 簡介

本課將介紹如何執行本課程的程式碼範例。

## 加入其他學習者並獲取幫助

在開始複製您的程式碼庫之前，請加入 [AI Agents For Beginners Discord 頻道](https://aka.ms/ai-agents/discord)，以獲得有關設定的任何協助、關於課程的任何問題，或與其他學習者連接。

## 複製或派生這個程式碼庫

首先，請複製或派生 GitHub 程式碼庫。這將建立您自己的課程資料版本，讓您可以執行、測試及調整程式碼！

您可以點擊此連結 <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">派生程式碼庫</a> 完成此操作。

您現在應該擁有以下連結中的已派生課程版本：

![Forked Repo](../../../translated_images/zh-MO/forked-repo.33f27ca1901baa6a.webp)

### 淺層複製（建議用於工作坊 / Codespaces）

  >下載完整的程式碼庫歷史紀錄及所有檔案時，完整程式碼庫可能很大（約 3 GB）。如果您只參加工作坊或只需要部分課程資料夾，淺層複製（或部分複製）可藉由截斷歷史紀錄及/或跳過 Blob，大幅減少下載。

#### 快速淺層複製 — 最小歷史，所有檔案

在下面的指令中，把 `<your-username>` 替換為您的派生 URL（如果您喜歡，也可以用上游 URL）。

只複製最新的提交歷史（小下載量）：

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

複製特定分支：

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### 部分（稀疏）複製 — 最小 Blob + 僅選取資料夾

這使用部分複製和稀疏檢出（需要 Git 2.25+ 且建議使用具有部分複製支援的現代 Git）：

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

進入程式碼庫資料夾：

```bash|powershell
cd ai-agents-for-beginners
```

然後指定您想要的資料夾（下面範例示範兩個資料夾）：

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

複製並驗證檔案後，如果您只需要檔案且想釋放空間（無 Git 歷史），請刪除程式碼庫的元資料（💀不可逆 — 您將失去所有 Git 功能：無法提交、拉取、推送或存取歷史）。

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### 使用 GitHub Codespaces（建議以避免本機大量下載）

- 透過 [GitHub UI](https://github.com/codespaces) 為本程式碼庫建立新的 Codespace。

- 在新建立的 Codespace 的終端機中，執行上述任一淺層/稀疏複製指令，僅將您需要的課程資料夾拉入 Codespace 工作區。

- 選擇性操作：在 Codespaces 中複製後，可以移除 .git 以回收更多空間（請參閱上方移除指令）。

- 注意：如果您想直接在 Codespaces 中開啟程式碼庫（無需額外複製），請注意 Codespaces 會建構 devcontainer 環境，可能仍會部署超出您需要的內容。於新 Codespace 內複製淺層複製本，可讓您更好地控制硬碟使用量。

#### 提示

- 如果您想編輯/提交，請務必將複製 URL 換成您的派生版本。

- 如果之後需要更多歷史或檔案，可以抓取它們或調整稀疏檢出以包含更多資料夾。

## 執行程式碼

本課程提供一系列 Jupyter 筆記本，供您實際操作並建立 AI 代理體驗。

程式碼範例使用 **Microsoft Agent Framework (MAF)**，搭配 `AzureAIProjectAgentProvider`，透過 **Microsoft Foundry** 連接到 **Azure AI Agent Service V2**（回應 API）。

所有 Python 筆記本都標註為 `*-python-agent-framework.ipynb`。

## 環境需求

- Python 3.12+
  - <strong>注意</strong>：如果尚未安裝 Python3.12，請務必安裝。然後使用 python3.12 建立虛擬環境，以確保依需求檔案安裝正確版本的套件。
  
    >範例

    建立 Python 虛擬環境目錄：

    ```bash|powershell
    python -m venv venv
    ```

    然後啟用虛擬環境：

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+：如使用 .NET 範例碼，請安裝 [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) 或更新版本，並檢查安裝的 .NET SDK 版本：

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — 用於驗證。從 [aka.ms/installazurecli](https://aka.ms/installazurecli) 安裝。
- **Azure 訂閱** — 以使用 Microsoft Foundry 及 Azure AI Agent Service。
- **Microsoft Foundry 專案** — 具已部署模型的專案（例如 `gpt-4o`）。請參見下方 [步驟 1](#步驟-1：建立-microsoft-foundry-專案)。

本程式碼庫根目錄中包含 `requirements.txt`，它列出所有執行程式碼範例所需的 Python 套件。

您可以在終端機於程式碼庫根目錄執行以下指令安裝：

```bash|powershell
pip install -r requirements.txt
```

建議先建立 Python 虛擬環境，以避免衝突與問題。

## 設定 VSCode

確保 VSCode 使用的是正確的 Python 版本。

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## 設定 Microsoft Foundry 與 Azure AI Agent Service

### 步驟 1：建立 Microsoft Foundry 專案

您需要擁有 Azure AI Foundry <strong>樞紐</strong> 和 <strong>專案</strong>，且專案內有已部署模型，才能執行筆記本。

1. 前往 [ai.azure.com](https://ai.azure.com) 並使用您的 Azure 帳戶登入。
2. 建立 <strong>樞紐</strong> （或使用現有的）。請參閱：[樞紐資源概述](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources)。
3. 在樞紐中建立 <strong>專案</strong>。
4. 從 **Models + Endpoints** → **Deploy model** 部署模型（例如 `gpt-4o`）。

### 步驟 2：取得您的專案端點和模型部署名稱

在 Microsoft Foundry 入口網站中，於專案取得：

- <strong>專案端點</strong> — 至 **Overview** 頁面並複製端點 URL。

![Project Connection String](../../../translated_images/zh-MO/project-endpoint.8cf04c9975bbfbf1.webp)

- <strong>模型部署名稱</strong> — 至 **Models + Endpoints**，選取已部署模型並記下 **Deployment name**（例如 `gpt-4o`）。

### 步驟 3：使用 `az login` 登入 Azure

所有筆記本皆使用 **`AzureCliCredential`** 驗證，無須管理 API 金鑰。需先透過 Azure CLI 登入。

1. 如果尚未安裝 Azure CLI，請安裝：[aka.ms/installazurecli](https://aka.ms/installazurecli)

2. 執行登入：

    ```bash|powershell
    az login
    ```

    如果身處無瀏覽器的遠端/Codespace 環境：

    ```bash|powershell
    az login --use-device-code
    ```

3. 如果出現提示，選擇包含您的 Foundry 專案的訂閱。

4. 驗證您已登入：

    ```bash|powershell
    az account show
    ```

> **為何使用 `az login`？** 筆記本使用 `azure-identity` 套件裡的 `AzureCliCredential` 進行認證，Azure CLI 登入後提供憑證，無須在 `.env` 檔中存取 API 金鑰或密鑰。這是 [安全最佳實踐](https://learn.microsoft.com/azure/developer/ai/keyless-connections)。

### 步驟 4：建立您的 `.env` 檔案

複製範本檔案：

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

打開 `.env`，填入以下兩個數值：

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

| 變數 | 取得位置 |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry 入口網站 → 您的專案 → **Overview** 頁面 |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry 入口網站 → **Models + Endpoints** → 您已部署模型的名稱 |

大多數課程就到此為止！筆記本會自動透過您的 `az login` 會話完成身份驗證。

### 步驟 5：安裝 Python 相依套件

```bash|powershell
pip install -r requirements.txt
```

建議在先前建立的虛擬環境中執行。

## 課程 5 額外設定（Agentic RAG）

課程 5 使用 **Azure AI Search** 進行檢索增強生成。如您打算執行該課程，請將這些變數加入 `.env`：

| 變數 | 取得位置 |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure 入口網站 → 您的 **Azure AI Search** 資源 → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure 入口網站 → 您的 **Azure AI Search** 資源 → **Settings** → **Keys** → 主要管理金鑰 |

## 課程 6 與 8 額外設定（GitHub 模型）

課程 6 和 8 部分筆記本使用 **GitHub Models**，非 Azure AI Foundry。如果要執行這些範例，將下列變數加入 `.env`：

| 變數 | 取得位置 |
|----------|-----------------|
| `GITHUB_TOKEN` | GitHub → **Settings** → **Developer settings** → **Personal access tokens** |
| `GITHUB_ENDPOINT` | 使用 `https://models.inference.ai.azure.com`（預設值） |
| `GITHUB_MODEL_ID` | 要使用的模型名稱（例如 `gpt-4o-mini`） |

## 替代提供者：MiniMax（兼容 OpenAI）

[MiniMax](https://platform.minimaxi.com/) 提供大上下文模型（最高支援 204K 代幣），透過 OpenAI 相容 API。由於 Microsoft Agent Framework 的 `OpenAIChatClient` 可使用任何 OpenAI 兼容端點，您可以使用 MiniMax 直接替代 GitHub 模型或 OpenAI。

請將下列變數加入您的 `.env` 檔案：

| 變數 | 取得位置 |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax 平台](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | 使用 `https://api.minimax.io/v1`（預設值） |
| `MINIMAX_MODEL_ID` | 要使用的模型名稱（例如 `MiniMax-M2.7`） |

<strong>可用模型</strong>：`MiniMax-M2.7`（建議），`MiniMax-M2.7-highspeed`（更快回應）

使用 `OpenAIChatClient` 的程式碼範例（例如課程 14 訂房工作流程）當設定了 `MINIMAX_API_KEY` 時，會自動偵測並使用您的 MiniMax 設定。

## 課程 8 額外設定（Bing Grounding 工作流程）

課程 8 條件型工作流程筆記本使用 **Bing grounding**，透過 Azure AI Foundry。如您打算執行該範例，將此變數加入您的 `.env`：

| 變數 | 取得位置 |
|----------|-----------------|
| `BING_CONNECTION_ID` | Azure AI Foundry 入口網站 → 您的專案 → **Management** → **Connected resources** → 您的 Bing 連接 → 複製連接 ID |

## 疑難排解

### macOS 的 SSL 憑證驗證錯誤

如果您在 macOS 上遇到如下錯誤：

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

這是 macOS 上 Python 的已知問題，系統 SSL 憑證未被自動信任。請依序嘗試以下解決方案：

**選項 1：執行 Python 的 Install Certificates 腳本（建議）**

```bash
# 用你已安裝嘅 Python 版本取代 3.XX（例如，3.12 或 3.13）：
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**選項 2：在筆記本中使用 `connection_verify=False`（僅限 GitHub Models 筆記本）**

在課程 6 筆記本（`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`）中，已有註解掉的解決方法。創建客戶端時解註解並使用 `connection_verify=False`：

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # 如果遇到證書錯誤，請停用 SSL 驗證
)
```

> **⚠️ 警告：** 禁用 SSL 驗證 (`connection_verify=False`) 會跳過憑證驗證，降低安全性。僅作為開發環境臨時解決，生產環境切勿使用。

**選項 3：安裝並使用 `truststore`**

```bash
pip install truststore
```

在您的筆記本或腳本頂部，任何網路呼叫前添加以下內容：

```python
import truststore
truststore.inject_into_ssl()
```

## 卡住了嗎？

若您在執行本設定時遇到任何問題，歡迎加入我們的 <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI 社群 Discord</a> 或 <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">建立 issue</a>。

## 下一課程

您現在已準備好執行本課程的程式碼。祝您在 AI 代理世界中學習愉快！

[AI 代理與代理使用案例簡介](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原文的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或誤譯負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->