# HTTPS Streaming med Model Context Protocol (MCP)

Dette kapitel giver en omfattende vejledning i implementering af sikker, skalerbar og realtids streaming med Model Context Protocol (MCP) ved brug af HTTPS. Det dækker motivationen for streaming, de tilgængelige transportmekanismer, hvordan man implementerer streambar HTTP i MCP, sikkerhedspraksis, migration fra SSE og praktiske vejledninger til at bygge dine egne streaming MCP-applikationer.

## Transportmekanismer og Streaming i MCP

Dette afsnit udforsker de forskellige transportmekanismer, der er tilgængelige i MCP, og deres rolle i at muliggøre streamingfunktioner til realtidskommunikation mellem klienter og servere.

### Hvad er en Transportmekanisme?

En transportmekanisme definerer, hvordan data udveksles mellem klient og server. MCP understøtter flere transporttyper for at passe til forskellige miljøer og krav:

- **stdio**: Standard input/output, egnet til lokale og CLI-baserede værktøjer. Simpelt, men ikke egnet til web eller cloud.
- **SSE (Server-Sent Events)**: Tillader servere at presse realtidsopdateringer til klienter over HTTP. God til web-brugerflader, men begrænset i skalerbarhed og fleksibilitet. Fra MCP Specification 2025-06-18 er den selvstændige SSE (Server-Sent Events) transport udfaset og erstattet af "Streamable HTTP" transport.
- **Streamable HTTP**: Moderne HTTP-baseret streamingtransport, som understøtter notifikationer og bedre skalerbarhed. Anbefales til de fleste produktions- og cloudscenarier.

### Sammenligningstabel

Se på sammenligningstabellen nedenfor for at forstå forskellene mellem disse transportmekanismer:

| Transport         | Realtidsopdateringer | Streaming | Skalerbarhed | Brugssag                |
|-------------------|---------------------|-----------|--------------|-------------------------|
| stdio             | Nej                 | Nej       | Lav          | Lokale CLI-værktøjer    |
| SSE               | Ja                  | Ja        | Medium       | Web, realtidsopdateringer|
| Streamable HTTP   | Ja                  | Ja        | Høj          | Cloud, multi-klient     |

> **Tip:** Valg af den rigtige transport påvirker ydeevne, skalerbarhed og brugeroplevelse. **Streamable HTTP** anbefales til moderne, skalerbare og cloud-klar applikationer.

Bemærk transporterne stdio og SSE, som du blev vist i de tidligere kapitler, og hvordan streambar HTTP er den transport, der dækkes i dette kapitel.

## Streaming: Begreber og Motivation

At forstå de grundlæggende begreber og motivation bag streaming er essentielt for at implementere effektive realtidskommunikationssystemer.

**Streaming** er en teknik i netværksprogrammering, der tillader data at blive sendt og modtaget i små, håndterbare bidder eller som en sekvens af begivenheder i stedet for at vente på, at et helt svar er klar. Dette er særligt nyttigt for:

- Store filer eller datasæt.
- Realtidsopdateringer (f.eks. chat, fremskridtsbjælker).
- Langvarige beregninger, hvor man ønsker at holde brugeren informeret.

Her er hvad du skal vide om streaming på et overordnet plan:

- Data leveres gradvist, ikke alt på én gang.
- Klienten kan behandle data, efterhånden som det modtages.
- Reducerer oplevet latenstid og forbedrer brugeroplevelsen.

### Hvorfor bruge streaming?

Årsagerne til at bruge streaming er følgende:

- Brugerne får øjeblikkelig feedback, ikke kun ved slutningen.
- Muliggør realtidsapplikationer og responsive brugerflader.
- Mere effektiv udnyttelse af netværks- og computerressourcer.

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

**Sådan virker det:**

- Serveren sender hver besked, efterhånden som den er klar.
- Klienten modtager og udskriver hver del, efterhånden som den ankommer.

**Krav:**

- Serveren skal bruge et streamende svar (f.eks. `StreamingResponse` i FastAPI).
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

- Bruger Spring Boots reaktive stack med `Flux` til streaming
- `ServerSentEvent` giver struktureret event-streaming med event-typer
- `WebClient` med `bodyToFlux()` muliggør reaktiv streamingforbrug
- `delayElements()` simulerer behandlingstid mellem events
- Events kan have typer (`info`, `result`) for bedre klienthåndtering

### Sammenligning: Klassisk Streaming vs MCP Streaming

Forskellene mellem hvordan streaming virker på en "klassisk" måde versus hvordan den virker i MCP kan skitseres som følger:

| Funktion               | Klassisk HTTP Streaming        | MCP Streaming (Notifikationer)     |
|------------------------|-------------------------------|-----------------------------------|
| Hovedsvar              | Chunked                       | Én enkelt, til slut               |
| Fremskridtsopdateringer| Sendes som datablokke         | Sendes som notifikationer          |
| Klientkrav             | Skal behandle streamen         | Skal implementere beskedshåndtering|
| Brugssag               | Store filer, AI token streams | Fremskridt, logs, realtidsfeedback |

### Vigtige observerede forskelle

Derudover er der nogle nøgleforskelle:

- **Kommunikationsmønster:**
  - Klassisk HTTP streaming: Bruger simpel chunked transfer encoding til at sende data i bidder
  - MCP streaming: Bruger et struktureret notifikationssystem med JSON-RPC protokol

- **Beskedformat:**
  - Klassisk HTTP: Almindelig tekst med nye linjer
  - MCP: Strukturerede LoggingMessageNotification objekter med metadata

- **Klientimplementering:**
  - Klassisk HTTP: Simpel klient, der behandler streaming-svar
  - MCP: Mere sofistikeret klient med beskedshåndtering til at bearbejde forskellige typer beskeder

- **Fremskridtsopdateringer:**
  - Klassisk HTTP: Fremskridt er en del af hovedsvarstrømmen
  - MCP: Fremskridt sendes via separate notifikationsbeskeder, mens hovedsvar kommer til sidst

### Anbefalinger

Der er nogle ting, vi anbefaler, når det handler om valg mellem klassisk streaming (som et endpoint vist ovenfor ved brug af `/stream`) og streaming via MCP.

- **For simple streamingbehov:** Klassisk HTTP streaming er lettere at implementere og tilstrækkeligt til grundlæggende streamingbehov.

- **For komplekse, interaktive applikationer:** MCP streaming giver en mere struktureret tilgang med rigere metadata og adskillelse mellem notifikationer og slutresultater.

- **For AI-applikationer:** MCP’s notifikationssystem er særligt nyttigt til langvarige AI-opgaver, hvor man ønsker at holde brugerne informeret om fremskridt.

## Streaming i MCP

Ok, så du har set nogle anbefalinger og sammenligninger indtil videre om forskellen mellem klassisk streaming og streaming i MCP. Lad os gå i detaljer med, hvordan du nøjagtigt kan udnytte streaming i MCP.

At forstå, hvordan streaming fungerer inden for MCP-frameworket, er essentielt for at bygge responsive applikationer, der giver realtidsfeedback til brugerne under langvarige operationer.

I MCP handler streaming ikke om at sende hovedsvar i bidder, men om at sende **notifikationer** til klienten, mens et værktøj behandler en anmodning. Disse notifikationer kan inkludere fremskridtsopdateringer, logs eller andre begivenheder.

### Sådan virker det

Hovedresultatet sendes stadig som et enkelt svar. Men notifikationer kan sendes som separate beskeder under behandlingen og dermed opdatere klienten i realtid. Klienten skal kunne håndtere og vise disse notifikationer.

## Hvad er en Notifikation?

Vi sagde "Notifikation", hvad betyder det i MCP-kontekst?

En notifikation er en besked sendt fra server til klient for at informere om fremskridt, status eller andre begivenheder under en langvarig operation. Notifikationer forbedrer gennemsigtighed og brugeroplevelsen.

For eksempel skal en klient sende en notifikation, når det indledende handshake med serveren er gennemført.

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

Notifikationer hører til et emne i MCP, der kaldes ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

For at få logging til at fungere, skal serveren aktivere det som funktion/kapacitet således:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Afhængigt af den brugte SDK kan logging være aktiveret som standard, eller du skal eksplicit aktivere det i din serverkonfiguration.

Der findes forskellige typer notifikationer:

| Niveau     | Beskrivelse                   | Eksempel på brug               |
|------------|------------------------------|-------------------------------|
| debug      | Detaljeret fejlsøgningsinfo  | Funktionsind- og udgangspunkter|
| info       | Generelle informationsbeskeder| Opdateringer om operationens fremskridt  |
| notice     | Normale, men væsentlige hændelser| Konfigurationsændringer       |
| warning    | Advarselsbetingelser          | Brug af forældet funktion      |
| error      | Fejlbetingelser               | Fejl i operationer             |
| critical   | Kritiske betingelser          | Fejl i systemkomponenter       |
| alert      | Handling skal tages omgående  | Datakorruption opdaget         |
| emergency  | Systemet er ubrugeligt        | Fuldstændig systemfejl         |

## Implementering af Notifikationer i MCP

For at implementere notifikationer i MCP skal du sætte både server- og klientsiden op til at håndtere realtidsopdateringer. Det gør det muligt for din applikation at give øjeblikkelig feedback til brugere under langvarige operationer.

### Serverside: Afsendelse af Notifikationer

