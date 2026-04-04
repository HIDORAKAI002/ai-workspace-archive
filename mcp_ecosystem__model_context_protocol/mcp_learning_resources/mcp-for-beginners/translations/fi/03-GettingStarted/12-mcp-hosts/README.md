# Suosittujen MCP-isäntäasiakkaiden asetukset

Tämä opas käsittelee, miten konfiguroidaan ja käytetään MCP-palvelimia suosituissa tekoälyisäntäohjelmissa. Jokaisella isännällä on oma konfigurointitapansa, mutta asennuksen jälkeen ne kaikki kommunikoivat MCP-palvelimien kanssa standardoidun protokollan avulla.

## Mikä on MCP-isäntä?

**MCP-isäntä** on tekoälysovellus, joka voi yhdistää MCP-palvelimiin laajentaakseen toimintojaan. Se toimii "käyttöliittymänä", jonka kanssa käyttäjät ovat vuorovaikutuksessa, kun taas MCP-palvelimet tarjoavat "taustajärjestelmän" työkaluille ja datalle.

```mermaid
flowchart LR
    User[👤 Käyttäjä] --> Host[🖥️ MCP Isäntä]
    Host --> S1[MCP Palvelin A]
    Host --> S2[MCP Palvelin B]
    Host --> S3[MCP Palvelin C]
    
    subgraph "Suositut Isännät"
        H1[Claude Pöytäkone]
        H2[VS Koodi]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Esivaatimukset

- MCP-palvelin, johon yhdistää (katso [Module 3.1 - First Server](../01-first-server/README.md))
- Isäntäohjelma asennettuna järjestelmääsi
- Perustuntemus JSON-konfiguraatiotiedostoista

---

## 1. Claude Desktop

**Claude Desktop** on Anthropicin virallinen työpöytäsovellus, joka tukee MCP:tä natiivisti.

### Asennus

1. Lataa Claude Desktop osoitteesta [claude.ai/download](https://claude.ai/download)
2. Asenna ja kirjaudu sisään Anthropic-tililläsi

### Konfigurointi

Claude Desktop käyttää MCP-palvelimien määrittelyyn JSON-konfiguraatiotiedostoa.

**Konfiguraatiotiedoston sijainti:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Esimerkkikonfiguraatio:**

```json
{
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"],
      "env": {
        "PYTHONPATH": "/path/to/your/server"
      }
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-server/build/index.js"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

### Konfiguraatioasetukset

| Kenttä | Kuvaus | Esimerkki |
|-------|-------------|---------|
| `command` | Suoritettava komento | `"python"`, `"node"`, `"npx"` |
| `args` | Komentoriviparametrit | `["-m", "my_server"]` |
| `env` | Ympäristömuuttujat | `{"API_KEY": "xxx"}` |
| `cwd` | Työhakemisto | `"/path/to/server"` |

### Asennuksesi testaus

1. Tallenna konfiguraatiotiedosto
2. Käynnistä Claude Desktop kokonaan uudelleen (sulje ja avaa uudelleen)
3. Avaa uusi keskustelu
4. Etsi 🔌-kuvake, joka ilmaisee yhdistetyt palvelimet
5. Kokeile pyytää Claudea käyttämään jotakin työkalua

### Claude Desktopin vianetsintä

**Palvelin ei näy:**
- Tarkista konfiguraatiotiedoston syntaksi JSON-validaattorilla
- Varmista, että komentopolku on oikein
- Tarkista Claude Desktopin lokit: Ohje → Näytä lokit

**Palvelin kaatuu käynnistyksessä:**
- Testaa palvelinta ensin manuaalisesti terminaalissa
- Varmista, että ympäristömuuttujat on asetettu oikein
- Varmista, että kaikki riippuvuudet on asennettu

---

## 2. VS Code GitHub Copilotin kanssa

VS Code tukee MCP:tä GitHub Copilot Chat -laajennusten kautta.

### Esivaatimukset

1. VS Code 1.99+ asennettuna
2. GitHub Copilot -laajennus asennettuna
3. GitHub Copilot Chat -laajennus asennettuna

### Konfigurointi

VS Code käyttää `.vscode/mcp.json` -tiedostoa työtilassa tai käyttäjäasetuksissa.

**Työtilakonfiguraatio** (`.vscode/mcp.json`):

```json
{
  "servers": {
    "my-calculator": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    },
    "my-database": {
      "type": "sse",
      "url": "http://localhost:8080/sse"
    }
  }
}
```

**Käyttäjäasetukset** (`settings.json`):

```json
{
  "mcp.servers": {
    "global-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-memory"]
    }
  },
  "mcp.enableLogging": true
}
```

### MCP:n käyttäminen VS Codessa

1. Avaa Copilot Chat -paneeli (Ctrl+Shift+I / Cmd+Shift+I)
2. Kirjoita `@`, niin näet käytettävissä olevat MCP-työkalut
3. Käytä luonnollista kieltä työkalujen kutsumiseen: "Laske 25 * 48 laskimella"

### VS Coden vianetsintä

**MCP-palvelimet eivät lataudu:**
- Tarkista Tuloste-paneeli → "MCP" virhelokit
- Lataa ikkuna uudelleen: Ctrl+Shift+P → "Developer: Reload Window"
- Varmista, että palvelin toimii itsenäisesti ensin

---

## 3. Cursor

**Cursor** on tekoälykeskeinen koodieditori, jossa on sisäänrakennettu MCP-tuki.

### Asennus

1. Lataa Cursor osoitteesta [cursor.sh](https://cursor.sh)
2. Asenna ja kirjaudu sisään

### Konfigurointi

Cursor käyttää vastaavaa konfiguraatiomuotoa kuin Claude Desktop.

**Konfiguraatiotiedoston sijainti:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Esimerkkikonfiguraatio:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### MCP:n käyttäminen Cursorissa

1. Avaa Cursorin AI-chat (Ctrl+L / Cmd+L)
2. MCP-työkalut tulevat automaattisesti ehdotuksissa esiin
3. Pyydä tekoälyä suorittamaan tehtäviä yhdistettyjen palvelinten avulla

---

## 4. Cline (päätekäyttöliittymä)

**Cline** on päätekäyttöön suunniteltu MCP-asiakas, ihanteellinen komentorivityönkuluille.

### Asennus

```bash
npm install -g @anthropic/cline
```

### Konfigurointi

Cline käyttää ympäristömuuttujia ja komentorivikomentoja.

**Ympäristömuuttujien käyttäminen:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Komentoriviparametrien käyttäminen:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Konfiguraatiotiedosto** (`~/.clinerc`):

```json
{
  "apiKey": "your-api-key",
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    }
  }
}
```

### Clinen käyttäminen

```bash
# Aloita interaktiivinen istunto
cline

# Yksittäinen kysely MCP:llä
cline "Calculate the square root of 144 using the calculator"

# Listaa käytettävissä olevat työkalut
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** on toinen tekoälypohjainen koodieditori, jossa on MCP-tuki.

### Asennus

1. Lataa Windsurf osoitteesta [codeium.com/windsurf](https://codeium.com/windsurf)
2. Asenna ja luo tili

### Konfigurointi

Windsurfin konfigurointi hoidetaan asetusten käyttöliittymän kautta:

1. Avaa asetukset (Ctrl+, / Cmd+,)
2. Hae "MCP"
3. Klikkaa "Muokkaa tiedostossa settings.json"

**Esimerkkikonfiguraatio:**

```json
{
  "windsurf.mcp.servers": {
    "my-tools": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {}
    }
  },
  "windsurf.mcp.enabled": true
}
```

---

## Kuljetustyyppien vertailu

Eri isännät tukevat erilaisia kuljetusmenetelmiä:

| Isäntä | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (standard input/output): Paras paikallisille palvelimille, jotka isäntä käynnistää  
**SSE/HTTP**: Paras etäpalvelimille tai monen asiakkaan yhteiskäytössä

---

## Yleinen vianetsintä

### Palvelin ei käynnisty

1. **Testaa palvelin ensin manuaalisesti:**
   ```bash
   # Pythonille
   python -m your_server_module
   
   # Node.js:lle
   node /path/to/server/index.js
   ```

2. **Tarkista komentopolku:**
   - Käytä aina mahdollisuuksien mukaan absoluuttisia polkuja
   - Varmista, että suoritettava tiedosto löytyy PATHista

3. **Tarkista riippuvuudet:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Palvelin yhdistyy mutta työkalut eivät toimi

1. **Tarkista palvelimen lokit** - useimmissa isännissä on lokitusvaihtoehdot
2. **Varmista työkalujen rekisteröinti** - käytä MCP Inspector -työkalua testaamiseen
3. **Tarkista käyttöoikeudet** - jotkut työkalut vaativat tiedosto- tai verkko-oikeuksia

### Ympäristömuuttujat eivät siirry

- Jotkin isännät puhdistavat ympäristömuuttujat
- Käytä `env`-konfiguraatiokohtaa eksplisiittisesti
- Vältä arkaluontoisten tietojen tallentamista konfiguraatioihin (käytä salaisuudenhallintaa)

---

## Turvallisuuden parhaat käytännöt

1. **Älä koskaan tallenna API-avaimia konfiguraatiotiedostoihin**
2. **Käytä ympäristömuuttujia arkaluontoisille tiedoille**
3. **Rajoita palvelimen oikeudet vain tarvittavaan**
4. **Tarkista palvelimen koodi ennen pääsyn myöntämistä järjestelmääsi**
5. **Käytä sallintalistoja tiedostojärjestelmän ja verkon käyttöön**

---

## Mitä seuraavaksi

- [3.13 - Debugging with MCP Inspector](../13-mcp-inspector/README.md)
- [3.1 - Create your first MCP server](../01-first-server/README.md)
- [Module 5 - Advanced Topics](../../05-AdvancedTopics/README.md)

---

## Lisäresurssit

- [Claude Desktop MCP Documentation](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [VS Code MCP Extension](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [MCP Specification - Transports](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Official MCP Servers Registry](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:  
Tämä asiakirja on käännetty tekoälypohjaisella käännöspalvelulla [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, automaattisissa käännöksissä saattaa esiintyä virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä tulee pitää virallisena lähteenä. Tärkeissä tiedoissa suositellaan ammattimaisen ihmiskääntäjän käyttöä. Emme ole vastuussa tämän käännöksen käytöstä johtuvista väärinymmärryksistä tai tulkintavirheistä.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->