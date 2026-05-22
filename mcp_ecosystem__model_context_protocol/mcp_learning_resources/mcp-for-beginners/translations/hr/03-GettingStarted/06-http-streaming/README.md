# HTTPS Streaming s Model Context Protocol (MCP)

Ovo poglavlje pruža sveobuhvatan vodič za implementaciju sigurnog, skalabilnog i stvarnog vremena streaminga pomoću Model Context Protocol (MCP) koristeći HTTPS. Obuhvaća motivaciju za streaming, dostupne transportne mehanizme, kako implementirati streamable HTTP u MCP-u, najbolje sigurnosne prakse, migraciju sa SSE-a te praktične smjernice za izgradnju vlastitih streaming MCP aplikacija.

## Transportni Mehanizmi i Streaming u MCP-u

Ovaj odjeljak istražuje različite transportne mehanizme dostupne u MCP-u i njihovu ulogu u omogućavanju streaming mogućnosti za komunikaciju u stvarnom vremenu između klijenata i servera.

### Što je transportni mehanizam?

Transportni mehanizam definira kako se podaci razmjenjuju između klijenta i servera. MCP podržava više tipova transporta kako bi odgovorio različitim okruženjima i zahtjevima:

- **stdio**: Standardni ulaz/izlaz, prikladan za lokalne alate i one bazirane na CLI-u. Jednostavan, ali nije pogodan za web ili cloud.
- **SSE (Server-Sent Events)**: Omogućuje serverima da putem HTTP-a šalju ažuriranja u stvarnom vremenu klijentima. Dobar za web korisnička sučelja, ali ograničen u skalabilnosti i fleksibilnosti. Od MCP specifikacije 2025-06-18, samostalni SSE transport je zastario i zamijenjen je "Streamable HTTP" transportom.
- **Streamable HTTP**: Moderan streaming transport baziran na HTTP-u, podržava obavijesti i bolju skalabilnost. Preporučen za većinu produkcijskih i cloud scenarija.

### Tablica usporedbe

Pogledajte donju tablicu kako biste razumjeli razlike između ovih transportnih mehanizama:

| Transport         | Ažuriranja u stvarnom vremenu | Streaming | Skalabilnost | Primjer upotrebe          |
|-------------------|-------------------------------|-----------|--------------|--------------------------|
| stdio             | Ne                            | Ne        | Niska        | Lokalni CLI alati         |
| SSE               | Da                            | Da        | Srednja      | Web, ažuriranja u realnom vremenu |
| Streamable HTTP   | Da                            | Da        | Visoka       | Cloud, više klijenata    |

> **Savjet:** Izbor pravog transporta utječe na performanse, skalabilnost i korisničko iskustvo. **Streamable HTTP** je preporučen za moderne, skalabilne i cloud-spremne aplikacije.

Primijetite transportne mehanizme stdio i SSE koje ste vidjeli u prethodnim poglavljima i kako je streamable HTTP transport obrađen u ovom poglavlju.

## Streaming: Koncepti i Motivacija

Razumijevanje temeljnjih koncepata i motivacija iza streaminga ključno je za implementaciju učinkovitih komunikacijskih sustava u stvarnom vremenu.

**Streaming** je tehnika u mrežnom programiranju koja omogućuje slanje i primanje podataka u malim, upravljivim dijelovima ili kao niz događaja, umjesto čekanja da čitav odgovor bude spreman. Ovo je posebno korisno za:

- Velike datoteke ili skupove podataka.
- Ažuriranja u stvarnom vremenu (npr. chat, trake napretka).
- Dugotrajne izračune gdje želite korisniku pružiti informacije tijekom procesa.

Evo što morate znati o streamingu na visokoj razini:

- Podaci se isporučuju postupno, ne odjednom.
- Klijent može obrađivati podatke čim stignu.
- Smanjuje se percipirana latencija i poboljšava korisničko iskustvo.

### Zašto koristiti streaming?

Razlozi za korištenje streaminga su sljedeći:

