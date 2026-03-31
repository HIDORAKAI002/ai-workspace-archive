# Debugging con MCP Inspector

Il **MCP Inspector** è uno strumento di debugging essenziale che ti consente di testare e diagnosticare interattivamente i tuoi server MCP senza la necessità di un'applicazione host AI completa. Pensalo come il "Postman per MCP" - fornisce un'interfaccia visiva per inviare richieste, visualizzare risposte e comprendere come si comporta il tuo server.

## Perché Usare MCP Inspector?

Quando costruisci server MCP, incontrerai spesso queste sfide:

- **"Il mio server è in esecuzione?"** - Inspector mostra lo stato della connessione
- **"I miei strumenti sono registrati correttamente?"** - Inspector elenca tutti gli strumenti disponibili
- **"Qual è il formato della risposta?"** - Inspector visualizza le risposte JSON complete
- **"Perché questo strumento non funziona?"** - Inspector mostra messaggi di errore dettagliati

## Prerequisiti

- Node.js 18+ installato
- npm (incluso con Node.js)
- Un server MCP da testare (vedi [Modulo 3.1 - Primo Server](../01-first-server/README.md))

## Installazione

### Opzione 1: Esegui con npx (Consigliato per Test Rapidi)

```bash
npx @modelcontextprotocol/inspector
```

### Opzione 2: Installa Globalmente

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Opzione 3: Aggiungi al Tuo Progetto

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Aggiungi a `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Connessione al Tuo Server

### Server stdio (Processo Locale)

Per server che comunicano tramite input/output standard:

```bash
# Server Python
npx @modelcontextprotocol/inspector python -m your_server_module

# Server Node.js
npx @modelcontextprotocol/inspector node ./build/index.js

# Con variabili d'ambiente
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### Server SSE/HTTP (Rete)

Per server che funzionano come servizi HTTP:

1. Avvia prima il tuo server:
   ```bash
   python server.py  # Server in esecuzione su http://localhost:8080
   ```

2. Avvia Inspector e connettiti:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Panoramica dell'Interfaccia di Inspector

Quando si avvia Inspector, vedrai un'interfaccia web (tipicamente su `http://localhost:5173`):

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

## Test degli Strumenti

### Elenco Strumenti Disponibili

1. Clicca la scheda **Tools**
2. Inspector chiama automaticamente `tools/list`
3. Vedrai tutti gli strumenti registrati con:
   - Nome dello strumento
   - Descrizione
   - Schema di input (parametri)

### Invocare uno Strumento

1. Seleziona uno strumento dalla lista
2. Compila i parametri richiesti nel modulo
3. Clicca **Run Tool**
4. Visualizza la risposta nel pannello dei risultati

**Esempio: Test di uno strumento calcolatrice**

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

### Debug di Errori degli Strumenti

Quando uno strumento fallisce, Inspector mostra:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Codici di errore comuni:
| Codice | Significato |
|--------|-------------|
| -32700 | Errore di parsing (JSON non valido) |
| -32600 | Richiesta non valida |
| -32601 | Metodo non trovato |
| -32602 | Parametri non validi |
| -32603 | Errore interno |

---

## Test delle Risorse

### Elenco Risorse

1. Clicca la scheda **Resources**
2. Inspector chiama `resources/list`
3. Vedrai:
   - URI delle risorse
   - Nomi e descrizioni
   - Tipi MIME

### Lettura di una Risorsa

1. Seleziona una risorsa
2. Clicca **Read Resource**
3. Visualizza il contenuto restituito

**Esempio di output:**

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

## Test dei Prompt

### Elenco Prompt

1. Clicca la scheda **Prompts**
2. Inspector chiama `prompts/list`
3. Visualizza i modelli di prompt disponibili

### Ottenere un Prompt

1. Seleziona un prompt
2. Compila eventuali argomenti richiesti
3. Clicca **Get Prompt**
4. Vedi i messaggi del prompt renderizzati

---

## Analisi del Registro Messaggi

Il registro messaggi mostra tutti i messaggi del protocollo MCP:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Cosa Cercare

