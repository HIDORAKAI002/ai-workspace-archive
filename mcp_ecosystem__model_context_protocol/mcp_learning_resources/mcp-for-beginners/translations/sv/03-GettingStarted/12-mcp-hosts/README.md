# Konfigurera Populära MCP Host-klienter

Denna guide täcker hur man konfigurerar och använder MCP-servrar med populära AI-host-applikationer. Varje host har sin egen konfigurationsmetod, men när de väl är inställda kommunicerar de alla med MCP-servrar via det standardiserade protokollet.

## Vad är en MCP Host?

En **MCP Host** är en AI-applikation som kan ansluta till MCP-servrar för att utöka sina funktioner. Tänk på det som "front end" som användare interagerar med, medan MCP-servrar tillhandahåller "back end"-verktyg och data.

```mermaid
flowchart LR
    User[👤 Användare] --> Host[🖥️ MCP-värd]
    Host --> S1[MCP-server A]
    Host --> S2[MCP-server B]
    Host --> S3[MCP-server C]
    
    subgraph "Populära värdar"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Förutsättningar

- En MCP-server att ansluta till (se [Modul 3.1 - Första servern](../01-first-server/README.md))
- Host-applikationen installerad på ditt system
- Grundläggande förståelse för JSON-konfigurationsfiler

---

## 1. Claude Desktop

**Claude Desktop** är Anthropics officiella skrivbordsapplikation som har inbyggt stöd för MCP.

### Installation

1. Ladda ner Claude Desktop från [claude.ai/download](https://claude.ai/download)
2. Installera och logga in med ditt Anthropic-konto

### Konfiguration

Claude Desktop använder en JSON-konfigurationsfil för att definiera MCP-servrar.

**Plats för konfigurationsfil:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Exempel på konfiguration:**

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

### Konfigurationsalternativ

| Fält | Beskrivning | Exempel |
|-------|-------------|---------|
| `command` | Körbar fil som ska köras | `"python"`, `"node"`, `"npx"` |
| `args` | Kommandoradsargument | `["-m", "my_server"]` |
| `env` | Miljövariabler | `{"API_KEY": "xxx"}` |
| `cwd` | Arbetskatalog | `"/path/to/server"` |

### Testa din installation

1. Spara konfigurationsfilen
2. Starta om Claude Desktop helt (avsluta och öppna igen)
3. Öppna en ny konversation
4. Leta efter 🔌-ikonen som indikerar anslutna servrar
5. Försök be Claude använda ett av dina verktyg

### Felsök Claude Desktop

**Server dyker inte upp:**
- Kontrollera syntaxen i konfigurationsfilen med en JSON-validator
- Säkerställ att sökvägen till kommandot är korrekt
- Kontrollera Claude Desktop-loggar: Hjälp → Visa loggar

**Server kraschar vid start:**
- Testa din server manuellt i terminalen först
- Kontrollera att miljövariabler är korrekt inställda
- Säkerställ att alla beroenden är installerade

---

## 2. VS Code med GitHub Copilot

VS Code har MCP-stöd via GitHub Copilot Chat-tillägg.

### Förutsättningar

1. VS Code version 1.99+ installerad
2. GitHub Copilot-tillägg installerat
3. GitHub Copilot Chat-tillägg installerat

### Konfiguration

VS Code använder `.vscode/mcp.json` i din arbetsyta eller användarinställningar.

**Arbetsytekonfiguration** (`.vscode/mcp.json`):

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

**Användarinställningar** (`settings.json`):

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

### Använda MCP i VS Code

1. Öppna Copilot Chat-panelen (Ctrl+Shift+I / Cmd+Shift+I)
2. Skriv `@` för att se tillgängliga MCP-verktyg
3. Använd naturligt språk för att anropa verktyg: "Beräkna 25 * 48 med kalkylatorn"

### Felsök VS Code

**MCP-servrar laddas inte:**
- Kontrollera Utdata-panelen → "MCP" för felmeddelanden
- Ladda om fönstret: Ctrl+Shift+P → "Developer: Reload Window"
- Verifiera att servern kan köras fristående först

---

## 3. Cursor

**Cursor** är en AI-fokuserad kodredigerare med inbyggt MCP-stöd.

### Installation

1. Ladda ner Cursor från [cursor.sh](https://cursor.sh)
2. Installera och logga in

### Konfiguration

Cursor använder ett liknande konfigurationsformat som Claude Desktop.

**Plats för konfigurationsfil:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Exempel på konfiguration:**

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

### Använda MCP i Cursor

1. Öppna Cursors AI-chatt (Ctrl+L / Cmd+L)
2. MCP-verktyg visas automatiskt bland förslagen
3. Be AI att utföra uppgifter med anslutna servrar

---

## 4. Cline (Terminalbaserad)

**Cline** är en terminalbaserad MCP-klient, perfekt för kommandoradsflöden.

### Installation

```bash
npm install -g @anthropic/cline
```

### Konfiguration

Cline använder miljövariabler och kommandoradsargument.

**Använd miljövariabler:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Använd kommandoradsargument:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Konfigurationsfil** (`~/.clinerc`):

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

### Använda Cline

```bash
# Starta en interaktiv session
cline

