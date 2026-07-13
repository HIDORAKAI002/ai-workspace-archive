# HTTPS-Streaming mit dem Model Context Protocol (MCP)

Dieses Kapitel bietet eine umfassende Anleitung zur Implementierung von sicherem, skalierbarem und Echtzeit-Streaming mit dem Model Context Protocol (MCP) unter Verwendung von HTTPS. Es behandelt die Motivation für Streaming, die verfügbaren Transportmechanismen, wie man streamfähiges HTTP in MCP implementiert, bewährte Sicherheitspraktiken, die Migration von SSE und praktische Anleitungen zum Erstellen eigener Streaming-MCP-Anwendungen.

> **Ein Ausblick:** Diese Lektion beschreibt Streamable HTTP unter der **MCP-Spezifikation 2025-11-25**, bei der eine Sitzung während des `initialize` aufgebaut und mit einem `Mcp-Session-Id`-Header festgelegt wird. Der Release-Kandidat `2026-07-28` entfernt den Handshake und die Sitzungs-ID vollständig, sodass jede Anforderung eigenständig ist und an jede Serverinstanz ohne Sticky Sessions weitergeleitet werden kann. Einzelheiten finden Sie unter [Was sich in MCP ändert: Der Release-Kandidat 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Transportmechanismen und Streaming in MCP

In diesem Abschnitt werden die verschiedenen in MCP verfügbaren Transportmechanismen und ihre Rolle bei der Ermöglichung von Streaming-Fähigkeiten für die Echtzeitkommunikation zwischen Clients und Servern untersucht.

### Was ist ein Transportmechanismus?

Ein Transportmechanismus definiert, wie Daten zwischen Client und Server ausgetauscht werden. MCP unterstützt verschiedene Transporttypen, um unterschiedlichen Umgebungen und Anforderungen gerecht zu werden:

- **stdio**: Standard-Ein-/Ausgabe, geeignet für lokale und CLI-basierte Tools. Einfach, aber nicht für Web oder Cloud geeignet.
- **SSE (Server-Sent Events)**: Ermöglicht Servern, Clients über HTTP Echtzeit-Updates zu senden. Gut für Web-UIs, aber begrenzt in Skalierbarkeit und Flexibilität. Ab MCP-Spezifikation 2025-06-18 wurde der eigenständige SSE-Transport eingestellt und durch den "Streamable HTTP"-Transport ersetzt.
- **Streamable HTTP**: Moderner, HTTP-basierter Streaming-Transport, unterstützt Benachrichtigungen und bessere Skalierbarkeit. Für die meisten Produktions- und Cloud-Szenarien empfohlen.

### Vergleichstabelle

Schauen Sie sich die folgende Vergleichstabelle an, um die Unterschiede zwischen diesen Transportmechanismen zu verstehen:

| Transport         | Echtzeit-Updates | Streaming | Skalierbarkeit | Anwendungsfall          |
|-------------------|------------------|-----------|---------------|-------------------------|
| stdio             | Nein             | Nein      | Niedrig       | Lokale CLI-Tools        |
| SSE               | Ja               | Ja        | Mittel        | Web, Echtzeit-Updates   |
| Streamable HTTP   | Ja               | Ja        | Hoch          | Cloud, Multi-Client     |

> **Tipp:** Die Wahl des richtigen Transports beeinflusst Leistung, Skalierbarkeit und Benutzererfahrung. **Streamable HTTP** wird für moderne, skalierbare und cloudfähige Anwendungen empfohlen.

Beachten Sie die Transports stdio und SSE, die in den vorherigen Kapiteln gezeigt wurden, und dass Streamable HTTP der in diesem Kapitel behandelte Transport ist.

## Streaming: Konzepte und Motivation

Das Verständnis der grundlegenden Konzepte und Motivationen hinter Streaming ist wesentlich für die Implementierung effektiver Echtzeitkommunikationssysteme.

**Streaming** ist eine Technik in der Netzwerkprogrammierung, die es erlaubt, Daten in kleinen, handhabbaren Abschnitten oder als Ereignisse-Sequenz zu senden und zu empfangen, anstatt auf eine vollständige Antwort zu warten. Dies ist besonders nützlich für:

- Große Dateien oder Datensätze.
- Echtzeit-Updates (z. B. Chat, Fortschrittsbalken).
- Lang laufende Berechnungen, bei denen der Benutzer auf dem Laufenden gehalten werden soll.

Hier sind die wichtigsten Punkte zum Streaming auf hoher Ebene:

- Daten werden schrittweise geliefert, nicht auf einmal.
- Der Client kann Daten verarbeiten, sobald sie eintreffen.
- Reduziert wahrgenommene Latenz und verbessert die Benutzererfahrung.

### Warum Streaming verwenden?

Die Gründe für die Nutzung von Streaming sind folgende:

- Benutzer erhalten sofort Feedback, nicht erst am Ende.
- Ermöglicht Echtzeitanwendungen und reaktionsfähige Benutzeroberflächen.
- Effizientere Nutzung von Netzwerk- und Rechenressourcen.

### Einfaches Beispiel: HTTP-Streaming-Server & Client

Hier ein einfaches Beispiel, wie Streaming implementiert werden kann:

#### Python

**Server (Python, mit FastAPI und StreamingResponse):**

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import time

app = FastAPI()

async def event_stream():
    for i in range(1, 6):
        yield f"data: Message {i}\n\n"
        time.sleep(1)

@app.get("/stream")
def stream():
    return StreamingResponse(event_stream(), media_type="text/event-stream")
```

**Client (Python, mit requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Dieses Beispiel zeigt, wie ein Server eine Reihe von Nachrichten an den Client sendet, sobald sie verfügbar sind, anstatt auf alle Nachrichten gleichzeitig zu warten.

**So funktioniert es:**

- Der Server liefert jede Nachricht, sobald sie bereit ist.
- Der Client empfängt und druckt jedes Datenpaket, sobald es eintrifft.

**Anforderungen:**

- Der Server muss eine Streaming-Antwort verwenden (z. B. `StreamingResponse` in FastAPI).
- Der Client muss die Antwort als Stream verarbeiten (`stream=True` in requests).
- Content-Type ist üblicherweise `text/event-stream` oder `application/octet-stream`.

#### Java

**Server (Java, mit Spring Boot und Server-Sent Events):**

```java
@RestController
public class CalculatorController {

    @GetMapping(value = "/calculate", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> calculate(@RequestParam double a,
                                                   @RequestParam double b,
                                                   @RequestParam String op) {
        
        double result;
        switch (op) {
            case "add": result = a + b; break;
            case "sub": result = a - b; break;
            case "mul": result = a * b; break;
            case "div": result = b != 0 ? a / b : Double.NaN; break;
            default: result = Double.NaN;
        }

        return Flux.<ServerSentEvent<String>>just(
                    ServerSentEvent.<String>builder()
                        .event("info")
                        .data("Calculating: " + a + " " + op + " " + b)
                        .build(),
                    ServerSentEvent.<String>builder()
                        .event("result")
                        .data(String.valueOf(result))
                        .build()
                )
                .delayElements(Duration.ofSeconds(1));
    }
}
```

**Client (Java, mit Spring WebFlux WebClient):**

```java
@SpringBootApplication
public class CalculatorClientApplication implements CommandLineRunner {

    private final WebClient client = WebClient.builder()
            .baseUrl("http://localhost:8080")
            .build();

    @Override
    public void run(String... args) {
        client.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/calculate")
                        .queryParam("a", 7)
                        .queryParam("b", 5)
                        .queryParam("op", "mul")
                        .build())
                .accept(MediaType.TEXT_EVENT_STREAM)
                .retrieve()
                .bodyToFlux(String.class)
                .doOnNext(System.out::println)
                .blockLast();
    }
}
```

**Anmerkungen zur Java-Implementierung:**

- Verwendet Spring Boots reaktiven Stack mit `Flux` für Streaming.
- `ServerSentEvent` stellt strukturiertes Event-Streaming mit Event-Typen bereit.
- `WebClient` mit `bodyToFlux()` ermöglicht reaktive Streaming-Nutzung.
- `delayElements()` simuliert Verarbeitungszeit zwischen den Events.
- Events können Typen haben (`info`, `result`) für bessere Client-Verarbeitung.

### Vergleich: Klassisches Streaming vs. MCP-Streaming

Die Unterschiede zwischen klassischem Streaming und Streaming in MCP können wie folgt dargestellt werden:

| Merkmal               | Klassisches HTTP-Streaming       | MCP-Streaming (Benachrichtigungen) |
|-----------------------|---------------------------------|------------------------------------|
| Hauptantwort           | Chunked (Stückweise)             | Einzeln, am Ende                   |
| Fortschrittsupdates    | Als Datenabschnitte gesendet    | Als Benachrichtigungen gesendet   |
| Anforderungen an Client| Muss Stream verarbeiten          | Muss Nachrichtendandler implementieren |
| Anwendungsfall         | Große Dateien, AI-Token-Streams  | Fortschritt, Logs, Echtzeit-Feedback |

### Wichtige Unterscheidungsmerkmale

Zusätzlich hier einige wesentliche Unterschiede:

- **Kommunikationsmuster:**  
  - Klassisches HTTP-Streaming: Verwendet einfache Chunked-Transfer-Encoding, um Daten in Stücken zu senden  
  - MCP-Streaming: Verwendet ein strukturiertes Benachrichtigungssystem mit JSON-RPC-Protokoll  

- **Nachrichtenformat:**  
  - Klassisches HTTP: Plain-Text-Chunks mit Zeilenumbrüchen  
  - MCP: Strukturierte LoggingMessageNotification-Objekte mit Metadaten  

- **Client-Implementierung:**  
  - Klassisches HTTP: Einfacher Client, der Streaming-Antworten verarbeitet  
  - MCP: Anspruchsvollerer Client mit Nachrichtendandler zur Verarbeitung verschiedener Nachrichtentypen  

- **Fortschrittsupdates:**  
  - Klassisches HTTP: Fortschritt ist Teil des Hauptantwort-Streams  
  - MCP: Fortschritt wird über separate Benachrichtigungsnachrichten gesendet, während die Hauptantwort am Ende kommt  

### Empfehlungen

Folgendes empfehlen wir in Bezug auf die Wahl zwischen klassischem Streaming (wie bei der oben gezeigten `/stream`-Endpoint) und Streaming über MCP:

- **Für einfache Streaming-Anforderungen:** Klassisches HTTP-Streaming ist einfacher zu implementieren und für grundlegende Streaming-Bedürfnisse ausreichend.

- **Für komplexe, interaktive Anwendungen:** MCP-Streaming bietet einen strukturierteren Ansatz mit reichhaltigerer Metadatenunterstützung und Trennung zwischen Benachrichtigungen und Endergebnissen.

- **Für KI-Anwendungen:** Das Benachrichtigungssystem von MCP ist besonders nützlich für langlaufende KI-Aufgaben, bei denen Benutzer über den Fortschritt informiert bleiben sollen.

## Streaming in MCP

Nun, Sie haben bisher einige Empfehlungen und Vergleiche zur Unterscheidung zwischen klassischem Streaming und Streaming in MCP gesehen. Lassen Sie uns nun genau betrachten, wie Sie Streaming in MCP nutzen können.

Das Verständnis, wie Streaming innerhalb des MCP-Rahmenwerks funktioniert, ist entscheidend für den Aufbau reaktionsfähiger Anwendungen, die während langlaufender Operationen Echtzeit-Feedback an Benutzer geben.

In MCP geht es beim Streaming nicht darum, die Hauptantwort in Abschnitten zu senden, sondern **Benachrichtigungen** an den Client zu senden, während ein Tool eine Anfrage verarbeitet. Diese Benachrichtigungen können Fortschrittsupdates, Protokolle oder andere Ereignisse umfassen.

### Wie funktioniert es

Das Hauptergebnis wird weiterhin als einzelne Antwort gesendet. Benachrichtigungen können jedoch während der Verarbeitung als separate Nachrichten gesendet werden und somit den Client in Echtzeit aktualisieren. Der Client muss diese Benachrichtigungen verarbeiten und anzeigen können.

## Was ist eine Benachrichtigung?

Wir sagten „Benachrichtigung“, was bedeutet das im Kontext von MCP?

Eine Benachrichtigung ist eine Nachricht vom Server an den Client, die über Fortschritt, Status oder andere Ereignisse während eines langlaufenden Vorgangs informiert. Benachrichtigungen verbessern Transparenz und Benutzererfahrung.

Zum Beispiel soll ein Client eine Benachrichtigung senden, sobald der initiale Handshake mit dem Server erfolgt ist.

Eine Benachrichtigung sieht als JSON-Nachricht so aus:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Benachrichtigungen gehören zu einem Thema in MCP, das als ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) bezeichnet wird.

Damit Logging funktioniert, muss der Server es als Feature/Fähigkeit so aktivieren:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Je nach verwendetem SDK ist Logging möglicherweise standardmäßig aktiviert, oder Sie müssen es explizit in Ihrer Serverkonfiguration aktivieren.

Es gibt verschiedene Typen von Benachrichtigungen:

| Level     | Beschreibung                    | Beispielanwendungsfall              |
|-----------|--------------------------------|-----------------------------------|
| debug     | Detaillierte Debugging-Informationen | Funktions-Ein-/Ausstiegspunkte  |
| info      | Allgemeine Informationsnachrichten | Fortschrittsupdates bei Operationen |
| notice    | Normale, aber bedeutende Ereignisse | Konfigurationsänderungen          |
| warning   | Warnbedingungen                | Nutzung veralteter Funktionen       |
| error     | Fehlerbedingungen              | Betriebsfehler                    |
| critical  | Kritische Bedingungen         | Systemkomponentenfehler          |
| alert     | Sofortiges Handeln erforderlich | Datenkorruption erkannt          |
| emergency | System ist nicht benutzbar    | Komplettausfall des Systems      |

## Implementierung von Benachrichtigungen in MCP

Zur Implementierung von Benachrichtigungen in MCP müssen sowohl Server- als auch Client-Seite eingerichtet werden, um Echtzeit-Updates zu verarbeiten. So kann Ihre Anwendung während lang laufender Vorgänge sofortiges Feedback an die Benutzer geben.

### Serverseite: Senden von Benachrichtigungen

Beginnen wir mit der Serverseite. In MCP definieren Sie Werkzeuge (Tools), die während der Verarbeitung von Anfragen Benachrichtigungen senden können. Der Server verwendet das Kontextobjekt (meist `ctx`), um Nachrichten an den Client zu senden.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Im vorigen Beispiel sendet das Tool `process_files` drei Benachrichtigungen an den Client, während es jede Datei verarbeitet. Die Methode `ctx.info()` wird verwendet, um Informationsnachrichten zu senden.

Zusätzlich sollten Sie, um Benachrichtigungen zu ermöglichen, sicherstellen, dass Ihr Server einen Streaming-Transport (wie `streamable-http`) verwendet und Ihr Client einen Nachrichtendandler zur Verarbeitung von Benachrichtigungen implementiert. So richten Sie den Server für den `streamable-http`-Transport ein:

```python
mcp.run(transport="streamable-http")
```

#### .NET

```csharp
[Tool("A tool that sends progress notifications")]
public async Task<TextContent> ProcessFiles(string message, ToolContext ctx)
{
    await ctx.Info("Processing file 1/3...");
    await ctx.Info("Processing file 2/3...");
    await ctx.Info("Processing file 3/3...");
    return new TextContent
    {
        Type = "text",
        Text = $"Done: {message}"
    };
}
```

In diesem .NET-Beispiel ist das Werkzeug `ProcessFiles` mit dem Attribut `Tool` versehen und sendet drei Benachrichtigungen an den Client, während jeweils eine Datei verarbeitet wird. Die Methode `ctx.Info()` wird verwendet, um Informationsnachrichten zu senden.

Um Benachrichtigungen in Ihrem .NET-MCP-Server zu aktivieren, stellen Sie sicher, dass Sie einen Streaming-Transport verwenden:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Clientseite: Empfangen von Benachrichtigungen

Der Client muss einen Nachrichtendhandler implementieren, um Benachrichtigungen bei deren Eintreffen zu verarbeiten und anzuzeigen.

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)

async with ClientSession(
   read_stream, 
   write_stream,
   logging_callback=logging_collector,
   message_handler=message_handler,
) as session:
```

Im obigen Code überprüft die Funktion `message_handler`, ob die eingehende Nachricht eine Benachrichtigung ist. Falls ja, wird die Benachrichtigung ausgegeben, andernfalls als normale Servernachricht verarbeitet. Beachten Sie außerdem, wie `ClientSession` mit dem `message_handler` zur Verarbeitung eingehender Benachrichtigungen initialisiert wird.

#### .NET

```csharp
// Define a message handler
void MessageHandler(IJsonRpcMessage message)
{
    if (message is ServerNotification notification)
    {
        Console.WriteLine($"NOTIFICATION: {notification}");
    }
    else
    {
        Console.WriteLine($"SERVER MESSAGE: {message}");
    }
}

// Create and use a client session with the message handler
var clientOptions = new ClientSessionOptions
{
    MessageHandler = MessageHandler,
    LoggingCallback = (level, message) => Console.WriteLine($"[{level}] {message}")
};

using var client = new ClientSession(readStream, writeStream, clientOptions);
await client.InitializeAsync();

// Now the client will process notifications through the MessageHandler
```

In diesem .NET-Beispiel prüft die Funktion `MessageHandler`, ob die eingehende Nachricht eine Benachrichtigung ist. Falls ja, wird sie ausgegeben, sonst wie eine normale Servernachricht verarbeitet. `ClientSession` wird mit dem Nachrichtendhandler über `ClientSessionOptions` initialisiert.

Um Benachrichtigungen zu ermöglichen, stellen Sie sicher, dass Ihr Server einen Streaming-Transport (z. B. `streamable-http`) verwendet und Ihr Client einen Nachrichtendhandler zur Verarbeitung von Benachrichtigungen implementiert.

## Fortschrittsbenachrichtigungen & Szenarien

Dieser Abschnitt erklärt das Konzept der Fortschrittsbenachrichtigungen in MCP, warum sie wichtig sind und wie man sie mithilfe von Streamable HTTP implementiert. Außerdem gibt es eine praktische Übung zur Vertiefung Ihres Verständnisses.

Fortschrittsbenachrichtigungen sind Echtzeitnachrichten, die vom Server an den Client während lang laufender Vorgänge gesendet werden. Statt auf den Abschluss des gesamten Prozesses zu warten, hält der Server den Client über den aktuellen Status auf dem Laufenden. Das verbessert Transparenz und Benutzererlebnis und erleichtert die Fehlersuche.

**Beispiel:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Warum Fortschrittsbenachrichtigungen verwenden?

Fortschrittsbenachrichtigungen sind aus mehreren Gründen wichtig:

- **Bessere Benutzererfahrung:** Nutzer sehen Updates während des Vorgangs, nicht nur am Ende.
- **Echtzeit-Feedback:** Clients können Fortschrittsbalken oder Protokolle anzeigen und die App wirkt reaktionsschneller.
- **Einfacheres Debuggen und Überwachen:** Entwickler und Nutzer können erkennen, wo ein Prozess langsam ist oder hängt.

### Wie man Fortschrittsbenachrichtigungen implementiert

So implementieren Sie Fortschrittsbenachrichtigungen in MCP:

- **Auf dem Server:** Verwenden Sie `ctx.info()` oder `ctx.log()`, um Benachrichtigungen zu senden, während jede Aufgabe verarbeitet wird. Dies sendet eine Nachricht an den Client, bevor das Hauptergebnis fertig ist.
- **Auf dem Client:** Implementieren Sie einen Nachrichtendhandler, der Benachrichtigungen empfängt und anzeigt, sobald sie eintreffen. Dieser unterscheidet zwischen Benachrichtigungen und dem finalen Ergebnis.

**Server-Beispiel:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Client-Beispiel:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Sicherheitsaspekte

Bei der Implementierung von MCP-Servern mit HTTP-basierten Transporten wird Sicherheit zu einem vorrangigen Anliegen, das sorgfältige Beachtung verschiedener Angriffsvektoren und Schutzmechanismen erfordert.

### Überblick

Sicherheit ist entscheidend, wenn MCP-Server über HTTP exponiert werden. Streamable HTTP führt neue Angriffsflächen ein und erfordert eine sorgfältige Konfiguration.

### Wichtige Punkte


- **Origin-Header-Validierung**: Validieren Sie immer den `Origin`-Header, um DNS-Rebinding-Angriffe zu verhindern.
- **Localhost-Bindung**: Binden Sie Server für die lokale Entwicklung an `localhost`, um zu vermeiden, dass sie im öffentlichen Internet zugänglich sind.
- **Authentifizierung**: Implementieren Sie für Produktionsbereitstellungen eine Authentifizierung (z. B. API-Schlüssel, OAuth).
- **CORS**: Konfigurieren Sie Cross-Origin Resource Sharing (CORS)-Richtlinien, um den Zugriff einzuschränken.
- **HTTPS**: Verwenden Sie HTTPS in der Produktion zur Verschlüsselung des Datenverkehrs.

### Best Practices

- Vertrauen Sie eingehenden Anfragen niemals ohne Validierung.
- Protokollieren und überwachen Sie alle Zugriffe und Fehler.
- Aktualisieren Sie regelmäßig Abhängigkeiten, um Sicherheitslücken zu schließen.

### Herausforderungen

- Balance zwischen Sicherheit und einfacher Entwicklung
- Sicherstellung der Kompatibilität mit verschiedenen Client-Umgebungen

## Upgrade von SSE zu Streamable HTTP

Für Anwendungen, die derzeit Server-Sent Events (SSE) verwenden, bietet das Migrieren zu Streamable HTTP erweiterte Fähigkeiten und bessere Langzeitnachhaltigkeit für Ihre MCP-Implementierungen.

### Warum upgraden?

Es gibt zwei überzeugende Gründe, von SSE zu Streamable HTTP zu wechseln:

- Streamable HTTP bietet bessere Skalierbarkeit, Kompatibilität und reichhaltigere Benachrichtigungsunterstützung als SSE.
- Es ist der empfohlene Transport für neue MCP-Anwendungen.

### Migrationsschritte

So können Sie in Ihren MCP-Anwendungen von SSE zu Streamable HTTP migrieren:

- **Aktualisieren Sie den Servercode**, um `transport="streamable-http"` in `mcp.run()` zu verwenden.
- **Aktualisieren Sie den Clientcode**, um `streamablehttp_client` statt des SSE-Clients zu verwenden.
- **Implementieren Sie einen Nachrichten-Handler** im Client zur Verarbeitung von Benachrichtigungen.
- **Testen Sie die Kompatibilität** mit bestehenden Tools und Arbeitsabläufen.

### Kompatibilität aufrechterhalten

Es wird empfohlen, während des Migrationsprozesses die Kompatibilität mit bestehenden SSE-Clients beizubehalten. Hier einige Strategien:

- Sie können sowohl SSE als auch Streamable HTTP unterstützen, indem Sie beide Transports auf unterschiedlichen Endpunkten betreiben.
- Migrieren Sie Clients schrittweise zum neuen Transport.

### Herausforderungen

Stellen Sie sicher, dass Sie während der Migration folgende Herausforderungen angehen:

- Sicherstellung, dass alle Clients aktualisiert werden
- Umgang mit Unterschieden in der Zustellung von Benachrichtigungen

## Sicherheitsaspekte

Sicherheit sollte beim Implementieren eines Servers oberste Priorität haben, insbesondere bei der Verwendung von HTTP-basierten Transporten wie Streamable HTTP in MCP.

Bei der Implementierung von MCP-Servern mit HTTP-basierten Transporten ist Sicherheit ein zentrales Anliegen, das sorgfältige Beachtung mehrerer Angriffsvektoren und Schutzmechanismen erfordert.

### Überblick

Sicherheit ist entscheidend, wenn MCP-Server über HTTP exponiert werden. Streamable HTTP führt neue Angriffsflächen ein und erfordert sorgfältige Konfiguration.

Hier einige wichtige Sicherheitsüberlegungen:

- **Origin-Header-Validierung**: Validieren Sie immer den `Origin`-Header, um DNS-Rebinding-Angriffe zu verhindern.
- **Localhost-Bindung**: Binden Sie Server für die lokale Entwicklung an `localhost`, um zu vermeiden, dass sie im öffentlichen Internet zugänglich sind.
- **Authentifizierung**: Implementieren Sie für Produktionsbereitstellungen eine Authentifizierung (z. B. API-Schlüssel, OAuth).
- **CORS**: Konfigurieren Sie Cross-Origin Resource Sharing (CORS)-Richtlinien, um den Zugriff einzuschränken.
- **HTTPS**: Verwenden Sie HTTPS in der Produktion zur Verschlüsselung des Datenverkehrs.

### Best Practices

Zusätzlich hier einige bewährte Vorgehensweisen für die Sicherheit bei der Implementierung Ihres MCP-Streaming-Servers:

- Vertrauen Sie eingehenden Anfragen niemals ohne Validierung.
- Protokollieren und überwachen Sie alle Zugriffe und Fehler.
- Aktualisieren Sie regelmäßig Abhängigkeiten, um Sicherheitslücken zu schließen.

### Herausforderungen

Sie werden bei der Implementierung von Sicherheit in MCP-Streaming-Servern auf folgende Herausforderungen stoßen:

- Balance zwischen Sicherheit und einfacher Entwicklung
- Sicherstellung der Kompatibilität mit verschiedenen Client-Umgebungen

### Aufgabe: Bauen Sie Ihre eigene Streaming-MCP-App

**Szenario:**
Erstellen Sie einen MCP-Server und -Client, bei dem der Server eine Liste von Elementen (z. B. Dateien oder Dokumenten) verarbeitet und für jedes verarbeitete Element eine Benachrichtigung sendet. Der Client soll jede Benachrichtigung sofort anzeigen, sobald sie eingeht.

**Schritte:**

1. Implementieren Sie ein Server-Tool, das eine Liste verarbeitet und für jedes Element Benachrichtigungen sendet.
2. Implementieren Sie einen Client mit einem Nachrichten-Handler, der Benachrichtigungen in Echtzeit anzeigt.
3. Testen Sie Ihre Implementierung, indem Sie Server und Client ausführen und die Benachrichtigungen beobachten.

[Solution](./solution/README.md)

## Weiterführende Literatur & Wie geht es weiter?

Um Ihre Reise mit MCP-Streaming fortzusetzen und Ihr Wissen zu erweitern, bietet dieser Abschnitt zusätzliche Ressourcen und vorgeschlagene nächste Schritte zum Erstellen fortgeschrittenerer Anwendungen.

### Weiterführende Literatur

- [Microsoft: Einführung in HTTP-Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Wie geht es weiter?

- Versuchen Sie, fortgeschrittenere MCP-Tools zu bauen, die Streaming für Echtzeitanalysen, Chat oder kollaboratives Bearbeiten verwenden.
- Erkunden Sie die Integration von MCP-Streaming mit Frontend-Frameworks (React, Vue usw.) für Live-UI-Updates.
- Nächstes: [Verwendung des AI-Toolkits für VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->