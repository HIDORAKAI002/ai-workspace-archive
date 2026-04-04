# Weather MCP Server

Це зразок сервера MCP на Python, який реалізує інструменти погоди з мокованими відповідями. Його можна використовувати як основу для власного сервера MCP. Він включає такі функції:

- **Інструмент погоди**: інструмент, який надає моковану інформацію про погоду на основі заданого місцезнаходження.
- **Інструмент клонування Git**: інструмент, який клонувати git-репозиторій у вказану папку.
- **Інструмент відкриття VS Code**: інструмент, який відкриває папку у VS Code або VS Code Insiders.
- **Підключення до Agent Builder**: функція, що дозволяє підключити сервер MCP до Agent Builder для тестування та налагодження.
- **Налагодження у [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: функція, що дозволяє налагоджувати сервер MCP за допомогою MCP Inspector.

## Початок роботи з шаблоном Weather MCP Server

> **Необхідні умови**
>
> Для запуску сервера MCP на вашій локальній розробницькій машині вам знадобиться:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (потрібен для інструмента git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) або [VS Code Insiders](https://code.visualstudio.com/insiders/) (потрібні для інструмента open_in_vscode)
> - (*Необов’язково — якщо ви надаєте перевагу uv*) [uv](https://github.com/astral-sh/uv)
> - [Розширення для налагодження Python](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Підготовка середовища

Для налаштування середовища цього проєкту є два варіанти. Ви можете обрати будь-який, що вам зручніший.

> Примітка: Перезавантажте VSCode або термінал, щоб переконатися, що використовується python з віртуального середовища після його створення.

| Підхід | Кроки |
| -------- | ----- |
| Використання `uv` | 1. Створіть віртуальне середовище: `uv venv` <br>2. Виконайте команду VSCode "***Python: Select Interpreter***" і оберіть python зі створеного віртуального середовища <br>3. Встановіть залежності (включаючи dev залежності): `uv pip install -r pyproject.toml --extra dev` |
| Використання `pip` | 1. Створіть віртуальне середовище: `python -m venv .venv` <br>2. Виконайте команду VSCode "***Python: Select Interpreter***" і оберіть python зі створеного віртуального середовища<br>3. Встановіть залежності (включаючи dev залежності): `pip install -e .[dev]` | 

Після налаштування середовища ви можете запустити сервер на вашій локальній машині через Agent Builder як MCP Client для початку роботи:
1. Відкрийте панель налагодження VS Code. Оберіть `Debug in Agent Builder` або натисніть `F5`, щоб почати налагодження MCP сервера.
2. Використайте AI Toolkit Agent Builder для тестування сервера з [цього запиту](../../../../../../../../../../../open_prompt_builder). Сервер автоматично підключиться до Agent Builder.
3. Натисніть `Run`, щоб протестувати сервер з викликом.

**Вітаємо!** Ви успішно запустили Weather MCP Server на вашій локальній машині через Agent Builder як MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Що входить до шаблону

| Папка / Файл| Зміст                                      |
| ------------ | -------------------------------------------- |
| `.vscode`    | Файли VSCode для налагодження               |
| `.aitk`      | Конфігурації для AI Toolkit                  |
| `src`        | Вихідний код сервера weather mcp             |

## Як налагоджувати Weather MCP Server

> Примітки:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) — візуальний інструмент для розробника для тестування та налагодження MCP серверів.
> - Всі режими налагодження підтримують точки зупинки, щоб ви могли додавати точки зупинки в коді реалізації інструментів.

## Доступні інструменти

### Інструмент погоди
Інструмент `get_weather` надає моковану інформацію про погоду для вказаного місця.

| Параметр | Тип | Опис |
| --------- | ---- | ----------- |
| `location` | рядок | Місце, для якого потрібно отримати погоду (наприклад, назва міста, штат або координати) |

### Інструмент клонування Git
Інструмент `git_clone_repo` клонувати git-репозиторій у зазначену папку.

| Параметр | Тип | Опис |
| --------- | ---- | ----------- |
| `repo_url` | рядок | URL репозиторію git для клонування |
| `target_folder` | рядок | Шлях до папки, у яку потрібно клонувати репозиторій |

Інструмент повертає JSON об’єкт з:
- `success`: булеве значення, що вказує, чи операція пройшла успішно
- `target_folder` або `error`: шлях до клонованого репозиторію або повідомлення про помилку

### Інструмент відкриття VS Code
Інструмент `open_in_vscode` відкриває папку у додатку VS Code або VS Code Insiders.

| Параметр | Тип | Опис |
| --------- | ---- | ----------- |
| `folder_path` | рядок | Шлях до папки для відкриття |
| `use_insiders` | булевий (необов’язковий) | Чи використовувати VS Code Insiders замість звичайного VS Code |

Інструмент повертає JSON об’єкт з:
- `success`: булеве значення, що вказує, чи операція пройшла успішно
- `message` або `error`: повідомлення підтвердження або повідомлення про помилку

| Режим налагодження | Опис | Кроки для налагодження |
| ---------- | ----------- | --------------- |
| Agent Builder | Налагодження MCP сервера в Agent Builder через AI Toolkit. | 1. Відкрийте панель налагодження VS Code. Оберіть `Debug in Agent Builder` і натисніть `F5`, щоб почати налагодження MCP сервера.<br>2. Використайте AI Toolkit Agent Builder для тестування сервера з [цього запиту](../../../../../../../../../../../open_prompt_builder). Сервер автоматично підключиться до Agent Builder.<br>3. Натисніть `Run`, щоб протестувати сервер з викликом. |
| MCP Inspector | Налагодження MCP сервера за допомогою MCP Inspector. | 1. Встановіть [Node.js](https://nodejs.org/)<br> 2. Налаштуйте Inspector: `cd inspector` && `npm install` <br> 3. Відкрийте панель налагодження VS Code. Оберіть `Debug SSE in Inspector (Edge)` або `Debug SSE in Inspector (Chrome)`. Натисніть F5 для початку налагодження.<br> 4. При запуску MCP Inspector у браузері натисніть кнопку `Connect`, щоб підключити цей MCP сервер.<br> 5. Потім ви можете `List Tools`, вибрати інструмент, ввести параметри та `Run Tool` для налагодження вашого коду сервера.<br> |

## Стандартні порти та налаштування

| Режим налагодження | Порти | Визначення | Налаштування | Примітка |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Редагуйте [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json), щоб змінити вказані порти. | Н/д |
| MCP Inspector | 3001 (сервер); 5173 і 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Редагуйте [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json), щоб змінити вказані порти. | Н/д |

## Зворотний зв’язок

Якщо у вас є відгуки чи пропозиції щодо цього шаблону, будь ласка, відкрийте issue у [репозиторії AI Toolkit на GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ було перекладено за допомогою сервісу автоматичного перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, будь ласка, майте на увазі, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується звертатися до професійного людського перекладу. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->