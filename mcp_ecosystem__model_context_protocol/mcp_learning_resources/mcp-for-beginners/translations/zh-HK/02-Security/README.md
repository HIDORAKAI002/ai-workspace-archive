# MCP 安全性：AI 系統的全面保護

[![MCP Security Best Practices](../../../translated_images/zh-HK/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(點擊上方圖片觀看本課程影片)_

安全性是 AI 系統設計的基礎，因此我們將其列為第二部分重點。這符合微軟來自[安全未來計劃](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/)的<strong>設計即安全</strong>原則。

模型上下文協議 (MCP) 為 AI 驅動的應用帶來強大新能力，同時引入超越傳統軟件風險的獨特安全挑戰。MCP 系統面對既有的安全問題（安全編碼、最小權限、供應鏈安全）以及新的 AI 專屬威脅，包括提示注入、工具汙染、會話劫持、混淆代理攻擊、令牌直通漏洞和動態能力修改。

本課程探討 MCP 實現中最關鍵的安全風險——涵蓋身份驗證、授權、過度權限、間接提示注入、會話安全、混淆代理問題、令牌管理和供應鏈漏洞。你將學習可操作的控制措施與最佳實踐，並善用微軟解決方案如 Prompt Shields、Azure Content Safety 和 GitHub Advanced Security 來加強你的 MCP 部署。

## 學習目標

完成本課程後，你將能夠：

- **識別 MCP 專屬威脅**：認識 MCP 系統中獨特的安全風險，包括提示注入、工具汙染、過度權限、會話劫持、混淆代理問題、令牌直通漏洞與供應鏈風險
- <strong>應用安全控制</strong>：實施有效緩解措施，包括強健的身份驗證、最小權限存取、安全令牌管理、會話安全控制和供應鏈驗證
- <strong>利用微軟安全方案</strong>：理解並部署微軟 Prompt Shields、Azure Content Safety 及 GitHub Advanced Security 以保護 MCP 負載
- <strong>驗證工具安全</strong>：認識工具元資料驗證的重要性，監控動態變化，防禦間接提示注入攻擊
- <strong>整合最佳實踐</strong>：結合既有安全基礎（安全編碼、伺服器硬化、零信任）與 MCP 專屬控制實現全面保護

# MCP 安全架構與控制措施

現代 MCP 實現需要多層安全方法，既涵蓋傳統軟件安全，也應對 AI 專屬威脅。快速演進的 MCP 規範持續完善其安全控制，促進與企業安全架構及既有最佳實踐的更佳整合。

微軟[數位防禦報告](https://aka.ms/mddr)研究顯示，**98% 的已通報違規事件可藉由強化安全衛生實務預防**。最有效的保護策略是將基礎安全措施與 MCP 專屬控制結合——驗證過的基線安全措施仍是降低整體安全風險的關鍵。

## 當前安全環境

> **注意：** 本資訊反映至 **2026年2月5日** 的 MCP 安全標準，與 **MCP 規範 2025-11-25** 保持一致。MCP 協議持續快速演進，未來版本可能引入新的身份驗證模式及增強控制。請隨時參考最新 [MCP 規範](https://spec.modelcontextprotocol.io/)、[MCP GitHub 倉庫](https://github.com/modelcontextprotocol) 與[安全最佳實踐文件](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) 以獲取最新指引。

> **展望未來：** `2026-07-28` 發行候選版本將強化授權——客戶端必須驗證授權回應中的 `iss` 參數 (RFC 9207)，在動態客戶端註冊中宣告 OpenID Connect 的 `application_type`，並將註冊認證綁定至發行授權伺服器。完整授權 SEP 清單請見 [MCP 變更預覽：2026-07-28 發行候選版](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## 🏔️ MCP 安全高峰研討會工作坊 (Sherpa)

對於<strong>實務安全訓練</strong>，我們強烈推薦 **MCP 安全高峰研討會工作坊 (Sherpa)**——一趟在微軟 Azure 上保護 MCP 伺服器的全面引導安全遠征。

### 工作坊概述

[MCP 安全高峰研討會工作坊](https://azure-samples.github.io/sherpa/) 提供一套經驗證的「易受攻擊 → 利用攻擊 → 修復 → 驗證」實作方法，帶來切實可行的安全培訓。你將會：

- <strong>透過破壞學習</strong>：親身體驗意圖不安全伺服器的漏洞利用
- **採用 Azure 原生安全**：利用 Azure Entra ID、Key Vault、API 管理及 AI 內容安全
- <strong>遵循深度防禦</strong>：逐步構建多層安全防護
- **依循 OWASP 標準**：每項技術均對應[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)
- <strong>取得生產用程式碼</strong>：帶著運作中且經測試的實作成果離開

### 遠征路線

| 營地 | 重點 | 涵蓋 OWASP 風險 |
|------|-------|---------------------|
| <strong>基地營</strong> | MCP 基礎與身份驗證漏洞 | MCP01, MCP07 |
| **營地 1：身份** | OAuth 2.1、Azure 管理身份、Key Vault | MCP01, MCP02, MCP07 |
| **營地 2：網關** | API 管理、私有端點、治理 | MCP02, MCP06, MCP07, MCP09 |
| **營地 3：輸入/輸出安全** | 提示注入、PII 保護、內容安全 | MCP03, MCP05, MCP06, MCP10 |
| **營地 4：監控** | 日誌分析、儀表板、威脅偵測 | MCP04, MCP08 |
| <strong>山頂</strong> | 紅隊 / 藍隊整合測試 | 所有 |

<strong>開始體驗</strong>：[https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP 十大安全風險

[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) 詳細列出 MCP 實現中最關鍵的十大安全風險：

| 風險 | 說明 | Azure 緩解措施 |
|------|-------------|------------------|
| **MCP01** | 令牌誤用與秘密外洩 | Azure Key Vault、管理身份 |
| **MCP02** | 權限提升（範圍蔓延） | RBAC、有條件存取 |
| **MCP03** | 工具汙染 | 工具驗證、完整性核查 |
| **MCP04** | 軟件供應鏈攻擊與相依性篡改 | GitHub Advanced Security、相依性掃描 |
| **MCP05** | 指令注入與執行 | 輸入驗證、沙箱隔離 |
| **MCP06** | 意圖流程顛覆 | Azure AI Content Safety、Prompt Shields |
| **MCP07** | 身份認證與授權不足 | Azure Entra ID、OAuth 2.1 PKCE |
| **MCP08** | 無審核與遙測 | Azure Monitor、Application Insights |
| **MCP09** | 影子 MCP 伺服器 | API 中心治理、網絡隔離 |
| **MCP10** | 上下文注入與過度共享 | 資料分類、最小暴露 |

### MCP 身份認證演進

MCP 規範在身份認證與授權方面已有重大演變：

- <strong>早期做法</strong>：早期規範要求開發者實作自訂身份驗證伺服器，MCP 伺服器則作為 OAuth 2.0 授權伺服器直接管理用戶身份認證
- **現行標準（2025-11-25）**：新版規範允許 MCP 伺服器委派身份驗證給外部身份提供者（如 Microsoft Entra ID），提升安全性並簡化實作複雜度
- <strong>傳輸層安全性</strong>：增強對本地（STDIO）及遠端（可串流 HTTP）連線的安全傳輸支援及身份驗證模式

## 身份驗證與授權安全

### 當前安全挑戰

現代 MCP 實現面臨多項身份驗證及授權挑戰：

### 風險與威脅向量

- <strong>錯誤配置的授權邏輯</strong>：MCP 伺服器錯誤的授權實作可能暴露敏感資料並錯誤地套用存取控制
- **OAuth 令牌遭竊**：本地 MCP 伺服器令牌被盜用使攻擊者得以冒充伺服器並訪問下游服務
- <strong>令牌直通漏洞</strong>：不當的令牌處理造成功能繞過與責任歸屬缺失
- <strong>過度權限</strong>：MCP 伺服器權限過大違反最小權限原則，擴大攻擊面

#### 令牌直通：嚴重的反模式

目前 MCP 授權規範明確禁止<strong>令牌直通</strong>，因其嚴重的安全影響：

##### 安全控制繞過
- MCP 伺服器與下游 API 實施重要安全控制（速率限制、請求驗證、流量監控）依賴正確令牌驗證
- 客戶端直接使用 API 令牌會繞過這些關鍵防護，破壞整體安全架構

##### 責任與稽核挑戰  
- MCP 伺服器無法區分使用上游發行令牌的客戶端，導致稽核追蹤失效
- 下游資源伺服器日誌顯示誤導性請求來源，而非實際 MCP 伺服器中介者
- 事故調查與合規審查變得格外困難

##### 資料外洩風險
- 未經驗證的令牌宣告允許持有被竊令牌的惡意者利用 MCP 伺服器作為資料外洩代理
- 信任邊界違規，使未授權存取模式繞過預期安全控制

##### 多服務攻擊向量
- 被接受的遭竄改令牌可在多個服務間橫向移動
- 當無法確認令牌來源時，服務間信任假設會被破壞

### 安全控制與緩解措施

**關鍵安全要求：**

> <strong>強制要求</strong>：MCP 伺服器<strong>不得</strong>接受非明確為 MCP 伺服器簽發的任何令牌

#### 身份驗證與授權控制

- <strong>嚴格授權審查</strong>：全面稽核 MCP 伺服器授權邏輯，確保僅授權預期用戶及客戶端存取敏感資源
  - <strong>實作指南</strong>：[Azure API 管理作為 MCP 伺服器身份驗證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - <strong>身份整合</strong>：[使用 Microsoft Entra ID 驗證 MCP 伺服器](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- <strong>安全令牌管理</strong>：實施[微軟的令牌驗證與生命週期最佳實踐](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - 驗證令牌的受眾宣告與 MCP 伺服器身份相符
  - 實施適當的令牌輪替及過期策略
  - 預防令牌重放攻擊與未授權使用

- <strong>受保護的令牌儲存</strong>：確保存儲令牌時於靜態與傳輸過程中皆加密
  - <strong>最佳實踐</strong>：[安全令牌儲存與加密指南](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### 存取控制實作

- <strong>最小權限原則</strong>：只授予 MCP 伺服器完成既定功能所需的最低權限
  - 定期審查與更新權限以防止權限蔓延
  - <strong>微軟文件</strong>：[安全的最小權限存取](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **基於角色的存取控制 (RBAC)**：實施細緻的角色分配
  - 對特定資源及操作嚴格限定角色範圍
  - 避免廣泛或不必要權限，降低攻擊面

- <strong>持續權限監控</strong>：實施持續的存取稽核與監控
  - 監控權限使用模式以發現異常
  - 及時糾正過度或未使用的權限

## AI 專屬安全威脅

### 提示注入與工具操控攻擊

現代 MCP 實現面臨複雜的 AI 專屬攻擊向量，傳統安全措施無法完全防範：

#### **間接提示注入（跨域提示注入）**

<strong>間接提示注入</strong> 是 MCP 啟用的 AI 系統中最關鍵的漏洞之一。攻擊者將惡意指令隱藏於外部內容——文件、網頁、電子郵件或資料來源中，AI 系統接著會將其當作合法指令處理。

**攻擊場景：**
- <strong>文件基礎注入</strong>：惡意指令藏於被處理的文件中，觸發非預期的 AI 動作
- <strong>網頁內容利用</strong>：被入侵的網頁嵌入提示，當 AI 抓取時操控行為
- <strong>電子郵件攻擊</strong>：電子郵件中惡意提示導致 AI 助手洩露資訊或執行未授權動作
- <strong>數據來源汙染</strong>：被入侵的資料庫或 API 向 AI 系統提供受汙染內容

<strong>現實影響</strong>：此類攻擊可能導致資料外洩、隱私侵害、有害內容生成以及用戶互動操控。詳細解析請參閱 [MCP 中的提示注入（Simon Willison）](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)。

![Prompt Injection Attack Diagram](../../../translated_images/zh-HK/prompt-injection.ed9fbfde297ca877.webp)

#### <strong>工具汙染攻擊</strong>

<strong>工具汙染</strong> 攻擊 MCP 工具的元資料，利用大型語言模型如何解讀工具說明及參數來做出執行決策的機制。

**攻擊機制：**
- <strong>元資料操縱</strong>：攻擊者在工具描述、參數定義或使用示例中注入惡意指令
- <strong>隱形指令</strong>：工具元資料中嵌入的隱藏提示，AI 模型解析但人類用戶不可見
- **動態工具修改（「拔地毯」）**：用戶先行授權的工具後續被修改以執行惡意行動且用戶不知情
- <strong>參數注入</strong>：惡意內容嵌入工具參數結構，影響模型行為


<strong>託管伺服器風險</strong>：遠端 MCP 伺服器存在較高風險，因為工具定義可在初次用戶批准後更新，導致之前安全的工具變為惡意。欲獲得完整分析，請參閱 [工具中毒攻擊（Invariant Labs）](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)。

![工具注入攻擊示意圖](../../../translated_images/zh-HK/tool-injection.3b0b4a6b24de6bef.webp)

#### **其他 AI 攻擊向量**

- **跨域提示注入（XPIA）**：利用多個域內容來繞過安全控管的複雜攻擊
- <strong>動態能力修改</strong>：即時變更工具能力，逃避初步安全評估
- <strong>上下文視窗中毒</strong>：操縱大型上下文視窗以隱藏惡意指令的攻擊
- <strong>模型混淆攻擊</strong>：利用模型限制造成不可預測或不安全行為


### AI 安全風險影響

**高影響後果：**
- <strong>資料外洩</strong>：未經授權存取及竊取企業或個人敏感資料
- <strong>隱私洩漏</strong>：個人識別資訊（PII）及機密商業資料曝光  
- <strong>系統操控</strong>：對關鍵系統和工作流程進行非預期修改
- <strong>憑證竊取</strong>：認證令牌及服務憑證遭受攻擊
- <strong>橫向移動</strong>：利用受損的 AI 系統作為廣泛網路攻擊的跳板

### Microsoft AI 安全解決方案

#### **AI 提示防護：對抗注入攻擊的進階保護**

Microsoft <strong>AI 提示防護</strong>通過多層安全措施，提供對直接和間接提示注入攻擊的全方位防禦：

##### **核心防護機制：**

1. <strong>先進偵測與過濾</strong>
   - 機器學習算法及自然語言處理技術，偵測外部內容中的惡意指令
   - 即時分析文件、網頁、電子郵件及資料來源中的潛藏威脅
   - 對合法與惡意提示模式的上下文理解

2. <strong>聚光燈技術</strong>  
   - 區分受信任系統指令與可能受損的外部輸入
   - 文本轉換方法，增強模型相關性同時隔離惡意內容
   - 協助 AI 系統維持正確指令層級，忽略注入命令

3. <strong>分隔符與數據標記系統</strong>
   - 明確界定受信任系統訊息與外部輸入文本之間的邊界
   - 特殊標記突顯受信任與非受信任資料來源間的界線
   - 清晰分隔避免指令混淆及未授權執行命令

4. <strong>持續威脅情報</strong>
   - Microsoft 持續監控新興攻擊模式並更新防護措施
   - 積極尋找新注入技術及攻擊向量
   - 定期更新安全模型，保持對演進威脅的防護效力

5. **Azure 內容安全整合**
   - 作為全面 Azure AI 內容安全套件一部分
   - 額外偵測越獄企圖、有害內容及安全政策違規
   - AI 應用組件間的統一安全控管

<strong>實施資源</strong>：[Microsoft 提示防護說明文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft 提示防護示意](../../../translated_images/zh-HK/prompt-shield.ff5b95be76e9c78c.webp)


## 進階 MCP 安全威脅

### 會話劫持漏洞

<strong>會話劫持</strong>為有狀態 MCP 實作中的關鍵攻擊向量，未經授權者取得並濫用合法會話識別碼，佯裝客戶端執行未授權操作。

#### <strong>攻擊場景與風險</strong>

- <strong>會話劫持提示注入</strong>：攻擊者使用竊取的會話 ID 在共用會話狀態的伺服器注入惡意事件，可能引發有害行動或存取敏感資訊
- <strong>直接冒充</strong>：竊取的會話 ID 使攻擊者能直接呼叫 MCP 伺服器，繞過身份驗證，視同合法使用者
- <strong>受損可續流</strong>：攻擊者可提前終止請求，使合法客戶端在恢復時遭遇潛在惡意內容

#### <strong>會話管理安全控管</strong>

**關鍵需求：**
- <strong>授權驗證</strong>：實作授權的 MCP 伺服器<strong>必須</strong>驗證所有入站請求，且<strong>不得</strong>依賴會話進行身份驗證
- <strong>安全會話生成</strong>：使用加密安全、非決定性且透過安全隨機數生成器製造的會話 ID
- <strong>使用者專屬綁定</strong>：使用類似 `<user_id>:<session_id>` 格式，將會話 ID 綁定至特定使用者資訊，避免跨用戶會話濫用
- <strong>會話生命週期管理</strong>：實作妥善過期、輪替及失效機制，限制漏洞時窗
- <strong>傳輸安全</strong>：所有通訊必須使用 HTTPS，防止會話 ID 被截取

### 混淆代理問題

<strong>混淆代理問題</strong>發生於 MCP 伺服器充當客戶端與第三方服務之身份驗證代理時，透過靜態客戶端 ID 利用授權繞過的機會。

#### <strong>攻擊機制與風險</strong>

- **基於 Cookie 的同意繞過**：先前使用者驗證造成同意 Cookie，攻擊者利用惡意授權請求與特製重定向 URI 加以濫用
- <strong>授權碼竊取</strong>：現有同意 Cookie 可能使授權伺服器跳過同意頁面，將授權碼轉送至攻擊者控制的端點  
- **未授權 API 存取**：竊取授權碼可交換令牌並冒用使用者身份，無需明確授權

#### <strong>緩解策略</strong>

**必須控管：**
- <strong>明確同意要求</strong>：使用靜態客戶端 ID 的 MCP 代理伺服器<strong>必須</strong>為動態註冊的客戶端取得使用者同意
- **OAuth 2.1 安全實作**：遵循最新 OAuth 安全最佳實踐，包括對所有授權請求實施 PKCE（授權碼證明碼交換）
- <strong>嚴格客戶端驗證</strong>：實作重定向 URI 和客戶端識別碼的嚴格驗證，防止濫用

### 令牌直通漏洞  

<strong>令牌直通</strong>是明顯的反模式，指 MCP 伺服器接受客戶端令牌而未進行適當驗證即轉發至下游 API，違反 MCP 授權規範。

#### <strong>安全含意</strong>

- <strong>控管規避</strong>：客戶端直通 API 令牌，繞過重要的速率限制、驗證和監控控管
- <strong>審計紀錄破壞</strong>：上游發行的令牌使無法識別客戶端，破壞事件調查能力
- <strong>代理式資料外洩</strong>：未驗證令牌使惡意者可利用伺服器作為未授權資料訪問的代理
- <strong>信任邊界違規</strong>：當令牌來源無法驗證時，破壞下游服務的信任假設
- <strong>多服務攻擊擴散</strong>：受損令牌被多服務接受，助長橫向移動

#### <strong>必備安全控管</strong>

**不可妥協的要求：**
- <strong>令牌驗證</strong>：MCP 伺服器<strong>不得</strong>接受非明確為該 MCP 伺服器發行的令牌
- <strong>受眾驗證</strong>：始終驗證令牌受眾聲明與 MCP 伺服器身分相符
- <strong>適當令牌生命週期</strong>：實作短期存取令牌及安全輪替措施


## AI 系統供應鏈安全

供應鏈安全已超越傳統軟體依賴範疇，涵蓋整個 AI 生態系統。現代 MCP 實作必須嚴格驗證並監控所有 AI 相關元件，因每個元件皆可能引入威脅系統完整性的弱點。

### 擴展的 AI 供應鏈元件

**傳統軟體依賴：**
- 開源函式庫及框架
- 容器映像及基礎系統  
- 開發工具及建置管線
- 基礎建設元件及服務

**AI 專用供應鏈元素：**
- <strong>基礎模型</strong>：來自多方供應商的預訓練模型，需進行來源驗證
- <strong>嵌入服務</strong>：外部向量化及語義搜尋服務
- <strong>上下文提供者</strong>：資料來源、知識庫及文件庫  
- **第三方 API**：外部 AI 服務、機器學習管線及資料處理端點
- <strong>模型工件</strong>：權重、配置及精調模型變體
- <strong>訓練資料來源</strong>：用於模型訓練及精調的數據集

### 全面供應鏈安全策略

#### <strong>元件驗證與信任</strong>
- <strong>來源驗證</strong>：整合前驗證所有 AI 元件的來源、授權與完整性
- <strong>安全評估</strong>：對模型、資料來源與 AI 服務進行漏洞掃描與安全審核
- <strong>信譽分析</strong>：評估 AI 服務供應商的安全紀錄與實務
- <strong>符合法規驗證</strong>：確保所有元件符合組織安全及監管要求

#### <strong>安全部署管線</strong>  
- **自動化 CI/CD 安全**：在自動部署管線中整合安全掃描
- <strong>工件完整性</strong>：對所有部署工件（程式碼、模型、配置）實施密碼學驗證
- <strong>分階段部署</strong>：採用漸進式部署策略，每階段皆進行安全驗證
- <strong>可信工件倉庫</strong>：僅從驗證且安全的工件註冊庫和存放庫部署

#### <strong>持續監控與回應</strong>
- <strong>依賴掃描</strong>：持續監控所有軟體及 AI 元件依賴的漏洞
- <strong>模型監控</strong>：持續評估模型行為、性能漂移及安全異常
- <strong>服務健康追蹤</strong>：監控外部 AI 服務的可用性、安全事件及政策變更
- <strong>威脅情報整合</strong>：導入特定 AI 與機器學習安全風險的威脅情報

#### <strong>存取控制與最小權限原則</strong>
- <strong>元件級權限</strong>：根據業務需要限制模型、資料及服務的存取
- <strong>服務帳號管理</strong>：實作具最低必要權限的專用服務帳號
- <strong>網路分段</strong>：隔離 AI 元件並限制服務間網路存取
- **API 閘道控管**：使用集中式 API 閘道控管並監控對外部 AI 服務的存取

#### <strong>事件回應與復原</strong>
- <strong>快速回應程序</strong>：已建立補丁或更換受影響 AI 元件的流程
- <strong>憑證輪替</strong>：自動化系統輪替密鑰、API 金鑰及服務憑證
- <strong>回滾能力</strong>：迅速回退至先前已知良好版本的 AI 元件
- <strong>供應鏈違規復原</strong>：針對上游 AI 服務受損的專門回應程序

### Microsoft 安全工具與整合

**GitHub Advanced Security** 提供全面的供應鏈防護，包括：
- <strong>秘密掃描</strong>：自動檢測程式庫中之憑證、API 金鑰及令牌
- <strong>依賴掃描</strong>：對開源依賴函式庫進行漏洞評估
- **CodeQL 分析**：針對安全漏洞及程式碼問題的靜態分析
- <strong>供應鏈洞察</strong>：呈現依賴健康狀況與安全狀態資訊

**Azure DevOps 與 Azure Repos 整合：**
- 在 Microsoft 開發平台中無縫整合安全掃描
- Azure Pipelines 中針對 AI 工作負載的自動安全檢查
- AI 元件安全部署政策強制執行

**Microsoft 內部實務：**
Microsoft 在所有產品中執行廣泛的供應鏈安全實務。了解經驗分享，請參閱 [Microsoft 軟體供應鏈安全之旅](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)。


## 基礎安全最佳實踐

MCP 實作承襲並構建於組織現有安全態勢。加強基礎安全措施顯著提升 AI 系統及 MCP 部署的整體安全性。

### 核心安全原則

#### <strong>安全開發實務</strong>
- **遵守 OWASP**：防範 [OWASP 前十大](https://owasp.org/www-project-top-ten/) 網頁應用漏洞
- **AI 專屬防護**：實施 [LLM OWASP 前十大](https://genai.owasp.org/download/43299/?tmstv=1731900559) 控制
- <strong>安全秘密管理</strong>：使用專屬保險庫存放令牌、API 金鑰及敏感配置資料
- <strong>端對端加密</strong>：對所有應用組件與資料流實施安全通訊
- <strong>輸入驗證</strong>：嚴謹驗證全部使用者輸入、API 參數及資料來源

#### <strong>基礎設施強化</strong>
- <strong>多因素驗證</strong>：對所有管理及服務帳號強制 MFA
- <strong>修補管理</strong>：對作業系統、框架與依賴進行自動且及時修補  
- <strong>身份提供者整合</strong>：透過企業身份提供者（Microsoft Entra ID、Active Directory）集中管理身份
- <strong>網路分段</strong>：邏輯隔離 MCP 元件，限制橫向移動風險
- <strong>最小權限原則</strong>：所有系統元件及帳號僅賦予必要最少權限

#### <strong>安全監控與偵測</strong>
- <strong>全面日誌記錄</strong>：詳細記錄 AI 應用活動，包括 MCP 客戶端與伺服器互動
- **SIEM 整合**：集中式安全資訊與事件管理以偵測異常
- <strong>行為分析</strong>：利用 AI 監控系統與使用者行為的異常模式
- <strong>威脅情報</strong>：整合外部威脅來源及妥洽指標（IOC）
- <strong>事件回應</strong>：明確定義安全事件偵測、反應與復原程序

#### <strong>零信任架構</strong>
- **永不信任，持續驗證**：不斷驗證使用者、裝置與網路連線
- <strong>微分段</strong>：細緻化網路控管，隔離單一工作負載與服務
- <strong>身份中心化安全</strong>：基於驗證身份，而非網路位置，實施安全政策
- <strong>持續風險評估</strong>：根據當前情境與行為動態評估安全態勢
- <strong>條件存取</strong>：基於風險因素、位置及裝置信任度調整存取控管

### 企業整合模式

#### **Microsoft 安全生態系統整合**
- **Microsoft Defender for Cloud**：全方位雲端安全態勢管理
- **Azure Sentinel**：原生雲端 SIEM 與 SOAR 功能，保護 AI 工作負載
- **Microsoft Entra ID**：企業身份與存取管理，具條件存取策略
- **Azure Key Vault**：具硬體安全模組（HSM）支援的集中秘密管理
- **Microsoft Purview**：AI 資料來源與工作流程的資料治理與合規

#### <strong>合規與治理</strong>
- <strong>法規遵循</strong>：確保 MCP 實作符合特定產業合規要求（GDPR、HIPAA、SOC 2）

- <strong>資料分類</strong>：對 AI 系統處理的敏感資料進行適當的分類與處理  
- <strong>稽核追蹤</strong>：全面的記錄以符合法規要求及進行取證調查  
- <strong>隱私控制</strong>：在 AI 系統架構中實施隱私設計原則  
- <strong>變更管理</strong>：針對 AI 系統修改進行安全審查的正式流程  

這些基礎實踐建立了強固的安全基準，提升 MCP 特定安全控制的效能，並為 AI 驅動的應用提供全方位的保護。  

## 主要安全重點  

- <strong>分層安全方法</strong>：結合基礎安全實務（安全編碼、最小權限、供應鏈驗證、持續監控）與 AI 專屬控制，達成全面防護  

- **AI 專屬威脅環境**：MCP 系統面臨特有風險，包括提示注入、工具中毒、會話劫持、混淆代理問題、Token 直通漏洞及過度權限，需採取專門緩解措施  

- <strong>身份驗證與授權卓越性</strong>：採用外部身份提供者（Microsoft Entra ID）實施強韌身份驗證，執行正確的 Token 驗證，絕不接受非明確為您的 MCP 伺服器發行的 Token  

- **AI 攻擊防護**：部署 Microsoft Prompt Shields 與 Azure Content Safety，抵禦間接提示注入及工具中毒攻擊，同時驗證工具元資料並監控動態變更  

- <strong>會話與傳輸安全</strong>：使用加密安全且非決定性、與使用者身份綁定的會話 ID，正確管理會話生命週期，嚴禁使用會話作為身份驗證依據  

- **OAuth 安全最佳實踐**：透過用戶明確同意防止混淆代理攻擊，搭配 PKCE 的適當 OAuth 2.1 實施及嚴格的重導 URI 驗證  

- **Token 安全原則**：避免 Token 直通反模式，驗證 Token 的受眾聲明，實施短時效 Token 並安全輪替，維持明確的信任邊界  

- <strong>全面供應鏈安全</strong>：對所有 AI 生態系元件（模型、嵌入向量、上下文提供者、外部 API）實施與傳統軟體依賴相同的安全嚴格要求  

- <strong>持續演進</strong>：緊跟快速演變的 MCP 規範，為安全社群標準做出貢獻，並隨協定成熟調整安全策略  

- <strong>微軟安全整合</strong>：利用微軟全面的安全生態系（Prompt Shields、Azure Content Safety、GitHub 高級安全、Entra ID）增強 MCP 部署防護  

## 全面資源  

### **官方 MCP 安全文件**  
- [MCP 規範 (最新：2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP 安全最佳實踐](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  
- [MCP GitHub 倉庫](https://github.com/modelcontextprotocol)  

### **OWASP MCP 安全資源**  
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 詳盡的 OWASP MCP 十大風險與 Azure 實作指引  
- [OWASP MCP 十大](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全風險  
- [MCP 安全高峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure 上 MCP 的實戰安全訓練  

### <strong>安全標準與最佳實踐</strong>  
- [OAuth 2.0 安全最佳實踐 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Web 應用程式十大安全風險](https://owasp.org/www-project-top-ten/)  
- [OWASP 大型語言模型安全十大](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- [微軟數位防禦報告](https://aka.ms/mddr)  

### **AI 安全研究與分析**  
- [MCP 中的提示注入 (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)  
- [工具中毒攻擊 (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)  
- [MCP 安全研究簡報 (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)  

### <strong>微軟安全解決方案</strong>  
- [Microsoft Prompt Shields 文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure 內容安全服務](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Microsoft Entra ID 安全](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)  
- [Azure Token 管理最佳實踐](https://learn.microsoft.com/entra/identity-platform/access-tokens)  
- [GitHub 高級安全](https://github.com/security/advanced-security)  

### <strong>實作指南與教學</strong>  
- [Azure API 管理作為 MCP 認證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
- [Microsoft Entra ID 與 MCP 伺服器認證](https://den.dev/blog/mcp-server-auth-entra-id-session/)  
- [安全 Token 儲存與加密 (影片)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)  

### **DevOps 與供應鏈安全**  
- [Azure DevOps 安全](https://azure.microsoft.com/products/devops)  
- [Azure Repos 安全](https://azure.microsoft.com/products/devops/repos/)  
- [微軟供應鏈安全旅程](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)  

## <strong>其他安全文件</strong>  

詳盡安全指導，請參閱本節專門文件：  

- **[MCP 安全最佳實踐 2025](./mcp-security-best-practices-2025.md)** - MCP 實作完整安全最佳實踐  
- **[Azure 內容安全實作](./azure-content-safety-implementation.md)** - Azure 內容安全整合之實務範例  
- **[MCP 安全控制 2025](./mcp-security-controls-2025.md)** - MCP 部署最新安全控制與技術  
- **[MCP 最佳實踐快速參考](./mcp-best-practices.md)** - 重要 MCP 安全做法快速參考指南  
- **[BlueHat 2026：保護 AI 未來：以深度防禦模式保障 MCP](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - 微軟安全應變中心 (MSRC) 分享的深度防禦模式  

### <strong>實戰安全培訓</strong>  

- **[MCP 安全高峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/)** - 涵蓋從基礎營到高峰營的 Azure MCP 伺服器全面實戰工作坊  
- **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)** - 所有 OWASP MCP 十大風險的參考架構及實作指導  

---  

## 下一步  

下一章：[第 3 章：快速入門](../03-GettingStarted/README.md)  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->