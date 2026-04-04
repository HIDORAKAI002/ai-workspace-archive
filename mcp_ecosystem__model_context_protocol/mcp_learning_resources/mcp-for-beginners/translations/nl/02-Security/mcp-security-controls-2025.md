# MCP Beveiligingscontroles - Update Februari 2026

> **Huidige Standaard**: Dit document weerspiegelt de beveiligingseisen van [MCP Specificatie 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) en officiële [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Het Model Context Protocol (MCP) is aanzienlijk volwassen geworden met verbeterde beveiligingscontroles die zowel traditionele softwarebeveiliging als AI-specifieke bedreigingen aanpakken. Dit document biedt uitgebreide beveiligingscontroles voor veilige MCP-implementaties die zijn afgestemd op het OWASP MCP Top 10-raamwerk.

## 🏔️ Praktische Beveiligingstraining

Voor praktische, hands-on ervaring met het implementeren van beveiliging raden we de **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** aan - een uitgebreide begeleide expeditie om MCP-servers in Azure te beveiligen met een "kwetsbaar → exploit → fix → valideren" methodologie.

Alle beveiligingscontroles in dit document zijn in lijn met de **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, die referentiearchitecturen en Azure-specifieke implementatierichtlijnen biedt voor de OWASP MCP Top 10-risico's.

## **VERPLICHTE Beveiligingseisen**

### **Kritieke Verboden uit MCP Specificatie:**

> **VERBODEN**: MCP-servers **MOGEN GEEN** tokens accepteren die niet expliciet zijn uitgegeven voor de MCP-server  
>
> **VERBODEN**: MCP-servers **MOGEN GEEN** sessies gebruiken voor authenticatie  
>
> **VERPLICHT**: MCP-servers die autorisatie implementeren **MOETEN** ALLE inkomende verzoeken verifiëren  
>
> **VERPLICHT**: MCP-proxyservers die statische client-ID's gebruiken **MOETEN** gebruikersconsent verkrijgen voor elke dynamisch geregistreerde client  

---

## 1. **Authenticatie- & Autorisatiecontroles**

### **Integratie van Externe Identiteitsprovider**

**Huidige MCP Standaard (2025-11-25)** staat MCP-servers toe authenticatie te delegeren naar externe identiteitsproviders, wat een grote beveiligingsverbetering betekent:

**Aangepakt OWASP MCP Risico**: [MCP07 - Onvoldoende authenticatie & autorisatie](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Beveiligingsvoordelen:**
1. **Elimineert aangepaste authenticatierisico's**: Vermindert kwetsbaarheid door het vermijden van aangepaste authenticatie-implementaties  
2. **Enterprise-grade beveiliging**: Maakt gebruik van gevestigde identiteitsproviders zoals Microsoft Entra ID met geavanceerde beveiligingsfuncties  
3. **Gecentraliseerd identiteitsbeheer**: Vereenvoudigt gebruikerslevenscyclusbeheer, toegangscontrole en compliance-audits  
4. **Multi-Factor Authenticatie**: Erf MFA-mogelijkheden van enterprise-identiteitsproviders  
5. **Beleid voor voorwaardelijke toegang**: Profiteert van risico-gebaseerde toegangscontrole en adaptieve authenticatie  

**Implementatie-eisen:**
- **Token Audience Validatie**: Verifieer dat alle tokens expliciet zijn uitgegeven voor de MCP-server  
- **Issuer-verificatie**: Valideer dat de tokenuitgever overeenkomt met de verwachte identiteitsprovider  
- **Handtekeningverificatie**: Cryptografische validatie van tokenintegriteit  
- **Verloopafhandeling**: Strikte naleving van tokenlevensduurlimieten  
- **Scope-validatie**: Zorg dat tokens de juiste machtigingen bevatten voor de aangevraagde bewerkingen  

### **Beveiliging Autorisatielogica**

**Kritieke controles:**
- **Uitgebreide autorisatie-audits**: Regelmatige beveiligingsbeoordelingen van alle autorisatiebeslispunten  
- **Fail-safe defaults**: Toegang weigeren wanneer autorisatielogica geen definitieve beslissing kan nemen  
- **Machtigingsgrenzen**: Duidelijke scheiding tussen verschillende privilege-niveaus en resource-toegang  
- **Audit logging**: Volledige logging van alle autorisatiebeslissingen voor beveiligingsmonitoring  
- **Regelmatige toegangsbeoordelingen**: Periodieke validatie van gebruikersmachtigingen en privilege-toewijzingen  

## 2. **Tokenbeveiliging & Anti-Passthrough Controles**

**Aangepakt OWASP MCP Risico**: [MCP01 - Slecht tokenbeheer & geheimhoudingslekken](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Preventie van Token Passthrough**

**Token passthrough is expliciet verboden** in de MCP Autorisatiespecificatie vanwege kritieke beveiligingsrisico's:

**Aangepakte beveiligingsrisico's:**
- **Circumventie van controles**: Omzeilt essentiële beveiliging zoals rate limiting, verzoekvalidatie en verkeersmonitoring  
- **Gebrek aan verantwoording**: Maakt clientidentificatie onmogelijk, corrumpeert auditsporen en incidentonderzoek  
- **Proxy-gebaseerde exfiltratie**: Laat kwaadwillenden toe servers als proxy te gebruiken voor ongeautoriseerde data toegang  
- **Vertrouwensgrensschendingen**: Doorbreekt vertrouwen van downstream services over tokenherkomst  
- **Zijdelingse beweging**: Gecompromitteerde tokens over meerdere services stimuleren bredere aanvalsexpansie  

**Implementatiecontroles:**
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

### **Veilige Token Beheerpatronen**

**Best Practices:**
- **Kortdurende tokens**: Minimaliseer blootstellingsvenster door frequente tokenrotatie  
- **Just-in-time uitgifte**: Tokens alleen uitgeven wanneer nodig voor specifieke operaties  
- **Veilige opslag**: Gebruik hardware security modules (HSM's) of veilige sleutelkluizen  
- **Token Binding**: Koppel tokens waar mogelijk aan specifieke clients, sessies of operaties  
- **Monitoring & alerting**: Detectie in realtime van tokenmisbruik of ongeautoriseerde toegangs-patronen  

## 3. **Sessiebeveiligingscontroles**

### **Preventie van Session Hijacking**

**Aangeraakte aanvalsvectoren:**
- **Session hijack prompt injectie**: Kwaadaardige gebeurtenissen geïnjecteerd in gedeelde sessiestatus  
- **Session impersonatie**: Ongeautoriseerd gebruik van gestolen sessie-ID’s om authenticatie te omzeilen  
- **Resumeerbare stream-aanvallen**: Misbruik van server-sent event hervatting voor kwaadaardige contentinjectie  

**Verplichte sessiecontroles:**
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

**Transportbeveiliging:**
- **HTTPS afdwinging**: Alle sessiecommunicatie via TLS 1.3  
- **Veilige cookie-attributen**: HttpOnly, Secure, SameSite=Strict  
- **Certificaat pinning**: Voor kritieke verbindingen ter voorkoming van MITM-aanvallen  

### **Stateful vs Stateless Overwegingen**

**Voor Stateful implementaties:**
- Gedeelde sessiestatus vereist extra bescherming tegen injectie-aanvallen  
- Wachtrij-gebaseerd sessiebeheer heeft integriteitscontrole nodig  
- Meerdere serverinstanties vereisen veilige synchronisatie van sessiestatus  

**Voor Stateless implementaties:**
- JWT of vergelijkbaar token-gebaseerd sessiebeheer  
- Cryptografische verificatie van sessiestatusintegriteit  
- Verminderde aanvalsoppervlakte, maar vereist robuuste tokenvalidatie  

## 4. **AI-Specifieke Beveiligingscontroles**

**Aangepakte OWASP MCP Risico’s**:  
- [MCP06 - Promptinjectie via contextuele payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Toolvergiftiging](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Command Injection & Execution](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)  

### **Verdediging tegen Promptinjectie**

**Integratie Microsoft Prompt Shields:**
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

**Implementatiecontroles:**
- **Input-sanering**: Uitgebreide validatie en filtering van alle gebruikersinvoer  
- **Definitie contentgrenzen**: Duidelijke scheiding tussen systeeminstructies en gebruikerscontent  
- **Instructiehiërarchie**: Correcte prioriteitsregels voor conflicterende instructies  
- **Outputmonitoring**: Detectie van potentieel schadelijke of gemanipuleerde outputs  

### **Preventie van Toolvergiftiging**

**Toolbeveiligingsraamwerk:**
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

**Dynamisch toolbeheer:**
- **Goedkeuringsworkflow**: Expliciete gebruikersconsent voor toolwijzigingen  
- **Rollback-mogelijkheden**: Terugdraaien naar eerdere toolversies  
- **Wijzigingsaudits**: Volledige geschiedenis van tooldefinitiewijzigingen  
- **Risicobeoordeling**: Geautomatiseerde evaluatie van toolbeveiligingspositie  

## 5. **Preventie van Confused Deputy-aanvallen**

### **OAuth Proxy Beveiliging**

**Aanvalspreventiecontroles:**
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

**Implementatie-eisen:**
- **Verificatie gebruikersconsent**: Nooit consentschermen overslaan voor dynamische clientregistratie  
- **Redirect URI-validatie**: Strikte whitelist-gebaseerde validatie van omleidingsbestemmingen  
- **Bescherming autorisatiecodes**: Kortdurende codes met eenmalige gebruiksafdwinging  
- **Clientidentiteitsverificatie**: Robuuste validatie van clientreferenties en metadata  

## 6. **Tooluitvoering Beveiliging**

### **Sandboxing & Isolatie**

**Container-gebaseerde isolatie:**
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

**Procesisolatie:**
- **Gescheiden procescontexten**: Elke tooluitvoering in geïsoleerde processruimte  
- **Inter-procescommunicatie**: Veilige IPC-mechanismen met validatie  
- **Procesmonitoring**: Gedragsanalyse en detectie van anomalieën tijdens runtime  
- **Resourceafdwinging**: Strikte limieten op CPU, geheugen en I/O-bewerkingen  

### **Implementatie van Least Privilege**

**Beheer van machtigingen:**
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

## 7. **Supply Chain Beveiligingscontroles**

**Aangepakt OWASP MCP Risico**: [MCP04 - Supply Chain-aanvallen](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Verificatie van afhankelijkheden**

**Uitgebreide componentbeveiliging:**
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

### **Continue monitoring**

**Detectie van supply chain-bedreigingen:**
- **Gezondheidsmonitoring afhankelijkheden**: Continue beoordeling van alle afhankelijkheden op beveiligingsproblemen  
- **Integratie van dreigingsinformatie**: Real-time updates over opkomende supply chain-bedreigingen  
- **Gedragsanalyse**: Detectie van abnormaal gedrag in externe componenten  
- **Geautomatiseerde respons**: Directe inperking van gecompromitteerde componenten  

## 8. **Monitoring- & Detectiecontroles**

**Aangepakt OWASP MCP Risico**: [MCP08 - Ontbreken van audit & telemetrie](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Security Information and Event Management (SIEM)**

**Omvattende logstrategieën:**
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

### **Realtime dreigingsdetectie**

**Gedragsanalyse:**
- **User Behavior Analytics (UBA)**: Detectie van ongebruikelijke gebruikerstoegangspatronen  
- **Entity Behavior Analytics (EBA)**: Monitoring van MCP-server en toolgedrag  
- **Machine Learning anomaliedetectie**: AI-gestuurde identificatie van beveiligingsbedreigingen  
- **Dreigingsinformatiecorrelatie**: Afstemming van waargenomen activiteiten op bekende aanvalspatronen  

## 9. **Incident Response & Herstel**

### **Geautomatiseerde reactiemogelijkheden**

**Onmiddellijke responsacties:**
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

### **Forensische capaciteiten**

**Onderzoekssteun:**
- **Behoud audittrail**: Onoverwinnelijke logging met cryptografische integriteit  
- **Verzameling bewijsmateriaal**: Geautomatiseerde verzameling van relevante beveiligingsartefacten  
- **Tijdslijnreconstructie**: Gedetailleerde volgorde van gebeurtenissen voorafgaand aan beveiligingsincidenten  
- **Impactbeoordeling**: Evaluatie van compromitteringsomvang en data-exposure  

## **Belangrijke Beveiligingsarchitectuurprincipes**

### **Defense in Depth**
- **Meerdere beveiligingslagen**: Geen enkel punt van falen in de beveiligingsarchitectuur  
- **Redundante controles**: Overlappende beveiligingsmaatregelen voor kritieke functies  
- **Fail-safe mechanismen**: Veilige standaardinstellingen bij fouten of aanvallen  

### **Zero Trust Implementatie**
- **Nooit vertrouwen, altijd verifiëren**: Continue validatie van alle entiteiten en verzoeken  
- **Principe van minste privilege**: Minimale toegangsrechten voor alle componenten  
- **Micro-segmentatie**: Gedetailleerde netwerk- en toegangscontrole  

### **Continue beveiligingsevolutie**
- **Aanpassing aan dreigingslandschap**: Regelmatige updates om opkomende bedreigingen aan te pakken  
- **Effectiviteit van beveiligingscontroles**: Voortdurende evaluatie en verbetering van controles  
- **Naleving van specificaties**: Afstemming op evoluerende MCP-beveiligingsstandaarden  

---

## **Implementatiebronnen**

### **Officiële MCP-documentatie**
- [MCP Specificatie (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP Autorisatiespecificatie](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  

### **OWASP MCP Beveiligingsbronnen**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omvattende OWASP MCP Top 10 met Azure-implementatie  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Officiële OWASP MCP beveiligingsrisico’s  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Hands-on beveiligingstraining voor MCP op Azure  

### **Microsoft Beveiligingsoplossingen**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)  

### **Beveiligingsstandaarden**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 voor Large Language Models](https://genai.owasp.org/)  
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)  

---

> **Belangrijk**: Deze beveiligingscontroles reflecteren de huidige MCP-specificatie (2025-11-25). Controleer altijd de nieuwste [officiële documentatie](https://spec.modelcontextprotocol.io/) aangezien standaarden snel blijven evolueren.

## Wat Nu

- Terug naar: [Overzicht Beveiligingsmodule](./README.md)
- Ga door naar: [Module 3: Aan de slag](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dit document is vertaald met behulp van de AI-vertalingsservice [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel wij streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het oorspronkelijke document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->