# Changelog: Curriculum MCP dla początkujących

Dokument ten służy jako zapis wszystkich istotnych zmian wprowadzonych do programu Model Context Protocol (MCP) dla początkujących. Zmiany są dokumentowane w kolejności odwrotnej chronologicznie (najświeższe zmiany jako pierwsze).

## 16 czerwca 2026

### Wyrównanie specyfikacji MCP i walidacja przykładów

Zweryfikowano program nauczania pod kątem obecnej **Specyfikacji MCP 2025-11-25** oraz najnowszych oficjalnych SDK, następnie poprawiono pozostałe nieaktualne odniesienia do specyfikacji i potwierdzono, że podstawowe przykłady nadal się kompilują i działają.

#### Korekty wersji specyfikacji (2025-06-18 / 2025-03-26 → 2025-11-25)

Zaktualizowano anglojęzyczne treści, w których nadal wskazywano starszą rewizję specyfikacji jako *aktualny/najnowszy* standard, oraz przekierowano linki na kanoniczne ścieżki specyfikacji `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Zaktualizowano baner "Current Standard", wprowadzenie, nagłówek głównych zasad bezpieczeństwa, nagłówek wymagań obowiązkowych, sekcję Microsoft Entra ID, linki do Referencji i Zasobów oraz końcowe ostrzeżenie bezpieczeństwa (8 odnośników) do wersji 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Zaktualizowano link do specyfikacji w Dodatkowych zasobach oraz baner "Current Standard" do wersji 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Zamieniono przestarzały link bezpieczeństwa `2025-03-26` na aktualną stronę najlepszych praktyk bezpieczeństwa 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Zaktualizowano oficjalny link dokumentacji sampling do wersji 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Zaktualizowano odniesienie w czasie teraźniejszym do "aktualnej specyfikacji MCP" i link do specyfikacji Dodatkowych zasobów na wersję 2025-11-25 (pozostawiono historyczne uwagi o deprecjacji SSE dla dokładności)

#### Walidacja przykładów pod kątem aktualnych SDK

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` zainstalował `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` zakończył się bez błędów typów — istniejące API `McpServer`/`StdioServerTransport` są nadal ważne
- **Python (03-GettingStarted/01-first-server/solution/python)**: Zweryfikowano w izolowanym `.venv` z `mcp[cli]` (1.27.2); `py_compile` przeszedł pomyślnie, a `FastMCP.list_tools()` poprawnie zwróciło narzędzia `add` i `subtract`
- Potwierdzono, że wszystkie zakresy wersji `@modelcontextprotocol/sdk` w przykładach (`>=1.26.0` / `^1.26.0` / `^1.27.0`) rozwiązały się prawidłowo do aktualnej wersji `1.29.0` bez łamania API

#### Wyrównanie wersji zależności (zamykanie luk wersji)

Podniesiono przestarzałe wersje SDK, tak aby każdy przykład korzystał z aktualnego wydania MCP, zgodnie z konwencją całego repozytorium:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Podniesiono wersję `@modelcontextprotocol/sdk` z `^1.8.0` → `>=1.26.0` i zaktualizowano nieaktualny opis pakietu `"updated for MCP 2025-06-18"` na `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** oraz **lab4/code/github_mcp_server/pyproject.toml**: Podniesiono dokładną wersję `mcp==1.23.0` → `mcp>=1.26.0`; odtworzono oba pliki `uv.lock` (`uv lock`), tak aby pliki blokad rozwiązywały aktualną wersję `mcp 1.27.2` i pozostawały zsynchronizowane z manifestami

#### Analiza luk w programie — pokrycie najnowszych funkcji specyfikacji

Zweryfikowano, że program nauczania obejmuje już wszystkie prymitywy wprowadzone/rozszerzone w MCP 2025-11-25, więc nie ma braków w treści:
- **Sampling**: Lekcja 03-GettingStarted/14-sampling oraz 05-AdvancedTopics/mcp-sampling
- **Elicitation (w tym tryb URL)**: Udokumentowano w 01-CoreConcepts i 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Udokumentowano w 00-Introduction, 01-CoreConcepts oraz 05-AdvancedTopics/mcp-root-contexts
- **Tasks (eksperymentalne, długotrwałe operacje)**: Udokumentowano w 01-CoreConcepts i 05-AdvancedTopics/mcp-protocol-features
- **Adnotacje narzędziowe** (`readOnlyHint` / `destructiveHint`): Udokumentowano w 01-CoreConcepts i 05-AdvancedTopics/mcp-protocol-features

### Usztywnienie bezpieczeństwa i usunięcie podatności zależności

Przeprowadzono pełne sprawdzenie bezpieczeństwa wszystkich manifestów zależności oraz kodu źródłowego przykładowych aplikacji, a następnie usunięto wszystkie zgłoszone ostrzeżenia npm oraz jeden problem w kodzie. Po remediacji `npm audit` raportuje **0 podatności** w każdym audytowanym katalogu.

#### Podatności npm w zależnościach (przechodnich) — naprawione

Skanowano wszystkie 15 załączonych plików `package-lock.json`. Podatności dotyczyły jedynie zależności przechodnich używanych przez narzędzie deweloperskie MCP Inspector, klienta OpenAI i SDK MCP; wszystkie zostały rozwiązane bez łamania przykładów:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** oraz **lab3/code/weather_mcp/inspector**: Podniesiono wersję `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), co usunęło zgłoszenia dotyczące pakietów `ajv`, `brace-expansion`, `diff`, `path-to-regexp` oraz `ws`. Dodano wpis `overrides` w npm wymuszający poprawkę `shell-quote@1.8.4`, aby wyeliminować krytyczne zgłoszenie w `concurrently`; odtworzono oba pliki blokad (obecnie 0 podatności)
- **03-GettingStarted/samples/typescript**: `npm audit fix` podniósł transitywną wersję `qs` (umiarkowana) do poprawionej wersji
- **03-GettingStarted/samples/javascript**: `npm audit fix` podniósł transitywną wersję `hono` (umiarkowana) do poprawionej wersji
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` podniósł transitywną wersję `form-data` (wysoka) do poprawionej wersji
- **03-GettingStarted/11-simple-auth/solution/typescript**: Wygenerowano brakujący plik `package-lock.json`, aby projekt był odtwarzalny i poddawany audytowi (0 podatności)

#### Poprawka bezpieczeństwa na poziomie kodu (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Usunięto `shell=True` z narzędzia `open_in_vscode`. Poprzednie wywołanie `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` pozwalało na interpretację metaznaków powłoki w ścieżce do folderu przez `cmd.exe` (wektor injection poleceń). Teraz uruchamiany jest bezpośrednio poprawiony `Code.exe` z folderem jako argumentem — bez powłoki — co jest funkcjonalnie równoważne i bezpieczne

#### Audyt zależności Pythona

- Przeskanowano wszystkie zestawy wymagań Pythona za pomocą `pip-audit`. Foldery `05-AdvancedTopics` oraz `03-GettingStarted/samples/python` zgłosiły **brak znanych podatności** (ich zakresy `mcp` / `httpx` / `pydantic` / `python-dotenv` rozwiązały się do obecnych załatanych wydań)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` wykrył w zależności przechodniej **`werkzeug` 3.1.1** trzy ostrzeżenia dotyczące funkcji `safe_join` i podatności na DoS przez nazwy urządzeń Windows — `CVE-2025-66221`, `CVE-2026-21860` oraz `CVE-2026-27199` (wszystkie naprawione w 3.1.6). Dodano wyraźne ograniczenie bezpieczeństwa `werkzeug>=3.1.6`, aby rozwiązać załataną wersję; potwierdzono, że ograniczenie rozwiązuje się poprawnie z używanym stosem `chainlit` / `mcp` / `semantic-kernel`

