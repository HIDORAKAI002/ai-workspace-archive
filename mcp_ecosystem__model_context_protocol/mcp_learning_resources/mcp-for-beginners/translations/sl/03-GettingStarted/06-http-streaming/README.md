# HTTPS Pretakanje s protokolom Model Context Protocol (MCP)

Ta poglavje nudi obsežen vodič za implementacijo varnega, skalabilnega in pretakanja v realnem času z Model Context Protocol (MCP) z uporabo HTTPS. Obravnava motivacijo za pretakanje, razpoložljive transportne mehanizme, kako implementirati pretakajoči HTTP v MCP, varnostne najboljše prakse, migracijo iz SSE ter praktične napotke za izdelavo lastnih pretakanih MCP aplikacij.

## Transportni mehanizmi in pretakanje v MCP

Ta razdelek raziskuje različne transportne mehanizme, ki so na voljo v MCP, in njihovo vlogo pri omogočanju zmogljivosti pretakanja za komunikacijo v realnem času med odjemalci in strežniki.

### Kaj je transportni mehanizem?

Transportni mehanizem določa, kako se podatki izmenjujejo med odjemalcem in strežnikom. MCP podpira več vrst transportov, da ustreza različnim okoljem in zahtevam:

- **stdio**: Standardni vhod/izhod, primeren za lokalna orodja in na ukazni vrstici. Enostavno, vendar neprimerno za splet ali oblak.
- **SSE (Server-Sent Events)**: Omogoča strežnikom, da potiskajo posodobitve v realnem času do odjemalcev prek HTTP. Dobro za spletne uporabniške vmesnike, vendar omejeno v skalabilnosti in prilagodljivosti. Od MCP specifikacije 2025-06-18 je samostojni SSE transport ukinjen in zamenjan z transportom "Streamable HTTP".
- **Streamable HTTP**: Moderni HTTP osnovani transport za pretakanje, podpira obvestila in boljšo skalabilnost. Priporočeno za večino produkcijskih in oblačnih scenarijev.

### Primerjalna tabela

Poglejte spodnjo primerjalno tabelo, da razumete razlike med temi transportnimi mehanizmi:

| Transport         | Posodobitve v realnem času | Pretakanje | Skalabilnost | Uporabni primer          |
|-------------------|----------------------------|------------|--------------|-------------------------|
| stdio             | Ne                         | Ne         | Nizka        | Lokalna orodja CLI       |
| SSE               | Da                         | Da         | Srednja      | Splet, posodobitve v realnem času |
| Streamable HTTP   | Da                         | Da         | Visoka       | Oblačni, več odjemalcev  |

> **Namig:** Izbira pravega transporta vpliva na zmogljivost, skalabilnost in uporabniško izkušnjo. **Streamable HTTP** je priporočljiv za moderne, skalabilne in oblak-pripravljene aplikacije.

Opazite transporte stdio in SSE, ki ste jih videli v prejšnjih poglavjih, ter kako je transport Streamable HTTP pokrit v tem poglavju.

## Pretakanje: koncepti in motivacija

Razumevanje osnovnih konceptov in motivacij za pretakanje je ključno za učinkovito implementacijo komunikacijskih sistemov v realnem času.

**Pretakanje** je tehnika v omrežnem programiranju, ki omogoča pošiljanje in sprejemanje podatkov v majhnih, obvladljivih delih ali v zaporedju dogodkov, namesto da bi čakali na pripravo celotnega odgovora. To je posebej uporabno za:

- Velike datoteke ali nabore podatkov.
- Posodobitve v realnem času (npr. klepet, vrstice napredka).
- Dolgotrajna računanja, kjer želite uporabnika obveščati.

Tukaj je, kar morate vedeti o pretakanju na višji ravni:

- Podatki se dostavljajo postopoma, ne naenkrat.
- Odjemalec lahko podatke obdeluje, ko prispejo.
- Zmanjša zaznano zamudo in izboljša uporabniško izkušnjo.

### Zakaj uporabljati pretakanje?

Razlogi za uporabo pretakanja so naslednji:

- Uporabniki takoj dobijo povratne informacije, ne samo na koncu.
- Omogoča aplikacije v realnem času in odzivne UIs.
- Bolj učinkovita raba omrežnih in računalniških virov.

