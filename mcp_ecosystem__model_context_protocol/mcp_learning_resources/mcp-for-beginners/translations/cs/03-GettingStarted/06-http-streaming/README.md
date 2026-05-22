# HTTPS Streaming s protokolem Model Context Protocol (MCP)

Tato kapitola poskytuje komplexní průvodce implementací bezpečného, škálovatelného a streamovaného přenosu v reálném čase s Model Context Protocol (MCP) pomocí HTTPS. Pokrývá motivaci pro streamování, dostupné transportní mechanismy, jak implementovat streamovatelné HTTP v MCP, bezpečnostní osvědčené postupy, migraci ze SSE a praktické pokyny pro vytváření vlastních streamovacích aplikací MCP.

## Transportní mechanismy a streamování v MCP

Tato sekce zkoumá různé dostupné transportní mechanismy v MCP a jejich roli při umožnění streamovacích schopností pro komunikaci v reálném čase mezi klienty a servery.

### Co je transportní mechanismus?

Transportní mechanismus definuje, jak jsou data vyměňována mezi klientem a serverem. MCP podporuje více typů transportu, aby vyhověl různým prostředím a požadavkům:

- **stdio**: Standardní vstup/výstup, vhodné pro lokální a CLI nástroje. Jednoduché, ale nevhodné pro web nebo cloud.
- **SSE (Server-Sent Events)**: Umožňuje serverům zasílat klientům aktualizace v reálném čase přes HTTP. Dobré pro webové uživatelské rozhraní, ale omezené v škálovatelnosti a flexibilitě. Od specifikace MCP 2025-06-18 byl samostatný SSE transport (Server-Sent Events) zastaralý a nahrazen transportem "Streamable HTTP".
- **Streamable HTTP**: Moderní HTTP založený streamovací transport, podporující notifikace a lepší škálovatelnost. Doporučený pro většinu produkčních a cloudových scénářů.

### Porovnávací tabulka

Podívejte se na porovnávací tabulku níže, abyste pochopili rozdíly mezi těmito transportními mechanismy:

| Transport         | Aktualizace v reálném čase | Streamování | Škálovatelnost | Použití                  |
|-------------------|----------------------------|-------------|----------------|--------------------------|
| stdio             | Ne                         | Ne          | Nízká          | Lokální CLI nástroje     |
| SSE               | Ano                        | Ano         | Střední        | Web, aktualizace v reálném čase |
| Streamable HTTP   | Ano                        | Ano         | Vysoká         | Cloud, více klientů      |

> **Tip:** Výběr správného transportu ovlivňuje výkon, škálovatelnost a uživatelský zážitek. **Streamable HTTP** je doporučený pro moderní, škálovatelné a cloudově připravené aplikace.

Všimněte si transportů stdio a SSE, které jste viděli v předchozích kapitolách, a jak je ve této kapitole pokryt streamovatelný HTTP transport.

## Streamování: koncepty a motivace

Pochopení základních konceptů a motivací za streamováním je nezbytné pro efektivní implementaci systémů komunikace v reálném čase.

**Streamování** je technika v síťovém programování, která umožňuje odesílání a přijímání dat v malých, zvládnutelných částech nebo jako sekvence událostí, místo čekání na celou odpověď. To je zvláště užitečné pro:

- Velké soubory nebo datové sady.
- Aktualizace v reálném čase (např. chat, ukazatele průběhu).
- Dlouhodobé výpočty, kde chcete uživatele informovat.

Zde jsou základní informace o streamování na vysokoúrovňové úrovni:

- Data jsou dodávána postupně, ne najednou.
- Klient může zpracovávat data, jak přicházejí.
- Snižuje vnímanou latenci a zlepšuje uživatelský zážitek.

### Proč používat streamování?

Důvody pro použití streamování jsou následující:

- Uživatelé dostávají okamžitou odezvu, ne jen na konci.
- Umožňuje aplikace v reálném čase a responzivní rozhraní.
- Efektivnější využití síťových a výpočetních zdrojů.

### Jednoduchý příklad: HTTP streamovací server & klient

