# HTTPS voogedastus mudelikonteksti protokolliga (MCP)

See peatükk annab põhjaliku juhendi turvalise, skaleeritava ja reaalajas voogedastuse rakendamiseks Mudelikonteksti Protokolli (MCP) abil HTTPS-is. Käsitletakse voogedastuse motivatsiooni, saadaolevaid transpordimehhanisme, kuidas MCP-s voogedastavat HTTP-t rakendada, turvalisuse parimaid tavasid, SSE-st migreerimist ning praktilisi juhiseid oma voogedastavate MCP rakenduste ehitamiseks.

> **Vaatame tulevikku:** see õppetund kirjeldab voogedastavat HTTP-d vastavalt **MCP spetsifikatsioonile 2025-11-25**, kus sessioon luuakse `initialize` ajal ja kinnitatakse `Mcp-Session-Id` päisega. Versiooni `2026-07-28` vabastusversioon eemaldab täielikult kätlemise ja sessiooni ID, muutes iga päringu enesesisalduvaks ja suunatavaks mistahes serveri eksemplari juurde ilma kleepuvate sessioonideta. Vaata üksikasju [Mis muutub MCP-s: 2026-07-28 vabastusversioon](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Transpordimehhanismid ja voogedastus MCP-s

See jaotis uurib MCP-s saadaolevaid erinevaid transpordimehhanisme ja nende rolli võimaldamaks reaalajas voogedastust klientide ja serverite vaheliseks sideks.

### Mis on transpordimehhanism?

Transpordimehhanism määrab, kuidas andmeid vahetatakse kliendi ja serveri vahel. MCP toetab mitut transporditüüpi, mis sobivad erinevate keskkondade ja nõuetega:

- **stdio**: Standardne sisend/väljund, sobib lokaalsetele ja käsureapõhistele tööriistadele. Lihtne, kuid mitte sobiv veebile või pilvekeskkonda.
- **SSE (serveripoolsed sündmused)**: Võimaldab serveritel edastada klientidele HTTP kaudu reaalajas uuendusi. Sobib hästi veebikasutajaliidesteks, kuid on piiratult skaleeritav ja paindlik. Alates MCP spetsifikatsioonist 2025-06-18 on eraldiseisev SSE transpordimehhanism asendatud "Voogedastava HTTP" transpordiga.
- **Voogedastav HTTP**: Kaasaegne HTTP-põhine voogedastuse transport, toetab teavitusi ja paremat skaleeritavust. Soovitatav enamikuks tootmis- ja pilvesituatsioonidest.

### Võrdlustabel

Vaata allolevat võrdlustabelit, et mõista nende transpordimehhanismide erinevusi:

| Transport         | Reaalajas uuendused | Voogedastus | Skaleeritavus | Kasutusjuhtum          |
|-------------------|--------------------|-------------|---------------|-------------------------|
| stdio             | Ei                 | Ei          | Madal         | Kohalikud CLI tööriistad |
| SSE               | Jah                | Jah         | Keskmine      | Veeb, reaalajas uuendused |
| Voogedastav HTTP  | Jah                | Jah         | Kõrge         | Pilv, mitmekliendiline   |

> **Nõuanne:** Õige transpordi valik mõjutab jõudlust, skaleeritavust ja kasutajakogemust. **Voogedastav HTTP** on soovitatav kaasaegsetele, skaleeritavatele ja pilvevalmis rakendustele.

Pane tähele eelnevate peatükkide transpordimehhanisme stdio ja SSE ning seda, kuidas selles peatükis käsitletakse voogedastavat HTTP-d.

## Voogedastus: kontseptsioonid ja motivatsioon

Voogedastuse põhikontseptsioonide ja motiivide mõistmine on oluline tõhusate reaalajas suhtluse süsteemide rakendamiseks.

**Voogedastus** on võrguprogrammeerimise tehnika, mis võimaldab andmeid saata ja vastu võtta väikestes, hallatavates tükkides või sündmuste jadas, asemel et oodata kogu vastuse korraga valmis saamist. See on eriti kasulik järgmistel juhtudel:

- Suured failid või andmekogumid.
- Reaalajas uuendused (nt vestlus, edenemisribad).
- Pikaajalised arvutused, kus soovitakse hoida kasutajat kursis.

Siin on, mida voogedastusest üldiselt teadma peaks:

- Andmed edastatakse järk-järgult, mitte korraga.
- Klient saab andmeid töödelda, kui need saabuvad.
- Vähendab tajutu viivitust ja parandab kasutajakogemust.

### Miks kasutada voogedastust?

Voogedastuse kasutamise põhjused on järgmised:

- Kasutajad saavad tagasisidet kohe, mitte ainult lõpus
- Võimaldab reaalajas rakendusi ja reageerivaid kasutajaliideseid
- Võrgukasutus ja arvutusressursside tõhusam kasutamine

### Lihtne näide: HTTP voogedastusserver ja klient

Siin on lihtne näide, kuidas voogedastust saab rakendada:

#### Python

**Server (Python, kasutades FastAPI-d ja StreamingResponse-i):**

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

**Klient (Python, kasutades requests-i):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

See näide demonstreerib serverit, mis saadab klientidele järjestikku sõnumeid niipea, kui need saadaval on, selle asemel et oodata kõigi sõnumite valmimist.

**Kuidas see töötab:**

- Server genereerib iga sõnumi kohe, kui see on valmis.
- Klient saab ja prindib iga tükikese kohe, kui see saabub.

**Nõuded:**

- Server peab kasutama voogedastusvastust (nt `StreamingResponse` FastAPI-s).
- Klient peab vastust töötluses vooguna käitlema (`stream=True` requests-is).
- Sisutüüp on tavaliselt `text/event-stream` või `application/octet-stream`.

#### Java

**Server (Java, kasutades Spring Booti ja serveripoolseid sündmusi):**

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

**Klient (Java, kasutades Spring WebFlux WebClient-i):**

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

**Java rakenduse märkused:**

- Kasutab Spring Booti reaktiivset virna koos `Flux` voogedastuseks
- `ServerSentEvent` pakub struktureeritud sündmuste voogedastust koos sündmusetüüpidega
- `WebClient` koos `bodyToFlux()` võimaldab reaktiivset voo tarbimist
- `delayElements()` simuleerib töötlemise aega sündmuste vahel
- Sündmustel võivad olla tüübid (`info`, `result`) parema kliendihaldamise jaoks

### Võrdlus: klassikaline voogedastus vs MCP voogedastus

Voogedastuse erinevused traditsioonilises ja MCP viisides saab kujutada järgmiselt:

| Omadus                 | Klassikaline HTTP voogedastus   | MCP voogedastus (teavitused)    |
|------------------------|--------------------------------|---------------------------------|
| Põhivastus             | Tükkidena                     | Üksik, lõpus                    |
| Edenemise uuendused    | Saadetakse andmetükkidena      | Saadetakse teavitustena          |
| Kliendi nõuded         | Peab voogu töötlema             | Peab rakendama sõnumihalduri     |
| Kasutusjuhtum          | Suured failid, AI tokeni vood  | Edenemine, logid, reaalajas tagasiside |

### Märkimisväärsed erinevused

Lisaks on siin mõned olulised erinevused:

- **Suhtlusmuster:**
  - Klassikaline HTTP voogedastus: kasutab lihtsat tükkideks edastamist andmete saatmiseks
  - MCP voogedastus: kasutab struktureeritud teavitussüsteemi JSON-RPC protokolliga

- **Sõnumi formaat:**
  - Klassikaline HTTP: lihttekst tükkidena reavahedega
  - MCP: struktureeritud LoggingMessageNotification objektid koos metaandmetega

- **Kliendi rakendus:**
  - Klassikaline HTTP: lihtne klient, mis töötleb voogedastusvastuseid
  - MCP: keerukam klient sõnumihalduriga, mis töötleb erineva tüübi sõnumeid

- **Edenemise uuendused:**
  - Klassikaline HTTP: edenemine on osa põhivoo vastusest
  - MCP: edenemine saadetakse eraldi teavitussõnumitena, põhivastus tuleb lõpus

### Soovitused

Mõned soovitused klassikalise voogedastuse (`/stream` endpoint) ja MCP voogedastuse valikul:

- **Lihtsate voogedastusvajaduste korral:** klassikaline HTTP voogedastus on lihtsam rakendada ja piisav põhilisteks vajadusteks.

- **Keerulisemate, interaktiivsete rakenduste jaoks:** MCP voogedastus pakub struktureeritumat lähenemist rikkalikumate metaandmete ja teavituste ning lõpptulemuste eraldamisega.

- **Tehisintellekti rakendustele:** MCP teavitussüsteem on eriti kasulik pikaajaliste AI ülesannete puhul, kus soovitakse kasutajat teavitada edenemisest.

## Voogedastus MCP-s

Olgu, oled näinud seni soovitusi ja võrdlusi klassikalise ja MCP voogedastuse vahel. Vaatame nüüd täpsemalt, kuidas voogedastust MCP-s kasutada.

MCP raamistiku sees voogedastus töötab nii, et ehitada vastutulelikke rakendusi, mis annavad kasutajale reaalajas tagasisidet pikaajaliste operatsioonide käigus.

MCP-s pole voogedastus peamise vastuse tükeldamine, vaid hoopis **teavituste** saatmine kliendile tööriista päringu töötlemise ajal. Need teavitused võivad sisaldada edenemise uuendusi, logisid või muid sündmusi.

### Kuidas see töötab

Põhitulemus saadetakse ikka ühe vastusena. Kuid teavitusi saab töötluse ajal saata eraldi sõnumitena ja seeläbi uuendada klienti reaalajas. Klient peab suutma neid teavitusi vastu võtta ja kuvada.

## Mis on teavitus?

Me rääkisime "teavitusest", mis see MCP kontekstis tähendab?

Teavitus on sõnum, mida server saadab kliendile, et informeerida edenemise, oleku või muude sündmuste kohta pikaajalise toimingu ajal. Teavitused parandavad läbipaistvust ja kasutajakogemust.

Näiteks peaks klient saatma teavituse kohe, kui serveriga on esmane kätlemine tehtud.

Teavitus näeb JSON sõnumina välja umbes nii:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Teavitused kuuluvad MCP-s teemale ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Märkus vananemise kohta:** `2026-07-28` MCP spetsifikatsiooni vabastusversioon märkab Logging primitiivi aegunuks ja eelistab stdio transpordiks `stderr` ja struktureeritud jälgitavuseks OpenTelemetryd. Logging töötab endiselt versioonis `2025-11-25` ja vähemalt aasta aega pärast ametlikku aegumist. Vaata üksikasju [Mis muutub MCP-s: 2026-07-28 vabastusversioon](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Loggingu toimima saamiseks peab server lubama selle funktsioonina/nõudena järgmiselt:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Sõltuvalt kasutatava SDK-st võib logging olla vaikimisi lubatud või võib olla vaja see serveri konfiguratsioonis selgesõnaliselt lubada.

Teavitustel on erinevad tüübid:

| Tase       | Kirjeldus                     | Kasutusnäide                   |
|------------|------------------------------|-------------------------------|
| debug      | Üksikasjalik silumisinfo      | Funktsioonide sisenemise/väljumise punktid |
| info       | Üldine informatiivne sõnum    | Tegevuse edenemise uuendused  |
| notice     | Tavalised, kuid olulised sündmused | Konfiguratsiooni muutused     |
| warning    | Hoiatusolukorrad              | Ajavahemikus vananenud funktsioonide kasutamine |
| error      | Veateated                    | Tegevuse ebaõnnestumised     |
| critical   | Kriitilised olukorrad         | Süsteemikomponendi tõrked    |
| alert      | Kohene tegutsemisvajadus      | Andmete korruptsiooni tuvastamine |
| emergency  | Süsteem on kasutamiskõlbmatu  | Täielik süsteemirike        |

## Teavituste rakendamine MCP-s

Teavituste rakendamiseks MCP-s tuleb nii serveri kui ka kliendi poolel seadistada reaalajas uuenduste töötlemine. See võimaldab rakendusel anda kasutajale kohest tagasisidet pikaajaliste toimingute läbiviimisel.

### Serveripool: teavituste saatmine

Alustame serveripoolest. MCP-s määratled tööriistad, mis saavad päringu töötlemise ajal teavitusi saata. Server kasutab konteksti objekti (tavaliselt `ctx`), et sõnumeid kliendile saata.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Eeltoodud näites saadab `process_files` tööriist kolme teavitust kliendile, kui ta töötleb iga faili. `ctx.info()` meetodit kasutatakse informatiivsete sõnumite saatmiseks.

Lisaks, teavituste lubamiseks peab server kasutama voogedastavat transporti (nt `streamable-http`) ja klient rakendama teavituste töötlemiseks sõnumihalduri. Siin on, kuidas seadistada server kasutama `streamable-http` transporti:

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

Selles .NET näites on `ProcessFiles` tööriist tähistatud `Tool` atribuudiga ja saadab klientidele kolm teavitust iga faili töötlemisel. Informatiivsete sõnumite saatmiseks kasutatakse `ctx.Info()` meetodit.

Teavituste lubamiseks oma .NET MCP serveris veendu, et kasutad voogedastavat transporti:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Kliendipool: teavituste vastuvõtt

Klient peab rakendama sõnumihalduri teavituste töötlemiseks ja kuvamiseks, kui need saabuvad.

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

Eeltoodud koodis kontrollib funktsioon `message_handler`, kas saabuv sõnum on teavitus. Kui on, prindib teavituse; muul juhul töötleb tavapäraselt serveri sõnumit. Samuti on märgitud, kuidas `ClientSession` initsialiseeritakse `message_handler`-iga saabuvate teavituste jaoks.

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

Selles .NET näites kontrollib `MessageHandler` funktsioon, kas saabuv sõnum on teavitus. Kui on, kuvab selle; muul juhul töötleb tavapärast serverisõnumit. `ClientSession` initsialiseeritakse sõnumihalduriga `ClientSessionOptions` kaudu.

Teavituste lubamiseks veendu, et server kasutab voogedastavat transporti (nt `streamable-http`) ja klient rakendab sõnumihalduri teavituste töötlemiseks.

## Edenemise teavitused ja stsenaariumid

See jaotis selgitab MCP edasimineku teavituste kontseptsiooni, miks need on olulised ning kuidas neid rakendada voogedastava HTTP abil. Samuti leiad praktilise ülesande oma teadmiste kinnistamiseks.

Edenemise teavitused on reaalajas sõnumid, mida server saadab kliendile pikaajaliste operatsioonide ajal. Selle asemel, et oodata kogu protsessi lõpetamist, hoiab server klienti kursis jooksva olekuga. See parandab läbipaistvust, kasutajakogemust ja lihtsustab silumist.

**Näide:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Miks kasutada edenemise teavitusi?

Edenemise teavitused on vajalikud mitmel põhjusel:

- **Parem kasutajakogemus:** kasutajad näevad uuendusi töö edenemisel, mitte ainult lõpus.
- **Reaalajas tagasiside:** kliendid saavad kuvada edenemisribasid või logisid, muutes rakenduse tundmuse reageerivaks.
- **Lihtsam silumine ja jälgimine:** arendajad ja kasutajad näevad, kus protsess võib aeglustuda või kinni jääda.

### Kuidas rakendada edenemise teavitusi

Siin on, kuidas MCP-s edenemise teavitusi rakendada:

- **Serveripool:** Kasuta `ctx.info()` või `ctx.log()` teavituste saatmiseks iga töödeldava üksuse kohta. See saadab sõnumi kliendile enne põhivastuse valmimist.
- **Kliendipool:** Rakenda sõnumihaldur, mis kuulab ja kuvab saabuvate teavituste sõnumeid. See eristab teavitusi ja lõpptulemust.

**Serveri näide:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Kliendi näide:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Turvalisuse kaalutlused

Kui implementeerite MCP servereid HTTP-põhiste transpordimeetoditega, muutub turvalisus ülimalt oluliseks teemaks, mis nõuab hoolikat tähelepanu mitmetele ründekanalitele ja kaitsemehhanismidele.

### Ülevaade

Turvalisus on kriitilise tähtsusega MCP serverite HTTP kaudu avalikustamisel. Streamable HTTP toob kaasa uued rünnetepinnad ja nõuab hoolikat konfiguratsiooni.

### Põhipunktid

- **Origin päise valideerimine**: Alati valideerige `Origin` päist, et vältida DNS-i sidumise rünnakuid.
- **Localhost sidumine**: Kohalikuks arenduseks siduge serverid `localhost`-iga, et vältida nende avalikku internetti avalikustamist.
- **Autentimine**: Kasutage tootmises autentimist (nt API võtmad, OAuth).
- **CORS**: Konfigureerige Cross-Origin Resource Sharing (CORS) poliitikad juurdepääsu piiramiseks.
- **HTTPS**: Kasutage tootmises HTTPS-i, et krüpteerida liiklust.

### Parimad tavad

- Ärge kunagi usaldage saabuvat päringut ilma valideerimiseta.
- Logige ja jälgige kogu juurdepääsu ja vigu.
- Uuendage regulaarselt sõltuvusi, et parandada turvaauke.

### Väljakutsed

- Turvalisuse ja arenduse lihtsuse tasakaalustamine
- Erinevate kliendi keskkondadega ühilduvuse tagamine

## Uuendamine SSE-lt Streamable HTTP-le

Rakendustes, mis kasutavad praegu Server-Sent Events (SSE), pakub üleminek Streamable HTTP-ile täiustatud võimalusi ja paremat pikaajalist jätkusuutlikkust teie MCP rakendustes.

### Miks uuendada?

On kaks veenvat põhjust uuendada SSE-lt Streamable HTTP-le:

- Streamable HTTP pakub paremat skaleeritavust, ühilduvust ja rikkalikumat teavituste tuge kui SSE.
- See on soovitatav transpordimeetod uute MCP rakenduste jaoks.

### Migratsiooni sammud

Siin on, kuidas saate oma MCP rakendustes üle minna SSE-lt Streamable HTTP-le:

- **Uuendage serveri koodi**, et kasutada `transport="streamable-http"` `mcp.run()`-s.
- **Uuendage kliendi koodi**, et kasutada `streamablehttp_client` asemel SSE klienti.
- **Rakendage sõnumikäsitleja** kliendis teavituste töötlemiseks.
- **Testige ühilduvust** olemasolevate tööriistade ja töösuundadega.

### Ühilduvuse säilitamine

Soovitatav on säilitada ühilduvus olemasolevate SSE klientidega migratsiooni käigus. Siin on mõned strateegiad:

- Võite toetada nii SSE kui ka Streamable HTTP-d, käivitades mõlemad transpordid erinevatel lõpp-punktidel.
- Migreerige kliente järk-järgult uuele transpordile.

### Väljakutsed

Veenduge, et migratsiooni ajal lahendaksite järgmised väljakutsed:

- Kõigi klientide uuendamine
- Teavituste edastuse erinevuste käsitlemine

## Turvalisuse kaalutlused

Turvalisus peaks olema prioriteet kõigi serverite implementeerimisel, eriti HTTP-põhiste transpordimeetodite nagu Streamable HTTP kasutamisel MCP-s.

Kui implementeerite MCP servereid HTTP-põhiste transpordimeetoditega, muutub turvalisus ülimalt oluliseks teemaks, mis nõuab hoolikat tähelepanu mitmetele ründekanalitele ja kaitsemehhanismidele.

### Ülevaade

Turvalisus on kriitilise tähtsusega MCP serverite HTTP kaudu avalikustamisel. Streamable HTTP toob kaasa uued rünnetepinnad ja nõuab hoolikat konfiguratsiooni.

Siin on mõned peamised turvalisuse kaalutlused:

- **Origin päise valideerimine**: Alati valideerige `Origin` päist, et vältida DNS-i sidumise rünnakuid.
- **Localhost sidumine**: Kohalikuks arenduseks siduge serverid `localhost`-iga, et vältida nende avalikku internetti avalikustamist.
- **Autentimine**: Kasutage tootmises autentimist (nt API võtmed, OAuth).
- **CORS**: Konfigureerige Cross-Origin Resource Sharing (CORS) poliitikad juurdepääsu piiramiseks.
- **HTTPS**: Kasutage tootmises HTTPS-i, et krüpteerida liiklust.

### Parimad tavad

Lisaks on siin mõned parimad tavad, mida järgida turvalisuse rakendamisel teie MCP voogedastuse serveris:

- Ärge kunagi usaldage saabuvat päringut ilma valideerimiseta.
- Logige ja jälgige kogu juurdepääsu ja vigu.
- Uuendage regulaarselt sõltuvusi, et parandada turvaauke.

### Väljakutsed

Turvalisuse rakendamisel MCP voogedastuse serverites võite sattuda järgmistele väljakutsetele:

- Turvalisuse ja arenduse lihtsuse tasakaalustamine
- Erinevate kliendi keskkondadega ühilduvuse tagamine

### Ülesanne: Loo oma voogedastuse MCP rakendus

**Stsenaarium:**
Loo MCP server ja klient, kus server töötleb nimekirja elemente (nt faile või dokumente) ja saadab teavituse iga töötlema pandud elemendi kohta. Klient kuvab iga saabunud teavituse.

**Sammud:**

1. Rakenda serveri tööriist, mis töötleb nimekirja ja saadab teavitusi iga elemendi kohta.
2. Rakenda klient, millel on sõnumikäsitleja teavituste reaalajas kuvamiseks.
3. Testi oma rakendust, käivitades nii serveri kui ka kliendi ning vaata teavitusi.

[Lahendus](./solution/README.md)

## Edasine lugemine & mis edasi?

Et jätkata oma teekonda MCP voogedastusega ja laiendada oma teadmisi, pakub see jaotis täiendavaid ressursse ja soovitatavaid järgmisi samme keerukamate rakenduste loomiseks.

### Edasine lugemine

- [Microsoft: Sissejuhatus HTTP voogedastusse](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS ASP.NET Core'is](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Voogedastuse päringud](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Mis edasi?

- Proovi luua keerukamaid MCP tööriistu, mis kasutavad voogedastust reaalajas analüütikaks, vestluseks või ühiseks redigeerimiseks.
- Uuri, kuidas integreerida MCP voogedastus esiplaaniraamistikega (React, Vue jne) elavate kasutajaliidese uuenduste jaoks.
- Järgmine: [AI tööriistakomplekti kasutamine VSCode'is](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->