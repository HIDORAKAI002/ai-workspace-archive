# Transmitere Streaming HTTPS cu Protocolul Contextului Modelului (MCP)

Acest capitol oferă un ghid cuprinzător pentru implementarea transmiterii securizate, scalabile și în timp real cu Protocolul Contextului Modelului (MCP) folosind HTTPS. Acoperă motivația pentru streaming, mecanismele de transport disponibile, cum să implementați HTTP streamabil în MCP, bune practici de securitate, migrarea de la SSE și ghiduri practice pentru construirea propriilor aplicații de streaming MCP. 

> **Privind înainte:** această lecție descrie Streamable HTTP conform **Specificației MCP 2025-11-25**, unde o sesiune este stabilită în timpul `initialize` și fixată cu un antet `Mcp-Session-Id`. Candidatul de lansare `2026-07-28` elimină complet handshake-ul și ID-ul sesiunii, făcând fiecare cerere autonomă și rutabilă către orice instanță a serverului fără sesiuni sticky. Vezi [Ce se schimbă în MCP: Candidatul de Lansare 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) pentru detalii.

## Mecanisme de Transport și Streaming în MCP

Această secțiune explorează diferitele mecanisme de transport disponibile în MCP și rolul lor în facilitarea capabilităților de streaming pentru comunicarea în timp real între clienți și servere.

### Ce este un mecanism de transport?

Un mecanism de transport definește modul în care datele sunt schimbate între client și server. MCP susține multiple tipuri de transport pentru a se potrivi diferitelor medii și cerințe:

- **stdio**: Intrare/ieșire standard, potrivit pentru unelte locale și CLI. Simplu, dar nepotrivit pentru web sau cloud.
- **SSE (Server-Sent Events)**: Permite serverelor să trimită actualizări în timp real către clienți prin HTTP. Bun pentru UI web, dar limitat în scalabilitate și flexibilitate. Din Specificația MCP 2025-06-18, transportul SSE independent a fost depreciat și înlocuit de transportul "Streamable HTTP".
- **Streamable HTTP**: Transport modern bazat pe HTTP pentru streaming, susținând notificări și o scalabilitate mai bună. Recomandat pentru majoritatea scenariilor de producție și cloud.

### Tabel Comparativ

Consultați tabelul comparativ de mai jos pentru a înțelege diferențele dintre aceste mecanisme de transport:

| Transport         | Actualizări în timp real | Streaming | Scalabilitate | Caz de utilizare            |
|-------------------|--------------------------|-----------|--------------|----------------------------|
| stdio             | Nu                       | Nu        | Scăzută      | Unelte CLI locale          |
| SSE               | Da                       | Da        | Medie        | Web, actualizări în timp real |
| Streamable HTTP   | Da                       | Da        | Ridicată     | Cloud, clienți multipli    |

> **Sfat:** Alegerea transportului potrivit influențează performanța, scalabilitatea și experiența utilizatorului. **Streamable HTTP** este recomandat pentru aplicații moderne, scalabile și pregătite pentru cloud.

Rețineți transporturile stdio și SSE prezentate în capitolele anterioare și cum Streamable HTTP este transportul acoperit în acest capitol.

## Streaming: Concepte și Motivație

Înțelegerea conceptelor fundamentale și a motivațiilor din spatele streaming-ului este esențială pentru implementarea unor sisteme eficiente de comunicare în timp real.

**Streaming-ul** este o tehnică în programarea de rețea care permite trimiterea și primirea datelor în bucăți mici, gestionabile sau ca o secvență de evenimente, în loc să se aștepte un răspuns complet. Acest lucru este deosebit de util pentru:

- Fișiere mari sau seturi de date.
- Actualizări în timp real (de exemplu, chat, bare de progres).
- Calculuri de durată lungă în care dorești să menții utilizatorul informat.

Iată ce trebuie să știi despre streaming la un nivel înalt:

- Datele sunt livrate progresiv, nu toate odată.
- Clientul poate procesa datele pe măsură ce sosesc.
- Reduce latența percepută și îmbunătățește experiența utilizatorului.