Zde je jednoduchý příklad, jak může být streamování implementováno:

#### Python

**Server (Python, používající FastAPI a StreamingResponse):**

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

**Klient (Python, používající requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Tento příklad ukazuje server, který odesílá klientovi sérii zpráv, jak jsou k dispozici, místo čekání na všechny zprávy najednou.

**Jak to funguje:**

- Server postupně posílá každou zprávu, jak je připravena.
- Klient přijímá a vypisuje každou část, jak přichází.

**Požadavky:**

- Server musí používat streamovací odpověď (např. `StreamingResponse` ve FastAPI).
- Klient musí zpracovávat odpověď jako stream (`stream=True` v requests).
- Content-Type je obvykle `text/event-stream` nebo `application/octet-stream`.

#### Java

**Server (Java, používající Spring Boot a Server-Sent Events):**

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

**Klient (Java, používající Spring WebFlux WebClient):**

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

**Poznámky k implementaci v Javě:**

- Používá reaktivní stack Spring Boot s `Flux` pro streamování
- `ServerSentEvent` poskytuje strukturované streamování událostí s typy událostí
- `WebClient` s `bodyToFlux()` umožňuje reaktivní spotřebu streamu
- `delayElements()` simuluje zpoždění mezi událostmi
- Události mohou mít typy (`info`, `result`) pro lepší zpracování na klientu

### Porovnání: Klasické streamování vs MCP streamování

Rozdíly mezi tím, jak funguje streamování „klasickým“ způsobem oproti MCP, lze znázornit takto:

| Funkce                 | Klasické HTTP streamování      | MCP streamování (notifikace)       |
|------------------------|-------------------------------|-----------------------------------|
| Hlavní odpověď         | Části (chunked)                | Jedna, na konci                   |
| Aktualizace průběhu    | Odesílány jako datové části   | Odesílány jako notifikace         |
| Požadavky na klienta   | Musí zpracovat stream         | Musí implementovat handler zpráv  |
| Použití                | Velké soubory, stream tokenů AI | Průběh, logy, zpětná vazba v reálném čase |

### Klíčové rozdíly

Dále zde jsou některé klíčové rozdíly:

- **Komunikační vzor:**
  - Klasické HTTP streamování: Používá jednoduché chunked přenosové kódování pro odesílání dat
  - MCP streamování: Používá strukturovaný notifikační systém s protokolem JSON-RPC

- **Formát zpráv:**
  - Klasické HTTP: Jednoduché textové části s novými řádky
  - MCP: Strukturované objekty LoggingMessageNotification s metadaty

- **Implementace klienta:**
  - Klasické HTTP: Jednoduchý klient zpracovávající streamovací odpovědi
  - MCP: Sofistikovanější klient s handlerem zpráv pro různé typy zpráv

- **Aktualizace průběhu:**
  - Klasické HTTP: Průběh je součástí hlavního streamu odpovědi
  - MCP: Průběh je odesílán zvláštními notifikačními zprávami, zatímco hlavní odpověď přijde na konci

### Doporučení

Některá doporučení při rozhodování mezi implementací klasického streamování (jako endpoint ukázaný výše pomocí `/stream`) versus využitím streamování přes MCP:

- **Pro jednoduché potřeby streamování:** Klasické HTTP streamování je jednodušší na implementaci a dostačující pro základní potřeby.
- **Pro složité, interaktivní aplikace:** MCP streamování nabízí strukturovanější přístup s bohatšími metadaty a oddělením notifikací a finálních výsledků.
- **Pro AI aplikace:** Notifikační systém MCP je zvlášť užitečný pro dlouhotrvající AI úlohy, kdy chcete průběžně uživatele informovat o postupu.

## Streamování v MCP

Dobře, viděli jste zatím doporučení a porovnání rozdílů mezi klasickým streamováním a streamováním v MCP. Pojďme se podrobněji podívat, jak přesně můžete využít streamování v MCP.

Pochopení, jak streamování funguje v rámci MCP, je zásadní pro vytváření responzivních aplikací, které poskytují zpětnou vazbu v reálném čase uživatelům během dlouhotrvajících operací.

V MCP nejde o zasílání hlavní odpovědi v částech, ale o zasílání **notifikací** klientovi, zatímco nástroj zpracovává požadavek. Tyto notifikace mohou obsahovat aktualizace průběhu, logy nebo jiné události.

### Jak to funguje

Hlavní výsledek se stále posílá jako jediná odpověď. Nicméně notifikace mohou být odesílány jako samostatné zprávy během zpracování a tím klienta průběžně aktualizují. Klient musí být schopen tyto notifikace zpracovat a zobrazit.

## Co je notifikace?

Řekli jsme "notifikace", co to znamená v kontextu MCP?

Notifikace je zpráva odesílaná ze serveru klientovi s informací o průběhu, stavu nebo jiných událostech během dlouhotrvající operace. Notifikace zlepšují transparentnost a uživatelský zážitek.

Například klient by měl poslat notifikaci, jakmile proběhne počáteční handshake se serverem.

Notifikace v podobě JSON zprávy vypadá takto:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifikace patří k tématu v MCP označovanému jako ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Aby logging fungoval, server ho musí povolit jako funkci/možnost takto:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Podle použitého SDK může být logging ve výchozím nastavení povolen, nebo jej budete muset explicitně povolit v konfiguraci serveru.

Existují různé typy notifikací:

| Úroveň     | Popis                        | Příklad použití                |
|------------|------------------------------|-------------------------------|
| debug      | Detailní ladící informace    | Body vstupu/výstupu funkcí     |
| info       | Obecné informační zprávy    | Aktualizace průběhu operace    |
| notice     | Normální, ale významné události | Změny konfigurace          |
| warning    | Varovné stavy               | Použití zastaralých funkcí    |
| error      | Chybové stavy               | Selhání operace               |
| critical   | Kritické stavy              | Selhání systémových komponent |
| alert      | Okamžitá akce nutná         | Detekována poškozená data    |
| emergency  | Systém nepoužitelný         | Kompletní selhání systému     |

## Implementace notifikací v MCP

Pro implementaci notifikací v MCP je třeba nastavit jak serverovou, tak klientskou stranu pro zpracování aktualizací v reálném čase. To umožní vaší aplikaci poskytovat okamžitou zpětnou vazbu uživatelům během dlouhotrvajících operací.

### Serverová strana: Odesílání notifikací

Začněme u serverové strany. V MCP definujete nástroje, které posílají notifikace během zpracování požadavků. Server používá kontextový objekt (obvykle `ctx`) k odesílání zpráv klientovi.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

V předchozím příkladu nástroj `process_files` posílá tři notifikace klientovi, jak zpracovává jednotlivé soubory. Metoda `ctx.info()` slouží k odesílání informačních zpráv.

Navíc, abyste povolili notifikace, ujistěte se, že váš server používá streamovací transport (například `streamable-http`) a klient implementuje handler zpráv pro zpracování notifikací. Zde je příklad, jak nastavit server pro použití transportu `streamable-http`:

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

V tomto příkladu .NET je nástroj `ProcessFiles` označen atributem `Tool` a posílá tři notifikace klientovi během zpracování každého souboru. Metoda `ctx.Info()` slouží k odeslání informačních zpráv.

Chcete-li povolit notifikace na serveru MCP v .NET, ujistěte se, že používáte streamovací transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Klientská strana: Příjem notifikací

Klient musí implementovat handler zpráv pro zpracování a zobrazení notifikací, jak přicházejí.

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

V předchozím kódu funkce `message_handler` kontroluje, zda je příchozí zpráva notifikací. Pokud ano, vypíše ji; jinak ji zpracuje jako běžnou serverovou zprávu. Také si všimněte, že `ClientSession` je inicializována s `message_handler` pro přijímání a zpracování notifikací.

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

V tomto příkladu .NET funkce `MessageHandler` kontroluje, zda je příchozí zpráva notifikací. Pokud ano, vypíše ji; pokud ne, zpracovává ji jako běžnou serverovou zprávu. `ClientSession` je inicializována pomocí handleru zpráv přes `ClientSessionOptions`.

Pro povolení notifikací zajistěte, že server používá streamovací transport (například `streamable-http`) a klient implementuje handler zpráv pro notifikace.

## Notifikace průběhu & scénáře

Tato sekce vysvětluje koncept notifikací průběhu v MCP, proč jsou důležité a jak je implementovat pomocí Streamable HTTP. Najdete zde také praktický úkol pro lepší osvojení.

Notifikace průběhu jsou zprávy posílané v reálném čase ze serveru klientovi během dlouhotrvajících operací. Místo čekání na dokončení celého procesu server průběžně informuje klienta o aktuálním stavu. To zlepšuje transparentnost, uživatelský zážitek a usnadňuje ladění.

**Příklad:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Proč používat notifikace průběhu?

Notifikace průběhu jsou důležité z několika důvodů:

- **Lepší uživatelský zážitek:** Uživatelé vidí aktualizace během zpracování, ne jen na konci.
- **Zpětná vazba v reálném čase:** Klienti mohou zobrazovat indikátory průběhu nebo logy, což aplikaci dělá vnímavější.
- **Snazší ladění a monitoring:** Vývojáři a uživatelé vidí, kde může být proces pomalý nebo zablokovaný.

### Jak implementovat notifikace průběhu

Zde je, jak můžete implementovat notifikace průběhu v MCP:

- **Na serveru:** Použijte `ctx.info()` nebo `ctx.log()` k odesílání notifikací při zpracování každé položky. Tím klient dostane zprávu ještě před tím, než je hlavní výsledek připraven.
- **Na klientovi:** Implementujte handler zpráv, který naslouchá a zobrazuje notifikace, jak přicházejí. Tento handler rozlišuje mezi notifikacemi a konečným výsledkem.

**Serverový příklad:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Klientský příklad:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Bezpečnostní úvahy

Při implementaci MCP serverů s HTTP založenými transporty je bezpečnost klíčovou otázkou, která vyžaduje pečlivou pozornost vůči různým útokům a ochranným mechanizmům.

### Přehled

Bezpečnost je kritická při zpřístupnění MCP serverů přes HTTP. Streamable HTTP rozšiřuje povrch útoku a vyžaduje pečlivou konfiguraci.

### Klíčové body

- **Validace hlavičky Origin**: Vždy validujte hlavičku `Origin`, aby se zabránilo DNS rebinding útokům.
- **Vazba na localhost**: Pro lokální vývoj svazujte servery na `localhost`, aby nebyly otevírány veřejnému internetu.
- **Autentizace**: Implementujte autentizaci (např. API klíče, OAuth) pro produkční nasazení.
- **CORS**: Nastavte politiky Cross-Origin Resource Sharing (CORS) k omezení přístupu.
- **HTTPS**: V produkci používejte HTTPS k šifrování komunikace.

### Nejlepší postupy

- Nikdy nedůvěřujte příchozím požadavkům bez validace.
- Logujte a sledujte veškerý přístup a chyby.
- Pravidelně aktualizujte závislosti, aby byly záplaty bezpečnostních děr.

### Výzvy
- Vyvážení bezpečnosti s jednoduchostí vývoje
- Zajištění kompatibility s různými klientskými prostředími

## Přechod ze SSE na Streamable HTTP

Pro aplikace, které aktuálně používají Server-Sent Events (SSE), přechod na Streamable HTTP přináší rozšířené možnosti a lepší dlouhodobou udržitelnost implementací MCP.

### Proč upgradovat?

Existují dva přesvědčivé důvody pro přechod ze SSE na Streamable HTTP:

- Streamable HTTP nabízí lepší škálovatelnost, kompatibilitu a bohatší podporu oznámení než SSE.
- Je doporučeným transportem pro nové MCP aplikace.

### Kroky migrace

Zde je návod, jak migrovat ze SSE na Streamable HTTP ve vašich MCP aplikacích:

- **Aktualizujte serverový kód** tak, aby používal `transport="streamable-http"` v `mcp.run()`.
- **Aktualizujte klientský kód** na použití `streamablehttp_client` místo SSE klienta.
- **Implementujte zpracovatele zpráv** v klientu pro zpracování oznámení.
- **Otestujte kompatibilitu** s existujícími nástroji a pracovními postupy.

### Zachování kompatibility

Doporučuje se během migrace zachovat kompatibilitu s existujícími SSE klienty. Následují některé strategie:

- Můžete podporovat oba transporty, SSE i Streamable HTTP, spuštěním na různých koncových bodech.
- Postupně migrujte klienty na nový transport.

### Výzvy

Zajistěte, že během migrace vyřešíte následující výzvy:

- Zajištění aktualizace všech klientů
- Řešení rozdílů v doručování oznámení

## Bezpečnostní aspekty

Bezpečnost by měla být nejvyšší prioritou při implementaci jakéhokoli serveru, zejména při používání HTTP založených transportů jako Streamable HTTP v MCP.

Při implementaci MCP serverů s HTTP založenými transporty se bezpečnost stává zásadní otázkou vyžadující důkladnou pozornost na více útočných vektorů a ochranných mechanismů.

### Přehled

Bezpečnost je klíčová při zpřístupňování MCP serverů přes HTTP. Streamable HTTP přináší nové způsoby útoku a vyžaduje pečlivé nastavení.

Zde jsou klíčové bezpečnostní aspekty:

- **Validace hlavičky Origin**: Vždy validujte hlavičku `Origin`, abyste předešli útokům typu DNS rebinding.
- **Vazba na localhost**: Pro lokální vývoj svazujte servery na `localhost`, abyste je neotvírali veřejné síti.
- **Autentizace**: Implementujte autentizaci (např. API klíče, OAuth) pro produkční nasazení.
- **CORS**: Nastavte politiky Cross-Origin Resource Sharing (CORS) pro omezení přístupu.
- **HTTPS**: Používejte HTTPS v produkci pro šifrování komunikace.

### Nejlepší praktiky

Navíc zde jsou některé doporučené postupy pro zabezpečení vašeho MCP streamovacího serveru:

- Nikdy nedůvěřujte příchozím požadavkům bez validace.
- Logujte a monitorujte veškerý přístup a chyby.
- Pravidelně aktualizujte závislosti kvůli opravám bezpečnostních chyb.

### Výzvy

Při implementaci bezpečnosti v MCP streamovacích serverech se setkáte s některými výzvami:

- Vyvážení bezpečnosti s jednoduchostí vývoje
- Zajištění kompatibility s různými klientskými prostředími

### Zadání: Vytvořte vlastní MCP streaming aplikaci

**Scénář:**
Vytvořte MCP server a klienta, kde server zpracovává seznam položek (např. soubory nebo dokumenty) a odesílá oznámení pro každou zpracovanou položku. Klient by měl zobrazovat každé oznámení, jakmile dorazí.

**Kroky:**

1. Implementujte serverový nástroj, který zpracovává seznam a odesílá oznámení pro každou položku.
2. Implementujte klienta se zpracovatelem zpráv pro zobrazování oznámení v reálném čase.
3. Otestujte implementaci spuštěním serveru i klienta a pozorujte oznámení.

[Řešení](./solution/README.md)

## Další četba a co dál?

Pokud chcete pokračovat ve své cestě s MCP streamingem a rozšířit své znalosti, tato sekce nabízí další zdroje a doporučené kroky pro vývoj pokročilejších aplikací.

### Další četba

- [Microsoft: Úvod do HTTP streamingu](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS v ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Co dál?

- Vyzkoušejte vytvořit pokročilejší MCP nástroje využívající streaming pro analýzy v reálném čase, chat nebo kolaborativní editaci.
- Prozkoumejte integraci MCP streamingu s frontendovými frameworky (React, Vue, atd.) pro živé aktualizace UI.
- Dále: [Využití AI Toolkit pro VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->