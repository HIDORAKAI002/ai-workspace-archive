# HTTPS Streaming a Model Context Protocol-lal (MCP)

Ez a fejezet átfogó útmutatót nyújt a biztonságos, skálázható és valós idejű streamek megvalósításához a Model Context Protocol (MCP) segítségével HTTPS-en keresztül. Tartalmazza a streaming motivációját, a rendelkezésre álló szállítási mechanizmusokat, hogyan kell megvalósítani a streamelhető HTTP-t MCP-ben, a biztonsági legjobb gyakorlatokat, az SSE-ről való átállást, valamint gyakorlati útmutatást a saját streaming MCP alkalmazások építéséhez.

## Szállítási mechanizmusok és streaming MCP-ben

Ebben a részben megvizsgáljuk a MCP-ben elérhető különböző szállítási mechanizmusokat, és ezek szerepét a kliens és szerver közötti valós idejű kommunikáció streaming képességeinek lehetővé tételében.

### Mi az a szállítási mechanizmus?

A szállítási mechanizmus meghatározza, hogyan cserélődnek az adatok a kliens és a szerver között. A MCP több szállítási típust támogat, hogy megfeleljen különböző környezeteknek és igényeknek:

- **stdio**: Szabványos bemenet/kimenet, helyi és CLI-alapú eszközökhöz alkalmas. Egyszerű, de nem alkalmas web vagy felhő esetén.
- **SSE (Server-Sent Events)**: Lehetővé teszi, hogy a szerverek valós idejű frissítéseket küldjenek HTTP-n keresztül a klienseknek. Jó webes felületekhez, de korlátozott skálázhatóság és rugalmasság. A MCP Specification 2025-06-18 verziójától az önálló SSE szállítás elavulttá vált, és helyette a "Streamable HTTP" szállítás került bevezetésre.
- **Streamable HTTP**: Modern HTTP-alapú streaming szállítás, értesítések támogatásával és jobb skálázhatósággal. Ajánlott legtöbb éles és felhő alapú használatra.

### Összehasonlító táblázat

Nézze meg az alábbi összehasonlító táblázatot, hogy megértse ezen szállítási mechanizmusok közötti különbségeket:

| Szállítás           | Valós idejű frissítések | Streaming | Skálázhatóság | Használati eset           |
|---------------------|------------------------|-----------|---------------|---------------------------|
| stdio               | Nem                    | Nem       | Alacsony      | Helyi CLI eszközök        |
| SSE                 | Igen                   | Igen      | Közepes       | Web, valós idejű frissítés|
| Streamable HTTP     | Igen                   | Igen      | Magas         | Felhő, több kliens        |

> **Tipp:** A megfelelő szállítás kiválasztása befolyásolja a teljesítményt, skálázhatóságot és a felhasználói élményt. A **Streamable HTTP** ajánlott modern, skálázható és felhő-kompatibilis alkalmazásokhoz.

Figyeljen fel az előző fejezetekben bemutatott stdio és SSE szállításokra, valamint arra, hogy ebben a fejezetben a streamelhető HTTP szállításról van szó.

## Streaming: Fogalmak és motiváció

Az alapvető fogalmak és a streaming mögötti motiváció megértése alapvető fontosságú hatékony valós idejű kommunikációs rendszerek megvalósításához.

A **streaming** egy hálózati programozási technika, amely lehetővé teszi, hogy az adatokat kis, kezelhető darabokban vagy eseménysorozatként küldjük és fogadjuk, ahelyett, hogy a teljes válasz megérkezéséig várnánk. Ez különösen hasznos:

- Nagy fájlok vagy adatkészletek esetén.
- Valós idejű frissítéseknél (pl. csevegés, folyamatjelzők).
- Hosszú futású számításoknál, amikor szeretnénk a felhasználót folyamatosan tájékoztatni.

Itt a streaming magas szintű ismerete:

- Az adatok fokozatosan érkeznek, nem egyszerre.
- A kliens képes feldolgozni az adatokat, ahogy érkeznek.
- Csökkenti az érzékelt késleltetést, és javítja a felhasználói élményt.

### Miért használjuk a streaming-et?

A streaming használatának okai a következők:

- A felhasználók azonnali visszajelzést kapnak, nem csak a végén.
- Lehetővé teszi a valós idejű alkalmazásokat és reagáló felületeket.
- Hatékonyabb hálózati és számítási erőforrás-használatot biztosít.

### Egyszerű példa: HTTP streaming szerver és kliens

