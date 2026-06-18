# MCP-palvelin stdio-siirrolla

> **⚠️ Tärkeä päivitys**: MCP-spesifikaation 2025-06-18 versiosta lähtien erillinen SSE (Server-Sent Events) -siirto on **käytöstä poistettu** ja korvattu "Streamable HTTP" -siirrolla. Nykyinen MCP-spesifikaatio määrittelee kaksi ensisijaista siirtomekanismia:
> 1. **stdio** - standarditulon ja -lähdön käyttö (suositeltu paikallisille palvelimille)
> 2. **Streamable HTTP** - etäpalvelimille, jotka voivat käyttää SSE:tä sisäisesti
>
> Tämä oppitunti on päivitetty keskittymään **stdio-siirtoon**, joka on suositeltu tapa useimmissa MCP-palvelinratkaisuissa.

Stdio-siirto mahdollistaa MCP-palvelimien kommunikoinnin asiakkaiden kanssa standardin tulon ja lähdön virtojen kautta. Tämä on yleisimmin käytetty ja suositeltu siirtomekanismi nykyisessä MCP-spesifikaatiossa, tarjoten yksinkertaisen ja tehokkaan tavan rakentaa MCP-palvelimia, jotka voidaan helposti integroida erilaisiin asiakassovelluksiin.

## Yleiskatsaus

Tässä oppitunnissa käydään läpi, kuinka rakentaa ja käyttää MCP-palvelimia stdio-siirrolla.

## Oppimistavoitteet

Tämän oppitunnin lopussa osaat:

- Rakentaa MCP-palvelimen stdio-siirtoa käyttäen.
- Virheenkorjata MCP-palvelimen Inspectorilla.
- Käyttää MCP-palvelinta Visual Studio Codessa.
- Ymmärtää nykyiset MCP-siirtomekanismit ja miksi stdio on suositeltu.

## stdio-siirto - Kuinka se toimii

Stdio-siirto on yksi kahdesta MCP-spesifikaation (2025-11-25) tukemasta siirtotyypistä. Näin se toimii:

- **Yksinkertainen viestintä**: Palvelin lukee JSON-RPC-viestejä standarditulosta (`stdin`) ja lähettää viestejä standardilähtöön (`stdout`).
- **Prosessipohjainen**: Asiakas käynnistää MCP-palvelimen aliprosessina.
- **Viestimuoto**: Viestit ovat yksittäisiä JSON-RPC-pyyntöjä, ilmoituksia tai vastauksia, eroteltuna rivinvaihdoilla.
- **Lokitus**: Palvelin VOI kirjoittaa UTF-8-merkkijonoja standardivirhevirtaan (`stderr`) lokitusta varten.

### Keskeiset vaatimukset:
- Viestit TÄYTYY erottaa rivinvaihdoilla eikä niiden sisällä saa olla upotettuja rivinvaihtoja
- Palvelin EI SAA kirjoittaa `stdout`:iin mitään, mikä ei ole kelvollinen MCP-viesti
- Asiakas EI SAA kirjoittaa palvelimen `stdin`:iin mitään, mikä ei ole kelvollinen MCP-viesti

### TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

Edellisessä koodissa:

- Tuomme `Server`-luokan ja `StdioServerTransport` MCP SDK:sta
- Luomme palvelininstanssin peruskonfiguraatiolla ja -ominaisuuksilla
- Luomme `StdioServerTransport`-instanssin ja yhdistämme palvelimen siihen, mahdollistaen kommunikaation stdin/stdout kautta

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Luo palvelininstanssi
server = Server("example-server")

@server.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

Edellisessä koodissa:

- Luomme palvelininstanssin käyttäen MCP SDK:ta
- Määrittelemme työkalut koristeiden avulla
- Käytämme stdio_server-kontekstinhallintaa siirron käsittelyyn

### .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

builder.Services.AddLogging(logging => logging.AddConsole());

