# HTTPS Streaming met Model Context Protocol (MCP)

Dit hoofdstuk biedt een uitgebreide gids voor het implementeren van veilige, schaalbare en realtime streaming met het Model Context Protocol (MCP) via HTTPS. Het behandelt de motivatie voor streaming, de beschikbare transportmechanismen, hoe je streamable HTTP in MCP implementeert, beveiligingsbest practices, migratie van SSE, en praktische aanwijzingen voor het bouwen van je eigen streaming MCP-toepassingen.

## Transportmechanismen en Streaming in MCP

Deze sectie onderzoekt de verschillende transportmechanismen die beschikbaar zijn in MCP en hun rol bij het mogelijk maken van streamingfunctionaliteit voor realtime communicatie tussen clients en servers.

### Wat is een Transportmechanisme?

Een transportmechanisme definieert hoe data wordt uitgewisseld tussen de client en server. MCP ondersteunt meerdere transporttypes die passen bij verschillende omgevingen en eisen:

- **stdio**: Standaard invoer/uitvoer, geschikt voor lokale en CLI-gebaseerde tools. Simpel, maar niet geschikt voor web of cloud.
- **SSE (Server-Sent Events)**: Stelt servers in staat om realtime updates naar clients te pushen via HTTP. Geschikt voor web UIs, maar beperkt in schaalbaarheid en flexibiliteit. Vanaf MCP Specificatie 2025-06-18 is het standalone SSE (Server-Sent Events) transport verouderd en vervangen door "Streamable HTTP" transport.
- **Streamable HTTP**: Modern HTTP-gebaseerd streaming transport, ondersteunt notificaties en betere schaalbaarheid. Aanbevolen voor de meeste productie- en cloudscenario's.

### Vergelijkingstabel

Bekijk onderstaande vergelijkingstabel om de verschillen tussen deze transportmechanismen beter te begrijpen:

| Transport         | Realtime Updates | Streaming | Schaalbaarheid | Gebruikssituatie        |
|-------------------|------------------|-----------|----------------|------------------------|
| stdio             | Nee              | Nee       | Laag           | Lokale CLI tools       |
| SSE               | Ja               | Ja        | Medium         | Web, realtime updates  |
| Streamable HTTP   | Ja               | Ja        | Hoog           | Cloud, multi-client    |

> **Tip:** De keuze voor het juiste transport beïnvloedt prestaties, schaalbaarheid en gebruikerservaring. **Streamable HTTP** wordt aanbevolen voor moderne, schaalbare en cloudgerichte toepassingen.

Let op de transports stdio en SSE die in eerdere hoofdstukken zijn besproken, en hoe streamable HTTP het transport is dat in dit hoofdstuk behandeld wordt.

## Streaming: Concepten en Motivatie

Het begrijpen van de fundamentele concepten en motivaties achter streaming is essentieel voor het implementeren van effectieve realtime communicatiesystemen.

**Streaming** is een techniek in netwerkprogrammering die het mogelijk maakt data in kleine, beheersbare stukken of als een reeks gebeurtenissen te verzenden en ontvangen, in plaats van te wachten tot een volledig antwoord klaar is. Dit is vooral nuttig voor:

- Grote bestanden of datasets.
- Realtime updates (bijv. chat, voortgangsbalken).
- Langdurige berekeningen waarbij je de gebruiker op de hoogte wilt houden.

Dit moet je op hoofdlijnen weten over streaming:

- Data wordt stapsgewijs geleverd, niet in één keer.
- De client kan data verwerken zodra deze arriveert.
- Vermindert waargenomen latency en verbetert de gebruikerservaring.

### Waarom streaming gebruiken?

De redenen om streaming te gebruiken zijn:

- Gebruikers krijgen direct feedback, niet alleen aan het einde.
- Maakt realtime applicaties en responsieve UIs mogelijk.
- Efficiënter gebruik van netwerk- en rekenbronnen.

### Simpel Voorbeeld: HTTP Streaming Server & Client