Íme egy egyszerű példa arra, hogyan valósítható meg a streaming:

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

Ez a példa megmutatja, hogy a szerver sorozatos üzeneteket küld a kliensnek, ahogy azok elkészülnek, ahelyett, hogy az összes üzenet elkészüléséig várna.

**Működése:**

- A szerver minden üzenetet sorban továbbít, ahogy kész lesz.
- A kliens fogadja, és azonnal kiírja az érkező darabokat.

**Elvárások:**

- A szervernek streaming választ kell használnia (pl. FastAPI `StreamingResponse`).
- A kliensnek streamként kell feldolgoznia a választ (`stream=True` a requests-ban).
- A tartalom típus általában `text/event-stream` vagy `application/octet-stream`.

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

- A Spring Boot reaktív stack-jét `Flux` használatával használja a streameléshez
- A `ServerSentEvent` strukturált esemény streamet biztosít eseménytípusokkal
- A `WebClient` és a `bodyToFlux()` támogatja a reaktív stream fogyasztást
- A `delayElements()` szimulálja az események közti feldolgozási időt
- Az eseményeknek lehet típusuk (`info`, `result`), hogy a kliens jobban kezelje őket

### Összehasonlítás: Klasszikus streaming és MCP streaming

Az eltéréseket a klasszikus HTTP streamelés és az MCP streamelés módja között az alábbi táblázat szemlélteti:

| Jellemző             | Klasszikus HTTP streaming     | MCP streaming (értesítések)          |
|----------------------|-------------------------------|-------------------------------------|
| Fő válasz            | Darabolt                      | Egyetlen, a végén                    |
| Előrehaladási frissítés | Adatdarabként küldve           | Értesítésekként küldve               |
| Kliens követelmények | Stream feldolgozása kötelező | Üzenetkezelő implementálása szükséges |
| Használati eset      | Nagy fájlok, AI token stream-ek | Előrehaladás, naplók, valós idejű visszacsatolás |

### Fontos különbségek

További kulcsfontosságú különbségek:

- **Kommunikációs minta:**
  - Klasszikus HTTP streaming: Egyszerű chunked átvitel kódolást használ adatok küldésére
  - MCP streaming: Strukturált értesítési rendszert használ JSON-RPC protokollal

- **Üzenet formátuma:**
  - Klasszikus HTTP: Egyszerű szöveges darabok új sorokkal
  - MCP: Strukturált LoggingMessageNotification objektumok metaadatokkal

- **Kliens megvalósítása:**
  - Klasszikus HTTP: Egyszerű kliens, amely kezeli a streaming válaszokat
  - MCP: Összetettebb kliens, amely üzenetkezelőt használ különféle üzenettípusok feldolgozására

- **Előrehaladási frissítések:**
  - Klasszikus HTTP: Az előrehaladás a fő válaszdarabon belül szerepel
  - MCP: Az előrehaladás külön értesítési üzenetekben érkezik, míg a fő válasz a végén jön

### Ajánlások

Van néhány javaslat, ha a klasszikus streaming (például a `/stream` végpont) és az MCP streaming között kell választani:

- **Egyszerű streaming igényekhez:** A klasszikus HTTP streaming egyszerűbb megvalósítani, és elégséges alapvető streaming esetekben.

- **Komplex, interaktív alkalmazásokhoz:** Az MCP streaming strukturáltabb megközelítést nyújt gazdagabb metaadatokkal és az értesítések, valamint a végső eredmény szétválasztásával.

- **AI alkalmazásokhoz:** MCP értesítési rendszere különösen hasznos hosszú futású AI feladatoknál, ahol fontos a felhasználók rendszeres tájékoztatása az előrehaladásról.

## Streaming az MCP-ben

Tehát láttál eddig néhány ajánlást és összehasonlítást a klasszikus streaming és a MCP streaming között. Most nézzük meg részletesen, hogyan használhatod a streaminget MCP-ben.

Fontos megérteni, hogy a streaming hogyan működik az MCP keretrendszeren belül ahhoz, hogy válaszkész alkalmazásokat építs, amelyek valós idejű visszajelzést adnak a felhasználóknak hosszú futású műveletek során.

Az MCP-ben a streaming nem arról szól, hogy a fő választ darabokra küldjük, hanem arról, hogy a kliensnek **értesítéseket** küldünk, miközben az eszköz feldolgoz egy kérést. Ezek az értesítések tartalmazhatnak előrehaladási frissítéseket, naplókat vagy egyéb eseményeket.

