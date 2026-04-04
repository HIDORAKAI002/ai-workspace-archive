# Weather MCP Server

Ово је пример MCP сервера написаног у Питону који имплементира алате за временске услове са симулираним одговорима. Може се користити као основа за ваш MCP сервер. Обухвата следеће функције:

- **Алати за време**: Алат који пружа симулиране информације о времену на основу дате локације.
- **Повезивање са Agent Builder-ом**: Функција која омогућава повезивање MCP сервера са Agent Builder-ом за тестирање и отклањање грешака.
- **Отлањање грешака у [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Функција која омогућава отклањање грешака MCP сервера коришћењем MCP Inspector-а.

## Почетак са Weather MCP Server шаблоном

> **Претходни услови**
>
> Да бисте покренули MCP сервер на локалној развојној машини, биће вам потребно:
>
> - [Python](https://www.python.org/)
> - (*Опционо - ако више волите uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Припрема окружења

Постоје два приступа за подешавање окружења за овај пројекат. Можете изабрати било који у складу са вашим преференцијама.

> Напомена: Учитајте поново VSCode или терминал како бисте осигурали коришћење Python-ове виртуелне околине након креирања исте.

| Приступ | Чинкови |
| -------- | ----- |
| Коришћење `uv` | 1. Креирајте виртуелно окружење: `uv venv` <br>2. Покрените наредбу у VSCode-у "***Python: Select Interpreter***" и изаберите Python из креираног виртуелног окружења <br>3. Инсталирајте зависности (укључујући развојне): `uv pip install -r pyproject.toml --extra dev` |
| Коришћење `pip` | 1. Креирајте виртуелно окружење: `python -m venv .venv` <br>2. Покрените наредбу у VSCode-у "***Python: Select Interpreter***" и изаберите Python из креираног виртуелног окружења<br>3. Инсталирајте зависности (укључујући развојне): `pip install -e .[dev]` |

Након постављања окружења, можете покренути сервер на вашој локалној развојној машини преко Agent Builder-а као MCP клијента да бисте започели:
1. Отворите панел за отклањање грешака у VS Code-у. Изаберите `Debug in Agent Builder` или притисните `F5` за покретање отклањања грешака MCP сервера.
2. Користите AI Toolkit Agent Builder за тестирање сервера са [овим захтевом](../../../../../../../../../../../open_prompt_builder). Сервер ће бити аутоматски повезан са Agent Builder-ом.
3. Кликните `Run` да бисте тестирали сервер са захтевом.

**Честитамо**! Успешно сте покренули Weather MCP Server на вашој локалној развојној машини преко Agent Builder-а као MCP клијента.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Шта је укључено у шаблон

| Фасцикла / Фајл | Садржај |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode фајлови за отклањање грешака          |
| `.aitk`      | Конфигурације за AI Toolkit                   |
| `src`        | Изворни код за weather mcp сервер             |

## Како отклањати грешке у Weather MCP Server-у

> Напомене:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) је визуелни алат за развојне програмере за тестирање и отклањање грешака MCP сервера.
> - Сви режими отклањања грешака подржавају прекидаче, тако да можете додавати прекидаче у код имплементације алата.

| Режим отклањања | Опис | Чинкови за отклањање грешака |
| ---------- | ----------- | --------------- |
| Agent Builder | Отклањање грешака MCP сервера у Agent Builder-у преко AI Toolkit-а. | 1. Отворите панел за отклањање у VS Code-у. Изаберите `Debug in Agent Builder` и притисните `F5` за покретање отклањања грешака MCP сервера.<br>2. Користите AI Toolkit Agent Builder за тестирање сервера са [овим захтевом](../../../../../../../../../../../open_prompt_builder). Сервер ће бити аутоматски повезан са Agent Builder-ом.<br>3. Кликните `Run` да бисте тестирали сервер са захтевом. |
| MCP Inspector | Отклањање грешака MCP сервера коришћењем MCP Inspector-а. | 1. Инсталирајте [Node.js](https://nodejs.org/)<br> 2. Подесите Inspector: `cd inspector` && `npm install` <br> 3. Отворите панел за отклањање у VS Code-у. Изаберите `Debug SSE in Inspector (Edge)` или `Debug SSE in Inspector (Chrome)`. Притисните F5 за покретање отклањања грешака.<br> 4. Када MCP Inspector буде покренут у прегледачу, кликните на дугме `Connect` да повежете овај MCP сервер.<br> 5. Након тога можете `List Tools`, изабрати алат, унети параметре и `Run Tool` за отклањање грешака кода сервера.<br> |

## Подразумевани портови и прилагођавања

| Режим отклањања | Портови | Дефиниције | Прилагођавања | Напомена |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Уредите [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) да бисте променили наведене портове. | N/A |
| MCP Inspector | 3001 (сервер); 5173 и 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Уредите [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) да бисте променили наведене портове.| N/A |

## Повратне информације

Уколико имате било какве повратне информације или предлоге за овај шаблон, молимо вас отворите issue на [AI Toolkit GitHub репозиторијуму](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Одрицање од одговорности**:
Овај документ је преведен коришћењем АИ услуге за превођење [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо прецизности, молимо имајте у виду да аутоматизовани преводи могу садржати грешке или нетачности. Изворни документ на његовом оригиналном језику треба сматрати ауторитетом. За критичне информације препоручује се професионални људски превод. Не сносимо одговорност за било каква погрешна тумачења или неспоразуме који проистекну из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->