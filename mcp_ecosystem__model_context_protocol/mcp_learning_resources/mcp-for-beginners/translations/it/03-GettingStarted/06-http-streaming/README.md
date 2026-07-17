# Streaming HTTPS con il Model Context Protocol (MCP)

Questo capitolo fornisce una guida completa all'implementazione dello streaming sicuro, scalabile e in tempo reale con il Model Context Protocol (MCP) usando HTTPS. Copre la motivazione per lo streaming, i meccanismi di trasporto disponibili, come implementare l’HTTP streamabile in MCP, le migliori pratiche di sicurezza, la migrazione da SSE e una guida pratica per costruire le proprie applicazioni MCP streaming.

> **Guardando avanti:** questa lezione descrive lo Streamable HTTP secondo la **MCP Specification 2025-11-25**, dove una sessione viene stabilita durante `initialize` e fissata con un header `Mcp-Session-Id`. La release candidate `2026-07-28` rimuove completamente il handshake e l’ID di sessione, rendendo ogni richiesta autonoma e instradabile a qualsiasi istanza server senza sessioni appiccicose. Vedi [What’s Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) per dettagli.

## Meccanismi di Trasporto e Streaming in MCP

Questa sezione esplora i diversi meccanismi di trasporto disponibili in MCP e il loro ruolo nel rendere possibile lo streaming per la comunicazione in tempo reale tra client e server.

### Cos’è un Meccanismo di Trasporto?

Un meccanismo di trasporto definisce come i dati vengono scambiati tra client e server. MCP supporta più tipi di trasporto per adattarsi a diversi ambienti e requisiti:

- **stdio**: Input/output standard, adatto a strumenti locali e basati su CLI. Semplice ma non adatto per web o cloud.
- **SSE (Server-Sent Events)**: Permette ai server di inviare aggiornamenti in tempo reale ai client tramite HTTP. Ottimo per interfacce web, ma limitato in scalabilità e flessibilità. A partire dalla MCP Specification 2025-06-18, il trasporto SSE standalone è stato deprecato e sostituito dallo "Streamable HTTP".
- **Streamable HTTP**: Trasporto di streaming moderno basato su HTTP, che supporta notifiche e migliore scalabilità. Raccomandato per la maggior parte dei casi d’uso in produzione e cloud.

### Tabella di Confronto

Dai un’occhiata alla tabella di confronto qui sotto per capire le differenze tra questi meccanismi di trasporto:

| Trasporto         | Aggiornamenti in tempo reale | Streaming | Scalabilità | Caso d’uso               |
|-------------------|-----------------------------|-----------|-------------|--------------------------|
| stdio             | No                          | No        | Bassa       | Strumenti CLI locali      |
| SSE               | Sì                          | Sì        | Media       | Web, aggiornamenti in tempo reale  |
| Streamable HTTP   | Sì                          | Sì        | Alta        | Cloud, multi-client       |

> **Suggerimento:** la scelta del trasporto giusto influisce su prestazioni, scalabilità ed esperienza utente. **Streamable HTTP** è raccomandato per applicazioni moderne, scalabili e pronte per il cloud.

Nota i trasporti stdio e SSE mostrati nei capitoli precedenti e come quello streamable HTTP sia il trasporto trattato in questo capitolo.

## Streaming: Concetti e Motivazione

Comprendere i concetti fondamentali e le motivazioni dietro lo streaming è essenziale per implementare sistemi di comunicazione in tempo reale efficaci.

**Lo streaming** è una tecnica nella programmazione di rete che consente di inviare e ricevere dati in piccoli blocchi gestibili o come sequenza di eventi, invece di aspettare che l'intera risposta sia pronta. Questo è particolarmente utile per:

- File o dataset di grandi dimensioni.
- Aggiornamenti in tempo reale (es. chat, barre di progresso).
- Computazioni a lunga durata dove si vuole mantenere informato l’utente.

Ecco cosa devi sapere sullo streaming a livello alto:

- I dati vengono consegnati progressivamente, non tutti insieme.
- Il client può elaborare i dati man mano che arrivano.
- Riduce la latenza percepita e migliora l’esperienza utente.

