# Népszerű MCP Host Kliensek Beállítása

Ez az útmutató bemutatja, hogyan konfiguráljuk és használjuk az MCP szervereket népszerű AI hoszt alkalmazásokkal. Minden hosztnak megvan a maga konfigurációs módja, de egyszer beállítva mindegyik az MCP szerverekkel a szabványosított protokoll segítségével kommunikál.

## Mi az az MCP Host?

Az **MCP Host** egy AI alkalmazás, amely képes csatlakozni MCP szerverekhez a képességeinek bővítéséhez. Gondolj rá úgy, mint a "felhasználói felületre", amellyel a felhasználók interakcióba lépnek, miközben az MCP szerverek biztosítják a "háttérben" működő eszközöket és adatokat.

```mermaid
flowchart LR
    User[👤 Felhasználó] --> Host[🖥️ MCP Hoszt]
    Host --> S1[MCP Szerver A]
    Host --> S2[MCP Szerver B]
    Host --> S3[MCP Szerver C]
    
    subgraph "Népszerű hosztok"
        H1[Claude Asztal]
        H2[VS Kód]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Előfeltételek

- Egy MCP szerver, amelyhez csatlakozni lehet (lásd: [3.1 modul - Első szerver](../01-first-server/README.md))
- A hoszt alkalmazás telepítve a rendszereden
- Alapvető ismeret JSON konfigurációs fájlokról

---

## 1. Claude Desktop

A **Claude Desktop** az Anthropic hivatalos asztali alkalmazása, amely natívan támogatja az MCP-t.

### Telepítés

1. Töltsd le a Claude Desktopot a [claude.ai/download](https://claude.ai/download) oldalról
2. Telepítsd, majd jelentkezz be az Anthropic fiókoddal

### Konfiguráció

A Claude Desktop JSON konfigurációs fájlt használ az MCP szerverek meghatározásához.

**A konfigurációs fájl helye:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Példa konfiguráció:**

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

### Konfigurációs Opciók

| Mező | Leírás | Példa |
|-------|-------------|---------|
| `command` | A futtatandó végrehajtható fájl neve | `"python"`, `"node"`, `"npx"` |
| `args` | Parancssori argumentumok | `["-m", "my_server"]` |
| `env` | Környezeti változók | `{"API_KEY": "xxx"}` |
| `cwd` | Munkakönyvtár | `"/path/to/server"` |

### A beállítás tesztelése

1. Mentse el a konfigurációs fájlt
2. Indítsa újra teljesen a Claude Desktopot (kilépés és újranyitás)
3. Nyisson meg egy új beszélgetést
4. Keresse a 🔌 ikont, ami a csatlakoztatott szervereket jelzi
5. Próbálja meg kérni Claude-ot, hogy használja valamelyik eszközét

### Claude Desktop hibakeresés

**Nem jelenik meg a szerver:**
- Ellenőrizze a konfigurációs fájl szintaxisát JSON ellenőrzővel
- Győződjön meg, hogy a parancs elérési útja helyes
- Nézze meg a Claude Desktop naplóit: Súgó → Naplók megjelenítése

**A szerver induláskor összeomlik:**
- Először kézzel tesztelje a szervert terminálban
- Győződjön meg a környezeti változók helyes beállításáról
- Ellenőrizze, hogy minden függőség telepítve van

---

## 2. VS Code GitHub Copilot-tal

A VS Code támogatja az MCP-t a GitHub Copilot Chat kiterjesztéseken keresztül.

### Előfeltételek

1. Telepített VS Code 1.99+ verzió
2. Telepített GitHub Copilot kiterjesztés
3. Telepített GitHub Copilot Chat kiterjesztés

### Konfiguráció

A VS Code a `.vscode/mcp.json` fájlt használja a munkaterületen vagy a felhasználói beállításokban.

**Munkaterület konfiguráció** (`.vscode/mcp.json`):

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

**Felhasználói beállítások** (`settings.json`):

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

### MCP használata VS Code-ban

1. Nyisd meg a Copilot Chat panelt (Ctrl+Shift+I / Cmd+Shift+I)
2. Gépelj `@` jelzést az elérhető MCP eszközök listázásához
3. Használj természetes nyelvet az eszközök meghívásához: "Számold ki 25 * 48 a számológép segítségével"

### VS Code hibakeresés

**Nem töltődnek be az MCP szerverek:**
- Ellenőrizze a Kimenet panelt → "MCP" hiba naplókért
- Ablak újratöltése: Ctrl+Shift+P → "Developers: Reload Window"
- Győződjön meg, hogy a szerver önállóan fut először

---

## 3. Cursor

A **Cursor** egy AI-központú kódszerkesztő, amely beépített MCP támogatással rendelkezik.

### Telepítés

1. Töltsd le a Cursort a [cursor.sh](https://cursor.sh) weboldalról
2. Telepítsd és jelentkezz be

### Konfiguráció

A Cursor hasonló konfigurációs formátumot használ, mint a Claude Desktop.

**Konfigurációs fájl helye:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Példa konfiguráció:**

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

### MCP használata Cursorban

1. Nyisd meg a Cursor AI chat-et (Ctrl+L / Cmd+L)
2. Az MCP eszközök automatikusan megjelennek a javaslatok között
3. Kérd meg az AI-t, hogy végezzen feladatokat a csatlakoztatott szerverek segítségével

---

## 4. Cline (Terminál-alapú)

A **Cline** egy terminál-alapú MCP kliens, ideális parancssori munkafolyamatokhoz.

### Telepítés

```bash
npm install -g @anthropic/cline
```

### Konfiguráció

A Cline környezeti változókat és parancssori argumentumokat használ.

**Környezeti változók használata:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Parancssori argumentumok használata:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Konfigurációs fájl** (`~/.clinerc`):

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

### Cline használata

```bash
# Indíts egy interaktív munkamenetet
cline

