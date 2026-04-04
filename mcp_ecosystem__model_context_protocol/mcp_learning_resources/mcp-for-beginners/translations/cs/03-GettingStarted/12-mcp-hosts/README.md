# Nastavení populárních klientů MCP hostitelů

Tento průvodce pokrývá, jak nakonfigurovat a používat MCP servery s populárními aplikacemi pro hostování AI. Každý hostitel má svůj vlastní způsob konfigurace, ale jakmile jsou nastaveny, všechny komunikují se servery MCP pomocí standardizovaného protokolu.

## Co je MCP Hostitel?

**MCP Hostitel** je AI aplikace, která se může připojit k MCP serverům, aby rozšířila své schopnosti. Představte si ji jako „front end“, se kterým uživatelé komunikují, zatímco servery MCP poskytují „back end“ nástroje a data.

```mermaid
flowchart LR
    User[👤 Uživatel] --> Host[🖥️ MCP Hostitel]
    Host --> S1[MCP Server A]
    Host --> S2[MCP Server B]
    Host --> S3[MCP Server C]
    
    subgraph "Oblíbení hostitelé"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Požadavky

- MCP server pro připojení (viz [Modul 3.1 - První server](../01-first-server/README.md))
- Hostitelská aplikace nainstalovaná ve vašem systému
- Základní znalost konfiguračních souborů JSON

---

## 1. Claude Desktop

**Claude Desktop** je oficiální desktopová aplikace od Anthropic, která nativně podporuje MCP.

### Instalace

1. Stáhněte Claude Desktop z [claude.ai/download](https://claude.ai/download)
2. Nainstalujte a přihlaste se pomocí svého účtu Anthropic

### Konfigurace

Claude Desktop používá JSON konfigurační soubor pro definici MCP serverů.

**Umístění konfiguračního souboru:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Příklad konfigurace:**

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

### Konfigurační možnosti

| Pole | Popis | Příklad |
|-------|--------|---------|
| `command` | Spustitelný soubor pro spuštění | `"python"`, `"node"`, `"npx"` |
| `args` | Argumenty příkazové řádky | `["-m", "my_server"]` |
| `env` | Proměnné prostředí | `{"API_KEY": "xxx"}` |
| `cwd` | Pracovní adresář | `"/path/to/server"` |

### Testování nastavení

1. Uložte konfigurační soubor
2. Kompletně restartujte Claude Desktop (ukončete a znovu otevřete)
3. Otevřete nový rozhovor
4. Hledejte ikonu 🔌 signalizující připojené servery
5. Zkuste požádat Claude o použití jednoho z vašich nástrojů

### Řešení problémů s Claude Desktop

**Server se nezobrazuje:**
- Zkontrolujte syntaxi souboru s JSON validátorem
- Ujistěte se, že cesta ke spuštěcímu souboru je správná
- Prohlédněte si logy Claude Desktop: Nápověda → Zobrazit logy

**Server padá při spuštění:**
- Nejprve otestujte server manuálně v terminálu
- Zkontrolujte správné nastavení proměnných prostředí
- Ujistěte se, že jsou nainstalovány všechny závislosti

---

## 2. VS Code s GitHub Copilot

VS Code podporuje MCP prostřednictvím rozšíření GitHub Copilot Chat.

### Požadavky

1. Nainstalovaný VS Code verze 1.99+
2. Nainstalované rozšíření GitHub Copilot
3. Nainstalované rozšíření GitHub Copilot Chat

### Konfigurace

VS Code používá `.vscode/mcp.json` ve vašem pracovním prostoru nebo uživatelském nastavení.

**Konfigurace pracovního prostoru** (`.vscode/mcp.json`):

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

**Uživatelská nastavení** (`settings.json`):

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

### Používání MCP ve VS Code

1. Otevřete panel Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
2. Napište `@` pro zobrazení dostupných MCP nástrojů
3. Použijte přirozený jazyk k vyvolání nástrojů: „Spočítej 25 * 48 pomocí kalkulačky“

### Řešení problémů VS Code

**MCP servery se nenačítají:**
- Zkontrolujte panel Výstup → „MCP“ pro chybové zprávy
- Přejděte na příkazové okno: Ctrl+Shift+P → „Developer: Reload Window“
- Ověřte, že server funguje samostatně

---

## 3. Cursor

**Cursor** je editor kódu orientovaný na AI s vestavěnou podporou MCP.

### Instalace

1. Stáhněte Cursor z [cursor.sh](https://cursor.sh)
2. Nainstalujte a přihlaste se

### Konfigurace

Cursor používá podobný formát konfigurace jako Claude Desktop.

**Umístění konfiguračního souboru:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Příklad konfigurace:**

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

### Používání MCP v Cursor

1. Otevřete AI chat v Cursor (Ctrl+L / Cmd+L)
2. MCP nástroje se automaticky zobrazí v návrzích
3. Požádejte AI o provedení úkolů pomocí připojených serverů

---

## 4. Cline (terminálový)

**Cline** je terminálový MCP klient, ideální pro příkazovou řádku.

### Instalace

```bash
npm install -g @anthropic/cline
```

### Konfigurace

Cline používá proměnné prostředí a argumenty příkazové řádky.

**Použití proměnných prostředí:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Použití argumentů příkazové řádky:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Konfigurační soubor** (`~/.clinerc`):

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

### Používání Cline

```bash
# Spustit interaktivní relaci
cline

