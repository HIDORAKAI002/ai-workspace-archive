# MCP Sicherheits-Best Practices – Februar 2026 Update

> **Wichtig**: Dieses Dokument spiegelt die neuesten Sicherheitsanforderungen der [MCP-Spezifikation 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) und die offiziellen [MCP Sicherheits-Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) wider. Konsultieren Sie stets die aktuelle Spezifikation für die aktuellsten Anleitungen.

## 🏔️ Praktisches Sicherheitstraining

Für praktische Umsetzungserfahrungen empfehlen wir den **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** – eine umfassende geführte Expedition zur Sicherung von MCP-Servern in Azure. Der Workshop behandelt alle OWASP MCP Top 10 Risiken mit der Methode „anfällig → ausnutzen → beheben → validieren“.

Alle Praktiken in diesem Dokument stimmen mit dem **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** für Azure-spezifische Umsetzungsempfehlungen überein.

## Wesentliche Sicherheitspraktiken für MCP-Implementierungen

Das Model Context Protocol bringt einzigartige Sicherheitsherausforderungen mit sich, die über traditionelle Softwaresicherheit hinausgehen. Diese Praktiken adressieren sowohl grundlegende Sicherheitsanforderungen als auch MCP-spezifische Bedrohungen, einschließlich Prompt Injection, Tool Poisoning, Session Hijacking, Confused Deputy Probleme und Token-Durchreich-Schwachstellen.

### **VERPFLICHTENDE Sicherheitsanforderungen**

**Kritische Anforderungen aus der MCP-Spezifikation:**

### **VERPFLICHTENDE Sicherheitsanforderungen**

**Kritische Anforderungen aus der MCP-Spezifikation:**

> **NICHT ERLAUBT**: MCP-Server **dürfen keine** Tokens akzeptieren, die nicht explizit für den MCP-Server ausgestellt wurden  
>  
> **ERFORDERLICH**: MCP-Server mit Autorisierung **müssen** ALLE eingehenden Anfragen verifizieren  
>  
> **NICHT ERLAUBT**: MCP-Server **dürfen keine** Sessions für die Authentifizierung verwenden  
>  
> **ERFORDERLICH**: MCP-Proxy-Server mit statischen Client-IDs **müssen** für jeden dynamisch registrierten Client die Zustimmung des Nutzers einholen

---

## 1. **Token-Sicherheit & Authentifizierung**

**Authentifizierungs- & Autorisierungskontrollen:**
   - **Strenge Autorisierungsüberprüfung**: Führen Sie umfassende Prüfungen der Autorisierungslogik des MCP-Servers durch, um sicherzustellen, dass nur beabsichtigte Nutzer und Clients Zugriff auf Ressourcen erhalten
   - **Integration externer Identitätsanbieter**: Verwenden Sie etablierte Identitätsanbieter wie Microsoft Entra ID anstelle von eigener Implementierung der Authentifizierung
   - **Überprüfung der Token-Audience**: Validieren Sie immer, dass Tokens explizit für Ihren MCP-Server ausgestellt wurden – akzeptieren Sie niemals Upstream-Tokens
   - **Angemessener Token-Lebenszyklus**: Implementieren Sie sichere Tokenrotation, Ablaufrichtlinien und verhindern Sie Token-Replay-Angriffe

**Geschütztes Token-Management:**
   - Verwenden Sie Azure Key Vault oder vergleichbare sichere Credential Stores für alle Geheimnisse  
   - Verschlüsseln Sie Tokens sowohl im Ruhezustand als auch während der Übertragung  
   - Regelmäßige Rotation von Zugangsdaten und Überwachung unbefugter Zugriffe

## 2. **Sitzungsmanagement & Transportsicherheit**

