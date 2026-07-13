# Streaming HTTPS con Model Context Protocol (MCP)

Questo capitolo fornisce una guida completa per implementare uno streaming sicuro, scalabile e in tempo reale con il Model Context Protocol (MCP) utilizzando HTTPS. Copre la motivazione per lo streaming, i meccanismi di trasporto disponibili, come implementare HTTP streamable in MCP, le migliori pratiche di sicurezza, la migrazione da SSE e indicazioni pratiche per costruire le proprie applicazioni streaming MCP. 

> **Guardando avanti:** questa lezione descrive Streamable HTTP sotto la **Specificazione MCP 2025-11-25**, dove una sessione viene stabilita durante `initialize` e fissata con un'intestazione `Mcp-Session-Id`. Il candidato alla release `2026-07-28` rimuove completamente il handshake e l'ID sessione, rendendo ogni richiesta autosufficiente e instradabile a qualsiasi istanza server senza sessioni sticky. Vedi [Cosa sta cambiando in MCP: il candidato alla release 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) per dettagli.

## Meccanismi di Trasporto e Streaming in MCP

Questa sezione esplora i diversi meccanismi di trasporto disponibili in MCP e il loro ruolo nell'abilitare funzionalità di streaming per la comunicazione in tempo reale tra client e server.

### Cos'è un Meccanismo di Trasporto?

Un meccanismo di trasporto definisce come i dati vengono scambiati tra client e server. MCP supporta più tipi di trasporto per adattarsi a diversi ambienti e requisiti:

- **stdio**: Input/output standard, adatto per strumenti locali e basati su CLI. Semplice ma non adatto per web o cloud.
- **SSE (Server-Sent Events)**: Permette ai server di inviare aggiornamenti in tempo reale ai client tramite HTTP. Buono per interfacce web, ma limitato in scalabilità e flessibilità. Dalla Specifica MCP 2025-06-18, il trasporto standalone SSE (Server-Sent Events) è stato deprecato e sostituito dal trasporto "Streamable HTTP".
- **Streamable HTTP**: Trasporto streaming moderno basato su HTTP, supporta notifiche e migliore scalabilità. Raccomandato per la maggior parte degli scenari di produzione e cloud.

### Tabella di Confronto

Guarda la tabella di confronto qui sotto per comprendere le differenze tra questi meccanismi di trasporto:

| Trasporto        | Aggiornamenti in tempo reale | Streaming | Scalabilità | Caso d'uso               |
|------------------|-----------------------------|-----------|-------------|-------------------------|
| stdio            | No                          | No        | Bassa       | Strumenti CLI locali      |
| SSE              | Sì                          | Sì        | Media       | Web, aggiornamenti in tempo reale |
| Streamable HTTP  | Sì                          | Sì        | Alta        | Cloud, multi-client      |

> **Suggerimento:** La scelta del trasporto giusto impatta performance, scalabilità e esperienza utente. **Streamable HTTP** è raccomandato per applicazioni moderne, scalabili e pronte per il cloud.

Nota i trasporti stdio e SSE che hai visto nei capitoli precedenti e come lo streamable HTTP sia il trasporto trattato in questo capitolo.

## Streaming: Concetti e Motivazione

Comprendere i concetti fondamentali e le motivazioni dietro lo streaming è essenziale per implementare sistemi di comunicazione in tempo reale efficaci.

**Streaming** è una tecnica nella programmazione di rete che permette di inviare e ricevere dati in piccoli blocchi gestibili o come una sequenza di eventi, invece di attendere che tutta la risposta sia pronta. Questo è particolarmente utile per:

- File o dataset di grandi dimensioni.
- Aggiornamenti in tempo reale (es. chat, barre di progresso).
- Calcoli di lunga durata in cui si vuole tenere l’utente informato.

Ecco cosa devi sapere a livello alto sullo streaming:

- I dati vengono consegnati progressivamente, non tutti insieme.
- Il client può elaborare i dati man mano che arrivano.
- Riduce la latenza percepita e migliora l’esperienza utente.

### Perché usare lo streaming?

Le ragioni per utilizzare lo streaming sono le seguenti:

- Gli utenti ricevono feedback immediato, non solo alla fine
- Abilita applicazioni in tempo reale e interfacce reattive
- Uso più efficiente delle risorse di rete e di calcolo

### Esempio semplice: Server e Client HTTP Streaming

Ecco un esempio semplice di come si può implementare lo streaming:

#### Python

**Server (Python, usando FastAPI e StreamingResponse):**

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import time

app = FastAPI()

async def event_stream():
    for i in range(1, 6):
        yield f"data: Message {i}\n\n"
        time.sleep(1)

