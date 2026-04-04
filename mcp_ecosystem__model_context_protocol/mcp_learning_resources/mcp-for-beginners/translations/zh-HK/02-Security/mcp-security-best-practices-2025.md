# MCP 安全最佳實踐 - 2026 年 2 月更新

> **重要**：本文件反映最新的 [MCP 規範 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) 安全要求及官方 [MCP 安全最佳實踐](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)。請始終參考當前規範以取得最新指引。

## 🏔️ 實戰安全培訓

為了獲得實際實施經驗，建議參與 **[MCP 安全高峰工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/)** — 一個全面引導在 Azure 中保護 MCP 伺服器的遠征。工作坊涵蓋所有 OWASP MCP 十大風險，採用「易受攻擊 → 利用 → 修復 → 驗證」的方法。

本文件中的所有實踐均符合 **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)** 以取得 Azure 特定實施指引。

## MCP 實作的基本安全實踐

Model Context Protocol 帶來超越傳統軟體安全的獨特挑戰。這些實踐涵蓋基礎安全要求以及 MCP 特有威脅，包括提示注入、工具中毒、會話劫持、混淆代理問題和令牌穿透漏洞。

### **強制性安全要求**

**MCP 規範的關鍵要求：**

### **強制性安全要求**

**MCP 規範的關鍵要求：**

> **絕對禁止**：MCP 伺服器 **絕對禁止** 接受未明確為該 MCP 伺服器發行的任何令牌
> 
> **必須**：實施授權的 MCP 伺服器 **必須** 驗證所有入站請求
>  
> **絕對禁止**：MCP 伺服器 **絕對禁止** 使用會話做身份認證
>
> **必須**：使用靜態客戶端 ID 的 MCP 代理伺服器 **必須** 為每個動態註冊的客戶端取得使用者同意

---

## 1. **令牌安全與身份認證**

**身份認證與授權控管：**
   - **嚴格的授權審查**：全面審核 MCP 伺服器的授權邏輯，確保只有預期的使用者與客戶端能訪問資源
   - **外部身份提供者整合**：使用像 Microsoft Entra ID 這類成熟身份提供者，避免自行實作認證
   - **令牌受眾驗證**：始終驗證令牌是明確為您的 MCP 伺服器發行，絕不接受上游令牌
   - **適當的令牌生命週期管理**：實現安全的令牌輪替、過期政策，防止令牌重放攻擊

**保護的令牌存儲：**
   - 對所有機密採用 Azure Key Vault 或類似安全憑證庫
   - 對令牌靜態與傳輸時均加密
   - 定期輪替憑證並監控未經授權存取

## 2. **會話管理與傳輸安全**

**安全會話實務：**
   - **密碼學安全的會話 ID**：使用安全且非決定性的會話 ID，靠安全的隨機數產生
   - **使用者特定綁定**：透過格式如 `<user_id>:<session_id>` 綁定會話 ID 與使用者身份，避免跨使用者會話濫用
   - **會話生命週期管理**：實施正確的過期、輪替和失效機制以降低風險時窗
   - **HTTPS/TLS 強制執行**：所有通信皆強制使用 HTTPS，防止會話 ID 被竊取

**傳輸層安全：**
   - 盡可能配置 TLS 1.3 並妥善管理憑證
   - 對關鍵連線施行憑證固化（certificate pinning）
   - 定期進行憑證輪替與有效性驗證

## 3. **AI 特定威脅防護** 🤖

**提示注入防禦：**
   - **Microsoft 提示保護盾**：部署 AI 提示保護盾以進階檢測與過濾惡意指令
   - **輸入清理**：驗證並清理所有輸入以防止注入攻擊和混淆代理問題
   - **內容邊界**：使用分隔符和數據標記系統，區分受信指令與外部內容

**工具中毒預防：**
   - **工具元數據驗證**：實施工具定義完整性檢查，監控異常變更
   - **動態工具監控**：監測運行時行為，並設定異常執行模式警報
   - **批准工作流程**：要求明確使用者批准工具修改與功能變更

## 4. **存取控制與權限**

**最小權限原則：**
   - 只授予 MCP 伺服器執行所需的最低權限
   - 實施角色基礎存取控制 (RBAC)，配置細粒度權限
   - 定期審查權限並持續監控權限升級

**運行時權限控管：**
   - 設定資源限制以防止資源耗盡攻擊
   - 使用容器隔離工具執行環境  
   - 實施及時存取 (just-in-time) 用於管理功能

## 5. **內容安全與監控**

**內容安全實施：**
   - **Azure 內容安全整合**：使用 Azure 內容安全偵測有害內容、越獄嘗試及政策違反
   - **行為分析**：執行運行時行為監控，偵測 MCP 伺服器與工具執行的異常
   - **全面日誌記錄**：記錄所有身份驗證嘗試、工具調用與安全事件，且使用安全、不可篡改的存儲

**持續監控：**
   - 即時警報偵測可疑行為與未授權存取  
   - 與 SIEM 系統整合，實現集中安全事件管理
   - 定期進行 MCP 實作的安全稽核和滲透測試

## 6. **供應鏈安全**

