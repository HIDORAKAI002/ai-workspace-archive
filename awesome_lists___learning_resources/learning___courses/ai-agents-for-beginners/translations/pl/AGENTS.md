# AGENTS.md

## Przegląd Projektu

To repozytorium zawiera "AI Agents for Beginners" - kompleksowy kurs edukacyjny uczący wszystkiego, co potrzebne do budowy Agentów AI. Kurs składa się z 18 lekcji (ponumerowanych 00-18) obejmujących podstawy, wzorce projektowe, frameworki, wdrażanie produkcyjne, agentów lokalnych/urządzeniowych oraz bezpieczeństwo agentów AI.

**Kluczowe Technologie:**
- Python 3.12+
- Jupyter Notebooks do nauki interaktywnej
- Frameworki AI: Microsoft Agent Framework (MAF)
- Usługi AI Azure: Microsoft Foundry, Microsoft Foundry Agent Service V2

**Architektura:**
- Struktura oparta na lekcjach (foldery 00-15+)
- Każda lekcja zawiera: dokumentację README, przykłady kodu (notatniki Jupyter) i obrazy
- Wsparcie wielojęzyczne przez automatyczny system tłumaczeń
- Jeden notatnik Python na lekcję używający Microsoft Agent Framework

## Komendy Konfiguracji

### Wymagania wstępne
- Python 3.12 lub wyższy
- Subskrypcja Azure (dla Microsoft Foundry)
- Zainstalowane i uwierzytelnione Azure CLI (`az login`)

### Wstępna konfiguracja

