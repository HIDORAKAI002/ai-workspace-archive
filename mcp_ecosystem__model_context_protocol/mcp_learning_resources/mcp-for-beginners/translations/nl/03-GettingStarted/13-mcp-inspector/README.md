# Debuggen met MCP Inspector

De **MCP Inspector** is een essentiële debuggingtool waarmee je interactief je MCP-servers kunt testen en problemen kunt oplossen zonder dat je een volledige AI-hostapplicatie nodig hebt. Zie het als "Postman voor MCP" - het biedt een visuele interface om verzoeken te versturen, antwoorden te bekijken en te begrijpen hoe je server zich gedraagt.

## Waarom MCP Inspector gebruiken?

Bij het bouwen van MCP-servers kom je vaak deze uitdagingen tegen:

- **"Draait mijn server eigenlijk wel?"** - Inspector toont de verbindingsstatus
- **"Zijn mijn tools correct geregistreerd?"** - Inspector toont alle beschikbare tools
- **"Wat is het antwoordformaat?"** - Inspector toont volledige JSON-antwoorden
- **"Waarom werkt deze tool niet?"** - Inspector toont gedetailleerde foutmeldingen

## Vereisten

- Node.js 18+ geïnstalleerd
- npm (meegeleverd met Node.js)
- Een MCP-server om te testen (zie [Module 3.1 - Eerste Server](../01-first-server/README.md))

## Installatie

### Optie 1: Uitvoeren met npx (Aanbevolen voor snelle tests)

```bash
npx @modelcontextprotocol/inspector
```

### Optie 2: Globaal Installeren

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Optie 3: Toevoegen aan je project

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Toevoegen aan `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Verbinden met je Server

### stdio Servers (Lokaal Proces)

Voor servers die communiceren via standaard in-/uitvoer:

```bash
# Python-server
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js-server
npx @modelcontextprotocol/inspector node ./build/index.js

# Met omgevingsvariabelen
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP Servers (Netwerk)

Voor servers die draaien als HTTP-diensten:

1. Start je server eerst:
   ```bash
   python server.py  # Server draait op http://localhost:8080
   ```

2. Start Inspector en maak verbinding:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Overzicht van de Inspector Interface

Wanneer Inspector opstart, zie je een webinterface (gebruikelijk op `http://localhost:5173`):

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

## Tools Testen

### Beschikbare Tools Weergeven

1. Klik op het tabblad **Tools**
2. Inspector roept automatisch `tools/list` aan
3. Je ziet alle geregistreerde tools met:
   - Toolnaam
   - Beschrijving
   - Invoerschema (parameters)

### Een Tool Aanroepen

1. Selecteer een tool uit de lijst
2. Vul de vereiste parameters in het formulier in
3. Klik op **Run Tool**
4. Bekijk het antwoord in het resultatenpaneel

**Voorbeeld: Een calculator-tool testen**

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

### Debuggen van Tool-fouten

Als een tool faalt, toont Inspector:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Veelvoorkomende foutcodes:
| Code | Betekenis |
|------|------------|
| -32700 | Parsefout (ongeldige JSON) |
| -32600 | Ongeldig verzoek |
| -32601 | Methode niet gevonden |
| -32602 | Ongeldige parameters |
| -32603 | Interne fout |

---

## Bronnen Testen

### Bronnen Weergeven

1. Klik op het tabblad **Resources**
2. Inspector roept `resources/list` aan
3. Je ziet:
   - Resource URI's
   - Namen en beschrijvingen
   - MIME-typen

### Een Resource Lezen

1. Selecteer een resource
2. Klik op **Read Resource**
3. Bekijk de teruggegeven inhoud

**Voorbeeldoutput:**

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

## Prompts Testen

### Prompts Weergeven

1. Klik op het tabblad **Prompts**
2. Inspector roept `prompts/list` aan
3. Bekijk beschikbare prompt-templates

### Een Prompt Ophalen

1. Selecteer een prompt
2. Vul eventuele vereiste argumenten in
3. Klik op **Get Prompt**
4. Zie de gerenderde prompt-berichten

---

## Analyse van het Berichtlogboek

Het berichtlogboek toont alle MCP-protocolberichten:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Waar op te Letten