- Korisnici dobivaju povratnu informaciju odmah, ne samo na kraju
- Omogućuje aplikacije u stvarnom vremenu i responzivna sučelja
- Učinkovitije korištenje mrežnih i računalnih resursa

### Jednostavan primjer: HTTP streaming server i klijent

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

Ovaj primjer demonstrira server koji šalje seriju poruka klijentu čim postanu dostupne, umjesto čekanja da sve poruke budu spremne.

**Kako radi:**

- Server isporučuje svaku poruku čim je spremna.
- Klijent prima i ispisuje svaki dio čim stigne.

**Zahtjevi:**

- Server mora koristiti streaming response (npr. `StreamingResponse` u FastAPI).
- Klijent mora obrađivati odgovor kao stream (`stream=True` u requests).
- Content-Type je obično `text/event-stream` ili `application/octet-stream`.

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
- `ServerSentEvent` pruža strukturirano streamanje događaja s tipovima događaja
- `WebClient` s `bodyToFlux()` omogućuje reaktivnu konzumaciju streama
- `delayElements()` simulira vrijeme obrade između događaja
- Događaji mogu imati tipove (`info`, `result`) radi bolje obrade na klijentu

### Usporedba: Klasični streaming vs MCP streaming

Razlike između načina rada streaminga "klasičnim" putem i putem MCP-a prikazane su ovako:

| Značajka              | Klasični HTTP streaming         | MCP Streaming (Obavijesti)        |
|-----------------------|---------------------------------|----------------------------------|
| Glavni odgovor        | Po dijelovima                   | Jedan, na kraju                  |
| Ažuriranja napretka   | Slana kao dijelovi podataka     | Slana kao obavijesti             |
| Zahtjevi za klijenta  | Mora obrađivati stream          | Mora implementirati rukovatelja poruka |
| Primjer upotrebe      | Velike datoteke, AI tokovi tokena | Napredak, zapisi, povratne informacije u realnom vremenu |

### Ključne uočene razlike

Uz to, ovdje su neke ključne razlike:

- **Obrazac komunikacije:**
  - Klasični HTTP streaming: Koristi klasični chunked transfer kod za slanje podataka u komadima
  - MCP streaming: Koristi strukturirani sustav obavijesti s JSON-RPC protokolom

- **Format poruka:**
  - Klasični HTTP: Čisti tekstualni dijelovi s novim redovima
  - MCP: Strukturirani LoggingMessageNotification objekti s metapodacima

- **Implementacija klijenta:**
  - Klasični HTTP: Jednostavan klijent koji obrađuje streaming odgovore
  - MCP: Složeniji klijent s rukovateljem poruka za obradu različitih tipova poruka

- **Ažuriranja napretka:**
  - Klasični HTTP: Napredak je dio glavnog streama odgovora
  - MCP: Napredak se šalje putem zasebnih poruka obavijesti dok glavni odgovor dolazi na kraju

### Preporuke

Ima nekoliko stvari koje preporučujemo kod izbora između implementacije klasičnog streaminga (kao krajnju točku prikazanu gore putem `/stream`) naspram streaminga preko MCP-a.

- **Za jednostavne streaming potrebe:** Klasični HTTP streaming je jednostavniji za implementaciju i dovoljan za osnovne potrebe streaminga.

- **Za složenije, interaktivne aplikacije:** MCP streaming pruža strukturiraniji pristup s bogatijim metapodacima i razdvajanjem obavijesti i konačnih rezultata.

- **Za AI aplikacije:** MCP-ov sustav obavijesti posebno je koristan za dugotrajne AI zadatke gdje želite korisnike obavještavati o napretku.

## Streaming u MCP-u

Dakle, vidjeli ste neke preporuke i usporedbe dosad o razlikama između klasičnog streaminga i streaminga u MCP-u. Idemo detaljnije kako točno možete iskoristiti streaming u MCP-u.

Razumijevanje kako streaming funkcionira unutar MCP okvira ključno je za izgradnju responzivnih aplikacija koje pružaju povratne informacije u stvarnom vremenu korisnicima tijekom dugotrajnih operacija.

