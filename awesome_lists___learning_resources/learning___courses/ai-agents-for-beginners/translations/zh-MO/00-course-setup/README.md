# 課程設置

## 簡介

本課程將涵蓋如何執行本課程的程式碼範例。

## 加入其他學習者並獲得幫助

開始克隆您的倉庫之前，請加入 [AI Agents For Beginners Discord 頻道](https://aka.ms/ai-agents/discord)，以獲得任何安裝幫助、課程相關問題，或與其他學習者交流。

## 克隆或分叉此倉庫

請先克隆或分叉 GitHub 倉庫。這將製作您自己的課程材料版本，讓您可以執行、測試及調整程式碼！

您可以點擊<a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">分叉此倉庫</a>的連結來完成這個動作

您現在應該擁有以下連結的課程分叉版本：

![Forked Repo](../../../translated_images/zh-MO/forked-repo.33f27ca1901baa6a.webp)

### 淺層克隆（建議用於工作坊 / Codespaces）

  >完整的倉庫下載完整歷史和所有檔案可能會很大（約 3 GB）。如果您只參加工作坊或只需要幾個課程資料夾，淺層克隆（或稀疏克隆）可透過截斷歷史及/或跳過 Blob 來避免大部分下載。

#### 快速淺層克隆—最少歷史，全部檔案

將以下指令中的 `<your-username>` 替換為您的分叉 URL（或您偏好的上游 URL）。

只克隆最新的提交歷史（下載量小）：

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

克隆特定分支：

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### 部分（稀疏）克隆—最少 Blob + 僅選定資料夾

這使用部分克隆和稀疏簽出（需要 Git 2.25+，建議使用支援部分克隆的現代 Git）：

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

進入倉庫資料夾：

```bash|powershell
cd ai-agents-for-beginners
```

然後指定您需要的資料夾（下例示範兩個資料夾）：

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

克隆並驗證檔案後，如果您只需檔案並想釋放空間（無需 Git 歷史），請刪除倉庫元資料（💀不可逆 — 您將失去所有 Git 功能：無提交、拉取、推送或歷史存取）。

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### 使用 GitHub Codespaces（建議避免本機大容量下載）

- 透過 [GitHub UI](https://github.com/codespaces) 為此倉庫建立新的 Codespace。  

- 在新建立的 Codespace 終端機中，執行上述淺層／稀疏克隆指令之一，僅帶入您需要的課程資料夾到 Codespace 工作區。
- 選擇性：在 Codespaces 中完成克隆後，移除 .git 以回收額外空間（請見上述移除指令）。
- 注意：如果您直接在 Codespaces 開啟倉庫（不另行克隆），Codespaces 將建構 devcontainer 環境，可能仍會配置超出您需求的內容。於全新 Codespace 中淺層克隆，讓您更好控管磁碟使用。

#### 小提示

- 若要編輯／提交，請務必換成您的分叉 URL。
- 後續若需更多歷史或檔案，可取回它們或調整稀疏簽出以包含更多資料夾。

## 執行程式碼

本課程提供一系列 Jupyter Notebook，讓您實作建構 AI 代理的經驗。

程式碼範例使用 **Microsoft Agent Framework (MAF)** 之 `FoundryChatClient`，連接至 **Microsoft Foundry Agent Service V2**（Responses API）透過 **Microsoft Foundry**。

所有 Python 筆記本皆標示為 `*-python-agent-framework.ipynb`。

## 需求

- Python 3.12+
  - <strong>注意</strong>：若尚未安裝 Python 3.12，請務必安裝。然後使用 python3.12 建立您的虛擬環境，以確保從 requirements.txt 安裝正確版本。
  
    >範例

    建立 Python 虛擬環境資料夾：

    ```bash|powershell
    python -m venv venv
    ```

    之後啟動虛擬環境：

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+：使用 .NET 範例碼，請安裝 [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) 或以後版本。然後檢查已安裝的 .NET SDK 版本：

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — 必須安裝用於身份驗證。安裝網址為 [aka.ms/installazurecli](https://aka.ms/installazurecli)。
- **Azure 訂閱** — 用於存取 Microsoft Foundry 和 Microsoft Foundry Agent Service。
- **Microsoft Foundry 專案** — 需有部署模型的專案（例如 `gpt-4.1-mini`）。參見下方 [第一步驟](#步驟-1：建立-microsoft-foundry-專案)。

此倉庫根目錄有 `requirements.txt` 檔案，含所有執行程式碼範例所需的 Python 套件。

您可在倉庫根目錄的終端機執行下列指令安裝：

```bash|powershell
pip install -r requirements.txt
```

我們建議建立 Python 虛擬環境，以避免任何衝突和問題。

## 設定 VSCode

確認您在 VSCode 中使用正確版本的 Python。

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## 設定 Microsoft Foundry 與 Microsoft Foundry Agent Service

### 步驟 1：建立 Microsoft Foundry 專案

您需要一個 Microsoft Foundry 的 **hub** 和 <strong>專案</strong>，並部署模型才能執行筆記本。

1. 前往 [ai.azure.com](https://ai.azure.com) 並使用您的 Azure 帳戶登入。
2. 建立一個 **hub**（或使用現有的）。參見：[Hub 資源概述](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources)。
3. 在 hub 裡建立一個 <strong>專案</strong>。
4. 從 **Models + Endpoints** → **Deploy model** 部署模型（例如 `gpt-4.1-mini`）。

### 步驟 2：取得您的專案端點及模型部署名稱

從 Foundry 專案入口網站：

- <strong>專案端點</strong> — 進入 **Overview** 頁面並複製端點 URL。

![Project Connection String](../../../translated_images/zh-MO/project-endpoint.8cf04c9975bbfbf1.webp)

- <strong>模型部署名稱</strong> — 前往 **Models + Endpoints**，選擇您部署的模型，並記下 **Deployment name**（例如 `gpt-4.1-mini`）。

### 步驟 3：以 `az login` 登入 Azure

所有筆記本使用 **`AzureCliCredential`** 進行身份驗證 — 無需管理 API 密鑰。此作法需要您透過 Azure CLI 登入。

1. 若尚未安裝 **Azure CLI**，請安裝：[aka.ms/installazurecli](https://aka.ms/installazurecli)

2. 執行以下指令登入：

    ```bash|powershell
    az login
    ```

    如身處無瀏覽器的遠端/Codespace 環境：

    ```bash|powershell
    az login --use-device-code
    ```

3. 如有提示，請選擇您的訂閱 — 選擇包含您 Foundry 專案的訂閱。

4. 驗證登入狀態：

    ```bash|powershell
    az account show
    ```

> **為何使用 `az login`？** 筆記本透過 `azure-identity` 套件的 `AzureCliCredential` 進行認證。這表示您的 Azure CLI 會話提供憑證 — 無需在 `.env` 檔中保存 API 密鑰或密碼。這是 [安全最佳實踐](https://learn.microsoft.com/azure/developer/ai/keyless-connections)。

### 步驟 4：建立您的 `.env` 檔案

複製示範檔案：

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

開啟 `.env` 並填寫下列兩個值：

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| 變數 | 位置 |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry 入口 → 您的專案 → **Overview** 頁面 |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry 入口 → **Models + Endpoints** → 您部署模型名稱 |

大多數課程就這樣完成了！筆記本將透過您的 `az login` 會話自動驗證。

### 步驟 5：安裝 Python 依賴套件

```bash|powershell
pip install -r requirements.txt
```

建議在先前建立的虛擬環境中執行此安裝。

## 課程 5 額外設定（Agentic RAG）

課程 5 使用 **Azure AI Search** 進行增強檢索生成。如果您要執行該課程，請於 `.env` 檔中新增以下變數：

| 變數 | 位置 |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure 入口 → 您的 **Azure AI Search** 資源 → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure 入口 → 您的 **Azure AI Search** 資源 → **Settings** → **Keys** → 主要管理密鑰 |

## 直接呼叫 Azure OpenAI 的課程額外設定（課程 6 和 8）

部分課程 6 和 8 的筆記本直接呼叫 **Azure OpenAI**（使用 **Responses API**），而不是透過 Microsoft Foundry 專案。這些範例之前使用 GitHub Models，但該項目已於 2026 年 7 月退役且不支援 Responses API。如果要執行這些範例，請於 `.env` 檔新增以下變數：

| 變數 | 位置 |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Azure 入口 → 您的 **Azure OpenAI** 資源 → **Keys and Endpoint** → 端點（例如 `https://<your-resource>.openai.azure.com`） |
| `AZURE_OPENAI_DEPLOYMENT` | 您已部署支持 Responses API 之模型的名稱（例如 `gpt-4.1-mini`） |
| `AZURE_OPENAI_API_KEY` | 可選 — 僅在您使用基於密鑰的驗證而非 `az login` / Entra ID 時需要 |

> Responses API 使用穩定的 `/openai/v1/` 端點，因此不需 `api-version`。使用 `az login` 登入以啟用無密鑰的 Entra ID 認證。

## 替代供應商：MiniMax（OpenAI 兼容）

[MiniMax](https://platform.minimaxi.com/) 提供大上下文模型（最高 204K 代幣），透過 OpenAI 兼容的 API。因為 Microsoft Agent Framework 的 `OpenAIChatClient` 支援任何 OpenAI 兼容端點，您可以將 MiniMax 作為 Azure OpenAI 或 OpenAI 的直接替代方案。

請在 `.env` 檔中新增以下變數：

| 變數 | 位置 |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax 平台](https://platform.minimaxi.com/) → API 密鑰 |
| `MINIMAX_BASE_URL` | 使用 `https://api.minimax.io/v1`（預設值） |
| `MINIMAX_MODEL_ID` | 欲使用模型名稱（例如 `MiniMax-M3`） |

<strong>範例模型</strong>：`MiniMax-M3`（推薦）、`MiniMax-M2.7`、`MiniMax-M2.7-highspeed`（更快回應）。模型名稱及可用性會隨時間變動，且存取權限可能依賬戶或區域不同而異 — 請查看 [MiniMax 平台](https://platform.minimaxi.com/) 以獲得最新清單。若您的帳戶無法使用 `MiniMax-M3`，請將 `MINIMAX_MODEL_ID` 設為您可存取的模型（例如 `MiniMax-M2.7`）。

使用 `OpenAIChatClient` 的程式碼範例（如課程 14 酒店預訂工作流程）會在設定 `MINIMAX_API_KEY` 時自動偵測並使用您的 MiniMax 設定。

## 替代供應商：Foundry Local（在設備上運行模型）

[Foundry Local](https://foundrylocal.ai) 是輕量級執行環境，能在您自己的機器上完全下載、管理及服務語言模型，透過 OpenAI 兼容的 API — 無需雲端、Azure 訂閱或 API 密鑰。適合離線開發、無雲端費用測試或資料保留在設備上的需求。

由於 Microsoft Agent Framework 的 `OpenAIChatClient` 能與任何 OpenAI 兼容端點合作，Foundry Local 是 Azure OpenAI 的本地替代解決方案。

**1. 安裝 Foundry Local**

```bash
# Windows 作業系統
winget install Microsoft.FoundryLocal

# macOS 作業系統
brew install foundrylocal
```

**2. 下載並運行模型**（這同時啟動本地服務）：

```bash
foundry model list          # 查看可用模型
foundry model run phi-4-mini
```

**3. 安裝用於發現本地端點的 Python SDK：**

```bash
pip install foundry-local-sdk
```

**4. 指向 Microsoft Agent Framework 至本地模型：**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# 下載（如有需要）並在本地提供模型，然後發現端點/端口。
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # 例如 http://localhost:<port>/v1
    api_key=manager.api_key,        # 對於 Foundry Local 一律為「不需要」
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **注意：** Foundry Local 提供 OpenAI 兼容的 **聊天完成（Chat Completions）** 端點。用於本地開發與離線情境。若需使用完整 **Responses API** 功能集（有狀態對話、深度工具協同及代理風格開發），請使用課程示範的 **Azure OpenAI** 或 **Microsoft Foundry** 專案。詳情請參閱 [Foundry Local 文件](https://foundrylocal.ai) 以瞭解目前模型目錄及平台支持。


## 課程第8課的額外設置（Bing 基地工作流程）

第8課中的條件工作流程筆記本使用了透過 Microsoft Foundry 的 **Bing 基地**。如果您打算運行該範例，請將此變量添加到您的 `.env` 檔案中：

| 變量 | 位置 |
|----------|-----------------|
| `BING_CONNECTION_ID` | Microsoft Foundry 入口網站 → 您的專案 → <strong>管理</strong> → <strong>已連接的資源</strong> → 您的 Bing 連接 → 複製連接 ID |

## 疑難排解

### macOS 上的 SSL 證書驗證錯誤

如果您在 macOS 上遇到類似以下的錯誤：

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

這是 macOS 上 Python 的已知問題，系統的 SSL 證書不會自動被信任。請按順序嘗試以下解決方案：

**選項 1：運行 Python 的安裝證書腳本（推薦）**

```bash
# 將 3.XX 替換為您安裝的 Python 版本（例如：3.12 或 3.13）：
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**選項 2：在您的筆記本中使用 `connection_verify=False`（僅針對 GitHub 模型筆記本）**

在第6課的筆記本（`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`）中，已包含註解的解決方法。建立客戶端時取消註解 `connection_verify=False`：

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # 如果您遇到證書錯誤，請禁用 SSL 驗證
)
```

> **⚠️ 警告：** 禁用 SSL 驗證（`connection_verify=False`）會透過跳過證書驗證而降低安全性。僅在開發環境中作為臨時解決方法使用，切勿在生產環境中使用。

**選項 3：安裝並使用 `truststore`**

```bash
pip install truststore
```

然後在筆記本或腳本頂部，在任何網絡調用之前添加以下內容：

```python
import truststore
truststore.inject_into_ssl()
```

## 卡住了嗎？

如果您在設置此過程中遇到任何問題，歡迎加入我們的 <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI 社區 Discord</a> 或 <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">建立問題回報</a>。

## 下一課

您現在已準備好運行本課程的程式碼。祝您在 AI Agent 的世界中學習愉快！

[AI 代理介紹及代理使用案例](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->