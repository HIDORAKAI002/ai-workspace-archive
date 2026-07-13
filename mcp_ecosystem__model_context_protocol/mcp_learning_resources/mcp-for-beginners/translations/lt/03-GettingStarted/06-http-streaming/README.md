# HTTPS srautas su Model Context Protocol (MCP)

Šis skyrius pateikia išsamų vadovą, kaip įgyvendinti saugų, galintį keistis mastu ir realiuoju laiku veikiančią srautą naudojant Model Context Protocol (MCP) per HTTPS. Apžvelgiami srauto motyvai, galimi transportavimo mechanizmai, kaip įgyvendinti srautą palaikančią HTTP MCP, saugumo geriausios praktikos, migracija nuo SSE ir praktinės gairės, kaip kurti savo srautinės MCP programėles.

> **Žiūrint į priekį:** ši pamoka aprašo Srautuojamą HTTP pagal **MCP specifikaciją 2025-11-25**, kur sesija užmezgama `initialize` metu ir pririšama su `Mcp-Session-Id` antrašte. „2026-07-28“ konkurencinė versija visiškai pašalina rankos paspaudimą ir sesijos ID, todėl kiekvienas užklausimas yra savarankiškas ir gali būti nukreiptas į bet kurį serverio egzempliorių, neliečiant kintamųjų sesijų. Daugiau informacijos žr. [Kas keičiasi MCP: 2026-07-28 konkurencinė versija](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Transportavimo mechanizmai ir srautas MCP

Šiame skyriuje aptariami skirtingi MCP transportavimo mechanizmai ir jų vaidmuo leidžiant srautinę realaus laiko komunikaciją tarp klientų ir serverių.

### Kas yra transportavimo mechanizmas?

Transportavimo mechanizmas nurodo, kaip duomenys keičiasi tarp kliento ir serverio. MCP palaiko kelis transportavimo tipus, kad atitiktų skirtingas aplinkas ir reikalavimus:

- **stdio**: Standartinis įvesties/išvesties mechanizmas, tinkamas vietinėms ir CLI pagrindu veikiančioms priemonėms. Paprasta, bet netinka žiniatinkliui ar debesų aplinkai.
- **SSE (Server-Sent Events)**: Leidžia serveriams perduoti realaus laiko atnaujinimus klientams per HTTP. Tinka žiniatinklio UI, bet ribotas mastelį ir lankstumą. Nuo MCP specifikacijos 2025-06-18 atskiro SSE (Server-Sent Events) transportas yra pasenęs ir pakeistas „Srautuojamu HTTP“ transportu.
- **Srautuojamas HTTP**: Modernus HTTP pagrindu veikiantis srautinio perdavimo transportas, palaikantis pranešimus ir geresnį mastelį. Rekomenduojamas daugumai gamybinių ir debesų scenarijų.

### Palyginimo lentelė

Žemiau pateikta palyginimo lentelė, kuri padės suprasti skirtumus tarp šių transportavimo mechanizmų:

| Transportas        | Realaus laiko atnaujinimai | Srautas | Mastelėjimas | Naudojimo atvejis       |
|-------------------|----------------------------|---------|--------------|------------------------|
| stdio             | Ne                         | Ne      | Žemas       | Vietinės CLI priemonės |
| SSE               | Taip                       | Taip    | Vidutinis    | Žiniatinklis, realaus laiko atnaujinimai |
| Srautuojamas HTTP | Taip                       | Taip    | Aukštas     | Debesys, daugelio klientų aptarnavimas |

> **Pataria:** pasirinkus tinkamą transportą, gerėja našumas, mastelėjimas ir naudotojo patirtis. **Srautuojamas HTTP** rekomenduojamas modernioms, masteliui pritaikytoms ir debesų aplinkai paruoštoms programoms.

Atkreipkite dėmesį į transportus stdio ir SSE, kurie buvo parodyti ankstesniuose skyriuose, ir kaip šio skyriaus tema yra srautuojamas HTTP transportas.

## Srautas: koncepcijos ir motyvacija

Suprasti pagrindines srauto koncepcijas ir motyvus yra esminis dalykas efektyvioms realaus laiko komunikacijos sistemoms įgyvendinti.

**Srautavimas** – tai tinklo programavimo technika, kuri leidžia siųsti ir gauti duomenis mažais, valdomais gabalėliais arba kaip įvykių seką, o ne laukti, kol bus paruošta visa atsakymo dalis. Tai ypač naudinga:

- Dideliems failams ar duomenų rinkiniams.
- Realaus laiko atnaujinimams (pvz., pokalbiai, pažangos juostos).
- Ilgai trunkančioms skaičiavimų operacijoms, kai norite informuoti vartotoją.

Štai ką reikia žinoti apie srautinį perdavimą aukštu lygiu:

- Duomenys tiekiami palaipsniui, ne visi iš karto.
- Klientas gali apdoroti duomenis juos gaudamas.
- Mažina suvokiamą delsą ir pagerina naudotojo patirtį.

### Kodėl naudoti srautą?

Srautą naudoti verta dėl šių priežasčių:

- Vartotojai gauna grįžtamąjį ryšį iš karto, ne tik pabaigoje.
- Leidžia kurti realaus laiko programas ir reaguojančius UI.
- Efektyviau naudoja tinklo ir skaičiavimo išteklius.

### Paprastas pavyzdys: HTTP srautinis serveris ir klientas

Štai paprastas pavyzdys, kaip galima įgyvendinti srautą:

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

Šis pavyzdys iliustruoja serverį, siunčiantį klientui seriją žinučių, kai jos tampa prieinamos, o ne laukiančią visų žinučių paruošimo.

**Kaip tai veikia:**

- Serveris perduoda kiekvieną žinutę, kai ji yra paruošta.
- Klientas gauna ir atspausdina kiekvieną gautą gabalėlį.

**Reikalavimai:**

- Serveris privalo naudoti srautinį atsakymą (pvz., `StreamingResponse` FastAPI).
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

- Naudoja Spring Boot reaktyviąją krūvą su `Flux` srautavimui.
- `ServerSentEvent` teikia struktūrizuotą įvykių srautą su įvykių tipais.
- `WebClient` su `bodyToFlux()` leidžia reaktyvų srautų vartojimą.
- `delayElements()` imituoja apdorojimo laiką tarp įvykių.
- Įvykiai gali turėti tipus (`info`, `result`) geresniam kliento apdorojimui.

### Palyginimas: klasikinis srautas vs MCP srautas

Skirtumai, kaip srautas veikia klasikiniu būdu ir kaip MCP, galima pavaizduoti taip:

| Funkcija               | Klasikinis HTTP srautas       | MCP srautas (Pranešimai)         |
|------------------------|-------------------------------|----------------------------------|
| Pagrindinis atsakymas   | Gabalėliuotas                 | Vienas, pabaigoje               |
| Progreso atnaujinimai  | Siunčiami kaip duomenų gabalai | Siunčiami kaip pranešimai       |
| Kliento reikalavimai   | Turi apdoroti srautą          | Reikia įgyvendinti žinučių apdorojimą |
| Naudojimo atvejis       | Dideli failai, AI žetonų srautai | Progresas, žurnalai, realaus laiko atsiliepimai |

### Pagrindiniai pastebėti skirtumai

Be to, čia yra pagrindiniai skirtumai:

- **Komunikacijos modelis:**
  - Klasikinis HTTP srautas: naudoja paprastą gabalėliuoto perdavimo kodavimą duomenims siųsti
  - MCP srautas: naudoja struktūruotą pranešimų sistemą su JSON-RPC protokolu

- **Žinutės formatas:**
  - Klasikinis HTTP: paprasti tekstiniai gabalėliai su naujomis eilutėmis
  - MCP: struktūruoti LoggingMessageNotification objektai su metaduomenimis

- **Kliento įgyvendinimas:**
  - Klasikinis HTTP: paprastas klientas, apdorojantis srautinį atsakymą
  - MCP: sudėtingesnis klientas su žiniučių apdorotoju skirtingų tipų žinutėms apdoroti

- **Progreso atnaujinimai:**
  - Klasikinis HTTP: progresas yra pagrindinio srauto dalis
  - MCP: progresas siunčiamas atskirais pranešimų pranešimais, o pagrindinis atsakymas pateikiamas pabaigoje

### Rekomendacijos

Kai kuriuos dalykus rekomenduojame atsižvelgti renkantis tarp klasikinio srauto (kaip parodyta naudojant `/stream` endpointą aukščiau) ir srauto per MCP.

- **Paprastiems srauto poreikiams:** klasikinis HTTP srautas yra paprastesnis įgyvendinti ir pakankamas pagrindiniams srauto poreikiams.

- **Sudėtingoms, interaktyvioms programoms:** MCP srautas suteikia struktūruotesnį požiūrį su turtingesniais metaduomenimis ir atskiria pranešimus nuo galutinių rezultatų.

- **AI programoms:** MCP pranešimų sistema ypač naudinga ilgai trunkančioms AI užduotims, kai norite informuoti naudotojus apie pažangą.

## Srautas MCP

Taigi, matėme keletą rekomendacijų ir palyginimų, kaip skiriasi klasikinis srautas ir MCP srautas. Dabar detaliau apžvelgsime, kaip tiksliai galite pasinaudoti srautu MCP.

Suprasti, kaip srautas veikia MCP sistemoje, yra svarbu kuriant reaguojančias programas, kurios suteikia realiojo laiko grįžtamąjį ryšį vartotojams vykstant ilgai trunkančioms operacijoms.

MCP srautas nėra apie pagrindinio atsakymo siuntimą gabalėliais, o apie **pranešimų** siuntimą klientui, kol įrankis apdoroja užklausą. Šie pranešimai gali apimti pažangos atnaujinimus, žurnalus ar kitus įvykius.

### Kaip tai veikia

Pagrindinis rezultatas vis tiek siunčiamas vienu atsakymu. Tačiau pranešimai gali būti siunčiami kaip atskiros žinutės apdorojimo metu, taip atnaujindami klientą realiu laiku. Klientas turi mokėti apdoroti ir rodyti šiuos pranešimus.

## Kas yra pranešimas?

Minėjome „Pranešimą“, ką tai reiškia MCP kontekste?

Pranešimas – tai žinutė, siunčiama iš serverio klientui, informuojanti apie pažangą, būseną ar kitus įvykius ilgai trunkančios operacijos metu. Pranešimai pagerina skaidrumą ir naudotojo patirtį.

Pavyzdžiui, klientas turėtų siųsti pranešimą, kai įvyksta pradinis rankos paspaudimas su serveriu.

Pranešimas atrodo taip JSON formatu:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Pranešimai priskiriami MCP temai, vadinamai ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Kad prisijungimas veiktų, serveris turi įjungti šią funkciją/galimybę taip:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Priklausomai nuo naudojamos SDK, prisijungimas gali būti įjungtas pagal numatytuosius nustatymus arba gali prireikti jį aiškiai įjungti serverio konfigūracijoje.

Yra skirtingi pranešimų tipai:

| Lygis     | Aprašymas                    | Naudojimo pavyzdys            |
|-----------|------------------------------|------------------------------|
| debug     | Išsami informacija apie derinimą | Funkcijų įėjimo/išėjimo taškai |
| info      | Bendros informacinės žinutės | Operacijos pažangos atnaujinimai |
| notice    | Normalūs, bet svarbūs įvykiai  | Konfigūracijos pakeitimai     |
| warning   | Įspėjamieji signalai          | Naudojamos pasenusios funkcijos |
| error     | Klaidos sąlygos               | Operacijų nesėkmės            |
| critical  | Kritinės sąlygos              | Sistemos komponentų sutrikimai |
| alert     | Reikia skubaus veiksmo        | Aptikta duomenų sugadinimas   |
| emergency | Sistema neveikia              | Viso sistemos gedimas         |

## Pranešimų įgyvendinimas MCP

Norint įgyvendinti pranešimus MCP, reikia paruošti tiek serverio, tiek kliento puses realaus laiko atnaujinimams siųsti ir apdoroti. Tai leidžia programai suteikti vartotojams nedelsiant suteikiamą grįžtamąjį ryšį ilgai trunkančių operacijų metu.

### Serverio pusė: pranešimų siuntimas

Pradėkime nuo serverio pusės. MCP aprašo įrankius, kurie gali siųsti pranešimus apdorodami užklausas. Serveris naudoja konteksto objektą (dažniausiai `ctx`), kad siųstų žinutes klientui.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Ankstesniame pavyzdyje `process_files` įrankis siunčia tris pranešimus klientui apdorojant kiekvieną failą. `ctx.info()` metodas naudojamas siųsti informacines žinutes.

Be to, norėdami įgalinti pranešimus, įsitikinkite, kad jūsų serveris naudoja srautinį transportą (pvz., `streamable-http`), o klientas turi įgyvendintą žinučių apdorotoją pranešimų apdorojimui. Štai kaip serverį paruošti naudoti `streamable-http` transportą:

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

Šiame .NET pavyzdyje `ProcessFiles` įrankis pažymėtas atributu `Tool` ir siunčia tris pranešimus klientui apdorojant kiekvieną failą. `ctx.Info()` metodas naudojamas siųsti informacines žinutes.

Norint įgalinti pranešimus .NET MCP serveryje, įsitikinkite, kad naudojate srautinį transportą:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Kliento pusė: pranešimų gavimas

Klientas turi įgyvendinti žinučių apdorotoją, kuris priima ir rodo pranešimus juos gavus.

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

Aukščiau pateiktame kode `message_handler` funkcija tikrina, ar gaunama žinutė yra pranešimas. Jei taip, ji atspausdina pranešimą; kitaip apdoroja jį kaip įprastą serverio žinutę. Taip pat atkreipkite dėmesį, kaip `ClientSession` inicializuojamas su `message_handler` pranešimų gavimui apdoroti.

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

Šiame .NET pavyzdyje `MessageHandler` funkcija tikrina, ar gaunama žinutė yra pranešimas. Jei taip, ji atspausdina pranešimą; kitu atveju apdoroja kaip įprastą serverio žinutę. `ClientSession` inicializuojamas su žinučių apdorotoju per `ClientSessionOptions`.

Norint įgalinti pranešimus, įsitikinkite, kad jūsų serveris naudoja srautinį transportą (pvz., `streamable-http`), o klientas turi įgyvendintą žinučių apdorotoją pranešimams apdoroti.

## Progresiniai pranešimai ir scenarijai

Šiame skyriuje paaiškinama progresinių pranešimų samprata MCP, kodėl jie svarbūs ir kaip juos įgyvendinti naudojant Srautuojamą HTTP. Taip pat rasite praktinę užduotį žinių įtvirtinimui.

Progresiniai pranešimai yra realaus laiko žinutės, siunčiamos iš serverio klientui ilgų operacijų metu. Vietoje laukimo, kol visa operacija baigsis, serveris periodiškai informuoja klientą apie dabartinę būseną. Tai pagerina skaidrumą, naudotojo patirtį ir palengvina derinimą.

**Pavyzdys:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Kodėl naudoti progresinius pranešimus?

Progresiniai pranešimai yra svarbūs dėl kelių priežasčių:

- **Geresnė naudotojo patirtis:** vartotojai mato atnaujinimus darbo metu, ne tik pabaigoje.
- **Realaus laiko atsiliepimas:** klientai gali rodyti pažangos juostas ar žurnalus, todėl programa atrodo jautresnė.
- **Lengvesnis derinimas ir stebėjimas:** programuotojai ir vartotojai gali matyti, kur procesas gali lėtėti ar strigti.

### Kaip įgyvendinti progresinius pranešimus

Štai kaip galite įgyvendinti progresinius pranešimus MCP:

- **Serverio pusėje:** naudokite `ctx.info()` ar `ctx.log()`, norėdami siųsti pranešimus apdorojant kiekvieną elementą. Tai siunčia žinutę klientui prieš pagrindinio rezultato paruošimą.
- **Kliento pusėje:** įgyvendinkite žinučių apdorotoją, kuris klausosi ir rodo pranešimus juos gavus. Šis apdorotojas atskiria pranešimus nuo galutinio rezultato.

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

Įgyvendinant MCP serverius su HTTP pagrindu veikiantį transportavimą, saugumas tampa aukščiausio prioriteto klausimu, reikalaujančiu atidaus dėmesio daugeliui atakų vektorių ir apsaugos mechanizmų.

### Apžvalga

Saugumas yra kritinis, kai MCP serveriai yra prieinami per HTTP. Srautuojamas HTTP įveda naują pavojų paviršių ir reikalauja atsargios konfigūracijos.

### Pagrindiniai taškai


- **Origin Header Patikra**: Visada tikrinkite `Origin` antraštę, kad išvengtumėte DNS perjungimo (rebinding) atakų.
- **Localhost pririšimas**: Vietiniam vystymui prijunkite serverius prie `localhost`, kad jų neprieinama viešajame internete.
- **Autentifikacija**: Gaminiams diegimams įgyvendinkite autentifikaciją (pvz., API raktus, OAuth).
- **CORS**: Konfigūruokite Cross-Origin Resource Sharing (CORS) politiką prieigos apribojimui.
- **HTTPS**: Naudokite HTTPS gamyboje srauto šifravimui.

### Geriausios praktikos

- Niekada nepasitikėkite atėjusius užklausas be patikrinimo.
- Fiksuokite ir stebėkite visą prieigą ir klaidas.
- Reguliariai atnaujinkite priklausomybes saugumo spragoms užtaisymui.

### Iššūkiai

- Saugumo ir vystymo patogumo balansas
- Suderinamumo su įvairiomis kliento aplinkomis užtikrinimas

## Pereinant nuo SSE prie Streamable HTTP

Programėlėms, kurios šiuo metu naudoja Server-Sent Events (SSE), pereinamasis žingsnis į Streamable HTTP suteikia pažangesnes galimybes ir geresnį ilgaamžiškumą jūsų MCP implementacijoms.

### Kodėl pereiti?

Yra du svarbūs motyvai pereiti nuo SSE prie Streamable HTTP:

- Streamable HTTP siūlo geresnį skalabilumą, suderinamumą ir išsamesnę pranešimų palaikymą nei SSE.
- Tai rekomenduojamas transportas naujoms MCP programoms.

### Migracijos žingsniai

Štai kaip galite migratuoti nuo SSE prie Streamable HTTP savo MCP programose:

- **Atnaujinkite serverio kodą** naudoti `transport="streamable-http"` `mcp.run()`.
- **Atnaujinkite kliento kodą** naudoti `streamablehttp_client` vietoje SSE kliento.
- **Įgyvendinkite žinučių tvarkyklę** klientui pranešimų apdorojimui.
- **Išbandykite suderinamumą** su esamais įrankiais ir procesais.

### Suderinamumo išlaikymas

Rekomenduojama išlaikyti suderinamumą su esamais SSE klientais migracijos metu. Štai keletas strategijų:

- Galite palaikyti tiek SSE, tiek Streamable HTTP paleisdami abu transportus skirtinguose taškuose.
- Palaipsniui migruokite klientus prie naujo transporto.

### Iššūkiai

Užtikrinkite, kad migracijos metu išspręstumėte šiuos iššūkius:

- Užtikrinti, kad visi klientai būtų atnaujinti
- Tvarkyti skirtumus pranešimų pristatyme

## Saugumo Aspektai

Saugumas turi būti pagrindinis prioritetas įgyvendinant bet kurį serverį, ypač kai naudojate HTTP pagrindu veikiančius transportus, tokius kaip Streamable HTTP MCP.

Įgyvendinant MCP serverius su HTTP pagrindu veikiančiais transportais, saugumas tampa svarbiu aspektu, reikalaujančiu dėmesio kelioms atakų atmainoms ir apsaugos mechanizmams.

### Apžvalga

Saugumas yra kritiškai svarbus MCP serveriams, veikiantiems per HTTP. Streamable HTTP praplečia atakų paviršius ir reikalauja kruopštaus konfigūravimo.

Štai keletas svarbių saugumo aspektų:

- **Origin Header Patikra**: Visada tikrinkite `Origin` antraštę, kad išvengtumėte DNS perjungimo (rebinding) atakų.
- **Localhost pririšimas**: Vietiniam vystymui prijunkite serverius prie `localhost`, kad jų neprieinama viešajame internete.
- **Autentifikacija**: Gaminiams diegimams įgyvendinkite autentifikaciją (pvz., API raktus, OAuth).
- **CORS**: Konfigūruokite Cross-Origin Resource Sharing (CORS) politiką prieigos apribojimui.
- **HTTPS**: Naudokite HTTPS gamyboje srauto šifravimui.

### Geriausios praktikos

Taip pat pateikiamos kelios geriausios praktikos taisyklės, kurias verta laikytis įgyvendinant saugumą savo MCP srautinio serverio kontekste:

- Niekada nepasitikėkite atėjusioms užklausoms be patikrinimo.
- Fiksuokite ir stebėkite visą prieigą ir klaidas.
- Reguliariai atnaujinkite priklausomybes saugumo spragoms užtaisymui.

### Iššūkiai

Įgyvendinant saugumą MCP srautinio duomenų serveriuose susidursite su šiais iššūkiais:

- Saugumo ir vystymo patogumo balansas
- Suderinamumo su įvairiomis kliento aplinkomis užtikrinimas

### Užduotis: Sukurkite savo srautinę MCP programėlę

**Scenarijus:**
Sukurkite MCP serverį ir klientą, kur serveris apdoroja sąrašą elementų (pvz., failų ar dokumentų) ir kiekvienam apdorotam elementui siunčia pranešimą. Klientas turi realiu laiku rodyti kiekvieną gautą pranešimą.

**Veiksmai:**

1. Įgyvendinkite serverio įrankį, kuris apdoroja sąrašą ir siunčia pranešimus kiekvienam elementui.
2. Įgyvendinkite klientą su žinučių tvarkykle, kuri realiu laiku rodo pranešimus.
3. Išbandykite savo įgyvendinimą paleidę serverį ir klientą, stebėkite pranešimus.

[Sprendimas](./solution/README.md)

## Tolimesnė literatūra ir kas toliau?

Norėdami tęsti savo kelionę su MCP srautinėmis sistemomis ir išplėsti žinias, ši skiltis pateikia papildomų išteklių ir siūlomų tolesnių žingsnių sudėtingesnėms programoms kurti.

### Tolimesnė literatūra

- [Microsoft: Įvadas į HTTP srautinį perdavimą](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Srautinių užklausų naudojimas](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Kas toliau?

- Pabandykite kurti sudėtingesnius MCP įrankius, kurie naudoja srautinį perdavimą realaus laiko analitikai, pokalbiams ar bendram redagavimui.
- Tyrinėkite MCP srautinių duomenų integravimą su frontend karkasais (React, Vue ir pan.) gyvoms UI atnaujinimams.
- Toliau: [AI įrankių rinkinio naudojimas VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->