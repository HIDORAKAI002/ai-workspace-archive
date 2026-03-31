# Konfigurere Populære MCP Host-klienter

Denne guiden dekker hvordan du konfigurerer og bruker MCP-servere med populære AI-host-applikasjoner. Hver host har sin egen konfigurasjonsmetode, men når de først er satt opp, kommuniserer de alle med MCP-servere ved hjelp av standardisert protokoll.

## Hva er en MCP Host?

En **MCP Host** er en AI-applikasjon som kan koble til MCP-servere for å utvide sine evner. Tenk på det som "frontend" som brukere interagerer med, mens MCP-servere leverer "backend"-verktøy og data.

```mermaid
flowchart LR
    User[👤 Bruker] --> Host[🖥️ MCP Vert]
    Host --> S1[MCP Server A]
    Host --> S2[MCP Server B]
    Host --> S3[MCP Server C]
    
    subgraph "Populære Verter"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Forutsetninger

- En MCP-server å koble til (se [Module 3.1 - First Server](../01-first-server/README.md))
- Host-applikasjonen installert på systemet ditt
- Grunnleggende kjennskap til JSON-konfigurasjonsfiler

---

## 1. Claude Desktop

**Claude Desktop** er Anthropics offisielle skrivebordsapplikasjon som nativt støtter MCP.

### Installasjon

1. Last ned Claude Desktop fra [claude.ai/download](https://claude.ai/download)
2. Installer og logg inn med din Anthropic-konto

### Konfigurasjon

Claude Desktop bruker en JSON-konfigurasjonsfil for å definere MCP-servere.

**Plassering av konfigurasjonsfil:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Eksempel på konfigurasjon:**

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

### Konfigurasjonsalternativer

| Felt | Beskrivelse | Eksempel |
|-------|-------------|---------|
| `command` | Kjørbar fil som skal kjøres | `"python"`, `"node"`, `"npx"` |
| `args` | Kommandolinjeargumenter | `["-m", "my_server"]` |
| `env` | Miljøvariabler | `{"API_KEY": "xxx"}` |
| `cwd` | Arbeidsmappe | `"/path/to/server"` |

### Teste Oppsettet Ditt

1. Lagre konfigurasjonsfilen
2. Start Claude Desktop helt på nytt (avslutt og åpne på nytt)
3. Åpne en ny samtale
4. Se etter 🔌-ikonet som indikerer tilkoblede servere
5. Prøv å be Claude bruke ett av verktøyene dine

### Feilsøking Claude Desktop

**Server vises ikke:**
- Sjekk syntaks i konfigurasjonsfilen med en JSON-validator
- Sørg for at kommando-vei er korrekt
- Sjekk Claude Desktop-logger: Hjelp → Vis logger

**Server krasjer ved oppstart:**
- Test serveren manuelt i terminal først
- Sjekk at miljøvariabler er riktig satt
- Sørg for at alle avhengigheter er installert

---

## 2. VS Code med GitHub Copilot

VS Code støtter MCP gjennom GitHub Copilot Chat-utvidelser.

### Forutsetninger

1. VS Code 1.99+ installert
2. GitHub Copilot-utvidelsen installert
3. GitHub Copilot Chat-utvidelsen installert

### Konfigurasjon

VS Code bruker `.vscode/mcp.json` i ditt arbeidsområde eller brukerinnstillinger.

**Arbeidsområdekonfigurasjon** (`.vscode/mcp.json`):

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

**Brukerinnstillinger** (`settings.json`):

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

### Bruke MCP i VS Code

1. Åpne Copilot Chat-panelet (Ctrl+Shift+I / Cmd+Shift+I)
2. Skriv `@` for å se tilgjengelige MCP-verktøy
3. Bruk naturlig språk for å påkalle verktøy: "Calculate 25 * 48 using the calculator"

### Feilsøking VS Code

**MCP-servere lastes ikke:**
- Sjekk Output-panelet → "MCP" for feillogger
- Last vinduet på nytt: Ctrl+Shift+P → "Developer: Reload Window"
- Verifiser at serveren kjører stabilt først

---

## 3. Cursor

**Cursor** er en AI-først kodeeditor med innebygd MCP-støtte.

### Installasjon

1. Last ned Cursor fra [cursor.sh](https://cursor.sh)
2. Installer og logg inn

### Konfigurasjon

Cursor bruker tilsvarende konfigurasjonsformat som Claude Desktop.

**Plassering av konfigurasjonsfil:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Eksempel på konfigurasjon:**

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

### Bruke MCP i Cursor

1. Åpne Cursor sin AI-chat (Ctrl+L / Cmd+L)
2. MCP-verktøy vises automatisk i forslagene
3. Be AI utføre oppgaver med de tilkoblede serverne

---

## 4. Cline (Terminal-basert)

**Cline** er en terminal-basert MCP-klient, ideell for kommandolinjearbeid.

### Installasjon

```bash
npm install -g @anthropic/cline
```

### Konfigurasjon

Cline bruker miljøvariabler og kommandolinjeargumenter.

**Bruke miljøvariabler:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Bruke kommandolinjeargumenter:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Konfigurasjonsfil** (`~/.clinerc`):

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

### Bruke Cline

```bash
# Start en interaktiv økt
cline

