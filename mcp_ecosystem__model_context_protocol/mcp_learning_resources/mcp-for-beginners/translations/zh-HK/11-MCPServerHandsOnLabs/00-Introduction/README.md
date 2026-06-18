# MCP 數據庫整合簡介

## 🎯 本實驗涵蓋內容

本入門實驗全面介紹如何構建具數據庫整合功能的模型上下文協議（MCP）伺服器。您將通過位於 https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail 的 Zava Retail 零售分析實際案例，了解業務背景、技術架構和實際應用。

## 概述

**模型上下文協議（Model Context Protocol, MCP）** 讓 AI 助手能夠安全地實時存取並與外部資料源互動。結合數據庫整合，MCP 開啟了強大的數據驅動 AI 應用能力。

本學習路徑教您構建可投入生產的 MCP 伺服器，通過 PostgreSQL 將 AI 助手連接至零售銷售數據，並實作企業級模式如行級安全、語義搜尋和多租戶資料存取。

## 學習目標

完成本實驗後，您將能夠：

- <strong>定義</strong> 模型上下文協議及其數據庫整合的核心優勢  
- <strong>識別</strong> 搭載資料庫的 MCP 伺服器架構關鍵組件  
- <strong>了解</strong> Zava Retail 案例及其業務需求  
- <strong>辨識</strong> 企業級安全且可擴充數據庫存取模式  
- <strong>列出</strong> 本學習路徑中使用的工具和技術  

## 🧭 挑戰：AI 與現實數據的結合

### 傳統 AI 限制

現代 AI 助手功能強大，但在處理現實業務數據時仍面臨重大限制：

| <strong>挑戰</strong> | <strong>說明</strong> | <strong>商業影響</strong> |
|----------|----------|--------------|
| <strong>靜態知識</strong> | AI 模型基於固定訓練資料，無法存取當前業務數據 | 洞察過時，錯失機會 |
| <strong>數據孤島</strong> | 資訊被鎖定在資料庫、API 及系統中，AI 無法輕易觸及 | 分析不完整，工作流程分散 |
| <strong>安全限制</strong> | 直接存取資料庫涉及安全與合規疑慮 | 部署受限，資料需人工預處理 |
| <strong>複雜查詢</strong> | 業務用戶須具備技術知識以提取資料洞見 | 採用率低，流程效率差 |

### MCP 解決方案

模型上下文協議提供以下解決方案：

- <strong>實時資料存取</strong>：AI 助手可查詢即時資料庫與 API  
- <strong>安全整合</strong>：透過身份驗證和權限控制實現受控存取  
- <strong>自然語言介面</strong>：業務用戶可用簡單英文提問  
- <strong>標準化協議</strong>：跨 AI 平台與工具通用  

## 🏪 認識 Zava Retail：我們的學習案例 https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

在本學習路徑中，我們將構建用於 **Zava Retail** 的 MCP 伺服器，該案例為一家虛構的 DIY 零售連鎖商，擁有多家實體門市。這個真實場景展示了企業級 MCP 的實作方式。

### 業務背景

**Zava Retail** 經營：

- **8 家實體店鋪**，遍布華盛頓州（西雅圖、貝爾維尤、塔科馬、斯波坎、埃弗里特、雷蒙德、柯克蘭）  
- **1 家線上商店**，提供電商銷售  
- <strong>多元化產品目錄</strong>，涵蓋工具、五金、園藝用品及建材  
- <strong>多層管理架構</strong>，含門市經理、區域經理及高層執行  

### 業務需求

門市經理和高層需 AI 驅動的分析能力來：

1. <strong>分析銷售績效</strong>，涵蓋多門市與不同時間區間  
2. <strong>追蹤庫存水平</strong>，並掌握補貨需求  
3. <strong>了解客戶行為</strong>與購買模式  
4. <strong>透過語義搜尋</strong>挖掘產品洞見  
5. <strong>使用自然語言查詢</strong>產生報告  
6. <strong>以角色為基礎控管</strong>維護資料安全  

### 技術需求

