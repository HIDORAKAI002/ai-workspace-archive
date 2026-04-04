# Einrichtung beliebter MCP-Host-Clients

Dieses Handbuch beschreibt, wie man MCP-Server mit beliebten KI-Host-Anwendungen konfiguriert und verwendet. Jeder Host hat seinen eigenen Konfigurationsansatz, aber sobald er eingerichtet ist, kommunizieren sie alle mit MCP-Servern über das standardisierte Protokoll.

## Was ist ein MCP-Host?

Ein **MCP-Host** ist eine KI-Anwendung, die sich mit MCP-Servern verbinden kann, um ihre Funktionen zu erweitern. Man kann es sich als die "Benutzeroberfläche" vorstellen, mit der Nutzer interagieren, während MCP-Server die "Backend"-Werkzeuge und Daten bereitstellen.

```mermaid
flowchart LR
    User[👤 Benutzer] --> Host[🖥️ MCP Host]
    Host --> S1[MCP Server A]
    Host --> S2[MCP Server B]
    Host --> S3[MCP Server C]
    
    subgraph "Beliebte Hosts"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Voraussetzungen

- Ein MCP-Server, mit dem eine Verbindung hergestellt werden kann (siehe [Modul 3.1 - Erster Server](../01-first-server/README.md))
- Die Host-Anwendung auf Ihrem System installiert
- Grundkenntnisse im Umgang mit JSON-Konfigurationsdateien

---

## 1. Claude Desktop

**Claude Desktop** ist die offizielle Desktop-Anwendung von Anthropic, die MCP nativ unterstützt.

### Installation

1. Laden Sie Claude Desktop von [claude.ai/download](https://claude.ai/download) herunter
2. Installieren Sie es und melden Sie sich mit Ihrem Anthropic-Konto an

### Konfiguration

Claude Desktop verwendet eine JSON-Konfigurationsdatei zur Definition von MCP-Servern.

**Speicherort der Konfigurationsdatei:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Beispielkonfiguration:**

```json
{
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"],
      "env": {
        "PYTHONPATH": "/path/to/your/server"
      }
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-server/build/index.js"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

### Konfigurationsoptionen

| Feld | Beschreibung | Beispiel |
|-------|-------------|---------|
| `command` | Das auszuführende Programm | `"python"`, `"node"`, `"npx"` |
| `args` | Befehlszeilenargumente | `["-m", "my_server"]` |
| `env` | Umgebungsvariablen | `{"API_KEY": "xxx"}` |
| `cwd` | Arbeitsverzeichnis | `"/path/to/server"` |

### Testen Ihrer Einrichtung

1. Speichern Sie die Konfigurationsdatei
2. Starten Sie Claude Desktop vollständig neu (beenden und erneut öffnen)
3. Öffnen Sie eine neue Unterhaltung
4. Suchen Sie nach dem 🔌 Icon, das verbundene Server anzeigt
5. Versuchen Sie, Claude zu bitten, eines Ihrer Tools zu verwenden

### Fehlerbehebung bei Claude Desktop

**Server wird nicht angezeigt:**
- Prüfen Sie die Syntax der Konfigurationsdatei mit einem JSON-Validator
- Stellen Sie sicher, dass der Pfad zum Programm korrekt ist
- Prüfen Sie die Claude Desktop-Logs: Hilfe → Logs anzeigen

**Server stürzt beim Start ab:**
- Testen Sie Ihren Server zunächst manuell im Terminal
- Überprüfen Sie, dass Umgebungsvariablen korrekt gesetzt sind
- Stellen Sie sicher, dass alle Abhängigkeiten installiert sind

---

## 2. VS Code mit GitHub Copilot

VS Code unterstützt MCP über GitHub Copilot Chat-Erweiterungen.

### Voraussetzungen

1. VS Code 1.99+ installiert
2. GitHub Copilot-Erweiterung installiert
3. GitHub Copilot Chat-Erweiterung installiert

### Konfiguration

VS Code verwendet `.vscode/mcp.json` im Arbeitsbereich oder in den Benutzereinstellungen.

**Arbeitsbereich-Konfiguration** (`.vscode/mcp.json`):

```json
{
  "servers": {
    "my-calculator": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    },
    "my-database": {
      "type": "sse",
      "url": "http://localhost:8080/sse"
    }
  }
}
```

**Benutzereinstellungen** (`settings.json`):

```json
{
  "mcp.servers": {
    "global-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-memory"]
    }
  },
  "mcp.enableLogging": true
}
```

### Verwendung von MCP in VS Code

1. Öffnen Sie das Copilot Chat-Panel (Strg+Shift+I / Cmd+Shift+I)
2. Tippen Sie `@` ein, um verfügbare MCP-Tools zu sehen
3. Verwenden Sie natürliche Sprache, um Tools aufzurufen: "Berechne 25 * 48 mit dem Taschenrechner"

### Fehlerbehebung bei VS Code

**MCP-Server werden nicht geladen:**
- Prüfen Sie das Ausgabe-Panel → "MCP" auf Fehlermeldungen
- Fenster neu laden: Strg+Shift+P → "Entwickler: Fenster neu laden"
- Stellen Sie sicher, dass der Server eigenständig läuft

---

## 3. Cursor

**Cursor** ist ein KI-fokussierter Code-Editor mit integrierter MCP-Unterstützung.

### Installation

1. Laden Sie Cursor von [cursor.sh](https://cursor.sh) herunter
2. Installieren und melden Sie sich an

### Konfiguration

Cursor verwendet ein ähnliches Konfigurationsformat wie Claude Desktop.

**Speicherort der Konfigurationsdatei:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Beispielkonfiguration:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### Verwendung von MCP in Cursor

1. Öffnen Sie den KI-Chat von Cursor (Strg+L / Cmd+L)
2. MCP-Tools erscheinen automatisch in den Vorschlägen
3. Bitten Sie die KI, Aufgaben mit verbundenen Servern auszuführen

---

## 4. Cline (Terminal-basiert)

**Cline** ist ein terminalbasierter MCP-Client, ideal für Kommandozeilen-Workflows.

### Installation

```bash
npm install -g @anthropic/cline
```

### Konfiguration

Cline verwendet Umgebungsvariablen und Befehlszeilenargumente.

**Verwendung von Umgebungsvariablen:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Verwendung von Befehlszeilenargumenten:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Konfigurationsdatei** (`~/.clinerc`):

```json
{
  "apiKey": "your-api-key",
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    }
  }
}
```

### Verwendung von Cline

```bash
# Starten Sie eine interaktive Sitzung
cline

# Einzelne Abfrage mit MCP
cline "Calculate the square root of 144 using the calculator"

# Liste der verfügbaren Werkzeuge
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** ist ein weiterer KI-gestützter Code-Editor mit MCP-Unterstützung.

### Installation

1. Laden Sie Windsurf von [codeium.com/windsurf](https://codeium.com/windsurf) herunter
2. Installieren Sie es und erstellen Sie ein Konto

### Konfiguration

Die Windsurf-Konfiguration wird über die Einstellungsoberfläche verwaltet:

1. Öffnen Sie Einstellungen (Strg+, / Cmd+,)
2. Suchen Sie nach "MCP"
3. Klicken Sie auf "In settings.json bearbeiten"

**Beispielkonfiguration:**

```json
{
  "windsurf.mcp.servers": {
    "my-tools": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {}
    }
  },
  "windsurf.mcp.enabled": true
}
```

---

## Vergleich der Übertragungsarten

Verschiedene Hosts unterstützen unterschiedliche Transportmechanismen:

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (Standard-Ein-/Ausgabe): Am besten für lokal gestartete Server vom Host
**SSE/HTTP**: Am besten für entfernte Server oder Server, die von mehreren Clients gemeinsam genutzt werden

---

## Häufige Fehlerbehebung

### Server startet nicht

1. **Testen Sie den Server zuerst manuell:**
   ```bash
   # Für Python
   python -m your_server_module
   
   # Für Node.js
   node /path/to/server/index.js
   ```

2. **Prüfen Sie den Befehlspfad:**
   - Verwenden Sie möglichst absolute Pfade
   - Stellen Sie sicher, dass das ausführbare Programm in Ihrem PATH ist

3. **Überprüfen Sie Abhängigkeiten:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Server verbindet sich, Tools funktionieren aber nicht

1. **Prüfen Sie die Server-Logs** – die meisten Hosts bieten Protokollierungsoptionen
2. **Überprüfen Sie die Tool-Registrierung** – mit MCP Inspector testen
3. **Prüfen Sie Berechtigungen** – manche Tools benötigen Datei-/Netzwerkzugriff

### Umgebungsvariablen werden nicht übergeben

- Manche Hosts bereinigen Umgebungsvariablen
- Verwenden Sie explizit das `env`-Konfigurationsfeld
- Vermeiden Sie sensible Daten in Konfigurationsdateien (verwenden Sie Geheimnisverwaltung)

---

## Sicherheits-Best Practices

1. **API-Schlüssel niemals in Konfigurationsdateien speichern**
2. **Verwenden Sie Umgebungsvariablen für sensible Daten**
3. **Beschränken Sie Server-Berechtigungen auf das Notwendige**
4. **Überprüfen Sie Servercode, bevor Sie Zugriff auf Ihr System gewähren**
5. **Verwenden Sie Allowlists für Datei- und Netzwerkzugriff**

---

## Was kommt als Nächstes

- [3.13 - Debugging mit MCP Inspector](../13-mcp-inspector/README.md)
- [3.1 - Erstellen Sie Ihren ersten MCP-Server](../01-first-server/README.md)
- [Modul 5 - Fortgeschrittene Themen](../../05-AdvancedTopics/README.md)

---

## Zusätzliche Ressourcen

- [Claude Desktop MCP-Dokumentation](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [VS Code MCP-Erweiterung](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [MCP-Spezifikation - Transports](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Offizielles MCP-Servers-Register](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir um Genauigkeit bemüht sind, möchten wir darauf hinweisen, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in der Ursprungssprache gilt als maßgebliche Quelle. Für wichtige Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Nutzung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->