# Egyetlen lekérdezés MCP-vel
cline "Calculate the square root of 144 using the calculator"

# Elérhető eszközök listázása
cline --list-tools
```

---

## 5. Windsurf

A **Windsurf** egy másik AI-alapú kódszerkesztő, amely MCP támogatással rendelkezik.

### Telepítés

1. Töltsd le a Windsurffot a [codeium.com/windsurf](https://codeium.com/windsurf) oldalról
2. Telepítsd és hozz létre fiókot

### Konfiguráció

A Windsurf konfigurációját a beállítási felületen kezelheted:

1. Nyisd meg a Beállításokat (Ctrl+, / Cmd+,)
2. Keresd meg az "MCP" kifejezést
3. Kattints az "Edit in settings.json" lehetőségre

**Példa konfiguráció:**

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

## Szállítási típusok összehasonlítása

Különböző hosztok különböző szállítási mechanizmusokat támogatnak:

| Hoszt | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (standard bemenet/kimenet): legjobb helyi szerverekhez, amelyeket a hoszt indít  
**SSE/HTTP**: legjobb távoli szerverekhez vagy több kliens által megosztott szerverekhez

---

## Gyakori hibakeresés

### A szerver nem indul el

1. **Először kézzel tesztelje a szervert:**
   ```bash
   # Pythonhoz
   python -m your_server_module
   
   # Node.js-hez
   node /path/to/server/index.js
   ```

2. **Ellenőrizze a parancs elérési útját:**
   - Használjon abszolút elérési utakat, ha lehetséges
   - Győződjön meg, hogy a futtatható fájl a PATH-ban van

3. **Ellenőrizze a függőségeket:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### A szerver csatlakozik, de az eszközök nem működnek

1. **Ellenőrizze a szerver naplókat** – A legtöbb hosztnak van naplózási lehetőség
2. **Ellenőrizze az eszköz regisztrációját** – Használja az MCP Inspectort teszteléshez
3. **Ellenőrizze az engedélyeket** – Néhány eszköznek fájl/hálózati hozzáférés szükséges

### A környezeti változók nem kerülnek átadásra

- Néhány hoszt tisztítja a környezeti változókat
- Használja szabályosan az `env` konfigurációs mezőt
- Kerülje a bizalmas adatok tárolását konfigurációs fájlokban (használjon titkok kezelését)

---

## Biztonsági jó gyakorlatok

1. **Soha ne kötelezze el API kulcsokat** konfigurációs fájlokban
2. **Használja a környezeti változókat** bizalmas adatokhoz
3. **Korlátozza a szerver jogosultságait** csak a szükséges mértékben
4. **Nézze át a szerver kódját**, mielőtt hozzáférést ad a rendszeréhez
5. **Használjon engedélyezési listákat** fájlrendszer és hálózati hozzáféréshez

---

## Mi következik

- [3.13 - Hibakeresés MCP Inspectorral](../13-mcp-inspector/README.md)
- [3.1 - Első MCP szerver létrehozása](../01-first-server/README.md)
- [5. modul - Haladó témák](../../05-AdvancedTopics/README.md)

---

## További források

- [Claude Desktop MCP Dokumentáció](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [VS Code MCP Kiterjesztés](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [MCP Specifikáció - Szállítások](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Hivatalos MCP Szerver Regiszter](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Felelősségkizárás**:  
Ezt a dokumentumot az AI fordító szolgáltatás [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével fordítottuk. Míg a pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítás hibákat vagy pontatlanságokat tartalmazhat. Az eredeti, anyanyelvi dokumentum tekintendő hivatalos forrásnak. Fontos információk esetén professzionális emberi fordítást javaslunk. Nem vállalunk felelősséget a fordítás használatából eredő félreértésekért vagy téves értelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->