# HTTPS Streaming z Protokółem Kontekstu Modelu (MCP)

Ten rozdział zawiera kompleksowy przewodnik po implementacji bezpiecznego, skalowalnego i działającego w czasie rzeczywistym streamingu z wykorzystaniem Protokółu Kontekstu Modelu (MCP) za pomocą HTTPS. Omawia motywację do streamingu, dostępne mechanizmy transportowe, jak zaimplementować strumieniowy HTTP w MCP, najlepsze praktyki bezpieczeństwa, migrację z SSE oraz praktyczne wskazówki do budowy własnych strumieniowych aplikacji MCP.

## Mechanizmy Transportowe i Streaming w MCP

Ta sekcja bada różne mechanizmy transportowe dostępne w MCP oraz ich rolę w udostępnianiu funkcji streamingu do komunikacji w czasie rzeczywistym pomiędzy klientami a serwerami.

### Czym jest Mechanizm Transportowy?

Mechanizm transportowy definiuje, jak dane są wymieniane pomiędzy klientem a serwerem. MCP wspiera kilka typów transportu, aby dopasować się do różnych środowisk i wymagań:

- **stdio**: Standardowe wejście/wyjście, odpowiednie dla narzędzi lokalnych i CLI. Prosty, ale nieodpowiedni dla weba ani chmury.
- **SSE (Server-Sent Events)**: Pozwala serwerom wysyłać aktualizacje w czasie rzeczywistym do klientów przez HTTP. Dobre dla interfejsów webowych, ale ograniczone pod względem skalowalności i elastyczności. Od specyfikacji MCP 2025-06-18 samodzielny transport SSE został wycofany i zastąpiony transportem "Streamable HTTP".
- **Streamable HTTP**: Nowoczesny strumieniowy transport oparty na HTTP, obsługujący powiadomienia i lepszą skalowalność. Zalecany dla większości produkcyjnych i chmurowych scenariuszy.

### Tabela Porównawcza

Spójrz na poniższą tabelę porównawczą, aby zrozumieć różnice między tymi mechanizmami transportu:

| Transport         | Aktualizacje w czasie rzeczywistym | Streaming | Skalowalność | Zastosowanie           |
|-------------------|------------------------------------|-----------|--------------|------------------------|
| stdio             | Nie                                | Nie       | Niska        | Lokalne narzędzia CLI  |
| SSE               | Tak                                | Tak       | Średnia      | Web, aktualizacje czasu rzeczywistego |
| Streamable HTTP   | Tak                                | Tak       | Wysoka       | Chmura, multi-klient   |

> **Wskazówka:** Wybór właściwego transportu wpływa na wydajność, skalowalność i doświadczenie użytkownika. **Streamable HTTP** jest zalecany dla nowoczesnych, skalowalnych i gotowych na chmurę aplikacji.

Zauważ mechanizmy stdio i SSE, które były omawiane w poprzednich rozdziałach, oraz to, że streamable HTTP jest transportem omówionym w tym rozdziale.

## Streaming: Koncepcje i Motywacja

Zrozumienie podstawowych koncepcji oraz motywacji stojących za streamingiem jest niezbędne do efektywnej implementacji systemów komunikacji w czasie rzeczywistym.

**Streaming** to technika w programowaniu sieciowym, która pozwala na wysyłanie i odbieranie danych w małych, zarządzalnych kawałkach lub jako sekwencja zdarzeń, zamiast czekać na gotową całą odpowiedź. Jest to szczególnie przydatne dla:

- Dużych plików lub zestawów danych.
- Aktualizacji w czasie rzeczywistym (np. czat, paski postępu).
- Długotrwałych obliczeń, gdzie chcemy informować użytkownika na bieżąco.

Oto, co warto wiedzieć o streamingu na wysokim poziomie:

- Dane są dostarczane stopniowo, nie wszystkie naraz.
- Klient może przetwarzać dane w trakcie ich nadejścia.
- Redukuje odczuwalne opóźnienie i poprawia komfort użytkownika.

### Dlaczego korzystać ze streamingu?

Powody korzystania ze streamingu to:

- Użytkownicy otrzymują natychmiastową informację zwrotną, nie tylko na końcu.
- Umożliwia aplikacje działające w czasie rzeczywistym oraz responsywne interfejsy.
- Bardziej efektywne wykorzystanie zasobów sieci i obliczeniowych.

### Prosty przykład: Serwer i klient HTTP Streaming

