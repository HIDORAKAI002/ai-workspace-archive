# Streaming HTTPS cu Model Context Protocol (MCP)

Acest capitol oferă un ghid cuprinzător pentru implementarea streaming-ului securizat, scalabil și în timp real cu Model Context Protocol (MCP) folosind HTTPS. Acesta acoperă motivația pentru streaming, mecanismele de transport disponibile, cum să implementezi HTTP streamabil în MCP, cele mai bune practici de securitate, migrarea de la SSE și ghidaj practic pentru construirea propriilor aplicații MCP de streaming.

## Mecanisme de Transport și Streaming în MCP

Această secțiune explorează diferitele mecanisme de transport disponibile în MCP și rolul lor în activarea capabilităților de streaming pentru comunicarea în timp real între clienți și servere.

### Ce este un Mecanism de Transport?

Un mecanism de transport definește modul în care datele sunt schimbate între client și server. MCP suportă multiple tipuri de transport pentru a se potrivi diferitelor medii și cerințe:

- **stdio**: Intrare/ieșire standard, potrivit pentru instrumente locale și pe bază de CLI. Simplu, dar nu potrivit pentru web sau cloud.
- **SSE (Server-Sent Events)**: Permite serverelor să trimită actualizări în timp real către clienți prin HTTP. Bun pentru interfețe web, dar limitat în scalabilitate și flexibilitate. Începând cu Specificația MCP 2025-06-18, transportul SSE standalone a fost depreciat și înlocuit cu transportul „Streamable HTTP”.
- **Streamable HTTP**: Transport modern bazat pe HTTP pentru streaming, suportând notificări și o scalabilitate mai bună. Recomandat pentru cele mai multe scenarii de producție și cloud.

### Tabel de Comparare

Iată tabelul de comparare de mai jos pentru a înțelege diferențele între aceste mecanisme de transport:

| Transport         | Actualizări în timp real | Streaming | Scalabilitate | Caz de utilizare          |
|-------------------|--------------------------|-----------|---------------|--------------------------|
| stdio             | Nu                       | Nu        | Scăzut        | Unelte CLI locale        |
| SSE               | Da                       | Da        | Mediu         | Web, actualizări în timp real |
| Streamable HTTP   | Da                       | Da        | Ridicat       | Cloud, multi-client       |

> **Sfat:** Alegerea transportului potrivit afectează performanța, scalabilitatea și experiența utilizatorului. **Streamable HTTP** este recomandat pentru aplicații moderne, scalabile și gata pentru cloud.

Observați transporturile stdio și SSE prezentate în capitolele anterioare și modul în care Streamable HTTP este transportul acoperit în acest capitol.

## Streaming: Concepte și Motivație

Înțelegerea conceptelor fundamentale și a motivației din spatele streaming-ului este esențială pentru implementarea sistemelor eficiente de comunicare în timp real.

**Streaming-ul** este o tehnică în programarea rețelelor care permite trimiterea și primirea datelor în bucăți mici, gestionabile sau ca o secvență de evenimente, în loc să aștepți ca întregul răspuns să fie gata. Acest lucru este deosebit de util pentru:

- Fișiere sau seturi mari de date.
- Actualizări în timp real (de ex., chat, bare de progres).
- Calculuri de lungă durată în care vrei să menții utilizatorul informat.

Iată ce trebuie să știi despre streaming la nivel înalt:

- Datele sunt livrate progresiv, nu toate odată.
- Clientul poate procesa datele pe măsură ce sosesc.
- Reduce latența percepută și îmbunătățește experiența utilizatorului.

### De ce să folosești streaming?

Motivele pentru utilizarea streaming-ului sunt următoarele:

- Utilizatorii primesc feedback imediat, nu doar la final
- Permite aplicații în timp real și interfețe responsive
- Folosire mai eficientă a resurselor de rețea și calcul

### Exemplu Simplu: Server & Client HTTP Streaming

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

