# HTTPS Streaming met Model Context Protocol (MCP)

Dit hoofdstuk biedt een uitgebreide gids voor het implementeren van veilige, schaalbare en realtime streaming met het Model Context Protocol (MCP) via HTTPS. Het behandelt de motivatie voor streaming, de beschikbare transportmechanismen, hoe streaming HTTP in MCP te implementeren, beveiligingsbest practices, migratie van SSE en praktische richtlijnen voor het bouwen van je eigen streaming MCP-applicaties.

> **Vooruitblik:** deze les beschrijft Streamable HTTP onder **MCP Specificatie 2025-11-25**, waarbij een sessie wordt opgezet tijdens `initialize` en vastgezet met een `Mcp-Session-Id` header. De release candidate `2026-07-28` verwijdert de handshake en sessie-ID volledig, waardoor elk verzoek zelfstandig is en naar elke serverinstantie kan worden gerouteerd zonder sticky sessions. Zie [Wat verandert er in MCP: De 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) voor details.

## Transportmechanismen en Streaming in MCP

Deze sectie onderzoekt de verschillende transportmechanismen beschikbaar in MCP en hun rol bij het mogelijk maken van streamingfunctionaliteit voor realtime communicatie tussen clients en servers.

### Wat is een Transportmechanisme?

Een transportmechanisme definieert hoe gegevens worden uitgewisseld tussen de client en server. MCP ondersteunt meerdere transporttypen om aan verschillende omgevingen en vereisten te voldoen:

- **stdio**: Standaard input/output, geschikt voor lokale en CLI-gebaseerde tools. Eenvoudig maar niet geschikt voor web of cloud.
- **SSE (Server-Sent Events)**: Hiermee kunnen servers realtime updates naar clients pushen via HTTP. Geschikt voor web UI's, maar beperkt in schaalbaarheid en flexibiliteit. Vanaf MCP Specificatie 2025-06-18 is het standalone SSE (Server-Sent Events) transport afgeschaft en vervangen door het "Streamable HTTP" transport.
- **Streamable HTTP**: Modern HTTP-gebaseerd streaming transport, ondersteunt notificaties en betere schaalbaarheid. Aanbevolen voor de meeste productie- en cloudscenario's.

### Vergelijkingstabel

Bekijk de onderstaande vergelijkingstabel om de verschillen tussen deze transportmechanismen te begrijpen:

| Transport         | Realtime Updates | Streaming | Schaalbaarheid | Gebruikssituatie            |
|-------------------|------------------|-----------|----------------|----------------------------|
| stdio             | Nee              | Nee       | Laag           | Lokale CLI-tools           |
| SSE               | Ja               | Ja        | Middelmatig    | Web, realtime updates      |
| Streamable HTTP   | Ja               | Ja        | Hoog           | Cloud, meerdere clients    |

> **Tip:** De keuze van het juiste transport beïnvloedt de prestaties, schaalbaarheid en gebruikerservaring. **Streamable HTTP** wordt aanbevolen voor moderne, schaalbare en cloudklare applicaties.

Let op de transports stdio en SSE die je in de vorige hoofdstukken hebt gezien en hoe streamable HTTP het transport is dat in dit hoofdstuk wordt behandeld.

## Streaming: Concepten en Motivatie

Het begrijpen van de fundamentele concepten en motivaties achter streaming is essentieel voor het implementeren van effectieve realtime communicatiesystemen.

**Streaming** is een techniek in netwerkprogrammering waarbij gegevens in kleine, beheersbare stukjes of als een reeks gebeurtenissen worden verzonden en ontvangen, in plaats van te wachten tot de volledige respons klaar is. Dit is vooral nuttig voor:

- Grote bestanden of datasets.
- Realtime updates (bijv. chat, voortgangsbalken).
- Langdurige berekeningen waarbij je de gebruiker op de hoogte wilt houden.

Dit is wat je op hoofdlijnen over streaming moet weten:

- Gegevens worden progressief geleverd, niet allemaal tegelijk.
- De client kan data verwerken zodra deze binnenkomt.
- Vermindert waargenomen latency en verbetert gebruikerservaring.

### Waarom streaming gebruiken?

De redenen om streaming te gebruiken zijn als volgt:

- Gebruikers krijgen direct feedback, niet pas aan het einde.
- Maakt realtime applicaties en responsieve UI's mogelijk.
- Efficiënter gebruik van netwerk- en computerbronnen.

### Eenvoudig Voorbeeld: HTTP Streaming Server & Client

Hier is een eenvoudig voorbeeld van hoe streaming geïmplementeerd kan worden:

#### Python

**Server (Python, met FastAPI en StreamingResponse):**

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

**Client (Python, met requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Dit voorbeeld toont een server die een reeks berichten naar de client stuurt zodra ze beschikbaar zijn, in plaats van te wachten tot alle berichten klaar zijn.

**Hoe het werkt:**

- De server levert elk bericht zodra het klaar is.
- De client ontvangt en print elk stuk zodra het binnenkomt.

**Vereisten:**

- De server moet een streamingrespons gebruiken (bijv. `StreamingResponse` in FastAPI).
- De client moet de respons als stream verwerken (`stream=True` in requests).
- Content-Type is meestal `text/event-stream` of `application/octet-stream`.

#### Java

**Server (Java, met Spring Boot en Server-Sent Events):**

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

**Client (Java, met Spring WebFlux WebClient):**

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

**Java Implementatienotities:**

- Gebruikt Spring Boot's reactieve stack met `Flux` voor streaming.
- `ServerSentEvent` biedt gestructureerde event streaming met event types.
- `WebClient` met `bodyToFlux()` maakt reactieve streamverwerking mogelijk.
- `delayElements()` simuleert verwerkingstijd tussen events.
- Events kunnen types hebben (`info`, `result`) voor betere clientverwerking.

### Vergelijking: Klassieke Streaming vs MCP Streaming

De verschillen tussen de klassieke manier van streaming en de manier waarop het in MCP werkt, kunnen als volgt samengevat worden:

| Kenmerk                | Klassieke HTTP Streaming       | MCP Streaming (Notificaties)       |
|------------------------|-------------------------------|-----------------------------------|
| Hoofdresponse          | Gefragmenteerd                | Enkelvoudig, aan het einde        |
| Voortgangsupdates      | Verzonden als datablokken      | Verzonden als notificaties        |
| Clientvereisten        | Moet stream verwerken          | Moet message handler implementeren|
| Gebruikssituaties      | Grote bestanden, AI token streams | Voortgang, logs, realtime feedback |

### Belangrijke Verschillen

Daarnaast zijn er enkele belangrijke verschillen:

- **Communicatiepatroon:**
  - Klassieke HTTP streaming: gebruikt eenvoudige chunked transfer encoding om data in blokken te verzenden.
  - MCP streaming: gebruikt een gestructureerd notificatiesysteem met JSON-RPC protocol.

- **Berichtformaat:**
  - Klassieke HTTP: platte tekstblokken met nieuwe regels.
  - MCP: gestructureerde LoggingMessageNotification objecten met metadata.

- **Clientimplementatie:**
  - Klassieke HTTP: eenvoudige client die streaming responses verwerkt.
  - MCP: complexere client met een message handler om verschillende soorten berichten te verwerken.

- **Voortgangsupdates:**
  - Klassieke HTTP: voortgang maakt deel uit van de hoofdresponse stream.
  - MCP: voortgang wordt verzonden via aparte notificatieberichten terwijl de hoofdresponse aan het einde komt.

### Aanbevelingen

Er zijn enkele aanbevelingen bij het kiezen tussen klassieke streaming (zoals het endpoint dat we je hierboven hebben laten zien met `/stream`) versus streaming via MCP.

- **Voor eenvoudige streamingbehoeften:** Klassieke HTTP streaming is eenvoudiger te implementeren en volstaat voor basis streaming.

- **Voor complexe, interactieve applicaties:** MCP streaming biedt een meer gestructureerde aanpak met rijkere metadata en scheiding tussen notificaties en definitieve resultaten.

- **Voor AI-applicaties:** Het notificatiesysteem van MCP is bijzonder nuttig voor langdurige AI-taken waarbij je gebruikers wilt informeren over de voortgang.

## Streaming in MCP

Oké, je hebt tot nu toe aanbevelingen en vergelijkingen gezien over het verschil tussen klassieke streaming en streaming in MCP. Laten we nu precies ingaan op hoe je streaming in MCP kunt gebruiken.

Begrijpen hoe streaming binnen het MCP-kader werkt is essentieel voor het bouwen van responsieve applicaties die realtime feedback geven aan gebruikers tijdens langlopende processen.

In MCP gaat streaming niet over het versturen van de hoofdresponse in stukjes, maar over het sturen van **notificaties** naar de client terwijl een tool een verzoek verwerkt. Deze notificaties kunnen voortgangsupdates, logs of andere events bevatten.

### Hoe het werkt

Het hoofdresultaat wordt nog steeds als een enkel antwoord verzonden. Echter, tijdens het verwerken kunnen notificaties als aparte berichten worden gestuurd en zo de client realtime updaten. De client moet deze notificaties kunnen afhandelen en weergeven.

## Wat is een Notificatie?

We zeiden "Notificatie", wat betekent dat in de context van MCP?

Een notificatie is een bericht dat van de server naar de client wordt gestuurd om te informeren over voortgang, status of andere gebeurtenissen tijdens een langlopende operatie. Notificaties verbeteren transparantie en gebruikerservaring.

Bijvoorbeeld, een client moet een notificatie sturen zodra de initiële handshake met de server is gemaakt.

Een notificatie ziet er als volgt uit als JSON-bericht:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notificaties behoren tot een onderwerp in MCP dat ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) wordt genoemd.

