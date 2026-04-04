# Kuweka Wateja Maarufu wa MCP Host

Mwongozo huu unahusu jinsi ya kusanidi na kutumia seva za MCP na programu maarufu za mwenyeji wa AI. Kila mwenyeji ana njia yake ya usanidi, lakini mara tu usiwe umewekwa, wote huwasiliana na seva za MCP kwa kutumia itifaki iliyosanifishwa.

## MCP Host ni Nini?

**MCP Host** ni programu ya AI inayoweza kuungana na seva za MCP ili kuongeza uwezo wake. Fikiria kama "uso wa mbele" ambao watumiaji huwasiliana nao, wakati seva za MCP hutoa zana na data za "nyuma".

```mermaid
flowchart LR
    User[👤 Mtumiaji] --> Host[🖥️ Mweshimiwa MCP]
    Host --> S1[Seva ya MCP A]
    Host --> S2[Seva ya MCP B]
    Host --> S3[Seva ya MCP C]
    
    subgraph "Wenyeji Maarufu"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Mahitaji

- Seva ya MCP ya kuunganishwa nayo (angalia [Module 3.1 - Seva ya Kwanza](../01-first-server/README.md))
- Programu ya mwenyeji imewekwa kwenye mfumo wako
- Ujuzi wa msingi wa faili za usanidi za JSON

---

## 1. Claude Desktop

**Claude Desktop** ni programu rasmi ya desktop ya Anthropic inayounga mkono MCP kwa asili.

### Usanidi

1. Pakua Claude Desktop kutoka [claude.ai/download](https://claude.ai/download)
2. Sakinisha na ingia kutumia akaunti yako ya Anthropic

### Usanidi

Claude Desktop hutumia faili ya usanidi wa JSON kueleza seva za MCP.

**Mahali pa faili ya usanidi:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Mfano wa usanidi:**

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

### Chaguzi za Usanidi

| Sehemu | Maelezo | Mfano |
|--------|---------|-------|
| `command` | Programu itakayotekelezwa | `"python"`, `"node"`, `"npx"` |
| `args` | Hoja za mstari wa amri | `["-m", "my_server"]` |
| `env` | Mabadiliko ya mazingira | `{"API_KEY": "xxx"}` |
| `cwd` | Saraka ya kufanya kazi | `"/path/to/server"` |

### Kujaribu Usanidi Wako

1. Hifadhi faili ya usanidi
2. Anzisha upya kabisa Claude Desktop (acha kisha fungua tena)
3. Fungua mazungumzo mapya
4. Tafuta ikoni ya 🔌 inayoonyesha seva zilizounganishwa
5. Jaribu kumuomba Claude kutumia mojawapo ya zana zako

### Kutatua Matatizo ya Claude Desktop

**Seva haionekani:**
- Angalia sintaksia ya faili ya usanidi kwa mkaguzi wa JSON
- Hakikisha njia ya amri ni sahihi
- Angalia kumbukumbu za Claude Desktop: Msaada → Onyesha Kumbukumbu

**Seva inashindwa kuanzishwa:**
- Jaribu seva yako moja kwa moja kwenye terminal kwanza
- Hakikisha mabadiliko ya mazingira yamewekwa sawasawa
- Hakikisha utegemezi wote umewekwa

---

## 2. VS Code na GitHub Copilot

VS Code inaunga mkono MCP kupitia nyongeza za GitHub Copilot Chat.

### Mahitaji

1. VS Code 1.99+ imewekwa
2. Kiendelezi cha GitHub Copilot kimewekwa
3. Kiendelezi cha GitHub Copilot Chat kimewekwa

### Usanidi

VS Code hutumia `.vscode/mcp.json` katika eneo lako la kazi au mipangilio ya mtumiaji.

**Usanidi wa eneo la kazi** (`.vscode/mcp.json`):

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

**Mipangilio ya mtumiaji** (`settings.json`):

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

### Kutumia MCP katika VS Code

1. Fungua jopo la Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
2. Andika `@` kuona zana za MCP zilizopo
3. Tumia lugha ya kawaida kuanzisha zana: "Calculate 25 * 48 using the calculator"

### Kutatua Matatizo ya VS Code

**Seva za MCP hazipaki:**
- Angalia jopo la Output → "MCP" kwa kumbukumbu za makosa
- Punguza dirisha upya: Ctrl+Shift+P → "Developer: Reload Window"
- Hakiki seva inavyoanzishwa peke yake kwanza

---

## 3. Cursor

**Cursor** ni mhariri wa nambari aliyeangazia AI akiwa na msaada wa MCP ndani yake.

### Usanidi

1. Pakua Cursor kutoka [cursor.sh](https://cursor.sh)
2. Sakinisha na ingia

### Usanidi

Cursor hutumia muundo wa usanidi kama huo wa Claude Desktop.

**Mahali pa faili ya usanidi:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Mfano wa usanidi:**

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

### Kutumia MCP katika Cursor

1. Fungua mazungumzo ya AI ya Cursor (Ctrl+L / Cmd+L)
2. Zana za MCP huonekana moja kwa moja katika mapendekezo
3. Muombe AI kufanya kazi kwa kutumia seva zilizounganishwa

---

## 4. Cline (Inatumia Terminal)

**Cline** ni mteja wa MCP anayetumia terminal, bora kwa mtiririko wa kazi wa mstari wa amri.

### Usanidi

```bash
npm install -g @anthropic/cline
```

### Usanidi

Cline hutumia mabadiliko ya mazingira na hoja za mstari wa amri.

**Kutumia mabadiliko ya mazingira:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Kutumia hoja za mstari wa amri:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Faili la usanidi** (`~/.clinerc`):

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

### Kutumia Cline

```bash
# Anza kikao cha maingiliano
cline

