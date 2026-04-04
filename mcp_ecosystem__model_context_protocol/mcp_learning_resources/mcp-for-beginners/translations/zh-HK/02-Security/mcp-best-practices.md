# MCP 安全最佳實踐 2025

本綜合指南根據最新的 **MCP 規範 2025-11-25** 及現行行業標準，概述了實施模型上下文協議 (MCP) 系統的關鍵安全最佳實踐。這些實踐涵蓋傳統安全問題及 MCP 部署中特有的 AI 風險。

## 重要安全要求

### 強制性安全控管 (MUST 要求)

1. **令牌驗證**：MCP 伺服器 **不得** 接受未明確簽發給該 MCP 伺服器的任何令牌
2. **授權驗證**：實施授權的 MCP 伺服器 **必須** 驗證所有內部請求，並且 **不得** 使用會話作為身份驗證
3. **使用者同意**：使用靜態客戶端 ID 的 MCP 代理伺服器，**必須** 取得使用者對每個動態註冊客戶端的明確同意
4. **安全會話 ID**：MCP 伺服器 **必須** 使用由安全隨機數產生器生成的密碼學安全且非決定性的會話 ID

## 核心安全做法

### 1. 輸入驗證與淨化
- **全面輸入驗證**：驗證並淨化所有輸入，防止注入攻擊、混淆代理問題以及提示注入漏洞
- **參數架構強制**：對所有工具參數及 API 輸入實施嚴格的 JSON 架構驗證
- **內容過濾**：使用 Microsoft Prompt Shields 及 Azure Content Safety 過濾提示和回應中的惡意內容
- **輸出淨化**：在呈現給用戶或下游系統前，驗證並淨化所有模型輸出

### 2. 認證與授權卓越
- **外部識別提供者**：委派認證給已建立的識別提供者（如 Microsoft Entra ID、OAuth 2.1 提供者），避免自行實作認證
- **細粒度權限**：依最小權限原則實作細分且針對工具的權限
- **令牌生命週期管理**：使用短時效存取令牌，搭配安全旋轉與適當受眾驗證
- **多因素認證**：對所有管理與敏感操作要求多因素驗證 (MFA)

### 3. 安全通訊協議
- **傳輸層安全**：所有 MCP 通訊均使用 HTTPS/TLS 1.3 並驗證憑證
- **端對端加密**：對高度敏感的傳輸與靜態資料實施額外加密層
- **憑證管理**：維護妥善憑證生命週期管理，並採用自動續期流程
- **協議版本強制**：採用目前 MCP 協議版本 (2025-11-25) 並正確協商版本

### 4. 進階速率限制與資源保護
- **多層速率限制**：在用戶、會話、工具及資源層面實作速率限制，防止濫用
- **自適應速率限制**：使用基於機器學習的速率限制，動態調整使用模式與威脅指標
- **資源配額管理**：設定適當的計算資源、記憶體用量及執行時間限制
- **DDoS 防護**：部署全面的分散式阻斷服務防護與流量分析系統

### 5. 全面紀錄與監控
- **結構化稽核記錄**：為所有 MCP 作業、工具執行及安全事件實施詳細且可搜尋的日誌
- **即時安全監控**：部署 SIEM 系統，結合 AI 驅動的異常檢測專為 MCP 工作負載設計
- **隱私合規記錄**：在遵守資料隱私規範下，進行安全事件記錄
- **事件響應整合**：將日誌系統連接至自動化事件響應工作流

### 6. 強化安全存儲實踐
- **硬體安全模組**：重要密碼學操作采用 HSM 支援的金鑰存儲（如 Azure Key Vault、AWS CloudHSM）
- **加密金鑰管理**：妥善實施密鑰旋轉、分離與存取管控
- **秘密管理**：將所有 API 金鑰、令牌與憑證存放於專用的秘密管理系統
- **資料分類**：依敏感度分類資料並採用相應的防護措施

### 7. 進階令牌管理
- **禁止令牌透傳**：明確禁止繞過安全控管的令牌透傳模式
- **受眾驗證**：始終驗證令牌中的受眾聲明是否與目標 MCP 伺服器身份匹配
- **基於聲明的授權**：根據令牌聲明和使用者屬性實施細粒度授權
- **令牌綁定**：視情況將令牌綁定至特定會話、使用者或裝置

### 8. 安全會話管理
- **密碼學會話 ID**：使用密碼學安全且不可預測的隨機數生成會話 ID
- **使用者綁定**：以安全格式（如 `<user_id>:<session_id>`）將會話 ID 綁定至使用者特定資訊
- **會話生命週期控管**：實施適當的會話過期、旋轉及失效機制
- **會話安全標頭**：使用適當的 HTTP 安全標頭保護會話

### 9. AI 專屬安全控管
- **提示注入防禦**：部署 Microsoft Prompt Shields，採用聚焦、界限符號及資料標記技術
- **工具中毒防範**：驗證工具元資料、監控動態變更並確保工具完整性
- **模型輸出驗證**：掃描模型輸出以防止資料外洩、有害內容或安全政策違規
- **上下文視窗保護**：實施控管防止上下文視窗遭受中毒及操縱攻擊

