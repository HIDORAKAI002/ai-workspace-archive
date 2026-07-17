# HTTPS-suoratoisto Model Context Protocolin (MCP) kanssa

Tämä luku tarjoaa kattavan oppaan turvallisen, skaalautuvan ja reaaliaikaisen suoratoiston toteuttamiseen Model Context Protocolin (MCP) avulla HTTPS:n yli. Se kattaa suoratoiston motivaation, käytettävissä olevat siirtomekanismit, miten toteuttaa suoratoistettava HTTP MCP:ssä, turvallisuuden parhaat käytännöt, siirtymisen SSE:stä ja käytännön ohjeita oman suoratoistavan MCP-sovelluksen rakentamiseen. 

> **Katse tulevaan:** tämä opetus kuvaa Streamable HTTP:n **MCP-spesifikaation 2025-11-25** alla, jossa istunto luodaan `initialize`-vaiheessa ja sidotaan `Mcp-Session-Id`-otsakkeella. Julkaisuversioehdokas `2026-07-28` poistaa kokonaan käsityksen ja istunnon tunnuksen, tehden jokaisesta pyynnöstä itsenäisen ja reititettävän mihin tahansa palvelininstanssiin ilman sticky-istuntoja. Katso lisätietoja kohdasta [Mitä MCP:ssä muuttuu: Julkaisuversioehdokas 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Siirtomekanismit ja suoratoisto MCP:ssä

Tässä osiossa tarkastellaan MCP:ssä saatavilla olevia erilaisia siirtomekanismeja ja niiden roolia suoratoiston mahdollistamisessa reaaliaikaiseen viestintään asiakkaiden ja palvelimien välillä.

### Mikä on siirtomekanismi?

Siirtomekanismi määrittelee, miten data vaihdetaan asiakkaan ja palvelimen välillä. MCP tukee useita siirtotyyppejä erilaisiin ympäristöihin ja vaatimuksiin:

- **stdio**: Standardi syöte/tuotos, sopii paikallisille ja komentorivipohjaisille työkaluilla. Yksinkertainen mutta ei sovellu web- tai pilviympäristöihin.
- **SSE (Server-Sent Events)**: Mahdollistaa palvelimien työntää reaaliaikaisia päivityksiä asiakkaille HTTP:n yli. Hyvä web-käyttöliittymiin, mutta skaalautuvuus ja joustavuus ovat rajallisia. MCP-spesifikaation 2025-06-18 mukaan itsenäinen SSE-siirtokulku on vanhentunut ja korvattu "Streamable HTTP" -siirtokululla.
- **Streamable HTTP**: Moderni HTTP-pohjainen suoratoistosiirto, tukee ilmoituksia ja parempaa skaalautuvuutta. Suositellaan useimmissa tuotanto- ja pilvitapauksissa.

### Vertailutaulukko

Katso alla oleva vertailutaulukko ymmärtääksesi erot näiden siirtomekanismien välillä:

| Siirto             | Reaaliaikaiset päivitykset | Suoratoisto | Skaalautuvuus | Käyttötapaus               |
|-------------------|----------------------------|-------------|---------------|----------------------------|
| stdio             | Ei                         | Ei          | Alhainen      | Paikalliset CLI-työkalut   |
| SSE               | Kyllä                      | Kyllä       | Keskitaso     | Web, reaaliaikaiset päivitykset |
| Streamable HTTP   | Kyllä                      | Kyllä       | Korkea        | Pilvi, moni-asiakas         |

> **Vinkki:** Oikean siirron valinta vaikuttaa suorituskykyyn, skaalautuvuuteen ja käyttäjäkokemukseen. **Streamable HTTP** on suositeltava moderneihin, skaalautuviin ja pilviympäristöihin sopiviin sovelluksiin.

Huomioi edellisissä luvuissa esitellyt stdio- ja SSE-siirrot sekä että tässä luvussa käsiteltävä siirto on suoratoistettava HTTP.

## Suoratoisto: käsitteet ja motivaatio

Suoratoiston peruskäsitteiden ja motivaation ymmärtäminen on olennaista tehokkaiden reaaliaikaisten viestintäjärjestelmien toteuttamiseksi.

**Suoratoisto** on verkko-ohjelmointitekniikka, joka mahdollistaa datan lähettämisen ja vastaanoton pieninä, hallittavina paloina tai tapahtumasarjana sen sijaan, että odotettaisiin kokonaista vastausta valmiiksi. Tämä on erityisen hyödyllistä:

- Suurten tiedostojen tai tietoaineistojen kanssa.
- Reaaliaikaisissa päivityksissä (esim. chat, edistymispalkit).
- Pitkissä laskelmissa, joissa halutaan pitää käyttäjä ajan tasalla.

Tässä mitä suoratoistosta tulee tietää korkean tason:

- Data toimitetaan asteittain, ei kaikkea kerralla.
- Asiakas voi käsitellä dataa sitä mukaa kuin se saapuu.
- Vähentää koettua viivettä ja parantaa käyttäjäkokemusta.

### Miksi käyttää suoratoistoa?

Syyt suoratoiston käyttöön ovat seuraavat:

- Käyttäjät saavat palautteen välittömästi, eivät vain lopussa
- Mahdollistaa reaaliaikaiset sovellukset ja reagoivat käyttöliittymät
- Tehokkaampi verkon ja suorituskyvyn käyttö

### Yksinkertainen esimerkki: HTTP-suoratoistopalvelin & asiakas

Tässä yksinkertainen esimerkki suoratoiston toteutuksesta:

#### Python

**Palvelin (Python, FastAPI ja StreamingResponse):**

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

**Asiakas (Python, requests-kirjasto):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Tämä esimerkki osoittaa palvelimen lähettävän sarjan viestejä asiakkaalle sitä mukaa kuin ne tulevat valmiiksi, sen sijaan että odottaisi kaikkien viestien valmistumista.

**Miten se toimii:**

- Palvelin antaa kunkin viestin sitä mukaan kun se on valmis.
- Asiakas vastaanottaa ja tulostaa kunkin osan heti kun se saapuu.

**Vaatimukset:**

- Palvelimen tulee käyttää suoratoistovastausta (esim. `StreamingResponse` FastAPI:ssa).
- Asiakkaan tulee käsitellä vastaus suoratoistona (`stream=True` requests-kirjastossa).
- Sisältötyypiksi sopii yleensä `text/event-stream` tai `application/octet-stream`.

#### Java

**Palvelin (Java, Spring Boot ja Server-Sent Events):**

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

**Asiakas (Java, Spring WebFlux WebClient):**

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

**Java-toteutuksen huomautuksia:**

- Käyttää Spring Bootin reaktiivista pinottua `Flux`-suoratoistoa varten
- `ServerSentEvent` tarjoaa jäsenneltyä tapahtumasuoratoistoa tapahtumatyypeillä
- `WebClient` ja `bodyToFlux()` mahdollistavat reaktiivisen suoratoiston kulutuksen
- `delayElements()` simuloi käsittelyn viivettä tapahtumien välissä
- Tapahtumilla voi olla tyyppejä (`info`, `result`) paremman asiakaskäsittelyn vuoksi

### Vertailu: Klassinen suoratoisto vs MCP-suoratoisto

Eroja suoratoiston toiminnassa klassisella tavalla ja MCP:llä voi kuvata seuraavasti:

| Ominaisuus            | Klassinen HTTP-suoratoisto       | MCP-suoratoisto (Ilmoitukset)         |
|----------------------|---------------------------------|---------------------------------------|
| Päävastaus           | Palasina                       | Yksi, lopussa                        |
| Edistymispäivitykset | Lähetetään dataosina            | Lähetetään ilmoituksina               |
| Asiakasvaatimukset    | Pitää käsitellä suoratoisto       | Pitää toteuttaa viestinkäsittelijä    |
| Käyttötapaus         | Suuret tiedostot, AI-token-sarjat | Edistyminen, lokit, reaaliaikainen palaute  |

### Keskeiset havaitut erot

Lisäksi tässä muutama keskeinen ero:

- **Viestintämalli:**
  - Klassinen HTTP-suoratoisto: Käyttää yksinkertaista palapaketointia datan lähettämiseen paloina
  - MCP-suoratoisto: Käyttää jäsenneltyä ilmoitusjärjestelmää JSON-RPC-protokollalla

- **Viesti#muoto:**
  - Klassinen HTTP: Tekstipalat, uusia rivejä sisältäen
  - MCP: Jäsennellyt LoggingMessageNotification-oliot metadataan perustuen

- **Asiakasimplementaatio:**
  - Klassinen HTTP: Yksinkertainen asiakas, joka käsittelee suoratoistovastauksia
  - MCP: Monimutkaisempi asiakas viestinkäsittelijällä eri viestityyppien käsittelemiseksi

- **Edistymispäivitykset:**
  - Klassinen HTTP: Edistyminen on osa päävastausvirtaa
  - MCP: Edistyminen lähetetään erillisinä ilmoitusviesteinä, päävastaus tulee lopussa

### Suositukset

Suosittelemme muutamia asioita kun pohditaan klassisen suoratoiston toteuttamista (kuten yllä esittämämme `/stream`-päätepisteen kautta) verrattuna MCP:n suoratoistoon.


- **Yksinkertaisiin suoratoistotarpeisiin:** Klassinen HTTP-suoratoisto on helpompi toteuttaa ja riittää perussuoratoistotarpeisiin.

- **Monimutkaisiin, interaktiivisiin sovelluksiin:** MCP-suoratoisto tarjoaa rakenteellisemman lähestymistavan, jossa on rikkaampi metatieto ja erotus ilmoitusten ja lopullisten tulosten välillä.

- **AI-sovelluksiin:** MCP:n ilmoitusjärjestelmä on erityisen hyödyllinen pitkiä tekoälytehtäviä varten, joissa haluat pitää käyttäjät ajan tasalla etenemisestä.

## Suoratoisto MCP:ssä

Ok, olet nähnyt tähän mennessä joitakin suosituksia ja vertailuja klassisen suoratoiston ja MCP:n suoratoiston eroista. Käydään yksityiskohtaisesti läpi, miten voit hyödyntää suoratoistoa MCP:ssä.

MCP-kehyksessä on tärkeää ymmärtää, miten suoratoisto toimii, jotta voit rakentaa responsiivisia sovelluksia, jotka antavat reaaliaikaisen palautteen käyttäjille pitkittyvien toimintojen aikana.

MCP:ssä suoratoisto ei tarkoita päävastauksen lähettämistä paloissa, vaan **ilmoitusten** lähettämistä asiakkaalle työkalun käsitellessä pyyntöä. Näihin ilmoituksiin voi kuulua etenemispäivityksiä, lokitietoja tai muita tapahtumia.

### Miten se toimii

Pääasiallinen tulos lähetetään edelleen yhtenä vastauksena. Kuitenkin ilmoituksia voidaan lähettää erillisinä viesteinä käsittelyn aikana, jolloin asiakas saa päivityksiä reaaliajassa. Asiakkaan täytyy pystyä käsittelemään ja näyttämään nämä ilmoitukset.

## Mikä on ilmoitus?

Me puhuimme "ilmoituksesta", mitä se tarkoittaa MCP:n kontekstissa?

Ilmoitus on palvelimen lähettämä viesti asiakkaalle, joka informoi etenemisestä, tilasta tai muista tapahtumista pitkittyvän operaation aikana. Ilmoitukset lisäävät läpinäkyvyyttä ja parantavat käyttökokemusta.

Esimerkiksi asiakkaan oletetaan lähettävän ilmoitus, kun alkukättely palvelimen kanssa on suoritettu.

Ilmoitus näyttää tältä JSON-viestinä:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Ilmoitukset kuuluvat MCP:ssä aiheeseen, jota kutsutaan ["Loggingiksi"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Poistumisilmoitus:** `2026-07-28` MCP-spesifikaation ehdokasjulkaisu merkitsee Logging-primitivin vanhentuneeksi `stderr`:n eduksi stdio-siirroissa ja OpenTelemetryn eduksi rakenteellisessa havaittavuudessa. Logging toimii edelleen versiossa `2025-11-25` ja ainakin vuoden ajan virallisen vanhentamisen jälkeen. Katso [Mitä MCP:ssä muuttuu: 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Saadaksesi lokituksen toimimaan, palvelimen täytyy ottaa se ominaisuutena käyttöön näin:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Käytetystä SDK:sta riippuen lokitus voi olla oletuksena päällä tai se täytyy erikseen ottaa käyttöön palvelinasetuksissa.

On olemassa erilaisia ilmoitustyyppejä:

| Taso       | Kuvaus                       | Esimerkkitapaus                 |
|------------|-----------------------------|--------------------------------|
| debug      | Yksityiskohtainen virheenkorjaustieto | Funktion sisään/uloskäynnit   |
| info       | Yleisiä informatiivisia viestejä | Toiminnon etenemispäivitykset  |
| notice     | Normaaleja mutta merkittäviä tapahtumia | Konfiguraatiomuutokset        |
| warning    | Varoitustilanteita          | Vanhentuneen ominaisuuden käyttö |
| error      | Virhetilanteita             | Toiminnon epäonnistumiset       |
| critical   | Kriittisiä tiloja          | Järjestelmäkomponenttien viat  |
| alert      | Toimi heti                 | Havaitut tietojen korruptiot    |
| emergency  | Järjestelmä käyttökelvoton | Täydellinen järjestelmävika    |

## Ilmoitusten toteutus MCP:ssä

Ilmoitusten toteuttamiseksi MCP:ssä sinun täytyy konfiguroida sekä palvelin- että asiakaspuoli käsittelemään reaaliaikaisia päivityksiä. Tämä mahdollistaa sovelluksellesi välittömän palautteen antamisen käyttäjille pitkittyvien toimintojen aikana.

### Palvelinpuoli: Ilmoitusten lähetys

Aloitetaan palvelinpuolelta. MCP:ssä määrittelet työkaluja, jotka voivat lähettää ilmoituksia käsitellessään pyyntöjä. Palvelin käyttää kontekstioliota (yleensä `ctx`) lähettääkseen viestejä asiakkaalle.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Edellisessä esimerkissä `process_files`-työkalu lähettää kolme ilmoitusta asiakkaalle käsitellessään kutakin tiedostoa. `ctx.info()`-metodia käytetään informatiivisten viestien lähettämiseen.

Lisäksi, aktivoidaksesi ilmoitukset, varmista että palvelimesi käyttää suoratoistosiirtoa (kuten `streamable-http`) ja että asiakkaasi toteuttaa viestinkäsittelijän ilmoitusten vastaanottamista varten. Näin voit määrittää palvelimen käyttämään `streamable-http`-siirtoa:

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

Tässä .NET-esimerkissä `ProcessFiles`-työkalu on merkitty `Tool`-attribuutilla ja lähettää kolme ilmoitusta asiakkaalle kutakin tiedostoa käsitellessään. `ctx.Info()`-metodia käytetään informatiivisten viestien lähettämiseen.

Ota ilmoitukset käyttöön .NET MCP -palvelimessasi varmistamalla, että käytät suoratoistosiirtoa:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Asiakaspuoli: Ilmoitusten vastaanotto

Asiakkaan täytyy toteuttaa viestinkäsittelijä, joka prosessoi ja näyttää ilmoitukset sitä mukaa kun ne saapuvat.

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

Edellisessä koodissa `message_handler`-funktio tarkistaa, onko saapuva viesti ilmoitus. Jos on, se tulostaa ilmoituksen; muuten käsittelee sen tavallisena palvelinviestinä. Huomaa myös, miten `ClientSession` alustetaan `message_handler`-funktiolla vastaanottamaan ilmoitukset.

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

Tässä .NET-esimerkissä `MessageHandler`-funktio tarkistaa, onko saapuva viesti ilmoitus. Jos on, se tulostaa ilmoituksen; muuten käsittelee sen tavallisena palvelinviestinä. `ClientSession` alustetaan viestinkäsittelijän avulla `ClientSessionOptions`-parametrilla.

Ota ilmoitukset käyttöön varmistamalla, että palvelimesi käyttää suoratoistosiirtoa (kuten `streamable-http`) ja asiakkaasi toteuttaa viestinkäsittelijän ilmoituksia varten.

## Etenemisilmoitukset ja tilanteet

Tässä osiossa selitetään MCP:n etenemisilmoitusten käsite, miksi ne ovat tärkeitä, ja miten ne toteutetaan käyttäen Streamable HTTP:tä. Löydät myös käytännön harjoituksen ymmärryksesi vahvistamiseksi.

Etenemisilmoitukset ovat reaaliaikaisia viestejä, jotka palvelin lähettää asiakkaalle pitkittyvien toimintojen aikana. Sen sijaan, että odotettaisiin koko prosessin valmistumista, palvelin pitää asiakkaan ajan tasalla nykyisestä tilasta. Tämä parantaa läpinäkyvyyttä, käyttökokemusta ja helpottaa virheiden selvitystä.

**Esimerkki:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Miksi käyttää etenemisilmoituksia?

Etenemisilmoitukset ovat tärkeitä useista syistä:

- **Parempi käyttökokemus:** Käyttäjät näkevät päivitykset työn edetessä, eivät vain lopussa.
- **Reaaliaikainen palaute:** Asiakkaat voivat näyttää etenemispalkkeja tai lokitietoja, jolloin sovellus tuntuu responsiiviselta.
- **Helpompi virheiden selvitys ja valvonta:** Kehittäjät ja käyttäjät näkevät, missä vaiheessa prosessi saattaa olla hidas tai jumissa.

### Miten toteuttaa etenemisilmoitukset

Näin voit toteuttaa etenemisilmoitukset MCP:ssä:

- **Palvelimella:** Käytä `ctx.info()` tai `ctx.log()` lähettääksesi ilmoituksia jokaisen kohteen käsittelyn yhteydessä. Tämä lähettää viestin asiakkaalle ennen pääasiallisen tuloksen valmistumista.

- **Asiakkaalla:** Toteuta viestinkäsittelijä, joka kuuntelee ja näyttää ilmoitukset saapuessaan. Tämä käsittelijä erottaa ilmoitukset ja lopullisen tuloksen.

**Palvelimen esimerkki:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Asiakas Esimerkki:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Turvallisuusseikat

Kun toteutat MCP-palvelimia HTTP-pohjaisilla siirroilla, turvallisuus nousee ensisijaiseksi huoleksi, joka vaatii huolellista huomiointia moniin hyökkäysvektoreihin ja suojamekanismeihin.

### Yleiskatsaus

Turvallisuus on kriittistä, kun MCP-palvelimet altistetaan HTTP:lle. Virtaava HTTP tarjoaa uusia hyökkäyspintoja ja vaatii huolellista konfigurointia.

### Tärkeimmät kohdat

- **Origin-otsikon validointi**: Vahvista aina `Origin`-otsikko DNS-uudelleensitoja hyökkäysten estämiseksi.
- **Localhost-sidonta**: Paikalliseen kehitykseen sidot palvelimet `localhost`:iin, jotta niitä ei altisteta julkiselle internetille.
- **Autentikointi**: Toteuta autentikointi (esim. API-avaimet, OAuth) tuotantokäyttöä varten.
- **CORS**: Määritä Cross-Origin Resource Sharing (CORS) -politiikat pääsyn rajoittamiseksi.
- **HTTPS**: Käytä HTTPS:ää tuotannossa liikenteen salaamiseen.

### Parhaat käytännöt

- Älä koskaan luota saapuviin pyyntöihin ilman validointia.
- Kirjaa ja valvo kaikki pääsy ja virheet.
- Päivitä säännöllisesti riippuvuudet korjataksesi turvallisuushaavoittuvuudet.

### Haasteet

- Turvallisuuden ja kehityksen helppouden tasapainottaminen
- Yhteensopivuuden varmistaminen eri asiakasympäristöjen kanssa

## Päivittäminen SSE:stä Streamable HTTP:hen

Sovelluksille, jotka käyttävät Server-Sent Events (SSE), siirtyminen Streamable HTTP:hen tarjoaa parannettuja ominaisuuksia ja paremman pitkän aikavälin kestävyyden MCP-toteutuksellesi.

### Miksi päivittää?

Kaksi vahvaa syytä päivittää SSE:stä Streamable HTTP:hen:

- Streamable HTTP tarjoaa paremman skaalautuvuuden, yhteensopivuuden ja monipuolisemman ilmoitustuen kuin SSE.
- Se on suositeltu siirtotapa uusille MCP-sovelluksille.

### Migraatiovaiheet

Näin voit siirtyä SSE:stä Streamable HTTP:hen MCP-sovelluksissasi:

- **Päivitä palvelinkoodi** käyttämään `transport="streamable-http"` funktiossa `mcp.run()`.
- **Päivitä asiakaskoodi** käyttämään `streamablehttp_client` SSE-asiakkaan sijaan.
- **Toteuta viestinkäsittelijä** asiakkaalle ilmoitusten käsittelyyn.
- **Testaa yhteensopivuus** olemassa olevien työkalujen ja työnkulkujen kanssa.

### Yhteensopivuuden ylläpito

On suositeltavaa pitää yhteensopivuus olemassa olevien SSE-asiakkaiden kanssa migraation aikana. Tässä joitakin strategioita:

- Voit tukea sekä SSE:tä että Streamable HTTP:tä ajamalla molemmat siirrot eri päätepisteissä.
- Siirrä asiakkaita asteittain uuteen siirtotapaan.

### Haasteet

Varmista, että ratkaiset seuraavat haasteet migraation aikana:

- Kaikkien asiakkaiden päivittäminen
- Erojen hallinta ilmoitusten toimituksessa

## Turvallisuusseikat

Turvallisuuden tulisi olla etusijalla palvelinta toteutettaessa, erityisesti kun käytetään HTTP-pohjaisia siirtoja kuten Streamable HTTP MCP:ssä.

Kun toteutat MCP-palvelimia HTTP-pohjaisilla siirroilla, turvallisuus nousee ensisijaiseksi huoleksi, joka vaatii huolellista huomiointia moniin hyökkäysvektoreihin ja suojamekanismeihin.

### Yleiskatsaus

Turvallisuus on kriittistä, kun MCP-palvelimet altistetaan HTTP:lle. Virtaava HTTP tarjoaa uusia hyökkäyspintoja ja vaatii huolellista konfigurointia.

Tässä muutamia keskeisiä turvallisuusnäkökohtia:

- **Origin-otsikon validointi**: Vahvista aina `Origin`-otsikko DNS-uudelleensitoja hyökkäysten estämiseksi.
- **Localhost-sidonta**: Paikalliseen kehitykseen sidot palvelimet `localhost`:iin, jotta niitä ei altisteta julkiselle internetille.
- **Autentikointi**: Toteuta autentikointi (esim. API-avaimet, OAuth) tuotantokäyttöä varten.
- **CORS**: Määritä Cross-Origin Resource Sharing (CORS) -politiikat pääsyn rajoittamiseksi.
- **HTTPS**: Käytä HTTPS:ää tuotannossa liikenteen salaamiseen.

### Parhaat käytännöt

Lisäksi tässä muutamia parhaita käytäntöjä, joita kannattaa noudattaa toteuttaessasi turvallisuutta MCP-virtaavassa palvelimessasi:

- Älä koskaan luota saapuviin pyyntöihin ilman validointia.
- Kirjaa ja valvo kaikki pääsy ja virheet.
- Päivitä säännöllisesti riippuvuudet korjataksesi turvallisuushaavoittuvuudet.

### Haasteet

Kohtaat joitakin haasteita toteuttaessasi turvallisuutta MCP-virtaavissa palvelimissa:

- Turvallisuuden ja kehityksen helppouden tasapainottaminen
- Yhteensopivuuden varmistaminen eri asiakasympäristöjen kanssa

### Tehtävä: Rakenna Oma Virtaava MCP-sovellus

**Tilanne:**
Rakenna MCP-palvelin ja asiakas, joissa palvelin käsittelee listan kohteita (esim. tiedostoja tai asiakirjoja) ja lähettää ilmoituksen jokaiselle käsitellylle kohteelle. Asiakkaan tulee näyttää jokainen ilmoitus sitä mukaa kun se saapuu.

**Vaiheet:**

1. Toteuta palvelintyökalu, joka käsittelee listan ja lähettää ilmoituksia jokaisesta kohteesta.
2. Toteuta asiakas viestinkäsittelijällä, joka näyttää ilmoitukset reaaliajassa.
3. Testaa toteutustasi ajamalla sekä palvelin että asiakas ja havainnoi ilmoitukset.

[Ratkaisu](./solution/README.md)

## Lisälukemista & Mitä Seuraavaksi?

Jatka matkaasi MCP-virtaamisen parissa ja laajenna osaamistasi tällä osastolla, joka tarjoaa lisäresursseja ja ehdotettuja seuraavia askelia kehittyneempien sovellusten rakentamiseen.

### Lisälukemista

- [Microsoft: Johdatus HTTP-virtaamiseen](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS ASP.NET Core:ssa](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Virtaavat pyynnöt](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Mitä Seuraavaksi?

- Kokeile rakentaa kehittyneempiä MCP-työkaluja, jotka hyödyntävät virtausta reaaliaikaiseen analytiikkaan, chattiin tai yhteismuokkaukseen.
- Tutki MCP-virtausten integrointia frontend-kehyksiin (React, Vue jne.) live-käyttöliittymäpäivityksiä varten.
- Seuraavaksi: [AI Toolkitin hyödyntäminen VSCode:ssa](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->