# Changelog: MCP dla początkujących - program nauczania

Ten dokument służy jako zapis wszystkich istotnych zmian wprowadzonych do programu nauczania Model Context Protocol (MCP) dla początkujących. Zmiany są dokumentowane w porządku odwrotnym chronologicznie (najnowsze na początku).

## 5 lutego 2026

### Poprawki walidacji i nawigacji w całym repozytorium

#### Dodano nową zawartość programu nauczania

**Moduł 03 - Pierwsze kroki**
- **12-mcp-hosts/README.md**: Nowy kompleksowy przewodnik po konfiguracji hostów MCP
  - Przykłady konfiguracji Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Szablony konfiguracji JSON dla wszystkich głównych hostów
  - Tabela porównawcza typów transportu (stdio, SSE/HTTP, WebSocket)
  - Rozwiązywanie najczęstszych problemów z połączeniem
  - Najlepsze praktyki bezpieczeństwa konfiguracji hostów

- **13-mcp-inspector/README.md**: Nowy przewodnik debugowania MCP Inspector
  - Metody instalacji (npx, npm globalnie, ze źródeł)
  - Łączenie się z serwerami poprzez stdio i HTTP/SSE
  - Narzędzia testowe, zasoby i przepływy pracy promptów
  - Integracja MCP Inspector z VS Code
  - Typowe scenariusze debugowania wraz z rozwiązaniami

**Moduł 04 - Praktyczna implementacja**
- **pagination/README.md**: Nowy przewodnik implementacji paginacji
  - Wzorce paginacji opartej na kursorach w Python, TypeScript, Java
  - Obsługa paginacji po stronie klienta
  - Strategie projektowania kursorów (nieprzeźroczyste vs. strukturalne)
  - Rekomendacje optymalizacji wydajności

**Moduł 05 - Tematy zaawansowane**
- **mcp-protocol-features/README.md**: Nowe szczegółowe omówienie funkcji protokołu
  - Implementacja powiadomień o postępie
  - Wzorce anulowania żądań
  - Szablony zasobów z wzorcami URI
  - Zarządzanie cyklem życia serwera
  - Kontrola poziomów logowania
  - Wzorce obsługi błędów z kodami JSON-RPC

#### Poprawki nawigacji (zaktualizowano 24+ pliki)

**Główne READMEs modułów**
 Teraz zawierają linki zarówno do pierwszej lekcji, jak i do następnego modułu

**Pliki podrzędne 02-Security**
- Wszystkie 5 uzupełniających dokumentów bezpieczeństwa posiada teraz sekcję "Co dalej" z nawigacją:

**Pliki 09-CaseStudy**
- Wszystkie pliki case study mają teraz nawigację sekwencyjną:

**Laboratoria 10-StreamliningAI**
Dodano sekcję „Co dalej” do przeglądu Modułu 10 oraz Modułu 11

#### Poprawki kodu i zawartości

**Aktualizacje SDK i zależności**
Naprawiono pustą wersję openai na `^4.95.0`
Zaktualizowano SDK z `^1.8.0` do `>=1.26.0`
Zaktualizowano piny wersji mcp do `>=1.26.0`

**Poprawki kodu**
Poprawiono nieprawidłowy model `gpt-4o-mini` na `gpt-4.1-mini`

**Poprawki zawartości**
Naprawiono uszkodzony link `READMEmd` → `README.md`, poprawiono nagłówek programu `Module 1-3` → `Module 0-3`, poprawiono wielkość liter w ścieżce
Usunięto uszkodzoną zduplikowaną zawartość Case Study 5

**Ulepszenia dla początkujących**
Dodano właściwe wprowadzenie, cele nauki i wymagania wstępne dla początkujących

#### Aktualizacje programu nauczania

**Główny README.md**
- Dodano wpisy 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) do tabeli programu nauczania

**README-y modułów**
Dodano lekcje 12 i 13 do listy lekcji
Dodano sekcję Praktyczne przewodniki z linkiem do paginacji
Dodano lekcje 5.15 (Custom Transport) i 5.16 (Protocol Features)

**study_guide.md**
- Zaktualizowano mapę myśli o wszystkie nowe tematy: konfiguracja MCP Hosts, MCP Inspector, strategie paginacji, szczegółowe funkcje protokołu

## 28 stycznia 2026

### Przegląd zgodności ze Specyfikacją MCP 2025-11-25

#### Udoskonalenia kluczowych pojęć (01-CoreConcepts/)
- **Nowa prymitywna klienta - Roots**: Dodano kompleksową dokumentację prymitywu Roots, umożliwiającego serwerom rozumienie granic systemu plików i uprawnień dostępu
- **Adnotacje narzędziowe**: Dodano dokumentację adnotacji zachowania narzędzi (`readOnlyHint`, `destructiveHint`) dla lepszych decyzji wykonawczych narzędzi
- **Wywoływanie narzędzi w sampling**: Zaktualizowano dokumentację Sampling o parametry `tools` i `toolChoice` do wywoływania narzędzi sterowanych modelem podczas próbkowania
- **Uwydatnienie trybu URL**: Dodano dokumentację uwydatnienia opartego na URL dla zainicjowanych przez serwer zewnętrznych interakcji sieciowych
- **Zadania (eksperymentalne)**: Dodano nową sekcję dokumentującą funkcję eksperymentalnych Zadań do trwałych opakowań wykonywania i odroczonego pobierania wyników
- **Obsługa ikon**: Zauważono, że narzędzia, zasoby, szablony zasobów i prompt-y mogą teraz zawierać ikony jako dodatkowe metadane

#### Aktualizacje dokumentacji
- **README.md**: Dodano odniesienie do wersji Specyfikacji MCP 2025-11-25 oraz wyjaśnienie wersjonowania bazującego na dacie
- **study_guide.md**: Zaktualizowano mapę programu nauczania o Zadania i Adnotacje narzędzi w sekcji Podstawy; zaktualizowano znacznik czasu dokumentu

