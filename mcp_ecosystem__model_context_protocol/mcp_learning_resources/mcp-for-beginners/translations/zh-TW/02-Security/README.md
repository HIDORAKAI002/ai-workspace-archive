# MCP 安全性：AI 系統的全面防護

[![MCP 安全性最佳實踐](../../../translated_images/zh-TW/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(點擊上方圖片觀看本課程影片)_

安全性是 AI 系統設計的基礎，這也是我們將其作為第二個章節的首要原因。這與微軟來自[安全未來倡議](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/)的<strong>Secure by Design</strong>（設計即安全）原則相符。

模型上下文協議 (MCP) 為 AI 驅動的應用帶來強大新功能，同時也引入了超越傳統軟體風險的獨特安全挑戰。MCP 系統面臨既有的安全問題（安全編碼、最小權限、供應鏈安全）以及新的 AI 專屬威脅，包括提示注入、工具中毒、會話劫持、混淆代理攻擊、令牌轉送漏洞和動態功能修改。

本課程將探討 MCP 實作中最關鍵的安全風險─涵蓋驗證、授權、過度權限、間接提示注入、會話安全、混淆代理問題、令牌管理和供應鏈漏洞。您將學會可行的控管措施與最佳實踐，以減輕這些風險，同時利用微軟解決方案，如提示防護、Azure 內容安全和 GitHub 進階安全來強化 MCP 部署。

## 學習目標

完成本課程後，您將能夠：

- **識別 MCP 專屬威脅**：認識 MCP 系統中獨有的安全風險，包括提示注入、工具中毒、過度權限、會話劫持、混淆代理問題、令牌轉送漏洞和供應鏈風險
- <strong>應用安全控管</strong>：實施有效的緩解措施，包括強健的驗證、最小權限存取、安全令牌管理、會話安全控管和供應鏈驗證
- <strong>利用微軟安全解決方案</strong>：理解並部署微軟提示防護、Azure 內容安全和 GitHub 進階安全以保護 MCP 工作負載
- <strong>驗證工具安全性</strong>：認識工具元資料驗證的重要性，監控動態變更，防禦間接提示注入攻擊
- <strong>整合最佳實踐</strong>：結合既有安全基礎（安全編碼、伺服器硬化、零信任）與 MCP 專屬控管，達成全面保護

# MCP 安全架構與控管

現代 MCP 實作需要分層的安全方法，同時應對傳統軟體安全與 AI 專屬威脅。快速演進的 MCP 規範持續成熟其安全控管，進一步整合企業安全架構與既有最佳實踐。

根據[微軟數位防禦報告](https://aka.ms/mddr)的研究指出，**98% 的報告違規事件可藉由穩健的安全衛生習慣被預防**。最有效的防護策略是結合基礎安全實務與 MCP 專屬控管─被證明的基線安全措施仍是降低整體安全風險的最關鍵手段。

## 目前安全態勢

> **注意：** 本資訊反映截至 **2026 年 2 月 5 日** 的 MCP 安全標準，依據 **MCP 規範 2025-11-25**。MCP 協議持續快速演進，未來的實作可能推出新的驗證模式與增強控管。請隨時參考最新 [MCP 規範](https://spec.modelcontextprotocol.io/)、[MCP GitHub 倉庫](https://github.com/modelcontextprotocol) 及[安全最佳實踐文件](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) 獲取最新指南。

> **展望未來：** `2026-07-28` 發行候選版將進一步強化授權─客戶端必須驗證授權回應中的 `iss` 參數（RFC 9207）、在動態客戶端註冊期間宣告 OpenID Connect 的 `application_type`，並將註冊的認證綁定至發行授權伺服器。完整授權 SEPs 可參考 [MCP 變更內容：2026-07-28 發行候選版](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## 🏔️ MCP 安全峰會工作坊（Sherpa）

若想獲得<strong>實作安全訓練</strong>，我們強烈推薦 **MCP 安全峰會工作坊**（Sherpa）─一次全面導覽如何在 Microsoft Azure 中保護 MCP 伺服器的實作歷程。

### 工作坊簡介

[MCP 安全峰會工作坊](https://azure-samples.github.io/sherpa/) 透過成熟的「漏洞 → 利用 → 修復 → 驗證」方法帶來實務且可立即運用的安全訓練。您會：

- <strong>以攻破學習</strong>：透過利用故意配置不安全的伺服器來體驗漏洞
- **利用 Azure 原生安全**：使用 Azure Entra ID、Key Vault、API 管理與 AI 內容安全
- <strong>遵循縱深防禦</strong>：逐步建立完整安全層級
- **採用 OWASP 標準**：每項技術皆符合 [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- <strong>取得量產程式碼</strong>：帶走可運作且測試完成的實作方案

### 探險路線

| 營地 | 重點 | 涵蓋的 OWASP 風險 |
|------|-------|---------------------|
| <strong>基地營</strong> | MCP 基礎與驗證漏洞 | MCP01, MCP07 |
| **營地 1：身份** | OAuth 2.1、Azure 託管身份、Key Vault | MCP01, MCP02, MCP07 |
| **營地 2：閘道** | API 管理、私用端點、治理 | MCP02, MCP06, MCP07, MCP09 |
| **營地 3：輸入/輸出安全** | 提示注入、個人資料保護、內容安全 | MCP03, MCP05, MCP06, MCP10 |
| **營地 4：監控** | 日誌分析、儀表板、威脅偵測 | MCP04, MCP08 |
| <strong>峰會</strong> | 紅隊/藍隊整合測試 | 全部 |

<strong>立即開始</strong>：[https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP 十大安全風險

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) 詳細說明 MCP 實作中最關鍵的十項安全風險：

| 風險 | 描述 | Azure 緩解措施 |
|------|-------------|------------------|
| **MCP01** | 令牌錯誤管理與秘密洩漏 | Azure Key Vault，託管身份 |
| **MCP02** | 範圍蠕變造成的權限升級 | RBAC，條件存取 |
| **MCP03** | 工具中毒 | 工具驗證，完整性校驗 |
| **MCP04** | 軟體供應鏈攻擊與依賴篡改 | GitHub 進階安全，依賴掃描 |
| **MCP05** | 命令注入與執行 | 輸入驗證，沙盒環境 |
| **MCP06** | 意圖流程顛覆 | Azure AI 內容安全，提示防護 |
| **MCP07** | 驗證與授權不足 | Azure Entra ID，具 PKCE 的 OAuth 2.1 |
| **MCP08** | 缺乏稽核與遙測 | Azure Monitor，Application Insights |
| **MCP09** | 影子 MCP 伺服器 | API 中心治理，網路隔離 |
| **MCP10** | 上下文注入與過度分享 | 資料分類，最低暴露原則 |

### MCP 驗證的演進

MCP 規範在驗證與授權的方式上已大幅演進：

- <strong>原始方式</strong>：早期規範要求開發者自行實作驗證伺服器，MCP 伺服器作為 OAuth 2.0 授權伺服器直接管理用戶驗證
- **現行標準（2025-11-25）**：更新規範允許 MCP 伺服器委派驗證給外部身份提供者（例如 Microsoft Entra ID），提升安全態勢且減少實作複雜度
- <strong>傳輸層安全</strong>：加強對本地（STDIO）與遠端（可串流 HTTP）連線的安全傳輸與驗證模式的支持

## 驗證與授權安全

### 現有安全挑戰

現代 MCP 實作面臨若干驗證與授權挑戰：

### 風險與威脅向量

- <strong>授權邏輯配置錯誤</strong>：MCP 伺服器的授權實作不當可能暴露敏感資料且錯誤套用存取控管
- **OAuth 令牌遭竊**：本地 MCP 伺服器令牌被盜可使攻擊者冒充伺服器存取下游服務
- <strong>令牌轉送漏洞</strong>：不當的令牌處理導致安全控管繞過與責任追蹤破裂
- <strong>過度權限</strong>：權限過度的 MCP 伺服器違反最小權限原則並擴大攻擊面

#### 令牌轉送：重要的反範式

因嚴重的安全風險，當前 MCP 授權規範<strong>明確禁止令牌轉送</strong>：

##### 安全控制繞過
- MCP 伺服器及下游 API 實施重要安全控管（速率限制、請求驗證、流量監控），這些均依賴令牌適當驗證
- 直接由客戶端對 API 使用令牌繞過這些關鍵防護，破壞安全架構

##### 責任與稽核挑戰  
- MCP 伺服器無法區分使用上游發行令牌的客戶端，因此稽核追蹤受損
- 下游資源伺服器日誌顯示誤導的請求來源，而非實際中介的 MCP 伺服器
- 事件調查與合規審核變得極為困難

##### 資料竊漏風險
- 未驗證的令牌聲明允許持有竊取令牌的惡意者利用 MCP 伺服器作為資料外洩的代理
- 信任邊界違反導致未經授權的存取模式繞過既定安全控管

##### 多服務攻擊向量
- 被接受的被攻破令牌可被多個服務使用，支援跨系統側移
- 服務間的信任假設在無法驗證令牌來源時遭破壞

### 安全控管與緩解措施

**關鍵安全要求：**

> **強制性：** MCP 伺服器<strong>絕不可</strong>接受非明確簽發給該 MCP 伺服器的任何令牌

#### 驗證與授權控管

- <strong>嚴謹授權審查</strong>：全面稽核 MCP 伺服器授權邏輯，確保僅預期用戶與客戶端能存取敏感資源
  - <strong>實作指南</strong>：[Azure API 管理作為 MCP 伺服器的驗證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - <strong>身份整合</strong>：[使用 Microsoft Entra ID 進行 MCP 伺服器驗證](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- <strong>安全令牌管理</strong>：實施[微軟令牌驗證與生命週期最佳實踐](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - 驗證令牌的接收方聲明符合 MCP 伺服器身份
  - 實施適當的令牌輪換與過期政策
  - 防範令牌重放攻擊與未經授權使用

- <strong>受保護的令牌儲存</strong>：靜態與傳輸中皆以加密保護令牌儲存
  - <strong>最佳實踐</strong>：[安全令牌儲存與加密指引](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### 存取控管實作

- <strong>最小權限原則</strong>：只授權 MCP 伺服器達成功能所需的最低權限
  - 定期審查與更新權限以防止權限蠕變
  - <strong>微軟文件</strong>：[安全的最小權限存取](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **基於角色的存取控制 (RBAC)**：細緻的角色分配
  - 嚴格限定角色針對特定資源與操作
  - 避免過於寬泛或不必要的權限擴大攻擊面

- <strong>持續權限監控</strong>：執行持續的存取稽核與監測
  - 監控權限使用模式的異常行為
  - 及時修正過度或未使用的權限

## AI 專屬安全威脅

### 提示注入與工具操控攻擊

現代 MCP 實作面臨複雜的 AI 專屬攻擊向量，傳統安全措施無法完全因應：

#### **間接提示注入（跨領域提示注入）**

<strong>間接提示注入</strong> 是 MCP 啟用 AI 系統中最嚴重的漏洞之一。攻擊者將惡意指令藏入外部內容——文件、網頁、電子郵件或資料來源，進而被 AI 系統當作合法指令處理。

**攻擊場景：**
- <strong>基於文件的注入</strong>：惡意指令隱藏在被處理的文件中，觸發 AI 執行非預期行為
- <strong>網頁內容利用</strong>：被入侵的網頁含有嵌入提示，採集時操控 AI 行為
- <strong>電子郵件攻擊</strong>：電子郵件中藏有惡意提示，誘使 AI 助理洩漏資訊或執行未授權操作
- <strong>資料源污染</strong>：被入侵的資料庫或 API 向 AI 系統提供污染內容

<strong>實際影響</strong>：這些攻擊可能導致資料外洩、隱私違規、有害內容產生及使用者互動操控。詳細分析請參考 [MCP 中的提示注入 (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)。

![提示注入攻擊示意圖](../../../translated_images/zh-TW/prompt-injection.ed9fbfde297ca877.webp)

#### <strong>工具中毒攻擊</strong>

<strong>工具中毒</strong> 針對定義 MCP 工具的元資料進行攻擊，利用大型語言模型解析工具描述與參數以決定執行行為的機制。

**攻擊機制：**
- <strong>元資料操控</strong>：攻擊者在工具描述、參數定義或使用示例中注入惡意指令
- <strong>隱形指令</strong>：工具元資料中隱藏的提示被 AI 模型處理，但對人類使用者不可見
- **動態工具修改（「拉地毯」攻擊）**：用戶核准的工具稍後被修改，執行惡意行為而用戶未察覺
- <strong>參數注入</strong>：在工具參數結構中嵌入惡意內容，影響模型行為


<strong>託管伺服器風險</strong>：遠端 MCP 伺服器存在較高風險，因為工具定義可能在用戶初次批准後被更新，導致原本安全的工具變成惡意工具。欲進行全面分析，請參閱 [工具中毒攻擊 (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)。

![工具注入攻擊示意圖](../../../translated_images/zh-TW/tool-injection.3b0b4a6b24de6bef.webp)

#### **額外的 AI 攻擊向量**

- **跨領域提示注入 (XPIA)**：利用多個領域內容來繞過安全控制的複雜攻擊  
- <strong>動態能力修改</strong>：實時變更工具能力，以逃避初期的安全評估  
- <strong>上下文窗口中毒</strong>：操縱大型上下文窗口以隱藏惡意指令的攻擊  
- <strong>模型混淆攻擊</strong>：利用模型限制導致不可預測或不安全行為的攻擊  


### AI 安全風險影響

**高影響結果：**
- <strong>資料外洩</strong>：未經授權存取並竊取企業或個人敏感資料  
- <strong>隱私洩露</strong>：個人識別資訊（PII）及機密商業資料的曝光  
- <strong>系統操控</strong>：對關鍵系統和工作流程的非預期修改  
- <strong>憑證竊取</strong>：驗證令牌及服務憑證被危害  
- <strong>橫向移動</strong>：利用受害的 AI 系統作為更廣泛網路攻擊的跳板  

### 微軟 AI 安全解決方案

#### **AI 提示防護盾：針對注入攻擊的進階防護**

微軟 **AI 提示防護盾** 透過多層安全機制提供對直接與間接提示注入攻擊的全面防禦：

##### **核心防護機制：**

1. <strong>先進偵測與過濾</strong>
   - 機器學習演算法與自然語言處理技術偵測外部內容中的惡意指令  
   - 實時分析文件、網頁、電子郵件及資料來源中的內嵌威脅  
   - 理解合法與惡意提示模式的上下文差異  

2. <strong>鎖定技術</strong>  
   - 區分可信系統指令與可能遭破壞的外部輸入  
   - 文本轉換方法，提升模型相關性並隔離惡意內容  
   - 幫助 AI 系統維持正確指令層級並忽略注入命令  

3. <strong>分隔符與資料標記系統</strong>
   - 明確定義可信系統訊息與外部輸入文字間的邊界  
   - 特殊標記突顯可信與不可信資料來源邊界  
   - 明確分離避免指令混淆及未授權執行命令  

4. <strong>持續威脅情報</strong>
   - 微軟持續監控新興攻擊模式並更新防禦  
   - 積極尋找新的注入技術和攻擊向量  
   - 定期更新安全模型以面對進化中的威脅  

5. **Azure 內容安全整合**
   - 作為全面 Azure AI 內容安全套件的一部分  
   - 額外偵測越獄嘗試、有害內容及安全政策違規  
   - AI 應用元件的統一安全控管  

<strong>實作資源</strong>：[Microsoft 提示防護盾文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft 提示防護盾保護](../../../translated_images/zh-TW/prompt-shield.ff5b95be76e9c78c.webp)


## 進階 MCP 安全威脅

### 會話劫持漏洞

<strong>會話劫持</strong> 是狀態式 MCP 實作中的重要攻擊向量，未授權者取得並濫用合法會話識別碼，以冒充用戶並執行未授權動作。

#### <strong>攻擊場景與風險</strong>

- <strong>會話劫持提示注入</strong>：攻擊者用竊取的會話 ID 注入惡意事件到共享會話狀態的伺服器，可能觸發有害行動或存取敏感資料  
- <strong>直接冒充</strong>：竊取的會話 ID 允許直接呼叫 MCP 伺服器，繞過認證，攻擊者被視為合法使用者  
- <strong>受損的可續流</strong>：攻擊者可提前終止請求，導致合法客戶端以可能惡意內容繼續  

#### <strong>會話管理的安全控管</strong>

**關鍵需求：**
- <strong>授權驗證</strong>：實作授權的 MCP 伺服器 <strong>必須</strong> 驗證所有進入請求，且 <strong>不得</strong> 依賴會話作為認證  
- <strong>安全會話生成</strong>：使用密碼學安全、非決定性的會話 ID，透過安全隨機數生成器生成  
- <strong>用戶綁定</strong>：將會話 ID 綁定至用戶專屬資訊，使用格式如 `<user_id>:<session_id>`，防止跨用戶會話濫用  
- <strong>會話生命週期管理</strong>：實施適當的會話過期、輪替與失效機制，限制漏洞視窗  
- <strong>傳輸安全</strong>：所有通訊強制使用 HTTPS 以防會話 ID 被攔截  

### 混淆代理問題

<strong>混淆代理問題</strong> 發生於 MCP 伺服器作為客戶端與第三方服務間的認證代理時，造成靜態客戶端 ID 被利用以繞過授權。

#### <strong>攻擊機制與風險</strong>

- **基於 Cookie 的同意繞過**：先前用戶認證產生的同意 Cookie，遭攻擊者利用惡意授權請求及精心設計的重導 URI  
- <strong>授權碼竊取</strong>：現有同意 Cookie 可能導致授權伺服器跳過同意畫面，將授權碼重導至攻擊者控制的端點  
- **未經授權的 API 存取**：竊取的授權碼可用於交換令牌及用戶冒充，無需明確批准  

#### <strong>緩解策略</strong>

**必須控管：**
- <strong>明確同意要求</strong>：使用靜態客戶端 ID 的 MCP 代理伺服器 <strong>必須</strong> 對每個動態註冊的客戶端取得用戶同意  
- **OAuth 2.1 安全實作**：適用所有授權請求，遵守現行 OAuth 安全最佳實務，包括 PKCE（授權碼交換驗證）  
- <strong>嚴格客戶端驗證</strong>：實施對重導 URI 與客戶端標識符的嚴格驗證，防止濫用  

### 令牌直通漏洞  

<strong>令牌直通</strong> 是一種明顯的反模式，指 MCP 伺服器在未充分驗證的情況下接受客戶端令牌並轉發給下游 API，違反 MCP 授權規範。

#### <strong>安全影響</strong>

- <strong>控制繞過</strong>：客戶端直通 API 的令牌使用繞過重要的限流、驗證和監控控制  
- <strong>審計軌跡破壞</strong>：上游發放的令牌使客戶端身份無法識別，破壞事件調查能力  
- <strong>代理式資料外洩</strong>：未經驗證的令牌允許惡意者利用伺服器作為未授權資料存取代理  
- <strong>信任邊界違規</strong>：當無法驗證令牌來源時，下游服務的信任假設受損  
- <strong>多服務攻擊擴散</strong>：受損令牌被多服務接受，促成橫向移動  

#### <strong>所需安全控管</strong>

**不可妥協需求：**
- <strong>令牌驗證</strong>：MCP 伺服器 <strong>不得</strong> 接受未明確發給該 MCP 伺服器的令牌  
- <strong>受眾驗證</strong>：務必驗證令牌的受眾聲明與 MCP 伺服器身份相符  
- <strong>適當令牌生命週期</strong>：實施短期存取令牌及安全輪替策略  


## AI 系統供應鏈安全

供應鏈安全已超越傳統軟體依賴，涵蓋整個 AI 生態。現代 MCP 實作必須嚴格驗證並監控所有 AI 相關元件，因每個元件皆可能引入漏洞，危及系統完整性。

### 擴展的 AI 供應鏈元件

**傳統軟體依賴：**
- 開源函式庫與架構  
- 容器映像檔與基礎系統  
- 開發工具與建置流程  
- 基礎建設組件與服務  

**AI 專屬供應鏈元素：**
- <strong>基礎模型</strong>：來自多家供應商的預訓練模型，需驗證來源可靠性  
- <strong>嵌入服務</strong>：外部向量化及語義搜尋服務  
- <strong>上下文提供者</strong>：資料來源、知識庫與文件庫  
- **第三方 API**：外部 AI 服務、機器學習流程與資料處理端點  
- <strong>模型產物</strong>：權重、設定及微調模型變體  
- <strong>訓練資料來源</strong>：模型訓練與微調使用的數據集  

### 全面供應鏈安全策略

#### <strong>元件驗證與信任</strong>
- <strong>來源驗證</strong>：整合前驗證所有 AI 元件的來源、授權與完整性  
- <strong>安全評估</strong>：對模型、資料來源及 AI 服務進行漏洞掃描與安全審查  
- <strong>聲譽分析</strong>：評估 AI 服務供應商的安全紀錄與實務  
- <strong>合規驗證</strong>：確保所有元件符合集團安全與法規要求  

#### <strong>安全部署流程</strong>
- **自動化 CI/CD 安全**：整合安全掃描於自動部署流程中  
- <strong>產物完整性</strong>：針對所有部署產物（代碼、模型、設定）實施密碼學驗證  
- <strong>階段式部署</strong>：採用分階段部署策略，每階段執行安全驗證  
- <strong>可信產物倉庫</strong>：僅從驗證且安全的產物註冊機構與倉庫部署  

#### <strong>持續監控與回應</strong>
- <strong>依賴掃描</strong>：持續監控所有軟體及 AI 元件依賴的漏洞  
- <strong>模型監控</strong>：持續評估模型行為、性能漂移與安全異常  
- <strong>服務健康追蹤</strong>：監控外部 AI 服務的可用性、安全事件及政策變更  
- <strong>威脅情報整合</strong>：整合特定於 AI 與機器學習安全風險的威脅情報來源  

#### <strong>存取控管與最小權限</strong>
- <strong>元件層級權限</strong>：基於業務需求限制對模型、資料與服務的存取  
- <strong>服務帳號管理</strong>：實施具最小所需權限的專用服務帳號  
- <strong>網路區隔</strong>：隔離 AI 元件並限制服務間的網路訪問  
- **API 閘道控管**：利用集中式 API 閘道控管和監控對外部 AI 服務的存取  

#### <strong>事件回應與復原</strong>
- <strong>快速回應程序</strong>：建立補丁或替換受損 AI 元件的流程  
- <strong>憑證輪替</strong>：自動化輪替密鑰、API 金鑰與服務憑證系統  
- <strong>回滾能力</strong>：快速還原到先前已知良好版本的 AI 元件  
- <strong>供應鏈入侵復原</strong>：針對上游 AI 服務安全事件的專門應對程序  

### 微軟安全工具與整合

**GitHub 進階安全性** 提供全面供應鏈防護，包括：
- <strong>秘密掃描</strong>：自動偵測儲存庫中的憑證、API 金鑰與令牌  
- <strong>依賴掃描</strong>：開源依賴與函式庫的漏洞評估  
- **CodeQL 分析**：靜態程式碼分析以發現安全漏洞與程式問題  
- <strong>供應鏈洞察</strong>：依賴狀況與安全狀態的可視化  

**Azure DevOps 與 Azure Repos 整合：**
- 在 Microsoft 開發平台中無縫整合安全掃描  
- AI 工作負載 Azure Pipelines 中的自動化安全檢查  
- 安全 AI 元件部署的政策執行  

**微軟內部實務：**
微軟在所有產品中實施廣泛的供應鏈安全實務。詳見 [微軟軟體供應鏈安全之路](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)。


## 基礎安全最佳實踐

MCP 實作繼承並建立於您組織現有的安全態勢。加強基礎安全實務能顯著提升 AI 系統及 MCP 部署的整體安全。

### 核心安全基礎

#### <strong>安全開發實務</strong>
- **符合 OWASP 標準**：防護[OWASP 十大](https://owasp.org/www-project-top-ten/)網頁應用漏洞  
- **AI 專屬保護**：實施[LLM 的 OWASP 十大](https://genai.owasp.org/download/43299/?tmstv=1731900559)控制  
- <strong>安全秘密管理</strong>：使用專用保管庫管理令牌、API 金鑰與敏感設定資料  
- <strong>端對端加密</strong>：確保應用元件與資料流之間的安全通訊  
- <strong>輸入驗證</strong>：嚴格驗證所有用戶輸入、API 參數及資料來源  

#### <strong>基礎架構防護</strong>
- <strong>多因素驗證</strong>：所有管理及服務帳號皆強制 MFA  
- <strong>補丁管理</strong>：作業系統、框架及依賴的自動及及時補丁更新  
- <strong>身份提供者整合</strong>：透過企業身份提供者（Microsoft Entra ID、Active Directory）集中管理身份  
- <strong>網路區隔</strong>：MCP 組件的邏輯隔離以限制橫向移動  
- <strong>最小權限原則</strong>：所有系統元件與帳號皆授予最低必要權限  

#### <strong>安全監控與偵測</strong>
- <strong>全面記錄</strong>：詳細記錄 AI 應用活動，包括 MCP 客戶端與伺服器互動  
- **SIEM 整合**：集中安全信息與事件管理以偵測異常  
- <strong>行為分析</strong>：利用 AI 監控系統與用戶行為中的異常模式  
- <strong>威脅情報</strong>：整合外部威脅情報及妥協指標 (IOC)  
- <strong>事件回應</strong>：明確定義安全事件的偵測、回應與復原程序  

#### <strong>零信任架構</strong>
- **永不信任，持續驗證**：持續驗證用戶、設備及網路連線  
- <strong>微分割</strong>：細緻的網路控制，隔離各工作負載與服務  
- <strong>身份中心安全</strong>：安全政策基於已驗證身份而非網路位置  
- <strong>持續風險評估</strong>：根據當前情境與行為動態評估安全態勢  
- <strong>條件式存取</strong>：根據風險因素、地點與設備信任度調整存取控制  

### 企業整合模式

#### <strong>微軟安全生態系整合</strong>
- **Microsoft Defender for Cloud**：全面雲端安全態勢管理  
- **Azure Sentinel**：雲端原生 SIEM 與 SOAR 能力，保護 AI 工作負載  
- **Microsoft Entra ID**：企業身份與存取管理，具條件式存取政策  
- **Azure Key Vault**：集中式祕密管理，配備硬體安全模組 (HSM)  
- **Microsoft Purview**：針對 AI 資料來源與工作流程的資料治理與合規  

#### <strong>合規與治理</strong>
- <strong>法規符合性</strong>：確保 MCP 實作符合特定產業合規要求（GDPR、HIPAA、SOC 2）  

- <strong>資料分類</strong>：對 AI 系統處理的敏感資料進行適當的分類和處理
- <strong>稽核追蹤</strong>：全面日誌記錄以符合法規遵循及鑑識調查
- <strong>隱私控制</strong>：在 AI 系統架構中實施隱私設計原則
- <strong>變更管理</strong>：針對 AI 系統修改進行正式的安全審查流程

這些基礎實踐建立了一個強固的安全基線，提升 MCP 專屬安全控制的效能，並為 AI 驅動的應用程式提供全面保護。

## 關鍵安全重點

- <strong>分層安全方法</strong>：結合基礎安全實踐（安全程式設計、最小權限、供應鏈驗證、持續監控）與 AI 專屬控制，提供全面防護

- **AI 專屬威脅環境**：MCP 系統面臨獨特風險，包括提示注入、工具投毒、會話劫持、混淆代理問題、代幣轉發漏洞及過度權限，需要專門的緩解措施

- <strong>卓越的身份驗證與授權</strong>：使用外部身份提供者（Microsoft Entra ID）實施強健驗證，強制正確的代幣驗證，且絕不接受非明確發行給您的 MCP 伺服器的代幣

- **AI 攻擊防護**：部署 Microsoft Prompt Shields 和 Azure Content Safety 以防範間接提示注入與工具投毒攻擊，同時驗證工具元資料並監控動態變化

- <strong>會話與傳輸安全</strong>：使用密碼學安全、非決定性且綁定使用者身份的會話 ID，實施適當的會話生命週期管理，並絕不使用會話做為身份驗證

- **OAuth 安全最佳實踐**：通過動態註冊用戶的明確同意來防止混淆代理攻擊，正確實施包含 PKCE 的 OAuth 2.1，並嚴格驗證重定向 URI

- <strong>代幣安全原則</strong>：避免代幣轉發的反模式，驗證代幣的受眾聲明，實施短期代幣並安全輪替，維護清晰的信任邊界

- <strong>全面的供應鏈安全</strong>：對所有 AI 生態系統元件（模型、嵌入向量、上下文提供者、外部 API）施以與傳統軟體依賴相同的安全嚴謹度

- <strong>持續進化</strong>：隨著 MCP 規範快速演進，保持最新，貢獻於安全社群標準，並隨協議成熟維持適應性的安全姿態

- **Microsoft 安全整合**：利用 Microsoft 全方位安全生態系（Prompt Shields、Azure Content Safety、GitHub 進階安全、Entra ID）增強 MCP 部署保護

## 全面資源

### **官方 MCP 安全文件**
- [MCP 規範（現行：2025-11-25）](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳實踐](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub 倉庫](https://github.com/modelcontextprotocol)

### **OWASP MCP 安全資源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 全面 OWASP MCP Top 10 與 Azure 實作指導
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全風險
- [MCP 安全高峰工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) - MCP 在 Azure 上的實務安全訓練

### <strong>安全標準與最佳實踐</strong>
- [OAuth 2.0 安全最佳實踐 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP 十大網路應用安全風險](https://owasp.org/www-project-top-ten/)
- [大型語言模型的 OWASP 十大風險](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft 數位防禦報告](https://aka.ms/mddr)

### **AI 安全研究與分析**
- [MCP 中的提示注入（Simon Willison）](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [工具投毒攻擊（Invariant Labs）](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP 安全研究簡報（Wiz Security）](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft 安全解決方案**
- [Microsoft Prompt Shields 文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety 服務](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID 安全](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure 代幣管理最佳實踐](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub 進階安全](https://github.com/security/advanced-security)

### <strong>實作指南與教學</strong>
- [Azure API 管理作為 MCP 身份驗證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID 與 MCP 伺服器身份驗證](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [安全代幣存儲與加密（影片）](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps 與供應鏈安全**
- [Azure DevOps 安全](https://azure.microsoft.com/products/devops)
- [Azure Repos 安全](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft 供應鏈安全之旅](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## <strong>其他安全文件</strong>

有關全面的安全指導，請參閱本節中的這些專門文件：

- **[MCP 安全最佳實踐 2025](./mcp-security-best-practices-2025.md)** - MCP 實作完整的安全最佳實踐
- **[Azure Content Safety 實作](./azure-content-safety-implementation.md)** - Azure Content Safety 整合的實務範例  
- **[MCP 安全控制 2025](./mcp-security-controls-2025.md)** - MCP 部署的最新安全控制與技術
- **[MCP 最佳實踐快速參考](./mcp-best-practices.md)** - MCP 重要安全實踐的快速參考指南
- **[BlueHat 2026：保護 AI 的未來：利用深度防禦模式保護 MCP](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - 來自 Microsoft Security Response Center (MSRC) 的深度防禦模式

### <strong>實戰安全訓練</strong>

- **[MCP 安全高峰工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/)** - 在 Azure 上為 MCP 伺服器提供全方位、從基礎營至高峰營的實務安全工作坊
- **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)** - OWASP MCP Top 10 全部風險的參考架構與實作指導

---

## 下一步

下一章：[第3章：入門指南](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->