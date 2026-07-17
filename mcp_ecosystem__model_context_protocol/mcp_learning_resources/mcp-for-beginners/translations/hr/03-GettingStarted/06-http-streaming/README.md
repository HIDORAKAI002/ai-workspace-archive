# HTTPS Streaming s Model Context Protocolom (MCP)

Ovo poglavlje pruža sveobuhvatan vodič za implementaciju sigurnog, skalabilnog i prijenosa uživo u stvarnom vremenu s Model Context Protokolom (MCP) koristeći HTTPS. Pokriva motivaciju za streaming, dostupne transportne mehanizme, kako implementirati streamable HTTP u MCP-u, najbolje sigurnosne prakse, migraciju s SSE-a i praktične smjernice za izgradnju vlastitih streaming MCP aplikacija.

> **Pogled unaprijed:** ova lekcija opisuje streamable HTTP pod **MCP specifikacijom 2025-11-25**, gdje se sesija uspostavlja tijekom `initialize` i veže s `Mcp-Session-Id` zaglavljem. Release kandidat `2026-07-28` uklanja handshake i ID sesije u potpunosti, čineći svaki zahtjev samostalnim i usmjerivim na bilo koji serverski primjer bez stick sesija. Pogledajte [Što se mijenja u MCP-u: Release kandidat 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) za detalje.

## Transportni mehanizmi i streaming u MCP-u

Ovaj odjeljak istražuje različite dostupne transportne mehanizme u MCP-u i njihovu ulogu u omogućavanju streaming mogućnosti za komunikaciju u stvarnom vremenu između klijenata i servera.

### Što je transportni mehanizam?

Transportni mehanizam definira kako se podaci razmjenjuju između klijenta i servera. MCP podržava više tipova transporta koji odgovaraju različitim okruženjima i zahtjevima:

- **stdio**: Standardni ulaz/izlaz, pogodan za lokalne i CLI alate. Jednostavno, ali nije prikladno za web ili cloud.
- **SSE (Server-Sent Events)**: Omogućuje serverima da putem HTTP-a šalju ažuriranja u stvarnom vremenu klijentima. Dobro za web UI-je, ali ograničeno u skalabilnosti i fleksibilnosti. Od MCP specifikacije 2025-06-18, samostalni SSE transport je zastario i zamijenjen je "Streamable HTTP" transportom.
- **Streamable HTTP**: Moderni streaming transport zasnovan na HTTP-u, podržava obavijesti i bolju skalabilnost. Preporučen za većinu produkcijskih i cloud scenarija.

### Usporedna tablica

Pogledajte usporednu tablicu u nastavku kako biste razumjeli razlike između ovih transportnih mehanizama:

| Transport         | Ažuriranja u stvarnom vremenu | Streaming | Skalabilnost | Primjena                 |
|------------------|-------------------------------|-----------|-------------|--------------------------|
| stdio            | Ne                            | Ne        | Niska       | Lokalni CLI alati        |
| SSE              | Da                            | Da        | Srednja     | Web, ažuriranja u stvarnom vremenu |
| Streamable HTTP  | Da                            | Da        | Visoka      | Cloud, višekorisnički    |

> **Savjet:** Odabir pravog transporta utječe na performanse, skalabilnost i korisničko iskustvo. **Streamable HTTP** je preporučen za moderne, skalabilne i cloud-spremne aplikacije.

Obratite pažnju na transportne mehanizme stdio i SSE prikazane u prethodnim poglavljima, kao i na streamable HTTP koji je pokriven u ovom poglavlju.

## Streaming: Koncepti i motivacija

Razumijevanje osnovnih pojmova i motivacije iza streaminga ključno je za implementaciju učinkovitih komunikacijskih sustava u stvarnom vremenu.

**Streaming** je tehnika u mrežnom programiranju koja omogućuje slanje i primanje podataka u malim, upravljivim dijelovima ili kao niz događaja, umjesto čekanja da cijeli odgovor bude spreman. Ovo je posebno korisno za:

- Velike datoteke ili skupove podataka.
- Ažuriranja u stvarnom vremenu (npr. chat, trake napretka).
- Dugotrajne izračune gdje želite korisnika obavještavati.

Evo što trebate znati o streamingu na visokoj razini:

- Podaci se isporučuju postupno, ne odjednom.
- Klijent može obrađivati podatke kako stignu.
- Smanjuje percipirani kašnjenje i poboljšava korisničko iskustvo.

