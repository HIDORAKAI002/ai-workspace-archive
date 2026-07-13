# HTTPS Streaming med Model Context Protocol (MCP)

Dette kapitel giver en omfattende guide til implementering af sikker, skalerbar og realtidsstreaming med Model Context Protocol (MCP) ved hjælp af HTTPS. Det dækker motivationen for streaming, de tilgængelige transportmekanismer, hvordan man implementerer streambar HTTP i MCP, bedste sikkerhedsmetoder, migrering fra SSE og praktisk vejledning til at bygge dine egne streaming-MCP-applikationer.

> **Fremadskuende:** denne lektion beskriver Streambar HTTP under **MCP Specifikation 2025-11-25**, hvor en session etableres under `initialize` og fastlåses med en `Mcp-Session-Id` header. `2026-07-28` release-kandidaten fjerner håndtrykket og session-ID helt, hvilket gør hver anmodning selvstændig og rutbar til enhver serverinstans uden sticky sessions. Se [What’s Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) for detaljer.

## Transportmekanismer og Streaming i MCP

Denne sektion udforsker de forskellige transportmekanismer tilgængelige i MCP og deres rolle i at muliggøre streamingfunktionalitet for realtidskommunikation mellem klienter og servere.

### Hvad er en Transportmekanisme?

En transportmekanisme definerer, hvordan data udveksles mellem klient og server. MCP understøtter flere transporttyper tilpasset forskellige miljøer og krav:

- **stdio**: Standard input/output, velegnet til lokale og CLI-baserede værktøjer. Simpelt, men ikke egnet til web eller cloud.
- **SSE (Server-Sent Events)**: Tillader servere at sende realtidsopdateringer til klienter over HTTP. God til web-UI’er, men begrænset i skalerbarhed og fleksibilitet. Fra MCP Specifikation 2025-06-18 er den standalone SSE-transport blevet udfaset og erstattet af "Streamable HTTP" transporten.
- **Streambar HTTP**: Moderne HTTP-baseret streamingtransport, der understøtter notifikationer og bedre skalerbarhed. Anbefales til de fleste produktions- og cloud-scenarier.

### Sammenligningstabel

Se på sammenligningstabellen nedenfor for at forstå forskellene mellem disse transportmekanismer:

| Transport         | Realtidsopdateringer | Streaming | Skalerbarhed | Anvendelsestilfælde     |
|-------------------|---------------------|-----------|--------------|-------------------------|
| stdio             | Nej                 | Nej       | Lav          | Lokale CLI-værktøjer    |
| SSE               | Ja                  | Ja        | Mellem       | Web, realtidsopdateringer |
| Streambar HTTP    | Ja                  | Ja        | Høj          | Cloud, multi-klient     |

> **Tip:** Valg af den rigtige transport påvirker ydelse, skalerbarhed og brugeroplevelse. **Streambar HTTP** anbefales til moderne, skalerbare og cloud-klare applikationer.

Bemærk transporterne stdio og SSE, som du blev vist i de tidligere kapitler, og hvordan streambar HTTP er den transporttype, der dækkes i dette kapitel.

## Streaming: Begreber og Motivation

At forstå de grundlæggende begreber og motiver bag streaming er essentielt for at implementere effektive realtidskommunikationssystemer.

**Streaming** er en teknik inden for netværksprogrammering, der tillader data at blive sendt og modtaget i små, håndterbare bidder eller som en sekvens af begivenheder, i stedet for at vente på, at hele svaret er klar. Dette er særligt nyttigt til:

- Store filer eller datasæt.
- Realtidsopdateringer (f.eks. chat, statusbjælker).
- Langvarige beregninger, hvor du vil holde brugeren informeret.

Her er, hvad du skal vide om streaming på et overordnet plan:

- Data leveres gradvist, ikke alt på én gang.
- Klienten kan behandle data, efterhånden som det ankommer.
- Reducerer opfattet latenstid og forbedrer brugeroplevelsen.

### Hvorfor bruge streaming?

Årsagerne til at bruge streaming er følgende:

- Brugere får feedback med det samme, ikke kun til slut
- Muliggør realtidsapplikationer og responsive brugergrænseflader
- Mere effektiv udnyttelse af netværks- og computerressourcer

### Simpelt eksempel: HTTP Streaming Server & Klient

Her er et simpelt eksempel på, hvordan streaming kan implementeres:

#### Python

**Server (Python, bruger FastAPI og StreamingResponse):**

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

**Klient (Python, bruger requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Dette eksempel demonstrerer en server, der sender en række meddelelser til klienten, efterhånden som de bliver tilgængelige, i stedet for at vente på, at alle meddelelser er klar.

**Hvordan det virker:**

- Serveren afsender hver meddelelse, efterhånden som den er klar.
- Klienten modtager og printer hver del, efterhånden som den ankommer.

**Krav:**

- Serveren skal bruge et streaming-respons (f.eks. `StreamingResponse` i FastAPI).
- Klienten skal behandle svaret som en stream (`stream=True` i requests).
- Content-Type er som regel `text/event-stream` eller `application/octet-stream`.

#### Java

**Server (Java, bruger Spring Boot og Server-Sent Events):**

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

**Klient (Java, bruger Spring WebFlux WebClient):**

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

**Java Implementeringsnoter:**

- Bruger Spring Boots reaktive stack med `Flux` til streaming
- `ServerSentEvent` tilbyder struktureret event-streaming med event-typer
- `WebClient` med `bodyToFlux()` muliggør reaktiv streamingforbrug
- `delayElements()` simulerer behandlingstid mellem events
- Events kan have typer (`info`, `result`) for bedre klienthåndtering

### Sammenligning: Klassisk streaming vs MCP-streaming

Forskellene mellem, hvordan streaming fungerer på en "klassisk" måde versus hvordan det fungerer i MCP, kan illustreres som følger:

| Funktion               | Klassisk HTTP Streaming        | MCP Streaming (Notifikationer)   |
|------------------------|-------------------------------|---------------------------------|
| Hovedresponsen         | Bidt op                       | Én enkelt, til slut             |
| Fremdriftsopdateringer | Sendes som dataklodser        | Sendes som notifikationer       |
| Krav til klient        | Skal behandle stream           | Skal implementere beskedhandler |
| Anvendelsestilfælde    | Store filer, AI token streams | Fremdrift, logs, realtidsfeedback |

### Væsentlige forskelle

Her er nogle nøgleforskelle:

- **Kommunikationsmønster:**
  - Klassisk HTTP streaming: Bruger simpel chunked transfer encoding til at sende data i bidder
  - MCP streaming: Bruger et struktureret notifikationssystem med JSON-RPC protokol

- **Beskedformat:**
  - Klassisk HTTP: Almindelige tekstbider med linjeskift
  - MCP: Strukturerede LoggingMessageNotification-objekter med metadata

- **Klientimplementering:**
  - Klassisk HTTP: Simpel klient, der behandler streamingresponser
  - MCP: Mere sofistikeret klient med en beskedhandler til at behandle forskellige typer beskeder

- **Fremdriftsopdateringer:**
  - Klassisk HTTP: Fremdriften er en del af hovedresponsstrømmen
  - MCP: Fremdrift sendes via separate notifikationsmeddelelser, mens hovedrespons kommer til sidst

### Anbefalinger

Vi anbefaler følgende ved valg mellem at implementere klassisk streaming (som et endpoint vist ovenfor via `/stream`) versus streaming via MCP.

- **Til simple streamingbehov:** Klassisk HTTP streaming er nemmere at implementere og tilstrækkeligt til basale streamingbehov.

- **Til komplekse, interaktive applikationer:** MCP streaming giver en mere struktureret tilgang med rigere metadata og adskillelse mellem notifikationer og endelige resultater.

- **Til AI-applikationer:** MCP’s notifikationssystem er særligt nyttigt til langvarige AI-opgaver, hvor du vil holde brugeren informeret om fremdriften.

## Streaming i MCP

Okay, så du har set nogle anbefalinger og sammenligninger indtil nu om forskellen mellem klassisk streaming og streaming i MCP. Lad os gå i detaljer med, hvordan du præcist kan udnytte streaming i MCP.

Forståelse af hvordan streaming fungerer inden for MCP-rammen er essentielt for at bygge responsive applikationer, der giver realtidsfeedback til brugere under langvarige operationer.

I MCP handler streaming ikke om at sende hovedresponsen i bidder, men om at sende **notifikationer** til klienten, mens et værktøj behandler en anmodning. Disse notifikationer kan inkludere fremdriftsopdateringer, logs eller andre hændelser.

### Hvordan det virker

Hovedresultatet sendes stadig som et enkelt svar. Dog kan notifikationer sendes som separate beskeder under behandlingen og dermed opdatere klienten i realtid. Klienten skal kunne håndtere og vise disse notifikationer.

## Hvad er en Notifikation?

Vi sagde "Notifikation", hvad betyder det i MCP-sammenhæng?

En notifikation er en besked sendt fra server til klient for at informere om fremdrift, status eller andre begivenheder under en langvarig operation. Notifikationer øger gennemsigtighed og forbedrer brugeroplevelsen.

For eksempel skal en klient sende en notifikation, når den indledende håndtryk med serveren er etableret.

En notifikation ser således ud som en JSON-besked:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifikationer tilhører et emne i MCP, der kaldes ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

For at få logging til at fungere, skal serveren aktivere det som en funktion/kapabilitet på denne måde:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Afhængigt af den SDK, der bruges, kan logging være aktiveret som standard, eller du skal eksplicit aktivere det i din serverkonfiguration.

Der findes forskellige typer notifikationer:

| Niveau     | Beskrivelse                | Eksempel på brug               |
|------------|---------------------------|-------------------------------|
| debug      | Detaljeret fejlsøgningsinfo | Funktionsindgang/udgangspunkter |
| info       | Generelle informationsmeddelelser | Opdateringer om fremdrift     |
| notice     | Normale, men betydningsfulde hændelser | Konfigurationsændringer        |
| warning    | Advarselsforhold           | Brug af uddaterede funktioner |
| error      | Fejlforhold               | Operationer der fejler        |
| critical   | Kritiske forhold           | Systemkomponentfejl           |
| alert      | Handling skal tages straks | Datakorruption opdaget        |
| emergency  | Systemet er ubrugeligt    | Total systemfejl              |

## Implementering af Notifikationer i MCP

For at implementere notifikationer i MCP skal du opsætte både server- og klientside til at håndtere realtidsopdateringer. Dette gør det muligt for din applikation at give øjeblikkelig feedback til brugere under langvarige operationer.

### Serverside: Afsendelse af Notifikationer

Lad os starte med serversiden. I MCP definerer du værktøjer, som kan sende notifikationer under behandling af anmodninger. Serveren bruger kontekstobjektet (typisk `ctx`) til at sende beskeder til klienten.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

I det foregående eksempel sender `process_files`-værktøjet tre notifikationer til klienten, mens det behandler hver fil. Metoden `ctx.info()` bruges til at sende informationsbeskeder.

For at aktivere notifikationer, sørg for at din server bruger en streamingtransport (som `streamable-http`), og at din klient implementerer en beskedhandler til at behandle notifikationer. Sådan kan du konfigurere serveren til at bruge `streamable-http` transporten:

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

I dette .NET-eksempel er `ProcessFiles`-værktøjet dekoreret med `Tool`-attributten og sender tre notifikationer til klienten, mens det behandler hver fil. Metoden `ctx.Info()` bruges til at sende informationsbeskeder.

For at aktivere notifikationer i din .NET MCP-server, sørg for at du bruger en streamingtransport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Klientside: Modtagelse af Notifikationer

Klienten skal implementere en beskedhandler til at behandle og vise notifikationer, efterhånden som de ankommer.

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

I den foregående kode tjekker funktionen `message_handler`, om den indkommende besked er en notifikation. Hvis det er tilfældet, printer den notifikationen; ellers håndterer den den som en almindelig serversvar. Bemærk også, hvordan `ClientSession` initialiseres med `message_handler` for at håndtere indkommende notifikationer.

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

I dette .NET-eksempel tjekker funktionen `MessageHandler`, om den indkommende besked er en notifikation. Hvis det er tilfældet, printer den notifikationen; ellers håndterer den den som en almindelig serversvar. `ClientSession` initialiseres med beskedhandleren via `ClientSessionOptions`.

For at aktivere notifikationer, sørg for at din server bruger en streamingtransport (som `streamable-http`), og at din klient implementerer en beskedhandler til at behandle notifikationer.

## Fremdriftsnotifikationer & Scenarier

Denne sektion forklarer konceptet med fremdriftsnotifikationer i MCP, hvorfor de er vigtige, og hvordan du implementerer dem ved hjælp af Streambar HTTP. Du finder også en praktisk opgave til at styrke din forståelse.

Fremdriftsnotifikationer er realtidsbeskeder sendt fra server til klient under langvarige operationer. I stedet for at vente på, at hele processen afsluttes, holder serveren klienten opdateret om den aktuelle status. Dette forbedrer gennemsigtighed, brugeroplevelse og gør fejlsøgning lettere.

**Eksempel:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Hvorfor bruge fremdriftsnotifikationer?

Fremdriftsnotifikationer er vigtige af flere grunde:

- **Bedre brugeroplevelse:** Brugere får opdateringer, mens arbejdet skrider frem, ikke kun til slut.
- **Realtidsfeedback:** Klienter kan vise statusbjælker eller logs, hvilket gør appen mere responsiv.
- **Nemmere fejlsøgning og overvågning:** Udviklere og brugere kan se, hvor en proces måske er langsom eller sidder fast.

### Hvordan implementeres fremdriftsnotifikationer

Sådan kan du implementere fremdriftsnotifikationer i MCP:

- **På serveren:** Brug `ctx.info()` eller `ctx.log()` til at sende notifikationer, efterhånden som hvert element behandles. Dette sender en besked til klienten, før hovedresultatet er klart.
- **På klienten:** Implementer en beskedhandler, som lytter efter og viser notifikationer, når de ankommer. Handleren skelner mellem notifikationer og det endelige resultat.

**Servereksempel:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Klienteksempel:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Sikkerhedsmæssige Overvejelser

Når MCP-servere implementeres med HTTP-baserede transportmekanismer, bliver sikkerhed en altafgørende faktor, som kræver omhyggelig opmærksomhed på flere angrebsoverflader og beskyttelsesmekanismer.

### Oversigt

Sikkerhed er kritisk ved eksponering af MCP-servere over HTTP. Streambar HTTP introducerer nye angrebsoverflader og kræver grundig konfiguration.

### Vigtige punkter
- **Validering af Origin-header**: Valider altid `Origin`-headeren for at forhindre DNS-rebinding-angreb.
- **Binding til localhost**: Til lokal udvikling, bind servere til `localhost` for at undgå at udsætte dem for det offentlige internet.
- **Autentifikation**: Implementer autentifikation (f.eks. API-nøgler, OAuth) til produktionsimplementeringer.
- **CORS**: Konfigurer politikker for Cross-Origin Resource Sharing (CORS) for at begrænse adgang.
- **HTTPS**: Brug HTTPS i produktion for at kryptere trafikken.

### Bedste praksis

- Stol aldrig på indkommende forespørgsler uden validering.
- Log og overvåg al adgang og fejl.
- Opdater regelmæssigt afhængigheder for at udbedre sikkerhedsproblemer.

### Udfordringer

- At balancere sikkerhed med nem udvikling
- Sikre kompatibilitet med forskellige klientmiljøer

## Opgradering fra SSE til Streamable HTTP

For applikationer, der i øjeblikket bruger Server-Sent Events (SSE), giver en migration til Streamable HTTP udvidede muligheder og bedre langsigtet bæredygtighed for dine MCP-implementeringer.

### Hvorfor opgradere?

Der er to overbevisende grunde til at opgradere fra SSE til Streamable HTTP:

- Streamable HTTP tilbyder bedre skalerbarhed, kompatibilitet og rigere notificeringsstøtte end SSE.
- Det er den anbefalede transport for nye MCP-applikationer.

### Migrationstrin

Sådan kan du migrere fra SSE til Streamable HTTP i dine MCP-applikationer:

- **Opdater serverkoden** til at bruge `transport="streamable-http"` i `mcp.run()`.
- **Opdater klientkoden** til at bruge `streamablehttp_client` i stedet for SSE-klient.
- **Implementer en beskedhandler** i klienten til at behandle notifikationer.
- **Test for kompatibilitet** med eksisterende værktøjer og arbejdsgange.

### Bevarelse af kompatibilitet

Det anbefales at bevare kompatibilitet med eksisterende SSE-klienter under migrationsprocessen. Her er nogle strategier:

- Du kan støtte både SSE og Streamable HTTP ved at køre begge transports på forskellige endpoints.
- Migrer gradvist klienter til den nye transport.

### Udfordringer

Sørg for at håndtere følgende udfordringer under migration:

- Sikre at alle klienter bliver opdateret
- Håndtering af forskelle i leveringen af notifikationer

## Sikkerhedsmæssige overvejelser

Sikkerhed bør være en topprioritet, når du implementerer en server, især når du bruger HTTP-baserede transports som Streamable HTTP i MCP.

Når du implementerer MCP-servere med HTTP-baserede transports, bliver sikkerhed en altafgørende faktor, som kræver nøje opmærksomhed på flere angrebsvinkler og beskyttelsesmekanismer.

### Oversigt

Sikkerhed er kritisk, når MCP-servere udsættes over HTTP. Streamable HTTP introducerer nye angrebsflader og kræver nøje konfiguration.

Her er nogle vigtige sikkerhedsovervejelser:

- **Validering af Origin-header**: Valider altid `Origin`-headeren for at forhindre DNS-rebinding-angreb.
- **Binding til localhost**: Til lokal udvikling, bind servere til `localhost` for at undgå at udsætte dem for det offentlige internet.
- **Autentifikation**: Implementer autentifikation (f.eks. API-nøgler, OAuth) til produktionsimplementeringer.
- **CORS**: Konfigurer politikker for Cross-Origin Resource Sharing (CORS) for at begrænse adgang.
- **HTTPS**: Brug HTTPS i produktion for at kryptere trafikken.

### Bedste praksis

Derudover er her nogle bedste praksisser at følge, når du implementerer sikkerhed i din MCP streaming-server:

- Stol aldrig på indkommende forespørgsler uden validering.
- Log og overvåg al adgang og fejl.
- Opdater regelmæssigt afhængigheder for at udbedre sikkerhedsproblemer.

### Udfordringer

Du vil stå over for nogle udfordringer, når du implementerer sikkerhed i MCP streaming-servere:

- At balancere sikkerhed med nem udvikling
- Sikre kompatibilitet med forskellige klientmiljøer

### Opgave: Byg din egen streaming MCP-app

**Scenario:**  
Byg en MCP-server og klient, hvor serveren behandler en liste af elementer (f.eks. filer eller dokumenter) og sender en notifikation for hvert behandlede element. Klienten skal vise hver notifikation, efterhånden som de kommer.

**Trin:**

1. Implementer et serverværktøj, der behandler en liste og sender notifikationer for hvert element.
2. Implementer en klient med en beskedhandler til at vise notifikationer i realtid.
3. Test din implementering ved at køre både server og klient, og observer notifikationerne.

[Solution](./solution/README.md)

## Yderligere læsning & hvad nu?

For at fortsætte din rejse med MCP-streaming og udvide din viden, giver denne sektion flere ressourcer og foreslåede næste skridt til at bygge mere avancerede applikationer.

### Yderligere læsning

- [Microsoft: Introduktion til HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS i ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Hvad nu?

- Prøv at bygge mere avancerede MCP-værktøjer, der bruger streaming til realtidsanalyse, chat eller samarbejdende redigering.
- Udforsk integration af MCP-streaming med frontend-rammer (React, Vue osv.) for live UI-opdateringer.
- Næste: [Udnyttelse af AI Toolkit til VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->