# HTTPS streamování s protokolem Model Context Protocol (MCP)

Tato kapitola poskytuje komplexní průvodce implementací zabezpečeného, škálovatelného a streamování v reálném čase s protokolem Model Context Protocol (MCP) pomocí HTTPS. Pokrývá motivaci pro streamování, dostupné transportní mechanismy, jak implementovat streamovatelný HTTP v MCP, bezpečnostní nejlepší postupy, migraci ze SSE a praktické pokyny pro vytváření vlastních streamovacích aplikací MCP.

> **Pohled do budoucna:** tato lekce popisuje Streamovatelný HTTP podle **MCP Specifikace 2025-11-25**, kde je během `initialize` navázána session a přiřazena pomocí hlavičky `Mcp-Session-Id`. Release kandidát `2026-07-28` zcela odstraňuje handshake a ID session, čímž se každý požadavek stává samostatným a směrovatelným na jakýkoli server bez potřeby sticky sessions. Podrobnosti najdete v [Co se mění v MCP: Release kandidát 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Transportní Mechanismy a Streamování v MCP

Tato sekce zkoumá různé dostupné transportní mechanismy v MCP a jejich roli při umožnění streamovacích schopností pro komunikaci v reálném čase mezi klienty a servery.

### Co je to Transportní Mechanismus?

Transportní mechanismus definuje, jak se data vyměňují mezi klientem a serverem. MCP podporuje několik typů transportu, aby vyhověl různým prostředím a požadavkům:

- **stdio**: Standardní vstup/výstup, vhodný pro lokální a nástrojové CLI prostředí. Jednoduchý, ale nevhodný pro web nebo cloud.
- **SSE (Server-Sent Events)**: Umožňuje serverům posílat klientům aktualizace v reálném čase přes HTTP. Dobré pro webové uživatelské rozhraní, ale omezené ve škálovatelnosti a flexibilitě. Od MCP Specifikace 2025-06-18 je samostatný SSE transport oznámení zastaralý a nahrazen transportem "Streamovatelný HTTP".
- **Streamovatelný HTTP**: Moderní HTTP založený streamingový transport, podporující notifikace a lepší škálovatelnost. Doporučený pro většinu produkčních a cloudových scénářů.

### Tabulka porovnání

Podívejte se na tabulku porovnání níže, která pomůže pochopit rozdíly mezi těmito transportními mechanismy:

| Transport         | Aktualizace v reálném čase | Streamování | Škálovatelnost | Použití                  |
|-------------------|----------------------------|-------------|----------------|--------------------------|
| stdio             | Ne                         | Ne          | Nízká          | Lokální CLI nástroje      |
| SSE               | Ano                        | Ano         | Střední        | Web, aktualizace v reálném čase |
| Streamovatelný HTTP | Ano                      | Ano         | Vysoká         | Cloud, více klientů       |

> **Tip:** Výběr správného transportu ovlivňuje výkon, škálovatelnost a uživatelský zážitek. **Streamovatelný HTTP** je doporučen pro moderní, škálovatelné a cloudové aplikace.

Všímejte si transportů stdio a SSE, které jste viděli v předchozích kapitolách, a jakým způsobem je streamovatelný HTTP transport pokryt v této kapitole.

## Streamování: Koncepty a motivace

Pochopení základních konceptů a motivací za streamováním je zásadní pro implementaci efektivních systémů komunikace v reálném čase.

**Streamování** je technika v síťovém programování, která umožňuje odesílat a přijímat data v menších, zvládnutelných částech nebo jako sekvenci událostí, místo čekání na celou připravenou odpověď. To je zvláště užitečné pro:

- Velké soubory nebo datové sady.
- Aktualizace v reálném čase (např. chat, průběhové indikátory).
- Dlouhotrvající výpočty, při kterých chcete uživatele průběžně informovat.

Zde je, co potřebujete vědět o streamování na vysoké úrovni:

- Data jsou doručována postupně, nikoli najednou.
- Klient může data zpracovávat, jakmile přicházejí.
- Snižuje vnímanou latenci a zlepšuje uživatelský zážitek.

### Proč používat streamování?

Důvody pro používání streamování jsou následující:

- Uživatelé dostávají zpětnou vazbu okamžitě, ne jen na konci.
- Umožňuje aplikace v reálném čase a responzivní uživatelská rozhraní.
- Efektivnější využití síťových a výpočetních zdrojů.

### Jednoduchý příklad: HTTP streamovací server & klient

Zde je jednoduchý příklad, jak může být streamování implementováno:

#### Python

**Server (Python, používá FastAPI a StreamingResponse):**

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

**Klient (Python, používá requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Tento příklad ukazuje server, který odesílá sérii zpráv klientovi, jakmile jsou k dispozici, místo čekání na všechny zprávy najednou.

**Jak to funguje:**

- Server odesílá každou zprávu, jak je připravena.
- Klient přijímá a vypisuje každý kousek, jak přichází.

**Požadavky:**

- Server musí používat streamovací odpověď (např. `StreamingResponse` ve FastAPI).
- Klient musí zpracovávat odpověď jako stream (`stream=True` v requests).
- Content-Type je obvykle `text/event-stream` nebo `application/octet-stream`.

#### Java

**Server (Java, používá Spring Boot a Server-Sent Events):**

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

**Klient (Java, používá Spring WebFlux WebClient):**

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

- Používá Spring Boot reaktivní stack s `Flux` pro streamování.
- `ServerSentEvent` poskytuje strukturované streamování událostí s typy událostí.
- `WebClient` s `bodyToFlux()` umožňuje reaktivní spotřebu streamů.
- `delayElements()` simuluje čas zpracování mezi událostmi.
- Události mohou mít typy (`info`, `result`) pro lepší zpracování klientem.

### Porovnání: Klasické streamování vs MCP streamování

Rozdíly mezi klasickým způsobem streamování a tím, jak funguje v MCP, lze znázornit takto:

| Funkce                 | Klasické HTTP streamování       | MCP streamování (notifikace)       |
|------------------------|--------------------------------|-----------------------------------|
| Hlavní odpověď          | Doručovaná po částech           | Jednotlivá, na konci               |
| Aktuální informace o postupu | Odesílány jako datové bloky    | Odesílány jako notifikace          |
| Požadavky na klienta     | Musí zpracovat stream           | Musí implementovat zpracování zpráv |
| Použití                 | Velké soubory, streamy tokenů AI | Pokrok, logy, zpětná vazba v reálném čase |

### Klíčové pozorované rozdíly

Dále jsou zde některé klíčové rozdíly:

- **Komunikační vzor:**
  - Klasické HTTP streamování: Používá jednoduché chunked transfer encoding pro odeslání dat po částech
  - MCP streamování: Používá strukturovaný notifikační systém s protokolem JSON-RPC

- **Formát zprávy:**
  - Klasické HTTP: Prostý text s oddělenými bloky pomocí nových řádků
  - MCP: Strukturované objekty LoggingMessageNotification s metadata

- **Implementace klienta:**
  - Klasické HTTP: Jednoduchý klient, který zpracovává streamované odpovědi
  - MCP: Složitější klient se zpracovatelem zpráv, který zvládá různé typy zpráv

- **Aktualizace průběhu:**
  - Klasické HTTP: Průběh je součástí hlavního streamu odpovědi
  - MCP: Průběh je odesílán pomocí samostatných notifikačních zpráv, zatímco hlavní odpověď přijde na konci

### Doporučení

Některá doporučení ohledně výběru mezi klasickým streamováním (jako endpoint `/stream` z příkladu výše) a streamováním přes MCP:

- **Pro jednoduché potřeby streamování:** Klasické HTTP streamování je snadnější implementovat a dostačující pro základní překladání.

- **Pro složité, interaktivní aplikace:** MCP streamování poskytuje strukturovaný přístup s bohatšími metadata a oddělením notifikací od výsledků.

- **Pro AI aplikace:** Notifikační systém MCP je výhodný pro dlouhotrvající AI úlohy, kdy chcete uživatele průběžně informovat o stavu.

## Streamování v MCP

Dobře, viděli jste doposud doporučení a porovnání klasického streamování a streamování v MCP. Podívejme se nyní detailně, jak můžete využít streamování v MCP.

Pochopení, jak streamování funguje v rámci MCP, je nezbytné pro vytváření responzivních aplikací, které uživatelům během dlouhotrvajících operací poskytují okamžitou zpětnou vazbu.

V MCP nejde o odesílání hlavní odpovědi po částech, ale o odesílání **notifikací** klientovi během zpracování požadavku nástrojem. Tyto notifikace mohou obsahovat aktualizace postupu, logy nebo jiné události.

### Jak to funguje

Hlavní výsledek je stále odesílán jako jedna odpověď. Nicméně notifikace mohou být odesílány jako samostatné zprávy během zpracování a tím aktualizovat klienta v reálném čase. Klient musí být schopen tyto notifikace zpracovat a zobrazit je.

## Co je to Notifikace?

Řekli jsme "Notifikace" – co to znamená v kontextu MCP?

Notifikace je zpráva odeslaná ze serveru klientovi, informující o průběhu, stavu nebo jiných událostech během dlouhotrvající operace. Notifikace zlepšují transparentnost a uživatelský zážitek.

Například klient by měl odeslat notifikaci, jakmile je dokončen počáteční handshake se serverem.

Notifikace vypadá jako JSON zpráva takto:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifikace patří do tématu v MCP označovaného jako ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Pro fungování logování musí server aktivovat tuto funkci/kapacitu takto:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> V závislosti na použité SDK nemusí být logging aktivován ve výchozím nastavení, nebo ho budete muset explicitně aktivovat ve vaší serverové konfiguraci.

Existují různé typy notifikací:

| Úroveň    | Popis                         | Příklad použití                |
|-----------|-------------------------------|-------------------------------|
| debug     | Podrobné ladicí informace     | Vstup/výstup funkce           |
| info      | Obecné informační zprávy      | Aktualizace průběhu operace   |
| notice    | Normální, ale důležité události | Změny konfigurace           |
| warning   | Varovné podmínky              | Použití zastaralých funkcí    |
| error     | Chybové podmínky              | Selhání operace              |
| critical  | Kritické podmínky             | Selhání systémových komponent |
| alert     | Okamžitá nutná akce           | Zjištěna korupce dat         |
| emergency | Systém je nepoužitelný        | Naprosté selhání systému      |

## Implementace notifikací v MCP

Pro implementaci notifikací v MCP je třeba nastavit jak serverovou, tak klientskou stranu, aby zvládaly aktualizace v reálném čase. To umožní vaší aplikaci poskytovat uživatelům okamžitou zpětnou vazbu během dlouhotrvajících procesů.

### Serverová strana: Odesílání notifikací

Začněme na serverové straně. V MCP definujete nástroje, které mohou posílat notifikace během zpracování požadavků. Server používá kontextový objekt (obvykle `ctx`) pro odeslání zpráv klientovi.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

V předešlém příkladu nástroj `process_files` odesílá klientovi tři notifikace během zpracování každého souboru. Metoda `ctx.info()` slouží k odesílání informačních zpráv.

Navíc, aby notifikace fungovaly, ujistěte se, že váš server používá streamovací transport (např. `streamable-http`) a vaše klient implementuje zpracovatele zpráv pro notifikace. Zde je, jak nastavit server pro použití transportu `streamable-http`:

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

V příkladu .NET je nástroj `ProcessFiles` označen atributem `Tool` a odesílá klientovi tři notifikace během zpracování každého souboru. Metoda `ctx.Info()` se používá pro odeslání informačních zpráv.

Pro povolení notifikací na vašem MCP serveru v .NET se ujistěte, že používáte streamovací transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Klientská strana: Přijímání notifikací

Klient musí implementovat zpracovatele zpráv, který notifikace přijímá a zobrazuje je průběžně.

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

V předešlém kódu funkce `message_handler` ověřuje, zda příchozí zpráva je notifikací. Pokud ano, vypíše ji; jinak ji zpracuje jako běžnou serverovou zprávu. Všimněte si také, jak je `ClientSession` inicializována se `message_handler` pro zpracování příchozích notifikací.

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

V tomto .NET příkladu funkce `MessageHandler` ověřuje, zda příchozí zpráva je notifikace. Pokud je, vypíše ji; jinak ji zpracuje jako běžnou zprávu serveru. `ClientSession` je inicializována se zpracovatelem zpráv přes `ClientSessionOptions`.

Pro povolení notifikací se ujistěte, že váš server používá streamovací transport (např. `streamable-http`) a váš klient implementuje zpracovatele zpráv pro notifikace.

## Notifikace průběhu & scénáře

Tato sekce vysvětluje koncept notifikací průběhu v MCP, proč jsou důležité a jak je implementovat pomocí Streamovatelného HTTP. Najdete zde také praktické zadání k prohloubení znalostí.

Notifikace průběhu jsou zprávy v reálném čase odesílané serverem klientovi během dlouhotrvajících operací. Místo čekání, až celý proces skončí, server průběžně informuje klienta o současném stavu. To zlepšuje transparentnost, uživatelský zážitek a usnadňuje ladění.

**Příklad:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Proč používat notifikace průběhu?

Notifikace průběhu jsou důležité z několika důvodů:

- **Lepší uživatelský zážitek:** Uživatelé vidí aktualizace, jak práce pokračuje, ne jen na konci.
- **Zpětná vazba v reálném čase:** Klienti mohou zobrazovat průběhové indikátory nebo logy, což dělá aplikaci responsivnější.
- **Snazší ladění a monitorování:** Vývojáři i uživatelé mohou vidět, kde proces může být pomalý nebo uvíznutý.

### Jak implementovat notifikace průběhu

Zde je, jak implementovat notifikace průběhu v MCP:

- **Na serveru:** Používejte `ctx.info()` nebo `ctx.log()` pro odesílání notifikací, jakmile je zpracována každá položka. To odesílá zprávu klientovi před tím, než je hlavní výsledek připraven.
- **Na klientovi:** Implementujte zpracovatele zpráv, který poslouchá a zobrazuje aktuální notifikace. Tento zpracovatel rozlišuje mezi notifikacemi a finální odpovědí.

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

Při implementaci MCP serverů s HTTP založenými transporty se bezpečnost stává klíčovou otázkou, která vyžaduje pečlivou pozornost vůči různým útokovým vektorům a ochranným mechanizmům.

### Přehled

Bezpečnost je kritická při zpřístupňování MCP serverů přes HTTP. Streamovatelný HTTP přináší nové možnosti útoků a vyžaduje pečlivé nastavení.

### Klíčové body


- **Validace hlavičky Origin**: Vždy validujte hlavičku `Origin`, abyste předešli útokům DNS rebinding.
- **Vazba na localhost**: Pro lokální vývoj připojujte servery na `localhost`, abyste je nevystavovali veřejnému internetu.
- **Autentizace**: Implementujte autentizaci (např. API klíče, OAuth) pro produkční nasazení.
- **CORS**: Nakonfigurujte zásady Cross-Origin Resource Sharing (CORS) pro omezení přístupu.
- **HTTPS**: V produkci používejte HTTPS k šifrování komunikace.

### Nejlepší postupy

- Nikdy nevěřte příchozím požadavkům bez validace.
- Protokolujte a sledujte veškeré přístupy a chyby.
- Pravidelně aktualizujte závislosti, abyste opravili bezpečnostní chyby.

### Výzvy

- Vyvážení bezpečnosti a snadnosti vývoje
- Zajištění kompatibility s různými klientskými prostředími

## Přechod ze SSE na Streamable HTTP

Pro aplikace, které aktuálně využívají Server-Sent Events (SSE), migrace na Streamable HTTP přináší rozšířené možnosti a lepší dlouhodobou udržitelnost pro vaše MCP implementace.

### Proč upgradovat?

Existují dva silné důvody k přechodu ze SSE na Streamable HTTP:

- Streamable HTTP nabízí lepší škálovatelnost, kompatibilitu a bohatší podporu notifikací než SSE.
- Je doporučeným přenosem pro nové MCP aplikace.

### Kroky migrace

Zde je postup migrace ze SSE na Streamable HTTP ve vašich MCP aplikacích:

- **Aktualizujte kód serveru** tak, aby používal `transport="streamable-http"` v `mcp.run()`.
- **Aktualizujte kód klienta** tak, aby používal `streamablehttp_client` místo SSE klienta.
- **Implementujte obsluhu zpráv** v klientovi pro zpracování notifikací.
- **Testujte kompatibilitu** s existujícími nástroji a postupy.

### Udržování kompatibility

Doporučuje se během migrace udržovat kompatibilitu se stávajícími SSE klienty. Zde jsou některé strategie:

- Můžete podporovat jak SSE, tak Streamable HTTP tím, že spustíte oba přenosy na různých koncových bodech.
- Postupně migrujte klienty na nový přenos.

### Výzvy

Při migraci se ujistěte, že řešíte následující výzvy:

- Zajištění aktualizace všech klientů
- Řešení rozdílů v doručování notifikací

## Bezpečnostní hlediska

Bezpečnost by měla být nejvyšší prioritou při implementaci jakéhokoliv serveru, zejména při použití HTTP přenosů jako je Streamable HTTP v MCP.

Při implementaci MCP serverů s HTTP přenosy je bezpečnost zásadním tématem, které vyžaduje pečlivou pozornost vůči mnoha útokovým vektorům a ochranným mechanismům.

### Přehled

Bezpečnost je zásadní při zpřístupnění MCP serverů přes HTTP. Streamable HTTP přináší nové potenciální útokové plochy a vyžaduje pečlivé nastavení.

Zde jsou některé klíčové bezpečnostní aspekty:

- **Validace hlavičky Origin**: Vždy validujte hlavičku `Origin`, abyste předešli útokům DNS rebinding.
- **Vazba na localhost**: Pro lokální vývoj připojujte servery na `localhost`, abyste je nevystavovali veřejnému internetu.
- **Autentizace**: Implementujte autentizaci (např. API klíče, OAuth) pro produkční nasazení.
- **CORS**: Nakonfigurujte zásady Cross-Origin Resource Sharing (CORS) pro omezení přístupu.
- **HTTPS**: V produkci používejte HTTPS k šifrování komunikace.

### Nejlepší postupy

Dále zde jsou některé nejlepší postupy, které je vhodné dodržovat při implementaci bezpečnosti ve vašem MCP streamovacím serveru:

- Nikdy nevěřte příchozím požadavkům bez validace.
- Protokolujte a sledujte veškeré přístupy a chyby.
- Pravidelně aktualizujte závislosti, abyste opravili bezpečnostní chyby.

### Výzvy

Při implementaci bezpečnosti v MCP streamovacích serverech se setkáte s některými výzvami:

- Vyvážení bezpečnosti a snadnosti vývoje
- Zajištění kompatibility s různými klientskými prostředími

### Zadání: Postavte si vlastní streamingovou MCP aplikaci

**Scénář:**
Postavte MCP server a klienta, kde server zpracovává seznam položek (např. soubory nebo dokumenty) a posílá notifikaci pro každou zpracovanou položku. Klient by měl zobrazovat každou notifikaci ihned po jejím příchodu.

**Kroky:**

1. Implementujte serverový nástroj, který zpracuje seznam a odešle notifikace pro každou položku.
2. Implementujte klienta s obsluhou zpráv, která bude zobrazovat notifikace v reálném čase.
3. Otestujte svou implementaci spuštěním serveru i klienta a sledujte notifikace.

[Řešení](./solution/README.md)

## Další čtení a co dál?

Pro pokračování ve vašem poznávání MCP streamování a rozšíření znalostí tato sekce nabízí další zdroje a doporučené další kroky pro vytváření pokročilejších aplikací.

### Další čtení

- [Microsoft: Úvod do HTTP streamingu](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS v ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Co dál?

- Zkuste postavit pokročilejší MCP nástroje využívající streaming pro analytiku v reálném čase, chat nebo kolaborativní editaci.
- Prozkoumejte integraci MCP streamingu s frontendovými frameworky (React, Vue atd.) pro živé aktualizace uživatelského rozhraní.
- Dále: [Využití AI Toolkit pro VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->