Om logging te laten werken, moet de server het inschakelen als feature/capability zoals volgt:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Afhankelijk van de gebruikte SDK kan logging standaard ingeschakeld zijn, of moet je het expliciet inschakelen in je serverconfiguratie.

Er zijn verschillende soorten notificaties:

| Niveau     | Beschrijving                   | Voorbeeld Gebruikssituatie    |
|------------|-------------------------------|-------------------------------|
| debug      | Gedetailleerde debug-informatie | Functie in- en uitgangen      |
| info       | Algemene informatieve berichten | Voortgangsupdates             |
| notice     | Normale maar significante gebeurtenissen | Configuratiewijzigingen  |
| warning    | Waarschuwingscondities         | Gebruik van verouderde functies|
| error      | Foutcondities                 | Mislukkingen in operaties     |
| critical   | Kritieke condities            | Faalgevallen in systeemcomponenten |
| alert      | Direct actie vereist          | Data corruptie gedetecteerd   |
| emergency  | Systeem is onbruikbaar         | Compleet systeemfalen         |

## Notificaties Implementeren in MCP

Om notificaties in MCP te implementeren, moet je zowel server- als clientzijde instellen om realtime updates te verwerken. Hierdoor kan je applicatie directe feedback geven aan gebruikers tijdens langlopende bewerkingen.

### Serverzijde: Notificaties Verzenden

Laten we beginnen met de serverzijde. In MCP definieer je tools die notificaties kunnen sturen tijdens het verwerken van verzoeken. De server gebruikt het contextobject (gewoonlijk `ctx`) om berichten naar de client te versturen.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

In het voorgaande voorbeeld stuurt de `process_files` tool drie notificaties naar de client terwijl hij elk bestand verwerkt. De methode `ctx.info()` wordt gebruikt om informatieve berichten te versturen.

Daarnaast moet je om notificaties mogelijk te maken ervoor zorgen dat je server een streaming transport gebruikt (zoals `streamable-http`) en dat je client een message handler implementeert om notificaties te verwerken. Zo kun je de server configureren om het `streamable-http` transport te gebruiken:

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

In dit .NET voorbeeld is de `ProcessFiles` tool gemarkeerd met de `Tool` attribuut en stuurt drie notificaties naar de client terwijl elk bestand wordt verwerkt. De `ctx.Info()` methode wordt gebruikt om informatieve berichten te verzenden.

Zorg ervoor dat je in je .NET MCP server een streaming transport gebruikt om notificaties te ondersteunen:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Clientzijde: Notificaties Ontvangen

De client moet een message handler implementeren om notificaties te verwerken en weer te geven zodra ze binnenkomen.

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

In bovenstaande code controleert de functie `message_handler` of het inkomende bericht een notificatie is. Zo ja, dan drukt het de notificatie af, anders wordt het verwerkt als een gewoon serverbericht. Let ook op hoe `ClientSession` wordt geïnitialiseerd met `message_handler` om inkomende notificaties af te handelen.

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

