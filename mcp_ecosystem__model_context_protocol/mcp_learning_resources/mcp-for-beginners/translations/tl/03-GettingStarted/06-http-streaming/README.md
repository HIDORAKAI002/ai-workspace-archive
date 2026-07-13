# HTTPS Streaming gamit ang Model Context Protocol (MCP)

Ang kabanatang ito ay nagbibigay ng komprehensibong gabay sa pagpapatupad ng ligtas, scalable, at real-time na streaming gamit ang Model Context Protocol (MCP) gamit ang HTTPS. Tinatalakay nito ang motibasyon para sa streaming, ang mga available na mekanismo ng transportasyon, kung paano ipatupad ang streamable HTTP sa MCP, mga pinakamahusay na kasanayan sa seguridad, migrasyon mula sa SSE, at praktikal na patnubay para sa paggawa ng sariling streaming MCP na mga aplikasyon.

> **Tumingin sa hinaharap:** inilalarawan ng leksyon na ito ang Streamable HTTP sa ilalim ng **MCP Specification 2025-11-25**, kung saan isang session ang itinatag sa panahon ng `initialize` at naka-pin gamit ang `Mcp-Session-Id` header. Ang release candidate ng `2026-07-28` ay nag-alis ng handshake at session ID nang lubusan, ginagawa ang bawat request na self-contained at maaaring ipadala sa anumang server instance nang walang sticky sessions. Tingnan ang [Ano ang nagbabago sa MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) para sa mga detalye.

## Mga Mekanismo ng Transportasyon at Streaming sa MCP

Sinasaliksik ng seksyong ito ang iba't ibang mekanismo ng transportasyon na available sa MCP at ang kanilang papel sa pagpapagana ng streaming capabilities para sa real-time na komunikasyon sa pagitan ng mga kliyente at server.

### Ano ang Mekanismo ng Transportasyon?

Ang mekanismo ng transportasyon ay tumutukoy kung paano nagpapalitan ng datos ang kliyente at server. Sinusuportahan ng MCP ang maramihang uri ng transport upang makaangkop sa iba't ibang kapaligiran at pangangailangan:

- **stdio**: Standard input/output, angkop para sa lokal at mga CLI-based na tools. Simple ngunit hindi angkop para sa web o cloud.
- **SSE (Server-Sent Events)**: Nagbibigay-daan sa mga server na itulak ang mga real-time na update papunta sa mga kliyente sa HTTP. Maganda para sa mga web UI, ngunit limitado ang scalability at flexibility. Mula sa MCP Specification 2025-06-18, ang standalone na SSE (Server-Sent Events) transport ay na-deprecate at pinalitan ng "Streamable HTTP" transport.
- **Streamable HTTP**: Makabagong HTTP-based streaming transport, sumusuporta sa mga notipikasyon at mas mahusay na scalability. Inirerekomenda para sa karamihan ng production at cloud na mga senaryo.

### Talahanayan ng Paghahambing

Tingnan ang paghahambing sa ibaba upang maunawaan ang pagkakaiba-iba ng mga mekanismo ng transportasyon:

| Transport         | Real-time Updates | Streaming | Scalability | Use Case                |
|-------------------|------------------|-----------|-------------|-------------------------|
| stdio             | Hindi            | Hindi     | Mababa      | Lokal na CLI tools       |
| SSE               | Oo               | Oo        | Katamtaman  | Web, real-time updates  |
| Streamable HTTP   | Oo               | Oo        | Mataas      | Cloud, multi-client     |

> **Tip:** Ang pagpili ng tamang transport ay nakakaapekto sa performance, scalability, at karanasan ng gumagamit. **Streamable HTTP** ang inirerekomenda para sa modernong, scalable, at cloud-ready na mga aplikasyon.

Pansinin ang mga transport na stdio at SSE na ipinakita sa iyo sa nakaraang mga kabanata at kung paano ang streamable HTTP ang transport na tinalakay sa kabanatang ito.

## Streaming: Mga Konsepto at Motibasyon

Mahalaga ang pag-unawa sa mga pundamental na konsepto at motibasyon sa likod ng streaming para sa pagpapatupad ng epektibong real-time na mga sistema ng komunikasyon.