- **Coppie Richiesta/Risposta**: Ogni `→` dovrebbe avere un corrispondente `←`
- **Messaggi di errore**: Cerca `"error"` nelle risposte
- **Tempi**: Grandi pause possono indicare problemi di performance
- **Versione del protocollo**: Assicurati che server e client concordino sulla versione

---

## Integrazione con VS Code

Puoi eseguire Inspector direttamente da VS Code:

### Usando launch.json

Aggiungi a `.vscode/launch.json`:

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

### Usando Tasks

Aggiungi a `.vscode/tasks.json`:

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

## Scenari Comuni di Debugging

### Scenario 1: Il Server Non Si Connette

**Sintomi:** Inspector mostra "Disconnected" o si blocca su "Connecting..."

**Lista di controllo:**
1. ✅ Il comando del server è corretto?
2. ✅ Sono installate tutte le dipendenze?
3. ✅ Il percorso del server è assoluto o relativo alla directory corrente?
4. ✅ Le variabili di ambiente richieste sono impostate?

**Passi di debug:**
```bash
# Testa il server manualmente prima
python -c "import your_server_module; print('OK')"

# Controlla eventuali errori di importazione
python -m your_server_module 2>&1 | head -20

# Verifica che MCP SDK sia installato
pip show mcp
```

### Scenario 2: Strumenti Non Visualizzati

**Sintomi:** La scheda strumenti mostra una lista vuota

**Cause possibili:**
1. Strumenti non registrati durante l’inizializzazione del server
2. Il server è crashato dopo l’avvio
3. L’handler `tools/list` restituisce un array vuoto

**Passi di debug:**
1. Controlla il registro messaggi per la risposta `tools/list`
2. Aggiungi logging al codice di registrazione dello strumento
3. Verifica che i decoratori `@mcp.tool()` siano presenti (Python)

### Scenario 3: Lo Strumento Restituisce Errore

**Sintomi:** La chiamata allo strumento restituisce una risposta di errore

**Approccio al debug:**
1. Leggi attentamente il messaggio di errore
2. Controlla che i tipi dei parametri corrispondano allo schema
3. Aggiungi blocchi try/catch con messaggi di errore dettagliati
4. Controlla i log del server per tracce dello stack

**Esempio di gestione errori migliorata:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Logica dello strumento qui
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Scenario 4: Contenuto della Risorsa Vuoto

**Sintomi:** La risorsa viene restituita ma il contenuto è vuoto o nullo

**Lista di controllo:**
1. ✅ Il percorso del file o URI è corretto
2. ✅ Il server ha i permessi per leggere la risorsa
3. ✅ Il contenuto della risorsa viene restituito correttamente

---

## Funzionalità Avanzate di Inspector

### Header Personalizzati (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Logging Verboso

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Registrazione Sessioni

Inspector può esportare i registri dei messaggi per analisi successive:
1. Clicca **Export Log** nel pannello messaggi
2. Salva il file JSON
3. Condividilo con i membri del team per il debug

---

## Best Practice

1. **Testa presto e spesso** - Usa Inspector durante lo sviluppo, non solo quando si rompe qualcosa
2. **Inizia semplice** - Testa la connettività di base prima di chiamate strumento complesse
3. **Controlla lo schema** - Molti errori derivano da discrepanze nei tipi di parametri
4. **Leggi i messaggi di errore** - Gli errori MCP sono generalmente descrittivi
5. **Tieni Inspector aperto** - Aiuta a individuare problemi durante lo sviluppo

---

## Cosa Fare Dopo

Hai completato il Modulo 3: Getting Started! Continua il tuo apprendimento:

- [Modulo 4: Implementazione Pratica](../../04-PracticalImplementation/README.md)

---

## Risorse Aggiuntive

- [Repository GitHub MCP Inspector](https://github.com/modelcontextprotocol/inspector)
- [Specifiche MCP - Messaggi di Protocollo](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Specifiche JSON-RPC 2.0](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Questo documento è stato tradotto utilizzando il servizio di traduzione automatica AI [Co-op Translator](https://github.com/Azure/co-op-translator). Pur impegnandoci per garantire accuratezza, si prega di considerare che le traduzioni automatiche possono contenere errori o imprecisioni. Il documento originale nella sua lingua natia deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un umano. Non ci assumiamo alcuna responsabilità per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->