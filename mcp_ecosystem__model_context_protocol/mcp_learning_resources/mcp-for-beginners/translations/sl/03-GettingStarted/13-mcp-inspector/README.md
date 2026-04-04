# Razhroščevanje z MCP Inspector

**MCP Inspector** je ključno orodje za razhroščevanje, ki vam omogoča interaktivno testiranje in odpravljanje težav vaših MCP strežnikov brez potrebe po polni AI gostujoči aplikaciji. Pomislite nanj kot "Postman za MCP" - nudi vizualni vmesnik za pošiljanje zahtevkov, ogled odgovorov in razumevanje obnašanja vašega strežnika.

## Zakaj uporabljati MCP Inspector?

Pri izdelavi MCP strežnikov se pogosto srečate s temi izzivi:

- **"Ali moj strežnik sploh teče?"** - Inspector prikazuje stanje povezave
- **"So moji pripomočki pravilno registrirani?"** - Inspector prikaže vse razpoložljive pripomočke
- **"Kakšen je format odgovora?"** - Inspector prikazuje celoten JSON odgovor
- **"Zakaj ta pripomoček ne deluje?"** - Inspector prikazuje podrobna sporočila o napakah

## Predpogoj

- Nameščen Node.js 18 ali novejši
- npm (priložen z Node.js)
- MCP strežnik za testiranje (glej [Modul 3.1 - Prvi strežnik](../01-first-server/README.md))

## Namestitev

### Možnost 1: Zagon z npx (priporočeno za hitro testiranje)

```bash
npx @modelcontextprotocol/inspector
```

### Možnost 2: Globalna namestitev

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Možnost 3: Dodajanje v vaš projekt

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Dodajte v `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Povezava z vašim strežnikom

### stdio strežniki (lokalen proces)

Za strežnike, ki komunicirajo preko standardnega vhoda/izhoda:

```bash
# Python strežnik
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js strežnik
npx @modelcontextprotocol/inspector node ./build/index.js

# Z okoljskimi spremenljivkami
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP strežniki (mreža)

Za strežnike, ki tečejo kot HTTP storitve:

1. Najprej zaženite strežnik:
   ```bash
   python server.py  # Strežnik teče na http://localhost:8080
   ```

2. Zaženite Inspector in se povežite:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Pregled vmesnika Inspectora

Ko zaženete Inspector, boste videli spletni vmesnik (običajno na `http://localhost:5173`):

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

## Testiranje pripomočkov

### Seznam razpoložljivih pripomočkov

1. Kliknite na zavihek **Tools**
2. Inspector samodejno pokliče `tools/list`
3. Prikažejo se vsi registrirani pripomočki z:
   - Imenom pripomočka
   - Opisom
   - Shemo vhodnih parametrov

### Klic pripomočka

1. Izberite pripomoček s seznama
2. Izpolnite zahtevane parametre v obrazcu
3. Kliknite **Run Tool**
4. Oglejte si odgovor v panelu z rezultati

**Primer: testiranje kalkulatorja**

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

### Razhroščevanje napak pripomočkov

Ko pripomoček ne uspe, Inspector prikaže:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Pogoste kode napak:
| Koda | Pomen |
|------|---------|
| -32700 | Napaka razčlenjevanja (neveljaven JSON) |
| -32600 | Neveljavna zahteva |
| -32601 | Metoda ni najdena |
| -32602 | Neveljavni parametri |
| -32603 | Notranja napaka |

---

## Testiranje virov

### Seznam virov

1. Kliknite na zavihek **Resources**
2. Inspector pokliče `resources/list`
3. Videli boste:
   - URI-je virov
   - Imena in opise
   - MIME tipe

### Branje vira

1. Izberite vir
2. Kliknite **Read Resource**
3. Oglejte si vsebino, ki je bila vrnjena

**Primer izhoda:**

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

## Testiranje pozivov (prompts)

### Seznam pozivov

1. Kliknite na zavihek **Prompts**
2. Inspector pokliče `prompts/list`
3. Ogled razpoložljivih predlog pozivov

### Pridobitev poziva

1. Izberite poziv
2. Izpolnite zahtevane argumente
3. Kliknite **Get Prompt**
4. Prikažejo se upodobljena sporočila poziva

---

## Analiza dnevnika sporočil

Dnevnik sporočil prikazuje vsa sporočila MCP protokola:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Na kaj biti pozoren

