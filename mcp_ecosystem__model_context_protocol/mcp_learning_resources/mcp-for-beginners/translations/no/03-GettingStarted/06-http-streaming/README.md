# HTTPS-strømming med Model Context Protocol (MCP)

Dette kapitlet gir en omfattende veiledning for implementering av sikker, skalerbar og sanntidsstrømming med Model Context Protocol (MCP) ved bruk av HTTPS. Det dekker motivasjonen for strømming, tilgjengelige transportmekanismer, hvordan implementere strømmbar HTTP i MCP, sikkerhetsanbefalinger, migrasjon fra SSE, og praktisk veiledning for å bygge dine egne strømmende MCP-applikasjoner.

> **Ser fremover:** denne leksjonen beskriver Streamable HTTP under **MCP Specification 2025-11-25**, hvor en sesjon etableres under `initialize` og festes med en `Mcp-Session-Id` header. `2026-07-28` release candidate fjerner håndtrykket og sesjons-IDen helt, noe som gjør hver forespørsel selvstendig og rutbar til hvilken som helst serverinstans uten sticky sessions. Se [Hva endres i MCP: 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) for detaljer.

## Transportmekanismer og strømming i MCP

Denne seksjonen utforsker de ulike transportmekanismene som er tilgjengelige i MCP og deres rolle i å muliggjøre strømmekapasiteter for sanntidskommunikasjon mellom klienter og servere.

### Hva er en transportmekanisme?

En transportmekanisme definerer hvordan data utveksles mellom klient og server. MCP støtter flere transporttyper for å tilpasses ulike miljøer og krav:

- **stdio**: Standard inn/ut, egnet for lokale og CLI-baserte verktøy. Enkelt, men ikke egnet for web eller sky.
- **SSE (Server-Sent Events)**: Lar servere skyve sanntidsoppdateringer til klienter over HTTP. Bra for webgrensesnitt, men begrenset i skalerbarhet og fleksibilitet. Fra MCP Specification 2025-06-18 er den frittstående SSE-transporten erstattet av "Streamable HTTP" transport.
- **Streamable HTTP**: Moderne HTTP-basert strømmingstransport, støtter varsler og bedre skalerbarhet. Anbefales for de fleste produksjons- og sky-scenarier.

### Sammenligningstabell

Se på sammenligningstabellen nedenfor for å forstå forskjellene mellom disse transportmekanismene:

| Transport         | Sanntidsoppdateringer | Strømming | Skalerbarhet | Brukstilfelle            |
|-------------------|-----------------------|-----------|--------------|--------------------------|
| stdio             | Nei                   | Nei       | Lav          | Lokale CLI-verktøy       |
| SSE               | Ja                    | Ja        | Middels      | Web, sanntidsoppdateringer |
| Streamable HTTP   | Ja                    | Ja        | Høy          | Sky, flere klienter      |

> **Tips:** Å velge riktig transport påvirker ytelse, skalerbarhet og brukeropplevelse. **Streamable HTTP** anbefales for moderne, skalerbare og skyklare applikasjoner.

Legg merke til transportene stdio og SSE som ble vist i tidligere kapitler, og hvordan Streamable HTTP er transporten som dekkes i dette kapitlet.

## Strømming: Konsepter og motivasjon

Å forstå grunnleggende konsepter og motivasjoner bak strømming er essensielt for å implementere effektive sanntidskommunikasjonssystemer.

**Strømming** er en teknikk i nettverksprogrammering som tillater data å sendes og mottas i små, håndterbare biter eller som en sekvens av hendelser, istedenfor å vente på at hele svaret skal være klart. Dette er spesielt nyttig for:

- Store filer eller datasett.
- Sanntidsoppdateringer (f.eks. chat, fremdriftsindikatorer).
- Langvarige beregninger hvor du ønsker å holde brukeren informert.

Her er hva du trenger å vite om strømming på et høyt nivå:

- Data leveres progressivt, ikke alt på en gang.
- Klienten kan behandle data etter hvert som det ankommer.
- Reduserer opplevd forsinkelse og forbedrer brukeropplevelse.

