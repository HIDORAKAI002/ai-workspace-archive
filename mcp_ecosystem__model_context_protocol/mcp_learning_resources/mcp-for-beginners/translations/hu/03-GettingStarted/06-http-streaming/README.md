# HTTPS Streaming a Model Context Protocol (MCP) segítségével

Ez a fejezet átfogó útmutatót nyújt biztonságos, skálázható és valós idejű streaming megvalósításához a Model Context Protocol (MCP) használatával HTTPS-en keresztül. Bemutatja a streaming motivációját, az elérhető szállítási mechanizmusokat, hogy hogyan lehet streamingre alkalmas HTTP-t megvalósítani MCP-ben, a biztonsági bevált gyakorlatokat, az SSE-ről történő migrációt, valamint gyakorlati útmutatást saját streaming MCP alkalmazások építéséhez.

> **Előretekintés:** ez a lecké a Streamable HTTP-t írja le a **MCP Specification 2025-11-25** alapján, amikor a munkamenet az `initialize` során jön létre és rögzítve van egy `Mcp-Session-Id` fejléccel. A `2026-07-28` verziójelölt teljesen eltávolítja a kézfogást és a munkamenetazonosítót, így minden kérés önmagában értelmezhető és tetszőleges szerver példányhoz továbbítható sticky session nélkül. Részletekért lásd a [Mi változik az MCP-ben: A 2026-07-28-es verziójelölt](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) dokumentumot.

## A szállítási mechanizmusok és streaming az MCP-ben

Ez a szakasz feltárja az MCP-ben elérhető különböző szállítási mechanizmusokat és azok szerepét a valós idejű kommunikációhoz szükséges streaming képességek engedélyezésében a kliens és a szerver között.

### Mi az a szállítási mechanizmus?

Egy szállítási mechanizmus határozza meg, hogyan cserélnek adatot a kliens és a szerver. Az MCP többféle szállítási típust támogat, hogy különböző környezetekhez és követelményekhez alkalmazkodjon:

- **stdio**: Szabványos bemenet/kimenet, helyi és parancssoros eszközökhöz ideális. Egyszerű, de nem alkalmas web vagy felhő környezetekhez.
- **SSE (Server-Sent Events)**: Lehetővé teszi, hogy a szerverek valós idejű frissítéseket küldjenek a kliensek felé HTTP-n keresztül. Jó webes UI-k esetén, de skálázhatóságban és rugalmasságban korlátozott. Az MCP Specification 2025-06-18 alapján az önálló SSE (Server-Sent Events) szállító le lett cserélve a "Streamable HTTP" szállítóra.
- **Streamable HTTP**: Modern HTTP-alapú streaming szállító, támogatja az értesítéseket és jobb skálázhatóságot kínál. Ajánlott a legtöbb gyártási és felhőbeli forgatókönyvhöz.

### Összehasonlító táblázat

Nézze meg az alábbi összehasonlító táblázatot, hogy megértse a különbségeket ezen szállítási mechanizmusok között:

| Szállítás          | Valós idejű frissítések | Streaming | Skálázhatóság | Használati eset          |
|-------------------|------------------------|-----------|--------------|--------------------------|
| stdio             | Nem                    | Nem       | Alacsony     | Helyi CLI eszközök       |
| SSE               | Igen                   | Igen      | Közepes      | Web, valós idejű frissítések |
| Streamable HTTP   | Igen                   | Igen      | Magas        | Felhő, több kliens       |

> **Tipp:** Az megfelelő szállító kiválasztása hatással van a teljesítményre, skálázhatóságra és a felhasználói élményre. A **Streamable HTTP** ajánlott a modern, skálázható és felhőre kész alkalmazásokhoz.

Vegye észre az előző fejezetekben bemutatott stdio és SSE szállítókat, valamint hogy az ebben a fejezetben tárgyalt szállító a streamable HTTP.

## Streaming: Fogalmak és motiváció

A streaming alapvető fogalmainak és motivációinak megértése elengedhetetlen ahhoz, hogy hatékony valós idejű kommunikációs rendszereket lehessen megvalósítani.