### Preprost primer: HTTP strežnik in odjemalec za pretakanje

Tukaj je preprost primer, kako je možno implementirati pretakanje:

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

Ta primer prikazuje strežnik, ki pošilja serijo sporočil odjemalcu, ko so na voljo, namesto da bi čakal, da so vsa sporočila pripravljena.

**Kako deluje:**

- Strežnik sproti vrača vsako sporočilo, ko je pripravljeno.
- Odjemalec prejema in izpiše vsak prihajajoči del.

**Zahteve:**

- Strežnik mora uporabljati pretakan odziv (npr. `StreamingResponse` v FastAPI).
- Odjemalec mora obdelovati odziv kot tok (`stream=True` v requests).
- Content-Type je običajno `text/event-stream` ali `application/octet-stream`.

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

**Opombe k Java implementaciji:**

- Uporablja Spring Boot reaktivni sklad s `Flux` za pretakanje
- `ServerSentEvent` omogoča strukturirano pretakanje dogodkov s tipi dogodkov
- `WebClient` z `bodyToFlux()` omogoča reaktivno porabo pretakanja
- `delayElements()` simulira čas procesa med dogodki
- Dogodki imajo tipe (`info`, `result`) za boljšo obdelavo na odjemalcu

### Primerjava: klasično pretakanje vs MCP pretakanje

Razlike med klasičnim pretakanjem in tistim v MCP lahko prikažemo tako:

| Značilnost            | Klasično HTTP pretakanje        | MCP pretakanje (obvestila)          |
|-----------------------|--------------------------------|------------------------------------|
| Glavni odgovor         | Razdeljen na kose              | En sam, na koncu                   |
| Posodobitve poteka     | Poslane kot podatkovni kosi    | Poslane kot obvestila              |
| Zahteve odjemalca     | Mora obdelati tok              | Mora implementirati upravljalnik sporočil |
| Uporabni primer       | Velike datoteke, AI tokovi     | Napredek, dnevniki, povratne informacije v realnem času |

### Ključne razlike

Še nekaj ključnih razlik:

- **Vzorec komunikacije:**
  - Klasično HTTP pretakanje: uporablja preprost chunked prenos za pošiljanje podatkov v kosih
  - MCP pretakanje: uporablja strukturiran sistem obvestil s protokolom JSON-RPC

- **Oblika sporočil:**
  - Klasično HTTP: navadni tekstovni kosi z novimi vrsticami
  - MCP: strukturirani LoggingMessageNotification objekti z metapodatki

- **Implementacija odjemalca:**
  - Klasično HTTP: preprost odjemalec, ki obdeluje pretakajoče odzive
  - MCP: bolj sofisticiran odjemalec z upravljalnikom sporočil za obdelavo različnih vrst sporočil

- **Posodobitve poteka:**
  - Klasično HTTP: potek je del glavnega toka odgovora
  - MCP: potek je poslan s posebnimi obvestilnimi sporočili, medtem ko glavni odgovor pride na koncu

### Priporočila

Priporočamo naslednje glede izbire med implementacijo klasičnega pretakanja (na točki, ki smo jo pokazali zgoraj z `/stream`) in pretakanjem preko MCP:

- **Za preproste potrebe pretakanja:** Klasično HTTP pretakanje je enostavnejše za implementacijo in zadostuje za osnovne potrebe pretakanja.

- **Za kompleksne, interaktivne aplikacije:** MCP pretakanje nudi bolj strukturiran pristop z bogatejšimi metapodatki in ločitvijo med obvestili in končnimi rezultati.

- **Za AI aplikacije:** MCP-jev sistem obvestil je posebej uporaben za dolgotrajne AI naloge, kjer želite uporabnike obveščati o napredku.

## Pretakanje v MCP

Videli ste nekaj priporočil in primerjav glede razlik med klasičnim pretakanjem in pretakanjem v MCP. Poglejmo natančno, kako lahko izkoristite pretakanje v MCP.

Razumevanje, kako pretakanje deluje znotraj okvira MCP, je bistveno za gradnjo odzivnih aplikacij, ki uporabnikom med dolgotrajnimi operacijami nudijo povratne informacije v realnem času.

