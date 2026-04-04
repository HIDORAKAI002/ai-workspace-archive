# MCP Sigurnosne Kontrole - Ažuriranje za veljaču 2026.

> **Trenutni Standard**: Ovaj dokument odražava sigurnosne zahtjeve [MCP specifikacije 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) i službene [MCP Sigurnosne Najbolje Prakse](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) je značajno napredovao s poboljšanim sigurnosnim kontrolama koje pokrivaju i tradicionalnu softversku sigurnost i prijetnje specifične za AI. Ovaj dokument pruža sveobuhvatne sigurnosne kontrole za sigurne MCP implementacije usklađene s OWASP MCP Top 10 okvirom.

## 🏔️ Praktična Sigurnosna Obuka

Za praktično iskustvo implementacije sigurnosti, preporučujemo **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - sveobuhvatna vođena ekspedicija za osiguranje MCP servera u Azureu koristeći metodologiju "ranjiv → eksploatacija → popravak → validacija".

Sve sigurnosne kontrole u ovom dokumentu usklađene su s **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, koja pruža referentne arhitekture i smjernice za implementaciju specifične za Azure za OWASP MCP Top 10 rizike.

## **OBAVEZNI Sigurnosni Zahtjevi**

### **Kritične zabrane iz MCP specifikacije:**

> **ZABRANJENO**: MCP serveri **NIKADA NE SMIJU** prihvatiti tokene koji nisu eksplicitno izdani za MCP server  
>
> **ZABRANJENO**: MCP serveri **NIKADA NE SMIJU** koristiti sesije za autentifikaciju  
>
> **OBAVEZNO**: MCP serveri koji implementiraju autorizaciju **MORAJU** provjeriti SVE dolazne zahtjeve  
>
> **OBAVEZNO**: MCP proxy serveri koji koriste statičke ID-e klijenata **MORAJU** dobiti pristanak korisnika za svakog dinamički registriranog klijenta

---

## 1. **Kontrole Autentifikacije i Autorizacije**

### **Integracija vanjskog pružatelja identiteta**

**Trenutni MCP standard (2025-11-25)** dopušta MCP serverima delegiranje autentifikacije vanjskim pružateljima identiteta, što predstavlja značajno sigurnosno poboljšanje:

**OWASP MCP rizik kojem se pristupa**: [MCP07 - Nedostatna Autentifikacija i Autorizacija](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Sigurnosne prednosti:**
1. **Eliminira rizike prilagođene autentifikacije**: Smanjuje površinu ranjivosti izbjegavanjem prilagođenih implementacija autentifikacije  
2. **Sigurnost razine poduzeća**: Koristi etablirane pružatelje identiteta poput Microsoft Entra ID s naprednim sigurnosnim značajkama  
3. **Centralizirano upravljanje identitetima**: Pojednostavljuje upravljanje životnim ciklusom korisnika, kontrolu pristupa i reviziju usklađenosti  
4. **Višefaktorska autentifikacija**: Nasljeđuje MFA mogućnosti od pružatelja identiteta poduzeća  
5. **Uvjetne politike pristupa**: Koristi kontrole pristupa temeljene na riziku i prilagodljivu autentifikaciju

**Zahtjevi implementacije:**
- **Validacija publike tokena**: Provjeriti da su svi tokeni eksplicitno izdani za MCP server  
- **Verifikacija izdavatelja**: Potvrditi da izdavatelj tokena odgovara očekivanom pružatelju identiteta  
- **Provjera potpisa**: Kriptografska validacija integriteta tokena  
- **Provedba isteka**: Strogo poštivanje trajanja valjanosti tokena  
- **Provjera dozvola**: Osigurati da tokeni sadrže odgovarajuće ovlasti za tražene operacije  

### **Sigurnost autorizacijske logike**

**Kritične kontrole:**
- **Sveobuhvatne revizije autorizacije**: Redoviti sigurnosni pregledi svih točaka odluke o autorizaciji  
- **Sigurnosni zadani odgovori**: Odbij pristup kada autorizacijska logika ne može donijeti jasnu odluku  
- **Granice dozvola**: Jasna razgraničenja između različitih razina privilegija i pristupa resursima  
- **Evidentiranje detalja**: Potpuno bilježenje svih odluka o autorizaciji za sigurnosni nadzor  
- **Redoviti pregledi pristupa**: Periodična validacija korisničkih ovlasti i dodjela privilegija  

## 2. **Sigurnost tokena i kontrole protiv prosljeđivanja**

**OWASP MCP rizik kojem se pristupa**: [MCP01 - Nepravilno upravljanje tokenima i izlaganje tajni](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Prevencija prosljeđivanja tokena**

**Prosljeđivanje tokena je eksplicitno zabranjeno** u MCP Authorization Specification zbog kritičnih sigurnosnih rizika:

**Sigurnosni rizici kojima se pristupa:**
- **Zaobilaženje kontrole**: Preskače ključne sigurnosne kontrole poput ograničenja brzine, provjere zahtjeva i nadzora prometa  
- **Gubitak odgovornosti**: Onemogućava identifikaciju klijenta, narušavajući zapisnike i istrage incidenata  
- **Izlučivanje podataka putem proxyja**: Omogućava zlonamjernim akterima korištenje servera kao proxyja za neovlašteni pristup podacima  
- **Kršenje granica povjerenja**: Krši pretpostavke downstream usluga o porijeklu tokena  
- **Lateralno širenje**: Kompromitirani tokeni na više servisa omogućuju širu eskalaciju napada

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
- **Kratkotrajni tokeni**: Minimizirati izloženost čestim rotiranjem tokena  
- **Izdavanje prema potrebi (Just-in-Time)**: Izdavati tokene samo kada su potrebni za specifične operacije  
- **Sigurna pohrana**: Koristiti hardverske sigurnosne module (HSM) ili sigurne spremišta ključeva  
- **Povezivanje tokena**: Povezati tokene s određenim klijentima, sesijama ili operacijama gdje je moguće  
- **Nadzor i upozorenja**: Detekcija zloupotrebe tokena ili neovlaštenog pristupa u stvarnom vremenu  

## 3. **Kontrole sigurnosti sesija**

### **Prevencija preuzimanja sesije**

**Adrese napada:**
- **Umetanje podataka u sesijski prompt (Session Hijack Prompt Injection)**: Zlonamjerne radnje umetnute u zajedničko stanje sesije  
- **Imitacija sesije**: Neovlaštena upotreba ukradenih ID-eva sesije za zaobilaženje autentifikacije  
- **Napadi s nastavkom streama**: Eksploatacija nastavljanja serverom poslanih događaja za zlonamjerne injekcije sadržaja

**Obavezne kontrole sesije:**
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
- **HTTPS provedba**: Sva komunikacija sesije preko TLS 1.3  
- **Sigurni atributi kolačića (cookies)**: HttpOnly, Secure, SameSite=Strict  
- **Piniranje certifikata**: Za kritične veze radi sprječavanja MITM napada  

### **Razmatranja za stanje i bezstanje sesije**

**Za implementacije koje zadržavaju stanje:**
- Dijeljeno stanje sesije zahtijeva dodatnu zaštitu od injekcijskih napada  
- Upravljanje sesijama putem redova treba provjeru integriteta  
- Višestruki serveri zahtijevaju sigurnu sinkronizaciju stanja sesije  

**Za implementacije bez zadržavanja stanja:**
- Upravljanje sesijom bazirano na JWT ili sličnim tokenima  
- Kriptografska provjera integriteta stanja sesije  
- Smanjena površina napada, ali zahtijeva robusnu validaciju tokena  

## 4. **Sigurnosne kontrole specifične za AI**

**OWASP MCP rizici kojima se pristupa**:  
- [MCP06 - Umetanje naredbi preko kontekstualnih podataka (Prompt Injection)](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Trovanje alata](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Injekcija i izvršenje naredbi](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

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
- **Definicija granica sadržaja**: Jasno razdvajanje sistemskih uputa i korisničkog sadržaja  
- **Hijerarhija instrukcija**: Pravilna primjena prioriteta kod sukobljenih naredbi  
- **Nadzor izlaza**: Detekcija potencijalno štetnih ili manipuliranih izlaza  

### **Prevencija trovanja alata**

**Sigurnosni okvir alata:**  
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
- **Radni tokovi odobravanja**: Eksplicitan pristanak korisnika za izmjene alata  
- **Mogućnosti vraćanja promjena**: Sposobnost povratka na prethodne verzije alata  
- **Revizija promjena**: Potpuna povijest izmjena definicija alata  
- **Procjena rizika**: Automatizirana evaluacija sigurnosnog stanja alata  

## 5. **Prevencija napada zbunjenog zamjenika (Confused Deputy)**

### **Sigurnost OAuth Proxyja**

**Kontrole za prevenciju napada:**  
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
- **Provjera pristanka korisnika**: Nikada ne zaobilaziti zaslone pristanka za dinamičku registraciju klijenata  
- **Validacija Redirect URI**: Stroga provjera odredišta preusmjeravanja na temelju bijelog popisa  
- **Zaštita autorizacijskog koda**: Kratkotrajni kodovi s primjenom jednokratne upotrebe  
- **Verifikacija identiteta klijenta**: Robusna provjera vjerodajnica i metapodataka klijenta  

## 6. **Sigurnost izvršenja alata**

### **Sandboxing i izolacija**

**Izolacija zasnovana na kontejnerima:**  
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
- **Odvojeni konteksti procesa**: Svako izvršenje alata u izoliranom procesu  
- **Međuprocesna komunikacija**: Sigurni IPC mehanizmi s validacijom  
- **Nadzor procesa**: Analiza ponašanja u stvarnom vremenu i detekcija anomalija  
- **Provjera resursa**: Stroga ograničenja za CPU, memoriju i ulazno-izlazne operacije  

### **Implementacija najmanjih privilegija**

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

## 7. **Kontrole sigurnosti lanca opskrbe**

**OWASP MCP rizik kojem se pristupa**: [MCP04 - Napadi na lanac opskrbe](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Provjera ovisnosti**

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

**Detekcija prijetnji u lancu opskrbe:**
- **Praćenje zdravlja ovisnosti**: Kontinuirana procjena svih ovisnosti zbog sigurnosnih problema  
- **Integracija obavještajnih podataka o prijetnjama**: Ažuriranja u stvarnom vremenu o novim prijetnjama u lancu opskrbe  
- **Analiza ponašanja**: Detekcija neuobičajenih aktivnosti u vanjskim komponentama  
- **Automatizirani odgovor**: Neposredna izolacija kompromitiranih komponenti  

## 8. **Kontrole nadzora i detekcije**

**OWASP MCP rizik kojem se pristupa**: [MCP08 - Nedostatak revizije i telemetrije](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Upravljanje sigurnosnim informacijama i događajima (SIEM)**

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

**Analiza ponašanja:**
- **Analitika ponašanja korisnika (UBA)**: Detekcija neuobičajenih obrazaca pristupa korisnika  
- **Analitika ponašanja entiteta (EBA)**: Nadzor ponašanja MCP servera i alata  
- **Detekcija anomalija potpomognuta strojnim učenjem**: AI-pokretano prepoznavanje sigurnosnih prijetnji  
- **Korelacija obavještajnih podataka o prijetnjama**: Usporedba opaženih aktivnosti s poznatim obrascima napada  

## 9. **Odgovor na incidente i oporavak**

### **Automatizirane mogućnosti odgovora**

**Neposredne mjere odgovora:**  
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

**Podrška za istragu:**
- **Čuvanje auditnih tragova**: Nepromjenjivo bilježenje s kriptografskim potpisom  
- **Prikupljanje dokaza**: Automatizirano prikupljanje relevantnih sigurnosnih artefakata  
- **Rekonstrukcija vremenske crte**: Detaljan slijed događaja koji su doveli do sigurnosnih incidenata  
- **Procjena utjecaja**: Evaluacija opsega kompromisa i izlaganja podataka  

## **Ključni načela sigurnosne arhitekture**

### **Obrana u dubinu**
- **Višeslojna sigurnost**: Nema jedne točke neuspjeha u sigurnosnoj arhitekturi  
- **Redundantne kontrole**: Preklapajuće sigurnosne mjere za kritične funkcije  
- **Mehanizmi sigurnosnih zadataka**: Sigurni zadani načini rada u slučaju pogrešaka ili napada  

### **Implementacija Zero Trust-a**
- **Nikad ne vjeruj, uvijek provjeri**: Kontinuirana validacija svih entiteta i zahtjeva  
- **Načelo najmanjih privilegija**: Minimalna prava pristupa za sve komponente  
- **Mikrosegmentacija**: Detaljne mrežne i kontrolne pristupne mjere  

### **Kontinuirana evolucija sigurnosti**
- **Prilagodba novim prijetnjama**: Redovita ažuriranja za nove sigurnosne izazove  
- **Efikasnost sigurnosnih kontrola**: Stalna evaluacija i poboljšanje kontrola  
- **Usklađenost s specifikacijama**: Usklađenost s razvijajućim MCP sigurnosnim standardima  

---

## **Resursi za implementaciju**

### **Službena MCP dokumentacija**
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Sigurnosne Najbolje Prakse](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP sigurnosni resursi**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Sveobuhvatni OWASP MCP Top 10 s implementacijom za Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Službeni OWASP MCP sigurnosni rizici  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktična sigurnosna obuka za MCP na Azureu  

### **Microsoft sigurnosna rješenja**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Sigurnosni standardi**
- [OAuth 2.0 Sigurnosne Najbolje Prakse (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 za Velike Jezične Modele](https://genai.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **Važno**: Ove sigurnosne kontrole odražavaju trenutnu MCP specifikaciju (2025-11-25). Uvijek provjerite najnoviju [službenu dokumentaciju](https://spec.modelcontextprotocol.io/) jer se standardi brzo razvijaju.

## Što slijedi

- Povratak na: [Pregled sigurnosnog modula](./README.md)
- Nastavi na: [Modul 3: Početak rada](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI usluge prevođenja [Co-op Translator](https://github.com/Azure/co-op-translator). Iako nastojimo postići točnost, imajte na umu da automatizirani prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na njegovom izvornom jeziku treba smatrati službenim izvorom. Za kritične informacije preporučuje se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakve nesporazume ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->