**Streaming** egy hálózati programozási technika, amely lehetővé teszi adatok küldését és fogadását kis, kezelhető adagokban vagy eseménysorozatként, ahelyett hogy megvárnánk a teljes válasz elkészültét. Ez különösen hasznos:

- Nagy fájlok vagy adatállományok esetén.
- Valós idejű frissítésekhez (pl. chat, előrehaladási sávok).
- Hosszú futású számításoknál, amikor a felhasználó folyamatos tájékoztatása kívánatos.

Íme, amit tudni kell a streamingről magas szinten:

- Az adatok fokozatosan érkeznek, nem mind egyszerre.
- A kliens képes feldolgozni az adatokat, amint megérkeznek.
- Csökkenti az észlelt késleltetést és javítja a felhasználói élményt.

### Miért használjunk streaminget?

A streaming használatának okai a következők:

- A felhasználók azonnali visszajelzést kapnak, nem csak a végén
- Valós idejű alkalmazások és válaszkész UI-k engedélyezése
- Hálózati és számítási erőforrások hatékonyabb kihasználása

### Egyszerű példa: HTTP streaming szerver és kliens

Íme egy egyszerű példa arra, hogyan lehet megvalósítani a streaminget:

#### Python

**Szerver (Python, FastAPI és StreamingResponse használatával):**

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

**Kliens (Python, requests használatával):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Ez a példa bemutatja, hogyan küld a szerver egy sor üzenetet a kliensnek, ahogy azok elérhetővé válnak, ahelyett, hogy megvárná az összes üzenet elkészültét.

**A működés módja:**

- A szerver kiadja az egyes üzeneteket, amint készen állnak.
- A kliens fogadja és kiírja az érkező adatdarabokat.

**Követelmények:**

- A szervernek streaming választ kell használnia (pl. `StreamingResponse` FastAPI-ban).
- A kliensnek streamként kell feldolgoznia a választ (`stream=True` a requests-ben).
- A Content-Type általában `text/event-stream` vagy `application/octet-stream`.

#### Java

**Szerver (Java, Spring Boot és Server-Sent Events használatával):**

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

**Kliens (Java, Spring WebFlux WebClient használatával):**

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

**Java megvalósítási megjegyzések:**

- A Spring Boot reaktív stack-jét használja `Flux`-szal streameléshez
- A `ServerSentEvent` strukturált eseménystreamelést biztosít eseménytípusokkal
- A `WebClient` `bodyToFlux()`-szal teszi lehetővé a reaktív streaming fogyasztást
- A `delayElements()` modellezi az események közötti feldolgozási időt
- Az eseményeknek lehetnek típusai (`info`, `result`) a jobb klienskezelésért

### Összehasonlítás: Klasszikus streaming vs MCP streaming

Az MCP-ben és a "klasszikus" módszerrel működő streaming közti különbségek a következők szerint ábrázolhatók:

| Jellemző                 | Klasszikus HTTP Streaming       | MCP Streaming (Értesítések)        |
|-------------------------|--------------------------------|-----------------------------------|
| Fő válasz                | Szeletelt                      | Egyszeri, a végén                  |
| Előrehaladás frissítések | Adatdarabként küldve           | Értesítésekként küldve            |
| Kliens követelmények     | A streamet feldolgozni kell    | Üzenetkezelőt kell megvalósítani   |
| Használati eset          | Nagy fájlok, AI token stream   | Előrehaladás, naplók, valós idejű visszacsatolás |

### Fontosabb különbségek

Ezek a fő különbségek a két megközelítés között:

- **Kommunikációs minta:**
  - Klasszikus HTTP streaming: Egyszerű szeletelt adatátvitelt használ az adatok szeletekben küldésére
  - MCP streaming: Strukturált értesítési rendszert alkalmaz JSON-RPC protokollal

- **Üzenetformátum:**
  - Klasszikus HTTP: Egyszerű szöveges szeletek új sorokkal
  - MCP: Strukturált LoggingMessageNotification objektumok metaadatokkal

