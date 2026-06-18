# MCP-Server mit stdio-Transport

> **⚠️ Wichtige Aktualisierung**: Ab MCP-Spezifikation 2025-06-18 wurde der eigenständige SSE (Server-Sent Events) Transport **abgekündigt** und durch den "Streamable HTTP"-Transport ersetzt. Die aktuelle MCP-Spezifikation definiert zwei primäre Transportmechanismen:
> 1. **stdio** – Standard Ein-/Ausgabe (empfohlen für lokale Server)
> 2. **Streamable HTTP** – Für entfernte Server, die möglicherweise SSE intern verwenden
>
> Diese Lektion wurde aktualisiert, um sich auf den **stdio-Transport** zu konzentrieren, der für die meisten MCP-Server-Implementierungen empfohlen wird.

Der stdio-Transport ermöglicht es MCP-Servern, mit Clients über Standard-Ein- und -Ausgabeströme zu kommunizieren. Dies ist der am häufigsten verwendete und empfohlene Transportmechanismus in der aktuellen MCP-Spezifikation und bietet eine einfache und effiziente Möglichkeit, MCP-Server zu erstellen, die sich leicht in verschiedene Client-Anwendungen integrieren lassen.

## Überblick

Diese Lektion behandelt, wie man MCP-Server mit dem stdio-Transport erstellt und verwendet.

## Lernziele

Am Ende dieser Lektion werden Sie in der Lage sein:

- Einen MCP-Server mit dem stdio-Transport zu erstellen.
- Einen MCP-Server mit dem Inspector zu debuggen.
- Einen MCP-Server mit Visual Studio Code zu verwenden.
- Die aktuellen MCP-Transportmechanismen zu verstehen und warum stdio empfohlen wird.

## stdio Transport – Wie es funktioniert

Der stdio-Transport ist einer von zwei unterstützten Transporttypen in der aktuellen MCP-Spezifikation (2025-11-25). So funktioniert er:

- **Einfache Kommunikation**: Der Server liest JSON-RPC-Nachrichten von der Standard-Eingabe (`stdin`) und sendet Nachrichten an die Standard-Ausgabe (`stdout`).
- **Prozessbasiert**: Der Client startet den MCP-Server als Unterprozess.
- **Nachrichtenformat**: Nachrichten sind einzelne JSON-RPC-Anfragen, -Benachrichtigungen oder -Antworten, getrennt durch Zeilenumbrüche.
- **Protokollierung**: Der Server KANN UTF-8-Strings zur Standard-Fehlerausgabe (`stderr`) zu Protokollierungszwecken schreiben.

### Wichtige Anforderungen:
- Nachrichten MÜSSEN durch Zeilenumbrüche getrennt sein und DARF keine eingebetteten Zeilenumbrüche enthalten
- Der Server DARF nichts an `stdout` schreiben, das keine gültige MCP-Nachricht ist
- Der Client DARF nichts an die `stdin` des Servers schreiben, das keine gültige MCP-Nachricht ist

### TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

Im vorherigen Code:

- Importieren wir die `Server`-Klasse und `StdioServerTransport` aus dem MCP SDK
- Erstellen wir eine Serverinstanz mit grundlegender Konfiguration und Fähigkeiten
- Erstellen wir eine `StdioServerTransport`-Instanz und verbinden den Server damit, um Kommunikation über stdin/stdout zu ermöglichen

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Serverinstanz erstellen
server = Server("example-server")

@server.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

Im vorherigen Code:

- Erstellen wir eine Serverinstanz mit dem MCP SDK
- Definieren wir Tools mit Dekoratoren
- Verwenden wir den Kontextmanager stdio_server, um den Transport zu handhaben

### .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

builder.Services.AddLogging(logging => logging.AddConsole());

