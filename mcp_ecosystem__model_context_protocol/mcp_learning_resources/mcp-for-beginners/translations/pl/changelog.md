# Changelog: MCP dla początkujących

Ten dokument jest zapisem wszystkich znaczących zmian wprowadzonych do programu nauczania Model Context Protocol (MCP) dla początkujących. Zmiany są dokumentowane w porządku odwrotnym chronologicznie (najnowsze zmiany na górze).

## 24 czerwca 2026

### Nowa lekcja: Używanie MCP w aplikacji Copilot

- [Sekcja narzędzi](./12-tooling/README.md) Dodano sekcję narzędzi.
- [MCP w aplikacji Copilot](./12-tooling/01-copilot-app/README.md)

## 16 czerwca 2026

### Dopasowanie specyfikacji MCP i walidacja przykładowych rozwiązań

Zweryfikowano program nauczania pod kątem aktualnej **Specyfikacji MCP 2025-11-25** oraz najnowszych oficjalnych SDK, następnie poprawiono pozostałe przestarzałe odniesienia do specyfikacji oraz potwierdzono, że podstawowe przykłady nadal się kompilują i uruchamiają.

#### Korekty wersji specyfikacji (2025-06-18 / 2025-03-26 → 2025-11-25)

Zaktualizowano treści w języku angielskim tam, gdzie nadal wskazywały starszą rewizję specyfikacji jako *obowiązującą/najnowszą* normę, oraz przekierowano linki do kanonicznych ścieżek specyfikacji na `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Zaktualizowano baner "Obowiązująca norma", wprowadzenie, nagłówek zasad bezpieczeństwa, nagłówek wymagań obligatoryjnych, sekcję Microsoft Entra ID, linki do odniesień i zasobów oraz końcowe ostrzeżenie o bezpieczeństwie (8 odwołań) do wersji 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Zaktualizowano link do specyfikacji w sekcji Dodatkowe zasoby oraz baner "Obowiązująca norma" do wersji 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Zastąpiono przestarzały link `2025-03-26` dotyczący zabezpieczeń i zaufania aktualną stroną najlepszych praktyk bezpieczeństwa 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Zaktualizowano oficjalny link do dokumentacji próbkowania na wersję 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Zaktualizowano odniesienie w czasie teraźniejszym do "aktualnej specyfikacji MCP" oraz link do specyfikacji w sekcji Dodatkowe zasoby na wersję 2025-11-25 (historyczne notki dotyczące wycofania SSE pozostawiono dla dokładności)

#### Walidacja przykładowych rozwiązań przeciwko aktualnym SDK

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` zainstalował `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` zakończył się bez błędów typów — istniejące API `McpServer`/`StdioServerTransport` pozostają ważne
- **Python (03-GettingStarted/01-first-server/solution/python)**: Zweryfikowano w izolowanym `.venv` z `mcp[cli]` (1.27.2); `py_compile` zakończył się sukcesem, a `FastMCP.list_tools()` poprawnie zwrócił narzędzia `add` i `subtract`
- Potwierdzono, że wszystkie zakresy wersji `@modelcontextprotocol/sdk` w przykładach (`>=1.26.0` / `^1.26.0` / `^1.27.0`) rozwiązują się bezbłędnie do obecnej `1.29.0` bez łamania API

#### Ujednolicenie wersji zależności (zamykanie różnic wersji)

Zaktualizowano przestarzałe piny SDK, tak aby każdy przykład śledził aktualne wydanie MCP, zgodnie z konwencją w repozytorium:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Podniesiono `@modelcontextprotocol/sdk` z `^1.8.0` → `>=1.26.0` oraz zaktualizowano przestarzały opis pakietu `"updated for MCP 2025-06-18"` na `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** oraz **lab4/code/github_mcp_server/pyproject.toml**: Podniesiono dokładny pin `mcp==1.23.0` → `mcp>=1.26.0`; wygenerowano na nowo oba pliki `uv.lock` (`uv lock`), aby pliki blokujące rozwiązywały się do obecnego `mcp 1.27.2` i pozostawały zsynchronizowane z manifestami

#### Analiza luk w programie nauczania — pokrycie funkcji najnowszej specyfikacji

Zweryfikowano, że program nauczania już obejmuje wszystkie prymitywy wprowadzone/rozszerzone w MCP 2025-11-25, więc brak jest luk w treści:
- **Sampling**: Lekcja 03-GettingStarted/14-sampling oraz 05-AdvancedTopics/mcp-sampling
- **Elicitation (w tym tryb URL)**: Udokumentowane w 01-CoreConcepts oraz 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Udokumentowane w 00-Introduction, 01-CoreConcepts oraz 05-AdvancedTopics/mcp-root-contexts
- **Tasks (eksperymentalne, długotrwałe operacje)**: Udokumentowane w 01-CoreConcepts oraz 05-AdvancedTopics/mcp-protocol-features
- **Adnotacje narzędzi** (`readOnlyHint` / `destructiveHint`): Udokumentowane w 01-CoreConcepts oraz 05-AdvancedTopics/mcp-protocol-features

### Wzmocnienie bezpieczeństwa i usunięcie podatności w zależnościach

Przeprowadzono pełny przegląd bezpieczeństwa wszystkich plików manifestu zależności i kodu źródłowego przykładowych projektów, następnie usunięto wszystkie zgłoszone alerty npm oraz jedno znalezisko na poziomie kodu. Po naprawie `npm audit` zgłasza **0 podatności** w każdym audytowanym katalogu.

#### Podatności zależności npm (tranzytywne) — naprawione

Przeaudytowano wszystkie 15 zatwierdzonych plików `package-lock.json`. Podatności dotyczyły wyłącznie zależności tranzytywnych wciąganych przez narzędzie deweloperskie MCP Inspector, klienta OpenAI oraz SDK MCP; wszystkie zostały rozwiązane bez łamania przykładowych rozwiązań:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** oraz **lab3/code/weather_mcp/inspector**: Podniesiono wersję `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), co usunęło powiązane alerty dla `ajv`, `brace-expansion`, `diff`, `path-to-regexp` i `ws`. Dodano wpis `overrides` w npm wymuszający łatkę `shell-quote@1.8.4`, eliminującą pozostały krytyczny alert przenoszony przez `concurrently`; pliki blokujące zostały ponownie wygenerowane (obecnie 0 podatności)
- **03-GettingStarted/samples/typescript**: `npm audit fix` zaktualizował tranzytywny `qs` (umiarkowany) do wersji załatanej
- **03-GettingStarted/samples/javascript**: `npm audit fix` zaktualizował tranzytywny `hono` (umiarkowany) do wersji załatanej
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` zaktualizował tranzytywny `form-data` (wysoki) do wersji załatanej
- **03-GettingStarted/11-simple-auth/solution/typescript**: Wygenerowano brakujący plik `package-lock.json`, czyniąc projekt powtarzalnym i audytowalnym (0 podatności)

#### Poprawka bezpieczeństwa na poziomie kodu (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Usunięto `shell=True` z narzędzia `open_in_vscode`. Poprzednie wywołanie `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` pozwalało na interpretowanie metaznaków powłoki w ścieżce folderu przez `cmd.exe` (wektor wstrzyknięcia poleceń). Teraz uruchamia bezpośrednio rozwiązany `Code.exe` z folderem jako argumentem — bez powłoki — co jest funkcjonalnie równoważne i bezpieczne

#### Audyt zależności Pythona

- Przeaudytowano wszystkie zestawy wymagań Pythona za pomocą `pip-audit`. `05-AdvancedTopics` i `03-GettingStarted/samples/python` nie wykazały **żadnych znanych podatności** (zakresy `mcp` / `httpx` / `pydantic` / `python-dotenv` rozwiązują się do aktualnych wersji załatanych)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` wykrył tranzytywne zależności **`werkzeug` 3.1.1** z trzema alertami DoS dotyczące `safe_join` i nazw urządzeń Windows — `CVE-2025-66221`, `CVE-2026-21860` i `CVE-2026-27199` (wszystkie naprawione w 3.1.6). Dodano wyraźny pin bezpieczeństwa `werkzeug>=3.1.6`, aby rozwiązać wersję załataną; potwierdzono prawidłowe rozwiązanie ograniczenia z użyciem stosu `chainlit` / `mcp` / `semantic-kernel`