### Perché usare lo streaming?

I motivi per usare lo streaming sono i seguenti:

- Gli utenti ricevono feedback immediato, non solo alla fine.
- Consente applicazioni in tempo reale e interfacce reattive.
- Uso più efficiente delle risorse di rete e calcolo.

### Esempio Semplice: Server & Client HTTP Streaming

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

Questo esempio mostra un server che invia una serie di messaggi al client man mano che diventano disponibili, invece di aspettare che tutti i messaggi siano pronti.

**Come funziona:**

- Il server trasmette ogni messaggio appena è pronto.
- Il client riceve e stampa ogni blocco man mano che arriva.

**Requisiti:**

- Il server deve usare una risposta streaming (es. `StreamingResponse` in FastAPI).
- Il client deve processare la risposta come uno stream (`stream=True` in requests).
- Il Content-Type è di solito `text/event-stream` o `application/octet-stream`.

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

**Note sull’implementazione Java:**

- Usa lo stack reattivo di Spring Boot con `Flux` per lo streaming
- `ServerSentEvent` fornisce streaming di eventi strutturati con tipi di evento
- `WebClient` con `bodyToFlux()` permette il consumo reattivo dello streaming
- `delayElements()` simula il tempo di elaborazione tra gli eventi
- Gli eventi possono avere tipi (`info`, `result`) per una migliore gestione lato client

### Confronto: Streaming Classico vs Streaming MCP

Le differenze tra come funziona lo streaming "classico" e come funziona in MCP possono essere rappresentate così:

| Caratteristica           | Streaming HTTP Classico       | Streaming MCP (Notifiche)       |
|-------------------------|-------------------------------|---------------------------------|
| Risposta principale      | A blocchi                     | Singola, alla fine              |
| Aggiornamenti di progresso | Inviati come blocchi dati     | Inviati come notifiche          |
| Requisiti client         | Deve processare lo stream     | Deve implementare un gestore di messaggi |
| Caso d’uso              | File grandi, stream di token AI| Progresso, log, feedback in tempo reale|

### Differenze Chiave Osservate

Inoltre, ecco alcune differenze chiave:

- **Schema di Comunicazione:**
  - Streaming HTTP classico: usa semplice encoding chunked per inviare dati a blocchi
  - Streaming MCP: usa un sistema di notifiche strutturato con protocollo JSON-RPC

- **Formato del Messaggio:**
  - HTTP classico: blocchi di testo semplice con newline
  - MCP: oggetti strutturati LoggingMessageNotification con metadati

- **Implementazione Client:**
  - HTTP classico: client semplice che processa risposte streaming
  - MCP: client più sofisticato con un gestore di messaggi che elabora diversi tipi di messaggi

- **Aggiornamenti di Progresso:**
  - HTTP classico: il progresso fa parte dello stream di risposta principale
  - MCP: il progresso è inviato tramite messaggi di notifica separati mentre il risultato principale arriva alla fine

### Raccomandazioni

Ci sono alcune cose che raccomandiamo quando si tratta di scegliere tra implementare lo streaming classico (come endpoint mostrato sopra usando `/stream`) rispetto allo streaming via MCP.

- **Per necessità di streaming semplici:** lo streaming HTTP classico è più semplice da implementare e sufficiente per esigenze base.

- **Per applicazioni complesse e interattive:** lo streaming MCP fornisce un approccio più strutturato con metadati ricchi e separazione tra notifiche e risultati finali.

- **Per applicazioni AI:** il sistema di notifiche MCP è particolarmente utile per task AI di lunga durata in cui si vuole mantenere gli utenti informati sul progresso.

## Streaming in MCP

Ok, quindi hai visto alcune raccomandazioni e confronti finora sulla differenza tra streaming classico e streaming MCP. Vediamo nel dettaglio esattamente come puoi sfruttare lo streaming in MCP.

Comprendere come lo streaming funziona all’interno del framework MCP è essenziale per costruire applicazioni reattive che forniscano feedback in tempo reale agli utenti durante operazioni lunghe.