### Rebranding nazwy produktu

Zaktualizowano całą zawartość programu nauczania, aby odzwierciedlała rebranding produktu Microsoftu:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Zaktualizowano link do społeczności na Discordzie
- **AGENTS.md**: Zaktualizowano odniesienie do serwera Discord
- **README.md**: Zaktualizowano odniesienia do ekosystemu technologii
- **study_guide.md**: Zaktualizowano odniesienia w studium przypadku
- **05-AdvancedTopics/README.md**: Zaktualizowano tytuł i opis modułu 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Zaktualizowano nagłówek sekcji i opis
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Pełna aktualizacja tytułu modułu i zawartości
- **05-AdvancedTopics/mcp-security-entra/README.md**: Zaktualizowano link międzyodniesienia
- **07-LessonsfromEarlyAdoption/README.md**: Zaktualizowano odniesienia w studium przypadku
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Zaktualizowano nagłówek sekcji 9, odznaki i funkcjonalności
- **08-BestPractices/README.md**: Zaktualizowano link do społeczności Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Zaktualizowano odniesienie do kanału Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Zaktualizowano odniesienie do wdrożenia modelu
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Zaktualizowano tabelę usług AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Zaktualizowano odniesienia do zasobów

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Zaktualizowano główne odniesienia programu nauczania
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Zaktualizowano tytuł modułu, przegląd oraz wszystkie nagłówki modułu
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Zaktualizowano tytuł, cele nauki, instrukcje konfiguracji i zasoby
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Zaktualizowano tytuł, cele nauki, tabelę hostów MCP oraz odniesienia
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Zaktualizowano tytuł, odznaki, wymagania wstępne i zasoby
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Zaktualizowano odniesienia do Agent Builder i link do opinii zwrotnej
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Zaktualizowano wymagania wstępne oraz odniesienia do rozszerzeń

---

## 11 kwietnia 2026

### Nowa lekcja, poprawki dokumentacji i aktualizacje zależności

#### Dodano nową zawartość programu nauczania

**Moduł 05 - Zaawansowane Tematy**
- **Lekcja 5.17: Adwersaryjne rozumowanie wieloagentowe z MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nowy obszerny przewodnik obejmujący wzorzec adwersaryjnej debaty dla systemów wieloagentowych
  - Diagram architektury w mermaid: dwóch agentów → współdzielony serwer MCP → zapis debaty → sędzia → werdykt
  - Wspólny serwer narzędzi MCP (`web_search` + `run_python`) zaimplementowany w Pythonie i TypeScript
  - Przeciwnikowe systemowe podpowiedzi (ZA / PRZECIW / Sędzia) z wyraźnymi wymaganiami użycia narzędzi
  - Orkiestrator debaty w Pythonie, TypeScript i C#, zarządzający rundami i kierowaniem argumentów
  - Okablowanie MCP `ClientSession` dla orkiestratora do realnych wywołań narzędzi
  - Tabela przypadków użycia (wykrywanie halucynacji, modelowanie zagrożeń, przegląd projektów API, weryfikacja faktów, wybór technologii)
  - Rozważania bezpieczeństwa: wykonywanie w piaskownicy, walidacja wywołań narzędzi, ograniczanie szybkości, logowanie audytu
  - Strukturalne ćwiczenie z trzema praktycznymi scenariuszami (przegląd kodu, decyzja architektoniczna, moderacja treści)

#### Poprawki dokumentacji

**Moduł 03 - Pierwsze kroki**
- **05-stdio-server/README.md**: Poprawiono niedokończony przykład serwera stdio w TypeScript — dodano brakującą instancję transportu (`new StdioServerTransport()`) oraz wywołanie `server.connect(transport)`, aby odpowiadało przykładom w Python i .NET w tej samej sekcji
- **14-sampling/README.md**: Poprawiono literówkę — poprawiono `"Sampling is an davanced features"` na `"Sampling is an advanced feature"`

#### Aktualizacje programu nauczania

**Główne README.md**
- Dodano wpis 5.17 (Adwersaryjne rozumowanie wieloagentowe z MCP) do tabeli lekcji z bezpośrednim linkiem do nowej lekcji

**05-AdvancedTopics/README.md**
- Dodano wiersz Lekcji 5.17 do tabeli lekcji

**study_guide.md**
- Dodano temat Adwersaryjnego rozumowania wieloagentowego do mapy myśli i opisu wersyfikacyjnego Zaawansowanych Tematów

#### Poprawki kodu i bezpieczeństwa

**Moduł 05 - Agenci adwersaryjni (`mcp-adversarial-agents`)**
- **Poprawka bezpieczeństwa — wstrzyknięcie polecenia**: Zamieniono interpolację powłoki `execSync` na `execFile` + `promisify` w narzędziu `run_python` w TypeScript, wyeliminowano powierzchnię ataku wstrzyknięcia poleceń (kod pod kontrolą LLM jest teraz przekazywany jako literalny element argv bez udziału powłoki)
- **Okablowanie pętli narzędzi MCP**: Zaktualizowano orkiestratora dyskusji w Pythonie do użycia klienta `AsyncAnthropic` (zastępując blokującego synchronicznego `Anthropic`), przekazywanie działającej sesji `ClientSession` bezpośrednio do każdej tury agenta, pobieranie definicji narzędzi poprzez `session.list_tools()` w każdej turze oraz dyspozycję bloków `tool_use` przez `session.call_tool()` w pętli aż model wygeneruje ostateczną odpowiedź tekstową

#### Aktualizacje zależności

