# MCP Säkerhetskontroller - Uppdatering Februari 2026

> **Nuvarande standard**: Detta dokument återspeglar [MCP Specifikation 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) säkerhetskrav och officiella [MCP Säkerhetsbästa Praxis](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) har mognat avsevärt med förstärkta säkerhetskontroller som hanterar både traditionell programvarusäkerhet och AI-specifika hot. Detta dokument tillhandahåller omfattande säkerhetskontroller för säkra MCP-implementationer i linje med OWASP MCP Top 10-ramverket.

## 🏔️ Praktisk Säkerhetsträning

För praktisk, handgriplig erfarenhet av säkerhetsimplementering rekommenderar vi **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** – en omfattande guidad expedition för att säkra MCP-servrar i Azure med metodiken "sårbar → exploatera → åtgärda → validera".

Alla säkerhetskontroller i detta dokument är i enlighet med **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, som tillhandahåller referensarkitekturer och Azure-specifika implementationsanvisningar för OWASP MCP Top 10-risker.

## **OBLIGATORISKA Säkerhetskrav**

### **Kritiska Förbud från MCP Specifikation:**

> **FÖRBJUDET**: MCP-servrar **FÅR INTE** acceptera några tokens som inte uttryckligen har utfärdats för MCP-servern  
>  
> **FÖRBJUDET**: MCP-servrar **FÅR INTE** använda sessioner för autentisering  
>  
> **KRÄVS**: MCP-servrar som implementerar auktorisering **MÅSTE** verifiera ALLA inkommande förfrågningar  
>  
> **OBLIGATORISKT**: MCP-proxytjänster som använder statiska klient-ID:n **MÅSTE** inhämta användarsamtycke för varje dynamiskt registrerad klient

---

## 1. **Autentiserings- och Auktoriseringskontroller**

### **Integration av Extern Identitetsleverantör**

**Nuvarande MCP-standard (2025-11-25)** tillåter MCP-servrar att delegera autentisering till externa identitetsleverantörer, vilket utgör en betydande säkerhetsförbättring:

**OWASP MCP Risk Adresserad**: [MCP07 - Otillräcklig autentisering och auktorisering](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Säkerhetsfördelar:**  
1. **Eliminerar anpassade autentiseringsrisker**: Minskar angripbar yta genom att undvika egenutvecklade autentiseringslösningar  
2. **Företagsklassad säkerhet**: Utnyttjar etablerade identitetsleverantörer som Microsoft Entra ID med avancerade säkerhetsfunktioner  
3. **Centraliserad identitetshantering**: Förenklar användarhantering, åtkomstkontroll och revisionsspår  
4. **Multifaktorautentisering**: Ärver MFA-möjligheter från företagsidentitetsleverantörer  
5. **Villkorlig åtkomstpolicy**: Nyttjar riskbaserade åtkomstkontroller och adaptiv autentisering

**Implementeringskrav:**  
- **Validering av tokenpublik**: Verifiera att alla tokens uttryckligen är utfärdade för MCP-servern  
- **Utfärdarverifiering**: Kontrollera att tokenutfärdaren motsvarar förväntad identitetsleverantör  
- **Signaturverifiering**: Kryptografisk kontroll av tokenintegritet  
- **Upphörandehänsyn**: Strikt efterlevnad av tokenlivslängdsgränser  
- **Omfångsvalidering**: Säkerställ att tokens innehåller lämpliga åtkomsträttigheter för begärda operationer

### **Säkerhet för Auktoriseringslogik**

**Kritiska kontroller:**  
- **Omfattande auktoriseringsrevisioner**: Regelbundna säkerhetsgranskningar av alla auktoriseringspunkter  
- **Fail-safe-standarder**: Nekar åtkomst när auktoriseringslogiken inte kan fatta ett entydigt beslut  
- **Behörighetsgränser**: Tydlig uppdelning mellan olika privilegienivåer och resursåtkomst  
- **Revisionsloggning**: Fullständig loggning av alla auktoriseringsbeslut för säkerhetsövervakning  
- **Regelbundna åtkomstgranskningar**: Periodisk validering av användarrättigheter och privilegietilldelningar

## 2. **Token Säkerhet & Kontroller mot Genomkoppling**

**OWASP MCP Risk Adresserad**: [MCP01 - Tokenfelhantering och sekretessläckage](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Förebyggande av Token Genomkoppling**

**Token genomkoppling är uttryckligen förbjudet** i MCP Authorization Specification på grund av kritiska säkerhetsrisker:

**Säkerhetsrisker:**  
- **Omgång av kontroll**: Undviker viktiga säkerhetskontroller som hastighetsbegränsning, förfrågningsvalidering och trafikövervakning  
- **Ansvarsfrånkoppling**: Gör klientidentifiering omöjlig, vilket förstör revisionsspår och incidentutredning  
- **Proxybaserad Exfiltrering**: Gör det möjligt för illasinnade aktörer att använda servrar som proxys för obehörig dataåtkomst  
- **Brott mot Förtroendegränser**: Bryter underliggande tjänsters antaganden om tokenursprung  
- **Lateral Rörelse**: Komprometterade tokens i flera tjänster möjliggör bredare attacker

**Implementeringskontroller:**  
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
  
### **Säkra mönster för tokenhantering**

**Bästa praxis:**  
- **Kortlivade tokens**: Minimera exponeringstid genom frekvent rotation av tokens  
- **Just-in-time utfärdande**: Utfärda tokens endast när de behövs för specifika operationer  
- **Säker lagring**: Använd hårdvarusäkerhetsmoduler (HSM) eller säkra nyckelvalv  
- **Tokenbindning**: Bind tokens till specifika klienter, sessioner eller operationer där möjligt  
- **Övervakning och larm**: Realtidsdetektion av tokenmissbruk eller obehöriga åtkomstmönster

## 3. **Sessionssäkerhetskontroller**

### **Förebyggande av Sessionkapning**

**Angreppsvägar:**  
- **Sessionkapnings-promptinjektion**: Illasinnade händelser injiceras i delad sessionsstatus  
- **Sessionsimitation**: Obefogad användning av stulna sessions-ID för att undgå autentisering  
- **Återupptagbara Strömningsangrepp**: Utnyttjande av server-sända händelsers återupptagning för illasinnat innehållsinjektion

**Obligatoriska sessionkontroller:**  
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
  
**Transport Säkerhet:**  
- **TLS 1.3 genom HTTPS**: All sessionkommunikation ska ske över TLS 1.3  
- **Säkra cookieattribut**: HttpOnly, Secure, SameSite=Strict  
- **Certifikatbindning**: För kritiska anslutningar för att förhindra MITM-attacker

### **Stateful vs Stateless Överväganden**

**För Stateful-implementationer:**  
- Delad sessionsstatus kräver extra skydd mot injektionsangrepp  
- Köbaserad sessionhantering kräver integritetsverifiering  
- Flera serverinstanser kräver säker synkronisering av sessionstatus

**För Stateless-implementationer:**  
- JWT eller liknande tokenbaserad sessionhantering  
- Kryptografisk verifiering av sessionstillstånds integritet  
- Minskad angripbar yta men kräver robust tokenvalidering

## 4. **AI-Specifika Säkerhetskontroller**

**OWASP MCP Risker Adresserade:**  
- [MCP06 - Flödesundergrävning av instruktioner](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Verktygsförgiftning](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Kommandoinjektion och exekvering](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Försvar mot Promptinjektion**

**Microsoft Prompt Shields Integration:**  
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
  
**Implementeringskontroller:**  
- **Inmatningssanering**: Omfattande validering och filtrering av alla användarinmatningar  
- **Definition av innehållsgränser**: Tydlig separation mellan systeminstruktioner och användarinnehåll  
- **Instruktionshierarki**: Korrekt prioriteringsregler för motstridiga instruktioner  
- **Utdataövervakning**: Upptäckt av potentiellt skadligt eller manipulerat innehåll

### **Förebyggande av Verktygsförgiftning**

**Verktygssäkerhetsramverk:**  
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
  
**Dynamisk verktygshantering:**  
- **Godkännandeprocesser**: Uttryckligt användarsamtycke vid ändringar av verktyg  
- **Återställningsmöjligheter**: Förmåga att återgå till tidigare versioner av verktyg  
- **Ändringsrevidering**: Fullständig historik av ändringar i verktygsdefinitioner  
- **Riskbedömning**: Automatiserad utvärdering av verktygssäkerhet

## 5. **Förebyggande av “Confused Deputy”-attacker**

### **OAuth Proxy Säkerhet**

**Kontroller för att förebygga attacker:**  
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
  
**Implementeringskrav:**  
- **Verifiering av användarsamtycke**: Hoppa aldrig över samtyckesskärmar för dynamisk klientregistrering  
- **Validering av redirect URI**: Strikt vitlistbaserad kontroll av omdirigeringsmål  
- **Skydd av auktoriseringskod**: Kortlivade koder med engångsanvändning  
- **Verifiering av klientidentitet**: Robust validering av klientautentiseringsuppgifter och metadata

## 6. **Verktygsexekveringssäkerhet**

### **Sandlådor och Isolering**

**Containerbaserad isolering:**  
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
  
**Processisolering:**  
- **Separata processkontexter**: Varje verktyg exekveras i isolerat processutrymme  
- **IPC (Inter-Process Communication)**: Säkra IPC-mekanismer med validering  
- **Processövervakning**: Analys av körbeteende och anomalidetektion  
- **Resursbegränsningar**: Strikta gränser för CPU, minne och I/O-operationer

### **Implementering av Minsta Privilegium**

**Behörighetshantering:**  
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
  
## 7. **Supply Chain Säkerhetskontroller**

**OWASP MCP Risk Adresserad**: [MCP04 - Programvarusupply chain-attacker och manipuleringsberoenden](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Verifikation av beroenden**

**Omfattande komponentssäkerhet:**  
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
  
### **Kontinuerlig övervakning**

**Identifiering av hot mot leverantörskedjan:**  
- **Övervakning av beroendehälsa**: Kontinuerlig bedömning av alla beroenden för säkerhetsproblem  
- **Hotintelligensintegration**: Realtidsuppdateringar om nya hot i leverantörskedjan  
- **Beteendeanalys**: Upptäckt av ovanligt beteende i externa komponenter  
- **Automatiserad respons**: Omedelbar isolering av komprometterade komponenter

## 8. **Övervakning & Detektionskontroller**

**OWASP MCP Risk Adresserad**: [MCP08 - Brist på revision och telemetri](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **SIEM - Säkerhetsinformations- och Händelsehantering**

**Omfattande loggningsstrategi:**  
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
  
### **Hotdetektion i realtid**

**Beteendeanalys:**  
- **Användarbeteendeanalys (UBA)**: Upptäckt av avvikande användaråtkomstmönster  
- **Enhetsbeteendeanalys (EBA)**: Övervakning av MCP-server och verktygsbeteende  
- **Maskininlärningsbaserad anomalidetektion**: AI-driven identifiering av säkerhetshot  
- **Korrelationsanalys med hotintelligens**: Matchning av observerade aktiviteter mot kända attackmönster

## 9. **Incidenthantering & Återställning**

### **Automatiserade responsfunktioner**

**Omedelbara åtgärder:**  
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
  
### **Forensiska kapaciteter**

**Stöd för utredning:**  
- **Bevarande av revisionsspår**: Oföränderlig loggning med kryptografisk integritet  
- **Insamling av bevismaterial**: Automatiserad samling av relevanta säkerhetsartefakter  
- **Tidslinjeresynkronisering**: Detaljerad sekvens av händelser som leder till säkerhetsincidenter  
- **Konsekvensbedömning**: Utvärdering av omfattning av intrång och dataexponering

## **Viktiga principer för säkerhetsarkitektur**

### **Defense in Depth**  
- **Flera säkerhetslager**: Ingen enskild felpunkt i säkerhetsarkitekturen  
- **Redundanta kontroller**: Överlappande säkerhetsåtgärder för kritiska funktioner  
- **Fail-safe-mekanismer**: Säkra standardvärden vid systemfel eller attacker

### **Zero Trust-implementering**  
- **Lita aldrig på någon, verifiera alltid**: Kontinuerlig validering av alla enheter och förfrågningar  
- **Principen om minsta privilegium**: Minimala åtkomsträttigheter för alla komponenter  
- **Mikroseparation**: Granulära nätverks- och åtkomstkontroller

### **Kontinuerlig säkerhetsevolution**  
- **Anpassning till hotlandskapet**: Regelbundna uppdateringar för att hantera nya hot  
- **Effektivitet i säkerhetskontroller**: Löpande utvärdering och förbättring av kontroller  
- **Efterlevnad av specifikation**: Överensstämmelse med utvecklande MCP-säkerhetsstandarder

---

## **Implementeringsresurser**

### **Officiell MCP-dokumentation**  
- [MCP Specifikation (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP Säkerhetsbästa Praxis](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP Auktoriseringsspecifikation](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  

### **OWASP MCP Säkerhetsresurser**  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omfattande OWASP MCP Top 10 med Azure-implementering  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Officiella OWASP MCP säkerhetsrisker  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk säkerhetsträning för MCP på Azure  

### **Microsoft Säkerhetslösningar**  
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)  

### **Säkerhetsstandarder**  
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 för stora språkmodeller](https://genai.owasp.org/)  
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)  

---

> **Viktigt**: Dessa säkerhetskontroller återspeglar den nuvarande MCP-specifikationen (2025-11-25). Verifiera alltid mot den senaste [officiella dokumentationen](https://spec.modelcontextprotocol.io/) eftersom standarder snabbt utvecklas.

## Vad är nästa steg

- Återgå till: [Översikt säkerhetsmodul](./README.md)  
- Fortsätt till: [Modul 3: Komma igång](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->