# 案例研究：Azure AI 旅遊代理 – 參考實作

## 概述

[Azure AI 旅遊代理](https://github.com/Azure-Samples/azure-ai-travel-agents) 是微軟開發的一個完整參考解決方案，展示如何使用模型上下文協議（MCP）、Azure OpenAI 與 Azure AI 搜索構建多代理、AI 驅動的旅遊規劃應用程序。該項目展示了協調多個 AI 代理、整合企業數據及提供安全且可擴展平台於真實場景的最佳實踐。

## 主要特點
- **多代理協調：** 利用 MCP 協調專門化代理（如航班、酒店與行程代理），協作完成複雜的旅遊規劃任務。
- **企業數據整合：** 連接 Azure AI 搜索及其他企業數據源，提供最新且相關的旅遊推薦資訊。
- **安全且可擴展架構：** 利用 Azure 服務進行身份驗證、授權與可擴展部署，遵循企業安全最佳實踐。
- **可擴展工具鏈：** 實作可重用 MCP 工具與提示範本，支援快速適應新領域或業務需求。
- **用戶體驗：** 提供由 Azure OpenAI 與 MCP 驅動的會話界面，讓用戶與旅遊代理互動。

## 架構
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### 架構圖說明

Azure AI 旅遊代理方案的架構強調模組化、可擴展性及多個 AI 代理與企業數據源的安全整合。主要元件與資料流說明如下：

- **用戶界面：** 用戶透過會話式 UI（如網站聊天或 Teams 機器人）與系統互動，發送查詢並接收旅遊推薦。
- **MCP 伺服器：** 作為中央協調者，接收用戶輸入、管理上下文，並透過模型上下文協議協調專門代理（如 FlightAgent、HotelAgent、ItineraryAgent）行動。
- **AI 代理：** 每個代理負責特定領域（航班、酒店、行程），以 MCP 工具形式實作。代理利用提示範本與邏輯處理請求並產生回應。
- **Azure OpenAI 服務：** 提供先進自然語言理解與生成，協助代理解讀用戶意圖並生成會話式回應。
- **Azure AI 搜索與企業數據：** 代理查詢 Azure AI 搜索與其他企業數據源，以取得最新航班、酒店與旅遊選項資訊。
- **身份驗證與安全：** 整合 Microsoft Entra ID 確保安全身份驗證，並對所有資源實施最小權限存取控制。
- **部署：** 設計部署於 Azure Container Apps，確保可擴展性、監控與營運效率。

此架構實現多個 AI 代理的無縫協調、企業數據的安全整合，以及建構領域專用 AI 解決方案的穩健且可擴展平台。

## 架構圖逐步說明
想像你正在籌備一場大型旅遊，有一支專家團隊幫你整理每個細節。Azure AI 旅遊代理系統就是以類似方式運作，將不同部分（像團隊成員）中各自負責專門任務。以下是其如何整合：

### 用戶界面（UI）：
想像這是你的旅遊代理前台。你（用戶）在這裡提問或下達需求，例如「幫我找一班飛往巴黎的航班」。這可能是網站聊天視窗或訊息應用程式。

### MCP 伺服器（協調者）：
MCP 伺服器就像經理，聽取你在前台的請求，再決定哪位專家該處理哪部分。它追蹤對話並確保工作順利進行。

### AI 代理（專家助理）：
每位代理都是特定領域的專家 — 一個負責航班，另一個負責酒店，還有一個負責行程規劃。當你請求旅遊規劃，MCP 伺服器會把需求傳給適合的代理。代理用他們的知識與工工具尋找最佳方案。

### Azure OpenAI 服務（語言專家）：
它就像語言專家，無論你怎麼表述請求，都能精準理解。幫助代理了解你的需求並用自然對話回應。

### Azure AI 搜索與企業數據（資訊庫）：
就像一座龐大且隨時更新的圖書館，裡面有最新航班時間表、酒店空房狀況等。代理查詢這座圖書館，取得最準確的答案給你。

### 身份驗證與安全（保安）：
就像保安檢查誰能進特定區域，這部分確保只有授權人員與代理能存取敏感資訊，保護你的資料安全與隱私。

### 部署於 Azure Container Apps（大樓）：
所有助理和工具都在一棟安全且可擴展的大樓（雲端）中運作。這意味系統能同時處理大量用戶，並隨時可用。

## 整體運作流程：

你從前台（UI）提出問題。
經理（MCP 伺服器）判斷該由哪位專家（代理）協助。
專家使用語言專家（OpenAI）理解請求，並利用資訊庫（AI 搜索）尋找最佳答案。
保安（身份驗證）確保所有安全無虞。
這一切都發生在可靠且可擴展的大樓（Azure Container Apps）裡，讓你的體驗順暢且安全。
這支團隊協作使系統能迅速又安全地協助你規劃旅程，就像現代辦公室裡的專業旅遊團隊合作無間！

## 技術實作
- **MCP 伺服器：** 承載核心協調邏輯，暴露代理工具並管理多步旅遊規劃工作流程上下文。
- **代理：** 每個代理（如 FlightAgent、HotelAgent）以 MCP 工具形式實作，並擁有專屬提示範本與邏輯。
- **Azure 整合：** 使用 Azure OpenAI 進行自然語言理解，並用 Azure AI 搜索進行數據檢索。
- **安全性：** 整合 Microsoft Entra ID 進行身份驗證，並對所有資源實施最小權限存取控制。
- **部署：** 支援部署至 Azure Container Apps 以實現可擴展性與營運效率。

## 成果與影響
- 展示 MCP 如何在真實生產環境中協調多個 AI 代理。
- 透過提供可重用模式加速解決方案開發，涵蓋代理協調、數據整合及安全部署。
- 作為建構領域專用、AI 驅動應用的 MCP 及 Azure 服務範本。

## 參考資料
- [Azure AI Travel Agents GitHub 儲存庫](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI 服務](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI 搜索](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [模型上下文協議 (MCP)](https://modelcontextprotocol.io/)

## 下一步

- 返回至：[案例研究總覽](./README.md)
- 下一步：[從 YouTube 更新 ADO 項目](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意自動翻譯可能包含錯誤或不準確之處。如有疑問，請以原始文件的母語版本為準。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->