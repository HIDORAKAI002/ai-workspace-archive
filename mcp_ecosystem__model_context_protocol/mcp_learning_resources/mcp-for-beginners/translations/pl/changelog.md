# Dziennik zmian: Program nauczania MCP dla początkujących

Ten dokument służy jako zapis wszystkich istotnych zmian wprowadzonych do programu nauczania Model Context Protocol (MCP) dla początkujących. Zmiany są dokumentowane w odwrotnej kolejności chronologicznej (najnowsze zmiany jako pierwsze).

## 2 lipca 2026

### Nowa lekcja: Kandydat do wydania specyfikacji MCP z dnia 2026-07-28

Dodano omówienie nadchodzącego kandydata do wydania specyfikacji MCP `2026-07-28` (ogłoszony 21 maja 2026; ostateczne wydanie planowane na 28 lipca 2026), podsumowane na podstawie [oficjalnego wpisu na blogu z ogłoszeniem](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Podstawą programu pozostaje **Specyfikacja MCP 2025-11-25** do czasu wprowadzenia nowej wersji, dlatego przedstawiono to jako wskazówki na przyszłość, a nie jako przepisywanie istniejących lekcji.

- **Nowość**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — pełna lekcja obejmująca bezstanowe jądro protokołu (usunięcie fazy inicjalizacji i `Mcp-Session-Id`), nowe nagłówki trasowania `Mcp-Method`/`Mcp-Name`, metadane pamięci podręcznej `ttlMs`/`cacheScope`, W3C Trace Context w `_meta`, formalny framework rozszerzeń (Aplikacje MCP i nowe rozszerzenie Tasks), sześć SEP wzmacniających autoryzację, wycofanie Roots/Sampling/Logging oraz przejście na pełny JSON Schema 2020-12 dla schematów narzędzi.
- **Zaktualizowano** z wskazaniami na przyszłość prowadzącymi do nowej lekcji:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): notatka o wersji protokołu, sekcje Sampling/Roots/Logging/Tasks oraz "Co dalej"
  - [02-Security/README.md](./02-Security/README.md): wskazanie wzmocnienia autoryzacji
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): wskazanie transportu bezstanowego
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): wskazanie wycofania Sampling
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): wskazanie wycofania Logging i rozszerzenia Tasks
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): wskazanie trasowania bezstanowego/sesji
  - [README.md](./README.md): notatka "Patrząc w przyszłość" w sekcji specyfikacji i nowy wpis `1.1` w tabeli modułów programu
  - [study_guide.md](./study_guide.md): punkt perspektywiczny w przeglądzie Core Concepts oraz datowany dodatek
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): wskazanie na mapę transportową `mcp-session-id` przed modelem zapytania bezstanowego
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): wskazanie przeglądu modułu dotyczące wycofania Root Contexts/Sampling i rozszerzenia Tasks
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): wskazanie wzmocnienia autoryzacji

## 24 czerwca 2026

### Nowa lekcja: Korzystanie z MCP w aplikacji Copilot

- [Sekcja narzędzi](./12-tooling/README.md) Dodano sekcję narzędzi.
- [MCP w aplikacji Copilot](./12-tooling/01-copilot-app/README.md)

## 16 czerwca 2026

### Wyrównanie specyfikacji MCP i walidacja przykładowych rozwiązań

Zwalidowano program nauczania względem aktualnej **Specyfikacji MCP 2025-11-25** i najnowszych oficjalnych SDK, a następnie poprawiono pozostałe przestarzałe odniesienia do specyfikacji oraz potwierdzono, że główne przykłady nadal się budują i działają.

#### Korekty wersji specyfikacji (2025-06-18 / 2025-03-26 → 2025-11-25)

Zaktualizowano treść angielską, gdzie wciąż twierdzono, że starsza rewizja specyfikacji jest *aktualnym/najnowszym* standardem, oraz przekierowano linki do kanonicznych ścieżek specyfikacji na `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: zaktualizowano baner „Current Standard”, wprowadzenie, nagłówek zasad bezpieczeństwa, nagłówek wymagań obowiązkowych, sekcję Microsoft Entra ID, linki do Referencji & Zasobów oraz końcową notatkę bezpieczeństwa (8 odniesień) do 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: zaktualizowano link do dodatkowych zasobów specyfikacji i baner „Current Standard” do 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: zamieniono przestarzały link `2025-03-26` dotyczący bezpieczeństwa i zaufania na aktualną stronę najlepszych praktyk bezpieczeństwa 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: zaktualizowano oficjalny link dokumentacji Sampling do 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: zaktualizowano odniesienia w czasie teraźniejszym do "aktualnej specyfikacji MCP" oraz link do dodatkowych zasobów specyfikacji do 2025-11-25 (historyczne notatki o wycofaniu SSE pozostawiono dla dokładności)

#### Walidacja przykładów względem aktualnych SDK

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` zainstalował `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` przeszedł bez błędów typów — istniejące API `McpServer`/`StdioServerTransport` nadal są ważne
- **Python (03-GettingStarted/01-first-server/solution/python)**: zwalidowano w izolowanym `.venv` z `mcp[cli]` (1.27.2); `py_compile` przeszedł, a `FastMCP.list_tools()` poprawnie zwróciło narzędzia `add` i `subtract`
- Potwierdzono, że wszystkie zakresy wersji `@modelcontextprotocol/sdk` w przykładach (`>=1.26.0` / `^1.26.0` / `^1.27.0`) rozwiązują się poprawnie do aktualnej wersji `1.29.0` bez łamiących zmian API

#### Dopasowanie wersji zależności (zamykanie luk wersji)

