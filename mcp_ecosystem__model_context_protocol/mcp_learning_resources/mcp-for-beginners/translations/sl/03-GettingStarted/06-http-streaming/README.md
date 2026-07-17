# HTTPS Pretakanje s protokolom Model Context (MCP)

Ta poglavje ponuja obsežen vodnik za implementacijo varnega, skalabilnega in pretočnega prenosa v realnem času s protokolom Model Context (MCP) prek HTTPS. Pokriva motivacijo za pretakanje, razpoložljive transportne mehanizme, kako implementirati pretočni HTTP v MCP, najboljše varnostne prakse, migracijo iz SSE in praktična navodila za gradnjo lastnih pretočnih aplikacij MCP.

> **Pogled v prihodnost:** ta lekcija opisuje Streamable HTTP pod **MCP specifikacijo 2025-11-25**, kjer se seansa vzpostavi med `initialize` in pritrdi z glavo `Mcp-Session-Id`. Kandidatka za izdajo `2026-07-28` popolnoma odstrani rokovanje in ID seanse, tako da je vsak zahtevek samostojen in usmerljiv do katerega koli strežnika brez lepivih seans. Več glej [Kaj se spreminja v MCP: Kandidatka za izdajo 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Transportni mehanizmi in pretakanje v MCP

Ta oddelek raziskuje različne razpoložljive transportne mehanizme v MCP in njihovo vlogo pri omogočanju pretočnih zmogljivosti za komunikacijo v realnem času med odjemalci in strežniki.

### Kaj je transportni mehanizem?

Transportni mehanizem določa, kako se podatki izmenjujejo med odjemalcem in strežnikom. MCP podpira več vrst transporta, da ustreza različnim okoljem in zahtevam:

- **stdio**: Standardni vhod/izhod, primeren za lokalna orodja in CLI. Enostaven, a neprimeren za splet ali oblak.
- **SSE (Server-Sent Events)**: Omogoča strežnikom, da odjemalcem preko HTTP pošiljajo posodobitve v realnem času. Dober za spletne vmesnike, a omejen v skalabilnosti in prilagodljivosti. Po MCP specifikaciji 2025-06-18 je samostojen SSE transport ukinjen in nadomeščen s transportom "Streamable HTTP".
- **Streamable HTTP**: Sodobni HTTP-baziran pretočni transport, ki podpira obvestila in boljšo skalabilnost. Priporočljiv za večino produkcijskih in oblačnih scenarijev.

### Primerjalna tabela

Oglejte si primerjalno tabelo spodaj, da razumete razlike med temi transportnimi mehanizmi:

| Transport         | Posodobitve v realnem času | Pretakanje | Skalabilnost | Primer uporabe          |
|-------------------|----------------------------|------------|--------------|-------------------------|
| stdio             | Ne                         | Ne         | Nizka        | Lokalna CLI orodja      |
| SSE               | Da                         | Da         | Srednja      | Splet, posodobitve v realnem času |
| Streamable HTTP   | Da                         | Da         | Visoka       | Oblak, več odjemalcev   |

> **Namig:** Izbira pravega transporta vpliva na zmogljivost, skalabilnost in uporabniško izkušnjo. **Streamable HTTP** je priporočljiv za sodobne, skalabilne in oblačne aplikacije.

Opazite transporte stdio in SSE, ki so bili prikazani v prejšnjih poglavjih, ter kako je streamable HTTP transport, obravnavan v tem poglavju.

## Pretakanje: koncepti in motivacija

Razumevanje osnovnih konceptov in motivacij za pretakanje je ključnega pomena za implementacijo učinkovitih sistemov komunikacije v realnem času.

**Pretakanje** je tehnika v omrežnem programiranju, ki omogoča pošiljanje in prejemanje podatkov v majhnih, obvladljivih kosih ali zaporedju dogodkov, namesto čakanja na celoten odgovor. To je še posebej uporabno za:

- Velike datoteke ali nize podatkov.
- Posodobitve v realnem času (npr. klepet, trakovi napredka).
- Dolgotrajne izračune, kjer želite o uporabniku ostajati obveščen.

Tukaj je, kar morate vedeti o pretakanju na visoki ravni:

- Podatki se dostavljajo postopoma, ne naenkrat.
- Odjemalec lahko obdeluje podatke, ko prispejo.
- Zmanjšuje zaznano zakasnitev in izboljšuje uporabniško izkušnjo.

### Zakaj uporabljati pretakanje?

Razlogi za uporabo pretakanja so naslednji:

- Uporabniki takoj prejmejo povratne informacije, ne samo ob koncu.
- Omogoča aplikacije v realnem času in odzivne uporabniške vmesnike.
- Učinkovitejša uporaba omrežnih in računskih virov.

### Preprost primer: HTTP pretočni strežnik in odjemalec

Tukaj je preprost primer, kako se lahko pretakanje implementira:

#### Python

**Strežnik (Python, z uporabo FastAPI in StreamingResponse):**

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

**Odjemalec (Python, z uporabo requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Ta primer prikazuje strežnik, ki odjemalcu pošilja serijo sporočil, ko so na voljo, namesto da bi čakal, da so vsa sporočila pripravljena.

**Kako deluje:**

- Strežnik sprosti vsako sporočilo takoj, ko je pripravljeno.
- Odjemalec prejme in izpiše vsak kos podatkov ob prejemu.

**Zahteve:**

- Strežnik mora uporabiti pretočni odgovor (npr. `StreamingResponse` v FastAPI).
- Odjemalec mora obdelovati odgovor kot pretok (`stream=True` v requests).
- Vsebinski tip je ponavadi `text/event-stream` ali `application/octet-stream`.

#### Java

**Strežnik (Java, z uporabo Spring Boot in Server-Sent Events):**

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

**Odjemalec (Java, z uporabo Spring WebFlux WebClient):**

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

**Opombe k implementaciji za Javo:**

- Uporablja reaktivni sklad Spring Boot z `Flux` za pretakanje
- `ServerSentEvent` omogoča strukturirano pretočno dogajanje z vrstami dogodkov
- `WebClient` z `bodyToFlux()` omogoča reaktivno prebavo pretakanja
- `delayElements()` simulira čas obdelave med dogodki
- Dogodki lahko vsebujejo tipe (`info`, `result`) za boljšo obravnavo pri odjemalcu

### Primerjava: Klasično pretakanje vs MCP pretakanje

Razlike med tem, kako klasično pretakanje deluje in kako deluje v MCP, so prikazane takole:

| Značilnost             | Klasično HTTP Pretakanje       | MCP Pretakanje (Obvestila)       |
|------------------------|-------------------------------|---------------------------------|
| Glavni odziv            | Razdeljen na kose              | En sam, ob koncu                |
| Posodobitve napredka    | Poslane kot podatkovni kosi    | Poslane kot obvestila           |
| Zahteve odjemalca       | Mora obdelati pretok           | Mora uporabljati obdelovalec sporočil |
| Uporabni primer         | Velike datoteke, AI token tokovi | Napredek, dnevniki, povratne informacije v realnem času |

### Opažene glavne razlike

Poleg tega so tu nekatere ključne razlike:

- **Vzorec komunikacije:**
  - Klasično HTTP pretakanje: uporablja preprost razkosani prenos za pošiljanje podatkov v kosih
  - MCP pretakanje: uporablja strukturiran sistem obvestil s protokolom JSON-RPC

- **Format sporočila:**
  - Klasično HTTP: navadni tekstovni kosi z novimi vrsticami
  - MCP: strukturirana sporočila LoggingMessageNotification z metapodatki

- **Implementacija odjemalca:**
  - Klasično HTTP: preprost odjemalec, ki obdeluje pretočne odgovore
  - MCP: bolj sofisticiran odjemalec z obdelovalcem sporočil za obdelavo različnih vrst sporočil

- **Posodobitve napredka:**
  - Klasično HTTP: napredek je del glavnega toka odgovora
  - MCP: napredek se pošilja prek ločenih sporočil obvestil, medtem ko glavni odgovor pride na koncu

### Priporočila

Pri izbiri med klasično implementacijo pretakanja (kot smo prikazali zgoraj z `/stream`) ali pretakanje preko MCP priporočamo naslednje.

- **Za preproste potrebe pretakanja:** Klasično HTTP pretakanje je enostavnejše za implementacijo in zadostuje osnovnim potrebam pretakanja.

- **Za kompleksne, interaktivne aplikacije:** MCP pretakanje nudi strukturiran pristop z bogatejšimi metapodatki in ločitvijo med obvestili ter končnimi rezultati.

- **Za AI aplikacije:** MCP sistem obvestil je še posebej uporaben za dolgotrajne AI naloge, kjer želite uporabnike obveščati o napredku.

## Pretakanje v MCP

V redu, torej ste doslej videli nekaj priporočil in primerjav razlik med klasičnim pretakanjem in pretakanjem v MCP. Poglejmo podrobneje, kako lahko izkoristite pretakanje v MCP.

Razumevanje, kako pretakanje deluje v okviru MCP, je bistvenega pomena za gradnjo odzivnih aplikacij, ki uporabnikom nudijo povratne informacije v realnem času med dolgotrajnimi operacijami.

V MCP pretakanje ni pošiljanje glavnega odgovora v kosih, temveč pošiljanje **obvestil** odjemalcu medtem ko orodje obdeluje zahtevek. Ta obvestila lahko vključujejo posodobitve napredka, dnevnike ali druge dogodke.

### Kako deluje

Glavni rezultat je še vedno poslan kot enkraten odgovor. Vendar se obvestila pošiljajo kot ločena sporočila med obdelavo in tako sproti posodabljajo odjemalca. Odjemalec mora biti sposoben obravnavati in prikazovati ta obvestila.

## Kaj je Obvestilo?

Rekli smo "Obvestilo", kaj to pomeni v kontekstu MCP?

Obvestilo je sporočilo, poslano s strežnika odjemalcu, da obvesti o napredku, stanju ali drugih dogodkih med dolgotrajno operacijo. Obvestila izboljšajo preglednost in uporabniško izkušnjo.

Na primer, odjemalec naj bi poslal obvestilo takoj, ko je vzpostavljen začetni ročni stisk s strežnikom.

Obvestilo izgleda tako v JSON sporočilu:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Obvestila pripadajo temi v MCP, imenovani ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Obvestilo o ukinitvi:** kandidatka za MCP specifikacijo izdaje 2026-07-28 označuje primitiv Logging kot ukinjen v korist `stderr` za stdio transporte in OpenTelemetry za strukturirano opazovanje. Logging ostaja delujoč v izdaji 2025-11-25 in še vsaj eno leto po formalni ukinitvi. Več glej [Kaj se spreminja v MCP: Kandidatka za izdajo 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Za delovanje logiranja mora strežnik omogočiti to funkcionalnost takole:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Odvisno od uporabljenega SDK-ja je lahko logiranje privzeto omogočeno ali pa ga je treba eksplicitno aktivirati v konfiguraciji strežnika.

Obstajajo različne vrste obvestil:

| Raven     | Opis                          | Primer uporabe               |
|-----------|-------------------------------|------------------------------|
| debug     | Podrobne informacije za razhroščevanje | Vstopne/izstopne točke funkcij |
| info      | Splošna informativna sporočila    | Posodobitve napredka operacije |
| notice    | Normalni, a pomembni dogodki      | Spremembe konfiguracije       |
| warning   | Opozorilni pogoji                | Uporaba zastarelih funkcij    |
| error     | Napake                         | Neuspehi operacij             |
| critical  | Kritični pogoji                 | Napake sistemskih komponent   |
| alert     | Takojšnja potreba po ukrepanju  | Odkriva poškodbe podatkov     |
| emergency | Sistem ni uporaben              | Popolna sistemska okvara      |

## Implementacija obvestil v MCP

Za implementacijo obvestil v MCP morate nastaviti strežniško in odjemalčevo stran za obravnavo posodobitev v realnem času. To vaši aplikaciji omogoča takojšnje povratne informacije uporabnikom med dolgotrajnimi operacijami.

### Strežniška stran: pošiljanje obvestil

Začnimo s strežniško stranjo. V MCP definirate orodja, ki lahko med obdelavo zahtev pošiljajo obvestila. Strežnik uporablja kontekstni objekt (običajno `ctx`), da pošilja sporočila odjemalcu.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

V prejšnjem primeru orodje `process_files` pošlje odjemalcu tri obvestila med obdelavo posameznih datotek. Metoda `ctx.info()` se uporablja za pošiljanje informativnih sporočil.

Poleg tega za omogočanje obvestil zagotovite, da vaš strežnik uporablja pretočni transport (kot je `streamable-http`), odjemalec pa ima implementiran obdelovalec sporočil za obravnavo obvestil. Tako nastavite strežnik za uporabo transporta `streamable-http`:

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

V tem .NET primeru je orodje `ProcessFiles` označeno z atributom `Tool` in odjemalcu pošlje tri obvestila med obdelavo vsake datoteke. Metoda `ctx.Info()` se uporablja za pošiljanje informativnih sporočil.

Za omogočanje obvestil v vašem .NET MCP strežniku zagotovite uporabo pretočnega transporta:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Odjemalčeva stran: prejemanje obvestil

Odjemalec mora implementirati obdelovalec sporočil, ki obdeluje in prikazuje obvestila ob njihovem prejemu.

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

V predhodni kodi funkcija `message_handler` preverja, ali je prejeto sporočilo obvestilo. Če je, obvestilo izpiše, sicer ga obravnava kot običajno strežniško sporočilo. Prav tako opazite, da je `ClientSession` inicializiran z `message_handler`, da obravnava prejeta obvestila.

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

V tem .NET primeru funkcija `MessageHandler` preverja, ali je prejeto sporočilo obvestilo. Če je, izpiše obvestilo, sicer ga obravnava kot običajno strežniško sporočilo. `ClientSession` je inicializiran z obdelovalcem sporočil preko `ClientSessionOptions`.

Za omogočanje obvestil zagotovite, da vaš strežnik uporablja pretočni transport (kot je `streamable-http`) in da vaš odjemalec implementira obdelovalec sporočil za obdelavo obvestil.

## Obvestila o napredku in scenariji

Ta oddelek razlaga pojem obvestil o napredku v MCP, zakaj so pomembna in kako jih implementirati z uporabo Streamable HTTP. Prav tako boste našli praktično nalogo za utrditev znanja.

Obvestila o napredku so sporočila v realnem času, poslana s strežnika odjemalcu med dolgotrajnimi operacijami. Namesto da bi čakali, da se celoten proces zaključi, strežnik odjemalca sproti obvešča o trenutnem stanju. To izboljša preglednost, uporabniško izkušnjo in olajša odpravljanje napak.

**Primer:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Zakaj uporabljati obvestila o napredku?

Obvestila o napredku so bistvena iz več razlogov:

- **Boljša uporabniška izkušnja:** uporabniki vidijo posodobitve med potekom dela, ne le ob koncu.
- **Povratne informacije v realnem času:** odjemalci lahko prikažejo trakove napredka ali dnevnike, kar naredi aplikacijo odzivno.
- **Lažje odpravljanje napak in nadzor:** razvijalci in uporabniki lahko vidijo, kje je proces morda počasen ali obstal.

### Kako implementirati obvestila o napredku

Tako lahko implementirate obvestila o napredku v MCP:

- **Na strežniški strani:** uporabite `ctx.info()` ali `ctx.log()` za pošiljanje obvestil, ko se posamezni elementi obdelajo. To pošlje sporočilo odjemalcu pred tem, ko je glavni rezultat pripravljen.
- **Na odjemalčevi strani:** implementirajte obdelovalec sporočil, ki posluša in prikazuje obvestila ob prejemu. Ta loči med obvestili in končnim rezultatom.

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

## Varnostni vidiki

Pri izvajanju MCP strežnikov s transporti, temelječimi na HTTP, postane varnost ključna skrb, ki zahteva skrbno pozornost več napadalnim vektorjem in zaščitnim mehanizmom.

### Pregled

Varnost je ključna, ko izpostavljamo MCP strežnike prek HTTP. Streamable HTTP uvaja nove napadalne površine in zahteva skrbno konfiguracijo.

### Ključne točke

- **Preverjanje glave Origin**: Vedno preverite glavo `Origin`, da preprečite DNS rebinding napade.
- **Povezava na localhost**: Za lokalni razvoj povežite strežnike na `localhost`, da jih ne izpostavite javnemu internetu.
- **Preverjanje pristnosti**: Za produkcijske namestitve uvedite preverjanje pristnosti (npr. API ključi, OAuth).
- **CORS**: Konfigurirajte politike Cross-Origin Resource Sharing (CORS) za omejitev dostopa.
- **HTTPS**: Za šifriranje prometa v produkciji uporabite HTTPS.

### Najboljše prakse

- Nikoli ne zaupajte dohodnim zahtevam brez preverjanja.
- Beležite in spremljajte ves dostop in napake.
- Redno posodabljajte odvisnosti za odpravo varnostnih ranljivosti.

### Izzivi

- Uravnoteženje varnosti z enostavnostjo razvoja
- Zagotavljanje združljivosti z različnimi okolji odjemalcev

## Nadgradnja iz SSE na Streamable HTTP

Za aplikacije, ki trenutno uporabljajo Server-Sent Events (SSE), prehod na Streamable HTTP prinaša izboljšane zmogljivosti in boljšo dolgoročno vzdržnost vaših MCP implementacij.

### Zakaj nadgraditi?

Obstajata dva prepričljiva razloga za nadgradnjo iz SSE na Streamable HTTP:

- Streamable HTTP ponuja boljšo razširljivost, združljivost in bogato podporo obvestil kot SSE.
- Je priporočeni transport za nove MCP aplikacije.

### Koraki migracije

Tako lahko migrirate iz SSE na Streamable HTTP v vaših MCP aplikacijah:

- **Posodobite kodo strežnika** tako, da uporabite `transport="streamable-http"` v `mcp.run()`.
- **Posodobite kodo odjemalca** na uporabo `streamablehttp_client` namesto SSE odjemalca.
- **Implementirajte obdelovalca sporočil** v odjemalcu za obdelavo obvestil.
- **Preizkusite združljivost** z obstoječimi orodji in delovnimi tokovi.

### Ohranitev združljivosti

Priporočljivo je ohraniti združljivost z obstoječimi SSE odjemalci med migracijo. Tukaj je nekaj strategij:

- Lahko podpirate tako SSE kot Streamable HTTP tako, da oba transporta izvajate na različnih končnih točkah.
- Stranke postopoma migrirajte na nov transport.

### Izzivi

Med migracijo naslovite naslednje izzive:

- Zagotavljanje, da so vsi odjemalci posodobljeni
- Razlikovanje v dostavi obvestil

## Varnostni vidiki

Varnost mora biti najpomembnejši prioritet pri uresničevanju kateregakoli strežnika, še posebej pri uporabi transportov, temelječih na HTTP, kot je Streamable HTTP v MCP.

Pri izvajanju MCP strežnikov s transporti, temelječimi na HTTP, postane varnost ključna skrb, ki zahteva skrbno pozornost več napadalnim vektorjem in zaščitnim mehanizmom.

### Pregled

Varnost je ključna, ko izpostavljamo MCP strežnike prek HTTP. Streamable HTTP uvaja nove napadalne površine in zahteva skrbno konfiguracijo.

Tukaj je nekaj ključnih varnostnih vidikov:

- **Preverjanje glave Origin**: Vedno preverite glavo `Origin`, da preprečite DNS rebinding napade.
- **Povezava na localhost**: Za lokalni razvoj povežite strežnike na `localhost`, da jih ne izpostavite javnemu internetu.
- **Preverjanje pristnosti**: Za produkcijske namestitve uvedite preverjanje pristnosti (npr. API ključi, OAuth).
- **CORS**: Konfigurirajte politike Cross-Origin Resource Sharing (CORS) za omejitev dostopa.
- **HTTPS**: Za šifriranje prometa v produkciji uporabite HTTPS.

### Najboljše prakse

Poleg tega so tukaj nekatere najboljše prakse za varno izvajanje vašega MCP streaming strežnika:

- Nikoli ne zaupajte dohodnim zahtevam brez preverjanja.
- Beležite in spremljajte ves dostop in napake.
- Redno posodabljajte odvisnosti za odpravo varnostnih ranljivosti.

### Izzivi

Pri izvajanju varnosti v MCP streaming strežnikih se boste soočili z nekaterimi izzivi:

- Uravnoteženje varnosti z enostavnostjo razvoja
- Zagotavljanje združljivosti z različnimi okolji odjemalcev

### Naloga: Zgradite svojo Streaming MCP aplikacijo

**Scenarij:**
Zgradite MCP strežnik in odjemalca, kjer strežnik obdela seznam elementov (npr. datoteke ali dokumente) in pošlje obvestilo za vsak obdelani element. Odjemalec naj prikazuje vsako obvestilo sproti.

**Koraki:**

1. Implementirajte orodje strežnika, ki obdela seznam in pošlje obvestila za vsak element.
2. Implementirajte odjemalca z obdelovalcem sporočil za prikaz obvestil v realnem času.
3. Preizkusite izvedbo z zagonom strežnika in odjemalca ter opazujte obvestila.

[Rešitev](./solution/README.md)

## Nadaljnje branje & Kaj naprej?

Za nadaljevanje vaše poti z MCP streamingom in razširitev znanja ta razdelek nudi dodatne vire in predloge za naslednje korake pri gradnji bolj naprednih aplikacij.

### Nadaljnje branje

- [Microsoft: Uvod v HTTP streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS v ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Kaj naprej?

- Poskusite zgraditi bolj napredna MCP orodja, ki uporabljajo streaming za analitiko v realnem času, klepet ali sodelovalno urejanje.
- Raziščite integracijo MCP streaminga s frontend okviri (React, Vue itd.) za neposredne posodobitve UI.
- Naslednje: [Uporaba AI orodij za VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->