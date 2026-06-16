# MCP turvakontrollid – 2026. aasta veebruari värskendus

> **Kehtiv standard**: See dokument peegeldab [MCP spetsifikatsiooni 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) turvanõudeid ja ametlikke [MCP turvalisuse parimaid tavasid](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) on märkimisväärselt küpsenud, sisaldades täiustatud turvakontrolle, mis käsitlevad nii traditsioonilist tarkvara turvalisust kui ka AI-spetsiifilisi ohte. See dokument pakub põhjalikke turvakontrolle turvaliste MCP rakenduste jaoks, mis on kooskõlas OWASP MCP Top 10 raamistikuga.

## 🏔️ Praktiline turvakoolitus

Praktilise, käsitsi turvalisuse rakendamise kogemuse saamiseks soovitame **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** – põhjalikku juhendatud tegevust MCP serverite turvamiseks Azure'is, kasutades meetodit „haavatav → ära kasutada → parandada → valideerida“.

Kõik selles dokumendis olevad turvakontrollid on kooskõlas **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** juhendiga, mis pakub viitearhitektuure ja Azure-spetsiifilisi rakendussoovitusi OWASP MCP Top 10 riskide jaoks.

## **KOHUSTUSLIKUD turvanõuded**

### **Olulised keelud MCP spetsifikatsioonist:**

> **KEELATUD**: MCP serverid **EI TOHI** aktsepteerida ühtegi tokenit, mis ei ole otseselt väljastatud MCP serverile  
>
> **KEELATUD**: MCP serverid **EI TOHI** kasutada sessioone autentimiseks  
>
> **NÕUTUD**: MCP serverid, mis rakendavad autoriseerimist, **PEAVAD** kontrollima KÕIKI sissetulevaid päringuid  
>
> **KOHUSTUSLIK**: MCP proxy serverid, mis kasutavad staatilisi klientide ID-sid, **PEAVAD** kasutajalt saama nõusoleku iga dünaamiliselt registreeritud kliendi jaoks

---

## 1. **Autentimise ja autoriseerimise kontrollid**

### **Väline identiteedipakkuja integratsioon**

**Kehtiv MCP standard (2025-11-25)** lubab MCP serveritel delegeerida autentimine välistele identiteedipakkujatele, mis on oluline turvalisuse täiustus:

**OWASP MCP risk lahendatud**: [MCP07 - Ebapiisav autentimine ja autoriseerimine](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Turvalisuse eelised:**
1. **Eemaldab kohandatud autentimise riskid**: vähendab haavatavust, vältides kohandatud autentimise lahendusi  
2. **Ettevõtte taseme turvalisus**: kasutab tuntud identiteedipakkujaid nagu Microsoft Entra ID kõrgtasemel turvaomadustega  
3. **Keskne identiteedihaldus**: lihtsustab kasutaja elutsükli haldust, juurdepääsu juhtimist ja vastavuse auditit  
4. **Mitmefaktoriline autentimine**: toetub ettevõtte identiteedipakkujate MFA funktsionaalsusele  
5. **Tingimuslikud juurdepääsupoliitikad**: kasutab riskipõhiseid juurdepääsu kontrollimeetmeid ja adaptiivset autentimist  

**Rakendamise nõuded:**
- **Tokeni sihtmärgi valideerimine**: kontrolli, et kõik tokenid oleksid selgelt MCP serverile väljastatud  
- **Väljastaja kontroll**: kinnita, et tokeni väljastaja vastab oodatud identiteedipakkujale  
- **Allkirja valideerimine**: tokeni terviklikkuse krüptograafiline kontroll  
- **Aegumise järelvalve**: tokeni eluea piirangute ranged nõuded  
- **Ulatuvuse valideerimine**: veendu, et tokenites oleksid sobivad õigused nõutud toiminguteks  

### **Autoriseerimise loogika turvalisus**

**Olulised kontrollid:**
- **Põhjalikud autoriseerimise auditid**: regulaarsed turvakontrollid kõigi autoriseerimisotsuste puhul  
- **Ohutud vaikimisi valikud**: juurdepääsu keelamine, kui autoriseerimisloogika ei suuda kindlat otsust langetada  
- **Õiguste piirmäärad**: selge eristamine erinevate privileegitasemete ja ressursside juurdepääsu vahel  
- **Audiitorite logimine**: täielik logimine kõigist autoriseerimisotsustest turvaseireks  
- **Regulaarsed juurdepääsu ülevaated**: perioodilised kasutajate õiguste ja privileegide kontrollid  

## 2. **Tokeni turvalisus ja anti-passthrough kontrollid**

**OWASP MCP risk lahendatud**: [MCP01 - Tokenite valehaldus ja saladuste lekkimine](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Tokenite läbikandmise vältimine**

Tokenite läbikandmine on MCP autoriseerimise spetsifikatsioonis rangelt keelatud kriitiliste turvariskide tõttu:

**Lahendatud turvariskid:**
- **Kontrolli eiramine**: möödapääseb olulistest turvakontrollidest nagu päringute piiramine, valideerimine ja liikluse jälgimine  
- **Arvestusvõime kahjustumine**: klientide tuvastamine võimatu, rikub auditeid ja intsidentide uurimist  
- **Proksina andmete vargus**: võimaldab pahatahtlikel kasutada servereid volitamata andmele juurdepääsuks  
- **Usalduse rikkumine**: rikub downstream teenuste usalduse eeldusi tokenite päritolu kohta  
- **Lateral liikumine**: kompromiteeritud tokenid võimaldavad rünnakut laiendada mitmetele teenustele  

**Rakenduse kontrollid:**
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

### **Turvalised tokenihalduse mustrid**

**Parimad tavad:**
- **Lühiajalised tokenid**: minimeeri kokkupuuteaeg sagedase tokenite vahetusega  
- **Vajaliku ajal väljastamine**: anna tokenid välja ainult spetsiifiliste toimingute jaoks  
- **Turvaline säilitamine**: kasuta riistvarapõhiseid turvalisi mooduleid (HSM) või turvalisi võtmekambreid  
- **Tokeni sidumine**: seo tokenid konkreetsete klientide, sessioonide või toimingutega võimaluse korral  
- **Jälgimine ja häired**: reaalajas tokenite väärkasutuse või volitamata juurdepääsu mustrite tuvastamine  

## 3. **Sessiooni turvakontrollid**

### **Sessioonikaaperdamise vältimine**

**Rünnaku vektorid:**
- **Sessioonikaaperdamise prompti süstimine**: pahatahtlikud sündmused süstitud jagatud sessiooni olekusse  
- **Sessiooni imiteerimine**: varastatud sessiooni ID-de volitamata kasutamine autentimise mööda minemiseks  
- **Jätkatavad voo rünnakud**: serverist saadetavate sündmuste (SSE) rünnakud pahatahtliku sisu süstimiseks  

**Kohustuslikud sessioonikontrollid:**
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

**Andmeside turvalisus:**
- **HTTPS range nõue**: kogu sessiooni suhtlus TLS 1.3 üle  
- **Turvalised küpsistenäitajad**: HttpOnly, Secure, SameSite=Strict  
- **Sertifikaadi kinnitamine**: kriitiliste ühenduste jaoks MITM rünnakute vältimiseks  

### **Seisundihoidlike ja seisundivabade kaalutlused**

**Seisundihoidlikud rakendused:**
- Jagatud sessiooni olek vajab täiendavat kaitset süstimisrünnakute eest  
- Järjekorrapõhine sessioonihaldus vajab terviklikkuse kontrolli  
- Mitme serveri puhul vajalik turvaline sessiooni oleku sünkroonimine  

**Seisundivabad rakendused:**
- JWT või sarnane tokenipõhine sessioonihaldus  
- Krüptograafiline sessiooni oleku terviklikkuse kontroll  
- Vähendatud ründevektor, kuid nõuab robustset tokeni valideerimist  

## 4. **AI-spetsiifilised turvakontrollid**

**OWASP MCP riskid lahendatud**:
- [MCP06 - Käitumisvoo manipulatsioon](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Tööriistamürgitus](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Käskude süstimine ja käitamine](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Prompti süstimise kaitse**

**Microsoft Prompt Shields integreerimine:**
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

**Rakenduse kontrollid:**
- **Sisendi puhastamine**: põhjalik kõikide kasutajasisestuste valideerimine ja filtreerimine  
- **Sisu piiri määratlus**: selge eristamine süsteemi juhiste ja kasutaja sisu vahel  
- **Juhiste hierarhia**: õiged prioriteedireeglid konfliktsete juhiste korral  
- **Väljundi jälgimine**: potentsiaalselt kahjuliku või manipuleeritud väljundi tuvastamine  

### **Tööriistamürgituse vältimine**

**Tööriista turvalisuse raamistik:**
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
- **Kinnituse töövood**: kasutaja selge nõusolek tööriista muudatuste jaoks  
- **Tagasipööramise võimalus**: võime kasutada varasemaid tööriista versioone  
- **Muudatuste audit**: täielik ajalugu tööriista definitsiooni muudatustest  
- **Riskihindamine**: tööriista turvasteisu automaatne hindamine  

## 5. **Segadust põhjustava asutaja rünnaku vältimine**

### **OAuth proxü turvalisus**

**Rünnakute vältimise kontrollid:**
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

**Rakendamise nõuded:**
- **Kasutaja nõusoleku kontroll**: dünaamiliste klientide registreerimisel ei tohi nõusoleku ekraane vahele jätta  
- **Redirect URI valideerimine**: rangelt musta nimekirja põhine kontroll suunamiskohtadele  
- **Autoriseerimiskoodi kaitse**: lühiajalised koodid ühe kasutuskorraga  
- **Kliendi identiteedi valideerimine**: tugev kontroll kliendi mandaadi ja metaandmete osas  

## 6. **Tööriistade täitmise turvalisus**

### **Hoonestamine ja isoleerimine**

**Konteineripõhine isoleerimine:**
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

**Protsesside isoleerimine:**
- **Eraldatud protsessikontekstid**: iga tööriista täitmine isoleeritud protsessiruumis  
- **Protsessidevaheline suhtlus**: turvalised IPC mehhanismid valideerimisega  
- **Protsessi jälgimine**: käitumise analüüs ja anomaaliate tuvastamine  
- **Resursside piiramine**: karmid piirangud CPU, mälu ja I/O kasutusele  

### **Vähima privileegiga prinsiiip**

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

**OWASP MCP risk lahendatud**: [MCP04 - Tarkvara tarneahela ründed ja sõltuvuste muutmine](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

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

### **Jätkuv jälgimine**

**Tarneahela ohu tuvastamine:**
- **Sõltuvuste tervise jälgimine**: pidev kõigi sõltuvuste turvaanalüüs  
- **Ohuinfo integreerimine**: reaalajas värskendused uute tarneahela ohtude kohta  
- **Käitumisanalüüs**: ebatavalise käitumise tuvastamine välises komponentides  
- **Automaatne reageerimine**: kompromiteeritud komponentide kiire piiramine  

## 8. **Jälgimis- ja tuvastuskontrollid**

**OWASP MCP risk lahendatud**: [MCP08 - Auditite ja telemeetri puudumine](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Turva info- ja sündmuste haldus (SIEM)**

**Põhjalik logimise strateegia:**
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

### **Reaalaja ohutuvas tuvastamine**

**Käitumisanalüütika:**
- **Kasutaja käitumise analüüs (UBA)**: ebatavaliste juurdepääsumustrite tuvastamine  
- **Üksuse käitumise analüüs (EBA)**: MCP serveri ja tööriistade käitumise jälgimine  
- **Masinõppega anomaaliate tuvastus**: tehisintellektil põhinev turvaohtude identifitseerimine  
- **Ohuinfo korrelatsioon**: vaadeldud tegevuste võrdlemine teadaolevate rünnakumustritega  

## 9. **Intsidentidele reageerimine ja taastumine**

### **Automaatne reageerimine**

**Kohesed reageerimistoimingud:**
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

### **Forensika võimekus**

**Uurimise tugi:**
- **Auditeitluse säilitamine**: muutumatu logimine krüptograafilise terviklikkusega  
- **Tõendite kogumine**: automatiseeritud turvaartefaktide kogumine  
- **Ajaskaala taastamine**: üksikasjalik sündmuste jada turvaintsidentideni  
- **Mõjuhinnang**: kompromisside ulatuse ja andmete lekkimise hindamine  

## **Olulised turvarhitektuuri põhimõtted**

### **Sügav kaitse**
- **Mitmekordsed turvakihtid**: turvarahust ei saa saada ainsat rikete punkti  
- **Redundantsts kontrollid**: ülekattev turvameetmete komplekt kriitilistele funktsioonidele  
- **Ohutud vaikimisi seaded**: turvaline vaikimisi seadistus vigade ja rünnakute korral  

### **Nullusaldus-printsiip**
- **Ära kunagi usalda, alati kontrolli**: pidev kõigi osapoolte ja päringute valideerimine  
- **Vähima privileegiga põhimõte**: minimaalne juurdepääs kõigile komponentidele  
- **Mikrosegmenteerimine**: detailne võrgutus ja juurdepääsu kontrollid  

### **Jätkuv turvalisuse areng**
- **Ohumaastiku kohandumine**: regulaarne värskendamine uute ohtude lahendamiseks  
- **Turvakontrollide efektiivsus**: pidev kontroll ja täiustamine  
- **Spetsifikatsiooni vastavus**: MCP turvastandardite arenguga kooskõlas olemine  

---

## **Rakendusressursid**

### **Ametlik MCP dokumentatsioon**
- [MCP spetsifikatsioon (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP turvalisuse parimad tavad](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP autoriseerimise spetsifikatsioon](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP turvavahendid**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) – põhjalik OWASP MCP Top 10 koos Azure rakendusjuhistega  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – ametlikud OWASP MCP turvariskid  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – praktiline turvakoolitus MCP jaoks Azure'is  

### **Microsofti turvalahendused**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Turvastandardid**
- [OAuth 2.0 turvalisuse parimad tavad (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 suurtele keelemudelitele](https://genai.owasp.org/)
- [NIST küberkaitse raamistik](https://www.nist.gov/cyberframework)

---

> **Oluline**: Need turvakontrollid peegeldavad kehtivat MCP spetsifikatsiooni (2025-11-25). Kontrollige alati uusimat [ametlikku dokumentatsiooni](https://spec.modelcontextprotocol.io/), kuna standardid arenevad kiiresti.

## Mis järgmiseks

- Tagasi: [Turvamooduli ülevaade](./README.md)
- Jätka: [Moodul 3: Algus](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->