# HTTPS srautinimas su Model Context Protocol (MCP)

Šiame skyriuje pateikiamas išsamus vadovas, kaip įgyvendinti saugų, mastelį palaikantį ir realaus laiko srautinį perdavimą naudojant Model Context Protocol (MCP) per HTTPS. Tai apima srautinio perdavimo motyvaciją, galimus transporto mechanizmus, kaip įgyvendinti srautiniu būdu perduodamą HTTP MCP, saugumo geriausias praktikas, migraciją nuo SSE ir praktines gaires, kaip kurti savo srautines MCP programas.

## Transporto mechanizmai ir srautinimas MCP

Šioje skiltyje nagrinėjami MCP galimi transporto mechanizmai ir jų vaidmuo leidžiant realaus laiko srautinio perdavimo galimybes tarp klientų ir serverių.

### Kas yra transporto mechanizmas?

Transporto mechanizmas apibrėžia, kaip duomenys keičiasi tarp kliento ir serverio. MCP palaiko kelis transporto tipus, kad atitiktų skirtingas aplinkas ir reikalavimus:

- **stdio**: Standartinis įėjimas/išėjimas, tinka vietiniams ir komandų eilutės įrankiams. Paprasta, bet netinkama žiniatinkliui ar debesijai.
- **SSE (Server-Sent Events)**: Leidžia serveriams per HTTP siųsti realaus laiko atnaujinimus klientams. Gerai tinka interneto vartotojo sąsajoms, tačiau turi apribojimų dėl mastelio ir lankstumo. Nuo MCP specifikacijos 2025-06-18 atskiro SSE (Server-Sent Events) transportas nebenaudojamas ir yra pakeistas „Streamable HTTP“ transportu.
- **Streamable HTTP**: Modernus HTTP pagrindu veikiantis srautinio perdavimo transportas, palaikantis pranešimus ir geresnį mastelį. Rekomenduojamas daugumai gamybinių ir debesijos scenarijų.

### Palyginimo lentelė

Pažiūrėkite žemiau pateiktą palyginimo lentelę, kad suprastumėte skirtumus tarp šių transporto mechanizmų:

| Transportas        | Realiojo laiko atnaujinimai | Srautinimas | Mastelis    | Panaudojimo atvejis      |
|--------------------|-----------------------------|-------------|-------------|-------------------------|
| stdio              | Ne                          | Ne          | Žemas       | Vietiniai CLI įrankiai  |
| SSE                | Taip                        | Taip        | Vidutinis   | Internetas, realiu laiku |
| Streamable HTTP    | Taip                        | Taip        | Aukštas     | Debesis, keli klientai  |

> **Patariama:** Tinkamo transporto pasirinkimas veikia našumą, mastelį ir naudotojo patirtį. **Streamable HTTP** rekomenduojamas šiuolaikinėms, masteliui pritaikytoms ir debesies programoms.

Atkreipkite dėmesį į ankstesniuose skyriuose pristatytus stdio ir SSE transportus, o šiame skyriuje aptariamas Streamable HTTP transportas.

## Srautinimas: koncepcijos ir motyvacija

Svarbu suprasti pagrindines srautinimo koncepcijas ir motyvus norint įgyvendinti efektyvias realaus laiko komunikacijos sistemas.

**Srautinimas** yra tinklo programavimo technika, leidžianti duomenis siųsti ir gauti mažais, valdomais gabalėliais arba kaip įvykių seką, o ne laukti, kol visos atsakymas bus paruoštas. Tai ypač naudinga:

- Dideliems failams ar duomenų rinkiniams.
- Realiojo laiko atnaujinimams (pvz., pokalbiai, pažangos juostos).
- Ilgai trunkančioms skaičiavimų užduotims, kai norima informuoti naudotoją.

Štai ką svarbu žinoti apie srautinimą aukštu lygiu:

- Duomenys pateikiami progresyviai, ne visi iš karto.
- Klientas gali apdoroti duomenis atsižvelgdamas į jų atvykimą.
- Mažina suvokiamą delsą ir gerina naudotojo patirtį.

### Kodėl naudoti srautinimą?

Pagrindinės srautinimo naudojimo priežastys yra šios:

- Naudotojai gauna grįžtamąjį ryšį iš karto, o ne tik gale
- Leidžia realiojo laiko programas ir reaguojančias vartotojo sąsajas
- Efektyvesnis tinklo ir skaičiavimo išteklių naudojimas

### Paprastas pavyzdys: HTTP srautinio serverio ir kliento

Pateikiamas paprastas pavyzdys, kaip galima įgyvendinti srautą:

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

