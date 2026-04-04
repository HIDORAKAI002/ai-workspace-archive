# Hibakeresés MCP Inspektorral

Az **MCP Inspektor** egy alapvető hibakereső eszköz, amely lehetővé teszi, hogy interaktívan teszteld és hibajavítsd MCP szervereidet anélkül, hogy egy teljes AI host alkalmazásra lenne szükség. Gondolj rá úgy, mint az „MCP Postmanje” – vizuális felületet biztosít kérésküldéshez, válaszok megtekintéséhez, és megértéséhez, hogyan viselkedik a szervered.

## Miért Használjuk az MCP Inspektort?

MCP szerverek építése közben gyakran szembesülhetsz az alábbi kihívásokkal:

- **„Fut-e egyáltalán a szerverem?”** – Az Inspektor mutatja a kapcsolat állapotát
- **„Megfelelően regisztráltam az eszközeimet?”** – Az Inspektor megjeleníti az összes elérhető eszközt
- **„Mi a válasz formátuma?”** – Az Inspektor megjeleníti a teljes JSON válaszokat
- **„Miért nem működik ez az eszköz?”** – Az Inspektor részletes hibajelentéseket mutat

## Előfeltételek

- Node.js 18+ telepítve
- npm (a Node.js része)
- Egy tesztelendő MCP szerver (lásd [Module 3.1 - First Server](../01-first-server/README.md))

## Telepítés

### 1. Opció: npx használata (Gyors teszteléshez ajánlott)

```bash
npx @modelcontextprotocol/inspector
```

### 2. Opció: Globális telepítés

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### 3. Opció: Hozzáadás a projektedhez

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Add hozzá a `package.json`-hoz:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Kapcsolódás a Szerveredhez

### stdio Szerverek (Helyi folyamat)

Azokhoz a szerverekhez, amelyek a szabványos bemeneten/kimeneten keresztül kommunikálnak:

```bash
# Python szerver
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js szerver
npx @modelcontextprotocol/inspector node ./build/index.js

# Környezeti változókkal
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP Szerverek (Hálózati)

Azokhoz a szerverekhez, amelyek HTTP szolgáltatásként futnak:

1. Indítsd el először a szerveredet:
   ```bash
   python server.py  # Szerver fut a http://localhost:8080 címen
   ```

2. Indítsd el az Inspektort és csatlakozz:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Az Inspektor Felület Áttekintése

Amikor elindul az Inspektor, egy webes felületet látsz (általában a `http://localhost:5173` címen):

```
┌─────────────────────────────────────────────────────────────┐
│  MCP Inspector                              [Connected ✅]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   🔧 Tools  │  │ 📄 Resources│  │ 💬 Prompts  │         │
│  │    (3)      │  │    (2)      │  │    (1)      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📋 Message Log                                       │ │
│  │  ─────────────────────────────────────────────────── │ │
│  │  → initialize                                         │ │
│  │  ← initialized (server info)                          │ │
│  │  → tools/list                                         │ │
│  │  ← tools (3 tools)                                    │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Eszközök Tesztelése

### Elérhető Eszközök Listázása

1. Kattints a **Tools** fülre
2. Az Inspektor automatikusan meghívja a `tools/list`-et
3. Megjelennek az összes regisztrált eszköz:
   - Eszköz neve
   - Leírása
   - Bemeneti séma (paraméterek)

### Eszköz Meghívása

1. Válassz ki egy eszközt a listából
2. Töltsd ki a szükséges paramétereket a űrlapon
3. Kattints a **Run Tool** gombra
4. Nézd meg a választ az eredmény panelen

**Példa: Kalkulátor eszköz tesztelése**

```
Tool: add
Parameters:
  a: 25
  b: 17

Response:
{
  "content": [
    {
      "type": "text",
      "text": "42"
    }
  ]
}
```

### Hibák Hibakeresése Eszközökben

Ha egy eszköz hibát jelez, az Inspektor megmutatja:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Gyakori hibakódok:
| Kód | Jelentés |
|------|---------|
| -32700 | Elemzési hiba (érvénytelen JSON) |
| -32600 | Érvénytelen kérés |
| -32601 | Nincs ilyen metódus |
| -32602 | Érvénytelen paraméterek |
| -32603 | Belső hiba |

---

## Erőforrások Tesztelése

### Erőforrások Listázása

1. Kattints a **Resources** fülre
2. Az Inspektor meghívja a `resources/list`-et
3. Megjelenik:
   - Erőforrás URI-k
   - Nevek és leírások
   - MIME típusok

### Erőforrás Olvasása

1. Válassz ki egy erőforrást
2. Kattints a **Read Resource** gombra
3. Nézd meg a visszakapott tartalmat

**Példa kimenet:**

```
Resource: file:///config/settings.json
Content-Type: application/json