U MCP-u, streaming se ne odnosi na slanje glavnog odgovora u komadima, već na slanje **obavijesti** klijentu dok alat obrađuje zahtjev. Te obavijesti mogu uključivati ažuriranja napretka, zapise ili druge događaje.

### Kako to radi

Glavni rezultat se i dalje šalje kao jedan odgovor. Međutim, obavijesti se mogu slati kao zasebne poruke tijekom obrade te tako ažurirati klijenta u stvarnom vremenu. Klijent mora moći rukovati i prikazati te obavijesti.

## Što je obavijest?

Rekli smo "Obavijest", što to znači u kontekstu MCP-a?

Obavijest je poruka koju server šalje klijentu kako bi ga informirao o napretku, statusu ili drugim događajima tijekom dugotrajne operacije. Obavijesti poboljšavaju transparentnost i korisničko iskustvo.

Na primjer, klijent treba poslati obavijest kada je početni handshake sa serverom napravljen.

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

Obavijesti pripadaju tematici u MCP-u nazvanoj ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Da bi logiranje funkcioniralo, server mora omogućiti tu značajku (feature/capability) na sljedeći način:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Ovisno o korištenom SDK-u, logging je možda omogućen prema zadanim postavkama, ili ga morate eksplicitno uključiti u konfiguraciji servera.

Postoje različite vrste obavijesti:

| Razina    | Opis                           | Primjer upotrebe             |
|-----------|--------------------------------|-----------------------------|
| debug     | Detaljne informacije za otklanjanje pogrešaka | Ulazne/izlazne točke funkcija |
| info      | Opće informacijske poruke       | Ažuriranja napretka operacije |
| notice    | Normalni, ali značajni događaji | Promjene konfiguracije       |
| warning   | Upozoravajući uvjeti            | Korištenje zastarjelih značajki |
| error     | Greške                        | Neuspjesi operacija          |
| critical  | Kritični uvjeti               | Kvarovi dijelova sustava     |
| alert     | Potrebna je hitna akcija       | Otkrivena korupcija podataka |
| emergency | Sustav neupotrebljiv           | Potpuni kvar sustava         |

## Implementacija obavijesti u MCP-u

Za implementaciju obavijesti u MCP-u, morate postaviti i server i klijentsku stranu da obrađuju ažuriranja u stvarnom vremenu. To omogućuje vašoj aplikaciji da pruža trenutne povratne informacije korisnicima tijekom dugotrajnih operacija.

### Server-strana: Slanje obavijesti

Počnimo sa serverskom stranom. U MCP-u definirate alate koji mogu slati obavijesti dok obrađuju zahtjeve. Server koristi kontekst objekt (obično `ctx`) za slanje poruka klijentu.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

U prethodnom primjeru, alat `process_files` šalje tri obavijesti klijentu dok obrađuje svaku datoteku. Metoda `ctx.info()` koristi se za slanje informativnih poruka.

Dodatno, za omogućavanje obavijesti, osigurajte da vaš server koristi streaming transport (poput `streamable-http`) i da vaš klijent implementira rukovatelja poruka koji obrađuje obavijesti. Evo kako možete konfigurirati server za korištenje `streamable-http` transporta:

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

U ovom .NET primjeru, alat `ProcessFiles` označen je atributom `Tool` i šalje tri obavijesti klijentu dok obrađuje svaku datoteku. Metoda `ctx.Info()` koristi se za slanje informativnih poruka.

Da omogućite obavijesti u svom .NET MCP serveru, osigurajte da koristite streaming transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Klijent-strana: Primanje obavijesti

Klijent mora implementirati rukovatelja poruka koji će obrađivati i prikazivati obavijesti čim stignu.

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

U prethodnom kodu, funkcija `message_handler` provjerava je li dolazna poruka obavijest. Ako jest, ispisuje obavijest; inače je obrađuje kao redovnu server poruku. Također, primijetite kako se `ClientSession` inicijalizira sa `message_handler` za rukovanje dolaznim obavijestima.

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

