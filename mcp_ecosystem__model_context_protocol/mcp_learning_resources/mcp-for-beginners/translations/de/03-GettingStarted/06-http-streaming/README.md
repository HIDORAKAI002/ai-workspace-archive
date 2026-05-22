# HTTPS-Streaming mit Model Context Protocol (MCP)

Dieses Kapitel bietet eine umfassende Anleitung zur Implementierung von sicherem, skalierbarem und Echtzeit-Streaming mit dem Model Context Protocol (MCP) unter Verwendung von HTTPS. Es behandelt die Motivation für Streaming, die verfügbaren Transportmechanismen, wie man streamfähiges HTTP in MCP implementiert, Sicherheitsbest Practices, Migration von SSE sowie praktische Hinweise zum Erstellen eigener Streaming-MCP-Anwendungen.

## Transportmechanismen und Streaming in MCP

Dieser Abschnitt untersucht die verschiedenen in MCP verfügbaren Transportmechanismen und ihre Rolle bei der Ermöglichung von Streaming-Fähigkeiten für die Echtzeitkommunikation zwischen Clients und Servern.

### Was ist ein Transportmechanismus?

Ein Transportmechanismus definiert, wie Daten zwischen Client und Server ausgetauscht werden. MCP unterstützt mehrere Transporttypen, um unterschiedlichen Umgebungen und Anforderungen gerecht zu werden:

- **stdio**: Standard-Eingabe/-Ausgabe, geeignet für lokale und CLI-basierte Tools. Einfach, aber nicht für Web oder Cloud geeignet.
- **SSE (Server-Sent Events)**: Ermöglicht es Servern, Echtzeit-Updates über HTTP an Clients zu senden. Gut für Web-UIs, aber begrenzt in Skalierbarkeit und Flexibilität. Ab MCP-Spezifikation 2025-06-18 wurde der eigenständige SSE-Transport eingestellt und durch den "Streamable HTTP"-Transport ersetzt.
- **Streamable HTTP**: Moderner, HTTP-basierter Streaming-Transport, unterstützt Benachrichtigungen und bessere Skalierbarkeit. Empfohlen für die meisten Produktions- und Cloud-Szenarien.

### Vergleichstabelle

Schauen Sie sich die folgende Vergleichstabelle an, um die Unterschiede zwischen diesen Transportmechanismen zu verstehen:

| Transport         | Echtzeit-Updates | Streaming | Skalierbarkeit | Anwendungsfall          |
|-------------------|------------------|-----------|---------------|-------------------------|
| stdio             | Nein             | Nein      | Gering        | Lokale CLI-Tools        |
| SSE               | Ja               | Ja        | Mittel        | Web, Echtzeit-Updates   |
| Streamable HTTP   | Ja               | Ja        | Hoch          | Cloud, Multi-Client     |

> **Tipp:** Die Wahl des richtigen Transports wirkt sich auf Leistung, Skalierbarkeit und Benutzererlebnis aus. **Streamable HTTP** wird für moderne, skalierbare und cloudfähige Anwendungen empfohlen.

Beachten Sie die Transports stdio und SSE, die in den vorherigen Kapiteln gezeigt wurden, und wie streamable HTTP der Transport ist, der in diesem Kapitel behandelt wird.

## Streaming: Konzepte und Motivation

Das Verständnis der grundlegenden Konzepte und Motivationen hinter Streaming ist entscheidend für die Implementierung effektiver Echtzeit-Kommunikationssysteme.

**Streaming** ist eine Technik in der Netzwerkprogrammierung, die es erlaubt, Daten in kleinen, handhabbaren Stücken oder als Sequenz von Ereignissen zu senden und zu empfangen, anstatt auf eine vollständige Antwort zu warten. Dies ist besonders nützlich bei:

- Großen Dateien oder Datensätzen.
- Echtzeit-Updates (z.B. Chat, Fortschrittsbalken).
- Lang laufenden Berechnungen, bei denen der Benutzer informiert bleiben soll.