#### Weryfikacja zgodności specyfikacji
- **Wersja protokołu**: Potwierdzono, że cała dokumentacja odnosi się do aktualnej Specyfikacji MCP 2025-11-25
- **Zgodność architektury**: Potwierdzono poprawność dokumentacji dwuwarstwowej architektury (Warstwa danych + Warstwa transportu)
- **Dokumentacja prymityw**: Zweryfikowano prymitywy serwera (Zasoby, Prompty, Narzędzia) oraz prymitywy klienta (Sampling, Elicitation, Logging, Roots)
- **Mechanizmy transportu**: Zweryfikowano poprawność dokumentacji transportu STDIO i Streamable HTTP
- **Wskazówki bezpieczeństwa**: Potwierdzono zgodność z aktualną dokumentacją najlepszych praktyk bezpieczeństwa MCP

#### Kluczowe funkcje MCP 2025-11-25 udokumentowane
- **Odkrywanie OpenID Connect**: Odkrywanie serwera uwierzytelniającego przez OIDC
- **Dokumenty metadanych OAuth Client ID**: Rekomendowany mechanizm rejestracji klienta
- **JSON Schema 2020-12**: Domyślny dialekt dla definicji schematów MCP
- **System warstw SDK**: Sformalizowane wymagania dotyczące obsługi i utrzymania funkcji SDK
- **Struktura zarządzania**: Sformalizowane grupy robocze i grupy zainteresowań w zarządzaniu MCP

### Duża aktualizacja dokumentacji bezpieczeństwa (02-Security/)

#### Integracja warsztatów MCP Security Summit (Sherpa)
- **Nowe praktyczne materiały szkoleniowe**: Dodana kompleksowa integracja z [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) w całej dokumentacji bezpieczeństwa
- **Pokrycie trasy ekspedycji**: Udokumentowano pełną progresję z bazy do szczytu
- **Zgodność z OWASP**: Cała dokumentacja bezpieczeństwa odnosi się do ryzyk MCP według OWASP MCP Azure Security Guide

#### Integracja OWASP MCP Top 10
- **Nowa sekcja**: Dodano tabelę ryzyk OWASP MCP Top 10 z mitigacjami Azure do głównego README bezpieczeństwa
- **Dokumentacja oparta na ryzyku**: Zaktualizowano mcp-security-controls-2025.md o odniesienia do ryzyk OWASP MCP dla każdego obszaru bezpieczeństwa
- **Architektura referencyjna**: Podlinkowano do architektury referencyjnej i wzorców implementacyjnych OWASP MCP Azure Security Guide

#### Zaktualizowane pliki bezpieczeństwa
- **README.md**: Dodano przegląd warsztatu Sherpa, tabelę trasy ekspedycji, podsumowanie ryzyk OWASP MCP Top 10 i sekcję praktycznego szkolenia
- **mcp-security-controls-2025.md**: Zaktualizowano nagłówek na luty 2026, dodano odniesienia do ryzyk OWASP (MCP01-MCP08), naprawiono niespójność wersji specyfikacji
- **mcp-security-best-practices-2025.md**: Dodano sekcję zasobów Sherpa i OWASP, zaktualizowano znacznik czasu
- **mcp-best-practices.md**: Dodano sekcję praktycznego szkolenia z linkami do Sherpa i OWASP
- **azure-content-safety-implementation.md**: Dodano odniesienie MCP06 OWASP, zgodność z Camp 3 Sherpa oraz dodatkową sekcję zasobów

#### Dodano nowe linki do zasobów
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Indywidualne strony ryzyk OWASP MCP (MCP01-MCP10)

### Wyrównanie całego programu nauczania do Specyfikacji MCP 2025-11-25

#### Moduł 03 - Pierwsze kroki
- **Dokumentacja SDK**: Dodano Go SDK do oficjalnej listy SDK; zaktualizowano wszystkie odniesienia SDK zgodnie ze Specyfikacją MCP 2025-11-25
- **Wyjaśnienia transportu**: Zaktualizowano opisy transportu STDIO i HTTP Streaming o jednoznaczne odniesienia do specyfikacji

#### Moduł 04 - Praktyczna implementacja
- **Aktualizacje SDK**: Dodano Go SDK; zaktualizowano listę SDK wraz z odniesieniem do wersji specyfikacji
- **Specyfikacja autoryzacji**: Zaktualizowano link do specyfikacji autoryzacji MCP na aktualną wersję 2025-11-25

#### Moduł 05 - Tematy zaawansowane
- **Nowe funkcje**: Dodano notatkę o nowych funkcjach MCP Specyfikacji 2025-11-25 (Zadania, Adnotacje narzędzi, Uwydatnienie trybu URL, Roots)
- **Zasoby bezpieczeństwa**: Dodano linki do OWASP MCP Top 10 i warsztatów Sherpa w dodatkowych odnośnikach

#### Moduł 06 - Wkład społeczności
- **Lista SDK**: Dodano SDK Swift i Rust; zaktualizowano link do specyfikacji MCP 2025-11-25
- **Odniesienie do specyfikacji**: Zaktualizowano link do bezpośredniego URL specyfikacji MCP

#### Moduł 07 - Lekcje z wczesnej adopcji
- **Aktualizacje zasobów**: Dodano link do Specyfikacji MCP 2025-11-25 oraz OWASP MCP Top 10 w dodatkowych zasobach

#### Moduł 08 - Najlepsze praktyki
- **Wersja specyfikacji**: Zaktualizowano odniesienie do Specyfikacji MCP 2025-11-25
- **Zasoby bezpieczeństwa**: Dodano OWASP MCP Top 10 i warsztat Sherpa do dodatkowych zasobów

