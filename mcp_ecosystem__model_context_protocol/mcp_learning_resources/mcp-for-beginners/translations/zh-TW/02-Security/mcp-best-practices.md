# MCP 安全最佳實踐 2025

本綜合指南概述了基於最新 **MCP 規範 2025-11-25** 及當前產業標準，實施模型上下文協議（MCP）系統的關鍵安全最佳實踐。這些實踐涵蓋傳統安全議題以及 MCP 部署中獨有的 AI 特定威脅。

## 核心安全需求

### 強制性安全控制（必須遵守的要求）

1. **令牌驗證**：MCP 伺服器**不得**接受任何非明確為該 MCP 伺服器發行的令牌
2. **授權驗證**：實作授權的 MCP 伺服器**必須**驗證所有入站請求，且**不得**使用會話進行認證  
3. **使用者同意**：MCP 代理伺服器使用靜態客戶端 ID 時，**必須**為每個動態註冊的客戶端取得明確使用者同意
4. **安全會話 ID**：MCP 伺服器**必須**使用由安全隨機數生成器產生的加密安全、非決定性會話 ID

## 核心安全實務

### 1. 輸入驗證與清理
- **全面輸入驗證**：驗證並清理所有輸入，防止注入攻擊、混淆代理問題與提示注入弱點
- **參數結構強制**：對所有工具參數與 API 輸入實施嚴格的 JSON 結構驗證
- **內容過濾**：使用 Microsoft Prompt Shields 和 Azure Content Safety 過濾提示和回應中的惡意內容
- **輸出清理**：在呈現給使用者或下游系統前驗證並清理所有模型輸出

### 2. 認證與授權卓越管理  
- **外部身份提供者**：委外認證機制給既有身份服務（Microsoft Entra ID、OAuth 2.1 提供者），避免自訂認證實作
- **細粒度權限**：依最小權限原則實施細粒度、工具專屬權限
- **令牌生命週期管理**：使用短期存活存取令牌，並實施安全旋轉與適當的受眾驗證
- **多因素認證**：所有管理存取及敏感操作均須使用多因素認證（MFA）

### 3. 安全通訊協定
- **傳輸層安全**：MCP 全部通訊使用 HTTPS/TLS 1.3，並正確驗證憑證
- **端對端加密**：為傳輸及靜態高度敏感資料實施額外加密層
- **憑證管理**：妥善管理憑證生命週期與自動續期流程
- **協定版本強制**：使用最新 MCP 協定版本（2025-11-25）並妥善協商版本

### 4. 進階速率限制與資源保護
- **多層速率限制**：在使用者、會話、工具及資源層級實施速率限制，防止濫用
- **自適應速率限制**：使用基於機器學習的速率限制，適應使用模式及威脅指標
- **資源配額管理**：適當設定運算資源、記憶體用量及執行時間限制
- **DDoS 防護**：部署完整的 DDoS 防護與流量分析系統

### 5. 全面日誌與監控
- **結構化稽核日誌**：實作詳細且可查詢的日誌，涵蓋所有 MCP 操作、工具執行與安全事件
- **即時安全監控**：部署具 AI 异常偵測功能的 SIEM 系統監控 MCP 工作負載
- **符合隱私規範的日誌**：在符合資料隱私規範與法規的前提下記錄安全事件
- **事件響應整合**：將日誌系統接入自動化事件響應流程

### 6. 強化安全存儲實踐
- **硬體安全模組**：使用由 HSM 支援的金鑰存儲（Azure Key Vault、AWS CloudHSM）處理關鍵加密操作
- **加密金鑰管理**：適當執行金鑰輪替、分離與存取控制
- **機密管理**：將所有 API 金鑰、令牌與憑證集中存放於專門的機密管理系統
- **資料分類**：依資料敏感度分級並套用相應的保護措施

### 7. 進階令牌管理
- **防止令牌直通**：明確禁止繞過安全控管的令牌直通型態
- **受眾驗證**：始終驗證令牌受眾（aud）與預期 MCP 伺服器身份相符
- **基於 Claim 的授權**：根據令牌 Claims 與使用者屬性實施細粒度授權
- **令牌綁定**：在適用時將令牌綁定至特定會話、使用者或裝置

### 8. 安全會話管理
- **加密會話 ID**：會話 ID 由加密安全的隨機數生成器產生（不可預測序列）
- **使用者特定綁定**：使用 `<user_id>:<session_id>` 等安全格式將會話 ID 綁定至特定使用者
- **會話生命週期控管**：實行適當的會話過期、輪替與失效機制
- **會話安全標頭**：利用適當的 HTTP 安全標頭保護會話

### 9. AI 特定安全控制
- **提示注入防禦**：部署 Microsoft Prompt Shields，採用聚光燈、分隔符及數據標記技術
- **工具上下毒防止**：驗證工具元資料、監控動態變更並確認工具完整性
- **模型輸出驗證**：掃描模型輸出以防資料洩漏、有害內容或違反安全政策
- **上下文視窗保護**：實施控管，避免上下文視窗被毒害或操控攻擊

