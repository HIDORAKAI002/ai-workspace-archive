# MCP 實戰：真實世界案例研究

[![MCP 實戰：真實世界案例研究](../../../translated_images/zh-TW/10.3262cc80b4de5071.webp)](https://youtu.be/IxshWb2Az5w)

_(點擊上方圖片觀看本課程影片)_

Model Context Protocol（MCP）正在改變 AI 應用程式與資料、工具和服務互動的方式。本章節介紹了展示 MCP 在各種企業場景中實際應用的真實世界案例研究。

## 概述

本章節展示了 MCP 實作的具體範例，突出不同組織如何利用此協議解決複雜的商業挑戰。透過這些案例研究，您將深入了解 MCP 在真實場景中的多功能性、可擴展性與實務益處。

## 主要學習目標

透過探索這些案例研究，您將能夠：

- 了解 MCP 如何應用於解決特定商業問題
- 學習不同的整合模式和架構方法
- 認識在企業環境中實作 MCP 的最佳實踐
- 洞悉真實環境實作中遇到的挑戰與解決方案
- 找出將類似模式應用於自己專案的機會

## 精選案例研究

### 1. [Azure AI 旅遊代理人 – 參考實作](./travelagentsample.md)

此案例研究探討微軟的完整參考解決方案，展示如何使用 MCP、Azure OpenAI 與 Azure AI Search 建構多代理人 AI 驅動的旅遊規劃應用。專案展示：

- 透過 MCP 進行多代理人協作編排
- 企業資料整合搭配 Azure AI Search
- 利用 Azure 服務打造安全且可擴展的架構
- 可擴充工具與可重用 MCP 元件
- 由 Azure OpenAI 支援的對話式使用者體驗

架構與實作細節提供了使用 MCP 作為協調層建立複雜多代理人系統的寶貴見解。

### 2. [從 YouTube 資料更新 Azure DevOps 項目](./UpdateADOItemsFromYT.md)

此案例展現 MCP 在自動化工作流程中的實務應用，展示如何：

- 從線上平台（YouTube）擷取資料
- 更新 Azure DevOps 系統中的工作項目
- 創建可重複的自動化工作流程
- 跨系統整合資料

此範例說明即使是相對簡單的 MCP 實作，也能透過自動化例行任務和提高系統資料一致性帶來顯著效率提升。

### 3. [使用 MCP 進行即時文件檢索](./docs-mcp/README.md)

本案例引導您如何使用 Python 命令列客戶端連接 Model Context Protocol（MCP）伺服器，檢索並記錄即時且具上下文關聯的 Microsoft 文件。您將學習如何：

- 使用 Python 客戶端與官方 MCP SDK 連接 MCP 伺服器
- 透過串流 HTTP 客戶端高效即時獲取資料
- 呼叫伺服器上的文件工具，並直接將回應記錄於控制台
- 在終端機中整合最新 Microsoft 文件入工作流程

章節包含實作練習、最小可用程式碼範例及深入學習資源連結。查看相應章節的完整操作流程與程式碼，了解 MCP 如何改變文件存取與開發人員生產力於控制台環境。

### 4. [使用 MCP 建構互動式學習計畫生成 Web 應用程式](./docs-mcp/README.md)

此案例示範如何利用 Chainlit 與 Model Context Protocol（MCP）打造互動式網頁應用，為任一主題生成個人化學習計畫。用戶可指定科目（如「AI-900 認證」）與學習時長（例如 8 週），應用會產出逐週推介內容。Chainlit 提供對話式聊天介面，體驗生動且具適應性。

- 由 Chainlit 驅動的對話型網頁應用
- 用戶自定主題與期間輸入
- 透過 MCP 提供逐週內容推薦
- 聊天介面即時且具適應性回應

專案展示如何結合對話式 AI 與 MCP，打造現代網頁環境中動態且用戶導向的教育工具。

### 5. [VS Code 內建 MCP 伺服器文件](./docs-mcp/README.md)

此案例展示如何利用 MCP 伺服器將 Microsoft Learn 文件直接帶入 VS Code 環境，免去切換瀏覽器分頁的困擾。您將看到如何：

- 使用 MCP 面板或命令面板即時在 VS Code 中搜尋並閱讀文件
- 直接參考文件並插入連結至 README 或課程 Markdown 檔案
- 結合 GitHub Copilot 與 MCP 實現無縫 AI 支援的文件與程式碼流程
- 透過即時回饋和 Microsoft 準確來源驗證強化文件
- 將 MCP 整合入 GitHub 工作流程以持續驗證文件

實作包含：

- 方便設定的 `.vscode/mcp.json` 範例配置
- 編輯器內操作體驗的截圖導覽
- 結合 Copilot 與 MCP 最大化生產力的技巧

此場景適合課程作者、文件撰寫者與開發者，幫助他們在編輯器中專注處理文件、Copilot 及驗證工具，全部由 MCP 驅動。

### 6. [建立 APIM MCP 伺服器](./apimsample.md)

此案例提供如何使用 Azure API 管理（APIM）建立 MCP 伺服器的逐步指導，涵蓋：

- 在 Azure API 管理中設定 MCP 伺服器
- 將 API 操作公開為 MCP 工具
- 配置速率限制與安全性政策
- 使用 Visual Studio Code 和 GitHub Copilot 測試 MCP 伺服器

此範例說明如何發揮 Azure 能力，創建堅固的 MCP 伺服器，進而強化 AI 系統與企業 API 的整合。

### 7. [GitHub MCP Registry — 加速代理整合](https://github.com/mcp)

此案例探討 GitHub MCP Registry 於 2025 年 9 月推出，解決 AI 生態系中一項關鍵難題：Model Context Protocol（MCP）伺服器發現與部署因分散導致的效率低落問題。

#### 概述
**MCP Registry** 解決以往 MCP 伺服器分散在各種程式碼庫與註冊表中的痛點，避免整合過程緩慢且易出錯。這些伺服器使 AI 代理能互動外部系統，如 API、資料庫與文件來源。

#### 問題陳述
建構代理工作流程的開發者面臨多項挑戰：
- MCP 伺服器在不同平台上**難以搜尋**
- 相關設置問題散見論壇與文檔，造成**重複困擾**
- 來自未驗證或不信任來源的**安全風險**
- 伺服器品質與相容性的**缺乏標準化**

#### 解決架構
GitHub MCP Registry 以關鍵功能集中管理受信任的 MCP 伺服器：
- 透過 VS Code 提供**一鍵安裝**整合，簡化設定流程
- 以星標、活躍度與社群驗證進行**信號反噪音排序**
- 和 GitHub Copilot 及其他 MCP 相容工具**直接整合**
- 採用**開放貢獻模式**，允許社群及企業夥伴共襄盛舉

#### 商業影響
該註冊表帶來可衡量的改進：
- 透過如 Microsoft Learn MCP 伺服器等工具，實現開發者更快**上手**
- 利用如 `github-mcp-server` 等專用伺服器提升生產力，實現自然語言 GitHub 自動化（建立 PR、CI 重跑、程式碼掃描）
- 透過策展列表與透明配置規範增強生態系信任度

#### 策略價值
對專注於代理生命週期管理與可重現工作流程的實務者，MCP Registry 提供：
- 採用標準元件的**模組化代理部署**
- 註冊表支持的**評估管線**以確保一致測試驗證
- 促進不同 AI 平台間的**跨工具互通**

此案例展示 MCP Registry 不僅是目錄，更是可擴展、實務模型整合與代理系統部署的基礎平台。

## 結論

這七個完整的案例研究展現了 Model Context Protocol 在多元真實場景中的卓越多功能性與實務應用。從複雜的多代理旅遊規劃系統和企業 API 管理，到優化文件工作流程及革新的 GitHub MCP Registry，這些範例展示 MCP 如何透過標準化且可擴展的方式連結 AI 系統與所需工具、資料與服務，帶來卓越價值。

案例研究涵蓋 MCP 實作的多個面向：
- **企業整合**：Azure API 管理與 Azure DevOps 自動化
- **多代理編排**：協調 AI 代理的旅遊規劃
- **開發者生產力**：VS Code 整合與即時文件存取
- **生態系發展**：作為基礎平台的 GitHub MCP Registry
- **教育應用**：互動式學習計畫生成器與對話介面

透過研習這些實作，您將獲得關鍵洞見：
- 不同規模與使用案例的**架構樣式**
- 在功能與可維護性間取得平衡的**實作策略**
- 生產環境部署的**安全性與可擴展性**考量
- MCP 伺服器開發與客戶端整合的**最佳實務**
- 建構互聯 AI 解決方案的**生態思維**

這些範例共同證明 MCP 不僅是理論框架，而是成熟且生產就緒的協議，實現解決複雜商業挑戰的實務方案。無論您是在建構簡單自動化工具或複雜多代理系統，這裡展示的模式與方法皆為您的 MCP 專案奠定穩固基礎。

## 其他資源

- [Azure AI 旅遊代理人 GitHub 倉庫](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure DevOps MCP 工具](https://github.com/microsoft/azure-devops-mcp)
- [Playwright MCP 工具](https://github.com/microsoft/playwright-mcp)
- [Microsoft Docs MCP 伺服器](https://github.com/MicrosoftDocs/mcp)
- [GitHub MCP Registry — 加速代理整合](https://github.com/mcp)
- [MCP 社群範例](https://github.com/microsoft/mcp)

## 下一步

- 之前章節: [模組 8：最佳實務](../08-BestPractices/README.md)
- 下一章節: [模組 10：簡化 AI 工作流程：使用 AI 工具包構建 MCP 伺服器](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件係使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 所翻譯。儘管我們致力於翻譯的準確性，請注意自動翻譯可能包含錯誤或不準確之處。原文文件以其原始語言版本為最具權威之依據。對於重要資訊，建議委託專業人工翻譯。我們對因使用本翻譯所引起之任何誤解或曲解概不負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->