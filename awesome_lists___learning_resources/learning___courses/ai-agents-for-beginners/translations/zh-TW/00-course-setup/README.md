# 課程設置

## 介紹

本課程將涵蓋如何執行此課程的程式碼範例。

## 加入其他學習者並取得協助

在開始複製您的程式庫之前，請加入 [AI Agents For Beginners Discord 頻道](https://aka.ms/ai-agents/discord)，以獲得設定協助、課程相關問題解答，或與其他學習者交流。

## 複製或派生此程式庫

開始之前，請複製或派生 GitHub 程式庫。這樣您就會擁有課程資料的專屬版本，可以執行、測試及調整程式碼！

您可以點擊此連結 <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">派生此程式庫</a>

現在您應該擁有此課程的派生版本，連結如下：

![Forked Repo](../../../translated_images/zh-TW/forked-repo.33f27ca1901baa6a.webp)

### 淺層複製（推薦用於工作坊 / Codespaces）

  >當您下載完整歷史紀錄與所有檔案時，完整程式庫可能很大（約 3 GB）。如果您只參加工作坊或只需要幾個課程資料夾，淺層複製（或稀疏複製）可透過截斷歷史紀錄和／或跳過 blob，大幅減少下載量。

#### 快速淺層複製 — 最少歷史紀錄、所有檔案

將下列指令中的 `<your-username>` 替換為您的 fork URL（或如果您偏好，上游的 URL）。

只克隆最新的提交歷史（下載量小）：

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

克隆特定分支：

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### 部分（稀疏）複製 — 最少 blobs + 僅選取的資料夾

使用部分複製與稀疏檢出（需要 Git 2.25+，建議使用支援部分複製的現代 Git）：

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

進入程式庫資料夾：

```bash|powershell
cd ai-agents-for-beginners
```

然後指定您想要的資料夾（以下範例顯示有兩個資料夾）：

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

完成複製並確認檔案後，如果您只需要檔案並希望釋放空間（無需 git 歷史），請刪除程式庫的元資料（💀不可逆 — 您將失去所有 Git 功能：無法提交、拉取、推送或存取歷史）。

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### 使用 GitHub Codespaces（推薦以避免本地大規模下載）

- 透過 [GitHub UI](https://github.com/codespaces) 為此程式庫建立新的 Codespace。  

- 在新建立的 Codespace 終端機中，執行上述淺層／稀疏複製指令，僅將您需要的課程資料夾帶入 Codespace 工作區。
- 選擇性：在 Codespaces 中複製完成後，刪除 .git 以回收更多空間（參閱以上刪除指令）。
- 注意：如果您偏好直接在 Codespaces 中開啟程式庫（無需額外複製），請注意 Codespaces 會建置 devcontainer 環境，可能仍會配置超出您所需的內容。在新的 Codespace 內部淺層複製可讓您對磁碟使用量有更佳控制。

#### 小提示

- 如果您想編輯／提交，務必將複製 URL 替換為您的 fork。
- 如果日後需要更多歷史或檔案，可以擷取它們或調整稀疏檢出以包含其他資料夾。

## 執行程式碼

本課程提供一系列 Jupyter 筆記本，讓您透過實作體驗建立 AI Agents。

程式碼範例使用 **Microsoft Agent Framework (MAF)** 與 `FoundryChatClient`，連接至透過 **Microsoft Foundry** 的 **Microsoft Foundry Agent Service V2**（Responses API）。

所有 Python 筆記本皆標示為 `*-python-agent-framework.ipynb`。

## 系統需求

- Python 3.12+
  - <strong>注意</strong>：如果您尚未安裝 Python 3.12，請務必安裝。然後使用 python3.12 建立您的虛擬環境，確保從 requirements.txt 安裝正確版本。
  
    >範例

    建立 Python 虛擬環境資料夾：

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

- .NET 10+：使用 .NET 的範例程式碼請確定安裝 [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) 或更新版本。接著檢查您安裝的 .NET SDK 版本：

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — 必須有以進行身份驗證。安裝網址 [aka.ms/installazurecli](https://aka.ms/installazurecli)。
- **Azure 訂閱** — 用於存取 Microsoft Foundry 及 Microsoft Foundry Agent Service。
- **Microsoft Foundry 專案** — 已部署模型的專案（例如 `gpt-4.1-mini`）。詳見下方 [步驟 1](#步驟-1：建立-microsoft-foundry-專案)。

我們在本程式庫根目錄提供了 `requirements.txt` ，內含執行範例程式碼所需的所有 Python 套件。

您可以在程式庫根目錄終端機輸入以下指令安裝：

```bash|powershell
pip install -r requirements.txt
```

建議您建立 Python 虛擬環境以避免衝突及問題。

## 設定 VSCode

請確定您在 VSCode 使用的是正確版本的 Python。

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## 設定 Microsoft Foundry 與 Microsoft Foundry Agent Service

### 步驟 1：建立 Microsoft Foundry 專案

您需要一個 Microsoft Foundry **hub** 與一個部署了模型的 <strong>專案</strong> 來執行筆記本。

1. 前往 [ai.azure.com](https://ai.azure.com)，並使用您的 Azure 帳號登入。
2. 建立一個 **hub**（或使用現有的）。詳見：[Hub 資源概述](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources)。
3. 在 hub 內建立一個 <strong>專案</strong>。
4. 從 **Models + Endpoints** → **Deploy model** 部署一個模型（例如 `gpt-4.1-mini`）。

### 步驟 2：取得您的專案端點與模型部署名稱

在 Microsoft Foundry 門戶網站的專案中：

- <strong>專案端點</strong> — 前往 **Overview** 頁面，複製端點 URL。

![Project Connection String](../../../translated_images/zh-TW/project-endpoint.8cf04c9975bbfbf1.webp)

- <strong>模型部署名稱</strong> — 前往 **Models + Endpoints**，選擇所部署的模型，並記下 **Deployment name**（例如 `gpt-4.1-mini`）。

### 步驟 3：使用 `az login` 登入 Azure

所有筆記本均使用 **`AzureCliCredential`** 進行身份驗證 — 無需管理 API 金鑰。這需要您透過 Azure CLI 登入。

1. 如果尚未安裝，請先安裝 Azure CLI：[aka.ms/installazurecli](https://aka.ms/installazurecli)

2. 執行以下指令登入：

    ```bash|powershell
    az login
    ```

    如果您在無瀏覽器的遠端或 Codespace 環境中：

    ```bash|powershell
    az login --use-device-code
    ```

3. 如有提示，選擇您的訂閱 — 請選包含 Foundry 專案的訂閱。

4. 驗證您已登入：

    ```bash|powershell
    az account show
    ```

> **為何使用 `az login`？** 筆記本使用來自 `azure-identity` 套件的 `AzureCliCredential` 來認證，這表示您的 Azure CLI 會話提供了憑證 — 無需在 `.env` 檔案中放置 API 金鑰或祕密。這是個 [安全最佳實踐](https://learn.microsoft.com/azure/developer/ai/keyless-connections)。

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

開啟 `.env` 並填入這兩個數值：

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| 變數 | 取得位置 |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry 門戶 → 您的專案 → **Overview** 頁面 |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry 門戶 → **Models + Endpoints** → 您所部署模型的名稱 |

多數課程就到此為止！筆記本會自動透過您的 `az login` 會話進行身份驗證。

### 步驟 5：安裝 Python 相依套件

```bash|powershell
pip install -r requirements.txt
```

建議在您先前建立的虛擬環境中執行此指令。

## 課程 5 額外設定（Agentic RAG）

課程 5 使用 **Azure AI Search** 進行檢索增強生成。如果您計畫執行此課程，請在 `.env` 檔案中加入以下變數：

| 變數 | 取得位置 |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure 入口網站 → 您的 **Azure AI Search** 資源 → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure 入口網站 → 您的 **Azure AI Search** 資源 → **Settings** → **Keys** → 主要管理員金鑰 |

## 直接呼叫 Azure OpenAI 的課程額外設定（課程 6 和 8）

課程 6 和 8 的部分筆記本直接呼叫 **Azure OpenAI**（使用 **Responses API**），不經過 Microsoft Foundry 專案。這些範例先前使用已停用（2026 年 7 月退役）的 GitHub 模型，該模型不支援 Responses API。如果您要執行這些範例，請在 `.env` 檔案中加入這些變數：

| 變數 | 取得位置 |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Azure 入口網站 → 您的 **Azure OpenAI** 資源 → **Keys and Endpoint** → 端點（例：`https://<your-resource>.openai.azure.com`） |
| `AZURE_OPENAI_DEPLOYMENT` | 您部署的模型名稱（例：`gpt-4.1-mini`），需支援 Responses API |
| `AZURE_OPENAI_API_KEY` | 選用 — 僅當您使用基於金鑰的認證而非 `az login` / Entra ID 時需設定 |

> Responses API 使用穩定的 `/openai/v1/` 端點，因此不需要 `api-version`。請使用 `az login` 進行無需金鑰的 Entra ID 身份驗證。

## 替代提供者：MiniMax（相容 OpenAI）

[MiniMax](https://platform.minimaxi.com/) 透過相容 OpenAI 的 API 提供大上下文模型（最高 204K 代幣）。由於 Microsoft Agent Framework 的 `OpenAIChatClient` 可使用任何相容 OpenAI 的端點，您可以將 MiniMax 作為 Azure OpenAI 或 OpenAI 的替代方案。

請在 `.env` 檔案添加這些變數：

| 變數 | 取得位置 |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API 金鑰 |
| `MINIMAX_BASE_URL` | 使用 `https://api.minimax.io/v1`（預設值） |
| `MINIMAX_MODEL_ID` | 要使用的模型名稱（例：`MiniMax-M3`） |

<strong>示例模型</strong>：`MiniMax-M3`（推薦）、`MiniMax-M2.7`、`MiniMax-M2.7-highspeed`（回應較快）。模型名稱及可用性會變動，且可用模型受帳號或區域影響 — 請查看 [MiniMax Platform](https://platform.minimaxi.com/) 獲得最新列表。若您的帳號無法使用 `MiniMax-M3`，請設定 `MINIMAX_MODEL_ID` 為您有權使用的模型（如 `MiniMax-M2.7`）。

使用 `OpenAIChatClient` 的程式碼範例（如課程 14 飯店訂房工作流程）會在設定 `MINIMAX_API_KEY` 後自動偵測並套用您的 MiniMax 設定。

## 替代提供者：Foundry Local（本機執行模型）

[Foundry Local](https://foundrylocal.ai) 是一個輕量級執行環境，下載、管理及透過相容 OpenAI 的 API 在 <strong>您自己的機器完全離線</strong> 執行語言模型 — 無需雲端、無需 Azure 訂閱、無需 API 金鑰。這對於離線開發、實驗不產生雲端成本或資料保留在本機是極佳選擇。

由於 Microsoft Agent Framework 的 `OpenAIChatClient` 可搭配任何相容 OpenAI 的端點，Foundry Local 是 Azure OpenAI 的本機替代方案。

**1. 安裝 Foundry Local**

```bash
# Windows 作業系統
winget install Microsoft.FoundryLocal

# macOS 作業系統
brew install foundrylocal
```

**2. 下載並運行模型**（同時啟動本機服務）：

```bash
foundry model list          # 查看可用的模型
foundry model run phi-4-mini
```

**3. 安裝用於偵測本機端點的 Python SDK：**

```bash
pip install foundry-local-sdk
```

**4. 指定 Microsoft Agent Framework 使用您的本機模型：**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# 下載（如果需要）並在本地提供模型，然後發現端點/埠口。
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # 例如 http://localhost:<port>/v1
    api_key=manager.api_key,        # 對於 Foundry Local 永遠是「不需要」
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **注意：** Foundry Local 提供相容 OpenAI 的 **Chat Completions** 端點。適用於本機開發與離線場景。若需完整的 **Responses API** 功能（狀態對話、深入工具串接與智能代理開發），請目標 Azure OpenAI 或 Microsoft Foundry 專案，如各課程所示。詳見 [Foundry Local 文件](https://foundrylocal.ai) 以了解最新模型目錄與平台支援。


## 課程 8 的額外設定 (Bing 接地工作流程)

課程 8 中條件工作流程筆記本使用透過 Microsoft Foundry 的 **Bing 接地**。如果你打算執行該範例，請將此變數加入你的 `.env` 檔案：

| 變數 | 取得位置 |
|----------|-----------------|
| `BING_CONNECTION_ID` | Microsoft Foundry 入口網站 → 你的專案 → <strong>管理</strong> → <strong>連接資源</strong> → 你的 Bing 連線 → 複製連線 ID |

## 疑難排解

### macOS 上的 SSL 憑證驗證錯誤

如果你在 macOS 遇到如下錯誤：

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

這是 macOS 上 Python 的已知問題，系統的 SSL 憑證不會自動被信任。請依序嘗試以下解決方案：

**方案一：執行 Python 的 Install Certificates 腳本（推薦）**

```bash
# 將 3.XX 替換為您安裝的 Python 版本（例如，3.12 或 3.13）：
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**方案二：在你的筆記本中使用 `connection_verify=False`（只適用於 GitHub Models 筆記本）**

在課程 6 的筆記本 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) 中，已有註解掉的解決方法。建立客戶端時解除註解 `connection_verify=False`：

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # 如果遇到證書錯誤，請停用 SSL 驗證
)
```

> **⚠️ 警告：** 關閉 SSL 驗證 (`connection_verify=False`) 會跳過憑證驗證，降低安全性。此解法僅能作為開發環境的臨時權宜之計，切勿在生產環境中使用。

**方案三：安裝並使用 `truststore`**

```bash
pip install truststore
```

然後在你的筆記本或腳本頂部，於任何網路請求前，加入以下內容：

```python
import truststore
truststore.inject_into_ssl()
```

## 卡住了嗎？

如果你在執行設定時遇到任何問題，歡迎加入我們的 <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI 社群 Discord</a> 或 <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">建立問題回報</a>。

## 下一課

你現在已準備好執行本課程的程式碼。祝你在 AI Agents 世界中學習愉快！

[AI Agents 簡介與代理應用案例](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->