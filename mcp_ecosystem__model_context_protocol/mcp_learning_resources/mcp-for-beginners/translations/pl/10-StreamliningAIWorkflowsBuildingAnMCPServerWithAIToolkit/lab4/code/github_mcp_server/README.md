# Serwer MCP Pogody

To przykładowy serwer MCP w Pythonie implementujący narzędzia pogodowe z symulowanymi odpowiedziami. Może służyć jako szkielet do własnego serwera MCP. Zawiera następujące funkcje:

- **Narzędzie pogodowe**: narzędzie dostarczające symulowane informacje pogodowe na podstawie podanej lokalizacji.
- **Narzędzie Git Clone**: narzędzie do klonowania repozytorium git do określonego folderu.
- **Narzędzie otwierania w VS Code**: narzędzie otwierające folder w VS Code lub VS Code Insiders.
- **Połącz z Agent Builder**: funkcja umożliwiająca połączenie serwera MCP z Agent Builder do testowania i debugowania.
- **Debugowanie w [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: funkcja umożliwiająca debugowanie serwera MCP przy użyciu MCP Inspector.

## Rozpoczęcie pracy z szablonem Weather MCP Server

> **Wymagania wstępne**
>
> Aby uruchomić serwer MCP na swoim lokalnym komputerze developerskim, potrzebujesz:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (wymagany dla narzędzia git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) lub [VS Code Insiders](https://code.visualstudio.com/insiders/) (wymagane dla narzędzia open_in_vscode)
> - (*Opcjonalnie - jeśli preferujesz uv*) [uv](https://github.com/astral-sh/uv)
> - [Rozszerzenie Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Przygotowanie środowiska

Istnieją dwa sposoby konfiguracji środowiska dla tego projektu. Możesz wybrać jeden w zależności od swoich preferencji.

> Uwaga: Przeładuj VSCode lub terminal, aby upewnić się, że po utworzeniu środowiska wirtualnego używany jest python z tego środowiska wirtualnego.

| Podejście | Kroki |
| -------- | ------ |
| Użycie `uv` | 1. Utwórz środowisko wirtualne: `uv venv` <br>2. Uruchom w VSCode polecenie "***Python: Select Interpreter***" i wybierz python z utworzonego środowiska wirtualnego <br>3. Zainstaluj zależności (w tym deweloperskie): `uv pip install -r pyproject.toml --extra dev` |
| Użycie `pip` | 1. Utwórz środowisko wirtualne: `python -m venv .venv` <br>2. Uruchom w VSCode polecenie "***Python: Select Interpreter***" i wybierz python z utworzonego środowiska wirtualnego<br>3. Zainstaluj zależności (w tym deweloperskie): `pip install -e .[dev]` |

Po skonfigurowaniu środowiska możesz uruchomić serwer na swoim lokalnym komputerze developerskim za pomocą Agent Builder jako klienta MCP, aby zacząć:
1. Otwórz panel debugowania w VS Code. Wybierz `Debug in Agent Builder` lub naciśnij `F5`, aby rozpocząć debugowanie serwera MCP.
2. Użyj AI Toolkit Agent Builder do testowania serwera z [tym promptem](../../../../../../../../../../../open_prompt_builder). Serwer zostanie automatycznie podłączony do Agent Builder.
3. Kliknij `Run`, aby przetestować serwer przy pomocy promptu.

**Gratulacje**! Pomyślnie uruchomiłeś Serwer MCP Pogody na swoim lokalnym komputerze developerskim za pomocą Agent Builder jako klienta MCP.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Co zawiera szablon

| Folder / Plik| Zawartość                                   |
| ------------ | -------------------------------------------- |
| `.vscode`    | Pliki VSCode do debugowania                   |
| `.aitk`      | Konfiguracje dla AI Toolkit                    |
| `src`        | Kod źródłowy serwera MCP pogodowego           |

## Jak debugować Weather MCP Server

> Uwagi:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) to wizualne narzędzie developerskie do testowania i debugowania serwerów MCP.
> - Wszystkie tryby debugowania obsługują punkty przerwania, więc możesz dodawać punkty przerwania do kodu implementacji narzędzi.

## Dostępne narzędzia

### Narzędzie pogodowe
Narzędzie `get_weather` dostarcza symulowanych informacji pogodowych dla wskazanej lokalizacji.

| Parametr  | Typ    | Opis                                                      |
| --------- | ------ | --------------------------------------------------------- |
| `location` | string | Lokalizacja, dla której ma zostać pobrana pogoda (np. nazwa miasta, stan lub współrzędne) |

### Narzędzie Git Clone
Narzędzie `git_clone_repo` klonuje repozytorium git do wskazanego folderu.

| Parametr      | Typ    | Opis                                   |
| ------------- | ------ | ------------------------------------- |
| `repo_url`    | string | URL repozytorium git do sklonowania   |
| `target_folder` | string | Ścieżka do folderu, w którym ma być sklonowane repozytorium |

Narzędzie zwraca obiekt JSON z:
- `success`: wartość logiczna wskazująca, czy operacja powiodła się
- `target_folder` lub `error`: ścieżka sklonowanego repozytorium lub komunikat o błędzie

### Narzędzie otwierania w VS Code
Narzędzie `open_in_vscode` otwiera folder w aplikacji VS Code lub VS Code Insiders.

| Parametr      | Typ      | Opis                                             |
| ------------- | -------- | ------------------------------------------------ |
| `folder_path` | string   | Ścieżka do folderu do otwarcia                    |
| `use_insiders` | boolean (opcjonalny) | Czy użyć VS Code Insiders zamiast standardowego VS Code |

Narzędzie zwraca obiekt JSON z:
- `success`: wartość logiczna wskazująca, czy operacja powiodła się
- `message` lub `error`: potwierdzenie lub komunikat o błędzie

| Tryb debugowania | Opis | Kroki debugowania |
| ---------------- | ----- | ----------------- |
| Agent Builder    | Debugowanie serwera MCP w Agent Builder za pomocą AI Toolkit. | 1. Otwórz panel debugowania VS Code. Wybierz `Debug in Agent Builder` i naciśnij `F5`, aby rozpocząć debugowanie serwera MCP.<br>2. Użyj AI Toolkit Agent Builder do testowania serwera z [tym promptem](../../../../../../../../../../../open_prompt_builder). Serwer zostanie automatycznie podłączony do Agent Builder.<br>3. Kliknij `Run`, aby przetestować serwer z promptem. |
| MCP Inspector   | Debugowanie serwera MCP przy użyciu MCP Inspector. | 1. Zainstaluj [Node.js](https://nodejs.org/)<br> 2. Skonfiguruj Inspector: `cd inspector` && `npm install` <br> 3. Otwórz panel debugowania VS Code. Wybierz `Debug SSE in Inspector (Edge)` lub `Debug SSE in Inspector (Chrome)` i naciśnij F5, aby rozpocząć debugowanie.<br> 4. Po uruchomieniu MCP Inspector w przeglądarce kliknij przycisk `Connect`, aby połączyć ten serwer MCP.<br> 5. Następnie możesz `List Tools`, wybrać narzędzie, wprowadzić parametry i uruchomić narzędzie, aby debugować swój kod serwera.<br> |

## Domyślne porty i dostosowania

| Tryb debugowania | Porty | Definicje | Dostosowania | Uwaga |
| ---------------- | ----- | -------- | ------------ | ------ |
| Agent Builder    | 3001  | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Edytuj [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json), aby zmienić powyższe porty. | Brak |
| MCP Inspector    | 3001 (serwer); 5173 i 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Edytuj [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json), aby zmienić powyższe porty. | Brak |

## Opinie

Jeśli masz jakiekolwiek uwagi lub sugestie dotyczące tego szablonu, prosimy o otwarcie zgłoszenia na [repozytorium AI Toolkit GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:  
Ten dokument został przetłumaczony za pomocą usługi tłumaczeń AI [Co-op Translator](https://github.com/Azure/co-op-translator). Chociaż dokładamy starań, aby tłumaczenie było jak najbardziej precyzyjne, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub nieścisłości. Oryginalny dokument w jego oryginalnym języku powinien być traktowany jako źródło autorytatywne. W przypadku informacji o krytycznym znaczeniu zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z korzystania z tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->