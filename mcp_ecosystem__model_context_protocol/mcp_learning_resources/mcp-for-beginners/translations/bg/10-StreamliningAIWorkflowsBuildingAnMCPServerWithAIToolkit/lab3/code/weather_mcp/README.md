# Weather MCP Server

Това е примерен MCP сървър на Python, който реализира инструменти за времето с имитирани отговори. Може да се използва като структура за ваш собствен MCP сървър. Включва следните функции:

- **Инструмент за време**: Инструмент, който предоставя имитирана информация за времето базирана на даденото местоположение.
- **Свързване с Agent Builder**: Функция, която позволява да свържете MCP сървъра с Agent Builder за тест и отстраняване на грешки.
- **Отстраняване на грешки в [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Функция, която позволява да отстранявате грешки в MCP сървъра с помощта на MCP Inspector.

## Започване с шаблона Weather MCP Server

> **Изисквания**
>
> За да стартирате MCP сървъра на локалната си машина за разработка, ще ви трябва:
>
> - [Python](https://www.python.org/)
> - (*По избор - ако предпочитате uv*) [uv](https://github.com/astral-sh/uv)
> - [Разширение за отстраняване на грешки в Python](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Подготовка на средата

Има два подхода за настройка на средата за този проект. Можете да изберете някой от тях според предпочитанията си.

> Забележка: Презаредете VSCode или терминала, за да сте сигурни, че се използва python на виртуалната среда след нейното създаване.

| Подход | Стъпки |
| -------- | ----- |
| Използване на `uv` | 1. Създайте виртуална среда: `uv venv` <br>2. Стартирайте командата в VSCode "***Python: Select Interpreter***" и изберете python-а от създадената виртуална среда <br>3. Инсталирайте зависимостите (вкл. dev зависимости): `uv pip install -r pyproject.toml --extra dev` |
| Използване на `pip` | 1. Създайте виртуална среда: `python -m venv .venv` <br>2. Стартирайте командата в VSCode "***Python: Select Interpreter***" и изберете python-а от създадената виртуална среда<br>3. Инсталирайте зависимостите (вкл. dev зависимости): `pip install -e .[dev]` |

След като настроите средата, можете да стартирате сървъра на локалната си машина за разработка чрез Agent Builder като MCP клиент, за да започнете:
1. Отворете панела за отстраняване на грешки във VS Code. Изберете `Debug in Agent Builder` или натиснете `F5`, за да започнете отстраняване на грешки на MCP сървъра.
2. Използвайте Microsoft Foundry Toolkit Agent Builder, за да тествате сървъра с [този prompt](../../../../../../../../../../../open_prompt_builder). Сървърът автоматично ще бъде свързан с Agent Builder.
3. Натиснете `Run`, за да тествате сървъра с prompt-а.

**Поздравления**! Успешно стартирахте Weather MCP Server на локалната си машина за разработка чрез Agent Builder като MCP клиент.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Какво съдържа шаблона

| Папка / Файл | Съдържание                                  |
| ------------ | -------------------------------------------- |
| `.vscode`    | Файлове за VSCode, свързани с отстраняване на грешки                  |
| `.aitk`      | Конфигурации за Microsoft Foundry Toolkit                  |
| `src`        | Изходния код на weather mcp сървъра           |

## Как да отстранявате грешки в Weather MCP Server

> Забележки:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) е визуален инструмент за разработчици за тестване и отстраняване на грешки в MCP сървъри.
> - Всички режими за отстраняване на грешки поддържат прекъсвания, така че можете да добавяте прекъсвания в кода за реализация на инструмента.

| Режим за отстраняване на грешки | Описание | Стъпки за отстраняване на грешки |
| ---------- | ----------- | --------------- |
| Agent Builder | Отстраняване на грешки на MCP сървъра в Agent Builder чрез Microsoft Foundry Toolkit. | 1. Отворете панела за отстраняване на грешки във VS Code. Изберете `Debug in Agent Builder` и натиснете `F5`, за да започнете отстраняване на грешки на MCP сървъра.<br>2. Използвайте Microsoft Foundry Toolkit Agent Builder, за да тествате сървъра с [този prompt](../../../../../../../../../../../open_prompt_builder). Сървърът автоматично ще бъде свързан с Agent Builder.<br>3. Натиснете `Run`, за да тествате сървъра с prompt-а. |
| MCP Inspector | Отстраняване на грешки на MCP сървъра чрез MCP Inspector. | 1. Инсталирайте [Node.js](https://nodejs.org/)<br> 2. Настройте Inspector: `cd inspector` && `npm install` <br> 3. Отворете панела за отстраняване на грешки във VS Code. Изберете `Debug SSE in Inspector (Edge)` или `Debug SSE in Inspector (Chrome)`. Натиснете F5, за да започнете отстраняване на грешки.<br> 4. Когато MCP Inspector се стартира в браузъра, щракнете върху бутона `Connect`, за да свържете този MCP сървър.<br> 5. След това можете да `List Tools`, изберете инструмент, въведете параметри и `Run Tool`, за да отстраните грешки в кода на сървъра.<br> |

## По подразбиране портове и персонализации

| Режим за отстраняване на грешки | Портове | Дефиниции | Персонализации | Забележка |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Редактирайте [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), за да смените горните портове. | Няма |
| MCP Inspector | 3001 (Сървър); 5173 и 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Редактирайте [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), за да смените горните портове. | Няма |

## Обратна връзка

Ако имате обратна връзка или предложения за този шаблон, моля, отворете issue в [Microsoft Foundry Toolkit GitHub хранилището](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:
Този документ е преведен с помощта на AI преводачески услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля имайте предвид, че автоматизираните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия роден език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Ние не носим отговорност за каквито и да е недоразумения или неправилни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->