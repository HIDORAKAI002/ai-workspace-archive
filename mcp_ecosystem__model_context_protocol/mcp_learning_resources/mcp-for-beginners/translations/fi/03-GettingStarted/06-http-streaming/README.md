# HTTPS Streaming Model Context Protocolin (MCP) kanssa

Tämä luku tarjoaa kattavan oppaan turvallisen, skaalautuvan ja reaaliaikaisen suoratoiston toteuttamiseen Model Context Protocolin (MCP) avulla HTTPS:llä. Se käsittelee suoratoiston motivaatiota, käytettävissä olevia siirtomekanismeja, kuinka toteuttaa suoratoistettava HTTP MCP:ssä, turvallisuuden parhaat käytännöt, siirtymisen SSE:stä sekä käytännön ohjeita omien suoratoistavien MCP-sovellusten rakentamiseen.

## Siirtomekanismit ja suoratoisto MCP:ssä

Tässä osiossa tutkitaan MCP:ssä käytettävissä olevia erilaisia siirtomekanismeja ja niiden roolia mahdollistamassa suoratoistotoimintoja reaaliaikaiseen viestintään asiakkaiden ja palvelinten välillä.

### Mikä on siirtomekanismi?

Siirtomekanismi määrittelee, miten data vaihdetaan asiakkaan ja palvelimen välillä. MCP tukee useita siirtotyyppejä eri ympäristöjä ja vaatimuksia varten:

- **stdio**: Standardisisääntulo/-lähdöt, soveltuu paikallisiin ja komentorivipohjaisiin työkaluihin. Yksinkertainen mutta ei sovellu web- tai pilviympäristöön.
- **SSE (Server-Sent Events)**: Palvelimet voivat työntää reaaliaikaisia päivityksiä asiakkaille HTTP:n yli. Hyvä web-käyttöliittymiin, mutta skaalautuvuus ja joustavuus ovat rajallisia. MCP Specification 2025-06-18 -version jälkeen itsenäinen SSE-siirtomekanismi on poistettu ja korvattu "Streamable HTTP" -siirrolla.
- **Streamable HTTP**: Moderni HTTP-pohjainen suoratoistosiirto, tukee ilmoituksia ja parempaa skaalautuvuutta. Suositeltu useimpiin tuotanto- ja pilvitilanteisiin.

### Vertailutaulukko

Katso alla oleva vertailutaulukko ymmärtääksesi näiden siirtomekanismien erot:

| Siirto             | Reaaliaikaiset päivitykset | Suoratoisto | Skaalautuvuus | Käyttötapaus              |
|--------------------|----------------------------|-------------|---------------|---------------------------|
| stdio              | Ei                         | Ei          | Matala        | Paikalliset CLI-työkalut  |
| SSE                | Kyllä                      | Kyllä       | Keskitaso     | Web, reaaliaikaiset päivitykset |
| Streamable HTTP    | Kyllä                      | Kyllä       | Korkea        | Pilvi, moniasiakas        |

> **Vinkki:** Oikean siirtomekanismin valinta vaikuttaa suorituskykyyn, skaalautuvuuteen ja käyttäjäkokemukseen. **Streamable HTTP** on suositeltava moderniin, skaalautuvaan ja pilviyhteensopivaan sovellukseen.

Kiinnitä huomiota aiemmissa luvuissa esitettyihin stdio- ja SSE-siirtoihin sekä kuinka tässä luvussa käsitellään streamable HTTP -siirtoa.

## Suoratoisto: käsitteet ja motivaatio

Suoratoiston peruskäsitteiden ja motivaation ymmärtäminen on olennaista tehokkaiden reaaliaikaisten viestintäjärjestelmien toteuttamiseksi.

**Suoratoisto** on verkko-ohjelmoinnin tekniikka, joka mahdollistaa datan lähettämisen ja vastaanottamisen pienissä, hallittavissa paloissa tai tapahtumina sen sijaan, että odotettaisiin koko vastauksen valmistumista. Tämä on erityisen hyödyllistä:

- Suurten tiedostojen tai datasettien käsittelyssä.
- Reaaliaikaisten päivitysten kuten chatin ja etenemispalkkien yhteydessä.
- Pitkäkestoisissa laskennallisissa tehtävissä, joissa halutaan pitää käyttäjä ajan tasalla.

Tässä on yleistä tietoa suoratoistosta:

- Data toimitetaan vähitellen, ei kerralla.
- Asiakas voi käsitellä dataa saapuessaan.
- Vähentää koettua viivettä ja parantaa käyttökokemusta.

### Miksi käyttää suoratoistoa?

Suoratoiston käyttämisen syyt ovat seuraavat:

- Käyttäjät saavat palautteen välittömästi, eivät vain lopussa.
- Mahdollistaa reaaliaikaiset sovellukset ja responsiiviset käyttöliittymät.
- Tehokkaampi verkon ja laskentaresurssien käyttö.

### Yksinkertainen esimerkki: HTTP-suoratoistopalvelin ja -asiakas

Alla on yksinkertainen esimerkki suoratoiston toteutuksesta:

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

Tässä esimerkissä palvelin lähettää sarjan viestejä asiakkaalle sitä mukaa kun ne tulevat saataville, sen sijaan että odottaisi kaikkien viestien valmistumista.

**Toimintaperiaate:**

- Palvelin tuottaa jokaisen viestin heti kun se on valmis.
- Asiakas vastaanottaa ja tulostaa jokaisen vastaan tulevan palan.

**Vaadittavat asiat:**

- Palvelimen on käytettävä suoratoistovastausta (esim. FastAPI:n `StreamingResponse`).
- Asiakkaan on käsiteltävä vastaus suoratoistona (`stream=True` requestsissä).
- Sisältötyypiksi asetetaan yleensä `text/event-stream` tai `application/octet-stream`.

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

**Asiakas (Java, Spring WebFlux WebClientilla):**

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

- Käyttää Spring Bootin reaktiivista pinoa `Flux`-sovelluksella suoratoistoon.
- `ServerSentEvent` tarjoaa rakenteellisen tapahtumasuoratoiston tapahtumatyyppeineen.
- `WebClient` yhdessä `bodyToFlux()`-metodin kanssa mahdollistaa reaktiivisen suoratoiston kulutuksen.
- `delayElements()` simuloi tapahtumien käsittelyn aikaviiveitä.
- Tapahtumat voivat olla tyypiltään `info`, `result` paremman asiakashallinnan vuoksi.

### Vertailu: Klassinen suoratoisto vs MCP-suoratoisto

Se erot, jotka näyttävät, miten suoratoisto toimii "klassisesti" verrattuna MCP-suoratoistoon, voidaan esittää seuraavasti:

| Ominaisuus            | Klassinen HTTP-suoratoisto          | MCP-suoratoisto (ilmoitukset)         |
|-----------------------|-----------------------------------|---------------------------------------|
| Päävaste              | Palasina                         | Yksi vastaus lopussa                   |
| Etenemispäivitykset   | Lähetetään datapaloina            | Lähetetään ilmoituksina                |
| Asiakkaan vaatimukset | Streamin käsittely pakollista     | Viestinkäsittelijä pakollinen          |
| Käyttötarkoitus       | Suurten tiedostojen AI-tokenvirrat | Eteneminen, lokit, reaaliaikainen palaute |

### Huomattavia eroavaisuuksia

Lisäksi tässä on joitakin keskeisiä eroja:

- **Viestintämalli:**
  - Klassinen HTTP: Käyttää yksinkertaista paloittelua siirroissa
  - MCP: Käyttää rakenteellista ilmoitusjärjestelmää JSON-RPC-protokollalla

- **Viestin muoto:**
  - Klassinen HTTP: Tekstipalat rivinvaihtoineen
  - MCP: Rakenteelliset LoggingMessageNotification-objektit metatiedolla

- **Asiakkaan toteutus:**
  - Klassinen HTTP: Yksinkertainen suoratoistovastausten käsittelijä
  - MCP: Kehittyneempi viestinkäsittelijä erilaisten viestityyppien prosessointiin

