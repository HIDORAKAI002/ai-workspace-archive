# HTTPS voogedastus Model Context Protocoliga (MCP)

See peatükk annab põhjaliku juhendi turvalise, mastaapuva ja reaalajas voogedastuse rakendamiseks Model Context Protocoli (MCP) abil HTTPSi kaudu. Käsitletakse voogedastuse motivatsiooni, saadaval olevaid transpordimehhanisme, kuidas MCP-s voogedastavat HTTP-d rakendada, turvalisuse parimaid tavasid, üleminekut SSE-st ning praktilisi juhiseid oma voogedastuse MCP-rakenduste loomiseks.

## Transpordimehhanismid ja voogedastus MCP-s

See jaotis uurib erinevaid MCP-s saadaval olevaid transpordimehhanisme ja nende rolli reaalajas suhtluse võimaldamisel klientide ja serverite vahel.

### Mis on transpordimehhanism?

Transpordimehhanism määratleb, kuidas andmeid kliendi ja serveri vahel vahetatakse. MCP toetab mitut transporditüüpi, et sobituda erinevate keskkondade ja nõuetega:

- **stdio**: Standard sisend/väljund, sobib lokaalsetele ja käsureapõhistele tööriistadele. Lihtne, kuid ei sobi veebile ega pilve.
- **SSE (Server-Sent Events)**: Võimaldab serveritel saata kliendile realajas uuendusi HTTP kaudu. Sobib veebiliidestele, kuid piiratud mastaapsuse ja paindlikkusega. MCP Spetsifikatsiooni 2025-06-18 alusel on iseseisev SSE transpordimehhanism deprekeeritud ja asendatud "Voogedastatava HTTP" transpordiga.
- **Voogedastatav HTTP**: Kaasaegne HTTP-põhine voogedastuse transport, toetab teavitusi ja paremat mastaapsust. Soovitatav enamusele tootmis- ja pilve stsenaariumidele.

### Võrdlustabel

Vaata allolevat võrdlustabelit, et mõista nende transpordimehhanismide erinevusi:

| Transport         | Reaalajas uuendused | Voogedastus | Mastaapsus | Kasutusjuht        |
|-------------------|---------------------|-------------|------------|--------------------|
| stdio             | Ei                  | Ei          | Madal      | Kohalikud CLI tööriistad |
| SSE               | Jah                 | Jah         | Keskmine   | Veeb, reaalajas uuendused |
| Voogedastatav HTTP| Jah                 | Jah         | Kõrge      | Pilv, mitme kliendiga |

> **Vihje:** Õige transpordi valimine mõjutab jõudlust, mastaapsust ja kasutajakogemust. **Voogedastatav HTTP** on soovitatav kaasaegsete, mastaapuvate ja pilvevalmis rakenduste jaoks.

Pane tähele transpordeid stdio ja SSE, mida sulle eelnevates peatükkides näidati, ning kuidas voogedastatav HTTP on selle peatüki käsitletav transport.

## Voogedastus: kontseptsioonid ja motivatsioon

Voogedastuse põhikontseptsioonide ja motivatsioonide mõistmine on oluline tõhusa reaalajas suhtluse süsteemide rakendamiseks.

**Voogedastus** on võrguprogrammeerimise tehnika, mis võimaldab andmeid saata ja vastu võtta väikestes juhitavates osades või sündmuste jadana, mitte oodata kogu vastuse valmisolekut. See on eriti kasulik:

- Suurte failide või andmestike puhul.
- Reaalajas uuenduste puhul (nt vestlus, edenemisribad).
- Pikaajaliste arvutuste puhul, kus soovitakse kasutajat pidevalt teavitada.

Siin on voogedastuse põhitõed:

- Andmeid edastatakse järk-järgult, mitte korraga.
- Klient saab andmeid töödelda niipea, kui need saabuvad.
- Vähendab tajutavat latentsust ja parandab kasutajakogemust.

### Miks kasutada voogedastust?

Voogedastuse kasutamise põhjused on järgmised:

- Kasutajad saavad kohe tagasisidet, mitte ainult lõpus.
- Võimaldab reaalajas rakendusi ja reageerivaid kasutajaliideseid.
- Võrguga ja arvutusressurssidega tõhusam kasutus.

### Lihtne näide: HTTP voogedastusserver ja klient

