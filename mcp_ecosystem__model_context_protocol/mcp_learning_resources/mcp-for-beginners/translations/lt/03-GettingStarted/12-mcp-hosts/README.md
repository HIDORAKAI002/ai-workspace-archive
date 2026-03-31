# Populiariausių MCP prieglobos klientų sąranka

Šiame vadove aprašoma, kaip konfigūruoti ir naudoti MCP serverius su populiariomis AI prieglobos programomis. Kiekvienas priegloba turi savo konfigūracijos metodą, tačiau nustatyti visi jie bendrauja su MCP serveriais naudodami standartizuotą protokolą.

## Kas yra MCP priegloba?

**MCP priegloba** yra AI programa, galinti prisijungti prie MCP serverių, kad išplėstų savo galimybes. Galvokite apie ją kaip apie „priekinę sąsają“, su kuria vartotojai sąveikauja, o MCP serveriai suteikia „užpakalinius“ įrankius ir duomenis.

```mermaid
flowchart LR
    User[👤 Vartotojas] --> Host[🖥️ MCP Serveris]
    Host --> S1[MCP Serveris A]
    Host --> S2[MCP Serveris B]
    Host --> S3[MCP Serveris C]
    
    subgraph "Populiarūs serveriai"
        H1[Claude Darbalaukis]
        H2[VS Kodas]
        H3[Žymeklis]
        H4[Cline]
        H5[Vėjlenčių sportas]
    end
```
## Išankstiniai reikalavimai

- Prisijungimui prie MCP serverio (žr. [3 modulis.1 – Pirmasis serveris](../01-first-server/README.md))
- Prieglobos programa, įdiegta jūsų sistemoje
- Pagrindinės JSON konfigūracijos failų pažinimo žinios

---

## 1. Claude Desktop

**Claude Desktop** yra oficiali Anthropic darbalaukio programa, kuri natūraliai palaiko MCP.

### Diegimas

