# Study Plan Generator with Chainlit & Microsoft Learn Docs MCP

## 先決條件

- Python 3.8 或以上版本
- pip（Python 套件管理器）
- 可連接到 Microsoft Learn Docs MCP 伺服器的網絡連接

## 安裝

1. 克隆此存儲庫或下載項目文件。
2. 安裝所需的依賴：

   ```bash
   pip install -r requirements.txt
   ```

## 使用方法

### 場景 1：簡單查詢 Docs MCP
一個命令行客戶端，連接到 Docs MCP 伺服器，發送查詢並打印結果。

1. 運行腳本：
   ```bash
   python scenario1.py
   ```

2. 在提示符下輸入您的文檔問題。

### 場景 2：學習計劃生成器（Chainlit 網頁應用）
一個基於網頁的介面（使用 Chainlit），允許用戶生成任何技術主題的個人化分週學習計劃。

1. 啟動 Chainlit 應用：
   ```bash
   chainlit run scenario2.py
   ```

2. 在瀏覽器中打開終端提供的本地網址（例如：http://localhost:8000）。
3. 在聊天視窗輸入您的學習主題和學習週數（例如：「AI-900 認證，8 週」）。
4. 應用將回應一個分週的學習計劃，包含連結到相關 Microsoft Learn 文件。

**所需環境變量：**

要使用場景 2（帶有 Azure OpenAI 的 Chainlit 網頁應用），必須在 `python` 目錄中的 `.env` 文件裡設置以下環境變量：

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

在運行應用前，請根據您的 Azure OpenAI 資源詳情填寫這些值。

> [!TIP]
> 您可以使用 [Microsoft Foundry](https://ai.azure.com/) 輕鬆部署您自己的模型。

### 場景 3：VS Code 編輯器內的 MCP 伺服器文檔功能

您不用切換瀏覽器分頁搜尋文檔，而是可以直接在 VS Code 內置入 Microsoft Learn Docs 及 MCP 伺服器。這使您能：
- 在 VS Code 中搜尋和閱讀文件，而不離開編程環境。
- 直接引用文檔並插入連結到您的 README 或課程文件。
- 結合使用 GitHub Copilot 與 MCP，實現無縫的 AI 助力文檔工作流程。

**示例使用場景：**
- 編寫課程或項目文檔時，快速添加參考連結至 README。
- 利用 Copilot 生成代碼，同時用 MCP 即時查找及引用相關文檔。
- 專心在編輯器中工作，提高生產力。

> [!IMPORTANT]
> 請確保您的工作區具備有效的 [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) 配置文件（位置在 `.vscode/mcp.json`）。

## 為什麼選擇 Chainlit 用於場景 2？

Chainlit 是一個現代開源框架，用於構建對話式網絡應用。它讓建立連接到後端服務，如 Microsoft Learn Docs MCP 伺服器的聊天型用戶介面變得簡單。這個項目利用 Chainlit 提供簡易互動方式，實時生成個性化學習計劃。通過使用 Chainlit，您可以快速開發和部署以聊天為基礎的工具，提高生產力和學習效率。

## 本應用功能

此應用允許用戶透過輸入主題與時長，創建個性化學習計劃。應用會解析您的輸入，向 Microsoft Learn Docs MCP 伺服器查詢相關內容，並將結果組織成結構化的分週計劃。每週的建議會在聊天中顯示，方便跟進與追蹤進度。整合確保您獲得最新且最相關的學習資源。

## 範例查詢

嘗試在聊天視窗輸入以下查詢，看看應用的回應：

- `AI-900 certification, 8 weeks`
- `Learn Azure Functions, 4 weeks`
- `Azure DevOps, 6 weeks`
- `Data engineering on Azure, 10 weeks`
- `Microsoft security fundamentals, 5 weeks`
- `Power Platform, 7 weeks`
- `Azure AI services, 12 weeks`
- `Cloud architecture, 9 weeks`

這些範例展示應用對不同學習目標和時間範圍的彈性。

## 參考文檔

- [Chainlit Documentation](https://docs.chainlit.io/)
- [MCP Documentation](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->