**Streaming** ay isang teknik sa network programming na nagpapahintulot na ipadala at tanggapin ang datos sa maliliit, madaling pamahalaang bahagi o bilang isang serye ng mga kaganapan, sa halip na maghintay na maging handa ang buong tugon. Ito ay lalo na kapaki-pakinabang para sa:

- Malalaking file o dataset.
- Real-time na update (hal., chat, progress bars).
- Mahahabang computation kung saan gusto mong panatilihing naabisuhan ang gumagamit.

Narito ang mga dapat mong malaman tungkol sa streaming sa mataas na antas:

- Ang datos ay ipinapadala nang paunti-unti, hindi sabay-sabay.
- Maaaring iproseso ng kliyente ang datos habang dumarating.
- Binabawasan ang nararanasang latency at pinapabuti ang karanasan ng gumagamit.

### Bakit gumamit ng streaming?

Ang mga dahilan sa paggamit ng streaming ay ang mga sumusunod:

- Nakakakuha agad ng feedback ang mga gumagamit, hindi lang sa dulo
- Nagbibigay-daan sa mga real-time na aplikasyon at responsive na UI
- Mas epektibong paggamit ng network at compute resources

### Simpleng Halimbawa: HTTP Streaming Server at Client

Narito ang isang simpleng halimbawa kung paano maipapatupad ang streaming:

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

Ipinapakita ng halimbawang ito ang server na nagpapadala ng serye ng mga mensahe sa client habang nagiging available ang mga ito, sa halip na maghintay na maging handa ang lahat ng mensahe.

**Paano ito gumagana:**

- Ang server ay nagbibigay ng bawat mensahe habang ito ay handa.
- Tumatanggap at priniprint ng client ang bawat bahagi habang dumarating.

**Mga Kailangan:**

- Dapat gumamit ang server ng streaming response (hal., `StreamingResponse` sa FastAPI).
- Dapat iproseso ng client ang response bilang stream (`stream=True` sa requests).
- Karaniwang Content-Type ay `text/event-stream` o `application/octet-stream`.

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

**Mga Tala sa Implementasyon ng Java:**

- Gumagamit ng reactive stack ng Spring Boot gamit ang `Flux` para sa streaming
- Ang `ServerSentEvent` ay nagbibigay ng structured event streaming na may mga uri ng event
- Pinapayagan ng `WebClient` gamit ang `bodyToFlux()` ang reactive streaming consumption
- Ang `delayElements()` ay nagsisimula ng processing time sa pagitan ng mga event
- Puwedeng may mga uri ang events (`info`, `result`) para sa mas maganda at kontroladong client handling

### Paghahambing: Classic Streaming kumpara sa MCP Streaming

Ang mga pagkakaiba sa pagitan ng klasikong paraan ng streaming at kung paano ito gumagana sa MCP ay maaaring ilarawan nang ganito:

| Tampok                 | Classic HTTP Streaming           | MCP Streaming (Mga Notipikasyon)    |
|------------------------|---------------------------------|-------------------------------------|
| Pangunahing tugon       | Hinati-hati (Chunked)            | Isa lang, sa dulo                    |
| Mga update ng progreso  | Ipinapadala bilang data chunks   | Ipinapadala bilang mga notipikasyon |
| Mga pangangailangan ng client | Dapat iproseso ang stream      | Dapat may message handler            |
| Use case               | Malalaking file, AI token streams| Progreso, logs, real-time feedback   |

### Mga Mahalagang Pagkakaiba na Napuna

Bukod dito, narito ang ilang mahahalagang pagkakaiba:

- **Pattern ng Komunikasyon:**
  - Classic HTTP streaming: Gumagamit ng simpleng chunked transfer encoding para magpadala ng datos sa mga bahagi
  - MCP streaming: Gumagamit ng structured notification system gamit ang JSON-RPC protocol

- **Format ng Mensahe:**
  - Classic HTTP: Plain text chunks na may mga newlines
  - MCP: Structured LoggingMessageNotification objects na may metadata

- **Implementasyon ng Client:**
  - Classic HTTP: Simpleng client na nagpoproseso ng streaming responses
  - MCP: Mas sopistikadong client na may message handler para iproseso ang iba't ibang uri ng mensahe

