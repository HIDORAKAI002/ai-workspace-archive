# Pagsasaayos ng Mga Sikat na MCP Host Client

Sinasaklaw ng gabay na ito kung paano ikonpigurasyon at gamitin ang mga MCP server gamit ang mga sikat na AI host na aplikasyon. Bawat host ay may sariling pamamaraan ng pagkokonekta, ngunit kapag naayos na, lahat sila ay nakikipag-ugnayan sa mga MCP server gamit ang pormalisadong protocol.

## Ano ang MCP Host?

Ang **MCP Host** ay isang AI na aplikasyon na maaaring kumonekta sa mga MCP server upang palawakin ang mga kakayahan nito. Isipin ito bilang "harapang bahagi" na kinakausap ng mga gumagamit, habang ang mga MCP server ang nagbibigay ng mga kasangkapang "likod na bahagi" at datos.

```mermaid
flowchart LR
    User[👤 Gumagamit] --> Host[🖥️ MCP Host]
    Host --> S1[MCP Server A]
    Host --> S2[MCP Server B]
    Host --> S3[MCP Server C]
    
    subgraph "Mga Sikat na Host"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Mga Kinakailangan

- Isang MCP server na pagkakakonektaan (tingnan ang [Module 3.1 - First Server](../01-first-server/README.md))
- Ang host na aplikasyon na naka-install sa iyong sistema
- Pangkalahatang kaalaman sa mga JSON na configuration file

---

## 1. Claude Desktop

Ang **Claude Desktop** ay ang opisyal na desktop na aplikasyon ng Anthropic na may katutubong suporta para sa MCP.

### Pag-install

1. I-download ang Claude Desktop mula sa [claude.ai/download](https://claude.ai/download)
2. I-install at mag-sign in gamit ang iyong Anthropic account

### Pagkokonpigurasyon

Gumagamit ang Claude Desktop ng JSON na configuration file para tukuyin ang mga MCP server.

**Lokasyon ng configuration file:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Halimbawa ng configuration:**

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

### Mga Opsyon sa Pagkokonpigurasyon

| Field | Paglalarawan | Halimbawa |
|-------|--------------|-----------|
| `command` | Ang executable na patatakbuhin | `"python"`, `"node"`, `"npx"` |
| `args` | Mga argumentong linya ng utos | `["-m", "my_server"]` |
| `env` | Mga environment variable | `{"API_KEY": "xxx"}` |
| `cwd` | Working directory | `"/path/to/server"` |

### Pagsubok ng Iyong Setup

1. I-save ang configuration file
2. I-restart nang buo ang Claude Desktop (sara at buksan muli)
3. Magbukas ng bagong usapan
4. Hanapin ang icon na 🔌 na nagpapahiwatig na nakakonekta ang mga server
5. Subukang hingin kay Claude na gamitin ang isa sa iyong mga kasangkapan

### Pag-aayos ng Problema sa Claude Desktop

**Hindi lumalabas ang server:**
- Suriin ang syntax ng configuration file gamit ang JSON validator
- Siguraduhing tama ang path ng command
- Tingnan ang mga log ng Claude Desktop: Help → Show Logs

**Nag-crash ang server pagsimula:**
- Subukang patakbuhin ang iyong server nang manu-mano sa terminal muna
- Suriin kung tama ang pagkaka-set ng environment variables
- Siguraduhing naka-install ang lahat ng mga dependency

---

## 2. VS Code na may GitHub Copilot

Sinusuportahan ng VS Code ang MCP sa pamamagitan ng mga GitHub Copilot Chat extension.

### Mga Kinakailangan

1. Naka-install ang VS Code 1.99+ 
2. Naka-install ang GitHub Copilot extension
3. Naka-install ang GitHub Copilot Chat extension

### Pagkokonpigurasyon

Gumagamit ang VS Code ng `.vscode/mcp.json` sa iyong workspace o user settings.

**Workspace configuration** (`.vscode/mcp.json`):

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

**User settings** (`settings.json`):

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

### Paggamit ng MCP sa VS Code

1. Buksan ang Copilot Chat panel (Ctrl+Shift+I / Cmd+Shift+I)
2. I-type ang `@` para makita ang mga magagamit na MCP tools
3. Gamitin ang natural na wika para tawagin ang mga tools: "Calculate 25 * 48 using the calculator"

### Pag-aayos ng Problema sa VS Code

**Hindi naglo-load ang mga MCP server:**
- Tignan ang Output panel → "MCP" para sa mga log ng error
- I-reload ang window: Ctrl+Shift+P → "Developer: Reload Window"
- Siguraduhing tumatakbo muna nang solo ang server

---

## 3. Cursor

Ang **Cursor** ay isang AI-first na code editor na may katutubong suporta para sa MCP.

### Pag-install

1. I-download ang Cursor mula sa [cursor.sh](https://cursor.sh)
2. I-install at mag-sign in

### Pagkokonpigurasyon

Gumagamit ang Cursor ng halos kaparehong format ng configuration tulad ng Claude Desktop.

**Lokasyon ng configuration file:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Halimbawa ng configuration:**

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

### Paggamit ng MCP sa Cursor

1. Buksan ang AI chat ng Cursor (Ctrl+L / Cmd+L)
2. Lumilitaw nang awtomatiko ang mga MCP tools sa mga suhestiyon
3. Hilingin sa AI na gampanan ang mga gawain gamit ang mga nakakonektang server

---

## 4. Cline (Batay sa Terminal)

Ang **Cline** ay isang terminal-based MCP client, mainam para sa mga workflow gamit ang command-line.

### Pag-install

```bash
npm install -g @anthropic/cline
```

### Pagkokonpigurasyon

Gumagamit ang Cline ng mga environment variable at command-line arguments.

**Paggamit ng environment variables:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Paggamit ng command-line arguments:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Configuration file** (`~/.clinerc`):

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

### Paggamit ng Cline

```bash
# Magsimula ng isang interactive na sesyon
cline

