# HTTPS Streaming s Model Context Protocolom (MCP)

Ovo poglavlje pruža sveobuhvatan vodič za implementaciju sigurnog, skalabilnog i streaminga u stvarnom vremenu s Model Context Protocolom (MCP) koristeći HTTPS. Obuhvaća motivaciju za streaming, dostupne transportne mehanizme, kako implementirati streamable HTTP u MCP-u, najbolje sigurnosne prakse, migraciju sa SSE-a te praktične smjernice za izgradnju vlastitih streaming MCP aplikacija.

> **Gledajući unaprijed:** ova lekcija opisuje Streamable HTTP prema **MCP specifikaciji 2025-11-25**, gdje se sesija uspostavlja tijekom `initialize` i fiksira s `Mcp-Session-Id` headerom. Release kandidat `2026-07-28` u potpunosti uklanja handshake i ID sesije, čineći svaki zahtjev samostalnim i usmjerenim na bilo koji server bez sticky sesija. Detalje pogledajte u [Što se mijenja u MCP-u: Release kandidat 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Transportni mehanizmi i streaming u MCP-u

Ovaj odjeljak istražuje različite dostupne transportne mehanizme u MCP-u i njihovu ulogu u omogućavanju streaming sposobnosti za komunikaciju u stvarnom vremenu između klijenata i servera.

### Što je transportni mehanizam?

Transportni mehanizam definira kako se podaci razmjenjuju između klijenta i servera. MCP podržava više tipova transporta prilagođenih različitim okruženjima i zahtjevima:

- **stdio**: Standardni ulaz/izlaz, prikladan za lokalne i CLI alate. Jednostavan, ali nije pogodan za web ili cloud.
- **SSE (Server-Sent Events)**: Omogućava serverima da šalju ažuriranja u stvarnom vremenu klijentima preko HTTP-a. Dobar za web UI, ali ograničen u skalabilnosti i fleksibilnosti. Od MCP specifikacije 2025-06-18 samostalni SSE transport je zastario i zamijenjen "Streamable HTTP" transportom.
- **Streamable HTTP**: Moderan streaming preko HTTP-a, podržava notifikacije i bolju skalabilnost. Preporuča se za većinu produkcijskih i cloud scenarija.

### Tablica usporedbe

Pogledajte tablicu ispod da biste razumjeli razlike između ovih transportnih mehanizama:

| Transport         | Ažuriranja u stvarnom vremenu | Streaming | Skalabilnost | Namjena                |
|-------------------|------------------------------|-----------|-------------|------------------------|
| stdio             | Ne                           | Ne        | Niska       | Lokalni CLI alati       |
| SSE               | Da                           | Da        | Srednja     | Web, ažuriranja u stvarnom vremenu |
| Streamable HTTP    | Da                           | Da        | Visoka      | Cloud, višekorisnički  |

> **Savjet:** Izbor pravog transporta utječe na performanse, skalabilnost i korisničko iskustvo. **Streamable HTTP** se preporučuje za moderne, skalabilne i cloud-ready aplikacije.

Imajte na umu transportne stdio i SSE koje ste vidjeli u prethodnim poglavljima i kako je streamable HTTP transport obrađen u ovom poglavlju.

## Streaming: Koncepti i motivacija

Razumijevanje osnovnih koncepata i motivacija iza streaminga ključno je za implementaciju učinkovitih sustava komunikacije u stvarnom vremenu.

**Streaming** je tehnika u mrežnom programiranju koja omogućava slanje i primanje podataka u malim, upravljivim dijelovima ili kao redoslijed događaja, umjesto čekanja da se cijeli odgovor pripremi. Ovo je naročito korisno za:

- Velike datoteke ili skupove podataka.
- Ažuriranja u stvarnom vremenu (npr. chat, trake napretka).
- Dugotrajne izračune gdje želite obavještavati korisnika.

Evo što trebate znati o streamingu na visokoj razini:

- Podaci se isporučuju progresivno, ne odjednom.
- Klijent može obrađivati podatke kako stižu.
- Smanjuje percipiranu latenciju i poboljšava korisničko iskustvo.

### Zašto koristiti streaming?

Razlozi za korištenje streaminga su sljedeći:

- Korisnici dobiju povratnu informaciju odmah, ne samo na kraju.
- Omogućava aplikacije u stvarnom vremenu i responzivne UI-je.
- Efikasnije korištenje mrežnih i računalnih resursa.

### Jednostavan primjer: HTTP Streaming Server i Klijent

Evo jednostavnog primjera kako se streaming može implementirati:

#### Python

**Server (Python, koristeći FastAPI i StreamingResponse):**

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

**Klijent (Python, koristeći requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Ovaj primjer demonstrira server koji šalje niz poruka klijentu kako postaju dostupne, umjesto da čeka da sve poruke budu spremne.

**Kako radi:**

- Server šalje svaku poruku čim je spremna.
- Klijent prima i ispisuje svaki dio čim stigne.

**Zahtjevi:**

- Server mora koristiti streaming odgovor (npr. `StreamingResponse` u FastAPI).
- Klijent mora obraditi odgovor kao streaming (`stream=True` u requests).
- Content-Type obično je `text/event-stream` ili `application/octet-stream`.

#### Java

**Server (Java, koristeći Spring Boot i Server-Sent Events):**

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

**Klijent (Java, koristeći Spring WebFlux WebClient):**

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

- Koristi Spring Boot reaktivni stack s `Flux` za streaming
- `ServerSentEvent` osigurava strukturirani streaming događaja s tipovima događaja
- `WebClient` s `bodyToFlux()` omogućava reaktivno konzumiranje streama
- `delayElements()` simulira vremensko kašnjenje između događaja
- Događaji mogu imati tipove (`info`, `result`) radi bolje obrade na klijentu

### Usporedba: Klasični streaming vs MCP streaming

Razlike u načinu rada streaminga u klasičnom smislu i u MCP-u mogu se prikazati ovako:

| Značajka               | Klasični HTTP Streaming       | MCP Streaming (Notifikacije)     |
|------------------------|-------------------------------|----------------------------------|
| Glavni odgovor         | Podijeljen na dijelove         | Jedan, na kraju                  |
| Ažuriranja napretka    | Šalju se kao podaci dijelovi   | Šalju se kao notifikacije        |
| Zahtjevi klijenta      | Mora obraditi stream           | Mora implementirati handler poruka|
| Namjena                | Velike datoteke, AI tokovi      | Napredak, logovi, povratne informacije u stvarnom vremenu |

### Ključne razlike

Dodatno, evo nekoliko ključnih razlika:

- **Obrazac komunikacije:**
  - Klasični HTTP streaming: Koristi jednostavni chunked transfer encoding da šalje podatke u dijelovima
  - MCP streaming: Koristi strukturirani sustav notifikacija s JSON-RPC protokolom

- **Format poruke:**
  - Klasični HTTP: Obični tekstualni dijelovi s novim linijama
  - MCP: Strukturirani LoggingMessageNotification objekti s metapodacima

- **Implementacija klijenta:**
  - Klasični HTTP: Jednostavan klijent koji obrađuje streaming odgovore
  - MCP: Složeniji klijent s message handlerom za obradu različitih tipova poruka

- **Ažuriranja napretka:**
  - Klasični HTTP: Napredak je dio glavnog streama odgovora
  - MCP: Napredak se šalje putem zasebnih notifikacijskih poruka dok glavni odgovor dolazi na kraju

### Preporuke

Evo nekih preporuka glede izbora između klasičnog streaminga (kao endpoint prikazan gore `/stream`) i streaminga preko MCP-a.

- **Za jednostavne potrebe streaminga:** Klasični HTTP streaming je jednostavniji za implementaciju i dovoljan za osnovne potrebe.

- **Za složene, interaktivne aplikacije:** MCP streaming pruža strukturiraniji pristup s bogatijim metapodacima i razlikovanjem između notifikacija i konačnih rezultata.

- **Za AI aplikacije:** MCP-ov sustav notifikacija osobito je koristan za dugotrajne AI zadatke gdje želite informirati korisnike o napretku.

## Streaming u MCP-u

Dakle, vidjeli ste neke preporuke i usporedbe o razlikama između klasičnog streaminga i MCP streaminga. Sada ćemo detaljno objasniti kako točno možete iskoristiti streaming u MCP-u.

Razumijevanje kako streaming funkcionira unutar MCP okvira ključno je za izgradnju responzivnih aplikacija koje pružaju povratnu informaciju u stvarnom vremenu tijekom dugotrajnih operacija.

U MCP-u streaming nije slanje glavnog odgovora u dijelovima, već slanje **notifikacija** klijentu dok alat obrađuje zahtjev. Te notifikacije mogu uključivati ažuriranja napretka, zapise ili druge događaje.

### Kako funkcionira

Glavni rezultat se i dalje šalje kao jedinstven odgovor. Međutim, notifikacije se mogu slati kao zasebne poruke tijekom obrade i na taj način ažurirati klijenta u stvarnom vremenu. Klijent mora moći obraditi i prikazati te notifikacije.

## Što je notifikacija?

Spomenuli smo "notifikaciju", što to znači u kontekstu MCP-a?

Notifikacija je poruka poslana sa servera klijentu kako bi ga obavijestila o napretku, statusu ili drugim događajima tijekom dugotrajne operacije. Notifikacije poboljšavaju transparentnost i korisničko iskustvo.

Na primjer, klijent bi trebao poslati notifikaciju čim se inicialni handshake sa serverom izvrši.

Notifikacija izgleda ovako kao JSON poruka:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifikacije pripadaju temi u MCP-u nazvanoj ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Da bi logging radio, server ga treba omogućiti kao značajku/sposobnost ovako:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Ovisno o korištenom SDK-u, logging može biti omogućen po defaultu ili ćete ga možda morati eksplicitno uključiti u konfiguraciji servera.

Postoje različite vrste notifikacija:

| Razina    | Opis                          | Primjer upotrebe               |
|-----------|-------------------------------|--------------------------------|
| debug     | Detaljne informacije za debug | Ulaz/izlaz funkcije            |
| info      | Opće informativne poruke       | Ažuriranja napretka operacije  |
| notice    | Normalni, ali značajni događaji | Promjene konfiguracije          |
| warning   | Upozoravajuće situacije        | Korištenje zastarjele značajke |
| error     | Pogreške                      | Neuspjesi operacija            |
| critical  | Kritične situacije            | Kvarovi sistemskih komponenti  |
| alert     | Hitna akcija potrebna          | Otkrivena korupcija podataka   |
| emergency | Sustav neupotrebljiv           | Potpuni kvar sustava           |

## Implementacija notifikacija u MCP-u

Za implementaciju notifikacija u MCP-u potrebno je konfigurirati i serversku i klijentsku stranu za obradu ažuriranja u stvarnom vremenu. To omogućuje aplikaciji da pruži trenutnu povratnu informaciju korisnicima tijekom dugotrajnih radnji.

### Serverska strana: Slanje notifikacija

Počnimo sa serverskom stranom. U MCP-u definirate alate koji mogu slati notifikacije tijekom obrade zahtjeva. Server koristi kontekst objekt (obično `ctx`) za slanje poruka klijentu.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

U prethodnom primjeru, alat `process_files` šalje tri notifikacije klijentu dok obrađuje svaku datoteku. Metoda `ctx.info()` koristi se za slanje informativnih poruka.

Osim toga, da biste omogućili notifikacije, osigurajte da server koristi streaming transport (kao što je `streamable-http`) i da vaš klijent implementira message handler za obradu notifikacija. Evo kako postaviti server da koristi `streamable-http` transport:

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

U ovom .NET primjeru, alat `ProcessFiles` označen je atributom `Tool` i šalje tri notifikacije klijentu tijekom obrade svake datoteke. Metoda `ctx.Info()` koristi se za slanje informativnih poruka.

Da biste omogućili notifikacije u vašem MCP .NET serveru, osigurajte da koristite streaming transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Klijentska strana: Primanje notifikacija

Klijent mora implementirati message handler kako bi obrađivao i prikazivao notifikacije čim stignu.

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

U prethodnom kodu, funkcija `message_handler` provjerava je li pristigla poruka notifikacija. Ako jest, ispisuje notifikaciju; inače, obrađuje je kao običnu server poruku. Također primijetite kako je `ClientSession` inicijaliziran s `message_handler` za obradu pristiglih notifikacija.

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

U ovom .NET primjeru, funkcija `MessageHandler` provjerava je li pristigla poruka notifikacija. Ako jest, ispisuje je; inače je obrađuje kao uobičajenu poruku servera. `ClientSession` je inicijaliziran s message handlerom putem `ClientSessionOptions`.

Da biste omogućili notifikacije, osigurajte da vaš server koristi streaming transport (npr. `streamable-http`) i da klijent implementira message handler za obradu notifikacija.

## Notifikacije napretka & scenariji

Ovaj dio objašnjava koncept notifikacija napretka u MCP-u, zašto su važni te kako ih implementirati koristeći Streamable HTTP. Također ćete pronaći praktični zadatak za učvršćivanje znanja.

Notifikacije napretka su poruke u stvarnom vremenu koje server šalje klijentu tijekom dugotrajnih operacija. Umjesto da se čeka dovršetak cijelog procesa, server stalno ažurira klijenta o trenutnom statusu. To poboljšava transparentnost, korisničko iskustvo i olakšava debugiranje.

**Primjer:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Zašto koristiti notifikacije napretka?

Notifikacije napretka su bitne iz nekoliko razloga:

- **Bolje korisničko iskustvo:** Korisnici vide ažuriranja dok rad napreduje, ne samo na kraju.
- **Povratna informacija u stvarnom vremenu:** Klijenti mogu prikazivati trake napretka ili logove, čineći aplikaciju responzivnijom.
- **Lakše debugiranje i monitoring:** Programeri i korisnici mogu vidjeti gdje proces može biti usporen ili zaglavljen.

### Kako implementirati notifikacije napretka

Evo kako implementirati notifikacije napretka u MCP-u:

- **Na serveru:** Koristite `ctx.info()` ili `ctx.log()` za slanje notifikacija dok se svaka stavka obrađuje. Time se poruka šalje klijentu prije nego što glavni rezultat bude spreman.
- **Na klijentu:** Implementirajte message handler koji sluša i prikazuje notifikacije čim stignu. Taj handler razlikuje notifikacije od konačnog rezultata.

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

Prilikom implementacije MCP servera s HTTP baziranim transportima, sigurnost postaje iznimno važna i zahtijeva pažljivu pozornost na brojne vektore napada i zaštitne mehanizme.

### Pregled

Sigurnost je kritična pri izlaganju MCP servera preko HTTP-a. Streamable HTTP uvodi nove površine za napad i zahtijeva pažljivu konfiguraciju.

### Ključne točke


- **Validacija Origin zaglavlja**: Uvijek validirajte `Origin` zaglavlje kako biste spriječili DNS rebinding napade.
- **Povezivanje na localhost**: Za lokalni razvoj, povežite server na `localhost` kako biste spriječili izlaganje prema javnom internetu.
- **Autentifikacija**: Implementirajte autentifikaciju (npr. API ključeve, OAuth) za produkcijska okruženja.
- **CORS**: Konfigurirajte politike Cross-Origin Resource Sharing (CORS) da ograničite pristup.
- **HTTPS**: Koristite HTTPS u produkciji za enkripciju prometa.

### Najbolje prakse

- Nikada ne vjerujte dolaznim zahtjevima bez validacije.
- Logirajte i nadzirite sav pristup i greške.
- Redovito ažurirajte ovisnosti kako biste zakrpali sigurnosne ranjivosti.

### Izazovi

- Uravnoteženje sigurnosti s lakoćom razvoja
- Osiguravanje kompatibilnosti s različitim klijentskim okruženjima

## Nadogradnja sa SSE na Streamable HTTP

Za aplikacije koje trenutno koriste Server-Sent Events (SSE), migracija na Streamable HTTP pruža poboljšane mogućnosti i bolju dugoročnu održivost za vaše MCP implementacije.

### Zašto nadograditi?

Postoje dva uvjerljiva razloga za nadogradnju sa SSE na Streamable HTTP:

- Streamable HTTP nudi bolju skalabilnost, kompatibilnost i bogatiju podršku za obavijesti u odnosu na SSE.
- To je preporučeni transport za nove MCP aplikacije.

### Koraci migracije

Evo kako možete migrirati sa SSE na Streamable HTTP u vašim MCP aplikacijama:

- **Ažurirajte kod servera** da koristite `transport="streamable-http"` u `mcp.run()`.
- **Ažurirajte kod klijenta** da koristite `streamablehttp_client` umjesto SSE klijenta.
- **Implementirajte handler poruka** u klijentu za obradu obavijesti.
- **Testirajte kompatibilnost** s postojećim alatima i radnim tokovima.

### Održavanje kompatibilnosti

Preporučuje se održavati kompatibilnost s postojećim SSE klijentima tijekom procesa migracije. Evo nekoliko strategija:

- Možete podržavati i SSE i Streamable HTTP pokretanjem oba transporta na različitim endpointima.
- Postupno migrirajte klijente na novi transport.

### Izazovi

Osigurajte da riješite sljedeće izazove tijekom migracije:

- Osiguravanje da su svi klijenti ažurirani
- Rukovanje razlikama u dostavi obavijesti

## Sigurnosne napomene

Sigurnost bi trebala biti glavni prioritet prilikom implementacije bilo kojeg servera, posebno kada koristite HTTP-bazirane transporte poput Streamable HTTP u MCP-u.

Kod implementacije MCP servera s HTTP-baziranim transportima, sigurnost postaje ključno pitanje koje zahtijeva pažljivu pozornost na različite napade i mehanizme zaštite.

### Pregled

Sigurnost je kritična prilikom izlaganja MCP servera putem HTTP-a. Streamable HTTP uvodi nove površine napada i zahtijeva pažljivu konfiguraciju.

Evo nekoliko ključnih sigurnosnih napomena:

- **Validacija Origin zaglavlja**: Uvijek validirajte `Origin` zaglavlje kako biste spriječili DNS rebinding napade.
- **Povezivanje na localhost**: Za lokalni razvoj, povežite server na `localhost` kako biste spriječili izlaganje prema javnom internetu.
- **Autentifikacija**: Implementirajte autentifikaciju (npr. API ključeve, OAuth) za produkcijska okruženja.
- **CORS**: Konfigurirajte politike Cross-Origin Resource Sharing (CORS) da ograničite pristup.
- **HTTPS**: Koristite HTTPS u produkciji za enkripciju prometa.

### Najbolje prakse

Također, evo nekoliko najboljih praksi koje treba slijediti kod implementacije sigurnosti u vašem MCP streaming serveru:

- Nikada ne vjerujte dolaznim zahtjevima bez validacije.
- Logirajte i nadzirite sav pristup i greške.
- Redovito ažurirajte ovisnosti kako biste zakrpali sigurnosne ranjivosti.

### Izazovi

Susrest ćete se s nekim izazovima prilikom implementacije sigurnosti u MCP streaming serverima:

- Uravnoteženje sigurnosti s lakoćom razvoja
- Osiguravanje kompatibilnosti s različitim klijentskim okruženjima

### Zadatak: Izgradite vlastitu streaming MCP aplikaciju

**Scenarij:**
Izgradite MCP server i klijenta gdje server obrađuje popis stavki (npr. fajlova ili dokumenata) i šalje obavijest za svaku obrađenu stavku. Klijent bi trebao prikazivati svaku obavijest čim stigne.

**Koraci:**

1. Implementirajte server alat koji obrađuje popis i šalje obavijesti za svaku stavku.
2. Implementirajte klijenta s handlerom poruka koji prikazuje obavijesti u realnom vremenu.
3. Testirajte implementaciju pokretanjem oba, servera i klijenta, i promatrajte obavijesti.

[Rješenje](./solution/README.md)

## Daljnje čitanje i što dalje?

Da nastavite svoje putovanje s MCP streamingom i proširite svoje znanje, ovaj odjeljak pruža dodatne resurse i predložene sljedeće korake za izradu naprednijih aplikacija.

### Daljnje čitanje

- [Microsoft: Uvod u HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS u ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming zahtjevi](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Što dalje?

- Pokušajte izgraditi naprednije MCP alate koji koriste streaming za analitiku u stvarnom vremenu, chat ili kolaborativno uređivanje.
- Istražite integraciju MCP streaminga s frontend frameworkima (React, Vue itd.) za živa UI ažuriranja.
- Sljedeće: [Korištenje AI Toolkit za VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->