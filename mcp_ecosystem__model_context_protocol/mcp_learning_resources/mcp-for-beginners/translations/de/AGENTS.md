# AGENTS.md

## Projektübersicht

**MCP für Einsteiger** ist ein Open-Source-Bildungsprogramm zum Erlernen des Model Context Protocol (MCP) – einem standardisierten Rahmenwerk für Interaktionen zwischen KI-Modellen und Client-Anwendungen. Dieses Repository bietet umfassende Lernmaterialien mit praktischen Codebeispielen in mehreren Programmiersprachen.

### Schlüsseltechnologien

- **Programmiersprachen**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Frameworks & SDKs**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Datenbanken**: PostgreSQL mit pgvector-Erweiterung
- **Cloud-Plattformen**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Build-Tools**: npm, Maven, pip, Cargo
- **Dokumentation**: Markdown mit automatisierter mehrsprachiger Übersetzung (48+ Sprachen)

### Architektur

- **11 Kernmodule (00-11)**: Sequenzieller Lernpfad von Grundlagen bis zu fortgeschrittenen Themen
- **Hands-on Labs**: Praktische Übungen mit vollständigem Lösungscode in mehreren Sprachen
- **Beispielprojekte**: Funktionierende MCP-Server- und Client-Implementierungen
- **Übersetzungssystem**: Automatisierter GitHub Actions-Workflow für Mehrsprachen-Unterstützung
- **Bildmaterialien**: Zentralisiertes Bilderverzeichnis mit übersetzten Versionen

## Setup-Befehle

Dies ist ein aufs Dokumentieren fokussiertes Repository. Die meiste Einrichtung erfolgt innerhalb der einzelnen Beispielprojekte und Labs.

### Repository Setup

```bash
# Klonen Sie das Repository
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Arbeit mit Beispielprojekten

Beispielprojekte befinden sich in:
- `03-GettingStarted/samples/` – Sprachspezifische Beispiele
- `03-GettingStarted/01-first-server/solution/` – Erste Server-Implementierungen
- `03-GettingStarted/02-client/solution/` – Client-Implementierungen
- `11-MCPServerHandsOnLabs/` – Umfangreiche Datenbank-Integrations-Labs

Jedes Beispielprojekt enthält eigene Setup-Anweisungen:

#### TypeScript/JavaScript Projekte
```bash
cd <project-directory>
npm install
npm start
```

#### Python Projekte
```bash
cd <project-directory>
pip install -r requirements.txt
# oder
pip install -e .
python main.py
```

#### Java Projekte
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Entwicklungsablauf

### Dokumentationsstruktur

- **Module 00-11**: Kerncurriculum-Inhalte in sequenzieller Reihenfolge
- **translations/**: Sprachspezifische Versionen (automatisch generiert, bitte nicht direkt bearbeiten)
- **translated_images/**: Lokalisierte Bildversionen (automatisch generiert)
- **images/**: Quellbilder und Diagramme

### Änderungen an der Dokumentation vornehmen

1. Bearbeiten Sie nur die englischen Markdown-Dateien in den Root-Modulverzeichnissen (00-11)
2. Aktualisieren Sie bei Bedarf Bilder im Verzeichnis `images/`
3. Der GitHub Action co-op-translator generiert automatisch Übersetzungen
4. Übersetzungen werden bei Push in den main-Branch regeneriert

### Umgang mit Übersetzungen

- **Automatisierte Übersetzung**: GitHub Actions Workflow übernimmt alle Übersetzungen
- **Bitte bearbeiten Sie keine Dateien manuell im Verzeichnis `translations/`**
- Übersetzungsmetadaten sind in jeder übersetzten Datei eingebettet
- Unterstützte Sprachen: 48+ Sprachen, darunter Arabisch, Chinesisch, Französisch, Deutsch, Hindi, Japanisch, Koreanisch, Portugiesisch, Russisch, Spanisch und viele mehr

## Testanweisungen

### Validierung der Dokumentation

Da es sich hauptsächlich um ein Dokumentations-Repository handelt, konzentrieren sich die Tests auf:

1. **Link-Validierung**: Sicherstellen, dass alle internen Links funktionieren
```bash
# Überprüfe auf defekte Markdown-Links
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Codebeispiel-Validierung**: Testen, ob Codebeispiele kompilieren/ausführbar sind
```bash
# Navigiere zu einem bestimmten Beispiel und führe dessen Tests aus
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown-Linting**: Überprüfung der Formatierungskonsistenz
```bash
# Verwenden Sie bei Bedarf markdownlint
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Testen der Beispielprojekte

