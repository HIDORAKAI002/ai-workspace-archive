# 🚀 Modul 1: Grundlagen des Microsoft Foundry Toolkits

[![Dauer](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Schwierigkeit](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Voraussetzungen](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Lernziele

Am Ende dieses Moduls werden Sie in der Lage sein:
- ✅ Die Microsoft Foundry Toolkit Extension für VS Code zu installieren und zu konfigurieren
- ✅ Den Modellkatalog zu navigieren und verschiedene Modellquellen zu verstehen
- ✅ Den Playground für Modeltests und Experimente zu nutzen
- ✅ Maßgeschneiderte KI-Agenten mit dem Agent Builder zu erstellen
- ✅ Die Modellleistung bei verschiedenen Anbietern zu vergleichen
- ✅ Best Practices für Prompt Engineering anzuwenden

## 🧠 Einführung in das Microsoft Foundry Toolkit

Die **Microsoft Foundry Toolkit Extension für VS Code** ist Microsofts Flaggschiff-Erweiterung, die VS Code in eine umfassende KI-Entwicklungsumgebung verwandelt. Sie schlägt eine Brücke zwischen KI-Forschung und praktischer Anwendungsentwicklung und macht generative KI für Entwickler aller Erfahrungsstufen zugänglich.

### 🌟 Hauptfunktionen

| Funktion | Beschreibung | Anwendungsfall |
|---------|-------------|----------|
| **🗂️ Modellkatalog** | Zugriff auf über 100 Modelle von GitHub, ONNX, OpenAI, Anthropic, Google | Modellentdeckung und -auswahl |
| **🔌 BYOM-Unterstützung** | Integration eigener Modelle (lokal/remote) | Eigene Modellbereitstellung |
| **🎮 Interaktiver Playground** | Echtzeit-Modelltests mit Chat-Oberfläche | Schnelles Prototyping und Testen |
| **📎 Multi-Modale Unterstützung** | Verarbeitung von Text, Bildern und Anhängen | Komplexe KI-Anwendungen |
| **⚡ Stapelverarbeitung** | Gleichzeitiges Ausführen mehrerer Prompts | Effiziente Testworkflows |
| **📊 Modellevaluation** | Eingebaute Metriken (F1, Relevanz, Ähnlichkeit, Kohärenz) | Leistungsbewertung |

### 🎯 Warum das Microsoft Foundry Toolkit wichtig ist

- **🚀 Beschleunigte Entwicklung**: Vom Konzept zum Prototyp in Minuten
- **🔄 Einheitlicher Workflow**: Eine Schnittstelle für mehrere KI-Anbieter
- **🧪 Einfache Experimente**: Modelle ohne komplexe Einrichtung vergleichen
- **📈 Produkttauglich**: Nahtloser Übergang von Prototyp zu Einsatz

## 🛠️ Voraussetzungen & Einrichtung

### 📦 Microsoft Foundry Toolkit Extension installieren

**Schritt 1: Zugang zum Erweiterungen-Marktplatz**
1. Öffnen Sie Visual Studio Code
2. Navigieren Sie zur Erweiterungsansicht (`Ctrl+Shift+X` oder `Cmd+Shift+X`)
3. Suchen Sie nach "Microsoft Foundry Toolkit"

**Schritt 2: Wählen Sie Ihre Version**
- **🟢 Release**: Empfohlen für produktiven Einsatz
- **🔶 Vorabversion**: Frühzugang zu neuen Funktionen

**Schritt 3: Installation und Aktivierung**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/de/aitkext.d28945a03eed003c.webp)

### ✅ Prüfcheckliste
- [ ] Microsoft Foundry Toolkit-Symbol erscheint in der VS Code-Seitenleiste
- [ ] Erweiterung ist aktiviert und funktionsfähig
- [ ] Keine Installationsfehler im Ausgabefenster

## 🧪 Praktische Übung 1: GitHub-Modelle erkunden

**🎯 Ziel**: Den Modellkatalog meistern und Ihr erstes KI-Modell testen

### 📊 Schritt 1: Den Modellkatalog navigieren

Der Modellkatalog ist Ihr Tor zur KI-Ökosystem. Er aggregiert Modelle verschiedener Anbieter, wodurch das Entdecken und Vergleichen leicht fällt.

**🔍 Navigationsanleitung:**

Klicken Sie im Microsoft Foundry Toolkit in der Seitenleiste auf **MODELS - Catalog**

![Modellkatalog](../../../../translated_images/de/aimodel.263ed2be013d8fb0.webp)

**💡 Profi-Tipp**: Suchen Sie nach Modellen mit bestimmten Fähigkeiten, die Ihren Anwendungsfall erfüllen (z.B. Code-Generierung, kreatives Schreiben, Analyse).

**⚠️ Hinweis**: GitHub-gehostete Modelle (d.h., GitHub-Modelle) sind kostenlos nutzbar, unterliegen jedoch Rate Limits bei Anfragen und Tokens. Für den Zugriff auf Nicht-GitHub-Modelle (also externe Modelle, die über Azure AI oder andere Endpunkte gehostet werden) benötigen Sie den entsprechenden API-Schlüssel oder Authentifizierung.

### 🚀 Schritt 2: Ihr erstes Modell hinzufügen und konfigurieren

**Modellauswahlstrategie:**
- **GPT-4.1**: Am besten für komplexes Denken und Analyse
- **Phi-4-mini**: Leichtgewichtig, schnelle Antworten für einfache Aufgaben

**🔧 Konfigurationsprozess:**
1. Wählen Sie **OpenAI GPT-4.1** aus dem Katalog
2. Klicken Sie auf **Zu meinen Modellen hinzufügen** – dies registriert das Modell zur Nutzung
3. Wählen Sie **Im Playground testen** zum Starten der Testumgebung
4. Warten Sie auf die Modellinitialisierung (Erstsetup kann kurz dauern)

![Playground Setup](../../../../translated_images/de/playground.dd6f5141344878ca.webp)

**⚙️ Verständnis der Modellparameter:**
- **Temperature**: Steuert die Kreativität (0 = deterministisch, 1 = kreativ)
- **Max Tokens**: Maximale Antwortlänge
- **Top-p**: Nucleus Sampling für Diversität der Antwort

### 🎯 Schritt 3: Die Playground-Benutzeroberfläche meistern

Der Playground ist Ihr Labor für KI-Experimente. So nutzen Sie ihn optimal:

**🎨 Best Practices im Prompt Engineering:**
1. **Seien Sie spezifisch**: Klare, detaillierte Anweisungen liefern bessere Ergebnisse
2. **Kontext bereitstellen**: Relevante Hintergrundinformationen einschließen
3. **Beispiele nutzen**: Zeigen Sie dem Modell, was Sie wollen, mit Beispielen
4. **Iterieren**: Prompts anhand erster Ergebnisse verfeinern

**🧪 Test-Szenarien:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testergebnisse](../../../../translated_images/de/result.1dfcf211fb359cf6.webp)

