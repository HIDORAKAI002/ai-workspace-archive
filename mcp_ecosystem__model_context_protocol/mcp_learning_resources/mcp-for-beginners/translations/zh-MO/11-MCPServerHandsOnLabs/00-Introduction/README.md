# MCP 數據庫整合簡介

## 🎯 本實驗涵蓋內容

本簡介實驗提供如何構建具備數據庫整合功能的 Model Context Protocol (MCP) 伺服器的完整概覽。你將通過 Zava Retail 分析案例（https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail）了解業務案例、技術架構及實際應用。

## 概述

**Model Context Protocol (MCP)** 讓 AI 助理能夠安全地即時訪問和互動於外部資料來源。結合數據庫整合，MCP 可釋放資料驅動 AI 應用的強大能力。

本教學路徑教你構建生產就緒的 MCP 伺服器，通過 PostgreSQL 將 AI 助理連接到零售銷售數據，實現企業級模式如行級安全、語義搜尋及多租戶數據訪問。

## 學習目標

完成本實驗後，你將能夠：

- <strong>定義</strong> Model Context Protocol 及其在數據庫整合中的核心優勢
- <strong>識別</strong> MCP 伺服器與數據庫架構中的關鍵組件
- <strong>理解</strong> Zava Retail 案例及其業務需求
- <strong>認識</strong> 企業級安全、可擴充數據庫訪問模式
- <strong>列出</strong> 本教學路徑中使用的工具與技術

## 🧭 挑戰：AI 遇上現實世界數據

### 傳統 AI 限制

現代 AI 助理非常強大，但在處理現實業務數據時仍面臨重大限制：

| <strong>挑戰</strong> | <strong>說明</strong> | <strong>業務影響</strong> |
|----------|----------|-------------|
| <strong>靜態知識</strong> | AI 模型訓練於固定數據集，無法存取最新業務數據 | 洞察過時，錯失機會 |
| <strong>數據孤島</strong> | 資料鎖定於資料庫、API 及系統，AI 無法接觸 | 分析不全，工作流程支離破碎 |
| <strong>安全限制</strong> | 直接存取資料庫帶來安全及合規風險 | 部署受限，需手動資料準備 |
| <strong>複雜查詢</strong> | 業務用戶需技術能力才能取得數據洞察 | 採用率低，流程效率差 |

### MCP 解決方案

Model Context Protocol 透過以下方式解決上述挑戰：

- <strong>即時數據存取</strong>：AI 助理查詢即時資料庫和 API
- <strong>安全整合</strong>：透過身份驗證與權限控管控制存取
- <strong>自然語言介面</strong>：業務用戶以簡單英語發問
- <strong>標準化協議</strong>：跨平台與工具通用

## 🏪 認識 Zava Retail：本教學案例 https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

在本教學中，我們將為虛構的多店面 DIY 零售連鎖店 **Zava Retail** 建立 MCP 伺服器。此真實情境展示企業級 MCP 實作。

### 業務背景

**Zava Retail** 運營：
- **8 間實體店**，分布於華盛頓州（西雅圖、貝爾維尤、塔科馬、斯波坎、埃弗雷特、雷德蒙、科克蘭）
- **1 間線上店鋪** 提供電子商務銷售
- <strong>多元產品目錄</strong> 包含工具、五金、園藝用品及建築材料
- <strong>多層級管理</strong> 含店面經理、區域經理及高階主管

### 業務需求

店面經理及主管需 AI 支援的分析以：

1. <strong>分析</strong> 店鋪及時間區間的銷售表現
2. <strong>追蹤</strong> 庫存狀況與補貨需求
3. <strong>了解</strong> 顧客行為與採購模式
4. <strong>發掘</strong> 產品洞察，透過語義搜尋
5. <strong>生成</strong> 用自然語言查詢的報告
6. <strong>維護</strong> 資料安全，採取角色基礎訪問控制

### 技術需求

MCP 伺服器必須提供：

