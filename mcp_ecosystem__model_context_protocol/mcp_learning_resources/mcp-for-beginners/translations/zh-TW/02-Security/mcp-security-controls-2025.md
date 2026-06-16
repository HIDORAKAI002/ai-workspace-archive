# MCP 安全控管 - 2026 年 2 月更新

> <strong>現行標準</strong>：本文件反映了 [MCP 規範 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) 的安全需求以及官方 [MCP 安全最佳實務](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)。

Model Context Protocol (MCP) 已顯著成熟，強化了既有軟體安全及 AI 專屬威脅的安全控管。本文檔提供了全面的安全控制，以支援符合 OWASP MCP 前十大風險框架的安全 MCP 實作。

## 🏔️ 實作式安全訓練

為獲得實務且動手的安全實作經驗，我們推薦 **[MCP 安全峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/)** — 一場全面引導式的探險旅程，教導如何用「易受攻擊 → 利用 → 修復 → 驗證」的方法，在 Azure 上保護 MCP 伺服器。

本文所有安全控管皆與 **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)** 對齊，該指南提供了參考架構以及針對 OWASP MCP 前十大風險的 Azure 實作指導。

## <strong>強制性安全要求</strong>

### **MCP 規範中的關鍵禁止事項：**

> <strong>禁止</strong>：MCP 伺服器 <strong>不得</strong> 接受未明確為該 MCP 伺服器核發的任何令牌  
>
> <strong>嚴禁</strong>：MCP 伺服器 <strong>不得</strong> 使用會話進行身份驗證  
>
> <strong>必要</strong>：實作授權的 MCP 伺服器 <strong>必須</strong> 驗證所有入站請求  
>
> <strong>強制</strong>：使用靜態客戶端 ID 的 MCP 代理伺服器 <strong>必須</strong> 取得用戶同意，用於每個動態註冊的客戶端

---

## 1. <strong>身份驗證與授權控管</strong>

### <strong>外部身份提供者整合</strong>

**現行 MCP 標準 (2025-11-25)** 允許 MCP 伺服器將身份驗證委派給外部身份提供者，這是重大安全改良：