### 🏆 Herausforderungsübung: Modellleistungsvergleich

**🎯 Ziel**: Verschiedene Modelle mit identischen Prompts vergleichen, um ihre Stärken zu verstehen

**📋 Anleitung:**
1. Fügen Sie **Phi-4-mini** Ihrem Workspace hinzu
2. Verwenden Sie denselben Prompt für GPT-4.1 und Phi-4-mini

![set](../../../../translated_images/de/set.88132df189ecde2c.webp)

3. Vergleichen Sie Antwortqualität, Geschwindigkeit und Genauigkeit
4. Dokumentieren Sie Ihre Ergebnisse im Ergebnisbereich

![Modellvergleich](../../../../translated_images/de/compare.97746cd0f9074955.webp)

**💡 Wichtige Erkenntnisse:**
- Wann LLM vs. SLM einsetzen
- Kosten- und Leistungsabwägungen
- Spezialisierte Fähigkeiten verschiedener Modelle

## 🤖 Praktische Übung 2: Eigene Agenten mit dem Agent Builder erstellen

**🎯 Ziel**: Spezialisierte KI-Agenten für bestimmte Aufgaben und Workflows entwickeln

### 🏗️ Schritt 1: Agent Builder verstehen

Der Agent Builder ist die Kernstärke des Microsoft Foundry Toolkits. Er ermöglicht die Erstellung maßgeschneiderter KI-Assistenten, die die Leistung großer Sprachmodelle mit spezifischen Anweisungen, Parametern und Fachwissen kombinieren.

