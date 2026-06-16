# MCP सुरक्षा नियंत्रण - फेब्रुवारी 2026 अपडेट

> **सध्याचा मानक**: हा दस्तऐवज [MCP तपशील 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) सुरक्षा आवश्यकता आणि अधिकृत [MCP सुरक्षा उत्तम प्रथा](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) दर्शवितो.

मॉडेल कॉन्टेक्स्ट प्रोटोकॉल (MCP) पारंपरिक सॉफ्टवेअर सुरक्षा आणि AI-विशिष्ट धमक्या यांना सामोरे जाणारे मजबूत सुरक्षा नियंत्रणांसह लक्षणीय प्रगती केली आहे. हा दस्तऐवज सुरक्षित MCP अंमलबजावणींसाठी समग्र सुरक्षा नियंत्रण पुरवतो जे OWASP MCP टॉप 10 फ्रेमवर्कशी संरेखित आहेत.

## 🏔️ प्रत्यक्ष सुरक्षा प्रशिक्षण

प्रायोगिक, प्रत्यक्ष सुरक्षा अंमलबजावणीचा अनुभव घेण्यासाठी, आम्ही **[MCP सुरक्षा संमेलन कार्यशाळा (शेरपा)](https://azure-samples.github.io/sherpa/)** शिफारस करतो - Azure मध्ये MCP सर्व्हर्स सुरक्षित करण्यासाठी "कमजोर → शोषण → दुरुस्ती → सत्यापन" पद्धतीने मार्गदर्शित व्यापक अभियान.

या दस्तऐवजातली सर्व सुरक्षा नियंत्रणं **[OWASP MCP Azure सुरक्षा मार्गदर्शक](https://microsoft.github.io/mcp-azure-security-guide/)** शी संरेखित आहेत, जी OWASP MCP टॉप 10 धोके यासाठी संदर्भ स्थापत्य आणि Azure-विशिष्ट अंमलबजावणी मार्गदर्शन पुरवते.

## **आवश्यक सुरक्षा गरजा**

### **MCP तपशीलातील गंभीर बंदी:**

> **प्रतिषिद्ध**: MCP सर्व्हर्स **कधीही स्वीकारू नयेत** असे टोकन्स जे स्पष्टपणे MCP सर्व्हरसाठी जारी केलेले नाहीत  
>  
> **मनाई**: MCP सर्व्हर्स **प्रमाणीकरणासाठी सत्र वापरू नयेत**  
>  
> **आवश्यक**: प्राधिकरण लागू करणाऱ्या MCP सर्व्हर्सनी **सर्व येणार्‍या विनंत्या तपासाव्यात**  
>  
> **आवश्यक आहे**: स्थिर क्लायंट आयडी वापरणाऱ्या MCP प्रॉक्सी सर्व्हर्सनी प्रत्येक गतिशील नोंदणीकृत क्लायंटसाठी वापरकर्ता संमती घ्यावी  

---

## 1. **प्रमाणीकरण आणि प्राधिकरण नियंत्रण**

### **बाह्य ओळख पुरवठादार समाकलन**

**सध्याचा MCP मानक (2025-11-25)** MCP सर्व्हर्सना बाह्य ओळख पुरवठादारांकडे प्रमाणीकरण सुपूर्त करण्याची परवानगी देतो, जे एक महत्त्वपूर्ण सुरक्षा सुधारणा आहे:

**OWASP MCP धोका निवारण**: [MCP07 - अपुरी प्रमाणीकरण आणि प्राधिकरण](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**सुरक्षा फायदे:**
1. **सानुकूल प्रमाणीकरण धोके दूर करणे**: सानुकूल प्रमाणीकरण अंमलबजावण्या टाळून असुरक्षिततेचा धोका कमी करतो
2. **उद्योग-स्तरीय सुरक्षा**: Microsoft Entra ID सारख्या प्रस्थापित ओळख पुरवठादारांकडून प्रगत सुरक्षा वैशिष्ट्ये वापरतो
3. **केंद्रित ओळख व्यवस्थापन**: वापरकर्ता जीवनचक्र व्यवस्थापन, प्रवेश नियंत्रण आणि अनुपालन तपासणी सुलभ करतो
4. **बहु-घटक प्रमाणीकरण**: उद्योग ओळख पुरवठादारांकडून MFA क्षमता मिळते
5. **अटी आधारित प्रवेश धोरणे**: धोका आधारित प्रवेश नियंत्रण आणि अनुकूली प्रमाणीकरण यांचा लाभ

**अंमलबजावणी आवश्यकता:**
- **टोकन प्रेक्षक पडताळणी**: सर्व टोकन्स स्पष्टपणे MCP सर्व्हरसाठी जारी झाले आहेत का ते तपासा
- **जारीकर्त्याची पडताळणी**: टोकन जारी करणारा अपेक्षित ओळख पुरवठादाराशी जुळतो का ते पडताळा
- **स्वाक्षरी पडताळणी**: टोकन अखंडतेची क्रिप्टोग्राफिक पडताळणी
- **कालावधी अंमलबजावणी**: टोकन वैध कालमर्यादा कडकपणे लागू करा
- **सेवा व्याप्ती पडताळणी**: टोकनमध्ये विनंती केलेल्या ऑपरेशन्ससाठी योग्य परवानग्या आहेत याची खात्री करा

### **प्राधिकरण लॉजिक सुरक्षा**

**गंभीर नियंत्रण:**
- **समग्र प्राधिकरण तपासणी**: सर्व प्राधिकरण निर्णयांचे नियमित सुरक्षा पुनरावलोकन
- **अयशस्वी-सेफ डीफॉल्ट**: जर निर्णय घेता आला नाही तर प्रवेश नाकारणे
- **परवानगी सीमा**: वेगळ्या अधिकार स्तर आणि संसाधन प्रवेश यामध्ये स्पष्ट विभाजन
- **तपासणी लॉगिंग**: सुरक्षा निरीक्षणासाठी सर्व प्राधिकरण निर्णयांचे संपूर्ण लॉगिंग
- **नियमित प्रवेश पुनरावलोकन**: वापरकर्ता परवानग्या आणि अधिकारांची कालिक पडताळणी

## 2. **टोकन सुरक्षा आणि अँटी-पासथ्रू नियंत्रण**

**OWASP MCP धोका निवारण**: [MCP01 - टोकन गैरव्यवस्थापन आणि गुपित लीक](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **टोकन पासथ्रू प्रतिबंध**

**MCP प्राधिकरण तपशिलामध्ये टोकन पासथ्रू स्पष्टपणे प्रतिबंधित आहे** कारण त्यात गंभीर सुरक्षा धोके आहेत:

**सुरक्षा धोके दूर करणे:**
- **नियंत्रण टाळणे**: दर मर्यादित करणे, विनंती पडताळणी, वाहतूक निरीक्षण यांसारख्या आवश्यक सुरक्षा नियंत्रणांपासून वंचित करतो
- **जबाबदारी खराब होणे**: क्लायंट ओळख करणं अशक्य होऊन तपासणी मार्ग आणि घटनेची चौकशी खराब होते
- **प्रॉक्सी-आधारित डेटा चोरी**: सर्व्हर्सना अनधिकृत डेटापर्यंत पोहोचण्यासाठी प्रॉक्सीप्रमाणे वापरून दुष्ट व्यक्तींना मदत करतो
- **विश्वास सीमा भंग**: टोकन उत्पत्तीविषयी पुढील सेवा विश्वास भंग करतो
- **पार्श्वभागी हालचाल**: अनेक सेवांमध्ये सांडलेले टोकन्स वापरून मोठ्या प्रमाणावर हल्ला करता येतो

**अंमलबजावणी नियंत्रण:**
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

### **सुरक्षित टोकन व्यवस्थापन नमुने**

**उत्तम प्रथा:**
- **लघु आयुष्याच्या टोकन्स**: वारंवार टोकन बदली करून धोका कमी करा
- **फक्त आवश्यक वेळेस जारी करणे**: फक्त विशिष्ट ऑपरेशन्ससाठी टोकन जारी करा
- **सुरक्षित संग्रहण**: हार्डवेअर सुरक्षा मॉड्यूल (HSM) किंवा सुरक्षित की व्हॉल्ट वापरा
- **टोकन बाँडिंग**: शक्य असल्यास टोकन्स विशिष्ट क्लायंट, सत्र किंवा ऑपरेशन्सशी बाँड करा
- **निरीक्षण आणि सतर्कता**: टोकन गैरवापर किंवा अनधिकृत प्रवेश पॅटर्न्सचा रिअल-टाइम शोध

## 3. **सत्र सुरक्षा नियंत्रण**

### **सत्र हिजॅकिंग प्रतिबंध**

**हल्ल्याच्या मार्ग:**
- **सत्र हिजॅक प्रॉम्प्ट इंजेक्शन**: सामायिक सत्र स्थितीत दुष्ट घटना इंजेक्ट करणे
- **सत्र छद्मवेश**: चोरीला गेलेल्या सत्र आयडीचा वापर करून प्रमाणीकरण फोडणे
- **रिज्युमेबल स्ट्रीम हल्ले**: सर्व्हर-सेंड ईव्हेंट रिझ्युम्शन वापरून दुष्ट सामग्री इंजेक्ट करणे

**आवश्यक सत्र नियंत्रण:**
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
- **HTTPS अंमलबजावणी**: सर्व सत्र संवाद TLS 1.3 वर असावा
- **सुरक्षित कुकी वैशिष्ट्ये**: HttpOnly, Secure, SameSite=Strict
- **प्रमाणपत्र पिनिंग**: महत्त्वाच्या कनेक्शनसाठी MITM हल्ले टाळण्यासाठी

### **स्थितीत (Stateful) आणि बिनस्थितीत (Stateless) विचार**

**स्थितीत अंमलबजावणीसाठी:**
- सामायिक सत्र स्थितीस इंजेक्शन हल्ल्यांपासून अतिरिक्त संरक्षण आवश्यक
- क्यू-आधारित सत्र व्यवस्थापनासाठी अखंडता पडताळणी आवश्यक
- अनेक सर्व्हर उदाहरणांसाठी सुरक्षित सत्र स्थिती समक्रमण आवश्यक

**बिनस्थितीत अंमलबजावणीसाठी:**
- JWT किंवा तत्सम टोकन-आधारित सत्र व्यवस्थापन
- सत्र स्थिती अखंडतेची क्रिप्टोग्राफिक पडताळणी
- हल्ला पृष्ठभाग कमी पण मजबूत टोकन पडताळणी आवश्यक

## 4. **AI-विशिष्ट सुरक्षा नियंत्रण**

**OWASP MCP धोके दूर करणे**:
- [MCP06 - हेतू प्रवाह बळजबरी](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - साधन विषबाधा](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - कमांड इंजेक्शन आणि अंमलबजावणी](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **प्रॉम्प्ट इंजेक्शन संरक्षण**

**Microsoft प्रॉम्प्ट शील्ड्स समाकलन:**
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

**अंमलबजावणी नियंत्रण:**
- **इनपुट स्वच्छता**: सर्व वापरकर्ता इनपुटचे समग्र पडताळणी आणि फिल्टरिंग
- **सामग्री सीमा व्याख्या**: प्रणाली सूचना आणि वापरकर्ता सामग्री यामध्ये स्पष्ट विभाजन
- **सूचना अनुक्रम**: विरोधाभासी सूचनांसाठी योग्य प्राथमिकता नियम
- **आउटपुट निरीक्षण**: संभाव्य हानिकारक किंवा बदललेले आउटपुट शोधणे

### **साधन विषबाधा प्रतिबंध**

**साधन सुरक्षा चौकट:**
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

**गतिशील साधन व्यवस्थापन:**
- **मंजुरी कार्यप्रवाह**: साधन बदलांसाठी स्पष्ट वापरकर्ता संमती
- **रोलबॅक क्षमता**: मागील साधन आवृत्त्यांकडे परत जाण्याची क्षमता
- **बदल तपासणी**: साधन व्याख्या बदलांची संपूर्ण इतिहास नोंद
- **धोका मूल्यमापन**: साधन सुरक्षा स्थितीचे स्वयंचलित मूल्यांकन

## 5. **कॉन्फ्यूज्ड डेप्युटी हल्ला प्रतिबंध**

### **OAuth प्रॉक्सी सुरक्षा**

**हल्ला प्रतिबंध नियंत्रण:**
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

**अंमलबजावणी आवश्यकता:**
- **वापरकर्ता संमती पडताळणी**: गतिशील क्लायंट नोंदणीसाठी कधीही संमती स्क्रीन वगळू नका
- **रिडायरेक्ट URI पडताळणी**: रिडायरेक्ट गंतव्यस्थानांसाठी कडक व्हाइटलिस्ट आधारित पडताळणी
- **प्राधिकरण कोड संरक्षण**: लघु आयुष्य आणि एकदाच वापरली जाऊ शकणारी कोडे
- **क्लायंट ओळख पडताळणी**: क्लायंट क्रेडेन्शियल्स आणि मेटाडेटाचा मजबूत पडताळणी

## 6. **साधन अंमलबजावणी सुरक्षा**

### **सँडबॉक्सिंग आणि पृथक्करण**

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

**प्रक्रिया पृथक्करण:**
- **वेगळे प्रक्रिया संदर्भ**: प्रत्येक साधन अंमलबजावणी वेगळ्या प्रक्रिया जागेत
- **आंतर-प्रक्रिया संवाद**: पडताळणीसह सुरक्षित IPC यंत्रणा
- **प्रक्रिया निरीक्षण**: रनटाइम वर्तन विश्लेषण आणि अनोळखी घटना शोध
- **संसाधन अंमलबजावणी**: CPU, मेमरी, आणि I/O ऑपरेशन्सवर कठोर मर्यादा

### **कमी अधिकार अंमलबजावणी**

**परवानगी व्यवस्थापन:**
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

## 7. **पुरवठा साखळी सुरक्षा नियंत्रण**

**OWASP MCP धोका निवारण**: [MCP04 - सॉफ्टवेअर पुरवठा साखळी हल्ले आणि अवलंबित्व छेडछाड](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **अवलंबित्व पडताळणी**

**समग्र घटक सुरक्षा:**
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

### **सतत निरीक्षण**

**पुरवठा साखळी धोका शोध:**
- **अवलंबित्व आरोग्य निरीक्षण**: सर्व अवलंबित्वांचे सुरक्षा समस्या लक्षात घेणे
- **धोका बुद्धिमत्ता समाकलन**: उदयोन्मुख पुरवठा साखळी धोके याबाबत रिअल-टाइम अपडेट्स
- **वर्तन विश्लेषण**: बाह्य घटकांतील असामान्य वर्तन शोधणे
- **स्वयंचलित प्रतिसाद**: बाधित घटक ताबडतोब रोखणे

## 8. **निरीक्षण आणि शोध नियंत्रण**

**OWASP MCP धोका निवारण**: [MCP08 - तपासणी आणि टेलीमेट्रीचा अभाव](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **सुरक्षा माहिती आणि घटना व्यवस्थापन (SIEM)**

**समग्र लॉगिंग धोरण:**
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

### **रिअल-टाइम धोका शोध**

**वर्तन विश्लेषण:**
- **वापरकर्ता वर्तन विश्लेषण (UBA)**: असामान्य वापरकर्ता प्रवेश नमुन्यांचा शोध
- **घटक वर्तन विश्लेषण (EBA)**: MCP सर्व्हर आणि साधन वर्तनाचे निरीक्षण
- **मशीन लर्निंग अनोळखी शोध**: AI-आधारित सुरक्षा धोके ओळखणे
- **धोका बुद्धिमत्ता सहसंबंध**: ज्ञात हल्ला नमुन्यांशी निरीक्षित क्रियाकलापांची जुळवाजुळव

## 9. **घटना प्रतिसाद आणि पुनर्प्राप्ती**

### **स्वयंचलित प्रतिसाद क्षमता**

**तात्काळ प्रतिसाद क्रिया:**
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

### **फॉरेन्सिक क्षमता**

**चौकशी समर्थन:**
- **तपासणी ट्रेल सुरक्षा**: क्रिप्टोग्राफिक अखंडतेसह परिवर्तनशील नसलेले लॉगिंग
- **पुरावे संकलन**: संबंधित सुरक्षा पुराव्यांचा स्वयंचलित संकलन
- **कालरेषा पुनर्रचना**: सुरक्षा घटना घडण्याच्या तपशीलवार अनुक्रमणिका
- **प्रभाव मूल्यांकन**: फोडीचा विस्तार आणि डेटाच्या उघडपणाचा आढावा

## **मुख्य सुरक्षा आर्किटेक्चर तत्त्वे**

### **गहन संरक्षण (Defense in Depth)**
- **अनेक सुरक्षा स्तर**: सुरक्षा आर्किटेक्चरमध्ये एकही फेल पॉईंट नाही
- **अतिरिक्त नियंत्रण**: महत्त्वाच्या कार्यांसाठी अतिवापर सुरक्षा उपाय
- **अयशस्वी-सेफ यंत्रणा**: सिस्टम त्रुटी किंवा हल्ल्यांना सामोरे जाताना सुरक्षित डीफॉल्ट्स

### **झिरो ट्रस्ट अंमलबजावणी**
- **कधीही विश्वास ठेवू नका, सतत पडताळणी करा**: सर्व घटक आणि विनंत्यांची सातत्याने पडताळणी
- **कमी अधिकार तत्त्व**: सर्व घटकांसाठी न्यूनतम प्रवेश हक्क
- **सूक्ष्म विभागणी**: तपशीलवार नेटवर्क आणि प्रवेश नियंत्रण

### **सतत सुरक्षा प्रगती**
- **धोका परिदृश्य अनुकूलन**: उदयोन्मुख धमक्या टाळण्यासाठी नियमित अद्यतने
- **सुरक्षा नियंत्रण परिणामकारकता**: नियंत्रणांचे सतत मूल्यमापन आणि सुधारणा
- **तपशील पालन**: बदलत्या MCP सुरक्षा मानकांशी संरेखण

---

## **अंमलबजावणी संसाधने**

### **अधिकृत MCP दस्तऐवज**
- [MCP तपशील (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP सुरक्षा उत्तम प्रथा](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP प्राधिकरण तपशील](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP सुरक्षा संसाधने**
- [OWASP MCP Azure सुरक्षा मार्गदर्शक](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP टॉप 10 सह Azure अंमलबजावणी
- [OWASP MCP टॉप 10](https://owasp.org/www-project-mcp-top-10/) - अधिकृत OWASP MCP सुरक्षा धोके
- [MCP सुरक्षा संमेलन कार्यशाळा (शेरपा)](https://azure-samples.github.io/sherpa/) - Azure वर MCP साठी प्रत्यक्ष सुरक्षा प्रशिक्षण

### **मायक्रोसॉफ्ट सुरक्षा समाधान**
- [Microsoft प्रॉम्प्ट शील्ड्स](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure कंटेंट सेफ्टी](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub प्रगत सुरक्षा](https://github.com/security/advanced-security)
- [Azure की व्हॉल्ट](https://learn.microsoft.com/azure/key-vault/)

### **सुरक्षा मानके**
- [OAuth 2.0 सुरक्षा सर्वोत्तम प्रथा (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [मोठ्या भाषा मॉडेलसाठी OWASP टॉप 10](https://genai.owasp.org/)
- [NIST सायबरसुरक्षा फ्रेमवर्क](https://www.nist.gov/cyberframework)

---

> **महत्त्वाचे**: हे सुरक्षा नियंत्रण सध्याच्या MCP तपशिलाचे (2025-11-25) प्रतिबिंब आहेत. मानके झपाट्याने बदलत असल्याने नेहमी नवीनतम [अधिकृत दस्तऐवज](https://spec.modelcontextprotocol.io/) शी पडताळणी करा.

## पुढे काय

- परत जा: [सुरक्षा मॉड्यूल देखावा](./README.md)
- पुढे जा: [मॉड्यूल 3: सुरुवात](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->