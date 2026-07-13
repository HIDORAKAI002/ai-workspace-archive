# HTTPS Streaming med Model Context Protocol (MCP)

Detta kapitel ger en omfattande guide för att implementera säker, skalbar och realtidsströmning med Model Context Protocol (MCP) via HTTPS. Det täcker motivationen för strömning, tillgängliga transportmekanismer, hur man implementerar strömmande HTTP i MCP, säkerhetsrutiner, migrering från SSE och praktisk vägledning för att bygga egna strömmande MCP-applikationer.

> **Framtidsblick:** denna lektion beskriver Streamable HTTP under **MCP Specification 2025-11-25**, där en session etableras under `initialize` och fästs med en `Mcp-Session-Id` header. Releasekandidaten `2026-07-28` tar bort handskakningen och session-ID helt, vilket gör varje förfrågan självinnehållande och routbar till vilken serverinstans som helst utan fast session. Se [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) för detaljer.

## Transportmekanismer och strömning i MCP

Denna sektion utforskar de olika transportmekanismer som finns i MCP och deras roll för att möjliggöra strömningsfunktioner för realtidskommunikation mellan klienter och servrar.

### Vad är en transportmekanism?

En transportmekanism definierar hur data utbyts mellan klient och server. MCP stödjer flera transporttyper för att passa olika miljöer och krav:

- **stdio**: Standard in-/utmatning, lämplig för lokala och CLI-baserade verktyg. Enkel men inte lämplig för webben eller molnet.
- **SSE (Server-Sent Events)**: Tillåter servrar att push-uppdatera klienter i realtid via HTTP. Bra för webbgränssnitt men begränsad i skalbarhet och flexibilitet. Från och med MCP Specification 2025-06-18 har den fristående SSE-transporten ersatts av "Streamable HTTP".
- **Streamable HTTP**: Modern HTTP-baserad strömningstransport, som stödjer notiser och bättre skalbarhet. Rekommenderas för de flesta produktions- och molnscenarier.

### Jämförelsetabell

Ta en titt på jämförelsetabellen nedan för att förstå skillnaderna mellan dessa transportmekanismer:

| Transport         | Realtidsuppdateringar | Strömning | Skalbarhet | Användningsfall          |
|-------------------|-----------------------|-----------|------------|-------------------------|
| stdio             | Nej                   | Nej       | Låg        | Lokala CLI-verktyg      |
| SSE               | Ja                    | Ja        | Medel      | Webb, realtidsuppdateringar |
| Streamable HTTP   | Ja                    | Ja        | Hög        | Moln, multi-klient      |

> **Tips:** Valet av transport påverkar prestanda, skalbarhet och användarupplevelse. **Streamable HTTP** rekommenderas för moderna, skalbara och molnberedda applikationer.

Notera transporterna stdio och SSE som visades i tidigare kapitel och hur strömmande HTTP är transporten som behandlas i detta kapitel.

## Strömning: Koncept och motivation

Att förstå grundläggande koncept och motivation bakom strömning är avgörande för att implementera effektiva realtidskommunikationssystem.

**Strömning** är en teknik inom nätverksprogrammering som tillåter data att skickas och tas emot i små, hanterbara delar eller som en sekvens av händelser, istället för att vänta på att hela svaret ska vara klart. Detta är särskilt användbart för:

- Stora filer eller dataset.
- Realtidsuppdateringar (t.ex. chatt, progressindikatorer).
- Långvariga beräkningar där man vill hålla användaren informerad.

Här är vad du behöver veta om strömning på hög nivå:

- Data levereras successivt, inte allt på en gång.
- Klienten kan bearbeta data när det anländer.
- Minskar upplevd fördröjning och förbättrar användarupplevelsen.

### Varför använda strömning?

Anledningarna till att använda strömning är följande:

- Användare får omedelbar återkoppling, inte bara i slutet.
- Möjliggör realtidsapplikationer och responsiva gränssnitt.
- Mer effektiv användning av nätverk och beräkningsresurser.

### Enkel exempel: HTTP streaming server & klient

Här är ett enkelt exempel på hur strömning kan implementeras:

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

Detta exempel demonstrerar en server som skickar en serie meddelanden till klienten allteftersom de blir tillgängliga, istället för att vänta på att alla meddelanden ska vara klara.

**Hur det fungerar:**

- Servern levererar varje meddelande när det är klart.
- Klienten tar emot och skriver ut varje del när den anländer.

**Krav:**

- Servern måste använda en strömmande respons (t.ex. `StreamingResponse` i FastAPI).
- Klienten måste behandla svaret som en ström (`stream=True` i requests).
- Content-Type är normalt `text/event-stream` eller `application/octet-stream`.

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

**Java-implementationsanmärkningar:**

- Använder Spring Boots reaktiva stack med `Flux` för strömning.
- `ServerSentEvent` tillhandahåller strukturerad händelseströmning med händelsetyper.
- `WebClient` med `bodyToFlux()` möjliggör reaktiv strömningskonsumtion.
- `delayElements()` simulerar behandlingstid mellan händelser.
- Händelser kan ha typer (`info`, `result`) för bättre klienthantering.

### Jämförelse: Klassisk strömning vs MCP-strömning

Skillnaderna mellan hur strömning fungerar på ett "klassiskt" sätt jämfört med hur det fungerar i MCP kan illustreras så här:

| Funktion               | Klassisk HTTP-strömning       | MCP-strömning (Notiser)            |
|------------------------|-------------------------------|-----------------------------------|
| Huvudsvar              | Delat i chunkar               | Enkelt, i slutet                   |
| Uppdateringar          | Skickas som data chunkar      | Skickas som notiser                |
| Klientkrav             | Måste hantera ström            | Måste implementera meddelandehanterare |
| Användningsfall        | Stora filer, AI-tokenströmmar | Framsteg, loggar, realtidsfeedback |

### Viktiga skillnader observerade

Dessutom, här är några viktiga skillnader:

- **Kommunikationsmönster:**
  - Klassisk HTTP-strömning: Använder enkel chunkad överföringskodning för att skicka data i delar
  - MCP-strömning: Använder ett strukturerat notissystem med JSON-RPC-protokoll

- **Meddelandformat:**
  - Klassisk HTTP: Vanlig text med chunkar och radbrytningar
  - MCP: Strukturerade LoggingMessageNotification-objekt med metadata

- **Klientimplementation:**
  - Klassisk HTTP: Enkel klient som behandlar strömmande svar
  - MCP: Mer sofistikerad klient med meddelandehanterare som behandlar olika typer av meddelanden

- **Uppdateringar om framsteg:**
  - Klassisk HTTP: Framsteg är en del av huvudsvarsströmmen
  - MCP: Framsteg skickas via separata notismeddelanden medan huvudsvar kommer i slutet

### Rekommendationer

Det finns några saker vi rekommenderar när det gäller att välja mellan att implementera klassisk strömning (som en endpoint vi visade ovan med `/stream`) kontra att välja strömning via MCP.

- **För enkla strömningsbehov:** Klassisk HTTP-strömning är enklare att implementera och tillräcklig för grundläggande behov.

- **För komplexa, interaktiva applikationer:** MCP-strömning ger ett mer strukturerat tillvägagångssätt med rikare metadata och separation mellan notiser och slutresultat.

- **För AI-applikationer:** MCP:s notissystem är särskilt användbart för långvariga AI-uppgifter där man vill hålla användaren informerad om framsteg.

## Strömning i MCP

Okej, så du har sett några rekommendationer och jämförelser hittills om skillnaden mellan klassisk strömning och strömning i MCP. Låt oss gå in på detaljer om hur du kan utnyttja strömning i MCP.

