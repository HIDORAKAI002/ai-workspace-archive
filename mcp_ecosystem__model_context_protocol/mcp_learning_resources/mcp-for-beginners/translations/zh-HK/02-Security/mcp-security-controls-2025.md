# MCP 安全控制 - 2026 年 2 月更新

> <strong>當前標準</strong>：本文件反映了 [MCP 規範 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) 的安全要求以及官方 [MCP 安全最佳實踐](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)。

Model Context Protocol（MCP）已顯著成熟，增強的安全控制涵蓋了傳統軟件安全及 AI 專屬威脅。本文件提供與 OWASP MCP Top 10 框架一致的全面安全控管，以實現安全的 MCP 實現。

## 🏔️ 實戰安全培訓

為獲得實務操作安全實施經驗，我們推薦 **[MCP 安全峰會工作坊（Sherpa）](https://azure-samples.github.io/sherpa/)** — 一場引導式深度探險，使用「易受攻擊 → 利用 → 修復 → 驗證」方法在 Azure 中保護 MCP 伺服器。

本文件中的所有安全控管均與 **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)** 保持一致，該指南提供 OWASP MCP Top 10 風險的參考架構與 Azure 特化實施指導。

## <strong>強制性安全要求</strong>

### **MCP 規範中的關鍵禁止事項：**

> <strong>禁止</strong>：MCP 伺服器<strong>不得</strong>接受任何未明確簽發給 MCP 伺服器的令牌
>
> <strong>禁止</strong>：MCP 伺服器<strong>不得</strong>使用會話作為身份驗證
>
> <strong>必需</strong>：實現授權的 MCP 伺服器<strong>必須</strong>驗證所有入站請求
>
> <strong>強制</strong>：使用靜態用戶端 ID 的 MCP 代理伺服器<strong>必須</strong>對每個動態註冊的用戶端取得用戶同意

---

## 1. <strong>身份驗證與授權控管</strong>

### <strong>外部身份提供者整合</strong>

<strong>當前 MCP 標準（2025-11-25）</strong>允許 MCP 伺服器委派身份驗證給外部身份提供者，這是重大的安全進步：