Šiame pavyzdyje serveris siųs klientui atskirus pranešimus, kai jie bus paruošti, o ne lauks, kol visi pranešimai bus paruošti.

**Kaip tai veikia:**

- Serveris pateikia kiekvieną pranešimą, kai jis paruoštas.
- Klientas gauna ir spausdina kiekvieną dalį, kai ji atvyksta.

**Reikalavimai:**

- Serveris turi naudoti srautinį atsaką (pvz., `StreamingResponse` FastAPI).
- Klientas turi apdoroti atsakymą kaip srautą (`stream=True` requests).
- Turinys dažniausiai būna `text/event-stream` arba `application/octet-stream`.

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

- Naudoja Spring Boot reaktyvią sistemą su `Flux` srautinimui
- `ServerSentEvent` teikia struktūruotą srautinį pranešimą su įvykių tipais
- `WebClient` su `bodyToFlux()` leidžia reaguojančiai vartoti srautus
- `delayElements()` simuliuoja apdorojimo laiką tarp įvykių
- Įvykiai gali turėti tipus (`info`, `result`) geresniam kliento apdorojimui

### Palyginimas: klasikinis srautinimas vs MCP srautinimas

Skirtumus tarp „klasikinio“ srautinio perdavimo ir MCP srautinimo galima pavaizduoti taip:

| Funkcija               | Klasikinis HTTP srautinimas    | MCP srautinimas (Pranešimai)      |
|------------------------|--------------------------------|----------------------------------|
| Pagrindinis atsakymas   | Gabalėliai                     | Vienas, pabaigoje                |
| Pažangos atnaujinimai  | Siunčiami kaip duomenų gabalėliai | Siunčiami kaip pranešimai         |
| Kliento reikalavimai   | Turi apdoroti srautą           | Turi įgyvendinti pranešimų apdorojimą |
| Panaudojimo atvejis    | Dideli failai, AI žodžių srautai | Pažanga, žurnalai, realaus laiko grįžtamasis ryšys |

### Pastebimi pagrindiniai skirtumai

Papildomai, keletas pagrindinių skirtumų:

- **Komunikacijos modelis:**
  - Klasikinis HTTP srautinimas: naudoja paprastą srautų perdavimo kodavimą, kad siųstų gabalėlius
  - MCP srautinimas: naudoja struktūruotą pranešimų sistemą su JSON-RPC protokolu

- **Pranešimo formatas:**
  - Klasikinis HTTP: paprasti teksto gabalėliai su naujomis eilutėmis
  - MCP: struktūruoti LoggingMessageNotification objektai su metaduomenimis

- **Kliento įgyvendinimas:**
  - Klasikinis HTTP: paprastas klientas, apdorojantis srautinį atsakymą
  - MCP: sudėtingesnis klientas, turintis pranešimų tvarkytuvą, apdorojantį skirtingo tipo pranešimus

- **Pažangos atnaujinimai:**
  - Klasikinis HTTP: pažanga yra pagrindinio srauto dalis
  - MCP: pažanga siunčiama per atskirus pranešimus, o pagrindinis atsakymas pateikiamas pabaigoje

### Rekomendacijos

Rekomenduojame keletą dalykų, renkantis tarp klasikinio srautinio perdavimo įgyvendinimo (kaip parodyta `/stream` pavyzdyje) ir srautinio perdavimo per MCP.

- **Paprastoms srautinių poreikiams:** Klasikinis HTTP srautinimas yra paprastesnis ir pakankamas baziniams srautinio perdavimo poreikiams.

- **Sudėtingoms, interaktyvioms programoms:** MCP srautinimas suteikia labiau struktūruotą požiūrį su turtingesniais metaduomenimis ir atskyrimu tarp pranešimų ir galutinių rezultatų.

- **Dirbtinio intelekto aplikacijoms:** MCP pranešimų sistema ypač naudinga ilgai trunkančioms DI užduotims, kai norima nuolat informuoti naudotojus apie pažangą.

## Srautinimas MCP

Gerai, galėjote pamatyti rekomendacijas ir palyginimus tarp klasikinio srautinio perdavimo ir MCP srautinimo. Dabar panagrinėkime tiksliai, kaip galite pasinaudoti srautinimu MCP.

Svarbu suprasti, kaip veikia srautinimas MCP sistemoje norint kurti jautrias programas, teikiančias realaus laiko grįžtamąjį ryšį vartotojams ilgai trunkančių operacijų metu.

MCP srautinimas nėra pagrindinio atsakymo siuntimas gabalėliais, bet **pranešimų** siuntimas klientui, kol įrankis apdoroja užklausą. Šie pranešimai gali apimti pažangos atnaujinimus, žurnalus ar kitus įvykius.

