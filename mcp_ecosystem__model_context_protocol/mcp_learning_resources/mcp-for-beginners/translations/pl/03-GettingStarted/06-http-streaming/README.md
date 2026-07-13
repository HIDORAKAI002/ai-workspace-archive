# HTTPS Streaming z Modelem Protokółu Kontekstowego (MCP)

Ten rozdział zawiera wyczerpujący przewodnik po implementacji bezpiecznego, skalowalnego i strumieniowego przesyłania danych w czasie rzeczywistym za pomocą Modelu Protokółu Kontekstowego (MCP) z użyciem HTTPS. Obejmuje motywację dla strumieniowania, dostępne mechanizmy transportu, sposób implementacji HTTP umożliwiającego strumieniowanie w MCP, najlepsze praktyki bezpieczeństwa, migrację z SSE oraz praktyczne wskazówki dotyczące budowania własnych aplikacji strumieniowych MCP.

> **Zapowiedź:** ta lekcja opisuje Streamable HTTP według **Specyfikacji MCP 2025-11-25**, gdzie sesja jest ustanawiana podczas `initialize` i przypinana za pomocą nagłówka `Mcp-Session-Id`. Wersja kandydująca `2026-07-28` usuwa całkowicie handshake i identyfikator sesji, czyniąc każde żądanie samodzielnym i możliwym do kierowania do dowolnej instancji serwera bez tzw. sticky sessions. Zobacz [Co się zmienia w MCP: Wersja kandydująca 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) po szczegóły.

## Mechanizmy Transportu i Strumieniowanie w MCP

Sekcja ta bada różne mechanizmy transportu dostępne w MCP oraz ich rolę w umożliwianiu funkcji strumieniowania dla komunikacji w czasie rzeczywistym między klientami a serwerami.

### Czym jest Mechanizm Transportu?

Mechanizm transportu definiuje, w jaki sposób dane są wymieniane między klientem a serwerem. MCP obsługuje wiele typów transportu, by dostosować się do różnych środowisk i wymagań:

- **stdio**: Standardowe wejście/wyjście, odpowiednie do narzędzi lokalnych i CLI. Proste, ale nie nadaje się do webu czy chmury.
- **SSE (Server-Sent Events)**: Pozwala serwerom wysyłać klientom aktualizacje w czasie rzeczywistym przez HTTP. Dobre dla interfejsów webowych, ale ograniczone w skali i elastyczności. Od Specyfikacji MCP 2025-06-18, samodzielny transport SSE został wycofany i zastąpiony przez transport "Streamable HTTP".
- **Streamable HTTP**: Nowoczesny transport oparty na HTTP do strumieniowania, obsługujący powiadomienia i lepszą skalowalność. Zalecany dla większości scenariuszy produkcyjnych i chmurowych.

### Tabela Porównawcza

Spójrz na poniższą tabelę porównawczą, aby zrozumieć różnice między tymi mechanizmami transportu:

| Transport        | Aktualizacje w czasie rzeczywistym | Strumieniowanie | Skalowalność | Przypadek użycia               |
|------------------|------------------------------------|-----------------|--------------|-------------------------------|
| stdio            | Nie                                | Nie             | Niska        | Narzędzia lokalne CLI          |
| SSE              | Tak                                | Tak             | Średnia      | Web, aktualizacje w czasie rzeczywistym |
| Streamable HTTP  | Tak                                | Tak             | Wysoka       | Chmura, wielu klientów         |

> **Wskazówka:** Wybór odpowiedniego transportu wpływa na wydajność, skalowalność i doświadczenie użytkownika. **Streamable HTTP** jest rekomendowany dla nowoczesnych, skalowalnych i gotowych na chmurę aplikacji.

Zwróć uwagę na transporty stdio i SSE, które poznawałeś w poprzednich rozdziałach, oraz jak transport Streamable HTTP jest omówiony w tym rozdziale.

## Strumieniowanie: Koncepcje i Motywacje

