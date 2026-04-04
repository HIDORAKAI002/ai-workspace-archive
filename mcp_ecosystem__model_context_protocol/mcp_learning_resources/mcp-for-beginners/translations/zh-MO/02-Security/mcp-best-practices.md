# MCP 安全最佳實務 2025

本綜合指南概述了根據最新的 **MCP 規範 2025-11-25** 及當前行業標準，實施模型上下文協議（MCP）系統所需的重要安全最佳實務。這些實務涵蓋了傳統安全問題及 MCP 部署中特有的 AI 專屬威脅。

## 關鍵安全需求

### 強制安全控制（必須要求）

1. **令牌驗證**：MCP 伺服器**不得**接受非明確為該 MCP 伺服器簽發的任何令牌  
2. **授權驗證**：實施授權的 MCP 伺服器**必須**驗證所有入站請求，且**不得**使用會話進行身份驗證  
3. **使用者同意**：使用靜態客戶端 ID 的 MCP 代理伺服器**必須**為每個動態註冊的客戶端取得明確的使用者同意  
4. **安全會話 ID**：MCP 伺服器**必須**使用由安全隨機數生成器產生的密碼學安全、非決定性會話 ID  

## 核心安全實務

### 1. 輸入驗證及淨化
- **全面的輸入驗證**：驗證並淨化所有輸入，以防止注入攻擊、混淆代理問題及提示注入漏洞  
- **參數結構強制**：對所有工具參數及 API 輸入實施嚴格的 JSON 架構驗證  
- **內容過濾**：使用 Microsoft Prompt Shields 及 Azure Content Safety 過濾提示及回應中的惡意內容  
- **輸出淨化**：在向使用者或下游系統展示之前，驗證並清理所有模型輸出  

### 2. 驗證與授權卓越
- **外部身份提供者**：將驗證委派給已建立的身份提供者（Microsoft Entra ID、OAuth 2.1 提供者），而非自行實施驗證  
- **細粒度權限**：落實依最小權限原則的細粒度工具專屬權限  
- **令牌生命週期管理**：使用短期存取令牌並結合安全輪換及正確的受眾驗證  
- **多重身份驗證**：要求所有管理存取及敏感操作使用多重身份驗證（MFA）  

### 3. 安全通訊協議
- **傳輸層安全性**：所有 MCP 通訊使用 HTTPS/TLS 1.3 並進行適當的憑證驗證  
- **端到端加密**：對高度敏感的傳輸及靜態資料實施額外的加密層  
- **憑證管理**：維持適當的憑證生命週期管理並自動更新  
- **協議版本強制**：使用目前 MCP 協議版本（2025-11-25）及適當的版本協商  

### 4. 進階速率限制及資源保護
- **多層級速率限制**：於使用者、會話、工具及資源層級實行速率限制以防濫用  
- **自適應速率限制**：採用基於機器學習的速率限制，根據使用模式及威脅指標調整  
- **資源配額管理**：設定計算資源、記憶體使用及執行時間的適當限制  
- **DDoS 防護**：部署完整的 DDoS 防護及流量分析系統  

### 5. 全面日誌與監控
- **結構化審計日誌**：對所有 MCP 作業、工具執行及安全事件實施詳細且可搜尋的日誌  
- **即時安全監控**：部署具有 AI 驅動異常偵測的 SIEM 系統以監控 MCP 工作負載  
- **隱私合規日誌**：記錄安全事件時遵守資料隱私要求及規範  
- **事件回應整合**：將日誌系統連接至自動化事件回應工作流程  

### 6. 強化安全儲存實務
- **硬體安全模組**：對關鍵加密作業使用 HSM 支援的金鑰儲存（Azure Key Vault、AWS CloudHSM）  
- **加密金鑰管理**：實施金鑰輪換、分隔及存取控制  
- **秘密管理**：將所有 API 金鑰、令牌及憑證存放於專屬秘密管理系統  
- **資料分類**：根據敏感度分類資料並施加適當的保護措施  

### 7. 進階令牌管理
- **禁止令牌直通**：明確禁止繞過安全控制的令牌直通模式  
- **受眾驗證**：始終驗證令牌的受眾聲明與目標 MCP 伺服器身份相符  
- **基於宣告的授權**：根據令牌宣告及使用者屬性實施細粒度授權  
- **令牌綁定**：在適當情況下，將令牌綁定到特定會話、使用者或裝置  

### 8. 安全會話管理
- **密碼學會話 ID**：使用密碼學安全的隨機數生成器產生會話 ID（不可預測的序列）  
- **使用者專屬綁定**：使用安全格式如 `<user_id>:<session_id>` 將會話 ID 綁定至使用者特定資訊  
- **會話生命週期控制**：實施會話過期、輪換及失效機制  
- **會話安全標頭**：使用適當的 HTTP 安全標頭保護會話  

### 9. AI 專屬安全控制
- **提示注入防禦**：部署 Microsoft Prompt Shields，使用聚焦、分隔符及數據標記技術  
- **工具中毒預防**：驗證工具元資料、監控動態變化並驗證工具完整性  
- **模型輸出驗證**：掃描模型輸出以檢測潛在資料洩漏、有害內容或安全政策違規  
- **上下文視窗保護**：實施防範上下文視窗中毒及操控攻擊的控制措施  