### Hvorfor bruke strømming?

Grunnene til å bruke strømming er som følger:

- Brukere får tilbakemelding umiddelbart, ikke bare til slutt
- Muliggjør sanntidsapplikasjoner og responsive brukergrensesnitt
- Mer effektiv bruk av nettverk og regnekapasitet

### Enkelt eksempel: HTTP Streaming Server & Klient

Her er et enkelt eksempel på hvordan strømming kan implementeres:

#### Python

**Server (Python, med FastAPI og StreamingResponse):**

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

**Klient (Python, med requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Dette eksempel viser en server som sender en serie meldinger til klienten etter hvert som de blir tilgjengelige, i stedet for å vente på at alle meldinger skal være klare.

**Hvordan det fungerer:**

- Serveren leverer hver melding når den er klar.
- Klienten mottar og skriver ut hver bit etter hvert som den ankommer.

**Krav:**

- Serveren må bruke en strømmende respons (f.eks. `StreamingResponse` i FastAPI).
- Klienten må prosessere responsen som en strøm (`stream=True` i requests).
- Content-Type er vanligvis `text/event-stream` eller `application/octet-stream`.

#### Java

**Server (Java, med Spring Boot og Server-Sent Events):**

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

**Klient (Java, med Spring WebFlux WebClient):**

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

**Java-implementasjonsnotater:**

- Bruker Spring Boots reaktive stabel med `Flux` for strømming
- `ServerSentEvent` tilbyr strukturert hendelsesstrømming med hendelsestyper
- `WebClient` med `bodyToFlux()` muliggjør reaktivt strømforbruk
- `delayElements()` simulerer behandlingstid mellom hendelser
- Hendelser kan ha typer (`info`, `result`) for bedre klienthåndtering

### Sammenligning: Klassisk strømming vs MCP strømming

Forskjellene mellom hvordan strømming fungerer på en "klassisk" måte versus hvordan det fungerer i MCP kan fremstilles slik:

| Funksjon               | Klassisk HTTP-strømming       | MCP-strømming (Varsler)         |
|------------------------|-------------------------------|---------------------------------|
| Hovedrespons            | Chunked                      | Enkel, på slutten               |
| Fremdriftsoppdateringer | Sendt som databit             | Sendt som varsler               |
| Klientkrav             | Må prosessere strømmen        | Må implementere meldingsbehandler |
| Brukstilfelle          | Store filer, AI token-strømmer | Fremdrift, logger, sanntidsfeedback |

### Viktige observerte forskjeller

I tillegg er det noen viktige forskjeller:

- **Kommunikasjonsmønster:**
  - Klassisk HTTP-strømming: Bruker enkel chunked overføring for å sende data i biter
  - MCP strømming: Bruker et strukturert varslingssystem med JSON-RPC protokoll

- **Meldingsformat:**
  - Klassisk HTTP: Ren tekst med nye linjer
  - MCP: Strukturerte LoggingMessageNotification-objekter med metadata

- **Klientimplementasjon:**
  - Klassisk HTTP: Enkel klient som prosesserer strømmende responser
  - MCP: Mer sofistikert klient med meldingsbehandler for å prosessere forskjellige typer meldinger

- **Fremdriftsoppdateringer:**
  - Klassisk HTTP: Fremdrift er del av hovedstrømmen
  - MCP: Fremdrift sendes via separate varslingsmeldinger mens hovedresponsen kommer til slutt

### Anbefalinger

Det er noen ting vi anbefaler når det gjelder valg mellom å implementere klassisk strømming (som et endepunkt vist ovenfor med `/stream`) versus strømming via MCP.

- **For enkle strømmebehov:** Klassisk HTTP-strømming er enklere å implementere og er tilstrekkelig for grunnleggende behov.

- **For komplekse, interaktive applikasjoner:** MCP-strømming gir en mer strukturert tilnærming med rikere metadata og separasjon mellom varsler og endelige resultater.

- **For AI-applikasjoner:** MCP sitt varslingssystem er spesielt nyttig for langvarige AI-oppgaver hvor du vil holde brukerne informert om fremdrift.

## Strømming i MCP

Ok, så du har nå sett noen anbefalinger og sammenligninger på forskjellen mellom klassisk strømming og strømming i MCP. La oss gå i detalj på akkurat hvordan du kan utnytte strømming i MCP.

Å forstå hvordan strømming fungerer innenfor MCP-rammeverket er essensielt for å bygge responsive applikasjoner som gir sanntidsfeedback til brukere under langvarige operasjoner.

I MCP handler ikke strømming om å sende hovedresponsen i biter, men om å sende **varsler** til klienten mens et verktøy behandler en forespørsel. Disse varslene kan inkludere fremdriftsoppdateringer, logger eller andre hendelser.

### Hvordan det fungerer

Hovedresultatet sendes fortsatt som en enkelt respons. Varsler kan derimot sendes som separate meldinger under behandlingen, og dermed oppdatere klienten i sanntid. Klienten må kunne håndtere og vise disse varslene.

## Hva er et varsel?

Vi sa "varsel", hva betyr det i MCP-konteksten?

Et varsel er en melding sendt fra server til klient for å informere om fremdrift, status eller andre hendelser under en langvarig operasjon. Varsler forbedrer transparens og brukeropplevelse.

For eksempel skal en klient sende en varsel når det innledende håndtrykket med serveren er gjennomført.

En varsel ser slik ut som en JSON-melding:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Varsler hører til et tema i MCP kalt ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

For å få logging til å fungere, må serveren aktivere det som en funksjon/evne slik:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Avhengig av SDK som brukes kan logging være aktivert som standard, eller du må eksplisitt aktivere det i serverkonfigurasjonen.

Det finnes ulike typer varsler:

| Nivå      | Beskrivelse                    | Eksempelbruk                   |
|-----------|-------------------------------|-------------------------------|
| debug     | Detaljert feilsøkingsinformasjon | Funksjonsinngang/utgangspunkt |
| info      | Generelle informasjonsmeldinger | Oppdateringer om fremdrift    |
| notice    | Normale men viktige hendelser  | Konfigurasjonsendringer       |
| warning   | Advarsler                     | Bruk av utdaterte funksjoner  |
| error     | Feiltilstander                | Operasjonsfeil                |
| critical  | Kritiske tilstander           | Systemkomponentfeil           |
| alert     | Handling må tas umiddelbart   | Data korrupsjon oppdaget      |
| emergency | Systemet er utilgjengelig     | Total systemfeil              |

## Implementering av varsler i MCP

For å implementere varsler i MCP må du sette opp både server- og klientsiden for å håndtere sanntidsoppdateringer. Dette lar applikasjonen din gi umiddelbar tilbakemelding til brukere under langvarige operasjoner.

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

I eksemplet over sender `process_files`-verktøyet tre varsler til klienten mens det behandler hver fil. `ctx.info()` metoden brukes for å sende informasjonsmeldinger.

I tillegg, for å aktivere varsler må du sørge for at serveren bruker en strømmende transport (som `streamable-http`) og at klienten implementerer en meldingsbehandler for å prosessere varsler. Slik kan du sette opp serveren til å bruke `streamable-http` transport:

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

I dette .NET-eksemplet er `ProcessFiles`-verktøyet dekorert med `Tool`-attributten og sender tre varsler til klienten mens det behandler hver fil. `ctx.Info()` metoden brukes til å sende informasjonsmeldinger.

For å aktivere varsler i din .NET MCP-server må du sørge for at du bruker en strømmende transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Klientside: Motta varsler

Klienten må implementere en meldingsbehandler for å prosessere og vise varsler etter hvert som de ankommer.

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

I koden over sjekker `message_handler`-funksjonen om den innkommende meldingen er et varsel. Hvis den er det, skrives varselet ut, ellers behandles det som en vanlig servermelding. Legg også merke til hvordan `ClientSession` initialiseres med `message_handler` for å håndtere innkommende varsler.

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

I dette .NET-eksemplet sjekker `MessageHandler`-funksjonen om den innkommende meldingen er et varsel. Hvis ja, skrives varselet ut, ellers behandles det som en vanlig servermelding. `ClientSession` initialiseres med meldingsbehandleren via `ClientSessionOptions`.

For å aktivere varsler, sørg for at serveren din bruker en strømmende transport (som `streamable-http`) og at klienten implementerer en meldingsbehandler for å prosessere varsler.

## Fremdriftsvarsler & scenarier

Denne seksjonen forklarer konseptet med fremdriftsvarsler i MCP, hvorfor de er viktige, og hvordan implementere dem ved bruk av Streamable HTTP. Du finner også en praktisk oppgave for å styrke forståelsen din.

Fremdriftsvarsler er sanntidsmeldinger sendt fra server til klient under langvarige operasjoner. Istedenfor å vente på at hele prosessen skal fullføres holder serveren klienten oppdatert om gjeldende status. Dette forbedrer transparens, brukeropplevelse og gjør feilsøking enklere.

**Eksempel:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Hvorfor bruke fremdriftsvarsler?

Fremdriftsvarsler er viktige av flere grunner:

- **Bedre brukeropplevelse:** Brukere ser oppdateringer etter hvert som arbeidet skrider frem, ikke bare til slutt.
- **Sanntidsfeedback:** Klienter kan vise fremdriftslinjer eller logger, noe som gjør appen mer responsiv.
- **Enklere feilsøking og overvåkning:** Utviklere og brukere kan se hvor en prosess eventuelt er treg eller satt fast.

### Hvordan implementere fremdriftsvarsler

Slik kan du implementere fremdriftsvarsler i MCP:

- **På serveren:** Bruk `ctx.info()` eller `ctx.log()` for å sende varsler mens hvert element behandles. Dette sender en melding til klienten før hovedresultatet er klart.
- **På klienten:** Implementer en meldingsbehandler som lytter etter og viser varsler etter hvert som de ankommer. Denne behandleren skiller mellom varsler og det endelige resultatet.

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

Når du implementerer MCP-servere med HTTP-baserte transporter, blir sikkerhet en avgjørende bekymring som krever nøye oppmerksomhet mot flere angrepsvektorer og beskyttelsesmekanismer.

### Oversikt

Sikkerhet er kritisk når MCP-servere eksponeres over HTTP. Streamable HTTP introduserer nye angrepsflater og krever nøye konfigurasjon.

### Viktige punkter
- **Validere Origin-header**: Alltid valider `Origin`-headeren for å forhindre DNS-rebindingsangrep.
- **Binding til localhost**: For lokal utvikling, bind servere til `localhost` for å unngå å eksponere dem mot det offentlige nettet.
- **Autentisering**: Implementer autentisering (f.eks. API-nøkler, OAuth) for produksjonsdistribusjoner.
- **CORS**: Konfigurer Cross-Origin Resource Sharing (CORS)-policyer for å begrense tilgang.
- **HTTPS**: Bruk HTTPS i produksjon for å kryptere trafikk.

### Beste praksis

- Stol aldri på innkommende forespørsler uten validering.
- Loggfør og overvåk all tilgang og feil.
- Oppdater regelmessig avhengigheter for å tette sikkerhetssårbarheter.

### Utfordringer

- Å finne balanse mellom sikkerhet og enkel utvikling
- Å sikre kompatibilitet med ulike klientmiljøer

## Oppgradering fra SSE til Streamable HTTP

For applikasjoner som for øyeblikket bruker Server-Sent Events (SSE), gir migrering til Streamable HTTP forbedrede muligheter og bedre langsiktig bærekraft for dine MCP-implementasjoner.

### Hvorfor oppgradere?

Det finnes to overbevisende grunner til å oppgradere fra SSE til Streamable HTTP:

- Streamable HTTP tilbyr bedre skalerbarhet, kompatibilitet og rikere varsling enn SSE.
- Det er den anbefalte transporten for nye MCP-applikasjoner.

### Migrasjonstrinn

Slik kan du migrere fra SSE til Streamable HTTP i dine MCP-applikasjoner:

- **Oppdater serverkoden** for å bruke `transport="streamable-http"` i `mcp.run()`.
- **Oppdater klientkoden** for å bruke `streamablehttp_client` i stedet for SSE-klient.
- **Implementer en meldingsbehandler** i klienten for å prosessere varsler.
- **Test for kompatibilitet** med eksisterende verktøy og arbeidsflyter.

### Bevare kompatibilitet

Det anbefales å opprettholde kompatibilitet med eksisterende SSE-klienter i migrasjonsprosessen. Her er noen strategier:

- Du kan støtte både SSE og Streamable HTTP ved å kjøre begge transportene på forskjellige endepunkter.
- Migrer klienter gradvis til den nye transporten.

### Utfordringer

Sørg for at du håndterer følgende utfordringer under migreringen:

- Sikre at alle klienter oppdateres
- Håndtere forskjeller i leveransene av varsler

## Sikkerhetshensyn

Sikkerhet bør være en topp prioritet når du implementerer en hvilken som helst server, spesielt når du bruker HTTP-baserte transporter som Streamable HTTP i MCP.

Når du implementerer MCP-servere med HTTP-baserte transporter blir sikkerhet en svært viktig bekymring som krever nøye oppmerksomhet på flere angrepsvektorer og beskyttelsesmekanismer.

### Oversikt

Sikkerhet er kritisk når du eksponerer MCP-servere over HTTP. Streamable HTTP introduserer nye angrepsflater og krever nøye konfigurasjon.

Her er noen viktige sikkerhetshensyn:

- **Validere Origin-header**: Alltid valider `Origin`-headeren for å forhindre DNS-rebindingsangrep.
- **Binding til localhost**: For lokal utvikling, bind servere til `localhost` for å unngå å eksponere dem mot det offentlige nettet.
- **Autentisering**: Implementer autentisering (f.eks. API-nøkler, OAuth) for produksjonsdistribusjoner.
- **CORS**: Konfigurer Cross-Origin Resource Sharing (CORS)-policyer for å begrense tilgang.
- **HTTPS**: Bruk HTTPS i produksjon for å kryptere trafikk.

### Beste praksis

I tillegg, her er noen beste praksiser å følge når du implementerer sikkerhet i din MCP-streamingserver:

- Stol aldri på innkommende forespørsler uten validering.
- Loggfør og overvåk all tilgang og feil.
- Oppdater regelmessig avhengigheter for å tette sikkerhetssårbarheter.

### Utfordringer

Du vil møte noen utfordringer når du implementerer sikkerhet i MCP-streamingservere:

- Å finne balanse mellom sikkerhet og enkel utvikling
- Å sikre kompatibilitet med ulike klientmiljøer

### Oppgave: Lag din egen streaming MCP-app

**Scenario:**
Bygg en MCP-server og klient hvor serveren prosesserer en liste over elementer (f.eks. filer eller dokumenter) og sender en varsling for hvert behandlet element. Klienten skal vise hver varsling etter hvert som den kommer.

**Trinn:**

1. Implementer et serververktøy som prosesserer en liste og sender varsler for hvert element.
2. Implementer en klient med en meldingsbehandler for å vise varsler i sanntid.
3. Test implementasjonen ved å kjøre både server og klient, og observer varslene.

[Løsning](./solution/README.md)

## Videre lesing og hva nå?

For å fortsette reisen med MCP-streaming og utvide kunnskapen din, tilbyr denne seksjonen flere ressurser og foreslåtte neste trinn for å bygge mer avanserte applikasjoner.

### Videre lesing

- [Microsoft: Introduksjon til HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS i ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Hva nå?

- Prøv å bygge mer avanserte MCP-verktøy som bruker streaming til sanntidsanalyse, chat eller samarbeidende redigering.
- Utforsk integrasjon av MCP-streaming med frontend-rammeverk (React, Vue, osv.) for direkte UI-oppdateringer.
- Neste: [Bruke AI Toolkit for VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->