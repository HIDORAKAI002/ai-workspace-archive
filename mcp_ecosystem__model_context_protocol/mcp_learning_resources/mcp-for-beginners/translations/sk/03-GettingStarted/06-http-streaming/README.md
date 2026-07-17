# HTTPS Streaming s Model Context Protocol (MCP)

Táto kapitola poskytuje komplexný návod na implementáciu bezpečného, škálovateľného a v reálnom čase fungujúceho streamingu s Model Context Protocol (MCP) pomocou HTTPS. Pokrýva motiváciu pre streaming, dostupné transportné mechanizmy, ako implementovať streamovateľný HTTP v MCP, bezpečnostné najlepšie praktiky, migráciu zo SSE a praktické rady pre vytváranie vlastných streamingových aplikácií MCP.

> **Pohľad dopredu:** táto lekcia popisuje Streamovateľný HTTP podľa **MCP Špecifikácie 2025-11-25**, kde sa relácia ustanovuje počas `initialize` a je fixovaná cez hlavičku `Mcp-Session-Id`. Kandidát na vydanie `2026-07-28` úplne odstraňuje handshaking a ID relácie, čím sa každý request stáva samostatným a smerovateľným na akúkoľvek inštanciu servera bez sticky session. Pozri [Čo sa mení v MCP: Kandidát na vydanie 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) pre podrobnosti.

## Transportné Mechanizmy a Streaming v MCP

Táto sekcia skúma rôzne dostupné transportné mechanizmy v MCP a ich úlohu pri povolení streamingových schopností pre komunikáciu v reálnom čase medzi klientmi a servermi.

### Čo je Transportný Mechanizmus?

Transportný mechanizmus definuje, ako sa medzi klientom a serverom vymieňajú dáta. MCP podporuje viaceré typy transportu, ktoré vyhovujú rôznym prostrediam a požiadavkám:

- **stdio**: Štandardný vstup/výstup, vhodný pre lokálne a príkazové nástroje. Jednoduchý, no nevhodný pre web alebo cloud.
- **SSE (Server-Sent Events)**: Umožňuje serverom posielať klientom aktualizácie v reálnom čase cez HTTP. Dobré pre webové UI, ale obmedzené v škálovateľnosti a flexibilite. Podľa MCP Špecifikácie 2025-06-18 bol samostatný SSE transport zastaraný a nahradený "Streamovateľným HTTP" transportom.
- **Streamovateľný HTTP**: Moderný HTTP-based streamingový transport, podporujúci notifikácie a lepšiu škálovateľnosť. Odporúčaný pre väčšinu produkčných a cloudových scenárov.

### Porovnávacia Tabuľka

Pozrite si porovnávaciu tabuľku nižšie, aby ste pochopili rozdiely medzi týmito transportnými mechanizmami:

| Transport         | Aktualizácie v reálnom čase | Streaming | Škálovateľnosť | Prípad použitia        |
|-------------------|----------------------------|-----------|-----------------|-------------------------|
| stdio             | Nie                        | Nie       | Nízka           | Lokálne CLI nástroje     |
| SSE               | Áno                        | Áno       | Stredná         | Web, aktualizácie v čase |
| Streamovateľný HTTP | Áno                      | Áno       | Vysoká          | Cloud, multi-klient      |

> **Tip:** Výber správneho transportu ovplyvňuje výkon, škálovateľnosť a užívateľský zážitok. **Streamovateľný HTTP** je odporúčaný pre moderné, škálovateľné a cloud-ready aplikácie.

Všimnite si transporty stdio a SSE, ktoré ste videli v predchádzajúcich kapitolách, a ako streamovateľný HTTP je transportom pokrytým v tejto kapitole.

## Streaming: Koncepty a Motivácia

Pochopenie základných konceptov a motivácií za streamingom je nevyhnutné na implementáciu efektívnych systémov komunikácie v reálnom čase.

**Streaming** je technika v sieťovom programovaní, ktorá umožňuje odosielanie a prijímanie dát v malých, spracovateľných častiach alebo ako sekvencia udalostí, namiesto čakania na celú odpoveď. To je obzvlášť užitočné pre:

- Veľké súbory alebo dátové sady.
- Aktualizácie v reálnom čase (napr. chat, progress bary).
- Dlhodobé výpočty, kde chcete užívateľa informovať priebežne.

Tu je, čo by ste mali vedieť o streamingu vo všeobecnosti:

- Dáta sa doručujú postupne, nie naraz.
- Klient môže spracovať dáta hneď ako prídu.
- Znižuje vnímanú latenciu a zlepšuje užívateľský zážitok.