# Jediný dotaz s MCP
cline "Calculate the square root of 144 using the calculator"

# Vypsat dostupné nástroje
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** je další editor kódu s podporou AI a MCP.

### Instalace

1. Stáhněte Windsurf z [codeium.com/windsurf](https://codeium.com/windsurf)
2. Nainstalujte a vytvořte účet

### Konfigurace

Konfigurace Windsurf se spravuje přes uživatelské rozhraní nastavení:

1. Otevřete Nastavení (Ctrl+, / Cmd+,)
2. Vyhledejte „MCP“
3. Klikněte na „Upravit v settings.json“

**Příklad konfigurace:**

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

## Porovnání typů transportů

Různí hostitelé podporují různé transportní mechanismy:

| Hostitel | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (standardní vstup/výstup): Nejlepší pro lokální servery spuštěné hostitelem  
**SSE/HTTP**: Nejlepší pro vzdálené servery nebo servery sdílené mezi více klienty

---

## Běžné řešení problémů

### Server se nespustí

1. **Nejprve server otestujte manuálně:**
   ```bash
   # Pro Python
   python -m your_server_module
   
   # Pro Node.js
   node /path/to/server/index.js
   ```

2. **Zkontrolujte cestu ke spuštěcímu souboru:**
   - Používejte co nejvíce absolutní cesty
   - Ujistěte se, že spustitelný soubor je v PATH

3. **Ověřte závislosti:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Server se připojí, ale nástroje nefungují

1. **Zkontrolujte logy serveru** – většina hostitelů má možnosti logování  
2. **Ověřte registraci nástrojů** – použijte MCP Inspector k testu  
3. **Zkontrolujte oprávnění** – některé nástroje potřebují přístup k souborům/síti

### Proměnné prostředí nejsou předány

- Někteří hostitelé čistí proměnné prostředí
- Explicitně použijte pole `env` v konfiguraci
- Vyhněte se citlivým datům v konfiguračních souborech (používejte správu tajemství)

---

## Bezpečnostní doporučení

1. **Nikdy nezveřejňujte API klíče v konfiguračních souborech**
2. **Používejte proměnné prostředí pro citlivá data**
3. **Omezte oprávnění serveru na nezbytné minimum**
4. **Zkontrolujte kód serveru před udělením přístupu k systému**
5. **Používejte seznamy povolených přístupů k souborům a síti**

---

## Co dál

- [3.13 - Ladění s MCP Inspectorem](../13-mcp-inspector/README.md)
- [3.1 - Vytvoření prvního MCP serveru](../01-first-server/README.md)
- [Modul 5 - Pokročilá témata](../../05-AdvancedTopics/README.md)

---

## Další zdroje

- [Dokumentace MCP pro Claude Desktop](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [Rozšíření MCP pro VS Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [Specifikace MCP - Transporty](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Oficiální registr MCP serverů](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:  
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). I když usilujeme o přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Původní dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro důležité informace doporučujeme profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné výklady vyplývající z použití tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->