Podniesiono przestarzałe wersje SDK, aby każdy przykład był zgodny z aktualnym wydaniem MCP, zgodnie z ogólnym konwenansem repozytorium:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: podniesiono `@modelcontextprotocol/sdk` z `^1.8.0` → `>=1.26.0` oraz zaktualizowano przestarzały opis pakietu `"updated for MCP 2025-06-18"` na `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** i **lab4/code/github_mcp_server/pyproject.toml**: podniesiono dokładną wersję `mcp==1.23.0` → `mcp>=1.26.0`; odtworzono oba pliki `uv.lock` (`uv lock`), tak aby pliki blokad wskazywały na aktualny `mcp 1.27.2` i były zsynchronizowane z manifestami

#### Analiza pokrycia funkcji najnowszej specyfikacji w programie

Potwierdzono, że program nauczania pokrywa wszystkie prymitywy wprowadzone/rozszerzone w MCP 2025-11-25, więc nie ma luk w treści:
- **Sampling**: lekcja 03-GettingStarted/14-sampling oraz 05-AdvancedTopics/mcp-sampling
- **Elicitation (w tym tryb URL)**: dokumentowane w 01-CoreConcepts i 05-AdvancedTopics/mcp-protocol-features
- **Roots**: dokumentowane w 00-Introduction, 01-CoreConcepts oraz 05-AdvancedTopics/mcp-root-contexts
- **Tasks (eksperymentalne, długotrwałe operacje)**: dokumentowane w 01-CoreConcepts oraz 05-AdvancedTopics/mcp-protocol-features
- **Adnotacje narzędziowe** (`readOnlyHint` / `destructiveHint`): dokumentowane w 01-CoreConcepts oraz 05-AdvancedTopics/mcp-protocol-features

### Wzmocnienie bezpieczeństwa i usuwanie podatności zależności

Przeprowadzono pełny przegląd bezpieczeństwa wszystkich manifestów zależności i kodu źródłowego przykładów, a następnie usunięto wszystkie zgłoszone ostrzeżenia npm oraz jedno zgłoszenie na poziomie kodu. Po remediacji `npm audit` zgłasza **0 podatności** w każdym badanym katalogu.

#### Podatności zależności npm (przechodnie) — usunięte

Poddano audytowi wszystkie 15 dołączonych plików `package-lock.json`. Podatności ograniczały się do zależności przechodnich pobieranych przez narzędzie deweloperskie MCP Inspector, klienta OpenAI i SDK MCP; wszystkie zostały teraz rozwiązane bez łamania przykładów:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** oraz **lab3/code/weather_mcp/inspector**: podniesiono `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), co usunęło ostrzeżenia dla wbudowanych `ajv`, `brace-expansion`, `diff`, `path-to-regexp` i `ws`. Dodano wpis `overrides` w npm wymuszający łatkę dla `shell-quote@1.8.4`, aby wyeliminować pozostałe krytyczne ostrzeżenie zależne od `concurrently`; odtworzono oba pliki blokad (teraz 0 podatności)
- **03-GettingStarted/samples/typescript**: `npm audit fix` zaktualizował przechodnie `qs` (umiarkowane) do wersji z łatką
- **03-GettingStarted/samples/javascript**: `npm audit fix` zaktualizował przechodnie `hono` (umiarkowane) do wersji z łatką
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` zaktualizował przechodnie `form-data` (wysokie) do wersji z łatką
- **03-GettingStarted/11-simple-auth/solution/typescript**: wygenerowano brakujący plik `package-lock.json`, aby projekt był powtarzalny i do audytu (0 podatności)

#### Poprawka bezpieczeństwa na poziomie kodu (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: usunięto `shell=True` z narzędzia `open_in_vscode`. Poprzednie wywołanie `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` pozwalało na interpretację metaznaków shellowych w ścieżce folderu przez `cmd.exe` (wektor wstrzyknięcia polecenia). Obecnie uruchamia bezpośrednio rozwiązaną ścieżkę `Code.exe` z folderem jako argumentem — bez użycia shell — co jest funkcjonalnie równoważne i bezpieczne.

#### Audyt zależności Python

- Przeprowadzono audyt każdego zestawu wymagań Pythona za pomocą `pip-audit`. `05-AdvancedTopics` i `03-GettingStarted/samples/python` zgłosiły **brak znanych podatności** (ich zakresy `mcp` / `httpx` / `pydantic` / `python-dotenv` rozwiązują się do aktualnych wersji z łatkami)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` wykrył przechodnią zależność **`werkzeug` 3.1.1** z trzema ostrzeżeniami o DoS w nazwach urządzeń Windows w funkcji `safe_join` — `CVE-2025-66221`, `CVE-2026-21860` i `CVE-2026-27199` (wszystkie naprawione w wersji 3.1.6). Dodano jawne przypięcie bezpieczeństwa `werkzeug>=3.1.6`, aby rozwiązać wersję z łatką; zweryfikowano, że ograniczenie poprawnie się rozwiązuje w stosie `chainlit` / `mcp` / `semantic-kernel`.

### Rebranding nazwy produktu

Zaktualizowano całą zawartość programu nauczania, aby odzwierciedlić rebranding produktów Microsoftu:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: zaktualizowano link do społeczności Discord
- **AGENTS.md**: zaktualizowano odniesienie do serwera Discord
- **README.md**: zaktualizowano odniesienia do ekosystemu technologicznego
- **study_guide.md**: zaktualizowano odniesienia w studium przypadku
- **05-AdvancedTopics/README.md**: zaktualizowano tytuł i opis modułu 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: zaktualizowano nagłówek sekcji i opis
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: zaktualizowano pełny tytuł i treść modułu
- **05-AdvancedTopics/mcp-security-entra/README.md**: zaktualizowano link przekierowujący
- **07-LessonsfromEarlyAdoption/README.md**: zaktualizowano odniesienia w studium przypadku
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: zaktualizowano nagłówek sekcji 9, odznaki oraz możliwości
- **08-BestPractices/README.md**: zaktualizowano link do społeczności Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: zaktualizowano odniesienie do kanału Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: zaktualizowano odniesienie do wdrożenia modelu
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: zaktualizowano tabelę usług AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: zaktualizowano odniesienia do zasobów

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension dla VS Code
- **README.md**: Zaktualizowano główne odniesienia do programu nauczania  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Zaktualizowano tytuł modułu, przegląd oraz wszystkie nagłówki modułu  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Zaktualizowano tytuł, cele nauki, instrukcje konfiguracji i zasoby  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Zaktualizowano tytuł, cele nauki, tabelę hostów MCP oraz odniesienia krzyżowe  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Zaktualizowano tytuł, odznaki, wymagania wstępne i zasoby  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Zaktualizowano odniesienia do Agenta Buildera oraz link do opinii  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Zaktualizowano wymagania wstępne i odniesienia do rozszerzeń  

---

## 11 kwietnia 2026

### Nowa lekcja, poprawki dokumentacji i aktualizacje zależności

#### Dodano nową treść programu nauczania

**Moduł 05 - Zaawansowane Tematy**  
- **Lekcja 5.17: Adwersarialne rozumowanie wieloagentowe z MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nowy kompleksowy przewodnik dotyczący wzorca debaty adwersarialnej dla systemów wieloagentowych  
  - Diagram architektury Mermaid: dwóch agentów → wspólny serwer MCP → transkrypt debaty → sędzia → werdykt  
  - Wspólny serwer narzędzi MCP (`web_search` + `run_python`) zaimplementowany w Pythonie i TypeScript  
  - Sprzeczne prompt systemowe (ZA / PRZECIW / Sędzia) z wyraźnymi wymaganiami dotyczącymi użycia narzędzi  
  - Orkiestrator debaty w Pythonie, TypeScript i C# zarządzający rundami i trasowaniem argumentów  
  - Okablowanie MCP `ClientSession` do orkiestratora w celu rzeczywistych wywołań narzędzi  
  - Tabela przypadków użycia (wykrywanie halucynacji, modelowanie zagrożeń, recenzja projektowania API, weryfikacja faktów, wybór technologii)  
  - Rozważania bezpieczeństwa: wykonanie w sandboxie, walidacja wywołań narzędzi, ograniczenia liczby wywołań, audytowanie logów  
  - Strukturalne ćwiczenie z trzema praktycznymi scenariuszami (przegląd kodu, decyzja architektoniczna, moderacja treści)  

#### Poprawki dokumentacji

**Moduł 03 - Pierwsze kroki**  
- **05-stdio-server/README.md**: Naprawiono niekompletny przykład serwera TypeScript stdio — dodano brakującą instancję transportu (`new StdioServerTransport()`) i wywołanie `server.connect(transport)` zgodnie z przykładami Pythona i .NET w tym samym rozdziale  
- **14-sampling/README.md**: Poprawiono literówkę — zmieniono `"Sampling is an davanced features"` na `"Sampling is an advanced feature"`  

#### Aktualizacje programu nauczania

**Główny README.md**  
- Dodano pozycję 5.17 (Adwersarialne rozumowanie wieloagentowe z MCP) do tabeli programu nauczania z bezpośrednim linkiem do nowej lekcji  

**05-AdvancedTopics/README.md**  
- Dodano wiersz lekcji 5.17 do tabeli lekcji  

**study_guide.md**  
- Dodano temat Adwersarialnego rozumowania wieloagentowego do mapy myśli oraz opisu tekstowego Zaawansowanych Tematów  

#### Poprawki kodu i bezpieczeństwa

**Moduł 05 - Agenci adwersarialni (`mcp-adversarial-agents`)**  
- **Poprawka bezpieczeństwa — wstrzyknięcie polecenia**: Zastąpiono interpolację shell `execSync` przez `execFile` + `promisify` w narzędziu TypeScript `run_python`, eliminując powierzchnię wstrzyknięć poleceń (kod kontrolowany przez LLM jest teraz przekazywany jako dosłowny element argv bez udziału powłoki)  
- **Okablowanie pętli narzędzi MCP**: Zaktualizowano Pythonowego orkiestratora debaty do używania klienta `AsyncAnthropic` (zastępując blokujący synchroniczny `Anthropic`), przesyłania na żywo `ClientSession` bezpośrednio do każdej tury agenta, pobierania definicji narzędzi przez `session.list_tools()` w każdej turze oraz wysyłania bloków `tool_use` przez `session.call_tool()` w pętli aż model wyprodukuje końcową odpowiedź tekstową  

