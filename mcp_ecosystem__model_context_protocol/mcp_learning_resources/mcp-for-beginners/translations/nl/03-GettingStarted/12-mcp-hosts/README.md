# Populaire MCP Host Clients Configureren

Deze gids behandelt hoe MCP-servers geconfigureerd en gebruikt kunnen worden met populaire AI-hostapplicaties. Elke host heeft zijn eigen configuratiemethode, maar eenmaal ingesteld communiceren ze allemaal met MCP-servers via het gestandaardiseerde protocol.

## Wat is een MCP Host?

Een **MCP Host** is een AI-applicatie die verbinding kan maken met MCP-servers om zijn mogelijkheden uit te breiden. Zie het als de "voorkant" waarmee gebruikers interactie hebben, terwijl MCP-servers de "achterkant" gereedschappen en data leveren.

```mermaid
flowchart LR
    User[👤 Gebruiker] --> Host[🖥️ MCP Host]
    Host --> S1[MCP Server A]
    Host --> S2[MCP Server B]
    Host --> S3[MCP Server C]
    
    subgraph "Populaire Hosts"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Vereisten

- Een MCP-server om verbinding mee te maken (zie [Module 3.1 - Eerste Server](../01-first-server/README.md))
- De hostapplicatie geïnstalleerd op uw systeem
- Basiskennis van JSON-configuratiebestanden

---

## 1. Claude Desktop

**Claude Desktop** is de officiële desktopapplicatie van Anthropic die MCP native ondersteunt.

### Installatie

1. Download Claude Desktop van [claude.ai/download](https://claude.ai/download)
2. Installeer en meld aan met uw Anthropic-account

### Configuratie

Claude Desktop gebruikt een JSON-configuratiebestand om MCP-servers te definiëren.

**Locatie configuratiebestand:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Voorbeeld configuratie:**

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

### Configuratieopties

| Veld | Beschrijving | Voorbeeld |
|-------|-------------|---------|
| `command` | Het uit te voeren uitvoerbare bestand | `"python"`, `"node"`, `"npx"` |
| `args` | Opdrachtregelargumenten | `["-m", "my_server"]` |
| `env` | Omgevingsvariabelen | `{"API_KEY": "xxx"}` |
| `cwd` | Werkmap | `"/path/to/server"` |

### Testen van uw Setup

1. Sla het configuratiebestand op
2. Herstart Claude Desktop volledig (afsluiten en opnieuw openen)
3. Open een nieuw gesprek
4. Zoek naar het 🔌-pictogram dat verbonden servers aangeeft
5. Probeer Claude een van uw tools te laten gebruiken

### Problemen met Claude Desktop oplossen

**Server verschijnt niet:**
- Controleer de syntaxis van het configuratiebestand met een JSON-validator
- Zorg dat het pad naar het commando correct is
- Controleer de logs van Claude Desktop: Help → Logs weergeven

**Server crasht bij opstarten:**
- Test uw server eerst handmatig in de terminal
- Controleer of omgevingsvariabelen correct zijn ingesteld
- Zorg dat alle afhankelijkheden zijn geïnstalleerd

---

## 2. VS Code met GitHub Copilot

VS Code ondersteunt MCP via GitHub Copilot Chat extensies.

### Vereisten

1. VS Code 1.99+ geïnstalleerd
2. GitHub Copilot extensie geïnstalleerd
3. GitHub Copilot Chat extensie geïnstalleerd

### Configuratie

VS Code gebruikt `.vscode/mcp.json` in uw werkruimte of gebruikersinstellingen.

**Werkruimteconfiguratie** (`.vscode/mcp.json`):

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

**Gebruikersinstellingen** (`settings.json`):

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

### MCP gebruiken in VS Code

1. Open het Copilot Chat-paneel (Ctrl+Shift+I / Cmd+Shift+I)
2. Typ `@` om beschikbare MCP-tools te zien
3. Gebruik natuurlijke taal om tools aan te roepen: "Bereken 25 * 48 met de rekenmachine"

### Problemen met VS Code oplossen

**MCP-servers laden niet:**
- Controleer het Uitvoerpaneel → "MCP" voor foutmeldingen
- Herlaad het venster: Ctrl+Shift+P → "Ontwikkelaar: Venster herladen"
- Controleer eerst of de server zelfstandig draait

---

## 3. Cursor

**Cursor** is een AI-georiënteerde code-editor met ingebouwde MCP-ondersteuning.

### Installatie

1. Download Cursor van [cursor.sh](https://cursor.sh)
2. Installeer en meld aan

### Configuratie

Cursor gebruikt een vergelijkbaar configuratieformaat als Claude Desktop.

**Locatie configuratiebestand:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Voorbeeld configuratie:**

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

### MCP gebruiken in Cursor

1. Open de AI-chat van Cursor (Ctrl+L / Cmd+L)
2. MCP-tools verschijnen automatisch in suggesties
3. Vraag de AI taken uit te voeren met verbonden servers

---

## 4. Cline (Terminalbased)

**Cline** is een terminal-gebaseerde MCP-client, ideaal voor commandoregelworkflows.

### Installatie

```bash
npm install -g @anthropic/cline
```

### Configuratie

Cline gebruikt omgevingsvariabelen en opdrachtregelargumenten.

**Gebruik van omgevingsvariabelen:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Gebruik van opdrachtregelargumenten:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Configuratiebestand** (`~/.clinerc`):

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

### Cline gebruiken

```bash
# Start een interactieve sessie
cline

