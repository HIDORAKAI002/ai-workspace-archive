# 🔧 Modul 3: Fortgeschrittene MCP-Entwicklung mit Microsoft Foundry Toolkit

![Dauer](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 Lernziele

Am Ende dieses Labs wirst du in der Lage sein:

- ✅ Eigene MCP-Server mit dem Microsoft Foundry Toolkit zu erstellen
- ✅ Das aktuelle MCP Python SDK (v1.9.3) zu konfigurieren und zu verwenden
- ✅ Den MCP Inspector für Debugging einzurichten und zu nutzen
- ✅ MCP-Server sowohl im Agent Builder als auch im Inspector zu debuggen
- ✅ Fortgeschrittene Entwicklungs-Workflows für MCP-Server zu verstehen

## 📋 Voraussetzungen

- Abschluss von Lab 2 (MCP Grundlagen)
- VS Code mit installiertem Microsoft Foundry Toolkit Extension
- Python 3.10+ Umgebung
- Node.js und npm für die Einrichtung des Inspectors

## 🏗️ Was du bauen wirst

In diesem Lab erstellst du einen **Weather MCP Server**, der zeigt:
- Eigene MCP-Server-Implementierung
- Integration mit dem Microsoft Foundry Toolkit Agent Builder
- Professionelle Debugging-Workflows
- Moderne MCP SDK-Nutzung

---

## 🔧 Übersicht der Kernkomponenten

### 🐍 MCP Python SDK
Das Model Context Protocol Python SDK bildet die Grundlage zum Erstellen eigener MCP-Server. Du nutzt Version 1.9.3 mit erweiterten Debugging-Fähigkeiten.

### 🔍 MCP Inspector
Ein leistungsstarkes Debugging-Tool, das bietet:
- Echtzeit-Serverüberwachung
- Visualisierung der Toolausführung
- Inspektion von Netzwerk-Anfragen/-Antworten
- Interaktive Testumgebung

---

## 📖 Schritt-für-Schritt Umsetzung

### Schritt 1: Erstelle einen WeatherAgent im Agent Builder

1. **Starte Agent Builder** in VS Code über die Microsoft Foundry Toolkit-Erweiterung
2. **Erstelle einen neuen Agenten** mit folgender Konfiguration:
   - Agentenname: `WeatherAgent`

![Agentenerstellung](../../../../translated_images/de/Agent.c9c33f6a412b4cde.webp)

### Schritt 2: Initialisiere das MCP Server Projekt

1. **Gehe zu Tools** → **Add Tool** im Agent Builder
2. **Wähle „MCP Server“** aus den verfügbaren Optionen
3. **Wähle „Create A new MCP Server“**
4. **Wähle die Vorlage `python-weather`**
5. **Benenne deinen Server:** `weather_mcp`

![Python Template Auswahl](../../../../translated_images/de/Pythontemplate.9d0a2913c6491500.webp)

### Schritt 3: Öffne und untersuche das Projekt

1. **Öffne das erzeugte Projekt** in VS Code
2. **Überprüfe die Projektstruktur:**
   ```
   weather_mcp/
   ├── src/
   │   ├── __init__.py
   │   └── server.py
   ├── inspector/
   │   ├── package.json
   │   └── package-lock.json
   ├── .vscode/
   │   ├── launch.json
   │   └── tasks.json
   ├── pyproject.toml
   └── README.md
   ```

### Schritt 4: Update auf das neueste MCP SDK

> **🔍 Warum aktualisieren?** Wir wollen das aktuelle MCP SDK (v1.9.3) und den Inspector Service (0.14.0) für erweiterte Funktionen und besseres Debugging nutzen.

#### 4a. Python-Abhängigkeiten aktualisieren

**Bearbeite `pyproject.toml`:** update [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4b. Inspector Konfiguration aktualisieren

**Bearbeite `inspector/package.json`:** update [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. Inspector Abhängigkeiten aktualisieren

**Bearbeite `inspector/package-lock.json`:** update [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 Hinweis:** Diese Datei enthält umfangreiche Abhängigkeitsdefinitionen. Nachfolgend die wesentliche Struktur – der vollständige Inhalt stellt eine korrekte Abhängigkeitsauflösung sicher.


> **⚡ Vollständige Package Lock:** Die komplette package-lock.json enthält ca. 3000 Zeilen Abhängigkeitsdefinitionen. Oben ist die Hauptstruktur gezeigt – für vollständige Auflösung nutze die bereitgestellte Datei.

### Schritt 5: VS Code Debugging konfigurieren

*Hinweis: Bitte kopiere die Datei im angegebenen Pfad, um die jeweilige lokale Datei zu ersetzen*

#### 5a. Launch-Konfiguration aktualisieren

**Bearbeite `.vscode/launch.json`:**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to Local MCP",
      "type": "debugpy",
      "request": "attach",
      "connect": {
        "host": "localhost",
        "port": 5678
      },
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen",
      "postDebugTask": "Terminate All Tasks"
    },
    {
      "name": "Launch Inspector (Edge)",
      "type": "msedge",
      "request": "launch",
      "url": "http://localhost:6274?timeout=60000&serverUrl=http://localhost:3001/sse#tools",
      "cascadeTerminateToConfigurations": [
        "Attach to Local MCP"
      ],
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Launch Inspector (Chrome)",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:6274?timeout=60000&serverUrl=http://localhost:3001/sse#tools",
      "cascadeTerminateToConfigurations": [
        "Attach to Local MCP"
      ],
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen"
    }
  ],
  "compounds": [
    {
      "name": "Debug in Agent Builder",
      "configurations": [
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Open Agent Builder",
    },
    {
      "name": "Debug in Inspector (Edge)",
      "configurations": [
        "Launch Inspector (Edge)",
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Start MCP Inspector",
      "stopAll": true
    },
    {
      "name": "Debug in Inspector (Chrome)",
      "configurations": [
        "Launch Inspector (Chrome)",
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Start MCP Inspector",
      "stopAll": true
    }
  ]
}
```

**Bearbeite `.vscode/tasks.json`:**

```
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Server",
      "type": "shell",
      "command": "python -m debugpy --listen 127.0.0.1:5678 src/__init__.py sse",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}",
        "env": {
          "PORT": "3001"
        }
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^.*$",
            "file": 0,
            "location": 1,
            "message": 2
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": ".*",
          "endsPattern": "Application startup complete|running"
        }
      }
    },
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npm run dev:inspector",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}/inspector",
        "env": {
          "CLIENT_PORT": "6274",
          "SERVER_PORT": "6277",
        }
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^.*$",
            "file": 0,
            "location": 1,
            "message": 2
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Starting MCP inspector",
          "endsPattern": "Proxy server listening on port"
        }
      },
      "dependsOn": [
        "Start MCP Server"
      ]
    },
    {
      "label": "Open Agent Builder",
      "type": "shell",
      "command": "echo ${input:openAgentBuilder}",
      "presentation": {
        "reveal": "never"
      },
      "dependsOn": [
        "Start MCP Server"
      ],
    },
    {
      "label": "Terminate All Tasks",
      "command": "echo ${input:terminate}",
      "type": "shell",
      "problemMatcher": []
    }
  ],
  "inputs": [
    {
      "id": "openAgentBuilder",
      "type": "command",
      "command": "ai-mlstudio.agentBuilder",
      "args": {
        "initialMCPs": [ "local-server-weather_mcp" ],
        "triggeredFrom": "vsc-tasks"
      }
    },
    {
      "id": "terminate",
      "type": "command",
      "command": "workbench.action.tasks.terminate",
      "args": "terminateAll"
    }
  ]
}
```


---

## 🚀 Deinen MCP Server starten und testen

### Schritt 6: Abhängigkeiten installieren

Nach den Konfigurationsänderungen führe folgende Befehle aus:

**Python-Abhängigkeiten installieren:**
```bash
uv sync
```

**Inspector-Abhängigkeiten installieren:**
```bash
cd inspector
npm install
```

### Schritt 7: Debuggen mit Agent Builder

1. **Drücke F5** oder verwende die **"Debug in Agent Builder"** Konfiguration
2. **Wähle die zusammengesetzte Konfiguration** im Debug-Panel aus
3. **Warte, bis der Server gestartet ist** und der Agent Builder geöffnet wird
4. **Teste deinen Weather MCP Server** mit natürlichsprachigen Abfragen

Eingabeaufforderung so:

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Ergebnis](../../../../translated_images/de/Result.6ac570f7d2b1d538.webp)

### Schritt 8: Debuggen mit MCP Inspector

1. **Nutze die "Debug in Inspector"** Konfiguration (Edge oder Chrome)
2. **Öffne die Inspector-Oberfläche** unter `http://localhost:6274`
3. **Erkunde die interaktive Testumgebung:**
   - Verfügbare Tools ansehen
   - Tool-Ausführung testen
   - Netzwerk-Anfragen überwachen
   - Serverantworten debuggen