- <strong>多租戶資料訪問</strong>，店經理只看見自家店資料
- <strong>彈性查詢</strong>，支援複雜 SQL 操作
- <strong>語義搜尋</strong>，用於產品發現與推薦
- <strong>即時數據</strong>，反映當前業務狀態
- <strong>安全身份認證</strong>，行級安全保障
- <strong>可擴充架構</strong>，支持多用戶同時訪問

## 🏗️ MCP 伺服器架構概覽

我們的 MCP 伺服器採用針對數據庫整合優化的分層架構：

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### 關鍵組件

#### **1. MCP 伺服器層**
- **FastMCP 框架**：現代 Python MCP 伺服器實作
- <strong>工具註冊</strong>：聲明式工具定義與型別安全
- <strong>請求上下文</strong>：用戶身份與會話管理
- <strong>錯誤處理</strong>：穩健錯誤管理與日誌記錄

#### **2. 數據庫整合層**
- <strong>連線池管理</strong>：高效 asyncpg 連線管理
- **Schema 提供者**：動態表結構發現
- <strong>查詢執行器</strong>：附帶 RLS 上下文安全執行 SQL
- <strong>交易管理</strong>：ACID 合規與回滾處理

#### **3. 安全層**
- **行級安全（RLS）**：PostgreSQL RLS 多租戶數據隔離
- <strong>用戶身份</strong>：店面經理身份認證與授權
- <strong>存取控制</strong>：細粒度權限及審計追蹤
- <strong>輸入驗證</strong>：防止 SQL 注入及查詢驗證

#### **4. AI 增強層**
- <strong>語義搜尋</strong>：產品發現的向量嵌入
- **Azure OpenAI 整合**：文字嵌入生成
- <strong>相似性算法</strong>：pgvector 餘弦相似度搜尋
- <strong>搜尋優化</strong>：索引與效能調校

## 🔧 技術棧

### 核心技術

| <strong>組件</strong> | <strong>技術</strong> | <strong>用途</strong> |
|----------|----------|----------|
| **MCP 框架** | FastMCP（Python） | 現代 MCP 伺服器實作 |
| <strong>數據庫</strong> | PostgreSQL 17 + pgvector | 關聯數據及向量搜尋 |
| **AI 服務** | Azure OpenAI | 文字嵌入與語言模型 |
| <strong>容器化</strong> | Docker + Docker Compose | 開發環境 |
| <strong>雲端平台</strong> | Microsoft Azure | 生產部署 |
| <strong>整合開發環境</strong> | VS Code | AI 聊天及開發工作流程 |

### 開發工具

| <strong>工具</strong> | <strong>用途</strong> |
|----------|----------|
| **asyncpg** | 高性能 PostgreSQL 驅動 |
| **Pydantic** | 數據驗證與序列化 |
| **Azure SDK** | 雲端服務整合 |
| **pytest** | 測試框架 |
| **Docker** | 容器化與部署 |

### 生產環境堆疊

| <strong>服務</strong> | **Azure 資源** | <strong>用途</strong> |
|----------|----------------|----------|
| <strong>數據庫</strong> | Azure Database for PostgreSQL | 託管資料庫服務 |
| <strong>容器</strong> | Azure Container Apps | 無伺服器容器托管 |
| **AI 服務** | Microsoft Foundry | OpenAI 模型及端點 |
| <strong>監控</strong> | Application Insights | 可觀測性與診斷 |
| <strong>安全</strong> | Azure Key Vault | 秘密管理與配置 |

## 🎬 實際使用情境

讓我們看看不同用戶如何與 MCP 伺服器互動：

### 情境 1：店面經理績效回顧

<strong>用戶</strong>：Sarah，西雅圖店經理  
<strong>目標</strong>：分析上一季度銷售表現

<strong>自然語言查詢</strong>：
>「請顯示我店鋪 2024 年第 4 季度收入排名前 10 的產品」

