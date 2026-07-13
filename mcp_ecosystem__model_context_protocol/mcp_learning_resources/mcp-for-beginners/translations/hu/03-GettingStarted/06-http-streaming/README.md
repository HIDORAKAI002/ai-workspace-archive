# HTTPS Streaming a Model Context Protocollal (MCP)

Ez a fejezet átfogó útmutatót nyújt a biztonságos, skálázható és valós idejű streaming megvalósításához a Model Context Protocol (MCP) segítségével HTTPS-en keresztül. Tárgyalja az streaming motivációját, a rendelkezésre álló szállítási mechanizmusokat, hogyan valósítható meg streamelhető HTTP az MCP-ben, a biztonsági legjobb gyakorlatokat, az SSE-ről való migrációt, valamint gyakorlati útmutatást az egyedi streaming MCP alkalmazások építéséhez.

> **Előretekintés:** ez a lecké leírja a Streamelhető HTTP-t az **MCP Specification 2025-11-25** szerint, ahol egy munkamenet az `initialize` során jön létre, és egy `Mcp-Session-Id` fejléc segítségével rögzítve van. A `2026-07-28`-i kiadásra jelölt verzió teljesen eltávolítja a kézfogást és a munkamenet-azonosítót, így minden kérés önálló és bármelyik szerver példányhoz irányítható ragadós munkamenetek nélkül. Részletekért lásd: [Mi változik az MCP-ben: A 2026-07-28 kiadásra jelölt verzió](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Szállítási mechanizmusok és streaming az MCP-ben

Ez a szakasz bemutatja az MCP-ben elérhető különböző szállítási mechanizmusokat és azok szerepét a streaming képességek biztosításában a valós idejű kommunikációhoz kliens és szerver között.

### Mi az a szállítási mechanizmus?

A szállítási mechanizmus határozza meg, hogyan cserélődik adat a kliens és a szerver között. Az MCP több szállítási típust támogat a különböző környezetek és követelmények kiszolgálására:

- **stdio**: Szabványos bemenet/kimenet, helyi és parancssoros eszközökhöz alkalmas. Egyszerű, de nem alkalmas web vagy felhő környezetre.
- **SSE (Server-Sent Events)**: Lehetővé teszi, hogy a szerverek valós idejű frissítéseket toljanak a klienseknek HTTP-n keresztül. Jó webes UI-khoz, de korlátolt skálázhatóságú és rugalmasságú. Az MCP Specification 2025-06-18 szerint az önálló SSE szállítás elavult, és a "Streamelhető HTTP" szállítással váltják fel.
- **Streamelhető HTTP**: Modern, HTTP-alapú streaming szállítás, támogatja az értesítéseket és jobb skálázhatóságot. Ajánlott a legtöbb gyártási és felhős forgatókönyvhöz.

### Összehasonlító táblázat

Tekintse meg az alábbi összehasonlító táblázatot, hogy megértse a szállítási mechanizmusok közötti különbségeket:

| Szállítás          | Valós idejű frissítések | Streaming | Skálázhatóság | Használati eset          |
|-------------------|-------------------------|-----------|--------------|------------------------|
| stdio             | Nem                     | Nem       | Alacsony     | Helyi CLI eszközök     |
| SSE               | Igen                    | Igen      | Közepes      | Web, valós idejű frissítések |
| Streamelhető HTTP   | Igen                    | Igen      | Magas        | Felhő, több kliens     |

> **Tipp:** A megfelelő szállítás megválasztása befolyásolja a teljesítményt, skálázhatóságot és a felhasználói élményt. A **Streamelhető HTTP** ajánlott a modern, skálázható és felhőkompatibilis alkalmazásokhoz.

Vegye figyelembe a korábbi fejezetekben bemutatott stdio és SSE szállításokat, továbbá azt, hogy a jelen fejezetben a streamelhető HTTP szállítás tárgyalja.

## Streaming: Fogalmak és motiváció

A streaming alapfogalmainak és motivációinak megértése elengedhetetlen a hatékony valós idejű kommunikációs rendszerek megvalósításához.

A **streaming** egy hálózati programozási technika, amely lehetővé teszi az adatok részletekben vagy eseménysorozatként történő küldését és fogadását, ahelyett hogy az egész válaszra várnánk. Ez különösen hasznos:

- Nagy fájlok vagy adatállományok esetén.
- Valós idejű frissítésekhez (pl. csevegés, folyamatjelző sávok).
- Hosszan futó számításoknál, amikor tájékoztatni szeretnénk a felhasználót.

Itt vannak a streaming magas szintű tudnivalói:

- Az adatok fokozatosan érkeznek, nem egyszerre.
- A kliens feldolgozhatja az adatokat ahogy érkeznek.
- Csökkenti az észlelt késleltetést és javítja a felhasználói élményt.

### Miért használjunk streaminget?

A streaming használatának okai:

- A felhasználók azonnal visszajelzést kapnak, nem csak a végén
- Lehetővé teszi a valós idejű alkalmazásokat és reszponzív UI-kat
- Hatékonyabb hálózati és számítási erőforrás kihasználás

### Egyszerű példa: HTTP streaming szerver és kliens

Egy egyszerű példa arra, hogyan valósítható meg streaming:

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

Ez a példa azt mutatja be, hogy a szerver egy sor üzenetet küld a kliensnek, miközben azok elérhetővé válnak, nem pedig hogy megvárja az összes üzenet elkészülését.

**Hogyan működik:**

- A szerver minden üzenetet lead, amint kész.
- A kliens fogadja és kiírja a beérkező darabokat.

**Követelmények:**

- A szervernek streaming választ kell használnia (pl. `StreamingResponse` FastAPI-ban).
- A kliensnek folyamként kell feldolgoznia a választ (`stream=True` a requests-ben).
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

**Java implementációs megjegyzések:**

- Spring Boot reaktív stack használata `Flux`-szal streaminghez
- `ServerSentEvent` strukturált eseménystreamelést biztosít eseménytípusokkal
- `WebClient` `bodyToFlux()`-szal reaktív streaming fogyasztást tesz lehetővé
- `delayElements()` események közötti feldolgozási idő szimulálására
- Események rendelkezhetnek típusokkal (`info`, `result`) a jobb klienskezelésért

### Összehasonlítás: Klasszikus streaming vs MCP streaming

A streaming működésének különbsége a "klasszikus" mód és az MCP mód között az alábbi táblázatban ábrázolható:

| Jellemző             | Klasszikus HTTP streaming      | MCP streaming (értesítések)       |
|----------------------|-------------------------------|-----------------------------------|
| Fő válasz            | Darabolt                      | Egyszeri, a végén                 |
| Előrehaladás frissítések | Adatdarabokként küldött       | Értesítésekként küldött           |
| Kliens követelmények | Át kell dolgoznia a stream-et | Üzenetkezelőt kell implementálni |
| Használati eset      | Nagy fájlok, AI token streamek | Előrehaladás, naplók, valós idejű visszajelzés |

### Megfigyelt kulcskülönbségek

Továbbá itt vannak néhány kulcskülönbség:

- **Kommunikációs minta:**
  - Klasszikus HTTP streaming: Egyszerű darabolt átvitel kódolást használ adatok küldésére
  - MCP streaming: Strukturált értesítési rendszert használ JSON-RPC protokollal

- **Üzenet formátum:**
  - Klasszikus HTTP: Egyszerű szöveges darabok új sorokkal
  - MCP: Strukturált LoggingMessageNotification objektumok metaadatokkal

- **Kliens megvalósítás:**
  - Klasszikus HTTP: Egyszerű kliens, amely feldolgozza a streamelést
  - MCP: Fejlettebb kliens, amely üzenetkezelőt valósít meg különböző típusú üzenetek feldolgozásához

- **Előrehaladás frissítések:**
  - Klasszikus HTTP: Az előrehaladás a fő válasz részeként érkezik
  - MCP: Az előrehaladás külön értesítési üzenetekben érkezik, a fő válasz pedig a végén

### Ajánlások

Néhány ajánlás van a klasszikus streaming (például a fent bemutatott `/stream` végpont) és az MCP streaming között választáskor.

- **Egyszerű streaming igényekre:** A klasszikus HTTP streaming könnyebben megvalósítható és elegendő az alapvető streaming igényekhez.

- **Összetett, interaktív alkalmazásokhoz:** Az MCP streaming strukturáltabb megközelítést ad gazdagabb metaadatokkal, elkülönítve az értesítéseket és a végleges eredményt.

- **AI alkalmazásokhoz:** Az MCP értesítési rendszere különösen hasznos hosszú futású AI feladatoknál, ahol tájékoztatni szeretnéd a felhasználókat az előrehaladásról.

## Streaming az MCP-ben

Nos, eddig láttál ajánlásokat és összehasonlításokat a klasszikus streaming és az MCP streaming között. Nézzük meg részletesen, hogyan használhatod az MCP streaminget.

Az MCP keretrendszeren belüli streaming működésének megértése alapvető a reszponzív alkalmazások építéséhez, melyek valós idejű visszajelzést adnak a felhasználóknak hosszú futású műveletek során.

Az MCP-ben a streaming nem arról szól, hogy a fő választ darabokban küldjük, hanem arról, hogy **értesítéseket** küldünk a kliensnek miközben egy eszköz feldolgoz egy kérést. Ezek az értesítések előrehaladási frissítéseket, naplókat vagy más eseményeket tartalmazhatnak.

### Hogyan működik

A fő eredmény még mindig egyetlen, összefoglalt válaszként érkezik. Viszont az értesítések külön üzenetként küldhetők elkülönítve e feldolgozás közben, így a kliens valós időben frissülhet. A kliensnek képesnek kell lennie ezeket az értesítéseket kezelni és megjeleníteni.

## Mi az az értesítés (Notification)?

Említettük az "értesítést", mit is jelent ez az MCP kontextusában?

Egy értesítés egy olyan üzenet, amelyet a szerver küld a kliensnek előrehaladásról, állapotról vagy más eseményekről egy hosszú futású művelet során. Az értesítések javítják az átláthatóságot és a felhasználói élményt.

Például a kliensnek értesítést kell küldenie, amikor a kezdeti kézfogás a szerverrel megtörtént.

Egy értesítés JSON üzenetként így néz ki:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Az értesítések az MCP-ben egy témához tartoznak, melyet ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) néven jelölnek.