### De ce să folosești streaming?

Motivele pentru a folosi streaming sunt următoarele:

- Utilizatorii primesc feedback imediat, nu doar la final
- Permite aplicații în timp real și interfețe responsivă
- Folosirea mai eficientă a resurselor de rețea și calcul

### Exemplu simplu: Server & Client HTTP Streaming

Iată un exemplu simplu de implementare a streaming-ului:

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

Acest exemplu demonstrează un server care trimite o serie de mesaje către client pe măsură ce devin disponibile, în loc să aștepte ca toate mesajele să fie gata.

**Cum funcționează:**

- Serverul produce fiecare mesaj în momentul în care acesta este pregătit.
- Clientul primește și afișează fiecare parte pe măsură ce soseste.

**Cerințe:**

- Serverul trebuie să utilizeze un răspuns de tip streaming (exemplu: `StreamingResponse` în FastAPI).
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

**Note despre implementarea Java:**

- Folosește stiva reactivă Spring Boot cu `Flux` pentru streaming
- `ServerSentEvent` oferă streaming structurat cu tipuri de evenimente
- `WebClient` cu `bodyToFlux()` permite consumul reactiv al stream-ului
- `delayElements()` simulează timpul de procesare între evenimente
- Evenimentele pot avea tipuri (`info`, `result`) pentru o gestionare mai bună de client

### Comparație: Streaming Clasic vs Streaming MCP

Diferențele dintre cum funcționează streaming-ul într-un mod „clasic” versus cum funcționează în MCP pot fi reprezentate astfel:

| Caracteristică           | Streaming HTTP Clasic          | Streaming MCP (Notificări)        |
|-------------------------|-------------------------------|----------------------------------|
| Răspuns principal        | Bucăți (Chunked)              | Unic, la final                   |
| Actualizări de progres   | Trimis ca bucăți de date      | Trimis ca notificări             |
| Cerințe client           | Trebuie să proceseze stream   | Trebuie să implementeze handler de mesaje |
| Caz de utilizare         | Fișiere mari, fluxuri de tokene AI | Progres, jurnale, feedback în timp real |

### Diferențe cheie observate

În plus, iată câteva diferențe cheie:

- **Model de comunicare:**
  - Streaming HTTP clasic: Folosește transfer encoding simplu în bucăți pentru a trimite date în părți
  - Streaming MCP: Folosește un sistem structurat de notificări cu protocol JSON-RPC

- **Format mesaj:**
  - HTTP clasic: Bucăți de text simplu cu linii noi
  - MCP: Obiecte structurate LoggingMessageNotification cu metadata

- **Implementarea clientului:**
  - HTTP clasic: Client simplu care procesează răspunsuri streaming
  - MCP: Client mai sofisticat cu handler pentru mesaje care procesează diferite tipuri de mesaje

- **Actualizări de progres:**
  - HTTP clasic: Progresul face parte din fluxul răspunsului principal
  - MCP: Progresul este trimis prin mesaje separate de notificare în timp ce răspunsul principal vine la final

### Recomandări

Există câteva lucruri pe care le recomandăm în alegerea implementării streaming-ului clasic (ca endpoint prezentat mai sus folosind `/stream`) versus streamingul prin MCP.

- **Pentru nevoi simple de streaming:** Streamingul HTTP clasic este mai simplu de implementat și suficient pentru nevoi de bază.

- **Pentru aplicații complexe, interactive:** Streamingul MCP oferă o abordare mai structurată, cu metadata mai bogate și separarea între notificări și rezultate finale.

- **Pentru aplicații AI:** Sistemul de notificări MCP este deosebit de util pentru sarcini AI de durată lungă, unde dorești să ții utilizatorii informați despre progres.

## Streaming în MCP

Bine, așa că ai văzut unele recomandări și comparații până acum în ceea ce privește diferența dintre streamingul clasic și streamingul în MCP. Să intrăm în detalii despre cum poți valorifica streamingul în MCP.