### 10. 工具執行安全
- **執行沙箱**：工具執行於有資源限制的容器化隔離環境
- **權限分離**：工具使用最小必要權限並分離服務帳戶執行
- **網路隔離**：為工具執行環境實施網路分割
- **執行監控**：監控工具執行異常行為、資源使用及安全違規

### 11. 持續安全驗證
- **自動化安全測試**：整合安全測試於 CI/CD 流水線，採用 GitHub Advanced Security 等工具
- **漏洞管理**：定期掃描所有依賴項，包括 AI 模型與外部服務
- **滲透測試**：就 MCP 實作定期進行安全評估
- **安全程式碼審查**：強制所有 MCP 相關程式碼變更進行安全審查

### 12. AI 供應鏈安全
- **元件驗證**：驗證所有 AI 元件（模型、嵌入、API）的來源、完整性與安全性
- **依賴管理**：維持所有軟體與 AI 依賴的最新清單及漏洞追蹤
- **可信倉庫**：採用經驗證的、可信任的 AI 模型、函式庫與工具來源
- **供應鏈監控**：持續監視 AI 服務供應商與模型倉庫的安全狀況

## 進階安全模式

### MCP 零信任架構
- **永不信任，持續驗證**：對所有 MCP 參與者實施持續驗證
- **微分段**：以細粒度網路與身份控管隔離 MCP 組件
- **條件存取**：根據情境與行為實施風險調整的存取控制
- **持續風險評估**：依當前威脅指標動態評估安全態勢

### 隱私保護的 AI 實作
- **資料最小化**：每個 MCP 操作僅暴露必要的最少資料
- **差分隱私**：對敏感資料處理實施隱私保護技術
- **同態加密**：採用先進加密技術，執行加密資料的安全運算
- **聯邦學習**：實現分散式學習，保護資料本地性與隱私

### AI 系統事件響應
- **AI 特定事件程序**：制定針對 AI 與 MCP 特定威脅的事件響應程序
- **自動化回應**：對常見 AI 安全事件實施自動化封鎖與修復  
- **鑑識能力**：維持 AI 系統妥協與資料外洩的鑑識準備
- **回復程序**：建立回復 AI 模型毒害、提示注入攻擊及服務妥協的流程

## 實作資源與標準

### 🏔️ 實務安全訓練
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - 針對 Azure MCP 伺服器的完整實務安全工作坊
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - 參考架構及 OWASP MCP Top 10 實作指引

### 官方 MCP 文件
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - 目前 MCP 協定規範
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - 官方安全指引
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - 認證與授權模式
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - 傳輸層安全需求

### Microsoft 安全方案
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - 先進提示注入防護
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - 全面 AI 內容過濾
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - 企業身份與存取管理
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - 安全機密與憑證管理
- [GitHub Advanced Security](https://github.com/security/advanced-security) - 供應鏈及程式碼安全掃描

### 安全標準與架構
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - 最新 OAuth 安全指導
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - 網頁應用安全風險
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - AI 特定安全風險
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - 全面 AI 風險管理
- [ISO 27001:2022](https://www.iso.org/standard/27001) - 資訊安全管理系統

### 實作指南與教學
- [Azure API Management as MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - 企業認證模式
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) - 身份提供者整合
- [Secure Token Storage Implementation](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - 令牌管理最佳實務
- [End-to-End Encryption for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - 進階加密模式

### 進階安全資源
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - 安全開發流程
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - AI 專屬安全測試
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - AI 威脅建模方法
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - 隱私保護的 AI 技術

### 法規遵循與治理
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - AI 系統隱私合規
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - 負責任 AI 實作
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) - AI 服務供應商安全控管
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - 醫療 AI 合規要求

### DevSecOps 與自動化
- [DevSecOps Pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - 安全 AI 開發流程
- [Automated Security Testing](https://learn.microsoft.com/security/engineering/devsecops) - 持續安全驗證
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) - 安全基礎設施部署
- [Container Security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - AI 工作負載容器安全

### 監控與事件響應  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) - 全方位監控方案
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) - AI 特定事件處理程序
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) - 安全資訊與事件管理
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - AI 威脅情報來源

## 🔄 持續改進

### 緊跟標準演進
- **MCP 規範更新**：持續追蹤官方 MCP 規範變更與安全公告
- **威脅情報**：訂閱 AI 安全威脅情資與漏洞資料庫
- **社群參與**：參與 MCP 安全社群討論及工作小組  
- **定期評估**：每季進行安全態勢評估並相應更新作法  

### 為 MCP 安全做出貢獻  
- **安全研究**：為 MCP 安全研究及漏洞揭露計畫做出貢獻  
- **最佳實踐分享**：與社群分享安全實作與經驗教訓  
- **標準制定**：參與 MCP 規範開發及安全標準制定  
- **工具開發**：開發並分享 MCP 生態系的安全工具及函式庫  

---

*本文件反映 MCP 規範 2025-11-25 版本截至 2025 年 12 月 18 日的安全最佳實踐。隨著協議及威脅環境的演變，安全作法應定期檢視與更新。*  

## 接下來是什麼  

- 閱讀：[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)  
- 返回至：[Security Module Overview](./README.md)  
- 繼續至：[Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。儘管我們努力確保準確性，請注意自動翻譯可能包含錯誤或不準確之處。原始文件以其母語版本為準，應視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->