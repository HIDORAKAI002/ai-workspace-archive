# MCP-Sicherheit: Umfassender Schutz für KI-Systeme

[![MCP Security Best Practices](../../../translated_images/de/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klicken Sie auf das obige Bild, um das Video dieser Lektion anzusehen)_

Sicherheit ist grundlegend für das Design von KI-Systemen, weshalb wir diesem Thema in unserem zweiten Abschnitt Priorität einräumen. Dies entspricht dem Microsoft-Prinzip **Secure by Design** aus der [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Das Model Context Protocol (MCP) bringt leistungsstarke neue Fähigkeiten für KI-gesteuerte Anwendungen mit sich, stellt aber auch einzigartige Sicherheitsherausforderungen dar, die über traditionelle Software-Risiken hinausgehen. MCP-Systeme sind sowohl etablierten Sicherheitsbedenken (sicheres Coding, Least Privilege, Sicherheit der Lieferkette) als auch neuen KI-spezifischen Bedrohungen ausgesetzt, darunter Prompt Injection, Tool Poisoning, Session Hijacking, Confused Deputy Angriffe, Token-Passthrough-Schwachstellen und dynamische Fähigkeitsänderungen.

Diese Lektion untersucht die kritischsten Sicherheitsrisiken bei MCP-Implementierungen – einschließlich Authentifizierung, Autorisierung, übermäßigen Berechtigungen, indirekter Prompt Injection, Sitzungsicherheit, Confused Deputy Problemen, Token-Management und Lieferkettenschwachstellen. Sie lernen umsetzbare Maßnahmen und Best Practices kennen, um diese Risiken zu mindern, und erfahren, wie Sie Microsoft-Lösungen wie Prompt Shields, Azure Content Safety und GitHub Advanced Security nutzen, um Ihre MCP-Bereitstellung zu stärken.

## Lernziele

Am Ende dieser Lektion werden Sie in der Lage sein:

- **MCP-spezifische Bedrohungen identifizieren**: Einzigartige Sicherheitsrisiken in MCP-Systemen erkennen, darunter Prompt Injection, Tool Poisoning, übermäßige Berechtigungen, Session Hijacking, Confused Deputy Probleme, Token-Passthrough-Schwachstellen und Risiken in der Lieferkette
- **Sicherheitskontrollen anwenden**: Effektive Gegenmaßnahmen implementieren, darunter robuste Authentifizierung, Least Privilege Zugriff, sicheres Token-Management, Sitzungs-Sicherheitskontrollen und Verifizierung der Lieferkette
- **Microsoft-Sicherheitslösungen nutzen**: Microsoft Prompt Shields, Azure Content Safety und GitHub Advanced Security für den Schutz von MCP-Arbeitslasten verstehen und einsetzen
- **Toolsicherheit validieren**: Die Bedeutung der Validierung von Tool-Metadaten, Überwachung dynamischer Änderungen und Verteidigung gegen indirekte Prompt Injection Angriffe erkennen
- **Best Practices integrieren**: Etablierte Sicherheitsgrundlagen (sicheres Coding, Server-Härtung, Zero Trust) mit MCP-spezifischen Kontrollen für umfassenden Schutz kombinieren

# MCP-Sicherheitsarchitektur & Kontrollen

Moderne MCP-Implementierungen erfordern mehrschichtige Sicherheitsansätze, die sowohl traditionelle Software-Sicherheit als auch KI-spezifische Bedrohungen adressieren. Die sich rasch weiterentwickelnde MCP-Spezifikation verbessert kontinuierlich ihre Sicherheitskontrollen und ermöglicht so eine bessere Integration in Unternehmens-Sicherheitsarchitekturen und bewährte Praktiken.

Forschungen aus dem [Microsoft Digital Defense Report](https://aka.ms/mddr) zeigen, dass **98 % der gemeldeten Sicherheitsverletzungen durch robuste Sicherheitsvorkehrungen verhindert werden könnten**. Die effektivste Schutzstrategie kombiniert grundlegende Sicherheitspraktiken mit MCP-spezifischen Kontrollen – bewährte Basissicherheitsmaßnahmen bleiben die wirkungsvollsten Mittel, um das Gesamtrisiko zu reduzieren.

## Aktuelle Sicherheitslage

> **Hinweis:** Diese Informationen spiegeln die MCP-Sicherheitsstandards vom **5. Februar 2026** wider, abgestimmt auf die **MCP-Spezifikation 2025-11-25**. Das MCP-Protokoll entwickelt sich weiterhin schnell, und künftige Implementierungen können neue Authentifizierungsmuster und erweiterte Kontrollen einführen. Konsultieren Sie stets die aktuelle [MCP-Spezifikation](https://spec.modelcontextprotocol.io/), das [MCP GitHub-Repository](https://github.com/modelcontextprotocol) und die [Dokumentation zu Sicherheitsbest-Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) für die neuesten Richtlinien.

> **Blick voraus:** Der `2026-07-28`-Release Candidate verstärkt die Autorisierung weiter – Clients müssen den `iss`-Parameter bei Autorisierungsantworten validieren (RFC 9207), während der dynamischen Client-Registrierung einen OpenID Connect `application_type` angeben und registrierte Anmeldeinformationen an den ausstellenden Autorisierungsserver binden. Siehe [Was sich in MCP ändert: Der 2026-07-28 Release Candidate](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) für die vollständige Liste der Autorisierungs-SEPs.

## 🏔️ MCP Security Summit Workshop (Sherpa)

Für **praktisches Sicherheitstraining** empfehlen wir den **MCP Security Summit Workshop** (Sherpa) – eine umfassende geführte Expedition zur Absicherung von MCP-Servern in Microsoft Azure.

### Workshop-Übersicht

Der [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) bietet praktisches, umsetzbares Sicherheitstraining durch eine bewährte „anfälliger → ausnutzen → beheben → validieren“-Methodik. Sie werden:

- **Lernen durch Fehler**: Sicherheitsschwachstellen selbst entdecken, indem Sie absichtlich unsichere Server ausnutzen
- **Azure-native Sicherheit nutzen**: Azure Entra ID, Key Vault, API Management und AI Content Safety einsetzen
- **Verteidigung in der Tiefe folgen**: Von Basislagern aus umfassende Sicherheitsschichten aufbauen
- **OWASP-Standards anwenden**: Jede Technik ist im [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) verankert
- **Produktionscode erhalten**: Mit funktionierenden, getesteten Implementierungen abschließen

### Die Expeditionsroute

| Lager | Fokus | Abgedeckte OWASP-Risiken |
|------|-------|---------------------|
| **Basislager** | MCP-Grundlagen & Authentifizierungs-Schwachstellen | MCP01, MCP07 |
| **Lager 1: Identität** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Lager 2: Gateway** | API Management, Private Endpoints, Governance | MCP02, MCP06, MCP07, MCP09 |
| **Lager 3: I/O-Sicherheit** | Prompt Injection, PII-Schutz, Content Safety | MCP03, MCP05, MCP06, MCP10 |
| **Lager 4: Überwachung** | Log Analytics, Dashboards, Bedrohungserkennung | MCP04, MCP08 |
| **Gipfeltreffen** | Red Team / Blue Team Integrationstest | Alle |

**Starten Sie hier:** [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Sicherheitsrisiken

Der [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) beschreibt die zehn kritischsten Sicherheitsrisiken für MCP-Implementierungen:

| Risiko | Beschreibung | Azure-Minderung |
|------|-------------|------------------|
| **MCP01** | Fehlmanagement von Tokens & Geheimnisoffenlegung | Azure Key Vault, Managed Identity |
| **MCP02** | Privilegieneskalation durch Scope Creep | RBAC, Conditional Access |
| **MCP03** | Tool Poisoning | Tool-Validierung, Integritätsüberprüfung |
| **MCP04** | Angriffe auf die Software-Lieferkette & Manipulation von Abhängigkeiten | GitHub Advanced Security, Dependency Scanning |
| **MCP05** | Befehlsinjektion & Ausführung | Eingabevalidierung, Sandboxing |
| **MCP06** | Intent Flow Subversion | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Unzureichende Authentifizierung & Autorisierung | Azure Entra ID, OAuth 2.1 mit PKCE |
| **MCP08** | Fehlende Auditierung und Telemetrie | Azure Monitor, Application Insights |
| **MCP09** | Shadow-MCP-Server | API Center Governance, Netzwerkisolierung |
| **MCP10** | Kontextinjektion & übermäßige Offenlegung | Datenklassifizierung, minimale Exposition |

### Entwicklung der MCP-Authentifizierung

Die MCP-Spezifikation hat sich im Bereich Authentifizierung und Autorisierung erheblich weiterentwickelt:

- **Ursprünglicher Ansatz**: Frühe Spezifikationen verlangten von Entwicklern die Implementierung eigener Authentifizierungsserver, wobei MCP-Server als OAuth 2.0 Autorisierungsserver direkt die Nutzer-Authentifizierung verwalteten
- **Aktueller Standard (2025-11-25)**: Die aktualisierte Spezifikation erlaubt MCP-Servern die Delegation der Authentifizierung an externe Identity Provider (wie Microsoft Entra ID), was die Sicherheitslage verbessert und die Implementierung vereinfacht
- **Transportschicht-Sicherheit**: Verbesserte Unterstützung sicherer Transportmechanismen mit geeigneten Authentifizierungsmustern für lokale (STDIO) und entfernte (Streamable HTTP) Verbindungen

## Authentifizierungs- & Autorisierungssicherheit

### Aktuelle Sicherheitsherausforderungen

Moderne MCP-Implementierungen sehen sich verschiedenen Herausforderungen bei Authentifizierung und Autorisierung gegenüber:

### Risiken & Bedrohungsvektoren

- **Fehlkonfigurierte Autorisierungslogik**: Fehler in der Autorisierungsimplementierung von MCP-Servern können sensible Daten offenlegen und Zugriffskontrollen fehlerhaft anwenden
- **Kompromittierung von OAuth-Tokens**: Token-Diebstahl am lokalen MCP-Server ermöglicht es Angreifern, Server zu imitieren und auf nachgelagerte Dienste zuzugreifen
- **Token-Passthrough-Schwachstellen**: Unsachgemäße Token-Handhabung schafft Sicherheitskontroll-Bypässe und Kontrolllücken in der Verantwortlichkeit
- **Übermäßige Berechtigungen**: Überprivilegierte MCP-Server verletzen das Least-Privilege-Prinzip und vergrößern Angriffsflächen

#### Token-Passthrough: Ein kritisches Anti-Pattern

**Token-Passthrough ist in der aktuellen MCP-Autorisierungsspezifikation ausdrücklich verboten** wegen gravierender Sicherheitsimplikationen:

##### Umgehung von Sicherheitskontrollen
- MCP-Server und nachgeordnete APIs implementieren kritische Sicherheitskontrollen (Rate Limiting, Anforderungsvalidierung, Verkehrsüberwachung), die auf korrekter Token-Validierung basieren
- Direkte Token-Nutzung vom Client zur API umgeht diese unverzichtbaren Schutzmaßnahmen und schwächt die Sicherheitsarchitektur

##### Verantwortlichkeit & Audit-Herausforderungen  
- MCP-Server können nicht zwischen Clients unterscheiden, die vom Upstream ausgestellte Tokens verwenden, wodurch Audit-Trails unterbrochen werden
- Nachgelagerte Ressourcen-Server-Protokolle zeigen irreführende Ursprünge der Anforderung anstelle der tatsächlichen MCP-Server-Intermediäre
- Vorfalluntersuchungen und Compliance-Audits werden erheblich erschwert

##### Datenexfiltrations-Risiken
- Unvalidierte Token-Claims ermöglichen böswilligen Akteuren mit gestohlenen Tokens, MCP-Server als Proxys für Datenexfiltration zu missbrauchen
- Vertrauensgrenzverletzungen erlauben unautorisierte Zugriffsmuster, die vorgesehene Sicherheitskontrollen umgehen

##### Angriffsvektoren über mehrere Dienste
- Akzeptierte kompromittierte Tokens von mehreren Diensten ermöglichen laterale Bewegungen über verbundene Systeme
- Vertrauensannahmen zwischen Diensten können verletzt werden, wenn Token-Ursprünge nicht verifiziert werden können

### Sicherheitskontrollen & Gegenmaßnahmen

**Kritische Sicherheitsanforderungen:**

> **VERPFLICHTEND**: MCP-Server **DÜRFEN KEINE** Tokens akzeptieren, die nicht ausdrücklich für den MCP-Server ausgestellt wurden

#### Authentifizierungs- & Autorisierungskontrollen

- **Gründliche Autorisierungsprüfung**: Durchführung umfassender Audits der MCP-Server-Autorisierungslogik, um sicherzustellen, dass nur vorgesehene Benutzer und Clients auf sensible Ressourcen zugreifen können
  - **Implementierungsleitfaden**: [Azure API Management als Authentifizierungs-Gateway für MCP-Server](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identitätsintegration**: [Microsoft Entra ID für MCP-Server-Authentifizierung verwenden](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Sicheres Token-Management**: Umsetzung von [Microsofts Best Practices zur Token-Validierung und Lebenszyklus](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validierung, dass Audience-Claims mit der Identität des MCP-Servers übereinstimmen
  - Umsetzung angemessener Token-Rotations- und Ablaufrichtlinien
  - Verhinderung von Token-Replay-Angriffen und unbefugter Nutzung

- **Geschützter Token-Speicher**: Sichere Verwaltung von Tokens mit Verschlüsselung im Ruhezustand und Transit
  - **Best Practices**: [Richtlinien zur sicheren Token-Speicherung und Verschlüsselung](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Umsetzung der Zugriffskontrolle

- **Prinzip des geringsten Privilegs**: MCP-Server erhalten nur mindestens erforderliche Berechtigungen für ihre vorgesehene Funktionalität
  - Regelmäßige Überprüfung und Aktualisierung der Berechtigungen zur Verhinderung von Privilegienausweitungen
  - **Microsoft-Dokumentation**: [Sichere Least-Privileged Zugriffe](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Rollenbasierte Zugriffskontrolle (RBAC)**: Umsetzung feingranularer Rollenzuweisungen
  - Rollen strikt auf bestimmte Ressourcen und Aktionen beschränken
  - Keine breit gefächerten oder unnötigen Berechtigungen, die die Angriffsfläche vergrößern

- **Kontinuierliche Berechtigungsüberwachung**: Laufendes Auditieren und Überwachen von Zugriffsrechten
  - Überwachung von Nutzungsmustern auf Anomalien
  - Zeitnahe Behebung übermäßiger oder ungenutzter Rechte

## KI-spezifische Sicherheitsbedrohungen

### Prompt Injection & Angriffe zur Tool-Manipulation

Moderne MCP-Implementierungen sehen sich ausgeklügelten KI-spezifischen Angriffsvektoren gegenüber, die durch traditionelle Sicherheitsmaßnahmen nicht vollständig abgedeckt werden können:

#### **Indirekte Prompt Injection (Cross-Domain Prompt Injection)**

**Indirekte Prompt Injection** stellt eine der kritischsten Schwachstellen in MCP-gestützten KI-Systemen dar. Angreifer betten bösartige Anweisungen in externe Inhalte wie Dokumente, Webseiten, E-Mails oder Datenquellen ein, die von KI-Systemen anschließend als legitime Befehle verarbeitet werden.

**Angriffsszenarien:**
- **Dokumentenbasierte Injection**: Bösartige Anweisungen versteckt in verarbeiteten Dokumenten, die unbeabsichtigte KI-Aktionen auslösen
- **Ausnutzung von Webinhalten**: Kompromittierte Webseiten mit eingebetteten Prompts, die das KI-Verhalten beim Scraping manipulieren
- **E-Mail-basierte Angriffe**: Bösartige Prompts in E-Mails, die KI-Assistenten dazu bringen, Informationen zu leaken oder unbefugte Aktionen auszuführen
- **Datenquellen-Kontamination**: Kompromittierte Datenbanken oder APIs, die kontaminierte Inhalte an KI-Systeme liefern

**Konsequenzen in der Praxis**: Solche Angriffe können zu Datenexfiltration, Datenschutzverletzungen, Erzeugung schädlicher Inhalte und Manipulation von Benutzerinteraktionen führen. Für eine detaillierte Analyse siehe [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/de/prompt-injection.ed9fbfde297ca877.webp)

#### **Tool Poisoning Angriffe**

**Tool Poisoning** zielt auf die Metadaten ab, die MCP-Tools definieren, und nutzt aus, wie LLMs Tool-Beschreibungen und Parameter interpretieren, um Ausführungsentscheidungen zu treffen.

**Angriffsmechanismen:**
- **Manipulation von Metadaten**: Angreifer injizieren bösartige Anweisungen in Tool-Beschreibungen, Parameterdefinitionen oder Nutzungsszenarien
- **Unsichtbare Anweisungen**: Versteckte Prompts in Tool-Metadaten, die von KI-Modellen verarbeitet, für menschliche Nutzer jedoch unsichtbar sind
- **Dynamische Tool-Modifikation („Rug Pulls“) **: Von Nutzern genehmigte Tools werden später verändert, um bösartige Aktionen ohne Wissen der Nutzer auszuführen
- **Parameter-Injektion**: Bösartiger Inhalt, eingebettet in Tool-Parameterschemata, der das Modellverhalten beeinflusst


**Risiken gehosteter Server**: Remote-MCP-Server bergen erhöhte Risiken, da Tool-Definitionen nach der anfänglichen Benutzerfreigabe aktualisiert werden können, was Szenarien schafft, in denen zuvor sichere Tools bösartig werden. Für eine umfassende Analyse siehe [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagramm](../../../translated_images/de/tool-injection.3b0b4a6b24de6bef.webp)

#### **Zusätzliche KI-Angriffsvektoren**

- **Cross-Domain Prompt Injection (XPIA)**: Ausgeklügelte Angriffe, die Inhalte aus mehreren Domänen nutzen, um Sicherheitskontrollen zu umgehen
- **Dynamische Fähigkeitsmodifikation**: Echtzeitänderungen an Tool-Fähigkeiten, die initiale Sicherheitsbewertungen umgehen
- **Context Window Poisoning**: Angriffe, die große Kontextfenster manipulieren, um bösartige Anweisungen zu verbergen
- **Model Confusion Attacks**: Ausnutzung von Modellgrenzen zur Erzeugung unvorhersehbarer oder unsicherer Verhaltensweisen


### Auswirkungen von KI-Sicherheitsrisiken

**Folgen mit hoher Auswirkung:**
- **Datenexfiltration**: Unbefugter Zugriff und Diebstahl sensibler Unternehmens- oder personenbezogener Daten
- **Datenschutzverletzungen**: Offenlegung persönlich identifizierbarer Informationen (PII) und vertraulicher Geschäftsdaten  
- **Systemmanipulation**: Unbeabsichtigte Änderungen an kritischen Systemen und Arbeitsabläufen
- **Diebstahl von Anmeldeinformationen**: Kompromittierung von Authentifizierungstoken und Dienstanmeldeinformationen
- **Seitliche Bewegung**: Nutzung kompromittierter KI-Systeme als Pivot für weiterreichende Netzwerkangriffe

### Microsoft KI-Sicherheitslösungen

#### **KI-Prompt-Schutzmaßnahmen: Erweiterter Schutz gegen Injection-Angriffe**

Microsoft **KI-Prompt-Schutzmaßnahmen** bieten umfassenden Schutz gegen direkte und indirekte Prompt-Injection-Angriffe durch mehrere Sicherheitsebenen:

##### **Kernschutzmechanismen:**

1. **Fortschrittliche Erkennung & Filterung**
   - Maschinelle Lernalgorithmen und NLP-Techniken erkennen bösartige Anweisungen in externen Inhalten
   - Echtzeitanalyse von Dokumenten, Webseiten, E-Mails und Datenquellen auf eingebettete Bedrohungen
   - Kontextuelles Verständnis legitimer vs. bösartiger Prompt-Muster

2. **Spotlighting-Techniken**  
   - Unterscheidung zwischen vertrauenswürdigen Systemanweisungen und potenziell kompromittierten externen Eingaben
   - Texttransformationen, die die Modellrelevanz verbessern und gleichzeitig bösartige Inhalte isolieren
   - Hilft KI-Systemen, die richtige Befehls-Hierarchie einzuhalten und injizierte Befehle zu ignorieren

3. **Begrenzer- & Datenmarkierungssysteme**
   - Explizite Grenzdefinition zwischen vertrauenswürdigen Systemnachrichten und externem Eingabetext
   - Spezielle Marker heben Grenzen zwischen vertrauenswürdigen und nicht vertrauenswürdigen Datenquellen hervor
   - Klare Trennung verhindert Befehlsverwechslungen und unautorisierte Befehlsausführung

4. **Kontinuierliche Bedrohungsinformationen**
   - Microsoft überwacht kontinuierlich neue Angriffsmuster und aktualisiert die Abwehrmaßnahmen
   - Proaktives Aufspüren von Bedrohungen für neue Injection-Techniken und Angriffsvektoren
   - Regelmäßige Sicherheitsmodell-Updates zur Aufrechterhaltung der Wirksamkeit gegen sich entwickelnde Bedrohungen

5. **Integration von Azure Content Safety**
   - Teil der umfassenden Azure AI Content Safety Suite
   - Zusätzliche Erkennung von Jailbreak-Versuchen, schädlichen Inhalten und Verstößen gegen Sicherheitsrichtlinien
   - Einheitliche Sicherheitskontrollen über AI-Anwendungskomponenten hinweg

**Implementierungsressourcen**: [Microsoft Prompt Shields Dokumentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Schutz](../../../translated_images/de/prompt-shield.ff5b95be76e9c78c.webp)


## Fortschrittliche MCP-Sicherheitsbedrohungen

### Schwachstellen für Session Hijacking

**Session Hijacking** stellt einen kritischen Angriffsvektor in zustandsbehafteten MCP-Implementierungen dar, bei dem unbefugte Parteien legitime Sitzungskennungen erhalten und missbrauchen, um sich als Clients auszugeben und unautorisierte Aktionen durchzuführen.

#### **Angriffsszenarien & Risiken**

- **Session Hijack Prompt Injection**: Angreifer mit gestohlenen Sitzungs-IDs injizieren bösartige Ereignisse in Server, die Sitzungsstatus teilen, was potenziell schädliche Aktionen auslöst oder Zugriff auf sensible Daten ermöglicht
- **Direkte Nachahmung**: Gestohlene Sitzungs-IDs erlauben direkte MCP-Serveraufrufe, die die Authentifizierung umgehen und Angreifer als legitime Nutzer behandeln
- **Kompromittierte wiederaufnehmbare Streams**: Angreifer können Anfragen vorzeitig beenden, wodurch legitime Clients möglicherweise mit bösartigem Inhalt fortsetzen

#### **Sicherheitskontrollen für das Sitzungsmanagement**

**Kritische Anforderungen:**
- **Autorisierungsüberprüfung**: MCP-Server, die Autorisierung implementieren, **MÜSSEN** ALLE eingehenden Anfragen prüfen und **DÜRFEN NICHT** auf Sitzungen zur Authentifizierung vertrauen
- **Sichere Sitzungserzeugung**: Verwendung kryptografisch sicherer, nicht-deterministischer Sitzungs-IDs, generiert mit sicheren Zufallszahlengeneratoren
- **Benutzer-spezifische Bindung**: Bindung von Sitzungs-IDs an benutzerspezifische Informationen mit Formaten wie `<user_id>:<session_id>`, um Missbrauch zwischen Benutzern zu verhindern
- **Sitzungsmanagement**: Implementierung von Ablauf, Rotation und Ungültigmachung zur Begrenzung von Angriffsfenstern
- **Transportsicherheit**: Obligatorisches HTTPS für alle Kommunikationen zum Schutz vor Abfangen von Sitzungs-IDs

### Problem des verwirrten Bevollmächtigten (Confused Deputy)

Das **Problem des verwirrten Bevollmächtigten** entsteht, wenn MCP-Server als Authentifizierungs-Proxy zwischen Clients und Drittanbieterdiensten agieren, wodurch Möglichkeiten für Autorisierungsumgehungen durch Ausnutzung statischer Client-IDs entstehen.

#### **Angriffsmechanismen & Risiken**

- **Cookie-basierte Zustimmungsumgehung**: Vorherige Benutzer-Authentifizierung erzeugt Zustimmungs-Cookies, die Angreifer durch bösartige Autorisierungsanfragen mit manipulierten Redirect-URIs ausnutzen
- **Diebstahl von Autorisierungscodes**: Bestehende Zustimmungs-Cookies können bewirken, dass Autorisierungsserver Zustimmungsbildschirme überspringen und Codes an vom Angreifer kontrollierte Endpunkte umleiten  
- **Unbefugter API-Zugang**: Gestohlene Autorisierungscodes ermöglichen Token-Austausch und Benutzer-Identitätsbetrug ohne explizite Genehmigung

#### **Minderungsstrategien**

**Verpflichtende Kontrollen:**
- **Explizite Zustimmungserfordernisse**: MCP-Proxy-Server mit statischen Client-IDs **MÜSSEN** die Zustimmung des Nutzers für jeden dynamisch registrierten Client einholen
- **OAuth 2.1 Sicherheitsimplementierung**: Befolgung aktueller OAuth-Sicherheitsbest-practices einschließlich PKCE für alle Autorisierungsanfragen
- **Strenge Client-Validierung**: Umsetzung rigoroser Validierung von Redirect-URIs und Client-IDs zur Verhinderung von Exploits

### Token-Passthrough-Schwachstellen  

**Token-Passthrough** ist ein explizites Anti-Pattern, bei dem MCP-Server Client-Token ohne ordnungsgemäße Validierung akzeptieren und an nachgelagerte APIs weiterleiten, was die MCP-Autorisierungsspezifikationen verletzt.

#### **Sicherheitsauswirkungen**

- **Kontrollumgehung**: Direkte Client-zu-API-Token-Verwendung umgeht wichtige Ratenbegrenzungen, Validierungs- und Überwachungsmaßnahmen
- **Korruption der Audit-Trails**: Upstream ausgestellte Token machen Client-Identifikation unmöglich und zerstören Untersuchungskapazitäten bei Vorfällen
- **Proxy-basierte Datenexfiltration**: Unvalidierte Token ermöglichen es böswilligen Akteuren, Server als Proxies für unbefugten Datenzugriff zu nutzen
- **Verletzungen von Vertrauensgrenzen**: Downstream-Dienste könnten falsche Vertrauensannahmen treffen, wenn Token-Herkunft nicht verifizierbar ist
- **Erweiterung von Multi-Service-Angriffen**: Kompromittierte Token, die über mehrere Dienste akzeptiert werden, ermöglichen laterale Bewegungen

#### **Erforderliche Sicherheitskontrollen**

**Unverhandelbare Anforderungen:**
- **Token-Validierung**: MCP-Server **DÜRFEN NICHT** Tokens akzeptieren, die nicht explizit für den MCP-Server ausgegeben wurden
- **Überprüfung der Zielgruppe**: Immer die Audience-Claims des Tokens prüfen, damit sie zur Identität des MCP-Servers passen
- **Ordnungsgemäßer Token-Lebenszyklus**: Implementierung kurzlebiger Zugriffstoken mit sicheren Rotationspraktiken


## Sicherheit der Lieferkette für KI-Systeme

Die Sicherheit der Lieferkette hat sich über traditionelle Softwareabhängigkeiten hinaus entwickelt und umfasst das gesamte KI-Ökosystem. Moderne MCP-Implementierungen müssen alle KI-bezogenen Komponenten rigoros überprüfen und überwachen, da jede potenzielle Schwachstellen einführen kann, die die Systemintegrität gefährden.

### Erweitere Komponenten der KI-Lieferkette

**Traditionelle Softwareabhängigkeiten:**
- Open-Source-Bibliotheken und Frameworks
- Container-Images und Basissysteme  
- Entwicklungstools und Build-Pipelines
- Infrastrukturkomponenten und -dienste

**KI-spezifische Elemente der Lieferkette:**
- **Foundation Models**: Vorgefertigte Modelle verschiedener Anbieter, die eine Herkunftsüberprüfung erfordern
- **Embedding-Services**: Externe Vektorisierungs- und semantische Suchdienste
- **Context Provider**: Datenquellen, Wissensdatenbanken und Dokumentenarchive  
- **Drittanbieter-APIs**: Externe KI-Dienste, ML-Pipelines und Datenverarbeitung Endpunkte
- **Modell-Artefakte**: Gewichte, Konfigurationen und feinabgestimmte Modellvarianten
- **Trainingsdatensätze**: Daten, die für Modelltraining und Feinabstimmung verwendet werden

### Umfassende Strategie für Lieferkettensicherheit

#### **Komponentenverifizierung & Vertrauen**
- **Herkunftsvalidierung**: Überprüfung von Ursprung, Lizenzierung und Integrität aller KI-Komponenten vor der Integration
- **Sicherheitsbewertung**: Durchführung von Schwachstellenscans und Sicherheitsüberprüfungen bei Modellen, Datenquellen und KI-Diensten
- **Reputationsanalyse**: Bewertung der Sicherheitsbilanz und Praktiken von KI-Diensteanbietern
- **Compliance-Überprüfung**: Sicherstellung, dass alle Komponenten den Sicherheits- und regulatorischen Anforderungen der Organisation entsprechen

#### **Sichere Deployment-Pipelines**  
- **Automatisierte CI/CD-Sicherheit**: Einbindung von Sicherheitsscans in automatisierte Deployment-Pipelines
- **Integritätsprüfung von Artefakten**: Implementierung kryptografischer Verifikation für alle deployten Artefakte (Code, Modelle, Konfigurationen)
- **Gestufte Bereitstellung**: Anwendung progressiver Deployment-Strategien mit Sicherheitsvalidierung auf jeder Stufe
- **Vertrauenswürdige Artefakt-Repositorien**: Deployment nur aus verifizierten, sicheren Artefakt-Registries und Repositorien

#### **Kontinuierliche Überwachung & Reaktion**
- **Abhängigkeitsscans**: Fortlaufende Schwachstellenüberwachung für alle Software- und KI-Komponentenabhängigkeiten
- **Modellüberwachung**: Kontinuierliche Bewertung von Modellverhalten, Leistungsverschiebungen und Sicherheitsanomalien
- **Service-Gesundheitsüberwachung**: Überwachung externer KI-Dienste auf Verfügbarkeit, Sicherheitsvorfälle und Richtlinienänderungen
- **Integration von Bedrohungsinformationen**: Einbindung von Feeds zu KI- und ML-Sicherheitsrisiken

#### **Zugriffskontrolle & Minimalprivileg**
- **Komponentenbasierte Berechtigungen**: Zugriffsbeschränkung auf Modelle, Daten und Dienste basierend auf betrieblicher Notwendigkeit
- **Verwaltung von Dienstkonten**: Einsatz dedizierter Dienstkonten mit minimal erforderlichen Berechtigungen
- **Netzwerksegmentierung**: Isolierung von KI-Komponenten und Begrenzung des Netzwerkzugangs zwischen Diensten
- **API-Gateway-Kontrollen**: Nutzung zentraler API-Gateways zur Steuerung und Überwachung des Zugriffs auf externe KI-Dienste

#### **Vorfallsreaktion & Wiederherstellung**
- **Schnelle Reaktionsverfahren**: Etablierte Prozesse zum Patchen oder Ersetzen kompromittierter KI-Komponenten
- **Rotation von Anmeldeinformationen**: Automatisierte Systeme zur Rotation von Geheimnissen, API-Schlüsseln und Dienstanmeldeinformationen
- **Rollback-Fähigkeiten**: Möglichkeit, schnell auf vorherige, bekannte gute Versionen von KI-Komponenten zurückzusetzen
- **Wiederherstellung nach Lieferkettenverletzungen**: Spezifische Verfahren zur Reaktion auf Kompromittierungen vorgelagerter KI-Dienste

### Microsoft-Sicherheitstools & Integration

**GitHub Advanced Security** bietet umfassenden Lieferkettenschutz, einschließlich:
- **Secret Scanning**: Automatisierte Erkennung von Anmeldeinformationen, API-Schlüsseln und Tokens in Repositories
- **Dependency Scanning**: Schwachstellenbewertung für Open-Source-Abhängigkeiten und Bibliotheken
- **CodeQL-Analyse**: Statische Codeanalyse zur Erkennung von Sicherheitslücken und Programmierfehlern
- **Einblicke in die Lieferkette**: Transparenz über Abhängigkeitsgesundheit und Sicherheitsstatus

**Azure DevOps & Azure Repos Integration:**
- Nahtlose Integration von Sicherheitsscans über Microsoft-Entwicklungsplattformen hinweg
- Automatisierte Sicherheitsprüfungen in Azure Pipelines für KI-Arbeitslasten
- Durchsetzung von Richtlinien für sichere Bereitstellung von KI-Komponenten

**Microsoft interne Praktiken:**
Microsoft implementiert umfassende Sicherheitspraktiken für die Lieferkette in allen Produkten. Erfahren Sie mehr über bewährte Ansätze in [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Beste Sicherheitspraktiken der Grundlage

MCP-Implementierungen übernehmen und erweitern die bestehende Sicherheitslage Ihrer Organisation. Die Stärkung grundlegender Sicherheitspraktiken verbessert die Gesamtsicherheit von KI-Systemen und MCP-Bereitstellungen erheblich.

### Kernfundamente der Sicherheit

#### **Sichere Entwicklungspraktiken**
- **OWASP-Konformität**: Schutz gegen [OWASP Top 10](https://owasp.org/www-project-top-ten/) Webanwendungs-Schwachstellen
- **KI-spezifische Schutzmaßnahmen**: Implementierung von Kontrollen für [OWASP Top 10 für LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Sichere Geheimnisverwaltung**: Verwendung dedizierter Tresore für Tokens, API-Schlüssel und sensible Konfigurationsdaten
- **Ende-zu-Ende-Verschlüsselung**: Implementierung sicherer Kommunikation über alle Anwendungskomponenten und Datenflüsse hinweg
- **Eingabevalidierung**: Strikte Validierung aller Nutzereingaben, API-Parameter und Datenquellen

#### **Härtung der Infrastruktur**
- **Mehrfaktor-Authentifizierung**: Obligatorisches MFA für alle administrativen und Dienstkonten
- **Patch-Management**: Automatisierte, zeitnahe Aktualisierung von Betriebssystemen, Frameworks und Abhängigkeiten  
- **Integration von Identitätsanbietern**: Zentrale Verwaltung von Identitäten über Unternehmens-Identitätsanbieter (Microsoft Entra ID, Active Directory)
- **Netzwerksegmentierung**: Logische Isolation von MCP-Komponenten zur Begrenzung lateraler Bewegungen
- **Prinzip der minimalen Rechtevergabe**: Minimal erforderliche Berechtigungen für alle Systemkomponenten und Konten

#### **Sicherheitsüberwachung & -erkennung**
- **Umfassendes Logging**: Detaillierte Protokollierung von KI-Anwendungsaktivitäten, einschließlich MCP-Client-Server-Interaktionen
- **SIEM-Integration**: Zentrale Sicherheitsinformations- und Ereignisverwaltung zur Anomalieerkennung
- **Verhaltensanalytik**: KI-gestützte Überwachung zur Erkennung ungewöhnlicher Muster in System- und Nutzerverhalten
- **Bedrohungsinformationen**: Integration externer Bedrohungsfeeds und Anzeichen für Kompromittierung (IOC)
- **Vorfallsreaktion**: Gut definierte Verfahren zur Erkennung, Reaktion und Wiederherstellung bei Sicherheitsvorfällen

#### **Zero-Trust-Architektur**
- **Nie vertrauen, immer verifizieren**: Permanente Überprüfung von Nutzern, Geräten und Netzwerkverbindungen
- **Mikrosegmentierung**: Granulare Netzwerkkontrollen, die einzelne Workloads und Dienste isolieren
- **Identitätszentrierte Sicherheit**: Sicherheitsrichtlinien basierend auf verifizierten Identitäten statt Netzwerklage
- **Kontinuierliche Risikobewertung**: Dynamische Bewertung der Sicherheitslage basierend auf aktuellem Kontext und Verhalten
- **Bedingter Zugriff**: Zugangskontrollen, die sich an Risikofaktoren, Standort und Gerätevertrauen anpassen

### Integrationsmuster für Unternehmen

#### **Integration in Microsoft-Sicherheitsökosystem**
- **Microsoft Defender for Cloud**: Umfassendes Management der Cloud-Sicherheitslage
- **Azure Sentinel**: Cloud-native SIEM- und SOAR-Funktionen für den Schutz von KI-Arbeitslasten
- **Microsoft Entra ID**: Unternehmensweites Identitäts- und Zugriffsmanagement mit Richtlinien für bedingten Zugriff
- **Azure Key Vault**: Zentrale Geheimnisverwaltung mit Hardware-Sicherheitsmodul (HSM)-Unterstützung
- **Microsoft Purview**: Datenverwaltung und Compliance für KI-Datenquellen und Arbeitsabläufe

#### **Compliance & Governance**
- **Regulatorische Ausrichtung**: Sicherstellung, dass MCP-Implementierungen branchenspezifische Compliance-Anforderungen erfüllen (DSGVO, HIPAA, SOC 2)

- **Datenklassifizierung**: Ordentliche Kategorisierung und Handhabung sensibler Daten, die von KI-Systemen verarbeitet werden
- **Audit-Trails**: Umfassende Protokollierung für regulatorische Compliance und forensische Untersuchungen
- **Datenschutzkontrollen**: Umsetzung von Datenschutz-von-Design-Prinzipien in der Architektur von KI-Systemen
- **Änderungsmanagement**: Formale Prozesse für Sicherheitsüberprüfungen von Änderungen an KI-Systemen

Diese grundlegenden Praktiken schaffen eine robuste Sicherheitsbasis, die die Effektivität MCP-spezifischer Sicherheitskontrollen erhöht und umfassenden Schutz für KI-gesteuerte Anwendungen bietet.

## Wichtige Sicherheits-Leitgedanken

- **Mehrschichtiger Sicherheitsansatz**: Kombination grundlegender Sicherheitspraktiken (sicheres Programmieren, Prinzip der geringsten Rechte, Lieferkettenprüfung, kontinuierliche Überwachung) mit KI-spezifischen Kontrollen für umfassenden Schutz

- **KI-spezifische Bedrohungslandschaft**: MCP-Systeme sind einzigartigen Risiken ausgesetzt, darunter Prompt Injection, Tool-Vergiftung, Session Hijacking, Confused Deputy-Probleme, Token-Passthrough-Schwachstellen und übermäßige Berechtigungen, die spezielle Gegenmaßnahmen erfordern

- **Exzellente Authentifizierung & Autorisierung**: Implementieren Sie robuste Authentifizierung mit externen Identitätsanbietern (Microsoft Entra ID), erzwingen Sie ordnungsgemäße Token-Validierung und akzeptieren Sie niemals Tokens, die nicht explizit für Ihren MCP-Server ausgestellt wurden

- **Prävention von KI-Angriffen**: Setzen Sie Microsoft Prompt Shields und Azure Content Safety ein, um indirekten Prompt Injection- und Tool-Vergiftungsangriffen entgegenzuwirken, während Sie Tool-Metadaten validieren und dynamische Änderungen überwachen

- **Sitzungs- & Transportsicherheit**: Verwenden Sie kryptografisch sichere, nicht-deterministische Sitzungs-IDs, die an Benutzeridentitäten gebunden sind, implementieren Sie ein properes Sitzungslebenszyklusmanagement und verwenden Sie Sitzungen niemals zur Authentifizierung

- **OAuth-Sicherheitsbest Practices**: Verhindern Sie Confused Deputy-Angriffe durch explizite Benutzerzustimmung für dynamisch registrierte Clients, ordnungsgemäße OAuth 2.1-Implementierung mit PKCE und strikte Validierung von Redirect URIs  

- **Token-Sicherheitsprinzipien**: Vermeiden Sie Token-Passthrough-Anti-Patterns, validieren Sie Token-Audiences, implementieren Sie kurzlebige Tokens mit sicherer Rotation und bewahren Sie klare Vertrauensgrenzen

- **Umfassende Lieferkettensicherheit**: Behandeln Sie alle KI-Ökosystem-Komponenten (Modelle, Einbettungen, Kontextanbieter, externe APIs) mit der gleichen Sicherheitsstrenge wie traditionelle Softwareabhängigkeiten

- **Kontinuierliche Weiterentwicklung**: Bleiben Sie am Puls sich schnell entwickelnder MCP-Spezifikationen, tragen Sie zu Standards der Sicherheitsgemeinschaft bei und erhalten Sie adaptive Sicherheitskonzepte, während das Protokoll reift

- **Microsoft Sicherheitsintegration**: Nutzen Sie Microsofts umfassendes Sicherheitsökosystem (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) für verbesserten Schutz bei MCP-Einsätzen

## Umfassende Ressourcen

### **Offizielle MCP-Sicherheitsdokumentation**
- [MCP-Spezifikation (Aktuell: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub-Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP Sicherheitsressourcen**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Umfassende OWASP MCP Top 10 mit Azure-Implementierungsanleitungen
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Offizielle OWASP MCP-Sicherheitsrisiken
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praxisorientiertes Sicherheitstraining für MCP auf Azure

### **Sicherheitsstandards & Best Practices**
- [OAuth 2.0 Sicherheitsbest Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web-Anwendungssicherheit](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 für Große Sprachmodelle](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **KI-Sicherheitsforschung & Analysen**
- [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tool Poisoning Angriffe (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Security Research Briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft Sicherheitslösungen**
- [Microsoft Prompt Shields Dokumentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Sicherheit](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token-Management Best Practices](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Implementierungsanleitungen & Tutorials**
- [Azure API Management als MCP Authentifizierungsgateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID Authentifizierung mit MCP-Servern](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Sichere Token-Speicherung und Verschlüsselung (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps- & Lieferkettensicherheit**
- [Azure DevOps Sicherheit](https://azure.microsoft.com/products/devops)
- [Azure Repos Sicherheit](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Lieferkettensicherheitsreise](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Zusätzliche Sicherheitsdokumentation**

Für umfassende Sicherheitsanleitungen verweisen Sie auf diese spezialisierten Dokumente in diesem Abschnitt:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Vollständige Sicherheitsbest Practices für MCP-Implementierungen
- **[Azure Content Safety Implementierung](./azure-content-safety-implementation.md)** - Praktische Implementierungsbeispiele für die Azure Content Safety-Integration  
- **[MCP Sicherheitskontrollen 2025](./mcp-security-controls-2025.md)** - Neueste Sicherheitskontrollen und Techniken für MCP-Einsätze
- **[MCP Best Practices Schnellreferenz](./mcp-best-practices.md)** - Schnellreferenzleitfaden für wesentliche MCP-Sicherheitspraktiken
- **[BlueHat 2026: Die Zukunft der KI sichern: MCP mit Defense-in-Depth-Patterns absichern](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Defense-in-Depth-Patterns vom Microsoft Security Response Center (MSRC)

### **Praktische Sicherheitsschulungen**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Umfassender praktischer Workshop zur Sicherung von MCP-Servern in Azure mit Fortschritt von Base Camp bis Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referenzarchitektur und Implementierungsanleitungen für alle OWASP MCP Top 10 Risiken

---

## Was kommt als Nächstes

Nächstes: [Kapitel 3: Einstieg](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->