Oto prosty przykład implementacji streamingu:

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

Ten przykład demonstruje serwer wysyłający serię komunikatów do klienta, gdy tylko stają się dostępne, zamiast czekać na wszystkie komunikaty.

**Jak to działa:**

- Serwer zwraca każdą wiadomość na bieżąco.
- Klient odbiera i wyświetla każdą porcję danych po nadejściu.

**Wymagania:**

- Serwer musi używać odpowiedzi strumieniowej (np. `StreamingResponse` w FastAPI).
- Klient musi przetwarzać odpowiedź jako strumień (`stream=True` w requests).
- Content-Type zwykle `text/event-stream` lub `application/octet-stream`.

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

**Uwagi do implementacji w Javie:**

- Używa reaktywnego stosu Spring Boota z `Flux` do streamingu
- `ServerSentEvent` zapewnia strukturalny streaming zdarzeń z typami zdarzeń
- `WebClient` z `bodyToFlux()` umożliwia reaktywne konsumowanie streamingu
- `delayElements()` symuluje czas przetwarzania między zdarzeniami
- Zdarzenia mogą mieć typy (`info`, `result`) dla lepszego zarządzania po stronie klienta

### Porównanie: Klasyczny streaming vs MCP Streaming

Różnice między klasycznym streamingiem a streamingiem w MCP można zobrazować tak:

| Funkcja                 | Klasyczny HTTP Streaming         | MCP Streaming (Powiadomienia)       |
|-------------------------|---------------------------------|------------------------------------|
| Główna odpowiedź        | W porcjach (chunked)             | Pojedyncza, na końcu                |
| Aktualizacje postępu    | Wysyłane jako kawałki danych     | Wysyłane jako powiadomienia         |
| Wymagania klienta       | Musi przetwarzać strumień        | Musi implementować obsługę wiadomości |
| Zastosowanie            | Duże pliki, streamy tokenów AI   | Postęp, logi, informacje w czasie rzeczywistym |

### Najważniejsze różnice

Dodatkowo, oto kluczowe różnice:

- **Wzorzec komunikacji:**
  - Klasyczny streaming HTTP: Proste kodowanie transferu w kawałkach
  - MCP streaming: Strukturalny system powiadomień oparty na protokole JSON-RPC

- **Format wiadomości:**
  - Klasyczny HTTP: Proste tekstowe kawałki z nowymi liniami
  - MCP: Strukturalne obiekty LoggingMessageNotification z metadanymi

- **Implementacja klienta:**
  - Klasyczny HTTP: Prost klient obsługujący odpowiedź strumieniową
  - MCP: Bardziej zaawansowany klient z handlerem wiadomości do obsługi różnych typów wiadomości

- **Aktualizacje postępu:**
  - Klasyczny HTTP: Postęp jest częścią głównego strumienia odpowiedzi
  - MCP: Postęp jest przesyłany jako osobne powiadomienia, wynik główny przychodzi na końcu

### Rekomendacje

Oto kilka rekomendacji dotyczących wyboru między klasycznym streamingiem (np. endpoint `/stream`) a streamingiem MCP:

- **Dla prostych potrzeb streamingu:** Klasyczny HTTP streaming jest prostszy i wystarczający dla podstawowych scenariuszy.

- **Dla złożonych, interaktywnych aplikacji:** Streaming MCP zapewnia bardziej strukturalne podejście z bogatszymi metadanymi i rozdzieleniem powiadomień od wyników końcowych.

- **Dla aplikacji AI:** System powiadomień MCP jest szczególnie użyteczny dla długotrwałych zadań AI, gdzie ważne jest informowanie użytkownika o postępie.

## Streaming w MCP

Widzieliśmy już rekomendacje i porównania klasycznego streamingu oraz streamingu w MCP. Przejdźmy do szczegółów, jak można wykorzystać streaming w MCP.

Zrozumienie, jak działa streaming w ramach MCP, jest kluczowe do budowania responsywnych aplikacji, które dostarczają informacje zwrotne na bieżąco podczas długotrwałych operacji.

W MCP streaming nie polega na wysyłaniu głównej odpowiedzi w kawałkach, ale na wysyłaniu **powiadomień** do klienta podczas przetwarzania żądania przez narzędzie. Powiadomienia mogą zawierać aktualizacje postępu, logi lub inne zdarzenia.

### Jak to działa

