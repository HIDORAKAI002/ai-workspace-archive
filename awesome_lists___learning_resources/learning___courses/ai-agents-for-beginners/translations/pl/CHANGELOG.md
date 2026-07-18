# Dziennik zmian

Wszystkie istotne zmiany w kursie **AI Agents for Beginners** są dokumentowane w tym pliku.

## [Wydanie] — 2026-07-13

To wydanie dodaje dwie nowe lekcje, które kończą łuk wdrożeniowy — skalowanie agentów do Microsoft Foundry i redukcję do pojedynczej stacji roboczej — oraz potok testów dymnych, odświeżoną nawigację kursu, nowe umiejętności dla uczniów i zaktualizowane oznakowanie.

### Dodano

- **Lekcja 16 — Wdrażanie skalowalnych agentów z Microsoft Foundry.** Nowa lekcja [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) oraz uruchamialny notatnik [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) tworzący produkcyjnego agenta wsparcia klienta (narzędzia, RAG, pamięć, routowanie modeli, cache odpowiedzi, zatwierdzanie przez człowieka, brama ewaluacji oraz śledzenie OpenTelemetry), z diagramami Mermaid dla faz rozwoju/wdrożenia/uruchomienia, sprawdzeniem wiedzy, zadaniem i wyzwaniem.
- **Lekcja 17 — Tworzenie lokalnych agentów AI z Foundry Local i Qwen.** Nowa lekcja [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) oraz notatnik [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) tworzący w pełni lokalnego asystenta inżynieryjnego (wywoływanie funkcji Qwen przez Foundry Local, piaskownicowane narzędzia plikowe, lokalne RAG z Chroma, opcjonalny lokalny MCP), z diagramami wyłącznie lokalnymi / lokalnego RAG / wywoływania narzędzi, sprawdzeniem wiedzy, zadaniem i wyzwaniem.
- **Potok testów dymnych.** Nowy workflow [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) oraz katalogi na lekcję w [tests/](./tests/README.md) dla wdrażalnych agentów z lekcji 01, 04, 05 i 16, z indeksowym README mapującym każdy katalog do lekcji i nazwy hostowanego agenta. Lekcja 16 zyskuje sekcję „Walidacja wdrożonego agenta testami dymnymi”; Lekcje 01/04/05 dostają opcjonalne wskazówki do testów dymnych.
- **Umiejętności uczniów.** Nowe umiejętności agentów pod `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (pakietujące wskazówki z Lekcji 16 i 17), oraz [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (sposób walidacji próbek notatników w porównaniu z działającą konfiguracją Microsoft Foundry / Azure OpenAI).
- **Uruchamiacz walidacji notatników.** Nowy [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) wykonujący każde notatniki Python bez interfejsu (headless) za pomocą `nbconvert` i wyświetlający macierz PASS/FAIL (oraz plik `results.json`). Automatycznie wykrywa katalog repozytorium i Pythona, domyślnie wyłącza notatniki spoza kursu (`.venv`, `site-packages`, `translations`, zasoby szablonów umiejętności) oraz `.NET`, wspiera `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet` i `-Python`.
- **Nawigacja kursu.** Dodano łącza Poprzednia/Następna lekcja do Lekcji 11–15 (wcześniej brakowało), dzięki czemu cały kurs łączy się od 00 do 18 w obu kierunkach.
- **Nowe miniatury.** Miniatury lekcji dla Lekcji 16 i 17 oraz odświeżony obraz społeczności repozytorium [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (teraz reklamujący dwie nowe lekcje i adres URL `aka.ms/ai-agents-beginners`).
- **Zależności** ([requirements.txt](../../requirements.txt)): dodano `foundry-local-sdk` i `chromadb` dla Lekcji 17.

### Zmieniono

- **Główna tabela lekcji [README.md](./README.md):** Lekcje 16 i 17 teraz łączą się ze swoją zawartością (wcześniej „Wkrótce”); obraz repozytorium podbity do `repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md):** dodano Lekcje 16 i 17 do przewodnika lekcja po lekcji i ścieżek nauki oraz sekcję „Walidacja wdrożonych agentów testami dymnymi”.
- **[AGENTS.md](./AGENTS.md):** zaktualizowano liczbę/opis lekcji (00–18), dodano sekcję weryfikacji testami dymnymi oraz przykłady nazewnictwa próbek z Lekcji 16/17.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md):** „Poprzednia lekcja” teraz wskazuje na Lekcję 17 (wcześniej Lekcja 15), zamykając łańcuch.
- **Ujednolicenie odwołań do modeli nieprzestarzałych.** Zastąpiono wszystkie odwołania do `gpt-4o` / `gpt-4o-mini` w kursie (dokumentacja, `.env.example`, notatniki i próbki w Python/.NET) nazwą `gpt-4.1-mini` — `gpt-4o` (wszystkie wersje) będzie wycofane w 2026. Przykład routowania modelu w Lekcji 16 zachowuje kontrast mały/duży używając `gpt-4.1-mini` (mały) i `gpt-4.1` (duży). Notatniki w Pythonie teraz wybierają model z zmiennych środowiskowych (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) zamiast na stałe wpisywać nazwę modelu.

