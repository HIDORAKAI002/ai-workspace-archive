# MCP Udhibiti wa Usalama - Sasisho la Februari 2026

> **Kiwango Cha Sasa**: Hati hii inaonyesha [Ufafanuzi wa MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) mahitaji ya usalama na rasmi [MCP Mbinu Bora za Usalama](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Itifaki ya Muktadha wa Mfano (MCP) imeendelea kwa kiasi kikubwa na udhibiti ulioboreshwa wa usalama unaoshughulikia usalama wa kawaida wa programu na vitisho maalum vya AI. Hati hii inatoa udhibiti kamili wa usalama kwa utekelezaji salama wa MCP unaolingana na mfumo wa OWASP MCP Top 10.

## 🏔️ Mafunzo ya Vitendo ya Usalama

Kwa uzoefu wa vitendo wa utekelezaji wa usalama, tunapendekeza **[Warsha ya Mkutano wa Usalama wa MCP (Sherpa)](https://azure-samples.github.io/sherpa/)** - safari ya kina yenye mwongozo wa kuhakikisha seva za MCP katika Azure kwa kutumia mbinu ya "dhaifu → shambulio → marekebisho → uthibitisho".

Udhibiti wote wa usalama katika hati hii unalingana na **[Mwongozo wa Usalama wa MCP Azure wa OWASP](https://microsoft.github.io/mcp-azure-security-guide/)**, ambao hutoa usanifu wa rejea na mwongozo maalum wa utekelezaji Azure kwa hatari za OWASP MCP Top 10.

## **Mahitaji YA LAZIMA ya Usalama**

### **Kuzuia Muhimu Kutoka Kwa Ufafanuzi wa MCP:**

> **MARUFUKA**: Seva za MCP **HAZIISHIWI** kukubali tokeni yoyote ambayo haikutolewa wazi kwa seva ya MCP  
>  
> **MARUFUKA**: Seva za MCP **HAZIITUMI** vikao kwa uthibitishaji  
>  
> **INAHITAJIKA**: Seva za MCP zinazotekeleza idhini **ZINAHITAJI** kuthibitisha MAOMBI yote yanayoingia  
>  
> **INAYOLAZIMISHA**: Seva za wakala wa MCP zinazotumia kitambulisho cha mteja kisichobadilika **ZINAHITAJI** kupata idhini ya mtumiaji kwa kila mteja aliyesajiliwa kwa nguvu

---

## 1. **Udhibiti wa Uthibitishaji & Idhini**

### **Ushirikiano wa Mtoa Kitambulisho wa Nje**

**Kiwango cha MCP Sasa (2025-11-25)** kinaruhusu seva za MCP kuagiza uthibitishaji kwa watoa kitambulisho wa nje, kuonyesha uboreshaji mkubwa wa usalama:

**Hatari za OWASP MCP Zilizoshughulikiwa**: [MCP07 - Uthibitishaji duni & Idhini](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Manufaa ya Usalama:**
1. **Kuondoa Hatari za Uthibitishaji Binafsi**: Kupunguza eneo la udhaifu kwa kuepuka utekelezaji wa uthibitishaji wa aina binafsi  
2. **Usalama wa Kiwango cha Biashara**: Kutumia watoa kitambulisho walioridhika kama Microsoft Entra ID wenye vipengele vya usalama vya hali ya juu  
3. **Usimamizi wa Kitambulisho Kati**: Rahisisha usimamizi wa mzunguko wa mtumiaji, udhibiti wa ufikiaji, na ukaguzi wa utii  
4. **Uthibitishaji wa Kipengele Kingi (MFA)**: Kurithi uwezo wa MFA kutoka kwa watoa kitambulisho wa biashara  
5. **Sera za Ufikiaji Masi**: Manufaa kutoka kwa udhibiti wa hatari na uthibitishaji unaobadilika

**Mahitaji ya Utekelezaji:**
- **Uthibitishaji wa Hadhira ya Tokeni**: Hakikisha tokeni zote zimetolewa wazi kutegemea seva ya MCP  
- **Uthibitishaji wa Mtoaji**: Thibitisha mtoaji wa tokeni anafanana na mtoa kitambulisho aliye tarajiwa  
- **Uthibitishaji wa Saini**: Uthibitishaji wa kriptografia wa uadilifu wa tokeni  
- **Utekelezaji wa Kumalizika**: Utekelezaji mkali wa ukomo wa maisha ya tokeni  
- **Uthibitishaji wa Eneo**: Hakikisha tokeni zina ruhusa zinazofaa kwa operesheni zinazohitajika  

### **Usalama wa Mantiki ya Idhini**

**Udhibiti Muhimu:**
- **Ukaguzi Kamili wa Idhini**: Mapitio ya usalama ya mara kwa mara ya maeneo yote ya maamuzi ya idhini  
- **Chaguo Salama za Kizazi**: Kataa ufikiaji wakati mantiki ya idhini haiwezi kufanya uamuzi wa uhakika  
- **Mipaka ya Ruhusa**: Tofauti wazi kati ya ngazi tofauti za ruhusa na ufikiaji wa rasilimali  
- **Kurekodi Ukaguzi**: Kurekodi kamili kwa maamuzi yote ya idhini kwa ufuatiliaji wa usalama  
- **Mapitio ya Mara kwa Mara ya Ufikiaji**: Uthibitisho wa mara kwa mara wa ruhusa za mtumiaji na mgawanyo wa idhini  

## 2. **Usalama wa Tokeni & Udhibiti wa Kuuzuia Kupitishwa**

**Hatari za OWASP MCP Zilizoshughulikiwa**: [MCP01 - Usimamizi Mbaya wa Tokeni & Kufichuliwa Siri](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Kuzuia Kupitishwa Kwa Tokeni**

**Kupitisha tokeni kinaruhusiwa kabisa** katika Ufafanuzi wa Idhini wa MCP kwa sababu ya hatari kubwa za usalama:

**Hatari za Usalama Zinazoshughulikiwa:**
- **Kupita Kivinjari cha Udhibiti**: Kupita udhibiti muhimu wa usalama kama vile kuzuia kasi, uthibitishaji wa maombi, na ufuatiliaji wa trafiki  
- **Uvunjaji wa Uwajibikaji**: Hufanya utambuzi wa mteja usiwezekane, kuharibu njia za ukaguzi na uchunguzi wa tukio  
- **Udanganyifu wa Proxy**: Kuwaruhusu wahalifu kutumia seva kama proxy kupata data bila idhini  
- **Uvunjaji wa Mipaka ya Uaminifu**: Kuvunja wadhifa wa huduma za chini kuhusu asili ya tokeni  
- **Mwendo wa Upande**: Tokeni zilizoharibika katika huduma nyingi kuruhusu upanuzi mpana wa mashambulizi  

**Udhibiti wa Utekelezaji:**
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

### **Mifumo ya Usimamizi wa Tokeni Salama**

**Mazingira Bora:**
- **Tokeni Zenye Muda Mfupi wa Kuishi**: Punguza dirisha la kufichuliwa kwa mzunguko wa tokeni mara kwa mara  
- **Kutoa Tokeni Kwa Wakati Mzuri**: Toa tokeni tu wakati zinahitajika kwa operesheni maalum  
- **Uhifadhi Salama**: Tumia moduli za usalama wa vifaa (HSMs) au hazina salama za funguo  
- **Kufunga Tokeni**: Funga tokeni kwa wateja maalum, vikao, au operesheni pale pawezekana  
- **Ufuatiliaji & Onyo**: Kugundua kwa wakati halisi matumizi mabaya ya tokeni au mifumo isiyoidhinishwa ya ufikiaji  

## 3. **Udhibiti wa Usalama wa Vikao**

### **Kuzuia Ukiukwaji wa Kikao**

**Njia za Shambulio Zinazoshughulikiwa:**
- **Kuingiza Matukio ya Kikao**: Matukio ya haba yanayowekwa ndani ya hali ya kikao cha pamoja kwa madhumuni mabaya  
- **Mwanafalsafa wa Kikao**: Matumizi yasiyoidhinishwa ya vitambulisho vya vikao vilivyoribwa kupita uthibitishaji  
- **Mashambulio ya Mtiririko Unaoweza Kuendelea**: Matumizi mabaya ya kuendelea kwa matukio yanayotumwa na seva kuingiza maudhui mabaya  

**Udhibiti wa Kikao Lazima:**
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

**Usalama wa Usafirishaji:**
- **Utekelezaji wa HTTPS**: Mawasiliano yote ya kikao yanapaswa kupitia TLS 1.3  
- **Sifa Salama za Vidakuzi**: HttpOnly, Secure, SameSite=Strict  
- **Kuainisha Cheti**: Kwa miunganisho muhimu kuzuia mashambulio ya mtu katikati (MITM)  

### **Mafikirio kuhusu Wilaya na Isiyokuwa Wilaya**

**Kwa Utekelezaji wa Wilaya:**
- Hali ya kikao cha pamoja inahitaji ulinzi zaidi dhidi ya mashambulio ya kuingiza  
- Usimamizi wa vikao kwa njia za safu unahitaji kuthibitishwa kwa uadilifu  
- Seva nyingi zinahitaji usawazishaji salama wa hali ya kikao  

**Kwa Utekelezaji Usiyo Wilaya:**
- Usimamizi wa kikao kwa tokeni kama JWT au sawa  
- Uthibitishaji wa kriptografia wa uadilifu wa hali ya kikao  
- Kupunguza eneo la shambulio lakini yanahitaji uthibitishaji thabiti wa tokeni  

## 4. **Udhibiti wa Usalama Maalum kwa AI**

**Hatari za OWASP MCP Zilizoshughulikiwa**:
- [MCP06 - Kuingizwa kwa Maelekezo Kupitia Mazito ya Muktadha](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Uchafuzi wa Zana](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Kuingizwa & Utekelezaji wa Amri](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Ulinzi wa Kuingizwa kwa Maelekezo**

**Ushirikiano wa Microsoft Prompt Shields:**
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

**Udhibiti wa Utekelezaji:**
- **Usafishaji wa Ingizo**: Uthibitishaji na uchujaji kamili wa vyanzo vyote vya mtumiaji  
- **Ufafanuzi wa Mipaka ya Maudhui**: Tofauti wazi kati ya maagizo ya mfumo na maudhui ya mtumiaji  
- **Mlinganyo wa Maagizo**: Sheria sahihi za mapendeleo kwa maagizo yanayopingana  
- **Ufuatiliaji wa Matokeo**: Kugundua matokeo yanayoweza kuwa hatari au yaliyobadilishwa  

### **Kuzuia Uchafuzi wa Zana**

**Mfumo wa Usalama wa Zana:**
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

**Usimamizi wa Zana unao Badilika:**
- **Mchakato wa Idhini**: Idhini ya wazi ya mtumiaji kwa mabadiliko ya zana  
- **Uwezo wa Kurudi Nyuma**: Uwezo wa kurejesha matoleo ya awali ya zana  
- **Ukaguzi wa Mabadiliko**: Historia kamili ya mabadiliko ya ufafanuzi wa zana  
- **Tathmini ya Hatari**: Tathmini ya moja kwa moja ya hali ya usalama ya zana  

## 5. **Kuzuia Shambulio la Dhamana Mchanganyiko**

### **Usalama wa Wakala wa OAuth**

**Udhibiti wa Kuzuia Shambulio:**
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

**Mahitaji ya Utekelezaji:**
- **Uthibitishaji wa Idhini ya Mtumiaji**: Kamwe usiruke skrini za idhini kwa usajili wa mteja wa nguvu  
- **Uthibitishaji wa URI ya Kuongoza Nyuma**: Uthibitishaji mkali unaotumika orodha ya bloki ya hatari za makazi ya kuongoza  
- **Ulinzi wa Nambari ya Idhini**: Nambari za muda mfupi zinafanywa kwa matumizi mara moja  
- **Uthibitishaji wa Kitambulisho cha Mteja**: Uthibitishaji thabiti wa sifa na metadata za mteja  

## 6. **Usalama wa Utekelezaji wa Zana**

### **Sanduku la Usalama & Kutenganisha**

**Kutenganishwa kwa Seva za Kontena:**
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

**Kutenganisha Mchakato:**
- **Muktadha wa Mchakato Tofauti**: Kila utekelezaji wa zana hufanyika katika muktadha wa mchakato uliotengwa  
- **Mawasiliano ya Mchakato kwa Mchakato (IPC)**: Mbinu salama za IPC zenye uthibitishaji  
- **Ufuatiliaji wa Mchakato**: Uchambuzi wa tabia ya wakati wa utekelezaji na kugundua matukio ya kupindukia  
- **Matumizi ya Rasilimali**: Mipaka thabiti ya CPU, kumbukumbu, na shughuli za I/O  

### **Utekelezaji wa Ruhusa ya Chini Zaidi**

**Usimamizi wa Ruhusa:**
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

## 7. **Udhibiti wa Usalama wa Mnyororo wa Ugavi**

**Hatari za OWASP MCP Zilizoshughulikiwa**: [MCP04 - Shambulio za Mnyororo wa Ugavi](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Uthibitishaji wa Kutegemea**

**Usalama Kamili wa Vipengele:**
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

### **Ufuatiliaji Endelevu**

**Ugunduzi wa Vitisho vya Mnyororo wa Ugavi:**
- **Ufuatiliaji wa Afya ya Kutegemea**: Tathmini ya mara kwa mara ya utegemezi wote kwa masuala ya usalama  
- **Ushirikiano wa Taarifa za Vitisho**: Sasisho za wakati halisi juu ya vitisho vinavyoibuka vya mnyororo wa ugavi  
- **Uchambuzi wa Tabia**: Kugundua tabia isiyo ya kawaida katika vipengele vya nje  
- **Majibu ya Moja kwa Moja**: Kuzuia mara moja vipengele vilivyoharibika  

## 8. **Udhibiti wa Ufuatiliaji & Ugunduzi**

**Hatari za OWASP MCP Zilizoshughulikiwa**: [MCP08 - Ukosefu wa Ukaguzi & Telemetri](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Usimamizi wa Taarifa za Usalama na Matukio (SIEM)**

**Mkakati Kamili wa Uandikishaji:**
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

### **Uchunguzi wa Vitisho kwa Wakati Halisi**

**Uchambuzi wa Tabia:**
- **Uchambuzi wa Tabia ya Mtumiaji (UBA)**: Kugundua mifumo isiyo ya kawaida ya ufikiaji wa watumiaji  
- **Uchambuzi wa Tabia ya Kihisia (EBA)**: Ufuatiliaji wa tabia ya seva ya MCP na zana  
- **Uchunguzi wa Upenyo wa Anomaly wa Mashine za Kujifunza**: Utambuzi wa vitisho vya usalama vinavyotumia akili ya bandia  
- **Ulinganifu wa Taarifa za Vitisho**: Kufananisha shughuli zilizogunduliwa dhidi ya mifumo ya mashambulio inayojulikana  

## 9. **Ujibu wa Tukio & Urejeshaji**

### **Uwezo wa Majibu ya Moja kwa Moja**

**Hatua za Majibu ya Haraka:**
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

### **Uwezo wa Uchunguzi wa Forensiki**

**Msaada wa Uchunguzi:**
- **Uhifadhi wa Njia za Ukaguzi**: Kurekodi usioyumba kwa uadilifu wa kriptografia  
- **Ukusanyaji wa Ushahidi**: Kukusanya kwa moja kwa moja mafaili muhimu ya usalama  
- **Ujenzi wa Mfululizo wa Matukio**: Msururu wa kina wa matukio yaliyopelekea matukio ya usalama  
- **Tathmini ya Athari**: Tathmini ya kiwango cha UVU na kufichuliwa kwa data  

## **Misingi Muhimu ya Usanifu wa Usalama**

### **Ulinzi Katika Kina**
- **Tabaka Nyingi za Usalama**: Hakuna hatua moja ya kushindwa katika usanifu wa usalama  
- **Udhibiti wa Kurudia**: Hatua za usalama zinazojirudia kwa kazi muhimu  
- **Mifumo Salama za Kizazi**: Chaguo salama wakati mifumo inakutana na makosa au mashambulizi  

### **Utekelezaji wa Hakika Sifuri**
- **Kamwe Usiamini, Hakikisha Daima**: Uthibitishaji endelevu wa vyombo vyote na maombi  
- **Kanuni ya Ruhusa Ndogo Zaidi**: Haki za ufikiaji za chini kabisa kwa vipengele vyote  
- **Mikato Midogo**: Udhibiti wa kina wa mtandao na ufikiaji  

### **Mageuzi Endelevu ya Usalama**
- **Mabadiliko ya Mazingira ya Vitisho**: Sasisho za mara kwa mara kushughulikia vitisho vinavyoibuka  
- **Ufanisi wa Udhibiti wa Usalama**: Tathmini na kuboresha udhibiti endelevu  
- **Utii wa Ufafanuzi**: Ulinganifu na viwango vinavyobadilika vya usalama vya MCP  

---

## **Rasilimali za Utekelezaji**

### **Hati Rasmi za MCP**
- [Ufafanuzi wa MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [Mbinu Bora za Usalama wa MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [Ufafanuzi wa Idhini wa MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  

### **Rasilimali za Usalama za OWASP MCP**
- [Mwongozo wa Usalama wa OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 kamili kwa utekelezaji wa Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Hatari rasmi za usalama za OWASP MCP  
- [Warsha ya Mkutano wa Usalama wa MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Mafunzo ya vitendo ya usalama kwa MCP kwenye Azure  

### **Suluhisho za Usalama za Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)  

### **Viwango vya Usalama**
- [Mbinu Bora za Usalama za OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 kwa Miundo Mikubwa ya Lugha](https://genai.owasp.org/)  
- [Mfumo wa Usalama wa Mtandao wa NIST](https://www.nist.gov/cyberframework)  

---

> **Muhimu**: Udhibiti huu wa usalama unaakisi ufafanuzi wa MCP wa sasa (2025-11-25). Daima hakikisha dhidi ya [hati rasmi](https://spec.modelcontextprotocol.io/) kwani viwango vinaendelea kubadilika kwa kasi.

## Nini Kifuatacho

- Rudi kwa: [Muhtasari wa Moduli ya Usalama](./README.md)
- Endelea kwa: [Sehemu ya 3: Kuanzia](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kiarifu cha Kukana**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kwa usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au kasoro. Hati ya asili katika lugha yake ya asili inapaswa kuchukuliwa kama chanzo cha halali. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na mtu inashauriwa. Hatubebei lawama kwa maelewano au tafsiri zisizo sahihi zinazotokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->