Att förstå hur strömning fungerar inom MCP-ramverket är avgörande för att bygga responsiva applikationer som ger realtidsfeedback till användare under långvariga operationer.

I MCP handlar strömning inte om att skicka huvudsvar i chunkar, utan om att skicka **notiser** till klienten medan ett verktyg bearbetar en begäran. Dessa notiser kan innehålla framstegsuppdateringar, loggar eller andra händelser.

### Hur det fungerar

Huvudresultatet skickas fortfarande som ett enda svar. Emellertid kan notiser skickas som separata meddelanden under bearbetningen och på så sätt uppdatera klienten i realtid. Klienten måste kunna hantera och visa dessa notiser.

## Vad är en notis?

Vi sade "notis", vad betyder det i MCP-sammanhang?

En notis är ett meddelande som skickas från servern till klienten för att informera om framsteg, status eller andra händelser under en långvarig operation. Notiser förbättrar transparens och användarupplevelse.

Till exempel förväntas en klient skicka en notis när den initiala handskakningen med servern har gjorts.

En notis ser ut så här som ett JSON-meddelande:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notiser hör till ett ämne i MCP kallat ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

För att få logging att fungera behöver servern aktivera denna funktion/kapacitet så här:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Beroende på SDK som används kan logging vara aktiverat som standard, eller så kan du behöva aktivera det explicit i serverkonfigurationen.

Det finns olika typer av notiser:

| Nivå      | Beskrivning                  | Exempelanvändning             |
|-----------|------------------------------|------------------------------|
| debug     | Detaljerad felsökningsinfo   | Funktionsin- och utgångspunkter |
| info      | Allmän informationsmeddelanden | Uppdateringar om framsteg     |
| notice    | Normala men betydande händelser | Konfigurationsändringar       |
| warning   | Varningsvillkor              | Användning av föråldrad funktion |
| error     | Felvillkor                  | Fel i operationer             |
| critical  | Kritiska villkor            | Systemkomponentfel            |
| alert     | Omedelbar handling krävs     | Datakorruption upptäckt       |
| emergency | Systemet är oanvändbart      | Komplett systemkollaps        |

## Implementera notiser i MCP

För att implementera notiser i MCP behöver du konfigurera både server- och klientsidan för att hantera realtidsuppdateringar. Detta gör att din applikation kan ge omedelbar återkoppling till användare under långvariga processer.

### Serversida: Skicka notiser

Vi börjar med serversidan. I MCP definierar du verktyg som kan skicka notiser medan de bearbetar förfrågningar. Servern använder kontextobjektet (vanligtvis `ctx`) för att skicka meddelanden till klienten.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

I föregående exempel skickar verktyget `process_files` tre notiser till klienten när det bearbetar varje fil. Metoden `ctx.info()` används för att skicka informationsmeddelanden.

För att aktivera notiser, se till att din server använder en strömmande transport (som `streamable-http`) och att din klient implementerar en meddelandehanterare för att bearbeta notiser. Så här kan du konfigurera servern för att använda `streamable-http` transport:

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

I detta .NET-exempel är verktyget `ProcessFiles` dekorerat med `Tool`-attributet och skickar tre notiser till klienten när det bearbetar varje fil. Metoden `ctx.Info()` används för att skicka informationsmeddelanden.

För att aktivera notiser i din .NET MCP-server, säkerställ att du använder en strömmande transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Klientsida: Ta emot notiser

Klienten måste implementera en meddelandehanterare för att bearbeta och visa notiser när de anländer.

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

I ovanstående kod kontrollerar funktionen `message_handler` om det inkommande meddelandet är en notis. Om så är fallet skriver den ut notisen; annars processas det som ett vanligt servermeddelande. Notera också hur `ClientSession` initieras med `message_handler` för att hantera inkommande notiser.

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

