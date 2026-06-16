# MCP-Sicherheitskontrollen - Update Februar 2026

> **Aktueller Standard**: Dieses Dokument spiegelt die Sicherheitsanforderungen der [MCP-Spezifikation 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) und die offiziellen [MCP-Sicherheits-Best-Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) wider.

Das Model Context Protocol (MCP) hat sich mit verbesserten Sicherheitskontrollen erheblich weiterentwickelt, die sowohl traditionelle Softwaresicherheit als auch KI-spezifische Bedrohungen adressieren. Dieses Dokument bietet umfassende Sicherheitskontrollen für sichere MCP-Implementierungen, die auf dem OWASP MCP Top 10 Rahmenwerk basieren.

## 🏔️ Praxisorientiertes Sicherheitstraining

Für praktische Erfahrungen bei der Sicherheitsimplementierung empfehlen wir den **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - eine umfassende geführte Expedition zur Absicherung von MCP-Servern in Azure mit einer Methodik „verwundbar → exploit → fix → validieren“.

Alle Sicherheitskontrollen in diesem Dokument stimmen mit dem **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** überein, der Referenzarchitekturen und Azure-spezifische Implementierungsanleitungen für die OWASP MCP Top 10 Risiken bereitstellt.

## **VERPFLICHTENDE Sicherheitsanforderungen**

### **Kritische Verbote aus der MCP-Spezifikation:**

> **VERBOTEN**: MCP-Server **DÜRFEN KEINE** Tokens akzeptieren, die nicht ausdrücklich für den MCP-Server ausgestellt wurden  
>  
> **UNTERSAGT**: MCP-Server **DÜRFEN KEINE** Sessions für die Authentifizierung verwenden  
>  
> **ERFORDERLICH**: MCP-Server, die Autorisierung implementieren, **MÜSSEN** ALLE eingehenden Anfragen verifizieren  
>  
> **VERPFLICHTEND**: MCP-Proxy-Server, die statische Client-IDs verwenden, **MÜSSEN** für jeden dynamisch registrierten Client die Zustimmung des Benutzers einholen

---

## 1. **Authentifizierungs- und Autorisierungskontrollen**

### **Integration externer Identitätsanbieter**

Der **aktuelle MCP-Standard (2025-11-25)** erlaubt MCP-Servern, die Authentifizierung an externe Identitätsanbieter zu delegieren, was eine erhebliche Sicherheitsverbesserung darstellt:

**Adressiertes OWASP MCP-Risiko**: [MCP07 - Unzureichende Authentifizierung & Autorisierung](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Sicherheitsvorteile:**  
1. **Eliminiert individuelle Authentifizierungsrisiken**: Verringert Angriffsfläche durch Vermeidung eigener Authentifizierungsimplementierungen  
2. **Enterprise-Class Sicherheit**: Nutzt etablierte Identitätsanbieter wie Microsoft Entra ID mit erweiterten Sicherheitsfunktionen  
3. **Zentralisiertes Identitätsmanagement**: Vereinfacht Benutzerlebenszyklusverwaltung, Zugriffskontrolle und Compliance-Audits  
4. **Multi-Faktor-Authentifizierung**: Erbt MFA-Funktionalität von Unternehmens-Identitätsanbietern  
5. **Conditional Access Policies**: Profitiert von risikobasierten Zugriffskontrollen und adaptiver Authentifizierung

**Implementierungsanforderungen:**  
- **Token-Zielgruppen-Validierung**: Verifizieren, dass alle Tokens ausdrücklich für den MCP-Server ausgestellt sind  
- **Aussteller-Validierung**: Sicherstellen, dass das Token vom erwarteten Identitätsanbieter ausgestellt wurde  
- **Signatur-Validierung**: Kryptografische Prüfung der Token-Integrität  
- **Ablaufdurchsetzung**: Strikte Einhaltung der Token-Gültigkeitsdauer  
- **Scope-Validierung**: Sicherstellen, dass Tokens die passenden Berechtigungen für die angeforderten Operationen enthalten

### **Sicherheit der Autorisierungslogik**

**Kritische Kontrollen:**  
- **Umfassende Autorisierungsprüfungen**: Regelmäßige Sicherheitsüberprüfung aller Autorisierungsentscheidungen  
- **Fail-Safe-Defaults**: Zugriff verweigern, wenn die Autorisierungslogik keine eindeutige Entscheidung treffen kann  
- **Berechtigungsgrenzen**: Klare Trennung verschiedener Privilegienstufen und Ressourcenzugriffe  
- **Audit-Logging**: Vollständige Protokollierung aller Autorisierungsentscheidungen für Sicherheitsüberwachung  
- **Regelmäßige Zugriffskontrollen**: Periodische Überprüfung von Benutzerberechtigungen und Privilegien

## 2. **Token-Sicherheit & Anti-Passthrough-Kontrollen**

**Adressiertes OWASP MCP-Risiko**: [MCP01 - Fehlermanagement von Tokens & Geheimnisexposition](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Verhinderung von Token-Passthrough**

**Token-Passthrough ist in der MCP-Autorisierungsspezifikation aufgrund kritischer Sicherheitsrisiken ausdrücklich verboten:**

**Adressierte Sicherheitsrisiken:**  
- **Umgehung von Kontrollen**: Umgeht essentielle Sicherheitskontrollen wie Rate Limiting, Anfragevalidierung und Verkehrsüberwachung  
- **Verlust der Verantwortlichkeit**: Erschwert die Identifikation von Clients und beschädigt Audit-Trails und Sicherheitsuntersuchungen  
- **Proxy-basierte Exfiltration**: Erlaubt Angreifern, Server als Proxy für unautorisierten Datenzugriff zu verwenden  
- **Verletzung von Vertrauensgrenzen**: Bricht Vertrauen der nachgelagerten Dienste bezüglich Token-Herkunft  
- **Seitliche Bewegung**: Kompromittierte Tokens in mehreren Diensten erweitern den Angriffsspielraum

**Implementierungskontrollen:**  
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
  
### **Sichere Token-Verwaltungsmuster**

**Best Practices:**  
- **Kurzlebige Tokens**: Minimieren das Risiko durch häufigen Tokenwechsel  
- **Just-in-Time-Ausgabe**: Tokens nur bei Bedarf für spezifische Operationen ausstellen  
- **Sichere Speicherung**: Einsatz von Hardware-Sicherheitsmodulen (HSM) oder sicheren Schlüsseltresoren  
- **Token Binding**: Tokens an spezifische Clients, Sessions oder Operationen binden, wenn möglich  
- **Überwachung & Alarmierung**: Echtzeit-Erkennung von Missbrauch oder unautorisierten Zugriffen

## 3. **Sitzungssicherheitskontrollen**

### **Verhinderung von Session-Hijacking**

**Adressierte Angriffsvektoren:**  
- **Session-Hijack-Prompt-Injektion**: Einschleusen bösartiger Events in gemeinsamen Sitzungszustand  
- **Session-Imitation**: Nicht autorisierte Nutzung gestohlener Session-IDs zum Authentifizierungsumgehung  
- **Resume-fähige Stream-Angriffe**: Ausnutzung der Wiederaufnahme von servergesendeten Ereignissen für schädlichen Content

**Verpflichtende Sitzungs-Kontrollen:**  
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
  
**Transportsicherheit:**  
- **HTTPS-Erzwingung**: Alle Sitzungs-Kommunikation über TLS 1.3  
- **Sichere Cookie-Attribute**: HttpOnly, Secure, SameSite=Strict  
- **Certificate Pinning**: Für kritische Verbindungen zum Schutz vor MITM-Angriffen

### **Zustandsbehaftete vs. Zustandslose Überlegungen**

**Für zustandsbehaftete Implementierungen:**  
- Gemeinsamer Sitzungszustand benötigt zusätzlichen Schutz gegen Injektionsangriffe  
- Warteschlangenbasierte Sitzungsverwaltung benötigt Integritätsprüfung  
- Mehrere Serverinstanzen erfordern sichere Synchronisierung des Sitzungszustands

**Für zustandslose Implementierungen:**  
- JWT oder ähnliches tokenbasiertes Sitzungsmanagement  
- Kryptografische Überprüfung der Sitzungszustandsintegrität  
- Geringere Angriffsfläche, erfordert aber robuste Tokenvalidierung

## 4. **KI-spezifische Sicherheitskontrollen**

**Adressierte OWASP MCP-Risiken:**  
- [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Toolvergiftung](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Command Injection & Execution](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Prompt Injection Abwehr**

**Integration von Microsoft Prompt Shields:**  
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
  
**Implementierungskontrollen:**  
- **Eingabesäuberung**: Umfassende Validierung und Filterung aller Benutzereingaben  
- **Definition von Inhaltsgrenzen**: Klare Trennung zwischen Systemanweisungen und Benutzerinhalten  
- **Befehlshierarchie**: Korrekte Prioritätsregeln bei widersprüchlichen Anweisungen  
- **Ausgabeüberwachung**: Erkennung potenziell schädlicher oder manipulierte Ausgaben

### **Verhinderung von Toolvergiftung**

**Tool-Sicherheits-Framework:**  
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
  
**Dynamisches Tool-Management:**  
- **Genehmigungs-Workflows**: Explizite Zustimmung der Nutzer für Tool-Änderungen  
- **Rollback-Fähigkeiten**: Möglichkeit zur Rückkehr zu früheren Tool-Versionen  
- **Änderungsüberwachung**: Vollständige Historie der Tool-Definitionsänderungen  
- **Risikobewertung**: Automatisierte Bewertung der Sicherheit der Tools

## 5. **Verhinderung von Confused Deputy Attacken**

### **OAuth Proxy Sicherheit**

**Schutzmaßnahmen:**  
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
  
**Implementierungsanforderungen:**  
- **Verifizierung der Benutzerzustimmung**: Zustimmungsschirme bei dynamischer Clientregistrierung niemals überspringen  
- **Validierung von Redirect URIs**: Strenge Whitelist-basierte Prüfung der Weiterleitungsziele  
- **Schutz von Autorisierungscodes**: Kurzlebige Codes mit Einmalnutzung  
- **Validierung der Client-Identität**: Robuste Überprüfung von Client-Anmeldedaten und Metadaten

## 6. **Werkzeug-Ausführungssicherheit**

### **Sandboxing & Isolation**

**Container-basierte Isolation:**  
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
  
**Prozessisolierung:**  
- **Separate Prozesskontexte**: Jede Werkzeugausführung in separatem Prozessraum  
- **Interprozesskommunikation**: Sichere IPC-Mechanismen mit Validierung  
- **Prozessüberwachung**: Laufzeitanalyse und Anomalieerkennung  
- **Ressourcenkontrolle**: Harte Limits bei CPU, Speicher und I/O-Operationen

### **Minimalprivilegien-Prinzip**

**Berechtigungsmanagement:**  
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
  
## 7. **Lieferkettensicherheitskontrollen**

**Adressiertes OWASP MCP-Risiko**: [MCP04 - Angriffe auf Software-Lieferketten & Manipulation von Abhängigkeiten](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Abhängigkeitsvalidierung**

**Umfassende Komponentensicherheit:**  
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
  
### **Kontinuierliche Überwachung**

**Erkennung von Lieferkettenbedrohungen:**  
- **Gesundheitsüberwachung von Abhängigkeiten**: Permanente Sicherheitsbewertung aller Abhängigkeiten  
- **Integration von Bedrohungsinformationen**: Echtzeit-Updates zu neuen Lieferkettenbedrohungen  
- **Verhaltensanalyse**: Erkennung ungewöhnlichen Verhaltens in externen Komponenten  
- **Automatisierte Reaktion**: Sofortige Eindämmung kompromittierter Komponenten

## 8. **Überwachungs- und Erkennungskontrollen**

**Adressiertes OWASP MCP-Risiko**: [MCP08 - Fehlendes Audit- und Telemetrie-Management](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Security Information and Event Management (SIEM)**

**Umfassende Protokollierungsstrategie:**  
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
  
### **Echtzeit-Bedrohungserkennung**

**Verhaltensanalyse:**  
- **User Behavior Analytics (UBA)**: Erkennung ungewöhnlicher Nutzerzugriffsmuster  
- **Entity Behavior Analytics (EBA)**: Überwachung von MCP-Server- und Werkzeugverhalten  
- **Maschinelles Lernen für Anomalieerkennung**: KI-gestützte Identifikation von Sicherheitsbedrohungen  
- **Bedrohungsinformationskorrelation**: Abgleich beobachteter Aktivitäten mit bekannten Angriffsmustern

## 9. **Incident Response & Wiederherstellung**

### **Automatisierte Reaktionsfähigkeit**

**Sofortmaßnahmen:**  
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
  
### **Forensische Fähigkeiten**

**Unterstützung bei Untersuchungen:**  
- **Erhaltung der Audit-Trails**: Unveränderliche Protokollierung mit kryptografischer Integrität  
- **Beweissammlung**: Automatische Erfassung relevanter Sicherheitsartefakte  
- **Zeitlichen Ablauf rekonstruieren**: Detaillierte Ereignisfolge vor Sicherheitsvorfällen  
- **Auswirkungsbeurteilung**: Evaluierung des Kompromittierungsumfangs und möglichen Datenlecks

## **Wesentliche Sicherheitsarchitekturprinzipien**

### **Verteidigung in die Tiefe**  
- **Mehrere Sicherheitsebenen**: Kein einziger Ausfallpunkt in der Sicherheitsarchitektur  
- **Redundante Kontrollen**: Überlappende Sicherheitsmaßnahmen für kritische Funktionen  
- **Fail-Safe-Mechanismen**: Sichere Standardeinstellungen bei Fehlern oder Angriffen

### **Zero Trust Implementierung**  
- **Nie vertrauen, immer verifizieren**: Kontinuierliche Validierung aller Entitäten und Anfragen  
- **Prinzip des geringsten Privilegs**: Minimale Zugriffsrechte für alle Komponenten  
- **Mikrosegmentierung**: Feingranulare Netz- und Zugriffskontrollen

### **Kontinuierliche Sicherheitsentwicklung**  
- **Anpassung an Bedrohungslandschaft**: Regelmäßige Aktualisierungen zur Abwehr neuer Bedrohungen  
- **Wirksamkeit der Kontrollen**: Fortlaufende Bewertung und Verbesserung der Sicherheitsmaßnahmen  
- **Spezifikationskonformität**: Übereinstimmung mit sich entwickelnden MCP-Sicherheitsstandards

---

## **Implementierungsressourcen**

### **Offizielle MCP-Dokumentation**  
- [MCP-Spezifikation (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP-Sicherheits-Best-Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP-Autorisierungsspezifikation](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP-Sicherheitsressourcen**  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) – Umfassende OWASP MCP Top 10 mit Azure-Implementierung  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Offizielle OWASP MCP-Sicherheitsrisiken  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – Praxisorientiertes Sicherheitstraining für MCP in Azure

### **Microsoft-Sicherheitslösungen**  
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Sicherheitsstandards**  
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 für große Sprachmodelle](https://genai.owasp.org/)  
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **Wichtig**: Diese Sicherheitskontrollen spiegeln die aktuelle MCP-Spezifikation (2025-11-25) wider. Prüfen Sie stets die neueste [offizielle Dokumentation](https://spec.modelcontextprotocol.io/), da sich Standards schnell weiterentwickeln.

## Was kommt als Nächstes

- Zurück zu: [Überblick Sicherheitsmodul](./README.md)  
- Weiter zu: [Modul 3: Erste Schritte](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->