@app.get("/stream")
def stream():
    return StreamingResponse(event_stream(), media_type="text/event-stream")
```

**Client (Python, usando requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Questo esempio dimostra un server che invia una serie di messaggi al client non appena diventano disponibili, invece di attendere che tutti i messaggi siano pronti.

**Come funziona:**

- Il server restituisce ogni messaggio appena è pronto.
- Il client riceve e stampa ogni blocco appena arriva.

**Requisiti:**

- Il server deve usare una risposta in streaming (es. `StreamingResponse` in FastAPI).
- Il client deve processare la risposta come uno stream (`stream=True` in requests).
- Content-Type è solitamente `text/event-stream` o `application/octet-stream`.

#### Java

**Server (Java, usando Spring Boot e Server-Sent Events):**

```java
@RestController
public class CalculatorController {

    @GetMapping(value = "/calculate", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> calculate(@RequestParam double a,
                                                   @RequestParam double b,
                                                   @RequestParam String op) {
        
        double result;
        switch (op) {
            case "add": result = a + b; break;
            case "sub": result = a - b; break;
            case "mul": result = a * b; break;
            case "div": result = b != 0 ? a / b : Double.NaN; break;
            default: result = Double.NaN;
        }

        return Flux.<ServerSentEvent<String>>just(
                    ServerSentEvent.<String>builder()
                        .event("info")
                        .data("Calculating: " + a + " " + op + " " + b)
                        .build(),
                    ServerSentEvent.<String>builder()
                        .event("result")
                        .data(String.valueOf(result))
                        .build()
                )
                .delayElements(Duration.ofSeconds(1));
    }
}
```

**Client (Java, usando Spring WebFlux WebClient):**

```java
@SpringBootApplication
public class CalculatorClientApplication implements CommandLineRunner {

    private final WebClient client = WebClient.builder()
            .baseUrl("http://localhost:8080")
            .build();

