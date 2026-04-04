# MCP 安全控制 - 2026 年 2 月更新

> **當前標準**：本文檔反映了 [MCP 規範 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) 的安全需求和官方 [MCP 安全最佳實踐](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)。

Model Context Protocol (MCP) 已大幅成熟，強化了既涵蓋傳統軟件安全，也針對 AI 特定威脅的安全控制。本文檔提供完善的安全控制，適用於符合 OWASP MCP Top 10 框架的安全 MCP 實施。

## 🏔️ 實操安全訓練

為獲得實際的安全實施經驗，我們推薦 **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** —— 一個透過「易受攻擊 → 利用 → 修復 → 驗證」方法，全面指導如何在 Azure 中保護 MCP 伺服器的實戰探險。

本文所有安全控制均與 **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** 保持一致，該指南提供 OWASP MCP Top 10 風險的參考架構及 Azure 專屬實施指導。

## **強制性安全需求**

### **MCP 規範中的關鍵禁令：**

> **禁止**：MCP 伺服器**不得**接受未明確為該 MCP 伺服器發行的任何 token  
>
> **禁止**：MCP 伺服器**不得**使用 session 作為認證手段  
>
> **必須**：實施授權的 MCP 伺服器**必須**驗證所有入站請求  
>
> **強制**：使用靜態客戶端 ID 的 MCP 代理伺服器**必須**為每個動態註冊客戶端取得用戶同意

---

## 1. **認證與授權控制**

### **外部身份提供者整合**

**當前 MCP 標準 (2025-11-25)** 允許 MCP 伺服器將認證委派給外部身份提供者，這是重大安全改進：

