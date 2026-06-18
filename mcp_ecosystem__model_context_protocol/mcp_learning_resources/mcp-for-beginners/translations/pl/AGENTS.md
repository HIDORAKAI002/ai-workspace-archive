# AGENTS.md

## Przegląd projektu

**MCP for Beginners** to otwarty edukacyjny program nauczania do nauki Model Context Protocol (MCP) - standardowego frameworku do interakcji między modelami AI a aplikacjami klienckimi. To repozytorium zawiera kompleksowe materiały edukacyjne z praktycznymi przykładami kodu w wielu językach programowania.

### Kluczowe technologie

- **Języki programowania**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Frameworki i SDK**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Bazy danych**: PostgreSQL z rozszerzeniem pgvector
- **Platformy chmurowe**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Narzędzia budowania**: npm, Maven, pip, Cargo
- **Dokumentacja**: Markdown z automatycznym tłumaczeniem na wiele języków (48+ języków)

### Architektura

- **11 modułów podstawowych (00-11)**: Sekwencyjna ścieżka nauki od podstaw do zaawansowanych tematów
- **Laboratoria praktyczne**: Ćwiczenia praktyczne z kompletnym kodem rozwiązania w wielu językach
- **Projekty przykładowe**: Działające implementacje serwera i klienta MCP
- **System tłumaczeń**: Zautomatyzowany workflow GitHub Actions dla wsparcia wielojęzycznego
- **Zasoby graficzne**: Centralny katalog obrazów z wersjami przetłumaczonymi

## Komendy instalacyjne

To repozytorium skupia się na dokumentacji. Większość konfiguracji odbywa się w poszczególnych projektach przykładowych i laboratoriach.

### Konfiguracja repozytorium

```bash
# Sklonuj repozytorium
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Praca z projektami przykładowymi

Projekty przykładowe znajdują się w:
- `03-GettingStarted/samples/` - przykłady specyficzne dla języków
- `03-GettingStarted/01-first-server/solution/` - pierwsze implementacje serwerów
- `03-GettingStarted/02-client/solution/` - implementacje klientów
- `11-MCPServerHandsOnLabs/` - kompleksowe laboratoria integracji z bazą danych

Każdy projekt przykładowy zawiera własne instrukcje konfiguracji:

#### Projekty TypeScript/JavaScript
```bash
cd <project-directory>
npm install
npm start
```

#### Projekty Python
```bash
cd <project-directory>
pip install -r requirements.txt
# lub
pip install -e .
python main.py
```

#### Projekty Java
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Przebieg pracy developerskiej

### Struktura dokumentacji

- **Moduły 00-11**: Podstawowa zawartość programu nauczania w kolejności sekwencyjnej
- **translations/**: Wersje językowe (generowane automatycznie, nie edytować bezpośrednio)
- **translated_images/**: Lokalizowane wersje obrazów (generowane automatycznie)
- **images/**: Obrazy źródłowe i diagramy

### Wprowadzanie zmian w dokumentacji

1. Edytuj wyłącznie angielskie pliki markdown w katalogach głównych modułów (00-11)
2. W razie potrzeby aktualizuj obrazy w katalogu `images/`
3. GitHub Action co-op-translator automatycznie wygeneruje tłumaczenia
4. Tłumaczenia są ponownie tworzone po wypchnięciu do gałęzi main

### Praca z tłumaczeniami

- **Automatyczne tłumaczenie**: Workflow GitHub Actions zajmuje się wszystkimi tłumaczeniami
- **Nie edytuj ręcznie** plików w katalogu `translations/`
- Metadane tłumaczenia są osadzone w każdym pliku tłumaczonym
- Obsługiwane języki: 48+ języków, w tym arabski, chiński, francuski, niemiecki, hindi, japoński, koreański, portugalski, rosyjski, hiszpański i wiele innych

## Instrukcje testowe

### Walidacja dokumentacji

Ponieważ jest to repozytorium głównie dokumentacyjne, testy koncentrują się na:

1. **Walidacja linków**: Upewnij się, że wszystkie linki wewnętrzne działają
```bash
# Sprawdź uszkodzone linki markdown
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Walidacja przykładów kodu**: Sprawdź, czy przykłady kodu kompilują się/uruchamiają
```bash
# Przejdź do konkretnego przykładu i uruchom jego testy
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Linter Markdown**: Sprawdź spójność formatowania
```bash
# Użyj markdownlint w razie potrzeby
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Testowanie projektów przykładowych

Każdy projekt specyficzny dla języka ma własne podejście do testowania:

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## Zasady stylu kodu

### Styl dokumentacji

- Używaj jasnego, przyjaznego dla początkujących języka
- Zamieszczaj przykłady kodu w wielu językach tam, gdzie to stosowne
- Stosuj najlepsze praktyki markdown:
  - Używaj nagłówków w stylu ATX (`#`)
  - Używaj bloków kodu z oznaczeniem języka
  - Zamieszczaj opisowe teksty alternatywne dla obrazów
  - Dbaj o rozsądne długości linii (bez sztywnego limitu, ale sensownie)

### Styl przykładów kodu

#### TypeScript/JavaScript
- Używaj modułów ES (`import`/`export`)
- Stosuj reguły trybu ścisłego TypeScript
- Dodawaj adnotacje typów
- Docelowo ES2022

#### Python
- Stosuj wytyczne stylu PEP 8
- Używaj wskazówek typów tam, gdzie stosowne
- Dodawaj docstringi dla funkcji i klas
- Korzystaj z nowoczesnych funkcji Pythona (3.8+)

#### Java
- Stosuj konwencje Spring Boot
- Używaj funkcji Java 21
- Przestrzegaj standardowej struktury projektu Maven
- Dodawaj komentarze Javadoc