#### Aktualizacje zależności

- Podniesiono wersję `hono` do 4.12.12 w wielu pakietach (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)  
- Podniesiono `@hono/node-server` z 1.19.11 do 1.19.13 w pakietach TypeScript  
- Podniesiono `cryptography` z 46.0.5 do 46.0.7 w pakietach Python (10-StreamliningAIWorkflows laboratoria 3 i 4)  
- Podniesiono `lodash` z 4.17.23 do 4.18.1 w inspektorze 10-StreamliningAIWorkflows  

#### Tłumaczenia

- Zsynchronizowano tłumaczenia na 48+ języków z najnowszymi zmianami źródłowymi (aktualizacja i18n)  

---

## 5 lutego 2026

### Ogólnorepozytoryjna walidacja i udoskonalenia nawigacji

#### Dodano nową treść programu nauczania

**Moduł 03 - Pierwsze kroki**  
- **12-mcp-hosts/README.md**: Nowy kompleksowy przewodnik po konfiguracji hostów MCP  
  - Przykłady konfiguracji Claude Desktop, VS Code, Cursor, Cline, Windsurf  
  - Szablony konfiguracji JSON dla wszystkich głównych hostów  
  - Tabela porównawcza typów transportu (stdio, SSE/HTTP, WebSocket)  
  - Rozwiązywanie częstych problemów z połączeniami  
  - Najlepsze praktyki bezpieczeństwa konfiguracji hostów  

- **13-mcp-inspector/README.md**: Nowy przewodnik debugowania dla MCP Inspector  
  - Metody instalacji (npx, globalnie npm, ze źródła)  
  - Łączenie z serwerami przez stdio i HTTP/SSE  
  - Testowanie narzędzi, zasobów i przepływów promptów  
  - Integracja z VS Code oraz MCP Inspector  
  - Typowe scenariusze debugowania wraz z rozwiązaniami  

**Moduł 04 - Implementacja praktyczna**  
- **pagination/README.md**: Nowy przewodnik implementacji paginacji  
  - Wzorce paginacji oparte na kursorze w Pythonie, TypeScript, Javie  
  - Obsługa paginacji po stronie klienta  
  - Strategie projektowania kursorów (nieprzejrzyste vs. strukturalne)  
  - Rekomendacje optymalizacji wydajności  

**Moduł 05 - Zaawansowane Tematy**  
- **mcp-protocol-features/README.md**: Nowy dogłębny opis funkcji protokołu  
  - Implementacja powiadomień o postępie  
  - Wzorce anulowania zapytań  
  - Szablony zasobów z wzorcami URI  
  - Zarządzanie cyklem życia serwera  
  - Kontrola poziomu logowania  
  - Wzorce obsługi błędów z kodami JSON-RPC  

#### Poprawki nawigacji (24+ plików zaktualizowanych)

**Główne README modułów**  
 Teraz zawierają linki zarówno do pierwszej lekcji, jak i do następnego modułu  

**Pliki podkatalogu 02-Security**  
 Wszystkie 5 uzupełniających dokumentów bezpieczeństwa teraz mają nawigację "Co dalej"  

**Pliki studium przypadku 09**  
 Wszystkie pliki studiów przypadków mają teraz nawigację sekwencyjną  

**Laboratoria 10-StreamliningAI**  
 Dodano sekcję Co dalej do przeglądu modułu 10 oraz modułu 11  

#### Poprawki kodu i zawartości

**Aktualizacje SDK i zależności**  
 Naprawiono pustą wersję openai na `^4.95.0`  
 Zaktualizowano SDK z `^1.8.0` do `>=1.26.0`  
 Zaktualizowano piny wersji mcp do `>=1.26.0`  

**Poprawki kodu**  
 Naprawiono nieprawidłowy model `gpt-4o-mini` na `gpt-4.1-mini`  

**Poprawki zawartości**  
 Poprawiono uszkodzony link `READMEmd` → `README.md`, poprawiono nagłówek programu `Module 1-3` → `Module 0-3`, naprawiono ścieżkę z uwzględnieniem wielkości liter  
 Usunięto uszkodzoną duplikację zawartości Case Study 5  

**Ulepszenia dla początkujących**  
 Dodano odpowiednie wprowadzenie, cele nauki oraz wymagania wstępne dla początkujących  

#### Aktualizacje programu nauczania

**Główny README.md**  
- Dodano wpisy 3.12 (Hosty MCP), 3.13 (MCP Inspector), 4.1 (Paginacja), 5.16 (Funkcje protokołu) do tabeli programu nauczania  

**Moduły README**  
 Dodano lekcje 12 i 13 do listy lekcji  
 Dodano sekcję Przewodniki praktyczne z linkiem do paginacji  
 Dodano lekcje 5.15 (Custom Transport) i 5.16 (Funkcje protokołu)  

**study_guide.md**  
- Zaktualizowano mapę myśli o wszystkie nowe tematy: konfiguracja hostów MCP, MCP Inspector, strategie paginacji, dogłębny opis funkcji protokołu  

## 28 stycznia 2026

### Przegląd zgodności ze specyfikacją MCP 2025-11-25

#### Ulepszenia podstawowych koncepcji (01-CoreConcepts/)  
- **Nowy prymityw klienta - Roots**: Dodano kompleksową dokumentację prymitywu klienta Roots, pozwalającego serwerom rozumieć granice systemu plików i uprawnienia dostępu  
- **Adnotacje narzędzi**: Dodano dokumentację dotyczącą adnotacji zachowań narzędzi (`readOnlyHint`, `destructiveHint`) dla lepszych decyzji dotyczących wykonania narzędzi  
- **Wywołanie narzędzia w Sampling**: Zaktualizowano dokumentację Sampling, aby uwzględnić parametry `tools` i `toolChoice` dla wywołania narzędzi sterowanego modelem podczas próbkowania zapytań  
- **Tryb URL Elicitation**: Dodano dokumentację dotyczącą wywołań zainicjowanych przez serwer bazujących na URL do zewnętrznych interakcji webowych  
- **Zadania (eksperymentalne)**: Dodano nową sekcję dokumentującą eksperymentalną funkcję Tasks dla trwałych wrapperów wykonawczych i odroczonego pobierania wyników  
- **Wsparcie dla ikon**: Zauważono, że narzędzia, zasoby, szablony zasobów i prompt mogą teraz zawierać ikony jako dodatkowe metadane  

#### Aktualizacje dokumentacji  
- **README.md**: Dodano odniesienie do wersji specyfikacji MCP 2025-11-25 oraz wyjaśnienie wersjonowania zależnego od daty  
- **study_guide.md**: Zaktualizowano mapę programu nauczania o Zadania i Adnotacje narzędzi w sekcji Podstawowe koncepcje; zaktualizowano datę dokumentu  

#### Weryfikacja zgodności specyfikacji  
- **Wersja protokołu**: Zweryfikowano, że cała dokumentacja odwołuje się do aktualnej specyfikacji MCP 2025-11-25  
- **Zgodność architektury**: Potwierdzono poprawność dokumentacji dwuwarstwowej architektury (warstwa danych + warstwa transportu)  
- **Dokumentacja prymitywów**: Zweryfikowano serwerowe prymitywy (Zasoby, Prompty, Narzędzia) oraz klientowskie prymitywy (Sampling, Elicitation, Logging, Roots)  
- **Mechanizmy transportu**: Potwierdzono poprawność dokumentacji transportu STDIO i HTTP streamowanego  
- **Wytyczne bezpieczeństwa**: Potwierdzono zgodność z aktualną dokumentacją najlepszych praktyk bezpieczeństwa MCP  