MCP 伺服器必須提供：

- <strong>多租戶資料存取</strong>，門市經理只能看到所屬門市數據  
- <strong>靈活查詢</strong>，支持複雜 SQL 操作  
- <strong>語義搜尋</strong>，利於產品發現與推薦  
- <strong>實時數據</strong>，反映當前業務狀態  
- <strong>安全身份驗證</strong>，搭配行級安全（RLS）  
- <strong>可擴充架構</strong>，支援多並發用戶  

## 🏗️ MCP 伺服器架構總覽

我們的 MCP 伺服器採用分層架構，針對數據庫整合優化：

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

### 主要組件

#### **1. MCP 伺服器層**
- **FastMCP 框架**：現代 Python MCP 伺服器實作  
- <strong>工具註冊</strong>：宣告式工具定義與型別安全  
- <strong>請求上下文</strong>：用戶身份與會話管理  
- <strong>錯誤處理</strong>：健全的錯誤管理與日誌記錄  

#### **2. 數據庫整合層**
- <strong>連接池管理</strong>：高效 asyncpg 連接處理  
- <strong>結構提供者</strong>：動態表結構探索  
- <strong>查詢執行器</strong>：搭配 RLS 上下文的安全 SQL 執行  
- <strong>交易管理</strong>：ACID 合規與回滾處理  

#### **3. 安全層**
- **行級安全 (RLS)**：PostgreSQL RLS 實現多租戶數據隔離  
- <strong>用戶身份</strong>：門市經理身份驗證與授權  
- <strong>存取控制</strong>：細粒度權限和審計追蹤  
- <strong>輸入驗證</strong>：SQL 注入防護及查詢驗證  

#### **4. AI 強化層**
- <strong>語義搜尋</strong>：產品發現的向量嵌入  
- **Azure OpenAI 整合**：文本嵌入生成  
- <strong>相似度演算法</strong>：pgvector 餘弦相似度搜尋  
- <strong>搜尋優化</strong>：索引與效能調校  

## 🔧 技術堆疊

### 核心技術

| <strong>組件</strong> | <strong>技術</strong> | <strong>用途</strong> |
|----------|----------|----------|
| **MCP 框架** | FastMCP (Python) | 現代 MCP 伺服器實作 |
| <strong>資料庫</strong> | PostgreSQL 17 + pgvector | 關聯資料與向量搜尋 |
| **AI 服務** | Azure OpenAI | 文本嵌入與語言模型 |
| <strong>容器化</strong> | Docker + Docker Compose | 開發環境 |
| <strong>雲端平台</strong> | Microsoft Azure | 生產部署 |
| **IDE 整合** | VS Code | AI 聊天與開發工作流程 |

### 開發工具

| <strong>工具</strong> | <strong>用途</strong> |
|----------|----------|
| **asyncpg** | 高效能 PostgreSQL 驅動 |
| **Pydantic** | 資料驗證與序列化 |
| **Azure SDK** | 雲端服務整合 |
| **pytest** | 測試框架 |
| **Docker** | 容器化與部署 |

### 生產環境堆疊

| <strong>服務</strong> | **Azure 資源** | <strong>用途</strong> |
|----------|---------------|----------|
| <strong>資料庫</strong> | Azure Database for PostgreSQL | 托管資料庫服務 |
| <strong>容器</strong> | Azure Container Apps | 無伺服器容器主機 |
| **AI 服務** | Microsoft Foundry | OpenAI 模型與端點 |
| <strong>監控</strong> | Application Insights | 可觀測性與診斷 |
| <strong>安全</strong> | Azure Key Vault | 機密與設定管理 |

## 🎬 實際使用場景探索

讓我們看看不同用戶如何與 MCP 伺服器互動：

### 場景 1：門市經理績效回顧

<strong>用戶</strong>：Sarah，西雅圖門市經理  
<strong>目標</strong>：分析 2024 年第四季銷售績效

<strong>自然語言查詢</strong>：
>「顯示我門市 2024 年第四季按收入排名前 10 的商品」

