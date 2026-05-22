# HTTPS Streaming s protokolom Model Context Protocol (MCP)

Táto kapitola poskytuje komplexný návod na implementáciu bezpečného, škálovateľného a v reálnom čase streamingu pomocou Model Context Protocol (MCP) cez HTTPS. Pokrýva motiváciu pre streaming, dostupné mechanizmy prenosu, ako implementovať streamovateľný HTTP v MCP, najlepšie bezpečnostné praktiky, migráciu zo SSE a praktické odporúčania pre vytváranie vlastných streamingových aplikácií MCP. 

## Mechanizmy prenosu a streaming v MCP

Táto sekcia skúma rôzne mechanizmy prenosu dostupné v MCP a ich úlohu pri umožnení streamovacích schopností pre komunikáciu v reálnom čase medzi klientmi a servermi.

### Čo je mechanizmus prenosu?

Mechanizmus prenosu definuje, ako sa vymieňajú dáta medzi klientom a serverom. MCP podporuje viaceré typy prenosov, aby vyhovel rôznym prostrediam a požiadavkám:

- **stdio**: Štandardný vstup/výstup, vhodný pre lokálne a CLI nástroje. Jednoduchý, ale nevhodný pre web alebo cloud.
- **SSE (Server-Sent Events)**: Umožňuje serverom posielať klientom aktualizácie v reálnom čase cez HTTP. Dobré pre webové UI, ale obmedzené škálovateľnosťou a flexibilitou. Od MCP špecifikácie 2025-06-18 je samostatný transport SSE (Server-Sent Events) zastaraný a nahradený transportom "Streamable HTTP".
- **Streamable HTTP**: Moderný HTTP-based streamingový transport, podporujúci notifikácie a lepšiu škálovateľnosť. Odporúčané pre väčšinu produkčných a cloudových scenárov.

### Porovnávacia tabuľka

Pozrite si nižšie porovnávaciu tabuľku, aby ste pochopili rozdiely medzi týmito mechanizmami prenosu:

| Transport         | Aktualizácie v reálnom čase | Streaming | Škálovateľnosť | Prípad použitia         |
|-------------------|----------------------------|-----------|----------------|-------------------------|
| stdio             | Nie                        | Nie       | Nízka          | Lokálne CLI nástroje     |
| SSE               | Áno                        | Áno       | Stredná        | Web, aktualizácie v reálnom čase  |
| Streamable HTTP   | Áno                        | Áno       | Vysoká         | Cloud, multi-klient       |

> **Tip:** Výber správneho transportu ovplyvňuje výkon, škálovateľnosť a používateľskú skúsenosť. **Streamable HTTP** je odporúčané pre moderné, škálovateľné a cloud-ready aplikácie.

Všímajte si transporty stdio a SSE, ktoré sme vám ukázali v predchádzajúcich kapitolách, a ako streamovateľný HTTP je transport, ktorý sa pokrýva v tejto kapitole.

## Streaming: Koncepty a motivácia

Pochopenie základných konceptov a motivácií za streamingom je nevyhnutné pre implementáciu efektívnych systémov komunikácie v reálnom čase.

**Streaming** je technika v sieťovom programovaní, ktorá umožňuje posielať a prijímať dáta v malých, spracovateľných častiach alebo ako sekvenciu udalostí, namiesto čakania na celú odpoveď. Toto je obzvlášť užitočné pre:

- Veľké súbory alebo dataset-y.
- Aktualizácie v reálnom čase (napr. chat, ukazovatele priebehu).
- Dlhodobé výpočty, kde chcete používateľa priebežne informovať.

Tu je, čo potrebujete o streamingu vedieť na vysokej úrovni:

- Dáta sa doručujú postupne, nie naraz.
- Klient môže spracovávať dáta, keď prídu.
- Znižuje vnímanú latenciu a zlepšuje používateľský zážitok.

### Prečo používať streaming?

Dôvody na použitie streamingu sú nasledovné:

- Používatelia dostávajú okamžitú spätnú väzbu, nie len na konci.
- Umožňuje aplikácie v reálnom čase a responzívne UI.
- Efektívnejšie využitie sieťových a výpočtových zdrojov.

### Jednoduchý príklad: Streamingový HTTP server a klient

Tu je jednoduchý príklad, ako možno implementovať streaming:

#### Python

