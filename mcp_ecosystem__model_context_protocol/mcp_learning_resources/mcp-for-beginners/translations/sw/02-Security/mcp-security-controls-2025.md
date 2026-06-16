# Udhibiti wa Usalama wa MCP - Sasisho la Februari 2026

> **Kiwango Rasmi cha Sasa**: Hati hii inaonyesha mahitaji ya usalama ya [Vipimo vya MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) na [Mazingira Bora ya Usalama ya MCP Rasmi](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Itifaki ya Muktadha wa Mfano (MCP) imekomaa sana na kupanua udhibiti wa usalama unaoshughulikia usalama wa programu za jadi na vitisho maalum vya AI. Hati hii inatoa udhibiti wa kina wa usalama kwa utekelezaji salama wa MCP unaoendana na mfumo wa OWASP MCP Top 10.

## 🏔️ Mafunzo ya Usalama ya Vitendo

Kwa uzoefu wa vitendo wa utekelezaji wa usalama, tunapendekeza **[Warsha ya Mkutano wa Usalama wa MCP (Sherpa)](https://azure-samples.github.io/sherpa/)** - mkakati wa kina wa kuongoza usalama wa seva za MCP katika Azure kwa kutumia mbinu ya "dhaifu → utapeli → marekebisho → uthibitisho".

Udhibiti wote wa usalama katika hati hii unaendana na **[Mwongozo wa Usalama wa OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)**, ambao unatoa usanifu wa rejeleo na mwongozo wa utekelezaji maalum wa Azure kwa hatari za OWASP MCP Top 10.

## **Mahitaji ya Usalama YA KILAZIMI**

### **Marufuku Muhimu kutoka katika Specification ya MCP:**

> **NI MARUFUKU**: Seva za MCP **HAZIPASWI** kukubali tokeni zozote ambazo hazikutolewa wazi kwa seva ya MCP  
>  
> **HAZIKUBALIKI**: Seva za MCP **HAZIPASWI** kutumia vikao kwa uthibitishaji  
>  
> **INAHITAJIKA**: Seva za MCP zinazotekeleza idhini **ZINAZOPASWA** kuthibitisha ombi ZOTE zinazoingia  
>  
> **KILAZIMI**: Seva za wakala wa MCP zinazotumia vitambulisho vya mteja visivyo badilika **ZINAZOPASWA** kupata idhini ya mtumiaji kwa kila mteja aliyesajiliwa kwa nguvu

---

## 1. **Udhibiti wa Uthibitishaji & Uidhinishaji**

### **Uunganisho wa Mtoa Vitambulisho wa Nje**

**Kiwango cha MCP Sasa (2025-11-25)** kinaruhusu seva za MCP kuruhusu uthibitishaji kwa watoa vitambulisho wa nje, kinachoonyesha kuboresha kwa usalama kwa kiasi kikubwa:

**Hatari ya OWASP MCP Iliyoshughulikiwa**: [MCP07 - Uthibitishaji na Uidhinishaji Usio Mkamilifu](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Manufaa ya Usalama:**
1. **Kuondoa Hatari za Uthibitishaji wa Kulanzi**: Kupunguza mwanya wa udhaifu kwa kuepuka utekelezaji wa uthibitishaji wa kawaida
2. **Usalama wa Kiwango cha Shirika**: Kutumia watoa vitambulisho walioko kama Microsoft Entra ID zenye sifa za usalama bora
3. **Usimamizi wa Kitambulisho Kwenye Kituo Kimoja**: Kurahisisha usimamizi wa mzunguko wa mtumiaji, udhibiti wa ufikiaji, na ukaguzi wa ufuataji wa kanuni
4. **Uthibitishaji wa Vipengele Vingi (MFA)**: Kupata uwezo wa MFA kutoka kwa watoa vitambulisho wa shirika
5. **Sera za Ufikiaji wa Masharti**: Faida kutoka kwa udhibiti wa ufikiaji unaotegemea hatari na uthibitishaji unaojibadilisha

**Mahitaji ya Utekelezaji:**
- **Uthibitishaji wa Hadhira ya Tokeni**: Thibitisha tokeni zote zilizoelekezwa wazi kwa seva ya MCP
- **Uthibitishaji wa Mtengenezaji**: Thibitisha mtengenezaji wa tokeni anaendana na mtoa kitambulisho anatarajiwa
- **Uthibitishaji wa Saini**: Uhakiki wa kihesabu wa ukamilifu wa tokeni
- **Utekelezaji wa Kumalizika kwa Muda**: Utekelezaji mkali wa mipaka ya maisha ya tokeni
- **Uthibitishaji wa wigo**: Hakikisha tokeni zina ruhusa sahihi kwa shughuli zilizohitajiwa

### **Usalama wa Mantiki ya Uidhinishaji**

**Udhibiti Muhimu:**
- **Ukaguzi wa kina wa Uidhinishaji**: Mapitio ya usalama mara kwa mara ya maeneo yote ya maamuzi ya uidhinishaji
- **Chaguo Salama Zaidi**: Kukataa ufikiaji wakati mantiki ya uidhinishaji haiwezi kutoa uamuzi thabiti
- **Mipaka ya Ruhusa**: Tofauti wazi kati ya ngazi za vibali tofauti na upatikanaji wa rasilimali
- **Kufuatilia kwa Ukaguzi wa Mfumo**: Kufuata maamuzi yote ya uidhinishaji kwa ukaguzi wa usalama
- **Mapitio ya Mara kwa Mara ya Ufikiaji**: Uthibitishaji wa muda kwa ruhusa za mtumiaji na mgawanyo wa vibali

## 2. **Usalama wa Tokeni & Udhibiti wa Kupitisha Tokeni**

**Hatari ya OWASP MCP Iliyoshughulikiwa**: [MCP01 - Usimamizi Mbaya wa Tokeni na Kufichuliwa Siri](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Kuzuia Kupitisha Tokeni**

**Kupitisha tokeni kunapigwa marufuku wazi** katika Ufafanuzi wa Uidhinishaji wa MCP kwa sababu za hatari kuu za usalama:

**Hatari za Usalama Zilizoshughulikiwa:**
- **Kuepuka Udhibiti**: Kupita udhibiti muhimu wa usalama kama ukomo wa viwango, uthibitishaji wa maombi, na ufuatiliaji wa trafiki
- **Kuporomoka kwa Uwajibikaji**: Kufanya kutokuwepo kwa utambuzi wa mteja, kuharibu njia za ukaguzi na uchunguzi wa matukio
- **Uwizi Kupitia Wakala**: Kuruhusu wahalifu kutumia seva kama mawakala kwa ufikiaji usioidhinishwa wa data
- **Uvunjifu wa Mipaka ya Uaminifu**: Kuvunja dhana za uaminifu wa huduma za chini kuhusu asili ya tokeni
- **Mabadiliko ya Upande wa Pili**: Tokeni zilizoathirika kwenye huduma nyingi zinaruhusu upanuzi mkubwa wa mashambulizi

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

### **Mifumo ya Usimamizi Salama wa Tokeni**

**Mazingira Bora:**
- **Tokeni Zenye Muda Mfupi wa Kuisha**: Punguza dirisha la kufichuliwa kwa kuzungusha tokeni mara kwa mara
- **Utoaji wa Saa kwa Saa**: Toa tokeni wakati zinapohitajika kwa shughuli maalum
- **Uhifadhi Salama**: Tumia moduli za usalama wa vifaa (HSMs) au hazina za funguo salama
- **Ufungaji wa Tokeni**: Funga tokeni kwa wateja, vikao, au shughuli maalum inapowezekana
- **Ufuatiliaji na Onyo**: Ugunduzi wa wakati halisi wa matumizi mabaya ya tokeni au mifumo ya upatikanaji isiyoidhinishwa

## 3. **Udhibiti wa Usalama wa Vikao**

### **Kuzuia Wizi wa Vikao**

**Njia za Kushambulia Zilizoshughulikiwa:**
- **Uingizwaji wa Matukio ya Wizi wa Kikao**: Matukio mabaya yameingizwa kwenye hali ya kikao cha pamoja
- **Udanganyifu wa Kikao**: Matumizi yasiyoidhinishwa ya vitambulisho vya kikao vilivyoibwa ili kupitisha uthibitishaji
- **Shambulio za Kupitisha Mifereji Inayoweza Kuendelea**: Unyonyaji wa tukio linalotumwa na seva kwa ajili ya kuingiza maudhui mabaya

**Udhibiti wa Kikao Kilichowekwa:**
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
- **Utekelezaji wa HTTPS**: Mawasiliano yote ya kikao kupita TLS 1.3
- **Sifa Salama za Kukuki**: HttpOnly, Secure, SameSite=Strict
- **Pinning ya Cheti**: Kwa muunganisho muhimu ili kuzuia shambulio la man-in-the-middle

### **Mazoezi ya Kikao Chenye Hali na Kisicho na Hali**

**Kwa Utekelezaji Chenye Hali:**
- Hali ya pamoja ya kikao inahitaji ulinzi zaidi dhidi ya shambulio za kuingizwa
- Usimamizi wa kikao wa aina ya foleni unahitaji uthibitishaji wa ukamilifu
- Seva nyingi zinahitaji usawazishaji salama wa hali ya kikao

**Kwa Utekelezaji Usio na Hali:**
- Usimamizi wa kikao unaotegemea tokeni kama JWT au sawa
- Uthibitishaji wa kihesabu wa ukamilifu wa hali ya kikao
- Kupunguzwa kwa eneo la shambulizi lakini inahitaji uthibitisho wa tokeni thabiti

## 4. **Udhibiti wa Usalama Maalum kwa AI**

**Hatari za OWASP MCP Zilizoshughulikiwa**:
- [MCP06 - Kupotoshwa kwa Mtiririko wa Maagizo](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Uchafu wa Zana](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Uingizaji na Utekelezaji wa Amri](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Kingamwili cha Kuingiza Maagizo**

**Muunganiko wa Microsoft Prompt Shields:**
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
- **Uchujaji wa Ingizo**: Uhakiki wa kina na kuchuja ingizo zote za mtumiaji
- **Ufafanuzi wa Mipaka ya Maudhui**: Tofauti wazi kati ya maagizo ya mfumo na maudhui ya mtumiaji
- **Mlinganyo wa Maagizo**: Sheria sahihi za kipaumbele kwa maagizo yanayokinzana
- **Ufuatiliaji wa Matokeo**: Ugunduzi wa matokeo yenye uwezekano wa hatari au yaliyopotoshwa

### **Kuzuia Uchafu wa Zana**

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

**Usimamizi wa Zana unaobadilika:**
- **Mifumo ya Idhini**: Idhini wazi ya mtumiaji kwa mabadiliko ya zana
- **Uwezo wa Kurudisha Mabadiliko**: Uwezo wa kurudi kwenye toleo la awali la zana
- **Ukaguzi wa Mabadiliko**: Historia kamili ya mabadiliko ya maelezo ya zana
- **Tathmini ya Hatari**: Tathmini ya moja kwa moja ya hali ya usalama ya zana

## 5. **Kuzuia Shambulio la Mwakilishi Aliyechanganyikiwa**

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
- **Uthibitishaji wa Idhini ya Mtumiaji**: Kamwe usiruke skrini za idhini kwa usajili wa wateja kwa nguvu
- **Uthibitishaji wa URI ya Mwelekeo**: Uthibitishaji mkali wa orodha ya masharti kwa sehemu za mwelekeo
- **Ulinzi wa Msimbo wa Idhini**: Msimbo mfupi wa matumizi mara moja tu
- **Uthibitishaji wa Kitambulisho cha Mteja**: Uthibitishaji thabiti wa sifa na metadata za mteja

## 6. **Usalama wa Utekelezaji wa Zana**

### **Sanduku la Usalama na Kutengwa**

**Kutengwa Kwenye Kontena:**
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

**Kutengwa kwa Mchakato:**
- **Muktadha wa Mchakato Tofauti**: Kila utekelezaji wa zana katika muktadha wa mchakato uliotengwa
- **Mawasiliano kati ya Mchakato**: Mbinu salama za IPC zenye uthibitisho
- **Ufuatiliaji wa Mchakato**: Uchambuzi wa mwenendo wa wakati wa utekelezaji na ugunduzi wa kasoro
- **Utekelezaji wa Rasilimali**: Vizuizi madhubuti vya CPU, kumbukumbu, na uendeshaji wa I/O

### **Utekelezaji wa Udhibiti wa Vibali Vidogo**

**Usimamizi wa Vibali:**
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

**Hatari ya OWASP MCP Iliyoshughulikiwa**: [MCP04 - Shambulio za Mnyororo wa Usambazaji wa Programu & Udanganyifu wa Utegenezaji](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Uthibitishaji wa Mtegemezi**

**Usalama wa Kipengele kwa Kina:**
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

**Uchunguzi wa Vitisho vya Mnyororo wa Ugavi:**
- **Ufuatiliaji wa Afya ya Mtegemezi**: Tathmini endelevu ya tegemezi zote kwa masuala ya usalama
- **Muunganiko wa Uelewa wa Vitisho**: Sasisho la wakati halisi kuhusu vitisho vinavyoibuka vya mnyororo wa ugavi
- **Uchambuzi wa Tabia**: Ugunduzi wa tabia isiyo ya kawaida katika vipengele vya nje
- **Jibu la Moja kwa Moja**: Kuzuia mara moja kwa vipengele vilivyoathirika

## 8. **Udhibiti wa Ufuatiliaji na Ugunduzi**

**Hatari ya OWASP MCP Iliyoshughulikiwa**: [MCP08 - Ukosefu wa Ukaguzi na Telemetri](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Usimamizi wa Taarifa na Tukio (SIEM)**

**Mkakati wa Kukusanya Rekodi:**
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

### **Ugunduzi wa Vitisho vya Wakati Halisi**

**Uchambuzi wa Tabia:**
- **Uchambuzi wa Tabia ya Mtumiaji (UBA)**: Ugunduzi wa mifumo isiyo ya kawaida ya ufikiaji wa mtumiaji
- **Uchambuzi wa Tabia ya Kiwango (EBA)**: Ufuatiliaji wa mwenendo wa seva za MCP na zana
- **Ugunduzi wa Kasoro kwa Kujifunza Mashine**: Utambuzi wa vitisho vya usalama kwa msaada wa AI
- **Mwangalizio wa Uelewa wa Vitisho**: Kufananisha shughuli zilizobainika na mifumo ya mashambulizi inayojulikana

## 9. **Majibu ya Tukio na Urejeshaji**

### **Uwezo wa Majibu ya Kiotomatiki**

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

### **Uwezo wa Forensics**

**Msaada wa Uchunguzi:**
- **Uhifadhi wa Njia ya Ukaguzi**: Ukusanyaji usiobadilika wa rekodi zenye usalama wa kihesabu
- **Ukusanyaji wa Ushahidi**: Ujungwaji wa moja kwa moja wa nyaraka muhimu za usalama
- **Urekebishaji wa Msimulizi wa Matukio**: Mpangilio wa kina wa matukio yaliyopelekea matukio ya usalama
- **Tathmini ya Madhara**: Tathmini ya upeo wa kuathirika na kufichuliwa kwa data

## **Kanuni Muhimu za Usaidizi wa Usalama**

### **Ulinzi Kwa Kina**
- **Tabaka Mbalimbali za Usalama**: Hakuna sehemu moja tu inayoshindwa katika usanifu wa usalama
- **Udhibiti wa Kurudia**: Hatua za usalama zinazovuka kazi muhimu
- **Mifumo ya Kuhakikisha Usalama**: Chaguzi salama za msingi wakati mifumo inakutana na makosa au mashambulizi

### **Utekelezaji wa Imani Sifuri**
- **Kamwe Usiamini, Daima Thibitisha**: Uhakiki endelevu wa vyombo vyote na maombi
- **Kanuni ya Vibali Vidogo Zaidi**: Haki za upatikanaji za chini kabisa kwa vipengele vyote
- **Sehemu Ndogo Ndogo**: Udhibiti sahihi wa mtandao na ufikiaji

### **Mageuzi Endelevu ya Usalama**
- **Urekebishaji wa Mazingira ya Vitisho**: Sasisho la mara kwa mara kushughulikia vitisho vipya
- **Ufanisi wa Udhibiti wa Usalama**: Tathmini na uboreshaji wa udhibiti endelevu
- **Uzingatiaji wa Maelezo**: Kufuatana na viwango vinavyobadilika vya usalama vya MCP

---

## **Rasilimali za Utekelezaji**

### **Nyaraka Rasmi za MCP**
- [Vipimo vya MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Mazingira Bora ya Usalama ya MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Ufafanuzi wa Uidhinishaji wa MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Rasilimali za Usalama za OWASP MCP**
- [Mwongozo wa Usalama wa OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 ya kina na utekelezaji wa Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Hatari rasmi za usalama za OWASP MCP
- [Warsha ya Mkutano wa Usalama wa MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Mafunzo ya vitendo ya usalama wa MCP kwenye Azure

### **Suluhisho za Usalama za Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Usalama wa Maudhui wa Azure](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Usalama wa Juu](https://github.com/security/advanced-security)
- [Hazina ya Funguo ya Azure](https://learn.microsoft.com/azure/key-vault/)

### **Viwango vya Usalama**
- [Mazingira Bora ya Usalama ya OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 kwa Modeli Kubwa za Lugha](https://genai.owasp.org/)
- [Mfumo wa Usalama wa Mtandao wa NIST](https://www.nist.gov/cyberframework)

---

> **Muhimu**: Udhibiti huu wa usalama unaonyesha vipimo vya sasa vya MCP (2025-11-25). Daima thibitisha dhidi ya [nyaraka rasmi](https://spec.modelcontextprotocol.io/) za hivi karibuni kwani viwango vinaendelea kubadilika haraka.

## Nini Ifuatayo

- Rudi kwa: [Muhtasari wa Moduli ya Usalama](./README.md)
- Endelea kwa: [Moduli 3: Kuanzia](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->