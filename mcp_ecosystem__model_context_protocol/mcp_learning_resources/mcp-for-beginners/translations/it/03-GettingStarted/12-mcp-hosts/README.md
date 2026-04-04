# Configurazione dei Client Host MCP Popolari

Questa guida copre come configurare e utilizzare server MCP con le applicazioni host AI più diffuse. Ogni host ha il proprio metodo di configurazione, ma una volta impostati, comunicano tutti con i server MCP usando il protocollo standardizzato.

## Cos'è un Host MCP?

Un **Host MCP** è un'applicazione AI che può connettersi a server MCP per estendere le sue capacità. Pensalo come il "front end" con cui gli utenti interagiscono, mentre i server MCP forniscono gli strumenti e i dati del "back end".

```mermaid
flowchart LR
    User[👤 Utente] --> Host[🖥️ Host MCP]
    Host --> S1[Server MCP A]
    Host --> S2[Server MCP B]
    Host --> S3[Server MCP C]
    
    subgraph "Host Popolari"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Prerequisiti

- Un server MCP a cui connettersi (vedi [Modulo 3.1 - Primo Server](../01-first-server/README.md))
- L'applicazione host installata sul tuo sistema
- Conoscenza di base dei file di configurazione JSON

---

## 1. Claude Desktop

**Claude Desktop** è l'applicazione desktop ufficiale di Anthropic che supporta nativamente MCP.

### Installazione

1. Scarica Claude Desktop da [claude.ai/download](https://claude.ai/download)
2. Installa e accedi con il tuo account Anthropic

### Configurazione

Claude Desktop utilizza un file di configurazione JSON per definire i server MCP.

**Posizione del file di configurazione:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Esempio di configurazione:**

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

### Opzioni di Configurazione

| Campo | Descrizione | Esempio |
|-------|-------------|---------|
| `command` | L'eseguibile da avviare | `"python"`, `"node"`, `"npx"` |
| `args` | Argomenti della linea di comando | `["-m", "my_server"]` |
| `env` | Variabili d'ambiente | `{"API_KEY": "xxx"}` |
| `cwd` | Directory di lavoro | `"/path/to/server"` |

### Test della Configurazione

1. Salva il file di configurazione
2. Riavvia completamente Claude Desktop (chiudi e riapri)
3. Apri una nuova conversazione
4. Cerca l'icona 🔌 che indica server connessi
5. Prova a chiedere a Claude di usare uno dei tuoi strumenti

### Risoluzione dei Problemi di Claude Desktop

**Server non visualizzato:**
- Controlla la sintassi del file di configurazione con un validatore JSON
- Assicurati che il percorso del comando sia corretto
- Controlla i log di Claude Desktop: Aiuto → Mostra Log

**Crash del server all'avvio:**
- Prova prima a lanciare manualmente il server da terminale
- Verifica che le variabili d'ambiente siano impostate correttamente
- Assicurati che tutte le dipendenze siano installate

---

## 2. VS Code con GitHub Copilot

VS Code supporta MCP tramite le estensioni GitHub Copilot Chat.

### Prerequisiti

1. VS Code versione 1.99+ installato
2. Estensione GitHub Copilot installata
3. Estensione GitHub Copilot Chat installata

### Configurazione

VS Code utilizza `.vscode/mcp.json` nelle impostazioni di workspace o utente.

**Configurazione del workspace** (`.vscode/mcp.json`):

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

**Impostazioni utente** (`settings.json`):

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

### Uso di MCP in VS Code

1. Apri il pannello Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
2. Digita `@` per vedere gli strumenti MCP disponibili
3. Usa linguaggio naturale per invocare strumenti: "Calcola 25 * 48 usando la calcolatrice"

### Risoluzione dei Problemi di VS Code

**Server MCP non caricati:**
- Controlla il pannello Output → "MCP" per errori
- Ricarica la finestra: Ctrl+Shift+P → "Developer: Reload Window"
- Verifica che il server funzioni autonomamente prima

---

## 3. Cursor

**Cursor** è un editor di codice AI-first con supporto MCP integrato.

### Installazione

1. Scarica Cursor da [cursor.sh](https://cursor.sh)
2. Installa e accedi

### Configurazione

Cursor usa un formato di configurazione simile a Claude Desktop.

**Posizione del file di configurazione:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Esempio di configurazione:**

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

### Uso di MCP in Cursor

1. Apri la chat AI di Cursor (Ctrl+L / Cmd+L)
2. Gli strumenti MCP appaiono automaticamente nei suggerimenti
3. Chiedi all'AI di eseguire compiti usando i server connessi

---

## 4. Cline (Basato su Terminale)

**Cline** è un client MCP basato su terminale, ideale per flussi di lavoro da riga di comando.

### Installazione

```bash
npm install -g @anthropic/cline
```

### Configurazione

Cline usa variabili d'ambiente e argomenti da linea di comando.

**Uso delle variabili d'ambiente:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Uso degli argomenti da linea di comando:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**File di configurazione** (`~/.clinerc`):

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

### Uso di Cline

```bash
# Avvia una sessione interattiva
cline

