# MCP varnostni ukrepi - posodobitev februar 2026

> **Trenutni standard**: Ta dokument odraža [MCP specifikacijo 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) varnostne zahteve in uradne [MCP varnostne najboljše prakse](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) je znatno dozorel z izboljšanimi varnostnimi ukrepi, ki naslavljajo tako tradicionalno varnost programske opreme kot tudi specifične grožnje umetne inteligence. Ta dokument zagotavlja celovite varnostne ukrepe za varne implementacije MCP, usklajene z okvirjem OWASP MCP Top 10.

## 🏔️ Praktična varnostna usposabljanja

Za praktične izkušnje z varnostno implementacijo priporočamo **[delavnico MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** – celovito vodeno odpravo za zavarovanje MCP strežnikov v Azure z metodologijo "ranljiv → izkoristi → popravi → potrdi".

Vsi varnostni ukrepi v tem dokumentu so usklajeni z **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, ki ponuja referenčne arhitekture in smernice za specifične implementacije Azure za OWASP MCP Top 10 tveganja.

## **OBVEZNE varnostne zahteve**

### **Kritične prepovedi iz MCP specifikacije:**

> **PREPOVEDANO**: MCP strežniki **NE SMEJO** sprejemati nobenih žetonov, ki niso izrecno izdani za MCP strežnik  
>  
> **PREPOVEDANO**: MCP strežniki **NE SMEJO** uporabljati sej za avtentikacijo  
>  
> **ZAHETNO**: MCP strežniki, ki izvajajo avtorizacijo, **MORJO** preverjati VSE dohodne zahteve  
>  
> **OBVEZNO**: MCP proxy strežniki, ki uporabljajo statične ID-je odjemalcev, **MORJO** pridobiti soglasje uporabnika za vsakega dinamično registriranega odjemalca

---

## 1. **Ukrepi za avtentikacijo in avtorizacijo**

### **Integracija zunanjih ponudnikov identitet**

**Trenutni MCP standard (2025-11-25)** omogoča MCP strežnikom delegiranje avtentikacije zunanjim ponudnikom identitet, kar predstavlja pomembno izboljšavo varnosti:

**Rešeno OWASP MCP tveganje**: [MCP07 - Nezadostna avtentikacija in avtorizacija](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Varnostne koristi:**
1. **Odprava tveganj lastnih avtentikacij**: zmanjša ranljivost s tem, da se izogne lastni implementaciji avtentikacije
2. **Varnost na ravni podjetja**: izkorišča uveljavljene ponudnike identitet, kot je Microsoft Entra ID, z naprednimi varnostnimi funkcijami
3. **Centralizirano upravljanje identitet**: poenostavi upravljanje življenjskega cikla uporabnikov, nadzor dostopa in skladnost s pravili
4. **Večfaktorska avtentikacija**: deduje zmogljivosti MFA od podjetniških ponudnikov identitet
5. **Pogojevalne politike dostopa**: koristi od nadzorov dostopa na podlagi tveganja in prilagodljive avtentikacije

**Zahteve za implementacijo:**
- **Validacija občinstva žetona**: preverjanje, da so vsi žetoni izrecno izdani za MCP strežnik
- **Preverjanje izdajatelja**: potrjevanje, da izdajatelj žetona ustreza pričakovanemu ponudniku identitete
- **Preverjanje podpisa**: kriptografska validacija integritete žetona
- **Uveljavljanje poteka veljavnosti**: stroga kontrola omejitev življenjske dobe žetona
- **Validacija obsega**: zagotavljanje, da vsebujejo žetoni ustrezna dovoljenja za zahtevane operacije

### **Varnost avtorizacijske logike**

**Kritični ukrepi:**
- **Celovite revizije avtorizacije**: redni varnostni pregledi vseh odločitev o avtorizaciji
- **Privzeti varnostni ukrepi**: zavrnitev dostopa, kadar logika avtorizacije ne more sprejeti dokončne odločitve
- **Meje dovoljenj**: jasna ločitev med različnimi ravnmi privilegijev in dostopa do virov
- **Revizijsko beleženje**: popolno beleženje vseh odločitev o avtorizaciji za varnostni nadzor
- **Redni pregledi dostopa**: obdobna preverjanja uporabniških dovoljenj in dodeljenih privilegijev

## 2. **Varnost žetonov in ukrepi proti posredovanju (passthrough)**

**Rešeno OWASP MCP tveganje**: [MCP01 - Nepravilno upravljanje žetonov in razkritje skrivnosti](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Preprečevanje posredovanja žetonov**

**Posredovanje žetonov je izrecno prepovedano** v MCP specifikaciji avtorizacije zaradi kritičnih varnostnih tveganj:

**Naslovljena varnostna tveganja:**
- **Obhod varnostnih ukrepov**: zaobide bistvene varnostne ukrepe, kot so omejevanje hitrosti, validacija zahtev in nadzor prometa
- **Zlom odgovornosti**: onemogoča identifikacijo odjemalca, kar pokvari revizijske sledi in preiskave incidentov
- **Izsiljevanje prek proxy strežnikov**: omogoča zlonamernim akterjem uporabo strežnikov kot proxijev za nepooblaščen dostop do podatkov
- **Kršenje zaupanja v meje**: krši predpostavke nadaljnjih storitev glede izvorov žetonov
- **Bočno premikanje**: kompromitirani žetoni med več storitvami omogočajo širše napade

**Ukrepanje za implementacijo:**
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

### **Varnostni vzorci upravljanja žetonov**

**Najboljše prakse:**
- **Kratkotrajni žetoni**: zmanjšanje okna izpostavljenosti z pogosto rotacijo žetonov
- **Izdaja „just-in-time“**: izdaja žetonov samo, ko so potrebni za specifične operacije
- **Varen shranjevanje**: uporaba strojno varnih modulov (HSM) ali varnih zakladnic ključev
- **Povezava žetonov**: kjer je mogoče, veže žetone na specifične odjemalce, seje ali operacije
- **Nadzor in opozarjanje**: zaznavanje zlorabe žetonov oz. nepooblaščenega dostopa v realnem času

## 3. **Varnost seje**

### **Preprečevanje prevzema sej**

**Napadalni vektorji:**
- **Vstavljanje zlonamernih ukazov v sejo**: vnos zlonamernih dogodkov v deljeno stanje seje
- **Impersonacija seje**: nepooblaščena uporaba ukradenih ID-jev sej za obhod avtentikacije
- **Napadi z nadaljevanjem toka**: izkoriščanje ponovnega vzpostavljanja strežnikovih dogodkov za vnos škodljive vsebine

**Obvezni ukrepi za sejo:**
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
- **Zahteva HTTPS**: vsa komunikacija sej preko TLS 1.3
- **Varnostne atribute piškotkov**: HttpOnly, Secure, SameSite=Strict
- **Pinanje certifikatov**: za kritične povezave, da se preprečijo MITM napadi

### **Razlike med stanjem slušnih in brezstanjskimi implementacijami**

**Za implementacije s stanjem:**
- Deljeno stanje seje zahteva dodatno zaščito pred injekcijskimi napadi
- Upravljanje sej na osnovi čakalnih vrst potrebuje preverjanje celovitosti
- Več strežnikov zahteva varno sinhronizacijo stanja sej

**Za brezstanjskih implementacij:**
- Upravljanje sej na osnovi JWT ali podobnih žetonov
- Kriptografska validacija integritete stanja sej
- Zmanjšana površina napada, vendar zahteva robustno validacijo žetonov

## 4. **Varnostni ukrepi specifični za umetno inteligenco**

**Rešena OWASP MCP tveganja**:  
- [MCP06 - Podtikanje namena (Intent Flow Subversion)](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Zastrupljanje orodij (Tool Poisoning)](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Injekcija ukazov in izvrševanje](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Obramba pred vnosom ukazov (prompt injection)**

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

**Ukrepi za implementacijo:**
- **Čiščenje vhodnih podatkov**: popolna validacija in filtriranje vseh uporabniških vhodov
- **Določitev mej vsebine**: jasna ločitev med sistemskimi navodili in uporabniško vsebino
- **Hierarhija navodil**: pravilno določanje prednostnih pravil pri konfliktnih navodilih
- **Nadzor izhodnih vsebin**: zaznavanje potencialno škodljivih ali manipuliranih izhodov

### **Preprečevanje zastrupljanja orodij**

**Okvir za varnost orodij:**  
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
- **Potrditev s strani uporabnika**: izrecno soglasje uporabnika za spremembe orodij
- **Možnosti vračanja**: sposobnost povrnitve na prejšnje različice orodij
- **Revizija sprememb**: popolna zgodovina sprememb definicij orodij
- **Ocena tveganj**: avtomatizirana ocena varnostnega stanja orodij

## 5. **Preprečevanje napadov z zmedenim namestnikom (Confused Deputy Attack)**

### **Varnost OAuth proxy strežnikov**

**Ukrepi za preprečevanje napadov:**
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
- **Preverjanje soglasja uporabnika**: nikoli ne preskakujte zaslonov za soglasje pri dinamični registraciji odjemalcev
- **Validacija Redirect URI**: stroga validacija dovoljenih ciljev preusmeritev na podlagi bele liste
- **Zaščita avtorizacijskih kod**: kratkoročne kode z enkratno uporabo
- **Preverjanje identitete odjemalca**: robustno preverjanje poverilnic odjemalcev in metapodatkov

## 6. **Varnost izvrševanja orodij**

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
- **Ločeni procesni konteksti**: vsakokratno izvajanje orodij v izoliranem procesu
- **Medprocesna komunikacija**: varni IPC mehanizmi z validacijo
- **Nadzor procesov**: analiza vedenja med izvajanjem in zaznavanje anomalij
- **Uveljavljanje virov**: stroge omejitve za CPU, pomnilnik in I/O operacije

### **Implementacija najmanjših privilegijev**

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

**Rešeno OWASP MCP tveganje**: [MCP04 - Napadi na dobavno verigo programske opreme in manipulacije z odvisnostmi](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

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

### **Neprestani nadzor**

**Zaznavanje groženj v dobavni verigi:**
- **Nadzor zdravja odvisnosti**: stalno ocenjevanje vseh odvisnosti zaradi varnostnih težav
- **Integracija obveščevalcev o grožnjah**: posodobitve v realnem času o nastajajočih grožnjah dobavne verige
- **Vedenjska analiza**: zaznavanje nenavadnega vedenja v zunanjih komponentah
- **Avtomatiziran odziv**: takojšnja zajezitev kompromitiranih komponent

## 8. **Nadzorni in zaznavni ukrepi**

**Rešeno OWASP MCP tveganje**: [MCP08 - Pomanjkanje nadzora in telemetrije](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Sistem za upravljanje informacij o varnosti in dogodkih (SIEM)**

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

**Analiza vedenja:**
- **Analitika uporabniškega vedenja (UBA)**: zaznavanje nenavadnih vzorcev dostopa uporabnikov
- **Analitika vedenja entitet (EBA)**: nadzor vedenja MCP strežnikov in orodij
- **Zaznavanje anomalij z učenjem stroja**: AI-podprto prepoznavanje varnostnih groženj
- **Korelacija z obveščevalnimi podatki o grožnjah**: ujemanje opaženih aktivnosti z znanimi vzorci napadov

## 9. **Odzivanje na incidente in okrevanje**

### **Avtomatizirane odzivne zmogljivosti**

**Takojšnji odzivni ukrepi:**  
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

**Podpora pri preiskavah:**
- **Ohranjanje revizijskih sledi**: nerazdirljivo beleženje s kriptografsko integriteto
- **Zbiranje dokazov**: avtomatizirano zbiranje relevantnih varnostnih artefaktov
- **Rekonstrukcija časovnice**: podroben zaporedni prikaz dogodkov, ki so vodili do incidentov
- **Ocena vpliva**: vrednotenje obsega kompromisa in razkritja podatkov

## **Ključna načela varnostne arhitekture**

### **Obramba v globini**
- **Več plasti varnosti**: ni enotne točke odpovedi v varnostni arhitekturi
- **Redundantni ukrepi**: prekrivajoči se varnostni mehanizmi za kritične funkcije
- **Mehanizmi s privzetimi varnostmi**: varne privzete nastavitve ob napakah ali napadih

### **Implementacija ničelnega zaupanja (Zero Trust)**
- **Nikoli ne zaupaj, vedno preverjaj**: neprekinjena validacija vseh entitet in zahtevkov
- **Načelo najmanjših privilegijev**: minimalna dostopna pravica za vse komponente
- **Mikrosegmentacija**: granularni nadzor omrežja in dostopa

### **Neprestana varnostna evolucija**
- **Prilagajanje groženjski pokrajini**: redne posodobitve za naslovitev novih groženj
- **Učinkovitost varnostnih ukrepov**: stalna ocena in izboljšanje ukrepov
- **Skladnost s specifikacijami**: usklajenost z razvijajočimi se MCP varnostnimi standardi

---

## **Viri za implementacijo**

### **Uradna MCP dokumentacija**
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP varnostne najboljše prakse](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP specifikacija avtorizacije](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP varnostni viri**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) – celovit OWASP MCP Top 10 z implementacijo za Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – uradna OWASP MCP varnostna tveganja
- [Delavnica MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) – praktično varnostno usposabljanje za MCP na Azure

### **Microsoft varnostne rešitve**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Varnostni standardi**
- [OAuth 2.0 Varnostne najboljše prakse (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 za velike jezikovne modele](https://genai.owasp.org/)
- [NIST okvir za kibernetsko varnost](https://www.nist.gov/cyberframework)

---

> **Pomembno**: Ti varnostni ukrepi odražajo trenutno MCP specifikacijo (2025-11-25). Vedno preverite najnovejšo [uradno dokumentacijo](https://spec.modelcontextprotocol.io/), saj se standardi hitro razvijajo.

## Kaj sledi

- Vrni se na: [Pregled varnostnega modula](./README.md)
- Nadaljuj na: [Modul 3: Začetek](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->