#### Moduł 10 - Usprawnianie przepływów AI
- **Aktualizacja odznaki**: Zmieniono odznakę wersji MCP z wersji SDK (1.9.3) na wersję specyfikacji (2025-11-25)
- **Linki do zasobów**: Zaktualizowano link do Specyfikacji MCP; dodano OWASP MCP Top 10

#### Moduł 11 - Laboratoria praktyczne MCP Server
- **Odniesienie do specyfikacji**: Zaktualizowano link do wersji Specyfikacji MCP 2025-11-25
- **Zasoby bezpieczeństwa**: Dodano OWASP MCP Top 10 do oficjalnych zasobów

## 18 grudnia 2025

### Aktualizacja dokumentacji bezpieczeństwa - Specyfikacja MCP 2025-11-25

#### Najlepsze praktyki bezpieczeństwa MCP (02-Security/mcp-best-practices.md) - aktualizacja wersji specyfikacji
- **Aktualizacja wersji protokołu**: Zaktualizowano, aby odnosić się do najnowszej Specyfikacji MCP 2025-11-25 (wydanej 25 listopada 2025)
  - Zmieniono wszystkie odniesienia wersji specyfikacji z 2025-06-18 na 2025-11-25
  - Zmieniono daty dokumentu z 18 sierpnia 2025 na 18 grudnia 2025
  - Zweryfikowano, że wszystkie adresy URL specyfikacji wskazują na aktualną dokumentację
- **Weryfikacja zawartości**: Kompleksowa weryfikacja najlepszych praktyk bezpieczeństwa względem najnowszych standardów
  - **Microsoft Security Solutions**: Zweryfikowano aktualność terminologii i linków dotyczących Prompt Shields (wcześniej "wykrywanie ryzyka jailbreak"), Azure Content Safety, Microsoft Entra ID i Azure Key Vault
  - **Bezpieczeństwo OAuth 2.1**: Potwierdzono zgodność z najnowszymi najlepszymi praktykami bezpieczeństwa OAuth
  - **Standardy OWASP**: Zweryfikowano aktualność odniesień OWASP Top 10 dla LLM
  - **Usługi Azure**: Zweryfikowano wszystkie linki i najlepsze praktyki Microsoft Azure
- **Zgodność ze standardami**: Potwierdzono aktualność wszystkich referencjonowanych standardów bezpieczeństwa
  - Ramy zarządzania ryzykiem AI NIST
  - ISO 27001:2022
  - Najlepsze praktyki bezpieczeństwa OAuth 2.1
  - Ramy bezpieczeństwa i zgodności Azure
- **Zasoby implementacyjne**: Zweryfikowano wszystkie linki do przewodników implementacyjnych i zasobów
  - Wzorce uwierzytelniania w Azure API Management
  - Przewodniki integracji Microsoft Entra ID
  - Zarządzanie sekretami w Azure Key Vault
  - Potoki DevSecOps i rozwiązania monitoringu

### Zapewnienie jakości dokumentacji
- **Zgodność specyfikacji**: Zapewniono, że wszystkie obowiązkowe wymagania bezpieczeństwa MCP (MUST/MUST NOT) są zgodne z najnowszą specyfikacją
- **Aktualność zasobów**: Zweryfikowano wszystkie zewnętrzne linki do dokumentacji Microsoft, standardów bezpieczeństwa i przewodników implementacji
- **Zakres najlepszych praktyk**: Potwierdzono pełne pokrycie uwierzytelniania, autoryzacji, zagrożeń specyficznych dla AI, bezpieczeństwa łańcucha dostaw i wzorców korporacyjnych

## 6 października 2025

### Rozszerzenie sekcji "Pierwsze kroki" – zaawansowane użycie serwera i prosta autoryzacja

#### Zaawansowane użycie serwera (03-GettingStarted/10-advanced)
- **Dodany nowy rozdział**: Wprowadzono obszerny przewodnik po zaawansowanym użyciu serwera MCP, obejmujący architektury serwerów regularnych i niskiego poziomu.
  - **Serwer regularny vs. niskiego poziomu**: Szczegółowe porównanie i przykłady kodu w Python i TypeScript dla obu podejść.
  - **Projekt oparty na handlerach**: Wyjaśnienie zarządzania narzędziami/zasobami/promptami opartego na handlerach dla skalowalnych i elastycznych implementacji serwera.
  - **Praktyczne wzorce**: Scenariusze z życia wzięte, gdzie wzorce serwera niskiego poziomu są korzystne dla zaawansowanych funkcji i architektury.

#### Prosta autoryzacja (03-GettingStarted/11-simple-auth)
- **Dodany nowy rozdział**: Przewodnik krok po kroku wdrażania prostej autoryzacji w serwerach MCP.
  - **Koncepcje uwierzytelniania**: Jasne wyjaśnienie różnicy między uwierzytelnianiem a autoryzacją oraz obsługi poświadczeń.
  - **Implementacja Basic Auth**: Wzorce autoryzacji oparte na middleware w Python (Starlette) i TypeScript (Express) wraz z przykładami kodu.
  - **Postęp do zaawansowanego bezpieczeństwa**: Wskazówki jak zacząć od prostej autoryzacji i rozwijać się do OAuth 2.1 oraz RBAC, z odnośnikami do modułów zaawansowanego bezpieczeństwa.

Te dodatki oferują praktyczne, hands-on wskazówki do budowania bardziej solidnych, bezpiecznych i elastycznych implementacji serwerów MCP, łącząc podstawowe koncepcje z zaawansowanymi wzorcami produkcyjnymi.

## 29 września 2025

### Laboratoria integracji baz danych MCP Server - kompleksowa ścieżka nauki praktycznej

