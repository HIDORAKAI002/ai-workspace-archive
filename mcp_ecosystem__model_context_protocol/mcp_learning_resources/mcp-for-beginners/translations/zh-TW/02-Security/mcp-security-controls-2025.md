# MCP 安全控管 - 2026 年 2 月更新

> **目前標準**：本文件反映了 [MCP 規範 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) 的安全需求及官方 [MCP 安全最佳實踐](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)。

Model Context Protocol (MCP) 已經大幅成熟，強化的安全控管涵蓋傳統軟體安全及 AI 專屬威脅。本文檔提供了與 OWASP MCP 前十大風險框架一致的完整安全控管，以確保 MCP 實作安全。

## 🏔️ 實作安全訓練

為獲得實務安全實作經驗，我們建議使用 **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** — 透過「易受攻擊 → 利用 → 修復 → 驗證」的循環方法，引導您在 Azure 上保護 MCP 伺服器的完整旅程。

本文所有安全控管均符合 **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**，該指南提供參考架構及針對 OWASP MCP 前十風險的 Azure 專屬實作建議。

## **強制性安全要求**

### **MCP 規範中的關鍵禁止事項：**

> **禁止**：MCP 伺服器**不可**接受未明確為 MCP 伺服器所簽發的任何令牌  
>
> **禁止**：MCP 伺服器**不可**使用會話進行認證  
>
> **要求**：實作授權的 MCP 伺服器**必須**驗證所有進入的請求  
>
> **強制**：使用靜態客戶端 ID 的 MCP 代理伺服器**必須**對每個動態註冊的客戶端獲取使用者同意

---

## 1. **認證與授權控管**

### **外部身份提供者整合**

**目前 MCP 標準 (2025-11-25)** 允許 MCP 伺服器委派認證給外部身份提供者，這是安全性顯著提升：