**元件驗證：**
   - **依賴掃描**：使用自動化漏洞掃描覆蓋所有軟體依賴與 AI 元件
   - **來源驗證**：驗證模型、資料源與外部服務的來源、授權及完整性
   - **已簽名套件**：採用加密簽名套件並於部署前驗證簽名

**安全開發流程：**
   - **GitHub 進階安全功能**：實施秘密掃描、依賴分析與 CodeQL 靜態分析
   - **CI/CD 安全控管**：於自動部署管線中整合安全驗證
   - **產物完整性**：執行已部署產物與設定的加密驗證

## 7. **OAuth 安全與混淆代理防護**

**OAuth 2.1 實作：**
   - **PKCE 實施**：對所有授權請求使用 PKCE（Proof Key for Code Exchange）
   - **明確同意**：為每個動態註冊客戶端取得使用者同意以防止混淆代理攻擊
   - **重定向 URI 驗證**：嚴格驗證重定向 URI 與客戶端識別代碼

**代理安全：**
   - 防止因靜態客戶端 ID 被濫用而繞過授權
   - 實作第三方 API 存取的適當同意工作流程
   - 監控授權碼竊取與未授權 API 存取

## 8. **事件回應與復原**

**快速反應能力：**
   - **自動化反應**：實施憑證輪替與威脅遏制的自動系統
   - **回滾程序**：具備迅速回復至已知良好配置與元件的能力
   - **司法鑑識能力**：詳細的審計軌跡與日誌供事件調查使用

**通訊與協調：**
   - 明確的安全事件升級程序
   - 與組織事件回應團隊整合
   - 定期進行安全事件模擬與桌面演練

## 9. **合規與治理**

**法規合規：**
   - 保證 MCP 實作符合行業特定標準（GDPR、HIPAA、SOC 2）
   - 實施 AI 資料處理的資料分類與隱私控管
   - 維持合規稽核所需的完整文件

**變更管理：**
   - 對 MCP 系統所有修改進行正式安全審查
   - 配置變更版本控制及批准工作流程
   - 定期評估合規性與差距分析

## 10. **進階安全控管**

**零信任架構：**
   - **絕不信任，始終驗證**：持續核查使用者、設備與連線
   - **微分段**：精細的網路控管隔離個別 MCP 元件
   - **條件存取**：基於風險的存取控制，依實際情境與行為調整

**運行時應用防護：**
   - **運行時應用自我防護 (RASP)**：部署 RASP 技術以即時威脅偵測
   - **應用效能監控**：監控效能異常以警示潛在攻擊
   - **動態安全策略**：根據當前威脅態勢調整安全策略

## 11. **微軟安全生態系整合**

**全面微軟安全：**
   - **Microsoft Defender for Cloud**：針對 MCP 工作負載的雲端安全態勢管理
   - **Azure Sentinel**：雲端原生 SIEM 與 SOAR 能力，提供進階威脅偵測
   - **Microsoft Purview**：AI 工作流及資料源的資料治理與合規管理

**身份與存取管理：**
   - **Microsoft Entra ID**：企業身份管理搭配條件存取策略
   - **特權身份管理 (PIM)**：及時存取與管理功能的批准工作流程
   - **身份保護**：基於風險的條件存取與自動化威脅反應

## 12. **持續安全演進**

**保持最新：**
   - **規範監控**：定期檢視 MCP 規範更新及安全指引變更
   - **威脅情報**：整合 AI 特有的威脅情報與危害指標
   - **安全社群參與**：積極參與 MCP 安全社群及漏洞揭露計畫

**適應性安全：**
   - **機器學習安全**：利用機器學習異常偵測識別新穎攻擊模式
   - **預測安全分析**：實施預測模型進行主動威脅識別
   - **安全自動化**：根據威脅情報與規範變更自動更新安全政策

---

## **關鍵安全資源**

### **官方 MCP 文件**
- [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳實踐](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP 安全資源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) — 全面 OWASP MCP 十大及 Azure 實作
- [OWASP MCP 十大](https://owasp.org/www-project-mcp-top-10/) — 官方 OWASP MCP 安全風險
- [MCP 安全高峰工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) — MCP 在 Azure 上的實戰安全培訓

### **微軟安全解決方案**
- [Microsoft 提示保護盾](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure 內容安全](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID 安全](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub 進階安全](https://github.com/security/advanced-security)

### **安全標準**
- [OAuth 2.0 安全最佳實踐 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [大型語言模型 OWASP 十大](https://genai.owasp.org/)
- [NIST AI 風險管理架構](https://www.nist.gov/itl/ai-risk-management-framework)

### **實作指南**
- [Azure API 管理 MCP 身份驗證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID 搭配 MCP 伺服器](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **安全通知**：MCP 安全實踐快速演進。實施前請始終核對最新的 [MCP 規範](https://spec.modelcontextprotocol.io/) 與 [官方安全文件](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)。

## 下一步

- 閱讀：[MCP 安全控管 2025](./mcp-security-controls-2025.md)
- 返回：[安全模組概覽](./README.md)
- 繼續閱讀：[模組 3：快速開始](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件是使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們致力於提供準確的內容，但請注意，自動翻譯可能包含錯誤或不準確之處。文件的原文版本應視為權威來源。如涉及重要資訊，建議尋求專業人工翻譯。我們對因使用本翻譯所引起的任何誤解或誤釋不承擔任何責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->