Înțelegerea modului în care funcționează streamingul în cadrul MCP este esențială pentru a construi aplicații responsive care oferă feedback în timp real utilizatorilor în timpul unor operațiuni de durată.

În MCP, streamingul nu înseamnă trimiterea răspunsului principal în bucăți, ci trimiterea de **notificări** către client în timp ce o unealtă procesează o cerere. Aceste notificări pot include actualizări de progres, jurnale sau alte evenimente.

### Cum funcționează

Rezultatul principal este încă trimis ca un răspuns unic. Totuși, notificările pot fi trimise ca mesaje separate în timpul procesării și astfel actualizează clientul în timp real. Clientul trebuie să poată gestiona și afișa aceste notificări.

## Ce este o Notificare?

Am spus „Notificare”, ce înseamnă asta în contextul MCP?

O notificare este un mesaj trimis de la server către client pentru a informa despre progres, stare sau alte evenimente în timpul unei operațiuni de durată. Notificările îmbunătățesc transparența și experiența utilizatorului.

De exemplu, un client ar trebui să trimită o notificare odată ce handshake-ul inițial cu serverul a fost făcut.

O notificare arată așa ca mesaj JSON:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notificările aparțin unui topic în MCP numit ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Pentru a face logging să funcționeze, serverul trebuie să-l activeze ca funcționalitate/capabilitate astfel:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> În funcție de SDK-ul folosit, loggingul poate fi activat implicit sau poate fi necesar să-l activezi explicit în configurația serverului tău.

Există diferite tipuri de notificări:

| Nivel     | Descriere                     | Exemplu de utilizare           |
|-----------|-------------------------------|-------------------------------|
| debug     | Informații detaliate de depanare | Puncte de intrare/ieșire funcție |
| info      | Mesaje informaționale generale | Actualizări de progres operațiune |
| notice    | Evenimente normale dar semnificative | Schimbări de configurație    |
| warning   | Condiții de avertizare        | Utilizarea unei funcționalități depreciate |
| error     | Condiții de eroare            | Eșecuri de operațiune          |
| critical  | Condiții critice              | Defecțiuni ale componentelor sistemului |
| alert     | Acțiune trebuie luată imediat | Coruperea datelor detectată    |
| emergency | Sistemul este inutilizabil    | Defecțiune completă a sistemului |

## Implementarea notificărilor în MCP

Pentru a implementa notificările în MCP, trebuie să configurezi atât partea de server, cât și partea de client pentru a gestiona actualizările în timp real. Aceasta permite aplicației tale să ofere feedback imediat utilizatorilor în timpul operațiunilor îndelungate.

### Partea de server: Trimiterea notificărilor

Să începem cu partea de server. În MCP, definești unelte care pot trimite notificări în timpul procesării cererilor. Serverul folosește obiectul context (de obicei `ctx`) pentru a trimite mesaje către client.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

În exemplul precedent, unealta `process_files` trimite trei notificări către client pe măsură ce procesează fiecare fișier. Metoda `ctx.info()` este folosită pentru a trimite mesaje informaționale.

În plus, pentru a activa notificările, asigură-te că serverul tău folosește un transport de streaming (precum `streamable-http`) și clientul tău implementează un handler de mesaje pentru a procesa notificările. Iată cum poți configura serverul pentru a folosi transportul `streamable-http`:

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

Pentru a permite notificările în serverul tău MCP .NET, asigură-te că folosești un transport de streaming:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Partea de client: Primirea notificărilor

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

În codul precedent, funcția `message_handler` verifică dacă mesajul sosit este o notificare. Dacă este, afișează notificarea; altfel, o procesează ca un mesaj normal de la server. De asemenea, observă cum `ClientSession` este inițializat cu `message_handler` pentru a gestiona notificările sosite.

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

În acest exemplu .NET, funcția `MessageHandler` verifică dacă mesajul sosit este o notificare. Dacă este, afișează notificarea; altfel, o procesează ca un mesaj normal al serverului. `ClientSession` este inițializat cu handlerul de mesaje prin `ClientSessionOptions`.