# Enkele aanvraag met MCP
cline "Calculate the square root of 144 using the calculator"

# Lijst van beschikbare gereedschappen
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** is een andere AI-aangedreven code-editor met MCP-ondersteuning.

### Installatie

1. Download Windsurf van [codeium.com/windsurf](https://codeium.com/windsurf)
2. Installeer en maak een account aan

### Configuratie

Windsurf-configuratie wordt beheerd via de instellingen-UI:

1. Open Instellingen (Ctrl+, / Cmd+,)
2. Zoek op "MCP"
3. Klik op "Bewerken in settings.json"

**Voorbeeld configuratie:**

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

## Vergelijking Transporttypes

Verschillende hosts ondersteunen verschillende transportmechanismen:

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (standaardinvoer/-uitvoer): het beste voor lokale servers gestart door de host  
**SSE/HTTP**: het beste voor externe servers of servers gedeeld tussen meerdere clients

---

## Veelvoorkomende Problemen Oplossen

### Server start niet op

1. **Test de server eerst handmatig:**
   ```bash
   # Voor Python
   python -m your_server_module
   
   # Voor Node.js
   node /path/to/server/index.js
   ```

2. **Controleer het pad naar het commando:**
   - Gebruik indien mogelijk absolute paden
   - Zorg dat het uitvoerbare bestand in uw PATH staat

3. **Verifieer afhankelijkheden:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Server maakt verbinding maar tools werken niet

1. **Controleer serverlogs** - De meeste hosts hebben logopties
2. **Verifieer tool-registratie** - Gebruik MCP Inspector om te testen
3. **Controleer permissies** - Sommige tools hebben bestands-/netwerktoegang nodig

### Omgevingsvariabelen worden niet doorgegeven

- Sommige hosts saneren omgevingsvariabelen
- Gebruik expliciet het `env` configuratieveld
- Vermijd gevoelige gegevens in configuratiebestanden (gebruik geheimbeheer)

---

## Veiligheidsrichtlijnen

1. **Sla nooit API-sleutels op** in configuratiebestanden
2. **Gebruik omgevingsvariabelen** voor gevoelige data
3. **Beperk serverrechten** tot alleen wat strikt noodzakelijk is
4. **Controleer servercode** voordat u toegang tot uw systeem verleent
5. **Gebruik allowlists** voor bestandssysteem- en netwerktoegang

---

## Wat Nu?

- [3.13 - Debuggen met MCP Inspector](../13-mcp-inspector/README.md)
- [3.1 - Maak uw eerste MCP-server](../01-first-server/README.md)
- [Module 5 - Gevorderde Onderwerpen](../../05-AdvancedTopics/README.md)

---

## Extra Bronnen

- [Claude Desktop MCP Documentatie](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [VS Code MCP Extensie](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [MCP Specificatie - Transports](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Officiële MCP Servers Registry](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dit document is vertaald met behulp van de AI-vertalingsservice [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel wij streven naar nauwkeurigheid, kan het voorkomen dat geautomatiseerde vertalingen fouten of onnauwkeurigheden bevatten. Het originele document in de oorspronkelijke taal dient als de gezaghebbende bron te worden beschouwd. Voor belangrijke informatie wordt een professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor misverstanden of verkeerde interpretaties die voortkomen uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->