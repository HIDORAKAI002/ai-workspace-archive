# MCP 安全性：AI 系統的全面防護

[![MCP Security Best Practices](../../../translated_images/zh-TW/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(點擊上方圖片觀看本課程影片)_

安全性是 AI 系統設計的基礎，因此我們將其列為第二章節重點。這與微軟在[安全未來計畫](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/)中推崇的**以設計為本的安全**理念相符。

模型上下文協定（MCP）為 AI 驅動的應用帶來強大功能，同時也引入了超越傳統軟體風險的獨特安全挑戰。MCP 系統面臨既有的安全關注（安全編碼、最小權限、供應鏈安全）以及新型 AI 特定威脅，包括提示注入、工具中毒、會話劫持、代理人混淆攻擊、權杖轉發漏洞，以及動態能力修改。

本課程探討 MCP 實作中最關鍵的安全風險—涵蓋驗證、授權、過度權限、間接提示注入、會話安全、代理人混淆問題、權杖管理及供應鏈漏洞。您將學會行動性控管與最佳實踐，以減輕這些風險，並善用微軟解決方案，如 Prompt Shields、Azure 內容安全及 GitHub 進階安全，強化您的 MCP 部屬。

## 學習目標

課程結束後，您將能夠：

- **識別 MCP 特有威脅**：認識 MCP 系統中獨特的安全風險，包括提示注入、工具中毒、過度權限、會話劫持、代理人混淆問題、權杖轉發漏洞及供應鏈風險
- **應用安全控管**：實施有效減輕措施，包括強健認證、最小權限存取、安全權杖管理、會話安全控管及供應鏈驗證
- **善用微軟安全解決方案**：了解並部署微軟 Prompt Shields、Azure 內容安全及 GitHub 進階安全以保護 MCP 工作負載
- **驗證工具安全性**：認識工具元資料驗證、監控動態變更及防禦間接提示注入攻擊的重要性
- **整合最佳實踐**：結合既有安全基礎（安全編碼、伺服器強化、零信任）與 MCP 專屬控管，達成全面防護

# MCP 安全架構與控管

現代 MCP 實作需採用分層安全策略，同時處理傳統軟體安全與 AI 特殊威脅。迅速演進的 MCP 規範持續優化其安全控管，促進與企業安全架構及最佳實務的整合。

根據[微軟數位防禦報告](https://aka.ms/mddr)的研究顯示，**98% 的報告資安事件可透過強健的安全衛生管控避免**。最有效的防護策略是結合基礎安全實務與 MCP 專屬控管—經過驗證的安全基線措施仍為降低整體安全風險最有力手段。

## 當前安全現況

> **注意：** 本資訊反映截至 **2026 年 2 月 5 日** 的 MCP 安全標準，符合 **MCP 規範 2025-11-25**。MCP 協定持續快速演進，未來實作可能導入新的認證模式與強化控管。請隨時參考最新的 [MCP 規範](https://spec.modelcontextprotocol.io/)、[MCP GitHub 倉庫](https://github.com/modelcontextprotocol) 及[安全最佳實務文件](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) 以獲得最新指引。

## 🏔️ MCP 安全峰會工作坊（Sherpa）

我們強烈推薦參加 **MCP 安全峰會工作坊**（Sherpa）—一場實戰導向的引導式旅程，教您如何在 Microsoft Azure 上保障 MCP 伺服器安全。

### 工作坊概述

[MCP 安全峰會工作坊](https://azure-samples.github.io/sherpa/)透過「漏洞 → 利用 → 修補 → 驗證」的實證方法論，提供實用且可行的安全訓練。您將：

- **透過攻破學習**：親身體驗利用故意設計的弱安全伺服器漏洞
- **善用 Azure 原生安全**：運用 Azure Entra ID、Key Vault、API 管理與 AI 內容安全
- **落實深度防禦**：循序漸進建構多層全面防護
- **套用 OWASP 標準**：每項技術均對應至[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)
- **取得生產程式碼**：帶走已驗證可用的實作範例

### 探險路線

| 營地 | 專注主題 | 涵蓋 OWASP 風險 |
|------|---------|-----------------|
| **基地營** | MCP 基礎與認證弱點 | MCP01, MCP07 |
| **營地 1：身份管理** | OAuth 2.1、Azure 管理識別、Key Vault | MCP01, MCP02, MCP07 |
| **營地 2：閘道** | API 管理、私有端點、治理機制 | MCP02, MCP07, MCP09 |
| **營地 3：輸入輸出安全** | 提示注入、PII 保護、內容安全 | MCP03, MCP05, MCP06 |
| **營地 4：監控** | 日誌分析、儀表板、威脅偵測 | MCP08 |
| **峰會** | 紅隊/藍隊整合測試 | 全部 |

**開始旅程**：[https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP 十大安全風險

[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)闡述 MCP 實作中十大最關鍵的安全風險：

| 風險 | 描述 | Azure 對應控管 |
|------|------|---------------|
| **MCP01** | 權杖誤用與機密外洩 | Azure Key Vault，管理式識別 |
| **MCP02** | 範圍擴張導致權限提升 | RBAC，條件性存取 |
| **MCP03** | 工具中毒 | 工具驗證，完整性檢查 |
| **MCP04** | 供應鏈攻擊 | GitHub 進階安全，依賴套件掃描 |
| **MCP05** | 指令注入與執行 | 輸入驗證，沙盒環境 |
| **MCP06** | 透過情境負載的提示注入 | Azure AI 內容安全，Prompt Shields |
| **MCP07** | 認證與授權不足 | Azure Entra ID，搭配 PKCE 的 OAuth 2.1 |
| **MCP08** | 缺乏稽核與遙測 | Azure Monitor，Application Insights |
| **MCP09** | 影子 MCP 伺服器 | API 中心治理，網路隔離 |
| **MCP10** | 上下文注入與過度暴露 | 資料分類，最小暴露 |

### MCP 認證機制演進

MCP 規範在認證與授權方法上歷經顯著演進：

- **原始方式**：早期規範要求開發者建立自訂認證伺服器，MCP 伺服器作為 OAuth 2.0 授權伺服器，直接管理使用者認證
- **目前標準（2025-11-25）**：新版規範允許 MCP 伺服器委派認證給外部身分識別提供者（如 Microsoft Entra ID），提升安全態勢並簡化實作
- **傳輸層安全**：加強對安全傳輸機制的支援，並對本地（STDIO）及遠端（Streamable HTTP）連線採用正確的認證模式

## 認證與授權安全

### 當前安全挑戰

現代 MCP 實作面臨若干驗證及授權問題：

### 風險與威脅向量

- **授權邏輯配置錯誤**：MCP 伺服器授權實作瑕疵會導致敏感資料外洩及錯誤存取控管
- **OAuth 權杖遭竊**：本地 MCP 伺服器權杖被竊後，攻擊者可冒充伺服器存取下游服務
- **權杖轉發漏洞**：不當處理權杖導致安全控管繞過與問責漏洞
- **過度權限**：權限過大違反最小權限原則，擴大攻擊面

#### 權杖轉發：關鍵反範式

因為嚴重的安全隱患，**目前 MCP 授權規範明確禁止權杖轉發**：

##### 安全控管繞過
- MCP 伺服器與下游 API 實行關鍵安全控管（速率限制、請求驗證、流量監控）皆仰賴正確的權杖驗證
- 用戶端直接使用 API 權杖跳過這些必須保護，破壞安全架構

##### 問責與稽核困難
- MCP 伺服器無法區分使用上游權杖的客戶端，造成稽核斷鏈
- 下游資源伺服器紀錄顯示為用戶端而非 MCP 伺服器中介，導致事件追查受阻
- 合規稽核與事故調查變得更加困難

##### 資料外洩風險
- 權杖聲明未經驗證，讓竊取權杖的惡意行為者利用 MCP 伺服器做為資料外洩代理
- 信任邊界被打破，導致未授權存取繞過防護

##### 多服務攻擊路徑
- 多個服務接受同一被攻擊的權杖，攻擊者可橫向移動
- 無法驗證權杖來源可能破壞服務間信任假設

### 安全控管與緩解措施

**重要安全要求：**

> **強制：** MCP 伺服器**不得接受非明確為其發行之權杖**

#### 認證與授權控管

- **嚴格授權審查**：全方位稽核 MCP 伺服器授權邏輯，確保僅預期使用者及客戶端能存取敏感資源
  - **實作指南**：[Azure API 管理作為 MCP 伺服器認證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **身份整合**：[使用 Microsoft Entra ID 進行 MCP 伺服器認證](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **安全權杖管理**：採用[微軟權杖驗證及生命週期最佳實務](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - 驗證權杖受眾宣告與 MCP 伺服器身分相符
  - 正確實施權杖輪替及期限政策
  - 防範權杖重放攻擊與未授權使用

- **受保護的權杖儲存**：對權杖進行靜態與傳輸加密保護
  - **最佳實務**：[安全權杖儲存與加密指引](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### 存取控制實作

- **最小權限原則**：僅授予 MCP 伺服器執行功能所需最低權限
  - 定期檢查與更新權限，防止權限擴張
  - **微軟文件**：[安全且最小權限存取](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **角色基礎存取控制（RBAC）**：實施細緻角色分配
  - 按資源和行為嚴格限定角色範圍
  - 避免過大或不必要權限擴展攻擊面

- **持續權限監控**：實施持續存取稽核與監控
  - 監控權限使用異常
  - 及時修正過度或閒置權限

## AI 特定安全威脅

### 提示注入與工具操控攻擊

現代 MCP 實作遭遇複雜的 AI 特異攻擊路徑，傳統安全措施無法完全因應：

#### **間接提示注入（跨領域提示注入）**

**間接提示注入**是 MCP 支援 AI 系統中最嚴重的漏洞之一。攻擊者將惡意指令藏於外部內容——文件、網頁、電子郵件或資料來源，而 AI 系統隨後將其當作合法指令執行。

**攻擊場景：**
- **文件植入攻擊**：惡意指令藏於處理文件，觸發非預期 AI 行為
- **網頁內容利用**：受害網頁內嵌提示，當 AI 擷取時改變行為
- **電子郵件攻擊**：郵件中的惡意提示導致 AI 助理洩露資訊或執行未授權操作
- **資料庫污染**：被篡改的資料庫或 API 提供損害性內容給 AI 處理

**真實影響**：這些攻擊可能導致資料外洩、隱私侵犯、有害內容產生與使用者互動操縱。詳見 [MCP 的提示注入分析（Simon Willison）](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)。

![Prompt Injection Attack Diagram](../../../translated_images/zh-TW/prompt-injection.ed9fbfde297ca877.webp)

#### **工具中毒攻擊**

**工具中毒**針對 MCP 工具的元資料，利用大型語言模型解讀工具說明與參數方式做出執行決策的弱點。

**攻擊機制：**
- **元資料操縱**：攻擊者注入惡意指令於工具說明、參數定義或使用範例中
- **隱藏指令**：工具元資料內藏隱形提示，為 AI 模型讀取但使用者看不見
- **動態工具修改（「拉地毯」）**：使用者已核准工具後期被變更為執行惡意行為
- **參數注入**：於工具參數結構植入惡意內容造成模型行為偏移

**託管伺服器風險**：遠端 MCP 伺服器存在高度風險，因工具定義可在用戶核准後更新，造成原本安全工具變成惡意。詳盡分析見 [工具中毒攻擊（Invariant Labs）](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)。

![Tool Injection Attack Diagram](../../../translated_images/zh-TW/tool-injection.3b0b4a6b24de6bef.webp)

#### **其他 AI 攻擊向量**

- **跨領域提示注入（XPIA）**：利用多域內容繞過安全控管的複雜攻擊手法
- **動態能力修改**：即時更改工具能力，逃避初始安全評估  
- **上下文視窗污染**：操控大型上下文視窗以隱藏惡意指令的攻擊  
- **模型混淆攻擊**：利用模型限制產生不可預測或不安全行為  

### AI 安全風險影響

**高影響後果：**  
- **資料外洩**：未授權存取及竊取企業或個人敏感資料  
- **隱私洩露**：個人識別資訊（PII）及機密商業資料曝露  
- **系統操縱**：對關鍵系統和工作流程的非預期變更  
- **憑證竊取**：認證令牌及服務憑證被妥協  
- **橫向移動**：將被攻破的 AI 系統用作更廣泛網路攻擊的跳板  

### 微軟 AI 安全解決方案

#### **AI 提示盾牌：針對注入攻擊的先進防護**

微軟 **AI 提示盾牌** 透過多層次安全防護，全面抵禦直接和間接的提示注入攻擊：

##### **核心防護機制：**

1. **先進偵測與過濾**  
   - 機器學習演算法及自然語言處理技術偵測外部內容中的惡意指令  
   - 即時分析文件、網頁、電子郵件及資料來源，發現潛藏威脅  
   - 理解合法與惡意提示模式的上下文  

2. **聚焦技術**  
   - 區分受信任系統指令與潛在受損外部輸入  
   - 文字轉換方式加強模型對相關性的理解，同時隔離惡意內容  
   - 幫助 AI 系統維持正確指令層級，忽略注入指令  

3. **分隔符與資料標記系統**  
   - 明確界定受信任系統訊息與外部輸入文字的邊界  
   - 特殊標記突顯可信與不可信資料來源的界線  
   - 明確分離防止指令混淆及未授權命令執行  

4. **持續威脅情報**  
   - 微軟持續監控新興攻擊模式並更新防禦措施  
   - 主動獵捕新注入技術與攻擊向量  
   - 定期安全模型更新以因應演變威脅  

5. **Azure 內容安全整合**  
   - 隸屬於完整的 Azure AI 內容安全套件  
   - 額外偵測越獄嘗試、有害內容及安全政策違反  
   - AI 應用元件間的統一安全控管  

**實作資源**：[Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/zh-TW/prompt-shield.ff5b95be76e9c78c.webp)


## 進階 MCP 安全威脅

### 會話劫持弱點

**會話劫持** 是狀態式 MCP 實作中的嚴重攻擊途徑，未授權者取得並濫用合法會話識別，以冒充客戶端並執行未經授權行為。

#### **攻擊情境與風險**

- **會話劫持提示注入**：攻擊者持有被竊會話 ID，向共享狀態的服務器注入惡意事件，可能觸發危害操作或存取敏感資料  
- **直接冒充**：竊取的會話 ID 允許直接呼叫 MCP 伺服器，繞過認證，將攻擊者視為合法使用者  
- **可續流式串流被破壞**：攻擊者提前終止請求，導致合法客戶端續傳時潛在發生惡意內容  

#### **會話管理安全控管**

**關鍵需求：**  
- **授權驗證**：實作授權的 MCP 伺服器**必須**驗證所有進入請求，**不得**依賴會話進行認證  
- **安全會話生成**：使用密碼學安全且非確定性之會話 ID，由安全隨機數產生器創建  
- **用戶綁定**：將會話 ID 與用戶資訊綁定，如 `<user_id>:<session_id>` 格式避免跨用戶會話濫用  
- **會話生命週期管理**：適當過期、輪替及失效設定以縮短風險窗口  
- **傳輸安全**：所有通信強制使用 HTTPS，避免會話 ID 被截取  

### 混淆代理問題

**混淆代理問題** 發生當 MCP 伺服器充當用戶端與第三方服務間之認證代理，利用靜態用戶端 ID 造成授權繞過漏洞。

#### **攻擊機制與風險**

- **基於 Cookie 的同意繞過**：先前用戶認證產生的同意 Cookie 被攻擊者利用，通過惡意授權請求及特製重定向 URI  
- **授權碼竊取**：現有同意 Cookie 可能使授權伺服器略過同意流程，重定向授權碼至攻擊者端點  
- **未授權 API 存取**：竊取授權碼支援令牌交換和用戶冒充，無須明確同意  

#### **緩解策略**

**強制控管：**  
- **明確同意要求**：使用靜態用戶端 ID 的 MCP 代理伺服器**必須**為每個動態註冊用戶端取得用戶同意  
- **OAuth 2.1 安全實踐**：所有授權請求遵循 PKCE（交換碼驗證）等最新 OAuth 安全規範  
- **嚴格用戶端驗證**：嚴密檢查重定向 URI 與用戶端識別以防濫用  

### 令牌直通弱點  

**令牌直通** 是明顯的反模式，指 MCP 伺服器未妥善驗證即接受用戶端令牌並轉送到下游 API，違反 MCP 授權規範。

#### **安全後果**

- **控管繞過**：客戶端直接用 API 令牌繞過速率限制、驗證及監控控管  
- **稽核紀錄破壞**：上游簽發的令牌令客戶端身份識別成問題，影響事件調查能力  
- **代理式資料外洩**：未驗證令牌讓惡意者利用伺服器作為未授權存取的代理  
- **信任邊界違反**：無法驗證令牌來源可能違反下游服務的信任假設  
- **跨服務攻擊擴展**：多服務接受被竄改令牌助攻攻擊橫向擴展  

#### **必要安全控管**

**不可妥協要求：**  
- **令牌驗證**：MCP 伺服器**不得**接受未明確簽發給 MCP 伺服器的令牌  
- **受眾驗證**：必須驗證令牌的受眾聲明與 MCP 伺服器身份相符  
- **妥善令牌生命週期**：使用短效存取令牌並執行安全輪替  

## AI 系統供應鏈安全

供應鏈安全已超越傳統軟體依賴，涵蓋整體 AI 生態系統。現代 MCP 實作必須嚴格驗證和監控所有 AI 相關元件，每個元件皆存在可潛在破壞系統完整性的風險。

### 擴展的 AI 供應鏈元件

**傳統軟體依賴：**  
- 開源程式庫與框架  
- 容器映像與基礎系統  
- 開發工具與建置流水線  
- 基礎設施元件與服務  

**AI 專屬供應鏈元素：**  
- **基礎模型**：來自多家供應商的預訓練模型，須進行來源驗證  
- **嵌入服務**：外部向量化與語義搜尋服務  
- **上下文提供者**：資料來源、知識庫及文件儲存庫  
- **第三方 API**：外部 AI 服務、機器學習流水線及資料處理端點  
- **模型工件**：權重、組態及細調模型版本  
- **訓練數據來源**：用於模型訓練和優化的資料集  

### 全面供應鏈安全策略

#### **元件驗證與信任**  
- **來源驗證**：整合前驗證所有 AI 元件的來源、授權與完整性  
- **安全評估**：對模型、數據來源與 AI 服務進行漏洞掃描與安全審查  
- **信譽分析**：評估 AI 服務提供商的安全記錄與實務  
- **合規確認**：確保所有元件符合組織安全與法規要求  

#### **安全部署流水線**  
- **自動化 CI/CD 安全掃描**：安全檢測整合於自動化部署流程  
- **工件完整性**：對所有部署工件（程式碼、模型、組態）執行加密驗證  
- **階段性部署**：採用階段性部署與每階段安全驗證  
- **信任工件存儲庫**：只從驗證過的安全工件庫部署  

#### **持續監控與應對**  
- **依賴掃描**：所有軟體及 AI 元件依賴持續漏洞掃描  
- **模型監控**：持續評估模型行為、性能漂移及安全異常  
- **服務健康追蹤**：監控外部 AI 服務的可用性、安全事件及政策變動  
- **威脅情報整合**：集成 AI 和機器學習安全風險專用威脅情報  

#### **存取控管與最小權限**  
- **元件層級權限**：依業務需求限制對模型、數據和服務的存取  
- **服務帳號管理**：部署專用服務帳號，權限最小化  
- **網路分段**：隔離 AI 元件並限制服務間網路訪問  
- **API 閘道控管**：集中 API 閘道管理並監控外部 AI 服務存取  

#### **事件響應與復原**  
- **快速響應程序**：針對被攻破的 AI 元件迅速修補或替換  
- **憑證輪替**：自動化系統輪替機密資訊、API 金鑰及服務憑證  
- **回滾能力**：迅速恢復至先前已知安全的 AI 元件版本  
- **供應鏈違規復原**：針對上游 AI 服務攻擊專門制定的應對流程  

### 微軟安全工具與整合

**GitHub Advanced Security** 提供全面供應鏈防護，包括：  
- **機密掃描**：自動偵測程式庫中的憑證、API 金鑰和令牌  
- **依賴掃描**：開源依賴及程式庫的漏洞評估  
- **CodeQL 分析**：程式碼靜態安全漏洞與編碼問題分析  
- **供應鏈見解**：依賴健康狀況及安全狀態可視化  

**Azure DevOps 與 Azure Repos 整合：**  
- Microsoft 開發平台上的無縫安全掃描整合  
- Azure Pipelines 中 AI 工作負載的自動安全檢查  
- 安全集成政策強制 AI 元件部署標準  

**微軟內部實務：**  
微軟在所有產品中執行廣泛的供應鏈安全實踐。詳細做法請參考 [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)。

## 基礎安全最佳實務

MCP 實作繼承並強化組織現有的安全體系，健全的基礎安全措施可顯著提升 AI 系統與 MCP 部署的整體安全。

### 核心安全基礎

#### **安全開發實踐**  
- **OWASP 遵循**：防護[OWASP 十大漏洞](https://owasp.org/www-project-top-ten/)網站應用安全風險  
- **AI 專用保護**：實施[LLM 專用 OWASP 十大](https://genai.owasp.org/download/43299/?tmstv=1731900559)控管  
- **安全機密管理**：使用專用機密庫管理令牌、API 金鑰及敏感組態資料  
- **端對端加密**：應用元件與資料流全程安全通訊  
- **輸入驗證**：嚴格驗證所有使用者輸入、API 參數與資料來源  

#### **基礎設施硬化**  
- **多因素認證**：所有管理及服務帳號必須啟用 MFA  
- **補丁管理**：自動及即時修補作業系統、框架與依賴性  
- **身分提供者整合**：透過企業身分提供者（Microsoft Entra ID、Active Directory）集中管理身分  
- **網路分段**：MCP 元件的邏輯隔離限制橫向擴散  
- **最小權限原則**：系統元件與帳號皆僅授予必要權限  

#### **安全監控與偵測**  
- **完整日誌記錄**：包含 AI 應用活動及 MCP 客戶端與伺服器互動的詳細日誌  
- **SIEM 整合**：集中安全事件資訊管理以監控異常  
- **行為分析**：以 AI 驅動監控偵測系統與使用者異常行為  
- **威脅情報**：結合外部威脅情報與入侵指標（IOC）  
- **事件響應**：明確定義安全事件偵測、響應與復原程序  

#### **零信任架構**  
- **永不信任，持續驗證**：持續驗證用戶、裝置及網路連線  
- **微分段**：細緻網路控管以隔離單一工作負載與服務  
- **身份導向安全**：依據驗證身份而非網路位置制定安全政策  
- **持續風險評估**：根據當前上下文與行為動態評估安全態勢  
- **條件式存取**：依風險、地點與裝置信任彈性控管存取權限  

### 企業整合模式

#### **微軟安全生態系統整合**  
- **Microsoft Defender for Cloud**：全面雲端安全態勢管理  
- **Azure Sentinel**：用於 AI 工作負載保護的雲原生 SIEM 與 SOAR  
- **Microsoft Entra ID**：企業身分與存取管理，含條件式存取政策  
- **Azure Key Vault**：支援硬體安全模組（HSM）的集中機密管理  
- **Microsoft Purview**：AI 資料來源與工作流程的資料治理與合規性  

#### **合規與治理**  
- **法規對齊**：確保 MCP 實作符合特定產業合規要求（GDPR、HIPAA、SOC 2）  
- **資料分類**：妥善分類及處理 AI 系統處理的敏感資料  
- **稽核軌跡**：完整登錄以滿足法規需求及鑑識調查  
- **隱私控管**：依隱私設計原則構建 AI 系統架構  
- **變更管理**：AI 系統修改須經安全審核的正式流程  

這些基礎實務奠定強健的安全基線，提升 MCP 專屬安全控管的效能，並為 AI 驅動應用提供全面保護。
## 重要安全要點

- **分層安全方法**：結合基礎安全實務（安全程式碼撰寫、最小權限、供應鏈驗證、持續監控）與 AI 專用控制，達成全面防護

- **AI 專屬威脅環境**：MCP 系統面對獨特風險，包括提示注入、工具中毒、會話劫持、混淆代理問題、令牌直通漏洞與過度權限，需特殊緩解措施

- **認證與授權優化**：使用外部身份提供者（Microsoft Entra ID）實現強健認證，執行適當的令牌驗證，且絕不接受未明確核發給您的 MCP 伺服器的令牌

- **AI 攻擊防護**：部署 Microsoft Prompt Shields 與 Azure Content Safety 抵禦間接提示注入與工具中毒攻擊，同時驗證工具元資料並監控動態變更

- **會話與傳輸安全**：使用密碼學安全且非決定性的會話 ID 並綁定使用者身份，實施正確的會話生命週期管理，切勿用會話做為認證手段

- **OAuth 安全最佳實踐**：透過顯式用戶同意防止混淆代理攻擊，動態註冊用戶端使用完全符合 OAuth 2.1 並含 PKCE，嚴格驗證重定向 URI

- **令牌安全原則**：避免令牌直通反模式，驗證令牌受眾聲明，實施短命令牌與安全輪替，並維持清晰的信任邊界

- **全面供應鏈安全**：對所有 AI 生態系元件（模型、嵌入式、上下文提供者、外部 API）採取與傳統軟體依賴相同的安全嚴謹性

- **持續演進**：緊跟 MCP 規範快速發展，參與安全社群標準制定，隨著協定成熟保持自適應安全態勢

- **微軟安全整合**：善用微軟完整安全生態系（Prompt Shields、Azure Content Safety、GitHub 高級安全、Entra ID）強化 MCP 部署防護

## 綜合資源

### **官方 MCP 安全文件**
- [MCP 規範 (現行版本：2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳實務](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub 儲存庫](https://github.com/modelcontextprotocol)

### **OWASP MCP 安全資源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 完整的 OWASP MCP 十大安全風險及 Azure 實作指導
- [OWASP MCP 十大](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全風險
- [MCP 安全高峰研討會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure 上 MCP 的實作安全訓練

### **安全標準與最佳實務**
- [OAuth 2.0 安全最佳實務 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP 十大網路應用安全](https://owasp.org/www-project-top-ten/)
- [大型語言模型 OWASP 十大](https://genai.owasp.org/download/43299/?tmstv=1731900559)
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
- [GitHub 高級安全](https://github.com/security/advanced-security)

### **實作指南與教學**
- [Azure API 管理作為 MCP 認證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID 與 MCP 伺服器認證](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [安全令牌儲存與加密 (影片)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps 與供應鏈安全**
- [Azure DevOps 安全](https://azure.microsoft.com/products/devops)
- [Azure Repos 安全](https://azure.microsoft.com/products/devops/repos/)
- [微軟供應鏈安全之路](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **其他安全文件**

欲獲取綜合安全指南，請參考本節中的專門文件：

- **[MCP 安全最佳實務 2025](./mcp-security-best-practices-2025.md)** - MCP 實作的完整安全最佳實務
- **[Azure Content Safety 實作](./azure-content-safety-implementation.md)** - Azure Content Safety 整合的實際範例  
- **[MCP 安全控制 2025](./mcp-security-controls-2025.md)** - MCP 部署最新安全控制與技術
- **[MCP 最佳實務速查](./mcp-best-practices.md)** - MCP 安全要點的快速參考指南

### **實作安全訓練**

- **[MCP 安全高峰研討會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/)** - 針對 Azure 上 MCP 伺服器進行全面的分級手把手訓練，從基礎營地到高峰
- **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)** - OWASP MCP 十大風險的參考架構與實作指導

---

## 後續步驟

下一章： [第 3 章：快速入門](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件係使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，機器翻譯可能包含錯誤或不準確之處。原始語言文件應視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們不對因使用本翻譯所產生的任何誤解或誤用負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->