### Zašto koristiti streaming?

Razlozi za korištenje streaminga su sljedeći:

- Korisnici odmah dobivaju povratnu informaciju, ne samo na kraju
- Omogućuje aplikacije u stvarnom vremenu i responzivne UI-je
- Efikasnije korištenje mrežnih i računalnih resursa

### Jednostavan primjer: HTTP streaming server i klijent

Evo jednostavnog primjera kako streaming može biti implementiran:

#### Python

**Server (Python, koristi FastAPI i StreamingResponse):**

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

**Klijent (Python, koristi requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Ovaj primjer prikazuje server koji šalje niz poruka klijentu čim postanu dostupne, umjesto da čeka da sve poruke budu spremne.

**Kako radi:**

- Server isporučuje svaku poruku čim je spremna.
- Klijent prima i ispisuje svaki dio čim stigne.

**Zahtjevi:**

- Server mora koristiti streaming odgovor (npr. `StreamingResponse` u FastAPI).
- Klijent mora obrađivati odgovor kao tok (`stream=True` u requests).
- Content-Type je obično `text/event-stream` ili `application/octet-stream`.

#### Java

**Server (Java, koristi Spring Boot i Server-Sent Events):**

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

**Klijent (Java, koristi Spring WebFlux WebClient):**

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

**Napomene o implementaciji u Javi:**

- Koristi reaktivni stack Spring Boot-a s `Flux` za streaming
- `ServerSentEvent` pruža strukturirano streamanje događaja s tipovima događaja
- `WebClient` s `bodyToFlux()` omogućava reaktivno konzumiranje streama
- `delayElements()` simulira vrijeme obrade između događaja
- Događaji mogu imati tipove (`info`, `result`) za bolju obradu na klijent strani

### Usporedba: Klasični streaming vs MCP streaming

Razlike između klasičnog načina rada streaminga i MCP streaminga mogu se prikazati ovako:

| Značajka               | Klasični HTTP streaming         | MCP streaming (Obavijesti)     |
|-----------------------|--------------------------------|-------------------------------|
| Glavni odgovor         | Podijeljen u dijelove           | Jedinstven, na kraju           |
| Ažuriranja napretka    | Poslani kao dijelovi podataka   | Poslani kao obavijesti         |
| Zahtjevi klijenta      | Mora obrađivati tok             | Mora implementirati handler poruka |
| Primjena               | Velike datoteke, tokovi AI tokena | Napredak, zapisi, povratne informacije u stvarnom vremenu |

### Ključne uočene razlike

Također, evo nekoliko ključnih razlika:

- **Obrasci komunikacije:**
  - Klasični HTTP streaming: koristi jednostavan chunked transfer encoding za slanje dijelova podataka
  - MCP streaming: koristi strukturirani sustav obavijesti s JSON-RPC protokolom

- **Format poruke:**
  - Klasični HTTP: Tekstualni dijelovi s novim redovima
  - MCP: Strukturirani LoggingMessageNotification objekti s metapodacima

- **Implementacija klijenta:**
  - Klasični HTTP: Jednostavan klijent koji obrađuje streaming odgovore
  - MCP: Napredniji klijent s handlerom poruka za obradu različitih tipova poruka

- **Ažuriranja napretka:**
  - Klasični HTTP: Napredak je dio glavnog toka odgovora
  - MCP: Napredak se šalje putem zasebnih obavijesti dok glavni odgovor dolazi na kraju

### Preporuke

Preporučujemo sljedeće kod izbora između implementacije klasičnog streaminga (kao krajnja točka prikazana gore koristeći `/stream`) ili streaminga preko MCP-a.

- **Za jednostavne potrebe streaminga:** Klasični HTTP streaming je jednostavniji za implementaciju i dovoljan za osnovne potrebe streaminga.

- **Za složene, interaktivne aplikacije:** MCP streaming pruža strukturiraniji pristup s bogatijim metapodacima i razlikovanjem između obavijesti i konačnih rezultata.

- **Za AI aplikacije:** MCP-ov sustav obavijesti osobito je koristan za dugotrajne AI zadatke gdje želite korisnike obavještavati o napretku.

## Streaming u MCP-u

Dakle, već ste vidjeli neke preporuke i usporedbe dosad o razlikama između klasičnog streaminga i streaminga u MCP-u. Idemo sada detaljno vidjeti kako točno možete iskoristiti streaming u MCP-u.

Razumijevanje kako streaming funkcionira unutar MCP okvira ključno je za izgradnju responzivnih aplikacija koje korisnicima pružaju povratne informacije u stvarnom vremenu tijekom dugotrajnih operacija.

U MCP-u, streaming nije o slanju glavnog odgovora u dijelovima, već o slanju **obavijesti** klijentu dok alat obrađuje zahtjev. Te obavijesti mogu sadržavati ažuriranja napretka, zapise ili druge događaje.

### Kako to radi

Glavni rezultat se i dalje šalje kao jedinstveni odgovor. Međutim, obavijesti se mogu slati kao zasebne poruke tijekom obrade i na taj način ažurirati klijenta u stvarnom vremenu. Klijent mora moći obraditi i prikazati te obavijesti.

## Što je obavijest?

Rekli smo "obavijest", što to znači u kontekstu MCP-a?

Obavijest je poruka koja se šalje sa servera klijentu da informira o napretku, statusu ili drugim događajima tijekom dugotrajne operacije. Obavijesti poboljšavaju transparentnost i korisničko iskustvo.

Na primjer, klijent bi trebao poslati obavijest čim je uspostavljen početni handshake sa serverom.

Obavijest izgleda ovako kao JSON poruka:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Obavijesti pripadaju temi u MCP-u nazvanoj ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Obavijest o zastarjelosti:** MCP specifikacija release kandidata `2026-07-28` označava Logging primitiv kao zastario u korist `stderr` za stdio prijenose i OpenTelemetry za strukturiranu promatranost. Logging i dalje funkcionira u `2025-11-25` i barem godinu dana nakon bilo kakve formalne zastarjelosti. Pogledajte [Što se mijenja u MCP-u: Release kandidat 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Da bi logging radio, server ga mora omogućiti kao značajku/mogućnost na sljedeći način:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Ovisno o korištenom SDK-u, logging može biti omogućen prema zadanim postavkama, ili ga možda morate eksplicitno omogućiti u konfiguraciji servera.

Postoje različite vrste obavijesti:

| Razina     | Opis                          | Primjer uporabe               |
|-----------|-------------------------------|------------------------------|
| debug     | Detaljne informacije za otklanjanje pogrešaka | Ulaz/izlaz funkcije          |
| info      | Opšte informacijske poruke     | Ažuriranja napretka operacije|
| notice    | Normalni ali značajni događaji | Promjene konfiguracije       |
| warning   | Upozoravajuće situacije        | Korištenje zastarjele značajke|
| error     | Pogreške                      | Neuspjesi operacije           |
| critical  | Kritične situacije            | Kvarovi komponenti sustava   |
| alert     | Mora se odmah poduzeti radnja | Otkrivena korupcija podataka |
| emergency | Sustav neupotrebljiv          | Potpuni pad sustava          |

## Implementacija obavijesti u MCP-u

Za implementaciju obavijesti u MCP-u, potrebno je postaviti i server i klijenta za rukovanje ažuriranjima u stvarnom vremenu. To omogućuje vašoj aplikaciji da pruži trenutne povratne informacije korisnicima tijekom dugotrajnih operacija.

### Sa serverske strane: slanje obavijesti

Počnimo sa serverskom stranom. U MCP-u definirate alate koji mogu slati obavijesti tijekom obrade zahtjeva. Server koristi kontekst objekt (obično `ctx`) za slanje poruka klijentu.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

U prethodnom primjeru, alat `process_files` šalje tri obavijesti klijentu dok obrađuje svaku datoteku. Metoda `ctx.info()` se koristi za slanje informativnih poruka.

Dodatno, za omogućavanje obavijesti, osigurajte da vaš server koristi streaming transport (poput `streamable-http`) i da klijent implementira handler poruka za obradu obavijesti. Evo kako možete postaviti server da koristi `streamable-http` transport:

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

U ovom .NET primjeru, alat `ProcessFiles` je označen atributom `Tool` i šalje tri obavijesti klijentu dok obrađuje svaku datoteku. Metoda `ctx.Info()` se koristi za slanje informativnih poruka.

Za omogućavanje obavijesti u vašem .NET MCP serveru, osigurajte da koristite streaming transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Sa klijentske strane: primanje obavijesti

Klijent mora implementirati handler poruka za obradu i prikaz obavijesti čim stignu.

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

U prethodnom kodu, funkcija `message_handler` provjerava je li dolazna poruka obavijest. Ako jest, ispisuje obavijest; inače je obrađuje kao običnu serversku poruku. Također, primijetite kako se `ClientSession` inicijalizira s `message_handler` za rukovanje dolaznim obavijestima.

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

U ovom .NET primjeru, funkcija `MessageHandler` provjerava je li dolazna poruka obavijest. Ako jest, ispisuje obavijest; inače je obrađuje kao običnu serversku poruku. `ClientSession` se inicijalizira s handlerom poruka putem `ClientSessionOptions`.

Za omogućavanje obavijesti, osigurajte da vaš server koristi streaming transport (poput `streamable-http`) i da vaš klijent implementira handler poruka za obradu obavijesti.

## Obavijesti o napretku i scenariji

Ovaj odjeljak objašnjava koncept obavijesti o napretku u MCP-u, zašto su važni i kako ih implementirati koristeći Streamable HTTP. Također ćete pronaći praktični zadatak za učvršćivanje razumijevanja.

Obavijesti o napretku su poruke u stvarnom vremenu koje server šalje klijentu tijekom dugotrajnih operacija. Umjesto da se čeka da cijeli proces završi, server stalno ažurira klijenta o trenutnom statusu. To poboljšava transparentnost, korisničko iskustvo i olakšava otklanjanje pogrešaka.

**Primjer:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Zašto koristiti obavijesti o napretku?

Obavijesti o napretku su važne iz nekoliko razloga:

- **Bolje korisničko iskustvo:** Korisnici vide ažuriranja tijekom rada, ne samo na kraju.
- **Povratna informacija u stvarnom vremenu:** Klijenti mogu prikazivati trake napretka ili zapise, što aplikaciju čini responzivnom.
- **Lakše otklanjanje pogrešaka i praćenje:** Programeri i korisnici mogu vidjeti gdje proces potencijalno kasni ili zapinje.

### Kako implementirati obavijesti o napretku

Evo kako možete implementirati obavijesti o napretku u MCP-u:

- **Na serveru:** Koristite `ctx.info()` ili `ctx.log()` za slanje obavijesti kako se svaki predmet obrađuje. To šalje poruku klijentu prije nego što je glavni rezultat spreman.
- **Na klijentu:** Implementirajte handler poruka koji sluša i prikazuje obavijesti čim stignu. Ovaj handler razlikuje obavijesti od konačnog rezultata.

**Primjer servera:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Primjer klijenta:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Sigurnosne napomene

Kada implementirate MCP poslužitelje s HTTP-baziranim transportima, sigurnost postaje ključna briga koja zahtijeva pažnju prema različitim vektorima napada i mehanizmima zaštite.

### Pregled

Sigurnost je kritična pri izlaganju MCP poslužitelja preko HTTP-a. Streamable HTTP uvodi nove površine za napad i zahtijeva pažljivo podešavanje.

### Ključne točke

- **Provjera zaglavlja Origin**: Uvijek provjerite zaglavlje `Origin` kako biste spriječili DNS rebinding napade.
- **Vezanje na localhost**: Za lokalni razvoj povežite poslužitelje na `localhost` kako ne biste izlagali mrežu javnom internetu.
- **Autentikacija**: Implementirajte autentikaciju (npr. API ključeve, OAuth) za produkcijska okruženja.
- **CORS**: Postavite politike Cross-Origin Resource Sharing (CORS) da ograničite pristup.
- **HTTPS**: Koristite HTTPS u produkciji za šifriranje prometa.

### Najbolje prakse

- Nikada ne vjerujte dolaznim zahtjevima bez provjere.
- Zabilježite i pratite sve pristupe i greške.
- Redovito ažurirajte ovisnosti kako biste zakrpali sigurnosne propuste.

### Izazovi

- Uravnotežiti sigurnost i jednostavnost razvoja
- Osigurati kompatibilnost s raznim klijentskim okruženjima

## Nadogradnja sa SSE na Streamable HTTP

Za aplikacije koje trenutno koriste Server-Sent Events (SSE), prelazak na Streamable HTTP pruža poboljšane mogućnosti i bolju dugoročnu održivost vaših MCP implementacija.

### Zašto nadograditi?

Postoje dva uvjerljiva razloga za nadogradnju sa SSE na Streamable HTTP:

- Streamable HTTP nudi bolju skalabilnost, kompatibilnost i bogatiju podršku za obavijesti nego SSE.
- Preporučeni je transport za nove MCP aplikacije.

### Koraci migracije

Evo kako možete migrirati sa SSE na Streamable HTTP u svojim MCP aplikacijama:

- **Ažurirajte kod poslužitelja** za korištenje `transport="streamable-http"` u `mcp.run()`.
- **Ažurirajte klijentski kod** da koristi `streamablehttp_client` umjesto SSE klijenta.
- **Implementirajte rukovatelja poruka** u klijentu za obradu obavijesti.
- **Testirajte kompatibilnost** s postojećim alatima i tokovima rada.

### Održavanje kompatibilnosti

Preporuča se održavati kompatibilnost s postojećim SSE klijentima tijekom procesa migracije. Evo nekoliko strategija:

- Možete podržavati i SSE i Streamable HTTP pokretanjem oba transporta na različitim krajnjim točkama.
- Postupno migrirajte klijente na novi transport.

### Izazovi

Osigurajte da riješite sljedeće izazove tijekom migracije:

- Da su svi klijenti ažurirani
- Rukovanje razlikama u isporuci obavijesti

## Sigurnosne napomene

Sigurnost bi trebala biti glavni prioritet pri implementaciji bilo kojeg poslužitelja, posebno kod korištenja HTTP-baziranih transporta poput Streamable HTTP u MCP-u.

Kada implementirate MCP poslužitelje s HTTP-baziranim transportima, sigurnost postaje ključna briga koja zahtijeva pažnju prema različitim vektorima napada i mehanizmima zaštite.

### Pregled

Sigurnost je kritična pri izlaganju MCP poslužitelja preko HTTP-a. Streamable HTTP uvodi nove površine za napad i zahtijeva pažljivo podešavanje.

Evo nekoliko ključnih sigurnosnih razmatranja:

- **Provjera zaglavlja Origin**: Uvijek provjerite zaglavlje `Origin` kako biste spriječili DNS rebinding napade.
- **Vezanje na localhost**: Za lokalni razvoj povežite poslužitelje na `localhost` kako ne biste izlagali mrežu javnom internetu.
- **Autentikacija**: Implementirajte autentikaciju (npr. API ključeve, OAuth) za produkcijska okruženja.
- **CORS**: Postavite politike Cross-Origin Resource Sharing (CORS) da ograničite pristup.
- **HTTPS**: Koristite HTTPS u produkciji za šifriranje prometa.

### Najbolje prakse

Također, evo nekoliko najboljih praksi za implementaciju sigurnosti u vašem MCP streaming poslužitelju:

- Nikada ne vjerujte dolaznim zahtjevima bez provjere.
- Zabilježite i pratite sve pristupe i greške.
- Redovito ažurirajte ovisnosti kako biste zakrpali sigurnosne propuste.

### Izazovi

Susrest ćete se s nekim izazovima pri implementaciji sigurnosti u MCP streaming poslužiteljima:

- Uravnotežiti sigurnost i jednostavnost razvoja
- Osigurati kompatibilnost s raznim klijentskim okruženjima

### Zadavanje: Izradite vlastitu streaming MCP aplikaciju

**Scenarij:**
Izradite MCP poslužitelj i klijenta gdje poslužitelj obrađuje popis stavki (npr. datoteka ili dokumenata) i šalje obavijest za svaku obrađenu stavku. Klijent treba prikazivati svaku obavijest čim stigne.

**Koraci:**

1. Implementirajte alat poslužitelja koji obrađuje popis i šalje obavijesti za svaku stavku.
2. Implementirajte klijenta s rukovateljem poruka za prikaz obavijesti u stvarnom vremenu.
3. Testirajte implementaciju pokretanjem poslužitelja i klijenta i pratite obavijesti.

[Rješenje](./solution/README.md)

## Daljnje čitanje i što dalje?

Za nastavak vašeg puta s MCP streamingom i proširenje znanja, ovaj odjeljak pruža dodatne resurse i prijedloge za izgradnju složenijih aplikacija.

### Daljnje čitanje

- [Microsoft: Uvod u HTTP streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS u ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Što dalje?

- Pokušajte izraditi naprednije MCP alate koji koriste streaming za analitiku u stvarnom vremenu, chat ili zajedničko uređivanje.
- Istražite integraciju MCP streaminga s frontend frameworkima (React, Vue, itd.) za ažuriranja korisničkog sučelja uživo.
- Sljedeće: [Korištenje AI Toolkit za VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->