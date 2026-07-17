# Transmisja HTTPS z Protokołem Kontekstu Modelu (MCP)

Ten rozdział zawiera kompleksowy przewodnik po implementacji bezpiecznej, skalowalnej i działającej w czasie rzeczywistym transmisji strumieniowej z użyciem Protokołu Kontekstu Modelu (MCP) za pomocą HTTPS. Omawia motywację do transmisji, dostępne mechanizmy transportowe, jak zaimplementować transmisję strumieniową HTTP w MCP, najlepsze praktyki dotyczące bezpieczeństwa, migrację z SSE oraz praktyczne wskazówki dotyczące budowy własnych aplikacji strumieniowych MCP.

> **Patrząc w przyszłość:** ta lekcja opisuje Streamable HTTP w ramach **Specyfikacji MCP 2025-11-25**, gdzie sesja jest ustanawiana podczas `initialize` i przypinana za pomocą nagłówka `Mcp-Session-Id`. Wersja kandydująca  `2026-07-28` usuwa całkowicie handshake i identyfikator sesji, czyniąc każde żądanie samowystarczalnym i kierowalnym do dowolnej instancji serwera bez konieczności sticky sessions. Szczegóły znajdziesz w [Co się zmienia w MCP: wersja kandydująca 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Mechanizmy Transportowe i Transmisja w MCP

Ta sekcja analizuje różne dostępne mechanizmy transportowe w MCP oraz ich rolę w umożliwieniu transmisji strumieniowej do komunikacji w czasie rzeczywistym między klientami i serwerami.

### Czym jest Mechanizm Transportowy?

Mechanizm transportowy definiuje, jak dane są wymieniane między klientem a serwerem. MCP obsługuje wiele typów transportu, aby dopasować je do różnych środowisk i wymagań:

- **stdio**: Standardowe wejście/wyjście, odpowiednie dla lokalnych narzędzi i narzędzi CLI. Proste, ale nieodpowiednie dla sieci web lub chmury.
- **SSE (Server-Sent Events)**: Pozwala serwerom na przesyłanie aktualizacji w czasie rzeczywistym do klientów przez HTTP. Dobre dla interfejsów webowych, ale ograniczone pod względem skalowalności i elastyczności. Od Specyfikacji MCP 2025-06-18 samodzielny transport SSE został wycofany i zastąpiony przez transport "Streamable HTTP".
- **Streamable HTTP**: Nowoczesny transport oparty na HTTP do transmisji strumieniowej, wspierający powiadomienia i lepszą skalowalność. Zalecany dla większości scenariuszy produkcyjnych i chmurowych.

### Tabela Porównawcza

Spójrz na poniższą tabelę porównawczą, aby zrozumieć różnice między tymi mechanizmami transportu:

| Transport         | Aktualizacje w czasie rzeczywistym | Transmisja strumieniowa | Skalowalność | Przypadek użycia           |
|-------------------|------------------------------------|-------------------------|--------------|----------------------------|
| stdio             | Nie                                | Nie                     | Niska        | Lokalnie, narzędzia CLI    |
| SSE               | Tak                                | Tak                     | Średnia      | Web, aktualizacje w czasie rzeczywistym |
| Streamable HTTP   | Tak                                | Tak                     | Wysoka       | Chmura, wielu klientów     |

> **Wskazówka:** Wybór odpowiedniego transportu wpływa na wydajność, skalowalność i doświadczenie użytkownika. **Streamable HTTP** jest zalecany dla nowoczesnych, skalowalnych i gotowych na chmurę aplikacji.

Zwróć uwagę na transporty stdio i SSE pokazane w poprzednich rozdziałach oraz na transport Streamable HTTP omówiony w tym rozdziale.

## Transmisja Strumieniowa: Koncepcje i Motywacja

Zrozumienie podstawowych koncepcji i motywacji stojących za transmisją strumieniową jest niezbędne do implementacji efektywnych systemów komunikacji w czasie rzeczywistym.

**Transmisja strumieniowa** to technika w programowaniu sieciowym pozwalająca na przesyłanie i odbiór danych w małych, zarządzalnych kawałkach lub jako ciąg zdarzeń, zamiast czekać na gotową całą odpowiedź. Jest to szczególnie przydatne dla:

- Dużych plików lub zestawów danych.
- Aktualizacji w czasie rzeczywistym (np. czat, paski postępu).
- Długotrwałych obliczeń, gdzie chcesz informować użytkownika na bieżąco.

Oto, co trzeba wiedzieć o transmisji strumieniowej na wysokim poziomie:

- Dane są dostarczane stopniowo, nie wszystkie naraz.
- Klient może przetwarzać dane na bieżąco, gdy napływają.
- Zmniejsza odczuwalne opóźnienie i poprawia doświadczenie użytkownika.

### Dlaczego stosować transmisję strumieniową?

Powody użycia transmisji strumieniowej są następujące:

- Użytkownicy otrzymują natychmiastową informację zwrotną, a nie tylko na końcu
- Umożliwia aplikacjom działanie w czasie rzeczywistym i responsywne interfejsy
- Efektywniejsze wykorzystanie zasobów sieci i obliczeniowych

### Prosty przykład: serwer i klient transmisji HTTP

Oto prosty przykład implementacji transmisji strumieniowej:

#### Python

**Serwer (Python, używając FastAPI i StreamingResponse):**

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

**Klient (Python, używając requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Ten przykład pokazuje serwer wysyłający serię wiadomości do klienta w miarę ich dostępności, zamiast czekać aż wszystkie będą gotowe.

**Jak to działa:**

- Serwer wysyła każdą wiadomość, gdy jest gotowa.
- Klient odbiera i wyświetla każdą część, gdy napływa.

**Wymagania:**

- Serwer musi używać odpowiedzi strumieniowej (np. `StreamingResponse` w FastAPI).
- Klient musi przetwarzać odpowiedź jako strumień (`stream=True` w requests).
- Content-Type to zwykle `text/event-stream` lub `application/octet-stream`.

#### Java

**Serwer (Java, używając Spring Boot i Server-Sent Events):**

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

**Klient (Java, używając Spring WebFlux WebClient):**

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

**Notatki dotyczące implementacji w Javie:**

- Używa reaktywnego stosu Spring Boot z `Flux` dla transmisji strumieniowej
- `ServerSentEvent` dostarcza ustrukturyzowany strumień zdarzeń z typami zdarzeń
- `WebClient` z `bodyToFlux()` umożliwia reaktywne odbieranie strumienia
- `delayElements()` symuluje czas przetwarzania między zdarzeniami
- Zdarzenia mogą mieć typy (`info`, `result`) dla lepszego zarządzania po stronie klienta

### Porównanie: Klasyczna transmisja strumieniowa vs transmisja MCP

Różnice między klasyczną transmisją strumieniową a działaniem MCP można zobrazować tak:

| Cecha                  | Klasyczna transmisja HTTP        | Transmisja MCP (Powiadomienia)    |
|------------------------|---------------------------------|----------------------------------|
| Główna odpowiedź       | W kawałkach                     | Pojedyncza, na końcu             |
| Aktualizacje postępu    | Wysyłane jako kawałki danych    | Wysyłane jako powiadomienia      |
| Wymagania klienta       | Musi przetwarzać strumień         | Musi implementować obsługę wiadomości |
| Przypadek użycia        | Duże pliki, strumienie tokenów AI | Postęp, logi, informacje w czasie rzeczywistym |

### Kluczowe zaobserwowane różnice

Dodatkowo, oto kilka kluczowych różnic:

- **Wzorzec komunikacji:**
  - Klasyczna transmisja HTTP: proste kodowanie transferu chunked do przesyłania danych
  - Transmisja MCP: używa ustrukturyzowanego systemu powiadomień z protokołem JSON-RPC

- **Format wiadomości:**
  - Klasyczny HTTP: zwykły tekst w kawałkach z nowymi liniami
  - MCP: ustrukturyzowane obiekty LoggingMessageNotification z metadanymi

- **Implementacja klienta:**
  - Klasyczny HTTP: prosty klient przetwarzający odpowiedzi strumieniowe
  - MCP: bardziej zaawansowany klient z obsługą wiadomości do przetwarzania różnych typów

- **Aktualizacje postępu:**
  - Klasyczny HTTP: postęp jest częścią głównego strumienia odpowiedzi
  - MCP: postęp wysyłany jest oddzielnie przez powiadomienia, podczas gdy wynik główny przychodzi na końcu

### Zalecenia

Zalecamy pewne podejścia przy wyborze implementacji klasycznej transmisji strumieniowej (np. punkt końcowy `/stream`) lub transmisji poprzez MCP.

- **Dla prostych potrzeb transmisji:** Klasyczna transmisja HTTP jest prostsza do implementacji i wystarczająca do podstawowych zastosowań.

- **Dla złożonych, interaktywnych aplikacji:** Transmisja MCP zapewnia bardziej ustrukturyzowane podejście z bogatszymi metadanymi i oddzieleniem powiadomień od wyników końcowych.

- **Dla aplikacji AI:** System powiadomień MCP jest szczególnie przydatny dla długotrwających zadań AI, gdzie ważne jest ciągłe informowanie użytkowników o postępie.

## Transmisja Strumieniowa w MCP

Ok, widziałeś dotąd rekomendacje i porównania klasycznej transmisji i transmisji w MCP. Przejdźmy do szczegółów, jak możesz wykorzystać transmisję w MCP.

Zrozumienie, jak działa transmisja w ramach MCP, jest kluczowe dla tworzenia responsywnych aplikacji, które dostarczają informacje zwrotne w czasie rzeczywistym podczas długotrwałych operacji.

W MCP transmisja to nie przesyłanie głównej odpowiedzi w kawałkach, lecz wysyłanie **powiadomień** do klienta podczas przetwarzania żądania przez narzędzie. Powiadomienia mogą zawierać aktualizacje postępu, logi lub inne zdarzenia.

### Jak to działa

Główny wynik jest nadal wysyłany jako pojedyncza odpowiedź. Jednak powiadomienia mogą być wysyłane jako oddzielne komunikaty podczas przetwarzania i w ten sposób aktualizują klienta na bieżąco. Klient musi potrafić obsłużyć i wyświetlić te powiadomienia.

## Czym jest Powiadomienie?

Powiedzieliśmy "powiadomienie", co to znaczy w kontekście MCP?

Powiadomienie to wiadomość wysyłana z serwera do klienta, informująca o postępie, statusie lub innych zdarzeniach podczas długotrwałej operacji. Powiadomienia poprawiają przejrzystość i doświadczenie użytkownika.

Na przykład, klient powinien wysłać powiadomienie zaraz po zakończeniu wstępnego handshake z serwerem.

Powiadomienie wygląda tak jako wiadomość JSON:

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

> **Informacja o wycofaniu:** wersja kandydująca Specyfikacji MCP z `2026-07-28` oznacza element Logging jako wycofany na rzecz `stderr` dla transportów stdio oraz OpenTelemetry dla ustrukturyzowanej obserwowalności. Logging będzie nadal działał w `2025-11-25` oraz przez co najmniej rok po formalnym wycofaniu. Szczegóły w [Co się zmienia w MCP: wersja kandydująca 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Aby włączyć logowanie, serwer musi aktywować tę funkcję/możliwość w następujący sposób:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> W zależności od używanego SDK logowanie może być domyślnie włączone lub może wymagać wyraźnego włączenia w konfiguracji serwera.

Istnieją różne typy powiadomień:

| Poziom    | Opis                          | Przykładowe Zastosowanie      |
|-----------|-------------------------------|------------------------------|
| debug     | Szczegółowe informacje debugujące | Punkty wejścia/wyjścia funkcji |
| info      | Ogólne komunikaty informacyjne | Aktualizacje postępu operacji |
| notice    | Normalne, ale istotne zdarzenia | Zmiany konfiguracji           |
| warning   | Warunki ostrzegawcze           | Użycie przestarzałych funkcji |
| error     | Warunki błędów                 | Niepowodzenia operacji       |
| critical  | Warunki krytyczne              | Awaria komponentów systemu   |
| alert     | Należy podjąć natychmiastowe działanie | Wykryto uszkodzenie danych |
| emergency | System jest nieużywalny         | Całkowita awaria systemu     |

## Implementacja Powiadomień w MCP

Aby zaimplementować powiadomienia w MCP, musisz skonfigurować zarówno serwer, jak i klienta do obsługi aktualizacji w czasie rzeczywistym. Pozwala to Twojej aplikacji na zapewnienie natychmiastowej informacji zwrotnej użytkownikom podczas długotrwałych operacji.

### Po stronie serwera: wysyłanie powiadomień

Zacznijmy od strony serwera. W MCP definiujesz narzędzia, które mogą wysyłać powiadomienia podczas przetwarzania żądań. Serwer używa obiektu kontekstu (zazwyczaj `ctx`) do wysyłania wiadomości do klienta.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

W powyższym przykładzie narzędzie `process_files` wysyła trzy powiadomienia do klienta podczas przetwarzania każdego pliku. Metoda `ctx.info()` służy do wysyłania wiadomości informacyjnych.

Dodatkowo, aby umożliwić powiadomienia, upewnij się, że Twój serwer używa transportu strumieniowego (np. `streamable-http`), a klient implementuje obsługę wiadomości do przetwarzania powiadomień. Oto, jak skonfigurować serwer do korzystania z transportu `streamable-http`:

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

W tym przykładzie .NET narzędzie `ProcessFiles` jest oznaczone atrybutem `Tool` i wysyła trzy powiadomienia do klienta podczas przetwarzania każdego pliku. Metoda `ctx.Info()` służy do wysyłania wiadomości informacyjnych.

Aby włączyć powiadomienia w serwerze MCP .NET, upewnij się, że używasz transportu strumieniowego:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Po stronie klienta: odbieranie powiadomień

Klient musi implementować obsługę wiadomości, aby przetwarzać i wyświetlać powiadomienia w miarę ich nadejścia.

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

W powyższym kodzie funkcja `message_handler` sprawdza, czy nadchodząca wiadomość jest powiadomieniem. Jeśli tak, wypisuje powiadomienie; w przeciwnym razie przetwarza je jako zwykłą wiadomość serwera. Zwróć również uwagę, jak `ClientSession` jest inicjowane z `message_handler` do obsługi nadchodzących powiadomień.

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

W tym przykładzie .NET funkcja `MessageHandler` sprawdza, czy wiadomość przychodząca jest powiadomieniem. Jeśli tak, wypisuje powiadomienie, w przeciwnym razie traktuje ją jako zwykłą wiadomość serwera. `ClientSession` jest inicjowane z obsługą wiadomości za pomocą `ClientSessionOptions`.

Aby umożliwić powiadomienia, upewnij się, że Twój serwer korzysta z transportu strumieniowego (np. `streamable-http`), a klient implementuje obsługę powiadomień.

## Powiadomienia o Postępie i Scenariusze

Ta sekcja wyjaśnia koncepcję powiadomień o postępie w MCP, dlaczego są ważne oraz jak je zaimplementować używając Streamable HTTP. Znajdziesz również praktyczne zadanie, które utrwali Twoją wiedzę.

Powiadomienia o postępie to komunikaty wysyłane przez serwer do klienta w czasie rzeczywistym podczas długotrwałych operacji. Zamiast czekać na zakończenie całego procesu, serwer na bieżąco informuje klienta o aktualnym stanie. Poprawia to przejrzystość, doświadczenie użytkownika i ułatwia debugowanie.

**Przykład:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Dlaczego stosować powiadomienia o postępie?

Powiadomienia o postępie są ważne z kilku powodów:

- **Lepsze doświadczenie użytkownika:** Użytkownicy widzą aktualizacje w trakcie pracy, nie tylko na końcu.
- **Informacja zwrotna w czasie rzeczywistym:** Klienci mogą wyświetlać paski postępu lub logi, co sprawia, że aplikacja jest bardziej responsywna.
- **Łatwiejsze debugowanie i monitorowanie:** Deweloperzy i użytkownicy widzą, gdzie proces może zwalniać lub się zaciąć.

### Jak zaimplementować powiadomienia o postępie

Oto, jak możesz w MCP zaimplementować powiadomienia o postępie:

- **Po stronie serwera:** Użyj `ctx.info()` lub `ctx.log()`, aby wysyłać powiadomienia podczas przetwarzania każdego elementu. Wysyła to komunikat do klienta przed gotowością głównego wyniku.
- **Po stronie klienta:** Zaimplementuj obsługę wiadomości, która słucha i wyświetla powiadomienia po ich nadejściu. Obsługa rozróżnia powiadomienia od wyniku końcowego.

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

## Rozważania dotyczące bezpieczeństwa

Podczas implementacji serwerów MCP z użyciem transportów opartych na HTTP, bezpieczeństwo staje się kwestią nadrzędną, wymagającą starannej uwagi na wiele wektorów ataku i mechanizmów ochronnych.

### Przegląd

Bezpieczeństwo jest kluczowe przy udostępnianiu serwerów MCP przez HTTP. Strumieniowe HTTP wprowadza nowe powierzchnie ataku i wymaga starannej konfiguracji.

### Kluczowe punkty

- **Weryfikacja nagłówka Origin**: Zawsze weryfikuj nagłówek `Origin`, aby zapobiec atakom DNS rebinding.
- **Powiązanie z localhost**: Dla lokalnego rozwoju łącz serwery z `localhost`, aby nie wystawiać ich na publiczny internet.
- **Uwierzytelnianie**: Wdrażaj uwierzytelnianie (np. klucze API, OAuth) dla produkcyjnych wdrożeń.
- **CORS**: Konfiguruj polityki Cross-Origin Resource Sharing (CORS), aby ograniczyć dostęp.
- **HTTPS**: Używaj HTTPS w środowisku produkcyjnym, aby szyfrować ruch.

### Najlepsze praktyki

- Nigdy nie ufaj przychodzącym żądaniom bez weryfikacji.
- Rejestruj i monitoruj cały dostęp i błędy.
- Regularnie aktualizuj zależności, aby łatać luki bezpieczeństwa.

### Wyzwania

- Wyważenie bezpieczeństwa i łatwości rozwoju
- Zapewnienie kompatybilności z różnymi środowiskami klientów

## Aktualizacja z SSE do Strumieniowego HTTP

Dla aplikacji obecnie korzystających z Server-Sent Events (SSE), migracja do Strumieniowego HTTP zapewnia rozszerzone możliwości i lepszą długoterminową trwałość Twoich implementacji MCP.

### Dlaczego aktualizować?

Istnieją dwa przekonujące powody, aby przejść z SSE na Strumieniowe HTTP:

- Strumieniowe HTTP oferuje lepszą skalowalność, kompatybilność i bogatsze wsparcie powiadomień niż SSE.
- Jest rekomendowanym transportem dla nowych aplikacji MCP.

### Kroki migracji

Oto jak możesz migrować z SSE do Strumieniowego HTTP w swoich aplikacjach MCP:

- **Zaktualizuj kod serwera** do używania `transport="streamable-http"` w `mcp.run()`.
- **Zaktualizuj kod klienta** do używania `streamablehttp_client` zamiast klienta SSE.
- **Wdroż handler wiadomości** w kliencie do przetwarzania powiadomień.
- **Testuj kompatybilność** z istniejącymi narzędziami i procesami.

### Utrzymanie kompatybilności

Zaleca się utrzymanie kompatybilności z istniejącymi klientami SSE podczas procesu migracji. Oto kilka strategii:

- Możesz wspierać zarówno SSE, jak i Strumieniowe HTTP, uruchamiając oba transporty na różnych endpointach.
- Stopniowo migruj klientów do nowego transportu.

### Wyzwania

Upewnij się, że podczas migracji uwzględniasz następujące wyzwania:

- Zapewnienie aktualizacji wszystkich klientów
- Obsługa różnic w dostarczaniu powiadomień

## Rozważania dotyczące bezpieczeństwa

Bezpieczeństwo powinno być najważniejsze przy implementacji każdego serwera, zwłaszcza przy użyciu transportów opartych na HTTP, takich jak Strumieniowe HTTP w MCP.

Podczas implementowania serwerów MCP z transportami HTTP, bezpieczeństwo staje się kwestią nadrzędną, wymagającą starannej uwagi na wiele wektorów ataku i mechanizmów ochronnych.

### Przegląd

Bezpieczeństwo jest kluczowe przy udostępnianiu serwerów MCP przez HTTP. Strumieniowe HTTP wprowadza nowe powierzchnie ataku i wymaga starannej konfiguracji.

Oto kilka kluczowych aspektów bezpieczeństwa:

- **Weryfikacja nagłówka Origin**: Zawsze weryfikuj nagłówek `Origin`, aby zapobiec atakom DNS rebinding.
- **Powiązanie z localhost**: Dla lokalnego rozwoju łącz serwery z `localhost`, aby nie wystawiać ich na publiczny internet.
- **Uwierzytelnianie**: Wdrażaj uwierzytelnianie (np. klucze API, OAuth) dla produkcyjnych wdrożeń.
- **CORS**: Konfiguruj polityki Cross-Origin Resource Sharing (CORS), aby ograniczyć dostęp.
- **HTTPS**: Używaj HTTPS w środowisku produkcyjnym, aby szyfrować ruch.

### Najlepsze praktyki

Dodatkowo, oto kilka najlepszych praktyk do zastosowania podczas implementacji zabezpieczeń w serwerze strumieniowym MCP:

- Nigdy nie ufaj przychodzącym żądaniom bez weryfikacji.
- Rejestruj i monitoruj cały dostęp i błędy.
- Regularnie aktualizuj zależności, aby łatać luki bezpieczeństwa.

### Wyzwania

Napotkasz pewne wyzwania podczas wdrażania bezpieczeństwa w serwerach strumieniowych MCP:

- Wyważenie bezpieczeństwa i łatwości rozwoju
- Zapewnienie kompatybilności z różnymi środowiskami klientów

### Zadanie: Zbuduj swoją własną aplikację MCP streamingową

**Scenariusz:**
Zbuduj serwer MCP i klienta, gdzie serwer przetwarza listę elementów (np. pliki lub dokumenty) i wysyła powiadomienie dla każdego przetworzonego elementu. Klient powinien wyświetlać każde powiadomienie w momencie jego nadejścia.

**Kroki:**

1. Zaimplementuj narzędzie serwera, które przetwarza listę i wysyła powiadomienia dla każdego elementu.
2. Zaimplementuj klienta z handlerem wiadomości do wyświetlania powiadomień w czasie rzeczywistym.
3. Przetestuj swoją implementację, uruchamiając serwer i klienta oraz obserwuj powiadomienia.

[Rozwiązanie](./solution/README.md)

## Dalsza lektura i co dalej?

Aby kontynuować swoją przygodę ze strumieniowaniem MCP i poszerzać wiedzę, ta sekcja oferuje dodatkowe zasoby i sugerowane kolejne kroki do budowy bardziej zaawansowanych aplikacji.

### Dalsza lektura

- [Microsoft: Wprowadzenie do HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS w ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Co dalej?

- Spróbuj zbudować bardziej zaawansowane narzędzia MCP wykorzystujące streaming do analityki na żywo, czatu lub wspólnej edycji.
- Zbadaj integrację strumieniowania MCP z frameworkami frontendowymi (React, Vue itp.) dla aktualizacji UI na żywo.
- Dalej: [Wykorzystanie AI Toolkit dla VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->