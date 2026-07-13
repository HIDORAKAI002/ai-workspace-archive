# HTTPS voogedastus koos mudeli konteksti protokolliga (MCP)

See peatükk annab põhjaliku juhendi turvalise, skaleeritava ja reaalajas voogedastuse rakendamiseks mudeli konteksti protokolli (MCP) kasutades HTTPS-i kaudu. Käsitletakse voogedastuse motivatsiooni, saadaval olevaid transpordimeetodeid, seda, kuidas MCP-s voogedastavat HTTP-d rakendada, turvalisuse parimaid tavasid, migratsiooni SSE-lt ning praktilisi juhiseid oma voogedastavate MCP-rakenduste loomiseks.

> **Tulevikuvaade:** see õppetund kirjeldab Streamable HTTP-d all **MCP spetsifikatsioon 2025-11-25** järgi, kus sessioon luuakse `initialize` käigus ja fikseeritakse `Mcp-Session-Id` päisega. `2026-07-28` versiooni kandidaat eemaldab tervitusprotsessi ja sessiooni ID täielikult, tehes iga päringu iseseisvaks ja suunatavaks mis tahes serveri instantsi juurde ilma püsiseanssideta. Vaata üksikasju aadressil [Mis MCP-s muutub: 2026-07-28 väljapandud versioon](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## MCP transpordimehhanismid ja voogedastus

Selles jaotises uuritakse erinevaid MCP-s saadaolevaid transpordimehhanisme ja nende rolli võimaldamaks reaalajas suhtlust klientide ja serverite vahel.

### Mis on transpordimehhanism?

Transpordimehhanism määratleb, kuidas andmeid kliendi ja serveri vahel vahetatakse. MCP toetab mitut transporditüüpi, et sobituda erinevate keskkondade ja nõuetega:

- **stdio**: Standardsisend/väljund, sobilik kohalikele ja käsureal põhinevatele tööriistadele. Lihtne, kuid ei sobi veebile ega pilvekeskkonda.
- **SSE (Server-Sent Events)**: Võimaldab serveritel HTTP kaudu klientidele reaalajas värskendusi saata. Sobib hästi veebi kasutajaliidesteks, kuid on piiratud skaleeritavuse ja paindlikkuse osas. Alates MCP spetsifikatsioonist 2025-06-18 on eraldiseisev SSE transpordimehhanism deprekeeritud ja asendatud "Streamable HTTP" transpordiga.
- **Streamable HTTP**: Kaasaegne HTTP-põhine voogedastuse transport, toetab teavitusi ja paremat skaleeritavust. Soovitatav enamike tootmiskeskkondade ja pilverscenario puhul.

### Võrdlustabel

Vaata allolevat võrdlustabelit, et mõista nende transpordimehhanismide erinevusi:

| Transport         | Reaalajas värskendused | Voogedastus | Skaleeritavus | Kasutamisjuhtum          |
|-------------------|------------------------|-------------|---------------|--------------------------|
| stdio             | Ei                     | Ei          | Madal         | Kohalikud CLI tööriistad |
| SSE               | Jah                    | Jah         | Keskmine      | Veeb, reaalajas värskendused |
| Streamable HTTP   | Jah                    | Jah         | Kõrge         | Pilv, mitmekliendiline   |

> **Nipp:** Õige transpordi valik mõjutab jõudlust, skaleeritavust ja kasutajakogemust. **Streamable HTTP** on soovitatav moodsate, skaleeritavate ja pilvevalmis rakenduste jaoks.

Pane tähele eelnevatest peatükkidest tuttavaid stdio ja SSE transpordeid ning et selles peatükis käsitletakse voogedastava HTTP transpordimehhanismi.

## Voogedastus: kontseptsioonid ja motivatsioon

Voogedastuse põhimõtete ja motivatsiooni mõistmine on vajalik tõhusa reaalajas suhtlussüsteemi loomisel.

**Voogedastus** on võrgu programmeerimises kasutatav tehnika, mis võimaldab andmeid saata ja vastu võtta väikeste, hallatavate tükkidena või sündmuste järjestusena, mitte oodata kogu vastuse täielikku valmisolekut. See on eriti kasulik:

- Suurte failide või andmekogumite puhul.
- Reaalajas värskenduste (nt vestlused, edenemisribad) korral.
- Pikaajalistel arvutustel, kus soovitakse kasutajat kursis hoida.

Siin on voogedastuse olulisemad põhimõtted kõrgel tasemel:

- Andmed edastatakse järk-järgult, mitte korraga täielikult.
- Klient suudab andmeid töödelda kohe, kui need saabuvad.
- Vähendab tajutavat latentsust ja parandab kasutajakogemust.

### Miks kasutada voogedastust?

Voogedastuse kasutamise põhjused on järgmised:

- Kasutajad saavad tagasisidet kohe, mitte ainult lõpus.
- Võimaldab reaalajas rakendusi ja reageerivaid kasutajaliideseid.
- Võrgu- ja arvutusressursside tõhusam kasutamine.

### Lihtne näide: HTTP voogedastusserver ja klient

Siin on lihtne näide, kuidas voogedastus võib toimida:

#### Python

**Server (Python, kasutades FastAPI ja StreamingResponse):**

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

**Klient (Python, kasutades requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

See näide demonstreerib serverit, mis saadab kliendile sõnumijadana sellisel kujul, nagu need muutuvad kättesaadavaks, mitte ei oota kõigi sõnumite valmisolekut.

**Kuidas see toimib:**

- Server edastab iga sõnumi kohe, kui see on valmis.
- Klient võtab iga tükikese vastu ja prindib selle.

**Nõuded:**

- Server peab kasutama voogedastusvastust (nt FastAPI `StreamingResponse`).
- Klient peab käsitlema vastust voona (`stream=True` requests-is).
- Sisutüüpi kasutatakse tavaliselt `text/event-stream` või `application/octet-stream`.

#### Java

**Server (Java, kasutades Spring Boot ja Server-Sent Events):**

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

**Klient (Java, kasutades Spring WebFlux WebClient):**

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

**Java rakendusmärkused:**

- Kasutab Spring Boot reaktiivset virnastust koos `Flux` voogedastuseks
- `ServerSentEvent` pakub struktureeritud sündmuste voogu sündmuse tüüpidega
- `WebClient` koos `bodyToFlux()` võimaldab reaktiivset voogedastustarbimist
- `delayElements()` simuleerib töötlemise vahelejääke
- Sündmustel võivad olla tüübid (`info`, `result`), mis lihtsustavad kliendi töötlust

### Võrdlus: klassikaline voogedastus vs MCP voogedastus

Alljärgnev tabel näitab erinevusi voogedastuse toimimises klassikalise ja MCP lähenemise vahel:

| Omadus                | Klassikaline HTTP voogedastus | MCP voogedastus (teavitused)      |
|-----------------------|-------------------------------|-----------------------------------|
| Peamine vastus        | Jagatud tükkidena             | Üksik vastus lõpus                |
| Edenemise värskendused | Saadetakse andmetükkidena     | Saadetakse teavitustena           |
| Kliendi nõuded         | Peab töötlema voogu           | Peab rakendama sõnumikäsitleja    |
| Kasutusjuhtum          | Suured failid, AI tokenite voo | Edenemine, logid, reaalajas tagasiside |

### Märkimisväärsed erinevused

Veel mõned olulisemad erinevused:

- **Kommunikatsioonimuster:**
  - Klassikaline HTTP voogedastus: kasutab lihtsat tükkide kaupa ülekannet
  - MCP voogedastus: kasutab struktureeritud teavitussüsteemi JSON-RPC protokolliga

- **Sõnumi formaat:**
  - Klassikaline HTTP: tavaline tekst koos reavahedega
  - MCP: struktureeritud LoggingMessageNotification objektid koos metainfoga

- **Kliendi teostus:**
  - Klassikaline HTTP: lihtne klient, mis töötleb voogedastusvastuseid
  - MCP: suuremahuline klient sõnumikäsitlejaga, mis töötleb erineva tüüpi sõnumeid

- **Edenemise värskendused:**
  - Klassikaline HTTP: edenemine on peamise voovastuse osa
  - MCP: edenemine saadetakse eraldi teavitustena, peamine vastus tuleb lõpuks

### Soovitused

Mõned soovitused klassikalise voogedastuse (`/stream` lõpp-punkt) ja MCP voogedastuse vahel valimiseks:

- **Lihtsate voogedastusvajaduste korral:** Klassikaline HTTP voogedastus on kergemini rakendatav ja piisav põhivajaduste katmiseks.

- **Komplekssed, interaktiivsed rakendused:** MCP voogedastus pakub struktureeritumat lähenemist, rikkalikuma metainfoga ning eristab teavitused ja lõplikud tulemused.

- **Tehisintellekti rakenduste puhul:** MCP teavitussüsteem on eriti kasulik pikaajaliste AI ülesannete puhul, kus soovitakse kasutajat tööst pidevalt teavitada.

## Voogedastus MCP-s

Nüüd, kui oled näinud mõningaid soovitusi ja võrdlusi klassikalise ja MCP voogedastuse kohta, vaatame täpsemalt, kuidas voogedastust MCP raamistiku raames kasutada.

Mõistmine, kuidas voogedastus MCP sees töötab, on oluline reageerivate rakenduste loomiseks, mis annavad kasutajale reaalajas tagasisidet pikaajaliste protsesside ajal.

MCP-s ei pea voogedastus peamiseks vastuseks tükikaupa saatmist, vaid **teavituste** saatmist kliendile töötluse ajal. Need teavitused võivad sisaldada edenemisteateid, logisid või muid sündmusi.

### Kuidas see töötab

Peamine tulemus saadetakse ikka ühe vastusena. Kuid töötluse ajal saab klienti uuendada teavituste saatmisega eraldi sõnumitena. Klient peab suutma neid teavitusi vastu võtta ja kuvada.

## Mis on teavitus?

Me mainisime "teavitust". Mida see MCP kontekstis tähendab?

Teavitus on sõnum, mille server saadab kliendile, et teavitada edenemisest, olekust või muudest sündmustest pikaajalise operatsiooni ajal. Teavitused parandavad läbipaistvust ja kasutajakogemust.

Näiteks peab klient saatma teavituse kohe, kui algne tervitus serveriga on tehtud.

Teavitus näeb välja JSON sõnumina järgmiselt:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Teavitused kuuluvad MCP teema "Logging" alla, mida saab leida aadressil ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Logimise tööle saamiseks peab server selle lubama omadusena nii:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> SDK-st sõltuvalt võib logimine olla vaikimisi lubatud või võib olla vajalik see serveri konfiguratsioonis eraldi sisse lülitada.

On erinevat tüüpi teavitusi:

| Tase       | Kirjeldus                     | Näidiskasutus                  |
|------------|------------------------------|-------------------------------|
| debug      | Detailne silumisinfo          | Funktsioonide sisenemised/väljumised |
| info       | Üldised informatiivsed sõnumid | Operatsiooni edenemise värskendused |
| notice     | Tavalised, kuid olulised sündmused | Konfiguratsiooni muudatused     |
| warning    | Hoiatused                    | Vana funktsiooni kasutamine     |
| error      | Veatingimused                 | Operatsiooni ebaõnnestumised    |
| critical   | Kriitilised tingimused       | Süsteemi komponendi rikkeid     |
| alert      | Vajalik kohene tegevus       | Andmete korruptsiooni tuvastamine |
| emergency  | Süsteem on kasutuskõlbmatu    | Täielik süsteemi rike           |

## Teavituste rakendamine MCP-s

Teavituste rakendamiseks MCP-s pead seadistama nii serveri kui ka kliendi, et töödelda reaalajas värskendusi. See võimaldab rakendusel anda kasutajale kohest tagasisidet pikaajaliste toimekorraldustena.

### Serveripoolne teavituste saatmine

Alustame serveripoolsest küljest. MCP-s määratled tööriistad, mis suudavad saata teavitusi päringute töötlemise ajal. Server kasutab konteksti objekti (tavaliselt `ctx`), et saata sõnumeid kliendile.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Eelnevas näites saadab `process_files` tööriist kolm teavitust kliendile failide töötlemise ajal. `ctx.info()` meetodit kasutatakse informatiivsete sõnumite saatmiseks.

Lisaks, et teavitused toimiksid, peab server kasutama voogedastustransporti (nt `streamable-http`) ja klient rakendama sõnumikäsitlejat teavituste töötlemiseks. Siin on näide, kuidas seadistada server kasutamaks `streamable-http` transporti:

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

Selles .NET näites on `ProcessFiles` tööriist märgistatud `Tool` atribuudi abil ning saadab kolm teavitust kliendile failide töötlemisel. `ctx.Info()` meetod saadab informatiivseid sõnumeid.

Et MCP serveris teavitusi lubada, veendu, et kasutad voogedastustransporti:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Kliendipoolne teavituste vastuvõtt

Klient peab rakendama sõnumikäsitleja, mis töötleb ja kuvab saabuvad teavitused.

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

Eelnevas koodis kontrollib `message_handler` funktsioon, kas saabuv sõnum on teavitus. Kui on, prindib selle; muul juhul käsitleb sõnumit tavapärasena. Samuti on näha, kuidas `ClientSession` algatatakse `message_handler` abil saabuvate teavituste töötlemiseks.

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

Selles .NET näites kontrollib `MessageHandler` funktsioon, kas sõnum on teavitus. Kui on, see kuvatakse; muul juhul töödeldakse sõnumit tavalisena. `ClientSession` algatatakse sõnumikäsitlejaga `ClientSessionOptions` kaudu.

Teavituste lubamiseks veendu, et server kasutab voogedastustransporti (nt `streamable-http`) ja klient rakendab sõnumikäsitleja.

## Edenemise teavitused ja stsenaariumid

See jaotis selgitab edenemise teavituste mõistet MCP-s, miks need on olulised ja kuidas neid Streamable HTTP abil rakendada. Leiad ka praktilise ülesande oma arusaama kinnistamiseks.

Edenemise teavitused on reaalajas sõnumid, mida server saadab kliendile pikaajalise töötluse käigus. Selle asemel, et oodata kogu protsessi lõppu, hoiab server klienti kursis praeguse olekuga. See parandab läbipaistvust, kasutajakogemust ja lihtsustab silumist.

**Näide:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Miks kasutada edenemise teavitusi?

Edenemise teavitused on olulised mitmel põhjusel:

- **Parem kasutajakogemus:** kasutajad näevad uuendusi töö käigus, mitte ainult lõpus.
- **Reaalajas tagasiside:** kliendid saavad kuvada edenemisribasid või logisid, muutes rakenduse tunduvaks reageerivaks.
- **Lihtsam silumine ja jälgimine:** arendajad ja kasutajad näevad, kus protsess võib aeglane või takerdunud olla.

### Kuidas edenemise teavitusi rakendada

Siin on, kuidas edenemise teavitusi MCP-s rakendada:

- **Serveris:** kasuta `ctx.info()` või `ctx.log()` teavituste saatmiseks iga üksiku töötluse sammu kohta. See saadab sõnumi kliendile enne lõplikku vastust.
- **Kliendis:** rakenda sõnumikäsitleja, mis kuulab ja kuvab teavitusi koheselt, eristades teavitused ja lõpliku tulemuse.

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

MCP serverite rakendamisel HTTP-põhiste transpordimplantatsioonidega muutub turvalisus ülimalt oluliseks teemaks, mis nõuab hoolikat tähelepanu paljudele ründemisvektoritele ja kaitsemehhanismidele.

### Ülevaade

Turvalisus on kriitilise tähtsusega, kui MCP servereid eksponeeritakse üle HTTP. Streamable HTTP avab uusi ründevektoreid ja nõuab hoolikat konfiguratsiooni.

### Põhipunktid
- **Päritolu päise valideerimine**: Alati valideeri `Origin` päist, et vältida DNS-taasesitusrünnakuid.
- **Localhosti sidumine**: Kohalikuks arenduseks ühenda serverid aadressiga `localhost`, et vältida nende avalikustamist internetis.
- **Autentimine**: Rakenda tootmiskeskkonnas autentimine (nt API-võtmed, OAuth).
- **CORS**: Sea sisse ristpäritolu jagamise (Cross-Origin Resource Sharing, CORS) poliitikad ligipääsu piiramiseks.
- **HTTPS**: Kasuta tootmiskeskkonnas HTTPS-i, et krüpteerida liiklus.

### Parimad tavad

- Ära usalda kunagi saabunud päringuid ilma valideerimiseta.
- Logi ja jälgi kõiki ligipääse ja vigu.
- Uuenda regulaarselt sõltuvusi, et paigata turvaaukusid.

### Väljakutsed

- Turvalisuse ja arenduse lihtsuse tasakaalustamine
- Tagada ühilduvus erinevate kliendikeskkondadega

## Üleminek SSE-lt Streamable HTTP-le

Rakenduste puhul, mis kasutavad praegu Server-Sent Events (SSE), pakub üleminek Streamable HTTP-le täiustatud võimalusi ja paremat pikaajalist jätkusuutlikkust MCP lahendustes.

### Miks uuendada?

On kaks veenvat põhjust, miks uuendada SSE-lt Streamable HTTP-le:

- Streamable HTTP pakub paremat skaleeritavust, ühilduvust ja rikkalikumat teavitustuge võrreldes SSE-ga.
- See on soovitatav transpordimehhanism uute MCP rakenduste jaoks.

### Ülemineku sammud

Siin on, kuidas saate oma MCP rakendustes üle minna SSE-lt Streamable HTTP-le:

- **Uuenda serveri kood** kasutama `transport="streamable-http"` `mcp.run()`-s.
- **Uuenda kliendi kood** kasutama `streamablehttp_client` asemel SSE klienti.
- **Rakenda sõnumikäsitleja** kliendis teavituste töötlemiseks.
- **Testi ühilduvust** olemasolevate tööriistade ja töövoogudega.

### Ühilduvuse säilitamine

Soovitatav on säilitada ühilduvus olemasolevate SSE klientidega ülemineku protsessi ajal. Mõned strateegiad:

- Võid toetada nii SSE-d kui Streamable HTTP-d, käivitades mõlemad transpordid erinevatel lõpp-punktidel.
- Migreeri kliente järk-järgult uuele transpordile.

### Väljakutsed

Veendu, et käsitleksid alljärgnevaid väljakutseid ülemineku ajal:

- Kõigi klientide ajakohastamine
- Erinevused teavituste edastamisel

## Turvakaalutlused

Turvalisus peaks olema esmatähtis mõlemas MCP serveri rakendamisel, eriti HTTP-põhiste transpordimehhanismide, näiteks Streamable HTTP puhul.

HTTP-põhiste MCP serverite juurutamisel muutub turvalisus ülioluliseks, nõudes hoolikat lähenemist erinevate rünnetektide ja kaitsemehhanismide osas.

### Ülevaade

Turvalisus on kriitiline MCP serverite HTTP kaudu avalikustamisel. Streamable HTTP avab uusi rünnekohapindu ning nõuab hoolikat konfiguratsiooni.

Siin on peamised turvakaalutlused:

- **Päritolu päise valideerimine**: Alati valideeri `Origin` päist, et vältida DNS-taasesitusrünnakuid.
- **Localhosti sidumine**: Kohalikus arenduses ühenda serverid aadressiga `localhost`, et vältida nende avalikustamist internetis.
- **Autentimine**: Rakenda tootmises autentimine (nt API-võtmed, OAuth).
- **CORS**: Sea sisse ristpäritolu jagamise poliitikad ligipääsu piiramiseks.
- **HTTPS**: Kasuta tootmises HTTPS-i, et andmeid krüpteerida.

### Parimad tavad

Lisaks on siin mõned parimad tavad MCP voogedastusserveri turvaliseks rakendamiseks:

- Ära usalda saabunud päringuid ilma valideerimiseta.
- Logi ja jälgi kõiki ligipääse ja vigu.
- Uuenda regulaarselt sõltuvusi, et parandada turvaauke.

### Väljakutsed

Turvalisuse juurutamine MCP voogedastusserverites võib esitada järgmisi väljakutseid:

- Turvalisuse ja arendusmugavuse tasakaalustamine
- Veenduda ühilduvuses erinevate kliendikeskkondadega

### Ülesanne: ehita oma voogedastusega MCP rakendus

**Stsenaarium:**
Loo MCP server ja klient, kus server töötleb esemete nimekirja (nt faile või dokumente) ning saadab teavituse iga töödeldud eseme kohta. Klient kuvab iga saabunud teavituse.

**Sammud:**

1. Rakenda serveri tööriist, mis töötleb nimekirja ja saadab iga eseme kohta teavituse.
2. Rakenda klient sõnumikäsitlejaga, et kuvada teavitusi reaalajas.
3. Testi lahendust, käivitades nii serveri kui kliendi, ning jälgi teavitusi.

[Lahendus](./solution/README.md)

## Lisalugemist ja mis edasi?

Et jätkata MCP voogedastusega seotud teadmiste omandamist ning arendada keerukamaid rakendusi, pakub see jaotis täiendavaid ressursse ja soovitatud edasisi samme.

### Lisalugemist

- [Microsoft: HTTPS voogedastus sissejuhatus](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS ASP.NET Core’is](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Voogedastusega päringud](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Mis edasi?

- Proovi luua keerukamaid MCP tööriistu, mis kasutavad voogedastust reaalajas analüütikaks, vestlusteks või koostööks.
- Uuri MCP voogedastuse integreerimist frontend raamistikudega (React, Vue jt) reaalajas kasutajaliidese uuenduste jaoks.
- Järgmine: [AI tööriistakomplekti kasutamine VSCode’is](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->