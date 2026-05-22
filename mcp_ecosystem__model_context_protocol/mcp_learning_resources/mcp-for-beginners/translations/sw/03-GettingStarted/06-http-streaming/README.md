# Uchapishaji wa HTTPS kwa Itifaki ya Muktadha wa Mfano (MCP)

Sura hii hutoa mwongozo kamili wa kutekeleza uchapishaji salama, unaoweza kupanuka, na wa wakati halisi kwa kutumia Itifaki ya Muktadha wa Mfano (MCP) kwa kutumia HTTPS. Inajumuisha motisha ya uchapishaji, mifumo ya usafirishaji inayopatikana, jinsi ya kutekeleza HTTP inayoweza kuchapishwa katika MCP, mbinu bora za usalama, uhamisho kutoka SSE, na mwongozo wa vitendo wa kujenga programu zako za uchapishaji za MCP.

## Mifumo ya Usafirishaji na Uchapishaji katika MCP

Sehemu hii inachunguza mifumo tofauti ya usafirishaji inayopatikana katika MCP na jukumu lao katika kuwezesha uwezo wa uchapishaji kwa mawasiliano ya wakati halisi kati ya wateja na seva.

### Nini Mfumo wa Usafirishaji?

Mfumo wa usafirishaji huainisha jinsi data inavyo kubadilishana kati ya mteja na seva. MCP inaunga mkono aina nyingi za usafirishaji ili kufaa mazingira na mahitaji tofauti:

- **stdio**: Ingizo/tofauti ya kawaida, inayofaa kwa zana za ndani na zile zinazotumia CLI. Rahisi lakini haitafaa kwa wavuti au wingu.
- **SSE (Matukio Yanayotumwa na Seva)**: Inaruhusu seva kusukuma masasisho ya wakati halisi kwa wateja kupitia HTTP. Nzuri kwa uwezo wa wavuti, lakini ina mipaka katika upanaji na kubadilika. Kuanzia MCP Specification 2025-06-18, usafirishaji wa SSE pekee umetupwa na kuwekewa nafasi na usafirishaji wa "HTTP Inayoweza Kuchapishwa".
- **Streamable HTTP**: Usafirishaji wa kisasa wa uchapishaji unaotegemea HTTP, unaounga mkono arifa na upanaji bora. Inashauriwa kwa hali nyingi za uzalishaji na wingu.

### Jedwali la Ulinganisho

Angalia jedwali hapa chini kuelewa tofauti kati ya mifumo hii ya usafirishaji:

| Usafirishaji      | Masasisho ya Wakati Halisi | Uchapishaji | Upanaji | Matumizi                   |
|-------------------|----------------------------|-------------|---------|----------------------------|
| stdio             | Hapana                     | Hapana      | Chini   | Zana za CLI za ndani       |
| SSE               | Ndiyo                      | Ndiyo       | Wastani | Wavuti, masasisho ya wakati halisi |
| Streamable HTTP   | Ndiyo                      | Ndiyo       | Juu     | Wingu, wateja wengi        |

> **Kidokezo:** Kuchagua usafirishaji sahihi huathiri utendaji, upanaji, na uzoefu wa mtumiaji. **Streamable HTTP** inashauriwa kwa programu za kisasa, zenye upanaji, na zinazofaa kwa wingu.

Angalia usafirishaji stdio na SSE ulioonyeshwa katika sura zilizopita na jinsi Streamable HTTP inavyofunikwa katika sura hii.

## Uchapishaji: Dhana na Motisha

Kuelewa dhana za msingi na motisha nyuma ya uchapishaji ni muhimu kwa kutekeleza mifumo madhubuti ya mawasiliano ya wakati halisi.

**Uchapishaji** ni mbinu katika programu za mtandao inayoruhusu data kutumwa na kupokelewa kwa vipande vidogo vinavyoshughulikiwa au kama mlolongo wa matukio, badala ya kusubiri jibu zima kuwa tayari. Hii ni muhimu hasa kwa:

- Faili au seti kubwa za data.
- Masasisho ya wakati halisi (mfano, mazungumzo, upanuzi wa maendeleo).
- Hesabu ndefu ambapo unataka kumjulisha mtumiaji.