- **Mga Update ng Progreso:**
  - Classic HTTP: Bahagi ng pangunahing response stream ang progreso
  - MCP: Ang progreso ay ipinapadala sa pamamagitan ng mga hiwalay na notification messages habang ang pangunahing tugon ay dumarating sa dulo

### Mga Rekomendasyon

May ilang bagay na inirerekomenda kapag pumipili sa pagitan ng klasikong streaming implementasyon (bilang isang endpoint na ipinakita sa itaas gamit ang `/stream`) kumpara sa streaming sa MCP.

- **Para sa simpleng mga pangangailangan ng streaming:** Ang klasikong HTTP streaming ay mas simple ipatupad at sapat para sa basic na pangangailangan ng streaming.

- **Para sa kumplikado at interactive na mga aplikasyon:** Nagbibigay ang MCP streaming ng mas structured na paraan na may mas mayamang metadata at paghihiwalay sa pagitan ng mga notification at pangunahing resulta.

- **Para sa mga AI application:** Ang notification system ng MCP ay lalong kapaki-pakinabang para sa mga mahahabang AI tasks kung saan gusto mong abisuhan ang mga gumagamit tungkol sa progreso.

## Streaming sa MCP

Ok, nakita mo na ang ilang mga rekomendasyon at paghahambing tungkol sa pagkakaiba ng klasikong streaming at streaming sa MCP. Tingnan natin nang detalyado kung paano mo magagamit ang streaming sa MCP.

Mahalaga ang pag-unawa kung paano gumagana ang streaming sa loob ng MCP framework para makapagtayo ng mga responsive na aplikasyong nagbibigay ng real-time na feedback sa mga gumagamit habang nagpapatakbo ng mga mahahabang operasyon.

Sa MCP, hindi tungkol sa pagpapadala ng pangunahing tugon ng piraso-piraso ang streaming, kundi tungkol sa pagpapadala ng **mga notipikasyon** sa client habang pinoproseso ng tool ang isang kahilingan. Ang mga notipikasyon ay maaaring maglaman ng mga update sa progreso, logs, o iba pang mga kaganapan.

### Paano ito gumagana

Ang pangunahing resulta ay ipinapadala pa rin bilang isang solong tugon. Gayunpaman, ang mga notipikasyon ay maaring ipadala bilang mga hiwalay na mensahe habang pinoproseso, at sa gayon ay na-update ang client nang real time. Dapat kayang tanggapin at ipakita ng client ang mga notipikasyong ito.

## Ano ang Notipikasyon?

Sinabi nating "Notipikasyon", ano nga ba ang ibig sabihin nito sa konteksto ng MCP?

Ang notipikasyon ay isang mensaheng ipinapadala mula sa server papunta sa client upang ipaalam ang progreso, status, o iba pang mga kaganapan habang nagpapatuloy ang isang mahahabang operasyon. Pinapabuti ng mga notipikasyon ang transparency at karanasan ng gumagamit.

Halimbawa, ang client ay inaasahang magpadala ng notipikasyon kapag naganap na ang paunang handshake sa server.

Ang isang notipikasyon ay ganito ang hitsura bilang isang JSON message:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Ang mga notipikasyon ay kabilang sa isang paksa sa MCP na tinatawag na ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Para gumana ang logging, kailangang paganahin ito ng server bilang isang feature/capability tulad nito:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Depende sa ginamit na SDK, maaaring naka-enable na ang logging bilang default, o kailangan mo itong i-enable nang tahasan sa iyong server configuration.

May iba't ibang uri ng mga notipikasyon:

| Antas      | Paglalarawan                 | Halimbawa ng Use Case          |
|-----------|-------------------------------|------------------------------|
| debug     | Detalyadong impormasyon para sa debugging | Mga entry/exit point ng function  |
| info      | Pangkalahatang mga impormasyon   | Mga update ng progreso sa operasyon |
| notice    | Normal ngunit mahalagang mga kaganapan | Mga pagbabago sa configuration    |
| warning   | Mga kondisyon na nagbababala     | Paggamit ng deprecated na feature    |
| error     | Mga kondisyon ng error         | Pagkabigo sa operasyon          |
| critical  | Kritikal na mga kondisyon       | Pagkabigo ng bahagi ng sistema     |
| alert     | Kailangan agad na aksyon        | Natuklasang pagkasira ng datos   |
| emergency | Hindi na magamit ang sistema    | Kumpletong pagkabigo ng sistema  |

