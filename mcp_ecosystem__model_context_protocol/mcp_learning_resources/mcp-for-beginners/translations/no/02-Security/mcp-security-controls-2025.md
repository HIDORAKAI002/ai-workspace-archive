# MCP Sikkerhetskontroller - Oppdatering februar 2026

> **Gjeldende standard**: Dette dokumentet gjenspeiler [MCP Spesifikasjon 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) sikkerhetskrav og offisielle [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) har modnet betydelig med forbedrede sikkerhetskontroller som adresserer både tradisjonell programvaresikkerhet og AI-spesifikke trusler. Dette dokumentet gir omfattende sikkerhetskontroller for sikre MCP-implementeringer i tråd med OWASP MCP Top 10-rammeverket.

## 🏔️ Praktisk sikkerhetstrening

For praktisk, hands-on erfaring med sikkerhetsimplementering anbefaler vi **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - en omfattende guidet ekspedisjon for å sikre MCP-servere i Azure ved bruk av en "sårbarhet → utnyttelse → fikse → validere" metodikk.

Alle sikkerhetskontroller i dette dokumentet er i samsvar med **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, som gir referansearkitekturer og Azure-spesifikk implementasjonsveiledning for OWASP MCP Top 10-risikoer.

## **MANDATORISKE sikkerhetskrav**

### **Kritiske forbud fra MCP-spesifikasjonen:**

> **FORBUDT**: MCP-servere **MÅ IKKE** akseptere noen tokens som ikke eksplisitt er utstedt for MCP-serveren  
>
> **FORBUDT**: MCP-servere **MÅ IKKE** bruke sesjoner for autentisering  
>
> **PÅKREVD**: MCP-servere som implementerer autorisasjon **MÅ** verifisere ALLE innkommende forespørsler  
>
> **OBLIGATORISK**: MCP-proxyservere som bruker statiske klient-IDer **MÅ** innhente brukerens samtykke for hver dynamisk registrerte klient

---

## 1. **Autentiserings- og autorisasjonskontroller**

### **Integrasjon med ekstern identitetsleverandør**

**Gjeldende MCP-standard (2025-11-25)** tillater at MCP-servere delegerer autentisering til eksterne identitetsleverandører, noe som representerer en betydelig sikkerhetsforbedring:

**OWASP MCP Risiko adressert**: [MCP07 - Utilstrekkelig autentisering og autorisasjon](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Sikkerhetsfordeler:**
1. **Eliminerer risiko knyttet til egendefinert autentisering**: Reduserer sårbarhetsflaten ved å unngå egendefinerte autentiseringsimplementasjoner  
2. **Sikkerhet på bedriftsnivå**: Benytter etablerte identitetsleverandører som Microsoft Entra ID med avanserte sikkerhetsfunksjoner  
3. **Sentralisert identitetshåndtering**: Forenkler brukerlivssyklusstyring, tilgangskontroll og samsvarsvurdering  
4. **Multi-faktor autentisering**: Arver MFA-funksjonalitet fra bedriftsidentitetsleverandørene  
5. **Betingede tilgangspolicyer**: Drar nytte av risikobaserte tilgangskontroller og adaptiv autentisering  

**Implementeringskrav:**
- **Validering av tokenmottaker**: Verifiser at alle tokens er eksplisitt utstedt for MCP-serveren  
- **Utstederverifisering**: Valider at tokenutstederen samsvarer med forventet identitetsleverandør  
- **Signaturvalidering**: Kryptografisk validering av tokenets integritet  
- **Utløpshåndhevelse**: Streng håndhevelse av tokenets levetidsbegrensninger  
- **Scope-validering**: Sikre at tokens inneholder riktige tillatelser for forespurte operasjoner  

### **Sikkerhet for autorisasjonslogikk**

**Kritiske kontroller:**
- **Omfattende autorisasjonsrevisjoner**: Regelmessige sikkerhetsgjennomganger av alle autorisasjonsbeslutningspunkter  
- **Feilsikre standarder**: Nekt tilgang når autorisasjonslogikken ikke kan ta en entydig beslutning  
- **Tillatelsesavgrensninger**: Klar separasjon mellom ulike privilegienivåer og ressursadgang  
- **Revisjonslogging**: Full logging av alle autorisasjonsbeslutninger for sikkerhetsovervåking  
- **Regelmessige tilgangsvurderinger**: Periodisk validering av brukertillatelser og privilegietildelinger  

## 2. **Tokensikkerhet og anti-passthrough-kontroller**

**OWASP MCP Risiko adressert**: [MCP01 - Tokenfeilbehandling og hemmelighetseksponering](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Forebygging av token-passthrough**

**Token-passthrough er eksplisitt forbudt** i MCP autorisasjonsspesifikasjonen på grunn av kritiske sikkerhetsrisikoer:

**Sikkerhetsrisikoer adressert:**
- **Omgåelse av kontroll**: Omgår essensielle sikkerhetskontroller som hastighetsbegrensning, forespørselsvalidering og trafikkovervåking  
- **Ansvarsfraskrivelse**: Gjør klientidentifikasjon umulig, noe som ødelegger revisjonsspor og hendelsesetterforskning  
- **Proxy-basert ekfiltrering**: Tillater ondsinnede aktører å bruke servere som proxier for uautorisert dataadgang  
- **Brudd på tillitsgrenser**: Bryter antakelser om tokenopprinnelse i nedstrøms tjenestetillit  
- **Lateral bevegelse**: Kompromitterte tokens på tvers av flere tjenester muliggjør bredere angrepsutvidelse  

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

### **Sikre tokenhåndteringsmønstre**

**Beste praksis:**
- **Kortvarige tokens**: Minimer eksponeringsvinduet med hyppig tokenrotasjon  
- **Just-in-time utstedelse**: Utsted tokens kun når de trengs for spesifikke operasjoner  
- **Sikker lagring**: Bruk hardware security modules (HSM) eller sikre nøkkelhvelv  
- **Tokenbinding**: Bind tokens til spesifikke klienter, sesjoner eller operasjoner der det er mulig  
- **Overvåking og varsling**: Sanntidsdeteksjon av tokenmisbruk eller uautorisert tilgangsmønster  

## 3. **Sesjonssikkerhetskontroller**

### **Forebygging av sesjonskapring**

**Angrepsvektorer adressert:**
- **Prompt Injection i sesjonskapring**: Ondsinnede hendelser injisert i delt sesjonstilstand  
- **Sesjonsforfalskning**: Uautorisert bruk av stjålne sesjons-IDer for å omgå autentisering  
- **Gjenopptakbare strømangrep**: Utnyttelse av server-gjennomførte hendelsesgjenopptakelser for ondsinnet innholdsinnsprøyting  

**Obligatoriske sesjonskontroller:**
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

**Transport-sikkerhet:**
- **HTTPS-håndheving**: All sesjonskommunikasjon over TLS 1.3  
- **Sikre cookie-attributter**: HttpOnly, Secure, SameSite=Strict  
- **Sertifikatpinning**: For kritiske tilkoblinger for å hindre MITM-angrep  

### **Tilstandsstyrte vs tilstandsfrie vurderinger**

**For tilstandsstyrte implementasjoner:**
- Delt sesjonstilstand krever ekstra beskyttelse mot injeksjonsangrep  
- Købasert sesjonshåndtering trenger integritetsverifisering  
- Flere serverinstanser krever sikker sesjonstillstandssynkronisering  

**For tilstandsfrie implementasjoner:**
- JWT eller lignende tokenbasert sesjonshåndtering  
- Kryptografisk verifisering av sesjonstilstandens integritet  
- Redusert angrepsflate, men krever robust tokenvalidering  

## 4. **AI-spesifikke sikkerhetskontroller**

**OWASP MCP Risikoer adressert**:  
- [MCP06 - Prompt Injection gjennom kontekstuelle innhold](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Verktøyforgiftning](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Kommandoinjeksjon og utførelse](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)  

### **Forsvar mot prompt injection**

**Microsoft Prompt Shields-integrasjon:**  
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
- **Inputrensing**: Omfattende validering og filtrering av all brukerinndata  
- **Innholdsgrense-definisjon**: Klar separasjon mellom systeminstruksjoner og brukersinnhold  
- **Instruksjonshierarki**: Riktig prioriteringsregler ved motstridende instrukser  
- **Output-overvåking**: Deteksjon av potensielt skadelige eller manipulerte resultater  

### **Forebygging av verktøyforgiftning**

**Sikkerhetsrammeverk for verktøy:**  
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
  
**Dynamisk verktøyhåndtering:**  
- **Godkjenningsarbeidsflyter**: Eksplisitt brukersamtykke ved verktøymodifikasjoner  
- **Rollback-muligheter**: Evne til å gå tilbake til tidligere versjoner av verktøy  
- **Endringsrevisjon**: Full historikk over endringer i verktøydefinisjoner  
- **Risikovurdering**: Automatisert evaluering av verktøyets sikkerhetsstilling  

## 5. **Forebygging av Confused Deputy-angrep**

### **OAuth Proxy-sikkerhet**

**Angrepsforebyggende kontroller:**  
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
- **Verifisering av brukersamtykke**: Aldri hopp over samtykkeskjermer ved dynamisk klientregistrering  
- **Redirect URI-validering**: Streng hvitelistebasert validering av omdirigeringsdestinasjoner  
- **Beskyttelse av autorisasjonskoder**: Kortlevde koder med enkeltbrukshåndhevelse  
- **Validering av klientidentitet**: Robust validering av klientlegitimasjon og metadata  

## 6. **Sikkerhet ved verktøykjøring**

### **Sandboxing & isolasjon**

**Container-basert isolasjon:**  
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
  
**Prossesisolasjon:**  
- **Separate prosesskontekster**: Hver verktøykjøring i isolert prosessrom  
- **Inter-prosess kommunikasjon**: Sikre IPC-mekanismer med validering  
- **Prosessovervåking**: Runtime atferdsanalyse og anomali-deteksjon  
- **Ressurshåndhevelse**: Strenge grenser for CPU, minne og I/O-operasjoner  

### **Implementering av minste privilegium**

**Tillatelsesstyring:**  
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
  
## 7. **Sikkerhet for forsyningskjeden**

**OWASP MCP Risiko adressert**: [MCP04 - Forsyningskjedeangrep](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Avhengighetsverifisering**

**Omfattende komponent-sikkerhet:**  
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
  
### **Kontinuerlig overvåking**

**Trusseldeteksjon i forsyningskjeden:**  
- **Overvåking av avhengigheters helse**: Kontinuerlig vurdering av alle avhengigheter for sikkerhetsproblemer  
- **Integrering av trusselintelligens**: Sanntidsoppdateringer om nye forsyningskjedetrusler  
- **Atferdsanalyse**: Deteksjon av uvanlig oppførsel i eksterne komponenter  
- **Automatisert respons**: Umiddelbar inneslutning av kompromitterte komponenter  

## 8. **Overvåking og deteksjonskontroller**

**OWASP MCP Risiko adressert**: [MCP08 - Manglende revisjon og telemetri](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

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
  
### **Sanntids trusseldeteksjon**

**Atferdsanalyse:**
- **Brukeratferdsanalyse (UBA)**: Deteksjon av uvanlige brukeradgangsmønstre  
- **Enhetsatferdsanalyse (EBA)**: Overvåking av MCP-server og verktøyatferd  
- **Maskinlæring for anomali-deteksjon**: AI-basert identifisering av sikkerhetstrusler  
- **Korrelering med trusselintelligens**: Sammenstilling av observerte aktiviteter med kjente angrepsmønstre  

## 9. **Hendelseshåndtering og gjenoppretting**

### **Automatiserte responsmuligheter**

**Umiddelbare responsaksjoner:**  
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
  
### **Rettsmedisinske muligheter**

**Støtte til etterforskning:**  
- **Bevaring av revisjonsspor**: Uforanderlig logging med kryptografisk integritet  
- **Innsamling av bevis**: Automatisert innsamling av relevante sikkerhetsartefakter  
- **Tidslinjegjengivelse**: Detaljert sekvens av hendelser som ledet til sikkerhetshendelser  
- **Konsekvensvurdering**: Evaluering av omfang av kompromittering og dataeksponering  

## **Viktige prinsipper for sikkerhetsarkitektur**

### **Forsvar i dybden**
- **Flere sikkerhetslag**: Ingen enkelt feilpunkt i sikkerhetsarkitekturen  
- **Redundante kontroller**: Overlappende sikkerhetstiltak for kritiske funksjoner  
- **Feilsikre mekanismer**: Sikkre standardinnstillinger når systemer møter feil eller angrep  

### **Zero Trust-implementering**
- **Aldri stol, alltid verifiser**: Kontinuerlig validering av alle enheter og forespørsler  
- **Prinsippet om minste privilegium**: Minimale tilgangsrettigheter for alle komponenter  
- **Mikrosegmentering**: Granulære nettverks- og tilgangskontroller  

### **Kontinuerlig utvikling av sikkerhet**
- **Tilpasning til trussellandskapet**: Regelmessige oppdateringer for å adressere nye trusler  
- **Effektivitet av sikkerhetskontroller**: Løpende evaluering og forbedring av kontroller  
- **Samsvar med spesifikasjonen**: Tilpasning til utviklende MCP sikkerhetsstandarder  

---

## **Implementeringsressurser**

### **Offisiell MCP-dokumentasjon**
- [MCP Spesifikasjon (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP sikkerhetsressurser**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omfattende OWASP MCP Top 10 med Azure-implementering  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Offisielle OWASP MCP sikkerhetsrisikoer  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Hands-on sikkerhetstrening for MCP på Azure  

### **Microsoft sikkerhetsløsninger**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Sikkerhetsstandarder**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **Viktig**: Disse sikkerhetskontrollene gjenspeiler gjeldende MCP-spesifikasjon (2025-11-25). Kontroller alltid mot den nyeste [offisielle dokumentasjonen](https://spec.modelcontextprotocol.io/) da standarder utvikler seg raskt.

## Hva er neste

- Gå tilbake til: [Oversikt over sikkerhetsmodulen](./README.md)
- Fortsett til: [Modul 3: Komme i gang](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal anses som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->