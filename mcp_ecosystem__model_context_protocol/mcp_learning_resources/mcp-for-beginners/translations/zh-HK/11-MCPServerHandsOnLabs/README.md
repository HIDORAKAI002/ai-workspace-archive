# 🚀 MCP 伺服器與 PostgreSQL - 完整學習指南

## 🧠 MCP 資料庫整合學習路徑概覽

本全面學習指南將教你如何透過實務的零售分析方案建構生產就緒的 **Model Context Protocol (MCP) 伺服器**，並與資料庫整合。你將學習企業級模式，包括 **Row Level Security (RLS)**、**語意搜尋**、**Azure AI 整合** 以及 **多租戶資料存取**。

無論你是後端開發者、AI 工程師或資料架構師，本指南提供結構化學習，搭配實際範例與操作練習，帶領你逐步完成以下 MCP 伺服器專案 https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail。

## 🔗 官方 MCP 資源

- 📘 [MCP 文件](https://modelcontextprotocol.io/) – 詳盡教學與使用指南  
- 📜 [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – 協定架構與技術參考  
- 🧑‍💻 [MCP GitHub 倉庫](https://github.com/modelcontextprotocol) – 開源 SDK、工具與程式碼範例  
- 🌐 [MCP 社群](https://github.com/orgs/modelcontextprotocol/discussions) – 參與討論與社群貢獻  
- 🔒 [OWASP MCP 十大](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – 安全最佳實踐與風險緩解  

## 🧭 MCP 資料庫整合學習路徑

### 📚 https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail 完整學習結構

| 實驗室 | 主題 | 說明 | 連結 |
|--------|-------|-------------|------|
| **Lab 1-3：基礎** | | | |
| 00 | [MCP 資料庫整合介紹](./00-Introduction/README.md) | MCP 與資料庫整合及零售分析案例概覽 | [從這裡開始](./00-Introduction/README.md) |
| 01 | [核心架構概念](./01-Architecture/README.md) | 認識 MCP 伺服器架構、資料庫層及安全模式 | [學習](./01-Architecture/README.md) |
| 02 | [安全性與多租戶](./02-Security/README.md) | 列級安全、認證與多租戶資料存取 | [學習](./02-Security/README.md) |
| 03 | [環境設定](./03-Setup/README.md) | 開發環境、Docker、Azure 資源設置 | [設定](./03-Setup/README.md) |
| **Lab 4-6：建構 MCP 伺服器** | | | |
| 04 | [資料庫設計與架構](./04-Database/README.md) | PostgreSQL 設置、零售架構設計及範例資料 | [建構](./04-Database/README.md) |
| 05 | [MCP 伺服器實作](./05-MCP-Server/README.md) | 建立整合資料庫的 FastMCP 伺服器 | [建構](./05-MCP-Server/README.md) |
| 06 | [工具開發](./06-Tools/README.md) | 製作資料庫查詢工具及架構檢視 | [建構](./06-Tools/README.md) |
| **Lab 7-9：進階功能** | | | |
| 07 | [語意搜尋整合](./07-Semantic-Search/README.md) | 實作 Azure OpenAI 及 pgvector 向量嵌入 | [進階](./07-Semantic-Search/README.md) |
| 08 | [測試與除錯](./08-Testing/README.md) | 測試策略、除錯工具與驗證方法 | [測試](./08-Testing/README.md) |
| 09 | [VS Code 整合](./09-VS-Code/README.md) | 設定 VS Code MCP 整合與 AI Chat 使用 | [整合](./09-VS-Code/README.md) |
| **Lab 10-12：生產與最佳實踐** | | | |
| 10 | [部署策略](./10-Deployment/README.md) | Docker 部署、Azure 容器應用與擴充考量 | [部署](./10-Deployment/README.md) |
| 11 | [監控與觀測](./11-Monitoring/README.md) | Application Insights、日誌與效能監控 | [監控](./11-Monitoring/README.md) |
| 12 | [最佳實踐與優化](./12-Best-Practices/README.md) | 效能優化、安全強化及生產環境建議 | [優化](./12-Best-Practices/README.md) |

### 💻 你將打造的專案

完成此學習路徑後，你將擁有完整的 **Zava 零售分析 MCP 伺服器**，特色包括：

- **多表零售資料庫**，涵蓋客戶訂單、產品及庫存
- **列級安全**，以店面為基準的資料隔離
- **語意產品搜尋**，利用 Azure OpenAI 向量嵌入
- **VS Code AI Chat 整合**，支持自然語言查詢
- **生產環境佈署**，結合 Docker 與 Azure
- **完整監控**，採用 Application Insights

## 🎯 學習前置條件

為了最大化學習效益，你應該具備：

- **程式設計經驗**：熟悉 Python（優先）或類似語言  
- **資料庫知識**：基本 SQL及關聯式資料庫理解  
- **API 概念**：了解 REST API 及 HTTP 基礎  
- **開發工具**：熟悉命令列、Git與程式碼編輯器  
- **雲端基礎**：（可選）基本 Azure 或類似雲端平台知識  
- **Docker 知識**：（可選）容器化相關概念理解  

### 必備工具

- **Docker Desktop** - 執行 PostgreSQL 與 MCP 伺服器  
- **Azure CLI** - 雲端資源部署  
- **VS Code** - 開發與 MCP 整合  
- **Git** - 版本控制  
- **Python 3.8+** - MCP 伺服器開發  

## 📚 學習指南與資源

本路徑包含完整資源，協助你有效掌握內容：

### 學習指南

每個實驗室包含：  
- **明確的學習目標** - 你將達成什麼  
- **逐步操作指引** - 詳細實作說明  
- **程式碼範例** - 可運作的示範與說明  
- **練習題** - 實際操作機會  
- **故障排除指南** - 常見問題與解決方案  
- **補充資源** - 延伸閱讀與探索  

### 前置知識檢查

開始每個實驗室前，提供：  
- **必備知識** - 你需先了解的內容  
- **環境確認** - 如何驗證你的設定  
- **時間預估** - 完成所需時間  
- **學習成果** - 完成後你會知道什麼  

### 推薦學習路徑

依經驗程度選擇適合你的路徑：

#### 🟢 **初學者路徑**（MCP 新手）  
1. 請先完成 [MCP 初學者指南](https://aka.ms/mcp-for-beginners) 的 0-10 節  
2. 完成 Lab 00-03 鞏固基礎概念  
3. 依照 Lab 04-06 進行實作  
4. 測試 Lab 07-09 進行實務運用  

#### 🟡 **中級路徑**（已有 MCP 基礎）  
1. 回顧 Lab 00-01 了解資料庫專用概念  
2. 專注 Lab 02-06 實作  
3. 深入 Lab 07-12 進階功能  

#### 🔴 **進階路徑**（MCP 資深用戶）  
1. 快速瀏覽 Lab 00-03 了解背景  
2. 專注 Lab 04-09 資料庫整合  
3. 聚焦 Lab 10-12 生產部署  

## 🛠️ 如何有效使用此學習路徑

### 依序學習（推薦）

按步驟完成實驗室以達到全面理解：

1. **閱讀概覽** – 了解你將學到什麼  
2. **檢查前置條件** – 確認必要知識  
3. **遵循操作指南** – 一邊學習一邊實作  
4. **完成練習題** – 鞏固學習成果  
5. **回顧重點** – 強化學習結果  

### 針對性學習

若需特定技能：

- **資料庫整合**：聚焦 Lab 04-06  
- **安全實作**：關注 Lab 02、08、12  
- **AI/語意搜尋**：深入 Lab 07  
- **生產部署**：研讀 Lab 10-12  

### 實作練習

每個實驗室包含：  
- **可執行範例程式碼** – 複製、修改與試驗  
- **真實案例場景** – 實務零售分析用例  
- **漸進難度** – 從簡單到進階構建  
- **驗證步驟** – 確認實作成果成功  

## 🌟 社群與支援

### 尋求幫助

- **Azure AI Discord**：[加入專家支援](https://discord.com/invite/ByRwuEEgH4)  
- **GitHub 倉庫與示範實作**：[部署範例與資源](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)  
- **MCP 社群**：[參與擴大討論](https://github.com/orgs/modelcontextprotocol/discussions)  

## 🚀 準備好開始了嗎？

從 **[Lab 00：MCP 資料庫整合介紹](./00-Introduction/README.md)** 開啟你的旅程

---

*透過此全面且實務導向的學習體驗，精通建構生產就緒的 MCP 伺服器，並實現資料庫整合。*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件係使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保翻譯準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原文文件應被視為權威來源。如涉及重要資訊，建議採用專業人工翻譯。我們不對因使用本翻譯而導致之任何誤解或錯譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->