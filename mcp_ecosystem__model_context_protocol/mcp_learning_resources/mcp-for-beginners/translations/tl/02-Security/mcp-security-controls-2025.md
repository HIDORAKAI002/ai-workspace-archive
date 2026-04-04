# MCP Security Controls - Pebrero 2026 Update

> **Kasalukuyang Pamantayan**: Ang dokumentong ito ay sumasalamin sa [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) mga kinakailangan sa seguridad at opisyal na [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Ang Model Context Protocol (MCP) ay malaki ang pag-unlad na may pinahusay na mga kontrol sa seguridad na tumutugon sa parehong tradisyonal na seguridad ng software at mga banta na partikular sa AI. Ang dokumentong ito ay nagbibigay ng komprehensibong mga kontrol sa seguridad para sa mga ligtas na implementasyon ng MCP na nakaayon sa OWASP MCP Top 10 na balangkas.

## 🏔️ Hands-On Security Training

Para sa praktikal, hands-on na karanasan sa pagpapatupad ng seguridad, inirerekomenda namin ang **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - isang komprehensibong gabay na ekspedisyon para sa pagsisigurado ng MCP servers sa Azure gamit ang metodolohiya na "vulnerable → exploit → fix → validate".

Lahat ng mga kontrol sa seguridad sa dokumentong ito ay nakaayon sa **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, na nagbibigay ng mga reference architecture at mga patnubay sa implementasyon sa Azure para sa mga panganib sa OWASP MCP Top 10.

## **MANDATORY Security Requirements**

### **Mahalagang Pagbabawal mula sa MCP Specification:**

> **IPINAGBABAWAL**: Ang mga MCP server **HINDI DAPAT** tumanggap ng anumang token na hindi tahasang inilabas para sa MCP server  
>
> **BANNED**: Ang mga MCP server **HINDI DAPAT** gumamit ng sessions para sa authentication  
>
> **KINAKAILANGAN**: Ang mga MCP server na nagpapatupad ng authorization **DAPAT** beripikahin LAHAT ng papasok na kahilingan  
>
> **MANDATORY**: Ang mga MCP proxy server na gumagamit ng static client IDs **DAPAT** kumuha ng pahintulot ng user para sa bawat dinamiko na nirehistrong kliyente

---

## 1. **Authentication & Authorization Controls**

### **Pagsasama ng External Identity Provider**

**Kasalukuyang MCP Standard (2025-11-25)** pinapayagan ang mga MCP server na idelegate ang authentication sa mga panlabas na identity provider, na isang makabuluhang pagbuti sa seguridad:

**Pinanggagalingan ng Panganib na Tinugunan ng OWASP MCP**: [MCP07 - Insufficient Authentication & Authorization](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Mga Benepisyo sa Seguridad:**
1. **Inaalis ang Custom Authentication Risks**: Pinapaliit ang kahinaan sa pamamagitan ng pag-iwas sa mga custom na implementasyon ng authentication  
2. **Enterprise-Grade Security**: Ginagamit ang mga kilalang identity provider tulad ng Microsoft Entra ID na may advanced na mga tampok sa seguridad  
3. **Sentralisadong Pamamahala ng pagkakakilanlan**: Pinadadali ang lifecycle management ng user, access control, at compliance auditing  
4. **Multi-Factor Authentication**: Namamana mula sa mga kakayahan ng MFA mula sa mga enterprise identity provider  
5. **Conditional Access Policies**: Nakikinabang mula sa risk-based access controls at adaptive authentication  

**Mga Kinakailangan sa Implementasyon:**
- **Token Audience Validation**: Beripikahin na lahat ng token ay tahasang inilabas para sa MCP server  
- **Issuer Verification**: Pagtibayin na ang issuer ng token ay tumutugma sa inaasahang identity provider  
- **Signature Verification**: Kryptograpikong pagpapatunay ng integridad ng token  
- **Expiration Enforcement**: Mahigpit na pagpapatupad ng mga limitasyon sa buhay ng token  
- **Scope Validation**: Tiyakin na ang mga token ay naglalaman ng angkop na mga pahintulot para sa hinihinging mga operasyon  

### **Authorization Logic Security**

**Mahalagang Kontrol:**
- **Komprehensibong Authorization Audits**: Regular na security review ng lahat ng decision point sa authorization  
- **Fail-Safe Defaults**: Itakwil ang access kapag ang authorization logic ay hindi makagawa ng tiyak na desisyon  
- **Permission Boundaries**: Maliwanag na paghihiwalay sa pagitan ng iba't ibang antas ng pribilehiyo at access sa mga resources  
- **Audit Logging**: Buong pagtatala ng lahat ng desisyon sa authorization para sa seguridad na pagmamanman  
- **Regular Access Reviews**: Panandaliang beripikasyon ng mga pahintulot ng user at mga pribilehiyo  

## 2. **Token Security & Anti-Passthrough Controls**

**Pinanggagalingan ng Panganib na Tinugunan ng OWASP MCP**: [MCP01 - Token Mismanagement & Secret Exposure](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Token Passthrough Prevention**

**Ang token passthrough ay tahasang ipinagbabawal** sa MCP Authorization Specification dahil sa mga kritikal na panganib sa seguridad:

**Mga Panganib sa Seguridad na Tinugunan:**
- **Pagsuway sa Kontrol**: Nalalampasan ang mga mahalagang kontrol sa seguridad tulad ng rate limiting, request validation, at traffic monitoring  
- **Pagkawala ng Pananagutan**: Ginagawang imposible ang pagkilala sa kliyente, na sumisira sa audit trails at pagsisiyasat ng insidente  
- **Proxy-Based Exfiltration**: Pinapayagan ang mga malisyosong aktor na gamitin ang mga server bilang proxies para sa hindi awtorisadong pag-access ng data  
- **Paglabag sa Trust Boundary**: Nilalabag ang mga pagtanggap ng downstream service tungkol sa pinagmulan ng token  
- **Lateral Movement**: Ang mga kompromisadong token sa iba't ibang serbisyo ay nagpapahintulot ng mas malawak na pagkalat ng pag-atake  

**Mga Implementasyong Kontrol:**
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

**Pinakamahusay na mga Gawi:**
- **Mga Token na Panandalian**: Pinapaliit ang exposure window sa madalas na pag-ikot ng token  
- **Just-in-Time Issuance**: Naglalabas lang ng mga token kapag kailangan para sa partikular na mga operasyon  
- **Secure Storage**: Gumamit ng hardware security modules (HSMs) o secure key vaults  
- **Token Binding**: I-bind ang mga token sa partikular na kliyente, sessions, o mga operasyon kung maaari  
- **Monitoring & Alerting**: Real-time na pagtuklas ng maling paggamit ng token o hindi awtorisadong mga pattern ng access  

## 3. **Session Security Controls**

### **Session Hijacking Prevention**

**Mga Daan ng Atake na Tinugunan:**
- **Session Hijack Prompt Injection**: Malisyosong mga event na ini-inject sa shared session state  
- **Session Impersonation**: Hindi awtorisadong paggamit ng ninakaw na session IDs upang lampasan ang authentication  
- **Resumable Stream Attacks**: Pagsasamantala sa server-sent event resumption para sa malisyosong pag-inject ng content  

**Mga Mandatory na Kontrol sa Session:**
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
- **HTTPS Enforcement**: Lahat ng komunikasyon sa session ay sa TLS 1.3  
- **Secure Cookie Attributes**: HttpOnly, Secure, SameSite=Strict  
- **Certificate Pinning**: Para sa mga kritikal na koneksyon upang maiwasan ang MITM attacks  

### **Pagsasaalang-alang sa Stateful vs Stateless**

**Para sa Stateful Implementations:**
- Ang shared session state ay nangangailangan ng dagdag na proteksyon laban sa injection attacks  
- Ang queue-based session management ay nangangailangan ng integridad na beripikasyon  
- Ang maraming server instances ay nangangailangan ng secure synchronization ng session state  

**Para sa Stateless Implementations:**
- JWT o katulad na token-based session management  
- Kryptograpikong beripikasyon ng integridad ng session state  
- Pinaikling attack surface ngunit nangangailangan ng matatag na pag-validate ng token  

## 4. **AI-Specific Security Controls**

**Pinanggagalingan ng Panganib na Tinugunan ng OWASP MCP**:  
- [MCP06 - Prompt Injection via Contextual Payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Tool Poisoning](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Command Injection & Execution](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)  

### **Prompt Injection Defense**

**Pagsasama ng Microsoft Prompt Shields:**  
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
  
**Mga Implementasyong Kontrol:**
- **Input Sanitization**: Komprehensibong beripikasyon at pagsala ng lahat ng input ng user  
- **Content Boundary Definition**: Malinaw na paghihiwalay sa pagitan ng mga utos ng system at nilalaman ng user  
- **Instruction Hierarchy**: Tamang mga patakaran sa precedence para sa mga salungat na utos  
- **Output Monitoring**: Pagtuklas ng mga posibleng mapanganib o manipuladong output  

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
- **Approval Workflows**: Tahasang pahintulot ng user para sa mga pagbabago sa tool  
- **Rollback Capabilities**: Kakayahang bumalik sa mga naunang bersyon ng tool  
- **Change Auditing**: Buong kasaysayan ng mga pagbabago sa depinisyon ng tool  
- **Risk Assessment**: Automated na pagsusuri ng postura sa seguridad ng tool  

## 5. **Confused Deputy Attack Prevention**

### **OAuth Proxy Security**

**Mga Kontrol para sa Pag-iwas sa Atake:**  
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
  
**Mga Kinakailangan sa Implementasyon:**
- **User Consent Verification**: Huwag laktawan ang mga consent screen para sa dynamiko na pagrerehistro ng kliyente  
- **Redirect URI Validation**: Mahigpit na whitelist-based na beripikasyon ng mga redirect destination  
- **Authorization Code Protection**: Panandalian ang mga code na may single-use enforcement  
- **Client Identity Verification**: Matatag na beripikasyon ng mga kredensyal at metadata ng kliyente  

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
- **Separate Process Contexts**: Bawat pagpapatakbo ng tool ay nasa hiwalay na proseso  
- **Inter-Process Communication**: Secure IPC mechanisms na may beripikasyon  
- **Process Monitoring**: Pagsusuri ng runtime behavior at pagtuklas ng anomaly  
- **Resource Enforcement**: Mahigpit na limitasyon sa CPU, memorya, at I/O operations  

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

**Pinanggagalingan ng Panganib na Tinugunan ng OWASP MCP**: [MCP04 - Supply Chain Attacks](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Dependency Verification**

**Komprehensibong Seguridad ng Komponent:**  
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

**Pagtuklas ng Banta sa Supply Chain:**
- **Dependency Health Monitoring**: Tuloy-tuloy na pagtatasa ng lahat ng dependencies para sa mga isyu sa seguridad  
- **Threat Intelligence Integration**: Real-time na mga pag-update tungkol sa mga bagong banta sa supply chain  
- **Behavioral Analysis**: Pagtuklas ng hindi pangkaraniwang kilos sa panlabas na mga komponent  
- **Automated Response**: Agarang pagsugpo sa mga kompromisadong komponent  

## 8. **Monitoring & Detection Controls**

**Pinanggagalingan ng Panganib na Tinugunan ng OWASP MCP**: [MCP08 - Lack of Audit & Telemetry](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Security Information and Event Management (SIEM)**

**Komprehensibong Estratehiya sa Pagtatala:**  
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

**Pagsusuri ng Ugali:**
- **User Behavior Analytics (UBA)**: Pagtuklas ng hindi pangkaraniwang pattern ng access ng user  
- **Entity Behavior Analytics (EBA)**: Pagmomonitor ng gawi ng MCP server at ng mga tool  
- **Machine Learning Anomaly Detection**: AI-powered na pagkilala ng mga banta sa seguridad  
- **Threat Intelligence Correlation**: Pagtutugma ng mga naobserbahang aktibidad sa mga kilalang pattern ng pag-atake  

## 9. **Incident Response & Recovery**

### **Automated Response Capabilities**

**Agad na Mga Hakbang sa Pagtugon:**  
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

**Suporta sa Imbestigasyon:**
- **Audit Trail Preservation**: Hindi mababago na pagtatala na may kryptograpikong integridad  
- **Evidence Collection**: Automated na pangangalap ng mga kaugnay na artifacts sa seguridad  
- **Timeline Reconstruction**: Detalyadong pagkakasunod-sunod ng mga pangyayari na nauugnay sa mga insidente sa seguridad  
- **Impact Assessment**: Pagsusuri ng lawak ng kompromiso at pagkakalantad ng data  

## **Key Security Architecture Principles**

### **Defense in Depth**
- **Maramihang Layer ng Seguridad**: Walang iisang punto ng pagkabigo sa arkitekturang pangseguridad  
- **Redundant Controls**: Overlapping na mga hakbang sa seguridad para sa mahahalagang function  
- **Fail-Safe Mechanisms**: Mga secure default kapag may mga error o pag-atake  

### **Zero Trust Implementation**
- **Huwag Kailanman Magtiwala, Palaging Beripikahin**: Tuloy-tuloy na beripikasyon ng lahat ng entity at kahilingan  
- **Prinsipyo ng Pinakamababang Pribilehiyo**: Minimal na access rights para sa lahat ng komponent  
- **Micro-Segmentation**: Detalyadong kontrol ng network at access  

### **Continuous Security Evolution**
- **Pag-angkop sa Landscape ng Mga Banta**: Regular na update upang tugunan ang mga bagong banta  
- **Kahusayan ng Seguridad na Kontrol**: Tuloy-tuloy na ebalwasyon at pagpapabuti ng mga kontrol  
- **Pagsunod sa Specification**: Kaayon sa umuusbong na mga pamantayan ng seguridad ng MCP  

---

## **Mga Mapagkukunan sa Implementasyon**

### **Opisyal na Dokumentasyon ng MCP**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Mga Mapagkukunan sa Seguridad ng OWASP MCP**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komprehensibong OWASP MCP Top 10 kasama ang implementasyon sa Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Opisyal na mga panganib sa seguridad ng OWASP MCP
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Hands-on na pagsasanay sa seguridad para sa MCP sa Azure

### **Mga Solusyon sa Seguridad ng Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Mga Pamantayan sa Seguridad**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **Mahalaga**: Ang mga kontrol na ito sa seguridad ay sumasalamin sa kasalukuyang MCP specification (2025-11-25). Laging tiyakin laban sa pinakabagong [opisyal na dokumentasyon](https://spec.modelcontextprotocol.io/) dahil mabilis na umuunlad ang mga pamantayan.

## Ano ang Susunod

- Bumalik sa: [Security Module Overview](./README.md)
- Magpatuloy sa: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Paalala**:
Ang dokumentong ito ay isinalin gamit ang AI translation service na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't sinisikap naming maging tumpak, pakatandaan na ang mga awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o kamalian. Ang orihinal na dokumento sa kanyang sariling wika ang dapat ituring bilang pangunahin at opisyal na sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasaling-tao. Hindi kami mananagot sa anumang hindi pagkakaunawaan o maling interpretasyon na maaaring lumitaw dahil sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->