#### 11-MCPServerHandsOnLabs - nowy kompletny program nauczania integracji baz danych
- **Kompletny Ścieżka Nauki z 13 Laboratoriami**: Dodano kompleksowy praktyczny program nauczania budowania produkcyjnych serwerów MCP z integracją bazy danych PostgreSQL  
  - **Realna Implementacja**: Przypadek użycia analityki Zava Retail prezentujący wzorce klasy enterprise  
  - **Ustrukturyzowany Postęp Nauki**:  
    - **Laboratoria 00-03: Podstawy** - Wprowadzenie, Architektura rdzenia, Bezpieczeństwo i Wielodostępność, Konfiguracja środowiska  
    - **Laboratoria 04-06: Budowa Serwera MCP** - Projektowanie bazy danych i schematu, Implementacja serwera MCP, Rozwój narzędzi  
    - **Laboratoria 07-09: Zaawansowane Funkcje** - Integracja wyszukiwania semantycznego, Testowanie i debugowanie, Integracja z VS Code  
    - **Laboratoria 10-12: Produkcja i Najlepsze Praktyki** - Strategie wdrożenia, Monitorowanie i obserwowalność, Najlepsze praktyki i optymalizacja  
  - **Technologie Enterprise**: Framework FastMCP, PostgreSQL z pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights  
  - **Zaawansowane Funkcje**: Bezpieczeństwo na poziomie wiersza (RLS), wyszukiwanie semantyczne, dostęp do danych wielodostępnych, osadzenia wektorowe, monitorowanie w czasie rzeczywistym  

#### Standaryzacja Terminologii – Konwersja Moduł → Laboratorium  
- **Kompleksowa Aktualizacja Dokumentacji**: Systematyczna aktualizacja wszystkich plików README w 11-MCPServerHandsOnLabs na terminologię "Laboratorium" zamiast "Moduł"  
  - **Nagłówki Sekcji**: Zmieniono "What This Module Covers" na "What This Lab Covers" we wszystkich 13 laboratoriach  
  - **Opis Treści**: Zmieniono "This module provides..." na "This lab provides..." w całej dokumentacji  
  - **Cele Nauki**: Zmieniono "By the end of this module..." na "By the end of this lab..."  
  - **Linki Nawigacyjne**: Przekształcono wszystkie odniesienia "Module XX:" na "Lab XX:" w odnośnikach i nawigacji  
  - **Śledzenie Ukończenia**: Zmieniono "After completing this module..." na "After completing this lab..."  
  - **Zachowano Odwołania Techniczne**: Zachowano odniesienia do modułów Pythona w plikach konfiguracyjnych (np. `"module": "mcp_server.main"`)  

#### Ulepszenia Przewodnika do Nauki (study_guide.md)  
- **Wizualna Mapa Programu Nauki**: Dodano nową sekcję "11. Database Integration Labs" z wizualizacją struktury laboratoriów  
- **Struktura Repozytorium**: Aktualizacja z dziesięciu do jedenastu głównych sekcji wraz ze szczegółowym opisem 11-MCPServerHandsOnLabs  
- **Wskazówki Ścieżki Nauki**: Ulepszone instrukcje nawigacji obejmujące sekcje 00-11  
- **Pokrycie Technologii**: Dodano szczegóły dotyczące integracji FastMCP, PostgreSQL, usług Azure  
- **Efekty Nauki**: Podkreślono rozwój serwerów gotowych do produkcji, wzorce integracji baz danych i bezpieczeństwo klasy enterprise  

#### Ulepszenia Struktury Głównego README  
- **Terminologia oparta na Laboratoriach**: Zaktualizowano główny README.md w 11-MCPServerHandsOnLabs do spójnego używania struktury "Laboratorium"  
- **Organizacja Ścieżki Nauki**: Jasny postęp od podstawowych koncepcji przez zaawansowaną implementację po wdrożenie produkcyjne  
- **Ukierunkowanie na Praktykę**: Nacisk na uczenie praktyczne z zastosowaniem wzorców i technologii klasy enterprise  

### Poprawa Jakości i Spójności Dokumentacji  
- **Nacisk na Praktyczne Nauczanie**: Wzmacnianie podejścia opartego na praktycznych laboratoriach w całej dokumentacji  
- **Skupienie na Wzorach Enterprise**: Podkreślenie produkcyjnych implementacji i zagadnień bezpieczeństwa klasy enterprise  
- **Integracja Technologii**: Kompleksowe omówienie nowoczesnych usług Azure i wzorców integracji AI  
- **Postęp Nauki**: Jasna, ustrukturyzowana ścieżka od podstaw do wdrożenia produkcyjnego  

## 26 września 2025

### Ulepszenie Studiów Przypadków – Integracja GitHub MCP Registry  

#### Studia Przypadków (09-CaseStudy/) – Skupienie na Rozwoju Ekosystemu  
- **README.md**: Znaczne rozszerzenie o kompleksowe studium przypadku dotyczące GitHub MCP Registry  
  - **Studium Przypadku GitHub MCP Registry**: Nowe dogłębne studium przypadku analizujące uruchomienie GitHub MCP Registry we wrześniu 2025  
    - **Analiza Problemu**: Szczegółowe omówienie problemów z rozproszonym wykrywaniem i wdrażaniem serwerów MCP  
    - **Architektura Rozwiązania**: Centralne podejście rejestru GitHub z instalacją VS Code jednym kliknięciem  
    - **Wpływ Biznesowy**: Mierzalna poprawa onboardingu i produktywności programistów  
    - **Wartość Strategiczna**: Skoncentrowanie na modularnym wdrażaniu agentów oraz interoperacyjności narzędzi  
    - **Rozwój Ekosystemu**: Pozycjonowanie jako fundament platformy do integracji agentów  
  - **Ulepszona Struktura Studiów Przypadków**: Zaktualizowano wszystkie siedem studiów przypadków z jednolitym formatowaniem i szczegółowymi opisami  
    - Agent AI do podróży na Azure: Nacisk na orkiestrację wielu agentów  
    - Integracja Azure DevOps: Automatyzacja przepływów pracy  
    - Pobieranie dokumentacji w czasie rzeczywistym: Implementacja klienta konsolowego w Pythonie  
    - Interaktywny generator planów nauki: Aplikacja webowa Chainlit z konwersacją  
    - Dokumentacja w edytorze: Integracja VS Code i GitHub Copilot  
    - Azure API Management: Wzorce integracji API klasy enterprise  
    - GitHub MCP Registry: Rozwój ekosystemu i platforma społecznościowa  
  - **Kompleksowe Podsumowanie**: Przepisany rozdział podsumowujący siedem studiów przypadków obejmujących różne wymiary implementacji MCP  
    - Integracja Enterprise, Orkiestracja Multi-Agent, Produktywność programistów  
    - Rozwój Ekosystemu, kategoryzacja zastosowań edukacyjnych  
    - Pogłębione spostrzeżenia dotyczące wzorców architektonicznych, strategii wdrożenia i najlepszych praktyk  
    - Podkreślenie MCP jako dojrzałego, gotowego do produkcji protokołu  

