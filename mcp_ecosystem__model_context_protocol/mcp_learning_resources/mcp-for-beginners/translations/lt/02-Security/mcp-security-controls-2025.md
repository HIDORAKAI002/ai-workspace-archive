# MCP saugumo kontrolės - 2026 m. vasario atnaujinimas

> **Dabartinis standartas**: Šis dokumentas atspindi [MCP specifikaciją 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) saugumo reikalavimus ir oficialias [MCP saugumo geriausias praktikas](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Modelio konteksto protokolas (MCP) žymiai patobulėjo, pritaikant sustiprintas saugumo kontroles, apimančias tiek tradicinį programinės įrangos saugumą, tiek dirbtinio intelekto specifines grėsmes. Šis dokumentas pateikia išsamias saugumo controles saugioms MCP įgyvendinimo priemonėms, suderintas su OWASP MCP Top 10 sistema.

## 🏔️ Praktiniai saugumo mokymai

Dėl praktinės, tiesioginės saugumo įgyvendinimo patirties rekomenduojame **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** – išsamų vadovu pagrįstą žygį, skirtą apsaugoti MCP serverius Azure debesyje, naudojant „pažeidžiamumas → išnaudojimas → ištaisymas → patvirtinimas“ metodiką.

Visos šioje dokumentacijoje nurodytos saugumo kontrolės atitinka **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, kuri pateikia nuorodines architektūras ir Azure specifinius įgyvendinimo nurodymus OWASP MCP Top 10 rizikoms.

## **PRIVALOMI saugumo reikalavimai**

### **Kritiniai draudimai pagal MCP specifikaciją:**

> **DRAUDŽIAMA**: MCP serveriai **NETURI** priimti jokių žetonų, kurie nėra aiškiai išduoti MCP serveriui  
>  
> **DRAUDŽIAMA**: MCP serveriai **NETURI** naudoti sesijų autentifikacijai  
>  
> **REIKALINGA**: MCP serveriai, įgyvendinantys autorizaciją, **TURI** patikrinti VISUS įeinančius užklausimus  
>  
> **PRIVALOMA**: MCP tarpiniai serveriai, naudojantys statinius kliento ID, **TURI** gauti vartotojo sutikimą kiekvienam dinamiškai registruotam klientui

---

## 1. **Autentifikacijos ir autorizacijos kontrolės**

### **Išorinių tapatybės tiekėjų integracija**

**Dabartinis MCP standartas (2025-11-25)** leidžia MCP serveriams deleguoti autentifikaciją išoriniams tapatybės tiekėjams, tai žymus saugumo patobulinimas:

**Sprendžiama OWASP MCP rizika**: [MCP07 - Nepakankama autentifikacija ir autorizacija](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Saugumo privalumai:**
1. **Pašalina nestandartinių autentifikacijų rizikas**: sumažina pažeidžiamumo plotą vengiant nestandartinių autentifikacijos sprendimų
2. **Įmonių lygio saugumas**: naudojasi gerai žinomais tapatybės tiekėjais, pvz., Microsoft Entra ID, su pažangiomis saugumo funkcijomis
3. **Centralizuotas tapatybės valdymas**: paprastesnis vartotojų gyvenimo ciklo valdymas, prieigos kontrolė ir atitikties auditas
4. **Daugiakomponentė autentifikacija**: paveldi MFA galimybes iš įmonių tapatybės tiekėjų
5. **Sąlyginių prieigos politikų palaikymas**: nauda iš rizika grindžiamų prieigos kontrolės ir adaptuotos autentifikacijos

**Įgyvendinimo reikalavimai:**
- **Žetono auditorijos patikra**: patikrinti, ar visi žetonai yra aiškiai išduoti MCP serveriui
- **Išdavėjo patikra**: patikrinti, ar žetono išdavėjas atitinka tikėtiną tapatybės tiekėją
- **Parašo patikra**: kriptografinė žetono vientisumo validacija
- **Galiojimo pabaigos laikymasis**: griežtas žetono galiojimo laikotarpio ribojimas
- **Aprėpties patikra**: užtikrinti, kad žetonai turi tinkamas teises prašomoms operacijoms

### **Autorizacijos logikos saugumas**

**Kritinės kontrolės:**
- **Išsamios autorizacijos audito apžvalgos**: reguliarios saugumo apžvalgos dėl visų autorizacijos sprendimų taškų
- **Atsparios gedimams numatytosios reikšmės**: neleidžiama prieiga, jei autorizacijos logika negali priimti aiškaus sprendimo
- **Leidimų ribos**: aiškus privilegijų lygių ir išteklių prieigos atskyrimas
- **Audito registravimas**: visi autorizacijos sprendimai pilnai registruojami saugumo stebėsenai
- **Reguliarios prieigos peržiūros**: periodiška vartotojų teisių ir privilegijų patikra

## 2. **Žetonų saugumas ir anti-praėjimo kontrolės**

**Sprendžiama OWASP MCP rizika**: [MCP01 - Žetonų valdymo klaidos ir slaptumo atskleidimas](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Žetonų praėjimo užkirtimas**

**Žetonų praėjimas yra aiškiai draudžiamas** MCP autorizacijos specifikacijoje dėl kritinių saugumo rizikų:

**Sprendžiamos saugumo rizikos:**
- **Kontrolės apėjimas**: apeina esmines saugumo kontrolės priemones, tokias kaip užklausų dažnio ribojimas, užklausų validacija ir srauto stebėjimas
- **Atsakomybės žlugimas**: kliudo klientų identifikaciją, pažeidžia audito įrašų vientisumą ir incidentų tyrimą
- **Tarpinio serverio duomenų nutekėjimas**: leidžia kenkėjiškiems veikėjams naudoti serverius kaip tarpininkus neautorizuotam duomenų pasiekimui
- **Pasitikėjimo ribų pažeidimai**: laužo žemyninių paslaugų pasitikėjimo tokenų šaltiniais prielaidas
- **Šoninė judėjimo galimybė**: kompromituoti tokenai keliuose serveriuose leidžia platesnę atakos sklaidą

**Įgyvendinimo kontrolės:**  
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
  
### **Saugios žetonų valdymo schemos**

**Geriausios praktikos:**
- **Trumpalaikiai žetonai**: sumažina atskleidimo langą dažnu žetonų keitimu
- **Būtent poreikiu išdavimas**: žetonai išduodami tik reikalingoms operacijoms
- **Saugaus saugojimo sprendimai**: naudojami aparatinės saugos moduliai (HSM) arba saugūs raktų skyriai
- **Žetonų susiejimas**: kai įmanoma, žetonai yra susieti su konkrečiais klientais, sesijomis ar operacijomis
- **Stebėsena ir įspėjimai**: realaus laiko žetonų piktnaudžiavimo ar neautorizuoto prieigos modelių nustatymas

## 3. **Sesijų saugumo kontrolės**

### **Sesijų pagrobimo užkirtimas**

**Sprendžiami atakos būdai:**
- **Sesijų pagrobimo įvedimo atakos**: kenkėjiški įvykiai suleidžiami į bendrą sesijos būseną
- **Sesijos apsimetimas**: neautorizuotas pavogtų sesijos ID naudojimas autentifikacijai apeiti
- **Tęstiniai duomenų srauto atakos**: naudojant serverio siunčiamų įvykių tęstinumą kenkėjiškam turinio įvedimui

**Privalomos sesijų kontrolės:**  
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
  
**Transporto saugumas:**  
- **HTTPS taikymas**: visa sesijos komunikacija per TLS 1.3  
- **Saugūs slapukai**: HttpOnly, Secure, SameSite=Strict atributai  
- **Sertifikatų pririšimas**: kritinėms jungtims apsaugai nuo MITM atakų  

### **Valstybės (stateful) ir bevalstės (stateless) svarstymai**

**Valstybės diegimams:**
- Bendros sesijos būsenos apsauga nuo įvedimo atakų
- Eilių pagrindu valdomų sesijų vientisumo tikrinimas
- Kelios serverių instancijos reikalauja saugaus sesijos būsenos sinchronizavimo

**Bevalstės diegimams:**
- Sesijų valdymas su JWT ar panašiais tokenais
- Kriptografinė sesijos būsenos vientisumo validacija
- Mažesnis atakos paviršius, bet reikalingas tvirtas žetonų patikrinimas

## 4. **Dirbtinio intelekto specifinės saugumo kontrolės**

**Sprendžiamos OWASP MCP rizikos**:  
- [MCP06 - Prompt injekcija per kontekstinius duomenis](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Įrankių užnuodijimas](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Komandų injekcija ir vykdymas](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)  

### **Prompt injekcijos apsauga**

**Microsoft Prompt Shields integracija:**  
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
  
**Įgyvendinimo kontrolės:**  
- **Įvesties sanitarizavimas**: išsami visų vartotojų įvesties validacija ir filtravimas  
- **Turinio ribų apibrėžimas**: aiški sistema instruksijų ir vartotojo turinio atskirtis  
- **Instrukcijų hierarchija**: tinkamos prioritetų taisyklės konfliktinėms instrukcijoms  
- **Išvesties stebėsena**: potencialiai pavojingo ar manipuliuoto turinio nustatymas  

### **Įrankių užnuodijimo prevencija**

**Įrankių saugumo sistema:**  
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
  
**Dinaminis įrankių valdymas:**  
- **Patvirtinimo procesai**: aiškūs vartotojo sutikimo prašymai įrankių keitimams  
- **Sukčiavimo atstatymo galimybės**: galimybė grįžti prie ankstesnių įrankių versijų  
- **Klaidų auditas**: pilna įrankių apibrėžimų istorija  
- **Rizikos vertinimas**: automatinis įrankių saugumo būklės vertinimas  

## 5. **Sumaišyto tarpininko atakos užkirtimas**

### **OAuth tarpinio serverio saugumas**

**Atakų prevencijos kontrolės:**  
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
  
**Įgyvendinimo reikalavimai:**  
- **Vartotojo sutikimo patikra**: niekada nepraleisti sutikimo ekranų dinaminės kliento registracijos metu  
- **Redirect URI patikra**: griežtas leidžiamų nukreipimų sąrašo tikrinimas  
- **Autorizacijos kodo apsauga**: trumpalaikiai kodai su vienkartiniu naudojimu  
- **Kliento tapatybės patikra**: tvirtas kliento kredencialų ir metaduomenų validavimas  

## 6. **Įrankių vykdymo saugumas**

### **Dėžutės ir izoliacija**

**Konteinerių pagrindu veikiančios izoliacijos:**  
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
  
**Procesų izoliacija:**  
- **Atskiri procesų kontekstai**: kiekvienas įrankio vykdymas atskirame procese  
- **Procesų tarpusavio komunikacija**: saugūs IPC mechanizmai su validacija  
- **Procesų stebėsena**: vykdymo elgsenos analizė ir anomalijų aptikimas  
- **Išteklių valdymas**: griežtos CPU, atminties ir I/O operacijų ribos  

### **Minimalios privilegijos taikymas**

**Leidimų valdymas:**  
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
  
## 7. **Tiekimo grandinės saugumo kontrolės**

**Sprendžiama OWASP MCP rizika**: [MCP04 - Tiekimo grandinės atakos](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Priklausomybių tikrinimas**

**Išsamus komponentų saugumas:**  
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
  
### **Nuolatinė stebėsena**

**Tiekimo grandinės grėsmių nustatymas:**  
- **Priklausomybių būklės stebėsena**: nuolatinė visų priklausomybių saugumo būklės kontrolė  
- **Grėsmių žvalgybos integracija**: realaus laiko naujinimai apie atsirandančias tiekimo grandinės grėsmes  
- **Elgsenos analizė**: neįprastos elgsenos nustatymas išoriniuose komponentuose  
- **Automatinis reagavimas**: neatidėliotinas kompromituotų komponentų sulaikymas  

## 8. **Stebėjimo ir aptikimo kontrolės**

**Sprendžiama OWASP MCP rizika**: [MCP08 - Audito ir telemetrinių duomenų trūkumas](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Saugumo informacijos ir įvykių valdymas (SIEM)**

**Išsami registravimo strategija:**  
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
  
### **Realiojo laiko grėsmių aptikimas**

**Elgesio analizė:**  
- **Vartotojų elgesio analizė (UBA)**: neįprastų vartotojų prieigos modelių nustatymas  
- **Objektų elgesio analizė (EBA)**: MCP serverio ir įrankių elgesio stebėsena  
- **Mašininio mokymosi anomalijų aptikimas**: DI pagrindu identifikuojamų saugumo grėsmių nustatymas  
- **Grėsmių žvalgybos koreliacija**: stebimų veiklų suderinimas su žinomais atakų modeliais  

## 9. **Incidentų valdymas ir atkūrimas**

### **Automatinio reagavimo galimybės**

**Skubūs atsako veiksmai:**  
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
  
### **Teisinių tyrimų galimybės**

**Tyrimų palaikymas:**  
- **Audito takų išlaikymas**: nekintamas registravimas su kriptografinės vientisumo apsauga  
- **Įrodymų rinkimas**: automatinis saugos artefaktų surinkimas  
- **Įvykių laiko juostos rekonstrukcija**: detali įvykių seka, vedanti prie saugumo incidentų  
- **Poveikio vertinimas**: kompromitacijos masto ir duomenų nutekėjimo analizė  

## **Pagrindinės saugumo architektūros principai**

### **Gynyba daugeliu sluoksnių**  
- **Keli saugumo sluoksniai**: nėra vieno gedimo taško saugumo architektūroje  
- **Dubliuotos kontrolės**: kritinių funkcijų saugumo priemonių persidengimas  
- **Atsparios gedimams mechanizmai**: saugūs numatytieji nustatymai sistemos klaidų ar atakų atveju  

### **Nulinio pasitikėjimo paradigma**  
- **Niekada nepasitikėti, visada tikrinti**: nuolatinė visų subjektų ir užklausų validacija  
- **Minimalios privilegijos principas**: visų komponentų prieigos teisės minimalios  
- **Mikrosegmentacija**: smulkios tinklo ir prieigos kontrolės  

### **Nuolatinė saugumo evoliucija**  
- **Grėsmių kraštovaizdžio adaptacija**: reguliariai atnaujinama, kad būtų sprendžiamos naujos grėsmės  
- **Saugumo kontrolės efektyvumas**: nuolatinis kontrolės priemonių vertinimas ir tobulinimas  
- **Atitikimas specifikacijoms**: sutapimas su besikeičiančiais MCP saugumo standartais  

---

## **Įgyvendinimo ištekliai**

### **Oficiali MCP dokumentacija**  
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP saugumo geriausios praktikos](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP autorizacijos specifikacija](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  

### **OWASP MCP saugumo ištekliai**  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) – Išsamus OWASP MCP Top 10 su Azure įgyvendinimu  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Oficialios OWASP MCP saugumo rizikos  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – Praktiniai saugumo mokymai MCP Azure aplinkoje  

### **Microsoft saugumo sprendimai**  
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)  

### **Saugumo standartai**  
- [OAuth 2.0 saugumo geriausios praktikos (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 didelėms kalbos modeliams](https://genai.owasp.org/)  
- [NIST kibernetinio saugumo sistema](https://www.nist.gov/cyberframework)  

---

> **Svarbu**: Šios saugumo kontrolės atitinka dabartinę MCP specifikaciją (2025-11-25). Visada tikrinkite naujausią [oficialią dokumentaciją](https://spec.modelcontextprotocol.io/), nes standartai sparčiai keičiasi.

## Kas toliau

- Grįžti į: [Saugumo modulio apžvalgą](./README.md)
- Tęsti į: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatizuoti vertimai gali turėti klaidų ar netikslumų. Pirminis dokumentas jo gimtąja kalba turi būti laikomas autoritetingu šaltiniu. Kritinei informacijai rekomenduojama pasitelkti profesionalų žmogaus vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingus interpretavimus, kilusius dėl šio vertimo naudojimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->