Ahhoz, hogy a naplózás működjön, a szervernek engedélyeznie kell ezt funkcióként/képességként az alábbi módon:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Az SDK-tól függően a naplózás alapértelmezés szerint engedélyezett lehet, vagy explicit engedélyezésre lehet szükség a szerver konfigurációjában.

Különböző értesítési szintek vannak:

| Szint      | Leírás                        | Példahasználat                |
|-----------|-------------------------------|------------------------------|
| debug     | Részletes hibakeresési információk | Függvény belépési/kilépési pontok |
| info      | Általános tájékoztató üzenetek   | Művelet előrehaladás frissítések |
| notice    | Normál, de jelentős események    | Konfiguráció változások       |
| warning   | Figyelmeztető állapotok          | Elavult funkció használata    |
| error     | Hibás állapotok                  | Műveletek sikertelensége      |
| critical  | Kritikus állapotok               | Rendszerkomponens hibák       |
| alert     | Azonnali beavatkozást igényel    | Adat sérülés észlelése         |
| emergency | A rendszer nem használható       | Teljes rendszer összeomlás    |

## Értesítések megvalósítása MCP-ben

Az értesítések MCP-ben való megvalósításához a szerver és a kliens oldalt is be kell állítani a valós idejű frissítések kezelésére. Ez lehetővé teszi, hogy az alkalmazás azonnali visszajelzést adjon a felhasználóknak a hosszú futású műveletek során.