### 10. 工具執行安全
- **執行沙盒化**：於容器化且隔離的環境中執行工具，配合資源限制
- **權限分離**：以最低必需權限及分離服務帳號執行工具
- **網路隔離**：為工具執行環境實施網路分段
- **執行監控**：監控工具執行異常行為、資源用量及安全違規

### 11. 持續安全驗證
- **自動化安全測試**：將安全測試納入 CI/CD 管線，使用 GitHub Advanced Security 等工具
- **漏洞管理**：定期掃描所有依賴，包括 AI 模型及外部服務
- **滲透測試**：定期針對 MCP 實作進行安全評估
- **安全程式碼審查**：對所有 MCP 相關程式碼變更實施強制安全審查

### 12. AI 供應鏈安全
- **組件驗證**：驗證所有 AI 組件（模型、嵌入、API）的來源、完整性及安全性
- **依賴管理**：維持所有軟體及 AI 依賴清單並追蹤其漏洞狀況
- **可信倉庫**：所有 AI 模型、函式庫及工具使用已驗證且可信來源
- **供應鏈監控**：持續監控 AI 服務提供者與模型倉庫的安全事件

## 進階安全模式

### MCP 的零信任架構
- **永不信任，持續驗證**：對所有 MCP 參與者實施持續驗證
- **微分段**：以細粒度的網路及身份管控隔離 MCP 組件
- **條件存取**：實施依風險調整的存取控管，適應上下文與行為
- **持續風險評估**：根據當前威脅指標動態評估安全態勢

### 隱私保護 AI 實作
- **資料最小化**：每個 MCP 操作僅揭露必要的最小資料
- **差分隱私**：實施敏感資料處理的隱私保護技術
- **同態加密**：使用先進加密技術實現加密資料的安全計算
- **聯邦學習**：實施分散式學習方法以保護資料本地性與隱私

### AI 系統事件響應
- **AI 專屬事件流程**：制定針對 AI 及 MCP 特有威脅的事件響應程序
- **自動化響應**：對常見 AI 安全事件實施自動封鎖與補救
- **鑑識能量**：維持 AI 系統遭受妥協及資料外洩的鑑識準備
- **復原程序**：建立針對模型中毒、提示注入攻擊及服務妥協的復原流程

## 實作資源與標準

### 🏔️ 實戰安全培訓
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Azure 中 MCP 伺服器安全的綜合實作工作坊
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - 參考架構與 OWASP MCP Top 10 實作指引

### 官方 MCP 文件
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - 最新 MCP 協議規範
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - 官方安全指南
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - 認證與授權模式
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - 傳輸層安全需求

### Microsoft 安全解決方案
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - 進階提示注入防護
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - 全方位 AI 內容過濾
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - 企業身份及存取管理
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - 安全秘密與憑證管理
- [GitHub Advanced Security](https://github.com/security/advanced-security) - 供應鏈及程式碼安全掃描

### 安全標準與框架
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - 當前 OAuth 安全指引
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - 網路應用程式安全風險
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - AI 專屬安全風險
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - 全面 AI 風險管理
- [ISO 27001:2022](https://www.iso.org/standard/27001) - 資訊安全管理系統

### 實作指南與教學
- [Azure API Management as MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - 企業認證模式
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) - 身份提供者整合
- [Secure Token Storage Implementation](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - 令牌管理最佳實踐
- [End-to-End Encryption for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - 高級加密模式

### 進階安全資源
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - 安全開發實務
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - AI 特定安全測試
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - AI 威脅建模方法論
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - 隱私保護 AI 技術

### 合規與治理
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - AI 系統隱私合規
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - 負責任 AI 實作
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) - AI 服務提供者的安全控管
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - 醫療 AI 合規要求

### DevSecOps 與自動化
- [DevSecOps Pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - 安全 AI 開發管線
- [Automated Security Testing](https://learn.microsoft.com/security/engineering/devsecops) - 持續安全驗證
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) - 安全基礎架構部署
- [Container Security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - AI 工作負載容器安全

### 監控與事件響應  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) - 全面監控方案
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) - AI 專屬事件流程
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) - 安全資訊與事件管理
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - AI 威脅情報來源

## 🔄 持續改進

### 緊貼演進中的標準
- **MCP 規範更新**：監控官方 MCP 規範變更及安全公告
- **威脅情報**：訂閱 AI 安全威脅資訊流及漏洞資料庫
- **社群參與**：參與 MCP 安全社群討論及工作小組
- **定期評估**：進行季度安全態勢評估並相應更新實踐

### 對 MCP 安全的貢獻
- **安全研究**：參與 MCP 安全研究與漏洞揭露計劃
- **最佳實踐分享**：與社群分享安全實施及經驗教訓
- **標準制定**：參與 MCP 規範開發及安全標準建立
- **工具開發**：開發並分享 MCP 生態系的安全工具及函式庫

---

*本文件反映 MCP 安全最佳實踐，截至 2025 年 12 月 18 日，基於 MCP 規範 2025-11-25。隨著協議與威脅環境演變，應定期檢視並更新安全實踐。*

## 下一步

- 閱讀：[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)
- 返回：[Security Module Overview](./README.md)
- 繼續：[Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件以其本身語言版本為權威來源。對於重要資訊，建議採用專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->