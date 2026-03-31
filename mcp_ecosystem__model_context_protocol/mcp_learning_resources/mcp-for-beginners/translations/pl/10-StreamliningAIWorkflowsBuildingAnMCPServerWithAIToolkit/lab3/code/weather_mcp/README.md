# Weather MCP Server

To jest przykładowy serwer MCP w Pythonie implementujący narzędzia pogodowe z symulowanymi odpowiedziami. Może być używany jako szkielet do własnego serwera MCP. Zawiera następujące funkcje:

- **Narzędzie pogodowe**: narzędzie, które dostarcza symulowane informacje pogodowe na podstawie podanej lokalizacji.
- **Połączenie z Agent Builder**: funkcja pozwalająca na połączenie serwera MCP z Agent Builder do testowania i debugowania.
- **Debugowanie w [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: funkcja pozwalająca debugować serwer MCP za pomocą MCP Inspector.

## Rozpocznij z szablonem Weather MCP Server

> **Wymagania wstępne**
>
> Aby uruchomić serwer MCP na lokalnej maszynie deweloperskiej, potrzebujesz:
>
> - [Python](https://www.python.org/)
> - (*Opcjonalnie - jeśli preferujesz uv*) [uv](https://github.com/astral-sh/uv)
> - [Rozszerzenie debugera Python](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Przygotowanie środowiska

Są dwie metody na skonfigurowanie środowiska dla tego projektu. Możesz wybrać dowolną w zależności od preferencji.

> Uwaga: Przeładuj VSCode lub terminal, aby mieć pewność, że jest używany Python z wirtualnego środowiska po jego utworzeniu.

| Podejście | Kroki |
| --------- | ----- |
| Użycie `uv` | 1. Utwórz wirtualne środowisko: `uv venv` <br>2. W VSCode uruchom polecenie "***Python: Select Interpreter***" i wybierz Pythona z utworzonego wirtualnego środowiska <br>3. Zainstaluj zależności (w tym zależności developerskie): `uv pip install -r pyproject.toml --extra dev` |
| Użycie `pip` | 1. Utwórz wirtualne środowisko: `python -m venv .venv` <br>2. W VSCode uruchom polecenie "***Python: Select Interpreter***" i wybierz Pythona z utworzonego wirtualnego środowiska<br>3. Zainstaluj zależności (w tym zależności developerskie): `pip install -e .[dev]` |

Po skonfigurowaniu środowiska możesz uruchomić serwer na lokalnej maszynie deweloperskiej poprzez Agent Builder jako klient MCP, aby rozpocząć:
1. Otwórz panel debugowania w VS Code. Wybierz `Debug in Agent Builder` lub naciśnij `F5`, aby rozpocząć debugowanie serwera MCP.
2. Użyj AI Toolkit Agent Builder do testowania serwera z [tym zapytaniem](../../../../../../../../../../../open_prompt_builder). Serwer zostanie automatycznie podłączony do Agent Builder.
3. Kliknij `Run`, aby przetestować serwer z podanym zapytaniem.

**Gratulacje**! Pomyślnie uruchomiłeś Weather MCP Server na swojej lokalnej maszynie deweloperskiej poprzez Agent Builder jako klienta MCP.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Co zawiera szablon

| Folder / Plik | Zawartość                                  |
| ------------- | ------------------------------------------ |
| `.vscode`     | Pliki VSCode do debugowania                |
| `.aitk`       | Konfiguracje dla AI Toolkit                 |
| `src`         | Kod źródłowy serwera weather mcp            |

## Jak debugować Weather MCP Server

> Uwagi:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) to wizualne narzędzie developerskie do testowania i debugowania serwerów MCP.
> - Wszystkie tryby debugowania obsługują punkty przerwania, więc możesz dodawać punkty przerwania w kodzie implementacji narzędzia.

| Tryb debugowania | Opis | Kroki debugowania |
|------------------|------|-------------------|
| Agent Builder | Debugowanie serwera MCP w Agent Builder przez AI Toolkit. | 1. Otwórz panel debugowania w VS Code. Wybierz `Debug in Agent Builder` i naciśnij `F5`, aby rozpocząć debugowanie serwera MCP.<br>2. Użyj AI Toolkit Agent Builder, aby przetestować serwer z [tym zapytaniem](../../../../../../../../../../../open_prompt_builder). Serwer zostanie automatycznie podłączony do Agent Builder.<br>3. Kliknij `Run`, aby przetestować serwer z zapytaniem. |
| MCP Inspector | Debugowanie serwera MCP przy użyciu MCP Inspector. | 1. Zainstaluj [Node.js](https://nodejs.org/)<br> 2. Skonfiguruj Inspector: `cd inspector` && `npm install` <br> 3. Otwórz panel debugowania w VS Code. Wybierz `Debug SSE in Inspector (Edge)` lub `Debug SSE in Inspector (Chrome)`. Naciśnij F5, aby rozpocząć debugowanie.<br> 4. Gdy MCP Inspector uruchomi się w przeglądarce, kliknij przycisk `Connect`, aby połączyć ten serwer MCP.<br> 5. Następnie możesz `List Tools`, wybrać narzędzie, wprowadzić parametry i `Run Tool`, aby debugować kod twojego serwera.<br> |

## Domyślne porty i możliwości dostosowania

| Tryb debugowania | Porty | Definicje | Dostosowania | Uwagi |
| ---------------- | ------ | --------- | ------------- | ------ |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Edytuj [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), aby zmienić powyższe porty. | Brak |
| MCP Inspector | 3001 (Serwer); 5173 i 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Edytuj [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), aby zmienić powyższe porty. | Brak |

## Informacje zwrotne

Jeśli masz jakiekolwiek uwagi lub propozycje dotyczące tego szablonu, prosimy o otwarcie zgłoszenia w [repozytorium AI Toolkit na GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Wyłączenie odpowiedzialności**:  
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mimo że staramy się zapewnić dokładność, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub nieścisłości. Oryginalny dokument w języku źródłowym należy traktować jako źródło wiążące. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z korzystania z tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->