var app = builder.Build();
await app.RunAsync();
```

Der Hauptunterschied zu SSE ist, dass stdio-Server:

- Keine Einrichtung eines Webservers oder HTTP-Endpunkte benötigen
- Vom Client als Unterprozesse gestartet werden
- Über stdin/stdout kommunizieren
- Einfacher zu implementieren und zu debuggen sind

## Übung: Einen stdio-Server erstellen

Um unseren Server zu erstellen, müssen wir zwei Dinge beachten:

- Wir müssen einen Webserver verwenden, um Endpunkte für Verbindung und Nachrichten bereitzustellen.
## Labor: Einen einfachen MCP-stdio-Server erstellen

In diesem Labor erstellen wir einen einfachen MCP-Server mit dem empfohlenen stdio-Transport. Dieser Server wird Tools bereitstellen, die Clients mit dem Standard Model Context Protocol aufrufen können.

### Voraussetzungen

- Python 3.8 oder neuer
- MCP Python SDK: `pip install mcp`
- Grundkenntnisse asynchroner Programmierung

Beginnen wir mit der Erstellung unseres ersten MCP-stdio-Servers:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Protokollierung konfigurieren
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Server erstellen
server = Server("example-stdio-server")

@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool() 
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    # Stdio-Transport verwenden
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Wichtige Unterschiede zum veralteten SSE-Ansatz

**Stdio Transport (aktueller Standard):**
- Einfaches Subprozessmodell – Client startet Server als Kindprozess
- Kommunikation über stdin/stdout mittels JSON-RPC-Nachrichten
- Kein HTTP-Server-Setup erforderlich
- Bessere Performance und Sicherheit
- Einfacheres Debugging und Entwicklung

**SSE Transport (ab MCP 2025-06-18 deprecated):**
- Erforderte HTTP-Server mit SSE-Endpunkten
- Komplexere Einrichtung mit Webserver-Infrastruktur
- Zusätzliche Sicherheitsaspekte bei HTTP-Endpunkten
- Jetzt durch Streamable HTTP für webbasierte Szenarien ersetzt

### Einen Server mit stdio-Transport erstellen

Um unseren stdio-Server zu erstellen, müssen wir:

1. **Die benötigten Bibliotheken importieren** – MCP Server-Komponenten und stdio-Transport
2. **Eine Serverinstanz erstellen** – Definieren des Servers mit seinen Fähigkeiten
3. **Tools definieren** – Die Funktionalitäten hinzufügen, die wir bereitstellen wollen
4. **Den Transport einrichten** – stdio-Kommunikation konfigurieren
5. **Server starten** – Den Server starten und Nachrichten verarbeiten

Bauen wir das Schritt für Schritt auf:

### Schritt 1: Einen einfachen stdio-Server erstellen

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Protokollierung konfigurieren
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Den Server erstellen
server = Server("example-stdio-server")

@server.tool()
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

### Schritt 2: Mehr Tools hinzufügen

```python
@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool()
def calculate_product(a: int, b: int) -> int:
    """Calculate the product of two numbers"""
    return a * b

@server.tool()
def get_server_info() -> dict:
    """Get information about this MCP server"""
    return {
        "server_name": "example-stdio-server",
        "version": "1.0.0",
        "transport": "stdio",
        "capabilities": ["tools"]
    }