- Podniesiono wersję `hono` do 4.12.12 w wielu pakietach (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Podniesiono wersję `@hono/node-server` z 1.19.11 do 1.19.13 w pakietach TypeScript
- Podniesiono wersję `cryptography` z 46.0.5 do 46.0.7 w pakietach Python (10-StreamliningAIWorkflows laboratoria 3 i 4)
- Podniesiono wersję `lodash` z 4.17.23 do 4.18.1 w inspektorze 10-StreamliningAIWorkflows

#### Tłumaczenia

- Zsynchronizowano tłumaczenia na 48+ języków z najnowszymi zmianami źródłowymi (aktualizacja i18n)

---

## 5 lutego 2026

### Poprawki walidacji i nawigacji w całym repozytorium

#### Dodano nową treść do programu nauczania

**Moduł 03 - Rozpoczęcie pracy**
- **12-mcp-hosts/README.md**: Nowy, kompleksowy przewodnik konfiguracji hostów MCP
  - Przykłady konfiguracji Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Szablony konfiguracji JSON dla wszystkich głównych hostów
  - Tabela porównawcza typów transportu (stdio, SSE/HTTP, WebSocket)
  - Rozwiązywanie typowych problemów z połączeniem
  - Najlepsze praktyki bezpieczeństwa w konfiguracji hosta

- **13-mcp-inspector/README.md**: Nowy przewodnik debugowania MCP Inspector
  - Metody instalacji (npx, npm global, ze źródła)
  - Łączenie z serwerami przez stdio i HTTP/SSE
  - Testowanie narzędzi, zasobów oraz przepływów promptów
  - Integracja z VS Code w MCP Inspector
  - Typowe scenariusze debugowania wraz z rozwiązaniami

**Moduł 04 - Implementacja praktyczna**
- **pagination/README.md**: Nowy przewodnik implementacji paginacji
  - Wzorce paginacji oparte na cursorze w Pythonie, TypeScript, Javie
  - Obsługa paginacji po stronie klienta
  - Strategie projektowania wskazników (nieprzezroczyste vs. strukturalne)
  - Rekomendacje optymalizacji wydajności

**Moduł 05 - Zaawansowane zagadnienia**
- **mcp-protocol-features/README.md**: Nowy dogłębny opis funkcji protokołu
  - Implementacja powiadomień o postępie
  - Wzorce anulowania żądań
  - Szablony zasobów z wzorcami URI
  - Zarządzanie cyklem życia serwera
  - Kontrola poziomu logowania
  - Wzorce obsługi błędów z kodami JSON-RPC

#### Poprawki nawigacji (aktualizacja 24+ plików)

**Główne README modułów**
 Teraz zawiera linki zarówno do pierwszej lekcji JAK I kolejnego modułu

**Podfoldery 02-Security**
- Wszystkie 5 uzupełniających dokumentów bezpieczeństwa ma teraz sekcję "Co dalej":

**Pliki 09-CaseStudy**
- Wszystkie pliki case studies mają teraz nawigację sekwencyjną:

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
Naprawiono zepsuty link `READMEmd` → `README.md`, poprawiono nagłówek programu nauczania `Module 1-3` → `Module 0-3`, naprawiono ścieżkę uwzględniającą wielkość liter
Usunięto uszkodzoną duplikację Case Study 5

**Ulepszenia dla początkujących**
Dodano właściwe wprowadzenie, cele nauki i wymagania wstępne dla początkujących

#### Aktualizacje programu nauczania

**Główne README.md**
- Dodano wpisy 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paginacja), 5.16 (Funkcje protokołu) do tabeli programu nauczania

**README modułów**
Dodano lekcje 12 i 13 do listy lekcji
Dodano sekcję Praktyczne przewodniki z linkiem do paginacji
Dodano lekcje 5.15 (Custom Transport) i 5.16 (Funkcje protokołu)

**study_guide.md**
- Zaktualizowano mapę myśli o wszystkie nowe tematy: konfiguracja MCP Hosts, MCP Inspector, strategie paginacji, dogłębna analiza funkcji protokołu

## 28 stycznia 2026

### Przegląd zgodności ze Specyfikacją MCP 2025-11-25

#### Ulepszenia podstawowych pojęć (01-CoreConcepts/)
- **Nowy prymityw klienta - Roots**: Dodano kompleksową dokumentację prymitywu Roots klienta, umożliwiającego serwerom poznanie granic systemu plików oraz uprawnień dostępu
- **Adnotacje narzędzi**: Dodano dokumentację adnotacji zachowań narzędzi (`readOnlyHint`, `destructiveHint`) dla lepszych decyzji o wykonaniu narzędzi
- **Wywołania narzędzi w próbkowaniu**: Zaktualizowano dokumentację Sampling, aby uwzględnić parametry `tools` i `toolChoice` do wywoływania narzędzi sterowanych modelem podczas próbkowania
- **Wywołanie w trybie URL**: Dodano dokumentację wywołania URL dla interakcji zewnętrznych inicjowanych przez serwer
- **Zadania (eksperymentalne)**: Dodano nową sekcję opisującą eksperymentalną funkcję Tasks do trwałego wykonywania oraz opóźnionego pobierania wyników
- **Wsparcie ikon**: Zauważono, że narzędzia, zasoby, szablony zasobów i prompt’y mogą teraz zawierać ikony jako dodatkowe metadane

#### Aktualizacje dokumentacji
- **README.md**: Dodano wersję Specyfikacji MCP 2025-11-25 oraz wyjaśnienie wersjonowania według daty
- **study_guide.md**: Zaktualizowano mapę programu nauczania o Tasks oraz adnotacje narzędzi w sekcji Podstawowe pojęcia; zaktualizowano znacznik daty dokumentu

#### Weryfikacja zgodności ze specyfikacją
- **Wersja protokołu**: Potwierdzono, że cała dokumentacja odnosi się do Specyfikacji MCP 2025-11-25
- **Zgodność architektury**: Potwierdzono poprawność opisu architektury dwuwarstwowej (warstwa danych + warstwa transportu)
- **Dokumentacja prymitywów**: Potwierdzono dokumentację serwerowych prymitywów (Zasoby, Prompty, Narzędzia) i klientowskich prymitywów (Sampling, Elicitation, Logging, Roots)
- **Mechanizmy transportu**: Zweryfikowano dokumentację transportu STDIO i HTTP strumieniowego
- **Wytyczne bezpieczeństwa**: Potwierdzono zgodność z aktualną dokumentacją najlepszych praktyk bezpieczeństwa MCP

#### Kluczowe funkcje MCP 2025-11-25 udokumentowane
- **Odkrywanie OpenID Connect**: Odkrywanie serwera uwierzytelniającego przez OIDC
- **Metadokumenty klienta OAuth ID**: Zalecany mechanizm rejestracji klienta
- **JSON Schema 2020-12**: Domyślny dialekt dla definicji schematów MCP
- **System poziomów SDK**: Sformalizowane wymagania wsparcia i utrzymania funkcji SDK
- **Struktura nadzoru**: Sformalizowane Grupy robocze i Grupy zainteresowań w nadzorze MCP

### Duża aktualizacja dokumentacji bezpieczeństwa (02-Security/)

#### Integracja warsztatów MCP Security Summit Workshop (Sherpa)
- **Nowe praktyczne materiały szkoleniowe**: Dodano kompleksową integrację z [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) we wszystkich materiałach dotyczących bezpieczeństwa
- **Pokrycie trasy ekspedycji**: Udokumentowano pełną trasę od Base Camp do Summit
- **Zgodność z OWASP**: Wszystkie wytyczne bezpieczeństwa mapują się teraz na ryzyka MCP z OWASP Azure Security Guide

#### Integracja OWASP MCP Top 10
- **Nowa sekcja**: Dodano tabelę OWASP MCP Top 10 zagrożeń bezpieczeństwa z mitigacjami w Azure do głównego README bezpieczeństwa
- **Dokumentacja oparta na ryzyku**: Zaktualizowano mcp-security-controls-2025.md z odniesieniami do ryzyk OWASP MCP dla każdej domeny bezpieczeństwa
- **Architektura referencyjna**: Powiązano z architekturą referencyjną i wzorcami wdrożeniowymi OWASP MCP Azure Security Guide

#### Zaktualizowane pliki bezpieczeństwa
- **README.md**: Dodano przegląd warsztatów Sherpa, tabelę trasy ekspedycji, streszczenie OWASP MCP Top 10 oraz sekcję praktycznego treningu
- **mcp-security-controls-2025.md**: Zaktualizowano nagłówek do lutego 2026, dodano odniesienia do ryzyk OWASP (MCP01-MCP08), naprawiono niespójność wersji specyfikacji
- **mcp-security-best-practices-2025.md**: Dodano sekcję zasobów Sherpa i OWASP, zaktualizowano znacznik daty
- **mcp-best-practices.md**: Dodano sekcję treningu praktycznego z linkami do Sherpa i OWASP
- **azure-content-safety-implementation.md**: Dodano odniesienie OWASP MCP06, zgodność z Camp 3 Sherpa oraz sekcję dodatkowych zasobów