Siin on lihtne näide, kuidas voogedastust rakendada:

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

See näide demonstreerib serveri saadetava sõnumite jada edastamist kliendile kohe, kui need muutuvad kättesaadavaks, selle asemel, et oodata kõigi sõnumite valmisolekut.

**Kuidas see töötab:**

- Server väljastab iga sõnumi kohe, kui see on valmis.
- Klient võtab vastu ja prindib iga osa kohe, kui see saabub.

**Nõuded:**

- Server peab kasutama voogedastusvastust (näiteks `StreamingResponse` FastAPI-s).
- Klient peab töötlema vastust vooguna (`stream=True` requestsis).
- Sisutüübiks on tavaliselt `text/event-stream` või `application/octet-stream`.

#### Java

**Server (Java, kasutades Spring Booti ja Server-Sent Events):**

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

**Klient (Java, kasutades Spring WebFlux WebClienti):**

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

- Kasutab Spring Booti reaktiivset kihti koos `Flux`-iga voogedastuseks
- `ServerSentEvent` tagab struktureeritud sündmuste voogedastuse sündmusetüüpidega
- `WebClient` koos `bodyToFlux()` võimaldab reaktiivset voogedastuse kasutust
- `delayElements()` simuleerib sündmustevahelist töötlemisaega
- Sündmused võivad omada tüüpe (`info`, `result`), et klient saaks neid paremini töödelda

### Võrdlus: klassikaline voogedastus vs MCP voogedastus

Erinevused klassikalise ja MCP voogedastuse vahel on järgmised:

| Omadus                 | Klassikaline HTTP voogedastus     | MCP voogedastus (teavitused)          |
|------------------------|----------------------------------|---------------------------------------|
| Peamine vastus         | Tükeldatud                        | Üksik, lõpus                          |
| Edenemisuudised        | Saadetakse andmetükkidena         | Saadetakse teavitustena              |
| Klientide nõuded        | Peab töötlema voogu               | Peab rakendama sõnumikäsitlejat      |
| Kasutusjuht             | Suured failid, tehisintellekti tokenite vood | Edenemine, logid, reaalajas tagasiside |

### Täheldatud võtmerdiffrentsid

Lisaks mõningad võtme erinevused:

- **Suhtlusmuster:**
  - Klassikaline HTTP voogedastus: Kasutab lihtsat tükeldatud andmeedastust
  - MCP voogedastus: Kasutab struktureeritud teavitussüsteemi JSON-RPC protokolliga

- **Sõnumivorming:**
  - Klassikaline HTTP: Lihtteksti tükid, mille lõpus reavahetus
  - MCP: Struktureeritud LoggingMessageNotification objektid metainfoga

- **Klientide rakendus:**
  - Klassikaline HTTP: Lihtne klient, mis töötleb voogvastuseid
  - MCP: Täpsem klient sõnumikäsitlejaga, mis töötab läbi erinevat tüüpi sõnumid

- **Edenemisuudised:**
  - Klassikaline HTTP: Edenemine osa peamise vastuse voost
  - MCP: Edenemine saadetakse eraldi teavitustena ning peamine vastus jõuab lõpus

### Soovitused

Mõned soovitused klassikalise voogedastuse (nagu üleval näidatud `/stream` lõpp-punkt) ja MCP voogedastuse vahel valides:

- **Lihtsate voogedastusvajaduste korral:** Klassikaline HTTP voogedastus on lihtsam rakendada ja piisav põhivajaduste jaoks.

- **Komplekssete, interaktiivsete rakenduste jaoks:** MCP voogedastus pakub struktureeritumat lähenemist, rikkalikumat metainfot ja eristab teavitusi lõplikest tulemustest.

- **Tehisintellekti rakendustele:** MCP teavitussüsteem on eriti kasulik pikaajaliste AI ülesannete puhul, kus kasutajatele soovitakse edusamme pidevalt näidata.

## Voogedastus MCP-s

Nüüd, kui oled näinud varasemaid soovitusi ja võrdlusi klassikalise ja MCP voogedastuse erinevustest, vaatame detailselt, kuidas saate voogedastust MCP raamistiku sees kasutada.

MCP-s ei seisne voogedastus peamise vastuse tükeldamises, vaid **teavituste** saatmises kliendile tööriista päringu töötlemise ajal. Need teavitused võivad sisaldada edenemise uuendusi, logisid või muid sündmusi.

