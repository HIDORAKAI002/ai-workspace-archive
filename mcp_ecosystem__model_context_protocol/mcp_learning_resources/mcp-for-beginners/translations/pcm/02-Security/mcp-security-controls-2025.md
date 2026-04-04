# MCP Security Controls - February 2026 Update

> **Current Standard**: Dis document dey show [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) security requirements and official [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

The Model Context Protocol (MCP) don mature well well with beta-beta security controls wey dey tackle both normal software security and AI-specific wahala dem. Dis document dey give complete security controls for secure MCP use dem wey gree with OWASP MCP Top 10 framework.

## 🏔️ Hands-On Security Training

For practical, hands-on security implementation experience, we recommend the **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - na complete guided journey to secure MCP servers for Azure using "vulnerable → exploit → fix → validate" method.

All security controls for dis document dey follow the **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, wey dey give architecture examples and Azure-specific implementation guidance for the OWASP MCP Top 10 risks.

## **MANDATORY Security Requirements**

### **Critical Prohibitions from MCP Specification:**

> **FORBIDDEN**: MCP servers **MUST NOT** accept any tokens we no expressly issue for the MCP server  
>
> **PROHIBITED**: MCP servers **MUST NOT** use sessions for authentication  
>
> **REQUIRED**: MCP servers we dey do authorization **MUST** check ALL inbound requests  
>
> **MANDATORY**: MCP proxy servers wey dey use static client IDs **MUST** get user consent for every dynamically registered client

---

## 1. **Authentication & Authorization Controls**

### **External Identity Provider Integration**

**Current MCP Standard (2025-11-25)** allow MCP servers make dem fit hand over authentication to external identity providers, wey mean better security for dem:

**OWASP MCP Risk Addressed**: [MCP07 - Insufficient Authentication & Authorization](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Security Benefits:**
1. **Cuts Custom Authentication Risks**: E reduce yawa wey custom authentication fit cause
2. **Enterprise-Grade Security**: E use top identity providers like Microsoft Entra ID wey get strong security features
3. **Centralized Identity Management**: Make e easy to manage user lifecycle, access control, and compliance audit
4. **Multi-Factor Authentication**: E succor MFA capabilities from enterprise identity providers
5. **Conditional Access Policies**: E fit use risk-based access controls and adaptive authentication

**Implementation Requirements:**
- **Token Audience Validation**: Confirm say all tokens na make for MCP server
- **Issuer Verification**: Check sey token issuer na the correct identity provider
- **Signature Verification**: Confirm token integrity with cryptography
- **Expiration Enforcement**: Make sure token no dey valid after e expire
- **Scope Validation**: Confirm tokens get correct permission for wetin dem wan do

### **Authorization Logic Security**

**Critical Controls:**
- **Comprehensive Authorization Audits**: Regular security check for all authorization decision points
- **Fail-Safe Defaults**: Deny access if the authorization logic no fit confirm decision
- **Permission Boundaries**: Clear divide for different privilege levels and resource access
- **Audit Logging**: Full logging of all authorization decisions for security monitoring
- **Regular Access Reviews**: Check user permissions and privilege assignments often

## 2. **Token Security & Anti-Passthrough Controls**

**OWASP MCP Risk Addressed**: [MCP01 - Token Mismanagement & Secret Exposure](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Token Passthrough Prevention**

**Token passthrough no dey allowed** for MCP Authorization Specification because e get critical security risk dem:

**Security Risks Addressed:**
- **Control Circumvention**: E fit bypass important security controls like rate limiting, request validation, and traffic monitoring
- **Accountability Breakdown**: E no allow client identification, wey go spoil audit trails and incident investigation
- **Proxy-Based Exfiltration**: E let bad people use servers as proxy to collect data without permission
- **Trust Boundary Violations**: E break downstream service trust wey dem get for token origin
- **Lateral Movement**: If token don spoil, e fit spread trouble reach many services

**Implementation Controls:**
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

### **Secure Token Management Patterns**

**Best Practices:**
- **Short-Lived Tokens**: Use token we no last long to reduce exposure time
- **Just-in-Time Issuance**: Give tokens only when dem really need am for specific things
- **Secure Storage**: Use hardware security modules (HSMs) or secure key vaults
- **Token Binding**: Bind tokens to certain clients, sessions, or operations if possible
- **Monitoring & Alerting**: Real-time detection for token misuse or unauthorized access patterns

## 3. **Session Security Controls**

### **Session Hijacking Prevention**

**Attack Vectors Addressed:**
- **Session Hijack Prompt Injection**: Malicious things wey dem inject into shared session state
- **Session Impersonation**: Bad people wey use stolen session IDs to skip authentication
- **Resumable Stream Attacks**: Use server-sent event resume to inject bad content

**Mandatory Session Controls:**
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

**Transport Security:**
- **HTTPS Enforcement**: All session communication suppose use TLS 1.3
- **Secure Cookie Attributes**: HttpOnly, Secure, SameSite=Strict
- **Certificate Pinning**: For important connections to stop MITM attacks

### **Stateful vs Stateless Considerations**

**For Stateful Implementations:**
- Shared session state need extra protection against injection attacks
- Queue-based session management need integrity check
- Many server instances need secure session state sync

**For Stateless Implementations:**
- JWT or similar token-based session management
- Cryptographic verification for session state integrity
- Smaller attack surface but need strong token validation

## 4. **AI-Specific Security Controls**

**OWASP MCP Risks Addressed**:
- [MCP06 - Prompt Injection via Contextual Payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Tool Poisoning](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Command Injection & Execution](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Prompt Injection Defense**

**Microsoft Prompt Shields Integration:**
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

**Implementation Controls:**
- **Input Sanitization**: Thoroughly check and filter all user input
- **Content Boundary Definition**: Clear separation between system instructions and user content
- **Instruction Hierarchy**: Proper order for conflicting instructions
- **Output Monitoring**: Detect harmful or manipulated outputs

### **Tool Poisoning Prevention**

**Tool Security Framework:**
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

**Dynamic Tool Management:**
- **Approval Workflows**: Explicit user consent for tool changes
- **Rollback Capabilities**: Ability to return to previous tool versions
- **Change Auditing**: Full history of tool modification
- **Risk Assessment**: Automated check of tool security status

## 5. **Confused Deputy Attack Prevention**

### **OAuth Proxy Security**

**Attack Prevention Controls:**
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

**Implementation Requirements:**
- **User Consent Verification**: No skip consent screens for dynamic client registration
- **Redirect URI Validation**: Strict whitelist validation of redirect destinations
- **Authorization Code Protection**: Short-lived codes wey fit use only once
- **Client Identity Verification**: Strong check of client credentials and metadata

## 6. **Tool Execution Security**

### **Sandboxing & Isolation**

**Container-Based Isolation:**
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

**Process Isolation:**
- **Separate Process Contexts**: Each tool execution dey for isolated process environment
- **Inter-Process Communication**: Secure IPC ways with validation
- **Process Monitoring**: Watch runtime behavior and detect strange things
- **Resource Enforcement**: Hard limits for CPU, memory, and I/O work

### **Least Privilege Implementation**

**Permission Management:**
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

## 7. **Supply Chain Security Controls**

**OWASP MCP Risk Addressed**: [MCP04 - Supply Chain Attacks](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Dependency Verification**

**Comprehensive Component Security:**
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

### **Continuous Monitoring**

**Supply Chain Threat Detection:**
- **Dependency Health Monitoring**: Always check dependencies for security issues
- **Threat Intelligence Integration**: Real-time update on new supply chain threats
- **Behavioral Analysis**: Spot unusual behavior in outside components
- **Automated Response**: Quickly contain any compromised components

## 8. **Monitoring & Detection Controls**

**OWASP MCP Risk Addressed**: [MCP08 - Lack of Audit & Telemetry](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Security Information and Event Management (SIEM)**

**Comprehensive Logging Strategy:**
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

### **Real-Time Threat Detection**

**Behavioral Analytics:**
- **User Behavior Analytics (UBA)**: Detect strange user access patterns
- **Entity Behavior Analytics (EBA)**: Watch MCP server and tool behavior
- **Machine Learning Anomaly Detection**: AI powered detection of security threats
- **Threat Intelligence Correlation**: Match observed activities with known attack patterns

## 9. **Incident Response & Recovery**

### **Automated Response Capabilities**

**Immediate Response Actions:**
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

### **Forensic Capabilities**

**Investigation Support:**
- **Audit Trail Preservation**: Immutable log with cryptographic integrity
- **Evidence Collection**: Automatic collection of important security stuff
- **Timeline Reconstruction**: Detailed event timeline of security incidents
- **Impact Assessment**: Check how big the compromise and data exposure be

## **Key Security Architecture Principles**

### **Defense in Depth**
- **Multiple Security Layers**: No single point wey fit spoil security architecture
- **Redundant Controls**: Overlapping security measures for important functions
- **Fail-Safe Mechanisms**: Secure default settings when system get error or attack

### **Zero Trust Implementation**
- **Never Trust, Always Verify**: Always check all entities and requests
- **Principle of Least Privilege**: Give only minimum access rights
- **Micro-Segmentation**: Fine control of network and access

### **Continuous Security Evolution**
- **Threat Landscape Adaptation**: Regular updates to face new threats
- **Security Control Effectiveness**: Always check and improve controls
- **Specification Compliance**: Follow the latest MCP security standards

---

## **Implementation Resources**

### **Official MCP Documentation**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP Security Resources**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Complete OWASP MCP Top 10 plus Azure implementation
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Official OWASP MCP security risks
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Hands-on security training for MCP on Azure

### **Microsoft Security Solutions**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Security Standards**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **Important**: These security controls dey reflect current MCP specification (2025-11-25). Always check the latest [official documentation](https://spec.modelcontextprotocol.io/) as standards dey change quick.

## What's Next

- Go back to: [Security Module Overview](./README.md)
- Continue to: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Talk wey make sense:**
Dis document na AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator) we use translate am. Even though we dey try make am correct, abeg sabi say automatic translation fit get some mistakes or error. Di original document wey dem write for im correct language na di real correct one. If na serious matter, e good make person use professional person translate am. We no responsible if person no understand well or if mistake show because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->