### Hogyan működik

A fő eredmény továbbra is egyetlen válaszként érkezik. Ugyanakkor az értesítések külön üzenetekként küldhetők a feldolgozás során, ezzel valós időben frissítve a klienst. A kliensnek képesnek kell lennie ezek kezelése és megjelenítése.

## Mi az az értesítés?

Mondtuk az „értesítés” szót, mit jelent ez az MCP kontextusában?

Az értesítés az a szerver által a kliensnek küldött üzenet, amely tájékoztat az előrehaladásról, állapotról vagy más eseményekről hosszú futású művelet közben. Az értesítések növelik az átláthatóságot és javítják a felhasználói élményt.

Például a kliensnek egy értesítést kell küldenie, amikor a szerverrel megvan az első kézfogás.

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

Az értesítések egy MCP témakörhöz tartoznak, amit ["Logging"-nak](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) hívnak.

A naplózás működéséhez a szerveren engedélyezni kell ezt funkció/képesség formájában így:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Az SDK-tól függően a naplózás alapból engedélyezve lehet, vagy explicit módon engedélyezni kell a szerver konfigurációjában.

Különféle értesítéstípusok vannak:

| Szint     | Leírás                        | Példa használati eset          |
|-----------|-------------------------------|-------------------------------|
| debug     | Részletes hibakeresési információk | Függvény belépési/kilépési pontok |
| info      | Általános tájékoztató üzenetek | Művelet előrehaladási frissítések |
| notice    | Normál, de jelentős események  | Konfiguráció változások       |
| warning   | Figyelmeztető állapotok       | Elavult funkció használata     |
| error     | Hibás állapotok               | Művelet sikertelenségek        |
| critical  | Kritikus állapotok            | Rendszerkomponens hibák        |
| alert     | Azonnali beavatkozás szükséges| Adatkárosodás észlelése        |
| emergency | A rendszer használhatatlan    | Teljes rendszerleállás          |

## Értesítések megvalósítása MCP-ben

Az értesítések MCP-ben való megvalósításához a szerver és kliens oldalát is úgy kell beállítani, hogy kezelje a valós idejű frissítéseket. Ez lehetővé teszi, hogy az alkalmazás azonnali visszajelzést adjon a felhasználóknak a hosszú futású műveletek közben.

### Szerver oldali: Értesítések küldése

Kezdjük a szerver oldallal. MCP-ben olyan eszközöket definiálsz, amelyek képesek értesítések küldésére a kérések feldolgozása közben. A szerver a kontextus objektumot (általában `ctx`) használja az üzenetek küldésére a kliensnek.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Az előző példában a `process_files` eszköz három értesítést küld a kliensnek, miközben fájlokat dolgoz fel. A `ctx.info()` metódus tájékoztató üzenetek küldésére szolgál.

Továbbá, az értesítések engedélyezéséhez bizonyosodj meg róla, hogy a szerver streamelhető szállítást (például `streamable-http`) használ, és a kliens üzenetkezelőt valósít meg az értesítések feldolgozásához. Így állíthatod be a szervert `streamable-http` szállításra:

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

Ebben a .NET példában a `ProcessFiles` eszköz rendelkezik `Tool` attribútummal, és három értesítést küld a kliensnek fájlok feldolgozása közben. A `ctx.Info()` metódust használja tájékoztató üzenetek küldésére.

Ahhoz, hogy engedélyezd az értesítéseket a .NET MCP szervereden, győződj meg róla, hogy streaming szállítást használsz:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Kliens oldali: Értesítések fogadása

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

A fenti kódban a `message_handler` függvény ellenőrzi, hogy az érkező üzenet értesítés-e. Ha igen, kiírja az értesítést, különben hagyományos szerverüzenetként kezeli. Figyeld meg, hogy a `ClientSession` a `message_handler`-rel van inicializálva, hogy kezelje az érkező értesítéseket.

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

Ebben a .NET példában a `MessageHandler` funkció ellenőrzi, hogy az érkező üzenet értesítés-e. Ha igen, kiírja, különben mint normál szerverüzenetet dolgozza fel. A `ClientSession` az üzenetkezelővel van inicializálva a `ClientSessionOptions`-on keresztül.

Az értesítések engedélyezéséhez győződj meg róla, hogy a szerver streaming szállítást (például `streamable-http`) használ, és a kliens üzenetkezelőt alkalmaz az értesítések kezelésére.

