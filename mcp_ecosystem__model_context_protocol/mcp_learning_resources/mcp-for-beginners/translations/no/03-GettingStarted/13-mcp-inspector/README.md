# Feilsøking med MCP Inspector

**MCP Inspector** er et viktig feilsøkingsverktøy som lar deg teste og feilsøke MCP-serverne dine interaktivt uten å trenge en full AI-host-applikasjon. Tenk på det som "Postman for MCP" - det gir et visuelt grensesnitt for å sende forespørsler, se svar og forstå hvordan serveren din oppfører seg.

## Hvorfor bruke MCP Inspector?

Når du bygger MCP-servere, vil du ofte støte på disse utfordringene:

- **"Kjører serveren min i det hele tatt?"** - Inspector viser tilkoblingsstatus
- **"Er verktøyene mine registrert riktig?"** - Inspector lister opp alle tilgjengelige verktøy
- **"Hva er responsformatet?"** - Inspector viser fullstendige JSON-responser
- **"Hvorfor fungerer ikke dette verktøyet?"** - Inspector viser detaljerte feilmeldinger

## Forutsetninger

- Node.js 18+ installert
- npm (følger med Node.js)
- En MCP-server å teste (se [Modul 3.1 - Første server](../01-first-server/README.md))

## Installasjon

### Alternativ 1: Kjør med npx (Anbefalt for rask testing)

```bash
npx @modelcontextprotocol/inspector
```

### Alternativ 2: Installer globalt

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Alternativ 3: Legg til i prosjektet ditt

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Legg til i `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Koble til serveren din

### stdio-servere (lokal prosess)

For servere som kommuniserer via standard input/output:

```bash
# Python-server
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js-server
npx @modelcontextprotocol/inspector node ./build/index.js

# Med miljøvariabler
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP-servere (nettverk)

For servere som kjører som HTTP-tjenester:

1. Start serveren først:
   ```bash
   python server.py  # Server kjører på http://localhost:8080
   ```

2. Start Inspector og koble til:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Oversikt over Inspector-grensesnittet

Når Inspector starter, vil du se et webgrensesnitt (ofte på `http://localhost:5173`):

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

## Testing av verktøy

### Liste over tilgjengelige verktøy

1. Klikk på fanen **Tools**
2. Inspector kaller automatisk `tools/list`
3. Du vil se alle registrerte verktøy med:
   - Verktøynavn
   - Beskrivelse
   - Inndataskjema (parametere)

### Kalle et verktøy

1. Velg et verktøy fra listen
2. Fyll ut de nødvendige parameterne i skjemaet
3. Klikk på **Run Tool**
4. Se responsen i resultatpanelet

**Eksempel: Testing av et kalkulatorverktøy**

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

### Feilsøking av verktøyfeil

Når et verktøy feiler, viser Inspector:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Vanlige feilkoder:
| Kode | Betydning |
|------|-----------|
| -32700 | Parsefeil (ugyldig JSON) |
| -32600 | Ugyldig forespørsel |
| -32601 | Metode ikke funnet |
| -32602 | Ugyldige parametre |
| -32603 | Intern feil |

---

## Testing av ressurser

### Liste over ressurser

1. Klikk på fanen **Resources**
2. Inspector kaller `resources/list`
3. Du vil se:
   - Ressurs-URIer
   - Navn og beskrivelser
   - MIME-typer

### Lese en ressurs

1. Velg en ressurs
2. Klikk på **Read Resource**
3. Se innholdet som returneres

**Eksempel på utdata:**

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

## Testing av prompts

### Liste over prompts

1. Klikk på fanen **Prompts**
2. Inspector kaller `prompts/list`
3. Se tilgjengelige prompt-maler

### Hente en prompt

1. Velg en prompt
2. Fyll ut eventuelle nødvendige argumenter
3. Klikk på **Get Prompt**
4. Se de rendrerte prompt-meldingene

---

## Analyse av meldingslogg

