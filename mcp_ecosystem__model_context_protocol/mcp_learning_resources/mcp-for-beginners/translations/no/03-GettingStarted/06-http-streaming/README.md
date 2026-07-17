# HTTPS-strømming med Model Context Protocol (MCP)

Dette kapitlet gir en omfattende veiledning for implementering av sikker, skalerbar og sanntidsstrømming med Model Context Protocol (MCP) ved bruk av HTTPS. Det dekker motivasjonen for strømming, tilgjengelige transportmekanismer, hvordan implementere strømmbar HTTP i MCP, sikkerhets beste praksis, migrering fra SSE, og praktisk veiledning for å bygge dine egne strømmende MCP-applikasjoner.

> **Ser fremover:** denne leksjonen beskriver Strømmbar HTTP under **MCP-spesifikasjon 2025-11-25**, hvor en økt etableres under `initialize` og festes med en `Mcp-Session-Id` header. Releasekandidaten `2026-07-28` fjerner håndtrykket og økt-ID helt, slik at hver forespørsel er selvstendig og kan rutes til hvilken som helst serverinstans uten sticky sessions. Se [Hva som endres i MCP: Releasekandidaten 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) for detaljer.

## Transportmekanismer og strømming i MCP

Dette avsnittet utforsker de ulike transportmekanismene som er tilgjengelige i MCP og deres rolle i å muliggjøre strømmekapasitet for sanntidskommunikasjon mellom klienter og servere.

### Hva er en transportmekanisme?

En transportmekanisme definerer hvordan data utveksles mellom klient og server. MCP støtter flere transporttyper for å passe forskjellige miljøer og krav:

- **stdio**: Standard input/output, egnet for lokale og CLI-baserte verktøy. Enkelt, men ikke egnet for web eller sky.
- **SSE (Server-Sent Events)**: Lar servere presse sanntidsoppdateringer til klienter over HTTP. Godt for webgrensesnitt, men begrenset i skalerbarhet og fleksibilitet. Fra MCP-spesifikasjon 2025-06-18 er den frittstående SSE-transporten (Server-Sent Events) avskrevet og erstattet av "Strømmbar HTTP"-transport.
- **Strømmbar HTTP**: Moderne HTTP-basert strømmingstransport, som støtter varsler og bedre skalerbarhet. Anbefales for de fleste produksjons- og skyscenarioer.

### Sammenligningstabell

Se på sammenligningstabellen nedenfor for å forstå forskjellene mellom disse transportmekanismene:

| Transport         | Sanntidsoppdateringer | Strømming | Skalerbarhet | Bruksområde             |
|-------------------|-----------------------|-----------|--------------|-------------------------|
| stdio             | Nei                   | Nei       | Lav          | Lokale CLI-verktøy      |
| SSE               | Ja                    | Ja        | Middels      | Web, sanntidsoppdateringer |
| Strømmbar HTTP    | Ja                    | Ja        | Høy          | Sky, multi-klient       |

> **Tips:** Valg av riktig transport påvirker ytelse, skalerbarhet og brukeropplevelse. **Strømmbar HTTP** anbefales for moderne, skalerbare og sky-klare applikasjoner.

Merk transportene stdio og SSE som du så i tidligere kapitler, og hvordan strømmbar HTTP er transporten som dekkes i dette kapitlet.

## Strømming: Konsepter og motivasjon

Å forstå grunnleggende konsepter og motivasjoner bak strømming er essensielt for å implementere effektive sanntidskommunikasjonssystemer.

**Strømming** er en teknikk innen nettverksprogrammering som lar data sendes og mottas i små, håndterbare biter eller som en sekvens av hendelser, i stedet for å vente på at et helt svar skal være klart. Dette er spesielt nyttig for:

- Store filer eller datasett.
- Sanntidsoppdateringer (f.eks. chat, fremdriftsindikatorer).
- Langvarige beregninger hvor man ønsker å holde brukeren informert.

Her er hva du trenger å vite om strømming på høyt nivå:

- Data leveres progresivt, ikke alt på en gang.
- Klienten kan bearbeide data etter hvert som den mottas.
- Reduserer opplevd ventetid og forbedrer brukeropplevelsen.

### Hvorfor bruke strømming?

Årsakene til å bruke strømming er følgende:

- Brukere får tilbakemelding umiddelbart, ikke bare til slutt
- Muliggjør sanntidsapplikasjoner og responsive brukergrensesnitt
- Mer effektiv bruk av nettverks- og databehandlingsressurser

### Enkelt eksempel: HTTP-strømmingsserver & klient

Her er et enkelt eksempel på hvordan strømming kan implementeres:

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

Dette eksemplet demonstrerer en server som sender en serie meldinger til klienten etter hvert som de blir tilgjengelige, i stedet for å vente på at alle meldinger skal være klare.

**Hvordan det fungerer:**

- Serveren genererer hver melding etter hvert som den er klar.
- Klienten mottar og skriver ut hver bit etter hvert som den kommer.

**Krav:**

- Serveren må bruke en strømmende respons (f.eks. `StreamingResponse` i FastAPI).
- Klienten må behandle responsen som en strøm (`stream=True` i requests).
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

**Notater om Java-implementasjon:**

- Bruker Spring Boots reaktive stack med `Flux` for strømming
- `ServerSentEvent` gir strukturert hendelsesstrømming med hendelsestyper
- `WebClient` med `bodyToFlux()` muliggjør reaktiv strømmingskonsumering
- `delayElements()` simulerer behandlingstid mellom hendelser
- Hendelser kan ha typer (`info`, `result`) for bedre klienthåndtering

### Sammenligning: Klassisk strømming vs MCP-strømming

Forskjellene mellom hvordan strømming fungerer på en «klassisk» måte versus hvordan det fungerer i MCP kan fremstilles slik:

| Funksjon               | Klassisk HTTP-strømming       | MCP-strømming (varsler)           |
|------------------------|-------------------------------|-----------------------------------|
| Hovedrespons           | Delvis (chunked)              | Enkeltsvar, til slutt              |
| Fremdriftsoppdateringer| Sendt som datadeler           | Sendt som varsler                  |
| Klientkrav             | Må behandle strøm             | Må implementere meldingsbehandler  |
| Bruksområde            | Store filer, AI-tokenstrømmer | Fremdrift, logger, sanntidsfeedback |

### Viktige observerte forskjeller

I tillegg kan vi nevne noen nøkkelforskjeller:

- **Kommunikasjonsmønster:**
  - Klassisk HTTP-strømming: Bruker enkel chunked overføring for å sende data i biter
  - MCP-strømming: Bruker et strukturert varslingssystem med JSON-RPC-protokoll

- **Meldingsformat:**
  - Klassisk HTTP: Ren tekst i biter med linjeskift
  - MCP: Strukturerte LoggingMessageNotification-objekter med metadata

- **Klientimplementasjon:**
  - Klassisk HTTP: Enkel klient som håndterer strømmende responser
  - MCP: Mer sofistikert klient med meldingsbehandler for å behandle forskjellige typer meldinger

- **Fremdriftsoppdateringer:**
  - Klassisk HTTP: Fremdrift er en del av hovedstrømmen av svar
  - MCP: Fremdrift sendes via separate varslingsmeldinger mens hovedsvar kommer til slutt

### Anbefalinger

Det er noen ting vi anbefaler når det gjelder valg mellom å implementere klassisk strømming (som et endepunkt vi viste ovenfor ved bruk av `/stream`) versus å velge strømming via MCP.

- **For enkle strømmingbehov:** Klassisk HTTP-strømming er enklere å implementere og tilstrekkelig for grunnleggende strømming.

- **For komplekse, interaktive applikasjoner:** MCP-strømming gir en mer strukturert tilnærming med rikere metadata og separasjon mellom varsler og endelige resultater.

- **For AI-applikasjoner:** MCPs varslingssystem er spesielt nyttig for langvarige AI-oppgaver hvor man ønsker å holde brukere oppdatert på fremdrift.

## Strømming i MCP

