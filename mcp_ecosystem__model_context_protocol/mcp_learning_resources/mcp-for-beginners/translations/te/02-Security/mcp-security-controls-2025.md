# MCP భద్రతా నియంత్రణలు - ఫిబ్రవరి 2026 నవీకరణ

> **ప్రస్తుతం ప్రమాణం**: ఈ పత్రం [MCP స్పెసిఫికారేషన్ 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) భద్రతా అవసరాలను మరియు అధికారిక [MCP భద్రతా ఉత్తమ ప్రాక్టీసులు](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) ను ప్రతిబింబిస్తుంది.

మోడల్ కాంటెక్స్ట్ ప్రోటోకాల్ (MCP) ఒకటిన్నర స్థాయిలో అభివృద్ది చెందింది, సంప్రదాయ సాఫ్ట్వేర్ భద్రత మరియు AI-స్పెసిఫిక్ బెదిరింపుల‌ను సమర్థంగా పరిష్కరించే మెరుగైన భద్రతా నియంత్రణలతో. ఈ పత్రం MCP సురక్షిత అమలులకు సమగ్ర భద్రతా నియంత్రణలను, OWASP MCP టాప్ 10 ఫ్రేమ్‌వర్క్‌కు అనుగుణంగా అందిస్తుంది.

## 🏔️ హ్యాండ్స్-ఆన్ సెక్యూరిటీ శిక్షణ

