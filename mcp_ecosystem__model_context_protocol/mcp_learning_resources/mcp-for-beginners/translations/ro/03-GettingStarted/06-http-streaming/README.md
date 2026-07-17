# Streaming HTTPS cu Model Context Protocol (MCP)

Acest capitol oferă un ghid complet pentru implementarea streaming-ului securizat, scalabil și în timp real cu Model Context Protocol (MCP) utilizând HTTPS. Acoperă motivația pentru streaming, mecanismele de transport disponibile, cum să implementezi HTTP streamable în MCP, cele mai bune practici de securitate, migrația de la SSE și ghidaj practic pentru construirea propriilor aplicații MCP de streaming. 

> **Privind înainte:** această lecție descrie Streamable HTTP conform **Specificației MCP 2025-11-25**, unde o sesiune este stabilită în timpul `initialize` și fixată cu un antet `Mcp-Session-Id`. Candidatele de lansare din `2026-07-28` elimină complet handshake-ul și ID-ul sesiunii, făcând fiecare solicitare autonomă și rutabilă către orice instanță de server fără sesiuni sticky. Vezi [Ce se schimbă în MCP: Candidatele de lansare din 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) pentru detalii.

## Mecanisme de transport și streaming în MCP

Această secțiune explorează diferitele mecanisme de transport disponibile în MCP și rolul lor în facilitarea capacităților de streaming pentru comunicarea în timp real între clienți și servere.

### Ce este un mecanism de transport?

Un mecanism de transport definește modul în care datele sunt schimbate între client și server. MCP suportă mai multe tipuri de transport pentru a se adapta diferitelor medii și cerințe:

- **stdio**: Intrare/ieșire standard, potrivit pentru instrumente locale și bazate pe CLI. Simplu, dar nu potrivit pentru web sau cloud.
- **SSE (Server-Sent Events)**: Permite serverelor să trimită actualizări în timp real către clienți prin HTTP. Bun pentru interfețe web, dar limitat în scalabilitate și flexibilitate. Din specificația MCP 2025-06-18, transportul separat SSE (Server-Sent Events) a fost depreciat și înlocuit cu transportul „Streamable HTTP”.
- **Streamable HTTP**: Transport streaming bazat pe HTTP modern, suportând notificări și scalabilitate mai bună. Recomandat pentru majoritatea scenariilor de producție și cloud.

### Tabel comparativ

Aruncă o privire la tabelul comparativ de mai jos pentru a înțelege diferențele între aceste mecanisme de transport:

| Transport         | Actualizări în timp real | Streaming | Scalabilitate | Caz de utilizare          |
|-------------------|--------------------------|-----------|--------------|--------------------------|
| stdio             | Nu                       | Nu        | Scăzut       | Instrumente locale CLI    |
| SSE               | Da                       | Da        | Mediu        | Web, actualizări în timp real |
| Streamable HTTP   | Da                       | Da        | Ridicat      | Cloud, multi-client       |

> **Sfat:** Alegerea mecanismului potrivit de transport influențează performanța, scalabilitatea și experiența utilizatorului. **Streamable HTTP** este recomandat pentru aplicații moderne, scalabile și gata pentru cloud.

Observă transporturile stdio și SSE pe care le-ai văzut în capitolele anterioare și cum Streamable HTTP este transportul acoperit în acest capitol.

## Streaming: concepte și motivație

Înțelegerea conceptelor fundamentale și a motivației din spatele streaming-ului este esențială pentru implementarea sistemelor eficiente de comunicare în timp real.

**Streaming-ul** este o tehnică în programarea de rețea care permite trimiterea și recepționarea datelor în bucăți mici, gestionabile sau ca o secvență de evenimente, în loc să aștepți ca un răspuns complet să fie gata. Acest lucru este util mai ales pentru:

- Fișiere sau seturi mari de date.
- Actualizări în timp real (ex. chat, bare de progres).
- Calcule îndelungate în care vrei să informezi utilizatorul continuu.

Iată ce trebuie să știi despre streaming la nivel înalt:

- Datele sunt livrate progresiv, nu toate odată.
- Clientul poate procesa datele pe măsură ce sosesc.
- Reduce latența percepută și îmbunătățește experiența utilizatorului.

### De ce să folosești streaming?