Zrozumienie podstawowych koncepcji i motywacji stojących za strumieniowaniem jest niezbędne do implementacji wydajnych systemów komunikacji w czasie rzeczywistym.

**Strumieniowanie** to technika w programowaniu sieciowym, pozwalająca na wysyłanie i odbieranie danych w małych, zarządzalnych kawałkach lub jako sekwencji zdarzeń, zamiast czekać na całkowite przygotowanie odpowiedzi. Jest to szczególnie przydatne dla:

- Dużych plików lub zestawów danych.
- Aktualizacji w czasie rzeczywistym (np. czaty, paski postępu).
- Długotrwałych obliczeń, gdzie chcesz informować użytkownika na bieżąco.

Co należy wiedzieć o strumieniowaniu na wysokim poziomie:

- Dane są dostarczane sukcesywnie, nie wszystko naraz.
- Klient może przetwarzać dane, gdy tylko nadejdą.
- Zmniejsza opóźnienie postrzegane i poprawia doświadczenie użytkownika.

### Dlaczego używać strumieniowania?

Powody stosowania strumieniowania są następujące:

- Użytkownicy otrzymują natychmiastową informację zwrotną, nie tylko na końcu
- Umożliwia aplikacje w czasie rzeczywistym i responsywne interfejsy
- Bardziej efektywne wykorzystanie zasobów sieci i obliczeniowych

### Prosty przykład: Serwer i klient HTTP strumieniujący

Oto prosty przykład, jak można zaimplementować strumieniowanie:

#### Python

**Serwer (Python, używający FastAPI i StreamingResponse):**

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

