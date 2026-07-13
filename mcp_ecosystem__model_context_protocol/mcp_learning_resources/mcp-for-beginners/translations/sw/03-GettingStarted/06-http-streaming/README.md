# Kustream kwa HTTPS kwa Itifaki ya Muktadha wa Mfano (MCP)

Sura hii inatoa mwongozo kamili wa kutekeleza uchezaji wa salama, unaoweza kupanuka, na wa wakati halisi kwa Itifaki ya Muktadha wa Mfano (MCP) kwa kutumia HTTPS. Inajumuisha motisha ya uchezaji, njia zinazopatikana za usafirishaji, jinsi ya kutekeleza HTTP inayoweza kuchezwa katika MCP, mbinu bora za usalama, uhamishoni kutoka SSE, na mwongozo wa vitendo wa kujenga programu zako za uchezaji za MCP. 

> **Kuangalia mbele:** somo hili linaelezea HTTP Inayoweza Kuchezwa chini ya **Mafunzo ya MCP 2025-11-25**, ambapo kikao kinaanzishwa wakati wa `initialize` na kushikiliwa na kichwa cha `Mcp-Session-Id`. Toleo la mteja la `2026-07-28` linaondoa mkataba wa mikono na kitambulisho cha kikao kabisa, na kufanya kila ombi kuwa huru na linaweza kuelekezwa kwa seva yoyote bila vikao vilivyo imara. Tazama [Nini Kinabadilika katika MCP: Mteja wa Toleo la 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) kwa maelezo zaidi.

## Njia za Usafirishaji na Uchezaji katika MCP

Sehemu hii inachambua njia tofauti za usafirishaji zinazopatikana katika MCP na jukumu lao katika kuwezesha uwezo wa uchezaji kwa mawasiliano ya wakati halisi kati ya wateja na seva.

### Nini Ni Njia ya Usafirishaji?

Njia ya usafirishaji inaelezea jinsi data zinavyobadilishana kati ya mteja na seva. MCP inaunga mkono aina nyingi za usafirishaji ili kuendana na mazingira na mahitaji mbalimbali:

- **stdio**: Ingizo/Output ya kawaida, inayofaa kwa zana za ndani na za CLI. Rahisi lakini haitoshi kwa wavuti au mawingu.
- **SSE (Matukio Yanayotumwa na Seva)**: Inaruhusu seva kutuma masasisho ya wakati halisi kwa wateja kupitia HTTP. Nzuri kwa UI za wavuti, lakini ni dhaifu katika upanuzi na kubadilika. Kuanzia Mafunzo ya MCP 2025-06-18, usafirishaji wa SSE wa pekee umeondolewa na kubadilishwa na usafirishaji wa "Streamable HTTP".
- **Streamable HTTP**: Usafirishaji wa kisasa unaotegemea HTTP, unaounga mkono arifa na upanuzi bora. Unapendekezwa kwa hali nyingi za uzalishaji na mawingu.

### Jedwali la Ulinganisho

Angalia jedwali la ulinganisho hapa chini kuelewa tofauti kati ya njia hizi za usafirishaji:

| Usafirishaji      | Masasisho ya Wakati Halisi | Uchezaji | Upanuzi | Matumizi                |
|------------------|----------------------------|----------|---------|------------------------|
| stdio            | Hapana                     | Hapana   | Chini   | Zana za ndani za CLI   |
| SSE              | Ndiyo                      | Ndiyo    | Kati    | Wavuti, masasisho ya wakati halisi |
| Streamable HTTP  | Ndiyo                      | Ndiyo    | Juu     | Mwingu, wateja wengi   |

> **Kidokezo:** Kuchagua njia sahihi ya usafirishaji kunaathiri utendaji, upanuzi, na uzoefu wa mtumiaji. **Streamable HTTP** inapendekezwa kwa programu za kisasa, zinazoweza kupanuka, na zenye kuendana na mawingu.

Kumbuka usafirishaji wa stdio na SSE ulioonyeshwa katika sura zilizopita na jinsi HTTP inayoweza kuchezwa ilivyo njia iliyojadiliwa katika sura hii.

## Uchezaji: Dhana na Motisha