## Pagpapatupad ng Mga Notipikasyon sa MCP

Upang ipatupad ang mga notipikasyon sa MCP, kailangan mong i-set up ang parehong server at client upang maproseso ang real-time na mga update. Pinapayagan nito ang iyong aplikasyon na magbigay ng agarang feedback sa mga gumagamit habang nagpapatakbo ng mahahabang operasyon.

### Panig ng Server: Pagpapadala ng Mga Notipikasyon

Magsimula tayo sa panig ng server. Sa MCP, nagde-define ka ng mga tool na maaaring magpadala ng mga notipikasyon habang pinoproseso ang mga kahilingan. Ginagamit ng server ang context object (karaniwang `ctx`) upang magpadala ng mga mensahe sa client.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Sa naunang halimbawa, ang `process_files` tool ay nagpapadala ng tatlong notipikasyon sa client habang pinoproseso ang bawat file. Ginagamit ang `ctx.info()` method upang magpadala ng mga informational message.

Bilang karagdagan, upang paganahin ang mga notipikasyon, siguraduhin na ang server ay gumagamit ng streaming transport (tulad ng `streamable-http`) at ang client mo ay may message handler upang iproseso ang mga notipikasyon. Narito kung paano mo i-set up ang server upang gamitin ang `streamable-http` transport:

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

Sa halimbawa ng .NET na ito, ang `ProcessFiles` tool ay may dekorasyong `Tool` attribute at nagpapadala ng tatlong notipikasyon sa client habang pinoproseso ang bawat file. Ginagamit ang `ctx.Info()` method upang magpadala ng mga informational message.

Upang paganahin ang mga notipikasyon sa iyong .NET MCP server, siguraduhing gumagamit ka ng streaming transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Panig ng Client: Pagtanggap ng Mga Notipikasyon

Dapat magbigay ang client ng message handler upang iproseso at ipakita ang mga notipikasyon habang dumarating ang mga ito.

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

Sa nakaraang code, sinisiyasat ng `message_handler` function kung ang papasok na mensahe ay isang notipikasyon. Kung oo, ipiniprint nito ang notipikasyon; kung hindi, ipinoproseso ito bilang isang regular na mensahe mula sa server. Tandaan din kung paano ini-initialize ang `ClientSession` gamit ang `message_handler` upang pamahalaan ang mga papasok na notipikasyon.

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

Sa halimbawa ng .NET na ito, sinisiyasat ng `MessageHandler` function kung ang papasok na mensahe ay isang notipikasyon. Kung oo, ipiniprint ang notipikasyon; kung hindi, ipinoproseso ito bilang regular na mensahe mula sa server. Ang `ClientSession` ay ini-initialize gamit ang message handler sa pamamagitan ng `ClientSessionOptions`.

Upang paganahin ang mga notipikasyon, siguraduhin na gumagamit ang iyong server ng streaming transport (tulad ng `streamable-http`) at ang iyong client ay may message handler upang iproseso ang mga notipikasyon.

## Mga Notipikasyon ng Progreso at mga Senaryo

Ipinaliliwanag ng seksyong ito ang konsepto ng progress notifications sa MCP, bakit ito mahalaga, at kung paano ito ipapatupad gamit ang Streamable HTTP. Makikita mo rin dito ang isang praktikal na gawain upang patatagin ang iyong pag-unawa.

Ang progress notifications ay mga real-time na mensahe na ipinapadala mula sa server papunta sa client habang nagpapatuloy ang mahahabang operasyon. Sa halip na maghintay na matapos ang buong proseso, pinananatili ng server ang client na updated tungkol sa kasalukuyang status. Pinapabuti nito ang transparency, karanasan ng gumagamit, at nagpapadali sa pag-debug.

**Halimbawa:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Bakit Gumamit ng Progress Notifications?

Mahalaga ang progress notifications para sa ilang mga dahilan:

- **Mas magandang karanasan ng gumagamit:** Nakikita ng mga gumagamit ang mga update habang nagpapatuloy ang trabaho, hindi lang sa dulo.
- **Real-time na feedback:** Maaaring ipakita ng mga client ang progress bars o logs, kaya ang app ay nagmukhang tumutugon agad.
- **Mas madaling pag-debug at monitoring:** Nakikita ng mga developer at gumagamit kung saan maaaring bumagal o na-stuck ang isang proseso.

