# 案例研究：Azure AI 旅遊代理 – 參考實作

## 概覽

[Azure AI 旅遊代理](https://github.com/Azure-Samples/azure-ai-travel-agents) 是由微軟開發的全面參考解決方案，展示如何使用 Model Context Protocol (MCP)、Azure OpenAI 及 Azure AI Search 構建多代理、AI 驅動的旅遊規劃應用程式。此專案示範協調多個 AI 代理、整合企業資料、並提供安全且可擴充平台於真實場景中的最佳實踐。

## 主要功能
- **多代理協調：** 利用 MCP 協調專門代理（例如航班、酒店及行程代理）合作完成複雜的旅遊規劃任務。
- **企業資料整合：** 連接 Azure AI Search 及其他企業資料來源，提供最新且相關的旅遊建議資訊。
- **安全且可擴展架構：** 運用 Azure 服務進行身份驗證、授權及可擴展部署，遵循企業安全最佳實務。
- **可擴充工具：** 實作可重用的 MCP 工具及提示模板，快速適用於新領域或業務需求。
- **使用者體驗：** 提供由 Azure OpenAI 與 MCP 支援的會話介面，讓使用者與旅遊代理互動。

## 架構
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### 架構圖說明

Azure AI 旅遊代理解決方案以模組化、可擴展及安全整合多個 AI 代理及企業資料來源為架構目標。主要元件及資料流如下：

- **使用者介面：** 使用者透過會話介面（例如網站聊天室或 Teams 機器人）與系統互動，發送查詢並接收旅遊建議。
- **MCP 伺服器：** 作為中央協調者，接收使用者輸入、管理上下文，並透過 Model Context Protocol 協調專門代理（如 FlightAgent、HotelAgent、ItineraryAgent）的動作。
- **AI 代理：** 每個代理負責特定領域（航班、酒店、行程），並以 MCP 工具形式實作。代理使用提示模板及邏輯處理請求並生成回應。
- **Azure OpenAI 服務：** 提供先進的自然語言理解與生成，協助代理解讀使用者意圖並生成會話回應。
- **Azure AI Search 與企業資料：** 代理查詢 Azure AI Search 及其他企業資料來源，以取得最新的航班、酒店及旅遊選項資訊。
- **身份驗證與安全：** 整合 Microsoft Entra ID 進行安全身份驗證，並於所有資源上實施最小權限存取控制。
- **部署：** 設計於 Azure Container Apps 部署，確保可擴展性、監控及運營效率。

此架構使多個 AI 代理能無縫協作，安全整合企業資料，並建立強韌且可擴充的領域專屬 AI 平台。

## 架構圖逐步解說
想像計劃一趟大旅行，有一隊專家助理幫你處理每個細節。Azure AI 旅遊代理系統就像這樣，利用多個部分（如團隊成員），每個都有專門工作。以下是它們如何組合在一起：

### 使用者介面 (UI)：
想像這是你旅遊代理的接待櫃檯。這裡是你（使用者）提出問題或請求的地方，例如「幫我找一班飛往巴黎的航班。」這可以是網站的聊天室或訊息應用程式。

### MCP 伺服器（協調者）：
MCP 伺服器就像經理，聽你在接待處的請求，決定哪位專家該負責哪部分工作。它會追蹤你的對話並確保所有流程順利。

### AI 代理（專家助理）：
每個代理是特定領域的專家——一位熟悉航班，另一位懂酒店，還有負責行程規劃。當你提出旅行要求時，MCP 伺服器會將請求送到適合的代理。代理會利用知識和工具幫你找到最佳選項。

### Azure OpenAI 服務（語言專家）：
就像一位語言專家，能完全理解你怎麼說，協助代理理解你的請求並以自然會話語言回應你。

### Azure AI Search 與企業資料（資訊圖書館）：
想像有座龐大且即時更新的圖書館，內含最新旅遊資訊——航班時刻表、酒店可用性等等。代理會搜尋此圖書館，提供你最準確答案。

### 身份驗證與安全（保安人員）：
就像保安檢查誰可以進入特定區域，此部分確保只有授權人員與代理才能存取敏感資訊，保護你的資料安全和隱私。

### Azure Container Apps 上的部署（大樓）：
所有這些助理與工具都在一棟安全且可擴充的大樓（雲端）內協同工作。這代表系統能同時應付大量使用者，且隨時可用。

## 整體運作流程：

你在接待櫃檯（UI）發問。
經理（MCP 伺服器）判斷哪位專家（代理）能協助你。
專家利用語言專家（OpenAI）理解你的需求，並用資訊圖書館（AI Search）找到最佳答案。
保安人員（身份驗證）確保一切安全。
這一切發生在可靠且可擴充的大樓（Azure Container Apps）內，確保你體驗流暢且安全。
這種團隊合作讓系統像一群現代辦公室中專業旅遊代理一樣，快速且安全地幫你規劃旅程！

## 技術實作
- **MCP 伺服器：** 托管核心協調邏輯，曝露代理工具，管理多步驟旅遊規劃工作流的上下文。
- **代理：** 每個代理（如 FlightAgent、HotelAgent）作為 MCP 工具實作，具備提示模板與邏輯。
- **Azure 整合：** 使用 Azure OpenAI 進行自然語言理解及 Azure AI Search 進行資料檢索。
- **安全性：** 整合 Microsoft Entra ID 進行身份驗證，並對所有資源實施最小權限存取控制。
- **部署：** 支援部署至 Azure Container Apps，實現可擴展性及營運效率。

## 結果與影響
- 展示 MCP 在生產級真實場景中如何協調多個 AI 代理。
- 透過提供可重用範式，促進代理協調、資料整合及安全部署的解決方案開發。
- 成為使用 MCP 與 Azure 服務構建領域專屬 AI 應用的藍圖。

## 參考資料
- [Azure AI Travel Agents GitHub Repository](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## 後續事項

- 返回：[案例研究總覽](./README.md)
- 下一步：[從 YouTube 更新 ADO 項目](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。儘管我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的本地語言版本應視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們不對因使用本翻譯而引致的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->