### Rebranding nazwy produktu

Zaktualizowano całą zawartość programu nauczania, aby odzwierciedlić rebranding produktów Microsoftu:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Zaktualizowano link do społeczności Discord
- **AGENTS.md**: Zaktualizowano odniesienie do serwera Discord
- **README.md**: Zaktualizowano odniesienia do ekosystemu technologii
- **study_guide.md**: Zaktualizowano odniesienia do studiów przypadków
- **05-AdvancedTopics/README.md**: Zaktualizowano tytuł i opis modułu 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Zaktualizowano nagłówek sekcji i opis
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Pełna aktualizacja tytułu i treści modułu
- **05-AdvancedTopics/mcp-security-entra/README.md**: Zaktualizowano link krzyżowy
- **07-LessonsfromEarlyAdoption/README.md**: Zaktualizowano odniesienia do studiów przypadków
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Zaktualizowano nagłówek sekcji 9, odznaki i możliwości
- **08-BestPractices/README.md**: Zaktualizowano link do społeczności Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Zaktualizowano odniesienie do kanału Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Zaktualizowano odniesienie do wdrożenia modelu
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Zaktualizowano tabelę usług AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Zaktualizowano odniesienia do zasobów

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Zaktualizowano główne odniesienia kursu
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Zaktualizowano tytuł modułu, przegląd i wszystkie nagłówki modułów
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Zaktualizowano tytuł, cele nauki, instrukcje konfiguracji i zasoby
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Zaktualizowano tytuł, cele nauki, tabelę hostów MCP i przekierowania
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Zaktualizowano tytuł, odznaki, wymagania wstępne i zasoby
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Zaktualizowano odniesienia do Agent Builder oraz link do opinii
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Zaktualizowano wymagania wstępne i odniesienia do rozszerzeń

---

## 11 kwietnia 2026

### Nowa lekcja, poprawki dokumentacji i aktualizacje zależności

#### Dodano nową zawartość kursu

**Moduł 05 - Tematy zaawansowane**
- **Lekcja 5.17: Adwersarialne rozumowanie wieloagentowe z MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nowy obszerny przewodnik po wzorcu debaty adwersarialnej dla systemów wieloagentowych
  - Diagram architektury Mermaid: dwóch agentów → wspólny serwer MCP → transkrypcja debaty → sędzia → werdykt
  - Wspólny serwer narzędzi MCP (`web_search` + `run_python`) zaimplementowany w Pythonie i TypeScript
  - Przeciwstawne systemowe prompt’y (ZA / PRZECIW / Sędzia) z wyraźnymi wymaganiami dotyczącymi używania narzędzi
  - Orkiestrator debaty w Pythonie, TypeScript i C# zarządzający rundami i kierowaniem argumentów
  - Okablowanie MCP `ClientSession` dla orkiestratora do prawdziwych wywołań narzędzi
  - Tabela przypadków użycia (detekcja halucynacji, modelowanie zagrożeń, przegląd projektowania API, weryfikacja faktualna, wybór technologii)
  - Rozważania bezpieczeństwa: wykonywanie w piaskownicy, walidacja wywołań narzędzi, ograniczenie częstości, logowanie audytowe
  - Strukturalne ćwiczenie z trzema praktycznymi scenariuszami (przegląd kodu, decyzje architektoniczne, moderacja treści)

#### Poprawki dokumentacji

**Moduł 03 - Szybki start**
- **05-stdio-server/README.md**: Poprawiono niekompletny przykład serwera stdio w TypeScript — dodano brakującą instancję transportu (`new StdioServerTransport()`) oraz wywołanie `server.connect(transport)` zgodnie z przykładami w Pythonie i .NET w tej samej sekcji
- **14-sampling/README.md**: Poprawiono literówkę — skorygowano `"Sampling is an davanced features"` na `"Sampling is an advanced feature"`

#### Aktualizacje programu nauczania

**Główny README.md**
- Dodano wpis 5.17 (Adwersarialne rozumowanie wieloagentowe z MCP) do tabeli kursu wraz z bezpośrednim linkiem do nowej lekcji

**05-AdvancedTopics/README.md**
- Dodano wiersz lekcji 5.17 do tabeli lekcji

**study_guide.md**
- Dodano temat adwersarialnego rozumowania wieloagentowego do mapy myśli i opisowej części tematów zaawansowanych

#### Poprawki kodu i bezpieczeństwa

**Moduł 05 - Agenci adwersarialni (`mcp-adversarial-agents`)**
- **Poprawka bezpieczeństwa — wstrzyknięcie polecenia**: Zastąpiono interpolację shella w `execSync` narzędziu TypeScript `run_python` funkcją `execFile` + `promisify`, eliminując powierzchnię ataku wstrzyknięcia polecenia (kod kontrolowany przez LLM jest teraz przekazywany jako dosłowny element argv bez udziału shella)
- **Okablowanie pętli narzędzia MCP**: Zaktualizowano organizatora debaty w Pythonie do użycia klienta `AsyncAnthropic` (zastępując blokujący synchr. `Anthropic`), przekazywanie na żywo `ClientSession` bezpośrednio do każdej tury agenta, pobieranie definicji narzędzi przez `session.list_tools()` w każdej turze oraz wysyłanie bloków `tool_use` przez `session.call_tool()` w pętli aż model wyemituje ostateczną odpowiedź tekstową

#### Aktualizacje zależności

