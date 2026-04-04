# Postavljanje popularnih MCP klijentskih aplikacija

Ovaj vodič pokriva kako konfigurirati i koristiti MCP servere s popularnim AI host aplikacijama. Svaki host ima svoj pristup konfiguraciji, no jednom postavljeni, svi komuniciraju s MCP serverima koristeći standardizirani protokol.

## Što je MCP Host?

**MCP Host** je AI aplikacija koja se može povezati na MCP servere kako bi proširila svoje mogućnosti. Zamislite ga kao "prednji kraj" s kojim korisnici komuniciraju, dok MCP serveri pružaju "stražnji kraj" alate i podatke.

```mermaid
flowchart LR
    User[👤 Korisnik] --> Host[🖥️ MCP Domaćin]
    Host --> S1[MCP Poslužitelj A]
    Host --> S2[MCP Poslužitelj B]
    Host --> S3[MCP Poslužitelj C]
    
    subgraph "Popularni domaćini"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Preduvjeti

- MCP server na koji se možete povezati (pogledajte [Modul 3.1 - Prvi server](../01-first-server/README.md))
- Host aplikacija instalirana na vašem sustavu
- Osnovno poznavanje JSON konfiguracijskih datoteka

---

## 1. Claude Desktop

**Claude Desktop** je službena desktop aplikacija tvrtke Anthropic koja nativno podržava MCP.

### Instalacija

1. Preuzmite Claude Desktop s [claude.ai/download](https://claude.ai/download)
2. Instalirajte i prijavite se sa svojim Anthropic računom

### Konfiguracija

Claude Desktop koristi JSON konfiguracijsku datoteku za definiranje MCP servera.

**Lokacija konfiguracijske datoteke:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Primjer konfiguracije:**

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

### Opcije konfiguracije

| Polje | Opis | Primjer |
|-------|-------------|---------|
| `command` | Izvršna datoteka za pokretanje | `"python"`, `"node"`, `"npx"` |
| `args` | Argumenti naredbenog retka | `["-m", "my_server"]` |
| `env` | Varijable okoline | `{"API_KEY": "xxx"}` |
| `cwd` | Radni direktorij | `"/path/to/server"` |

### Testiranje postavki

1. Spremite konfiguracijsku datoteku
2. Potpuno ponovno pokrenite Claude Desktop (zatvorite i ponovno otvorite)
3. Otvorite novi razgovor
4. Potražite ikonu 🔌 koja označava povezane servere
5. Pokušajte zamoliti Claudea da koristi jedan od vaših alata

### Rješavanje problema s Claude Desktop

**Server se ne pojavljuje:**
- Provjerite sintaksu konfiguracijske datoteke s JSON validatorom
- Provjerite je li putanja naredbe točna
- Provjerite zapise Claude Desktopa: Pomoć → Prikaži zapise

**Server se ruši pri pokretanju:**
- Prvo ručno testirajte server u terminalu
- Provjerite jesu li varijable okoline ispravno postavljene
- Osigurajte da su sve ovisnosti instalirane

---

## 2. VS Code s GitHub Copilot

VS Code podržava MCP putem ekstenzija GitHub Copilot Chat.

### Preduvjeti

1. Instaliran VS Code verzije 1.99 ili više
2. Instalirana GitHub Copilot ekstenzija
3. Instalirana GitHub Copilot Chat ekstenzija

### Konfiguracija

VS Code koristi `.vscode/mcp.json` u vašem radnom prostoru ili korisničkim postavkama.

**Konfiguracija radnog prostora** (`.vscode/mcp.json`):

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

**Korisničke postavke** (`settings.json`):

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

### Korištenje MCP u VS Code

1. Otvorite panel Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
2. Upisujete `@` za prikaz dostupnih MCP alata
3. Koristite prirodni jezik za pozivanje alata: "Izračunaj 25 * 48 koristeći kalkulator"

### Rješavanje problema u VS Code

**MCP serveri se ne učitavaju:**
- Provjerite Output panel → "MCP" za zapis pogrešaka
- Ponovno učitajte prozor: Ctrl+Shift+P → "Developer: Reload Window"
- Provjerite da se server samostalno pokreće

---

## 3. Cursor

**Cursor** je AI-prvi uređivač koda s ugrađenom podrškom za MCP.

### Instalacija

1. Preuzmite Cursor s [cursor.sh](https://cursor.sh)
2. Instalirajte i prijavite se

### Konfiguracija

Cursor koristi sličan format konfiguracije kao Claude Desktop.

**Lokacija konfiguracijske datoteke:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Primjer konfiguracije:**

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

### Korištenje MCP u Cursoru

1. Otvorite AI chat u Cursoru (Ctrl+L / Cmd+L)
2. MCP alati se automatski pojavljuju u prijedlozima
3. Zamolite AI da izvrši zadatke koristeći povezane servere

---

## 4. Cline (baziran na terminalu)

**Cline** je MCP klijent baziran na terminalu, idealan za radne tokove iz komandne linije.

### Instalacija

```bash
npm install -g @anthropic/cline
```

### Konfiguracija

Cline koristi varijable okoline i argumente naredbenog retka.

**Korištenje varijabli okoline:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Korištenje argumenata naredbenog retka:**

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

### Korištenje Cline

```bash
# Pokreni interaktivnu sesiju
cline