### Kuidas see töötab

Peamine tulemus saadetakse ikka ühe vastusena. Kuid teavitusi saab töötluse ajal saata eraldi sõnumitena ja seega värskendada klienti reaalajas. Klient peab suutma neid teavitusi töödelda ja kuvada.

## Mis on teavitus?

Me mainisime "teavitust", mis see MCP kontekstis täpsemalt tähendab?

Teavitus on serveri kliendile saadetav sõnum, mis informeerib edenemise, staatuse või muude sündmuste kohta pikaajalise töö ajal. Teavitused parandavad läbipaistvust ja kasutajakogemust.

Näiteks peaks klient saatma teavituse kohe, kui algkättesaamine serveriga on tehtud.

Teavitus näeb välja järgmiselt JSON sõnumina:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Teavitused kuuluvad MCP-s teema alla nimega ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Logimise lubamiseks peab server lubama selle võimalusena järgmiselt:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Sõltuvalt kasutatavast SDK-st võib logimine olla vaikimisi lubatud või vaja võib olla see serverikontseptsioonis eksplicitse aktiveerida.

On erinevat tüüpi teavitusi:

| Tase      | Kirjeldus                     | Näite kasutusjuht            |
|-----------|------------------------------|-----------------------------|
| debug     | Üksikasjalik debugimise info  | Funktsiooni sisenemise/väljumise punktid |
| info      | Üldine informatsioonisõnum    | Operatsiooni edenemisuuendused |
| notice    | Tavalised, kuid olulised sündmused | Konfiguratsioonimuudatused    |
| warning   | Hoiatusolukorrad             | Deprekeeritud funktsioonide kasutamine |
| error     | Veateated                    | Operatsiooni ebaõnnestumised  |
| critical  | Kriitilised olukorrad        | Süsteemikomponentide tõrked   |
| alert     | Kohene tegevus on vajalik    | Andmekorruptsiooni tuvastamine |
| emergency | Süsteem on kasutuskõlbmatu   | Täielik süsteemirike         |

## Teavituste rakendamine MCP-s

Teavituste rakendamiseks MCP-s tuleb nii serveri kui ka kliendi pool valmis seada reaalajas uuenduste käsitlemiseks. See võimaldab sinu rakendusel pakkuda kasutajatele kohest tagasisidet pikaajaliste operatsioonide jooksul.

### Serveripool: teavituste saatmine

Alustame serveripoolest. MCP-s määratled tööriistad, mis saavad päringute töötlemise ajal teavitusi saata. Server kasutab kontekstobjekti (tavaliselt `ctx`), et saata sõnumeid kliendile.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Eelnevas näites saadab tööriist `process_files` kolm teavitust kliendile iga faili töötlemisel. `ctx.info()` meetodit kasutatakse informatiivsete sõnumite saatmiseks.

Lisaks tuleb teavituste lubamiseks veenduda, et server kasutab voogedastavat transporti (näiteks `streamable-http`) ja klient rakendab sõnumikäsitleja teavituste töötlemiseks. Näiteks serveri seadistamine `streamable-http` transpordiks:

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

Selles .NET näites kaunistatakse tööriist `ProcessFiles` atribuudi `Tool` abil ning see saadab kolm teavitust kliendile iga faili töötlemisel. `ctx.Info()` meetodit kasutatakse informatiivsete sõnumite saatmiseks.

Teavituste lubamiseks oma .NET MCP serveris tuleb kasutada voogedastavat transporti:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Kliendipool: teavituste vastuvõtt

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

Eelnevas koodis kontrollib funktsioon `message_handler`, kas saabuv sõnum on teavitus. Kui on, trükitakse see välja; kui ei, töödeldakse sõnumit tavalise serveri sõnumina. Pane tähele, kuidas `ClientSession` initsialiseeritakse koos `message_handler`iga teavituste töötlemiseks.

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

Selles .NET näites kontrollib funktsioon `MessageHandler`, kas saabuv sõnum on teavitus. Kui on, trükitakse see välja; kui ei, töödelakse võetud sõnumit tavalise serveri sõnumina. `ClientSession` initsialiseeritakse sõnumikäsitlejaga `ClientSessionOptions` kaudu.

