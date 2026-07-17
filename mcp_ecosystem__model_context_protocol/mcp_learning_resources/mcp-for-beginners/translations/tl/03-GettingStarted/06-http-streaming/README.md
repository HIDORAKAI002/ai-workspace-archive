# HTTPS Streaming gamit ang Model Context Protocol (MCP)

Ang kabanatang ito ay nagbibigay ng komprehensibong gabay sa pagpapatupad ng ligtas, scalable, at real-time na streaming gamit ang Model Context Protocol (MCP) gamit ang HTTPS. Tinalakay nito ang motibasyon para sa streaming, ang mga magagamit na mekanismo ng transportasyon, kung paano ipinatupad ang streamable HTTP sa MCP, mga pinakamahusay na kasanayan sa seguridad, paglipat mula sa SSE, at praktikal na gabay para sa paggawa ng sarili mong streaming MCP na mga aplikasyon.

> **Tumingin sa hinaharap:** inilalarawan ng leksyon na ito ang Streamable HTTP sa ilalim ng **MCP Specification 2025-11-25**, kung saan isang session ang naitatag sa panahon ng `initialize` at pinapirmi gamit ang header na `Mcp-Session-Id`. Ang release candidate na `2026-07-28` ay aalisin nang ganap ang handshake at session ID, ginagawang self-contained ang bawat request at maaaring idirekta sa anumang server instance nang walang sticky sessions. Tingnan ang [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) para sa mga detalye.

## Mga Mekanismo ng Transportasyon at Streaming sa MCP

Tinutuklas ng seksyong ito ang iba't ibang mekanismo ng transportasyon na magagamit sa MCP at ang kanilang papel sa pagbibigay-daan sa kakayahan ng streaming para sa real-time na komunikasyon sa pagitan ng mga kliyente at server.

### Ano ang Mekanismo ng Transportasyon?

Ang mekanismo ng transportasyon ay nagtatakda kung paano ipinapadala ang data sa pagitan ng kliyente at server. Sinusuportahan ng MCP ang maraming uri ng transportasyon upang umangkop sa iba't ibang kapaligiran at pangangailangan:

- **stdio**: Standard input/output, angkop para sa lokal at CLI-based na mga tool. Simple ngunit hindi angkop para sa web o cloud.
- **SSE (Server-Sent Events)**: Pinapayagan ng mga server na magpadala ng real-time updates sa mga kliyente gamit ang HTTP. Maganda para sa mga web UI, ngunit limitado ang scalability at flexibility. Simula sa MCP Specification 2025-06-18, ang standalone SSE (Server-Sent Events) transport ay hindi na ginagamit at pinalitan ng "Streamable HTTP" transport.
- **Streamable HTTP**: Modernong HTTP-based streaming transport, sumusuporta sa mga notification at mas mahusay na scalability. Inirerekomenda para sa karamihan ng mga production at cloud na mga senaryo.

### Talahanayan ng Paghahambing

Tingnan ang talahanayan ng paghahambing sa ibaba upang maunawaan ang mga pagkakaiba ng mga mekanismong ito ng transportasyon:

| Transport         | Real-time Updates | Streaming | Scalability | Use Case                |
|-------------------|------------------|-----------|-------------|-------------------------|
| stdio             | Hindi            | Hindi     | Mababa      | Mga lokal na CLI tools   |
| SSE               | Oo               | Oo        | Katamtaman  | Web, real-time updates  |
| Streamable HTTP   | Oo               | Oo        | Mataas      | Cloud, multi-client     |

> **Tip:** Ang pagpili ng tamang transport ay nakakaapekto sa performance, scalability, at karanasan ng gumagamit. Inirerekomenda ang **Streamable HTTP** para sa mga modernong, scalable, at cloud-ready na aplikasyon.

Tandaan ang mga transport na stdio at SSE na ipinakita sa iyo sa mga nakaraang kabanata at kung paano ang streamable HTTP ang transport na tinalakay sa kabanatang ito.

## Streaming: Mga Konsepto at Motibasyon

Mahalaga ang pag-unawa sa mga pangunahing konsepto at motibasyon sa likod ng streaming para sa epektibong pagpapatupad ng mga real-time na sistema ng komunikasyon.

