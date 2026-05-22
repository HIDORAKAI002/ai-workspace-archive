# Streaming HTTPS con Model Context Protocol (MCP)

Questo capitolo fornisce una guida completa all'implementazione di streaming sicuro, scalabile e in tempo reale con il Model Context Protocol (MCP) utilizzando HTTPS. Copre la motivazione per lo streaming, i meccanismi di trasporto disponibili, come implementare HTTP streamable in MCP, le best practice di sicurezza, la migrazione da SSE e indicazioni pratiche per costruire le proprie applicazioni MCP di streaming.

## Meccanismi di Trasporto e Streaming in MCP

Questa sezione esplora i diversi meccanismi di trasporto disponibili in MCP e il loro ruolo nel consentire capacità di streaming per la comunicazione in tempo reale tra client e server.

### Cos'è un Meccanismo di Trasporto?

Un meccanismo di trasporto definisce come i dati vengono scambiati tra client e server. MCP supporta diversi tipi di trasporto per adattarsi a diversi ambienti e requisiti:

- **stdio**: input/output standard, adatto per strumenti locali e basati su CLI. Semplice ma non adatto per il web o il cloud.
- **SSE (Server-Sent Events)**: consente ai server di inviare aggiornamenti in tempo reale ai client tramite HTTP. Buono per interfacce web, ma limitato in scalabilità e flessibilità. A partire dalla Specifica MCP 2025-06-18, il trasporto standalone SSE (Server-Sent Events) è stato deprecato e sostituito dal trasporto "Streamable HTTP".
- **Streamable HTTP**: trasporto di streaming moderno basato su HTTP, supporta notifiche e migliore scalabilità. Raccomandato per la maggior parte degli scenari di produzione e cloud.

### Tabella di Confronto

Dai un'occhiata alla tabella di confronto qui sotto per capire le differenze tra questi meccanismi di trasporto:

| Trasporto         | Aggiornamenti in Tempo Reale | Streaming | Scalabilità | Caso d'Uso                |
|-------------------|------------------------------|-----------|-------------|---------------------------|
| stdio             | No                           | No        | Bassa       | Strumenti CLI locali       |
| SSE               | Sì                           | Sì        | Media       | Web, aggiornamenti realtime|
| Streamable HTTP   | Sì                           | Sì        | Alta        | Cloud, multi-client       |

> **Suggerimento:** La scelta del giusto trasporto influisce su prestazioni, scalabilità e esperienza utente. **Streamable HTTP** è raccomandato per applicazioni moderne, scalabili e pronte per il cloud.

Nota i trasporti stdio e SSE che sono stati mostrati nei capitoli precedenti e come lo Streamable HTTP sia il trasporto trattato in questo capitolo.

## Streaming: Concetti e Motivazione

Comprendere i concetti fondamentali e le motivazioni dietro lo streaming è essenziale per implementare sistemi di comunicazione in tempo reale efficaci.

**Streaming** è una tecnica nella programmazione di rete che consente di inviare e ricevere dati in piccoli blocchi gestibili o come sequenza di eventi, invece di aspettare che una risposta completa sia pronta. Questo è particolarmente utile per:

- File o dataset di grandi dimensioni.
- Aggiornamenti in tempo reale (es. chat, barre di progresso).
- Computazioni a lunga durata dove si vuole mantenere l’utente informato.

Ecco cosa devi sapere a livello alto sullo streaming:

- I dati sono consegnati progressivamente, non tutti insieme.
- Il client può elaborare i dati man mano che arrivano.
- Riduce la latenza percepita e migliora l’esperienza utente.

### Perché usare lo streaming?

Le ragioni per usare lo streaming sono le seguenti:

- Gli utenti ricevono un feedback immediato, non solo alla fine.
- Abilita applicazioni in tempo reale e interfacce reattive.
- Uso più efficiente delle risorse di rete e calcolo.

### Esempio Semplice: Server & Client HTTP Streaming

Ecco un semplice esempio di come lo streaming può essere implementato:

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

Questo esempio dimostra un server che manda una serie di messaggi al client mentre diventano disponibili, invece di aspettare che tutti i messaggi siano pronti.

**Come funziona:**

- Il server restituisce ogni messaggio non appena è pronto.
- Il client riceve e stampa ogni blocco appena arriva.

**Requisiti:**

- Il server deve usare una risposta in streaming (es. `StreamingResponse` in FastAPI).
- Il client deve processare la risposta come stream (`stream=True` in requests).
- Il Content-Type è solitamente `text/event-stream` o `application/octet-stream`.

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
- `WebClient` con `bodyToFlux()` abilita il consumo reattivo dello streaming
- `delayElements()` simula il tempo di elaborazione tra eventi
- Gli eventi possono avere tipi (`info`, `result`) per una migliore gestione client

