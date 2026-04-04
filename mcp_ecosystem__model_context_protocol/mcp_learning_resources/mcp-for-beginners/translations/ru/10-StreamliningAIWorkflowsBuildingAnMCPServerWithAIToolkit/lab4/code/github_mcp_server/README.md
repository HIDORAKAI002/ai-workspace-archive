# Weather MCP Server

Это пример MCP сервера на Python, реализующий инструменты погоды с имитированными ответами. Его можно использовать как каркас для собственного MCP сервера. Включает следующие возможности:

- **Weather Tool**: инструмент, который предоставляет имитированную информацию о погоде на основе указанного места.
- **Git Clone Tool**: инструмент, который клонирует git-репозиторий в указанную папку.
- **VS Code Open Tool**: инструмент, который открывает папку в VS Code или VS Code Insiders.
- **Подключение к Agent Builder**: функция, позволяющая подключить MCP сервер к Agent Builder для тестирования и отладки.
- **Отладка в [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: функция, позволяющая отлаживать MCP сервер с помощью MCP Inspector.

## Начало работы с шаблоном Weather MCP Server

> **Требования**
>
> Для запуска MCP сервера на локальной машине разработчика вам понадобятся:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (требуется для инструмента git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) или [VS Code Insiders](https://code.visualstudio.com/insiders/) (требуется для инструмента open_in_vscode)
> - (*Опционально — если предпочитаете uv*) [uv](https://github.com/astral-sh/uv)
> - [Расширение для отладки Python](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Подготовка окружения

Существует два подхода для настройки окружения для этого проекта. Вы можете выбрать любой на ваше усмотрение.

> Примечание: Перезагрузите VSCode или терминал, чтобы использовать python из виртуального окружения после его создания.

| Подход | Шаги |
| -------- | ----- |
| Использование `uv` | 1. Создайте виртуальное окружение: `uv venv` <br>2. Выполните команду VSCode "***Python: Select Interpreter***" и выберите python из созданного виртуального окружения <br>3. Установите зависимости (включая dev-зависимости): `uv pip install -r pyproject.toml --extra dev` |
| Использование `pip` | 1. Создайте виртуальное окружение: `python -m venv .venv` <br>2. Выполните команду VSCode "***Python: Select Interpreter***" и выберите python из созданного виртуального окружения<br>3. Установите зависимости (включая dev-зависимости): `pip install -e .[dev]` |

После настройки окружения вы можете запустить сервер на локальной машине разработчика через Agent Builder как MCP Client, чтобы начать работу:
1. Откройте панель отладки VS Code. Выберите `Debug in Agent Builder` или нажмите `F5` для запуска отладки MCP сервера.
2. Используйте AI Toolkit Agent Builder для тестирования сервера с [этим запросом](../../../../../../../../../../../open_prompt_builder). Сервер будет автоматически подключен к Agent Builder.
3. Нажмите `Run` для тестирования сервера с запросом.

**Поздравляем**! Вы успешно запустили Weather MCP Server на локальной машине разработчика через Agent Builder как MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Что включено в шаблон

| Папка / Файл| Содержание                                   |
| ------------ | -------------------------------------------- |
| `.vscode`    | Файлы VSCode для отладки                      |
| `.aitk`      | Конфигурации для AI Toolkit                    |
| `src`        | Исходный код сервера Weather MCP               |

## Как отлаживать Weather MCP Server

> Примечания:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) — визуальный инструмент разработчика для тестирования и отладки MCP серверов.
> - Все режимы отладки поддерживают точки останова, поэтому вы можете добавлять точки останова в код реализации инструментов.

## Доступные инструменты

### Weather Tool
Инструмент `get_weather` предоставляет имитированную информацию о погоде для указанного места.

| Параметр | Тип | Описание |
| --------- | ---- | ----------- |
| `location` | string | Место, для которого нужно получить погоду (например, название города, штат или координаты) |

### Git Clone Tool
Инструмент `git_clone_repo` клонирует git-репозиторий в указанную папку.

| Параметр | Тип | Описание |
| --------- | ---- | ----------- |
| `repo_url` | string | URL git-репозитория для клонирования |
| `target_folder` | string | Путь к папке, куда должен быть склонирован репозиторий |

Инструмент возвращает JSON-объект с:
- `success`: Логическое значение, указывающее на успешность операции
- `target_folder` или `error`: Путь к клонированному репозиторию или сообщение об ошибке

### VS Code Open Tool
Инструмент `open_in_vscode` открывает папку в приложении VS Code или VS Code Insiders.

| Параметр | Тип | Описание |
| --------- | ---- | ----------- |
| `folder_path` | string | Путь к папке для открытия |
| `use_insiders` | boolean (опционально) | Использовать VS Code Insiders вместо обычного VS Code |

Инструмент возвращает JSON-объект с:
- `success`: Логическое значение, указывающее на успешность операции
- `message` или `error`: Подтверждающее сообщение или сообщение об ошибке

| Режим отладки | Описание | Шаги для отладки |
| ---------- | ----------- | --------------- |
| Agent Builder | Отладка MCP сервера в Agent Builder через AI Toolkit. | 1. Откройте панель отладки VS Code. Выберите `Debug in Agent Builder` и нажмите `F5` для запуска отладки MCP сервера.<br>2. Используйте AI Toolkit Agent Builder для тестирования сервера с [этим запросом](../../../../../../../../../../../open_prompt_builder). Сервер будет автоматически подключён к Agent Builder.<br>3. Нажмите `Run` для тестирования сервера с запросом. |
| MCP Inspector | Отладка MCP сервера с помощью MCP Inspector. | 1. Установите [Node.js](https://nodejs.org/)<br> 2. Настройте Inspector: `cd inspector` && `npm install` <br> 3. Откройте панель отладки VS Code. Выберите `Debug SSE in Inspector (Edge)` или `Debug SSE in Inspector (Chrome)`. Нажмите F5 для начала отладки.<br> 4. Когда MCP Inspector запустится в браузере, нажмите кнопку `Connect` для подключения этого MCP сервера.<br> 5. Затем вы можете `List Tools`, выбрать инструмент, ввести параметры и выполнить `Run Tool` для отладки кода сервера.<br> |

## Стандартные порты и настройки

| Режим отладки | Порты | Определения | Настройки | Примечание |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Измените [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json), чтобы изменить указанные порты. | Нет |
| MCP Inspector | 3001 (Сервер); 5173 и 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Измените [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json), чтобы изменить указанные порты. | Нет |

## Обратная связь

Если у вас есть отзывы или предложения по этому шаблону, пожалуйста, откройте issue в репозитории [AI Toolkit GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:  
Этот документ был переведён с помощью сервиса автоматического перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия обеспечить точность, просим учитывать, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на его родном языке следует считать авторитетным источником. Для получения критически важной информации рекомендуется обратиться к профессиональному переводу, выполненному человеком. Мы не несем ответственности за любые недоразумения или неправильные толкования, возникшие в результате использования данного перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->