V MCP-ju pretakanje ni pošiljanje glavnega odgovora v kosih, temveč pošiljanje **obvestil** do odjemalca medtem ko orodje obdeluje zahtevo. Ta obvestila lahko vključujejo posodobitve poteka, dnevnike ali druge dogodke.

### Kako deluje

Glavni rezultat je še vedno poslan kot en sam odgovor. Vendar pa je obvestila možno pošiljati kot ločena sporočila med obdelavo in tako posodabljati odjemalca v realnem času. Odjemalec mora biti sposoben ta obvestila sprejemati in prikazovati.

## Kaj je obvestilo?

Rekli smo "obvestilo", kaj to pomeni v kontekstu MCP?

Obvestilo je sporočilo, ki ga strežnik pošlje odjemalcu, da ga obvesti o poteku, stanju ali drugih dogodkih med dolgotrajno operacijo. Obvestila izboljšujejo preglednost in uporabniško izkušnjo.

Na primer, odjemalec naj bi poslal obvestilo, ko je izveden začetni prijem (handshake) s strežnikom.

Obvestilo izgleda tako kot JSON sporočilo:

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

Za delovanje beleženja mora strežnik omogočiti to kot funkcionalnost oziroma zmožnost na sledeč način:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Glede na uporabljeni SDK je lahko beleženje omogočeno privzeto ali pa ga je potrebno izrecno aktivirati v nastavitvah strežnika.

Obstajajo različne vrste obvestil:

| Raven      | Opis                            | Primer uporabe               |
|------------|--------------------------------|-----------------------------|
| debug      | Podrobne informacije za odpravljanje napak | Vhodi/izhodi funkcij         |
| info       | Splošna informacijska sporočila | Posodobitve poteka operacije |
| notice     | Normalni, a pomembni dogodki    | Spremembe konfiguracije       |
| warning    | Pogoji opozorila               | Uporaba zastarelih funkcij   |
| error      | Napake                        | Neuspehi operacij            |
| critical   | Kritični pogoji               | Napake sistemskih komponent  |
| alert      | Neposredna potrebna akcija     | Zaznana poškodba podatkov    |
| emergency  | Sistem ni uporaben            | Popolna okvara sistema       |

## Implementacija obvestil v MCP

Za implementacijo obvestil v MCP je treba nastaviti tako stran strežnika kot tudi odjemalca za obdelavo posodobitev v realnem času. To omogoča vaši aplikaciji takojšnje povratne informacije uporabnikom med dolgotrajnimi operacijami.

### Strežniška stran: pošiljanje obvestil

Začnimo s strežniško stranjo. V MCP definirate orodja, ki lahko pošiljajo obvestila med obdelavo zahtev. Strežnik uporablja objekt konteksta (običajno `ctx`) za pošiljanje sporočil odjemalcu.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

V zgornjem primeru orodje `process_files` med obdelavo vsake datoteke pošlje tri obvestila odjemalcu. Metoda `ctx.info()` se uporablja za pošiljanje informativnih sporočil.

Poleg tega, da omogočite obvestila, zagotovite, da vaš strežnik uporablja transport za pretakanje (kot je `streamable-http`), vaš odjemalec pa implementira upravljalnik sporočil za obdelavo obvestil. Tako lahko nastavite strežnik za uporabo `streamable-http` transporta:

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

V tem .NET primeru je orodje `ProcessFiles` označeno z atributom `Tool` in med obdelavo vsake datoteke pošlje tri obvestila odjemalcu. Metoda `ctx.Info()` se uporablja za pošiljanje informativnih sporočil.

Za omogočanje obvestil v vašem .NET MCP strežniku zagotovite uporabo transporta za pretakanje:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Odjemalska stran: prejemanje obvestil

Odjemalec mora implementirati upravljalnik sporočil, ki obdeluje in prikazuje obvestila, ko prispejo.

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

V zgornji kodi funkcija `message_handler` preverja, ali je prejete sporočilo obvestilo. Če je, izpiše obvestilo, sicer ga obdela kot redno sporočilo strežnika. Prav tako opazite, da je `ClientSession` inicializiran z `message_handler`, ki skrbi za obdelavo prispelih obvestil.

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

V tem .NET primeru funkcija `MessageHandler` preverja, ali je prejete sporočilo obvestilo. Če je, izpiše obvestilo, sicer ga obdela kot redno strežniško sporočilo. `ClientSession` je inicializiran z upravljalnikom sporočil preko `ClientSessionOptions`.