# Isang tanong gamit ang MCP
cline "Calculate the square root of 144 using the calculator"

# Ilahad ang mga magagamit na kasangkapan
cline --list-tools
```

---

## 5. Windsurf

Ang **Windsurf** ay isa pang AI-powered na code editor na may suporta sa MCP.

### Pag-install

1. I-download ang Windsurf mula sa [codeium.com/windsurf](https://codeium.com/windsurf)
2. I-install at gumawa ng account

### Pagkokonpigurasyon

Ang konfigurasyon ng Windsurf ay pinamamahalaan sa pamamagitan ng UI ng mga settings:

1. Buksan ang Settings (Ctrl+, / Cmd+,)
2. Hanapin ang "MCP"
3. I-click ang "Edit in settings.json"

**Halimbawa ng configuration:**

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

## Paghahambing ng Uri ng Transport

Iba't ibang host ang sumusuporta sa iba't ibang mekanismo ng transport:

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (standard input/output): Pinakamainam para sa lokal na mga server na pinasimulan ng host  
**SSE/HTTP**: Pinakamainam para sa mga remote na server o server na ibinabahagi sa maraming kliyente

---

## Karaniwang Pag-aayos ng Problema

### Hindi nagsisimula ang server

1. **Subukan muna ang server nang manu-mano:**
   ```bash
   # Para sa Python
   python -m your_server_module
   
   # Para sa Node.js
   node /path/to/server/index.js
   ```

2. **Suriin ang command path:**
   - Gumamit ng absolute paths kung maaari
   - Siguraduhing kasama ang executable sa iyong PATH

3. **Suriin ang mga dependency:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Kumokonekta ang server ngunit hindi gumagana ang mga tool

1. **Suriin ang mga log ng server** - Karamihan sa mga host ay may opsyon sa pag-log  
2. **Siguraduhing nairehistro ang tool** - Gamitin ang MCP Inspector para subukan  
3. **Suriin ang mga permiso** - May mga tools na nangangailangan ng access sa file/network

### Hindi naipapasa ang environment variables

- Pinoproseso ng ilan sa mga host ang mga environment variable  
- Gamitin nang tahasan ang `env` configuration field  
- Iwasan ang sensitibong datos sa configuration files (gamitin ang secrets management)

---

## Pinakamahusay na Gawi sa Seguridad

1. **Huwag kailanman i-commit ang API keys** sa mga configuration file  
2. **Gamitin ang environment variables** para sa sensitibong datos  
3. **Limitahan ang mga permiso ng server** sa lamang kinakailangan  
4. **Suriin ang code ng server** bago pahintulutan ang access sa iyong sistema  
5. **Gumamit ng allowlists** para sa access sa file system at network

---

## Ano ang Sunod

- [3.13 - Debugging gamit ang MCP Inspector](../13-mcp-inspector/README.md)
- [3.1 - Gumawa ng iyong unang MCP server](../01-first-server/README.md)
- [Module 5 - Mga Advanced na Paksa](../../05-AdvancedTopics/README.md)

---

## Karagdagang Mga Sanggunian

- [Claude Desktop MCP Dokumentasyon](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [VS Code MCP Extension](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [MCP Specification - Transports](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Opisyal na MCP Servers Registry](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Paalala**:
Ang dokumentong ito ay isinalin gamit ang serbisyong AI na pagsasalin [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong mga pagsasalin ay maaaring maglaman ng mga pagkakamali o kamalian. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na opisyal na sanggunian. Para sa mahahalagang impormasyon, ipinapayo ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang hindi pagkakaintindihan o maling interpretasyon na nagmula sa paggamit ng pagsasalin na ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->