### Kaip tai veikia

Pagrindinis rezultatas vis dar siunčiamas kaip vienas atsakymas. Tačiau pranešimai gali būti siunčiami kaip atskiros žinutės per apdorojimą ir taip realiu laiku atnaujinti klientą. Klientas turi gebėti apdoroti ir rodyti šiuos pranešimus.

## Kas yra pranešimas?

Minėjome „Pranešimą“, ką tai reiškia MCP kontekste?

Pranešimas yra žinutė, siunčiama iš serverio klientui, informuojant apie pažangą, būseną ar kitus įvykius ilgai trunkančios operacijos metu. Pranešimai gerina skaidrumą ir naudotojo patirtį.

Pavyzdžiui, klientas turėtų siųsti pranešimą, kai įvyko pradinis pasisveikinimas su serveriu.

Pranešimas atrodo taip JSON pranešimu:

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

Kad žurnalavimas veiktų, serveris turi jį įjungti kaip funkciją/galimybę taip:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Priklausomai nuo naudojamos SDK, žurnalavimas gali būti įjungtas pagal nutylėjimą, arba gali tekti jį aiškiai įjungti serverio konfiguracijoje.

Yra skirtingų pranešimų tipų:

| Lygis     | Aprašas                      | Pavyzdinis panaudojimo atvejis  |
|-----------|------------------------------|--------------------------------|
| debug     | Detali informacija apie klaidas | Funkcijų įėjimai/išėjimai       |
| info      | Bendri informaciniai pranešimai | Operacijos pažangos atnaujinimai |
| notice    | Normalūs, bet reikšmingi įvykiai | Konfigūracijos pakeitimai       |
| warning   | Įspėjamosios sąlygos          | Pasenusios funkcijos naudojimas  |
| error     | Klaidos sąlygos               | Operacijų nesėkmės               |
| critical  | Kritinės sąlygos              | Sistemos komponentų gedimai     |
| alert     | Reikia nedelsti veiksmų       | Aptikta duomenų korupcija       |
| emergency | Sistema neveikia              | Viso sistema gedimas            |

## Pranešimų įgyvendinimas MCP

Norint įgyvendinti pranešimus MCP, reikia paruošti tiek serverio, tiek kliento puses, kad apdorotų realiojo laiko atnaujinimus. Tai leidžia jūsų programai teikti naudotojams akimirksnius grįžtamuosius ryšius ilgai trunkančių operacijų metu.

### Serverio pusė: pranešimų siuntimas

Pradėkime nuo serverio pusės. MCP jūs apibrėžiate įrankius, kurie gali siųsti pranešimus apdorodami užklausas. Serveris naudoja konteksto objektą (dažniausiai `ctx`) pranešimams siųsti klientui.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Ankstesniame pavyzdyje `process_files` įrankis siunčia tris pranešimus klientui apdorodamas kiekvieną failą. Metodas `ctx.info()` naudojamas informacinių pranešimų siuntimui.

Be to, norint įjungti pranešimus, įsitikinkite, kad serveris naudoja srautinį transportą (pvz., `streamable-http`) ir jūsų klientas įgyvendina pranešimų tvarkytuvą pranešimų apdorojimui. Štai kaip galite nustatyti serverį naudoti `streamable-http` transportą:

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

Šiame .NET pavyzdyje įrankis `ProcessFiles` pažymėtas atributu `Tool` ir siunčia tris pranešimus klientui apdorodamas kiekvieną failą. Metodas `ctx.Info()` naudojamas informacinių pranešimų siuntimui.

Norėdami įjungti pranešimus savo .NET MCP serveryje, įsitikinkite, kad naudojate srautinį transportą:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Kliento pusė: pranešimų gavimas

Klientas turi įgyvendinti pranešimų tvarkytuvą, kad apdorotų ir rodyti pranešimus, kai jie atvyksta.

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

Ankstesniame kode funkcija `message_handler` tikrina, ar gaunamas pranešimas yra pranešimo tipo. Jei taip, ji atspausdina pranešimą; kitaip, apdoroja kaip įprastą serverio žinutę. Taip pat atkreipkite dėmesį, kad `ClientSession` yra inicijuojama su `message_handler` pranešimų apdorojimui.

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

Šiame .NET pavyzdyje funkcija `MessageHandler` tikrina, ar gaunamas pranešimas yra pranešimo tipo. Jei taip, ji atspausdina pranešimą; kitaip, apdoroja kaip įprastą serverio žinutę. `ClientSession` inicijuojama su pranešimų tvarkytuvu per `ClientSessionOptions`.