#### Nowe linki do zasobów
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Strony poszczególnych ryzyk OWASP MCP (MCP01-MCP10)

### Zgodność Specyfikacji MCP 2025-11-25 w całym programie nauczania

#### Moduł 03 - Rozpoczęcie pracy
- **Dokumentacja SDK**: Dodano Go SDK do oficjalnej listy SDK; zaktualizowano wszystkie odniesienia do SDK zgodnie z MCP 2025-11-25
- **Wyjaśnienie transportu**: Zaktualizowano opisy transportu STDIO i HTTP Streaming z wyraźnymi odniesieniami do specyfikacji

#### Moduł 04 - Implementacja praktyczna
- **Aktualizacje SDK**: Dodano Go SDK; zaktualizowano listę SDK o wersję specyfikacji
- **Specyfikacja autoryzacji**: Uaktualniono link do specyfikacji MCP Authorization do wersji 2025-11-25

#### Moduł 05 - Zaawansowane zagadnienia
- **Nowe funkcje**: Dodano przypis o nowych funkcjach MCP Specyfikacji 2025-11-25 (Tasks, Adnotacje narzędzi, Wywołanie URL, Roots)
- **Zasoby bezpieczeństwa**: Dodano linki OWASP MCP Top 10 i warsztaty Sherpa do dodatkowych materiałów

#### Moduł 06 - Wkład społeczności
- **Lista SDK**: Dodano SDK Swift i Rust; zaktualizowano link do specyfikacji MCP 2025-11-25
- **Odniesienie do specyfikacji**: Uaktualniono link do specyfikacji MCP na bezpośredni URL dokumentu

#### Moduł 07 - Lekcje z wczesnej adopcji
- **Aktualizacje zasobów**: Dodano link specyfikacji MCP 2025-11-25 oraz OWASP MCP Top 10 do dodatkowych materiałów

#### Moduł 08 - Najlepsze praktyki
- **Wersja specyfikacji**: Zaktualizowano odniesienie MCP do 2025-11-25
- **Zasoby bezpieczeństwa**: Dodano OWASP MCP Top 10 i warsztaty Sherpa do dodatkowych materiałów

#### Moduł 10 - Optymalizacja przepływów AI
- **Aktualizacja odznaki**: Zmieniono odznakę wersji MCP z wersji SDK (1.9.3) na wersję specyfikacji (2025-11-25)
- **Linki do zasobów**: Zaktualizowano link do Specyfikacji MCP; dodano OWASP MCP Top 10

#### Moduł 11 - Laboratoria MCP Server na żywo
- **Odniesienie do specyfikacji**: Zaktualizowano link Specyfikacji MCP na wersję 2025-11-25
- **Zasoby bezpieczeństwa**: Dodano OWASP MCP Top 10 do oficjalnych zasobów

## 18 grudnia 2025

### Aktualizacja dokumentacji bezpieczeństwa - Specyfikacja MCP 2025-11-25

#### Najlepsze praktyki bezpieczeństwa MCP (02-Security/mcp-best-practices.md) - aktualizacja wersji specyfikacji
- **Aktualizacja wersji protokołu**: Zaktualizowano do najnowszej Specyfikacji MCP 2025-11-25 (wydanej 25 listopada 2025)
  - Zaktualizowano wszystkie odniesienia wersji z 2025-06-18 na 2025-11-25
  - Zmieniono daty w dokumentach z 18 sierpnia 2025 na 18 grudnia 2025
  - Zweryfikowano, że wszystkie URL specyfikacji wskazują na aktualną dokumentację
- **Weryfikacja zawartości**: Kompleksowa walidacja najlepszych praktyk bezpieczeństwa pod kątem aktualnych standardów
  - **Rozwiązania Microsoft Security**: Zweryfikowano aktualną terminologię i linki dla Prompt Shields (wcześniej „wykrywanie ryzyka jailbreak”), Azure Content Safety, Microsoft Entra ID i Azure Key Vault
  - **Bezpieczeństwo OAuth 2.1**: Potwierdzono zgodność z najnowszymi zaleceniami bezpieczeństwa OAuth
  - **Standardy OWASP**: Zweryfikowano, że odniesienia do OWASP Top 10 dla LLM pozostają aktualne
  - **Usługi Azure**: Zweryfikowano linki i najlepsze praktyki dla Microsoft Azure
- **Zgodność ze standardami**: Wszystkie cytowane standardy bezpieczeństwa potwierdzone jako aktualne
  - Ramy zarządzania ryzykiem AI NIST
  - ISO 27001:2022
  - Najlepsze praktyki bezpieczeństwa OAuth 2.1
  - Ramy bezpieczeństwa i zgodności Azure
- **Zasoby wdrożeniowe**: Zweryfikowano wszystkie linki do przewodników wdrożeniowych i zasobów
  - Wzorce uwierzytelniania w Azure API Management
  - Przewodniki integracji Microsoft Entra ID
  - Zarządzanie sekretami w Azure Key Vault
  - Pipeline’y oraz narzędzia monitorujące DevSecOps

### Weryfikacja jakości dokumentacji
- **Zgodność ze specyfikacją**: Zapewniono, że wszystkie wymagania MCP dotyczące bezpieczeństwa (MUST/MUST NOT) są zgodne z najnowszą specyfikacją
- **Aktualność zasobów**: Zweryfikowano wszystkie zewnętrzne linki do dokumentacji Microsoft, standardów bezpieczeństwa i przewodników wdrożeniowych
- **Zakres najlepszych praktyk**: Potwierdzono kompleksowe pokrycie zagadnień uwierzytelniania, autoryzacji, zagrożeń specyficznych dla AI, bezpieczeństwa łańcucha dostaw i wzorców korporacyjnych

## 6 października 2025

### Rozszerzenie sekcji Rozpoczęcie pracy - Zaawansowane użycie serwera i prosta autoryzacja

#### Zaawansowane użycie serwera (03-GettingStarted/10-advanced)
- **Dodano nowy rozdział**: Wprowadzono kompleksowy przewodnik zaawansowanego użycia serwera MCP, obejmujący zarówno architekturę serwera regularnego, jak i niskopoziomowego.
  - **Serwer regularny vs. niskopoziomowy**: Szczegółowe porównanie i przykłady kodu w Python i TypeScript dla obu podejść.
  - **Projekt oparty na handlerach**: Wyjaśnienie zarządzania narzędziami/zasobami/promptami opartego na handlerach dla skalowalnych i elastycznych implementacji serwera.
  - **Wzorce praktyczne**: Scenariusze rzeczywistego zastosowania, gdzie wzorce serwera niskopoziomowego są korzystne dla zaawansowanych funkcji i architektury.
#### Prosta Autoryzacja (03-GettingStarted/11-simple-auth)
- **Dodano Nowy Rozdział**: Przewodnik krok po kroku dotyczący implementacji prostej autoryzacji w serwerach MCP.
  - **Koncepcje Autoryzacji**: Jasne wyjaśnienie różnicy między autoryzacją a uprawnieniami oraz obsługa poświadczeń.
  - **Podstawowa Implementacja Autoryzacji**: Wzorce autoryzacji oparte na middleware w Pythonie (Starlette) i TypeScript (Express) wraz z przykładami kodu.
  - **Przejście do Zaawansowanego Bezpieczeństwa**: Wskazówki, jak zacząć od prostego uwierzytelniania i przejść do OAuth 2.1 oraz RBAC, z odniesieniami do modułów zaawansowanego bezpieczeństwa.

