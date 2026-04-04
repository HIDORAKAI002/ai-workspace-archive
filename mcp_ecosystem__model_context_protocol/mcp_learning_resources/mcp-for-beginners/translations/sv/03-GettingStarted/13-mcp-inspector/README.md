# Felsökning med MCP Inspector

**MCP Inspector** är ett viktigt felsökningsverktyg som låter dig interaktivt testa och felsöka dina MCP-servrar utan att behöva en fullständig AI-värdapplikation. Tänk på det som "Postman för MCP" - det ger ett visuellt gränssnitt för att skicka förfrågningar, visa svar och förstå hur din server beter sig.

## Varför använda MCP Inspector?

När du bygger MCP-servrar stöter du ofta på dessa utmaningar:

- **"Kör min server överhuvudtaget?"** - Inspector visar anslutningsstatus
- **"Är mina verktyg registrerade korrekt?"** - Inspector listar alla tillgängliga verktyg
- **"Vad är svarsformatet?"** - Inspector visar fullständiga JSON-svar
- **"Varför fungerar inte detta verktyg?"** - Inspector visar detaljerade felmeddelanden

## Förutsättningar

- Node.js 18+ installerat
- npm (medföljer Node.js)
- En MCP-server att testa (se [Modul 3.1 - Första servern](../01-first-server/README.md))

## Installation

### Alternativ 1: Kör med npx (Rekommenderas för snabb testning)

```bash
npx @modelcontextprotocol/inspector
```

### Alternativ 2: Installera globalt

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Alternativ 3: Lägg till i ditt projekt

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Lägg till i `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Ansluta till din server

### stdio-servrar (lokal process)

För servrar som kommunicerar via standard in/ut:

```bash
# Python-server
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js-server
npx @modelcontextprotocol/inspector node ./build/index.js

# Med miljövariabler
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP-servrar (nätverk)

För servrar som körs som HTTP-tjänster:

1. Starta servern först:
   ```bash
   python server.py  # Servern körs på http://localhost:8080
   ```

2. Starta Inspector och anslut:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Inspector-gränssnittets översikt

När Inspector startar ser du ett webbgränssnitt (vanligtvis på `http://localhost:5173`):

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

## Testa verktyg

### Lista tillgängliga verktyg

1. Klicka på fliken **Tools**
2. Inspector anropar automatiskt `tools/list`
3. Du ser alla registrerade verktyg med:
   - Verktygsnamn
   - Beskrivning
   - Indataschema (parametrar)

### Anropa ett verktyg

1. Välj ett verktyg från listan
2. Fyll i de obligatoriska parametrarna i formuläret
3. Klicka på **Run Tool**
4. Se svaret i resultatpanelen

**Exempel: Testa ett kalkylatorverktyg**

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

### Felsökning av verktygsfel

När ett verktyg misslyckas visar Inspector:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Vanliga felkoder:
| Kod | Betydelse |
|------|------------|
| -32700 | Parsfel (ogiltig JSON) |
| -32600 | Ogiltig förfrågan |
| -32601 | Metod hittades inte |
| -32602 | Ogiltiga parametrar |
| -32603 | Intern fel |

---

## Testa resurser

### Lista resurser

1. Klicka på fliken **Resources**
2. Inspector anropar `resources/list`
3. Du ser:
   - Resursens URI:er
   - Namn och beskrivningar
   - MIME-typer

### Läsa en resurs

1. Välj en resurs
2. Klicka på **Read Resource**
3. Se det returnerade innehållet

**Exempelutdata:**

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

## Testa prompts

### Lista prompts

1. Klicka på fliken **Prompts**
2. Inspector anropar `prompts/list`
3. Se tillgängliga promptmallar

### Hämta en prompt

1. Välj en prompt
2. Fyll i eventuella obligatoriska argument
3. Klicka på **Get Prompt**
4. Se de renderade promptmeddelandena

---

