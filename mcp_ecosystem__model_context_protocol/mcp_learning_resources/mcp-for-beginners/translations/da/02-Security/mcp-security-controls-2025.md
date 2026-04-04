# MCP Sikkerhedskontroller - Opdatering februar 2026

> **Nuværende Standard**: Dette dokument afspejler [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) sikkerhedskrav og officielle [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) er modnet betydeligt med forbedrede sikkerhedskontroller, der adresserer både traditionel softwaresikkerhed og AI-specifikke trusler. Dette dokument giver omfattende sikkerhedskontroller for sikre MCP-implementeringer i overensstemmelse med OWASP MCP Top 10-rammeværket.

## 🏔️ Praktisk Sikkerhedstræning

For praktisk, hands-on erfaring med sikkerhedsimplementering anbefaler vi **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - en omfattende guidet ekspedition til sikring af MCP-servere i Azure med en "sårbar → udnyttelse → rettelse → validering" metode.

Alle sikkerhedskontroller i dette dokument er i overensstemmelse med **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, som tilbyder referencearkitekturer og Azure-specifik implementeringsvejledning til OWASP MCP Top 10 risici.

## **OBLIGATORISKE Sikkerhedskrav**

### **Kritiske Forbud fra MCP Specification:**

> **FORBUDT**: MCP-servere **MÅ IKKE** acceptere nogen tokens, der ikke eksplicit er udstedt til MCP-serveren  
>
> **FORBUDT**: MCP-servere **MÅ IKKE** bruge sessions til godkendelse  
>
> **KRÆVET**: MCP-servere, der implementerer autorisation, **SKAL** verificere ALLE indgående anmodninger  
>
> **OBLIGATORISK**: MCP-proxyservere, der bruger statiske klient-id'er, **SKAL** indhente brugerens samtykke for hver dynamisk registreret klient

---

## 1. **Godkendelses- og Autorisationskontroller**

### **Integration af Ekstern Identitetsudbyder**

**Nuværende MCP Standard (2025-11-25)** tillader MCP-servere at delegere godkendelse til eksterne identitetsudbydere, hvilket udgør en betydelig sikkerhedsforbedring:

**OWASP MCP Risiko Adresseret**: [MCP07 - Utilstrækkelig Godkendelse & Autorisation](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Sikkerhedsfordele:**
1. **Eliminerer Risiko ved Tilpasset Godkendelse**: Mindsker angrebsfladen ved at undgå tilpassede godkendelsesimplementeringer  
2. **Virksomhedsklasse Sikkerhed**: Udnytter etablerede identitetsudbydere som Microsoft Entra ID med avancerede sikkerhedsfunktioner  
3. **Centraliseret Identitetsstyring**: Forenkler brugerens livscyklusadministration, adgangskontrol og revisionssporing  
4. **Multi-Faktor Godkendelse**: Arver MFA-muligheder fra virksomhedens identitetsudbydere  
5. **Betingede Adgangspolitikker**: Drager fordel af risikobaserede adgangskontroller og adaptiv godkendelse  

**Implementeringskrav:**  
- **Validering af Token Målgruppe**: Verificer at alle tokens er eksplicit udstedt til MCP-serveren  
- **Udstederverifikation**: Bekræft at token-udsteder matcher den forventede identitetsudbyder  
- **Signaturverifikation**: Kryptografisk validering af tokens integritet  
- **Udløbsbegrænsning**: Striks håndhævelse af tokenets gyldighedsperiode  
- **Scope Validering**: Sikre at tokens indeholder passende tilladelser for de anmodede handlinger  

### **Sikkerhed i Autorisationslogik**

**Kritiske Kontroller:**  
- **Omfattende Autorisationsrevisioner**: Regelmæssige sikkerhedsgennemgange af alle autorisationsbeslutningspunkter  
- **Failsafe Standardindstillinger**: Afvis adgang, når autorisationslogik ikke kan træffe en endelig beslutning  
- **Tilladelsesgrænser**: Klar adskillelse mellem forskellige privilegieniveauer og ressourceadgang  
- **Audit-Logging**: Fuldstændig logning af alle autorisationsbeslutninger for sikkerhedsovervågning  
- **Regelmæssige Adgangsgennemgange**: Periodisk validering af brugerrettigheder og privilege tildelinger  

## 2. **Tokensikkerhed & Anti-Passthrough Kontroller**

**OWASP MCP Risiko Adresseret**: [MCP01 - Tokenfejlhåndtering & Hemmelighedseksponering](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Forebyggelse af Token Passthrough**

**Token passthrough er udtrykkeligt forbudt** i MCP Authorization Specification på grund af kritiske sikkerhedsrisici:

**Adresserede Sikkerhedsrisici:**  
- **Omgåelse af Kontroller**: Omgår væsentlige sikkerhedskontroller som ratebegrænsning, anmodningsvalidering og trafikovervågning  
- **Ansvarsbrud**: Gør klientidentifikation umulig, hvilket ødelægger revisionsspor og hændelsesundersøgelser  
- **Proxy-baseret Udslusning**: Gør det muligt for ondsindede aktører at bruge servere som proxyer til uautoriseret dataadgang  
- **Brud på Tillidsgrænser**: Bryder downstream servicees antagelser om token oprindelse  
- **Lateral Bevægelse**: Kompromitterede tokens på tværs af flere tjenester muliggør bredere angrebsudvidelse  

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
  
### **Sikre Tokenstyringsmønstre**

**Bedste Praksis:**  
- **Kortløbende Tokens**: Minimer eksponeringsvinduet med hyppig tokenrotation  
- **Just-in-Time Udstedelse**: Udsted tokens kun, når de er nødvendige for specifikke handlinger  
- **Sikker Opbevaring**: Brug hardware security modules (HSM'er) eller sikre nøglebede  
- **Tokenbinding**: Bind tokens til specifikke klienter, sessioner eller handlinger, hvor det er muligt  
- **Overvågning & Alarm**: Realtidsdetektion af tokenmisbrug eller uautoriserede adgangsmønstre  

## 3. **Sessionssikkerhedskontroller**

### **Forebyggelse af Session Hijacking**

**Angrebsvektorer Adresseret:**  
- **Session Hijack Prompt Injection**: Ondsindede hændelser injiceret i delt sessionstilstand  
- **Session Impersonation**: Uautoriseret brug af stjålne session IDs til at omgå godkendelse  
- **Genoptagelige Stream Angreb**: Udnyttelse af server-sent event genoptagelse til ondsindet indholdsindsprøjtning  

**Obligatoriske Sessionkontroller:**  
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
  
**Transport Sikkerhed:**  
- **HTTPS Håndhævelse**: Al sessionkommunikation over TLS 1.3  
- **Sikre Cookie-Attributter**: HttpOnly, Secure, SameSite=Strict  
- **Certifikat Pinning**: For kritiske forbindelser for at forhindre MITM-angreb  

### **Stateless vs Stateful Overvejelser**

**For Stateful Implementeringer:**  
- Delt sessionstilstand kræver yderligere beskyttelse mod injektionsangreb  
- Kø-baseret sessionstyring kræver integritetsverifikation  
- Flere serverinstanser kræver sikker sessionssynkronisering  

**For Stateless Implementeringer:**  
- JWT eller tilsvarende tokenbaseret sessionstyring  
- Kryptografisk verifikation af sessionstilstandens integritet  
- Reduceret angrebsflade men kræver robust tokenvalidering  

## 4. **AI-Specifikke Sikkerhedskontroller**

**OWASP MCP Risici Adresseret**:  
- [MCP06 - Prompt Injection via Kontekstbaserede Payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Værktøjsforgiftning](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Kommandoindsprøjtning & Eksekvering](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)  

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
- **Inputrengøring**: Omfattende validering og filtrering af alle brugerinput  
- **Indholdsafgrænsning**: Klar adskillelse mellem systeminstruktioner og brugers indhold  
- **Instruktionshierarki**: Korrekte præcedensregler for modstridende instruktioner  
- **Outputovervågning**: Detektion af potentielt skadelige eller manipulerede outputs  

### **Forebyggelse af Værktøjsforgiftning**

**Værktøjssikkerhedsramme:**  
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
  
**Dynamisk Værktøjsstyring:**  
- **Godkendelsesworkflows**: Udtrykkeligt brugerens samtykke ved værktøjsændringer  
- **Rollback-funktioner**: Mulighed for at gå tilbage til tidligere versioner  
- **Ændringsrevision**: Fuld historik over værktøjsdefinitionsændringer  
- **Risikoevaluering**: Automatiseret vurdering af værktøjssikkerhedstilstand  

## 5. **Forebyggelse af Forvirret Deputeret-angreb**

### **OAuth Proxy Sikkerhed**

**Forebyggende Kontroller:**  
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
- **Verifikation af Brugerens Samtykke**: Spring aldrig samtykkeskærme over ved dynamisk klientregistrering  
- **Validering af Redirect URI**: Striks whitelist-baseret validering af omdirigeringsdestinationer  
- **Beskyttelse af Autorisationskoder**: Kortlivede koder med håndhævelse af enkeltbrug  
- **Verifikation af Klientidentitet**: Robust validering af klientlegitimationsoplysninger og metadata  

## 6. **Værktøjseksekveringssikkerhed**

### **Sandboxing & Isolation**

**Containerbaseret Isolation:**  
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
- **Separate Proceskontekster**: Hver værktøjseksekvering i isoleret procesområde  
- **Inter-Proces Kommunikation**: Sikker IPC med validering  
- **Procesovervågning**: Runtime adfærdsanalyse og anomalidetektion  
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
  
## 7. **Sikkerhedskontroller for Forsyningskæden**

**OWASP MCP Risiko Adresseret**: [MCP04 - Forsyningskædeangreb](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Afhængighedsverifikation**

**Omfattende KomponentSikkerhed:**  
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

**Trusselsdetektion i Forsyningskæden:**  
- **Overvågning af Afhængigheders Sundhed**: Kontinuerlig vurdering af alle afhængigheder for sikkerhedsproblemer  
- **Integration af Trusselsintelligens**: Realtidsopdateringer om nye forsyningskædetrusler  
- **Adfærdsanalyse**: Detektion af usædvanlig adfærd i eksterne komponenter  
- **Automatiseret Respons**: Øjeblikkelig inddæmning af kompromitterede komponenter  

## 8. **Overvågnings- og Detektionskontroller**

**OWASP MCP Risiko Adresseret**: [MCP08 - Manglende Revision og Telemetri](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Security Information and Event Management (SIEM)**

**Omfattende Logningsstrategi:**  
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
  
### **Realtids Trusselsdetektion**

**Adfærdsanalyse:**  
- **Brugeradfærdsanalyse (UBA)**: Detektion af usædvanlige brugeradgangsmønstre  
- **Enhedsadfærdsanalyse (EBA)**: Overvågning af MCP-server og værktøjsadfærd  
- **Maskinlæringsbaseret Anomalidetektion**: AI-drevet identifikation af sikkerhedstrusler  
- **Trusselsintelligenskorrelation**: Matcher observerede aktiviteter med kendte angrebsmønstre  

## 9. **Hændelseshåndtering & Genopretning**

### **Automatiserede Responsfunktioner**

**Øjeblikkelige Responshandlinger:**  
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
  
### **Forensiske Kapabiliteter**

**Undersøgelsessupport:**  
- **Bevarelse af Revisionsspor**: Uforanderlig logning med kryptografisk integritet  
- **Indsamling af Beviser**: Automatisk indsamling af relevante sikkerhedsartefakter  
- **Tidslinjerekonstruktion**: Detaljeret sekvens af begivenheder, der ledte til sikkerhedshændelser  
- **Impact Vurdering**: Evaluering af kompromittens omfang og dataeksponering  

## **Nøgleprincipper for Sikkerhedsarkitektur**

### **Forsvar i Dybden**  
- **Flere Sikkerhedslag**: Intet enkelt fejlpunkt i sikkerhedsarkitekturen  
- **Redundante Kontroller**: Overlappende sikkerhedsforanstaltninger for kritiske funktioner  
- **Failsafe Mekanismer**: Sikre standardindstillinger ved systemfejl eller angreb  

### **Zero Trust Implementering**  
- **Aldrig Stol på, Altid Verificer**: Kontinuerlig validering af alle enheder og anmodninger  
- **Princip om Mindste Privilegium**: Minimale adgangsrettigheder for alle komponenter  
- **Mikrosegmentering**: Granulære netværks- og adgangskontroller  

### **Kontinuerlig Sikkerhedsevolution**  
- **Tilpasning til Trusselslandskab**: Regelmæssige opdateringer til adressering af nye trusler  
- **Effektivitet af Sikkerhedskontroller**: Løbende evaluering og forbedring af kontroller  
- **Overholdelse af Specifikationer**: Overensstemmelse med udviklende MCP sikkerhedsstandarder  

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
- [OWASP Top 10 for Store Sprogmodeller](https://genai.owasp.org/)  
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)  

---

> **Vigtigt**: Disse sikkerhedskontroller afspejler den aktuelle MCP-specifikation (2025-11-25). Bekræft altid mod den nyeste [officielle dokumentation](https://spec.modelcontextprotocol.io/), da standarderne fortsat udvikler sig hurtigt.

## Hvad er Næste Skridt

- Gå tilbage til: [Security Module Overview](./README.md)
- Fortsæt til: [Modul 3: Kom godt i gang](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:  
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, bedes du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det oprindelige dokument på dets modersmål bør anses for at være den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os ikke ansvar for eventuelle misforståelser eller fejltolkninger som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->