1. **Sklonuj lub rozgałęź (fork) repozytorium:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # LUB
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Utwórz i aktywuj wirtualne środowisko Python:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # W systemie Windows: venv\Scripts\activate
   ```

3. **Zainstaluj zależności:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Skonfiguruj zmienne środowiskowe:**
   ```bash
   cp .env.example .env
   # Edytuj plik .env, dodając swoje klucze API i punkty końcowe
   ```

### Wymagane zmienne środowiskowe

Dla **Microsoft Foundry** (Wymagane):
- `AZURE_AI_PROJECT_ENDPOINT` - punkt końcowy projektu Microsoft Foundry
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - nazwa wdrożenia modelu (np. gpt-4.1-mini)

Dla **Azure AI Search** (Lekcja 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - punkt końcowy Azure AI Search
- `AZURE_SEARCH_API_KEY` - klucz API Azure AI Search

Uwierzytelnianie: Uruchom `az login` przed uruchomieniem notatników (używa `AzureCliCredential`).

## Workflow Rozwoju

### Uruchamianie notatników Jupyter

Każda lekcja zawiera kilka notatników Jupyter dla różnych frameworków:

1. **Uruchom Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **Przejdź do folderu lekcji** (np. `01-intro-to-ai-agents/code_samples/`)

3. **Otwórz i uruchom notatniki:**
   - `*-python-agent-framework.ipynb` - użycie Microsoft Agent Framework (Python)
   - `*-dotnet-agent-framework.ipynb` - użycie Microsoft Agent Framework (.NET)

### Praca z Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry:**
- Wymaga subskrypcji Azure
- Używa `FoundryChatClient` dla Agent Service V2 (agenci widoczni w portalu Foundry)
- Gotowe do produkcji z wbudowaną obserwowalnością
- Wzorzec pliku: `*-python-agent-framework.ipynb`

## Instrukcje Testowania

To repozytorium edukacyjne z przykładami kodu, a nie produkcyjny kod z automatami testowymi. Aby zweryfikować konfigurację i zmiany:

### Testowanie ręczne

1. **Przetestuj środowisko Python:**
   ```bash
   python --version  # Powinno być 3.12+
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **Przetestuj wykonanie notatnika:**
   ```bash
   # Konwertuj notatnik na skrypt i uruchom (testuje importy)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **Zweryfikuj zmienne środowiskowe:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### Uruchamianie pojedynczych notatników

Otwórz notatniki w Jupyter i wykonuj komórki kolejno. Każdy notatnik jest samodzielny i zawiera:
- Instrukcje importu
- Ładowanie konfiguracji
- Przykładowe implementacje agentów
- Oczekiwane rezultaty w komórkach markdown

### Test dymny wdrożonych agentów

Dla lekcji, gdzie agent jest wdrożony jako hostowany agent Microsoft Foundry (01, 04, 05, 16), repo zawiera katalogi testów dymnych w `tests/` uruchamiane przez workflow `.github/workflows/smoke-test.yml` za pomocą akcji [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test). Są to lekkie testy po wdrożeniu (czy agent jest dostępny i spełnia podstawowe oczekiwania co do promptu?), uzupełniające pipeline oceniający w Lekcjach 10 i 16. Zobacz [tests/README.md](./tests/README.md) dla mapowania katalog-lekcja-agent. Lekcja 17 działa lokalnie z Foundry Local i nie ma hostowanego punktu końcowego, więc jest weryfikowana przez bezpośrednie uruchomienie jej notatnika.

## Styl Kodu

### Konwencje Pythona

- **Wersja Pythona**: 3.12+
- **Styl kodu**: Zgodny ze standardem PEP 8
- **Notatniki**: Używać jasnych komórek markdown do wyjaśniania pojęć
- **Importy**: Grupować wg biblioteki standardowej, zewnętrznych i lokalnych

### Konwencje notatników Jupyter

- Zawierać opisowe komórki markdown przed komórkami kodu
- Dodawać przykłady wyników w notatnikach do odniesienia
- Używać jasnych nazw zmiennych odpowiadających pojęciom lekcji
- Zachować liniową kolejność wykonywania notatnika (komórka 1 → 2 → 3...)

### Organizacja plików

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## Budowa i Wdrażanie

### Budowa dokumentacji

To repozytorium używa Markdown do dokumentacji:
- Pliki README.md w folderach lekcji
- Główny README.md w katalogu głównym repozytorium
- Automatyczny system tłumaczeń za pomocą GitHub Actions

### Pipeline CI/CD

Znajduje się w `.github/workflows/`:

1. **co-op-translator.yml** - Automatyczne tłumaczenie na 50+ języków
2. **welcome-issue.yml** - Powitanie nowych autorów zgłoszeń
3. **welcome-pr.yml** - Powitanie nowych autorów pull requestów

### Wdrażanie

To repozytorium edukacyjne - bez procesu wdrażania. Użytkownicy:
1. Forkują lub klonują repozytorium
2. Uruchamiają notatniki lokalnie lub w GitHub Codespaces
3. Uczą się przez modyfikację i eksperymenty z przykładami

## Zasady Pull Requestów

### Przed złożeniem

1. **Przetestuj swoje zmiany:**
   - Uruchom kompletnie zmienione notatniki
   - Zweryfikuj, czy wszystkie komórki wykonują się bez błędów
   - Sprawdź, czy wyniki są odpowiednie

2. **Aktualizacje dokumentacji:**
   - Zaktualizuj README.md, jeśli dodajesz nowe koncepcje
   - Dodaj komentarze w notatnikach do złożonego kodu
   - Upewnij się, że komórki markdown wyjaśniają cel

3. **Zmiany w plikach:**
   - Unikaj commitowania plików `.env` (używaj `.env.example`)
   - Nie commituj folderów `venv/` lub `__pycache__/`
   - Zachowuj wyniki w notatnikach, jeśli demonstrują koncepcje
   - Usuń tymczasowe pliki i kopie zapasowe notatników (`*-backup.ipynb`)

### Format tytułu PR

Używaj opisowych tytułów:
- `[Lesson-XX] Dodaj nowy przykład dla <pojęcia>`
- `[Fix] Popraw literówkę w README lekcji XX`
- `[Update] Ulepsz przykład kodu w lekcji XX`
- `[Docs] Aktualizuj instrukcje konfiguracji`

### Wymagane testy

- Notatniki powinny się wykonywać bez błędów
- Pliki README powinny być jasne i poprawne
- Zachowuj istniejące wzorce w repozytorium
- Utrzymuj spójność z innymi lekcjami

## Dodatkowe Notatki

### Typowe pułapki

1. **Niezgodność wersji Pythona:**
   - Upewnij się, że używasz Pythona 3.12+
   - Niektóre pakiety mogą nie działać na starszych wersjach
   - Używaj `python3 -m venv` aby wyraźnie określić wersję Pythona

2. **Zmienne środowiskowe:**
   - Zawsze twórz `.env` z `.env.example`
   - Nie commituj pliku `.env` (jest w `.gitignore`)
   - Loguj się przez `az login` dla uwierzytelniania bezkluczowego Entra ID

3. **Konflikty pakietów:**
   - Użyj czystego wirtualnego środowiska
   - Instaluj z `requirements.txt` zamiast pojedynczych pakietów
   - Niektóre notatniki mogą wymagać dodatkowych pakietów wymienionych w komórkach markdown

4. **Usługi Azure:**
   - Usługi AI Azure wymagają aktywnej subskrypcji
   - Niektóre funkcje są specyficzne dla regionu
   - Upewnij się, że twoje wdrożenie modelu Azure OpenAI obsługuje Responses API

### Ścieżka nauki

Rekomendowana kolejność przechodzenia przez lekcje:
1. **00-course-setup** - Zacznij tutaj konfigurację środowiska
2. **01-intro-to-ai-agents** - Poznaj podstawy agentów AI
3. **02-explore-agentic-frameworks** - Poznaj różne frameworki
4. **03-agentic-design-patterns** - Podstawowe wzorce projektowe
5. Kontynuuj lekcje w kolejności numeracyjnej

### Wybór Frameworka

Wybierz framework zgodnie z celami:
- **Wszystkie lekcje**: Microsoft Agent Framework (MAF) z `FoundryChatClient`
- **Agenci rejestrują się po stronie serwera** w Microsoft Foundry Agent Service V2 i są widoczni w portalu Foundry

### Uzyskanie pomocy

- Dołącz do [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- Przejrzyj pliki README lekcji dla konkretnych wskazówek
- Sprawdź główny [README.md](./README.md) dla przeglądu kursu
- Zapoznaj się z [Course Setup](./00-course-setup/README.md) dla szczegółowych instrukcji konfiguracji

### Wkład (Contributing)

To otwarty projekt edukacyjny. Zachęcamy do wkładu:
- Ulepszanie przykładów kodu
- Poprawianie literówek lub błędów
- Dodawanie wyjaśniających komentarzy
- Propozycje nowych tematów lekcji
- Tłumaczenia na dodatkowe języki

Zobacz [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) dla bieżących potrzeb.

## Kontekst Specyficzny dla Projektu

### Wsparcie wielojęzyczne

To repozytorium używa automatycznego systemu tłumaczeń:
- Obsługuje 50+ języków
- Tłumaczenia w katalogach `/translations/<lang-code>/`
- Workflow GitHub Actions zajmuje się aktualizacjami tłumaczeń
- Pliki źródłowe w języku angielskim w katalogu głównym repozytorium

### Struktura Lekcji

Każda lekcja ma spójny wzór:
1. Miniatura wideo z linkiem
2. Tekst lekcji (README.md)
3. Przykłady kodu w wielu frameworkach
4. Cele nauki i wymagania wstępne
5. Linki do dodatkowych zasobów nauki

### Nazewnictwo przykładów kodu

Format: `<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - Lekcja 1, Python MAF
- `14-sequential.ipynb` - Lekcja 14, zaawansowane wzorce MAF
- `16-python-agent-framework.ipynb` - Lekcja 16, agent wsparcia klienta produkcyjnego
- `17-local-agent-foundry-local.ipynb` - Lekcja 17, agent lokalny z Foundry Local + Qwen

### Specjalne katalogi

- `translated_images/` - Lokalizowane obrazy dla tłumaczeń
- `images/` - Oryginalne obrazy dla treści angielskich
- `.devcontainer/` - Konfiguracja kontenera deweloperskiego VS Code
- `.github/` - Workflow i szablony GitHub Actions

### Zależności

Kluczowe pakiety z `requirements.txt`:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - wsparcie protokołu Agent-to-Agent
- `azure-ai-inference`, `azure-ai-projects` - usługi AI Azure
- `azure-identity` - uwierzytelnianie Azure (AzureCliCredential)
- `azure-search-documents` - integracja Azure AI Search
- `mcp[cli]` - wsparcie Model Context Protocol

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->