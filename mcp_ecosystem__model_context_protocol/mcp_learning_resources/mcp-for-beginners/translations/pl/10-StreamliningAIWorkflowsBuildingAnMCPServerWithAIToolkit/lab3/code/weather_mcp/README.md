# Weather MCP Server

To jest przykładowy serwer MCP w Pythonie implementujący narzędzia pogodowe z odpowiedziami na wzór. Może być używany jako szkielet dla własnego serwera MCP. Zawiera następujące funkcje:

- **Narzędzie pogodowe**: narzędzie dostarczające symulowane informacje pogodowe na podstawie podanej lokalizacji.
- **Połącz z Agent Builder**: funkcja umożliwiająca połączenie serwera MCP z Agent Builder do testowania i debugowania.
- **Debuguj w [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: funkcja umożliwiająca debugowanie serwera MCP za pomocą MCP Inspector.

## Rozpocznij pracę z szablonem Weather MCP Server

> **Wymagania wstępne**
>
> Aby uruchomić serwer MCP na lokalnej maszynie deweloperskiej, potrzebujesz:
>
> - [Python](https://www.python.org/)
> - (*Opcjonalnie - jeśli preferujesz uv*) [uv](https://github.com/astral-sh/uv)
> - [Rozszerzenie debugera Pythona](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Przygotuj środowisko

Są dwa sposoby na ustawienie środowiska dla tego projektu. Możesz wybrać którykolwiek według własnych preferencji.

> Uwaga: Przeładuj VSCode lub terminal, aby zapewnić użycie Pythona z wirtualnego środowiska po jego utworzeniu.

| Podejście | Kroki |
| -------- | ----- |
| Korzystanie z `uv` | 1. Utwórz wirtualne środowisko: `uv venv` <br>2. Uruchom komendę VSCode "***Python: Select Interpreter***" i wybierz Pythona z utworzonego wirtualnego środowiska <br>3. Zainstaluj zależności (w tym zależności developerskie): `uv pip install -r pyproject.toml --extra dev` |
| Korzystanie z `pip` | 1. Utwórz wirtualne środowisko: `python -m venv .venv` <br>2. Uruchom komendę VSCode "***Python: Select Interpreter***" i wybierz Pythona z utworzonego wirtualnego środowiska<br>3. Zainstaluj zależności (w tym zależności developerskie): `pip install -e .[dev]` | 

Po skonfigurowaniu środowiska możesz uruchomić serwer na lokalnej maszynie deweloperskiej za pomocą Agent Builder jako klienta MCP, aby rozpocząć pracę:
1. Otwórz panel debugowania w VS Code. Wybierz `Debug in Agent Builder` lub naciśnij `F5`, aby rozpocząć debugowanie serwera MCP.
2. Użyj Microsoft Foundry Toolkit Agent Builder, aby przetestować serwer z [tym poleceniem](../../../../../../../../../../../open_prompt_builder). Serwer zostanie automatycznie połączony z Agent Builder.
3. Kliknij `Run`, aby przetestować serwer przy użyciu polecenia.

**Gratulacje**! Pomyślnie uruchomiłeś Weather MCP Server na lokalnej maszynie deweloperskiej za pomocą Agent Builder jako klienta MCP.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Co jest zawarte w szablonie

| Folder / Plik| Zawartość                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | Pliki VSCode do debugowania                   |
| `.aitk`      | Konfiguracje dla Microsoft Foundry Toolkit                |
| `src`        | Kod źródłowy serwera weather mcp   |

## Jak debugować Weather MCP Server

> Uwaga:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) to wizualne narzędzie developerskie do testowania i debugowania serwerów MCP.
> - Wszystkie tryby debugowania obsługują punkty przerwania, więc możesz dodawać punkty przerwania w kodzie implementacji narzędzia.

| Tryb debugowania | Opis | Kroki debugowania |
| ---------- | ----------- | --------------- |
| Agent Builder | Debuguj serwer MCP w Agent Builder za pomocą Microsoft Foundry Toolkit. | 1. Otwórz panel debugowania VS Code. Wybierz `Debug in Agent Builder` i naciśnij `F5`, aby rozpocząć debugowanie serwera MCP.<br>2. Użyj Microsoft Foundry Toolkit Agent Builder, aby przetestować serwer z [tym poleceniem](../../../../../../../../../../../open_prompt_builder). Serwer zostanie automatycznie połączony z Agent Builder.<br>3. Kliknij `Run`, aby przetestować serwer z poleceniem. |
| MCP Inspector | Debuguj serwer MCP za pomocą MCP Inspector. | 1. Zainstaluj [Node.js](https://nodejs.org/)<br> 2. Skonfiguruj Inspector: `cd inspector` && `npm install` <br> 3. Otwórz panel debugowania VS Code. Wybierz `Debug SSE in Inspector (Edge)` lub `Debug SSE in Inspector (Chrome)`. Naciśnij F5, aby rozpocząć debugowanie.<br> 4. Gdy MCP Inspector uruchomi się w przeglądarce, kliknij przycisk `Connect`, aby połączyć ten serwer MCP.<br> 5. Następnie możesz `List Tools`, wybrać narzędzie, wprowadzić parametry i `Run Tool`, aby debugować swój kod serwera.<br> |

## Domyślne porty i dostosowania

| Tryb debugowania | Porty | Definicje | Dostosowania | Uwagi |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Edytuj [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), aby zmienić powyższe porty. | N/A |
| MCP Inspector | 3001 (Serwer); 5173 i 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Edytuj [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), aby zmienić powyższe porty.| N/A |

## Informacje zwrotne

Jeśli masz jakiekolwiek uwagi lub sugestie dotyczące tego szablonu, prosimy o założenie zgłoszenia na [repozytorium Microsoft Foundry Toolkit na GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->