#### Kluczowe funkcje MCP 2025-11-25 udokumentowane  
- **Odkrywanie OpenID Connect**: Odkrywanie serwera uwierzytelniania przez OIDC  
- **Dokumenty metadanych OAuth Client ID**: Zalecany mechanizm rejestracji klienta  
- **JSON Schema 2020-12**: Domyślny dialekt dla definicji schematów MCP  
- **System warstwowania SDK**: Formalne wymagania dotyczące wsparcia funkcji SDK i utrzymania  
- **Struktura zarządzania**: Formalizacja grup roboczych i grup zainteresowań w zarządzaniu MCP  

### Główna aktualizacja dokumentacji bezpieczeństwa (02-Security/)

#### Integracja warsztatów MCP Security Summit Workshop (Sherpa)  
- **Nowe praktyczne źródło szkoleniowe**: Dodano kompleksową integrację z [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) we wszystkich dokumentach związanych z bezpieczeństwem  
- **Dokumentacja trasy ekspedycji**: Udokumentowano kompletną drogę od Base Camp do Summit  
- **Zgodność z OWASP**: Cała dokumentacja bezpieczeństwa jest teraz powiązana z ryzykami OWASP MCP Azure Security Guide  

#### Integracja OWASP MCP Top 10  
- **Nowa sekcja**: Dodano tabelę OWASP MCP Top 10 zagrożeń bezpieczeństwa z mitigacjami Azure do głównego README bezpieczeństwa  
- **Dokumentacja oparta na ryzyku**: Zaktualizowano plik mcp-security-controls-2025.md o odniesienia do ryzyk OWASP MCP dla każdego obszaru bezpieczeństwa  
- **Architektura referencyjna**: Podlinkowano do OWASP MCP Azure Security Guide oraz wzorców wdrożeniowych  

#### Zaktualizowane pliki bezpieczeństwa  
- **README.md**: Dodano przegląd warsztatu Sherpa, tabelę trasy ekspedycji, podsumowanie ryzyk OWASP MCP Top 10 oraz sekcję praktycznych szkoleń  
- **mcp-security-controls-2025.md**: Zaktualizowano nagłówek na luty 2026, dodano odniesienia do ryzyk OWASP (MCP01-MCP08), naprawiono niespójność wersji specyfikacji  
- **mcp-security-best-practices-2025.md**: Dodano sekcję zasobów Sherpa i OWASP, zaktualizowano datę  
- **mcp-best-practices.md**: Dodano sekcję praktycznych szkoleń z linkami do Sherpa i OWASP  
- **azure-content-safety-implementation.md**: Dodano odniesienie do OWASP MCP06, zgodność z Sherpa Camp 3 oraz sekcję dodatkowych zasobów  

#### Dodano nowe linki do zasobów  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Poszczególne strony ryzyk OWASP MCP (MCP01-MCP10)  

### Zgodność programu nauczania z MCP Specification 2025-11-25

#### Moduł 03 - Pierwsze kroki  
- **Dokumentacja SDK**: Dodano Go SDK do oficjalnej listy SDK; zaktualizowano wszystkie odniesienia SDK dla zgodności ze specyfikacją MCP 2025-11-25  
- **Wyjaśnienie transportu**: Zaktualizowano opisy transportu STDIO i HTTP Streaming o bezpośrednie odniesienia do specyfikacji  

#### Moduł 04 - Implementacja praktyczna  
- **Aktualizacje SDK**: Dodano Go SDK; uaktualniono listę SDK z odniesieniem do wersji specyfikacji  
- **Specyfikacja autoryzacji**: Zaktualizowano link do specyfikacji MCP Authorization na aktualną wersję 2025-11-25  

#### Moduł 05 - Zaawansowane Tematy  
- **Nowe funkcje**: Dodano notatkę o nowych funkcjach MCP Specification 2025-11-25 (Zadania, Adnotacje narzędzi, URL Mode Elicitation, Roots)  
- **Zasoby bezpieczeństwa**: Dodano linki do OWASP MCP Top 10 oraz warsztatów Sherpa  

#### Moduł 06 - Wkład społeczności  
- **Lista SDK**: Dodano SDK Swift i Rust; zaktualizowano link do specyfikacji na 2025-11-25  
- **Odniesienie do specyfikacji**: Zaktualizowano link do bezpośredniego URL specyfikacji  

#### Moduł 07 - Lekcje z wczesnej adopcji
- **Aktualizacje zasobów**: Dodano link do specyfikacji MCP 2025-11-25 oraz OWASP MCP Top 10 do dodatkowych zasobów

#### Moduł 08 - Najlepsze praktyki
- **Wersja specyfikacji**: Zaktualizowano odniesienie do specyfikacji MCP na wersję 2025-11-25
- **Zasoby dotyczące bezpieczeństwa**: Dodano OWASP MCP Top 10 oraz warsztat Sherpa do dodatkowych odniesień

#### Moduł 10 - Usprawnianie przepływów pracy AI
- **Aktualizacja odznaki**: Zmieniono odznakę wersji MCP z wersji SDK (1.9.3) na wersję specyfikacji (2025-11-25)
- **Linki do zasobów**: Zaktualizowano link do specyfikacji MCP; dodano OWASP MCP Top 10

#### Moduł 11 - Laboratoria praktyczne MCP Server
- **Odniesienie do specyfikacji**: Zaktualizowano link do specyfikacji MCP na wersję 2025-11-25
- **Zasoby dotyczące bezpieczeństwa**: Dodano OWASP MCP Top 10 do oficjalnych zasobów

## 18 grudnia 2025

### Aktualizacja dokumentacji bezpieczeństwa - specyfikacja MCP 2025-11-25

#### Najlepsze praktyki bezpieczeństwa MCP (02-Security/mcp-best-practices.md) - Aktualizacja wersji specyfikacji
- **Aktualizacja wersji protokołu**: Zaktualizowano odniesienia do najnowszej specyfikacji MCP 2025-11-25 (wydanej 25 listopada 2025)
  - Zmieniono wszystkie odniesienia wersji specyfikacji z 2025-06-18 na 2025-11-25
  - Zmieniono daty dokumentów z 18 sierpnia 2025 na 18 grudnia 2025
  - Zweryfikowano, że wszystkie URL-e do specyfikacji wskazują na aktualną dokumentację
- **Weryfikacja treści**: Kompleksowa walidacja najlepszych praktyk bezpieczeństwa pod kątem najnowszych standardów
  - **Rozwiązania bezpieczeństwa Microsoft**: Zweryfikowano aktualną terminologię i linki dla Prompt Shields (wcześniej "Wykrywanie ryzyka jailbreak"), Azure Content Safety, Microsoft Entra ID oraz Azure Key Vault
  - **Bezpieczeństwo OAuth 2.1**: Potwierdzono zgodność z najnowszymi najlepszymi praktykami bezpieczeństwa OAuth
  - **Standardy OWASP**: Zweryfikowano aktualność odniesień do OWASP Top 10 dla LLM
  - **Usługi Azure**: Zweryfikowano wszystkie linki do dokumentacji Microsoft Azure oraz najlepsze praktyki
- **Zgodność ze standardami**: Potwierdzono aktualność wszystkich cytowanych standardów bezpieczeństwa
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - Najlepsze praktyki bezpieczeństwa OAuth 2.1
  - Ramy bezpieczeństwa i zgodności Azure
- **Zasoby wdrożeniowe**: Zweryfikowano wszystkie linki i zasoby przewodników wdrożeniowych
  - Wzorce uwierzytelniania w Azure API Management
  - Przewodniki integracji Microsoft Entra ID
  - Zarządzanie sekretami w Azure Key Vault
  - Pipelines DevSecOps i rozwiązania monitoringu

