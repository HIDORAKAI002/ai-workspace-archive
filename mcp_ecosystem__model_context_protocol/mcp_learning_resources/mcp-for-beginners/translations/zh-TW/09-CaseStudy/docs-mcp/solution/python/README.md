# 使用 Chainlit 與 Microsoft Learn Docs MCP 的學習計劃產生器

## 先決條件

- Python 3.8 或更高版本
- pip（Python 套件管理工具）
- 可連線至 Microsoft Learn Docs MCP 伺服器的網際網路連線

## 安裝

1. 克隆此存放庫或下載專案檔案。
2. 安裝所需的依賴套件：

   ```bash
   pip install -r requirements.txt
   ```

## 使用說明

### 情境 1：簡單查詢 Docs MCP
一個連接到 Docs MCP 伺服器的命令列客戶端，傳送查詢並列印結果。

1. 執行腳本：
   ```bash
   python scenario1.py
   ```
2. 在提示符號輸入您的文件問題。

### 情境 2：學習計劃產生器（Chainlit 網頁應用）
一個基於網頁的介面（使用 Chainlit），允許使用者針對任何技術主題產生個人化的週別學習計劃。

1. 啟動 Chainlit 應用：
   ```bash
   chainlit run scenario2.py
   ```
2. 在瀏覽器中開啟終端機中提供的本地網址（例如 http://localhost:8000）。
3. 在聊天視窗中輸入您的學習主題及想學習的週數（例如「AI-900 證照考試，8 週」）。
4. 應用程式會回覆逐週的學習計劃，含相關 Microsoft Learn 文件的連結。

**需要設定的環境變數：**

要使用情境 2（結合 Azure OpenAI 的 Chainlit 網頁應用），需在 `python` 目錄下的 `.env` 檔中設定以下環境變數：

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

請在執行應用前填入您的 Azure OpenAI 資源詳細資料。

> [!TIP]
> 您可以利用 [Microsoft Foundry](https://ai.azure.com/) 輕鬆部署您自己的模型。

### 情境 3：在 VS Code 編輯器中使用 MCP 伺服器的文件功能

您不必切換瀏覽器分頁搜尋文件，而是可以直接在 VS Code 中使用 Microsoft Learn Docs MCP 伺服器。此功能可以：
- 在 VS Code 中搜尋並閱讀文件，無需離開程式碼編輯環境。
- 參考文件並直接將連結插入 README 或課程檔案中。
- 同時使用 GitHub Copilot 與 MCP，打造無縫且由 AI 支援的文件工作流程。

**範例使用情境：**
- 在撰寫課程或專案文件時快速新增參考連結到 README。
- 使用 Copilot 產生程式碼，並用 MCP 即時搜尋及引用相關文件。
- 保持專注於編輯器中並提升生產力。

> [!IMPORTANT]
> 請確保您的工作區內有有效的 [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) 設定檔（位置應為 `.vscode/mcp.json`）。

## 為何情境 2 使用 Chainlit？

Chainlit 是一款現代且開源的會話型網頁應用框架，能輕鬆建立與後端服務（如 Microsoft Learn Docs MCP 伺服器）連接的聊天使用者介面。本專案採用 Chainlit 提供一個簡單、互動的即時個人化學習計劃產生方式。藉由 Chainlit，您可以快速構建並部署基於聊天的工具，提升生產力與學習體驗。

## 這個應用程式的功能

此應用允許使用者只需輸入學習主題與期間，即可建立個人化學習計劃。應用會解析您的輸入，向 Microsoft Learn Docs MCP 伺服器查詢相關內容，並將結果組織成結構化的週別計劃。每週的推薦內容會在聊天中顯示，方便您追蹤學習進度。此整合確保您能隨時取得最新且最相關的學習資源。

## 範例查詢

在聊天視窗嘗試以下查詢，查看應用如何回應：

- `AI-900 certification, 8 weeks`
- `Learn Azure Functions, 4 weeks`
- `Azure DevOps, 6 weeks`
- `Data engineering on Azure, 10 weeks`
- `Microsoft security fundamentals, 5 weeks`
- `Power Platform, 7 weeks`
- `Azure AI services, 12 weeks`
- `Cloud architecture, 9 weeks`

這些範例展示了應用針對不同學習目標與時間的彈性。

## 參考資料

- [Chainlit 文件](https://docs.chainlit.io/)
- [MCP 文件](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->