### Paano Ipatupad ang Progress Notifications

Narito kung paano mo maaaring ipatupad ang progress notifications sa MCP:

- **Sa server:** Gumamit ng `ctx.info()` o `ctx.log()` upang magpadala ng mga notipikasyon habang pinoproseso ang bawat item. Pinapadala nito ang mensahe sa client bago maging handa ang pangunahing resulta.
- **Sa client:** Magpatupad ng message handler na nakikinig at nagpapakita ng mga notipikasyon habang dumarating. Binibigyang-kahulugan ng handler ang pagkakaiba ng mga notipikasyon at ng panghuling resulta.

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

**Halimbawa ng Client:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Mga Pagsasaalang-alang sa Seguridad

Kapag nagpapatupad ng MCP server gamit ang HTTP-based transports, ang seguridad ay nagiging pinakamahalagang concern na nangangailangan ng maingat na pagtuon sa maraming attack vectors at mekanismo ng proteksyon.

### Pangkalahatang-ideya

Kritikal ang seguridad kapag inilalantad ang mga MCP server sa HTTP. Ang Streamable HTTP ay nagpapakilala ng mga bagong attack surfaces at nangangailangan ng maingat na konfigurasyon.

### Mga Mahalagang Punto


- **Pagpapatunay ng Origin Header**: Laging patunayan ang `Origin` header upang maiwasan ang mga DNS rebinding na pag-atake.
- **Localhost Binding**: Para sa lokal na pag-unlad, itali ang mga server sa `localhost` upang hindi ito mailantad sa pampublikong internet.
- **Authentication**: Magpatupad ng authentication (hal., API keys, OAuth) para sa mga production deployment.
- **CORS**: Isaayos ang mga patakaran ng Cross-Origin Resource Sharing (CORS) upang limitahan ang access.
- **HTTPS**: Gumamit ng HTTPS sa production upang i-encrypt ang trapiko.

### Mga Pinakamahusay na Gawi

- Huwag kailanman magtiwala sa mga papasok na kahilingan nang walang pagpapatunay.
- Mag-log at mag-monitor ng lahat ng access at errors.
- Regular na i-update ang mga dependencies upang i-patch ang mga kahinaan sa seguridad.

### Mga Hamon

- Pagbabalanse ng seguridad at kadalian ng pag-unlad
- Pagtitiyak ng pagiging compatible sa iba't ibang kapaligiran ng kliyente

## Pag-upgrade mula sa SSE patungo sa Streamable HTTP

Para sa mga aplikasyon na kasalukuyang gumagamit ng Server-Sent Events (SSE), ang paglipat sa Streamable HTTP ay nagbibigay ng mas pinahusay na kakayahan at mas matibay na pangmatagalang pagpapanatili para sa iyong mga implementasyon ng MCP.

### Bakit Mag-upgrade?

May dalawang makatuwirang dahilan upang mag-upgrade mula sa SSE patungo sa Streamable HTTP:

- Nagbibigay ang Streamable HTTP ng mas mahusay na scalability, compatibility, at mas mayamang suporta sa notification kumpara sa SSE.
- Ito ang inirerekomendang transport para sa mga bagong aplikasyon ng MCP.

### Mga Hakbang sa Migrasyon

Narito kung paano ka maaaring mag-migrate mula SSE patungo sa Streamable HTTP sa iyong mga aplikasyon ng MCP:

- **I-update ang code ng server** upang gamitin ang `transport="streamable-http"` sa `mcp.run()`.
- **I-update ang code ng client** upang gumamit ng `streamablehttp_client` kapalit ng SSE client.
- **Magpatupad ng message handler** sa client upang iproseso ang mga notipikasyon.
- **Subukan ang compatibility** gamit ang umiiral na mga kasangkapan at workflows.

### Pagpapanatili ng Compatibility

Inirerekomenda na panatilihin ang compatibility sa mga umiiral na SSE clients habang nagmi-migrate. Narito ang ilang mga estratehiya:

- Maaari mong suportahan pareho ang SSE at Streamable HTTP sa pamamagitan ng pagpapatakbo ng parehong transport sa magkaibang endpoint.
- Unti-unting i-migrate ang mga client papunta sa bagong transport.