    @Override
    public void run(String... args) {
        client.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/calculate")
                        .queryParam("a", 7)
                        .queryParam("b", 5)
                        .queryParam("op", "mul")
                        .build())
                .accept(MediaType.TEXT_EVENT_STREAM)
                .retrieve()
                .bodyToFlux(String.class)
                .doOnNext(System.out::println)
                .blockLast();
    }
}
```

**Note sull'implementazione Java:**

- Usa lo stack reattivo di Spring Boot con `Flux` per lo streaming
- `ServerSentEvent` fornisce streaming di eventi strutturati con tipi di evento
- `WebClient` con `bodyToFlux()` abilita il consumo streaming reattivo
- `delayElements()` simula il tempo di elaborazione tra eventi
- Gli eventi possono avere tipi (`info`, `result`) per una migliore gestione client

### Confronto: Streaming classico vs Streaming MCP

Le differenze tra come funziona lo streaming in maniera "classica" rispetto a come funziona in MCP possono essere rappresentate così:

| Caratteristica           | Streaming HTTP Classico       | Streaming MCP (Notifiche)        |
|-------------------------|------------------------------|---------------------------------|
| Risposta principale     | A blocchi                    | Singola, alla fine              |
| Aggiornamenti di progresso | Inviati come blocchi dati   | Inviati come notifiche           |
| Requisiti client        | Deve processare lo stream    | Deve implementare un handler per messaggi |
| Caso d'uso              | File grandi, flussi token AI | Progresso, log, feedback in tempo reale |

### Differenze chiave osservate

Inoltre, ecco alcune differenze chiave:

- **Schema di comunicazione:**
  - Streaming HTTP classico: usa la codifica transfer chunked semplice per inviare dati a blocchi
  - Streaming MCP: usa un sistema di notifiche strutturato con protocollo JSON-RPC

- **Formato messaggio:**
  - HTTP classico: blocchi di testo semplice con newline
  - MCP: oggetti strutturati LoggingMessageNotification con metadati

- **Implementazione client:**
  - HTTP classico: client semplice che processa risposte in streaming
  - MCP: client più sofisticato con handler per processare diversi tipi di messaggi

- **Aggiornamenti di progresso:**
  - HTTP classico: il progresso è parte dello stream principale della risposta
  - MCP: il progresso viene inviato tramite messaggi di notifica separati mentre la risposta principale arriva alla fine

### Raccomandazioni

Ci sono alcune cose che raccomandiamo quando si tratta di scegliere tra implementare streaming classico (come un endpoint mostrato sopra usando `/stream`) o scegliere lo streaming tramite MCP.

- **Per esigenze di streaming semplici:** lo streaming HTTP classico è più semplice da implementare e sufficiente per necessità di base.

- **Per applicazioni complesse e interattive:** lo streaming MCP offre un approccio più strutturato con metadati più ricchi e separazione tra notifiche e risultati finali.

- **Per applicazioni AI:** il sistema di notifiche di MCP è particolarmente utile per task AI di lunga durata dove si vuole tenere l’utente informato sul progresso.

## Streaming in MCP

Ok, quindi hai visto alcune raccomandazioni e confronti finora sulla differenza tra streaming classico e streaming in MCP. Entriamo nel dettaglio esatto di come puoi sfruttare lo streaming in MCP.

Capire come lo streaming funziona all’interno del framework MCP è essenziale per costruire applicazioni reattive che forniscano feedback in tempo reale agli utenti durante operazioni di lunga durata.

In MCP, lo streaming non consiste nell’inviare la risposta principale a blocchi, ma nell’inviare **notifiche** al client mentre uno strumento elabora una richiesta. Queste notifiche possono includere aggiornamenti di progresso, log o altri eventi.

### Come funziona

Il risultato principale è ancora inviato come risposta singola. Tuttavia, le notifiche possono essere inviate come messaggi separati durante l’elaborazione per aggiornare il client in tempo reale. Il client deve essere in grado di gestire e visualizzare queste notifiche.

## Cos'è una Notifica?

Abbiamo detto "Notifica", cosa significa in MCP?

Una notifica è un messaggio inviato dal server al client per informare sul progresso, stato o altri eventi durante un’operazione di lunga durata. Le notifiche migliorano la trasparenza e l’esperienza utente.

Ad esempio, un client dovrebbe inviare una notifica una volta completato il handshake iniziale con il server.

Una notifica appare così come messaggio JSON:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Le notifiche appartengono a un topic in MCP denominato ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Per far funzionare il logging, il server deve abilitarlo come funzionalità/capacità così:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> A seconda dell’SDK utilizzato, il logging potrebbe essere abilitato di default o potrebbe essere necessario abilitarlo esplicitamente nella configurazione del server.

Ci sono diversi tipi di notifiche:

| Livello    | Descrizione                   | Esempio di caso d’uso        |
|------------|------------------------------|------------------------------|
| debug      | Informazioni dettagliate per debug | Punti di entrata/uscita funzioni |
| info       | Messaggi informativi generali  | Aggiornamenti sul progresso  |
| notice     | Eventi normali ma significativi | Modifiche di configurazione  |
| warning    | Condizioni di avviso           | Uso di funzionalità deprecate |
| error      | Condizioni di errore           | Fallimenti di operazioni     |
| critical   | Condizioni critiche            | Fallimenti componenti sistema |
| alert      | Azione urgente necessaria      | Rilevata corruzione dati     |
| emergency  | Sistema inutilizzabile         | Guasto completo sistema      |

## Implementare le Notifiche in MCP

Per implementare le notifiche in MCP, devi configurare sia il lato server che client per gestire aggiornamenti in tempo reale. Questo permette alla tua applicazione di fornire feedback immediati agli utenti durante operazioni di lunga durata.

### Lato server: Invio notifiche

Iniziamo dal lato server. In MCP definisci strumenti che possono inviare notifiche mentre processano richieste. Il server usa l’oggetto context (solitamente `ctx`) per inviare messaggi al client.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Nell'esempio precedente, lo strumento `process_files` invia tre notifiche al client mentre elabora ciascun file. Il metodo `ctx.info()` viene usato per inviare messaggi informativi.

Inoltre, per abilitare le notifiche, assicurati che il tuo server utilizzi un trasporto in streaming (come `streamable-http`) e che il client implementi un handler per processare le notifiche. Ecco come configurare il server per usare il trasporto `streamable-http`:

```python
mcp.run(transport="streamable-http")
```

#### .NET

```csharp
[Tool("A tool that sends progress notifications")]
public async Task<TextContent> ProcessFiles(string message, ToolContext ctx)
{
    await ctx.Info("Processing file 1/3...");
    await ctx.Info("Processing file 2/3...");
    await ctx.Info("Processing file 3/3...");
    return new TextContent
    {
        Type = "text",
        Text = $"Done: {message}"
    };
}
```

In questo esempio .NET, lo strumento `ProcessFiles` è decorato con l’attributo `Tool` e invia tre notifiche al client mentre elabora ciascun file. Il metodo `ctx.Info()` è usato per inviare messaggi informativi.

Per abilitare le notifiche nel server MCP .NET, assicurati di usare un trasporto in streaming:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Lato client: Ricezione notifiche

Il client deve implementare un handler per messaggi per processare e mostrare notifiche man mano che arrivano.

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)

async with ClientSession(
   read_stream, 
   write_stream,
   logging_callback=logging_collector,
   message_handler=message_handler,
) as session:
```