- **Pari zahteva/odgovor**: Vsak `→` mora imeti svoj ujemajoči `←`
- **Sporočila o napakah**: Poiščite `"error"` v odgovorih
- **Časovni zamiki**: Veliki premori lahko nakazujejo težave z zmogljivostjo
- **Različica protokola**: Preverite, da se strežnik in odjemalec strinjata z verzijo

---

## Integracija z VS Code

Inspector lahko zaženete neposredno iz VS Code:

### Uporaba launch.json

Dodajte v `.vscode/launch.json`:

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

### Uporaba opravil (tasks)

Dodajte v `.vscode/tasks.json`:

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

## Pogoste situacije pri razhroščevanju

### Situacija 1: Strežnik se ne poveže

**Simptomi:** Inspector kaže "Disconnected" ali se zatakne na "Connecting..."

**Kontrolni seznam:**
1. ✅ Je ukaz za zagon strežnika pravilen?
2. ✅ Ali so vse odvisnosti nameščene?
3. ✅ Je pot do strežnika absolutna ali relativna na trenutni imenik?
4. ✅ So nastavljene zahtevane okoljske spremenljivke?

**Koraki za razhroščevanje:**
```bash
# Najprej ročno preizkusite strežnik
python -c "import your_server_module; print('OK')"

# Preverite za napake pri uvozu
python -m your_server_module 2>&1 | head -20

# Preverite, ali je MCP SDK nameščen
pip show mcp
```

### Situacija 2: Pripomočki se ne prikažejo

**Simptomi:** Zavihek pripomočki pokaže prazen seznam

**Možni vzroki:**
1. Pripomočki niso registrirani med inicializacijo strežnika
2. Strežnik se je zrušil po zagonu
3. Obdelovalec `tools/list` vrača prazno polje

**Koraki za razhroščevanje:**
1. Preverite dnevnik sporočil za odgovor `tools/list`
2. Dodajte beleženje v kodo za registracijo pripomočkov
3. Preverite prisotnost dekoratorjev `@mcp.tool()` (Python)

### Situacija 3: Pripomoček vrne napako

**Simptomi:** Klic pripomočka vrne sporočilo o napaki

**Pristop k razhroščevanju:**
1. Previdno preberite sporočilo o napaki
2. Preverite, ali tipi parametrov ustrezajo shemi
3. Dodajte try/catch z natančnimi sporočili o napakah
4. Preverite strežniške dnevnike za sledove napak

**Primer izboljšanega obravnavanja napak:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Tukaj je logika orodja
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Situacija 4: Vsebina vira je prazna

**Simptomi:** Vir vrne prazno ali ničelno vsebino

**Kontrolni seznam:**
1. ✅ Pot do datoteke ali URI je pravilna
2. ✅ Strežnik ima dovoljenje za branje vira
3. ✅ Vsebina vira se pravilno vrača

---

## Napredne funkcije Inspectora

### Prilagojeni glavi (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Obsežno beleženje

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Snemanje seans

Inspector lahko izvozi dnevnike sporočil za poznejšo analizo:
1. Kliknite **Export Log** v panelu za sporočila
2. Shranite JSON datoteko
3. Delite z člani ekipe za razhroščevanje

---

## Najboljše prakse

1. **Testirajte zgodaj in pogosto** - uporabite Inspector med razvojem, ne šele, ko se pojavijo težave
2. **Začnite preprosto** - najprej testirajte osnovno povezljivost pred zahtevnejšimi klici pripomočkov
3. **Preverite shemo** - veliko napak izhaja iz neusklajenosti tipov parametrov
4. **Bodite pozorni na napake** - MCP napake so običajno opisne
5. **Ohranite Inspector odprt** - pomaga odkriti težave med razvojem

---

## Kaj sledi

Končali ste Modul 3: Prvi koraki! Nadaljujte z učenjem:

- [Modul 4: Praktična izvedba](../../04-PracticalImplementation/README.md)

---

## Dodatni viri

- [MCP Inspector GitHub repozitorij](https://github.com/modelcontextprotocol/inspector)
- [MCP specifikacija - sporočila protokola](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 specifikacija](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za točnost, upoštevajte, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku velja za avtoritativni vir. Za kritične informacije priporočamo profesionalni človeški prevod. Nismo odgovorni za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->