```

### Schritt 3: Server starten

Speichern Sie den Code als `server.py` und starten Sie ihn über die Kommandozeile:

```bash
python server.py
```

Der Server startet und wartet auf Eingaben von stdin. Die Kommunikation erfolgt mittels JSON-RPC-Nachrichten über den stdio-Transport.

### Schritt 4: Testen mit dem Inspector

Sie können Ihren Server mit dem MCP Inspector testen:

1. Installieren Sie den Inspector: `npx @modelcontextprotocol/inspector`
2. Starten Sie den Inspector und verbinden Sie ihn mit Ihrem Server
3. Testen Sie die erstellten Tools

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Debugging Ihres stdio-Servers

### Verwendung des MCP Inspectors

Der MCP Inspector ist ein wertvolles Werkzeug zum Debuggen und Testen von MCP-Servern. So verwenden Sie ihn mit Ihrem stdio-Server:

1. **Installieren Sie den Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Starten Sie den Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Testen Sie Ihren Server**: Der Inspector bietet eine Weboberfläche, auf der Sie:
   - Serverfähigkeiten anzeigen können
   - Tools mit verschiedenen Parametern testen
   - JSON-RPC-Nachrichten überwachen
   - Verbindungsprobleme debuggen können

### Verwendung von VS Code

Sie können Ihren MCP-Server auch direkt in VS Code debuggen:

1. Erstellen Sie eine Startkonfiguration in `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug MCP Server",
         "type": "python",
         "request": "launch",
         "program": "server.py",
         "console": "integratedTerminal"
       }
     ]
   }
   ```

2. Setzen Sie Breakpoints im Servercode
3. Starten Sie den Debugger und testen Sie mit dem Inspector

### Häufige Debugging-Tipps

- Verwenden Sie `stderr` zum Protokollieren – schreiben Sie niemals in `stdout`, da es für MCP-Nachrichten reserviert ist
- Stellen Sie sicher, dass alle JSON-RPC-Nachrichten zeilenweise getrennt sind
- Testen Sie zunächst mit einfachen Tools, bevor Sie komplexe Funktionen hinzufügen
- Verwenden Sie den Inspector, um Nachrichtenformate zu überprüfen

## Nutzung Ihres stdio-Servers in VS Code

Sobald Sie Ihren MCP-stdio-Server erstellt haben, können Sie ihn in VS Code integrieren, um ihn mit Claude oder anderen MCP-kompatiblen Clients zu verwenden.

### Konfiguration

1. **Erstellen Sie eine MCP-Konfigurationsdatei** unter `%APPDATA%\Claude\claude_desktop_config.json` (Windows) oder `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

   ```json
   {
     "mcpServers": {
       "example-stdio-server": {
         "command": "python",
         "args": ["path/to/your/server.py"]
       }
     }
   }
   ```

2. **Starten Sie Claude neu**: Schließen und öffnen Sie Claude neu, um die neue Serverkonfiguration zu laden.

3. **Testen Sie die Verbindung**: Starten Sie ein Gespräch mit Claude und testen Sie die Tools Ihres Servers:
   - „Kannst du mich mit dem Begrüßungstool begrüßen?“
   - „Berechne die Summe von 15 und 27“
   - „Was sind die Serverinformationen?“

### TypeScript stdio-Server-Beispiel