Ok, så du har sett noen anbefalinger og sammenligninger så langt om forskjellen mellom klassisk strømming og strømming i MCP. La oss gå i detalj på nøyaktig hvordan du kan utnytte strømming i MCP.

Å forstå hvordan strømming fungerer innen MCP-rammeverket er essensielt for å bygge responsive applikasjoner som gir sanntids tilbakemelding til brukere under langvarige operasjoner.

I MCP handler ikke strømming om å sende hovedsvaret i biter, men om å sende **varsler** til klienten mens et verktøy behandler en forespørsel. Disse varslene kan inkludere fremdriftsoppdateringer, logger eller andre hendelser.

### Hvordan det fungerer

Hovedresultatet sendes fortsatt som et enkelt svar. Imidlertid kan varsler sendes som separate meldinger under behandlingen og dermed oppdatere klienten i sanntid. Klienten må kunne håndtere og vise disse varslene.

## Hva er et varsel?

Vi nevnte "varsel", hva betyr det i MCPs kontekst?

Et varsel er en melding sendt fra serveren til klienten for å informere om fremdrift, status eller andre hendelser under en langvarig operasjon. Varsler forbedrer gjennomsiktighet og brukeropplevelse.

For eksempel antas det at en klient sender et varsel når det innledende håndtrykket med serveren er gjennomført.

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

