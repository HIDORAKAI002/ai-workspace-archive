# Lesson: Budowanie serwera MCP do wyszukiwania w sieci Web

Rozdział ten demonstruje, jak zbudować rzeczywistego agenta AI, który integruje się z zewnętrznymi API, obsługuje różnorodne typy danych, zarządza błędami oraz orkiestruje wiele narzędzi — wszystko w formacie gotowym do produkcji. Zobaczysz:

- **Integrację z zewnętrznymi API wymagającymi uwierzytelniania**
- **Obsługę różnorodnych typów danych z wielu punktów końcowych**
- **Solidne strategie obsługi błędów i logowania**
- **Orkiestrację wielu narzędzi w jednym serwerze**

Pod koniec uzyskasz praktyczne doświadczenie z wzorcami i najlepszymi praktykami niezbędnymi w zaawansowanych aplikacjach AI i zasilanych LLM.

## Wprowadzenie

W tej lekcji nauczysz się, jak zbudować zaawansowany serwer i klient MCP, które rozszerzają możliwości LLM o dane internetowe w czasie rzeczywistym za pomocą SerpAPI. To kluczowa umiejętność do tworzenia dynamicznych agentów AI, mających dostęp do aktualnych informacji z sieci.

## Cele nauki

Po zakończeniu tej lekcji będziesz potrafił:

- Bezpiecznie integrować zewnętrzne API (takie jak SerpAPI) z serwerem MCP
- Implementować wiele narzędzi do wyszukiwania w sieci, wiadomości, produktów oraz Q&A
- Analizować i formatować dane strukturalne dla konsumpcji przez LLM
- Skutecznie obsługiwać błędy i zarządzać limitami API
- Tworzyć i testować zarówno automatycznych, jak i interaktywnych klientów MCP

## Serwer MCP do wyszukiwania w sieci Web

Ta sekcja wprowadza architekturę oraz funkcje serwera MCP do wyszukiwania w sieci Web. Zobaczysz, jak FastMCP i SerpAPI są używane razem, aby rozszerzyć możliwości LLM o dane internetowe na żywo.

### Przegląd

Ta implementacja zawiera cztery narzędzia prezentujące zdolność MCP do bezpiecznej i efektywnej obsługi różnorodnych zadań opartych na zewnętrznych API:

- **general_search**: do szerokich wyników internetowych
- **news_search**: do najnowszych nagłówków
- **product_search**: do danych e-commerce
- **qna**: do fragmentów pytanie-odpowiedź

### Funkcje
- **Przykłady kodu**: obejmują bloki kodu specyficzne dla języka Python (i łatwo rozszerzalne na inne języki) z użyciem pivotów kodu dla przejrzystości

### Python

```python
# Przykład użycia narzędzia general_search
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def run_search():
    server_params = StdioServerParameters(
        command="python",
        args=["server.py"],
    )
    async with stdio_client(server_params) as (reader, writer):
        async with ClientSession(reader, writer) as session:
            await session.initialize()
            result = await session.call_tool("general_search", arguments={"query": "open source LLMs"})
            print(result)
```

---

Przed uruchomieniem klienta warto zrozumieć, co robi serwer. Plik [`server.py`](../../../../05-AdvancedTopics/web-search-mcp/server.py) implementuje serwer MCP, udostępniając narzędzia do wyszukiwania w sieci, aktualności, produktów oraz Q&A, integrując się z SerpAPI. Obsługuje przychodzące żądania, zarządza wywołaniami API, analizuje odpowiedzi i zwraca do klienta ustrukturyzowane wyniki.

Pełną implementację możesz przejrzeć w [`server.py`](../../../../05-AdvancedTopics/web-search-mcp/server.py).

Oto krótki przykład, jak serwer definiuje i rejestruje narzędzie:

### Serwer Python

```python
# server.py (fragment)
from mcp.server import MCPServer, Tool

async def general_search(query: str):
    # ...implementacja...

server = MCPServer()
server.add_tool(Tool("general_search", general_search))

if __name__ == "__main__":
    server.run()
```

---

