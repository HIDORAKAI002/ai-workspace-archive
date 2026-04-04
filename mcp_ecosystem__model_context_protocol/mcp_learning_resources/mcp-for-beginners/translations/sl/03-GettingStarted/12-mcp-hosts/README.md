# Nastavitev priljubljenih MCP gostiteljskih odjemalcev

Ta vodič zajema, kako konfigurirati in uporabljati MCP strežnike s priljubljenimi AI gostiteljskimi aplikacijami. Vsak gostitelj ima svoj pristop do konfiguracije, vendar ko je enkrat nastavljen, vsi komunicirajo z MCP strežniki z uporabo standardiziranega protokola.

## Kaj je MCP gostitelj?

**MCP gostitelj** je AI aplikacija, ki se lahko poveže z MCP strežniki za razširitev svojih zmogljivosti. Lahko si ga predstavljate kot "sprednji del", s katerim uporabniki komunicirajo, medtem ko MCP strežniki zagotavljajo "zadnji del" orodij in podatkov.

```mermaid
flowchart LR
    User[👤 Uporabnik] --> Host[🖥️ MCP Gostitelj]
    Host --> S1[MCP Strežnik A]
    Host --> S2[MCP Strežnik B]
    Host --> S3[MCP Strežnik C]
    
    subgraph "Priljubljeni gostitelji"
        H1[Claude Namizje]
        H2[VS Koda]
        H3[Kursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Predpogoj

- MCP strežnik, na katerega se želite povezati (glejte [Modul 3.1 - Prvi strežnik](../01-first-server/README.md))
- Gostiteljska aplikacija nameščena na vašem sistemu
- Osnovno poznavanje JSON konfiguracijskih datotek

---

## 1. Claude Desktop

**Claude Desktop** je uradna namizna aplikacija podjetja Anthropic, ki nativno podpira MCP.

### Namestitev

1. Prenesite Claude Desktop z [claude.ai/download](https://claude.ai/download)
2. Namestite in se prijavite s svojim Anthropic računom

### Konfiguracija

Claude Desktop uporablja JSON konfiguracijsko datoteko za definicijo MCP strežnikov.

**Lokacija konfiguracijske datoteke:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Primer konfiguracije:**

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

### Možnosti konfiguracije

| Polje | Opis | Primer |
|-------|-------------|---------|
| `command` | Izvršljiva datoteka, ki se zažene | `"python"`, `"node"`, `"npx"` |
| `args` | Argumenti ukazne vrstice | `["-m", "my_server"]` |
| `env` | Spremenljivke okolja | `{"API_KEY": "xxx"}` |
| `cwd` | Delovni imenik | `"/path/to/server"` |

### Testiranje vaše nastavitve

1. Shrani konfiguracijsko datoteko
2. Popolnoma ponovno zaženi Claude Desktop (izhod in ponovno odprtje)
3. Odpri nov pogovor
4. Poišči ikono 🔌, ki označuje povezane strežnike
5. Poskusi vprašati Claude, naj uporabi eno izmed vaših orodij

### Odpravljanje težav pri Claude Desktop

**Strežnik se ne prikaže:**
- Preveri sintakso konfiguracijske datoteke z JSON validatorjem
- Prepričaj se, da je pot do ukaza pravilna
- Preveri dnevnike Claude Desktop: Pomoč → Pokaži dnevnike

**Strežnik se zruši ob zagonu:**
- Najprej testiraj strežnik ročno v terminalu
- Preveri, da so okoljske spremenljivke pravilno nastavljene
- Prepričaj se, da so vse odvisnosti nameščene

---

## 2. VS Code z GitHub Copilot

VS Code podpira MCP preko razširitev GitHub Copilot Chat.

### Predpogoj

1. Nameščen VS Code različice 1.99+
2. Nameščena razširitev GitHub Copilot
3. Nameščena razširitev GitHub Copilot Chat

### Konfiguracija

VS Code uporablja `.vscode/mcp.json` v vaši delovni mapi ali uporabniških nastavitvah.

**Konfiguracija delovnega prostora** (`.vscode/mcp.json`):

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

**Uporabniške nastavitve** (`settings.json`):

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

### Uporaba MCP v VS Code

1. Odpri panel Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
2. Vpiši `@` za prikaz razpoložljivih MCP orodij
3. Uporabi naravni jezik za klic orodij: "Izračunaj 25 * 48 z kalkulatorjem"

### Odpravljanje težav v VS Code

**MCP strežniki se ne nalagajo:**
- Preveri panel Izhod → "MCP" za napake
- Osveži okno: Ctrl+Shift+P → "Developer: Reload Window"
- Najprej preveri, da strežnik teče samostojno

---

## 3. Cursor

**Cursor** je AI-prednostni urejevalnik kode z vgrajeno podporo za MCP.

### Namestitev

1. Prenesi Cursor z [cursor.sh](https://cursor.sh)
2. Namesti in se prijavi

### Konfiguracija

Cursor uporablja podoben format konfiguracije kot Claude Desktop.

**Lokacija konfiguracijske datoteke:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Primer konfiguracije:**

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

### Uporaba MCP v Cursorju

1. Odpri AI klepet Cursorja (Ctrl+L / Cmd+L)
2. MCP orodja se samodejno pojavijo v predlogah
3. Prosite AI, da opravi naloge z uporabo povezanih strežnikov

---

## 4. Cline (na terminalu)

**Cline** je terminalski MCP odjemalec, idealen za ukazno vrstične delovne tokove.

### Namestitev

```bash
npm install -g @anthropic/cline
```

### Konfiguracija

Cline uporablja okoljske spremenljivke in argumente ukazne vrstice.

**Uporaba okoljskih spremenljivk:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Uporaba argumentov ukazne vrstice:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Konfiguracijska datoteka** (`~/.clinerc`):

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

### Uporaba Cline

```bash
# Začni interaktivno sejo
cline

