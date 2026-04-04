# Nastavenie populárnych MCP host klientov

Tento sprievodca popisuje, ako nakonfigurovať a používať MCP servery s populárnymi AI hosťovskými aplikáciami. Každý host má svoj vlastný spôsob konfigurácie, ale po nastavení všetky komunikujú s MCP servermi pomocou štandardizovaného protokolu.

## Čo je MCP Host?

**MCP Host** je AI aplikácia, ktorá sa môže pripojiť k MCP serverom, aby rozšírila svoje schopnosti. Predstavte si ho ako „front end“, s ktorým používateľ interaguje, zatiaľ čo MCP servery poskytujú „back end“ nástroje a údaje.

```mermaid
flowchart LR
    User[👤 Používateľ] --> Host[🖥️ MCP Hostiteľ]
    Host --> S1[MCP Server A]
    Host --> S2[MCP Server B]
    Host --> S3[MCP Server C]
    
    subgraph "Populárni hostitelia"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Predpoklady

- MCP server, ku ktorému sa pripojíte (pozri [Modul 3.1 - Prvý server](../01-first-server/README.md))
- Hosťovská aplikácia nainštalovaná vo vašom systéme
- Základná znalosť JSON konfiguračných súborov

---

## 1. Claude Desktop

**Claude Desktop** je oficiálna desktopová aplikácia od Anthropic, ktorá natívne podporuje MCP.

### Inštalácia

1. Stiahnite si Claude Desktop z [claude.ai/download](https://claude.ai/download)
2. Nainštalujte a prihláste sa pomocou svojho účtu Anthropic

### Konfigurácia

Claude Desktop používa JSON konfiguračný súbor na definovanie MCP serverov.

**Umiestnenie konfiguračného súboru:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Príklad konfigurácie:**

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

### Konfiguračné možnosti

| Pole | Popis | Príklad |
|-------|-------------|---------|
| `command` | Spustiteľný súbor, ktorý sa má spustiť | `"python"`, `"node"`, `"npx"` |
| `args` | Argumenty príkazového riadku | `["-m", "my_server"]` |
| `env` | Premenné prostredia | `{"API_KEY": "xxx"}` |
| `cwd` | Pracovný adresár | `"/path/to/server"` |

### Testovanie nastavenia

1. Uložte konfiguračný súbor
2. Úplne reštartujte Claude Desktop (ukončite a znovu otvorte)
3. Otvorte nový rozhovor
4. Vyhľadajte ikonu 🔌 indikujúcu pripojené servery
5. Skúste požiadať Clauda, aby použil jeden z vašich nástrojov

### Riešenie problémov s Claude Desktop

**Server sa nezobrazuje:**
- Skontrolujte syntax konfiguračného súboru pomocou JSON validátora
- Uistite sa, že cesta ku príkazu je správna
- Skontrolujte logy Claude Desktop: Pomoc → Zobraziť logy

**Server padá pri spustení:**
- Najprv si server otestujte manuálne v termináli
- Skontrolujte, či sú premenné prostredia správne nastavené
- Uistite sa, že všetky závislosti sú nainštalované

---

## 2. VS Code s GitHub Copilot

VS Code podporuje MCP cez rozšírenie GitHub Copilot Chat.

### Predpoklady

1. Nainštalovaný VS Code verzia 1.99+
2. Nainštalované rozšírenie GitHub Copilot
3. Nainštalované rozšírenie GitHub Copilot Chat

### Konfigurácia

VS Code používa `.vscode/mcp.json` v pracovnom priestore alebo používateľských nastaveniach.

**Konfigurácia pracovného priestoru** (`.vscode/mcp.json`):

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

**Používateľské nastavenia** (`settings.json`):

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

### Používanie MCP vo VS Code

1. Otvorte panel Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
2. Napíšte `@` pre zobrazenie dostupných MCP nástrojov
3. Použite prirodzený jazyk na vyvolanie nástrojov: „Vypočítaj 25 * 48 pomocou kalkulačky“

### Riešenie problémov vo VS Code

**MCP servery sa nenačítavajú:**
- Skontrolujte panel Výstup → „MCP“ pre chybové logy
- Obnovte okno: Ctrl+Shift+P → „Developer: Reload Window“
- Overte, že server funguje samostatne

---

## 3. Cursor

**Cursor** je kódovací editor orientovaný na AI s natívnou podporou MCP.

### Inštalácia

1. Stiahnite Cursor z [cursor.sh](https://cursor.sh)
2. Nainštalujte a prihláste sa

### Konfigurácia

Cursor používa podobný formát konfigurácie ako Claude Desktop.

**Umiestnenie konfiguračného súboru:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Príklad konfigurácie:**

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

### Používanie MCP v Cursor

1. Otvorte AI chat Cursor (Ctrl+L / Cmd+L)
2. MCP nástroje sa automaticky zobrazia v návrhoch
3. Požiadajte AI, aby vykonal úlohy pomocou pripojených serverov

---

## 4. Cline (terminálový)

**Cline** je terminálový MCP klient, ideálny pre prácu v príkazovom riadku.

### Inštalácia

```bash
npm install -g @anthropic/cline
```

### Konfigurácia

Cline používa premenné prostredia a argumenty príkazového riadku.

**Použitie premenných prostredia:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Použitie argumentov príkazového riadku:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Konfiguračný súbor** (`~/.clinerc`):

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

### Použitie Cline

```bash
# Začať interaktívnu reláciu
cline

