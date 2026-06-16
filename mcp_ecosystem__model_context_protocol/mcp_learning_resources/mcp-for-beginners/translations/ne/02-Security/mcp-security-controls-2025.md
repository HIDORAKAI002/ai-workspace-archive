# MCP सुरक्षा नियन्त्रणहरू - फेब्रुअरी २०२६ अपडेट

> **हालको मापदण्ड**: यो दस्तावेज [MCP विशिष्टता २०२५-११-२५](https://spec.modelcontextprotocol.io/specification/2025-11-25/) को सुरक्षा आवश्यकताहरू र आधिकारिक [MCP सुरक्षा राम्रो अभ्यासहरू](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) लाई प्रतिबिम्बित गर्दछ।

Model Context Protocol (MCP) ले परम्परागत सफ्टवेयर सुरक्षा र AI-विशेष खतराहरूलाई सम्बोधन गर्ने उन्नत सुरक्षा नियन्त्रणहरूसँग उल्लेखनीय रूपमा परिपक्वता प्राप्त गरेको छ। यो दस्तावेज OWASP MCP टप १० फ्रेमवर्कसँग मेल खाने सुरक्षित MCP कार्यान्वयनहरूको लागि व्यापक सुरक्षा नियन्त्रणहरू प्रदान गर्दछ।

## 🏔️ व्यावहारिक सुरक्षा प्रशिक्षण

व्यावहारिक, हात-हातमा सुरक्षा कार्यान्वयन अनुभवका लागि, हामी **[MCP सुरक्षा सम्मलेन कार्यशाला (शेरपा)](https://azure-samples.github.io/sherpa/)** सिफारिस गर्छौं - Azure मा MCP सर्भरहरूलाई "संकटग्रस्त → शोषण → सुधार → प्रमाणित" विधि प्रयोग गरेर सुरक्षित गर्नका लागि एक व्यापक मार्गनिर्देश।

यस दस्तावेजमा रहेका सबै सुरक्षा नियन्त्रणहरू **[OWASP MCP Azure सुरक्षा मार्गदर्शक](https://microsoft.github.io/mcp-azure-security-guide/)** सँग मिल्दोजुल्दो छन्, जसले OWASP MCP टप १० जोखिमहरूको लागि संदर्भ वास्तुकला र Azure-विशेष कार्यान्वयन मार्गनिर्देशन प्रदान गर्दछ।

## **आवश्यक सुरक्षा आवश्यकताहरू**

### **MCP विशिष्टताबाट महत्वपूर्ण प्रतिबन्धहरू:**

> **निषेधित**: MCP सर्भरहरूले **कुनै पनि टोकन जुन स्पष्ट रूपमा MCP सर्भरका लागि जारी गरिएको छैन** स्वीकार्नु हुँदैन  
>
> **प्रतिबन्धित**: MCP सर्भरहरूले प्रमाणीकरणका लागि सत्रहरू प्रयोग गर्नु हुँदैन  
>
> **आवश्यक**: MCP सर्भरहरूले प्राधिकरण कार्यान्वयन गर्दा **सबै** इनबाउन्ड अनुरोधहरूको प्रमाणिकरण गर्नै पर्दछ  
>
> **अनिवार्य**: स्थिर क्लाइन्ट ID प्रयोग गर्ने MCP प्रोक्सी सर्भरहरूले प्रत्येक गतिशील रूपमा दर्ता गरिएको क्लाइन्टको लागि प्रयोगकर्ता सहमति लिनै पर्दछ

---

## १. **प्रमाणीकरण र प्राधिकरण नियन्त्रणहरू**

### **बाह्य पहिचान प्रदायक एकीकरण**

**हालको MCP मापदण्ड (२०२५-११-२५)** ले MCP सर्भरहरूलाई बाह्य पहिचान प्रदायकहरूलाई प्रमाणीकरण सुम्पन अनुमति दिन्छ, जुन महत्वपूर्ण सुरक्षा सुधार हो:

**OWASP MCP जोखिम सम्बोधन**: [MCP07 - अपर्याप्त प्रमाणीकरण र प्राधिकरण](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**सुरक्षा लाभहरू:**
१. **अनुकूलित प्रमाणीकरण जोखिमहरू हटाउँछ**: अनुकूलित प्रमाणीकरण कार्यान्वयनबाट जोखिम सतह घटाउँछ  
२. **उद्यम तह सुरक्षा**: Microsoft Entra ID जस्ता स्थापित पहिचान प्रदायकहरूलाई सुरक्षित सुविधाहरू सहित उपयोग गर्दछ  
३. **केन्द्रीय पहिचान व्यवस्थापन**: प्रयोगकर्ता जीवनचक्र व्यवस्थापन, पहुँच नियन्त्रण र अनुपालन अडिटलाई सरल बनाउँछ  
४. **बहु-तत्त्व प्रमाणीकरण**: उद्यम पहिचान प्रदायकहरूबाट MFA क्षमता प्राप्त गर्दै  
५. **सशर्त पहुँच नीतिहरू**: जोखिम-आधारित पहुँच नियन्त्रण र अनुकूली प्रमाणीकरणको फाइदा  

**कार्यान्वयन आवश्यकताहरू:**
- **टोकन श्रोता प्रमाणीकरण**: सबै टोकनहरू स्पष्ट रूपमा MCP सर्भरका लागि जारी गरिएको हुनुपर्ने  
- **इशूअर प्रमाणीकरण**: टोकन जारी गर्ने पक्ष अपेक्षित पहिचान प्रदायकसँग मेल खान्छ कि छैन जाँच्ने  
- **हस्ताक्षर प्रमाणीकरण**: टोकनको अखण्डता क्रिप्टोग्राफिक रूपमा मान्य गर्ने  
- **अवधि समाप्ति लागू गर्ने**: टोकनको अवधि सीमा कडा पालन गर्ने  
- **पहुँच दायरा प्रमाणीकरण**: टोकनहरूमा अनुरोधित कार्यहरूको लागि उपयुक्त अनुमति भएको सुनिश्चित गर्ने  

### **प्राधिकरण तर्क सुरक्षा**

**महत्वपूर्ण नियन्त्रणहरू:**
- **व्यापक प्राधिकरण अडिटहरू**: सबै प्राधिकरण निर्णय बिन्दुहरूको नियमित सुरक्षा समीक्षा  
- **फेल-सेफ पूर्वनिर्धारित सेटिङहरू**: जब प्राधिकरण तर्कले स्पष्ट निर्णय गर्न सक्दैन तब पहुँच अस्वीकृत गर्ने  
- **अनुमति सीमाहरू**: फरक भेदस्तर र स्रोत पहुँचमा स्पष्ट विभाजन  
- **अडिट लगिङ**: सुरक्षा निगरानीका लागि सबै प्राधिकरण निर्णयहरूको पूर्ण लगिङ  
- **नियमित पहुँच समीक्षा**: प्रयोगकर्ता अनुमतिहरू र भेदस्तर आवंटनहरूको आवधिक प्रमाणीकरण  

## २. **टोकन सुरक्षा र एन्टी-पासथ्रु नियन्त्रणहरू**

**OWASP MCP जोखिम सम्बोधन**: [MCP01 - टोकन व्यवस्थापन त्रुटि र गोप्यताको खुलासा](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **टोकन पासथ्रु रोकथाम**

**MCP प्राधिकरण विशिष्टतामा** टोकन पासथ्रु स्पष्ट रूपमा निषेध गरिएको छ किनकि यसले महत्वपूर्ण सुरक्षा जोखिमहरू निम्त्याउँछ:

**सुरक्षा जोखिमहरू:**
- **नियन्त्रण बाईपास**: दर सीमांकन, अनुरोध प्रमाणीकरण, र ट्राफिक निगरानी जस्ता महत्त्वपूर्ण सुरक्षा नियन्त्रणहरूलाई चाँहिएको  
- **जवाफदेही विच्छेद**: क्लाइन्ट पहिचान असम्भव पारेर अडिट परीक्षण र घटनाघटना अनुसन्धानमा समस्या  
- **प्रोक्सी आधारित डाटाको दुरुपयोग**: सर्भरहरूलाई अनधिकृत डाटा पहुँचका लागि प्रोक्सी बनाएर दुष्ट प्रयोगकर्ताहरूलाई सघाउने  
- **विश्वास सीमाना उल्लंघन**: तलका सेवाहरूले टोकन मूलको बारेमा राखेका विश्वास मान्यताहरूलाई उल्लंघन गर्ने  
- **पार्श्वगत आक्रमण विस्तार**: कम्जोर टोकनहरू प्रयोग गरेर धेरै सेवामा आक्रमण विस्तार गर्न सहज हुने  

**कार्यान्वयन नियन्त्रणहरू:**
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

### **सुरक्षित टोकन व्यवस्थापन ढाँचाहरू**

**सर्वोत्तम अभ्यासहरू:**
- **छोटो-अवधि टोकनहरू**: टोकनलाई बारम्बार परिवर्तन गरी जोखिम विण्डो घटाउने  
- **ठ्याक्कै आवश्यकतामा जारी गर्ने**: विशिष्ट अपरेशनहरूको लागि मात्र टोकन जारी गर्ने  
- **सुरक्षित भण्डारण**: हार्डवेयर सुरक्षा मोड्युलहरू (HSMs) वा सुरक्षित की भल्टहरू प्रयोग गर्ने  
- **टोकन बाँध्ने**: टोकनहरूलाई सम्भव छ भने विशेष क्लाइन्टहरू, सत्रहरू, वा अपरेशनहरूसँग बाँध्ने  
- **निगरानी र चेतावनी**: टोकन दुरुपयोग वा अनधिकृत पहुँच ढाँचाहरूको वास्तविक-समय पत्ता लगाउने  

## ३. **सत्र सुरक्षा नियन्त्रणहरू**

### **सत्र अपहरण रोकथाम**

**आक्रमण विधिहरू:**
- **सत्र अपहरण प्रॉम्प्ट इन्जेक्शन**: साझा सत्र अवस्थामाथि दुष्ट घटनाहरू इन्जेक्ट गर्ने  
- **सत्र सट्टाबाजी**: चोरी गरिएको सत्र ID को दुरुपयोग गरेर प्रमाणीकरण बाईपास गर्ने  
- **पुनः सुरु गर्न मिल्ने स्ट्रिम आक्रमणहरू**: सर्भर पठाएको घटना पुन: सुरू गरेर दुष्ट सामग्री इन्जेक्शन गर्ने  

**अनिवार्य सत्र नियन्त्रणहरू:**
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

**ट्रान्सपोर्ट सुरक्षा:**
- **HTTPS लागू गर्ने**: सबै सत्र संचार TLS १.३ मार्फत  
- **सुरक्षित कुकिज विशेषताहरू**: HttpOnly, Secure, SameSite=Strict  
- **सर्टिफिकेट पिनिङ**: MITM आक्रमण रोक्न महत्वपूर्ण जडानहरूको लागि  

### **राज्यपूर्ण र राज्यरहित विचारहरू**

**राज्यपूर्ण कार्यान्वयनहरूको लागि:**
- साझा सत्र अवस्थामाथि इन्जेक्शन आक्रमण विरुद्ध थप सुरक्षा आवश्यक  
- क्यू-आधारित सत्र व्यवस्थापनमा अखण्डता प्रमाणीकरण आवश्यक  
- धेरै सर्भर उदाहरणहरूमा सुरक्षित सत्र अवस्था समक्रमण जरूरी  

**राज्यरहित कार्यान्वयनहरूको लागि:**
- JWT वा यस्तै टोकन-आधारित सत्र व्यवस्थापन  
- सत्र अवस्थामा क्रिप्टोग्राफिक प्रमाणीकरण  
- आक्रमण सतह घट्ने, तर लोचदार टोकन प्रमाणीकरण आवश्यक  

## ४. **AI-विशेष सुरक्षा नियन्त्रणहरू**

**OWASP MCP जोखिमहरू सम्बोधन गरिएका:**
- [MCP06 - इंटेन्ट फ्लो सब्भर्शन](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - उपकरण विषाक्तता](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - आदेश इन्जेक्शन र निष्पादन](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **प्रॉम्प्ट इन्जेक्शन सुरक्षा**

**Microsoft Prompt Shields एकीकरण:**
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

**कार्यान्वयन नियन्त्रणहरू:**
- **इनपुट सफाइ**: सबै प्रयोगकर्ता इनपुटहरूको पूर्ण प्रमाणीकरण र फिल्टरिंग  
- **सामग्री सीमाना परिभाषा**: प्रणाली निर्देशनहरू र प्रयोगकर्ता सामग्री बीच स्पष्ट विभाजन  
- **निर्देशन पदानुक्रम**: विरोधाभासी निर्देशनहरूको लागि उचित प्राथमिकता नियमहरू  
- **आउटपुट निगरानी**: संभावित हानिकारक वा सञ्चालित आउटपुटको पत्ता लगाउने  

### **उपकरण विषाक्तता रोकथाम**

**उपकरण सुरक्षा फ्रेमवर्क:**
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

**गतिशील उपकरण व्यवस्थापन:**
- **स्वीकृति कार्यप्रवाहहरू**: उपकरण संशोधनोंको लागि स्पष्ट प्रयोगकर्ता सहमति  
- **रोलब्याक क्षमता**: उपकरणको अघिल्लो संस्करणमा फर्किन सक्ने क्षमता  
- **परिवर्तन अडिटिङ**: उपकरण परिभाषा संशोधनहरूको पूर्ण इतिहास  
- **जोखिम मूल्यांकन**: उपकरण सुरक्षा स्थितिको स्वचालित मूल्याङ्कन  

## ५. **भ्रमित डिप्टी आक्रमण रोकथाम**

### **OAuth प्रोक्सी सुरक्षा**

**आक्रमण रोकथाम नियन्त्रणहरू:**
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

**कार्यान्वयन आवश्यकताहरू:**
- **प्रयोगकर्ता सहमति प्रमाणीकरण**: गतिशील क्लाइन्ट दर्ताका लागि सहमति स्क्रिन कहिल्यै बाईपास नगर्ने  
- **रिडिरेक्ट URI प्रमाणीकरण**: रिडिरेक्ट गन्तव्यहरूको कडा श्वेतसूची आधारमा प्रमाणीकरण  
- **प्राधिकरण कोड सुरक्षा**: छोटो अवधिका कोडहरू र एक पटक मात्र प्रयोग अनिवार्यता  
- **क्लाइन्ट पहिचान प्रमाणीकरण**: क्लाइन्ट प्रमाणपत्र तथा मेटाडेटाको कडा प्रमाणीकरण  

## ६. **उपकरण निष्पादन सुरक्षा**

### **स्यान्डबक्सिङ र पृथकता**

**कन्टेनर आधारित पृथकता:**
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

**प्रोसेस पृथकता:**
- **विभिन्न प्रोसेस सन्दर्भहरू**: प्रत्येक उपकरण निष्पादनलाई पृथक प्रोसेस क्षेत्रमा राख्ने  
- **अन्तर-प्रोसेस संचार**: प्रमाणीकरण सहित सुरक्षित IPC मेकानिजमहरू  
- **प्रोसेस निगरानी**: आधिकारिक व्यवहार विश्लेषण र अनियमितता पत्ता लगाउने  
- **स्रोत लागू गर्ने**: CPU, स्मृति, र I/O अपरेशनहरूमा कडा सिमाना  

### **एउटै न्यूनतम अधिकार कार्यान्वयन**

**अनुमति व्यवस्थापन:**
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

## ७. **आपूर्ति शृंखला सुरक्षा नियन्त्रणहरू**

**OWASP MCP जोखिम सम्बोधन**: [MCP04 - सफ्टवेयर आपूर्ति श्रृंखला आक्रमण र निर्भरता छेडछाड](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **निर्भरता प्रमाणीकरण**

**व्यापक कम्पोनेंट सुरक्षा:**
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

**आपूर्ति श्रृंखला खतरा पत्ता लगाउने:**
- **निर्भरता स्वास्थ्य निगरानी**: सबै निर्भरताहरूमा सुरक्षा समस्याहरूको निरन्तर मूल्याङ्कन  
- **खतरा खुफिया एकीकरण**: नयाँ आपूर्ति श्रृंखला खतराहरूमा वास्तविक-समय अपडेटहरू  
- **व्यवहार विश्लेषण**: बाह्य कम्पोनेंटहरूमा असामान्य व्यवहारको पत्ता लगाउने  
- **स्वचालित प्रतिक्रिया**: क्षतिग्रस्त कम्पोनेंटहरूको तुरुन्त नियन्त्रण  

## ८. **निगरानी र पत्ता लगाउने नियन्त्रणहरू**

**OWASP MCP जोखिम सम्बोधन**: [MCP08 - अडिट र टेलिमेट्रीको कमी](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **सुरक्षा सूचना र घटना व्यवस्थापन (SIEM)**

**व्यापक लगिङ रणनीति:**
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

### **वास्तविक-समय खतरा पत्ता लगाउने**

**व्यवहार विश्लेषण:**
- **प्रयोगकर्ता व्यवहार विश्लेषण (UBA)**: असामान्य प्रयोगकर्ता पहुँच ढाँचाहरूको पत्ता लगाउने  
- **इकाई व्यवहार विश्लेषण (EBA)**: MCP सर्भर र उपकरणको व्यवहारको निगरानी  
- **मेसिन लर्निङ अनौठोपना पत्ता लगाउने**: AI-चालित सुरक्षा खतराहरूको पहिचान  
- **खतरा खुफिया सहसंबंधन**: ज्ञात आक्रमण ढाँचाहरूसँग अवलोकित गतिविधिलाई तुलना गर्ने  

## ९. **घटना प्रतिक्रिया र पुन: प्राप्ति**

### **स्वचालित प्रतिक्रिया क्षमता**

**तात्कालिक प्रतिक्रिया कार्यहरू:**
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

### **फरेन्सिक क्षमता**

**अनुसन्धान समर्थन:**
- **अडिट ट्रेल संरक्षण**: अपरिवर्तनीय लगिङ र क्रिप्टोग्राफिक अखण्डता  
- **प्रमाण सङ्कलन**: सम्बन्धित सुरक्षा प्रमाणपत्रहरूको स्वचालित सङ्कलन  
- **समयरेखा पुनर्निर्माण**: सुरक्षा घटनाहरूमा पुर्‍याउने विस्तृत घटनाक्रम  
- **प्रभाव मूल्यांकन**: सम्झौता दायरा र डाटा खुलासाको मूल्याङ्कन  

## **मुख्य सुरक्षा वास्तुकला सिद्धान्तहरू**

### **गहिराइमा सुरक्षा (Defense in Depth)**
- **एक भन्दा धेरै सुरक्षा तहहरू**: सुरक्षा वास्तुकलामा कुनै एकल असफलता बिन्दु हुँदैन  
- **अतिरिक्त नियन्त्रणहरू**: संवेदनशील कार्यहरूको लागि ओभरल्याप सुरक्षा उपायहरू  
- **फेल-सेफ मेकानिजमहरू**: प्रणालीहरूमा त्रुटि वा आक्रमण हुँदा सुरक्षित पूर्वनिर्धारित सेटिङहरू  

### **शून्य विश्वास कार्यान्वयन (Zero Trust Implementation)**
- **कहिल्यै विश्वास नगर्ने, सधैँ प्रमाणीकरण गर्ने**: सबै इकाइ र अनुरोधहरूको निरन्तर प्रमाणीकरण  
- **न्यूनतम अधिकारको सिद्धान्त**: सबै कम्पोनेंटहरूको लागि न्यूनतम पहुँच अधिकार  
- **सूक्ष्म-सेगमेन्टेसन**: सञ्जाल र पहुँच नियन्त्रणहरू सूक्ष्म तहमा  

### **निरन्तर सुरक्षा विकास**
- **खतरा क्षेत्रफल अनुकूलन**: देखापरेका नयाँ खतराहरूसँग मेल खाने नियमित अद्यावधिक  
- **सुरक्षा नियन्त्रण प्रभावकारिता**: नियन्त्रणहरूको निरन्तर समीक्षा र सुधार  
- **विशिष्टता अनुपालन**: विकसित हुँदै गएको MCP सुरक्षा मापदण्डसँग मेल खाने  

---

## **कार्यान्वयन स्रोतहरू**

### **आधिकारिक MCP दस्तावेजहरू**
- [MCP विशिष्टता (२०२५-११-२५)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP सुरक्षा राम्रो अभ्यासहरू](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP प्राधिकरण विशिष्टता](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP सुरक्षा स्रोतहरू**
- [OWASP MCP Azure सुरक्षा मार्गदर्शक](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP टप १० र Azure कार्यान्वयन  
- [OWASP MCP टप १०](https://owasp.org/www-project-mcp-top-10/) - आधिकारिक OWASP MCP सुरक्षा जोखिमहरू  
- [MCP सुरक्षा सम्मलेन कार्यशाला (शेरपा)](https://azure-samples.github.io/sherpa/) - Azure मा MCP को लागि व्यावहारिक सुरक्षा प्रशिक्षण  

### **Microsoft सुरक्षा समाधानहरू**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **सुरक्षा मापदण्डहरू**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)
- [NIST साइबरसुरक्षा फ्रेमवर्क](https://www.nist.gov/cyberframework)

---

> **महत्त्वपूर्ण**: यी सुरक्षा नियन्त्रणहरूले हालको MCP विशिष्टता (२०२५-११-२५) लाई प्रतिबिम्बित गर्छन्। मापदण्डहरू द्रुत रूपमा विकास भइरहेकाले नयाँ [आधिकारिक दस्तावेज](https://spec.modelcontextprotocol.io/) सँग सधैं प्रमाणिकरण गर्न आवश्यक छ।

## के गर्ने

- फर्किनुहोस्: [सुरक्षा मोड्युल अवलोकन](./README.md)
- अगाडि बढ्नुहोस्: [मोड्युल ३: सुरु गर्दै](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->