## Előrehaladási értesítések és forgatókönyvek

Ez a fejezet bemutatja az MCP előrehaladási értesítéseinek fogalmát, miért fontosak és hogyan valósíthatók meg Streamable HTTP segítségével. Gyakorlati feladatot is találsz a megértés mélyítésére.

Az előrehaladási értesítések valós idejű üzenetek, amelyeket a szerver küld a kliensnek hosszú futású műveletek során. Ahelyett, hogy a teljes folyamat befejezéséig várnánk, a szerver folyamatosan tájékoztatja a klienst a jelenlegi állapotról. Ez javítja az átláthatóságot, a felhasználói élményt, és megkönnyíti a hibakeresést.

**Példa:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Miért használjunk előrehaladási értesítéseket?

Az előrehaladási értesítések fontossága több szempontból is megmutatkozik:

- **Jobb felhasználói élmény:** A felhasználók látják a frissítéseket a munka előrehaladtával, nem csak a végén.
- **Valós idejű visszacsatolás:** A kliensek megjeleníthetnek folyamatjelzőket vagy naplókat, ami dinamikusabbá teszi az alkalmazást.
- **Könnyebb hibakeresés és monitoring:** Fejlesztők és felhasználók látják, ha egy folyamat lassú vagy fennakad.

### Hogyan valósítsuk meg az előrehaladási értesítéseket?

Íme, miként valósíthatod meg az előrehaladási értesítéseket MCP-ben:

- **Szerver oldalon:** Használd a `ctx.info()` vagy `ctx.log()` metódusokat, hogy értesítéseket küldj, amikor egy elem feldolgozása megtörténik. Ez az üzenet a kliensnek érkezik a fő eredmény elkészülése előtt.
- **Kliens oldalon:** Valósíts meg egy üzenetkezelőt, amely meghallgatja és megjeleníti az értesítéseket amint érkeznek. A kezelő megkülönbözteti az értesítéseket és a végső eredményt.

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

MCP szerverek HTTP-alapú szállítás megvalósításakor a biztonság kiemelt fontosságú tényező, mely több támadási vektorra és védelmi mechanizmusra figyelmet igényel.

### Áttekintés

A MCP szerverek HTTP-n való elérhetősége esetén a biztonság kritikus. A Streamable HTTP új támadási felületet jelent, ezért gondos konfiguráció szükséges.

### Kulcspontok

- **Origin fejléc validáció:** Mindig ellenőrizd az `Origin` fejlécet, hogy megakadályozz DNS visszairányításos támadásokat.
- **Localhost kötés:** Fejlesztéskor kötözd a szervert `localhost`-hoz, hogy ne legyen nyilvánosan elérhető.
- **Hitelesítés:** Éles környezetben alkalmazz hitelesítést (pl. API kulcsok, OAuth).
- **CORS:** Állíts be megfelelő Cross-Origin Resource Sharing szabályokat a hozzáférés korlátozására.
- **HTTPS:** Az éles környezetben kötelező az HTTPS a forgalom titkosításához.

### Legjobb gyakorlatok

- Soha ne bízz meg bejövő kérésekben validáció nélkül.
- Naplózz és figyelj minden hozzáférést és hibát.
- Rendszeresen frissítsd a függőségeket a biztonsági rések elkerülése érdekében.

### Kihívások
- A biztonság és a fejlesztés egyszerűségének egyensúlyozása
- A különböző klienskörnyezetekkel való kompatibilitás biztosítása

## Frissítés SSE-ről Streamable HTTP-re

Jelenleg Server-Sent Events (SSE) használó alkalmazások számára a Streamable HTTP-re való áttérés kiterjesztett képességeket és jobb hosszú távú fenntarthatóságot biztosít MCP megvalósításaik számára.

### Miért érdemes frissíteni?

Két meggyőző ok van arra, hogy SSE-ről Streamable HTTP-re frissítsünk:

- A Streamable HTTP jobb skálázhatóságot, kompatibilitást és gazdagabb értesítési támogatást kínál, mint az SSE.
- Ez az ajánlott adatátviteli mód új MCP alkalmazások esetén.

### Áttérés lépései

Így migrálhat SSE-ről Streamable HTTP-re MCP alkalmazásaiban:

- **Frissítse a szerverkódot** úgy, hogy a `mcp.run()`-ban `transport="streamable-http"` legyen.
- **Frissítse a klienskódot** úgy, hogy a `streamablehttp_client`-et használja SSE kliens helyett.
- **Valósítson meg egy üzenetkezelőt** a kliensben az értesítések feldolgozásához.
- **Tesztelje a kompatibilitást** a meglévő eszközökkel és munkafolyamatokkal.

### Kompatibilitás fenntartása

Ajánlott megtartani a kompatibilitást a meglévő SSE kliensekkel az átállás során. Íme néhány stratégia:

- Mind az SSE, mind a Streamable HTTP támogatása lehetséges, ha különböző végpontokon futtatja mindkét adatátvitelt.
- Fokozatosan migrálja a klienseket az új adatátvitelre.

### Kihívások

Az áttérés során a következő kihívásokat kell kezelni:

- Minden kliens frissítésének biztosítása
- Az értesítés-szállítás különbségeinek kezelése

## Biztonsági megfontolások

A biztonság elsődleges szempont, különösen HTTP-alapú adatátvitelek, például a Streamable HTTP használata esetén az MCP szerverek megvalósításakor.

Az MCP szerverek HTTP-alapú adatátvitelekor a biztonság kiemelt jelentőségű, amely több támadási vektorra és védelmi mechanizmusra való gondos odafigyelést igényel.

### Áttekintés

A biztonság kritikus szempont az MCP szerverek HTTP-n történő elérhetővé tételekor. A Streamable HTTP új támadási felületeket vezet be, és gondos konfigurációt igényel.

Néhány kulcsfontosságú biztonsági megfontolás:

- **Origin fejlécek ellenőrzése**: Mindig ellenőrizze az `Origin` fejlécet a DNS újracímzés (rebind) támadások megelőzésére.
- **Localhost kötés**: Helyi fejlesztéshez a szervereket kötse a `localhost`-hoz, hogy elkerülje a nyilvános internetre való kitettséget.
- **Hitelesítés**: Éles környezetben alkalmazzon hitelesítést (például API kulcsokat, OAuth-ot).
- **CORS**: Állítson be Cross-Origin Resource Sharing (CORS) szabályokat a hozzáférés korlátozására.
- **HTTPS**: Éles környezetben használjon HTTPS-t a forgalom titkosításához.

### Legjobb gyakorlatok

Továbbá az alábbi legjobb biztonsági gyakorlatokat javasolt követni MCP streaming szerverek megvalósításakor:

- Soha ne bízzon meg a bejövő kérésekben validáció nélkül.
- Naplózza és figyelje az összes hozzáférést és hibát.
- Rendszeresen frissítse a függőségeket a biztonsági rések javítása érdekében.

### Kihívások

Biztonság alkalmazása során az MCP streaming szerverekben az alábbi kihívások merülhetnek fel:

- A biztonság és a fejlesztési egyszerűség egyensúlyának megteremtése
- A különböző klienskörnyezetekkel való kompatibilitás biztosítása

### Feladat: Építsd meg saját streamelő MCP alkalmazásod

**Forgatókönyv:**
Építs egy MCP szervert és klienst, ahol a szerver egy lista elemeit dolgozza fel (például fájlok vagy dokumentumok), és minden feldolgozott elemhez értesítést küld. A kliensnek meg kell jelenítenie az értesítéseket, ahogy érkeznek.

**Lépések:**

1. Készíts egy szervereszközt, amely egy listát dolgoz fel, és értesítéseket küld minden egyes elemhez.
2. Készíts egy klienst üzenetkezelővel, amely valós időben jeleníti meg az értesítéseket.
3. Teszteld az implementációt úgy, hogy egyszerre futtatod a szervert és a klienst, és figyeled az értesítéseket.

[Solution](./solution/README.md)

## További olvasnivalók és mi következik?

Az MCP streaminggel kapcsolatos tudásod bővítéséhez és fejlettebb alkalmazások építéséhez ez a szakasz további forrásokat és javasolt következő lépéseket kínál.

### További olvasnivalók

- [Microsoft: Bevezetés az HTTP streamingbe](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS ASP.NET Core-ban](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streamelő kérések](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Mi következik?

- Próbálj meg fejlettebb MCP eszközöket építeni, amelyek streaminget használnak valós idejű analitikához, csevegéshez vagy közös szerkesztéshez.
- Fedezd fel az MCP streaming frontend keretrendszerekkel (React, Vue stb.) való integrálását élő felhasználói felület frissítésekhez.
- Következő: [AI Eszközkészlet használata VSCode-hoz](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->