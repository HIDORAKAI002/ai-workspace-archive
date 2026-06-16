# MCP Beveiligingscontroles - Update Februari 2026

> **Huidige Standaard**: Dit document weerspiegelt de beveiligingseisen van [MCP Specificatie 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) en de officiële [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Het Model Context Protocol (MCP) is significant volwassen geworden met verbeterde beveiligingscontroles die zowel traditionele softwarebeveiliging als AI-specifieke bedreigingen aanpakken. Dit document biedt uitgebreide beveiligingscontroles voor veilige MCP-implementaties, afgestemd op het OWASP MCP Top 10-framework.

## 🏔️ Praktische Training in Beveiliging

Voor praktische, hands-on ervaring met beveiligingsimplementatie bevelen we de **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** aan - een uitgebreide begeleide expeditie om MCP-servers in Azure te beveiligen met behulp van een "kwetsbaar → exploit → fix → validatie" methodologie.

Alle beveiligingscontroles in dit document zijn in lijn met de **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, die referentie-architecturen en Azure-specifieke implementatie-instructies biedt voor de OWASP MCP Top 10 risico’s.

## **VERPLICHTE Beveiligingseisen**

### **Kritieke Verboden uit MCP Specificatie:**

> **VERBODEN**: MCP-servers **MÓETEN GEEN** tokens accepteren die niet expliciet voor de MCP-server zijn uitgegeven  
>  
> **VERBODEN**: MCP-servers **MÓETEN GEEN** sessies gebruiken voor authenticatie  
>  
> **VERPLICHT**: MCP-servers die autorisatie implementeren **MÓETEN** ALLE inkomende verzoeken verifiëren  
>  
> **VERPLICHT**: MCP proxy-servers die statische client-ID’s gebruiken **MÓETEN** voor elk dynamisch geregistreerde client gebruikersconsent verkrijgen

---

## 1. **Authenticatie- & Autorisatiecontroles**

### **Integratie van Externe Identiteitsprovider**

**Huidige MCP Standaard (2025-11-25)** staat MCP-servers toe authenticatie te delegeren aan externe identiteitsproviders, wat een significante beveiligingsverbetering is:

**Aangesproken OWASP MCP Risico**: [MCP07 - Onvoldoende Authenticatie & Autorisatie](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Beveiligingsvoordelen:**
1. **Vermindert Risico’s van Aangepaste Authenticatie**: Beperkt het kwetsbaarheidsoppervlak door aangepaste authenticatie-implementaties te vermijden  
2. **Enterprise-Grade Beveiliging**: Maakt gebruik van gevestigde identiteitsproviders zoals Microsoft Entra ID met geavanceerde beveiligingsfuncties  
3. **Gecentraliseerd Identiteitsbeheer**: Vereenvoudigt gebruikerslevenscyclusbeheer, toegangscontrole en compliance-audits  
4. **Multi-Factor Authenticatie**: Erft MFA-capaciteiten van enterprise identiteitsproviders  
5. **Voorwaardelijke Toegangsbeleidsregels**: Profiteert van risicogebaseerde toegangscontroles en adaptieve authenticatie

**Implementatie-eisen:**
- **Token Audience Validatie**: Verifieer dat alle tokens expliciet zijn uitgegeven voor de MCP-server  
- **Uitgever Verificatie**: Valideer dat de tokenuitgever overeenkomt met de verwachte identiteitsprovider  
- **Handtekeningverificatie**: Cryptografische validatie van tokenintegriteit  
- **Verloop Handhaving**: Strikte naleving van tokenlevensduur  
- **Scope-validatie**: Zorg dat tokens de juiste machtigingen bevatten voor opgevraagde bewerkingen

### **Beveiliging Autorisatielogica**

**Kritieke Controles:**
- **Uitgebreide Autorisatie-audits**: Regelmatige beveiligingsreviews van alle autorisatiebeslissingen  
- **Fail-Safe Standaarden**: Toegang weigeren wanneer autorisatielogica geen definitieve beslissing kan nemen  
- **Machtigingsgrenzen**: Duidelijke scheiding tussen verschillende privilege-niveaus en resource-toegang  
- **Audit Logging**: Volledige registratie van alle autorisatiebeslissingen voor beveiligingsmonitoring  
- **Regelmatige Toegangsreviews**: Periodieke validatie van gebruikersrechten en privilege-toewijzingen

## 2. **Tokenbeveiliging & Anti-Passthrough Controles**

**Aangesproken OWASP MCP Risico**: [MCP01 - Token Mismanagement & Geheime Blootstelling](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Voorkoming van Token Passthrough**

**Token passthrough is uitdrukkelijk verboden** in de MCP Autorisatiespecificatie vanwege kritieke beveiligingsrisico’s:

**Aangesproken Beveiligingsrisico’s:**
- **Omzeiling van Controle**: Omzeilt essentiële beveiligingscontroles zoals limitatie, verzoekvalidatie en verkeersmonitoring  
- **Onverantwoordelijkheid**: Maakt client-identificatie onmogelijk, wat auditsporen en incidentonderzoek verstoort  
- **Proxy-gebaseerde Exfiltratie**: Staat kwaadwillenden toe servers als proxy’s voor ongeautoriseerde data-access te gebruiken  
- **Vertrouwensgrensschendingen**: Doorbreekt vertrouwensverwachtingen van downstreamdiensten over tokenherkomst  
- **Zijdelingse Beweging**: Gecompromitteerde tokens over meerdere services maken bredere aanvalsexpansie mogelijk

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
  
### **Veilige Tokenbeheerpatronen**

**Best Practices:**  
- **Kortlevende Tokens**: Minimaliseer blootstellingsvenster door frequente tokenrotatie  
- **Just-in-Time Uitgifte**: Tokens alleen uitgeven wanneer nodig voor specifieke operaties  
- **Veilige Opslag**: Gebruik hardware security modules (HSM’s) of beveiligde sleutelkluizen  
- **Tokenbinding**: Bind tokens wanneer mogelijk aan specifieke clients, sessies of operaties  
- **Monitoring & Alerting**: Realtime detectie van tokenmisbruik of ongeautoriseerde toegangspatronen

## 3. **Sessiebeveiligingscontroles**

### **Voorkoming van Sessiekaping**

**Aangevallen Vectoren:**
- **Sessiekaping Promptinjectie**: Kwaadaardige gebeurtenissen geïnjecteerd in gedeelde sessiestatus  
- **Sessie-Identiteitsfraude**: Ongeautoriseerd gebruik van gestolen sessie-ID’s om authenticatie te omzeilen  
- **Hervatbare Stream-aanvallen**: Exploitatie van server-sent event herstart voor kwaadaardige contentinjectie

**Verplichte Sessiebeveiligingen:**  
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
- **HTTPS Handhaving**: Alle sessiecommunicatie via TLS 1.3  
- **Veilige Cookie-eigenschappen**: HttpOnly, Secure, SameSite=Strict  
- **Certificaat Pinning**: Voor kritieke connecties ter voorkoming van MITM-aanvallen

### **Stateful versus Stateless Overwegingen**

**Voor Stateful Implementaties:**  
- Gedeelde sessiestatus vereist extra bescherming tegen injectie-aanvallen  
- Wachtrij-gebaseerde sessiebeheer vereist integriteitsverificatie  
- Meerdere serverinstanties vereisen veilige synchronisatie van sessiestatus

**Voor Stateless Implementaties:**  
- JWT of soortgelijk token-gebaseerd sessiebeheer  
- Cryptografische verificatie van sessiestatusintegriteit  
- Verminderd aanvalsoppervlak, maar vereist robuuste tokenvalidatie

## 4. **AI-Specifieke Beveiligingscontroles**

**Aangesproken OWASP MCP Risico’s**:  
- [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Tool Vergiftiging](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
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
- **Input Sanitatie**: Uitgebreide validatie en filtering van alle gebruikersinvoer  
- **Contentgrensdefinitie**: Duidelijke scheiding tussen systeeminstructies en gebruikersinhoud  
- **Instructiehiërarchie**: Juiste prioriteitsregels voor conflicterende instructies  
- **Outputmonitoring**: Detectie van potentieel schadelijke of gemanipuleerde outputs

### **Voorkoming van Toolvergiftiging**

**Framework voor Toolbeveiliging:**  
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
  
**Dynamisch Toolbeheer:**  
- **Goedkeuringsworkflows**: Expliciete gebruikersconsent voor toolwijzigingen  
- **Rollback-mogelijkheden**: Mogelijkheid om terug te keren naar eerdere toolversies  
- **Wijzigingsaudit**: Volledige geschiedenis van aanpassingen in tooldefinities  
- **Risicobeoordeling**: Geautomatiseerde evaluatie van de beveiligingspositie van tools

## 5. **Voorkoming Confused Deputy Aanvallen**

### **OAuth Proxy Beveiliging**

**Aanvalsvoorkomingscontroles:**  
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
- **Gebruikersconsent Verificatie**: Nooit consentschermen overslaan bij dynamische clientregistratie  
- **Redirect URI Validatie**: Strikte whitelist-gebaseerde validatie van omleidingsbestemmingen  
- **Bescherming autorisatiecode**: Kortlevende codes met eenmalige naleving  
- **Verificatie cliëntidentiteit**: Robuuste validatie van clientreferenties en metadata

## 6. **Tooluitvoeringsbeveiliging**

### **Sandboxing & Isolatie**

**Container-gebaseerde Isolatie:**  
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
- **Gescheiden Procescontexten**: Elke tooluitvoering in geïsoleerde procesruimte  
- **Inter-Process Communicatie**: Veilige IPC-mechanismen met validatie  
- **Procesmonitoring**: Gedragsanalyse en anomaliedetectie tijdens runtime  
- **Hulpmiddelenhandhaving**: Strikte limieten op CPU, geheugen en I/O-operaties

### **Implementatie van Least Privilege**

**Machtigingsbeheer:**  
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

**Aangesproken OWASP MCP Risico**: [MCP04 - Software Supply Chain-aanvallen & Dependency Manipulatie](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Validatie van Afhankelijkheden**

**Uitgebreide Componentbeveiliging:**  
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
  
### **Continue Monitoring**

**Detectie van Supply Chain Bedreigingen:**  
- **Monitoring van Dependency Gezondheid**: Voortdurende beoordeling van alle afhankelijkheden op beveiligingsproblemen  
- **Integratie van Threat Intelligence**: Realtime updates over opkomende supply chain-bedreigingen  
- **Gedragsanalyse**: Detectie van ongebruikelijk gedrag in externe componenten  
- **Geautomatiseerde Respons**: Onmiddellijke inperking van gecompromitteerde componenten

## 8. **Monitoring & Detectiecontroles**

**Aangesproken OWASP MCP Risico**: [MCP08 - Gebrek aan Audit en Telemetrie](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Security Information and Event Management (SIEM)**

**Omvattende Logstrategie:**  
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
  
### **Realtime Dreigingsdetectie**

**Gedragsanalyse:**  
- **User Behavior Analytics (UBA)**: Detectie van ongebruikelijke gebruikers toegangs-patronen  
- **Entity Behavior Analytics (EBA)**: Monitoring van MCP-server en toolgedrag  
- **Machine Learning Anomaliedetectie**: AI-gestuurde identificatie van beveiligingsbedreigingen  
- **Threat Intelligence Correlatie**: Afstemming van waargenomen activiteiten met bekende aanvalspatronen

## 9. **Incident Response & Herstel**

### **Geautomatiseerde Reactiemogelijkheden**

**Directe Responsacties:**  
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
  
### **Forensische Capaciteiten**

**Ondersteuning Onderzoek:**  
- **Auditspoorbehoud**: Onveranderlijke logging met cryptografische integriteit  
- **Bewijsverzameling**: Geautomatiseerde verzameling van relevante beveiligingsartefacten  
- **Tijdlijnreconstructie**: Gedetailleerde volgorde van gebeurtenissen die leidden tot beveiligingsincidenten  
- **Impactbeoordeling**: Evaluatie van omvang compromis en blootstelling van gegevens

## **Belangrijke Beveiligingsarchitectuurprincipes**

### **Verdediging in Diepte**
- **Meerdere Beveiligingslagen**: Geen enkel punt van falen in beveiligingsarchitectuur  
- **Redundante Controles**: Overlappende veiligheidsmaatregelen voor kritische functies  
- **Fail-Safe Mechanismen**: Veilige standaarden bij fouten of aanvallen

### **Zero Trust Implementatie**
- **Nooit Vertrouwen, Altijd Verifiëren**: Continue validatie van alle entiteiten en verzoeken  
- **Principe van Minimaal Privilege**: Minimale toegangsrechten voor alle componenten  
- **Microsegmentatie**: Fijne netwerk- en toegangscontroles

### **Continue Beveiligingsevolutie**
- **Aanpassing aan Dreigingslandschap**: Regelmatige updates om nieuwe bedreigingen aan te pakken  
- **Effectiviteit van Beveiligingscontroles**: Doorlopende evaluatie en verbetering van controles  
- **Specificatie Naleving**: Afstemming op evoluerende MCP-beveiligingsstandaarden

---

## **Implementatiebronnen**

### **Officiële MCP Documentatie**
- [MCP Specificatie (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP Autorisatiespecificatie](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP Beveiligingsbronnen**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omvattende OWASP MCP Top 10 met Azure-implementatie  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Officiële OWASP MCP beveiligingsrisico’s  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktische beveiligingstraining voor MCP op Azure

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

> **Belangrijk**: Deze beveiligingscontroles weerspiegelen de huidige MCP-specificatie (2025-11-25). Verifieer altijd met de laatste [officiële documentatie](https://spec.modelcontextprotocol.io/) omdat de standaarden snel blijven evolueren.

## Wat Nu?

- Terug naar: [Overzicht Beveiligingsmodule](./README.md)  
- Verder naar: [Module 3: Aan de Slag](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->