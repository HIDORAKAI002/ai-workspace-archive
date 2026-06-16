# MCP-Sicherheit: Umfassender Schutz für KI-Systeme

[![MCP Security Best Practices](../../../translated_images/de/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klicken Sie auf das obige Bild, um das Video zu dieser Lektion anzusehen)_

Sicherheit ist grundlegend für das Design von KI-Systemen, weshalb wir ihr als zweiten Abschnitt Priorität einräumen. Dies steht im Einklang mit dem Microsoft-Prinzip **Secure by Design** aus der [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Das Model Context Protocol (MCP) bringt leistungsstarke neue Fähigkeiten für KI-gesteuerte Anwendungen, während es einzigartige Sicherheitsherausforderungen mit sich bringt, die über traditionelle Softwarerisiken hinausgehen. MCP-Systeme sehen sich sowohl etablierten Sicherheitsbedenken (sicheres Programmieren, geringste Privilegien, Sicherheit der Lieferkette) als auch neuen KI-spezifischen Bedrohungen gegenüber, darunter Prompt-Injection, Tool-Vergiftung, Sitzungsübernahme, Confused Deputy-Angriffe, Token-Passthrough-Schwachstellen und dynamische Fähigkeitsänderungen.

Diese Lektion untersucht die kritischsten Sicherheitsrisiken bei MCP-Implementierungen—mit Fokus auf Authentifizierung, Autorisierung, übermäßige Berechtigungen, indirekte Prompt-Injection, Sitzungsmanagement, Confused Deputy-Probleme, Token-Management und Schwachstellen in der Lieferkette. Sie lernen umsetzbare Kontrollen und Best Practices kennen, um diese Risiken zu mindern und Microsoft-Lösungen wie Prompt Shields, Azure Content Safety und GitHub Advanced Security zur Stärkung Ihrer MCP-Einführung einzusetzen.

## Lernziele

Am Ende dieser Lektion können Sie:

- **MCP-spezifische Bedrohungen identifizieren**: Einzigartige Sicherheitsrisiken in MCP-Systemen erkennen, darunter Prompt-Injection, Tool-Vergiftung, übermäßige Berechtigungen, Sitzungsübernahme, Confused Deputy-Probleme, Token-Passthrough-Schwachstellen und Risiken in der Lieferkette
- **Sicherheitskontrollen anwenden**: Effektive Schutzmaßnahmen umsetzen, inklusive robuster Authentifizierung, Zugriff nach dem Prinzip der geringsten Privilegien, sicheres Token-Management, Sitzungs-Sicherheitskontrollen und Lieferkettenüberprüfung
- **Microsoft-Sicherheitslösungen nutzen**: Microsoft Prompt Shields, Azure Content Safety und GitHub Advanced Security für den Schutz von MCP-Arbeitslasten verstehen und einsetzen
- **Toolsicherheit validieren**: Die Bedeutung der Validierung von Tool-Metadaten erkennen, Überwachung dynamischer Änderungen durchführen und sich gegen indirekte Prompt-Injection-Angriffe verteidigen
- **Best Practices integrieren**: Bewährte Sicherheitsgrundlagen (sicheres Programmieren, Server-Härtung, Zero Trust) mit MCP-spezifischen Kontrollen für umfassenden Schutz kombinieren

# MCP-Sicherheitsarchitektur & Kontrollen

Moderne MCP-Implementierungen erfordern mehrschichtige Sicherheitsansätze, die sowohl traditionelle Softwaresicherheit als auch KI-spezifische Bedrohungen adressieren. Die sich schnell weiterentwickelnde MCP-Spezifikation verfeinert kontinuierlich ihre Sicherheitskontrollen, um eine bessere Integration mit Unternehmenssicherheitsarchitekturen und etablierten Best Practices zu ermöglichen.

Forschungen aus dem [Microsoft Digital Defense Report](https://aka.ms/mddr) zeigen, dass **98 % der gemeldeten Sicherheitsverletzungen durch robuste Sicherheits-Hygiene verhindert werden könnten**. Die effektivste Schutzstrategie kombiniert grundlegende Sicherheitspraktiken mit MCP-spezifischen Kontrollen—bewährte Basissicherheitsmaßnahmen bleiben der wirkungsvollste Beitrag zur Verringerung des Gesamtrisikos.

## Aktuelle Sicherheitslage

> **Hinweis:** Diese Informationen spiegeln den MCP-Sicherheitsstandard zum Stand **5. Februar 2026** wider, abgestimmt auf die **MCP-Spezifikation 2025-11-25**. Das MCP-Protokoll entwickelt sich weiterhin schnell, und künftige Implementierungen können neue Authentifizierungsverfahren und verbesserte Kontrollen einführen. Bitte konsultieren Sie stets die aktuelle [MCP-Spezifikation](https://spec.modelcontextprotocol.io/), das [MCP-GitHub-Repository](https://github.com/modelcontextprotocol) und die [Dokumentation zu Sicherheitsbest Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) für aktuelle Anleitungen.

## 🏔️ MCP Security Summit Workshop (Sherpa)

Für **praktische Sicherheitsschulung** empfehlen wir den **MCP Security Summit Workshop** (Sherpa) – eine umfassende geführte Expedition zur Absicherung von MCP-Servern in Microsoft Azure.

### Workshop-Übersicht

Der [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) bietet praxisnahe, umsetzbare Sicherheitsschulung durch eine bewährte "anfällige Systeme → Exploit → Behebung → Validierung"-Methodik. Sie werden:

- **Durch Fehler lernen**: Schwachstellen eigenhändig ausnutzen bei absichtlich unsicheren Servern
- **Azure-eigene Sicherheit nutzen**: Azure Entra ID, Key Vault, API Management und AI Content Safety verwenden
- **Verteidigung in der Tiefe anwenden**: Sichere Layer durch Lagerstationen aufbauen
- **OWASP-Standards folgen**: Jede Technik wird mit dem [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) verknüpft
- **Produktionsrelevanten Code erhalten**: Funktionierende, getestete Implementierungen erhalten

### Die Route der Expedition

| Lager | Schwerpunkt | Abgedeckte OWASP-Risiken |
|-------|-------------|--------------------------|
| **Basislager** | MCP-Grundlagen & Authentifizierungsschwachstellen | MCP01, MCP07 |
| **Lager 1: Identität** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Lager 2: Gateway** | API Management, Private Endpoints, Governance | MCP02, MCP06, MCP07, MCP09 |
| **Lager 3: I/O-Sicherheit** | Prompt-Injection, PII-Schutz, Content Safety | MCP03, MCP05, MCP06, MCP10 |
| **Lager 4: Überwachung** | Log Analytics, Dashboards, Bedrohungserkennung | MCP04, MCP08 |
| **Der Gipfel** | Rot-Team / Blau-Team Integrationstest | Alle |

**Starten Sie hier:** [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Top 10 Sicherheitsrisiken von OWASP MCP

Der [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) beschreibt die zehn kritischsten Sicherheitsrisiken für MCP-Implementierungen:

| Risiko | Beschreibung | Azure-Minderungsmaßnahmen |
|--------|--------------|---------------------------|
| **MCP01** | Fehlendes Token-Management & Geheimnis-Offenlegung | Azure Key Vault, Managed Identity |
| **MCP02** | Privilegieneskalation durch Scope Creep | RBAC, Conditional Access |
| **MCP03** | Tool-Vergiftung | Tool-Validierung, Integritätsprüfung |
| **MCP04** | Angriffe auf Software-Lieferketten & Manipulation von Abhängigkeiten | GitHub Advanced Security, Dependency Scanning |
| **MCP05** | Befehlseinfügung & Ausführung | Eingabevalidierung, Sandboxing |
| **MCP06** | Beeinflussung des Intent-Flows | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Unzureichende Authentifizierung & Autorisierung | Azure Entra ID, OAuth 2.1 mit PKCE |
| **MCP08** | Mangel an Audit und Telemetrie | Azure Monitor, Application Insights |
| **MCP09** | Schatten-MCP-Server | API Center Governance, Netzwerkisolation |
| **MCP10** | Kontext-Injektion & Übermäßiges Teilen | Datenklassifizierung, minimale Exposition |

### Entwicklung der MCP-Authentifizierung

Die MCP-Spezifikation hat sich wesentlich in Bezug auf Authentifizierung und Autorisierung weiterentwickelt:

- **Ursprünglicher Ansatz**: Frühe Spezifikationen erforderten von Entwicklern eigene Authentifizierungsserver, wobei MCP-Server als OAuth 2.0 Autorisierungsserver die Nutzer-Authentifizierung direkt verwalteten
- **Aktueller Standard (2025-11-25)**: Aktualisierte Spezifikation erlaubt MCP-Servern, die Authentifizierung an externe Identitätsanbieter (wie Microsoft Entra ID) zu delegieren, was die Sicherheitslage verbessert und die Implementierung vereinfacht
- **Transport Layer Security**: Verbesserte Unterstützung sicherer Transportmechanismen mit passenden Authentifizierungsverfahren für lokale (STDIO) und entfernte (Streamable HTTP) Verbindungen

## Sicherheit bei Authentifizierung & Autorisierung

### Aktuelle Sicherheitsherausforderungen

Moderne MCP-Implementierungen sehen sich mehreren Herausforderungen bei Authentifizierung und Autorisierung gegenüber:

### Risiken & Angriffsvektoren

- **Falsch konfigurierte Autorisierungslogik**: Fehlerhafte Autorisierungsimplementierung in MCP-Servern kann sensible Daten offenlegen und Zugriffssteuerung fehlerhaft anwenden
- **Kompromittierung von OAuth-Token**: Token-Diebstahl des lokalen MCP-Servers ermöglicht Angreifern Server-Mimikry und Zugriff auf nachgelagerte Dienste
- **Token-Passthrough-Schwachstellen**: Unsachgemäßer Umgang mit Tokens schafft Umgehungen von Sicherheitskontrollen und Verantwortungslücken
- **Übermäßige Berechtigungen**: Überprivilegierte MCP-Server verletzen das Prinzip der geringsten Privilegien und vergrößern Angriffsflächen

#### Token Passthrough: Ein kritischer Anti-Pattern

**Token Passthrough ist in der aktuellen MCP-Autorisierungsspezifikation ausdrücklich verboten** aufgrund schwerwiegender Sicherheitsfolgen:

##### Umgehung von Sicherheitskontrollen
- MCP-Server und nachgelagerte APIs implementieren wichtige Sicherheitskontrollen (Rate Limiting, Anfragevalidierung, Traffic Monitoring), die auf korrekter Token-Validierung basieren
- Direkte Nutzung von Client-zu-API-Tokens umgeht diese wichtigen Schutzmaßnahmen und untergräbt die Sicherheitsarchitektur

##### Herausforderungen bei Verantwortlichkeit & Audit  
- MCP-Server können nicht zwischen Clients unterscheiden, die mit Tokens des Upstream-Ausstellers operieren, was Audit-Trails zerstört
- Logs der Ressourcenserver zeigen irreführende Ursprünge von Anfragen statt die tatsächlich dienlichen MCP-Server
- Vorfalluntersuchung und Compliance-Audits werden erheblich erschwert

##### Risiken der Datenexfiltration
- Unvalidierte Token-Claims ermöglichen es bösartigen Akteuren mit gestohlenen Tokens, MCP-Server als Proxy zur Datenexfiltration zu nutzen
- Verletzungen der Vertrauensgrenze erlauben unautorisierte Zugriffswege, die beabsichtigte Sicherheitsmaßnahmen umgehen

##### Angriffsvektoren über mehrere Dienste hinweg
- Akzeptierte kompromittierte Tokens durch mehrere Dienste ermöglichen laterale Bewegungen in verbundenen Systemen
- Vertrauensannahmen zwischen Diensten werden verletzt, wenn Token-Ursprünge nicht verifiziert werden können

### Sicherheitskontrollen & Gegenmaßnahmen

**Kritische Sicherheitsanforderungen:**

> **VERPFLICHTEND:** MCP-Server **DÜRFEN KEINE** Tokens akzeptieren, die nicht explizit für den MCP-Server ausgestellt wurden

#### Authentifizierungs- & Autorisierungskontrollen

- **Gründliche Überprüfung der Autorisierung**: Umfassende Audits der Autorisierungslogik von MCP-Servern durchführen, um sicherzustellen, dass nur vorgesehene Nutzer und Clients Zugang zu sensiblen Ressourcen haben
  - **Implementierungsanleitung**: [Azure API Management als Authentifizierungsgateway für MCP-Server](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identitätsintegration**: [Nutzung von Microsoft Entra ID zur MCP-Server-Authentifizierung](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Sicheres Token-Management**: Umsetzung von [Microsofts Best Practices zur Token-Validierung und Lebenszyklusverwaltung](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validierung, dass Token-Audience-Claims mit der MCP-Server-Identität übereinstimmen
  - Richtige Token-Rotation und Ablaufmechanismen implementieren
  - Token-Replay-Angriffe und unerlaubte Nutzung verhindern

- **Geschütztes Token-Speicher**: Sichere Aufbewahrung von Tokens mit Verschlüsselung sowohl im Ruhezustand als auch während der Übertragung
  - **Best Practices**: [Leitfaden für sichere Token-Speicherung und Verschlüsselung](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Umsetzung von Zugriffssteuerungen

- **Prinzip der geringsten Privilegien**: MCP-Server nur mit den minimal erforderlichen Berechtigungen ausstatten
  - Regelmäßige Überprüfungen und Aktualisierungen der Berechtigungen zur Verhinderung von Privilegien-Anhäufung
  - **Microsoft-Dokumentation**: [Sichere Least-Privileged-Zugriffe](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Rollenbasierte Zugriffskontrolle (RBAC)**: Feingranulare Rollenvergabe implementieren
  - Rollen strikt auf spezifische Ressourcen und Aktionen beschränken
  - Breite oder unnötige Berechtigungen vermeiden, die Angriffsflächen erweitern

- **Kontinuierliche Berechtigungsüberwachung**: Laufende Zugriffsprüfung und Monitoring implementieren
  - Nutzungsmuster von Berechtigungen auf Anomalien überwachen
  - Übermäßige oder ungenutzte Privilegien zeitnah beheben

## KI-spezifische Sicherheitsbedrohungen

### Prompt-Injection & Tool-Manipulationsangriffe

Moderne MCP-Implementierungen sehen sich hochentwickelten KI-spezifischen Angriffsvektoren gegenüber, denen traditionelle Sicherheitsmaßnahmen nur unzureichend begegnen können:

#### **Indirekte Prompt-Injection (Cross-Domain Prompt Injection)**

**Indirekte Prompt-Injection** stellt eine der kritischsten Verwundbarkeiten in MCP-aktivierten KI-Systemen dar. Angreifer betten bösartige Anweisungen in externe Inhalte ein—Dokumente, Webseiten, E-Mails oder Datenquellen—die von KI-Systemen anschließend als legitime Befehle verarbeitet werden.

**Angriffsszenarien:**
- **Dokumentenbasierte Injection:** Versteckte bösartige Anweisungen in verarbeiteten Dokumenten, die unbeabsichtigte KI-Aktionen auslösen
- **Exploitation von Webinhalten:** Kompromittierte Webseiten enthalten eingebettete Prompts, die KI-Verhalten beim Scraping manipulieren
- **Email-basierte Angriffe:** Bösartige Prompts in E-Mails, die KI-Assistenten dazu bringen, Informationen zu leaken oder nicht autorisierte Aktionen auszuführen
- **Kontaminierung von Datenquellen:** Kompromittierte Datenbanken oder APIs liefern verseuchte Inhalte an KI-Systeme

**Reale Auswirkungen:** Diese Angriffe können zu Datenexfiltration, Datenschutzverletzungen, Generierung schädlicher Inhalte und Manipulation von Nutzerinteraktionen führen. Für eine detaillierte Analyse siehe [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/de/prompt-injection.ed9fbfde297ca877.webp)

#### **Tool-Vergiftungsangriffe**

**Tool Poisoning** zielt auf die Metadaten, die MCP-Tools definieren, und nutzt aus, wie LLMs Tool-Beschreibungen und Parameter interpretieren, um Ausführungsentscheidungen zu treffen.

**Angriffsmechanismen:**
- **Manipulation von Metadaten:** Angreifer injizieren bösartige Anweisungen in Tool-Beschreibungen, Parameterdefinitionen oder Nutzungsbeispiele
- **Unsichtbare Anweisungen:** Versteckte Prompts in Tool-Metadaten, die von KI-Modellen verarbeitet werden, jedoch für Menschen unsichtbar sind
- **Dynamische Tool-Änderungen („Rug Pulls“):** Tools, die von Nutzern genehmigt wurden, werden später ohne deren Wissen verändert, um bösartige Aktionen auszuführen
- **Parameter-Injektion:** Bösartiger Inhalt in Tool-Paramschemas, der das Modellverhalten beeinflusst

**Risiken gehosteter Server:** Remote MCP-Server bergen erhöhte Risiken, da Tool-Definitionen nach anfänglicher Nutzerfreigabe aktualisiert werden können, was zu Szenarien führt, in denen zuvor sichere Tools bösartig werden. Für umfassende Analyse siehe [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/de/tool-injection.3b0b4a6b24de6bef.webp)

#### **Weitere AI-Angriffsvektoren**

- **Cross-Domain Prompt Injection (XPIA):** Hochentwickelte Angriffe, die Inhalte aus mehreren Domains nutzen, um Sicherheitskontrollen zu umgehen
- **Dynamische Fähigkeitsänderung**: Echtzeitänderungen der Werkzeugfähigkeiten, die anfängliche Sicherheitsbewertungen umgehen  
- **Kontextfenster-Vergiftung**: Angriffe, die große Kontextfenster manipulieren, um bösartige Anweisungen zu verbergen  
- **Modell-Verwirrungsangriffe**: Ausnutzung von Modellbegrenzungen zur Erzeugung unvorhersehbarer oder unsicherer Verhaltensweisen  


### Auswirkungen von KI-Sicherheitsrisiken

**Konsequenzen mit hohem Einfluss:**
- **Datenexfiltration**: Unbefugter Zugriff und Diebstahl sensibler Unternehmens- oder personenbezogener Daten  
- **Datenschutzverletzungen**: Offenlegung personenbezogener Daten (PII) und vertraulicher Geschäftsdaten  
- **Systemmanipulation**: Unbeabsichtigte Änderungen an kritischen Systemen und Workflows  
- **Diebstahl von Zugangsdaten**: Kompromittierung von Authentifizierungstoken und Dienstzugangsdaten  
- **Laterale Bewegung**: Nutzung kompromittierter KI-Systeme als Ausgangspunkt für weiterreichende Netzwerkangriffe  

### Microsoft AI-Sicherheitslösungen

#### **AI Prompt Shields: Erweiterter Schutz gegen Injection-Angriffe**

Microsoft **AI Prompt Shields** bieten umfassenden Schutz gegen direkte und indirekte Prompt-Injection-Angriffe durch mehrere Sicherheitsebenen:

##### **Kernschutzmechanismen:**

1. **Erweiterte Erkennung & Filterung**  
   - Maschinelle Lernalgorithmen und NLP-Techniken erkennen bösartige Anweisungen in externen Inhalten  
   - Echtzeitanalyse von Dokumenten, Webseiten, E-Mails und Datenquellen auf eingebettete Bedrohungen  
   - Kontextuelles Verständnis legitimer vs. bösartiger Prompt-Muster  

2. **Spotlighting-Techniken**  
   - Unterscheidet zwischen vertrauenswürdigen Systemanweisungen und potenziell kompromittierten externen Eingaben  
   - Textumwandlungsmethoden, die die Relevanz für das Modell erhöhen und bösartige Inhalte isolieren  
   - Unterstützt KI-Systeme dabei, die richtige Anweisungshierarchie aufrechtzuerhalten und injizierte Befehle zu ignorieren  

3. **Delimiter- & Datamarking-Systeme**  
   - Explizite Grenzdefinition zwischen vertrauenswürdigen Systemnachrichten und externem Eingabetext  
   - Spezielle Markierungen heben die Grenzen zwischen vertrauenswürdigen und nicht vertrauenswürdigen Datenquellen hervor  
   - Klare Trennung verhindert Anweisungsverwirrung und unautorisierte Befehlsausführung  

4. **Kontinuierliche Bedrohungsinformationen**  
   - Microsoft überwacht fortlaufend neue Angriffs-Muster und aktualisiert die Schutzmaßnahmen  
   - Proaktive Bedrohungserkennung für neue Injection-Techniken und Angriffsvektoren  
   - Regelmäßige Sicherheitsmodell-Updates zur Aufrechterhaltung der Effektivität gegen sich entwickelnde Bedrohungen  

5. **Integration von Azure Content Safety**  
   - Teil der umfassenden Azure AI Content Safety-Suite  
   - Zusätzliche Erkennung von Jailbreak-Versuchen, schädlichen Inhalten und Verstößen gegen Sicherheitsrichtlinien  
   - Vereinheitlichte Sicherheitskontrollen über AI-Anwendungskomponenten hinweg  

**Implementierungsressourcen**: [Microsoft Prompt Shields Dokumentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/de/prompt-shield.ff5b95be76e9c78c.webp)


## Erweiterte MCP-Sicherheitsbedrohungen

### Session Hijacking Schwachstellen

**Session Hijacking** stellt einen kritischen Angriffsvektor in zustandsbehafteten MCP-Implementierungen dar, bei dem unbefugte Parteien legitime Sitzungskennungen erlangen und missbrauchen, um sich als Clients auszugeben und unerlaubte Aktionen durchzuführen.

#### **Angriffsszenarien & Risiken**

- **Session Hijack Prompt Injection**: Angreifer mit gestohlenen Sitzungs-IDs injizieren bösartige Ereignisse in Server, die Sitzungszustände teilen, was potenziell schädliche Aktionen auslösen oder Zugriff auf sensiblen Daten ermöglichen kann  
- **Direkte Nachahmung**: Gestohlene Sitzungs-IDs ermöglichen direkte MCP-Serveraufrufe, die die Authentifizierung umgehen und Angreifer als legitime Nutzer behandeln  
- **Kompromittierte Fortsetzbare Streams**: Angreifer können Anfragen vorzeitig beenden, sodass legitime Clients mit potenziell bösartigen Inhalten fortsetzen  

#### **Sicherheitskontrollen für Sitzungsmanagement**

**Kritische Anforderungen:**
- **Autorisierungsprüfung**: MCP-Server, die Autorisierung implementieren, **MÜSSEN** ALLE eingehenden Anfragen verifizieren und **DÜRFEN NICHT** auf Sitzungen zur Authentifizierung vertrauen  
- **Sichere Sitzungs-ID-Erzeugung**: Verwendung kryptografisch sicherer, nicht-deterministischer Sitzungs-IDs, die mit sicheren Zufallszahlengeneratoren erstellt werden  
- **Benutzerspezifische Bindung**: Bindung von Sitzungs-IDs an benutzerspezifische Informationen z. B. im Format `<user_id>:<session_id>`, um Sitzungs-Missbrauch zwischen Benutzern zu verhindern  
- **Sitzungslebenszyklus-Management**: Implementierung von korrekter Ablaufsteuerung, Rotation und Ungültigmachung zur Begrenzung von Angriffsfenstern  
- **Transportsicherheit**: Obligatorisches HTTPS für alle Kommunikationen, um Abfangen von Sitzungs-IDs zu verhindern  

### Confused Deputy Problem

Das **confused deputy problem** tritt auf, wenn MCP-Server als Authentifizierungsproxies zwischen Clients und Drittanbieterdiensten agieren und Möglichkeiten schaffen, Autorisierungsumgehungen durch Ausnutzung statischer Client-IDs zu erreichen.

#### **Angriffsmechanismen & Risiken**

- **Cookie-basierte Zustimmungsumgehung**: Frühere Benutzerauthentifizierungen erzeugen Zustimmungs-Cookies, die Angreifer mittels bösartiger Autorisierungsanfragen mit manipulierten Redirect-URIs ausnutzen  
- **Diebstahl von Autorisierungscodes**: Vorhandene Zustimmungs-Cookies können dazu führen, dass Autorisierungsserver Zustimmungsbildschirme überspringen und Codes an vom Angreifer kontrollierte Endpunkte umleiten  
- **Unautorisierter API-Zugriff**: Gestohlene Autorisierungscodes ermöglichen Token-Austausch und Benutzer-Imitation ohne explizite Genehmigung  

#### **Gegenmaßnahmen**

**Verpflichtende Kontrollen:**
- **Explizite Zustimmung**: MCP-Proxy-Server, die statische Client-IDs verwenden, **MÜSSEN** für jeden dynamisch registrierten Client die Zustimmung des Benutzers einholen  
- **OAuth 2.1 Sicherheitsimplementierung**: Einhaltung aktueller OAuth-Sicherheitspraktiken einschließlich PKCE (Proof Key for Code Exchange) für alle Autorisierungsanfragen  
- **Strenge Client-Validierung**: Implementierung rigoroser Validierung von Redirect-URIs und Client-IDs zur Verhinderung von Ausnutzung  

### Token Passthrough Schwachstellen  

**Token Passthrough** ist ein explizites Anti-Pattern, bei dem MCP-Server Client-Token ohne ordnungsgemäße Validierung akzeptieren und an nachgelagerte APIs weiterleiten, was die MCP-Autorisierungsspezifikationen verletzt.

#### **Sicherheitsimplikationen**

- **Umgehung von Kontrollmechanismen**: Direkte Nutzung von Client-Token in APIs umgeht wichtige Rate-Limits, Validierungen und Überwachungen  
- **Korrumpierung der Audit-Trails**: Vom Upstream ausgestellte Token verhindern die Identifikation des Clients, was Vorfalluntersuchungen erschwert  
- **Proxy-basierte Datenexfiltration**: Unvalidierte Tokens ermöglichen es Angreifern, Server als Proxy für unautorisierten Datenzugriff zu missbrauchen  
- **Verletzungen von Vertrauensgrenzen**: Vertrauenserwartungen nachgelagerter Dienste können verletzt werden, wenn Tokenherkunft nicht verifiziert werden kann  
- **Erweiterung von Mehrfachdienst-Angriffen**: Akzeptierte kompromittierte Tokens über mehrere Dienste ermöglichen laterale Bewegungen  

#### **Erforderliche Sicherheitskontrollen**

**Nicht verhandelbare Anforderungen:**
- **Token-Validierung**: MCP-Server **DÜRFEN NICHT** Tokens akzeptieren, die nicht explizit für den MCP-Server ausgestellt wurden  
- **Überprüfung der Audience**: Immer überprüfen, ob die Audience-Claims des Tokens mit der MCP-Server-Identität übereinstimmen  
- **Angemessener Token-Lebenszyklus**: Implementierung kurzlebiger Zugriffstoken mit sicheren Rotationsmechanismen  


## Lieferkettensicherheit für KI-Systeme

Die Lieferkettensicherheit hat sich über traditionelle Softwareabhängigkeiten hinausweiterentwickelt und umfasst das gesamte KI-Ökosystem. Moderne MCP-Implementierungen müssen alle KI-bezogenen Komponenten rigoros verifizieren und überwachen, da jede Komponente potenzielle Schwachstellen einführt, die die Systemintegrität gefährden können.

### Erweiterte KI-Lieferkettenkomponenten

**Traditionelle Softwareabhängigkeiten:**  
- Open-Source-Bibliotheken und Frameworks  
- Container-Images und Basissysteme  
- Entwicklungstools und Build-Pipelines  
- Infrastrukturkomponenten und Dienste  

**KI-spezifische Lieferkettenelemente:**  
- **Foundation-Modelle**: Vorgefertigte Modelle verschiedener Anbieter, die Herkunftsprüfungen erfordern  
- **Embedding-Dienste**: Externe Vektorisierungs- und semantische Suchdienste  
- **Kontextanbieter**: Datenquellen, Wissensdatenbanken und Dokumenten-Repositorys  
- **Drittanbieter-APIs**: Externe KI-Dienste, ML-Pipelines und Datenverarbeitungsschnittstellen  
- **Modellartefakte**: Gewichte, Konfigurationen und feinabgestimmte Modellvarianten  
- **Training-Datensätze**: Datensätze für Modelltraining und Feineinstellungen  

### Umfassende Strategie für Lieferkettensicherheit

#### **Komponentenverifizierung & Vertrauen**
- **Herkunftsvalidierung**: Verifikation von Ursprung, Lizenzierung und Integrität aller KI-Komponenten vor Integration  
- **Sicherheitsbewertung**: Durchführung von Schwachstellen-Scans und Sicherheitsprüfungen für Modelle, Datenquellen und KI-Dienste  
- **Reputationsanalyse**: Bewertung der Sicherheitsbilanz und Praktiken von KI-Dienstanbietern  
- **Compliance-Prüfung**: Sicherstellung, dass alle Komponenten den organisatorischen Sicherheits- und regulatorischen Vorgaben entsprechen  

#### **Sichere Deployment-Pipelines**  
- **Automatisiertes CI/CD-Security-Scanning**: Integration von Sicherheitsprüfungen in automatisierte Deployment-Pipelines  
- **Integritätssicherung der Artefakte**: Implementierung kryptografischer Überprüfungen für alle bereitgestellten Artefakte (Code, Modelle, Konfigurationen)  
- **Stufeneinführungen**: Einsatz progressiver Deployment-Strategien mit Sicherheitstests auf jeder Stufe  
- **Vertrauenswürdige Artefakt-Repositories**: Deployment nur aus verifizierten, sicheren Artefakt-Registries und Repositories  

#### **Kontinuierliche Überwachung & Reaktion**
- **Abhängigkeits-Scan**: Fortlaufende Schwachstellenüberwachung für alle Software- und KI-Komponentenabhängigkeiten  
- **Modellüberwachung**: Kontinuierliche Bewertung von Modellverhalten, Performance-Drift und Sicherheitsanomalien  
- **Service-Gesundheitsüberwachung**: Überwachung externer KI-Dienste hinsichtlich Verfügbarkeit, Sicherheitsvorfällen und Richtlinienänderungen  
- **Bedrohungsinformationen-Integration**: Einbindung von Bedrohungsinformationen speziell zu KI- und ML-Sicherheitsrisiken  

#### **Zugriffskontrolle & Least Privilege**
- **Komponentenbezogene Berechtigungen**: Beschränkung des Zugriffs auf Modelle, Daten und Dienste nach betrieblicher Notwendigkeit  
- **Servicekonto-Verwaltung**: Einsatz dedizierter Servicekonten mit minimal erforderlichen Rechten  
- **Netzwerksegmentierung**: Isolierung von KI-Komponenten und Begrenzung des Netzwerkzugangs zwischen Diensten  
- **API-Gateway-Kontrollen**: Nutzung zentraler API-Gateways zur Steuerung und Überwachung des Zugriffs auf externe KI-Dienste  

#### **Vorfallreaktion & Wiederherstellung**
- **Schnelle Reaktionsverfahren**: Etablierte Prozesse zum Patchen oder Ersetzen kompromittierter KI-Komponenten  
- **Rotation von Zugangsdaten**: Automatisierte Systeme zur Rotation von Secrets, API-Schlüsseln und Dienstanmeldedaten  
- **Rollback-Fähigkeiten**: Möglichkeit, schnell auf frühere bekannte sichere Versionen von KI-Komponenten zurückzugreifen  
- **Wiederherstellung nach Lieferkettenkompromittierung**: Spezifische Verfahren zur Reaktion auf Kompromittierung bei Upstream-KI-Diensten  

### Microsoft-Sicherheitstools & Integration

**GitHub Advanced Security** bietet umfassenden Schutz der Lieferkette einschließlich:  
- **Secret Scanning**: Automatisierte Erkennung von Zugangsdaten, API-Schlüsseln und Tokens in Repositories  
- **Dependency Scanning**: Schwachstellenbewertung von Open-Source-Abhängigkeiten und Bibliotheken  
- **CodeQL-Analyse**: Statische Codeanalyse auf Sicherheitslücken und Programmierfehler  
- **Supply Chain Insights**: Einblick in den Gesundheitszustand und Sicherheitsstatus von Abhängigkeiten  

**Azure DevOps & Azure Repos Integration:**  
- Nahtlose Einbindung von Sicherheitsscans in Microsoft-Entwicklungsplattformen  
- Automatisierte Sicherheitsprüfungen in Azure Pipelines für KI-Workloads  
- Durchsetzung von Richtlinien für sicheres KI-Komponenten-Deployment  

**Microsoft-internen Praktiken:**  
Microsoft setzt umfassende Sicherheitspraktiken für die Lieferkette in allen Produkten um. Erfahren Sie mehr über bewährte Vorgehensweisen unter [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Best Practices für Foundation-Sicherheit

MCP-Implementierungen übernehmen und bauen auf der vorhandenen Sicherheitslage Ihrer Organisation auf. Die Stärkung grundlegender Sicherheitspraktiken verbessert die Gesamtsicherheit von KI-Systemen und MCP-Bereitstellungen erheblich.

### Grundlegende Sicherheitsprinzipien

#### **Sichere Entwicklungsmethoden**
- **OWASP-Konformität**: Schutz vor [OWASP Top 10](https://owasp.org/www-project-top-ten/) Webanwendungs-Schwachstellen  
- **KI-spezifische Schutzmaßnahmen**: Umsetzung von Kontrollen für die [OWASP Top 10 für LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Sicheres Geheimnismanagement**: Nutzung dedizierter Vaults für Tokens, API-Schlüssel und sensible Konfigurationsdaten  
- **End-to-End-Verschlüsselung**: Implementierung sicherer Kommunikation über alle Anwendungskomponenten und Datenflüsse  
- **Eingabevalidierung**: Strenge Validierung aller Benutzereingaben, API-Parameter und Datenquellen  

#### **Infrastruktur-Härtung**
- **Multi-Faktor-Authentifizierung**: Obligatorische MFA für alle administrativen und Servicekonten  
- **Patch-Management**: Automatisierte, zeitnahe Patch-Versorgung für Betriebssysteme, Frameworks und Abhängigkeiten  
- **Integration von Identitätsanbietern**: Zentrale Identitätsverwaltung über Unternehmens-Identitätsanbieter (Microsoft Entra ID, Active Directory)  
- **Netzwerksegmentierung**: Logische Isolierung von MCP-Komponenten zur Begrenzung lateraler Bewegungen  
- **Prinzip der geringsten Rechte**: Minimale erforderliche Berechtigungen für alle Systemkomponenten und Accounts  

#### **Sicherheitsüberwachung & Erkennung**
- **Umfassende Protokollierung**: Detaillierte Protokolle der KI-Anwendungsaktivitäten, einschließlich MCP Client-Server-Interaktionen  
- **SIEM-Integration**: Zentrale Sicherheitsinformations- und Ereignisverwaltung zur Anomalieerkennung  
- **Verhaltensanalyse**: KI-gestütztes Monitoring zur Erkennung ungewöhnlicher System- und Benutzerverhaltensmuster  
- **Bedrohungsinformationen**: Einbindung externer Bedrohungsfeeds und Indikatoren für Kompromittierung (IOCs)  
- **Vorfallreaktion**: Gut definierte Prozesse zur Erkennung, Reaktion und Wiederherstellung bei Sicherheitsvorfällen  

#### **Zero-Trust-Architektur**
- **Nie vertrauen, immer verifizieren**: Kontinuierliche Verifikation von Benutzern, Geräten und Netzwerkverbindungen  
- **Mikrosegmentierung**: Granulare Netzwerkkontrollen, die einzelne Arbeitslasten und Dienste isolieren  
- **Identitätszentrierte Sicherheit**: Sicherheitsrichtlinien basierend auf verifizierten Identitäten statt Standort im Netzwerk  
- **Kontinuierliche Risikobewertung**: Dynamische Evaluierung der Sicherheitslage basierend auf aktuellem Kontext und Verhalten  
- **Bedingter Zugriff**: Zugriffskontrollen, die sich an Risiko, Standort und Gerätezustand anpassen  

### Enterprise-Integrationsmuster

#### **Integration ins Microsoft-Sicherheitsökosystem**
- **Microsoft Defender for Cloud**: Umfassendes Cloud-Sicherheits-Posture-Management  
- **Azure Sentinel**: Cloud-native SIEM- und SOAR-Funktionen zum Schutz von KI-Workloads  
- **Microsoft Entra ID**: Enterprise-Identitäts- und Zugriffsmanagement mit bedingten Zugriffsrichtlinien  
- **Azure Key Vault**: Zentrale Geheimnisverwaltung mit Hardware-Sicherheitsmodul-Unterstützung (HSM)  
- **Microsoft Purview**: Daten-Governance und Compliance für KI-Datenquellen und Workflows  

#### **Compliance & Governance**
- **Regulatorische Ausrichtung**: Sicherstellung, dass MCP-Implementierungen branchenspezifische Compliance-Anforderungen erfüllen (GDPR, HIPAA, SOC 2)  
- **Datenklassifizierung**: Sachgerechte Kategorisierung und Handhabung sensibler Daten, die von KI-Systemen verarbeitet werden  
- **Audit-Trails**: Umfassende Protokollierung für regulatorische Compliance und forensische Untersuchungen  
- **Datenschutzkontrollen**: Umsetzung datenschutzfreundlicher Prinzipien im Design von KI-Systemarchitekturen  
- **Change Management**: Formale Prozesse für Sicherheitsprüfungen bei Änderungen an KI-Systemen  

Diese grundlegenden Praktiken schaffen eine robuste Sicherheitsbasis, die die Wirksamkeit MCP-spezifischer Sicherheitskontrollen verbessert und umfassenden Schutz für KI-gesteuerte Anwendungen bietet.

## Wichtige Sicherheitserkenntnisse
- **Mehrschichtiger Sicherheitsansatz**: Kombination grundlegender Sicherheitspraktiken (sicheres Codieren, Prinzip der geringsten Privilegien, Überprüfung der Lieferkette, kontinuierliche Überwachung) mit KI-spezifischen Kontrollen für umfassenden Schutz

- **KI-spezifische Bedrohungslandschaft**: MCP-Systeme sind einzigartigen Risiken ausgesetzt, einschließlich Prompt Injection, Tool Poisoning, Session Hijacking, Confused Deputy-Problemen, Token-Durchreich-Schwachstellen und übermäßigen Berechtigungen, die spezialisierte Gegenmaßnahmen erfordern

- **Exzellente Authentifizierung & Autorisierung**: Implementierung robuster Authentifizierung mit externen Identitätsanbietern (Microsoft Entra ID), Durchsetzung korrekter Tokenvalidierung und niemals Akzeptieren von Tokens, die nicht explizit für Ihren MCP-Server ausgestellt wurden

- **Verhinderung von KI-Angriffen**: Einsatz von Microsoft Prompt Shields und Azure Content Safety zum Schutz vor indirekten Prompt Injection- und Tool Poisoning-Angriffen, dabei Validierung von Tool-Metadaten und Überwachung dynamischer Änderungen

- **Sitzungs- & Transportsicherheit**: Verwendung kryptografisch sicherer, nicht-deterministischer Sitzungs-IDs, die an Benutzeridentitäten gebunden sind, Implementierung eines ordnungsgemäßen Sitzungslebenszyklusmanagements und niemals Nutzung von Sitzungen zur Authentifizierung

- **OAuth-Sicherheitsbest Practices**: Verhinderung von Confused Deputy-Angriffen durch explizite Benutzerzustimmung für dynamisch registrierte Clients, korrekte OAuth 2.1-Implementierung mit PKCE und strikte Validierung von Redirect-URIs

- **Token-Sicherheitsprinzipien**: Vermeidung von Token-Durchreich-Anti-Patterns, Validierung von Token-Audience-Claims, Implementierung kurzlebiger Tokens mit sicherem Rotationsmechanismus und Pflege klarer Vertrauensgrenzen

- **Umfassende Sicherheit der Lieferkette**: Behandlung aller KI-Ökosystem-Komponenten (Modelle, Embeddings, Kontextanbieter, externe APIs) mit der gleichen Sicherheitsstrenge wie traditionelle Softwareabhängigkeiten

- **Kontinuierliche Weiterentwicklung**: Auf dem Laufenden bleiben mit schnell entwickelnden MCP-Spezifikationen, Beitrag zu Sicherheitscommunity-Standards und Erhaltung adaptiver Sicherheitsmaßnahmen mit Reifung des Protokolls

- **Integration von Microsoft-Sicherheitslösungen**: Nutzung des umfassenden Microsoft-Sicherheitsökosystems (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) für verbesserten Schutz bei der Bereitstellung von MCP

## Umfassende Ressourcen

### **Offizielle MCP-Sicherheitsdokumentation**
- [MCP-Spezifikation (Aktuell: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP-Sicherheitsbest Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP-Autorisierungsspezifikation](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP-Sicherheitsressourcen**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Umfassender OWASP MCP Top 10 Leitfaden mit Azure-Implementierungsanleitungen
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Offizielle OWASP MCP Sicherheitsrisiken
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praxisorientiertes Sicherheitstraining für MCP auf Azure

### **Sicherheitsstandards & Best Practices**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 für Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **KI-Sicherheitsforschung & Analyse**
- [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tool Poisoning Angriffe (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Security Research Briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft-Sicherheitslösungen**
- [Microsoft Prompt Shields Dokumentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management Best Practices](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Implementierungsanleitungen & Tutorials**
- [Azure API Management als MCP-Authentifizierungsgateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID Authentifizierung mit MCP-Servern](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Sichere Token-Speicherung und Verschlüsselung (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & Lieferkettensicherheit**
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Journey zur Sicherheit der Softwarelieferkette](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Zusätzliche Sicherheitsdokumentation**

Für umfassende Sicherheitsanleitungen verweisen Sie auf diese spezialisierten Dokumente in diesem Abschnitt:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Vollständige Sicherheitsbest Practices für MCP-Implementierungen
- **[Azure Content Safety Implementierung](./azure-content-safety-implementation.md)** - Praktische Umsetzungsmöglichkeiten zur Integration von Azure Content Safety  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Neueste Sicherheitskontrollen und Techniken für MCP-Bereitstellungen
- **[MCP Best Practices Kurzübersicht](./mcp-best-practices.md)** - Schnelle Referenz für essenzielle MCP-Sicherheitspraktiken
- **[BlueHat 2026: Die Zukunft der KI sichern: MCP mit Defense-in-Depth-Mustern schützen](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Defense-in-Depth-Muster vom Microsoft Security Response Center (MSRC)

### **Praxisorientiertes Sicherheitstraining**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Umfassender Hands-on-Workshop zur Sicherung von MCP-Servern in Azure mit aufeinander aufbauenden Camps von Base Camp bis Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referenzarchitektur und Implementierungshinweise zu allen OWASP MCP Top 10 Risiken

---

## Was kommt als Nächstes

Weiter: [Kapitel 3: Erste Schritte](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->