**Sichere Session-Praktiken:**
   - **Kryptographisch sichere Session-IDs**: Nutzen Sie sichere, nicht-deterministische Session-IDs, die mit sicheren Zufallszahlengeneratoren erzeugt werden  
   - **Benutzerspezifische Bindung**: Binden Sie Session-IDs an Nutzeridentitäten mit Formaten wie `<user_id>:<session_id>`, um Missbrauch zwischen Nutzern zu verhindern  
   - **Session-Lebenszyklus-Verwaltung**: Implementieren Sie angemessenen Ablauf, Rotation und Invalidierung, um Angriffsfenster zu begrenzen  
   - **HTTPS/TLS-Erzwingung**: HTTPS ist für sämtliche Kommunikation verpflichtend, um das Abfangen von Session-IDs zu verhindern

**Transportschichtsicherheit:**
   - Konfigurieren Sie TLS 1.3, sofern möglich, mit ordnungsgemäßem Zertifikatsmanagement  
   - Implementieren Sie Zertifikatspinning für kritische Verbindungen  
   - Regelmäßige Zertifikatsrotation und Überprüfung der Gültigkeit

## 3. **KI-spezifischer Bedrohungsschutz** 🤖

**Schutz gegen Prompt Injection:**
   - **Microsoft Prompt Shields**: Setzen Sie AI Prompt Shields ein für fortgeschrittene Erkennung und Filterung bösartiger Anweisungen  
   - **Eingabesanierung**: Validieren und bereinigen Sie alle Eingaben, um Injection-Angriffe und Confused Deputy Probleme zu verhindern  
   - **Inhaltliche Abgrenzungen**: Verwenden Sie Trennzeichen- und Datenmarkierungssysteme, um vertrauenswürdige Anweisungen von externen Inhalten zu unterscheiden

**Vermeidung von Tool Poisoning:**
   - **Validierung von Tool-Metadaten**: Führen Sie Integritätsprüfungen von Tool-Definitionen durch und überwachen Sie unerwartete Änderungen  
   - **Dynamische Tool-Überwachung**: Überwachen Sie das Laufzeitverhalten und richten Sie Alarmierungen für unerwartete Ausführungsmuster ein  
   - **Genehmigungs-Workflows**: Erfordern Sie explizite Nutzerfreigabe für Tool-Modifikationen und Funktionsänderungen

## 4. **Zugriffskontrolle & Berechtigungen**

**Prinzip der minimalen Rechtevergabe:**
   - Gewähren Sie MCP-Servern nur die minimal erforderlichen Berechtigungen für die beabsichtigte Funktionalität  
   - Setzen Sie rollenbasierte Zugriffskontrolle (RBAC) mit feingranularen Berechtigungen um  
   - Regelmäßige Überprüfung von Berechtigungen und kontinuierliche Überwachung auf Privilegieneskalationen

**Laufzeit-Berechtigungskontrollen:**
   - Wenden Sie Ressourcenlimits an, um Angriffe durch Ressourcenauslastung zu verhindern  
   - Verwenden Sie Container-Isolierung für Tool-Ausführungsumgebungen  
   - Implementieren Sie Just-in-Time-Zugriff für administrative Funktionen

## 5. **Inhaltssicherheit & Monitoring**

**Umsetzung von Inhaltssicherheit:**
   - **Azure Content Safety Integration**: Nutzen Sie Azure Content Safety zur Erkennung schädlicher Inhalte, Jailbreak-Versuche und Richtlinienverstöße  
   - **Verhaltensanalyse**: Implementieren Sie laufzeitbasierte Verhaltensüberwachung, um Anomalien bei MCP-Server- und Tool-Ausführung zu entdecken  
   - **Umfassende Protokollierung**: Protokollieren Sie alle Authentifizierungsversuche, Tool-Aufrufe und Sicherheitsereignisse sicher und manipulationsgeschützt

**Kontinuierliche Überwachung:**
   - Echtzeit-Alarmierung bei verdächtigen Mustern und unbefugten Zugriffsversuchen  
   - Integration in SIEM-Systeme für zentralisiertes Sicherheitsereignismanagement  
   - Regelmäßige Sicherheitsaudits und Penetrationstests von MCP-Implementierungen