**Server (Python, s FastAPI a StreamingResponse):**

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

**Klient (Python, s requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Tento príklad demonštruje server, ktorý posiela sériu správ klientovi, keď sú pripravené, namiesto čakania na všetky naraz.

**Ako to funguje:**

- Server postupne vracia každú správu, keď je pripravená.
- Klient prijíma a vypisuje každú časť, keď dorazí.

**Požiadavky:**

- Server musí použiť streamingovú odpoveď (napr. `StreamingResponse` vo FastAPI).
- Klient musí spracovávať odpoveď ako stream (`stream=True` v requests).
- Content-Type je zvyčajne `text/event-stream` alebo `application/octet-stream`.

#### Java

**Server (Java, s Spring Boot a Server-Sent Events):**

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

**Klient (Java, s Spring WebFlux WebClient):**

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

- Používa reaktívny stack Spring Boot s `Flux` pre streaming.
- `ServerSentEvent` poskytuje štruktúrovaný streaming udalostí s typmi udalostí.
- `WebClient` s `bodyToFlux()` umožňuje reaktívne spracovanie streamu.
- `delayElements()` simuluje čas spracovania medzi udalosťami.
- Udalosti môžu mať typy (`info`, `result`) pre lepšiu manipuláciu na klientskej strane.

### Porovnanie: Klasický streaming vs MCP streaming

Rozdiely medzi klasickým spôsobom streamingu a tým, ako to funguje v MCP, možno zobraziť takto:

| Vlastnosť              | Klasický HTTP Streaming      | MCP Streaming (Notifikácie)        |
|------------------------|------------------------------|-----------------------------------|
| Hlavná odpoveď         | Rozdelená na časti (chunked) | Jedna, na konci                   |
| Aktualizácie priebehu  | Posielané ako časti dát       | Posielané ako notifikácie         |
| Požiadavky na klienta  | Musí spracovať stream         | Musí implementovať spracovateľa správ  |
| Prípad použitia        | Veľké súbory, AI token streemy| Priebeh, logy, spätná väzba v reálnom čase |

### Kľúčové pozorované rozdiely

Ďalej tu sú niektoré hlavné rozdiely:

- **Komunikačný vzor:**
  - Klasický HTTP streaming: Používa jednoduché chunked prenášanie dát po častiach.
  - MCP streaming: Používa štruktúrovaný systém notifikácií s JSON-RPC protokolom.

- **Formát správ:**
  - Klasický HTTP: Plain text časti s novými riadkami.
  - MCP: Štruktúrované objekty LoggingMessageNotification s metadátami.

- **Implementácia klienta:**
  - Klasický HTTP: Jednoduchý klient, ktorý spracúva streaming odpovede.
  - MCP: Sofistikovanejší klient so správcom správ na spracovanie rôznych typov správ.

- **Aktualizácie priebehu:**
  - Klasický HTTP: Priebeh je súčasťou hlavného toku odpovede.
  - MCP: Priebeh sa posiela cez samostatné notifikačné správy, zatiaľ čo hlavná odpoveď príde na konci.

### Odporúčania

Odporúčame niekoľko vecí pri rozhodovaní medzi klasickým streamingom (ako endpoint, ktorý sme ukázali vyššie s `/stream`) a streamingom cez MCP.

- **Pre jednoduché streamingové potreby:** Klasický HTTP streaming je jednoduchší na implementáciu a postačuje pre základné potrieb streamingu.

- **Pre komplexné, interaktívne aplikácie:** MCP streaming poskytuje štruktúrovanejší prístup s bohatšími metadátami a oddelením medzi notifikáciami a finálnymi výsledkami.

- **Pre AI aplikácie:** Notifikačný systém MCP je mimoriadne užitočný pre dlhodobé AI úlohy, kde chcete používateľov priebežne informovať o stave.

## Streaming v MCP

Takže ste už videli odporúčania a porovnania rozdielov medzi klasickým streamingom a streamingom v MCP. Poďme podrobnejšie preskúmať, ako môžete streaming v MCP využiť.

Pochopenie, ako streaming funguje v rámci MCP, je zásadné pre tvorbu responzívnych aplikácií, ktoré poskytujú spätnú väzbu v reálnom čase používateľom počas dlhodobých operácií.

V MCP nejde o posielanie hlavnej odpovede po častiach, ale o posielanie **notifikácií** klientovi, kým nástroj spracováva požiadavku. Tieto notifikácie môžu obsahovať aktualizácie priebehu, logy alebo iné udalosti.

### Ako to funguje

Hlavný výsledok sa stále posiela ako jedna odpoveď. Notifikácie sa však môžu posielať ako samostatné správy počas spracovania a tým aktualizovať klienta v reálnom čase. Klient musí byť schopný tieto notifikácie spracovať a zobraziť.

## Čo je notifikácia?

Povedali sme "Notifikácia", čo to znamená v kontexte MCP?

Notifikácia je správa odoslaná zo servera klientovi, aby informovala o priebehu, stave alebo iných udalostiach počas dlhodobej operácie. Notifikácie zlepšujú transparentnosť a používateľský zážitok.

Napríklad klient má poslať notifikáciu, keď prebehne počiatočné overenie so serverom.

Notifikácia vyzerá takto ako JSON správa:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifikácie patria k téme v MCP označovanej ako ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Aby logging fungoval, server musí túto funkciu/podporu povoliť takto:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> V závislosti od použitého SDK môže byť logging predvolene povolený, alebo ho možno budete musieť explicitne zapnúť v konfigurácii servera.

Existujú rôzne typy notifikácií:

| Úroveň    | Popis                         | Príklad použitia             |
|-----------|------------------------------|-----------------------------|
| debug     | Detailné ladacie informácie  | Vstupné/výstupné body funkcie |
| info      | Všeobecné informačné správy  | Aktualizácie priebehu operácie |
| notice    | Normálne, ale významné udalosti | Zmeny konfigurácie         |
| warning   | Varovné podmienky            | Použitie zastaranej funkcie   |
| error     | Chybové stavy               | Zlyhanie operácie           |
| critical  | Kritické stavy              | Zlyhanie systémových komponentov |
| alert     | Nutná okamžitá akcia        | Zistená korupcia dát        |
| emergency | Systém je nepoužiteľný      | Kompletné zlyhanie systému  |

## Implementácia notifikácií v MCP

Pre implementáciu notifikácií v MCP je potrebné nastaviť server aj klienta tak, aby dokázali spracovávať aktualizácie v reálnom čase. To umožňuje vašej aplikácii poskytovať okamžitú spätnú väzbu používateľom počas dlhodobých operácií.

### Serverská časť: Odosielanie notifikácií

Začnime serverovou časťou. V MCP definujete nástroje, ktoré môžu odosielať notifikácie počas spracovania požiadaviek. Server používa objekt kontextu (zvyčajne `ctx`) na posielanie správ klientovi.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

V predchádzajúcom príklade nástroj `process_files` posiela tri notifikácie klientovi, keď spracováva jednotlivé súbory. Metóda `ctx.info()` sa používa na posielanie informačných správ.

Okrem toho, aby sa povolili notifikácie, uistite sa, že server používa streamingový transport (napr. `streamable-http`) a klient implementuje správcu správ na spracovanie notifikácií. Tu je ako nastaviť server na použitie transportu `streamable-http`:

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

V tomto príklade v .NET je nástroj `ProcessFiles` označený atribútom `Tool` a posiela tri notifikácie klientovi počas spracovania súborov. Metóda `ctx.Info()` sa používa na posielanie informačných správ.

Na povolenie notifikácií vo vašom MCP serveri v .NET sa uistite, že používate streamingový transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Klientská časť: Prijímanie notifikácií

Klient musí implementovať správcu správ na spracovanie a zobrazovanie notifikácií, keď dorazia.

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

V predchádzajúcom kóde funkcia `message_handler` kontroluje, či je prichádzajúca správa notifikáciou. Ak áno, vypíše notifikáciu, inak ju spracuje ako obyčajnú serverovú správu. Tiež si všimnite, že `ClientSession` je inicializovaná so správcom správ pre spracovanie notifikácií.

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

V tomto príklade v .NET funkcia `MessageHandler` kontroluje, či je prichádzajúca správa notifikáciou. Ak áno, vypíše notifikáciu, inak ju spracuje ako bežnú serverovú správu. `ClientSession` je inicializovaná so správcom správ cez `ClientSessionOptions`.

Na povolenie notifikácií sa uistite, že váš server používa streamingový transport (napr. `streamable-http`) a klient implementuje správcu správ na spracovanie notifikácií.

## Notifikácie priebehu a scenáre

Táto sekcia vysvetľuje koncept notifikácií priebehu v MCP, prečo sú dôležité a ako ich implementovať pomocou Streamable HTTP. Nájdete tu aj praktickú úlohu na posilnenie porozumenia.

Notifikácie priebehu sú správy v reálnom čase, ktoré server posiela klientovi počas dlhodobých operácií. Namiesto čakania na dokončenie celého procesu server priebežne aktualizuje klienta o aktuálnom stave. To zvyšuje transparentnosť, používateľský zážitok a uľahčuje ladenie.

**Príklad:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Prečo používať notifikácie priebehu?

Notifikácie priebehu sú kľúčové z viacerých dôvodov:

- **Lepší používateľský zážitok:** Používatelia vidia aktualizácie počas práce, nielen na konci.
- **Spätná väzba v reálnom čase:** Klienti môžu zobrazovať ukazovatele priebehu alebo logy, čím je aplikácia responsívnejšia.
- **Jednoduchšie ladenie a monitorovanie:** Vývojári a používatelia vidia, kde môže byť proces pomalý alebo zablokovaný.

### Ako implementovať notifikácie priebehu

Tu je ako môžete implementovať notifikácie priebehu v MCP:

- **Na serveri:** Používajte `ctx.info()` alebo `ctx.log()` na posielanie notifikácií počas spracovania jednotlivých položiek. Tieto správy sa posielajú klientovi pred tým, ako je pripravený hlavný výsledok.
- **Na klientovi:** Implementujte správcu správ, ktorý počúva a zobrazuje notifikácie, keď dorazia. Tento správca rozlišuje medzi notifikáciami a finálnym výsledkom.

**Serverový príklad:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Klientsky príklad:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Bezpečnostné úvahy

Pri implementácii MCP serverov s HTTP-based transportmi je bezpečnosť prvoradým záujmom, ktorý si vyžaduje dôkladnú pozornosť viacerým útokovým vektorom a ochranným mechanizmom.

### Prehľad

Bezpečnosť je kritická pri vystavení MCP serverov cez HTTP. Streamable HTTP prináša nové možnosti útokov a vyžaduje starostlivú konfiguráciu.

### Kľúčové body

- **Validácia hlavičky Origin:** Vždy validujte hlavičku `Origin`, aby ste zabránili DNS rebinding útokom.
- **Viazanie na localhost:** Pre lokálny vývoj viažte servery na `localhost`, aby ste ich neexponovali verejne na internete.
- **Autentifikácia:** Pre produkčné nasadenia implementujte autentifikáciu (napr. API kľúče, OAuth).
- **CORS:** Nakonfigurujte politiky Cross-Origin Resource Sharing (CORS) na obmedzenie prístupu.
- **HTTPS:** V produkcii používajte HTTPS na šifrovanie prenosu.

### Najlepšie praktiky

- Nikdy neverte prichádzajúcim požiadavkám bez validácie.
- Logujte a monitorujte všetky prístupy a chyby.
- Pravidelne aktualizujte závislosti kvôli záplatám bezpečnostných chýb.

### Výzvy
- Vyvažovanie bezpečnosti a jednoduchosti vývoja
- Zabezpečenie kompatibility s rôznymi klientskymi prostrediami

## Prechod zo SSE na Streamable HTTP

Pre aplikácie, ktoré momentálne používajú Server-Sent Events (SSE), prináša migrácia na Streamable HTTP rozšírené možnosti a lepšiu dlhodobú udržateľnosť vašich MCP implementácií.

### Prečo upgradovať?

Existujú dva presvedčivé dôvody na prechod zo SSE na Streamable HTTP:

- Streamable HTTP ponúka lepšiu škálovateľnosť, kompatibilitu a bohatšiu podporu notifikácií ako SSE.
- Je to odporúčaný prenos pre nové MCP aplikácie.

### Kroky migrácie

Tu je postup, ako môžete prejsť zo SSE na Streamable HTTP vo vašich MCP aplikáciách:

- **Aktualizujte kód servera** tak, aby používal `transport="streamable-http"` v `mcp.run()`.
- **Aktualizujte klientsky kód** tak, aby používal `streamablehttp_client` namiesto SSE klienta.
- **Implementujte spracovateľa správ** v klientovi na spracovanie notifikácií.
- **Otestujte kompatibilitu** s existujúcimi nástrojmi a pracovnými postupmi.

### Zachovanie kompatibility

Odporúča sa zachovať kompatibilitu s existujúcimi SSE klientmi počas procesu migrácie. Tu sú niektoré stratégie:

- Môžete podporovať súčasne SSE aj Streamable HTTP spustením oboch prenosov na rôznych koncových bodoch.
- Postupne migrujte klientov na nový prenos.

### Výzvy

Počas migrácie je potrebné riešiť nasledujúce výzvy:

- Zabezpečiť, aby boli všetci klienti aktualizovaní
- Riešiť rozdiely v doručovaní notifikácií

## Bezpečnostné úvahy

Bezpečnosť by mala byť najvyššou prioritou pri implementácii akéhokoľvek servera, najmä pri používaní HTTP založených prenosov ako Streamable HTTP v MCP.

Pri implementácii MCP serverov s HTTP prenosmi sa bezpečnosť stáva kľúčovou záležitosťou, ktorá vyžaduje dôkladnú pozornosť viacerým vektorom útokov a mechanizmom ochrany.

### Prehľad

Bezpečnosť je kritická pri sprístupňovaní MCP serverov cez HTTP. Streamable HTTP prináša nové útokové plochy a vyžaduje starostlivú konfiguráciu.

Tu sú kľúčové bezpečnostné úvahy:

- **Overovanie hlavičky Origin**: Vždy overujte hlavičku `Origin`, aby ste zabránili DNS rebinding útokom.
- **Väzba na localhost**: Pri lokálnom vývoji viažte servery na `localhost`, aby neboli prístupné z verejného internetu.
- **Overovanie prístupu (Authentication)**: Implementujte overovanie (napríklad API kľúče, OAuth) pre produkčné nasadenia.
- **CORS**: Nakonfigurujte politiky Cross-Origin Resource Sharing (CORS) na obmedzenie prístupu.
- **HTTPS**: Používajte HTTPS v produkcii na zašifrovanie prenosu.

### Najlepšie postupy

Ďalej sú uvedené najlepšie postupy, ktoré treba dodržiavať pri implementácii bezpečnosti vášho MCP streaming servera:

- Nikdy neverte neovereným požiadavkám.
- Zaznamenávajte a monitorujte všetky prístupy a chyby.
- Pravidelne aktualizujte závislosti na záplatu bezpečnostných zraniteľností.

### Výzvy

Pri implementácii bezpečnosti v MCP streaming serveroch sa stretnete s nasledujúcimi výzvami:

- Vyváženie bezpečnosti a jednoduchosti vývoja
- Zabezpečenie kompatibility s rôznymi klientskymi prostrediami

### Zadanie: Vytvorte si vlastnú streamingovú MCP aplikáciu

**Scenár:**
Vytvorte MCP server a klienta, kde server spracuje zoznam položiek (napr. súbory alebo dokumenty) a pre každú spracovanú položku pošle notifikáciu. Klient by mal zobrazovať každú notifikáciu hneď, ako dorazí.

**Kroky:**

1. Implementujte serverový nástroj, ktorý spracováva zoznam a posiela notifikácie pre každú položku.
2. Implementujte klienta so spracovateľom správ, ktorý zobrazí notifikácie v reálnom čase.
3. Otestujte svoju implementáciu tým, že spustíte server a klienta a sledujte notifikácie.

[Solution](./solution/README.md)

## Ďalšie čítanie a čo ďalej?

Pre pokračovanie vo vašej ceste s MCP streamingom a rozšírenie vedomostí táto sekcia poskytuje ďalšie zdroje a odporúčané ďalšie kroky pre budovanie pokročilejších aplikácií.

### Ďalšie čítanie

- [Microsoft: Úvod do HTTP streamingu](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS v ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Čo ďalej?

- Skúste vybudovať pokročilejšie MCP nástroje, ktoré používajú streaming pre analýzy v reálnom čase, chat alebo kolaboratívne úpravy.
- Preskúmajte integráciu MCP streamingu s frontendovými frameworkmi (React, Vue a pod.) pre živé aktualizácie UI.
- Ďalšie: [Využitie AI Toolkit pre VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->