1. Atsisiųskite Claude Desktop iš [claude.ai/download](https://claude.ai/download)
2. Įdiekite ir prisijunkite naudodami savo Anthropic paskyrą

### Konfigūracija

Claude Desktop naudoja JSON konfigūracijos failą MCP serveriams apibrėžti.

**Konfigūracijos failo vieta:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Konfigūracijos pavyzdys:**

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

### Konfigūracijos parinktys

| Laukas | Aprašymas | Pavyzdys |
|--------|-----------|----------|
| `command` | Vykdomasis failas | `"python"`, `"node"`, `"npx"` |
| `args` | Komandinės eilutės argumentai | `["-m", "my_server"]` |
| `env` | Aplinkos kintamieji | `{"API_KEY": "xxx"}` |
| `cwd` | Darbinė direktorija | `"/path/to/server"` |

### Jūsų sąrankos testavimas

1. Išsaugokite konfigūracijos failą
2. Pilnai perkraukite Claude Desktop (uždarykite ir atidarykite iš naujo)
3. Atidarykite naują pokalbį
4. Ieškokite 🔌 piktogramos, rodančios prisijungusius serverius
5. Pabandykite paprašyti Claude naudoti vieną savo įrankių

### Claude Desktop problemų sprendimas

**Serveris neatsiranda:**
- Patikrinkite konfigūracijos failo sintaksę naudodami JSON validatorių
- Įsitikinkite, kad komandos kelias teisingas
- Peržiūrėkite Claude Desktop žurnalus: Pagalba → Rodyti žurnalus

**Serveris užstringa paleidžiant:**
- Pirmiausia išbandykite savo serverį rankiniu būdu terminale
- Patikrinkite, ar aplinkos kintamieji nustatyti teisingai
- Įsitikinkite, kad visos priklausomybės įdiegtos

---

## 2. VS Code su GitHub Copilot

VS Code palaiko MCP per GitHub Copilot Chat plėtinius.

### Išankstiniai reikalavimai

1. Įdiegta VS Code versija 1.99 ar naujesnė
2. Įdiegtas GitHub Copilot plėtinys
3. Įdiegtas GitHub Copilot Chat plėtinys

### Konfigūracija

VS Code naudoja `.vscode/mcp.json` jūsų darbo zonoje arba vartotojo nustatymuose.

**Darbo zonos konfigūracija** (`.vscode/mcp.json`):

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

**Vartotojo nustatymai** (`settings.json`):

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

### MCP naudojimas VS Code

1. Atidarykite Copilot Chat skydelį (Ctrl+Shift+I / Cmd+Shift+I)
2. Įveskite `@` norėdami matyti galimus MCP įrankius
3. Naudokite natūralią kalbą įrankiams iškviesti: „Apskaičiuokite 25 * 48 naudodami skaičiuotuvą“

### VS Code problemų sprendimas

**MCP serveriai neįsikrauna:**
- Patikrinkite Išvesties skydelį → „MCP“ klaidų žurnalams
- Perkraukite langą: Ctrl+Shift+P → „Developer: Reload Window“
- Įsitikinkite, kad serveris veikia savarankiškai

---

## 3. Cursor

**Cursor** yra AI pirmas kodo redaktorius su integruota MCP palaikymu.

### Diegimas

1. Atsisiųskite Cursor iš [cursor.sh](https://cursor.sh)
2. Įdiekite ir prisijunkite

### Konfigūracija

Cursor naudoja panašų konfigūracijos formatą kaip Claude Desktop.

**Konfigūracijos failo vieta:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Konfigūracijos pavyzdys:**

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

### MCP naudojimas Cursor

1. Atidarykite Cursor AI pokalbį (Ctrl+L / Cmd+L)
2. MCP įrankiai automatiškai pasirodo pasiūlymuose
3. Paprašykite AI atlikti užduotis per prijungtus serverius

---

## 4. Cline (terminalinė)

**Cline** yra terminalinė MCP kliento programa, puikiai tinkanti komandų eilutės darbams.

### Diegimas

```bash
npm install -g @anthropic/cline
```

### Konfigūracija

Cline naudoja aplinkos kintamuosius ir komandinės eilutės argumentus.

**Naudojant aplinkos kintamuosius:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Naudojant komandinės eilutės argumentus:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Konfigūracijos failas** (`~/.clinerc`):

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

### Cline naudojimas

```bash
# Pradėti interaktyvią sesiją
cline

# Vienas užklausimas su MCP
cline "Calculate the square root of 144 using the calculator"

# Išvardinti prieinamus įrankius
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** yra dar vienas AI paremtas kodo redaktorius su MCP palaikymu.

### Diegimas

1. Atsisiųskite Windsurf iš [codeium.com/windsurf](https://codeium.com/windsurf)
2. Įdiekite ir susikurkite paskyrą

### Konfigūracija

Windsurf konfigūracijos valdymas vykdomas per nustatymų sąsają:

1. Atidarykite Nustatymus (Ctrl+, / Cmd+,)
2. Ieškokite „MCP“
3. Spustelėkite „Redaguoti settings.json“

**Konfigūracijos pavyzdys:**

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

## Transporto tipų palyginimas

Skirtingos prieglobos palaiko skirtingus komunikacijos mechanizmus:

| Priegloba       | stdio | SSE/HTTP | WebSocket |
|-----------------|-------|----------|-----------|
| Claude Desktop  | ✅    | ❌       | ❌        |
| VS Code        | ✅    | ✅       | ❌        |
| Cursor         | ✅    | ✅       | ❌        |
| Cline          | ✅    | ✅       | ❌        |
| Windsurf       | ✅    | ✅       | ❌        |

**stdio** (standartinė įvestis/išvestis): Geriausia vietiniams serveriams, kuriuos paleidžia priegloba  
**SSE/HTTP**: Geriausia nuotoliniams serveriams arba serveriams, bendrinamiems keliose klientų programose

---

## Dažniausios problemos ir jų sprendimas

### Serveris neužsikrauna

1. **Pirmiausia testuokite serverį rankiniu būdu:**
   ```bash
   # Skirta Python
   python -m your_server_module
   
   # Skirta Node.js
   node /path/to/server/index.js
   ```

2. **Patikrinkite komandos kelią:**
   - Jei galima, naudokite absoliučius kelius
   - Įsitikinkite, kad vykdomasis failas yra jūsų PATH kelyje

3. **Patikrinkite priklausomybes:**
   ```bash
   # Pythonas
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Serveris prisijungia, bet įrankiai neveikia

1. **Peržiūrėkite serverio žurnalus** – daugelis prieglobų palaiko žurnalo išrašą  
2. **Patikrinkite įrankių registraciją** – naudokite MCP Inspector testavimui  
3. **Patikrinkite leidimus** – kai kuriems įrankiams reikalinga prieiga prie failų ar tinklo

### Aplinkos kintamieji neprasiskverbia

- Kai kurios prieglobos valdo aplinkos kintamuosius  
- Naudokite `env` konfigūracijos lauką aiškiai  
- Venkite jautrios informacijos saugojimo konfigūracijos failuose (naudokite slapčiųjų valdymą)

---

## Saugumo gerosios praktikos

1. **Niekada nerodykite API raktų** konfigūracijos failuose  
2. **Naudokite aplinkos kintamuosius** jautriai informacijai  
3. **Ribokite serverio leidimus** tik iki būtino minimumo  
4. **Peržiūrėkite serverio kodą** prieš suteikdami prieigą prie savo sistemos  
5. **Naudokite leidžiamųjų sąrašus** failų sistemai ir tinklo prieigai

---

## Kas toliau

- [3.13 – Derinimas su MCP Inspector](../13-mcp-inspector/README.md)
- [3.1 – Sukurkite pirmą MCP serverį](../01-first-server/README.md)
- [Modulis 5 – Pažangios temos](../../05-AdvancedTopics/README.md)

---

## Papildomi ištekliai

- [Claude Desktop MCP dokumentacija](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [VS Code MCP plėtinys](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [MCP specifikacija – transportai](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Oficialus MCP serverių registras](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors stengiamės užtikrinti tikslumą, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų arba netikslumų. Pirminis dokumentas gimtąja kalba laikomas autoritetingu šaltiniu. Kritinei informacijai rekomenduojame naudotis profesionaliu žmonių vertimu. Mes neatsakome už bet kokius nesusipratimus ar neteisingus aiškinimus, kilusius dėl šio vertimo naudojimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->