# HTTPS streamovanie s Model Context Protocol (MCP)

Táto kapitola poskytuje komplexný návod na implementáciu bezpečného, škálovateľného a v reálnom čase streamovania pomocou Model Context Protocol (MCP) cez HTTPS. Pokrýva motiváciu pre streamovanie, dostupné transportné mechanizmy, ako implementovať streamovateľné HTTP v MCP, bezpečnostné najlepšie praktiky, migráciu zo SSE a praktické usmernenia pre tvorbu vlastných streamingových MCP aplikácií.

> **Výhľad do budúcnosti:** Táto lekcia popisuje Streamovateľné HTTP podľa **Špecifikácie MCP 2025-11-25**, kde sa relácia ustanovuje počas `initialize` a pripevňuje sa cez hlavičku `Mcp-Session-Id`. Kandidát na vydanie `2026-07-28` úplne odstraňuje handshaking a ID relácie, čím každý požiadavok je samostatný a môže byť smerovaný na akúkoľvek inštanciu servera bez viazaných relácií. Podrobnosti nájdete v [Čo sa mení v MCP: Kandidát na vydanie 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Transportné mechanizmy a streamovanie v MCP

Táto sekcia skúma rôzne dostupné transportné mechanizmy v MCP a ich rolu pri umožňovaní streamovacích schopností pre komunikáciu v reálnom čase medzi klientmi a servermi.

### Čo je transportný mechanizmus?

Transportný mechanizmus určuje, ako sa vymieňajú dáta medzi klientom a serverom. MCP podporuje viacero typov transportov, ktoré vyhovujú rôznym prostrediam a požiadavkám:

- **stdio**: Štandardný vstup/výstup, vhodný pre lokálne a príkazové nástroje. Jednoduchý, ale nevhodný pre web alebo cloud.
- **SSE (Server-Sent Events)**: Umožňuje serverom posielať klientom aktualizácie v reálnom čase cez HTTP. Dobré pre webové UI, ale obmedzené v škálovateľnosti a flexibilite. Od Špecifikácie MCP 2025-06-18 je samostatný SSE transport zastaraný a nahradený transportom "Streamovateľné HTTP".
- **Streamovateľné HTTP**: Moderný HTTP-based streamingový transport, podporujúci notifikácie a lepšiu škálovateľnosť. Odporúča sa pre väčšinu produkčných a cloudových scenárov.

### Porovnávacia tabuľka

Pozrite si nižšie porovnávaciu tabuľku, aby ste pochopili rozdiely medzi týmito transportnými mechanizmami:

| Transport         | Aktualizácie v reálnom čase | Streamovanie | Škálovateľnosť | Použitie                |
|-------------------|-----------------------------|-------------|----------------|-------------------------|
| stdio             | Nie                         | Nie         | Nízka          | Lokálne CLI nástroje     |
| SSE               | Áno                         | Áno         | Stredná        | Web, aktualizácie v reálnom čase |
| Streamovateľné HTTP | Áno                       | Áno         | Vysoká         | Cloud, viac klientov     |

> **Tip:** Výber správneho transportu ovplyvňuje výkon, škálovateľnosť a užívateľský zážitok. **Streamovateľné HTTP** je odporúčané pre moderné, škálovateľné a cloudové aplikácie.

Všímajte si transporty stdio a SSE, ktoré ste videli v predchádzajúcich kapitolách, a ako streamovateľné HTTP je transportom pokrytým v tejto kapitole.

## Streamovanie: Koncepty a motivácia

Pochopenie základných konceptov a motivácií za streamovaním je nevyhnutné pre implementáciu efektívnych systémov pre komunikáciu v reálnom čase.

**Streamovanie** je technika v sieťovom programovaní, ktorá umožňuje posielať a prijímať dáta v malých, spravovateľných častiach alebo ako sekvenciu udalostí, namiesto čakania, až bude celý výsledok pripravený. To je obzvlášť užitočné pre:

- Veľké súbory alebo dátové sady.
- Aktualizácie v reálnom čase (napr. chat, ukazovatele priebehu).
- Dlhé výpočty, kde chcete držať používateľa informovaného.

Tu je, čo potrebujete vedieť o streamovaní zhruba:

- Dáta sa doručujú postupne, nie naraz.
- Klient môže spracovať dáta, keď prichádzajú.
- Znižuje vnímanú latenciu a zlepšuje užívateľský zážitok.

### Prečo používať streamovanie?

Dôvody používania streamovania sú nasledujúce:

- Používatelia dostanú spätnú väzbu okamžite, nie len na konci.
- Umožňuje aplikáciám v reálnom čase a responzívnym UI.
- Efektívnejšie využitie siete a výpočtových zdrojov.

### Jednoduchý príklad: HTTP streamovací server a klient

Tu je jednoduchý príklad, ako môže byť streamovanie implementované:

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

Tento príklad demonštruje server, ktorý posiela sériu správ klientovi, keď sú dostupné, namiesto čakania na všetky správy naraz.

**Ako to funguje:**

- Server vydáva každú správu, keď je pripravená.
- Klient prijíma a vypisuje každú časť, keď príde.

**Požiadavky:**

- Server musí použiť streamovaciu odpoveď (napr. `StreamingResponse` vo FastAPI).
- Klient musí spracovať odpoveď ako stream (`stream=True` v requests).
- Content-Type je obvykle `text/event-stream` alebo `application/octet-stream`.

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

- Používa reaktívny stack Spring Boot s `Flux` pre streamovanie
- `ServerSentEvent` poskytuje štruktúrované streamovanie udalostí s typmi udalostí
- `WebClient` s `bodyToFlux()` umožňuje reaktívne spracovanie streamu
- `delayElements()` simuluje čas spracovania medzi udalosťami
- Udalosti môžu mať typy (`info`, `result`) pre lepšie spracovanie klientom

### Porovnanie: Klasické streamovanie vs MCP streamovanie

Rozdiely medzi tým, ako funguje streamovanie "klasicky" oproti tomu, ako funguje v MCP, možno znázorniť takto:

| Funkcia               | Klasické HTTP streamovanie    | MCP streamovanie (notifikácie)   |
|-----------------------|------------------------------|----------------------------------|
| Hlavná odpoveď         | Delená na časti (chunked)     | Jedna, na konci                   |
| Aktualizácie priebehu  | Posielané ako dátové časti    | Posielané ako notifikácie        |
| Požiadavky klienta     | Musí spracovať stream         | Musí implementovať správcu správ  |
| Použitie               | Veľké súbory, AI token stream | Priebeh, logy, spätná väzba v reálnom čase  |

### Kľúčové pozorované rozdiely

Ďalej sú niektoré kľúčové rozdiely:

- **Komunikačný vzor:**
  - Klasické HTTP streamovanie: používa jednoduché chunked transfer kódovanie na odosielanie dát v častiach
  - MCP streamovanie: používa štruktúrovaný systém notifikácií s JSON-RPC protokolom

- **Formát správ:**
  - Klasické HTTP: obyčajné textové úseky s novými riadkami
  - MCP: štruktúrované objekty LoggingMessageNotification s metadátami

- **Implementácia klienta:**
  - Klasické HTTP: jednoduchý klient spracujúci streamované odpovede
  - MCP: sofistikovanejší klient s správcom správ na spracovanie rôznych typov správ

- **Aktualizácie priebehu:**
  - Klasické HTTP: priebeh je súčasťou hlavného streamu odpovede
  - MCP: priebeh je posielaný cez samostatné notifikačné správy, zatiaľ čo hlavná odpoveď príde na konci

### Odporúčania

Existujú určité odporúčania pri rozhodovaní medzi implementáciou klasického streamovania (ako endpoint, ktorý sme ukázali vyššie s `/stream`) a streamovaním cez MCP.

- **Pre jednoduché potreby streamovania:** Klasické HTTP streamovanie je jednoduchšie na implementáciu a postačuje pre základné potreby streamovania.

- **Pre zložité, interaktívne aplikácie:** MCP streamovanie poskytuje štruktúrovanejší prístup s bohatými metadátami a oddelením notifikácií od konečných výsledkov.

- **Pre AI aplikácie:** Notifikačný systém MCP je obzvlášť užitočný pre dlhodobé AI úlohy, kde chcete používateľov informovať o priebehu.

## Streamovanie v MCP

Dobre, takže ste zatiaľ videli niektoré odporúčania a porovnania ohľadom rozdielov medzi klasickým streamovaním a streamovaním v MCP. Poďme sa podrobnejšie pozrieť na to, ako presne môžete využiť streamovanie v MCP.

Pochopenie, ako streamovanie funguje v rámci MCP, je nevyhnutné pre tvorbu responzívnych aplikácií, ktoré poskytujú užívateľom spätnú väzbu v reálnom čase počas dlhodobých operácií.

V MCP nejde o posielanie hlavnej odpovede po častiach, ale o posielanie **notifikácií** klientovi počas spracúvania požiadavky nástrojom. Tieto notifikácie môžu obsahovať aktualizácie priebehu, logy alebo iné udalosti.

### Ako to funguje

Hlavný výsledok sa stále posiela ako jedna odpoveď. Notifikácie sa však môžu posielať ako samostatné správy počas spracovania, čím sa klient aktualizuje v reálnom čase. Klient musí byť schopný tieto notifikácie spracovávať a zobrazovať.

## Čo je to notifikácia?

Spomenuli sme "Notifikáciu", čo to znamená v kontexte MCP?

Notifikácia je správa odoslaná zo servera klientovi na informovanie o priebehu, stave alebo iných udalostiach počas dlhoročnej operácie. Notifikácie zlepšujú transparentnosť a užívateľský zážitok.

Napríklad klient má poslať notifikáciu, keď je ukončené inicializačné prepojenie (handshake) so serverom.

Notifikácia vyzerá ako JSON správa:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifikácie patria pod tému v MCP nazývanú ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Na to, aby logging fungoval, musí server túto schopnosť/feature povoliť takto:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> V závislosti od používaného SDK môže byť logging predvolený zapnutý, alebo ho možno budete musieť explicitne povoliť v konfigurácii servera.

Existujú rôzne typy notifikácií:

| Úroveň    | Popis                         | Príklad použitia              |
|-----------|-------------------------------|------------------------------|
| debug     | Podrobné debugovacie informácie | Vstupné a výstupné body funkcie |
| info      | Všeobecné informačné správy   | Aktualizácie priebehu operácie |
| notice    | Bežné, ale dôležité udalosti  | Zmeny konfigurácie           |
| warning   | Varovné stavy                | Použitie zastaranej funkcie |
| error     | Chybové stavy                 | Zlyhania operácie           |
| critical  | Kritické stavy                | Zlyhania komponentov systému |
| alert     | Okamžitá nutná akcia          | Detekcia poškodenia dát     |
| emergency | Systém je nepoužiteľný        | Kompletný výpadok systému   |

## Implementácia notifikácií v MCP

Na implementáciu notifikácií v MCP je potrebné nastaviť serverovú aj klientsku stranu na spracovanie aktualizácií v reálnom čase. Týmto spôsobom môže vaša aplikácia poskytovať okamžitú spätnú väzbu používateľom počas dlhodobých operácií.

### Serverová strana: Odosielanie notifikácií

Začnime na strane servera. V MCP definujete nástroje, ktoré môžu odosielať notifikácie počas spracovania požiadaviek. Server používa kontextový objekt (zvyčajne `ctx`) na odoslanie správ klientovi.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

V predchádzajúcom príklade nástroj `process_files` posiela tri notifikácie klientovi počas spracovania každého súboru. Metóda `ctx.info()` sa používa na odosielanie informačných správ.

Na povolenie notifikácií sa uistite, že váš server používa streamovací transport (ako `streamable-http`) a váš klient implementuje správcu správ na spracovanie notifikácií. Takto môžete nastaviť server na použitie transportu `streamable-http`:

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

V tomto .NET príklade je nástroj `ProcessFiles` označený atribútom `Tool` a odosiela tri notifikácie klientovi počas spracovania každého súboru. Metóda `ctx.Info()` sa používa na odosielanie informačných správ.

Na povolenie notifikácií vo vašom .NET MCP serveri sa uistite, že používate streamovací transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Klientská strana: Prijímanie notifikácií

Klient musí implementovať správcu správ na spracovanie a zobrazovanie notifikácií, keď prichádzajú.

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

V predchádzajúcom kóde funkcia `message_handler` kontroluje, či prichádzajúca správa je notifikácia. Ak áno, vypíše ju; inak ju spracuje ako bežnú správu zo servera. Tiež si všimnite, že `ClientSession` je inicializovaná s `message_handler` na spracovanie prichádzajúcich notifikácií.

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

V tomto .NET príklade funkcia `MessageHandler` kontroluje, či prichádzajúca správa je notifikácia. Ak áno, vypíše ju; inak ju spracuje ako bežnú správu zo servera. `ClientSession` je inicializovaná so správcom správ cez `ClientSessionOptions`.

Na povolenie notifikácií sa uistite, že váš server používa streamovací transport (napr. `streamable-http`) a váš klient implementuje správcu správ na spracovanie notifikácií.

## Notifikácie priebehu & scenáre

Táto sekcia vysvetľuje koncept notifikácií priebehu v MCP, prečo sú dôležité a ako ich implementovať pomocou Streamovateľného HTTP. Nájdete tu tiež praktické cvičenie na upevnenie vedomostí.

Notifikácie priebehu sú správy v reálnom čase odosielané zo servera klientovi počas dlhodobých operácií. Namiesto čakania na dokončenie celej operácie server priebežne klienta informuje o aktuálnom stave. To zvyšuje transparentnosť, užívateľský zážitok a uľahčuje ladenie.

**Príklad:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Prečo používať notifikácie priebehu?

Notifikácie priebehu sú kľúčové z nasledujúcich dôvodov:

- **Lepší užívateľský zážitok:** Používatelia vidia aktualizácie počas práce, nie len na konci.
- **Spätná väzba v reálnom čase:** Klienti môžu zobrazovať ukazovatele priebehu alebo logy, čím aplikácia pôsobí responzívnejšie.
- **Jednoduchšie ladenie a monitorovanie:** Vývojári a používatelia vidia, kde môže byť proces pomalý alebo zablokovaný.

### Ako implementovať notifikácie priebehu

Takto môžete implementovať notifikácie priebehu v MCP:

- **Na serveri:** Používajte `ctx.info()` alebo `ctx.log()` na odosielanie notifikácií po spracovaní každej položky. Správa je poslaná klientovi predtým, než je pripravený hlavný výsledok.
- **Na klientovi:** Implementujte správcu správ, ktorý počúva na notifikácie a zobrazuje ich po príchode. Tento správca rozlišuje notifikácie a konečný výsledok.

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

Pri implementácii MCP serverov s HTTP transportmi sa bezpečnosť stáva zásadným problémom, ktorý vyžaduje dôkladnú pozornosť viacerým typom útokov a ochranným mechanizmom.

### Prehľad

Bezpečnosť je kľúčová pri vystavovaní MCP serverov cez HTTP. Streamovateľné HTTP prináša nové potenciálne slabé miesta a vyžaduje dôkladné nastavenie.

### Kľúčové body


- **Overenie hlavičky Origin**: Vždy overujte hlavičku `Origin`, aby ste predišli útokom DNS rebinding.
- **Viazanie na localhost**: Pre lokálny vývoj viažte servery na `localhost`, aby ste ich neexponovali do verejného internetu.
- **Autentifikácia**: Implementujte autentifikáciu (napr. API kľúče, OAuth) pre produkčné nasadenia.
- **CORS**: Konfigurujte politiky Cross-Origin Resource Sharing (CORS) na obmedzenie prístupu.
- **HTTPS**: Používajte HTTPS v produkcii na šifrovanie prenosu.

### Najlepšie postupy

- Nikdy neverte prichádzajúcim požiadavkám bez overenia.
- Logujte a monitorujte všetky prístupy a chyby.
- Pravidelne aktualizujte závislosti, aby ste opravili bezpečnostné zraniteľnosti.

### Výzvy

- Vyváženie bezpečnosti a jednoduchosti vývoja
- Zabezpečenie kompatibility s rôznymi klientskymi prostrediami

## Upgrade zo SSE na Streamable HTTP

Pre aplikácie aktuálne používajúce Server-Sent Events (SSE) migrácia na Streamable HTTP prináša rozšírené schopnosti a lepšiu dlhodobú udržateľnosť vašich MCP implementácií.

### Prečo upgradovať?

Existujú dva presvedčivé dôvody na upgrade zo SSE na Streamable HTTP:

- Streamable HTTP ponúka lepšiu škálovateľnosť, kompatibilitu a bohatšiu podporu notifikácií ako SSE.
- Je odporúčaným transportom pre nové MCP aplikácie.

### Kroky migrácie

Takto môžete migrovať zo SSE na Streamable HTTP vo vašich MCP aplikáciách:

- **Aktualizujte serverový kód** na použitie `transport="streamable-http"` v `mcp.run()`.
- **Aktualizujte klientsky kód** na použitie `streamablehttp_client` namiesto SSE klienta.
- **Implementujte spracovateľ správ** v klientovi na spracovanie notifikácií.
- **Otestujte kompatibilitu** s existujúcimi nástrojmi a pracovnými tokmi.

### Udržiavanie kompatibility

Odporúča sa počas migrácie udržiavať kompatibilitu s existujúcimi SSE klientmi. Tu sú niektoré stratégie:

- Môžete podporovať SSE aj Streamable HTTP spustením oboch transportov na rôznych endpointoch.
- Postupne migrujte klientov na nový transport.

### Výzvy

Uistite sa, že počas migrácie riešite nasledujúce výzvy:

- Zabezpečenie aktualizácie všetkých klientov
- Riešenie rozdielov v doručovaní notifikácií

## Bezpečnostné aspekty

Bezpečnosť by mala byť najvyššou prioritou pri implementácii akéhokoľvek servera, obzvlášť pri použití HTTP transportov ako Streamable HTTP v MCP.

Pri implementácii MCP serverov s HTTP transportmi sa bezpečnosť stáva kľúčovou otázkou, ktorá si vyžaduje dôkladnú pozornosť viacerým vektorom útokov a ochranným mechanizmom.

### Prehľad

Bezpečnosť je kritická pri vystavovaní MCP serverov cez HTTP. Streamable HTTP prináša nové bezpečnostné riziká a vyžaduje opatrnú konfiguráciu.

Tu sú kľúčové bezpečnostné úvahy:

- **Overenie hlavičky Origin**: Vždy overujte hlavičku `Origin`, aby ste predišli útokom DNS rebinding.
- **Viazanie na localhost**: Pre lokálny vývoj viažte servery na `localhost`, aby ste ich neexponovali do verejného internetu.
- **Autentifikácia**: Implementujte autentifikáciu (napr. API kľúče, OAuth) pre produkčné nasadenia.
- **CORS**: Konfigurujte politiky Cross-Origin Resource Sharing (CORS) na obmedzenie prístupu.
- **HTTPS**: Používajte HTTPS v produkcii na šifrovanie prenosu.

### Najlepšie postupy

Navyše tu sú niektoré najlepšie postupy, ktoré treba dodržiavať pri implementácii bezpečnosti vo vašom MCP streamovacom serveri:

- Nikdy neverte prichádzajúcim požiadavkám bez overenia.
- Logujte a monitorujte všetky prístupy a chyby.
- Pravidelne aktualizujte závislosti, aby ste opravili bezpečnostné zraniteľnosti.

### Výzvy

Pri implementácii bezpečnosti vo MCP streamovacích serveroch narazíte na niektoré výzvy:

- Vyváženie bezpečnosti a jednoduchosti vývoja
- Zabezpečenie kompatibility s rôznymi klientskymi prostrediami

### Zadanie: Vytvorte si vlastnú streamingovú MCP aplikáciu

**Scenár:**
Vytvorte MCP server a klienta, kde server spracováva zoznam položiek (napr. súbory alebo dokumenty) a odošle notifikáciu pre každú spracovanú položku. Klient by mal zobrazovať každú notifikáciu, keď príde.

**Kroky:**

1. Implementujte serverový nástroj, ktorý spracuje zoznam a odošle notifikácie pre každú položku.
2. Implementujte klienta so spracovateľom správ na zobrazenie notifikácií v reálnom čase.
3. Otestujte vašu implementáciu spustením servera a klienta a sledujte notifikácie.

[Riešenie](./solution/README.md)

## Ďalšie čítanie a čo ďalej?

Ak chcete pokračovať vo vašej ceste s MCP streamovaním a rozšíriť svoje vedomosti, táto sekcia poskytuje ďalšie zdroje a odporúčané ďalšie kroky na tvorbu pokročilejších aplikácií.

### Ďalšie čítanie

- [Microsoft: Úvod do HTTP streamovania](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS v ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Čo ďalej?

- Vyskúšajte vytvoriť pokročilejšie MCP nástroje používajúce streamovanie pre analytiku v reálnom čase, chat alebo kolaboratívnu úpravu.
- Preskúmajte integráciu MCP streamovania s frontend rámcami (React, Vue a pod.) pre živé aktualizácie UI.
- Ďalej: [Využitie AI Toolkit pre VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->