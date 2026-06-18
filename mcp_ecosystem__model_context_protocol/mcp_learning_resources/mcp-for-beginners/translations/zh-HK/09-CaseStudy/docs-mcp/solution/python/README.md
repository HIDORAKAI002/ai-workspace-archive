# 使用 Chainlit 與 Microsoft Learn Docs MCP 的學習計劃生成器

## 先決條件

- Python 3.8 或更高版本
- pip（Python 套件管理器）
- 可連接 Microsoft Learn Docs MCP 伺服器的網絡連線

## 安裝

1. 克隆此儲存庫或下載專案檔案。
2. 安裝所需依賴項：

   ```bash
   pip install -r requirements.txt
   ```

## 使用說明

### 情境 1：簡單查詢 Docs MCP
一個命令列用戶端，連接到 Docs MCP 伺服器，發送查詢並列印結果。

1. 執行腳本：
   ```bash
   python scenario1.py
   ```
2. 在提示中輸入您的文件查詢問題。

### 情境 2：學習計劃生成器（Chainlit 網頁應用）
一個基於網頁介面（使用 Chainlit），允許使用者為任何技術主題產生個人化的週別學習計劃。

1. 啟動 Chainlit 應用：
   ```bash
   chainlit run scenario2.py
   ```
2. 在瀏覽器中開啟終端機中提供的本地 URL（例如 http://localhost:8000）。
3. 在聊天視窗中輸入您的學習主題與學習週數（例如「AI-900 認證，8 週」）。
4. 應用將回應一個週別學習計劃，包含相關 Microsoft Learn 文件的連結。

**必須的環境變數：**

要使用情境 2（使用 Azure OpenAI 的 Chainlit 網頁應用），您必須在 `python` 目錄下的 `.env` 文件設定以下環境變數：

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

在執行應用前，請填寫這些值為您的 Azure OpenAI 資源細節。

> [!TIP]
> 您可以透過 [Microsoft Foundry](https://ai.azure.com/) 輕鬆部署自己的模型。

### 情境 3：在 VS Code 中與 MCP 伺服器使用內嵌文件

您可以將 Microsoft Learn Docs 直接帶入 VS Code，而不必切換瀏覽器分頁，使用 MCP 伺服器來達成以下功能：
- 在 VS Code 內搜尋並閱讀文件，無需離開您的開發環境。
- 直接在 README 或課程檔案中參考文件並插入連結。
- 將 GitHub Copilot 與 MCP 結合，打造無縫的 AI 驅動文件工作流程。

**示例用例：**
- 撰寫課程或專案文件時，快速為 README 加入參考連結。
- 使用 Copilot 產生程式碼，並使用 MCP 即時查找並引用相關文件。
- 保持在您的編輯器中專注並提升生產力。

> [!IMPORTANT]
> 確保您的工作區中有有效的 [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) 設定檔（位置為 `.vscode/mcp.json`）。

## 為何在情境 2 使用 Chainlit？

Chainlit 是一個現代且開源的框架，用於建立對話式網頁應用。它讓您輕鬆創建聊天式使用者介面，並連結到像 Microsoft Learn Docs MCP 伺服器這類後端服務。本專案使用 Chainlit，提供一個簡單、互動的方式即時生成個人化學習計劃。利用 Chainlit，您可以快速建立並部署增強生產力與學習效果的聊天工具。

## 這個應用做什麼

此應用允許用戶只需輸入主題與學習時間，即可生成個人化學習計劃。程式將解析您的輸入，向 Microsoft Learn Docs MCP 伺服器查詢相關內容，並將結果組織成結構化、逐週的計劃。每週建議均在聊天中顯示，方便您追蹤與遵循學習進度。整合確保您始終取得最新且最相關的學習資源。

## 範例查詢

嘗試在聊天視窗使用以下查詢，看看應用如何回應：

- `AI-900 認證，8 週`
- `學習 Azure Functions，4 週`
- `Azure DevOps，6 週`
- `Azure 資料工程，10 週`
- `Microsoft 安全基礎，5 週`
- `Power Platform，7 週`
- `Azure AI 服務，12 週`
- `雲端架構，9 週`

這些範例展示應用對不同學習目標與時間框架的靈活性。

## 參考資料

- [Chainlit 文件](https://docs.chainlit.io/)
- [MCP 文件](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->