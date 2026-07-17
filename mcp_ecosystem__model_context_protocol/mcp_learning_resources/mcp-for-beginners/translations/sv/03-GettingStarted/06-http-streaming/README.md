# HTTPS Streaming med Model Context Protocol (MCP)

Detta kapitel ger en omfattande guide för att implementera säker, skalbar och realtidsströmning med Model Context Protocol (MCP) med HTTPS. Det täcker motivationen för streaming, tillgängliga transportmekanismer, hur man implementerar strömningsbar HTTP i MCP, säkerhetsbästa praxis, migrering från SSE och praktiska riktlinjer för att bygga egna streamingapplikationer med MCP.

> **Framåtblick:** denna lektion beskriver Streamable HTTP under **MCP Specification 2025-11-25**, där en session etableras under `initialize` och knyts med en `Mcp-Session-Id` header. Release-kandidaten `2026-07-28` tar bort handskakningen och session-ID helt, vilket gör varje förfrågan självständig och ruttbar till vilken serverinstans som helst utan klibbiga sessioner. Se [Vad som ändras i MCP: Release-kandidaten 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) för detaljer.

## Transportmekanismer och streaming i MCP

Den här sektionen utforskar de olika transportmekanismerna som finns tillgängliga i MCP och deras roll i att möjliggöra streamingfunktioner för realtidskommunikation mellan klienter och servrar.

### Vad är en transportmekanism?

En transportmekanism definierar hur data utbyts mellan klient och server. MCP stödjer flera transporttyper för att passa olika miljöer och krav:

- **stdio**: Standard in-/utgång, lämplig för lokala och CLI-baserade verktyg. Enkel men inte lämpad för webb eller molnet.
- **SSE (Server-Sent Events)**: Gör det möjligt för servrar att skicka realtidsuppdateringar till klienter över HTTP. Bra för webbgränssnitt, men begränsad i skalbarhet och flexibilitet. Från och med MCP Specification 2025-06-18 har den fristående SSE-transporten avvecklats och ersatts av "Streamable HTTP"-transport.
- **Streamable HTTP**: Modern HTTP-baserad streamingtransport, som stödjer notifieringar och bättre skalbarhet. Rekommenderas för de flesta produktions- och molnscenarier.

### Jämförelsetabell

Ta en titt på jämförelsetabellen nedan för att förstå skillnaderna mellan dessa transportmekanismer:

| Transport         | Realtidsuppdateringar | Streaming | Skalbarhet | Användningsfall          |
|-------------------|-----------------------|-----------|------------|-------------------------|
| stdio             | Nej                   | Nej       | Låg        | Lokala CLI-verktyg      |
| SSE               | Ja                    | Ja        | Medel      | Webb, realtidsuppdateringar |
| Streamable HTTP   | Ja                    | Ja        | Hög        | Moln, multi-klient      |

> **Tips:** Valet av rätt transport påverkar prestanda, skalbarhet och användarupplevelse. **Streamable HTTP** rekommenderas för moderna, skalbara och molnberedda applikationer.

Notera transporterna stdio och SSE som du fått se i tidigare kapitel och hur streamable HTTP är transporten som behandlas i detta kapitel.

## Streaming: Begrepp och motivation

Att förstå de grundläggande begreppen och motivationerna bakom streaming är avgörande för att implementera effektiva realtidskommunikationssystem.

**Streaming** är en teknik inom nätverksprogrammering som tillåter data att skickas och tas emot i små, hanterbara delar eller som en sekvens av händelser, istället för att vänta på att ett helt svar ska vara färdigt. Detta är särskilt användbart för:

- Stora filer eller dataset.
- Realtidsuppdateringar (t.ex. chatt, framstegsfält).
- Långvariga beräkningar där du vill hålla användaren informerad.

Här är vad du behöver veta om streaming på hög nivå:

- Data levereras successivt, inte allt på en gång.
- Klienten kan bearbeta data i samma stund som det anländer.
- Minskar upplevd latens och förbättrar användarupplevelsen.

### Varför använda streaming?

Skälen för att använda streaming är följande:

- Användare får omedelbar återkoppling, inte bara i slutet
- Möjliggör realtidsapplikationer och responsiva gränssnitt
- Effektivare användning av nätverks- och beräkningsresurser

### Enkelt exempel: HTTP streamingserver & klient

Här är ett enkelt exempel på hur streaming kan implementeras:

#### Python

**Server (Python, med FastAPI och StreamingResponse):**

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

Detta exempel visar en server som skickar en serie meddelanden till klienten allteftersom de blir tillgängliga, istället för att vänta tills alla meddelanden är färdiga.

**Hur det fungerar:**

- Servern levererar varje meddelande i takt med att det blir klart.
- Klienten tar emot och skriver ut varje del i takt med att den anländer.

**Krav:**

- Servern måste använda en strömningsrespons (t.ex. `StreamingResponse` i FastAPI).
- Klienten måste hantera svaret som en ström (`stream=True` i requests).
- Content-Type är vanligtvis `text/event-stream` eller `application/octet-stream`.

#### Java

**Server (Java, med Spring Boot och Server-Sent Events):**

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

**Java-implementationsnoteringar:**

- Använder Spring Boots reaktiva stack med `Flux` för streaming
- `ServerSentEvent` ger strukturerad event-streaming med händelsetyper
- `WebClient` med `bodyToFlux()` möjliggör reaktiv konsumtion av stream
- `delayElements()` simulerar behandlingstid mellan händelser
- Händelser kan ha typer (`info`, `result`) för bättre klienthantering

### Jämförelse: Klassisk streaming vs MCP-streaming

Skillnaderna mellan hur streaming fungerar på ett "klassiskt" sätt jämfört med hur det fungerar i MCP kan illustreras så här:

| Funktion               | Klassisk HTTP Streaming         | MCP Streaming (Notifieringar)     |
|-----------------------|--------------------------------|----------------------------------|
| Huvudsakligt svar      | Chunked                        | Enkelt, i slutet                  |
| Uppdateringar om Progress | Skickas som data chunkar      | Skickas som notifieringar        |
| Klientkrav             | Måste bearbeta strömmen        | Måste implementera meddelandehanterare |
| Användningsfall        | Stora filer, AI-tokenströmmar  | Progress, loggar, realtidsåterkoppling |

### Observerade skillnader

Dessutom, här är några nyckelskillnader:

- **Kommunikationsmönster:**
  - Klassisk HTTP-streaming: Använder enkel chunked transfer encoding för att skicka data i delar
  - MCP-streaming: Använder ett strukturerat notifieringssystem med JSON-RPC-protokoll

- **Meddelandformat:**
  - Klassisk HTTP: Enkel textdelar med radbrytningar
  - MCP: Strukturerade LoggingMessageNotification-objekt med metadata

- **Klientimplementation:**
  - Klassisk HTTP: Enkel klient som bearbetar streaming-responser
  - MCP: Mer avancerad klient med en meddelandehanterare för att bearbeta olika typer av meddelanden

- **Uppdateringar om framsteg:**
  - Klassisk HTTP: Framsteg är en del av huvudströmmen
  - MCP: Framsteg skickas separat via notifieringsmeddelanden medan huvudresultatet kommer i slutet

### Rekommendationer

Det finns några saker vi rekommenderar när det gäller att välja mellan att implementera klassisk streaming (som ett endpoint vi visade ovan med `/stream`) eller att välja streaming via MCP.

- **För enkla streamingbehov:** Klassisk HTTP-streaming är enklare att implementera och tillräckligt för grundläggande streamingbehov.

- **För komplexa, interaktiva applikationer:** MCP-streaming ger en mer strukturerad metod med rikare metadata och separation mellan notifieringar och slutgiltiga resultat.

- **För AI-applikationer:** MCP:s notifieringssystem är särskilt användbart för långvariga AI-uppgifter där du vill hålla användarna uppdaterade om framsteg.

## Streaming i MCP

Ok, du har sett några rekommendationer och jämförelser hittills om skillnaden mellan klassisk streaming och streaming i MCP. Låt oss gå in på detaljer hur du exakt kan utnyttja streaming i MCP.

