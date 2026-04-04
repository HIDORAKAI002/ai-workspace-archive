# MCP Inspektoriga silumine

**MCP Inspektor** on oluline silumistöökalu, mis võimaldab teil interaktiivselt testida ja tõrkeotsingut teha oma MCP-serveritega ilma täielikku AI hostrakendust vajamata. Mõelge sellele kui "Postman MCP jaoks" – see pakub visuaalset liidest päringute saatmiseks, vastuste vaatamiseks ja serveri käitumise mõistmiseks.

## Miks kasutada MCP Inspektorit?

MCP-serverite ehitamisel puutute sageli kokku järgmiste väljakutsetega:

- **"Kas mu server üldse töötab?"** – Inspektor näitab ühenduse staatust
- **"Kas minu tööriistad on õigesti registreeritud?"** – Inspektor kuvab kõik saadaolevad tööriistad
- **"Mis on vastuse formaat?"** – Inspektor kuvab täielikud JSON-vastused
- **"Miks see tööriist ei tööta?"** – Inspektor näitab üksikasjalikke veateateid

## Nõuded

- Node.js 18+ installitud
- npm (tuleb koos Node.js-ga)
- Testimiseks MCP-server (vt [Moodul 3.1 - Esimene server](../01-first-server/README.md))

## Paigaldus

### Valik 1: Käivita npx-ga (Soovitatav kiireks testimiseks)

```bash
npx @modelcontextprotocol/inspector
```

### Valik 2: Paigalda globaalsetena

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Valik 3: Lisa oma projekti

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Lisa `package.json`-i:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Ühenduse loomine serveriga

### stdio serverid (kohalik protsess)

Serverite jaoks, mis suhtlevad standardse sisendi/väljundi kaudu:

```bash
# Pythoni server
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js server
npx @modelcontextprotocol/inspector node ./build/index.js

# Keskkonnamuutujatega
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP serverid (võrk)

Serverite puhul, mis töötavad HTTP-teenustena:

1. Alusta esmalt oma serverit:
   ```bash
   python server.py  # Server töötab aadressil http://localhost:8080
   ```

2. Käivita Inspektor ja ühendu:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Inspektori liidese ülevaade

Kui Inspektor käivitub, näete veebiliidest (tavaliselt aadressil `http://localhost:5173`):

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

## Tööriistade testimine

### Saadaval olevate tööriistade loend

1. Klõpsake vahekaardil **Tools**
2. Inspektor kutsub automaatselt `tools/list`
3. Näete kõiki registreeritud tööriistu koos:
   - Tööriista nimega
   - Kirjeldusega
   - Sisendiskeemiga (parameetrid)

### Tööriista kutsumine

1. Valige tööriist nimekirjast
2. Täitke vajalikud parameetrid vormis
3. Klõpsake **Run Tool**
4. Vaadake vastust tulemuste paneelis

**Näide: Kalkulaatori tööriista testimine**

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

### Tööriistade vigade silumine

Kui tööriist ebaõnnestub, näitab Inspektor:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Tavalised veakoodid:
| Kood | Tähendus |
|------|----------|
| -32700 | Sünstaksiviga (kehtetu JSON) |
| -32600 | Kehtetu päring |
| -32601 | Meetodit ei leitud |
| -32602 | Kehtetud parameetrid |
| -32603 | Sisemine viga |

---

## Ressursside testimine

### Ressursside loend

1. Klõpsake vahekaardil **Resources**
2. Inspektor kutsub `resources/list`
3. Näete:
   - Ressursside URI-sid
   - Nimesid ja kirjeldusi
   - MIME tüüpe

### Ressursi lugemine

1. Valige ressurss
2. Klõpsake **Read Resource**
3. Vaadake tagastatud sisu

**Näidistulemus:**

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

## Käskluste testimine

### Käskluste loend

1. Klõpsake vahekaardil **Prompts**
2. Inspektor kutsub `prompts/list`
3. Vaadake saadaolevaid käskluse malle

### Käskluse pärimine

1. Valige käsklus
2. Täitke kõik vajalikud argumendid
3. Klõpsake **Get Prompt**
4. Vaadake renderdatud käskluse sõnumeid

---

## Sõnumilogi analüüs

Sõnumilogi kuvab kõik MCP protokolli sõnumid:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Millele tähelepanu pöörata