Hapa ni mambo unayopaswa kujua juu ya uchapishaji kwa kiwango cha juu:

- Data hutolewa hatua kwa hatua, si mara moja.
- Mteja anaweza kuchakata data anapopokea.
- Hupunguza ucheleweshaji unaoonekana na kuboresha uzoefu wa mtumiaji.

### Kwa Nini Utumie Uchapishaji?

Sababu za kutumia uchapishaji ni zifuatazo:

- Watumiaji wanapata mrejesho papo hapo, si tu mwishoni
- Huwezesha programu za wakati halisi na UI zenye majibu haraka
- Matumizi bora ya rasilimali za mtandao na kompyuta

### Mfano Rahisi: Seva na Mteja wa Uchapishaji wa HTTP

Huu ni mfano rahisi wa jinsi uchapishaji unavyoweza kutekelezwa:

#### Python

**Seva (Python, ikitumia FastAPI na StreamingResponse):**

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

**Mteja (Python, akitumia requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Mfano huu unaonyesha seva ikituma mfululizo wa ujumbe kwa mteja wakati zinapopatikana, badala ya kusubiri ujumbe wote kuwa tayari.

**Jinsi inavyofanya kazi:**

- Seva hutuma kila ujumbe linapokuwa tayari.
- Mteja anapokea na kuchapisha kipande chochote kinapowasili.

**Mahitaji:**

- Seva inapaswa kutumia jibu la uchapishaji (mfano, `StreamingResponse` katika FastAPI).
- Mteja anapaswa kuchakata jibu kama mto (`stream=True` katika requests).
- Aina ya maudhui kawaida ni `text/event-stream` au `application/octet-stream`.

#### Java

**Seva (Java, ikitumia Spring Boot na Matukio Yanayotumwa na Seva):**

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

**Mteja (Java, ikitumia Spring WebFlux WebClient):**

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

- Inatumia stack ya reactive ya Spring Boot na `Flux` kwa uchapishaji
- `ServerSentEvent` hutumia mtiririko wa arifa zenye muundo wa matukio
- `WebClient` na `bodyToFlux()` huwezesha matumizi ya uchapishaji wa reactive
- `delayElements()` huiga muda wa usindikaji kati ya matukio
- Matukio yanaweza kuwa na aina (`info`, `result`) kwa usindikaji bora wa mteja

### Ulinganisho: Uchapishaji wa Kiasili vs Uchapishaji wa MCP

Tofauti kati ya jinsi uchapishaji unavyofanya kazi kwa njia "ya kiasili" na jinsi unavyofanya kazi MCP zinaweza kuonyeshwa kama ifuatavyo:

| Kipengele              | Uchapishaji wa HTTP wa Kiasili | Uchapishaji wa MCP (Arifa)        |
|-----------------------|-------------------------------|----------------------------------|
| Jibu kuu              | Kwa vipande                    | Moja, mwishoni                   |
| Masasisho ya maendeleo | Hutumwa kama vipande vya data | Hutumwa kama arifa               |
| Mahitaji ya mteja     | Lazima uchakata mto            | Lazima utekeleze mshughulikiaji wa ujumbe |
| Matumizi              | Faili kubwa, mitiririko ya tokeni ya AI | Maendeleo, kumbukumbu, mrejesho wa wakati halisi |

### Tofauti Muhimu Zinazobainika

Zaidi ya hayo, hapa kuna baadhi ya tofauti muhimu:

- **Mfumo wa Mawasiliano:**
  - Uchapishaji wa HTTP wa kiasili: Inatumia uwasilishaji wa vipande rahisi kutuma data kwa vipande
  - Uchapishaji wa MCP: Inatumia mfumo wa arifa wenye muundo na itifaki ya JSON-RPC

- **Muundo wa Ujumbe:**
  - HTTP ya kiasili: Vipande vya maandishi plain vyenye mistari mipya
  - MCP: Vitu vya LoggingMessageNotification vyenye metadata

- **Utekelezaji wa Mteja:**
  - HTTP ya kiasili: Mteja rahisi anayechakata majibu ya uchapishaji
  - MCP: Mteja mtanuzaji mwenye mshughulikiaji wa ujumbe kwa kuchakata aina tofauti za ujumbe

- **Masasisho ya Maendeleo:**
  - HTTP ya kiasili: Maendeleo ni sehemu ya mto mkuu wa jibu
  - MCP: Maendeleo hutumwa kupitia ujumbe wa arifa tofauti wakati jibu kuu linakuja mwishoni

### Mapendekezo

Kuna mambo tunayopendekeza kuhusu kuchagua kati ya kutekeleza uchapishaji wa kiasili (kama ilivyo kwenye muhuri tuliokuonyesha hapo juu ukitumia `/stream`) dhidi ya kuchagua uchapishaji kupitia MCP.

- **Kwa mahitaji rahisi ya uchapishaji:** Uchapishaji wa HTTP wa kiasili ni rahisi kutekeleza na unatosha kwa mahitaji ya msingi.

- **Kwa programu ngumu, zenye mwingiliano:** Uchapishaji wa MCP hutoa njia yenye muundo zaidi yenye metadata tajiri na utofauti kati ya arifa na matokeo ya mwisho.

- **Kwa programu za AI:** Mfumo wa arifa wa MCP ni muhimu hasa kwa kazi za AI zenye mchakato mrefu ambapo unataka kuendelea kuwajulisha watumiaji kuhusu maendeleo.

## Uchapishaji katika MCP

Sawa, sasa umeona mapendekezo na ulinganisho kuhusu tofauti kati ya uchapishaji wa kiasili na uchapishaji katika MCP. Hebu tuchambue kwa kina jinsi unavyoweza kutumia uchapishaji katika MCP.

Kuelewa jinsi uchapishaji unavyofanya kazi ndani ya mfumo wa MCP ni muhimu kwa kujenga programu zenye majibu haraka zinazotoa mrejesho wa wakati halisi kwa watumiaji wakati wa matatizo marefu yanapotekelezwa.

Katika MCP, uchapishaji siyo kuhusu kutuma jibu kuu kwa vipande, bali ni kuhusu kutuma **arifa** kwa mteja wakati zana inaposhughulikia ombi. Arifa hizi zinaweza kujumuisha masasisho ya maendeleo, kumbukumbu, au matukio mengine.

### Jinsi inavyofanya kazi

Matokeo kuu bado hutumwa kama jibu moja. Hata hivyo, arifa zinaweza kutumwa kama ujumbe tofauti wakati wa usindikaji na hivyo kuhuisha mteja kwa wakati halisi. Mteja lazima aweze kushughulikia na kuonyesha arifa hizi.

## Nini ni Arifa?

Tulisema "Arifa", hiyo inamaanisha nini katika muktadha wa MCP?

Arifa ni ujumbe unaotumwa kutoka seva kwenda kwa mteja ili kumjulisha kuhusu maendeleo, hali, au matukio mengine wakati wa mchakato mrefu. Arifa huboresha uwazi na uzoefu wa mtumiaji.

Kwa mfano, mteja anapaswa kutuma arifa mara baada ya mkutano wa mwanzo na seva kufanyika.

Arifa inaonekana kama ujumbe wa JSON kama ifuatavyo:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Arifa zinahusiana na mada katika MCP inayojulikana kama ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Ili kuruhusu mfumo wa logi ufanye kazi, seva inahitaji kuiwezesha kama kipengele/uwezo kama ifuatavyo:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Kulingana na SDK inayotumika, logi inaweza kuwa imewezeshwa kwa chaguo-msingi, au utahitaji kuiwezesha waziwazi katika usanidi wa seva yako.

Kuna aina tofauti za arifa:

| Kiwango    | Maelezo                    | Mfano wa Matumizi            |
|------------|----------------------------|-----------------------------|
| debug      | Taarifa za kina za ufuatiliaji | Sehemu za kuingilia/kuondoka za kazi |
| info       | Ujumbe wa jumla wa taarifa | Masasisho ya maendeleo ya shughuli |
| notice     | Matukio ya kawaida lakini muhimu | Mabadiliko ya usanidi        |
| warning    | Hali ya onyo               | Matumizi ya kipengele kilichokatwa |
| error      | Hali za makosa            | Makosa ya shughuli           |
| critical   | Hali kali za hitilafu      | Kushindwa kwa vipengele vya mfumo |
| alert      | Hatua lazima zichukuliwe mara moja | Uharibifu wa data umetambuliwa |
| emergency  | Mfumo haupatikani          | Hitilafu kamili ya mfumo    |

## Kutekeleza Arifa katika MCP

Ili kutekeleza arifa katika MCP, unahitaji kuandaa pande za seva na mteja kushughulikia masasisho ya wakati halisi. Hii inaruhusu programu yako kutoa mrejesho wa papo kwa papo kwa watumiaji wakati wa matatizo marefu.

### Sehemu ya Seva: Kutuma Arifa

Tuanze na upande wa seva. Katika MCP, unaeleza zana zinazoweza kutuma arifa wakati wa kushughulikia maombi. Seva hutumia kitu cha muktadha (kawaida `ctx`) kutuma ujumbe kwa mteja.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Katika mfano uliotangulia, zana ya `process_files` inatuma arifa tatu kwa mteja wakati inavyoshughulikia kila faili. Njia ya `ctx.info()` hutumika kutuma ujumbe wa taarifa.

Zaidi ya hayo, ili kuwezesha arifa, hakikisha seva yako inatumia usafirishaji wa uchapishaji (kama `streamable-http`) na mteja wako anatekeleza mshughulikiaji wa ujumbe wa kushughulikia arifa. Hapa ni jinsi unavyoweza kuandaa seva kutumia usafirishaji wa `streamable-http`:

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

Katika mfano huu wa .NET, zana ya `ProcessFiles` imewekwa na sifa ya `Tool` na inatuma arifa tatu kwa mteja wakati inavyoshughulikia kila faili. Njia ya `ctx.Info()` hutumika kutuma ujumbe wa taarifa.

Ili kuwezesha arifa katika seva yako ya MCP ya .NET, hakikisha unatumia usafirishaji wa uchapishaji:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Sehemu ya Mteja: Kupokea Arifa

Mteja lazima aweke mshughulikiaji wa ujumbe ili kushughulikia na kuonyesha arifa anapozipokea.

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

Katika msimbo uliotangulia, kazi ya `message_handler` inakagua kama ujumbe unaopokelewa ni arifa. Ikiwa ni hivyo, inachapisha arifa; vinginevyo inashughulikia kama ujumbe wa kawaida wa seva. Pia zingatia jinsi `ClientSession` inavyowezeshwa kwa `message_handler` kushughulikia arifa zinazoingia.

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

Katika mfano huu wa .NET, kazi ya `MessageHandler` inakagua kama ujumbe unaopelekwa ni arifa. Ikiwa ni hivyo, inachapisha arifa; vinginevyo inashughulikia kama ujumbe wa kawaida wa seva. `ClientSession` imeanzishwa na mshughulikiaji wa ujumbe kupitia `ClientSessionOptions`.

Ili kuwezesha arifa, hakikisha seva yako inatumia usafirishaji wa uchapishaji (kama `streamable-http`) na mteja anaweka mshughulikiaji wa ujumbe kushughulikia arifa.

## Arifa za Maendeleo na Mifano ya Matumizi

Sehemu hii inaelezea dhana ya arifa za maendeleo katika MCP, kwa nini ni muhimu, na jinsi ya kuzitekeleza ukitumia Streamable HTTP. Pia utapata zoezi la vitendo kusaidia kuelewa zaidi.

Arifa za maendeleo ni ujumbe wa wakati halisi unaotumwa kutoka seva kwenda kwa mteja wakati wa matatizo marefu. Badala ya kusubiri mchakato mzima uchukue muda, seva inaendelea kuwajulisha wateja kuhusu hali ya sasa. Hii huboresha uwazi, uzoefu wa mtumiaji, na kurahisisha ufuatiliaji wa matatizo.

**Mfano:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Kwa Nini Utumie Arifa za Maendeleo?

Arifa za maendeleo ni muhimu kwa sababu kadhaa:

- **Uzoefu bora wa mtumiaji:** Watumiaji wanaona masasisho wanapofanya kazi, si tu mwishoni.
- **Mrejesho wa wakati halisi:** Wateja wanaweza kuonyesha vipimo vya maendeleo au kumbukumbu, kuweka programu katika hali ya majibu.
- **Rahisi kufuatilia na kusahihisha:** Waendelezaji na watumiaji wanaweza kuona sehemu gani mchakato unachelewa au umekwama.

### Jinsi ya Kutekeleza Arifa za Maendeleo

Hivi ndivyo unavyoweza kutekeleza arifa za maendeleo katika MCP:

- **Kwenye seva:** Tumia `ctx.info()` au `ctx.log()` kutuma arifa kila kipengele kinaposhughulikiwa. Hii hutuma ujumbe kwa mteja kabla ya matokeo kuu kuwa tayari.
- **Kwenye mteja:** Tekeleza mshughulikiaji wa ujumbe unaosikiliza na kuonyesha arifa zinapoingia. Mshughulikiaji huyu hutenganisha kati ya arifa na matokeo ya mwisho.

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

## Mambo ya Usalama

Wakati wa kutekeleza seva za MCP zenye usafirishaji wa msingi wa HTTP, usalama unakuwa jambo la muhimu sana linalohitaji umakini mkubwa kuelekea njia nyingi za mashambulizi na mbinu za ulinzi.

### Muhtasari

Usalama ni muhimu wakati unafungua seva za MCP kupitia HTTP. Streamable HTTP inaleta maeneo mapya ya mashambulizi na inahitaji usanidi makini.

### Vidokezo Muhimu

- **Uthibitishaji wa kichwa cha Origin**: Daima thibitisha kichwa cha `Origin` ili kuzuia mashambulizi ya DNS rebinding.
- **Kufunga kwenye localhost**: Kwa uendelezaji wa ndani, funga seva kwenye `localhost` ili kuepuka kuifungua kwa mtandao wa umma.
- **Uthibitishaji**: Tumia uthibitishaji (mfano, API keys, OAuth) kwa mazingira ya uzalishaji.
- **CORS**: Sanidi sera za Sharing ya Rasilimali za Mavuti ya Asili (CORS) ili kudhibiti upatikanaji.
- **HTTPS**: Tumia HTTPS kwa uzalishaji ili kusimba trafiki.

### Mbinu Bora

- Usiamini maombi yanayoingia bila uthibitishaji.
- Andika kumbukumbu na fuatilia upatikanaji na makosa yote.
- Sasisha mara kwa mara utegemezi ili kufunga mianya ya usalama.

### Changamoto
- Kuwalinganisha usalama na urahisi wa maendeleo
- Kuhakikisha ulinganifu na mazingira mbalimbali ya mteja

## Kuboresha kutoka SSE hadi Streamable HTTP

Kwa programu zinazotumia Server-Sent Events (SSE), kuhama kwenda Streamable HTTP kunatoa uwezo zaidi na uimara bora wa muda mrefu kwa utekelezaji wako wa MCP.

### Kwa Nini Kuboresha?

Kuna sababu mbili muhimu za kuboresha kutoka SSE hadi Streamable HTTP:

- Streamable HTTP hutoa ufugaji bora, ulinganifu, na msaada mzuri wa arifa kuliko SSE.
- Ni usafirishaji unaopendekezwa kwa programu mpya za MCP.

### Hatua za Kuhama

Hapa ni jinsi unavyoweza kuhama kutoka SSE hadi Streamable HTTP katika programu zako za MCP:

- **Sasisha msimbo wa seva** kutumia `transport="streamable-http"` katika `mcp.run()`.
- **Sasisha msimbo wa mteja** kutumia `streamablehttp_client` badala ya mteja wa SSE.
- **Tekeleza mshughulikiaji wa ujumbe** katika mteja kushughulikia arifa.
- **Jaribu ulinganifu** na zana na mashughuli zilizopo.

### Kudumisha Ulinganifu

Inapendekezwa kudumisha ulinganifu na wateja wa SSE waliopo wakati wa mchakato wa kuhama. Hapa kuna mikakati kadhaa:

- Unaweza kuunga mkono SSE na Streamable HTTP kwa kuendesha usafirishaji wote wawili kwenye maeneo tofauti.
- Polepole hamisha wateja kwenda usafirishaji mpya.

### Changamoto

Hakikisha unashughulikia changamoto zifuatazo wakati wa kuhama:

- Kuhakikisha wateja wote wanasasishwa
- Kushughulikia tofauti katika utoaji wa taarifa

## Mambo ya Kujali Usalama

Usalama unapaswa kuwa kipaumbele cha juu wakati wa kutekeleza seva yoyote, hasa unapotumia usafirishaji wa aina ya HTTP kama Streamable HTTP katika MCP.

Wakati wa kutekeleza seva za MCP na usafirishaji wa aina ya HTTP, usalama unakuwa suala la muhimu sana linalohitaji umakini wa makini kwa mbinu mbalimbali za mashambulizi na mbinu za ulinzi.

### Muhtasari

Usalama ni muhimu wakati wa kufunua seva za MCP kupitia HTTP. Streamable HTTP huleta maeneo mapya ya mashambulizi na inahitaji usanidi makini.

Hapa kuna mambo muhimu ya kuzingatia usalama:

- **Uthibitishaji wa Kichwa cha Asili (Origin Header)**: Daima thibitisha kichwa cha `Origin` ili kuzuia mashambulizi ya DNS rebinding.
- **Ku-unga mkono localhost**: Kwa maendeleo ya ndani, wafunge seva kwenye `localhost` ili kuepuka kufunuliwa kwenye mtandao wa umma.
- **Uthibitishaji**: Tekeleza uthibitishaji (kwa mfano, funguo za API, OAuth) kwa ajili ya uzinduzi wa uzalishaji.
- **CORS**: Sanidi sera za Kushirikiana kwa Asili Tofauti (CORS) ili kupunguza ufikiaji.
- **HTTPS**: Tumia HTTPS katika uzalishaji ili kuificha mtiririko wa data.

### Mbinu Bora

Pia, hapa kuna mbinu bora za kufuata wakati wa kutekeleza usalama katika seva zako za MCP zinazotiririsha data:

- Usiamini kabisa maombi yanayoingia bila kuthibitishwa.
- Weka kumbukumbu na fuatilia upatikanaji wote na makosa.
- Sasisha mara kwa mara tegemezi ili kurekebisha mianya ya usalama.

### Changamoto

Utakumbana na changamoto kadhaa wakati wa kutekeleza usalama katika seva za MCP zinazotiririsha:

- Kuwalinganisha usalama na urahisi wa maendeleo
- Kuhakikisha ulinganifu na mazingira mbalimbali ya mteja

### Kazi: Jenga Programu Yako ya MCP Inayotiririsha

**Hali:**
Jenga seva na mteja wa MCP ambapo seva inashughulikia orodha ya vitu (mfano, faili au hati) na kutuma taarifa kwa kila kipengee kinachoshughulikiwa. Mteja anapaswa kuonyesha kila arifa anapopokea.

**Hatua:**

1. Tekeleza chombo cha seva kinachoshughulikia orodha na kutuma arifa kwa kila kipengee.
2. Tekeleza mteja mwenye mshughulikiaji wa ujumbe kuonyesha arifa kwa wakati halisi.
3. Jaribu utekelezaji wako kwa kuendesha seva na mteja, na tazama arifa.

[Solution](./solution/README.md)

## Kusoma Zaidi & Nini Kifuatayo?

Ili kuendelea na safari yako ya MCP inayotiririsha na kupanua ujuzi wako, sehemu hii inatoa rasilimali za ziada na hatua zinazopendekezwa za kujenga programu zaidi zilizo juu.

### Kusoma Zaidi

- [Microsoft: Utangulizi kwa Kupitisha Data kwa HTTP](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Matukio Yanayotumwa na Seva (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS katika ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Maombi ya Kupitisha Data](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Nini Kifuatayo?

- Jaribu kujenga zana za MCP zilizo juu zaidi zinazotumia uchezaji wa data kwa uchambuzi wa wakati halisi, mazungumzo, au uhariri wa pamoja.
- Gundua kuunganisha MCP inayotiririsha na mifumo ya mbele (React, Vue, n.k.) kwa masasisho ya moja kwa moja ya UI.
- Ifuatayo: [Kutumia AI Toolkit kwa VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->