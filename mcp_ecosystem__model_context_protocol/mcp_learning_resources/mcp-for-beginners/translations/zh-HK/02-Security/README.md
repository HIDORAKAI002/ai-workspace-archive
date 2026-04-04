# MCP 安全：AI 系統的全面保護

[![MCP Security Best Practices](../../../translated_images/zh-HK/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(點擊上方圖片觀看本課程影片)_

安全是 AI 系統設計的根本，因此我們將其列為第二個重點章節。這與微軟在[安全未來計劃](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/)中所遵循的 **Secure by Design** 原則相符。

Model Context Protocol (MCP) 為 AI 驅動應用帶來強大新能力，同時引入超越傳統軟體風險的獨特安全挑戰。MCP 系統面臨既有的安全問題（安全程式碼、最小權限、供應鏈安全）以及 AI 特有威脅，包括提示注入、工具污染、會話挾持、混淆代理攻擊、令牌直通漏洞和動態能力修改。

本課程探討 MCP 實作中最關鍵的安全風險——涵蓋身份驗證、授權、過度許可、間接提示注入、會話安全、混淆代理問題、令牌管理與供應鏈漏洞。您將學會具體可行的控管措施和最佳實踐，同時運用微軟解決方案如 Prompt Shields、Azure Content Safety，以及 GitHub Advanced Security 強化 MCP 部署。

## 學習目標

完成本課程後，您將能：

- **識別 MCP 特定威脅**：辨識 MCP 系統的獨特安全風險，包括提示注入、工具污染、過度許可、會話挾持、混淆代理問題、令牌直通漏洞及供應鏈風險
- **應用安全控管**：實施有效減輕風險措施，包括強健身份驗證、最小權限存取、安全令牌管理、會話安全控管與供應鏈驗證
- **運用微軟安全方案**：了解及部署微軟 Prompt Shields、Azure Content Safety 以及 GitHub Advanced Security 以保護 MCP 工作負載
- **驗證工具安全**：認識工具元數據驗證、動態變更監控與防範間接提示注入攻擊的重要性
- **整合最佳實踐**：結合既有安全基礎（安全程式碼、伺服器強化、零信任）與 MCP 特定控管措施，以實現全面保護

# MCP 安全架構與控管

現代 MCP 實作需要多層次的安全策略，涵蓋傳統軟體安全與 AI 特有威脅。快速演進的 MCP 規範持續成熟其安全控管，促使更佳融合企業安全架構和既有最佳實踐。

來自[微軟數位防禦報告](https://aka.ms/mddr)的研究顯示，**98% 的報告入侵皆可透過強健的安全衛生措施防止**。最有效的防護策略結合基礎安全作法與 MCP 特定控管——經驗證的基線安全措施仍是降低整體風險的關鍵。

## 當前安全現狀

> **注意：** 本資訊反映 MCP 安全標準截至 **2026 年 2 月 5 日**，配合 **MCP 規格 2025-11-25**。MCP 協定持續迅速演進，未來實作可能引入新認證模式與增強控管。請始終參考最新 [MCP 規範](https://spec.modelcontextprotocol.io/)、[MCP GitHub 倉庫](https://github.com/modelcontextprotocol) 與[安全最佳實踐文件](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) 以獲得最新指導。

## 🏔️ MCP 安全峰會工作坊 (Sherpa)

為獲得**實作安全訓練**，我們強烈推薦參加 **MCP Security Summit Workshop**（Sherpa）——一段在 Microsoft Azure 中保護 MCP 伺服器的全方位實務導覽。

### 工作坊概述

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) 採用「易受攻擊 → 利用 → 修復 → 驗證」的驗證方法，提供實用且可操作的安全訓練。您將：

- **破壞中學習**：透過攻擊故意不安全伺服器，親身體驗漏洞
- **使用 Azure 原生安全**：利用 Azure Entra ID、Key Vault、API 管理與 AI 內容安全
- **遵循縱深防禦**：透過數個營區逐步構築全面安全層
- **套用 OWASP 標準**：各技術映射到 [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **獲得生產代碼**：帶走可運行、經測試的實作範例

### 探險路線圖

| 營區 | 聚焦 | 涉及 OWASP 風險 |
|------|-------|-----------------|
| **基地營** | MCP 基礎與驗證漏洞 | MCP01、MCP07 |
| **第一營：身份** | OAuth 2.1、Azure 管理身分、Key Vault | MCP01、MCP02、MCP07 |
| **第二營：閘道** | API 管理、私人端點、治理 | MCP02、MCP07、MCP09 |
| **第三營：輸入/輸出安全** | 提示注入、個資保護、內容安全 | MCP03、MCP05、MCP06 |
| **第四營：監控** | 日誌分析、儀表板、威脅檢測 | MCP08 |
| **峰頂** | 紅隊 / 藍隊整合測試 | 全部 |

**開始參與**：[https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP 十大安全風險

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) 詳細列出 MCP 實作中十個最關鍵的安全風險：

| 風險 | 描述 | Azure 緩解措施 |
|------|-------|-----------------|
| **MCP01** | 令牌錯誤管理與機密暴露 | Azure Key Vault、管理身分 |
| **MCP02** | 權限範圍攀升 | RBAC、條件存取 |
| **MCP03** | 工具污染 | 工具驗證、完整性確認 |
| **MCP04** | 供應鏈攻擊 | GitHub Advanced Security、依賴掃描 |
| **MCP05** | 命令注入與執行 | 輸入驗證、沙箱隔離 |
| **MCP06** | 透過上下文有效負載的提示注入 | Azure AI Content Safety、Prompt Shields |
| **MCP07** | 身份驗證與授權不足 | Azure Entra ID、具 PKCE 的 OAuth 2.1 |
| **MCP08** | 缺少稽核與遙測 | Azure Monitor、Application Insights |
| **MCP09** | 陰影 MCP 伺服器 | API 中心治理、網路隔離 |
| **MCP10** | 上下文注入與過度分享 | 資料分類、最小曝露 |

### MCP 認證演進

MCP 規範在身份驗證與授權方面已大幅演進：

- **原始做法**：早期規範要求開發者實作自訂認證伺服器，MCP 伺服器充當 OAuth 2.0 授權伺服器直接管理使用者認證
- **當前標準（2025-11-25）**：更新規範允許 MCP 伺服器委派認證給外部身分提供者（如 Microsoft Entra ID），強化安全狀態且降低實作複雜度
- **運輸層安全**：增強本地（STDIO）與遠端（Streamable HTTP）連線的安全通訊支持與認證模式

## 身份驗證與授權安全

### 當前安全挑戰

現代 MCP 實作面臨多項身份驗證與授權問題：

### 風險與攻擊向量

- **授權邏輯錯誤配置**：MCP 伺服器授權實作疏漏可能導致敏感資料外洩與錯誤存取控制
- **OAuth 令牌竊取**：本地 MCP 伺服器令牌被竊致使攻擊者冒充伺服器，並可存取下游服務
- **令牌直通漏洞**：錯誤處理令牌造成安全控管被繞過及責任歸屬不清
- **過度許可**：MCP 伺服器所擁權限過大，違反最小權限原則，擴大攻擊面

#### 令牌直通：關鍵反面模式

**目前 MCP 授權規範明確禁止令牌直通**，因其造成重大安全風險：

##### 安全控管繞過
- MCP 伺服器與下游 API 需依賴正確令牌驗證以落實重要安全控管（頻率限制、請求驗證、流量監控）
- 客戶端直接使用 API 令牌繞過必須的控管機制，削弱安全架構防護

##### 責任暨稽核挑戰  
- MCP 伺服器無法區分使用者使用上游發行的令牌，稽核線索斷裂
- 下游資源伺服器紀錄的請求來源不正確，隱匿 MCP 伺服器中介身份
- 事件調查和合規審計難度大幅提升

##### 資料外洩風險
- 未驗證令牌聲明讓持有偷取令牌的惡意者以 MCP 伺服器作為代理漏洞
- 信任邊界遭突破，存取模式繞過原有控管

##### 多服務攻擊向量
- 遭竊令牌可被多服務接受，促成側向攻擊擴散
- 無法驗證令牌來源時，違反服務間信任假設

### 安全控管與緩解

**重要安全要求：**

> **強制執行**：MCP 伺服器**不得接受非明確發給該伺服器之令牌**

#### 身份驗證與授權控管

- **嚴格授權審核**：全面稽核 MCP 伺服器授權邏輯以確保僅意圖使用者及客戶端存取敏感資源
  - **實作指引**：[Azure API Management 作為 MCP 伺服器身份驗證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **身分整合**：[使用 Microsoft Entra ID 進行 MCP 伺服器身份驗證](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **安全令牌管理**：遵循[微軟令牌驗證與生命週期最佳實踐](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - 驗證令牌受眾聲明匹配 MCP 伺服器身份
  - 實施妥善的令牌輪替與過期政策
  - 防範令牌重放攻擊與未授權使用

- **受保護令牌儲存**：令牌在靜止與傳輸中均須加密保護
  - **最佳實踐**：[安全令牌儲存與加密指南](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### 存取控制實作

- **最小權限原則**：僅授予 MCP 伺服器其功能所需的最低權限
  - 定期檢視及更新權限避免範圍擴散
  - **微軟文件**：[安全的最小權限存取](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **基於角色的存取控制 (RBAC)**：實施細粒度角色分配
  - 將角色範圍嚴格限制於特定資源及操作
  - 避免過於寬泛或不必要權限擴大攻擊面

- **持續權限監控**：實施存取審核與持續監控
  - 監控權限使用模式異常
  - 及時修正過度或未使用權限

## AI 特有安全威脅

### 提示注入與工具操縱攻擊

現代 MCP 實作面臨複雜的 AI 專屬攻擊向量，傳統安全措施無法完全防範：

#### **間接提示注入（跨域提示注入）**

**間接提示注入**是 MCP AI 系統中最嚴重的漏洞之一。攻擊者將惡意指令隱藏於外部內容（文件、網頁、電子郵件或資料來源），AI 系統隨後誤判成合法命令執行。

**攻擊場景：**
- **文件基礎注入**：惡意指令藏於被處理文件，引發非預期 AI 行為
- **網頁內容濫用**：遭駭網頁內嵌入提示，爬取時操縱 AI 執行
- **郵件攻擊**：郵件中隱藏提示使 AI 助手洩漏資訊或執行未授權動作
- **資料來源污染**：遭破壞資料庫或 API 向 AI 系統提供汙染內容

**實際影響**：此類攻擊可導致資料外洩、隱私侵犯、有害內容生成及使用者互動操縱。詳細分析見 [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)。

![Prompt Injection Attack Diagram](../../../translated_images/zh-HK/prompt-injection.ed9fbfde297ca877.webp)

#### **工具污染攻擊**

**工具污染**攻擊針對 MCP 工具定義的元數據，利用大模型如何解讀工具描述與參數以決定執行行為的特性。

**攻擊機制：**
- **元數據操控**：攻擊者注入惡意指令至工具描述、參數定義或使用範例
- **隱形指令**：藏於工具元數據中的提示，大模型處理但使用者無感知
- **動態工具變更（“拔毯子”）**：用戶事先批准的工具後續被修改來執行惡意行為
- **參數注入**：將惡意內容嵌入工具參數架構，影響模型行為

**託管伺服器風險**：遠端 MCP 伺服器風險升高，因工具定義可於用戶批准後更新，產生先前安全工具變惡意狀況。完整分析見 [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)。

![Tool Injection Attack Diagram](../../../translated_images/zh-HK/tool-injection.3b0b4a6b24de6bef.webp)

#### **其他 AI 攻擊向量**

- **跨域提示注入 (XPIA)**：利用多個域內容，繞過安全控管的複雜攻擊模式
- **動態能力修改**：實時更改工具能力，逃避初始安全評估
- **上下文窗口污染**：操縱大型上下文窗口以隱藏惡意指令的攻擊
- **模型混淆攻擊**：利用模型限制引發不可預測或不安全行為


### AI 安全風險影響

**高影響後果：**
- **資料外洩**：未經授權訪問和竊取企業或個人敏感資料
- **隱私洩露**：個人身份資訊（PII）及機密商業資料暴露  
- **系統操作**：對關鍵系統和工作流程的非預期修改
- **憑證竊取**：認證令牌和服務憑證受損
- **橫向移動**：利用受損 AI 系統作為更廣泛網絡攻擊的樞紐

### Microsoft AI 安全解決方案

#### **AI 提示盾牌：進階防護注入攻擊**

Microsoft **AI 提示盾牌**通過多層安全防護，提供對直接和間接提示注入攻擊的全面防禦：

##### **核心防護機制：**

1. **進階檢測與過濾**
   - 利用機器學習算法與 NLP 技術檢測外部內容中的惡意指令
   - 實時分析文件、網頁、電子郵件及資料源中的嵌入威脅
   - 理解合法與惡意提示模式的上下文差異

2. **聚光燈技術**  
   - 區分受信任系統指令與可能受損的外部輸入
   - 文本轉換方法提升模型相關性，同時隔離惡意內容
   - 幫助 AI 系統維持正確指令層級並忽略注入命令

3. **分隔符與資料標記系統**
   - 明確定義受信任系統訊息與外部輸入文本之間的邊界
   - 使用特殊標記突出顯示受信任與不受信資料源邊界
   - 清晰分隔以防止指令混淆與未授權命令執行

4. **持續威脅情報**
   - Microsoft 持續監控新興攻擊模式並更新防禦措施
   - 主動尋找新注入技術與攻擊向量
   - 定期更新安全模型以維持對不斷演變威脅的效力

5. **Azure 內容安全整合**
   - 作為全面 Azure AI 內容安全套件的一部分
   - 附加檢測劫獄嘗試、有害內容及安全政策違規
   - AI 應用組件間統一安全控管

**實作資源**：[Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/zh-HK/prompt-shield.ff5b95be76e9c78c.webp)


## 進階 MCP 安全威脅

### 會話劫持漏洞

**會話劫持**是狀態性 MCP 實作中的關鍵攻擊向量，攻擊者取得並濫用合法會話標識符以冒充用戶並執行未授權行動。

#### **攻擊場景與風險**

- **會話劫持提示注入**：持有被盜會話 ID 的攻擊者向共享會話狀態的伺服器注入惡意事件，可能觸發有害行為或訪問敏感資料
- **直接冒充**：被盜會話 ID 允許繞過驗證直接進行 MCP 伺服器呼叫，將攻擊者視為合法使用者
- **可恢復流受損**：攻擊者可提前終止請求，導致合法用戶以可能含惡意內容的狀態恢復

#### **會話管理安全控管**

**關鍵要求：**
- **授權驗證**：實作授權的 MCP 伺服器**必須**驗證所有傳入請求，且**不得**僅依賴會話作為認證手段
- **安全會話產生**：使用加密安全、非決定性的會話 ID，由安全隨機數產生器產生
- **用戶綁定**：將會話 ID 與用戶特定資訊綁定，使用 `<user_id>:<session_id>` 格式防止跨用戶會話濫用
- **會話生命週期管理**：實作適當的過期、輪替及失效控管以限制漏洞期
- **傳輸安全**：所有通訊強制使用 HTTPS 避免會話 ID 被攔截

### 混淆代理問題

當 MCP 伺服器作為客戶端與第三方服務間的認證代理時，會發生**混淆代理問題**，令靜態客戶端 ID 可被利用繞過授權。

#### **攻擊機制與風險**

- **基於 Cookie 的同意繞過**：舊有用戶認證建立同意 Cookie，攻擊者藉由惡意授權請求與製造的重定向 URI 利用該 Cookie
- **授權碼竊取**：存在同意 Cookie 時，授權伺服器跳過同意畫面，將授權碼重定向至攻擊者控制端點  
- **未經授權 API 訪問**：竊取的授權碼可用於令牌交換及用戶冒充，無需明確批准

#### **緩解措施**

**必須控管：**
- **明確同意要求**：使用靜態客戶端 ID 的 MCP 代理伺服器**必須**為每個動態註冊客戶端獲得用戶同意
- **OAuth 2.1 安全實作**：遵循現行 OAuth 安全最佳實踐，包括全部授權請求採用 PKCE（用於授權碼交換）
- **嚴格客戶端驗證**：嚴格驗證重定向 URI 與客戶端識別碼以防止濫用

### 令牌轉發漏洞  

**令牌轉發**是一種明顯反模式，因 MCP 伺服器接受客戶端令牌而不驗證即轉發至下游 API，違反 MCP 授權規範。

#### **安全影響**

- **控管繞過**：客戶端直接使用 API 令牌，繞過重要的頻率限制、驗證與監控措施
- **審計軌跡破壞**：上游發行的令牌無法識別具體客戶端，破壞事件調查能力
- **基於代理的資料外洩**：未驗證的令牌讓惡意者利用伺服器作為未授權資料存取代理
- **信任邊界違反**：令牌來源無法驗證時，破壞下游服務的信任前提
- **多服務攻擊擴散**：受損令牌於多服務接受，促成橫向移動

#### **必要安全控管**

**不可妥協規定：**
- **令牌驗證**：MCP 伺服器**不得**接受未明確發行給該服務之令牌
- **受眾驗證**：始終驗證令牌的受眾聲明與 MCP 伺服器身份匹配
- **正確令牌生命週期**：實施短期存取令牌並制定安全輪替機制


## AI 系統供應鏈安全

供應鏈安全已從傳統軟體依賴擴展至整個 AI 生態系。現代 MCP 實作必須嚴格驗證及監控所有 AI 相關組件，因各自可能引入威脅，危害系統完整性。

### 擴展 AI 供應鏈組件

**傳統軟體依賴：**
- 開源函式庫與框架
- 容器映像與基礎系統  
- 開發工具與建置管線
- 基礎架構組件與服務

**AI 專屬供應鏈元件：**
- **基礎模型**：需驗證來源的各供應商預訓練模型
- **嵌入服務**：外部向量化與語義搜尋服務
- **上下文提供者**：資料源、知識庫與文件庫  
- **第三方 API**：外部 AI 服務、機器學習管線與資料處理端點
- **模型工件**：權重、配置及微調模型變體
- **訓練資料源**：模型訓練及微調所用資料集

### 全面供應鏈安全策略

#### **組件驗證與信任**
- **來源驗證**：整合前驗證所有 AI 元件之來源、授權及完整性
- **安全評估**：執行模型、資料源及 AI 服務的漏洞掃描與安全審查
- **聲譽分析**：評估 AI 服務供應商的安全紀錄與實踐
- **合規驗證**：確保所有元件符合組織安全和法規要求

#### **安全部署管線**  
- **自動化 CI/CD 安全性**：在自動部署管線中整合安全掃描
- **工件完整性**：對所有部署工件（程式碼、模型、配置）實施加密驗證
- **階段性部署**：採用分階段部署策略並於每階段進行安全驗證
- **可信工件倉庫**：僅從已驗證且安全的工件庫及註冊中心部署

#### **持續監控與回應**
- **依賴掃描**：持續監控所有軟體及 AI 元件依賴的漏洞
- **模型監控**：持續評估模型行為、性能漂移及安全異常
- **服務健康追蹤**：監控外部 AI 服務的可用性、安全事件與政策變更
- **威脅情報整合**：導入針對 AI 與機器學習安全風險的威脅情報

#### **存取控制與最小權限**
- **元件層級權限**：根據業務需求限制對模型、資料與服務的訪問
- **服務帳戶管理**：實作具備最低必要權限的專用服務帳戶
- **網路分段**：隔離 AI 元件並限制服務間網路存取
- **API 閘道控管**：使用中央 API 閘道管控並監控對外部 AI 服務的存取

#### **事件回應與復原**
- **快速響應程序**：建立漏洞 AI 元件的修補或替換流程
- **憑證輪替**：自動化輪替密鑰、API 金鑰與服務憑證
- **回滾能力**：可快速回退至先前已知良好版本的 AI 元件
- **供應鏈違規復原**：制定回應上游 AI 服務受損事件的特定程序

### Microsoft 安全工具與整合

**GitHub Advanced Security** 提供全面供應鏈防護，包括：
- **憑證掃描**：自動檢測資源庫中的憑證、API 金鑰和令牌
- **依賴掃描**：對開源依賴與函式庫進行漏洞評估
- **CodeQL 分析**：靜態程式碼分析以偵測安全漏洞及程式問題
- **供應鏈洞察**：監控依賴健康狀態與安全情況

**Azure DevOps 與 Azure Repos 整合：**
- Microsoft 開發平台的安全掃描無縫整合
- Azure Pipelines 中的 AI 工作量自動安全檢查
- 安全 AI 元件部署政策強制執行

**Microsoft 內部實踐：**
Microsoft 於所有產品中實施廣泛的供應鏈安全實務。詳見 [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)。


## 基礎安全最佳實踐

MCP 實作繼承並強化您的組織現有安全態勢。強化基礎安全實務能顯著提升 AI 系統及 MCP 部署的整體安全。

### 核心安全基本原則

#### **安全開發實踐**
- **OWASP 相符**：防禦 [OWASP Top 10](https://owasp.org/www-project-top-ten/) 網頁應用漏洞
- **AI 專屬保護**：實施 [OWASP LLMs Top 10](https://genai.owasp.org/download/43299/?tmstv=1731900559) 控制措施
- **安全憑證管理**：使用專用金庫存放令牌、API 金鑰及敏感配置資料
- **端對端加密**：於所有應用組件及資料流實現安全通訊
- **輸入驗證**：嚴格驗證所有用戶輸入、API 參數及資料源

#### **基礎設施強化**
- **多因素認證**：所有管理與服務帳戶要求強制 MFA
- **修補管理**：自動且及時修補作業系統、框架與相依元件  
- **身份提供者整合**：透過企業身份提供者（Microsoft Entra ID、Active Directory）集中身份管理
- **網路分割**：邏輯隔離 MCP 組件限制橫向移動風險
- **最小權限原則**：所有系統組件及帳戶皆授予最低必要權限

#### **安全監控與偵測**
- **全面日誌**：詳細記錄 AI 應用活動，包括 MCP 用戶端-伺服器互動
- **SIEM 整合**：集中安全資訊與事件管理以進行異常偵測
- **行為分析**：應用 AI 監控系統及用戶行為異常模式
- **威脅情報**：整合外部威脅資料及攻擊指標（IOC）
- **事件回應**：建立清晰的安全事件偵測、回應與復原程序

#### **零信任架構**
- **絕不信任，持續驗證**：持續驗證用戶、裝置與網路連線
- **微分段**：細粒度網路控管隔離各工作負載與服務
- **身份為中心安全**：依驗證身份而非網路位置制定安全政策
- **持續風險評估**：根據當前上下文與行為動態評估安全態勢
- **條件存取**：根據風險因子、位置及裝置信任度調整存取權限

### 企業整合模式

#### **Microsoft 安全生態系統整合**
- **Microsoft Defender for Cloud**：全面雲端安全態勢管理
- **Azure Sentinel**：雲端原生 SIEM 與 SOAR 功能保護 AI 工作負載
- **Microsoft Entra ID**：企業身份與存取管理含條件存取政策
- **Azure Key Vault**：中央密鑰管理，具備硬體安全模組（HSM）支援
- **Microsoft Purview**：AI 資料源及工作流程的數據治理與合規

#### **合規與治理**
- **符合法規**：確保 MCP 實作符合法規要求（GDPR、HIPAA、SOC 2）
- **資料分類**：對 AI 處理的敏感數據正確分類與管理
- **稽核軌跡**：完整日誌支持法規遵循與取證調查
- **隱私控制**：AI 系統架構中落實隱私設計原則
- **變更管理**：對 AI 系統修改採取正式安全審查流程

這些基礎實務建立穩固的安全基線，提升 MCP 專屬安全控管效能，進而提供 AI 驅動應用的全面保護。
## 主要安全重點摘要

- **分層安全策略**：結合基礎安全措施（安全編碼、最少權限原則、供應鏈驗證、持續監控）與 AI 專屬控管，實現全面防護

- **AI 專屬威脅環境**：MCP 系統面臨獨特風險，包括提示注入、工具中毒、會話劫持、代理困惑問題、令牌直通漏洞，以及過度權限，需採取專門緩解措施

- **身份驗證與授權要點**：使用外部身份提供者（Microsoft Entra ID）實施強健身份驗證，嚴格執行令牌驗證，絕不接受非明確發行給 MCP 伺服器之令牌

- **AI 攻擊防護**：部署 Microsoft Prompt Shields 與 Azure Content Safety 防範間接提示注入及工具中毒攻擊，驗證工具元資料並監控動態變更

- **會話與傳輸安全**：採用加密安全、非確定性且綁定使用者身份的會話 ID，實施適當的會話週期管理，切勿使用會話作為身份驗證手段

- **OAuth 安全最佳實務**：針對動態註冊客戶端實施明確用戶同意，正確執行帶 PKCE 的 OAuth 2.1，並嚴格驗證重導 URI，防止代理困惑攻擊

- **令牌安全原則**：避免令牌直通反模式，驗證令牌受眾聲明，實施短期令牌及安全輪替，並維護明確的信任邊界

- **全面供應鏈安全**：對 AI 生態系統的所有元件（模型、嵌入、上下文提供者、外部 API）採用與傳統軟件依賴同等的安全嚴謹態度

- **持續演進**：緊跟迅速演變的 MCP 規範，積極參與安全社群標準建設，隨協議成熟保持彈性安全態勢

- **微軟安全整合**：運用微軟全面安全生態（Prompt Shields、Azure Content Safety、GitHub 高階安全、Entra ID）加強 MCP 部署保護

## 全面資源

### **官方 MCP 安全文件**
- [MCP 規範 (目前版本：2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳實務](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub 倉庫](https://github.com/modelcontextprotocol)

### **OWASP MCP 安全資源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 全面 OWASP MCP 前十名安全風險及 Azure 實作指導
- [OWASP MCP 前十名](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全風險
- [MCP 安全峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) - MCP 在 Azure 平台上的實作與安全訓練

### **安全標準與最佳實踐**
- [OAuth 2.0 安全最佳實務 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Web 應用安全前十名](https://owasp.org/www-project-top-ten/)
- [OWASP 大型語言模型前十名](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [微軟數位防禦報告](https://aka.ms/mddr)

### **AI 安全研究與分析**
- [MCP 中的提示注入 (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [工具中毒攻擊 (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP 安全研究簡報 (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **微軟安全解決方案**
- [Microsoft Prompt Shields 文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety 服務](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID 安全](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure 令牌管理最佳實務](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub 高階安全](https://github.com/security/advanced-security)

### **實作指南與教學**
- [Azure API 管理作為 MCP 身份驗證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID 與 MCP 伺服器的身份驗證](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [安全令牌儲存與加密（影片）](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps 與供應鏈安全**
- [Azure DevOps 安全](https://azure.microsoft.com/products/devops)
- [Azure Repos 安全](https://azure.microsoft.com/products/devops/repos/)
- [微軟供應鏈安全歷程](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **額外安全文件**

欲獲取完整安全指導，請參考本節的專門文件：

- **[MCP 2025 安全最佳實務](./mcp-security-best-practices-2025.md)** - MCP 實作完整安全最佳實務
- **[Azure Content Safety 實作指南](./azure-content-safety-implementation.md)** - Azure Content Safety 整合之實務範例  
- **[MCP 2025 安全控管](./mcp-security-controls-2025.md)** - MCP 部署最新安全控管與技術
- **[MCP 最佳實務快速參考](./mcp-best-practices.md)** - MCP 安全核心實務速查指南

### **實務安全訓練**

- **[MCP 安全峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/)** - 針對 Azure 上 MCP 伺服器的全面實務工作坊，從基礎營到峰會階段循序漸進
- **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)** - 全部 OWASP MCP 前十名風險的參考架構與實作指導

---

## 接下來的章節

下一章節：[第 3 章：入門指南](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。儘管我們力求準確，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威資料。對於重要資訊，建議採用專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->