**Streaming** ay isang teknik sa network programming na nagpapahintulot na ipadala at tanggapin ang data sa maliliit, madaling pamahalaang piraso o bilang isang pagkakasunod-sunod ng mga pangyayari, sa halip na maghintay na matapos ang buong tugon. Lalo itong kapaki-pakinabang para sa:

- Malalaking file o dataset.
- Real-time updates (halimbawa, chat, progress bars).
- Mahahabang computation kung saan nais mong panatilihing alam ang gumagamit.

Narito ang dapat mong malaman tungkol sa streaming sa mataas na antas:

- Ang data ay unti-unting ipinapadala, hindi lahat ng sabay.
- Ang kliyente ay maaaring iproseso ang data habang dumarating ito.
- Nakababawas ng perceived latency at nagpapahusay sa karanasan ng gumagamit.

### Bakit gagamit ng streaming?

Ang mga dahilan para gamitin ang streaming ay ang mga sumusunod:

- Nakakatanggap agad ang mga gumagamit ng feedback, hindi lang sa katapusan
- Nagbibigay-daan sa mga real-time na aplikasyon at mga responsive na UI
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

Ipinapakita ng halimbawang ito ang isang server na nagpapadala ng serye ng mga mensahe sa client habang nagiging available ang mga ito, sa halip na maghintay na lahat ng mensahe ay maging handa.

**Paano ito gumagana:**

- Ang server ay nagbibigay (yield) ng bawat mensahe habang ito ay handa na.
- Ang client ay tumatanggap at nagpi-print ng bawat piraso habang dumarating ito.

**Mga Requirements:**

- Ang server ay dapat gumamit ng streaming response (hal., `StreamingResponse` sa FastAPI).
- Ang client ay dapat iproseso ang response bilang stream (`stream=True` sa requests).
- Karaniwang `Content-Type` ay `text/event-stream` o `application/octet-stream`.

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

- Ginagamit ang reactive stack ng Spring Boot gamit ang `Flux` para sa streaming
- Ang `ServerSentEvent` ay nagbibigay ng istrukturadong event streaming na may mga uri ng event
- Ang `WebClient` gamit ang `bodyToFlux()` ay nagpapahintulot ng reactive streaming consumption
- Ang `delayElements()` ay nagsisimula ng processing time sa pagitan ng mga event
- Ang mga event ay maaaring may uri (`info`, `result`) para sa mas magandang paghawak ng client

### Paghahambing: Classic Streaming vs MCP Streaming

Ang mga pagkakaiba sa pagitan ng klasikong paraan ng streaming at kung paano ito gumagana sa MCP ay maaaring ipakita nang ganito:

| Katangian             | Classic HTTP Streaming         | MCP Streaming (Mga Notification)  |
|------------------------|-------------------------------|-----------------------------------|
| Pangunahing tugon      | Pinaghati-hating mga bahagi    | Isa lang, sa dulo                 |
| Mga update sa progreso | Ipinapadala bilang mga bahagi ng data | Ipinadala bilang mga notification  |
| Mga kinakailangan sa client | Dapat iproseso ang stream    | Dapat magpatupad ng message handler |
| Gamit                   | Malalaking file, AI token streams | Progreso, logs, real-time feedback |

### Mga Pangunahing Pagkakaiba na Napansin

Bukod dito, narito ang ilang mga pangunahing pagkakaiba:

- **Pattern ng Komunikasyon:**
  - Classic HTTP streaming: Gumagamit ng simple chunked transfer encoding para magpadala ng data sa mga bahagi
  - MCP streaming: Gumagamit ng istrukturadong notification system gamit ang JSON-RPC protocol

- **Format ng Mensahe:**
  - Classic HTTP: Plain text chunks na may mga newline
  - MCP: Istrakturadong LoggingMessageNotification objects na may metadata

- **Implementasyon ng Client:**
  - Classic HTTP: Simpleng client na nagpoproseso ng mga streaming response
  - MCP: Mas sopistikadong client na may message handler upang iproseso ang iba't ibang uri ng mga mensahe