Jedes sprachspezifische Beispiel enthält seinen eigenen Testansatz:

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## Code-Stilrichtlinien

### Dokumentationsstil

- Klar verständliche, anfängerfreundliche Sprache verwenden
- Codebeispiele in mehreren Sprachen wo möglich einbinden
- Markdown-Best-Practices beachten:
  - ATX-Style-Überschriften (`#`-Syntax) verwenden
  - Codeblöcke mit Sprachkennzeichnung nutzen
  - Beschreibenden Alt-Text bei Bildern einfügen
  - Zeilenlängen angemessen halten (kein harter Grenzwert, aber sinnvoll)

### Codebeispiel-Stil

#### TypeScript/JavaScript
- ES-Module verwenden (`import`/`export`)
- TypeScript Strict Mode Konventionen beachten
- Typannotationen einschließen
- Ziel: ES2022

#### Python
- PEP 8 Stilrichtlinien befolgen
- Typ-Hinweise wo angebracht nutzen
- Docstrings für Funktionen und Klassen verwenden
- Moderne Python-Features (3.8+) einsetzen

#### Java
- Spring Boot Konventionen befolgen
- Java 21 Features nutzen
- Standard Maven-Projektstruktur einhalten
- Javadoc-Kommentare hinzufügen

### Dateiorganisation

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## Build und Deployment

### Dokumentations-Deployment

Das Repository verwendet GitHub Pages oder Ähnliches für das Hosting der Dokumentation (falls anwendbar). Änderungen am main-Branch lösen aus:

1. Übersetzungsworkflow (`.github/workflows/co-op-translator.yml`)
2. Automatisierte Übersetzung aller englischen Markdown-Dateien
3. Bildlokalisierung nach Bedarf

### Kein Build-Prozess erforderlich

Dieses Repository enthält hauptsächlich Markdown-Dokumentation. Es ist kein Kompilierungs- oder Build-Schritt für die Kerncurriculum-Inhalte nötig.

### Deployment der Beispielprojekte

Einzelne Beispielprojekte können Deployment-Anweisungen enthalten:
- Siehe `03-GettingStarted/09-deployment/` für MCP-Server-Deployment-Anleitungen
- Azure Container Apps Deployment-Beispiele in `11-MCPServerHandsOnLabs/`

## Beitrag-Richtlinien

### Pull-Request-Prozess

1. **Fork und Klonen**: Forke das Repository und klone deinen Fork lokal
2. **Branch erstellen**: Verwende aussagekräftige Branch-Namen (z.B. `fix/typo-module-3`, `add/python-example`)
3. **Änderungen vornehmen**: Nur englische Markdown-Dateien bearbeiten (keine Übersetzungen)
4. **Lokal testen**: Überprüfen, dass Markdown korrekt gerendert wird
5. **PR einreichen**: Klare PR-Titel und Beschreibungen verwenden
6. **CLA**: Microsoft Contributor License Agreement unterzeichnen, wenn dazu aufgefordert

### PR-Titel-Format

Verwenden Sie klare, beschreibende Titel:
- `[Module XX] Kurze Beschreibung` für module-spezifische Änderungen
- `[Samples] Beschreibung` für Beispielcode-Änderungen
- `[Docs] Beschreibung` für allgemeine Dokumentationsupdates