**對應 OWASP MCP 風險**：[MCP07 - 認證與授權不足](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**安全優勢：**  
1. **消除自製認證風險**：避免自訂認證實作降低漏洞面  
2. **企業級安全**：利用像 Microsoft Entra ID 這樣安全成熟的身份提供者  
3. **集中式身份管理**：簡化用戶生命週期管理、存取控制及合規稽核  
4. **多重驗證**：繼承企業身份提供者的 MFA 能力  
5. **條件存取政策**：風險型存取控管與彈性認證

**實作要求：**  
- **令牌受眾驗證**：確認所有令牌明確簽發給 MCP 伺服器  
- **簽發者核驗**：驗證令牌簽發來源符合身份提供者  
- **簽章驗證**：令牌完整性密碼學驗證  
- **過期強制**：嚴格執行令牌有效期限制  
- **範圍驗證**：確認令牌具備所需操作權限

### **授權邏輯安全**

**關鍵控管項目：**  
- **完整授權稽核**：定期安全審查所有授權決策點  
- **安全預設**：授權邏輯無法明確決定時拒絕存取  
- **權限界限**：不同權限級別與資源存取明確分離  
- **稽核記錄**：授權決策完整記錄供安全監控  
- **定期存取審核**：週期檢視使用者權限及權限分配

## 2. **令牌安全及反令牌轉送控管**

**對應 OWASP MCP 風險**：[MCP01 - 令牌誤用與秘密外洩](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **防止令牌轉送**

**MCP 授權規範明確禁止**令牌轉送，因其帶來關鍵安全風險：

**安全風險詳列：**  
- **控管繞過**：跳過重要控管如流量限制、請求驗證及流量監控  
- **無法追蹤責任**：客戶端識別失效，稽核與事故調查受損  
- **代理外洩風險**：惡意者能利用伺服器為代理訪問未授權資料  
- **信任邊界突破**：破壞下游服務對令牌來源的信任假設  
- **橫向移動**：遭竊令牌橫跨多服務擴大攻擊範圍

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

### **安全令牌管理模式**

**最佳實務：**  
- **短生命週期令牌**：透過頻繁旋轉降低風險暴露窗  
- **即時發放**：僅於特定操作即時發給令牌  
- **安全存儲**：使用硬體安全模組(HSM)或安全金鑰庫  
- **令牌綁定**：盡可能將令牌綁定至特定用戶端、會話或操作  
- **監控與警示**：即時偵測令牌誤用或未授權存取模式

## 3. **會話安全控管**

### **防止會話劫持**

**攻擊向量：**  
- **會話注入劫持**：惡意事件注入共用會話狀態中  
- **會話冒用**：使用竊取的會話 ID 非法通過認證  
- **可恢復串流攻擊**：利用伺服器送事件恢復漏洞注入惡意內容

**必要會話控管：**  
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
- **強制 HTTPS**：所有會話通訊均使用 TLS 1.3  
- **安全 Cookie 屬性**：HttpOnly、Secure、SameSite=Strict  
- **憑證固定**：關鍵連線避免中間人攻擊

### **有狀態與無狀態考量**

**有狀態實作：**  
- 共用會話狀態需嚴防注入攻擊  
- 使用佇列管理會話需驗證完整性  
- 複數伺服器實例需安全同步會話狀態

**無狀態實作：**  
- 使用 JWT 或類似令牌管理會話  
- 密碼學驗證會話狀態的完整性  
- 攻擊面較小但需強化令牌驗證機制

## 4. **AI 專屬安全控管**

**對應 OWASP MCP 風險：**  
- [MCP06 - 透過上下文負載發動提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - 工具中毒](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - 命令注入與執行](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **防護提示注入**

**Microsoft Prompt Shields 整合：**  
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
- **輸入淨化**：全面驗證與過濾所有使用者輸入  
- **內容界限定義**：明確分隔系統指令與使用者內容  
- **指令階層**：建立衝突指令的優先規則  
- **輸出監控**：偵測潛在危害或被操控的輸出

### **防止工具中毒**

**工具安全架構：**  
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
- **審批工作流程**：用戶對工具修改的明確同意  
- **回滾能力**：能還原至先前工具版本  
- **變更稽核**：完整工具定義變更記錄  
- **風險評估**：自動評估工具安全狀態

## 5. **防止混淆代理攻擊**

### **OAuth 代理安全**

**防禦控管：**  
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
- **用戶同意驗證**：動態客戶端註冊絕不跳過同意頁面  
- **重定向 URI 驗證**：嚴格白名單驗證重定向目標  
- **授權碼保護**：短命且限用一次的授權碼  
- **用戶端身份核驗**：強化用戶端認證與元資料驗證

## 6. **工具執行安全**

### **沙盒與隔離**

**容器隔離：**  
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
- **獨立處理程序空間**：每項工具執行於隔離程序中  
- **進程間通信**：安全通信機制並驗證資料  
- **程序監控**：執行階段行為分析與異常偵測  
- **資源限制**：CPU、記憶體及 I/O 使用硬限制

### **最小權限原則執行**

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

## 7. **供應鏈安全控管**

**對應 OWASP MCP 風險**：[MCP04 - 供應鏈攻擊](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **相依性驗證**

**元件安全全面性：**  
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

### **持續監控**

**供應鏈威脅偵測：**  
- **依賴健康監控**：持續評估所有相依元件的安全狀況  
- **威脅情報整合**：即時更新最新供應鏈威脅  
- **行為分析**：偵測外部元件異常行為  
- **自動回應**：立即隔離遭攻擊元件

## 8. **監控與偵測控管**

**對應 OWASP MCP 風險**：[MCP08 - 缺乏稽核與遙測](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **安全資訊事件管理 (SIEM)**

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

### **即時威脅偵測**

**行為分析：**  
- **使用者行為分析 (UBA)**：偵測異常用戶存取行為  
- **實體行為分析 (EBA)**：監控 MCP 伺服器和工具行為  
- **機器學習異常偵測**：AI 支援的安全威脅識別  
- **威脅情報關聯**：比對已知攻擊模式與觀察異動

## 9. **事件回應與復原**

### **自動化回應能力**

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

### **取證能力**

**調查支援：**  
- **稽核軌跡保護**：不可變更日誌與密碼學完整性  
- **證據收集**：自動化收集相關安全資訊  
- **時間軸重建**：事件發生的詳細序列還原  
- **影響評估**：評估安全事件範圍與資料外洩

## **關鍵安全架構原則**

### **深度防禦**  
- **多重安全層**：安全架構無單一失敗點  
- **冗餘控管**：重要功能重疊安全防護  
- **安全預設**：系統遭遇錯誤或攻擊時維持安全狀態

### **零信任實施**  
- **永不信任，持續驗證**：對所有實體及請求進行持續驗證  
- **最小權限原則**：所有元件最小存取權限  
- **微分段**：細緻的網路與存取控管

### **持續安全演進**  
- **威脅情勢調整**：定期更新以應對新興威脅  
- **控管效能評估**：持續檢視並優化安全控管  
- **規範遵循**：與演進中的 MCP 安全標準保持一致

---

## **實作資源**

### **官方 MCP 文件**  
- [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP 安全最佳實踐](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP 安全資源**  
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP 前十大風險與 Azure 實作說明  
- [OWASP MCP 前十大](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全風險  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - MCP Azure 實務安全訓練

### **微軟安全方案**  
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **安全標準**  
- [OAuth 2.0 安全最佳實務 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP 大型語言模型前十大](https://genai.owasp.org/)  
- [NIST 網路安全框架](https://www.nist.gov/cyberframework)

---

> **重要**：這些安全控管依據當前 MCP 規範 (2025-11-25)。請務必參考最新 [官方文件](https://spec.modelcontextprotocol.io/) ，因標準快速演進中。

## 接下來

- 返回：[安全模組總覽](./README.md)
- 繼續閱讀：[模組 3：快速入門](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件係使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們致力於提高翻譯的準確性，但請注意，機器翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們不對因使用本翻譯所引起的任何誤解或誤釋負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->