- **Mga Update sa Progreso:**
  - Classic HTTP: Kasama sa pangunahing stream ng tugon ang progreso
  - MCP: Ang progreso ay ipinapadala sa pamamagitan ng magkakahiwalay na notification messages habang ang pangunahing tugon ay dumarating sa huli

### Mga Rekomendasyon

Mayroon kaming ilang rekomendasyon tungkol sa pagpili sa pagitan ng pagpapatupad ng klasikong streaming (bilang endpoint na ipinakita namin sa itaas gamit ang `/stream`) kumpara sa pagpili ng streaming sa MCP.

- **Para sa simpleng pangangailangan sa streaming:** Mas madali ipatupad ang klasikong HTTP streaming at sapat na para sa mga basic na pangangailangan.

- **Para sa kumplikado, interactive na mga aplikasyon:** Nagbibigay ang MCP streaming ng mas istrukturadong paraan na may mas mayamang metadata at paghihiwalay sa pagitan ng mga notification at panghuling resulta.

- **Para sa mga AI na aplikasyon:** Ang notification system ng MCP ay lalo na kapaki-pakinabang para sa mga mahahabang AI task kung saan nais mo panatilihing alam ang mga gumagamit sa progreso.

## Streaming sa MCP

Ok, kaya nakita mo na ang ilang mga rekomendasyon at paghahambing tungkol sa pagkakaiba ng klasikong streaming at streaming sa MCP. Tingnan natin nang detalyado kung paano mo magagamit ang streaming sa MCP.

Mahalaga ang pag-unawa kung paano gumagana ang streaming sa loob ng MCP framework para makabuo ng mga responsive na aplikasyon na nagbibigay ng real-time na feedback sa mga gumagamit habang tumatakbo ang mga mahahabang operasyon.

Sa MCP, ang streaming ay hindi tungkol sa pagpapadala ng pangunahing tugon nang piraso-piraso, kundi tungkol sa pagpapadala ng **mga notification** sa kliyente habang pinoproseso ng isang tool ang request. Ang mga notification ay maaaring kabilang ang mga update sa progreso, mga log, o iba pang mga event.

### Paano ito gumagana

Ang pangunahing resulta ay ipinapadala pa rin bilang isang tugon na buo. Gayunpaman, ang mga notification ay maaaring ipadala bilang magkakahiwalay na mga mensahe habang pinoproseso ang request at sa gayon ay na-update ang kliyente nang real-time. Kailangang kayang i-handle at ipakita ng kliyente ang mga notification na ito.

## Ano ang Notification?

Sinabi nating "Notification", ano ang ibig sabihin nito sa konteksto ng MCP?

Ang notification ay isang mensaheng ipinapadala mula sa server papunta sa kliyente upang ipaalam ang progreso, status, o iba pang mga pangyayari habang isinasagawa ang isang mahaba at kumplikadong operasyon. Pinapabuti ng mga notification ang transparency at karanasan ng gumagamit.

Halimbawa, ang isang kliyente ay dapat magpadala ng notification kapag nakumpleto na ang paunang handshake sa server.