## 6. **Supply Chain Sicherheit**

**Komponentenverifizierung:**
   - **Abhängigkeits-Scanning**: Nutzen Sie automatisierte Schwachstellenanalysen für alle Softwareabhängigkeiten und KI-Komponenten  
   - **Herkunftsvalidierung**: Prüfen Sie Herkunft, Lizenzierung und Integrität von Modellen, Datenquellen und externen Diensten  
   - **Signierte Pakete**: Verwenden Sie kryptographisch signierte Pakete und überprüfen Sie Signaturen vor der Bereitstellung

**Sichere Entwicklungspipeline:**
   - **GitHub Advanced Security**: Implementieren Sie Secret Scanning, Abhängigkeitsanalyse und CodeQL statische Analyse  
   - **CI/CD Sicherheit**: Integrieren Sie Sicherheitstests in automatisierte Deployment-Pipelines  
   - **Integritätsprüfungen von Artefakten**: Führen Sie kryptografische Verifikationen von bereitgestellten Artefakten und Konfigurationen durch

## 7. **OAuth-Sicherheit & Schutz vor Confused Deputy**

**OAuth 2.1 Implementierung:**
   - **PKCE-Implementierung**: Verwenden Sie Proof Key for Code Exchange (PKCE) für alle Autorisierungsanfragen  
   - **Explizite Zustimmung**: Holen Sie Nutzerzustimmung für jeden dynamisch registrierten Client ein, um Confused Deputy Angriffe zu verhindern  
   - **Validierung von Redirect URIs**: Implementieren Sie strenge Prüfungen von Redirect-URIs und Client-IDs

**Proxy-Sicherheit:**
   - Verhindern Sie Autorisierungs-Bypass durch Exploitation statischer Client-IDs  
   - Implementieren Sie ordnungsgemäße Zustimmungsvorgänge für Drittschnittstellen-Zugriffe  
   - Überwachen Sie Diebstahl von Autorisierungscodes und unbefugten API-Zugriff

## 8. **Incident Response & Wiederherstellung**

**Schnelle Reaktionsfähigkeit:**
   - **Automatisierte Reaktion**: Setzen Sie automatisierte Systeme für Credential-Rotation und Bedrohungsbegrenzung ein  
   - **Rollback-Verfahren**: Möglichkeit zur schnellen Wiederherstellung bekannter guter Konfigurationen und Komponenten  
   - **Forensische Fähigkeiten**: Detaillierte Prüfpfade und Protokollierung für Vorfalluntersuchungen

**Kommunikation & Koordination:**
   - Klare Eskalationsverfahren für Sicherheitsvorfälle  
   - Integration mit unternehmensweiten Incident-Response-Teams  
   - Regelmäßige Sicherheitssimulationen und Tabletop-Übungen

## 9. **Compliance & Governance**

**Regulatorische Compliance:**
   - Stellen Sie sicher, dass MCP-Implementierungen branchenspezifische Anforderungen erfüllen (z.B. GDPR, HIPAA, SOC 2)  
   - Implementieren Sie Datenklassifikation und Datenschutzkontrollen für KI-Datenverarbeitung  
   - Pflegen Sie umfassende Dokumentation für Compliance-Audits

**Change Management:**
   - Formale Sicherheitsprüfprozesse für alle Änderungen am MCP-System  
   - Versionskontrolle und Genehmigungs-Workflows für Konfigurationsänderungen  
   - Regelmäßige Compliance-Bewertungen und Lückenanalyse

## 10. **Erweiterte Sicherheitskontrollen**

**Zero Trust Architektur:**
   - **Nie vertrauen, stets verifizieren**: Permanente Verifikation von Nutzern, Geräten und Verbindungen  
   - **Mikrosegmentierung**: Granulare Netzwerkkontrollen isolieren einzelne MCP-Komponenten  
   - **Bedingter Zugriff**: Risiko-basierte Zugriffskontrollen, die sich dem aktuellen Kontext und Verhalten anpassen

