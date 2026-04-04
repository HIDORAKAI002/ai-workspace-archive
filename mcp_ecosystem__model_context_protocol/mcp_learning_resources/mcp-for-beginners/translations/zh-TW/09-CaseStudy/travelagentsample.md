# 案例研究：Azure AI 旅遊代理 – 參考實作

## 概觀

[Azure AI 旅遊代理](https://github.com/Azure-Samples/azure-ai-travel-agents) 是微軟開發的一個完整參考解決方案，展示如何使用模型上下文協定（MCP）、Azure OpenAI 與 Azure AI 搜尋，構建多代理、AI 驅動的旅遊規劃應用程式。此專案示範了多個 AI 代理協作、企業數據整合，以及為實際場景提供安全且可擴充平台的最佳實踐。

## 主要功能
- **多代理協作編排：** 利用 MCP 協調專精代理（例如航班、飯店與行程代理），共同完成複雜的旅遊規劃任務。
- **企業數據整合：** 連接 Azure AI 搜尋及其他企業數據來源，以提供最新且相關的旅遊推薦資訊。
- **安全且具擴充性的架構：** 利用 Azure 服務實現認證、授權及可擴展部署，遵循企業安全最佳實踐。
- **可擴充工具：** 實作可重用的 MCP 工具和提示模板，快速適應新領域或業務需求。
- **使用者體驗：** 提供以對話方式與旅遊代理互動的介面，由 Azure OpenAI 和 MCP 支援。

## 架構
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### 架構圖說明

Azure AI 旅遊代理解決方案以模組化、可擴展與安全整合多個 AI 代理及企業數據來源為設計目標。主要元件及資料流程說明如下：

- **使用者介面：** 使用者透過對話式 UI（例如網站聊天室或 Teams 機器人）互動，發送查詢並接收旅遊推薦。
- **MCP 伺服器：** 作為中央協調者，接收使用者輸入、管理上下文，並透過模型上下文協定協調專精代理（如 FlightAgent、HotelAgent、ItineraryAgent）的行為。
- **AI 代理：** 每個代理專注特定領域（航班、飯店、行程），以 MCP 工具實作，使用提示模板與邏輯處理請求並產生回應。
- **Azure OpenAI 服務：** 提供先進自然語言理解與生成，讓代理能正確解讀使用者意圖並生成自然對話回應。
- **Azure AI 搜尋與企業數據：** 代理查詢 Azure AI 搜尋及其他企業資料來源，獲取最新航班、飯店及旅遊選項資訊。
- **認證與安全：** 整合 Microsoft Entra ID 提供安全認證，並對所有資源實施最小權限控管。
- **部署：** 設計於 Azure Container Apps 上部署，以確保擴展性、監控及營運效率。

此架構使多個 AI 代理無縫協同作業，與企業數據安全整合，提供強健且可擴充的專域 AI 解決方案平台。

## 架構圖逐步說明
想像你要規劃一趟大旅行，有一組專家助理幫你處理每個細節。Azure AI 旅遊代理系統的運作方式很像，一個團隊中不同成員各有專業分工。以下說明它們如何協同工作：

### 使用者介面 (UI)：
就像旅遊代理的櫃台，這是你（使用者）提出問題或需求的地方，例如「幫我找一班去巴黎的航班」。這可能是網站聊天視窗或通訊應用程式。

### MCP 伺服器 (協調者)：
MCP 伺服器像是櫃台的經理，會聆聽你的需求，決定由哪位專家負責處理各項任務。它會追蹤對話上下文，確保一切順利進行。

### AI 代理 (專家助理)：
每個代理都是某個專業領域的專家——一位懂航班、一位懂飯店、另一位負責行程規劃。當你提出需求時，MCP 伺服器會將請求傳給適合的代理。代理會運用知識和工具幫你找出最佳方案。

### Azure OpenAI 服務 (語言專家)：
它就像會理解各種表達方式的語言專家，幫助代理正確理解你的請求，並以自然對話方式回應。

### Azure AI 搜尋與企業數據 (資訊圖書館)：
想像一座龐大且最新的圖書館，裡頭有最完整的旅遊資訊——航班時刻、飯店空房等。代理會在這座圖書館中尋找最準確的答案給你。

### 認證與安全 (安全守衛)：
就像安全守衛檢查誰能進入特定區域，這部分確保只有授權的人員和代理能存取敏感資料，保障你的數據安全與隱私。

### 部署於 Azure Container Apps (大樓)：
所有助理與工具都在一棟安全且可擴展的大樓（雲端）裡協同工作，代表系統能同時服務大量使用者，且隨時可用。

## 如何協同運作：

你先在櫃台（UI）詢問問題。
經理（MCP 伺服器）判斷哪位專家（代理）該協助你。
專家會運用語言專家（OpenAI）理解請求，並用圖書館（AI 搜尋）尋找最佳答案。
安全守衛（認證）確保所有過程安全無虞。
這一切運作於可靠且可擴展大樓（Azure Container Apps）內，帶給你流暢且安全的使用體驗。
這種團隊合作讓系統能迅速且安全地幫你規劃行程，就像一群專家在現代辦公室共同工作！

## 技術實作
- **MCP 伺服器：** 承載核心協調邏輯，暴露代理工具，管理多步驟旅遊規劃的上下文。
- **代理：** 每個代理（如 FlightAgent、HotelAgent）皆以 MCP 工具實作，持有專屬提示模板與邏輯。
- **Azure 整合：** 使用 Azure OpenAI 進行自然語言理解，透過 Azure AI 搜尋取得資料。
- **安全：** 整合 Microsoft Entra ID 認證，對所有資源採用最小權限控管。
- **部署：** 支援部署於 Azure Container Apps，確保擴展及營運效率。

## 成果與影響
- 展示 MCP 如何在實務且生產等級場景中編排多個 AI 代理。
- 提供代理協同、數據整合及安全部署的可重用模式，加速解決方案開發。
- 作為使用 MCP 和 Azure 服務建構專域 AI 應用的藍圖。

## 參考資料
- [Azure AI Travel Agents GitHub 倉庫](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI 服務](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI 搜尋](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [模型上下文協定 (MCP)](https://modelcontextprotocol.io/)

## 下一步

- 返回：[案例研究總覽](./README.md)
- 下一項：[從 YouTube 更新 ADO 項目](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件係使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 所翻譯。雖然我們致力於確保準確性，但請注意，自動翻譯可能包含錯誤或不準確之處。原始語言的文件應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或誤讀負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->