# Singola query con MCP
cline "Calculate the square root of 144 using the calculator"

# Elenca gli strumenti disponibili
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** è un altro editor di codice potenziato da AI con supporto MCP.

### Installazione

1. Scarica Windsurf da [codeium.com/windsurf](https://codeium.com/windsurf)
2. Installa e crea un account

### Configurazione

La configurazione di Windsurf è gestita tramite l'interfaccia delle impostazioni:

1. Apri Impostazioni (Ctrl+, / Cmd+,)
2. Cerca "MCP"
3. Clicca su "Modifica in settings.json"

**Esempio di configurazione:**

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

## Confronto dei Tipi di Trasporto

Diversi host supportano diversi metodi di trasporto:

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (input/output standard): Migliore per server locali avviati dall'host
**SSE/HTTP**: Migliore per server remoti o server condivisi tra più client

---

## Risoluzione dei Problemi Comuni

### Il server non si avvia

1. **Testa prima manualmente il server:**
   ```bash
   # Per Python
   python -m your_server_module
   
   # Per Node.js
   node /path/to/server/index.js
   ```

2. **Controlla il percorso del comando:**
   - Usa percorsi assoluti quando possibile
   - Assicurati che l'eseguibile sia nel tuo PATH

3. **Verifica le dipendenze:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Il server si connette ma gli strumenti non funzionano

1. **Controlla i log del server** - La maggior parte degli host dispone di opzioni di log
2. **Verifica la registrazione degli strumenti** - Usa MCP Inspector per testare
3. **Controlla i permessi** - Alcuni strumenti necessitano di accesso a file/rete

### Variabili d'ambiente non passate

- Alcuni host sanificano le variabili d'ambiente
- Usa esplicitamente il campo `env` nella configurazione
- Evita dati sensibili nei file di configurazione (usa la gestione segreti)

---

## Buone Pratiche di Sicurezza

1. **Non inserire mai chiavi API** nei file di configurazione
2. **Usa variabili d'ambiente** per dati sensibili
3. **Limita i permessi del server** solo a ciò che è necessario
4. **Revisiona il codice del server** prima di concedere accesso al tuo sistema
5. **Usa liste di permessi** per accesso a file system e rete

---

## Cosa Succede Dopo

- [3.13 - Debug con MCP Inspector](../13-mcp-inspector/README.md)
- [3.1 - Crea il tuo primo server MCP](../01-first-server/README.md)
- [Modulo 5 - Argomenti Avanzati](../../05-AdvancedTopics/README.md)

---

## Risorse Aggiuntive

- [Documentazione MCP di Claude Desktop](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [Estensione MCP per VS Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [Specifiche MCP - Trasporti](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Registro Ufficiale Server MCP](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Dichiarazione di non responsabilità**:
Questo documento è stato tradotto utilizzando il servizio di traduzione automatica [Co-op Translator](https://github.com/Azure/co-op-translator). Pur impegnandoci per l’accuratezza, si prega di notare che le traduzioni automatiche possono contenere errori o imprecisioni. Il documento originale nella sua lingua madre deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda la traduzione professionale effettuata da un esperto umano. Non siamo responsabili per eventuali incomprensioni o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->