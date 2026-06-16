# MCP பாதுகாப்பு கட்டுப்பாடுகள் - பிப்ரவரி 2026 புதுப்பிப்பு

> **தற்போதைய தரநிலை**: இந்த ஆவணம் [MCP விவரக்குறிப்பு 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) பாதுகாப்பு தேவைகள் மற்றும் அதிகாரப்பூர்வ [MCP பாதுகாப்பு சிறந்த நடைமுறை](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) ஆகியவற்றை பிரதிபலிக்கிறது.

Model Context Protocol (MCP) பரம்பரையாக மென்பொருள் பாதுகாப்பு மற்றும் AI-க்கு குறிப்பித்தவையாக உள்ள அபாயங்களை கையாளும் மேம்படுத்தப்பட்ட பாதுகாப்பு கட்டுப்பாடுகளுடன் மிகவும் வளரும் நிலையில் உள்ளது. இந்த ஆவணம் OWASP MCP Top 10 கட்டமைப்புடன் ஒத்துவரும் பாதுகாப்பான MCP அமலாக்கங்களுக்கு முழுமையான பாதுகாப்பு கட்டுப்பாடுகளை வழங்குகிறது.

## 🏔️ அனுபவம் பெறும் பாதுகாப்பு பயிற்சி

உயிரோடான, கைத்தொலைவு பாதுகாப்பு அமலாக்க அனுபவத்துக்கு, நாங்கள் பரிந்துரைக்கிறோம் **[MCP பாதுகாப்பு சாமிட் பணிப் வகுப்பு (Sherpa)](https://azure-samples.github.io/sherpa/)** - ஒரு "பிடிவாதம் → பலவீனம் → சரி → பரிசோதனை" முறையை பின்பற்றிய Azure-ல் MCP சேவையகங்களை பாதுகாத்தல் குறித்து முழுமையான வழிமுறை பயணம்.

இந்த ஆவணத்தில் உள்ள அனைத்து பாதுகாப்பு கட்டுப்பாடுகளும் **[OWASP MCP Azure பாதுகாப்பு வழிகாட்டி](https://microsoft.github.io/mcp-azure-security-guide/)** உடன் ஒத்துப்போகின்றன, இது OWASP MCP Top 10 அபாயங்களுக்கு Azure-உடன் தொடர்புடைய செயலாக்க வழிகாட்டுதல்களை வழங்குகிறது.

## **கட்டாயமான பாதுகாப்பு தேவைகள்**

### **MCP விவரக்குறிப்பிலிருந்து முக்கியத் தடைபாடுகள்:**

> **தடைசெய்யப்பட்டுள்ளது**: MCP சேவையகங்கள் MCP சேவையகத்திற்கு தெளிவாக வழங்கப்படாத எந்த டோக்கன்களையும் ஏற்க கூடாது  
>
> **தடைசெய்யப்பட்டுள்ளது**: MCP சேவையகங்கள் அங்கீகாரத்திற்காக அமர்வுகளை பயன்படுத்த கூடாது  
>
> **தேவை**: அங்கீகாரம் அமல்படுத்தும் MCP சேவையகங்கள் அனைத்து உள்ளீடு கோரிக்கைகளையும் சரிபார்க்க வேண்டும்  
>
> **கட்டாயம்**: நிலையான கிளையன்ட் ஐடிகளைப் பயன்படுத்தும் MCP பிரதிநிதி சேவையகங்கள் ஒவ்வொரு நிகரRegistered கிளையன்டிற்கும் பயனர் ஒப்புதலை பெற வேண்டும்

---

## 1. **அங்கீகாரம் & அங்கீகார கட்டுப்பாடுகள்**

### **புற அங்கீகார வழங்குநர் ஒருங்கிணைப்பு**

**தற்போதைய MCP தரநிலை (2025-11-25)** MCP சேவையகங்களுக்கு அங்கீகாரத்தை புற அங்கீகார வழங்குநர்களுக்கு ஒப்படைக்க அனுமதிக்கிறது, இது ஒரு முக்கிய பாதுகாப்பு மேம்பாடு ஆகும்:

**OWASP MCP அபாயம் கையாளப்பட்டது**: [MCP07 - போதுமான அங்கீகாரம் இல்லாமை & அங்கீகாரம்](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**பாதுகாப்பு நன்மைகள்:**
1. **தனிப்பயன் அங்கீகார அபாயங்களை நீக்கம் செய்தல்**: தனிப்பயன் அங்கீகார செயலாக்கங்களை தவிர்த்து அபாயங்களை குறைத்தல்
2. **ஊழியர் தரநிலை பாதுகாப்பு**: Microsoft Entra ID போன்ற நிறுவனர் அங்கீகார வழங்குநர்களைப் பயன்படுத்தல்
3. **மத்திய அங்கீகார மேலாண்மை**: பயனர் வாழ்கை மேலாண்மை, அணுகல் கட்டுப்பாடு மற்றும் இணக்கம் ஆய்வுக்கான எளிமைப்படுத்தல்
4. **பல காரணி அங்கீகாரம்**: நிறுவன அங்கீகார வழங்குநர்களிடமிருந்து MFA திறன்களை பெற்று வரும்
5. **நிபந்தனை அடிப்படையிலான அணுகல் கொள்கைகள்**: அபாய அடிப்படையிலான அணுகல் கட்டுப்பாடுகள் மற்றும் இணக்கமான அங்கீகாரம்

**அமல்படுத்தல் தேவைகள்:**
- **டோக்கன் பார்வையாளன் சரிபார்ப்பு**: அனைத்து டோக்கன்களும் தெளிவாக MCP சேவையகத்திற்கு வழங்கப்பட்டுள்ளதா என்பதை சரிபார்க்கவும்
- **வழங்குநர் சரிபார்ப்பு**: டோக்கன் வழங்குநர் எதிர்பார்க்கப்படும் அங்கீகார வழங்குநரை சேர்ந்ததாக உறுதி செய்யவும்
- **கையொப்ப சரிபார்ப்பு**: டோக்கன் திறன்படத்தை குறியாக்க ரீதியில் சரிபார்க்கவும்
- **காலாவதி முறைப்படுத்தல்**: டோக்கன் ஆயுள் வரம்புகளை கடுமையாக பின்பற்றவும்
- **பிரிவு சரிபார்ப்பு**: கோரப்பட்ட செயல்களுக்கு ஏற்ற உரிமைகள் கொண்ட டோக்கன்களா என உறுதி செய்யவும்

### **அங்கீகார சூத்திர பாதுகாப்பு**

**முக்கிய கட்டுப்பாடுகள்:**
- **முழுமையான அங்கீகார ஆய்வுகள்**: அனைத்து அங்கீகார முடிவெடுப்புகள் பகுதிகளின் பாதுகாப்பு பரிசீலனைகள்
- **தயாத கூற்று முன்புலங்கள்**: அங்கீகார சூத்திரம் தெளிவான முடிவுக்கு வராதபோது அணுகலை மறுப்பது
- **அனுமதி எல்லைகள்**: தனித்தனி குணங்கள் மற்றும் வள அணுகல் முறைமைகளுக்கு தெளிவான பகுத்தறிதல்
- **ஆய்வு பகுப்பாய்வு**: அனைத்து அங்கீகார முடிவுகளையும் பாதுகாப்பு கண்காணிப்புக்கான முழுமையான பதிவு
- **தினசரி அணுகல் பரிசீலனைகள்**: பயனர் அனுமதிகள் மற்றும் வழங்கப்பட்ட அனுமதிகளை காலமாய் சரிபார்த்தல்

## 2. **டோக்கன் பாதுகாப்பு & எதிர்ப்பு கடத்தல் கட்டுப்பாடுகள்**

**OWASP MCP அபாயம் கையாளப்பட்டது**: [MCP01 - டோக்கன் தவறான மேலாண்மை & ரகசிய வெளிப்பாடு](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **டோக்கன் கடத்தல் தடுப்பு**

**MCP அங்கீகார விவரக்குறிப்பில் டோக்கன் கடத்தல் தெளிவாகத் தடைக்கப்பட்டுள்ளது** காரணமாக முக்கிய பாதுகாப்பு அபாயங்கள்:

**பாதுகாப்பு அபாயங்கள்:**
- **கட்டுப்பாடு மீறல்**: வீதி வரம்பாக்கம், கோரிக்கை சரிபார்ப்பு, மற்றும் போக்குவரத்து கண்காணிப்பு போன்ற கட்டுப்பாடுகளை迂回 செய்தல்
- **பொறுப்பு முறிவு**: கிளையன்ட் அடையாளத்தை இயற்கையாய் பிரயோகம் செய்ய முடியாமல் செய்து ஆய்வு சான்றுகளை கெடுக்கச்செய்தல்
- **பிரதிநிதி அடிப்படையிலான வெளியேற்றல்**: அனுமதி இல்லாத தரவு அணுகலுக்கு சேவையகங்களை பிரதிநிதிகளாக பயன்படுத்துதல்
- **நம்பிக்கை எல்லை மீறும்**: டோக்கன்களின் தோற்றம் பற்றி கீழ்காணும் சேவையகம் நம்பிக்கையை உடைக்கிறது
- **புறம்பு நகர்வுகள்**: பல சேவைகளுக்கு விரிவான தாக்குதலை அனுமதிக்கும் தீங்கான டோக்கன்கள்

**அமல்படுத்தல் கட்டுப்பாடுகள்:**
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

### **பாதுகாப்பான டோக்கன் மேலாண்மை உருவாக்கங்கள்**

**சிறந்த நடைமுறைகள்:**
- **குறுகிய ஆயுள் டோக்கன்கள்**: அடிக்கடி மாற்றப்பட்டு வெளிப்படுதலின் காலத்தை குறைத்தல்
- **தேவையான நேரத்தில் வழங்கல்**: குறிப்பிட்ட செயல்களுக்காகத் தேவையானபோது மட்டும் டோக்கன்கள் வழங்கல்
- **பாதுகாப்பான சேமிப்பு**: ஹார்ட்வேர் பாதுகாப்பு தொகுதிகள் (HSMs) அல்லது பாதுகாப்பான விசை குவால்ட்களைப் பயன்படுத்தல்
- **டோக்கன் பிணைப்பு**: டோக்கன்களை குறிப்பிட்ட கிளையன்டுகள், அமர்வுகள் அல்லது செயல்களுடன் பிணைக்கல்
- **கண்காணிப்பு மற்றும் எச்சரிக்கை**: டோக்கன் தவறான பயன்பாடு அல்லது அனுமதி இல்லாத அணுகல் முறைமைகள் உடனடியாக கண்டறிதல்

## 3. **அமர்வு பாதுகாப்பு கட்டுப்பாடுகள்**

### **அமர்வு கனவருகையைத் தடுப்பு**

**தாக்குதல் வழிகள்:**
- **அமர்வு கனவருகை விருத்தி ஊக்கம்**: பகிர்ந்த அமர்வு நிலைக்கு தீங்கு விளைவிக்க நிகழ்வுகள் ஊசல்
- **அமர்வு முறைவரவு**: திருடிய அமர்வு ஐடிகளை அனுமதி இல்லாமல் பயன்படுத்துதல்
- **மீண்டும் தொடங்கக்கூடிய ஸ்ட்ரீம் தாக்குதல்**: சேவையக வழங்கும் நிகழ்வு மீண்டும் தொடங்கலில் தீங்கு ஊசல்

**கட்டாய அமர்வு கட்டுப்பாடுகள்:**
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

**படித்துக் கொள்ளு பாதுகாப்பு:**
- **HTTPS கடுமையான பின்பற்றல்**: அனைத்து அமர்வு தொடர்புகளும் TLS 1.3 மூலம்
- **பாதுகாப்பான குட்கீ பண்புகள்**: HttpOnly, Secure, SameSite=Strict
- **சான்று பிணைப்பு**: நடுவேர் தாக்குதலைத் தடுப்பதற்கான முக்கிய இணைப்புகளுக்கு

### **நிலைசாரா மற்றும் நிலை இல்லாதம் கருதுகோள்கள்**

**நிலைசாரா செயலாக்கங்களுக்கு:**
- பகிரப்பட்ட அமர்வு நிலைக்கு ஊசல் தாக்குதலுக்கு மேலதிக பாதுகாப்பு தேவை
- வரிசை அடிப்படையிலான அமர்வு மேலாண்மை ஏற்றுப்படுத்தல் தேவைகளுடன்
- பல சேவையக நிகழ்வுகள் பாதுகாப்பான அமர்வு நிலை ஒத்திசைவு வேண்டும்

**நிலை இல்லாத செயலாக்கங்களுக்கு:**
- JWT போன்ற டோக்கன் அடிப்படையிலான அமர்வு மேலாண்மை
- அமர்வு நிலை முழுமையை குறியாக்க ரீதியில் பரிசோதனை செய்தல்
- தாக்குதல் பரப்பை குறைத்தாலும், உறுதியான டோக்கன் சரிபார்ப்பு தேவை

## 4. **AI-க்கு குறிப்பிட்ட பாதுகாப்பு கட்டுப்பாடுகள்**

**OWASP MCP அபாயங்கள் கையாளப்பட்டவை**:
- [MCP06 - நோக்க அமைவுச்செலுத்தல் ஊழியம்](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - கருவி நச்சுப்பொருள்](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - கட்டளை ஊசல் மற்றும் இயக்கு](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **நோக்கம் ஊசல் எதிர்ப்பு**

**Microsoft Prompt Shields ஒருங்கிணைப்பு:**
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

**அமல்படுத்தல் கட்டுப்பாடுகள்:**
- **உள்ளீட்டுப் பரிசோதனை**: அனைத்து பயனர் உள்ளீட்டுகளின் முழுமையான சரிபார்ப்பு மற்றும் வடிகட்டி வைத்தல்
- **உள்ளடக்க எல்லை வரையறை**: கணினி அறிவுறுத்தல்கள் மற்றும் பயனர் உள்ளடக்கங்களுக்கு தெளிவான பிரிவு
- **ஆணை நிலைமுறை**: முரண்பட்ட அறிவுறுத்தல்களுக்கு பொருத்தமான முன்னுரிமை விதிகள்
- **வெளியீட்டு கண்காணிப்பு**: தீங்கு விளைவிக்கும் அல்லது திருத்திய வெளியீடுகளை கண்டறிதல்

### **கருவி நச்சுப்பொருள் தடுப்பு**

**கருவி பாதுகாப்பு கட்டமைப்பு:**
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

**இயல்புநிலை கருவி மேலாண்மை:**
- **அனுமதி பணிமுறைகள்**: கருவி மாற்றங்களுக்கு தெளிவான பயனர் ஒப்புதல்
- **தெளிந்த மீளச்செயல் திறன்கள்**: முந்தைய கருவி பதிப்புகளுக்கு திருப்பும் திறன்
- **மாற்ற வரலாறு ஆய்வு**: கருவி வரையறை மாற்றங்களின் முழுமையான வரலாறு
- **ஆபத்து மதிப்பீடு**: கருவி பாதுகாப்பு நிலையத்தின் தானியங்கி மதிப்பீடு

## 5. **Confused Deputy தாக்குதல் தடுப்பு**

### **OAuth பிரதிநிதி பாதுகாப்பு**

**தாக்குதல் தடுப்பு கட்டுப்பாடுகள்:**
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

**அமல்படுத்தல் தேவைகள்:**
- **பயனர் ஒப்புதல் சரிபார்ப்பு**: மாற்றநிலை கிளையன்ட் பதிவு சரிபார்ப்பு திரை விட்டுச் செல்லவேண்டாம்
- **திருத்து URI பரிசோதனை**: வழிமுறைத்திட்ட அடிப்படையிலான திடமான சரிபார்ப்பு
- **அங்கீகார குறியீடு பாதுகாப்பு**: குறுகிய ஆயுள் மற்றும் ஒருமுறை பயன்பாட்டுக் கடைபிடிப்பு
- **கிளையன்ட் அடையாளம் சரிபார்ப்பு**: கிளையன்ட் அங்கீகாரச் சான்றிதழ்களும் தகவல்களும் ஸ்திரமாக பரிசோதனை

## 6. **கருவி இயக்கு பாதுகாப்பு**

### **சேட்பாக் மற்றும் தனித்துவம்**

**கண்டெயினர் அடிப்படையிலான தனித்துவம்:**
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

**செயல்முறை தனித்துவம்:**
- **தனித்த செயல்முறை சூழல்கள்**: ஒவ்வொரு கருவி இயக்கமும் தனித்த செயல்முறை இடத்தில் 
- **இணைய செயல்முறை தொடர்பு**: சரிபார்ப்பு உடன் பாதுகாப்பான IPC முறைமைகள்
- **செயல்முறை கண்காணிப்பு**: நேரடி நடத்தை புள்ளிவிவரம் மற்றும் விதிவிலக்குகளை கண்டறிதல்
- **வள கட்டுப்பாடுகள்**: CPU, நினைவகம் மற்றும் I/O செயல்பாடுகளுக்கு கடுமையான வரம்புகள்

### **குறைந்தபட்ச உரிமை அமல்படுத்தல்**

**அனுமதி மேலாண்மை:**
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

## 7. **விநியோக சங்கிலி பாதுகாப்பு கட்டுப்பாடுகள்**

**OWASP MCP அபாயம் கையாளப்பட்டது**: [MCP04 - மென்பொருள் விநியோக சங்கிலி தாக்குதல்கள் மற்றும் சார்பு முறிக்களுக்கான மாற்றம்](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **சார்பு சரிபார்ப்பு**

**முழுமையான கூறு பாதுகாப்பு:**
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

### **தொடர்ச்சியான கண்காணிப்பு**

**விநியோக சங்கிலி அச்சுறுத்தல் கண்டறிதல்:**
- **சார்பு ஆரோக்கிய கண்காணிப்பு**: அனைத்து சார்புகளுக்கும் பாதுகாப்பு பிரச்சினைகளின் தொடர்ச்சியான மதிப்பீடு
- **அச்சுறுத்தல் நுண்ணறிவு ஒருங்கிணைப்பு**: எழுபவை அச்சுறுத்தல்களுக்கு நேரடி புதுப்பிப்புகள்
- **நடத்தை பகுப்பாய்வு**: வெளிப்புற கூறுகளில் அசாதாரண நடத்தை கண்டறிதல்
- **தானியங்கி மீட்பு நடவடிக்கை**: கொடுக்கப்பட்ட கூறுகளில் உடனடி தடுப்பு

## 8. **கண்காணிப்பு & கண்டறிதல் கட்டுப்பாடுகள்**

**OWASP MCP அபாயம் கையாளப்பட்டது**: [MCP08 - ஆய்வு மற்றும் தொலைஅளவு இல்லாமை](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **பாதுகாப்பு தகவல் மற்றும் நிகழ்வு மேலாண்மை (SIEM)**

**முழுமையான பதிவு உத்தி:**
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

### **நேரடி அச்சுறுத்தல் கண்டறிதல்**

**நடத்தை பகுப்பாய்வு:**
- **பயனர் நடத்தை பகுப்பாய்வு (UBA)**: அசாதாரண பயனர் அணுகல் முறைகளை கண்டறிதல்
- **உலக நடத்தை பகுப்பாய்வு (EBA)**: MCP சேவையகம் மற்றும் கருவி நடத்தை கண்காணிப்பு
- **இயந்திரக் கற்றல் விதிவிலக்கு கண்டறிதல்**: AI மூலம் பாதுகாப்பு அச்சுறுத்தல்களை அடையாளம்
- **அச்சுறுத்தல் நுண்ணறிவு தொடர்பு**: காணப்பட்ட செயல்பாடுகளை அறியப்பட்ட தாக்குதல் மாதிரிகளோடு பொருத்தல்

## 9. **நிகழ்ச்சி எதிர்வு & மீட்பு**

### **தானியங்கி எதிர்வினைப் திறன்கள்**

**உடனடி பதில்கள்:**
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

### **தகவல் சேகரிப்பு திறன்கள்**

**விவேஷனை ஆதரவு:**
- **ஆய்வு தடம் பாதுகாப்பு**: குறியாக்க முழுமையுடன் இமேபிள் பதிவு
- **சான்றுப் பொருட்கள் சேகரிப்பு**: பாதுகாப்பு தொடர்புடைய பதிவுகள் தானாகத் தொகுப்பு
- **நிகழ்வு வரிசை மீட்டமைப்பு**: பாதுகாப்பு சம்பவங்களுக்கான விரிவான தொடர்
- **கிடைக்கும் பாதிப்பு மதிப்பீடு**: பாதிப்பு பரப்பு மற்றும் தரவு வெளிப்பாட்டின் மதிப்பீடு

## **முக்கிய பாதுகாப்பு கட்டமைப்பு கருதுகோள்கள்**

### **ஆழமான பாதுகாப்பு**
- **பல பாதுகாப்பு அடுக்குகள்**: பாதுகாப்பு கட்டமைப்பில் ஒரே புள்ளி தோல்வி தவிர்ப்பு
- **மறுகட்டுப்பாடுகள்**: முக்கிய செயல்பாடுகளுக்கு ஒருங்கிணைந்த பாதுகாப்பு நடவடிக்கைகள்
- **தயாத பாதுகாப்பு விதிமுறைகள்**: சிக்கல்கள் அல்லது தாக்குதல்களுக்கு எதிராக பாதுகாப்பான இயல்பு

### **பூஜ்ய நம்பிக்கை அமலாக்கம்**
- **எப்போதும் சரிபார்க்கவும், ஒருபோதும் நம்பக்கூடாது**: அனைத்து அம்சங்களையும் மற்றும் கோரிக்கைகளையும் தொடர்ச்சியாக சரிபார்த்தல்
- **குறைந்தபட்ச உரிமை கொள்கை**: அனைத்து கூறுகளுக்கும் குறைந்தபட்ச அணுகல் உரிமைகள்
- **சிறிய பிரிவுகளாக்கம்**: நுண்கட்டமைப்பு வலை மற்றும் அணுகல் கட்டுப்பாடுகள்

### **தொடர்ச்சியான பாதுகாப்பு முன்னேற்றம்**
- **அச்சுறுத்தல் சூழலை தழுவுதல்**: புதிய தோற்ற அச்சுறுத்தல்களுக்கு தொடர்ந்து புதுப்பித்தல்
- **பாதுகாப்பு கட்டுப்பாடு பயன்திறன்**: கட்டுப்பாடுகளை தொடர்ச்சியாக மதிப்பீடு செய்து மேம்படுத்தல்
- **விவரக்குறிப்பு இணக்கம்**: வளர்ந்து வரும் MCP பாதுகாப்பு தரநிலைகளோடு ஒத்திசைவு

---

## **அமல்படுத்தல் ஆதாரங்கள்**

### **அதிகாரப்பூர்வ MCP ஆவணங்கள்**
- [MCP விவரக்குறிப்பு (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP பாதுகாப்பு சிறந்த நடைமுறை](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP அங்கீகார விவரக்குறிப்பு](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP பாதுகாப்பு ஆதாரங்கள்**
- [OWASP MCP Azure பாதுகாப்பு வழிகாட்டி](https://microsoft.github.io/mcp-azure-security-guide/) - Azure செயலாக்கத்துடன் முழுமையான OWASP MCP Top 10
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - அதிகாரப்பூர்வ OWASP MCP பாதுகாப்பு அபாயங்கள்
- [MCP பாதுகாப்பு சாமிட் பணிப்பயிற்சி (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure-ல் MCP க்கான கைத்தொலைவு பாதுகாப்பு பயிற்சி

### **Microsoft பாதுகாப்பு தீர்வுகள்**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure உள்ளடக்க பாதுகாப்பு](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub முன்னேற்றப்பட்ட பாதுகாப்பு](https://github.com/security/advanced-security)
- [Azure விசை குவாள்](https://learn.microsoft.com/azure/key-vault/)

### **பாதுகாப்பு தரநிலைகள்**
- [OAuth 2.0 பாதுகாப்பு சிறந்த நடைமுறை (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [பெரிய மொழி மாதிரிகளுக்கான OWASP Top 10](https://genai.owasp.org/)
- [NIST சைபர் பாதுகாப்பு கட்டமைப்பு](https://www.nist.gov/cyberframework)

---

> **முக்கியம்**: இந்த பாதுகாப்பு கட்டுப்பாடுகள் தற்போதைய MCP விவரக்குறிப்பு (2025-11-25) ஐ பிரதிபலிக்கின்றன. தரநிலைகள் விரைவில் வளர்ந்து வருகின்றன; எப்போதும் சமீபத்திய [அதிகாரப்பூர்வ ஆவணத்துடன்](https://spec.modelcontextprotocol.io/) சரிபார்க்கவும்.

## அடுத்தது என்ன

- திருப்பி செல்ல: [பாதுகாப்பு தொகுதி அவலோக்](./README.md)
- தொடர: [தொகுதி 3: துவக்குதல்](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**மறுப்பு**:
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயற்சி செய்துள்ளோம், ஆனால் தானாக செய்யப்படும் மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கலாம் என்பதை கவனத்தில் கொள்ளவும். அசல் ஆவணம் அதன் தாய்மொழியில் அதிகாரப்பூர்வ ஆதாரமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்நுட்பமான மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பைப் பயன்படுத்துவதால் ஏற்படும் எந்த தவறான புரிதல்கள் அல்லது தவறான விளக்கத்திற்கும் நாங்கள் பொறுப்பில்வில்லை.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->