# MCP varnostne kontrole - posodobitev februar 2026

> **Trenutni standard**: Ta dokument odraža varnostne zahteve [MCP specifikacije 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) in uradne [MCP varnostne najboljše prakse](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Protokol Model Context (MCP) je zrel z izboljšanimi varnostnimi kontrolami, ki obravnavajo tako tradicionalno varnost programske opreme kot AI-specifične grožnje. Ta dokument zagotavlja celovite varnostne kontrole za varne implementacije MCP, usklajene s okvirjem OWASP MCP Top 10.

## 🏔️ Praktično varnostno usposabljanje

Za praktične, praktične izkušnje z varnostno implementacijo priporočamo **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** – celovito vodeno odpravo do varnosti MCP strežnikov v Azure z metodologijo "ranljiv → izkoriščen → popravljeno → preverjeno".

Vse varnostne kontrole v tem dokumentu so usklajene z **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, ki nudi referenčne arhitekture in smernice za implementacijo specifične za Azure za tveganja OWASP MCP Top 10.

## **OBVEZNE varnostne zahteve**

### **Kritične prepovedi iz MCP specifikacije:**

> **ZAPOVEDANO NE**: MCP strežniki **NE SMEMO** sprejemati nobenih žetonov, ki niso izrecno izdani za MCP strežnik  
>
> **PREPOVEDANO**: MCP strežniki **NE SMEMO** uporabljati sej za preverjanje pristnosti  
>
> **ZAHETNO**: MCP strežniki, ki izvajajo avtorizacijo, **MORAJO** preveriti VSE dohodne zahteve  
>
> **OBVEZNO**: MCP proxy strežniki, ki uporabljajo statične ID-je odjemalcev, **MORAJO** pridobiti soglasje uporabnika za vsakega dinamično registriranega odjemalca

---

## 1. **Kontrole preverjanja pristnosti in avtorizacije**

### **Integracija zunanjega ponudnika identitete**

**Trenutni MCP standard (2025-11-25)** dovoljuje MCP strežnikom delegiranje preverjanja pristnosti zunanjim ponudnikom identitete, kar predstavlja pomembno varnostno izboljšavo:

**Rešeno tveganje OWASP MCP**: [MCP07 - Nezadostna preverba pristnosti in avtorizacija](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Varnostne koristi:**
1. **Odpravlja tveganja lastnih implementacij preverjanja pristnosti**: zmanjša ranljivosti z izogibanjem lastnim rešitvam  
2. **Varnost na ravni podjetja**: uporaba uveljavljenih ponudnikov, kot je Microsoft Entra ID, z naprednimi varnostnimi funkcijami  
3. **Centralizirano upravljanje identitet**: poenostavi upravljanje življenjskega cikla uporabnika, nadzor dostopa in revizije skladnosti  
4. **Večfaktorsko preverjanje pristnosti (MFA)**: deduje zmožnosti MFA od ponudnikov identitete podjetja  
5. **Politike pogojnega dostopa**: koristi nadzoru dostopa na podlagi tveganj in prilagodljivi pristnosti

**Zahteve za implementacijo:**
- **Preverjanje občinstva žetona**: Preverite, da so vsi žetoni izrecno izdani za MCP strežnik  
- **Preverjanje izdajatelja**: Potrdite, da izdajatelj žetona ustreza pričakovanemu ponudniku identitete  
- **Preverjanje podpisa**: Kriptografska potrditev integritete žetona  
- **Uveljavljanje poteka**: Strogo upoštevanje časovnih omejitev žetona  
- **Preverjanje obsega**: Zagotovite, da žetoni vsebujejo ustrezna dovoljenja za zahtevane operacije  

### **Varnost avtorizacijske logike**

**Ključne kontrole:**
- **Celovite avtorizacijske revizije**: Redni varnostni pregledi vseh točk odločanja o avtorizaciji  
- **Varne privzete nastavitve**: Zavrnitev dostopa, kadar logika avtorizacije ne more sprejeti dokončne odločitve  
- **Meje dovoljenj**: Jasna ločitev med različnimi ravnmi privilegijev in dostopom do virov  
- **Revizijsko beleženje**: Popolno beleženje vseh odločitev o avtorizaciji za varnostni nadzor  
- **Redni pregledi dostopa**: Občasna potrditev uporabniških dovoljenj in dodelitev privilegijev  

## 2. **Varnost žetonov in kontrole preprečevanja prejema naprej**

**Rešeno tveganje OWASP MCP**: [MCP01 - Slabo upravljanje žetonov in razkritje skrivnosti](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Preprečevanje posredovanja žetonov**

**Posredovanje žetonov je izrecno prepovedano** v MCP specifikaciji avtorizacije zaradi kritičnih varnostnih tveganj:

**Obravnavana varnostna tveganja:**
- **Obhod nadzora**: Zaobide ključne varnostne kontrole, kot so omejevanje hitrosti, preverjanje zahtevkov in nadzor prometa  
- **Zlom odgovornosti**: Onemogoča identifikacijo odjemalca, pokvari revizijske evidence in preiskave incidentov  
- **Izsiljevanje prek proxyja**: Omogoča zlonam uporabo strežnikov kot proxyjev za nepooblaščen dostop do podatkov  
- **Kršitve zaupanja**: Presek zaupanja med storitvami o viru žetonov  
- **Lateralno širjenje**: Ogroženi žetoni v več storitvah omogočajo širše širjenje napadov  

**Implementacijske kontrole:**  
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
  
### **Varne prakse upravljanja žetonov**

**Najboljše prakse:**
- **Kratkotrajni žetoni**: Zmanjšajte čas izpostavljenosti z pogosto rotacijo žetonov  
- **Izdaja "prav v pravem času"**: Izdajajte žetone samo, ko so potrebni za določene operacije  
- **Varen način shranjevanja**: Uporabljajte varnostne strojne module (HSM) ali varne ključnice  
- **Povezovanje žetonov**: Povežite žetone s specifičnimi odjemalci, sejami ali operacijami, kjer je to možno  
- **Nadzor in opozarjanje**: Zaznavanje v realnem času zlorabe žetonov ali nepooblaščenih vzorcev dostopa  

## 3. **Varnost sej**

### **Preprečevanje prevzema seje**

**Ciljne poti napadov:**
- **Vbrizgavanje zlonamernih zahtevkov v sejo**: Zlonamerna dejanja vdelana v skupno stanje seje  
- **Napadi predstavljanje seje**: Neavtorizirana uporaba ukradenih ID-jev sej za obhod preverjanja pristnosti  
- **Napadi z nadaljevanjem pretoka**: Izkoriščanje obnovitve dogodkov s strežnika za vbrizgavanje zlonamerne vsebine  

**Obvezne kontrole sej:**  
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
  
**Varnost prenosa:**  
- **Uporaba HTTPS**: Vsa komunikacija seje prek TLS 1.3  
- **Varnostne lastnosti piškotkov**: HttpOnly, Secure, SameSite=Strict  
- **Pripenjanje certifikatov**: Za kritične povezave za preprečevanje MITM napadov  

### **Razmisleki o stanju seje: z državo ali brez nje**

**Za implementacije z državo:**
- Skupno stanje seje zahteva dodatno zaščito pred vbrizgavanjem  
- Upravljanje sej na osnovi čakalnih vrst potrebuje preverjanje integritete  
- Več strežniških instanc zahteva varno sinhronizacijo stanja sej  

**Za implementacije brez države:**
- Upravljanje sej z JWT ali podobnimi žetoni  
- Kriptografska verifikacija integritete stanja seje  
- Zmanjšana površina napada, a zahteva robustno preverjanje žetonov  

## 4. **AI-specifične varnostne kontrole**

**Rešena OWASP MCP tveganja**:  
- [MCP06 - Vbrizgavanje zahtevkov preko kontekstualnih vsebin](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Zastrupitev orodij](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Vbrizgavanje in izvajanje ukazov](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)  

### **Obramba pred vbrizgavanjem zahtevkov**

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
  
**Implementacijske kontrole:**  
- **Sanitacija vnosa**: Celovita validacija in filtriranje vseh uporabniških vhodov  
- **Določitev meja vsebine**: Jasna ločitev med sistemskimi navodili in uporabniško vsebino  
- **Hierarhija navodil**: Pravilna prednostna pravila za nasprotujoča si navodila  
- **Nadzor izhodov**: Zaznavanje potencialno škodljivih ali manipuliranih izhodov  

### **Preprečevanje zastrupitve orodij**

**Okvir varnosti orodij:**  
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
  
**Dinamično upravljanje orodij:**  
- **Delovni tok odobritve**: Izrecno soglasje uporabnika za spremembe orodij  
- **Možnost povrnitve sprememb**: Možnost vrnitve na prejšnje različice orodij  
- **Revizijska sled sprememb**: Popolna zgodovina sprememb definicij orodij  
- **Ocena tveganj**: Samodejna evalvacija varnostnega stanja orodij  

## 5. **Preprečevanje napada z zmedeno podelitvijo (Confused Deputy)**

### **Varnost OAuth proxyja**

**Kontrole za preprečevanje napadov:**  
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
  
**Zahteve za implementacijo:**  
- **Preverjanje uporabniškega soglasja**: Nikoli ne preskočite zaslona za soglasje pri dinamični registraciji odjemalcev  
- **Validacija URI za preusmeritev**: Stroga validacija dovoljenih destinacij preusmeritev  
- **Zaščita pred uporabo avtorizacijskih kod**: Kratkoročne kode z enkratno uporabo  
- **Preverjanje identitete odjemalca**: Robustna validacija poverilnic odjemalca in metapodatkov  

## 6. **Varnost izvajanja orodij**

### **Sandboxing in izolacija**

**Izolacija na osnovi kontejnerjev:**  
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
  
**Izolacija procesov:**  
- **Ločeni procesni konteksti**: Izvajanje vsakega orodja v izoliranem procesu  
- **Medprocesna komunikacija**: Varnostni mehanizmi IPC z validacijo  
- **Nadzor procesov**: Analiza vedenja med izvajanjem in zaznavanje anomalij  
- **Uveljavljanje omejitev virov**: Stroge omejitve za CPU, pomnilnik in I/O operacije  

### **Implementacija principa najmanjših privilegijev**

**Upravljanje dovoljenj:**  
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
  
## 7. **Varnost dobavne verige**

**Rešeno tveganje OWASP MCP**: [MCP04 - Napadi na dobavno verigo](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Preverjanje odvisnosti**

**Celovita varnost komponent:**  
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
  
### **Nenehno spremljanje**

**Zaznavanje groženj v dobavni verigi:**  
- **Spremljanje zdravja odvisnosti**: Kontinuirana ocena vseh odvisnosti glede varnostnih težav  
- **Integracija z obveščevalnimi podatki o grožnjah**: Posodobitve v realnem času o novih grožnjah v dobavnih verigah  
- **Vedenjska analiza**: Zaznavanje nenavadnega vedenja v zunanjih komponentah  
- **Samodejni odziv**: Takojšnja zajezitev ogroženih komponent  

## 8. **Kontrole spremljanja in zaznavanja**

**Rešeno tveganje OWASP MCP**: [MCP08 - Pomanjkanje revizije in telemetrije](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Sistem za upravljanje varnostnih informacij in dogodkov (SIEM)**

**Celovita strategija beleženja:**  
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
  
### **Zaznavanje groženj v realnem času**

**Vedenjska analitika:**  
- **Analitika vedenja uporabnikov (UBA)**: Zaznavanje nenavadnih vzorcev uporabniških dostopov  
- **Analitika vedenja entitet (EBA)**: Nadzor nad vedenjem strežnika MCP in orodij  
- **Zaznavanje anomalij z uporabo strojnega učenja**: AI-podprta identifikacija varnostnih groženj  
- **Korelacija z obveščevalnimi podatki o grožnjah**: Ujemanje opazovanih aktivnosti z znanimi vzorci napadov  

## 9. **Odziv na incidente in okrevanje**

### **Avtomatizirane zmožnosti odziva**

**Neposredni ukrepi odziva:**  
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
  
### **Forenzične zmogljivosti**

**Podpora preiskavi:**  
- **Ohranjanje revizijske sledi**: Neizbrisno beleženje s kriptografsko integriteto  
- **Zbiranje dokazov**: Samodejno zbiranje relevantnih varnostnih materialov  
- **Rekonstrukcija časovnice**: Podroben zapis dogodkov, ki so vodili do varnostnih incidentov  
- **Ocena vpliva**: Presoja obsega kompromisa in razkritja podatkov  

## **Ključna načela varnostne arhitekture**

### **Obramba v globino**  
- **Več plasti varnosti**: Brez same točke odpovedi v varnostni arhitekturi  
- **Redundantne kontrole**: Prekrivajoči varnostni ukrepi za kritične funkcije  
- **Varne privzete nastavitve**: Varne nastavitve v primeru napak ali napadov  

### **Izvedba načela ničelnega zaupanja**  
- **Nikoli ne zaupaj, vedno preveri**: Neprestano preverjanje vseh entitet in zahtevkov  
- **Pravilo najmanjših privilegiijev**: Minimalne pravice za vse komponente  
- **Mikrosegmentacija**: Natančen nadzor omrežja in dostopa  

### **Nadaljnji razvoj varnosti**  
- **Prilagajanje groženjskemu okolju**: Redne posodobitve za obravnavo novih groženj  
- **Učinkovitost varnostnih kontrol**: Neprestano vrednotenje in izboljševanje kontrol  
- **Skladnost s specifikacijami**: Usklajenost z razvijajočimi se MCP varnostnimi standardi  

---

## **Viri za implementacijo**

### **Uradna MCP dokumentacija**
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP varnostne najboljše prakse](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP specifikacija avtorizacije](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  

### **OWASP MCP varnostni viri**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Celovit OWASP MCP Top 10 z Azure implementacijo  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Uradna OWASP MCP varnostna tveganja  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktično varnostno usposabljanje za MCP v Azure  

### **Microsoft varnostne rešitve**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)  

### **Varnostni standardi**
- [OAuth 2.0 varnostne najboljše prakse (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 za velike jezikovne modele](https://genai.owasp.org/)  
- [NIST okvir za kibernetsko varnost](https://www.nist.gov/cyberframework)  

---

> **Pomembno**: Te varnostne kontrole odražajo trenutni MCP standard (2025-11-25). Vedno preverite proti najnovejši [uradni dokumentaciji](https://spec.modelcontextprotocol.io/), saj se standardi hitro razvijajo.

## Kaj sledi

- Vrni se na: [Pregled modulov varnosti](./README.md)
- Nadaljujte na: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Izjava o omejitvi odgovornosti**:  
Ta dokument je bil preveden z uporabo storitve za avtomatski prevod AI [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, upoštevajte, da lahko avtomatizirani prevodi vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvorno jeziku velja za verodostojen vir. Za ključne informacije priporočamo strokovni človeški prevod. Nismo odgovorni za morebitne nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->