#### Aktualizacje Przewodnika do Nauki (study_guide.md)  
- **Wizualna Mapa Programu Nauki**: Zaktualizowano mindmapę o GitHub MCP Registry w sekcji Studiów Przypadków  
- **Opis Studiów Przypadków**: Rozbudowa z ogólnych opisów do szczegółowego podziału siedmiu kompleksowych studiów  
- **Struktura Repozytorium**: Aktualizacja sekcji 10 odzwierciedlająca kompleksowe omówienie studiów przypadku wraz z szczegółami implementacji  
- **Integracja Zmian w Dzienniku**: Dodano wpis z 26 września 2025 dokumentujący dodanie GitHub MCP Registry i ulepszenia studiów przypadku  
- **Aktualizacja Daty**: Zaktualizowano znacznik czasowy stopki na najnowszą rewizję (26 września 2025)  

### Poprawa Jakości Dokumentacji  
- **Ujednolicenie Struktury**: Standaryzacja formatowania i struktury studiów przypadku we wszystkich siedmiu przykładach  
- **Kompleksowe Pokrycie**: Studia przypadków obejmują przypadki enterprise, produktywności deweloperów i rozwój ekosystemu  
- **Pozycjonowanie Strategiczne**: Wzmocniony nacisk na MCP jako platformę bazową do wdrożenia systemów agentowych  
- **Integracja Zasobów**: Aktualizacja dodatkowych zasobów o link do GitHub MCP Registry  

## 15 września 2025

### Rozszerzenie Tematów Zaawansowanych – Własne Transporty i Inżynieria Kontekstu  

#### Własne Transporty MCP (05-AdvancedTopics/mcp-transport/) – Nowy Przewodnik Implementacji Zaawansowanej  
- **README.md**: Kompletny przewodnik implementacji własnych mechanizmów transportu MCP  
  - **Transport Azure Event Grid**: Kompleksowa implementacja transportu bezserwerowego zdarzeniowego  
    - Przykłady w C#, TypeScript i Python z integracją Azure Functions  
    - Wzorce architektury zdarzeniowej dla skalowalnych rozwiązań MCP  
    - Odbiorniki webhooków i obsługa komunikatów push  
  - **Transport Azure Event Hubs**: Implementacja wysokoprzepustowego strumieniowego transportu  
    - Możliwości strumieniowania w czasie rzeczywistym dla scenariuszy niskiej latencji  
    - Strategie partycjonowania i zarządzania checkpointami  
    - Łączenie komunikatów i optymalizacja wydajności  
  - **Wzorce Integracji Enterprise**: Produkcyjne przykłady architektury  
    - Rozproszona przetwarzanie MCP na wielu Azure Functions  
    - Hybrydowe architektury transportowe łączące różne typy transportu  
    - Trwałość komunikatów, niezawodność i strategie obsługi błędów  
  - **Bezpieczeństwo i Monitorowanie**: Integracja Azure Key Vault i wzorce obserwowalności  
    - Uwierzytelnianie tożsamości zarządzanej i minimalizowanie uprawnień  
    - Telemetria Application Insights i monitorowanie wydajności  
    - Obwody zabezpieczające i wzorce tolerancji błędów  
  - **Frameworki Testowe**: Kompleksowe strategie testowania własnych transportów  
    - Testy jednostkowe z test doubles i frameworkami do mockowania  
    - Testy integracyjne z Azure Test Containers  
    - Rozważania dotyczące testów wydajności i obciążeniowych  

#### Inżynieria Kontekstu (05-AdvancedTopics/mcp-contextengineering/) – Nowa Dyscyplina AI  
- **README.md**: Kompleksowe omówienie inżynierii kontekstu jako rozwijającej się dziedziny  
  - **Podstawowe Zasady**: Pełne dzielenie się kontekstem, świadomość podejmowania decyzji o działaniach, zarządzanie oknem kontekstu  
  - **Zgodność z Protokółem MCP**: Jak projekt MCP odpowiada na wyzwania inżynierii kontekstu  
    - Ograniczenia okna kontekstu i strategie progresywnego ładowania  
    - Określanie relewancji i dynamiczne pobieranie kontekstu  
    - Obsługa wielomodalnego kontekstu i zagadnienia bezpieczeństwa  
  - **Podejścia Implementacyjne**: Architektury jedno- i wieloagentowe  
    - Dzielnie kontekstu na kawałki i techniki priorytetyzacji  
    - Progresywne ładowanie i strategie kompresji kontekstu  
    - Warstwowe podejścia do kontekstu i optymalizacja pobierania  
  - **Ramowy System Pomiaru**: Nowe metryki efektywności kontekstu  
    - Efektywność wejścia, wydajność, jakość i doświadczenie użytkownika  
    - Eksperymentalne podejścia do optymalizacji kontekstu  
    - Analiza błędów i metody poprawy  

