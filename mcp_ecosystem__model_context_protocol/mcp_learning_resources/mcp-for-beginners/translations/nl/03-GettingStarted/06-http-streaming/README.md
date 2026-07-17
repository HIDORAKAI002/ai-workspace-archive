# HTTPS-streaming met Model Context Protocol (MCP)

Dit hoofdstuk biedt een uitgebreide gids voor het implementeren van veilige, schaalbare en realtime streaming met het Model Context Protocol (MCP) via HTTPS. Het behandelt de motivatie voor streaming, de beschikbare transportmechanismen, hoe stroombare HTTP in MCP te implementeren, beste beveiligingspraktijken, migratie van SSE en praktische richtlijnen voor het bouwen van je eigen streaming MCP-applicaties.

> **Vooruitblik:** deze les beschrijft Streamable HTTP onder **MCP Specificatie 2025-11-25**, waarbij een sessie wordt opgezet tijdens `initialize` en vastgezet via een `Mcp-Session-Id` header. De release candidate van `2026-07-28` verwijdert de handshake en sessie-ID geheel, waardoor elke aanvraag zelfstandig is en routerbaar naar elke serverinstantie zonder sticky sessions. Zie [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) voor details.

## Transportmechanismen en streaming in MCP

Deze sectie onderzoekt de verschillende transportmechanismen die beschikbaar zijn in MCP en hun rol bij het mogelijk maken van streamingmogelijkheden voor realtime communicatie tussen clients en servers.

### Wat is een transportmechanisme?

Een transportmechanisme definieert hoe gegevens worden uitgewisseld tussen de client en server. MCP ondersteunt meerdere transporttypes die aansluiten bij verschillende omgevingen en vereisten:

- **stdio**: Standaard input/output, geschikt voor lokale en CLI-gebaseerde tools. Eenvoudig maar niet geschikt voor web of cloud.
- **SSE (Server-Sent Events)**: Hiermee kunnen servers realtime updates pushen naar clients via HTTP. Goed voor web UIs, maar beperkt in schaalbaarheid en flexibiliteit. Vanaf MCP Specificatie 2025-06-18 is het standalone SSE-transport deprecated en vervangen door "Streamable HTTP" transport.
- **Streamable HTTP**: Moderne HTTP-gebaseerde streamingtransport, ondersteunt notificaties en betere schaalbaarheid. Aanbevolen voor de meeste productie- en cloudscenario's.

### Vergelijkingstabel

Bekijk de onderstaande vergelijkingstabel om de verschillen tussen deze transportmechanismen te begrijpen:

| Transport         | Realtime Updates | Streaming | Schaalbaarheid | Gebruikssituatie        |
|-------------------|-----------------|-----------|---------------|-------------------------|
| stdio             | Nee             | Nee       | Laag          | Lokale CLI-tools        |
| SSE               | Ja              | Ja        | Midden        | Web, realtime updates   |
| Streamable HTTP   | Ja              | Ja        | Hoog          | Cloud, multi-client     |

> **Tip:** De keuze van het juiste transport beïnvloedt prestaties, schaalbaarheid en gebruikerservaring. **Streamable HTTP** wordt aanbevolen voor moderne, schaalbare en cloudklare applicaties.

Let op de transports stdio en SSE die in de vorige hoofdstukken zijn getoond en hoe streamable HTTP het transport is dat in dit hoofdstuk aan bod komt.

## Streaming: Concepten en Motivatie

Het begrijpen van de fundamentele concepten en motivaties achter streaming is essentieel voor het implementeren van effectieve realtime communicatiesystemen.

**Streaming** is een techniek in netwerkprogrammering die het mogelijk maakt om data in kleine, beheersbare stukjes of als een reeks events te versturen en ontvangen, in plaats van te wachten tot een volledige respons gereed is. Dit is met name handig voor:

- Grote bestanden of datasets.
- Realtime updates (bijv. chat, voortgangsbalken).
- Langdurige berekeningen waarbij je de gebruiker op de hoogte wilt houden.

Dit is wat je op hoofdlijnen moet weten over streaming:

- Data wordt progressief geleverd, niet alles ineens.
- De client kan data verwerken naarmate deze binnenkomt.
- Vermindert de waargenomen latentie en verbetert de gebruikservaring.