Norint įjungti pranešimus, užtikrinkite, kad jūsų serveris naudoja srautinį transportą (pvz., `streamable-http`), o klientas įgyvendina pranešimų tvarkytuvą.

## Pažangos pranešimai ir scenarijai

Šioje skiltyje paaiškinama pažangos pranešimų sąvoka MCP, kodėl jie svarbūs ir kaip juos įgyvendinti naudojant Streamable HTTP. Taip pat rasite praktinę užduotį, kad sustiprintumėte supratimą.

Pažangos pranešimai yra realaus laiko žinutės, siunčiamos iš serverio klientui ilgai trunkančių operacijų metu. Užuot laukęs visos operacijos pabaigos, serveris nuolat atnaujina klientą apie esamą būseną. Tai gerina skaidrumą, naudotojo patirtį ir palengvina klaidų analizę.

**Pavyzdys:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Kodėl naudoti pažangos pranešimus?

Pažangos pranešimai yra svarbūs dėl kelių priežasčių:

- **Geriau naudotojo patirtis:** Naudotojai mato atnaujinimus vykdymo metu, o ne tik pabaigoje.
- **Realiojo laiko grįžtamasis ryšys:** Klientai gali rodyti pažangos juostas ar žurnalus, leidžiančius programai atrodyti reaguojančiai.
- **Lengvesnis klaidų aptikimas ir stebėjimas:** Kūrėjai ir naudotojai mato, kur procesas gali lėtėti ar užstrigti.

### Kaip įgyvendinti pažangos pranešimus

Štai kaip galite įgyvendinti pažangos pranešimus MCP:

- **Serverio pusėje:** Naudokite `ctx.info()` arba `ctx.log()`, kad siųstumėte pranešimus apdorojant kiekvieną elementą. Tai siunčia žinutę klientui prieš pagrindinio rezultato paruošimą.
- **Kliento pusėje:** Įgyvendinkite pranešimų tvarkytuvą, kuris klausosi ir rodo pranešimus jų atvykimo metu. Šis tvarkytuvas atskiria pranešimus nuo galutinio rezultato.

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

Įgyvendinant MCP serverius naudojant HTTP pagrindu veikiančius transportus, saugumas tampa itin svarbia sritimi, reikalaujančia kruopštaus dėmesio įvairioms atakų kryptims ir apsaugos mechanizmams.

### Apžvalga

Saugumas yra kritinis veiksnys, kai MCP serveriai yra prieinami per HTTP. Streamable HTTP pristato naujas atakų paviršiaus sritis ir reikalauja kruopštaus konfigūravimo.

### Pagrindiniai punktai

- **Origin antraštės tikrinimas**: Visada tikrinkite `Origin` antraštę, kad išvengtumėte DNS peradresavimo atakų.
- **Localhost pririšimas**: Vietinio kūrimo metu pririškite serverius prie `localhost`, kad nebūtų viešai prieinami.
- **Autentifikacija**: Gamyboje naudokite autentifikaciją (pvz., API raktus, OAuth).
- **CORS**: Konfigūruokite Cross-Origin Resource Sharing (CORS) politiką prieigos apribojimui.
- **HTTPS**: Naudokite HTTPS gamybos aplinkoje duomenų šifravimui.

### Geriausios praktikos

- Negalima pasitikėti įeinančiomis užklausomis be validacijos.
- Registruokite ir stebėkite visus prieigos ir klaidų įvykius.
- Reguliariai atnaujinkite priklausomybes, kad užtaisytumėte saugumo spragas.

### Iššūkiai
- Subalansuoti saugumą ir patogumą vystant
- Užtikrinti suderinamumą su įvairiomis kliento aplinkomis

## Atnaujinimas nuo SSE prie Streamable HTTP

Programėlėms, kurios šiuo metu naudoja Server-Sent Events (SSE), pereinant prie Streamable HTTP suteikiamos geresnės galimybės ir ilgalaikė MCP įgyvendinimų tvaruma.

### Kodėl atnaujinti?

Yra dvi svarbios priežastys pereiti nuo SSE prie Streamable HTTP:

- Streamable HTTP suteikia geresnį mastelį, suderinamumą ir išsamesnę pranešimų palaikymą nei SSE.
- Tai yra rekomenduojamas transportas naujoms MCP programėlėms.

### Migracijos žingsniai

Štai kaip galite pereiti nuo SSE prie Streamable HTTP savo MCP programėlėse:

- **Atnaujinkite serverio kodą** naudoti `transport="streamable-http"` funkcijoje `mcp.run()`.
- **Atnaujinkite kliento kodą** naudoti `streamablehttp_client` vietoje SSE kliento.
- **Įgyvendinkite žinučių tvarkytuvą** klientui, kad apdorotų pranešimus.
- **Išbandykite suderinamumą** su esamomis priemonėmis ir darbo eiga.

### Suderinamumo palaikymas

Rekomenduojama palaikyti suderinamumą su esamais SSE klientais migracijos metu. Štai keletas strategijų:

- Galite palaikyti tiek SSE, tiek Streamable HTTP paleisdami abu transportus skirtinguose galiniuose taškuose.
- Palaipsniui migruokite klientus į naują transportą.

### Iššūkiai

Užtikrinkite, kad migracijos metu būtų sprendžiami šie klausimai:

- Užtikrinti, kad visi klientai būtų atnaujinti
- Tvarkyti skirtumus pranešimų pristatyme

## Saugumo aspektai

Saugumas turi būti aukščiausio prioriteto klausimas diegiant bet kurį serverį, ypač naudojant HTTP pagrindu veikiančius transportus, tokius kaip Streamable HTTP MCP.

Diegiant MCP serverius su HTTP pagrindu veikiančiais transportais, saugumas tampa ypač svarbiu klausimu, reikalaujančiu dėmesio įvairiems atakos vektoriams ir apsaugos mechanizmams.

### Apžvalga

Saugumas yra kritinis veiksnys viešai pateikiant MCP serverius per HTTP. Streamable HTTP įveda naujų atakos paviršių ir reikalauja kruopštaus konfigūravimo.

Štai keletas pagrindinių saugumo aspektų:

- **Origin Header validacija**: Visada tikrinkite `Origin` antraštę, kad išvengtumėte DNS perdavimo atakų.
- **Localhost susiejimas**: Vietinio vystymo metu susiekite serverius su `localhost`, kad jų neatskleistumėte viešajame tinkle.
- **Autentifikacija**: Įgyvendinkite autentifikaciją (pvz., API raktus, OAuth) gamybos aplinkoje.
- **CORS**: Konfigūruokite Cross-Origin Resource Sharing (CORS) politiką prieigos apribojimui.
- **HTTPS**: Gamyboje naudokite HTTPS, kad užšifruotumėte srautą.

### Geriausios praktikos

Be to, štai keletas saugumo geriausių praktikų MCP srautiniame serveryje įgyvendinti:

- Niekada nepasikliaukite įeinančiais užklausais be validacijos.
- Registruokite ir stebėkite visus prieigos bandymus ir klaidas.
- Reguliariai atnaujinkite priklausomybes, kad pataisytumėte saugumo spragas.

### Iššūkiai

Diegiant saugumą MCP srautiniuose serveriuose teks susidurti su iššūkiais:

- Subalansuoti saugumą su patogumu vystant
- Užtikrinti suderinamumą su įvairiomis kliento aplinkomis

### Užduotis: Sukurkite savo srautinę MCP programą

**Scenarijus:**
Sukurkite MCP serverį ir klientą, kur serveris apdoroja elementų sąrašą (pvz., failus ar dokumentus) ir siunčia pranešimą apie kiekvieną apdorotą elementą. Klientas turėtų rodyti kiekvieną atvykstantį pranešimą realiu laiku.

**Žingsniai:**

1. Įgyvendinkite serverio įrankį, kuris apdoroja sąrašą ir siunčia pranešimus apie kiekvieną elementą.
2. Įgyvendinkite klientą su žinučių tvarkytuvu, kuris rodo pranešimus realiu laiku.
3. Išbandykite įgyvendinimą paleidę tiek serverį, tiek klientą ir stebėkite pranešimus.

[Solution](./solution/README.md)

## Tolimesnis skaitymas ir kas toliau?

Norint tęsti MCP srautinių programų pažinimą ir plėsti žinias, šiame skyriuje pateikti papildomi ištekliai ir siūlomi kiti žingsniai sudėtingesnėms programėlėms kurti.

### Tolimesnis skaitymas

- [Microsoft: Įvadas į HTTP srautinį perdavimą](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Srautinės užklausos](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Kas toliau?

- Pabandykite kurti pažangesnius MCP įrankius naudodami srautinius duomenis realaus laiko analitikai, pokalbiams ar bendram redagavimui.
- Ištirkite MCP srautinių duomenų integraciją su frontend sistemomis (React, Vue ir kt.) gyviems UI atnaujinimams.
- Kitas: [Dirbtinio intelekto rinkinio panaudojimas VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->