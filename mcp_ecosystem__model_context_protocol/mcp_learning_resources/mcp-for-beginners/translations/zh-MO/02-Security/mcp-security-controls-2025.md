# MCP 安全控制 - 2026 年 2 月更新

> **當前標準**：本文件反映了[MCP 規範 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)的安全需求及官方[MCP 安全最佳實踐](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)。

模型上下文協議（MCP）已顯著成熟，提供加強的安全控制，涵蓋傳統軟件安全及 AI 特定威脅。本文件提供與 OWASP MCP Top 10 框架保持一致的全面安全控制，確保 MCP 實施安全。

## 🏔️ 實作安全訓練

為獲取實作安全經驗，我們推薦**[MCP 安全高峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/)**——一個全面引導的 Azure MCP 伺服器安全探索，採用「易受攻擊 → 利用漏洞 → 修復 → 驗證」的方法。

本文件中所有安全控制均與**[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)**對齊，該指南提供 OWASP MCP Top 10 風險的參考架構及 Azure 特定實施指導。

## **強制性安全要求**

### **MCP 規範中的嚴重禁止事項：**

> **禁止**：MCP 伺服器**不得**接受任何未明確為 MCP 伺服器簽發的令牌  
>
> **禁止**：MCP 伺服器**不得**使用 session 作為身份驗證  
>
> **要求**：實作授權的 MCP 伺服器**必須**驗證所有入站請求  
>
> **強制**：使用靜態客戶端 ID 的 MCP 代理伺服器**必須**為每個動態註冊的客戶端取得用戶同意  

---

## 1. **身份驗證與授權控制**

### **外部身份提供者整合**

**當前 MCP 標準 (2025-11-25)** 允許 MCP 伺服器將身份驗證委派給外部身份提供者，這是重大安全改善：