### Zapewnienie jakości dokumentacji
- **Zgodność ze specyfikacją**: Zapewniono, że wszystkie obowiązkowe wymagania bezpieczeństwa MCP (MUST/MUST NOT) są zgodne z najnowszą specyfikacją
- **Aktualność zasobów**: Zweryfikowano wszystkie zewnętrzne linki do dokumentacji Microsoft, standardów bezpieczeństwa i przewodników wdrożeniowych
- **Pokrycie najlepszych praktyk**: Potwierdzono kompleksowe omówienie uwierzytelniania, autoryzacji, zagrożeń specyficznych dla AI, bezpieczeństwa łańcucha dostaw i wzorców korporacyjnych

## 6 października 2025

### Rozszerzenie sekcji rozpoczęcia pracy – Zaawansowane użycie serwera i prosta autoryzacja

#### Zaawansowane użycie serwera (03-GettingStarted/10-advanced)
- **Dodano nowy rozdział**: Wprowadzono kompleksowy przewodnik po zaawansowanym użyciu serwera MCP, obejmujący zarówno architekturę standardową, jak i niskopoziomową.
  - **Serwer standardowy vs niskopoziomowy**: Szczegółowe porównanie oraz przykłady kodu w Python i TypeScript dla obu podejść.
  - **Projektowanie oparte na handlerach**: Wyjaśnienie zarządzania narzędziami/zasobami/promptami oparte na handlerach dla skalowalnych i elastycznych implementacji serwerów.
  - **Praktyczne wzorce**: Scenariusze wykorzystania wzorców serwera niskiego poziomu przy zaawansowanych funkcjach i architekturze.

#### Prosta autoryzacja (03-GettingStarted/11-simple-auth)
- **Dodano nowy rozdział**: Krok po kroku przewodnik po implementacji prostej autoryzacji w serwerach MCP.
  - **Koncepcje autoryzacji**: Jasne omówienie różnic między autoryzacją a autentykacją oraz obsługi danych uwierzytelniających.
  - **Implementacja podstawowej autoryzacji**: Wzorce middleware w Pythonie (Starlette) i TypeScript (Express) wraz z przykładami kodu.
  - **Postęp do zaawansowanego bezpieczeństwa**: Wskazówki dotyczące rozpoczęcia od prostej autoryzacji, a następnie przejścia do OAuth 2.1 i RBAC, z odniesieniami do modułów zaawansowanego bezpieczeństwa.

Te dodatki oferują praktyczne i bezpośrednie wskazówki do budowania bardziej solidnych, bezpiecznych i elastycznych implementacji serwerów MCP, łącząc podstawowe koncepcje z zaawansowanymi wzorcami produkcyjnymi.

## 29 września 2025

### Laboratoria integracji bazy danych serwera MCP - Kompleksowa ścieżka nauki praktycznej

#### 11-MCPServerHandsOnLabs - Nowy, kompletny program nauczania integracji bazy danych
- **Kompletna ścieżka 13 laboratoriów**: Dodano kompleksowy kurs praktyczny do budowy produkcyjnych serwerów MCP z integracją bazy danych PostgreSQL
  - **Praktyczne wdrożenie**: Przypadek użycia analityki Zava Retail prezentujący wzorce klasy korporacyjnej
  - **Struktura nauki**:
    - **Laboratoria 00-03: Podstawy** - Wprowadzenie, Architektura rdzenia, Bezpieczeństwo i multi-tenancy, Konfiguracja środowiska
    - **Laboratoria 04-06: Budowa serwera MCP** - Projektowanie bazy danych i schematu, Implementacja serwera MCP, Rozwój narzędzi  
    - **Laboratoria 07-09: Zaawansowane funkcje** - Integracja semantycznego wyszukiwania, Testowanie & debugowanie, Integracja z VS Code
    - **Laboratoria 10-12: Produkcja i najlepsze praktyki** - Strategie wdrożeniowe, Monitoring i obserwowalność, Najlepsze praktyki i optymalizacja
  - **Technologie korporacyjne**: FastMCP, PostgreSQL z pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Zaawansowane funkcje**: Row Level Security (RLS), semantyczne wyszukiwanie, wielodostęp do danych, wektorowe osadzanie, monitoring w czasie rzeczywistym

#### Standaryzacja terminologii - zmiana z modułów na laboratoria
- **Kompleksowa aktualizacja dokumentacji**: Systematyczna zmiana wszystkich plików README w 11-MCPServerHandsOnLabs na terminologię „laboratorium” zamiast „modułu”
  - **Nagłówki sekcji**: Zmieniono „Co obejmuje ten moduł” na „Co obejmuje to laboratorium” we wszystkich 13 laboratoriach
  - **Opis treści**: Zmieniono „Ten moduł zapewnia...” na „To laboratorium zapewnia...” w całej dokumentacji
  - **Cele nauki**: Zmieniono „Pod koniec tego modułu...” na „Pod koniec tego laboratorium...”
  - **Linki nawigacyjne**: Wszystkie odniesienia „Moduł XX:” zamieniono na „Laboratorium XX:” w odnośnikach i nawigacji
  - **Śledzenie ukończeń**: Zmieniono „Po ukończeniu tego modułu...” na „Po ukończeniu tego laboratorium...”
  - **Zachowanie odniesień technicznych**: Zachowano odniesienia do modułów Pythona w plikach konfiguracyjnych (np. `"module": "mcp_server.main"`)

#### Ulepszenia przewodnika nauki (study_guide.md)
- **Wizualna mapa programu nauczania**: Dodano nową sekcję „11. Laboratoria integracji bazy danych” z wizualizacją struktury laboratoriów
- **Struktura repozytorium**: Zaktualizowano z dziesięciu do jedenastu głównych sekcji z szczegółowym opisem 11-MCPServerHandsOnLabs
- **Wskazówki dotyczące ścieżki nauki**: Rozszerzono instrukcje nawigacji obejmujące sekcje 00-11
- **Pokrycie technologii**: Dodano szczegóły integracji FastMCP, PostgreSQL oraz usług Azure
- **Efekty nauki**: Podkreślono tworzenie serwerów gotowych do produkcji, wzorce integracji baz danych i bezpieczeństwo korporacyjne

#### Ulepszenia struktury głównego README
- **Terminologia oparta na laboratoriach**: W głównym pliku README.md w 11-MCPServerHandsOnLabs konsekwentne użycie struktury „Laboratorium”
- **Organizacja ścieżki nauczania**: Jasna progresja od podstawowych koncepcji przez zaawansowaną implementację do wdrożenia produkcyjnego
- **Perspektywa praktyczna**: Eksponowanie praktycznej nauki i wzorców klasy korporacyjnej z rzeczywistymi technologiami

### Poprawki jakości i spójności dokumentacji
- **Nacisk na naukę praktyczną**: Wzmocnienie praktycznego, opartego na laboratoriach podejścia w całej dokumentacji
- **Skupienie na wzorcach korporacyjnych**: Podkreślenie implementacji gotowych do produkcji oraz kwestii bezpieczeństwa w organizacjach
- **Integracja technologii**: Kompleksowe omówienie nowoczesnych usług Azure i wzorców integracji AI
- **Progresja nauki**: Jasna, uporządkowana ścieżka od podstaw do wdrożenia produkcyjnego

## 26 września 2025

### Rozbudowa studiów przypadków - integracja GitHub MCP Registry