### Mga Hamon

Tiyaking matutugunan ang mga sumusunod na hamon sa panahon ng migrasyon:

- Pagtiyak na lahat ng mga client ay na-update
- Paghawak ng pagkakaiba sa paghahatid ng mga notipikasyon

## Mga Pagsasaalang-alang sa Seguridad

Ang seguridad ay dapat na pangunahing prayoridad kapag nagpapatupad ng anumang server, lalo na kapag gumagamit ng mga HTTP-based na transport tulad ng Streamable HTTP sa MCP.

Kapag nagpapatupad ng MCP servers gamit ang mga HTTP-based na transport, ang seguridad ay nagiging napakahalagang alalahanin na nangangailangan ng maingat na pansin sa maraming paraan ng pag-atake at mekanismo ng proteksyon.

### Pangkalahatang-ideya

Kritikal ang seguridad kapag inilalantad ang MCP servers sa HTTP. Nagbibigay ang Streamable HTTP ng mga bagong attack surface at nangangailangan ng maingat na konfigurasyon.

Narito ang ilang mahahalagang pagsasaalang-alang sa seguridad:

- **Pagpapatunay ng Origin Header**: Laging patunayan ang `Origin` header upang maiwasan ang mga DNS rebinding na pag-atake.
- **Localhost Binding**: Para sa lokal na pag-unlad, itali ang mga server sa `localhost` upang hindi ito mailantad sa pampublikong internet.
- **Authentication**: Magpatupad ng authentication (hal., API keys, OAuth) para sa mga production deployment.
- **CORS**: Isaayos ang mga patakaran ng Cross-Origin Resource Sharing (CORS) upang limitahan ang access.
- **HTTPS**: Gumamit ng HTTPS sa production upang i-encrypt ang trapiko.

### Mga Pinakamahusay na Gawi

Bukod dito, narito ang ilang mga pinakamahusay na gawi na dapat sundin kapag nagpapatupad ng seguridad sa iyong MCP streaming server:

- Huwag kailanman magtiwala sa mga papasok na kahilingan nang walang pagpapatunay.
- Mag-log at mag-monitor ng lahat ng access at errors.
- Regular na i-update ang mga dependencies upang i-patch ang mga kahinaan sa seguridad.

### Mga Hamon

Makakaharap ka ng ilang mga hamon kapag nagpapatupad ng seguridad sa mga MCP streaming server:

- Pagbabalanse ng seguridad at kadalian ng pag-unlad
- Pagtitiyak ng pagiging compatible sa iba't ibang kapaligiran ng kliyente

### Takdang-Aralin: Gumawa ng Sariling Streaming MCP App

**Senaryo:**
Gumawa ng isang MCP server at client kung saan pinoproseso ng server ang isang listahan ng mga item (hal., mga file o dokumento) at nagpapadala ng notipikasyon para sa bawat item na naproseso. Dapat ipakita ng client ang bawat notipikasyon sa pagdating nito.

**Mga Hakbang:**

1. Magpatupad ng server tool na nagpoproseso ng listahan at nagpapadala ng mga notipikasyon para sa bawat item.
2. Magpatupad ng client na may message handler upang ipakita ang mga notipikasyon sa real time.
3. Subukan ang iyong implementasyon sa pagpapatakbo ng parehong server at client, at obserbahan ang mga notipikasyon.

[Solution](./solution/README.md)

## Karagdagang Pagbasa at Ano ang Susunod?

Para ipagpatuloy ang iyong paglalakbay sa MCP streaming at palawakin ang iyong kaalaman, nagbibigay ang seksyong ito ng karagdagang mga mapagkukunan at mungkahing mga susunod na hakbang para sa paggawa ng mas advanced na mga aplikasyon.

### Karagdagang Pagbasa

- [Microsoft: Introduction to HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Ano ang Susunod?

- Subukang gumawa ng mas advanced na mga tool ng MCP na gumagamit ng streaming para sa real-time analytics, chat, o collaborative editing.
- Suriin ang integrasyon ng MCP streaming sa mga frontend framework (React, Vue, atbp.) para sa live na pag-update ng UI.
- Sunod: [Utilising AI Toolkit for VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->