**Klient (Python, używający requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Ten przykład pokazuje, jak serwer wysyła serię wiadomości do klienta, gdy są gotowe, zamiast czekać na wszystkie wiadomości.

**Jak to działa:**

- Serwer generuje każdą wiadomość, gdy jest gotowa.
- Klient odbiera i wypisuje każdy fragment w momencie nadejścia.

**Wymagania:**

- Serwer musi używać odpowiedzi strumieniowej (np. `StreamingResponse` w FastAPI).
- Klient musi przetwarzać odpowiedź jako strumień (`stream=True` w requests).
- Content-Type to zwykle `text/event-stream` lub `application/octet-stream`.

#### Java

**Serwer (Java, używający Spring Boot i Server-Sent Events):**

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

**Klient (Java, używający Spring WebFlux WebClient):**

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

**Uwagi odnośnie implementacji w Javie:**

- Korzysta z reaktywnej warstwy Spring Boot z `Flux` do strumieniowania
- `ServerSentEvent` zapewnia ustrukturyzowane strumieniowanie zdarzeń z typami zdarzeń
- `WebClient` z `bodyToFlux()` umożliwia konsumpcję strumieniową reaktywną
- `delayElements()` symuluje czas przetwarzania między zdarzeniami
- Zdarzenia mogą mieć typy (`info`, `result`) dla lepszej obsługi po stronie klienta

### Porównanie: Klasyczne strumieniowanie vs strumieniowanie MCP

Różnice między klasycznym sposobem strumieniowania a tym w MCP można przedstawić tak:

| Cecha                 | Klasyczne Strumieniowanie HTTP    | Strumieniowanie MCP (Powiadomienia)  |
|-----------------------|----------------------------------|-------------------------------------|
| Główna odpowiedź      | Dzielona na kawałki               | Pojedyncza, na końcu                 |
| Aktualizacje postępu  | Wysyłane jako kawałki danych      | Wysyłane jako powiadomienia          |
| Wymagania klienta     | Musi przetwarzać strumień         | Musi implementować obsługę wiadomości|
| Przypadek użycia      | Duże pliki, strumienie tokenów AI | Postęp, logi, informacja w czasie rzeczywistym |

### Kluczowe różnice

Dodatkowo, oto niektóre kluczowe różnice:

- **Wzorzec komunikacji:**
  - Klasyczne strumieniowanie HTTP: Używa prostego kodowania transferu chunked, aby wysyłać dane kawałkami
  - Strumieniowanie MCP: Używa ustrukturyzowanego systemu powiadomień z protokołem JSON-RPC

- **Format wiadomości:**
  - Klasyczne HTTP: Zwykłe kawałki tekstu z nowymi liniami
  - MCP: Ustrukturyzowane obiekty LoggingMessageNotification z metadanymi

- **Implementacja klienta:**
  - Klasyczne HTTP: Prosty klient przetwarzający odpowiedzi strumieniowe
  - MCP: Bardziej zaawansowany klient z obsługą różnych typów wiadomości

- **Aktualizacje postępu:**
  - Klasyczne HTTP: Postęp jest częścią głównego strumienia odpowiedzi
  - MCP: Postęp jest wysyłany za pomocą osobnych powiadomień, podczas gdy odpowiedź główna przychodzi na końcu

### Rekomendacje

Oto kilka zaleceń dotyczących wyboru między klasycznym strumieniowaniem (jako endpoint pokazany powyżej z `/stream`) a strumieniowaniem poprzez MCP:

- **Dla prostych potrzeb strumieniowania:** Klasyczne HTTP jest łatwiejsze do implementacji i wystarcza do podstawowych potrzeb.
- **Dla aplikacji złożonych, interaktywnych:** Strumieniowanie MCP zapewnia bardziej ustrukturyzowane podejście z bogatszą metadanymi i rozdzieleniem powiadomień od wyników końcowych.
- **Dla aplikacji AI:** System powiadomień MCP jest szczególnie użyteczny dla długotrwałych zadań AI, gdy chcesz informować użytkowników o postępie.

## Strumieniowanie w MCP

Dobrze, widziałeś już porównania i zalecenia dotyczące klasycznego strumieniowania oraz strumieniowania w MCP. Przejdźmy do szczegółów, jak dokładnie możesz wykorzystać strumieniowanie w MCP.

Zrozumienie, jak działa strumieniowanie w ramach MCP, jest kluczowe do budowania responsywnych aplikacji zapewniających informację w czasie rzeczywistym podczas długotrwałych operacji.

W MCP strumieniowanie nie polega na wysyłaniu głównej odpowiedzi w kawałkach, lecz na wysyłaniu **powiadomień** do klienta podczas przetwarzania żądania przez narzędzie. Powiadomienia mogą zawierać aktualizacje postępu, logi lub inne zdarzenia.

### Jak to działa

Główny wynik nadal jest wysyłany jako jedna odpowiedź. Jednak powiadomienia mogą być wysyłane jako osobne wiadomości podczas przetwarzania i tym samym aktualizują klienta w czasie rzeczywistym. Klient musi być w stanie obsłużyć i wyświetlać te powiadomienia.

## Co to jest Powiadomienie?

Wspomnieliśmy „Powiadomienie” — co to znaczy w kontekście MCP?

Powiadomienie to wiadomość wysyłana z serwera do klienta, informująca o postępie, statusie lub innych zdarzeniach podczas długotrwałej operacji. Powiadomienia zwiększają przejrzystość i poprawiają doświadczenie użytkownika.

Na przykład klient powinien wysłać powiadomienie zaraz po ustanowieniu początkowego handshake z serwerem.

Powiadomienie w formacie JSON wygląda tak:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Powiadomienia należą do tematu w MCP określanego jako ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Aby uruchomić logowanie, serwer musi włączyć tę funkcję/zdolność w ten sposób:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> W zależności od używanego SDK logowanie może być domyślnie włączone lub może być konieczne wyraźne włączenie go w konfiguracji serwera.

Istnieją różne rodzaje powiadomień:

| Poziom    | Opis                            | Przykładowy przypadek użycia   |
|-----------|--------------------------------|-------------------------------|
| debug     | Szczegółowe informacje debugowania | Punkty wejścia/wyjścia funkcji |
| info      | Ogólne komunikaty informacyjne | Aktualizacje postępu operacji  |
| notice    | Normalne, ale istotne zdarzenia | Zmiany konfiguracji            |
| warning   | Warunki ostrzegawcze            | Użycie przestarzałych funkcji |
| error     | Błędy                         | Niepowodzenia operacji         |
| critical  | Krytyczne warunki              | Awarie komponentów systemu     |
| alert     | Natychmiastowe działanie wymagane | Wykryto uszkodzenie danych    |
| emergency | System nieużyteczny             | Całkowita awaria systemu       |

## Implementacja Powiadomień w MCP

Aby zaimplementować powiadomienia w MCP, musisz skonfigurować zarówno serwer, jak i klienta do obsługi aktualizacji w czasie rzeczywistym. Pozwala to Twojej aplikacji na zapewnienie natychmiastowej informacji zwrotnej podczas długotrwałych operacji.

### Po stronie serwera: Wysyłanie powiadomień

Zacznijmy od strony serwera. W MCP definiujesz narzędzia, które mogą wysyłać powiadomienia podczas przetwarzania żądań. Serwer korzysta z obiektu kontekstu (zwykle `ctx`), aby wysyłać wiadomości do klienta.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

W powyższym przykładzie narzędzie `process_files` wysyła trzy powiadomienia do klienta w trakcie przetwarzania kolejnych plików. Metoda `ctx.info()` jest używana do wysyłania komunikatów informacyjnych.

Dodatkowo, aby włączyć powiadomienia, upewnij się, że Twój serwer korzysta z transportu strumieniowego (np. `streamable-http`), a klient implementuje obsługę wiadomości do przetwarzania powiadomień. Oto jak możesz ustawić serwer, aby używał transportu `streamable-http`:

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

W tym przykładzie .NET narzędzie `ProcessFiles` jest oznaczone atrybutem `Tool` i wysyła trzy powiadomienia do klienta podczas przetwarzania każdego pliku. Metoda `ctx.Info()` służy do wysyłania komunikatów informacyjnych.

Aby włączyć powiadomienia w Twoim serwerze MCP na .NET, upewnij się, że używasz transportu strumieniowego:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Po stronie klienta: Odbieranie powiadomień

Klient musi zaimplementować obsługę wiadomości, która przetwarza i wyświetla powiadomienia zaraz po ich nadejściu.

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

W powyższym kodzie funkcja `message_handler` sprawdza, czy nadchodząca wiadomość jest powiadomieniem. Jeśli tak, wypisuje powiadomienie; w przeciwnym razie przetwarza je jako zwykłą wiadomość serwera. Zwróć uwagę, jak `ClientSession` jest inicjalizowana z `message_handler` do obsługi przychodzących powiadomień.

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

W tym przykładzie .NET funkcja `MessageHandler` sprawdza, czy nadchodząca wiadomość to powiadomienie. Jeśli tak, wypisuje powiadomienie; jeśli nie, przetwarza ją jako standardową wiadomość serwera. `ClientSession` jest inicjalizowana z obsługą wiadomości przez `ClientSessionOptions`.

Aby umożliwić powiadomienia, upewnij się, że Twój serwer korzysta z transportu strumieniowego (np. `streamable-http`), a klient implementuje handler wiadomości do przetwarzania powiadomień.

## Powiadomienia o Postępie i Scenariusze

Sekcja ta wyjaśnia koncepcję powiadomień o postępie w MCP, dlaczego są ważne oraz jak je zaimplementować przy użyciu Streamable HTTP. Znajdziesz tu również praktyczne zadanie pomagające utrwalić wiedzę.

Powiadomienia o postępie to wiadomości w czasie rzeczywistym wysyłane z serwera do klienta podczas długotrwałych operacji. Zamiast czekać na zakończenie całego procesu, serwer ciągle informuje klienta o aktualnym stanie. Poprawia to przejrzystość, doświadczenie użytkownika i ułatwia debugowanie.

**Przykład:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Dlaczego używać powiadomień o postępie?

Powiadomienia o postępie są istotne z kilku powodów:

- **Lepsze doświadczenie użytkownika:** Użytkownicy widzą aktualizacje w trakcie pracy, nie tylko na zakończenie.
- **Informacja zwrotna w czasie rzeczywistym:** Klienci mogą wyświetlać paski postępu lub logi, sprawiając, że aplikacja wydaje się bardziej responsywna.
- **Łatwiejsze debugowanie i monitorowanie:** Programiści i użytkownicy mogą zobaczyć, gdzie proces może być wolny lub zablokowany.

### Jak zaimplementować powiadomienia o postępie

Oto jak zaimplementować powiadomienia o postępie w MCP:

- **Po stronie serwera:** Użyj `ctx.info()` lub `ctx.log()`, aby wysyłać powiadomienia podczas przetwarzania każdej pozycji. Wysyła to wiadomości do klienta przed gotowym wynikiem.
- **Po stronie klienta:** Zaimplementuj obsługę wiadomości, która nasłuchuje i wyświetla powiadomienia zaraz po nadejściu. Ta obsługa rozróżnia między powiadomieniami a finalnym wynikiem.

**Przykład serwera:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Przykład klienta:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Aspekty Bezpieczeństwa

Podczas implementacji serwerów MCP z transportami opartymi na HTTP, bezpieczeństwo staje się kwestią najwyższej wagi, wymagającą uwzględnienia wielu wektorów ataku i mechanizmów ochrony.

### Przegląd

Bezpieczeństwo jest kluczowe przy udostępnianiu serwerów MCP przez HTTP. Streamable HTTP wprowadza nowe obszary potencjalnych ataków i wymaga starannej konfiguracji.

### Kluczowe punkty
- **Weryfikacja nagłówka Origin**: Zawsze weryfikuj nagłówek `Origin`, aby zapobiec atakom DNS rebinding.
- **Więź z localhost**: Dla lokalnego rozwoju, wiąż serwery z `localhost`, aby nie udostępniać ich publicznie w internecie.
- **Uwierzytelnianie**: Wdroż uwierzytelnianie (np. klucze API, OAuth) dla środowisk produkcyjnych.
- **CORS**: Skonfiguruj polityki Cross-Origin Resource Sharing (CORS), aby ograniczyć dostęp.
- **HTTPS**: Używaj HTTPS w produkcji do szyfrowania ruchu.

### Najlepsze praktyki

- Nigdy nie ufaj nadchodzącym żądaniom bez weryfikacji.
- Loguj i monitoruj wszystkie dostępy i błędy.
- Regularnie aktualizuj zależności, aby łatać luki bezpieczeństwa.

### Wyzwania

- Znalezienie balansu między bezpieczeństwem a łatwością rozwoju
- Zapewnienie zgodności z różnymi środowiskami klienckimi

## Aktualizacja z SSE do Streamable HTTP

Dla aplikacji aktualnie korzystających z Server-Sent Events (SSE), migracja do Streamable HTTP zapewnia rozszerzone możliwości i lepszą długoterminową trwałość implementacji MCP.

### Dlaczego aktualizować?

Istnieją dwa główne powody, aby przejść z SSE na Streamable HTTP:

- Streamable HTTP oferuje lepszą skalowalność, kompatybilność i bogatsze wsparcie powiadomień niż SSE.
- Jest to rekomendowany transport dla nowych aplikacji MCP.

### Kroki migracji

Oto jak można zmigrować z SSE do Streamable HTTP w aplikacjach MCP:

- **Zaktualizuj kod serwera** do użycia `transport="streamable-http"` w `mcp.run()`.
- **Zaktualizuj kod klienta** do użycia `streamablehttp_client` zamiast klienta SSE.
- **Zaimplementuj obsługę wiadomości** po stronie klienta do przetwarzania powiadomień.
- **Przetestuj kompatybilność** z istniejącymi narzędziami i przepływami pracy.

### Utrzymywanie kompatybilności

Zaleca się utrzymywanie kompatybilności z istniejącymi klientami SSE podczas procesu migracji. Oto kilka strategii:

- Możesz obsługiwać zarówno SSE, jak i Streamable HTTP, uruchamiając oba transporty na różnych endpointach.
- Stopniowo migruj klientów do nowego transportu.

### Wyzwania

Upewnij się, że podczas migracji zwracasz uwagę na następujące kwestie:

- Zapewnienie aktualizacji wszystkich klientów
- Radzenie sobie z różnicami w dostarczaniu powiadomień

## Rozważania dotyczące bezpieczeństwa

Bezpieczeństwo powinno być najwyższym priorytetem przy implementacji jakiegokolwiek serwera, zwłaszcza używającego transportów HTTP, takich jak Streamable HTTP w MCP.

Implementując serwery MCP z transportami opartymi na HTTP, bezpieczeństwo staje się kluczową kwestią wymagającą uwagi na wiele wektorów ataku oraz mechanizmów ochronnych.

### Przegląd

Bezpieczeństwo jest krytyczne przy udostępnianiu serwerów MCP przez HTTP. Streamable HTTP wprowadza nowe powierzchnie ataku i wymaga starannej konfiguracji.

Oto kilka kluczowych kwestii dotyczących bezpieczeństwa:

- **Weryfikacja nagłówka Origin**: Zawsze weryfikuj nagłówek `Origin`, aby zapobiec atakom DNS rebinding.
- **Więź z localhost**: Dla lokalnego rozwoju, wiąż serwery z `localhost`, aby nie udostępniać ich publicznie w internecie.
- **Uwierzytelnianie**: Wdroż uwierzytelnianie (np. klucze API, OAuth) dla środowisk produkcyjnych.
- **CORS**: Skonfiguruj polityki Cross-Origin Resource Sharing (CORS), aby ograniczyć dostęp.
- **HTTPS**: Używaj HTTPS w produkcji do szyfrowania ruchu.

### Najlepsze praktyki

Dodatkowo, oto kilka najlepszych praktyk podczas implementacji bezpieczeństwa w serwerze streamingowym MCP:

- Nigdy nie ufaj nadchodzącym żądaniom bez weryfikacji.
- Loguj i monitoruj wszystkie dostępy i błędy.
- Regularnie aktualizuj zależności, aby łatać luki bezpieczeństwa.

### Wyzwania

Podczas implementacji bezpieczeństwa w serwerach streamingowych MCP napotkasz na wyzwania:

- Znalezienie balansu między bezpieczeństwem a łatwością rozwoju
- Zapewnienie zgodności z różnymi środowiskami klienckimi

### Zadanie: Zbuduj własną aplikację streamingową MCP

**Scenariusz:**
Zbuduj serwer i klient MCP, gdzie serwer przetwarza listę elementów (np. pliki lub dokumenty) i wysyła powiadomienie dla każdego przetworzonego elementu. Klient powinien wyświetlać każde powiadomienie na bieżąco.

**Kroki:**

1. Zaimplementuj narzędzie serwerowe, które przetwarza listę i wysyła powiadomienia dla każdego elementu.
2. Zaimplementuj klienta z obsługą wiadomości, który wyświetla powiadomienia w czasie rzeczywistym.
3. Przetestuj swoją implementację, uruchamiając serwer i klienta oraz obserwując powiadomienia.

[Solution](./solution/README.md)

## Dalsza lektura i co dalej?

Aby kontynuować przygodę z streamingiem MCP i poszerzyć wiedzę, ta sekcja dostarcza dodatkowych zasobów i proponuje kolejne kroki do tworzenia bardziej zaawansowanych aplikacji.

### Dalsza lektura

- [Microsoft: Wprowadzenie do HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS w ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Co dalej?

- Spróbuj zbudować bardziej zaawansowane narzędzia MCP wykorzystujące streaming do analiz w czasie rzeczywistym, czatu lub współredagowania.
- Eksploruj integrację streamingu MCP z frameworkami frontendowymi (React, Vue itp.) dla żywych aktualizacji interfejsu użytkownika.
- Dalej: [Wykorzystanie AI Toolkit dla VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->