In dit .NET voorbeeld controleert de functie `MessageHandler` of het binnenkomende bericht een notificatie is. Zo ja, wordt de notificatie afgedrukt; anders wordt het als een regulier serverbericht verwerkt. De `ClientSession` wordt geïnitialiseerd met de message handler via `ClientSessionOptions`.

Zorg ervoor dat je server een streaming transport gebruikt (zoals `streamable-http`) en dat de client een message handler heeft om notificaties te verwerken.

## Voortgangsnotificaties & Scenario's

Deze sectie legt het concept van voortgangsnotificaties in MCP uit, waarom ze belangrijk zijn en hoe je ze kunt implementeren met Streamable HTTP. Je vindt ook een praktische opdracht om je begrip te versterken.

Voortgangsnotificaties zijn realtime berichten die de server naar de client stuurt tijdens langlopende operaties. In plaats van te wachten tot het hele proces klaar is, houdt de server de client op de hoogte van de actuele status. Dit verbetert transparantie, gebruikerservaring en maakt foutopsporing eenvoudiger.

**Voorbeeld:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Waarom voortgangsnotificaties gebruiken?

Voortgangsnotificaties zijn om meerdere redenen essentieel:

- **Betere gebruikerservaring:** Gebruikers zien updates terwijl het werk vordert, niet alleen aan het einde.
- **Realtime feedback:** Clients kunnen voortgangsbalken of logs tonen, waardoor de app responsief aanvoelt.
- **Makkelijker debuggen en monitoren:** Ontwikkelaars en gebruikers zien waar een proces traag is of vastloopt.

### Hoe voortgangsnotificaties implementeren

Zo kun je voortgangsnotificaties implementeren in MCP:

- **Aan de serverzijde:** Gebruik `ctx.info()` of `ctx.log()` om notificaties te versturen naarmate elk item verwerkt wordt. Dit stuurt berichten naar de client vóór het hoofdresultaat klaar is.
- **Aan de clientzijde:** Implementeer een message handler die luistert naar en notificaties toont zodra ze binnenkomen. Deze handler onderscheidt notificaties van het eindresultaat.

**Servervoorbeeld:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Clientvoorbeeld:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Beveiligingsoverwegingen

Bij het implementeren van MCP-servers met HTTP-gebaseerde transports is beveiliging van het grootste belang en vereist het zorgvuldige aandacht voor verschillende aanvalsvectoren en beschermingsmechanismen.

### Overzicht

Beveiliging is cruciaal bij het blootstellen van MCP-servers via HTTP. Streamable HTTP introduceert nieuwe aanvalsvlakken en vereist zorgvuldige configuratie.

### Belangrijke punten
- **Validatie van de Origin-header**: Valideer altijd de `Origin`-header om DNS-rebinding-aanvallen te voorkomen.
- **Binding aan localhost**: Bind servers voor lokale ontwikkeling aan `localhost` om te voorkomen dat ze blootgesteld worden aan het openbare internet.
- **Authenticatie**: Implementeer authenticatie (bijv. API-sleutels, OAuth) voor productie-implementaties.
- **CORS**: Configureer Cross-Origin Resource Sharing (CORS)-beleid om toegang te beperken.
- **HTTPS**: Gebruik HTTPS in productie om verkeer te versleutelen.

### Best Practices

- Vertrouw nooit op binnenkomende verzoeken zonder validatie.
- Log en monitor alle toegang en fouten.
- Werk afhankelijkheden regelmatig bij om beveiligingskwetsbaarheden te verhelpen.

### Uitdagingen

- Balanceren tussen beveiliging en ontwikkelgemak
- Zorgen voor compatibiliteit met verschillende clientomgevingen

## Upgraden van SSE naar Streamable HTTP

Voor applicaties die momenteel Server-Sent Events (SSE) gebruiken, biedt migratie naar Streamable HTTP verbeterde mogelijkheden en betere duurzaamheid op lange termijn voor je MCP-implementaties.

### Waarom upgraden?

Er zijn twee sterke redenen om te upgraden van SSE naar Streamable HTTP:

- Streamable HTTP biedt betere schaalbaarheid, compatibiliteit en uitgebreidere notificatieondersteuning dan SSE.
- Het is de aanbevolen transportmethode voor nieuwe MCP-applicaties.