### Waarom streaming gebruiken?

De redenen om streaming te gebruiken zijn de volgende:

- Gebruikers krijgen direct feedback, niet pas aan het einde
- Maakt realtime applicaties en responsieve UIs mogelijk
- Efficiënter gebruik van netwerk- en computerbronnen

### Eenvoudig voorbeeld: HTTP streaming server & client

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

Dit voorbeeld toont een server die een reeks berichten naar de client stuurt zodra ze beschikbaar zijn, in plaats van te wachten tot alle berichten gereed zijn.

**Hoe werkt het:**

- De server levert elk bericht zodra het gereed is.
- De client ontvangt en print elk stukje zodra het arriveert.

**Vereisten:**

- De server moet een streamingrespons gebruiken (bijv. `StreamingResponse` in FastAPI).
- De client moet de respons als een stream verwerken (`stream=True` in requests).
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

**Aantekeningen bij Java implementatie:**

- Gebruikt Spring Boot's reactieve stack met `Flux` voor streaming
- `ServerSentEvent` biedt gestructureerde event streaming met event types
- `WebClient` met `bodyToFlux()` maakt reactief streamen mogelijk
- `delayElements()` simuleert verwerkingstijd tussen events
- Events kunnen types hebben (`info`, `result`) voor betere client-afhandeling

### Vergelijking: Klassieke Streaming vs MCP Streaming

De verschillen tussen klassieke streaming en streaming in MCP kunnen als volgt worden weergegeven:

| Kenmerk                | Klassieke HTTP Streaming         | MCP Streaming (Notificaties)      |
|------------------------|---------------------------------|----------------------------------|
| Hoofdrespons            | In chunkjes                     | Enkelvoudig, aan einde           |
| Voortgangsupdates      | Verzonden als data chunkjes     | Verzonden als notificaties       |
| Clientvereisten         | Moet stream verwerken           | Moet message handler implementeren|
| Gebruikssituatie        | Grote bestanden, AI token streams | Voortgang, logs, realtime feedback|

### Belangrijkste waargenomen verschillen

Daarnaast zijn er enkele belangrijke verschillen:

- **Communicatiepatroon:**
  - Klassieke HTTP streaming: Maakt gebruik van eenvoudige chunked transfer encoding om data in stukjes te versturen
  - MCP streaming: Gebruikt een gestructureerd notificatiesysteem met JSON-RPC protocol

- **Berichtformaat:**
  - Klassiek HTTP: Platte tekst chunkjes met nieuwe regels
  - MCP: Gestructureerde LoggingMessageNotification-objecten met metadata

- **Clientimplementatie:**
  - Klassiek HTTP: Eenvoudige client die streamende responsen verwerkt
  - MCP: Meer geavanceerde client met een message handler om verschillende typen berichten te verwerken

- **Voortgangsupdates:**
  - Klassiek HTTP: Voortgang is onderdeel van de hoofdrespons stream
  - MCP: Voortgang wordt via aparte notificatieberichten verzonden, terwijl de hoofdrespons aan het einde komt

### Aanbevelingen

We raden het volgende aan bij de keuze tussen klassieke streaming (zoals een endpoint met `/stream`) versus streaming via MCP.

- **Voor eenvoudige streamingbehoeften:** Klassieke HTTP streaming is eenvoudiger te implementeren en voldoende voor basis streamingbehoeften.

- **Voor complexe, interactieve applicaties:** MCP streaming biedt een gestructureerdere aanpak met rijkere metadata en scheiding tussen notificaties en eindresultaten.

- **Voor AI-toepassingen:** MCP’s notificatiesysteem is vooral nuttig voor langlopende AI-taken waarbij je gebruikers op de hoogte wilt houden van de voortgang.

## Streaming in MCP

Oké, je hebt tot nu toe enkele aanbevelingen en vergelijkingen gezien over het verschil tussen klassieke streaming en streaming in MCP. Laten we in detail bekijken hoe streaming in MCP precies werkt.

Het begrijpen van hoe streaming binnen het MCP-framework werkt is essentieel voor het bouwen van responsieve applicaties die realtime feedback aan gebruikers geven tijdens langlopende bewerkingen.

