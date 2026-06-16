# MCP Sikkerhedskontroller - Opdatering Februar 2026

> **Nuværende Standard**: Dette dokument afspejler [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) sikkerhedskrav og officielle [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) er blevet betydeligt mere moden med forbedrede sikkerhedskontroller, der adresserer både traditionel softwaresikkerhed og AI-specifikke trusler. Dette dokument indeholder omfattende sikkerhedskontroller for sikre MCP-implementeringer i overensstemmelse med OWASP MCP Top 10 rammeværket.

## 🏔️ Praktisk Sikkerhedstræning

For praktisk erfaring med sikkerhedsimplementering anbefaler vi **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - en omfattende guidet ekspedition til sikring af MCP-servere i Azure med en "sårbar → udnyttelse → fix → validering" metode.

Alle sikkerhedskontroller i dette dokument er i overensstemmelse med **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, som giver referencearkitekturer og Azure-specifikke implementeringsvejledninger for OWASP MCP Top 10 risiciene.

## **OBLIGATORISKE Sikkerhedskrav**

### **Kritiske Forbud fra MCP Specification:**

> **FORBUDT**: MCP-servere **MÅ IKKE** acceptere tokens, der ikke eksplicit er udstedt til MCP-serveren  
>
> **FORBUDT**: MCP-servere **MÅ IKKE** anvende sessioner til autentifikation  
>
> **KRÆVET**: MCP-servere, der implementerer autorisation, **SKAL** verificere ALLE indgående forespørgsler  
>
> **OBLIGATORISK**: MCP-proxyservere, der bruger statiske klient-ID’er, **SKAL** indhente brugerens samtykke for hver dynamisk registreret klient

---

## 1. **Autentifikations- & Autorisationskontroller**

### **Integration af Ekstern Identitetsudbyder**

**Nuværende MCP Standard (2025-11-25)** tillader MCP-servere at delegere autentifikation til eksterne identitetsudbydere, hvilket repræsenterer en betydelig sikkerhedsforbedring:

**OWASP MCP Risiko adresseret**: [MCP07 - Utilstrækkelig Autentifikation & Autorisation](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Sikkerhedsfordele:**  
1. **Eliminerer tilpassede autentifikationsrisici**: Reducerer sårbarhedsfladen ved at undgå brugerdefinerede autentifikationsimplementeringer  
2. **Enterprise-klasse sikkerhed**: Udnytter etablerede identitetsudbydere som Microsoft Entra ID med avancerede sikkerhedsfunktioner  
3. **Centraliseret identitetsstyring**: Forenkler brugerlivscyklusstyring, adgangskontrol og compliance audit  
4. **Multi-factor autentifikation**: Arver MFA-kapaciteter fra virksomhedens identitetsudbydere  
5. **Conditional Access-politikker**: Drager fordel af risikobaserede adgangskontroller og adaptiv autentifikation

**Implementeringskrav:**  
- **Validering af token-modtager**: Verificer at alle tokens eksplicit er udstedt til MCP-serveren  
- **Udstederverifikation**: Valider at tokenudsteder matcher den forventede identitetsudbyder  
- **Signaturverifikation**: Kryptografisk validering af tokenets integritet  
- **Udløbsstyring**: Streng håndhævelse af tokenets levetidsgrænser  
- **Scope-validering**: Sikre at tokens indeholder passende tilladelser til de ønskede handlinger

### **Sikkerhed i Autorisationslogik**

**Kritiske kontroller:**  
- **Omfattende autorisationsrevisionsgennemgange**: Regelmæssige sikkerhedsrevisioner af alle autorisationsbeslutningspunkter  
- **Fail-safe standarder**: Nægt adgang, hvis autorisationslogikken ikke kan træffe en entydig beslutning  
- **Tilladelsesgrænser**: Klar opdeling mellem forskellige privilegieniveauer og ressourceadgang  
- **Audit logging**: Fuldstændig logning af alle autorisationsbeslutninger til sikkerhedsovervågning  
- **Regelmæssige adgangsgennemgange**: Periodisk validering af brugerrettigheder og privilegietildelinger

## 2. **Token-sikkerhed & Anti-Passthrough Kontroller**

**OWASP MCP Risiko adresseret**: [MCP01 - Tokenfejl håndtering & Hemmelighedsafsløring](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Forebyggelse af Token Passthrough**

**Token passthrough er udtrykkeligt forbudt** i MCP Authorization Specification på grund af kritiske sikkerhedsrisici:

**Adresserede sikkerhedsrisici:**  
- **Kontrolomgåelse**: Omgår væsentlige sikkerhedskontroller som ratebegrænsning, forespørgselsvalidering og trafikovervågning  
- **Ansvarsforfald**: Umuliggør klientidentifikation og korrumperer revisionsspor og hændelsesundersøgelser  
- **Proxy-baseret dataudtræk**: Muliggør ondsindede aktører at bruge servere som proxyer til uautoriseret dataadgang  
- **Tillidsbrud i grænseområder**: Bryder antagelser om tokenets oprindelse hos nedstrøms tjenester  
- **Lateral bevægelse**: Kompromitterede tokens på tværs af flere tjenester muliggør bredere angrebsudvidelse

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
  
### **Mønstre for sikker tokenhåndtering**

**Bedste praksis:**  
- **Kortlivede tokens**: Minimer udsættelsestidspunkt med hyppig tokenrotation  
- **Just-in-time udstedelse**: Udsted tokens kun, når de er nødvendige til specifikke handlinger  
- **Sikker lagring**: Brug hardware-sikkerhedsmoduler (HSM'er) eller sikre nøglebunker  
- **Token binding**: Bind tokens til specifikke klienter, sessioner eller handlinger hvor muligt  
- **Overvågning & alarmering**: Realtidsdetektion af tokenmisbrug eller uautoriserede adgangsmønstre

## 3. **Sessionssikkerhedskontroller**

### **Forebyggelse af Session Hijacking**

**Angrebsvektorer adresseret:**  
- **Session hijack prompt-injektion**: Ondsindede begivenheder injiceret i delt sessionsstatus  
- **Session efterligning**: Uautoriseret brug af stjålne session-ID’er til at omgå autentifikation  
- **Genoptagelige stream-angreb**: Udnyttelse af server-sendte event-genoptagelser til ondsindet indholdsindsprøjtning

**Obligatoriske sessionskontroller:**  
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
  
**Transport sikkerhed:**  
- **HTTPS-håndhævelse**: Al sessionkommunikation over TLS 1.3  
- **Sikre cookieattributter**: HttpOnly, Secure, SameSite=Strict  
- **Certifikatspærring**: For kritiske forbindelser for at forhindre MITM-angreb

### **Stateful vs Stateless Overvejelser**

**For Stateful implementeringer:**  
- Delt sessionsstatus kræver ekstra beskyttelse mod injektionsangreb  
- Købaseret sessionstyring kræver integritetsverifikation  
- Flere serverinstanser kræver sikker sessionsstatus-synkronisering

**For Stateless implementeringer:**  
- JWT eller lignende tokenbaseret sessionstyring  
- Kryptografisk verifikation af sessionsstatus integritet  
- Reduceret angrebsflade, men kræver robust tokenvalidering

## 4. **AI-Specifikke Sikkerhedskontroller**

**OWASP MCP Risici adresseret**:  
- [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Tool Poisoning](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Command Injection & Execution](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Forsvar mod Prompt Injection**

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
- **Inputrensning**: Omfattende validering og filtrering af alle brugerinput  
- **Indholdsgrænse-definition**: Klar adskillelse mellem systeminstruktioner og brugerindhold  
- **Instruktionshierarki**: Korrekte præcedensregler for modstridende instruktioner  
- **Outputovervågning**: Detektion af potentielt skadelige eller manipulerede output

### **Forebyggelse af Tool Poisoning**

**Tool Security Framework:**  
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
  
**Dynamisk tool-administration:**  
- **Godkendelsesworkflows**: Udtrykkeligt bruger-samtykke ved værktøjsændringer  
- **Rollback-funktioner**: Mulighed for at rulle tilbage til tidligere versioner af værktøjer  
- **Ændringsrevision**: Fuld historik over ændringer i værktøjsdefinitioner  
- **Risikovurdering**: Automatisk evaluering af tool-sikkerhedsstilling

## 5. **Forebyggelse af Confused Deputy Angreb**

### **OAuth Proxy Sikkerhed**

**Angrebsforebyggende kontroller:**  
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
- **Brugersamtykke verifikation**: Spring aldrig samtykkeskærme over ved dynamisk klientregistrering  
- **Redirect URI validering**: Streng whitelist-baseret validering af redirect-destinationer  
- **Beskyttelse af autorisationskoder**: Kortvarige koder med enkeltbrugsvilkår  
- **Verifikation af klientidentitet**: Robust validering af klientlegitimationsoplysninger og metadata

## 6. **Sikkerhed ved Eksekvering af Værktøjer**

### **Sandboxing & Isolation**

**Containerbaseret isolation:**  
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
  
**Procesisolation:**  
- **Separate proceskontekster**: Hver værktøjsudførelse i isoleret procesrum  
- **Inter-proces kommunikation**: Sikre IPC-mekanismer med validering  
- **Procesovervågning**: Kørselsadfærdsanalyse og anomalidetektion  
- **Ressourcehåndhævelse**: Stramme grænser for CPU, hukommelse og I/O-operationer

### **Implementering af Mindste Privilegium**

**Tilladelsesstyring:**  
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
  
## 7. **Sikkerhedskontroller for Leverandørkæden**

**OWASP MCP Risiko adresseret**: [MCP04 - Software Leverandørkædeangreb & Afhængighedstampering](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Afhængighedsverifikation**

**Omfattende komponent-sikkerhed:**  
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
  
### **Kontinuerlig Overvågning**

**Trusseldetektion i leverandørkæden:**  
- **Afhængighedshelbredsmonitorering**: Kontinuerlig vurdering af alle afhængigheder for sikkerhedsproblemer  
- **Trusselsintelligensintegration**: Realtidsopdateringer om nye trusler i leverandørkæden  
- **Adfærdsanalyse**: Detektion af usædvanlig adfærd i eksterne komponenter  
- **Automatisk respons**: Øjeblikkelig indeslutning af kompromitterede komponenter

## 8. **Overvågnings- & Detektionskontroller**

**OWASP MCP Risiko adresseret**: [MCP08 - Manglende Revision og Telemetri](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Security Information and Event Management (SIEM)**

**Omfattende loggingsstrategi:**  
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
  
### **Realtidstrusseldetektion**

**Adfærdsanalyse:**  
- **User Behavior Analytics (UBA)**: Detektion af usædvanlige brugeradgangsmønstre  
- **Entity Behavior Analytics (EBA)**: Overvågning af MCP-server og værktøjsadfærd  
- **Maskinlæringsbaseret anomalidetektion**: AI-drevet identifikation af sikkerhedstrusler  
- **Trusselsintelligenskorrelation**: Sammenkobling af observerede aktiviteter med kendte angrebsmønstre

## 9. **Hændelsesrespons & Genopretning**

### **Automatiske Responsmuligheder**

**Øjeblikkelige reaktionstiltag:**  
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
  
### **Rettsmedicinske kapaciteter**

**Undersøgelsesstøtte:**  
- **Bevaring af revisionsspor**: Uforanderlig logning med kryptografisk integritet  
- **Bevisindsamling**: Automatisk indsamling af relevante sikkerhedsartefakter  
- **Tidslinjegenskabelse**: Detaljeret sekvens af hændelser som førte til sikkerhedshændelser  
- **Konsekvensvurdering**: Vurdering af omfang af kompromittering og dataeksponering

## **Nøgler til Sikkerhedsarkitekturprincipper**

### **Forsvar i Dybden**  
- **Flere sikkerhedslag**: Ingen enkelt fejlpunkt i sikkerhedsarkitekturen  
- **Redundante kontroller**: Overlappende sikkerhedsforanstaltninger for kritiske funktioner  
- **Fail-safe mekanismer**: Sikre standarder ved systemfejl eller angreb

### **Zero Trust Implementering**  
- **Aldrig stole på, altid verificere**: Løbende validering af alle enheder og forespørgsler  
- **Mindste privilegiumsprincippet**: Minimale adgangsrettigheder til alle komponenter  
- **Mikrosegmentering**: Granulær netværks- og adgangskontrol

### **Kontinuerlig Sikkerhedsevolution**  
- **Tilpasning til trusselslandskabet**: Regelmæssige opdateringer for at håndtere nye trusler  
- **Evaluering af kontrolers effektivitet**: Løbende vurdering og forbedring af kontroller  
- **Overholdelse af standarder**: Justering til MCP sikkerhedsstandarder i udvikling

---

## **Implementeringsressourcer**

### **Officiel MCP Dokumentation**  
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP Sikkerhedsressourcer**  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omfattende OWASP MCP Top 10 med Azure-implementering  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Officielle OWASP MCP sikkerhedsrisici  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk sikkerhedstræning for MCP på Azure

### **Microsoft Sikkerhedsløsninger**  
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Sikkerhedsstandarder**  
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)  
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **Vigtigt**: Disse sikkerhedskontroller afspejler den nuværende MCP-specifikation (2025-11-25). Verificer altid imod den nyeste [officielle dokumentation](https://spec.modelcontextprotocol.io/), da standarderne udvikler sig hurtigt.

## Hvad er Næste Skridt

- Gå tilbage til: [Security Module Overview](./README.md)  
- Fortsæt til: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->