var app = builder.Build();
await app.RunAsync();
```

Keskeinen ero SSE:hen nähden on, että stdio-palvelimet:

- Eivät vaadi web-palvelinasetuksia tai HTTP-päätepisteitä
- Käynnistetään aliprosesseina asiakkaan toimesta
- Kommunikoivat stdin/stdout-virtojen kautta
- Ovat helpompia toteuttaa ja virheenkorjata

## Harjoitus: stdio-palvelimen luominen

Palvelintamme luodessamme on pidettävä kaksi asiaa mielessä:

- Tarvitsemme web-palvelimen tarjoamaan päätepisteitä yhteyksiä ja viestejä varten.

## Labra: Yksinkertaisen MCP stdio-palvelimen luominen

Tässä labrassa luomme yksinkertaisen MCP-palvelimen käyttäen suositeltua stdio-siirtoa. Tämä palvelin tarjoaa työkaluja, joita asiakkaat voivat kutsua standardin Model Context Protocolin avulla.

### Ennen aloittamista

- Python 3.8 tai uudempi
- MCP Python SDK: `pip install mcp`
- Perustietämys asynkronisesta ohjelmoinnista

Aloitetaan luomalla ensimmäinen MCP stdio -palvelimemme:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Määritä lokitus
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Luo palvelin
server = Server("example-stdio-server")

@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool() 
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    # Käytä stdio-siirtoa
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Keskeiset erot käytöstä poistettuun SSE-tapaan

**Stdio-siirto (Nykyinen standardi):**
- Yksinkertainen aliprosessimalli - asiakas käynnistää palvelimen lapsiprosessina
- Kommunikaatio stdin/stdout käyttäen JSON-RPC-viestejä
- Ei HTTP-palvelinasetuksia vaadita
- Parempi suorituskyky ja turvallisuus
- Helpompi virheenkorjaus ja kehitys

**SSE-siirto (Poistettu käytöstä MCP 2025-06-18 alkaen):**
- Vaati HTTP-palvelimen SSE-päätepisteillä
- Monimutkaisempi asennus web-palvelininfrastruktuurin kanssa
- Lisäturvatoimet HTTP-päätepisteille
- Nykyään korvattu Streamable HTTP:llä verkkopohjaisiin skenaarioihin

### Palvelimen luominen stdio-siirrolla

Palvelimen luomiseksi meidän täytyy:

1. **Tuoda tarvittavat kirjastot** - Tarvitsemme MCP-palvelinkomponentit ja stdio-siirron
2. **Luoda palvelininstanssi** - Määritellä palvelin sen ominaisuuksineen
3. **Määritellä työkalut** - Lisätä haluttu toiminnallisuus
4. **Konfiguroida siirto** - Asettaa stdio-kommunikaatio
5. **Käynnistää palvelin** - Aloittaa palvelin ja käsitellä viestejä

Rakennetaan tämä vaihe vaiheelta:

### Vaihe 1: Perus stdio-palvelimen luominen

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Määritä lokitus
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Luo palvelin
server = Server("example-stdio-server")

@server.tool()
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

### Vaihe 2: Lisää työkaluja

```python
@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool()
def calculate_product(a: int, b: int) -> int:
    """Calculate the product of two numbers"""
    return a * b

@server.tool()
def get_server_info() -> dict:
    """Get information about this MCP server"""
    return {
        "server_name": "example-stdio-server",
        "version": "1.0.0",
        "transport": "stdio",
        "capabilities": ["tools"]
    }
