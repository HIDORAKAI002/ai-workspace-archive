# Weather MCP Server

Ово је пример MCP сервера у Питону који имплементира алате за време са симулираним одговорима. Може се користити као основа за ваш сопствени MCP сервер. Укључује следеће функције:

- **Алат за време**: Алат који пружа симулиране информације о времену на основу дате локације.
- **Алат за клонирање Git репозиторијума**: Алат који клонира git репозиторијум у назначену фасциклу.
- **Алат за отварање у VS Code**: Алат који отвара фасциклу у VS Code или VS Code Insiders.
- **Повезивање са Agent Builder-ом**: Функција која вам омогућава да повежете MCP сервер са Agent Builder-ом за тестирање и дебаговање.
- **Дебаговање у [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Функција која вам омогућава да дебагујете MCP сервер користећи MCP Inspector.

## Почетак рада са Weather MCP Server шаблоном

> **Услови**
>
> Да бисте покренули MCP сервер на вашем локалном рачунару за развој, потребно вам је:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (потребно за алат git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) или [VS Code Insiders](https://code.visualstudio.com/insiders/) (потребно за алат open_in_vscode)
> - (*Опционално - ако користите uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Припрема окружења

Постоје два приступа за подешавање окружења за овај пројекат. Можете изабрати било који у зависности од ваших преференци.

> Напомена: Поново учитајте VSCode или терминал да бисте били сигурни да се користи python из виртуелног окружења након његовог креирања.

| Приступ | Кораци |
| -------- | ----- |
| Коришћење `uv` | 1. Креирајте виртуелно окружење: `uv venv` <br>2. Покрените VSCode команду "***Python: Select Interpreter***" и изаберите python из креираног виртуелног окружења <br>3. Инсталирајте зависности (укључујући зависности за развој): `uv pip install -r pyproject.toml --extra dev` |
| Коришћење `pip` | 1. Креирајте виртуелно окружење: `python -m venv .venv` <br>2. Покрените VSCode команду "***Python: Select Interpreter***" и изаберите python из креираног виртуелног окружења<br>3. Инсталирајте зависности (укључујући зависности за развој): `pip install -e .[dev]` |

Након подешавања окружења, можете покренути сервер на вашем локалном рачунару путем Agent Builder-а као MCP клијента:
1. Отворите VS Code Debug панел. Изаберите `Debug in Agent Builder` или притисните `F5` да покренете дебаговање MCP сервера.
2. Користите AI Toolkit Agent Builder да тестирате сервер са [овим упитом](../../../../../../../../../../../open_prompt_builder). Сервер ће се аутоматски повезати са Agent Builder-ом.
3. Кликните `Run` да тестирате сервер са упитом.

**Честитамо**! Успешно сте покренули Weather MCP Server на вашем локалном рачунару путем Agent Builder-а као MCP клијента.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Шта је укључено у шаблон

| Фасцикла / Датотека | Садржај                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | Фајлови за дебаговање у VSCode               |
| `.aitk`      | Конфигурације за AI Toolkit                   |
| `src`        | Изворни код за weather mcp сервер            |

## Како дебаговати Weather MCP Server

> Напомене:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) је визуелни алат за развој и дебаговање MCP сервера.
> - Сви режими дебаговања подржавају прекиде (breakpoints), тако да можете додавати прекиде у коду алата.

## Доступни алати

### Алат за време
Алат `get_weather` пружа симулиране информације о времену за назначену локацију.

| Параметар | Тип | Опис |
| --------- | ---- | ----------- |
| `location` | string | Локација за коју се добија време (нпр. назив града, држава или координате) |

### Алат за клонирање Git репозиторијума
Алат `git_clone_repo` клонира git репозиторијум у назначену фасциклу.

| Параметар | Тип | Опис |
| --------- | ---- | ----------- |
| `repo_url` | string | URL git репозиторијума који се клонира |
| `target_folder` | string | Путања до фасцикле у коју треба да се клонира репозиторијум |

Алат враћа JSON објекат са:
- `success`: Бул који означава да ли је операција била успешна
- `target_folder` или `error`: Путања до клонираног репозиторијума или порука о грешци

### Алат за отварање у VS Code
Алат `open_in_vscode` отвара фасциклу у VS Code или VS Code Insiders апликацији.

| Параметар | Тип | Опис |
| --------- | ---- | ----------- |
| `folder_path` | string | Путања до фасцикле која се отвара |
| `use_insiders` | boolean (опционо) | Да ли да користи VS Code Insiders уместо обичног VS Code-a |

Алат враћа JSON објекат са:
- `success`: Бул који означава да ли је операција била успешна
- `message` или `error`: Потврдна порука или порука о грешци

| Режим дебаговања | Опис | Кораци за дебаговање |
| ---------- | ----------- | --------------- |
| Agent Builder | Дебагује MCP сервер у Agent Builder-у преко AI Toolkit-а. | 1. Отворите VS Code Debug панел. Изаберите `Debug in Agent Builder` и притисните `F5` да започнете дебаговање MCP сервера.<br>2. Користите AI Toolkit Agent Builder да тестирате сервер са [овим упитом](../../../../../../../../../../../open_prompt_builder). Сервер ће бити аутоматски повезан са Agent Builder-ом.<br>3. Кликните `Run` да тестирате сервер са упитом. |
| MCP Inspector | Дебагује MCP сервер користећи MCP Inspector. | 1. Инсталирајте [Node.js](https://nodejs.org/)<br> 2. Подесите Inspector: `cd inspector` && `npm install` <br> 3. Отворите VS Code Debug панел. Изаберите `Debug SSE in Inspector (Edge)` или `Debug SSE in Inspector (Chrome)`. Притисните F5 за почетак дебаговања.<br> 4. Када се MCP Inspector отвори у прегледачу, кликните на дугме `Connect` да бисте повезали овај MCP сервер.<br> 5. Затим можете `List Tools`, изабрати алат, унети параметре и `Run Tool` да дебагујете код свог сервера.<br> |

## Подразумевани портови и прилагођавања

| Режим дебаговања | Портови | Дефиниције | Прилагођавања | Напомена |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Измените [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) да промените наведене портове. | Н/А |
| MCP Inspector | 3001 (сервер); 5173 и 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Измените [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) да промените наведене портове.| Н/А |

## Повратне информације

Ако имате било какве повратне информације или предлоге у вези овог шаблона, молимо вас да отворите issue на [AI Toolkit GitHub репозиторијуму](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Одрицање одговорности**:
Овај документ је преведен уз помоћ АИ сервиса за превођење [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо прецизности, молимо вас да имате у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитетним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из употребе овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->