#### Studia przypadków (09-CaseStudy/) - Skupienie na rozwoju ekosystemu
- **README.md**: Znaczące rozszerzenie z kompleksowym studium przypadku GitHub MCP Registry
  - **Studium przypadku GitHub MCP Registry**: Nowe, obszerne studium dotyczące uruchomienia GitHub MCP Registry we wrześniu 2025
    - **Analiza problemu**: Szczegółowa analiza rozproszonego odkrywania i wdrażania serwerów MCP
    - **Architektura rozwiązania**: Centralizowany rejestr GitHub z instalacją jednym kliknięciem w VS Code
    - **Wpływ biznesowy**: Wymierne usprawnienia w onboardingu i produktywności deweloperów
    - **Wartość strategiczna**: Skupienie na modułowym wdrażaniu agentów i interoperacyjności narzędzi
    - **Rozwój ekosystemu**: Pozycjonowanie jako podstawowa platforma dla integracji agentycznej
  - **Rozbudowana struktura studiów przypadków**: Zaktualizowano wszystkie siedem studiów z jednolitą formą i wyczerpującymi opisami
    - Azure AI Travel Agents: Skupienie na orkiestracji multi-agentów
    - Integracja Azure DevOps: Automatyzacja przepływów pracy
    - Pobieranie dokumentacji w czasie rzeczywistym: Implementacja klienta konsolowego Python
    - Interaktywny generator planów nauki: Chainlit jako konwersacyjna aplikacja webowa
    - Dokumentacja w edytorze: Integracja VS Code i GitHub Copilot
    - Azure API Management: Wzorce integracji API korporacyjnego
    - GitHub MCP Registry: Rozwój ekosystemu i platforma społecznościowa
  - **Kompleksowe podsumowanie**: Przepisano sekcję zakończenia podkreślając siedem studiów obejmujących różne aspekty implementacji MCP
    - Integracja korporacyjna, orkiestracja multi-agentów, produktywność deweloperska
    - Rozwój ekosystemu, kategoryzacja zastosowań edukacyjnych
    - Rozszerzone spostrzeżenia architektoniczne, strategie wdrożenia i najlepsze praktyki
    - Podkreślenie dojrzałości MCP jako gotowego protokołu produkcyjnego

#### Aktualizacje przewodnika nauki (study_guide.md)
- **Wizualna mapa programu nauczania**: Zaktualizowano mapę myśli o uwzględnienie GitHub MCP Registry w sekcji studiów przypadków
- **Opis studiów przypadków**: Rozszerzono z opisów ogólnych do szczegółowego podziału siedmiu kompleksowych studiów
- **Struktura repozytorium**: Zaktualizowano sekcję 10, by odzwierciedlała kompleksowe pokrycie studiów przypadków ze szczegółami implementacyjnymi
- **Integracja changeloga**: Dodano wpis z 26 września 2025 dokumentujący dodanie GitHub MCP Registry i rozszerzenia studiów przypadków
- **Aktualizacja daty**: Zmieniono datę stopki na najnowszą rewizję (26 września 2025)

### Poprawki jakości dokumentacji
- **Wzmocnienie spójności**: Ustandaryzowano formatowanie i strukturę studiów przypadków we wszystkich siedmiu przykładach
- **Kompleksowe pokrycie**: Studia teraz obejmują scenariusze korporacyjne, produktywność deweloperską i rozwój ekosystemu
- **Strategiczne pozycjonowanie**: Skupienie na MCP jako podstawowej platformie wdrażania systemów agentycznych
- **Integracja zasobów**: Uaktualnienie dodatkowych zasobów o link do GitHub MCP Registry

## 15 września 2025

### Rozszerzenie tematów zaawansowanych - własne transporty i inżynieria kontekstu

#### Własne transporty MCP (05-AdvancedTopics/mcp-transport/) - Nowy przewodnik zaawansowanej implementacji
- **README.md**: Kompletny przewodnik implementacyjny własnych mechanizmów transportu MCP
  - **Transport Azure Event Grid**: Kompleksowa implementacja bezserwerowego, zdarzeniowego transportu
    - Przykłady w C#, TypeScript oraz Python z integracją Azure Functions
    - Wzorce architektury zdarzeniowej dla skalowalnych rozwiązań MCP
    - Odbiorniki webhooków i obsługa komunikatów push
  - **Transport Azure Event Hubs**: Implementacja transportu strumieniowego o dużej przepustowości
    - Możliwości strumieniowania w czasie rzeczywistym dla scenariuszy niskiego opóźnienia
    - Strategie partycjonowania i zarządzanie punktami kontrolnymi
    - Grupowanie wiadomości i optymalizacja wydajności
  - **Wzorce integracji korporacyjnej**: Architektura gotowa do produkcji
    - Rozproszone przetwarzanie MCP na wielu Azure Functions
    - Hybrydowe architektury transportowe łączące różne typy transportu
    - Trwałość wiadomości, niezawodność i strategie obsługi błędów
  - **Bezpieczeństwo i monitoring**: Integracja Azure Key Vault i wzorce obserwowalności
    - Uwierzytelnianie tożsamości zarządzanej i zasada najmniejszego uprzywilejowania
    - Telemetria Application Insights i monitoring wydajności
    - Wzorce obwodów zabezpieczających i odporności na błędy
  - **Ramowe testowanie**: Kompleksowe strategie testowania własnych transportów
    - Testy jednostkowe z użyciem podwójników i frameworków mockingowych
    - Testy integracyjne z Azure Test Containers
    - Wymagania dotyczące testów wydajności i obciążeniowych

#### Inżynieria kontekstu (05-AdvancedTopics/mcp-contextengineering/) - Nowa dziedzina AI
- **README.md**: Kompleksowe omówienie inżynierii kontekstu jako dynamicznie rozwijającej się dziedziny
  - **Zasady podstawowe**: Pełne współdzielenie kontekstu, świadomość decyzji o działaniach i zarządzanie oknem kontekstu
  - **Zgodność z protokołem MCP**: Jak projekt MCP odpowiada wyzwaniom inżynierii kontekstu
    - Ograniczenia okna kontekstu i strategie progresywnego ładowania
    - Określanie relewantności i dynamiczne pobieranie kontekstu
    - Obsługa kontekstu multimodalnego i zagadnienia bezpieczeństwa
  - **Podejścia implementacyjne**: Architektury jednoprocesowe vs. wieloagentowe
    - Technikki segmentacji i priorytetyzacji kontekstu
    - Progresywne ładowanie i strategie kompresji kontekstu
    - Warstwowe podejścia do kontekstu i optymalizacja pobierania
  - **Ramka pomiarowa**: Metryki dla oceny skuteczności kontekstu
    - Efektywność wejścia, wydajność, jakość oraz doświadczenie użytkownika
    - Eksperymentalne metody optymalizacji kontekstu
    - Analiza błędów i metody poprawy procesów

#### Aktualizacje nawigacji programu nauczania (README.md)
- **Ulepszona struktura modułów**: Zaktualizowano tabelę programu nauczania o nowe tematy zaawansowane
  - Dodano wpisy Inżynieria kontekstu (5.14) i Własne transporty (5.15)
  - Zachowano spójne formatowanie i linki nawigacyjne w wszystkich modułach
  - Zaktualizowano opisy, aby odzwierciedlić obecny zakres treści

### Ulepszenia struktury katalogów
- **Standaryzacja nazw**: Zmieniono nazwę „mcp transport” na „mcp-transport” dla spójności z innymi folderami tematów zaawansowanych
- **Organizacja treści**: Wszystkie foldery 05-AdvancedTopics teraz mają spójny wzorzec nazewnictwa (mcp-[topic])

### Ulepszenia jakości dokumentacji
- **Zgodność ze specyfikacją MCP**: Wszystkie nowe treści odnoszą się do aktualnej specyfikacji MCP 2025-06-18
- **Przykłady w wielu językach**: Kompleksowe przykłady kodu w C#, TypeScript i Python
- **Skupienie na przedsiębiorstwie**: Wzorce gotowe do produkcji i integracja z chmurą Azure w całym projekcie  
- **Dokumentacja wizualna**: Diagramy Mermaid do wizualizacji architektury i przepływów  

