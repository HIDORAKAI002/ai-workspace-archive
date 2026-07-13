# HTTPS-suoratoisto Model Context Protocolin (MCP) kanssa

Tässä luvussa annetaan kattava opas turvallisen, skaalautuvan ja reaaliaikaisen suoratoiston toteuttamiseen Model Context Protocolin (MCP) avulla käyttäen HTTPS:ää. Käsitellään suoratoiston motivoitumista, käytettävissä olevia siirtomekanismeja, suoratoistettavan HTTP:n toteutusta MCP:ssä, turvallisuuden parhaita käytäntöjä, siirtymistä SSE:stä sekä käytännön ohjeita oman suoratoistavan MCP-sovelluksen rakentamiseen.

> **Katse eteenpäin:** tämä oppitunti kuvaa Streamable HTTP -ominaisuutta **MCP Specification 2025-11-25** -versiossa, jossa sessio perustetaan `initialize`-vaiheessa ja sidotaan `Mcp-Session-Id` -otsakkeella. `2026-07-28` julkaisuehdokkaassa käsikätely ja sessio-ID poistetaan kokonaan, tehden jokaisesta pyynnöstä itsenäisen ja ohjattavan mille tahansa palvelininstanssille ilman istuntokohtaisuutta. Lisätietoja löytyy kohdasta [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Siirtomekanismit ja suoratoisto MCP:ssä

Tässä osiossa käsitellään MCP:ssä käytettävissä olevia eri siirtomekanismeja ja niiden roolia reaaliaikaisen viestinnän mahdollistamisessa asiakkaiden ja palvelimien välillä.

### Mikä on siirtomekanismi?

Siirtomekanismi määrittelee, miten data vaihtuu asiakkaan ja palvelimen välillä. MCP tukee useita siirtotyyppejä, jotka soveltuvat erilaisiin ympäristöihin ja vaatimuksiin:

- **stdio**: Standardituloste/syöte, sopii paikallisille ja komentorivipohjaisille työkaluille. Yksinkertainen, mutta ei sovellu verkkosovelluksiin tai pilveen.
- **SSE (Server-Sent Events)**: Mahdollistaa palvelimien puskea reaaliaikaisia päivityksiä asiakkaille HTTP:n yli. Hyvä web-käyttöliittymille, mutta rajoittunut skaalautuvuudessa ja joustavuudessa. MCP Specification 2025-06-18 -version jälkeen itsenäinen SSE-siirto on poistettu käytöstä ja korvattu "Streamable HTTP" -siirrolla.
- **Streamable HTTP**: Moderni HTTP-pohjainen suoratoistosiirto, tukee ilmoituksia ja parempaa skaalautuvuutta. Suositellaan useimpiin tuotanto- ja pilvitilanteisiin.

### Vertailutaulukko

Tutustu alla olevaan vertailutaulukkoon ymmärtääksesi eroja näiden siirtomekanismien välillä:

| Siirto            | Reaaliaikaiset päivitykset | Suoratoisto | Skaalautuvuus | Käyttötapaus              |
|-------------------|----------------------------|-------------|---------------|---------------------------|
| stdio             | Ei                         | Ei          | Matala        | Paikalliset komentorivityökalut |
| SSE               | Kyllä                      | Kyllä       | Keskitaso     | Web, reaaliaikaiset päivitykset |
| Streamable HTTP   | Kyllä                      | Kyllä       | Korkea        | Pilvi, moniasiakasratkaisut |

> **Vinkki:** Oikean siirtotavan valinta vaikuttaa suorituskykyyn, skaalautuvuuteen ja käyttäjäkokemukseen. **Streamable HTTP** on suositeltava nykyaikaisiin, skaalautuviin ja pilveen valmiisiin sovelluksiin.

Huomaa aiemmissa luvuissa esitetyt stdio- ja SSE-siirrot sekä tässä luvussa käsitelty streamable HTTP -siirto.

## Suoratoisto: käsitteet ja motivaatio

Peruskäsitteiden ja motivaatioiden ymmärtäminen suoratoiston takana on olennaista tehokkaiden reaaliaikaisten viestintäjärjestelmien toteuttamiseksi.

**Suoratoisto** on tekniikka verkkosuunnittelussa, jossa dataa lähetetään ja vastaanotetaan pieninä, hallittavina paloina tai tapahtumasarjana sen sijaan, että odotetaan koko vastauksen valmistumista. Tämä on erityisen hyödyllistä:

- Suurten tiedostojen tai tietoaineistojen kohdalla.
- Reaaliaikaisten päivitysten (esim. chat, etenemispalkit) aikana.
- Pitkissä laskentatehtävissä, joissa halutaan pitää käyttäjä ajan tasalla.

Tässä tärkeimmät suoratoiston perusasiat yleisellä tasolla:

- Data toimitetaan asteittain, ei kerralla.
- Asiakas voi käsitellä dataa sitä mukaa kun se saapuu.
- Vähentää koettua viivettä ja parantaa käyttökokemusta.

### Miksi käyttää suoratoistoa?

Suoratoiston käytön syyt ovat seuraavat:

- Käyttäjät saavat välitöntä palautetta, eivät vain lopussa
- Mahdollistaa reaaliaikaiset sovellukset ja reagoivat käyttöliittymät
- Tehokkaampi verkon ja laskentaresurssien käyttö

### Yksinkertainen esimerkki: HTTP-sovellus suoratoistopalvelimesta ja asiakkaasta

Seuraavassa yksinkertainen esimerkki suoratoiston toteutuksesta:

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

**Asiakas (Python, requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Tämä esimerkki näyttää, miten palvelin lähettää sarjan viestejä asiakkaalle sitä mukaa kun ne valmistuvat sen sijaan, että odottaisi kaikkia viestejä valmiiksi.

**Miten se toimii:**

- Palvelin tuottaa kukin viestin sitä mukaa kun se valmistuu.
- Asiakas vastaanottaa ja tulostaa palasia sitä mukaa kun ne saapuvat.

**Vaatimukset:**

- Palvelimen tulee käyttää suoratoistovastausta (esim. `StreamingResponse` FastAPI:ssa).
- Asiakkaan tulee käsitellä vastaus virran tavoin (`stream=True` pyynnössä).
- Content-Type on yleensä `text/event-stream` tai `application/octet-stream`.

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

**Java-toteutusmuistiinpanot:**

- Käyttää Spring Bootin reaktiivista pinoutumista `Flux`-luokan avulla suoratoistoon
- `ServerSentEvent` tarjoaa jäsennellyn tapahtumasuoratoiston tapahtumatyypeillä
- `WebClient` ja `bodyToFlux()` mahdollistavat reaktiivisen suoratoistokulutuksen
- `delayElements()` simuloi käsittelyaikaa tapahtumien välillä
- Tapahtumilla voi olla tyyppejä (`info`, `result`) asiakaskäsittelyn helpottamiseksi

### Vertailu: Klassinen suoratoisto vs MCP-suoratoisto

Seuraava taulukko kuvaa eroja klassisen suoratoiston ja MCP:n suoratoiston välillä:

| Ominaisuus              | Klassinen HTTP-suoratoisto       | MCP-suoratoisto (Ilmoitukset)     |
|------------------------|---------------------------------|-----------------------------------|
| Päävastaus             | Paloiteltu                      | Yksittäinen, lopussa               |
| Etenemispäivitykset    | Lähetetään datapalojen muodossa | Lähetetään ilmoituksina            |
| Asiakasvaatimukset     | Täytyy käsitellä virtaa          | Täytyy toteuttaa viestinkäsittelijä |
| Käyttötapaus          | Suuret tiedostot, tekoälytokenin virrat | Eteneminen, lokit, reaaliaikainen palaute |

### Keskeiset havaitut erot

Lisäksi tässä keskeiset erot:

- **Viestintämalli:**
  - Klassinen HTTP-suoratoisto: Käyttää yksinkertaista paloittelua siirtoprotokollassa
  - MCP-suoratoisto: Käyttää jäsenneltyä ilmoitusjärjestelmää JSON-RPC-protokollalla

- **Viestimuoto:**
  - Klassinen HTTP: Tavalliset tekstipalot rivinvaihtoineen
  - MCP: Jäsennellyt LoggingMessageNotification-objektit metatietoineen

- **Asiakastoteutus:**
  - Klassinen HTTP: Yksinkertainen asiakas suoratoistovastauksille
  - MCP: Monimutkaisempi asiakas viestinkäsittelijällä eri viestityyppien käsittelyyn

- **Etenemispäivitykset:**
  - Klassinen HTTP: Eteneminen on osa päävirtaa
  - MCP: Eteneminen lähetetään erillisinä ilmoitusviesteinä, päävastaus lopussa

### Suositukset

Suosittelemme seuraavaa valintaa klassisen suoratoiston (kuten yllä esimerkin `/stream`) ja MCP:n suoratoiston välillä:

- **Yksinkertaisiin suoratoistotarpeisiin:** Klassinen HTTP-suoratoisto on helpompi toteuttaa ja riittää perussuoratoistoon.
- **Monimutkaisiin, interaktiivisiin sovelluksiin:** MCP-suoratoisto tarjoaa jäsennellymmän lähestymistavan laajennetuin metatiedoin ja erilliset ilmoitukset sekä lopulliseen tulokseen.
- **Tekoälysovelluksiin:** MCP:n ilmoitusjärjestelmä on erityisen hyödyllinen pitkissä tekoälytehtävissä, joissa halutaan pitää käyttäjät ajan tasalla etenemisestä.

## Suoratoisto MCP:ssä

Olet nyt nähnyt suosituksia ja vertailuja klassisen suoratoiston ja MCP:n suoratoiston välillä. Käytetään hetki tarkastellen, miten suoratoistoa voi hyödyntää MCP:ssä.

Suoratoiston toimintaperiaatteen ymmärtäminen MCP-kehyksessä on olennaista, jotta voidaan rakentaa reagointikykyisiä sovelluksia, jotka antavat käyttäjille reaaliaikaista palautetta pitkien suoritusten aikana.

MCP:ssä suoratoisto ei tarkoita päävastauksen lähettämistä paloina, vaan **ilmoitusten** lähettämistä asiakkaalle työkalun käsitellessä pyyntöä. Näihin ilmoituksiin voi kuulua etenemispäivityksiä, lokitietoja tai muita tapahtumia.

### Miten se toimii

Päävastauksen pitää edelleen tulla kokonaisuutena kerralla. Ilmoituksia sen sijaan voidaan lähettää erillisinä viesteinä käsittelyn aikana ja siten päivittää asiakasta reaaliajassa. Asiakkaan pitää osata käsitellä ja näyttää nämä ilmoitukset.

## Mikä on ilmoitus?

Sanoimme "ilmoitus" — mitä se tarkoittaa MCP:n yhteydessä?

Ilmoitus on palvelimelta asiakkaalle lähetettävä viesti, joka ilmoittaa etenemisestä, tilasta tai muista tapahtumista pitkän keston operaation aikana. Ilmoitukset parantavat läpinäkyvyyttä ja käyttökokemusta.

Esimerkiksi asiakkaan odotetaan lähettävän ilmoitus heti, kun alkuperäinen käsikätely palvelimen kanssa on suoritettu.

Ilmoitus näyttää JSON-viestinä tältä:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Ilmoitukset kuuluvat MCP:ssä aihealueeseen nimeltä ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Lokituksen toimimiseksi palvelimen pitää ottaa se käyttöön ominaisuutena/capabilitynä näin:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Käytetystä SDK:sta riippuen lokitus voi olla oletuksena päällä tai se täytyy ottaa erikseen käyttöön palvelimen asetuksista.

Erilaisia ilmoitustyyppejä on:

| Taso      | Kuvaus                         | Esimerkki käyttötapaus          |
|-----------|-------------------------------|--------------------------------|
| debug     | Yksityiskohtaiset vianetsintätiedot | Funktion sisään- ja ulostulot       |
| info      | Yleiset informaatioviestit     | Toiminnon etenemispäivitykset  |
| notice    | Tavalliset mutta merkittävät tapahtumat | Konfiguraatiomuutokset         |
| warning   | Varoitusehdot                  | Käytöstä poistettu ominaisuus  |
| error     | Virhetilanteet                | Toimintavirheet                |
| critical  | Kriittiset tilat              | Järjestelmäkomponenttien häiriöt |
| alert     | Toimenpiteitä täytyy tehdä välittömästi | Tietojen korruptio havaittu  |
| emergency | Järjestelmä on käyttökelvoton | Täysi järjestelmän vika        |

## Ilmoitusten toteuttaminen MCP:ssä

Ilmoitusten toteuttamiseksi MCP:ssä sinun tulee valmistella sekä palvelin- että asiakaspuoli käsittelemään reaaliaikaisia päivityksiä. Tämä mahdollistaa sovelluksellesi välittömän palautteen antamisen käyttäjille pitkien operaatioiden aikana.

### Palvelinpuoli: Ilmoitusten lähettäminen

Aloitetaan palvelinpuolelta. MCP:ssä määrittelet työkaluja, jotka voivat lähettää ilmoituksia pyyntöjen käsittelyn aikana. Palvelin käyttää kontekstikappaletta (yleensä `ctx`) lähettämään viestejä asiakkaalle.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Edellisessä esimerkissä `process_files`-työkalu lähettää kolme ilmoitusta asiakkaalle käsitellessään kutakin tiedostoa. `ctx.info()` -metodia käytetään tiedoittavien viestien lähettämiseen.

Lisäksi varmista ilmoitusten toimiminen, kun palvelimesi käyttää suoratoistosiirtoa (kuten `streamable-http`) ja asiakkaasi toteuttaa viestinkäsittelijän ilmoitusten käsittelyyn. Näin asetat palvelimen käyttämään `streamable-http` -siirtoa:

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

Tässä .NET-esimerkissä `ProcessFiles`-työkalu on merkitty `Tool`-attribuutilla ja lähettää kolme ilmoitusta asiakkaalle käsitellessään tiedostoja. `ctx.Info()`-metodia käytetään tiedoittavien viestien lähettämiseen.

Ota ilmoitukset käyttöön .NET MCP -palvelimessasi käyttämällä suoratoistosiirtoa:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Asiakaspuoli: Ilmoitusten vastaanotto

Asiakkaan tulee toteuttaa viestinkäsittelijä, joka vangitsee ja näyttää ilmoitukset sitä mukaa kun ne saapuvat.

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

Edellisessä koodissa `message_handler` tarkistaa, onko saapuva viesti ilmoitus. Jos on, se tulostaa ilmoituksen; muuten käsittelee viestin normaalina palvelinviestinä. Huomaa myös, miten `ClientSession` alustetaan `message_handler`-parametrilla käsittelemään saapuvia ilmoituksia.

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

Tässä .NET-esimerkissä `MessageHandler`-funktio tarkistaa, onko saapuva viesti ilmoitus. Jos on, se tulostaa ilmoituksen; muussa tapauksessa käsittelee sen tavallisena palvelinviestinä. `ClientSession` alustetaan viestinkäsittelijällä `ClientSessionOptions` -asetusten kautta.

Ota ilmoitukset käyttöön varmistaen, että palvelimesi käyttää suoratoistosiirtoa (kuten `streamable-http`) ja asiakkaasi toteuttaa viestinkäsittelijän ilmoitusten käsittelyyn.

## Etenemisilmoitukset ja käyttötapaukset

Tässä osiossa selitetään etenemisilmoitusten käsite MCP:ssä, miksi ne ovat tärkeitä ja miten toteuttaa ne Streamable HTTP:llä. Löydät myös käytännön harjoituksen ymmärryksen vahvistamiseksi.

Etenemisilmoitukset ovat reaaliaikaisia viestejä, jotka palvelin lähettää asiakkaalle pitkien suoritusten aikana. Sen sijaan, että odotettaisiin koko prosessin päättymistä, palvelin pitää asiakkaan ajan tasalla nykyisestä tilasta. Tämä parantaa läpinäkyvyyttä, käyttökokemusta ja helpottaa virheenjäljitystä.

**Esimerkki:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Miksi käyttää etenemisilmoituksia?

Etenemisilmoitukset ovat välttämättömiä useista syistä:

- **Parempi käyttökokemus:** Käyttäjät näkevät päivityksiä työn edistyessä, eivät vain lopussa.
- **Reaaliaikainen palaute:** Asiakkaat voivat näyttää etenemispalkkeja tai lokitietoja, mikä lisää sovelluksen responsiivisuutta.
- **Helpompi virheenjäljitys ja seuranta:** Kehittäjät ja käyttäjät näkevät, missä vaiheessa prosessi mahdollisesti hidastuu tai jumittaa.

### Miten toteuttaa etenemisilmoitukset

Näin toteutat etenemisilmoitukset MCP:ssä:

- **Palvelimella:** Käytä `ctx.info()` tai `ctx.log()` ilmoitusten lähettämiseen sitä mukaa kun kukin kohde on käsitelty. Tämä lähettää viestin asiakkaalle ennen päävastauksen valmistumista.
- **Asiakkaalla:** Toteuta viestinkäsittelijä, joka kuuntelee ja näyttää ilmoitukset niiden saapuessa. Tämä käsittelijä erottaa ilmoitukset ja lopullisen vastauksen.

**Palvelinesimerkki:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Asiakasesimerkki:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Turvallisuusnäkökohdat

MCP-palvelimia toteutettaessa HTTP-pohjaisten siirtojen kanssa turvallisuus on ensisijaisen tärkeää ja vaatii huolellista huomiota moniin hyökkäysvektoreihin ja suojausmekanismeihin.

### Yleiskatsaus

Turvallisuus on kriittistä MCP-palvelimia julkaistaessa HTTP:n yli. Streamable HTTP tuo uusia hyökkäyspintoja ja vaatii tarkkaa konfigurointia.

### Keskeiset kohdat
- **Origin-otsikon validointi**: Tarkista aina `Origin`-otsikko DNS-rebinding-hyökkäysten estämiseksi.
- **Localhost-sidonta**: Paikalliseen kehitykseen sidota palvelimet `localhost`-osoitteeseen, jotta et altista niitä julkiselle internetille.
- **Todennus**: Toteuta todennus (esim. API-avaimet, OAuth) tuotantokäyttöä varten.
- **CORS**: Määritä Cross-Origin Resource Sharing (CORS) -käytännöt pääsyn rajoittamiseksi.
- **HTTPS**: Käytä HTTPS:ää tuotannossa liikenteen salaamiseksi.

### Parhaat käytännöt

- Älä koskaan luota saapuviin pyyntöihin ilman validointia.
- Kirjaa ja valvo kaikki pääsy- ja virhelokit.
- Päivitä riippuvuudet säännöllisesti korjataksesi tietoturva-aukot.

### Haasteet

- Tietoturvan ja kehityksen helppouden tasapainottaminen
- Yhteensopivuuden varmistaminen eri asiakasympäristöissä

## Päivitys SSE:stä Streamable HTTP:hen

Sovelluksille, jotka käyttävät tällä hetkellä Server-Sent Events (SSE) -tekniikkaa, siirtyminen Streamable HTTP:hen tarjoaa parannetut ominaisuudet ja paremman pitkäaikaisen ylläpidettävyyden MCP-toteutuksillesi.

### Miksi päivittää?

On kaksi vahvaa syytä päivittää SSE:stä Streamable HTTP:hen:

- Streamable HTTP tarjoaa paremman skaalautuvuuden, yhteensopivuuden ja monipuolisemman ilmoitusten tuen kuin SSE.
- Se on suositeltu tiedonsiirtoreitti uusille MCP-sovelluksille.

### Migraatiovaiheet

Näin voit siirtyä SSE:stä Streamable HTTP:hen MCP-sovelluksissasi:

- **Päivitä palvelimen koodi** käyttämään `transport="streamable-http"` parametria `mcp.run()`-kutsussa.
- **Päivitä asiakaskoodi** käyttämään `streamablehttp_client`-asiakasta SSE:n sijaan.
- **Toteuta viestinkäsittelijä** asiakkaaseen ilmoitusten käsittelemiseksi.
- **Testaa yhteensopivuus** olemassa olevien työkalujen ja työnkulkujen kanssa.

### Yhteensopivuuden ylläpito

On suositeltavaa säilyttää yhteensopivuus olemassa olevien SSE-asiakkaiden kanssa migraation aikana. Tässä joitain strategioita:

- Voit tukea sekä SSE:tä että Streamable HTTP:tä pitämällä molemmat tiedonsiirtoreitit toiminnassa eri päätepisteissä.
- Siirrä asiakkaita asteittain uuteen tiedonsiirtotapaan.

### Haasteet

Huomioi seuraavat haasteet migraation aikana:

- Kaikkien asiakkaiden päivittäminen
- Ilmoitusten toimitusmekanismien erot

## Turvallisuusseikat

Turvallisuus on ensisijaisen tärkeää minkä tahansa palvelimen toteuttamisessa, erityisesti kun käytetään HTTP-pohjaisia tiedonsiirtotapoja kuten Streamable HTTP MCP:ssä.

MCP-palvelinten toteuttamisessa HTTP-pohjaisilla tiedonsiirtotavoilla turvallisuus edellyttää huolellista huomioimista moniin hyökkäysvektoreihin ja suojausmekanismeihin.

### Yleiskatsaus

Turvallisuus on kriittinen tekijä MCP-palvelinten julkaisemisessa HTTP:n kautta. Streamable HTTP tuo mukanaan uusia hyökkäyspintoja ja edellyttää tarkkaa konfigurointia.

Tässä keskeisiä turvallisuusnäkökulmia:

- **Origin-otsikon validointi**: Tarkista aina `Origin`-otsikko DNS-rebinding-hyökkäysten estämiseksi.
- **Localhost-sidonta**: Paikalliseen kehitykseen sidota palvelimet `localhost`-osoitteeseen, jotta et altista niitä julkiselle internetille.
- **Todennus**: Toteuta todennus (esim. API-avaimet, OAuth) tuotantokäyttöä varten.
- **CORS**: Määritä Cross-Origin Resource Sharing (CORS) -käytännöt pääsyn rajoittamiseksi.
- **HTTPS**: Käytä HTTPS:ää tuotannossa liikenteen salaamiseksi.

### Parhaat käytännöt

Lisäksi tässä on parhaat käytännöt turvallisuuden toteutukseen MCP-streamauspalvelimissa:

- Älä koskaan luota saapuviin pyyntöihin ilman validointia.
- Kirjaa ja valvo kaikki pääsy- ja virhelokit.
- Päivitä riippuvuudet säännöllisesti korjataksesi tietoturva-aukot.

### Haasteet

Turvallisuutta toteuttaessa MCP-streamauspalvelimissa kohtaat seuraavia haasteita:

- Tietoturvan ja kehityksen helppouden tasapainottaminen
- Yhteensopivuuden varmistaminen eri asiakasympäristöissä

### Harjoitus: Rakenna oma streamaava MCP-sovellus

**Tilannekuvaus:**
Rakenna MCP-palvelin ja -asiakas, jossa palvelin käsittelee listan kohteita (esim. tiedostoja tai dokumentteja) ja lähettää ilmoituksen jokaisen käsitellyn kohteen osalta. Asiakkaan tulee näyttää jokainen ilmoitus heti sen saapuessa.

**Vaiheet:**

1. Toteuta palvelintyökalu, joka käsittelee listan ja lähettää ilmoitukset jokaisesta kohteesta.
2. Toteuta asiakas, jossa on viestinkäsittelijä ilmoitusten reaaliaikaista näyttämistä varten.
3. Testaa toteutuksesi ajamalla sekä palvelin että asiakas ja seuraa ilmoituksia.

[Ratkaisu](./solution/README.md)

## Lisälukemista & Mitä seuraavaksi?

Jatka MCP-streamauksen opettelua ja laajenna osaamistasi tällä osiolla, joka tarjoaa lisäresursseja ja suosituksia edistyneempien sovellusten rakentamiseen.

### Lisälukemista

- [Microsoft: Johdatus HTTP-streamaukseen](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS ASP.NET Core -sovelluksissa](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Mitä seuraavaksi?

- Kokeile rakentaa edistyneempiä MCP-työkaluja, jotka käyttävät streamausta reaaliaikaiseen analytiikkaan, keskusteluihin tai yhteistoiminnalliseen muokkaukseen.
- Tutustu MCP-streamauksen integrointiin frontend-kehyksiin (React, Vue jne.) live-käyttöliittymäpäivityksiä varten.
- Seuraavaksi: [AI Toolkitin hyödyntäminen VSCodessa](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->