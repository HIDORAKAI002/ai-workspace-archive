# MCP bezpečnostné kontroly - aktualizácia február 2026

> **Aktuálny štandard**: Tento dokument odráža bezpečnostné požiadavky špecifikácie [MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) a oficiálne [MCP bezpečnostné najlepšie postupy](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) sa významne vyvinul s rozšírenými bezpečnostnými kontrolami riešiacimi tradičné bezpečnostné hrozby softvéru aj hrozby špecifické pre AI. Tento dokument poskytuje komplexné bezpečnostné kontroly pre bezpečné implementácie MCP v súlade s rámcom OWASP MCP Top 10.

## 🏔️ Praktický bezpečnostný tréning

Pre praktické skúsenosti s implementáciou bezpečnosti odporúčame **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - komplexnú sprievodnú expedíciu zabezpečenia MCP serverov v Azure použitím metodológie "vulnerable → exploit → fix → validate".

Všetky bezpečnostné kontroly v tomto dokumente sú v súlade s **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, ktorý poskytuje referenčné architektúry a odporúčania na implementáciu špecifické pre Azure pre riziká OWASP MCP Top 10.

## **POVINNÉ bezpečnostné požiadavky**

### **Kritické zákazy zo špecifikácie MCP:**

> **ZAKÁZANÉ**: MCP servery **NESMÚ** akceptovať žiadne tokeny, ktoré neboli výslovne vydané pre MCP server  
>
> **ZAKÁZANÉ**: MCP servery **NESMÚ** používať relácie (sessions) na autentifikáciu  
>
> **POVINNÉ**: MCP servery implementujúce autorizáciu **MUSIA** overiť VŠETKY prichádzajúce požiadavky  
>
> **POVINNÉ**: MCP proxy servery používajúce statické klientské ID **MUSIA** získavať súhlas používateľa pre každého dynamicky registrovaného klienta

---

## 1. **Kontroly autentifikácie & autorizácie**

### **Integrácia externého poskytovateľa identity**

**Aktuálny štandard MCP (2025-11-25)** umožňuje MCP serverom delegovať autentifikáciu na externých poskytovateľov identity, čo predstavuje významné bezpečnostné zlepšenie:

**Riziko OWASP MCP riešené**: [MCP07 - Nedostatočná autentifikácia a autorizácia](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Bezpečnostné prínosy:**
1. **Eliminácia rizík vlastnej autentifikácie**: Znižuje povrch zraniteľnosti vyhýbaním sa vlastným implementáciám autentifikácie
2. **Podniková bezpečnosť**: Využíva etablovaných poskytovateľov identity ako Microsoft Entra ID s pokročilými bezpečnostnými funkciami
3. **Centralizovaná správa identity**: Zjednodušuje riadenie životného cyklu používateľov, kontrolu prístupu a audit zhody
4. **Viacfaktorová autentifikácia**: Dedičnosť MFA schopností od podnikových poskytovateľov identity
5. **Politiky podmienečného prístupu**: Využitie rizikovo založených kontrol prístupu a adaptívnej autentifikácie

**Požiadavky na implementáciu:**
- **Validácia publiká tokenu**: Overenie, že všetky tokeny sú výslovne vydané pre MCP server
- **Overenie vydavateľa**: Validácia, že vydavateľ tokenu zodpovedá očakávanému poskytovateľovi identity
- **Overenie podpisu**: Kryptografické overenie integrity tokenu
- **Vynucovanie expirácie**: Prísne vynucovanie časových limitov platnosti tokenu
- **Validácia rozsahu právomocí**: Zabezpečenie, že tokeny obsahujú vhodné povolenia pre požadované operácie

### **Bezpečnosť logiky autorizácie**

**Kritické kontroly:**
- **Komplexné audity autorizácie**: Pravidelné bezpečnostné revízie všetkých rozhodovacích bodov autorizácie
- **Fail-safe predvolené nastavenia**: Zamietnutie prístupu, keď logika autorizácie nedokáže spraviť jednoznačné rozhodnutie
- **Hraničné povolenia**: Jasné rozhranie medzi rôznymi úrovňami privilégií a prístupom k zdrojom
- **Auditné záznamy**: Kompletné logovanie všetkých rozhodnutí o autorizácii pre bezpečnostné monitorovanie
- **Pravidelné kontroly prístupov**: Periodická validácia používateľských oprávnení a prideľovania privilégií

## 2. **Bezpečnosť tokenov & kontroly zabraňujúce passthrough**

**Riziko OWASP MCP riešené**: [MCP01 - Nesprávna správa tokenov a odhalenie tajomstiev](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Prevencia token passthrough**

**Token passthrough je výslovne zakázaný** v MCP Authorization Specification kvôli kritickým bezpečnostným rizikám:

**Riešené bezpečnostné riziká:**
- **Obchádzanie kontrol**: Obchádza podstatné bezpečnostné kontroly ako limitovanie rýchlosti, validáciu požiadaviek a monitorovanie prevádzky
- **Nedostatočná zodpovednosť**: Znemožňuje identifikáciu klienta, poškodzujúc auditné stopy a vyšetrovanie incidentov
- **Proxy založená exfiltrácia**: Umožňuje škodlivým aktérom používať servery ako proxy pre neautorizovaný prístup k údajom
- **Porušenie dôveryhodnosti hraníc**: Narušuje predpoklady downstream služieb o pôvode tokenov
- **Laterálny pohyb**: Kompromitované tokeny na viacerých službách umožňujú rozsiahlejšie útoky

**Kontroly implementácie:**
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


### **Bezpečné vzory správy tokenov**

**Najlepšie praktiky:**
- **Krátkodobé tokeny**: Minimalizovať expozičné okno častou rotáciou tokenov
- **Vydávanie na požiadanie**: Vydávať tokeny iba keby sú potrebné na konkrétne operácie
- **Bezpečné ukladanie**: Použiť hardvérové bezpečnostné moduly (HSM) alebo bezpečné kľúčové úložiská
- **Väzba tokenov**: Viazať tokeny na konkrétnych klientov, relácie alebo operácie, kde je to možné
- **Monitorovanie a upozorňovanie**: Detekcia v reálnom čase zneužitia tokenov alebo neautorizovaných prístupov

## 3. **Kontroly bezpečnosti relácií**

### **Prevencia prebratia relácie**

**Adresované útokové vektory:**
- **Podvrhnutie vstupov do relácie**: Škodlivé udalosti injektované do zdieľaného stavu relácie
- **Impersonácia relácie**: Neoprávnené použitie ukradnutých ID relácie pre obídenie autentifikácie
- **Útoky na obnovu streamov**: Zneužitie obnovenia udalostí zo serverov na injektovanie škodlivého obsahu

**Povinné kontroly relácií:**
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
  
**Bezpečnosť prenosu:**
- **Vynucovanie HTTPS**: Všetka komunikácia relácie cez TLS 1.3
- **Bezpečné atribúty cookie**: HttpOnly, Secure, SameSite=Strict
- **Pripnutie (pinning) certifikátu**: Pre kritické spojenia na zabránenie MITM útokom

### **Zváženia stavových a bezstavových implementácií**

**Pre stavové implementácie:**
- Zdieľaný stav relácie vyžaduje dodatočnú ochranu proti injekčným útokom
- Správa relácií založená na čakacích radoch potrebuje overovanie integrity
- Viaceré inštancie serverov vyžadujú bezpečnú synchronizáciu stavu relácií

**Pre bezstavové implementácie:**
- Správa relácie pomocou JWT alebo podobných tokenov
- Kryptografické overenie integrity stavu relácie
- Znížený povrch útoku, ale vyžaduje robustnú validáciu tokenov

## 4. **AI-špecifické bezpečnostné kontroly**

**OWASP MCP riešené riziká**:
- [MCP06 - Subverzia toku zámyslov](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Otrava nástrojov](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Vkladanie príkazov a ich vykonávanie](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Ochrana proti injektážam vstupov**

**Integrácia Microsoft Prompt Shields:**
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
  
**Kontroly implementácie:**
- **Sanitácia vstupov**: Komplexná validácia a filtrovanie všetkých používateľských vstupov
- **Definícia hraníc obsahu**: Jasné oddelenie systémových inštrukcií a používateľského obsahu
- **Hierarchia inštrukcií**: Správne pravidlá prednosti pri konfliktných inštrukciách
- **Monitorovanie výstupov**: Detekcia potenciálne škodlivých alebo manipulovaných výstupov

### **Prevencia otravy nástrojov**

**Rámec bezpečnosti nástrojov:**
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
  
**Dynamická správa nástrojov:**
- **Kontrola schvaľovania**: Výslovný súhlas používateľa pre zmeny nástrojov
- **Schopnosť navratu**: Možnosť vrátenia k predchádzajúcim verziám nástrojov
- **Audit zmien**: Kompletná história úprav definícií nástrojov
- **Hodnotenie rizík**: Automatizované vyhodnocovanie bezpečnostného stavu nástrojov

## 5. **Prevencia útokov „confused deputy“**

### **Bezpečnosť OAuth proxy**

**Kontroly prevencie útokov:**
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
  
**Požiadavky na implementáciu:**
- **Overenie súhlasu používateľa**: Nikdy nevynechávať obrazovky súhlasu pri dynamickej registrácii klienta
- **Validácia URI presmerovania**: Prísna validácia cieľových adresátov podľa whitelistu
- **Ochrana autorizačného kódu**: Krátkodobé kódy s vynucením jednorazovosti
- **Overenie identity klienta**: Robustné overovanie poverení a metadát klienta

## 6. **Bezpečnosť vykonávania nástrojov**

### **Sandboxing a izolácia**

**Izolácia založená na kontajneroch:**
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
  
**Izolácia procesov:**
- **Oddelené kontexty procesov**: Každé vykonávanie nástroja v izolovanom procesnom priestore
- **Medziprocesová komunikácia**: Bezpečné IPC mechanizmy s validáciou
- **Monitorovanie procesov**: Analýza správania počas behu a detekcia anomálií
- **Vynucovanie zdrojov**: Prísne limity na CPU, pamäť a I/O operácie

### **Implementácia princípu najmenších právomocí**

**Správa povolení:**
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
  
## 7. **Kontroly bezpečnosti dodávateľského reťazca**

**Riziko OWASP MCP riešené**: [MCP04 - Útoky na dodávateľský reťazec softvéru a manipulácia so závislosťami](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Overovanie závislostí**

**Komplexná bezpečnosť komponentov:**
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
  
### **Kontinuálne monitorovanie**

**Detekcia hrozieb v dodávateľskom reťazci:**
- **Monitorovanie stavu závislostí**: Neustále hodnotenie všetkých závislostí a ich bezpečnostných problémov
- **Integrácia spravodajstva o hrozbách**: Aktualizácie v reálnom čase o vznikajúcich hrozbách v dodávateľskom reťazci
- **Analýza správania**: Detekcia neobvyklého správania v externých komponentoch
- **Automatická reakcia**: Okamžité izolovanie kompromitovaných komponentov

## 8. **Kontroly monitorovania a detekcie**

**Riziko OWASP MCP riešené**: [MCP08 - Nedostatok auditu a telemetrie](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **SIEM (Security Information and Event Management)**

**Komplexná stratégia logovania:**
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
  
### **Detekcia hrozieb v reálnom čase**

**Behaviorálna analytika:**
- **Analytika správania používateľov (UBA)**: Detekcia nezvyčajných vzorcov prístupu používateľov
- **Analytika správania entít (EBA)**: Monitorovanie správania MCP serverov a nástrojov
- **Detekcia anomálií strojovým učením**: AI-poháňaná identifikácia bezpečnostných hrozieb
- **Korelácia so spravodajstvom o hrozbách**: Porovnávanie sledovaných aktivít so známymi vzormi útokov

## 9. **Reakcia na incidenty a obnova**

### **Automatizované reakčné schopnosti**

**Okamžité akcie reakcie:**
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
  
### **Forenzné schopnosti**

**Podpora vyšetrovania:**
- **Zachovanie auditných stôp**: Nemenné logovanie s kryptografickou integritou
- **Zber dôkazov**: Automatizovaný zber relevantných bezpečnostných artefaktov
- **Rekonštrukcia časovej osi**: Detailná sekvencia udalostí vedúcich k bezpečnostným incidentom
- **Hodnotenie dopadov**: Vyhodnotenie rozsahu kompromitácie a odhalenia údajov

## **Kľúčové princípy bezpečnostnej architektúry**

### **Obrana v hĺbke**
- **Viaceré bezpečnostné vrstvy**: Žiadny jediný bod zlyhania v bezpečnostnej architektúre
- **Redundantné kontroly**: Prekrývajúce sa bezpečnostné opatrenia pre kritické funkcie
- **Fail-safe mechanizmy**: Bezpečné predvolené nastavenia v prípade chýb alebo útokov

### **Implementácia Zero Trust**
- **Nikdy never, vždy overuj**: Neustále overovanie všetkých entít a požiadaviek
- **Princíp najmenších právomocí**: Minimálne prístupové práva pre všetky komponenty
- **Mikrosegmentácia**: Granulárna sieťová a prístupová kontrola

### **Kontinuálny vývoj bezpečnosti**
- **Adaptácia na hrozby**: Pravidelné aktualizácie adresujúce vznikajúce hrozby
- **Efektívnosť bezpečnostných kontrol**: Neustále hodnotenie a zdokonaľovanie opatrení
- **Súlad so špecifikáciami**: Zladenie s vyvíjajúcimi sa bezpečnostnými štandardmi MCP

---

## **Zdroje implementácie**

### **Oficiálna MCP dokumentácia**
- [MCP špecifikácia (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP bezpečnostné najlepšie postupy](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Bezpečnostné zdroje OWASP MCP**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komplexný OWASP MCP Top 10 s implementáciou v Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficiálne OWASP MCP bezpečnostné riziká
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktický bezpečnostný tréning MCP na Azure

### **Microsoft bezpečnostné riešenia**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Bezpečnostné štandardy**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 pre veľké jazykové modely](https://genai.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **Dôležité**: Tieto bezpečnostné kontroly odrážajú aktuálnu špecifikáciu MCP (2025-11-25). Vždy overujte podľa najnovšej [oficiálnej dokumentácie](https://spec.modelcontextprotocol.io/), pretože štandardy sa rýchlo vyvíjajú.

## Čo ďalej

- Návrat na: [Prehľad bezpečnostného modulu](./README.md)
- Pokračujte na: [Modul 3: Začíname](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->