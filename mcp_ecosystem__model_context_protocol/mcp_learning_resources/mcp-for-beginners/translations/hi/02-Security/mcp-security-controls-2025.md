# MCP सुरक्षा नियंत्रण - फरवरी 2026 अपडेट

> **वर्तमान मानक**: यह दस्तावेज़ [MCP विनिर्देशन 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) सुरक्षा आवश्यकताओं और आधिकारिक [MCP सुरक्षा सर्वोत्तम प्रथाओं](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) को दर्शाता है।

मॉडल कॉन्टेक्स्ट प्रोटोकॉल (MCP) ने पारंपरिक सॉफ़्टवेयर सुरक्षा और एआई-विशिष्ट खतरों दोनों को संबोधित करने वाले उन्नत सुरक्षा नियंत्रणों के साथ काफी परिपक्वता प्राप्त की है। यह दस्तावेज़ OWASP MCP टॉप 10 ढांचे के अनुरूप सुरक्षित MCP कार्यान्वयन के लिए व्यापक सुरक्षा नियंत्रण प्रदान करता है।

## 🏔️ हैंड्स-ऑन सुरक्षा प्रशिक्षण

व्यावहारिक, हैंड्स-ऑन सुरक्षा कार्यान्वयन अनुभव के लिए, हम **[MCP सुरक्षा सम्मेलन कार्यशाला (शेरपा)](https://azure-samples.github.io/sherpa/)** की सिफारिश करते हैं - Azure में MCP सर्वरों को सुरक्षित करने के लिए "कमजोर → शोषण → सुधार → सत्यापन" पद्धति के साथ एक व्यापक निर्देशित अभियान।

इस दस्तावेज़ के सभी सुरक्षा नियंत्रण **[OWASP MCP Azure सुरक्षा गाइड](https://microsoft.github.io/mcp-azure-security-guide/)** के अनुरूप हैं, जो OWASP MCP टॉप 10 जोखिमों के लिए संदर्भ वास्तुकला और Azure-विशिष्ट कार्यान्वयन मार्गदर्शन प्रदान करता है।

## **अनिवार्य सुरक्षा आवश्यकताएँ**

### **MCP विनिर्देशन से महत्वपूर्ण प्रतिबंध:**

> **प्रतिबंधित**: MCP सर्वर **कभी भी स्वीकार नहीं कर सकते** कोई टोकन जो स्पष्ट रूप से MCP सर्वर के लिए जारी नहीं किए गए हों  
>  
> **प्रतिनिषिद्ध**: MCP सर्वर **प्रमाणीकरण के लिए सत्रों का उपयोग नहीं कर सकते**  
>  
> **अनिवार्य**: MCP सर्वर जो प्राधिकरण लागू करते हैं, **सभी इनबाउंड अनुरोधों का सत्यापन करना चाहिए**  
>  
> **आवश्यक**: MCP प्रॉक्सी सर्वर जो स्थिर क्लाइंट आईडी का उपयोग करते हैं, **प्रत्येक गतिशील रूप से पंजीकृत क्लाइंट के लिए उपयोगकर्ता की सहमति प्राप्त करनी चाहिए**

---

## 1. **प्रमाणीकरण और प्राधिकरण नियंत्रण**

### **बाहरी पहचान प्रदाता एकीकरण**

**वर्तमान MCP मानक (2025-11-25)** MCP सर्वरों को बाहरी पहचान प्रदाताओं को प्रमाणीकरण सौंपने की अनुमति देता है, जो एक महत्वपूर्ण सुरक्षा सुधार का प्रतिनिधित्व करता है:

**OWASP MCP जोखिम संबोधित**: [MCP07 - अपर्याप्त प्रमाणीकरण और प्राधिकरण](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**सुरक्षा लाभ:**
1. **कस्टम प्रमाणीकरण जोखिम समाप्त करता है**: कस्टम प्रमाणीकरण कार्यान्वयन से कमजोरियों को कम करता है  
2. **एंटरप्राइज़-ग्रेड सुरक्षा**: Microsoft Entra ID जैसे स्थापित पहचान प्रदाताओं का लाभ उठाता है जिनमें उन्नत सुरक्षा विशेषताएं होती हैं  
3. **केंद्रीकृत पहचान प्रबंधन**: उपयोगकर्ता जीवनचक्र प्रबंधन, एक्सेस नियंत्रण और अनुपालन ऑडिटिंग सरल होता है  
4. **मल्टी-फैक्टर प्रमाणीकरण**: एंटरप्राइज़ पहचान प्रदाताओं से MFA क्षमताएं प्राप्त करता है  
5. **सशर्त पहुँच नीतियां**: जोखिम-आधारित पहुँच नियंत्रण और अनुकूलित प्रमाणीकरण से लाभ उठाता है

**कार्यान्वयन आवश्यकताएँ:**
- **टोकन ऑडियंस सत्यापन**: सुनिश्चित करें कि सभी टोकन स्पष्ट रूप से MCP सर्वर के लिए जारी किए गए हैं  
- **जारीकर्ता सत्यापन**: टोकन जारीकर्ता अपेक्षित पहचान प्रदाता से मेल खाता हो इसकी जांच करें  
- **हस्ताक्षर सत्यापन**: टोकन अखंडता का क्रिप्टोग्राफिक सत्यापन  
- **समाप्ति प्रवर्तन**: टोकन की जीवनावधि सीमाओं का कड़ाई से पालन करें  
- **स्कोप सत्यापन**: सुनिश्चित करें कि टोकन में अनुरोधित ऑपरेशन के लिए उपयुक्त अनुमतियां हों

### **प्राधिकरण तर्क सुरक्षा**

**महत्वपूर्ण नियंत्रण:**
- **व्यापक प्राधिकरण ऑडिट**: सभी प्राधिकरण निर्णय बिंदुओं की नियमित सुरक्षा समीक्षा  
- **फेल-सेफ डिफ़ॉल्ट**: जब प्राधिकरण तर्क निश्चित निर्णय नहीं कर पाता तो पहुँच अस्वीकृत करना  
- **अनुमति सीमाएं**: अलग-अलग विशेषाधिकार स्तरों और संसाधन पहुँच के बीच स्पष्ट विभाजन  
- **ऑडिट लॉगिंग**: सुरक्षा निगरानी के लिए सभी प्राधिकरण निर्णयों का पूर्ण लॉगिंग  
- **नियमित पहुँच समीक्षा**: उपयोगकर्ता अनुमतियों और विशेषाधिकार सौंपने का समय-समय पर सत्यापन

## 2. **टोकन सुरक्षा और एंटी-पासथ्रू नियंत्रण**

**OWASP MCP जोखिम संबोधित**: [MCP01 - टोकन अनुचित प्रबंधन एवं रहस्य खुलासा](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **टोकन पासथ्रू रोकथाम**

**MCP प्राधिकरण विनिर्देशन में टोकन पासथ्रू स्पष्ट रूप से निषिद्ध है** क्योंकि इसके गंभीर सुरक्षा जोखिम हैं:

**सुरक्षा जोखिम:**
- **नियंत्रण परिहार**: आवश्यक सुरक्षा नियंत्रण जैसे दर सीमांकन, अनुरोध सत्यापन, और ट्रैफिक निगरानी को बायपास करता है  
- **जवाबदेही टूटना**: क्लाइंट की पहचान असंभव बनाता है, ऑडिट ट्रेल और घटना जांच को भ्रष्ट करता है  
- **प्रॉक्सी-आधारित चोरी**: दुर्भावनापूर्ण अभिनेताओं को बिना अनुमति के डेटा तक पहुँच के लिए सर्वरों का प्रॉक्सी के रूप में उपयोग करने की अनुमति देता है  
- **विश्वास सीमा उल्लंघन**: टोकन के स्रोतों के बारे में डाउनस्ट्रीम सेवा की धारणा को तोड़ता है  
- **पार्श्व आंदोलन**: कई सेवाओं में समझौता किए गए टोकन व्यापक हमलों के विस्तार में मदद करते हैं

**कार्यान्वयन नियंत्रण:**
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

### **सुरक्षित टोकन प्रबंधन पैटर्न**

**सर्वोत्तम प्रथाएं:**
- **अल्पकालिक टोकन**: बार-बार टोकन घुमाव के साथ जोखिमीय अवधि को कम करें  
- **जरूरत के अनुसार जारी करना**: केवल विशिष्ट ऑपरेशनों के लिए आवश्यक होने पर टोकन जारी करें  
- **सुरक्षित भंडारण**: हार्डवेयर सुरक्षा मॉड्यूल (HSM) या सुरक्षित की वॉल्ट का उपयोग करें  
- **टोकन बाइंडिंग**: जहां संभव हो टोकन को विशिष्ट क्लाइंट, सत्र या ऑपरेशन से जोड़े  
- **निरीक्षण और अलर्टिंग**: टोकन दुरुपयोग या अनधिकृत पहुँच के पैटर्न का वास्तविक समय में पता लगाना

## 3. **सत्र सुरक्षा नियंत्रण**

### **सत्र हाईजैकिंग रोकथाम**

**हमला पथ:**
- **सत्र हाईजैक प्रॉम्प्ट इंजेक्शन**: साझा सत्र स्थिति में दुर्भावनापूर्ण इवेंट इंजेक्ट करना  
- **सत्र impersonation**: चोरी हुए सत्र ID का अनधिकृत उपयोग करके प्रमाणीकरण को बायपास करना  
- **पुनरारंभ योग्य स्ट्रीम हमले**: सर्वर-भेजे इवेंट पुनरारंभ का दुरुपयोग कर दुर्भावनापूर्ण सामग्री इंजेक्शन

**अनिवार्य सत्र नियंत्रण:**
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

**संचरण सुरक्षा:**
- **HTTPS प्रवर्तन**: TLS 1.3 पर सभी सत्र संचार  
- **सुरक्षित कुकी विशेषताएं**: HttpOnly, Secure, SameSite=Strict  
- **प्रमाणपत्र पिनिंग**: मध्यस्थ हमलों (MITM) को रोकने के लिए महत्वपूर्ण कनेक्शन के लिए

### **स्टेटफुल बनाम स्टेटलेस विचार**

**स्टेटफुल कार्यान्वयन के लिए:**
- साझा सत्र स्थिति के खिलाफ इंजेक्शन हमलों से अतिरिक्त सुरक्षा आवश्यक  
- कतार-आधारित सत्र प्रबंधन के लिए अखंडता सत्यापन जरूरी  
- कई सर्वर इंस्टेंस के लिए सुरक्षित सत्र स्थिति समन्वय आवश्यक

**स्टेटलेस कार्यान्वयन के लिए:**
- JWT या समान टोकन-आधारित सत्र प्रबंधन  
- सत्र स्थिति अखंडता का क्रिप्टोग्राफिक सत्यापन  
- हमले की सतह कम, लेकिन मजबूत टोकन सत्यापन आवश्यक

## 4. **एआई-विशिष्ट सुरक्षा नियंत्रण**

**OWASP MCP जोखिम संबोधित:**
- [MCP06 - प्रॉम्प्ट फ्लो सबवर्शन](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - उपकरण विषाक्तता](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - कमांड इंजेक्शन एवं कार्यान्वयन](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **प्रॉम्प्ट इंजेक्शन रक्षा**

**Microsoft प्रॉम्प्ट शील्ड्स एकीकरण:**
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

**कार्यान्वयन नियंत्रण:**
- **इनपुट सैनिटाइजेशन**: सभी उपयोगकर्ता इनपुट का व्यापक सत्यापन और फ़िल्टरिंग  
- **सामग्री सीमा परिभाषा**: सिस्टम निर्देशों और उपयोगकर्ता सामग्री के बीच स्पष्ट अलगाव  
- **निर्देशन पदानुक्रम**: विरोधी निर्देशों के लिए उचित प्राथमिकता नियम  
- **आउटपुट निगरानी**: संभावित नुकसानदेह या संशोधित आउटपुट का पता लगाना

### **उपकरण विषाक्तता रोकथाम**

**उपकरण सुरक्षा ढांचा:**
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

**गतिशील उपकरण प्रबंधन:**
- **स्वीकृति कार्यप्रवाह**: उपकरण संशोधनों के लिए स्पष्ट उपयोगकर्ता सहमति  
- **रोलबैक क्षमताएं**: पूर्व उपकरण संस्करणों पर वापस जाने की सुविधा  
- **परिवर्तन ऑडिटिंग**: उपकरण परिभाषा संशोधनों का पूरा इतिहास  
- **जोखिम मूल्यांकन**: उपकरण सुरक्षा स्थिति का स्वचालित मूल्यांकन

## 5. **कन्फ्यूज्ड डेप्पी हमला रोकथाम**

### **OAuth प्रॉक्सी सुरक्षा**

**हमला रोकथाम नियंत्रण:**
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

**कार्यान्वयन आवश्यकताएँ:**
- **उपयोगकर्ता सहमति सत्यापन**: गतिशील क्लाइंट पंजीकरण के लिए अनुमति स्क्रीन कभी न छोड़ें  
- **Redirect URI सत्यापन**: रीडायरेक्ट डेस्टिनेशन की कड़ाई से व्हाइटलिस्ट आधारित जांच  
- **प्राधिकरण कोड सुरक्षा**: अल्पकालिक कोड जो केवल एक बार उपयोग में आ सकें  
- **क्लाइंट पहचान सत्यापन**: क्लाइंट प्रमाणपत्र और मेटाडेटा का मजबूत सत्यापन

## 6. **उपकरण निष्पादन सुरक्षा**

### **सैंडबॉक्सिंग और पृथक्करण**

**कंटेनर-आधारित पृथक्करण:**
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

**प्रोसेस पृथक्करण:**
- **अलग प्रोसेस संदर्भ**: प्रत्येक उपकरण निष्पादन एक पृथक प्रोसेस स्थान में  
- **इंटर-प्रोसेस संचार**: सत्यापन के साथ सुरक्षित IPC मैकेनिज्म  
- **प्रोसेस निगरानी**: रनटाइम व्यवहार विश्लेषण और असामान्यता पता लगाना  
- **संसाधन प्रवर्तन**: CPU, मेमोरी और I/O ऑपरेशंस पर कड़े प्रतिबंध

### **न्यूनतम विशेषाधिकार कार्यान्वयन**

**अनुमति प्रबंधन:**
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

## 7. **सप्लाई चैन सुरक्षा नियंत्रण**

**OWASP MCP जोखिम संबोधित**: [MCP04 - सॉफ्टवेयर सप्लाई चैन हमले और निर्भरता छेड़छाड़](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **निर्भरता सत्यापन**

**व्यापक कंपोनेंट सुरक्षा:**
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

### **लगातार निगरानी**

**सप्लाई चैन खतरे का पता लगाना:**
- **निर्भरता स्वास्थ्य निगरानी**: सभी निर्भरताओं का निरंतर मूल्यांकन सुरक्षा मुद्दों के लिए  
- **खतरा खुफिया एकीकरण**: उभरते सप्लाई चैन खतरों पर वास्तविक समय अपडेट  
- **व्यवहार विश्लेषण**: बाहरी कंपोनेंट्स में असामान्य व्यवहार का पता लगाना  
- **स्वचालित प्रतिक्रिया**: समझौता किए गए कंपोनेंट्स की त्वरित रोकथाम

## 8. **निगरानी और पता लगाने के नियंत्रण**

**OWASP MCP जोखिम संबोधित**: [MCP08 - ऑडिट और टेलीमेट्री की कमी](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **सुरक्षा जानकारी और घटना प्रबंधन (SIEM)**

**व्यापक लॉगिंग रणनीति:**
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

### **रियल-टाइम खतरा पता लगाना**

**व्यवहार विश्लेषण:**
- **उपयोगकर्ता व्यवहार विश्लेषण (UBA)**: असामान्य उपयोगकर्ता पहुँच पैटर्न का पता लगाना  
- **इकाई व्यवहार विश्लेषण (EBA)**: MCP सर्वर और उपकरण व्यवहार का निगरानी  
- **मशीन लर्निंग असामान्यता पहचान**: AI-समर्थित सुरक्षा खतरों की पहचान  
- **खतरा खुफिया सहसंबंध**: ज्ञात हमला पैटर्न के विरुद्ध देखी गई गतिविधियों का मिलान

## 9. **घटना प्रतिक्रिया और पुनर्प्राप्ति**

### **स्वचालित प्रतिक्रिया क्षमताएं**

**तत्काल प्रतिक्रिया क्रियाएं:**
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

### **फोरेंसिक क्षमताएं**

**जांच समर्थन:**
- **ऑडिट ट्रेल संरक्षण**: अभेद्य लॉगिंग क्रिप्टोग्राफिक अखंडता के साथ  
- **साक्ष्य संग्रह**: संबंधित सुरक्षा साक्ष्यों का स्वचालित संग्रह  
- **टाइमलाइन पुनर्निर्माण**: सुरक्षा घटनाओं के निर्देशित अनुक्रम की विस्तृत श्रृंखला  
- **प्रभाव मूल्यांकन**: समझौते की सीमा और डेटा एक्सपोजर का आकलन

## **प्रमुख सुरक्षा वास्तुकला सिद्धांत**

### **गहराई में सुरक्षा (Defense in Depth)**
- **कई सुरक्षा परतें**: सुरक्षा वास्तुकला में कोई एकल विफलता बिंदु नहीं  
- **प्रतिलोम नियंत्रण**: महत्वपूर्ण कार्यों के लिए अतिव्याप्त सुरक्षा उपाय  
- **फेल-सेफ तंत्र**: जब सिस्टम त्रुटियों या हमलों का सामना करते हैं, तो सुरक्षित डिफ़ॉल्ट

### **शून्य विश्वास कार्यान्वयन**
- **कभी भरोसा न करें, हमेशा सत्यापित करें**: सभी इकाइयों और अनुरोधों का लगातार सत्यापन  
- **न्यूनतम विशेषाधिकार सिद्धांत**: सभी घटकों के लिए न्यूनतम पहुंच अधिकार  
- **सूक्ष्म विभाजन**: सूक्ष्म नेटवर्क और पहुँच नियंत्रण

### **सतत सुरक्षा विकास**
- **खतरा परिदृश्य अनुकूलन**: उभरते खतरों को संबोधित करने के लिए नियमित अपडेट  
- **सुरक्षा नियंत्रण प्रभावशीलता**: नियंत्रणों का निरंतर मूल्यांकन और सुधार  
- **विनिर्देशन अनुपालन**: विकसित होते MCP सुरक्षा मानकों के अनुरूप

---

## **कार्यान्वयन संसाधन**

### **अधिकृत MCP प्रलेखन**
- [MCP विनिर्देशन (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP सुरक्षा सर्वोत्तम प्रथाएं](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP प्राधिकरण विनिर्देशन](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP सुरक्षा संसाधन**
- [OWASP MCP Azure सुरक्षा गाइड](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP टॉप 10 के साथ Azure कार्यान्वयन  
- [OWASP MCP टॉप 10](https://owasp.org/www-project-mcp-top-10/) - आधिकारिक OWASP MCP सुरक्षा जोखिम  
- [MCP सुरक्षा सम्मेलन कार्यशाला (शेरपा)](https://azure-samples.github.io/sherpa/) - Azure पर MCP के लिए हैंड्स-ऑन सुरक्षा प्रशिक्षण

### **Microsoft सुरक्षा समाधान**
- [Microsoft प्रॉम्प्ट शील्ड्स](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure कंटेंट सेफ्टी](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub एडवांस्ड सुरक्षा](https://github.com/security/advanced-security)
- [Azure की वॉल्ट](https://learn.microsoft.com/azure/key-vault/)

### **सुरक्षा मानक**
- [OAuth 2.0 सुरक्षा सर्वोत्तम प्रथाएं (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [बड़े भाषा मॉडल के लिए OWASP टॉप 10](https://genai.owasp.org/)
- [NIST साइबर सुरक्षा फ्रेमवर्क](https://www.nist.gov/cyberframework)

---

> **महत्वपूर्ण**: ये सुरक्षा नियंत्रण वर्तमान MCP विनिर्देशन (2025-11-25) को प्रतिबिंबित करते हैं। मानकों में तेज़ी से विकास जारी है, इसलिए हमेशा नवीनतम [आधिकारिक प्रलेखन](https://spec.modelcontextprotocol.io/) के खिलाफ सत्यापित करें।

## आगे क्या है

- लौटें: [सुरक्षा मॉड्यूल अवलोकन](./README.md)
- जारी रखें: [मॉड्यूल 3: शुरुआत](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->