### Szerver oldal: Értesítések küldése

Kezdjük a szerver oldallal. Az MCP-ben olyan eszközöket definiálsz, amelyek képesek értesítéseket küldeni a kérések feldolgozása közben. A szerver a kontextus objektumot (általában `ctx`) használja az üzenetek klienshez küldésére.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

A fentebbi példában a `process_files` eszköz három értesítést küld a kliensnek, miközben feldolgozza az egyes fájlokat. A `ctx.info()` metódust tájékoztató üzenetek küldésére használjuk.

Továbbá, az értesítések engedélyezéséhez győződj meg arról, hogy a szerver streamelhető szállítást (például `streamable-http`) használ, és a kliensed implementál egy üzenetkezelőt az értesítések feldolgozására. Így állíthatod be a szervert a `streamable-http` szállításra:

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

Ebben a .NET példában a `ProcessFiles` eszköz a `Tool` attribútummal van ellátva, és három értesítést küld a kliensnek minden fájl feldolgozása közben. A `ctx.Info()` metódust használják tájékoztató üzenetek küldéséhez.

Az értesítések engedélyezéséhez a .NET MCP szerveredben győződj meg arról, hogy streamelhető szállítást használsz:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Kliens oldal: Értesítések fogadása

A kliensnek implementálnia kell egy üzenetkezelőt, amely kezeli és megjeleníti az értesítéseket azok érkezésekor.

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

A fenti kódban a `message_handler` függvény ellenőrzi, hogy a bejövő üzenet értesítés-e. Ha igen, kiírja azt; különben normál szerverüzenetként kezeli. Emellett látható, hogy a `ClientSession` a `message_handler`-rel együtt inicializálódik az értesítések kezelésére.

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

Ebben a .NET példában a `MessageHandler` függvény ellenőrzi, hogy a beérkező üzenet értesítés-e. Ha az, kiírja, ellenkező esetben normál szerverüzenetként dolgozza fel. A `ClientSession` az üzenetkezelővel együtt inicializálódik a `ClientSessionOptions` segítségével.