#### Aktualizacje Nawigacji Programu Nauki (README.md)  
- **Ulepszona Struktura Modułów**: Aktualizacja tabeli programu o nowe tematy zaawansowane  
  - Dodano Inżynierię Kontekstu (5.14) oraz Własny Transport (5.15)  
  - Spójne formatowanie i linki nawigacyjne we wszystkich modułach  
  - Zaktualizowane opisy odzwierciedlające obecny zakres treści  

### Ulepszenia Struktury Katalogów  
- **Standaryzacja Nazewnictwa**: Zmieniono nazwę "mcp transport" na "mcp-transport" aby zachować spójność z innymi folderami tematów zaawansowanych  
- **Organizacja Zawartości**: Wszystkie foldery 05-AdvancedTopics stosują obecnie spójny wzorzec nazewnictwa (mcp-[temat])  

### Poprawa Jakości Dokumentacji  
- **Zgodność z Specyfikacją MCP**: Wszystkie nowe treści odnoszą się do aktualnej Specyfikacji MCP 2025-06-18  
- **Przykłady Wielojęzyczne**: Kompleksowe przykłady kodu w C#, TypeScript i Python  
- **Skupienie na Enterprise**: Wzorce produkcyjne i integracja z chmurą Azure na całej dokumentacji  
- **Wizualizacja Dokumentacji**: Diagramy Mermaid ilustrujące architekturę i przepływy  

## 18 sierpnia 2025

### Kompleksowa Aktualizacja Dokumentacji – Standardy MCP 2025-06-18  

#### Najlepsze Praktyki Bezpieczeństwa MCP (02-Security/) – Całkowita Modernizacja  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Pełne przepisanie zgodne ze Specyfikacją MCP 2025-06-18  
  - **Wymagania Obowiązkowe**: Dodano wyraźne wymogi MUSI/NIE WOLNO z oficjalnej specyfikacji z jasnymi wskaźnikami wizualnymi  
  - **12 Kluczowych Praktyk Bezpieczeństwa**: Przekształcone z listy 15 elementów w całościowe domeny bezpieczeństwa  
    - Bezpieczeństwo tokenów i uwierzytelnianie z integracją zewnętrznych dostawców tożsamości  
    - Zarządzanie sesją i bezpieczeństwo transportu z wymaganiami kryptograficznymi  
    - Ochrona przed zagrożeniami specyficznymi dla AI z integracją Microsoft Prompt Shields  
    - Kontrola dostępu i uprawnienia zgodnie z zasadą najmniejszych przywilejów  
    - Bezpieczeństwo treści i monitorowanie z integracją Azure Content Safety  
    - Bezpieczeństwo łańcucha dostaw z kompleksową weryfikacją komponentów  
    - Bezpieczeństwo OAuth i ochrona przed atakami typu Confused Deputy z implementacją PKCE  
    - Reakcja na incydenty i odzyskiwanie z automatyzacją  
    - Zgodność i nadzór regulacyjny  
    - Zaawansowane Kontrole Bezpieczeństwa z architekturą zero trust  
    - Integracja z ekosystemem bezpieczeństwa Microsofta z kompleksowymi rozwiązaniami  
    - Ciągła ewolucja bezpieczeństwa z adaptacyjnymi praktykami  
  - **Rozwiązania Bezpieczeństwa Microsoft**: Rozbudowane wskazówki integracji Prompt Shields, Azure Content Safety, Entra ID i GitHub Advanced Security  
  - **Zasoby Implementacyjne**: Skategoryzowane linki do dokumentacji oficjalnej MCP, rozwiązań Microsoft, standardów i przewodników implementacji  

#### Zaawansowane Kontrole Bezpieczeństwa (02-Security/) – Realizacja Enterprise  
- **MCP-SECURITY-CONTROLS-2025.md**: Kompletny przegląd z ramami bezpieczeństwa klasy enterprise  
  - **9 Kompleksowych Domen Bezpieczeństwa**: Rozszerzono podstawowe kontrole do szczegółowego frameworku enterprise  
    - Zaawansowane uwierzytelnianie i autoryzacja z integracją Microsoft Entra ID  
    - Bezpieczeństwo tokenów i kontrola anty-passthrough z pełną walidacją  
    - Kontrole bezpieczeństwa sesji przeciwdziałające przejęciu  
    - Kontrole bezpieczeństwa specyficzne dla AI: zapobieganie wstrzyknięciom promptów i zatruciu narzędzi  
    - Zapobieganie atakom typu Confused Deputy z zabezpieczeniami proxy OAuth  
    - Bezpieczeństwo wykonywania narzędzi z sandboxingiem i izolacją  
    - Kontrole bezpieczeństwa łańcucha dostaw z weryfikacją zależności  
    - Kontrole monitorowania i wykrywania z integracją SIEM  
    - Reakcja na incydenty i odzyskiwanie z automatyzacją  
  - **Przykłady Implementacji**: Dodano szczegółowe bloki konfiguracji YAML oraz przykłady kodu  
  - **Integracja Rozwiązań Microsoft**: Kompleksowe omówienie usług bezpieczeństwa Azure, GitHub Advanced Security i zarządzania tożsamością enterprise  