- **Etenemispäivitykset:**
  - Klassinen HTTP: Osa päävastetta
  - MCP: Eteneminen lähetetään erillisinä ilmoitusviesteinä ja lopullinen vastaus tulee lopussa

### Suositukset

Suosittelemme seuraavia asioita klassisen suoratoiston (kuten yllä /stream-päätepisteellä) ja MCP-suoratoiston välillä:

- **Yksinkertaisiin suoratoistotarpeisiin:** Klassinen HTTP-suoratoisto on helpompi toteuttaa ja riittää peruslähtöisiin suoratoistoihin.

- **Monimutkaisiin, interaktiivisiin sovelluksiin:** MCP-suoratoisto tarjoaa rakenteellisemman lähestymistavan, rikkaampaa metatietoa ja erottelee ilmoitukset lopputuloksesta.

- **AI-sovelluksiin:** MCP:n ilmoitusjärjestelmä on erityisen hyödyllinen pitkäkestoisissa AI-tehtävissä, joissa halutaan pitää käyttäjät ajan tasalla etenemisestä.

## Suoratoisto MCP:ssä

Olet nyt nähnyt joitakin suosituksia ja vertailuja klassisen suoratoiston ja MCP-suoratoiston eroista. Syvennytään nyt tarkemmin siihen, kuinka hyödyntää suoratoistoa MCP:ssä.

Suoratoiston toimintaperiaatteen ymmärtäminen MCP-kehyksessä on olennaista responsiivisten sovellusten rakentamiseksi, jotka tarjoavat reaaliaikaista palautetta käyttäjille pitkäkestoisten tehtävien aikana.

MCP:ssä suoratoisto ei ole päävastauksen lähettämistä paloissa vaan **ilmoitusten** lähettämistä asiakkaalle, kun työkalu käsittelee pyyntöä. Nämä ilmoitukset voivat sisältää etenemispäivityksiä, lokitietoja tai muita tapahtumia.

### Miten se toimii

Päävastaus lähetetään edelleen yhtenä vastauksena. Kuitenkin ilmoitukset voidaan lähettää erillisinä viesteinä käsittelyn aikana ja näin päivitää asiakasta reaaliajassa. Asiakkaan on kyettävä käsittelemään ja näyttämään nämä ilmoitukset.

## Mikä on ilmoitus?

Sanoimme "ilmoitus", mitä se tarkoittaa MCP:n kontekstissa?

Ilmoitus on palvelimen lähettämä viesti asiakkaalle, joka informoi etenemisestä, tilasta tai muista tapahtumista pitkäkestoisen operaation aikana. Ilmoitukset parantavat läpinäkyvyyttä ja käyttökokemusta.

Esimerkiksi asiakkaan tulee lähettää ilmoitus, kun aloitustermiinin ja palvelimen välinen yhteys on muodostettu.

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

Ilmoitukset kuuluvat MCP:n aihealueeseen nimeltä ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Lokituksen toimimiseksi palvelimen on aktivoitava se ominaisuutena/kyvykkyytenä seuraavasti:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Käytetystä SDK:sta riippuen lokitus voi olla oletuksena päällä tai vaatia nimenomaisen aktivoinnin palvelinasetuksissa.

Ilmoituksia on erilaisia tyypiltään:

| Taso      | Kuvaus                          | Esimerkkikäyttö               |
|-----------|--------------------------------|------------------------------|
| debug     | Yksityiskohtaista vianetsintätietoa | Funktion sisään-/uloskäynnit  |
| info      | Yleisiä informatiivisia viestejä | Toiminnon etenemispäivitykset |
| notice    | Normaalit mutta merkittävät tapahtumat | Konfiguraatiomuutokset       |
| warning   | Varoitustilanteet               | Poistettu ominaisuuden käyttö |
| error     | Virhetilanteet                 | Toimintavirheet               |
| critical  | Kriittiset tilanteet           | Järjestelmän komponenttiviat |
| alert     | Toimintaan on ryhdyttävä välittömästi | Tietojen korruptio havaittu |
| emergency | Järjestelmä käyttökelvoton     | Täydellinen järjestelmävika  |

## Ilmoitusten toteuttaminen MCP:ssä

