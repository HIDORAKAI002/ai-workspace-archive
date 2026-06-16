# MCP Security Controls - Pebrero 2026 Update

> **Kasalukuyang Pamantayan**: Ang dokumentong ito ay naglalahad ng [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) mga kinakailangan sa seguridad at opisyal na [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Ang Model Context Protocol (MCP) ay malaki ang pag-unlad sa pamamagitan ng pinahusay na mga kontrol sa seguridad na tinutugunan ang parehong tradisyunal na seguridad sa software at mga banta na partikular sa AI. Ang dokumentong ito ay nagbibigay ng komprehensibong mga kontrol sa seguridad para sa ligtas na mga implementasyon ng MCP na nakaayon sa OWASP MCP Top 10 framework.

## 🏔️ Hands-On Security Training

Para sa praktikal na karanasan sa implementasyon ng seguridad, inirerekomenda namin ang **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - isang komprehensibong gabay na ekspedisyon sa pagsigurado ng MCP servers sa Azure gamit ang metodolohiyang "vulnerable → exploit → fix → validate".

Lahat ng mga kontrol sa seguridad sa dokumentong ito ay nakaayon sa **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, na nagbibigay ng mga reference architecture at patnubay sa implementasyon na partikular sa Azure para sa mga panganib ng OWASP MCP Top 10.

## **MANDATORY na Mga Kinakailangan sa Seguridad**

### **Mga Kritikal na Pagbabawal mula sa MCP Specification:**

> **IPINAGBABAWAL**: Ang MCP servers **HINDI DAPAT** tumanggap ng anumang token na hindi tahasang inilabas para sa MCP server  
>
> **IPINAGBABAWAL**: Ang MCP servers **HINDI DAPAT** gumamit ng sessions para sa authentication  
>
> **KINAKAILANGAN**: Ang MCP servers na nagpapatupad ng authorization **DAPAT** tiyakin ang LAHAT ng mga papasok na kahilingan  
>
> **OBLIGADONG**: Ang MCP proxy servers na gumagamit ng static client IDs **DAPAT** humingi ng pahintulot ng user para sa bawat dynamic na nakarehistrong kliyente

---

## 1. **Mga Kontrol sa Authentication at Authorization**

### **Integrasyon ng External Identity Provider**

**Kasalukuyang MCP Standard (2025-11-25)** ay nagpapahintulot sa MCP servers na idelegate ang authentication sa mga external identity providers, na kumakatawan sa isang mahalagang pagbuti sa seguridad:

**Nilalapatan ng OWASP MCP Risk**: [MCP07 - Insufficient Authentication & Authorization](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Mga Benepisyo sa Seguridad:**
1. **Inaalis ang mga Panganib ng Custom Authentication**: Pinabababa ang kahinaan sa pamamagitan ng pag-iwas sa custom authentication implementations  
2. **Seguridad na Pang-Enterprise**: Ginagamit ang mga kilalang identity provider tulad ng Microsoft Entra ID na may mga advanced na tampok sa seguridad  
3. **Sentralisadong Pamamahala ng Identidad**: Pinapasimple ang pamamahala ng buhay ng user, kontrol sa access, at auditing para sa pagsunod  
4. **Multi-Factor Authentication**: Namamana ang mga kakayahan ng MFA mula sa mga enterprise identity providers  
5. **Mga Patakaran sa Conditional Access**: Nakikinabang sa mga risk-based access controls at adaptive authentication

**Mga Kinakailangan sa Implementasyon:**
- **Pag-validate ng Token Audience**: Tiyaking lahat ng token ay tahasang inilabas para sa MCP server  
- **Pag-verify ng Issuer**: Tiyaking tugma ang issuer ng token sa inaasahang identity provider  
- **Pag-verify ng Lagda**: Cryptographic na pagsusuri ng integridad ng token  
- **Pagpapatupad ng Expiration**: Mahigpit na pagpapatupad ng mga limitasyon sa token lifetime  
- **Pag-validate ng Saklaw**: Siguraduhing ang mga token ay naglalaman ng angkop na mga permiso para sa hinihiling na mga operasyon

### **Seguridad ng Lohika ng Authorization**

**Kritikal na mga Kontrol:**
- **Komprehensibong Audit ng Authorization**: Regular na pagsusuri ng seguridad sa lahat ng mga desisyon sa authorization  
- **Fail-Safe Defaults**: Tanggihan ang access kapag hindi makagawa ng tiyak na desisyon ang lohika ng authorization  
- **Hangganan ng Permiso**: Malinaw na paghihiwalay sa pagitan ng iba't ibang antas ng pribilehiyo at access sa resources  
- **Audit Logging**: Kumpletong pag-log ng lahat ng mga desisyon sa authorization para sa pagsubaybay sa seguridad  
- **Regular na Review ng Access**: Panandaliang pagsuri ng mga permiso ng user at mga pribilehiyo

## 2. **Seguridad ng Token at Anti-Passthrough na mga Kontrol**

**Nilalapatan ng OWASP MCP Risk**: [MCP01 - Token Mismanagement & Secret Exposure](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Pag-iwas sa Token Passthrough**

**Mahigpit na ipinagbabawal ang token passthrough** sa MCP Authorization Specification dahil sa mga kritikal na panganib sa seguridad:

**Mga Panganib na Tinutugunan:**
- **Pag-iwas sa Kontrol**: Nilalabag ang mga mahalagang kontrol sa seguridad tulad ng rate limiting, request validation, at traffic monitoring  
- **Pagkawala ng Pananagutan**: Ginagawang imposibleng tukuyin ang client, sumisira sa audit trails at imbestigasyon ng insidente  
- **Proxy-Based Exfiltration**: Pinapayagan ang mga malisyosong aktor na gamitin ang mga server bilang proxy para sa hindi awtorisadong pag-access ng data  
- **Paglabag sa Hangganan ng Tiwala**: Sinisira ang mga assumptions ng downstream service tungkol sa pinanggalingan ng token  
- **Lateral Movement**: Ang mga kompromisadong token sa maraming serbisyo ay nagpapahintulot ng mas malawak na pag-atake

**Mga Kontrol sa Implementasyon:**
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

### **Mga Secure na Pattern sa Pamamahala ng Token**

**Pinakamahusay na mga Praktis:**
- **Mga Token na Maikling Buhay**: Bawasan ang window ng exposure sa pamamagitan ng madalas na pag-ikot ng token  
- **Just-in-Time na Pag-isyu**: Maglabas lamang ng mga token kapag kinakailangan para sa tiyak na mga operasyon  
- **Secure na Imbakan**: Gumamit ng hardware security modules (HSMs) o secure key vaults  
- **Token Binding**: Itali ang mga token sa mga partikular na kliyente, session, o operasyon kung maaari  
- **Pagsubaybay at Pag-alerto**: Real-time na pagtuklas ng maling paggamit ng token o hindi awtorisadong mga pattern ng pag-access

## 3. **Mga Kontrol sa Seguridad ng Session**

### **Pag-iwas sa Session Hijacking**

**Mga Tinarget na Vector ng Atake:**
- **Session Hijack Prompt Injection**: Malisyosong mga kaganapan na ini-inject sa shared session state  
- **Session Impersonation**: Hindi awtorisadong paggamit ng ninakaw na mga session ID upang malusutan ang authentication  
- **Resumable Stream Attacks**: Pagsasamantala sa server-sent event resumption para sa malisyosong pagpapakilala ng nilalaman

**Mga Obligadong Kontrol sa Session:**
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

**Seguridad sa Transportasyon:**
- **HTTPS Enforcement**: Lahat ng komunikasyon ng session ay sa TLS 1.3  
- **Mga Atributo ng Secure Cookie**: HttpOnly, Secure, SameSite=Strict  
- **Certificate Pinning**: Para sa mga kritikal na koneksyon upang maiwasan ang MITM attacks

### **Mga Pagsasaalang-alang sa Stateful vs Stateless**

**Para sa Stateful na Implementasyon:**
- Ang shared session state ay nangangailangan ng karagdagang proteksyon laban sa injection attacks  
- Ang queue-based session management ay nangangailangan ng integridad na beripikasyon  
- Maraming server instances ay nangangailangan ng secure session state synchronization

**Para sa Stateless na Implementasyon:**
- JWT o katulad na token-based na pamamahala ng session  
- Cryptographic na pagsusuri ng integridad ng session state  
- Nabawasang surface ng atake ngunit nangangailangan ng matibay na token validation

## 4. **Mga Kontrol sa Seguridad na Partikular sa AI**

**Nilalapatan ng OWASP MCP Risks**:
- [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Tool Poisoning](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Command Injection & Execution](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Depensa laban sa Prompt Injection**

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

**Mga Kontrol sa Implementasyon:**
- **Sanitasyon ng Input**: Komprehensibong pagsusuri at pagsala ng lahat ng input ng user  
- **Pagpapakahulugan ng Hangganan ng Nilalaman**: Malinaw na paghahati sa pagitan ng mga utos ng sistema at nilalaman ng user  
- **Hierarkiya ng Instruksyon**: Tamang mga patakaran sa precedence para sa mga magkasalungat na utos  
- **Pagsubaybay sa Output**: Pagtuklas ng mga potensyal na nakasasama o napalitang output

### **Pag-iwas sa Tool Poisoning**

**Balangkas ng Seguridad ng Tool:**
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

**Dynamic na Pamamahala ng Tool:**
- **Mga Workflow ng Pag-apruba**: Tiyak na pahintulot ng user para sa mga pagbabago ng tool  
- **Kakayahang Mag-rollback**: Kakayahang bumalik sa mga naunang bersyon ng tool  
- **Audit ng Pagbabago**: Kumpletong kasaysayan ng mga pagbabago sa paglalarawan ng tool  
- **Pagsusuri ng Panganib**: Awtomatiko na pagtatasa ng seguridad ng tool

## 5. **Pag-iwas sa Confused Deputy Attack**

### **Seguridad ng OAuth Proxy**

**Mga Kontrol sa Pag-iwas ng Atake:**
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
- **Pag-verify ng Pahintulot ng User**: Huwag i-skip ang consent screens para sa dynamic client registration  
- **Pag-validate ng Redirect URI**: Mahigpit na whitelist-based validation ng mga destinasyon ng redirect  
- **Proteksyon ng Authorization Code**: Maiiksi ang buhay ng mga code na single-use lamang  
- **Pagpapatunay ng Identidad ng Kliyente**: Matatag na validation ng client credentials at metadata

## 6. **Seguridad sa Pagpapatupad ng Tool**

### **Sandboxing at Isolation**

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

**Pag-isolate ng Proseso:**
- **Hiwalay na Process Contexts**: Bawat pagpapatupad ng tool ay nasa hiwalay na proseso  
- **Inter-Process Communication**: Secure na mga mekanismo ng IPC na may validation  
- **Pagsubaybay sa Proseso**: Analisis ng behavior sa runtime at pagtuklas ng anomalya  
- **Pagpapatupad ng Resources**: Mahigpit na limitasyon sa CPU, memory, at I/O operations

### **Implementasyon ng Least Privilege**

**Pamamahala ng Permiso:**
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

## 7. **Mga Kontrol sa Seguridad ng Supply Chain**

**Nilalapatan ng OWASP MCP Risk**: [MCP04 - Software Supply Chain Attacks & Dependency Tampering](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Pag-verify ng Dependency**

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

### **Tuloy-tuloy na Pagsubaybay**

**Deteksiyon ng Banta sa Supply Chain:**
- **Pagsubaybay sa Kalusugan ng Dependency**: Tuloy-tuloy na pagsusuri ng lahat ng dependency para sa mga isyu sa seguridad  
- **Integrasyon ng Threat Intelligence**: Real-time na pag-update sa mga umuusbong na banta sa supply chain  
- **Behavioral Analysis**: Pagtuklas ng di-pangkaraniwang kilos sa mga external na komponent  
- **Awtomatikong Tugon**: Agarang pagkontrol sa mga kompromisadong komponent

## 8. **Mga Kontrol sa Pagsubaybay at Deteksyon**

**Nilalapatan ng OWASP MCP Risk**: [MCP08 - Lack of Audit and Telemetry](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Security Information and Event Management (SIEM)**

**Komprehensibong Estratehiya sa Pag-log:**
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

### **Real-Time na Deteksyon ng Banta**

**Behavioral Analytics:**
- **User Behavior Analytics (UBA)**: Pagtuklas ng mga di-pangkaraniwang pattern ng pag-access ng user  
- **Entity Behavior Analytics (EBA)**: Pagsubaybay sa behavior ng MCP server at tool  
- **Machine Learning Anomaly Detection**: AI-powered na pagtukoy ng mga banta sa seguridad  
- **Pagkakaugnay ng Threat Intelligence**: Pagtutugma ng mga naobserbahang aktibidad sa mga kilalang pattern ng pag-atake

## 9. **Incident Response at Recovery**

### **Awtomatikong Kakayahan sa Pagtugon**

**Agarang Hakbang sa Pagtugon:**
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

### **Kakayahan sa Forensics**

**Suporta sa Imbestigasyon:**
- **Pagpapanatili ng Audit Trail**: Hindi mababagong pag-log na may cryptographic integrity  
- **Pagkolekta ng Mga Ebidensya**: Awtomatikong pagkuha ng mga may-kinalamang security artifacts  
- **Pagbuo ng Timeline**: Detalyadong pagkakasunod-sunod ng mga kaganapan hanggang sa insidente ng seguridad  
- **Pagtatasa ng Epekto**: Pagsusuri ng lawak ng kompromiso at pagkakalantad ng data

## **Pangunahing Prinsipyo sa Arkitektura ng Seguridad**

### **Defense in Depth**
- **Maraming Patong ng Seguridad**: Walang iisang punto ng pagkabigo sa arkitektura ng seguridad  
- **Redundant na Mga Kontrol**: Overlapping na mga hakbang sa seguridad para sa mga kritikal na gawain  
- **Fail-Safe na Mekanismo**: Ligtas na default kapag ang mga sistema ay nakakaranas ng mga error o pag-atake

### **Implementasyon ng Zero Trust**
- **Huwag Magtiwala, Laging Magpatunay**: Tuloy-tuloy na pagpapatunay ng lahat ng mga entidad at kahilingan  
- **Prinsipyo ng Least Privilege**: Pinakamababang karapatan sa pag-access para sa lahat ng komponent  
- **Micro-Segmentation**: Granular na kontrol sa network at access

### **Tuloy-tuloy na Ebolusyon ng Seguridad**
- **Pag-angkop sa Landscape ng Banta**: Regular na pag-update upang matugunan ang mga umuusbong na banta  
- **Epektibidad ng Kontrol sa Seguridad**: Patuloy na pagsusuri at pagpapabuti ng mga kontrol  
- **Pagsunod sa Specification**: Pagsunod sa mga umuusbong na pamantayan ng seguridad ng MCP

---

## **Mga Mapagkukunan sa Implementasyon**

### **Opisyal na Dokumentasyon ng MCP**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Mga Mapagkukunan sa Seguridad ng OWASP MCP**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komprehensibo ang OWASP MCP Top 10 na may implementasyon sa Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Opisyal na OWASP MCP security risks  
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

> **Mahalaga**: Ang mga kontrol sa seguridad na ito ay sumasalamin sa kasalukuyang MCP specification (2025-11-25). Palaging suriin laban sa pinakabagong [opisyal na dokumentasyon](https://spec.modelcontextprotocol.io/) dahil ang mga pamantayan ay patuloy na mabilis na umuunlad.

## Ano ang Susunod

- Bumalik sa: [Security Module Overview](./README.md)
- Magpatuloy sa: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->