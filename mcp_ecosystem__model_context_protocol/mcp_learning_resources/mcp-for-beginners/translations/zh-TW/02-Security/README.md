# MCP 安全性：AI 系統的全面保護

[![MCP Security Best Practices](../../../translated_images/zh-TW/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(點擊上圖觀看本課程影片)_

安全性是 AI 系統設計的基礎，因此我們將其列為第二章節的重點。這與微軟來自[安全未來計劃](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/)的<strong>Secure by Design（安全即設計）</strong>原則一致。

模型上下文協議 (MCP) 為 AI 驅動的應用程式帶來強大的新功能，同時也帶來了超出傳統軟體風險範疇的獨特安全挑戰。MCP 系統面對既有的安全問題（安全程式編寫、最小權限、供應鏈安全）以及新興的 AI 專屬威脅，包括提示注入、工具中毒、會話劫持、混淆代理攻擊、令牌傳遞漏洞及動態能力修改。

本課程探討 MCP 實作中最關鍵的安全風險——涵蓋認證、授權、過度權限、間接提示注入、會話安全、混淆代理問題、令牌管理和供應鏈脆弱點。您將學習減輕這些風險的可執行控制措施和最佳實踐，並運用微軟解決方案如 Prompt Shields、Azure 內容安全和 GitHub 進階安全，強化您的 MCP 部署。

## 學習目標

完成本課程後，您將能夠：

- **識別 MCP 專屬威脅**：認識 MCP 系統中的獨特安全風險，包括提示注入、工具中毒、過度權限、會話劫持、混淆代理問題、令牌傳遞漏洞和供應鏈風險
- <strong>應用安全控制</strong>：實施有效的緩解措施，包括強健的認證、最小授權存取、安全令牌管理、會話安全控制和供應鏈驗證
- <strong>運用微軟安全方案</strong>：了解並部署微軟 Prompt Shields、Azure 內容安全及 GitHub 進階安全以保護 MCP 工作負載
- <strong>驗證工具安全性</strong>：認識工具元資料驗證的重要性、監控動態變更及防禦間接提示注入攻擊
- <strong>整合最佳實踐</strong>：結合既有的安全基礎（安全程式編寫、伺服器硬化、零信任）與 MCP 專屬控制，實現全面防護

# MCP 安全架構與控制

現代 MCP 實作需採用分層安全方法，既涵蓋傳統軟體安全，又面對 AI 專屬威脅。快速演進的 MCP 規範持續成熟其安全控制，促進與企業安全架構及既有最佳實踐的更佳整合。

來自[微軟數位防禦報告](https://aka.ms/mddr)的研究顯示，**98% 的已報告資安違規可透過強健的安全衛生習慣加以防止**。最有效的保護策略將基礎安全措施與 MCP 專屬控制結合——經證實的基準安全措施仍是降低整體安全風險的關鍵。

## 當前安全現況

> **注意：** 本資訊反映 MCP 安全標準，截至 **2026 年 2 月 5 日**，符合 **MCP 規範 2025-11-25**。MCP 協議持續快速演進，未來實作可能引入新認證模式及強化控制措施。請始終參考最新的 [MCP 規範](https://spec.modelcontextprotocol.io/)、[MCP GitHub 倉庫](https://github.com/modelcontextprotocol) 和 [安全最佳實踐文件](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) 以獲取最新指引。

## 🏔️ MCP 安全高峰工作坊（Sherpa）

若想獲得<strong>實務安全訓練</strong>，我們強烈推薦 **MCP 安全高峰工作坊**（Sherpa）——一趟引導式探險，帶您在 Microsoft Azure 中保護 MCP 伺服器。

### 工作坊概述

[MCP 安全高峰工作坊](https://azure-samples.github.io/sherpa/) 透過經典「易受攻擊 → 利用漏洞 → 修復 → 驗證」方法提供實務、可執行的安全訓練。您將：

- <strong>從破壞中學習</strong>：親身體驗漏洞，透過利用有意設計為不安全的伺服器
- **利用 Azure 原生安全性**：使用 Azure Entra ID、Key Vault、API 管理和 AI 內容安全
- <strong>採用縱深防禦</strong>：逐步搭建多層安全防護
- **套用 OWASP 標準**：所有技巧皆對應 [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)
- <strong>取得生產程式碼</strong>：獲得可運作且經測試的實作範例

### 探險路線

| 營地 | 重點 | 涵蓋 OWASP 風險 |
|------|-------|-----------------|
| <strong>基地營</strong> | MCP 基礎與認證漏洞 | MCP01, MCP07 |
| **營地 1：身份認證** | OAuth 2.1、Azure 托管身份、Key Vault | MCP01, MCP02, MCP07 |
| **營地 2：閘道** | API 管理、私用端點、治理 | MCP02, MCP06, MCP07, MCP09 |
| **營地 3：輸出輸入安全** | 提示注入、PII 保護、內容安全 | MCP03, MCP05, MCP06, MCP10 |
| **營地 4：監控** | 日誌分析、儀表板、威脅偵測 | MCP04, MCP08 |
| <strong>高峰營</strong> | 紅隊 / 藍隊綜合測試 | 全部 |

<strong>開始體驗</strong>：[https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP 十大安全風險

[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) 詳細說明 MCP 實作中十大最關鍵的安全風險：

| 風險 | 描述 | Azure 緩解措施 |
|------|-------|---------------|
| **MCP01** | 令牌管理不善及機密洩漏 | Azure Key Vault、托管身份 |
| **MCP02** | 範圍膨脹導致的權限升級 | RBAC、條件式存取 |
| **MCP03** | 工具中毒 | 工具驗證與完整性驗證 |
| **MCP04** | 軟體供應鏈攻擊及依賴性竄改 | GitHub 進階安全、相依性掃描 |
| **MCP05** | 指令注入與執行 | 輸入驗證、沙箱隔離 |
| **MCP06** | 意圖流程顛覆 | Azure AI 內容安全、Prompt Shields |
| **MCP07** | 認證與授權不足 | Azure Entra ID、OAuth 2.1 搭配 PKCE |
| **MCP08** | 缺乏稽核與遙測 | Azure 監控、應用程式洞察 |
| **MCP09** | 影子 MCP 伺服器 | API 中心治理、網路隔離 |
| **MCP10** | 上下文注入與過度共享 | 資料分級、最小曝露 |

### MCP 認證的演變

MCP 規範在認證與授權方法上經歷顯著變革：

- <strong>原始做法</strong>：早期規範要求開發者自行實作自訂認證伺服器，MCP 伺服器作為 OAuth 2.0 授權伺服器直接管理使用者認證
- **現行標準（2025-11-25）**：更新規範允許 MCP 伺服器委派認證給外部身分提供者（如 Microsoft Entra ID），強化安全並降低實作複雜度
- <strong>傳輸層安全性</strong>：針對本地連線（STDIO）與遠端（可串流 HTTP）連線，增強安全傳輸與認證模式支援

## 認證與授權安全

### 目前安全挑戰

現代 MCP 實作面臨多項認證與授權挑戰：

### 風險與威脅向量

- <strong>授權邏輯配置錯誤</strong>：MCP 伺服器中授權實作瑕疵可能暴露敏感資料或錯誤地授予存取權
- **OAuth 令牌外洩**：本地 MCP 伺服器令牌竊取使攻擊者能冒充伺服器存取下游服務
- <strong>令牌傳遞漏洞</strong>：不當處理令牌導致繞過安全控制與責任追蹤缺失
- <strong>過度權限</strong>：MCP 伺服器權限過高，違反最小權限原則，擴大攻擊面

#### 令牌傳遞：重大反模式

**當前 MCP 授權規範明確禁止令牌傳遞**，原因在於其嚴重安全風險：

##### 安全控制繞過
- MCP 伺服器與下游 API 實施關鍵安全控制（速率限制、請求驗證、流量監控），依賴正確的令牌驗證
- 用戶端直接持令牌存取 API 會繞過這些防護，破壞安全架構

##### 責任與稽核挑戰  
- MCP 伺服器無法分辨使用上游簽發令牌的用戶端，造成審計紀錄混亂
- 下游資源伺服器的日誌顯示請求來源錯誤，非實際 MCP 伺服器中介者
- 事件調查與合規審查難度大幅提升

##### 資料外洩風險
- 未驗證令牌宣告使惡意持有令牌者能利用 MCP 伺服器作為資料外洩代理
- 信任邊界遭破壞，產生未授權存取途徑，繞過預期安全控制

##### 多服務攻擊向量
- 被多系統接受的被竄改令牌使攻擊者可在相關系統中橫向移動
- 服務間信任假設失效，因無法驗證令牌來源

### 安全控制與緩解措拖

**關鍵安全要求：**

> <strong>強制</strong>：MCP 伺服器<strong>絕不可</strong>接受非明確簽發給此 MCP 伺服器的令牌

#### 認證與授權控制

- <strong>嚴格授權審查</strong>：全面稽核 MCP 伺服器授權邏輯，確保敏感資源僅可由授權用戶端存取
  - <strong>實作指引</strong>：[使用 Azure API 管理作為 MCP 伺服器的認證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - <strong>身分整合</strong>：[使用 Microsoft Entra ID 進行 MCP 伺服器認證](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- <strong>安全令牌管理</strong>：依據[微軟令牌驗證及生命週期最佳實踐](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)實施
  - 驗證令牌受眾宣告與 MCP 伺服器身份匹配
  - 實作適當的令牌輪替與到期政策
  - 防止令牌重放攻擊與未經授權使用

- <strong>受保護令牌存儲</strong>：令牌存儲必須採行靜態與傳輸加密
  - <strong>最佳實踐</strong>：[安全令牌存儲與加密指導](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### 存取控制實作

- <strong>最小權限原則</strong>：僅授予 MCP 伺服器達成功能所需的最低權限
  - 定期檢視並更新權限以防止權限膨脹
  - <strong>微軟文件</strong>：[安全的最小權限存取](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **角色基礎訪問控制 (RBAC)**：實施細緻的角色分配
  - 角色範圍限縮至特定資源與動作
  - 避免擴大攻擊面的廣泛或不必要權限

- <strong>持續權限監控</strong>：執行持續存取稽核與監控
  - 監控權限使用模式異常
  - 迅速修正過度或未使用權限

## AI 專屬安全威脅

### 提示注入與工具操控攻擊

現代 MCP 實作面臨複雜的 AI 專屬攻擊向量，傳統安全措施無法全面防範：

#### **間接提示注入（跨域提示注入）**

<strong>間接提示注入</strong>是 MCP 支援 AI 系統中最嚴重的漏洞之一。攻擊者在外部內容中植入惡意指令——文件、網頁、電子郵件或資料來源，AI 系統接著將其當作合法命令處理。

**攻擊場景：**
- <strong>文件基礎注入</strong>：惡意指令隱藏於被處理文件中，引發非預期 AI 行為
- <strong>網頁內容利用</strong>：遭竄改的網頁蘊含嵌入式提示，當被爬取時操控 AI 動作
- <strong>電子郵件攻擊</strong>：郵件中惡意提示使 AI 助理洩漏資訊或執行未授權動作
- <strong>資料來源污染</strong>：被破壞的資料庫或 API 供應帶毒內容予 AI 系統

<strong>實際影響</strong>：此類攻擊可能導致資料外洩、隱私違規、有害內容生成及使用者交互操控。詳細分析請參見 [MCP 中的提示注入（Simon Willison）](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)。

![Prompt Injection Attack Diagram](../../../translated_images/zh-TW/prompt-injection.ed9fbfde297ca877.webp)

#### <strong>工具中毒攻擊</strong>

<strong>工具中毒</strong>針對 MCP 工具定義的元資料發起，利用 LLM 對工具描述和參數的解讀，影響執行判斷。

**攻擊機制：**
- <strong>元資料操控</strong>：攻擊者將惡意指令植入工具描述、參數定義或使用範例
- <strong>隱形指令</strong>：工具元資料中隱藏的提示，被 AI 模型處理但對使用者不可見
- **動態工具修改（「拉地毯」）**：用戶核准的工具遭後續修改，暗中執行惡意行動
- <strong>參數注入</strong>：惡意內容藏匿在工具參數模式中，影響模型行為

<strong>託管伺服器風險</strong>：遠端 MCP 伺服器的工具定義可於用戶首次批准後更新，使原本安全工具變成惡意。詳盡分析請參考 [工具中毒攻擊（Invariant Labs）](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)。

![Tool Injection Attack Diagram](../../../translated_images/zh-TW/tool-injection.3b0b4a6b24de6bef.webp)

#### **其他 AI 攻擊向量**

- **跨域提示注入 (XPIA)**：利用多域內容的複雜攻擊，繞過安全控制
- <strong>動態能力修改</strong>：實時更改工具能力，逃避初始安全評估  
- <strong>上下文視窗中毒</strong>：操縱大型上下文視窗以隱藏惡意指令的攻擊  
- <strong>模型混淆攻擊</strong>：利用模型限制製造不可預測或不安全行為  

### AI 安全風險影響

**高影響後果：**  
- <strong>資料外洩</strong>：未經授權存取和竊取企業或個人敏感資料  
- <strong>隱私洩露</strong>：暴露個人可識別資訊（PII）及機密商業資料  
- <strong>系統操控</strong>：對關鍵系統和工作流程的非預期修改  
- <strong>憑證竊取</strong>：身份驗證令牌和服務憑證遭到破壞  
- <strong>橫向移動</strong>：利用受損 AI 系統作為更大範圍網路攻擊的跳板  

### Microsoft AI 安全解決方案

#### **AI Prompt Shields：針對注入攻擊的高階防護**

Microsoft **AI Prompt Shields** 提供多層安全機制，針對直接及間接的提示注入攻擊提供全方位防禦：  

##### **核心防護機制：**

1. <strong>先進的偵測與過濾</strong>  
   - 利用機器學習算法及自然語言處理技術偵測外部內容中的惡意指令  
   - 即時分析文件、網頁、電子郵件及資料來源中的內嵌威脅  
   - 建立合法與惡意提示模式的語境理解  

2. <strong>聚焦技術</strong>  
   - 區分快速系統指令與可能受損的外部輸入  
   - 文字轉換法提升模型相關性，並隔離惡意內容  
   - 幫助 AI 系統維護正確指令層級並忽略注入命令  

3. <strong>分隔符與資料標記系統</strong>  
   - 明確界定可信系統訊息與外部輸入文字的邊界  
   - 特殊標記突顯可信與不可信資料來源分界  
   - 清晰分離避免指令混淆與未授權命令執行  

4. <strong>持續威脅情報</strong>  
   - Microsoft 持續監控新興攻擊模式並更新防禦  
   - 主動搜尋新注入技術與攻擊向量  
   - 定期更新安全模型以應對演變威脅  

5. **Azure 內容安全整合**  
   - 作為完整 Azure AI 內容安全套件一部分  
   - 額外偵測越獄嘗試、有害內容與安全政策違規  
   - 統一 AI 應用元件安全控管  

<strong>實作資源</strong>：[Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  

![Microsoft Prompt Shields Protection](../../../translated_images/zh-TW/prompt-shield.ff5b95be76e9c78c.webp)  


## 進階 MCP 安全威脅

### 會話劫持漏洞

<strong>會話劫持</strong>是狀態式 MCP 實作中的關鍵攻擊向量，攻擊方取得並濫用合法的會話識別碼，以冒充客戶端並執行未經授權的操作。

#### <strong>攻擊情境與風險</strong>

- <strong>會話劫持提示注入</strong>：攻擊者利用被盜會話 ID 注入惡意事件至共享會話狀態的伺服器，可能觸發有害操作或存取敏感資料  
- <strong>直接冒充</strong>：被盜會話 ID 使攻擊者繞過認證直接呼叫 MCP 伺服器，作為合法用戶使用  
- <strong>受損可續流</strong>：攻擊者可提前終止請求，導致合法用戶續接時遇到潛在惡意內容  

#### <strong>會話管理安全控管</strong>

**關鍵要求：**  
- <strong>授權驗證</strong>：MCP 伺服器實作授權時<strong>必須</strong>驗證所有進入請求，且<strong>不得</strong>依賴會話作為認證手段  
- <strong>安全會話生成</strong>：使用密碼學安全的非決定性會話 ID，採用安全隨機數產生器生成  
- <strong>用戶專屬綁定</strong>：將會話 ID 與用戶特定資訊綁定，使用 `<user_id>:<session_id>` 格式防止跨用戶會話濫用  
- <strong>會話生命週期管理</strong>：實作適當的過期、輪換及失效機制以限制漏洞時間窗  
- <strong>傳輸安全</strong>：所有通訊必須使用 HTTPS 防止會話 ID 被竊取  

### 混淆代理問題

<strong>混淆代理問題</strong>發生於 MCP 伺服器作為客戶端與第三方服務間的認證代理，靜態客戶端 ID 的利用造成授權繞過風險。

#### <strong>攻擊機制與風險</strong>

- **基於 Cookie 的同意繞過**：先前用戶認證產生同意 Cookie，攻擊者利用惡意授權請求及特殊重定向 URI 利用該 Cookie  
- <strong>授權碼竊取</strong>：存在同意 Cookie 時，授權伺服器可能跳過同意畫面，將授權碼重定向至攻擊者控制的端點  
- **未授權 API 存取**：被竊授權碼用於交換令牌及冒用用戶身份，未經明確批准  

#### <strong>緩解策略</strong>

**必須控管：**  
- <strong>明確同意要求</strong>：使用靜態客戶端 ID 的 MCP 代理伺服器<strong>必須</strong>對每個動態註冊的客戶端取得用戶同意  
- **OAuth 2.1 安全實作**：遵循最新 OAuth 安全最佳實踐，包括所有授權請求使用 PKCE（Proof Key for Code Exchange）  
- <strong>嚴格客戶端驗證</strong>：嚴格驗證重定向 URI 與客戶端識別碼以防止濫用  

### 令牌直通漏洞  

<strong>令牌直通</strong>是一種明確的反模式，指 MCP 伺服器未正確驗證客戶端令牌即接受並轉發至下游 API，違反 MCP 授權規範。

#### <strong>安全涵義</strong>

- <strong>控管繞過</strong>：客戶端令牌直接用於 API，繞過重要的速率限制、驗證與監控控管  
- <strong>稽核記錄破壞</strong>：上游發行的令牌無法識別具體客戶端，阻礙安全事件調查  
- <strong>代理式資料外洩</strong>：未驗證的令牌允許駭客使用伺服器作為非授權資料存取代理  
- <strong>信任邊界違反</strong>：無法驗證令牌來源可能破壞下游服務的信任假設  
- <strong>多服務攻擊擴散</strong>：受損令牌在多服務間被接受，促進橫向移動  

#### <strong>必要安全控管</strong>

**無法妥協的要求：**  
- <strong>令牌驗證</strong>：MCP 伺服器<strong>不得</strong>接受非明確發行給 MCP 伺服器的令牌  
- <strong>受眾驗證</strong>：必須驗證令牌的受眾聲明與 MCP 伺服器身份匹配  
- <strong>正確令牌週期管理</strong>：實作短壽命存取令牌及安全輪換機制  


## AI 系統供應鏈安全

供應鏈安全已超越傳統軟體相依性，涵蓋整個 AI 生態系統。現代 MCP 實作必須嚴格驗證與監控所有 AI 相關元件，每個元件皆可能引入潛在弱點影響系統完整性。

### 擴展的 AI 供應鏈元件

**傳統軟體相依項：**  
- 開源函式庫與框架  
- 容器映像與基底系統  
- 開發工具及建置流程  
- 基礎建設元件與服務  

**AI 專屬供應鏈元素：**  
- <strong>基礎模型</strong>：來自多家供應商的預訓練模型，需驗證來源  
- <strong>嵌入服務</strong>：外部向量化與語義搜尋服務  
- <strong>上下文提供者</strong>：資料來源、知識庫與文件庫  
- **第三方 API**：外部 AI 服務、機器學習流程與資料處理端點  
- <strong>模型工件</strong>：權重、設定與微調模型變體  
- <strong>訓練資料來源</strong>：用於模型訓練與微調的資料集  

### 全面供應鏈安全策略

#### <strong>元件驗證與信任</strong>  
- <strong>來源驗證</strong>：在整合前驗證所有 AI 元件的出處、授權及完整性  
- <strong>安全評估</strong>：對模型、資料來源與 AI 服務進行漏洞掃描與安全評審  
- <strong>聲譽分析</strong>：評估 AI 服務供應商的安全紀錄與管理慣例  
- <strong>合規驗證</strong>：確保所有元件符合組織安全與法遵要求  

#### <strong>安全部署流程</strong>  
- **自動化 CI/CD 安全**：在自動化部署流程中整合安全掃描  
- <strong>工件完整性</strong>：對部署工件（程式碼、模型、設定）實施密碼驗證  
- <strong>分階段部署</strong>：採用漸進部署策略並於每階段進行安全驗證  
- <strong>可信工件庫</strong>：僅從經驗證且安全的工件儲存庫部署  

#### <strong>持續監控與回應</strong>  
- <strong>相依掃描</strong>：持續監控所有軟體與 AI 元件相依項的漏洞  
- <strong>模型監控</strong>：持續評估模型行為、性能漂移與安全異常  
- <strong>服務健康追蹤</strong>：監控外部 AI 服務的可用性、安全事件與政策變更  
- <strong>威脅情報整合</strong>：納入專屬 AI 與機器學習安全風險的威脅情報  

#### <strong>存取控管與最小權限</strong>  
- <strong>元件層級權限</strong>：根據業務需求限制對模型、資料及服務的存取  
- <strong>服務帳戶管理</strong>：實作具有最小必要權限的專用服務帳戶  
- <strong>網路分段</strong>：隔離 AI 元件並限制服務間的網路存取  
- **API 閘道控管**：使用集中式 API 閘道控管及監控對外部 AI 服務的存取  

#### <strong>事件回應與復原</strong>  
- <strong>快速回應流程</strong>：建立補丁或替換受損 AI 元件的流程  
- <strong>憑證輪換</strong>：自動化系統輪換密鑰、API 金鑰與服務憑證  
- <strong>回滾能力</strong>：快速恢復至先前安全版本的 AI 元件  
- <strong>供應鏈違規復原</strong>：應對上游 AI 服務受損的專門程序  

### Microsoft 安全工具與整合

**GitHub Advanced Security** 提供全面供應鏈保護，包括：  
- <strong>秘密掃描</strong>：自動偵測程式庫中的憑證、API 金鑰與令牌  
- <strong>相依掃描</strong>：開源相依項與函式庫漏洞評估  
- **CodeQL 分析**：靜態程式碼分析以偵測安全漏洞及程式撰寫問題  
- <strong>供應鏈洞察</strong>：相依項健康與安全狀態的可視化  

**Azure DevOps 與 Azure Repos 整合：**  
- 在 Microsoft 開發平台中無縫整合安全掃描  
- Azure Pipelines 中針對 AI 工作負載的自動安全檢查  
- 安全 AI 元件部署的政策執行  

**Microsoft 內部作法：**  
Microsoft 在所有產品中實施廣泛的供應鏈安全作法。瞭解更多經驗分享請參考 [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)。

## 基礎安全最佳實踐

MCP 實作繼承並擴充組織現有的安全架構。強化基礎安全作法能顯著提升 AI 系統與 MCP 部署的整體安全性。

### 核心安全基礎

#### <strong>安全開發作法</strong>  
- **OWASP 相容**：防護 [OWASP Top 10](https://owasp.org/www-project-top-ten/) 網頁應用漏洞  
- **AI 專屬防護**：實作 [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) 控管  
- <strong>安全秘密管理</strong>：使用專用保管庫保存令牌、API 金鑰及敏感設定資料  
- <strong>端到端加密</strong>：跨應用元件與資料流實作安全通訊  
- <strong>輸入驗證</strong>：嚴格驗證所有用戶輸入、API 參數及資料來源  

#### <strong>基礎建設強化</strong>  
- <strong>多因素驗證</strong>：所有管理及服務帳戶強制啟用 MFA  
- <strong>補丁管理</strong>：作業系統、框架與相依項的自動且即時補丁更新  
- <strong>身份提供者整合</strong>：企業身份提供者（Microsoft Entra ID、Active Directory）的集中身份管理  
- <strong>網路分段</strong>：邏輯隔離 MCP 元件以限制橫向移動可能  
- <strong>最小權限原則</strong>：所有系統元件與帳戶只授予必要的最小權限  

#### <strong>安全監控與偵測</strong>  
- <strong>完整日誌記錄</strong>：詳細記錄 AI 應用活動，包括 MCP 用戶端-伺服器互動  
- **SIEM 整合**：中心化安全資訊與事件管理以偵測異常  
- <strong>行為分析</strong>：AI 支援監控系統與用戶的異常行為模式  
- <strong>威脅情報</strong>：整合外部威脅情資與妥協指標（IOC）  
- <strong>事件回應</strong>：明確的安全事件偵測、應變與復原程序  

#### <strong>零信任架構</strong>  
- **永不信任，持續驗證**：持續驗證用戶、裝置及網路連線  
- <strong>微分段</strong>：細粒度網路控管以隔離個別工作負載及服務  
- <strong>身份導向安全</strong>：以驗證身份為基礎的安全政策代替網路位置  
- <strong>持續風險評估</strong>：根據當前上下文與行為動態評估安全態勢  
- <strong>條件存取</strong>：根據風險因素、位置與裝置信任調整存取控管  

### 企業整合框架

#### **Microsoft 安全生態系統整合**  
- **Microsoft Defender for Cloud**：全面雲端安全態勢管理  
- **Azure Sentinel**：原生雲端 SIEM 和 SOAR 能力保護 AI 工作負載  
- **Microsoft Entra ID**：企業身份與存取管理，具條件存取策略  
- **Azure Key Vault**：具硬體安全模組（HSM）加持的集中化秘密管理  
- **Microsoft Purview**：AI 資料來源與工作流程的資料治理與合規  

#### <strong>合規與治理</strong>  
- <strong>法規遵循</strong>：確保 MCP 實作符合產業特定合規要求（GDPR、HIPAA、SOC 2）  
- <strong>資料分類</strong>：適當分類與處理 AI 系統所處理的敏感資料  
- <strong>稽核軌跡</strong>：完整記錄以符合法規需求與鑑識調查  
- <strong>隱私控管</strong>：在 AI 系統架構中實施隱私設計原則  
- <strong>變更管理</strong>：確立 AI 系統修改的安全審查流程  

這些基礎實踐建立堅實的安全底層，提升 MCP 專屬安全控管效能，並為 AI 驅動應用提供全面防護。

## 主要安全重點摘要
- <strong>分層安全方法</strong>：結合基礎安全實務（安全程式碼撰寫、最小權限、供應鏈驗證、持續監控）與 AI 專屬控管，實現完整防護

- **AI 專屬威脅環境**：MCP 系統面臨獨特風險，包括提示注入、工具中毒、會話劫持、混淆代理問題、令牌轉發漏洞以及過度權限，需採取專門緩解措施

- <strong>認證與授權卓越實踐</strong>：使用外部身份提供者（Microsoft Entra ID）實施強健認證，執行正確的令牌驗證，並絕不接受未明確簽發給您的 MCP 伺服器的令牌

- **AI 攻擊防範**：部署 Microsoft Prompt Shields 及 Azure Content Safety 防禦間接提示注入及工具中毒攻擊，同時驗證工具元資料並監控動態變更

- <strong>會話與傳輸安全</strong>：使用密碼學安全、非決定性的會話 ID 並綁定使用者身份，實施正確的會話生命週期管理，並絕不可使用會話作為認證

- **OAuth 安全最佳實務**：透過明確使用者同意防止混淆代理攻擊，對動態註冊客戶端實施 OAuth 2.1 與 PKCE，並嚴格驗證重定向 URI

- <strong>令牌安全原則</strong>：避免令牌轉發反模式，驗證令牌的受眾聲明，實施短期存活令牌並安全輪換，並維持明確信任邊界

- <strong>全面供應鏈安全</strong>：將所有 AI 生態系元件（模型、嵌入、上下文提供者、外部 API）視同傳統軟體依賴般嚴格安全對待

- <strong>持續演進</strong>：保持與快速演變的 MCP 規範同步，貢獻安全社群標準，並隨協定成熟調整安全策略

- **Microsoft 安全整合**：利用 Microsoft 全面安全生態系（Prompt Shields、Azure Content Safety、GitHub Advanced Security、Entra ID）加強 MCP 部署防護

## 全面資源

### **官方 MCP 安全文件**
- [MCP 規範 (最新版：2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳實踐](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub 倉庫](https://github.com/modelcontextprotocol)

### **OWASP MCP 安全資源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 完整的 OWASP MCP Top 10 並附 Azure 實作指引
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全風險
- [MCP 安全高峰研討會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure 上 MCP 的實務安全訓練

### <strong>安全標準與最佳實務</strong>
- [OAuth 2.0 安全最佳實務 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Web 應用安全十大風險](https://owasp.org/www-project-top-ten/)
- [大型語言模型的 OWASP Top 10](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft 數位防禦報告](https://aka.ms/mddr)

### **AI 安全研究與分析**
- [MCP 的提示注入 (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [工具中毒攻擊 (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP 安全研究簡報 (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft 安全解決方案**
- [Microsoft Prompt Shields 文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety 服務](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID 安全](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure 令牌管理最佳實務](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub 進階安全](https://github.com/security/advanced-security)

### <strong>實作指南與教學</strong>
- [Azure API Management 作為 MCP 認證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID 與 MCP 伺服器認證](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [安全令牌儲存與加密 (影片)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps 與供應鏈安全**
- [Azure DevOps 安全](https://azure.microsoft.com/products/devops)
- [Azure Repos 安全](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft 供應鏈安全歷程](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## <strong>其他安全文件</strong>

有關全面安全指導，請參考本節下列專門文件：

- **[MCP 安全最佳實踐 2025](./mcp-security-best-practices-2025.md)** - MCP 實作的完整安全最佳實踐
- **[Azure Content Safety 實作](./azure-content-safety-implementation.md)** - Azure Content Safety 整合的實務範例  
- **[MCP 安全控管 2025](./mcp-security-controls-2025.md)** - MCP 部署的最新安全控管與技術
- **[MCP 最佳實踐速查](./mcp-best-practices.md)** - MCP 重要安全實務速查指南
- **[BlueHat 2026：人工智慧未來安全深度防禦模式](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - 來自 Microsoft Security Response Center (MSRC) 的深度防禦模式

### <strong>實務安全訓練</strong>

- **[MCP 安全高峰研討會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/)** - 為 Azure 上 MCP 伺服器設計的完整實務工作坊，從基礎營到高峰營逐階訓練
- **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)** - 所有 OWASP MCP Top 10 風險的參考架構及實作指導

---

## 下一步

下一章節：[第3章：入門指南](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->