### Migratiestappen

Zo kun je migreren van SSE naar Streamable HTTP in je MCP-applicaties:

- **Werk servercode bij** naar `transport="streamable-http"` in `mcp.run()`.
- **Werk clientcode bij** om `streamablehttp_client` te gebruiken in plaats van de SSE-client.
- **Implementeer een message handler** in de client om notificaties te verwerken.
- **Test op compatibiliteit** met bestaande tools en workflows.

### Compatibiliteit behouden

Het is aan te raden om compatibiliteit met bestaande SSE-clients te behouden tijdens de migratie. Hier zijn enkele strategieën:

- Je kunt zowel SSE als Streamable HTTP ondersteunen door beide transports op verschillende endpoints te draaien.
- Migreer clients geleidelijk naar de nieuwe transportmethode.

### Uitdagingen

Zorg dat je de volgende uitdagingen aanpakt tijdens de migratie:

- Zeker stellen dat alle clients worden bijgewerkt
- Omgaan met verschillen in notificatielevering

## Beveiligingsoverwegingen

Beveiliging moet een topprioriteit zijn bij het implementeren van elke server, vooral bij het gebruik van HTTP-gebaseerde transports zoals Streamable HTTP in MCP.

Bij het implementeren van MCP-servers met HTTP-gebaseerde transports wordt beveiliging een cruciale factor die aandacht vereist voor meerdere aanvalsvectoren en beschermingsmechanismen.

### Overzicht

Beveiliging is essentieel wanneer MCP-servers via HTTP worden blootgesteld. Streamable HTTP introduceert nieuwe aanvalsvlakken en vereist zorgvuldige configuratie.

Hier zijn enkele belangrijke beveiligingsoverwegingen:

- **Validatie van de Origin-header**: Valideer altijd de `Origin`-header om DNS-rebinding-aanvallen te voorkomen.
- **Binding aan localhost**: Bind servers voor lokale ontwikkeling aan `localhost` om te voorkomen dat ze blootgesteld worden aan het openbare internet.
- **Authenticatie**: Implementeer authenticatie (bijv. API-sleutels, OAuth) voor productie-implementaties.
- **CORS**: Configureer Cross-Origin Resource Sharing (CORS)-beleid om toegang te beperken.
- **HTTPS**: Gebruik HTTPS in productie om verkeer te versleutelen.

### Best Practices

Daarnaast volgen hier enkele best practices voor het implementeren van beveiliging in je MCP-streamingserver:

- Vertrouw nooit op binnenkomende verzoeken zonder validatie.
- Log en monitor alle toegang en fouten.
- Werk afhankelijkheden regelmatig bij om beveiligingskwetsbaarheden te verhelpen.

### Uitdagingen

Je zult enkele uitdagingen tegenkomen bij het implementeren van beveiliging in MCP-streamingservers:

- Balanceren tussen beveiliging en ontwikkelgemak
- Zorgen voor compatibiliteit met verschillende clientomgevingen

### Opdracht: Bouw je eigen streaming MCP-app

**Scenario:**  
Bouw een MCP-server en client waarbij de server een lijst items verwerkt (bijv. bestanden of documenten) en een notificatie verzendt voor elk verwerkt item. De client moet elke notificatie tonen zodra deze binnenkomt.

**Stappen:**

1. Implementeer een serverttool die een lijst verwerkt en notificaties voor elk item verzendt.
2. Implementeer een client met een message handler om notificaties real-time weer te geven.
3. Test je implementatie door server en client te draaien en de notificaties te observeren.

[Solution](./solution/README.md)

## Verdere literatuur & wat nu?

Om je reis met MCP-streaming voort te zetten en je kennis uit te breiden, biedt deze sectie extra bronnen en voorgestelde volgende stappen om meer geavanceerde applicaties te bouwen.

### Verdere literatuur

- [Microsoft: Introduction to HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Wat nu?

- Probeer meer geavanceerde MCP-tools te bouwen die streaming gebruiken voor realtime analytics, chat of collaboratief bewerken.
- Verken integratie van MCP-streaming met frontend-frameworks (React, Vue, enz.) voor live UI-updates.
- Volgende: [Utilising AI Toolkit for VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->