```

### Vaihe 3: Palvelimen ajaminen

Tallenna koodi nimellä `server.py` ja aja komentoriviltä:

```bash
python server.py
```

Palvelin käynnistyy ja odottaa syötettä stdin:stä. Se kommunikoi JSON-RPC-viestien avulla stdio-siirrossa.

### Vaihe 4: Testaus Inspectorilla

Voit testata palvelinta MCP Inspectorilla:

1. Asenna Inspector: `npx @modelcontextprotocol/inspector`
2. Käynnistä Inspector ja osoita se palvelimeesi
3. Testaa luomiasi työkaluja

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Virheenkorjaus stdio-palvelimellesi

### MCP Inspectorin käyttäminen

MCP Inspector on arvokas työkalu MCP-palvelimien virheenkorjaukseen ja testaamiseen. Näin käytät sitä stdio-palvelimesi kanssa:

1. **Asenna Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Käynnistä Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Testaa palvelinta**: Inspector tarjoaa web-käyttöliittymän, jossa voit:
   - Tarkastella palvelimen ominaisuuksia
   - Testata työkaluja eri parametreilla
   - Valvoa JSON-RPC-viestejä
   - Virheenkorjata yhteysongelmia

### VS Coden käyttö

Voit myös virheenkorjata MCP-palvelinta suoraan VS Codessa:

1. Luo käynnistysskriptin konfiguraatio tiedostoon `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug MCP Server",
         "type": "python",
         "request": "launch",
         "program": "server.py",
         "console": "integratedTerminal"
       }
     ]
   }
   ```

2. Aseta murtopisteet palvelinkoodiisi
3. Käynnistä debuggaus ja testaa Inspectorilla

### Yleisiä virheenkorjausvinkkejä

- Käytä `stderr`-virtaa lokitukseen - älä koskaan kirjoita `stdout`:iin, koska se on varattu MCP-viesteille
- Varmista, että kaikki JSON-RPC-viestit ovat rivinvaihtoeroteltuja
- Testaa ensin yksinkertaisilla työkaluilla ennen monimutkaisemman toiminnallisuuden lisäämistä
- Käytä Inspectoria viestimuotojen varmistamiseen

## stdio-palvelimen käyttäminen VS Codessa

Kun olet rakentanut MCP stdio-palvelimesi, voit integroida sen VS Codeen käyttämään sitä Clauden tai muiden MCP-yhteensopivien asiakkaiden kanssa.

### Konfigurointi

1. **Luo MCP-konfiguraatiotiedosto** hakemistoon `%APPDATA%\Claude\claude_desktop_config.json` (Windows) tai `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

   ```json
   {
     "mcpServers": {
       "example-stdio-server": {
         "command": "python",
         "args": ["path/to/your/server.py"]
       }
     }
   }
   ```

2. **Käynnistä Claude uudelleen**: Sulje ja avaa Claude uudelleen ladataksesi uuden palvelinmäärityksen.

3. **Testaa yhteyttä**: Aloita keskustelu Clauden kanssa ja kokeile palvelimesi työkaluja:
   - "Voisitko tervehtiä minua tervetulosanomavälinettä käyttäen?"
   - "Laske lukujen 15 ja 27 summa"
   - "Mikä on palvelimen tiedot?"

### TypeScript stdio -palvelin esimerkki