Hier ist ein vollständiges TypeScript-Beispiel zur Referenz:

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-stdio-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Werkzeuge hinzufügen
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_greeting",
        description: "Get a personalized greeting",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_greeting") {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${request.params.arguments?.name}! Welcome to MCP stdio server.`,
        },
      ],
    };
  } else {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

### .NET stdio-Server-Beispiel

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

var app = builder.Build();
await app.RunAsync();

[McpServerToolType]
public class Tools
{
    [McpServerTool, Description("Get a personalized greeting")]
    public string GetGreeting(string name)
    {
        return $"Hello, {name}! Welcome to MCP stdio server.";
    }

    [McpServerTool, Description("Calculate the sum of two numbers")]
    public int CalculateSum(int a, int b)
    {
        return a + b;
    }
}
```

## Zusammenfassung

In dieser aktualisierten Lektion haben Sie gelernt:

- MCP-Server mit dem aktuellen **stdio-Transport** zu erstellen (empfohlene Methode)
- Zu verstehen, warum der SSE-Transport zugunsten von stdio und Streamable HTTP abgekündigt wurde
- Tools zu erstellen, die von MCP-Clients aufgerufen werden können
- Ihren Server mit dem MCP Inspector zu debuggen
- Ihren stdio-Server mit VS Code und Claude zu integrieren

Der stdio-Transport bietet einen einfacheren, sichereren und performanteren Weg, MCP-Server im Vergleich zum veralteten SSE-Ansatz zu erstellen. Er ist der empfohlene Transport für die meisten MCP-Server-Implementierungen seit der Spezifikation vom 2025-06-18.

### .NET

1. Erstellen wir zunächst einige Tools, dafür legen wir eine Datei *Tools.cs* mit folgendem Inhalt an:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Übung: Testen Ihres stdio-Servers

Jetzt, wo Sie Ihren stdio-Server erstellt haben, testen wir ihn, um sicherzustellen, dass er korrekt funktioniert.

### Voraussetzungen

1. Stellen Sie sicher, dass Sie den MCP Inspector installiert haben:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Ihr Servercode sollte gespeichert sein (z. B. als `server.py`)

### Testen mit dem Inspector

1. **Starten Sie den Inspector mit Ihrem Server**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Öffnen Sie die Weboberfläche**: Der Inspector öffnet ein Browserfenster, in dem die Serverfähigkeiten angezeigt werden.

3. **Testen Sie die Tools**:
   - Testen Sie das `get_greeting`-Tool mit verschiedenen Namen
   - Testen Sie das `calculate_sum`-Tool mit unterschiedlichen Zahlen
   - Rufen Sie das `get_server_info`-Tool auf, um Servermetadaten zu sehen

4. **Überwachen Sie die Kommunikation**: Der Inspector zeigt die JSON-RPC-Nachrichten, die zwischen Client und Server ausgetauscht werden.

### Was Sie sehen sollten

Wenn Ihr Server korrekt startet, sollten Sie sehen:
- Serverfähigkeiten im Inspector aufgelistet
- Verfügbare Tools zum Testen
- Erfolgreiche JSON-RPC-Nachrichtenübertragung
- Tool-Antworten in der Oberfläche angezeigt

### Häufige Probleme und Lösungen

**Server startet nicht:**
- Überprüfen Sie, ob alle Abhängigkeiten installiert sind: `pip install mcp`
- Prüfen Sie Python-Syntax und Einrückungen
- Suchen Sie nach Fehlermeldungen in der Konsole

**Tools werden nicht angezeigt:**
- Stellen Sie sicher, dass `@server.tool()` Dekoratoren vorhanden sind
- Überprüfen Sie, ob Tool-Funktionen vor `main()` definiert sind
- Prüfen Sie, ob der Server korrekt konfiguriert ist

**Verbindungsprobleme:**
- Stellen Sie sicher, dass der Server stdio-Transport korrekt verwendet
- Prüfen Sie, dass keine anderen Prozesse stören
- Überprüfen Sie die Syntax der Inspector-Befehle

## Aufgabe

Versuchen Sie, Ihren Server mit mehr Funktionen auszubauen. Siehe [diese Seite](https://api.chucknorris.io/), um zum Beispiel ein Tool hinzuzufügen, das eine API aufruft. Sie entscheiden, wie Ihr Server aussehen soll. Viel Spaß :)

## Lösung

[Solution](./solution/README.md) Hier ist eine mögliche Lösung mit funktionierendem Code.

## Wichtigste Erkenntnisse

Die wichtigsten Erkenntnisse aus diesem Kapitel sind:

- Der stdio-Transport ist der empfohlene Mechanismus für lokale MCP-Server.
- Der stdio-Transport ermöglicht eine nahtlose Kommunikation zwischen MCP-Servern und Clients über Standard-Ein- und -Ausgabeströme.
- Sie können sowohl Inspector als auch Visual Studio Code direkt zum Verbrauch von stdio-Servern verwenden, was das Debugging und die Integration vereinfacht.

## Beispiele

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)

## Zusätzliche Ressourcen

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Was kommt als Nächstes

## Nächste Schritte

Nachdem Sie gelernt haben, wie man MCP-Server mit dem stdio-Transport erstellt, können Sie fortgeschrittene Themen erkunden:

- **Als Nächstes**: [HTTP Streaming mit MCP (Streamable HTTP)](../06-http-streaming/README.md) – Erfahren Sie mehr über den anderen unterstützten Transportmechanismus für entfernte Server
- **Fortgeschritten**: [MCP Security Best Practices](../../02-Security/README.md) – Implementieren Sie Sicherheit in Ihren MCP-Servern
- **Produktion**: [Deployment-Strategien](../09-deployment/README.md) – Stellen Sie Ihre Server produktiv bereit

## Zusätzliche Ressourcen

- [MCP-Spezifikation 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) – Offizielle Spezifikation
- [MCP SDK-Dokumentation](https://github.com/modelcontextprotocol/sdk) – SDK-Referenzen für alle Sprachen
- [Community-Beispiele](../../06-CommunityContributions/README.md) – Weitere Serverbeispiele aus der Community

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->