In MCP, lo streaming non riguarda l’invio della risposta principale a blocchi, ma l’invio di **notifiche** al client mentre uno strumento sta processando una richiesta. Queste notifiche possono includere aggiornamenti di progresso, log o altri eventi.

### Come funziona

Il risultato principale viene ancora inviato come una risposta singola. Tuttavia, notifiche possono essere inviate come messaggi separati durante l’elaborazione aggiornando così il client in tempo reale. Il client deve essere in grado di gestire e mostrare queste notifiche.

## Cos’è una Notifica?

Abbiamo detto "Notifica", cosa significa questo nel contesto MCP?

Una notifica è un messaggio inviato dal server al client per informare sul progresso, stato o altri eventi durante un’operazione lunga. Le notifiche migliorano la trasparenza e l’esperienza utente.

Per esempio, un client dovrebbe inviare una notifica una volta che il handshake iniziale con il server è stato fatto.

Una notifica si presenta così come messaggio JSON:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Le notifiche appartengono ad un argomento in MCP chiamato ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Avviso di deprecazione:** la release candidate `2026-07-28` della specifica MCP marchia il primitivo Logging come deprecato in favore di `stderr` per trasporti stdio e OpenTelemetry per l’osservabilità strutturata. Logging continua a funzionare in `2025-11-25` e per almeno un anno dopo qualsiasi deprecazione formale. Vedi [What’s Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Per far funzionare il logging, il server deve abilitarlo come feature/capacità così:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> A seconda dell’SDK usato, il logging potrebbe essere abilitato di default, oppure potrebbe essere necessario abilitarlo esplicitamente nella configurazione del server.

Ci sono diversi tipi di notifiche:

| Livello    | Descrizione                     | Esempio di utilizzo             |
|-----------|-------------------------------|--------------------------------|
| debug     | Informazioni di debug dettagliate | Punti di ingresso/uscita funzione |
| info      | Messaggi informativi generali   | Aggiornamenti di progresso      |
| notice    | Eventi normali ma significativi | Modifiche di configurazione     |
| warning   | Condizioni di avviso            | Uso di funzionalità deprecate   |
| error     | Condizioni di errore            | Fallimenti delle operazioni     |
| critical  | Condizioni critiche             | Guasti di componenti di sistema |
| alert     | Azione da intraprendere subito | Corruzione dati rilevata        |
| emergency | Sistema inutilizzabile          | Guasto completo del sistema     |

## Implementazione delle Notifiche in MCP

Per implementare notifiche in MCP, devi configurare sia il lato server che client per gestire aggiornamenti in tempo reale. Questo permette alla tua applicazione di fornire feedback immediati agli utenti durante operazioni lunghe.

### Lato Server: Invio delle Notifiche

Cominciamo con il lato server. In MCP, definisci strumenti che possono inviare notifiche mentre elaborano le richieste. Il server usa l’oggetto context (di solito `ctx`) per inviare messaggi al client.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Nell’esempio precedente, lo strumento `process_files` invia tre notifiche al client mentre elabora ciascun file. Il metodo `ctx.info()` è usato per inviare messaggi informativi.

Inoltre, per abilitare le notifiche, assicurati che il tuo server utilizzi un trasporto streaming (come `streamable-http`) e che il client implementi un gestore di messaggi per elaborare le notifiche. Ecco come configurare il server per usare il trasporto `streamable-http`:

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

In questo esempio .NET, lo strumento `ProcessFiles` è decorato con l’attributo `Tool` e invia tre notifiche al client mentre elabora ogni file. Il metodo `ctx.Info()` è usato per inviare messaggi informativi.

Per abilitare le notifiche nel tuo server MCP .NET, assicurati di usare un trasporto streaming:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Lato Client: Ricezione Notifiche

Il client deve implementare un gestore di messaggi che elabori e mostri le notifiche appena vengono ricevute.

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

Nel codice precedente, la funzione `message_handler` verifica se il messaggio in arrivo è una notifica. Se lo è, stampa la notifica; altrimenti la processa come normale messaggio server. Nota inoltre come `ClientSession` venga inizializzato con `message_handler` per gestire notifiche in arrivo.

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

In questo esempio .NET, la funzione `MessageHandler` verifica se il messaggio in arrivo è una notifica. Se lo è, stampa la notifica; altrimenti la processa come messaggio server regolare. `ClientSession` è inizializzato con il gestore di messaggi tramite `ClientSessionOptions`.

Per abilitare le notifiche, assicurati che il tuo server usi un trasporto streaming (come `streamable-http`) e che il client implementi un gestore di messaggi per elaborare le notifiche.

## Notifiche di Progresso & Scenari

Questa sezione spiega il concetto di notifiche di progresso in MCP, perché sono importanti e come implementarle usando Streamable HTTP. Troverai anche un esercizio pratico per rafforzare la tua comprensione.

Le notifiche di progresso sono messaggi in tempo reale inviati dal server al client durante operazioni prolungate. Invece di aspettare che l’intero processo finisca, il server mantiene il client aggiornato sullo stato corrente. Questo migliora trasparenza, esperienza utente e facilita il debugging.

**Esempio:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Perché Usare le Notifiche di Progresso?

Le notifiche di progresso sono essenziali per diversi motivi:

- **Migliore esperienza utente:** gli utenti vedono aggiornamenti mentre il lavoro procede, non solo alla fine.
- **Feedback in tempo reale:** i client possono mostrare barre di progresso o log, facendo sentire l’app più reattiva.
- **Debugging e monitoraggio più facili:** sviluppatori e utenti possono vedere dove un processo è lento o bloccato.

### Come Implementare Notifiche di Progresso

Ecco come puoi implementare notifiche di progresso in MCP:

- **Sul server:** Usa `ctx.info()` o `ctx.log()` per inviare notifiche mentre ogni elemento viene processato. Questo invia un messaggio al client prima che il risultato principale sia pronto.
- **Sul client:** Implementa un gestore di messaggi che ascolta e mostra notifiche appena arrivano. Questo gestore distingue tra notifiche e risultato finale.

**Esempio Server:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Esempio Client:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Considerazioni sulla Sicurezza

Quando si implementano server MCP con trasporti basati su HTTP, la sicurezza diventa una questione primaria che richiede un'attenta attenzione a molteplici vettori di attacco e meccanismi di protezione.

### Panoramica

La sicurezza è fondamentale quando si espongono server MCP tramite HTTP. Lo streaming HTTP introduce nuove superfici di attacco e richiede una configurazione attenta.

### Punti Chiave

- **Validazione dell'Header Origin**: Valida sempre l'header `Origin` per prevenire attacchi di DNS rebinding.
- **Binding a Localhost**: Per lo sviluppo locale, associa i server a `localhost` per evitare di esporli alla rete pubblica.
- **Autenticazione**: Implementa l'autenticazione (es. chiavi API, OAuth) per le distribuzioni in produzione.
- **CORS**: Configura le politiche di Cross-Origin Resource Sharing (CORS) per limitare l'accesso.
- **HTTPS**: Usa HTTPS in produzione per criptare il traffico.

### Buone Pratiche

- Non fidarti mai delle richieste in arrivo senza convalida.
- Registra e monitora tutti gli accessi e gli errori.
- Aggiorna regolarmente le dipendenze per correggere le vulnerabilità di sicurezza.

### Sfide

- Bilanciare sicurezza e facilità di sviluppo
- Garantire compatibilità con diversi ambienti client

## Aggiornamento da SSE a Streamable HTTP

Per applicazioni che attualmente utilizzano Server-Sent Events (SSE), migrare a Streamable HTTP offre capacità migliorate e una migliore sostenibilità a lungo termine per le implementazioni MCP.

### Perché Aggiornare?

Ci sono due motivi importanti per aggiornare da SSE a Streamable HTTP:

- Streamable HTTP offre migliore scalabilità, compatibilità e supporto alle notifiche più ricco rispetto a SSE.
- È il trasporto consigliato per nuove applicazioni MCP.

### Passi per la Migrazione

Ecco come puoi migrare da SSE a Streamable HTTP nelle tue applicazioni MCP:

- **Aggiorna il codice del server** per usare `transport="streamable-http"` in `mcp.run()`.
- **Aggiorna il codice del client** per utilizzare `streamablehttp_client` invece del client SSE.
- **Implementa un gestore di messaggi** nel client per elaborare le notifiche.
- **Testa la compatibilità** con strumenti e flussi di lavoro esistenti.

### Mantenere la Compatibilità

Si consiglia di mantenere la compatibilità con i client SSE esistenti durante il processo di migrazione. Ecco alcune strategie:

- Puoi supportare sia SSE che Streamable HTTP eseguendo entrambi i trasporti su endpoint differenti.
- Migra gradualmente i client al nuovo trasporto.

### Sfide

Assicurati di affrontare le seguenti sfide durante la migrazione:

- Assicurare che tutti i client vengano aggiornati
- Gestire le differenze nella consegna delle notifiche

## Considerazioni sulla Sicurezza

La sicurezza dovrebbe essere una priorità assoluta quando si implementa qualsiasi server, specialmente quando si usano trasporti basati su HTTP come Streamable HTTP in MCP. 

Quando si implementano server MCP con trasporti basati su HTTP, la sicurezza diventa una questione primaria che richiede un'attenta attenzione a molteplici vettori di attacco e meccanismi di protezione.

### Panoramica

La sicurezza è fondamentale quando si espongono server MCP tramite HTTP. Lo streaming HTTP introduce nuove superfici di attacco e richiede una configurazione attenta.

Ecco alcune considerazioni chiave sulla sicurezza:

- **Validazione dell'Header Origin**: Valida sempre l'header `Origin` per prevenire attacchi di DNS rebinding.
- **Binding a Localhost**: Per lo sviluppo locale, associa i server a `localhost` per evitare di esporli alla rete pubblica.
- **Autenticazione**: Implementa l'autenticazione (es. chiavi API, OAuth) per le distribuzioni in produzione.
- **CORS**: Configura le politiche di Cross-Origin Resource Sharing (CORS) per limitare l'accesso.
- **HTTPS**: Usa HTTPS in produzione per criptare il traffico.

### Buone Pratiche

Inoltre, ecco alcune buone pratiche da seguire quando implementi la sicurezza nel tuo server di streaming MCP:

- Non fidarti mai delle richieste in arrivo senza convalida.
- Registra e monitora tutti gli accessi e gli errori.
- Aggiorna regolarmente le dipendenze per correggere le vulnerabilità di sicurezza.

### Sfide

Affronterai alcune sfide quando implementerai la sicurezza nei server di streaming MCP:

- Bilanciare sicurezza e facilità di sviluppo
- Garantire compatibilità con diversi ambienti client

### Compito: Costruisci la Tua App MCP Streaming

**Scenario:**
Costruisci un server e un client MCP dove il server processa una lista di elementi (es. file o documenti) e invia una notifica per ogni elemento elaborato. Il client deve visualizzare ogni notifica appena arriva.

**Passi:**

1. Implementa uno strumento server che elabori una lista e invii notifiche per ogni elemento.
2. Implementa un client con un gestore di messaggi per visualizzare le notifiche in tempo reale.
3. Testa la tua implementazione eseguendo sia server che client e osserva le notifiche.

[Soluzione](./solution/README.md)

## Ulteriori Letture e Prossimi Passi

Per continuare il tuo percorso con lo streaming MCP ed espandere le tue conoscenze, questa sezione fornisce risorse aggiuntive e suggerimenti sui prossimi passi per costruire applicazioni più avanzate.

### Ulteriori Letture

- [Microsoft: Introduzione allo Streaming HTTP](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Richieste Streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Prossimi Passi

- Prova a costruire strumenti MCP più avanzati che utilizzano lo streaming per analisi in tempo reale, chat o modifica collaborativa.
- Esplora l'integrazione dello streaming MCP con framework frontend (React, Vue, ecc.) per aggiornamenti live dell'interfaccia utente.
- Prossimo: [Utilizzo del Toolkit AI per VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->