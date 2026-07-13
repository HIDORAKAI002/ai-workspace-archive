# MCP 安全性：AI 系統的全面保護

[![MCP 安全性最佳實踐](../../../translated_images/zh-MO/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(點擊上方圖片觀看本課程影片)_

安全性是 AI 系統設計的基礎，因此我們將其列為第二部分重點。這與微軟在[安全未來倡議](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/)中提出的 **Secure by Design** 原則相符。

模型上下文協議（MCP）為 AI 驅動的應用帶來強大的新功能，同時引入超越傳統軟體風險的獨特安全挑戰。MCP 系統面臨既有的安全問題（安全編碼、最低權限、供應鏈安全）和新的 AI 特有威脅，包括提示注入、工具中毒、會話劫持、代理混淆攻擊、令牌直通漏洞及動態能力修改。

本課程探討 MCP 實作中最關鍵的安全風險——涵蓋認證、授權、過度權限、間接提示注入、會話安全、代理混淆問題、令牌管理及供應鏈漏洞。您將學習可操作的控管措施和最佳實踐，以減輕這些風險，同時利用微軟解決方案如 Prompt Shields、Azure 內容安全及 GitHub 高級安全，強化 MCP 部署。

## 學習目標

本課程結束後，您將能：

- **識別 MCP 特有威脅**：認識 MCP 系統的獨特安全風險，包括提示注入、工具中毒、過度權限、會話劫持、代理混淆問題、令牌直通漏洞及供應鏈風險
- <strong>套用安全控管</strong>：實施有效減輕措施，包括強健的認證、最低權限存取、安全的令牌管理、會話安全控管及供應鏈驗證
- <strong>利用微軟安全解決方案</strong>：了解並部署微軟 Prompt Shields、Azure 內容安全及 GitHub 高級安全以保護 MCP 工作負載
- <strong>驗證工具安全</strong>：認識工具元資料驗證、動態變更監控及防止間接提示注入攻擊的重要性
- <strong>整合最佳實踐</strong>：結合既有的安全基礎（安全編碼、伺服器硬化、零信任）與 MCP 專屬控管，實現全面防護

# MCP 安全架構與控管

現代 MCP 實作需要分層安全方法，既涵蓋傳統軟體安全，也針對 AI 特有威脅。迅速演進的 MCP 規範持續完善其安全控管，促進與企業安全架構及既有最佳實踐的更好整合。

根據[微軟數位防禦報告](https://aka.ms/mddr)的研究顯示，**98% 被通報的資安事件可由強健的安全衛生措施防止**。最有效的保護策略結合基礎安全實務與 MCP 專屬控管——經證實的基線安全措施仍是降低整體風險的關鍵。

## 當前安全現況

> **注意：** 本資訊反映截至 **2026 年 2 月 5 日** 的 MCP 安全標準，符合 **MCP 規範 2025-11-25**。MCP 協議持續快速演進，未來實作可能引入新認證模式與強化控管。請參考最新的 [MCP 規範](https://spec.modelcontextprotocol.io/)、[MCP GitHub 倉庫](https://github.com/modelcontextprotocol) 及 [安全最佳實踐文件](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) 以獲取最新指引。

> **展望未來：** `2026-07-28` 發行候選版本將進一步強化授權——用戶端必須驗證授權回應中的 `iss` 參數（RFC 9207）、在動態用戶端註冊中宣告 OpenID Connect 的 `application_type`，並將註冊憑證綁定至發行授權伺服器。完整授權 SEP 列表請參閱 [MCP 變更：2026-07-28 發行候選版本](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## 🏔️ MCP 安全高峰工作坊（Sherpa）

若想參與 <strong>實作安全訓練</strong>，強烈推薦 **MCP 安全高峰工作坊**（Sherpa）——一場引導式的全面 MCP 伺服器在 Microsoft Azure 上安全訓練遠征。

### 工作坊概覽

[MCP 安全高峰工作坊](https://azure-samples.github.io/sherpa/) 透過經過驗證的「漏洞 → 利用 → 修復 → 驗證」方法，提供實務且可行的安全培訓。您將：

- <strong>學習打破安全</strong>：親身體驗漏洞，透過利用意圖不安全的伺服器學習
- **使用 Azure 原生安全功能**：結合 Azure Entra ID、Key Vault、API 管理與 AI 內容安全
- <strong>遵循深度防禦</strong>：逐步建立完善安全層次
- **應用 OWASP 標準**：每項技術均對應 [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)
- <strong>取得生產程式碼</strong>：獲得可用且經測試的完整實作範例

### 遠征路線

| 營地 | 重點 | 涵蓋 OWASP 風險 |
|------|-------|---------------------|
| <strong>基地營</strong> | MCP 基礎與認證漏洞 | MCP01, MCP07 |
| **營地 1：身份** | OAuth 2.1、Azure 管理身分、Key Vault | MCP01, MCP02, MCP07 |
| **營地 2：閘道** | API 管理、私有端點、治理 | MCP02, MCP06, MCP07, MCP09 |
| **營地 3：輸入/輸出安全** | 提示注入、個資保護、內容安全 | MCP03, MCP05, MCP06, MCP10 |
| **營地 4：監控** | 日誌分析、儀表板、威脅偵測 | MCP04, MCP08 |
| <strong>高峰會</strong> | 紅隊／藍隊整合測試 | 全部 |

<strong>開始參加</strong>：[https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP 十大安全風險

[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) 詳述 MCP 實作中十大最關鍵安全風險：

| 風險 | 描述 | Azure 減輕措施 |
|------|-------------|------------------|
| **MCP01** | 令牌管理不當及秘密洩漏 | Azure Key Vault、管理身分 |
| **MCP02** | 範圍擴張導致權限升級 | RBAC、有條件存取 |
| **MCP03** | 工具中毒 | 工具驗證、完整性檢查 |
| **MCP04** | 軟體供應鏈攻擊及依賴篡改 | GitHub 高級安全、依賴掃描 |
| **MCP05** | 命令注入與執行 | 輸入驗證、沙盒環境 |
| **MCP06** | 意圖流程顛覆 | Azure AI 內容安全、Prompt Shields |
| **MCP07** | 認證與授權不足 | Azure Entra ID、PKCE 的 OAuth 2.1 |
| **MCP08** | 審計及遙測缺失 | Azure 監控、應用程式洞察 |
| **MCP09** | 影子 MCP 伺服器 | API 中心治理、網路隔離 |
| **MCP10** | 上下文注入與過度揭露 | 資料分類、最小暴露 |

### MCP 認證的演進

MCP 規範在認證與授權上的方法已大幅演進：

- <strong>原始方法</strong>：早期規範要求開發者實作自訂認證伺服器，MCP 伺服器充當 OAuth 2.0 授權伺服器，直接管理用戶認證
- **現行標準（2025-11-25）**：新版規範允許 MCP 伺服器委派認證給外部身分提供者（例如 Microsoft Entra ID），提升安全態勢並減少實作複雜度
- <strong>傳輸層安全</strong>：加強本地（STDIO）與遠端（Streamable HTTP）連線的安全傳輸與適切認證模式

## 認證與授權安全性

### 當前安全挑戰

現代 MCP 實作面臨多項認證與授權挑戰：

### 風險與威脅管道

- <strong>授權邏輯錯誤配置</strong>：MCP 伺服器授權實作缺陷可能洩露敏感資料並誤用存取控管
- **OAuth 令牌被盜**：本地 MCP 伺服器令牌被竊，攻擊者可冒充伺服器訪問下游服務
- <strong>令牌直通漏洞</strong>：不當令牌處理導致安全控管繞過及責任缺失
- <strong>過度權限</strong>：MCP 伺服器擁有過高權限，違背最低權限原則，擴大攻擊面

#### 令牌直通：嚴重的反模式

由於嚴重的安全影響，目前 MCP 授權規範<strong>明確禁止</strong>令牌直通：

##### 規避安全控管
- MCP 伺服器與下游 API 實施依賴正確令牌驗證的關鍵控管（速率限制、請求驗證、流量監控）
- 用戶端直接對 API 使用令牌繞過這些基本保護，削弱安全架構

##### 責任與審計挑戰  
- MCP 伺服器無法區分使用上游發行令牌的用戶端，導致審計追蹤中斷
- 下游資源伺服器日誌顯示誤導性的請求來源，非實際 MCP 伺服器中介
- 事故調查與合規審核更加困難

##### 資料外洩風險
- 未驗證的令牌聲明允許惡意攻擊者利用被盜令牌，透過 MCP 伺服器作為代理進行資料外洩
- 信任邊界違規使未授權存取模式繞過既定的安全控管

##### 多服務攻擊管道
- 多項服務接受被盜令牌，助長攻擊者進行橫向移動
- 無法驗證令牌來源時可能違反服務間的信任假設

### 安全控管與減輕措施

**關鍵安全要求：**

> <strong>強制性</strong>：MCP 伺服器<strong>不得</strong>接受任何非明確發行給該 MCP 伺服器的令牌

#### 認證與授權控管

- <strong>嚴格授權審閱</strong>：全面稽核 MCP 伺服器授權邏輯，確保只有預期用戶與用戶端可存取敏感資源
  - <strong>實作指南</strong>：[使用 Azure API 管理作為 MCP 伺服器認證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - <strong>身分整合</strong>：[利用 Microsoft Entra ID 進行 MCP 伺服器認證](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- <strong>安全令牌管理</strong>：實施[微軟的令牌驗證與生命週期最佳實踐](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - 驗證令牌受眾聲明與 MCP 伺服器身分相符
  - 實施適當的令牌輪替與過期政策
  - 避免令牌重放攻擊與未授權使用

- <strong>受保護的令牌存儲</strong>：令牌存儲與傳輸皆加密保障安全
  - <strong>最佳實踐</strong>：[安全令牌存儲與加密指引](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### 存取控管實作

- <strong>最低權限原則</strong>：僅授予 MCP 伺服器完成功能所需最低權限
  - 定期檢視與調整權限，防止權限擴張
  - <strong>微軟文件</strong>：[安全的最低權限存取](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **基於角色的存取控管（RBAC）**：實現精細角色分配
  - 限制角色範圍於特定資源與操作
  - 避免過廣或不必要的權限以減少攻擊面

- <strong>持續權限監控</strong>：實施持續存取稽核與監控
  - 監測權限使用模式是否異常
  - 迅速移除過度或未使用的權限

## AI 特有安全威脅

### 提示注入與工具操縱攻擊

現代 MCP 實作面臨複雜的 AI 特有攻擊向量，傳統安全措施無法完全防範：

#### **間接提示注入（跨域提示注入）**

<strong>間接提示注入</strong> 是 MCP 啟用的 AI 系統中最嚴重的弱點之一。攻擊者在外部內容中嵌入惡意指令——文件、網頁、電子郵件或資料來源，AI 系統之後將其當作合法指令處理。

**攻擊場景：**
- <strong>基於文件的注入</strong>：惡意指令藏於處理的文件中，觸發 AI 執行非預期行為
- <strong>網頁內容濫用</strong>：被入侵網頁注入內嵌提示，爬取時操控 AI 行為
- <strong>電子郵件攻擊</strong>：電子郵件中的惡意提示使 AI 助手洩露資訊或執行未授權操作
- <strong>資料來源污染</strong>：被入侵的資料庫或 API 向 AI 系統提供污染內容

<strong>真實影響</strong>：這些攻擊可能導致資料外洩、隱私違規、有害內容生成與操控用戶互動。詳細分析請參閱 [MCP 中的提示注入（Simon Willison）](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)。

![提示注入攻擊圖示](../../../translated_images/zh-MO/prompt-injection.ed9fbfde297ca877.webp)

#### <strong>工具中毒攻擊</strong>

<strong>工具中毒</strong> 針對定義 MCP 工具的元資料，利用大型語言模型如何解讀工具描述與參數以做執行決策的特性。

**攻擊機制：**
- <strong>元資料操控</strong>：攻擊者注入惡意指令至工具描述、參數定義或使用範例中
- <strong>隱形指令</strong>：工具元資料中隱藏提示由 AI 模型處理但對人類使用者不可見
- **動態工具修改（「拉地毯」）**：用戶已批准的工具後續被修改執行惡意行為，使用者不知情
- <strong>參數注入</strong>：惡意內容植入工具參數結構，影響模型行為


<strong>託管伺服器風險</strong>：遠端 MCP 伺服器存在較高風險，因為工具定義可在用戶初次批准後更新，造成先前安全的工具變成惡意的情況。欲了解詳細分析，請參閱[工具中毒攻擊 (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)。

![工具注入攻擊圖](../../../translated_images/zh-MO/tool-injection.3b0b4a6b24de6bef.webp)

#### **其他 AI 攻擊向量**

- **跨領域提示注入 (XPIA)**：利用多領域內容繞過安全控件的複雜攻擊
- <strong>動態能力修改</strong>：實時更改工具能力以逃避初期安全評估
- <strong>上下文視窗中毒</strong>：操控大範圍上下文視窗以隱藏惡意指令的攻擊
- <strong>模型混淆攻擊</strong>：利用模型限制產生不可預測或不安全行為


### AI 安全風險影響

**高影響後果：**
- <strong>資料外洩</strong>：未經授權存取和竊取企業或個人敏感資料
- <strong>隱私洩漏</strong>：個人身份資訊 (PII) 及機密商業資料曝光  
- <strong>系統操控</strong>：對關鍵系統和工作流的非預期修改
- <strong>憑證竊取</strong>：認證令牌及服務憑證被妥協
- <strong>橫向移動</strong>：利用被攻陷的 AI 系統作為更廣泛網絡攻擊的樞紐

### 微軟 AI 安全解決方案

#### **AI 提示防護罩：針對注入攻擊的先進防護**

微軟 **AI 提示防護罩** 通過多層安全防護，提供對直接和間接提示注入攻擊的全面防禦：

##### **核心保護機制：**

1. <strong>先進偵測與過濾</strong>
   - 使用機器學習演算法和自然語言處理技術偵測外部內容中的惡意指令
   - 對文件、網頁、電子郵件和數據來源進行即時分析以發現嵌入威脅
   - 理解合法與惡意提示模式的語境區別

2. <strong>聚光燈技術</strong>  
   - 區分可信系統指令與潛在妥協外部輸入
   - 文字轉換方法增強模型相關性同時隔離惡意內容
   - 幫助 AI 系統維持正確的指令層級並忽略被注入的命令

3. <strong>分隔符與數據標記系統</strong>
   - 明確界定可信系統訊息與外部輸入文字的邊界
   - 特殊標記高亮顯示可信與不可信資料來源間的界限
   - 清晰分離避免指令混淆和未授權命令執行

4. <strong>持續威脅情報</strong>
   - 微軟持續監控新興攻擊模式並更新防禦措施
   - 主動進行新注入技術和攻擊向量的威脅狩獵
   - 定期更新安全模型以保持對演變威脅的有效防護

5. **Azure 內容安全整合**
   - 作為全面 Azure AI 內容安全套件的一部分
   - 針對越獄嘗試、有害內容及安全政策違規的額外偵測
   - 在 AI 應用組件間實現統一安全控管

<strong>實作資源</strong>：[微軟提示防護罩文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft 提示防護罩保護](../../../translated_images/zh-MO/prompt-shield.ff5b95be76e9c78c.webp)


## 先進 MCP 安全威脅

### 會話劫持漏洞

<strong>會話劫持</strong> 是狀態性 MCP 實作中一項重大攻擊向量，未授權方取得並濫用合法會話識別碼，冒充客戶端執行未授權行為。

#### <strong>攻擊情境與風險</strong>

- <strong>會話劫持提示注入</strong>：攻擊者憑盜取的會話 ID 向共享會話狀態的伺服器注入惡意事件，可能觸發有害行動或存取敏感資料
- <strong>直接冒充</strong>：盜取會話 ID 使攻擊者可直接進行繞過認證的 MCP 伺服器呼叫，當作合法用戶使用
- <strong>受損的可恢復串流</strong>：攻擊者提前終止請求，導致合法客戶端在恢復時接收可能帶有惡意內容的資料

#### <strong>會話管理的安全控管</strong>

**關鍵要求：**
- <strong>授權驗證</strong>：實作授權的 MCP 伺服器<strong>必須</strong>驗證所有進來請求，且<strong>不得</strong>依賴會話進行身份驗證
- <strong>安全會話產生</strong>：使用密碼學安全的非決定性會話 ID，由安全隨機數生成器產生
- <strong>用戶綁定</strong>：將會話 ID 綁定至用戶個人資訊，格式如 `<user_id>:<session_id>`，避免跨用戶會話濫用
- <strong>會話生命週期管理</strong>：實施適當的過期、輪換與失效機制以限制漏洞時窗
- <strong>傳輸安全</strong>：所有通訊必須強制使用 HTTPS 防止會話 ID 被攔截

### 混淆代理問題

<strong>混淆代理問題</strong> 發生於 MCP 伺服器作為用戶端與第三方服務間的身份驗證代理時，透過靜態客戶端 ID 利用產生授權繞過風險。

#### <strong>攻擊機制與風險</strong>

- **基於 Cookie 的同意繞過**：先前用戶認證產生的同意 Cookie 被攻擊者利用，透過製造的重新導向 URI 進行惡意授權請求
- <strong>授權碼竊取</strong>：既有同意 Cookie 使授權伺服器跳過同意畫面，將授權碼重新導向至攻擊者控制端點  
- **未經授權的 API 存取**：竊取的授權碼允許令牌交換及無明確批准的用戶冒充

#### <strong>緩解策略</strong>

**強制控管：**
- <strong>明確同意要求</strong>：使用靜態客戶端 ID 的 MCP 代理伺服器<strong>必須</strong>為每個動態註冊的客戶端取得用戶同意
- **OAuth 2.1 安全實施**：遵循最新 OAuth 安全最佳實務，包括所有授權請求中的 PKCE（授權碼交換驗證）
- <strong>嚴格客戶端驗證</strong>：嚴密驗證重新導向 URI 及客戶端識別碼以防止濫用

### 令牌轉發漏洞  

<strong>令牌轉發</strong> 是一種明顯的反模式，MCP 伺服器在未正確驗證下接受來自客戶端的令牌並轉發至下游 API，違反 MCP 授權規範。

#### <strong>安全意涵</strong>

- <strong>控管繞過</strong>：客戶端直接使用 API 令牌繞過重要的速率限制、驗證及監控控件
- <strong>審計紀錄損壞</strong>：上游發行的令牌使無法識別客戶端，破壞事件調查能力
- <strong>代理基礎資料外洩</strong>：未驗證的令牌使惡意行為者能利用伺服器作為未授權資料存取代理
- <strong>信任邊界違反</strong>：當令牌來源無法驗證時，下游服務的信任假設可能被破壞
- <strong>多服務擴展攻擊</strong>：被接受於多個服務的被攻陷令牌啟用橫向移動

#### <strong>必要安全控管</strong>

**不可妥協要求：**
- <strong>令牌驗證</strong>：MCP 伺服器<strong>不得</strong>接受非明確為 MCP 伺服器發行的令牌
- <strong>受眾驗證</strong>：必須驗證令牌中的受眾聲明符合 MCP 伺服器身份
- <strong>適當令牌生命週期</strong>：實施短期存取令牌及安全輪換機制


## AI 系統供應鏈安全

供應鏈安全已從傳統軟體依賴擴展至涵蓋整個 AI 生態系統。現代 MCP 實作必須嚴格驗證和監控所有 AI 相關元件，因每一元件都可能引入危害系統完整性的潛在漏洞。

### 擴展的 AI 供應鏈元件

**傳統軟體依賴：**
- 開源函式庫及框架
- 容器映像與基礎系統  
- 開發工具與構建管線
- 基礎建設元件與服務

**AI 專屬供應鏈元素：**
- <strong>基礎模型</strong>：需驗證來源的多家提供者之預訓練模型
- <strong>嵌入服務</strong>：外部向量化與語義搜尋服務
- <strong>上下文提供者</strong>：資料來源、知識庫及文件儲存庫  
- **第三方 API**：外部 AI 服務、機器學習管線及數據處理端點
- <strong>模型產物</strong>：權重、設定與微調模型變體
- <strong>訓練資料來源</strong>：用於模型訓練與微調的資料集

### 全面供應鏈安全策略

#### <strong>元件驗證與信任</strong>
- <strong>來源驗證</strong>：整合前驗證所有 AI 元件的來源、授權及完整性
- <strong>安全評估</strong>：針對模型、資料來源與 AI 服務執行漏洞掃描與安全審查
- <strong>聲譽分析</strong>：評估 AI 服務提供者的安全記錄及實務
- <strong>合規性驗證</strong>：確保所有元件符合組織安全及法規要求

#### <strong>安全部署管線</strong>  
- **自動化 CI/CD 安全**：將安全掃描整合至自動化部署管線中
- <strong>產物完整性</strong>：對所有部署產物（程式碼、模型、設定）執行加密驗證
- <strong>分階段部署</strong>：採用分段部署策略，在每階段執行安全驗證
- <strong>可信產物倉庫</strong>：僅從經過驗證的安全產物註冊庫及倉庫部署

#### <strong>持續監控與回應</strong>
- <strong>依賴掃描</strong>：持續監測所有軟體與 AI 元件依賴的漏洞
- <strong>模型監控</strong>：持續評估模型行為、性能漂移與安全異常
- <strong>服務健康追蹤</strong>：監控外部 AI 服務的可用性、安全事件及政策變動
- <strong>威脅情報整合</strong>：納入專屬 AI 及 ML 安全風險的威脅資訊來源

#### <strong>存取控制與最小權限</strong>
- <strong>元件層級權限</strong>：依業務需求限制模型、資料和服務的存取權
- <strong>服務帳號管理</strong>：實施具最小必要權限的專用服務帳號
- <strong>網路分割</strong>：隔離 AI 元件並限制服務間網路存取
- **API 閘道控管**：使用集中式 API 閘道控管並監控對外 AI 服務的存取

#### <strong>事件回應與復原</strong>
- <strong>快速反應程序</strong>：制定補丁或替換受損 AI 元件的程序
- <strong>憑證輪換</strong>：自動化輪換密鑰、API 金鑰及服務憑證
- <strong>回滾能力</strong>：快速還原至已知良好版本的 AI 元件
- <strong>供應鏈違規復原</strong>：針對上游 AI 服務妥協的專門應對程序

### 微軟安全工具與整合

**GitHub 進階安全** 提供包含以下功能的全面供應鏈保護：
- <strong>秘密掃描</strong>：自動偵測倉庫中的憑證、API 金鑰和令牌
- <strong>依賴掃描</strong>：對開源依賴及函式庫進行漏洞評估
- **CodeQL 分析**：對程式碼進行靜態分析，找出安全漏洞與程式碼問題
- <strong>供應鏈洞察</strong>：提供依賴健康狀態與安全狀況的可視化

**Azure DevOps 與 Azure Repos 整合：**
- 在 Microsoft 開發平台中無縫整合安全掃描
- 對 AI 工作負載在 Azure Pipelines 中執行自動安全檢查
- 確保安全 AI 元件部署的政策執行

**微軟內部實務：**
微軟在所有產品中實施廣泛的供應鏈安全措施。詳情請參考[微軟軟體供應鏈安全之旅](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)。


## 基礎安全最佳實務

MCP 實作繼承並構建於組織既有安全態勢之上。強化基礎安全實務可顯著提升 AI 系統及 MCP 部署之整體安全性。

### 核心安全基礎

#### <strong>安全開發實務</strong>
- **符合 OWASP**：防護 [OWASP 十大](https://owasp.org/www-project-top-ten/) 網頁應用漏洞
- **AI 專屬防護**：實施 [大型語言模型 OWASP 十大](https://genai.owasp.org/download/43299/?tmstv=1731900559) 控制
- <strong>安全秘密管理</strong>：使用專用金庫管理令牌、API 金鑰及敏感設定資料
- <strong>端到端加密</strong>：在所有應用組件與數據流程中實施安全通訊
- <strong>輸入驗證</strong>：嚴格驗證所有用戶輸入、API 參數與資料來源

#### <strong>基礎設施強化</strong>
- <strong>多因素驗證</strong>：所有管理及服務帳號強制使用 MFA
- <strong>修補管理</strong>：對作業系統、框架及依賴實施自動及及時修補  
- <strong>身份提供者整合</strong>：透過企業身份提供者（Microsoft Entra ID、Active Directory）統一身份管理
- <strong>網路分段</strong>：邏輯上隔離 MCP 元件以限制橫向移動風險
- <strong>最小權限原則</strong>：對所有系統元件及帳號賦予最低必要權限

#### <strong>安全監控與偵測</strong>
- <strong>全面記錄</strong>：詳細記錄 AI 應用活動，包括 MCP 用戶端-伺服器互動
- **SIEM 整合**：集中式安全資訊與事件管理，進行異常偵測
- <strong>行為分析</strong>：以 AI 加強的監控偵測系統與用戶行為異常模式
- <strong>威脅情報</strong>：整合外部威脅情報與妥協指標 (IOC)
- <strong>事件回應</strong>：完善的安全事件偵測、回應及復原程序

#### <strong>零信任架構</strong>
- **永不信任，持續驗證**：持續驗證用戶、裝置與網絡連接
- <strong>微分段</strong>：細緻的網絡控管隔離個別工作負載與服務
- <strong>身份中心安全</strong>：以驗證身份而非網路位置為基礎的安全政策
- <strong>持續風險評估</strong>：依據當前情境與行為動態調整安全態勢
- <strong>條件存取</strong>：根據風險因素、位置與裝置信任程度調整存取控制

### 企業整合模式

#### <strong>微軟安全生態系統整合</strong>
- **Microsoft Defender for Cloud**：全面的雲端安全態勢管理
- **Azure Sentinel**：本地雲端 SIEM 與 SOAR 功能，保護 AI 工作負載
- **Microsoft Entra ID**：企業身份與存取管理，含條件存取政策
- **Azure Key Vault**：中央秘密管理，配備硬體安全模組 (HSM)
- **Microsoft Purview**：AI 資料來源與工作流的資料治理與合規

#### <strong>合規與治理</strong>
- <strong>法規對齊</strong>：確保 MCP 實作符合行業特定合規要求 (GDPR、HIPAA、SOC 2)

- <strong>資料分類</strong>：正確分類及處理由 AI 系統處理的敏感資料
- <strong>審計追蹤</strong>：完整的日誌記錄，用於符合法規及進行法證調查
- <strong>隱私控管</strong>：在 AI 系統架構中落實隱私設計原則
- <strong>變更管理</strong>：AI 系統變更的安全性審查正式流程

這些基礎實踐建立了強固的安全基線，提升 MCP 專屬安全控管的效果，並為 AI 驅動的應用提供全面保護。

## 主要安全重點

- <strong>分層安全策略</strong>：結合基礎安全實踐（安全程式碼編寫、最小權限、供應鏈驗證、持續監控）與 AI 專屬控管，提供全面防護

- **AI 專屬威脅環境**：MCP 系統面臨獨特風險，包括提示注入、工具中毒、會話劫持、代理人混淆問題、Token 傳遞漏洞及過度權限，需專門緩解措施

- <strong>身份驗證與授權優化</strong>：使用外部身份提供者（Microsoft Entra ID）實施強健認證，強制正確的 Token 驗證，且絕不接受非明確為您的 MCP 伺服器發行的 Token

- **AI 攻擊防護**：部署 Microsoft Prompt Shields 與 Azure Content Safety 防禦間接提示注入及工具中毒攻擊，同時驗證工具元資料並監控動態變更

- <strong>會話與傳輸安全</strong>：使用密碼學安全、非決定性且與使用者身份綁定的 Session ID，實施適當的會話生命週期管理，且絕不使用會話進行認證

- **OAuth 安全最佳實踐**：透過動態註冊用戶明確同意防止代理人混淆攻擊，實作正確 OAuth 2.1 並搭配 PKCE，並嚴格驗證重導 URI  

- **Token 安全原則**：避免 Token 傳遞反模式，驗證 Token 受眾宣告，實作短生命週期 Token 並安全輪替，保持明確信任邊界

- <strong>全面供應鏈安全</strong>：對所有 AI 生態系組件（模型、嵌入向量、上下文供應者、外部 API）採用與傳統軟件依賴相同嚴格的安全標準

- <strong>持續演進</strong>：跟進快速演變的 MCP 規範，貢獻安全社群標準，並隨協議成熟保持適應性安全姿態

- <strong>微軟安全整合</strong>：利用微軟全面的安全生態系（Prompt Shields、Azure Content Safety、GitHub Advanced Security、Entra ID），強化 MCP 部署保護

## 全面資源

### **官方 MCP 安全文件**
- [MCP 規範 (現行版：2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳實踐](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub 倉庫](https://github.com/modelcontextprotocol)

### **OWASP MCP 安全資源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 完整 OWASP MCP 十大風險及 Azure 實作指導
- [OWASP MCP 十大風險](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全風險
- [MCP 安全高峰研討會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) - MCP 在 Azure 的實操安全訓練

### <strong>安全標準及最佳實踐</strong>
- [OAuth 2.0 安全最佳實踐 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP 十大網頁應用程式安全](https://owasp.org/www-project-top-ten/)
- [大型語言模型的 OWASP 十大](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [微軟數位防禦報告](https://aka.ms/mddr)

### **AI 安全研究與分析**
- [MCP 中的提示注入 (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [工具中毒攻擊 (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP 安全研究簡報 (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### <strong>微軟安全解決方案</strong>
- [Microsoft Prompt Shields 文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety 服務](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID 安全](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token 管理最佳實踐](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub 高級安全](https://github.com/security/advanced-security)

### <strong>實作指南與教學</strong>
- [Azure API 管理作為 MCP 認證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID 與 MCP 伺服器認證](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [安全的 Token 儲存與加密 (影片)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps 與供應鏈安全**
- [Azure DevOps 安全](https://azure.microsoft.com/products/devops)
- [Azure Repos 安全](https://azure.microsoft.com/products/devops/repos/)
- [微軟供應鏈安全歷程](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## <strong>其他安全文件</strong>

有關完整安全指引，請參閱本節中的專門文件：

- **[MCP 2025 安全最佳實踐](./mcp-security-best-practices-2025.md)** - MCP 實作的完整安全最佳實踐
- **[Azure Content Safety 實作](./azure-content-safety-implementation.md)** - Azure Content Safety 整合的實務範例  
- **[MCP 2025 安全控管](./mcp-security-controls-2025.md)** - MCP 部署最新的安全控管與技術
- **[MCP 最佳實踐速查表](./mcp-best-practices.md)** - MCP 重要安全實作速查指南
- **[BlueHat 2026：保障 AI 未來：以縱深防禦模式保護 MCP](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - 微軟安全應變中心（MSRC）的縱深防禦模式

### <strong>實務安全訓練</strong>

- **[MCP 安全高峰研討會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/)** - 由基礎營到高峰營，全方位實務訓練，保障 Azure 上的 MCP 伺服器安全
- **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)** - 參考架構及全部 OWASP MCP 十大風險的實施指導

---

## 下一步

下一章：[第 3 章：快速入門](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->