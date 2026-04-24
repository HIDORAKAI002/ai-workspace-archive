# 課程設置

## 簡介

本課程將介紹如何執行本課程的程式碼範例。

## 加入其他學習者並獲得協助

在開始克隆您的倉庫之前，請加入 [AI Agents For Beginners Discord 頻道](https://aka.ms/ai-agents/discord)，以便在設置過程中獲得協助，解決課程相關問題，或與其他學習者聯繫。

## 克隆或分叉此倉庫

首先，請克隆或分叉 GitHub 倉庫。這將建立您自己的課程材料版本，以便您能夠執行、測試及調整程式碼！

您可以點擊連結 <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">分叉倉庫</a>來完成此操作。

您現在應該擁有您自己的課程分叉版本，位於下方連結：

![Forked Repo](../../../translated_images/zh-TW/forked-repo.33f27ca1901baa6a.webp)

### 淺層克隆（建議用於工作坊 / Codespaces）

> 當您下載完整歷史及全部檔案時，完整倉庫可能會很大（約 3 GB）。如果您只是參加工作坊或只需部分課程資料夾，淺層克隆（或稀疏克隆）可以透過截斷歷史記錄及/或略過 blob，避免大部分下載。

#### 快速淺層克隆 — 最少歷史，完整檔案

將下面指令中的 `<your-username>` 替換為您的分叉 URL（或您偏好的上游 URL）。

只克隆最新提交歷史（下載量較小）：

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

克隆指定分支：

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### 部分（稀疏）克隆 — 最少 blob + 只選定資料夾

此方法使用部分克隆及稀疏檢出（需 Git 2.25+ 且建議使用支援部分克隆的現代 Git）：

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

進入倉庫資料夾：

```bash|powershell
cd ai-agents-for-beginners
```

接著指定您需要的資料夾（以下範例展示兩個資料夾）：

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

完成克隆並確認檔案後，如果您只需檔案並希望釋放空間（不保留 Git 歷史），請刪除倉庫元資料（💀不可逆 — 您將失去所有 Git 功能：無法提交、拉取、推送或存取歷史）。

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### 使用 GitHub Codespaces（建議避免本地大型下載）

- 透過 [GitHub UI](https://github.com/codespaces) 為此倉庫建立新的 Codespace。  

- 在新建立的 Codespace 中的終端機執行上述淺層/稀疏克隆指令，僅將您需要的課程資料夾引入 Codespace 工作區。
- 選擇性：在 Codespaces 中克隆完畢後，可移除 .git 目錄以回收額外空間（見上方移除指令）。
- 注意：若您偏好直接在 Codespaces 中開啟倉庫（不額外克隆），Codespaces 將建構 devcontainer 環境，可能仍會配置超出所需。於全新 Codespace 中克隆淺層版本可讓您更掌控磁碟使用。

#### 小技巧

- 若要編輯/提交，請務必將克隆 URL 換成您的分叉。
- 未來若需要更多歷史或檔案，您可執行 fetch 或調整稀疏檢出以包含更多資料夾。

## 執行程式碼

本課程提供一系列 Jupyter 筆記本，您可以透過它們獲得建立 AI Agents 的實作經驗。

程式碼範例使用 **Microsoft Agent Framework (MAF)** 與 `AzureAIProjectAgentProvider`，該提供者透過 **Microsoft Foundry** 連接到 **Azure AI Agent Service V2**（Responses API）。

所有 Python 筆記本皆以 `*-python-agent-framework.ipynb` 命名。

## 系統需求

- Python 3.12+
  - <strong>注意</strong>：如果您尚未安裝 Python3.12，請先安裝。接著使用 python3.12 建立虛擬環境，以確保從 requirements.txt 安裝正確版本。
  
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

- .NET 10+：使用 .NET 範例程式碼時，請確保安裝 [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) 或更新版本。檢查已安裝的 .NET SDK 版本：

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — 用於認證。請從 [aka.ms/installazurecli](https://aka.ms/installazurecli) 安裝。
- **Azure 訂閱** — 用於存取 Microsoft Foundry 及 Azure AI Agent Service。
- **Microsoft Foundry 專案** — 需有已部署模型的專案（例如 `gpt-4o`）。請參考下面的 [步驟 1](#步驟-1：建立-microsoft-foundry-專案)。

本倉庫根目錄包含一個 `requirements.txt` 檔案，內含所有執行程式碼範例所需的 Python 套件。

您可以在終端機中於倉庫根目錄執行以下指令安裝：

```bash|powershell
pip install -r requirements.txt
```

建議建立 Python 虛擬環境，以避免套件衝突及問題。

## 設定 VSCode

請確保您在 VSCode 中使用的是正確的 Python 版本。

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## 設置 Microsoft Foundry 和 Azure AI Agent Service

### 步驟 1：建立 Microsoft Foundry 專案

您需要一個 Azure AI Foundry **hub** 與有已部署模型的 <strong>專案</strong>，才能執行筆記本。

1. 前往 [ai.azure.com](https://ai.azure.com)，使用您的 Azure 帳戶登入。
2. 建立一個 **hub**（或使用現有的）。詳見：[Hub 資源概覽](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources)。
3. 在 hub 裡面建立一個 <strong>專案</strong>。
4. 部署一個模型（例如 `gpt-4o`），路徑為 **Models + Endpoints** → **Deploy model**。

### 步驟 2：取得您的專案端點與模型部署名稱

在 Microsoft Foundry 入口網站的您的專案裡：

- <strong>專案端點</strong> — 前往 **Overview** 頁面並複製端點 URL。

![Project Connection String](../../../translated_images/zh-TW/project-endpoint.8cf04c9975bbfbf1.webp)

- <strong>模型部署名稱</strong> — 前往 **Models + Endpoints**，點選您已部署的模型，並記下 **Deployment name**（例如 `gpt-4o`）。

### 步驟 3：使用 `az login` 登入 Azure

所有筆記本都使用 **`AzureCliCredential`** 進行認證 — 不需管理 API 金鑰。這需要您透過 Azure CLI 登入。

1. 如尚未安裝 Azure CLI，請先安裝：[aka.ms/installazurecli](https://aka.ms/installazurecli)

2. 執行登入：

    ```bash|powershell
    az login
    ```

    若在無瀏覽器的遠端/Codespace 環境：

    ```bash|powershell
    az login --use-device-code
    ```

3. 若出現提示，選擇您擁有 Foundry 專案的訂閱。

4. 驗證已登入：

    ```bash|powershell
    az account show
    ```

> **為何使用 `az login`？** 筆記本透過 `azure-identity` 套件的 `AzureCliCredential` 認證，這代表您的 Azure CLI 工作階段提供憑證 — 無需在 `.env` 檔案中存放 API 金鑰或密鑰。這是 [安全最佳實務](https://learn.microsoft.com/azure/developer/ai/keyless-connections)。

### 步驟 4：建立您的 `.env` 檔案

複製範例檔案：

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

打開 `.env` 並填寫以下兩個變數：

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

| 變數名稱 | 資訊來源 |
|----------|---------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry 入口網站 → 您的專案 → **Overview** 頁面 |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry 入口網站 → **Models + Endpoints** → 您部署的模型名稱 |

大部分課程就準備完成！筆記本將自動透過您的 `az login` 工作階段進行認證。

### 步驟 5：安裝 Python 依賴套件

```bash|powershell
pip install -r requirements.txt
```

建議在您先前建立的虛擬環境中執行此命令。

## 課程 5 額外設定（Agentic RAG）

課程 5 使用 **Azure AI Search** 進行檢索增強生成。如果您打算執行該課程，請將下列變數加入 `.env` 檔案：

| 變數名稱 | 資訊來源 |
|----------|---------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure 入口網站 → 您的 **Azure AI Search** 資源 → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure 入口網站 → 您的 **Azure AI Search** 資源 → **Settings** → **Keys** → 主要管理金鑰 |

## 課程 6 及課程 8 額外設定（GitHub 模型）

課程 6 和 8 的部分筆記本使用 **GitHub 模型**，而非 Azure AI Foundry。若您打算執行這些範例，請將以下變數加入您的 `.env` 檔案：

| 變數名稱 | 資訊來源 |
|----------|---------|
| `GITHUB_TOKEN` | GitHub → **Settings** → **Developer settings** → **Personal access tokens** |
| `GITHUB_ENDPOINT` | 使用 `https://models.inference.ai.azure.com`（預設值） |
| `GITHUB_MODEL_ID` | 模型名稱（例如 `gpt-4o-mini`） |

## 替代提供者：MiniMax（OpenAI 相容）

[MiniMax](https://platform.minimaxi.com/) 提供大型上下文模型（最高支援 204K 令牌），透過 OpenAI 相容 API。由於 Microsoft Agent Framework 的 `OpenAIChatClient` 能與任何 OpenAI 相容端點搭配使用，您可以採用 MiniMax 作為 GitHub 模型或 OpenAI 的替代方案。

請將下列變數加入 `.env` 檔案：

| 變數名稱 | 資訊來源 |
|----------|---------|
| `MINIMAX_API_KEY` | [MiniMax 平台](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | 使用 `https://api.minimax.io/v1`（預設值） |
| `MINIMAX_MODEL_ID` | 模型名稱（例如 `MiniMax-M2.7`） |

<strong>可用模型</strong>：`MiniMax-M2.7`（推薦），`MiniMax-M2.7-highspeed`（回應速度更快）

使用 `OpenAIChatClient` 的程式碼範例（例如課程 14 的飯店預訂工作流程）會在設定 `MINIMAX_API_KEY` 時自動偵測並使用您的 MiniMax 配置。

## 課程 8 額外設定（Bing Grounding 工作流程）

課程 8 的條件工作流程筆記本使用透過 Azure AI Foundry 的 **Bing grounding**。若您打算執行該範例，請將此變數加入 `.env` 檔案：

| 變數名稱 | 資訊來源 |
|----------|---------|
| `BING_CONNECTION_ID` | Azure AI Foundry 入口網站 → 您的專案 → **Management** → **Connected resources** → 您的 Bing 連線 → 複製連線 ID |

## 疑難排解

### macOS 上 SSL 證書驗證錯誤

如果您在 macOS 遇到類似錯誤：

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

這是 macOS 上 Python 不自動信任系統 SSL 證書的已知問題。請依序嘗試以下解決方案：

**方案一：執行 Python 的安裝證書腳本（推薦）**

```bash
# 將 3.XX 替換為您安裝的 Python 版本（例如，3.12 或 3.13）：
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**方案二：在筆記本中使用 `connection_verify=False`（僅限 GitHub Models 筆記本）**

在課程 6 筆記本 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) 中已有被註解的解決辦法。建立客戶端時請解除註解 `connection_verify=False`：

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # 如果遇到憑證錯誤，請停用 SSL 驗證
)
```

> **⚠️ 警告：** 關閉 SSL 驗證 (`connection_verify=False`) 會跳過證書驗證，降低安全性。僅建議在開發環境作為臨時解決方案，切勿在生產環境使用。

**方案三：安裝並使用 `truststore`**

```bash
pip install truststore
```

接著在筆記本或腳本頂端加入以下程式碼，於任何網路呼叫前執行：

```python
import truststore
truststore.inject_into_ssl()
```

## 遇到困難？

若執行本設置遇到任何問題，請加入我們的 <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI 社群 Discord</a>，或 <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">提出問題</a>。

## 下一課

您已準備好執行本課程的程式碼。祝您在 AI Agents 世界中學習愉快！

[AI Agents 介紹與使用案例](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。儘管我們盡力確保準確性，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們對於因使用本翻譯所產生的任何誤解或誤譯概不負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->