U ovom .NET primjeru, funkcija `MessageHandler` provjerava je li dolazna poruka obavijest. Ako jest, ispisuje obavijest; inače je obrađuje kao redovnu server poruku. `ClientSession` se inicijalizira s rukovateljem poruka preko `ClientSessionOptions`.

Da omogućite obavijesti, osigurajte da server koristi streaming transport (poput `streamable-http`) i da klijent implementira rukovatelja poruka za obradu obavijesti.

## Obavijesti o napretku i scenariji

Ovaj odjeljak objašnjava koncept obavijesti o napretku u MCP-u, zašto su važne i kako ih implementirati koristeći Streamable HTTP. Također ćete pronaći praktični zadatak za učvršćivanje znanja.

Obavijesti o napretku su poruke u stvarnom vremenu koje server šalje klijentu tijekom dugotrajnih operacija. Umjesto čekanja da cijeli proces završi, server klijenta stalno obavještava o trenutnom statusu. To poboljšava transparentnost, korisničko iskustvo i olakšava otklanjanje pogrešaka.

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
- **Povratna informacija u stvarnom vremenu:** Klijenti mogu prikazivati trake napretka ili zapise, čineći aplikaciju responsivnom.
- **Lakše otklanjanje pogrešaka i nadzor:** Programeri i korisnici mogu vidjeti gdje proces može biti spor ili zapeti.

### Kako implementirati obavijesti o napretku

Evo kako možete implementirati obavijesti o napretku u MCP-u:

- **Na serveru:** Koristite `ctx.info()` ili `ctx.log()` za slanje obavijesti dok se svaki element obrađuje. Ovo šalje poruke klijentu prije nego što glavni rezultat bude spreman.
- **Na klijentu:** Implementirajte rukovatelja poruka koji sluša i prikazuje obavijesti čim stignu. Taj rukovatelj razlikuje obavijesti od konačnog rezultata.

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

## Sigurnosna razmatranja

Kod implementacije MCP servera s HTTP baziranim transportima, sigurnost postaje vrhunska briga koja zahtijeva pažnju na više napadnih vektora i mehanizama zaštite.

### Pregled

Sigurnost je kritična prilikom izlaganja MCP servera putem HTTP-a. Streamable HTTP uvodi nove površine za napade i zahtijeva pažljivu konfiguraciju.

### Ključne točke

- **Validacija zaglavlja Origin**: Uvijek validirajte `Origin` zaglavlje kako biste spriječili DNS rebinding napade.
- **Veza na localhost**: Za lokalni razvoj, vezujte servere na `localhost` kako ih ne biste izlagali javnom internetu.
- **Autentikacija**: Implementirajte autentikaciju (npr. API ključeve, OAuth) za produkcijske implementacije.
- **CORS**: Konfigurirajte politike Cross-Origin Resource Sharing (CORS) da biste ograničili pristup.
- **HTTPS**: Koristite HTTPS u produkciji za enkripciju prometa.

### Najbolje prakse

- Nikada ne vjerujte dolaznim zahtjevima bez validacije.
- Zapisujte i nadzirite sav pristup i greške.
- Redovito ažurirajte ovisnosti za zakrpe sigurnosnih ranjivosti.

### Izazovi
- Uravnoteživanje sigurnosti s lakoćom razvoja
- Osiguravanje kompatibilnosti s različitim klijentskim okruženjima

## Nadogradnja sa SSE na Streamable HTTP

Za aplikacije koje trenutno koriste Server-Sent Events (SSE), migracija na Streamable HTTP pruža poboljšane mogućnosti i bolju dugoročnu održivost za vaše MCP implementacije.

### Zašto nadograditi?

Postoje dva uvjerljiva razloga za nadogradnju sa SSE na Streamable HTTP:

- Streamable HTTP nudi bolju skalabilnost, kompatibilnost i bogatiju podršku za obavijesti u usporedbi sa SSE.
- To je preporučeni transport za nove MCP aplikacije.

### Koraci migracije

Evo kako možete migrirati sa SSE na Streamable HTTP u svojim MCP aplikacijama:

- **Ažurirajte kod servera** da koristi `transport="streamable-http"` u `mcp.run()`.
- **Ažurirajte kod klijenta** da koristi `streamablehttp_client` umjesto SSE klijenta.
- **Implementirajte rukovatelja poruka** u klijentu za obradu obavijesti.
- **Testirajte kompatibilnost** s postojećim alatima i radnim tokovima.

### Održavanje kompatibilnosti

Preporuča se održavati kompatibilnost s postojećim SSE klijentima tijekom procesa migracije. Evo nekoliko strategija:

- Možete podržavati i SSE i Streamable HTTP tako da pokrenete oba transporta na različitim krajnjim točkama.
- Postupno migrirajte klijente na novi transport.

### Izazovi

Osigurajte da riješite sljedeće izazove tijekom migracije:

- Osiguravanje da su svi klijenti ažurirani
- Rukovanje razlikama u dostavi obavijesti

## Sigurnosne napomene

Sigurnost treba biti glavni prioritet pri implementaciji bilo kojeg servera, posebno kod korištenja HTTP transporta poput Streamable HTTP u MCP-u.

Prilikom implementacije MCP servera s HTTP transportima, sigurnost postaje od izuzetne važnosti koja zahtijeva pažnju na različite vektore napada i mehanizme zaštite.

### Pregled

Sigurnost je ključna pri izlaganju MCP servera preko HTTP-a. Streamable HTTP uvodi nove površine za napad i zahtijeva pažljivu konfiguraciju.

Evo nekoliko ključnih sigurnosnih razmatranja:

- **Validacija zaglavlja Origin**: Uvijek validirajte zaglavlje `Origin` kako biste spriječili DNS rebinding napade.
- **Veza na localhost**: Za lokalni razvoj, vežite servere na `localhost` kako biste ih zaštitili od izlaganja na javni internet.
- **Autentifikacija**: Implementirajte autentifikaciju (npr. API ključeve, OAuth) za produkcijske implementacije.
- **CORS**: Konfigurirajte politike Cross-Origin Resource Sharing (CORS) za ograničenje pristupa.
- **HTTPS**: Koristite HTTPS u produkciji za šifriranje prometa.

### Najbolje prakse

Osim toga, evo nekoliko najboljih praksi za implementaciju sigurnosti u vaš MCP streaming server:

- Nikada ne vjerujte dolaznim zahtjevima bez validacije.
- Logirajte i nadzirite sav pristup i greške.
- Redovito ažurirajte ovisnosti kako biste ublažili sigurnosne ranjivosti.

### Izazovi

Susrest ćete se s nekim izazovima pri implementaciji sigurnosti u MCP streaming servere:

- Uravnoteživanje sigurnosti s lakoćom razvoja
- Osiguravanje kompatibilnosti s različitim klijentskim okruženjima

### Zadatak: Izradite vlastitu streaming MCP aplikaciju

**Scenarij:**
Izradite MCP server i klijenta gdje server obrađuje popis stavki (npr. datoteka ili dokumenata) i šalje obavijest za svaku obrađenu stavku. Klijent bi trebao prikazati svaku obavijest čim stigne.

**Koraci:**

1. Implementirajte alat servera koji obrađuje popis i šalje obavijesti za svaku stavku.
2. Implementirajte klijenta s rukovateljem poruka za prikaz obavijesti u stvarnom vremenu.
3. Testirajte svoju implementaciju pokretanjem servera i klijenta te promatrajte obavijesti.

[Rješenje](./solution/README.md)

## Dodatno čitanje i što dalje?

Kako biste nastavili svoje putovanje s MCP streamingom i proširili znanje, ovaj odjeljak nudi dodatne resurse i prijedloge za daljnje korake u izradi naprednijih aplikacija.

### Dodatno čitanje

- [Microsoft: Uvod u HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS u ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Što dalje?

- Pokušajte izraditi naprednije MCP alate koji koriste streaming za analitiku u stvarnom vremenu, chat ili zajedničko uređivanje.
- Istražite integraciju MCP streaminga s frontend okvirima (React, Vue itd.) za žive nadogradnje UI-ja.
- Dalje: [Korištenje AI Toolkit za VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->