## 18 sierpnia 2025

### Kompleksowa aktualizacja dokumentacji – standardy MCP 2025-06-18

#### Najlepsze praktyki bezpieczeństwa MCP (02-Security/) – całkowita modernizacja  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Całkowite przepisanie zgodnie ze specyfikacją MCP 2025-06-18  
  - **Wymagania obowiązkowe**: Dodano wyraźne wymagania MUSI/NIE MOGE wynikające z oficjalnej specyfikacji z jasnymi wskaźnikami wizualnymi  
  - **12 podstawowych praktyk bezpieczeństwa**: Przekształcone z listy 15 pozycji w kompleksowe domeny bezpieczeństwa  
    - Bezpieczeństwo tokenów i uwierzytelnianie z integracją z zewnętrznym dostawcą tożsamości  
    - Zarządzanie sesją i bezpieczeństwo transportu z wymaganiami kryptograficznymi  
    - Ochrona specyficzna dla AI z integracją Microsoft Prompt Shields  
    - Kontrola dostępu i uprawnienia z zasadą najmniejszych uprawnień  
    - Bezpieczeństwo treści i monitoring z integracją Azure Content Safety  
    - Bezpieczeństwo łańcucha dostaw z kompleksową weryfikacją komponentów  
    - Bezpieczeństwo OAuth i zapobieganie błędnemu wykorzystaniu z implementacją PKCE  
    - Reakcja na incydenty i odzyskiwanie z automatycznymi zdolnościami  
    - Zgodność i zarządzanie zgodnością z regulacjami  
    - Zaawansowane kontrolki bezpieczeństwa z architekturą zero trust  
    - Integracja ekosystemu bezpieczeństwa Microsoft z kompleksowymi rozwiązaniami  
    - Ciągła ewolucja bezpieczeństwa z adaptacyjnymi praktykami  
  - **Rozwiązania bezpieczeństwa Microsoft**: Rozszerzone wskazówki integracyjne dla Prompt Shields, Azure Content Safety, Entra ID i GitHub Advanced Security  
  - **Zasoby do wdrożenia**: Skategoryzowane kompleksowe linki do zasobów według dokumentacji oficjalnej MCP, rozwiązań Microsoft, standardów bezpieczeństwa i przewodników wdrożeniowych  

#### Zaawansowane kontrolki bezpieczeństwa (02-Security/) – wdrożenie na poziomie przedsiębiorstwa  
- **MCP-SECURITY-CONTROLS-2025.md**: Całkowita przebudowa z korporacyjnym frameworkiem bezpieczeństwa  
  - **9 kompleksowych domen bezpieczeństwa**: Rozszerzone od podstawowych kontrolek do szczegółowego frameworku przedsiębiorstwa  
    - Zaawansowane uwierzytelnianie i autoryzacja z integracją Microsoft Entra ID  
    - Bezpieczeństwo tokenów i kontrolki anty-przekazywania z kompleksową walidacją  
    - Kontrolki bezpieczeństwa sesji z zapobieganiem przejęciu  
    - Kontrolki bezpieczeństwa specyficzne dla AI z zapobieganiem wstrzykiwaniu promptów i zatruwaniu narzędzi  
    - Zapobieganie atakom „confused deputy” z zabezpieczeniem proxy OAuth  
    - Bezpieczeństwo wykonania narzędzi z sandboxingiem i izolacją  
    - Kontrolki bezpieczeństwa łańcucha dostaw z weryfikacją zależności  
    - Kontrolki monitoringu i detekcji z integracją SIEM  
    - Reakcja na incydenty i odzyskiwanie z automatycznymi funkcjami  
  - **Przykłady wdrożeń**: Dodano szczegółowe bloki konfiguracji YAML i przykłady kodu  
  - **Integracja rozwiązań Microsoft**: Kompleksowe omówienie usług bezpieczeństwa Azure, GitHub Advanced Security i zarządzania tożsamością przedsiębiorstwa  

#### Bezpieczeństwo tematów zaawansowanych (05-AdvancedTopics/mcp-security/) – wdrożenie produkcyjne  
- **README.md**: Całkowite przepisanie pod wdrożenie zabezpieczeń przedsiębiorstwa  
  - **Zgodność z aktualną specyfikacją**: Zaktualizowane do MCP Specification 2025-06-18 z obowiązkowymi wymaganiami bezpieczeństwa  
  - **Ulepszone uwierzytelnianie**: Integracja Microsoft Entra ID z kompleksowymi przykładami .NET i Java Spring Security  
  - **Integracja bezpieczeństwa AI**: Wdrożenie Microsoft Prompt Shields i Azure Content Safety z szczegółowymi przykładami w Pythonie  
  - **Zaawansowane łagodzenie zagrożeń**: Kompleksowe przykłady wdrożenia dla  
    - Zapobieganie atakom confused deputy z PKCE i walidacją zgody użytkownika  
    - Zapobieganie przekazywaniu tokenów z walidacją odbiorcy i bezpiecznym zarządzaniem tokenami  
    - Zapobieganie przejęciu sesji z powiązaniem kryptograficznym i analizą zachowań  
  - **Integracja bezpieczeństwa przedsiębiorstwa**: Monitorowanie Azure Application Insights, potoki wykrywania zagrożeń i bezpieczeństwo łańcucha dostaw  
  - **Lista kontrolna wdrożenia**: Jasno rozróżnione kontrolki bezpieczeństwa obowiązkowe i zalecane wraz z korzyściami ekosystemu Microsoft  

### Jakość dokumentacji i zgodność ze standardami  
- **Odniesienia do specyfikacji**: Zaktualizowano wszystkie odniesienia do aktualnej specyfikacji MCP 2025-06-18  
- **Ekosystem bezpieczeństwa Microsoft**: Rozszerzone wskazówki integracyjne w całej dokumentacji bezpieczeństwa  
- **Praktyczne wdrożenia**: Dodano szczegółowe przykłady kodu w .NET, Javie i Pythonie z wzorcami korporacyjnymi  
- **Organizacja zasobów**: Kompleksowa kategoryzacja dokumentacji oficjalnej, standardów bezpieczeństwa i przewodników wdrożeniowych  
- **Wskaźniki wizualne**: Jasne oznaczenie wymagań obowiązkowych vs. praktyk zalecanych  

#### Podstawowe pojęcia (01-CoreConcepts/) – całkowita modernizacja  
- **Aktualizacja wersji protokołu**: Zaktualizowano odniesienia do aktualnej specyfikacji MCP 2025-06-18 z wersjonowaniem opartym na dacie (format RRRR-MM-DD)  
- **Udoskonalenie architektury**: Rozszerzone opisy Hostów, Klientów i Serwerów, aby odzwierciedlić wzorce aktualnej architektury MCP  
  - Hosty teraz jasno zdefiniowane jako aplikacje AI koordynujące wiele połączeń klientów MCP  
  - Klienci opisani jako łączniki protokołów utrzymujące relacje jeden do jednego z serwerami  
  - Serwery rozszerzone o scenariusze wdrożeń lokalnych vs. zdalnych  
- **Przebudowa prymitywów**: Całkowita odnowa prymitywów serwera i klienta  
  - Prymitywy serwera: Zasoby (źródła danych), Prompty (szablony), Narzędzia (wykonujące funkcje) z szczegółowymi wyjaśnieniami i przykładami  
  - Prymitywy klienta: Pobieranie próbek (dokończenia LLM), Elicytacja (wejście użytkownika), Logowanie (debugowanie/monitoring)  
  - Zaktualizowano zgodnie z aktualnymi wzorcami metod odkrywania (`*/list`), pobierania (`*/get`) i wykonywania (`*/call`)  