Nel codice precedente, la funzione `message_handler` verifica se il messaggio in arrivo è una notifica. Se lo è, stampa la notifica; altrimenti la elabora come messaggio server normale. Nota inoltre come `ClientSession` sia inizializzato con `message_handler` per gestire le notifiche in arrivo.

#### .NET

```csharp
// Define a message handler
void MessageHandler(IJsonRpcMessage message)
{
    if (message is ServerNotification notification)
    {
        Console.WriteLine($"NOTIFICATION: {notification}");
    }
    else
    {
        Console.WriteLine($"SERVER MESSAGE: {message}");
    }
}

// Create and use a client session with the message handler
var clientOptions = new ClientSessionOptions
{
    MessageHandler = MessageHandler,
    LoggingCallback = (level, message) => Console.WriteLine($"[{level}] {message}")
};

using var client = new ClientSession(readStream, writeStream, clientOptions);
await client.InitializeAsync();

// Now the client will process notifications through the MessageHandler
```

In questo esempio .NET, la funzione `MessageHandler` verifica se il messaggio in arrivo è una notifica. Se lo è, stampa la notifica; altrimenti la processa come messaggio server standard. La `ClientSession` viene inizializzata con l’handler tramite `ClientSessionOptions`.

Per abilitare le notifiche, assicurati che il server usi un trasporto in streaming (come `streamable-http`) e che il client implementi un handler per processare le notifiche.

## Notifiche di Progresso & Scenari

Questa sezione spiega il concetto di notifiche di progresso in MCP, perché sono importanti e come implementarle usando Streamable HTTP. Troverai anche un esercizio pratico per rafforzare la tua comprensione.

Le notifiche di progresso sono messaggi in tempo reale inviati dal server al client durante operazioni di lunga durata. Invece di aspettare che l’intero processo termini, il server continua a tenere aggiornato il client sullo stato corrente. Questo migliora trasparenza, esperienza utente e facilita il debug.

**Esempio:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Perché usare notifiche di progresso?

Le notifiche di progresso sono essenziali per diversi motivi:

- **Migliore esperienza utente:** gli utenti vedono aggiornamenti mano a mano che il lavoro procede, non solo alla fine.
- **Feedback in tempo reale:** i client possono mostrare barre di progresso o log, rendendo l’app reattiva.
- **Debugging e monitoraggio facilitati:** sviluppatori e utenti possono capire dove un processo è lento o bloccato.

### Come implementare notifiche di progresso

Ecco come implementare notifiche di progresso in MCP:

- **Sul server:** usa `ctx.info()` o `ctx.log()` per inviare notifiche man mano che ogni elemento viene elaborato. Questo invia un messaggio al client prima che il risultato principale sia disponibile.
- **Sul client:** implementa un handler per messaggi che ascolta e visualizza le notifiche in arrivo. Questo handler distingue tra notifiche e risultato finale.

**Esempio server:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Esempio client:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Considerazioni di sicurezza

Quando si implementano server MCP con trasporti basati su HTTP, la sicurezza diventa una preoccupazione fondamentale che richiede attenzione a molteplici vettori di attacco e meccanismi di protezione.

### Panoramica

La sicurezza è critica quando si espongono server MCP tramite HTTP. Streamable HTTP introduce nuove superfici di attacco e richiede configurazioni attente.

### Punti chiave
- **Validazione dell'Header Origin**: Valida sempre l'header `Origin` per prevenire attacchi di DNS rebinding.
- **Binding a Localhost**: Per lo sviluppo locale, associa i server a `localhost` per evitare di esporli a internet pubblico.
- **Autenticazione**: Implementa l'autenticazione (ad esempio, chiavi API, OAuth) per le distribuzioni in produzione.
- **CORS**: Configura le politiche di Cross-Origin Resource Sharing (CORS) per limitare l'accesso.
- **HTTPS**: Usa HTTPS in produzione per criptare il traffico.

### Best Practices

- Non fidarti mai delle richieste in arrivo senza validazione.
- Registra e monitora tutti gli accessi e gli errori.
- Aggiorna regolarmente le dipendenze per correggere vulnerabilità di sicurezza.

### Sfide

- Bilanciare la sicurezza con la facilità di sviluppo
- Garantire la compatibilità con diversi ambienti client

## Aggiornamento da SSE a Streamable HTTP