# Enkratna poizvedba z MCP
cline "Calculate the square root of 144 using the calculator"

# Naštej razpoložljiva orodja
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** je še en AI-pogonjen urejevalnik kode z MCP podporo.

### Namestitev

1. Prenesi Windsurf z [codeium.com/windsurf](https://codeium.com/windsurf)
2. Namesti in ustvari račun

### Konfiguracija

Konfiguracijo Windsurfa upravljate preko uporabniškega vmesnika nastavitev:

1. Odpri Nastavitve (Ctrl+, / Cmd+,)
2. Poišči "MCP"
3. Klikni "Uredi v settings.json"

**Primer konfiguracije:**

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

## Primerjava načinov prenosa

Različni gostitelji podpirajo različne mehanizme prenosa:

| Gostitelj | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (standardni vhod/izhod): Najboljši za lokalne strežnike, ki jih zažene gostitelj  
**SSE/HTTP**: Najboljši za oddaljene strežnike ali strežnike, ki jih uporablja več odjemalcev

---

## Pogoste težave

### Strežnik se ne zažene

1. **Najprej preizkusi strežnik ročno:**
   ```bash
   # Za Python
   python -m your_server_module
   
   # Za Node.js
   node /path/to/server/index.js
   ```

2. **Preveri pot do ukaza:**
   - Po možnosti uporabi absolutne poti
   - Prepričaj se, da je izvršljiva datoteka v tvoji poti PATH

3. **Preveri odvisnosti:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Strežnik se poveže, a orodja ne delujejo

1. **Preveri dnevnike strežnika** - Večina gostiteljev ima možnosti dnevnikov
2. **Preveri registracijo orodij** - Za test uporabi MCP Inspector
3. **Preveri dovoljenja** - Nekatera orodja potrebujejo dostop do datotek/mreže

### Okoljske spremenljivke niso posredovane

- Nekateri gostitelji čistijo okoljske spremenljivke
- Uporabi polje `env` za eksplicitno nastavitev
- Izogibaj se občutljivim podatkom v konfiguracijskih datotekah (uporabi upravljanje skrivnosti)

---

## Najboljše varnostne prakse

1. **Nikoli ne dodajaj ključev API** v konfiguracijske datoteke
2. **Uporabi okoljske spremenljivke** za občutljive podatke
3. **Omeji strežniška dovoljenja** le na tisto, kar je potrebno
4. **Preglej strežniško kodo** preden dovoliš dostop do sistema
5. **Uporabi seznami dovoljenih lokacij** za dostop do datotečnega sistema in omrežja

---

## Kaj sledi

- [3.13 - Razhroščevanje z MCP Inspector](../13-mcp-inspector/README.md)
- [3.1 - Ustvari svoj prvi MCP strežnik](../01-first-server/README.md)
- [Modul 5 - Napredne teme](../../05-AdvancedTopics/README.md)

---

## Dodatni viri

- [Claude Desktop MCP dokumentacija](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [VS Code MCP razširitev](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [MCP specifikacija - Prenosi](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Uradni register MCP strežnikov](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo storitve za avtomatski prevod [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas opozarjamo, da avtomatski prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvorni jezik se šteje za zavezujoč vir. Za pomembne informacije priporočamo strokovni človeški prevod. Nismo odgovorni za morebitna nesporazumevanja ali napačne razlage, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->