# Virheenkorjaus MCP Inspectorilla

**MCP Inspector** on olennainen virheenkorjaustyökalu, jonka avulla voit interaktiivisesti testata ja selvittää MCP-palvelimiasi ilman tarvetta täysimittaiselle AI-host-sovellukselle. Voit ajatella sitä "Postmanina MCP:lle" – se tarjoaa visuaalisen käyttöliittymän pyyntöjen lähettämiseen, vastausten tarkasteluun ja palvelimen toiminnan ymmärtämiseen.

## Miksi käyttää MCP Inspectoria?

Kun rakennat MCP-palvelimia, kohtaat usein seuraavat haasteet:

- **”Onko palvelimeni edes käynnissä?”** – Inspector näyttää yhteystilan
- **”Ovatko työkaluni rekisteröity oikein?”** – Inspector listaa kaikki saatavilla olevat työkalut
- **”Mikä on vastausmuoto?”** – Inspector näyttää täydelliset JSON-vastaukset
- **”Miksi tämä työkalu ei toimi?”** – Inspector näyttää yksityiskohtaiset virheilmoitukset

## Esivaatimukset

- Node.js 18+ asennettuna
- npm (sisältyy Node.js:ään)
- Testattava MCP-palvelin (katso [Moduuli 3.1 - Ensimmäinen palvelin](../01-first-server/README.md))

## Asennus

### Vaihtoehto 1: Suorita npx:llä (Suositeltu nopeaan testaukseen)

```bash
npx @modelcontextprotocol/inspector
```

### Vaihtoehto 2: Asenna globaalisti

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Vaihtoehto 3: Lisää projektiisi

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Lisää `package.json`-tiedostoon:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Yhteyden muodostaminen palvelimeesi

### stdio-palvelimet (Paikallinen prosessi)

Palvelimille, jotka kommunikoivat standardin sisään- ja ulostulon kautta:

```bash
# Python-palvelin
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js-palvelin
npx @modelcontextprotocol/inspector node ./build/index.js

# Ympäristömuuttujien kanssa
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP-palvelimet (Verkko)

Palvelimille, jotka toimivat HTTP-palveluina:

1. Käynnistä ensin palvelimesi:
   ```bash
   python server.py  # Palvelin käynnissä osoitteessa http://localhost:8080
   ```

2. Käynnistä Inspector ja yhdistä:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Inspectorin käyttöliittymän yleiskatsaus

Kun Inspector käynnistyy, näet verkkokäyttöliittymän (tyypillisesti osoitteessa `http://localhost:5173`):

```
┌─────────────────────────────────────────────────────────────┐
│  MCP Inspector                              [Connected ✅]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   🔧 Tools  │  │ 📄 Resources│  │ 💬 Prompts  │         │
│  │    (3)      │  │    (2)      │  │    (1)      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📋 Message Log                                       │ │
│  │  ─────────────────────────────────────────────────── │ │
│  │  → initialize                                         │ │
│  │  ← initialized (server info)                          │ │
│  │  → tools/list                                         │ │
│  │  ← tools (3 tools)                                    │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Työkalujen testaaminen

### Saatavilla olevien työkalujen listaaminen

1. Klikkaa **Tools**-välilehteä
2. Inspector kutsuu automaattisesti `tools/list`
3. Näet kaikki rekisteröidyt työkalut:
   - Työkalun nimi
   - Kuvaus
   - Tulomuodon skeema (parametrit)

### Työkalun kutsuminen

1. Valitse työkalu listasta
2. Täytä tarvittavat parametrit lomakkeeseen
3. Klikkaa **Run Tool**
4. Näe vastaus tulospaneelissa

**Esimerkki: Laskimen testaaminen**

```
Tool: add
Parameters:
  a: 25
  b: 17

Response:
{
  "content": [
    {
      "type": "text",
      "text": "42"
    }
  ]
}
```

### Työkalun virheiden selvittäminen

Kun työkalu epäonnistuu, Inspector näyttää:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Yleiset virhekoodit:
| Koodi | Merkitys |
|-------|----------|
| -32700 | Jäsentämisvirhe (virheellinen JSON) |
| -32600 | Virheellinen pyyntö |
| -32601 | Metodia ei löydy |
| -32602 | Virheelliset parametrit |
| -32603 | Sisäinen virhe |

---

## Resurssien testaaminen

### Resurssien listaaminen

1. Klikkaa **Resources**-välilehteä
2. Inspector kutsuu `resources/list`
3. Näet:
   - Resurssien URI:t
   - Nimet ja kuvaukset
   - MIME-tyypit

### Resurssin lukeminen

1. Valitse resurssi
2. Klikkaa **Read Resource**
3. Näe palautettu sisältö

**Esimerkkivastaus:**

```
Resource: file:///config/settings.json
Content-Type: application/json