- **Integracja z zewnętrznym API**: demonstruje bezpieczne zarządzanie kluczami API i zewnętrznymi wywołaniami
- **Analiza danych strukturalnych**: pokazuje, jak przekształcać odpowiedzi API na format przyjazny dla LLM
- **Obsługa błędów**: solidna obsługa błędów z odpowiednim logowaniem
- **Interaktywny klient**: zawiera zarówno testy automatyczne, jak i tryb interaktywny do testowania
- **Zarządzanie kontekstem**: wykorzystuje MCP Context do logowania i śledzenia żądań

## Wymagania wstępne

Zanim zaczniesz, upewnij się, że Twoje środowisko jest właściwie skonfigurowane, wykonując następujące kroki. To zapewni, że wszystkie zależności zostaną zainstalowane, a klucze API poprawnie skonfigurowane, umożliwiając płynną pracę i testowanie.

- Python w wersji 3.8 lub wyższej
- Klucz API SerpAPI (Zarejestruj się na [SerpAPI](https://serpapi.com/) – dostępny darmowy plan)

## Instalacja

Aby zacząć, wykonaj następujące kroki konfiguracyjne środowiska:

1. Zainstaluj zależności za pomocą uv (zalecane) lub pip:

```bash
# Używanie uv (zalecane)
uv pip install -r requirements.txt

# Używanie pip
pip install -r requirements.txt
```

2. Utwórz plik `.env` w katalogu głównym projektu z Twoim kluczem SerpAPI:

```
SERPAPI_KEY=your_serpapi_key_here
```

## Użytkowanie

Serwer MCP do wyszukiwania w sieci Web jest głównym komponentem, który udostępnia narzędzia do wyszukiwania w sieci, wiadomości, produktów oraz Q&A, integrując się z SerpAPI. Obsługuje przychodzące żądania, zarządza wywołaniami API, analizuje odpowiedzi i zwraca do klienta uporządkowane wyniki.

Pełną implementację możesz przejrzeć w [`server.py`](../../../../05-AdvancedTopics/web-search-mcp/server.py).

### Uruchamianie serwera

Aby uruchomić serwer MCP, użyj następującego polecenia:

```bash
python server.py
```

Serwer będzie działał jako serwer MCP oparty na stdio, do którego klient może się bezpośrednio podłączyć.

### Tryby klienta

Klient (`client.py`) obsługuje dwa tryby interakcji z serwerem MCP:

- **Tryb normalny**: Uruchamia testy automatyczne, które wykorzystują wszystkie narzędzia i weryfikują ich odpowiedzi. Jest to przydatne do szybkiego sprawdzenia, czy serwer i narzędzia działają poprawnie.
- **Tryb interaktywny**: Uruchamia interfejs menu, w którym można ręcznie wybierać narzędzia, wprowadzać własne zapytania i na bieżąco widzieć wyniki. Idealny do eksploracji możliwości serwera i eksperymentowania z różnymi danymi wejściowymi.

Pełną implementację możesz przejrzeć w [`client.py`](../../../../05-AdvancedTopics/web-search-mcp/client.py).

### Uruchamianie klienta

Aby uruchomić testy automatyczne (spowoduje to też automatyczne uruchomienie serwera):

```bash
python client.py
```

Lub uruchom tryb interaktywny:

```bash
python client.py --interactive
```

### Testowanie różnymi metodami

Istnieje kilka sposobów testowania i interakcji z narzędziami udostępnianymi przez serwer, w zależności od potrzeb i przepływu pracy.

#### Pisanie własnych skryptów testowych z MCP Python SDK
Możesz także tworzyć własne skrypty testowe, korzystając z MCP Python SDK:

# [Python](#tab/python-sdk)

```python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def test_custom_query():
    server_params = StdioServerParameters(
        command="python",
        args=["server.py"],
    )
    
    async with stdio_client(server_params) as (reader, writer):
        async with ClientSession(reader, writer) as session:
            await session.initialize()
            # Wywołaj narzędzia z własnymi parametrami
            result = await session.call_tool("general_search", 
                                           arguments={"query": "your custom query"})
            # Przetwórz wynik
```

---

W tym kontekście "skrypt testowy" oznacza własny program w Pythonie, który napiszesz aby działać jako klient serwera MCP. Zamiast formalnego testu jednostkowego, ten skrypt pozwala programowo połączyć się z serwerem, wywołać dowolne jego narzędzie z wybranymi przez Ciebie parametrami i zbadać wyniki. To podejście jest przydatne do:
- Prototypowania i eksperymentowania z wywołaniami narzędzi
- Weryfikacji, jak serwer reaguje na różne dane wejściowe
- Automatyzacji powtarzalnych wywołań narzędzi
- Budowania własnych przepływów pracy lub integracji na bazie serwera MCP

Możesz używać skryptów testowych do szybkiego wypróbowania nowych zapytań, debugowania zachowania narzędzi lub jako punkt wyjścia do bardziej zaawansowanej automatyzacji. Poniżej przykład użycia MCP Python SDK do stworzenia takiego skryptu:

## Opisy narzędzi

Możesz korzystać z następujących narzędzi udostępnionych przez serwer, aby wykonywać różne typy wyszukiwań i zapytań. Każde narzędzie jest opisane poniżej wraz z jego parametrami i przykładowym użyciem.

Ta sekcja dostarcza szczegółów dotyczących każdego dostępnego narzędzia i ich parametrów.

### general_search

Wykonuje ogólne wyszukiwanie w sieci i zwraca sformatowane wyniki.

**Jak wywołać to narzędzie:**

Możesz wywołać `general_search` ze swojego własnego skryptu za pomocą MCP Python SDK lub interaktywnie, używając Inspektora lub trybu interaktywnego klienta. Oto przykład kodu z użyciem SDK:

# [Przykład Python](#tab/python-general-search)

```python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def run_general_search():
    server_params = StdioServerParameters(
        command="python",
        args=["server.py"],
    )
    async with stdio_client(server_params) as (reader, writer):
        async with ClientSession(reader, writer) as session:
            await session.initialize()
            result = await session.call_tool("general_search", arguments={"query": "latest AI trends"})
            print(result)
```

---

Alternatywnie, w trybie interaktywnym wybierz `general_search` z menu i wprowadź zapytanie, gdy zostaniesz o to poproszony.

**Parametry:**
- `query` (string): zapytanie wyszukiwania

**Przykładowe żądanie:**

```json
{
  "query": "latest AI trends"
}
```

### news_search

Wyszukuje najnowsze artykuły informacyjne związane z zapytaniem.

**Jak wywołać to narzędzie:**

Możesz wywołać `news_search` ze swojego własnego skryptu za pomocą MCP Python SDK lub interaktywnie, używając Inspektora lub trybu interaktywnego klienta. Oto przykład kodu z użyciem SDK:

# [Przykład Python](#tab/python-news-search)

```python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def run_news_search():
    server_params = StdioServerParameters(
        command="python",
        args=["server.py"],
    )
    async with stdio_client(server_params) as (reader, writer):
        async with ClientSession(reader, writer) as session:
            await session.initialize()
            result = await session.call_tool("news_search", arguments={"query": "AI policy updates"})
            print(result)
```

---

Alternatywnie, w trybie interaktywnym wybierz `news_search` z menu i wprowadź zapytanie, gdy zostaniesz o to poproszony.

**Parametry:**
- `query` (string): zapytanie wyszukiwania

**Przykładowe żądanie:**

```json
{
  "query": "AI policy updates"
}
```

### product_search

Wyszukuje produkty pasujące do zapytania.

**Jak wywołać to narzędzie:**

Możesz wywołać `product_search` ze swojego własnego skryptu za pomocą MCP Python SDK lub interaktywnie, używając Inspektora lub trybu interaktywnego klienta. Oto przykład kodu z użyciem SDK:

# [Przykład Python](#tab/python-product-search)

```python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def run_product_search():
    server_params = StdioServerParameters(
        command="python",
        args=["server.py"],
    )
    async with stdio_client(server_params) as (reader, writer):
        async with ClientSession(reader, writer) as session:
            await session.initialize()
            result = await session.call_tool("product_search", arguments={"query": "best AI gadgets 2025"})
            print(result)
```

---

Alternatywnie, w trybie interaktywnym wybierz `product_search` z menu i wprowadź zapytanie, gdy zostaniesz o to poproszony.

**Parametry:**
- `query` (string): zapytanie wyszukiwania produktów

**Przykładowe żądanie:**

```json
{
  "query": "best AI gadgets 2025"
}
```

### qna

Uzyskuje bezpośrednie odpowiedzi na pytania z wyszukiwarek.

**Jak wywołać to narzędzie:**

Możesz wywołać `qna` ze swojego własnego skryptu za pomocą MCP Python SDK lub interaktywnie, używając Inspektora lub trybu interaktywnego klienta. Oto przykład kodu z użyciem SDK:

# [Przykład Python](#tab/python-qna)

```python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def run_qna():
    server_params = StdioServerParameters(
        command="python",
        args=["server.py"],
    )
    async with stdio_client(server_params) as (reader, writer):
        async with ClientSession(reader, writer) as session:
            await session.initialize()
            result = await session.call_tool("qna", arguments={"question": "what is artificial intelligence"})
            print(result)
```

---

Alternatywnie, w trybie interaktywnym wybierz `qna` z menu i wpisz swoje pytanie, gdy zostaniesz o to poproszony.

**Parametry:**
- `question` (string): pytanie, na które chcesz uzyskać odpowiedź

**Przykładowe żądanie:**

```json
{
  "question": "what is artificial intelligence"
}
```

## Szczegóły kodu

Ta sekcja zawiera fragmenty kodu oraz odniesienia do implementacji serwera i klienta.

# [Python](#tab/python-code-details)

Zobacz [`server.py`](../../../../05-AdvancedTopics/web-search-mcp/server.py) i [`client.py`](../../../../05-AdvancedTopics/web-search-mcp/client.py) dla pełnych szczegółów implementacji.

```python
# Przykładowy fragment z server.py:
import os
import httpx
# ...istniejący kod...
```

---

## Zaawansowane koncepcje w tej lekcji

Zanim zaczniesz budować, oto kilka ważnych zaawansowanych koncepcji pojawiających się w tym rozdziale. Zrozumienie ich pomoże Ci śledzić materiał, nawet jeśli są dla Ciebie nowe:

- **Orkiestracja wielu narzędzi**: oznacza uruchamianie wielu różnych narzędzi (takich jak wyszukiwanie w sieci, newsy, produkty i Q&A) w ramach pojedynczego serwera MCP. Umożliwia to Twojemu serwerowi obsługę różnych zadań, a nie tylko jednego.
- **Obsługa limitów API**: wiele zewnętrznych API (jak SerpAPI) ogranicza liczbę zapytań w określonym czasie. Dobry kod sprawdza te limity i zarządza nimi łagodnie, aby aplikacja nie uległa awarii, gdy limit zostanie osiągnięty.
- **Analiza danych strukturalnych**: odpowiedzi API często są skomplikowane i zagnieżdżone. Ta koncepcja dotyczy przekształcania tych odpowiedzi na czyste, łatwe do użycia formaty przyjazne dla LLM lub innych programów.
- **Odzyskiwanie po błędach**: czasami coś idzie nie tak — na przykład awaria sieci lub API nie zwraca oczekiwanych danych. Odzyskiwanie po błędach oznacza, że Twój kod może obsłużyć te problemy i wciąż dostarczyć przydatną informację zwrotną zamiast się zawiesić.
- **Walidacja parametrów**: chodzi o sprawdzanie, czy wszystkie dane wejściowe do narzędzi są poprawne i bezpieczne do użycia. Obejmuje ustawianie wartości domyślnych i upewnianie się, że typy są właściwe, co pomaga zapobiegać błędom i nieporozumieniom.

Ta sekcja pomoże Ci diagnozować i rozwiązywać typowe problemy, które możesz napotkać podczas pracy z serwerem MCP do wyszukiwania w sieci Web. Jeśli natrafisz na błędy lub nieoczekiwane zachowanie, ta część zawiera rozwiązania najczęstszych problemów. Przejrzyj te wskazówki przed proszeniem o dalszą pomoc — często szybko rozwiązują kłopoty.

## Rozwiązywanie problemów

Podczas pracy z serwerem MCP do wyszukiwania w sieci Web możesz czasem napotkać problemy — to normalne podczas pracy z zewnętrznymi API i nowymi narzędziami. Ta sekcja podaje praktyczne rozwiązania najczęstszych problemów, abyś mógł szybko wrócić do pracy. Jeśli napotkasz błąd, zacznij tutaj: poniższe wskazówki dotyczą problemów, z którymi najczęściej spotykają się użytkownicy i często potrafią rozwiązać Twój problem bez dodatkowej pomocy.

### Najczęstsze problemy

Poniżej znajdują się jedne z najczęstszych problemów wraz z jasnymi wyjaśnieniami i krokami do rozwiązania:

1. **Brak SERPAPI_KEY w pliku .env**
   - Jeśli pojawia się błąd `SERPAPI_KEY environment variable not found`, oznacza to, że aplikacja nie może znaleźć klucza API potrzebnego do dostępu do SerpAPI. Aby to naprawić, utwórz plik o nazwie `.env` w katalogu głównym projektu (jeśli jeszcze go nie ma) i dodaj linię w formacie `SERPAPI_KEY=twoj_klucz_serpapi`. Upewnij się, że zastąpiłeś `twoj_klucz_serpapi` własnym kluczem pobranym ze strony SerpAPI.

2. **Błędy z modułami**
   - Błędy takie jak `ModuleNotFoundError: No module named 'httpx'` oznaczają brakujące pakiety Pythona. Zazwyczaj dzieje się tak, gdy nie zainstalowano wszystkich zależności. Aby to rozwiązać, uruchom w terminalu `pip install -r requirements.txt`, aby zainstalować wszystko, co potrzebne.

3. **Problemy z połączeniem**
   - Jeśli pojawia się błąd `Error during client execution`, często oznacza to, że klient nie może połączyć się z serwerem albo serwer nie działa jak należy. Sprawdź, czy klient i serwer to kompatybilne wersje oraz czy plik `server.py` znajduje się i działa w odpowiednim katalogu. Pomocne bywa też ponowne uruchomienie serwera i klienta.

4. **Błędy SerpAPI**
   - Komunikat `Search API returned error status: 401` oznacza, że Twój klucz SerpAPI jest brakujący, nieprawidłowy lub wygasł. Przejdź do panelu SerpAPI, zweryfikuj klucz i popraw plik `.env` jeśli to konieczne. Jeśli klucz jest poprawny, ale błąd się pojawia, sprawdź, czy nie wykorzystałeś darmowego limitu zapytań.

### Tryb debugowania

Domyślnie aplikacja loguje tylko ważne informacje. Jeśli chcesz zobaczyć więcej szczegółów dotyczących działania (np. by diagnozować trudne problemy), możesz włączyć tryb DEBUG. Pokaże on znacznie więcej na temat każdego kroku działania aplikacji.

**Przykład: normalne wyjście**
```plaintext
2025-06-01 10:15:23,456 - __main__ - INFO - Calling general_search with params: {'query': 'open source LLMs'}
2025-06-01 10:15:24,123 - __main__ - INFO - Successfully called general_search

GENERAL_SEARCH RESULTS:
... (search results here) ...
```

**Przykład: wyjście w trybie DEBUG**
```plaintext
2025-06-01 10:15:23,456 - __main__ - INFO - Calling general_search with params: {'query': 'open source LLMs'}
2025-06-01 10:15:23,457 - httpx - DEBUG - HTTP Request: GET https://serpapi.com/search ...
2025-06-01 10:15:23,458 - httpx - DEBUG - HTTP Response: 200 OK ...
2025-06-01 10:15:24,123 - __main__ - INFO - Successfully called general_search

GENERAL_SEARCH RESULTS:
... (search results here) ...
```

Zwróć uwagę, jak tryb DEBUG zawiera dodatkowe linie dotyczące zapytań HTTP, odpowiedzi i innych szczegółów wewnętrznych. To może być bardzo pomocne przy rozwiązywaniu problemów.

Aby włączyć tryb DEBUG, ustaw poziom logowania na DEBUG na początku pliku `client.py` lub `server.py`:

# [Python](#tab/python-debug)
```python
# Na górze pliku client.py lub server.py
import logging
logging.basicConfig(
    level=logging.DEBUG,  # Zmień z INFO na DEBUG
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
```

---

---

## Co dalej

- [5.10 Transmisja danych w czasie rzeczywistym](../mcp-realtimestreaming/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->