Hier volgt een eenvoudig voorbeeld van hoe streaming geïmplementeerd kan worden:

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

**Hoe werkt het:**

- De server levert elk bericht zodra het gereed is.
- De client ontvangt en print elke chunk zodra deze binnenkomt.

**Vereisten:**

- De server moet een streaming response gebruiken (bijv. `StreamingResponse` in FastAPI).
- De client moet de response als een stream verwerken (`stream=True` in requests).
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

**Java Implementatie Notities:**

- Maakt gebruik van Spring Boot’s reactieve stack met `Flux` voor streaming
- `ServerSentEvent` biedt gestructureerde event streaming met event types
- `WebClient` met `bodyToFlux()` maakt reactief streamen mogelijk
- `delayElements()` simuleert verwerkingsvertraging tussen events
- Events kunnen types hebben (`info`, `result`) voor betere clientverwerking

### Vergelijking: Klassieke Streaming vs MCP Streaming

De verschillen tussen hoe streaming op een "klassieke" manier werkt versus in MCP kunnen als volgt worden weergegeven:

| Kenmerk                 | Klassieke HTTP Streaming       | MCP Streaming (Notificaties)          |
|-------------------------|-------------------------------|--------------------------------------|
| Hoofdantwoord            | In chunks                     | Enkelvoudig, aan het einde           |
| Voortgangsupdates       | Verzonden als data chunks     | Verzonden als notificaties           |
| Vereisten voor client    | Moet stream verwerken         | Moet message handler implementeren   |
| Gebruikssituatie         | Grote bestanden, AI token streams | Voortgang, logs, realtime feedback  |

### Waargenomen Belangrijke Verschillen

Daarnaast enkele belangrijke verschillen:

- **Communicatiepatroon:**
  - Klassieke HTTP streaming: gebruikt eenvoudige chunked transfer encoding om data in stukken te verzenden
  - MCP streaming: gebruikt een gestructureerd notificatiesysteem met JSON-RPC protocol

- **Berichtformaat:**
  - Klassiek HTTP: platte tekstchunks met nieuwe regels
  - MCP: Gestructureerde LoggingMessageNotification-objecten met metadata

- **Client Implementatie:**
  - Klassiek HTTP: simpele client die streamende responses verwerkt
  - MCP: complexere client met een message handler die verschillende types berichten verwerkt

- **Voortgangsupdates:**
  - Klassiek HTTP: voortgang is onderdeel van de hoofdresponsstream
  - MCP: voortgang wordt via aparte notificatieberichten verzonden, terwijl het hoofdantwoord aan het einde komt

### Aanbevelingen

We raden het volgende aan bij de keuze tussen klassieke streamimplementatie (zoals eerder getoond via `/stream`) en streaming via MCP:

- **Voor eenvoudige streamingbehoeften:** Klassieke HTTP streaming is eenvoudiger te implementeren en voldoende voor basale streaming.

- **Voor complexe, interactieve toepassingen:** MCP streaming biedt een gestructureerdere aanpak met rijkere metadata en scheiding tussen notificaties en uiteindelijke resultaten.

- **Voor AI-toepassingen:** MCP’s notificatiesysteem is bijzonder nuttig voor langdurige AI-taken waarbij gebruikers op de hoogte gehouden moeten worden van voortgang.

## Streaming in MCP

Oké, je hebt nu enkele aanbevelingen en vergelijkingen gezien tussen klassieke streaming en MCP streaming. Laten we in detail bekijken hoe je streaming binnen MCP kunt benutten.

Begrijpen hoe streaming werkt binnen het MCP-framework is essentieel voor het bouwen van responsieve apps die realtime feedback geven tijdens langdurige bewerkingen.

In MCP gaat streaming niet over het verzenden van het hoofdantwoord in stukken, maar over het verzenden van **notificaties** naar de client terwijl een tool een verzoek verwerkt. Deze notificaties kunnen voortgangsupdates, logs of andere events bevatten.

### Hoe werkt het