Varsler tilhører et emne i MCP kalt ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Avskjedsmelding:** MCP-spesifikasjons releasekandidaten `2026-07-28` markerer Logging-primitivet som avskrevet til fordel for `stderr` for stdio-transporter og OpenTelemetry for strukturert observabilitet. Logging fortsetter å fungere i `2025-11-25` og i minst ett år etter eventuell formell avskrivelse. Se [Hva som endres i MCP: Releasekandidaten 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

For å få logging til å fungere må serveren aktivere det som en funksjon/kapabilitet slik:

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

| Nivå     | Beskrivelse                    | Eksempelbruk                  |
|-----------|-------------------------------|------------------------------|
| debug     | Detaljert feilsøkingsinformasjon | Funksjons-inn/ut-punkter    |
| info      | Generelle informasjonsmeldinger | Oppdateringer om fremdrift  |
| notice    | Normale, men viktige hendelser  | Konfigurasjonsendringer     |
| warning   | Advarsler                    | Bruk av avskrevet funksjon  |
| error     | Feil                      | Feil i operasjoner          |
| critical  | Kritiske tilstander           | Systemkomponentfeil         |
| alert     | Tiltak må iverksettes umiddelbart | Dataødeleggelser oppdaget |
| emergency | System er ubrukelig           | Total systemsvikt           |

## Implementering av varsler i MCP

For å implementere varsler i MCP må du sette opp både server- og klientsiden for å håndtere sanntidsoppdateringer. Dette gjør det mulig for applikasjonen din å gi umiddelbar tilbakemelding til brukere under langvarige operasjoner.

### Serverside: Sende varsler

La oss begynne med serversiden. I MCP definerer du verktøy som kan sende varsler under behandlingen av forespørsler. Serveren bruker kontekstobjektet (vanligvis `ctx`) for å sende meldinger til klienten.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

I det foregående eksemplet sender `process_files`-verktøyet tre varsler til klienten mens den behandler hver fil. `ctx.info()`-metoden brukes til å sende informasjonsmeldinger.

I tillegg, for å aktivere varsler, må du sørge for at serveren bruker en strømmende transport (som `streamable-http`) og at klienten implementerer en meldingsbehandler for å behandle varsler. Slik setter du opp serveren til å bruke `streamable-http`-transport:

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

For å aktivere varsler i din .NET MCP-server, sørg for at du bruker en strømmende transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Klientside: Mottak av varsler

Klienten må implementere en meldingsbehandler for å behandle og vise varsler etter hvert som de mottas.

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

I den foregående koden sjekker `message_handler`-funksjonen om den innkommende meldingen er et varsel. Hvis det er det, skriver den ut varselet; ellers behandler den det som en vanlig servermelding. Merk også hvordan `ClientSession` initieres med `message_handler` for å håndtere innkommende varsler.

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

I dette .NET-eksempelet sjekker `MessageHandler`-funksjonen om den innkommende meldingen er et varsel. Hvis det er det, skriver den ut varselet; ellers behandler den det som en vanlig servermelding. `ClientSession` initialiseres med meldingsbehandleren via `ClientSessionOptions`.

For å aktivere varsler, sørg for at serveren bruker en strømmende transport (som `streamable-http`) og at klienten implementerer en meldingsbehandler for å håndtere varsler.

## Fremdriftsvarsler og scenarier

Dette avsnittet forklarer konseptet med fremdriftsvarsler i MCP, hvorfor de er viktige, og hvordan implementere dem med Strømmbar HTTP. Du finner også en praktisk oppgave for å styrke forståelsen.

Fremdriftsvarsler er sanntidsmeldinger sendt fra server til klient under langvarige operasjoner. I stedet for å vente til hele prosessen er ferdig, holder serveren klienten oppdatert om gjeldende status. Dette forbedrer gjennomsiktighet, brukeropplevelse og gjør feilsøking enklere.

**Eksempel:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Hvorfor bruke fremdriftsvarsler?

Fremdriftsvarsler er viktige av flere grunner:

- **Bedre brukeropplevelse:** Brukere ser oppdateringer mens arbeidet pågår, ikke bare til slutt.
- **Sanntids tilbakemelding:** Klienter kan vise fremdriftsindikatorer eller logger slik at appen føles responsiv.
- **Enklere feilsøking og overvåking:** Utviklere og brukere kan se hvor en prosess eventuelt er treg eller sitter fast.

### Hvordan implementere fremdriftsvarsler

Slik kan du implementere fremdriftsvarsler i MCP:

- **På serveren:** Bruk `ctx.info()` eller `ctx.log()` for å sende varsler etter hvert som hvert element behandles. Dette sender en melding til klienten før hovedresultatet er klart.
- **På klienten:** Implementer en meldingsbehandler som lytter etter og viser varsler når de mottas. Denne behandleren skiller mellom varsler og sluttresultatet.

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

Når du implementerer MCP-servere med HTTP-baserte transportmåter, blir sikkerhet en overordnet bekymring som krever nøye oppmerksomhet til flere angrepsvektorer og beskyttelsesmekanismer.

### Oversikt

Sikkerhet er avgjørende når MCP-servere eksponeres over HTTP. Strømmbar HTTP introduserer nye angrepsflater og krever nøye konfigurasjon.

### Viktige punkter

- **Validering av Origin-header**: Alltid valider `Origin`-headeren for å forhindre DNS-rebinding-angrep.
- **Localhost-binding**: For lokal utvikling, bind servere til `localhost` for å unngå eksponering mot det offentlige internettet.
- **Autentisering**: Implementer autentisering (f.eks. API-nøkler, OAuth) for produksjonsdistribusjoner.
- **CORS**: Konfigurer Cross-Origin Resource Sharing (CORS)-policyer for å begrense tilgang.
- **HTTPS**: Bruk HTTPS i produksjon for å kryptere trafikken.

### Beste praksis

- Stol aldri på innkommende forespørsler uten validering.
- Loggfør og overvåk all tilgang og feil.
- Oppdater jevnlig avhengigheter for å tette sikkerhetssårbarheter.

### Utfordringer

- Å balansere sikkerhet med enkel utvikling
- Å sikre kompatibilitet med ulike klientmiljøer

## Oppgradering fra SSE til Strømmbar HTTP

For applikasjoner som for øyeblikket bruker Server-Sent Events (SSE), gir migrering til Strømmbar HTTP forbedrede muligheter og bedre langsiktig bærekraft for dine MCP-implementasjoner.

### Hvorfor oppgradere?

Det er to overbevisende grunner til å oppgradere fra SSE til Strømmbar HTTP:

- Strømmbar HTTP tilbyr bedre skalerbarhet, kompatibilitet og rikere støtte for varslinger enn SSE.
- Det er den anbefalte transporten for nye MCP-applikasjoner.

### Migreringstrinn

Slik kan du migrere fra SSE til Strømmbar HTTP i dine MCP-applikasjoner:

- **Oppdater serverkoden** til å bruke `transport="streamable-http"` i `mcp.run()`.
- **Oppdater klientkoden** til å bruke `streamablehttp_client` i stedet for SSE-klient.
- **Implementer en meldingsbehandler** i klienten for å behandle varslinger.
- **Test for kompatibilitet** med eksisterende verktøy og arbeidsflyter.

### Opprettholde kompatibilitet

Det anbefales å opprettholde kompatibilitet med eksisterende SSE-klienter under migreringsprosessen. Her er noen strategier:

- Du kan støtte både SSE og Strømmbar HTTP ved å kjøre begge transportene på forskjellige endepunkter.
- Migrer klienter gradvis til den nye transporten.

### Utfordringer

Sørg for å ta tak i følgende utfordringer under migrering:

- Å sikre at alle klienter er oppdatert
- Håndtere forskjeller i leveranse av varslinger

## Sikkerhetshensyn

Sikkerhet bør være en topp prioritet når du implementerer en hvilken som helst server, spesielt når du bruker HTTP-baserte transporter som Strømmbar HTTP i MCP.

Når du implementerer MCP-servere med HTTP-baserte transportmåter, blir sikkerhet en overordnet bekymring som krever nøye oppmerksomhet til flere angrepsvektorer og beskyttelsesmekanismer.

### Oversikt

Sikkerhet er avgjørende når MCP-servere eksponeres over HTTP. Strømmbar HTTP introduserer nye angrepsflater og krever nøye konfigurasjon.

Her er noen viktige sikkerhetshensyn:

- **Validering av Origin-header**: Alltid valider `Origin`-headeren for å forhindre DNS-rebinding-angrep.
- **Localhost-binding**: For lokal utvikling, bind servere til `localhost` for å unngå eksponering mot det offentlige internettet.
- **Autentisering**: Implementer autentisering (f.eks. API-nøkler, OAuth) for produksjonsdistribusjoner.
- **CORS**: Konfigurer Cross-Origin Resource Sharing (CORS)-policyer for å begrense tilgang.
- **HTTPS**: Bruk HTTPS i produksjon for å kryptere trafikken.

### Beste praksis

I tillegg er her noen beste praksiser å følge når du implementerer sikkerhet i din MCP-strømmeserver:

- Stol aldri på innkommende forespørsler uten validering.
- Loggfør og overvåk all tilgang og feil.
- Oppdater jevnlig avhengigheter for å tette sikkerhetssårbarheter.

### Utfordringer

Du vil møte noen utfordringer når du implementerer sikkerhet i MCP-strømmeservere:

- Å balansere sikkerhet med enkel utvikling
- Å sikre kompatibilitet med ulike klientmiljøer

### Oppgave: Bygg din egen strømmende MCP-app

**Scenario:**
Bygg en MCP-server og klient hvor serveren behandler en liste over elementer (f.eks. filer eller dokumenter) og sender en varsling for hvert behandlede element. Klienten skal vise hver varsling etter hvert som den ankommer.

**Trinn:**

1. Implementer et serververktøy som behandler en liste og sender varsler for hvert element.
2. Implementer en klient med en meldingsbehandler for å vise varsler i sanntid.
3. Test implementeringen ved å kjøre både server og klient, og observer varslingene.

[Løsning](./solution/README.md)

## Videre lesning og hva nå?

For å fortsette reisen med MCP-strømming og utvide kunnskapen din, gir denne seksjonen flere ressurser og foreslåtte neste steg for å bygge mer avanserte applikasjoner.

### Videre lesning

- [Microsoft: Introduksjon til HTTP-strømming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS i ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Strømmende forespørsler](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Hva nå?

- Prøv å bygge mer avanserte MCP-verktøy som bruker strømming for sanntidsanalyse, chat eller samarbeidsredigering.
- Utforsk integrering av MCP-strømming med frontend-rammeverk (React, Vue, osv.) for live UI-oppdateringer.
- Neste: [Bruke AI Toolkit for VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->