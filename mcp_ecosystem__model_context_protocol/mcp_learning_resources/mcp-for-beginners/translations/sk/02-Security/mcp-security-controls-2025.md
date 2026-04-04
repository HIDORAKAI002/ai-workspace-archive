# MCP Bezpečnostné opatrenia - Aktualizácia február 2026

> **Aktuálny štandard**: Tento dokument odráža bezpečnostné požiadavky [MCP špecifikácie 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) a oficiálne [Najlepšie bezpečnostné postupy MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) sa významne vyvinul s vylepšenými bezpečnostnými opatreniami, ktoré riešia tradičnú softvérovú bezpečnosť aj špecifické hrozby umelej inteligencie. Tento dokument poskytuje komplexné bezpečnostné opatrenia pre bezpečné implementácie MCP v súlade s rámcom OWASP MCP Top 10.

## 🏔️ Praktický tréning bezpečnosti

Pre praktické skúsenosti s implementáciou bezpečnosti odporúčame **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** – komplexnú sprievodnú expedíciu zabezpečenia MCP serverov v Azure pomocou metodológie „zraniteľný → zneužitý → opravený → overený“.

Všetky bezpečnostné opatrenia v tomto dokumente sú v súlade s **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, ktorý poskytuje referenčné architektúry a usmernenia pre implementáciu špecifickú pre Azure pre OWASP MCP Top 10 riziká.

## **POVINNÉ bezpečnostné požiadavky**

### **Kritické zákazy zo špecifikácie MCP:**

> **ZAKÁZANÉ**: MCP servery **NESMÚ** akceptovať žiadne tokeny, ktoré neboli explicitne vydané pre MCP server  
>
> **ZAKÁZANÉ**: MCP servery **NESMÚ** používať sessions na autentifikáciu  
>
> **POVINNÉ**: MCP servery implementujúce autorizáciu **MUSIA** overovať VŠETKY prichádzajúce požiadavky  
>
> **POVINNÉ**: MCP proxy servery používajúce statické klientské ID **MUSIA** získať súhlas používateľa pre každý dynamicky registrovaný klient

---

## 1. **Opatrenia pre autentifikáciu a autorizáciu**

### **Integrácia s externým poskytovateľom identity**

**Aktuálny MCP štandard (2025-11-25)** umožňuje MCP serverom delegovať autentifikáciu na externých poskytovateľov identity, čo predstavuje významné bezpečnostné zlepšenie:

**Riziko OWASP MCP riešené**: [MCP07 - Nedostatočná autentifikácia a autorizácia](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Bezpečnostné výhody:**
1. **Eliminácia rizík vlastnej autentifikácie**: Znižuje povrch zraniteľnosti vyhýbaním sa vlastným implementáciám autentifikácie  
2. **Enterprise bezpečnosť**: Využíva osvedčených poskytovateľov identity ako Microsoft Entra ID s pokročilými bezpečnostnými funkciami  
3. **Centralizovaná správa identity**: Zjednodušuje správu životného cyklu používateľa, kontrolu prístupu a audity súladu  
4. **Viacfaktorová autentifikácia**: Dedí schopnosti MFA od podnikového poskytovateľa identity  
5. **Podmienené prístupové politiky**: Využíva riadenie prístupu založené na rizikách a adaptívnu autentifikáciu  

**Požiadavky na implementáciu:**
- **Validácia publika tokenu**: Overiť, že všetky tokeny sú explicitne vydané pre MCP server  
- **Overenie vydavateľa**: Overiť, že vydavateľ tokenu zodpovedá očakávanému poskytovateľovi identity  
- **Overenie podpisu**: Kryptografické overenie integrity tokenu  
- **Dodržiavanie doby platnosti**: Prísne dodržiavanie limitov životnosti tokenu  
- **Validácia rozsahu**: Zabezpečiť, že tokeny obsahujú vhodné oprávnenia pre požadované operácie  

### **Bezpečnosť logiky autorizácie**

**Kritické opatrenia:**
- **Komplexné audity autorizácie**: Pravidelné bezpečnostné revízie všetkých rozhodovacích bodov autorizácie  
- **Predvolené odmietnutie (fail-safe)**: Odmietnutie prístupu, keď sa nedá jednoznačne rozhodnúť o autorizácii  
- **Hranice oprávnení**: Jasné oddelenie rôznych úrovní privilégií a prístupu k prostriedkom  
- **Auditovanie zaznamenávania**: Kompletné logovanie všetkých rozhodnutí o autorizácii pre bezpečnostné sledovanie  
- **Pravidelné kontroly prístupu**: Periodické overovanie oprávnení používateľov a prideľovania privilégií  

## 2. **Ochrana tokenov a opatrenia proti passtrough**

**Riziko OWASP MCP riešené**: [MCP01 - Nesprávne nakladanie s tokenmi a únik tajomstiev](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Prevencia presmerovania tokenov**

**Presmerovanie tokenov je v MCP Authorization Specification explicitne zakázané** z dôvodu kritických bezpečnostných rizík:

**Riešené bezpečnostné riziká:**
- **Obchádzanie kontroly**: Obchádza základné bezpečnostné opatrenia ako obmedzovanie rýchlosti, validáciu požiadaviek a monitorovanie prevádzky  
- **Narušenie zodpovednosti**: Znemožňuje identifikáciu klienta, čo ničí audítorské stopy a vyšetrovanie incidentov  
- **Prenos exfiltrácie cez proxy**: Umožňuje škodlivým aktérom použiť servery ako proxy na neautorizovaný prístup k dátam  
- **Porušenie hraníc dôvery**: Narušuje dôveru downstream služieb voči pôvodu tokenov  
- **Laterálny pohyb**: Kompromitované tokeny naprieč viacerými službami umožňujú širšie rozšírenie útokov  

**Bezpečnostné opatrenia implementácie:**
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

### **Vzory bezpečného spravovania tokenov**

**Najlepšie postupy:**
- **Krátkodobé tokeny**: Minimalizovať čas expozície častou rotáciou tokenov  
- **Vydávanie na požiadanie (Just-in-Time)**: Vydávať tokeny len vtedy, keď sú potrebné pre konkrétne operácie  
- **Bezpečné uloženie**: Používať hardvérové bezpečnostné moduly (HSM) alebo bezpečné úložiská kľúčov  
- **Pripútanie tokenu**: Pripájať tokeny ku konkrétnym klientom, sessions alebo operáciám, kde je to možné  
- **Monitorovanie a upozorňovanie**: Detekcia zneužitia tokenov alebo neautorizovaných vzorcov prístupu v reálnom čase  

## 3. **Bezpečnosť sessions**

### **Prevencia unesenia sessions**

**Rizikové vektory:**
- **Násilná injekcia v promptoch počas session**: Škodlivé udalosti vkladané do zdieľaného stavu session  
- **Imitácia session**: Neoprávnené použitie ukradnutých ID session na obídenie autentifikácie  
- **Útoky na obnovenie streamu**: Zneužitie obnovy serverových udalostí na vkladanie škodlivého obsahu  

**Povinné opatrenia pre sessions:**
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

**Zabezpečenie prenosu:**
- **Vynútenie HTTPS**: Všetka session komunikácia cez TLS 1.3  
- **Bezpečné atribúty cookies**: HttpOnly, Secure, SameSite=Strict  
- **Pinovanie certifikátu**: Pre kritické spojenia na prevenciu MITM útokov  

### **Štátové vs. bezštátové implementácie**

**Pre štátové implementácie:**
- Zdieľaný stav sessions vyžaduje dodatočnú ochranu proti injekciám  
- Riadenie sessions založené na frontách potrebuje overenie integrity  
- Viaceré inštancie servera vyžadujú bezpečnú synchronizáciu stavu sessions  

**Pre bezštátové implementácie:**
- Správa sessions založená na JWT alebo podobných tokenoch  
- Kryptografické overenie integrity stavu session  
- Znížený povrch útoku, no vyžaduje robustnú validáciu tokenov  

## 4. **Špecifické bezpečnostné opatrenia pre AI**

**OWASP MCP riešené riziká**:  
- [MCP06 - Injekcia promptov cez kontextové zaťaženia](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Otrava nástrojov](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Injekcia a vykonávanie príkazov](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Obrana proti injekcii promptov**

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

**Bezpečnostné opatrenia:**  
- **Sanitizácia vstupu**: Komplexná validácia a filtrovanie všetkých vstupov používateľa  
- **Definícia hraníc obsahu**: Jasné oddelenie medzi systémovými inštrukciami a používateľským obsahom  
- **Hierarchia pokynov**: Správne pravidlá prednosti pre konfliktné inštrukcie  
- **Monitorovanie výstupov**: Detekcia potenciálne škodlivých alebo manipulovaných výstupov  

### **Prevencia otravy nástrojov**

**Bezpečnostný rámec pre nástroje:**  
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

**Dynamické riadenie nástrojov:**  
- **Schvaľovacie workflowy**: Explicitný súhlas používateľa pre zmeny nástrojov  
- **Možnosti návratu (rollback)**: Schopnosť vrátiť sa k predchádzajúcim verziám nástrojov  
- **Auditovanie zmien**: Kompletná história zmien definícií nástrojov  
- **Hodnotenie rizík**: Automatizované hodnotenie bezpečnostného stavu nástroja  

## 5. **Prevencia útokov zmätku (Confused Deputy Attack)**

### **Bezpečnosť OAuth proxy**

**Opatrenia proti útokom:**  
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
- **Overenie súhlasu používateľa**: Nikdy nepreskakovať obrazovky so súhlasom pre dynamickú registráciu klienta  
- **Validácia redirect URI**: Prísna validácia povolených destinácií pomocou whitelistu  
- **Ochrana autorizačných kódov**: Krátkodobé kódy s vynútenou jednorazovou použiteľnosťou  
- **Overenie identity klienta**: Robustná validácia prihlasovacích dát a metadát klienta  

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
- **Oddelené kontexty procesov**: Každé spustenie nástroja v izolovanom procesnom priestore  
- **Medzi-procesová komunikácia (IPC)**: Bezpečné mechanizmy IPC s validáciou  
- **Monitorovanie procesov**: Analýza správania počas behu a detekcia anomálií  
- **Vynucovanie zdrojov**: Prísne limity na CPU, pamäť a vstupno-výstupné operácie  

### **Implementácia princípu najmenej privilégií**

**Správa oprávnení:**  
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

**Riziko OWASP MCP riešené**: [MCP04 - Útoky na dodávateľský reťazec](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Verifikácia závislostí**

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

**Detekcia hrozieb na dodávateľskom reťazci:**  
- **Monitorovanie stavu závislostí**: Neustále hodnotenie všetkých závislostí z hľadiska bezpečnostných otázok  
- **Integrácia spravodajstva o hrozbách**: Aktuálne informácie o nových hrozbách v dodávateľskom reťazci  
- **Behaviorálna analýza**: Detekcia neobvyklých správaní v externých komponentoch  
- **Automatická reakcia**: Okamžité zadržanie kompromitovaných komponentov  

## 8. **Kontroly monitorovania a detekcie**

**Riziko OWASP MCP riešené**: [MCP08 - Nedostatok auditu a telemetrie](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Správa bezpečnostných informácií a udalostí (SIEM)**

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
- **Analytika správania používateľov (UBA)**: Detekcia neobvyklých vzorcov prístupu používateľov  
- **Analytika správania entít (EBA)**: Monitorovanie správania MCP serverov a nástrojov  
- **Strojové učenie pre detekciu anomálií**: Identifikácia bezpečnostných hrozieb s využitím AI  
- **Korelácia spravodajstva o hrozbách**: Porovnávanie pozorovaných aktivít s známymi vzormi útokov  

## 9. **Reakcia na incidenty a zotavenie**

### **Automatizované reakčné schopnosti**

**Okamžité reakčné opatrenia:**  
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
- **Udržanie audítornej stopy**: Nemenné logovanie s kryptografickou integritou  
- **Zber dôkazov**: Automatizované zhromažďovanie relevantných bezpečnostných artefaktov  
- **Obnova časovej osi udalostí**: Detailné sledovanie udalostí vedúcich k bezpečnostným incidentom  
- **Vyhodnotenie dopadu**: Posúdenie rozsahu kompromitácie a expozície údajov  

## **Kľúčové princípy bezpečnostnej architektúry**

### **Obrana v hĺbke (Defense in Depth)**
- **Viacnásobné bezpečnostné vrstvy**: Žiadny jediný bod zlyhania v bezpečnostnej architektúre  
- **Redundantné opatrenia**: Prekrývajúce sa bezpečnostné mechanizmy pre kritické funkcie  
- **Mechanizmy fail-safe**: Bezpečné predvolené nastavenia pri chybách alebo útokoch  

### **Implementácia prístupu Zero Trust**
- **Nikdy neveriť, vždy overovať**: Neustále overovanie všetkých entít a požiadaviek  
- **Princíp najmenej privilégií**: Minimálne prístupové práva pre všetky komponenty  
- **Mikrosegmentácia**: Detailné sieťové a prístupové kontroly  

### **Kontinuálny bezpečnostný rozvoj**
- **Adaptácia na hrozby v prostredí**: Pravidelné aktualizácie na riešenie nových hrozieb  
- **Efektívnosť bezpečnostných opatrení**: Neustále hodnotenie a zlepšovanie kontrol  
- **Súlad so špecifikáciami**: Zladenie s vyvíjajúcimi sa MCP bezpečnostnými normami  

---

## **Zdroje pre implementáciu**

### **Oficiálna dokumentácia MCP**
- [MCP Špecifikácia (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [Najlepšie bezpečnostné postupy MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [Specifikácia autorizácie MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  

### **Bezpečnostné zdroje OWASP MCP**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komplexný OWASP MCP Top 10 s implementáciou pre Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficiálne bezpečnostné riziká OWASP MCP  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktický tréning bezpečnosti MCP na Azure  

### **Microsoft bezpečnostné riešenia**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)  

### **Bezpečnostné štandardy**
- [OAuth 2.0 Najlepšie bezpečnostné postupy (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 pre veľké jazykové modely](https://genai.owasp.org/)  
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)  

---

> **Dôležité**: Tieto bezpečnostné opatrenia odrážajú aktuálnu MCP špecifikáciu (2025-11-25). Vždy overte podľa najnovšej [oficiálnej dokumentácie](https://spec.modelcontextprotocol.io/), pretože štandardy sa rýchlo vyvíjajú.

## Čo nasleduje

- Návrat na: [Prehľad bezpečnostného modulu](./README.md)
- Pokračovať na: [Module 3: Začíname](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Upozornenie**:  
Tento dokument bol preložený použitím AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Aj keď sa snažíme o presnosť, prosím, berte na vedomie, že automatizované preklady môžu obsahovať chyby alebo nepresnosti. Originálny dokument v jeho pôvodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nenesieme zodpovednosť za akékoľvek nedorozumenia alebo nesprávne výklady vzniknuté použitím tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->