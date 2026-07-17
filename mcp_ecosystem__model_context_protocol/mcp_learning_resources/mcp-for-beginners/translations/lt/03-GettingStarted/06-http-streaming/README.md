# HTTPS srautinimas su Model Context Protocol (MCP)

Šiame skyriuje pateikiamas išsamus vadovas, kaip įgyvendinti saugų, mastelį palaikantį ir realaus laiko srautinį perdavimą naudojant Model Context Protocol (MCP) per HTTPS. Aptariama srautinio perdavimo motyvacija, galimi transporto mechanizmai, kaip įgyvendinti srautinį HTTP MCP, geriausios saugumo praktikos, migracija nuo SSE ir praktiniai patarimai kuriant savo srautinio MCP programas.

> **Žvilgsnis į ateitį:** ši pamoka aprašo Streamable HTTP pagal **MCP specifikaciją 2025-11-25**, kur seansas užmezgamas `initialize` metu ir fiksuojamas su antrašte `Mcp-Session-Id`. Leidimo kandidatas `2026-07-28` visiškai pašalina rankos paspaudimo ir seanso identifikatorių, todėl kiekvienas prašymas yra savarankiškas ir gali būti nukreiptas į bet kurį serverio egzempliorių be "lipnių" sesijų. Daugiau informacijos žr. [Kas keičiasi MCP: 2026-07-28 leidimo kandidatas](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Transporto Mechanizmai ir Srautinimas MCP

Šiame skyriuje nagrinėjami skirtingi MCP transporto mechanizmai ir jų vaidmuo leidžiant srautinius perduoti realaus laiko komunikaciją tarp klientų ir serverių.

### Kas yra transporto mechanizmas?

Transporto mechanizmas apibrėžia, kaip duomenys keičiami tarp kliento ir serverio. MCP palaiko kelis transporto tipus, pritaikytus skirtingoms aplinkoms ir poreikiams:

- **stdio**: Standartinė įvestis/išvestis, tinkama vietiniams ir CLI įrankiams. Paprasta, bet netinka web ar debesų aplinkoms.
- **SSE (Server-Sent Events)**: Leidžia serveriams realiu laiku siųsti atnaujinimus klientams per HTTP. Tinka web UI, bet ribotas mastelio ir lankstumo atžvilgiu. Nuo MCP specifikacijos 2025-06-18, SSE atskiras transportas buvo atsisakytas ir pakeistas "Streamable HTTP" transportu.
- **Streamable HTTP**: Modernus HTTP pagrindu veikiantis srautinio perdavimo transportas, palaikantis pranešimus ir geresnį mastelį. Rekomenduojamas daugumai gamybinių ir debesų scenarijų.

### Palyginimo lentelė

Pažvelkite į žemiau esančią palyginimo lentelę, kad suprastumėte skirtumus tarp šių transporto mechanizmų:

| Transportas      | Realio laiko atnaujinimai | Srautinimas | Mastelį palaikantis | Naudojimo atvejis        |
|-----------------|---------------------------|-------------|---------------------|-------------------------|
| stdio           | Ne                        | Ne          | Žemas               | Vietiniai CLI įrankiai  |
| SSE             | Taip                      | Taip        | Vidutinis           | Web, realio laiko atnaujinimai |
| Streamable HTTP | Taip                      | Taip        | Aukštas             | Debesų, daugelio klientų |

> **Patarimas:** Tinkamas transporto pasirinkimas daro įtaką veikimui, mastelį palaikymui ir vartotojo patirčiai. **Streamable HTTP** yra rekomenduojamas modernioms, masteliu bei debesų aplinkai pritaikytoms programoms.

Atkreipkite dėmesį į transportus stdio ir SSE, kurie buvo parodyti ankstesniuose skyriuose, ir kaip šiame skyriuje nagrinėjamas Streamable HTTP transportas.

## Srautinimas: sąvokos ir motyvacija

Svarbu suprasti pagrindines srautinimo sąvokas ir jo priežastis, kad būtų galima įgyvendinti veiksmingas realaus laiko komunikacijos sistemas.

**Srautinimas** yra tinklo programavimo technika, leidžianti siųsti ir gauti duomenis mažais, valdomais gabalėliais arba įvykių seka, o ne laukti viso atsakymo paruošimo. Tai ypač naudinga:

- Didelių failų ar duomenų rinkinių atvejais.
- Realio laiko atnaujinimams (pvz., pokalbiams, pažangos juostoms).
- Ilgai trunkančioms skaičiavimo užduotims, kai norima nuolat informuoti vartotoją.

Štai ką reikia žinoti apie srautinimą iš esmės:

- Duomenys pristatomi palaipsniui, ne visi vienu metu.
- Klientas gali apdoroti duomenis gavęs.
- Mažina suvokiamos delsos laiką ir gerina vartotojo patirtį.

### Kodėl naudoti srautinimą?

Srautinimo naudojimo priežastys yra šios:

- Vartotojai gauna atsakymą iš karto, ne tik pabaigoje
- Leidžia realaus laiko programas ir greitesnę UI reakciją
- Efektyvesnis tinklo ir skaičiavimo išteklių naudojimas

### Paprastas pavyzdys: HTTP srautinio serverio ir kliento pavyzdys

Štai paprastas pavyzdys, kaip galima įgyvendinti srautinį perdavimą:

#### Python

**Serveris (Python, naudojant FastAPI ir StreamingResponse):**

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

**Klientas (Python, naudojant requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Šis pavyzdys demonstruoja serverį siunčiantį eilę pranešimų klientui juos gavus, o ne laukiančio visų pranešimų paruošimo.

**Kaip tai veikia:**

- Serveris siunčia kiekvieną pranešimą, kai jis parengtas.
- Klientas gauna ir spausdina kiekvieną dalį atvykus.

**Reikalavimai:**

- Serveris turi naudoti srautinį atsakymą (pvz., `StreamingResponse` FastAPI).
- Klientas turi apdoroti atsakymą kaip srautą (`stream=True` requests).
- Turinys dažniausiai yra `text/event-stream` arba `application/octet-stream`.

#### Java

**Serveris (Java, naudojant Spring Boot ir Server-Sent Events):**

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

**Klientas (Java, naudojant Spring WebFlux WebClient):**

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

**Java įgyvendinimo pastabos:**

- Naudoja Spring Boot reaguojančią architektūrą su `Flux` srautinimui
- `ServerSentEvent` suteikia struktūruotą įvykių srautą su įvykių tipais
- `WebClient` su `bodyToFlux()` leidžia reaguojančią srautinę vartojimą
- `delayElements()` imituoja apdorojimo laiką tarp įvykių
- Įvykiai gali turėti tipus (`info`, `result`) geresniam kliento valdymui

### Palyginimas: Klasikinis srautinimas vs MCP srautinimas

Skirtumai tarp klasikinio srautinimo ir MCP srautinimo pavaizduojami taip:

| Funkcija                 | Klasikinis HTTP srautinimas     | MCP srautinimas (Pranešimai)     |
|-------------------------|---------------------------------|----------------------------------|
| Pagrindinis atsakymas    | Dalytais gabalais               | Vienas, pabaigoje                |
| Progreso atnaujinimai   | Siunčiami kaip duomenų gabalai | Siunčiami kaip pranešimai        |
| Kliento reikalavimai    | Privalo apdoroti srautą         | Privalo įgyvendinti žinutės apdorojimą  |
| Naudojimo atvejis       | Dideli failai, AI žetonų srautai | Progresas, žurnalai, realio laiko grįžtamasis ryšys |

### Pagrindiniai pastebėti skirtumai

Be to, yra keletas pagrindinių skirtumų:

- **Komunikacijos modelis:**
  - Klasikinis HTTP srautinimas: naudoja paprastą dalinį perdavimą duomenims siųsti gabalais
  - MCP srautinimas: naudoja struktūruotą pranešimų sistemą su JSON-RPC protokolu

- **Žinutės formatas:**
  - Klasikinis HTTP: Paprasto teksto gabalai su naujomis eilutėmis
  - MCP: Struktūruoti LoggingMessageNotification objektai su metaduomenimis

- **Kliento įgyvendinimas:**
  - Klasikinis HTTP: Paprastas klientas, apdorojantis srautinį atsakymą
  - MCP: Sudėtingesnis klientas su žinučių apdorojimo mechanizmu skirtingų tipų žinutėms apdoroti

- **Progreso atnaujinimai:**
  - Klasikinis HTTP: Progresas yra pagrindinio atsakymo srauto dalis
  - MCP: Progresas siunčiamas kaip atskiri pranešimai, o pagrindinis atsakymas gaunamas pabaigoje

### Rekomendacijos

Pateikiame keletą rekomendacijų, renkantis tarp klasikinio srautinimo (kaip parodyta aukščiau su `/stream`) ir srautinimo per MCP.

- **Paprastiems srautinimo poreikiams:** Klasikinis HTTP srautinimas yra paprastesnis įgyvendinti ir pakankamas baziniams srautinio perdavimo reikalavimams.

- **Sudėtingoms, interaktyvioms programoms:** MCP srautinimas suteikia labiau struktūruotą požiūrį su turtingesniais metaduomenimis ir atskyrimu tarp pranešimų ir galutinių rezultatų.

- **AI programoms:** MCP pranešimų sistema yra ypač naudinga ilgai trunkančioms AI užduotims, kai reikia nuolat informuoti vartotojus apie pažangą.

## Srautinimas MCP

Taigi, iki šiol matėte rekomendacijas ir palyginimus apie skirtumą tarp klasikinio srautinimo ir MCP srautinimo. Dabar detaliai pažiūrėkime, kaip tiksliai galite panaudoti srautinį perdavimą MCP.

Svarbu suprasti, kaip veikia srautinimas MCP pagrindu, kad būtų sukurtos reaguojančios programos, kurios suteikia realaus laiko grįžtamąjį ryšį vartotojams per ilgai trunkančias operacijas.

MCP srautinimas nėra apie pagrindinio atsakymo siuntimą gabalais, o apie **pranešimų** siuntimą klientui, kol įrankis apdoroja užklausą. Šie pranešimai gali būti pažangos atnaujinimai, žurnalai ar kiti įvykiai.

### Kaip tai veikia

Pagrindinis rezultatas vis dar siunčiamas vienu atsakymu. Tačiau pranešimai gali būti siunčiami atskirai apdorojimo metu ir taip nuolat atnaujinti klientą realiu laiku. Klientas turi gebėti apdoroti ir atvaizduoti šiuos pranešimus.

## Kas yra pranešimas?

Paminėjome "pranešimą", ką tai reiškia MCP kontekste?

Pranešimas yra žinutė, siunčiama iš serverio klientui, informuojanti apie pažangą, būseną ar kitus įvykius ilgai trunkančios operacijos metu. Pranešimai gerina skaidrumą ir vartotojo patirtį.

Pavyzdžiui, klientas turi siųsti pranešimą, kai pradinė rankos paspaudimo fazė su serveriu įvykdyta.

Pranešimas atrodo kaip JSON žinutė:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Pranešimai priklauso temai MCP, vadinamai ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Pranešimas apie pasenimą:** `2026-07-28` MCP specifikacijos leidimo kandidatas žymi Logging primityvą kaip pasenusią naudoti `stderr` stdio transportams ir OpenTelemetry struktūrizuotai stebėjimui. Logging veikia `2025-11-25` ir bent metus po bet kokio formalaus pasenimo. Žr. [Kas keičiasi MCP: 2026-07-28 leidimo kandidatas](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Norint naudoti logging, serveris turi įjungti šią funkciją/galimybę taip:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Priklausomai nuo naudojamo SDK, logging gali būti įjungtas pagal nutylėjimą arba gali prireikti jį aiškiai įjungti serverio konfigūracijoje.

Yra skirtingi pranešimų tipai:

| Lygis    | Aprašymas                     | Pavyzdinis naudojimas         |
|----------|-------------------------------|------------------------------|
| debug    | Išsamūs derinimo duomenys     | Funkcijos įeinančios/išeinančios vietos |
| info     | Bendros informacinės žinutės  | Operacijos pažangos atnaujinimai  |
| notice   | Normalūs, bet reikšmingi įvykiai | Konfigūracijos pakeitimai    |
| warning  | Įspėjamieji signalai           | Naudojamos pasenusios funkcijos |
| error    | Klaidos sąlygos                | Operacijos gedimai           |
| critical | Kritinės sąlygos               | Sistemos komponentų gedimai |
| alert    | Veiksmai turi būti nedelsiant atlikti | Aptikta duomenų korupcija |
| emergency| Sistema neveikia               | Kompleksinis sistemos gedimas |

## Pranešimų įgyvendinimas MCP

Įgyvendinant pranešimus MCP, reikia sukonfigūruoti tiek serverio, tiek kliento puses realaus laiko atnaujinimams apdoroti. Tai leidžia jūsų programa teikti momentinį grįžtamąjį ryšį vartotojams ilgų operacijų metu.

### Serverio pusė: Pranešimų siuntimas

Pradėkime nuo serverio pusės. MCP apibrėžia įrankius, kurie gali siųsti pranešimus apdorojimo metu. Serveris naudoja konteksto objektą (dažniausiai `ctx`) žinutėms klientui siųsti.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Ankstesniame pavyzdyje `process_files` įrankis siunčia tris pranešimus klientui apdorojant kiekvieną failą. Metodas `ctx.info()` naudojamas informacinių žinučių siuntimui.

Be to, norint įjungti pranešimus, įsitikinkite, kad serveris naudoja srautinį transportą (pvz., `streamable-http`), o klientas įgyvendina žinučių apdorojimą. Štai kaip galite nustatyti serverį naudoti `streamable-http` transportą:

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

Šiame .NET pavyzdyje `ProcessFiles` įrankis yra pažymėtas atributu `Tool` ir siunčia tris pranešimus klientui apdorojant kiekvieną failą. Metodas `ctx.Info()` naudojamas informacinių žinučių siuntimui.

Norint įjungti pranešimus jūsų .NET MCP serveryje, įsitikinkite, kad naudojate srautinį transportą:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Kliento pusė: Pranešimų gavimas

Klientas turi įgyvendinti žinučių apdorojimo mechanizmą, kuris apdoroja ir atvaizduoja pranešimus juos gavus.

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

Ankstesniame kode funkcija `message_handler` tikrina, ar gaunama žinutė yra pranešimas. Jei taip, jis spausdina pranešimą; jei ne, jį apdoroja kaip įprastą serverio žinutę. Taip pat atkreipkite dėmesį, kaip `ClientSession` yra inicializuojama su `message_handler` pranešimų tvarkymui.

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

Šiame .NET pavyzdyje funkcija `MessageHandler` tikrina, ar gaunama žinutė yra pranešimas. Jei taip, ji spausdina pranešimą; jei ne, apdoroja kaip įprastą serverio žinutę. `ClientSession` inicializuojama su žinučių tvarkytuvu per `ClientSessionOptions`.

Norint įjungti pranešimus, įsitikinkite, kad serveris naudoja srautinį transportą (pvz., `streamable-http`), o klientas įgyvendina žinučių tvarkytuvą pranešimų apdorojimui.

## Progreso pranešimai ir scenarijai

Šiame skyriuje paaiškinama progreso pranešimų sąvoka MCP, kodėl tai svarbu ir kaip juos įgyvendinti naudojant Streamable HTTP. Taip pat rasite praktinę užduotį supratimui pagilinti.

Progreso pranešimai yra realaus laiko žinutės, siunčiamos iš serverio klientui ilgai trunkančių operacijų metu. Vietoj laukimo, kol baigsis visos operacijos, serveris nuolat informuoja klientą apie dabartinę būseną. Tai gerina skaidrumą, vartotojo patirtį ir palengvina derinimą.

**Pavyzdys:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Kodėl naudoti progreso pranešimus?

Progreso pranešimai svarbūs dėl kelių priežasčių:

- **Geresnė vartotojo patirtis:** Vartotojai mato atnaujinimus darbo metu, ne tik pabaigoje.
- **Realaus laiko grįžtamasis ryšys:** Klientai gali rodyti pažangos juostas ar žurnalus, suteikiant programai greitos reakcijos įspūdį.
- **Lengvesnis derinimas ir stebėjimas:** Kūrėjai ir vartotojai mato, kur procesas gali būti lėtas arba užstrigęs.

### Kaip įgyvendinti progreso pranešimus

Štai kaip galite įgyvendinti progreso pranešimus MCP:

- **Serverio pusėje:** Naudokite `ctx.info()` arba `ctx.log()` pranešimams siųsti apdorojant kiekvieną elementą. Tai siunčia žinutę klientui prieš paruošiant pagrindinį rezultatą.
- **Kliento pusėje:** Įgyvendinkite žinučių tvarkytuvą, kuris klauso ir atvaizduoja pranešimus juos gavus. Šis tvarkytuvas atskiria pranešimus nuo galutinio rezultato.

**Serverio pavyzdys:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Kliento pavyzdys:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Saugumo svarstymai

Įgyvendinant MCP serverius su HTTP pagrindu veikiančiomis transporto priemonėmis, saugumas tampa svarbiausiu rūpesčiu, kuriam reikia atidžiai skirti dėmesį keliems atakų vektoriams ir apsaugos mechanizmams.

### Apžvalga

Saugumas yra kritinis dalykas tuomet, kai MCP serveriai yra atviri per HTTP. Srautinio HTTP įvedimas sukuria naujas atakos paviršiaus sritis ir reikalauja atidžios konfigūracijos.

### Pagrindiniai punktai

- **Origin antraštės patvirtinimas**: Visada tikrinkite `Origin` antraštę, kad išvengtumėte DNS perrišimo atakų.
- **Localhost pririšimas**: Vystymo metu susiekite serverius su `localhost`, kad jų neatskleistumėte viešajame internete.
- **Autentifikacija**: Įgyvendinkite autentifikaciją (pvz., API raktus, OAuth) gamybos diegimuose.
- **CORS**: Konfigūruokite Kryžminio kilmės šaltinių dalinimosi (CORS) politiką, kad apribotumėte prieigą.
- **HTTPS**: Naudokite HTTPS gamyboje duomenų šifravimui.

### Geriausios praktikos

- Niekada nepasitikėkite gaunamais užklausomis be patvirtinimo.
- Rinkite žurnalus ir stebėkite visą prieigą bei klaidas.
- Reguliariai atnaujinkite priklausomybes, kad pataisytumėte saugumo spragas.

### Iššūkiai

- Saugumo ir patogumo vystymui balansas
- Suderinamumo užtikrinimas su įvairiomis kliento aplinkomis

## Perėjimas nuo SSE prie Streamable HTTP

Programoms, kurios šiuo metu naudoja Server-Sent Events (SSE), migracija į Streamable HTTP suteikia geresnes galimybes ir ilgesnio laikotarpio tvarumą MCP įgyvendinimams.

### Kodėl verta atnaujinti?

Yra dvi svarbios priežastys pereiti nuo SSE prie Streamable HTTP:

- Streamable HTTP siūlo geresnį keičiamumą, suderinamumą ir turtingesnę pranešimų palaikymą nei SSE.
- Tai yra rekomenduojamas transportas naujoms MCP programoms.

### Migracijos žingsniai

Štai kaip galite migracijos metu pereiti nuo SSE prie Streamable HTTP savo MCP programose:

- **Atnaujinkite serverio kodą** naudoti `transport="streamable-http"` funkcijoje `mcp.run()`.
- **Atnaujinkite kliento kodą** naudoti `streamablehttp_client` vietoje SSE kliento.
- **Įgyvendinkite žinučių apdorotoją** kliente pranešimų apdorojimui.
- **Išbandykite suderinamumą** su esamomis priemonėmis ir darbų srautais.

### Suderinamumo palaikymas

Rekomenduojama palaikyti suderinamumą su esamais SSE klientais migracijos metu. Štai keletas strategijų:

- Galite palaikyti tiek SSE, tiek Streamable HTTP paleisdami abu transportus skirtinguose galiniuose taškuose.
- Palaipsniui migruokite klientus prie naujo transporto.

### Iššūkiai

Įsitikinkite, kad migracijos metu išspręsite šiuos iššūkius:

- Visų klientų atnaujinimo užtikrinimas
- Pranešimų perdavimo skirtumų tvarkymas

## Saugumo svarstymai

Saugumas turėtų būti pagrindinis prioritetas įgyvendinant bet kurį serverį, ypač naudojant HTTP pagrindu veikiančius transportus, kaip Streamable HTTP MCP.

Įgyvendinant MCP serverius su HTTP pagrindu veikiančiomis transporto priemonėmis, saugumas tampa svarbiausiu rūpesčiu, kuriam reikia atidžiai skirti dėmesį keliems atakų vektoriams ir apsaugos mechanizmams.

### Apžvalga

Saugumas yra kritinis dalykas tuomet, kai MCP serveriai yra atviri per HTTP. Srautinio HTTP įvedimas sukuria naujas atakos paviršiaus sritis ir reikalauja atidžios konfigūracijos.

Štai keletas pagrindinių saugumo svarstymų:

- **Origin antraštės patvirtinimas**: Visada tikrinkite `Origin` antraštę, kad išvengtumėte DNS perrišimo atakų.
- **Localhost pririšimas**: Vystymo metu susiekite serverius su `localhost`, kad jų neatskleistumėte viešajame internete.
- **Autentifikacija**: Įgyvendinkite autentifikaciją (pvz., API raktus, OAuth) gamybos diegimuose.
- **CORS**: Konfigūruokite Kryžminio kilmės šaltinių dalinimosi (CORS) politiką, kad apribotumėte prieigą.
- **HTTPS**: Naudokite HTTPS gamyboje duomenų šifravimui.

### Geriausios praktikos

Taip pat štai keletas geriausių praktikų, kurių reikėtų laikytis įgyvendinant saugumą savo MCP srautinio perdavimo serveryje:

- Niekada nepasitikėkite gaunamomis užklausomis be patvirtinimo.
- Rinkite žurnalus ir stebėkite visą prieigą bei klaidas.
- Reguliariai atnaujinkite priklausomybes, kad pataisytumėte saugumo spragas.

### Iššūkiai

Įgyvendinant saugumą MCP srautinio perdavimo serveriuose gali kilti šių iššūkių:

- Saugumo ir patogumo vystymui balansas
- Suderinamumo užtikrinimas su įvairiomis kliento aplinkomis

### Užduotis: Sukurkite savo srautinę MCP programą

**Scenarijus:**
Sukurkite MCP serverį ir klientą, kur serveris apdoroja elementų sąrašą (pvz., bylas arba dokumentus) ir siunčia pranešimą apie kiekvieną apdorotą elementą. Klientas turėtų realiu laiku rodyti kiekvieną pranešimą atėjus.

**Žingsniai:**

1. Įgyvendinkite serverio įrankį, kuris apdoroja sąrašą ir siunčia pranešimus apie kiekvieną elementą.
2. Įgyvendinkite klientą su žinučių apdorotoju, kuris realiu laiku pateikia pranešimus.
3. Išbandykite savo įgyvendinimą paleidę serverį ir klientą ir stebėkite pranešimus.

[Sprendimas](./solution/README.md)

## Tolimesnis skaitymas ir kas toliau?

Norėdami tęsti savo kelionę su MCP srautinio perdavimo technologijomis ir išplėsti savo žinias, šiame skyriuje pateikiami papildomi šaltiniai ir siūlomi tolesni žingsniai kuriant pažangesnes programas.

### Tolimesnis skaitymas

- [Microsoft: Įvadas į HTTP srautinį perdavimą](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Srautinės užklausos](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Kas toliau?

- Pamėginkite sukurti pažangesnius MCP įrankius, kurie naudoja srautinį perdavimą realaus laiko analitikai, pokalbiams ar bendradarbiavimui redaguojant.
- Ištirkite MCP srautinio perdavimo integravimą su vartotojo sąsajos karkasais (React, Vue ir kt.) realių sąsajos atnaujinimų siekimui.
- Toliau: [Dirbant su AI rinkiniu VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->