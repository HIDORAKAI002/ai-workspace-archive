# Server MCP con trasporto stdio

> **⚠️ Aggiornamento Importante**: A partire dalla Specifica MCP 2025-06-18, il trasporto SSE standalone (Server-Sent Events) è stato **deprecato** e sostituito dal trasporto "Streamable HTTP". L'attuale specifica MCP definisce due meccanismi di trasporto principali:
> 1. **stdio** - Input/output standard (raccomandato per server locali)
> 2. **Streamable HTTP** - Per server remoti che possono usare internamente SSE
>
> Questa lezione è stata aggiornata per concentrarsi sul **trasporto stdio**, che è l'approccio raccomandato per la maggior parte delle implementazioni di server MCP.

Il trasporto stdio permette ai server MCP di comunicare con i client attraverso i flussi di input e output standard. Questo è il meccanismo di trasporto più comunemente usato e raccomandato nella specifica MCP attuale, fornendo un modo semplice ed efficiente per costruire server MCP che possono essere facilmente integrati con varie applicazioni client.

## Panoramica

Questa lezione tratta come costruire e consumare Server MCP usando il trasporto stdio.

## Obiettivi di apprendimento

Alla fine di questa lezione sarai in grado di:

- Costruire un Server MCP usando il trasporto stdio.
- Effettuare il debug di un Server MCP usando l'Inspector.
- Consumare un Server MCP usando Visual Studio Code.
- Comprendere i meccanismi di trasporto MCP attuali e perché è raccomandato stdio.


## Trasporto stdio - Come funziona

Il trasporto stdio è uno dei due tipi di trasporto supportati nell'attuale specifica MCP (2025-11-25). Ecco come funziona:

- **Comunicazione semplice**: il server legge messaggi JSON-RPC dallo standard input (`stdin`) e invia messaggi allo standard output (`stdout`).
- **Basato su processo**: il client avvia il server MCP come un sottoprocesso.
- **Formato messaggio**: i messaggi sono singole richieste, notifiche o risposte JSON-RPC, separate da newline.
- **Logging**: il server PUÒ scrivere stringhe UTF-8 sullo standard error (`stderr`) per scopi di logging.

### Requisiti chiave:
- I messaggi DEVONO essere delimitati da newline e NON DEVONO contenere newline incorporati
- Il server NON DEVE scrivere nulla su `stdout` che non sia un messaggio MCP valido
- Il client NON DEVE scrivere nulla su `stdin` del server che non sia un messaggio MCP valido

### TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

Nel codice precedente:

- Importiamo la classe `Server` e `StdioServerTransport` dal SDK MCP
- Creiamo un'istanza di server con configurazione e capacità base
- Creiamo un'istanza di `StdioServerTransport` e colleghiamo il server ad essa, abilitando la comunicazione su stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Crea istanza del server
server = Server("example-server")

@server.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

Nel codice precedente abbiamo:

- Creato un'istanza di server usando il SDK MCP
- Definito tools tramite decoratori
- Usato il context manager stdio_server per gestire il trasporto

### .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

builder.Services.AddLogging(logging => logging.AddConsole());

var app = builder.Build();
await app.RunAsync();
```

La differenza principale rispetto a SSE è che i server stdio:

- Non richiedono configurazione di un server web o endpoint HTTP
- Vengono avviati come sottoprocesso dal client
- Comunicano tramite flussi stdin/stdout
- Sono più semplici da implementare e debuggare

## Esercizio: Creare un server stdio

Per creare il nostro server dobbiamo tenere presente due cose:

- Dobbiamo usare un server web per esporre endpoint per la connessione e i messaggi.
## Laboratorio: Creare un semplice server MCP stdio

In questo laboratorio, creeremo un semplice server MCP utilizzando il trasporto stdio raccomandato. Questo server esporrà tools che i client possono chiamare usando il protocollo Model Context standard.

### Prerequisiti

- Python 3.8 o superiore
- MCP Python SDK: `pip install mcp`
- Conoscenze di base di programmazione asincrona

Iniziamo creando il nostro primo server MCP stdio:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Configura il logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Crea il server
server = Server("example-stdio-server")

@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool() 
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    # Usa il trasporto stdio
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Differenze principali rispetto all'approccio SSE deprecato

**Trasporto stdio (standard attuale):**
- Modello semplice di sottoprocesso - il client avvia il server come processo figlio
- Comunicazione via stdin/stdout usando messaggi JSON-RPC
- Nessuna configurazione server HTTP richiesta
- Migliore prestazioni e sicurezza
- Debug e sviluppo più semplici

**Trasporto SSE (deprecato a partire da MCP 2025-06-18):**
- Richiedeva un server HTTP con endpoint SSE
- Configurazione più complessa con infrastruttura server web
- Considerazioni di sicurezza aggiuntive per endpoint HTTP
- Ora sostituito da Streamable HTTP per scenari web

### Creare un server con trasporto stdio

Per creare il nostro server stdio dobbiamo:

1. **Importare le librerie necessarie** - Servono componenti server MCP e trasporto stdio
2. **Creare un'istanza server** - Definire il server con le sue capacità
3. **Definire i tools** - Aggiungere funzionalità da esporre
4. **Configurare il trasporto** - Configurare la comunicazione stdio
5. **Avviare il server** - Avviare il server e gestire i messaggi

Costruiamo passo passo:

### Passo 1: Creare un server stdio base

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Configura il logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Crea il server
server = Server("example-stdio-server")

@server.tool()
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

### Passo 2: Aggiungere più tools

```python
@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool()
def calculate_product(a: int, b: int) -> int:
    """Calculate the product of two numbers"""
    return a * b

