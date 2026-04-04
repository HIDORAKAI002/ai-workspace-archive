# MCP-Sicherheitskontrollen – Update Februar 2026

> **Aktueller Standard**: Dieses Dokument spiegelt die Sicherheitsanforderungen der [MCP-Spezifikation 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) sowie die offiziellen [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) wider.

Das Model Context Protocol (MCP) hat sich mit erweiterten Sicherheitskontrollen, die sowohl traditionelle Software-Sicherheit als auch KI-spezifische Bedrohungen adressieren, deutlich weiterentwickelt. Dieses Dokument bietet umfassende Sicherheitskontrollen für sichere MCP-Implementierungen, die mit dem OWASP MCP Top 10-Rahmenwerk übereinstimmen.

## 🏔️ Praktische Sicherheitsschulung

Für praktische Erfahrungen bei der Sicherheitsimplementierung empfehlen wir den **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** – eine umfassende geführte Expedition zur Absicherung von MCP-Servern in Azure mit der Methodik „angreifbar → ausnutzen → beheben → validieren“.

Alle Sicherheitskontrollen in diesem Dokument stimmen mit dem **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** überein, der Referenzarchitekturen und Azure-spezifische Umsetzungsleitlinien für die OWASP MCP Top 10-Risiken bietet.

## **VERPFLICHTENDE Sicherheitsanforderungen**

### **Kritische Verbote aus der MCP-Spezifikation:**

> **VERBOTEN**: MCP-Server **DÜRFEN KEINE** Tokens akzeptieren, die nicht explizit für den MCP-Server ausgestellt wurden  
>
> **VERBOTEN**: MCP-Server **DÜRFEN KEINE** Sitzungen für die Authentifizierung verwenden  
>
> **ERFORDERLICH**: MCP-Server, die Autorisierung implementieren, **MÜSSEN** ALLE eingehenden Anfragen überprüfen  
>
> **VERPFLICHTEND**: MCP-Proxy-Server, die statische Client-IDs verwenden, **MÜSSEN** für jeden dynamisch registrierten Client die Zustimmung des Benutzers einholen  

---

## 1. **Authentifizierungs- & Autorisierungskontrollen**

### **Integration externer Identitätsanbieter**

**Aktueller MCP-Standard (2025-11-25)** erlaubt MCP-Servern, die Authentifizierung an externe Identitätsanbieter zu delegieren, was eine bedeutende Sicherheitsverbesserung darstellt:

**Adressiertes OWASP MCP-Risiko**: [MCP07 - Unzureichende Authentifizierung & Autorisierung](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Sicherheitsvorteile:**
1. **Eliminierung von Risiken benutzerdefinierter Authentifizierung**: Verringerung der Angriffsfläche durch Vermeidung individueller Authentifizierungsimplementierungen  
2. **Enterprise-Grade-Sicherheit**: Nutzung etablierter Identitätsanbieter wie Microsoft Entra ID mit fortgeschrittenen Sicherheitsfunktionen  
3. **Zentralisiertes Identitätsmanagement**: Vereinfachtes Management des Benutzerlebenszyklus, Zugriffskontrolle und Compliance-Audits  
4. **Multi-Faktor-Authentifizierung**: Übernahme von MFA-Funktionalitäten der Unternehmens-Identitätsanbieter  
5. **Bedingte Zugriffspolitiken**: Vorteile durch risikobasierte Zugriffskontrollen und adaptive Authentifizierung  

**Implementierungsanforderungen:**
- **Token-Zielgruppenvalidierung**: Überprüfung, dass alle Tokens explizit für den MCP-Server ausgegeben wurden  
- **Ausstellerprüfung**: Validierung, dass der Token-Aussteller dem erwarteten Identitätsanbieter entspricht  
- **Signaturprüfung**: Kryptographische Validierung der Token-Integrität  
- **Ablaufdurchsetzung**: Strikte Einhaltung der Token-Lebensdauer  
- **Scope-Validierung**: Sicherstellung, dass Tokens die entsprechenden Berechtigungen für angeforderte Operationen enthalten  

### **Sicherheit der Autorisierungslogik**

**Kritische Kontrollen:**
- **Umfassende Autorisierungsprüfungen**: Regelmäßige Sicherheitsüberprüfungen aller Autorisierungsentscheidungen  
- **Ausfallsichere Defaults**: Zugriff verweigern, wenn die Autorisierungslogik keine eindeutige Entscheidung treffen kann  
- **Berechtigungsgrenzen**: Klare Trennung zwischen verschiedenen Privilegienstufen und Ressourcenzugriff  
- **Audit-Logging**: Vollständige Protokollierung aller Autorisierungsentscheidungen zur Sicherheitsüberwachung  
- **Regelmäßige Zugriffsprüfungen**: Periodische Validierung von Benutzerberechtigungen und Privilegienzuweisungen  

## 2. **Token-Sicherheit & Anti-Passthrough-Kontrollen**

**Adressiertes OWASP MCP-Risiko**: [MCP01 - Fehlerhafte Token-Verwaltung & Geheimnisexposition](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Verhinderung von Token-Passthrough**

**Token-Passthrough ist in der MCP-Autorisierungsspezifikation aufgrund kritischer Sicherheitsrisiken ausdrücklich verboten:**

**Adressierte Sicherheitsrisiken:**
- **Kontrollumgehung**: Umgeht wesentliche Sicherheitskontrollen wie Ratenbegrenzung, Anfragenvalidierung und Verkehrsüberwachung  
- **Verlust der Verantwortlichkeit**: Verhindert Client-Identifikation, was Audit-Trails und Vorfalluntersuchungen beeinträchtigt  
- **Proxy-basierte Datenexfiltration**: Ermöglicht Angreifern, Server als Proxies für unautorisierten Datenzugriff zu nutzen  
- **Verletzung von Vertrauensgrenzen**: Bricht Vertrauen downstream-basierter Dienste bezüglich der Token-Herkunft  
- **Laterale Bewegungen**: Kompromittierte Tokens in mehreren Diensten erlauben eine breitere Ausdehnung von Angriffen  

**Umsetzungskontrollen:**
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
- **Kurzlebige Tokens**: Minimierung des Angriffsfensters durch häufigen Token-Wechsel  
- **Just-in-Time-Ausgabe**: Tokens werden nur bei Bedarf für spezifische Operationen ausgegeben  
- **Sichere Speicherung**: Einsatz von Hardware-Sicherheitsmodulen (HSMs) oder sicheren Schlüsseltresoren  
- **Token-Bindung**: Bindung von Tokens an spezifische Clients, Sitzungen oder Operationen, wo möglich  
- **Überwachung & Alarmierung**: Echtzeit-Erkennung von Token-Missbrauch oder unautorisierten Zugriffsmustern  

## 3. **Session-Sicherheitskontrollen**

### **Verhinderung von Session Hijacking**

**Adressierte Angriffsvektoren:**
- **Session Hijack Prompt Injection**: Einschleusen bösartiger Ereignisse in gemeinsam genutzten Sitzungsstatus  
- **Session-Impersonation**: Unbefugte Nutzung gestohlener Session-IDs zur Umgehung der Authentifizierung  
- **Wiederaufnehmbare Stream-Angriffe**: Ausnutzung von Server-Sent Event-Wiederaufnahme für bösartige Inhaltseinschleusung  

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
- **HTTPS-Durchsetzung**: Sämtliche Sitzungs-Kommunikation über TLS 1.3  
- **Sichere Cookie-Attribute**: HttpOnly, Secure, SameSite=Strict  
- **Zertifikat-Pinning**: Für kritische Verbindungen zur Verhinderung von MITM-Angriffen  

### **Zustandsbehaftete vs. zustandslose Überlegungen**

**Für zustandsbehaftete Implementierungen:**
- Gemeinsamer Sitzungsstatus erfordert zusätzlichen Schutz gegen Injection-Angriffe  
- Warteschlangenbasierte Sitzungsverwaltung benötigt Integritätsprüfung  
- Mehrfache Serverinstanzen erfordern sichere Synchronisation des Sitzungsstatus  

**Für zustandslose Implementierungen:**
- JWT oder ähnliche tokenbasierte Sitzungsverwaltung  
- Kryptographische Verifikation der Sitzungsstatusintegrität  
- Reduzierte Angriffsfläche, erfordert jedoch robuste Token-Validierung  

## 4. **KI-spezifische Sicherheitskontrollen**

**Adressierte OWASP MCP-Risiken**:  
- [MCP06 - Prompt Injection über kontextuelle Nutzlasten](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Tool Poisoning](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Befehlsinjektion & -ausführung](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)  

### **Prompt Injection Abwehr**

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

**Umsetzungskontrollen:**
- **Eingabesanierung**: Umfassende Validierung und Filterung sämtlicher Benutzereingaben  
- **Definition von Inhaltsgrenzen**: Klare Trennung zwischen Systemanweisungen und Benutzerinhalten  
- **Anweisungshierarchie**: Korrekte Vorrangregeln bei widersprüchlichen Anweisungen  
- **Ausgabeüberwachung**: Erkennung potenziell schädlicher oder manipulierten Ausgaben  

### **Verhinderung von Tool Poisoning**

**Tool-Sicherheitsframework:**  
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
- **Freigabeworkflows**: Explizite Zustimmung der Nutzer für Tooländerungen  
- **Rollback-Fähigkeiten**: Möglichkeit zur Rückkehr zu vorherigen Tool-Versionen  
- **Änderungsprotokollierung**: Vollständige Historie der Tool-Definition-Änderungen  
- **Risikobewertung**: Automatisierte Bewertung der Sicherheit des Tools  

## 5. **Verhinderung von Confused Deputy Angriffen**

### **OAuth Proxy Sicherheit**

**Angriffspräventions-Kontrollen:**  
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
- **Überprüfung der Nutzereinwilligung**: Zustimmung bei dynamischer Client-Registrierung niemals überspringen  
- **Validierung von Redirect-URIs**: Strikte Whitelist-basierte Validierung der Zieladressen für Redirects  
- **Schutz von Autorisierungscodes**: Kurzlebige Codes mit Einmalverwendung  
- **Validierung der Client-Identität**: Robuste Überprüfung von Client-Zugangsdaten und Metadaten  

## 6. **Tools-Ausführungssicherheit**

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

**Prozessisolation:**
- **Separate Prozesskontexte**: Jede Tool-Ausführung in isoliertem Prozessraum  
- **Interprozesskommunikation**: Sichere IPC-Mechanismen mit Validierung  
- **Prozessüberwachung**: Laufzeitanalyse von Verhalten und Anomalieerkennung  
- **Ressourcenbeschränkung**: Harte Limits für CPU, Speicher und I/O-Operationen  

### **Least-Privilege-Implementierung**

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

**Adressiertes OWASP MCP-Risiko**: [MCP04 - Lieferkettenangriffe](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Abhängigkeitsüberprüfung**

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

**Erkennung von Lieferkettendrohungen:**
- **Überwachung der Abhängigkeitsgesundheit**: Ständige Bewertung aller Abhängigkeiten auf Sicherheitsprobleme  
- **Integration von Bedrohungsinformationen**: Echtzeit-Updates zu neuen Lieferkettendrohungen  
- **Verhaltensanalyse**: Erkennung ungewöhnlichen Verhaltens in externen Komponenten  
- **Automatisierte Reaktion**: Sofortige Eindämmung kompromittierter Komponenten  

## 8. **Überwachungs- & Erkennungskontrollen**

**Adressiertes OWASP MCP-Risiko**: [MCP08 - Fehlender Audit & Telemetrie](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

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

**Verhaltensanalysen:**
- **User Behavior Analytics (UBA)**: Erkennung ungewöhnlicher Benutzerzugriffsmuster  
- **Entity Behavior Analytics (EBA)**: Überwachung des Verhaltens von MCP-Servern und Tools  
- **Maschinelles Lernen zur Anomalieerkennung**: KI-gestützte Identifikation von Sicherheitsbedrohungen  
- **Korrelation mit Bedrohungsinformationen**: Abgleich beobachteter Aktivitäten mit bekannten Angriffsmustern  

## 9. **Vorfallreaktion & Wiederherstellung**

### **Automatisierte Reaktionsfähigkeiten**

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
- **Erhaltung des Audit-Trails**: Unveränderliche Protokollierung mit kryptographischer Integrität  
- **Sammeln von Beweismitteln**: Automatisierte Erfassung relevanter Sicherheitsartefakte  
- **Zeitleistenrekonstruktion**: Detaillierte Ereignisfolge vor Sicherheitsvorfällen  
- **Auswirkungsbewertung**: Einschätzung des Kompromittierungsumfangs und Datenexposition  

## **Wichtige Prinzipien der Sicherheitsarchitektur**

### **Verteidigung in der Tiefe**
- **Mehrere Sicherheitsschichten**: Kein einziger Fehlerpunkt in der Sicherheitsarchitektur  
- **Redundante Kontrollen**: Überschneidende Sicherheitsmaßnahmen für kritische Funktionen  
- **Ausfallsichere Mechanismen**: Sichere Voreinstellungen bei Systemfehlern oder Angriffen  

### **Zero-Trust-Implementierung**
- **Nie vertrauen, immer verifizieren**: Kontinuierliche Validierung aller Entitäten und Anfragen  
- **Prinzip des geringsten Privilegs**: Minimale Zugriffsrechte für alle Komponenten  
- **Micro-Segmentierung**: Granulare Netzwerk- und Zugriffskontrollen  

### **Kontinuierliche Sicherheitsevolution**
- **Anpassung an Bedrohungslandschaft**: Regelmäßige Updates zur Bewältigung neuer Bedrohungen  
- **Wirksamkeit der Sicherheitskontrollen**: Fortlaufende Bewertung und Verbesserungen der Kontrollen  
- **Einhaltung der Spezifikation**: Ausrichtung an sich weiterentwickelnden MCP-Sicherheitsstandards  

---

## **Implementierungsressourcen**

### **Offizielle MCP-Dokumentation**
- [MCP-Spezifikation (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  

### **OWASP MCP Sicherheitsressourcen**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) – Umfassende OWASP MCP Top 10 mit Azure-Implementierung  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Offizielle OWASP MCP-Sicherheitsrisiken  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – Praktische Sicherheitsschulung für MCP auf Azure  

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

> **Wichtig**: Diese Sicherheitskontrollen entsprechen der aktuellen MCP-Spezifikation (2025-11-25). Bitte prüfen Sie stets die neueste [offizielle Dokumentation](https://spec.modelcontextprotocol.io/), da sich Standards schnell weiterentwickeln.

## Was kommt als Nächstes

- Zurück zu: [Übersicht Sicherheitsmodul](./README.md)
- Weiter zu: [Modul 3: Erste Schritte](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir um Genauigkeit bemüht sind, können automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten. Das Originaldokument in der Ursprungssprache gilt als maßgebliche Quelle. Für wichtige Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die durch die Nutzung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->