#### Tematy Zaawansowane Bezpieczeństwa (05-AdvancedTopics/mcp-security/) – Implementacja Produkcyjna  
- **README.md**: Pełne przepisanie dla wdrożeń bezpieczeństwa klasy enterprise  
  - **Aktualna Zgodność Specyfikacji**: Zaktualizowano zgodnie z Specyfikacją MCP 2025-06-18 oraz wymogami bezpieczeństwa  
  - **Zaawansowane Uwierzytelnianie**: Integracja Microsoft Entra ID z kompleksowymi przykładami .NET i Java Spring Security  
  - **Integracja Bezpieczeństwa AI**: Implementacja Microsoft Prompt Shields i Azure Content Safety z przykładami Pythona  
  - **Zaawansowane Łagodzenie Zagrożeń**: Kompleksowe przykłady dotyczące  
    - Zapobiegania atakom Confused Deputy z PKCE i weryfikacją zgody użytkownika  
    - Zapobiegania przekazywaniu tokenów (Token Passthrough) z walidacją odbiorcy i bezpiecznym zarządzaniem tokenami  
    - Zapobiegania przejęciu sesji z kryptograficznym powiązaniem i analizą zachowania  
  - **Integracja Enterprise Bezpieczeństwa**: Monitorowanie Azure Application Insights, potoki wykrywania zagrożeń i bezpieczeństwo łańcucha dostaw  
  - **Lista Kontrolna Implementacji**: Wyraźne rozróżnienie wymagań obowiązkowych i zalecanych wraz z korzyściami ekosystemu bezpieczeństwa Microsoft  

### Poprawa Jakości i Zgodności Dokumentacji  
- **Odniesienia do Specyfikacji**: Aktualizacja wszystkich odniesień do aktualnej Specyfikacji MCP 2025-06-18  
- **Ekosystem Bezpieczeństwa Microsoft**: Ulepszone wskazówki integracyjne we wszystkich dokumentach związanych z bezpieczeństwem  
- **Praktyczna Implementacja**: Szczegółowe przykłady kodu w .NET, Java i Python z wzorcami klasy enterprise  
- **Organizacja Zasobów**: Kompleksowa kategoryzacja oficjalnej dokumentacji, standardów bezpieczeństwa i przewodników implementacyjnych  
- **Wskaźniki Wizualne**: Jasne oznaczenia wymagań obowiązkowych i zalecanych praktyk  

#### Podstawowe Koncepcje (01-CoreConcepts/) – Kompleksowa Modernizacja  
- **Aktualizacja Wersji Protokołu**: Odniesienie do aktualnej Specyfikacji MCP 2025-06-18 z wersjonowaniem w formacie RRRR-MM-DD  
- **Udoskonalenie Architektury**: Rozbudowane opisy Hostów, Klientów i Serwerów odzwierciedlające aktualne wzorce architektury MCP
  - Hosty jasno zdefiniowane jako aplikacje AI koordynujące wiele połączeń klienta MCP
  - Klienci opisani jako łączniki protokołu utrzymujące relacje jeden do jednego z serwerami
  - Serwery rozszerzone o scenariusze wdrożenia lokalnego vs. zdalnego
- **Prymitywna restrukturyzacja**: Całkowita przebudowa prymitywów serwera i klienta
  - Prymitywy serwera: Zasoby (źródła danych), Podpowiedzi (szablony), Narzędzia (wykonywalne funkcje) z szczegółowymi wyjaśnieniami i przykładami
  - Prymitywy klienta: Próbowanie (ukończenia LLM), Wywoływanie (wejście użytkownika), Logowanie (debugowanie/monitoring)
  - Zaktualizowano o aktualne wzorce metod odkrywania (`*/list`), pobierania (`*/get`) i wykonywania (`*/call`)
- **Architektura protokołu**: Wprowadzono model architektury dwuwarstwowej
  - Warstwa danych: fundament JSON-RPC 2.0 z zarządzaniem cyklem życia i prymitywami
  - Warstwa transportu: STDIO (lokalny) oraz Streamable HTTP z SSE (zdalny) mechanizmy transportowe
- **Ramowy system bezpieczeństwa**: Kompleksowe zasady bezpieczeństwa obejmujące wyraźną zgodę użytkownika, ochronę prywatności danych, bezpieczeństwo wykonywania narzędzi oraz zabezpieczenia warstwy transportowej
- **Wzorce komunikacji**: Zaktualizowano komunikaty protokołu, aby pokazać inicjalizację, odkrywanie, wykonywanie i przepływy powiadomień
- **Przykłady kodu**: Odświeżone przykłady wielojęzyczne (.NET, Java, Python, JavaScript) odzwierciedlające aktualne wzorce MCP SDK

#### Bezpieczeństwo (02-Security/) - Kompleksowa przebudowa bezpieczeństwa  
- **Dostosowanie do standardów**: Pełne dostosowanie do wymagań bezpieczeństwa specyfikacji MCP z 2025-06-18
- **Ewolucja uwierzytelniania**: Udokumentowana ewolucja od niestandardowych serwerów OAuth do delegowania na zewnętrznego dostawcę tożsamości (Microsoft Entra ID)
- **Analiza zagrożeń specyficznych dla AI**: Rozszerzone omówienie nowoczesnych wektorów ataku AI
  - Szczegółowe scenariusze ataków wstrzykiwania podpowiedzi z przykładami z rzeczywistego świata
  - Mechanizmy zatruwania narzędzi i wzorce ataków „rug pull”
  - Ataki zatruwania okna kontekstowego i mylenia modeli
- **Rozwiązania bezpieczeństwa Microsoft AI**: Kompleksowe omówienie ekosystemu bezpieczeństwa Microsoft
  - AI Prompt Shields z zaawansowanymi technikami wykrywania, wyróżniania i ograniczników
  - Wzorce integracji Azure Content Safety
  - GitHub Advanced Security dla ochrony łańcucha dostaw
- **Zaawansowane łagodzenie zagrożeń**: Szczegółowe kontrole bezpieczeństwa dla
  - Przejęcia sesji z scenariuszami ataków specyficznymi dla MCP oraz wymaganiami kryptograficznymi dla ID sesji
  - Problemów z „confused deputy” w scenariuszach proxy MCP z wymaganiami wyraźnej zgody
  - Luka w przekazywaniu tokenów z obowiązkową walidacją