Pentru a activa notificările, asigură-te că serverul tău folosește un transport de streaming (precum `streamable-http`) și clientul tău implementează un handler de mesaje pentru procesarea notificărilor.

## Notificări de Progres și Scenarii

Această secțiune explică conceptul notificărilor de progres în MCP, de ce sunt importante și cum să le implementezi folosind Streamable HTTP. Vei găsi și o sarcină practică pentru a-ți consolida înțelegerea.

Notificările de progres sunt mesaje în timp real trimise de la server către client în timpul unor operațiuni de durată. În loc să aștepte până la finalizarea totală, serverul ține clientul la curent cu starea curentă. Aceasta îmbunătățește transparența, experiența utilizatorului și facilitează depanarea.

**Exemplu:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### De ce să folosești notificări de progres?

Notificările de progres sunt esențiale pentru mai multe motive:

- **Experiență mai bună pentru utilizator:** Utilizatorii văd actualizări pe măsură ce lucrul progresează, nu doar la final.
- **Feedback în timp real:** Clienții pot afișa bare de progres sau jurnale, făcând aplicația să pară mai responsivă.
- **Depanare și monitorizare mai ușoară:** Dezvoltatorii și utilizatorii pot vedea unde un proces este lent sau blocat.

### Cum să implementezi notificări de progres

Iată cum poți implementa notificări de progres în MCP:

- **Pe server:** Folosește `ctx.info()` sau `ctx.log()` pentru a trimite notificări pe măsură ce fiecare element este procesat. Aceasta trimite un mesaj către client înainte de rezultatul principal.
- **Pe client:** Implementează un handler de mesaje care ascultă și afișează notificările pe măsură ce sosesc. Acest handler distinge între notificări și rezultatul final.

**Exemplu server:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Exemplu client:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Considerații de Securitate

Când implementezi servere MCP cu transporturi bazate pe HTTP, securitatea devine o preocupare primordială care necesită atenție atentă la diverse vectori de atac și mecanisme de protecție.

### Privire de ansamblu

Securitatea este critică când expui servere MCP prin HTTP. Streamable HTTP introduce noi suprafețe de atac și necesită configurare atentă.

### Puncte cheie


- **Validarea Header-ului Origin**: Validați întotdeauna header-ul `Origin` pentru a preveni atacurile DNS rebinding.
- **Legare la Localhost**: Pentru dezvoltare locală, legați serverele la `localhost` pentru a evita expunerea lor pe internetul public.
- **Autentificare**: Implementați autentificarea (de ex., chei API, OAuth) pentru implementările în producție.
- **CORS**: Configurați politicile Cross-Origin Resource Sharing (CORS) pentru a restricționa accesul.
- **HTTPS**: Folosiți HTTPS în producție pentru a cripta traficul.

### Cele mai bune practici

- Nu aveți încredere niciodată în cererile primite fără validare.
- Înregistrați și monitorizați tot accesul și erorile.
- Actualizați regulat dependențele pentru a remedia vulnerabilitățile de securitate.

### Provocări

- Echilibrarea securității cu ușurința dezvoltării
- Asigurarea compatibilității cu diferite medii client

## Actualizarea de la SSE la Streamable HTTP

Pentru aplicațiile care folosesc în prezent Server-Sent Events (SSE), migrarea la Streamable HTTP oferă capacități îmbunătățite și o sustenabilitate mai bună pe termen lung pentru implementările MCP.

### De ce să actualizați?

Există două motive convingătoare pentru a face upgrade de la SSE la Streamable HTTP:

- Streamable HTTP oferă o scalabilitate mai bună, compatibilitate și suport mai bogat pentru notificări comparativ cu SSE.
- Este transportul recomandat pentru noile aplicații MCP.

### Pașii migrației

Iată cum puteți migra de la SSE la Streamable HTTP în aplicațiile MCP:

- **Actualizați codul serverului** să utilizeze `transport="streamable-http"` în `mcp.run()`.
- **Actualizați codul clientului** să utilizeze `streamablehttp_client` în loc de clientul SSE.
- **Implementați un handler de mesaje** în client pentru a procesa notificările.
- **Testați compatibilitatea** cu instrumentele și fluxurile de lucru existente.

### Menținerea compatibilității

Este recomandat să mențineți compatibilitatea cu clienții SSE existenți în timpul procesului de migrare. Iată câteva strategii:

- Puteți suporta atât SSE cât și Streamable HTTP rulând ambele transporturi pe endpoint-uri diferite.
- Migrați treptat clienții la noul transport.

### Provocări

Asigurați-vă că abordați următoarele provocări în timpul migrației:

- Asigurarea actualizării tuturor clienților
- Gestionarea diferențelor în livrarea notificărilor

## Considerații de securitate

Securitatea trebuie să fie o prioritate de top când implementați orice server, în special atunci când folosiți transporturi bazate pe HTTP, cum este Streamable HTTP în MCP.

Atunci când implementați servere MCP folosind transporturi bazate pe HTTP, securitatea devine o preocupare majoră care necesită atenție atentă asupra multiplelor vectori de atac și mecanisme de protecție.

### Prezentare generală

Securitatea este critică când expuneți servere MCP prin HTTP. Streamable HTTP introduce noi suprafețe de atac și necesită o configurare atentă.

Iată câteva considerații cheie de securitate:

- **Validarea header-ului Origin**: Validați întotdeauna header-ul `Origin` pentru a preveni atacurile DNS rebinding.
- **Legare la localhost**: Pentru dezvoltare locală, legați serverele la `localhost` pentru a evita expunerea lor pe internetul public.
- **Autentificare**: Implementați autentificarea (de ex., chei API, OAuth) pentru implementările în producție.
- **CORS**: Configurați politicile Cross-Origin Resource Sharing (CORS) pentru a restricționa accesul.
- **HTTPS**: Folosiți HTTPS în producție pentru a cripta traficul.

### Cele mai bune practici

În plus, iată câteva dintre cele mai bune practici de urmat când implementați securitatea în serverul dvs. MCP de streaming:

- Nu aveți încredere niciodată în cererile primite fără validare.
- Înregistrați și monitorizați tot accesul și erorile.
- Actualizați regulat dependențele pentru a remedia vulnerabilitățile de securitate.

### Provocări

Veți întâmpina unele provocări când implementați securitatea în serverele MCP de streaming:

- Echilibrarea securității cu ușurința dezvoltării
- Asigurarea compatibilității cu diferite medii client

### Sarcină: Construiți propria aplicație MCP de streaming

**Scenariu:**
Construiți un server și un client MCP unde serverul procesează o listă de elemente (de ex., fișiere sau documente) și trimite o notificare pentru fiecare element procesat. Clientul ar trebui să afișeze fiecare notificare pe măsură ce aceasta soseste.

**Pași:**

1. Implementați un instrument server care procesează o listă și trimite notificări pentru fiecare element.
2. Implementați un client cu un handler de mesaje pentru a afișa notificările în timp real.
3. Testați implementarea rulând atât serverul, cât și clientul, și observați notificările.

[Soluție](./solution/README.md)

## Lecturi suplimentare & Ce urmează?

Pentru a continua călătoria cu streaming-ul MCP și a vă extinde cunoștințele, această secțiune oferă resurse suplimentare și pași sugerați pentru a construi aplicații mai avansate.

### Lecturi suplimentare

- [Microsoft: Introducere în HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS în ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Cereri Streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Ce urmează?

- Încercați să construiți instrumente MCP mai avansate care folosesc streaming pentru analize în timp real, chat sau editare colaborativă.
- Explorați integrarea streaming-ului MCP cu framework-uri frontend (React, Vue, etc.) pentru actualizări live ale interfeței UI.
- Următorul: [Utilizarea AI Toolkit pentru VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->