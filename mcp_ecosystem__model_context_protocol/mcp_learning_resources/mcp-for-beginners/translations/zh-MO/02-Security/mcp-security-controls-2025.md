# MCP 安全控制 − 2026年2月更新

> <strong>當前標準</strong>：本文檔反映了 [MCP 規範 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) 的安全需求及官方 [MCP 安全最佳實務](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)。

模型上下文協議（MCP）已大幅成熟，增強了針對傳統軟件安全和 AI 特定威脅的安全控制。本文檔提供了符合 OWASP MCP 十大風險架構的完整安全控制，確保 MCP 實作的安全性。

## 🏔️ 實戰安全培訓

為獲得實際的安全實作經驗，我們推薦 **[MCP 安全峰會工作坊（Sherpa）](https://azure-samples.github.io/sherpa/)** — 一個全面引導如何在 Azure 中保護 MCP 伺服器的旅程，採用「易受攻擊 → 利用 → 修復 → 驗證」的方法論。

本文檔中的所有安全控制均符合 **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)**，該指南提供了針對 OWASP MCP 十大風險的參考架構和 Azure 特定實作指導。

## <strong>強制性安全要求</strong>

### **MCP 規範中的關鍵禁止條款：**

> <strong>禁止</strong>：MCP 伺服器<strong>不得</strong>接受未明確發行給該 MCP 伺服器的任何令牌  
>  
> <strong>禁用</strong>：MCP 伺服器<strong>不得</strong>使用會話進行認證  
>  
> <strong>必須</strong>：實作授權的 MCP 伺服器<strong>必須</strong>驗證所有入站請求  
>  
> <strong>強制</strong>：使用靜態客戶端 ID 的 MCP 代理伺服器<strong>必須</strong>為每個動態註冊的客戶端取得用戶同意

---

## 1. <strong>認證與授權控制</strong>

### <strong>外部身份提供者整合</strong>

<strong>當前 MCP 標準（2025-11-25）</strong>允許 MCP 伺服器委派認證給外部身份提供者，這是重要的安全提升：