Het hoofdzakelijke resultaat wordt nog steeds als één enkele response verzonden. Echter, notificaties kunnen als aparte berichten worden verzonden tijdens de verwerking en zo de client realtime bijwerken. De client moet deze notificaties kunnen verwerken en tonen.

## Wat is een Notificatie?

We zeiden "Notificatie", wat betekent dat precies in MCP?

Een notificatie is een bericht dat van de server naar de client wordt gestuurd om te informeren over voortgang, status of andere gebeurtenissen tijdens een langlopende bewerking. Notificaties verbeteren transparantie en gebruikerservaring.

Bijvoorbeeld, een client dient een notificatie te ontvangen zodra de initiële handshake met de server is gemaakt.

Een notificatie ziet er zo uit als JSON-bericht:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notificaties behoren tot een MCP-topic bekend als ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Om logging te laten werken, moet de server dit als feature/capability inschakelen zoals hieronder:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Afhankelijk van de gebruikte SDK is logging mogelijk standaard ingeschakeld, of moet je dit expliciet inschakelen in je serverconfiguratie.

Er zijn verschillende types notificaties:

| Niveau    | Beschrijving                  | Voorbeeld Gebruikssituatie       |
|-----------|------------------------------|---------------------------------|
| debug     | Gedetailleerde debug informatie | Functie ingang/uitgangspunten   |
| info      | Algemene informatieve berichten | Voortgangsupdates bij bewerkingen |
| notice    | Normale maar significante gebeurtenissen | Configuratiewijzigingen     |
| warning   | Waarschuwingstoestanden      | Gebruik van verouderde functies  |
| error     | Foutcondities                | Faaloperaties                    |
| critical  | Kritische condities          | Falen van systeemcomponenten     |
| alert     | Directe actie vereist        | Gedetecteerde datacorruptie      |
| emergency | Systeem onbruikbaar          | Volledig systeemfalen            |

## Notificaties Implementeren in MCP

Om notificaties in MCP te implementeren, moet je zowel server- als clientzijde inrichten om realtime updates te verwerken. Dit stelt je applicatie in staat om gebruikers direct feedback te geven tijdens langdurige operaties.

### Serverzijde: Notificaties Verzenden

Laten we beginnen met de serverzijde. In MCP definieer je tools die notificaties kunnen sturen tijdens het verwerken van verzoeken. De server gebruikt het context object (meestal `ctx`) om berichten naar de client te sturen.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

In het bovenstaande voorbeeld stuurt de `process_files` tool drie notificaties naar de client tijdens het verwerken van elk bestand. De `ctx.info()` methode wordt gebruikt om informatieve berichten te sturen.

Daarnaast, om notificaties mogelijk te maken, zorg dat je server een streaming transport gebruikt (zoals `streamable-http`) en dat je client een message handler implementeert om notificaties te verwerken. Zo zet je de server op om het `streamable-http` transport te gebruiken:

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

In dit .NET voorbeeld is de `ProcessFiles` tool voorzien van het `Tool` attribuut en stuurt drie notificaties naar de client tijdens het verwerken van elk bestand. De `ctx.Info()` methode wordt gebruikt om informatieve berichten te sturen.

Om notificaties in je .NET MCP server in te schakelen, zorg dat je een streaming transport gebruikt:

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

In bovenstaande code controleert de `message_handler` functie of het inkomende bericht een notificatie is. Zo ja, dan print het de notificatie; anders verwerkt het het als een regulier serverbericht. Let ook op hoe de `ClientSession` wordt geïnitialiseerd met de `message_handler` om inkomende notificaties af te handelen.

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

In dit .NET voorbeeld controleert de `MessageHandler` functie of het inkomende bericht een notificatie is. Zo ja, dan print het de notificatie; anders verwerkt het het als een regulier serverbericht. De `ClientSession` wordt geïnitialiseerd met de message handler via de `ClientSessionOptions`.

Voor het inschakelen van notificaties, zorg dat je server een streaming transport gebruikt (zoals `streamable-http`) en dat je client een message handler implementeert om notificaties te verwerken.