**解決的 OWASP MCP 風險**：[MCP07 - 身份驗證和授權不足](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**安全優勢：**
1. <strong>消除自訂身份驗證風險</strong>：透過避免自訂身份驗證實作減少漏洞面
2. <strong>企業級安全</strong>：採用具先進安全功能的既有身份提供者，如 Microsoft Entra ID
3. <strong>集中身份管理</strong>：簡化用戶生命週期管理、存取控管與合規審計
4. <strong>多因素驗證</strong>：繼承企業身份提供者的 MFA 功能
5. <strong>條件存取政策</strong>：受惠於風險式存取控制和自適應身份驗證

**實作要求：**
- <strong>令牌受眾驗證</strong>：確認所有令牌皆明確簽發給 MCP 伺服器
- <strong>簽發者驗證</strong>：驗證令牌簽發者符合期望身份提供者
- <strong>簽章驗證</strong>：加密驗證令牌完整性
- <strong>過期強制</strong>：嚴格執行令牌生命週期限制
- <strong>範圍驗證</strong>：確認令牌包含執行請求所需權限

### <strong>授權邏輯安全</strong>

**關鍵控管：**
- <strong>全面授權審核</strong>：定期進行所有授權決策點的安全審查
- <strong>失敗安全預設</strong>：授權邏輯無法做明確決定時拒絕存取
- <strong>權限邊界</strong>：清晰區分不同特權層級與資源存取
- <strong>審計日誌</strong>：完整記錄所有授權決策以便安全監控
- <strong>定期存取審核</strong>：週期性驗證用戶權限與特權分配

## 2. <strong>令牌安全與防直通控管</strong>

**解決的 OWASP MCP 風險**：[MCP01 - 令牌管理不當及機密洩漏](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### <strong>防止令牌直通</strong>

**令牌直通在 MCP 授權規範中明令禁止**，因關鍵安全風險：

**解決的安全風險：**
- <strong>控管避開</strong>：繞過必要安全控制如速率限制、請求驗證、流量監控
- <strong>責任歸屬失效</strong>：無法識別用戶端，損害審計軌跡與事故調查
- <strong>代理外洩</strong>：惡意操作使用伺服器作為未授權資料存取代理
- <strong>信任邊界違反</strong>：破壞下游服務對令牌來源的信任預設
- <strong>橫向移動</strong>：遭洩露令牌在多服務間擴大攻擊範圍

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

**最佳實踐：**
- <strong>短效令牌</strong>：頻繁輪換令牌以縮短暴露窗口
- <strong>即需發行</strong>：只在特定操作時頒發令牌
- <strong>安全儲存</strong>：使用硬體安全模組（HSM）或安全金鑰庫
- <strong>令牌綁定</strong>：盡可能將令牌綁定至特定用戶端、會話或操作
- <strong>監控與警報</strong>：即時偵測令牌濫用或未授權存取行為

## 3. <strong>會話安全控管</strong>

### <strong>防止會話劫持</strong>

**防範攻擊向量：**
- <strong>會話劫持提示注入</strong>：惡意事件注入共享會話狀態
- <strong>會話冒充</strong>：未授權盜用會話 ID 以繞過身份驗證
- <strong>可恢復串流攻擊</strong>：利用伺服器推送事件恢復漏洞注入惡意內容

**強制會話控管：**
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
- **HTTPS 強制**：所有會話通信使用 TLS 1.3
- **安全 Cookie 屬性**：HttpOnly、Secure、SameSite=Strict
- <strong>憑證鎖定</strong>：關鍵連線防 MITM 攻擊

### **有狀態 vs 無狀態考量**

**有狀態實作：**
- 共享會話狀態需額外防護注入攻擊
- 排隊式會話管理需完整性驗證
- 多伺服器實例需安全同步會話狀態

**無狀態實作：**
- 使用 JWT 或相似令牌管理會話
- 用密碼學驗證會話狀態完整性
- 攻擊面較小，但需強健的令牌驗證

## 4. **AI 專屬安全控管**

**解決的 OWASP MCP 風險**：
- [MCP06 - 輸入提示流篡改](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - 工具中毒](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - 指令注入與執行](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### <strong>提示注入防禦</strong>

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
- <strong>輸入淨化</strong>：全面驗證及過濾所有用戶輸入
- <strong>內容邊界定義</strong>：系統指令與用戶內容明確分隔
- <strong>指令階層</strong>：合理優先規則處理衝突指令
- <strong>輸出監控</strong>：偵測潛在危險或被操控之輸出

### <strong>工具中毒防止</strong>

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
- <strong>批准流程</strong>：明確用戶同意工具修改
- <strong>回滾能力</strong>：恢復至先前工具版本
- <strong>變更審計</strong>：完整工具定義變更歷史
- <strong>風險評估</strong>：自動化評估工具安全狀態

## 5. <strong>防止混淆代理攻擊</strong>

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
- <strong>用戶同意驗證</strong>：動態用戶端註冊不得跳過同意畫面
- **重定向 URI 驗證**：嚴格白名單驗證重定向目標
- <strong>授權碼保護</strong>：短效且單用授權碼
- <strong>用戶端身份驗證</strong>：嚴格驗證用戶端憑證及元資料

## 6. <strong>工具執行安全</strong>

### <strong>沙箱與隔離</strong>

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

**程序隔離：**
- <strong>獨立程序上下文</strong>：每個工具執行於隔離的程序空間
- <strong>過程間通訊</strong>：使用安全且經驗證的 IPC
- <strong>程序監控</strong>：運行時行為分析及異常偵測
- <strong>資源限額</strong>：CPU、記憶體和 I/O 操作的嚴格限制

### <strong>最小權限實施</strong>

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

**解決的 OWASP MCP 風險**：[MCP04 - 軟體供應鏈攻擊與依賴篡改](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### <strong>依賴性驗證</strong>

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

### <strong>持續監控</strong>

**供應鏈威脅偵測：**
- <strong>依賴健康監測</strong>：持續評估所有依賴的安全狀況
- <strong>威脅情報整合</strong>：即時更新新興供應鏈威脅
- <strong>行為分析</strong>：檢測外部元件異常行為
- <strong>自動化反應</strong>：即刻遏止被入侵元件

## 8. <strong>監控與偵測控管</strong>

**解決的 OWASP MCP 風險**：[MCP08 - 缺乏審計與遙測](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **安全資訊與事件管理 (SIEM)**

**全面記錄策略：**
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
- **用戶行為分析 (UBA)**：偵測異常用戶存取模式
- **實體行為分析 (EBA)**：監控 MCP 伺服器與工具行為
- <strong>機器學習異常偵測</strong>：AI 驅動安全威脅識別
- <strong>威脅情報關聯</strong>：對照已知攻擊模式辨識活動

## 9. <strong>事件響應與恢復</strong>

### <strong>自動化響應能力</strong>

**即時響應措施：**
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
- <strong>審計軌跡保全</strong>：不可竄改且具加密完整性之日誌
- <strong>證據蒐集</strong>：自動收集相關安全證據
- <strong>事件時間線重建</strong>：詳述導致安全事件的事件序列
- <strong>影響評估</strong>：評估影響範圍及資料暴露程度

## <strong>關鍵安全架構原則</strong>

### <strong>深度防禦</strong>
- <strong>多層安全</strong>：安全架構無單點故障
- <strong>冗餘控管</strong>：關鍵功能多重安全措施重疊
- <strong>失效安全機制</strong>：系統錯誤或攻擊時安全預設

### <strong>零信任實施</strong>
- **永不信任，持續驗證**：不斷驗證所有實體和請求
- <strong>最小權限原則</strong>：所有元件皆享有最小存取權
- <strong>微分段</strong>：細粒度網路及存取控制

### <strong>持續安全演進</strong>
- <strong>威脅環境調整</strong>：定期更新以因應新興威脅
- <strong>安全控管效能</strong>：持續評估並改進控管成效
- <strong>規範合規</strong>：與演進中的 MCP 安全標準保持一致

---

## <strong>實作資源</strong>

### **官方 MCP 文件**
- [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳實踐](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP 安全資源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 完整 OWASP MCP Top 10 加 Azure 實作
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全風險
- [MCP 安全峰會工作坊（Sherpa）](https://azure-samples.github.io/sherpa/) - Azure MCP 實戰安全培訓

### **Microsoft 安全解決方案**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure 內容安全](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub 高級安全](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### <strong>安全標準</strong>
- [OAuth 2.0 安全最佳實踐 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [大型語言模型 OWASP Top 10](https://genai.owasp.org/)
- [NIST 網絡安全框架](https://www.nist.gov/cyberframework)

---

> <strong>重要</strong>：本安全控管反映當前 MCP 規範（2025-11-25）。標準持續快速演進，請務必參照最新 [官方文件](https://spec.modelcontextprotocol.io/) 進行驗證。

## 下一步

- 返回：[安全模組總覽](./README.md)
- 繼續：[模組 3：起步](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->