Ilmoitusten toteuttamiseksi MCP:ssä sinun on asetettava sekä palvelin- että asiakaspää vastaanottamaan reaaliaikaisia päivityksiä. Tämä mahdollistaa sovelluksesi tarjoavan välitöntä palautetta käyttäjille pitkäkestoisten toimintojen aikana.

### Palvelinpuoli: Ilmoitusten lähetys

Aloitetaan palvelinpuolelta. MCP:ssä määritellään työkalut, jotka voivat lähettää ilmoituksia pyynnön käsittelyn aikana. Palvelin käyttää yhteysobjektia (yleensä `ctx`) lähettääkseen viestejä asiakkaalle.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Edellisessä esimerkissä `process_files`-työkalu lähettää kolme ilmoitusta asiakkaalle käsitellessään kutakin tiedostoa. `ctx.info()`-metodia käytetään lähettämään informatiivisia viestejä.

Lisäksi ilmoitusten mahdollistamiseksi varmista, että palvelimesi käyttää suoratoistosiirtoa (kuten `streamable-http`) ja asiakkaasi toteuttaa viestinkäsittelijän ilmoitusten käsittelyyn. Näin palvelin voidaan asettaa käyttämään `streamable-http`-siirtoa:

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

Tässä .NET-esimerkissä `ProcessFiles`-työkalu on merkitty `Tool`-attribuutilla ja lähettää kolme ilmoitusta asiakkaalle kutakin tiedostoa käsitellessään. `ctx.Info()`-metodia käytetään lähettämään informatiivisia viestejä.

Ilmoitusten mahdollistamiseksi .NET MCP -palvelimessa varmista, että käytät suoratoistosiirtoa:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Asiakaspuoli: Ilmoitusten vastaanotto

Asiakkaan tulee toteuttaa viestinkäsittelijä, joka käsittelee ja näyttää saapuvat ilmoitukset.

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

Edellisessä koodissa `message_handler`-funktio tarkistaa, onko saapuva viesti ilmoitus. Jos on, se tulostaa ilmoituksen; muuten käsittelee sen normaalina palvelinviestinä. Huomaa myös, että `ClientSession` alustetaan `message_handler`in kanssa tulevien ilmoitusten käsittelyä varten.

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

Tässä .NET-esimerkissä `MessageHandler`-funktio tarkistaa, onko saapuva viesti ilmoitus. Jos on, se tulostaa sen; muuten käsittelee normaalina palvelinviestinä. `ClientSession` alustetaan viestinkäsittelijän kanssa `ClientSessionOptions`:lla.

Ilmoitusten mahdollistamiseksi varmista, että palvelimesi käyttää suoratoistosiirtoa (kuten `streamable-http`) ja asiakkaasi toteuttaa viestinkäsittelijän ilmoitusten vastaanottamiseksi.

## Etenemisilmoitukset & skenaariot

Tässä osiossa esitellään konsepti etenemisilmoituksista MCP:ssä, miksi ne ovat tärkeitä ja kuinka toteuttaa ne Streamable HTTP:n avulla. Löydät myös käytännön harjoituksen ymmärryksen syventämiseksi.

Etenemisilmoitukset ovat reaaliaikaisia viestejä, joita palvelin lähettää asiakkaalle pitkän kestävän operaation aikana. Sen sijaan, että odotetaan koko prosessin valmistumista, palvelin pitää asiakkaan ajan tasalla nykytilanteesta. Tämä parantaa läpinäkyvyyttä, käyttökokemusta ja helpottaa virheiden etsintää.

**Esimerkki:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Miksi käyttää etenemisilmoituksia?

Etenemisilmoitukset ovat olennaisia monesta syystä:

- **Parempi käyttäjäkokemus:** Käyttäjät näkevät päivitykset työn edetessä eivätkä vain lopussa.
- **Reaaliaikainen palaute:** Asiakkaat voivat näyttää etenemispalkkeja tai lokitietoja, mikä tekee sovelluksesta responsiivisen.
- **Helpompi virheenkorjaus ja valvonta:** Kehittäjät ja käyttäjät näkevät missä vaiheessa prosessissa voi olla hidastumisia tai jumittumisia.