- Serverul transmite fiecare mesaj pe măsură ce este gata.
- Clientul primește și afișează fiecare bucată pe măsură ce sosesc.

**Cerințe:**

- Serverul trebuie să folosească un răspuns de tip streaming (de ex., `StreamingResponse` în FastAPI).
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

**Note pentru Implementarea în Java:**

- Folosește stack-ul reactiv al Spring Boot cu `Flux` pentru streaming
- `ServerSentEvent` oferă streaming structurat al evenimentelor cu tipuri de evenimente
- `WebClient` cu `bodyToFlux()` permite consumul reactiv al streaming-ului
- `delayElements()` simulează timpul de procesare între evenimente
- Evenimentele pot avea tipuri (`info`, `result`) pentru o gestionare mai bună de către client

### Comparare: Streaming Clasic vs Streaming MCP

Diferențele între cum funcționează streaming-ul în mod "clasic" versus cum funcționează în MCP pot fi reprezentate astfel:

| Funcționalitate       | Streaming HTTP Clasic          | Streaming MCP (Notificări)        |
|-----------------------|-------------------------------|----------------------------------|
| Răspuns principal      | În bucăți (chunked)            | Unic, la final                   |
| Actualizări progres    | Trimise ca bucăți de date      | Trimise ca notificări             |
| Cerințe client        | Trebuie să proceseze stream-ul | Trebuie să implementeze handler pentru mesaje |
| Caz de utilizare       | Fișiere mari, fluxuri de token AI | Progres, jurnale, feedback în timp real |

### Diferențe Cheie Observate

În plus, iată câteva diferențe cheie:

- **Model de Comunicare:**
  - Streaming HTTP clasic: Folosește encoding simplu chunked pentru a trimite date în bucăți
  - Streaming MCP: Folosește un sistem structurat de notificări cu protocol JSON-RPC

- **Formatul Mesajului:**
  - HTTP clasic: Bucăți de text simplu cu newline-uri
  - MCP: Obiecte structurate LoggingMessageNotification cu metadate

- **Implementare Client:**
  - HTTP clasic: Client simplu care procesează răspunsuri de streaming
  - MCP: Client mai sofisticat cu un handler de mesaje pentru tipuri diferite de mesaje

- **Actualizări Progres:**
  - HTTP clasic: Progresul face parte din streaming-ul principal al răspunsului
  - MCP: Progresul este trimis prin mesaje distincte de notificare, iar răspunsul principal vine la final

### Recomandări

Există câteva lucruri pe care le recomandăm când vine vorba despre alegerea între implementarea streaming-ului clasic (ca un endpoint arătat mai sus folosind `/stream`) versus alegerea streaming-ului prin MCP.

- **Pentru nevoi simple de streaming:** Streaming-ul HTTP clasic este mai simplu de implementat și suficient pentru nevoi de bază.

- **Pentru aplicații complexe, interactive:** Streaming-ul MCP oferă o abordare mai structurată cu metadate mai bogate și separare clară între notificări și rezultate finale.

- **Pentru aplicații AI:** Sistemul de notificări MCP este deosebit de util pentru sarcini AI de durată lungă, unde vrei să menții utilizatorii informați despre progres.

## Streaming în MCP

Ok, așadar ai văzut până acum unele recomandări și comparații privind diferența dintre streaming-ul clasic și cel MCP. Să intrăm în detalii exacte despre cum poți utiliza streaming-ul în MCP.

Înțelegerea modului în care funcționează streaming-ul în cadrul MCP este esențială pentru construirea de aplicații responsive care oferă feedback în timp real utilizatorilor în timpul operațiunilor de durată.

În MCP, streaming-ul nu este despre trimiterea răspunsului principal în bucăți, ci despre trimiterea de **notificări** către client în timp ce un instrument procesează o cerere. Aceste notificări pot include actualizări de progres, jurnale sau alte evenimente.