Lad os starte med serversiden. I MCP definerer du værktøjer, som kan sende notifikationer under behandlingen af forespørgsler. Serveren bruger kontekstobjektet (typisk `ctx`) til at sende beskeder til klienten.

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

Derudover, for at aktivere notifikationer, skal din server bruge en streaming-transport (som `streamable-http`), og din klient skal implementere en beskedshåndtering til at bearbejde notifikationer. Sådan kan du sætte serveren op til at bruge `streamable-http` transporten:

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

I dette .NET-eksempel er `ProcessFiles`-værktøjet dekoreret med `Tool`-attributten og sender tre notifikationer til klienten, mens hver fil behandles. `ctx.Info()`-metoden bruges til at sende informationsbeskeder.

For at aktivere notifikationer i din .NET MCP server, skal du sikre, at du bruger en streamingtransport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Klientside: Modtagelse af Notifikationer

Klienten skal implementere en beskedshåndtering til at bearbejde og vise notifikationer, efterhånden som de ankommer.

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

I ovenstående kode tjekker funktionen `message_handler`, om den indkommende besked er en notifikation. Hvis det er tilfældet, udskriver den notifikationen; ellers behandler den beskeden som en almindelig serverbesked. Bemærk også, hvordan `ClientSession` initialiseres med `message_handler` til at håndtere indkommende notifikationer.

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

I dette .NET-eksempel tjekker funktionen `MessageHandler`, om den indkommende besked er en notifikation. Hvis ja, udskrives notifikationen; ellers behandles den som en almindelig serverbesked. `ClientSession` initialiseres med beskedshåndteringen via `ClientSessionOptions`.

For at aktivere notifikationer skal du sikre, at din server bruger en streamingtransport (som `streamable-http`), og din klient implementerer en beskedshåndtering til at bearbejde notifikationer.

## Fremskridtsnotifikationer & Scenarier

Dette afsnit forklarer begrebet fremskridtsnotifikationer i MCP, hvorfor de er vigtige, og hvordan de implementeres ved brug af Streamable HTTP. Du finder også en praktisk opgave til at styrke din forståelse.

Fremskridtsnotifikationer er realtidsbeskeder sendt fra server til klient under langvarige operationer. I stedet for at vente på, at hele processen er færdig, holder serveren klienten opdateret om den aktuelle status. Dette forbedrer gennemsigtighed, brugeroplevelse og gør fejlfinding lettere.

**Eksempel:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Hvorfor bruge fremskridtsnotifikationer?

Fremskridtsnotifikationer er essentielle af flere grunde:

- **Bedre brugeroplevelse:** Brugerne ser opdateringer, mens arbejdet skrider frem, ikke kun til slut.
- **Realtidsfeedback:** Klienter kan vise fremskridtsbjælker eller logs, hvilket får appen til at føles mere responsiv.
- **Lettere debugging og overvågning:** Udviklere og brugere kan se, hvor en proces måske er langsom eller går i stå.

### Hvordan implementeres fremskridtsnotifikationer

Sådan kan du implementere fremskridtsnotifikationer i MCP:

- **På serveren:** Brug `ctx.info()` eller `ctx.log()` til at sende notifikationer, efterhånden som hvert element behandles. Dette sender en besked til klienten, inden hovedresultatet er klar.
- **På klienten:** Implementer en beskedshåndtering, der lytter efter og viser notifikationer, efterhånden som de ankommer. Denne håndtering skelner mellem notifikationer og slutresultatet.

**Server Eksempel:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Klient Eksempel:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Sikkerhedsovervejelser

Når man implementerer MCP-servere med HTTP-baserede transporter, bliver sikkerhed et altafgørende aspekt, der kræver omhyggelig opmærksomhed på flere angrebsvinkler og beskyttelsesmekanismer.

### Oversigt

Sikkerhed er kritisk, når MCP-servere eksponeres over HTTP. Streamable HTTP introducerer nye angrebsoverflader og kræver omhyggelig konfiguration.

### Vigtige Punkter

- **Validering af Origin-header:** Valider altid `Origin`-headeren for at forhindre DNS rebinding-angreb.
- **Binding til localhost:** Til lokal udvikling, bind servere til `localhost` for at undgå at udsætte dem for det offentlige internet.
- **Autentificering:** Implementer autentificering (f.eks. API-nøgler, OAuth) til produktionsimplementeringer.
- **CORS:** Konfigurer Cross-Origin Resource Sharing (CORS) politikker for at begrænse adgang.
- **HTTPS:** Brug HTTPS i produktion for at kryptere trafik.

### Bedste praksis

- Stol aldrig på indkommende forespørgsler uden validering.
- Log og overvåg al adgang og fejl.
- Opdater regelmæssigt afhængigheder for at patche sikkerhedssårbarheder.