Motivele pentru care se folosește streaming sunt următoarele:

- Utilizatorii primesc feedback imediat, nu doar la final
- Permite aplicații în timp real și interfețe responsive
- Utilizare mai eficientă a resurselor de rețea și calcul

### Exemplu simplu: Server & Client Streaming HTTP

Iată un exemplu simplu despre cum poate fi implementat streaming-ul:

#### Python

**Server (Python, folosind FastAPI și StreamingResponse):**

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

**Client (Python, folosind requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Acest exemplu demonstrează un server care trimite o serie de mesaje către client pe măsură ce acestea devin disponibile, în loc să aștepte ca toate mesajele să fie gata.

**Cum funcționează:**

- Serverul livrează fiecare mesaj pe măsură ce este gata.
- Clientul primește și afișează fiecare fragment pe măsură ce sosește.

**Cerințe:**

- Serverul trebuie să folosească un răspuns streaming (ex. `StreamingResponse` în FastAPI).
- Clientul trebuie să proceseze răspunsul ca un stream (`stream=True` în requests).
- Content-Type este de obicei `text/event-stream` sau `application/octet-stream`.

#### Java

**Server (Java, folosind Spring Boot și Server-Sent Events):**

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

**Client (Java, folosind Spring WebFlux WebClient):**

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

**Note despre implementarea în Java:**

- Folosește stiva reactivă Spring Boot cu `Flux` pentru streaming
- `ServerSentEvent` oferă streaming structurat de evenimente cu tipuri de evenimente
- `WebClient` cu `bodyToFlux()` permite consumul streaming reactiv
- `delayElements()` simulează timpul de procesare între evenimente
- Evenimentele pot avea tipuri (`info`, `result`) pentru o gestionare mai bună de către client

### Comparație: Streaming clasic vs Streaming MCP

Diferențele dintre cum funcționează streaming-ul în mod „clasic” versus cum funcționează în MCP pot fi redate astfel:

| Caracteristică           | Streaming HTTP Clasic           | Streaming MCP (Notificări)        |
|-------------------------|--------------------------------|----------------------------------|
| Răspunsul principal      | Fragmentat                     | Unic, la final                   |
| Actualizări de progres   | Trimise ca fragmente de date  | Trimise ca notificări            |
| Cerințe client           | Trebuie să proceseze stream    | Trebuie să implementeze un handler de mesaje |
| Caz de utilizare         | Fișiere mari, fluxuri token AI | Progres, jurnale, feedback în timp real |

### Diferențe cheie observate

În plus, iată câteva diferențe cheie:

- **Pattern de comunicare:**
  - Streaming HTTP clasic: Utilizează codificare simplă chunked transfer pentru a trimite date în fragmente
  - Streaming MCP: Utilizează un sistem structurat de notificări cu protocol JSON-RPC

- **Formatul mesajului:**
  - HTTP clasic: Fragmente text simplu cu linii noi
  - MCP: Obiecte structurate LoggingMessageNotification cu metadate

- **Implementarea clientului:**
  - HTTP clasic: Client simplu care procesează răspunsuri streaming
  - MCP: Client mai sofisticat cu handler de mesaje pentru procesarea diferitelor tipuri de mesaje

- **Actualizări de progres:**
  - HTTP clasic: Progresul face parte din fluxul răspunsului principal
  - MCP: Progresul este trimis prin mesaje separate de notificare, în timp ce răspunsul principal vine la final

### Recomandări

Există câteva recomandări când vine vorba de alegerea între implementarea streaming-ului clasic (ca un endpoint pe care l-am arătat mai sus folosind `/stream`) versus alegerea streaming-ului prin MCP.

- **Pentru nevoi simple de streaming:** Streaming-ul HTTP clasic este mai simplu de implementat și suficient pentru cerințe de bază.

- **Pentru aplicații complexe, interactive:** Streaming-ul MCP oferă o abordare mai structurată cu metadate mai bogate și separare între notificări și rezultatele finale.

- **Pentru aplicații AI:** Sistemul de notificări MCP este deosebit de util pentru sarcini AI îndelungate unde dorești să menții utilizatorii informați despre progres.

## Streaming în MCP

Bine, așadar ai văzut câteva recomandări și comparații până acum privind diferența între streaming clasic și streaming în MCP. Să vedem în detaliu exact cum poți valorifica streaming-ul în MCP.

Înțelegerea modului în care funcționează streaming-ul în cadrul MCP este esențială pentru construirea aplicațiilor responsive care oferă feedback în timp real utilizatorilor în timpul operațiilor lungi.

În MCP, streaming-ul nu este despre trimiterea răspunsului principal în fragmente, ci despre trimiterea de **notificări** către client în timp ce un instrument procesează o solicitare. Aceste notificări pot include actualizări de progres, jurnale sau alte evenimente.

### Cum funcționează

Rezultatul principal este în continuare trimis ca un răspuns unic. Totuși, notificările pot fi trimise ca mesaje separate în timpul procesării și astfel actualizează clientul în timp real. Clientul trebuie să poată gestiona și afișa aceste notificări.

## Ce este o notificare?

Am spus „Notificare”, ce înseamnă asta în contextul MCP?

O notificare este un mesaj trimis de la server către client pentru a informa despre progres, stare sau alte evenimente în timpul unei operații îndelungate. Notificările îmbunătățesc transparența și experiența utilizatorului.

De exemplu, un client ar trebui să trimită o notificare după ce handshake-ul inițial cu serverul a fost făcut.

O notificare arată astfel ca mesaj JSON:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notificările aparțin unui topic în MCP denumit ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Notificare de deprecate:** candidatele de lansare a specificației MCP din `2026-07-28` marchează primitiva Logging ca depreciată în favoarea `stderr` pentru transporturile stdio și OpenTelemetry pentru observabilitate structurată. Logging-ul continuă să funcționeze în `2025-11-25` și cel puțin un an după orice deprecate formală. Vezi [Ce se schimbă în MCP: Candidatele de lansare din 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Pentru a activa logging-ul, serverul trebuie să îl permită ca funcționalitate/capabilitate astfel:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> În funcție de SDK-ul folosit, logging-ul poate fi activat implicit, sau poate fi necesar să îl activezi explicit în configurația serverului tău.

Există diferite tipuri de notificări:

| Nivel      | Descriere                      | Caz de utilizare exemplu        |
|------------|-------------------------------|--------------------------------|
| debug      | Informații detaliate de depanare | Puncte de intrare/ieșire funcție |
| info       | Mesaje informaționale generale | Actualizări de progres operație  |
| notice     | Evenimente normale dar semnificative | Modificări de configurare     |
| warning    | Condiții de avertizare          | Utilizare caracteristică depreciată |
| error      | Condiții de eroare              | Eșecuri de operație             |
| critical   | Condiții critice                | Defecțiuni ale componentelor sistemului |
| alert      | Trebuie luată acțiune imediat | Corupere a datelor detectată    |
| emergency  | Sistemul este inutilizabil     | Eșec complet al sistemului      |

## Implementarea notificărilor în MCP

Pentru implementarea notificărilor în MCP, trebuie să configurezi atât partea de server, cât și partea de client pentru a gestiona actualizările în timp real. Acest lucru permite aplicației tale să ofere feedback imediat utilizatorilor în timpul operațiilor îndelungate.

### Partea de server: trimiterea notificărilor

Să începem cu partea de server. În MCP, definești unelte care pot trimite notificări în timp ce procesează solicitări. Serverul folosește obiectul context (de obicei `ctx`) pentru a trimite mesaje către client.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

În exemplul precedent, unealta `process_files` trimite trei notificări clientului pe măsură ce procesează fiecare fișier. Metoda `ctx.info()` este folosită pentru a trimite mesaje informaționale.

În plus, pentru a activa notificările, asigură-te că serverul tău folosește un transport streaming (precum `streamable-http`) și că clientul implementează un handler de mesaje pentru a procesa notificările. Iată cum poți configura serverul să folosească transportul `streamable-http`:

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

În acest exemplu .NET, unealta `ProcessFiles` este decorată cu atributul `Tool` și trimite trei notificări clientului pe măsură ce procesează fiecare fișier. Metoda `ctx.Info()` este folosită pentru a trimite mesaje informaționale.

Pentru a activa notificările în serverul tău MCP .NET, asigură-te că folosești un transport streaming:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Partea de client: primirea notificărilor

Clientul trebuie să implementeze un handler de mesaje pentru a procesa și afișa notificările pe măsură ce sosesc.

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

În codul anterior, funcția `message_handler` verifică dacă mesajul primit este o notificare. Dacă da, afișează notificarea; altfel, îl procesează ca mesaj obișnuit de server. Observă de asemenea cum `ClientSession` este inițializat cu `message_handler` pentru a gestiona notificările primite.

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

În acest exemplu .NET, funcția `MessageHandler` verifică dacă mesajul primit este o notificare. Dacă da, afișează notificarea; altfel, îl procesează ca mesaj obișnuit de server. `ClientSession` este inițializat cu handler-ul de mesaje prin `ClientSessionOptions`.

Pentru a permite notificările, asigură-te că serverul tău folosește un transport streaming (precum `streamable-http`) și clientul implementează un handler de mesaje pentru a procesa notificările.

## Notificări de progres și scenarii

Această secțiune explică conceptul notificărilor de progres în MCP, de ce sunt importante și cum să le implementezi folosind Streamable HTTP. Vei găsi și un exercițiu practic pentru a-ți consolida înțelegerea.

Notificările de progres sunt mesaje în timp real trimise de server către client în timpul unor operații îndelungate. În loc să aștepte ca întregul proces să se finalizeze, serverul menține clientul informat despre starea curentă. Aceasta îmbunătățește transparența, experiența utilizatorului și facilitează depanarea.

**Exemplu:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### De ce să folosești notificările de progres?

Notificările de progres sunt esențiale din mai multe motive:

- **Experiență mai bună pentru utilizator:** Utilizatorii văd actualizările pe măsură ce lucrul progresează, nu doar la final.
- **Feedback în timp real:** Clienții pot afișa bare de progres sau jurnale, făcând aplicația să pară receptivă.
- **Debugging și monitorizare mai ușoară:** Dezvoltatorii și utilizatorii pot vedea unde un proces este lent sau blocat.

### Cum să implementezi notificările de progres

Iată cum poți implementa notificările de progres în MCP:

- **Pe server:** Folosește `ctx.info()` sau `ctx.log()` pentru a trimite notificări pe măsură ce fiecare element este procesat. Acest lucru trimite un mesaj clientului înainte ca rezultatul principal să fie gata.
- **Pe client:** Implementează un handler de mesaje care ascultă și afișează notificările pe măsură ce sosesc. Acest handler face diferența între notificări și rezultatul final.

**Exemplu de server:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Exemplu Client:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Considerații de securitate

Când implementați servere MCP cu transporturi bazate pe HTTP, securitatea devine o preocupare principală care necesită o atenție atentă la multiple vectori de atac și mecanisme de protecție.

### Prezentare generală

Securitatea este crucială atunci când expuneți servere MCP prin HTTP. HTTP Streamabil introduce noi suprafețe de atac și necesită o configurare atentă.

### Puncte cheie

- **Validarea antetului Origin**: Validați întotdeauna antetul `Origin` pentru a preveni atacurile de rebinding DNS.
- **Legare la localhost**: Pentru dezvoltare locală, legați serverele la `localhost` pentru a evita expunerea lor pe internetul public.
- **Autentificare**: Implementați autentificarea (de ex., chei API, OAuth) pentru implementările de producție.
- **CORS**: Configurați politici Cross-Origin Resource Sharing (CORS) pentru a restricționa accesul.
- **HTTPS**: Folosiți HTTPS în producție pentru a cripta traficul.

### Cele mai bune practici

- Nu aveți niciodată încredere în cererile primite fără validare.
- Înregistrați și monitorizați tot accesul și toate erorile.
- Actualizați regulat dependențele pentru a repara vulnerabilitățile de securitate.

### Provocări

- Echilibrarea securității cu ușurința dezvoltării
- Asigurarea compatibilității cu diferite medii client

## Actualizarea de la SSE la Streamable HTTP

Pentru aplicațiile care folosesc în prezent Server-Sent Events (SSE), migrarea la Streamable HTTP oferă capabilități îmbunătățite și o sustenabilitate mai bună pe termen lung pentru implementările MCP.

### De ce să actualizezi?

Există două motive convingătoare pentru a trece de la SSE la Streamable HTTP:

- Streamable HTTP oferă o scalabilitate mai bună, compatibilitate și suport mai bogat pentru notificări decât SSE.
- Este transportul recomandat pentru noile aplicații MCP.

### Pași pentru migrare

Iată cum puteți migra de la SSE la Streamable HTTP în aplicațiile dvs. MCP:

- **Actualizați codul serverului** pentru a folosi `transport="streamable-http"` în `mcp.run()`.
- **Actualizați codul clientului** pentru a folosi `streamablehttp_client` în loc de clientul SSE.
- **Implementați un handler de mesaje** în client pentru a procesa notificările.
- **Testați compatibilitatea** cu uneltele și fluxurile de lucru existente.

### Menținerea compatibilității

Se recomandă să mențineți compatibilitatea cu clienții SSE existenți pe durata procesului de migrare. Iată câteva strategii:

- Puteți suporta atât SSE cât și Streamable HTTP rulând ambele transporturi pe endpoint-uri diferite.
- Migrați gradual clienții la noul transport.

### Provocări

Asigurați-vă că abordați următoarele provocări în timpul migrării:

- Asigurarea că toți clienții sunt actualizați
- Gestionarea diferențelor de livrare a notificărilor

## Considerații de securitate

Securitatea ar trebui să fie o prioritate de top când implementați orice server, în special folosind transporturi bazate pe HTTP, cum este Streamable HTTP în MCP.

Când implementați servere MCP cu transporturi bazate pe HTTP, securitatea devine o preocupare principală care necesită o atenție atentă la multiple vectori de atac și mecanisme de protecție.

### Prezentare generală

Securitatea este crucială atunci când expuneți servere MCP prin HTTP. HTTP Streamabil introduce noi suprafețe de atac și necesită o configurare atentă.

Iată câteva considerații cheie de securitate:

- **Validarea antetului Origin**: Validați întotdeauna antetul `Origin` pentru a preveni atacurile de rebinding DNS.
- **Legare la localhost**: Pentru dezvoltare locală, legați serverele la `localhost` pentru a evita expunerea lor pe internetul public.
- **Autentificare**: Implementați autentificarea (de ex., chei API, OAuth) pentru implementările de producție.
- **CORS**: Configurați politici Cross-Origin Resource Sharing (CORS) pentru a restricționa accesul.
- **HTTPS**: Folosiți HTTPS în producție pentru a cripta traficul.

### Cele mai bune practici

De asemenea, iată câteva cele mai bune practici de urmat când implementați securitatea în serverul dvs. MCP de streaming:

- Nu aveți niciodată încredere în cererile primite fără validare.
- Înregistrați și monitorizați tot accesul și toate erorile.
- Actualizați regulat dependențele pentru a repara vulnerabilitățile de securitate.

### Provocări

Veți întâmpina câteva provocări când implementați securitatea în serverele MCP de streaming:

- Echilibrarea securității cu ușurința dezvoltării
- Asigurarea compatibilității cu diferite medii client

### Exercițiu: Construiește-ți propria aplicație MCP de streaming

**Scenariu:**
Construiește un server și un client MCP în care serverul procesează o listă de elemente (de exemplu, fișiere sau documente) și trimite o notificare pentru fiecare element procesat. Clientul ar trebui să afișeze fiecare notificare pe măsură ce aceasta soseste.

**Pași:**

1. Implementează un instrument server care procesează o listă și trimite notificări pentru fiecare element.
2. Implementează un client cu un handler de mesaje pentru a afișa notificările în timp real.
3. Testează implementarea rulând atât serverul cât și clientul și observă notificările.

[Soluție](./solution/README.md)

## Lecturi suplimentare și ce urmează?

Pentru a-ți continua călătoria cu streaming-ul MCP și a-ți extinde cunoștințele, această secțiune oferă resurse suplimentare și pași sugerați pentru construirea unor aplicații mai avansate.

### Lecturi suplimentare

- [Microsoft: Introducere în HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS în ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Cereri streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Ce urmează?

- Încearcă să construiești unelte MCP mai avansate care folosesc streaming pentru analize în timp real, chat sau editare colaborativă.
- Explorează integrarea streaming-ului MCP cu framework-uri frontend (React, Vue, etc.) pentru actualizări live ale interfeței utilizator.
- Următorul: [Utilizarea AI Toolkit pentru VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->