## Analys av meddelandeloggen

Meddelandeloggen visar alla MCP-protokollmeddelanden:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Vad du ska leta efter

- **Förfrågan/svar-par**: Varje `→` bör ha en matchande `←`
- **Felmeddelanden**: Leta efter `"error"` i svaren
- **Tidsintervaller**: Stora luckor kan indikera prestandaproblem
- **Protokollversion**: Säkerställ att server och klient är överens om version

---

## VS Code-integration

Du kan köra Inspector direkt från VS Code:

### Använda launch.json

Lägg till i `.vscode/launch.json`:

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

### Använda Tasks

Lägg till i `.vscode/tasks.json`:

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

## Vanliga felsökningsscenarier

### Scenario 1: Servern ansluter inte

**Symptom:** Inspector visar "Disconnected" eller hänger vid "Connecting..."

**Checklista:**
1. ✅ Är serverkommandot korrekt?
2. ✅ Är alla beroenden installerade?
3. ✅ Är serverns sökväg absolut eller relativ till aktuell katalog?
4. ✅ Är nödvändiga miljövariabler satta?

**Felsökningssteg:**
```bash
# Testa servern manuellt först
python -c "import your_server_module; print('OK')"

# Kontrollera importfel
python -m your_server_module 2>&1 | head -20

# Verifiera att MCP SDK är installerat
pip show mcp
```

### Scenario 2: Verktyg visas inte

**Symptom:** Fliken Tools visar en tom lista

**Möjliga orsaker:**
1. Verktyg registrerades inte vid serverinitiering
2. Servern kraschade efter start
3. `tools/list`-hanteraren returnerar en tom array

**Felsökningssteg:**
1. Kontrollera meddelandeloggen för svar på `tools/list`
2. Lägg till loggning i din verktygsregistrering
3. Verifiera att `@mcp.tool()`-dekorationer finns (Python)

### Scenario 3: Verktyget returnerar fel

**Symptom:** Verktygsanrop returnerar ett fel

**Felsökningsstrategi:**
1. Läs felmeddelandet noggrant
2. Kontrollera att parametertyper matchar schemat
3. Lägg till try/catch med detaljerade felmeddelanden
4. Kontrollera serverloggar för stacktraces

**Exempel på förbättrad felhantering:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Verktygslogik här
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Scenario 4: Resursinnehållet är tomt

**Symptom:** Resurs returneras men innehållet är tomt eller null

**Checklista:**
1. ✅ Är filvägen eller URI korrekt?
2. ✅ Har servern behörighet att läsa resursen?
3. ✅ Returneras resursinnehållet korrekt?

---

## Avancerade Inspector-funktioner

### Anpassade headers (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Detaljerad loggning

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Spela in sessioner

Inspector kan exportera meddelandelogg för senare analys:
1. Klicka på **Export Log** i meddelandepanelen
2. Spara JSON-filen
3. Dela med teammedlemmar för felsökning

---

## Bästa praxis

1. **Testa tidigt och ofta** - Använd Inspector under utveckling, inte bara när något går fel
2. **Börja enkelt** - Testa grundläggande anslutning innan komplexa verktygsanrop
3. **Kontrollera schemat** - Många fel beror på fel i parametrars typer
4. **Läs felmeddelanden** - MCP-fel är oftast beskrivande
5. **Håll Inspector öppen** - Det hjälper dig fånga problem medan du utvecklar

---

## Vad är nästa steg

Du har slutfört Modul 3: Kom igång! Fortsätt din lärande:

- [Modul 4: Praktisk implementering](../../04-PracticalImplementation/README.md)

---

## Ytterligare resurser

- [MCP Inspector GitHub Repository](https://github.com/modelcontextprotocol/inspector)
- [MCP-specifikation - Protokollmeddelanden](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0-specifikation](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet bör du vara medveten om att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål ska betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller felaktiga tolkningar som uppstår från användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->