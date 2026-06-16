# MCP Security Controls - Aktualizace únor 2026

> **Aktuální standard**: Tento dokument odráží bezpečnostní požadavky [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) a oficiální [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) se významně vyvinul s vylepšenými bezpečnostními kontrolami, které řeší jak tradiční softwarovou bezpečnost, tak specifické hrozby AI. Tento dokument poskytuje komplexní bezpečnostní kontroly pro zabezpečené implementace MCP v souladu s rámcem OWASP MCP Top 10.

## 🏔️ Praktický bezpečnostní výcvik

Pro praktické zkušenosti s implementací bezpečnosti doporučujeme **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** – komplexní vedenou expedici za zabezpečením MCP serverů v Azure pomocí metodiky „zranitelnost → exploit → oprava → validace“.

Všechny bezpečnostní kontroly v tomto dokumentu jsou v souladu s **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, který poskytuje referenční architektury a pokyny k implementaci specifické pro Azure pro rizika OWASP MCP Top 10.

## **POVINNÉ bezpečnostní požadavky**

### **Kritické zákazy z MCP Specification:**

> **ZAKÁZÁNO**: MCP servery **NESMÍ** přijímat žádné tokeny, které nebyly explicitně vydány pro MCP server  
>
> **PROHIBOVÁNO**: MCP servery **NESMÍ** používat sessions pro autentizaci  
>
> **POŽADOVÁNO**: MCP servery implementující autorizaci **MUSÍ** ověřovat VŠECHNY příchozí požadavky  
>
> **POVINNÉ**: MCP proxy servery používající statická klientská ID **MUSÍ** získat souhlas uživatele pro každého dynamicky registrovaného klienta

---

## 1. **Kontroly autentizace a autorizace**

### **Integrace externího poskytovatele identity**

**Aktuální standard MCP (2025-11-25)** umožňuje MCP serverům delegovat autentizaci na externí poskytovatele identity, což představuje významné bezpečnostní zlepšení:

**Řešené riziko OWASP MCP**: [MCP07 - Nedostatečná autentizace a autorizace](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Bezpečnostní přínosy:**
1. **Eliminace rizik vlastních autentizací**: Snižuje zranitelnost díky vyhnutí se vlastním implementacím autentizace  
2. **Podniková úroveň zabezpečení**: Využívá zavedené poskytovatele identity jako Microsoft Entra ID s pokročilými bezpečnostními funkcemi  
3. **Centralizovaná správa identity**: Zjednodušuje správu životního cyklu uživatelů, přístupová práva a audit shody  
4. **Vícefaktorová autentizace**: Dědí možnosti MFA od podnikových poskytovatelů identity  
5. **Podmíněné přístupové politiky**: Využití řízení přístupu založeného na riziku a adaptivní autentizace  

**Požadavky na implementaci:**
- **Ověření cílového publika tokenu**: Ověřit, že všechny tokeny jsou explicitně vydány pro MCP server  
- **Ověření vydavatele**: Validovat, že vydavatel tokenu odpovídá očekávanému poskytovateli identity  
- **Ověření podpisu**: Kryptografická validace integrity tokenu  
- **Vynucení expirace**: Přísné dodržování životnosti tokenu  
- **Ověření oprávnění (scope)**: Zajistit, že tokeny obsahují odpovídající oprávnění k požadovaným operacím  

### **Bezpečnost logiky autorizace**

**Kritické kontroly:**
- **Komplexní audity autorizace**: Pravidelné bezpečnostní kontroly všech rozhodovacích bodů autorizace  
- **Výchozí bezpečné chování (fail-safe)**: Zamítnout přístup, pokud není možné rozhodnout o autorizaci  
- **Hranice oprávnění**: Jasné oddělení mezi různými úrovněmi oprávnění a přístupu k prostředkům  
- **Záznam auditů**: Kompletní protokolování všech rozhodnutí o autorizaci pro bezpečnostní monitoring  
- **Pravidelné přehodnocení přístupů**: Periodická validace uživatelských oprávnění a přiřazení privilegií  

## 2. **Bezpečnost tokenů a kontroly proti passthrough**

**Řešené riziko OWASP MCP**: [MCP01 - Špatná správa tokenů a únik tajemství](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Prevence passthrough tokenů**

**Passthrough tokenů je explicitně zakázán** v MCP Authorization Specification kvůli kritickým bezpečnostním rizikům:

**Řešená bezpečnostní rizika:**
- **Obcházení kontrol**: Překračuje klíčové bezpečnostní kontroly jako omezení rychlosti, validace požadavků a monitorování provozu  
- **Prolomení odpovědnosti**: Ztěžuje identifikaci klienta, tím poškozuje auditní stopy a vyšetřování incidentů  
- **Exfiltrace přes proxy**: Umožňuje útočníkům používat servery jako proxy pro neoprávněný přístup k datům  
- **Porušení důvěry boundary**: Narušuje důvěryhodné předpoklady downstream služeb o původu tokenů  
- **Boční pohyb**: Kompromitované tokeny umožňují širší rozšíření útoku napříč službami  

**Kontroly implementace:**
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

### **Vzorové postupy bezpečné správy tokenů**

**Doporučené postupy:**
- **Krátkodobé tokeny**: Minimalizovat dobu expozice častou rotací tokenů  
- **Vydávání právě včas (Just-in-Time)**: Vydávat tokeny jen pro konkrétní operace a v momentě potřeby  
- **Bezpečné uložení**: Používat hardwarové bezpečnostní moduly (HSM) nebo zabezpečené klíčové trezory  
- **Vazba tokenů**: Pokud možno vázat tokeny na konkrétní klienty, sessions nebo operace  
- **Monitoring a alarmy**: Detekce zneužití tokenů a neoprávněného přístupu v reálném čase  

## 3. **Kontroly bezpečnosti session**

### **Prevence session hijackingu**

**Řešené vektory útoku:**
- **Vkládání podvodných událostí do session (Prompt Injection)**: Zlovolné události vložené do sdíleného stavového prostoru session  
- **Záměna identity v session (Impersonation)**: Neoprávněné použití ukradených session ID k obcházení autentizace  
- **Útoky na obnovu streamu**: Zneužití obnovování server-sent eventů k injektování škodlivého obsahu  

**Povinné kontroly session:**
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
- **Vynucení HTTPS**: Veškerá komunikace session přes TLS 1.3  
- **Bezpečné atributy cookie**: HttpOnly, Secure, SameSite=Strict  
- **Pinning certifikátů**: Pro kritická připojení, zabránění MITM útokům  

### **Porovnání stavového a bezstavového přístupu**

**Pro stavové implementace:**
- Sdílený stav session vyžaduje dodatečnou ochranu proti injekčním útokům  
- Správa session založená na frontách vyžaduje verifikaci integrity  
- Více serverových instancí vyžaduje synchronizaci stavů session bezpečným způsobem  

**Pro bezstavové implementace:**
- Řízení session pomocí JWT nebo podobných tokenů  
- Kryptografická validace integrity session stavu  
- Snížená plocha útoku, ale vyžaduje robustní validaci tokenů  

## 4. **Bezpečnostní kontroly specifické pro AI**

**Řešená rizika OWASP MCP**:  
- [MCP06 - Subverze toku požadavků (Intent Flow Subversion)](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Otrávení nástrojů (Tool Poisoning)](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Injection a exekuce příkazů](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

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
- **Sanitizace vstupů**: Komplexní validace a filtrování všech uživatelských vstupů  
- **Definice hranic obsahu**: Jasné oddělení systémových instrukcí a uživatelského obsahu  
- **Hierarchie instrukcí**: Správná precedence pravidel pro konfliktní instrukce  
- **Monitoring výstupu**: Detekce potenciálně škodlivých nebo zmanipulovaných výstupů  

### **Prevence otrávení nástrojů**

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
  
**Dynamické řízení nástrojů:**  
- **Schvalovací workflow**: Explicitní souhlas uživatele při modifikaci nástrojů  
- **Možnost návratu zpět**: Schopnost vrátit se k předchozí verzi nástroje  
- **Audit změn**: Kompletní historie modifikací definic nástrojů  
- **Hodnocení rizik**: Automatizované vyhodnocení bezpečnostní situace nástrojů  

## 5. **Prevence útoku Confused Deputy**

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
- **Ověření souhlasu uživatele**: Nikdy přeskočit obrazovky souhlasu při dynamické registraci klienta  
- **Validace Redirect URI**: Přísná whitelistová validace cílových přesměrování  
- **Ochrana Autorizačních kódů**: Krátkodobé kódy s vynucením jednorázovosti  
- **Ověření identity klienta**: Robustní validace klientských přihlašovacích údajů a metadat  

## 6. **Bezpečnost exekuce nástrojů**

### **Sandboxing a izolace**

**Izolace na bázi kontejnerů:**  
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
- **Oddělené kontexty procesů**: Každé spuštění nástroje v izolovaném procesovém prostoru  
- **Meziprocesová komunikace**: Bezpečné IPC mechanismy s validací  
- **Monitorování procesů**: Analýza chování za běhu a detekce anomálií  
- **Vynucení zdrojů**: Přísné limity na CPU, paměť a I/O operace  

### **Implementace principu nejmenšího privilegia**

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
  
## 7. **Bezpečnost dodavatelského řetězce**

**Řešené riziko OWASP MCP**: [MCP04 - Útoky na dodavatelský řetězec softwaru a manipulace se závislostmi](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Ověření závislostí**

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
  
### **Kontinuální monitoring**

**Detekce hrozeb v dodavatelském řetězci:**  
- **Monitorování stavu závislostí**: Průběžné hodnocení všech závislostí na bezpečnostní problémy  
- **Integrace zpravodajství o hrozbách**: Aktuální informace o nových hrozbách dodavatelského řetězce  
- **Behaviorální analýza**: Detekce neobvyklého chování externích komponent  
- **Automatická reakce**: Okamžité zamezení šíření kompromitovaných komponent  

## 8. **Kontroly monitoringu a detekce**

**Řešené riziko OWASP MCP**: [MCP08 - Nedostatek auditu a telemetrie](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Správa informací o bezpečnosti a událostech (SIEM)**

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

**Behaviorální analýzy:**  
- **User Behavior Analytics (UBA)**: Detekce neobvyklých přístupových vzorů uživatelů  
- **Entity Behavior Analytics (EBA)**: Monitoring chování MCP serveru a nástrojů  
- **Detekce anomálií strojovým učením**: AI-poháněné identifikace bezpečnostních hrozeb  
- **Korelace zpravodajství o hrozbách**: Porovnání pozorovaných aktivit s známými vzory útoků  

## 9. **Reakce na incidenty a obnovy**

### **Automatizované reakční schopnosti**

**Okamžité reakce:**  
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
- **Zachování auditní stopy**: Neměnné protokolování s kryptografickou integritou  
- **Sbírání důkazů**: Automatizované shromažďování relevantních bezpečnostních artefaktů  
- **Rekonstrukce časové osy**: Detailní sekvence událostí předcházejících bezpečnostním incidentům  
- **Hodnocení dopadů**: Vyhodnocení rozsahu kompromitace a expozice dat  

## **Klíčové principy bezpečnostní architektury**

### **Obrana do hloubky (Defense in Depth)**
- **Více vrstev bezpečnosti**: Žádný jedinečný bod selhání v bezpečnostní architektuře  
- **Redundantní kontroly**: Překrývající se bezpečnostní opatření pro kritické funkce  
- **Fail-safe mechanismy**: Bezpečné výchozí hodnoty při chybách nebo útocích  

### **Implementace Zero Trust**
- **Nikdy nedůvěřuj, vždy ověřuj**: Neustálá validace všech entit a požadavků  
- **Princip nejmenšího privilegia**: Minimální přístupová práva pro všechny komponenty  
- **Mikrosegmentace**: Granulární síťové a přístupové kontroly  

### **Kontinuální vývoj bezpečnosti**
- **Adaptace na hrozby**: Pravidelné aktualizace reagující na vznikající rizika  
- **Efektivita bezpečnostních kontrol**: Průběžné hodnocení a zlepšování kontrol  
- **Soulad s normami**: Shoda s vyvíjejícími se standardy bezpečnosti MCP  

---

## **Zdroje pro implementaci**

### **Oficiální dokumentace MCP**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  

### **Zdroje OWASP MCP Security**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komplexní OWASP MCP Top 10 s implementací v Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficiální OWASP MCP bezpečnostní rizika  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktický bezpečnostní výcvik pro MCP na Azure  

### **Bezpečnostní řešení Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)  

### **Bezpečnostní standardy**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)  
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)  

---

> **Důležité**: Tyto bezpečnostní kontroly odráží aktuální specifikaci MCP (2025-11-25). Vždy ověřujte proti nejnovější [oficiální dokumentaci](https://spec.modelcontextprotocol.io/), protože standardy se rychle vyvíjejí.

## Co je dále

- Návrat na: [Přehled modulů bezpečnosti](./README.md)  
- Pokračovat na: [Modul 3: Začínáme](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->