# HTTPS prenosi v živo s protokolom Model Context (MCP)

Ta poglavje nudi celovit vodnik za izvajanje varnih, skalabilnih in v realnem času prenosov v živo s protokolom Model Context (MCP) prek HTTPS. Obravnava motivacijo za prenos v živo, razpoložljive transportne mehanizme, kako implementirati prenosljiv HTTP v MCP, varnostne najboljše prakse, migracijo iz SSE ter praktična navodila za gradnjo lastnih aplikacij MCP s prenosom v živo. 

> **Pogled v prihodnost:** ta lekcija opisuje Streamable HTTP pod **MCP specifikacijo 2025-11-25**, kjer je seja vzpostavljena med `initialize` in pritrjena z glavo `Mcp-Session-Id`. Kandidat za izdajo `2026-07-28` popolnoma odstrani rokovanje in ID seje, zaradi česar je vsak zahtevek samostojen in usmerljiv na katerikoli strežniški primer brez lepljivih sej. Za podrobnosti glej [Kaj se spreminja v MCP: Kandidat za izdajo 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Transportni mehanizmi in prenos v živo v MCP

Ta razdelek raziskuje različne transportne mehanizme, ki so na voljo v MCP, in njihovo vlogo pri omogočanju prenosa v živo za komunikacijo v realnem času med odjemalci in strežniki.

### Kaj je transportni mehanizem?

Transportni mehanizem opredeljuje, kako se podatki izmenjujejo med odjemalcem in strežnikom. MCP podpira več tipov transporta, prilagojenih različnim okoljem in zahtevam:

- **stdio**: Standardni vhod/izhodi, primerno za lokalna orodja in orodja ukazne vrstice. Preprosto, vendar neprimerno za splet ali oblak.
- **SSE (Server-Sent Events)**: Omogoča strežnikom pošiljanje posodobitev v realnem času odjemalcem prek HTTP. Dobro za spletne vmesnike, a omejeno v skalabilnosti in prilagodljivosti. Od MCP specifikacije 2025-06-18 je samostojni SSE transport ukinjen in zamenjan s "Streamable HTTP" transportom.
- **Streamable HTTP**: Moderni HTTP-prenos v živo, ki podpira obvestila in boljšo skalabilnost. Priporočeno za večino produkcijskih in oblačnih scenarijev.

### Primerjalna tabela

Oglejte si spodnjo primerjalno tabelo za razumevanje razlik med temi transportnimi mehanizmi:

| Transport         | Posodobitve v realnem času | Pretakanje | Skalabilnost | Primer uporabe          |
|-------------------|----------------------------|------------|--------------|-------------------------|
| stdio             | Ne                         | Ne         | Nizka        | Lokalna orodja CLI      |
| SSE               | Da                         | Da         | Srednja      | Splet, posodobitve v živo|
| Streamable HTTP   | Da                         | Da         | Visoka       | Oblačne, večodjemalniške|

> **Nasvet:** Izbira pravega transporta vpliva na zmogljivost, skalabilnost in uporabniško izkušnjo. **Streamable HTTP** je priporočljiv za moderne, skalabilne in oblak-pripravljene aplikacije.

Opazite transporte stdio in SSE, ki so bili prikazani v prejšnjih poglavjih, ter kako je Streamable HTTP transport, obravnavan v tem poglavju.

## Prenos v živo: koncepti in motivacija

Razumevanje osnovnih konceptov in motivacij za prenos v živo je bistveno za implementacijo učinkovitih sistemov komunikacije v realnem času.

**Prenos v živo** je tehnika v omrežnem programiranju, ki omogoča pošiljanje in prejemanje podatkov v majhnih, obvladljivih delih ali kot zaporedje dogodkov, namesto da bi čakali na celoten odgovor. To je še posebej uporabno za:

- Velike datoteke ali zbirke podatkov.
- Posodobitve v realnem času (npr. klepet, progresne vrstice).
- Dolgotrajne izračune, kjer želite uporabnika obveščati.

Tukaj je, kar morate vedeti o prenosu v živo na visoki ravni:

- Podatki se dostavljajo postopoma, ne vsi naenkrat.
- Odjemalec lahko obdeluje podatke sproti, ko prispejo.
- Zmanjšuje zaznano zamudo in izboljšuje uporabniško izkušnjo.

### Zakaj uporabljati prenos v živo?

Razlogi za uporabo prenosa v živo so naslednji:

- Uporabniki dobijo takojšen odziv, ne le na koncu
- Omogoča aplikacije v realnem času in odzivne uporabniške vmesnike
- Bolj učinkovita raba omrežnih in računalniških virov

### Preprost primer: server in odjemalec HTTP prenosa v živo

Tukaj je preprost primer, kako se prenos v živo lahko implementira:

#### Python

**Strežnik (Python, uporaba FastAPI in StreamingResponse):**

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

**Odjemalec (Python, uporaba requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Ta primer prikazuje strežnik, ki pošilja niz sporočil odjemalcu takoj, ko so na voljo, namesto da bi čakal na vsa sporočila.

**Kako deluje:**

- Strežnik sproti pošilja vsako sporočilo, ko je pripravljeno.
- Odjemalec prejema in izpisuje vsak del, ko prispije.

**Zahteve:**

- Strežnik mora uporabiti prenosni odziv (npr. `StreamingResponse` v FastAPI).
- Odjemalec mora obdelovati odziv kot tok (`stream=True` v requests).
- Content-Type je običajno `text/event-stream` ali `application/octet-stream`.

#### Java

**Strežnik (Java, uporaba Spring Boot in Server-Sent Events):**

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

**Odjemalec (Java, uporaba Spring WebFlux WebClient):**

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

**Opombe o implementaciji v Javi:**

- Uporablja reaktivni sloj Spring Boot s `Flux` za prenos v živo
- `ServerSentEvent` zagotavlja strukturirano pretakanje dogodkov z vrstami dogodkov
- `WebClient` z `bodyToFlux()` omogoča reaktivno porabo prenosa
- `delayElements()` simulira čas obdelave med dogodki
- Dogodki lahko imajo vrste (`info`, `result`) za boljšo obdelavo na odjemalcu

### Primerjava: klasični prenos v živo proti MCP prenosu

Razlike v delovanju prenosa v živo na "klasičen" način in v MCP lahko prikažemo tako:

| Lastnost               | Klasični HTTP prenos v živo  | MCP prenos v živo (obvestila)    |
|------------------------|------------------------------|----------------------------------|
| Glavni odgovor          | Deljen pri prenosu            | En sam na koncu                  |
| Posodobitve napredka    | Poslano kot delčki podatkov  | Poslano kot obvestila            |
| Zahteve odjemalca       | Mora obdelovati prenos       | Mora implementirati upravljalnik sporočil |
| Primer uporabe          | Velike datoteke, AI tokovi tokenov | Napredek, dnevniki, povratne informacije v realnem času |

### Ključne opažene razlike

Poleg tega so tukaj še nekatere ključne razlike:

- **Vzorec komunikacije:**
  - Klasični HTTP prenos: uporablja preprosto kodiranje prenosa po delih za pošiljanje podatkov
  - MCP prenos: uporablja strukturiran sistem obvestil z JSON-RPC protokolom

- **Oblika sporočila:**
  - Klasični HTTP: Navadni besedilni deli s prehodi v novo vrstico
  - MCP: Strukturirani LoggingMessageNotification objekti z metapodatki

- **Implementacija odjemalca:**
  - Klasični HTTP: Preprost odjemalec, ki obdeluje prenosne odzive
  - MCP: Bolj sofisticiran odjemalec z upravljalnikom sporočil za obdelavo različnih vrst sporočil

- **Posodobitve napredka:**
  - Klasični HTTP: napredek je del glavnega toka odziva
  - MCP: napredek je poslan prek ločenih obvestil medtem ko glavni odgovor pride na koncu

### Priporočila

Obstajajo nekatera priporočila, ko izbirate med klasično implementacijo prenosa v živo (kot odziv, prikazan zgoraj z `/stream`) in prenosom prek MCP.

- **Za preproste potrebe prenosa:** Klasični HTTP prenos je enostavnejši za implementacijo in zadostuje za osnovne potrebe prenosa.

- **Za kompleksne, interaktivne aplikacije:** MCP prenos nudi bolj strukturiran pristop z bogatejšimi metapodatki in ločitvijo med obvestili in končnimi rezultati.

- **Za AI aplikacije:** MCPjev sistem obvestil je še posebej uporaben za dolgotrajne AI naloge, kjer želite uporabnike obveščati o napredku.

## Prenos v živo v MCP

V redu, doslej ste videli nekaj priporočil in primerjave med klasičnim prenosom in prenosom v MCP. Poglejmo podrobno, kako natančno lahko izkoristite prenos v MCP.

Razumevanje delovanja prenosa v živo znotraj MCP okvira je bistveno za gradnjo odzivnih aplikacij, ki uporabnikom nudijo povratne informacije v realnem času med dolgotrajnimi operacijami.

V MCP prenos ni o pošiljanju glavnega odziva po delih, ampak o pošiljanju **obvestil** odjemalcu med procesiranjem zahteve s strani orodja. Ta obvestila lahko vključujejo posodobitve napredka, dnevnike ali druge dogodke.

### Kako deluje

Glavni rezultat je še vedno poslan kot en sam odziv. Vendar pa se obvestila lahko pošiljajo kot ločena sporočila med obdelavo in tako obveščajo odjemalca v realnem času. Odjemalec mora biti sposoben obdelati in prikazati ta obvestila.

## Kaj je obvestilo?

Rekli smo "obvestilo", kaj to pomeni v kontekstu MCP?

Obvestilo je sporočilo, ki ga strežnik pošlje odjemalcu za obveščanje o napredku, stanju ali drugih dogodkih med dolgotrajno operacijo. Obvestila povečujejo preglednost in uporabniško izkušnjo.

Na primer, odjemalec naj bi poslal obvestilo, ko je začetno rokovanje s strežnikom opravljeno.

Obvestilo je videti takole kot JSON sporočilo:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Obvestila pripadajo temi v MCP imenovani ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Za delovanje beleženja strežnik mora omogočiti to kot funkcijo/zmožnost tako:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Glede na uporabljeni SDK je lahko beleženje privzeto omogočeno ali pa ga je treba izrecno omogočiti v konfiguraciji strežnika.

Obstajajo različne vrste obvestil:

| Stopnja    | Opis                          | Primer uporabe              |
|-----------|-------------------------------|-----------------------------|
| debug     | Podrobni podatki za odpravljanje napak | Vhod/izhod funkcije        |
| info      | Splošna informativna sporočila| Posodobitve napredka operacije|
| notice    | Normalni, a pomembni dogodki  | Spremembe konfiguracije     |
| warning   | Opozorilna stanja             | Uporaba zastarele funkcije  |
| error     | Napake                       | Neuspehi operacije          |
| critical  | Kritična stanja              | Napake sistemskih komponent |
| alert     | Ukrep je treba izvesti nemudoma | Zaznana poškodba podatkov  |
| emergency | Sistem ni uporaben            | Popolna okvara sistema      |

## Implementacija obvestil v MCP

Za implementacijo obvestil v MCP morate nastaviti tako strežniški kot odjemalski del za obdelavo posodobitev v realnem času. To omogoča vaši aplikaciji takojšnji odziv uporabnikom med dolgotrajnimi operacijami.

### Strežniški del: pošiljanje obvestil

Začnimo s strežniškim delom. V MCP definirate orodja, ki lahko pošiljajo obvestila med obdelavo zahtev. Strežnik uporablja kontekstni objekt (običajno `ctx`) za pošiljanje sporočil odjemalcu.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

V zgornjem primeru orodje `process_files` pošlje tri obvestila odjemalcu med obdelavo posamezne datoteke. Metoda `ctx.info()` se uporablja za pošiljanje informativnih sporočil.

Poleg tega, da omogočite obvestila, se prepričajte, da vaš strežnik uporablja streaming transport (kot `streamable-http`), in da vaš odjemalec implementira upravljalnik sporočil za obdelavo obvestil. Tako lahko nastavite strežnik za uporabo transporta `streamable-http`:

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

V tem .NET primeru je orodje `ProcessFiles` označeno z atributom `Tool` in pošilja tri obvestila odjemalcu med obdelavo posamezne datoteke. Metoda `ctx.Info()` se uporablja za pošiljanje informativnih sporočil.

Da omogočite obvestila v vašem .NET MCP strežniku, zagotovite uporabo streaming transporta:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Odjemalčev del: prejemanje obvestil

Odjemalec mora implementirati upravljalnik sporočil za obdelavo in prikaz obvestil, ko prispejo.

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

V zgornji kodi funkcija `message_handler` preveri, če je prejeto sporočilo obvestilo. Če je, ga izpiše; drugače ga obravnava kot navadno strežniško sporočilo. Prav tako opazite, kako je `ClientSession` inicializirana z `message_handler`, da obravnava prihajajoča obvestila.

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

V tem .NET primeru funkcija `MessageHandler` preveri, ali je sporočilo obvestilo. Če je, izpiše obvestilo; sicer ga obdeluje kot redno strežniško sporočilo. `ClientSession` je inicializirana z upravljalnikom sporočil prek `ClientSessionOptions`.

Da omogočite obvestila, zagotovite, da vaš strežnik uporablja streaming transport (kot je `streamable-http`) in da vaš odjemalec implementira upravljalnik sporočil za obdelavo obvestil.

## Obvestila o napredku in scenariji

Ta razdelek pojasnjuje koncept obvestil o napredku v MCP, zakaj so pomembna in kako jih implementirati s pomočjo Streamable HTTP. Prav tako boste našli praktično nalogo za utrjevanje znanja.

Obvestila o napredku so sporočila v realnem času, ki jih strežnik pošilja odjemalcu med dolgotrajnimi operacijami. Namesto da bi čakali, da se proces popolnoma konča, strežnik odjemalca sproti obvešča o trenutnem stanju. To izboljšuje preglednost, uporabniško izkušnjo in olajša odpravljanje napak.

**Primer:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Zakaj uporabljati obvestila o napredku?

Obvestila o napredku so ključna iz več razlogov:

- **Boljša uporabniška izkušnja:** uporabniki vidijo posodobitve sproti, ne le na koncu.
- **Povratne informacije v realnem času:** odjemalci lahko prikazujejo progresne vrstice ali dnevnike, zaradi česar aplikacija deluje odzivno.
- **Lažje odpravljanje napak in nadzor:** razvijalci in uporabniki lahko vidijo, kje je proces morda počasen ali zastal.

### Kako implementirati obvestila o napredku

Tukaj je, kako lahko implementirate obvestila o napredku v MCP:

- **Na strežniku:** uporabite `ctx.info()` ali `ctx.log()` za pošiljanje obvestil sproti, ko je vsak element obdelan. To pošlje sporočilo odjemalcu pred dokončnim rezultatom.
- **Na odjemalcu:** implementirajte upravljalnik sporočil, ki posluša obvestila in jih prikazuje takoj. Ta upravljalnik loči obvestila od končnega rezultata.

**Primer strežnika:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Primer odjemalca:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Varnostne presoje

Pri implementaciji MCP strežnikov s HTTP temelječimi transporti postane varnost ključno vprašanje, ki zahteva skrbno pozornost številnih vektorjev napadov in zaščitnih mehanizmov.

### Pregled

Varnost je kritična pri izpostavljanju MCP strežnikov prek HTTP. Streamable HTTP uvaja nove površine za napade in zahteva skrbno konfiguracijo.

### Ključne točke


- **Preverjanje glave Origin**: Vedno preverite glavo `Origin`, da preprečite napade DNS rebinding.
- **Povezava do localhost**: Za lokalni razvoj povežite strežnike na `localhost`, da jih ne izpostavite javnemu internetu.
- **Avtentikacija**: Za produkcijske namestitve izvedite avtentikacijo (npr. API ključi, OAuth).
- **CORS**: Konfigurirajte CORS (Cross-Origin Resource Sharing) politike za omejevanje dostopa.
- **HTTPS**: Za produkcijo uporabljajte HTTPS za šifriranje prometa.

### Najboljše prakse

- Nikoli ne zaupajte dohodnim zahtevkom brez preverjanja.
- Beležite in spremljajte ves dostop in napake.
- Redno posodabljajte odvisnosti, da zaprete varnostne ranljivosti.

### Izzivi

- Uravnoteženje varnosti z enostavnostjo razvoja
- Zagotavljanje združljivosti z različnimi odjemalskimi okolji

## Nadgradnja iz SSE na Streamable HTTP

Za aplikacije, ki trenutno uporabljajo Server-Sent Events (SSE), migracija na Streamable HTTP nudi izboljšane zmožnosti in boljšo dolgoročno vzdržnost za vaše MCP implementacije.

### Zakaj nadgraditi?

Obstajata dva prepričljiva razloga za nadgradnjo iz SSE na Streamable HTTP:

- Streamable HTTP ponuja boljšo skalabilnost, združljivost in bogatejšo podporo za obvestila kot SSE.
- Priporočen je kot transport za nove MCP aplikacije.

### Koraki migracije

Tako lahko migrirate iz SSE na Streamable HTTP v vaših MCP aplikacijah:

- **Posodobite kodo strežnika**, da uporabite `transport="streamable-http"` v `mcp.run()`.
- **Posodobite kodo odjemalca**, da uporabite `streamablehttp_client` namesto SSE odjemalca.
- **Implementirajte upravljalnik sporočil** v odjemalcu za obdelavo obvestil.
- **Preizkusite združljivost** z obstoječimi orodji in delovnimi tokovi.

### Ohranjanje združljivosti

Priporočljivo je ohraniti združljivost z obstoječimi SSE odjemalci med migracijo. Tukaj je nekaj strategij:

- Podpirajte tako SSE kot Streamable HTTP z zagonom obeh transportov na različnih končnih točkah.
- Postopoma migrirajte odjemalce na novi transport.

### Izzivi

Poskrbite, da boste med migracijo rešili naslednje izzive:

- Zagotavljanje, da so vsi odjemalci posodobljeni
- Obvladovanje razlik v dostavi obvestil

## Varnostni premisleki

Varnost mora biti prednostna naloga pri implementaciji kateregakoli strežnika, zlasti pri uporabi HTTP transportov kot je Streamable HTTP v MCP.

Pri implementaciji MCP strežnikov s HTTP transporti varnost postane ključna skrb, ki zahteva previdno obravnavo več napadnih vektorjev in zaščitnih mehanizmov.

### Pregled

Varnost je ključna pri izpostavljanju MCP strežnikov preko HTTP. Streamable HTTP uvaja nove napadalne površine in zahteva skrbno konfiguracijo.

Tukaj so nekateri ključni varnostni premisleki:

- **Preverjanje glave Origin**: Vedno preverite glavo `Origin`, da preprečite napade DNS rebinding.
- **Povezava do localhost**: Za lokalni razvoj povežite strežnike na `localhost`, da jih ne izpostavite javnemu internetu.
- **Avtentikacija**: Za produkcijske namestitve izvedite avtentikacijo (npr. API ključi, OAuth).
- **CORS**: Konfigurirajte CORS (Cross-Origin Resource Sharing) politike za omejevanje dostopa.
- **HTTPS**: Za produkcijo uporabljajte HTTPS za šifriranje prometa.

### Najboljše prakse

Poleg tega upoštevajte naslednje najboljše prakse pri implementaciji varnosti v vaš MPC streaming strežnik:

- Nikoli ne zaupajte dohodnim zahtevkom brez preverjanja.
- Beležite in spremljajte ves dostop in napake.
- Redno posodabljajte odvisnosti, da zaprete varnostne ranljivosti.

### Izzivi

Pri implementaciji varnosti v MCP streaming strežnikih boste naleteli na nekatere izzive:

- Uravnoteženje varnosti z enostavnostjo razvoja
- Zagotavljanje združljivosti z različnimi odjemalskimi okolji

### Naloga: Zgradite svojo streaming MCP aplikacijo

**Scenarij:**
Zgradite MCP strežnik in odjemalca, kjer strežnik obdeluje seznam elementov (npr. datotek ali dokumentov) in pošlje obvestilo za vsak obdelan element. Odjemalec naj prikaže vsako obvestilo ob njegovem prihodu.

**Koraki:**

1. Implementirajte strežnik, ki obdeluje seznam in pošilja obvestila za vsak element.
2. Implementirajte odjemalca z upravljalnikom sporočil za prikazovanje obvestil v realnem času.
3. Preizkusite implementacijo tako, da zaženete strežnik in odjemalca ter opazujete obvestila.

[Rešitev](./solution/README.md)

## Nadaljnje branje in kaj sledi?

Za nadaljevanje vaše poti z MCP streamingom in razširitev znanja ta razdelek ponuja dodatne vire in predlagane naslednje korake za gradnjo bolj naprednih aplikacij.

### Nadaljnje branje

- [Microsoft: Uvod v HTTP streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS v ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming zahtevki](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Kaj sledi?

- Poskusite zgraditi bolj napredna MCP orodja, ki uporabljajo streaming za analitiko v realnem času, klepet ali sodelovalno urejanje.
- Raziskujte integracijo MCP streaminga z frontend ogrodji (React, Vue itd.) za živo posodabljanje uporabniškega vmesnika.
- Naslednje: [Uporaba AI orodij za VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->