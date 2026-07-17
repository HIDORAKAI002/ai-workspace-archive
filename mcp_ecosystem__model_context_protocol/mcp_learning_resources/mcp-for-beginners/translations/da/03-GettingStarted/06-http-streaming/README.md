# HTTPS Streaming med Model Context Protocol (MCP)

Dette kapitel giver en omfattende guide til implementering af sikker, skalerbar og realtids-streaming med Model Context Protocol (MCP) ved brug af HTTPS. Det dækker motivationen for streaming, de tilgængelige transportmekanismer, hvordan man implementerer streambar HTTP i MCP, bedste sikkerhedspraksis, migration fra SSE og praktisk vejledning til at bygge dine egne streaming MCP-applikationer.

> **Fremtidsblik:** denne lektion beskriver Streambar HTTP under **MCP Specification 2025-11-25**, hvor en session etableres under `initialize` og fastgøres med en `Mcp-Session-Id` header. Releasekandidaten `2026-07-28` fjerner håndtrykket og session-ID helt, hvilket gør hver anmodning selvstændig og dirigerbar til enhver serverinstans uden sticky sessions. Se [Hvad ændres i MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) for detaljer.

## Transportmekanismer og Streaming i MCP

Dette afsnit undersøger de forskellige transportmekanismer, der er tilgængelige i MCP, og deres rolle i at gøre streaming muligt for realtidskommunikation mellem klienter og servere.

### Hvad er en transportmekanisme?

En transportmekanisme definerer, hvordan data udveksles mellem klient og server. MCP understøtter flere transporttyper for at passe til forskellige miljøer og krav:

- **stdio**: Standard input/output, egnet til lokale og CLI-baserede værktøjer. Simpelt, men ikke egnet til web eller cloud.
- **SSE (Server-Sent Events)**: Tillader servere at sende realtidsopdateringer til klienter over HTTP. Godt til web-UI'er, men begrænset i skalerbarhed og fleksibilitet. Fra MCP Specification 2025-06-18 er den selvstændige SSE-transport udfaset og erstattet af "Streamable HTTP" transport.
- **Streamable HTTP**: Moderne HTTP-baseret streamingtransport, understøtter notifikationer og bedre skalerbarhed. Anbefalet til de fleste produktions- og cloud-scenarier.

### Sammenligningstabel

Tag et kig på sammenligningstabellen nedenfor for at forstå forskellene mellem disse transportmekanismer:

| Transport         | Realtidsopdateringer | Streaming | Skalerbarhed | Brugsområde             |
|-------------------|---------------------|-----------|--------------|-------------------------|
| stdio             | Nej                 | Nej       | Lav          | Lokale CLI-værktøjer    |
| SSE               | Ja                  | Ja        | Mellem       | Web, realtidsopdateringer|
| Streamable HTTP   | Ja                  | Ja        | Høj          | Cloud, multi-klient     |

> **Tip:** Valg af korrekt transport påvirker ydeevne, skalerbarhed og brugeroplevelse. **Streamable HTTP** anbefales til moderne, skalerbare og cloud-klar applikationer.

Bemærk transporterne stdio og SSE, som du blev vist i de tidligere kapitler, og hvordan streambar HTTP er den transport, der dækkes i dette kapitel.

## Streaming: Begreber og Motivation

At forstå de grundlæggende begreber og motivationen bag streaming er essentielt for at implementere effektive realtidskommunikationssystemer.

**Streaming** er en teknik inden for netværksprogrammering, der tillader data at blive sendt og modtaget i små, håndterbare bidder eller som en række af begivenheder, i stedet for at vente på, at et helt svar er klar. Dette er især nyttigt til:

- Store filer eller datasæt.
- Realtidsopdateringer (f.eks. chat, fremdriftsbjælker).
- Langvarige beregninger, hvor du ønsker at holde brugeren informeret.

Her er hvad du skal vide om streaming på højt niveau:

- Data leveres gradvist, ikke alt på én gang.
- Klienten kan behandle data, efterhånden som de ankommer.
- Reducerer opfattet latenstid og forbedrer brugeroplevelsen.