Te dodatki dostarczają praktyczne, warsztatowe wskazówki dotyczące budowania bardziej solidnych, bezpiecznych i elastycznych implementacji serwerów MCP, łącząc podstawowe koncepcje z zaawansowanymi wzorcami produkcyjnymi.

## 29 września 2025

### Laboratoria Integracji Bazy Danych Serwera MCP - Kompleksowa Ścieżka Nauki Praktycznej

#### 11-MCPServerHandsOnLabs - Nowy Kompletny Program Integracji Bazy Danych
- **Pełna Ścieżka 13 Laboratoriów**: Dodano kompleksowy, praktyczny kurs budowania produkcyjnych serwerów MCP z integracją bazy danych PostgreSQL
  - **Implementacja w Świecie Rzeczywistym**: Przypadek użycia analityki Zava Retail pokazujący wzorce klasy korporacyjnej
  - **Strukturalny Postęp Nauki**:
    - **Laboratoria 00-03: Podstawy** - Wprowadzenie, Architektura Rdzeniowa, Bezpieczeństwo i Wielodzierżawczość, Konfiguracja Środowiska
    - **Laboratoria 04-06: Budowa Serwera MCP** - Projektowanie Bazy i Schematy, Implementacja Serwera MCP, Tworzenie Narzędzi  
    - **Laboratoria 07-09: Funkcje Zaawansowane** - Integracja Wyszukiwania Semantycznego, Testowanie i Debugowanie, Integracja z VS Code
    - **Laboratoria 10-12: Produkcja i Najlepsze Praktyki** - Strategie Wdrożenia, Monitoring i Obserwowalność, Najlepsze Praktyki i Optymalizacja
  - **Technologie Korporacyjne**: Framework FastMCP, PostgreSQL z pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Funkcje Zaawansowane**: Bezpieczeństwo na poziomie wiersza (RLS), wyszukiwanie semantyczne, dostęp do danych wielodzierżawczych, wektorowe osadzenia, monitoring w czasie rzeczywistym

#### Standaryzacja Terminologii - Zamiana Modułów na Laboratoria
- **Kompleksowa Aktualizacja Dokumentacji**: Systematyczna aktualizacja wszystkich plików README w 11-MCPServerHandsOnLabs z użyciem terminologii "Laboratorium" zamiast "Moduł"
  - **Nagłówki Sekcji**: Uaktualniono "Co Obejmuje Ten Moduł" na "Co Obejmuje To Laboratorium" we wszystkich 13 laboratoriach
  - **Opis Treści**: Zmieniono "Ten moduł zapewnia..." na "To laboratorium zapewnia..." w całej dokumentacji
  - **Cele Nauki**: Uaktualniono "Pod koniec tego modułu..." na "Pod koniec tego laboratorium..."
  - **Linki Nawigacyjne**: Zamieniono wszystkie odniesienia "Moduł XX:" na "Laboratorium XX:" w przekierowaniach i nawigacji
  - **Śledzenie Postępów**: Uaktualniono "Po ukończeniu tego modułu..." na "Po ukończeniu tego laboratorium..."
  - **Zachowane Odniesienia Techniczne**: Zachowano odniesienia do modułów Pythona w plikach konfiguracyjnych (np. `"module": "mcp_server.main"`)

#### Ulepszenie Przewodnika Nauki (study_guide.md)
- **Wizualna Mapa Programu Nauki**: Dodano nową sekcję "11. Laboratoria Integracji Baz Danych" ze szczegółową wizualizacją struktury laboratoriów
- **Struktura Repozytorium**: Zmieniono z 10 do 11 głównych sekcji wraz z opisem 11-MCPServerHandsOnLabs
- **Wskazówki Dotyczące Ścieżki Nauki**: Rozbudowano instrukcje nawigacji obejmujące sekcje 00-11
- **Zakres Technologiczny**: Dodano szczegóły dotyczące FastMCP, PostgreSQL, integracji usług Azure
- **Efekty Nauki**: Podkreślono rozwój produkcyjnych serwerów, wzorce integracji baz danych i bezpieczeństwo korporacyjne

#### Ulepszenie Struktury Głównego README
- **Terminologia oparta na Laboratoriach**: Aktualizacja głównego README.md w 11-MCPServerHandsOnLabs do spójnego używania struktury "Laboratorium"
- **Organizacja Ścieżki Nauki**: Jasny postęp od koncepcji podstawowych przez zaawansowaną implementację do produkcyjnego wdrożenia
- **Waga Praktyczna**: Nacisk na praktyczne, warsztatowe uczenie się z wzorcami i technologiami klasy korporacyjnej

### Poprawa Jakości i Spójności Dokumentacji
- **Nacisk na Nauczanie Praktyczne**: Wzmocniono podejście oparte na laboratoriach w całej dokumentacji
- **Akcent na Wzorce Korporacyjne**: Podkreślono produkcyjne implementacje i kwestie bezpieczeństwa przedsiębiorstw
- **Integracja Technologiczna**: Kompleksowe omówienie nowoczesnych usług Azure i wzorców integracji AI
- **Postęp Nauki**: Przejrzysta, uporządkowana ścieżka od koncepcji podstawowych do wdrożenia produkcyjnego

## 26 września 2025

### Udoskonalenia Case Studies - Integracja z GitHub MCP Registry

#### Case Studies (09-CaseStudy/) - Skupienie na Rozwoju Ekosystemu
- **README.md**: Znaczące rozszerzenie z kompleksowym studium przypadku GitHub MCP Registry
  - **Studium przypadku GitHub MCP Registry**: Nowe, obszerne studium przypadku dotyczące uruchomienia GitHub MCP Registry we wrześniu 2025
    - **Analiza Problemów**: Szczegółowa analiza problemów z rozproszonym odkrywaniem i wdrażaniem serwerów MCP
    - **Architektura Rozwiązania**: Podejście scentralizowanego rejestru GitHub z jednopunktową instalacją dla VS Code
    - **Wpływ na Biznes**: Mierzalna poprawa w onboarding developerów i produktywności
    - **Wartość strategiczna**: Skupienie na modułowej dystrybucji agentów i interoperacyjności narzędzi
    - **Rozwój Ekosystemu**: Pozycjonowanie jako fundament platformy integracyjnej agentów
  - **Ulepszona Struktura Case Studies**: Aktualizacja wszystkich siedmiu studiów przypadku z jednolitą formą i pełnymi opisami
    - Azure AI Travel Agents: Nacisk na orkiestrację wieloagentową
    - Integracja Azure DevOps: Automatyzacja procesów
    - Pobieranie dokumentacji w czasie rzeczywistym: Implementacja klienta konsoli Python
    - Generator planu nauki interaktywny: Konwersacyjna aplikacja webowa Chainlit
    - Dokumentacja w edytorze: Integracja z VS Code i GitHub Copilot
    - Azure API Management: Wzorce integracji API korporacyjnych
    - GitHub MCP Registry: Rozwój ekosystemu i platforma społecznościowa
  - **Kompleksowe Podsumowanie**: Przepisana sekcja podsumowująca siedem case studies obejmujących różne wymiary implementacji MCP
    - Integracja korporacyjna, orkiestracja multi-agentowa, produktywność deweloperów
    - Rozwój ekosystemu, zastosowania edukacyjne
    - Rozszerzone wglądy w architektoniczne wzorce, strategie implementacji i najlepsze praktyki
    - Nacisk na MCP jako dojrzały protokół produkcyjny

