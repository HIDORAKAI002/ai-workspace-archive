# MCP Security Controls - February 2026 Update

> **Current Standard**: Dis document dey reflect [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) security requirements plus official [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Di Model Context Protocol (MCP) don mature well well wit better security controls wey dey address both traditional software security and AI-specific threats. Dis document dey provide complete security controls for secure MCP implementations wey dey aligned wit di OWASP MCP Top 10 framework.

## 🏔️ Hands-On Security Training

For practical, hands-on security implementation experience, we recommend di **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - na complete guided journey to securing MCP servers for Azure using one "vulnerable → exploit → fix → validate" method.

All security controls for dis document dey follow di **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, wey dey provide architectures plus Azure-specific implementation guidance for di OWASP MCP Top 10 risks.

## **MANDATORY Security Requirements**

### **Critical Prohibitions from MCP Specification:**

> **FORBIDDEN**: MCP servers **MUST NOT** accept any tokens wey dem no explicitly issue for di MCP server  
>
> **PROHIBITED**: MCP servers **MUST NOT** use sessions for authentication  
>
> **REQUIRED**: MCP servers wey dey implement authorization **MUST** verify ALL inbound requests  
>
> **MANDATORY**: MCP proxy servers wey dey use static client IDs **MUST** get user consent for every dynamically registered client

---

## 1. **Authentication & Authorization Controls**

### **External Identity Provider Integration**

**Current MCP Standard (2025-11-25)** dey allow MCP servers to pass authentication go external identity providers, wey represent big security improvement:

**OWASP MCP Risk Addressed**: [MCP07 - Insufficient Authentication & Authorization](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Security Benefits:**
1. **Eliminates Custom Authentication Risks**: E reduce vulnerability surface by avoiding custom authentication methods
2. **Enterprise-Grade Security**: E dey leverage established identity providers like Microsoft Entra ID wey get strong security features
3. **Centralized Identity Management**: E simplify user lifecycle management, access control, plus compliance auditing
4. **Multi-Factor Authentication**: E inherit MFA power from enterprise identity providers
5. **Conditional Access Policies**: E benefit from risk-based access controls and adaptive authentication

**Implementation Requirements:**
- **Token Audience Validation**: Make sure say all tokens na for MCP server
- **Issuer Verification**: Confirm token issuer na correct identity provider
- **Signature Verification**: Cryptographic validation to check token integrity
- **Expiration Enforcement**: Strictly enforce token expiry limits
- **Scope Validation**: Make sure tokens get correct permissions for requested actions

### **Authorization Logic Security**

**Critical Controls:**
- **Comprehensive Authorization Audits**: Regular security checks for all authorization decision points
- **Fail-Safe Defaults**: Deny access if authorization logic no fit take final decision
- **Permission Boundaries**: Clear separation between different privilege levels and resource access
- **Audit Logging**: Full logging of every authorization decision for security monitoring
- **Regular Access Reviews**: Often check user permissions and privilege assignments

## 2. **Token Security & Anti-Passthrough Controls**

**OWASP MCP Risk Addressed**: [MCP01 - Token Mismanagement & Secret Exposure](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Token Passthrough Prevention**

**Token passthrough no dey allowed** for MCP Authorization Specification because e get critical security risks:

**Security Risks Addressed:**
- **Control Circumvention**: E bypass key security controls like rate limiting, request checks, and traffic monitoring
- **Accountability Breakdown**: E make am impossible to identify client, spoil audit trails and incident investigations
- **Proxy-Based Exfiltration**: E fit allow bad actors use servers like proxy for unauthorised data access
- **Trust Boundary Violations**: E break downstream service trust on where token come from
- **Lateral Movement**: Bad tokens wey reach different services fit expand attack reach

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
- **Short-Lived Tokens**: Make token last short time, rotate am often
- **Just-in-Time Issuance**: Issue token only when e needed for specific work
- **Secure Storage**: Use hardware security modules (HSMs) or strong key vaults
- **Token Binding**: Bind tokens to specific clients, sessions, or operations where e possible
- **Monitoring & Alerting**: Detect token misuse or unauthorised access sharply

## 3. **Session Security Controls**

### **Session Hijacking Prevention**

**Attack Vectors Addressed:**
- **Session Hijack Prompt Injection**: Bad events wey dem inject for shared session state
- **Session Impersonation**: Unauthorized use of stolen session IDs to pass authentication
- **Resumable Stream Attacks**: Exploit server-sent event resumption for bad content injection

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
- **HTTPS Enforcement**: All session messages must go through TLS 1.3
- **Secure Cookie Attributes**: HttpOnly, Secure, SameSite=Strict
- **Certificate Pinning**: For critical connections to stop MITM attacks

### **Stateful vs Stateless Considerations**

**For Stateful Implementations:**
- Shared session state need extra protection against injections
- Queue-based session management need integrity checks
- Multiple server instances need secure session state sync

**For Stateless Implementations:**
- Use JWT or similar tokens for session management
- Cryptographically verify session state integrity
- Attack surface smaller but need strong token validation

## 4. **AI-Specific Security Controls**

**OWASP MCP Risks Addressed**:
- [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
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
- **Input Sanitization**: Thorough validation and filtering of all user inputs
- **Content Boundary Definition**: Clear division between system instructions and user content
- **Instruction Hierarchy**: Right precedence rules for conflicting instructions
- **Output Monitoring**: Detect harmful or tampered outputs

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
- **Rollback Capabilities**: Fit revert back to earlier tool versions
- **Change Auditing**: Full history of tool definition changes
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
- **Redirect URI Validation**: Strict whitelist validation for redirect destinations
- **Authorization Code Protection**: Short-lived codes with single-use enforcement
- **Client Identity Verification**: Strong check for client credentials and metadata

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
- **Separate Process Contexts**: Every tool run inside isolated process area
- **Inter-Process Communication**: Secure IPC with proper validation
- **Process Monitoring**: Analyze runtime behaviour and detect anomalies
- **Resource Enforcement**: Set hard limits on CPU, memory, and I/O activities

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

**OWASP MCP Risk Addressed**: [MCP04 - Software Supply Chain Attacks & Dependency Tampering](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Dependency Verification**

**Complete Component Security:**
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
- **Dependency Health Monitoring**: Constant checking of all dependencies for security problems
- **Threat Intelligence Integration**: Live updates about new supply chain threats
- **Behavioral Analysis**: Detect strange behaviour in external components
- **Automated Response**: Quick containment of bad components

## 8. **Monitoring & Detection Controls**

**OWASP MCP Risk Addressed**: [MCP08 - Lack of Audit and Telemetry](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Security Information and Event Management (SIEM)**

**Complete Logging Strategy:**
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
- **Entity Behavior Analytics (EBA)**: Monitor behaviour of MCP server and tools
- **Machine Learning Anomaly Detection**: AI-powered spot of security threats
- **Threat Intelligence Correlation**: Match activities to known attack patterns

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
- **Audit Trail Preservation**: Immutable logs with cryptographic integrity
- **Evidence Collection**: Automated gathering of relevant security proof
- **Timeline Reconstruction**: Detailed sequence of events for security incidents
- **Impact Assessment**: Evaluation of damage scope and data exposure

## **Key Security Architecture Principles**

### **Defense in Depth**
- **Multiple Security Layers**: No single failure point for security
- **Redundant Controls**: Overlapping security measures for key functions
- **Fail-Safe Mechanisms**: Safe defaults when errors or attacks happen

### **Zero Trust Implementation**
- **Never Trust, Always Verify**: Always validate all entities and requests
- **Principle of Least Privilege**: Give minimal access rights to all parts
- **Micro-Segmentation**: Detailed network and access controls

### **Continuous Security Evolution**
- **Threat Landscape Adaptation**: Regular updates to meet new threats
- **Security Control Effectiveness**: Always check and improve controls
- **Specification Compliance**: Follow evolving MCP security standards

---

## **Implementation Resources**

### **Official MCP Documentation**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP Security Resources**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Complete OWASP MCP Top 10 wit Azure implementation
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

> **Important**: These security controls na for di current MCP specification (2025-11-25). Always check latest [official documentation](https://spec.modelcontextprotocol.io/) cos standards dey change fast.

## What's Next

- Return to: [Security Module Overview](./README.md)
- Continue to: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->