Tässä on täydellinen TypeScript-esimerkki viitteeksi:

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-stdio-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Lisää työkaluja
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_greeting",
        description: "Get a personalized greeting",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_greeting") {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${request.params.arguments?.name}! Welcome to MCP stdio server.`,
        },
      ],
    };
  } else {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

### .NET stdio -palvelin esimerkki

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

var app = builder.Build();
await app.RunAsync();

[McpServerToolType]
public class Tools
{
    [McpServerTool, Description("Get a personalized greeting")]
    public string GetGreeting(string name)
    {
        return $"Hello, {name}! Welcome to MCP stdio server.";
    }

    [McpServerTool, Description("Calculate the sum of two numbers")]
    public int CalculateSum(int a, int b)
    {
        return a + b;
    }
}
```

## Yhteenveto

Tässä päivitettyssä oppitunnissa opit:

- Rakentamaan MCP-palvelimia käyttäen nykyistä **stdio-siirtoa** (suositeltu tapa)
- Miksi SSE-siirto poistettiin suosiossa stdio- ja Streamable HTTP -siirtojen hyväksi
- Luomaan työkaluja, joita MCP-asiakkaat voivat kutsua
- Virheenkorjaamaan palvelimen MCP Inspectorin avulla
- Integroimaan stdio-palvelimen VS Codeen ja Claudeen

Stdio-siirto tarjoaa yksinkertaisemman, turvallisemman ja suorituskykyisemmän tavan rakentaa MCP-palvelimia verrattuna käytöstä poistettuun SSE-menetelmään. Se on suositeltu siirtotapa useimpiin MCP-palvelinratkaisuihin vuoden 2025-06-18 spesifikaatiosta alkaen.

### .NET

1. Luodaan ensin joitain työkaluja, tätä varten luomme tiedoston *Tools.cs*, jossa on seuraava sisältö:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Harjoitus: stdio-palvelimen testaaminen

Nyt kun olet rakentanut stdio-palvelimesi, testataan se varmistaaksemme, että se toimii oikein.

### Ennen aloittamista

1. Varmista, että MCP Inspector on asennettu:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Palvelinkoodisi tulisi olla tallennettuna (esim. nimellä `server.py`)

### Testaus Inspectorilla

1. **Käynnistä Inspector palvelimesi kanssa**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Avaa web-käyttöliittymä**: Inspector avaa selaimen ikkunan, jossa näet palvelimesi ominaisuudet.

3. **Testaa työkaluja**: 
   - Kokeile `get_greeting`-työkalua eri nimillä
   - Testaa `calculate_sum`-työkalua eri luvuilla
   - Kutsu `get_server_info` -työkalua saadaksesi palvelimen metatiedot

4. **Seuraa kommunikointia**: Inspector näyttää JSON-RPC-viestit, joita vaihdetaan asiakkaan ja palvelimen välillä.

### Mitä näet

Kun palvelimesi käynnistyy oikein, näet:
- Palvelimen ominaisuudet listattuna Inspectorissa
- Työkalut käytettävissä testaukseen
- Onnistuneet JSON-RPC-viestinvälitykset
- Työkalujen vastaukset käyttöliittymässä

### Yleiset ongelmat ja ratkaisut

**Palvelin ei käynnisty:**
- Tarkista, että kaikki riippuvuudet ovat asennettu: `pip install mcp`
- Varmista Python-syntaksi ja sisennykset
- Katso virheilmoituksia konsolista

**Työkaluja ei näy:**
- Varmista, että `@server.tool()` -koristeet ovat käytössä
- Tarkista, että työkalufunktiot on määritelty ennen `main()`-funktiota
- Varmista, että palvelin on oikein konfiguroitu

**Yhteysongelmat:**
- Varmista, että palvelin käyttää stdio-siirtoa oikein
- Tarkista, ettei toiset prosessit häiritse
- Varmista Inspectorin komentojen syntaksi

## Tehtävä

Kokeile laajentaa palvelintasi lisäämällä ominaisuuksia. Katso [tältä sivulta](https://api.chucknorris.io/) esimerkiksi, miten voit lisätä työkalun, joka kutsuu API:a. Sinä päätät, miltä palvelimen pitäisi näyttää. Hauskaa koodausta! :)

## Ratkaisu

[Ratkaisu](./solution/README.md) Tässä on mahdollinen ratkaisu toimivalla koodilla.

## Keskeiset opit

Tämän luvun keskeiset opit:

- Stdio-siirto on suositeltu mekanismi paikallisille MCP-palvelimille.
- Stdio-siirto mahdollistaa saumattoman kommunikaation MCP-palvelinten ja asiakkaiden välillä käyttäen standarditulo- ja -lähtövirtoja.
- Voit käyttää sekä Inspectoria että Visual Studio Codea stdio-palvelinten kuluttamiseen, jolloin virheenkorjaus ja integrointi ovat helppoja.

## Esimerkit

- [Java-laskin](../samples/java/calculator/README.md)
- [.Net-laskin](../../../../03-GettingStarted/samples/csharp)
- [JavaScript-laskin](../samples/javascript/README.md)
- [TypeScript-laskin](../samples/typescript/README.md)
- [Python-laskin](../../../../03-GettingStarted/samples/python)

## Lisäresurssit

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Mitä seuraavaksi

## Seuraavat askeleet

Nyt kun osaat rakentaa MCP-palvelimia stdio-siirtoa käyttäen, voit tutkia edistyneempiä aiheita:

- **Seuraavaksi**: [HTTP Streaming MCP:llä (Streamable HTTP)](../06-http-streaming/README.md) - Tutustu toiseen tukemaamme siirtomekanismiin etäpalvelimia varten
- **Edistynyt**: [MCP:n turvallisuusohjeet](../../02-Security/README.md) - Toteuta turvallisuus MCP-palvelimissasi
- **Tuotantoon**: [Käyttöönotto ja deploytaus](../09-deployment/README.md) - Vienti palvelimesi tuotantokäyttöön

## Lisäresurssit

- [MCP Spesifikaatio 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Virallinen spesifikaatio
- [MCP SDK -dokumentaatio](https://github.com/modelcontextprotocol/sdk) - SDKn viitteet kaikille kielille
- [Yhteisön esimerkit](../../06-CommunityContributions/README.md) - Lisää palvelin-esimerkkejä yhteisöltä

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->