- **Kliens megvalósítás:**
  - Klasszikus HTTP: Egyszerű kliens, amely a streaming válaszokat feldolgozza
  - MCP: Fejlettebb kliens, amely üzenetkezelővel dolgozza fel az eltérő típusú üzeneteket

- **Előrehaladási frissítések:**
  - Klasszikus HTTP: Az előrehaladás a válasz részfolyamatának része
  - MCP: Az előrehaladás külön értesítési üzenetekben érkezik, míg a fő válasz a végén jön

### Ajánlások

Néhány tanács a választáshoz klasszikus streaming (például a `/stream` végpontra) és MCP streaming között:

- **Egyszerű streaming igényekhez:** A klasszikus HTTP streaming egyszerűbb a megvalósítás szempontjából, és elégséges az alapvető streaming igényekhez.

- **Összetettebb, interaktív alkalmazásokhoz:** Az MCP streaming strukturáltabb megközelítést nyújt, gazdagabb metaadatokkal és értesítések, valamint végső eredmények szétválasztásával.

- **AI alkalmazásokhoz:** Az MCP értesítési rendszere különösen hasznos hosszú futású AI műveleteknél, ahol a felhasználókat folyamatosan tájékoztatni kívánjuk az előrehaladásról.

## Streaming az MCP-ben

Tehát eddig láttunk néhány ajánlást és összehasonlítást a klasszikus streaming és az MCP streaming között. Most nézzük meg részletesen, hogyan használhatja ki a streaminget az MCP-ben.

Megérteni, hogyan működik a streaming az MCP keretén belül, elengedhetetlen ahhoz, hogy reagálóképes alkalmazásokat építsünk, amelyek valós idejű visszacsatolást nyújtanak a felhasználóknak hosszú ideig tartó műveletek alatt.

Az MCP-ben a streaming nem a fő válasz darabokban történő küldéséről szól, hanem arról, hogy egy eszköz kérés feldolgozása közben **értesítéseket** küldünk a kliensnek. Ezek az értesítések tartalmazhatnak előrehaladási frissítéseket, naplókat vagy más eseményeket.

### Hogyan működik

A fő eredmény továbbra is egyetlen válaszként érkezik. Azonban az értesítések külön üzenetként elküldhetők feldolgozás közben, így a kliens valós időben frissül. A kliensnek képesnek kell lennie kezelni és megjeleníteni ezeket az értesítéseket.

## Mi az az értesítés?

Mondtuk, hogy "Értesítés", mit is jelent ez az MCP kontextusában?

Az értesítés egy olyan üzenet, amelyet a szerver küld a kliensnek, hogy tájékoztassa az előrehaladásról, állapotról vagy más eseményekről hosszú ideig tartó művelet közben. Az értesítések növelik az átláthatóságot és javítják a felhasználói élményt.

Például a kliensnek értesítést kell küldenie, ha a kezdeti kézfogás a szerverrel megtörtént.

Egy értesítés így néz ki JSON üzenetként:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Az értesítések az MCP-ben az ún. ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) témakörhöz tartoznak.

> **Elavulási értesítés:** a `2026-07-28` MCP specifikációs kiadás jelölt a Logging primitívát elavultnak nyilvánítja az stdio szállítók `stderr`-re és a strukturált observability esetén az OpenTelemetry-re való áttérés miatt. A Logging tovább működik a `2025-11-25` verzióban és legalább egy évig formalizált elavulás után is. Lásd a [Mi változik az MCP-ben: A 2026-07-28-es verziójelölt](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) dokumentumot.

A Logging működéséhez a szervernek engedélyeznie kell ezt funkció/képességként így:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Az SDK-tól függően a logging alapértelmezetten be lehet kapcsolva, vagy explicit engedélyezést igényelhet a szerver konfigurációban.

Különböző típusú értesítések léteznek:

| Szint        | Leírás                      | Példahasználat                |
|-------------|-----------------------------|------------------------------|
| debug       | Részletes hibakeresési információk | Függvény belépési/kilépési pontok |
| info        | Általános információs üzenetek  | Művelet előrehaladásának frissítése |
| notice      | Normál, de jelentős események    | Konfigurációs változások       |
| warning     | Figyelmeztető állapotok         | Elavult funkció használata      |
| error       | Hibás állapotok                | Műveleti hibák                |
| critical    | Kritikus állapotok              | Rendszer komponens hibák       |
| alert       | Azonnali intézkedés szükséges    | Adatkorrupt állapot észlelése  |
| emergency   | A rendszer használhatatlan       | Teljes rendszerösszeomlás      |

## Értesítések megvalósítása az MCP-ben

Az értesítések megvalósításához az MCP-ben mind a szerver, mind a kliens oldalt be kell állítani valós idejű frissítések kezelésére. Ez lehetővé teszi, hogy alkalmazásod azonnali visszajelzést adjon a felhasználóknak hosszú műveletek alatt.

### Szerver oldal: Értesítések küldése

Kezdjük a szerver oldallal. Az MCP-ben definiálsz eszközöket, amelyek képesek értesítéseket küldeni a kérések feldolgozása közben. A szerver a kontextus objektumot (általában `ctx`) használja az üzenetek kliens felé küldésére.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

A fenti példában a `process_files` eszköz három értesítést küld a kliensnek, miközben feldolgozza a fájlokat. A `ctx.info()` metódust információs üzenetek küldésére használja.

Ezen felül az értesítések engedélyezéséhez győződj meg róla, hogy a szerver streaming szállítót használ (például `streamable-http`), és a kliens üzenetkezelőt valósít meg az értesítések feldolgozására. Íme, hogyan állíthatod be a szervert a `streamable-http` szállító használatára:

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

Ebben a .NET példában a `ProcessFiles` eszköz `Tool` attribútummal van ellátva, és három értesítést küld a kliensnek, miközben feldolgozza a fájlokat. A `ctx.Info()` metódust információs üzenetek küldésére használja.

Az értesítések engedélyezéséhez a .NET MCP szerveredben bizonyosodj meg arról, hogy streaming szállítót használsz:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Kliens oldal: Értesítések fogadása

A kliensnek üzenetkezelőt kell megvalósítania, amely feldolgozza és megjeleníti az értesítéseket, amint azok érkeznek.

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

A fenti kódban a `message_handler` függvény ellenőrzi, hogy a bejövő üzenet értesítés-e. Ha igen, kiírja azt, különben egy normál szerver üzenetként dolgozza fel. Figyeld meg azt is, hogyan inicializálja a `ClientSession`-t a `message_handler` segítségével, hogy az értesítéseket kezelje.

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

Ebben a .NET példában a `MessageHandler` függvény ellenőrzi, hogy a bejövő üzenet értesítés-e. Ha igen, kiírja azt, különben egy normál szerver üzenetként dolgozza fel. A `ClientSession` a `ClientSessionOptions` segítségével inicializálja az üzenetkezelőt.

Az értesítések engedélyezéséhez győződj meg arról, hogy a szerver streaming szállítót használ (például `streamable-http`), és a kliens megvalósít egy üzenetkezelőt az értesítések feldolgozására.

## Előrehaladási értesítések és forgatókönyvek

Ez a szakasz elmagyarázza az előrehaladási értesítések koncepcióját az MCP-ben, miért fontosak, és hogyan kell megvalósítani őket a Streamable HTTP használatával. Találsz majd gyakorlati feladatot is, hogy elmélyítsd a megértést.

Az előrehaladási értesítések valós idejű üzenetek, amelyeket a szerver küld a kliensnek hosszú művelet közben. Ahelyett, hogy megvárnánk a folyamat végét, a szerver folyamatosan tájékoztatja a klienst az aktuális állapotról. Ez növeli az átláthatóságot, javítja a felhasználói élményt és megkönnyíti a hibakeresést.

**Példa:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Miért használjunk előrehaladási értesítéseket?

Az előrehaladási értesítések több okból is fontosak:

- **Jobb felhasználói élmény:** A felhasználók látják a frissítéseket a munka előrehaladtával, nem csak a végén.
- **Valós idejű visszacsatolás:** A kliensek megjeleníthetnek előrehaladási sávokat vagy naplókat, így az alkalmazás válaszkésznek tűnik.
- **Könnyebb hibakeresés és monitorozás:** A fejlesztők és felhasználók láthatják, hol lehet lassú vagy elakadt egy folyamat.

### Hogyan valósítsuk meg az előrehaladási értesítéseket

Így valósíthatod meg az előrehaladási értesítéseket az MCP-ben:

- **A szerveren:** Használd a `ctx.info()` vagy `ctx.log()` metódusokat, hogy értesítéseket küldj, amint egy elem feldolgozása megtörtént. Ezzel üzenetet küldesz a kliensnek még a fő eredmény elkészülése előtt.
- **A kliensen:** Valósíts meg egy üzenetkezelőt, amely figyeli és megjeleníti az értesítéseket, amint azok megérkeznek. Ez a kezelő különbséget tesz értesítés és végső eredmény között.

**Szerver példa:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Ügyfél példa:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Biztonsági megfontolások

HTTP-alapú átvitelekkel megvalósított MCP szerverek esetén a biztonság kiemelten fontos, amely gondos figyelmet igényel több támadási irányra és védelmi mechanizmusra.

### Áttekintés

A biztonság kritikus fontosságú az MCP szerverek HTTP-n való elérhetőségekor. A streamelhető HTTP új támadási felületeket vezet be, és gondos konfigurálást igényel.

### Fő pontok

- **Origin fejléc érvényesítése**: Mindig ellenőrizze az `Origin` fejlécet, hogy megakadályozza a DNS visszakötési támadásokat.
- **Localhost kötés**: Helyi fejlesztéshez kössön szervereket `localhost`-hoz, hogy elkerülje a nyilvános internetes elérhetőséget.
- **Hitelesítés**: Valós környezetben valósítson meg hitelesítést (pl. API kulcsok, OAuth).
- **CORS**: Állítson be Cross-Origin Resource Sharing (CORS) szabályokat a hozzáférés korlátozására.
- **HTTPS**: Használjon HTTPS-t éles környezetben a forgalom titkosításához.

### Legjobb gyakorlatok

- Soha ne bízzon meg a beérkező kérésekben érvényesítés nélkül.
- Naplózzon és figyeljen minden hozzáférést és hibát.
- Rendszeresen frissítse a függőségeket a biztonsági rések javítása érdekében.

### Kihívások

- A biztonság és a fejlesztés könnyedségének egyensúlya
- Kompatibilitás biztosítása különböző klienskörnyezetekkel

## Frissítés SSE-ről Streamelhető HTTP-re

Azoknak az alkalmazásoknak, amelyek jelenleg SSE-t (Server-Sent Events) használnak, a Streamelhető HTTP-re való áttérés fejlettebb funkcionalitást és hosszabb távú fenntarthatóságot biztosít MCP megvalósításaikhoz.

### Miért érdemes frissíteni?

Két meggyőző ok van az SSE-ről Streamelhető HTTP-re való frissítésre:

- A Streamelhető HTTP jobb skálázhatóságot, kompatibilitást és gazdagabb értesítési támogatást nyújt, mint az SSE.
- Ez az ajánlott átvitel az új MCP alkalmazásokhoz.

### Migráció lépései

Így migrálhat az SSE-ről Streamelhető HTTP-re MCP alkalmazásaiban:

- **Frissítse a szerverkódot**, hogy a `mcp.run()` függvénynél a `transport="streamable-http"` paramétert használja.
- **Frissítse az ügyfélkódot**, hogy SSE kliens helyett `streamablehttp_client`-et használjon.
- **Valósítson meg üzenetkezelőt** az ügyfélben az értesítések feldolgozására.
- **Tesztelje a kompatibilitást** a meglévő eszközökkel és munkafolyamatokkal.

### Kompatibilitás megőrzése

A migráció során ajánlott megőrizni a kompatibilitást a meglévő SSE kliensekkel. Néhány stratégia:

- Támogathatja mind az SSE-t, mind a Streamelhető HTTP-t különböző végpontokon futtatva mindkét átvitel mellett.
- Fokozatosan migrálja az ügyfeleket az új átvitelre.

### Kihívások

A migráció során kezelje a következő kihívásokat:

- Minden kliens frissítésének biztosítása
- Az értesítések kézbesítésében lévő különbségek kezelése

## Biztonsági megfontolások

A biztonság kiemelt fontosságú bármely szerver megvalósításakor, különösen HTTP-alapú átvitel esetén, mint a Streamelhető HTTP az MCP-ben.

KPI: A HTTP-alapú átvitelekre épülő MCP szerverek megvalósításakor a biztonság kiemelt szempont, amely alapos figyelmet igényel számos támadási irányra és védelmi mechanizmusra.

### Áttekintés

A MCP szerverek HTTP-n keresztüli elérhetőségekor a biztonság kritikus. A Streamelhető HTTP új támadási felületeket hoz létre, amelyek gondos konfigurálást követelnek meg.

Íme néhány kulcsfontosságú biztonsági megfontolás:

- **Origin fejléc érvényesítése**: Mindig ellenőrizze az `Origin` fejlécet, hogy elkerülje a DNS visszakötési támadásokat.
- **Localhost kötés**: Helyi fejlesztéshez érdemes a szervereket a `localhost`-hoz kötni, hogy ne legyenek kitéve a nyilvános internetnek.
- **Hitelesítés**: Termelési környezetben valósítson meg hitelesítést (például API kulcsok, OAuth).
- **CORS**: Konfigurálja a Cross-Origin Resource Sharing (CORS) szabályokat a hozzáférés korlátozására.
- **HTTPS**: Használjon HTTPS-t a forgalom titkosításához éles környezetben.

### Legjobb gyakorlatok

Ezenkívül néhány legjobb gyakorlat a MCP streamelő szerver biztonsági megvalósításakor:

- Soha ne bízzon meg a bejövő kérésekben validáció nélkül.
- Naplózza és figyelje a hozzáféréseket és a hibákat.
- Rendszeresen frissítse a függőségeit a biztonsági réseket javítva.

### Kihívások

A MCP streaming szerverek biztonsági megvalósításakor a következő kihívásokkal szembesülhet:

- A biztonság és a fejlesztés könnyűsége közötti egyensúly megtartása
- Kompatibilitás biztosítása különböző klienskörnyezetekkel

### Feladat: Építsd meg saját streamelő MCP alkalmazásodat

**Forgatókönyv:**
Építs egy MCP szervert és klienst, ahol a szerver feldolgoz egy elemlistát (például fájlok vagy dokumentumok), és értesítést küld minden feldolgozott elemről. Az ügyfél jelenítse meg az érkezett értesítéseket.

**Lépések:**

1. Készíts egy szerver eszközt, amely feldolgozza az elemlistát és küld értesítést minden elemhez.
2. Készíts egy klienset üzenetkezelővel, hogy valós időben jelenítse meg az értesítéseket.
3. Teszteld a megvalósítást szerver és kliens futtatásával, és figyeld az értesítéseket.

[Megoldás](./solution/README.md)

## További olvasmányok és a továbblépés

Ahhoz, hogy folytasd az MCP streaming tanulását és bővítsd ismereteidet, ez a szakasz további forrásokat és javasolt következő lépéseket nyújt fejlettebb alkalmazások építéséhez.

### További olvasmányok

- [Microsoft: Bevezetés a HTTP Streaming-be](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS az ASP.NET Core-ban](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Kérések](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Mi a következő lépés?

- Próbálj meg fejlettebb MCP eszközöket építeni, amelyek streaminget használnak valós idejű elemzéshez, csevegéshez vagy kollaboratív szerkesztéshez.
- Fedezd fel az MCP streaming frontend keretrendszerekkel (React, Vue, stb.) való integrálását a valós idejű UI frissítésekhez.
- Következő: [AI Toolkit használata VSCode-hoz](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->