Meldingsloggen viser alle MCP-protokollmeldinger:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Hva du skal se etter

- **Forespørsels-/responspar**: Hver `→` burde ha en matchende `←`
- **Feilmeldinger**: Se etter `"error"` i svarene
- **Tidsbruk**: Store pauser kan tyde på ytelsesproblemer
- **Protokollversjon**: Sørg for at server og klient er enige om versjonen

---

## VS Code-integrasjon

Du kan kjøre Inspector direkte fra VS Code:

### Bruke launch.json

Legg til i `.vscode/launch.json`:

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

### Bruke Tasks

Legg til i `.vscode/tasks.json`:

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

## Vanlige feilsøkingsscenarioer

### Scenario 1: Server kobler ikke til

**Symptomer:** Inspector viser "Disconnected" eller henger på "Connecting..."

**Sjekkliste:**
1. ✅ Er serverkommandoen riktig?
2. ✅ Er alle avhengigheter installert?
3. ✅ Er serverbanen absolutt eller relativ til gjeldende katalog?
4. ✅ Er nødvendige miljøvariabler satt?

**Feilsøkingstrinn:**
```bash
# Test server manuelt først
python -c "import your_server_module; print('OK')"

# Sjekk for importfeil
python -m your_server_module 2>&1 | head -20

# Bekreft at MCP SDK er installert
pip show mcp
```

### Scenario 2: Verktøy vises ikke

**Symptomer:** Verktøyfanen viser tom liste

**Mulige årsaker:**
1. Verktøy ikke registrert under serveroppstart
2. Server krasjet etter oppstart
3. `tools/list`-handler returnerer tom tabell

**Feilsøkingstrinn:**
1. Sjekk meldingsloggen for `tools/list`-respons
2. Legg til logging i din verktøyregistrering
3. Bekreft at `@mcp.tool()`-dekoratører er til stede (Python)

### Scenario 3: Verktøy returnerer feil

**Symptomer:** Verktøysamtale gir feilsvar

**Feilsøkingsmetode:**
1. Les feilmeldingen nøye
2. Sjekk at parametertype samsvarer med skjemaet
3. Legg til try/catch med detaljerte feilmeldinger
4. Sjekk serverlogger for stacktraces

**Eksempel på forbedret feilbehandling:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Verktøylogikk her
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Scenario 4: Ressursinnhold er tomt

**Symptomer:** Ressurs returnerer, men innholdet er tomt eller null

**Sjekkliste:**
1. ✅ Filbane eller URI er korrekt
2. ✅ Server har tillatelse til å lese ressursen
3. ✅ Ressursinnhold returneres riktig

---

## Avanserte Inspector-funksjoner

### Egendefinerte overskrifter (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Detaljert logging

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Opptak av økter

Inspector kan eksportere meldingslogger for senere analyse:
1. Klikk på **Export Log** i meldingspanelet
2. Lagre JSON-filen
3. Del med teammedlemmer for feilsøking

---

## Beste praksis

1. **Test tidlig og ofte** - Bruk Inspector under utvikling, ikke bare når noe krasjer
2. **Start enkelt** - Test grunnleggende tilkobling før komplekse verktøysamtaler
3. **Sjekk skjemaet** - Mange feil skyldes feil parametertyper
4. **Les feilmeldinger** - MCP-feil er vanligvis beskrivende
5. **Hold Inspector åpen** - Det hjelper deg å oppdage problemer løpende

---

## Hva nå?

Du er ferdig med Modul 3: Komme i gang! Fortsett læringen din:

- [Modul 4: Praktisk implementering](../../04-PracticalImplementation/README.md)

---

## Ekstra ressurser

- [MCP Inspector GitHub Repository](https://github.com/modelcontextprotocol/inspector)
- [MCP-spesifikasjon - Protokollmeldinger](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0-spesifikasjon](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vennligst vær oppmerksom på at automatiserte oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på dets opprinnelige språk skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->