I detta .NET-exempel kontrollerar funktionen `MessageHandler` om det inkommande meddelandet är en notis. Om så är fallet skriver den ut notisen; annars processas det som ett vanligt servermeddelande. `ClientSession` initieras med meddelandehanteraren via `ClientSessionOptions`.

För att aktivera notiser, se till att din server använder en strömmande transport (som `streamable-http`) och att din klient implementerar en meddelandehanterare för att bearbeta notiser.

## Framstegsnotiser & scenarier

Denna sektion förklarar konceptet framstegsnotiser i MCP, varför de är viktiga och hur man implementerar dem med Streamable HTTP. Du hittar också en praktisk uppgift för att förstärka din förståelse.

Framstegsnotiser är realtidsmeddelanden som skickas från servern till klienten under långvariga operationer. Istället för att vänta på att hela processen ska bli klar håller servern klienten uppdaterad om aktuell status. Detta förbättrar transparens, användarupplevelse och gör felsökning enklare.

**Exempel:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Varför använda framstegsnotiser?

Framstegsnotiser är viktiga av flera skäl:

- **Bättre användarupplevelse:** Användare ser uppdateringar under arbetets gång, inte bara i slutet.
- **Realtidsfeedback:** Klienter kan visa progressindikatorer eller loggar, vilket gör appen mer responsiv.
- **Enklare felsökning och övervakning:** Utvecklare och användare kan se var en process kan vara långsam eller fastna.

### Hur man implementerar framstegsnotiser

Så här kan du implementera framstegsnotiser i MCP:

- **På servern:** Använd `ctx.info()` eller `ctx.log()` för att skicka notiser när varje punkt bearbetas. Detta skickar ett meddelande till klienten innan huvudresultatet är klart.
- **På klienten:** Implementera en meddelandehanterare som lyssnar efter och visar notiser när de anländer. Denna hanterare skiljer på notiser och slutresultat.

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

## Säkerhetsaspekter

När du implementerar MCP-servrar med HTTP-baserade transporter blir säkerhet en avgörande fråga som kräver noggrann uppmärksamhet på flera angreppsvägar och skyddsmekanismer.

### Översikt

Säkerhet är kritiskt när MCP-servrar exponeras över HTTP. Streamable HTTP introducerar nya angreppsyta och kräver noggrann konfiguration.

### Nyckelpunkter


- **Validering av Origin-header**: Validera alltid `Origin`-headern för att förhindra DNS-rebindningsattacker.
- **Localhost-bindning**: För lokal utveckling, bind servrar till `localhost` för att undvika exponering mot det offentliga internet.
- **Autentisering**: Implementera autentisering (t.ex. API-nycklar, OAuth) för produktionssättningar.
- **CORS**: Konfigurera Cross-Origin Resource Sharing (CORS)-policyer för att begränsa åtkomst.
- **HTTPS**: Använd HTTPS i produktion för att kryptera trafiken.

### Bästa praxis

- Lita aldrig på inkommande förfrågningar utan validering.
- Logga och övervaka all åtkomst och alla fel.
- Uppdatera regelbundet beroenden för att åtgärda säkerhetssårbarheter.

### Utmaningar

- Att balansera säkerhet med enkelhet i utvecklingen
- Säkerställa kompatibilitet med olika klientmiljöer

## Uppgradering från SSE till Streamable HTTP

För applikationer som för närvarande använder Server-Sent Events (SSE), ger en migrering till Streamable HTTP förbättrade funktioner och bättre långsiktig hållbarhet för dina MCP-implementationer.

### Varför uppgradera?

Det finns två övertygande skäl att uppgradera från SSE till Streamable HTTP:

- Streamable HTTP erbjuder bättre skalbarhet, kompatibilitet och mer omfattande notifikationsstöd än SSE.
- Det är den rekommenderade transporten för nya MCP-applikationer.

### Migreringssteg

Så här kan du migrera från SSE till Streamable HTTP i dina MCP-applikationer:

- **Uppdatera serverkoden** för att använda `transport="streamable-http"` i `mcp.run()`.
- **Uppdatera klientkoden** för att använda `streamablehttp_client` istället för SSE-klient.
- **Implementera en meddelandehanterare** i klienten för att bearbeta notifikationer.
- **Testa kompatibilitet** med befintliga verktyg och arbetsflöden.

### Behålla kompatibilitet

Det rekommenderas att upprätthålla kompatibilitet med befintliga SSE-klienter under migreringsprocessen. Här är några strategier:

- Du kan stödja både SSE och Streamable HTTP genom att köra båda transporterna på olika ändpunkter.
- Migrera klienter gradvis till den nya transporten.

### Utmaningar

Säkerställ att du hanterar följande utmaningar under migrering:

- Säkerställa att alla klienter uppdateras
- Hantera skillnader i leverans av notifikationer

## Säkerhetsaspekter

Säkerhet bör vara högsta prioritet vid implementering av någon server, särskilt när HTTP-baserade transporter som Streamable HTTP används i MCP.

När du implementerar MCP-servrar med HTTP-baserade transporter blir säkerhet en avgörande fråga som kräver noggrann uppmärksamhet på flera angreppsvektorer och skyddsmekanismer.

### Översikt

Säkerhet är kritiskt när MCP-servrar exponeras över HTTP. Streamable HTTP introducerar nya angreppsytor och kräver noggrann konfiguration.

Här är några viktiga säkerhetsaspekter:

- **Validering av Origin-header**: Validera alltid `Origin`-headern för att förhindra DNS-rebindningsattacker.
- **Localhost-bindning**: För lokal utveckling, bind servrar till `localhost` för att undvika exponering mot det offentliga internet.
- **Autentisering**: Implementera autentisering (t.ex. API-nycklar, OAuth) för produktionssättningar.
- **CORS**: Konfigurera Cross-Origin Resource Sharing (CORS)-policyer för att begränsa åtkomst.
- **HTTPS**: Använd HTTPS i produktion för att kryptera trafiken.

### Bästa praxis

Dessutom följer här några bästa praxis att följa vid implementering av säkerhet i din MCP-strömningsserver:

- Lita aldrig på inkommande förfrågningar utan validering.
- Logga och övervaka all åtkomst och alla fel.
- Uppdatera regelbundet beroenden för att åtgärda säkerhetssårbarheter.

### Utmaningar

Du kommer att möta några utmaningar när du implementerar säkerhet i MCP-strömningsservrar:

- Att balansera säkerhet med enkelhet i utvecklingen
- Säkerställa kompatibilitet med olika klientmiljöer

### Uppgift: Bygg din egen streaming MCP-app

**Scenario:**
Bygg en MCP-server och klient där servern bearbetar en lista med objekt (t.ex. filer eller dokument) och skickar en notifikation för varje bearbetat objekt. Klienten ska visa varje notifikation när den anländer.

**Steg:**

1. Implementera ett serververktyg som bearbetar en lista och skickar notifikationer för varje objekt.
2. Implementera en klient med en meddelandehanterare för att visa notifikationer i realtid.
3. Testa din implementation genom att köra både server och klient, och observera notifikationerna.

[Solution](./solution/README.md)

## Vidare läsning & Vad härnäst?

För att fortsätta din resa med MCP-streaming och utöka din kunskap, tillhandahåller denna sektion ytterligare resurser och förslag på nästa steg för att bygga mer avancerade applikationer.

### Vidare läsning

- [Microsoft: Introduction to HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Vad härnäst?

- Försök bygga mer avancerade MCP-verktyg som använder streaming för realtidsanalys, chatt eller kollaborativ redigering.
- Utforska integrering av MCP-streaming med frontendramverk (React, Vue, etc.) för live UI-uppdateringar.
- Nästa: [Utilising AI Toolkit for VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->