### Cum funcționează

Rezultatul principal este încă trimis ca răspuns unic. Totuși, notificările pot fi trimise ca mesaje separate în timpul procesării și astfel pot actualiza clientul în timp real. Clientul trebuie să poată gestiona și afișa aceste notificări.

## Ce este o Notificare?

Am spus „Notificare”, ce înseamnă asta în contextul MCP?

O notificare este un mesaj trimis de la server către client pentru a informa despre progres, stare sau alte evenimente în timpul unei operațiuni de durată lungă. Notificările îmbunătățesc transparența și experiența utilizatorului.

De exemplu, un client trebuie să trimită o notificare după ce inițializarea conexiunii cu serverul a fost realizată.

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

Notificările aparțin unui topic în MCP numit ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Pentru a activa logging-ul, serverul trebuie să îl activeze ca caracteristică/capabilitate astfel:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> În funcție de SDK-ul folosit, logging-ul poate fi activat implicit sau poate fi nevoie să îl activezi explicit în configurația serverului.

Există diferite tipuri de notificări:

| Nivel     | Descriere                     | Exemplu de utilizare            |
|-----------|-------------------------------|--------------------------------|
| debug     | Informații detaliate de depanare | Puncte de intrare/ieșire funcție |
| info      | Mesaje informaționale generale | Actualizări de progres          |
| notice    | Evenimente normale, dar importante | Schimbări de configurație       |
| warning   | Condiții de avertizare         | Utilizarea caracteristicii depreciate |
| error     | Condiții de eroare             | Eșecuri ale operațiunii         |
| critical  | Condiții critice               | Defecțiuni ale componentelor sistemului |
| alert     | Acțiune imediată necesară      | Detectare de corupere a datelor |
| emergency | Sistemul este inutilizabil     | Defecțiune completă a sistemului|

## Implementarea Notificărilor în MCP

Pentru a implementa notificările în MCP, trebuie să configurezi atât partea de server cât și partea de client pentru a gestiona actualizările în timp real. Astfel aplicația ta poate furniza feedback imediat utilizatorilor în timpul operațiilor de durată.

### Partea de server: Trimiterea Notificărilor

Să începem cu partea de server. În MCP, definești instrumente care pot trimite notificări în timp ce procesează cererile. Serverul folosește obiectul context (`ctx` de obicei) pentru a trimite mesaje către client.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

În exemplul precedent, instrumentul `process_files` trimite trei notificări către client pe măsură ce procesează fiecare fișier. Metoda `ctx.info()` este folosită pentru a trimite mesaje informaționale.

În plus, pentru a activa notificările, asigură-te că serverul folosește un transport de streaming (cum ar fi `streamable-http`) și clientul implementează un handler de mesaje pentru a procesa notificările. Iată cum poți configura serverul să folosească transportul `streamable-http`:

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

În acest exemplu .NET, instrumentul `ProcessFiles` este decorat cu atributul `Tool` și trimite trei notificări către client pe măsură ce procesează fiecare fișier. Metoda `ctx.Info()` este folosită pentru a trimite mesaje informaționale.

Pentru a activa notificările în serverul tău MCP .NET, asigură-te că folosești un transport de streaming:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Partea de client: Primirea Notificărilor

Clientul trebuie să implementeze un handler de mesaje care să proceseze și să afișeze notificările pe măsură ce sosesc.

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

În codul precedent, funcția `message_handler` verifică dacă mesajul primit este o notificare. Dacă este, afișează notificarea; altfel, îl procesează ca un mesaj normal de server. De asemenea observă cum `ClientSession` este inițializat cu `message_handler` pentru a gestiona notificările primite.

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

În acest exemplu .NET, funcția `MessageHandler` verifică dacă mesajul primit este o notificare. Dacă este, o afișează; altfel, îl procesează ca un mesaj normal de server. `ClientSession` este inițializat cu handler-ul de mesaje prin `ClientSessionOptions`.