ప్రాయోగిక, హ్యాండ్స్-ఆన్ భద్రతా అమలుకు అనుభవం కోసం, మేము **[MCP సెక్యూరిటీ సమిట్ వర్క్‌షాప్ (షెర్పా)](https://azure-samples.github.io/sherpa/)** ను సిఫార్సు చేస్తాము - "ఘాటుదారి → దాడి → పరిష్కారం → ధృవీకరణ" మెథడాలజీతో Azureలో MCP సర్వర్‌లను సురక్షితం చేయడానికి సమగ్ర మార్గదర్శక యాత్ర.

ఈ పత్రంలోని అన్ని భద్రతా నియంత్రణలు **[OWASP MCP Azure సెక్యూరిటీ గైడ్](https://microsoft.github.io/mcp-azure-security-guide/)** తో అనుగుణంగా ఉంటాయి, ఇది OWASP MCP టాప్ 10 ప్రమాదాలకు Azure-విశిష్ట అమలుకు సూచనాత్మక వాస్తవిక నమూనాలు మరియు మార్గదర్శకాలను అందిస్తుంది.

## **అవసరమైన భద్రతా అవసరాలు**

### **MCP స్పెసిఫికారేషన్ నుండి కీలక నిషేధాలు:**

> **నిషిద్ధం**: MCP సర్వర్‌లు వాటి కోసం స్పష్టంగా జారీ చేయబడని ఏ టోకెన్లను కూడా స్వీకరించకూడదు  
>  
> **నిషేధించబడింది**: MCP సర్వర్‌లు గుర్తింపు కోసం సెషన్లను ఉపయోగించరాదు  
>  
> **కరువు చేయబడింది**: అథారైజేషన్ అమలు చేసే MCP సర్వర్‌లు అన్ని వచ్చిన అభ్యర్థనలను చెక్ చేయాలి  
>  
> **అవసరం**: స్థిర క్లయింట్ ID లను ఉపయోగించే MCP ప్రాక్సీ సర్వర్‌లు ప్రతి డైనమిక్ రిజిస్టర్ అయిన క్లయింట్‌కు వినియోగదారు అనుమతి పొందాలి

---

## 1. **ఆధికరణ & అనుమతి నియంత్రణలు**

### **బయటి ఐడెంటిటీ ప్రొవైడర్ ఇంటిగ్రేషన్**

**ప్రస్తుత MCP ప్రమాణం (2025-11-25)** MCP సర్వర్‌లు గుర్తింపును బయటి ఐడెంటిటీ ప్రొవైడర్లకు అప్పగించమని అనుమతిస్తుంది, ఇది ఒక ముఖ్యమైన భద్రతా మెరుగుదల:

**OWASP MCP ప్రమాదం పరిష్కారం**: [MCP07 - అసమర్ధత ఉన్న గుర్తింపు & అనుమతి](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**భద్రతా లాభాలు:**
1. **అనుకూల గుర్తింపు ప్రమాదాలను తొలగిస్తుంది**: అనుకూల గుర్తింపు అమలు తప్పించి ప్రమాదాలను తగ్గిస్తుంది  
2. **ఎంటర్‌ప్రైజ్-గ్రేడ్ భద్రత**: Microsoft Entra ID వంటి స్థాపిత ఐడెంటిటీ ప్రొవైడర్ల ఆధారంగా ఆధిక భద్రత ఫీచర్లను పెంచుతుంది  
3. **కేంద్రీకృత ఐడెంటిటీ నిర్వహణ**: వినియోగదారు జీవితచక్రం నిర్వహణ, యాక్సెస్ కంట్రోల్ మరియు కంప్లయన్సు ఆడిటింగ్ సులభతరం చేస్తుంది  
4. **బహు-కారకం గుర్తింపు**: ఎంటర్‌ప్రైజ్ ఐడెంటిటీ ప్రొవైడర్ల నుండి MFA సామర్థ్యాలను పొందుతుంది  
5. **సాపేక్ష యాక్సెస్ పాలసీలు**: ప్రమాదాధారిత యాక్సెస్ నియంత్రణలు మరియు అనుకూల గుర్తింపు ప్రయోజనాలు

**అమలులో పెట్టే అవసరాలు:**
- **టోకెన్ ఆడియెన్స్ ధృవీకరణ**: అన్ని టోకన్లు MCP సర్వర్ కోసం ప్రత్యేకంగా జారీ అయినవీనే అని ధృవీకరించండి  
- **జారీదారు ధృవీకరణ**: టోకెన్ జారీదారు ఆశించిన ఐడెంటిటీ ప్రొవైడర్ తో సరిపోవాలి  
- **సంతకం ధృవీకరణ**: టోకెన్ సమగ్రతకు క్రిప్టోగ్రాఫిక్ ధృవీకరణ  
- **కాలపరిమితి అమలును అనుసరించడం**: టోకెన్ జీవితకాల పరిమితులను కఠినంగా అమలు చేయాలి  
- **స్కోప్ ధృవీకరణ**: అభ్యర్థించిన ఆపరేషన్లకి సరైన అనుమతులు టోకెన్లలో ఉండాలి

### **అథారైజేషన్ లాజిక్ భద్రత**

**క్రిటికల్ నియంత్రణలు:**
- **సమగ్ర అనుమతి ఆడిట్లు**: అన్ని అనుమతి నిర్ణయ పాయింట్లకు రెగ్యులర్ భద్రత సమీక్షలు  
- **ఫెయిల్-సేఫ్ డిఫాల్ట్స్**: అనుమతి లాజిక్ నిర్దిష్ట నిర్ణయాన్ని తీసుకోలేకపోతే యాక్సెస్ నిరాకరించాలి  
- **అనుమతి పరిమితి**: వివిధ ప్రివిలేజ్ స్థాయిల మరియు వనరు యాక్సెస్ మధ్య స్పష్టమైన వేరుపాటు  
- **ఆడిట్ లాగింగ్**: భద్రతా పర్యవేక్షణకు అన్ని అనుమతి నిర్ణయాల పూర్తి లాగింగ్  
- **నియమిత యాక్సెస్ సమీక్షలు**: వినియోగదారు అనుమతులు మరియు ప్రివిలేజ్ కేటాయింపుల వ్యవధి ధృవీకరణ

## 2. **టోకెన్ భద్రత & యాంటీ-పాస్త్రూ నియంత్రణలు**

**OWASP MCP ప్రమాదం పరిష్కారం**: [MCP01 - టోకెన్ నిర్వాహనం లోపం & రహస్య వికాసం](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **టోకెన్ పాస్త్రూ నివారణ**

**MCP అథారైజేషన్ స్పెసిఫికేషన్ లో టోకెన్ పాస్త్రూ ఖచ్చితంగా నిషేధించబడింది** కీలక భద్రతా ప్రమాదాల కారణంగా:

**భద్రతా ప్రమాదాలు:**
- **నియంత్రణ చతుర్భుజం**: రేటు పరిమితి, అభ్యర్థన ధృవీకరణ, ట్రాఫిక్ పర్యవేక్షణ వంటి అవసరమైన నియంత్రణలను ప్రదర్శింపు చేస్తుంది  
- **వినియోగదారు గుర్తింపులో లోపం**: క్లయింట్ గుర్తింపును అసాధ్యం చేస్తూ ఆడిట్ ట్రైల్స్ మరియు ఘటన విచారణలను పెరగదు  
- **ప్రాక్సీ ఆధారిత ఎక్స్ఫిల్ట్రేషన్**: వర్తన దుష్టులైనవారికి అనధికార డేటా యాక్సెస్ కోసం సర్వర్‌లను ప్రాక్సీలుగా ఉపయోగించుట  
- **ట్రస్ట్ బౌండరీ ఉల్లంఘన**: డౌన్‌స్ట్రీం సర్వీస్‌ల ట్రస్ట్ అనుమానాలను విరిచిపోడం  
- **అంతరాయం కదిలే దాడులు**: అనేక సర్వీసుల మధ్య అపాయి క్రింద టోకెన్లు సర్వత్రా దాడుల‌ను సులభతరం చేస్తాయి

**అమలులో పెట్టే నియంత్రణలు:**
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

### **సురక్షిత టోకెన్ నిర్వహణ నమూనాలు**

**ఉత్తమ ప్రాక్టీసులు:**
- **చెలామణి కావడంలో తక్కువకాల టోకెన్లు**: తరచుగా టోకెన్ల మార్పుతో ఎక్స్‌పోజర్ విండో తగ్గింపు  
- **జస్ట్-ఇన్-టైం జారీ**: నిర్దిష్ట ఆపరేషన్‌ల కోసం మాత్రమే అవసరమైనప్పుడు టోకెన్లు జారీ చేయండి  
- **భద్రతైన నిల్వ**: హార్డ్‌వేర్ సెక్యూరిటీ మాడ్యూల్‌లు (HSM) లేదా సురక్షిత కీ వాల్ట్‌లను ఉపయోగించండి  
- **టోకెన్ బైండింగ్**: టోకెన్లను నిర్దిష్ట క్లయింట్లు, సెషన్లు లేదా ఆపరేషన్లతో బైండ్ చేయండి  
- **పర్యవేక్షణ & అలర్టింగ్**: టోకెన్ దుర్వినియోగం లేదా అనధికార యాక్సెస్ నమూనాలను నిజ సమయ కనుగొనడం

## 3. **సెషన్ సెక్యూరిటీ నియంత్రణలు**

### **సెషన్ హైజాకింగ్ నివారణ**

**దాడి మార్గాలు:**
- **సెషన్ హైజాక్ ప్రాంప్ట్ ఇంజెక్షన్**: పంచుకున్న సెషన్ స్థితిలో దుష్టకారక ఈవెంట్ల ఇంజెక్షన్  
- **సెషన్ రూపొందింపు**: దొంగతనపు సెషన్ IDలు ఉపయోగించి గుర్తింపును దాటించడం  
- **రీస్యూమబుల్ స్ట్రీమ్ దాడులు**: సెర్వర్-పంపిన ఈవెంట్ పునఃప్రారంభంతో దుష్ట విషయం ఇంజెక్షన్

**అవసరమైన సెషన్ నియంత్రణలు:**
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

**ట్రాన్స్పోర్ట్ భద్రత:**
- **HTTPS అమలు**: అన్ని సెషన్ కమ్యూనికేషన్ TLS 1.3 ద్వారా  
- **సురక్షిత కుకీ లక్షణాలు**: HttpOnly, Secure, SameSite=Strict  
- **సర్టిఫికేట్ పిన్నింగ్**: MITM దాడుల నివారణకు కీలక కనెక్షన్ల కోసం

### **స్టేట్‍ఫుల్ వర్సెస్ స్టేట్‌లెస్ పరిగణనలు**

**స్టేట్‍ఫుల్ అమలులకు:**
- పంచుకున్న సెషన్ స్థితికి ఇంజెక్షన్ దాడుల నుండి అదనపు రక్షణ అవసరం  
- క్యూలో ఆధారపడిన సెషన్ నిర్వహణకు సమగ్రత ధృవీకరణ  
- బహుళ సర్వర్ ఇన్‌స్టాన్స్‌లకు సురక్షిత సెషన్ స్థితి సమకాలీకరణ అవసరం

**స్టేట్‌లెస్ అమలులకు:**
- JWT లేదా సమానమైన టోకెన్ ఆధారిత సెషన్ నిర్వహణ  
- సెషన్ సమగ్రతకు క్రిప్టోగ్రాఫిక్ ధృవీకరణ  
- దాడి ఉపరితలం తగ్గింది కానీ కఠినమైన టోకెన్ ధృవీకరణ అవసరం

## 4. **AI-స్పెసిఫిక్ సెక్యూరిటీ నియంత్రణలు**

**OWASP MCP ప్రమాదాలు పరిష్కారం:**
- [MCP06 - ప్రాంప్ట్ ఇంజెక్షన్](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - టూల్ విషపూరణ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - ఆజ్ఞ ఇంజెక్షన్ & ఎగ్జిక్యూషన్](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **ప్రాంప్ట్ ఇంజెక్షన్ రక్షణ**

**Microsoft Prompt Shields ఇంటిగ్రేషన్:**
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

**అమలులో నియంత్రణలు:**
- **ఇన్‌పుట్ శుభ్రపరిచేందుకు**: అన్ని వినియోగదారు ఇన్‌పుట్లకు సమగ్ర ధృవీకరణ మరియు వడగట్టడం  
- **కంటెంట్ సరిహద్దు నిర్వచనం**: సిస్టమ్ సూచనలు మరియు వినియోగదారు కంటెంట్ మధ్య స్పష్టమైన వేరుపాటు  
- **సూచన హైయరార్చీ**: విరోధ భరించిన సూచనలకు సరైన ప్రాధాన్యత నియమాలు  
- **ఆవుట్పుట్ పర్యవేక్షణ**: ప్రమాదకరమయిన లేదా మోసపూరిత అవుట్పుట్ల గుర్తింపు

### **టూల్ విషపూరణ నివారణ**

**టూల్ సెక్యూరిటీ ఫ్రేమ్‌వర్క్:**
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

**డైనమిక్ టూల్ నిర్వహణ:**
- **అనుమతి వర్క్‌ఫ్లోలు**: టూల్ మార్పులకు స్పష్టమైన వినియోగదారు అనుమతి  
- **రోల్బ్యాక్ సామర్థ్యాలు**: పూర్వ టూల్ సంస్కరణలకు తిరిగి పోవగల సామర్ధ్యం  
- **మార్పు ఆడిటింగ్**: టూల్ నిర్వచన మార్పుల పూర్తి చరిత్ర  
- **ప్రమాద అంచనాలు**: ఆటోమేటెడ్ టూల్ భద్రత స్థాయి మదింపు

## 5. **Confused Deputy దాడి నివారణ**

### **OAuth ప్రాక్సీ భద్రత**

**దాడి నివారణ నియంత్రణలు:**
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

**అమలు అవసరాలు:**
- **వినియోగదారు అనుమతి ధృవీకరణ**: డైనమిక్ క్లయింట్ రిజిస్ట్రేషన్ కొరకు అనుమతి తెరలను ఎప్పుడూ మిస్ కావద్దు  
- **రీనడైరక్ట్ URI ధృవీకరణ**: రీడైరెక్ట్ గమ్య స్థానాలకు కఠినమైన తెల్ల జాబితా ధృవీకరణ  
- **అథారైజేషన్ కోడ్ రక్షణ**: చిన్న కాల పరిమితి కలిగిన, ఒక్క సారి ఉపయోగించే కోడ్స్  
- **క్లయింట్ ఐడెంటిటీ ధృవీకరణ**: క్లయింట్ క్రెడెన్షియల్స్ మరియు మెటాడేటా యొక్క బలమైన ధృవీకరణ

## 6. **టూల్ ఎగ్జిక్యూషన్ సెక్యూరిటీ**

### **సాండ్‌బాక్సింగ్ & వేరుగా ఉంచడం**

**కంటైనర్ ఆధారిత వేరుపాటు:**
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

**ప్రాసెస్ వేరుపాటు:**
- **వేరువేరు ప్రాసెస్ కాంటెక్స్ట్‌లు**: ప్రతి టూల్ అమలును వేరుగా ఉన్న ప్రాసెస్ ప్రాంతంలో నిర్వహించండి  
- **ఇంటర్-ప్రాసెస్ కమ్యూనికేషన్**: ధృవీకరణతో సురక్షిత IPC విధానాలు  
- **ప్రాసెస్ పర్యవేక్షణ**: రన్‌టైమ్ ప్రవర్తన విశ్లేషణ మరియు అసాధారణ గుర్తింపులు  
- **వనరు అమలు**: CPU, మెమరీ మరియు I/O ఆపరేషన్లపై కఠిన పరిమితులు

### **కనిష్ట అధికారం అమలు**

**అనుమతి నిర్వహణ:**
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

## 7. **సప్లై చైన్ సెక్యూరిటీ నియంత్రణలు**

**OWASP MCP ప్రమాదం పరిష్కారం**: [MCP04 - సాఫ్ట్వేర్ సప్లై చైన్ దాడులు & ఆధారపడిక లోపాలు](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **ఆధారపడిక ధృవీకరణ**

**సమగ్ర భాగం భద్రత:**
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

### **అడిగాడి పర్యవేక్షణ**

**సప్లై చైన్ బెదిరింపుల గుర్తింపు:**
- **ఆధారపడిక ఆరోగ్య పర్యవేక్షణ**: భద్రతా సమస్యల కోసం అన్ని ఆధారపడికల నిరంతర మదింపు  
- **బెదిరింపు జ్ఞానం ఇంటిగ్రేషన్**: కొత్తగా వస్తున్న సప్లై చైన్ బెదిరింపులపై నిజ సమయ నవీకరణలు  
- **ప్రవర్తనా విశ్లేషణ**: బాహ్య భాగాల్లో అసాధారణ ప్రవర్తన గుర్తింపు  
- **ఆటోమేటెడ్ స్పందన**: பாதிக்கப்பட்ட భాగాల వెంటనే నియంత్రణ

## 8. **పర్యవేక్షణ & గుర్తింపు నియంత్రణలు**

**OWASP MCP ప్రమాదం పరిష్కారం**: [MCP08 - ఆడిట్ మరియు టెలిమేట్రి లోపం](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **సెక్యూరిటీ సమాచార, ఈవెంట్ మేనేజ్‌మెంట్ (SIEM)**

**సమగ్ర లాగింగ్ వ్యూహం:**
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

### **నిజ సమయ బెదిరింపు గుర్తింపు**

**ప్రవర్తనా విశ్లేషణ:**
- **వినియోగదారు ప్రవర్తనా విశ్లేషణ (UBA)**: అసాధారణ వినియోగదారు యాక్సెస్ నమూనాలు గుర్తింపు  
- **ఏంటిటీ ప్రవర్తనా విశ్లేషణ (EBA)**: MCP సర్వర్ మరియు టూల్ ప్రవర్తన పర్యవేక్షణ  
- **మెషీన్ లెర్నింగ్ అసాధారణ గుర్తింపు**: AI ఆధారిత భద్రతా బెదిరింపుల గుర్తింపులు  
- **బెదిరింపు జ్ఞానం సరిపోయే కలుపు**: తెలిసిన దాడి నమూనాలతో గమనించిన కార్యాచరణ మెలుకువ

## 9. **సంఘటన స్పందన & పునరుద్ధరణ**

### **ఆటోమేటెడ్ స్పందన సామర్థ్యాలు**

**క్షణిక స్పందన చర్యలు:**
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

### **ఫోరెన్సిక్ సామర్థ్యాలు**

**విచారణ మద్దతు:**
- **ఆడిట్ ట్రైల్ పరిరక్షణ**: క్రిప్టోగ్రాఫిక్ సమగ్రతతో మ్రియాద విధంగా లాగింగ్  
- **సాక్ష్య సేకరణ**: సంబంధిత భద్రతా అర్రిఫాక్ట్స్ ఆటోమేటిక్ సేకరణ  
- **కాల రేఖ పునర్నిర్మాణం**: భద్రతా సంఘటనలకు దారితీసిన సవివర సంఘటన క్రమం  
- **ప్రభావ అంచనా**: ముప్పు పరిధి మరియు డేటా ఎక్స్‌పోజర్ విలయనం

## **ప్రధాన భద్రతా వాస్తవిక సిద్ధాంతాలు**

### **డిఫెన్స్ ఇన్ డెప్త్**
- **బహుళ భద్రతా పొరలు**: భద్రతా వాస్తవికతలో ఏకైక వైఫల్యత ఉండకూడదు  
- **రెండండెంట్ నియంత్రణలు**: కీలక కార్యకలాపాల overlapping భద్రతా చర్యలు  
- **ఫెయిల్-సేఫ్ మెకానిజమ్స్**: సిస్టమ్ లోపాలు లేదా దాడులు ఎదుర్కొన్నప్పుడు సురక్షిత డిఫాల్ట్స్

### **జీరో ట్రస్ట్ అమలు**
- **మహా నమ్మకం లేదు, ఎప్పుడూ ధృవీకరించు**: అన్ని అంతస్థుల మరియు అభ్యర్థనలకు నిరంతర ధృవీకరణ  
- **కనిష్ట అధికారం సిధ్ధాంతం**: అన్ని భాగాలకు కనిష్ట యాక్సెస్ హక్కులు  
- **మైక్రో-సెగ్మెంటేషన్**: ఖచ్చితమైన నెట్‌వర్క్ మరియు యాక్సెస్ నియంత్రణలు

### **నిరంతర భద్రతా పరిణామం**
- **బెదిరింపు పరిస్థితి అనుసరణ**: కొత్త బెదిరింపులను ఎదుర్కొనే నియమిత నవీకరణలు  
- **భద్రతా నియంత్రణల ప్రభావశీలత**: నియంత్రణల యొక్క నిరంతర మదింపు మరియు మెరుగుదల  
- **స్పెసిఫికేషన్ అనుగుణత**: అభివృద్ధి అయ్యే MCP భద్రతా ప్రమాణాల అనుసరణ

---

## **అమలులో పెట్టే వనరులు**

### **అధికారిక MCP డాక్యుమెంటేషన్**
- [MCP స్పెసిఫికారేషన్ (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP భద్రతా ఉత్తమ ప్రాక్టీసులు](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP అథారైజేషన్ స్పెసిఫికేషన్](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP సెక్యూరిటీ వనరులు**
- [OWASP MCP Azure సెక్యూరిటీ గైడ్](https://microsoft.github.io/mcp-azure-security-guide/) - Azure అమలుతో ప్రాముఖ్యత వచ్చే OWASP MCP టాప్ 10  
- [OWASP MCP టాప్ 10](https://owasp.org/www-project-mcp-top-10/) - అధికారిక OWASP MCP భద్రతా ప్రమాదాలు  
- [MCP సెక్యూరిటీ సమిట్ వర్క్‌షాప్ (షెర్పా)](https://azure-samples.github.io/sherpa/) - Azureలో MCP కు హ్యాండ్స్-ఆన్ భద్రత శిక్షణ

### **Microsoft సెక్యూరిటీ సొల్యూషన్స్**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub అధునాతన భద్రత](https://github.com/security/advanced-security)
- [Azure కీ వాల్ట్](https://learn.microsoft.com/azure/key-vault/)

### **భద్రతా ప్రమాణాలు**
- [OAuth 2.0 భద్రతా ఉత్తమ ప్రాక్టీసులు (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP పెద్ద భాషా మోడల్స్ కోసం టాప్ 10](https://genai.owasp.org/)
- [NIST సైబర్‌సెక్యూరిటీ ఫ్రేమ్‌వర్క్](https://www.nist.gov/cyberframework)

---

> **గమనిక**: ఈ భద్రతా నియంత్రణలు ప్రస్తుత MCP స్పెసిఫికేషన్ (2025-11-25) ని ప్రతిబింబిస్తాయి. ప్రమాణాలు వేగంగా అభివృద్ధి చెందుతుండగా, ఎప్పుడూ తాజా [అధికారిక డాక్యుమెంటేషన్](https://spec.modelcontextprotocol.io/) ను సరిచూసుకోండి.

## తర్వాత ఏం జరుగుతుంది

- తిరిగి వెళ్ళు: [భద్రతా మాడ్యూల్ అవలోకనం](./README.md)
- కొనసాగించు: [మాడ్యూల్ 3: ప్రారంభించడం](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్వీకరణ**:
ఈ పత్రం AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తున్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలు తప్పులు లేదా అసమగ్రతలను కలిగి ఉండవచ్చు. దాని స్వదేశ భాషలో ఉన్న అసలు పత్రాన్ని అధికారం కలిగిన మూలంగా పరిగణించాలి. కీలకమైన సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదాన్ని సిఫారసు చేస్తాము. ఈ అనువాదం ఉపయోగం వల్ల కలిగే ఏవైనా అపార్థాలు లేదా తప్పుదారులు కోసం మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->