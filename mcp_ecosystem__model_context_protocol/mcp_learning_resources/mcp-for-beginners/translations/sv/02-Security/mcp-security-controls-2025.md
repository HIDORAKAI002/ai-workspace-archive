# MCP Säkerhetskontroller - Februari 2026 Uppdatering

> **Aktuell Standard**: Detta dokument speglar [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) säkerhetskrav och officiella [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) har mognat avsevärt med förbättrade säkerhetskontroller som adresserar både traditionell mjukvarusäkerhet och AI-specifika hot. Detta dokument tillhandahåller omfattande säkerhetskontroller för säkra MCP-implementeringar i linje med OWASP MCP Top 10-ramverket.

## 🏔️ Praktisk Säkerhetsträning

För praktisk, handgriplig säkerhetsimplementeringsupplevelse rekommenderar vi **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - en omfattande guidad expedition för att säkra MCP-servrar i Azure med metodiken "sårbar → utnyttja → åtgärda → validera".

Alla säkerhetskontroller i detta dokument är i linje med **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, som tillhandahåller referensarkitekturer och Azure-specifik implementeringsvägledning för OWASP MCP Top 10 risker.

## **OBLIGATORISKA Säkerhetskrav**

### **Kritiska Förbud från MCP Specification:**

> **FÖRBJUDET**: MCP-servrar **FÅR INTE** acceptera några tokens som inte uttryckligen utfärdats för MCP-servern  
>  
> **FÖRBJUDET**: MCP-servrar **FÅR INTE** använda sessionshantering för autentisering  
>  
> **KRÄVD**: MCP-servrar som implementerar auktorisation **MÅSTE** verifiera ALLA inkommande förfrågningar  
>  
> **OBLIGATORISKT**: MCP-proxys som använder statiska klient-ID:n **MÅSTE** inhämta användarsamtycke för varje dynamiskt registrerad klient

---

## 1. **Autentisering & Auktoriseringskontroller**

### **Integration med Extern Identitetsleverantör**

**Aktuell MCP Standard (2025-11-25)** tillåter MCP-servrar att delegera autentisering till externa identitetsleverantörer, vilket utgör en betydande säkerhetsförbättring:

**OWASP MCP Risk som Adresseras**: [MCP07 - Otillräcklig autentisering och auktorisering](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Säkerhetsfördelar:**
1. **Eliminerar Anpassade Autentiseringsrisker**: Minskar sårbarhetsytan genom att undvika anpassade autentiseringsimplementeringar  
2. **Företagsklassad Säkerhet**: Utnyttjar etablerade identitetsleverantörer som Microsoft Entra ID med avancerade säkerhetsfunktioner  
3. **Centraliserad Identitetshantering**: Förenklar användarlivscykelhantering, åtkomstkontroll och regelefterlevnadsrevisioner  
4. **Multifaktorautentisering**: Ärver MFA-funktioner från företagsidentitetsleverantörer  
5. **Villkorliga Åtkomstpolicyer**: Drar nytta av riskbaserade åtkomstkontroller och adaptiv autentisering

**Implementeringskrav:**
- **Validering av Token-målgrupp**: Verifiera att alla tokens är uttryckligen utfärdade för MCP-servern  
- **Utfärdargaranti**: Validera att tokenutfärdaren matchar förväntad identitetsleverantör  
- **Signaturverifiering**: Kryptografisk validering av tokens integritet  
- **Tidsgränsers Efterlevnad**: Strikt efterlevnad av tokenens giltighetstid  
- **Behörighetsvalidering**: Säkerställ att tokens innehåller lämpliga rättigheter för begärda operationer

### **Auktoriseringslogiksäkerhet**

**Kritiska Kontroller:**
- **Omfattande Auktoriseringsrevisioner**: Regelbundna säkerhetsgranskningar av alla auktoriseringsbeslut  
- **Fail-Safe Standarder**: Nekar åtkomst när auktoriseringslogiken inte kan ta ett entydigt beslut  
- **Behörighetsgränser**: Tydlig åtskillnad mellan olika privilegienivåer och resursåtkomst  
- **Revisionsloggning**: Komplett loggning av alla auktoriseringsbeslut för säkerhetsövervakning  
- **Regelbundna Åtkomstgranskningar**: Periodisk validering av användarrättigheter och privilegieuppdrag

## 2. **Tokensäkerhet & Anti-Passthrough Kontroller**

**OWASP MCP Risk som Adresseras**: [MCP01 - Felhantering av tokens & Exponering av hemligheter](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Förebyggande av Token Passthrough**

**Token passthrough är uttryckligen förbjudet** i MCP Authorization Specification på grund av kritiska säkerhetsrisker:

**Säkerhetsrisker som Adresseras:**
- **Undandragning av Kontroller**: Omgår viktiga säkerhetskontroller som begränsning av förfrågningsfrekvens, validering av förfrågningar och trafikövervakning  
- **Bristande Ansvarighet**: Gör klientidentifiering omöjlig och förstör revisionsspår samt incidentutredning  
- **Proxy-baserad Exfiltrering**: Möjliggör för illvilliga aktörer att använda servrar som proxys för obehörig dataåtkomst  
- **Brott mot Trovärdighetsgränser**: Bryter nedströms tjänsters antaganden om tokenursprung  
- **Laterala Rörelser**: Komprometterade tokens över flera tjänster möjliggör bredare attacker

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

### **Säkra Mönster för Tokenhantering**

**Bästa praxis:**
- **Kortlivade Tokens**: Minimera exponeringstid med frekvent tokenrotation  
- **Utfärdande Just-in-Time**: Utfärda tokens endast vid behov för specifika operationer  
- **Säker Lagring**: Använd hårdvarusäkerhetsmoduler (HSM) eller säkra nyckelförråd  
- **Tokenbindning**: Binda tokens till specifika klienter, sessioner eller operationer där möjligt  
- **Övervakning & Larm**: Realtidsdetektering av tokenmissbruk eller obehöriga åtkomstmönster

## 3. **Sessionssäkerhetskontroller**

### **Förebyggande av Sessionskapning**

**Angreppsvägar som Adresseras:**
- **Injektionsangrepp i Sessioner**: Illvilliga händelser injiceras i delat sessionsläge  
- **Sessionsförklädnad**: Obehörig användning av stulna sessions-ID för att kringgå autentisering  
- **Återupptagbara Strömmars Attacker**: Utnyttjande av server-sända händelsers återupptagning för illvillig innehållsinjektion

**Obligatoriska Sessionskontroller:**
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
- **HTTPS-krav**: All sessionskommunikation över TLS 1.3  
- **Säkra Cookie-Attribut**: HttpOnly, Secure, SameSite=Strict  
- **Certifikatsporring**: För kritiska anslutningar för att förhindra MITM-attacker

### **Hänsyn till Stateful vs Stateless**

**För Stateful-implementeringar:**
- Delat sessionsläge kräver extra skydd mot injektionsangrepp  
- Köbaserad sessionshantering behöver integritetsverifiering  
- Flera serverinstanser kräver säker synkronisering av sessionsläge

**För Stateless-implementeringar:**
- JWT eller liknande tokenbaserad sessionshantering  
- Kryptografisk verifiering av sessionslägets integritet  
- Minskad angripsyta men kräver robust tokenvalidering

## 4. **AI-Specifika Säkerhetskontroller**

**OWASP MCP Risker som Adresseras**:  
- [MCP06 - Prompt Injection via Contextual Payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Verktygsförgiftning](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Kommandoinjicering & Exekvering](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Försvar mot Prompt Injection**

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
- **Inmatningssanering**: Omfattande validering och filtrering av all användarinmatning  
- **Definiering av Innehållsgränser**: Tydlig åtskillnad mellan systeminstruktioner och användarinnehåll  
- **Instruktionshierarki**: Korrekt prioriteringsordning för konfliktfyllda instruktioner  
- **Utdataövervakning**: Upptäckt av potentiellt skadliga eller manipulerade utskrifter

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

**Dynamisk Verktygshantering:**
- **Godkännandeflöden**: Uttryckligt användarsamtycke för verktygsändringar  
- **Återställningsmöjligheter**: Möjlighet att återgå till tidigare verktygsversioner  
- **Ändringsrevision**: Komplett historik över ändringar i verktygsdefinitioner  
- **Riskbedömning**: Automatisk utvärdering av verktygssäkerhetsstatus

## 5. **Förebyggande av Confused Deputy-attacker**

### **OAuth Proxy Säkerhet**

**Angreppsförebyggande kontroller:**
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
- **Verifiering av Användarsamtycke**: Hoppa aldrig över samtyckesskärmar vid dynamisk klientregistrering  
- **Validering av Redirect URI**: Strikt vitlistbaserad validering av omdirigeringsmål  
- **Skydd av Auktoriseringskod**: Kortlivade koder med engångsanvändning  
- **Verifiering av Klientidentitet**: Robust validering av klientuppgifter och metadata

## 6. **Verktygsexekveringssäkerhet**

### **Sandlåda & Isolering**

**Containerbaserad Isolering:**
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
- **Separata Processkontexter**: Varje verktygsexekvering i isolerad processmiljö  
- **Interprocesskommunikation**: Säkrade IPC-mekanismer med validering  
- **Processövervakning**: Analys av körbeteende och anomalidetektion  
- **Resursreglering**: Hårda begränsningar på CPU, minne och I/O-operationer

### **Principen om Minsta Privilegium**

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

## 7. **Säkerhet i Leveranskedjan**

**OWASP MCP Risk som Adresseras**: [MCP04 - Angrepp mot leveranskedjan](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Verifiering av Beroenden**

**Omfattande Komponentssäkerhet:**
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

### **Kontinuerlig Övervakning**

**Hotdetektering i Leveranskedjan:**
- **Övervakning av Beroenden**: Kontinuerlig bedömning av alla beroenden för säkerhetsproblem  
- **Integrering av Hotintelligens**: Realtidsuppdateringar om nya hot mot leveranskedjan  
- **Beteendeanalys**: Upptäckt av ovanligt beteende i externa komponenter  
- **Automatiserat Svar**: Omedelbar inneslutning av komprometterade komponenter

## 8. **Övervaknings- & Detektionskontroller**

**OWASP MCP Risk som Adresseras**: [MCP08 - Brist på revision & telemetri](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Säkerhetsinformations- och Händelsehantering (SIEM)**

**Omfattande Loggningsstrategi:**
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

### **Realtids Detektion av Hot**

**Beteendeanalys:**
- **User Behavior Analytics (UBA)**: Upptäckt av ovanliga användarmönster  
- **Entity Behavior Analytics (EBA)**: Övervakning av MCP-server och verktygsbeteende  
- **Maskininlärningsbaserad Anomalidetektion**: AI-drivna identifieringar av säkerhetshot  
- **Hotintelligenskorrelation**: Matchning av observerade aktiviteter mot kända attacker

## 9. **Incidenthantering & Återställning**

### **Automatiserade Responsmöjligheter**

**Omedelbara Responsåtgärder:**
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

### **Forensiska Möjligheter**

**Stöd för Utredning:**
- **Bevarande av Revisionsspår**: Oföränderliga loggar med kryptografisk integritet  
- **Bevisinsamling**: Automatisk insamling av relevanta säkerhetsartefakter  
- **Tidslinjerekonstruktion**: Detaljerad händelsesequens vid säkerhetsincidenter  
- **Påverkansbedömning**: Utvärdering av kompromissnivå och dataexponering

## **Viktiga Säkerhetsarkitekturprinciper**

### **Defense in Depth**  
- **Flera Säkerhetslager**: Ingen enskild felpunkt i säkerhetsarkitekturen  
- **Redundanta Kontroller**: Överlappande säkerhetsåtgärder för kritiska funktioner  
- **Fail-Safe Mekanismer**: Säker standardinställning vid fel eller attacker

### **Implementering av Zero Trust**  
- **Lita Aldrig, Verifiera Alltid**: Kontinuerlig validering av alla entiteter och förfrågningar  
- **Principen om Minsta Privilegium**: Minsta möjliga åtkomsträttigheter för alla komponenter  
- **Micro-Segmentation**: Granulär nätverks- och åtkomstkontroll

### **Kontinuerlig Säkerhetsevolution**  
- **Anpassning till Hotlandskapet**: Regelbundna uppdateringar för att hantera nya hot  
- **Effektivitet i Säkerhetskontroller**: Ongoing utvärdering och förbättring av kontroller  
- **Specifikations-efterlevnad**: Anpassning till utvecklande MCP-säkerhetsstandarder

---

## **Implementeringsresurser**

### **Officiell MCP Dokumentation**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

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

> **Viktigt**: Dessa säkerhetskontroller speglar den aktuella MCP-specifikationen (2025-11-25). Verifiera alltid mot den senaste [officiella dokumentationen](https://spec.modelcontextprotocol.io/) eftersom standarder snabbt utvecklas.

## Vad kommer härnäst

- Återvänd till: [Security Module Overview](./README.md)
- Fortsätt till: [Module 3: Komma igång](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var god observera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål ska betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår från användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->