Att förstå hur streaming fungerar inom MCP-ramverket är avgörande för att bygga responsiva applikationer som ger realtidsåterkoppling till användare under långvariga operationer.

I MCP handlar streaming inte om att skicka huvudsvaret i chunkar, utan om att skicka **notifieringar** till klienten medan ett verktyg bearbetar en begäran. Dessa notifieringar kan inkludera framstegsuppdateringar, loggar eller andra händelser.

### Hur det fungerar

Huvudresultatet skickas fortfarande som ett enda svar. Men notifieringar kan skickas som separata meddelanden under bearbetningen och uppdatera klienten i realtid. Klienten måste kunna hantera och visa dessa notifieringar.

## Vad är en notifiering?

Vi nämnde "Notifiering", vad betyder det i MCP-kontext?

En notifiering är ett meddelande som skickas från servern till klienten för att informera om framsteg, status eller andra händelser under en långvarig operation. Notifieringar förbättrar transparens och användarupplevelse.

Till exempel ska en klient skicka en notifiering när den inledande handskakningen med servern har gjorts.

En notifiering ser ut så här som ett JSON-meddelande:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifieringar tillhör ett ämne i MCP som kallas ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Nedläggningsmeddelande:** `2026-07-28` MCP-specifikationsreleasekandidaten markerar Logging-primitivet som avvecklat till förmån för `stderr` för stdio-transporter och OpenTelemetry för strukturerad observabilitet. Logging fortsätter fungera i `2025-11-25` och i minst ett år efter eventuell formell nedläggning. Se [Vad som ändras i MCP: Release-kandidaten 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

För att få logging att fungera måste servern aktivera det som en funktion/kapacitet så här:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Beroende på SDK som används kan logging vara aktiverat som standard, eller så kan du behöva aktivera det uttryckligen i din serverkonfiguration.

Det finns olika typer av notifieringar:

| Nivå      | Beskrivning                  | Exempel på användning          |
|-----------|------------------------------|-------------------------------|
| debug     | Detaljerad felsökningsinformation | Funktionsin- och utgångspunkter |
| info      | Allmänna informationsmeddelanden | Uppdateringar om operativ framsteg |
| notice    | Normala men betydande händelser | Konfigurationsändringar       |
| warning   | Varningsförhållanden           | Användning av utdaterad funktion |
| error     | Felkonditioner                | Driftstörningar               |
| critical  | Kritiska förhållanden          | Felfunktioner i systemkomponent |
| alert     | Åtgärd måste vidtas omedelbart | Upptäckt datakorruption       |
| emergency | Systemet är oanvändbart        | Fullständigt systemfel        |

## Implementera notifieringar i MCP

För att implementera notifieringar i MCP behöver du konfigurera både server- och klientsidan för att hantera realtidsuppdateringar. Detta gör att din applikation kan ge omedelbar feedback till användare under långvariga operationer.

### Serversidan: Skicka notifieringar

Låt oss börja med serversidan. I MCP definierar du verktyg som kan skicka notifieringar medan de bearbetar förfrågningar. Servern använder kontextobjektet (vanligtvis `ctx`) för att skicka meddelanden till klienten.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

I det föregående exemplet skickar `process_files`-verktyget tre notifieringar till klienten samtidigt som det bearbetar varje fil. `ctx.info()`-metoden används för att skicka informationsmeddelanden.

För att dessutom aktivera notifieringar, säkerställ att din server använder en streamingtransport (som `streamable-http`) och att din klient implementerar en meddelandehanterare för att bearbeta notifieringar. Så här kan du konfigurera servern för att använda `streamable-http`-transport:

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

I detta .NET-exempel är `ProcessFiles`-verktyget dekorerat med `Tool`-attributet och skickar tre notifieringar till klienten när det bearbetar varje fil. `ctx.Info()`-metoden används för att sända informationsmeddelanden.

För att aktivera notifieringar i din .NET MCP-server, säkerställ att du använder en streamingtransport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Klientsidan: Ta emot notifieringar

Klienten måste implementera en meddelandehanterare för att bearbeta och visa notifieringar i takt med att de anländer.

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

I den föregående koden kontrollerar `message_handler`-funktionen om det inkommande meddelandet är en notifiering. Om det är det, skrivs notifieringen ut, annars bearbetas det som ett vanligt servermeddelande. Observera även hur `ClientSession` initieras med `message_handler` för att hantera inkommande notifieringar.

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

I detta .NET-exempel kontrollerar `MessageHandler`-funktionen om det inkommande meddelandet är en notifiering. Om så är fallet, skrivs notifieringen ut; annars bearbetas det som ett vanligt servermeddelande. `ClientSession` initieras med meddelandehanteraren via `ClientSessionOptions`.

För att aktivera notifieringar, säkerställ att din server använder en streamingtransport (t.ex. `streamable-http`) och att din klient implementerar en meddelandehanterare för att bearbeta notifieringar.

## Framstegsnotifieringar & scenarier

Denna sektion förklarar konceptet framstegsnotifieringar i MCP, varför de är viktiga, och hur man implementerar dem med Streamable HTTP. Du hittar också en praktisk uppgift för att förstärka din förståelse.

Framstegsnotifieringar är realtidsmeddelanden som skickas från servern till klienten under långvariga operationer. Istället för att vänta på att hela processen ska avslutas håller servern klienten uppdaterad om aktuell status. Detta förbättrar transparens, användarupplevelse och gör felsökning enklare.

**Exempel:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Varför använda framstegsnotifieringar?

Framstegsnotifieringar är viktiga av flera skäl:

- **Bättre användarupplevelse:** Användare ser uppdateringar medan arbetet fortskrider, inte bara i slutet.
- **Realtidsåterkoppling:** Klienter kan visa progressbarer eller loggar, vilket gör appen mer responsiv.
- **Enklare felsökning och övervakning:** Utvecklare och användare kan se var en process kan vara långsam eller fastna.

### Hur man implementerar framstegsnotifieringar

Så här kan du implementera framstegsnotifieringar i MCP:

- **På servern:** Använd `ctx.info()` eller `ctx.log()` för att skicka notifieringar medan varje post bearbetas. Detta skickar ett meddelande till klienten innan huvudresultatet är klart.
- **På klienten:** Implementera en meddelandehanterare som lyssnar efter och visar notifieringar i takt med att de anländer. Denna hanterare särskiljer mellan notifieringar och slutresultat.

**Serverexempel:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Klientexempel:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Säkerhetsöverväganden

När du implementerar MCP-servrar med HTTP-baserade transporter blir säkerhet en mycket viktig fråga som kräver noggrann uppmärksamhet på flera angreppsvektorer och skyddsmekanismer.

### Översikt

Säkerhet är avgörande när man exponerar MCP-servrar över HTTP. Streamable HTTP introducerar nya angreppsytor och kräver noggrann konfiguration.

### Viktiga punkter

- **Validering av Origin-header**: Validera alltid `Origin`-headern för att förhindra DNS-rebindningsattacker.
- **Binding till localhost**: För lokal utveckling, bind servrar till `localhost` för att undvika exponering mot offentliga internet.
- **Autentisering**: Implementera autentisering (t.ex. API-nycklar, OAuth) för produktionsdistributioner.
- **CORS**: Konfigurera Cross-Origin Resource Sharing (CORS) policies för att begränsa åtkomst.
- **HTTPS**: Använd HTTPS i produktion för att kryptera trafiken.

### Bästa praxis

- Lita aldrig på inkommande förfrågningar utan validering.
- Logga och övervaka all åtkomst och fel.
- Uppdatera regelbundet beroenden för att täppa till säkerhetsbrister.

### Utmaningar

- Att balansera säkerhet med utvecklingslättnad
- Att säkerställa kompatibilitet med olika klientmiljöer

## Uppgradering från SSE till Streamable HTTP

För applikationer som för närvarande använder Server-Sent Events (SSE), ger migrering till Streamable HTTP förbättrade möjligheter och bättre långsiktig hållbarhet för dina MCP-implementationer.

### Varför uppgradera?

Det finns två starka skäl att uppgradera från SSE till Streamable HTTP:

- Streamable HTTP erbjuder bättre skalbarhet, kompatibilitet och rikare notifieringsstöd än SSE.
- Det är den rekommenderade transporten för nya MCP-applikationer.

### Migreringssteg

Så här kan du migrera från SSE till Streamable HTTP i dina MCP-applikationer:

- **Uppdatera serverkoden** för att använda `transport="streamable-http"` i `mcp.run()`.
- **Uppdatera klientkoden** för att använda `streamablehttp_client` istället för SSE-klienten.
- **Implementera en meddelandehanterare** i klienten för att bearbeta notifieringar.
- **Testa kompatibilitet** med befintliga verktyg och arbetsflöden.

### Behålla kompatibilitet

Det rekommenderas att behålla kompatibilitet med befintliga SSE-klienter under migreringsprocessen. Här är några strategier:

- Du kan stödja både SSE och Streamable HTTP genom att köra båda transporterna på olika endpoints.
- Migrera gradvis klienter till den nya transporten.

### Utmaningar

Säkerställ att du tar itu med följande utmaningar under migreringen:

- Säkerställa att alla klienter uppdateras
- Hantera skillnader i notifieringsleverans

## Säkerhetsöverväganden

Säkerhet bör vara högsta prioritet när du implementerar valfri server, särskilt när du använder HTTP-baserade transporter som Streamable HTTP i MCP.

När du implementerar MCP-servrar med HTTP-baserade transporter blir säkerhet en mycket viktig fråga som kräver noggrann uppmärksamhet på flera angreppsvektorer och skyddsmekanismer.

### Översikt

Säkerhet är avgörande när man exponerar MCP-servrar över HTTP. Streamable HTTP introducerar nya angreppsytor och kräver noggrann konfiguration.

Här är några viktiga säkerhetsöverväganden:

- **Validering av Origin-header**: Validera alltid `Origin`-headern för att förhindra DNS-rebindningsattacker.
- **Binding till localhost**: För lokal utveckling, bind servrar till `localhost` för att undvika exponering mot offentliga internet.
- **Autentisering**: Implementera autentisering (t.ex. API-nycklar, OAuth) för produktionsdistributioner.
- **CORS**: Konfigurera Cross-Origin Resource Sharing (CORS) policies för att begränsa åtkomst.
- **HTTPS**: Använd HTTPS i produktion för att kryptera trafiken.

### Bästa praxis

Dessutom är här några bästa praxis att följa när du implementerar säkerhet i din MCP streaming-server:

- Lita aldrig på inkommande förfrågningar utan validering.
- Logga och övervaka all åtkomst och fel.
- Uppdatera regelbundet beroenden för att täppa till säkerhetsbrister.

### Utmaningar

Du kommer att möta några utmaningar när du implementerar säkerhet i MCP streaming-servrar:

- Att balansera säkerhet med utvecklingslättnad
- Att säkerställa kompatibilitet med olika klientmiljöer

### Uppdrag: Bygg din egen streaming-MCP-app

**Scenario:**
Bygg en MCP-server och klient där servern bearbetar en lista med objekt (t.ex. filer eller dokument) och skickar en notifiering för varje behandlat objekt. Klienten ska visa varje notifiering när den anländer.

**Steg:**

1. Implementera ett serververktyg som bearbetar en lista och skickar notifieringar för varje objekt.
2. Implementera en klient med en meddelandehanterare för att visa notifieringar i realtid.
3. Testa din implementation genom att köra både server och klient och observera notifieringarna.

[Lösning](./solution/README.md)

## Ytterligare läsning & Vad händer härnäst?

För att fortsätta din resa med MCP-streaming och utöka din kunskap, erbjuder denna sektion ytterligare resurser och föreslagna nästa steg för att bygga mer avancerade applikationer.

### Ytterligare läsning

- [Microsoft: Introduktion till HTTP-streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS i ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Vad händer härnäst?

- Försök bygga mer avancerade MCP-verktyg som använder streaming för realtidsanalys, chatt eller samredigering.
- Utforska att integrera MCP-streaming med frontend-ramverk (React, Vue, etc.) för live-UI-uppdateringar.
- Nästa: [Användning av AI Toolkit för VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->