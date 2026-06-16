# MCP Sigurnosne Kontrole - Ažuriranje za veljaču 2026.

> **Trenutni standard**: Ovaj dokument odražava sigurnosne zahtjeve [MCP specifikacije 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) i službene [MCP sigurnosne najbolje prakse](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) značajno je napredovao s poboljšanim sigurnosnim kontrolama koje se bave tradicionalnom sigurnošću softvera i prijetnjama specifičnim za umjetnu inteligenciju. Ovaj dokument pruža sveobuhvatne sigurnosne kontrole za sigurne implementacije MCP-a usklađene s OWASP MCP Top 10 okvirom.

## 🏔️ Praktična Sigurnosna Obuka

Za praktično iskustvo implementacije sigurnosti, preporučujemo **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - sveobuhvatnu vođenu ekspediciju za osiguranje MCP poslužitelja u Azureu koristeći metodologiju "ranjiv → iskoristi → popravi → potvrdi".

Sve sigurnosne kontrole u ovom dokumentu usklađene su s **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** koja pruža referentne arhitekture i smjernice za implementaciju specifične za Azure za OWASP MCP Top 10 rizike.

## **OBVEZNI Sigurnosni Zahtjevi**

### **Kritične zabrane prema MCP specifikaciji:**

> **ZABRANJENO**: MCP poslužitelji **NE SMIJU** prihvaćati bilo koje tokene koji nisu izričito izdani za MCP poslužitelj  
>
> **ZABRANJENO**: MCP poslužitelji **NE SMIJU** koristiti sesije za autentikaciju  
>
> **OBAVEZNO**: MCP poslužitelji koji provode autorizaciju **MORAJU** verificirati SVE dolazne zahtjeve  
>
> **OBAVEZNO**: MCP proxy poslužitelji koji koriste statične ID klijenata **MORAJU** dobiti pristanak korisnika za svakog dinamički registriranog klijenta

---

## 1. **Kontrole Autentikacije i Autorizacije**

### **Integracija Vanjskog Davatelja Identiteta**

**Trenutni MCP standard (2025-11-25)** omogućuje MCP poslužiteljima da delegiraju autentikaciju vanjskim davateljima identiteta, što predstavlja značajan sigurnosni napredak:

**Rizik OWASP MCP pokriven**: [MCP07 - Nedostatna autentikacija i autorizacija](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Sigurnosne prednosti:**
1. **Eliminira rizike prilagođene autentikacije**: Smanjuje ranjivosti izbjegavanjem prilagođenih implementacija autentikacije  
2. **Sigurnost na razini poduzeća**: Iskorištava etablirane davatelje identiteta poput Microsoft Entra ID s naprednim sigurnosnim značajkama  
3. **Centralizirano upravljanje identitetom**: Pojednostavljuje upravljanje životnim ciklusom korisnika, kontrolu pristupa i reviziju usklađenosti  
4. **Višefaktorska autentikacija**: Nasljeđuje MFA mogućnosti od davatelja identiteta poduzeća  
5. **Uvjete pristupa**: Koristi kontrole pristupa temeljene na riziku i adaptivnu autentikaciju  

**Zahtjevi implementacije:**
- **Provjera publike tokena**: Provjeriti da su svi tokeni izričito izdani za MCP poslužitelj  
- **Verifikacija izdavatelja**: Validirati da izdavatelj tokena odgovara očekivanom davatelju identiteta  
- **Potvrda potpisa**: Kriptografska validacija integriteta tokena  
- **Primjena isteka**: Strogo provođenje trajanja vrijednosti tokena  
- **Provjera opsega**: Osigurati da tokeni sadrže odgovarajuće dozvole za tražene operacije  

### **Sigurnost Autorizacijske Logike**

**Kritične kontrole:**
- **Sveobuhvatne autorizacijske revizije**: Redoviti sigurnosni pregledi svih autorizacijskih odluka  
- **Sigurni zadani pristup**: Odbijanje pristupa kada autorizacijska logika ne može donijeti konačnu odluku  
- **Granice dozvola**: Jasna separacija između različitih razina privilegija i pristupa resursima  
- **Evidentiranje revizija**: Potpuno evidentiranje svih autorizacijskih odluka za sigurnosni nadzor  
- **Redovite provjere pristupa**: Periodična validacija korisničkih dozvola i dodjela privilegija  

## 2. **Sigurnost Tokena i Kontrole protiv Prosljeđivanja**

**Rizik OWASP MCP pokriven**: [MCP01 - Pogrešno upravljanje tokenima i izlaganje tajni](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Sprječavanje Prosljeđivanja Tokena**

**Prosljeđivanje tokena je izričito zabranjeno** u MCP specifikaciji za autorizaciju zbog kritičnih sigurnosnih rizika:

**Sigurnosni rizici:**
- **Zaobilaženje kontrole**: Zaobilazi ključne sigurnosne kontrole kao što su ograničenje stope, validacija zahtjeva i nadzor prometa  
- **Raskid odgovornosti**: Onemogućuje identifikaciju klijenta, narušavajući trag revizije i istrage incidenata  
- **Izvoz podataka putem proxyja**: Omogućuje zlonamjernim akterima korištenje poslužitelja kao proxyja za neovlašteni pristup podacima  
- **Kršenje povjerenja**: Krši pretpostavke usluga niže razine o podrijetlu tokena  
- **Lateralni pomak**: Kompromitirani tokeni na više usluga omogućuju širenje napada  

**Kontrole implementacije:**
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

### **Sigurni obrasci upravljanja tokenima**

**Najbolje prakse:**
- **Kratkotrajni tokeni**: Minimalizirati prozor izloženosti čestom rotiranjem tokena  
- **Izdavanje točno na vrijeme**: Izdavati tokene samo kad su potrebni za određene operacije  
- **Sigurno pohranjivanje**: Koristiti module za hardversku sigurnost (HSM) ili sigurne spremišta ključeva  
- **Vezu tokena**: Povezati tokene s određenim klijentima, sesijama ili operacijama gdje je moguće  
- **Nadzor i upozorenja**: Detekcija zloupotrebe tokena ili neovlaštenih pristupa u stvarnom vremenu  

## 3. **Kontrole Sigurnosti Sesije**

### **Sprječavanje Preuzimanja Sesije**

**Napadački vektori:**
- **Ubacivanje prompta za preuzimanje sesije**: Zlonamjerne radnje ubačene u zajedničko stanje sesije  
- **Impersonacija sesije**: Neovlaštena upotreba ukradenih ID-eva sesije za zaobilaženje autentikacije  
- **Napadi na nastavak streama**: Eksploatacija nastavka server-sent događaja za ubacivanje zlonamjernog sadržaja  

**Obvezne kontrole sesije:**
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

**Sigurnost prijenosa:**
- **Primjena HTTPS-a**: Sve sesijske komunikacije preko TLS 1.3  
- **Sigurne atribute kolačića**: HttpOnly, Secure, SameSite=Strict  
- **Pinning certifikata**: Za kritične veze kako bi se spriječili MITM napadi  

### **Razmatranja za Stateful i Stateless pristupe**

**Za implementacije sa stanjem:**
- Dijeljeno stanje sesije zahtijeva dodatnu zaštitu od injekcijskih napada  
- Upravljanje sesijama temeljeno na redovima zahtijeva provjeru integriteta  
- Višestruke instance poslužitelja zahtijevaju sigurnu sinkronizaciju stanja sesije  

**Za implementacije bez stanja:**
- Upravljanje sesijama temeljenim na JWT ili sličnim tokenima  
- Kriptografska provjera integriteta stanja sesije  
- Smanjen površinski napad ali zahtijeva robusnu validaciju tokena  

## 4. **Sigurnosne Kontrole Specifične za AI**

**OWASP MCP rizici pokriveni**:
- [MCP06 - Subverzija toka upita](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Trovanje alata](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Umetanje i izvršavanje naredbi](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Obrana od Prompt Injection**

**Integracija Microsoft Prompt Shields:**
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

**Kontrole implementacije:**
- **Sanitizacija unosa**: Sveobuhvatna validacija i filtriranje svih korisničkih unosa  
- **Definiranje granica sadržaja**: Jasna separacija između sistemskih uputa i korisničkog sadržaja  
- **Hijerarhija uputa**: Pravilna pravila prioriteta za sukobljene upute  
- **Nadzor izlaza**: Detekcija potencijalno štetnih ili manipuliranih izlaza  

### **Sprječavanje Trovanja Alata**

**Sigurnosni okvir za alate:**
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

**Dinamičko upravljanje alatima:**
- **Tokovi odobrenja**: Izričit pristanak korisnika za izmjene alata  
- **Mogućnosti povrata**: Sposobnost vraćanja na prethodne verzije alata  
- **Revizija promjena**: Potpuna povijest izmjena definicija alata  
- **Procjena rizika**: Automatizirana evaluacija sigurnosnog stanja alata  

## 5. **Sprječavanje Napada Confused Deputy**

### **Sigurnost OAuth Proxyja**

**Kontrole za sprječavanje napada:**
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

**Zahtjevi implementacije:**
- **Provjera pristanka korisnika**: Nikada ne preskakati zaslone pristanka za dinamičku registraciju klijenta  
- **Validacija URI-a preusmjeravanja**: Stroga validacija na temelju bijelog popisa destinacija preusmjeravanja  
- **Zaštita autorizacijskog koda**: Kratkotrajni kodovi s primjenom jednokratne upotrebe  
- **Provjera identiteta klijenta**: Robusna validacija vjerodajnica i metapodataka klijenta  

## 6. **Sigurnost Izvršavanja Alata**

### **Sandboxing i Izolacija**

**Izolacija temeljena na kontejnerima:**
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
  
**Izolacija procesa:**
- **Odvojeni konteksti procesa**: Svako izvršavanje alata u izoliranom procesnom prostoru  
- **Međuprocesna komunikacija**: Sigurni IPC mehanizmi s validacijom  
- **Praćenje procesa**: Analiza ponašanja u izvođenju i detekcija anomalija  
- **Primjena ograničenja resursa**: Stroga ograničenja CPU-a, memorije i I/O operacija  

### **Implementacija Najmanjih Povlastica**

**Upravljanje dozvolama:**
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

## 7. **Kontrole Sigurnosti Opskrbnog Lanca**

**Rizik OWASP MCP pokriven**: [MCP04 - Napadi na opskrbni lanac softvera i manipulacija ovisnostima](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Verifikacija Ovisnosti**

**Sveobuhvatna sigurnost komponenti:**
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

### **Kontinuirani nadzor**

**Detekcija prijetnji opskrbnom lancu:**
- **Praćenje zdravlja ovisnosti**: Kontinuirana procjena svih ovisnosti radi sigurnosnih problema  
- **Integracija obavještavanja o prijetnjama**: Ažuriranja u stvarnom vremenu o novim prijetnjama opskrbnog lanca  
- **Analiza ponašanja**: Detekcija neuobičajenog ponašanja u vanjskim komponentama  
- **Automatizirani odgovor**: Trenutno suzbijanje kompromitiranih komponenti  

## 8. **Kontrole Nadzora i Detekcije**

**Rizik OWASP MCP pokriven**: [MCP08 - Nedostatak revizije i telemetrije](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Sustav upravljanja informacijama o sigurnosti i događajima (SIEM)**

**Sveobuhvatna strategija evidentiranja:**
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

### **Detekcija prijetnji u stvarnom vremenu**

**Analitika ponašanja:**
- **Analitika ponašanja korisnika (UBA)**: Detekcija neuobičajenih obrazaca pristupa korisnika  
- **Analitika ponašanja entiteta (EBA)**: Praćenje ponašanja MCP poslužitelja i alata  
- **Detekcija anomalija pomoću strojnog učenja**: AI-potpomognuta identifikacija sigurnosnih prijetnji  
- **Korelacija obavještajnih podataka o prijetnjama**: Usporedba opaženih aktivnosti s poznatim obrascima napada  

## 9. **Odgovor na incidente i oporavak**

### **Automatizirane sposobnosti odgovora**

**Akcije neposrednog odgovora:**
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

### **Forenzičke mogućnosti**

**Podrška istrazi:**
- **Čuvanje revizijskih tragova**: Neizmjenjivo evidentiranje s kriptografskom integritetom  
- **Prikupljanje dokaza**: Automatizirano prikupljanje relevantnih sigurnosnih artefakata  
- **Rekonstrukcija vremenske linije**: Detaljan slijed događaja koji vode do sigurnosnih incidenata  
- **Procjena utjecaja**: Evaluacija opsega kompromisa i izloženosti podataka  

## **Ključna načela sigurnosne arhitekture**

### **Odbrana u dubini**
- **Višeslojna sigurnost**: Nema jedinstvene točke otkaza u sigurnosnoj arhitekturi  
- **Redundantne kontrole**: Preklapajuće sigurnosne mjere za kritične funkcije  
- **Mehanizmi fail-safe**: Sigurni zadani postavke kada sustavi naiđu na pogreške ili napade  

### **Implementacija Zero Trust**
- **Nikada ne vjeruj, uvijek provjeri**: Kontinuirana validacija svih entiteta i zahtjeva  
- **Načelo najmanjih privilegija**: Minimalna prava pristupa za sve komponente  
- **Mikrosegmentacija**: Granularne mrežne i kontrole pristupa  

### **Kontinuirani razvoj sigurnosti**
- **Prilagodba krajoliku prijetnji**: Redovita ažuriranja za rješavanje novih prijetnji  
- **Učinkovitost sigurnosnih kontrola**: Trajna evaluacija i poboljšanje kontrola  
- **Usklađenost sa specifikacijom**: Usklađenost s razvojem MCP sigurnosnih standarda  

---

## **Resursi za implementaciju**

### **Službena MCP dokumentacija**
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP sigurnosne najbolje prakse](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP specifikacija autorizacije](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP sigurnosni resursi**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Sveobuhvatni OWASP MCP Top 10 s Azure implementacijom  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Službeni OWASP MCP sigurnosni rizici  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktična sigurnosna obuka za MCP na Azureu  

### **Microsoft sigurnosna rješenja**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Sigurnosni standardi**
- [OAuth 2.0 sigurnosne najbolje prakse (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 za velike jezične modele](https://genai.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **Važno**: Ove sigurnosne kontrole odražavaju trenutnu MCP specifikaciju (2025-11-25). Uvijek provjerite najnoviju [službenu dokumentaciju](https://spec.modelcontextprotocol.io/) jer se standardi brzo razvijaju.

## Što slijedi

- Povratak na: [Pregled sigurnosnog modula](./README.md)
- Nastavak na: [Modul 3: Početak rada](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->