Per le applicazioni che attualmente utilizzano Server-Sent Events (SSE), migrare a Streamable HTTP offre funzionalità migliorate e una migliore sostenibilità a lungo termine per le implementazioni MCP.

### Perché Aggiornare?

Ci sono due motivi convincenti per aggiornare da SSE a Streamable HTTP:

- Streamable HTTP offre migliore scalabilità, compatibilità e supporto per notifiche più ricche rispetto a SSE.
- È il trasporto raccomandato per le nuove applicazioni MCP.

### Passi per la Migrazione

Ecco come puoi migrare da SSE a Streamable HTTP nelle tue applicazioni MCP:

- **Aggiorna il codice server** per usare `transport="streamable-http"` in `mcp.run()`.
- **Aggiorna il codice client** per usare `streamablehttp_client` al posto del client SSE.
- **Implementa un gestore di messaggi** nel client per processare le notifiche.
- **Testa la compatibilità** con gli strumenti e i flussi di lavoro esistenti.

### Mantenere la Compatibilità

Si raccomanda di mantenere la compatibilità con i client SSE esistenti durante il processo di migrazione. Ecco alcune strategie:

- Puoi supportare sia SSE che Streamable HTTP eseguendo entrambi i trasporti su endpoint diversi.
- Migra gradualmente i client al nuovo trasporto.

### Sfide

Assicurati di affrontare le seguenti sfide durante la migrazione:

- Garantire che tutti i client siano aggiornati
- Gestire le differenze nella consegna delle notifiche

## Considerazioni sulla Sicurezza

La sicurezza deve essere una priorità assoluta quando si implementa un server, specialmente quando si utilizzano trasporti basati su HTTP come Streamable HTTP in MCP.

Quando si implementano server MCP con trasporti basati su HTTP, la sicurezza diventa una preoccupazione fondamentale che richiede attenzione a molteplici vettori di attacco e meccanismi di protezione.

### Panoramica

La sicurezza è cruciale quando si espongono server MCP su HTTP. Streamable HTTP introduce nuove superfici di attacco e richiede una configurazione accurata.

Ecco alcune considerazioni chiave sulla sicurezza:

- **Validazione dell'Header Origin**: Valida sempre l'header `Origin` per prevenire attacchi di DNS rebinding.
- **Binding a Localhost**: Per lo sviluppo locale, associa i server a `localhost` per evitare di esporli a internet pubblico.
- **Autenticazione**: Implementa l'autenticazione (ad esempio, chiavi API, OAuth) per le distribuzioni in produzione.
- **CORS**: Configura le politiche di Cross-Origin Resource Sharing (CORS) per limitare l'accesso.
- **HTTPS**: Usa HTTPS in produzione per criptare il traffico.

### Best Practices

Inoltre, ecco alcune best practice da seguire quando implementi la sicurezza nel tuo server di streaming MCP:

- Non fidarti mai delle richieste in arrivo senza validazione.
- Registra e monitora tutti gli accessi e gli errori.
- Aggiorna regolarmente le dipendenze per correggere vulnerabilità di sicurezza.

### Sfide

Affronterai alcune sfide quando implementerai la sicurezza nei server di streaming MCP:

- Bilanciare la sicurezza con la facilità di sviluppo
- Garantire la compatibilità con diversi ambienti client

### Esercizio: Costruisci la Tua App MCP Streaming

**Scenario:**
Costruisci un server MCP e un client dove il server elabora una lista di elementi (es. file o documenti) e invia una notifica per ogni elemento elaborato. Il client deve mostrare ogni notifica man mano che arriva.

**Passi:**

1. Implementa uno strumento server che elabora una lista e invia notifiche per ogni elemento.
2. Implementa un client con un gestore di messaggi per mostrare le notifiche in tempo reale.
3. Testa la tua implementazione eseguendo sia server che client e osserva le notifiche.

[Solution](./solution/README.md)

## Ulteriori Letture & Cosa Fare Dopo?

Per proseguire il tuo percorso con MCP streaming ed espandere le tue conoscenze, questa sezione fornisce risorse aggiuntive e suggerimenti per passaggi successivi per costruire applicazioni più avanzate.

### Ulteriori Letture

- [Microsoft: Introduzione allo Streaming HTTP](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Cosa Fare Dopo?

- Prova a costruire strumenti MCP più avanzati che utilizzano lo streaming per analisi in tempo reale, chat o editing collaborativo.
- Esplora l'integrazione dello streaming MCP con framework frontend (React, Vue, ecc.) per aggiornamenti UI live.
- Prossimo: [Utilizzo dell'AI Toolkit per VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->