**解決的 OWASP MCP 風險**：[MCP07 - 認證與授權不足](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**安全優勢：**  
1. <strong>消除自訂認證風險</strong>：避免自訂認證實作帶來的攻擊面  
2. <strong>企業級安全</strong>：利用具先進安全功能的企業身份提供者，如 Microsoft Entra ID  
3. <strong>集中身份管理</strong>：簡化用戶生命週期、存取控制與合規審計  
4. <strong>多因素認證</strong>：承襲企業身份提供者的 MFA 功能  
5. <strong>條件存取策略</strong>：受益於風險導向存取控制與自適應認證

**實作要求：**  
- <strong>令牌受眾驗證</strong>：確認所有令牌明確發行給 MCP 伺服器  
- <strong>發行者驗證</strong>：驗證令牌發行者是否符合預期的身份提供者  
- <strong>簽章驗證</strong>：使用密碼學技術確保令牌完整性  
- <strong>過期強制</strong>：嚴格執行令牌存活期限  
- <strong>權限範圍驗證</strong>：確保令牌包含適當的權限以執行請求操作

### <strong>授權邏輯安全</strong>

**關鍵控制要點：**  
- <strong>完整授權稽核</strong>：定期安全檢視所有授權決策點  
- <strong>失敗安全預設</strong>：當無法確定授權結果時，預設拒絕存取  
- <strong>權限邊界</strong>：明確界定不同特權和資源存取權限的分界  
- <strong>稽核日誌</strong>：完整記錄所有授權決策以供安全監控  
- <strong>定期存取審查</strong>：定期驗證用戶權限與特權分配

## 2. <strong>令牌安全與防傳遞控制</strong>

**解決的 OWASP MCP 風險**：[MCP01 - 令牌管理不善及機密外洩](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### <strong>防止令牌直接傳遞</strong>

MCP 授權規範明確禁止令牌直接傳遞，因其帶來嚴重安全風險：

**安全風險說明：**  
- <strong>繞過控制</strong>：迴避速率限制、請求驗證和流量監控等核心安全控制  
- <strong>責任中斷</strong>：無法辨識客戶端，破壞審計追蹤及事件調查  
- <strong>代理資料外洩</strong>：惡意行為者可利用伺服器作為非法資料存取的代理  
- <strong>信任邊界違規</strong>：破壞下游服務對令牌來源的信任假設  
- <strong>側移攻擊</strong>：遭竄改令牌可用於多服務間擴大攻擊範圍

**實作控制如下：**  
```yaml
Token Validation Requirements:
  audience_validation: MANDATORY
  issuer_verification: MANDATORY  
  signature_check: MANDATORY
  expiration_enforcement: MANDATORY
  scope_validation: MANDATORY
  
Token Lifecycle Management:
  rotation_frequency: "Short-lived tokens preferred"
  secure_storage: "Azure Key Vault or equivalent"
  transmission_security: "TLS 1.3 minimum"
  replay_protection: "Implemented via nonce/timestamp"
```

### <strong>安全令牌管理模式</strong>

**最佳實務：**  
- <strong>短效令牌</strong>：透過頻繁輪替，縮短暴露時窗  
- <strong>即時發行</strong>：僅於特定操作需要時發放令牌  
- <strong>安全儲存</strong>：採用硬體安全模組（HSM）或安全金鑰庫  
- <strong>令牌綁定</strong>：盡可能將令牌綁定至特定客戶端、會話或操作  
- <strong>監控與警報</strong>：即時偵測令牌濫用或未授權存取行為

## 3. <strong>會話安全控制</strong>

### <strong>防止會話劫持</strong>

**攻擊向量涵蓋：**  
- <strong>會話竄改提示注入</strong>：在共用會話狀態內注入惡意事件  
- <strong>會話冒充</strong>：利用竊取的會話 ID 非法繞過認證  
- <strong>可續流攻擊</strong>：利用伺服器事件繼續恢復機制進行惡意注入

**強制會話控制要求：**  
```yaml
Session ID Generation:
  randomness_source: "Cryptographically secure RNG"
  entropy_bits: 128 # Minimum recommended
  format: "Base64url encoded"
  predictability: "MUST be non-deterministic"

Session Binding:
  user_binding: "REQUIRED - <user_id>:<session_id>"
  additional_identifiers: "Device fingerprint, IP validation"
  context_binding: "Request origin, user agent validation"
  
Session Lifecycle:
  expiration: "Configurable timeout policies"
  rotation: "After privilege escalation events"
  invalidation: "Immediate on security events"
  cleanup: "Automated expired session removal"
```

**傳輸安全：**  
- **強制 HTTPS**：所有會話通信皆採用 TLS 1.3  
- **安全 Cookie 屬性**：HttpOnly、Secure、SameSite=Strict  
- <strong>憑證固定</strong>：關鍵連線防範中間人攻擊

### **有狀態 vs 無狀態考量**

**有狀態實作：**  
- 共用會話狀態需進一步防護注入攻擊  
- 隊列式會話管理需驗證完整性  
- 多伺服器實例必須安全同步會話狀態

**無狀態實作：**  
- 使用 JWT 或相似令牌管理會話  
- 密碼學驗證會話狀態完整性  
- 攻擊面較小，但需強健的令牌驗證機制

## 4. **AI 專屬安全控制**

**解決的 OWASP MCP 風險包括：**  
- [MCP06 - 意圖流程竄改](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - 工具毒化](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - 指令注入與執行](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### <strong>防範提示注入攻擊</strong>

**整合 Microsoft Prompt Shields：**  
```yaml
Detection Mechanisms:
  - "Advanced ML-based instruction detection"
  - "Contextual analysis of external content"
  - "Real-time threat pattern recognition"
  
Protection Techniques:
  - "Spotlighting trusted vs untrusted content"
  - "Delimiter systems for content boundaries"  
  - "Data marking for content source identification"
  
Integration Points:
  - "Azure Content Safety service"
  - "Real-time content filtering"
  - "Threat intelligence updates"
```

**實作控制：**  
- <strong>輸入淨化</strong>：全面驗證與過濾所有用戶輸入  
- <strong>內容邊界定義</strong>：明確分隔系統指令與用戶內容  
- <strong>指令層級管理</strong>：適當設定衝突指令的優先順序  
- <strong>輸出監控</strong>：偵測潛在危害或被操控的輸出

### <strong>防止工具毒化</strong>

**工具安全框架：**  
```yaml
Tool Definition Protection:
  validation:
    - "Schema validation against expected formats"
    - "Content analysis for malicious instructions" 
    - "Parameter injection detection"
    - "Hidden instruction identification"
  
  integrity_verification:
    - "Cryptographic hashing of tool definitions"
    - "Digital signatures for tool packages"
    - "Version control with change auditing"
    - "Tamper detection mechanisms"
  
  monitoring:
    - "Real-time change detection"
    - "Behavioral analysis of tool usage"
    - "Anomaly detection for execution patterns"
    - "Automated alerting for suspicious modifications"
```

**動態工具管理：**  
- <strong>批准工作流程</strong>：工具變更需明確用戶同意  
- <strong>回滾功能</strong>：支援復原至先前工具版本  
- <strong>變更稽核</strong>：完整記錄工具定義修改歷史  
- <strong>風險評估</strong>：自動評估工具安全姿態

## 5. <strong>混淆代理攻擊防範</strong>

### **OAuth 代理安全**

**防範控制措施：**  
```yaml
Client Registration:
  static_client_protection:
    - "Explicit user consent for dynamic registration"
    - "Consent bypass prevention mechanisms"  
    - "Cookie-based consent validation"
    - "Redirect URI strict validation"
    
  authorization_flow:
    - "PKCE implementation (OAuth 2.1)"
    - "State parameter validation"
    - "Authorization code binding"
    - "Nonce verification for ID tokens"
```

**實作要求：**  
- <strong>用戶同意驗證</strong>：動態註冊客戶端不可跳過同意畫面  
- **重定向 URI 驗證**：嚴格白名單檢查重定向目標  
- <strong>授權碼保護</strong>：短期有效且只允許單次使用  
- <strong>客戶端身份驗證</strong>：嚴格驗證客戶端憑證與元資料

## 6. <strong>工具執行安全</strong>

### <strong>沙箱與隔離</strong>

**基於容器的隔離：**  
```yaml
Execution Environment:
  containerization: "Docker/Podman with security profiles"
  resource_limits:
    cpu: "Configurable CPU quotas"
    memory: "Memory usage restrictions"
    disk: "Storage access limitations"
    network: "Network policy enforcement"
  
  privilege_restrictions:
    user_context: "Non-root execution mandatory"
    capability_dropping: "Remove unnecessary Linux capabilities"
    syscall_filtering: "Seccomp profiles for syscall restriction"
    filesystem: "Read-only root with minimal writable areas"
```

**程序隔離：**  
- <strong>獨立程序環境</strong>：每個工具執行於隔離流程空間  
- <strong>進程間通信</strong>：安全的 IPC 機制及驗證  
- <strong>流程監控</strong>：運行時行為分析與異常偵測  
- <strong>資源限制</strong>：對 CPU、記憶體和 I/O 操作嚴格限制

### <strong>最小權限執行</strong>

**權限管理：**  
```yaml
Access Control:
  file_system:
    - "Minimal required directory access"
    - "Read-only access where possible"
    - "Temporary file cleanup automation"
    
  network_access:
    - "Explicit allowlist for external connections"
    - "DNS resolution restrictions" 
    - "Port access limitations"
    - "SSL/TLS certificate validation"
  
  system_resources:
    - "No administrative privilege elevation"
    - "Limited system call access"
    - "No hardware device access"
    - "Restricted environment variable access"
```

## 7. <strong>供應鏈安全控制</strong>

**解決的 OWASP MCP 風險**：[MCP04 - 軟件供應鏈攻擊及依賴性篡改](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### <strong>依賴性驗證</strong>

**全面的元件安全：**  
```yaml
Software Dependencies:
  scanning: 
    - "Automated vulnerability scanning (GitHub Advanced Security)"
    - "License compliance verification"
    - "Known vulnerability database checks"
    - "Malware detection and analysis"
  
  verification:
    - "Package signature verification"
    - "Checksum validation"
    - "Provenance attestation"
    - "Software Bill of Materials (SBOM)"

AI Components:
  model_verification:
    - "Model provenance validation"
    - "Training data source verification" 
    - "Model behavior testing"
    - "Adversarial robustness assessment"
  
  service_validation:
    - "Third-party API security assessment"
    - "Service level agreement review"
    - "Data handling compliance verification"
    - "Incident response capability evaluation"
```

### <strong>持續監控</strong>

**供應鏈威脅偵測：**  
- <strong>依賴性健康監測</strong>：持續評估所有依賴元件安全性問題  
- <strong>威脅情報整合</strong>：實時更新新興供應鏈威脅情報  
- <strong>行為分析</strong>：偵測外部元件異常行為  
- <strong>自動反應</strong>：即時控制受損元件

## 8. <strong>監控與偵測控制</strong>

**解決的 OWASP MCP 風險**：[MCP08 - 缺乏稽核及遙測](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **安全資訊與事件管理（SIEM）**

**全面紀錄策略：**  
```yaml
Authentication Events:
  - "All authentication attempts (success/failure)"
  - "Token issuance and validation events"
  - "Session creation, modification, termination"
  - "Authorization decisions and policy evaluations"

Tool Execution:
  - "Tool invocation details and parameters"
  - "Execution duration and resource usage"
  - "Output generation and content analysis"
  - "Error conditions and exception handling"

Security Events:
  - "Potential prompt injection attempts"
  - "Tool poisoning detection events"
  - "Session hijacking indicators"
  - "Unusual access patterns and anomalies"
```

### <strong>即時威脅偵測</strong>

**行為分析：**  
- **用戶行為分析（UBA）**：偵測異常用戶存取模式  
- **實體行為分析（EBA）**：監控 MCP 伺服器和工具行為  
- <strong>機器學習異常偵測</strong>：AI 支援安全威脅識別  
- <strong>威脅情報關聯</strong>：比對已知攻擊模式與觀察到的活動

## 9. <strong>事件回應與復原</strong>

### <strong>自動回應能力</strong>

**即時回應措施：**  
```yaml
Threat Containment:
  session_management:
    - "Immediate session termination"
    - "Account lockout procedures"
    - "Access privilege revocation"
  
  system_isolation:
    - "Network segmentation activation"
    - "Service isolation protocols"
    - "Communication channel restriction"

Recovery Procedures:
  credential_rotation:
    - "Automated token refresh"
    - "API key regeneration"
    - "Certificate renewal"
  
  system_restoration:
    - "Clean state restoration"
    - "Configuration rollback"
    - "Service restart procedures"
```

### <strong>取證能力</strong>

**調查支援：**  
- <strong>審計軌跡保存</strong>：不可變且具密碼完整性的日誌  
- <strong>證據收集</strong>：自動蒐集相關安全資料  
- <strong>時間線重建</strong>：紀錄詳細的安全事件流程  
- <strong>影響評估</strong>：評估侵害範圍與資料曝光情況

## <strong>關鍵安全架構原則</strong>

### **多層防護（Defense in Depth）**
- <strong>多重安全層級</strong>：避免安全架構單點失效  
- <strong>冗餘控制</strong>：為關鍵功能提供重疊安全措施  
- <strong>失敗安全機制</strong>：系統遇到錯誤或攻擊時採用安全預設

### **零信任實作（Zero Trust）**
- **永不信任，持續驗證**：持續驗證所有實體和請求  
- <strong>最小權限原則</strong>：所有組件授予最低存取權限  
- <strong>微分段</strong>：細緻的網路及存取控制

### <strong>持續安全演進</strong>
- <strong>適應威脅態勢</strong>：定期更新以應對新興威脅  
- <strong>安全控制效能</strong>：持續評估與改進控制措施  
- <strong>規範遵循</strong>：符合不斷演進的 MCP 安全標準

---

## <strong>實作資源</strong>

### **官方 MCP 文件**
- [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP 安全最佳實務](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP 安全資源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 全面的 OWASP MCP 十大風險與 Azure 實作  
- [OWASP MCP 十大](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全風險說明  
- [MCP 安全峰會工作坊（Sherpa）](https://azure-samples.github.io/sherpa/) - MCP Azure 實戰安全訓練

### <strong>微軟安全解決方案</strong>
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub 進階安全性](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### <strong>安全標準</strong>
- [OAuth 2.0 安全最佳實務（RFC 9700）](https://datatracker.ietf.org/doc/html/rfc9700)  
- [大語言模型的 OWASP 十大](https://genai.owasp.org/)  
- [NIST 網絡安全框架](https://www.nist.gov/cyberframework)

---

> <strong>重要</strong>：本文件中的安全控制反映當前 MCP 規範（2025-11-25）。由於標準快速演進，請務必參考最新的 [官方文檔](https://spec.modelcontextprotocol.io/)。

## 下一步

- 返回：[安全模組總覽](./README.md)  
- 繼續至：[模組 3：入門](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->