**針對的 OWASP MCP 風險**：[MCP07 - 認證與授權不足](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**安全效益：**
1. **消除自訂認證風險**：減少因自訂認證實現帶來的漏洞面
2. **企業級安全性**：利用 Microsoft Entra ID 等成熟身份提供者的高級安全功能
3. **集中身份管理**：簡化用戶生命週期管理、存取控制及合規審計
4. **多因素認證**：繼承企業身份提供者的 MFA 能力
5. **條件存取政策**：獲益於基於風險的存取控制及自適應認證

**實施要求：**
- **Token 受眾驗證**：驗證所有 token 明確為 MCP 伺服器所發行
- **發行者驗證**：確認 token 發行者與預期身份提供者一致
- **簽名驗證**：對 token 進行密碼學完整性驗證
- **過期強制**：嚴格執行 token 有效期限限制
- **範圍驗證**：確保 token 含有訪問所請求操作的適當權限

### **授權邏輯安全**

**關鍵控制：**
- **全面授權審計**：定期進行授權決策點的安全檢查
- **失效安全預設**：當授權邏輯無法明確決定時拒絕存取
- **權限邊界**：明確區分不同特權層級與資源存取範圍
- **審計日誌**：完整記錄所有授權決策以供安全監控
- **定期存取審查**：週期性驗證用戶權限和特權分配

## 2. **Token 安全與禁止直通控制**

**針對 OWASP MCP 風險**：[MCP01 - Token 管理不善與秘密洩露](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **禁止 Token 直通**

**MCP 授權規範明文禁止** token 直通，因其帶來嚴重安全風險：

**風險詳述：**
- **繞過控管**：繞過速率限制、請求驗證和流量監控等重要安全控制
- **問責制崩壞**：無法識別客戶端身份，破壞審計追蹤與事件調查
- **代理挾持外洩**：使惡意者藉由伺服器作為代理進行未授權的資料存取
- **信任邊界破裂**：破壞下游服務對 token 來源的信任假設
- **側向擴散**：被竊 token 可於多服務間擴大攻擊範圍

**實施控制：**
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

### **安全 Token 管理模式**

**最佳實踐：**
- **短效期 Token**：頻繁輪替以縮短暴露時間窗
- **即時發行**：僅於特定操作需要時發放 token
- **安全存儲**：使用硬體安全模組(HSM)或安全金鑰庫
- **Token 綁定**：盡可能綁定 token 至特定客戶端、會話或操作
- **監控與警報**：實時偵測 token 濫用或未授權存取行為

## 3. **會話安全控制**

### **防止會話挾持**

**攻擊途徑：**
- **會話挾持提示注入**：惡意事件注入至共享會話狀態
- **會話冒充**：竊取會話 ID 後未授權使用以繞過認證
- **可恢復資料流攻擊**：濫用伺服器發送事件的續傳機制注入惡意內容

**必須的會話控制：**
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
- **TLS 1.3 強制使用 HTTPS**：所有會話通信均需採用
- **安全 Cookie 屬性**：HttpOnly、Secure、SameSite=Strict
- **憑證鎖定**：關鍵連線防止中間人攻擊

### **有狀態與無狀態考量**

**有狀態實作：**
- 共享狀態需額外防範注入攻擊
- 隊列式會話管理需驗證完整性
- 多伺服器部署需安全同步會話狀態

**無狀態實作：**
- 基於 JWT 或類似 token 進行會話管理
- 會話狀態的密碼學完整性驗證
- 攻擊面較小但需強健 token 驗證

## 4. **AI 專屬安全控制**

**針對 OWASP MCP 風險：**
- [MCP06 - 透過上下文負載的提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - 工具毒化](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - 命令注入與執行](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **提示注入防禦**

**Microsoft Prompt Shields 集成：**
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

**實施控制：**
- **輸入淨化**：全面驗證並過濾所有用戶輸入
- **內容邊界定義**：清楚分離系統指令與用戶內容
- **指令層次規則**：妥善處理衝突指令的優先權
- **輸出監控**：偵測潛在有害或遭操控的輸出

### **工具毒化防範**

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
- **批准流程**：工具修改須經用戶明示同意
- **回滾功能**：能回復至先前工具版本
- **變更審計**：完整記錄工具定義的修改歷史
- **風險評估**：自動評估工具安全狀態

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

**實施要求：**
- **用戶同意驗證**：不跳過動態客戶端註冊的同意頁面
- **重定向 URI 驗證**：嚴格白名單控管重定向目的地
- **授權碼保護**：短效且一次性使用的授權碼
- **客戶端身份驗證**：強健驗證客戶端資格與元資料

## 6. **工具執行安全**

### **沙箱與隔離**

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

**進程隔離：**
- **獨立進程上下文**：每個工具執行於隔離的進程空間
- **進程間通訊**：安全且驗證的 IPC 機制
- **進程監控**：運行時行為分析與異常偵測
- **資源限制**：對 CPU、記憶體及 I/O 操作設置嚴格限制

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

**針對 OWASP MCP 風險**：[MCP04 - 供應鏈攻擊](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **依賴性驗證**

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
- **依賴健康監控**：持續評估所有依賴的安全狀況
- **威脅情報整合**：即時掌握新興供應鏈威脅
- **行為分析**：偵測外部元件的異常行為
- **自動反應**：立即遏止受損元件

## 8. **監控與偵測控制**

**針對 OWASP MCP 風險**：[MCP08 - 缺乏審計與遙測](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

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

### **實時威脅偵測**

**行為分析：**
- **用戶行為分析 (UBA)**：發現異常用戶存取模式
- **實體行為分析 (EBA)**：監控 MCP 伺服器與工具行為
- **機器學習異常偵測**：AI 驅動的安全威脅識別
- **威脅情報關聯**：比對已知攻擊模式與觀察活動

## 9. **事件回應與恢復**

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

### **鑑識能力**

**調查支援：**
- **審計軌跡保存**：不可變且具密碼學完整性的日誌
- **證據收集**：自動聚集相關安全證物
- **時間線重建**：還原安全事件的詳細事件序列
- **影響評估**：評估妥協範圍與資料曝露程度

## **關鍵安全架構原則**

### **深度防禦**
- **多層安全防護**：安全架構無單點故障
- **冗餘控管**：重要功能設置重疊安全措施
- **失效安全機制**：系統遇錯誤或攻擊維持安全預設狀態

### **零信任實施**
- **永不信任，持續驗證**：對所有實體與請求持續驗證
- **最小權限原則**：所有組件具最低必要訪問權限
- **微分段**：粒度細緻的網絡及存取控制

### **持續安全演進**
- **威脅環境適應**：定期更新以應對新興威脅
- **安全控制效能**：持續評估並改善控制措施
- **規範合規**：符合不斷發展的 MCP 安全標準

---

## **實施資源**

### **官方 MCP 文件**
- [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳實踐](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP 安全資源**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - 名人陣容的 OWASP MCP Top 10 與 Azure 實現
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全風險
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - MCP 在 Azure 上的實操安全訓練

### **Microsoft 安全解決方案**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub 高級安全](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **安全標準**
- [OAuth 2.0 安全最佳實踐 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP 大型語言模型 Top 10](https://genai.owasp.org/)
- [NIST 網絡安全框架](https://www.nist.gov/cyberframework)

---

> **重要提示**：這些安全控制基於當前 MCP 規範 (2025-11-25)。隨標準快速演進，請務必參照最新的[官方文件](https://spec.modelcontextprotocol.io/)確認。

## 下一步

- 返回：[安全模組總覽](./README.md)
- 繼續至：[Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。儘管我們力求準確，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於關鍵資訊，建議使用專業人工翻譯。如因使用本翻譯而引致任何誤解或錯誤詮釋，我們概不負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->