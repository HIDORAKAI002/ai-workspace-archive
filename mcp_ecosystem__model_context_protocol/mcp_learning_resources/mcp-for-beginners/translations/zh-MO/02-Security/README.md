# MCP 安全性：為 AI 系統提供全面保護

[![MCP Security Best Practices](../../../translated_images/zh-MO/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(點擊上方圖片觀看本課程影片)_

安全性是 AI 系統設計的根本，因此我們將其優先列為第二章節。這與微軟的[安全優先設計（Secure by Design）](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/)原則相符。

模型上下文協定（Model Context Protocol，MCP）為 AI 驅動的應用帶來強大新功能，同時引入超越傳統軟體風險的獨特安全挑戰。MCP 系統面對既有的安全問題（安全編碼、最小權限、供應鏈安全）及新出現的 AI 特有威脅，包含提示注入、工具中毒、會話劫持、混淆代理攻擊、令牌穿透漏洞和動態能力修改。

本課程探討 MCP 實作中最關鍵的安全風險，涵蓋身份驗證、授權、過度權限、間接提示注入、會話安全、混淆代理問題、令牌管理與供應鏈漏洞。您將學習具體可行的控管措施和最佳實務，以減輕這些風險，同時運用微軟解決方案如 Prompt Shields、Azure 內容安全和 GitHub 進階安全來強化 MCP 部署。

## 學習目標

完成本課程後，您將能夠：

- **識別 MCP 特有威脅**：認識 MCP 系統中獨特的安全風險，包括提示注入、工具中毒、過度權限、會話劫持、混淆代理問題、令牌穿透漏洞及供應鏈風險
- <strong>應用安全控管</strong>：實施有效緩解措施，包括強健的身份驗證、最小權限存取、安全令牌管理、會話安全控管及供應鏈驗證
- <strong>利用微軟安全解決方案</strong>：理解並部署微軟 Prompt Shields、Azure 內容安全和 GitHub 進階安全以保護 MCP 工作負載
- <strong>驗證工具安全</strong>：了解工具元資料驗證的重要性，監控動態變更，防禦間接提示注入攻擊
- <strong>整合最佳實務</strong>：結合既有安全基礎（安全編碼、伺服器強化、零信任）與 MCP 特定控管，提供全面保護

# MCP 安全架構與控管

現代 MCP 實作需要分層安全方法，既涵蓋傳統軟體安全，也面對 AI 特定威脅。快速演進的 MCP 規範持續成熟其安全控管，促進與企業安全架構與既有最佳實務的更佳整合。

來自[微軟數位防禦報告](https://aka.ms/mddr)的研究顯示，**98% 的通報入侵事件若有強健安全衛生習慣本可被防止**。最有效的防護策略結合基礎安全措施與 MCP 專屬控管—經證明的基線安全措施在降低整體風險方面影響最大。

## 當前安全形勢

> **注意：** 本資訊反映 MCP 安全標準截至 **2026 年 2 月 5 日**，符合 **MCP 規範 2025-11-25**。MCP 協定持續快速演進，未來實作可能引入新的身份驗證模式與增強控管。請務必參考最新的 [MCP 規範](https://spec.modelcontextprotocol.io/)、[MCP GitHub 倉庫](https://github.com/modelcontextprotocol)及[安全最佳實務文件](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) 以取得最新指引。

## 🏔️ MCP 安全高峰研討工作坊（Sherpa）

為了<strong>實務安全訓練</strong>，我們強烈推薦 **MCP 安全高峰研討工作坊**（Sherpa）— 一個在微軟 Azure 上安全保護 MCP 伺服器的全面導覽實務活動。

### 工作坊概覽

[MCP 安全高峰研討工作坊](https://azure-samples.github.io/sherpa/) 透過成熟的「漏洞 → 利用 → 修補 → 驗證」流程，提供實用且可行的安全訓練。您將：

- <strong>透過破壞學習</strong>：親身體驗漏洞，利用刻意不安全伺服器進行測試
- **使用 Azure 原生安全元件**：整合 Azure Entra ID、Key Vault、API 管理與 AI 內容安全
- <strong>遵循縱深防禦</strong>：逐步完成營地任務，建立全面安全層
- **應用 OWASP 標準**：每個技術對應於 [OWASP MCP Azure 安全指引](https://microsoft.github.io/mcp-azure-security-guide/)
- <strong>取得生產等級程式碼</strong>：帶走可運作並經測試的實作

### 探險路線

| 營地 | 重點 | 涵蓋 OWASP 風險 |
|------|-------|---------------------|
| <strong>基地營</strong> | MCP 基礎及身份驗證漏洞 | MCP01, MCP07 |
| **營地 1：身份** | OAuth 2.1、Azure 管理身份、Key Vault | MCP01, MCP02, MCP07 |
| **營地 2：閘道** | API 管理、私有端點、治理 | MCP02, MCP06, MCP07, MCP09 |
| **營地 3：輸出入安全** | 提示注入、個資保護、內容安全 | MCP03, MCP05, MCP06, MCP10 |
| **營地 4：監控** | 日誌分析、儀表板、威脅偵測 | MCP04, MCP08 |
| <strong>高峰</strong> | 紅隊 / 藍隊整合測試 | 全部 |

<strong>開始體驗</strong>：[https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP 前十名安全風險

[OWASP MCP Azure 安全指引](https://microsoft.github.io/mcp-azure-security-guide/) 詳細說明 MCP 實作的十大關鍵安全風險：

| 風險 | 說明 | Azure 緩解措施 |
|------|-------------|------------------|
| **MCP01** | 令牌管理不當與秘密外洩 | Azure Key Vault、管理身份 |
| **MCP02** | 範圍逐漸擴張導致權限升級 | RBAC、條件存取 |
| **MCP03** | 工具中毒 | 工具驗證、完整性檢查 |
| **MCP04** | 軟體供應鏈攻擊與相依性竄改 | GitHub 進階安全、相依性掃描 |
| **MCP05** | 指令注入與執行 | 輸入驗證、沙盒環境 |
| **MCP06** | 意圖流程被顛覆 | Azure AI 內容安全、Prompt Shields |
| **MCP07** | 身份驗證與授權不足 | Azure Entra ID、帶 PKCE 的 OAuth 2.1 |
| **MCP08** | 缺乏稽核與遙測 | Azure Monitor、Application Insights |
| **MCP09** | 影子 MCP 伺服器 | API 中央治理、網路隔離 |
| **MCP10** | 上下文注入與過度暴露 | 資料分類、最小曝光 |

### MCP 身份驗證的演進

MCP 規範在身份驗證與授權方式上有顯著變化：

- <strong>原始方法</strong>：早期規範要求開發者實作自訂身份驗證伺服器，MCP 伺服器充當 OAuth 2.0 授權伺服器直接管理使用者身份驗證
- **目前標準（2025-11-25）**：更新後規範允許 MCP 伺服器委派身份驗證給外部身份提供者（如 Microsoft Entra ID），提升安全態勢並減少實作複雜度
- <strong>傳輸層安全</strong>：增強對本地（STDIO）與遠端（可串流 HTTP）連線之安全傳輸與身份驗證模式的支持

## 身份驗證與授權安全

### 當前安全挑戰

現代 MCP 實作面臨諸多身份驗證與授權挑戰：

### 風險與攻擊向量

- <strong>授權邏輯誤配置</strong>：MCP 伺服器授權實作錯誤可能暴露敏感資料並錯誤套用存取控制
- **OAuth 令牌泄露**：本地 MCP 伺服器令牌遭竊，攻擊者可冒充伺服器並存取下游服務
- <strong>令牌穿透漏洞</strong>：不當令牌處理導致安全控管繞過及責任追蹤缺口
- <strong>過度權限</strong>：MCP 伺服器權限過大違反最小權限原則，擴大攻擊面

#### 令牌穿透：關鍵反模式

**令牌穿透在目前 MCP 授權規範中是明確禁止的**，因其嚴重安全影響：

##### 安全控管繞過
- MCP 伺服器與下游 API 實作重要安全控管（速率限制、請求驗證、流量監控），依賴正確令牌驗證
- 客戶端直接使用 API 令牌規避這些關鍵保護，破壞整體安全架構

##### 責任追蹤與稽核挑戰  
- MCP 伺服器無法辨識使用上游發行令牌之客戶端，破壞稽核軌跡
- 下游資源伺服器日誌顯示誤導性請求源，非實際 MCP 中介伺服器
- 事件調查和合規稽核由此大為增加困難

##### 資料外洩風險
- 未經驗證的令牌權利聲明，允許持有被竊令牌的惡意攻擊者利用 MCP 伺服器作為資料外洩代理
- 信任邊界被破壞，產生未授權的訪問模式，繞過預期安全控管

##### 多服務攻擊向量
- 被接受的受害令牌在多服務間流通，促進橫向移動攻擊
- 服務間基於令牌起源的信任假設因無法驗證而遭破壞

### 安全控管與緩解

**關鍵安全需求：**

> <strong>強制要求</strong>：MCP 伺服器<strong>不得接受</strong>非明確為 MCP 伺服器發行的任何令牌

#### 身份驗證與授權控管

- <strong>嚴格授權審查</strong>：全面稽核 MCP 伺服器授權邏輯，確保僅授權預期使用者與客戶端存取敏感資源
  - <strong>實作指引</strong>：[使用 Azure API 管理作為 MCP 伺服器的身份驗證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - <strong>身份整合</strong>：[利用 Microsoft Entra ID 為 MCP 伺服器進行身份驗證](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- <strong>安全令牌管理</strong>：落實[微軟令牌驗證與生命週期最佳實務](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - 驗證令牌主體聲明符合 MCP 伺服器身份
  - 實行適當令牌輪替與過期政策
  - 預防令牌重放攻擊與未授權使用

- <strong>保護性令牌存儲</strong>：令牌加密儲存，靜態及傳輸中皆確保安全
  - <strong>最佳實務</strong>：[安全令牌存儲與加密指引](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### 存取控制實作

- <strong>最小權限原則</strong>：僅授予 MCP 伺服器執行所需的最低權限
  - 定期檢視並更新權限，防止權限蔓延
  - <strong>微軟文檔</strong>：[安全的最小權限存取](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **基於角色的存取控制（RBAC）**：實施細緻角色分配
  - 嚴格定義資源及行動範圍
  - 避免廣泛或不必要授權，減小攻擊面

- <strong>持續權限監控</strong>：建立持續的存取審核及監控
  - 監測權限使用異常模式
  - 及時修正過度或未使用權限

## AI 專屬安全威脅

### 提示注入與工具操控攻擊

現代 MCP 實作面臨複雜的 AI 專屬攻擊向量，傳統安全措施難以全面應對：

#### **間接提示注入（跨域提示注入）**

<strong>間接提示注入</strong>是 MCP 啟用 AI 系統中極關鍵的漏洞。攻擊者將惡意指令嵌入外部內容—文件、網頁、電子郵件或資料來源—讓 AI 系統誤判為合法指令後處理。

**攻擊場景：**
- <strong>基於文件的注入</strong>：惡意指令隱藏於處理過的文件內，觸發 AI 非預期行為
- <strong>網頁內容利用</strong>：被攻陷的網頁夾帶內嵌提示，爬取時操控 AI 行為
- <strong>電郵攻擊</strong>：惡意提示透過電子郵件，使 AI 助手洩漏資訊或執行未授權動作
- <strong>資料源污染</strong>：遭竄改的資料庫或 API 對 AI 系統提供受污染內容

<strong>實際影響</strong>：此類攻擊可能導致資料外洩、隱私違規、有害內容生成及使用者互動操控。詳見 [MCP 中的提示注入（Simon Willison）](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)。

![Prompt Injection Attack Diagram](../../../translated_images/zh-MO/prompt-injection.ed9fbfde297ca877.webp)

#### <strong>工具中毒攻擊</strong>

<strong>工具中毒</strong>針對定義 MCP 工具的元資料，利用大型語言模型（LLM）解讀工具描述與參數決策時的弱點。

**攻擊機制：**
- <strong>元資料操控</strong>：攻擊者將惡意指令注入工具說明、參數定義或使用範例中
- <strong>隱蔽指令</strong>：藏於工具元資料中且 AI 模型解讀但人類無感的提示
- **動態工具修改（「Rug Pulls」）**：用戶核准後，工具遭後續修改執行惡意行為而用戶不察
- <strong>參數注入</strong>：惡意內容藏入工具參數結構，影響模型行為

<strong>託管伺服器風險</strong>：遠端 MCP 伺服器風險升高，因工具定義可於用戶核准後被更新，使過去安全工具變成惡意。詳盡分析見 [工具中毒攻擊（Invariant Labs）](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)。

![Tool Injection Attack Diagram](../../../translated_images/zh-MO/tool-injection.3b0b4a6b24de6bef.webp)

#### **其他 AI 攻擊向量**

- **跨域提示注入 (XPIA)**：複雜利用多域內容以繞過安全控管的攻擊
- <strong>動態能力修改</strong>：對工具能力進行即時變更，繞過初始安全評估
- <strong>上下文視窗中毒</strong>：操控大型上下文視窗以隱藏惡意指令的攻擊
- <strong>模型混淆攻擊</strong>：利用模型限制造成不可預測或不安全的行為


### AI 安全風險影響

**高影響後果：**
- <strong>資料外泄</strong>：未經授權存取及竊取企業或個人敏感資料
- <strong>隱私洩露</strong>：個人識別資訊 (PII) 及機密商業資料曝光  
- <strong>系統操控</strong>：對關鍵系統和工作流程的非預期修改
- <strong>憑證竊取</strong>：認證令牌及服務憑證遭入侵
- <strong>橫向移動</strong>：利用被入侵的 AI 系統作為更廣泛網絡攻擊的樞紐

### 微軟 AI 安全解決方案

#### **AI 提示屏障：先進防禦提示注入攻擊**

微軟 **AI 提示屏障** 通過多層安全機制，為直接和間接的提示注入攻擊提供全方位防禦：

##### **核心保護機制：**

1. <strong>先進偵測與過濾</strong>
   - 機器學習演算法和自然語言處理技術偵測外部內容中的惡意指令
   - 對文件、網頁、電子郵件和資料來源進行即時分析，檢測嵌入威脅
   - 正確區分合法與惡意提示模式的語境理解

2. <strong>聚光燈技術</strong>  
   - 區分可信系統指令與可能受損的外部輸入
   - 採用文本轉換方法提升模型相關性，同時隔離惡意內容
   - 協助 AI 系統維持正確指令層級，忽略注入指令

3. <strong>分隔符與數據標記系統</strong>
   - 明確界定可信系統訊息與外部輸入文本的邊界
   - 特殊標記突顯可信與不可信資料來源間的界限
   - 清晰分離防止指令混淆和未經授權的指令執行

4. <strong>持續威脅情報</strong>
   - 微軟持續監控新型攻擊模式並更新防禦
   - 前瞻性威脅狩獵新注入技巧及攻擊向量
   - 定期更新安全模型以維持對不斷演化威脅的效能

5. **Azure 內容安全整合**
   - 作為全面 Azure AI 內容安全套件一部分
   - 額外偵測越獄嘗試、有害內容及安全政策違規行為
   - AI 應用元件統一安全管控

<strong>實施資源</strong>：[Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/zh-MO/prompt-shield.ff5b95be76e9c78c.webp)


## 進階 MCP 安全威脅

### 會話劫持漏洞

<strong>會話劫持</strong> 是有狀態 MCP 實作中的關鍵攻擊向量，未經授權方取得並濫用合法會話識別碼，以冒充用戶執行未授權行為。

#### <strong>攻擊場景與風險</strong>

- <strong>會話劫持提示注入</strong>：擁有被盜會話 ID 的攻擊者向共享會話狀態的伺服器注入惡意事件，可能引發有害操作或存取敏感資料
- <strong>直接冒充</strong>：被盜會話 ID 允許直接呼叫 MCP 伺服器，繞過身份驗證，將攻擊者視為合法用戶
- <strong>可恢復資料流被攻擊</strong>：攻擊者可提前終止請求，導致合法客戶端用潛在惡意內容恢復連線

#### <strong>會話管理安全控管</strong>

**關鍵要求：**
- <strong>授權驗證</strong>：實作授權的 MCP 伺服器<strong>必須</strong>驗證所有入站請求，且<strong>不得</strong>依賴會話進行身份驗證
- <strong>安全會話產生</strong>：使用密碼學安全、非決定性會話 ID，由安全隨機數生成器創建
- <strong>用戶專屬綁定</strong>：以 `<user_id>:<session_id>` 等格式將會話 ID 與用戶資訊綁定，防止跨用戶會話濫用
- <strong>會話生命週期管理</strong>：實施適當的過期、輪替及失效機制，限制漏洞窗口
- <strong>傳輸安全</strong>：所有通信強制 HTTPS，防止會話 ID 攔截

### 混淆代理問題

<strong>混淆代理問題</strong> 發生於 MCP 伺服器充當用戶端與第三方服務之間的身份驗證代理時，靜態用戶端 ID 的濫用創造授權繞過機會。

#### <strong>攻擊機制與風險</strong>

- **基於 Cookie 的同意繞過**：先前用戶身份認證產生的同意 Cookie 被攻擊者利用，通過惡意授權請求及精心製作的重定向 URI 進行利用
- <strong>授權碼竊取</strong>：現有同意 Cookie 可能使授權伺服器跳過同意畫面，將授權碼重定向至攻擊者控制的端點  
- **未授權 API 存取**：被盜授權碼可交換令牌並冒充用戶，無需明示同意

#### <strong>緩解策略</strong>

**必須控管項目：**
- <strong>明確同意要求</strong>：使用靜態用戶端 ID 的 MCP 代理伺服器<strong>必須</strong>為每個動態註冊用戶端獲得使用者同意
- **OAuth 2.1 安全實施**：遵循最新 OAuth 安全最佳實踐，包括對所有授權請求實施 PKCE（授權碼交換證明密鑰）
- <strong>嚴格用戶端驗證</strong>：徹底驗證重定向 URI 與用戶端標識，以防止利用

### 令牌轉送漏洞  

<strong>令牌轉送</strong> 是一種明顯反模式，MCP 伺服器接受用戶端令牌而不進行適當驗證，直接轉發至下游 API，違反 MCP 授權規範。

#### <strong>安全影響</strong>

- <strong>控管繞過</strong>：用戶端直接使用令牌呼叫 API，繞過重要頻率限制、驗證與監控控管
- <strong>審計軌跡破壞</strong>：上游頒發的令牌使判定用戶端身分成為不可能，破壞事件調查能力
- <strong>代理數據外洩</strong>：未驗證令牌助惡意行為者將伺服器當代理通道進行未授權資料存取
- <strong>信任邊界違規</strong>：當令牌來源無法驗證，可能違背下游服務的信任假設
- <strong>多服務攻擊擴散</strong>：被接受的受損令牌跨多服務使用，促成橫向移動

#### <strong>必要安全控管</strong>

**不可妥協的要求：**
- <strong>令牌驗證</strong>：MCP 伺服器<strong>不得</strong>接受未明確頒發給 MCP 伺服器的令牌
- <strong>受眾驗證</strong>：始終驗證令牌受眾聲明與 MCP 伺服器身分相符
- <strong>適當令牌生命週期</strong>：實施短期存取令牌與安全輪替機制


## AI 系統供應鏈安全

供應鏈安全已超越傳統軟件依賴，涵蓋整個 AI 生態系統。現代 MCP 實作必須嚴格驗證及監控所有 AI 相關元件，因為每個元件都可能引入導致系統完整性受損的潛在漏洞。

### 擴展的 AI 供應鏈元件

**傳統軟件依賴：**
- 開源庫及架構
- 容器映像及基底系統  
- 開發工具及建置流程
- 基礎架構元件及服務

**AI 專屬供應鏈元素：**
- <strong>基礎模型</strong>：來自各供應商的預訓練模型，需驗證來源
- <strong>嵌入服務</strong>：外部向量化及語義搜尋服務
- <strong>上下文提供者</strong>：資料來源、知識庫及文檔儲存庫  
- **第三方 API**：外部 AI 服務、機器學習流程和資料處理端點
- <strong>模型檔案</strong>：權重、設定及微調模型變體
- <strong>訓練資料來源</strong>：用於模型訓練及調優的資料集

### 全面供應鏈安全策略

#### <strong>元件驗證與信任</strong>
- <strong>來源驗證</strong>：整合前驗證所有 AI 元件的來源、授權及完整性
- <strong>安全評估</strong>：對模型、資料來源及 AI 服務進行漏洞掃描與安全審查
- <strong>聲譽分析</strong>：評估 AI 服務供應商的安全紀錄及實踐
- <strong>合規驗證</strong>：確保所有元件符合組織安全與法規要求

#### <strong>安全部署管線</strong>  
- **自動化 CI/CD 安全**：在自動化部署管線中整合安全掃描
- <strong>檔案完整性</strong>：對所有部署檔案（程式碼、模型、設定）實施密碼學驗證
- <strong>分階段部署</strong>：採用安全驗證的漸進部署策略
- <strong>可信檔案庫</strong>：僅從驗證的安全檔案庫部署

#### <strong>持續監控與回應</strong>
- <strong>依賴性掃描</strong>：對所有軟件及 AI 元件依賴進行持續漏洞監控
- <strong>模型監控</strong>：持續評估模型行為、效能偏移及安全異常
- <strong>服務健康追蹤</strong>：監控外部 AI 服務的可用性、安全事件及政策變更
- <strong>威脅情報整合</strong>：結合專門針對 AI 及機器學習安全風險的威脅情報

#### <strong>存取控管與最小權限</strong>
- <strong>元件層級權限</strong>：基於業務需求限制模型、資料與服務的存取
- <strong>服務帳戶管理</strong>：實施具最小必要權限的專用服務帳戶
- <strong>網路分段</strong>：隔離 AI 元件並限制服務間網路存取
- **API Gateway 控制**：透過集中化 API 閘道管控並監控外部 AI 服務的存取

#### <strong>事件回應與復原</strong>
- <strong>快速回應流程</strong>：建立修補或替換受損 AI 元件的流程
- <strong>憑證輪替</strong>：自動化系統用於更換密鑰、API 金鑰與服務憑證
- <strong>回滾能力</strong>：能快速恢復至先前已知安全的 AI 元件版本
- <strong>供應鏈違規復原</strong>：針對上游 AI 服務受損的專門應對程序

### 微軟安全工具與整合

**GitHub Advanced Security** 提供全面供應鏈保護，包括：
- <strong>秘密掃描</strong>：自動偵測倉庫中憑證、API 金鑰與令牌
- <strong>依賴掃描</strong>：開源依賴與庫的漏洞評估
- **CodeQL 分析**：靜態程式碼分析以找出安全漏洞與程式缺陷
- <strong>供應鏈洞察</strong>：依賴健康和安全狀態的可視化

**Azure DevOps 與 Azure Repos 整合：**
- 微軟開發平台全面整合安全掃描
- Azure Pipelines 中針對 AI 工作負載的自動安全檢查
- AI 元件安全部署的政策執行

**微軟內部實踐：**
微軟在所有產品中實施廣泛的供應鏈安全實踐。詳見 [微軟保障軟件供應鏈之旅](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)。


## 基礎安全最佳實踐

MCP 實作繼承並建立於組織既有的安全姿態，強化基礎安全實踐可顯著提升 AI 系統及 MCP 部署的整體安全性。

### 核心安全基礎

#### <strong>安全開發實踐</strong>
- **OWASP 遵循**：防護 [OWASP 十大](https://owasp.org/www-project-top-ten/) 網頁應用程式漏洞
- **AI 專屬防護**：實施 [LLM OWASP 十大](https://genai.owasp.org/download/43299/?tmstv=1731900559) 控制措施
- <strong>安全秘密管理</strong>：使用專用金庫管理令牌、API 金鑰與敏感設定資料
- <strong>端到端加密</strong>：建立所有應用元件與資料流程間的安全通訊
- <strong>輸入驗證</strong>：嚴謹驗證所有用戶輸入、API 參數及資料來源

#### <strong>基礎架構強化</strong>
- <strong>多重身份驗證</strong>：所有管理與服務帳戶強制使用 MFA
- <strong>補丁管理</strong>：自動且及時更新作業系統、框架與依賴元件  
- <strong>身份提供者整合</strong>：透過企業身份提供者（Microsoft Entra ID、Active Directory）統一身份管理
- <strong>網路分段</strong>：邏輯隔離 MCP 元件，限制橫向移動風險
- <strong>最小權限原則</strong>：所有系統元件與帳戶只授予必要最低權限

#### <strong>安全監控與偵測</strong>
- <strong>全面日誌紀錄</strong>：詳盡記錄 AI 應用活動含 MCP 用戶端-伺服器互動
- **SIEM 整合**：集中安全資訊與事件管理以偵測異常
- <strong>行為分析</strong>：利用 AI 監控偵測系統與用戶行為異常模式
- <strong>威脅情報</strong>：引入外部威脅資料及入侵指標 (IOC)
- <strong>事件回應</strong>：明確的安全事件偵測、回應及復原流程

#### <strong>零信任架構</strong>
- **永不信任，持續驗證**：持續驗證用戶、裝置與網路連線
- <strong>微分段</strong>：具體網路控管，隔離單一工作負載與服務
- <strong>身份中心安全</strong>：以驗證身份為基礎的安全政策，不依賴網路位置
- <strong>持續風險評估</strong>：基於當前語境與行為動態調整安全姿態
- <strong>條件存取</strong>：根據風險、位置及裝置信任度調整存取權限

### 企業整合模式

#### <strong>微軟安全生態系統整合</strong>
- **Microsoft Defender for Cloud**：全面雲端安全姿態管理
- **Azure Sentinel**：雲端原生 SIEM 及 SOAR 功能，保護 AI 工作負載
- **Microsoft Entra ID**：企業身份與存取管理，結合條件存取政策
- **Azure Key Vault**：以硬體安全模組 (HSM) 支援的集中秘密管理
- **Microsoft Purview**：AI 資料來源與工作流程之資料治理與合規

#### <strong>合規與治理</strong>
- <strong>法規對齊</strong>：確保 MCP 實作符合產業合規要求（GDPR、HIPAA、SOC 2）
- <strong>資料分類</strong>：正確分類及處理 AI 系統處理的敏感資料
- <strong>審計軌跡</strong>：提供法規遵循及鑑識調查的全面日誌
- <strong>隱私控管</strong>：在 AI 系統架構導入隱私設計原則
- <strong>變更管理</strong>：對 AI 系統變更進行正式安全審查程序

這些基礎實踐打造堅固的安全基線，增強 MCP 專屬安全控管效能，為 AI 驅動應用提供全面防護。

## 主要安全重點摘要
- <strong>分層安全策略</strong>：結合基礎安全實踐（安全編碼、最小權限、供應鏈驗證、持續監控）與 AI 專屬控制措施，以提供全面防護

- **AI 專屬威脅環境**：MCP 系統面臨獨特風險，包括提示注入、工具中毒、會話劫持、誤用代理問題、令牌直通漏洞及過度權限，需採取專門緩解措施

- <strong>認證與授權卓越</strong>：使用外部身份提供者（Microsoft Entra ID）實施堅固認證，強制令牌正確驗證，絕不接受未明確為您的 MCP 伺服器簽發的令牌

- **AI 攻擊防禦**：部署 Microsoft Prompt Shields 及 Azure Content Safety 防禦間接提示注入與工具中毒攻擊，同時驗證工具元資料並監控動態變更

- <strong>會話與傳輸安全</strong>：使用加密安全、非決定性且綁定用戶身份的會話 ID，實施正確的會話生命週期管理，且絕不使用會話做為認證依據

- **OAuth 安全最佳實踐**：透過用戶對動態註冊客戶端的明確同意、防止誤用代理攻擊，使用正確的 OAuth 2.1 及 PKCE 實作，並嚴格驗證重定向 URI

- <strong>令牌安全原則</strong>：避免令牌直通的反模式，驗證令牌受眾聲明，實施短期有效令牌及安全輪替，維護明確信任邊界

- <strong>全面供應鏈安全</strong>：對所有 AI 生態元件（模型、嵌入、上下文提供者、外部 API）施以與傳統軟體相同的安全嚴謹對待

- <strong>持續演進</strong>：緊跟快速演進的 MCP 規範，積極參與安全社群標準，隨協議成熟維持適應性安全姿態

- **Microsoft 安全集成**：利用 Microsoft 全方位安全生態系（Prompt Shields、Azure Content Safety、GitHub 進階安全、Entra ID）強化 MCP 部署防護

## 全面資源

### **官方 MCP 安全文件**
- [MCP 規範 (最新：2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳實踐](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub 倉庫](https://github.com/modelcontextprotocol)

### **OWASP MCP 安全資源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 包含 Azure 實作指導的 OWASP MCP 十大風險詳解
- [OWASP MCP 十大](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全風險
- [MCP 安全峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure 上 MCP 的實戰安全訓練

### <strong>安全標準與最佳實踐</strong>
- [OAuth 2.0 安全最佳實踐 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP 十大網頁應用安全](https://owasp.org/www-project-top-ten/)
- [大規模語言模型 OWASP 十大](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft 數位防禦報告](https://aka.ms/mddr)

### **AI 安全研究與分析**
- [MCP 中的提示注入 (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [工具中毒攻擊 (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP 安全研究簡報 (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft 安全解決方案**
- [Microsoft Prompt Shields 文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety 服務](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID 安全](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure 令牌管理最佳實踐](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub 進階安全](https://github.com/security/advanced-security)

### <strong>實作指南與教學</strong>
- [Azure API 管理作為 MCP 認證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID 與 MCP 伺服器認證](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [安全令牌儲存與加密（影片）](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps 與供應鏈安全**
- [Azure DevOps 安全](https://azure.microsoft.com/products/devops)
- [Azure Repos 安全](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft 軟體供應鏈安全旅程](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## <strong>額外安全文件</strong>

若需完整安全指引，請參考本節的專門文件：

- **[MCP 安全最佳實踐 2025](./mcp-security-best-practices-2025.md)** - MCP 實作完整安全最佳實踐
- **[Azure Content Safety 實作](./azure-content-safety-implementation.md)** - Azure Content Safety 集成實作範例  
- **[MCP 安全控管 2025](./mcp-security-controls-2025.md)** - MCP 部署最新安全控管與技術
- **[MCP 最佳實踐快速參考](./mcp-best-practices.md)** - MCP 安全實務精要速查
- **[BlueHat 2026：保護 AI 未來：以深度防禦模式保障 MCP](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Microsoft 安全回應中心 (MSRC) 分享深度防衛模式

### <strong>實戰安全訓練</strong>

- **[MCP 安全峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/)** - 從基礎營到高峰營的 Azure MCP 伺服器全面實戰安全工作坊
- **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)** - 針對 OWASP MCP 十大風險的架構與實作指導

---

## 下一步

下一章：[第 3 章：快速入門](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->