<strong>流程</strong>：
1. VS Code AI Chat 發送查詢至 MCP 伺服器
2. MCP 伺服器識別 Sarah 的店鋪上下文（西雅圖）
3. 行級安全政策過濾僅限西雅圖店資料
4. 生成並執行 SQL 查詢
5. 格式化結果並回傳 AI Chat
6. AI 提供分析與洞察

### 情境 2：語義搜尋產品發現

<strong>用戶</strong>：Mike，庫存經理  
<strong>目標</strong>：尋找與客戶需求相似的產品

<strong>自然語言查詢</strong>：
>「有哪些產品類似『戶外用防水電氣連接器』？」

<strong>流程</strong>：
1. 查詢由語義搜尋工具處理
2. Azure OpenAI 生成文字嵌入向量
3. pgvector 執行相似度搜尋
4. 相關產品依關聯度排序
5. 結果包含產品詳細及庫存狀況
6. AI 建議替代品及組合銷售機會

### 情境 3：跨店分析

<strong>用戶</strong>：Jennifer，區域經理  
<strong>目標</strong>：比較過去六個月所有店鋪銷售表現

<strong>自然語言查詢</strong>：
>「請比較所有店鋪過去 6 個月的類別銷售」

<strong>流程</strong>：
1. 設定 RLS 上下文符合區域經理存取權限
2. 生成複雜多店鋪查詢
3. 匯總各店資料
4. 結果含趨勢與比較
5. AI 識別洞察與建議

## 🔒 深入安全與多租戶

我們的實作側重企業級安全：

### 行級安全 (RLS)

PostgreSQL RLS 確保資料隔離：

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```

### 用戶身份管理

每個 MCP 連線包含：
- **店面經理 ID**：RLS 上下文唯一識別
- <strong>角色分配</strong>：權限與存取層級
- <strong>會話管理</strong>：安全身份認證令牌
- <strong>審計日誌</strong>：完整存取歷史

### 資料保護

多重安全層面：
- <strong>連線加密</strong>：所有資料庫連線採用 TLS
- **防 SQL 注入**：僅參數化查詢
- <strong>輸入驗證</strong>：全面請求驗證
- <strong>錯誤處理</strong>：錯誤訊息不洩漏敏感資料

## 🎯 主要收穫

完成本簡介後，你應理解：

✅ **MCP 價值主張**：如何橋接 AI 助理與現實數據  
✅ <strong>業務背景</strong>：Zava Retail 的需求與挑戰  
✅ <strong>架構概覽</strong>：主要組件及交互原理  
✅ <strong>技術棧</strong>：使用的工具與框架  
✅ <strong>安全模型</strong>：多租戶數據訪問與保護  
✅ <strong>使用模式</strong>：真實查詢場景及工作流程  

## 🚀 下一步

準備深入探究？繼續閱讀：

**[實驗 01：核心架構概念](../01-Architecture/README.md)**

學習 MCP 伺服器架構模式、數據庫設計原則及零售分析方案的詳細技術實作。

## 📚 補充資源

### MCP 文件
- [MCP 規範](https://modelcontextprotocol.io/docs/) - 官方協議文件
- [MCP 初學者指南](https://aka.ms/mcp-for-beginners) - 全面學習指南
- [FastMCP 文件](https://github.com/modelcontextprotocol/python-sdk) - Python SDK 文件

### 數據庫整合
- [PostgreSQL 文件](https://www.postgresql.org/docs/) - 全面參考
- [pgvector 指南](https://github.com/pgvector/pgvector) - 向量擴展說明
- [行級安全](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - PostgreSQL RLS 指南

### Azure 服務
- [Azure OpenAI 文件](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI 服務整合
- [Azure PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - 託管數據庫服務
- [Azure 容器應用](https://docs.microsoft.com/azure/container-apps/) - 無伺服器容器

---

<strong>免責聲明</strong>：本教學為使用虛構零售數據的學習練習。實際生產環境中，請務必遵守貴組織的資料治理與安全政策。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->