Teavituste lubamiseks veendu, et server kasutab voogedastavat transporti (näiteks `streamable-http`) ja klient töötab sõnumikäsitlejaga teavituste töötlemiseks.

## Edenemisteavitused & stsenaariumid

See jaotis selgitab MCP edenemisteavituste kontseptsiooni, miks need on olulised ja kuidas neid voogedastatava HTTP abil rakendada. Lisaks on praktiline ülesanne arusaamise süvendamiseks.

Edenemisteavitused on serveri poolt kliendile saadetavad realajas sõnumid pikaajaliste operatsioonide ajal. Selle asemel, et oodata kogu protsessi lõppu, hoiab server klienti kursis praeguse olekuga. See parandab läbipaistvust, kasutajakogemust ja muudab tõrkeotsingu lihtsamaks.

**Näide:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Miks kasutada edenemisteavitusi?

Edenemisteavitused on olulised mitmel põhjusel:

- **Parem kasutajakogemus:** Kasutajad näevad uuendusi töö edenemise ajal, mitte ainult lõpus.
- **Reaalajas tagasiside:** Kliendid saavad kuvada edenemisribasid või logisid, muutes rakenduse reageerivaks.
- **Lihtsam tõrkeotsing ja jälgimine:** Arendajad ja kasutajad näevad, kus protsess võib olla aeglane või takerdunud.

### Kuidas edenemisteavitusi rakendada

Siin on, kuidas edenemisteavitusi MCP-s rakendada:

- **Serveris:** Kasuta `ctx.info()` või `ctx.log()` teavituste saatmiseks iga üksuse töötlemisel. See saadab sõnumi kliendile enne peamise tulemuse valmisolekut.
- **Kliendis:** Rakenda sõnumikäsitleja, mis kuulab ja kuvab saabumisel teavitusi. See käsitleja eristab teavitusi ja lõplikku tulemust.

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

## Turvareconsideratsioonid

HTTP-põhiste transpordite kasutamisel MCP serverite juures muutub turvalisus äärmiselt oluliseks küsimuseks, mis nõuab mitmete ründevektorite ja kaitsemehhanismide hoolikat käsitlemist.

### Ülevaade

Turvalisus on kriitiline MCP serverite avalikustamisel HTTP kaudu. Voogedastatav HTTP toob kaasa uued ründealad ja vajab hoolikat konfiguratsiooni.

### Peamised punktid

- **Origin päise valideerimine**: Alati valideeri `Origin` päist, et vältida DNS-taasesitamisründeid.
- **Localhosti sidumine**: Kohaliku arenduse puhul sidu serverid `localhost`-iga, et vältida nende avalikuks muutumist internetis.
- **Autentimine**: Tootmiskeskkondades rakenda autentimist (nt API võtmed, OAuth).
- **CORS**: Seadista rist- päritolu ressursside jagamise (CORS) poliitikad juurdepääsu piiramiseks.
- **HTTPS**: Kasuta tootmises HTTPS-i, et krüpteerida liiklus.

### Parimad tavad

- Ära usalda saabuvat päringut valideerimata.
- Logi ja jälgi kõiki ligipääse ja vigu.
- Uuenda regulaarselt sõltuvusi, et parandada turvavigu.

### Väljakutsed
- Tasakaalustades turvalisust ja arendamise lihtsust
- Tagades ühilduvuse erinevate kliendi keskkondadega

## Üleminek SSE-st Streamable HTTP-le

Rakenduste puhul, mis kasutavad praegu Server-Sent Events (SSE) tehnoloogiat, pakub üleminek Streamable HTTP-le täiustatud võimalusi ja paremat pikaajalist jätkusuutlikkust teie MCP lahendustele.

### Miks teha uuendus?

On kaks veenvat põhjust, miks uuendada SSE-st Streamable HTTP-le:

- Streamable HTTP pakub paremat skaleeritavust, ühilduvust ja rikkalikumat teavituse tuge kui SSE.
- See on soovitatud transport uutele MCP rakendustele.

### Ülemineku sammud

Siin on, kuidas saate oma MCP rakendustes üle minna SSE-st Streamable HTTP-le:

- **Uuendage serveri koodi**, kasutades `transport="streamable-http"` `mcp.run()` sees.
- **Uuendage kliendi koodi**, kasutades `streamablehttp_client` SSE kliendi asemel.
- **Rakendage sõnumi töötleja** kliendis teavituste töötlemiseks.
- **Testige ühilduvust** olemasolevate tööriistade ja töövoogudega.

### Ühilduvuse säilitamine

Soovitatakse hoida ühilduvust olemasolevate SSE klientidega ülemineku ajal. Siin on mõned strateegiad:

- Võite toetada nii SSE kui ka Streamable HTTP transporti, juurutades mõlemad erinevatel otspunktidel.
- Migreerige kliendid järk-järgult uuele transpordile.

### Väljakutsed

Veenduge, et käsitlete migreerimise ajal järgmisi väljakutseid:

- Kliendi kõigi versioonide uuendamine
- Erinevuste käsitlemine teavituste edastamisel

## Turvalisuse kaalutlused

Turvalisus peaks olema esmatähtis igas serveri rakenduses, eriti HTTP-põhiste transporditehnoloogiate nagu Streamable HTTP kasutamisel MCP-s.

MCP serverite rakendamisel HTTP-põhiste transportidega tuleb pöörata erilist tähelepanu mitmele ründevektorile ja kaitsemehhanismile.

### Ülevaade

Turvalisus on kriitilise tähtsusega MCP serverite HTTP kaudu avaldamisel. Streamable HTTP toob kaasa uued ründepinnad ja vajab hoolikat seadistust.

Siin on mõned olulised turvalisuse kaalutlused:

- **Origin päise valideerimine**: Alati kontrollige `Origin` päist, et vältida DNS rebind rünnakuid.
- **Localhost-i sidumine**: Kohaliku arenduse jaoks siduge serverid `localhost`-iga, et mitte avada neid avalikus internetis.
- **Autentimine**: Rakendage autentimist (näiteks API-võtmed, OAuth) tootmiskeskkonnas.
- **CORS**: Seadistage Cross-Origin Resource Sharing (CORS) poliitikad juurdepääsu piiramiseks.
- **HTTPS**: Kasutage tootmiskeskkonnas HTTPS-ühendust, et krüpteerida andmeedastus.

### Head tavad

Lisaks järgige MCP streaming serveri turvalisuse rakendamisel järgmisi häid tavasid:

- Ärge kunagi usaldage sissetulevaid päringuid ilma valideerimiseta.
- Logige ja jälgige kõiki juurdepääse ja vigu.
- Uuendage regulaarselt sõltuvusi turvaaukude parandamiseks.

### Väljakutsed

Turvalisuse rakendamisel MCP streaming serverites seisate silmitsi mõningate väljakutsetega:

- Tasakaalustama turvalisust ja arendamise lihtsust
- Tagama ühilduvust erinevate kliendi keskkondadega

### Ülesanne: Ehita oma MCP voogedastusrakendus

**Stsenaarium:**
Loo MCP server ja klient, kus server töötleb üksuste nimekirja (nt failid või dokumendid) ja saadab teate iga töödeldud üksuse kohta. Klient kuvab iga saabunud teate reaalajas.

**Sammud:**

1. Rakenda serveri tööriist, mis töötleb nimekirja ja saadab teavitusi iga üksuse kohta.
2. Rakenda klient koos sõnumitöötlusega, mis kuvab teavitusi reaalajas.
3. Testi oma lahendust, käivitades nii serveri kui kliendi ning jälgides teavitusi.

[Lahendus](./solution/README.md)

## Täiendav lugemine ja mis edasi?

Et jätkata oma teekonda MCP voogedastusega ja laiendada oma teadmisi, pakub see jaotis lisamaterjale ja soovitusi järgmisteks sammudeks keerukamate rakenduste ehitamiseks.

### Täiendav lugemine

- [Microsoft: Sissejuhatus HTTP voogedastusse](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS ASP.NET Core’is](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Voogedastuse päringud](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Mis edasi?

- Proovi ehitada keerukamaid MCP tööriistu, mis kasutavad voogedastust reaalaja analüütika, vestluse või koostöö toimetamise jaoks.
- Uuri MCP voogedastuse integreerimist frontend raamistikudega (React, Vue jne) reaalajas kasutajaliidese uuenduste jaoks.
- Edasi: [VSCode AI tööriistakasti kasutamine](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->