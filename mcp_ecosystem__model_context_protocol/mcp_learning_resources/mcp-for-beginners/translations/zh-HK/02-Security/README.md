# MCP 安全性：為 AI 系統提供全面保護

[![MCP Security Best Practices](../../../translated_images/zh-HK/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(點擊上方圖片觀看本課程影片)_

安全性是 AI 系統設計的基礎，這就是為什麼我們將其作為第二部分來優先考慮。此理念與 Microsoft 來自 [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/) 的 **Secure by Design** 原則相一致。

模型上下文協議（MCP）為 AI 驅動的應用帶來強大新功能，同時引入超出傳統軟件風險的獨特安全挑戰。MCP 系統面臨既有的安全問題（安全編碼、最小權限、供應鏈安全）以及新的 AI 相關威脅，包括提示注入、工具中毒、會話劫持、混淆代理攻擊、令牌透傳漏洞和動態能力修改。

本課程探討 MCP 實作中最關鍵的安全風險 —— 涵蓋身份驗證、授權、過度許可、間接提示注入、會話安全、混淆代理問題、令牌管理和供應鏈漏洞。您將學習可行的控制措施與最佳實踐，並利用 Microsoft 解決方案如 Prompt Shields、Azure 內容安全和 GitHub Advanced Security 來加強 MCP 部署。

## 學習目標

課程結束時，您將能夠：

- **識別 MCP 專屬威脅**：辨識 MCP 系統獨特安全風險，包括提示注入、工具中毒、過度權限、會話劫持、混淆代理問題、令牌透傳漏洞及供應鏈風險
- <strong>應用安全控制</strong>：實施有效的緩解措施，包括強健身份驗證、最小權限存取、安全令牌管理、會話安全控管及供應鏈驗證
- **利用 Microsoft 安全解決方案**：了解並部署 Microsoft Prompt Shields、Azure 內容安全和 GitHub Advanced Security 以保護 MCP 工作負載
- <strong>驗證工具安全性</strong>：認識工具元資料驗證的重要性，監控動態變更，防禦間接提示注入攻擊
- <strong>整合最佳實踐</strong>：將既有安全基礎（安全編碼、伺服器硬化、零信任）與 MCP 專屬控制結合，實現全面防護

# MCP 安全架構與控制

現代 MCP 實作需要分層安全策略，涵蓋傳統軟件安全與 AI 專屬威脅。快速演進的 MCP 規範持續完善安全控制，促進與企業安全架構和既有最佳實踐更好整合。

根據 [Microsoft Digital Defense Report](https://aka.ms/mddr) 研究顯示，**98% 的已通報資安事件可由良好安全衛生防護避免**。最有效的保護策略，結合基礎安全作法與 MCP 專屬控制——經驗證的基準安全措施仍是降低整體安全風險的最關鍵方案。

## 目前安全現況

> **注意：** 本資訊反映截至 **2026 年 2 月 5 日** 的 MCP 安全標準，與 **MCP 規範 2025-11-25** 相符。MCP 協議持續快速演化，未來實作可能引入新認證模式與增強控制。請務必參考最新的 [MCP 規範](https://spec.modelcontextprotocol.io/)、[MCP GitHub 儲存庫](https://github.com/modelcontextprotocol) 及 [安全最佳實踐文件](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) 以取得最新指引。

## 🏔️ MCP 安全峰會工作坊（Sherpa）

為獲得 <strong>實作安全訓練</strong>，我們強烈推薦參加 **MCP 安全峰會工作坊**（Sherpa）——一趟在 Microsoft Azure 裡安全強化 MCP 伺服器的全面指導旅程。

### 工作坊介紹

[MCP 安全峰會工作坊](https://azure-samples.github.io/sherpa/) 以經證實的「易受攻擊 → 利用 → 修復 → 驗證」方法提供實用的可操作安全訓練。您將會：

- <strong>透過嘗試出錯學習</strong>：親自體驗並利用刻意建構的弱點進行攻擊
- **使用 Azure 原生安全性工具**：運用 Azure Entra ID、Key Vault、API 管理與 AI 內容安全
- <strong>依防禦深度策略遞進</strong>：透過各階段演練建立全面安全層
- **套用 OWASP 標準**：所有技術皆映射至 [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- <strong>取得生產環境程式碼</strong>：帶走可運作並經測試的實作範例

### 行程路線

| 營地 | 焦點 | 涉及 OWASP 風險 |
|------|-------|---------------------|
| <strong>基地營</strong> | MCP 基礎與身份驗證漏洞 | MCP01、MCP07 |
| **營地 1：身份識別** | OAuth 2.1、Azure 管理身份、Key Vault | MCP01、MCP02、MCP07 |
| **營地 2：網關** | API 管理、私有端點、治理 | MCP02、MCP06、MCP07、MCP09 |
| **營地 3：輸入/輸出安全** | 提示注入、個人識別資訊保護、內容安全 | MCP03、MCP05、MCP06、MCP10 |
| **營地 4：監控** | 日誌分析、儀表板、威脅偵測 | MCP04、MCP08 |
| <strong>峰會營地</strong> | 紅藍隊整合測試 | 全部 |

<strong>開始體驗</strong>：[https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP 前十大安全風險

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) 詳述 MCP 實作中最關鍵的十大安全風險：

| 風險編號 | 描述 | Azure 緩解措施 |
|------|-------------|------------------|
| **MCP01** | 令牌管理不當與秘密外洩 | Azure Key Vault、管理身份 |
| **MCP02** | 權限提升與範圍擴張 | RBAC、條件式存取 |
| **MCP03** | 工具中毒 | 工具驗證、完整性檢查 |
| **MCP04** | 軟體供應鏈攻擊與依賴篡改 | GitHub Advanced Security、依賴掃描 |
| **MCP05** | 指令注入與執行 | 輸入驗證、沙盒環境 |
| **MCP06** | 意圖流程顛覆 | Azure AI 內容安全、Prompt Shields |
| **MCP07** | 身份驗證與授權不足 | Azure Entra ID、OAuth 2.1 搭配 PKCE |
| **MCP08** | 審計與遙測不足 | Azure 監控、Application Insights |
| **MCP09** | 隱藏 MCP 伺服器 | API Center 治理、網路隔離 |
| **MCP10** | 上下文注入與過度共享 | 資料分類、最少暴露 |

### MCP 認證的演進

MCP 規範在身份驗證與授權方面已有重大演進：

- <strong>初始做法</strong>：早期規範要求開發者自行實作身份驗證伺服器，MCP 伺服器作為 OAuth 2.0 授權伺服器直接管理用戶認證
- **現行標準（2025-11-25）**：更新後規範允許 MCP 伺服器將身份驗證委派給外部身份提供者（如 Microsoft Entra ID），以提升安全態勢並降低實作難度
- <strong>傳輸層安全</strong>：增強對安全傳輸機制的支援，包含本地（STDIO）與遠端（Streamable HTTP）連線的正確認證模式

## 身份驗證與授權安全

### 當前安全挑戰

現代 MCP 實作面臨多項身份驗證與授權挑戰：

### 風險與威脅途徑

- <strong>授權邏輯配置錯誤</strong>：MCP 伺服器授權實作錯誤可能導致敏感資料暴露及存取控制錯誤
- **OAuth 令牌洩漏**：本地 MCP 伺服器令牌被竊，攻擊者可冒充伺服器存取下游服務
- <strong>令牌透傳漏洞</strong>：不當令牌處理會造成安全控管繞過及責任追蹤缺失
- <strong>過度權限</strong>：MCP 伺服器權限過大，違反最小權限原則並擴大攻擊面

#### 令牌透傳：嚴重反模式

根據現行 MCP 授權規範，<strong>明確禁止令牌透傳</strong>，因其具有嚴重安全隱憂：

##### 安全控管繞過  
- MCP 伺服器和下游 API 實施關鍵安全措施（流量限制、請求驗證、流量監測）依賴正確令牌驗證
- 用戶直接對 API 令牌使用繞過這些重要防護機制，破壞安全架構

##### 責任追蹤與審計困難  
- MCP 伺服器無法分辨使用上游簽發令牌的客戶端，破壞審計足跡
- 下游資源伺服器日誌所顯示的請求來源並非實際的 MCP 伺服器代理者
- 事故調查與合規審核變得極為複雜

##### 資料竊漏風險  
- 對令牌聲明未經驗證，攻擊者可持偷竊令牌將 MCP 伺服器作為資料外洩代理
- 信任邊界遭破壞，導致非授權存取模式繞過預期防護

##### 多服務攻擊途徑  
- 被多服務接受的攻陷令牌允許連帶攻擊跨系統移動
- 當無法驗證令牌來源時，服務間信任假設被打破

### 安全控制與緩解措施

**關鍵安全要求：**

> <strong>強制遵守</strong>：MCP 伺服器<strong>不可接受</strong>任何非明確為該 MCP 伺服器簽發的令牌

#### 身份驗證與授權控制

- <strong>嚴謹授權審核</strong>：全面審查 MCP 伺服器授權邏輯，確保僅預期用戶與客戶端可存取敏感資源
  - <strong>實作指南</strong>：[Azure API 管理作為 MCP 伺服器身份驗證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - <strong>身份整合</strong>：[使用 Microsoft Entra ID 進行 MCP 伺服器身份驗證](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- <strong>安全令牌管理</strong>：執行 [Microsoft 令牌驗證與生命周期最佳實踐](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - 驗證令牌受眾聲明符合 MCP 伺服器身份
  - 實行適當令牌輪換與過期政策
  - 防範令牌重放與未授權使用

- <strong>保護的令牌儲存</strong>：令牌存放時及傳輸時皆加密保護  
  - <strong>最佳實踐</strong>：[安全令牌儲存與加密指南](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### 存取控制實施

- <strong>最小權限原則</strong>：僅授予 MCP 伺服器完成預期功能的最低權限
  - 定期審查與更新權限以防止特權擴張
  - **Microsoft 文檔**：[安全最小特權存取](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **基於角色授權控制（RBAC）**：實施細粒度角色分配
  - 嚴格限制角色範圍於特定資源與操作
  - 避免寬泛或不必要權限以降低攻擊面

- <strong>持續權限監控</strong>：實施持續存取審計與監控
  - 監控權限使用模式異常
  - 迅速修正過度或未使用權限

## AI 專屬安全威脅

### 提示注入與工具操控攻擊

現代 MCP 實作面臨傳統安全措施無法全面防禦的複雜 AI 專屬攻擊向量：

#### **間接提示注入（跨域提示注入）**

<strong>間接提示注入</strong>是 MCP 支援的 AI 系統中最嚴重的漏洞之一。攻擊者將惡意指令嵌入於外部內容 —— 如文件、網頁、電子郵件或資料來源，AI 系統隨後將這些內容視為合法指令來處理。

**攻擊場景：**  
- <strong>基於文件的注入</strong>：惡意指令隱藏於所處理文件內，引發非預期 AI 行為  
- <strong>網頁內容濫用</strong>：遭入侵的網頁含嵌入提示，使 AI 抓取後行為被操控  
- <strong>電子郵件攻擊</strong>：惡意提示藏於郵件中，導致 AI 助理外洩資訊或執行未授權操作  
- <strong>資料源污染</strong>：受損資料庫或 API 提供污染內容給 AI 系統  

<strong>實際影響</strong>：可能導致資料外洩、隱私侵犯、有害內容生成及用戶互動操控。詳見 [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)。

![Prompt Injection Attack Diagram](../../../translated_images/zh-HK/prompt-injection.ed9fbfde297ca877.webp)

#### <strong>工具中毒攻擊</strong>

<strong>工具中毒</strong>針對定義 MCP 工具的元資料，利用 LLM 解析工具描述與參數以做出執行決策。

**攻擊機制：**  
- <strong>元資料操控</strong>：攻擊者注入惡意指令於工具描述、參數定義或使用範例中  
- <strong>隱形指令</strong>：工具元資料中隱藏的提示被 AI 模型處理，但人類看不見  
- **動態工具修改（「背刺」）**：使用者認可工具後，後續被更動為執行惡意操作卻不為用戶所知  
- <strong>參數注入</strong>：惡意內容嵌入工具參數結構，影響模型行為  

<strong>代管伺服器風險</strong>：遠端 MCP 伺服器存在較高風險，因工具定義可於用戶首肯後更新，造成先前安全工具變為惡意。詳細分析請見 [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)。

![Tool Injection Attack Diagram](../../../translated_images/zh-HK/tool-injection.3b0b4a6b24de6bef.webp)

#### **其他 AI 攻擊向量**

- **跨域提示注入 (XPIA)**：運用多域內容混合的複雜攻擊手法，繞過安全控制
- <strong>動態能力修改</strong>：工具能力的即時變更，逃避初始安全評估
- <strong>上下文視窗中毒</strong>：操縱大型上下文視窗以隱藏惡意指令的攻擊
- <strong>模型混淆攻擊</strong>：利用模型限制製造不可預測或不安全行為


### AI 安全風險影響

**高影響後果：**
- <strong>數據外洩</strong>：未經授權的訪問及竊取企業或個人敏感資料
- <strong>隱私洩漏</strong>：個人識別資訊（PII）及機密商業資料的曝光  
- <strong>系統操控</strong>：對關鍵系統及工作流程的非預期修改
- <strong>憑證竊取</strong>：身份驗證令牌及服務憑證的妥協
- <strong>橫向擴散</strong>：利用受損 AI 系統作為更廣泛網絡攻擊的樞紐

### 微軟 AI 安全解決方案

#### **AI 提示防護盾：針對注入攻擊的先進防護**

微軟 **AI 提示防護盾** 透過多層安全防護，提供對直接與間接提示注入攻擊的全面防禦：

##### **核心防護機制：**

1. <strong>先進偵測與過濾</strong>
   - 機器學習演算法與自然語言處理技術偵測外部內容中的惡意指令
   - 對文件、網頁、電子郵件及資料來源進行即時分析，找出隱含威脅
   - 理解合法與惡意提示模式的上下文差異

2. <strong>聚焦技術</strong>  
   - 區分受信任系統指示與可能受損的外部輸入
   - 文字轉換方法提升模型相關性並隔離惡意內容
   - 幫助 AI 系統維持正確指令層級並忽略注入指令

3. <strong>分隔符與資料標記系統</strong>
   - 明確定義受信任系統訊息與外部輸入文本的邊界
   - 特殊標記突顯受信任與不受信任資料來源的分界
   - 清晰分隔避免指令混淆及未經授權的命令執行

4. <strong>持續威脅情報</strong>
   - 微軟持續監控新興攻擊模式並更新防禦措施
   - 主動威脅狩獵新注入技術及攻擊向量
   - 定期安全模型更新，維持對進化威脅的效能

5. **Azure 內容安全整合**
   - 作為 Azure AI 內容安全套件的一部分
   - 額外偵測越獄攻擊、有害內容及安全政策違規行為
   - 在 AI 應用組件間提供統一安全控制

<strong>實作資源</strong>：[Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/zh-HK/prompt-shield.ff5b95be76e9c78c.webp)


## 進階 MCP 安全威脅

### 會話劫持漏洞

<strong>會話劫持</strong> 是狀態型 MCP 實作中的關鍵攻擊向量，未經授權者藉由取得並濫用合法會話識別碼，冒充用戶端執行未授權行為。

#### <strong>攻擊場景與風險</strong>

- <strong>會話劫持提示注入</strong>：攻擊者使用被竊取的會話 ID 向共享會話狀態的伺服器注入惡意事件，可能觸發損害行為或存取敏感資料
- <strong>直接冒充</strong>：被盜會話 ID 允許直接呼叫 MCP 伺服器，繞過驗證，將攻擊者視為合法使用者
- <strong>受損的可續流</strong>：攻擊者能提前終止請求，導致合法用戶端重新啟動時接收可能惡意內容

#### <strong>會話管理安全控管</strong>

**關鍵要求：**
- <strong>授權驗證</strong>：MCP 伺服器實作授權時<strong>必須</strong>驗證所有內部請求，<strong>不得</strong>僅依賴會話機制作為驗證
- <strong>安全會話產生</strong>：使用密碼學安全的非決定性會話 ID，且以安全隨機數產生器生成
- <strong>用戶綁定</strong>：將會話 ID 與用戶特定資訊綁定，例如使用 `<user_id>:<session_id>` 格式，防止跨用戶會話濫用
- <strong>會話生命週期管理</strong>：實施適當的過期、輪換與廢止機制，限制漏洞窗口
- <strong>傳輸安全</strong>：所有通訊強制使用 HTTPS，防止會話 ID 被攔截

### 混淆代理問題

當 MCP 伺服器作為客戶端與第三方服務間身份驗證代理時，<strong>混淆代理問題</strong>產生，攻擊者藉由靜態客戶端 ID 進行授權繞過。

#### <strong>攻擊機制與風險</strong>

- **基於 Cookie 的同意繞過**：先前用戶驗證產生的同意 Cookie 被攻擊者利用，透過惡意授權請求與特製重定向 URI 攻擊
- <strong>授權碼竊取</strong>：既有同意 Cookie 可能導致授權伺服器跳過同意畫面，將授權碼重定向到攻擊者控制端點  
- **未授權 API 存取**：被盜授權碼可換取令牌並冒充用戶，無需明確批准

#### <strong>緩解策略</strong>

**必要控管：**
- <strong>明確同意要求</strong>：使用靜態客戶端 ID 的 MCP 代理伺服器<strong>必須</strong>為每個動態註冊的客戶端取得用戶同意
- **OAuth 2.1 安全實作**：遵循最新 OAuth 安全標準，包括所有授權請求中使用 PKCE（Proof Key for Code Exchange）
- <strong>嚴格客戶端驗證</strong>：嚴格驗證重定向 URI 和客戶端識別碼，避免被利用

### 令牌直通漏洞  

<strong>令牌直通</strong> 是明顯的反模式，指 MCP 伺服器未適當驗證接受客戶端令牌即轉發至下游 API，違反 MCP 授權規範。

#### <strong>安全意涵</strong>

- <strong>控制繞過</strong>：直接客戶端至 API 令牌使用繞過重要的速率限制、驗證與監控控管
- <strong>審計紀錄破壞</strong>：上游發行的令牌使得無法辨識客戶端，破壞事件調查能力
- <strong>代理資料外洩</strong>：未驗證令牌使惡意者可利用伺服器代理未授權資料存取
- <strong>信任邊界違反</strong>：下游服務的信任假設遭破壞，令牌來源無法確證
- <strong>多服務攻擊擴散</strong>：被接受於多個服務的受損令牌，助長橫向擴散

#### <strong>必要安全控管</strong>

**不可妥協要求：**
- <strong>令牌驗證</strong>：MCP 伺服器<strong>不得</strong>接受未明確為 MCP 伺服器發行的令牌
- <strong>受眾驗證</strong>：始終驗證令牌的受眾聲明是否符合 MCP 伺服器身份
- <strong>正確令牌生命週期</strong>：實施短效存取令牌並採用安全輪換機制


## AI 系統供應鏈安全

供應鏈安全已超越傳統軟體依賴，涵蓋整個 AI 生態系統。現代 MCP 實作必須嚴格驗證並監控所有 AI 相關元件，因每個元件均可能引入危害系統完整性的漏洞。

### 擴展的 AI 供應鏈組成

**傳統軟體依賴：**
- 開源函式庫與框架
- 容器映像及基底系統  
- 開發工具與建置管線
- 基礎架構元件與服務

**AI 特有供應鏈元件：**
- <strong>基礎模型</strong>：來自多家供應者的預訓練模型，需驗證來源
- <strong>嵌入服務</strong>：外部向量化及語義搜尋服務
- <strong>上下文供應者</strong>：資料來源、知識庫及文件庫  
- **第三方 API**：外部 AI 服務、機器學習管線及資料處理端點
- <strong>模型產物</strong>：權重、設定及微調模型變體
- <strong>訓練資料來源</strong>：模型訓練及微調使用的資料集

### 全面供應鏈安全策略

#### <strong>元件驗證與信任</strong>
- <strong>來源驗證</strong>：整合前驗證所有 AI 元件的來源、授權與完整性
- <strong>安全評估</strong>：為模型、資料來源與 AI 服務進行漏洞掃描及安全審查
- <strong>聲譽分析</strong>：評估 AI 服務供應商的安全記錄與實踐
- <strong>合規驗證</strong>：確保所有元件符合組織安全與法規標準

#### <strong>安全佈署管線</strong>  
- **自動 CI/CD 安全**：將安全掃描整合進自動部署流程
- <strong>產物完整性</strong>：對所有佈署產物（程式碼、模型、設定）實施密碼學驗證
- <strong>分階段佈署</strong>：使用漸進式佈署策略，在每階段進行安全驗證
- <strong>可信產物庫</strong>：僅從驗證且安全的產物庫及註冊中心佈署

#### <strong>持續監控與應對</strong>
- <strong>依賴掃描</strong>：持續監控所有軟體與 AI 元件依賴的漏洞
- <strong>模型監控</strong>：連續評估模型行為、效能偏移與安全異常
- <strong>服務健康追蹤</strong>：監視外部 AI 服務的可用性、安全事件及政策變更
- <strong>威脅情報整合</strong>：納入專屬 AI 及機器學習安全風險的威脅資訊源

#### <strong>存取控管與最小權限</strong>
- <strong>元件層級權限</strong>：依業務需求限制模型、資料及服務的存取
- <strong>服務帳號管理</strong>：實作具最小必要權限的專用服務帳號
- <strong>網路分段</strong>：隔離 AI 元件並限制服務間網路存取
- **API 閘道控管**：利用集中 API 閘道管控與監控外部 AI 服務存取

#### <strong>事件應變與復原</strong>
- <strong>快速應變程序</strong>：制定受損 AI 元件的修補或替換流程
- <strong>憑證輪換</strong>：自動化憑證、API 金鑰及服務憑證的定期輪換
- <strong>回滾能力</strong>：能迅速回復 AI 元件至先前已知良好版本
- <strong>供應鏈違規復原</strong>：針對上游 AI 服務妥協制定特定應對程序

### 微軟安全工具與整合

**GitHub 高級安全** 提供完整供應鏈保護，包括：
- <strong>憑證掃描</strong>：自動檢測憑證、API 金鑰及令牌於儲存庫中
- <strong>依賴掃描</strong>：評估開源依賴及函式庫的漏洞
- **CodeQL 分析**：靜態程式碼分析以找出安全漏洞及程式問題
- <strong>供應鏈洞察</strong>：檢視依賴健康狀況及安全狀態

**Azure DevOps 與 Azure Repos 整合：**
- 微軟開發平台中無縫安全掃描整合
- Azure Pipelines 中 AI 工作負載的自動安全檢測
- AI 元件安全佈署的政策執行

**微軟內部實踐：**
微軟於所有產品全面實行供應鏈安全，詳情請參閱[微軟軟體供應鏈安全之旅](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)。


## 基礎安全最佳實踐

MCP 實作繼承並強化組織現有的安全佈局。強化基礎安全實踐可大幅提升 AI 系統與 MCP 部署的整體安全性。

### 核心安全基礎

#### <strong>安全開發實踐</strong>
- **OWASP 相容**：防護 [OWASP Top 10](https://owasp.org/www-project-top-ten/) 網頁應用漏洞
- **AI 特定防護**：實施 [OWASP LLMs Top 10](https://genai.owasp.org/download/43299/?tmstv=1731900559) 控制
- <strong>安全憑證管理</strong>：使用專用保險庫管理令牌、API 金鑰及敏感設定資料
- <strong>端對端加密</strong>：所有應用組件與資料流程實施安全通訊
- <strong>輸入驗證</strong>：嚴格驗證所有用戶輸入、API 參數及資料來源

#### <strong>基礎架構強化</strong>
- <strong>多因素驗證</strong>：所有管理與服務帳號強制 MFA
- <strong>補丁管理</strong>：自動且及時更新作業系統、框架與依賴元件  
- <strong>身分服務整合</strong>：透過企業身分服務（Microsoft Entra ID、Active Directory）實現集中管理
- <strong>網路分段</strong>：邏輯隔離 MCP 元件，限制橫向移動風險
- <strong>最小權限原則</strong>：所有系統元件與帳號使用最低必須權限

#### <strong>安全監控與偵測</strong>
- <strong>全面日誌記錄</strong>：詳細記錄 AI 應用活動，包括 MCP 用戶端與伺服器互動
- **SIEM 整合**：集中安全事件與資訊管理，偵測異常
- <strong>行為分析</strong>：利用 AI 偵測系統與用戶異常行為模式
- <strong>威脅情報</strong>：整合外部威脅資料與入侵跡象（IOC）
- <strong>事件應對</strong>：明確定義安全事件偵測、響應與復原程序

#### <strong>零信任架構</strong>
- **永不信任，持續驗證**：連續驗證使用者、裝置與網路連線
- <strong>微分段</strong>：細緻網路控管隔離個別工作負載與服務
- <strong>身分中心安全</strong>：安全政策基於已驗證身分非網路位置
- <strong>持續風險評估</strong>：根據當前上下文與行為動態評估安全狀態
- <strong>條件存取</strong>：存取控管依風險因子、位置及裝置信任度調整

### 企業整合模式

#### <strong>微軟安全生態系整合</strong>
- **Microsoft Defender for Cloud**：完整雲端安全態勢管理
- **Azure Sentinel**：原生雲端 SIEM 及 SOAR，保護 AI 工作負載
- **Microsoft Entra ID**：企業身分與存取管理，搭配條件存取政策
- **Azure Key Vault**：具硬體安全模組（HSM）支持的集中秘密管理
- **Microsoft Purview**：AI 資料來源及工作流程的資料治理與合規性

#### <strong>合規與治理</strong>
- <strong>法規對應</strong>：確保 MCP 實作符合行業特定規範（GDPR、HIPAA、SOC 2）
- <strong>資料分類</strong>：妥善分類與處理 AI 系統處理的敏感資料
- <strong>審計追蹤</strong>：全面日誌記錄以符合法規與鑑識調查需要
- <strong>隱私控管</strong>：在 AI 系統架構中實施隱私設計原則
- <strong>變更管理</strong>：正式流程管控 AI 系統變更的安全審查

這些基礎實踐打造穩固安全基準，增強 MCP 專屬安全控管的效能，並為 AI 驅動應用提供全面防護。

## 重要安全摘要
- <strong>分層安全方法</strong>：結合基礎安全實務（安全編碼、最小權限、供應鏈驗證、持續監控）與 AI 專屬控管，以達成全面防護

- **AI 專屬威脅環境**：MCP 系統面臨獨特風險，包括提示注入、工具中毒、會話劫持、困惑代理問題、令牌轉傳漏洞以及過度權限，需採取專門緩解措施

- <strong>卓越的驗證與授權</strong>：使用外部身份提供者（Microsoft Entra ID）實施強健驗證，強制適當的令牌驗證，並且絕不接受非明確發行給您的 MCP 伺服器的令牌

- **AI 攻擊防範**：部署 Microsoft Prompt Shields 與 Azure Content Safety 來防禦間接提示注入和工具中毒攻擊，同時驗證工具元資料並監控動態變更

- <strong>會話與傳輸安全</strong>：使用密碼學安全、非決定性且綁定用戶身份的會話 ID，實施適當會話生命週期管理，並且絕不使用會話進行身份驗證

- **OAuth 安全最佳實務**：透過動態註冊的用戶明確同意避免困惑代理攻擊，正確實施 OAuth 2.1 搭配 PKCE，並嚴格驗證重定向 URI    

- <strong>令牌安全原則</strong>：避免令牌轉傳反模式，驗證令牌目標受眾聲明，實現短命令牌與安全輪替，並保持明確的信任邊界

- <strong>全面供應鏈安全</strong>：將所有 AI 生態系組件（模型、嵌入、上下文提供者、外部 API）視為與傳統軟件依賴相同的安全嚴格標準

- <strong>持續演進</strong>：緊跟快速演進的 MCP 規範，貢獻安全社群標準，並隨著協議成熟保持適應性的安全態勢

- <strong>微軟安全整合</strong>：利用微軟全面安全生態系（Prompt Shields、Azure Content Safety、GitHub Advanced Security、Entra ID）強化 MCP 部署防護

## 全面資源

### **官方 MCP 安全文件**
- [MCP 規範（目前版本：2025-11-25）](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳實務](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub 倉庫](https://github.com/modelcontextprotocol)

### **OWASP MCP 安全資源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 全面 OWASP MCP 十大威脅及 Azure 實作指導
- [OWASP MCP 十大](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全風險
- [MCP 安全高峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) - MCP 在 Azure 上的實戰安全訓練

### <strong>安全標準與最佳實務</strong>
- [OAuth 2.0 安全最佳實務 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP 網頁應用程式十大風險](https://owasp.org/www-project-top-ten/)
- [大型語言模型 OWASP 十大](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [微軟數位防禦報告](https://aka.ms/mddr)

### **AI 安全研究與分析**
- [MCP 中的提示注入 (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [工具中毒攻擊 (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP 安全研究簡報 (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### <strong>微軟安全解決方案</strong>
- [Microsoft Prompt Shields 文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety 服務](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID 安全](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure 令牌管理最佳實務](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub 進階安全](https://github.com/security/advanced-security)

### <strong>實作指南與教學</strong>
- [以 Azure API Management 作為 MCP 驗證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID 與 MCP 伺服器驗證](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [安全令牌儲存與加密（影片）](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps 與供應鏈安全**
- [Azure DevOps 安全](https://azure.microsoft.com/products/devops)
- [Azure Repos 安全](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft 供應鏈安全之旅](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## <strong>額外安全文件</strong>

欲取得完整安全指導，請參閱本節中的專門文件：

- **[MCP 安全最佳實務 2025](./mcp-security-best-practices-2025.md)** - MCP 實作完整安全最佳實務
- **[Azure Content Safety 實作](./azure-content-safety-implementation.md)** - Azure Content Safety 整合的實務範例  
- **[MCP 安全控管 2025](./mcp-security-controls-2025.md)** - MCP 部署最新安全控管與技術
- **[MCP 最佳實務快速參考](./mcp-best-practices.md)** - 主要 MCP 安全實務快速參考指南
- **[BlueHat 2026：保護 AI 的未來：以縱深防禦模式確保 MCP 安全](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - 由微軟安全應對中心（MSRC）分享的縱深防禦模式

### <strong>實戰安全訓練</strong>

- **[MCP 安全高峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/)** - 包含從初級訓練營到高峰營的 Azure MCP 伺服器安全完整實作工作坊
- **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)** - 全部 OWASP MCP 十大風險的參考架構與實作指導

---

## 接下來

下一章節：[第 3 章：入門指南](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->