#### Aktualizacje Przewodnika Nauki (study_guide.md)
- **Wizualna Mapa Programu Nauki**: Uaktualnienie mapy myśli o uwzględnienie GitHub MCP Registry w sekcji Case Studies
- **Opis Case Studies**: Rozszerzenie z opisów ogólnych do szczegółowego rozbicia siedmiu kompleksowych studiów przypadku
- **Struktura Repozytorium**: Aktualizacja sekcji 10, aby odzwierciedlała pełen zakres case studies wraz ze szczegółami implementacji
- **Integracja Zmian w Changelog**: Dodano wpis z 26 września 2025 dokumentujący dodanie GitHub MCP Registry i rozbudowę case studies
- **Aktualizacja Daty**: Aktualizacja sygnatury czasowej w stopce na najnowszą rewizję (26 września 2025)

### Poprawa Jakości Dokumentacji
- **Poprawa Spójności**: Standaryzacja formatu i struktury case studies dla wszystkich siedmiu przykładów
- **Kompleksowy Zakres**: Case studies obejmują obecnie scenariusze korporacyjne, produktywności deweloperów i rozwoju ekosystemu
- **Pozycjonowanie Strategiczne**: Wzmocniony nacisk na MCP jako fundament platformy do implementacji systemów agentowych
- **Integracja Zasobów**: Aktualizacja dodatkowych źródeł o link do GitHub MCP Registry

## 15 września 2025

### Rozbudowa Zaawansowanych Tematów - Własne Transports & Inżynieria Kontekstu

#### Niestandardowe Transports MCP (05-AdvancedTopics/mcp-transport/) - Nowy Przewodnik Zaawansowanej Implementacji
- **README.md**: Kompletny przewodnik implementacji niestandardowych mechanizmów transportu MCP
  - **Transport Azure Event Grid**: Kompleksowa implementacja bezserwerowego transportu zdarzeniowego
    - Przykłady w C#, TypeScript i Python z integracją Azure Functions
    - Wzorce architektury zdarzeniowej dla skalowalnych rozwiązań MCP
    - Odbiorniki webhook i obsługa push wiadomości
  - **Transport Azure Event Hubs**: Implementacja strumieniowego transportu o wysokiej przepustowości
    - Możliwości strumieniowania w czasie rzeczywistym dla scenariuszy niskich opóźnień
    - Strategie partycjonowania i zarządzanie punktami kontrolnymi
    - Grupowanie wiadomości i optymalizacja wydajności
  - **Wzorce Integracji Korporacyjnej**: Przykłady produkcyjnych architektur
    - Rozproszone przetwarzanie MCP przez wiele Azure Functions
    - Hybrydowe architektury transportowe łączące różne typy transportów
    - Trwałość wiadomości, niezawodność i strategie obsługi błędów
  - **Bezpieczeństwo i Monitoring**: Integracja Azure Key Vault i wzorce obserwowalności
    - Uwierzytelnianie tożsamości zarządzanej i dostęp minimum koniecznego
    - Telemetria Application Insights i monitoring wydajności
    - Wzorce bezpieczników i odporność na błędy
  - **Frameworki Testowe**: Kompleksowe strategie testowania niestandardowych transportów
    - Testy jednostkowe z imitacjami i frameworkami mockującymi
    - Testy integracyjne z Azure Test Containers
    - Rozważania dotyczące testów wydajności i obciążeniowych

#### Inżynieria Kontekstu (05-AdvancedTopics/mcp-contextengineering/) - Nowa Dziedzina AI
- **README.md**: Obszerny przegląd inżynierii kontekstu jako rozwijającej się dyscypliny
  - **Podstawowe Zasady**: Pełne udostępnianie kontekstu, świadomość decyzji działania, zarządzanie oknem kontekstu
  - **Zgodność z Protokółem MCP**: Jak projekt MCP adresuje wyzwania inżynierii kontekstu
    - Ograniczenia okna kontekstowego i strategie progresywnego ładowania
    - Określanie trafności i dynamiczne pobieranie kontekstu
    - Obsługa kontekstu multimodalnego i zagadnienia bezpieczeństwa
  - **Podejścia Implementacyjne**: Architektury jednoprocesowe vs. wieloagentowe
    - Techniki dzielenia i priorytetyzacji kontekstu
    - Progresywne ładowanie i kompresja kontekstu
    - Warstwowe podejścia do kontekstu i optymalizacja pobierania
  - **System Pomiarowy**: Pojawiające się metryki efektywności kontekstu
    - Efektywność wejścia, wydajność, jakość i doświadczenie użytkownika
    - Eksperymentalne podejścia do optymalizacji kontekstu
    - Analiza błędów i metodologie usprawnień

#### Aktualizacje Nawigacji Kształcenia (README.md)
- **Rozbudowana Struktura Modułu**: Uaktualnienie tabeli programu nauki o nowe tematy zaawansowane
  - Dodano wpisy Inżynieria Kontekstu (5.14) i Niestandardowy Transport (5.15)
  - Spójne formatowanie i linki nawigacyjne we wszystkich modułach
  - Aktualizacja opisów odzwierciedlająca bieżący zakres tematyczny

### Usprawnienia Struktury Katalogów
- **Standaryzacja Nazewnictwa**: Zmieniono "mcp transport" na "mcp-transport" dla spójności z innymi folderami tematów zaawansowanych
- **Organizacja Treści**: Wszystkie foldery 05-AdvancedTopics mają teraz jednolity wzorzec nazewnictwa (mcp-[temat])

### Poprawa Jakości Dokumentacji
- **Zgodność ze Specyfikacją MCP**: Wszystkie nowe treści odwołują się do specyfikacji MCP 2025-06-18
- **Przykłady Wielojęzyczne**: Obszerny kod w C#, TypeScript i Pythonie
- **Nacisk na Środowisko Korporacyjne**: Gotowe do produkcji wzorce i integracja z chmurą Azure
- **Dokumentacja Wizualna**: Diagramy Mermaid ilustrujące architekturę i przepływy

## 18 sierpnia 2025

### Kompleksowa Aktualizacja Dokumentacji - Standardy MCP 2025-06-18

