# Uruchamianie przykładu

Zakładamy tutaj, że masz już działający kod serwera. Znajdź serwer z jednego z wcześniejszych rozdziałów.

## Skonfiguruj mcp.json

Oto plik, którego możesz użyć jako odniesienie, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Zmień wpis serwera tak, aby wskazywał pełną ścieżkę do twojego serwera wraz z pełną komendą potrzebną do uruchomienia.

W przykładowym pliku wspomnianym powyżej wpis serwera wygląda następująco:

<details>
<summary>node.js</summary>
```json
"hello-mcp": {
    "command": "node",
    "args": [
        "build/index.js"
    ]
}
```
</details>

<details>
<summary>.NET</summary>

Może być konieczne podanie głównego katalogu repozytorium GitHub, który można uzyskać poleceniem `git rev-parse --show-toplevel`.

```jsonc
{
  "inputs": [
    {
      "type": "promptString",
      "id": "repository-root",
      "description": "The absolute path to the repository root"
    }
  ],
  "servers": {
    "calculator-mcp-dotnet": {
      "type": "stdio",
      "command": "dotnet",
      "args": [
        "run",
        "--project",
        "${input:repository-root}/03-GettingStarted/02-client/solution/server/server.csproj"
      ]
    }
  }
}
```

</details>

Odpowiada to uruchomieniu polecenia takiego jak: `node build/index.js`.

- Zmień ten wpis serwera tak, aby odpowiadał lokalizacji pliku twojego serwera lub temu, co jest potrzebne do uruchomienia serwera w zależności od wybranego środowiska uruchomieniowego i lokalizacji serwera.

## Korzystaj z funkcji serwera

- Kliknij ikonę `play`, gdy dodasz plik *mcp.json* do folderu *./vscode*,

    Obserwuj zmianę ikony narzędzi, która zwiększy liczbę dostępnych narzędzi. Ikona narzędzi znajduje się tuż nad polem czatu w GitHub Copilot.

## Uruchom narzędzie

- Wpisz zapytanie w oknie czatu, które pasuje do opisu twojego narzędzia. Na przykład, aby uruchomić narzędzie `add`, wpisz coś w stylu "add 3 to 20".

    Powinieneś zobaczyć narzędzie wyświetlone nad polem tekstowym czatu, wskazujące, że możesz wybrać uruchomienie narzędzia, tak jak na tym obrazku:

    ![VS Code wskazujący, że chce uruchomić narzędzie](../../../../../translated_images/pl/vscode-agent.d5a0e0b897331060.webp)

    Wybranie narzędzia powinno zwrócić wynik liczbowy "23", jeśli twoje zapytanie było podobne do tego, które podaliśmy wcześniej.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->