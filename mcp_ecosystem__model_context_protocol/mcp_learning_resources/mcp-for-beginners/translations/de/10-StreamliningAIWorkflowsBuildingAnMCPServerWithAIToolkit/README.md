# Optimierung von KI-Workflows: Aufbau eines MCP-Servers mit Microsoft Foundry Toolkit

[![MCP Spec](https://img.shields.io/badge/MCP%20Spec-2025--11--25-blue.svg)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
[![Python](https://img.shields.io/badge/Python-3.10+-green.svg)](https://python.org)
[![VS Code](https://img.shields.io/badge/VS%20Code-Latest-orange.svg)](https://code.visualstudio.com/)

![logo](../../../translated_images/de/logo.ec93918ec338dadd.webp)

## 🎯  Übersicht

[![Build AI Agents in VS Code: 4 Hands-On Labs with MCP and Microsoft Foundry Toolkit](../../../translated_images/de/11.0f6db6a0fb606885.webp)](https://youtu.be/r34Csn3rkeQ)

_(Klicken Sie auf das Bild oben, um das Video dieser Lektion anzusehen)_

Willkommen zum **Model Context Protocol (MCP) Workshop**! Dieser umfassende Hands-on-Workshop kombiniert zwei Spitzen-Technologien, um die Entwicklung von KI-Anwendungen zu revolutionieren:

- **🔗 Model Context Protocol (MCP)**: Ein offener Standard für nahtlose KI-Tool-Integration
- **🛠️ Microsoft Foundry Toolkit Extension für VS Code**: Microsofts leistungsstarke Erweiterung für KI-Entwicklung

### 🎓 Was Sie lernen werden

Am Ende dieses Workshops beherrschen Sie die Kunst, intelligente Anwendungen zu bauen, die KI-Modelle mit realen Werkzeugen und Diensten verknüpfen. Von automatisierten Tests bis hin zu benutzerdefinierten API-Integrationen erhalten Sie praktische Fähigkeiten zur Lösung komplexer Geschäftsanforderungen.

## 🏗️ Technologiestack

### 🔌 Model Context Protocol (MCP)

MCP ist der **„USB-C für KI“** – ein universeller Standard, der KI-Modelle mit externen Werkzeugen und Datenquellen verbindet.

**✨ Hauptmerkmale:**

- 🔄 **Standardisierte Integration**: Universelle Schnittstelle für KI-Tool-Verbindungen
- 🏛️ **Flexible Architektur**: Lokale & entfernte Server über stdio/SSE-Transport
- 🧰 **Reiches Ökosystem**: Werkzeuge, Prompts und Ressourcen in einem Protokoll
- 🔒 **Enterprise-Ready**: Eingebaute Sicherheit und Zuverlässigkeit

**🎯 Warum MCP wichtig ist:**
Wie USB-C das Kabelchaos beseitigt hat, beseitigt MCP die Komplexität von KI-Integrationen. Ein Protokoll, unendliche Möglichkeiten.

### 🤖 Microsoft Foundry Toolkit Extension für VS Code

Microsofts führende KI-Entwicklungserweiterung, die VS Code in eine KI-Powerhouse verwandelt.

**🚀 Kernfähigkeiten:**

- 📦 **Modellkatalog**: Zugriff auf Modelle von Azure AI, GitHub, Hugging Face, Ollama
- ⚡ **Lokale Inferenz**: ONNX-optimierte CPU/GPU/NPU-Ausführung
- 🏗️ **Agent Builder**: Visuelle KI-Agenten-Entwicklung mit MCP-Integration
- 🎭 **Multimodal**: Unterstützung für Text, Vision und strukturierte Ausgabe

**💡 Entwicklungs-Vorteile:**

- Modellbereitstellung ohne Konfiguration
- Visuelle Prompt-Entwicklung
- Echtzeit-Testspielplatz
- Nahtlose MCP-Server-Integration

## 📚 Lernreise

### [🚀 Modul 1: Microsoft Foundry Toolkit Grundlagen](./lab1/README.md)

**Dauer**: 15 Minuten

- 🛠️ Installation und Konfiguration des Microsoft Foundry Toolkit für VS Code
- 🗂️ Erkundung des Modellkatalogs (100+ Modelle von GitHub, ONNX, OpenAI, Anthropic, Google)
- 🎮 Beherrschung des interaktiven Spielplatzes für Echtzeit-Modelltests
- 🤖 Bau Ihres ersten KI-Agenten mit Agent Builder
- 📊 Bewertung der Modellleistung mit eingebauten Metriken (F1, Relevanz, Ähnlichkeit, Kohärenz)
- ⚡ Erlernen von Batch-Verarbeitung und Multimodalität

**🎯 Lernergebnis**: Erstellung eines funktionalen KI-Agenten mit umfassendem Verständnis der Microsoft Foundry Toolkit Fähigkeiten

### [🌐 Modul 2: MCP mit Microsoft Foundry Toolkit Grundlagen](./lab2/README.md)

**Dauer**: 20 Minuten

- 🧠 Beherrschung der Architektur und Konzepte des Model Context Protocol (MCP)
- 🌐 Erkundung des Microsoft MCP-Server-Ökosystems
- 🤖 Bau eines Browser-Automatisierungsagenten mit Playwright MCP Server
- 🔧 Integration von MCP-Servern in Microsoft Foundry Toolkit Agent Builder
- 📊 Konfiguration und Test von MCP-Tools innerhalb Ihrer Agenten
- 🚀 Export und Deployment MCP-gestützter Agenten für den Produktiveinsatz

**🎯 Lernergebnis**: Bereitstellung eines KI-Agenten, der durch externe Tools via MCP erweitert ist

### [🔧 Modul 3: Erweiterte MCP-Entwicklung mit Microsoft Foundry Toolkit](./lab3/README.md)

**Dauer**: 20 Minuten

- 💻 Erstellung benutzerdefinierter MCP-Server mit Microsoft Foundry Toolkit
- 🐍 Nutzung und Konfiguration des aktuellen MCP Python SDK (v1.9.3)
- 🔍 Einrichtung und Nutzung von MCP Inspector zum Debugging
- 🛠️ Aufbau eines Weather MCP Servers mit professionellen Debugging-Workflows
- 🧪 Debugging von MCP-Servern sowohl im Agent Builder als auch im Inspector

**🎯 Lernergebnis**: Entwicklung und Debugging benutzerdefinierter MCP-Server mit modernen Werkzeugen

### [🐙 Modul 4: Praktische MCP-Entwicklung – Custom GitHub Clone Server](./lab4/README.md)

**Dauer**: 30 Minuten

- 🏗️ Aufbau eines realen GitHub Clone MCP Servers für Entwicklungs-Workflows
- 🔄 Implementierung intelligenter Repository-Klone inklusive Validierung und Fehlerbehandlung
- 📁 Erschaffung intelligenter Verzeichnisverwaltung und VS Code-Integration
- 🤖 Verwendung des GitHub Copilot Agentenmodus mit benutzerdefinierten MCP-Tools
- 🛡️ Anwendung von produktionsreifer Zuverlässigkeit und plattformübergreifender Kompatibilität

**🎯 Lernergebnis**: Bereitstellung eines produktionsreifen MCP-Servers, der reale Entwicklungs-Workflows optimiert

## 💡 Anwendungsbeispiele & Auswirkungen aus der Praxis

### 🏢 Unternehmensanwendungen

#### 🔄 DevOps-Automatisierung

Transformieren Sie Ihren Entwicklungsworkflow mit intelligenter Automatisierung:

- **Intelligentes Repository-Management**: KI-gesteuerte Code-Reviews und Merge-Entscheidungen
- **Intelligente CI/CD**: Automatisierte Pipeline-Optimierung basierend auf Code-Änderungen
- **Issue-Triage**: Automatische Fehlerklassifizierung und Zuweisung

#### 🧪 Revolution in der Qualitätssicherung

Verbessern Sie Tests mit KI-gestützter Automatisierung:

- **Intelligente Testgenerierung**: Automatisches Erstellen umfassender Test-Suiten
- **Visuelle Regressionstests**: KI-basierte Erkennung von UI-Änderungen
- **Performance-Monitoring**: Proaktive Fehlererkennung und -behebung

#### 📊 Intelligenz für Datenpipelines

Bauen Sie intelligentere Datenverarbeitungs-Workflows:

- **Adaptive ETL-Prozesse**: Selbstoptimierende Datenumwandlungen
- **Anomalieerkennung**: Echtzeit-Überwachung der Datenqualität
- **Intelligentes Routing**: Schlaues Datenflussmanagement

#### 🎧 Verbesserung der Kundenerfahrung

Schaffen Sie außergewöhnliche Kundeninteraktionen:

- **Kontextbewusste Unterstützung**: KI-Agenten mit Zugriff auf Kundenhistorie
- **Proaktive Problemlösung**: Vorausschauender Kundenservice
- **Multikanal-Integration**: Einheitliches KI-Erlebnis über Plattformen hinweg

## 🛠️ Voraussetzungen & Einrichtung

### 💻 Systemanforderungen

| Komponente            | Anforderung            | Hinweise                      |
|----------------------|------------------------|-----------------------------|
| **Betriebssystem**   | Windows 10+, macOS 10.15+, Linux | Beliebiges modernes Betriebssystem |
| **Visual Studio Code** | Neuste stabile Version | Erforderlich für Microsoft Foundry Toolkit |
| **Node.js**           | v18.0+ und npm         | Für MCP-Server-Entwicklung   |
| **Python**            | 3.10+                  | Optional für Python MCP-Server |
| **Speicher**          | Mindestens 8GB RAM     | 16GB empfohlen für lokale Modelle |

### 🔧 Entwicklungsumgebung

#### Empfohlene VS Code Erweiterungen

- **Microsoft Foundry Toolkit** (ms-windows-ai-studio.windows-ai-studio)
- **Python** (ms-python.python)
- **Python Debugger** (ms-python.debugpy)
- **GitHub Copilot** (GitHub.copilot) – Optional, aber hilfreich

#### Optionale Werkzeuge

- **uv**: Moderner Python-Paketmanager
- **MCP Inspector**: Visuales Debugging-Tool für MCP-Server
- **Playwright**: Für Web-Automatisierungsbeispiele

## 🎖️ Lernergebnisse & Zertifizierungsweg

### 🏆 Checkliste der Kompetenzen

Mit Abschluss dieses Workshops erreichen Sie Expertise in:

#### 🎯 Kernkompetenzen

- [ ] **MCP Protokoll-Beherrschung**: Tiefes Verständnis von Architektur und Implementierungsmustern
- [ ] **Microsoft Foundry Toolkit Kenntnisse**: Expertenlevel in der Nutzung des Toolkits für schnelle Entwicklung
- [ ] **Entwicklung benutzerdefinierter Server**: Aufbau, Deployment und Wartung von produktionsreifen MCP-Servern
- [ ] **Exzellente Tool-Integration**: Nahtlose Anbindung von KI an bestehende Entwicklungsworkflows
- [ ] **Anwendung von Problemlösungen**: Umsetzung erlernter Fähigkeiten bei echten Geschäftsproblemen

#### 🔧 Technische Fähigkeiten

- [ ] Einrichtung und Konfiguration des Microsoft Foundry Toolkit in VS Code
- [ ] Entwurf und Implementierung benutzerdefinierter MCP-Server
- [ ] Integration von GitHub-Modellen in die MCP-Architektur
- [ ] Aufbau automatisierter Test-Workflows mit Playwright
- [ ] Deployment von KI-Agenten für den Produktiveinsatz
- [ ] Debugging und Optimierung der MCP-Server-Performance

#### 🚀 Erweiterte Fähigkeiten

- [ ] Architektur von KI-Integrationen im Unternehmensmaßstab
- [ ] Umsetzung von Sicherheitsbest-Practices für KI-Anwendungen
- [ ] Design skalierbarer MCP-Server-Architekturen
- [ ] Erstellung maßgeschneiderter Toolchains für spezielle Domains
- [ ] Mentoring in KI-nativer Entwicklung

## 📖 Weitere Ressourcen

- [MCP Spezifikation (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Microsoft Foundry Toolkit GitHub Repository](https://github.com/microsoft/vscode-ai-toolkit)
- [Sammlung von Beispiel-MCP-Servern](https://github.com/modelcontextprotocol/servers)
- [Best Practices Guide](https://modelcontextprotocol.io/docs/best-practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Sicherheits-Best Practices

---

**🚀 Bereit, Ihren KI-Entwicklungsworkflow zu revolutionieren?**

Lassen Sie uns gemeinsam die Zukunft intelligenter Anwendungen mit MCP und Microsoft Foundry Toolkit gestalten!

## Was kommt als Nächstes

Fortfahren zu: [Modul 11: MCP Server Hands-On Labs](../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->