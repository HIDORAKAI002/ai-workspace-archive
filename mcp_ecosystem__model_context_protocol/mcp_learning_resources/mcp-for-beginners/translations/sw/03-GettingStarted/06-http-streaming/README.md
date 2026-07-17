# Uenezaji wa HTTPS na Itifaki ya Muktadha wa Mfano (MCP)

Sura hii inatoa mwongozo kamili wa kutekeleza uenezaji salama, unaoweza kupanuka, na wa wakati halisi kwa kutumia Itifaki ya Muktadha wa Mfano (MCP) kwa kutumia HTTPS. Inajumuisha motisha ya uenezaji, mifumo ya usafirishaji inayopatikana, jinsi ya kutekeleza HTTP inayoweza kuenezwa katika MCP, mbinu bora za usalama, uhamisho kutoka SSE, na mwongozo wa vitendo wa kubuni programu zako za uenezaji MCP.

> **Kuangalia mbele:** somo hili linaelezea HTTP Inayoweza Kuenezwa chini ya **Sifa ya MCP 2025-11-25**, ambapo kikao kinaanzishwa wakati wa `initialize` na kudumishwa na kichwa cha `Mcp-Session-Id`. Mwandiko wa kuachiliwa `2026-07-28` unafuta kabisa makubaliano na kitambulisho cha kikao, kufanya kila ombi kuwa huru na linaloweza kupangwa kwa mfano wowote wa seva bila vikao vya kubana. Tazama [Mabadiliko katika MCP: Mwandiko wa Kawaida wa Toleo la 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) kwa maelezo zaidi.

## Mifumo ya Usafirishaji na Uenezaji katika MCP

Sehemu hii inachunguza mifumo tofauti ya usafirishaji inayopatikana katika MCP na jukumu lao katika kuwezesha uwezo wa uenezaji kwa mawasiliano ya wakati halisi kati ya wateja na seva.

### Nini ni Mfumo wa Usafirishaji?

Mfumo wa usafirishaji huainisha jinsi data inavyobadilishana kati ya mteja na seva. MCP inaunga mkono aina nyingi za usafirishaji ili kufaa mazingira na mahitaji tofauti:

- **stdio**: Ingizo / Matokeo ya kawaida, inafaa kwa zana za ndani na za CLI. Rahisi lakini haitafaa kwa wavuti au mawingu.
- **SSE (Tukio la Seva kuwatumia Wateja)**: Inaruhusu seva kusukuma masasisho ya wakati halisi kwa wateja kupitia HTTP. Nzuri kwa UI za wavuti, lakini ina mipaka katika upanuzi na kubadilika. Tangu MCP Sifa ya 2025-06-18, usafirishaji wa SSE pekee umeondolewa na kuchukuliwa badala yake na usafirishaji wa "HTTP Inayoweza Kuenezwa".
- **HTTP Inayoweza Kuenezwa**: Usafirishaji wa kisasa wa uenezaji wa msingi wa HTTP, unaounga mkono arifa na upanuzi bora. Inapendekezwa kwa hali nyingi za uzalishaji na mawingu.

### Jedwali la Ulinganisho

Tazama jedwali la kulinganisha hapa chini ili kuelewa tofauti kati ya mifumo ya usafirishaji:

| Usafirishaji     | Masasisho ya Wakati Halisi | Uenezaji | Upanuzi | Matumizi                   |
|------------------|----------------------------|----------|---------|---------------------------|
| stdio            | Hapana                     | Hapana   | Chini   | Zana za ndani za CLI       |
| SSE              | Ndiyo                      | Ndiyo    | Kati    | Wavuti, masasisho ya wakati halisi |
| HTTP Inayoweza Kuenezwa | Ndiyo              | Ndiyo    | Juu     | Mawingu, wateja wengi     |

> **Kidokezo:** Kuchagua usafirishaji sahihi kunaathiri utendaji, upanuzi, na uzoefu wa mtumiaji. **HTTP Inayoweza Kuenezwa** inapendekezwa kwa programu za kisasa, zinazopanuka, na zinazotegemewa na mawingu.

Chukua kumbukumbu ya usafirishaji stdio na SSE uliyoonyeshwa katika sura zilizopita na jinsi HTTP inayoweza kuenezwa ndiyo usafirishaji unaojadiliwa katika sura hii.

## Uenezaji: Dhana na Motisha