### Confronto: Streaming Classico vs Streaming MCP

Le differenze tra come funziona lo streaming in modo "classico" rispetto a come funziona in MCP possono essere rappresentate così:

| Funzionalità        | Streaming HTTP Classico         | Streaming MCP (Notifiche)        |
|---------------------|--------------------------------|---------------------------------|
| Risposta principale | In chunk                       | Singola, alla fine               |
| Aggiornamenti di progresso | Inviati come chunk di dati    | Inviati come notifiche           |
| Requisiti client    | Deve processare lo stream       | Deve implementare un handler messaggi |
| Caso d’uso          | File grandi, stream token AI    | Progresso, log, feedback realtime|

### Differenze Chiave Osservate

Inoltre, alcune differenze chiave:

- **Schema di Comunicazione:**
  - Streaming HTTP classico: usa semplice chunked transfer encoding per inviare dati a blocchi
  - Streaming MCP: usa un sistema di notifiche strutturato con protocollo JSON-RPC

- **Formato dei Messaggi:**
  - HTTP classico: blocchi di testo semplice con nuove linee
  - MCP: oggetti LoggingMessageNotification strutturati con metadata

- **Implementazione Client:**
  - HTTP classico: client semplice che processa risposte in streaming
  - MCP: client più sofisticato con handler messaggi per diversi tipi di messaggi

- **Aggiornamenti di Progresso:**
  - HTTP classico: il progresso fa parte del flusso della risposta principale
  - MCP: il progresso è inviato tramite messaggi di notifica separati mentre la risposta principale arriva alla fine

### Raccomandazioni

Ci sono alcune cose che consigliamo nella scelta tra implementare streaming classico (come endpoint mostrato sopra usando `/stream`) oppure scegliere lo streaming tramite MCP.

- **Per esigenze di streaming semplici:** lo streaming HTTP classico è più semplice da implementare e sufficiente per esigenze di base.

- **Per applicazioni complesse e interattive:** lo streaming MCP offre un approccio più strutturato con metadata più ricchi e separazione tra notifiche e risultati finali.

- **Per applicazioni AI:** il sistema di notifiche MCP è particolarmente utile per task AI a lunga durata in cui si vuole tenere l’utente informato sul progresso.

## Streaming in MCP

Ok, hai già visto alcune raccomandazioni e confronti finora sulle differenze tra streaming classico e streaming in MCP. Entriamo nel dettaglio di come puoi sfruttare lo streaming in MCP.

Comprendere come funziona lo streaming nel framework MCP è essenziale per costruire applicazioni reattive che forniscano feedback in tempo reale agli utenti durante operazioni di lunga durata.

In MCP, lo streaming non riguarda l’invio della risposta principale in chunk, ma l’invio di **notifiche** al client mentre uno strumento elabora una richiesta. Queste notifiche possono includere aggiornamenti di progresso, log o altri eventi.

### Come funziona

Il risultato principale viene comunque inviato come una singola risposta. Tuttavia, le notifiche possono essere inviate come messaggi separati durante l’elaborazione e così aggiornare il client in tempo reale. Il client deve essere in grado di gestire e visualizzare queste notifiche.

## Cos'è una Notifica?

Abbiamo detto "Notifica", cosa significa nel contesto di MCP?

Una notifica è un messaggio inviato dal server al client per informare sul progresso, stato o altri eventi durante un’operazione di lunga durata. Le notifiche migliorano la trasparenza e l’esperienza utente.

Ad esempio, un client deve inviare una notifica una volta completato il handshake iniziale con il server.

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

Le notifiche appartengono a un topic in MCP chiamato ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Per far funzionare il logging, il server deve abilitarlo come feature/capability così:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> A seconda dell’SDK utilizzato, il logging potrebbe essere abilitato di default o potrebbe essere necessario abilitarlo esplicitamente nella configurazione server.

Esistono diversi tipi di notifiche:

| Livello    | Descrizione                    | Caso d'Uso Esempio           |
|------------|-------------------------------|------------------------------|
| debug      | Informazioni dettagliate per debugging | Punti di entrata/uscita funzioni |
| info       | Messaggi informativi generali | Aggiornamenti di progresso    |
| notice     | Eventi normali ma significativi | Modifiche di configurazione  |
| warning    | Condizioni di avviso           | Uso di funzionalità deprecate |
| error      | Condizioni di errore           | Fallimenti operativi          |
| critical   | Condizioni critiche            | Malfunzionamenti componenti sistema |
| alert      | Azione immediata richiesta     | Rilevata corruzione dati       |
| emergency  | Sistema inutilizzabile         | Fallimento completo sistema    |

