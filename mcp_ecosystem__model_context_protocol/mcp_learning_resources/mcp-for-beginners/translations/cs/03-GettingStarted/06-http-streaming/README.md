# HTTPS streamování s protokolem Model Context Protocol (MCP)

Tato kapitola poskytuje komplexní průvodce implementací bezpečného, škálovatelného a streamování v reálném čase pomocí Model Context Protocol (MCP) přes HTTPS. Pokrývá motivaci pro streamování, dostupné transportní mechanismy, jak implementovat streamovatelné HTTP v MCP, nejlepší bezpečnostní postupy, migraci ze SSE a praktické rady pro vytváření vlastních streamovacích MCP aplikací.

> **Pohled do budoucna:** tato lekce popisuje Streamovatelné HTTP pod **MCP Specification 2025-11-25**, kde je relace navázána během `initialize` a připnuta hlavičkou `Mcp-Session-Id`. Release candidate `2026-07-28` zcela ruší handshake a ID relace, což činí každý požadavek samostatným a směrovatelným na jakoukoli instanci serveru bez sticky sessions. Podrobnosti viz [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Transportní mechanismy a streamování v MCP

Tato sekce zkoumá různé dostupné transportní mechanismy v MCP a jejich roli při umožnění streamovacích schopností pro komunikaci v reálném čase mezi klienty a servery.

### Co je transportní mechanismus?

Transportní mechanismus definuje, jak jsou mezi klientem a serverem vyměňována data. MCP podporuje několik typů transportu, aby vyhověl různým prostředím a požadavkům:

- **stdio**: Standardní vstup/výstup, vhodný pro lokální a CLI nástroje. Jednoduchý, ale nevhodný pro web nebo cloud.
- **SSE (Server-Sent Events)**: Umožňuje serverům posílat klientům aktualizace v reálném čase přes HTTP. Dobré pro webová uživatelská rozhraní, ale omezené v škálovatelnosti a flexibilitě. Od MCP Specification 2025-06-18 byl samostatný SSE transport označen jako zastaralý a nahrazen "Streamovatelné HTTP" transportem.
- **Streamovatelné HTTP**: Moderní HTTP založený streamovací transport, podporující notifikace a lepší škálovatelnost. Doporučeno pro většinu produkčních a cloudových scénářů.

### Porovnávací tabulka

Podívejte se na níže uvedenou porovnávací tabulku, abyste pochopili rozdíly mezi těmito transportními mechanismy:

| Transport         | Aktualizace v reálném čase | Streamování | Škálovatelnost | Použití                  |
|-------------------|---------------------------|-------------|----------------|--------------------------|
| stdio             | Ne                        | Ne          | Nízká          | Lokální CLI nástroje     |
| SSE               | Ano                       | Ano         | Střední        | Web, aktualizace v reálném čase |
| Streamovatelné HTTP | Ano                      | Ano         | Vysoká         | Cloud, multi-klient      |

> **Tip:** Výběr správného transportu má vliv na výkon, škálovatelnost a uživatelskou zkušenost. **Streamovatelné HTTP** je doporučeno pro moderní, škálovatelné a cloudové aplikace.

Všimněte si transportů stdio a SSE, které jste viděli v předchozích kapitolách, a jak je streamovatelné HTTP transportem pokrytým v této kapitole.

## Streamování: Koncepty a motivace

Porozumění základním konceptům a motivaci za streamováním je klíčové pro implementaci efektivních systémů komunikace v reálném čase.

**Streamování** je technika síťového programování, která umožňuje odesílat a přijímat data v malých, zvládnutelných kusech nebo jako sekvenci událostí, místo čekání na kompletní odpověď. To je zvláště užitečné pro:

- Velké soubory nebo datové sady.
- Aktualizace v reálném čase (např. chat, progress bary).
- Dlouhotrvající výpočty, kde chcete uživatele průběžně informovat.

Zde je základní přehled o streamování:

- Data jsou dodávána postupně, ne najednou.
- Klient může data zpracovávat, jak přicházejí.
- Snižuje se vnímaná latence a zlepšuje uživatelská zkušenost.

### Proč používat streamování?

Důvody pro použití streamování jsou následující:

- Uživatelé dostávají zpětnou vazbu okamžitě, ne až na konci.
- Umožňuje aplikace v reálném čase a responzivní UI.
- Efektivnější využití síťových a výpočetních zdrojů.

### Jednoduchý příklad: HTTP streamovací server a klient

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

Tento příklad demonstruje server, který klientovi posílá sérii zpráv, jakmile jsou k dispozici, místo čekání na připravení všech zpráv.

**Jak to funguje:**

- Server postupně odesílá každou zprávu, jakmile je připravena.
- Klient přijímá a tiskne každý kus, jak přichází.

**Požadavky:**

- Server musí použít streamovací odpověď (např. `StreamingResponse` ve FastAPI).
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
- `WebClient` s `bodyToFlux()` umožňuje reaktivní konzumaci streamu
- `delayElements()` simuluje dobu zpracování mezi událostmi
- Události mohou mít typy (`info`, `result`) pro lepší zpracování na straně klienta

### Porovnání: klasické streamování vs MCP streamování

Rozdíly mezi klasickým streamováním a tím, jak funguje streamování v MCP, lze zobrazit takto:

| Funkce                  | Klasické HTTP streamování     | MCP streamování (notifikace)      |
|------------------------|-------------------------------|-----------------------------------|
| Hlavní odpověď          | Chunkovaná                    | Jedna, na konci                   |
| Aktualizace průběhu     | Posílány jako datové kusy     | Posílány jako notifikace          |
| Požadavky na klienta    | Musí zpracovat stream         | Musí implementovat handler zpráv  |
| Použití                 | Velké soubory, AI token streams | Průběh, logy, zpětná vazba v reálném čase |

### Zjištěné klíčové rozdíly

Dále jsou zde některé klíčové rozdíly:

- **Vzor komunikace:**
  - Klasické HTTP streamování: Používá jednoduché chunkované přenášení dat k odeslání dat po kusech
  - MCP streamování: Používá strukturovaný notifikační systém s JSON-RPC protokolem

- **Formát zpráv:**
  - Klasické HTTP: Plain text kusy s novými řádky
  - MCP: Strukturované LoggingMessageNotification objekty s metadaty

- **Implementace klienta:**
  - Klasické HTTP: Jednoduchý klient zpracovávající streamové odpovědi
  - MCP: Sofistikovanější klient s handlerem zpráv pro zpracování různých typů zpráv

- **Aktualizace průběhu:**
  - Klasické HTTP: Průběh je součástí hlavního streamu odpovědi
  - MCP: Průběh je posílán jako samostatné notifikační zprávy, zatímco hlavní odpověď přijde nakonec

### Doporučení

Některé věci doporučujeme při rozhodování mezi klasickým streamováním (jako endpoint `/stream`, který jsme ukázali výše) a streamováním přes MCP.

- **Pro jednoduché streamování:** Klasické HTTP streamování je jednodušší na implementaci a postačuje pro základní potřeby.

- **Pro složité, interaktivní aplikace:** MCP streamování poskytuje strukturovanější přístup s bohatšími metadaty a oddělením mezi notifikacemi a konečnými výsledky.

- **Pro AI aplikace:** Notifikační systém MCP je zvláště užitečný pro dlouhotrvající AI úlohy, kde chcete uživatele průběžně informovat o postupu.

## Streamování v MCP

Takže jste už viděli některá doporučení a porovnání rozdílů mezi klasickým streamováním a streamováním v MCP. Pojďme se podrobně podívat, jak přesně můžete využít streamování v MCP.

Porozumění tomu, jak streamování funguje v rámci MCP, je zásadní pro tvorbu responzivních aplikací, které během dlouhotrvajících operací poskytují uživatelům zpětnou vazbu v reálném čase.

V MCP nejde o posílání hlavní odpovědi po kouscích, ale o posílání **notifikací** klientovi během zpracování požadavku nástrojem. Tyto notifikace mohou obsahovat aktualizace průběhu, logy nebo jiné události.

### Jak to funguje

Hlavní výsledek je stále posílán jako jediná odpověď. Nicméně, notifikace mohou být zasílány jako samostatné zprávy během zpracování a tím aktualizovat klienta v reálném čase. Klient musí být schopen tyto notifikace zpracovat a zobrazit.

## Co je to notifikace?

Řekli jsme "notifikace", co to znamená v kontextu MCP?

Notifikace je zpráva odeslaná serverem klientovi, která informuje o průběhu, stavu nebo jiných událostech během dlouhotrvající operace. Notifikace zlepšují transparentnost a uživatelský zážitek.

Například klient by měl poslat notifikaci, jakmile je navázán počáteční handshake se serverem.

Notifikace vypadá takto jako JSON zpráva:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifikace patří do tématu v MCP označeného jako ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Upozornění na zastaralost:** release candidate specifikace MCP z `2026-07-28` označuje primitivum Logging jako zastaralé ve prospěch `stderr` pro stdio transporty a OpenTelemetry pro strukturovanou observabilitu. Logging bude funkční ve verzi `2025-11-25` a alespoň rok po formální zastaralosti. Více viz [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Aby logging fungoval, server musí tuto funkci/možnost povolit takto:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> V závislosti na použité SDK může být logging ve výchozím nastavení povolen, nebo jej budete muset explicitně zapnout v konfiguraci serveru.

Existují různé typy notifikací:

| Úroveň   | Popis                          | Příklad použití               |
|---------|-------------------------------|------------------------------|
| debug   | Podrobné ladicí informace      | Vstupy/výstupy funkcí        |
| info    | Obecné informativní zprávy     | Aktualizace postupu operace  |
| notice  | Normální, ale významné události| Změny konfigurace            |
| warning | Varovné stavy                 | Použití zastaralých funkcí   |
| error   | Chybové stavy                 | Selhání funkcí               |
| critical| Kritické stavy                | Selhání komponent systému     |
| alert   | Nutná okamžitá akce           | Zjištěna poškození dat       |
| emergency| Systém nepoužitelný           | Kompletní selhání systému    |

## Implementace notifikací v MCP

Pro implementaci notifikací v MCP je potřeba nastavit jak server, tak klienta tak, aby zvládali aktualizace v reálném čase. To umožňuje vaší aplikaci ihned reagovat uživatelům během dlouhotrvajících operací.

### Serverová strana: odesílání notifikací

Začněme se serverovou stranou. V MCP definujete nástroje, které mohou odesílat notifikace při zpracování požadavků. Server používá objekt kontextu (obvykle `ctx`) k odesílání zpráv klientovi.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

V předchozím příkladu nástroj `process_files` odesílá klientovi tři notifikace během zpracování každého souboru. Metoda `ctx.info()` se používá k odesílání informativních zpráv.

Dále, aby notifikace fungovaly, ujistěte se, že váš server používá streamovací transport (např. `streamable-http`) a klient implementuje handler zpráv k zpracování notifikací. Nastavení serveru s transportem `streamable-http`:

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

V tomto příkladu v .NET je nástroj `ProcessFiles` označen atributem `Tool` a odesílá klientovi tři notifikace během zpracování každého souboru. Metoda `ctx.Info()` slouží k odesílání informativních zpráv.

Pro povolení notifikací ve vašem .NET MCP serveru se ujistěte, že používáte streamovací transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Klientská strana: přijímání notifikací

Klient musí implementovat handler zpráv, který zpracovává a zobrazuje příchozí notifikace.

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

V uvedeném kódu funkce `message_handler` zkontroluje, zda je příchozí zpráva notifikací. Pokud ano, vytiskne ji; jinak ji zpracuje jako běžnou zprávu serveru. Také je vidět, jak je `ClientSession` inicializován s `message_handler` pro zpracování příchozích notifikací.

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

V tomto příkladu v .NET funkce `MessageHandler` zkontroluje, zda je příchozí zpráva notifikací. Pokud ano, vytiskne ji; jinak ji zpracuje jako běžnou zprávu serveru. `ClientSession` je inicializován s handlerem zpráv přes `ClientSessionOptions`.

Pro povolení notifikací se ujistěte, že server používá streamovací transport (např. `streamable-http`) a klient implementuje handler zpráv k zpracování notifikací.

## Notifikace průběhu a scénáře

Tato sekce vysvětluje koncept notifikací průběhu v MCP, proč jsou důležité a jak je implementovat pomocí Streamovatelného HTTP. Najdete zde také praktický úkol pro upevnění znalostí.

Notifikace průběhu jsou zprávy posílané serverem klientovi v reálném čase během dlouhotrvajících operací. Místo čekání na dokončení celého procesu server průběžně informuje klienta o aktuálním stavu. To zlepšuje transparentnost, uživatelský zážitek a usnadňuje ladění.

**Příklad:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Proč používat notifikace průběhu?

Notifikace průběhu jsou důležité z několika důvodů:

- **Lepší uživatelský zážitek:** Uživatelé vidí průběžné aktualizace, ne jen konec.
- **Zpětná vazba v reálném čase:** Klienti mohou zobrazovat progress bary nebo logy, což činí aplikaci responzivní.
- **Snazší ladění a monitoring:** Vývojáři a uživatelé vidí, kde může být proces pomalý nebo zablokovaný.

### Jak implementovat notifikace průběhu

Zde je postup implementace notifikací průběhu v MCP:

- **Na serveru:** Použijte `ctx.info()` nebo `ctx.log()` k odesílání notifikací během zpracování každé položky. Tím se zpráva odešle klientovi dříve než hlavní výsledek.
- **Na klientovi:** Implementujte handler zpráv, který naslouchá a zobrazuje notifikace, jak přicházejí. Tento handler rozlišuje mezi notifikacemi a konečným výsledkem.

**Příklad serveru:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Příklad klienta:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Bezpečnostní úvahy

Při implementaci MCP serverů s HTTP založenými přenosy je bezpečnost zásadní záležitostí, která vyžaduje pečlivou pozornost různým útočným vektorům a ochranným mechanismům.

### Přehled

Bezpečnost je kritická při zpřístupňování MCP serverů přes HTTP. Streamovatelné HTTP představuje nové útočné plochy a vyžaduje pečlivou konfiguraci.

### Klíčové body

- **Validace hlavičky Origin**: Vždy ověřujte hlavičku `Origin`, abyste zabránili útokům DNS rebinding.
- **Vazba na localhost**: Pro lokální vývoj připojujte servery na `localhost`, abyste se vyhnuli jejich vystavení veřejnému internetu.
- **Autentizace**: Implementujte autentizaci (např. API klíče, OAuth) pro produkční nasazení.
- **CORS**: Nakonfigurujte zásady Cross-Origin Resource Sharing (CORS) pro omezení přístupu.
- **HTTPS**: V produkci používejte HTTPS pro šifrování přenosu.

### Nejlepší postupy

- Nikdy nedůvěřujte příchozím požadavkům bez ověření.
- Logujte a monitorujte veškerý přístup a chyby.
- Pravidelně aktualizujte závislosti, abyste opravili bezpečnostní zranitelnosti.

### Výzvy

- Vyvážení bezpečnosti a snadnosti vývoje
- Zajištění kompatibility s různými klientskými prostředími

## Přechod ze SSE na Streamovatelné HTTP

Pro aplikace, které v současnosti používají Server-Sent Events (SSE), přechod na Streamovatelné HTTP poskytuje rozšířené možnosti a lepší dlouhodobou udržitelnost vašich implementací MCP.

### Proč upgradovat?

Existují dva přesvědčivé důvody pro upgrade ze SSE na Streamovatelné HTTP:

- Streamovatelné HTTP nabízí lepší škálovatelnost, kompatibilitu a bohatší podporu notifikací než SSE.
- Je doporučovaným přenosem pro nové MCP aplikace.

### Kroky migrace

Zde je návod, jak migrovat ze SSE na Streamovatelné HTTP ve vašich MCP aplikacích:

- **Aktualizujte kód serveru** pro použití `transport="streamable-http"` v `mcp.run()`.
- **Aktualizujte kód klienta** pro použití `streamablehttp_client` místo SSE klienta.
- **Implementujte zpracovatele zpráv** v klientu pro zpracování notifikací.
- **Otestujte kompatibilitu** s existujícími nástroji a pracovními postupy.

### Zachování kompatibility

Doporučuje se zachovat kompatibilitu s existujícími SSE klienty během procesu migrace. Zde jsou některé strategie:

- Můžete podporovat oba, SSE i Streamovatelné HTTP, spuštěním obou přenosů na různých koncových bodech.
- Postupně migrujte klienty na nový přenos.

### Výzvy

Během migrace je třeba řešit následující výzvy:

- Zajištění aktualizace všech klientů
- Řešení rozdílů v doručování notifikací

## Bezpečnostní úvahy

Bezpečnost by měla být nejvyšší prioritou při implementaci jakéhokoli serveru, zvláště při použití HTTP přenosů jako Streamovatelné HTTP v MCP.

Při implementaci MCP serverů s HTTP založenými přenosy je bezpečnost zásadní záležitostí, která vyžaduje pečlivou pozornost různým útočným vektorům a ochranným mechanismům.

### Přehled

Bezpečnost je kritická při zpřístupňování MCP serverů přes HTTP. Streamovatelné HTTP představuje nové útočné plochy a vyžaduje pečlivou konfiguraci.

Zde jsou některé klíčové bezpečnostní úvahy:

- **Validace hlavičky Origin**: Vždy ověřujte hlavičku `Origin`, abyste zabránili útokům DNS rebinding.
- **Vazba na localhost**: Pro lokální vývoj připojujte servery na `localhost`, abyste se vyhnuli jejich vystavení veřejnému internetu.
- **Autentizace**: Implementujte autentizaci (např. API klíče, OAuth) pro produkční nasazení.
- **CORS**: Nakonfigurujte zásady Cross-Origin Resource Sharing (CORS) pro omezení přístupu.
- **HTTPS**: V produkci používejte HTTPS pro šifrování přenosu.

### Nejlepší postupy

Dále zde jsou některé nejlepší postupy, které je vhodné následovat při implementaci bezpečnosti v vašem MCP streamovacím serveru:

- Nikdy nedůvěřujte příchozím požadavkům bez ověření.
- Logujte a monitorujte veškerý přístup a chyby.
- Pravidelně aktualizujte závislosti, abyste opravili bezpečnostní zranitelnosti.

### Výzvy

Při implementaci bezpečnosti v MCP streamovacích serverech čelíte některým výzvám:

- Vyvážení bezpečnosti a snadnosti vývoje
- Zajištění kompatibility s různými klientskými prostředími

### Úkol: Vytvořte vlastní streamovací MCP aplikaci

**Scénář:**
Vytvořte MCP server a klienta, kde server zpracuje seznam položek (např. souborů nebo dokumentů) a po zpracování každé položky odešle notifikaci. Klient by měl zobrazovat každou notifikaci ihned po jejím příchodu.

**Kroky:**

1. Implementujte nástroj serveru, který zpracovává seznam a odesílá notifikace pro každou položku.
2. Implementujte klienta se zpracovatelem zpráv pro zobrazení notifikací v reálném čase.
3. Otestujte implementaci spuštěním serveru i klienta a sledujte notifikace.

[Řešení](./solution/README.md)

## Další čtení a co dál?

Pro pokračování ve vaší cestě se streamováním MCP a rozšíření vašich znalostí tato sekce poskytuje dodatečné zdroje a navržené další kroky pro tvorbu pokročilejších aplikací.

### Další čtení

- [Microsoft: Úvod do HTTP streamování](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS v ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streamované požadavky](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Co dál?

- Vyzkoušejte vytvořit pokročilejší MCP nástroje, které používají streamování pro analýzy v reálném čase, chat nebo kolaborativní úpravy.
- Prozkoumejte integraci MCP streamování s frontendovými frameworky (React, Vue, atd.) pro živé aktualizace uživatelského rozhraní.
- Další: [Využití AI Toolkit pro VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->