# Pojedinačni upit s MCP-om
cline "Calculate the square root of 144 using the calculator"

# Prikaži dostupne alate
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** je još jedan uređivač koda s AI podrškom za MCP.

### Instalacija

1. Preuzmite Windsurf s [codeium.com/windsurf](https://codeium.com/windsurf)
2. Instalirajte i kreirajte račun

### Konfiguracija

Konfiguracija Windsurfa upravlja se kroz korisničko sučelje postavki:

1. Otvorite Postavke (Ctrl+, / Cmd+,)
2. Potražite "MCP"
3. Kliknite "Uredi u settings.json"

**Primjer konfiguracije:**

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

## Usporedba tipova prijenosa

Različiti hostovi podržavaju različite mehanizme prijenosa:

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (standardni ulaz/izlaz): Najbolje za lokalne servere pokrenute od strane hosta  
**SSE/HTTP**: Najbolje za udaljene servere ili servere zajedničke za više klijenata

---

## Često riješavanje problema

### Server se ne pokreće

1. **Prvo testirajte server ručno:**
   ```bash
   # Za Python
   python -m your_server_module
   
   # Za Node.js
   node /path/to/server/index.js
   ```

2. **Provjerite putanju naredbe:**
   - Koristite apsolutne putove gdje je moguće
   - Provjerite je li izvršna datoteka u PATH-u

3. **Provjerite ovisnosti:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Server se poveže, ali alati ne rade

1. **Provjerite zapise servera** - Većina hostova ima opcije za zapisivanje
2. **Provjerite registraciju alata** - Koristite MCP Inspector za testiranje
3. **Provjerite dozvole** - Neki alati zahtijevaju pristup datotekama/mreži

### Varijable okoline nisu proslijeđene

- Neki hostovi sanitiziraju varijable okoline
- Izričito koristite `env` polje u konfiguraciji
- Izbjegavajte osjetljive podatke u konfiguracijskim datotekama (koristite upravljanje tajnama)

---

## Sigurnosne najbolje prakse

1. **Nikada ne spremate API ključeve** u konfiguracijske datoteke
2. **Koristite varijable okoline** za osjetljive podatke
3. **Ograničite dozvole servera** samo na potrebne
4. **Pregledajte kod servera** prije nego što dozvolite pristup vašem sustavu
5. **Koristite popise dopuštenih pristupa** za datotečni sustav i mrežu

---

## Što slijedi

- [3.13 - Debugging uz MCP Inspector](../13-mcp-inspector/README.md)
- [3.1 - Kreirajte svoj prvi MCP server](../01-first-server/README.md)
- [Modul 5 - Napredne teme](../../05-AdvancedTopics/README.md)

---

## Dodatni izvori

- [Claude Desktop MCP dokumentacija](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [VS Code MCP ekstenzija](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [MCP specifikacija - prijenosi](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Službeni MCP registar servera](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Izjava o ograničenju odgovornosti**:
Ovaj dokument je preveden pomoću AI usluge za prijevod [Co-op Translator](https://github.com/Azure/co-op-translator). Iako nastojimo postići točnost, imajte na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporučuje se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakve nesporazume ili kriva tumačenja koja proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->