- **Request/Response-paren**: Elke `→` moet een bijpassende `←` hebben
- **Foutmeldingen**: Zoek naar `"error"` in antwoorden
- **Timing**: Grote gaps kunnen duiden op prestatieproblemen
- **Protocolversie**: Zorg dat server en client dezelfde versie gebruiken

---

## VS Code Integratie

Je kunt Inspector rechtstreeks vanuit VS Code uitvoeren:

### Gebruik van launch.json

Toevoegen aan `.vscode/launch.json`:

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

### Gebruik van Tasks

Toevoegen aan `.vscode/tasks.json`:

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

## Veelvoorkomende Debug-scenario's

### Scenario 1: Server Maakt Geen Verbinding

**Symptomen:** Inspector toont "Disconnected" of blijft hangen bij "Connecting..."

**Checklist:**
1. ✅ Is het servercommando correct?
2. ✅ Zijn alle dependencies geïnstalleerd?
3. ✅ Is het serverpad absoluut of relatief ten opzichte van de huidige map?
4. ✅ Zijn vereiste omgevingsvariabelen ingesteld?

**Debug-stappen:**
```bash
# Test de server eerst handmatig
python -c "import your_server_module; print('OK')"

# Controleer op importfouten
python -m your_server_module 2>&1 | head -20

# Verifieer dat MCP SDK is geïnstalleerd
pip show mcp
```

### Scenario 2: Tools Verschijnen Niet

**Symptomen:** Tools-tab toont een lege lijst

**Mogelijke oorzaken:**
1. Tools niet geregistreerd tijdens serverinitialisatie
2. Server is gecrasht na opstarten
3. `tools/list` handler geeft een lege array terug

**Debug-stappen:**
1. Controleer het berichtlogboek op `tools/list` antwoord
2. Voeg logging toe aan je tool-registratiecode
3. Verifieer dat `@mcp.tool()` decorators aanwezig zijn (Python)

### Scenario 3: Tool Geeft Fout Terug

**Symptomen:** Tool-aanroep geeft foutrespons

**Debug-aanpak:**
1. Lees de foutmelding goed door
2. Controleer of parametertypen overeenkomen met het schema
3. Voeg try/catch toe met gedetailleerde foutmeldingen
4. Controleer serverlogs op stacktraces

**Voorbeeld van verbeterde foutafhandeling:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Logica van het hulpmiddel hier
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Scenario 4: Resource-inhoud is Leeg

**Symptomen:** Resource levert antwoord, maar inhoud is leeg of null

**Checklist:**
1. ✅ Bestandspad of URI is correct
2. ✅ Server heeft toestemming om de resource te lezen
3. ✅ Resource-inhoud wordt correct teruggegeven

---

## Geavanceerde Inspector Functies

### Aangepaste Headers (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Gedetailleerde Logging

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Sessies Opnemen

Inspector kan berichtlogboeken exporteren voor latere analyse:
1. Klik op **Export Log** in het berichtpaneel
2. Sla het JSON-bestand op
3. Deel met teamleden voor debugging

---

## Beste Praktijken

1. **Test vroeg en vaak** - Gebruik Inspector tijdens ontwikkeling, niet alleen als er problemen zijn
2. **Begin eenvoudig** - Test basisconnectiviteit voor complexe tool-aanroepen
3. **Controleer het schema** - Veel fouten komen door typefouten in parameters
4. **Lees foutmeldingen** - MCP-fouten zijn meestal beschrijvend
5. **Houd Inspector open** - Het helpt problemen te ontdekken tijdens ontwikkeling

---

## Wat Nu?

Je hebt Module 3: Aan de slag voltooid! Ga door met leren:

- [Module 4: Praktische Implementatie](../../04-PracticalImplementation/README.md)

---

## Aanvullende Bronnen

- [MCP Inspector GitHub Repository](https://github.com/modelcontextprotocol/inspector)
- [MCP Specificatie - Protocolberichten](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 Specificatie](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dit document is vertaald met behulp van de AI-vertalingsdienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel wij streven naar nauwkeurigheid, dient u er rekening mee te houden dat automatische vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal dient als gezaghebbende bron te worden beschouwd. Voor belangrijke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->