#### Najlepsze Praktyki Bezpieczeństwa MCP (02-Security/) - Całkowita Modernizacja
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Pełne przepisanie zgodne ze Specyfikacją MCP 2025-06-18
  - **Wymagania Obowiązkowe**: Dodano wyraźne wymagania MUSI/NIE WOLNO z oficjalnej specyfikacji z czytelnymi wskaźnikami wizualnymi
  - **12 Głównych Praktyk Bezpieczeństwa**: Przekształcone z listy 15-punktowej na kompleksowe dziedziny bezpieczeństwa
    - Bezpieczeństwo Tokenów i Uwierzytelnianie z integracją zewnętrznego dostawcy tożsamości
    - Zarządzanie Sesją i Bezpieczeństwo Transportu z wymaganiami kryptograficznymi
    - Ochrona Specyficzna dla AI z integracją Microsoft Prompt Shields
    - Kontrola Dostępu i Uprawnienia z zasadą minimalnych uprawnień
    - Bezpieczeństwo Treści i Monitoring z integracją Azure Content Safety
    - Bezpieczeństwo Łańcucha Dostaw z pełną weryfikacją komponentów
    - Bezpieczeństwo OAuth i Zapobieganie Atakom Confused Deputy z implementacją PKCE
    - Reagowanie na Incydenty i Odzyskiwanie z automatyzacją
    - Zgodność i Zarządzanie z wymogami regulacyjnymi
    - Zaawansowane Kontrole Bezpieczeństwa z architekturą zero trust
    - Integracja z Ekosystemem Bezpieczeństwa Microsoft z kompleksowymi rozwiązaniami
    - Ciąg Evolution Bezpieczeństwa z adaptacyjnymi praktykami
  - **Rozwiązania Microsoft Security**: Ulepszone wytyczne integracji Prompt Shields, Azure Content Safety, Entra ID i GitHub Advanced Security
  - **Zasoby Implementacji**: Skategoryzowane kompleksowe odnośniki do dokumentacji MCP, rozwiązań Microsoft Security, standardów bezpieczeństwa i przewodników implementacji

#### Zaawansowane Kontrole Bezpieczeństwa (02-Security/) - Implementacja Klasy Korporacyjnej
- **MCP-SECURITY-CONTROLS-2025.md**: Kompletny przegląd ram bezpieczeństwa klasy korporacyjnej
  - **9 Kompleksowych Dziedzin Bezpieczeństwa**: Rozszerzenie od podstawowych kontroli do szczegółowych ram
    - Zaawansowane Uwierzytelnianie i Autoryzacja z integracją Microsoft Entra ID
    - Bezpieczeństwo Tokenów i Kontrole Anti-Passthrough z kompleksową walidacją
    - Kontrole Bezpieczeństwa Sesji z zapobieganiem przejęciu
    - Kontrole Bezpieczeństwa Specyficzne dla AI z zapobieganiem wstrzyknięciom promptów i zatruwaniu narzędzi
    - Zapobieganie Atakom Confused Deputy z zabezpieczeniami proxy OAuth
    - Bezpieczeństwo Wykonywania Narzędzi z izolacją i sandboxingiem
    - Kontrole Bezpieczeństwa Łańcucha Dostaw z weryfikacją zależności
    - Kontrole Monitoringu i Wykrywania z integracją SIEM
    - Reagowanie na Incydenty i Odzyskiwanie z automatyzacją
  - **Przykłady Implementacji**: Dodano szczegółowe bloki YAML i przykłady kodu
  - **Integracja Rozwiązań Microsoft**: Kompleksowe omówienie usług bezpieczeństwa Azure, GitHub Advanced Security i zarządzania tożsamością korporacyjną

#### Zaawansowane Tematy Bezpieczeństwa (05-AdvancedTopics/mcp-security/) - Implementacja Produkcyjna
- **README.md**: Kompletny przepis dotyczący implementacji zabezpieczeń korporacyjnych
  - **Zgodność z Obecną Specyfikacją**: Aktualizacja do MCP Specification 2025-06-18 z obowiązkowymi wymogami bezpieczeństwa
  - **Ulepszone Uwierzytelnianie**: Integracja Microsoft Entra ID z kompleksowymi przykładami .NET i Java Spring Security
  - **Integracja Bezpieczeństwa AI**: Wdrożenie Microsoft Prompt Shields i Azure Content Safety z przykładami w Pythonie
  - **Zaawansowane Przeciwdziałanie Zagrożeniom**: Kompleksowe przykłady implementacji
    - Zapobieganie atakom Confused Deputy z PKCE i walidacją zgody użytkownika
    - Zapobieganie przepuszczaniu tokenów z walidacją odbiorcy i bezpiecznym zarządzaniem tokenami
    - Zapobieganie przejęciom sesji z wiązaniem kryptograficznym i analizą zachowań
  - **Integracja Bezpieczeństwa Korporacyjnego**: Monitoring Azure Application Insights, kanały wykrywania zagrożeń i bezpieczeństwo łańcucha dostaw
  - **Lista Kontrolna Implementacji**: Jasne rozróżnienie kontroli obowiązkowych i zalecanych oraz korzyści ze środowiska zabezpieczeń Microsoft

### Jakość Dokumentacji i Zgodność ze Standardami
- **Odwołania do specyfikacji**: Zaktualizowano wszystkie odwołania do aktualnej specyfikacji MCP z dnia 2025-06-18  
- **Ekosystem zabezpieczeń Microsoft**: Udoskonalono wytyczne dotyczące integracji we wszystkich dokumentach dotyczących bezpieczeństwa  
- **Praktyczna implementacja**: Dodano szczegółowe przykłady kodu w .NET, Java i Python z wzorcami dla przedsiębiorstw  
- **Organizacja zasobów**: Kompleksowa kategoryzacja oficjalnej dokumentacji, standardów bezpieczeństwa i przewodników wdrożeniowych  
- **Wskaźniki wizualne**: Jasne oznaczenie wymagań obowiązkowych vs. praktyk zalecanych  


#### Podstawowe pojęcia (01-CoreConcepts/) - Całkowita modernizacja  
- **Aktualizacja wersji protokołu**: Zaktualizowano do odwołania aktualnej specyfikacji MCP z dnia 2025-06-18 z wersjonowaniem opartym na dacie (format RRRR-MM-DD)  
- **Udoskonalenie architektury**: Rozszerzone opisy Hostów, Klientów i Serwerów, aby odzwierciedlić aktualne wzorce architektury MCP  
  - Hosty jasno określone jako aplikacje AI koordynujące wiele połączeń klientów MCP  
  - Klienci opisani jako konektory protokołu utrzymujące relacje jeden do jednego z serwerami  
  - Serwery rozszerzone o scenariusze wdrożenia lokalnego vs. zdalnego  
- **Przebudowa prymitywów**: Kompleksowa przebudowa prymitywów serwera i klienta  
  - Prymitywy serwera: Zasoby (źródła danych), Podpowiedzi (szablony), Narzędzia (funkcje wykonywalne) z szczegółowymi opisami i przykładami  
  - Prymitywy klienta: Próbowanie (ukończenia LLM), Elicytacja (wejście użytkownika), Logowanie (debugowanie/monitoring)  
  - Zaktualizowano z aktualnymi wzorcami metod odkrywania (`*/list`), pobierania (`*/get`) i wywoływania (`*/call`)  
- **Architektura protokołu**: Wprowadzono dwuwarstwowy model architektury  
  - Warstwa danych: oparte na JSON-RPC 2.0, z zarządzaniem cyklem życia i prymitywami  
  - Warstwa transportowa: mechanizmy transportu STDIO (lokalne) i HTTP strumieniowy z SSE (zdalny)  
- **Ramowy model bezpieczeństwa**: Kompleksowe zasady bezpieczeństwa obejmujące wyraźną zgodę użytkownika, ochronę prywatności danych, bezpieczeństwo wykonywania narzędzi i zabezpieczenia warstwy transportowej  
- **Wzorce komunikacji**: Zaktualizowano komunikaty protokołu pokazujące przepływy inicjalizacji, odkrywania, wykonywania i powiadomień  
- **Przykłady kodu**: Odświeżone przykłady w różnych językach (.NET, Java, Python, JavaScript) odzwierciedlające aktualne wzorce SDK MCP  