In MCP gaat streaming niet over het versturen van de hoofdrespons in stukjes, maar over het sturen van **notificaties** naar de client tijdens het verwerken van een verzoek door een tool. Deze notificaties kunnen voortgangsupdates, logs of andere events bevatten.

### Hoe het werkt

Het hoofdresultaat wordt nog steeds als enkele respons verzonden. Notificaties kunnen echter tussentijds als aparte berichten worden verstuurd en zo de client realtime bijwerken. De client moet deze notificaties kunnen verwerken en weergeven.

## Wat is een notificatie?

We zeiden "Notificatie", wat betekent dat in de context van MCP?

Een notificatie is een bericht dat van de server naar de client wordt gestuurd om te informeren over voortgang, status of andere gebeurtenissen tijdens een langlopende operatie. Notificaties verbeteren transparantie en gebruikservaring.

Bijvoorbeeld, een client stuurt een notificatie zodra de initiële handshake met de server is gemaakt.

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

Notificaties behoren tot een onderwerp in MCP aangeduid als ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Afschaffingsmelding:** de release candidate van de MCP-specificatie `2026-07-28` markeert de Logging-primitive als deprecated ten gunste van `stderr` voor stdio-transports en OpenTelemetry voor gestructureerde observability. Logging blijft werken in `2025-11-25` en minstens een jaar na elke formele afschaffing. Zie [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Om logging werkend te krijgen, moet de server dit als feature/capability inschakelen zoals volgt:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Afhankelijk van de gebruikte SDK kan logging standaard ingeschakeld zijn, of moet je dit expliciet aanzetten in je serverconfiguratie.

Er zijn verschillende typen notificaties:

| Niveau     | Beschrijving                  | Voorbeeld gebruikssituatie        |
|-----------|------------------------------|----------------------------------|
| debug     | Gedetailleerde debuginformatie | Functie in-/uitgangen            |
| info      | Algemene informatieve berichten | Voortgangsupdates operatie     |
| notice    | Normale maar significante events | Configuratiewijzigingen          |
| warning   | Waarschuwingscondities        | Gebruik van deprecated features  |
| error     | Foutcondities                 | Mislukkingen bij operatie       |
| critical  | Kritieke condities            | Falen van systeembestanddelen   |
| alert     | Direct actie nodig            | Gegevenscorruptie gedetecteerd  |
| emergency | Systeem onbruikbaar           | Compleet systeemfalen            |

## Implementeren van notificaties in MCP

Om notificaties in MCP te implementeren, moet je zowel de server- als clientkant instellen om realtime updates te verwerken. Zo kan je applicatie gebruikers direct feedback geven tijdens langlopende operaties.

### Serverzijde: Notificaties verzenden

Laten we beginnen met de serverzijde. In MCP definieer je tools die notificaties kunnen sturen tijdens het verwerken van verzoeken. De server gebruikt het contextobject (meestal `ctx`) om berichten naar de client te sturen.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

In het bovenstaande voorbeeld stuurt de tool `process_files` drie notificaties naar de client terwijl het elke file verwerkt. De `ctx.info()` methode wordt gebruikt om informatieve berichten te versturen.

Daarnaast, om notificaties mogelijk te maken, moet je server een streaming transport gebruiken (zoals `streamable-http`) en moet je client een message handler implementeren voor het verwerken van notificaties. Zo stel je de server in om het transport `streamable-http` te gebruiken:

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

In dit .NET voorbeeld is de tool `ProcessFiles` voorzien van de `Tool`-attribuut en stuurt drie notificaties naar de client tijdens het verwerken van elk bestand. De `ctx.Info()` methode wordt gebruikt voor informatieve berichten.

Om notificaties in je .NET MCP-server in te schakelen, zorg dat je een streaming transport gebruikt:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Clientzijde: Notificaties ontvangen

De client moet een message handler implementeren om notificaties te verwerken en te tonen zodra ze binnenkomen.

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

In bovenstaande code controleert de `message_handler` functie of het binnenkomende bericht een notificatie is. Is dat zo, dan print het de notificatie uit; anders wordt het als een regulier serverbericht verwerkt. Let ook op hoe `ClientSession` is geïnitialiseerd met de `message_handler` om notificaties te verwerken.

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

In dit .NET voorbeeld controleert de `MessageHandler` functie of het binnenkomende bericht een notificatie is. Zo ja, dan print het de notificatie; anders verwerkt het het als regulier serverbericht. `ClientSession` wordt geïnitialiseerd met de message handler via `ClientSessionOptions`.

Om notificaties mogelijk te maken, zorg dat je server een streaming transport gebruikt (zoals `streamable-http`) en dat je client een message handler heeft om notificaties te verwerken.

## Voortgangsnotificaties & Scenario's

Deze sectie legt het concept voortgangsnotificaties in MCP uit, waarom ze belangrijk zijn en hoe ze te implementeren met Streamable HTTP. Je vindt ook een praktische opdracht om je begrip te versterken.

Voortgangsnotificaties zijn realtime berichten die de server tijdens langlopende bewerkingen naar de client stuurt. In plaats van te wachten tot het hele proces klaar is, houdt de server de client op de hoogte van de actuele status. Dit verbetert transparantie, gebruikservaring en vergemakkelijkt debugging.

**Voorbeeld:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Waarom voortgangsnotificaties gebruiken?

Voortgangsnotificaties zijn om verschillende redenen essentieel:

- **Betere gebruikerservaring:** Gebruikers zien updates tijdens het proces in plaats van pas aan het einde.
- **Realtime feedback:** Clients kunnen voortgangsbalken of logs tonen, waardoor de app responsiever aanvoelt.
- **Eenvoudiger debuggen en monitoren:** Ontwikkelaars en gebruikers zien waar een proces traag is of vastloopt.

### Hoe voortgangsnotificaties te implementeren

Zo kun je voortgangsnotificaties implementeren in MCP:

- **Op de server:** Gebruik `ctx.info()` of `ctx.log()` om notificaties te versturen terwijl elk item wordt verwerkt. Dit stuurt een bericht naar de client voordat het hoofdresultaat gereed is.
- **Op de client:** Implementeer een message handler die luistert naar en notificaties toont zodra ze binnenkomen. Deze handler maakt onderscheid tussen notificaties en het uiteindelijke resultaat.

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

## Veiligheidsoverwegingen

Bij het implementeren van MCP-servers met HTTP-gebaseerde transportlagen wordt veiligheid een cruciale zorg die zorgvuldige aandacht vereist voor meerdere aanvalsvectoren en beschermingsmechanismen.

### Overzicht

Veiligheid is essentieel bij het blootstellen van MCP-servers via HTTP. Streamable HTTP introduceert nieuwe aanvalsvlakken en vereist zorgvuldige configuratie.

### Belangrijke punten

- **Validatie van Origin-header**: Valideer altijd de `Origin`-header om DNS rebinding-aanvallen te voorkomen.
- **Binding aan localhost**: Bind servers tijdens lokale ontwikkeling aan `localhost` om blootstelling aan het openbare internet te voorkomen.
- **Authenticatie**: Implementeer authenticatie (bijv. API-sleutels, OAuth) voor productieomgevingen.
- **CORS**: Configureer Cross-Origin Resource Sharing (CORS) policies om toegang te beperken.
- **HTTPS**: Gebruik HTTPS in productie om verkeer te versleutelen.

### Best Practices

- Vertrouw nooit op binnenkomende verzoeken zonder validatie.
- Log en monitor alle toegang en fouten.
- Werk regelmatig afhankelijkheden bij om beveiligingslekken te dichten.

### Uitdagingen

- Balanceren tussen veiligheid en ontwikkelgemak
- Zorgen voor compatibiliteit met diverse clientomgevingen

## Upgraden van SSE naar Streamable HTTP

Voor applicaties die momenteel Server-Sent Events (SSE) gebruiken, biedt migratie naar Streamable HTTP verbeterde mogelijkheden en betere duurzaamheid op de lange termijn voor je MCP-implementaties.

### Waarom upgraden?

Er zijn twee overtuigende redenen om van SSE naar Streamable HTTP te upgraden:

- Streamable HTTP biedt betere schaalbaarheid, compatibiliteit en rijkere notificatie-ondersteuning dan SSE.
- Het is de aanbevolen transportlaag voor nieuwe MCP-applicaties.

### Migratiestappen

Zo kun je migreren van SSE naar Streamable HTTP in je MCP-applicaties:

- **Werk servercode bij** om `transport="streamable-http"` te gebruiken in `mcp.run()`.
- **Werk clientcode bij** om `streamablehttp_client` te gebruiken in plaats van de SSE-client.
- **Implementeer een berichtenhandler** in de client om notificaties te verwerken.
- **Test op compatibiliteit** met bestaande tools en workflows.

### Compatibiliteit behouden

Het is aan te raden compatibiliteit met bestaande SSE-clients te behouden tijdens het migratieproces. Hier zijn enkele strategieën:

- Je kunt zowel SSE als Streamable HTTP ondersteunen door beide transportlagen op verschillende endpoints te draaien.
- Migreer clients geleidelijk naar de nieuwe transportlaag.

### Uitdagingen

Zorg dat je de volgende uitdagingen aanpakt tijdens de migratie:

- Zorg dat alle clients bijgewerkt worden
- Omgaan met verschillen in notificatiebezorging

## Veiligheidsoverwegingen

Veiligheid zou een topprioriteit moeten zijn bij het implementeren van elke server, vooral bij het gebruik van HTTP-gebaseerde transportlagen zoals Streamable HTTP in MCP.

Bij het implementeren van MCP-servers met HTTP-gebaseerde transportlagen wordt veiligheid een cruciale zorg die zorgvuldige aandacht vereist voor meerdere aanvalsvectoren en beschermingsmechanismen.

### Overzicht

Veiligheid is essentieel bij het blootstellen van MCP-servers via HTTP. Streamable HTTP introduceert nieuwe aanvalsvlakken en vereist zorgvuldige configuratie.

Hier zijn enkele belangrijke veiligheidsoverwegingen:

- **Validatie van Origin-header**: Valideer altijd de `Origin`-header om DNS rebinding-aanvallen te voorkomen.
- **Binding aan localhost**: Bind servers tijdens lokale ontwikkeling aan `localhost` om blootstelling aan het openbare internet te voorkomen.
- **Authenticatie**: Implementeer authenticatie (bijv. API-sleutels, OAuth) voor productieomgevingen.
- **CORS**: Configureer Cross-Origin Resource Sharing (CORS) policies om toegang te beperken.
- **HTTPS**: Gebruik HTTPS in productie om verkeer te versleutelen.

### Best Practices

Daarnaast zijn hier enkele best practices om te volgen bij het implementeren van veiligheid in je MCP-streamingserver:

- Vertrouw nooit op binnenkomende verzoeken zonder validatie.
- Log en monitor alle toegang en fouten.
- Werk regelmatig afhankelijkheden bij om beveiligingslekken te dichten.

### Uitdagingen

Je zult enkele uitdagingen tegenkomen bij het implementeren van veiligheid in MCP-streamingservers:

- Balanceren tussen veiligheid en ontwikkelgemak
- Zorgen voor compatibiliteit met diverse clientomgevingen

### Oefening: Bouw je eigen streaming MCP-app

**Scenario:**
Bouw een MCP-server en -client waarbij de server een lijst items (bijv. bestanden of documenten) verwerkt en voor elk verwerkt item een notificatie verzendt. De client moet elke notificatie tonen zodra deze binnenkomt.

**Stappen:**

1. Implementeer een servertool die een lijst verwerkt en notificaties voor elk item verstuurt.
2. Implementeer een client met een berichtenhandler om notificaties realtime te tonen.
3. Test je implementatie door server en client te draaien en observeer de notificaties.

[Oplossing](./solution/README.md)

## Verder lezen & wat nu?

Om je reis met MCP-streaming voort te zetten en je kennis uit te breiden, biedt deze sectie aanvullende bronnen en voorgestelde volgende stappen voor het bouwen van meer geavanceerde applicaties.

### Verder lezen

- [Microsoft: Introductie tot HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Wat nu?

- Probeer meer geavanceerde MCP-tools te bouwen die streaming gebruiken voor real-time analytics, chat of collaboratieve bewerking.
- Verken integratie van MCP-streaming met frontend frameworks (React, Vue, enz.) voor live UI-updates.
- Volgende: [Gebruik van AI Toolkit voor VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->