# Swali moja na MCP
cline "Calculate the square root of 144 using the calculator"

# Orodhesha zana zinazopatikana
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** ni mhariri mwingine wa nambari aliyewezeshwa na AI akiwa na msaada wa MCP.

### Usanidi

1. Pakua Windsurf kutoka [codeium.com/windsurf](https://codeium.com/windsurf)
2. Sakinisha na tengeneza akaunti

### Usanidi

Usanidi wa Windsurf hufanyika kupitia UI ya mipangilio:

1. Fungua Mipangilio (Ctrl+, / Cmd+,)
2. Tafuta "MCP"
3. Bonyeza "Edit in settings.json"

**Mfano wa usanidi:**

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

## Kulinganisha Aina za Usafirishaji

Wamewezesha wenyeji tofauti aina tofauti za usafirishaji:

| Mwenyeji | stdio | SSE/HTTP | WebSocket |
|----------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (kiingizo/tokea cha kawaida): Bora kwa seva za ndani zinazozinduliwa na mwenyeji  
**SSE/HTTP**: Bora kwa seva za mbali au seva zinazoshirikiwa kati ya wateja wengi

---

## Matatizo ya Kawaida

### Seva haianzi

1. **Jaribu seva kwa mikono kwanza:**
   ```bash
   # Kwa Python
   python -m your_server_module
   
   # Kwa Node.js
   node /path/to/server/index.js
   ```

2. **Angalia njia ya amri:**
   - Tumia njia kamili inapowezekana
   - Hakikisha programu ina kwenye PATH yako

3. **Thibitisha utegemezi:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Seva inaungana lakini zana hazifanyi kazi

1. **Angalia kumbukumbu za seva** - Wenyeji wengi wana chaguzi za kumbukumbu  
2. **Thibitisha usajili wa zana** - Tumia MCP Inspector kujaribu  
3. **Angalia ruhusa** - Zana zingine zinahitaji ruhusa ya faili/mtandao

### Mabadiliko ya mazingira hayapitishwi

- Wenyeji wengine hurekebisha mabadiliko ya mazingira  
- Tumia sehemu ya usanidi ya `env` kwa uwazi  
- Epuka data nyeti katika faili za usanidi (tumia usimamizi wa siri)

---

## Mbinu Bora za Usalama

1. **Usiwekee funguo za API katika faili za usanidi**  
2. **Tumia mabadiliko ya mazingira kwa data nyeti**  
3. **Punguza ruhusa za seva kwa kile kinachohitajika tu**  
4. **Pitia msimbo wa seva kabla ya kutoa ruhusa kwenye mfumo wako**  
5. **Tumia orodha za kuruhusu kwa huduma ya mfumo wa faili na mtandao**

---

## Nini Kifuatacho

- [3.13 - Kurekebisha matatizo na MCP Inspector](../13-mcp-inspector/README.md)
- [3.1 - Tengeneza seva yako ya MCP ya kwanza](../01-first-server/README.md)
- [Moduli 5 - Mada za Juu](../../05-AdvancedTopics/README.md)

---

## Rasilimali Zaidi

- [Nyaraka za MCP za Claude Desktop](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [Nyongeza ya MCP ya VS Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [Mfafanuzi wa MCP - Usafirishaji](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Rejesta Rasmi ya Seva za MCP](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tangazo la Majeruhi**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kuhakikisha usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake ya asili inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayotolewa na binadamu inashauriwa. Hatubebwi jukumu kwa maelewano au tafsiri potofu zinazotokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->