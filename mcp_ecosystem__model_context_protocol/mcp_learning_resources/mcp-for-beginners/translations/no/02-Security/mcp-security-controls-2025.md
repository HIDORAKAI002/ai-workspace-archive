# MCP Sikkerhetskontroller - Oppdatering februar 2026

> **Gjeldende standard**: Dette dokumentet gjenspeiler [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) sikkerhetskrav og offisielle [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) har modnet betydelig med forbedrede sikkerhetskontroller som adresserer både tradisjonell programvaresikkerhet og AI-spesifikke trusler. Dette dokumentet gir omfattende sikkerhetskontroller for sikre MCP-implementeringer i tråd med OWASP MCP Top 10-rammeverket.

## 🏔️ Praktisk sikkerhetstrening

For praktisk, hands-on erfaring med sikkerhetsimplementering anbefaler vi **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - en omfattende guidet ekspedisjon for å sikre MCP-servere i Azure ved å bruke en "sårbar → utnytt → fiks → valider" metodikk.

Alle sikkerhetskontroller i dette dokumentet samsvarer med **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, som gir referansearkitekturer og Azure-spesifikke implementeringsveiledninger for OWASP MCP Top 10 risikoer.

## **OBLIGATORISKE sikkerhetskrav**

### **Kritiske forbud fra MCP-spesifikasjonen:**

> **FORBUDT**: MCP-servere **MÅ IKKE** akseptere noen tokens som ikke eksplisitt er utstedt for MCP-serveren  
>  
> **FORBUDT**: MCP-servere **MÅ IKKE** bruke økter for autentisering  
>  
> **PÅKREVD**: MCP-servere som implementerer autorisasjon **MÅ** verifisere ALLE innkommende forespørsler  
>  
> **OBLIGATORISK**: MCP-proxyservere som bruker statiske klient-IDer **MÅ** innhente brukerens samtykke for hver dynamisk registrerte klient

---

## 1. **Autentiserings- og autorisasjonskontroller**

### **Integrasjon med ekstern identitetsleverandør**

**Nåværende MCP-standard (2025-11-25)** tillater MCP-servere å delegere autentisering til eksterne identitetsleverandører, noe som er en betydelig sikkerhetsforbedring:

**OWASP MCP Risiko adressert**: [MCP07 - Utilstrekkelig autentisering og autorisasjon](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Sikkerhetsfordeler:**
1. **Fjerner risikoer knyttet til tilpasset autentisering**: Reduserer sårbarhetsoverflaten ved å unngå egendefinerte autentiseringsimplementasjoner  
2. **Sikkerhet på bedriftsnivå**: Utnytter etablerte identitetsleverandører som Microsoft Entra ID med avanserte sikkerhetsfunksjoner  
3. **Sentralisert identitetsadministrasjon**: Forenkler brukerens livssyklusadministrasjon, tilgangskontroll og revisjon for samsvar  
4. **Flerfaktorautentisering**: Arver MFA-funksjonalitet fra bedriftsidentitetsleverandører  
5. **Betingede tilgangspolicyer**: Nyter godt av risikobaserte tilgangskontroller og adaptiv autentisering

**Implementeringskrav:**
- **Validering av tokenmottaker**: Verifiser at alle tokens er eksplisitt utstedt for MCP-serveren  
- **Utstederverifisering**: Bekreft at tokenets utsteder samsvarer med forventet identitetsleverandør  
- **Signaturverifisering**: Kryptografisk validering av tokenintegritet  
- **Utløpshåndhevelse**: Streng håndhevelse av tokenets levetidsgrenser  
- **Scope-validering**: Sikre at tokens inneholder passende tillatelser for forespurte operasjoner

### **Sikkerhet i autorisasjonslogikk**

**Kritiske kontroller:**
- **Omfattende autorisasjonsrevisjoner**: Regelmessige sikkerhetsgjennomganger av alle autorisasjonsbeslutningspunkter  
- **Feilsikre standarder**: Avvis tilgang når autorisasjonslogikken ikke kan ta en definitiv beslutning  
- **Tillatelsesgrenser**: Klar separasjon mellom ulike privilegienivåer og ressursaksesstyring  
- **Revisjonslogging**: Fullstendig logging av alle autorisasjonsbeslutninger for sikkerhetsovervåkning  
- **Regelmessige tilgangsgjennomganger**: Periodisk validering av brukerrettigheter og privilegietildelinger

## 2. **Token-sikkerhet og anti-gjennomgangskontroller**

**OWASP MCP Risiko adressert**: [MCP01 - Tokenhåndtering og eksponering av hemmeligheter](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Forebygging av token-gjennomgang**

**Token-gjennomgang er eksplisitt forbudt** i MCP Authorization Specification på grunn av kritiske sikkerhetsrisikoer:

**Sikkerhetsrisikoer adressert:**
- **Omgåelse av kontroller**: Omgår essensielle sikkerhetskontroller som hastighetsbegrensning, forespørselsvalidering og trafikkovervåkning  
- **Ansvarsfraskrivelse**: Gjør klientidentifikasjon umulig, og korrumperer revisjonsspor og hendelsesundersøkelser  
- **Proxy-basert datautslipp**: Muliggjør at ondsinnede aktører bruker servere som proxy for uautorisert dataadgang  
- **Brudd på tillitsgrenser**: Bryter nedstrøms tjenesters tillitsforutsetninger om token-opprinnelse  
- **Lateral bevegelse**: Kompromitterte tokens over flere tjenester muliggjør bredere angrepsekspansjon

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
- **Kortlevde tokens**: Minimer eksponeringsvindu med hyppig tokenrotasjon  
- **Just-in-Time-utstedelse**: Utsted tokens kun når det trengs for spesifikke operasjoner  
- **Sikker lagring**: Bruk hardware security modules (HSM) eller sikre nøkkelskap  
- **Tokenbinding**: Bind tokens til spesifikke klienter, økter eller operasjoner der det er mulig  
- **Overvåkning og varsling**: Sanntidsdeteksjon av tokenmisbruk eller uautorisert tilgangsmønster

## 3. **Økt-sikkerhetskontroller**

### **Forebygging av økthijacking**

**Angrepsvektorer adressert:**
- **Injection av session hijack-prompt**: Ondsinnede hendelser injisert i delt økttilstand  
- **Økt-imlistasjon**: Uautorisert bruk av stjålne økt-IDer for å omgå autentisering  
- **Gjenopptakbare strømangrep**: Utnyttelse av server-sent event-resumpsjon for ondsinnet innholdsinnsprøyting

**Obligatoriske øktkontroller:**
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

**Transport sikkerhet:**
- **HTTPS-håndhevelse**: All øktkommunikasjon over TLS 1.3  
- **Sikre Cookie-attributter**: HttpOnly, Secure, SameSite=Strict  
- **Sertifikat-pinning**: For kritiske tilkoblinger for å forhindre MITM-angrep

### **Tilstandsbasert vs tilstandsløs vurdering**

**For tilstandsbaserte implementasjoner:**
- Delt økttilstand krever ekstra beskyttelse mot injeksjonsangrep  
- Købasert øktstyring trenger integritetsverifikasjon  
- Flere serverinstanser krever sikker synkronisering av økttilstand

**For tilstandsløse implementasjoner:**
- JWT eller lignende tokenbasert øktstyring  
- Kryptografisk verifisering av økttilstandsintegritet  
- Redusert angrepsflate, men krever robust tokenvalidering

## 4. **AI-spesifikke sikkerhetskontroller**

**OWASP MCP risikoer adressert**:  
- [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Verktøyforgiftning](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Kommandoinjeksjon og utførelse](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Forsvar mot prompt-injeksjon**

**Integrasjon med Microsoft Prompt Shields:**  
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
- **Inputrensing**: Omfattende validering og filtrering av all brukerinput  
- **Innholdsgrense-definisjon**: Klar separasjon mellom systeminstruksjoner og brukerinhold  
- **Instruksjonshierarki**: Korrekte prioriteringsregler for motstridende instruksjoner  
- **Output-overvåkning**: Deteksjon av potensielt skadelig eller manipulert output

### **Forebygging av verktøyforgiftning**

**Verktøysikkerhetsrammeverk:**  
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
- **Godkjenningsflyt**: Eksplisitt brukersamtykke for verktøyendringer  
- **Rollback-muligheter**: Evne til å gå tilbake til tidligere verktøyversjoner  
- **Endringsrevisjon**: Fullstendig historikk over endringer i verktøydefinisjoner  
- **Risikovurdering**: Automatisk vurdering av verktøysikkerhetsstatus

## 5. **Forebygging av Confused Deputy-angrep**

### **OAuth-proxy sikkerhet**

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
- **Verifisering av brukersamtykke**: Aldri hopp over samtykkeskjermer for dynamisk klientregistrering  
- **Validering av redirect URI**: Streng whitelist-basert validering av omdirigeringsdestinasjoner  
- **Beskyttelse av autorisasjonskode**: Kortlevde koder med enbrukshåndhevelse  
- **Verifisering av klientidentitet**: Robust validering av klientlegitimasjon og metadata

## 6. **Sikkerhet ved verktøyutførelse**

### **Sandkasse og isolasjon**

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

**Prosessisolasjon:**
- **Separate prosesskontekster**: Hver verktøyutførelse i isolert prosessrom  
- **Inter-prosesskommunikasjon**: Sikre IPC-mekanismer med validering  
- **Prosessovervåkning**: Analyse av kjøretidsatferd og deteksjon av anomalier  
- **Ressurshåndhevelse**: Streng begrensning på CPU, minne og I/O-operasjoner

### **Implementering av minste privilegium**

**Tillatelsesadministrasjon:**  
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

## 7. **Sikkerhet i forsyningskjeden**

**OWASP MCP Risiko adressert**: [MCP04 - Angrep på programvareforsyningskjeden og manipulering av avhengigheter](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Verifisering av avhengigheter**

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

### **Kontinuerlig overvåkning**

**Trusseldeteksjon i forsyningskjeden:**
- **Helseovervåkning av avhengigheter**: Kontinuerlig vurdering av alle avhengigheter for sikkerhetsproblemer  
- **Integrasjon av trusselintelligens**: Sanntidsoppdateringer om nye trusler mot forsyningskjeden  
- **Atferdsanalyse**: Deteksjon av uvanlig oppførsel i eksterne komponenter  
- **Automatisk respons**: Umiddelbar isolasjon av kompromitterte komponenter

## 8. **Overvåknings- og deteksjonskontroller**

**OWASP MCP Risiko adressert**: [MCP08 - Manglende revisjon og telemetri](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Sikkerhetsinformasjon og hendelseshåndtering (SIEM)**

**Omfattende loggerstrategi:**  
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
- **Entitetsatferdsanalyse (EBA)**: Overvåkning av MCP-server og verktøyadferd  
- **Maskinlæringsbasert anomalideteksjon**: AI-drevet identifikasjon av sikkerhetstrusler  
- **Trusselintelligenskobling**: Sammenstilling av observerte aktiviteter med kjente angrepsmønstre

## 9. **Hendelseshåndtering og gjenoppretting**

### **Automatiserte responsmuligheter**

**Umiddelbare responshandlinger:**  
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

**Støtte for undersøkelser:**
- **Bevaring av revisjonsspor**: Uforanderlig logging med kryptografisk integritet  
- **Innsamling av bevis**: Automatisk innhenting av relevante sikkerhetsartefakter  
- **Tidslinjegjenskaping**: Detaljert sekvens av hendelser som ledet til sikkerhetsrelaterte hendelser  
- **Virkningsevaluering**: Vurdering av omfang av kompromittering og dataeksponering

## **Nøkkelprinsipper i sikkerhetsarkitektur**

### **Forsvar i dybden**
- **Flere sikkerhetslag**: Ingen enkelt feilpunkt i sikkerhetsarkitektur  
- **Redundante kontroller**: Overlappende sikkerhetstiltak for kritiske funksjoner  
- **Feilsikre mekanismer**: Sikre standarder når systemer møter feil eller angrep

### **Implementering av "Zero Trust"**
- **Aldri stol på, alltid verifiser**: Kontinuerlig validering av alle enheter og forespørsler  
- **Prinsippet om minste privilegium**: Minimale tilgangsrettigheter for alle komponenter  
- **Mikrosegmentering**: Granulære nettverks- og tilgangskontroller

### **Kontinuerlig sikkerhetsevolusjon**
- **Tilpasning til trussellandskapet**: Regelmessige oppdateringer for å håndtere nye trusler  
- **Effektivitet av sikkerhetskontroller**: Løpende evaluering og forbedring av kontroller  
- **Samsvar med spesifikasjon**: Samsvar med utviklende MCP-sikkerhetsstandarder

---

## **Implementeringsressurser**

### **Offisiell MCP-dokumentasjon**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP sikkerhetsressurser**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omfattende OWASP MCP Top 10 med Azure-implementering  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Offisielle OWASP MCP sikkerhetsrisikoer  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk sikkerhetstrening for MCP på Azure

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

> **Viktig**: Disse sikkerhetskontrollene reflekterer gjeldende MCP-spesifikasjon (2025-11-25). Verifiser alltid mot den nyeste [offisielle dokumentasjonen](https://spec.modelcontextprotocol.io/) ettersom standarder utvikler seg raskt.

## Hva er neste steg

- Tilbake til: [Security Module Overview](./README.md)  
- Fortsett til: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->