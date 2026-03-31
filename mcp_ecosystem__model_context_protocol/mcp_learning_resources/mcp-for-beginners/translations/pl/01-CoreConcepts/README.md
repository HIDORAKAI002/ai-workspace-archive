# Podstawowe Koncepcje MCP: Opanowanie Model Context Protocol dla Integracji AI

[![Podstawowe Koncepcje MCP](../../../translated_images/pl/02.8203e26c6fb5a797.webp)](https://youtu.be/earDzWGtE84)

_(Kliknij obraz powyżej, aby obejrzeć wideo z tej lekcji)_

[Model Context Protocol (MCP)](https://github.com/modelcontextprotocol) to potężny, ustandaryzowany framework, który optymalizuje komunikację pomiędzy dużymi modelami językowymi (LLM) a zewnętrznymi narzędziami, aplikacjami i źródłami danych.  
Ten przewodnik przeprowadzi Cię przez podstawowe koncepcje MCP. Poznasz jego architekturę klient-serwer, kluczowe komponenty, mechanikę komunikacji oraz najlepsze praktyki wdrożeniowe.

- **Wyraźna zgoda użytkownika**: Wszelki dostęp do danych i operacje wymagają wyraźnej zgody użytkownika przed wykonaniem. Użytkownicy muszą jasno rozumieć, jakie dane będą dostępne i jakie działania zostaną podjęte, z granularną kontrolą uprawnień i autoryzacji.

- **Ochrona prywatności danych**: Dane użytkownika są udostępniane tylko za zgodą i muszą być chronione silnymi kontrolami dostępu przez cały cykl życia interakcji. Wdrożenia muszą zapobiegać nieautoryzowanej transmisji danych i utrzymywać surowe granice prywatności.

- **Bezpieczeństwo wykonywania narzędzi**: Każde wywołanie narzędzia wymaga wyraźnej zgody użytkownika ze zrozumieniem funkcjonalności, parametrów i potencjalnego wpływu narzędzia. Solidne mechanizmy bezpieczeństwa muszą zapobiegać niezamierzonemu, niebezpiecznemu lub złośliwemu wykonaniu narzędzi.

- **Bezpieczeństwo warstwy transportowej**: Wszystkie kanały komunikacji powinny wykorzystywać odpowiednie mechanizmy szyfrowania i uwierzytelniania. Połączenia zdalne powinny korzystać z bezpiecznych protokołów transportowych i odpowiedniego zarządzania poświadczeniami.

#### Wytyczne dotyczące wdrożenia:

- **Zarządzanie uprawnieniami**: Wdrażaj systemy precyzyjnego zarządzania uprawnieniami, które pozwalają użytkownikom kontrolować, które serwery, narzędzia i zasoby są dostępne
- **Uwierzytelnianie i autoryzacja**: Wykorzystuj bezpieczne metody uwierzytelniania (OAuth, klucze API) z odpowiednim zarządzaniem tokenami i ich wygasaniem  
- **Walidacja danych wejściowych**: Waliduj wszystkie parametry i dane zgodnie z określonymi schematami, aby zapobiec atakom typu injection
- **Rejestracja zdarzeń**: Prowadź szczegółowe logi wszystkich operacji w celu monitoringu bezpieczeństwa i zgodności

## Przegląd

Ta lekcja omawia podstawową architekturę i komponenty, które tworzą ekosystem Model Context Protocol (MCP). Dowiesz się o architekturze klient-serwer, kluczowych składnikach i mechanizmach komunikacji, które napędzają interakcje MCP.

## Kluczowe cele nauki

Po ukończeniu tej lekcji będziesz:

- Rozumieć architekturę klient-serwer MCP.
- Identyfikować role i obowiązki Hostów, Klientów i Serwerów.
- Analizować podstawowe cechy, które czynią MCP elastyczną warstwą integracji.
- Poznać, jak przepływa informacja w ekosystemie MCP.
- Zdobyć praktyczne umiejętności dzięki przykładom kodu w .NET, Java, Python i JavaScript.

## Architektura MCP: Szczegółowe spojrzenie

Ekosystem MCP opiera się na modelu klient-serwer. Ta modułowa struktura umożliwia aplikacjom AI efektywną interakcję z narzędziami, bazami danych, API oraz zasobami kontekstowymi. Przyjrzyjmy się bliżej podstawowym komponentom tej architektury.

W swojej istocie MCP opiera się na architekturze klient-serwer, gdzie aplikacja hostująca może łączyć się z wieloma serwerami:

```mermaid
flowchart LR
    subgraph "Twój Komputer"
        Host["Host z MCP (Visual Studio, VS Code, IDE, narzędzia)"]
        S1["Serwer MCP A"]
        S2["Serwer MCP B"]
        S3["Serwer MCP C"]
        Host <-->|"Protokół MCP"| S1
        Host <-->|"Protokół MCP"| S2
        Host <-->|"Protokół MCP"| S3
        S1 <--> D1[("Lokalne\Źródło Danych A")]
        S2 <--> D2[("Lokalne\Źródło Danych B")]
    end
    subgraph "Internet"
        S3 <-->|"API sieciowe"| D3[("Zdalne\Usługi")]
    end
```
- **Hosty MCP**: Programy takie jak VSCode, Claude Desktop, IDE lub narzędzia AI chcące uzyskać dostęp do danych przez MCP
- **Klienci MCP**: Klienci protokołu utrzymujący połączenia 1:1 z serwerami
- **Serwery MCP**: Lekkie programy udostępniające określone możliwości przez ustandaryzowany Model Context Protocol
- **Lokalne źródła danych**: Pliki, bazy danych i usługi na Twoim komputerze, do których serwery MCP mogą mieć bezpieczny dostęp
- **Usługi zdalne**: Zewnętrzne systemy dostępne przez internet, do których serwery MCP mogą łączyć się przez API.

Protokół MCP to ewoluujący standard wykorzystujący wersjonowanie datą (format RRRR-MM-DD). Aktualna wersja protokołu to **2025-11-25**. Najnowsze aktualizacje specyfikacji znajdziesz na stronie [specyfikacji protokołu](https://modelcontextprotocol.io/specification/2025-11-25/).

### 1. Hosty

W Model Context Protocol (MCP) **Hosty** to aplikacje AI, które stanowią główny interfejs do interakcji użytkowników z protokołem. Hosty koordynują i zarządzają połączeniami do wielu serwerów MCP, tworząc dedykowanych klientów MCP dla każdego połączenia z serwerem. Przykłady Hostów:

- **Aplikacje AI**: Claude Desktop, Visual Studio Code, Claude Code
- **Środowiska programistyczne**: IDE i edytory kodu z integracją MCP  
- **Aplikacje niestandardowe**: Specjalnie tworzone agenty AI i narzędzia

**Hosty** są aplikacjami, które koordynują interakcje z modelami AI. Ich zadania to:

- **Orkiestracja modeli AI**: Uruchamianie lub interakcja z LLM w celu generowania odpowiedzi i koordynowania procesów AI
- **Zarządzanie połączeniami klientów**: Tworzenie i utrzymanie jednego klienta MCP na każde połączenie z serwerem MCP
- **Kontrola interfejsu użytkownika**: Zarządzanie przebiegiem rozmowy, interakcjami użytkownika i prezentacją odpowiedzi  
- **Wymuszanie bezpieczeństwa**: Kontrola uprawnień, ograniczeń bezpieczeństwa oraz uwierzytelniania
- **Obsługa zgody użytkownika**: Zarządzanie zatwierdzeniem użytkownika na udostępnianie danych i wykonanie narzędzi


### 2. Klienci

**Klienci** to kluczowe komponenty utrzymujące dedykowane połączenia jeden na jeden pomiędzy Hostami i serwerami MCP. Każdy klient MCP jest tworzony przez Host dla konkretnego serwera MCP, co zapewnia uporządkowaną i bezpieczną komunikację. Wielu klientów pozwala Hostowi łączyć się z wieloma serwerami jednocześnie.

**Klienci** to łączniki w aplikacji hosta. Ich zadania to:

- **Komunikacja protokołem**: Wysyłanie zapytań JSON-RPC 2.0 do serwerów z zachętami i instrukcjami
- **Negocjacja możliwości**: Negocjowanie obsługiwanych funkcji i wersji protokołu z serwerami podczas inicjalizacji
- **Wykonywanie narzędzi**: Zarządzanie żądaniami wykonywania narzędzi od modeli i przetwarzanie odpowiedzi
- **Aktualizacje w czasie rzeczywistym**: Obsługa powiadomień i aktualizacji z serwerów
- **Przetwarzanie odpowiedzi**: Przetwarzanie i formatowanie odpowiedzi serwera do wyświetlenia użytkownikom

### 3. Serwery

**Serwery** to programy dostarczające kontekst, narzędzia i możliwości dla klientów MCP. Mogą działać lokalnie (na tym samym komputerze co Host) lub zdalnie (na zewnętrznych platformach). Odpowiadają za obsługę żądań klientów i dostarczanie strukturalnych odpowiedzi. Serwery udostępniają specyficzną funkcjonalność przez ustandaryzowany Model Context Protocol.

**Serwery** to usługi oferujące kontekst i możliwości. Ich zadania to:

- **Rejestracja funkcji**: Rejestracja i udostępnianie dostępnych prymitywów (zasobów, promptów, narzędzi) klientom
- **Przetwarzanie żądań**: Odbieranie i wykonywanie wywołań narzędzi, żądań zasobów i promptów od klientów
- **Dostarczanie kontekstu**: Zapewnianie informacji kontekstowych i danych wzbogacających odpowiedzi modeli
- **Zarządzanie stanem**: Utrzymywanie stanu sesji i obsługa interakcji wymagających pamięci stanu
- **Powiadomienia w czasie rzeczywistym**: Wysyłanie powiadomień o zmianach i aktualizacjach możliwości do podłączonych klientów

Serwery mogą być tworzone przez każdego, aby rozszerzyć funkcjonalność modeli o wyspecjalizowane możliwości, i wspierają scenariusze wdrożeń lokalnych i zdalnych.

### 4. Prymitywy serwera

Serwery w Model Context Protocol (MCP) dostarczają trzy podstawowe **prymitywy**, które definiują fundamentalne elementy bogatych interakcji między klientami, hostami i modelami językowymi. Prymitywy określają rodzaje dostępnych informacji kontekstowych i działań.

Serwery MCP mogą udostępniać dowolną kombinację następujących trzech podstawowych prymitywów:

#### Zasoby

**Zasoby** to źródła danych dostarczające informacje kontekstowe aplikacjom AI. Reprezentują statyczne lub dynamiczne treści, które mogą wzbogacić rozumienie i podejmowanie decyzji przez modele:

- **Dane kontekstowe**: Strukturalne informacje i kontekst dla modeli AI
- **Bazy wiedzy**: Repozytoria dokumentów, artykuły, podręczniki i publikacje naukowe
- **Lokalne źródła danych**: Pliki, bazy danych i informacje systemowe lokalnego komputera  
- **Dane zewnętrzne**: Odpowiedzi API, usługi sieciowe i dane systemów zdalnych
- **Treści dynamiczne**: Dane aktualizowane na bieżąco w oparciu o warunki zewnętrzne

Zasoby są identyfikowane URI i wspierają odkrywanie przez metody `resources/list` oraz pobieranie przez `resources/read`:

```text
file://documents/project-spec.md
database://production/users/schema
api://weather/current
```

#### Prompty

**Prompty** to wielokrotnego użytku szablony pomagające strukturyzować interakcje z modelami językowymi. Zapewniają ustandaryzowane schematy interakcji i zdefiniowane szablony procesów:

- **Interakcje oparte na szablonach**: Wstępnie ustrukturyzowane wiadomości i początki rozmów
- **Szablony workflow**: Ustandaryzowane sekwencje dla typowych zadań i interakcji
- **Przykłady few-shot**: Szablony instrukcyjne oparte na przykładach
- **Prompty systemowe**: Bazowe prompty definiujące zachowanie i kontekst modelu
- **Szablony dynamiczne**: Parametryzowane prompty adaptujące się do konkretnych kontekstów

Prompty wspierają podstawianie zmiennych i mogą być odkrywane przez `prompts/list` oraz pobierane przez `prompts/get`:

```markdown
Generate a {{task_type}} for {{product}} targeting {{audience}} with the following requirements: {{requirements}}
```

#### Narzędzia

**Narzędzia** to wykonywalne funkcje wywoływane przez modele AI w celu wykonania konkretnych działań. Reprezentują „czasowniki” ekosystemu MCP, umożliwiając modelom interakcję z zewnętrznymi systemami:

- **Funkcje wykonywalne**: Dyskretne operacje wywoływane przez modele z określonymi parametrami
- **Integracja systemów zewnętrznych**: Wywołania API, zapytania do baz danych, operacje plikowe, obliczenia
- **Unikalna tożsamość**: Każde narzędzie ma unikatową nazwę, opis i schemat parametrów
- **Strukturalne I/O**: Narzędzia przyjmują zwalidowane parametry i zwracają ustrukturyzowane, typowane odpowiedzi
- **Możliwości działania**: Pozwalają modelom wykonywać rzeczywiste akcje i pobierać dane na żywo

Narzędzia definiuje się za pomocą JSON Schema dla walidacji parametrów, odkrywa przez `tools/list` i wywołuje przez `tools/call`. Narzędzia mogą zawierać także **ikony** jako dodatkowe metadane dla lepszej prezentacji w UI.

**Adnotacje narzędzi**: Narzędzia wspierają adnotacje zachowania (np. `readOnlyHint`, `destructiveHint`), które opisują, czy narzędzie jest tylko do odczytu lub destrukcyjne, pomagając klientom podejmować świadome decyzje o wykonaniu narzędzia.

Przykład definicji narzędzia:

```typescript
server.tool(
  "search_products", 
  {
    query: z.string().describe("Search query for products"),
    category: z.string().optional().describe("Product category filter"),
    max_results: z.number().default(10).describe("Maximum results to return")
  }, 
  async (params) => {
    // Wykonaj wyszukiwanie i zwróć wyniki w ustrukturyzowanej formie
    return await productService.search(params);
  }
);
```

## Prymitywy klienta

W Model Context Protocol (MCP) **klienci** mogą udostępniać prymitywy, które pozwalają serwerom żądać dodatkowych możliwości od aplikacji hostującej. Te prymitywy po stronie klienta umożliwiają tworzenie bogatszych, bardziej interaktywnych implementacji serwerów, które mogą mieć dostęp do możliwości modeli AI i interakcji użytkowników.

### Sampling (Próbkowanie)

**Sampling** pozwala serwerom żądać uzupełnień językowych modelu AI z aplikacji klienta. Ten prymityw umożliwia serwerom dostęp do zdolności LLM bez konieczności osadzania własnych zależności od modeli:

- **Niezależny dostęp do modelu**: Serwery mogą żądać uzupełnień bez integracji SDK LLM lub zarządzania dostępem do modeli
- **AI inicjowane przez serwer**: Umożliwia serwerom autonomiczne generowanie treści używając modelu AI klienta
- **Rekurencyjne interakcje z LLM**: Wspiera złożone scenariusze, w których serwery potrzebują pomocy AI do przetwarzania
- **Dynamiczne generowanie treści**: Pozwala serwerom tworzyć kontekstowe odpowiedzi używając modelu hosta
- **Wsparcie wywoływania narzędzi**: Serwery mogą dołączać parametry `tools` i `toolChoice`, aby model klienta mógł wywoływać narzędzia podczas próbkowania

Próbkowanie inicjowane jest przez metodę `sampling/complete`, gdzie serwery wysyłają żądania uzupełnień do klientów.

### Roots (Korzenie)

**Roots** zapewniają ustandaryzowany sposób, w jaki klienci eksponują granice systemu plików serwerom, pomagając serwerom zrozumieć, do których katalogów i plików mają dostęp:

- **Granice systemu plików**: Definiują obszary, w których serwery mogą operować w systemie plików
- **Kontrola dostępu**: Pomagają serwerom zrozumieć, do jakich katalogów i plików mają pozwolenie na dostęp
- **Aktualizacje dynamiczne**: Klienci mogą powiadamiać serwery o zmianach listy korzeni
- **Identyfikacja na bazie URI**: Roots używają URI `file://` do identyfikacji dostępnych katalogów i plików

Roots odkrywane są przez metodę `roots/list`, zaś klienci wysyłają powiadomienia `notifications/roots/list_changed` przy zmianach.

### Elicitation (Pozyskiwanie informacji)

**Elicitation** umożliwia serwerom żądanie dodatkowych informacji lub potwierdzeń od użytkowników przez interfejs klienta:

- **Prośby o dane od użytkownika**: Serwery mogą pytać o dodatkowe informacje potrzebne do wykonania narzędzi
- **Okna potwierdzeń**: Żądanie zgody użytkownika na operacje wrażliwe lub istotne
- **Interaktywne procesy**: Umożliwienie serwerom tworzenia krok po kroku interakcji z użytkownikiem
- **Dynamiczne pobieranie parametrów**: Zbieranie brakujących lub opcjonalnych parametrów podczas wykonania narzędzi

Żądania elicitation wykonywane są metodą `elicitation/request` do zbierania informacji od użytkownika przez interfejs klienta.

**Elicitation w trybie URL**: Serwery mogą także żądać interakcji użytkownika opartych na URL, kierując użytkowników na zewnętrzne strony internetowe w celu uwierzytelnienia, potwierdzenia lub wprowadzenia danych.

### Logging (Rejestrowanie)

**Logging** pozwala serwerom wysyłać ustrukturyzowane komunikaty do klientów na potrzeby debugowania, monitoringu i widoczności operacyjnej:

- **Wsparcie debugowania**: Umożliwienie serwerom dostarczania szczegółowych logów wykonania do rozwiązywania problemów
- **Monitoring operacyjny**: Wysyłanie statusów i metryk wydajności do klientów
- **Raportowanie błędów**: Dostarczanie szczegółowego kontekstu błędów i informacji diagnostycznych
- **Ścieżki audytu**: Tworzenie kompleksowych logów operacji i decyzji serwera

Komunikaty logujące są wysyłane do klientów, aby zapewnić przejrzystość działań serwera i ułatwić debugowanie.

## Przepływ informacji w MCP

Model Context Protocol (MCP) definiuje ustrukturyzowany przepływ informacji pomiędzy hostami, klientami, serwerami i modelami. Zrozumienie tego przepływu pomaga wyjaśnić, jak przetwarzane są żądania użytkowników i jak zewnętrzne narzędzia oraz dane są integrowane z odpowiedziami modelu.
- **Host inicjuje połączenie**  
  Aplikacja hosta (taka jak IDE lub interfejs czatu) nawiązuje połączenie z serwerem MCP, zazwyczaj przez STDIO, WebSocket lub inny obsługiwany transport.

- **Negocjacja możliwości**  
  Klient (osadzony w hoście) i serwer wymieniają informacje o obsługiwanych funkcjach, narzędziach, zasobach i wersjach protokołu. Zapewnia to, że obie strony rozumieją, jakie możliwości są dostępne dla sesji.

- **Żądanie użytkownika**  
  Użytkownik wchodzi w interakcję z hostem (np. wpisuje polecenie lub zapytanie). Host zbiera te dane i przekazuje je klientowi do przetworzenia.

- **Użycie zasobów lub narzędzi**  
  - Klient może żądać dodatkowego kontekstu lub zasobów od serwera (takich jak pliki, wpisy bazy danych lub artykuły z bazy wiedzy), aby wzbogacić zrozumienie modelu.  
  - Jeśli model uzna, że potrzebne jest narzędzie (np. do pobrania danych, wykonania obliczenia lub wywołania API), klient wysyła do serwera żądanie wywołania narzędzia, określając nazwę narzędzia i parametry.

- **Wykonanie przez serwer**  
  Serwer otrzymuje żądanie zasobu lub narzędzia, wykonuje niezbędne operacje (np. wywołuje funkcję, wykonuje zapytanie do bazy danych lub pobiera plik) i zwraca wyniki klientowi w ustrukturyzowanym formacie.

- **Generowanie odpowiedzi**  
  Klient integruje odpowiedzi serwera (dane z zasobów, wyniki narzędzi itp.) z bieżącą interakcją modelu. Model używa tych informacji do wygenerowania kompleksowej i kontekstowo odpowiedniej odpowiedzi.

- **Prezentacja wyniku**  
  Host otrzymuje końcowy wynik od klienta i prezentuje go użytkownikowi, często łącząc wygenerowany tekst modelu z wynikami wywołań narzędzi lub wyszukiwania zasobów.

Ten przepływ umożliwia MCP wspieranie zaawansowanych, interaktywnych i świadomych kontekstu aplikacji AI poprzez bezproblemowe łączenie modeli z zewnętrznymi narzędziami i źródłami danych.

## Architektura protokołu i warstwy

MCP składa się z dwóch odrębnych warstw architektonicznych, które współpracują, aby zapewnić kompletny framework komunikacyjny:

### Warstwa danych

**Warstwa danych** implementuje podstawowy protokół MCP, korzystając z **JSON-RPC 2.0** jako fundamentu. Warstwa ta definiuje strukturę wiadomości, semantykę i wzorce interakcji:

#### Kluczowe komponenty:

- **Protokół JSON-RPC 2.0**: Cała komunikacja używa ustandaryzowanego formatu wiadomości JSON-RPC 2.0 do wywołań metod, odpowiedzi i powiadomień  
- **Zarządzanie cyklem życia**: Obsługuje inicjalizację połączenia, negocjację możliwości i zakończenie sesji między klientami i serwerami  
- **Prymitywy serwera**: Umożliwia serwerom dostarczanie podstawowej funkcjonalności poprzez narzędzia, zasoby i propozycje  
- **Prymitwy klienta**: Umożliwia serwerom żądanie próbkowania z LLM, pozyskiwania danych od użytkownika oraz wysyłania komunikatów logów  
- **Powiadomienia w czasie rzeczywistym**: Wspiera asynchroniczne powiadomienia dla dynamicznych aktualizacji bez potrzeby pollingowania

#### Kluczowe cechy:

- **Negocjacja wersji protokołu**: Używa wersjonowania opartego na dacie (RRRR-MM-DD) dla zapewnienia kompatybilności  
- **Odkrywanie możliwości**: Klienci i serwery wymieniają się informacjami o obsługiwanych funkcjach podczas inicjalizacji  
- **Sesje stanowe**: Utrzymuje stan połączenia podczas wielu interakcji dla ciągłości kontekstu

### Warstwa transportowa

**Warstwa transportowa** zarządza kanałami komunikacji, formatowaniem wiadomości i uwierzytelnianiem między uczestnikami MCP:

#### Obsługiwane mechanizmy transportowe:

1. **Transport STDIO**:  
   - Używa standardowych strumieni wejścia/wyjścia do bezpośredniej komunikacji procesów  
   - Optymalny dla lokalnych procesów na tym samym urządzeniu bez narzutu sieciowego  
   - Powszechnie stosowany w lokalnych implementacjach serwerów MCP

2. **Transport HTTP strumieniowalny**:  
   - Używa HTTP POST do wiadomości klient-serwer  
   - Opcjonalne Server-Sent Events (SSE) do strumieniowania serwer-klient  
   - Umożliwia komunikację ze zdalnym serwerem w sieciach  
   - Wspiera standardowe metody uwierzytelniania HTTP (tokeny bearer, klucze API, własne nagłówki)  
   - MCP rekomenduje OAuth dla bezpiecznego uwierzytelniania opartego na tokenach

#### Abstrakcja transportu:

Warstwa transportowa abstrahuje szczegóły komunikacji od warstwy danych, umożliwiając stosowanie tego samego formatu wiadomości JSON-RPC 2.0 we wszystkich mechanizmach transportowych. Ta abstrakcja pozwala aplikacjom na płynne przełączanie się między lokalnymi a zdalnymi serwerami.

### Aspekty bezpieczeństwa

Implementacje MCP muszą przestrzegać kilku krytycznych zasad bezpieczeństwa, by zapewnić bezpieczne, godne zaufania interakcje we wszystkich operacjach protokołu:

- **Zgoda i kontrola użytkownika**: Użytkownicy muszą wyrazić wyraźną zgodę przed uzyskaniem dostępu do danych lub wykonaniem operacji. Powinni mieć jasną kontrolę nad tym, jakie dane są udostępniane i jakie działania są autoryzowane, wspierane przez intuicyjne interfejsy umożliwiające przegląd i zatwierdzanie działań.

- **Prywatność danych**: Dane użytkowników powinny być udostępniane wyłącznie za wyraźną zgodą i chronione odpowiednimi mechanizmami dostępu. Implementacje MCP muszą zabezpieczać przed nieautoryzowanym przesyłaniem danych i zapewniać utrzymanie prywatności podczas wszystkich interakcji.

- **Bezpieczeństwo narzędzi**: Przed wywołaniem dowolnego narzędzia wymagana jest wyraźna zgoda użytkownika. Użytkownicy powinni dokładnie rozumieć funkcjonalność każdego narzędzia, a system musi wymuszać silne granice bezpieczeństwa, aby zapobiec niezamierzonemu lub niebezpiecznemu wykonaniu narzędzi.

Przestrzegając tych zasad bezpieczeństwa, MCP zapewnia zaufanie użytkowników, ochronę prywatności i bezpieczeństwo we wszystkich interakcjach protokołu, umożliwiając jednocześnie potężne integracje AI.

## Przykłady kodu: Kluczowe komponenty

Poniżej znajdują się przykłady kodu w kilku popularnych językach programowania, które pokazują jak zaimplementować kluczowe komponenty serwera MCP i narzędzia.

### Przykład .NET: Tworzenie prostego serwera MCP z narzędziami

Oto praktyczny przykład kodu .NET demonstrujący implementację prostego serwera MCP z niestandardowymi narzędziami. Ten przykład pokazuje, jak definiować i rejestrować narzędzia, obsługiwać żądania oraz łączyć serwer z protokołem Model Context Protocol.

```csharp
using System;
using System.Threading.Tasks;
using ModelContextProtocol.Server;
using ModelContextProtocol.Server.Transport;
using ModelContextProtocol.Server.Tools;

public class WeatherServer
{
    public static async Task Main(string[] args)
    {
        // Create an MCP server
        var server = new McpServer(
            name: "Weather MCP Server",
            version: "1.0.0"
        );
        
        // Register our custom weather tool
        server.AddTool<string, WeatherData>("weatherTool", 
            description: "Gets current weather for a location",
            execute: async (location) => {
                // Call weather API (simplified)
                var weatherData = await GetWeatherDataAsync(location);
                return weatherData;
            });
        
        // Connect the server using stdio transport
        var transport = new StdioServerTransport();
        await server.ConnectAsync(transport);
        
        Console.WriteLine("Weather MCP Server started");
        
        // Keep the server running until process is terminated
        await Task.Delay(-1);
    }
    
    private static async Task<WeatherData> GetWeatherDataAsync(string location)
    {
        // This would normally call a weather API
        // Simplified for demonstration
        await Task.Delay(100); // Simulate API call
        return new WeatherData { 
            Temperature = 72.5,
            Conditions = "Sunny",
            Location = location
        };
    }
}

public class WeatherData
{
    public double Temperature { get; set; }
    public string Conditions { get; set; }
    public string Location { get; set; }
}
```

### Przykład Java: Komponenty serwera MCP

Ten przykład demonstruje ten sam serwer MCP i rejestrację narzędzi co w przykładzie .NET powyżej, ale zaimplementowany w Javie.

```java
import io.modelcontextprotocol.server.McpServer;
import io.modelcontextprotocol.server.McpToolDefinition;
import io.modelcontextprotocol.server.transport.StdioServerTransport;
import io.modelcontextprotocol.server.tool.ToolExecutionContext;
import io.modelcontextprotocol.server.tool.ToolResponse;

public class WeatherMcpServer {
    public static void main(String[] args) throws Exception {
        // Utwórz serwer MCP
        McpServer server = McpServer.builder()
            .name("Weather MCP Server")
            .version("1.0.0")
            .build();
            
        // Zarejestruj narzędzie pogodowe
        server.registerTool(McpToolDefinition.builder("weatherTool")
            .description("Gets current weather for a location")
            .parameter("location", String.class)
            .execute((ToolExecutionContext ctx) -> {
                String location = ctx.getParameter("location", String.class);
                
                // Pobierz dane pogodowe (uproszczone)
                WeatherData data = getWeatherData(location);
                
                // Zwróć sformatowaną odpowiedź
                return ToolResponse.content(
                    String.format("Temperature: %.1f°F, Conditions: %s, Location: %s", 
                    data.getTemperature(), 
                    data.getConditions(), 
                    data.getLocation())
                );
            })
            .build());
        
        // Połącz serwer używając transportu stdio
        try (StdioServerTransport transport = new StdioServerTransport()) {
            server.connect(transport);
            System.out.println("Weather MCP Server started");
            // Utrzymuj serwer aktywny aż do zakończenia procesu
            Thread.currentThread().join();
        }
    }
    
    private static WeatherData getWeatherData(String location) {
        // Implementacja wywołałaby API pogodowe
        // Uproszczone dla celów przykładu
        return new WeatherData(72.5, "Sunny", location);
    }
}

class WeatherData {
    private double temperature;
    private String conditions;
    private String location;
    
    public WeatherData(double temperature, String conditions, String location) {
        this.temperature = temperature;
        this.conditions = conditions;
        this.location = location;
    }
    
    public double getTemperature() {
        return temperature;
    }
    
    public String getConditions() {
        return conditions;
    }
    
    public String getLocation() {
        return location;
    }
}
```

### Przykład Python: Budowa serwera MCP

Ten przykład używa fastmcp, więc upewnij się, że najpierw go zainstalujesz:

```python
pip install fastmcp
```
Przykład kodu:

```python
#!/usr/bin/env python3
import asyncio
from fastmcp import FastMCP
from fastmcp.transports.stdio import serve_stdio

# Utwórz serwer FastMCP
mcp = FastMCP(
    name="Weather MCP Server",
    version="1.0.0"
)

@mcp.tool()
def get_weather(location: str) -> dict:
    """Gets current weather for a location."""
    return {
        "temperature": 72.5,
        "conditions": "Sunny",
        "location": location
    }

# Alternatywne podejście używając klasy
class WeatherTools:
    @mcp.tool()
    def forecast(self, location: str, days: int = 1) -> dict:
        """Gets weather forecast for a location for the specified number of days."""
        return {
            "location": location,
            "forecast": [
                {"day": i+1, "temperature": 70 + i, "conditions": "Partly Cloudy"}
                for i in range(days)
            ]
        }

# Zarejestruj narzędzia klasy
weather_tools = WeatherTools()

# Uruchom serwer
if __name__ == "__main__":
    asyncio.run(serve_stdio(mcp))
```

### Przykład JavaScript: Tworzenie serwera MCP

Ten przykład pokazuje tworzenie serwera MCP w JavaScript oraz jak zarejestrować dwa narzędzia związane z pogodą.

```javascript
// Używanie oficjalnego SDK Model Context Protocol
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod"; // Do walidacji parametrów

// Utwórz serwer MCP
const server = new McpServer({
  name: "Weather MCP Server",
  version: "1.0.0"
});

// Zdefiniuj narzędzie pogodowe
server.tool(
  "weatherTool",
  {
    location: z.string().describe("The location to get weather for")
  },
  async ({ location }) => {
    // To normalnie wywoływałoby API pogodowe
    // Uproszczone na potrzeby demonstracji
    const weatherData = await getWeatherData(location);
    
    return {
      content: [
        { 
          type: "text", 
          text: `Temperature: ${weatherData.temperature}°F, Conditions: ${weatherData.conditions}, Location: ${weatherData.location}` 
        }
      ]
    };
  }
);

// Zdefiniuj narzędzie prognozy
server.tool(
  "forecastTool",
  {
    location: z.string(),
    days: z.number().default(3).describe("Number of days for forecast")
  },
  async ({ location, days }) => {
    // To normalnie wywoływałoby API pogodowe
    // Uproszczone na potrzeby demonstracji
    const forecast = await getForecastData(location, days);
    
    return {
      content: [
        { 
          type: "text", 
          text: `${days}-day forecast for ${location}: ${JSON.stringify(forecast)}` 
        }
      ]
    };
  }
);

// Funkcje pomocnicze
async function getWeatherData(location) {
  // Symuluj wywołanie API
  return {
    temperature: 72.5,
    conditions: "Sunny",
    location: location
  };
}

async function getForecastData(location, days) {
  // Symuluj wywołanie API
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    temperature: 70 + Math.floor(Math.random() * 10),
    conditions: i % 2 === 0 ? "Sunny" : "Partly Cloudy"
  }));
}

// Połącz serwer używając transportu stdio
const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);

console.log("Weather MCP Server started");
```

Ten przykład w JavaScript demonstruje jak utworzyć serwer MCP korzystając z Model Context Protocol SDK. Pokazuje, jak zarejestrować dwa narzędzia o nazwach `weatherTool` i `forecastTool` i udostępnić je klientom MCP przez transport `StdioServerTransport`.

## Bezpieczeństwo i autoryzacja

MCP zawiera kilka wbudowanych koncepcji i mechanizmów do zarządzania bezpieczeństwem i autoryzacją w całym protokole:

1. **Kontrola uprawnień do narzędzi**:  
  Klienci mogą określić, których narzędzi model może używać podczas sesji. Zapewnia to, że dostęp mają tylko wyraźnie autoryzowane narzędzia, co zmniejsza ryzyko niezamierzonych lub niebezpiecznych operacji. Uprawnienia można konfigurować dynamicznie w zależności od preferencji użytkownika, polityk organizacyjnych lub kontekstu interakcji.

2. **Uwierzytelnianie**:  
  Serwery mogą wymagać uwierzytelniania przed udzieleniem dostępu do narzędzi, zasobów lub operacji wrażliwych. Może to obejmować klucze API, tokeny OAuth lub inne schematy uwierzytelniania. Poprawne uwierzytelnianie zapewnia, że tylko zaufani klienci i użytkownicy mogą wywoływać funkcje po stronie serwera.

3. **Walidacja**:  
  Walidacja parametrów jest wymuszona dla wszystkich wywołań narzędzi. Każde narzędzie definiuje oczekiwane typy, formaty i ograniczenia parametrów, a serwer weryfikuje nadchodzące żądania zgodnie z tymi definicjami. Zapobiega to przekazywaniu niepoprawnych lub złośliwych danych do implementacji narzędzi i pomaga utrzymać integralność operacji.

4. **Ograniczenie liczby wywołań (Rate limiting)**:  
  Aby zapobiec nadużyciom i zapewnić uczciwe korzystanie z zasobów serwera, serwery MCP mogą implementować ograniczanie liczby wywołań narzędzi i dostępu do zasobów. Limity mogą być stosowane na użytkownika, sesję lub globalnie, chroniąc przed atakami typu denial-of-service lub nadmiernym zużyciem zasobów.

Łącząc te mechanizmy, MCP zapewnia bezpieczną podstawę do integracji modeli językowych z zewnętrznymi narzędziami i źródłami danych, dając użytkownikom i deweloperom precyzyjną kontrolę nad dostępem i wykorzystaniem.

## Wiadomości protokołu i przepływ komunikacji

Komunikacja MCP korzysta z ustrukturyzowanych wiadomości **JSON-RPC 2.0**, aby zapewnić jasne i niezawodne interakcje między hostami, klientami i serwerami. Protokół definiuje konkretne wzorce wiadomości dla różnych typów operacji:

### Podstawowe typy wiadomości:

#### **Wiadomości inicjalizacyjne**
- Żądanie `initialize`: Nawiązuje połączenie i negocjuje wersję protokołu oraz możliwości  
- Odpowiedź `initialize`: Potwierdza obsługiwane funkcje i informacje o serwerze  
- `notifications/initialized`: Sygnał, że inicjalizacja się zakończyła i sesja jest gotowa

#### **Wiadomości odkrywające**
- Żądanie `tools/list`: Odkrywa dostępne narzędzia na serwerze  
- Żądanie `resources/list`: Wypisuje dostępne zasoby (źródła danych)  
- Żądanie `prompts/list`: Pobiera dostępne szablony promptów

#### **Wiadomości wykonawcze**  
- Żądanie `tools/call`: Uruchamia konkretne narzędzie z podanymi parametrami  
- Żądanie `resources/read`: Pobiera zawartość konkretnego zasobu  
- Żądanie `prompts/get`: Pobiera szablon promptu z opcjonalnymi parametrami

#### **Wiadomości po stronie klienta**
- Żądanie `sampling/complete`: Serwer żąda od klienta uzupełnienia LLM  
- `elicitation/request`: Serwer żąda danych od użytkownika przez interfejs klienta  
- Wiadomości logowania: Serwer wysyła ustrukturyzowane logi do klienta

#### **Wiadomości powiadomień**
- `notifications/tools/list_changed`: Serwer informuje klienta o zmianach w narzędziach  
- `notifications/resources/list_changed`: Serwer informuje klienta o zmianach w zasobach  
- `notifications/prompts/list_changed`: Serwer informuje klienta o zmianach w promptach

### Struktura wiadomości:

Wszystkie wiadomości MCP mają format JSON-RPC 2.0 z:  
- **Wiadomości żądania**: zawierają `id`, `method` i opcjonalnie `params`  
- **Wiadomości odpowiedzi**: zawierają `id` oraz `result` lub `error`  
- **Wiadomości powiadomień**: zawierają `method` i opcjonalnie `params` (brak `id` oraz odpowiedzi)

Taka struktura komunikacji gwarantuje niezawodne, śledzalne i rozszerzalne interakcje obsługujące zaawansowane scenariusze jak aktualizacje w czasie rzeczywistym, łączenie narzędzi i solidne obsługiwanie błędów.

### Zadania (eksperymentalne)

**Zadania** to eksperymentalna funkcja dostarczająca trwałe opakowania wykonania, umożliwiające odroczone pobieranie rezultatów i śledzenie statusu żądań MCP:

- **Operacje długotrwałe**: Śledzenie kosztownych obliczeń, automatyzacji przepływów pracy i przetwarzania wsadowego  
- **Odroczone wyniki**: Polling statusu zadania i pobieranie rezultatów po zakończeniu operacji  
- **Śledzenie statusu**: Monitorowanie postępu zadania przez zdefiniowane stany cyklu życia  
- **Operacje wieloetapowe**: Wsparcie złożonych przepływów obejmujących wiele interakcji

Zadania opakowują standardowe żądania MCP, umożliwiając asynchroniczne wzorce wykonania dla operacji, które nie mogą się zakończyć natychmiast.

## Najważniejsze wnioski

- **Architektura**: MCP używa architektury klient-serwer, gdzie hosty zarządzają wieloma połączeniami klientów do serwerów  
- **Uczestnicy**: Ekosystem obejmuje hosty (aplikacje AI), klientów (konektory protokołu) i serwery (dostawcy możliwości)  
- **Mechanizmy transportu**: Komunikacja wspiera STDIO (lokalny) i strumieniowy HTTP z opcjonalnym SSE (zdalny)  
- **Podstawowe prymitywy**: Serwery udostępniają narzędzia (funkcje wykonalne), zasoby (źródła danych) i prompt-y (szablony)  
- **Prymitwy klienta**: Serwery mogą żądać próbkowania (uzupełnienia LLM z obsługą wywoływania narzędzi), pozyskiwania danych od użytkownika (w tym tryb URL), korzeni (granice systemu plików) i logowania od klientów  
- **Funkcje eksperymentalne**: Zadania zapewniają trwałe opakowania wykonania dla operacji długotrwałych  
- **Podstawa protokołu**: Oparta na JSON-RPC 2.0 z wersjonowaniem opartym na dacie (aktualna: 2025-11-25)  
- **Możliwości w czasie rzeczywistym**: Obsługa powiadomień dla dynamicznych aktualizacji i synchronizacji  
- **Bezpieczeństwo na pierwszym miejscu**: Wyraźna zgoda użytkownika, ochrona prywatności danych i bezpieczny transport to kluczowe wymagania

## Ćwiczenie

Zaprojektuj proste narzędzie MCP, które byłoby przydatne w Twojej dziedzinie. Określ:  
1. Jak nazywałoby się narzędzie  
2. Jakie parametry by przyjmowało  
3. Jakie dane zwracałoby w odpowiedzi  
4. W jaki sposób model mógłby użyć tego narzędzia do rozwiązania problemów użytkownika


---

## Co dalej

Następny rozdział: [Rozdział 2: Bezpieczeństwo](../02-Security/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:  
Niniejszy dokument został przetłumaczony przy użyciu usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mimo że dokłada się wszelkich starań, aby zapewnić dokładność, prosimy mieć na uwadze, że tłumaczenia automatyczne mogą zawierać błędy lub niedokładności. Oryginalny dokument w języku źródłowym powinien być uznawany za dokument wiążący. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia ludzkiego. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z korzystania z tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->