Główny wynik jest wysyłany jako pojedyncza odpowiedź. Jednak powiadomienia mogą być wysyłane jako osobne wiadomości w trakcie przetwarzania i tym samym aktualizować klienta w czasie rzeczywistym. Klient musi potrafić obsługiwać i wyświetlać te powiadomienia.

## Czym jest Powiadomienie?

Mówiliśmy o "powiadomieniu" - co to znaczą w kontekście MCP?

Powiadomienie to wiadomość wysyłana z serwera do klienta, aby poinformować o postępie, statusie lub innych zdarzeniach podczas długotrwałej operacji. Powiadomienia zwiększają przejrzystość i poprawiają doświadczenie użytkownika.

Na przykład klient ma wysłać powiadomienie po nawiązaniu wstępnego połączenia (handshake) z serwerem.

Powiadomienie ma następujący wygląd jako wiadomość JSON:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Powiadomienia należą do tematu w MCP zwanym ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Aby włączyć logowanie, serwer musi to włączyć jako funkcję/możliwość w następujący sposób:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> W zależności od używanego SDK, logowanie może być domyślnie włączone lub może wymagać wyraźnego włączenia w konfiguracji serwera.

Istnieją różne typy powiadomień:

| Poziom    | Opis                             | Przykładowe zastosowanie       |
|-----------|---------------------------------|--------------------------------|
| debug     | Szczegółowe informacje debugujące | Punkty wejścia/wyjścia funkcji |
| info      | Ogólne informacje                | Aktualizacje postępu operacji  |
| notice    | Normalne, ale istotne zdarzenia | Zmiany konfiguracji            |
| warning   | Warunki ostrzegawcze             | Użycie przestarzałej funkcji   |
| error     | Błędy                           | Awaria operacji                |
| critical  | Warunki krytyczne                | Awaria komponentów systemu     |
| alert     | Natychmiastowa akcja wymagania  | Wykryto uszkodzenie danych    |
| emergency | System jest nieużywalny          | Całkowita awaria systemu       |

## Implementacja Powiadomień w MCP

Aby zaimplementować powiadomienia w MCP, musisz skonfigurować zarówno serwer, jak i klienta do obsługi aktualizacji w czasie rzeczywistym. Pozwoli to twojej aplikacji na natychmiastowe udzielanie informacji zwrotnej podczas długotrwałych operacji.

### Strona serwera: Wysyłanie powiadomień

Zacznijmy od strony serwera. W MCP definiujesz narzędzia, które mogą wysyłać powiadomienia podczas przetwarzania żądań. Serwer używa obiektu kontekstu (zwykle `ctx`), aby wysłać wiadomości do klienta.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

W powyższym przykładzie, narzędzie `process_files` wysyła trzy powiadomienia do klienta w trakcie przetwarzania każdego pliku. Metoda `ctx.info()` służy do wysyłania komunikatów informacyjnych.

Dodatkowo, aby umożliwić powiadomienia, upewnij się, że serwer używa transportu strumieniowego (np. `streamable-http`), a klient implementuje handler wiadomości do przetwarzania powiadomień. Oto jak ustawić serwer, by korzystał z transportu `streamable-http`:

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

W tym przykładzie .NET, narzędzie `ProcessFiles` jest oznaczone atrybutem `Tool` i wysyła trzy powiadomienia do klienta podczas przetwarzania każdego pliku. Metoda `ctx.Info()` służy do przesyłania informacji.

Aby umożliwić powiadomienia na serwerze MCP .NET, upewnij się, że używasz transportu strumieniowego:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Strona klienta: Odbieranie powiadomień

Klient musi zaimplementować handler wiadomości, który przetwarza i wyświetla powiadomienia na bieżąco.

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

W powyższym kodzie funkcja `message_handler` sprawdza, czy otrzymana wiadomość jest powiadomieniem. Jeśli tak, wypisuje powiadomienie; w przeciwnym razie przetwarza je jako zwykłą wiadomość serwera. Zwróć uwagę, jak `ClientSession` jest inicjalizowana z `message_handler`, aby obsługiwać przychodzące powiadomienia.

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

W tym przykładzie .NET funkcja `MessageHandler` sprawdza, czy nadchodząca wiadomość jest powiadomieniem. Jeśli tak, wypisuje powiadomienie; w przeciwnym razie przetwarza ją jako zwykłą wiadomość serwera. `ClientSession` jest inicjalizowana z handlerem wiadomości przez `ClientSessionOptions`.