**OWASP MCP 解決風險**：[MCP07 - 身份驗證與授權不足](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**安全成效：**  
1. **排除自訂身份驗證風險**：避免自訂身份驗證實作帶來的弱點  
2. **企業級安全**：利用具高級安全特性的 Microsoft Entra ID 等既有身份提供者  
3. **集中身份管理**：簡化用戶生命週期管理、存取控制及合規稽核  
4. **多因素身份驗證**：繼承企業身份提供者的 MFA 能力  
5. **條件存取政策**：享有基於風險的存取控管與自適應身份驗證  

**實作要求：**  
- **令牌受眾驗證**：核實所有令牌為明確簽發給 MCP 伺服器  
- **簽發者驗證**：辨別令牌簽發者與預期身份提供者相符  
- **簽名驗證**：令牌完整性之密碼學驗證  
- **過期強制**：嚴格執行令牌有效期限限制  
- **範圍驗證**：確保令牌包含執行要求操作的適當權限  

### **授權邏輯安全**

**關鍵控制點：**  
- **全面授權稽核**：定期安全檢查所有授權決策點  
- **安全失效預設**：授權邏輯無法確定時拒絕存取  
- **權限邊界**：明確區分不同權限層級與資源存取  
- **稽核記錄**：完整記錄所有授權決策供安全監控  
- **定期存取審查**：週期性驗證用戶權限及權限指派  

## 2. **令牌安全與反直通控制**

**OWASP MCP 解決風險**：[MCP01 - 令牌管理不善與機密洩露](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **阻止令牌直通**

MCP 授權規範明確禁止**令牌直通**，其原因係重大安全風險：

**解決的安全風險：**  
- **控管規避**：繞過關鍵安全控管如速率限制、請求驗證與流量監控  
- **追責中斷**：無法識別客戶端，損害稽核及事件調查  
- **代理外洩**：惡意者利用伺服器做為未授權數據代理取得  
- **信任邊界破壞**：違反下游服務對令牌來源的信任假設  
- **橫向移動**：多服務間令牌受害導致攻擊擴散  

**實作控制：**  
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

**最佳實踐：**  
- **短命令牌**：透過頻繁令牌輪替減少曝露窗  
- **即需發行**：僅在執行特定操作時才簽發令牌  
- **安全存儲**：採用硬體安全模組(HSM)或安全金鑰庫  
- **令牌綁定**：令牌盡可能綁定特定客戶端、會話或操作  
- **監控及警示**：即時偵測令牌誤用或未授權訪問行為  

## 3. **會話安全控制**

### **防止會話搶奪**

**攻擊向量涵蓋：**  
- **會話搶奪提示注入**：在共享會話狀態注入惡意事件  
- **會話冒充**：未授權使用被盜會話 ID 繞過身份驗證  
- **可續流攻擊**：利用伺服器事件恢復注入惡意內容  

**強制會話控制：**  
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
- **強制 HTTPS**：所有會話通信均採用 TLS 1.3  
- **安全 Cookie 屬性**：HttpOnly、Secure、SameSite=Strict  
- **憑證鎖定**：對關鍵連接防止中間人攻擊  

### **有狀態與無狀態考量**

**有狀態實作：**  
- 共享會話狀態需額外防護注入攻擊  
- 基於佇列的會話管理需完整性驗證  
- 多伺服器環境需安全同步會話狀態  

**無狀態實作：**  
- 採用 JWT 或類似令牌管理會話  
- 依賴密碼學驗證會話狀態完整性  
- 減少攻擊面，但要求嚴謹令牌驗證  

## 4. **AI 特定安全控制**

**解決的 OWASP MCP 風險：**  
- [MCP06 - 利用情境有效負載的提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - 工具中毒](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - 命令注入與執行](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)  

### **提示注入防護**

**Microsoft 提示護盾整合：**  
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
- **輸入清理**：全面驗證及過濾所有用戶輸入  
- **內容邊界定義**：系統指令與用戶內容明確分隔  
- **指令層級**：妥善定義衝突指令之優先權  
- **輸出監測**：偵測潛在有害或被操控輸出  

### **防範工具中毒**

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
- **審核流程**：明確要求用戶同意工具變更  
- **回滾機制**：可還原至先前工具版本  
- **變更稽核**：完整記錄工具定義修改歷史  
- **風險評估**：自動評估工具安全態勢  

## 5. **混淆代理攻擊防範**

### **OAuth 代理安全**

**攻擊防範控制：**  
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
- **用戶同意驗證**：動態客戶端註冊絕不跳過同意畫面  
- **重定向 URI 驗證**：嚴格白名單篩選重定向目標  
- **授權碼保護**：授權碼壽命短且限制單次使用  
- **客戶端身份驗證**：強力核實客戶憑證和元資料  

## 6. **工具執行安全**

### **沙箱與隔離**

**基於容器隔離：**  
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
- **獨立進程環境**：每個工具執行於隔離進程空間  
- **進程間通訊**：安全且驗證的 IPC 機制  
- **進程監控**：運行時行為分析與異常偵測  
- **資源限制**：嚴格限制 CPU、記憶體與 I/O 使用  

### **最小權限實施**

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
  
## 7. **供應鏈安全控制**

**OWASP MCP 解決風險**：[MCP04 - 供應鏈攻擊](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **相依性驗證**

**全面元件安全：**  
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
- **相依性健康監控**：持續評估所有相依元件安全性  
- **威脅情報整合**：即時更新最新供應鏈威脅資訊  
- **行為分析**：偵測外部元件非正常行為  
- **自動應變**：即時隔離受損元件  

## 8. **監控與偵測控制**

**OWASP MCP 解決風險**：[MCP08 - 缺乏稽核與遙測](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

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
  
### **即時威脅偵測**

**行為分析：**  
- **用戶行為分析 (UBA)**：偵測異常用戶存取模式  
- **實體行為分析 (EBA)**：監控 MCP 伺服器及工具行為  
- **機器學習異常偵測**：利用 AI 識別安全威脅  
- **威脅情報關聯**：比對觀察到活動與已知攻擊模式  

## 9. **事件回應與復原**

### **自動化回應能力**

**即時回應行動：**  
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
  
### **鑑識能力**

**調查支持：**  
- **稽核軌跡保存**：不可變更並具密碼學保障的日誌  
- **證據蒐集**：自動采集相關安全工件  
- **時間軸重建**：安全事件完整事件序列  
- **影響評估**：評估侵害範圍與資料曝光程度  

## **關鍵安全架構原則**

### **深度防禦**
- **多層安全防護**：架構中無單點失效  
- **冗餘控管**：關鍵功能多重安全措施重疊  
- **安全失效機制**：系統錯誤或攻擊時採用安全預設  

### **零信任實施**
- **不輕信，持續驗證**：連續驗證所有實體與請求  
- **最小權限原則**：所有元件取得最低必要權限  
- **微分段**：細緻網路及存取控制  

### **持續安全演進**
- **威脅環境適應**：定期更新以因應新興威脅  
- **控制效果評估**：持續檢視並改進安全控制  
- **規範合規**：與演進中的 MCP 安全標準對齊  

---

## **實作資源**

### **官方 MCP 文件**
- [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP 安全最佳實踐](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  

### **OWASP MCP 安全資源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 全面 OWASP MCP Top 10 及 Azure 實作  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全風險  
- [MCP 安全高峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) - MCP 在 Azure 上實作安全培訓  

### **Microsoft 安全解決方案**
- [Microsoft 提示護盾](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure 內容安全](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub 進階安全](https://github.com/security/advanced-security)  
- [Azure 金鑰庫](https://learn.microsoft.com/azure/key-vault/)  

### **安全標準**
- [OAuth 2.0 安全最佳實踐 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP 大型語言模型十忌](https://genai.owasp.org/)  
- [NIST 網絡安全框架](https://www.nist.gov/cyberframework)  

---

> **重要**：這些安全控制基於當前 MCP 規範 (2025-11-25)。標準迅速演進，請務必參照最新[官方文件](https://spec.modelcontextprotocol.io/)驗證。

## 下一步

- 返回：[安全模組概覽](./README.md)
- 繼續閱讀: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件乃使用人工智能翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們致力於確保準確性，但請注意，自動翻譯可能包含錯誤或不準確之處。原始語言文件應視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->