### Hvorfor bruge streaming?

Grundene til at bruge streaming er følgende:

- Brugere får øjeblikkelig feedback, ikke kun til slut
- Muliggør realtidsapplikationer og responsive UI'er
- Mere effektiv brug af netværks- og computerressourcer

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

Dette eksempel demonstrerer en server, der sender en række beskeder til klienten, efterhånden som de bliver tilgængelige, i stedet for at vente på, at alle beskeder er klar.

**Sådan fungerer det:**

- Serveren udleverer hver besked, når den er klar.
- Klienten modtager og printer hver bid, efterhånden som den ankommer.

**Krav:**

- Serveren skal bruge et streaming-svar (f.eks. `StreamingResponse` i FastAPI).
- Klienten skal behandle svaret som en stream (`stream=True` i requests).
- Content-Type er normalt `text/event-stream` eller `application/octet-stream`.

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

- Bruger Spring Boots reactive stack med `Flux` til streaming
- `ServerSentEvent` tilbyder struktureret event-streaming med event-typer
- `WebClient` med `bodyToFlux()` muliggør reaktiv streamingforbrug
- `delayElements()` simulerer behandlingstid mellem events
- Events kan have typer (`info`, `result`) for bedre klienthåndtering

### Sammenligning: Klassisk Streaming vs MCP Streaming

Forskellene mellem, hvordan streaming fungerer på en "klassisk" måde kontra hvordan det fungerer i MCP kan fremstilles således:

| Funktion                | Klassisk HTTP Streaming       | MCP Streaming (Notifikationer)  |
|------------------------|------------------------------|---------------------------------|
| Hovedrespons            | Opdelt i bidder              | Enkelt, til slut                |
| Fremdriftsopdateringer  | Sendt som datastykker        | Sendt som notifikationer        |
| Klientkrav              | Skal behandle stream         | Skal implementere beskedhandler |
| Brugsområde             | Store filer, AI token streams| Fremdrift, logs, realtidsfeedback|

### Observerede nøgleforskelle

Yderligere er her nogle nøgleforskelle:

- **Kommunikationsmønster:**
  - Klassisk HTTP streaming: Bruger simpel chunked transfer encoding til at sende data i bidder
  - MCP streaming: Bruger et struktureret notifikationssystem med JSON-RPC protokol

- **Beskedformat:**
  - Klassisk HTTP: Almindelige tekstbidder med linjeskift
  - MCP: Strukturerede LoggingMessageNotification objekter med metadata

- **Klientimplementering:**
  - Klassisk HTTP: Simpel klient, der behandler streaming-svar
  - MCP: Mere sofistikeret klient med beskedhandler til at behandle forskellige typer beskeder

- **Fremdriftsopdateringer:**
  - Klassisk HTTP: Fremdriften er del af hovedsvarstrømmen
  - MCP: Fremdrift sendes via separate notifikationsbeskeder, mens hovedsvar kommer til slut

### Anbefalinger

Der er nogle ting, vi anbefaler, når det kommer til valg mellem at implementere klassisk streaming (som det endpoint, vi viste dig ovenfor med `/stream`) versus at vælge streaming via MCP.

- **Til simple streamingbehov:** Klassisk HTTP streaming er nemmere at implementere og tilstrækkeligt til grundlæggende streamingbehov.

- **Til komplekse, interaktive applikationer:** MCP streaming giver en mere struktureret tilgang med rigere metadata og adskillelse mellem notifikationer og slutresultater.

- **Til AI-applikationer:** MCP's notifikationssystem er især nyttigt til langvarige AI-opgaver, hvor du ønsker at holde brugere opdateret om fremdriften.

## Streaming i MCP

Ok, så du har set nogle anbefalinger og sammenligninger indtil nu om forskellen mellem klassisk streaming og streaming i MCP. Lad os gå i detaljer med, hvordan du præcist kan udnytte streaming i MCP.

At forstå, hvordan streaming fungerer indenfor MCP-rammen, er essentielt for at bygge responsive applikationer, der giver realtidsfeedback til brugere under langvarige operationer.