Folgendes sollten Sie auf hoher Ebene über Streaming wissen:

- Daten werden nach und nach geliefert, nicht alles auf einmal.
- Der Client kann Daten verarbeiten, sobald sie eintreffen.
- Reduziert die wahrgenommene Latenz und verbessert das Benutzererlebnis.

### Warum Streaming verwenden?

Die Gründe für den Einsatz von Streaming sind folgende:

- Nutzer erhalten sofort Feedback, nicht erst am Ende.
- Ermöglicht Echtzeitanwendungen und reaktionsfähige UIs.
- Effizientere Nutzung von Netzwerk- und Rechenressourcen.

### Einfaches Beispiel: HTTP-Streaming Server & Client

Hier ist ein einfaches Beispiel dafür, wie Streaming implementiert werden kann:

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

Dieses Beispiel zeigt, wie ein Server eine Serie von Nachrichten an den Client sendet, sobald diese verfügbar sind, anstatt auf die Fertigstellung aller Nachrichten zu warten.

**Funktionsweise:**

- Der Server gibt jede Nachricht aus, sobald sie bereit ist.
- Der Client empfängt und druckt jedes Datenstück, sobald es ankommt.

**Voraussetzungen:**

- Der Server muss eine Streaming-Antwort verwenden (z.B. `StreamingResponse` in FastAPI).
- Der Client muss die Antwort als Stream verarbeiten (`stream=True` bei requests).
- Der Content-Type ist üblicherweise `text/event-stream` oder `application/octet-stream`.

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

- Verwendet den reaktiven Stack von Spring Boot mit `Flux` für Streaming.
- `ServerSentEvent` bietet strukturiertes Event-Streaming mit Event-Typen.
- `WebClient` mit `bodyToFlux()` ermöglicht reaktiven Stream-Konsum.
- `delayElements()` simuliert Verarbeitungszeit zwischen Events.
- Events können Typen wie (`info`, `result`) für bessere Client-Verarbeitung haben.

### Vergleich: Klassisches Streaming vs. MCP-Streaming

Die Unterschiede zwischen dem klassischen Streaming und dem Streaming in MCP lassen sich wie folgt darstellen:

| Merkmal                | Klassisches HTTP-Streaming        | MCP Streaming (Benachrichtigungen)   |
|------------------------|----------------------------------|-------------------------------------|
| Hauptantwort           | Chunked                          | Einzelne, am Ende                   |
| Fortschrittsupdates    | Werden als Datenchunks gesendet  | Werden als Benachrichtigungen gesendet |
| Client-Anforderungen   | Muss Stream verarbeiten           | Muss Nachrichten-Handler implementieren |
| Anwendungsfall         | Große Dateien, KI-Token-Streams  | Fortschritt, Logs, Echtzeit-Feedback |

### Hauptunterschiede im Überblick

Zusätzlich einige wesentliche Unterschiede:

- **Kommunikationsmuster:**
  - Klassisches HTTP-Streaming: Verwendet einfache Chunked-Transfer-Encoding, um Daten in Stücken zu senden.
  - MCP-Streaming: Verwendet ein strukturiertes Benachrichtigungssystem mit JSON-RPC-Protokoll.

- **Nachrichtenformat:**
  - Klassisches HTTP: Plain-Text-Chunks mit Zeilenumbrüchen.
  - MCP: Strukturierte LoggingMessageNotification-Objekte mit Metadaten.

- **Client-Implementierung:**
  - Klassisches HTTP: Einfacher Client, der Streaming-Antworten verarbeitet.
  - MCP: Anspruchsvollerer Client mit Nachrichten-Handler zur Verarbeitung verschiedener Nachrichtentypen.

- **Fortschrittsupdates:**
  - Klassisches HTTP: Fortschritt ist Teil des Hauptantwort-Streams.
  - MCP: Fortschritte werden über separate Benachrichtigungsnachrichten gesendet, während die Hauptantwort am Ende kommt.

### Empfehlungen