- **Architektura protokołu**: Wprowadzenie modelu dwuwarstwowego  
  - Warstwa danych: Podstawa JSON-RPC 2.0 z zarządzaniem cyklem życia i prymitywami  
  - Warstwa transportu: Mechanizmy transportu STDIO (lokalny) i Streamable HTTP z SSE (zdalny)  
- **Framework bezpieczeństwa**: Kompleksowe zasady bezpieczeństwa obejmujące wyraźną zgodę użytkownika, ochronę prywatności danych, bezpieczeństwo wykonania narzędzi i bezpieczeństwo warstwy transportowej  
- **Wzorce komunikacji**: Zaktualizowane komunikaty protokołu pokazujące inicjalizację, odkrywanie, wykonywanie i przepływy powiadomień  
- **Przykłady kodu**: Odświeżone wielojęzyczne przykłady (.NET, Java, Python, JavaScript), odzwierciedlające aktualne wzorce SDK MCP  

#### Bezpieczeństwo (02-Security/) – kompleksowa przebudowa bezpieczeństwa  
- **Zgodność ze standardami**: Pełna zgodność z wymaganiami bezpieczeństwa MCP Specification 2025-06-18  
- **Ewolucja uwierzytelniania**: Udokumentowana ewolucja od niestandardowych serwerów OAuth do delegacji na zewnętrznego dostawcę tożsamości (Microsoft Entra ID)  
- **Analiza zagrożeń specyficznych dla AI**: Rozszerzone omówienie nowoczesnych wektorów ataków AI  
  - Szczegółowe scenariusze ataków wstrzykiwania promptów z przykładami z życia  
  - Mechanizmy zatruwania narzędzi i wzorce ataków typu „rug pull”  
  - Zatruwanie okna kontekstowego i ataki dezorientujące modele  
- **Rozwiązania bezpieczeństwa AI Microsoft**: Kompleksowe omówienie ekosystemu bezpieczeństwa Microsoft  
  - AI Prompt Shields z zaawansowaną detekcją, wyróżnianiem i technikami delimiterów  
  - Wzorce integracji Azure Content Safety  
  - GitHub Advanced Security dla ochrony łańcucha dostaw  
- **Zaawansowane łagodzenie zagrożeń**: Szczegółowe kontrolki bezpieczeństwa dla  
  - Przejęcia sesji z unikalnymi scenariuszami ataków MCP i wymaganiami kryptograficznymi co do ID sesji  
  - Problemów confused deputy w scenariuszach proxy MCP z wyraźnymi wymaganiami zgody  
  - Luk przekazywania tokenów z obowiązkową walidacją  
- **Bezpieczeństwo łańcucha dostaw**: Rozszerzona tematyka AI supply chain obejmująca modele bazowe, usługi osadzania, dostawców kontekstu i API stron trzecich  
- **Bezpieczeństwo fundamentów**: Ulepszona integracja wzorców bezpieczeństwa przedsiębiorstwa, w tym architektury zero trust i ekosystemu bezpieczeństwa Microsoft  
- **Organizacja zasobów**: Skategoryzowane kompleksowe linki do zasobów według typu (dokumentacja oficjalna, standardy, badania, rozwiązania Microsoft, przewodniki wdrożeniowe)  

### Ulepszenia jakości dokumentacji  
- **Strukturalne cele nauki**: Ulepszone cele edukacyjne z konkretnymi, wykonalnymi rezultatami  
- **Odwołania krzyżowe**: Dodano linki pomiędzy powiązanymi tematami bezpieczeństwa i podstawowymi pojęciami  
- **Aktualne informacje**: Zaktualizowano wszystkie odniesienia dat i specyfikacji do obowiązujących standardów  
- **Wskazówki wdrożeniowe**: Dodano konkretne, wykonalne wskazówki implementacyjne w obu sekcjach  

## 16 lipca 2025

### Poprawki w README i nawigacji  
- Całkowicie przeprojektowano nawigację programu nauczania w README.md  
- Zastąpiono tagi `<details>` bardziej dostępnym formatem tabelarycznym  
- Stworzono alternatywne opcje układu w nowym folderze "alternative_layouts"  
- Dodano przykłady nawigacji w stylu kart, z zakładkami i akordeonem  
- Zaktualizowano sekcję struktury repozytorium o wszystkie najnowsze pliki  
- Ulepszono sekcję „Jak korzystać z tego programu” z jasnymi zaleceniami  
- Zaktualizowano linki do specyfikacji MCP na poprawne URL-e  
- Dodano sekcję Context Engineering (5.14) do struktury programu  

### Aktualizacje przewodnika nauki  
- Całkowicie zmieniono przewodnik nauki, aby dopasować do aktualnej struktury repozytorium  
- Dodano nowe sekcje dotyczące klientów MCP i narzędzi oraz popularnych serwerów MCP  
- Zaktualizowano wizualną mapę programu nauczania, aby dokładnie odzwierciedlała wszystkie tematy  
- Ulepszono opisy tematów zaawansowanych, aby objęły specjalistyczne obszary  
- Zaktualizowano sekcję studiów przypadków, aby odzwierciedlała faktyczne przykłady  
- Dodano ten kompleksowy changelog  

### Wkłady społeczności (06-CommunityContributions/)  
- Dodano szczegółowe informacje o serwerach MCP do generowania obrazów  
- Dodano obszerną sekcję dotyczącą używania Claude w VSCode  
- Dodano instrukcje instalacji i użycia klienta terminalowego Cline  
- Zaktualizowano sekcję klientów MCP, aby uwzględnić wszystkie popularne opcje klientów  
- Ulepszono przykłady wkładu z dokładniejszymi próbkami kodu  

### Tematy zaawansowane (05-AdvancedTopics/)  
- Uporządkowano wszystkie foldery z tematami specjalistycznymi ze spójną nomenklaturą  
- Dodano materiały i przykłady dotyczące inżynierii kontekstu  
- Dodano dokumentację integracji agenta Foundry  
- Ulepszono dokumentację integracji bezpieczeństwa Entra ID  

## 11 czerwca 2025

### Pierwsze wydanie  
- Wydano pierwszą wersję programu MCP dla początkujących  
- Stworzono podstawową strukturę wszystkich 10 głównych sekcji  
- Wdrożono wizualną mapę programu nauczania do nawigacji  
- Dodano początkowe przykładowe projekty w wielu językach programowania  

### Rozpoczęcie pracy (03-GettingStarted/)  
- Stworzono pierwsze przykłady implementacji serwera  
- Dodano wskazówki rozwoju klientów  
- Uwzględniono instrukcje integracji klientów LLM  
- Dodano dokumentację integracji VS Code  
- Wdrożono przykłady serwera Server-Sent Events (SSE)  

### Podstawowe pojęcia (01-CoreConcepts/)  
- Dodano szczegółowe wyjaśnienie architektury klient-serwer  
- Stworzono dokumentację kluczowych komponentów protokołu  
- Udokumentowano wzorce komunikatów w MCP  

## 23 maja 2025

### Struktura repozytorium  
- Zainicjowano repozytorium z podstawową strukturą folderów  
- Stworzono pliki README dla każdej głównej sekcji  
- Skonfigurowano infrastrukturę tłumaczeniową  
- Dodano zasoby obrazów i diagramów  

### Dokumentacja  
- Stworzono wstępny README.md z przeglądem programu nauczania  
- Dodano CODE_OF_CONDUCT.md i SECURITY.md  
- Skonfigurowano SUPPORT.md z wskazówkami uzyskania pomocy  
- Stworzono wstępną strukturę przewodnika nauki  

## 15 kwietnia 2025

### Planowanie i ramy  
- Wstępne planowanie programu MCP dla początkujących  
- Określono cele nauczania i grupę docelową  
- Nakreślono strukturę 10-sekcyjną programu nauczania  
- Opracowano ramy koncepcyjne dla przykładów i studiów przypadków  
- Stworzono wstępne prototypowe przykłady kluczowych pojęć  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->