---
name: testing-course-samples
---
# Testowanie przykładów kursu

Sprawdź, czy notatniki lekcji i przykłady kodu działają z działającym
środowiskiem Microsoft Foundry / Azure OpenAI. Repozytorium zawiera runnera pod
[`scripts/validate-notebooks.ps1`](../../../../../scripts/validate-notebooks.ps1), który
uruchamia wszystkie notatniki Pythona bez interfejsu i wypisuje macierz PASS/FAIL.

## Kiedy używać
- "Sprawdź wszystkie notatniki / przykłady w mojej subskrypcji Azure."
- "Szybko przetestuj kurs po aktualizacji pakietów lub zmianie modeli."
- "Które lekcje wciąż przechodzą / nie przechodzą testów na żywo?"

Nie używaj tego do GitHub Action AI Smoke Test (który weryfikuje *wdrożonych*
hostowanych agentów — patrz [`tests/README.md`](../../../tests/README.md)). Ten skrypt
uruchamia notatniki lokalnie.

## Wymagania wstępne (sprawdź najpierw)
1. **Python 3.12+** z zależnościami kursu: `python -m pip install -r requirements.txt`
   oraz executor: `python -m pip install nbconvert ipykernel`.
2. **`.env` w katalogu głównym repozytorium** (skopiuj z [`.env.example`](../../../../../.env.example)) zawierający przynajmniej:
   - `AZURE_AI_PROJECT_ENDPOINT` — punkt końcowy projektu Foundry
     (`https://<account>.services.ai.azure.com/api/projects/<project>`)
   - `AZURE_AI_MODEL_DEPLOYMENT_NAME` — nieprzestarzałe wdrożenie (np. `gpt-4.1-mini`)
   - `AZURE_OPENAI_ENDPOINT` (`https://<account>.openai.azure.com`) oraz `AZURE_OPENAI_DEPLOYMENT`
     dla lekcji, które wywołują Azure OpenAI bezpośrednio (Lekcja 06, 02-azure-openai, 14 handoff/human-loop).
3. Zalogowanie się przy pomocy **`az login`** — próbki uwierzytelniają się z `AzureCliCredential` (Entra ID, bez klucza).
4. Zweryfikuj, że wdrożenie modelu istnieje:
   `az cognitiveservices account deployment list -g <rg> -n <account> -o table`.

## Uruchamianie walidacji
```powershell
# Wszystkie notatniki Pythona (pomija .NET, .venv, site-packages, tłumaczenia, zasoby umiejętności)
pwsh scripts/validate-notebooks.ps1

# Pojedyncza lekcja, z dłuższym limitem czasu na komórkę
pwsh scripts/validate-notebooks.ps1 -Filter '08-*' -Timeout 600

# Tylko lista tego, co by się uruchomiło (bez wykonania)
pwsh scripts/validate-notebooks.ps1 -List

# Jawny interpreter (jeśli `python` nie jest w PATH, np. alias Windows Store)
pwsh scripts/validate-notebooks.ps1 -Python "C:/path/to/python.exe"
```
Skrypt zapisuje wykonywane kopie, logi dla każdego notatnika oraz `results.json` do
`$env:TEMP\aiab-nbval` i kończy się liczbą błędów.

## Interpretacja wyników
- `PASS` — notatnik został uruchomiony od początku do końca bez błędów komórki.
- `FAIL` — pokazana jest pierwsza linia `*Error` / `*Exception`; otwórz odpowiadający
  `log_*.txt` w katalogu wyjściowym, aby zobaczyć pełny ślad błędu.
- Pojedyncza porażka notatnika jest ograniczona przez `-Timeout` (na komórkę), więc zawieszona
  komórka z interakcją człowieka kończy się błędem `StdinNotImplementedError` zamiast zawieszania.

## Lekcje wymagające dodatkowych zasobów (oczekiwane niepowodzenia bez nich)
| Lekcja | Dodatkowe wymaganie |
|--------|-------------------|
| 05 Agentic RAG | Azure AI Search (`AZURE_SEARCH_SERVICE_ENDPOINT`, klucz) — ma ścieżkę zapasową w pamięci |
| 11 MCP / GitHub | Serwer MCP GitHub + PAT |
| 13 pamięć (cognee) | `cognee` skonfigurowany z dostawcą modelu |
| 15 użycie przeglądarki | Przeglądarki Playwright zainstalowane (`playwright install`) + `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` |
| 17 agent lokalny | Środowisko uruchomieniowe Foundry Local + pobrany model Qwen (na urządzeniu, bez chmury) |
| notatniki `*-dotnet-*` | Jądro .NET Interactive (domyślnie wyłączone; użyj `-IncludeDotnet`) |

## Raportowanie wyników
Podsumuj jako tabelę PASS/FAIL pogrupowaną według lekcji. Oddziel prawdziwe regresje
(błędy w kodzie/konfiguracji do naprawy) od braków środowiskowych (brak Search/Foundry Local/PAT),
i podaj pliki `log_*.txt` dla każdej rzeczywistej awarii.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->