Wir empfehlen Folgendes für die Wahl zwischen klassischem Streaming (beispielsweise über einen Endpunkt wie `/stream`) und Streaming via MCP:

- **Für einfache Streaming-Anforderungen:** Klassisches HTTP-Streaming ist einfacher zu implementieren und ausreichend für Basis-Streaming.
- **Für komplexe, interaktive Anwendungen:** MCP-Streaming bietet einen strukturierten Ansatz mit reichhaltigeren Metadaten und Trennung von Benachrichtigungen und Endergebnis.
- **Für KI-Anwendungen:** Das Benachrichtigungssystem von MCP ist besonders nützlich für lang laufende KI-Aufgaben, bei denen Nutzer über Fortschritte informiert werden sollen.

## Streaming in MCP

Sie haben bisher Empfehlungen und Vergleiche zwischen klassischem Streaming und MCP-Streaming gesehen. Nun wollen wir im Detail betrachten, wie Sie Streaming in MCP nutzen können.

Das Verständnis, wie Streaming im Rahmen von MCP funktioniert, ist essentiell für den Aufbau reaktiver Anwendungen, die Benutzern während lang laufender Operationen Echtzeit-Feedback bieten.

In MCP geht es beim Streaming nicht darum, die Hauptantwort in Stücken zu senden, sondern **Benachrichtigungen** an den Client zu schicken, während ein Tool eine Anfrage verarbeitet. Diese Benachrichtigungen können Fortschrittsupdates, Logs oder andere Ereignisse enthalten.

### Wie funktioniert das?

Das Hauptergebnis wird weiterhin als einzelne Antwort gesendet. Während der Verarbeitung können jedoch Benachrichtigungen als separate Nachrichten gesendet werden, die den Client in Echtzeit aktualisieren. Der Client muss diese Benachrichtigungen verarbeiten und anzeigen können.

## Was ist eine Benachrichtigung?

Wir haben den Begriff "Benachrichtigung" verwendet – was bedeutet das im Kontext von MCP?

Eine Benachrichtigung ist eine Nachricht, die vom Server an den Client gesendet wird, um über Fortschritt, Status oder andere Ereignisse während einer lang laufenden Operation zu informieren. Benachrichtigungen verbessern Transparenz und Benutzererlebnis.

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

Benachrichtigungen gehören einem Thema in MCP an, das als ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) bezeichnet wird.

Damit Logging funktioniert, muss der Server es als Feature/Fähigkeit aktivieren, wie folgt:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Je nach verwendetem SDK kann Logging standardmäßig aktiviert sein oder muss explizit in der Serverkonfiguration eingeschaltet werden.

Es gibt verschiedene Arten von Benachrichtigungen:

| Level     | Beschreibung                 | Beispielanwendungsfall          |
|-----------|-----------------------------|-------------------------------|
| debug     | Detaillierte Debug-Informationen | Funktions-Eintritts-/Austrittspunkte |
| info      | Allgemeine Informationsmeldungen | Fortschrittsupdates            |
| notice    | Normale, aber bedeutende Ereignisse | Konfigurationsänderungen       |
| warning   | Warnbedingungen             | Verwendung veralteter Features  |
| error     | Fehlerbedingungen           | Operationale Fehler           |
| critical  | Kritische Bedingungen       | Ausfälle von Systemkomponenten  |
| alert     | Sofortiges Handeln erforderlich | Datenkorruption entdeckt      |
| emergency | System unbrauchbar          | Komplettausfall des Systems    |

## Benachrichtigungen in MCP implementieren

Um Benachrichtigungen in MCP umzusetzen, müssen sowohl Server als auch Client so eingerichtet werden, dass sie Echtzeit-Updates verarbeiten können. So kann Ihre Anwendung den Nutzern während lang laufender Operationen unmittelbar Feedback geben.

### Serverseitig: Benachrichtigungen senden