- Podniesiono wersję `hono` do 4.12.12 w wielu pakietach (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Podniesiono `@hono/node-server` z 1.19.11 do 1.19.13 w pakietach TypeScript
- Podniesiono `cryptography` z 46.0.5 do 46.0.7 w pakietach Python (10-StreamliningAIWorkflows laboratoria 3 i 4)
- Podniesiono `lodash` z 4.17.23 do 4.18.1 w inspektorze 10-StreamliningAIWorkflows

#### Tłumaczenia

- Zsynchronizowano tłumaczenia na 48+ języków z najnowszymi zmianami źródłowymi (aktualizacja i18n)

---

## 5 lutego 2026

### Ulepszenia walidacji i nawigacji w całym repozytorium

#### Dodano nową zawartość do programu nauczania

**Moduł 03 - Rozpoczęcie pracy**
- **12-mcp-hosts/README.md**: Nowy kompleksowy przewodnik po konfiguracji hostów MCP
  - Przykłady konfiguracji Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Szablony konfiguracji JSON dla wszystkich głównych hostów
  - Tabela porównawcza typów transportu (stdio, SSE/HTTP, WebSocket)
  - Rozwiązywanie typowych problemów z połączeniem
  - Najlepsze praktyki bezpieczeństwa konfiguracji hosta

- **13-mcp-inspector/README.md**: Nowy przewodnik debugowania MCP Inspector
  - Metody instalacji (npx, npm globalnie, ze źródła)
  - Połączenie z serwerami za pomocą stdio i HTTP/SSE
  - Narzędzia testowe, zasoby i przepływy promptów
  - Integracja z VS Code i MCP Inspector
  - Typowe scenariusze debugowania i ich rozwiązania

**Moduł 04 - Praktyczna implementacja**
- **pagination/README.md**: Nowy przewodnik o implementacji stronicowania
  - Wzorce stronicowania oparte na kursorku w Python, TypeScript, Java
  - Obsługa stronicowania po stronie klienta
  - Strategie projektowania kursora (nieprzezroczysty vs. strukturalny)
  - Rekomendacje optymalizacji wydajności

**Moduł 05 - Zaawansowane tematy**
- **mcp-protocol-features/README.md**: Nowy szczegółowy opis funkcji protokołu
  - Implementacja notyfikacji postępu
  - Wzorce anulowania żądań
  - Szablony zasobów z wzorcami URI
  - Zarządzanie cyklem życia serwera
  - Kontrola poziomów logowania
  - Wzorce obsługi błędów z kodami JSON-RPC

#### Poprawki nawigacji (zaktualizowano 24+ pliki)

**Główne pliki README modułów**
 Kierują teraz linkami zarówno do pierwszej lekcji, JAK i następnego modułu

**Pliki podrzędne 02-Security**
- Wszystkie 5 uzupełniających dokumentów bezpieczeństwa mają teraz nawigację "Co dalej":

**Pliki 09-CaseStudy**
- Wszystkie pliki studium przypadku mają teraz nawigację sekwencyjną:

**Laboratoria 10-StreamliningAI**
Dodano sekcję Co dalej do przeglądu Modułu 10 oraz Modułu 11

#### Poprawki kodu i zawartości

**Aktualizacje SDK i zależności**
Naprawiono pustą wersję openai na `^4.95.0`  
Zaktualizowano SDK z `^1.8.0` do `>=1.26.0`  
Zaktualizowano wersje mcp do `>=1.26.0`

**Poprawki kodu**
Naprawiono nieprawidłowy model `gpt-4o-mini` na `gpt-4.1-mini`

**Poprawki zawartości**
Naprawiono złamany link `READMEmd` → `README.md`, poprawiono nagłówek programu nauczania z `Module 1-3` na `Module 0-3`, poprawiono ścieżkę wrażliwą na wielkość liter  
Usunięto uszkodzoną zduplikowaną zawartość Studium Przypadku 5

**Udoskonalenia dla początkujących**
Dodano właściwe wprowadzenie, cele nauki i wymagania wstępne dla początkujących

#### Aktualizacje programu nauczania

**Główny README.md**
- Dodano pozycje 3.12 (Hosty MCP), 3.13 (Inspektor MCP), 4.1 (Stronicowanie), 5.16 (Funkcje protokołu) do tabeli programu nauczania

**README modułów**
Dodano lekcje 12 i 13 do listy lekcji  
Dodano sekcję Praktyczne przewodniki z linkiem do stronicowania  
Dodano lekcje 5.15 (Niestandardowy transport) i 5.16 (Funkcje protokołu)

**study_guide.md**
- Zaktualizowano mapę myśli o wszystkie nowe tematy: konfiguracja hostów MCP, Inspektor MCP, strategie stronicowania, szczegółowy opis funkcji protokołu

## 28 stycznia 2026

### Przegląd zgodności ze Specyfikacją MCP 2025-11-25

#### Udoskonalenie podstawowych koncepcji (01-CoreConcepts/)
- **Nowy prymityw klienta - Roots**: Dodano kompleksową dokumentację prymitywu klienta Roots, umożliwiającą serwerom rozumienie granic systemu plików i uprawnień dostępu
- **Adnotacje narzędziowe**: Dodano dokumentację adnotacji zachowania narzędzi (`readOnlyHint`, `destructiveHint`) dla lepszych decyzji wykonawczych narzędzi
- **Wywoływanie narzędzi w Sampling**: Zaktualizowano dokumentację Sampling, dodając parametry `tools` i `toolChoice` do wywoływania narzędzi przez model podczas próbkowania
- **Ujawnianie trybu URL**: Dodano dokumentację trybu ujawniania URL do inicjowania zewnętrznych interakcji webowych przez serwer
- **Zadania (eksperymentalne)**: Dodano nową sekcję dokumentującą funkcję eksperymentalną Zadania do trwałych wrapperów wykonawczych i odroczonego pobierania wyników
- **Wsparcie ikon**: Odnotowano, że narzędzia, zasoby, szablony zasobów i prompt mogą teraz zawierać ikony jako dodatkowe metadane

#### Aktualizacje dokumentacji
- **README.md**: Dodano odniesienie do wersji Specyfikacji MCP 2025-11-25 oraz wyjaśnienie wersjonowania wg daty
- **study_guide.md**: Zaktualizowano mapę programu o Zadania i Adnotacje narzędzi w sekcji podstawowej; zaktualizowano znacznik czasu dokumentu

#### Weryfikacja zgodności ze specyfikacją
- **Wersja protokołu**: Zweryfikowano, że cała dokumentacja odwołuje się do aktualnej Specyfikacji MCP 2025-11-25
- **Zgodność architektury**: Potwierdzono poprawność dokumentacji dwu-warstwowej architektury (warstwa danych + warstwa transportowa)
- **Dokumentacja prymitywów**: Zweryfikowano prymitywy serwera (zasoby, prompt, narzędzia) i prymitywy klienta (Sampling, Elicitation, Logging, Roots)
- **Mechanizmy transportowe**: Zweryfikowano poprawność dokumentacji transportów STDIO i Streamable HTTP
- **Wytyczne bezpieczeństwa**: Potwierdzono zgodność z aktualną dokumentacją najlepszych praktyk bezpieczeństwa MCP

#### Kluczowe funkcje MCP 2025-11-25 udokumentowane
- **Odkrywanie OpenID Connect**: Odkrywanie serwera uwierzytelniającego przez OIDC
- **Dokumenty metadanych klienta OAuth**: Zalecany mechanizm rejestracji klienta
- **JSON Schema 2020-12**: Domyślny dialekt dla definicji schematów MCP
- **System poziomów SDK**: Formalizacja wymagań wsparcia funkcji i utrzymania SDK
- **Struktura zarządzania**: Formalizacja grup roboczych i grup zainteresowań w zarządzaniu MCP

### Duża aktualizacja dokumentacji bezpieczeństwa (02-Security/)

#### Integracja warsztatów MCP Security Summit (Sherpa)
- **Nowy zasób szkoleniowy**: Dodano kompleksową integrację z [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) w całej dokumentacji bezpieczeństwa
- **Pokrycie trasy ekspedycji**: Udokumentowano pełną trasę od obozu bazowego do szczytu
- **Zgodność z OWASP**: Wszystkie wytyczne bezpieczeństwa powiązano z ryzykami z OWASP MCP Azure Security Guide

#### Integracja OWASP MCP Top 10
- **Nowa sekcja**: Dodano tabelę z OWASP MCP Top 10 zagrożeniami bezpieczeństwa wraz z mitigacjami Azure do głównego README bezpieczeństwa
- **Dokumentacja oparta na ryzyku**: Zaktualizowano plik mcp-security-controls-2025.md o odniesienia do ryzyk OWASP MCP dla każdego obszaru bezpieczeństwa
- **Architektura referencyjna**: Dodano linki do architektury referencyjnej i wzorców implementacji OWASP MCP Azure Security Guide

#### Zaktualizowane pliki bezpieczeństwa
- **README.md**: Dodano przegląd warsztatów Sherpa, tabelę trasy ekspedycji, podsumowanie ryzyk OWASP MCP Top 10 oraz sekcję szkoleń praktycznych
- **mcp-security-controls-2025.md**: Zaktualizowano nagłówek na luty 2026, dodano odniesienia do ryzyk OWASP (MCP01-MCP08), naprawiono niespójność wersji specyfikacji
- **mcp-security-best-practices-2025.md**: Dodano sekcję zasobów Sherpa i OWASP, zaktualizowano znacznik czasu
- **mcp-best-practices.md**: Dodano sekcję szkoleń praktycznych z linkami do Sherpa i OWASP
- **azure-content-safety-implementation.md**: Dodano odniesienie OWASP MCP06, dopasowanie do obozu Sherpa 3 oraz sekcję dodatkowych zasobów

#### Dodano nowe linki do zasobów
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Strony poszczególnych ryzyk OWASP MCP (MCP01-MCP10)

### Zgodność całego programu z MCP Specification 2025-11-25

#### Moduł 03 - Rozpoczęcie pracy
- **Dokumentacja SDK**: Dodano Go SDK do oficjalnej listy SDK; uaktualniono wszystkie odniesienia do SDK zgodnie ze Specyfikacją MCP 2025-11-25
- **Wyjaśnienie transportu**: Zaktualizowano opisy transportów STDIO i HTTP Streaming o wyraźne odniesienia do specyfikacji

#### Moduł 04 - Praktyczna implementacja
- **Aktualizacje SDK**: Dodano Go SDK; zaktualizowano listę SDK ze wskazaniem wersji specyfikacji
- **Specyfikacja autoryzacji**: Zaktualizowano link do specyfikacji MCP Authorization do wersji 2025-11-25

#### Moduł 05 - Zaawansowane tematy
- **Nowe funkcje**: Dodano notatkę o nowych funkcjach MCP Specification 2025-11-25 (Zadania, Adnotacje narzędzi, Ujawnianie trybu URL, Roots)
- **Zasoby bezpieczeństwa**: Dodano linki do OWASP MCP Top 10 i warsztatów Sherpa w zasobach dodatkowych

#### Moduł 06 - Wkłady społeczności
- **Lista SDK**: Dodano Swift i Rust SDK; zaktualizowano link do specyfikacji na 2025-11-25
- **Odniesienie do specyfikacji**: Zaktualizowano link do oficjalnej strony specyfikacji MCP

#### Moduł 07 - Wnioski z wczesnej adopcji
- **Aktualizacje zasobów**: Dodano link do MCP Specification 2025-11-25 oraz OWASP MCP Top 10 w dodatkowych zasobach

#### Moduł 08 - Najlepsze praktyki
- **Wersja specyfikacji**: Zaktualizowano odniesienia do specyfikacji MCP na 2025-11-25
- **Zasoby bezpieczeństwa**: Dodano OWASP MCP Top 10 i warsztaty Sherpa do zasobów dodatkowych

#### Moduł 10 - Usprawnianie przepływów AI
- **Aktualizacja odznaki**: Zmieniono odznakę wersji MCP z wersji SDK (1.9.3) na wersję specyfikacji (2025-11-25)
- **Linki do zasobów**: Zaktualizowano link do MCP Specification; dodano OWASP MCP Top 10

#### Moduł 11 - Laboratoria MCP Server Hands-On
- **Odniesienie do specyfikacji**: Zaktualizowano link do wersji MCP Specification 2025-11-25
- **Zasoby bezpieczeństwa**: Dodano OWASP MCP Top 10 do oficjalnych zasobów

## 18 grudnia 2025

### Aktualizacja dokumentacji bezpieczeństwa - MCP Specification 2025-11-25

#### Najlepsze praktyki bezpieczeństwa MCP (02-Security/mcp-best-practices.md) - aktualizacja wersji specyfikacji
- **Aktualizacja wersji protokołu**: Zaktualizowano do odniesienia najnowszej Specyfikacji MCP 2025-11-25 (opublikowanej 25 listopada 2025)
  - Zmieniono wszystkie odniesienia wersji specyfikacji z 2025-06-18 na 2025-11-25
  - Zaktualizowano daty dokumentu z 18 sierpnia 2025 na 18 grudnia 2025
  - Zweryfikowano, że wszystkie URL specyfikacji wskazują na aktualną dokumentację
- **Walidacja zawartości**: Kompleksowa weryfikacja najlepszych praktyk bezpieczeństwa względem najnowszych standardów
  - **Rozwiązania Microsoft Security**: Zweryfikowano aktualną terminologię i linki dla Prompt Shields (wcześniej "Wykrywanie ryzyka Jailbreak"), Azure Content Safety, Microsoft Entra ID i Azure Key Vault
  - **Bezpieczeństwo OAuth 2.1**: Potwierdzono zgodność z najnowszymi najlepszymi praktykami OAuth
  - **Standardy OWASP**: Sprawdzono aktualność odniesień do OWASP Top 10 dla LLM
  - **Usługi Azure**: Zweryfikowano wszystkie linki i najlepsze praktyki związane z Microsoft Azure
- **Zgodność ze standardami**: Potwierdzono aktualność wszystkich wspomnianych standardów bezpieczeństwa
  - Ramy zarządzania ryzykiem AI NIST
  - ISO 27001:2022
  - Najlepsze praktyki bezpieczeństwa OAuth 2.1
  - Frameworki bezpieczeństwa i zgodności Azure
- **Zasoby implementacji**: Zweryfikowano wszystkie linki do przewodników i zasobów implementacyjnych
  - Wzorce uwierzytelniania Azure API Management
  - Przewodniki integracji Microsoft Entra ID
  - Zarządzanie sekretami Azure Key Vault
  - Rozwiązania DevSecOps dla pipeline’ów i monitoringu

### Zapewnienie jakości dokumentacji
- **Zgodność ze specyfikacją**: Potwierdzono zgodność wszystkich wymagań bezpieczeństwa MCP (MUST/MUST NOT) z najnowszą specyfikacją
- **Aktualność zasobów**: Zweryfikowano wszystkie zewnętrzne linki do dokumentacji Microsoft, standardów bezpieczeństwa i przewodników implementacji
- **Pokrycie najlepszych praktyk**: Potwierdzono kompleksowe pokrycie uwierzytelniania, autoryzacji, zagrożeń specyficznych dla AI, bezpieczeństwa łańcucha dostaw i wzorców korporacyjnych

## 6 października 2025

### Rozbudowa sekcji Rozpoczęcie pracy – zaawansowane użycie serwera i prosta autentykacja

#### Zaawansowane użycie serwera (03-GettingStarted/10-advanced)
- **Nowy rozdział dodany**: Wprowadzono kompleksowy przewodnik po zaawansowanym użyciu serwera MCP, obejmujący zarówno regularne, jak i niskopoziomowe architektury serwerów.
  - **Serwer standardowy a niskopoziomowy**: Szczegółowe porównanie i przykłady kodu w Python i TypeScript dla obu podejść.
  - **Projektowanie oparte na handlerach**: Wyjaśnienie zarządzania narzędziami/zasobami/promptami opartego na handlerach dla skalowalnych, elastycznych implementacji serwera.
  - **Praktyczne wzorce**: Scenariusze z rzeczywistego świata, w których wzorce niskopoziomowego serwera są korzystne dla zaawansowanych funkcji i architektury.

#### Prosta autoryzacja (03-GettingStarted/11-simple-auth)
- **Nowy rozdział dodany**: Przewodnik krok po kroku dotyczący implementacji prostej autoryzacji w serwerach MCP.
  - **Koncepcje uwierzytelniania**: Jasne wyjaśnienie różnic między uwierzytelnianiem a autoryzacją oraz obsługi poświadczeń.
  - **Podstawowa implementacja autoryzacji**: Wzorce autoryzacji opartej na middleware w Python (Starlette) i TypeScript (Express) wraz z przykładami kodu.
  - **Przejście do zaawansowanego bezpieczeństwa**: Wskazówki dotyczące rozpoczęcia od prostej autoryzacji i rozwoju do OAuth 2.1 oraz RBAC z odniesieniami do modułów zaawansowanego bezpieczeństwa.

Te dodatki dostarczają praktyczne, warsztatowe wskazówki dotyczące budowy bardziej solidnych, bezpiecznych i elastycznych implementacji serwerów MCP, łącząc podstawowe koncepcje z zaawansowanymi wzorcami produkcyjnymi.

## 29 września 2025

### Laboratoria integracji bazy danych MCP Server – Kompleksowa ścieżka nauki praktycznej

#### 11-MCPServerHandsOnLabs – Nowy kompletny program nauki integracji bazy danych
- **Pełna ścieżka 13 laboratoriów**: Dodano kompleksowy, praktyczny program nauki budowy produkcyjnych serwerów MCP z integracją bazy danych PostgreSQL
  - **Zastosowanie w rzeczywistym świecie**: Przykład analityki Zava Retail demonstrujący wzorce klasy enterprise
  - **Strukturalna progresja nauki**:
    - **Laboratoria 00-03: Fundamenty** – Wprowadzenie, architektura rdzeniowa, bezpieczeństwo i multi-tenantowość, konfiguracja środowiska
    - **Laboratoria 04-06: Budowanie serwera MCP** – Projekt bazy danych i schemat, implementacja serwera MCP, rozwój narzędzi  
    - **Laboratoria 07-09: Zaawansowane funkcje** – Integracja wyszukiwania semantycznego, testowanie i debugowanie, integracja z VS Code
    - **Laboratoria 10-12: Produkcja i najlepsze praktyki** – Strategie wdrożenia, monitorowanie i obserwowalność, optymalizacja i najlepsze praktyki
  - **Technologie klasy enterprise**: Framework FastMCP, PostgreSQL z pgvector, wbudowania Azure OpenAI, Azure Container Apps, Application Insights
  - **Zaawansowane funkcje**: Row Level Security (RLS), wyszukiwanie semantyczne, dostęp do danych multi-tenant, wektory osadzeń, monitorowanie w czasie rzeczywistym

#### Ujednolicenie terminologii – konwersja modułu na laboratorium
- **Kompleksowa aktualizacja dokumentacji**: Systematyczna aktualizacja wszystkich plików README w 11-MCPServerHandsOnLabs, aby używać terminologii "Laboratorium" zamiast "Moduł"
  - **Nagłówki sekcji**: Zmieniono "Co obejmuje ten moduł" na "Co obejmuje to laboratorium" w całych 13 laboratoriach
  - **Opis treści**: Zmieniono "Ten moduł zapewnia..." na "To laboratorium zapewnia..." w dokumentacji
  - **Cele nauki**: Zmieniono "Pod koniec tego modułu..." na "Pod koniec tego laboratorium..."
  - **Linki nawigacyjne**: Przekonwertowano wszystkie odniesienia "Moduł XX:" na "Laboratorium XX:" w przekrojowych odniesieniach i nawigacji
  - **Śledzenie ukończenia**: Zmieniono "Po ukończeniu tego modułu..." na "Po ukończeniu tego laboratorium..."
  - **Zachowane odniesienia techniczne**: Zachowano odniesienia do modułów Python w plikach konfiguracyjnych (np. `"module": "mcp_server.main"`)

#### Ulepszenie przewodnika studiów (study_guide.md)
- **Wizualna mapa programu nauczania**: Dodano nową sekcję "11. Laboratoria integracji bazy danych" z pełną wizualizacją struktury laboratoriów
- **Struktura repozytorium**: Zmieniono z dziesięciu na jedenaście głównych sekcji wraz ze szczegółowym opisem 11-MCPServerHandsOnLabs
- **Wskazówki dotyczące ścieżki nauki**: Rozszerzono instrukcje nawigacyjne obejmujące sekcje 00-11
- **Omówienie technologii**: Dodano szczegóły dotyczące FastMCP, PostgreSQL, usług Azure
- **Efekty nauki**: Podkreślono rozwój gotowych do produkcji serwerów, wzorce integracji baz danych oraz bezpieczeństwo klasy enterprise

#### Ulepszenie struktury głównego README
- **Terminologia oparta na laboratoriach**: Zaktualizowano główny README.md w 11-MCPServerHandsOnLabs, aby konsekwentnie stosować strukturę "Laboratorium"
- **Organizacja ścieżki nauki**: Jasna progresja od podstawowych koncepcji przez zaawansowaną implementację do wdrożenia produkcyjnego
- **Skupienie na praktyce**: Nacisk na praktyczne, warsztatowe nauczanie z wzorcami i technologiami klasy enterprise

### Poprawki jakości i spójności dokumentacji
- **Nacisk na naukę praktyczną**: Wzmocnienie podejścia opartego na laboratoriach w całej dokumentacji
- **Skupienie na wzorcach enterprise**: Podkreślenie gotowych do produkcji implementacji oraz rozważań bezpieczeństwa klasy enterprise
- **Integracja technologii**: Kompleksowe omówienie nowoczesnych usług Azure i wzorców integracji AI
- **Progresja nauki**: Jasna, strukturalna ścieżka od podstaw do wdrożenia produkcyjnego

## 26 września 2025

### Ulepszenia studiów przypadku – integracja rejestru MCP GitHub

#### Studia przypadku (09-CaseStudy/) – Skupienie na rozwoju ekosystemu
- **README.md**: Znaczne rozszerzenie z kompleksowym studium przypadku rejestru MCP GitHub
  - **Studium przypadku rejestru MCP GitHub**: Nowe obszerne studium przypadku analizujące uruchomienie rejestru MCP GitHub we wrześniu 2025
    - **Analiza problemu**: Szczegółowa analiza fragmentacji odkrywania i wdrażania serwerów MCP
    - **Architektura rozwiązania**: Skoncentrowane podejście rejestru centralnego GitHub z instalacją VS Code jednym kliknięciem
    - **Wpływ biznesowy**: Mierzalna poprawa wdrażania deweloperów i produktywności
    - **Wartość strategiczna**: Skupienie na modułowym wdrażaniu agentów i interoperacyjności narzędzi
    - **Rozwój ekosystemu**: Pozycjonowanie jako platforma podstawowa dla integracji agentowej
  - **Ulepszona struktura studiów przypadku**: Zaktualizowano wszystkie siedem studiów przypadku z jednolitym formatowaniem i kompleksowymi opisami
    - Azure AI Travel Agents: Nacisk na orkiestrację multi-agentową
    - Integracja Azure DevOps: Automatyzacja przepływów pracy
    - Pobieranie dokumentacji w czasie rzeczywistym: Implementacja klienta konsoli Python
    - Generator interaktywnego planu nauki: Aplikacja konwersacyjna Chainlit
    - Dokumentacja w edytorze: Integracja VS Code i GitHub Copilot
    - Azure API Management: Wzorce integracji API klasy enterprise
    - GitHub MCP Registry: Rozwój ekosystemu i platforma społecznościowa
  - **Kompleksowe podsumowanie**: Przepisana sekcja podsumowująca z akcentem na siedem studiów przypadku obejmujących różnorodne wymiary implementacji MCP
    - Integracja enterprise, orkiestracja multi-agenta, produktywność deweloperska
    - Rozwój ekosystemu, zastosowania edukacyjne
    - Ulepszone wglądy w wzorce architektoniczne, strategie implementacji i najlepsze praktyki
    - Podkreślenie MCP jako dojrzałego protokołu gotowego do produkcji

#### Aktualizacje przewodnika studiów (study_guide.md)
- **Wizualna mapa programu nauczania**: Zaktualizowano mindmapę, aby uwzględnić rejestr MCP GitHub w sekcji studiów przypadku
- **Opis studiów przypadku**: Rozszerzono z opisów ogólnych do szczegółowego podziału siedmiu kompleksowych studiów przypadku
- **Struktura repozytorium**: Zaktualizowano sekcję 10, aby odzwierciedlała pełne pokrycie studiów przypadku ze szczegółami implementacji
- **Integracja changeloga**: Dodano wpis z 26 września 2025 dokumentujący dodanie rejestru MCP GitHub i ulepszenia studiów przypadku
- **Aktualizacja dat**: Zaktualizowano datę stopki do najnowszej rewizji (26 września 2025)

### Ulepszenia jakości dokumentacji
- **Poprawa spójności**: Ustandaryzowano formatowanie i strukturę studiów przypadku we wszystkich siedmiu przykładach
- **Kompleksowe pokrycie**: Studia przypadku obejmują scenariusze enterprise, produktywność deweloperską i rozwój ekosystemu
- **Pozycjonowanie strategiczne**: Wzmocniony nacisk na MCP jako platformę podstawową dla wdrażania systemów agentowych
- **Integracja zasobów**: Zaktualizowano zasoby dodatkowe o link do rejestru MCP GitHub

## 15 września 2025

### Rozszerzenie tematów zaawansowanych – niestandardowe transporty i inżynieria kontekstu

#### Niestandardowe transporty MCP (05-AdvancedTopics/mcp-transport/) – Nowy przewodnik implementacji zaawansowanej
- **README.md**: Kompletny przewodnik implementacji niestandardowych mechanizmów transportu MCP
  - **Transport Azure Event Grid**: Kompleksowa implementacja serwerless oparta na zdarzeniach
    - Przykłady w C#, TypeScript i Python z integracją Azure Functions
    - Wzorce architektury zorientowanej na zdarzenia skalowalnej MCP
    - Odbiorniki webhook i obsługa komunikatów push
  - **Transport Azure Event Hubs**: Implementacja transportu strumieniowego o wysokiej przepustowości
    - Możliwości przesyłania na żywo o niskich opóźnieniach
    - Strategie partycjonowania i zarządzanie punktami kontrolnymi
    - Grupowanie komunikatów i optymalizacja wydajności
  - **Wzorce integracji enterprise**: Przykłady architektoniczne gotowe do produkcji
    - Rozproszone przetwarzanie MCP z wykorzystaniem wielu Azure Functions
    - Hybrydowe architektury transportowe łączące różne typy transportów
    - Trwałość komunikatów, niezawodność i strategie obsługi błędów
  - **Bezpieczeństwo i monitorowanie**: Integracja Azure Key Vault i wzorce obserwowalności
    - Uwierzytelnianie za pomocą zarządzanej tożsamości i zasady najmniejszych uprawnień
    - Telemetria Application Insights i monitorowanie wydajności
    - Obwody zabezpieczające i wzorce odporności na błędy
  - **Frameworki testowe**: Kompleksowe strategie testowania niestandardowych transportów
    - Testy jednostkowe z użyciem test double i frameworków do mockowania
    - Testy integracyjne z Azure Test Containers
    - Rozważania dotyczące testów wydajności i obciążeniowych

#### Inżynieria kontekstu (05-AdvancedTopics/mcp-contextengineering/) – Nowa dyscyplina AI
- **README.md**: Kompleksowe omówienie inżynierii kontekstu jako rosnącej dziedziny
  - **Zasady podstawowe**: Pełne dzielenie się kontekstem, świadomość decyzji działania, zarządzanie oknem kontekstu
  - **Współdziałanie z protokołem MCP**: Jak projekt MCP adresuje wyzwania inżynierii kontekstu
    - Ograniczenia okna kontekstowego i strategie progresywnego ładowania
    - Określanie relewantności i dynamiczne pobieranie kontekstu
    - Obsługa kontekstu multimodalnego i względy bezpieczeństwa
  - **Podejścia implementacyjne**: Architektury jednosesyjne kontra multi-agentowe
    - Techniki dzielenia i priorytetyzacji fragmentów kontekstu
    - Progresywne ładowanie i strategie kompresji kontekstu
    - Warstwowe podejścia do kontekstu oraz optymalizacja pobierania
  - **Ramka pomiarowa**: Nowożytne metryki oceny efektywności kontekstu
    - Efektywność wejścia, wydajność, jakość i doświadczenie użytkownika
    - Eksperymentalne podejścia do optymalizacji kontekstu
    - Analiza błędów i metody doskonalenia

#### Aktualizacje nawigacji programu nauczania (README.md)
- **Ulepszona struktura modułów**: Zaktualizowano tabelę programu nauczania o nowe tematy zaawansowane
  - Dodano wpisy Inżynieria kontekstu (5.14) i Niestandardowy transport (5.15)
  - Spójne formatowanie i linki nawigacyjne dla wszystkich modułów
  - Zaktualizowano opisy odzwierciedlające obecny zakres treści

### Usprawnienia struktury katalogów
- **Standaryzacja nazewnictwa**: Zmieniono nazwę "mcp transport" na "mcp-transport" dla spójności z innymi folderami tematów zaawansowanych
- **Organizacja treści**: Wszystkie foldery 05-AdvancedTopics stosują spójny wzorzec nazewnictwa (mcp-[topic])

### Poprawki jakości dokumentacji
- **Zgodność ze specyfikacją MCP**: Cały nowy materiał odnosi się do aktualnej specyfikacji MCP 2025-06-18
- **Przykłady wielojęzyczne**: Kompleksowe przykłady kodu w C#, TypeScript i Python
- **Skupienie na enterprise**: Wzorce gotowe do produkcji i integracja z chmurą Azure
- **Dokumentacja wizualna**: Diagramy Mermaid do wizualizacji architektury i przepływów

## 18 sierpnia 2025

### Kompleksowa aktualizacja dokumentacji – standardy MCP 2025-06-18

#### Najlepsze praktyki bezpieczeństwa MCP (02-Security/) – Pełna modernizacja
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Całkowity rewrit według MCP Specification 2025-06-18
  - **Wymagania obowiązkowe**: Dodano jawne wymagania MUSI/NIE MOGI zgodnie z oficjalną specyfikacją z wyraźnymi wskaźnikami wizualnymi
  - **12 podstawowych praktyk bezpieczeństwa**: Przebudowane z listy 15-punktowej na kompleksowe domeny bezpieczeństwa
    - Bezpieczeństwo tokenów i uwierzytelnianie z integracją zewnętrznego dostawcy tożsamości
    - Zarządzanie sesjami i bezpieczeństwo transportu z wymaganiami kryptograficznymi
    - Ochrona przed zagrożeniami AI z integracją Microsoft Prompt Shields
    - Kontrola dostępu i uprawnienia z zasadą najmniejszego uprzywilejowania
    - Bezpieczeństwo treści i monitorowanie z integracją Azure Content Safety
    - Bezpieczeństwo łańcucha dostaw z kompleksową weryfikacją komponentów
    - Bezpieczeństwo OAuth i zapobieganie atakom typu confused deputy z implementacją PKCE
    - Reakcja na incydenty i odzyskiwanie z automatycznymi mechanizmami
    - Zgodność i zarządzanie według regulacji
    - Zaawansowane kontrole bezpieczeństwa z architekturą zero trust
    - Integracja ekosystemu Microsoft Security z kompleksowymi rozwiązaniami
    - Ciągłe doskonalenie bezpieczeństwa z adaptacyjnymi praktykami
  - **Rozwiązania Microsoft Security**: Ulepszone wskazówki integracyjne dla Prompt Shields, Azure Content Safety, Entra ID i GitHub Advanced Security
  - **Zasoby implementacji**: Kategoryzowane kompleksowe linki do zasobów według Oficjalnej Dokumentacji MCP, Rozwiązań Microsoft Security, Standardów bezpieczeństwa i przewodników implementacji

#### Zaawansowane kontrole bezpieczeństwa (02-Security/) – Wdrożenie klasy enterprise
- **MCP-SECURITY-CONTROLS-2025.md**: Całkowita przebudowa z ramą bezpieczeństwa klasy enterprise
  - **9 kompleksowych domen bezpieczeństwa**: Rozszerzone z podstawowych kontroli do szczegółowej struktury enterprise
    - Zaawansowane uwierzytelnianie i autoryzacja z integracją Microsoft Entra ID
    - Bezpieczeństwo tokenów i zabezpieczenia anti-passthrough z kompleksową walidacją
    - Kontrole bezpieczeństwa sesji z zapobieganiem przejęciom
    - Bezpieczeństwo specyficzne dla AI z zapobieganiem wstrzyknięciom promptów i zatruwaniem narzędzi
    - Zapobieganie atakom confused deputy z zabezpieczeniami proxy OAuth
    - Bezpieczeństwo wykonania narzędzi z sandboxingiem i izolacją
    - Kontrole bezpieczeństwa łańcucha dostaw z weryfikacją zależności
    - Monitorowanie i detekcja z integracją SIEM
    - Reakcja na incydenty i odzyskiwanie z automatycznymi mechanizmami
  - **Przykłady implementacji**: Dodano szczegółowe bloki konfiguracji YAML oraz przykłady kodu
  - **Integracja rozwiązań Microsoft**: Kompleksowe omówienie usług bezpieczeństwa Azure, GitHub Advanced Security i zarządzania tożsamością enterprise

#### Bezpieczeństwo tematów zaawansowanych (05-AdvancedTopics/mcp-security/) – Implementacja gotowa do produkcji
- **README.md**: Całkowity rewrit dla implementacji bezpieczeństwa klasy enterprise
  - **Zgodność z aktualną specyfikacją**: Zaktualizowano do MCP Specification 2025-06-18 z obowiązkowymi wymaganiami bezpieczeństwa
  - **Ulepszone uwierzytelnianie**: Integracja Microsoft Entra ID z bogatymi przykładami w .NET i Java Spring Security
  - **Integracja zabezpieczeń AI**: Implementacja Microsoft Prompt Shields i Azure Content Safety z szczegółowymi przykładami w Python
  - **Zaawansowane metody przeciwdziałania zagrożeniom**: Kompleksowe przykłady implementacji dla
    - Zapobiegania atakom confused deputy z PKCE i walidacją zgody użytkownika
    - Zapobiegania passthrough tokenów z walidacją odbiorcy i bezpiecznym zarządzaniem tokenami
    - Zapobieganie przechwytywaniu sesji za pomocą powiązania kryptograficznego i analizy behawioralnej
  - **Integracja zabezpieczeń przedsiębiorstwa**: monitorowanie Azure Application Insights, potoki wykrywania zagrożeń oraz zabezpieczenie łańcucha dostaw
  - **Lista kontrolna wdrożenia**: wyraźne rozróżnienie kontroli bezpieczeństwa obowiązkowych i zalecanych wraz z korzyściami ekosystemu bezpieczeństwa Microsoft

### Jakość dokumentacji i zgodność ze standardami
- **Odniesienia do specyfikacji**: Zaktualizowano wszystkie odniesienia do aktualnej Specyfikacji MCP 2025-06-18
- **Ekosystem bezpieczeństwa Microsoft**: Wzmocniono wskazówki dotyczące integracji w całej dokumentacji bezpieczeństwa
- **Praktyczne wdrożenie**: Dodano szczegółowe przykłady kodu w .NET, Java oraz Python z wzorcami korporacyjnymi
- **Organizacja zasobów**: Kompleksowa kategoryzacja oficjalnej dokumentacji, standardów bezpieczeństwa oraz przewodników wdrożeniowych
- **Wskaźniki wizualne**: Wyraźne oznaczenie wymagań obowiązkowych oraz praktyk zalecanych


#### Podstawowe pojęcia (01-CoreConcepts/) – Kompleksowa modernizacja
- **Aktualizacja wersji protokołu**: Zaktualizowano odwołania do aktualnej Specyfikacji MCP 2025-06-18 z wersjonowaniem opartym na dacie (format RRRR-MM-DD)
- **Udoskonalenie architektury**: Wzmocnione opisy Gospodarzy, Klientów i Serwerów zgodnie z aktualnymi wzorcami architektury MCP
  - Gospodarze teraz jasno zdefiniowani jako aplikacje AI koordynujące wiele połączeń klientów MCP
  - Klienci opisani jako łączniki protokołu utrzymujące relacje jeden do jednego z serwerami
  - Serwery rozszerzone o scenariusze wdrożeń lokalnych i zdalnych
- **Restrukturyzacja prymitywów**: Kompletny remont prymitywów serwera i klienta
  - Prymitywy serwera: Zasoby (źródła danych), Podpowiedzi (szablony), Narzędzia (funkcje wykonywalne) z wyczerpującymi wyjaśnieniami i przykładami
  - Prymitywy klienta: Próbkowanie (uzupełnienia LLM), Elicytacja (wejście użytkownika), Logowanie (debugowanie/monitorowanie)
  - Zaktualizowano wzorce metod odkrywania (`*/list`), pobierania (`*/get`) i wykonywania (`*/call`)
- **Architektura protokołu**: Wprowadzono model dwuwarstwowy
  - Warstwa danych: Podstawa JSON-RPC 2.0 z zarządzaniem cyklem życia i prymitywami
  - Warstwa transportowa: STDIO (lokalna) oraz Streamable HTTP ze SSE (zdalny) mechanizmy transportu
- **Ramowy system zabezpieczeń**: Kompleksowe zasady bezpieczeństwa obejmujące wyraźną zgodę użytkownika, ochronę prywatności danych, bezpieczeństwo wykonywania narzędzi oraz zabezpieczenia warstwy transportowej
- **Wzorce komunikacji**: Zaktualizowano wiadomości protokołu pokazujące inicjalizację, odkrywanie, wykonanie i powiadomienia
- **Przykłady kodu**: Odświeżone wielojęzyczne przykłady (.NET, Java, Python, JavaScript) odzwierciedlające aktualne wzorce SDK MCP

#### Bezpieczeństwo (02-Security/) – Kompleksowa przebudowa bezpieczeństwa  
- **Zgodność ze standardami**: Pełna zgodność z wymaganiami bezpieczeństwa Specyfikacji MCP 2025-06-18
- **Ewolucja uwierzytelniania**: Udokumentowany rozwój od własnych serwerów OAuth do delegacji zewnętrznego dostawcy tożsamości (Microsoft Entra ID)
- **Analiza zagrożeń specyficznych dla AI**: Zwiększony zakres omówienia nowoczesnych wektorów ataków AI
  - Szczegółowe scenariusze ataków wstrzykiwania podpowiedzi z przykładami rzeczywistymi
  - Mechanizmy trucizny narzędzi i wzorce ataków typu „rug pull”
  - Ataki zatruwające okno kontekstu i dezorientujące modele
- **Rozwiązania bezpieczeństwa AI Microsoft**: Kompleksowe omówienie ekosystemu bezpieczeństwa Microsoft
  - Osłony podpowiedzi AI z zaawansowanym wykrywaniem, uwydatnianiem i technikami ograniczników
  - Wzorce integracji Azure Content Safety
  - Zaawansowane bezpieczeństwo GitHub dla ochrony łańcucha dostaw
- **Zaawansowane łagodzenie zagrożeń**: Szczegółowe kontrole bezpieczeństwa dla
  - Przechwytywania sesji z scenariuszami ataków specyficznych dla MCP i wymaganiami kryptograficznymi identyfikatorów sesji
  - Problemów z zagubionym pełnomocnikiem w scenariuszach proxy MCP z wyraźnymi wymaganiami zgody
  - Luki związanych z przekazywaniem tokenów z obowiązkową weryfikacją
- **Bezpieczeństwo łańcucha dostaw**: Rozszerzone omówienie łańcucha dostaw AI obejmujące modele bazowe, usługi osadzania, dostawców kontekstu oraz interfejsy API stron trzecich
- **Bezpieczeństwo fundamentów**: Wzmocniona integracja z korporacyjnymi wzorcami bezpieczeństwa, w tym architekturą zero trust i ekosystemem bezpieczeństwa Microsoft
- **Organizacja zasobów**: Kategoryzacja kompleksowych linków zasobów według typu (Oficjalna dokumentacja, Standardy, Badania, Rozwiązania Microsoft, Przewodniki wdrożeniowe)

### Poprawki jakości dokumentacji
- **Strukturyzowane cele nauki**: Wzmocnione cele nauczania z konkretnymi, wykonalnymi rezultatami
- **Odnośniki krzyżowe**: Dodano linki między powiązanymi tematami bezpieczeństwa i podstawowych pojęć
- **Aktualne informacje**: Zaktualizowano wszystkie odniesienia dat i linki do specyfikacji według obowiązujących standardów
- **Wskazówki wdrożeniowe**: Dodano konkretne, wykonalne wytyczne wdrożeniowe w obu sekcjach

## 16 lipca 2025

### Ulepszenia README i nawigacji
- Całkowicie przeprojektowano nawigację programu w README.md
- Zastąpiono tagi `<details>` bardziej dostępnym formatem tabelarycznym
- Stworzono alternatywne opcje układu w nowym folderze "alternative_layouts"
- Dodano przykłady nawigacji opartych na kartach, stylu zakładek i akordeonu
- Zaktualizowano sekcję struktury repozytorium, aby uwzględnić wszystkie najnowsze pliki
- Wzmocniono sekcję "Jak korzystać z tego programu" jasnymi rekomendacjami
- Zaktualizowano linki do specyfikacji MCP, aby wskazywały poprawne adresy URL
- Dodano sekcję Inżynieria kontekstu (5.14) do struktury programu

### Aktualizacje przewodnika do nauki
- Kompleksowo zrewidowano przewodnik, aby dopasować do aktualnej struktury repozytorium
- Dodano nowe sekcje dla klientów MCP i narzędzi oraz popularnych serwerów MCP
- Zaktualizowano wizualną mapę programu, aby odzwierciedlała wszystkie tematy
- Rozbudowano opisy tematyki zaawansowanej, obejmujące wszystkie specjalistyczne obszary
- Zaktualizowano sekcję studiów przypadków zgodnie z rzeczywistymi przykładami
- Dodano ten obszerny dziennik zmian

### Wkład społeczności (06-CommunityContributions/)
- Dodano szczegółowe informacje o serwerach MCP do generowania obrazów
- Dodano rozbudowaną sekcję dotyczącą używania Claude w VSCode
- Dodano instrukcje konfiguracji i użytkowania terminalowego klienta Cline
- Zaktualizowano sekcję klientów MCP o wszystkie popularne opcje klientów
- Wzbogacono przykłady wkładu o dokładniejsze próbki kodu

### Tematy zaawansowane (05-AdvancedTopics/)
- Zorganizowano wszystkie specjalistyczne foldery tematyczne ze spójną nazwą
- Dodano materiały i przykłady inżynierii kontekstu
- Dodano dokumentację integracji agenta Foundry
- Wzmocniono dokumentację integracji zabezpieczeń Entra ID

## 11 czerwca 2025

### Tworzenie wstępne
- Wydano pierwszą wersję programu MCP dla początkujących
- Stworzono podstawową strukturę dla 10 głównych sekcji
- Wdrożono wizualną mapę programu do nawigacji
- Dodano początkowe przykładowe projekty w wielu językach programowania

### Rozpoczęcie pracy (03-GettingStarted/)
- Stworzono pierwsze przykłady implementacji serwera
- Dodano wskazówki rozwoju klienta
- Uwzględniono instrukcje integracji klienta LLM
- Dodano dokumentację integracji z VS Code
- Wdrożono przykłady serwera Server-Sent Events (SSE)

### Podstawowe pojęcia (01-CoreConcepts/)
- Dodano szczegółowe wyjaśnienie architektury klient-serwer
- Stworzono dokumentację kluczowych elementów protokołu
- Udokumentowano wzorce komunikacyjne w MCP

## 23 maja 2025

### Struktura repozytorium
- Zainicjowano repozytorium z podstawową strukturą folderów
- Stworzono pliki README dla każdej głównej sekcji
- Skonfigurowano infrastrukturę tłumaczeń
- Dodano zasoby obrazów i diagramy

### Dokumentacja
- Stworzono wstępny plik README.md z przeglądem programu
- Dodano CODE_OF_CONDUCT.md oraz SECURITY.md
- Skonfigurowano SUPPORT.md z wskazówkami, jak uzyskać pomoc
- Stworzono wstępną strukturę przewodnika do nauki

## 15 kwietnia 2025

### Planowanie i ramy
- Wstępne planowanie programu MCP dla początkujących
- Określono cele nauczania i docelową grupę odbiorców
- Nakreślono strukturę programu z 10 sekcjami
- Opracowano ramy koncepcyjne dla przykładów i studiów przypadków
- Stworzono wstępne prototypowe przykłady kluczowych pojęć

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->