![MCP Inspector Oberfläche](../../../../translated_images/de/Inspector.5672415cd02fe873.webp)

---

## 🎯 Zentrale Lernergebnisse

Durch den Abschluss dieses Labs hast du:

- [x] **Einen eigenen MCP-Server** mit Microsoft Foundry Toolkit Vorlagen erstellt
- [x] **Auf das neueste MCP SDK** (v1.9.3) für erweiterte Funktionen aktualisiert
- [x] **Professionelle Debugging-Workflows** für Agent Builder und Inspector konfiguriert
- [x] **Den MCP Inspector** für interaktive Server-Tests eingerichtet
- [x] **VS Code Debugging-Konfigurationen** für MCP-Entwicklung gemeistert

## 🔧 Erkannte erweiterte Funktionen

| Funktion | Beschreibung | Anwendungsfall |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | Neueste Protokoll-Implementierung | Moderne Serverentwicklung |
| **MCP Inspector 0.14.0** | Interaktives Debugging-Tool | Echtzeit-Servertests |
| **VS Code Debugging** | Integrierte Entwicklungsumgebung | Professioneller Debugging-Workflow |
| **Agent Builder Integration** | Direkte Microsoft Foundry Toolkit Verbindung | End-to-End Agent-Tests |

## 📚 Zusätzliche Ressourcen

- [MCP Python SDK Dokumentation](https://modelcontextprotocol.io/docs/sdk/python)
- [Microsoft Foundry Toolkit Extension Anleitung](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code Debugging Dokumentation](https://code.visualstudio.com/docs/editor/debugging)
- [Model Context Protocol Spezifikation](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 Glückwunsch!** Du hast Lab 3 erfolgreich abgeschlossen und kannst nun eigene MCP-Server mit professionellen Entwicklungs-Workflows erstellen, debuggen und bereitstellen.

### 🔜 Weiter zum nächsten Modul

Bereit, deine MCP-Fähigkeiten in einem realen Entwicklungs-Workflow anzuwenden? Mache weiter mit **[Modul 4: Praktische MCP-Entwicklung – Eigener GitHub Clone Server](../lab4/README.md)**, wo du:
- Einen produktionsreifen MCP-Server baust, der GitHub Repository-Operationen automatisiert
- Funktionalität zum Klonen von GitHub-Repositories über MCP implementierst
- Eigene MCP-Server mit VS Code und GitHub Copilot Agent Mode integrierst
- Eigene MCP-Server in Produktionsumgebungen testest und ausrollst
- Praktische Workflow-Automatisierung für Entwickler erlernst

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->