Pentru a activa notificările, asigură-te că serverul folosește un transport de streaming (cum ar fi `streamable-http`) și clientul implementează un handler de mesaje pentru a procesa notificările.

## Notificări de Progres și Scenarii

Această secțiune explică conceptul notificărilor de progres în MCP, importanța lor și cum să le implementezi folosind Streamable HTTP. Vei găsi și o temă practică pentru a-ți consolida înțelegerea.

Notificările de progres sunt mesaje în timp real trimise de server către client în timpul operațiilor de durată lungă. În loc să aștepte ca întregul proces să se termine, serverul menține clientul actualizat despre starea curentă. Acest lucru îmbunătățește transparența, experiența utilizatorului și face depanarea mai ușoară.

**Exemplu:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### De ce să folosești Notificări de Progres?

Notificările de progres sunt esențiale din mai multe motive:

- **Experiență mai bună a utilizatorului:** Utilizatorii văd actualizări pe măsură ce munca avansează, nu doar la final.
- **Feedback în timp real:** Clienții pot afișa bare de progres sau jurnale, făcând aplicația să pară mai receptivă.
- **Depanare și monitorizare mai ușoară:** Dezvoltatorii și utilizatorii pot vedea unde un proces este lent sau blocat.

### Cum să implementezi Notificările de Progres

Iată cum poți implementa notificările de progres în MCP:

- **Pe server:** Folosește `ctx.info()` sau `ctx.log()` pentru a trimite notificări pe măsură ce fiecare element este procesat. Astfel se trimite un mesaj către client înainte ca rezultatul principal să fie gata.
- **Pe client:** Implementează un handler de mesaje care ascultă și afișează notificările pe măsură ce sosesc. Acest handler face distincția între notificări și rezultatul final.

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

La implementarea serverelor MCP cu transporturi bazate pe HTTP, securitatea devine o preocupare principală care necesită atenție riguroasă la multiple vectori de atac și mecanisme de protecție.

### Prezentare generală

Securitatea este critică când expui serverele MCP prin HTTP. Streamable HTTP introduce noi suprafețe de atac și necesită configurare atentă.

### Puncte cheie

- **Validarea header-ului Origin:** Verifică întotdeauna header-ul `Origin` pentru a preveni atacurile de tip DNS rebinding.
- **Legarea la localhost:** Pentru dezvoltare locală, leagă serverele la `localhost` pentru a evita expunerea pe internetul public.
- **Autentificare:** Implementează autentificare (de ex., chei API, OAuth) pentru implementări în producție.
- **CORS:** Configurează politicile de Cross-Origin Resource Sharing (CORS) pentru a restricționa accesul.
- **HTTPS:** Folosește HTTPS în producție pentru criptarea traficului.

### Cele mai bune practici

- Nu avea niciodată încredere în cererile primite fără validare.
- Loghează și monitorizează toate accesările și erorile.
- Actualizează regulat dependențele pentru a patch-ui vulnerabilitățile de securitate.

### Provocări
- Echilibrarea securității cu ușurința dezvoltării
- Asigurarea compatibilității cu diverse medii client

## Actualizarea de la SSE la Streamable HTTP

Pentru aplicațiile care utilizează în prezent Server-Sent Events (SSE), migrarea la Streamable HTTP oferă capacități îmbunătățite și o sustenabilitate pe termen lung mai bună pentru implementările MCP.

### De ce să faci upgrade?

Există două motive convingătoare pentru a face upgrade de la SSE la Streamable HTTP:

- Streamable HTTP oferă o scalabilitate, compatibilitate și suport de notificări mai bogate decât SSE.
- Este transportul recomandat pentru noile aplicații MCP.

### Pașii de migrare

Iată cum poți migra de la SSE la Streamable HTTP în aplicațiile tale MCP:

- **Actualizează codul serverului** pentru a folosi `transport="streamable-http"` în `mcp.run()`.
- **Actualizează codul clientului** pentru a folosi `streamablehttp_client` în locul clientului SSE.
- **Implementează un handler de mesaje** în client pentru a procesa notificările.
- **Testează compatibilitatea** cu uneltele și fluxurile de lucru existente.

### Menținerea compatibilității

Se recomandă menținerea compatibilității cu clienții SSE existenți pe durata procesului de migrare. Iată câteva strategii:

- Poți suporta atât SSE, cât și Streamable HTTP rulând ambele transporturi pe endpoint-uri diferite.
- Migrează treptat clienții către noul transport.

### Provocări

Asigură-te că abordezi următoarele provocări în timpul migrării:

- Asigurarea că toți clienții sunt actualizați
- Gestionarea diferențelor în livrarea notificărilor

## Considerații de securitate

Securitatea trebuie să fie o prioritate de top când implementezi orice server, mai ales când folosești transporturi bazate pe HTTP precum Streamable HTTP în MCP.

Când implementezi servere MCP cu transporturi bazate pe HTTP, securitatea devine o preocupare primordială ce necesită o atenție atentă la multiple vectori de atac și mecanisme de protecție.

### Prezentare generală

Securitatea este critică atunci când expui servere MCP prin HTTP. Streamable HTTP introduce noi suprafețe de atac și necesită configurare atentă.

Iată câteva considerente cheie de securitate:

- **Validarea Header-ului Origin**: Validează întotdeauna header-ul `Origin` pentru a preveni atacurile DNS rebinding.
- **Legarea la localhost**: Pentru dezvoltare locală, leagă serverele de `localhost` pentru a evita expunerea lor pe internetul public.
- **Autentificare**: Implementează autentificare (ex. chei API, OAuth) pentru mediile de producție.
- **CORS**: Configurează politici Cross-Origin Resource Sharing (CORS) pentru a restricționa accesul.
- **HTTPS**: Folosește HTTPS în producție pentru criptarea traficului.

### Cele mai bune practici

În plus, iată câteva bune practici de urmat când implementezi securitatea în serverul tău de streaming MCP:

- Nu avea încredere în cererile primite fără validare.
- Înregistrează și monitorizează toate accesările și erorile.
- Actualizează regulat dependențele pentru a remedia vulnerabilitățile de securitate.

### Provocări

Vei întâmpina unele provocări când implementezi securitatea în serverele de streaming MCP:

- Echilibrarea securității cu ușurința dezvoltării
- Asigurarea compatibilității cu diverse medii client

### Sarcină: Construiește-ți propria aplicație MCP de streaming

**Scenariu:**
Construiește un server și un client MCP în care serverul procesează o listă de elemente (de ex. fișiere sau documente) și trimite o notificare pentru fiecare element procesat. Clientul ar trebui să afișeze fiecare notificare pe măsură ce aceasta sosește.

**Pași:**

1. Implementează un instrument server care procesează o listă și trimite notificări pentru fiecare element.
2. Implementează un client cu un handler de mesaje care să afișeze notificările în timp real.
3. Testează implementarea rulând serverul și clientul și observă notificările.

[Solution](./solution/README.md)

## Lecturi suplimentare & Ce urmează?

Pentru a-ți continua parcursul cu streaming MCP și a-ți extinde cunoștințele, această secțiune oferă resurse suplimentare și pași sugerați pentru construirea unor aplicații mai avansate.

### Lecturi suplimentare

- [Microsoft: Introducere în HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS în ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Cereri de streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Ce urmează?

- Încearcă să construiești unelte MCP mai avansate care folosesc streaming pentru analize în timp real, chat sau editare colaborativă.
- Explorează integrarea streaming MCP cu framework-urile frontend (React, Vue etc.) pentru actualizări UI live.
- Următorul pas: [Utilizarea AI Toolkit pentru VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->