Ang isang notification ay ganito itsura bilang JSON message:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Ang mga notification ay kabilang sa isang paksa sa MCP na tinatawag na ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Pabatid ng Pag-deprecate:** Ang release candidate ng MCP specification na `2026-07-28` ay nagmamarka sa Logging primitive bilang deprecated pabor sa `stderr` para sa stdio transports at OpenTelemetry para sa structured observability. Nagpapatuloy ang Logging sa `2025-11-25` at sa hindi bababa sa isang taon pagkatapos ng anumang pormal na deprecation. Tingnan ang [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Para gumana ang logging, kailangang payagan ng server ang feature/capability na ito tulad nito:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Depende sa SDK na ginagamit, maaaring naka-enable na ang logging bilang default, o kailangan mo itong i-enable nang hayagan sa iyong server configuration.

May iba't ibang uri ng notification:

| Antas       | Paglalarawan                   | Halimbawa ng Gamit            |
|------------|-------------------------------|------------------------------|
| debug      | Detalyadong impormasyon sa debugging | Mga entry/exit point ng function |
| info       | Pangunahing mga impormasyon   | Mga update sa progreso        |
| notice     | Normal ngunit makabuluhang pangyayari | Pagbabago sa configuration    |
| warning    | Mga kondisyon ng babala       | Paggamit ng deprecated na tampok |
| error      | Mga kondisyon ng error         | Mga pagkabigo sa operasyon    |
| critical   | Kritikal na mga kondisyon      | Mga pagkabigo ng bahagi ng sistema |
| alert      | Kailangang kumilos agad        | Natuklasang korupsyon sa data |
| emergency  | Hindi magamit ang sistema      | Kumpletong pagkasira ng sistema |

## Pagpapatupad ng Mga Notification sa MCP

Para ipatupad ang mga notification sa MCP, kailangang isaayos mo ang parehong server at client upang i-handle ang mga real-time na update. Pinapayagan nito ang iyong aplikasyon na magbigay ng agarang feedback sa mga gumagamit habang isinasagawa ang mahahabang operasyon.

### Sa bahagi ng server: Pagpapadala ng Mga Notification

Magsimula tayo sa bahagi ng server. Sa MCP, nagde-define ka ng mga tool na makakapagpadala ng mga notification habang pinoproseso ang mga request. Ginagamit ng server ang context object (karaniwang `ctx`) para magpadala ng mga mensahe sa client.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Sa naunang halimbawa, ang tool na `process_files` ay nagpapadala ng tatlong notification sa client habang pinoproseso ang bawat file. Ginagamit ang `ctx.info()` method upang magpadala ng mga impormatibong mensahe.

Bukod dito, para payagan ang mga notification, siguraduhin na ang iyong server ay gumagamit ng streaming transport (tulad ng `streamable-http`) at ang iyong client ay may message handler upang iproseso ang mga notification. Ganito mo isinaayos ang server upang gamitin ang `streamable-http` transport:

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

Sa halimbawang ito ng .NET, ang tool na `ProcessFiles` ay may attribute na `Tool` at nagpapadala ng tatlong notification sa client habang pinoproseso ang bawat file. Ginagamit ang `ctx.Info()` method upang magpadala ng mga impormatibong mensahe.

Para payagan ang mga notification sa iyong .NET MCP server, siguraduhin na gumagamit ka ng streaming transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Sa bahagi ng client: Pagtanggap ng Mga Notification

Kailangang magpatupad ang client ng message handler upang iproseso at ipakita ang mga notification habang dumarating ang mga ito.

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

Sa naunang code, sinusuri ng function na `message_handler` kung ang dumarating na mensahe ay isang notification. Kung oo, ipi-print nito ang notification; kung hindi, ipoproseso ito bilang ordinaryong mensahe mula sa server. Pansinin din kung paano ini-initialize ang `ClientSession` gamit ang `message_handler` para pangasiwaan ang mga dumarating na notification.

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

Sa halimbawang ito ng .NET, sinusuri ng function na `MessageHandler` kung ang dumarating na mensahe ay isang notification. Kung oo, ipi-print nito ang notification; kung hindi, ipoproseso ito bilang regular na mensahe mula sa server. Ini-initialize ang `ClientSession` gamit ang message handler sa pamamagitan ng `ClientSessionOptions`.

Para payagan ang mga notification, siguraduhin na ang iyong server ay gumagamit ng streaming transport (tulad ng `streamable-http`) at ang iyong client ay may message handler upang iproseso ang mga notification.

## Mga Progress Notification at mga Senaryo

Ipinaliwanag ng seksyong ito ang konsepto ng progress notifications sa MCP, bakit mahalaga ito, at kung paano ito ipinatupad gamit ang Streamable HTTP. Makakakita ka rin ng isang praktikal na assignment para palalimin ang iyong pag-unawa.

Ang progress notifications ay mga real-time na mensahe na ipinapadala mula sa server papunta sa client habang isinasagawa ang mahahabang operasyon. Sa halip na maghintay na matapos ang buong proseso, pinananatili ng server ang client na updated tungkol sa kasalukuyang status. Pinapahusay nito ang transparency, karanasan ng gumagamit, at nagpapadali ng pag-debug.

**Halimbawa:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Bakit Gamitin ang Progress Notifications?

Mahalaga ang progress notifications para sa ilang mga dahilan:

- **Mas maganda ang karanasan ng gumagamit:** Nakikita ng mga gumagamit ang mga update habang nagpapatuloy ang trabaho, hindi lang sa katapusan.
- **Real-time na feedback:** Puwedeng magpakita ang clients ng progress bars o mga log, na nagpaparamdam na responsive ang app.
- **Mas madali ang pag-debug at pagmamanman:** Nakikita ng mga developer at gumagamit kung saan maaaring mabagal o maipit ang isang proseso.

### Paano Ipatupad ang Progress Notifications

Ganito ang paraan ng pagpapatupad ng progress notifications sa MCP:

- **Sa server:** Gamitin ang `ctx.info()` o `ctx.log()` para magpadala ng notification habang pinoproseso ang bawat item. Nagpapadala ito ng mensahe sa client bago maging handa ang pangunahing resulta.
- **Sa client:** Magpatupad ng message handler na nakikinig at nagpapakita ng mga notification habang dumarating. Nakikilala ng handler na ito ang mga notification mula sa panghuling resulta.

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

Kapag nag-iimplementa ng mga MCP server gamit ang mga HTTP-based na transport, nagiging pangunahing alalahanin ang seguridad na nangangailangan ng maingat na pagtuon sa iba't ibang attack vectors at mga mekanismo ng proteksyon.

### Pangkalahatan

Napakahalaga ng seguridad kapag inilalantad ang mga MCP server sa HTTP. Ang Streamable HTTP ay nagdadala ng mga bagong attack surface at nangangailangan ng maingat na pagsasaayos.

### Mga Pangunahing Punto

- **Pagpapatunay ng Origin Header**: Palaging patunayan ang `Origin` header upang maiwasan ang mga DNS rebinding attacks.
- **Localhost Binding**: Para sa lokal na pagde-develop, ikabit ang mga server sa `localhost` upang hindi ito mailantad sa pampublikong internet.
- **Authentication**: Magpatupad ng authentication (hal., API keys, OAuth) para sa mga production deployment.
- **CORS**: I-configure ang Cross-Origin Resource Sharing (CORS) policies upang limitahan ang access.
- **HTTPS**: Gumamit ng HTTPS sa production upang i-encrypt ang traffic.

### Pinakamahusay na Mga Gawain

- Huwag kailanman magtiwala sa mga papasok na request nang walang pagpapatunay.
- Mag-log at subaybayan ang lahat ng access at mga error.
- Regular na i-update ang mga dependencies upang matakpan ang mga kahinaan sa seguridad.

### Mga Hamon

- Pagbabalanse ng seguridad at kadalian ng pagbuo
- Pagsisiguro ng pagiging compatible sa iba't ibang client environment

## Pag-upgrade mula SSE patungong Streamable HTTP

Para sa mga application na kasalukuyang gumagamit ng Server-Sent Events (SSE), nagbibigay ang paglipat sa Streamable HTTP ng mas pinahusay na kakayahan at mas mahusay na pangmatagalang sustainability para sa iyong mga implementasyon ng MCP.

### Bakit Mag-upgrade?

Mayroong dalawang makatuwirang dahilan para mag-upgrade mula SSE patungong Streamable HTTP:

- Nag-aalok ang Streamable HTTP ng mas mahusay na scalability, compatibility, at mas mayamang suporta sa notification kaysa SSE.
- Ito ang inirerekomendang transport para sa mga bagong MCP application.

### Mga Hakbang sa Migrasyon

Narito kung paano ka makakapag-migrate mula SSE patungong Streamable HTTP sa iyong mga MCP application:

- **I-update ang server code** upang gamitin ang `transport="streamable-http"` sa `mcp.run()`.
- **I-update ang client code** upang gamitin ang `streamablehttp_client` sa halip na SSE client.
- **Mag-implementa ng message handler** sa client upang iproseso ang mga notification.
- **Subukan ang compatibility** sa mga umiiral na tool at workflow.

### Panatilihin ang Compatibility

Inirerekomenda na panatilihin ang compatibility sa mga umiiral na SSE client habang nagmi-migrate. Narito ang ilang mga estratehiya:

- Maaaring suportahan pareho ang SSE at Streamable HTTP sa pamamagitan ng pagpapatakbo ng parehong transport sa magkakaibang endpoints.
- Unti-unting i-migrate ang mga client sa bagong transport.

### Mga Hamon

Siguraduhing matugunan ang mga sumusunod na hamon habang nagmi-migrate:

- Pagsigurong na-update lahat ng client
- Paghawak sa mga pagkakaiba sa paghahatid ng notification

## Mga Pagsasaalang-alang sa Seguridad

Dapat maging pangunahing prayoridad ang seguridad kapag nag-iimplementa ng anumang server, lalo na kapag gumagamit ng HTTP-based na transport gaya ng Streamable HTTP sa MCP. 

Kapag nag-iimplementa ng mga MCP server gamit ang mga HTTP-based na transport, nagiging pangunahing alalahanin ang seguridad na nangangailangan ng maingat na pagtuon sa iba't ibang attack vector at mga mekanismo ng proteksyon.

### Pangkalahatan

Napakahalaga ng seguridad kapag inilalantad ang mga MCP server sa HTTP. Ang Streamable HTTP ay nagdudulot ng mga bagong attack surface at nangangailangan ng maingat na pagsasaayos.

Narito ang ilang mahahalagang pagsasaalang-alang sa seguridad:

- **Pagpapatunay ng Origin Header**: Palaging patunayan ang `Origin` header upang maiwasan ang mga DNS rebinding attacks.
- **Localhost Binding**: Para sa lokal na pagbuo, ikabit ang mga server sa `localhost` upang hindi ito mailantad sa pampublikong internet.
- **Authentication**: Magpatupad ng authentication (hal., API keys, OAuth) para sa mga production deployment.
- **CORS**: I-configure ang Cross-Origin Resource Sharing (CORS) policies upang limitahan ang access.
- **HTTPS**: Gumamit ng HTTPS sa production upang i-encrypt ang traffic.

### Pinakamahusay na Mga Gawain

Bukod pa rito, narito ang ilang pinakamahusay na gawain na dapat sundin kapag nag-iimplementa ng seguridad sa iyong MCP streaming server:

- Huwag kailanman magtiwala sa mga papasok na request nang walang pagpapatunay.
- Mag-log at subaybayan ang lahat ng access at mga error.
- Regular na i-update ang mga dependencies upang matakpan ang mga kahinaan sa seguridad.

### Mga Hamon

Makakaharap ka ng ilang hamon kapag nag-iimplementa ng seguridad sa mga MCP streaming server:

- Pagbabalanse ng seguridad at kadalian ng pagbuo
- Pagsisiguro ng pagiging compatible sa iba't ibang client environment

### Takdang-Aralin: Gumawa ng Iyong Sariling Streaming MCP App

**Senaryo:**
Bumuo ng MCP server at client kung saan pinoproseso ng server ang isang listahan ng mga item (hal., mga file o dokumento) at nagpapadala ng notification para sa bawat na-proseso na item. Ang client ang dapat magpakita ng bawat notification kapag ito ay dumating.

**Mga Hakbang:**

1. Mag-implementa ng server tool na nagpoproseso ng listahan at nagpapadala ng mga notification para sa bawat item.
2. Mag-implementa ng client na may message handler upang ipakita ang mga notification nang real time.
3. Subukan ang iyong implementasyon sa pamamagitan ng pagpapatakbo ng parehong server at client, at obserbahan ang mga notification.

[Solusyon](./solution/README.md)

## Karagdagang Pagbabasa at Anu-ano ang Susunod?

Upang ipagpatuloy ang iyong paglalakbay sa MCP streaming at palawakin ang iyong kaalaman, naglalaman ang seksyong ito ng dagdag na mga mapagkukunan at mga mungkahing hakbang para sa paggawa ng mas advanced na mga application.

### Karagdagang Pagbabasa

- [Microsoft: Panimula sa HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS sa ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Ano ang Susunod?

- Subukang bumuo ng mas advanced na mga MCP tool na gumagamit ng streaming para sa real-time analytics, chat, o kolaboratibong pag-edit.
- Suriin ang pag-integrate ng MCP streaming sa mga frontend framework (React, Vue, atbp.) para sa live na mga update sa UI.
- Susunod: [Paggamit ng AI Toolkit para sa VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->