## Voortgangsnotificaties & Scenario's

Deze sectie legt het concept van voortgangsnotificaties in MCP uit, waarom ze belangrijk zijn, en hoe je ze implementeert met Streamable HTTP. Ook vind je er een praktische opdracht om je begrip te versterken.

Voortgangsnotificaties zijn realtime berichten die van de server naar de client worden gestuurd tijdens langdurige bewerkingen. In plaats van te wachten tot het hele proces klaar is, houdt de server de client op de hoogte van de huidige status. Dit verbetert transparantie, gebruikerservaring, en maakt debugging eenvoudiger.

**Voorbeeld:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Waarom Voortgangsnotificaties Gebruiken?

Voortgangsnotificaties zijn om verschillende redenen essentieel:

- **Betere gebruikerservaring:** Gebruikers zien updates terwijl het werk vordert, niet alleen aan het einde.
- **Realtime feedback:** Clients kunnen voortgangsbalken of logs tonen, waardoor de app responsief aanvoelt.
- **Eenvoudiger debuggen en monitoren:** Ontwikkelaars en gebruikers zien waar een proces traag is of vastloopt.

### Hoe Voortgangsnotificaties Implementeren

Zo implementeer je voortgangsnotificaties in MCP:

- **Op de server:** Gebruik `ctx.info()` of `ctx.log()` om notificaties te sturen zodra elk item verwerkt wordt. Hierdoor ontvangt de client een bericht vóór het hoofdresultaat klaar is.
- **Op de client:** Implementeer een message handler die luistert naar en notificaties toont zodra ze binnenkomen. Deze handler onderscheidt notificaties van het uiteindelijke resultaat.

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

Bij het implementeren van MCP-servers met HTTP-gebaseerde transportsystemen is beveiliging een uiterst belangrijke kwestie die zorgvuldige aandacht vereist voor meerdere aanvalsvectoren en beschermingsmechanismen.

### Overzicht

Beveiliging is cruciaal bij het openbaar maken van MCP-servers via HTTP. Streamable HTTP brengt nieuwe aanvalspunten met zich mee en vraagt om een zorgvuldige configuratie.

### Belangrijke Punten

- **Validatie van Origin Header:** Valideer altijd de `Origin` header om DNS-rebinding aanvallen te voorkomen.
- **Binding aan Localhost:** Voor lokale ontwikkeling, bind servers aan `localhost` om blootstelling aan het openbare internet te vermijden.
- **Authenticatie:** Implementeer authenticatie (bijv. API keys, OAuth) voor productie-omgevingen.
- **CORS:** Configureer Cross-Origin Resource Sharing (CORS) beleid om toegang te beperken.
- **HTTPS:** Gebruik HTTPS in productie om verkeer te versleutelen.

### Best Practices

- Vertrouw nooit op inkomende verzoeken zonder validatie.
- Log en monitor alle toegang en fouten.
- Update regelmatig dependencies om beveiligingslekken te dichten.

### Uitdagingen
- Balanceren van beveiliging met gebruiksgemak bij ontwikkeling
- Zorgen voor compatibiliteit met verschillende clientomgevingen

## Upgraden van SSE naar Streamable HTTP

Voor applicaties die momenteel Server-Sent Events (SSE) gebruiken, biedt migreren naar Streamable HTTP verbeterde mogelijkheden en een betere lange-termijnhoudbaarheid voor je MCP-implementaties.

### Waarom Upgraden?

Er zijn twee sterke redenen om van SSE naar Streamable HTTP te upgraden:

- Streamable HTTP biedt betere schaalbaarheid, compatibiliteit en rijkere notificatie-ondersteuning dan SSE.
- Het is de aanbevolen transportmethode voor nieuwe MCP-applicaties.

### Migratiestappen

Hier lees je hoe je kunt migreren van SSE naar Streamable HTTP in je MCP-applicaties:

- **Werk de servercode bij** om `transport="streamable-http"` te gebruiken in `mcp.run()`.
- **Werk de clientcode bij** om `streamablehttp_client` te gebruiken in plaats van de SSE-client.
- **Implementeer een berichtafhandelaar** in de client om notificaties te verwerken.
- **Test op compatibiliteit** met bestaande tools en workflows.

### Compatibiliteit behouden

Het wordt aanbevolen om compatibiliteit met bestaande SSE-clients te behouden tijdens het migratieproces. Hier enkele strategieën:

- Je kunt zowel SSE als Streamable HTTP ondersteunen door beide transports op verschillende eindpunten te draaien.
- Migreer clients geleidelijk naar de nieuwe transportlaag.

### Uitdagingen

Zorg dat je de volgende uitdagingen aanpakt tijdens migratie:

- Zeker stellen dat alle clients worden geüpdatet
- Omgaan met verschillen in notificatiebezorging

## Beveiligingsoverwegingen

Beveiliging moet een topprioriteit zijn bij het implementeren van elke server, vooral bij het gebruik van HTTP-gebaseerde transports zoals Streamable HTTP in MCP.

Bij het implementeren van MCP-servers met HTTP-gebaseerde transports wordt beveiliging een cruciale zorg die aandacht vereist voor meerdere aanvalsvectoren en beschermingsmechanismen.

### Overzicht

Beveiliging is essentieel wanneer MCP-servers over HTTP worden blootgesteld. Streamable HTTP introduceert nieuwe aanvalsvlakken en vereist zorgvuldige configuratie.

Hier enkele belangrijke beveiligingsoverwegingen:

- **Validatie van de Origin-header**: Valideer altijd de `Origin`-header om DNS-rebinding-aanvallen te voorkomen.
- **Binden aan localhost**: Voor lokale ontwikkeling, bind servers aan `localhost` om te voorkomen dat ze openbaar toegankelijk zijn.
- **Authenticatie**: Implementeer authenticatie (bijv. API-sleutels, OAuth) voor productieomgevingen.
- **CORS**: Configureer Cross-Origin Resource Sharing (CORS) om toegang te beperken.
- **HTTPS**: Gebruik HTTPS in productie om het verkeer te versleutelen.

### Beste praktijken

Daarnaast zijn hier enkele beste praktijken bij het implementeren van beveiliging in je MCP-streamingserver:

- Vertrouw nooit binnenkomende verzoeken zonder validatie.
- Log en monitor alle toegang en fouten.
- Werk afhankelijkheden regelmatig bij om beveiligingslekken te dichten.

### Uitdagingen

Je zult enkele uitdagingen tegenkomen bij het implementeren van beveiliging in MCP-streamingservers:

- Balanceren van beveiliging met gebruiksgemak bij ontwikkeling
- Zorgen voor compatibiliteit met verschillende clientomgevingen

### Opdracht: Bouw je eigen Streaming MCP-app

**Scenario:**
Bouw een MCP-server en client waarbij de server een lijst met items (bijv. bestanden of documenten) verwerkt en een notificatie verstuurt voor elk verwerkt item. De client moet elke notificatie tonen zodra deze binnenkomt.

**Stappen:**

1. Implementeer een servertool die een lijst verwerkt en notificaties verstuurt voor elk item.
2. Implementeer een client met een berichtafhandelaar om notificaties realtime weer te geven.
3. Test je implementatie door zowel server als client te draaien, en observeer de notificaties.

[Oplossing](./solution/README.md)

## Verder lezen & wat nu?

Om je reis met MCP-streaming voort te zetten en je kennis uit te breiden, biedt deze sectie aanvullende bronnen en aanbevolen vervolgstappen voor het bouwen van geavanceerdere applicaties.

### Verder lezen

- [Microsoft: Inleiding tot HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Wat nu?

- Probeer geavanceerdere MCP-tools te bouwen die streaming gebruiken voor real-time analyse, chat of gezamenlijke bewerking.
- Verken integratie van MCP-streaming met frontend frameworks (React, Vue, enz.) voor live UI-updates.
- Volgende: [Het AI Toolkit gebruiken voor VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->