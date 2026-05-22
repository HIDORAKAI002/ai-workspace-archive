# HTTPS Streaming med Model Context Protocol (MCP)

Dette kapittelet gir en omfattende veiledning for implementering av sikker, skalerbar og sanntidsstrømming med Model Context Protocol (MCP) ved bruk av HTTPS. Det dekker motivasjonen for streaming, tilgjengelige transportmekanismer, hvordan implementere strømmebar HTTP i MCP, sikkerhets beste praksis, migrering fra SSE, og praktisk veiledning for å bygge dine egne streaming MCP-applikasjoner. 

## Transportmekanismer og streaming i MCP

Dette avsnittet utforsker de ulike transportmekanismene som er tilgjengelige i MCP og deres rolle i å muliggjøre streaming-funksjonalitet for sanntidskommunikasjon mellom klienter og servere.

### Hva er en transportmekanisme?

En transportmekanisme definerer hvordan data utveksles mellom klient og server. MCP støtter flere transporttyper for å passe ulike miljøer og krav:

- **stdio**: Standard input/output, egnet for lokale og CLI-baserte verktøy. Enkelt, men ikke egnet for web eller sky.
- **SSE (Server-Sent Events)**: Tillater servere å sende sanntidsoppdateringer til klienter over HTTP. Godt for webgrensesnitt, men begrenset i skalerbarhet og fleksibilitet. Fra MCP Spesifikasjon 2025-06-18 er den selvstendige SSE-transporten (Server-Sent Events) avviklet og erstattet av "Streamable HTTP"-transport.
- **Streamable HTTP**: Moderne HTTP-basert streamingtransport som støtter varsler og bedre skalerbarhet. Anbefalt for de fleste produksjons- og sky-scenarier.

### Sammenligningstabell

Se på sammenligningstabellen nedenfor for å forstå forskjellene mellom disse transportmekanismene:

| Transport         | Sanntidsoppdateringer | Streaming | Skalerbarhet | Bruksområde            |
|-------------------|-----------------------|-----------|--------------|------------------------|
| stdio             | Nei                   | Nei       | Lav          | Lokale CLI-verktøy     |
| SSE               | Ja                    | Ja        | Middels      | Web, sanntidsoppdateringer |
| Streamable HTTP   | Ja                    | Ja        | Høy          | Sky, flere klienter    |

> **Tips:** Valg av riktig transport påvirker ytelse, skalerbarhet og brukeropplevelse. **Streamable HTTP** anbefales for moderne, skalerbare og sky-klare applikasjoner.

Merk transportene stdio og SSE som du ble vist i de forrige kapitlene og hvordan Streamable HTTP er transporten som dekkes i dette kapittelet.

## Streaming: Konsepter og motivasjon

Å forstå de grunnleggende konseptene og motivasjonene bak streaming er essensielt for å implementere effektive sanntidskommunikasjonssystemer.

**Streaming** er en teknikk innen nettverksprogrammering som tillater data å sendes og mottas i små, håndterbare biter eller som en sekvens av hendelser, i stedet for å vente på at hele svaret skal være klart. Dette er spesielt nyttig for:

- Store filer eller datasett.
- Sanntidsoppdateringer (f.eks. chat, fremdriftsindikatorer).
- Langvarige beregninger der man ønsker å holde brukeren informert.

Her er hva du trenger å vite om streaming på et overordnet nivå:

- Data leveres progressivt, ikke alt på en gang.
- Klienten kan prosessere data etter hvert som det ankommer.
- Reduserer opplevd ventetid og forbedrer brukeropplevelse.

### Hvorfor bruke streaming?

Årsakene til å bruke streaming er som følger:

- Brukere får umiddelbar tilbakemelding, ikke bare når alt er ferdig
- Muliggjør sanntidsapplikasjoner og responsive brukergrensesnitt
- Mer effektiv bruk av nettverk og beregningsressurser

### Enkelt eksempel: HTTP streaming-server og klient

Her er et enkelt eksempel på hvordan streaming kan implementeres:

#### Python

**Server (Python, bruker FastAPI og StreamingResponse):**

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

**Klient (Python, bruker requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Dette eksemplet demonstrerer en server som sender en serie meldinger til klienten etter hvert som de blir tilgjengelige, i stedet for å vente på at alle meldinger er klare.

**Hvordan det fungerer:**

- Serveren yield-er hver melding etter hvert som den er klar.
- Klienten mottar og skriver ut hver bit etter hvert som den ankommer.

**Krav:**

- Serveren må bruke en streamingrespons (f.eks. `StreamingResponse` i FastAPI).
- Klienten må prosessere responsen som en strøm (`stream=True` i requests).
- Content-Type er vanligvis `text/event-stream` eller `application/octet-stream`.

#### Java

**Server (Java, bruker Spring Boot og Server-Sent Events):**

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

**Klient (Java, bruker Spring WebFlux WebClient):**

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

**Java implementasjonsnotater:**

- Bruker Spring Boots reaktive stack med `Flux` for streaming
- `ServerSentEvent` tilbyr strukturert hendelsesstrømming med hendelsestyper
- `WebClient` med `bodyToFlux()` muliggjør reaktiv streaming-konsumsjon
- `delayElements()` simulerer behandlingstid mellom hendelser
- Hendelser kan ha typer (`info`, `result`) for bedre klientbehandling

### Sammenligning: Klassisk streaming vs MCP streaming

Forskjellene på hvordan streaming fungerer på en "klassisk" måte kontra i MCP kan fremstilles slik:

| Funksjon               | Klassisk HTTP Streaming       | MCP Streaming (Varsler)            |
|------------------------|-------------------------------|-----------------------------------|
| Hovedrespons           | Chunked                       | Enkel, på slutten                 |
| Fremdriftsoppdateringer | Sendt som databit             | Sendt som varsler                 |
| Klientkrav             | Må prosessere strøm           | Må implementere meldingbehandler  |
| Bruksområde            | Store filer, AI token-strømmer | Fremdrift, logger, sanntidsfeedback |

### Viktige observerte forskjeller

I tillegg er her noen viktige forskjeller:

- **Kommunikasjonsmønster:**
  - Klassisk HTTP streaming: Bruker enkel punkt-del-transportkode for å sende data i biter
  - MCP streaming: Bruker et strukturert varslingssystem med JSON-RPC-protokoll

- **Meldingsformat:**
  - Klassisk HTTP: Ren tekst med linjeskift
  - MCP: Strukturerte LoggingMessageNotification-objekter med metadata

- **Klientimplementasjon:**
  - Klassisk HTTP: Enkel klient som prosesserer strømmerespons
  - MCP: Mer sofistikert klient med meldingsbehandler for å prosessere forskjellige meldingstyper

- **Fremdriftsoppdateringer:**
  - Klassisk HTTP: Fremdrift er del av hovedrespons-streamen
  - MCP: Fremdrift sendes via egne varslingsmeldinger mens hovedresponsen kommer til slutt

### Anbefalinger

Det er noen ting vi anbefaler når det gjelder valg mellom å implementere klassisk streaming (som et endepunkt vi viste deg ovenfor med `/stream`) versus streaming via MCP.

- **For enkle streamingbehov:** Klassisk HTTP streaming er enklere å implementere og tilstrekkelig for grunnleggende streamingbehov.

- **For komplekse, interaktive applikasjoner:** MCP streaming gir en mer strukturert tilnærming med rikere metadata og separasjon mellom varsler og sluttresultater.

- **For AI-applikasjoner:** MCPs varslingssystem er spesielt nyttig for langvarige AI-oppgaver hvor man ønsker å holde brukerne informert om fremdrift.

## Streaming i MCP

Ok, så du har sett noen anbefalinger og sammenligninger så langt om forskjellen mellom klassisk streaming og streaming i MCP. La oss gå i detalj på nøyaktig hvordan du kan utnytte streaming i MCP.

Å forstå hvordan streaming fungerer innenfor MCP-rammeverket er essensielt for å bygge responsive applikasjoner som gir sanntidstilbakemeldinger til brukere under langvarige operasjoner.

I MCP handler streaming ikke om å sende hovedresponsen i biter, men om å sende **varsler** til klienten mens et verktøy behandler en forespørsel. Disse varslene kan inkludere fremdriftsoppdateringer, logger eller andre hendelser.

### Hvordan det fungerer

Hovedresultatet sendes fortsatt som en enkelt respons. Imidlertid kan varsler sendes som separate meldinger under behandlingen og dermed oppdatere klienten i sanntid. Klienten må kunne håndtere og vise disse varslene.

## Hva er et varsel?

Vi sa "varsel", hva betyr det i MCP-sammenheng?

Et varsel er en melding sendt fra server til klient for å informere om fremdrift, status eller andre hendelser under en langvarig operasjon. Varsler forbedrer transparens og brukeropplevelse.

For eksempel skal en klient sende et varsel når den innledende håndtrykk med serveren er gjort.

Et varsel ser slik ut som en JSON-melding:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Varsler tilhører et tema i MCP referert til som ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

For å få logging til å fungere må serveren aktivere det som en funksjon/kapasitet slik:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Avhengig av SDK som brukes, kan logging være aktivert som standard, eller du må eksplisitt aktivere det i serverkonfigurasjonen din.

Det finnes forskjellige typer varsler:

| Nivå      | Beskrivelse                   | Eksempel på bruk               |
|-----------|------------------------------|-------------------------------|
| debug     | Detaljert feilsøkingsinformasjon | Funksjonsinngang/-utgang      |
| info      | Generelle informasjonsmeldinger | Oppdateringer om fremdrift   |
| notice    | Normale men betydningsfulle hendelser | Konfigurasjonsendringer    |
| warning   | Advarselsforhold              | Bruk av utgått funksjon       |
| error     | Feilforhold                  | Driftsfeil                    |
| critical  | Kritiske forhold             | Feil i systemkomponenter      |
| alert     | Umiddelbar handling må tas  | Oppdaget datakorruptjon       |
| emergency | Systemet er ubrukelig        | Fullstendig systemsvikt       |

## Implementere varsler i MCP

For å implementere varsler i MCP må du sette opp både server- og klientdelen til å håndtere sanntidsoppdateringer. Dette gjør at applikasjonen din kan gi umiddelbar tilbakemelding til brukere under langvarige operasjoner.

### Serverside: Sende varsler

La oss starte med serversiden. I MCP definerer du verktøy som kan sende varsler mens de behandler forespørsler. Serveren bruker kontekstobjektet (vanligvis `ctx`) for å sende meldinger til klienten.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

I det foregående eksempelet sender `process_files`-verktøyet tre varsler til klienten mens hver fil behandles. `ctx.info()`-metoden brukes for å sende informasjonsmeldinger.

I tillegg, for å aktivere varsler, må du sikre at serveren bruker en streaming-transport (som `streamable-http`) og at klienten implementerer en meldingbehandler for å håndtere varsler. Slik setter du opp serveren til å bruke `streamable-http`-transporten:

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

I dette .NET-eksempelet er `ProcessFiles`-verktøyet dekorert med `Tool`-attributtet og sender tre varsler til klienten mens hver fil behandles. `ctx.Info()`-metoden brukes til å sende informasjonsmeldinger.

For å aktivere varsler i din .NET MCP-server, sørg for at du bruker streaming-transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Klientside: Motta varsler

Klienten må implementere en meldingbehandler for å prosessere og vise varsler etter hvert som de ankommer.

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

I koden ovenfor sjekker `message_handler`-funksjonen om den innkommende meldingen er et varsel. Hvis det er et varsel, skriver den det ut; ellers prosesseres det som en vanlig servermelding. Merk også hvordan `ClientSession` initialiseres med `message_handler` for å håndtere innkommende varsler.

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

I dette .NET-eksempelet sjekker `MessageHandler`-funksjonen om den innkommende meldingen er et varsel. Hvis det er et varsel, skrives det ut; ellers prosesseres det som en vanlig servermelding. `ClientSession` initialiseres med meldingbehandleren via `ClientSessionOptions`.

For å aktivere varsler, sørg for at serveren bruker streaming-transport (som `streamable-http`) og at klienten implementerer en meldingbehandler for å håndtere varsler.

## Fremdriftsvarsler og scenarier

Dette avsnittet forklarer konseptet fremdriftsvarsler i MCP, hvorfor de er viktige, og hvordan du implementerer dem ved bruk av Streamable HTTP. Du finner også en praktisk oppgave for å styrke forståelsen din.

Fremdriftsvarsler er sanntidsmeldinger sendt fra server til klient under langvarige operasjoner. I stedet for å vente på at hele prosessen er ferdig, holder serveren klienten oppdatert om nåværende status. Dette øker transparens, brukeropplevelse og gjør feilsøking enklere.

**Eksempel:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Hvorfor bruke fremdriftsvarsler?

Fremdriftsvarsler er viktige av flere grunner:

- **Bedre brukeropplevelse:** Brukere ser oppdateringer mens arbeidet pågår, ikke bare når det er fullført.
- **Sanntidstilbakemelding:** Klienter kan vise fremdriftslinjer eller logger, noe som gjør appen mer responsiv.
- **Enklere feilsøking og overvåking:** Utviklere og brukere kan se hvor en prosess eventuelt henger eller går tregt.

### Hvordan implementere fremdriftsvarsler

Slik kan du implementere fremdriftsvarsler i MCP:

- **På serveren:** Bruk `ctx.info()` eller `ctx.log()` for å sende varsler mens hvert element prosesseres. Dette sender en melding til klienten før hovedresultatet er klart.
- **På klienten:** Implementer en meldingbehandler som lytter etter og viser varsler etter hvert som de ankommer. Denne handleren skiller mellom varsler og sluttresultat.

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

## Sikkerhetshensyn

Når du implementerer MCP-servere med HTTP-baserte transporter, blir sikkerhet et overordnet hensyn som krever nøye oppmerksomhet på flere angrepsvektorer og beskyttelsesmekanismer.

### Oversikt

Sikkerhet er kritisk når MCP-servere eksponeres over HTTP. Streamable HTTP introduserer nye angrepsflater og krever nøye konfigurasjon.

### Viktige punkter

- **Validering av Origin-header:** Alltid validere `Origin`-headeren for å forhindre DNS-rebind-angrep.
- **Binding til localhost:** For lokal utvikling, bind servere til `localhost` for å unngå å eksponere dem for offentlig internett.
- **Autentisering:** Implementer autentisering (f.eks. API-nøkler, OAuth) for produksjonsdistribusjoner.
- **CORS:** Konfigurer Cross-Origin Resource Sharing (CORS)-policyer for å begrense tilgang.
- **HTTPS:** Bruk HTTPS i produksjon for å kryptere trafikken.

### Beste praksis

- Stol aldri på innkommende forespørsler uten validering.
- Logg og overvåk all tilgang og feil.
- Oppdater jevnlig avhengigheter for å lappe sikkerhetssårbarheter.

### Utfordringer
- Balansering av sikkerhet med enkel utvikling
- Sikre kompatibilitet med ulike klientmiljøer

## Oppgradering fra SSE til Streamable HTTP

For applikasjoner som for øyeblikket bruker Server-Sent Events (SSE), gir migrering til Streamable HTTP forbedrede muligheter og bedre langsiktig bærekraft for dine MCP-implementeringer.

### Hvorfor oppgradere?

Det er to overbevisende grunner til å oppgradere fra SSE til Streamable HTTP:

- Streamable HTTP tilbyr bedre skalerbarhet, kompatibilitet og rikere støtte for varslinger enn SSE.
- Det er den anbefalte transporten for nye MCP-applikasjoner.

### Migreringstrinn

Slik kan du migrere fra SSE til Streamable HTTP i dine MCP-applikasjoner:

- **Oppdater serverkoden** til å bruke `transport="streamable-http"` i `mcp.run()`.
- **Oppdater klientkoden** til å bruke `streamablehttp_client` i stedet for SSE-klienten.
- **Implementer en meldingshåndterer** i klienten for å behandle varslinger.
- **Test kompatibilitet** med eksisterende verktøy og arbeidsflyter.

### Opprettholde kompatibilitet

Det anbefales å opprettholde kompatibilitet med eksisterende SSE-klienter under migreringsprosessen. Her er noen strategier:

- Du kan støtte både SSE og Streamable HTTP ved å kjøre begge transportene på forskjellige endepunkter.
- Migrer gradvis klienter til den nye transporten.

### Utfordringer

Sørg for å adressere følgende utfordringer under migrering:

- Sørge for at alle klienter blir oppdatert
- Håndtere forskjeller i leveringen av varslinger

## Sikkerhetshensyn

Sikkerhet bør være en topp prioritet når du implementerer en server, spesielt når du bruker HTTP-baserte transporter som Streamable HTTP i MCP.

Når du implementerer MCP-servere med HTTP-baserte transporter, blir sikkerhet et avgjørende hensyn som krever nøye oppmerksomhet til flere angrepsvektorer og beskyttelsesmekanismer.

### Oversikt

Sikkerhet er kritisk når MCP-servere eksponeres over HTTP. Streamable HTTP introduserer nye angrepsflater og krever nøye konfigurasjon.

Her er noen viktige sikkerhetshensyn:

- **Validering av Origin-header**: Valider alltid `Origin`-headeren for å forhindre DNS-rebinding-angrep.
- **Binding til localhost**: For lokal utvikling, bind serverne til `localhost` for å unngå at de eksponeres mot det offentlige internett.
- **Autentisering**: Implementer autentisering (f.eks. API-nøkler, OAuth) for produksjonsdistribusjoner.
- **CORS**: Konfigurer policyer for Cross-Origin Resource Sharing (CORS) for å begrense tilgang.
- **HTTPS**: Bruk HTTPS i produksjon for å kryptere trafikken.

### Beste praksis

I tillegg, her er noen beste praksiser å følge når du implementerer sikkerhet i din MCP-streamingserver:

- Stol aldri på innkommende forespørsler uten validering.
- Logg og overvåk all tilgang og feil.
- Oppdater avhengigheter regelmessig for å tette sikkerhetshull.

### Utfordringer

Du vil møte noen utfordringer når du implementerer sikkerhet i MCP-streamingservere:

- Balansering av sikkerhet med enkel utvikling
- Sikre kompatibilitet med ulike klientmiljøer

### Oppgave: Bygg din egen streaming MCP-app

**Scenario:**  
Bygg en MCP-server og -klient der serveren behandler en liste over elementer (f.eks. filer eller dokumenter) og sender en varsling for hvert element som behandles. Klienten skal vise hver varsling etter hvert som den kommer.

**Trinn:**

1. Implementer et serververktøy som behandler en liste og sender varslinger for hvert element.
2. Implementer en klient med en meldingshåndterer for å vise varslinger i sanntid.
3. Test implementeringen ved å kjøre både server og klient, og observer varslingene.

[Løsning](./solution/README.md)

## Videre lesning og hva nå?

For å fortsette reisen din med MCP-streaming og utvide kunnskapen, gir denne delen flere ressurser og foreslåtte neste steg for å bygge mer avanserte applikasjoner.

### Videre lesning

- [Microsoft: Innføring i HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS i ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Hva nå?

- Prøv å bygge mer avanserte MCP-verktøy som bruker streaming for sanntidsanalyse, chat eller samarbeidende redigering.
- Utforsk integrasjon av MCP-streaming med frontend-rammeverk (React, Vue, osv.) for live UI-oppdateringer.
- Neste: [Bruke AI Toolkit for VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->