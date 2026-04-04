# MCP 安全性：為 AI 系統提供全面保護

[![MCP 安全最佳實踐](../../../translated_images/zh-MO/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(點擊上方圖片觀看本課程影片)_

安全性是 AI 系統設計的基礎，這也是我們將其列為第二部分的原因。這符合微軟從 [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/) 推出的 **Secure by Design** 原則。

模型上下文協議（Model Context Protocol，MCP）為驅動 AI 的應用帶來強大新功能，同時引入了超越傳統軟件風險的獨特安全挑戰。MCP 系統面臨既有的安全問題（安全編碼、最小權限、供應鏈安全）以及 AI 特有的新威脅，包括提示注入、工具中毒、會話劫持、困惑代理攻擊、令牌直通漏洞及動態能力修改。

本課程探討 MCP 實作中最關鍵的安全風險，涵蓋身份驗證、授權、過度權限、間接提示注入、會話安全、困惑代理問題、令牌管理和供應鏈漏洞。您將學習可操作的控管和最佳實務，利用 Microsoft 解決方案如 Prompt Shields、Azure Content Safety，以及 GitHub Advanced Security 加強您的 MCP 部署。

## 學習目標

完成本課程後，您將能夠：

- **辨識 MCP 專屬威脅**：認識 MCP 系統中獨特的安全風險，包括提示注入、工具中毒、過度權限、會話劫持、困惑代理問題、令牌直通漏洞和供應鏈風險
- **應用安全控管**：實施有效緩解措施，包括強健的身份驗證、最小權限存取、令牌安全管理、會話安全控管和供應鏈驗證
- **運用 Microsoft 安全方案**：理解及部署 Microsoft Prompt Shields、Azure Content Safety 和 GitHub Advanced Security 以保護 MCP 工作負載
- **驗證工具安全性**：認識工具元資料驗證、動態變更監控和防範間接提示注入攻擊的重要性
- **整合最佳實務**：結合既有的安全基礎（安全編碼、伺服器強化、零信任）與 MCP 專屬控管，實現全面防護

# MCP 安全架構與控管

現代 MCP 實作需要分層安全措施，同時涵蓋傳統軟件安全及 AI 特有威脅。迅速演進的 MCP 規範持續完善其安全控管，促進與企業安全架構及既有最佳實務的更好整合。

[Microsoft Digital Defense Report](https://aka.ms/mddr) 的研究顯示，**98% 的通報違規均可藉由完善的安全衛生措施予以防範**。最有效的保護策略結合基礎安全作法與 MCP 專屬控管——經驗證的基本安全措施依然是降低整體安全風險的最強利器。

## 當前安全現況

> **注意：** 本資訊反映截至 **2026 年 2 月 5 日** 的 MCP 安全標準，與 **MCP 規格 2025-11-25** 一致。MCP 協議持續快速演進，未來實作可能引入新驗證模式與強化控管。請參考最新的 [MCP 規格](https://spec.modelcontextprotocol.io/)、[MCP GitHub 倉庫](https://github.com/modelcontextprotocol) 及 [安全最佳實務文件](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) 以獲取最新指引。

## 🏔️ MCP 安全高峰工作坊（Sherpa）

如需 **實作安全訓練**，我們強烈推薦 **MCP 安全高峰工作坊（Sherpa）** — 一個在 Microsoft Azure 上針對 MCP 伺服器安全的全面引導式旅程。

### 工作坊概覽

[MCP 安全高峰工作坊](https://azure-samples.github.io/sherpa/) 透過經驗證的「脆弱 → 利用 → 修復 → 驗證」方法提供實用且可行的安全訓練。您將：

- **透過破壞學習**：親身體驗利用刻意不安全的伺服器漏洞
- **使用 Azure 原生安全**：利用 Azure Entra ID、Key Vault、API 管理及 AI 內容安全
- **遵循深度防禦**：逐階層建立安全防線
- **套用 OWASP 標準**：所有技術映射至 [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)
- **取得生產環境程式碼**：帶走可用且經測試的實作範例

### 探險路線

| 營區 | 重點 | 涵蓋 OWASP 風險 |
|------|-------|---------------------|
| **基地營** | MCP 基礎與身份驗證漏洞 | MCP01, MCP07 |
| **營區 1：身份** | OAuth 2.1、Azure 管理身份、Key Vault | MCP01, MCP02, MCP07 |
| **營區 2：閘道** | API 管理、專用端點、治理 | MCP02, MCP07, MCP09 |
| **營區 3：輸入輸出安全** | 提示注入、個人識別資料保護、內容安全 | MCP03, MCP05, MCP06 |
| **營區 4：監控** | 日誌分析、儀表板、威脅偵測 | MCP08 |
| **高峰** | 紅隊／藍隊整合測試 | 全部 |

**開始體驗**：[https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP 十大安全風險

[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) 詳細說明 MCP 實作中十大最關鍵的安全風險：

| 風險 | 描述 | Azure 緩解措施 |
|------|-------------|------------------|
| **MCP01** | 令牌管理不善及秘密外泄 | Azure Key Vault、Managed Identity |
| **MCP02** | 範圍擴大導致權限升級 | RBAC、條件性存取 |
| **MCP03** | 工具中毒 | 工具驗證、完整性核查 |
| **MCP04** | 供應鏈攻擊 | GitHub Advanced Security、依賴掃描 |
| **MCP05** | 指令注入與執行 | 輸入驗證、沙盒隔離 |
| **MCP06** | 透過上下文有效負載的提示注入 | Azure AI Content Safety、Prompt Shields |
| **MCP07** | 身份驗證及授權不足 | Azure Entra ID、OAuth 2.1 搭配 PKCE |
| **MCP08** | 缺乏審核與遙測 | Azure Monitor、Application Insights |
| **MCP09** | 影子 MCP 伺服器 | API 中心治理、網路隔離 |
| **MCP10** | 上下文注入與過度分享 | 資料分類、最小曝光 |

### MCP 身份驗證演進

MCP 規格在身份驗證與授權設計上已大幅演進：

- **原始方案**：早期需開發者自行實作客製身份驗證伺服器，MCP 伺服器充當 OAuth 2.0 授權伺服器，直接管理使用者認證
- **目前標準（2025-11-25）**：更新規格允許 MCP 伺服器委派身份驗證予外部身份提供者（例如 Microsoft Entra ID），提升安全態勢、降低實作複雜度
- **傳輸層安全**：增強對本地（STDIO）與遠端（Streamable HTTP）連線之安全傳輸機制與適當身份驗證模式支持

## 身份驗證與授權安全

### 目前安全挑戰

現代 MCP 實作面臨多項身份驗證及授權挑戰：

### 風險與威脅向量

- **授權邏輯錯誤設定**：MCP 伺服器授權實作不當，可能洩漏敏感資料並錯誤套用存取控管
- **OAuth 令牌遭盜用**：本地 MCP 伺服器令牌竊取使攻擊者可冒充伺服器、存取下游服務
- **令牌直通漏洞**：不當令牌處理導致安全控管繞過與責任歸屬缺失
- **過度權限**：MCP 伺服器擁有超出所需的權限，違反最小權限原則並擴大攻擊面

#### 令牌直通：嚴重的反模式

**因嚴重安全影響，令牌直通在現行 MCP 授權規範中被明確禁止**：

##### 繞過安全控管
- MCP 伺服器及下游 API 施行重要安全控管（速率限制、請求驗證、流量監控）須仰賴正確令牌驗證
- 用戶端直接用令牌呼叫 API 導致關鍵防護功能遭繞過，破壞安全架構

##### 責任及審計問題
- MCP 伺服器無法區別使用上游發行令牌的客戶端，破壞審計軌跡
- 下游資源伺服器日誌呈現誤導性請求來源，非真實 MCP 伺服器中介身份
- 事件調查與合規稽核變得極為困難

##### 資料外洩風險
- 未經驗證的令牌聲明允許持有被竊令牌的惡意角色將 MCP 伺服器當作代理進行資料外洩
- 信任邊界被侵犯，導致繞過既有安全控管的未授權存取

##### 多服務攻擊向量
- 被接受的被盜令牌跨多服務，使攻擊者可橫向移動至相關系統
- 服務間具有的信任假設因無法驗證令牌來源而被破壞

### 安全控管與緩解措施

**關鍵安全要求**：

> **強制規定**：MCP 伺服器**不得接受非專門發行給該 MCP 伺服器的任何令牌**

#### 身份驗證與授權控管

- **嚴謹授權審查**：全面審核 MCP 伺服器授權邏輯，確保只有預期的用戶和客戶端能存取敏感資源
  - **實作指南**：[Azure API Management 作為 MCP 伺服器身份驗證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **身份整合**：[使用 Microsoft Entra ID 進行 MCP 伺服器身份驗證](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **安全令牌管理**：採用 [Microsoft 令牌驗證與生命週期最佳實踐](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - 驗證令牌受眾（audience）符合 MCP 伺服器身份
  - 實施妥善的令牌輪替及過期政策
  - 防止令牌重放攻擊及未授權使用

- **令牌安全儲存**：令牌在靜態及傳輸時皆採加密保護
  - **最佳實踐**：[安全令牌儲存與加密指引](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### 存取控管實作

- **最小權限原則**：授予 MCP 伺服器僅需的最低權限達成其功能
  - 定期審查與更新權限，防止權限擴張
  - **Microsoft 文件**：[安全最小權限存取](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **基於角色的存取控管 (RBAC)**：落實細緻的角色分配
  - 角色範圍嚴格限定於特定資源與操作
  - 避免廣泛或不必要的權限擴大攻擊面

- **持續權限監控**：實施持續存取審核與監控
  - 監察權限使用模式異常
  - 及時修正過度或閒置權限

## AI 特有安全威脅

### 提示注入與工具操控攻擊

現代 MCP 實作面臨複雜的 AI 專屬攻擊向量，傳統安全措施無法完全因應：

#### **間接提示注入（跨域提示注入）**

**間接提示注入** 是 MCP 啟用的 AI 系統中最嚴重的弱點之一。攻擊者將惡意指令隱藏於外部內容——文件、網頁、電子郵件或資料源中，供 AI 系統後續解析為合法指令。

**攻擊場景：**
- **文件注入**：惡意指令藏於被處理的文件中，觸發 AI 執行非預期行動
- **網頁內容利用**：被入侵的網頁嵌入提示，使爬取時操控 AI 行為
- **電郵攻擊**：電子郵件中隱藏惡意提示，導致 AI 助理洩漏資訊或執行未授權操作
- **資料源遭污染**：受污染資料庫或 API 為 AI 系統提供受感染內容

**現實影響**：這些攻擊可能造成資料外洩、隱私侵犯、生成有害內容及操控用戶互動。詳細分析請參閱 [MCP 中的提示注入 (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)。

![提示注入攻擊示意圖](../../../translated_images/zh-MO/prompt-injection.ed9fbfde297ca877.webp)

#### **工具中毒攻擊**

**工具中毒** 針對定義 MCP 工具的元資料，利用大型語言模型（LLM）解讀工具描述和參數決策執行的機制。

**攻擊方式：**
- **元資料操控**：攻擊者將惡意指令注入工具描述、參數定義或使用範例
- **隱藏指令**：工具元資料中隱藏由 AI 模型處理但人類不可見的提示
- **動態工具修改（「地毯拉」）**：使用者核准的工具後續遭修改執行惡意行為，使用者不自知
- **參數注入**：惡意內容嵌入工具參數結構，影響模型行為

**託管伺服器風險**：遠端 MCP 伺服器風險升高，因工具定義可在用戶核准後更新，使原本安全的工具變惡意。詳盡分析請參閱 [工具中毒攻擊（Invariant Labs）](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)。

![工具注入攻擊示意圖](../../../translated_images/zh-MO/tool-injection.3b0b4a6b24de6bef.webp)

#### **其他 AI 攻擊向量**

- **跨域提示注入 (XPIA)**：利用多個領域內容繞過安全控管的複雜攻擊
- **動態能力修改**：對工具能力進行實時更改，逃避初始安全評估  
- **上下文視窗中毒**：操控大型上下文視窗以隱藏惡意指令的攻擊  
- **模型混淆攻擊**：利用模型限制製造不可預測或不安全行為  

### AI 安全風險影響

**高影響後果：**  
- **資料外洩**：未經授權訪問及竊取敏感企業或個人資料  
- **隱私違規**：個人識別信息（PII）及機密商業資料曝光  
- **系統操控**：對關鍵系統和工作流程的非預期修改  
- **憑證竊取**：認證令牌及服務憑證被攻破  
- **橫向移動**：利用受損 AI 系統作為更廣泛網路攻擊的轉移樞紐  

### 微軟 AI 安全解決方案

#### **AI 提示盾牌：對抗注入攻擊的先進防護**

微軟 **AI 提示盾牌** 通過多層安全機制，全面防禦直接和間接的提示注入攻擊：

##### **核心防護機制：**

1. **先進檢測與過濾**  
   - 機器學習算法與自然語言處理技術檢測外部內容中惡意指令  
   - 實時分析文件、網頁、電子郵件及數據來源中的嵌入威脅  
   - 語境理解合法與惡意提示模式  

2. **聚焦技術**  
   - 區分可信系統指令與潛在受損的外部輸入  
   - 文本轉換方法提升模型相關性，同時隔離惡意內容  
   - 幫助 AI 系統維持適當的指令層級，忽略注入命令  

3. **分隔符與數據標記系統**  
   - 明確界定可信系統訊息與外部輸入文字之間的邊界  
   - 特殊標記強調可信與不可信數據來源間的分界  
   - 清晰分離防止指令混淆及未授權指令執行  

4. **持續威脅情報**  
   - 微軟持續監控新興攻擊模式並更新防禦措施  
   - 主動威脅獵捕新注入技術與攻擊路徑  
   - 定期安全模型更新以維持對演化威脅的效能  

5. **Azure 內容安全整合**  
   - 作為全面 Azure AI 內容安全套件一部分  
   - 額外偵測越獄嘗試、有害內容及安全政策違規  
   - AI 應用組件間統一安全控制  

**實作資源**：[Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/zh-MO/prompt-shield.ff5b95be76e9c78c.webp)  


## 進階 MCP 安全威脅

### 會話劫持漏洞

**會話劫持** 為有狀態 MCP 實作中的嚴重攻擊向量，未授權方取得並濫用合法會話標識來冒充客戶端並執行未授權操作。

#### **攻擊情境與風險**

- **會話劫持提示注入**：攻擊者憑偷取的會話 ID 向共享會話狀態的服務器注入惡意事件，可能觸發有害行為或存取敏感數據  
- **直接冒充**：被盜的會話 ID 允許繞過驗證直接呼叫 MCP 服務器，將攻擊者視為合法使用者  
- **受損的可續流**：攻擊者可提前終止請求，導致合法用戶以潛在惡意內容繼續執行  

#### **會話管理安全控制**

**關鍵要求：**  
- **授權驗證**：實作授權的 MCP 服務器 **必須** 驗證所有來入請求，且**不得**依賴會話作為身份驗證  
- **安全會話產生**：使用加密安全、非決定性且採用安全隨機數產生器的會話 ID  
- **用戶綁定**：以 `<user_id>:<session_id>` 格式綁定會話 ID 至用戶資訊，防止跨用戶會話濫用  
- **會話生命週期管理**：適當設置會話到期、輪換及失效，限制易受攻擊的窗口  
- **傳輸安全**：所有通訊必須使用 HTTPS，防止會話 ID 被截取  

### 混淆代表問題

**混淆代表問題** 指 MCP 服務器作為客戶端與第三方服務間的認證代理時，因利用靜態客戶端 ID 導致授權繞過風險。

#### **攻擊機制與風險**

- **基於 Cookie 的同意繞過**：先前用戶認證產生的同意 Cookie 被攻擊者含惡意授權請求及精心設計重定向 URI 利用  
- **授權碼竊取**：現有同意 Cookie 可能令授權伺服器跳過同意畫面，授權碼被重定向至攻擊方控管端點  
- **未經授權 API 存取**：竊取的授權碼可與令牌交換並冒充用戶，無需明示批准  

#### **緩解策略**

**強制控制事項：**  
- **明確同意要求**：使用靜態客戶端 ID 的 MCP 代理服務器 **必須** 為每個動態註冊客戶端取得用戶同意  
- **OAuth 2.1 安全實作**：遵循當前 OAuth 安全最佳實踐，包含所有授權請求使用 PKCE（授權碼交換證明）  
- **嚴格客戶端驗證**：對重定向 URI 和客戶端識別碼實施嚴密驗證防止濫用  

### 令牌直通漏洞  

**令牌直通** 表示 MCP 服務器接受客戶端令牌而未適當驗證，直接轉發至下游 API，違反 MCP 授權規範的明確反面範例。

#### **安全影響**

- **控制繞過**：客戶端令牌直接使用於 API，繞過重要的速率限制、驗證與監控控管  
- **審計軌跡破壞**：上游頒發的令牌讓客戶端識別不可行，破壞事件調查能力  
- **代理型資料外洩**：未驗證令牌允许惡意者利用伺服器作為未授權資料存取的代理  
- **信任邊界違規**：下游服務對令牌來源信任假設失效造成安全隱患  
- **多服務攻擊擴散**：受損令牌被多服務接受，助長橫向移動  

#### **必要安全控制**

**不可妥協要求：**  
- **令牌驗證**：MCP 服務器**不得**接受非明確發給該 MCP 服務器的令牌  
- **受眾驗證**：必須驗證令牌受眾聲明與 MCP 服務器身份相符  
- **令牌生命週期管理**：實施短期存活的存取令牌與安全輪替策略  

## AI 系統供應鏈安全

供應鏈安全已超越傳統軟體依賴，擴及整個 AI 生態系。現代 MCP 實作必須嚴謹驗證並監控所有 AI 相關元件，因每個元件皆帶來潛在漏洞風險，可能破壞系統完整性。

### 擴展的 AI 供應鏈元件

**傳統軟體依賴：**  
- 開源庫與框架  
- 容器映像與基礎系統  
- 開發工具與構建管線  
- 基礎設施元件與服務  

**AI 專屬供應鏈元素：**  
- **基礎模型**：多家供應商預訓練模型需驗證來源  
- **嵌入服務**：外部向量化及語義搜尋服務  
- **上下文提供者**：資料來源、知識庫及文件存儲庫  
- **第三方 API**：外部 AI 服務、機器學習管線與資料處理端點  
- **模型產物**：權重、配置與微調模型變體  
- **訓練資料來源**：模型訓練與微調資料集  

### 全面供應鏈安全策略

#### **元件驗證與信任**  
- **來源驗證**：整合前核實所有 AI 元件的來源、授權和完整性  
- **安全評估**：對模型、資料來源及 AI 服務進行漏洞掃描和安全審查  
- **聲譽分析**：評估 AI 服務提供商的安全紀錄與實踐  
- **合規驗證**：確保所有元件符合組織安全與法規要求  

#### **安全部署管線**  
- **自動化 CI/CD 安全**：在自動化部署管線中整合安全掃描  
- **產物完整性**：為所有部署產物（代碼、模型、配置）實施加密驗證  
- **分階段部署**：採用分階段部署策略並於每階段進行安全驗證  
- **可信產物倉庫**：僅從已驗證且安全的產物註冊處與倉庫部署  

#### **持續監控與響應**  
- **依賴掃描**：持續監控所有軟體及 AI 元件依賴的漏洞  
- **模型監控**：持續評估模型行為、性能漂移與安全異常  
- **服務健康追蹤**：監控外部 AI 服務可用性、安全事件與政策變更  
- **威脅情報整合**：結合專屬 AI 與 ML 安全風險的威脅情報源  

#### **存取控制與最小權限**  
- **元件層級權限**：根據業務需求限制模型、資料及服務存取  
- **服務帳戶管理**：使用具最低必要權限的專用服務帳戶  
- **網路區隔**：隔離 AI 元件並限制服務間網路存取  
- **API 閘道控管**：使用集中 API 閘道控制及監控外部 AI 服務存取  

#### **事件響應與復原**  
- **快速響應程序**：建立修補或替換受損 AI 元件的流程  
- **憑證輪替**：自動化系統輪替秘密、API 金鑰及服務憑證  
- **回滾能力**：具備快速回退至先前良好版本的能力  
- **供應鏈違規復原**：針對上游 AI 服務遭入侵制定專門回應程序  

### 微軟安全工具與整合

**GitHub Advanced Security** 提供全面供應鏈保護，包括：  
- **秘密掃描**：自動檢測存儲庫中的憑證、API 金鑰與令牌  
- **依賴掃描**：開源依賴與庫的漏洞評估  
- **CodeQL 分析**：靜態代碼分析評估安全漏洞及程式設計問題  
- **供應鏈洞察**：依賴健康及安全狀況的可視化  

**Azure DevOps 與 Azure Repos 整合：**  
- 微軟開發平台跨系統無縫整合安全掃描  
- Azure Pipelines 中針對 AI 工作負載的自動安全檢查  
- 安全 AI 元件部署的政策強制執行  

**微軟內部實踐：**  
微軟於所有產品中實施廣泛供應鏈安全做法。詳見 [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)。

## 基礎安全最佳實踐

MCP 實作繼承並建立於組織現有安全態勢。強化基礎安全做法可顯著提升 AI 系統與 MCP 部署的整體安全。

### 核心安全基礎

#### **安全開發實踐**  
- **OWASP 合規**：防護 [OWASP Top 10](https://owasp.org/www-project-top-ten/) 網頁應用程式漏洞  
- **AI 專屬保護**：實施 [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) 控制措施  
- **安全秘密管理**：為令牌、API 金鑰和機敏配置資料使用專用密庫  
- **端對端加密**：於所有應用組件與資料流通路實施安全通訊  
- **輸入驗證**：嚴格驗證所有用戶輸入、API 參數與資料來源  

#### **基礎設施硬化**  
- **多因素驗證**：所有管理及服務帳戶必須啟用 MFA  
- **補丁管理**：自動及時更新作業系統、框架與依賴套件  
- **身份供應商整合**：透過企業身份供應商（Microsoft Entra ID、Active Directory）集中管理身份  
- **網路區隔**：邏輯隔離 MCP 元件限制橫向移動可能性  
- **最小權限原則**：所有系統元件及帳戶僅授予最低必要權限  

#### **安全監控與偵測**  
- **全面日誌記錄**：詳細記錄 AI 應用活動，包括 MCP 用戶端-服務器交互  
- **SIEM 整合**：集中安全資訊與事件管理，偵測異常  
- **行為分析**：利用 AI 偵測系統及用戶行為異常模式  
- **威脅情報**：整合外部威脅情報源與妥協指標（IOC）  
- **事件響應**：建立完善安全事件偵測、響應及復原流程  

#### **零信任架構**  
- **永不信任，持續驗證**：持續驗證使用者、裝置和網路連線  
- **微分段**：細粒度網路控制隔離個別工作負載與服務  
- **身份中心安全**：以驗證身份代替網路位置施行安全政策  
- **持續風險評估**：根據目前情境與行為動態評估安全態勢  
- **條件存取**：依風險因子、位置與裝置信任調整存取控制  

### 企業整合模式

#### **微軟安全生態系整合**  
- **Microsoft Defender for Cloud**：全面雲端安全態勢管理  
- **Azure Sentinel**：原生雲端 SIEM 與 SOAR，保護 AI 工作負載  
- **Microsoft Entra ID**：企業身份及存取管理，具條件存取政策  
- **Azure Key Vault**：中央秘密管理，硬體安全模組（HSM）支持  
- **Microsoft Purview**：AI 資料來源與工作流程的資料治理與合規  

#### **合規與治理**  
- **法規符合**：確保 MCP 實作遵守特定行業合規需求（GDPR、HIPAA、SOC 2）  
- **資料分類**：妥善分類處理 AI 系統處理的敏感資料  
- **審計軌跡**：全面記錄以符合法規合規及取證調查需要  
- **隱私控管**：於 AI 系統架構中實施隱私設計原則  
- **變更管理**：正式流程進行 AI 系統變更的安全審查  

這些基礎作法奠定堅實安全底線，提升 MCP 專用安全控制效能，為 AI 驅動應用提供全面防護。
## 主要安全重點

- **分層安全方法**：結合基礎安全實務（安全編碼、最小特權、供應鏈驗證、持續監控）與 AI 專用控管，提供全面性防護

- **AI 專屬威脅範疇**：MCP 系統面臨獨特風險，包括提示注入、工具污染、會話劫持、混淆代理問題、令牌直通漏洞及過度權限，需專門緩解措施

- **驗證與授權卓越**：採用外部身份供應商（Microsoft Entra ID）進行強健驗證，強制適當的令牌驗證，嚴禁接受非明確核發給您 MCP 伺服器的令牌

- **AI 攻擊防護**：部署 Microsoft Prompt Shields 與 Azure Content Safety 防禦間接提示注入及工具污染攻擊，同時驗證工具元資料並監控動態變更

- **會話與傳輸安全**：使用加密安全、非決定性且綁定使用者身份的會話 ID，實施適當的會話生命週期管理，嚴禁利用會話進行驗證

- **OAuth 安全最佳實務**：透過動態註冊用戶明確同意防止混淆代理攻擊，正確實裝含 PKCE 的 OAuth 2.1，並嚴格驗證重導 URI

- **令牌安全原則**：避免令牌直通反模式，驗證令牌受眾聲明，實行短壽命令牌與安全輪替，維持清晰的信任邊界

- **全面供應鏈安全**：將所有 AI 生態系組件（模型、嵌入、上下文供應商、外部 API）視為傳統軟體相依性般嚴格保護

- **持續演進**：持續掌握快速演進的 MCP 規格，參與安全社群標準制定，並隨協議成熟保持適應性安全態勢

- **微軟安全整合**：善用 Microsoft 的全面安全生態系（Prompt Shields、Azure Content Safety、GitHub Advanced Security、Entra ID），強化 MCP 部署防護

## 全面資源

### **官方 MCP 安全文件**
- [MCP 規格（目前版本：2025-11-25）](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳實務](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授權規格](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub 倉庫](https://github.com/modelcontextprotocol)

### **OWASP MCP 安全資源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 全面 OWASP MCP Top 10 與 Azure 實作指引
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全風險
- [MCP 安全高峰研討會工作坊（Sherpa）](https://azure-samples.github.io/sherpa/) - Azure MCP 實作安全實務訓練

### **安全標準與最佳實務**
- [OAuth 2.0 安全最佳實務（RFC 9700）](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Web 應用程式安全十大風險](https://owasp.org/www-project-top-ten/)
- [大型語言模型的 OWASP Top 10](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft 數碼防禦報告](https://aka.ms/mddr)

### **AI 安全研究與分析**
- [MCP 中的提示注入（Simon Willison）](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [工具污染攻擊（Invariant Labs）](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP 安全研究簡報（Wiz Security）](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **微軟安全方案**
- [Microsoft Prompt Shields 文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety 服務](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID 安全](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure 令牌管理最佳實務](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub 進階安全](https://github.com/security/advanced-security)

### **實作指南與教學**
- [Azure API Management 作為 MCP 驗證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID 與 MCP 伺服器驗證](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [安全令牌儲存與加密（影片）](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps 與供應鏈安全**
- [Azure DevOps 安全](https://azure.microsoft.com/products/devops)
- [Azure Repos 安全](https://azure.microsoft.com/products/devops/repos/)
- [微軟軟體供應鏈安全之旅](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **額外安全文件**

詳見本節中的專門文件以獲取全面安全指引：

- **[MCP 安全最佳實務 2025](./mcp-security-best-practices-2025.md)** - MCP 實作完整安全最佳實務
- **[Azure Content Safety 實作指引](./azure-content-safety-implementation.md)** - Azure Content Safety 整合實務範例  
- **[MCP 安全控管 2025](./mcp-security-controls-2025.md)** - MCP 部署最新安全控管與技術
- **[MCP 最佳實務快速參考](./mcp-best-practices.md)** - MCP 重要安全實務速查指南

### **實作安全訓練**

- **[MCP 安全高峰研討會工作坊（Sherpa）](https://azure-samples.github.io/sherpa/)** - Azure MCP 伺服器全面手把手安全培訓，涵蓋基礎營至高峰營
- **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)** - 全 OWASP MCP Top 10 風險參考架構與實作指引

---

## 接下來

下一章：[第 3 章：入門](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件乃使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 所翻譯。雖然我們致力於確保準確性，請留意自動翻譯可能包含錯誤或不準確之處。文件原文之母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用本翻譯所產生之任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->