### Uwagi i znane ograniczenia

- **Nie uruchamiane przeciwko żywemu Azure.** Notatniki nowych lekcji są próbkami edukacyjnymi; uruchom i zweryfikuj je na własnym środowisku Microsoft Foundry / Foundry Local. Workflow testów dymnych wymaga wdrożenia agenta z lekcji i skonfigurowania sekretów Azure OIDC (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) z rolą **Azure AI User** w zakresie projektu Foundry.
- **Lekcja 17 jest tylko lokalna.** Nie ma punktu końcowego Foundry Responses, więc akcja testów dymnych jej nie dotyczy; zweryfikuj ją uruchamiając notatnik na swojej stacji roboczej.

## [Wydanie] — 2026-07-06

To wydanie migruje kurs do **Azure OpenAI Responses API**, ujednolica nazewnictwo produktów na **Microsoft Foundry** oraz **Microsoft Agent Framework (MAF)**, wycofuje GitHub Models, aktualizuje wersje SDK i dodaje nową zawartość o lokalnych modelach i hostowaniu innych frameworków na Foundry.

### Dodano

- **Umiejętność migracji** — Zainstalowano [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) Agent Skill (z [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) pod `.agents/skills/`, wraz z jego odwołaniami i skryptem skanującym.
- **Foundry Local (uruchamianie modeli lokalnie)** — Nowa sekcja „Alternatywny Dostawca: Foundry Local” w [00-course-setup/README.md](./00-course-setup/README.md) obejmująca instalację (`winget` / `brew`), `foundry model run`, `foundry-local-sdk` oraz podłączanie `FoundryLocalManager` do Microsoft Agent Framework przez `OpenAIChatClient`.
- **Hostowanie agentów LangChain / LangGraph na Microsoft Foundry** — Nowa sekcja w [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) oraz uruchamialny przykład [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) używający `langchain-azure-ai[hosting]` i `ResponsesHostServer` (protokół `/responses`), oparty na [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — Nowa sekcja "Przykład z rzeczywistego świata: Microsoft Project Opal" w [15-browser-use/README.md](./15-browser-use/README.md), przedstawiająca Opal jako agenta do użytku korporacyjnego oraz mapująca go do koncepcji kursu (człowiek w pętli, zaufanie/bezpieczeństwo, planowanie, umiejętności).
- **Drugi przykład Python na Lekcji 02** — Dodano [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (zobacz „Zmieniono” — migrowany z dawnego notatnika Semantic Kernel) i dołączono go w README lekcji.
- Dodano sekcję „Modele i dostawcy” do [STUDY_GUIDE.md](./STUDY_GUIDE.md).

### Zmieniono

- **Chat Completions → Responses API (Python).** Próbki wywołujące model bezpośrednio zostały zmigrowane z Chat Completions do Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), z użyciem klienta `OpenAI` przeciw stabilnemu punktowi końcowemu Azure OpenAI `/openai/v1/` (bez `api_version`). Dotyczy to próbek:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — pełny przewodnik wywoływania funkcji (schemat narzędzi dostosowany do formatu Responses, wyniki narzędzi zwracane jako `function_call_output`, `max_output_tokens` itd.).
- **GitHub Models → Azure OpenAI.** GitHub Models jest przestarzały (wycofywany **lipiec 2026**) i nie wspiera Responses API. Wszystkie ścieżki kodu GitHub Models zostały przekonwertowane na Azure OpenAI / Microsoft Foundry w próbkach Python i .NET:
  - Python: notatniki workflow Lekcji 08 (`01`–`03`), Lekcja 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + towarzysząca dokumentacja `.md`, oraz notatniki/`.md` workflow Lekcji 08 dotNET (`01`–`03`) teraz używają `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` z `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** Dawny `02-semantic-kernel.ipynb` został przerobiony na użycie Microsoft Agent Framework z Azure OpenAI (Responses API) i przemianowany na `02-python-agent-framework-azure-openai.ipynb`.
- **Ujednolicono na `FoundryChatClient` + `as_agent`.** README i kod notatników odwołujący się do `AzureAIProjectAgentProvider` został ujednolicony do wzorca stosowanego w Lekcji 01 i własnych przykładach frameworka: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` z `provider.as_agent(...)`. Zaktualizowano w README i notatnikach Lekcji 02–14 (np. pamięć w Lekcji 13, wszystkie notatniki Lekcji 14, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Nazewnictwo produktów.** Zmieniono w całej treści angielskiej:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Bez zmian: "Azure OpenAI", "Azure AI Search", "Azure AI Inference" oraz nazwy zmiennych środowiskowych.)
- **Zależności** ([requirements.txt](../../requirements.txt)):
  - Usztywniono wersje `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Usztywniono `openai>=1.108.1` (minimalna dla Responses API).
  - Usunięto `azure-ai-inference` (był używany tylko przez migrowane próbki GitHub Models).
- **Konfiguracja środowiska** ([.env.example](../../.env.example)): usunięto zmienne GitHub Models (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); dodano `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT` i opcjonalny `AZURE_OPENAI_API_KEY`; zaktualizowano nazewnictwo do Microsoft Foundry.
- **Dokumentacja** — Zaktualizowano [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md) oraz [STUDY_GUIDE.md](./STUDY_GUIDE.md) odpowiadająco (zmienne środowiskowe, fragmenty weryfikacyjne, wskazówki dotyczące dostawców, nazewnictwo).

### Usunięto

- Kroki rozpoczęcia pracy i zmienne środowiskowe GitHub Models z dokumentacji instalacyjnej (zastąpione przez Azure OpenAI / Microsoft Foundry).

### Bezpieczeństwo / Prywatność (czyszczenie danych publicznych)

- Wyczyszczono wyniki wykonania notatników Jupyter, które ujawniały prawdziwe **ID subskrypcji Azure**, nazwy grup zasobów / zasobów oraz ID połączenia Bing, a także **lokalne ścieżki plików i nazwy użytkowników** deweloperów, w:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Zweryfikowano, że w śledzonej angielskiej zawartości nie pozostały klucze API, tokeny, identyfikatory subskrypcji ani ścieżki osobiste (pozostałe odniesienia do `GITHUB_TOKEN` to token GitHub Actions w workflowach i PAT serwera GitHub MCP w konfiguracji Lekcji 11 — oba są prawidłowe i niezwiązane z GitHub Models).

### Uwagi i znane ograniczenia

- **Nie wykonane/nie skompilowane.** To są próbki edukacyjne zaktualizowane pod kątem poprawności API/nazewnictwa; nie były uruchamiane na aktywnych zasobach Azure, a próbki .NET nie były kompilowane w tym środowisku. Zweryfikuj we własnym wdrożeniu Microsoft Foundry / Azure OpenAI.
- **Wdrożenie modelu musi obsługiwać API Responses.** Użyj wdrożenia takiego jak `gpt-4.1-mini`, `gpt-4.1` lub modelu `gpt-5.x`. Starsze modele obsługują podstawową funkcjonalność Responses, ale nie wszystkie funkcje.
- **Wersja agent-framework.** Próbki docelowo używają najnowszego MAF (`>=1.10.0`). Kanoniczne wywołanie tworzenia agenta to `client.as_agent(...)`; API zostały zweryfikowane w stosunku do opublikowanej dokumentacji frameworka oraz zainstalowanej wersji. Jeśli użyjesz innej wersji, potwierdź dostępność metod (`as_agent` vs `create_agent`).
- **Notebook workflow Lekcji 08, plik 04** celowo zachowuje `AzureAIAgentClient` (z `agent-framework-azure-ai`), ponieważ korzysta z narzędzi hostowanych Microsoft Foundry Agent Service (Bing grounding, interpreter kodu); jest to już oparte na Responses.
- **Domyślne wdrożenie .NET.** Dwa próbki workflow dotNET z Lekcji 08 wcześniej miały na stałe przypisany konkretny model; teraz domyślnie używają `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). Jeśli próbka wymaga multimodalnego/wejścia wizualnego, ustaw `AZURE_OPENAI_DEPLOYMENT` na odpowiedni model.
- **Foundry Local** udostępnia kompatybilny z OpenAI endpoint **Chat Completions** i jest przeznaczony do lokalnego rozwoju; dla pełnego zestawu funkcji API Responses używaj Azure OpenAI / Microsoft Foundry.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->