### Kuinka toteuttaa etenemisilmoitukset

Näin voit toteuttaa etenemisilmoitukset MCP:ssä:

- **Palvelimella:** Käytä `ctx.info()` tai `ctx.log()` lähettääksesi ilmoituksia sitä mukaa kun kukin kohde käsitellään. Tämä lähettää viestin asiakkaalle ennen päävastetta.
- **Asiakkaalla:** Toteuta viestinkäsittelijä, joka kuuntelee ja näyttää ilmoitukset saapuessaan. Tämä erottaa ilmoitukset ja lopullisen tuloksen.

**Palvelin-esimerkki:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Asiakas-esimerkki:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Turvallisuusnäkökohdat

Kun toteutat MCP-palvelimia HTTP-pohjaisten siirtomekanismien kanssa, turvallisuus on ensiarvoisen tärkeä huolenaihe, joka vaatii tarkkaa huomiota moniin hyökkäysvektoreihin ja suojamekanismeihin.

### Yleiskatsaus

Turvallisuus on kriittistä, kun altistat MCP-palvelimia HTTP:n kautta. Streamable HTTP tuo uusia hyökkäyspintoja ja vaatii tarkkaa konfigurointia.

### Keskeiset kohdat

- **Origin-headerin validointi:** Tarkista aina `Origin`-header estääksesi DNS-rebind-hyökkäykset.
- **Localhost-binding:** Paikalliseen kehitykseen sitouta palvelin `localhost`-osoitteeseen, jotta sitä ei altisteta julkiselle internetille.
- **Autentikointi:** Toteuta autentikointi (esim. API-avaimet, OAuth) tuotantokäyttöä varten.
- **CORS:** Määritä Cross-Origin Resource Sharing -politiikat pääsyn rajoittamiseksi.
- **HTTPS:** Käytä HTTPS:ää tuotannossa liikenteen salaamiseen.

### Parhaat käytännöt

- Älä koskaan luota saapuviin pyyntöihin ilman validointia.
- Kirjaa ja valvo kaikki pääsy ja virheet.
- Päivitä riippuvuudet säännöllisesti haavoittuvuuksien korjaamiseksi.

### Haasteet
- Turvallisuuden ja kehityksen helppouden tasapainottaminen
- Yhteensopivuuden varmistaminen erilaisissa asiakasympäristöissä

## Päivitys SSE:stä Streamable HTTP:hen

Sovelluksille, jotka käyttävät tällä hetkellä Server-Sent Eventsiä (SSE), siirtyminen Streamable HTTP:hen tarjoaa laajennettuja toimintoja ja paremman pitkäaikaisen kestävyyden MCP-ratkaisuille.

### Miksi päivittää?

On kaksi vahvaa syytä päivittää SSE:stä Streamable HTTP:hen:

- Streamable HTTP tarjoaa paremman skaalautuvuuden, yhteensopivuuden ja monipuolisemman ilmoitustuen kuin SSE.
- Se on suositeltu siirtoprotokolla uusille MCP-sovelluksille.

### Siirtymisen vaiheet

Näin voit siirtyä SSE:stä Streamable HTTP:hen MCP-sovelluksissasi:

- **Päivitä palvelinkoodi** käyttämään `transport="streamable-http"` parametria `mcp.run()`-kutsussa.
- **Päivitä asiakaskoodi** käyttämään `streamablehttp_client`-moduulia SSE-asiakkaan sijaan.
- **Ota käyttöön viestinkäsittelijä** asiakkaassa ilmoitusten käsittelyä varten.
- **Testaa yhteensopivuus** olemassa olevien työkalujen ja työnkulkujen kanssa.

### Yhteensopivuuden säilyttäminen

On suositeltavaa ylläpitää yhteensopivuutta nykyisten SSE-asiakkaiden kanssa siirtymävaiheen aikana. Tässä joitakin strategioita:

- Voit tukea sekä SSE:tä että Streamable HTTP:tä käyttämällä molempia siirtotapoja eri päätepisteissä.
- Siirrä asiakkaita vähitellen uuteen siirtotapaan.

### Haasteet

