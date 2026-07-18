# Konfiguracja kursu

## Wprowadzenie

Ta lekcja wyjaśni, jak uruchamiać przykładowe kody z tego kursu.

## Dołącz do innych uczestników i uzyskaj pomoc

Zanim rozpoczniesz klonowanie repozytorium, dołącz do [kanału Discord AI Agents For Beginners](https://aka.ms/ai-agents/discord), aby uzyskać pomoc w konfiguracji, zadać pytania dotyczące kursu lub nawiązać kontakt z innymi uczestnikami.

## Sklonuj lub rozgałęź (fork) to repozytorium

Aby rozpocząć, proszę sklonuj lub rozgałęź (fork) repozytorium GitHub. Dzięki temu zyskasz własną wersję materiałów kursu, co pozwoli Ci uruchamiać, testować i modyfikować kod!

Możesz to zrobić, klikając link <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">fork repozytorium</a>

Teraz powinieneś mieć własną rozgałęzioną wersję tego kursu pod poniższym linkiem:

![Forked Repo](../../../translated_images/pl/forked-repo.33f27ca1901baa6a.webp)

### Płytkie klonowanie (zalecane na warsztaty / Codespaces)

  > Pełne repozytorium może być duże (~3 GB), jeśli pobierzesz całą historię i wszystkie pliki. Jeśli bierzesz udział tylko w warsztatach lub potrzebujesz tylko kilku folderów z lekcjami, płytkie klonowanie (lub ubogie klonowanie) pozwoli uniknąć większości pobierania, przycinając historię i/lub pomijając blob'y.

#### Szybkie płytkie klonowanie — minimalna historia, wszystkie pliki

Zastąp `<your-username>` w poniższych poleceniach swoim URL-iem forka (lub URL-em upstream, jeśli wolisz).

Aby sklonować tylko najnowszą historię commitów (małe pobieranie):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Aby sklonować konkretną gałąź:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Częściowe (ubogie) klonowanie — minimalne blob'y + tylko wybrane foldery

Używa to częściowego klonowania i sparse-checkout (wymaga Git 2.25+ i zaleca się nowoczesny Git z obsługą partial clone):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Przejdź do folderu repozytorium:

```bash|powershell
cd ai-agents-for-beginners
```

Następnie określ, które foldery chcesz (przykład poniżej pokazuje dwa foldery):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Po sklonowaniu i zweryfikowaniu plików, jeśli chcesz tylko pliki i chcesz zwolnić miejsce (bez historii git), usuń metadane repozytorium (💀nieodwracalne — stracisz całą funkcjonalność Git: brak commitów, pullów, pushów i dostępu do historii).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Używanie GitHub Codespaces (zalecane, by unikać dużych lokalnych pobrań)

- Utwórz nowy Codespace dla tego repozytorium za pomocą [GitHub UI](https://github.com/codespaces).  

- W terminalu nowo utworzonego codespace'u uruchom jedno z powyższych poleceń płytkiego/sparse klonowania, by wprowadzić tylko potrzebne foldery z lekcjami do workspace'u Codespace.
- Opcjonalnie: po sklonowaniu w Codespaces usuń .git, by odzyskać dodatkową przestrzeń (patrz polecenia usuwania powyżej).
- Uwaga: Jeśli wolisz otworzyć repozytorium bezpośrednio w Codespaces (bez dodatkowego klonowania), pamiętaj, że Codespaces zbuduje środowisko devcontainer i może dostarczyć więcej zasobów, niż potrzebujesz. Klonowanie płytkiej kopii w świeżym Codespace da Ci więcej kontroli nad zużyciem dysku.

#### Wskazówki

- Zawsze zamień URL klonowania na swój fork, jeśli chcesz edytować/commitować.
- Jeśli później potrzebujesz więcej historii lub plików, możesz je pobrać lub dostosować sparse-checkout, by dodać kolejne foldery.

## Uruchamianie kodu

Ten kurs oferuje serię notatników Jupyter, które możesz uruchomić, aby zdobyć praktyczne doświadczenie w budowie agentów AI.

Przykłady kodu używają **Microsoft Agent Framework (MAF)** z `FoundryChatClient`, który łączy się z **Microsoft Foundry Agent Service V2** (Responses API) przez **Microsoft Foundry**.

Wszystkie notatniki Python są oznaczone `*-python-agent-framework.ipynb`.

## Wymagania

- Python 3.12+
  - **UWAGA**: Jeśli nie masz zainstalowanego Pythona 3.12, upewnij się, że go zainstalujesz. Utwórz swoje środowisko wirtualne używając python3.12, by mieć pewność, że zainstalujesz właściwe wersje z requirements.txt.
  
    >Przykład

    Utwórz katalog środowiska wirtualnego Python:

    ```bash|powershell
    python -m venv venv
    ```

    Następnie aktywuj środowisko venv dla:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: Aby uruchomić przykładowe kody wykorzystujące .NET, upewnij się, że masz zainstalowany [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) lub nowszy. Następnie sprawdź wersję zainstalowanego SDK:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Wymagane do uwierzytelniania. Zainstaluj ze strony [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Subskrypcja Azure** — Do dostępu do Microsoft Foundry i Microsoft Foundry Agent Service.
- **Projekt Microsoft Foundry** — Projekt z wdrożonym modelem (np. `gpt-4.1-mini`). Zobacz [Krok 1](#krok-1-utwórz-projekt-microsoft-foundry) poniżej.

W katalogu głównym repozytorium znajduje się plik `requirements.txt`, który zawiera wszystkie wymagane pakiety Python do uruchomienia przykładowych kodów.

Możesz je zainstalować, uruchamiając w terminalu na głównym poziomie repozytorium następujące polecenie:

```bash|powershell
pip install -r requirements.txt
```

Zalecamy utworzenie wirtualnego środowiska Python, aby uniknąć konfliktów i problemów.

## Konfiguracja VSCode

Upewnij się, że w VSCode używasz właściwej wersji Pythona.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Konfiguracja Microsoft Foundry i Microsoft Foundry Agent Service

### Krok 1: Utwórz projekt Microsoft Foundry

Aby uruchomić notatniki, potrzebujesz **huba** i **projektu Microsoft Foundry** z wdrożonym modelem.

1. Przejdź do [ai.azure.com](https://ai.azure.com) i zaloguj się na swoje konto Azure.
2. Utwórz **hub** (lub użyj istniejącego). Zobacz: [Podsumowanie zasobów hub](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. W hubie utwórz **projekt**.
4. Wdroż model (np. `gpt-4.1-mini`) przez **Models + Endpoints** → **Deploy model**.

### Krok 2: Pobierz punkt końcowy projektu i nazwę wdrożenia modelu

W portalu Microsoft Foundry, w Twoim projekcie:

- **Projekt Endpoint** — Wejdź na stronę **Overview** i skopiuj URL endpointu.

![Project Connection String](../../../translated_images/pl/project-endpoint.8cf04c9975bbfbf1.webp)

- **Nazwa wdrożenia modelu** — Przejdź do **Models + Endpoints**, wybierz wdrożony model i zanotuj **Deployment name** (np. `gpt-4.1-mini`).

### Krok 3: Zaloguj się do Azure za pomocą `az login`

Wszystkie notatniki używają **`AzureCliCredential`** do uwierzytelniania — nie ma potrzeby zarządzania kluczami API. Wymaga to zalogowania przez Azure CLI.

1. **Zainstaluj Azure CLI**, jeśli jeszcze tego nie zrobiłeś: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Zaloguj się**, uruchamiając:

    ```bash|powershell
    az login
    ```

    Lub jeśli jesteś w środowisku zdalnym/Codespace bez przeglądarki:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Wybierz subskrypcję**, jeśli pojawi się monit — wybierz tę zawierającą Twój projekt Foundry.

4. **Zweryfikuj**, czy jesteś zalogowany:

    ```bash|powershell
    az account show
    ```

> **Dlaczego `az login`?** Notatniki uwierzytelniają się korzystając z `AzureCliCredential` z pakietu `azure-identity`. Oznacza to, że sesja Azure CLI dostarcza poświadczenia — nie ma kluczy API lub sekretów w pliku `.env`. To [dobra praktyka bezpieczeństwa](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Krok 4: Utwórz swój plik `.env`

Skopiuj plik przykładowy:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Otwórz `.env` i wypełnij wartości dla tych dwóch zmiennych:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| Zmienna | Gdzie ją znaleźć |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Portal Foundry → Twój projekt → strona **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Portal Foundry → **Models + Endpoints** → nazwa Twojego wdrożonego modelu |

To wszystko dla większości lekcji! Notatniki będą automatycznie się uwierzytelniać przez Twoją sesję `az login`.

### Krok 5: Zainstaluj zależności Pythona

```bash|powershell
pip install -r requirements.txt
```

Zalecamy uruchomienie tego wewnątrz wcześniej utworzonego środowiska wirtualnego.

## Dodatkowa konfiguracja dla Lekcji 5 (Agentic RAG)

Lekcja 5 używa **Azure AI Search** do generowania wspieranego wyszukiwaniem. Jeśli zamierzasz ją uruchomić, dodaj do swojego pliku `.env` poniższe zmienne:

| Zmienna | Gdzie ją znaleźć |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Portal Azure → Twój zasób **Azure AI Search** → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Portal Azure → Twój zasób **Azure AI Search** → **Settings** → **Keys** → klucz administratora podstawowy |

## Dodatkowa konfiguracja lekcji wywołujących Azure OpenAI bezpośrednio (Lekcje 6 i 8)

Niektóre notatniki w lekcjach 6 i 8 wywołują **Azure OpenAI** bezpośrednio (przez **Responses API**) zamiast korzystać z projektu Microsoft Foundry. Te przykłady wcześniej używały modeli GitHub, które są przestarzałe (wycofywane od lipca 2026) i nie obsługują Responses API. Jeśli planujesz uruchomić te próbki, dodaj do swojego pliku `.env` poniższe zmienne:

| Zmienna | Gdzie ją znaleźć |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Portal Azure → Twój zasób **Azure OpenAI** → **Keys and Endpoint** → Endpoint (np. `https://<twoj-zasob>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | Nazwa Twojego wdrożonego modelu (np. `gpt-4.1-mini`) obsługującego Responses API |
| `AZURE_OPENAI_API_KEY` | Opcjonalne — tylko jeśli używasz uwierzytelniania opartego na kluczu zamiast `az login` / Entra ID |

> Responses API używa stabilnego endpointu `/openai/v1/`, więc `api-version` nie jest wymagany. Zaloguj się przez `az login`, jeśli chcesz korzystać z bezkluczowego uwierzytelniania Entra ID.

## Alternatywny dostawca: MiniMax (kompatybilny z OpenAI)

[MiniMax](https://platform.minimaxi.com/) oferuje modele z dużym kontekstem (do 204K tokenów) przez API kompatybilne z OpenAI. Ponieważ `OpenAIChatClient` Microsoft Agent Framework działa z dowolnym endpointem kompatybilnym z OpenAI, możesz użyć MiniMax jako zamiennika dla Azure OpenAI lub OpenAI.

Dodaj do swojego pliku `.env` te zmienne:

| Zmienna | Gdzie ją znaleźć |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → Klucze API |
| `MINIMAX_BASE_URL` | Użyj `https://api.minimax.io/v1` (wartość domyślna) |
| `MINIMAX_MODEL_ID` | Nazwa modelu do użycia (np. `MiniMax-M3`) |

**Przykładowe modele**: `MiniMax-M3` (zalecany), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (szybsze odpowiedzi). Nazwy i dostępność modeli mogą się zmieniać w czasie, a dostęp do konkretnego modelu może zależeć od konta lub regionu — sprawdź aktualną listę na [MiniMax Platform](https://platform.minimaxi.com/). Jeśli `MiniMax-M3` nie jest dostępny dla Twojego konta, ustaw `MINIMAX_MODEL_ID` na model, do którego masz dostęp (np. `MiniMax-M2.7`).

Próbki kodu używające `OpenAIChatClient` (np. proces rezerwacji hotelu w Lekcji 14) automatycznie wykryją i użyją konfiguracji MiniMax, gdy `MINIMAX_API_KEY` jest ustawiony.

## Alternatywny dostawca: Foundry Local (uruchamianie modeli lokalnie)

[Foundry Local](https://foundrylocal.ai) to lekki runtime, który pobiera, zarządza i udostępnia modele językowe **w całości na Twoim własnym komputerze** przez API kompatybilne z OpenAI — bez chmury, subskrypcji Azure i kluczy API. To świetna opcja do pracy offline, eksperymentowania bez kosztów chmury lub przechowywania danych lokalnie.

Ponieważ `OpenAIChatClient` Microsoft Agent Framework działa z każdym endpointem kompatybilnym z OpenAI, Foundry Local jest lokalnym zamiennikiem dla Azure OpenAI.

**1. Zainstaluj Foundry Local**

```bash
# Windows
winget install Microsoft.FoundryLocal

# macOS
brew install foundrylocal
```

**2. Pobierz i uruchom model** (to też uruchamia lokalną usługę):

```bash
foundry model list          # zobacz dostępne modele
foundry model run phi-4-mini
```

**3. Zainstaluj SDK Pythona** używany do wykrywania lokalnego endpointu:

```bash
pip install foundry-local-sdk
```

**4. Skieruj Microsoft Agent Framework do lokalnego modelu:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# Pobiera (jeśli potrzebne) i obsługuje model lokalnie, następnie odnajduje punkt końcowy/port.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # np. http://localhost:<port>/v1
    api_key=manager.api_key,        # zawsze "niewymagane" dla Foundry Local
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **Uwaga:** Foundry Local udostępnia endpoint OpenAI kompatybilny z **Chat Completions**. Używaj go do pracy lokalnej i scenariuszy offline. Aby skorzystać z pełnego zestawu funkcji **Responses API** (stanowe rozmowy, zaawansowana orkiestracja narzędzi i rozwój w stylu agentów), skieruj się na **Azure OpenAI** lub projekt **Microsoft Foundry** jak pokazano w lekcjach. Zobacz [dokumentację Foundry Local](https://foundrylocal.ai) dla aktualnego katalogu modeli i obsługi platformy.


## Dodatkowa konfiguracja do lekcji 8 (Bing Grounding Workflow)

Notebook z warunkowym workflow w lekcji 8 korzysta z **Bing grounding** za pośrednictwem Microsoft Foundry. Jeśli planujesz uruchomić ten przykład, dodaj tę zmienną do swojego pliku `.env`:

| Zmienna | Gdzie ją znaleźć |
|----------|-----------------|
| `BING_CONNECTION_ID` | Portal Microsoft Foundry → twój projekt → **Management** → **Connected resources** → twoje połączenie Bing → skopiuj ID połączenia |

## Rozwiązywanie problemów

### Błędy weryfikacji certyfikatu SSL na macOS

Jeśli korzystasz z macOS i napotykasz błąd taki jak:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Jest to znany problem z Pythonem na macOS, gdzie systemowe certyfikaty SSL nie są automatycznie zaufane. Wypróbuj następujące rozwiązania w kolejności:

**Opcja 1: Uruchom skrypt instalacyjny certyfikatów Pythona (zalecane)**

```bash
# Zamień 3.XX na zainstalowaną wersję Pythona (np. 3.12 lub 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Opcja 2: Użyj `connection_verify=False` w swoim notebooku (dotyczy tylko notebooków GitHub Models)**

W notebooku z Lekcji 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) jest już zawarte zakomentowane obejście. Odkomentuj `connection_verify=False` podczas tworzenia klienta:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Wyłącz weryfikację SSL, jeśli napotkasz błędy certyfikatu
)
```

> **⚠️ Ostrzeżenie:** Wyłączanie weryfikacji SSL (`connection_verify=False`) obniża bezpieczeństwo przez pominięcie walidacji certyfikatu. Używaj tego tylko jako tymczasowego obejścia w środowisku rozwojowym, nigdy w produkcji.

**Opcja 3: Zainstaluj i użyj `truststore`**

```bash
pip install truststore
```

Następnie dodaj poniższe na początku swojego notebooka lub skryptu przed wykonaniem jakichkolwiek wywołań sieciowych:

```python
import truststore
truststore.inject_into_ssl()
```

## Utknąłeś gdzieś?

Jeśli napotkasz jakiekolwiek problemy z uruchomieniem tej konfiguracji, dołącz do naszej <a href="https://discord.gg/kzRShWzttr" target="_blank">społeczności Azure AI na Discordzie</a> lub <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">zgłoś problem</a>.

## Następna lekcja

Jesteś już gotowy, by uruchomić kod tego kursu. Powodzenia w dalszym zgłębianiu świata Agentów AI!

[Wprowadzenie do Agentów AI i przykładów ich zastosowań](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->