**🧠 Komponenten der Agentenarchitektur:**
- **Core Model**: Das Basis-LLM (GPT-4, Groks, Phi usw.)
- **System-Prompt**: Definiert Persönlichkeit und Verhalten des Agenten
- **Parameter**: Feinjustierung für optimale Leistung
- **Werkzeugintegration**: Anbindung an externe APIs und MCP-Dienste
- **Speicher**: Gesprächskontext und Sitzungsbeständigkeit

![Agent Builder Interface](../../../../translated_images/de/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Schritt 2: Gründliche Agentenkonfiguration

**🎨 Effektive System-Prompts erstellen:**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*Natürlich können Sie auch Generate System Prompt nutzen, um AI beim Erstellen und Optimieren von Prompts zu unterstützen*

**🔧 Parameteroptimierung:**
| Parameter | Empfohlener Bereich | Anwendungsfall |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | Technische/faktische Antworten |
| **Temperature** | 0.7-0.9 | Kreative/Brainstorming-Aufgaben |
| **Max Tokens** | 500-1000 | Knackige Antworten |
| **Max Tokens** | 2000-4000 | Ausführliche Erklärungen |

### 🐍 Schritt 3: Praxisübung – Python-Programmierungsagent

**🎯 Mission**: Einen spezialisierten Python-Coding-Assistenten erstellen

**📋 Konfigurationsschritte:**

1. **Modellauswahl**: Wählen Sie **Claude 3.5 Sonnet** (exzellent für Code)

2. **System Prompt Design**:
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```

3. **Parameter-Konfiguration**:
   - Temperature: 0.2 (für konsistenten, zuverlässigen Code)
   - Max Tokens: 2000 (ausführliche Erklärungen)
   - Top-p: 0.9 (ausgewogene Kreativität)

![Python Agentenkonfiguration](../../../../translated_images/de/pythonagent.5e51b406401c165f.webp)

### 🧪 Schritt 4: Ihren Python-Agenten testen

**Testszenarien:**
1. **Basiskfunktion**: "Erstelle eine Funktion zum Finden von Primzahlen"
2. **Komplexer Algorithmus**: "Implementiere einen binären Suchbaum mit Einfügen, Löschen und Suchen"
3. **Praxisproblem**: "Baue einen Web-Scraper, der Rate Limiting und Wiederholungen berücksichtigt"
4. **Fehlerbehebung**: "Behebe diesen Code [buggy code einfügen]"

**🏆 Erfolgskriterien:**
- ✅ Code läuft fehlerfrei
- ✅ Enthält aussagekräftige Dokumentation
- ✅ Hält sich an Python Best Practices
- ✅ Bietet klare Erklärungen
- ✅ Schlägt Verbesserungen vor

## 🎓 Abschluss Modul 1 & nächste Schritte

### 📊 Wissenscheck

Testen Sie Ihr Verständnis:
- [ ] Können Sie den Unterschied zwischen Modellen im Katalog erklären?
- [ ] Haben Sie erfolgreich einen eigenen Agenten erstellt und getestet?
- [ ] Verstehen Sie, wie Parameter für verschiedene Anwendungsfälle optimiert werden?
- [ ] Können Sie effektive System-Prompts entwerfen?

### 📚 Zusätzliche Ressourcen

- **Microsoft Foundry Toolkit Dokumentation**: [Offizielle Microsoft Docs](https://github.com/microsoft/vscode-ai-toolkit)
- **Prompt Engineering Guide**: [Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modelle im Microsoft Foundry Toolkit**: [Modelle in Entwicklung](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Herzlichen Glückwunsch!** Sie haben die Grundlagen des Microsoft Foundry Toolkits gemeistert und sind bereit, fortgeschrittene KI-Anwendungen zu entwickeln!

### 🔜 Weiter zum nächsten Modul

Bereit für fortgeschrittene Funktionen? Fahren Sie fort zu **[Modul 2: MCP mit Microsoft Foundry Toolkit Grundlagen](../lab2/README.md)**, wo Sie lernen, wie Sie:
- Ihre Agenten mit externen Tools über das Model Context Protocol (MCP) verbinden
- Browser-Automatisierungsagenten mit Playwright erstellen
- MCP-Server mit Ihren Microsoft Foundry Toolkit-Agenten integrieren
- Ihre Agenten mit externen Daten und Fähigkeiten aufladen

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->