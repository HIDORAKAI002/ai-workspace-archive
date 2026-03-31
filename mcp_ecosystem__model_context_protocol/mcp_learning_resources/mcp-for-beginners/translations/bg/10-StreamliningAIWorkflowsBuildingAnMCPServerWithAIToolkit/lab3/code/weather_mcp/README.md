# Weather MCP Server

Това е примерен MCP сървър на Python, който имплементира инструменти за времето с примерни отговори. Може да се използва като основа за ваш собствен MCP сървър. Включва следните функции:

- **Weather Tool**: Инструмент, който предоставя симулирана информация за времето въз основа на дадено местоположение.
- **Свързване с Agent Builder**: Функция, която ви позволява да свържете MCP сървъра към Agent Builder за тестване и отстраняване на грешки.
- **Отстраняване на грешки в [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Функция, която ви позволява да отстранявате грешки в MCP сървъра чрез MCP Inspector.

## Започнете с шаблона Weather MCP Server

> **Изисквания**
>
> За да стартирате MCP сървъра на вашия локален компютър, ще ви е необходимо:
>
> - [Python](https://www.python.org/)
> - (*По избор - ако предпочитате uv*) [uv](https://github.com/astral-sh/uv)
> - [Разширение за Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Подготовка на околната среда

Имате две възможности за настройка на околната среда за този проект. Можете да изберете която и да е според вашите предпочитания.

> Забележка: Рестартирайте VSCode или терминала, за да се уверите, че се използва Python от виртуалната среда след създаването ѝ.

| Начин    | Стъпки |
| -------- | ----- |
| Използване на `uv` | 1. Създайте виртуална среда: `uv venv` <br>2. Стартирайте командата на VSCode "***Python: Select Interpreter***" и изберете Python от създадената виртуална среда <br>3. Инсталирайте зависимости (включително dev зависимости): `uv pip install -r pyproject.toml --extra dev` |
| Използване на `pip` | 1. Създайте виртуална среда: `python -m venv .venv` <br>2. Стартирайте командата на VSCode "***Python: Select Interpreter***" и изберете Python от създадената виртуална среда<br>3. Инсталирайте зависимости (включително dev зависимости): `pip install -e .[dev]` |

След като настроите околната среда, можете да стартирате сървъра на вашия локален компютър чрез Agent Builder като MCP клиент, за да започнете:
1. Отворете панела за отстраняване на грешки в VS Code. Изберете `Debug in Agent Builder` или натиснете `F5`, за да започнете отстраняване на грешки в MCP сървъра.
2. Използвайте AI Toolkit Agent Builder, за да тествате сървъра с [този подсказ](../../../../../../../../../../../open_prompt_builder). Сървърът ще се свърже автоматично с Agent Builder.
3. Натиснете `Run`, за да тествате сървъра с подсказа.

**Поздравления**! Успешно стартирахте Weather MCP Server на вашия локален компютър чрез Agent Builder като MCP клиент.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Какво включва шаблонът

| Папка / Файл| Съдржание                                  |
| ------------ | -------------------------------------------- |
| `.vscode`    | Файлове за отстраняване на грешки във VSCode |
| `.aitk`      | Конфигурации за AI Toolkit                   |
| `src`        | Изходен код за weather mcp сървъра           |

## Как да отстранявате грешки в Weather MCP Server

> Бележки:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) е визуален разработващ инструмент за тестване и отстраняване на грешки на MCP сървъри.
> - Всички режими за отстраняване на грешки поддържат точки на прекъсване (breakpoints), така че можете да добавите точки на прекъсване в кода на инструментите.

| Режим за отстраняване на грешки | Описание | Стъпки за отстраняване на грешки |
| ---------- | ----------- | --------------- |
| Agent Builder | Отстраняване на грешки в MCP сървъра в Agent Builder чрез AI Toolkit. | 1. Отворете панела за отстраняване на грешки на VS Code. Изберете `Debug in Agent Builder` и натиснете `F5`, за да започнете отстраняване на грешки в MCP сървъра.<br>2. Използвайте AI Toolkit Agent Builder, за да тествате сървъра с [този подсказ](../../../../../../../../../../../open_prompt_builder). Сървърът ще бъде автоматично свързан с Agent Builder.<br>3. Кликнете `Run`, за да тествате сървъра с подсказа. |
| MCP Inspector | Отстраняване на грешки в MCP сървъра чрез MCP Inspector. | 1. Инсталирайте [Node.js](https://nodejs.org/)<br> 2. Настройте Inspector: `cd inspector` && `npm install` <br> 3. Отворете панела за отстраняване на грешки на VS Code. Изберете `Debug SSE in Inspector (Edge)` или `Debug SSE in Inspector (Chrome)`. Натиснете F5, за да започнете отстраняване на грешки.<br> 4. Когато MCP Inspector се стартира в браузъра, натиснете бутона `Connect`, за да свържете този MCP сървър.<br> 5. След това можете да `List Tools`, изберете инструмент, въведете параметри и `Run Tool`, за да отстранявате грешки в кода на сървъра.<br> |

## По подразбиране портове и персонализации

| Режим за отстраняване на грешки | Портове | Определения | Персонализации | Забележка |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Редактирайте [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), за да промените посочените портове. | Няма |
| MCP Inspector | 3001 (сървър); 5173 и 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Редактирайте [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), за да промените посочените портове.| Няма |

## Обратна връзка

Ако имате обратна връзка или предложения за този шаблон, моля, отворете issue в [AI Toolkit GitHub репозитория](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:  
Този документ е преведен с помощта на AI преводаческа услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля, имайте предвид, че автоматизираните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия роден език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален превод от човешки преводач. Не носим отговорност за каквито и да е недоразумения или неправилни тълкувания, възникнали от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->