Aby umożliwić powiadomienia, upewnij się, że serwer używa transportu strumieniowego (np. `streamable-http`), a klient implementuje handler wiadomości do przetwarzania powiadomień.

## Powiadomienia Postępu i Scenariusze

Ta sekcja wyjaśnia koncepcję powiadomień postępu w MCP, dlaczego są ważne oraz jak je zaimplementować używając Streamable HTTP. Znajdziesz tu również praktyczne zadanie do utrwalenia wiedzy.

Powiadomienia postępu to wiadomości wysyłane w czasie rzeczywistym z serwera do klienta podczas długotrwałych operacji. Zamiast czekać na zakończenie całego procesu, serwer informuje klienta o aktualnym statusie. Poprawia to przejrzystość, doświadczenie użytkownika oraz ułatwia debugowanie.

**Przykład:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Dlaczego korzystać z powiadomień postępu?

Powiadomienia postępu są ważne z kilku powodów:

- **Lepsze doświadczenie użytkownika:** Użytkownicy widzą aktualizacje na bieżąco, a nie tylko na końcu.
- **Informacja zwrotna w czasie rzeczywistym:** Klienci mogą wyświetlać paski postępu lub logi, co sprawia, że aplikacja jest bardziej responsywna.
- **Łatwiejsze debugowanie i monitoring:** Programiści i użytkownicy mogą zobaczyć, gdzie proces może być wolny lub zatrzymać się.

### Jak implementować powiadomienia postępu

Oto jak można zaimplementować powiadomienia postępu w MCP:

- **Po stronie serwera:** Używaj `ctx.info()` lub `ctx.log()`, aby wysyłać powiadomienia o kolejnych przetwarzanych elementach. Pozwala to wysyłać wiadomości do klienta zanim główny wynik będzie gotowy.
- **Po stronie klienta:** Zaimplementuj handler wiadomości, który nasłuchuje i wyświetla powiadomienia w momencie ich nadejścia. Handler rozróżnia powiadomienia od ostatecznego wyniku.

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

## Aspekty bezpieczeństwa

Podczas implementacji serwerów MCP z transportami opartymi na HTTP, kwestie bezpieczeństwa stają się kluczowe i wymagają starannej uwagi na różne wektory ataków i mechanizmy ochrony.

### Podsumowanie

Bezpieczeństwo jest krytyczne przy udostępnianiu serwerów MCP przez HTTP. Streamable HTTP wprowadza nowe powierzchnie ataków, wymagając starannej konfiguracji.

### Kluczowe punkty

- **Walidacja nagłówka Origin**: Zawsze waliduj nagłówek `Origin`, aby zapobiec atakom DNS rebinding.
- **Powiązanie z localhost**: Dla lokalnego rozwoju powiąż serwery z `localhost`, aby nie były dostępne publicznie.
- **Uwierzytelnianie**: Wdrażaj uwierzytelnianie (np. klucze API, OAuth) dla środowisk produkcyjnych.
- **CORS**: Konfiguruj polityki Cross-Origin Resource Sharing, by ograniczyć dostęp.
- **HTTPS**: Używaj HTTPS w produkcji do szyfrowania ruchu.

### Najlepsze praktyki

- Nigdy nie ufaj przychodzącym żądaniom bez weryfikacji.
- Loguj i monitoruj cały dostęp i błędy.
- Regularnie aktualizuj zależności, aby łatkiwać podatności bezpieczeństwa.

### Wyzwania
- Równoważenie bezpieczeństwa z łatwością rozwoju
- Zapewnienie kompatybilności z różnymi środowiskami klienckimi

## Aktualizacja z SSE do Streamable HTTP

Dla aplikacji obecnie korzystających z Server-Sent Events (SSE), migracja do Streamable HTTP zapewnia zaawansowane możliwości i lepszą długoterminową wydajność dla twoich implementacji MCP.

### Dlaczego aktualizować?

Istnieją dwa przekonujące powody do aktualizacji ze SSE do Streamable HTTP:

- Streamable HTTP oferuje lepszą skalowalność, kompatybilność oraz bogatsze wsparcie powiadomień niż SSE.
- Jest to zalecany transport dla nowych aplikacji MCP.

### Kroki migracji

Oto jak możesz przeprowadzić migrację ze SSE na Streamable HTTP w swoich aplikacjach MCP:

- **Zaktualizuj kod serwera**, aby używać `transport="streamable-http"` w `mcp.run()`.
- **Zaktualizuj kod klienta**, aby korzystać z `streamablehttp_client` zamiast klienta SSE.
- **Zaimplementuj obsługę wiadomości** w kliencie do przetwarzania powiadomień.
- **Przetestuj kompatybilność** z istniejącymi narzędziami i procesami.

### Utrzymanie kompatybilności

Zaleca się zachowanie kompatybilności z istniejącymi klientami SSE podczas procesu migracji. Oto kilka strategii:

- Możesz obsługiwać zarówno SSE, jak i Streamable HTTP, uruchamiając oba transporty na różnych punktach końcowych.
- Stopniowo migruj klientów na nowy transport.

### Wyzwania

Należy zwrócić uwagę na następujące wyzwania podczas migracji:

- Zapewnienie aktualizacji wszystkich klientów
- Obsługa różnic w dostarczaniu powiadomień

## Aspekty bezpieczeństwa

Bezpieczeństwo powinno być priorytetem podczas implementacji dowolnego serwera, szczególnie korzystającego z transportów opartych na HTTP, takich jak Streamable HTTP w MCP. 

Implementując serwery MCP z transportami opartymi na HTTP, bezpieczeństwo staje się kwestią kluczową, wymagającą dokładnego uwzględnienia wielu wektorów ataku i mechanizmów ochronnych.

### Przegląd

Bezpieczeństwo jest krytycznie ważne przy udostępnianiu serwerów MCP przez HTTP. Streamable HTTP wprowadza nowe powierzchnie ataku i wymaga starannej konfiguracji.

Oto kilka kluczowych aspektów bezpieczeństwa:

- **Walidacja nagłówka Origin**: Zawsze weryfikuj nagłówek `Origin`, aby zapobiegać atakom DNS rebinding.
- **Powiązanie z localhost**: Podczas lokalnego rozwoju powiąż serwery z `localhost`, aby nie wystawiać ich w internecie publicznym.
- **Uwierzytelnianie**: Zaimplementuj uwierzytelnianie (np. klucze API, OAuth) w środowiskach produkcyjnych.
- **CORS**: Skonfiguruj polityki Cross-Origin Resource Sharing (CORS), aby ograniczyć dostęp.
- **HTTPS**: Używaj HTTPS w produkcji do szyfrowania ruchu.

### Najlepsze praktyki

Dodatkowo, oto kilka najlepszych praktyk przy wdrażaniu zabezpieczeń w serwerze streamingowym MCP:

- Nigdy nie ufaj przychodzącym żądaniom bez weryfikacji.
- Loguj i monitoruj wszelkie dostępy oraz błędy.
- Regularnie aktualizuj zależności, aby załatać luki bezpieczeństwa.

### Wyzwania

Podczas wdrażania zabezpieczeń w serwerach streamingowych MCP napotkasz następujące wyzwania:

- Równoważenie bezpieczeństwa z łatwością rozwoju
- Zapewnienie kompatybilności z różnymi środowiskami klienckimi

### Zadanie: Zbuduj własną streamingową aplikację MCP

**Scenariusz:**  
Zbuduj serwer i klienta MCP, gdzie serwer przetwarza listę elementów (np. pliki lub dokumenty) i wysyła powiadomienie dla każdego przetworzonego elementu. Klient powinien wyświetlać każde powiadomienie w momencie jego nadejścia.

**Kroki:**

1. Zaimplementuj narzędzie serwera, które przetwarza listę i wysyła powiadomienia dla każdego elementu.
2. Zaimplementuj klienta z obsługą wiadomości do wyświetlania powiadomień w czasie rzeczywistym.
3. Przetestuj implementację, uruchamiając serwer i klienta oraz obserwując powiadomienia.

[Solution](./solution/README.md)

## Dalsza lektura i co dalej?

Aby kontynuować swoją przygodę ze streamingiem MCP i poszerzyć wiedzę, ta sekcja zawiera dodatkowe zasoby oraz sugerowane dalsze kroki w budowaniu bardziej zaawansowanych aplikacji.

### Dalsza lektura

- [Microsoft: Wprowadzenie do HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS w ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Co dalej?

- Spróbuj zbudować bardziej zaawansowane narzędzia MCP wykorzystujące streaming do analityki w czasie rzeczywistym, czatu lub współdzielonej edycji.
- Zbadaj integrację streamingu MCP z frameworkami frontendowymi (React, Vue itp.) dla aktualizacji UI na żywo.
- Następny rozdział: [Wykorzystanie AI Toolkit w VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->