- **Bezpieczeństwo łańcucha dostaw**: Rozszerzone zagadnienia dotyczące łańcucha dostaw AI, w tym modeli podstawowych, usług osadzania, dostawców kontekstu i zewnętrznych API
- **Bezpieczeństwo fundamentu**: Wzmocniona integracja z wzorcami bezpieczeństwa przedsiębiorstwa, w tym architektura zero trust oraz ekosystem bezpieczeństwa Microsoft
- **Organizacja zasobów**: Skategoryzowane kompleksowe linki do zasobów według typu (Oficjalna dokumentacja, Standardy, Badania, Rozwiązania Microsoft, Przewodniki wdrożeniowe)

### Ulepszenia jakości dokumentacji
- **Strukturyzowane cele nauki**: Wzmocnione cele nauki z konkretnymi, wykonalnymi rezultatami
- **Odsyłacze krzyżowe**: Dodane linki między powiązanymi tematami bezpieczeństwa i koncepcji podstawowych
- **Aktualne informacje**: Zaktualizowane wszystkie daty i linki do specyfikacji zgodnie z aktualnymi standardami
- **Wskazówki wdrożeniowe**: Dodane konkretne, wykonalne wskazówki wdrożeniowe w obu sekcjach

## 16 lipca 2025

### README i ulepszenia nawigacji
- Całkowicie przeprojektowana nawigacja programu nauczania w README.md
- Zastąpiono tagi `<details>` bardziej dostępnym formatem tabelarycznym
- Stworzono alternatywne opcje układu w nowym folderze "alternative_layouts"
- Dodano przykłady nawigacji w stylu kart, zakładek i akordeonu
- Zaktualizowano sekcję struktury repozytorium o wszystkie najnowsze pliki
- Wzmocniono sekcję "Jak korzystać z tego programu nauczania" o jasne zalecenia
- Zaktualizowano linki specyfikacji MCP, by wskazywały poprawne adresy URL
- Dodano sekcję Inżynieria kontekstu (5.14) do struktury programu

### Aktualizacje przewodnika nauki
- Całkowicie zrewidowano przewodnik nauki pod kątem aktualnej struktury repozytorium
- Dodano nowe sekcje dotyczące klientów i narzędzi MCP oraz popularnych serwerów MCP
- Zaktualizowano wizualną mapę programu nauczania, aby dokładnie odzwierciedlała wszystkie tematy
- Wzbogacono opisy tematów zaawansowanych obejmujące wszystkie obszary specjalistyczne
- Zaktualizowano sekcję studiów przypadków, aby odzwierciedlała rzeczywiste przykłady
- Dodano ten kompleksowy dziennik zmian

### Wkład społeczności (06-CommunityContributions/)
- Dodano szczegółowe informacje o serwerach MCP do generowania obrazów
- Dodano obszerną sekcję używania Claude w VSCode
- Dodano instrukcję konfiguracji i użycia klienta terminalowego Cline
- Zaktualizowano sekcję klientów MCP, uwzględniając wszystkie popularne opcje
- Wzbogacono przykłady wkładu o bardziej precyzyjne próbki kodu

### Tematy zaawansowane (05-AdvancedTopics/)
- Zorganizowano wszystkie specjalistyczne foldery tematyczne ze spójnym nazewnictwem
- Dodano materiały i przykłady inżynierii kontekstu
- Dodano dokumentację integracji agenta Foundry
- Wzmocniono dokumentację integracji bezpieczeństwa Entra ID

## 11 czerwca 2025

### Pierwsze wydanie
- Opublikowano pierwszą wersję programu nauczania MCP dla początkujących
- Utworzono podstawową strukturę dla wszystkich 10 głównych sekcji
- Wdrożono wizualną mapę programu nauczania do nawigacji
- Dodano początkowe przykładowe projekty w wielu językach programowania

### Rozpoczęcie pracy (03-GettingStarted/)
- Stworzono pierwsze przykłady implementacji serwera
- Dodano wskazówki dotyczące rozwoju klienta
- Uwzględniono instrukcje integracji klienta LLM
- Dodano dokumentację integracji VS Code
- Wdrożono przykłady serwera Server-Sent Events (SSE)

### Koncepcje podstawowe (01-CoreConcepts/)
- Dodano szczegółowe wyjaśnienie architektury klient-serwer
- Utworzono dokumentację kluczowych komponentów protokołu
- Udokumentowano wzorce komunikacji w MCP

## 23 maja 2025

### Struktura repozytorium
- Zainicjalizowano repozytorium z podstawową strukturą folderów
- Utworzono pliki README dla każdej głównej sekcji
- Skonfigurowano infrastrukturę tłumaczeń
- Dodano zasoby graficzne i diagramy

### Dokumentacja
- Utworzono początkowy README.md z przeglądem programu nauczania
- Dodano pliki CODE_OF_CONDUCT.md oraz SECURITY.md
- Skonfigurowano SUPPORT.md z wytycznymi dotyczącymi pomocy
- Stworzono wstępną strukturę przewodnika nauki

## 15 kwietnia 2025

### Planowanie i ramy
- Wstępne planowanie programu MCP dla początkujących
- Zdefiniowano cele nauki i grupę docelową
- Nakreślono strukturę programu z 10 sekcjami
- Opracowano ramy koncepcyjne dla przykładów i studiów przypadków
- Stworzono pierwsze prototypy przykładów kluczowych koncepcji

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:  
Niniejszy dokument został przetłumaczony przy użyciu automatycznej usługi tłumaczeniowej AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mimo że dokładamy wszelkich starań, aby tłumaczenie było poprawne, prosimy pamiętać, że tłumaczenia automatyczne mogą zawierać błędy lub nieścisłości. Oryginalny dokument w języku źródłowym należy uważać za wiarygodne źródło informacji. W przypadku informacji krytycznych zalecane jest profesjonalne tłumaczenie wykonane przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z korzystania z tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->