# Weather MCP Server

Это пример MCP сервера на Python, реализующего инструменты погоды с моделируемыми ответами. Он может использоваться как основа для вашего собственного MCP сервера. Включает следующие возможности:

- **Инструмент погоды**: инструмент, который предоставляет моделируемую информацию о погоде на основе заданного местоположения.
- **Подключение к Agent Builder**: функция, позволяющая подключить MCP сервер к Agent Builder для тестирования и отладки.
- **Отладка в [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: функция, позволяющая отлаживать MCP сервер с помощью MCP Inspector.

## Начало работы с шаблоном Weather MCP Server

> **Требования**
>
> Для запуска MCP сервера на вашей локальной машине разработки потребуется:
>
> - [Python](https://www.python.org/)
> - (*Необязательно - если предпочитаете uv*) [uv](https://github.com/astral-sh/uv)
> - [Расширение отладчика Python](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Подготовка окружения

Существует два способа настройки окружения для этого проекта. Вы можете выбрать любой из них в зависимости от своих предпочтений.

> Примечание: Перезагрузите VSCode или терминал, чтобы убедиться, что используется python из виртуального окружения после его создания.

| Подход | Шаги |
| -------- | ----- |
| Использование `uv` | 1. Создайте виртуальное окружение: `uv venv` <br>2. Выполните команду VSCode "***Python: Select Interpreter***" и выберите python из созданного виртуального окружения <br>3. Установите зависимости (включая dev зависимости): `uv pip install -r pyproject.toml --extra dev` |
| Использование `pip` | 1. Создайте виртуальное окружение: `python -m venv .venv` <br>2. Выполните команду VSCode "***Python: Select Interpreter***" и выберите python из созданного виртуального окружения<br>3. Установите зависимости (включая dev зависимости): `pip install -e .[dev]` | 

После настройки окружения вы можете запустить сервер локально через Agent Builder в качестве MCP клиента для начала работы:
1. Откройте панель отладки VS Code. Выберите `Debug in Agent Builder` или нажмите `F5` для запуска отладки MCP сервера.
2. Используйте AI Toolkit Agent Builder для тестирования сервера с [этим запросом](../../../../../../../../../../../open_prompt_builder). Сервер автоматически подключится к Agent Builder.
3. Нажмите `Run` для тестирования сервера с запросом.

**Поздравляем**! Вы успешно запустили Weather MCP Server локально через Agent Builder в качестве MCP клиента.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Что входит в шаблон

| Папка / Файл| Содержимое                                  |
| ------------ | -------------------------------------------- |
| `.vscode`    | Файлы VSCode для отладки                    |
| `.aitk`      | Конфигурации для AI Toolkit                  |
| `src`        | Исходный код MCP сервера погоды              |

## Как отлаживать Weather MCP Server

> Примечания:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) — визуальный инструмент разработчика для тестирования и отладки MCP серверов.
> - Все режимы отладки поддерживают точки останова, поэтому вы можете добавлять точки останова в код реализации инструментов.

| Режим отладки | Описание | Шаги для отладки |
| ---------- | ----------- | --------------- |
| Agent Builder | Отладка MCP сервера в Agent Builder через AI Toolkit. | 1. Откройте панель отладки VS Code. Выберите `Debug in Agent Builder` и нажмите `F5` для запуска отладки MCP сервера.<br>2. Используйте AI Toolkit Agent Builder для теста сервера с [этим запросом](../../../../../../../../../../../open_prompt_builder). Сервер автоматически подключится к Agent Builder.<br>3. Нажмите `Run` для тестирования с запросом. |
| MCP Inspector | Отладка MCP сервера с помощью MCP Inspector. | 1. Установите [Node.js](https://nodejs.org/)<br> 2. Настройте Inspector: `cd inspector` && `npm install` <br> 3. Откройте панель отладки VS Code. Выберите `Debug SSE in Inspector (Edge)` или `Debug SSE in Inspector (Chrome)`. Нажмите F5 для запуска отладки.<br> 4. Когда MCP Inspector откроется в браузере, нажмите кнопку `Connect` для подключения этого MCP сервера.<br> 5. Затем вы можете `List Tools`, выбрать инструмент, ввести параметры и `Run Tool` для отладки кода сервера.<br> |

## Стандартные порты и настройка

| Режим отладки | Порты | Определения | Настройки | Примечание |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Редактируйте [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), чтобы изменить указанные порты. | Нет |
| MCP Inspector | 3001 (Сервер); 5173 и 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Редактируйте [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), чтобы изменить указанные порты.| Нет |

## Обратная связь

Если у вас есть отзывы или предложения по этому шаблону, пожалуйста, откройте issue в репозитории [AI Toolkit GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:  
Данный документ был переведен с помощью автоматического сервиса перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на то, что мы стремимся к точности, имейте в виду, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на исходном языке следует считать авторитетным источником. Для получения критически важной информации рекомендуется использовать профессиональный человеческий перевод. Мы не несем ответственности за любые недоразумения или неправильные толкования, возникшие в результате использования данного перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->