#### Bezpieczeństwo (02-Security/) - Kompleksowy przegląd bezpieczeństwa  
- **Dostosowanie do standardów**: Pełna zgodność z wymaganiami bezpieczeństwa specyfikacji MCP 2025-06-18  
- **Ewolucja uwierzytelniania**: Udokumentowana ewolucja z niestandardowych serwerów OAuth do delegacji dostawców tożsamości zewnętrznych (Microsoft Entra ID)  
- **Analiza zagrożeń specyficznych dla AI**: Rozszerzone omówienie nowoczesnych wektorów ataków AI  
  - Szczegółowe scenariusze ataków wstrzyknięcia podpowiedzi z przykładami z rzeczywistych zastosowań  
  - Mechanizmy zatruwania narzędzi i wzorce ataków „rug pull”  
  - Ataki zatruwania okna kontekstu i zamieszania modeli  
- **Rozwiązania bezpieczeństwa Microsoft AI**: Kompleksowe omówienie ekosystemu bezpieczeństwa Microsoft  
  - AI Prompt Shields z zaawansowanymi technikami wykrywania, wyróżniania i rozdzielania  
  - Wzorce integracji Azure Content Safety  
  - GitHub Advanced Security dla ochrony łańcucha dostaw  
- **Zaawansowane techniki łagodzenia zagrożeń**: Szczegółowe kontrole bezpieczeństwa dla  
  - Przejęcia sesji z MCP-specyficznymi scenariuszami ataków i wymaganiami kryptograficznymi dla identyfikatorów sesji  
  - Problemów podatności proxy MCP w scenariuszach confused deputy z wyraźnymi wymaganiami zgody  
  - Luk związanych z token passthrough z obowiązkowymi kontrolami weryfikacji  
- **Bezpieczeństwo łańcucha dostaw**: Poszerzone omówienie łańcucha dostaw AI obejmujące modele fundamentowe, usługi osadzania, dostawców kontekstu i API firm trzecich  
- **Bezpieczeństwo fundamentów**: Wzbogacona integracja ze wzorcami bezpieczeństwa przedsiębiorstw, w tym architekturą zero trust i ekosystemem zabezpieczeń Microsoft  
- **Organizacja zasobów**: Skategoryzowano kompleksowe linki do zasobów według typu (Oficjalna dokumentacja, Standardy, Badania, Rozwiązania Microsoft, Przewodniki wdrożeniowe)  

### Poprawki jakości dokumentacji  
- **Strukturalne cele nauki**: Udoskonalone cele nauki z konkretnymi, wykonalnymi wynikami  
- **Odwołania krzyżowe**: Dodano linki pomiędzy powiązanymi tematami bezpieczeństwa i podstawowych pojęć  
- **Aktualne informacje**: Zaktualizowano wszystkie odwołania do dat i linków specyfikacji do obowiązujących standardów  
- **Wytyczne wdrożeniowe**: Dodano konkretne, wykonalne wytyczne wdrożeniowe w obu sekcjach  

## 16 lipca 2025  

### README i ulepszenia nawigacji  
- Całkowicie przeprojektowano nawigację programu nauczania w README.md  
- Zastąpiono tagi `<details>` bardziej dostępnym formatem opartym na tabeli  
- Utworzono alternatywne opcje układu w nowym folderze "alternative_layouts"  
- Dodano przykłady nawigacji w stylu kart, zakładek i akordeonu  
- Zaktualizowano sekcję struktury repozytorium o wszystkie najnowsze pliki  
- Ulepszono sekcję "Jak korzystać z tego programu nauczania" jasnymi rekomendacjami  
- Zaktualizowano linki specyfikacji MCP wskazujące na poprawne adresy URL  
- Dodano sekcję Inżynierii kontekstu (5.14) do struktury programu nauczania  

### Aktualizacje przewodnika do nauki  
- Kompletnie zrewidowano przewodnik do nauki, aby był zgodny z aktualną strukturą repozytorium  
- Dodano nowe sekcje dotyczące klientów i narzędzi MCP oraz popularnych serwerów MCP  
- Zaktualizowano wizualną mapę programu nauczania, aby wiernie odzwierciedlała wszystkie tematy  
- Ulepszono opisy tematów zaawansowanych, aby objąć wszystkie specjalistyczne obszary  
- Zaktualizowano sekcję studiów przypadków, aby odzwierciedlała rzeczywiste przykłady  
- Dodano ten kompleksowy dziennik zmian  

### Wkłady społeczności (06-CommunityContributions/)  
- Dodano szczegółowe informacje o serwerach MCP do generowania obrazów  
- Dodano obszerną sekcję dotyczącą używania Claude w VSCode  
- Dodano instrukcje konfiguracji i użytkowania klienta terminalowego Cline  
- Zaktualizowano sekcję klientów MCP, aby uwzględnić wszystkie popularne opcje klientów  
- Ulepszono przykłady wkładów o bardziej dokładne fragmenty kodu  

### Tematy zaawansowane (05-AdvancedTopics/)  
- Zorganizowano wszystkie foldery tematyczne zgodnie ze spójnym nazewnictwem  
- Dodano materiały i przykłady inżynierii kontekstu  
- Dodano dokumentację integracji agenta Foundry  
- Ulepszono dokumentację integracji bezpieczeństwa Entra ID  

## 11 czerwca 2025  

### Pierwsze wydanie  
- Wydano pierwszą wersję programu MCP dla początkujących  
- Utworzono podstawową strukturę dla wszystkich 10 głównych sekcji  
- Wdrożono wizualną mapę programu nauczania do nawigacji  
- Dodano początkowe przykładowe projekty w różnych językach programowania  

### Rozpoczęcie pracy (03-GettingStarted/)  
- Stworzono pierwsze przykłady implementacji serwera  
- Dodano wytyczne dotyczące tworzenia klienta  
- Uwzględniono instrukcje integracji klienta LLM  
- Dodano dokumentację integracji z VS Code  
- Wdrożono przykłady serwerów opartych na Server-Sent Events (SSE)  

### Podstawowe pojęcia (01-CoreConcepts/)  
- Dodano szczegółowe wyjaśnienie architektury klient-serwer  
- Stworzono dokumentację kluczowych komponentów protokołu  
- Udokumentowano wzorce komunikatów w MCP  

## 23 maja 2025  

### Struktura repozytorium  
- Inicjalizacja repozytorium z podstawową strukturą folderów  
- Utworzenie plików README dla każdego głównego działu  
- Konfiguracja infrastruktury tłumaczeń  
- Dodano zasoby obrazów i diagramy  

### Dokumentacja  
- Pierwotne utworzenie README.md z przeglądem programu nauczania  
- Dodano pliki CODE_OF_CONDUCT.md i SECURITY.md  
- Wdrożono SUPPORT.md z poradami dotyczącymi uzyskiwania pomocy  
- Stworzono wstępną strukturę przewodnika do nauki  

## 15 kwietnia 2025  

### Planowanie i ramy  
- Wstępne planowanie programu MCP dla początkujących  
- Określenie celów nauczania i grupy docelowej  
- Nakreślenie struktury programu w 10 sekcjach  
- Opracowanie koncepcyjnych ram dla przykładów i studiów przypadków  
- Utworzenie wstępnych prototypów przykładów dla kluczowych koncepcji

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->