@server.tool()
def get_server_info() -> dict:
    """Get information about this MCP server"""
    return {
        "server_name": "example-stdio-server",
        "version": "1.0.0",
        "transport": "stdio",
        "capabilities": ["tools"]
    }
```

### Passo 3: Avviare il server

Salva il codice come `server.py` e avvialo da linea di comando:

```bash
python server.py
```

Il server partirà e attenderà input da stdin. Comunica usando messaggi JSON-RPC sul trasporto stdio.

### Passo 4: Testare con l'Inspector

Puoi testare il tuo server usando MCP Inspector:

1. Installa l'Inspector: `npx @modelcontextprotocol/inspector`
2. Avvia l'Inspector e punta al tuo server
3. Testa i tools che hai creato

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Debuggare il tuo server stdio

### Usare MCP Inspector

MCP Inspector è uno strumento prezioso per il debug e il testing dei server MCP. Ecco come usarlo col tuo server stdio:

1. **Installa l'Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Avvia l'Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Testa il tuo server**: L'Inspector fornisce un'interfaccia web dove puoi:
   - Visualizzare le capacità del server
   - Testare i tools con parametri diversi
   - Monitorare i messaggi JSON-RPC
   - Debuggare problemi di connessione

### Usare VS Code

Puoi anche fare il debug del server MCP direttamente in VS Code:

1. Crea una configurazione di lancio in `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug MCP Server",
         "type": "python",
         "request": "launch",
         "program": "server.py",
         "console": "integratedTerminal"
       }
     ]
   }
   ```

2. Imposta breakpoint nel codice server
3. Avvia il debugger e testa con l'Inspector

### Consigli comuni per il debug

- Usa `stderr` per il logging - non scrivere mai su `stdout` che è riservato ai messaggi MCP
- Assicurati che tutti i messaggi JSON-RPC siano delimitati da newline
- Testa prima tools semplici prima di aggiungere funzionalità complesse
- Usa l'Inspector per verificare il formato dei messaggi

## Consumare il tuo server stdio in VS Code

Una volta creato il tuo server MCP stdio, puoi integrarlo in VS Code per usarlo con Claude o altri client compatibili MCP.

### Configurazione

1. **Crea un file di configurazione MCP** in `%APPDATA%\Claude\claude_desktop_config.json` (Windows) o `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

   ```json
   {
     "mcpServers": {
       "example-stdio-server": {
         "command": "python",
         "args": ["path/to/your/server.py"]
       }
     }
   }
   ```

2. **Riavvia Claude**: Chiudi e riapri Claude per caricare la nuova configurazione server.

3. **Testa la connessione**: Avvia una conversazione con Claude e prova a usare i tools del tuo server:
   - "Puoi salutarmi usando il tool saluto?"
   - "Calcola la somma di 15 e 27"
   - "Qual è l'informazione del server?"

### Esempio server stdio TypeScript