Za omogočanje obvestil zagotovite, da vaš strežnik uporablja transport za pretakanje (kot je `streamable-http`) in vaš odjemalec implementira upravljalnik sporočil za obdelavo obvestil.

## Obvestila o poteku in scenariji

Ta razdelek pojasnjuje koncept obvestil o poteku v MCP, zakaj so pomembna in kako jih implementirati z uporabo Streamable HTTP. Prav tako vsebuje praktično nalogo za utrditev razumevanja.

Obvestila o poteku so sporočila v realnem času, ki jih strežnik pošilja odjemalcu med dolgotrajnimi operacijami. Namesto da strežnik čaka na dokončanje procesov, odjemalca nenehno obvešča o trenutnem stanju. To izboljšuje preglednost, uporabniško izkušnjo in olajša odpravljanje napak.

**Primer:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Zakaj uporabiti obvestila o poteku?

Obvestila o poteku so pomembna zaradi več razlogov:

- **Boljša uporabniška izkušnja:** Uporabniki vidijo posodobitve med delom, ne samo na koncu.
- **Povratne informacije v realnem času:** Odjemalci lahko prikažejo vrstice napredka ali dnevnike, kar naredi aplikacijo odzivnejšo.
- **Lažje odpravljanje napak in spremljanje:** Razvijalci in uporabniki lahko vidijo, kje je proces počasnejši ali obstaja zastoje.

### Kako implementirati obvestila o poteku

Tako lahko implementirate obvestila o poteku v MCP:

- **Na strežniku:** Uporabite `ctx.info()` ali `ctx.log()` za pošiljanje obvestil za vsak postopek. To pošlje sporočilo odjemalcu, preden je glavni rezultat pripravljen.
- **Na odjemalcu:** Implementirajte upravljalnik sporočil, ki posluša obvestila in jih prikazuje po prihodu. Ta upravljalnik razlikuje med obvestili in končnim rezultatom.

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

## Varnostne vidike

Pri implementaciji MCP strežnikov s transporti na osnovi HTTP postane varnost temeljna skrb, ki zahteva skrbno obravnavo več napadalnih vektorjev in zaščitnih mehanizmov.

### Pregled

Varnost je ključnega pomena, ko MCP strežnike izpostavljate prek HTTP. Streamable HTTP odpira nove površine napadov in zahteva skrbno konfiguracijo.

### Ključne točke

- **Preverjanje glave Origin**: Vedno preverjajte glavo `Origin`, da preprečite DNS rebinding napade.
- **Povezovanje na localhost**: Za lokalni razvoj vežite strežnike na `localhost`, da jih ne izpostavite javnemu internetu.
- **Avtentikacija**: Za produkcijske namestitve implementirajte avtentikacijo (npr. API ključi, OAuth).
- **CORS**: Nastavite politike za Cross-Origin Resource Sharing (CORS), da omejite dostop.
- **HTTPS**: V produkciji vedno uporabljajte HTTPS za šifriranje prometa.

### Najboljše prakse

- Nikoli ne zaupajte vhodnim zahtevam brez preverjanja.
- Beležite in spremljajte ves dostop in napake.
- Redno posodabljajte odvisnosti za odpravljanje varnostnih ranljivosti.

### Izzivi
- Uravnoteženje varnosti in enostavnosti razvoja
- Zagotavljanje združljivosti z različnimi odjemalskimi okolji

## Nadgradnja s SSE na Streamable HTTP

Za aplikacije, ki trenutno uporabljajo Server-Sent Events (SSE), migracija na Streamable HTTP prinaša izboljšane zmogljivosti in boljšo dolgoročno vzdržnost vaših implementacij MCP.

### Zakaj nadgraditi?

Obstajata dva prepričljiva razloga za nadgradnjo s SSE na Streamable HTTP:

- Streamable HTTP nudi boljšo skalabilnost, združljivost in bogatejšo podporo obvestil kot SSE.
- Je priporočena prijazna oblika prenosa za nove MCP aplikacije.

### Koraki migracije

Tako lahko migrirate s SSE na Streamable HTTP v svojih MCP aplikacijah:

- **Posodobite strežniško kodo** z uporabo `transport="streamable-http"` v `mcp.run()`.
- **Posodobite odjemalsko kodo** z uporabo `streamablehttp_client` namesto SSE odjemalca.
- **Implementirajte upravljalec sporočil** v odjemalcu za obdelavo obvestil.
- **Testirajte združljivost** z obstoječimi orodji in tokovi dela.

### Ohranjanje združljivosti

Priporočljivo je ohranjati združljivost z obstoječimi SSE odjemalci med migracijo. Tukaj je nekaj strategij:

- Podpirate lahko oba, SSE in Streamable HTTP, tako, da poganjate oba prenosa na različnih končnih točkah.
- Postopoma premikajte odjemalce na novi prenos.

### Izzivi

Poskrbite, da boste med migracijo naslovili naslednje izzive:

- Zagotoviti, da so vsi odjemalci posodobljeni
- Obvladovanje razlik v dostavi obvestil

## Varnostni vidiki

Varnost naj bo najpomembnejša ob implementaciji kateregakoli strežnika, zlasti pri uporabi HTTP-prenosov, kot je Streamable HTTP v MCP.

Pri implementaciji MCP strežnikov z HTTP-prenosi postane varnost ključen element, ki zahteva natančno pozornost številnim napadalnim vektorjem in zaščitnim mehanizmom.

### Pregled

Varnost je ključna pri izpostavljanju MCP strežnikov prek HTTP. Streamable HTTP uvaja nove napadalne površine in zahteva natančno konfiguracijo.

Tu je nekaj ključnih varnostnih vidikov:

- **Preverjanje glave Origin**: Vedno preverjajte glavo `Origin`, da preprečite DNS rebinding napade.
- **Povezava na localhost**: Za lokalni razvoj vežite strežnike na `localhost`, da jih ne izpostavite javnemu internetu.
- **Avtentikacija**: Za produkcijske namestitve implementirajte avtentikacijo (npr. API ključi, OAuth).
- **CORS**: Konfigurirajte politike Cross-Origin Resource Sharing (CORS) za omejitev dostopa.
- **HTTPS**: V produkciji uporabljajte HTTPS za šifriranje prometa.

### Najboljše prakse

Poleg tega upoštevajte naslednje najboljše prakse pri implementaciji varnosti v vašem MCP streaming strežniku:

- Nikoli ne zaupajte vhodnim zahtevam brez preverjanja.
- Zapisujte in spremljajte ves dostop in napake.
- Redno posodabljajte odvisnosti za popravke varnostnih ranljivosti.

### Izzivi

Pri implementaciji varnosti v MCP streaming strežnike se boste soočili z nekaterimi izzivi:

- Uravnoteženje varnosti in enostavnosti razvoja
- Zagotavljanje združljivosti z različnimi odjemalskimi okolji

### Naloga: Zgradite svojo lastno streaming MCP aplikacijo

**Scenarij:**
Zgradite MCP strežnik in odjemalca, kjer strežnik obdeluje seznam elementov (npr. datoteke ali dokumente) in pošilja obvestilo za vsak obdelani element. Odjemalec mora prikazati vsako obvestilo, ko prispe.

**Koraki:**

1. Implementirajte strežniško orodje, ki obdeluje seznam in pošilja obvestila za vsak element.
2. Implementirajte odjemalca z upravljalcem sporočil za prikaz obvestil v realnem času.
3. Testirajte svojo implementacijo z zagonom strežnika in odjemalca ter opazujte obvestila.

[Rešitev](./solution/README.md)

## Nadaljnje branje in kaj naslednje?

Da nadaljujete svojo pot z MCP streamingom in razširite svoje znanje, ta razdelek ponuja dodatne vire in predlagane naslednje korake za gradnjo naprednejših aplikacij.

### Nadaljnje branje

- [Microsoft: Uvod v HTTP streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS v ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming zahteve](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Kaj naslednje?

- Poskusite zgraditi naprednejša MCP orodja, ki uporabljajo streaming za analitiko v realnem času, klepet ali sodelovalno urejanje.
- Raziskujte integracijo MCP streaminga s frontend ogrodji (React, Vue itd.) za žive posodobitve uporabniškega vmesnika.
- Naslednje: [Uporaba AI Toolkit za VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->