I MCP handler streaming ikke om at sende hovedsvaret i bidder, men om at sende **notifikationer** til klienten, mens et værktøj behandler en anmodning. Disse notifikationer kan inkludere fremdriftsopdateringer, logs eller andre begivenheder.

### Sådan fungerer det

Hovedresultatet sendes stadig som et enkelt svar. Dog kan notifikationer sendes som separate beskeder under behandlingen og dermed opdatere klienten i realtid. Klienten skal kunne håndtere og vise disse notifikationer.

## Hvad er en notifikation?

Vi sagde "Notifikation", hvad betyder det i konteksten af MCP?

En notifikation er en besked sendt fra serveren til klienten for at informere om fremdrift, status eller andre begivenheder under en langvarig operation. Notifikationer forbedrer gennemsigtighed og brugeroplevelse.

For eksempel forventes en klient at sende en notifikation, når det indledende håndtryk med serveren er gennemført.

En notifikation ser sådan ud som en JSON-besked:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifikationer hører til et emne i MCP kaldet ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Udfasningsbesked:** MCP specifikations releasekandidaten `2026-07-28` markerer Logging-primitivet som udfaset til fordel for `stderr` for stdio-transports og OpenTelemetry til struktureret observabilitet. Logging fortsætter med at virke i `2025-11-25` og mindst et år efter en eventuel formel udfasning. Se [Hvad ændres i MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

For at få logging til at fungere, skal serveren aktivere det som feature/kapabilitet således:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Afhængigt af den anvendte SDK kan logging være aktiveret som standard, eller du kan være nødt til eksplicit at aktivere det i din serverkonfiguration.

Der findes forskellige typer af notifikationer:

| Niveau     | Beskrivelse                   | Eksempelbrug                  |
|-----------|------------------------------|------------------------------|
| debug     | Detaljeret fejlsøgningsinfo  | Funktions start/slutpunkter   |
| info      | Generelle informationsbeskeder| Fremdriftsopdateringer        |
| notice    | Normale men væsentlige begivenheder | Konfigurationsændringer  |
| warning   | Advarsler                    | Brug af udfaset funktion      |
| error     | Fejltilstande                | Operationfejl                 |
| critical  | Kritiske betingelser         | Systemkomponentfejl           |
| alert     | Handling skal tages straks    | Datakorruption opdaget        |
| emergency | Systemet er ubrugeligt       | Totalt systemnedbrud          |

## Implementering af Notifikationer i MCP

For at implementere notifikationer i MCP skal du sætte både server- og klientsiden op til at håndtere realtidsopdateringer. Dette gør det muligt for din applikation straks at give feedback til brugerne under langvarige operationer.

### Server-side: Afsendelse af Notifikationer

Lad os starte med serversiden. I MCP definerer du værktøjer, der kan sende notifikationer, mens de behandler anmodninger. Serveren bruger kontekstobjektet (normalt `ctx`) til at sende beskeder til klienten.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

I det foregående eksempel sender `process_files` værktøjet tre notifikationer til klienten, efterhånden som det behandler hver fil. Metoden `ctx.info()` bruges til at sende informationsbeskeder.

Derudover, for at aktivere notifikationer, skal din server bruge en streamingtransport (som `streamable-http`), og din klient skal implementere en beskedhandler til at behandle notifikationer. Sådan kan du konfigurere serveren til at bruge `streamable-http` transporten:

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

I dette .NET eksempel er `ProcessFiles` værktøjet dekoreret med `Tool` attributten og sender tre notifikationer til klienten, mens hver fil behandles. Metoden `ctx.Info()` bruges til at sende informationsbeskeder.

For at aktivere notifikationer i din .NET MCP server, skal du sikre dig, at du bruger en streamingtransport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Klient-side: Modtagelse af Notifikationer

Klienten skal implementere en beskedhandler til at behandle og vise notifikationer, efterhånden som de modtages.

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

I koden ovenfor tjekker funktionen `message_handler` om den indkommende besked er en notifikation. Hvis den er, udskriver den notifikationen; ellers behandler den den som en almindelig serverbesked. Bemærk også, hvordan `ClientSession` initialiseres med `message_handler` til at håndtere indkommende notifikationer.

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

I dette .NET eksempel tjekker `MessageHandler` funktionen, om den indkommende besked er en notifikation. Hvis det er tilfældet, printer den notifikationen; ellers behandler den den som en almindelig serverbesked. `ClientSession` initialiseres med beskedhandleren via `ClientSessionOptions`.

For at aktivere notifikationer skal du sikre dig, at din server bruger en streamingtransport (som `streamable-http`), og at din klient implementerer en beskedhandler til at behandle notifikationer.

## Fremdriftsnotifikationer & Scenarier

Dette afsnit forklarer konceptet med fremdriftsnotifikationer i MCP, hvorfor de er vigtige, og hvordan man implementerer dem med Streamable HTTP. Du vil også finde en praktisk opgave til at styrke din forståelse.

Fremdriftsnotifikationer er realtidsbeskeder sendt fra serveren til klienten under langvarige operationer. I stedet for at vente på, at hele processen er færdig, holder serveren klienten opdateret om den aktuelle status. Dette forbedrer gennemsigtighed, brugeroplevelse og gør fejlretning lettere.

**Eksempel:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Hvorfor bruge fremdriftsnotifikationer?

Fremdriftsnotifikationer er væsentlige af flere grunde:

- **Bedre brugeroplevelse:** Brugere ser opdateringer efterhånden som arbejdet skrider frem, ikke kun til slut.
- **Realtidsfeedback:** Klienter kan vise fremdriftsbjælker eller logs, hvilket gør appen mere responsiv.
- **Lettere fejlfinding og overvågning:** Udviklere og brugere kan se, hvor en proces måske er langsom eller hænger fast.

### Sådan implementeres fremdriftsnotifikationer

Sådan kan du implementere fremdriftsnotifikationer i MCP:

- **På serveren:** Brug `ctx.info()` eller `ctx.log()` til at sende notifikationer, efterhånden som hver punkt behandles. Dette sender en besked til klienten før hovedresultatet er klar.
- **På klienten:** Implementer en beskedhandler, som lytter efter og viser notifikationer, når de modtages. Denne handler skelner mellem notifikationer og det endelige resultat.

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

**Kundeeksempel:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Sikkerhedsovervejelser

Når man implementerer MCP-servere med HTTP-baserede transportformer, bliver sikkerhed en altafgørende bekymring, der kræver omhyggelig opmærksomhed på flere angrebsvektorer og beskyttelsesmekanismer.

### Oversigt

Sikkerhed er kritisk, når MCP-servere eksponeres over HTTP. Streamable HTTP introducerer nye angrebsflader og kræver omhyggelig konfiguration.

### Vigtige punkter

- **Validering af Origin-header**: Valider altid `Origin`-headeren for at forhindre DNS-rebinding-angreb.
- **Binding til localhost**: For lokal udvikling, bind servere til `localhost` for at undgå at udsætte dem for det offentlige internet.
- **Autentificering**: Implementer autentificering (f.eks. API-nøgler, OAuth) til produktionsudrulninger.
- **CORS**: Konfigurer politikker for Cross-Origin Resource Sharing (CORS) for at begrænse adgang.
- **HTTPS**: Brug HTTPS i produktion for at kryptere trafik.

### Bedste praksis

- Stol aldrig på indgående forespørgsler uden validering.
- Log og overvåg al adgang og fejl.
- Opdater regelmæssigt afhængigheder for at rette sikkerhedssårbarheder.

### Udfordringer

- At balancere sikkerhed med nem udvikling
- At sikre kompatibilitet med forskellige klientmiljøer

## Opgradering fra SSE til Streamable HTTP

For applikationer, der i øjeblikket bruger Server-Sent Events (SSE), giver migration til Streamable HTTP forbedrede muligheder og bedre langsigtet bæredygtighed for dine MCP-implementeringer.

### Hvorfor opgradere?

Der er to overbevisende grunde til at opgradere fra SSE til Streamable HTTP:

- Streamable HTTP tilbyder bedre skalerbarhed, kompatibilitet og rigere notifikationsunderstøttelse end SSE.
- Det er den anbefalede transport for nye MCP-applikationer.

### Migreringstrin

Sådan kan du migrere fra SSE til Streamable HTTP i dine MCP-applikationer:

- **Opdater serverkoden** til at bruge `transport="streamable-http"` i `mcp.run()`.
- **Opdater klientkoden** til at bruge `streamablehttp_client` i stedet for SSE-klienten.
- **Implementer en beskedhandler** i klienten til at behandle notifikationer.
- **Test for kompatibilitet** med eksisterende værktøjer og arbejdsgange.

### Vedligeholdelse af kompatibilitet

Det anbefales at bevare kompatibilitet med eksisterende SSE-klienter under migrationsprocessen. Her er nogle strategier:

- Du kan understøtte både SSE og Streamable HTTP ved at køre begge transportformer på forskellige endpoints.
- Migrér klienter gradvist til den nye transport.

### Udfordringer

Sørg for at håndtere følgende udfordringer under migreringen:

- At sikre at alle klienter bliver opdateret
- At håndtere forskelle i leveringen af notifikationer

## Sikkerhedsovervejelser

Sikkerhed bør være højeste prioritet, når man implementerer en hvilken som helst server, især når man bruger HTTP-baserede transportformer som Streamable HTTP i MCP.

Når man implementerer MCP-servere med HTTP-baserede transportformer, bliver sikkerhed en altafgørende bekymring, der kræver omhyggelig opmærksomhed på flere angrebsvektorer og beskyttelsesmekanismer.

### Oversigt

Sikkerhed er kritisk, når MCP-servere eksponeres over HTTP. Streamable HTTP introducerer nye angrebsflader og kræver omhyggelig konfiguration.

Her er nogle vigtige sikkerhedsovervejelser:

- **Validering af Origin-header**: Valider altid `Origin`-headeren for at forhindre DNS-rebinding-angreb.
- **Binding til localhost**: For lokal udvikling, bind servere til `localhost` for at undgå at udsætte dem for det offentlige internet.
- **Autentificering**: Implementer autentificering (f.eks. API-nøgler, OAuth) til produktionsudrulninger.
- **CORS**: Konfigurer politikker for Cross-Origin Resource Sharing (CORS) for at begrænse adgang.
- **HTTPS**: Brug HTTPS i produktion for at kryptere trafik.

### Bedste praksis

Derudover er her nogle bedste praksisser at følge, når man implementerer sikkerhed i din MCP-streamingserver:

- Stol aldrig på indgående forespørgsler uden validering.
- Log og overvåg al adgang og fejl.
- Opdater regelmæssigt afhængigheder for at rette sikkerhedssårbarheder.

### Udfordringer

Du vil møde nogle udfordringer, når du implementerer sikkerhed i MCP-streamingservere:

- At balancere sikkerhed med nem udvikling
- At sikre kompatibilitet med forskellige klientmiljøer

### Opgave: Byg din egen streaming MCP-app

**Scenario:**
Byg en MCP-server og -klient, hvor serveren behandler en liste med emner (f.eks. filer eller dokumenter) og sender en notifikation for hvert emne, der behandles. Klienten skal vise hver notifikation, når den ankommer.

**Trin:**

1. Implementér et serverværktøj, der behandler en liste og sender notifikationer for hvert element.
2. Implementér en klient med en beskedhandler til at vise notifikationer i realtid.
3. Test din implementering ved at køre både server og klient og observere notifikationerne.

[Løsning](./solution/README.md)

## Yderligere læsning & hvad nu?

For at fortsætte din rejse med MCP-streaming og udvide din viden giver denne sektion yderligere ressourcer og foreslåede næste skridt til at bygge mere avancerede applikationer.

### Yderligere læsning

- [Microsoft: Introduktion til HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS i ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Hvad nu?

- Prøv at bygge mere avancerede MCP-værktøjer, der bruger streaming til realtidsanalyse, chat eller samarbejdende redigering.
- Undersøg integration af MCP-streaming med frontend-rammer (React, Vue osv.) for live UI-opdateringer.
- Næste: [Udnyt AI Toolkit til VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->