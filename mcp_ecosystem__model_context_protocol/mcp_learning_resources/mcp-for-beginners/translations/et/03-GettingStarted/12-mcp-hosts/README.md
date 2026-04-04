# Populaarsete MCP host-klientide seadistamine

See juhend käsitleb MCP serverite seadistamist ja kasutamist populaarsete tehisintellekti hostrakendustega. Igal hostil on oma konfiguratsioonimeetod, kuid pärast seadistamist suhtlevad kõik MCP serveritega standardiseeritud protokolli kaudu.

## Mis on MCP host?

**MCP host** on tehisintellekti rakendus, mis saab MCP serveritega ühenduda, et laiendada oma funktsionaalsust. Mõelge sellele kui "esiküljena", millega kasutajad suhtlevad, samal ajal kui MCP serverid pakuvad "tagaküljena" tööriistu ja andmeid.

```mermaid
flowchart LR
    User[👤 Kasutaja] --> Host[🖥️ MCP Host]
    Host --> S1[MCP Server A]
    Host --> S2[MCP Server B]
    Host --> S3[MCP Server C]
    
    subgraph "Populaarsed Hostid"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Eeldused

- MCP server, millega ühenduda (vt [Moodul 3.1 - Esimene server](../01-first-server/README.md))
- Host-rakendus installitud teie süsteemi
- Põhilised teadmised JSON konfiguratsioonifailidest

---

## 1. Claude Desktop

**Claude Desktop** on Anthropici ametlik töölauarakendus, mis toetab MCP-d natiivses vormis.

### Paigaldamine

1. Laadige Claude Desktop alla aadressilt [claude.ai/download](https://claude.ai/download)
2. Installige ja logige sisse oma Anthropic konto abil

### Konfiguratsioon

Claude Desktop kasutab MCP serverite määramiseks JSON konfiguratsioonifaili.

**Konfiguratsioonifaili asukoht:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Näide konfiguratsioonist:**

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

### Konfiguratsioonivalikud

| Välja nimi | Kirjeldus | Näide |
|------------|-----------|--------|
| `command`  | Käivitatav programm | `"python"`, `"node"`, `"npx"` |
| `args`     | Käskluse argumendid | `["-m", "my_server"]` |
| `env`      | Keskkonnamuutujad | `{"API_KEY": "xxx"}` |
| `cwd`      | Töökataloog | `"/path/to/server"` |

### Oma seadistuse testimine

1. Salvestage konfiguratsioonifail
2. Taaskäivitage Claude Desktop täielikult (sulgege ja avage uuesti)
3. Avage uus vestlus
4. Otsige 🔌 ikooni, mis näitab ühendatud servereid
5. Proovige paluda Claudel kasutada mõnda teie tööriista

### Claude Desktopi tõrkeotsing

**Server ei ilmu:**
- Kontrollige konfiguratsioonifaili süntaksit JSON valideerijaga
- Veenduge, et käskluse tee on õige
- Kontrollige Claude Desktopi logisid: Abi → Näita logisid

**Server jookseb käivitamisel kokku:**
- Testige serverit esmalt käsitsi terminalis
- Kontrollige, et keskkonnamuutujad on õigesti seadistatud
- Veenduge, et kõik sõltuvused on installitud

---

## 2. VS Code koos GitHub Copilotiga

VS Code toetab MCP-d GitHub Copilot Chat laienduste kaudu.

### Eeldused

1. VS Code versioon 1.99+ installitud
2. GitHub Copilot laiendus installitud
3. GitHub Copilot Chat laiendus installitud

### Konfiguratsioon

VS Code kasutab `.vscode/mcp.json` faili teie töökeskkonnas või kasutaja seadetes.

**Töökeskkonna konfiguratsioon** (`.vscode/mcp.json`):

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

**Kasutaja seaded** (`settings.json`):

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

### MCP kasutamine VS Code'is

1. Avage Copilot Chat paneel (Ctrl+Shift+I / Cmd+Shift+I)
2. Tippige `@`, et näha saadaolevaid MCP tööriistu
3. Kasutage loomuliku keele käske tööriistade kutsumiseks: "Calculate 25 * 48 using the calculator"

### VS Code tõrkeotsing

**MCP serverid ei laadi:**
- Kontrollige Väljundi paneeli → "MCP" vigade logisid
- Taaslaadige aken: Ctrl+Shift+P → "Developer: Reload Window"
- Veenduge, et server töötab esmalt iseseisvalt

---

## 3. Cursor

**Cursor** on tehisintellekti-keskne koodiredaktor, millel on sisseehitatud MCP tugi.

### Paigaldamine

1. Laadige Cursor alla aadressilt [cursor.sh](https://cursor.sh)
2. Installige ja logige sisse

### Konfiguratsioon

Cursor kasutab sarnast konfiguratsiooniformaati nagu Claude Desktop.

**Konfiguratsioonifaili asukoht:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Näide konfiguratsioonist:**

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

### MCP kasutamine Cursoris

1. Avage Cursori AI vestlus (Ctrl+L / Cmd+L)
2. MCP tööriistad ilmuvad soovitustes automaatselt
3. Paluge tehisintellektil täita ülesandeid ühendatud serverite abil

---

## 4. Cline (terminalipõhine)

**Cline** on terminalipõhine MCP klient, ideaalne käsureatöövoogude jaoks.

### Paigaldamine

```bash
npm install -g @anthropic/cline
```

### Konfiguratsioon

Cline kasutab keskkonnamuutujaid ja käsurea argumente.

**Keskkonnamuutujate kasutamine:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Käsurea argumentide kasutamine:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Konfiguratsioonifail** (`~/.clinerc`):

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

### Cline'i kasutamine

```bash
# Alusta interaktiivset seanssi
cline