Beginnen wir auf der Serverseite. In MCP definieren Sie Tools, die während der Verarbeitung von Anfragen Benachrichtigungen senden können. Der Server nutzt das Kontext-Objekt (meist `ctx`), um Nachrichten an den Client zu senden.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Im vorigen Beispiel sendet das Tool `process_files` drei Benachrichtigungen an den Client, während es jede Datei verarbeitet. Die Methode `ctx.info()` wird verwendet, um Informationsmeldungen zu senden.

Zusätzlich: Um Benachrichtigungen zu ermöglichen, stellen Sie sicher, dass Ihr Server einen Streaming-Transport verwendet (wie `streamable-http`) und Ihr Client einen Nachrichten-Handler zur Verarbeitung von Benachrichtigungen implementiert. So können Sie den Server für die Verwendung des `streamable-http`-Transports konfigurieren:

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

Im .NET-Beispiel ist das Tool `ProcessFiles` mit dem `Tool`-Attribut versehen und sendet während der Verarbeitung von Dateien drei Benachrichtigungen an den Client. Die Methode `ctx.Info()` dient zum Senden von Informationsmeldungen.

Um Benachrichtigungen in Ihrem .NET MCP-Server zu ermöglichen, stellen Sie sicher, dass Sie einen Streaming-Transport verwenden:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Clientseitig: Benachrichtigungen empfangen

Der Client muss einen Nachrichten-Handler implementieren, der Benachrichtigungen verarbeitet und anzeigt, sobald sie eintreffen.

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

Im obigen Code prüft die Funktion `message_handler`, ob die empfangene Nachricht eine Benachrichtigung ist. Falls ja, wird sie ausgegeben; andernfalls wird die Nachricht als reguläre Servernachricht verarbeitet. Beachten Sie auch, wie die `ClientSession` mit dem `message_handler` initialisiert wird, um eingehende Benachrichtigungen zu verarbeiten.

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

Im .NET-Beispiel überprüft die Funktion `MessageHandler`, ob eine Nachricht eine Benachrichtigung ist. Ist dies der Fall, wird die Benachrichtigung ausgegeben; ansonsten wird sie als reguläre Servernachricht verarbeitet. Die `ClientSession` wird über die `ClientSessionOptions` mit dem Nachrichten-Handler initialisiert.

Um Benachrichtigungen zu verwenden, vergewissern Sie sich, dass Ihr Server einen Streaming-Transport (wie `streamable-http`) nutzt und Ihr Client einen Nachrichten-Handler zur Verarbeitung implementiert.

## Fortschritts-Benachrichtigungen & Anwendungsfälle

Dieser Abschnitt erklärt das Konzept von Fortschritts-Benachrichtigungen in MCP, warum sie wichtig sind und wie man sie mit Streamable HTTP umsetzt. Außerdem finden Sie eine praktische Übung zur Festigung Ihres Wissens.

Fortschritts-Benachrichtigungen sind Echtzeitmeldungen, die der Server während lang laufender Operationen an den Client sendet. Anstatt auf den Abschluss des gesamten Prozesses zu warten, hält der Server den Client über den aktuellen Stand auf dem Laufenden. Das erhöht Transparenz, Benutzererfahrung und erleichtert Debugging.

**Beispiel:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Warum Fortschritts-Benachrichtigungen verwenden?

Fortschritts-Benachrichtigungen sind aus mehreren Gründen wichtig:

- **Besseres Benutzererlebnis:** Nutzer sehen Updates während des Arbeitsprozesses, nicht nur am Ende.
- **Echtzeit-Feedback:** Clients können Fortschrittsbalken oder Logs anzeigen, was die App reaktionsfähiger macht.
- **Einfacheres Debugging und Monitoring:** Entwickler und Nutzer erkennen, wo ein Prozess langsam ist oder hängt.

### Wie Fortschritts-Benachrichtigungen implementieren?

So implementieren Sie Fortschritts-Benachrichtigungen in MCP:

- **Serverseitig:** Verwenden Sie `ctx.info()` oder `ctx.log()`, um Benachrichtigungen zu senden, während jedes Element verarbeitet wird. Diese Nachrichten werden an den Client gesendet, bevor das Hauptergebnis bereit ist.
- **Clientseitig:** Implementieren Sie einen Nachrichten-Handler, der Benachrichtigungen empfängt und anzeigt. Der Handler unterscheidet zwischen Benachrichtigungen und Endergebnis.

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

## Sicherheitsüberlegungen

Bei der Implementierung von MCP-Servern mit HTTP-basierten Transporten ist Sicherheit eine äußerst wichtige Sorge, die sorgfältige Beachtung mehrerer Angriffsvektoren und Schutzmechanismen erfordert.

### Überblick

Sicherheit ist ein kritischer Aspekt beim Bereitstellen von MCP-Servern über HTTP. Streamable HTTP bringt neue Angriffsflächen mit sich und erfordert sorgfältige Konfiguration.

### Wichtige Punkte

- **Validierung des Origin-Headers:** Validieren Sie stets den `Origin`-Header, um DNS-Rebinding-Angriffe zu verhindern.
- **Bindung an localhost:** Für lokale Entwicklung binden Sie Server an `localhost`, um zu vermeiden, dass sie öffentlich zugänglich sind.
- **Authentifizierung:** Implementieren Sie für Produktionsumgebungen eine Authentifizierung (z.B. API-Schlüssel, OAuth).
- **CORS:** Konfigurieren Sie Cross-Origin Resource Sharing (CORS)-Richtlinien zur Zugriffsbeschränkung.
- **HTTPS:** Nutzen Sie HTTPS in der Produktion zur Verschlüsselung des Datenverkehrs.

### Best Practices

- Vertrauen Sie eingehenden Anfragen niemals ohne Prüfung.
- Protokollieren und überwachen Sie alle Zugriffe und Fehler.
- Aktualisieren Sie regelmäßig Abhängigkeiten, um Sicherheitslücken zu beheben.

### Herausforderungen
- Balance zwischen Sicherheit und einfacher Entwicklung
- Sicherstellung der Kompatibilität mit verschiedenen Client-Umgebungen

## Upgrade von SSE zu Streamable HTTP

Für Anwendungen, die derzeit Server-Sent Events (SSE) verwenden, bietet die Migration zu Streamable HTTP erweiterte Funktionen und eine bessere langfristige Nachhaltigkeit für Ihre MCP-Implementierungen.

### Warum upgraden?

Es gibt zwei überzeugende Gründe, von SSE auf Streamable HTTP umzusteigen:

- Streamable HTTP bietet bessere Skalierbarkeit, Kompatibilität und reichhaltigere Benachrichtigungsunterstützung als SSE.
- Es ist der empfohlene Transport für neue MCP-Anwendungen.

### Migrationsschritte

So können Sie von SSE zu Streamable HTTP in Ihren MCP-Anwendungen migrieren:

- **Aktualisieren Sie den Servercode**, um `transport="streamable-http"` in `mcp.run()` zu verwenden.
- **Aktualisieren Sie den Clientcode**, um `streamablehttp_client` anstelle des SSE-Clients zu verwenden.
- **Implementieren Sie einen Nachrichtenhandler** im Client, um Benachrichtigungen zu verarbeiten.
- **Testen Sie die Kompatibilität** mit vorhandenen Tools und Workflows.

### Kompatibilität erhalten

Es wird empfohlen, während des Migrationsprozesses die Kompatibilität mit bestehenden SSE-Clients aufrechtzuerhalten. Hier einige Strategien:

- Sie können sowohl SSE als auch Streamable HTTP unterstützen, indem Sie beide Transports an unterschiedlichen Endpunkten ausführen.
- Migrieren Sie Clients schrittweise zum neuen Transport.

### Herausforderungen

Stellen Sie sicher, dass Sie während der Migration folgende Herausforderungen angehen:

- Sicherstellen, dass alle Clients aktualisiert werden
- Umgang mit Unterschieden in der Benachrichtigungszustellung