{
  "config": {
    "debug": true,
    "maxConnections": 10
  }
}
```

---

## Kehotteiden testaaminen

### Kehotteiden listaaminen

1. Klikkaa **Prompts**-välilehteä
2. Inspector kutsuu `prompts/list`
3. Näe saatavilla olevat kehote-mallit

### Kehotteen hakeminen

1. Valitse kehote
2. Täytä tarvittaessa argumentit
3. Klikkaa **Get Prompt**
4. Näe renderöidyt kehotteet

---

## Viestilokin analysointi

Viestilokissa näkyvät kaikki MCP-protokollaviestit:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Mitä tarkkailla

- **Pyyntö-/vastausparit**: Jokaisella `→`-merkillä pitäisi olla vastaava `←`
- **Virheilmoitukset**: Etsi vastausten joukosta `"error"`
- **Ajastukset**: Suuret tauot voivat viitata suorituskykyongelmiin
- **Protokollaversio**: Varmista, että palvelin ja asiakas käyttävät samaa versiota

---

## VS Code -integraatio

Voit suorittaa Inspectorin suoraan VS Codesta:

### launch.json:n käyttö

Lisää `.vscode/launch.json`-tiedostoon:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug with MCP Inspector",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npx",
      "runtimeArgs": [
        "@modelcontextprotocol/inspector",
        "python",
        "${workspaceFolder}/server.py"
      ],
      "console": "integratedTerminal"
    },
    {
      "name": "Debug SSE Server with Inspector",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "preLaunchTask": "Start MCP Inspector"
    }
  ]
}
```

### Tasksin käyttö

Lisää `.vscode/tasks.json`-tiedostoon:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npx @modelcontextprotocol/inspector node ${workspaceFolder}/build/index.js",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^$"
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Inspector",
          "endsPattern": "listening"
        }
      }
    }
  ]
}
```

---

## Yleiset virheenkorjaustilanteet

### Tilanne 1: Palvelimeen ei saada yhteyttä

**Oireet:** Inspector näyttää "Disconnected" tai jumittuu tilaan "Connecting..."

**Tarkistuslista:**
1. ✅ Onko palvelinkomento oikein?
2. ✅ Ovatko kaikki riippuvuudet asennettu?
3. ✅ Onko palvelimen polku absoluuttinen tai nykyiseen hakemistoon suhteutettu?
4. ✅ Ovatko tarvittavat ympäristömuuttujat asetettu?

**Virheenetsintä:**
```bash
# Testaa palvelin manuaalisesti ensin
python -c "import your_server_module; print('OK')"

# Tarkista tuontivirheet
python -m your_server_module 2>&1 | head -20

# Varmista, että MCP SDK on asennettu
pip show mcp
```

### Tilanne 2: Työkalut eivät näy

**Oireet:** Työkaluvälilehti näyttää tyhjää listaa

**Mahdolliset syyt:**
1. Työkaluja ei rekisteröity palvelimen käynnistyksen aikana
2. Palvelin kaatui käynnistyksen jälkeen
3. `tools/list`-käsittelijä palauttaa tyhjän taulukon

**Virheenetsintä:**
1. Tarkista viestilokista `tools/list`-vastaus
2. Lisää lokitus työkalujen rekisteröintikoodiin
3. Varmista, että `@mcp.tool()`-koristeet ovat paikallaan (Python)

### Tilanne 3: Työkalu palauttaa virheen

**Oireet:** Työkalukutsu palauttaa virhevastaus

**Virheenetsintätapa:**
1. Lue virheilmoitus huolellisesti
2. Tarkista parametrityyppien yhteensopivuus skeeman kanssa
3. Lisää try/catch-lauseet yksityiskohtaisilla virheilmoituksilla
4. Tarkista palvelinlokit pinon jäljityksiä varten

**Esimerkki parannetusta virheenkäsittelystä:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Työkalun logiikka täällä
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Tilanne 4: Resurssin sisältö on tyhjä

**Oireet:** Resurssi palauttaa, mutta sisältö on tyhjä tai null

**Tarkistuslista:**
1. ✅ Tiedostopolku tai URI on oikein
2. ✅ Palvelimella on oikeudet lukea resurssi
3. ✅ Resurssin sisältö palautuu oikein

---

## Kehittyneet Inspectorin ominaisuudet

### Mukautetut otsikot (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Yksityiskohtainen lokitus

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Istuntojen tallennus

Inspector voi viedä viestilokit myöhempää analyysiä varten:
1. Klikkaa **Export Log** viestipaneelissa
2. Tallenna JSON-tiedosto
3. Jaa tiimin jäsenten kanssa virheenkorjaukseen

---

## Parhaat käytännöt

1. **Testaa aikaisin ja usein** – Käytä Inspectoria kehityksen aikana, ei vain vikatilanteissa
2. **Aloita yksinkertaisesta** – Testaa perusyhteys ennen monimutkaisia työkalukutsuja
3. **Tarkista skeema** – Monet virheet johtuvat parametrityyppien ristiriidoista
4. **Lue virheilmoitukset** – MCP-virheet ovat yleensä kuvaavia
5. **Pidä Inspector auki** – Se auttaa löytämään ongelmat kehityksen aikana

---

## Mitä seuraavaksi

Olet suorittanut Moduulin 3: Aloittaminen! Jatka oppimista:

- [Moduuli 4: Käytännön toteutus](../../04-PracticalImplementation/README.md)

---

## Lisäresurssit

- [MCP Inspector GitHub-repositorio](https://github.com/modelcontextprotocol/inspector)
- [MCP-määritys – Protokollaviestit](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 -määritys](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:  
Tämä asiakirja on käännetty tekoälypohjaisella käännöspalvelulla [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, on hyvä huomioida, että automaattikäännöksissä saattaa esiintyä virheitä tai epätarkkuuksia. Alkuperäinen asiakirja omalla kielellään on aina ensisijainen lähde. Tärkeissä tiedoissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinkäsityksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->