### 10. 工具執行安全
- **執行沙盒**：在容器化隔離環境中執行工具並設定資源限制  
- **權限分離**：以最低必要權限及分離的服務帳戶執行工具  
- **網路隔離**：對工具執行環境實施網路分段  
- **執行監控**：監控工具執行的異常行為、資源使用及安全違規  

### 11. 持續安全驗證
- **自動化安全測試**：將安全測試納入 CI/CD 管線，使用如 GitHub Advanced Security 等工具  
- **漏洞管理**：定期掃描所有相依性，包括 AI 模型及外部服務  
- **滲透測試**：定期針對 MCP 實作進行安全評估  
- **安全程式碼審查**：強制對所有 MCP 相關程式碼變更進行安全審查  

### 12. AI 供應鏈安全
- **元件驗證**：驗證所有 AI 元件（模型、嵌入、API）的來源、完整性及安全性  
- **相依性管理**：維護軟體及 AI 相依性的最新清單並追蹤漏洞  
- **可信儲存庫**：使用已驗證且受信任的來源取得所有 AI 模型、函式庫及工具  
- **供應鏈監控**：持續監控 AI 服務提供者及模型儲存庫的安全狀態  

## 進階安全模式

### MCP 零信任架構
- **切勿信任，始終驗證**：對所有 MCP 參與者實施持續驗證  
- **微分段**：以細粒度網路及身份控管隔離 MCP 元件  
- **條件存取**：實施根據情境及行為調整的風險基存取控制  
- **持續風險評估**：基於當前威脅指標動態評估安全態勢  

### 隱私保護 AI 實作
- **資料最小化**：僅揭露每個 MCP 作業所需最低資料  
- **差分隱私**：對敏感資料處理實施隱私保護技術  
- **同態加密**：使用先進加密技術進行加密資料的安全運算  
- **聯邦學習**：實施保護資料本地性與隱私的分散式學習方法  

### AI 系統事件反應
- **AI 專屬事件程序**：制定針對 AI 與 MCP 專屬威脅的事件回應程序  
- **自動化回應**：對常見 AI 安全事件實施自動遏制及修復  
- **取證能力**：維持 AI 系統入侵及資料外洩的取證準備  
- **恢復程序**：建立對 AI 模型中毒、提示注入攻擊及服務妥協的恢復措施  

## 實作資源與標準

### 🏔️ 實作安全訓練
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - 針對在 Azure 中保護 MCP 伺服器的全面實作工作坊  
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - 參考架構與 OWASP MCP 十大實作指南  

### 官方 MCP 文件
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - 目前 MCP 協議規範  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - 官方安全指導  
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - 驗證與授權模式  
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - 傳輸層安全需求  

### Microsoft 安全解決方案
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - 先進提示注入防護  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - 全面 AI 內容過濾  
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - 企業身份及存取管理  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - 安全秘密與憑證管理  
- [GitHub Advanced Security](https://github.com/security/advanced-security) - 供應鏈與程式碼安全掃描  

### 安全標準與框架
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - 最新 OAuth 安全指導  
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - 網頁應用程式安全風險  
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - AI 專屬安全風險  
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - 全面 AI 風險管理  
- [ISO 27001:2022](https://www.iso.org/standard/27001) - 資訊安全管理系統  

### 實作指南與教學  
- [Azure API Management as MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - 企業驗證模式  
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) - 身份提供者整合  
- [Secure Token Storage Implementation](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - 令牌管理最佳實務  
- [End-to-End Encryption for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - 先進加密模式  

### 進階安全資源
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - 安全開發實務  
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - AI 專屬安全測試  
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - AI 威脅建模方法  
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - 隱私保護 AI 技術  

### 合規與治理
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - AI 系統的隱私合規  
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - 負責任的 AI 實作  
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) - AI 服務提供者的安全控制  
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - 醫療 AI 合規要求  

### DevSecOps 與自動化
- [DevSecOps Pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - 安全 AI 開發管線  
- [Automated Security Testing](https://learn.microsoft.com/security/engineering/devsecops) - 持續安全驗證  
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) - 安全基礎建設佈署  
- [Container Security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - AI 工作負載容器安全  

### 監控與事件回應  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) - 全面監控方案  
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) - AI 專屬事件流程  
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) - 安全資訊及事件管理  
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - AI 威脅情報來源  

## 🔄 持續改進

### 跟進演進中的標準
- **MCP 規範更新**：持續監控官方 MCP 規範變更及安全公告  
- **威脅情報**：訂閱 AI 安全威脅通知及漏洞資料庫  
- **社群參與**：參與 MCP 安全社群討論及工作組  
- **定期評估**：進行季度安全狀況評估並相應更新實務  

### 對 MCP 安全的貢獻  
- **安全研究**：貢獻 MCP 安全研究與漏洞揭露計劃  
- **最佳實務分享**：與社群分享安全實作與經驗教訓  
- **標準制定**：參與 MCP 規範開發及安全標準制定  
- **工具開發**：為 MCP 生態系統開發並分享安全工具與函式庫  

---

*本文件反映截至 2025 年 12 月 18 日的 MCP 安全最佳實務，依據 MCP 規範 2025-11-25。隨著協定與威脅環境發展，安全實務應定期檢視與更新。*  

## 下一步

- 閱讀：[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)  
- 返回：[Security Module Overview](./README.md)  
- 繼續：[Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件是使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件以其原文語言版本為準。對於重要資訊，建議採用專業人工翻譯。本公司不承擔因使用此翻譯而導致的任何誤解或誤譯之責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->