# MCP 安全控制 - 2026年2月更新

> <strong>当前标准</strong>：本文档反映了[MCP 规格 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)的安全要求及官方[MCP安全最佳实践](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)。

Model Context Protocol (MCP) 已显著成熟，增强的安全控制同时涵盖传统软件安全与AI特定威胁。本文档提供与OWASP MCP Top 10框架一致的全面安全控制，用于安全的MCP实现。

## 🏔️ 实践安全培训

为了获得实际的安全实施经验，我们推荐<strong>[MCP安全峰会研讨会 (Sherpa)](https://azure-samples.github.io/sherpa/)</strong> — 使用“易受攻击 → 利用 → 修复 → 验证”方法论，全面指导如何在Azure中保障MCP服务器安全的实践探险。

本文档中所有安全控制均与<strong>[OWASP MCP Azure安全指南](https://microsoft.github.io/mcp-azure-security-guide/)</strong>保持一致，该指南提供了OWASP MCP Top 10风险的参考架构及Azure特定的实现指导。

## <strong>强制安全要求</strong>

### **MCP规格中的关键禁令：**

> <strong>禁止</strong>：MCP服务器<strong>不得</strong>接受任何未明确为MCP服务器签发的令牌  
>
> <strong>严禁</strong>：MCP服务器<strong>不得</strong>使用会话进行身份验证  
>
> <strong>要求</strong>：实现授权的MCP服务器<strong>必须</strong>验证所有入站请求  
>
> <strong>强制</strong>：使用静态客户端ID的MCP代理服务器<strong>必须</strong>为每个动态注册客户端获取用户同意

---

## 1. <strong>身份验证与授权控制</strong>

### <strong>外部身份提供者集成</strong>

<strong>当前MCP标准(2025-11-25)</strong>允许MCP服务器将身份验证委托给外部身份提供者，显著提升安全性：

**覆盖OWASP MCP风险**：[MCP07 - 身份验证和授权不足](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**安全优势：**  
1. <strong>避免自定义身份验证风险</strong>：减少因自定义身份验证实现而产生的攻击面  
2. <strong>企业级安全</strong>：利用像Microsoft Entra ID这样的成熟身份提供者及其高级安全特性  
3. <strong>集中身份管理</strong>：简化用户生命周期管理、权限控制和合规审计  
4. <strong>多因素认证</strong>：继承企业身份提供者的MFA功能  
5. <strong>条件访问策略</strong>：利用基于风险的访问控制和自适应身份验证

**实施要求：**  
- <strong>令牌受众验证</strong>：确保所有令牌明确签发给MCP服务器  
- <strong>发行者验证</strong>：验证令牌发行者匹配预期身份提供者  
- <strong>签名验证</strong>：对令牌完整性进行密码学验证  
- <strong>过期强制</strong>：严格执行令牌有效期限制  
- <strong>作用域验证</strong>：确保令牌包含用于请求操作的适当权限

### <strong>授权逻辑安全</strong>

**关键控制点：**  
- <strong>全面的授权审计</strong>：定期对所有授权决策点进行安全审查  
- <strong>故障安全默认</strong>：当授权逻辑无法做出明确决定时拒绝访问  
- <strong>权限边界</strong>：清晰分隔不同特权级别和资源访问  
- <strong>审计日志</strong>：完整记录所有授权决策以供安全监控  
- <strong>定期访问审查</strong>：定期验证用户权限及特权分配

## 2. <strong>令牌安全与反直通控制</strong>

**覆盖OWASP MCP风险**：[MCP01 - 令牌管理不善与秘密泄露](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### <strong>防止令牌直通</strong>

**MCP授权规格明确禁止令牌直通**，因其带来关键安全风险：

**涵盖的安全风险：**  
- <strong>绕过控制</strong>：绕开如速率限制、请求验证和流量监控等关键安全控制  
- <strong>责任断链</strong>：使客户端身份识别变得不可能，破坏审计链及事件调查  
- <strong>基于代理的数据外泄</strong>：允许恶意者利用服务器作为代理非法访问数据  
- <strong>信任边界违背</strong>：破坏下游服务对令牌来源的信任假设  
- <strong>横向移动</strong>：受损令牌在多服务间扩散导致攻击面扩大

**实施控制：**  
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

**最佳实践：**  
- <strong>短生命周期令牌</strong>：通过频繁旋转令牌最小化暴露窗口  
- <strong>即时发放</strong>：仅在执行特定操作时发放令牌  
- <strong>安全存储</strong>：使用硬件安全模块(HSM)或安全密钥库  
- <strong>令牌绑定</strong>：尽可能将令牌绑定到特定客户端、会话或操作  
- <strong>监控与报警</strong>：实时检测令牌滥用或未授权访问模式

## 3. <strong>会话安全控制</strong>

### <strong>防止会话劫持</strong>

**攻击向量涵盖：**  
- <strong>会话劫持提示注入</strong>：恶意事件注入共享会话状态  
- <strong>会话冒充</strong>：盗用会话ID绕过身份验证  
- <strong>可恢复流攻击</strong>：利用服务器发送事件恢复机制注入恶意内容

**强制会话控制：**  
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

**传输安全：**  
- **强制HTTPS**：所有会话通信均使用TLS 1.3  
- **安全Cookie属性**：HttpOnly、Secure、SameSite=Strict  
- <strong>证书绑定</strong>：关键连接使用防止中间人攻击的证书钉扎

### <strong>有状态与无状态考虑</strong>

**针对有状态实现：**  
- 共享会话状态需额外防护以防注入攻击  
- 基于队列的会话管理需要完整性验证  
- 多服务器实例必须安全同步会话状态

**针对无状态实现：**  
- 使用JWT或类似令牌管理会话  
- 会话状态需要密码学验证完整性  
- 降低攻击面，但需强健的令牌验证机制

## 4. **AI特有安全控制**

**覆盖OWASP MCP风险**：  
- [MCP06 - 提示流篡改](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - 工具投毒](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - 命令注入与执行](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### <strong>提示注入防御</strong>

<strong>微软提示盾集成</strong>：  
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

**实施控制：**  
- <strong>输入清理</strong>：全面验证和过滤所有用户输入  
- <strong>内容边界定义</strong>：系统指令与用户内容明确分隔  
- <strong>指令层级</strong>：冲突指令应用适当优先级规则  
- <strong>输出监控</strong>：检测潜在有害或被操纵的输出

### <strong>防止工具投毒</strong>

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

**动态工具管理：**  
- <strong>审批工作流</strong>：工具修改需用户明确同意  
- <strong>回滚功能</strong>：支持回退至先前工具版本  
- <strong>变更审计</strong>：完整记录工具定义变更历史  
- <strong>风险评估</strong>：自动评估工具安全态势

## 5. <strong>混淆代理攻击防范</strong>

### **OAuth代理安全**

**攻击防范控制：**  
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

**实施要求：**  
- <strong>用户同意验证</strong>：动态客户端注册绝不跳过同意界面  
- **重定向URI验证**：严格基于白名单验证重定向目的地  
- <strong>授权码保护</strong>：短时有效且一次性使用的授权码  
- <strong>客户端身份验证</strong>：强健验证客户端凭据和元数据

## 6. <strong>工具执行安全</strong>

### <strong>沙箱与隔离</strong>

**基于容器的隔离：**  
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

**进程隔离：**  
- <strong>独立进程上下文</strong>：每个工具执行在隔离的进程空间  
- <strong>进程间通信</strong>：安全的IPC机制及验证  
- <strong>进程监控</strong>：运行时行为分析与异常检测  
- <strong>资源限制</strong>：严格限制CPU、内存及I/O操作

### <strong>最小权限实施</strong>

**权限管理：**  
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

## 7. <strong>供应链安全控制</strong>

**覆盖OWASP MCP风险**：[MCP04 - 软件供应链攻击与依赖篡改](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### <strong>依赖性验证</strong>

**全面组件安全：**  
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

### <strong>持续监控</strong>

**供应链威胁检测：**  
- <strong>依赖健康监控</strong>：持续评估所有依赖的安全性  
- <strong>威胁情报整合</strong>：动态更新最新供应链威胁信息  
- <strong>行为分析</strong>：识别外部组件中异常行为  
- <strong>自动响应</strong>：立即遏制被破坏的组件

## 8. <strong>监控与检测控制</strong>

**覆盖OWASP MCP风险**：[MCP08 - 审计和遥测缺失](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **安全信息与事件管理（SIEM）**

**全面日志策略：**  
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

### <strong>实时威胁检测</strong>

**行为分析：**  
- **用户行为分析(UBA)**：检测异常用户访问模式  
- **实体行为分析(EBA)**：监控MCP服务器及工具行为  
- <strong>机器学习异常检测</strong>：AI辅助识别安全威胁  
- <strong>威胁情报关联</strong>：将观察到的活动与已知攻击模式匹配

## 9. <strong>事故响应与恢复</strong>

### <strong>自动响应能力</strong>

**即时响应措施：**  
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

### <strong>取证能力</strong>

**调查支持：**  
- <strong>审计轨迹保护</strong>：不可变且具密码学完整性的日志  
- <strong>证据收集</strong>：自动采集相关安全证物  
- <strong>时间线重建</strong>：详尽记录导致安全事件的事件序列  
- <strong>影响评估</strong>：评估妥协范围与数据泄露情况

## <strong>关键安全架构原则</strong>

### <strong>纵深防御</strong>  
- <strong>多层安全防护</strong>：安全架构无单点故障  
- <strong>冗余控制措施</strong>：关键功能重叠的安全控制  
- <strong>故障安全机制</strong>：系统遭遇错误或攻击时的安全默认状态

### <strong>零信任实施</strong>  
- **永不信任，持续验证**：对所有实体和请求持续进行验证  
- <strong>最小权限原则</strong>：为所有组件赋予最低访问权限  
- <strong>微分段</strong>：细粒度网络和访问控制

### <strong>持续安全演进</strong>  
- <strong>威胁环境适应</strong>：定期更新以应对新兴威胁  
- <strong>安全控制有效性</strong>：持续评估并改进控制措施  
- <strong>规范符合性</strong>：符合不断演进的MCP安全标准

---

## <strong>实施资源</strong>

### **官方MCP文档**  
- [MCP规格 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP安全最佳实践](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP授权规格](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP安全资源**  
- [OWASP MCP Azure安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10及Azure实现的综合指南  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - 官方OWASP MCP安全风险  
- [MCP安全峰会研讨会 (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure上MCP的实践安全培训

### <strong>微软安全解决方案</strong>  
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure内容安全](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub高级安全](https://github.com/security/advanced-security)  
- [Azure密钥保管库](https://learn.microsoft.com/azure/key-vault/)

### <strong>安全标准</strong>  
- [OAuth 2.0 安全最佳实践 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP大型语言模型Top 10](https://genai.owasp.org/)  
- [NIST网络安全框架](https://www.nist.gov/cyberframework)

---

> <strong>重要提示</strong>：这些安全控制反映当前MCP规格(2025-11-25)。由于标准快速演进，请始终核对最新[官方文档](https://spec.modelcontextprotocol.io/)。

## 后续步骤

- 返回至：[安全模块概览](./README.md)  
- 继续至：[模块3：入门](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->