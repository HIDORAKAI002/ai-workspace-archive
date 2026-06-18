# 🐙 Modul 4: Praktische MCP-Entwicklung – Benutzerdefinierter GitHub-Clone-Server

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Schnellstart:** Erstellen Sie in nur 30 Minuten einen produktionsreifen MCP-Server, der das Klonen von GitHub-Repositories und die VS Code-Integration automatisiert!

## 🎯 Lernziele

Am Ende dieses Labs werden Sie in der Lage sein:

- ✅ Einen benutzerdefinierten MCP-Server für reale Entwicklungs-Workflows zu erstellen
- ✅ GitHub-Repository-Klonfunktionalität über MCP zu implementieren
- ✅ Benutzerdefinierte MCP-Server mit VS Code und Agent Builder zu integrieren
- ✅ Den GitHub Copilot Agent Mode mit benutzerdefinierten MCP-Tools zu verwenden
- ✅ Benutzerdefinierte MCP-Server in Produktionsumgebungen zu testen und bereitzustellen

## 📋 Voraussetzungen

- Abschluss der Labs 1–3 (MCP-Grundlagen und fortgeschrittene Entwicklung)
- GitHub Copilot-Abonnement ([kostenlose Anmeldung verfügbar](https://github.com/github-copilot/signup))
- VS Code mit Microsoft Foundry Toolkit- und GitHub Copilot-Erweiterungen
- Git-CLI installiert und konfiguriert

## 🏗️ Projektübersicht

### **Reale Entwicklungsherausforderung**
Als Entwickler verwenden wir häufig GitHub, um Repositories zu klonen und in VS Code oder VS Code Insiders zu öffnen. Dieser manuelle Prozess umfasst:
1. Öffnen des Terminals/der Eingabeaufforderung
2. Navigieren zum gewünschten Verzeichnis
3. Ausführen des Befehls `git clone`
4. Öffnen von VS Code im geklonten Verzeichnis

**Unsere MCP-Lösung fasst dies in einem einzigen intelligenten Befehl zusammen!**

### **Was Sie bauen werden**
Ein **GitHub Clone MCP Server** (`git_mcp_server`), der bietet:

| Funktion | Beschreibung | Vorteil |
|---------|-------------|---------|
| 🔄 **Intelligentes Repository-Klonen** | Klonen von GitHub-Repos mit Validierung | Automatisierte Fehlerüberprüfung |
| 📁 **Intelligente Verzeichnisverwaltung** | Sichere Überprüfung und Erstellung von Verzeichnissen | Verhindert Überschreiben |
| 🚀 **Plattformübergreifende VS Code-Integration** | Öffnet Projekte in VS Code/Insiders | Nahtloser Workflow-Wechsel |
| 🛡️ **Robuste Fehlerbehandlung** | Umgang mit Netzwerk-, Berechtigungs- und Pfadproblemen | Produktionsreife Zuverlässigkeit |

---

## 📖 Schritt-für-Schritt-Implementierung

### Schritt 1: Erstellen Sie den GitHub-Agenten im Agent Builder

1. **Starten Sie den Agent Builder** über die Microsoft Foundry Toolkit-Erweiterung
2. **Erstellen Sie einen neuen Agenten** mit der folgenden Konfiguration:
   ```
   Agent Name: GitHubAgent
   ```

3. **Initialisieren Sie den benutzerdefinierten MCP-Server:**
   - Navigieren Sie zu **Werkzeuge** → **Werkzeug hinzufügen** → **MCP Server**
   - Wählen Sie **"Einen neuen MCP-Server erstellen"**
   - Wählen Sie die **Python-Vorlage** für maximale Flexibilität
   - **Servername:** `git_mcp_server`

### Schritt 2: Konfigurieren Sie den GitHub Copilot Agent Mode

1. **Öffnen Sie GitHub Copilot** in VS Code (Strg/Cmd + Shift + P → „GitHub Copilot: Öffnen“)
2. **Wählen Sie das Agent-Modell** in der Copilot-Oberfläche
3. **Wählen Sie das Claude 3.7 Modell** für erweiterte Reasoning-Fähigkeiten
4. **Aktivieren Sie die MCP-Integration** für den Werkzeugzugriff

> **💡 Profi-Tipp:** Claude 3.7 bietet ein überlegenes Verständnis von Entwicklungs-Workflows und Fehlerbehandlungsmustern.

### Schritt 3: Implementieren Sie die Kernfunktionalität des MCP-Servers

**Verwenden Sie das folgende detaillierte Prompt mit dem GitHub Copilot Agent Mode:**

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```

### Schritt 4: Testen Sie Ihren MCP-Server

#### 4a. Test im Agent Builder

1. **Starten Sie die Debug-Konfiguration** für den Agent Builder
2. **Konfigurieren Sie Ihren Agenten mit folgendem System-Prompt:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Testen Sie mit realistischen Benutzerszenarien:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/de/DebugAgent.81d152370c503241.webp)

**Erwartete Ergebnisse:**
- ✅ Erfolgreiches Klonen mit Pfadbestätigung
- ✅ Automatischer Start von VS Code
- ✅ Klare Fehlermeldungen bei ungültigen Szenarien
- ✅ Korrekte Behandlung von Grenzfällen

#### 4b. Test im MCP Inspector


![MCP Inspector Testing](../../../../translated_images/de/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Herzlichen Glückwunsch!** Sie haben erfolgreich einen praktischen, produktionsreifen MCP-Server erstellt, der reale Entwicklungs-Workflow-Herausforderungen löst. Ihr benutzerdefinierter GitHub-Clone-Server demonstriert die Leistungsfähigkeit von MCP zur Automatisierung und Verbesserung der Entwicklerproduktivität.

### 🏆 Errungenschaft freigeschaltet:
- ✅ **MCP-Entwickler** – Benutzerdefinierter MCP-Server erstellt
- ✅ **Workflow-Automatisierer** – Entwicklungsprozesse optimiert  
- ✅ **Integrations-Experte** – Mehrere Entwicklungstools verbunden
- ✅ **Produktionsbereit** – Bereitstellbare Lösungen entwickelt

---

## 🎓 Workshop-Abschluss: Ihre Reise mit Model Context Protocol

**Liebe Workshop-Teilnehmerin, lieber Workshop-Teilnehmer,**

herzlichen Glückwunsch zum Abschluss aller vier Module des Model Context Protocol Workshops! Sie haben einen weiten Weg von den Grundlagen des Microsoft Foundry Toolkits bis hin zum Bau produktionsreifer MCP-Server zurückgelegt, die reale Entwicklungsprobleme lösen.

### 🚀 Rückblick auf Ihren Lernpfad:

**[Modul 1](../lab1/README.md)**: Sie haben mit den Grundlagen des Microsoft Foundry Toolkits, dem Testen von Modellen und der Erstellung Ihres ersten KI-Agenten begonnen.

**[Modul 2](../lab2/README.md)**: Sie haben die MCP-Architektur kennengelernt, Playwright MCP integriert und Ihren ersten Browser-Automatisierungsagenten gebaut.

**[Modul 3](../lab3/README.md)**: Sie sind in die benutzerdefinierte MCP-Server-Entwicklung mit dem Weather MCP Server eingestiegen und haben Debugging-Tools gemeistert.

**[Modul 4](../lab4/README.md)**: Nun haben Sie all das angewandt, um ein praktisches Automatisierungstool für GitHub-Repository-Workflows zu erstellen.

### 🌟 Was Sie gemeistert haben:

- ✅ **Microsoft Foundry Toolkit-Ökosystem**: Modelle, Agenten und Integrationsmuster
- ✅ **MCP-Architektur**: Client-Server-Design, Transportprotokolle und Sicherheit
- ✅ **Entwicklertools**: Vom Playground über Inspector bis zur Produktionsbereitstellung
- ✅ **Benutzerdefinierte Entwicklung**: Erstellen, Testen und Bereitstellen eigener MCP-Server
- ✅ **Praxisanwendungen**: Lösung realer Workflow-Herausforderungen mit KI

### 🔮 Ihre nächsten Schritte:

1. **Erstellen Sie Ihren eigenen MCP-Server**: Wenden Sie das Gelernte an, um Ihre individuellen Workflows zu automatisieren
2. **Treten Sie der MCP-Community bei**: Teilen Sie Ihre Kreationen und lernen Sie von anderen
3. **Erkunden Sie erweiterte Integrationen**: Verbinden Sie MCP-Server mit Unternehmenssystemen
4. **Engagieren Sie sich im Open Source**: Helfen Sie mit, MCP-Tools und Dokumentation zu verbessern

Denken Sie daran: Dieser Workshop ist erst der Anfang. Das Model Context Protocol-Ökosystem entwickelt sich schnell weiter, und Sie sind nun bestens gerüstet, um an der Spitze KI-gestützter Entwicklungstools zu stehen.

**Vielen Dank für Ihre Teilnahme und Ihr Engagement beim Lernen!**

Wir hoffen, dieser Workshop hat Ideen geweckt, die Ihre Art und Weise, KI-Tools in Ihrem Entwicklungsprozess zu nutzen, nachhaltig verändern.

**Viel Erfolg beim Programmieren!**

---

## Wie geht es weiter

Herzlichen Glückwunsch zum Abschluss aller Labs in Modul 10!

- Zurück zu: [Modul 10 Übersicht](../README.md)
- Weiter zu: [Modul 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->