{
  "config": {
    "debug": true,
    "maxConnections": 10
  }
}
```

---

## Parancsok Tesztelése

### Parancsok Listázása

1. Kattints a **Prompts** fülre
2. Az Inspektor meghívja a `prompts/list`-et
3. Nézd meg az elérhető parancs-sablonokat

### Parancs Lekérése

1. Válassz ki egy parancsot
2. Töltsd ki a szükséges argumentumokat
3. Kattints a **Get Prompt** gombra
4. Nézd meg a renderelt parancs üzeneteket

---

## Üzenetnapló Elemzése

Az üzenetnapló megjeleníti az összes MCP protokoll üzenetet:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Mire Figyelj

- **Kérés/válasz párok**: Minden `→`-hoz tartozik kapcs `←`
- **Hibajelzések**: Keress `"error"` mezőket a válaszokban
- **Időzítés**: Nagy szünetek teljesítmény problémára utalhatnak
- **Protokoll verzió**: Győződj meg róla, hogy a szerver és kliens egyezik verzióban

---

## VS Code Integráció

Az Inspektort közvetlenül a VS Code-ból is futtathatod:

### launch.json használata

Add hozzá a `.vscode/launch.json`-hoz:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug with MCP Inspector",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npx",
      "runtimeArgs": [
        "@modelcontextprotocol/inspector",
        "python",
        "${workspaceFolder}/server.py"
      ],
      "console": "integratedTerminal"
    },
    {
      "name": "Debug SSE Server with Inspector",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "preLaunchTask": "Start MCP Inspector"
    }
  ]
}
```

### Feladatok használata

Add hozzá a `.vscode/tasks.json`-hoz:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npx @modelcontextprotocol/inspector node ${workspaceFolder}/build/index.js",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^$"
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Inspector",
          "endsPattern": "listening"
        }
      }
    }
  ]
}
```

---

## Gyakori Hibakeresési Forgatókönyvek

### Forgatókönyv 1: Nem kapcsolódik a szerver

**Jelenségek:** Az Inspektor „Disconnected” státuszt mutat vagy „Connecting...” állapotban marad

**Ellenőrző lista:**
1. ✅ Helyes a szerver parancs?
2. ✅ Minden függőség telepítve van?
3. ✅ A szerver elérési útja abszolút vagy a jelenlegi könyvtárhoz relatív-e?
4. ✅ Minden szükséges környezeti változó be van állítva?

**Hibakeresési lépések:**
```bash
# Először manuálisan teszteld a szervert
python -c "import your_server_module; print('OK')"

# Ellenőrizd az import hibákat
python -m your_server_module 2>&1 | head -20

# Győződj meg róla, hogy az MCP SDK telepítve van
pip show mcp
```

### Forgatókönyv 2: Az eszközök nem jelennek meg

**Jelenségek:** Az eszközök fül üres listát mutat

**Lehetséges okok:**
1. Az eszközök nincsenek regisztrálva a szerver indításakor
2. A szerver összeomlott indítás után
3. A `tools/list` kezelő üres tömböt ad vissza

**Hibakeresési lépések:**
1. Ellenőrizd az üzenetnaplót a `tools/list` válaszért
2. Adj naplózást az eszköz regisztrációs kódodhoz
3. Ellenőrizd, hogy jelen vannak-e a `@mcp.tool()` dekorátorok (Python esetén)

### Forgatókönyv 3: Eszköz hibát ad vissza

**Jelenségek:** Az eszköz hívása hibás választ ad

**Hibakeresési megközelítés:**
1. Olvasd el alaposan a hibaüzenetet
2. Ellenőrizd, hogy a paraméter típusai megfelelnek a sémának
3. Adj try/catch blokkot részletes hibaüzenetekkel
4. Nézd meg a szerver naplókat a stack trace-hez

**Példa javított hibakezelésre:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Itt van az eszköz logikája
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Forgatókönyv 4: Erőforrás tartalma üres

**Jelenségek:** Az erőforrás visszatér, de a tartalom üres vagy null

**Ellenőrző lista:**
1. ✅ A fájl elérési útja vagy URI helyes
2. ✅ A szervernek engedélye van az erőforrás olvasására
3. ✅ Az erőforrás tartalma helyesen vissza van adva

---

## Fejlett Inspektor Funkciók

### Egyedi Fejlécek (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Részletes Naplózás

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Munkamenetek Rögzítése

Az Inspektor exportálhatja az üzenetnaplókat későbbi elemzéshez:
1. Kattints az **Export Log** gombra az üzenet panelen
2. Mentsd el a JSON fájlt
3. Oszd meg a csapattal a hibakereséshez

---

## Legjobb Gyakorlatok

1. **Tesztelj korán és gyakran** – Használd az Inspektort fejlesztés közben, ne csak hibák esetén
2. **Kezdd egyszerűen** – Először teszteld az alap hálózati kapcsolatot, aztán az összetett eszköz hívásokat
3. **Ellenőrizd a sémát** – Sok hiba paramétertípus hibákból ered
4. **Olvasd el a hibaüzeneteket** – Az MCP hibák általában leíró jellegűek
5. **Tartsd nyitva az Inspektort** – Segít azonnal észrevenni a fejlesztés közbeni problémákat

---

## Mi következik?

Befejezted a 3. modult: Kezdetek! Folytasd a tanulást:

- [Module 4: Practical Implementation](../../04-PracticalImplementation/README.md)

---

## További Források

- [MCP Inspector GitHub tárhely](https://github.com/modelcontextprotocol/inspector)
- [MCP Specifikáció - Protokoll üzenetek](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 Specifikáció](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ezt a dokumentumot az AI fordító szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével fordítottuk. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum anyanyelvén tekintendő hiteles forrásnak. Kritikus információk esetén professzionális, emberi fordítást ajánlunk. Nem vállalunk felelősséget a fordítás használatából eredő félreértésekért vagy téves értelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->