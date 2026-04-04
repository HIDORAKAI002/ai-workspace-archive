# 🚀 Serwer MCP z PostgreSQL - Kompletny Przewodnik Nauki

## 🧠 Przegląd Ścieżki Nauki Integracji Bazy Danych MCP

Ten kompleksowy przewodnik uczy, jak zbudować produkcyjnie gotowe **serwery Model Context Protocol (MCP)** integrujące się z bazami danych poprzez praktyczną realizację analizy detalicznej. Poznasz wzorce klasy korporacyjnej, w tym **Row Level Security (RLS)**, **wyszukiwanie semantyczne**, **integrację z Azure AI** oraz **dostęp wielonarodowy do danych**.

Niezależnie od tego, czy jesteś programistą backendu, inżynierem AI, czy architektem danych, przewodnik oferuje uporządkowaną naukę z przykładami z życia wziętymi i ćwiczeniami praktycznymi, prowadząc Cię przez serwer MCP https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## 🔗 Oficjalne Zasoby MCP

- 📘 [Dokumentacja MCP](https://modelcontextprotocol.io/) – Szczegółowe samouczki i przewodniki użytkownika
- 📜 [Specyfikacja MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Architektura protokołu i odniesienia techniczne
- 🧑‍💻 [Repozytorium MCP na GitHub](https://github.com/modelcontextprotocol) – SDK open-source, narzędzia i przykłady kodu
- 🌐 [Społeczność MCP](https://github.com/orgs/modelcontextprotocol/discussions) – Dołącz do dyskusji i wspieraj społeczność
- 🔒 [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Najlepsze praktyki bezpieczeństwa i ograniczanie ryzyka


## 🧭 Ścieżka Nauki Integracji Bazy Danych MCP

### 📚 Kompletny Plan Nauki dla https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Laboratorium | Temat | Opis | Link |
|--------|-------|-------------|------|
| **Lab 1-3: Podstawy** | | | |
| 00 | [Wprowadzenie do Integracji Bazy Danych MCP](./00-Introduction/README.md) | Przegląd MCP z integracją bazy danych i przypadkiem użycia analizy detalicznej | [Zacznij Tutaj](./00-Introduction/README.md) |
| 01 | [Podstawowe Koncepcje Architektury](./01-Architecture/README.md) | Zrozumienie architektury serwera MCP, warstw baz danych i wzorców bezpieczeństwa | [Ucz się](./01-Architecture/README.md) |
| 02 | [Bezpieczeństwo i Wielonarodowość](./02-Security/README.md) | Row Level Security, uwierzytelnianie i wielonarodowy dostęp do danych | [Ucz się](./02-Security/README.md) |
| 03 | [Konfiguracja Środowiska](./03-Setup/README.md) | Ustawienie środowiska rozwojowego, Docker, zasoby Azure | [Konfiguruj](./03-Setup/README.md) |
| **Lab 4-6: Budowa Serwera MCP** | | | |
| 04 | [Projektowanie Bazy Danych i Schemat](./04-Database/README.md) | Konfiguracja PostgreSQL, projekt schematu detalicznego i przykładowe dane | [Buduj](./04-Database/README.md) |
| 05 | [Implementacja Serwera MCP](./05-MCP-Server/README.md) | Budowa serwera FastMCP z integracją bazy danych | [Buduj](./05-MCP-Server/README.md) |
| 06 | [Rozwój Narzędzi](./06-Tools/README.md) | Tworzenie narzędzi zapytań do bazy i introspekcji schematu | [Buduj](./06-Tools/README.md) |
| **Lab 7-9: Zaawansowane Funkcje** | | | |
| 07 | [Integracja Wyszukiwania Semantycznego](./07-Semantic-Search/README.md) | Implementacja osadzeń wektorowych z Azure OpenAI i pgvector | [Zaawansowane](./07-Semantic-Search/README.md) |
| 08 | [Testowanie i Debugowanie](./08-Testing/README.md) | Strategie testowania, narzędzia do debugowania i metody walidacji | [Testuj](./08-Testing/README.md) |
| 09 | [Integracja z VS Code](./09-VS-Code/README.md) | Konfiguracja integracji MCP w VS Code i użycie czatu AI | [Integruj](./09-VS-Code/README.md) |
| **Lab 10-12: Produkcja i Najlepsze Praktyki** | | | |
| 10 | [Strategie Wdrożenia](./10-Deployment/README.md) | Wdrożenie Docker, Azure Container Apps oraz rozważania skalowania | [Wdrożenie](./10-Deployment/README.md) |
| 11 | [Monitorowanie i Obserwowalność](./11-Monitoring/README.md) | Application Insights, logowanie, monitorowanie wydajności | [Monitoruj](./11-Monitoring/README.md) |
| 12 | [Najlepsze Praktyki i Optymalizacja](./12-Best-Practices/README.md) | Optymalizacja wydajności, wzmacnianie bezpieczeństwa i wskazówki produkcyjne | [Optymalizuj](./12-Best-Practices/README.md) |

### 💻 Co Zbudujesz

Na koniec ścieżki nauki zbudujesz kompletny **Serwer MCP Zava Retail Analytics** z funkcjami:

- **Wielotabelowa baza danych detalicznej** z zamówieniami klientów, produktami i inwentarzem
- **Row Level Security** dla izolacji danych na poziomie sklepu
- **Semantyczne wyszukiwanie produktów** z użyciem osadzeń Azure OpenAI
- **Integracja czatu AI w VS Code** do zapytań w języku naturalnym
- **Gotowe do produkcji wdrożenie** z Docker i Azure
- **Kompleksowe monitorowanie** z Application Insights

## 🎯 Wymagania Wstępne do Nauki

Aby maksymalnie wykorzystać tę ścieżkę nauki, powinieneś posiadać:

- **Doświadczenie programistyczne**: Znajomość Pythona (preferowana) lub podobnych języków
- **Wiedza o bazach danych**: Podstawy SQL i baz relacyjnych
- **Koncepcje API**: Zrozumienie REST API i HTTP
- **Narzędzia deweloperskie**: Doświadczenie z terminalem, Gitem i edytorami kodu
- **Podstawy chmury**: (Opcjonalne) Podstawowa znajomość Azure lub podobnych platform chmurowych
- **Znajomość Dockera**: (Opcjonalne) Zrozumienie pojęć konteneryzacji

### Wymagane Narzędzia

- **Docker Desktop** - Do uruchamiania PostgreSQL i serwera MCP
- **Azure CLI** - Do wdrażania zasobów w chmurze
- **VS Code** - Do rozwoju i integracji MCP
- **Git** - Do kontroli wersji
- **Python 3.8+** - Do rozwoju serwera MCP

## 📚 Przewodnik i Materiały do Nauki

Ta ścieżka nauki zawiera obszerne zasoby, które pomogą Ci efektywnie się poruszać:

### Przewodnik Nauki

Każde laboratorium zawiera:
- **Jasne cele nauki** - Co osiągniesz
- **Instrukcje krok po kroku** - Szczegółowe przewodniki implementacji
- **Przykłady kodu** - Działające próbki z wyjaśnieniami
- **Ćwiczenia** - Możliwości praktycznego zastosowania
- **Poradniki rozwiązywania problemów** - Typowe problemy i rozwiązania
- **Dodatkowe zasoby** - Materiały do dalszej nauki i eksploracji

### Sprawdzenie Wymagań Wstępnych

Przed rozpoczęciem każdego laboratorium znajdziesz:
- **Wymaganą wiedzę** - Co powinieneś znać wcześniej
- **Walidację konfiguracji** - Jak sprawdzić środowisko
- **Szacowany czas** - Przewidywany czas ukończenia
- **Efekty nauki** - Co będziesz potrafił po zakończeniu

### Rekomendowane Ścieżki Nauki

Wybierz ścieżkę w zależności od poziomu doświadczenia:

#### 🟢 **Ścieżka dla Początkujących** (Nowi w MCP)
1. Upewnij się, że ukończyłeś 0-10 z [MCP dla Początkujących](https://aka.ms/mcp-for-beginners)
2. Wykonaj laboratoria 00-03, aby utrwalić podstawy
3. Postępuj z laboratoriami 04-06, by praktycznie budować
4. Wypróbuj laboratoria 07-09, by używać praktycznie

#### 🟡 **Ścieżka Średniozaawansowana** (Częściowe Doświadczenie w MCP)
1. Przejrzyj laboratoria 00-01, aby poznać koncepcje bazodanowe
2. Skup się na laboratoriach 02-06, aby wdrożyć
3. Zagłęb się w laboratoria 07-12 dla zaawansowanych funkcji

#### 🔴 **Ścieżka Zaawansowana** (Doświadczeni w MCP)
1. Przejrzyj laboratoria 00-03, by poznać kontekst
2. Skup się na laboratoriach 04-09 dla integracji z bazą danych
3. Skoncentruj się na laboratoriach 10-12 dla wdrożeń produkcyjnych

## 🛠️ Jak Efektywnie Korzystać z Tej Ścieżki Nauczania

### Nauka Sekwencyjna (zalecane)

Pracuj nad laboratoriami w kolejności, by uzyskać pełne zrozumienie:

1. **Przeczytaj przegląd** - Zrozum, czego się nauczysz
2. **Sprawdź wymagania wstępne** - Upewnij się, że masz wymaganą wiedzę
3. **Postępuj za przewodnikiem krok po kroku** - Implementuj w trakcie nauki
4. **Wykonaj ćwiczenia** - Utrwal wiedzę
5. **Przejrzyj kluczowe wnioski** - Utrwal efekty nauki

### Nauka Skierowana

Jeśli potrzebujesz konkretnych umiejętności:

- **Integracja z Bazą Danych**: Skup się na laboratoriach 04-06
- **Wdrażanie Bezpieczeństwa**: Skoncentruj się na 02, 08, 12
- **AI / Wyszukiwanie Semantyczne**: Zgłęb laboratorium 07
- **Wdrożenie Produkcyjne**: Studiuj laboratoria 10-12

### Praktyka

Każde laboratorium zawiera:
- **Działający kod** - Kopiuj, modyfikuj i eksperymentuj
- **Scenariusze z życia** - Praktyczne przypadki analizy detalicznej
- **Stopniowa złożoność** - Buduj od prostego do zaawansowanego
- **Kroki walidacyjne** - Sprawdź, czy implementacja działa

## 🌟 Społeczność i Wsparcie

### Uzyskaj Pomoc

- **Azure AI Discord**: [Dołącz, by uzyskać wsparcie ekspertów](https://discord.com/invite/ByRwuEEgH4)
- **Repozytorium GitHub i Przykład Implementacji**: [Przykład wdrożenia i zasoby](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)
- **Społeczność MCP**: [Dołącz do szerszych dyskusji MCP](https://github.com/orgs/modelcontextprotocol/discussions)

## 🚀 Gotowy, by zacząć?

Rozpocznij swoją podróż z **[Laboratorium 00: Wprowadzenie do Integracji Bazy Danych MCP](./00-Introduction/README.md)**

---

*Opanuj budowanie produkcyjnie gotowych serwerów MCP z integracją bazy danych dzięki temu wszechstronnemu, praktycznemu doświadczeniu edukacyjnemu.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:  
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczeń AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mimo że dokładamy starań, aby tłumaczenie było jak najbardziej precyzyjne, należy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w języku źródłowym powinien być uznawany za dokument wiarygodny. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z korzystania z tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->