<strong>過程</strong>：
1. VS Code AI Chat 向 MCP 伺服器發送查詢  
2. MCP 伺服器識別 Sarah 所屬門市（西雅圖）  
3. RLS 政策篩選資料，僅提供西雅圖門市資料  
4. 生成並執行 SQL 查詢  
5. 格式化結果並返回 AI Chat  
6. AI 提供分析洞見  

### 場景 2：語義搜索協助產品發現

<strong>用戶</strong>：Mike，庫存經理  
<strong>目標</strong>：尋找與客戶需求相似產品

<strong>自然語言查詢</strong>：
>「我們售賣哪些產品與‘戶外用防水電氣連接器’相似？」

<strong>過程</strong>：
1. 語義搜尋工具處理查詢  
2. Azure OpenAI 生成文字嵌入向量  
3. pgvector 執行相似度搜尋  
4. 依相關性排名相關產品  
5. 結果包含產品細節與庫存  
6. AI 建議替代品及組合購買方案  

### 場景 3：跨店鋪分析

<strong>用戶</strong>：Jennifer，區域經理  
<strong>目標</strong>：比較所有門市的銷售表現

<strong>自然語言查詢</strong>：
>「比較過去六個月所有門市的品類銷售情況」

<strong>過程</strong>：
1. 設定區域經理 RLS 上下文  
2. 生成複雜的多門市 SQL 查詢  
3. 聚合多店鋪資料  
4. 回傳趨勢與比較結果  
5. AI 識別洞察與建議  

## 🔒 安全與多租戶深入解析

我們的實作重視企業級安全標準：

### 行級安全（RLS）

PostgreSQL RLS 保證資料隔離：

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
- **門市經理 ID**：RLS 上下文的唯一標識  
- <strong>角色分配</strong>：權限與存取級別  
- <strong>會話管理</strong>：安全身份驗證令牌  
- <strong>審計日誌</strong>：完整存取歷史  

### 數據保護

多重安全層：
- <strong>連接加密</strong>：所有資料庫連線採用 TLS  
- **SQL 注入防護**：僅使用參數化查詢  
- <strong>輸入驗證</strong>：全面請求驗證  
- <strong>錯誤處理</strong>：錯誤訊息不洩露敏感資料  

## 🎯 主要收穫

完成本入門後，您應能理解：

✅ **MCP 價值主張**：如何串接 AI 助手與真實數據  
✅ <strong>業務背景</strong>：Zava Retail 的需求與挑戰  
✅ <strong>架構總覽</strong>：關鍵組件及其互動關係  
✅ <strong>技術堆疊</strong>：一路使用的工具與框架  
✅ <strong>安全模型</strong>：多租戶資料存取及保護  
✅ <strong>使用模式</strong>：實際查詢案例與工作流程  

## 🚀 下一步

準備深入學習嗎？繼續閱讀：

**[實驗 01：核心架構概念](../01-Architecture/README.md)**

了解 MCP 伺服器架構模式、資料庫設計原則，以及支撐我們零售分析解決方案的詳細技術實作。

## 📚 額外資源

### MCP 文件
- [MCP 規範](https://modelcontextprotocol.io/docs/) - 官方協議文件  
- [MCP 初學者指南](https://aka.ms/mcp-for-beginners) - 全面 MCP 學習指南  
- [FastMCP 文件](https://github.com/modelcontextprotocol/python-sdk) - Python SDK 文件  

### 數據庫整合
- [PostgreSQL 文件](https://www.postgresql.org/docs/) - 完整 PostgreSQL 參考  
- [pgvector 指南](https://github.com/pgvector/pgvector) - 向量擴展文件  
- [行級安全](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - PostgreSQL RLS 指南  

### Azure 服務
- [Azure OpenAI 文件](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI 服務整合  
- [Azure PostgreSQL 文件](https://docs.microsoft.com/azure/postgresql/) - 托管資料庫服務  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - 無伺服器容器  

---

<strong>免責聲明</strong>：本文件為學習練習，使用虛構零售數據。實務中請務必遵循貴機構的資料治理與安全政策。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->