# Enkel förfrågan med MCP
cline "Calculate the square root of 144 using the calculator"

# Lista tillgängliga verktyg
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** är en annan AI-driven kodredigerare med MCP-stöd.

### Installation

1. Ladda ner Windsurf från [codeium.com/windsurf](https://codeium.com/windsurf)
2. Installera och skapa ett konto

### Konfiguration

Windsurf-konfiguration hanteras via inställningsgränssnittet:

1. Öppna Inställningar (Ctrl+, / Cmd+,)
2. Sök efter "MCP"
3. Klicka på "Redigera i settings.json"

**Exempel på konfiguration:**

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

## Jämförelse av transporttyper

Olika hosts stödjer olika transportmekanismer:

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (standard in/ut): Bäst för lokala servrar startade av hosten  
**SSE/HTTP**: Bäst för fjärrservrar eller servrar delade mellan flera klienter

---

## Vanliga felsökningssteg

### Servern startar inte

1. **Testa servern manuellt först:**  
   ```bash
   # För Python
   python -m your_server_module
   
   # För Node.js
   node /path/to/server/index.js
   ```

2. **Kontrollera kommandosökvägen:**  
   - Använd absoluta sökvägar när det är möjligt  
   - Säkerställ att körbar fil finns i din PATH  

3. **Verifiera beroenden:**  
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Server ansluter men verktyg fungerar inte

1. **Kontrollera serverloggar** – De flesta hosts har loggningsalternativ  
2. **Verifiera verktygsregistrering** – Använd MCP Inspector för test  
3. **Kontrollera behörigheter** – Vissa verktyg behöver fil-/nätverksåtkomst

### Miljövariabler vidarebefordras inte

- Vissa hosts filtrerar miljövariabler  
- Använd `env`-konfigurationsfältet explicit  
- Undvik känsliga data i konfigurationsfiler (använd sekretesshantering)

---

## Säkerhetsrekommendationer

1. **Lägg aldrig upp API-nycklar** i konfigurationsfiler  
2. **Använd miljövariabler** för känslig data  
3. **Begränsa serverbehörigheter** till det som behövs  
4. **Granska serverkoden** innan du ger åtkomst till ditt system  
5. **Använd tillåtelselistor** för filsystem- och nätverksåtkomst

---

## Vad händer härnäst

- [3.13 - Felsökning med MCP Inspector](../13-mcp-inspector/README.md)  
- [3.1 - Skapa din första MCP-server](../01-first-server/README.md)  
- [Modul 5 - Avancerade ämnen](../../05-AdvancedTopics/README.md)  

---

## Ytterligare resurser

- [Claude Desktop MCP Dokumentation](https://docs.anthropic.com/en/docs/claude-desktop/mcp)  
- [VS Code MCP Tillägg](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)  
- [MCP-specifikation - Transports](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)  
- [Officiell MCP-serverregister](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:  
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, vänligen notera att automatiska översättningar kan innehålla fel eller felaktigheter. Det ursprungliga dokumentet på dess ursprungliga språk bör anses vara den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för eventuella missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->