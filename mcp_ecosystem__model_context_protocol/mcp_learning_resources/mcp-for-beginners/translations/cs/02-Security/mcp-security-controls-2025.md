# MCP Bezpečnostní Kontroly - Aktualizace Únor 2026

> **Aktuální Standard**: Tento dokument odráží bezpečnostní požadavky [Specifikace MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) a oficiální [MCP Bezpečnostní Nejlepší Praxe](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) významně dozrál s rozšířenými bezpečnostními kontrolami zabývajícími se jak tradiční bezpečností softwaru, tak specifickými hrozbami AI. Tento dokument poskytuje komplexní bezpečnostní kontroly pro bezpečné implementace MCP v souladu s rámcem OWASP MCP Top 10.

## 🏔️ Praktický Bezpečnostní Trénink

Pro praktické, hands-on zkušenosti s implementací bezpečnosti doporučujeme **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - komplexní vedenou expedici k zabezpečení MCP serverů v Azure pomocí metodologie „zranitelné → exploit → oprava → validace“.

Všechny bezpečnostní kontroly v tomto dokumentu jsou v souladu s **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, který poskytuje referenční architektury a pokyny k implementaci specifické pro Azure pro rizika OWASP MCP Top 10.

## **POVINNÉ Bezpečnostní Požadavky**

### **Kritické zákazy ze Specifikace MCP:**

> **ZAKÁZÁNO**: MCP servery **NESMÍ** přijímat žádné tokeny, které nebyly explicitně vydány pro MCP server  
>  
> **ZAKÁZÁNO**: MCP servery **NESMÍ** používat session pro autentizaci  
>  
> **POVINNÉ**: MCP servery implementující autorizaci **MUSÍ** ověřovat VŠECHNY příchozí požadavky  
>  
> **POVINNÉ**: MCP proxy servery používající statické ID klienta **MUSÍ** získat souhlas uživatele pro každého dynamicky registrovaného klienta

---

## 1. **Kontroly Autentizace a Autorizace**

### **Integrace Externího Poskytovatele Identity**

**Aktuální Standard MCP (2025-11-25)** umožňuje MCP serverům delegovat autentizaci na externí poskytovatele identity, což představuje významné bezpečnostní vylepšení:

**Řešené Riziko OWASP MCP**: [MCP07 - Nedostatečná autentizace a autorizace](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Bezpečnostní Výhody:**
1. **Eliminace rizik vlastních autentizací**: Snižuje povrch zranitelnosti vyhýbáním se vlastním implementacím autentizace  
2. **Podniková úroveň bezpečnosti**: Využívá zavedené poskytovatele identity jako Microsoft Entra ID s pokročilými bezpečnostními funkcemi  
3. **Centralizovaná správa identity**: Zjednodušuje správu životního cyklu uživatelů, kontrolu přístupu a audity souladu  
4. **Vícefaktorová autentizace**: Dedukuje schopnosti MFA od podnikových poskytovatelů identity  
5. **Podmíněné přístupové politiky**: Využívá rizikově založené kontroly přístupu a adaptivní autentizaci  

**Požadavky na Implementaci:**
- **Validace publika tokenu**: Ověření, že všechny tokeny jsou explicitně vydány pro MCP server  
- **Ověření vydavatele**: Validace vydavatele tokenu vůči očekávanému poskytovateli identity  
- **Ověření podpisu**: Kryptografická validace integrity tokenu  
- **Vynucení expirace**: Přísné dodržování limitů platnosti tokenu  
- **Validace oprávnění (scope)**: Zajištění, že tokeny obsahují odpovídající oprávnění pro požadované operace  

### **Bezpečnost Autorizace**

**Kritické kontroly:**
- **Komplexní audity autorizace**: Pravidelné bezpečnostní kontroly všech rozhodovacích bodů autorizace  
- **Bezpečné výchozí hodnoty**: Zamítnutí přístupu, pokud autorizace nedokáže učinit definitivní rozhodnutí  
- **Hraniční oprávnění**: Jasné oddělení různých úrovní oprávnění a přístupu k prostředkům  
- **Auditní záznamy**: Kompletní logování všech rozhodnutí autorizace pro monitorování bezpečnosti  
- **Pravidelné revize přístupů**: Periodická validace uživatelských oprávnění a přiřazení privilegií  

## 2. **Bezpečnost Tokenů a Kontroly proti Passthrough**

**Řešené Riziko OWASP MCP**: [MCP01 - Špatné zacházení s tokeny a odhalení tajemství](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Prevence Passthrough Tokenů**

**Passthrough tokenů je explicitně zakázán** ve Specifikaci MCP Autorizace kvůli kritickým bezpečnostním rizikům:

**Řešená Bezpečnostní Rizika:**
- **Obcházení kontrol**: Přeskakuje zásadní bezpečnostní kontroly jako omezení rychlosti, validaci požadavků a monitorování provozu  
- **Rozpad odpovědnosti**: Znemožňuje identifikaci klienta, poškozuje audity a vyšetřování incidentů  
- **Exfiltrace přes proxy**: Umožňuje škodlivým aktérům používat servery jako proxy pro neoprávněný přístup k datům  
- **Porušení důvěry**: Rozbíjí předpoklady důvěry downstream služeb ohledně původu tokenů  
- **Laterální pohyb**: Kompromitované tokeny napříč službami umožňují širší eskalaci útoku  

**Kontroly pro implementaci:**  
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
  
### **Vzorové bezpečné řízení tokenů**

**Nejlepší Praxe:**
- **Krátkodobé tokeny**: Minimalizujte dobu expozice častou rotací tokenů  
- **Vydávání tokenů na požádání**: Vydávejte tokeny pouze, když jsou potřeba pro konkrétní operace  
- **Bezpečné ukládání**: Používejte hardwarové bezpečnostní moduly (HSM) nebo zabezpečené úložiště klíčů  
- **Vázání tokenů**: Vazba tokenů na konkrétní klienty, session nebo operace, pokud je to možné  
- **Monitorování a upozornění**: Detekce v reálném čase zneužití tokenů nebo neoprávněných přístupů  

## 3. **Kontroly Bezpečnosti Session**

### **Prevence únosu session**

**Řešené vektory útoku:**
- **Vstřikování promptu do session**: Škodlivé události injektované do sdíleného stavu session  
- **Impersonace session**: Neoprávněné využití ukradených ID session k obejití autentizace  
- **Útoky pomocí obnovení streamu**: Zneužití obnova serverem odesílaných událostí pro injektování škodlivého obsahu  

**Povinné Kontroly Session:**  
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
  
**Bezpečnost přenosu:**
- **Povinné HTTPS**: Veškerá komunikace session přes TLS 1.3  
- **Atributy Secure Cookie**: HttpOnly, Secure, SameSite=Strict  
- **Pinning certifikátu**: Pro kritické spojení aby se zabránilo MITM útokům  

### **Stavové vs. Bezstavové Zvážení**

**Pro Stavové implementace:**
- Sdílený stav session vyžaduje dodatečnou ochranu proti injektážním útokům  
- Správa session založená na frontách potřebuje ověření integrity  
- Více serverových instancí vyžaduje bezpečnou synchronizaci stavů session  

**Pro Bezstavové implementace:**
- Správa session pomocí JWT nebo podobných tokenů  
- Kryptografická validace integrity stavu session  
- Snížený povrch útoku, ale vyžaduje robustní validaci tokenů  

## 4. **AI-Specifické Bezpečnostní Kontroly**

**Řešená rizika OWASP MCP**:  
- [MCP06 - Prompt Injection přes kontextové náklady](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Poisoning nástrojů](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Command Injection a exekuce](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)  

### **Ochrana proti Prompt Injection**

**Integrace Microsoft Prompt Shields:**  
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
  
**Kontroly implementace:**
- **Sanitizace vstupu**: Komplexní validace a filtrování všech uživatelských vstupů  
- **Definice hranic obsahu**: Jasné oddělení systémových instrukcí a uživatelského obsahu  
- **Hierarchie instrukcí**: Správná priorita pravidel při konfliktu instrukcí  
- **Monitorování výstupu**: Detekce potenciálně škodlivých nebo manipulovaných výstupů  

### **Prevence poisoningu nástrojů**

**Rámec bezpečnosti nástrojů:**  
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
  
**Dynamická správa nástrojů:**
- **Schvalovací workflow**: Výslovný souhlas uživatele pro změny nástrojů  
- **Možnosti rollbacku**: Schopnost vrátit zpět předchozí verze nástrojů  
- **Audit změn**: Kompletní historie modifikací definice nástrojů  
- **Hodnocení rizik**: Automatizované vyhodnocení bezpečnostního stavu nástrojů  

## 5. **Prevence útoku zmateného zástupce**

### **Bezpečnost OAuth Proxy**

**Kontroly prevence útoků:**  
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
  
**Požadavky na implementaci:**
- **Ověření souhlasu uživatele**: Nikdy nevynechávejte obrazovky souhlasu při dynamické registraci klienta  
- **Validace Redirect URI**: Přísná validace založená na whitelistu cílů přesměrování  
- **Ochrana autorizačního kódu**: Krátkodobé kódy s vynucením jedinečného použití  
- **Ověření identity klienta**: Robustní validace přihlašovacích údajů a metadat klienta  

## 6. **Bezpečnost exekuce nástrojů**

### **Sandboxing a izolace**

**Izolace založená na kontejnerech:**  
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
  
**Izolace procesů:**
- **Oddělené kontexty procesů**: Každé spuštění nástroje v izolovaném procesním prostoru  
- **Mezi-procesní komunikace**: Bezpečné IPC mechanismy s validací  
- **Monitorování procesů**: Analýza chování za běhu a detekce anomálií  
- **Vynucování zdrojů**: Přísné limity na CPU, paměť a vstupně-výstupní operace  

### **Implementace nejmenších práv**

**Správa oprávnění:**  
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
  
## 7. **Kontroly bezpečnosti dodavatelského řetězce**

**Řešené riziko OWASP MCP**: [MCP04 - Útoky na dodavatelský řetězec](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Verifikace závislostí**

**Komplexní bezpečnost komponent:**  
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
  
### **Kontinuální monitorování**

**Detekce hrozeb dodavatelského řetězce:**
- **Monitorování stavu závislostí**: Kontinuální hodnocení všech závislostí z hlediska bezpečnostních problémů  
- **Integrace threat intelligence**: Aktualizace v reálném čase o nových hrozbách dodavatelského řetězce  
- **Behaviorální analýza**: Detekce neobvyklého chování externích komponent  
- **Automatická reakce**: Okamžité zadržení kompromitovaných komponent  

## 8. **Kontroly monitorování a detekce**

**Řešené riziko OWASP MCP**: [MCP08 - Nedostatek auditu a telemetrie](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Bezpečnostní informace a správa událostí (SIEM)**

**Komplexní strategie logování:**  
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
  
### **Detekce hrozeb v reálném čase**

**Behaviorální analytika:**
- **Analýza chování uživatelů (UBA)**: Detekce neobvyklých vzorů přístupu uživatelů  
- **Analýza chování entit (EBA)**: Monitorování chování MCP serverů a nástrojů  
- **Strojové učení pro detekci anomálií**: AI-poháněná identifikace bezpečnostních hrozeb  
- **Korelace threat intelligence**: Porovnání pozorovaných aktivit s známými vzory útoků  

## 9. **Reakce na incidenty a zotavení**

### **Automatizované reakce**

**Okamžité reakční kroky:**  
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
  
### **Forenzní schopnosti**

**Podpora vyšetřování:**
- **Zachování auditní stopy**: Neměnné logování s kryptografickou integritou  
- **Sbírání důkazů**: Automatizovaný sběr relevantních bezpečnostních artefaktů  
- **Rekonstrukce časové osy**: Podrobná sekvence událostí vedoucích k bezpečnostním incidentům  
- **Vyhodnocení dopadu**: Odhad rozsahu kompromitace a expozice dat  

## **Klíčové Principy Bezpečnostní Architektury**

### **Obrana v Hloubce**
- **Více vrstev bezpečnosti**: Žádný jediný bod selhání v bezpečnostní architektuře  
- **Redundantní kontroly**: Překrývající se bezpečnostní opatření pro kritické funkce  
- **Bezpečné výchozí mechanismy**: Bezpečné výchozí hodnoty při chybách nebo útocích  

### **Implementace Zero Trust**
- **Nikdy nedůvěřuj, vždy ověřuj**: Kontinuální validace všech entit a požadavků  
- **Princip nejmenšího privilegia**: Minimální přístupová práva pro všechny komponenty  
- **Mikrosegmentace**: Granulární kontrola sítě a přístupů  

### **Kontinuální vývoj bezpečnosti**
- **Adaptace na hrozby**: Pravidelné aktualizace reagující na nové hrozby  
- **Efektivita bezpečnostních kontrol**: Průběžné hodnocení a zlepšování kontrol  
- **Soulad se specifikací**: Soulad s vývojem bezpečnostních standardů MCP  

---

## **Zdroje pro Implementaci**

### **Oficiální Dokumentace MCP**
- [Specifikace MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Bezpečnostní Nejlepší Praxe](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Specifikace MCP Autorizace](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Bezpečnostní Zdroje OWASP MCP**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komplexní OWASP MCP Top 10 s implementací v Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficiální OWASP MCP bezpečnostní rizika  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktický bezpečnostní trénink MCP na Azure  

### **Microsoft Bezpečnostní Řešení**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Bezpečnostní Standardy**
- [OAuth 2.0 Bezpečnostní Nejlepší Praxe (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 pro Velké Jazykové Modely](https://genai.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **Důležité**: Tyto bezpečnostní kontroly odráží aktuální specifikaci MCP (2025-11-25). Vždy ověřujte podle nejnovější [oficiální dokumentace](https://spec.modelcontextprotocol.io/), protože standardy se rychle vyvíjejí.

## Co dál

- Návrat na: [Přehled Bezpečnostního Modulu](./README.md)
- Pokračovat na: [Modul 3: Začínáme](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:  
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Původní dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje využít profesionální lidský překlad. Nejsme odpovědní za jakékoliv nedorozumění nebo chybné výklady vyplývající z použití tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->