- **Päring/vastus paarid**: Igal `→`-l peaks olema vastav `←`
- **Veateated**: Otsige vastustes `"error"` sõnu
- **Ajastus**: Suured vahed võivad viidata jõudlusprobleemidele
- **Protokolli versioon**: Kontrollige, et server ja klient oleksid sama versiooni peal

---

## VS Code integratsioon

Saate Inspektorit käivitada otse VS Code’ist:

### launch.json kasutamine

Lisa `.vscode/launch.json`:

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

### Tasks kasutamine

Lisa `.vscode/tasks.json`:

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

## Levinumad silumistsenaariumid

### Stsenaarium 1: Server ei ühendu

**Sümptomid:** Inspektor näitab "Disconnected" või jääb “Connecting...” juurde kinni

**Kontrollnimekiri:**
1. ✅ Kas serveri käsk on õige?
2. ✅ Kas kõik sõltuvused on paigaldatud?
3. ✅ Kas serveri tee on absoluutne või suhteline jooksvale kaustale?
4. ✅ Kas vajalised keskkonnamuutujad on seatud?

**Silumisastep #1:**
```bash
# Testi serverit esmalt käsitsi
python -c "import your_server_module; print('OK')"

# Kontrolli importimise vigu
python -m your_server_module 2>&1 | head -20

# Veendu, et MCP SDK on paigaldatud
pip show mcp
```

### Stsenaarium 2: Tööriistad ei ilmu

**Sümptomid:** Tööriistade vahekaart on tühi

**Võimalikud põhjused:**
1. Tööriistu ei registreeritud serveri alustamise ajal
2. Server kukkus käivitamisel kokku
3. `tools/list` käitleja tagastab tühja massiivi

**Silumisammud:**
1. Kontrolli sõnumilogis `tools/list` vastust
2. Lisa logimine oma tööriistade registreerimise koodile
3. Veendu, et `@mcp.tool()` dekoratsioonid on olemas (Python)

### Stsenaarium 3: Tööriist tagastab vea

**Sümptomid:** Tööriista kutsumine annab veateate vastuse

**Silumisstrateegia:**
1. Loe veateadet tähelepanelikult
2. Kontrolli, kas parameetrite tüübid vastavad skeemile
3. Lisa try/catch plokid üksikasjalike veateadetega
4. Uuri serveri logisid virnastrateegiate (stack traces) jaoks

**Näide parandatud veakäsitlusest:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Tööriista loogika siin
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Stsenaarium 4: Ressursisisu tühi

**Sümptomid:** Ressurss tagastab tühja või null sisu

**Kontrollnimekiri:**
1. ✅ Failitee või URI on õige
2. ✅ Serveril on õigus ressurssi lugeda
3. ✅ Ressursisisu tagastatakse korrektselt

---

## Täiustatud Inspektori funktsioonid

### Kohandatud päised (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Üksikasjalik logimine

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Seansside salvestamine

Inspektor võimaldab sõnumiloge eksportida edasiseks analüüsiks:
1. Klõpsake sõnumipaneelil **Export Log**
2. Salvestage JSON-fail
3. Jagage meeskonnaliikmetega silumise hõlbustamiseks

---

## Parimad praktikad

1. **Testi varakult ja sageli** – kasuta Inspektorit arengu käigus, mitte ainult riketega silumise ajal
2. **Alusta lihtsast** – testi esmalt põhikonnektsiooni enne keerulisi tööriistakutseid
3. **Kontrolli skeemi** – paljud vead tulenevad parameetrite tüübi mittevastavusest
4. **Loe veateateid** – MCP vead on reeglina kirjeldavad
5. **Hoia Inspektor avatud** – see aitab probleemid varakult märgata

---

## Mis järgmiseks

Oled lõpetanud Mooduli 3: Algus! Jätka õppimist:

- [Moodul 4: Praktiline rakendamine](../../04-PracticalImplementation/README.md)

---

## Lisamaterjalid

- [MCP Inspektori GitHubi hoidla](https://github.com/modelcontextprotocol/inspector)
- [MCP Spetsifikatsioon - Protokolli sõnumid](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 spetsifikatsioon](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest loobumine**:  
See dokument on tõlgitud AI tõlketeenuse [Co-op Translator](https://github.com/Azure/co-op-translator) abil. Kuigi püüame tagada täpsust, palun arvestage, et automatiseeritud tõlked võivad sisaldada vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Tähtsa teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta käesoleva tõlke kasutamisest tulenevate arusaamatuste või valesti mõistmiste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->