### Organizacja plików

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## Budowa i wdrożenie

### Wdrożenie dokumentacji

Repozytorium korzysta z GitHub Pages lub podobnego do hostingu dokumentacji (jeśli dotyczy). Zmiany na gałęzi main wyzwalają:

1. Workflow tłumaczeniowy (`.github/workflows/co-op-translator.yml`)
2. Automatyczne tłumaczenie wszystkich angielskich plików markdown
3. Lokalizację obrazów według potrzeb

### Brak wymaganego procesu budowania

To repozytorium zawiera głównie dokumentację w markdown. Nie jest potrzebny krok kompilacji ani budowania dla podstawowej zawartości kursu.

### Wdrożenie projektów przykładowych

Poszczególne projekty przykładowe mogą mieć instrukcje wdrożeniowe:
- Zobacz `03-GettingStarted/09-deployment/` dla wskazówek wdrożenia serwera MCP
- Przykłady wdrożenia Azure Container Apps w `11-MCPServerHandsOnLabs/`

## Zasady współpracy

### Proces Pull Request

1. **Fork i klonowanie**: Utwórz fork repozytorium i sklonuj go lokalnie
2. **Utwórz gałąź**: Używaj opisowych nazw gałęzi (np. `fix/typo-module-3`, `add/python-example`)
3. **Wprowadź zmiany**: Edytuj tylko angielskie pliki markdown (nie tłumaczenia)
4. **Testuj lokalnie**: Zweryfikuj poprawność renderowania markdown
5. **Złóż PR**: Używaj jasnych tytułów i opisów PR
6. **CLA**: Podpisz Microsoft Contributor License Agreement, gdy zostaniesz o to poproszony

### Format tytułu PR

Używaj jasnych, opisowych tytułów:
- `[Module XX] Krótki opis` dla zmian w modułach
- `[Samples] Opis` dla zmian w przykładach kodu
- `[Docs] Opis` dla ogólnych aktualizacji dokumentacji

### Co można wnosić

- Poprawki błędów w dokumentacji lub przykładach kodu
- Nowe przykłady kodu w dodatkowych językach
- Wyjaśnienia i ulepszenia istniejących treści
- Nowe studia przypadków lub praktyczne przykłady
- Zgłoszenia błędów dotyczących niejasnych lub błędnych treści

### Czego NIE robić

- Nie edytuj plików w katalogu `translations/` bezpośrednio
- Nie edytuj katalogu `translated_images/`
- Nie dodawaj dużych plików binarnych bez konsultacji
- Nie zmieniaj plików workflow tłumaczeniowego bez koordynacji

## Dodatkowe uwagi

### Utrzymanie repozytorium

- **Changelog**: Wszystkie znaczące zmiany są dokumentowane w `changelog.md`
- **Przewodnik nauki**: Użyj `study_guide.md` do przeglądu ścieżki nauki
- **Szablony zgłoszeń**: Używaj szablonów GitHub do raportowania błędów i propozycji funkcji
- **Kodeks postępowania**: Wszyscy współtwórcy muszą przestrzegać Microsoft Open Source Code of Conduct

### Ścieżka nauki

Przechodź moduły w kolejności sekwencyjnej (00-11) dla optymalnej nauki:
1. **00-02**: Podstawy (Wprowadzenie, koncepcje podstawowe, bezpieczeństwo)
2. **03**: Pierwsze kroki z praktyczną implementacją
3. **04-05**: Praktyczne wdrożenia i tematy zaawansowane
4. **06-10**: Społeczność, najlepsze praktyki i zastosowania w świecie rzeczywistym
5. **11**: Kompleksowe laboratoria integracji z bazą danych (13 kolejnych laboratoriów)

### Zasoby wsparcia

- **Dokumentacja**: https://modelcontextprotocol.io/
- **Specyfikacja**: https://spec.modelcontextprotocol.io/
- **Społeczność**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Server Discord Microsoft Foundry
- **Powiązane kursy**: Zobacz README.md dla innych ścieżek nauki Microsoft

### Typowe problemy i rozwiązania

**P: Mój PR nie przechodzi walidacji tłumaczeń**  
O: Upewnij się, że edytowałeś tylko angielskie pliki markdown w katalogach modułów głównych, a nie pliki tłumaczone.

**P: Jak dodać nowy język?**  
O: Obsługa języków jest zarządzana przez workflow co-op-translator. Otwórz zgłoszenie, aby omówić dodanie nowych języków.

**P: Przykłady kodu nie działają**  
O: Upewnij się, że postępowałeś zgodnie z instrukcjami konfiguracji w README konkretnego przykładu. Sprawdź, czy masz zainstalowane właściwe wersje zależności.

**P: Obrazy się nie wyświetlają**  
O: Sprawdź, czy ścieżki do obrazów są względne i używają ukośników. Obrazy powinny znajdować się w katalogu `images/` lub `translated_images/` dla wersji lokalizowanych.

### Wydajność

- Workflow tłumaczeniowy może zająć kilka minut
- Duże obrazy powinny być zoptymalizowane przed zatwierdzeniem
- Trzymaj pojedyncze pliki markdown skoncentrowane i rozsądnie rozmiarowe
- Używaj linków względnych dla lepszej przenośności

### Zarządzanie projektem

Projekt stosuje praktyki open source Microsoft:
- Licencja MIT dla kodu i dokumentacji
- Microsoft Open Source Code of Conduct
- Wymagane CLA dla wkładów
- Problemy bezpieczeństwa: Zgodnie z wytycznymi SECURITY.md
- Wsparcie: Zobacz SUPPORT.md dla pomocy

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->