Kuelewa dhana msingi na motisha nyuma ya uchezaji ni muhimu kwa kutekeleza mifumo ya mawasiliano ya wakati halisi yenye ufanisi.

**Uchezaji** ni mbinu katika programu za mtandao inayoruhusu data kutumwa na kupokelewa katika sehemu ndogo ndogo zinazoweza kudhibitiwa au kama mfululizo wa matukio, badala ya kusubiri jibu zima liwe tayari. Hii ni muhimu hasa kwa:

- Faili kubwa au seti za data.
- Masasisho ya wakati halisi (kwa mfano, mazungumzo, baa za maendeleo).
- Hesabu za muda mrefu ambapo unataka kuendelea kumjulisha mtumiaji.

Hapa kuna unachopaswa kujua juu ya uchezaji kwa mtazamo mkubwa:

- Data hutatuliwa hatua kwa hatua, si zote mara moja.
- Mteja anaweza kuandaa data anapoipokea.
- Inapunguza ucheleweshaji unaoonekana na kuboresha uzoefu wa mtumiaji.

### Kwa nini kutumia uchezaji?

Sababu za kutumia uchezaji ni kama ifuatavyo:

- Watumiaji hupokea mrejesho papo hapo, sio tu mwishoni
- Inawawezesha programu za wakati halisi na UI zinazojibu haraka
- Inatumia rasilimali za mtandao na hesabu kwa ufanisi zaidi

### Mfano Rahisi: Seva na Mteja wa Uchezaji wa HTTP

Hapa kuna mfano rahisi wa jinsi uchezaji unaweza kutekelezwa:

#### Python

**Seva (Python, ukitumia FastAPI na StreamingResponse):**

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