# Ühepäringuline MCP-ga
cline "Calculate the square root of 144 using the calculator"

# Kuva saadaolevad tööriistad
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** on veel üks AI-toega koodiredaktor, millel on MCP tugi.

### Paigaldamine

1. Laadige Windsurf alla aadressilt [codeium.com/windsurf](https://codeium.com/windsurf)
2. Installige ja looge konto

### Konfiguratsioon

Windsurf konfiguratsioon toimub seadete kasutajaliidese kaudu:

1. Avage Seaded (Ctrl+, / Cmd+,)
2. Otsige "MCP"
3. Klõpsake "Muuda settings.json'is"

**Näide konfiguratsioonist:**

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

## Ülekande tüüpide võrdlus

Erinevad hostid toetavad erinevaid ülekandemehhanisme:

| Host           | stdio | SSE/HTTP | WebSocket |
|----------------|-------|----------|-----------|
| Claude Desktop | ✅     | ❌        | ❌         |
| VS Code        | ✅     | ✅        | ❌         |
| Cursor         | ✅     | ✅        | ❌         |
| Cline          | ✅     | ✅        | ❌         |
| Windsurf       | ✅     | ✅        | ❌         |

**stdio** (standard sisend/väljund): parim kohalikeks serveriteks, mida host käivitab
**SSE/HTTP**: parim kaugserveriteks või serveriteks, mida jagatakse mitme kliendi vahel

---

## Levinud tõrkeotsing

### Server ei käivitu

1. **Testige serverit esmalt käsitsi:**
   ```bash
   # Pythoniks
   python -m your_server_module
   
   # Node.js-iks
   node /path/to/server/index.js
   ```

2. **Kontrollige käskluse teed:**
   - Kasutage võimalusel absoluutseid teid
   - Veenduge, et käitatav fail on teie PATH-s

3. **Kontrollige sõltuvusi:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Server ühendub, kuid tööriistad ei tööta

1. **Kontrollige serveri logisid** – enamik hoste toetab logimist
2. **Veenduge tööriistade registreerimises** – kasutage MCP Inspectorit testimiseks
3. **Kontrollige õigusi** – mõned tööriistad vajavad faili-/võrguõigusi

### Keskkonnamuutujad ei edastu

- Mõned hostid puhastavad keskkonnamuutujaid
- Kasutage selgelt `env` konfiguratsioonivälja
- Vältige tundlike andmete hoidmistä konfiguratsioonifailides (kasutage saladuste haldust)

---

## Turvalisuse parimad praktikad

1. **Ärge kunagi pange API võtmeid konfiguratsioonifailidesse**
2. **Kasutage tundlike andmete puhul keskkonnamuutujaid**
3. **Piirake serveri õigusi vaid vajalikuga**
4. **Kontrollige serveri koodi enne süsteemile ligipääsu andmist**
5. **Kasutage lubatud nimekirju failisüsteemi ja võrgule ligipääsuks**

---

## Mis järgmiseks

- [3.13 - Silumine MCP Inspectoriga](../13-mcp-inspector/README.md)
- [3.1 - Looge oma esimene MCP server](../01-first-server/README.md)
- [Moodul 5 - Täiustatud teemad](../../05-AdvancedTopics/README.md)

---

## Täiendavad ressursid

- [Claude Desktop MCP dokumentatsioon](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [VS Code MCP laiendus](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [MCP spetsifikatsioon - ülekanded](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Ametlik MCP serverite register](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest loobumine**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi püüame tagada täpsust, võib automaatses tõlkes esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse professionaalset inimtõlget. Me ei vastuta selle tõlke kasutamisest tingitud arusaamatuste või valesti mõistmiste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->