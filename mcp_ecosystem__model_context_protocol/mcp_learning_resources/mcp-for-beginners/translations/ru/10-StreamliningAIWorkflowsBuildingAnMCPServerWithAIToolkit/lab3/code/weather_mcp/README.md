# Weather MCP Server

Это пример MCP-сервера на Python, реализующего инструменты погоды с имитацией ответов. Его можно использовать как основу для собственного MCP-сервера. Включает следующие функции:

- **Инструмент погоды**: инструмент, который предоставляет имитированные сведения о погоде на основе указанного местоположения.
- **Подключение к Agent Builder**: функция, которая позволяет подключить MCP-сервер к Agent Builder для тестирования и отладки.
- **Отладка в [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: функция, которая позволяет отлаживать MCP-сервер с помощью MCP Inspector.

## Начало работы с шаблоном Weather MCP Server

> **Требования**
>
> Для запуска MCP-сервера на локальной машине разработчика вам потребуется:
>
> - [Python](https://www.python.org/)
> - (*необязательно — если вы предпочитаете uv*) [uv](https://github.com/astral-sh/uv)
> - [Расширение Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Подготовка окружения

Существует два подхода для настройки окружения для этого проекта. Вы можете выбрать любой из них по вашему усмотрению.

> Примечание: Перезагрузите VSCode или терминал, чтобы убедиться, что используется Python виртуального окружения после его создания.

| Подход | Шаги |
| -------- | ----- |
| Использование `uv` | 1. Создайте виртуальное окружение: `uv venv` <br>2. Выполните команду VSCode "***Python: Select Interpreter***" и выберите Python из созданного виртуального окружения <br>3. Установите зависимости (включая dev-зависимости): `uv pip install -r pyproject.toml --extra dev` |
| Использование `pip` | 1. Создайте виртуальное окружение: `python -m venv .venv` <br>2. Выполните команду VSCode "***Python: Select Interpreter***" и выберите Python из созданного виртуального окружения<br>3. Установите зависимости (включая dev-зависимости): `pip install -e .[dev]` |

После настройки окружения вы можете запустить сервер на своей локальной машине разработчика через Agent Builder в качестве MCP-клиента, чтобы начать работу:
1. Откройте панель отладки VS Code. Выберите `Debug in Agent Builder` или нажмите `F5` для запуска отладки MCP-сервера.
2. Используйте Microsoft Foundry Toolkit Agent Builder для тестирования сервера с [этим запросом](../../../../../../../../../../../open_prompt_builder). Сервер будет автоматически подключен к Agent Builder.
3. Нажмите `Run`, чтобы протестировать сервер с запросом.

**Поздравляем**! Вы успешно запустили Weather MCP Server на своей локальной машине разработчика через Agent Builder в качестве MCP-клиента.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Что входит в шаблон

| Папка / Файл | Содержимое                                     |
| ------------ | ---------------------------------------------- |
| `.vscode`    | Файлы VSCode для отладки                        |
| `.aitk`      | Конфигурации для Microsoft Foundry Toolkit     |
| `src`        | Исходный код сервера погоды MCP                 |

## Как отлаживать Weather MCP Server

> Примечания:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) — это визуальный инструмент разработчика для тестирования и отладки MCP-серверов.
> - Все режимы отладки поддерживают точки прерывания, поэтому вы можете добавить их в код реализации инструмента.

| Режим отладки | Описание | Шаги для отладки |
| ------------- | -------- | ---------------- |
| Agent Builder | Отладка MCP-сервера в Agent Builder через Microsoft Foundry Toolkit. | 1. Откройте панель отладки VS Code. Выберите `Debug in Agent Builder` и нажмите `F5` для запуска отладки MCP-сервера.<br>2. Используйте Microsoft Foundry Toolkit Agent Builder для тестирования сервера с [этим запросом](../../../../../../../../../../../open_prompt_builder). Сервер будет автоматически подключен к Agent Builder.<br>3. Нажмите `Run`, чтобы протестировать сервер с запросом. |
| MCP Inspector | Отладка MCP-сервера с использованием MCP Inspector. | 1. Установите [Node.js](https://nodejs.org/)<br> 2. Настройте Inspector: `cd inspector` && `npm install` <br> 3. Откройте панель отладки VS Code. Выберите `Debug SSE in Inspector (Edge)` или `Debug SSE in Inspector (Chrome)`. Нажмите F5 для начала отладки.<br> 4. Когда MCP Inspector запустится в браузере, нажмите кнопку `Connect` для подключения этого MCP-сервера.<br> 5. Затем вы можете `List Tools`, выбрать инструмент, ввести параметры и `Run Tool` для отладки кода сервера.<br> |

## Порты по умолчанию и настройки

| Режим отладки | Порты | Определения | Настройки | Примечание |
| ------------- | ----- | ----------- | --------- | ---------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Измените [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), чтобы изменить указанные порты. | Нет |
| MCP Inspector | 3001 (сервер); 5173 и 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Измените [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), чтобы изменить указанные порты. | Нет |

## Обратная связь

Если у вас есть отзывы или предложения по этому шаблону, пожалуйста, откройте issue в [репозитории Microsoft Foundry Toolkit на GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:
Этот документ был переведен с использованием сервиса машинного перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия по обеспечению точности, имейте в виду, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на его исходном языке следует считать авторитетным источником. Для получения критически важной информации рекомендуется обратиться к профессиональному человеческому переводу. Мы не несем ответственности за любые недоразумения или неправильные толкования, возникшие в результате использования этого перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->