## Implementare le Notifiche in MCP

Per implementare le notifiche in MCP, devi configurare sia lato server che client per gestire aggiornamenti in tempo reale. Questo permette alla tua applicazione di fornire feedback immediato agli utenti durante operazioni di lunga durata.

### Lato server: Invio Notifiche

Iniziamo dal lato server. In MCP definisci strumenti che possono inviare notifiche durante l’elaborazione di richieste. Il server usa l’oggetto context (solitamente `ctx`) per inviare messaggi al client.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Nell’esempio precedente, lo strumento `process_files` invia tre notifiche al client mentre elabora ciascun file. Il metodo `ctx.info()` è usato per mandare messaggi informativi.

Inoltre, per abilitare le notifiche, assicurati che il server usi un trasporto streaming (come `streamable-http`) e che il client implementi un message handler per processare notifiche. Ecco come puoi configurare il server per usare il trasporto `streamable-http`:

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

Per abilitare notifiche nel tuo server MCP .NET, assicurati di usare un trasporto streaming:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Lato client: Ricezione Notifiche

Il client deve implementare un message handler per processare e visualizzare le notifiche man mano che arrivano.

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

Nel codice precedente, la funzione `message_handler` verifica se il messaggio in arrivo è una notifica. Se sì, stampa la notifica; altrimenti la processa come messaggio server regolare. Nota anche come `ClientSession` sia inizializzato con `message_handler` per gestire notifiche in entrata.

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

In questo esempio .NET, la funzione `MessageHandler` verifica se il messaggio in arrivo è una notifica. Se sì, stampa la notifica; altrimenti la processa come messaggio server regolare. La `ClientSession` è inizializzata con il message handler tramite le `ClientSessionOptions`.

Per abilitare notifiche, assicurati che il server usi un trasporto streaming (come `streamable-http`) e che il client implementi un message handler per processare notifiche.

## Notifiche di Progresso & Scenari

Questa sezione spiega il concetto di notifiche di progresso in MCP, perché sono importanti e come implementarle usando Streamable HTTP. Troverai anche un esercizio pratico per rafforzare la tua comprensione.

Le notifiche di progresso sono messaggi in tempo reale inviati dal server al client durante operazioni di lunga durata. Invece di aspettare che tutto il processo finisca, il server aggiorna continuamente il client sullo stato corrente. Questo migliora trasparenza, esperienza utente e facilita il debugging.

**Esempio:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Perché Usare le Notifiche di Progresso?

Le notifiche di progresso sono essenziali per diverse ragioni:

- **Migliore esperienza utente:** gli utenti vedono aggiornamenti mentre il lavoro avanza, non solo alla fine.
- **Feedback in tempo reale:** i client possono mostrare barre di progresso o log, rendendo l’app più reattiva.
- **Debugging e monitoraggio facilitati:** sviluppatori e utenti vedono dove un processo è lento o bloccato.

### Come Implementare Notifiche di Progresso

Ecco come puoi implementare notifiche di progresso in MCP:

- **Sul server:** usa `ctx.info()` o `ctx.log()` per inviare notifiche mentre ogni elemento viene processato. Queste notifiche arrivano al client prima che il risultato principale sia pronto.
- **Sul client:** implementa un message handler che ascolta e visualizza notifiche appena arrivano. Questo handler distingue tra notifiche e risultato finale.

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

Quando si implementano server MCP con trasporti basati su HTTP, la sicurezza diventa una preoccupazione fondamentale che richiede attenzione a molteplici vettori di attacco e meccanismi di protezione.

### Panoramica

La sicurezza è critica quando si espongono server MCP via HTTP. Streamable HTTP introduce nuove superfici di attacco e richiede una configurazione accurata.

### Punti Chiave

- **Validazione Header Origin**: valida sempre l’header `Origin` per prevenire attacchi di DNS rebinding.
- **Binding a Localhost**: per sviluppo locale, collega i server a `localhost` per evitare esposizione al pubblico.
- **Autenticazione**: implementa autenticazione (es. chiavi API, OAuth) per deploy di produzione.
- **CORS**: configura politiche di Cross-Origin Resource Sharing (CORS) per limitare l’accesso.
- **HTTPS**: usa HTTPS in produzione per criptare il traffico.

### Best Practice

- Non fidarti mai di richieste in arrivo senza validazione.
- Registra e monitora tutti gli accessi e gli errori.
- Aggiorna regolarmente le dipendenze per patchare vulnerabilità di sicurezza.

