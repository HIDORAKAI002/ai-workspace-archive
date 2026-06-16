# MCP saugumo kontrolės – 2026 m. vasario atnaujinimas

> **Dabartinis standartas**: Šis dokumentas atspindi [MCP specifikaciją 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) saugumo reikalavimus ir oficialias [MCP saugumo gerąsias praktikas](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Modelio konteksto protokolas (MCP) reikšmingai brandėjo, sustiprindamas saugumo kontrolės priemones, kurios apima tiek tradicinį programinės įrangos saugumą, tiek AI specifinius pavojus. Šis dokumentas pateikia visapusiškas saugumo kontroles saugioms MCP įgyvendinimo priemonėms, suderintoms su OWASP MCP Top 10 framework.

## 🏔️ Praktiniai saugumo mokymai

Norėdami gauti praktinės, aktyvios saugumo įgyvendinimo patirties, rekomenduojame **[MCP saugumo viršūnių seminarą (Sherpa)](https://azure-samples.github.io/sherpa/)** – išsamų vadovaujamą žygį, skirtą MCP serverių apsaugai Azure naudojant "pažeidžiamas → išnaudojimas → taisymas → patikrinimas" metodiką.

Visos šio dokumento saugumo kontrolės atitinka **[OWASP MCP Azure saugumo vadovą](https://microsoft.github.io/mcp-azure-security-guide/)**, kuris pateikia orientacines architektūras ir Azure specifines įgyvendinimo rekomendacijas OWASP MCP Top 10 rizikoms.

## **PRIVALOMI saugumo reikalavimai**

### **Kristalinės MCP specifikacijos draudimai:**

> **DRAUDŽIAMA**: MCP serveriai **NEGALI** priimti jokių žetonų, kurie nebuvo aiškiai išduoti MCP serveriui
>
> **DRAUDŽIAMA**: MCP serveriai **NEGALI** naudoti sesijų autentifikacijai  
>
> **PRIVALOMA**: MCP serveriai, įgyvendinantys autorizaciją, **PRIVALO** patikrinti VISUS įeinančius užklausimus
>
> **ĮSATORIU**: MCP tarpiniai serveriai, naudojantys statinius kliento ID, **PRIVALO** gauti vartotojo sutikimą kiekvienam dinamiškai registruotam klientui

---

## 1. **Autentifikacijos ir autorizacijos kontrolės**

### **Išorinių tapatybės teikėjų integracija**

**Dabartinis MCP standartas (2025-11-25)** leidžia MCP serveriams deleguoti autentifikaciją išoriniams tapatybės teikėjams, kas yra reikšmingas saugumo patobulinimas:

**Sprendžiama OWASP MCP rizika**: [MCP07 - Nepakankama autentifikacija ir autorizacija](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Saugumo naudos:**
1. **Pašalina individualios autentifikacijos rizikas**: sumažina pažeidžiamumo paviršių, vengiant pritaikytų autentifikacijos sprendimų
2. **Įmonių lygio saugumas**: pasinaudoja įtvirtintais tapatybės teikėjais, tokiais kaip Microsoft Entra ID, turinčiais pažangias saugumo funkcijas
3. **Centralizuotas tapatybės valdymas**: supaprastina vartotojų gyvenimo ciklo valdymą, prieigos kontrolę ir atitikties auditą
4. **Daugiaveiksnė autentifikacija**: paveldi MFA galimybes iš įmonių tapatybės tiekėjų
5. **Sąlyginės prieigos politikos**: nauda iš rizika pagrįstos prieigos kontrolės ir adaptuojamos autentifikacijos

**Įgyvendinimo reikalavimai:**
- **Žetono auditorijos patikrinimas**: patvirtinti, kad visi žetonai yra aiškiai išduoti MCP serveriui
- **Išduodančiojo patikrinimas**: patvirtinti, kad žetono išdavimo teikėjas atitinka numatytą tapatybės teikėją
- **Parašo patikrinimas**: kriptografinis žetono vientisumo patikrinimas
- **Galiojimo termino įgyvendinimas**: griežtas žetono galiojimo laikotarpio laikymasis
- **Sritis patikrinimas**: įsitikinti, kad žetonai turi tinkamas teises prašomoms operacijoms

### **Autorizacijos logikos saugumas**

**Kritinės kontrolės:**
- **Išsamūs autorizacijos audito patikrinimai**: reguliarios saugumo apžvalgos visose autorizacijos sprendimų vietose
- **Atsparios klaidoms numatytosios reikšmės**: drausti prieigą, jei autorizacijos logika negali priimti galutinio sprendimo
- **Leidimų ribos**: aiškus privilegijų lygių ir prieigos prie išteklių atskyrimas
- **Audito žurnalas**: pilnas visų autorizacijos sprendimų registravimas saugumo stebėjimui
- **Reguliarus prieigos patikrinimas**: periodinė vartotojų teisių ir privilegijų patvirtinimo peržiūra

## 2. **Žetonų saugumas ir "anti-passthrough" kontrolės**

**Sprendžiama OWASP MCP rizika**: [MCP01 - žetonų netinkamas valdymas ir slaptumo nutekėjimas](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Žetonų "passthrough" prevencija**

**Žetonų perduodamas "passthrough" naudojimas yra aiškiai draudžiamas** MCP autorizacijos specifikacijoje dėl kritinių saugumo rizikų:

**Sprendžiamos saugumo rizikos:**
- **Kontrolės apeinimas**: praleidžia esmines saugumo valdymo priemones, tokias kaip užklausų dažnio ribojimas, užklausų tikrinimas ir srauto stebėjimas
- **Atsakomybės praradimas**: trukdo identifikuoti klientą, ardydamas audito įrašus ir incidentų tyrimą
- **Tarpinio serverio naudojimas duomenų nutekinimui**: leidžia kenkėjiškiems asmenims naudoti serverius kaip proxy neteisėtai prieigai prie duomenų
- **Pasitikėjimo ribų pažeidimas**: pažeidžia tolesnių paslaugų pasitikėjimą žetonų kilme
- **Šoninis judėjimas**: kompromituoti žetonai leidžia plėsti atakas į daugiau paslaugų

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

### **Saugūs žetonų valdymo modeliai**

**Geriausios praktikos:**
- **Trumpalaikiai žetonai**: sumažina eksponavimo laiką dažnai keičiant žetonus
- **Tikslinė išdavimas**: žetonai išduodami tik specifinėms reikalingoms operacijoms
- **Saugus saugojimas**: naudokite aparatinius saugumo modulius (HSM) arba saugius raktų saugyklas
- **Žetonų susiejimas**: žetonai susiejami su konkrečiais klientais, sesijomis ar operacijomis, kai įmanoma
- **Stebėjimas ir perspėjimai**: realaus laiko žetonų netinkamo naudojimo ar neleistinų prieigos modelių aptikimas

## 3. **Sesijos saugumo kontrolės**

### **Sesijų grobimo prevencija**

**Sprendžiamos atakų kryptys:**
- **Sesijos grobimo "prompt" injekcija**: kenkėjiškų įvykių įterpimas į bendrą sesijos būseną
- **Sesijos apsimetinėjimas**: neteisėtas pavogtų sesijos ID naudojimas autentifikacijos apeitimui
- **Atnaujinamų srautų atakos**: serverio siunčiamų įvykių atnaujinimo išnaudojimas kenkėjiško turinio injekcijai

**Privalomos sesijos kontrolės:**
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
- **HTTPS privalomas**: visa sesijos komunikacija per TLS 1.3
- **Saugūs slapukų atributai**: HttpOnly, Secure, SameSite=Strict
- **Sertifikatų prisegimas**: kritinėms jungtims, norint išvengti MITM atakų

### **Valstybės priklausymas vs bevalstė sesija**

**Valstybės priklausomiems įgyvendinimams:**
- Bendra sesijos būsena reikalauja papildomos apsaugos nuo injekcijos atakų
- Eilių pagrindu valdoma sesija reikalauja vientisumo patikrinimo
- Daug kelių serverių reikalauja saugaus sesijos būsenos sinchronizavimo

**Bevalstėms įgyvendinimams:**
- JWT arba su žetonais valdomos sesijos
- Kriptografinis sesijos būsenos vientisumo tikrinimas
- Sumažintas atakų paviršius, bet reikalinga tvirta žetonų patikra

## 4. **AI specifinės saugumo kontrolės**

**Sprendžiamos OWASP MCP rizikos**:
- [MCP06 - Komandų srauto naikinimas](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Įrankių užnuodijimas](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Komandų injekcija ir vykdymas](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **"Prompt" injekcijos gynyba**

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
- **Įvesties sanitarizacija**: visų vartotojo įvedimų išsami validacija ir filtravimas
- **Turinio ribų apibrėžimas**: aiškus sisteminių instrukcijų ir vartotojo turinio atskyrimas
- **Instrukcijų hierarchija**: tinkamos pirmenybės taisyklės prieštaringoms instrukcijoms
- **Išėjimo stebėjimas**: galimai žalingų ar manipuliuotų rezultatų aptikimas

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

**Dinamiškas įrankių valdymas:**
- **Patvirtinimo procesai**: aiškus vartotojo sutikimas dėl įrankių pakeitimų
- **Atskaitomumo funkcijos**: galimybė grįžti prie ankstesnių įrankių versijų
- **Pakeitimų auditas**: pilna įrankių aprašymo modifikacijų istorija
- **Rizikos vertinimas**: automatinis įrankių saugumo vertinimas

## 5. **Sumaišytos tarpininko atakos prevencija**

### **OAuth tarpininko saugumas**

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
- **Vartotojo sutikimo patikrinimas**: niekada nepraleisti sutikimo ekranų dinamiškai klientų registracijai
- **Redirect URI validacija**: griežta juodųjų sąrašų pagrindu atliekama peradresavimo taškų patikra
- **Autorizacijos kodo apsauga**: trumpalaikiai kodai su vienkartinio naudojimo užtikrinimu
- **Kliento tapatybės patikra**: tvirta kliento kredencialų ir metaduomenų patikra

## 6. **Įrankių vykdymo saugumas**

### **Smėlio dėžės ir izoliacija**

**Konteinerinė izoliacija:**
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
- **Atskiri procesų kontekstai**: kiekvienas įrankio vykdymas atskiroje proceso erdvėje
- **Tarpprocesinė komunikacija**: saugūs IPC mechanizmai su patikrinimu
- **Procesų stebėjimas**: vykdymo elgsenos analizė ir anomalijų aptikimas
- **Išteklių valdymas**: griežtos CPU, atminties ir I/O operacijų ribos

### **Mažiausių privilegijų principo įgyvendinimas**

**Teisių valdymas:**
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

**Sprendžiama OWASP MCP rizika**: [MCP04 - Programinės įrangos tiekimo grandinės atakos ir priklausomybių klastojimas](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Priklausomybių patikrinimas**

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

### **Nuolatinis stebėjimas**

**Tiekimo grandinės grėsmių aptikimas:**
- **Priklausomybių būklės stebėjimas**: nuolatinė visų priklausomybių saugumo problemų vertinimas
- **Grėsmių žvalgybos integracija**: realaus laiko naujinimai apie kylančias tiekimo grandinės grėsmes
- **Elgsenos analizė**: neįprastos išorinės komponentų elgsenos aptikimas
- **Automatizuotas reagavimas**: nedelsiamas paveiktų komponentų apribojimas

## 8. **Stebėjimo ir aptikimo kontrolės**

**Sprendžiama OWASP MCP rizika**: [MCP08 - Audito ir telemetrijos stoka](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Saugumo informacijos ir įvykių valdymas (SIEM)**

**Išsami žurnalo strategija:**
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

### **Realaus laiko grėsmių aptikimas**

**Elgsenos analizė:**
- **Vartotojų elgesio analizė (UBA)**: neįprastų vartotojų prieigos modelių atpažinimas
- **Subjektų elgesio analizė (EBA)**: MCP serverio ir įrankių elgsenos stebėjimas
- **Mašininio mokymosi anomalijų aptikimas**: dirbtiniu intelektu pagrįstas saugumo grėsmių identifikavimas
- **Grėsmių žvalgybos koreliacija**: stebimų veiklų suderinimas su žinomais atakų modeliais

## 9. **Incidentų valdymas ir atkūrimas**

### **Automatizuotas reagavimas**

**Momentiniai reagavimo veiksmai:**
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

### **Teisėsaugos galimybės**

**Tyrimų palaikymas:**
- **Audito įrašų išsaugojimas**: nekintami žurnalai su kriptografine vientisumo apsauga
- **Įrodymų surinkimas**: automatinis susijusių saugumo įrašų rinkimas
- **Įvykių laiko sekos rekonstrukcija**: detali įvykių, vedusių prie incidentų, seka
- **Poveikio vertinimas**: kompromiso masto ir duomenų nutekėjimo įvertinimas

## **Pagrindinės saugumo architektūros principai**

### **Gilusis gynybos sluoksnis**
- **Keli saugumo sluoksniai**: nėra vienos kritinės saugumo architektūros dalies gedimo taško
- **Redundantinės kontrolės**: persidengiančios saugumo priemonės kritinėms funkcijoms
- **Atsparios klaidoms mechanizmai**: saugios numatytos reikšmės klystant sistemoms ar patiriant atakus

### **Nulinio pasitikėjimo įgyvendinimas**
- **Niekada nepasitikėti, visada tikrinti**: nuolatinis visų subjektų ir užklausų patikrinimas
- **Mažiausių privilegijų principas**: minimalios prieigos teisės visiems komponentams
- **Mikrosegmentacija**: smulkios tinklo ir prieigos kontrolės

### **Nuolatinis saugumo tobulėjimas**
- **Prisitaikymas prie grėsmių kraštovaizdžio**: reguliarūs atnaujinimai siekiant kovoti su naujomis grėsmėmis
- **Saugumo kontrolės efektyvumo vertinimas**: nuolatinis kontrolės priemonių vertinimas ir tobulinimas
- **Specifikacijos laikymasis**: atitikimas tobulėjantiems MCP saugumo standartams

---

## **Įgyvendinimo ištekliai**

### **Oficiali MCP dokumentacija**
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP saugumo gerosios praktikos](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP autorizacijos specifikacija](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP saugumo ištekliai**
- [OWASP MCP Azure saugumo vadovas](https://microsoft.github.io/mcp-azure-security-guide/) – išsamus OWASP MCP Top 10 su Azure įgyvendinimu
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – oficialios OWASP MCP saugumo rizikos
- [MCP saugumo viršūnių seminaras (Sherpa)](https://azure-samples.github.io/sherpa/) – praktiniai saugumo mokymai MCP Azure aplinkoje

### **Microsoft saugumo sprendimai**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub pažangus saugumas](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Saugumo standartai**
- [OAuth 2.0 saugumo gerosios praktikos (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 dideliems kalbiniams modeliams](https://genai.owasp.org/)
- [NIST kibernetinio saugumo framework](https://www.nist.gov/cyberframework)

---

> **Svarbu**: Šios saugumo kontrolės atspindi dabartinę MCP specifikaciją (2025-11-25). Visada tikrinkite naujausią [oficialią dokumentaciją](https://spec.modelcontextprotocol.io/), nes standartai sparčiai keičiasi.

## Kas toliau

- Grįžti į: [Saugumo modulio apžvalga](./README.md)
- Toliau į: [3 modulis: pradžia](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->