**Laufzeit-Anwendungsschutz:**
   - **Runtime Application Self-Protection (RASP)**: Setzen Sie RASP-Techniken für Echtzeit-Bedrohungserkennung ein  
   - **Anwendungsperformancemonitoring**: Überwachen Sie Performance-Anomalien als Indikatoren für Angriffe  
   - **Dynamische Sicherheitsrichtlinien**: Implementieren Sie Sicherheitsrichtlinien, die sich an die aktuelle Bedrohungslage anpassen

## 11. **Integration des Microsoft Sicherheits-Ökosystems**

**Umfassende Microsoft Sicherheit:**
   - **Microsoft Defender for Cloud**: Cloud-Sicherheitsposturenmanagement für MCP-Workloads  
   - **Azure Sentinel**: Cloud-native SIEM- und SOAR-Funktionalitäten für erweiterte Bedrohungserkennung  
   - **Microsoft Purview**: Datenverwaltung und Compliance für KI-Workflows und Datenquellen

**Identitäts- und Zugriffsmanagement:**
   - **Microsoft Entra ID**: Enterprise Identitätsmanagement mit Conditional Access Policies  
   - **Privileged Identity Management (PIM)**: Just-in-Time-Zugriff und Genehmigungs-Workflows für administrative Aufgaben  
   - **Identity Protection**: Risiko-basierter Conditional Access und automatisierte Bedrohungsreaktion

## 12. **Kontinuierliche Sicherheitsevolution**

**Aktualität bewahren:**
   - **Spezifikationsüberwachung**: Regelmäßige Überprüfung von MCP-Spezifikationsupdates und Änderungen an Sicherheitsrichtlinien  
   - **Bedrohungsinformationen**: Integration KI-spezifischer Bedrohungsfeeds und Kompromittierungsindikatoren  
   - **Engagement der Sicherheitsgemeinschaft**: Aktive Teilnahme an der MCP-Sicherheitsgemeinschaft und Programmen zur Schwachstellenoffenlegung

**Adaptive Sicherheit:**
   - **Maschinelles Lernen Sicherheit**: Einsatz ML-basierter Anomalieerkennung zur Identifikation neuartiger Angriffsvektoren  
   - **Prädiktive Sicherheitsanalytik**: Implementierung vorhersagender Modelle zur proaktiven Bedrohungserkennung  
   - **Sicherheitsautomatisierung**: Automatisierte Sicherheitsrichtlinienaktualisierungen basierend auf Bedrohungsinformationen und Spezifikationsänderungen

---

## **Kritische Sicherheitsressourcen**

### **Offizielle MCP-Dokumentation**
- [MCP-Spezifikation (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP Sicherheitsbest Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP-Autorisierungsspezifikation](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP Sicherheitsressourcen**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) – Umfassender OWASP MCP Top 10 Leitfaden mit Azure-Implementierung  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Offizielle OWASP MCP Sicherheitsrisiken  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – Praktisches Sicherheitstraining für MCP in Azure

### **Microsoft Sicherheitslösungen**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Sicherheitsstandards**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 für Große Sprachmodelle](https://genai.owasp.org/)  
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

### **Implementierungsanleitungen**
- [Azure API Management MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
- [Microsoft Entra ID mit MCP-Servern](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Sicherheitshinweis**: MCP Sicherheitspraktiken entwickeln sich schnell weiter. Prüfen Sie stets gegen die aktuelle [MCP-Spezifikation](https://spec.modelcontextprotocol.io/) und die [offizielle Sicherheitsdokumentation](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices), bevor Sie implementieren.

## Was kommt als Nächstes

- Lesen: [MCP Sicherheitskontrollen 2025](./mcp-security-controls-2025.md)  
- Zurück zu: [Überblick Sicherheitsmodul](./README.md)  
- Weiter zu: [Modul 3: Erste Schritte](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in der Ursprungssprache gilt als maßgebliche Quelle. Für wichtige Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die durch die Nutzung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->