### Udfordringer
- Balancering af sikkerhed med udviklingsvenlighed
- Sikring af kompatibilitet med forskellige klientmiljøer

## Opgradering fra SSE til Streamable HTTP

For applikationer der i øjeblikket bruger Server-Sent Events (SSE), giver migration til Streamable HTTP forbedrede muligheder og bedre langsigtet bæredygtighed for dine MCP-implementeringer.

### Hvorfor opgradere?

Der er to overbevisende grunde til at opgradere fra SSE til Streamable HTTP:

- Streamable HTTP tilbyder bedre skalerbarhed, kompatibilitet og rigere understøttelse af notifikationer end SSE.
- Det er den anbefalede transport til nye MCP-applikationer.

### Migrations trin

Sådan kan du migrere fra SSE til Streamable HTTP i dine MCP-applikationer:

- **Opdater serverkode** til at bruge `transport="streamable-http"` i `mcp.run()`.
- **Opdater klientkode** til at bruge `streamablehttp_client` i stedet for SSE klient.
- **Implementer en beskedhåndtering** i klienten til at behandle notifikationer.
- **Test for kompatibilitet** med eksisterende værktøjer og arbejdsgange.

### Opretholdelse af kompatibilitet

Det anbefales at opretholde kompatibilitet med eksisterende SSE-klienter under migrationsprocessen. Her er nogle strategier:

- Du kan understøtte både SSE og Streamable HTTP ved at køre begge transportformer på forskellige endpoints.
- Migrer gradvist klienter til den nye transport.

### Udfordringer

Sørg for at håndtere følgende udfordringer under migrationen:

- Sikring af at alle klienter opdateres
- Håndtering af forskelle i notifikationslevering

## Sikkerhedsovervejelser

Sikkerhed bør være en topprioritet, når man implementerer enhver server, især ved brug af HTTP-baserede transportformer som Streamable HTTP i MCP.

Når MCP-servere implementeres med HTTP-baserede transportformer, bliver sikkerhed en afgørende faktor, der kræver nøje opmærksomhed på flere angrebsvinkler og beskyttelsesmekanismer.

### Oversigt

Sikkerhed er kritisk, når MCP-servere eksponeres over HTTP. Streamable HTTP introducerer nye angrebsflader og kræver omhyggelig konfiguration.

Her er nogle nøglepunkter for sikkerhed:

- **Validering af Origin-header**: Valider altid `Origin` headeren for at forhindre DNS rebinding-angreb.
- **Binding til localhost**: Til lokal udvikling skal servere bindes til `localhost` for at undgå at eksponere dem på det offentlige internet.
- **Autentifikation**: Implementer autentifikation (fx API-nøgler, OAuth) til produktionsudrulninger.
- **CORS**: Konfigurer Cross-Origin Resource Sharing (CORS) politikker for at begrænse adgang.
- **HTTPS**: Brug HTTPS i produktion for at kryptere trafikken.

### Bedste praksis

Derudover er her nogle bedste praksisser for at sikre sikkerhed i din MCP streaming-server:

- Stol aldrig på indkommende forespørgsler uden validering.
- Log og overvåg al adgang og fejl.
- Opdater regelmæssigt afhængigheder for at lukke sikkerhedshuller.

### Udfordringer

Du vil møde nogle udfordringer ved implementering af sikkerhed i MCP streaming-servere:

- Balancering mellem sikkerhed og udviklingsvenlighed
- Sikring af kompatibilitet med forskellige klientmiljøer

### Opgave: Byg din egen streaming MCP-app

**Scenario:**
Byg en MCP-server og klient hvor serveren behandler en liste over genstande (fx filer eller dokumenter) og sender en notifikation for hver behandlede genstand. Klienten skal vise hver notifikation, efterhånden som den ankommer.

**Trin:**

1. Implementer et serverværktøj, der behandler en liste og sender notifikationer for hver genstand.
2. Implementer en klient med en beskedhåndtering til at vise notifikationer i realtid.
3. Test din implementation ved at køre både server og klient, og observer notifikationerne.

[Solution](./solution/README.md)

## Yderligere læsning & hvad nu?

For at fortsætte din rejse med MCP streaming og udvide din viden, tilbyder dette afsnit yderligere ressourcer og foreslåede næste skridt til at bygge mere avancerede applikationer.

### Yderligere læsning

- [Microsoft: Introduktion til HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS i ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Hvad nu?

- Prøv at bygge mere avancerede MCP-værktøjer, der bruger streaming til realtidsanalyse, chat eller samarbejdende redigering.
- Udforsk integration af MCP streaming med frontend-rammer (React, Vue, osv.) til live UI-opdateringer.
- Næste: [Udnyt AI Toolkit for VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->