# Jediný dopyt s MCP
cline "Calculate the square root of 144 using the calculator"

# Zoznam dostupných nástrojov
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** je ďalší AI-poháňaný kódovací editor s podporou MCP.

### Inštalácia

1. Stiahnite Windsurf z [codeium.com/windsurf](https://codeium.com/windsurf)
2. Nainštalujte a vytvorte účet

### Konfigurácia

Windsurf konfigurácia je spravovaná cez UI nastavení:

1. Otvorte Nastavenia (Ctrl+, / Cmd+,)
2. Vyhľadajte „MCP“
3. Kliknite na „Upraviť v settings.json“

**Príklad konfigurácie:**

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

## Porovnanie typov transportov

Rôzni hostitelia podporujú rôzne typy transportu:

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (štandardný vstup/výstup): Najlepšie pre lokálne servery spustené hostiteľom  
**SSE/HTTP**: Najlepšie pre vzdialené servery alebo serveri zdieľané medzi viacerými klientmi

---

## Bežné riešenie problémov

### Server sa nespustí

1. **Najprv otestujte server manuálne:**
   ```bash
   # Pre Python
   python -m your_server_module
   
   # Pre Node.js
   node /path/to/server/index.js
   ```

2. **Skontrolujte cestu ku príkazu:**
   - Používajte absolútne cesty, keď je to možné
   - Uistite sa, že spustiteľný súbor je v PATH

3. **Overte závislosti:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Server sa pripojí, ale nástroje nefungujú

1. **Skontrolujte logy servera** - Väčšina hostiteľov poskytuje možnosti logovania  
2. **Overte registráciu nástrojov** - Použite MCP Inspector na testovanie  
3. **Skontrolujte oprávnenia** - Niektoré nástroje vyžadujú prístup k súborom/sieti

### Premenné prostredia sa neprenášajú

- Niektoré hostiteľské aplikácie čistia premenné prostredia  
- Výslovne použite pole `env` v konfigurácii  
- Vyhýbajte sa citlivým údajom v konfiguračných súboroch (používajte správu tajomstiev)

---

## Bezpečnostné odporúčania

1. **Nikdy nezverejňujte API kľúče** v konfiguračných súboroch  
2. **Používajte premenné prostredia** pre citlivé údaje  
3. **Obmedzte oprávnenia servera** len na nevyhnutné  
4. **Revidujte kód servera** pred udelením prístupu k systému  
5. **Používajte zoznamy povolených položiek** pre prístup k súborovému systému a sieti

---

## Čo ďalej

- [3.13 - Ladenie s MCP Inspector](../13-mcp-inspector/README.md)  
- [3.1 - Vytvorte svoj prvý MCP server](../01-first-server/README.md)  
- [Modul 5 - Pokročilé témy](../../05-AdvancedTopics/README.md)

---

## Ďalšie zdroje

- [Claude Desktop MCP dokumentácia](https://docs.anthropic.com/en/docs/claude-desktop/mcp)  
- [VS Code MCP rozšírenie](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)  
- [MCP špecifikácia - Transporty](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)  
- [Oficiálny register MCP serverov](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Aj keď sa snažíme o presnosť, majte prosím na pamäti, že automatizované preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho originálnom jazyku by mal byť považovaný za autoritatívny zdroj. Pri kritických informáciách sa odporúča odborný ľudský preklad. Nezodpovedáme za žiadne nedorozumenia alebo nesprávne výklady vyplývajúce z používania tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->