Varmista, että seuraavat haasteet otetaan huomioon siirrossa:

- Kaikkien asiakkaiden päivittäminen
- Ilmoitusten toimituserojen käsittely

## Turvallisuusnäkökohdat

Turvallisuus on ensisijaisen tärkeää minkä tahansa palvelimen toteuttamisessa, erityisesti kun käytetään HTTP-pohjaisia siirtoprotokollia kuten Streamable HTTP MCP:ssä.

Toteuttaessasi MCP-palvelimia HTTP-pohjaisilla siirtoprotokollilla, turvallisuuteen liittyy olennaisia huolia, jotka vaativat huolellista tarkastelua monien hyökkäysvektorien ja suojausmekanismien osalta.

### Yleiskatsaus

Turvallisuus on keskeistä, kun MCP-palvelimia altistetaan HTTP:n kautta. Streamable HTTP lisää uusia hyökkäyspintoja ja vaatii tarkkaa konfigurointia.

Tässä joitakin keskeisiä turvallisuusnäkökohtia:

- **Origin-otsikon validointi**: Tarkista aina `Origin`-otsikko estääksesi DNS:n uudelleensuuntaus -hyökkäykset.
- **Localhost-sidonta**: Paikaiskehityksessä sitouta palvelin `localhost`-osoitteeseen, jotta se ei ole julkisen internetin tavoitettavissa.
- **Todennus**: Toteuta tuotantokäytössä todennus (esim. API-avaimet, OAuth).
- **CORS**: Määritä ristiinalkuperäpolitiikat (CORS) rajoittamaan pääsyä.
- **HTTPS**: Käytä HTTPS:ää tuotannossa liikenteen salaamiseen.

### Parhaat käytännöt

Lisäksi tässä on joitakin parhaita käytäntöjä turvallisuuden toteutuksessa MCP-nauhuriipalvelimissa:

- Älä koskaan luota ilman validointia tuleviin pyyntöihin.
- Kirjaa ja valvo kaikki pääsy- ja virhetapahtumat.
- Päivitä riippuvuudet säännöllisesti turvallisuusaukkojen paikkaamiseksi.

### Haasteet

Turvallisuuden toteuttamisessa MCP-nauhuriipalvelimissa kohtaamasi haasteet ovat:

- Turvallisuuden ja kehityksen helppouden tasapainottaminen
- Erilaisten asiakasympäristöjen yhteensopivuuden varmistaminen

### Tehtävä: Rakenna oma Streamaava MCP-sovellus

**Tilanne:**
Rakenna MCP-palvelin ja asiakas, jossa palvelin käsittelee listan kohteita (esim. tiedostoja tai dokumentteja) ja lähettää ilmoituksen jokaisesta käsitellystä kohteesta. Asiakkaan tulee näyttää jokainen ilmoitus heti sen saapuessa.

**Vaiheet:**

1. Toteuta palvelintyökalu, joka käsittelee listan ja lähettää ilmoituksia jokaisesta kohteesta.
2. Toteuta asiakas viestinkäsittelijällä, joka näyttää ilmoitukset reaaliajassa.
3. Testaa toteutustasi ajamalla sekä palvelin että asiakas ja seuraa ilmoituksia.

[Ratkaisu](./solution/README.md)

## Lisälukemista & Mitä seuraavaksi?

Jatka MCP-lähetysprosessien opettelua ja laajenna tietämystäsi tällä osiolla, joka tarjoaa lisäresursseja ja ehdotuksia edistyneempien sovellusten rakentamiseen.

### Lisälukemista

- [Microsoft: Johdanto HTTP-lähetykseen](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS ASP.NET Core:ssa](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Mitä seuraavaksi?

- Kokeile rakentaa edistyneempiä MCP-työkaluja, jotka käyttävät lähetyksiä reaaliaikaisiin analyyseihin, chattiin tai yhteismuokkaukseen.
- Tutustu MCP-lähetysten integroimiseen frontend-kehyksiin (React, Vue jne.) live-käyttöliittymäpäivityksiä varten.
- Seuraava: [AI Toolkitin käyttäminen VSCodessa](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->