### Prečo používať streaming?

Dôvody používania streamingu sú nasledujúce:

- Užívateľ dostáva spätnú väzbu okamžite, nielen na konci
- Umožňuje realtime aplikácie a responzívne UI
- Efektívnejšie využitie sieťových a výpočtových zdrojov

### Jednoduchý príklad: HTTP Streaming Server a Klient

Tu je jednoduchý príklad, ako môže byť implementovaný streaming:

#### Python

**Server (Python, používa FastAPI a StreamingResponse):**

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

**Klient (Python, používa requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Tento príklad demonštruje server, ktorý posiela sériu správ klientovi, keď sú k dispozícii, namiesto čakania, kým budú všetky správy pripravené.

**Ako to funguje:**

- Server vyprodukuje každú správu hneď, ako je pripravená.
- Klient prijíma a vypisuje každú časť, ako prichádza.

**Požiadavky:**

- Server musí použiť streamingovú odpoveď (napr. `StreamingResponse` vo FastAPI).
- Klient musí spracovávať odpoveď ako stream (`stream=True` v requests).
- Content-Type je zvyčajne `text/event-stream` alebo `application/octet-stream`.

#### Java

**Server (Java, používa Spring Boot a Server-Sent Events):**

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

**Klient (Java, používa Spring WebFlux WebClient):**

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

**Poznámky k implementácii v Jave:**

- Používa reaktívny stack Spring Boot s `Flux` na streaming
- `ServerSentEvent` poskytuje štruktúrovaný event streaming s typmi udalostí
- `WebClient` s `bodyToFlux()` umožňuje reaktívnu konzumáciu streamu
- `delayElements()` simuluje čas spracovania medzi udalosťami
- Udalosti môžu mať typy (`info`, `result`) pre lepšie spracovanie klientom

### Porovnanie: Klasický Streaming vs MCP Streaming

Rozdiely medzi tým, ako funguje streaming klasickým spôsobom oproti MCP, môžu byť znázornené takto:

| Funkcia                | Klasický HTTP Streaming        | MCP Streaming (Notifikácie)       |
|------------------------|-------------------------------|-----------------------------------|
| Hlavná odpoveď         | Členená na časti               | Jednotná, na konci                 |
| Aktualizácie priebehu  | Posielané ako dátové kúsky     | Posielané ako notifikácie          |
| Požiadavky klienta     | Musí spracovať stream          | Musí implementovať spracovanie správ |
| Prípad použitia        | Veľké súbory, AI token streamy | Priebeh, logy, spätná väzba v reálnom čase |

### Kľúčové pozorované rozdiely

Ďalej tu sú niektoré kľúčové rozdiely:

- **Komunikačný vzorec:**
  - Klasický HTTP streaming: Používa jednoduché chunked transfer kódovanie na odosielanie dát v častiach
  - MCP streaming: Používa štruktúrovaný notifikačný systém s JSON-RPC protokolom

- **Formát správy:**
  - Klasický HTTP: Jednoduché textové kúsky s novými riadkami
  - MCP: Štrukturované objekty LoggingMessageNotification s metadátami

- **Implementácia klienta:**
  - Klasický HTTP: Jednoduchý klient, ktorý spracováva streamingové odpovede
  - MCP: Komplexnejší klient so spracovaním správ, ktorý spracuje rôzne typy správ

- **Aktualizácie priebehu:**
  - Klasický HTTP: Priebeh je súčasťou hlavného streamu odpovede
  - MCP: Priebeh je posielaný cez samostatné notifikačné správy, zatiaľ čo hlavný výsledok príde na konci

### Odporúčania

Niektoré veci odporúčame pri rozhodovaní sa medzi klasickým streamingom (ako endpoint ukázaný vyššie cez `/stream`) a streamingom cez MCP.

- **Pre jednoduché streamingové potreby:** Klasický HTTP streaming je jednoduchší na implementáciu a postačuje pre základné streamingové potreby.

- **Pre komplexné, interaktívne aplikácie:** MCP streaming poskytuje štruktúrovanejší prístup s bohatšími metadátami a oddelením medzi notifikáciami a finálnymi výsledkami.

- **Pre AI aplikácie:** Notifikačný systém MCP je obzvlášť užitočný pre dlhodobé AI úlohy, kde chcete používateľov priebežne informovať o postupe.

## Streaming v MCP

Takže ste už videli niektoré odporúčania a porovnania medzi klasickým streamingom a streamingom v MCP. Poďme podrobne preskúmať, ako môžete využívať streaming v MCP.

Pochopenie, ako streaming funguje v rámci MCP, je nevyhnutné na tvorbu responzívnych aplikácií, ktoré poskytujú spätnú väzbu v reálnom čase počas dlhodobých operácií.

V MCP streaming nie je o odosielaní hlavnej odpovede v kúskach, ale o odosielaní **notifikácií** klientovi, zatiaľ čo nástroj spracováva požiadavku. Tieto notifikácie môžu obsahovať aktualizácie priebehu, logy alebo iné udalosti.

### Ako to funguje

Hlavný výsledok je stále odoslaný ako jedna odpoveď. Avšak notifikácie môžu byť odosielané ako samostatné správy počas spracovania a tým sa aktualizuje klient v reálnom čase. Klient musí byť schopný tieto notifikácie spracovať a zobraziť.

## Čo je Notifikácia?

Povedali sme „Notifikácia“, čo to znamená v kontexte MCP?

Notifikácia je správa odoslaná zo servera klientovi, ktorá informuje o priebehu, stave alebo iných udalostiach počas dlhodobej operácie. Notifikácie zlepšujú transparentnosť a používateľský zážitok.

Napríklad, klient by mal odoslať notifikáciu, keď je inicializačný handshake so serverom dokončený.

Notifikácia vyzerá ako JSON správa takto:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifikácie patria do témy v MCP označovanej ako ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Upozornenie na zastaranie:** kandidát MCP špecifikácie z `2026-07-28` označuje Logging primitivitu za zastaranú v prospech `stderr` pre stdio transporty a OpenTelemetry pre štruktúrovanú observabilitu. Logging bude fungovať v `2025-11-25` a minimálne jeden rok po formálnom oznámení zastarania. Viď [Čo sa mení v MCP: Kandidát na vydanie 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Na zapnutie logovania musí server povoliť túto funkcionalitu ako vlastnosť/funkčnosť takto:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> V závislosti od použitého SDK môže byť logovanie povolené predvolene, alebo ho budete musieť explicitne zapnúť v konfigurácii servera.

Existujú rôzne typy notifikácií:

| Úroveň    | Popis                         | Príklad použitia             |
|-----------|-------------------------------|-----------------------------|
| debug     | Detailné debugovacie informácie | Vstupy/výstupy funkcií      |
| info      | Všeobecné informačné správy   | Aktualizácie priebehu operácie |
| notice    | Normálne, ale významné udalosti | Zmeny konfigurácie          |
| warning   | Varovné stavy                 | Použitie zastaranej funkcie |
| error     | Chybové stavy                | Zlyhanie operácie           |
| critical  | Kritické stavy               | Zlyhania komponentov systému |
| alert     | Nutné okamžité zásahy        | Zistená korupcia dát        |
| emergency | Systém je nepoužiteľný       | Kompletné zlyhanie systému  |

## Implementácia Notifikácií v MCP

Na implementáciu notifikácií v MCP musíte nastaviť serverovú aj klientske stranu, aby zvládali aktualizácie v reálnom čase. Toto umožňuje vašej aplikácii poskytovať okamžitú spätnú väzbu používateľom počas dlhodobých operácií.

### Serverová strana: Odosielanie Notifikácií

Začnime na strane servera. V MCP definujete nástroje, ktoré môžu počas spracovania požiadaviek posielať notifikácie. Server používa kontextový objekt (zvyčajne `ctx`) na odosielanie správ klientovi.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

V predchádzajúcom príklade nástroj `process_files` posiela klientovi tri notifikácie počas spracovania každého súboru. Metóda `ctx.info()` sa používa na odosielanie informačných správ.

Ďalej, na povolenie notifikácií sa uistite, že váš server používa streamingový transport (napríklad `streamable-http`) a klient implementuje spracovanie správ na spracovanie notifikácií. Tu je, ako nastaviť server na používanie `streamable-http` transportu:

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

V tomto príklade .NET je nástroj `ProcessFiles` označený atribútom `Tool` a dobre posiela tri notifikácie klientovi počas spracovania každého súboru. Metóda `ctx.Info()` sa používa na odosielanie informačných správ.

Na povolenie notifikácií v .NET MCP serveri sa uistite, že používate streamingový transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Klientská strana: Príjem Notifikácií

Klient musí implementovať spracovanie správ, aby spracoval a zobrazil notifikácie, keď prídu.

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

V predchádzajúcom kóde funkcia `message_handler` kontroluje, či prichádzajúca správa je notifikácia. Ak áno, vypíše notifikáciu; inak ju spracuje ako bežnú správu zo servera. Tiež všimnite si, ako je `ClientSession` inicializovaná s `message_handler` na spracovanie prichádzajúcich notifikácií.

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

V tomto .NET príklade funkcia `MessageHandler` kontroluje, či prichádzajúca správa je notifikácia. Ak áno, vypíše notifikáciu; inak ju spracuje ako bežnú správu zo servera. `ClientSession` je inicializovaná so spracovaním správ cez `ClientSessionOptions`.

Na povolenie notifikácií sa uistite, že váš server používa streamingový transport (napríklad `streamable-http`) a váš klient implementuje spracovanie správ na prijímanie notifikácií.

## Notifikácie priebehu & Scenáre

Táto sekcia vysvetľuje koncept notifikácií priebehu v MCP, prečo sú dôležité, a ako ich implementovať pomocou Streamable HTTP. Nájdete tu aj praktický úlohu na upevnenie vedomostí.

Notifikácie priebehu sú správy v reálnom čase posielané zo servera klientovi počas dlhodobých operácií. Namiesto čakania na úplné dokončenie procesu, server udržiava klienta aktualizovaného o aktuálnom stave. To zlepšuje transparentnosť, užívateľský zážitok a uľahčuje ladenie.

**Príklad:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Prečo používať notifikácie priebehu?

Notifikácie priebehu sú dôležité z niekoľkých dôvodov:

- **Lepší užívateľský zážitok:** Používatelia vidia aktualizácie počas priebehu práce, nie len na konci.
- **Spätná väzba v reálnom čase:** Klienti môžu zobrazovať progress bary alebo logy, čím aplikácia pôsobí responzívne.
- **Jednoduchšie ladenie a monitorovanie:** Vývojári a používatelia vidia, kde môže byť proces pomalý alebo zaseknutý.

### Ako implementovať notifikácie priebehu

Tu je, ako môžete implementovať notifikácie priebehu v MCP:

- **Na serveri:** Použite `ctx.info()` alebo `ctx.log()` na odosielanie notifikácií po spracovaní každého prvku. To pošle správu klientovi predtým, než je hlavný výsledok pripravený.
- **Na klientovi:** Implementujte spracovanie správ, ktoré počúva a zobrazuje notifikácie, keď prídu. Tento handler rozlišuje medzi notifikáciami a finálnym výsledkom.

**Príklad servera:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Príklad klienta:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Bezpečnostné úvahy

Pri implementácii MCP serverov s HTTP-based prenosmi sa bezpečnosť stáva kľúčovým problémom, ktorý si vyžaduje dôkladnú pozornosť voči viacerým útokovým vektorom a ochranným mechanizmom.

### Prehľad

Bezpečnosť je kritická pri vystavovaní MCP serverov cez HTTP. Streamovateľné HTTP zavádza nové útokové plochy a vyžaduje precíznu konfiguráciu.

### Kľúčové body

- **Validácia hlavičky Origin**: Vždy overujte hlavičku `Origin`, aby ste zabránili DNS rebinding útokom.
- **Viazanie na localhost**: Pre lokálny vývoj viažte servery na `localhost`, aby ste zabránili ich vystaveniu verejnému internetu.
- **Autentifikácia**: Implementujte autentifikáciu (napr. API kľúče, OAuth) pre produkčné nasadenia.
- **CORS**: Nakonfigurujte politiky Cross-Origin Resource Sharing (CORS) na obmedzenie prístupu.
- **HTTPS**: Používajte HTTPS v produkcii na šifrovanie prenosu.

### Najlepšie postupy

- Nikdy nedôverujte prichádzajúcim požiadavkám bez validácie.
- Logujte a monitorujte všetky prístupy a chyby.
- Pravidelne aktualizujte závislosti na záplatu bezpečnostných zraniteľností.

### Výzvy

- Vyváženie bezpečnosti s jednoduchosťou vývoja
- Zaistenie kompatibility s rôznymi klientskymi prostrediami

## Prechod zo SSE na Streamovateľné HTTP

Pre aplikácie, ktoré momentálne používajú Server-Sent Events (SSE), poskytuje prechod na Streamovateľné HTTP rozšírené možnosti a lepšiu dlhodobú udržateľnosť pre vaše MCP implementácie.

### Prečo upgradovať?

Existujú dva presvedčivé dôvody pre upgrade zo SSE na Streamovateľné HTTP:

- Streamovateľné HTTP ponúka lepšiu škálovateľnosť, kompatibilitu a bohatšiu podporu notifikácií než SSE.
- Je to odporúčaný transport pre nové MCP aplikácie.

### Kroky migrácie

Takto môžete migrovať zo SSE na Streamovateľné HTTP vo vašich MCP aplikáciách:

- **Aktualizujte serverový kód** na použitie `transport="streamable-http"` v `mcp.run()`.
- **Aktualizujte klientsky kód** na použitie `streamablehttp_client` namiesto SSE klienta.
- **Implementujte spracovateľa správ** v klientovi na spracovanie notifikácií.
- **Otestujte kompatibilitu** s existujúcimi nástrojmi a pracovnými tokmi.

### Udržiavanie kompatibility

Odporúča sa počas migrácie zachovať kompatibilitu so súčasnými SSE klientmi. Tu sú niektoré stratégie:

- Môžete podporovať SSE aj Streamovateľné HTTP súčasne, keď spustíte oba transporty na rôznych koncových bodoch.
- Postupne migrujte klientov na nový transport.

### Výzvy

Počas migrácie je nevyhnutné riešiť nasledujúce výzvy:

- Zaistiť, že všetci klienti budú aktualizovaní
- Riešiť rozdiely v doručovaní notifikácií

## Bezpečnostné úvahy

Bezpečnosť by mala byť najvyššou prioritou pri implementácii akéhokoľvek servera, najmä pri používaní HTTP-based transportov ako Streamovateľné HTTP v MCP.

Pri implementácii MCP serverov s HTTP-based prenosmi sa bezpečnosť stáva kľúčovým problémom, ktorý si vyžaduje dôkladnú pozornosť voči viacerým útokovým vektorom a ochranným mechanizmom.

### Prehľad

Bezpečnosť je kritická pri vystavovaní MCP serverov cez HTTP. Streamovateľné HTTP zavádza nové útokové plochy a vyžaduje precíznu konfiguráciu.

Tu sú niektoré kľúčové bezpečnostné úvahy:

- **Validácia hlavičky Origin**: Vždy overujte hlavičku `Origin`, aby ste zabránili DNS rebinding útokom.
- **Viazanie na localhost**: Pre lokálny vývoj viažte servery na `localhost`, aby ste zabránili ich vystaveniu verejnému internetu.
- **Autentifikácia**: Implementujte autentifikáciu (napr. API kľúče, OAuth) pre produkčné nasadenia.
- **CORS**: Nakonfigurujte politiky Cross-Origin Resource Sharing (CORS) na obmedzenie prístupu.
- **HTTPS**: Používajte HTTPS v produkcii na šifrovanie prenosu.

### Najlepšie postupy

Okrem toho platí dodržiavať nasledujúce najlepšie postupy pri implementácii bezpečnosti vo vašom MCP streaming serveri:

- Nikdy nedôverujte prichádzajúcim požiadavkám bez validácie.
- Logujte a monitorujte všetky prístupy a chyby.
- Pravidelne aktualizujte závislosti na záplatu bezpečnostných zraniteľností.

### Výzvy

Pri implementácii bezpečnosti v MCP streaming serveroch narazíte na niektoré výzvy:

- Vyváženie bezpečnosti s jednoduchosťou vývoja
- Zaistenie kompatibility s rôznymi klientskymi prostrediami

### Zadanie: Vytvorte vlastnú streamingovú MCP aplikáciu

**Scenár:**
Vytvorte MCP server a klienta, kde server spracuje zoznam položiek (napr. súbory alebo dokumenty) a po spracovaní každej položky pošle notifikáciu. Klient má zobraziť každú notifikáciu hneď po jej príchode.

**Kroky:**

1. Implementujte serverový nástroj, ktorý spracuje zoznam a odosiela notifikácie pre každú položku.
2. Implementujte klienta so spracovateľom správ, ktorý zobrazí notifikácie v reálnom čase.
3. Otestujte implementáciu spustením servera aj klienta a sledujte notifikácie.

[Riešenie](./solution/README.md)

## Ďalšie čítanie a čo ďalej?

Ak chcete pokračovať vo svojej ceste s MCP streamovaním a rozšíriť svoje znalosti, táto sekcia poskytuje ďalšie zdroje a navrhované ďalšie kroky pre budovanie pokročilých aplikácií.

### Ďalšie čítanie

- [Microsoft: Úvod do HTTP streamovania](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS v ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streamovacie požiadavky](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Čo ďalej?

- Vyskúšajte vytvoriť pokročilejšie MCP nástroje, ktoré používajú streamovanie pre analýzy v reálnom čase, chat alebo kolaboratívnu editáciu.
- Preskúmajte integráciu MCP streamovania s frontendovými rámcami (React, Vue, atď.) pre živé aktualizácie UI.
- Ďalej: [Využitie AI Toolkit pre VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->