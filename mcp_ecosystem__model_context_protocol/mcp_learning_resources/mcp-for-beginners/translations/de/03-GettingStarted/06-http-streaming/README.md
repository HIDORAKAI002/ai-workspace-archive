# HTTPS-Streaming mit Model Context Protocol (MCP)

Dieses Kapitel bietet eine umfassende Anleitung zur Implementierung von sicherem, skalierbarem und Echtzeit-Streaming mit dem Model Context Protocol (MCP) unter Verwendung von HTTPS. Es behandelt die Motivation fürs Streaming, die verfügbaren Transportmechanismen, wie man streamfähiges HTTP in MCP implementiert, Sicherheitsbest Practices, die Migration von SSE und praktische Anleitungen zum Aufbau eigener Streaming-MCP-Anwendungen.

> **Ausblick:** Diese Lektion beschreibt Streamable HTTP unter **MCP Specification 2025-11-25**, bei der eine Sitzung während der `initialize` eingerichtet und mit einem `Mcp-Session-Id`-Header versehen wird. Der Release-Kandidat `2026-07-28` entfernt das Handshake und die Sitzungs-ID komplett, wodurch jede Anfrage eigenständig ist und an beliebige Serverinstanzen ohne Sticky Sessions geroutet werden kann. Details siehe [Was ändert sich in MCP: Der Release-Kandidat 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Transportmechanismen und Streaming in MCP

Dieser Abschnitt untersucht die verschiedenen in MCP verfügbaren Transportmechanismen und ihre Rolle bei der Ermöglichung von Streaming-Funktionalitäten für die Echtzeitkommunikation zwischen Clients und Servern.

### Was ist ein Transportmechanismus?

Ein Transportmechanismus definiert, wie Daten zwischen Client und Server ausgetauscht werden. MCP unterstützt mehrere Transporttypen, um verschiedenen Umgebungen und Anforderungen gerecht zu werden:

- **stdio**: Standard-Ein-/Ausgabe, geeignet für lokale und CLI-basierte Tools. Einfach, aber nicht für Web oder Cloud geeignet.
- **SSE (Server-Sent Events)**: Ermöglicht Servern, Clients Echtzeit-Updates über HTTP zu senden. Gut für Web-UIs, aber eingeschränkt hinsichtlich Skalierbarkeit und Flexibilität. Ab MCP Specification 2025-06-18 ist der separate SSE-Transport veraltet und wurde durch "Streamable HTTP" ersetzt.
- **Streamable HTTP**: Moderner HTTP-basierter Streaming-Transport, unterstützt Benachrichtigungen und bessere Skalierbarkeit. Empfohlen für die meisten Produktions- und Cloud-Szenarien.

### Vergleichstabelle

Werfen Sie einen Blick auf die folgende Vergleichstabelle, um die Unterschiede zwischen diesen Transportmechanismen zu verstehen:

| Transport         | Echtzeit-Updates | Streaming | Skalierbarkeit | Anwendungsfall           |
|-------------------|------------------|-----------|---------------|-------------------------|
| stdio             | Nein             | Nein      | Niedrig       | Lokale CLI-Tools        |
| SSE               | Ja               | Ja        | Mittel        | Web, Echtzeit-Updates   |
| Streamable HTTP   | Ja               | Ja        | Hoch          | Cloud, Multi-Client     |

> **Tipp:** Die Wahl des richtigen Transports beeinflusst Leistung, Skalierbarkeit und Nutzererlebnis. **Streamable HTTP** wird für moderne, skalierbare und Cloud-fähige Anwendungen empfohlen.

Beachten Sie die Transporte stdio und SSE, die in den vorigen Kapiteln gezeigt wurden, und wie streamfähiges HTTP der in diesem Kapitel behandelte Transport ist.

## Streaming: Konzepte und Motivation

Das Verständnis der grundlegenden Konzepte und Motivationen hinter Streaming ist wesentlich für die Umsetzung effektiver Echtzeit-Kommunikationssysteme.

**Streaming** ist eine Technik der Netzwerkprogrammierung, die es erlaubt, Daten in kleinen, handhabbaren Stücken oder als Ereignisfolge zu senden und zu empfangen, anstatt auf eine vollständige Antwort zu warten. Das ist besonders nützlich für:

- Große Dateien oder Datensätze.
- Echtzeit-Updates (z.B. Chat, Fortschrittsbalken).
- Lang laufende Berechnungen, bei denen man den Nutzer informiert halten möchte.

Folgendes sollten Sie auf hohem Niveau über Streaming wissen:

- Daten werden progressiv geliefert, nicht alle auf einmal.
- Der Client kann Daten verarbeiten, sobald sie eintreffen.
- Reduziert wahrgenommene Latenz und verbessert Nutzererlebnis.

### Warum Streaming verwenden?

Die Gründe für das Verwenden von Streaming sind folgende:

- Nutzer erhalten sofort Feedback, nicht nur am Ende
- Ermöglicht Echtzeitanwendungen und reaktionsfähige UIs
- Effizientere Nutzung von Netzwerk- und Rechenressourcen

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

Dieses Beispiel zeigt, wie ein Server eine Reihe von Nachrichten an den Client sendet, sobald sie verfügbar sind, statt auf alle Nachrichten zu warten.

**Wie es funktioniert:**

- Der Server liefert jede Nachricht, sobald sie bereit ist.
- Der Client empfängt und druckt jedes Stück, sobald es ankommt.

**Voraussetzungen:**

- Der Server muss eine Streaming-Antwort verwenden (z.B. `StreamingResponse` in FastAPI).
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

**Java-Implementierungsnotizen:**

- Verwendet Spring Boot's reaktiven Stack mit `Flux` für Streaming
- `ServerSentEvent` bietet strukturiertes Event-Streaming mit Ereignistypen
- `WebClient` mit `bodyToFlux()` ermöglicht reaktive Streaming-Verarbeitung
- `delayElements()` simuliert Verarbeitungszeit zwischen Ereignissen
- Ereignisse können Typen haben (`info`, `result`) für bessere Client-Verarbeitung

### Vergleich: Klassisches Streaming vs MCP Streaming

Die Unterschiede zwischen klassischem Streaming und Streaming in MCP lassen sich wie folgt darstellen:

| Merkmal               | Klassisches HTTP-Streaming       | MCP Streaming (Benachrichtigungen) |
|-----------------------|---------------------------------|------------------------------------|
| Hauptantwort          | Stückweise                      | Einzelantwort, am Ende             |
| Fortschrittsupdates   | Als Datenstücke gesendet         | Als Benachrichtigungen gesendet    |
| Client-Anforderungen  | Muss Stream verarbeiten         | Muss Nachrichtenhandler implementieren |
| Anwendungsfall        | Große Dateien, AI-Tokenstreams  | Fortschritt, Logs, Echtzeit-Feedback|

### Beobachtete Hauptunterschiede

Zusätzlich hier einige wichtige Unterschiede:

- **Kommunikationsmuster:**
  - Klassisches HTTP-Streaming: Verwendet einfache chunked Transfer-Encoding zum Senden in Stücken
  - MCP Streaming: Verwendet ein strukturiertes Benachrichtigungssystem mit JSON-RPC-Protokoll

- **Nachrichtenformat:**
  - Klassisches HTTP: Klare Textstücke mit Zeilenumbrüchen
  - MCP: Strukturierte LoggingMessageNotification-Objekte mit Metadaten

- **Client-Implementierung:**
  - Klassisches HTTP: Einfacher Client, der Streaming-Antworten verarbeitet
  - MCP: Anspruchsvollerer Client mit Nachrichtenhandler zur Verarbeitung unterschiedlicher Nachrichtentypen

- **Fortschrittsupdates:**
  - Klassisches HTTP: Fortschritt ist Teil des Hauptantwortstroms
  - MCP: Fortschritt wird in separaten Benachrichtigungen gesendet, Hauptantwort am Ende

### Empfehlungen

Einige Empfehlungen zur Wahl zwischen klassischem Streaming (wie oben mit `/stream` gezeigt) und Streaming via MCP:

- **Für einfache Streaming-Bedürfnisse:** Klassisches HTTP-Streaming ist einfacher zu implementieren und für grundlegende Streaming-Anforderungen ausreichend.

- **Für komplexe, interaktive Anwendungen:** MCP-Streaming bietet einen strukturierten Ansatz mit reichhaltigeren Metadaten und Trennung von Benachrichtigungen und Endergebnissen.

- **Für KI-Anwendungen:** Das Benachrichtigungssystem von MCP ist besonders nützlich für lang laufende KI-Aufgaben, bei denen Nutzer über Fortschritte informiert werden sollen.

## Streaming in MCP

Sie haben bis hierhin Empfehlungen und Vergleiche zwischen klassischem Streaming und MCP-Streaming gesehen. Jetzt gehen wir detailliert darauf ein, wie Sie Streaming in MCP konkret nutzen können.

Das Verständnis, wie Streaming im MCP-Framework funktioniert, ist essentiell, um reaktionsfähige Anwendungen zu bauen, die Nutzern während lang laufender Operationen Echtzeit-Feedback geben.

Im MCP geht es beim Streaming nicht darum, die Hauptantwort in Stücken zu senden, sondern **Benachrichtigungen** an den Client zu senden, während ein Tool eine Anfrage verarbeitet. Diese Benachrichtigungen können Fortschritt-Updates, Logs oder andere Ereignisse enthalten.

### Wie es funktioniert

Das Hauptergebnis wird weiterhin als Einzelausgabe gesendet. Benachrichtigungen können jedoch während der Verarbeitung als separate Nachrichten gesendet werden und so den Client in Echtzeit aktualisieren. Der Client muss in der Lage sein, diese Benachrichtigungen zu verarbeiten und anzuzeigen.

## Was ist eine Benachrichtigung?

Es wurde "Benachrichtigung" erwähnt – was bedeutet das im Kontext von MCP?

Eine Benachrichtigung ist eine Nachricht, die vom Server an den Client gesendet wird, um über Fortschritt, Status oder andere Ereignisse während einer lang laufenden Operation zu informieren. Benachrichtigungen erhöhen die Transparenz und verbessern das Nutzererlebnis.

Zum Beispiel soll ein Client eine Benachrichtigung senden, sobald der initiale Handshake mit dem Server erfolgt ist.

Eine Benachrichtigung sieht so als JSON-Nachricht aus:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Benachrichtigungen gehören in MCP zum Thema ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Veraltungs-Hinweis:** Die MCP-Spezifikation Release-Kandidat `2026-07-28` markiert die Logging-Primitiven als veraltet zugunsten von `stderr` für stdio-Transporte und OpenTelemetry für strukturierte Beobachtbarkeit. Logging funktioniert weiterhin in `2025-11-25` und mindestens ein Jahr nach jeder formellen Veraltung. Siehe [Was ändert sich in MCP: Der Release-Kandidat 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Um Logging zu aktivieren, muss der Server es als Feature/Fähigkeit einschalten wie folgt:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Je nach verwendetem SDK ist Logging möglicherweise standardmäßig aktiviert, oder Sie müssen es explizit in Ihrer Server-Konfiguration aktivieren.

Es gibt verschiedene Arten von Benachrichtigungen:

| Level     | Beschreibung                   | Beispiel-Anwendungsfall          |
|-----------|-------------------------------|---------------------------------|
| debug     | Detaillierte Debug-Informationen | Funktions-Ein-/Ausstiegspunkte  |
| info      | Allgemeine Informationsmeldungen | Fortschritts-Updates            |
| notice    | Normale, aber wichtige Ereignisse | Konfigurationsänderungen         |
| warning   | Warnzustände                  | Nutzung veralteter Features      |
| error     | Fehlerzustände                | Operationsfehler                 |
| critical  | Kritische Zustände            | Systemkomponenten-Ausfälle       |
| alert     | Sofortiges Handeln erforderlich | Datenkorruption erkannt          |
| emergency | System nicht nutzbar          | Vollständiger Systemausfall      |

## Implementierung von Benachrichtigungen in MCP

Zur Implementierung von Benachrichtigungen in MCP müssen Sie sowohl Server- als auch Client-Seite einrichten, um Echtzeit-Updates zu verarbeiten. So kann Ihre Anwendung Nutzern während lang laufender Operationen sofortiges Feedback geben.

### Serverseitig: Benachrichtigungen senden

Beginnen wir mit der Serverseite. In MCP definieren Sie Tools, die während der Anfrageverarbeitung Benachrichtigungen senden können. Der Server verwendet das Kontextobjekt (meistens `ctx`), um Nachrichten an den Client zu senden.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Im vorhergehenden Beispiel sendet das `process_files`-Tool drei Benachrichtigungen an den Client, während es jede Datei verarbeitet. Die Methode `ctx.info()` wird zum Senden von Informationsmeldungen verwendet.

Zusätzlich stellen Sie sicher, dass Ihr Server ein Streaming-Transportmedium verwendet (z.B. `streamable-http`) und Ihr Client einen Nachrichtenhandler implementiert, um Benachrichtigungen zu verarbeiten. So richten Sie den Server für die Nutzung des `streamable-http`-Transports ein:

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

In diesem .NET-Beispiel ist das `ProcessFiles`-Tool mit dem `Tool`-Attribut dekoriert und sendet drei Benachrichtigungen an den Client während der Verarbeitung jeder Datei. Die Methode `ctx.Info()` wird genutzt, um Informationsmeldungen zu senden.

Um Benachrichtigungen in Ihrem .NET MCP-Server zu aktivieren, stellen Sie sicher, dass Sie einen Streaming-Transport verwenden:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Clientseitig: Benachrichtigungen empfangen

Der Client muss einen Nachrichtenhandler implementieren, um Benachrichtigungen zu verarbeiten und anzuzeigen, sobald sie eintreffen.

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

Im obigen Code prüft die Funktion `message_handler`, ob die eingehende Nachricht eine Benachrichtigung ist. Falls ja, wird die Benachrichtigung ausgegeben; andernfalls wird sie als reguläre Servernachricht verarbeitet. Beachten Sie auch, wie die `ClientSession` mit dem `message_handler` initialisiert wird, um eingehende Benachrichtigungen zu verarbeiten.

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

In diesem .NET-Beispiel prüft die Funktion `MessageHandler`, ob die eingehende Nachricht eine Benachrichtigung ist. Wenn ja, wird die Benachrichtigung ausgegeben; andernfalls wird sie als reguläre Servernachricht verarbeitet. Die `ClientSession` wird mit dem Nachrichtenhandler über `ClientSessionOptions` initialisiert.

Um Benachrichtigungen zu aktivieren, sorgen Sie dafür, dass Ihr Server einen Streaming-Transport (wie `streamable-http`) nutzt und Ihr Client einen Nachrichtenhandler implementiert, um Benachrichtigungen zu verarbeiten.

## Fortschrittsbenachrichtigungen & Szenarien

Dieser Abschnitt erläutert das Konzept der Fortschrittsbenachrichtigungen in MCP, warum sie wichtig sind und wie man sie mit Streamable HTTP implementiert. Sie finden außerdem eine praktische Aufgabe zur Vertiefung.

Fortschrittsbenachrichtigungen sind Echtzeitnachrichten, die der Server während lang laufender Operationen an den Client sendet. Anstatt auf das Ende des gesamten Prozesses zu warten, hält der Server den Client über den aktuellen Status auf dem Laufenden. Das verbessert die Transparenz, das Nutzererlebnis und erleichtert das Debuggen.

**Beispiel:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Warum Fortschrittsbenachrichtigungen verwenden?

Fortschrittsbenachrichtigungen sind aus mehreren Gründen essenziell:

- **Besseres Nutzererlebnis:** Nutzer sehen Updates während des Vorgangs, nicht nur am Ende.
- **Echtzeit-Feedback:** Clients können Fortschrittsbalken oder Logs anzeigen, was die App reaktionsfähig macht.
- **Einfacheres Debuggen und Monitoring:** Entwickler und Nutzer können sehen, wo ein Prozess möglicherweise langsam ist oder hängt.

### Wie Fortschrittsbenachrichtigungen implementieren

So implementieren Sie Fortschrittsbenachrichtigungen in MCP:

- **Auf dem Server:** Verwenden Sie `ctx.info()` oder `ctx.log()`, um Benachrichtigungen zu senden, wenn ein Element verarbeitet wird. So erhält der Client Nachrichten vor dem Hauptresultat.
- **Auf dem Client:** Implementieren Sie einen Nachrichtenhandler, der Benachrichtigungen empfängt und anzeigt. Dieser unterscheidet zwischen Benachrichtigungen und dem Endergebnis.

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

Bei der Implementierung von MCP-Servern mit HTTP-basierten Transporten wird die Sicherheit zu einem vorrangigen Anliegen, das sorgfältige Beachtung mehrerer Angriffsvektoren und Schutzmechanismen erfordert.

### Übersicht

Sicherheit ist kritisch, wenn MCP-Server über HTTP zugänglich gemacht werden. Streamable HTTP bringt neue Angriffsflächen mit sich und erfordert sorgfältige Konfiguration.

### Wichtige Punkte

- **Origin-Header-Validierung**: Validieren Sie stets den `Origin`-Header, um DNS-Rebinding-Angriffe zu verhindern.
- **Localhost-Bindung**: Für die lokale Entwicklung binden Sie Server an `localhost`, um eine öffentliche Exponierung zu vermeiden.
- **Authentifizierung**: Implementieren Sie eine Authentifizierung (z. B. API-Schlüssel, OAuth) für produktive Deployments.
- **CORS**: Konfigurieren Sie Cross-Origin Resource Sharing (CORS)-Richtlinien, um den Zugriff einzuschränken.
- **HTTPS**: Nutzen Sie HTTPS in der Produktion, um den Datenverkehr zu verschlüsseln.

### Beste Praktiken

- Vertrauen Sie eingehenden Anfragen niemals ohne Validierung.
- Protokollieren und überwachen Sie alle Zugriffe und Fehler.
- Aktualisieren Sie regelmäßig Abhängigkeiten, um Sicherheitslücken zu schließen.

### Herausforderungen

- Die Balance zwischen Sicherheit und Entwicklungsfreundlichkeit
- Sicherstellung der Kompatibilität mit verschiedenen Client-Umgebungen

## Umstieg von SSE auf Streamable HTTP

Für Anwendungen, die derzeit Server-Sent Events (SSE) verwenden, bietet der Umstieg auf Streamable HTTP erweiterte Funktionen und eine bessere langfristige Nachhaltigkeit für Ihre MCP-Implementierungen.

### Warum upgraden?

Es gibt zwei überzeugende Gründe, von SSE auf Streamable HTTP umzusteigen:

- Streamable HTTP bietet bessere Skalierbarkeit, Kompatibilität und umfangreichere Benachrichtigungsunterstützung als SSE.
- Es ist der empfohlene Transport für neue MCP-Anwendungen.

### Migrationsschritte

So können Sie Ihre MCP-Anwendungen von SSE auf Streamable HTTP migrieren:

- **Aktualisieren Sie den Server-Code**, um `transport="streamable-http"` in `mcp.run()` zu verwenden.
- **Aktualisieren Sie den Client-Code**, um `streamablehttp_client` anstelle des SSE-Clients zu verwenden.
- **Implementieren Sie einen Nachrichten-Handler** im Client zur Verarbeitung von Benachrichtigungen.
- **Testen Sie die Kompatibilität** mit vorhandenen Tools und Workflows.

### Kompatibilität beibehalten

Es wird empfohlen, während des Migrationsprozesses die Kompatibilität mit bestehenden SSE-Clients aufrechtzuerhalten. Hier einige Strategien:

- Unterstützen Sie sowohl SSE als auch Streamable HTTP, indem Sie beide Transporte auf verschiedenen Endpunkten betreiben.
- Migrieren Sie die Clients schrittweise zum neuen Transport.

### Herausforderungen

Achten Sie während der Migration auf folgende Herausforderungen:

- Sicherstellung, dass alle Clients aktualisiert werden
- Umgang mit Unterschieden bei der Benachrichtigungsübermittlung

## Sicherheitsaspekte

Sicherheit sollte höchste Priorität bei der Implementierung eines Servers haben, insbesondere bei der Nutzung von HTTP-basierten Transporten wie Streamable HTTP in MCP. 

Bei der Implementierung von MCP-Servern mit HTTP-basierten Transporten wird die Sicherheit zu einem vorrangigen Anliegen, das sorgfältige Beachtung mehrerer Angriffsvektoren und Schutzmechanismen erfordert.

### Übersicht

Sicherheit ist kritisch, wenn MCP-Server über HTTP zugänglich gemacht werden. Streamable HTTP bringt neue Angriffsflächen mit sich und erfordert sorgfältige Konfiguration.

Hier einige wichtige Sicherheitsaspekte:

- **Origin-Header-Validierung**: Validieren Sie stets den `Origin`-Header, um DNS-Rebinding-Angriffe zu verhindern.
- **Localhost-Bindung**: Für die lokale Entwicklung binden Sie Server an `localhost`, um eine öffentliche Exponierung zu vermeiden.
- **Authentifizierung**: Implementieren Sie eine Authentifizierung (z. B. API-Schlüssel, OAuth) für produktive Deployments.
- **CORS**: Konfigurieren Sie Cross-Origin Resource Sharing (CORS)-Richtlinien, um den Zugriff einzuschränken.
- **HTTPS**: Nutzen Sie HTTPS in der Produktion, um den Datenverkehr zu verschlüsseln.

### Beste Praktiken

Zusätzlich hier einige beste Praktiken zur Sicherheit bei der Implementierung Ihres MCP-Streaming-Servers:

- Vertrauen Sie eingehenden Anfragen niemals ohne Validierung.
- Protokollieren und überwachen Sie alle Zugriffe und Fehler.
- Aktualisieren Sie regelmäßig Abhängigkeiten, um Sicherheitslücken zu schließen.

### Herausforderungen

Bei der Umsetzung von Sicherheit in MCP-Streaming-Servern stehen Sie vor einigen Herausforderungen:

- Die Balance zwischen Sicherheit und Entwicklungsfreundlichkeit
- Sicherstellung der Kompatibilität mit verschiedenen Client-Umgebungen

### Aufgabe: Erstellen Sie Ihre eigene Streaming-MCP-App

**Szenario:**
Erstellen Sie einen MCP-Server und -Client, wobei der Server eine Liste von Elementen (z. B. Dateien oder Dokumente) verarbeitet und für jedes verarbeitete Element eine Benachrichtigung sendet. Der Client soll jede Benachrichtigung beim Eintreffen anzeigen.

**Schritte:**

1. Implementieren Sie ein Server-Tool, das eine Liste verarbeitet und für jedes Element Benachrichtigungen sendet.
2. Implementieren Sie einen Client mit einem Nachrichten-Handler, der Benachrichtigungen in Echtzeit anzeigt.
3. Testen Sie Ihre Implementierung, indem Sie Server und Client gleichzeitig ausführen und die Benachrichtigungen beobachten.

[Lösung](./solution/README.md)

## Weiterführende Literatur & Was als Nächstes?

Um Ihre Reise mit MCP-Streaming fortzusetzen und Ihr Wissen zu erweitern, bietet dieser Abschnitt weitere Ressourcen und empfohlene nächste Schritte zum Erstellen fortgeschrittener Anwendungen.

### Weiterführende Literatur

- [Microsoft: Einführung in HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Was als Nächstes?

- Versuchen Sie, fortgeschrittenere MCP-Tools zu entwickeln, die Streaming für Echtzeit-Analysen, Chat oder kollaboratives Bearbeiten verwenden.
- Erkunden Sie die Integration von MCP-Streaming mit Frontend-Frameworks (React, Vue usw.) für Live-UI-Aktualisierungen.
- Als Nächstes: [Nutzung des AI Toolkits für VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->