# Debugging med MCP Inspector

**MCP Inspector** er et essentielt debugging-værktøj, der giver dig mulighed for interaktivt at teste og fejlfinde dine MCP-servere uden behov for en fuld AI-host-applikation. Tænk på det som "Postman for MCP" - det giver en visuel grænseflade til at sende forespørgsler, se svar og forstå, hvordan din server opfører sig.

## Hvorfor bruge MCP Inspector?

Når du bygger MCP-servere, vil du ofte støde på disse udfordringer:

- **"Kører min server overhovedet?"** - Inspector viser forbindelsesstatus
- **"Er mine værktøjer registreret korrekt?"** - Inspector viser alle tilgængelige værktøjer
- **"Hvad er svarkonfigurationen?"** - Inspector viser komplette JSON-svar
- **"Hvorfor virker dette værktøj ikke?"** - Inspector viser detaljerede fejlmeddelelser

## Forudsætninger

- Node.js 18+ installeret
- npm (medfølger Node.js)
- En MCP-server til test (se [Modul 3.1 - Første Server](../01-first-server/README.md))

## Installation

### Mulighed 1: Kør med npx (Anbefalet til hurtig test)

```bash
npx @modelcontextprotocol/inspector
```

### Mulighed 2: Installer globalt

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Mulighed 3: Tilføj til dit projekt

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Tilføj til `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Forbindelse til din server

### stdio-servere (lokal proces)

For servere, der kommunikerer via standard input/output:

```bash
# Python server
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js server
npx @modelcontextprotocol/inspector node ./build/index.js

# Med miljøvariabler
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP-servere (netværk)

For servere, der kører som HTTP-tjenester:

1. Start din server først:
   ```bash
   python server.py  # Server kører på http://localhost:8080
   ```

2. Start Inspector og forbind:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Inspector-grænseflade oversigt

Når Inspector starter, vil du se en webgrænseflade (typisk på `http://localhost:5173`):

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

## Test af værktøjer

### Liste over tilgængelige værktøjer

1. Klik på fanen **Tools**
2. Inspector kalder automatisk `tools/list`
3. Du vil se alle registrerede værktøjer med:
   - Værktøjsnavn
   - Beskrivelse
   - Inputskema (parametre)

### Kald et værktøj

1. Vælg et værktøj fra listen
2. Udfyld de krævede parametre i formularen
3. Klik på **Run Tool**
4. Se svaret i resultatpanelet

**Eksempel: Test af en regnemaskine-værktøj**

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

### Fejlfinding af værktøjsfejl

Når et værktøj fejler, viser Inspector:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Almindelige fejlkoder:
| Kode | Betydning |
|------|-----------|
| -32700 | Parse-fejl (ugyldig JSON) |
| -32600 | Ugyldig forespørgsel |
| -32601 | Metode ikke fundet |
| -32602 | Ugyldige parametre |
| -32603 | Intern fejl |

---

## Test af ressourcer

### Liste over ressourcer

1. Klik på fanen **Resources**
2. Inspector kalder `resources/list`
3. Du vil se:
   - Ressource-URI'er
   - Navne og beskrivelser
   - MIME-typer

### Læs en ressource

1. Vælg en ressource
2. Klik på **Read Resource**
3. Se det returnerede indhold

**Eksempel output:**

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

## Test af prompts

### Liste over prompts

1. Klik på fanen **Prompts**
2. Inspector kalder `prompts/list`
3. Se tilgængelige promptskabeloner

### Hent en prompt

1. Vælg en prompt
2. Udfyld eventuelle nødvendige argumenter
3. Klik på **Get Prompt**
4. Se de gengivne prompt-beskeder

---

## Analyse af meddelelseslog

Meddelelsesloggen viser alle MCP-protokolbeskeder:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Hvad du skal kigge efter

- **Forespørgsel/svar-par**: Hver `→` skal have et matchende `←`
- **Fejlmeddelelser**: Kig efter `"error"` i svarene
- **Timing**: Store pauser kan indikere performance-problemer
- **Protokolversion**: Sørg for, at server og klient er enige om version

---

## Integration med VS Code

Du kan køre Inspector direkte fra VS Code:

### Brug af launch.json

Tilføj til `.vscode/launch.json`:

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

### Brug af Tasks

Tilføj til `.vscode/tasks.json`:

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

## Almindelige debugging-scenarier

### Scenario 1: Server forbinder ikke

**Symptomer:** Inspector viser "Disconnected" eller hænger på "Connecting..."

**Tjekliste:**
1. ✅ Er serverkommandoen korrekt?
2. ✅ Er alle afhængigheder installeret?
3. ✅ Er serverstien absolut eller relativ til den aktuelle mappe?
4. ✅ Er nødvendige miljøvariabler sat?

**Debug trin:**
```bash
# Test server manuelt først
python -c "import your_server_module; print('OK')"

# Tjek for importfejl
python -m your_server_module 2>&1 | head -20

# Bekræft at MCP SDK er installeret
pip show mcp
```

### Scenario 2: Værktøjer vises ikke

**Symptomer:** Fanen Tools viser en tom liste

**Mulige årsager:**
1. Værktøjer ikke registreret under serverinitialisering
2. Serveren gik ned efter opstart
3. `tools/list` handler returnerer tom array

**Debug trin:**
1. Tjek meddelelsesloggen for `tools/list` svar
2. Tilføj logging til dit værktøjsregistreringskode
3. Bekræft at `@mcp.tool()` dekoratorer er til stede (Python)

### Scenario 3: Værktøj returnerer fejl

**Symptomer:** Kald til værktøj returnerer fejlrespons

**Debug-tilgang:**
1. Læs fejlmeddelelsen grundigt
2. Tjek at parametertyper matcher skemaet
3. Tilføj try/catch med detaljerede fejlmeddelelser
4. Tjek serverlogs for stack traces

**Eksempel på forbedret fejlhåndtering:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Værktøjslogik her
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Scenario 4: Ressource-indhold er tomt

**Symptomer:** Ressource returneres, men indhold er tomt eller null

**Tjekliste:**
1. ✅ Filsti eller URI er korrekt
2. ✅ Server har tilladelse til at læse ressourcen
3. ✅ Ressourceindhold returneres korrekt

---

## Avancerede Inspector-funktioner

### Egendefinerede headers (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Detaljeret logging

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Optagelsessessioner

Inspector kan eksportere meddelelseslogs til senere analyse:
1. Klik på **Export Log** i meddelelsespanelet
2. Gem JSON-filen
3. Del med teammedlemmer til fejlfinding

---

## Bedste praksis

1. **Test tidligt og ofte** - Brug Inspector under udvikling, ikke kun når noget går galt
2. **Start simpelt** - Test basal forbindelse før komplekse værktøjskald
3. **Tjek skemaet** - Mange fejl skyldes uoverensstemmelser i parametertyper
4. **Læs fejlmeddelelser** - MCP-fejl er ofte beskrivende
5. **Hold Inspector åben** - Det hjælper med at fange problemer under udvikling

---

## Hvad er næste skridt

Du har fuldført Modul 3: Kom godt i gang! Fortsæt din læring:

- [Modul 4: Praktisk implementering](../../04-PracticalImplementation/README.md)

---

## Yderligere ressourcer

- [MCP Inspector GitHub Repository](https://github.com/modelcontextprotocol/inspector)
- [MCP Specifikation - Protokolbeskeder](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 Specifikation](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, bedes du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det oprindelige dokument på originalsproget bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for eventuelle misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->