## Sicherheitsüberlegungen

Sicherheit sollte eine oberste Priorität sein, wenn Sie einen Server implementieren, insbesondere bei der Verwendung von HTTP-basierten Transporten wie Streamable HTTP in MCP.

Bei der Implementierung von MCP-Servern mit HTTP-basierten Transporten wird Sicherheit zu einem besonders wichtigen Thema, das sorgfältige Beachtung verschiedener Angriffsvektoren und Schutzmechanismen erfordert.

### Überblick

Sicherheit ist entscheidend, wenn MCP-Server über HTTP bereitgestellt werden. Streamable HTTP bringt neue Angriffsflächen mit sich und erfordert sorgfältige Konfiguration.

Hier sind einige wichtige Sicherheitsüberlegungen:

- **Validierung des Origin-Header**: Validieren Sie immer den `Origin`-Header, um DNS-Rebinding-Angriffe zu verhindern.
- **Localhost-Bindung**: Binden Sie Server zur lokalen Entwicklung an `localhost`, um zu verhindern, dass sie öffentlich im Internet erreichbar sind.
- **Authentifizierung**: Implementieren Sie Authentifizierung (z. B. API-Schlüssel, OAuth) für produktive Umgebungen.
- **CORS**: Konfigurieren Sie Cross-Origin Resource Sharing (CORS)-Richtlinien, um den Zugriff einzuschränken.
- **HTTPS**: Nutzen Sie in der Produktion HTTPS, um den Datenverkehr zu verschlüsseln.

### Best Practices

Darüber hinaus gibt es einige Best Practices, die Sie bei der Implementierung der Sicherheit in Ihrem MCP-Streaming-Server beachten sollten:

- Vertrauen Sie eingehenden Anfragen niemals ohne Validierung.
- Protokollieren und überwachen Sie alle Zugriffe und Fehler.
- Aktualisieren Sie regelmäßig Abhängigkeiten, um Sicherheitslücken zu schließen.

### Herausforderungen

Bei der Implementierung von Sicherheit in MCP-Streaming-Servern werden Sie auf folgende Herausforderungen stoßen:

- Balance zwischen Sicherheit und einfacher Entwicklung
- Sicherstellung der Kompatibilität mit verschiedenen Client-Umgebungen

### Aufgabe: Erstellen Sie Ihre eigene Streaming-MCP-App

**Szenario:**  
Erstellen Sie einen MCP-Server und -Client, bei dem der Server eine Liste von Elementen (z. B. Dateien oder Dokumenten) verarbeitet und für jedes verarbeitete Element eine Benachrichtigung sendet. Der Client sollte jede eingehende Benachrichtigung anzeigen.

**Schritte:**

1. Implementieren Sie ein Server-Tool, das eine Liste verarbeitet und für jedes Element Benachrichtigungen sendet.
2. Implementieren Sie einen Client mit einem Nachrichtenhandler, um Benachrichtigungen in Echtzeit anzuzeigen.
3. Testen Sie Ihre Implementierung, indem Sie sowohl Server als auch Client ausführen und die Benachrichtigungen beobachten.

[Solution](./solution/README.md)

## Weiterführende Literatur & Was kommt als Nächstes?

Um Ihre Reise mit MCP-Streaming fortzusetzen und Ihr Wissen zu erweitern, bietet dieser Abschnitt zusätzliche Ressourcen und vorgeschlagene nächste Schritte zum Erstellen fortgeschrittener Anwendungen.

### Weiterführende Literatur

- [Microsoft: Einführung in HTTP-Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming-Anfragen](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Was kommt als Nächstes?

- Versuchen Sie, fortgeschrittenere MCP-Tools zu bauen, die Streaming für Echtzeit-Analysen, Chat oder kollaboratives Bearbeiten nutzen.
- Erkunden Sie die Integration von MCP-Streaming mit Frontend-Frameworks (React, Vue usw.) für Live-UI-Aktualisierungen.
- Nächstes: [Verwendung des AI Toolkits für VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->