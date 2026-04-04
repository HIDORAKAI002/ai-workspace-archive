# Weather MCP сървър

Това е примерен MCP сървър на Python, който имплементира инструменти за времето с имитиращи (mock) отговори. Може да се използва като основа за ваш собствен MCP сървър. Включва следните функции:

- **Инструмент за времето**: Инструмент, който предоставя имитирана информация за времето въз основа на дадено място.
- **Инструмент за Git Clone**: Инструмент, който клонира git репозитория в определена папка.
- **Инструмент за отваряне във VS Code**: Инструмент, който отваря папка във VS Code или VS Code Insiders.
- **Свързване към Agent Builder**: Функция, която позволява да свържете MCP сървъра към Agent Builder за тестване и отстраняване на грешки.
- **Отстраняване на грешки в [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Функция, която позволява да отстранявате грешки в MCP сървъра, използвайки MCP Inspector.

## Започване с Weather MCP Server шаблона

> **Предварителни условия**
>
> За да стартирате MCP сървъра на вашата локална машина за разработка, ще ви трябват:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (необходимо за инструмента git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) или [VS Code Insiders](https://code.visualstudio.com/insiders/) (необходимо за инструмента open_in_vscode)
> - (*По избор - ако предпочитате uv*) [uv](https://github.com/astral-sh/uv)
> - [Разширение за отстраняване на грешки в Python](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Подготовка на средата

Има два начина за настройване на средата за този проект. Изберете този, който предпочитате.

> Забележка: Рестартирайте VSCode или терминала, за да сте сигурни, че се използва python от виртуалната среда след създаването ѝ.

| Метод | Стъпки |
| -------- | ----- |
| Използване на `uv` | 1. Създайте виртуална среда: `uv venv` <br>2. Стартирайте командата на VSCode "***Python: Select Interpreter***" и изберете python от създадената виртуална среда <br>3. Инсталирайте зависимостите (включително dev зависимости): `uv pip install -r pyproject.toml --extra dev` |
| Използване на `pip` | 1. Създайте виртуална среда: `python -m venv .venv` <br>2. Стартирайте командата на VSCode "***Python: Select Interpreter***" и изберете python от създадената виртуална среда<br>3. Инсталирайте зависимостите (включително dev зависимости): `pip install -e .[dev]` |

След настройката на средата, може да стартирате сървъра на вашата локална машина за разработка чрез Agent Builder като MCP клиента, за да започнете:
1. Отворете Debug панела във VS Code. Изберете `Debug in Agent Builder` или натиснете `F5`, за да започнете отстраняване на грешки в MCP сървъра.
2. Използвайте AI Toolkit Agent Builder, за да тествате сървъра с [този промпт](../../../../../../../../../../../open_prompt_builder). Сървърът ще се свърже автоматично с Agent Builder.
3. Натиснете `Run`, за да тествате сървъра с промпта.

**Поздравления**! Успешно стартирахте Weather MCP сървъра на вашата локална машина за разработка чрез Agent Builder като MCP клиент.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Какво е включено в шаблона

| Папка / Файл | Съдържание                          |
| ------------ | ----------------------------------- |
| `.vscode`    | Файлове за VSCode за отстраняване на грешки |
| `.aitk`      | Конфигурации за AI Toolkit          |
| `src`        | Изходен код за Weather MCP сървъра  |

## Как да отстранявате грешки в Weather MCP сървъра

> Забележки:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) е визуален инструмент за разработчици за тестване и отстраняване на грешки в MCP сървъри.
> - Всички режими на отстраняване на грешки поддържат точки на прекъсване, така че може да добавяте точки на прекъсване в имплементационния код на инструмента.

## Налични инструменти

### Инструмент за времето
Инструментът `get_weather` предоставя имитирана информация за времето за посочено място.

| Параметър | Тип | Описание |
| --------- | ---- | ----------- |
| `location` | string | Местоположение за получаване на информация за времето (например име на град, щат или координати) |

### Инструмент за Git Clone
Инструментът `git_clone_repo` клонира git репозитория в посочена папка.

| Параметър | Тип | Описание |
| --------- | ---- | ----------- |
| `repo_url` | string | URL на git репозитория, който да се клонира |
| `target_folder` | string | Път до папката, където да се клонира репозитория |

Инструментът връща JSON обект с:
- `success`: Булева стойност, индикираща дали операцията е успешна
- `target_folder` или `error`: Пътя на клонирания репозитория или съобщение за грешка

### Инструмент за отваряне във VS Code
Инструментът `open_in_vscode` отваря папка във VS Code или VS Code Insiders.

| Параметър | Тип | Описание |
| --------- | ---- | ----------- |
| `folder_path` | string | Път до папката, която да бъде отворена |
| `use_insiders` | boolean (по желание) | Дали да се използва VS Code Insiders вместо редовния VS Code |

Инструментът връща JSON обект с:
- `success`: Булева стойност, индикираща дали операцията е успешна
- `message` или `error`: Потвърждение или съобщение за грешка

| Режим на отстраняване на грешки | Описание | Стъпки за отстраняване на грешки |
| ---------- | ----------- | --------------- |
| Agent Builder | Отстраняване на грешки на MCP сървъра в Agent Builder чрез AI Toolkit. | 1. Отворете Debug панела на VS Code. Изберете `Debug in Agent Builder` и натиснете `F5`, за да започнете отстраняване на грешки в MCP сървъра.<br>2. Използвайте AI Toolkit Agent Builder, за да тествате сървъра с [този промпт](../../../../../../../../../../../open_prompt_builder). Сървърът ще се свърже автоматично с Agent Builder.<br>3. Натиснете `Run`, за да тествате сървъра с промпта. |
| MCP Inspector | Отстраняване на грешки на MCP сървъра с MCP Inspector. | 1. Инсталирайте [Node.js](https://nodejs.org/)<br> 2. Настройте Inspector: `cd inspector` && `npm install` <br> 3. Отворете Debug панела във VS Code. Изберете `Debug SSE in Inspector (Edge)` или `Debug SSE in Inspector (Chrome)`. Натиснете F5, за да започнете отстраняване на грешки.<br> 4. Когато MCP Inspector се стартира в браузъра, натиснете бутона `Connect`, за да свържете този MCP сървър.<br> 5. След това можете да `List Tools`, да изберете инструмент, да въведете параметри и да `Run Tool`, за да отстранявате грешки в кода на сървъра.<br> |

## Стандартни портове и персонализации

| Режим на отстраняване на грешки | Портове | Дефиниции | Персонализации | Забележка |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Редактирайте [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json), за да промените горните портове. | Няма |
| MCP Inspector | 3001 (сървър); 5173 и 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Редактирайте [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json), за да промените горните портове.| Няма |

## Обратна връзка

Ако имате обратна връзка или предложения за този шаблон, моля, отворете issue в [GitHub репозиториято на AI Toolkit](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:  
Този документ е преведен с помощта на AI преводаческа услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля, имайте предвид, че автоматизираните преводи може да съдържат грешки или неточности. Оригиналният документ на неговия роден език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Не носим отговорност за каквито и да било недоразумения или неправилни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->