Ecco un esempio completo TypeScript come riferimento:

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-stdio-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Aggiungi strumenti
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_greeting",
        description: "Get a personalized greeting",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_greeting") {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${request.params.arguments?.name}! Welcome to MCP stdio server.`,
        },
      ],
    };
  } else {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

### Esempio server stdio .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

var app = builder.Build();
await app.RunAsync();

[McpServerToolType]
public class Tools
{
    [McpServerTool, Description("Get a personalized greeting")]
    public string GetGreeting(string name)
    {
        return $"Hello, {name}! Welcome to MCP stdio server.";
    }

    [McpServerTool, Description("Calculate the sum of two numbers")]
    public int CalculateSum(int a, int b)
    {
        return a + b;
    }
}
```

## Riepilogo

In questa lezione aggiornata, hai imparato a:

- Costruire server MCP usando il trasporto **stdio** attuale (approccio consigliato)
- Capire perché il trasporto SSE è stato deprecato a favore di stdio e Streamable HTTP
- Creare tools che possono essere chiamati da client MCP
- Debuggare il server con MCP Inspector
- Integrare il server stdio con VS Code e Claude

Il trasporto stdio fornisce un modo più semplice, sicuro e performante per costruire server MCP rispetto all'approccio SSE deprecato. È il trasporto consigliato per la maggior parte delle implementazioni server MCP secondo la specifica 2025-06-18.


### .NET

1. Creiamo prima alcuni tools, per questo creeremo un file *Tools.cs* con il seguente contenuto:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Esercizio: Testare il tuo server stdio

Ora che hai costruito il tuo server stdio, testiamolo per assicurarci che funzioni correttamente.

### Prerequisiti

1. Assicurati di avere installato MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Il codice server deve essere salvato (es. `server.py`)

### Test con l'Inspector

1. **Avvia l'Inspector con il tuo server**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Apri l'interfaccia web**: l'Inspector aprirà una finestra del browser mostrando le capacità del server.

3. **Testa i tools**: 
   - Prova il tool `get_greeting` con nomi diversi
   - Testa il tool `calculate_sum` con vari numeri
   - Chiama il tool `get_server_info` per vedere i metadati

4. **Monitora la comunicazione**: l'Inspector mostra i messaggi JSON-RPC scambiati tra client e server.

### Cosa dovresti vedere

Quando il server parte correttamente, dovresti vedere:
- Capacità del server elencate nell'Inspector
- Tools disponibili per il testing
- Scambi di messaggi JSON-RPC riusciti
- Risposte ai tools visualizzate nell'interfaccia

### Problemi comuni e soluzioni

**Server non si avvia:**
- Controlla che tutte le dipendenze siano installate: `pip install mcp`
- Verifica sintassi Python e indentazione
- Controlla eventuali messaggi di errore in console

**Tools non appaiono:**
- Assicurati che siano presenti i decoratori `@server.tool()`
- Controlla che le funzioni dei tools siano definite prima di `main()`
- Verifica che il server sia correttamente configurato

**Problemi di connessione:**
- Assicurati che il server stia usando correttamente il trasporto stdio
- Controlla che non ci siano altri processi interferenti
- Verifica la sintassi del comando Inspector

## Compito

Prova a estendere il tuo server con più funzionalità. Vedi [questa pagina](https://api.chucknorris.io/) per esempio per aggiungere un tool che chiama un’API. Decidi tu come deve essere il server. Buon divertimento :)
## Soluzione

[Soluzione](./solution/README.md) Ecco una possibile soluzione con codice funzionante.

## Punti chiave

I punti chiave di questo capitolo sono i seguenti:

- Il trasporto stdio è il meccanismo raccomandato per server MCP locali.
- Il trasporto stdio permette una comunicazione fluida tra server MCP e client usando flussi standard di input e output.
- Puoi usare sia Inspector che Visual Studio Code per consumare direttamente server stdio, rendendo il debug e l'integrazione molto semplici.

## Campioni

- [Calcolatrice Java](../samples/java/calculator/README.md)
- [Calcolatrice .Net](../../../../03-GettingStarted/samples/csharp)
- [Calcolatrice JavaScript](../samples/javascript/README.md)
- [Calcolatrice TypeScript](../samples/typescript/README.md)
- [Calcolatrice Python](../../../../03-GettingStarted/samples/python) 

## Risorse aggiuntive

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Cosa c'è dopo

## Passi successivi

Ora che hai imparato a costruire server MCP con il trasporto stdio, puoi esplorare argomenti più avanzati:

- **Successivo**: [Streaming HTTP con MCP (Streamable HTTP)](../06-http-streaming/README.md) - Scopri l’altro meccanismo di trasporto supportato per server remoti
- **Avanzato**: [Best Practices di Sicurezza MCP](../../02-Security/README.md) - Implementa la sicurezza nei server MCP
- **Produzione**: [Strategie di Deploy](../09-deployment/README.md) - Distribuisci i tuoi server in produzione

## Risorse aggiuntive

- [Specifiche MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Specifica ufficiale
- [Documentazione SDK MCP](https://github.com/modelcontextprotocol/sdk) - Riferimenti SDK per tutti i linguaggi
- [Esempi della community](../../06-CommunityContributions/README.md) - Altri esempi di server dalla community

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->