Kuelewa dhana za msingi na motisha nyuma ya uenezaji ni muhimu kwa kutekeleza mifumo bora ya mawasiliano ya wakati halisi.

**Uenezaji** ni mbinu katika programu za mtandao inayoruhusu data kutumwa na kupokelewa kwa vipande vidogo, vinavyoweza kudhibitiwa au kama mlolongo wa matukio, badala ya kusubiri jibu lote liwe tayari. Hii ni muhimu hasa kwa:

- Faili kubwa au seti za data.
- Masasisho ya wakati halisi (km, mazungumzo, upau wa maendeleo).
- Maendeleo ya mahesabu marefu ambapo unataka kumjulisha mtumiaji.

Hapa kuna unachohitaji kujua kuhusu uenezaji kwa kiwango cha juu:

- Data hutumwa hatua kwa hatua, si zote kwa wakati mmoja.
- Mteja anaweza kuchakata data anapopokea.
- Kupunguza ucheleweshaji unaoonekana na kuboresha uzoefu wa mtumiaji.

### Kwa Nini Kutumie Uenezaji?

Sababu za kutumia uenezaji ni zifuatazo:

- Watumiaji wanapata maoni mara moja, si mwisho tu
- Inaiwezesha programu za wakati halisi na UI zinazojibu
- Matumizi bora ya rasilimali za mtandao na kompyuta

### Mfano Rahisi: Seva na Mteja wa Uenezaji wa HTTP

Hapa kuna mfano rahisi wa jinsi uenezaji unavyoweza kutekelezwa:

#### Python

**Seva (Python, kutumia FastAPI na StreamingResponse):**

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

