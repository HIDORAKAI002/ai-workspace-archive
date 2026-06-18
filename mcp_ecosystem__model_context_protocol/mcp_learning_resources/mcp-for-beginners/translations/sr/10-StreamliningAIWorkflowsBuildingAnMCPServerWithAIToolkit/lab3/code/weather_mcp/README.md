# Weather MCP Server

Ово је пример MCP сервера у Питону који имплементира алатке за временску прогнозу са лажним одговорима. Може се користити као основа за ваш сопствени MCP сервер. Укључује следеће карактеристике:

- **Алат за време**: Алат који пружа лажне информације о времену на основу дате локације.
- **Повезивање са Agent Builder-ом**: Карактеристика која вам омогућава да повежете MCP сервер са Agent Builder-ом ради тестирања и отклањања грешака.
- **Откривање грешака у [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Карактеристика која вам омогућава да отклањате грешке у MCP серверу помоћу MCP Inspectora.

## Започните са Weather MCP Server шаблоном

> **Услови**
>
> Да бисте покренули MCP сервер на свом локалном развојном рачунару, биће вам потребно:
>
> - [Python](https://www.python.org/)
> - (*Опционо - ако преферирате uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Припрема окружења

Постоје два приступа за подешавање окружења за овај пројекат. Можете одабрати било који према својој жељи.

> Напомена: Поново учитајте VSCode или терминал како бисте осигурали употребу питхона из виртуелног окружења након његовог креирања.

| Приступ | Кораци |
| -------- | ----- |
| Користећи `uv` | 1. Креирајте виртуелно окружење: `uv venv` <br>2. Покрените VSCode команду "***Python: Select Interpreter***" и изаберите питхон из креираног виртуелног окружења <br>3. Инсталирајте зависности (укључујући dev зависности): `uv pip install -r pyproject.toml --extra dev` |
| Користећи `pip` | 1. Креирајте виртуелно окружење: `python -m venv .venv` <br>2. Покрените VSCode команду "***Python: Select Interpreter***" и изаберите питхон из креираног виртуелног окружења<br>3. Инсталирајте зависности (укључујући dev зависности): `pip install -e .[dev]` | 

Након подешавања окружења, можете покренути сервер на свом локалном развојном рачунару преко Agent Builder-а као MCP клијента да бисте започели:
1. Отворите VS Code Debug панел. Одаберите `Debug in Agent Builder` или притисните `F5` да започнете отклањање грешака MCP сервера.
2. Користите Microsoft Foundry Toolkit Agent Builder да тестирате сервер са [овим упитом](../../../../../../../../../../../open_prompt_builder). Сервер ће бити аутоматски повезан са Agent Builder-ом.
3. Кликните `Run` да тестирате сервер са упитом.

**Честитамо**! Успешно сте покренули Weather MCP Server на свом локалном развојном рачунару преко Agent Builder-а као MCP клијента.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Шта шаблон садржи

| Фолдер / Фајл| Садржај                                    |
| ------------ | ----------------------------------------- |
| `.vscode`    | VSCode фајлови за отклањање грешака       |
| `.aitk`      | Конфигурације за Microsoft Foundry Toolkit |
| `src`        | Изворни код за weather mcp сервер         |

## Како отклањати грешке у Weather MCP Server-у

> Напомене:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) је визуелни алат за развојне програмере за тестирање и отклањање грешака MCP сервера.
> - Сви режими отклањања подржавају прекиде (breakpoints), тако да можете додавати прекиде у коду реализације алата.

| Режим отклањања | Опис | Кораци за отклањање грешака |
| ---------- | ----------- | --------------- |
| Agent Builder | Отклањање грешака MCP сервера у Agent Builder-у преко Microsoft Foundry Toolkit-а. | 1. Отворите VS Code Debug панел. Одаберите `Debug in Agent Builder` и притисните `F5` да започнете отклањање грешака MCP сервера.<br>2. Користите Microsoft Foundry Toolkit Agent Builder да тестирате сервер са [овим упитом](../../../../../../../../../../../open_prompt_builder). Сервер ће бити аутоматски повезан са Agent Builder-ом.<br>3. Кликните `Run` да тестирате сервер са упитом. |
| MCP Inspector | Отклањање грешака MCP сервера помоћу MCP Inspectora. | 1. Инсталирајте [Node.js](https://nodejs.org/)<br> 2. Подесите Inspector: `cd inspector` && `npm install` <br> 3. Отворите VS Code Debug панел. Одаберите `Debug SSE in Inspector (Edge)` или `Debug SSE in Inspector (Chrome)`. Притисните F5 да започнете отклањање.<br> 4. Када MCP Inspector буде покренут у прегледачу, кликните на дугме `Connect` да повежете овај MCP сервер.<br> 5. Затим можете `List Tools`, одабрати алат, унети параметре и `Run Tool` за отклањање грешака у коду сервера.<br> |

## Подразумевани портови и прилагођавања

| Режим отклањања | Портови | Фајлови за дефинисање | Прилагођавања | Напомена |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Уредите [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) да промените портове. | N/A |
| MCP Inspector | 3001 (сервер); 5173 и 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Уредите [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) да промените портове.| N/A |

## Повратне информације

Ако имате било какве повратне информације или предлоге за овај шаблон, молимо отворите issue у [Microsoft Foundry Toolkit GitHub репозиторијуму](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->