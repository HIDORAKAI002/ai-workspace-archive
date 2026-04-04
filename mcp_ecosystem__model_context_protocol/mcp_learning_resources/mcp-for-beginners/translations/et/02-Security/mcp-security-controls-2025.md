# MCP turvakontrollid – 2026. aasta veebruari uuendus

> **Kehtiv standard**: See dokument kajastab [MCP spetsifikatsiooni 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) turvanõudeid ja ametlikke [MCP turvalisuse parimaid tavasid](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) on oluliselt arenenud, pakkudes täiustatud turvakontrolle, mis käsitlevad nii traditsioonilist tarkvara turvet kui ka AI-spetsiifilisi ohte. See dokument annab põhjalikud turvakontrollid turvaliste MCP rakenduste jaoks, mis on kooskõlas OWASP MCP Top 10 raamistiku juhistega.

## 🏔️ Praktiline turbeõpe

Praktilise turvarakenduse kogemuse saamiseks soovitame **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** – põhjalikku juhendatud ekspeditsiooni MCP serverite turvamiseks Azure’is, kasutades meetodit „haavatav → ära kasuta → paranda → valiideeri“.

Kõik selles dokumendis olevad turvakontrollid on kooskõlas **[OWASP MCP Azure turbejuhendiga](https://microsoft.github.io/mcp-azure-security-guide/)**, mis pakub viiterahistikku ja Azure-spetsiifilisi rakendusjuhiseid OWASP MCP Top 10 riskide jaoks.

## **Nõutavad turvanõuded**

### **MCP spetsifikatsioonist tulenevad kriitilised keelud:**

> **KEELATUD**: MCP serverid **EI TOHI** vastu võtta ühtegi märki, mida ei ole selgesõnaliselt MCP serverile väljastatud  
>
> **KEELATUD**: MCP serverid **EI TOHI** kasutada sessioone autentimiseks  
>
> **NÕUTUD**: MCP serverid, mis rakendavad autoriseerimist, **PEAVAD** kontrollima KÕIKI sissetulevaid päringuid  
>
> **KOHUSTUSLIK**: MCP puhverserverid, mis kasutavad staatilisi kliendi ID-sid, **PEAVAD** hankima kasutaja nõusoleku iga dünaamiliselt registreeritud kliendi puhul

---

## 1. **Autentimise ja autoriseerimise kontrollid**

### **Välise identiteediteenuse pakkuja integreerimine**

**Kehtiv MCP standard (2025-11-25)** lubab MCP serveritel delegeerida autentimise välistele identiteediteenuse pakkujatele, mis tähistab olulist turvaparendust:

**OWASP MCP käsitletud risk**: [MCP07 - Ebapiisav autentimine ja autoriseerimine](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Turvalisuse eelised:**
1. **Eemaldab kohandatud autentimise riskid**: vähendab haavatavust, vältides kohandatud autentimislahendusi  
2. **Ettevõtte tasemel turvalisus**: kasutab tuntud identiteediteenuse pakkujaid nagu Microsoft Entra ID, millel on täiustatud turvaomadused  
3. **Keskne identiteedihaldus**: lihtsustab kasutajate elutsükli haldust, juurdepääsu kontrolli ja nõuetele vastavuse auditeerimist  
4. **Mitme faktoriga autentimine**: pärib MFA võimekusest ettevõtte identiteediteenuse pakkujatelt  
5. **Tingimuslik juurdepääsu poliitika**: kasu riskipõhistest ligipääsukontrollidest ja adaptiivsest autentimisest  

**Rakendusnõuded:**
- **Märgi sihtrühma valideerimine**: kinnita, et kõik märgid on selgesõnaliselt MCP serverile väljastatud  
- **Väljastaja valideerimine**: kontrolli, et märgi väljastaja vastab oodatud identiteediteenuse pakkujale  
- **Allkirja valideerimine**: krüptograafiline tokeni terviklikkuse kontroll  
- **Kehtivuse range täitmine**: ranged eeskirjad märgi eluea piiramiseks  
- **Laienduste valideerimine**: tagada, et märgid sisaldavad nõutud õigusi päringute teostamiseks  

### **Autoriseerimise loogika turvalisus**

**Kriitilised kontrolid:**
- **Kõikehõlmavad autoriseerimise auditid**: regulaarsed turvakontrollid kõigi autoriseerimisotsuste punktide üle  
- **Vea turvalisuse põhiseaded**: juurdepääsu keelamine, kui autoriseerimisloogika ei saa üheselt otsustada  
- **Õiguste piirangud**: selge lahusus erinevate privileegitasemete ja ressursside juurdepääsu vahel  
- **Auditeerimise logimine**: kõigi autoriseerimisotsuste täielik logimine turvaseire jaoks  
- **Regulaarsed ligipääsukontrollid**: perioodilised kasutajate õiguste ja privileegide kinnitused  

## 2. **Märgi turvalisus ja anti-passthrough kontrollid**

**OWASP MCP käsitletud risk**: [MCP01 - Märgihalduse vea ja saladuse lekkimine](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Märgi läbipääsu takistamine**

**MCP autoriseerimise spetsifikatsioon keelab selgesõnaliselt märgi läbipääsu**, kuna see põhjustab kriitilisi turvariske:

**Kaasatud turvariskid:**
- **Kontrollide möödaviimine**: võimaldab mööda minna olulistest turvakontrollidest nagu kiirusepiirang, päringu valideerimine ja liikluse jälgimine  
- **Vastutuse kaotus**: muutes kliendi tuvastamise võimatuks, kahjustab auditijälgi ja intsidentide uurimist  
- **Puhverserveri kaudu andmete väljapääs**: lubab pahatahtlikel isikutel kasutada servereid volitamata andmetele ligi pääsemiseks  
- **Usalduspiiride rikkumine**: rikub pärinevate märgiste osas alamteenuste usalduspõhimõtteid  
- **Horisontaalne levik**: kompromiteeritud märgid mitmetes teenustes võimaldavad laiemaid ründelaineid  

**Rakenduskontrollid:**
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

### **Turvalised märgihalduse mustrid**

**Parimad praktikad:**
- **Lühiajalised märgid**: vähenda ohtu sagedase märgivahetusega  
- **Pärimise hetkel väljastamine**: väljastada märgid täpselt spetsiifilisteks toiminguteks vajadusel  
- **Turvaline salvestus**: kasuta riistvaralisi turvameetmeid (HSMid) või turvalisi võtmekappe  
- **Märgi sidumine**: sidu märgid võimalusel kindlate klientide, sessioonide või toimingutega  
- **Jälgimine ja häired**: reaalajatuvastus märgi väärkasutuse või volitamata ligipääsu mustrite kohta  

## 3. **Sessiooni turvakontrollid**

### **Sessiooni kõrvalehiilu vältimine**

**Ründevektorid:**
- **Sessiooni kõrvalehiilu promptide süstimine**: pahatahtlikud sündmused jagatud sessiooniseisundisse sisestatuna  
- **Sessiooni vargus**: volitamata kasutamine varastatud sessiooni ID-de abil autentimismehhanismide läbipääsuks  
- **Taasilmumisega voogude ründed**: serveri poolt saadetud sündmuste jätkamise ära kasutamine pahatahtlike andmete süstimiseks  

**Nõutavad sessiooni kontrollid:**
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

**Transporti kaitse:**
- **HTTPS-i kohustuslik kasutamine**: kõik sessioonisuhtlus TLS 1.3 üle  
- **Turvalised küpsise atribuudid**: HttpOnly, Secure, SameSite=Strict  
- **Sertifikaadi sidumine (pinning)**: kriitiliste ühenduste kaitseks mees vahelt rünnakute eest  

### **Oleksusstaatiliste vs olekuta rakenduste kaalutlused**

**Oleksusstaatiliste rakenduste puhul:**
- Jagatud sessiooniseisundi täiendav kaitse süstimisrünnakute vastu  
- Järjekaupõhise sessioonihalduse tervikluse kontrollimine  
- Mitme serveri näite nõue sessiooniseisundi turvaliseks sünkroniseerimiseks  

**Olekuta rakenduste puhul:**
- JWT või sarnane märgil põhinev sessioonihaldus  
- Sessiooniseisundi krüptograafiline terviklikkuse kontroll  
- Vähendatud ründe pind, kuid vajab tugevat märgi valideerimist  

## 4. **AI-spetsiifilised turvakontrollid**

**OWASP MCP käsitletud riskid**:
- [MCP06 - Promptide süstimine kontekstuaalsete koormustega](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Tööriistamürgitus](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Käskude süstimine ja täitmine](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Promptide süstimise kaitse**

**Microsoft Prompt Shields integratsioon:**
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

**Rakenduskontrollid:**
- **Sisendi puhastamine**: kõikehõlmav valideerimine ja filtreerimine kõigile kasutajasissetulekutest  
- **Sisupiiride määratlemine**: selge eristamine süsteemi käskluste ja kasutaja sisu vahel  
- **Juhiste hierarhia**: konfliktsete juhiste puhul korrektne prioriteetide rakendamine  
- **Väljundite jälgimine**: potentsiaalselt kahjulike või manipuleeritud väljundite avastamine  

### **Tööriistamürgituse vältimine**

**Tööriistade turbekonveier:**
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

**Dünaamiline tööriistade haldus:**
- **Kinnitamisvood**: tööriistade muudatusteks vajaliku kasutaja selge nõusolek  
- **Tagasikerimise võimalus**: võimalus naasta varasemate tööriista versioonide juurde  
- **Muudatuste auditeerimine**: täielik ajalugu tööriistade definitsioonide muudatustest  
- **Riskihindamine**: automaatne tööriistade turvaseisundi hindamine  

## 5. **Segaduses esindaja ründe vältimine**

### **OAuth puhverserveri turvalisus**

**Ründe ennetuskontrollid:**
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

**Rakendusnõuded:**
- **Kasutaja nõusoleku kontroll**: dünaamilise kliendi registreerimisel ärge vahele jätke nõusolekuekraane  
- **Ümbersuunamise URI valideerimine**: rangelt valge nimekirja alusel lubatud sihtkohtade kontroll  
- **Autoriseerimiskoodi kaitse**: lühiajalised ja korduskasutust keelavad koodid  
- **Kliendi identiteedi valideerimine**: tugeva kliendi mandaadi ja metaandmete kontroll  

## 6. **Tööriistade täitmise turvalisus**

### **Hõivutud ala ja isoleerimine**

**Konteinerymootoripõhine isolatsioon:**
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

**Protsessi isolatsioon:**
- **Eraldatud protsessikontextid**: iga tööriistatäide üksikasjalikus eraldatud protsessiruumis  
- **Protsessidevaheline suhtlus**: turvalised IPC-mehhanismid valideerimisega  
- **Protsessi jälgimine**: jooksva käitumise analüüs ja anomaaliate avastamine  
- **Ressursside piiramine**: ranges ulatuses CPU, mälu ja I/O kasutuspiirangud  

### **Vähima privileegiga rakendus**

**Õiguste haldus:**
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

## 7. **Tarneahela turvakontrollid**

**OWASP MCP käsitletud risk**: [MCP04 - Tarneahela ründed](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Sõltuvuste valideerimine**

**Põhjalik komponendi turvalisus:**
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

### **Pidev jälgimine**

**Tarneahela ohu tuvastamine:**
- **Sõltuvuste tervise jälgimine**: kogu sõltuvuste turvariskide pidev hindamine  
- **Ohuteabe integreerimine**: reaalaja uuendused tekkivate tarneahela ohtude kohta  
- **Käitumusanalüüs**: ebahariliku käitumise avastamine väliskomponentides  
- **Automaatne reageerimine**: kompromiteeritud komponentide kohene piiramine  

## 8. **Jälgimise ja tuvastamise kontrollid**

**OWASP MCP käsitletud risk**: [MCP08 - Auditite ja telemeetria puudumine](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Turvainformatsiooni ja sündmuste haldus (SIEM)**

**Põhjalik logimisstrateegia:**
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

### **Reaalaja ohutuvastus**

**Käitumise analüütika:**
- **Kasutajakäitumise analüüs (UBA)**: ebatavaliste kasutajate ligipääsumustrite avastamine  
- **Entiteedi käitumise analüüs (EBA)**: MCP serveri ja tööriistade käitumise jälgimine  
- **Masinõppe anomaalia tuvastus**: AI abil tuvastatud turvaohud  
- **Ohuteabe korrelatsioon**: jälgitavate tegevuste võrdlus tuntud ründemustritega  

## 9. **Intsidentidele reageerimine ja taastumine**

### **Automaatse reageerimise võimekus**

**Kohesed reageerimismeetmed:**
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

### **Forensika võimekused**

**Uurimistugi:**
- **Auditeerimisjälje säilitamine**: muutumatu logimine krüptograafilise terviklikkusega  
- **Tõendite kogumine**: automaatne oluliste turbekujujate kogumine  
- **Ajavahemiku taastamine**: üksikasjalik sündmuste järjekord turvaintsidentide eel  
- **Mõju hindamine**: kompromissi ulatuse ja andmete lekkimise hindamine  

## **Olulised turbelahenduse põhimõtted**

### **Sügav kaitse**
- **Mitmekihilised turvameetmed**: puudub üksik tõrkevõimalus turve arhitektuuris  
- **Redundantsed kontrollid**: kriitiliste funktsioonide üle kattuvad turvameetmed  
- **Vea turvalisus**: turvalised vaikeväärtused süsteemivigade või rünnakute korral  

### **Zero Trust rakendus**
- **Ära kunagi usalda, kontrolli alati**: pidev kõigi osapoolte ja päringute valideerimine  
- **Vähima privileegi printsiip**: kõigi komponentide minimaalsete ligipääsuõiguste rakendamine  
- **Mikrosegmentatsioon**: peenhäälestatud võrgukaitse ja juurdepääsukontrollid  

### **Turve pidev areng**
- **Ohumaastiku kohandamine**: regulaarsed uuendused tekkivate ohtude vastu  
- **Turvakontrollide tõhususe jälgimine**: kontrollide pidev hindamine ja parendamine  
- **Spetsifikatsioonide järgimine**: MCP turvastandarditesse muutuste integreerimine  

---

## **Rakendusressursid**

### **Ametlik MCP dokumentatsioon**
- [MCP Spetsifikatsioon (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP turbe head tavad](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP autoriseerimise spetsifikatsioon](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP turberessursid**
- [OWASP MCP Azure turbejuhend](https://microsoft.github.io/mcp-azure-security-guide/) – põhjalik OWASP MCP Top 10 koos Azure juurutamisega  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – ametlikud OWASP MCP turvariskid  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – praktiline turbeõpe MCP jaoks Azure’is  

### **Microsofti turbelahendused**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Turvastandardid**
- [OAuth 2.0 turbehead tavad (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 suurtel keelemudelitel](https://genai.owasp.org/)
- [NIST küberjulgeoleku raamistik](https://www.nist.gov/cyberframework)

---

> **Oluline**: Need turvakontrollid kajastavad kehtivat MCP spetsifikatsiooni (2025-11-25). Kontrollige alati uusimaid [ametlikke dokumente](https://spec.modelcontextprotocol.io/), kuna standardid arenevad kiiresti.

## Mis järgneb

- Tagasi: [Turbe mooduli ülevaade](./README.md)
- Jätka: [Moodul 3: Alustamine](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest loobumine**:
See dokument on tõlgitud kasutades tehisintellektil põhinevat tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi püüame täpsust, palun pidage meeles, et automaatsed tõlked võivad sisaldada vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul on soovitatav kasutada professionaalset inimtõlget. Me ei vastuta selle tõlke kasutamisest tulenevate arusaamatuste või valesti mõistmiste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->