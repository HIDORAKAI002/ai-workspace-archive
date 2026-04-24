# 課程設定

## 介紹

本課程將介紹如何運行本課程中的程式碼範例。

## 加入其他學習者並獲取幫助

在開始克隆您的倉庫之前，請加入 [AI Agents For Beginners Discord 頻道](https://aka.ms/ai-agents/discord)，以獲取任何設定上的幫助、課程相關問題，或與其他學習者交流。

## 克隆或分叉本倉庫

首先，請克隆或分叉 GitHub 倉庫。這將為您建立本課程材料的專屬版本，讓您能夠運行、測試和調整程式碼！

您可以點擊本連結進行 <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">倉庫分叉</a>

您現在應該擁有您自己的本課程分叉版本，位於以下連結：

![已分叉的倉庫](../../../translated_images/zh-HK/forked-repo.33f27ca1901baa6a.webp)

### 淺層克隆（建議用於工作坊 / Codespaces）

> 完整的倉庫下載包含完整歷史紀錄及所有檔案，可能會很大（約 3 GB）。如果您只參加工作坊或只需要幾個課程資料夾，淺層克隆（或稀疏克隆）可透過截斷歷史記錄和/或跳過 blob，來避免大部分下載。

#### 快速淺層克隆 — 最少歷史，全部檔案

請將以下指令中的 `<your-username>` 替換為您的分叉 URL（或使用上游 URL）。

只克隆最新的提交歷史（下載量小）：

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

克隆指定分支：

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### 部分（稀疏）克隆 — 最少 blob + 只包含指定資料夾

此方法會使用部分克隆和 sparse-checkout（需 Git 2.25+，並建議使用支援部分克隆的現代 Git）：

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

進入倉庫資料夾：

```bash|powershell
cd ai-agents-for-beginners
```

然後指定您想要的資料夾（以下範例顯示兩個資料夾）：

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

克隆並確認檔案後，如果您只需要文件並想釋放空間（無需 git 歷史），請刪除倉庫元資料（💀不可逆 — 將失去所有 Git 功能：無法提交、拉取、推送或存取歷史）。

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### 使用 GitHub Codespaces（建議避免本機大量下載）

- 通過 [GitHub UI](https://github.com/codespaces) 為此倉庫建立新的 Codespace。

- 在新建立的 Codespace 終端，執行上面任一淺層/稀疏克隆指令，以只帶入您需要的課程資料夾至 Codespace 工作區。
- 選擇性：克隆完成後可在 Codespaces 中移除 .git 以回收額外空間（參考上述移除指令）。
- 注意：若您選擇直接在 Codespaces 開啟倉庫（不另外克隆），請注意 Codespaces 將建立 devcontainer 環境，可能仍會佔用超過您需求的空間。重開的 Codespace 中再淺層克隆能讓您更好控制磁碟使用量。

#### 小提示

- 若想編輯或提交，請務必替換成您的分叉 URL。
- 若日後需要更多歷史或檔案，可以使用 fetch 或調整 sparse-checkout 以包含更多資料夾。

## 執行程式碼

本課程提供一系列 Jupyter 筆記本，讓您可以實際操作，體驗 AI Agents 的構建。

程式碼範例使用 **Microsoft Agent Framework (MAF)** 中的 `AzureAIProjectAgentProvider`，連接到透過 **Microsoft Foundry** 的 **Azure AI Agent Service V2**（Responses API）。

所有 Python 筆記本檔案均標註為 `*-python-agent-framework.ipynb`。

## 需求

- Python 3.12+
  - <strong>注意</strong>：若尚未安裝 Python3.12，請務必安裝，然後使用 python3.12 建立虛擬環境，以確保從 requirements.txt 取得正確版本的套件。
  
    >示例

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

- .NET 10+：針對使用 .NET 的範例程式碼，請安裝 [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) 或更高版本。並檢查已安裝的 .NET SDK 版本：

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — 必要以進行認證。請從 [aka.ms/installazurecli](https://aka.ms/installazurecli) 安裝。
- **Azure 訂閱** — 用於存取 Microsoft Foundry 和 Azure AI Agent Service。
- **Microsoft Foundry 專案** — 需建立且已部署模型的專案（例如 `gpt-4o`）。詳見下方 [步驟 1](#步驟-1：建立-microsoft-foundry-專案)。

此倉庫根目錄包含 `requirements.txt`，內有運行程式碼範例所需的所有 Python 套件。

您可以在終端於倉庫根目錄執行以下指令安裝：

```bash|powershell
pip install -r requirements.txt
```

我們建議您建立 Python 虛擬環境以避免衝突和問題。

## 設定 VSCode

請確認 VSCode 中使用的是正確版本的 Python。

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## 設定 Microsoft Foundry 與 Azure AI Agent Service

### 步驟 1：建立 Microsoft Foundry 專案

要運行筆記本，您需要一個有模型部署的 Azure AI Foundry **hub** 和 <strong>專案</strong>。

1. 前往 [ai.azure.com](https://ai.azure.com) ，使用您的 Azure 帳戶登入。
2. 建立一個 **hub**（或使用現有的）。參考：[Hub 資源總覽](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources)。
3. 在該 hub 內建立一個 <strong>專案</strong>。
4. 從 **Models + Endpoints** → **Deploy model** 部署模型（例如 `gpt-4o`）。

### 步驟 2：取得專案端點與模型部署名稱

於 Microsoft Foundry 入口網站您的專案中：

- <strong>專案端點</strong> — 前往 **Overview（概覽）** 頁面，複製端點 URL。

![專案連接字串](../../../translated_images/zh-HK/project-endpoint.8cf04c9975bbfbf1.webp)

- <strong>模型部署名稱</strong> — 前往 **Models + Endpoints（模型 + 端點）**，選擇您部署的模型，記下 **Deployment name（部署名稱）**（例如 `gpt-4o`）。

### 步驟 3：使用 `az login` 登入 Azure

所有筆記本使用 **`AzureCliCredential`** 進行認證 — 無需管理 API 金鑰。您必須透過 Azure CLI 登入。

1. 若尚未安裝，安裝 Azure CLI：[aka.ms/installazurecli](https://aka.ms/installazurecli)

2. 執行登入指令：

    ```bash|powershell
    az login
    ```

    如果您在無瀏覽器的遠端 / Codespace 環境：

    ```bash|powershell
    az login --use-device-code
    ```

3. 若有提示，選擇您的訂閱 — 請選含有 Foundry 專案的訂閱。

4. 確認已登入：

    ```bash|powershell
    az account show
    ```

> **為何要用 `az login`？** 筆記本透過 `azure-identity` 套件的 `AzureCliCredential` 進行認證，您的 Azure CLI 會話即為憑證來源 — 無需在 `.env` 中保存 API 金鑰或秘密。這是 [安全最佳實踐](https://learn.microsoft.com/azure/developer/ai/keyless-connections)。

### 步驟 4：建立您的 `.env` 檔案

複製範例檔：

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

打開 `.env` 並填寫以下兩項數值：

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

| 變數 | 取得位置 |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry 入口網站 → 您的專案 → **Overview（概覽）** 頁面 |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry 入口網站 → **Models + Endpoints** → 您部署模型的名稱 |

大部分課程就此完成！筆記本將透過您的 `az login` 會話自動認證。

### 步驟 5：安裝 Python 依賴套件

```bash|powershell
pip install -r requirements.txt
```

我們建議於您先前建立的虛擬環境中執行此安裝。

## 課程 5 額外設定（Agentic RAG）

課程 5 使用 **Azure AI Search** 進行檢索強化生成。如果計畫運行此課，請將以下變數加入 `.env`：

| 變數 | 取得位置 |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure 入口網站 → 您的 **Azure AI Search** 資源 → **Overview（概覽）** → URL |
| `AZURE_SEARCH_API_KEY` | Azure 入口網站 → 您的 **Azure AI Search** 資源 → **Settings（設定）** → **Keys（金鑰）** → 主要管理金鑰 |

## 課程 6 與 8 額外設定（GitHub Models）

課程 6 與 8 的部分筆記本使用 **GitHub Models**，非 Azure AI Foundry。如果您要運行這些範例，請加入下列變數至 `.env`：

| 變數 | 取得位置 |
|----------|-----------------|
| `GITHUB_TOKEN` | GitHub → **Settings（設定）** → **Developer settings（開發者設定）** → **Personal access tokens（個人訪問權杖）** |
| `GITHUB_ENDPOINT` | 請使用 `https://models.inference.ai.azure.com`（預設值） |
| `GITHUB_MODEL_ID` | 使用的模型名稱（例如 `gpt-4o-mini`） |

## 另一供應商：MiniMax（OpenAI 兼容）

[MiniMax](https://platform.minimaxi.com/) 提供大型上下文模型（最高支援 204K 代幣），並且支持 OpenAI 相容的 API。Microsoft Agent Framework 的 `OpenAIChatClient` 可與任何 OpenAI 兼容端點配合使用，因此您可以將 MiniMax 視為 GitHub Models 或 OpenAI 的替代方案。

請將以下變數加入 `.env`：

| 變數 | 取得位置 |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax 平台](https://platform.minimaxi.com/) → API 金鑰 |
| `MINIMAX_BASE_URL` | 請使用 `https://api.minimax.io/v1`（預設值） |
| `MINIMAX_MODEL_ID` | 使用的模型名稱（例如 `MiniMax-M2.7`） |

<strong>可用模型</strong>：`MiniMax-M2.7`（推薦），`MiniMax-M2.7-highspeed`（較快回應）

使用 `OpenAIChatClient` 的程式碼範例（如課程 14 的旅館預訂工作流程）會在偵測到設定了 `MINIMAX_API_KEY` 時，自動使用您的 MiniMax 設定。

## 課程 8 額外設定（Bing Grounding 工作流程）

課程 8 中的條件工作流程筆記本使用透過 Azure AI Foundry 的 **Bing grounding**。若計畫運作該範例，請加入下列變數至 `.env`：

| 變數 | 取得位置 |
|----------|-----------------|
| `BING_CONNECTION_ID` | Azure AI Foundry 入口網站 → 您的專案 → **Management（管理）** → **Connected resources（已連線資源）** → 您的 Bing 連線 → 複製連線 ID |

## 疑難排解

### macOS 上的 SSL 憑證驗證錯誤

若您在 macOS 遇到類似錯誤：

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

這是 Python 在 macOS 上的一個已知問題，系統 SSL 憑證不會自動被信任。請依序嘗試下列解決方案：

**選項 1：執行 Python 的 Install Certificates 腳本（推薦）**

```bash
# 將 3.XX 替換成你已安裝的 Python 版本（例如：3.12 或 3.13）：
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**選項 2：在筆記本中使用 `connection_verify=False`（僅限 GitHub Models 筆記本）**

在課程 6 筆記本 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) 中，已有註解的臨時解決方法。建立 client 時取消註解 `connection_verify=False`：

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # 如果遇到證書錯誤，請禁用 SSL 驗證
)
```

> **⚠️ 警告：** 關閉 SSL 驗證 (`connection_verify=False`) 會跳過憑證檢查，降低安全性。僅在開發環境作為臨時方案使用，生產環境請勿使用。

**選項 3：安裝並使用 `truststore`**

```bash
pip install truststore
```

然後在筆記本或腳本開頭，執行呼叫任何網路前加入：

```python
import truststore
truststore.inject_into_ssl()
```

## 卡住了嗎？

若在設定過程中有任何疑問，歡迎加入我們的 <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a>，或 <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">建立 issue</a>。

## 下一課程

您現在已準備好執行本課程的程式碼。祝您學習 AI Agents 世界愉快！

[AI Agents 介紹及代理應用案例](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件乃使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保翻譯的準確性，但請注意，自動翻譯可能包含錯誤或不準確之處。原文件的原語版本應被視為權威來源。對於關鍵資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->