### Wozu beitragen

- Fehlerbehebungen in Dokumentation oder Codebeispielen
- Neue Codebeispiele in weiteren Sprachen
- Klarstellungen und Verbesserungen bestehender Inhalte
- Neue Fallstudien oder praxisnahe Beispiele
- Issue-Meldungen bei unklaren oder fehlerhaften Inhalten

### Was NICHT zu tun ist

- Keine direkten Bearbeitungen im Verzeichnis `translations/`
- Keine Bearbeitungen im Verzeichnis `translated_images/`
- Keine großen Binärdateien ohne Absprache hinzufügen
- Keine Änderungen an Übersetzungsworkflow-Dateien ohne Koordination

## Zusätzliche Hinweise

### Repository-Wartung

- **Changelog**: Alle wesentlichen Änderungen sind in `changelog.md` dokumentiert
- **Studienführer**: `study_guide.md` für Überblick und Navigation im Curriculum
- **Issue-Vorlagen**: GitHub Issue-Vorlagen für Bug-Reports und Feature-Anfragen verwenden
- **Verhaltensregeln**: Alle Mitwirkenden müssen dem Microsoft Open Source Code of Conduct folgen

### Lernpfad

Folgen Sie den Modulen in sequenzieller Reihenfolge (00-11) für optimale Lernergebnisse:
1. **00-02**: Grundlagen (Einführung, Kernkonzepte, Sicherheit)
2. **03**: Erste Schritte mit praktischer Umsetzung
3. **04-05**: Praktische Umsetzung und fortgeschrittene Themen
4. **06-10**: Community, Best Practices und reale Anwendungen
5. **11**: Umfangreiche Datenbank-Integrations-Labs (13 aufeinanderfolgende Labs)

### Unterstützungsressourcen

- **Dokumentation**: https://modelcontextprotocol.io/
- **Spezifikation**: https://spec.modelcontextprotocol.io/
- **Community**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discord-Server
- **Verwandte Kurse**: Siehe README.md für weitere Microsoft Lernpfade

### Häufige Probleme und Lösungen

**Q: Mein PR schlägt beim Übersetzungscheck fehl**  
A: Stellen Sie sicher, dass Sie nur englische Markdown-Dateien in den Root-Modulverzeichnissen bearbeitet haben, nicht die übersetzten Versionen.

**Q: Wie füge ich eine neue Sprache hinzu?**  
A: Die Sprachunterstützung wird durch den co-op-translator Workflow verwaltet. Öffnen Sie ein Issue, um die Aufnahme neuer Sprachen zu besprechen.

**Q: Codebeispiele funktionieren nicht**  
A: Stellen Sie sicher, dass Sie die Setup-Anweisungen in der README des jeweiligen Beispiels befolgt haben. Prüfen Sie, ob die richtigen Versionen der Abhängigkeiten installiert sind.

**Q: Bilder werden nicht angezeigt**  
A: Überprüfen Sie, ob Bildpfade relativ und mit Vorwärtsslashes angegeben sind. Bilder sollten im Verzeichnis `images/` oder in `translated_images/` für lokalisierte Versionen liegen.

### Performance-Hinweise

- Der Übersetzungsworkflow kann mehrere Minuten dauern
- Große Bilder sollten vor dem Commit optimiert werden
- Halten Sie einzelne Markdown-Dateien fokussiert und angemessen groß
- Verwenden Sie relative Links für bessere Portabilität

### Projekt-Governance

Dieses Projekt folgt Microsoft Open-Source-Praktiken:  
- MIT-Lizenz für Code und Dokumentation  
- Microsoft Open Source Code of Conduct  
- CLA erforderlich für Beiträge  
- Sicherheitsfragen: Folgen Sie den Anweisungen in SECURITY.md  
- Support: Siehe SUPPORT.md für Hilfemöglichkeiten

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->