### Sfide
- Bilanciare la sicurezza con la facilità di sviluppo
- Garantire la compatibilità con diversi ambienti client

## Aggiornamento da SSE a Streamable HTTP

Per le applicazioni che attualmente utilizzano Server-Sent Events (SSE), migrare a Streamable HTTP offre capacità migliorate e una migliore sostenibilità a lungo termine per le vostre implementazioni MCP.

### Perché aggiornare?

Ci sono due valide ragioni per aggiornare da SSE a Streamable HTTP:

- Streamable HTTP offre maggiore scalabilità, compatibilità e supporto a notifiche più ricche rispetto a SSE.
- È il trasporto consigliato per le nuove applicazioni MCP.

### Passaggi per la migrazione

Ecco come potete migrare da SSE a Streamable HTTP nelle vostre applicazioni MCP:

- **Aggiornare il codice server** per usare `transport="streamable-http"` in `mcp.run()`.
- **Aggiornare il codice client** per usare `streamablehttp_client` invece del client SSE.
- **Implementare un gestore di messaggi** nel client per elaborare le notifiche.
- **Testare la compatibilità** con strumenti e flussi di lavoro esistenti.

### Mantenere la compatibilità

Si consiglia di mantenere la compatibilità con i client SSE esistenti durante il processo di migrazione. Ecco alcune strategie:

- Potete supportare sia SSE che Streamable HTTP eseguendo entrambi i trasporti su endpoint diversi.
- Migrare gradualmente i client al nuovo trasporto.

### Sfide

Assicuratevi di affrontare le seguenti sfide durante la migrazione:

- Garantire l’aggiornamento di tutti i client
- Gestire le differenze nella consegna delle notifiche

## Considerazioni sulla sicurezza

La sicurezza dovrebbe essere una priorità assoluta quando si implementa un server, specialmente usando trasporti basati su HTTP come Streamable HTTP in MCP.

Quando si implementano server MCP con trasporti HTTP, la sicurezza diventa una preoccupazione fondamentale che richiede un’attenzione accurata a molteplici vettori di attacco e meccanismi di protezione.

### Panoramica

La sicurezza è critica quando si espongono server MCP tramite HTTP. Streamable HTTP introduce nuove superfici d’attacco e richiede una configurazione attenta.

Ecco alcune considerazioni chiave sulla sicurezza:

- **Validazione dell’header Origin**: Validare sempre l’header `Origin` per prevenire attacchi di DNS rebinding.
- **Binding a localhost**: Per lo sviluppo locale, associare i server a `localhost` per evitare di esporli a internet pubblico.
- **Autenticazione**: Implementare autenticazione (ad es., chiavi API, OAuth) per le deployment in produzione.
- **CORS**: Configurare le policy di Cross-Origin Resource Sharing (CORS) per limitare l’accesso.
- **HTTPS**: Usare HTTPS in produzione per criptare il traffico.

### Best Practice

Inoltre, ecco alcune best practice da seguire quando si implementa la sicurezza nel server di streaming MCP:

- Non fidarsi mai delle richieste in ingresso senza convalida.
- Registrare e monitorare tutti gli accessi e gli errori.
- Aggiornare regolarmente le dipendenze per correggere vulnerabilità di sicurezza.

### Sfide

Affronterete alcune sfide durante l’implementazione della sicurezza nei server di streaming MCP:

- Bilanciare la sicurezza con la facilità di sviluppo
- Garantire la compatibilità con diversi ambienti client

### Compito: Crea la tua App MCP Streaming

**Scenario:**  
Costruisci un server MCP e un client dove il server elabora una lista di elementi (ad es., file o documenti) e invia una notifica per ogni elemento elaborato. Il client deve mostrare ogni notifica appena arriva.

**Passi:**

1. Implementa uno strumento server che elabora una lista e invia notifiche per ogni elemento.
2. Implementa un client con un gestore di messaggi per mostrare le notifiche in tempo reale.
3. Testa la tua implementazione eseguendo sia server che client e osserva le notifiche.

[Solution](./solution/README.md)

## Ulteriori letture e cosa fare dopo?

Per continuare il tuo percorso con MCP streaming ed espandere le tue conoscenze, questa sezione offre risorse aggiuntive e passi consigliati per costruire applicazioni più avanzate.

### Ulteriori letture

- [Microsoft: Introduzione allo Streaming HTTP](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Cosa fare dopo?

- Prova a creare strumenti MCP più avanzati che utilizzano lo streaming per analisi in tempo reale, chat o editing collaborativo.
- Esplora l’integrazione dello streaming MCP con framework frontend (React, Vue, ecc.) per aggiornamenti UI live.
- Successivo: [Utilizzare AI Toolkit per VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->