**Mteja (Python, kutumia requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Mfano huu unaonyesha seva ikituma mfululizo wa ujumbe kwa mteja anapopatikana, badala ya kusubiri ujumbe wote uwe tayari.

**Jinsi inavyofanya kazi:**

- Seva hutoa kila ujumbe anapokuwa tayari.
- Mteja anapokea na kuchapisha kila kipande anapopokea.

**Mahitaji:**

- Seva lazima itumie jibu la uenezaji (km, `StreamingResponse` katika FastAPI).
- Mteja lazima achakatize jibu kama mtiririko (`stream=True` katika requests).
- Aina ya maudhui kawaida ni `text/event-stream` au `application/octet-stream`.

#### Java

**Seva (Java, kutumia Spring Boot na Server-Sent Events):**

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

**Mteja (Java, kutumia Spring WebFlux WebClient):**

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

**Maelezo ya Utekelezaji wa Java:**

- Inatumia stack ya Spring Boot ya kisukumo na `Flux` kwa uenezaji
- `ServerSentEvent` hutoa mtiririko wa tukio ulio na muundo na aina za matukio
- `WebClient` na `bodyToFlux()` inaruhusu matumizi ya uenezaji wa kisukumo
- `delayElements()` huiga muda wa usindikaji kati ya matukio
- Matukio yanaweza kuwa na aina (`info`, `result`) kwa usimamizi bora wa mteja

### Ulinganisho: Uenezaji wa Klasiki dhidi ya Uenezaji wa MCP

Tofauti kati ya jinsi uenezaji unavyofanya kazi kwa njia ya "klasiki" dhidi ya MCP zinaweza kuonyeshwa hivi:

| Kipengele               | Uenezaji wa HTTP Klasiki       | Uenezaji wa MCP (Arifa)           |
|-----------------------|-------------------------------|----------------------------------|
| Jibu kuu               | Kwa vipande (Chunked)          | Moja, mwishoni                   |
| Masasisho ya maendeleo | Hutumwa kama vipande vya data  | Hutumwa kama arifa                |
| Mahitaji ya mteja      | Lazima achakatize mtiririko    | Lazima aweke kirejeshi cha ujumbe|
| Matumizi               | Faili kubwa, mfululizo wa token za AI | Maendeleo, kumbukumbu, mrejesho wa wakati halisi |

### Tofauti Muhimu Zilizobainika

Zaidi ya hayo, hapa kuna tofauti muhimu:

- **Mfumo wa Mawasiliano:**
  - Uenezaji wa HTTP wa Klasiki: Hutumia usafirishaji wa vipande rahisi kutuma data kwa vipande
  - Uenezaji wa MCP: Hutumia mfumo wa arifa ulio na muundo na itifaki ya JSON-RPC

- **Muundo wa Ujumbe:**
  - HTTP wa Klasiki: Vipande vya maandishi mepesi na mistari mipya
  - MCP: Vitu vya LoggingMessageNotification vilivyo na metadata

- **Utekelezaji wa Mteja:**
  - HTTP wa Klasiki: Mteja rahisi anayeuchakata mtiririko wa majibu
  - MCP: Mteja mgumu zaidi mwenye kirejeshi cha ujumbe kuchakata aina tofauti za ujumbe

- **Masasisho ya Maendeleo:**
  - HTTP wa Klasiki: Maendeleo ni sehemu ya mtiririko kuu wa jibu
  - MCP: Maendeleo hutumwa kupitia ujumbe wa arifa tofauti wakati jibu kuu linakuja mwishoni

### Mapendekezo

Kuna baadhi ya mambo tunayopendekeza wakati wa kuchagua kati ya kutekeleza uenezaji wa klasiki (kama tulivyoonyesha hapo juu kwa kutumia `/stream`) dhidi ya kuchagua uenezaji kupitia MCP.

- **Kwa mahitaji rahisi ya uenezaji:** Uenezaji wa HTTP wa klasiki ni rahisi kutekeleza na unatosha kwa mahitaji ya msingi ya uenezaji.

- **Kwa programu ngumu, zinazoingiliana:** Uenezaji wa MCP hutoa njia yenye muundo zaidi na metadata tajiri na utofauti kati ya arifa na matokeo ya mwisho.

- **Kwa programu za AI:** Mfumo wa arifa wa MCP ni wa maana hasa kwa kazi za AI zenye urefu mrefu ambapo unataka kuwajulisha watumiaji kuhusu maendeleo.

## Uenezaji katika MCP

Vizuri, umeona baadhi ya mapendekezo na ulinganisho hadi sasa juu ya tofauti kati ya uenezaji wa klasiki na uenezaji katika MCP. Hebu tukagange kwa undani jinsi unaweza kutumia uenezaji katika MCP.

Kuelewa jinsi uenezaji unavyofanya kazi ndani ya mfumo wa MCP ni muhimu kwa kujenga programu zinazojibu ambazo hutoa mrejesho wa wakati halisi kwa watumiaji wakati wa shughuli za muda mrefu.

Katika MCP, uenezaji sio kuhusu kutuma jibu kuu kwa vipande, bali kuhusu kutuma **arifa** kwa mteja wakati zana inasindika ombi. Arifa hizi zinaweza kujumuisha masasisho ya maendeleo, kumbukumbu, au matukio mengine.

### Jinsi inavyofanya kazi

Matokeo kuu bado hutumwa kama jibu moja. Hata hivyo, arifa zinaweza kutumwa kama ujumbe tofauti wakati wa usindikaji na hivyo kusasisha mteja kwa wakati halisi. Mteja lazima aweze kushughulikia na kuonyesha arifa hizi.

## Nini ni Arifa?

Tumesema "Arifa", inamaanisha nini katika muktadha wa MCP?

Arifa ni ujumbe unaotumwa kutoka seva kwenda kwa mteja ili kumjulisha kuhusu maendeleo, hali, au matukio mengine wakati wa operesheni za muda mrefu. Arifa huchangia uwazi na uzoefu mzuri wa mtumiaji.

Kwa mfano, mteja anatakiwa kutuma arifa mara moja baada ya mkutano wa awali na seva kufanywa.

Arifa inaonekana hivi kama ujumbe wa JSON:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Arifa zinahusiana na mada katika MCP inayoitwa ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Kitangazo cha Kuachishwa:** mwandiko wa toleo la MCP la `2026-07-28` unaonyesha kwamba kipengele cha Logging kitakatwe na badala yake kutumike `stderr` kwa usafirishaji wa stdio na OpenTelemetry kwa ufuatiliaji wa muundo. Logging itaendelea kufanya kazi katika `2025-11-25` na kwa angalau mwaka mmoja baada ya kuachishwa rasmi. Tazama [Mabadiliko katika MCP: Mwandiko wa Kawaida wa Toleo la 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Ili kufanya logging ifanye kazi, seva inahitaji kuiwezesha kama kipengele / uwezo kama ifuatavyo:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Kulingana na SDK inayotumika, logging inaweza kuwa imewezeshwa kwa default, au unaweza kuhitaji kuiwezesha kwa uwazi katika usanidi wa seva yako.

Kuna aina tofauti za arifa:

| Ngazi       | Maelezo                      | Mfano wa Matumizi             |
|------------|------------------------------|------------------------------|
| debug      | Maelezo ya kina ya ugunduzi   | Mipaka ya kuingilia/kutoka kwa vipengele vya kazi |
| info       | Ujumbe wa taarifa za jumla    | Masasisho ya maendeleo ya operesheni |
| notice     | Matukio ya kawaida lakini muhimu | Mabadiliko ya usanidi         |
| warning    | Hali za onyo                  | Matumizi ya kipengele kilichokatwa |
| error      | Hali za makosa                | Kushindwa kwa operesheni      |
| critical   | Hali za dharura               | Kushindwa kwa sehemu ya mfumo|
| alert      | Hatua lazima zichukuliwe mara moja | Uharibifu wa data uligunduliwa |
| emergency  | Mfumo hauwezi kutumika        | Kushindwa kamili kwa mfumo   |

## Kutekeleza Arifa katika MCP

Kutekeleza arifa katika MCP, unahitaji kuandaa pande za seva na mteja kushughulikia masasisho ya wakati halisi. Hii inaruhusu programu yako kutoa mrejesho wa papo hapo kwa watumiaji wakati wa operesheni za muda mrefu.

### Seva: Kutuma Arifa

Tuanze na upande wa seva. Katika MCP, unaelezea zana zinazoweza kutuma arifa wakati wa kusindika maombi. Seva inatumia kitu cha muktadha (kawaida `ctx`) kutuma ujumbe kwa mteja.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Katika mfano uliotangulia, zana `process_files` inatuma arifa tatu kwa mteja anaposhughulikia kila faili. Mbinu `ctx.info()` hutumika kutuma ujumbe wa taarifa.

Zaidi ya hayo, ili kuwezesha arifa, hakikisha seva yako inatumia usafirishaji wa uenezaji (kama `streamable-http`) na mteja wako anatekeleza kirejeshi cha ujumbe kushughulikia arifa. Hivi ndivyo unavyoweza kuandaa seva kutumia usafirishaji wa `streamable-http`:

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

Katika mfano huu wa .NET, zana `ProcessFiles` imepambwa na sifa `Tool` na inatuma arifa tatu kwa mteja anaposhughulikia kila faili. Mbinu `ctx.Info()` hutumika kutuma ujumbe wa taarifa.

Ili kuwezesha arifa katika seva yako ya MCP ya .NET, hakikisha unatumia usafirishaji wa uenezaji:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Mteja: Kupokea Arifa

Mteja lazima aweke kirejeshi cha ujumbe kushughulikia na kuonyesha arifa anapopokea.

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

Katika msimbo uliotangulia, kazi `message_handler` inakagua ikiwa ujumbe unaokuja ni arifa. Ikiwa ni hivyo, inaichapisha; vinginevyo, inachakata kama ujumbe wa kawaida kutoka seva. Pia kumbuka jinsi `ClientSession` ilivyoanzishwa na `message_handler` kushughulikia arifa zinazokuja.

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

Katika mfano huu wa .NET, kazi `MessageHandler` inakagua ikiwa ujumbe unaokuja ni arifa. Ikiwa ni hivyo, inaichapisha; vinginevyo, inachakata kama ujumbe wa kawaida kutoka seva. `ClientSession` inaanzishwa na kirejeshi cha ujumbe kupitia `ClientSessionOptions`.

Ili kuwezesha arifa, hakikisha seva yako inatumia usafirishaji wa uenezaji (kama `streamable-http`) na mteja wako anaweka kirejeshi cha ujumbe kushughulikia arifa.

## Arifa za Maendeleo & Hali za Matumizi

Sehemu hii inaelezea dhana ya arifa za maendeleo katika MCP, kwa nini ni muhimu, na jinsi ya kuzitekeleza kwa kutumia HTTP Inayoweza Kuenezwa. Pia utapata zoezi la vitendo kuthibitisha ufahamu wako.

Arifa za maendeleo ni ujumbe wa wakati halisi unaotumwa kutoka seva kwenda kwa mteja wakati wa operesheni za muda mrefu. Badala ya kusubiri mchakato mzima umalizike, seva inaendelea kusasisha mteja kuhusu hali ya sasa. Hii huongeza uwazi, uzoefu wa mtumiaji, na kurahisisha ufuatiliaji wa matatizo.

**Mfano:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Kwa Nini Kutumia Arifa za Maendeleo?

Arifa za maendeleo ni muhimu kwa sababu kadhaa:

- **Uzoefu bora wa mtumiaji:** Watumiaji wanaona masasisho wanapofanya kazi, si mwisho tu.
- **Mrejesho wa wakati halisi:** Wateja wanaweza kuonyesha mabaaru ya maendeleo au kumbukumbu, kufanya programu ionekane jibu.
- **Kupunguza ugumu wa ufuatiliaji na usimamizi:** Waendelezaji na watumiaji wanaweza kuona sehemu inayoweza kuchelewa au kuzingirwa.

### Jinsi ya Kutekeleza Arifa za Maendeleo

Hivi ndivyo unavyoweza kutekeleza arifa za maendeleo katika MCP:

- **Kwenye seva:** Tumia `ctx.info()` au `ctx.log()` kutuma arifa kila kipande kinaposhughulikiwa. Hii inatuma ujumbe kwa mteja kabla ya matokeo makuu kuwa tayari.
- **Kwenye mteja:** Tekeleza kirejeshi cha ujumbe kinachosikiliza na kuonyesha arifa zinapowasili. Kirejeshi hiki hutofautisha kati ya arifa na matokeo ya mwisho.

**Mfano wa Seva:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Mfano wa Mteja:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Mambo ya Usalama Kuzingatiwa

Unapotekeleza seva za MCP kwa kutumia usafirishaji wa msingi wa HTTP, usalama unakuwa jambo la muhimu sana linalohitaji umakini makini kuelekea njia nyingi za mashambulizi na taratibu za ulinzi.

### Muhtasari

Usalama ni muhimu wakati unapoonyesha seva za MCP kupitia HTTP. HTTP inayoweza kusambazwa huleta maeneo mapya ya mashambulizi na inahitaji usanidi mzuri.

### Mambo Muhimu

- **Uthibitishaji wa Kichwa cha Asili**: Hakikisha kila mara kuthibitisha kichwa cha `Origin` ili kuzuia mashambulizi ya rebinding ya DNS.
- **Kuhusisha Localhost**: Kwa maendeleo ya ndani, funga seva kwa `localhost` ili kuepuka kuionesha kwa umma mtandao.
- **Uthibitishaji**: Tekeleza uthibitishaji (mfano, funguo za API, OAuth) kwa usanifu wa uzalishaji.
- **CORS**: Sanidi sera za Kushirikiana Asili za Mbalimbali (CORS) ili kupunguza ufikiaji.
- **HTTPS**: Tumia HTTPS katika uzalishaji ili kuficha trafiki.

### Mazoezi Bora

- Usiamini maombi yanayoingia bila uthibitisho.
- Andika kumbukumbu na fuatilia ufikiaji na makosa yote.
- Sasisha mara kwa mara utegemezi ili kufunga udhaifu wa kiusalama.

### Changamoto

- Kusawazisha usalama na urahisi wa maendeleo
- Kuhakikisha urafiki na mazingira mbalimbali ya wateja

## Kuboresha kutoka SSE kwenda Streamable HTTP

Kwa programu zinazotumia Tukio la Seva lililotumwa (SSE), kuhama kwenda Streamable HTTP kunatoa uwezo ulioimarishwa na utunzaji bora wa muda mrefu kwa utekelezaji wako wa MCP.

### Kwa Nini Kuboresha?

Kuna sababu mbili za kushawishi za kuboresha kutoka SSE kwenda Streamable HTTP:

- Streamable HTTP hutoa upanuzi bora, urafiki, na usaidizi tajiri wa taarifa kuliko SSE.
- Ni usafirishaji uliopendekezwa kwa programu mpya za MCP.

### Hatua za Kuhama

Hivi ndivyo unaweza kuhama kutoka SSE kwenda Streamable HTTP katika programu zako za MCP:

- **Sasisha msimbo wa seva** kutumia `transport="streamable-http"` katika `mcp.run()`.
- **Sasisha msimbo wa mteja** kutumia `streamablehttp_client` badala ya mteja wa SSE.
- **Tekeleza mshughulikiaji wa ujumbe** kwa mteja ili kushughulikia taarifa.
- **Jaribu urafiki** na zana na kazi zilizopo.

### Kuweka Urafiki

Inapendekezwa kudumisha urafiki na wateja wa SSE waliopo wakati wa mchakato wa kuhama. Hapa kuna mikakati:

- Unaweza kuunga mkono SSE na Streamable HTTP kwa kuendesha usafirishaji wote kwenye viunganishi tofauti.
- Polepole hamisha wateja kwenye usafirishaji mpya.

### Changamoto

Hakikisha unashughulikia changamoto zifuatazo wakati wa uhamishaji:

- Kuhakikisha wateja wote wasasasishwa
- Kushughulikia tofauti katika utoaji wa taarifa

## Mambo ya Usalama Kuzingatiwa

Usalama unapaswa kuwa kipaumbele kikuu wakati wa kutekeleza seva yoyote, hasa unapotumia usafirishaji wa msingi wa HTTP kama Streamable HTTP katika MCP. 

Unapotekeleza seva za MCP kwa kutumia usafirishaji wa msingi wa HTTP, usalama unakuwa jambo la muhimu sana linalohitaji umakini makini kuelekea njia nyingi za mashambulizi na taratibu za ulinzi.

### Muhtasari

Usalama ni muhimu wakati unapoonyesha seva za MCP kupitia HTTP. Streamable HTTP huleta maeneo mapya ya mashambulizi na inahitaji usanidi mzuri.

Hapa kuna mambo muhimu ya usalama:

- **Uthibitishaji wa Kichwa cha Asili**: Hakikisha kila mara kuthibitisha kichwa cha `Origin` ili kuzuia mashambulizi ya rebinding ya DNS.
- **Kuhusisha Localhost**: Kwa maendeleo ya ndani, funga seva kwa `localhost` ili kuepuka kuionesha kwa umma mtandao.
- **Uthibitishaji**: Tekeleza uthibitishaji (mfano, funguo za API, OAuth) kwa usanifu wa uzalishaji.
- **CORS**: Sanidi sera za Kushirikiana Asili za Mbalimbali (CORS) ili kupunguza ufikiaji.
- **HTTPS**: Tumia HTTPS katika uzalishaji ili kuficha trafiki.

### Mazoezi Bora

Zaidi ya hayo, hapa kuna mazoezi bora ya kufuata wakati wa kutekeleza usalama katika seva yako ya MCP inayotiririsha:

- Usiamini maombi yanayoingia bila uthibitisho.
- Andika kumbukumbu na fuatilia ufikiaji na makosa yote.
- Sasisha mara kwa mara utegemezi ili kufunga udhaifu wa kiusalama.

### Changamoto

Utakutana na changamoto fulani wakati wa kutekeleza usalama katika seva za MCP zinazotiririsha:

- Kusawazisha usalama na urahisi wa maendeleo
- Kuhakikisha urafiki na mazingira mbalimbali ya wateja

### Kazi: Jenga Programu Yako ya Streaming MCP

**Hali:**
Tengeneza seva na mteja wa MCP ambapo seva inashughulikia orodha ya vitu (mfano, faili au hati) na kutuma taarifa kwa kila kipengee kinachosindikwa. Mteja anapaswa kuonyesha kila taarifa inayoingia.

**Hatua:**

1. Tekeleza zana ya seva inayoshughulikia orodha na kutuma taarifa kwa kila kipengee.
2. Tekeleza mteja mwenye mshughulikiaji wa ujumbe kuonyesha taarifa kwa wakati halisi.
3. Jaribu utekelezaji wako kwa kuendesha seva na mteja, na angalia taarifa zinapoingia.

[Suluhisho](./solution/README.md)

## Kusoma Zaidi & Nini Kifuatayo?

Ili kuendelea na safari yako na MCP inayotiririsha na kupanua ujuzi wako, sehemu hii inatoa rasilimali za ziada na hatua zinazopendekezwa za kujenga programu zilizo ngumu zaidi.

### Kusoma Zaidi

- [Microsoft: Utangulizi kwa HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS katika ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Ombi la Python: Maombi ya Streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Nini Kifuatayo?

- Jaribu kujenga zana za MCP zilizo ngumu zaidi zinazotumia mtiririko kwa uchambuzi wa wakati halisi, mazungumzo, au uhariri wa pamoja.
- Chunguza kuunganisha MCP streaming na mifumo ya mbele (React, Vue, n.k.) kwa masasisho ya Moja kwa Moja ya UI.
- Kifuatayo: [Kutumia AI Toolkit kwa VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->