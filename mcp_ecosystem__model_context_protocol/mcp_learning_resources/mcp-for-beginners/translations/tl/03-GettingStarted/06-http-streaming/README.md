# HTTPS Streaming gamit ang Model Context Protocol (MCP)

Ang kabanatang ito ay nagbibigay ng komprehensibong gabay sa pagpapatupad ng ligtas, scalable, at real-time na streaming gamit ang Model Context Protocol (MCP) gamit ang HTTPS. Tinatalakay nito ang motibasyon para sa streaming, mga available na mekanismo ng transportasyon, kung paano ipatupad ang streamable HTTP sa MCP, mga pinakamahusay na kasanayan sa seguridad, paglipat mula sa SSE, at praktikal na gabay sa pagbuo ng iyong sariling streaming MCP na mga aplikasyon.

## Mga Mekanismo ng Transportasyon at Streaming sa MCP

Tinalakay sa seksyong ito ang iba't ibang mekanismo ng transportasyon na available sa MCP at ang kanilang papel sa pagpapagana ng streaming capabilities para sa real-time na komunikasyon sa pagitan ng mga kliyente at mga server.

### Ano ang isang Mekanismo ng Transportasyon?

Ang mekanismo ng transportasyon ay nagtatakda kung paano palitan ang data sa pagitan ng kliyente at server. Sinusuportahan ng MCP ang maraming uri ng transport upang umangkop sa iba't ibang kapaligiran at pangangailangan:

- **stdio**: Standard input/output, angkop para sa lokal at CLI-based na mga tool. Simple ngunit hindi angkop para sa web o cloud.
- **SSE (Server-Sent Events)**: Pinapayagan ang mga server na magpush ng real-time na mga update sa mga kliyente sa ibabaw ng HTTP. Mabuti para sa mga web UI, ngunit limitado sa scalability at flexibility. Mula sa MCP Specification 2025-06-18, ang standalone na SSE (Server-Sent Events) transport ay deprecate na at pinalitan ng "Streamable HTTP" transport.
- **Streamable HTTP**: Modernong HTTP-based streaming transport, sumusuporta sa mga notifications at higit na scalability. Inirerekomenda para sa karamihan ng mga production at cloud scenarios.

### Talaan ng Paghahambing

Tingnan ang talaang paghahambing sa ibaba para maunawaan ang mga pagkakaiba ng mga mekanismong ito:

| Transport         | Real-time Updates | Streaming | Scalability | Use Case                |
|-------------------|------------------|-----------|-------------|-------------------------|
| stdio             | Hindi            | Hindi     | Mababa      | Lokal na tool sa CLI    |
| SSE               | Oo               | Oo        | Katamtaman  | Web, real-time updates  |
| Streamable HTTP   | Oo               | Oo        | Mataas      | Cloud, multi-client     |

> **Tip:** Ang pagpili ng tamang transport ay nakaapekto sa performance, scalability, at karanasan ng gumagamit. Inirerekomenda ang **Streamable HTTP** para sa modern, scalable, at cloud-ready na mga aplikasyon.

Pansinin ang transports na stdio at SSE na ipinakita sa iyo sa mga nakaraang kabanata at kung paano ang streamable HTTP ang transport na tinalakay sa kabanatang ito.

## Streaming: Mga Konsepto at Motibasyon

Mahalagang maunawaan ang mga pangunahing konsepto at motibasyon sa likod ng streaming upang makapagtayo ng epektibong mga system para sa real-time na komunikasyon.

**Streaming** ay isang teknik sa network programming na nagpapahintulot na ang data ay maipadala at matanggap nang paunti-unti, bilang maliliit na bahagi o bilang isang sekwensya ng mga pangyayari, sa halip na maghintay ng buong tugon bago simulan ang pagtanggap. Ito ay partikular na kapaki-pakinabang para sa:

- Malalaking files o datasets.
- Real-time na mga update (hal., chat, progress bars).
- Mahahabang computation na gusto mong panatilihing updated ang gumagamit.

Narito ang mga mahalagang dapat malaman tungkol sa streaming sa mataas na antas:

- Ang data ay naihahatid nang paunti-unti, hindi lahat nang sabay-sabay.
- Ang kliyente ay maaaring magproseso ng data habang dumadating.
- Binabawasan ang pakiramdam ng latency at pinapahusay ang karanasan ng gumagamit.

### Bakit gumamit ng streaming?

Narito ang mga dahilan para sa paggamit ng streaming:

- Nakakakuha agad ng feedback ang mga gumagamit, hindi lang sa dulo
- Nagpapahintulot ng real-time na aplikasyon at responsive na UI
- Mas epektibong paggamit ng mga network at compute na resources

### Simpleng Halimbawa: HTTP Streaming Server & Client

Narito ang isang simpleng halimbawa kung paano maaaring ipatupad ang streaming:

#### Python

**Server (Python, gamit ang FastAPI at StreamingResponse):**

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

**Client (Python, gamit ang requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Ipinapakita ng halimbawa na ito ang server na nagpapadala ng serye ng mga mensahe sa kliyente habang sila ay nagiging available, sa halip na maghintay hanggang handa na lahat ng mga mensahe.

**Paano ito gumagana:**

- Ang server ay nag-yield ng bawat mensahe habang ito ay handa.
- Natatanggap at naipiprint ng kliyente ang bawat bahagi habang dumarating.

**Mga Kinakailangan:**

- Dapat gamitin ng server ang streaming response (hal., `StreamingResponse` sa FastAPI).
- Dapat iproseso ng kliyente ang tugon bilang stream (`stream=True` sa requests).
- Karaniwan ang Content-Type ay `text/event-stream` o `application/octet-stream`.

#### Java

**Server (Java, gamit ang Spring Boot at Server-Sent Events):**

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

**Client (Java, gamit ang Spring WebFlux WebClient):**

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

**Mga Tala sa Java Implementation:**

- Ginagamit ang Spring Boot reactive stack kasama ang `Flux` para sa streaming
- Ang `ServerSentEvent` ay nagbibigay ng structured event streaming na may mga uri ng event
- Ang `WebClient` na may `bodyToFlux()` ay nagpapahintulot sa reactive streaming consumption
- Ang `delayElements()` ay nagsasaad ng processing time sa pagitan ng mga event
- Maaaring magkaroon ng mga uri (`info`, `result`) ang mga event para sa mas magandang paghawak ng kliyente

### Paghahambing: Classic Streaming kumpara sa MCP Streaming

Ang pagkakaiba sa pagitan ng karaniwang paraan ng streaming at kung paano ito gumagana sa MCP ay maaaring ipakita nang ganito:

| Tampok                 | Classic HTTP Streaming           | MCP Streaming (Mga Notipikasyon)   |
|------------------------|---------------------------------|-----------------------------------|
| Pangunahing tugon      | Chunked                         | Isa lang, sa dulo                 |
| Mga update ng progreso  | Ipinapadala bilang data chunks  | Ipinapadala bilang mga notipikasyon|
| Mga kinakailangan ng kliyente | Kailangang magproseso ng stream | Kailangang magpatupad ng message handler |
| Use case               | Malalaking files, AI token streams | Progreso, logs, real-time na feedback |

### Mahalagang Pagkakaiba na Napansin

Bukod pa rito, narito ang mga pangunahing pagkakaiba:

- **Pattern ng Komunikasyon:**
  - Classic HTTP streaming: Gumagamit ng simple chunked transfer encoding para magpadala ng data nang paunti-unti
  - MCP streaming: Gumagamit ng structured notification system gamit ang JSON-RPC protocol

- **Format ng Mensahe:**
  - Classic HTTP: Plain text chunks na may mga bagong linya
  - MCP: Structured LoggingMessageNotification objects na may metadata

- **Implementasyon ng Kliyente:**
  - Classic HTTP: Simpleng kliyente na nagpoproseso ng streaming responses
  - MCP: Mas sopistikadong kliyente na may message handler para iproseso ang iba't ibang uri ng mensahe

- **Mga Update ng Progreso:**
  - Classic HTTP: Kasama ang progreso sa pangunahing stream ng tugon
  - MCP: Ipinapadala ang progreso sa pamamagitan ng hiwalay na mga notification message habang ang pangunahing tugon ay dumadating sa dulo

### Mga Rekomendasyon

May ilang mga bagay na inirerekomenda namin pagdating sa pagpili sa pagitan ng pagpapalaganap ng klasikong streaming (bilang endpoint na ipinakita namin sa itaas gamit ang `/stream`) laban sa paggamit ng streaming sa MCP.

- **Para sa simpleng pangangailangan sa streaming:** Mas madaling ipatupad at sapat na ang classic HTTP streaming.

- **Para sa mga komplikado at interaktibong aplikasyon:** Nagbibigay ang MCP streaming ng mas istrakturadong paraan na may masamang metadata at paghihiwalay sa pagitan ng mga notipikasyon at panghuling mga resulta.

- **Para sa mga AI na aplikasyon:** Lalo na kapaki-pakinabang ang notification system ng MCP para sa mga mahahabang AI tasks kung saan nais mong panatilihing alam ang mga gumagamit sa progreso.

## Streaming sa MCP

Ok, nakita mo na ang ilang rekomendasyon at paghahambing tungkol sa pagkakaiba ng klasikong streaming at streaming sa MCP. Tingnan natin nang detalyado kung paano mo magagamit ang streaming sa MCP.

Mahalagang maunawaan kung paano gumagana ang streaming sa loob ng MCP framework upang makabuo ng mga responsive na application na nagbibigay ng real-time na feedback sa mga gumagamit habang nagpapatakbo ng mahahabang operasyon.

Sa MCP, ang streaming ay hindi tungkol sa pagpapadala ng pangunahing tugon nang paunti-unti, kundi tungkol sa pagpapadala ng **notifications** sa kliyente habang isang tool ay pinoproseso ang isang kahilingan. Maaaring kabilang ang mga notification sa mga update ng progreso, mga log, o iba pang mga kaganapan.

### Paano ito gumagana

Ang pangunahing resulta ay ipinapadala pa rin bilang isang solong tugon. Gayunpaman, ang mga notification ay maaaring ipadala bilang hiwalay na mga mensahe habang nagpapatuloy ang pagproseso at sa gayon ay nai-update ang kliyente nang real time. Dapat kaya ng kliyente na pangasiwaan at ipakita ang mga notification na ito.

## Ano ang Notification?

Nabanggit namin ang "Notification", ano ba ang ibig sabihin nito sa konteksto ng MCP?

Ang notification ay isang mensahe na ipinapadala mula sa server papuntang kliyente upang ipaalam ang progreso, status, o iba pang mga kaganapan habang nagpapatakbo ng mahahabang operasyon. Pinapabuti ng mga notification ang transparency at karanasan ng gumagamit.

Halimbawa, dapat magpadala ang kliyente ng notification kapag nagawa na ang unang handshake sa server.

Ganito ang hitsura ng notification bilang isang JSON na mensahe:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Ang mga notification ay kabilang sa isang paksa sa MCP na tinutukoy bilang ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Para gumana ang logging, kailangan i-enable ng server ito bilang feature/capability nang ganito:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Depende sa SDK na ginagamit, maaaring naka-enable na ang logging bilang default, o maaaring kailanganin mo itong i-enable nang tahasan sa iyong server configuration.

May iba't ibang uri ng notification:

| Antas     | Paglalarawan                   | Halimbawa ng Paggamit          |
|-----------|-------------------------------|-------------------------------|
| debug     | Detalyadong impormasyon sa pagddebug | Entry/exit points ng function    |
| info      | Pangkalahatang impormasyong mensahe | Mga update sa progreso          |
| notice    | Normal ngunit mahalagang mga kaganapan | Mga pagbabago sa configuration  |
| warning   | Mga kundisyon ng babala        | Paggamit ng deprecated na feature |
| error     | Mga kondisyong error           | Pagkabigo sa operasyon          |
| critical  | Kritikal na kundisyon          | Pagkabigo ng bahagi ng sistema   |
| alert     | Agarang aksyon ang kinakailangan | Nadiskubreng corruption ng data |
| emergency | Hindi na magamit ang sistema    | Kumpletong pagkabigo ng sistema  |

## Pagpapatupad ng Mga Notification sa MCP

Para magpatupad ng notifications sa MCP, kailangan mong i-set up ang parehong server at kliyente upang mahawakan ang real-time na mga update. Pinapayagan nito ang iyong aplikasyon na magbigay ng agarang feedback sa mga gumagamit habang nagpapatakbo ng mahahabang operasyon.

### Server-side: Pagpapadala ng Notification

Magsimula tayo sa server side. Sa MCP, nagdedeklara ka ng mga tool na maaaring magpadala ng mga notification habang pinoproseso ang mga kahilingan. Ginagamit ng server ang context object (karaniwan ay `ctx`) upang magpadala ng mga mensahe sa kliyente.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Sa naunang halimbawa, ang `process_files` tool ay nagpadala ng tatlong notification sa kliyente habang pinoproseso ang bawat file. Ginagamit ang `ctx.info()` method para magpadala ng mga impormasyong mensahe.

Dagdag pa rito, upang paganahin ang notifications, siguraduhing ang iyong server ay gumagamit ng streaming transport (tulad ng `streamable-http`) at ang kliyente ay nagpapatupad ng isang message handler para iproseso ang mga notification. Ganito mo ise-set up ang server para gamitin ang `streamable-http` transport:

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

Sa .NET na halimbawang ito, ang `ProcessFiles` tool ay pinalamutian ng `Tool` attribute at nagpadala ng tatlong notification sa kliyente habang pinoproseso ang bawat file. Ginagamit ang `ctx.Info()` method para magpadala ng mga impormasyong mensahe.

Para paganahin ang notifications sa iyong .NET MCP server, siguraduhing gumagamit ka ng streaming transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Client-side: Pagtanggap ng Notification

Dapat magpatupad ang kliyente ng message handler upang iproseso at ipakita ang mga notification habang dumarating.

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

Sa naunang code, sinusuri ng `message_handler` function kung ang papasok na mensahe ay isang notification. Kapag oo, ini-print nito ang notification; kung hindi, ipoproseso ito bilang regular na mensahe mula sa server. Pansinin din kung paano ini-initialize ang `ClientSession` gamit ang `message_handler` upang hawakan ang papasok na mga notification.

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

Sa .NET na halimbawang ito, sinusuri ng `MessageHandler` function kung ang papasok na mensahe ay isang notification. Kapag oo, ini-print nito ang notification; kung hindi, ipoproseso ito bilang regular na mensahe mula sa server. Ini-initialize ang `ClientSession` gamit ang message handler sa pamamagitan ng `ClientSessionOptions`.

Para paganahin ang notifications, siguraduhing gumagamit ang iyong server ng streaming transport (tulad ng `streamable-http`) at nagpapatupad ang iyong kliyente ng message handler para iproseso ang mga notification.

## Mga Notification ng Progreso at Mga Senaryo

Ipinaliwanag sa seksyong ito ang konsepto ng progress notifications sa MCP, bakit ito mahalaga, at kung paano ito ipatupad gamit ang Streamable HTTP. Makakakita ka rin ng praktikal na gawain upang lalong maunawaan ito.

Ang progress notifications ay mga real-time na mensahe na ipinapadala mula sa server papuntang kliyente habang nagpapatuloy ang mahahabang operasyon. Sa halip na maghintay na matapos ang buong proseso, patuloy na ina-update ng server ang kliyente tungkol sa kasalukuyang estado. Pinapabuti nito ang transparency, karanasan ng gumagamit, at nagpapadali ng pag-debug.

**Halimbawa:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Bakit Gamitin ang Progress Notifications?

Napakahalaga ng progress notifications dahil sa mga sumusunod:

- **Mas mahusay na karanasan ng gumagamit:** Nakikita ng mga gumagamit ang mga update habang nagpapatuloy ang trabaho, hindi lang sa huli.
- **Real-time na feedback:** Maaaring magpakita ang mga kliyente ng progress bar o logs, kaya mas responsive ang app.
- **Mas madaling pag-debug at pagmamanman:** Nakikita ng mga developer at gumagamit kung saan nahihinto o bumagal ang proseso.

### Paano Ipatupad ang Progress Notifications

Ganito mo maaaring ipatupad ang progress notifications sa MCP:

- **Sa server:** Gamitin ang `ctx.info()` o `ctx.log()` para magpadala ng mga notification sa tuwing may naiprosesong item. Pinapadala ito bago ang pangunahing resulta ay handa pa.
- **Sa kliyente:** Magpatupad ng message handler na nakikinig at nagpapakita ng mga notification habang dumarating. Nakikilala ng handler ang pagitan ng notifications at panghuling resulta.

**Halimbawa ng Server:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Halimbawa ng Kliyente:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Mga Pagsasaalang-alang sa Seguridad

Kapag nagpapatupad ng MCP servers gamit ang mga HTTP-based na transport, nagiging napakahalaga ang seguridad na nangangailangan ng maingat na pagtutok sa iba't ibang attack vectors at mga mekanismo ng proteksyon.

### Pangkalahatang Tanaw

Mahalaga ang seguridad kapag inilalantad ang MCP servers sa HTTP. Nagdadala ang Streamable HTTP ng mga bagong butas na posibleng pagsamantalahan kaya kailangan ng maingat na konfigurasyon.

### Mga Pangunahing Punto

- **Pag-validate ng Origin Header**: Palaging i-validate ang `Origin` header upang maiwasan ang DNS rebinding attacks.
- **Localhost Binding**: Para sa lokal na pag-unlad, i-bind ang mga server sa `localhost` upang hindi ito maging bukas sa publiko.
- **Authentication**: Ipatupad ang authentication (hal., API keys, OAuth) para sa production deployment.
- **CORS**: I-configure ang Cross-Origin Resource Sharing (CORS) policies upang limitahan ang access.
- **HTTPS**: Gumamit ng HTTPS sa production upang i-encrypt ang trapiko.

### Mga Pinakamahuhusay na Praktis

- Huwag kailanman pagkatiwalaan ang mga papasok na kahilingan nang walang validation.
- Mag-log at mag-monitor ng lahat ng access at errors.
- Regular na i-update ang dependencies upang ma-patch ang mga security vulnerabilities.

### Mga Hamon
- Pagtutugma ng seguridad at kadalian sa pag-develop
- Pagtitiyak ng pagiging compatible sa iba't ibang client na kapaligiran

## Pag-upgrade mula SSE papuntang Streamable HTTP

Para sa mga aplikasyon na kasalukuyang gumagamit ng Server-Sent Events (SSE), ang paglipat sa Streamable HTTP ay nagbibigay ng mas pinahusay na kakayahan at mas maayos na pangmatagalang pagpapanatili para sa iyong mga MCP na implementasyon.

### Bakit Mag-upgrade?

May dalawang malakas na dahilan para mag-upgrade mula SSE papuntang Streamable HTTP:

- Nag-aalok ang Streamable HTTP ng mas mahusay na scalability, compatibility, at mas mayamang suporta para sa mga notification kaysa sa SSE.
- Ito ang inirerekomendang transport para sa mga bagong MCP na aplikasyon.

### Mga Hakbang sa Pag-migrate

Narito kung paano ka makakapag-migrate mula SSE papuntang Streamable HTTP sa iyong mga MCP na aplikasyon:

- **I-update ang server code** para gamitin ang `transport="streamable-http"` sa `mcp.run()`.
- **I-update ang client code** para gamitin ang `streamablehttp_client` imbes na SSE client.
- **Mag-implement ng message handler** sa client upang iproseso ang mga notifications.
- **Subukan ang compatibility** gamit ang mga umiiral na tools at workflows.

### Pagpapanatili ng Compatibility

Inirerekomenda na panatilihin ang compatibility sa umiiral na mga SSE client habang nagpapatuloy ang pag-migrate. Narito ang ilang mga estratehiya:

- Maaari mong suportahan ang parehong SSE at Streamable HTTP sa pamamagitan ng pagpapatakbo ng parehong transport sa magkahiwalay na mga endpoint.
- Unti-unting ilipat ang mga client sa bagong transport.

### Mga Hamon

Siguraduhing matugunan ang mga sumusunod na hamon sa panahon ng pag-migrate:

- Pagtitiyak na updated lahat ng client
- Pag-handle sa mga pagkakaiba sa pagde-deliver ng notification

## Mga Pagsasaalang-alang sa Seguridad

Dapat maging pangunahing prayoridad ang seguridad kapag nag-iimplementa ng anumang server, lalo na kung gumagamit ng mga HTTP-based na transport gaya ng Streamable HTTP sa MCP.

Sa pag-implementa ng mga MCP server gamit ang HTTP-based na transport, nagiging napakahalaga ang seguridad na nangangailangan ng maingat na pagtuon sa iba't ibang paraan ng pag-atake at mga mekanismo ng proteksyon.

### Pangkalahatang-ideya

Mahalaga ang seguridad kapag nag-e-expose ng mga MCP server sa ibabaw ng HTTP. Nagpapakilala ang Streamable HTTP ng mga bagong attack surface at nangangailangan ng maingat na configuration.

Narito ang mga pangunahing pagsasaalang-alang sa seguridad:

- **Pag-validate ng Origin Header**: Laging i-validate ang `Origin` header upang pigilan ang mga DNS rebinding attack.
- **Localhost Binding**: Para sa local development, i-bind ang mga server sa `localhost` upang maiwasang ma-expose sa public internet.
- **Authentication**: Mag-implement ng authentication (hal., API keys, OAuth) para sa mga production deployment.
- **CORS**: I-configure ang mga patakaran ng Cross-Origin Resource Sharing (CORS) upang limitahan ang access.
- **HTTPS**: Gumamit ng HTTPS sa production upang i-encrypt ang traffic.

### Mga Pinakamahusay na Praktis

Bukod dito, narito ang ilang pinakamahusay na praktis sa pag-implementa ng seguridad sa iyong MCP streaming server:

- Huwag kailanman pagkatiwalaan ang mga papasok na request nang walang validation.
- I-log at i-monitor ang lahat ng access at error.
- Regular na i-update ang mga dependencies para mapatch ang mga kahinaan sa seguridad.

### Mga Hamon

Makakaharap ka ng ilang hamon sa pag-implementa ng seguridad sa mga MCP streaming server:

- Pagtutugma ng seguridad at kadalian sa pag-develop
- Pagtitiyak ng compatibility sa iba't ibang client na kapaligiran

### Takdang-Aralin: Gumawa ng Sariling Streaming MCP App

**Sitwasyon:**
Gumawa ng MCP server at client kung saan ang server ay nagpo-proseso ng listahan ng mga item (hal., mga file o dokumento) at nagpapadala ng notification para sa bawat naprosesong item. Dapat ipakita ng client ang bawat notification habang dumarating ito.

**Mga Hakbang:**

1. Mag-implement ng tool para sa server na nagpo-proseso ng listahan at nagpapadala ng mga notification para sa bawat item.
2. Mag-implement ng client na may message handler upang ipakita ang mga notification nang real time.
3. Subukan ang iyong implementasyon sa pamamagitan ng pagpapatakbo ng parehong server at client, at obserbahan ang mga notification.

[Solution](./solution/README.md)

## Karagdagang Babasahin at Ano ang Susunod?

Upang ipagpatuloy ang iyong paglalakbay sa MCP streaming at palawakin ang iyong kaalaman, nagbibigay ang seksyong ito ng mga karagdagang mapagkukunan at mungkahing mga susunod na hakbang para sa paggawa ng mas advanced na mga aplikasyon.

### Karagdagang Babasahin

- [Microsoft: Introduction to HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Ano ang Susunod?

- Subukang gumawa ng mas advanced na mga MCP tool na gumagamit ng streaming para sa real-time analytics, chat, o collaborative editing.
- Suriin ang pagsasama ng MCP streaming sa mga frontend framework (React, Vue, atbp.) para sa mga live na UI update.
- Susunod: [Utilising AI Toolkit for VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->