**應對 OWASP MCP 風險**： [MCP07 - 不足的身份驗證與授權](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**安全優勢：**
1. <strong>消除自訂身份驗證風險</strong>：透過避免自訂身份驗證實作降低漏洞面
2. <strong>企業級安全等級</strong>：利用 Microsoft Entra ID 等成熟身份提供者的進階安全功能
3. <strong>集中式身份管理</strong>：簡化使用者生命週期管理、存取控制及合規稽核
4. **多因素驗證（MFA）**：繼承企業身份提供者的 MFA 功能
5. <strong>條件存取政策</strong>：支援風險基存取控制與自動化驗證

**實作要求：**
- <strong>令牌接收方驗證</strong>：驗證所有令牌僅限於為該 MCP 伺服器發行
- <strong>簽發者確認</strong>：確認令牌簽發者與預期身份提供者相符
- <strong>簽章驗證</strong>：透過密碼學驗證令牌完整性
- <strong>過期強制</strong>：嚴格執行令牌有效期限
- <strong>範圍驗證</strong>：確保令牌含有所需權限以完成請求操作

### <strong>授權邏輯安全</strong>

**關鍵控管：**
- <strong>全面授權稽核</strong>：定期審查所有授權決策點之安全
- <strong>失效安全預設</strong>：授權判斷不明確時，拒絕存取
- <strong>權限界限</strong>：明確分離各種權限等級與資源存取
- <strong>稽核日誌記錄</strong>：完整記錄所有授權決策以便監控
- <strong>定期權限審查</strong>：定期驗證用戶權限及權限分配

## 2. <strong>令牌安全與反透傳控管</strong>

**應對 OWASP MCP 風險**： [MCP01 - 令牌管理過失與秘密暴露](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### <strong>防止令牌透傳</strong>

<strong>MCP 授權規範明文禁止</strong>令牌透傳操作，因其帶來重大安全風險：

**所應對的安全風險：**
- <strong>控管繞過</strong>：跳過速率限制、請求驗證與流量監控等基本安全控管
- <strong>責任歸屬破裂</strong>：無法識別真正客戶端，嚴重妨礙稽核紀錄與事件偵查
- <strong>代理外洩</strong>：使惡意者能利用伺服器作為代理進行未授權的資料存取
- <strong>信任邊界違背</strong>：破壞下游服務對令牌來源的信任假設
- <strong>橫向移動</strong>：被攻破令牌可跨多服務擴大攻擊範圍

**實作控管：**
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
- <strong>短期令牌</strong>：頻繁輪替以降低暴露期間
- <strong>即時發行</strong>：僅於必要操作時授予令牌
- <strong>安全存儲</strong>：使用硬體安全模組（HSM）或安全金鑰庫
- <strong>令牌綁定</strong>：盡可能與特定客戶端、會話或操作綁定
- <strong>監控與警報</strong>：實時偵測令牌誤用或未授權存取行為

## 3. <strong>會話安全控管</strong>

### <strong>防止會話劫持</strong>

**攻擊向量：**
- <strong>注入惡意會話提示</strong>：注入惡意事件到共用會話狀態
- <strong>會話冒用</strong>：利用被盜會話 ID 違法繞過驗證
- <strong>可恢復串流攻擊</strong>：利用伺服器事件恢復機制注入惡意內容

**必要的會話控管：**
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
- **強制 HTTPS**：所有會話通訊使用 TLS 1.3
- **安全 Cookie 屬性**：HttpOnly, Secure, SameSite=Strict
- <strong>憑證綁定</strong>：針對關鍵連線防止中間人攻擊

### <strong>有狀態與無狀態考量</strong>

**有狀態實作：**
- 共用會話狀態須加強防注入攻擊
- 排隊式會話管理需確保資料完整性
- 多伺服器實例需安全同步會話狀態

**無狀態實作：**
- 利用 JWT 或類似令牌進行會話管理
- 密碼學驗證會話狀態完整性
- 攻擊面縮減，但需強健令牌驗證

## 4. **AI 專屬安全控管**

**應對 OWASP MCP 風險**：
- [MCP06 - 意圖流程顛覆](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - 工具中毒](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - 指令注入與執行](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### <strong>提示注入防禦</strong>

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

**實作控管：**
- <strong>輸入淨化</strong>：對所有用戶輸入進行全面驗證與過濾
- <strong>內容邊界定義</strong>：明確區分系統指令與用戶內容
- <strong>指令階層</strong>：衝突指令採用適當優先規則
- <strong>輸出監控</strong>：偵測可能有害或被操控的輸出

### <strong>防止工具中毒</strong>

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
- <strong>批准流程</strong>：工具更動需明確用戶同意
- <strong>回滾能力</strong>：可回復至先前版本
- <strong>變更稽核</strong>：完整記錄工具定義變更歷史
- <strong>風險評估</strong>：自動評估工具安全狀態

## 5. <strong>混淆代理人攻擊防範</strong>

### **OAuth 代理安全**

**攻擊防範控管：**
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
- <strong>用戶同意驗證</strong>：切勿跳過動態客戶端註冊的同意畫面
- **重導 URI 驗證**：嚴格使用白名單驗證重導目的地
- <strong>授權碼保護</strong>：授權碼短期有效且單次使用
- <strong>客戶端身份驗證</strong>：健全驗證客戶端憑證與元資料

## 6. <strong>工具執行安全</strong>

### <strong>沙盒與隔離</strong>

**容器化隔離：**
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

**進程隔離：**
- <strong>獨立進程環境</strong>：每個工具執行在分離的進程空間
- <strong>進程間通訊</strong>：使用經過驗證的安全 IPC 機制
- <strong>進程監控</strong>：運行時行為分析與異常偵測
- <strong>資源限制</strong>：限制 CPU、記憶體與 I/O 以防濫用

### <strong>最低權限原則執行</strong>

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

## 7. <strong>供應鏈安全控管</strong>

**應對 OWASP MCP 風險**： [MCP04 - 軟體供應鏈攻擊與依賴篡改](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### <strong>依賴項驗證</strong>

**全面組件安全審查：**
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
- <strong>依賴項健康監控</strong>：持續評估所有依賴的安全狀況
- <strong>威脅情報整合</strong>：即時更新新興供應鏈威脅資訊
- <strong>行為分析</strong>：偵測外部組件異常行為
- <strong>自動回應</strong>：即時封鎖被入侵組件

## 8. <strong>監控與偵測控管</strong>

**應對 OWASP MCP 風險**： [MCP08 - 缺乏審計與遙測](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **安全資訊與事件管理 (SIEM)**

**全面日誌策略：**
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
- **使用者行為分析 (UBA)**：偵測異常使用者存取模式
- **實體行為分析 (EBA)**：監控 MCP 伺服器與工具行為
- <strong>機器學習異常偵測</strong>：AI 驅動安全威脅識別
- <strong>威脅情報關聯</strong>：比對偵測活動與已知攻擊模式

## 9. <strong>事件應變與復原</strong>

### <strong>自動化回應能力</strong>

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

### <strong>鑑識能力</strong>

**調查支援：**
- <strong>稽核追蹤保存</strong>：不可變更的加密完整性日誌
- <strong>證據蒐集</strong>：自動收集相關安全資料
- <strong>事件時間線重建</strong>：詳盡揭示安全事件發展過程
- <strong>影響評估</strong>：評估入侵範圍與資料暴露程度

## <strong>關鍵安全架構原則</strong>

### <strong>深度防禦</strong>
- <strong>多層安全控管</strong>：架構中無單點失效
- <strong>冗餘控管</strong>：關鍵功能採用重複安全措施
- <strong>失敗安全機制</strong>：遭遇錯誤或攻擊時採取安全預設

### <strong>零信任實作</strong>
- **永不相信、持續驗證**：對所有實體及請求進行持續驗證
- <strong>最小權限原則</strong>：所有組件皆授予最少存取權限
- <strong>微分段</strong>：精細化網路及存取控管

### <strong>持續安全演進</strong>
- <strong>威脅環境適應</strong>：定期更新以因應新興威脅
- <strong>安全控管效能</strong>：持續評估與改進控制措施
- <strong>規範遵循</strong>：與不斷演化的 MCP 安全標準整合

---

## <strong>實作資源</strong>

### **官方 MCP 文件**
- [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳實務](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP 安全資源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) — 包含 Azure 實作的綜合 OWASP MCP 前十大風險
- [OWASP MCP 前十大風險](https://owasp.org/www-project-mcp-top-10/) — 官方 OWASP MCP 安全風險列表
- [MCP 安全峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) — MCP 在 Azure 的動手安全訓練

### <strong>微軟安全解決方案</strong>
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### <strong>安全標準</strong>
- [OAuth 2.0 安全最佳實務 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [大型語言模型的 OWASP 前十大風險](https://genai.owasp.org/)
- [NIST 網路安全框架](https://www.nist.gov/cyberframework)

---

> <strong>重要</strong>：這些安全控管反映了當前 MCP 規範 (2025-11-25)。由於標準快速演變，請務必參考最新的 [官方文件](https://spec.modelcontextprotocol.io/) 進行核對。

## 接下來

- 返回至：[安全模組概述](./README.md)
- 繼續至：[第三模組：起步](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->