**Mteja (Python, ukitumia requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Mfano huu unaonyesha seva ikituma mfululizo wa ujumbe kwa mteja wakiwa yanawekwa tayari badala ya kusubiri jumla ya ujumbe zote ziwe tayari.

**Inavyofanya kazi:**

- Seva hutuma ujumbe kila moja inapo tayarika.
- Mteja hupokea na kuchapisha kila sehemu inapo kuja.

**Mahitaji:**

- Seva lazima itumie majibu ya uchezaji (mfano, `StreamingResponse` katika FastAPI).
- Mteja lazima atume majibu kama mtiririko (`stream=True` katika requests).
- Aina ya maudhui kwa kawaida ni `text/event-stream` au `application/octet-stream`.

#### Java

**Seva (Java, ukitumia Spring Boot na Matukio Yanayotumwa na Seva):**

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

**Mteja (Java, ukitumia Spring WebFlux WebClient):**

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

- Inatumia kipindi cha reactive cha Spring Boot na `Flux` kwa uchezaji
- `ServerSentEvent` hutoa uchezaji wa tukio uliofafanuliwa vizuri na aina za matukio
- `WebClient` na `bodyToFlux()` inakuwezesha kutumia uchezaji wa reactive
- `delayElements()` huringisha muda wa usindikaji kati ya matukio
- Matukio yanaweza kuwa na aina (`info`, `result`) kwa usimamizi bora wa mteja

### Ulinganisho: Uchezaji wa Kiasili dhidi ya Uchezaji wa MCP

Tofauti kati ya jinsi uchezaji unavyo fanya kazi kwa njia ya "kiasili" na jinsi unavyofanya kazi MCP inaweza kuonyeshwa hivi:

| Kipengele              | Uchezaji wa HTTP Kiasili      | Uchezaji wa MCP (Arifa)           |
|-----------------------|-------------------------------|----------------------------------|
| Jibu kuu              | Ugawanyaji wa vipande          | Jibu moja, mwishoni              |
| Masasisho ya maendeleo| Yatumiwa kama sehemu za data  | Yatumiwa kama arifa              |
| Mahitaji ya mteja     | Lazima asindikize mtiririko    | Lazima atekeleze mshughulikiaji ujumbe |
| Matumizi              | Faili kubwa, mtiririko wa alama za AI | Maendeleo, kumbukumbu, mrejesho wa wakati halisi |

### Tofauti Muhimu Zinazoonekana

Aidha, hapa kuna tofauti kuu:

- **Mfumo wa Mawasiliano:**
  - Uchezaji wa HTTP wa kawaida: Hutumia msimbo rahisi wa ugawanyaji wa sehemu za data
  - Uchezaji wa MCP: Hutumia mfumo wa arifa uliofanywa kwa mpangilio na itifaki ya JSON-RPC

- **Muundo wa Ujumbe:**
  - HTTP wa kawaida: Sehemu za maandishi wazi na mistari mipya
  - MCP: Vitu vya Notification ya LoggingMessage zilizo na metadata

- **Utekelezaji wa Mteja:**
  - HTTP wa kawaida: Mteja rahisi anayeshughulikia majibu ya uchezaji
  - MCP: Mteja ngumu zaidi na mshughulikiaji ujumbe wa aina tofauti za ujumbe

- **Masasisho ya Maendeleo:**
  - HTTP wa kawaida: Maendeleo ni sehemu ya mtiririko wa jibu kuu
  - MCP: Maendeleo hutumwa kama arifa tofauti wakati jibu kuu linakuja mwishoni

### Mapendekezo

Kuna mambo tunayopendekeza kuhusu kuchagua kati ya kutekeleza uchezaji wa kawaida (kama ilivyoonyeshwa hapo juu kwa kutumia `/stream`) dhidi ya kuchagua uchezaji kupitia MCP.

- **Kwa mahitaji rahisi ya uchezaji:** Uchezaji wa HTTP wa kawaida ni rahisi kutekeleza na unatosha kwa mahitaji ya msingi ya uchezaji.

- **Kwa programu tata, za mwingiliano:** Uchezaji wa MCP hutoa mbinu yenye mpangilio mzuri zaidi na metadata yenye uzito pamoja na utofauti kati ya arifa na matokeo ya mwisho.

- **Kwa programu za AI:** Mfumo wa arifa wa MCP ni mzuri hasa kwa kazi ndefu za AI ambapo unataka kuwajulisha watumiaji maendeleo.

## Uchezaji katika MCP

Sawa, umeona mapendekezo na ulinganisho hadi sasa kuhusu tofauti kati ya uchezaji wa kawaida na uchezaji katika MCP. Hebu tuchunguze kwa kina jinsi unavyoweza kutumia uchezaji ndani ya MCP.

Kuelewa jinsi uchezaji unavyofanya kazi ndani ya mfumo wa MCP ni muhimu kwa kujenga programu zinazojibu haraka zinazotoa mrejesho wa wakati halisi kwa watumiaji wakati wa shughuli za muda mrefu.

Katika MCP, uchezaji siyo kutuma jibu kuu kwa vipande, bali kutuma **arifa** kwa mteja wakati zana inaendesha ombi. Arifa hizi zinaweza kujumuisha masasisho ya maendeleo, kumbukumbu, au matukio mengine.

### Inavyofanya kazi

Matokeo makuu bado hutumwa kama jibu moja. Hata hivyo, arifa zinaweza kutumwa kama ujumbe tofauti wakati wa mchakato na hivyo kusasisha mteja kwa wakati halisi. Mteja lazima aweze kushughulikia na kuonyesha arifa hizi.

## Nini Ni Arifa?

Tulisema "Arifa", inamaanisha nini katika muktadha wa MCP?

Arifa ni ujumbe unaotumwa kutoka kwa seva kwenda kwa mteja kuwajulisha kuhusu maendeleo, hali, au matukio mengine wakati wa shughuli za muda mrefu. Arifa huboresha uwazi na uzoefu wa mtumiaji.

Kwa mfano, mteja anatarajiwa kutuma arifa mara baada ya mkataba wa mikono wa kwanza na seva kufanyika.

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

Ili kufanya kazi za kumbukumbu zifanye kazi, seva inahitaji kuizima kama kipengele/uwezo kama ifuatavyo:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Kulingana na SDK inayotumiwa, kumbukumbu inaweza kuwa zimewashwa kwa chaguo-msingi, au unaweza kuhitajika kuziwezesha wazi katika usanidi wako wa seva.

Kuna aina tofauti za arifa:

| Kiwango    | Maelezo                     | Mfano wa Matumizi              |
|------------|-----------------------------|-------------------------------|
| debug      | Maelezo ya kina ya utambuzi | Mambo ya kuingia/kuondoka ya kazi |
| info       | Ujumbe wa kawaida wa taarifa | Masasisho ya maendeleo ya shughuli |
| notice     | Matukio ya kawaida lakini muhimu | Mabadiliko ya usanidi           |
| warning    | Hali za onyo                | Matumizi ya kipengele kilichopitwa na wakati |
| error      | Hali za makosa             | Kushindwa kwa shughuli          |
| critical   | Hali za hatari              | Kushindwa kwa sehemu ya mfumo  |
| alert      | Hatua inapaswa kuchukuliwa mara moja | Ugonjwa wa data umebainika |
| emergency  | Mfumo hauwezi kutumika        | Kushindwa kabisa kwa mfumo     |

## Kutekeleza Arifa katika MCP

Kutekeleza arifa katika MCP, unahitaji kuanzisha pande za seva na mteja kushughulikia masasisho ya wakati halisi. Hii inaruhusu programu yako kutoa mrejesho wa papo kwa papo kwa watumiaji wakati wa shughuli za muda mrefu.

### Seva: Kutuma Arifa

Tuanze na upande wa seva. Katika MCP, unaelezea zana zinazoweza kutuma arifa wakati wa kusindika maombi. Seva inatumia kitu cha muktadha (kwa kawaida `ctx`) kutuma ujumbe kwa mteja.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Katika mfano uliotangulia, zana `process_files` inatuma arifa tatu kwa mteja wakati inaposindika kila faili. Njia ya `ctx.info()` hutumika kutuma ujumbe wa taarifa.

Zaidi ya hayo, kuwezesha arifa, hakikisha seva yako inatumia usafirishaji wa uchezaji (kama `streamable-http`) na mteja wako anatekeleza mshughulikiaji ujumbe kushughulikia arifa. Hivi ndivyo unavyoweza kusanidi seva kutumia usafirishaji wa `streamable-http`:

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

Katika mfano huu wa .NET, zana `ProcessFiles` imewekwa alama ya `Tool` na inatuma arifa tatu kwa mteja wakati inaposindika kila faili. Njia ya `ctx.Info()` hutumika kutuma ujumbe wa taarifa.

Ili kuwezesha arifa katika seva yako ya MCP ya .NET, hakikisha unatumia usafirishaji wa uchezaji:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Mteja: Kupokea Arifa

Mteja lazima atekeleze mshughulikiaji ujumbe kushughulikia na kuonyesha arifa zinapofika.

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

Katika msimbo uliotangulia, kazi ya `message_handler` huchunguza ikiwa ujumbe unaoingia ni arifa. Ikiwa ni arifa, inaichapisha; vinginevyo, inaunda kama ujumbe wa kawaida wa seva. Pia kumbuka jinsi `ClientSession` inaanzishwa na `message_handler` kwa kushughulikia arifa zinazokuja.

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

Katika mfano huu wa .NET, kazi ya `MessageHandler` huchunguza ikiwa ujumbe unaoingia ni arifa. Ikiwa ni arifa, inaichapisha; vinginevyo, inasindika kama ujumbe wa kawaida wa seva. `ClientSession` inaanzishwa na mshughulikiaji ujumbe kupitia `ClientSessionOptions`.

Ili kuwezesha arifa, hakikisha seva yako inatumia usafirishaji wa uchezaji (kama `streamable-http`) na mteja wako anatekeleza mshughulikiaji ujumbe kushughulikia arifa.

## Arifa za Maendeleo & Matukio

Sehemu hii inaelezea dhana ya arifa za maendeleo katika MCP, kwa nini zinahitajika, na jinsi ya kuzitekeleza kwa kutumia Streamable HTTP. Pia utapata zoezi la vitendo ili kuimarisha uelewa wako.

Arifa za maendeleo ni ujumbe wa wakati halisi unaotumwa kutoka kwa seva kwenda kwa mteja wakati wa shughuli ndefu. Badala ya kusubiri mchakato mzima ukamilike, seva huendelea kusasisha mteja kuhusu hali ya sasa. Hii huboresha uwazi, uzoefu wa mtumiaji, na kurahisisha utambuzi wa makosa.

**Mfano:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Kwa nini Kutumia Arifa za Maendeleo?

Arifa za maendeleo ni muhimu kwa sababu kadhaa:

- **Uzoefu bora wa mtumiaji:** Watumiaji wanaona masasisho wakati kazi inaendelea, sio tu mwishoni.
- **Mrejesho wa wakati halisi:** Wateja wanaweza kuonyesha baa za maendeleo au kumbukumbu, na kufanya programu ihisi kuji-jibu.
- **Utambuzi rahisi na usimamizi:** Watengenezaji na watumiaji wanaweza kuona mahali mchakato unaweza kuwa polepole au umekwama.

### Jinsi ya Kutekeleza Arifa za Maendeleo

Hapa ni jinsi unavyoweza kutekeleza arifa za maendeleo katika MCP:

- **Seva:** Tumia `ctx.info()` au `ctx.log()` kutuma arifa kila kipengele kinaposhughulikiwa. Hii hutuma ujumbe kwa mteja kabla ya jibu kuu kuwa tayari.
- **Mteja:** Tekeleza mshughulikiaji ujumbe unaosikiliza na kuonyesha arifa zinapofika. Mshughulikiaji huu hutofautisha kati ya arifa na jibu la mwisho.

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

Unapotekeleza seva za MCP kwa usafirishaji wa HTTP, usalama unakuwa jambo la msingi kabisa linalohitaji uangalizi makini kwa njia mbalimbali za mashambulizi na mbinu za usalama.

### Muhtasari

Usalama ni muhimu unapoweka seva za MCP zinazo patikana kupitia HTTP. Streamable HTTP huleta maeneo mapya ya mashambulizi na inahitaji usanidi wa kina.

### Mambo Muhimu


- **Uhakiki wa Kichwa cha Origin**: Daima hakiki kichwa cha `Origin` ili kuzuia mashambulizi ya DNS rebinding.
- **Kufunga Localhost**: Kwa maendeleo ya ndani, funga seva kwa `localhost` ili kuzuia kuzifikisha kwenye mtandao wa umma.
- **Uthibitishaji**: Tekeleza uthibitishaji (mfano, funguo za API, OAuth) kwa utoaji wa uzalishaji.
- **CORS**: Sanidi sera za Kushiriki vyanzo vya Asili Tofauti (CORS) ili kupunguza upatikanaji.
- **HTTPS**: Tumia HTTPS katika uzalishaji ili kuokoa trafiki kwa usimbaji fiche.

### Miondoko Bora

- Usiamini maombi yanayoingia bila uhakiki.
- Andika na fuatilia upatikanaji wote na makosa.
- Sasisha mara kwa mara utegemezi ili kufunga udhaifu wa usalama.

### Changamoto

- Kuweka usawa kati ya usalama na urahisi wa maendeleo
- Kuhakikisha ulinganifu na mazingira mbalimbali ya mteja

## Kuboresha kutoka SSE hadi Streamable HTTP

Kwa programu zinazotumia Hali ya Matukio Yanayotumwa na Seva (SSE) kwa sasa, kuhamia Streamable HTTP kunatoa uwezo zaidi na uimara bora wa muda mrefu kwa utekelezaji wa MCP wako.

### Kwa nini Kuboresha?

Kuna sababu mbili muhimu za kuboresha kutoka SSE hadi Streamable HTTP:

- Streamable HTTP hutoa upanuzi bora, ulinganifu, na msaada wa arifa tajiri zaidi kuliko SSE.
- Ni usafirishaji unaopendekezwa kwa programu mpya za MCP.

### Hatua za Uhamiaji

Hapa ni jinsi unavyoweza kuhamia kutoka SSE hadi Streamable HTTP katika programu zako za MCP:

- **Sasisha msimbo wa seva** kutumia `transport="streamable-http"` katika `mcp.run()`.
- **Sasisha msimbo wa mteja** kutumia `streamablehttp_client` badala ya mteja wa SSE.
- **Tekeleza msimamizi wa ujumbe** katika mteja kushughulikia arifa.
- **Jaribu ulinganifu** na zana na mitiririko ya kazi iliyopo.

### Kudumisha Ulinganifu

Inapendekezwa kudumisha ulinganifu na wateja wa SSE waliopo wakati wa mchakato wa uhamiaji. Hapa kuna mikakati:

- Unaweza kusaidia SSE na Streamable HTTP kwa kuendesha usafirishaji wote mbili kwenye anwani tofauti.
- Polepole hamia wateja kwenye usafirishaji mpya.

### Changamoto

Hakikisha unashughulikia changamoto zifuatazo wakati wa uhamiaji:

- Kuhakikisha wateja wote wasasishwe
- Kushughulikia tofauti katika utoaji wa arifa

## Mambo ya Usalama

Usalama unapaswa kuwa kipaumbele kikuu unapoanzisha seva yoyote, hasa unapotumia usafirishaji wa HTTP kama Streamable HTTP ndani ya MCP.

Unapotekeleza seva za MCP zenye usafirishaji wa HTTP, usalama huwa jambo kuu linalohitaji umakini wa hali ya juu kwa njia nyingi za mashambulizi na mbinu za ulinzi.

### Muhtasari

Usalama ni muhimu unapofungua seva za MCP kwa njia ya HTTP. Streamable HTTP huleta maeneo mapya ya mashambulizi na huhitaji usanidi makini.

Hapa kuna mambo muhimu ya kuzingatia kuhusu usalama:

- **Uhakiki wa Kichwa cha Origin**: Daima hakiki kichwa cha `Origin` ili kuzuia mashambulizi ya DNS rebinding.
- **Kufunga Localhost**: Kwa maendeleo ya ndani, funga seva kwa `localhost` ili kuzuia kuzifikisha kwenye mtandao wa umma.
- **Uthibitishaji**: Tekeleza uthibitishaji (mfano, funguo za API, OAuth) kwa utoaji wa uzalishaji.
- **CORS**: Sanidi sera za Kushiriki vyanzo vya Asili Tofauti (CORS) ili kupunguza upatikanaji.
- **HTTPS**: Tumia HTTPS katika uzalishaji ili kuokoa trafiki kwa usimbaji fiche.

### Miondoko Bora

Zaidi ya hayo, hapa kuna miondoko bora ya kufuata unapoanzisha usalama kwenye seva yako ya MCP inayotiririsha:

- Usiamini maombi yanayoingia bila uhakiki.
- Andika na fuatilia upatikanaji wote na makosa.
- Sasisha mara kwa mara utegemezi ili kufunga udhaifu wa usalama.

### Changamoto

Utaweka uso na changamoto wakati wa kutekeleza usalama katika seva zinazotiririsha za MCP:

- Kuweka usawa kati ya usalama na urahisi wa maendeleo
- Kuhakikisha ulinganifu na mazingira mbalimbali ya mteja

### Kazi: Jenga Programu Yako Ya MCP Inayotiririsha

**Hali ya Matukio:**
Jenga seva na mteja wa MCP ambapo seva inashughulikia orodha ya vitu (mfano, faili au nyaraka) na kutuma arifa kwa kila kitu kinachosindikwa. Mteja anapaswa kuonyesha kila arifa anaporipotiwa.

**Hatua:**

1. Tekeleza chombo cha seva kinachosindika orodha na kutuma arifa kwa kila kipengee.
2. Tekeleza mteja mwenye msimamizi wa ujumbe ili kuonyesha arifa kwa wakati halisi.
3. Jaribu utekelezaji wako kwa kuendesha seva na mteja, na tazama arifa.

[Solution](./solution/README.md)

## Kusoma Zaidi & Hatua Zifuatazo?

Ili kuendelea na safari yako na utiririshaji wa MCP na kupanua maarifa, sehemu hii inatoa rasilimali za ziada na hatua zinazopendekezwa kwa kujenga programu zilizoendelea zaidi.

### Kusoma Zaidi

- [Microsoft: Utangulizi wa HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Matukio Yanayotumwa na Seva (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS katika ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Maombi ya Kutiririsha](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Hatua Zifuatazo?

- Jaribu kujenga zana za MCP zilizoendelea zaidi zinazotumia utiririshaji kwa uchambuzi wa wakati halisi, mazungumzo, au uhariri wa pamoja.
- Chunguza kuunganisha utiririshaji wa MCP na mifumo ya mbele (React, Vue, n.k.) kwa masasisho ya moja kwa moja ya UI.
- Ifuatayo: [Kutumia AI Toolkit kwa VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->