Az értesítések engedélyezéséhez győződj meg arról, hogy a szerver streamelhető szállítást (például `streamable-http`) használ, és a kliens oldal üzenetkezelőt implementál az értesítések feldolgozásához.

## Előrehaladási értesítések és forgatókönyvek

Ez a szakasz elmagyarázza az előrehaladási értesítések koncepcióját az MCP-ben, miért fontosak, és hogyan valósíthatók meg Streamelhető HTTP használatával. Ezen felül gyakorlati feladatot is talál a megértésed elmélyítésére.

Az előrehaladási értesítések valós idejű üzenetek, amelyeket a szerver küld a kliensnek hosszú futású műveletek során. Ahelyett, hogy a teljes folyamat végéig várnánk, a szerver folyamatosan frissíti a klienst az aktuális állapotról. Ez javítja az átláthatóságot, a felhasználói élményt és megkönnyíti a hibakeresést.

**Példa:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Miért használjunk előrehaladási értesítéseket?

Az előrehaladási értesítések fontosságára több ok is van:

- **Jobb felhasználói élmény:** A felhasználók frissítéseket látnak a munka előrehaladtával, nem csak a végén.
- **Valós idejű visszacsatolás:** A kliensek megjeleníthetik például folyamatjelző sávokat vagy naplókat, így az alkalmazás reszponzívnak tűnik.
- **Könnyebb hibakeresés és monitoring:** Fejlesztők és felhasználók láthatják, hol lassul vagy akad el egy folyamat.

### Hogyan valósítsuk meg az előrehaladási értesítéseket

Így valósíthatók meg az előrehaladási értesítések MCP-ben:

- **Szerveren:** Használd a `ctx.info()` vagy `ctx.log()` metódusokat, hogy értesítéseket küldj minden egyes feldolgozott elemről. Ez egy üzenetet küld a kliensnek még a fő eredmény elkészülte előtt.
- **Kliensen:** Implementálj egy üzenetkezelőt, amely hallgatja és megjeleníti az értesítéseket azok érkezésekor. Ez elkülöníti az értesítéseket a végleges eredménytől.

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

**Kliens példa:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Biztonsági megfontolások

Amikor MCP szervereket valósítunk meg HTTP-alapú szállításokkal, a biztonság kiemelt fontosságú, ami a támadási felületek és védekezési mechanizmusok alapos figyelembevételét követeli meg.

### Áttekintés

A biztonság kritikus, amikor MCP szervereket teszünk elérhetővé HTTP-n keresztül. A streamelhető HTTP új támadási felületeket hoz létre, ezért gondos konfiguráció szükséges.

### Kulcspontok


- **Origin fejléc érvényesítése**: Mindig ellenőrizze az `Origin` fejlécet a DNS rebinding támadások megelőzése érdekében.
- **Localhost kötés**: Helyi fejlesztéshez kötse a szervereket `localhost`-hoz, hogy elkerülje a nyilvános internet felé való kitettséget.
- **Hitelesítés**: Valós termelési környezetben valósítson meg hitelesítést (például API kulcsok, OAuth).
- **CORS**: Állítsa be a Cross-Origin Resource Sharing (CORS) szabályokat a hozzáférés korlátozására.
- **HTTPS**: Termelési környezetben használjon HTTPS-t a forgalom titkosítására.

### Legjobb gyakorlatok

- Soha ne bízzon meg a bejövő kérésekben érvényesítés nélkül.
- Naplózza és figyelje az összes hozzáférést és hibát.
- Rendszeresen frissítse a függőségeket a biztonsági rések javítása érdekében.

### Kihívások

- A biztonság és a könnyű fejlesztés közötti egyensúly megteremtése
- A kompatibilitás biztosítása különféle kliens környezetekkel

## Frissítés SSE-ről Streamable HTTP-re

Azoknak az alkalmazásoknak, amelyek jelenleg Server-Sent Events (SSE) technológiát használnak, a Streamable HTTP-re való áttérés kibővített képességeket és jobb hosszú távú fenntarthatóságot biztosít MCP implementációik számára.

### Miért érdemes frissíteni?

Két meggyőző ok van az SSE-ről Streamable HTTP-re való áttérésre:

- A Streamable HTTP jobb skálázhatóságot, kompatibilitást és gazdagabb értesítési támogatást kínál, mint az SSE.
- Ajánlott átviteli protokoll új MCP alkalmazásokhoz.

### Áttérés lépései

Íme, hogyan migrálhat SSE-ről Streamable HTTP-re MCP alkalmazásaiban:

- **Frissítse a szerver kódját**, hogy az `mcp.run()` függvényben a `transport="streamable-http"` legyen megadva.
- **Frissítse a kliens kódját**, hogy az SSE kliens helyett `streamablehttp_client`-et használjon.
- **Implementáljon egy üzenetkezelőt** a kliens oldalon az értesítések feldolgozásához.
- **Tesztelje a kompatibilitást** a meglévő eszközökkel és munkafolyamatokkal.

### Kompatibilitás fenntartása

Ajánlott a meglévő SSE kliensek kompatibilitásának fenntartása az áttérés során. Íme néhány stratégia:

- Mind az SSE, mind a Streamable HTTP támogatása külön végpontokon történő futtatással.
- A kliensek fokozatos áttérése az új átvitelre.

### Kihívások

Az alábbi kihívásokat kell megoldania az áttérés során:

- Minden kliens frissítésének biztosítása
- Az értesítések szállításában jelentkező eltérések kezelése

## Biztonsági megfontolások

A biztonság kiemelt fontosságú minden szerver megvalósításakor, különösen HTTP-alapú átviteli protokollok, mint a Streamable HTTP használata esetén MCP-ben.

Amikor MCP szervereket valósít meg HTTP-alapú átviteli protokollokon keresztül, a biztonság alapvető szempont, amely több támadási vektorra és védelmi mechanizmusra is kiterjedő alapos figyelmet igényel.

### Áttekintés

A biztonság létfontosságú, amikor MCP szervereket tesz elérhetővé HTTP-n keresztül. A Streamable HTTP új támadási felületeket vezet be, és gondos konfigurációt igényel.

Íme néhány kulcsfontosságú biztonsági szempont:

- **Origin fejléc érvényesítése**: Mindig ellenőrizze az `Origin` fejlécet a DNS rebinding támadások megelőzése érdekében.
- **Localhost kötés**: Helyi fejlesztéshez kötse a szervereket `localhost`-hoz, hogy elkerülje a nyilvános internet felé való kitettséget.
- **Hitelesítés**: Valós termelési környezetben valósítson meg hitelesítést (például API kulcsok, OAuth).
- **CORS**: Állítsa be a Cross-Origin Resource Sharing (CORS) szabályokat a hozzáférés korlátozására.
- **HTTPS**: Termelési környezetben használjon HTTPS-t a forgalom titkosítására.

### Legjobb gyakorlatok

Ezen felül itt vannak a legjobb gyakorlatok biztonság megvalósításához MCP streaming szerverén:

- Soha ne bízzon meg a bejövő kérésekben érvényesítés nélkül.
- Naplózza és figyelje az összes hozzáférést és hibát.
- Rendszeresen frissítse a függőségeket a biztonsági rések javítása érdekében.

### Kihívások

Néhány kihívással szembesül majd a biztonság MCP streaming szerverekben való megvalósításakor:

- A biztonság és a fejlesztés egyszerűségének egyensúlya
- Kompatibilitás biztosítása különféle kliens környezetekkel

### Gyakorlat: Saját Streaming MCP Alkalmazás Építése

**Forgatókönyv:**
Építsen MCP szervert és klienst, ahol a szerver feldolgoz egy elemlistát (például fájlok vagy dokumentumok), és minden feldolgozott elemhez értesítést küld. A kliensnek meg kell jelenítenie az értesítéseket, amint azok megérkeznek.

**Lépések:**

1. Valósítson meg egy szerver eszközt, amely feldolgoz egy listát és értesítéseket küld minden elemről.
2. Valósítson meg egy klienst üzenetkezelővel az értesítések valós idejű megjelenítéséhez.
3. Tesztelje megvalósítását a szerver és a kliens futtatásával, és figyelje az értesítéseket.

[Megoldás](./solution/README.md)

## További olvasmányok és a következő lépések

Az MCP streaminggel való továbblépéshez és ismereteinek bővítéséhez ez a szakasz további forrásokat és javasolt következő lépéseket tartalmaz fejlettebb alkalmazások építéséhez.

### További olvasmányok

- [Microsoft: Bevezetés az HTTP Streamingbe](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS az ASP.NET Core-ban](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Mi jön ezután?

- Próbáljon építeni fejlettebb MCP eszközöket, amelyek streaminget használnak valós idejű elemzésekhez, csevegéshez vagy együttműködő szerkesztéshez.
- Fedezze fel az MCP streaming integrálását frontend keretrendszerekkel (React, Vue, stb.) élő UI frissítésekhez.
- Következő: [AI eszközkészlet használata VSCode-hoz](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->