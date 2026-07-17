# Uruchamianie tego przykładu

To jest rozwiązanie w Rust dla przykładu klienta LLM. Musisz mieć zainstalowany toolchain Rust; zobacz [oficjalny przewodnik instalacji](https://www.rust-lang.org/tools/install).

Klient wywołuje model przez endpoint inferencyjny GitHub Models (`https://models.github.ai/inference/chat`) i odczytuje Twój osobisty token dostępu GitHub (PAT) z zmiennej środowiskowej `OPENAI_API_KEY`.

> [!NOTE]
> Inne rozwiązania w tym repozytorium używają `GITHUB_TOKEN`. W przypadku Rust ustaw `OPENAI_API_KEY` na tę samą wartość, aby dopasować konfigurację klienta OpenAI.

## -0- Ustaw swój token GitHub

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Zbuduj przykład

```bash
cargo build
```

## -2- Uruchom przykład

```bash
cargo run
```

Klient uruchamia serwer kalkulatora MCP, pobiera jego listę narzędzi i używa modelu (`openai/gpt-5-mini`), aby wywołać narzędzie `add`. Powinieneś zobaczyć komunikat wskazujący na wywołanie narzędzia (na przykład „Calling tool: add”) oraz wynik tego wywołania.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->