# Enkeltspørring med MCP
cline "Calculate the square root of 144 using the calculator"

# List tilgjengelige verktøy
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** er en annen AI-drevet kodeeditor med MCP-støtte.

### Installasjon

1. Last ned Windsurf fra [codeium.com/windsurf](https://codeium.com/windsurf)
2. Installer og opprett en konto

### Konfigurasjon

Windsurf-konfigurasjon håndteres via innstillingsgrensesnittet:

1. Åpne Innstillinger (Ctrl+, / Cmd+,)
2. Søk etter "MCP"
3. Klikk "Rediger i settings.json"

**Eksempel på konfigurasjon:**

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

## Transporttyper Sammenligning

Ulike hosts støtter forskjellige transportmekanismer:

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (standard input/output): Best for lokale servere startet av hosten  
**SSE/HTTP**: Best for eksterne servere eller servere delt mellom flere klienter

---

## Vanlig Feilsøking

### Server starter ikke

1. **Test serveren manuelt først:**
   ```bash
   # For Python
   python -m your_server_module
   
   # For Node.js
   node /path/to/server/index.js
   ```

2. **Sjekk kommando-vei:**
   - Bruk absolutte baner når mulig
   - Sørg for at kjørbar fil er i PATH

3. **Verifiser avhengigheter:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Server kobler til, men verktøy fungerer ikke

1. **Sjekk serverlogger** - De fleste hosts har logger
2. **Verifiser verktøyregistrering** - Bruk MCP Inspector for testing
3. **Sjekk tillatelser** - Noen verktøy trenger fil- eller nettverkstilgang

### Miljøvariabler videreføres ikke

- Noen hosts renser miljøvariabler
- Bruk `env` i konfigurasjonen eksplisitt
- Unngå sensitiv data i konfigurasjonsfiler (bruk hemmelighåndtering)

---

## Sikkerhets Beste Praksis

1. **Aldri legg inn API-nøkler** i konfigurasjonsfiler
2. **Bruk miljøvariabler** for sensitiv data
3. **Begrens servertillatelser** til kun det som trengs
4. **Gå gjennom serverkode** før du gir systemtilgang
5. **Bruk tillitslister** for filsystem- og nettverkstilgang

---

## Hva Nå

- [3.13 - Feilsøking med MCP Inspector](../13-mcp-inspector/README.md)
- [3.1 - Lag din første MCP-server](../01-first-server/README.md)
- [Modul 5 - Avanserte Emner](../../05-AdvancedTopics/README.md)

---

## Ekstra Ressurser

- [Claude Desktop MCP Dokumentasjon](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [VS Code MCP-utvidelse](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [MCP Spesifikasjon - Transporter](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Offisiell MCP Server-registrering](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på dets morsmål skal anses som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->